#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EasyOCR 성능 벤치마크 스크립트
모든 플랫폼에서 동일한 방식으로 시간 측정

사용법:
    python3 benchmark_ocr.py

필요 패키지:
    pip3 install easyocr opencv-python

GPU 사용 시:
    스크립트 내 gpu=True 로 변경
"""

import os
import sys
import time
import platform

# 환경 정보 출력
print("=" * 60)
print("  EasyOCR 성능 벤치마크")
print("=" * 60)
print(f"\n[시스템 정보]")
print(f"  OS: {platform.system()} {platform.release()}")
print(f"  Python: {platform.python_version()}")
print(f"  Machine: {platform.machine()}")
print(f"  Processor: {platform.processor()}")

# 패키지 import
try:
    import easyocr
    import cv2
    import torch
    print(f"  PyTorch: {torch.__version__}")
    print(f"  CUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"  GPU: {torch.cuda.get_device_name(0)}")
except ImportError as e:
    print(f"\n오류: 필요한 패키지가 없습니다.")
    print(f"설치: pip3 install easyocr opencv-python")
    sys.exit(1)

# 설정
GPU_MODE = torch.cuda.is_available()  # GPU 있으면 자동 사용
IMAGE_SIZE = 640  # 이미지 리사이즈 크기

print(f"\n[테스트 설정]")
print(f"  GPU 모드: {GPU_MODE}")
print(f"  이미지 크기: {IMAGE_SIZE}x{IMAGE_SIZE}")

# 경로 설정
base_dir = os.path.dirname(os.path.abspath(__file__))
data_dir = os.path.join(base_dir, 'data')

# 이미지 파일 확인
image_files = sorted([f for f in os.listdir(data_dir) if f.endswith('.png')])
if len(image_files) < 3:
    print(f"\n오류: data 폴더에 최소 3개의 PNG 이미지가 필요합니다.")
    sys.exit(1)

print(f"  테스트 이미지: {len(image_files)}개")
print()

# 1. 모델 로딩 시간
print("=" * 60)
print("[1/4] 모델 로딩")
print("-" * 60)
start = time.time()
reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
load_time = time.time() - start
print(f"  모델 로딩 시간: {load_time:.2f}초")

# 2. 첫 이미지 (웜업)
print()
print("=" * 60)
print("[2/4] 첫 이미지 추론 (웜업)")
print("-" * 60)
img_path = os.path.join(data_dir, image_files[0])
img = cv2.imread(img_path)
img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))
start = time.time()
result = reader.readtext(img)
warmup_time = time.time() - start
text = ' '.join([r[1] for r in result])
print(f"  파일: {image_files[0]}")
print(f"  인식: {text[:30]}...")
print(f"  소요: {warmup_time:.2f}초")

# 3. 순수 추론 (5개 이미지)
print()
print("=" * 60)
print("[3/4] 순수 추론 테스트 (5개 이미지)")
print("-" * 60)
inference_times = []
for i, filename in enumerate(image_files[1:6], 2):
    img_path = os.path.join(data_dir, filename)
    img = cv2.imread(img_path)
    img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))

    start = time.time()
    result = reader.readtext(img)
    elapsed = time.time() - start
    inference_times.append(elapsed)

    text = ' '.join([r[1] for r in result])[:20]
    print(f"  [{i}] {filename}: {elapsed:.2f}초 - {text}...")

avg_inference = sum(inference_times) / len(inference_times)

# 4. 결과 요약
print()
print("=" * 60)
print("[4/4] 결과 요약")
print("=" * 60)
print(f"""
┌─────────────────────────────────────────────────────────┐
│  플랫폼: {platform.node()[:40]:<40} │
├─────────────────────────────────────────────────────────┤
│  모델 로딩:     {load_time:>8.2f}초                            │
│  첫 추론 (웜업): {warmup_time:>8.2f}초                            │
│  순수 추론 평균: {avg_inference:>8.2f}초                            │
├─────────────────────────────────────────────────────────┤
│  GPU 사용:      {'예' if GPU_MODE else '아니오':<10}                          │
└─────────────────────────────────────────────────────────┘
""")

# 결과 파일 저장
result_file = os.path.join(base_dir, f'benchmark_{platform.node()}.txt')
with open(result_file, 'w') as f:
    f.write(f"플랫폼: {platform.node()}\n")
    f.write(f"OS: {platform.system()} {platform.release()}\n")
    f.write(f"Python: {platform.python_version()}\n")
    f.write(f"PyTorch: {torch.__version__}\n")
    f.write(f"CUDA: {torch.cuda.is_available()}\n")
    f.write(f"GPU 모드: {GPU_MODE}\n")
    f.write(f"---\n")
    f.write(f"모델 로딩: {load_time:.2f}초\n")
    f.write(f"첫 추론 (웜업): {warmup_time:.2f}초\n")
    f.write(f"순수 추론 평균: {avg_inference:.2f}초\n")
    f.write(f"개별 추론: {[f'{t:.2f}' for t in inference_times]}\n")

print(f"결과 저장: {result_file}")
print()
