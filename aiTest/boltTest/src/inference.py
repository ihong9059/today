#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
볼트 품질검사 추론 스크립트
- 단일 이미지 또는 폴더 전체 추론
- 실시간 카메라 추론 지원
"""

import os
import sys
import time
import argparse
from pathlib import Path

import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import cv2
import numpy as np


class BoltInspector:
    """볼트 품질 검사기"""

    def __init__(self, model_path, device='auto'):
        # 디바이스 설정
        if device == 'auto':
            if torch.cuda.is_available():
                self.device = torch.device('cuda')
            elif hasattr(torch.backends, 'mps') and torch.backends.mps.is_available():
                self.device = torch.device('mps')
            else:
                self.device = torch.device('cpu')
        else:
            self.device = torch.device(device)

        # 모델 로드
        self.model, self.img_size = self._load_model(model_path)
        self.model.eval()

        # 전처리 변환
        self.transform = transforms.Compose([
            transforms.Resize((self.img_size, self.img_size)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])

        # 클래스 이름
        self.classes = ['good', 'defect']

        print(f"모델 로드 완료: {model_path}")
        print(f"디바이스: {self.device}")
        print(f"이미지 크기: {self.img_size}x{self.img_size}")

    def _load_model(self, model_path):
        """모델 로드"""
        checkpoint = torch.load(model_path, map_location=self.device)

        model_name = checkpoint.get('model_name', 'mobilenet')
        img_size = checkpoint.get('img_size', 224)

        # 모델 생성
        if model_name == 'mobilenet':
            model = models.mobilenet_v3_small(pretrained=False)
            model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, 2)
        elif model_name == 'mobilenet_large':
            model = models.mobilenet_v3_large(pretrained=False)
            model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, 2)
        elif model_name == 'efficientnet':
            model = models.efficientnet_b0(pretrained=False)
            model.classifier[-1] = nn.Linear(model.classifier[-1].in_features, 2)
        elif model_name == 'resnet18':
            model = models.resnet18(pretrained=False)
            model.fc = nn.Linear(model.fc.in_features, 2)
        elif model_name == 'resnet50':
            model = models.resnet50(pretrained=False)
            model.fc = nn.Linear(model.fc.in_features, 2)
        else:
            raise ValueError(f"Unknown model: {model_name}")

        model.load_state_dict(checkpoint['model_state_dict'])
        model = model.to(self.device)

        return model, img_size

    def predict(self, image):
        """
        이미지 추론

        Args:
            image: PIL Image 또는 numpy array (BGR)

        Returns:
            dict: {
                'class': 'good' or 'defect',
                'confidence': float (0~1),
                'probabilities': {'good': float, 'defect': float}
            }
        """
        # numpy array (OpenCV) -> PIL
        if isinstance(image, np.ndarray):
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image = Image.fromarray(image)

        # 전처리
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)

        # 추론
        with torch.no_grad():
            outputs = self.model(input_tensor)
            probabilities = torch.softmax(outputs, dim=1)[0]

        # 결과
        pred_idx = probabilities.argmax().item()
        pred_class = self.classes[pred_idx]
        confidence = probabilities[pred_idx].item()

        return {
            'class': pred_class,
            'confidence': confidence,
            'probabilities': {
                'good': probabilities[0].item(),
                'defect': probabilities[1].item()
            }
        }

    def predict_batch(self, images):
        """배치 추론"""
        results = []
        for img in images:
            results.append(self.predict(img))
        return results


def inspect_image(inspector, image_path):
    """단일 이미지 검사"""
    image = Image.open(image_path).convert('RGB')
    result = inspector.predict(image)

    status = "불량" if result['class'] == 'defect' else "양품"
    confidence = result['confidence'] * 100

    print(f"{Path(image_path).name}: {status} ({confidence:.1f}%)")

    return result


def inspect_folder(inspector, folder_path, save_results=True):
    """폴더 전체 검사"""
    folder = Path(folder_path)
    results = []

    image_files = list(folder.glob('*.[jJpP][pPnN][gG]'))
    print(f"검사 대상: {len(image_files)}개 이미지")
    print("-" * 50)

    good_count = 0
    defect_count = 0

    start_time = time.time()

    for img_path in sorted(image_files):
        result = inspect_image(inspector, img_path)
        result['file'] = str(img_path.name)
        results.append(result)

        if result['class'] == 'good':
            good_count += 1
        else:
            defect_count += 1

    elapsed = time.time() - start_time

    print("-" * 50)
    print(f"총 {len(results)}개 검사 완료")
    print(f"  양품: {good_count}개")
    print(f"  불량: {defect_count}개")
    print(f"  처리 시간: {elapsed:.2f}초 ({len(results)/elapsed:.1f} FPS)")

    # 결과 저장
    if save_results:
        import json
        output_file = folder / 'inspection_results.json'
        with open(output_file, 'w') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        print(f"\n결과 저장: {output_file}")

    return results


def run_camera(inspector, camera_id=0):
    """실시간 카메라 검사"""
    cap = cv2.VideoCapture(camera_id)

    if not cap.isOpened():
        print(f"Error: 카메라 {camera_id}를 열 수 없습니다.")
        return

    print("카메라 검사 시작 (q: 종료, s: 저장)")
    print("-" * 50)

    frame_count = 0
    start_time = time.time()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 추론
        result = inspector.predict(frame)

        # 결과 표시
        status = "DEFECT" if result['class'] == 'defect' else "GOOD"
        confidence = result['confidence'] * 100
        color = (0, 0, 255) if result['class'] == 'defect' else (0, 255, 0)

        # 텍스트 오버레이
        cv2.putText(frame, f"{status}: {confidence:.1f}%",
                    (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)

        # FPS 계산
        frame_count += 1
        elapsed = time.time() - start_time
        fps = frame_count / elapsed if elapsed > 0 else 0
        cv2.putText(frame, f"FPS: {fps:.1f}",
                    (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)

        cv2.imshow('Bolt Inspection', frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
        elif key == ord('s'):
            filename = f"capture_{int(time.time())}.jpg"
            cv2.imwrite(filename, frame)
            print(f"저장: {filename}")

    cap.release()
    cv2.destroyAllWindows()


def main():
    parser = argparse.ArgumentParser(description='볼트 품질검사 추론')
    parser.add_argument('--model', '-m', required=True,
                        help='모델 파일 경로 (.pth)')
    parser.add_argument('--image', '-i',
                        help='검사할 이미지 파일 경로')
    parser.add_argument('--folder', '-f',
                        help='검사할 폴더 경로')
    parser.add_argument('--camera', '-c', type=int, default=None,
                        help='카메라 ID (실시간 검사)')
    parser.add_argument('--device', default='auto',
                        help='디바이스 (auto/cpu/cuda/mps)')

    args = parser.parse_args()

    # 검사기 생성
    inspector = BoltInspector(args.model, args.device)
    print()

    # 검사 실행
    if args.image:
        inspect_image(inspector, args.image)
    elif args.folder:
        inspect_folder(inspector, args.folder)
    elif args.camera is not None:
        run_camera(inspector, args.camera)
    else:
        print("사용법:")
        print("  단일 이미지: python inference.py -m model.pth -i image.jpg")
        print("  폴더 전체:   python inference.py -m model.pth -f ./images/")
        print("  실시간 카메라: python inference.py -m model.pth -c 0")


if __name__ == '__main__':
    main()
