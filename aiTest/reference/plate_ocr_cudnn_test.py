#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - cuDNN 최적화 테스트
"""

import os
import sys
import re
import time
import cv2

try:
    import easyocr
    import torch
    import torch.backends.cudnn as cudnn
except ImportError:
    print("필요 패키지: pip install easyocr opencv-python torch")
    sys.exit(1)

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


def run_benchmark(reader, mode_name):
    """벤치마크 실행"""
    print(f"\n[{mode_name}] 벤치마크 시작")
    print("-" * 50)

    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    total_time = 0
    valid_count = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (640, 640))

        start = time.time()
        ocr_result = reader.readtext(img)
        elapsed = time.time() - start
        total_time += elapsed

        best_plate = ""
        for r in ocr_result:
            plate, is_valid = extract_plate_number(r[1])
            if is_valid and len(plate) >= 7:
                best_plate = plate
                break

        if best_plate:
            valid_count += 1

        status = "O" if best_plate else "X"
        print(f"  {filename}: {best_plate or '(없음)':<12} [{status}] {elapsed:.2f}s")

    avg_time = total_time / len(img_files)
    print(f"\n  결과: {valid_count}/10, 평균: {avg_time:.2f}초")
    return avg_time, valid_count


def main():
    print("=" * 60)
    print("  cuDNN 최적화 테스트")
    print("=" * 60)
    print(f"GPU: {GPU_MODE}")
    if GPU_MODE:
        print(f"Device: {torch.cuda.get_device_name(0)}")

    results = []

    # 테스트 1: cuDNN benchmark OFF
    print("\n" + "=" * 60)
    print("  모드 1: cuDNN benchmark OFF (기본)")
    print("=" * 60)

    cudnn.benchmark = False
    print("모델 로딩...")
    start = time.time()
    reader1 = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    load1 = time.time() - start
    print(f"로딩 시간: {load1:.2f}초")

    # 워밍업
    warmup_img = cv2.imread(os.path.join(DATA_DIR, 'plate_01.png'))
    warmup_img = cv2.resize(warmup_img, (640, 640))
    _ = reader1.readtext(warmup_img)

    avg1, valid1 = run_benchmark(reader1, "cuDNN OFF")
    results.append(("cuDNN OFF", load1, avg1, valid1))

    del reader1
    if GPU_MODE:
        torch.cuda.empty_cache()

    # 테스트 2: cuDNN benchmark ON
    print("\n" + "=" * 60)
    print("  모드 2: cuDNN benchmark ON")
    print("=" * 60)

    cudnn.benchmark = True
    print("모델 로딩...")
    start = time.time()
    reader2 = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    load2 = time.time() - start
    print(f"로딩 시간: {load2:.2f}초")

    # 워밍업
    _ = reader2.readtext(warmup_img)

    avg2, valid2 = run_benchmark(reader2, "cuDNN ON")
    results.append(("cuDNN ON", load2, avg2, valid2))

    # 최종 비교
    print("\n" + "=" * 60)
    print("  최종 비교")
    print("=" * 60)
    print(f"{'모드':<15} {'로딩':>10} {'평균':>10} {'인식률':>8} {'개선':>10}")
    print("-" * 60)

    baseline = results[0][2]
    for mode, load, avg, valid in results:
        speedup = baseline / avg if avg > 0 else 0
        print(f"{mode:<15} {load:>9.2f}s {avg:>9.2f}s {valid*10:>7}% {speedup:>9.2f}x")

    # 결과 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_cudnn테스트.md')
    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# cuDNN 최적화 테스트 결과\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("| 모드 | 로딩 | 평균 | 인식률 | 속도 개선 |\n")
        f.write("|:-----|-----:|-----:|-------:|----------:|\n")
        for mode, load, avg, valid in results:
            speedup = baseline / avg if avg > 0 else 0
            f.write(f"| {mode} | {load:.2f}s | {avg:.2f}s | {valid*10}% | {speedup:.2f}x |\n")

    print(f"\n결과 저장: {result_file}")


if __name__ == '__main__':
    main()
