#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
볼트 학습 데이터 생성기
- 표준 볼트 이미지로부터 양품/불량 시뮬레이션 이미지 생성
"""

import os
import cv2
import numpy as np
import random
from pathlib import Path
import argparse


class BoltDataGenerator:
    """볼트 이미지 데이터 생성기"""

    def __init__(self, output_dir):
        self.output_dir = Path(output_dir)
        self.good_dir = self.output_dir / 'train' / 'good'
        self.defect_dir = self.output_dir / 'train' / 'defect'

        # 폴더 생성
        self.good_dir.mkdir(parents=True, exist_ok=True)
        self.defect_dir.mkdir(parents=True, exist_ok=True)

    def augment_good(self, img, num_samples=20):
        """양품 이미지 증강"""
        samples = []

        for i in range(num_samples):
            augmented = img.copy()

            # 1. 회전 (±15도)
            angle = random.uniform(-15, 15)
            h, w = augmented.shape[:2]
            M = cv2.getRotationMatrix2D((w/2, h/2), angle, 1.0)
            augmented = cv2.warpAffine(augmented, M, (w, h),
                                       borderMode=cv2.BORDER_REFLECT)

            # 2. 이동 (±10%)
            tx = random.uniform(-0.1, 0.1) * w
            ty = random.uniform(-0.1, 0.1) * h
            M = np.float32([[1, 0, tx], [0, 1, ty]])
            augmented = cv2.warpAffine(augmented, M, (w, h),
                                       borderMode=cv2.BORDER_REFLECT)

            # 3. 밝기 조절 (±20%)
            brightness = random.uniform(0.8, 1.2)
            augmented = cv2.convertScaleAbs(augmented, alpha=brightness, beta=0)

            # 4. 대비 조절
            contrast = random.uniform(0.9, 1.1)
            augmented = cv2.convertScaleAbs(augmented, alpha=contrast, beta=0)

            # 5. 가우시안 노이즈 (약간)
            if random.random() > 0.5:
                noise = np.random.normal(0, 5, augmented.shape).astype(np.uint8)
                augmented = cv2.add(augmented, noise)

            # 6. 블러 (약간)
            if random.random() > 0.7:
                augmented = cv2.GaussianBlur(augmented, (3, 3), 0)

            samples.append(augmented)

        return samples

    def generate_scratch(self, img):
        """스크래치 결함 생성"""
        result = img.copy()
        h, w = result.shape[:2]

        num_scratches = random.randint(1, 3)

        for _ in range(num_scratches):
            # 스크래치 시작/끝점
            x1 = random.randint(int(w*0.2), int(w*0.8))
            y1 = random.randint(int(h*0.2), int(h*0.8))
            length = random.randint(20, 80)
            angle = random.uniform(0, np.pi)
            x2 = int(x1 + length * np.cos(angle))
            y2 = int(y1 + length * np.sin(angle))

            # 스크래치 색상 (어둡거나 밝은 선)
            if random.random() > 0.5:
                color = (random.randint(30, 80),) * 3  # 어두운 스크래치
            else:
                color = (random.randint(180, 220),) * 3  # 밝은 스크래치

            thickness = random.randint(1, 3)
            cv2.line(result, (x1, y1), (x2, y2), color, thickness)

        return result

    def generate_dent(self, img):
        """찍힘/움푹 들어간 결함 생성"""
        result = img.copy()
        h, w = result.shape[:2]

        num_dents = random.randint(1, 3)

        for _ in range(num_dents):
            # 찍힘 위치와 크기
            cx = random.randint(int(w*0.2), int(w*0.8))
            cy = random.randint(int(h*0.2), int(h*0.8))
            radius = random.randint(5, 15)

            # 어두운 원형 영역 생성
            overlay = result.copy()
            color = (random.randint(40, 80),) * 3
            cv2.circle(overlay, (cx, cy), radius, color, -1)

            # 블렌딩
            alpha = random.uniform(0.3, 0.7)
            result = cv2.addWeighted(overlay, alpha, result, 1-alpha, 0)

        return result

    def generate_rust(self, img):
        """녹/부식 결함 생성"""
        result = img.copy()
        h, w = result.shape[:2]

        # 녹 영역 마스크 생성
        mask = np.zeros((h, w), dtype=np.uint8)

        num_spots = random.randint(2, 5)
        for _ in range(num_spots):
            cx = random.randint(int(w*0.1), int(w*0.9))
            cy = random.randint(int(h*0.1), int(h*0.9))
            axes = (random.randint(10, 30), random.randint(10, 30))
            angle = random.randint(0, 180)
            cv2.ellipse(mask, (cx, cy), axes, angle, 0, 360, 255, -1)

        # 녹 색상 (갈색/주황색 계열)
        rust_color = np.zeros_like(result)
        rust_color[:, :] = (
            random.randint(30, 60),   # B
            random.randint(60, 100),  # G
            random.randint(120, 180)  # R - 갈색/주황
        )

        # 마스크 블러링 (자연스러운 경계)
        mask = cv2.GaussianBlur(mask, (15, 15), 0)

        # 녹 적용
        mask_3ch = cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR) / 255.0
        result = (result * (1 - mask_3ch * 0.6) + rust_color * mask_3ch * 0.6).astype(np.uint8)

        return result

    def generate_crack(self, img):
        """균열 결함 생성"""
        result = img.copy()
        h, w = result.shape[:2]

        # 균열 시작점
        start_x = random.randint(int(w*0.3), int(w*0.7))
        start_y = random.randint(int(h*0.3), int(h*0.7))

        # 균열 경로 생성 (랜덤 워크)
        points = [(start_x, start_y)]
        current_x, current_y = start_x, start_y

        num_segments = random.randint(5, 15)
        for _ in range(num_segments):
            dx = random.randint(-20, 20)
            dy = random.randint(-20, 20)
            current_x = max(0, min(w-1, current_x + dx))
            current_y = max(0, min(h-1, current_y + dy))
            points.append((current_x, current_y))

        # 균열 그리기
        color = (random.randint(20, 50),) * 3
        for i in range(len(points) - 1):
            thickness = random.randint(1, 2)
            cv2.line(result, points[i], points[i+1], color, thickness)

        return result

    def generate_missing_thread(self, img):
        """나사산 결손 시뮬레이션"""
        result = img.copy()
        h, w = result.shape[:2]

        # 나사산 영역 (이미지 일부를 블러 + 색상 변경)
        x1 = random.randint(0, int(w*0.3))
        y1 = random.randint(int(h*0.2), int(h*0.5))
        x2 = x1 + random.randint(30, 60)
        y2 = y1 + random.randint(20, 40)

        x2 = min(x2, w)
        y2 = min(y2, h)

        # 해당 영역 블러 + 어둡게
        roi = result[y1:y2, x1:x2]
        if roi.size > 0:
            roi = cv2.GaussianBlur(roi, (5, 5), 0)
            roi = cv2.convertScaleAbs(roi, alpha=0.7, beta=-20)
            result[y1:y2, x1:x2] = roi

        return result

    def generate_contamination(self, img):
        """이물질/오염 결함 생성"""
        result = img.copy()
        h, w = result.shape[:2]

        num_spots = random.randint(1, 4)

        for _ in range(num_spots):
            # 이물질 위치와 크기
            cx = random.randint(int(w*0.1), int(w*0.9))
            cy = random.randint(int(h*0.1), int(h*0.9))
            size = random.randint(5, 20)

            # 불규칙한 형태
            pts = []
            for angle in np.linspace(0, 2*np.pi, 8):
                r = size * random.uniform(0.5, 1.5)
                x = int(cx + r * np.cos(angle))
                y = int(cy + r * np.sin(angle))
                pts.append([x, y])
            pts = np.array(pts)

            # 어두운 색상 (기름, 먼지)
            color = (
                random.randint(20, 60),
                random.randint(20, 60),
                random.randint(20, 60)
            )

            cv2.fillPoly(result, [pts], color)

        return result

    def generate_defects(self, img, num_per_type=10):
        """모든 유형의 결함 이미지 생성"""
        defect_functions = {
            'scratch': self.generate_scratch,
            'dent': self.generate_dent,
            'rust': self.generate_rust,
            'crack': self.generate_crack,
            'missing_thread': self.generate_missing_thread,
            'contamination': self.generate_contamination,
        }

        all_defects = []

        for defect_type, func in defect_functions.items():
            for i in range(num_per_type):
                # 기본 결함 생성
                defect_img = func(img.copy())

                # 추가 증강 적용
                defect_img = self._apply_augmentation(defect_img)

                all_defects.append((defect_type, defect_img))

        return all_defects

    def _apply_augmentation(self, img):
        """기본 증강 적용"""
        # 회전
        angle = random.uniform(-10, 10)
        h, w = img.shape[:2]
        M = cv2.getRotationMatrix2D((w/2, h/2), angle, 1.0)
        img = cv2.warpAffine(img, M, (w, h), borderMode=cv2.BORDER_REFLECT)

        # 밝기
        brightness = random.uniform(0.85, 1.15)
        img = cv2.convertScaleAbs(img, alpha=brightness, beta=0)

        return img

    def process(self, input_image_path, good_count=50, defect_per_type=20):
        """
        표준 이미지로부터 학습 데이터 생성

        Args:
            input_image_path: 표준 볼트 이미지 경로
            good_count: 생성할 양품 이미지 수
            defect_per_type: 결함 유형당 생성할 이미지 수
        """
        # 이미지 로드
        img = cv2.imread(input_image_path)
        if img is None:
            print(f"Error: Cannot load image: {input_image_path}")
            return

        print(f"원본 이미지 로드: {input_image_path}")
        print(f"이미지 크기: {img.shape}")

        # 1. 양품 이미지 생성
        print(f"\n[1/2] 양품 이미지 생성 중... ({good_count}개)")
        good_samples = self.augment_good(img, good_count)

        for i, sample in enumerate(good_samples):
            filename = self.good_dir / f"good_{i+1:04d}.jpg"
            cv2.imwrite(str(filename), sample)

        print(f"  → {len(good_samples)}개 저장 완료: {self.good_dir}")

        # 2. 불량 이미지 생성
        print(f"\n[2/2] 불량 이미지 생성 중... (유형당 {defect_per_type}개)")
        defect_samples = self.generate_defects(img, defect_per_type)

        defect_counts = {}
        for defect_type, sample in defect_samples:
            if defect_type not in defect_counts:
                defect_counts[defect_type] = 0
            defect_counts[defect_type] += 1

            idx = defect_counts[defect_type]
            filename = self.defect_dir / f"defect_{defect_type}_{idx:04d}.jpg"
            cv2.imwrite(str(filename), sample)

        print(f"  → {len(defect_samples)}개 저장 완료: {self.defect_dir}")

        # 3. 결과 요약
        print("\n" + "="*50)
        print("  데이터 생성 완료")
        print("="*50)
        print(f"  양품: {len(good_samples)}개")
        print(f"  불량: {len(defect_samples)}개")
        for dtype, count in defect_counts.items():
            print(f"    - {dtype}: {count}개")
        print(f"\n  저장 위치: {self.output_dir}")


def main():
    parser = argparse.ArgumentParser(description='볼트 학습 데이터 생성기')
    parser.add_argument('--input', '-i', required=True,
                        help='표준 볼트 이미지 경로')
    parser.add_argument('--output', '-o', default='./data',
                        help='출력 폴더 (기본: ./data)')
    parser.add_argument('--good', '-g', type=int, default=50,
                        help='생성할 양품 이미지 수 (기본: 50)')
    parser.add_argument('--defect', '-d', type=int, default=20,
                        help='결함 유형당 생성할 이미지 수 (기본: 20)')

    args = parser.parse_args()

    generator = BoltDataGenerator(args.output)
    generator.process(args.input, args.good, args.defect)


if __name__ == '__main__':
    main()
