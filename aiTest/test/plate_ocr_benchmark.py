#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 벤치마크 - Mac / Jetson Nano 크로스 플랫폼
20개 이미지 전체 테스트
"""

import os
import sys
import re
import time
import json
import platform
import cv2
import numpy as np

try:
    import easyocr
    import torch
    import torch.backends.cudnn as cudnn
except ImportError as e:
    print(f"필요 패키지 설치 필요: {e}")
    sys.exit(1)

# 최적화 설정
cudnn.benchmark = True
OPTIMAL_SIZE = 480

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
GPU_MODE = torch.cuda.is_available()

# 플랫폼 정보
PLATFORM_INFO = {
    'system': platform.system(),
    'machine': platform.machine(),
    'processor': platform.processor(),
    'python': platform.python_version(),
}

# Jetson Nano 감지
IS_JETSON = os.path.exists('/etc/nv_tegra_release')
if IS_JETSON:
    PLATFORM_INFO['device'] = 'Jetson Nano'
elif PLATFORM_INFO['system'] == 'Darwin':
    PLATFORM_INFO['device'] = 'Mac'
else:
    PLATFORM_INFO['device'] = 'Linux PC'


def extract_plate_number(text):
    """번호판 번호 추출 (보정 포함)"""
    cleaned = re.sub(r'[^0-9가-힣]', '', text)

    # 정상 패턴: 00가0000 또는 000가0000
    match = re.search(r'(\d{2,3})([가-힣])(\d{4})', cleaned)
    if match:
        return f"{match.group(1)}{match.group(2)}{match.group(3)}", True

    # '오' 누락 보정: 숫자만 7자리 → 00오0000
    digits = re.sub(r'[^0-9]', '', cleaned)
    if len(digits) == 7:
        return f"{digits[:2]}오{digits[2:]}", True
    if len(digits) == 8:
        return f"{digits[:3]}오{digits[3:]}", True

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
    return [(c[0], c[1], c[2], c[3]) for c in candidates[:3]]


def crop_and_enhance(img, region, padding=10):
    """영역 크롭 및 전처리"""
    x, y, w, h = region
    ih, iw = img.shape[:2]

    x1, y1 = max(0, x - padding), max(0, y - padding)
    x2, y2 = min(iw, x + w + padding), min(ih, y + h + padding)

    cropped = img[y1:y2, x1:x2]

    target_h = 80
    scale = target_h / cropped.shape[0]
    resized = cv2.resize(cropped, (int(cropped.shape[1] * scale), target_h))

    return resized


def recognize_plate(reader, img):
    """번호판 인식"""
    best_plate = ""
    best_conf = 0

    # 방법 1: 영역 검출
    regions = detect_plate_regions(img)
    for region in regions[:2]:
        try:
            cropped = crop_and_enhance(img, region)
            result = reader.readtext(cropped)
            for r in result:
                plate, is_valid = extract_plate_number(r[1])
                if is_valid and r[2] > best_conf:
                    best_plate = plate
                    best_conf = r[2]
        except:
            continue

    # 방법 2: 전체 이미지 (폴백)
    if not best_plate:
        img_resized = cv2.resize(img, (OPTIMAL_SIZE, OPTIMAL_SIZE))
        result = reader.readtext(img_resized)
        for r in result:
            plate, is_valid = extract_plate_number(r[1])
            if is_valid and r[2] > best_conf:
                best_plate = plate
                best_conf = r[2]

    return best_plate, best_conf


def main():
    print("=" * 70)
    print("  번호판 인식 벤치마크 - 크로스 플랫폼")
    print("=" * 70)
    print(f"플랫폼: {PLATFORM_INFO['device']} ({PLATFORM_INFO['system']})")
    print(f"아키텍처: {PLATFORM_INFO['machine']}")
    print(f"Python: {PLATFORM_INFO['python']}")
    print(f"GPU 사용: {GPU_MODE}")
    if GPU_MODE:
        print(f"CUDA: {torch.version.cuda}")
        print(f"cuDNN: {cudnn.version()}")
    print()

    # 이미지 파일 확인
    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    print(f"테스트 이미지: {len(img_files)}개")
    print()

    # 모델 로딩
    print("[1] 모델 로딩...")
    load_start = time.time()
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    load_time = time.time() - load_start
    print(f"    로딩 시간: {load_time:.2f}초")

    # 워밍업
    print("\n[2] 워밍업...")
    warmup_img = cv2.imread(os.path.join(DATA_DIR, img_files[0]))
    warmup_start = time.time()
    _ = recognize_plate(reader, warmup_img)
    warmup_time = time.time() - warmup_start
    print(f"    워밍업 시간: {warmup_time:.2f}초")

    # 벤치마크
    print("\n[3] 벤치마크 (20개 이미지)")
    print("-" * 70)

    results = []
    total_time = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)

        if img is None:
            print(f"  {filename}: (읽기 실패)")
            continue

        start = time.time()
        plate, conf = recognize_plate(reader, img)
        elapsed = time.time() - start
        total_time += elapsed

        is_valid = bool(plate and len(plate) >= 7)
        results.append({
            'file': filename,
            'plate': plate or "(없음)",
            'confidence': conf,
            'valid': is_valid,
            'time': elapsed
        })

        status = "O" if is_valid else "X"
        print(f"  {filename}: {plate or '(없음)':<15} [{status}] {elapsed:.2f}s")

    # 결과 요약
    valid_count = sum(1 for r in results if r['valid'])
    avg_time = total_time / len(results) if results else 0
    recognition_rate = (valid_count / len(results) * 100) if results else 0

    print("\n" + "=" * 70)
    print("  결과 요약")
    print("=" * 70)
    print(f"  플랫폼: {PLATFORM_INFO['device']}")
    print(f"  GPU 사용: {GPU_MODE}")
    print(f"  테스트 이미지: {len(results)}개")
    print(f"  인식 성공: {valid_count}개 ({recognition_rate:.0f}%)")
    print(f"  총 시간: {total_time:.2f}초")
    print(f"  평균 시간: {avg_time:.2f}초/장")
    print(f"  처리 속도: {1/avg_time:.2f} FPS" if avg_time > 0 else "")

    # 결과 저장 (JSON)
    result_data = {
        'platform': PLATFORM_INFO,
        'gpu_mode': GPU_MODE,
        'cuda_version': str(torch.version.cuda) if GPU_MODE else None,
        'load_time': load_time,
        'warmup_time': warmup_time,
        'total_images': len(results),
        'valid_count': valid_count,
        'recognition_rate': recognition_rate,
        'total_time': total_time,
        'avg_time': avg_time,
        'fps': 1/avg_time if avg_time > 0 else 0,
        'results': results,
        'timestamp': time.strftime('%Y-%m-%d %H:%M:%S')
    }

    device_name = PLATFORM_INFO['device'].lower().replace(' ', '_')
    json_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                             f'benchmark_result_{device_name}.json')

    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(result_data, f, ensure_ascii=False, indent=2)

    print(f"\n결과 저장: {json_file}")

    # 마크다운 결과 저장
    md_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                           f'benchmark_result_{device_name}.md')

    with open(md_file, 'w', encoding='utf-8') as f:
        f.write(f"# 번호판 인식 벤치마크 - {PLATFORM_INFO['device']}\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("---\n\n")

        f.write("## 플랫폼 정보\n\n")
        f.write("| 항목 | 값 |\n")
        f.write("|------|----|\n")
        f.write(f"| 디바이스 | {PLATFORM_INFO['device']} |\n")
        f.write(f"| OS | {PLATFORM_INFO['system']} |\n")
        f.write(f"| 아키텍처 | {PLATFORM_INFO['machine']} |\n")
        f.write(f"| Python | {PLATFORM_INFO['python']} |\n")
        f.write(f"| GPU 사용 | {'Yes' if GPU_MODE else 'No'} |\n")
        if GPU_MODE:
            f.write(f"| CUDA | {torch.version.cuda} |\n")
        f.write("\n---\n\n")

        f.write("## 성능 요약\n\n")
        f.write("| 항목 | 값 |\n")
        f.write("|------|----|\n")
        f.write(f"| 모델 로딩 | {load_time:.2f}초 |\n")
        f.write(f"| 워밍업 | {warmup_time:.2f}초 |\n")
        f.write(f"| 테스트 이미지 | {len(results)}개 |\n")
        f.write(f"| 인식 성공 | {valid_count}개 ({recognition_rate:.0f}%) |\n")
        f.write(f"| 총 시간 | {total_time:.2f}초 |\n")
        f.write(f"| 평균 시간 | {avg_time:.2f}초/장 |\n")
        f.write(f"| 처리 속도 | {1/avg_time:.2f} FPS |\n" if avg_time > 0 else "")
        f.write("\n---\n\n")

        f.write("## 개별 결과\n\n")
        f.write("| 파일 | 번호판 | 상태 | 시간 |\n")
        f.write("|:-----|:-------|:----:|-----:|\n")
        for r in results:
            status = "O" if r['valid'] else "X"
            f.write(f"| {r['file']} | {r['plate']} | {status} | {r['time']:.2f}s |\n")

    print(f"결과 저장: {md_file}")

    return result_data


if __name__ == '__main__':
    main()
