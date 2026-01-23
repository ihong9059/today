#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - 영역 검출 + OCR 파이프라인
OpenCV로 번호판 영역을 검출한 후 EasyOCR로 인식

검출 방법:
1. 엣지 검출 (Canny)
2. 컨투어 검출
3. 사각형 필터링 (번호판 비율)
4. 검출된 영역 크롭 → OCR

사용법:
    python3 plate_ocr_detect.py
"""

import os
import sys
import time
import cv2
import numpy as np

try:
    import easyocr
    import torch
except ImportError:
    print("필요 패키지: pip install easyocr opencv-python")
    sys.exit(1)

# 설정
GPU_MODE = torch.cuda.is_available()
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

print("=" * 60)
print("  번호판 인식 - 영역 검출 + OCR 파이프라인")
print("=" * 60)
print(f"GPU 사용: {GPU_MODE}")
print()


def detect_plate_region(img):
    """
    OpenCV로 번호판 영역 검출

    Returns:
        list of (x, y, w, h) - 검출된 번호판 후보 영역들
    """
    # 원본 크기 저장
    h, w = img.shape[:2]

    # 그레이스케일 변환
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 노이즈 제거
    blur = cv2.bilateralFilter(gray, 11, 17, 17)

    # 엣지 검출
    edges = cv2.Canny(blur, 30, 200)

    # 모폴로지 연산 (엣지 연결)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    edges = cv2.dilate(edges, kernel, iterations=1)

    # 컨투어 검출 (OpenCV 버전 호환)
    result = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = result[0] if len(result) == 2 else result[1]

    # 번호판 후보 영역 필터링
    candidates = []

    for contour in contours:
        # 컨투어 근사화
        peri = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.02 * peri, True)

        # 사각형 (4개의 꼭지점)
        if len(approx) >= 4:
            x, y, cw, ch = cv2.boundingRect(approx)

            # 번호판 비율 필터 (가로:세로 = 2:1 ~ 5:1)
            aspect_ratio = cw / ch if ch > 0 else 0

            # 면적 필터 (너무 작거나 큰 영역 제외)
            area = cw * ch
            img_area = w * h
            area_ratio = area / img_area

            # 번호판 조건
            if (1.5 <= aspect_ratio <= 6.0 and
                0.01 <= area_ratio <= 0.3 and
                cw > 50 and ch > 15):
                candidates.append((x, y, cw, ch, area))

    # 면적 기준 정렬 (큰 것 우선)
    candidates.sort(key=lambda c: c[4], reverse=True)

    # 상위 5개만 반환
    return [(c[0], c[1], c[2], c[3]) for c in candidates[:5]]


def detect_plate_by_color(img):
    """
    색상 기반 번호판 검출 (흰색/녹색 번호판)
    """
    h, w = img.shape[:2]

    # HSV 변환
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # 흰색 범위 (번호판 배경)
    lower_white = np.array([0, 0, 180])
    upper_white = np.array([180, 30, 255])
    mask_white = cv2.inRange(hsv, lower_white, upper_white)

    # 녹색 범위 (영업용 번호판)
    lower_green = np.array([35, 50, 50])
    upper_green = np.array([85, 255, 255])
    mask_green = cv2.inRange(hsv, lower_green, upper_green)

    # 마스크 합치기
    mask = cv2.bitwise_or(mask_white, mask_green)

    # 모폴로지 연산
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)

    # 컨투어 검출 (OpenCV 버전 호환)
    result = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = result[0] if len(result) == 2 else result[1]

    candidates = []
    for contour in contours:
        x, y, cw, ch = cv2.boundingRect(contour)
        aspect_ratio = cw / ch if ch > 0 else 0
        area = cw * ch
        area_ratio = area / (w * h)

        if (1.5 <= aspect_ratio <= 6.0 and
            0.01 <= area_ratio <= 0.3 and
            cw > 50 and ch > 15):
            candidates.append((x, y, cw, ch, area))

    candidates.sort(key=lambda c: c[4], reverse=True)
    return [(c[0], c[1], c[2], c[3]) for c in candidates[:5]]


def crop_and_enhance(img, region, padding=10):
    """
    검출된 영역 크롭 및 전처리
    """
    x, y, w, h = region
    ih, iw = img.shape[:2]

    # 패딩 적용 (경계 체크)
    x1 = max(0, x - padding)
    y1 = max(0, y - padding)
    x2 = min(iw, x + w + padding)
    y2 = min(ih, y + h + padding)

    # 크롭
    cropped = img[y1:y2, x1:x2]

    # 크기 조정 (OCR에 적합한 크기)
    target_height = 100
    scale = target_height / cropped.shape[0]
    new_width = int(cropped.shape[1] * scale)
    resized = cv2.resize(cropped, (new_width, target_height))

    # 전처리 (CLAHE + denoise)
    lab = cv2.cvtColor(resized, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    l = clahe.apply(l)
    lab = cv2.merge([l, a, b])
    enhanced = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
    enhanced = cv2.bilateralFilter(enhanced, 9, 75, 75)

    return enhanced


def run_pipeline(reader, img_path):
    """
    번호판 검출 + OCR 파이프라인 실행
    """
    img = cv2.imread(img_path)
    if img is None:
        return None, "이미지 로드 실패"

    # 이미지 리사이즈 (처리 속도 향상)
    h, w = img.shape[:2]
    max_dim = 800
    if max(h, w) > max_dim:
        scale = max_dim / max(h, w)
        img = cv2.resize(img, None, fx=scale, fy=scale)

    # 방법 1: 엣지 기반 검출
    regions_edge = detect_plate_region(img)

    # 방법 2: 색상 기반 검출
    regions_color = detect_plate_by_color(img)

    # 두 방법의 결과 합치기 (중복 제거)
    all_regions = regions_edge + regions_color

    # 검출된 영역이 없으면 전체 이미지 사용
    if not all_regions:
        # 전체 이미지로 OCR
        img_resized = cv2.resize(img, (640, 640))
        result = reader.readtext(img_resized)
        text = ' '.join([r[1] for r in result]).replace(' ', '')
        return text, "전체 이미지 (검출 실패)"

    # 각 영역에 OCR 적용
    best_result = ""
    best_confidence = 0
    best_method = ""

    for i, region in enumerate(all_regions[:3]):  # 상위 3개만 시도
        try:
            cropped = crop_and_enhance(img, region)
            result = reader.readtext(cropped)

            if result:
                text = ' '.join([r[1] for r in result]).replace(' ', '')
                avg_conf = sum(r[2] for r in result) / len(result)

                # 번호판 형식 체크
                has_korean = any('\uac00' <= c <= '\ud7a3' for c in text)
                has_number = any(c.isdigit() for c in text)

                # 더 좋은 결과 선택
                if has_korean and has_number and avg_conf > best_confidence:
                    best_result = text
                    best_confidence = avg_conf
                    best_method = f"영역 {i+1}"
        except Exception as e:
            continue

    if best_result:
        return best_result, best_method

    # 검출 실패 시 전체 이미지로 시도
    img_resized = cv2.resize(img, (640, 640))
    result = reader.readtext(img_resized)
    text = ' '.join([r[1] for r in result]).replace(' ', '')
    return text, "전체 이미지 (폴백)"


def main():
    # 이미지 파일 목록
    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    print(f"테스트 이미지: {len(img_files)}개")
    print()

    # EasyOCR 모델 로딩
    print("[1/3] 모델 로딩...")
    start = time.time()
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    load_time = time.time() - start
    print(f"  모델 로딩 시간: {load_time:.2f}초")
    print()

    # 파이프라인 테스트
    print("[2/3] 번호판 검출 + OCR 테스트")
    print("-" * 60)

    results = []
    total_time = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)

        start = time.time()
        text, method = run_pipeline(reader, img_path)
        elapsed = time.time() - start
        total_time += elapsed

        # 번호판 형식 판단
        has_korean = any('\uac00' <= c <= '\ud7a3' for c in text) if text else False
        has_number = any(c.isdigit() for c in text) if text else False
        is_valid = has_korean and has_number and text and 5 <= len(text) <= 12

        status = "O" if is_valid else "?"
        results.append({
            'file': filename,
            'text': text or "(없음)",
            'method': method,
            'valid': is_valid,
            'time': elapsed
        })

        print(f"  {filename}: {text[:15] if text else '(없음)':<15} [{method}] ({status}) {elapsed:.2f}초")

    # 결과 요약
    print()
    print("[3/3] 결과 요약")
    print("=" * 60)

    valid_count = sum(1 for r in results if r['valid'])
    print(f"  인식 성공: {valid_count}/10 ({valid_count*10}%)")
    print(f"  총 소요시간: {total_time:.2f}초")
    print(f"  이미지당 평균: {total_time/len(img_files):.2f}초")

    # 방법별 통계
    methods = {}
    for r in results:
        m = r['method']
        if m not in methods:
            methods[m] = {'total': 0, 'valid': 0}
        methods[m]['total'] += 1
        if r['valid']:
            methods[m]['valid'] += 1

    print()
    print("  검출 방법별 결과:")
    for m, stats in methods.items():
        print(f"    {m}: {stats['valid']}/{stats['total']}")

    # 결과 파일 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_영역검출.md')

    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# 번호판 인식 결과 - 영역 검출 + OCR\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("---\n\n")
        f.write("## 파이프라인 설명\n\n")
        f.write("1. **엣지 기반 검출**: Canny 엣지 → 컨투어 → 사각형 필터링\n")
        f.write("2. **색상 기반 검출**: 흰색/녹색 번호판 마스크\n")
        f.write("3. **영역 크롭 + 전처리**: CLAHE + 노이즈 제거\n")
        f.write("4. **EasyOCR 인식**\n\n")
        f.write("---\n\n")
        f.write("## 인식 결과\n\n")
        f.write("| 파일 | 인식 결과 | 검출 방법 | 상태 | 시간 |\n")
        f.write("|:-----|:----------|:----------|:----:|-----:|\n")
        for r in results:
            status = "✅" if r['valid'] else "?"
            f.write(f"| {r['file']} | {r['text'][:15]} | {r['method']} | {status} | {r['time']:.2f}s |\n")
        f.write("\n---\n\n")
        f.write("## 요약\n\n")
        f.write(f"| 항목 | 값 |\n")
        f.write(f"|------|----|\n")
        f.write(f"| 인식 성공 | {valid_count}/10 ({valid_count*10}%) |\n")
        f.write(f"| 총 시간 | {total_time:.2f}초 |\n")
        f.write(f"| 이미지당 평균 | {total_time/len(img_files):.2f}초 |\n")

    print(f"\n결과 저장: {result_file}")


if __name__ == '__main__':
    main()
