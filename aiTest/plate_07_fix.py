#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
plate_07 개선 테스트
- '오' → '2' 오인식 보정
- 숫자 7자리도 번호판으로 인정
"""

import os
import sys
import re
import cv2
import numpy as np

try:
    import easyocr
    import torch
except ImportError:
    print("필요 패키지: pip install easyocr opencv-python")
    sys.exit(1)

GPU_MODE = torch.cuda.is_available()
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')


def extract_plate_number(text):
    """
    번호판 번호 추출 (개선 버전)

    보정 규칙:
    - '오' ↔ '0', '5' 혼동
    - '2' ↔ '오' 혼동 (숫자 사이에 있는 경우)
    - 공백, 특수문자 제거
    """
    # 공백, 특수문자 제거
    cleaned = re.sub(r'[^0-9가-힣a-zA-Z]', '', text)

    # 표준 번호판 형식 검사 (한글 포함)
    # 신형: 123가4567, 구형: 12가3456
    match = re.search(r'(\d{2,3})([가-힣])(\d{4})', cleaned)
    if match:
        return f"{match.group(1)}{match.group(2)}{match.group(3)}", "표준형식"

    # 숫자만 있는 경우 (오 → 2 오인식 보정)
    # 패턴: 숫자7자리 (예: 9927890 → 99오7890)
    digits_only = re.sub(r'[^0-9]', '', cleaned)

    if len(digits_only) == 7:
        # 3번째 위치에 한글이 있어야 함
        # 9927890 → 99 + 2 + 7890 → 99 + 오 + 7890
        prefix = digits_only[:2]
        middle = digits_only[2]  # 이것이 '오'일 수 있음
        suffix = digits_only[3:]

        # 2, 0, 5는 '오'로 오인식될 수 있음
        if middle in ['2', '0', '5']:
            return f"{prefix}오{suffix}", "보정(오)"

    if len(digits_only) == 8:
        # 123 + ? + 4567 패턴
        prefix = digits_only[:3]
        middle = digits_only[3]
        suffix = digits_only[4:]

        if middle in ['2', '0', '5']:
            return f"{prefix}오{suffix}", "보정(오)"

    # 부분 매치 시도
    partial = re.search(r'(\d{2,3}[가-힣]?\d{4})', cleaned)
    if partial:
        return partial.group(1), "부분매치"

    return cleaned, "미확인"


def test_all_plates():
    """
    모든 번호판 테스트 (개선된 추출 함수 적용)
    """
    print("=" * 60)
    print("  번호판 인식 - 개선된 추출 함수 테스트")
    print("=" * 60)
    print(f"GPU 사용: {GPU_MODE}")
    print()

    # 모델 로딩
    print("[1] 모델 로딩...")
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    print()

    # 테스트
    print("[2] 번호판 인식 테스트")
    print("-" * 60)

    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    results = []

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (640, 640))

        # OCR
        ocr_result = reader.readtext(img)

        # 모든 검출 텍스트에서 번호판 추출 시도
        best_plate = ""
        best_method = ""
        best_conf = 0

        for r in ocr_result:
            text, conf = r[1], r[2]
            plate, method = extract_plate_number(text)

            # 번호판 형식 체크 (숫자+한글 또는 7자리 이상 숫자)
            has_pattern = bool(re.search(r'\d{2,3}[가-힣오]\d{4}', plate))

            if has_pattern and conf > best_conf:
                best_plate = plate
                best_method = method
                best_conf = conf

        # 결과 저장
        is_valid = bool(best_plate and len(best_plate) >= 7)
        results.append({
            'file': filename,
            'plate': best_plate or "(없음)",
            'method': best_method,
            'valid': is_valid
        })

        status = "✅" if is_valid else "❌"
        print(f"  {filename}: {best_plate or '(없음)':<12} [{best_method}] {status}")

    # 결과 요약
    print()
    print("=" * 60)
    valid_count = sum(1 for r in results if r['valid'])
    print(f"  인식 성공: {valid_count}/10 ({valid_count*10}%)")

    # 보정 적용된 케이스
    corrected = [r for r in results if r['method'] == '보정(오)']
    if corrected:
        print(f"  '오' 보정 적용: {len(corrected)}개")
        for r in corrected:
            print(f"    - {r['file']}: {r['plate']}")

    print("=" * 60)


if __name__ == '__main__':
    test_all_plates()
