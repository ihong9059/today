#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
볼트 품질검사 벤치마크 - 크로스 플랫폼
학습 및 추론 성능 측정
"""

import os
import sys
import time
import json
import platform
from pathlib import Path
from datetime import datetime

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms, models
from PIL import Image
import numpy as np

# 재현성
torch.manual_seed(42)
np.random.seed(42)

# 플랫폼 정보
PLATFORM_INFO = {
    'system': platform.system(),
    'machine': platform.machine(),
    'processor': platform.processor(),
    'python': platform.python_version(),
    'torch': torch.__version__,
}

# Jetson Nano 감지
IS_JETSON = os.path.exists('/etc/nv_tegra_release')
if IS_JETSON:
    PLATFORM_INFO['device'] = 'Jetson Nano'
elif PLATFORM_INFO['system'] == 'Darwin':
    PLATFORM_INFO['device'] = 'Mac'
elif PLATFORM_INFO['system'] == 'Windows':
    PLATFORM_INFO['device'] = 'Windows PC'
else:
    PLATFORM_INFO['device'] = 'Linux PC'

# GPU 설정
GPU_MODE = torch.cuda.is_available()
if GPU_MODE:
    PLATFORM_INFO['cuda'] = torch.version.cuda
    PLATFORM_INFO['gpu_name'] = torch.cuda.get_device_name(0)


class BoltDataset(Dataset):
    """볼트 이미지 데이터셋"""

    def __init__(self, data_dir, transform=None):
        self.data_dir = Path(data_dir)
        self.transform = transform
        self.samples = []
        self.class_to_idx = {'good': 0, 'defect': 1}

        for class_name in ['good', 'defect']:
            class_dir = self.data_dir / class_name
            if class_dir.exists():
                for img_path in class_dir.glob('*.png'):
                    self.samples.append((str(img_path), self.class_to_idx[class_name]))

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        img_path, label = self.samples[idx]
        image = Image.open(img_path).convert('RGB')
        if self.transform:
            image = self.transform(image)
        return image, label


def get_model(model_name='mobilenet', num_classes=2, pretrained=True):
    """모델 생성"""
    if model_name == 'mobilenet':
        model = models.mobilenet_v3_small(weights='DEFAULT' if pretrained else None)
        model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, num_classes)
    elif model_name == 'efficientnet':
        model = models.efficientnet_b0(weights='DEFAULT' if pretrained else None)
        model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, num_classes)
    elif model_name == 'resnet18':
        model = models.resnet18(weights='DEFAULT' if pretrained else None)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
    return model


def train_epoch(model, dataloader, criterion, optimizer, device):
    """한 에폭 학습"""
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0

    for images, labels in dataloader:
        images, labels = images.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        _, predicted = outputs.max(1)
        total += labels.size(0)
        correct += predicted.eq(labels).sum().item()

    return running_loss / len(dataloader), 100. * correct / total


def validate(model, dataloader, criterion, device):
    """검증"""
    model.eval()
    running_loss = 0.0
    correct = 0
    total = 0
    tp, fp, tn, fn = 0, 0, 0, 0

    with torch.no_grad():
        for images, labels in dataloader:
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)

            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()

            for pred, label in zip(predicted, labels):
                if pred == 1 and label == 1: tp += 1
                elif pred == 1 and label == 0: fp += 1
                elif pred == 0 and label == 0: tn += 1
                else: fn += 1

    accuracy = 100. * correct / total
    recall = 100. * tp / (tp + fn) if (tp + fn) > 0 else 0
    precision = 100. * tp / (tp + fp) if (tp + fp) > 0 else 0

    return running_loss / len(dataloader), accuracy, recall, precision


def benchmark_inference(model, dataloader, device, num_runs=3):
    """추론 속도 벤치마크"""
    model.eval()

    # 워밍업
    with torch.no_grad():
        for images, _ in dataloader:
            images = images.to(device)
            _ = model(images)
            break

    # 벤치마크
    times = []
    total_samples = 0

    for run in range(num_runs):
        start = time.time()
        with torch.no_grad():
            for images, _ in dataloader:
                images = images.to(device)
                _ = model(images)
                total_samples += images.size(0)
        elapsed = time.time() - start
        times.append(elapsed)

    avg_time = np.mean(times)
    samples_per_run = total_samples // num_runs
    fps = samples_per_run / avg_time
    ms_per_sample = (avg_time / samples_per_run) * 1000

    return {
        'total_samples': samples_per_run,
        'avg_time': avg_time,
        'fps': fps,
        'ms_per_sample': ms_per_sample
    }


def main():
    print("=" * 70)
    print("  볼트 품질검사 AI 벤치마크 - 크로스 플랫폼")
    print("=" * 70)
    print(f"플랫폼: {PLATFORM_INFO['device']} ({PLATFORM_INFO['system']})")
    print(f"아키텍처: {PLATFORM_INFO['machine']}")
    print(f"Python: {PLATFORM_INFO['python']}")
    print(f"PyTorch: {PLATFORM_INFO['torch']}")
    print(f"GPU 사용: {GPU_MODE}")
    if GPU_MODE:
        print(f"CUDA: {PLATFORM_INFO.get('cuda', 'N/A')}")
        print(f"GPU: {PLATFORM_INFO.get('gpu_name', 'N/A')}")
    print()

    # 디바이스 설정
    if GPU_MODE:
        device = torch.device('cuda')
    elif hasattr(torch.backends, 'mps') and torch.backends.mps.is_available():
        device = torch.device('mps')
    else:
        device = torch.device('cpu')

    # 데이터 경로
    script_dir = Path(__file__).parent.parent
    data_dir = script_dir / 'data'

    # 설정
    IMG_SIZE = 224
    BATCH_SIZE = 16 if not IS_JETSON else 8
    EPOCHS = 10  # 벤치마크용 짧은 학습

    # 데이터 변환
    train_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    val_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # 데이터 로드
    print("[1] 데이터 로드")
    train_dataset = BoltDataset(data_dir / 'train', train_transform)
    val_dataset = BoltDataset(data_dir / 'val', val_transform)
    test_dataset = BoltDataset(data_dir / 'test', val_transform)

    print(f"    Train: {len(train_dataset)}개")
    print(f"    Val: {len(val_dataset)}개")
    print(f"    Test: {len(test_dataset)}개")

    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)
    test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)

    # 모델 로드
    print("\n[2] 모델 로드 (MobileNetV3-Small)")
    load_start = time.time()
    model = get_model('mobilenet', num_classes=2, pretrained=True)
    model = model.to(device)
    load_time = time.time() - load_start
    print(f"    로딩 시간: {load_time:.2f}초")

    # 학습 벤치마크
    print(f"\n[3] 학습 벤치마크 ({EPOCHS} 에폭)")
    print("-" * 70)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    train_start = time.time()
    best_recall = 0
    best_acc = 0

    for epoch in range(EPOCHS):
        epoch_start = time.time()
        train_loss, train_acc = train_epoch(model, train_loader, criterion, optimizer, device)
        val_loss, val_acc, val_recall, val_precision = validate(model, val_loader, criterion, device)
        epoch_time = time.time() - epoch_start

        if val_recall >= best_recall:
            best_recall = val_recall
            best_acc = val_acc

        print(f"  Epoch {epoch+1:2d}/{EPOCHS} | "
              f"Train: {train_acc:.1f}% | Val: {val_acc:.1f}% | "
              f"Recall: {val_recall:.1f}% | {epoch_time:.2f}s")

    train_time = time.time() - train_start

    # 테스트 평가
    print(f"\n[4] 테스트 평가")
    test_loss, test_acc, test_recall, test_precision = validate(model, test_loader, criterion, device)
    print(f"    정확도: {test_acc:.1f}%")
    print(f"    재현율: {test_recall:.1f}%")
    print(f"    정밀도: {test_precision:.1f}%")

    # 추론 벤치마크
    print(f"\n[5] 추론 속도 벤치마크")
    inference_result = benchmark_inference(model, test_loader, device, num_runs=5)
    print(f"    테스트 이미지: {inference_result['total_samples']}개")
    print(f"    평균 시간: {inference_result['avg_time']:.2f}초")
    print(f"    처리 속도: {inference_result['fps']:.1f} FPS")
    print(f"    이미지당: {inference_result['ms_per_sample']:.1f}ms")

    # 결과 요약
    print("\n" + "=" * 70)
    print("  결과 요약")
    print("=" * 70)
    print(f"  플랫폼: {PLATFORM_INFO['device']}")
    print(f"  GPU: {'Yes' if GPU_MODE else 'No'}")
    print(f"  모델 로딩: {load_time:.2f}초")
    print(f"  학습 시간 ({EPOCHS} 에폭): {train_time:.1f}초 ({train_time/60:.2f}분)")
    print(f"  최고 검증 정확도: {best_acc:.1f}%")
    print(f"  최고 검증 재현율: {best_recall:.1f}%")
    print(f"  테스트 정확도: {test_acc:.1f}%")
    print(f"  추론 속도: {inference_result['fps']:.1f} FPS ({inference_result['ms_per_sample']:.1f}ms/장)")

    # 결과 저장
    result_data = {
        'platform': PLATFORM_INFO,
        'gpu_mode': GPU_MODE,
        'settings': {
            'model': 'MobileNetV3-Small',
            'img_size': IMG_SIZE,
            'batch_size': BATCH_SIZE,
            'epochs': EPOCHS,
            'learning_rate': 0.001
        },
        'data': {
            'train': len(train_dataset),
            'val': len(val_dataset),
            'test': len(test_dataset)
        },
        'training': {
            'load_time': load_time,
            'train_time': train_time,
            'best_val_acc': best_acc,
            'best_val_recall': best_recall,
            'final_train_acc': train_acc
        },
        'test': {
            'accuracy': test_acc,
            'recall': test_recall,
            'precision': test_precision
        },
        'inference': inference_result,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    # 파일 저장
    device_name = PLATFORM_INFO['device'].lower().replace(' ', '_')
    output_dir = script_dir / 'benchmark'
    output_dir.mkdir(exist_ok=True)

    json_file = output_dir / f'benchmark_result_{device_name}.json'
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(result_data, f, ensure_ascii=False, indent=2)
    print(f"\n결과 저장: {json_file}")

    # 마크다운 저장
    md_file = output_dir / f'benchmark_result_{device_name}.md'
    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(f"# 볼트 품질검사 AI 벤치마크 - {PLATFORM_INFO['device']}\n\n")
        f.write(f"**생성일시:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("---\n\n")

        f.write("## 플랫폼 정보\n\n")
        f.write("| 항목 | 값 |\n")
        f.write("|------|----|n")
        f.write(f"| 디바이스 | {PLATFORM_INFO['device']} |\n")
        f.write(f"| OS | {PLATFORM_INFO['system']} |\n")
        f.write(f"| 아키텍처 | {PLATFORM_INFO['machine']} |\n")
        f.write(f"| Python | {PLATFORM_INFO['python']} |\n")
        f.write(f"| PyTorch | {PLATFORM_INFO['torch']} |\n")
        f.write(f"| GPU 사용 | {'Yes' if GPU_MODE else 'No'} |\n")
        if GPU_MODE:
            f.write(f"| CUDA | {PLATFORM_INFO.get('cuda', 'N/A')} |\n")
            f.write(f"| GPU | {PLATFORM_INFO.get('gpu_name', 'N/A')} |\n")
        f.write("\n---\n\n")

        f.write("## 학습 설정\n\n")
        f.write("| 항목 | 값 |\n")
        f.write("|------|----|n")
        f.write(f"| 모델 | MobileNetV3-Small |\n")
        f.write(f"| 이미지 크기 | {IMG_SIZE}x{IMG_SIZE} |\n")
        f.write(f"| 배치 크기 | {BATCH_SIZE} |\n")
        f.write(f"| 에폭 | {EPOCHS} |\n")
        f.write(f"| 학습률 | 0.001 |\n")
        f.write("\n---\n\n")

        f.write("## 성능 결과\n\n")
        f.write("| 항목 | 값 |\n")
        f.write("|------|----|n")
        f.write(f"| 모델 로딩 | {load_time:.2f}초 |\n")
        f.write(f"| 학습 시간 ({EPOCHS} 에폭) | {train_time:.1f}초 ({train_time/60:.2f}분) |\n")
        f.write(f"| 최고 검증 정확도 | {best_acc:.1f}% |\n")
        f.write(f"| 최고 검증 재현율 | {best_recall:.1f}% |\n")
        f.write(f"| 테스트 정확도 | {test_acc:.1f}% |\n")
        f.write(f"| 테스트 재현율 | {test_recall:.1f}% |\n")
        f.write(f"| 추론 속도 | {inference_result['fps']:.1f} FPS |\n")
        f.write(f"| 이미지당 시간 | {inference_result['ms_per_sample']:.1f}ms |\n")
        f.write("\n---\n\n")

        f.write(f"*생성: benchmark.py*\n")

    print(f"결과 저장: {md_file}")

    return result_data


if __name__ == '__main__':
    main()
