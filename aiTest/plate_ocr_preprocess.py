#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - 이미지 전처리 적용 버전
전처리 기법: CLAHE, 노이즈 제거, 샤프닝

사용법:
    python3 plate_ocr_preprocess.py
"""

import os
import sys
import time
import cv2
import numpy as np

# EasyOCR import
try:
    import easyocr
    import torch
except ImportError:
    print("필요 패키지: pip install easyocr opencv-python")
    sys.exit(1)

# 설정
GPU_MODE = torch.cuda.is_available()
IMAGE_SIZE = 640
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

print("=" * 60)
print("  번호판 인식 - 이미지 전처리 적용 버전")
print("=" * 60)
print(f"GPU 사용: {GPU_MODE}")
print()


def preprocess_image(img, method='clahe'):
    """
    이미지 전처리 함수

    방법:
    - 'none': 전처리 없음 (기존 방식)
    - 'clahe': 대비 향상 (CLAHE)
    - 'denoise': 노이즈 제거
    - 'sharpen': 샤프닝
    - 'all': 모든 전처리 적용
    """
    if method == 'none':
        return img

    result = img.copy()

    if method in ['clahe', 'all']:
        # CLAHE (Contrast Limited Adaptive Histogram Equalization)
        # 지역적 대비 향상 - 번호판 글자를 더 선명하게
        lab = cv2.cvtColor(result, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        l = clahe.apply(l)
        lab = cv2.merge([l, a, b])
        result = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)

    if method in ['denoise', 'all']:
        # 노이즈 제거 (bilateralFilter - 엣지 보존)
        result = cv2.bilateralFilter(result, 9, 75, 75)

    if method in ['sharpen', 'all']:
        # 샤프닝 (언샤프 마스크)
        gaussian = cv2.GaussianBlur(result, (0, 0), 2.0)
        result = cv2.addWeighted(result, 1.5, gaussian, -0.5, 0)

    return result


def run_ocr_test(reader, img_files, preprocess_method):
    """특정 전처리 방법으로 OCR 테스트 실행"""
    results = []
    total_time = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))

        # 전처리 적용
        img_processed = preprocess_image(img, preprocess_method)

        # OCR 실행
        start = time.time()
        ocr_result = reader.readtext(img_processed)
        elapsed = time.time() - start
        total_time += elapsed

        # 결과 추출
        text = ' '.join([r[1] for r in ocr_result]).replace(' ', '')

        # 번호판 형식 판단 (간단한 휴리스틱)
        has_korean = any('\uac00' <= c <= '\ud7a3' for c in text)
        has_number = any(c.isdigit() for c in text)
        is_valid = has_korean and has_number and 6 <= len(text) <= 10

        results.append({
            'file': filename,
            'text': text,
            'valid': is_valid,
            'time': elapsed
        })

    return results, total_time


def main():
    # 이미지 파일 목록
    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    print(f"테스트 이미지: {len(img_files)}개")
    print()

    # EasyOCR 모델 로딩
    print("[1/5] 모델 로딩...")
    start = time.time()
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    load_time = time.time() - start
    print(f"  모델 로딩 시간: {load_time:.2f}초")
    print()

    # 전처리 방법별 테스트
    methods = ['none', 'clahe', 'denoise', 'sharpen', 'all']
    all_results = {}

    for i, method in enumerate(methods, 2):
        print(f"[{i}/5] 전처리 방법: {method}")
        print("-" * 40)

        results, total_time = run_ocr_test(reader, img_files, method)
        all_results[method] = results

        # 결과 출력
        valid_count = sum(1 for r in results if r['valid'])
        print(f"  인식 성공: {valid_count}/10 ({valid_count*10}%)")
        print(f"  총 시간: {total_time:.2f}초")
        print()

    # 결과 비교 테이블
    print("=" * 60)
    print("  전처리 방법별 결과 비교")
    print("=" * 60)
    print()
    print(f"{'파일':<15} {'없음':<12} {'CLAHE':<12} {'Denoise':<12} {'Sharpen':<12} {'All':<12}")
    print("-" * 75)

    for i, filename in enumerate(img_files):
        row = f"{filename:<15}"
        for method in methods:
            r = all_results[method][i]
            status = "O" if r['valid'] else "?"
            text = r['text'][:8] if len(r['text']) > 8 else r['text']
            row += f" {text}({status})"
        print(row)

    print("-" * 75)

    # 인식률 요약
    print()
    print("인식률 요약:")
    for method in methods:
        valid_count = sum(1 for r in all_results[method] if r['valid'])
        print(f"  {method:<10}: {valid_count}/10 ({valid_count*10}%)")

    # 결과 파일 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_전처리비교.md')

    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# 번호판 인식 결과 - 전처리 방법 비교\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("---\n\n")
        f.write("## 전처리 방법\n\n")
        f.write("| 방법 | 설명 |\n")
        f.write("|------|------|\n")
        f.write("| none | 전처리 없음 (기존 방식) |\n")
        f.write("| clahe | CLAHE 대비 향상 |\n")
        f.write("| denoise | 노이즈 제거 (bilateralFilter) |\n")
        f.write("| sharpen | 샤프닝 (언샤프 마스크) |\n")
        f.write("| all | 모든 전처리 적용 |\n\n")
        f.write("---\n\n")
        f.write("## 인식률 비교\n\n")
        f.write("| 전처리 | 인식 성공 | 인식률 |\n")
        f.write("|:------:|:---------:|:------:|\n")
        for method in methods:
            valid_count = sum(1 for r in all_results[method] if r['valid'])
            f.write(f"| {method} | {valid_count}/10 | {valid_count*10}% |\n")
        f.write("\n---\n\n")
        f.write("## 파일별 상세 결과\n\n")
        f.write("| 파일 | none | clahe | denoise | sharpen | all |\n")
        f.write("|:-----|:-----|:------|:--------|:--------|:----|\n")
        for i, filename in enumerate(img_files):
            row = f"| {filename} |"
            for method in methods:
                r = all_results[method][i]
                status = "✅" if r['valid'] else "?"
                row += f" {r['text'][:10]} {status} |"
            f.write(row + "\n")

    print(f"\n결과 저장: {result_file}")


if __name__ == '__main__':
    main()
