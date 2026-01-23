#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
plate_07 실패 원인 분석 및 개선 테스트

문제: 배경 간판 글씨가 번호판과 함께 인식됨
해결: 번호판 형식 필터링 + 영역 검출 개선
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
except ImportError:
    print("필요 패키지: pip install easyocr opencv-python")
    sys.exit(1)

GPU_MODE = torch.cuda.is_available()
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

print("=" * 60)
print("  plate_07 실패 원인 분석 및 개선 테스트")
print("=" * 60)
print(f"GPU 사용: {GPU_MODE}")
print()


def is_plate_format(text):
    """
    한국 번호판 형식 검증

    형식:
    - 신형: 123가4567 (3자리 + 한글 + 4자리)
    - 구형: 12가3456 (2자리 + 한글 + 4자리)
    - 전기차: 70가1234 (2자리 70~79 + 한글 + 4자리)
    """
    # 숫자와 한글만 추출
    cleaned = re.sub(r'[^0-9가-힣]', '', text)

    # 신형 번호판: 숫자3 + 한글1 + 숫자4
    if re.match(r'^\d{2,3}[가-힣]\d{4}$', cleaned):
        return True, cleaned

    # 부분 매치 시도 (앞뒤 노이즈 제거)
    match = re.search(r'(\d{2,3}[가-힣]\d{4})', cleaned)
    if match:
        return True, match.group(1)

    return False, cleaned


def detect_plate_improved(img):
    """
    개선된 번호판 영역 검출
    - 더 엄격한 비율 필터
    - 여러 크기로 시도
    """
    h, w = img.shape[:2]
    candidates = []

    # 여러 스케일로 시도
    for scale in [1.0, 0.75, 0.5]:
        scaled = cv2.resize(img, None, fx=scale, fy=scale)
        sh, sw = scaled.shape[:2]

        # 그레이스케일 + 전처리
        gray = cv2.cvtColor(scaled, cv2.COLOR_BGR2GRAY)
        blur = cv2.bilateralFilter(gray, 11, 17, 17)

        # 적응형 이진화
        binary = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                       cv2.THRESH_BINARY_INV, 19, 9)

        # 모폴로지 연산
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 3))
        binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)

        # 컨투어 검출
        result = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        contours = result[0] if len(result) == 2 else result[1]

        for contour in contours:
            x, y, cw, ch = cv2.boundingRect(contour)

            # 번호판 비율 (2.5:1 ~ 5:1)
            aspect = cw / ch if ch > 0 else 0
            area = cw * ch
            area_ratio = area / (sw * sh)

            # 더 엄격한 조건
            if (2.0 <= aspect <= 5.5 and
                0.005 <= area_ratio <= 0.15 and
                cw > 40 and ch > 12):

                # 원본 좌표로 변환
                ox = int(x / scale)
                oy = int(y / scale)
                ocw = int(cw / scale)
                och = int(ch / scale)

                candidates.append((ox, oy, ocw, och, area / (scale * scale), aspect))

    # 비율이 번호판에 가까운 순으로 정렬 (이상적 비율: 3.5:1)
    candidates.sort(key=lambda c: abs(c[5] - 3.5))

    return [(c[0], c[1], c[2], c[3]) for c in candidates[:10]]


