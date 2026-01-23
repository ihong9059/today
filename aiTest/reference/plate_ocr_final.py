#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - 최종 버전
영역 검출 + 보정 결합

개선 사항:
1. OpenCV 기반 번호판 영역 검출
2. '오' ↔ '2' 오인식 보정
3. 다중 방법 시도 후 최적 결과 선택
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


def extract_plate_number(text):
    """
    번호판 번호 추출 (보정 포함)
    """
    cleaned = re.sub(r'[^0-9가-힣]', '', text)

    # 표준 형식: 123가4567 또는 12가3456
    match = re.search(r'(\d{2,3})([가-힣])(\d{4})', cleaned)
    if match:
        return f"{match.group(1)}{match.group(2)}{match.group(3)}", True

    # 숫자 7자리 → '오' 보정
    digits = re.sub(r'[^0-9]', '', cleaned)
    if len(digits) == 7:
        return f"{digits[:2]}오{digits[3:]}", True
    if len(digits) == 8:
        return f"{digits[:3]}오{digits[4:]}", True

    return cleaned, False


def detect_plate_regions(img):
    """번호판 후보 영역 검출"""
    h, w = img.shape[:2]
    candidates = []

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.bilateralFilter(gray, 11, 17, 17)
    edges = cv2.Canny(blur, 30, 200)

    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    edges = cv2.dilate(edges, kernel, iterations=1)

    result = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = result[0] if len(result) == 2 else result[1]

    for contour in contours:
        peri = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.02 * peri, True)

        if len(approx) >= 4:
            x, y, cw, ch = cv2.boundingRect(approx)
            aspect = cw / ch if ch > 0 else 0
            area_ratio = (cw * ch) / (w * h)

            if (1.5 <= aspect <= 6.0 and
                0.01 <= area_ratio <= 0.3 and
                cw > 50 and ch > 15):
                candidates.append((x, y, cw, ch, cw * ch))

    candidates.sort(key=lambda c: c[4], reverse=True)
    return [(c[0], c[1], c[2], c[3]) for c in candidates[:5]]


def crop_and_enhance(img, region, padding=10):
    """영역 크롭 및 전처리"""
    x, y, w, h = region
    ih, iw = img.shape[:2]

    x1, y1 = max(0, x - padding), max(0, y - padding)
    x2, y2 = min(iw, x + w + padding), min(ih, y + h + padding)

    cropped = img[y1:y2, x1:x2]

    # 리사이즈
    target_h = 100
    scale = target_h / cropped.shape[0]
    resized = cv2.resize(cropped, (int(cropped.shape[1] * scale), target_h))

    # CLAHE
    lab = cv2.cvtColor(resized, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    l = clahe.apply(l)
    enhanced = cv2.cvtColor(cv2.merge([l, a, b]), cv2.COLOR_LAB2BGR)

    return cv2.bilateralFilter(enhanced, 9, 75, 75)


def recognize_plate(reader, img):
    """
    번호판 인식 (영역 검출 + 전체 이미지 + 보정)
    """
    best_plate = ""
    best_conf = 0
    method_used = ""

    # 방법 1: 영역 검출 후 OCR
    regions = detect_plate_regions(img)
    for i, region in enumerate(regions[:3]):
        try:
            cropped = crop_and_enhance(img, region)
            result = reader.readtext(cropped)

            for r in result:
                plate, is_valid = extract_plate_number(r[1])
                if is_valid and r[2] > best_conf:
                    best_plate = plate
                    best_conf = r[2]
                    method_used = f"영역{i+1}"
        except:
            continue

    # 방법 2: 전체 이미지 OCR
    img_resized = cv2.resize(img, (640, 640))
    result = reader.readtext(img_resized)

    for r in result:
        plate, is_valid = extract_plate_number(r[1])
        if is_valid and r[2] > best_conf:
            best_plate = plate
            best_conf = r[2]
            method_used = "전체이미지"

    return best_plate, method_used, best_conf


def main():
    print("=" * 60)
    print("  번호판 인식 - 최종 버전 (영역 검출 + 보정)")
    print("=" * 60)
    print(f"GPU 사용: {GPU_MODE}")
    print()

    # 모델 로딩
    print("[1] 모델 로딩...")
    start = time.time()
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    print(f"  로딩 시간: {time.time() - start:.2f}초")
    print()

    # 테스트
    print("[2] 번호판 인식 테스트")
    print("-" * 60)

    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    results = []
    total_time = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)

        start = time.time()
        plate, method, conf = recognize_plate(reader, img)
        elapsed = time.time() - start
        total_time += elapsed

        is_valid = bool(plate and len(plate) >= 7)
        results.append({
            'file': filename,
            'plate': plate or "(없음)",
            'method': method,
            'valid': is_valid,
            'time': elapsed
        })

        status = "✅" if is_valid else "❌"
        print(f"  {filename}: {plate or '(없음)':<12} [{method}] {status} ({elapsed:.2f}s)")

    # 결과 요약
    print()
    print("=" * 60)
    print("[3] 결과 요약")
    print("=" * 60)

    valid_count = sum(1 for r in results if r['valid'])
    print(f"  인식 성공: {valid_count}/10 ({valid_count*10}%)")
    print(f"  총 시간: {total_time:.2f}초")
    print(f"  이미지당 평균: {total_time/len(img_files):.2f}초")

    # 방법별 통계
    print()
    print("  방법별 성공:")
    methods = {}
    for r in results:
        if r['valid']:
            m = r['method']
            methods[m] = methods.get(m, 0) + 1
    for m, count in sorted(methods.items(), key=lambda x: -x[1]):
        print(f"    {m}: {count}개")

    # 결과 파일 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_최종.md')

    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# 번호판 인식 결과 - 최종 버전\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("## 개선 사항\n\n")
        f.write("1. OpenCV 기반 번호판 영역 검출\n")
        f.write("2. '오' ↔ '2' 오인식 보정\n")
        f.write("3. 다중 방법 시도 후 최적 결과 선택\n\n")
        f.write("---\n\n")
        f.write("## 인식 결과\n\n")
        f.write("| 파일 | 번호판 | 방법 | 상태 | 시간 |\n")
        f.write("|:-----|:-------|:-----|:----:|-----:|\n")
        for r in results:
            status = "✅" if r['valid'] else "❌"
            f.write(f"| {r['file']} | {r['plate']} | {r['method']} | {status} | {r['time']:.2f}s |\n")
        f.write("\n---\n\n")
        f.write("## 요약\n\n")
        f.write(f"| 항목 | 값 |\n")
        f.write(f"|------|----|\n")
        f.write(f"| 인식 성공 | {valid_count}/10 ({valid_count*10}%) |\n")
        f.write(f"| 총 시간 | {total_time:.2f}초 |\n")
        f.write(f"| 이미지당 평균 | {total_time/len(img_files):.2f}초 |\n")

    print(f"\n결과 저장: {result_file}")
    print("=" * 60)


if __name__ == '__main__':
    main()
