#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
전체 데이터셋 생성 스크립트
- 3개 원본 이미지 활용
- train/val/test 분할 생성
"""

import cv2
import numpy as np
import random
import os
from pathlib import Path

# 경로 설정
SCRIPT_DIR = Path(__file__).parent.parent
RAW_DIR = SCRIPT_DIR / 'data' / 'raw'
DATA_DIR = SCRIPT_DIR / 'data'

# 데이터 생성 설정
CONFIG = {
    'train': {'good_per_image': 40, 'defect_per_type_per_image': 8},   # 40*3=120 good, 8*6*3=144 defect
    'val':   {'good_per_image': 10, 'defect_per_type_per_image': 2},   # 10*3=30 good, 2*6*3=36 defect
    'test':  {'good_per_image': 10, 'defect_per_type_per_image': 2},   # 10*3=30 good, 2*6*3=36 defect
}

# 이미지 매핑
IMAGE_VIEWS = {
    'image_01.png': 'side',
    'image_02.png': 'top',
    'image_04.png': 'thread',
}

DEFECT_TYPES = ['scratch', 'dent', 'rust', 'crack', 'missing_thread', 'contamination']


# ============================================
# 양품 증강 함수들
# ============================================

def augment_good(img, intensity=1.0):
    """양품 증강"""
    h, w = img.shape[:2]
    result = img.copy()

    # 회전 (-15 ~ +15도)
    angle = random.uniform(-15, 15) * intensity
    M = cv2.getRotationMatrix2D((w/2, h/2), angle, 1.0)
    result = cv2.warpAffine(result, M, (w, h), borderMode=cv2.BORDER_REFLECT)

    # 밝기 조정
    brightness = random.uniform(0.8, 1.2)
    result = cv2.convertScaleAbs(result, alpha=brightness, beta=random.randint(-20, 20))

    # 대비 조정
    if random.random() > 0.5:
        lab = cv2.cvtColor(result, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=random.uniform(1.0, 3.0), tileGridSize=(8,8))
        l = clahe.apply(l)
        result = cv2.cvtColor(cv2.merge([l, a, b]), cv2.COLOR_LAB2BGR)

    # 가우시안 노이즈
    if random.random() > 0.7:
        noise = np.random.normal(0, random.randint(3, 10), result.shape).astype(np.int16)
        result = np.clip(result.astype(np.int16) + noise, 0, 255).astype(np.uint8)

    # 약간의 블러
    if random.random() > 0.8:
        ksize = random.choice([3, 5])
        result = cv2.GaussianBlur(result, (ksize, ksize), 0)

    return result


# ============================================
# 결함 생성 함수들
# ============================================

def generate_scratch(img):
    """스크래치 결함"""
    result = img.copy()
    h, w = result.shape[:2]

    num_scratches = random.randint(1, 4)
    for _ in range(num_scratches):
        x1 = random.randint(int(w*0.2), int(w*0.8))
        y1 = random.randint(int(h*0.1), int(h*0.9))
        length = random.randint(30, 200)
        angle = random.uniform(-1, 1)
        x2 = int(x1 + length * np.cos(angle))
        y2 = int(y1 + length * np.sin(angle))

        color = (random.randint(30, 90),) * 3
        thickness = random.randint(1, 4)
        cv2.line(result, (x1, y1), (x2, y2), color, thickness)

    return result


def generate_dent(img):
    """찍힘 결함"""
    result = img.copy()
    h, w = result.shape[:2]

    num_dents = random.randint(1, 5)
    for _ in range(num_dents):
        cx = random.randint(int(w*0.2), int(w*0.8))
        cy = random.randint(int(h*0.1), int(h*0.9))
        radius = random.randint(5, 30)

        overlay = result.copy()
        color = (random.randint(20, 70),) * 3
        cv2.circle(overlay, (cx, cy), radius, color, -1)
        alpha = random.uniform(0.4, 0.7)
        result = cv2.addWeighted(overlay, alpha, result, 1-alpha, 0)

    return result


def generate_rust(img):
    """녹 결함"""
    result = img.copy()
    h, w = result.shape[:2]

    mask = np.zeros((h, w), dtype=np.uint8)

    num_spots = random.randint(2, 5)
    for _ in range(num_spots):
        cx = random.randint(int(w*0.15), int(w*0.85))
        cy = random.randint(int(h*0.15), int(h*0.85))
        axes = (random.randint(15, 60), random.randint(10, 45))
        angle = random.randint(0, 180)
        cv2.ellipse(mask, (cx, cy), axes, angle, 0, 360, 255, -1)

    # 녹 색상 (갈색/주황 계열)
    rust_color = np.zeros_like(result)
    rust_color[:, :] = (random.randint(30, 50), random.randint(60, 100), random.randint(140, 180))

    mask = cv2.GaussianBlur(mask, (21, 21), 0)
    mask_3ch = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR) / 255.0
    intensity = random.uniform(0.5, 0.8)
    result = (result * (1 - mask_3ch * intensity) + rust_color * mask_3ch * intensity).astype(np.uint8)

    return result


def generate_crack(img):
    """균열 결함"""
    result = img.copy()
    h, w = result.shape[:2]

    start_x = random.randint(int(w*0.3), int(w*0.7))
    start_y = random.randint(int(h*0.2), int(h*0.8))

    points = [(start_x, start_y)]
    current_x, current_y = start_x, start_y

    num_segments = random.randint(8, 20)
    for _ in range(num_segments):
        dx = random.randint(-30, 30)
        dy = random.randint(-30, 30)
        current_x = max(0, min(w-1, current_x + dx))
        current_y = max(0, min(h-1, current_y + dy))
        points.append((current_x, current_y))

    color = (random.randint(20, 50),) * 3
    for i in range(len(points) - 1):
        thickness = random.randint(1, 3)
        cv2.line(result, points[i], points[i+1], color, thickness)

    # 분기 추가
    if random.random() > 0.5:
        branch_start = random.choice(points[2:-2]) if len(points) > 4 else points[1]
        bx, by = branch_start
        for _ in range(random.randint(3, 6)):
            bx += random.randint(-20, 20)
            by += random.randint(-20, 20)
            bx = max(0, min(w-1, bx))
            by = max(0, min(h-1, by))
            cv2.line(result, branch_start, (bx, by), color, random.randint(1, 2))

    return result


def generate_missing_thread(img):
    """나사산 결손"""
    result = img.copy()
    h, w = result.shape[:2]

    # 랜덤 영역 선택
    x1 = int(w * random.uniform(0.25, 0.45))
    y1 = int(h * random.uniform(0.3, 0.5))
    x2 = int(w * random.uniform(0.55, 0.75))
    y2 = int(h * random.uniform(0.5, 0.7))

    if x2 <= x1 or y2 <= y1:
        x1, x2 = min(x1, x2), max(x1, x2) + 50
        y1, y2 = min(y1, y2), max(y1, y2) + 30

    roi = result[y1:y2, x1:x2]
    if roi.size > 0:
        roi = cv2.GaussianBlur(roi, (11, 11), 0)
        roi = cv2.convertScaleAbs(roi, alpha=random.uniform(0.5, 0.7), beta=random.randint(-40, -20))
        result[y1:y2, x1:x2] = roi

    return result


def generate_contamination(img):
    """이물질 오염"""
    result = img.copy()
    h, w = result.shape[:2]

    num_spots = random.randint(2, 6)
    for _ in range(num_spots):
        cx = random.randint(int(w*0.15), int(w*0.85))
        cy = random.randint(int(h*0.15), int(h*0.85))
        size = random.randint(5, 30)

        pts = []
        num_vertices = random.randint(5, 9)
        for angle in np.linspace(0, 2*np.pi, num_vertices):
            r = size * random.uniform(0.3, 1.8)
            x = int(cx + r * np.cos(angle))
            y = int(cy + r * np.sin(angle))
            pts.append([x, y])
        pts = np.array(pts)

        color = (random.randint(5, 50),) * 3
        cv2.fillPoly(result, [pts], color)

    return result


DEFECT_FUNCTIONS = {
    'scratch': generate_scratch,
    'dent': generate_dent,
    'rust': generate_rust,
    'crack': generate_crack,
    'missing_thread': generate_missing_thread,
    'contamination': generate_contamination,
}


def generate_dataset():
    """전체 데이터셋 생성"""
    print("="*60)
    print("  볼트 품질검사 전체 데이터셋 생성")
    print("="*60)

    # 원본 이미지 로드
    images = {}
    print("\n[1/4] 원본 이미지 로드")
    for img_file, view_name in IMAGE_VIEWS.items():
        img_path = RAW_DIR / img_file
        img = cv2.imread(str(img_path))
        if img is not None:
            images[view_name] = img
            print(f"  {view_name}: {img_file} ({img.shape[1]}x{img.shape[0]})")
        else:
            print(f"  Error: {img_file} 로드 실패")

    if not images:
        print("Error: 로드된 이미지가 없습니다.")
        return

    # 기존 데이터 정리
    print("\n[2/4] 기존 데이터 정리")
    for split in ['train', 'val', 'test']:
        for category in ['good', 'defect']:
            folder = DATA_DIR / split / category
            folder.mkdir(parents=True, exist_ok=True)
            # 기존 파일 삭제
            for f in folder.glob('*.png'):
                f.unlink()
            for f in folder.glob('*.jpg'):
                f.unlink()
    print("  완료")

    # 데이터 생성
    print("\n[3/4] 데이터 생성")
    stats = {}

    for split, config in CONFIG.items():
        print(f"\n  [{split.upper()}]")
        stats[split] = {'good': 0, 'defect': 0}

        good_dir = DATA_DIR / split / 'good'
        defect_dir = DATA_DIR / split / 'defect'

        # 양품 생성
        for view_name, img in images.items():
            for i in range(config['good_per_image']):
                # 각 이미지마다 다른 시드
                random.seed(hash(f"{split}_{view_name}_good_{i}") % 2**32)
                np.random.seed(hash(f"{split}_{view_name}_good_{i}") % 2**32)

                augmented = augment_good(img)
                filename = f"good_{view_name}_{i+1:03d}.png"
                cv2.imwrite(str(good_dir / filename), augmented)
                stats[split]['good'] += 1

        print(f"    양품: {stats[split]['good']}개")

        # 불량 생성
        for view_name, img in images.items():
            for defect_type in DEFECT_TYPES:
                for i in range(config['defect_per_type_per_image']):
                    # 각 결함마다 다른 시드
                    random.seed(hash(f"{split}_{view_name}_{defect_type}_{i}") % 2**32)
                    np.random.seed(hash(f"{split}_{view_name}_{defect_type}_{i}") % 2**32)

                    # 먼저 양품 증강 적용 후 결함 추가
                    base_img = augment_good(img, intensity=0.5)
                    defect_img = DEFECT_FUNCTIONS[defect_type](base_img)

                    filename = f"defect_{view_name}_{defect_type}_{i+1:03d}.png"
                    cv2.imwrite(str(defect_dir / filename), defect_img)
                    stats[split]['defect'] += 1

        print(f"    불량: {stats[split]['defect']}개")

    # 결과 요약
    print("\n" + "="*60)
    print("  [4/4] 생성 완료!")
    print("="*60)
    print("\n  데이터셋 구성:")
    print("  " + "-"*40)
    print(f"  {'분류':<10} {'양품':>10} {'불량':>10} {'합계':>10}")
    print("  " + "-"*40)

    total_good = 0
    total_defect = 0
    for split in ['train', 'val', 'test']:
        g = stats[split]['good']
        d = stats[split]['defect']
        total_good += g
        total_defect += d
        print(f"  {split:<10} {g:>10} {d:>10} {g+d:>10}")

    print("  " + "-"*40)
    print(f"  {'합계':<10} {total_good:>10} {total_defect:>10} {total_good+total_defect:>10}")
    print()
    print(f"  저장 위치: {DATA_DIR}")
    print()

    # 결함 유형별 분포
    print("  결함 유형별 분포 (train 기준):")
    for defect_type in DEFECT_TYPES:
        count = config['defect_per_type_per_image'] * len(images)
        print(f"    - {defect_type}: {count}개/split × 3 views")


if __name__ == '__main__':
    generate_dataset()
