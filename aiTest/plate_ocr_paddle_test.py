#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - PaddleOCR vs EasyOCR 비교
"""

import os
import sys
import re
import time
import cv2

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')


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


def test_paddleocr():
    """PaddleOCR 테스트"""
    print("\n" + "=" * 60)
    print("  PaddleOCR 테스트")
    print("=" * 60)

    from paddleocr import PaddleOCR

    # 모델 로딩
    print("\n[1] 모델 로딩...")
    load_start = time.time()
    ocr = PaddleOCR(use_angle_cls=True, lang='korean', use_gpu=True, show_log=False)
    load_time = time.time() - load_start
    print(f"  로딩 시간: {load_time:.2f}초")

    # 워밍업
    warmup_img = os.path.join(DATA_DIR, 'plate_01.png')
    _ = ocr.ocr(warmup_img, cls=True)

    # 벤치마크
    print("\n[2] 벤치마크")
    print("-" * 60)

    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    results = []
    total_time = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)

        start = time.time()
        result = ocr.ocr(img_path, cls=True)
        elapsed = time.time() - start
        total_time += elapsed

        # 결과 파싱
        best_plate = ""
        if result and result[0]:
            for line in result[0]:
                text = line[1][0]
                plate, is_valid = extract_plate_number(text)
                if is_valid and len(plate) >= 7:
                    best_plate = plate
                    break

        is_valid = bool(best_plate)
        results.append({
            'file': filename,
            'plate': best_plate or "(없음)",
            'valid': is_valid,
            'time': elapsed
        })

        status = "O" if is_valid else "X"
        print(f"  {filename}: {best_plate or '(없음)':<12} [{status}] {elapsed:.2f}s")

    valid_count = sum(1 for r in results if r['valid'])
    avg_time = total_time / len(img_files)

    print(f"\n  결과: {valid_count}/10 ({valid_count*10}%)")
    print(f"  평균: {avg_time:.2f}초")

    return {
        'engine': 'PaddleOCR',
        'load_time': load_time,
        'avg_time': avg_time,
        'valid_count': valid_count,
        'results': results
    }


def test_easyocr():
    """EasyOCR 테스트"""
    print("\n" + "=" * 60)
    print("  EasyOCR 테스트")
    print("=" * 60)

    import easyocr
    import torch
    torch.backends.cudnn.benchmark = True

    # 모델 로딩
    print("\n[1] 모델 로딩...")
    load_start = time.time()
    reader = easyocr.Reader(['ko', 'en'], gpu=True)
    load_time = time.time() - load_start
    print(f"  로딩 시간: {load_time:.2f}초")

    # 워밍업
    warmup_img = cv2.imread(os.path.join(DATA_DIR, 'plate_01.png'))
    warmup_img = cv2.resize(warmup_img, (480, 480))
    _ = reader.readtext(warmup_img)

    # 벤치마크
    print("\n[2] 벤치마크")
    print("-" * 60)

    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    results = []
    total_time = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (480, 480))

        start = time.time()
        result = reader.readtext(img)
        elapsed = time.time() - start
        total_time += elapsed

        best_plate = ""
        for r in result:
            plate, is_valid = extract_plate_number(r[1])
            if is_valid and len(plate) >= 7:
                best_plate = plate
                break

        is_valid = bool(best_plate)
        results.append({
            'file': filename,
            'plate': best_plate or "(없음)",
            'valid': is_valid,
            'time': elapsed
        })

        status = "O" if is_valid else "X"
        print(f"  {filename}: {best_plate or '(없음)':<12} [{status}] {elapsed:.2f}s")

    valid_count = sum(1 for r in results if r['valid'])
    avg_time = total_time / len(img_files)

    print(f"\n  결과: {valid_count}/10 ({valid_count*10}%)")
    print(f"  평균: {avg_time:.2f}초")

    return {
        'engine': 'EasyOCR',
        'load_time': load_time,
        'avg_time': avg_time,
        'valid_count': valid_count,
        'results': results
    }


def main():
    print("=" * 60)
    print("  번호판 인식 - PaddleOCR vs EasyOCR 비교")
    print("=" * 60)

    all_results = []

    # PaddleOCR 테스트
    try:
        paddle_result = test_paddleocr()
        all_results.append(paddle_result)
    except Exception as e:
        print(f"PaddleOCR 테스트 실패: {e}")

    # EasyOCR 테스트
    try:
        easy_result = test_easyocr()
        all_results.append(easy_result)
    except Exception as e:
        print(f"EasyOCR 테스트 실패: {e}")

    # 결과 비교
    if len(all_results) >= 2:
        print("\n" + "=" * 60)
        print("  최종 비교")
        print("=" * 60)
        print(f"{'엔진':<15} {'로딩':>10} {'평균':>10} {'인식률':>8}")
        print("-" * 50)

        for r in all_results:
            print(f"{r['engine']:<15} {r['load_time']:>9.2f}s {r['avg_time']:>9.2f}s {r['valid_count']*10:>7}%")

        # 속도 비교
        paddle = all_results[0]
        easy = all_results[1]
        speedup = easy['avg_time'] / paddle['avg_time'] if paddle['avg_time'] > 0 else 0

        print("\n분석:")
        if speedup > 1:
            print(f"  PaddleOCR이 EasyOCR보다 {speedup:.2f}x 빠름")
        else:
            print(f"  EasyOCR이 PaddleOCR보다 {1/speedup:.2f}x 빠름")

    # 결과 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_paddle_vs_easyocr.md')

    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# PaddleOCR vs EasyOCR 비교\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("---\n\n")
        f.write("## 성능 비교\n\n")
        f.write("| 엔진 | 모델 로딩 | 평균 시간 | 인식률 |\n")
        f.write("|:-----|----------:|----------:|-------:|\n")
        for r in all_results:
            f.write(f"| {r['engine']} | {r['load_time']:.2f}s | {r['avg_time']:.2f}s | {r['valid_count']*10}% |\n")

        if len(all_results) >= 2:
            f.write("\n---\n\n")
            f.write("## 파일별 결과 비교\n\n")
            f.write("| 파일 | PaddleOCR | EasyOCR |\n")
            f.write("|:-----|:----------|:--------|\n")
            for i in range(10):
                p = all_results[0]['results'][i]
                e = all_results[1]['results'][i]
                f.write(f"| {p['file']} | {p['plate']} | {e['plate']} |\n")

    print(f"\n결과 저장: {result_file}")


if __name__ == '__main__':
    main()
