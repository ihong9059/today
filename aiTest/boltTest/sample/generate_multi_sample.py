#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
다중 이미지 샘플 생성 스크립트
- 3개 원본 이미지 각각에서 양품 1개 + 불량 6개 = 총 21개
"""

import cv2
import numpy as np
import random
import os

# 시드 고정 (재현성)
random.seed(42)
np.random.seed(42)

# 경로 설정
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_DIR = os.path.join(SCRIPT_DIR, 'extracted')
OUTPUT_DIR = os.path.join(SCRIPT_DIR, 'multi_view')

# 이미지별 이름
IMAGE_NAMES = {
    'image_01.png': 'side',      # 측면 전체
    'image_02.png': 'top',       # 상단 뷰
    'image_04.png': 'thread',    # 나사산 클로즈업
}

def augment_good(img):
    """양품 증강 (약간의 변형)"""
    h, w = img.shape[:2]

    # 회전
    angle = random.uniform(-5, 5)
    M = cv2.getRotationMatrix2D((w/2, h/2), angle, 1.0)
    result = cv2.warpAffine(img, M, (w, h), borderMode=cv2.BORDER_REFLECT)

    # 밝기
    brightness = random.uniform(0.95, 1.05)
    result = cv2.convertScaleAbs(result, alpha=brightness, beta=0)

    return result

def generate_scratch(img):
    """스크래치 결함"""
    result = img.copy()
    h, w = result.shape[:2]

    for _ in range(2):
        x1 = random.randint(int(w*0.3), int(w*0.7))
        y1 = random.randint(int(h*0.2), int(h*0.8))
        length = random.randint(50, 150)
        angle = random.uniform(-0.5, 0.5)
        x2 = int(x1 + length * np.cos(angle))
        y2 = int(y1 + length * np.sin(angle))

        color = (random.randint(40, 80),) * 3
        cv2.line(result, (x1, y1), (x2, y2), color, random.randint(2, 4))

    return result

def generate_dent(img):
    """찍힘 결함"""
    result = img.copy()
    h, w = result.shape[:2]

    for _ in range(3):
        cx = random.randint(int(w*0.3), int(w*0.7))
        cy = random.randint(int(h*0.2), int(h*0.8))
        radius = random.randint(10, 25)

        overlay = result.copy()
        color = (random.randint(30, 60),) * 3
        cv2.circle(overlay, (cx, cy), radius, color, -1)
        result = cv2.addWeighted(overlay, 0.6, result, 0.4, 0)

    return result

def generate_rust(img):
    """녹 결함"""
    result = img.copy()
    h, w = result.shape[:2]

    mask = np.zeros((h, w), dtype=np.uint8)

    for _ in range(3):
        cx = random.randint(int(w*0.2), int(w*0.8))
        cy = random.randint(int(h*0.2), int(h*0.8))
        axes = (random.randint(20, 50), random.randint(15, 40))
        angle = random.randint(0, 180)
        cv2.ellipse(mask, (cx, cy), axes, angle, 0, 360, 255, -1)

    # 갈색/주황 녹 색상
    rust_color = np.zeros_like(result)
    rust_color[:, :] = (40, 80, 160)  # BGR - 갈색

    mask = cv2.GaussianBlur(mask, (21, 21), 0)
    mask_3ch = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR) / 255.0
    result = (result * (1 - mask_3ch * 0.7) + rust_color * mask_3ch * 0.7).astype(np.uint8)

    return result

def generate_crack(img):
    """균열 결함"""
    result = img.copy()
    h, w = result.shape[:2]

    # 시작점
    start_x = random.randint(int(w*0.4), int(w*0.6))
    start_y = random.randint(int(h*0.3), int(h*0.7))

    points = [(start_x, start_y)]
    current_x, current_y = start_x, start_y

    for _ in range(12):
        dx = random.randint(-25, 25)
        dy = random.randint(-25, 25)
        current_x = max(0, min(w-1, current_x + dx))
        current_y = max(0, min(h-1, current_y + dy))
        points.append((current_x, current_y))

    color = (30, 30, 30)
    for i in range(len(points) - 1):
        cv2.line(result, points[i], points[i+1], color, random.randint(1, 3))

    return result

def generate_missing_thread(img):
    """나사산 결손"""
    result = img.copy()
    h, w = result.shape[:2]

    # 나사산 영역 (중앙 부분)
    x1 = int(w * 0.35)
    y1 = int(h * 0.4)
    x2 = int(w * 0.65)
    y2 = int(h * 0.55)

    roi = result[y1:y2, x1:x2]
    if roi.size > 0:
        roi = cv2.GaussianBlur(roi, (9, 9), 0)
        roi = cv2.convertScaleAbs(roi, alpha=0.6, beta=-30)
        result[y1:y2, x1:x2] = roi

    return result

def generate_contamination(img):
    """이물질 오염"""
    result = img.copy()
    h, w = result.shape[:2]

    for _ in range(4):
        cx = random.randint(int(w*0.2), int(w*0.8))
        cy = random.randint(int(h*0.2), int(h*0.8))
        size = random.randint(8, 25)

        pts = []
        for angle in np.linspace(0, 2*np.pi, 7):
            r = size * random.uniform(0.4, 1.6)
            x = int(cx + r * np.cos(angle))
            y = int(cy + r * np.sin(angle))
            pts.append([x, y])
        pts = np.array(pts)

        color = (random.randint(10, 40),) * 3
        cv2.fillPoly(result, [pts], color)

    return result


def main():
    print("="*50)
    print("  다중 이미지 샘플 생성")
    print("="*50)

    # 출력 폴더 생성
    good_dir = os.path.join(OUTPUT_DIR, 'good')
    defect_dir = os.path.join(OUTPUT_DIR, 'defect')
    os.makedirs(good_dir, exist_ok=True)
    os.makedirs(defect_dir, exist_ok=True)

    defect_funcs = {
        'scratch': generate_scratch,
        'dent': generate_dent,
        'rust': generate_rust,
        'crack': generate_crack,
        'missing_thread': generate_missing_thread,
        'contamination': generate_contamination,
    }

    total_good = 0
    total_defect = 0

    for img_file, view_name in IMAGE_NAMES.items():
        img_path = os.path.join(INPUT_DIR, img_file)
        img = cv2.imread(img_path)

        if img is None:
            print(f"Error: {img_file} 로드 실패")
            continue

        print(f"\n[{view_name}] {img_file} ({img.shape[1]}x{img.shape[0]})")

        # 양품 생성
        sample = augment_good(img)
        path = os.path.join(good_dir, f'good_{view_name}.png')
        cv2.imwrite(path, sample)
        print(f"  양품: good_{view_name}.png")
        total_good += 1

        # 불량 생성 (6종)
        for defect_type, func in defect_funcs.items():
            # 각 이미지마다 시드 변경으로 다른 결함 위치
            random.seed(42 + hash(view_name + defect_type) % 1000)
            np.random.seed(42 + hash(view_name + defect_type) % 1000)

            sample = func(img.copy())
            path = os.path.join(defect_dir, f'defect_{view_name}_{defect_type}.png')
            cv2.imwrite(path, sample)
            print(f"  불량: defect_{view_name}_{defect_type}.png")
            total_defect += 1

    print("\n" + "="*50)
    print("  완료!")
    print("="*50)
    print(f"  양품: {good_dir} ({total_good}개)")
    print(f"  불량: {defect_dir} ({total_defect}개)")
    print(f"\n  총 {total_good + total_defect}개 샘플 생성됨")


if __name__ == '__main__':
    main()
