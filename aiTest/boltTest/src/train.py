#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
볼트 품질검사 AI 모델 학습 스크립트
- MobileNetV3 / EfficientNet / ResNet 지원
- 양품/불량 이진 분류
"""

# SSL 인증서 우회 (pretrained 모델 다운로드용)
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import os
import sys
import time
import json
import argparse
from pathlib import Path
from datetime import datetime

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset
from torchvision import transforms, models
from PIL import Image
import numpy as np

# 재현성을 위한 시드 설정
torch.manual_seed(42)
np.random.seed(42)


class BoltDataset(Dataset):
    """볼트 이미지 데이터셋"""

    def __init__(self, data_dir, transform=None):
        self.data_dir = Path(data_dir)
        self.transform = transform
        self.samples = []
        self.class_to_idx = {'good': 0, 'defect': 1}

        # 데이터 로드
        for class_name in ['good', 'defect']:
            class_dir = self.data_dir / class_name
            if class_dir.exists():
                for img_path in class_dir.glob('*.[jJpP][pPnN][gG]'):
                    self.samples.append((str(img_path), self.class_to_idx[class_name]))

        print(f"  로드: {len(self.samples)}개 ({data_dir})")

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        img_path, label = self.samples[idx]
        image = Image.open(img_path).convert('RGB')

        if self.transform:
            image = self.transform(image)

        return image, label


def get_model(model_name, num_classes=2, pretrained=True):
    """모델 생성"""
    if model_name == 'mobilenet':
        model = models.mobilenet_v3_small(pretrained=pretrained)
        model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, num_classes)
    elif model_name == 'mobilenet_large':
        model = models.mobilenet_v3_large(pretrained=pretrained)
        model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, num_classes)
    elif model_name == 'efficientnet':
        model = models.efficientnet_b0(pretrained=pretrained)
        model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, num_classes)
    elif model_name == 'resnet18':
        model = models.resnet18(pretrained=pretrained)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
    elif model_name == 'resnet50':
        model = models.resnet50(pretrained=pretrained)
        model.fc = nn.Linear(model.fc.in_features, num_classes)
    else:
        raise ValueError(f"Unknown model: {model_name}")

    return model


def get_transforms(img_size=224):
    """데이터 변환 정의"""
    train_transform = transforms.Compose([
        transforms.Resize((img_size, img_size)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomVerticalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    val_transform = transforms.Compose([
        transforms.Resize((img_size, img_size)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    return train_transform, val_transform


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

    accuracy = 100. * correct / total
    avg_loss = running_loss / len(dataloader)

    return avg_loss, accuracy


def validate(model, dataloader, criterion, device):
    """검증"""
    model.eval()
    running_loss = 0.0
    correct = 0
    total = 0

    # 상세 지표
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

            # 혼동 행렬 계산 (1=defect, 0=good)
            for pred, label in zip(predicted, labels):
                if pred == 1 and label == 1:
                    tp += 1
                elif pred == 1 and label == 0:
                    fp += 1
                elif pred == 0 and label == 0:
                    tn += 1
                else:
                    fn += 1

    accuracy = 100. * correct / total
    avg_loss = running_loss / len(dataloader)

    # 정밀도, 재현율, F1
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0

    metrics = {
        'accuracy': accuracy,
        'precision': precision * 100,
        'recall': recall * 100,
        'f1': f1 * 100,
        'tp': tp, 'fp': fp, 'tn': tn, 'fn': fn
    }

    return avg_loss, metrics


def main():
    parser = argparse.ArgumentParser(description='볼트 품질검사 모델 학습')
    parser.add_argument('--data', '-d', default='./data',
                        help='데이터 폴더 경로')
    parser.add_argument('--model', '-m', default='mobilenet',
                        choices=['mobilenet', 'mobilenet_large', 'efficientnet', 'resnet18', 'resnet50'],
                        help='모델 선택')
    parser.add_argument('--epochs', '-e', type=int, default=30,
                        help='학습 에폭 수')
    parser.add_argument('--batch', '-b', type=int, default=16,
                        help='배치 크기')
    parser.add_argument('--lr', type=float, default=0.001,
                        help='학습률')
    parser.add_argument('--img-size', type=int, default=224,
                        help='이미지 크기')
    parser.add_argument('--output', '-o', default='./models',
                        help='모델 저장 폴더')
    parser.add_argument('--device', default='auto',
                        help='디바이스 (auto/cpu/cuda/mps)')

    args = parser.parse_args()

    # 디바이스 설정
    if args.device == 'auto':
        if torch.cuda.is_available():
            device = torch.device('cuda')
        elif hasattr(torch.backends, 'mps') and torch.backends.mps.is_available():
            device = torch.device('mps')
        else:
            device = torch.device('cpu')
    else:
        device = torch.device(args.device)

    print("="*60)
    print("  볼트 품질검사 AI 모델 학습")
    print("="*60)
    print(f"모델: {args.model}")
    print(f"디바이스: {device}")
    print(f"에폭: {args.epochs}")
    print(f"배치 크기: {args.batch}")
    print(f"학습률: {args.lr}")
    print(f"이미지 크기: {args.img_size}x{args.img_size}")
    print()

    # 데이터 로드
    print("[1/4] 데이터 로드")
    train_transform, val_transform = get_transforms(args.img_size)

    data_path = Path(args.data)
    train_dataset = BoltDataset(data_path / 'train', train_transform)
    val_dataset = BoltDataset(data_path / 'val', val_transform)

    if len(train_dataset) == 0:
        print("Error: 학습 데이터가 없습니다.")
        print(f"  확인 경로: {data_path / 'train'}")
        sys.exit(1)

    train_loader = DataLoader(train_dataset, batch_size=args.batch, shuffle=True, num_workers=0)
    val_loader = DataLoader(val_dataset, batch_size=args.batch, shuffle=False, num_workers=0) if len(val_dataset) > 0 else None

    print(f"  학습 데이터: {len(train_dataset)}개")
    print(f"  검증 데이터: {len(val_dataset)}개")

    # 모델 생성
    print("\n[2/4] 모델 생성")
    model = get_model(args.model, num_classes=2, pretrained=True)
    model = model.to(device)
    print(f"  {args.model} 로드 완료")

    # 손실 함수 및 옵티마이저
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=args.lr)
    scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', patience=5, factor=0.5)

    # 학습
    print("\n[3/4] 학습 시작")
    print("-"*60)

    best_val_acc = 0
    best_recall = 0
    history = {'train_loss': [], 'train_acc': [], 'val_loss': [], 'val_acc': [], 'val_recall': []}

    output_path = Path(args.output)
    output_path.mkdir(parents=True, exist_ok=True)

    start_time = time.time()

    for epoch in range(args.epochs):
        # 학습
        train_loss, train_acc = train_epoch(model, train_loader, criterion, optimizer, device)
        history['train_loss'].append(train_loss)
        history['train_acc'].append(train_acc)

        # 검증
        if val_loader:
            val_loss, val_metrics = validate(model, val_loader, criterion, device)
            val_acc = val_metrics['accuracy']
            val_recall = val_metrics['recall']
            scheduler.step(val_loss)

            history['val_loss'].append(val_loss)
            history['val_acc'].append(val_acc)
            history['val_recall'].append(val_recall)

            # 최고 모델 저장 (재현율 기준)
            if val_recall >= best_recall:
                best_recall = val_recall
                best_val_acc = val_acc
                torch.save({
                    'epoch': epoch,
                    'model_state_dict': model.state_dict(),
                    'optimizer_state_dict': optimizer.state_dict(),
                    'val_acc': val_acc,
                    'val_recall': val_recall,
                    'model_name': args.model,
                    'img_size': args.img_size,
                }, output_path / 'best_model.pth')

            print(f"Epoch {epoch+1:3d}/{args.epochs} | "
                  f"Train Loss: {train_loss:.4f} Acc: {train_acc:.1f}% | "
                  f"Val Loss: {val_loss:.4f} Acc: {val_acc:.1f}% Recall: {val_recall:.1f}%")
        else:
            print(f"Epoch {epoch+1:3d}/{args.epochs} | "
                  f"Train Loss: {train_loss:.4f} Acc: {train_acc:.1f}%")

    elapsed = time.time() - start_time

    # 최종 모델 저장
    torch.save({
        'epoch': args.epochs,
        'model_state_dict': model.state_dict(),
        'model_name': args.model,
        'img_size': args.img_size,
    }, output_path / 'final_model.pth')

    # 결과 요약
    print("\n" + "="*60)
    print("  학습 완료")
    print("="*60)
    print(f"  학습 시간: {elapsed/60:.1f}분")
    print(f"  최종 학습 정확도: {train_acc:.1f}%")
    if val_loader:
        print(f"  최고 검증 정확도: {best_val_acc:.1f}%")
        print(f"  최고 검증 재현율: {best_recall:.1f}%")
    print(f"\n  모델 저장:")
    print(f"    - best_model.pth (최고 성능)")
    print(f"    - final_model.pth (최종 에폭)")

    # 학습 기록 저장
    with open(output_path / 'training_history.json', 'w') as f:
        json.dump(history, f, indent=2)

    # 학습 결과 리포트
    report = f"""# 볼트 품질검사 모델 학습 결과

**학습 일시:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

---

## 설정

| 항목 | 값 |
|:-----|:---|
| 모델 | {args.model} |
| 에폭 | {args.epochs} |
| 배치 크기 | {args.batch} |
| 학습률 | {args.lr} |
| 이미지 크기 | {args.img_size}x{args.img_size} |
| 디바이스 | {device} |

---

## 데이터

| 구분 | 수량 |
|:-----|-----:|
| 학습 데이터 | {len(train_dataset)}개 |
| 검증 데이터 | {len(val_dataset)}개 |

---

## 결과

| 지표 | 값 |
|:-----|:---|
| 학습 시간 | {elapsed/60:.1f}분 |
| 최종 학습 정확도 | {train_acc:.1f}% |
| 최고 검증 정확도 | {best_val_acc:.1f}% |
| 최고 검증 재현율 | {best_recall:.1f}% |

---

## 저장된 파일

- `best_model.pth`: 최고 성능 모델
- `final_model.pth`: 최종 에폭 모델
- `training_history.json`: 학습 기록

---

*생성: train.py*
"""

    with open(output_path / 'training_report.md', 'w') as f:
        f.write(report)

    print(f"\n  리포트 저장: {output_path / 'training_report.md'}")


if __name__ == '__main__':
    main()
