#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - FP16 (반정밀도) 테스트
PyTorch AMP (Automatic Mixed Precision) 사용
"""

import os
import sys
import re
import time
import cv2
import numpy as np

try:
    import easyocr
    import torch
    import torch.backends.cudnn as cudnn
    from torch.cuda.amp import autocast
except ImportError as e:
    print(f"필요 패키지 설치 필요: {e}")
    sys.exit(1)

cudnn.benchmark = True
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
GPU_MODE = torch.cuda.is_available()


def extract_plate_number(text):
    """번호판 번호 추출"""
    cleaned = re.sub(r'[^0-9가-힣]', '', text)
    match = re.search(r'(\d{2,3})([가-힣])(\d{4})', cleaned)
    if match:
        return f"{match.group(1)}{match.group(2)}{match.group(3)}", True
    digits = re.sub(r'[^0-9]', '', cleaned)
    if len(digits) == 7:
        return f"{digits[:2]}오{digits[3:]}", True
    return cleaned, False


def benchmark(reader, img_files, use_amp=False, mode_name=""):
    """벤치마크 실행"""
    print(f"\n[{mode_name}] 벤치마크")
    print("-" * 50)

    total_time = 0
    valid_count = 0
    results = []

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (480, 480))

        start = time.time()

        if use_amp:
            with autocast():
                result = reader.readtext(img)
        else:
            result = reader.readtext(img)

        elapsed = time.time() - start
        total_time += elapsed

        best_plate = ""
        for r in result:
            plate, is_valid = extract_plate_number(r[1])
            if is_valid and len(plate) >= 7:
                best_plate = plate
                valid_count += 1
                break

        results.append((filename, best_plate, elapsed))
        status = "O" if best_plate else "X"
        print(f"  {filename}: {best_plate or '(없음)':<12} [{status}] {elapsed:.2f}s")

    avg_time = total_time / len(img_files)
    print(f"\n  평균: {avg_time:.2f}초, 인식률: {valid_count}/10")

    return avg_time, valid_count


def main():
    print("=" * 60)
    print("  번호판 인식 - FP16/AMP 테스트")
    print("=" * 60)
    print(f"GPU: {GPU_MODE}")
    print(f"CUDA: {torch.version.cuda}")
    print()

    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])

    # 모델 로딩
    print("[1] 모델 로딩...")
    load_start = time.time()
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    load_time = time.time() - load_start
    print(f"  로딩 시간: {load_time:.2f}초")

    # 워밍업
    warmup_img = cv2.imread(os.path.join(DATA_DIR, 'plate_01.png'))
    warmup_img = cv2.resize(warmup_img, (480, 480))
    _ = reader.readtext(warmup_img)

    results = []

    # 표준 FP32 테스트
    avg1, valid1 = benchmark(reader, img_files, use_amp=False, mode_name="표준 FP32")
    results.append(("표준 FP32", avg1, valid1))

    # AMP (Automatic Mixed Precision) 테스트
    avg2, valid2 = benchmark(reader, img_files, use_amp=True, mode_name="AMP (Mixed Precision)")
    results.append(("AMP", avg2, valid2))

    # 다중 실행 평균 테스트
    print("\n[다중 실행 테스트] 3회 반복 평균")
    print("-" * 50)

    times_fp32 = []
    times_amp = []

    for i in range(3):
        # FP32
        total = 0
        for filename in img_files:
            img = cv2.imread(os.path.join(DATA_DIR, filename))
            img = cv2.resize(img, (480, 480))
            start = time.time()
            _ = reader.readtext(img)
            total += time.time() - start
        times_fp32.append(total / len(img_files))

        # AMP
        total = 0
        for filename in img_files:
            img = cv2.imread(os.path.join(DATA_DIR, filename))
            img = cv2.resize(img, (480, 480))
            start = time.time()
            with autocast():
                _ = reader.readtext(img)
            total += time.time() - start
        times_amp.append(total / len(img_files))

        print(f"  실행 {i+1}: FP32={times_fp32[-1]:.2f}s, AMP={times_amp[-1]:.2f}s")

    avg_fp32 = sum(times_fp32) / len(times_fp32)
    avg_amp = sum(times_amp) / len(times_amp)

    # 최종 결과
    print("\n" + "=" * 60)
    print("  최종 결과")
    print("=" * 60)
    print(f"{'모드':<20} {'평균 시간':>10} {'인식률':>8} {'속도':>10}")
    print("-" * 55)
    print(f"{'표준 FP32':<20} {avg_fp32:>9.2f}s {valid1*10:>7}% {1.0:>9.2f}x")
    print(f"{'AMP (Mixed)':<20} {avg_amp:>9.2f}s {valid2*10:>7}% {avg_fp32/avg_amp:>9.2f}x")

    baseline = 4.55  # 최초 기준
    print("\n최초 기준 (4.55초) 대비:")
    print(f"  FP32: {baseline/avg_fp32:.2f}x 향상")
    print(f"  AMP:  {baseline/avg_amp:.2f}x 향상")

    # 결과 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_fp16테스트.md')

    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# FP16/AMP 테스트 결과\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("---\n\n")
        f.write("## 테스트 결과 (3회 평균)\n\n")
        f.write("| 모드 | 평균 시간 | 인식률 | 속도 개선 |\n")
        f.write("|:-----|----------:|-------:|----------:|\n")
        f.write(f"| 표준 FP32 | {avg_fp32:.2f}s | {valid1*10}% | 1.00x |\n")
        f.write(f"| AMP (Mixed) | {avg_amp:.2f}s | {valid2*10}% | {avg_fp32/avg_amp:.2f}x |\n")
        f.write("\n---\n\n")
        f.write("## 최초 기준 대비 개선\n\n")
        f.write(f"- 최초 기준: 4.55초\n")
        f.write(f"- FP32 최적화 후: {avg_fp32:.2f}초 ({baseline/avg_fp32:.2f}x 향상)\n")
        f.write(f"- AMP 최적화 후: {avg_amp:.2f}초 ({baseline/avg_amp:.2f}x 향상)\n")

    print(f"\n결과 저장: {result_file}")


if __name__ == '__main__':
    main()
