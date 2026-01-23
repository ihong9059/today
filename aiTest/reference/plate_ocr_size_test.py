#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - 이미지 크기별 속도 테스트
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
    print("필요 패키지 설치 필요")
    sys.exit(1)

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
GPU_MODE = torch.cuda.is_available()

# cuDNN 최적화
cudnn.benchmark = True


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


def test_size(reader, size):
    """특정 크기로 테스트"""
    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    total_time = 0
    valid_count = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (size, size))

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

    avg_time = total_time / len(img_files)
    return avg_time, valid_count


def main():
    print("=" * 60)
    print("  이미지 크기별 속도 테스트")
    print("=" * 60)
    print(f"GPU: {GPU_MODE}")
    print()

    # 모델 로딩
    print("모델 로딩...")
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    print()

    # 워밍업
    warmup_img = cv2.imread(os.path.join(DATA_DIR, 'plate_01.png'))
    warmup_img = cv2.resize(warmup_img, (640, 640))
    _ = reader.readtext(warmup_img)

    # 테스트할 크기들
    sizes = [320, 416, 480, 512, 640]
    results = []

    print(f"{'크기':>8} {'평균시간':>10} {'인식률':>8} {'속도':>10}")
    print("-" * 40)

    for size in sizes:
        avg_time, valid_count = test_size(reader, size)
        results.append((size, avg_time, valid_count))
        print(f"{size}x{size:>4} {avg_time:>9.2f}s {valid_count*10:>7}% {640*640/(size*size):>9.2f}x")

    # 최적 크기 찾기
    print("\n" + "=" * 60)
    print("  분석")
    print("=" * 60)

    baseline = results[-1][1]  # 640x640 기준
    for size, avg, valid in results:
        speedup = baseline / avg
        print(f"{size}x{size}: {avg:.2f}초, 인식률 {valid*10}%, 속도 {speedup:.2f}x")

    # 90% 인식률 유지하면서 가장 빠른 크기
    best = None
    for size, avg, valid in results:
        if valid >= 9:  # 90% 이상
            if best is None or avg < best[1]:
                best = (size, avg, valid)

    if best:
        print(f"\n최적 크기: {best[0]}x{best[0]} (인식률 {best[2]*10}%, {best[1]:.2f}초)")
        speedup = baseline / best[1]
        print(f"640x640 대비 {speedup:.2f}x 빠름")

    # 결과 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_크기테스트.md')
    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# 이미지 크기별 속도 테스트 결과\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("| 크기 | 평균 시간 | 인식률 | 640x640 대비 |\n")
        f.write("|:-----|----------:|-------:|-------------:|\n")
        for size, avg, valid in results:
            speedup = baseline / avg
            f.write(f"| {size}x{size} | {avg:.2f}s | {valid*10}% | {speedup:.2f}x |\n")

    print(f"\n결과 저장: {result_file}")


if __name__ == '__main__':
    main()