def crop_and_ocr(reader, img, region, padding=5):
    """
    영역 크롭 후 OCR
    """
    x, y, w, h = region
    ih, iw = img.shape[:2]

    # 패딩
    x1 = max(0, x - padding)
    y1 = max(0, y - padding)
    x2 = min(iw, x + w + padding)
    y2 = min(ih, y + h + padding)

    cropped = img[y1:y2, x1:x2]

    # 크기 조정
    target_h = 80
    scale = target_h / cropped.shape[0]
    new_w = int(cropped.shape[1] * scale)
    resized = cv2.resize(cropped, (new_w, target_h))

    # CLAHE
    lab = cv2.cvtColor(resized, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    l = clahe.apply(l)
    enhanced = cv2.cvtColor(cv2.merge([l, a, b]), cv2.COLOR_LAB2BGR)

    # OCR
    result = reader.readtext(enhanced)

    if result:
        text = ''.join([r[1] for r in result]).replace(' ', '')
        conf = sum(r[2] for r in result) / len(result)
        return text, conf

    return "", 0


def analyze_plate_07(reader):
    """
    plate_07 상세 분석
    """
    img_path = os.path.join(DATA_DIR, 'plate_07.png')
    img = cv2.imread(img_path)

    print("[1] 기본 정보")
    print(f"  이미지 크기: {img.shape[1]} x {img.shape[0]}")
    print()

    # 방법 1: 전체 이미지 OCR (기존 방식)
    print("[2] 전체 이미지 OCR (기존 방식)")
    img_resized = cv2.resize(img, (640, 640))
    result = reader.readtext(img_resized)
    all_texts = [(r[1], r[2]) for r in result]
    print(f"  검출된 텍스트 {len(all_texts)}개:")
    for text, conf in all_texts:
        is_plate, cleaned = is_plate_format(text)
        mark = "✅ 번호판" if is_plate else ""
        print(f"    - '{text}' (신뢰도: {conf:.2f}) {mark}")
    print()

    # 방법 2: 개선된 영역 검출
    print("[3] 개선된 영역 검출")
    regions = detect_plate_improved(img)
    print(f"  검출된 영역: {len(regions)}개")

    best_plate = ""
    best_conf = 0

    for i, region in enumerate(regions[:5]):
        text, conf = crop_and_ocr(reader, img, region)
        is_plate, cleaned = is_plate_format(text)

        x, y, w, h = region
        print(f"  영역 {i+1}: ({x},{y}) {w}x{h} → '{text}' (신뢰도: {conf:.2f})")

        if is_plate and conf > best_conf:
            best_plate = cleaned
            best_conf = conf

    print()

    # 방법 3: 번호판 형식 필터링
    print("[4] 번호판 형식 필터링 적용")
    for text, conf in all_texts:
        is_plate, cleaned = is_plate_format(text)
        if is_plate:
            print(f"  ✅ 번호판 형식 매치: '{cleaned}' (원본: '{text}')")
            if conf > best_conf:
                best_plate = cleaned
                best_conf = conf

    print()
    print("=" * 60)
    print(f"  최종 결과: {best_plate if best_plate else '인식 실패'}")
    print(f"  실제 번호: 999 7890 (또는 99오7890)")
    print("=" * 60)

    return best_plate


def compare_with_plate_08(reader):
    """
    plate_07과 plate_08 비교 (같은 번호판)
    """
    print()
    print("[5] plate_08과 비교 (같은 번호판)")
    print("-" * 40)

    for filename in ['plate_07.png', 'plate_08.png']:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)

        # 개선된 방식으로 OCR
        regions = detect_plate_improved(img)

        best_plate = ""
        best_conf = 0

        for region in regions[:5]:
            text, conf = crop_and_ocr(reader, img, region)
            is_plate, cleaned = is_plate_format(text)
            if is_plate and conf > best_conf:
                best_plate = cleaned
                best_conf = conf

        # 전체 이미지에서도 시도
        if not best_plate:
            img_resized = cv2.resize(img, (640, 640))
            result = reader.readtext(img_resized)
            for r in result:
                is_plate, cleaned = is_plate_format(r[1])
                if is_plate and r[2] > best_conf:
                    best_plate = cleaned
                    best_conf = r[2]

        status = "✅" if best_plate and '7890' in best_plate else "❌"
        print(f"  {filename}: {best_plate or '인식 실패'} {status}")


def main():
    # 모델 로딩
    print("[0] 모델 로딩...")
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    print()

    # plate_07 분석
    analyze_plate_07(reader)

    # plate_08과 비교
    compare_with_plate_08(reader)

    print()
    print("분석 완료!")


if __name__ == '__main__':
    main()
