#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
자동차 번호판 인식 프로그램 (Tesseract OCR 기반)
data 폴더의 이미지에서 번호판을 읽어 리스트 생성
"""

import os
import re
import time
from datetime import datetime
from glob import glob

import cv2
import pytesseract
from PIL import Image


class PlateOCR:
    """Tesseract 기반 번호판 인식기"""

    def __init__(self):
        print("Tesseract OCR 초기화 중...")
        # 한국 번호판 패턴
        self.patterns = [
            re.compile(r'[0-9]{2,3}[가-힣][0-9]{4}'),  # 신형: 12가1234, 123가1234
            re.compile(r'[가-힣]{2}[0-9]{2}[가-힣][0-9]{4}'),  # 구형: 서울12가1234
            re.compile(r'[0-9]{2}[가-힣][0-9]{4}'),  # 2자리+한글+4자리
        ]

    def preprocess_image(self, image):
        """이미지 전처리"""
        # 그레이스케일 변환
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # 리사이즈 (너무 크면 처리 느림)
        h, w = gray.shape[:2]
        max_dim = 1200
        if max(h, w) > max_dim:
            scale = max_dim / max(h, w)
            gray = cv2.resize(gray, None, fx=scale, fy=scale)

        # 이진화
        _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        return binary

    def extract_plate_number(self, text):
        """텍스트에서 번호판 패턴 추출"""
        # 공백 및 특수문자 제거
        cleaned = re.sub(r'[^0-9가-힣]', '', text)

        # 패턴 매칭
        for pattern in self.patterns:
            match = pattern.search(cleaned)
            if match:
                return match.group(), True

        # 패턴 미매칭시 숫자+한글 조합이 있으면 반환
        if re.search(r'[0-9]+[가-힣]+[0-9]+', cleaned):
            return cleaned, False

        return cleaned if cleaned else None, False

    def process_image(self, image_path):
        """이미지에서 번호판 인식"""
        image = cv2.imread(image_path)
        if image is None:
            return "이미지 로드 실패", False

        processed = self.preprocess_image(image)

        # OCR 수행 (한국어 + 영어)
        config = '--psm 6 -l kor+eng'
        text = pytesseract.image_to_string(processed, config=config)

        # 번호판 패턴 추출
        plate, is_valid = self.extract_plate_number(text)
        if plate:
            return plate, is_valid

        return "인식 실패", False


def main():
    print("\n" + "=" * 50)
    print("  자동차 번호판 인식 시스템 (Tesseract OCR)")
    print("=" * 50)

    # 경로 설정
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, 'data')
    output_file = os.path.join(base_dir, '번호판_인식결과_tesseract.md')

    # 이미지 검색
    print("\n[1/3] 이미지 검색 중...")
    image_files = []
    for ext in ['*.png', '*.jpg', '*.jpeg', '*.PNG', '*.JPG', '*.JPEG']:
        image_files.extend(glob(os.path.join(data_dir, ext)))
    image_files = list(set(image_files))
    image_files.sort()

    print(f"  발견된 이미지: {len(image_files)} 개")

    if not image_files:
        print("  오류: data 폴더에 이미지가 없습니다.")
        return

    # OCR 초기화
    print("\n[2/3] OCR 엔진 초기화...")
    ocr = PlateOCR()

    # 번호판 인식
    print("\n[3/3] 번호판 인식 중...")
    print("-" * 50)

    results = []
    total_start = time.time()

    for idx, img_path in enumerate(image_files, 1):
        filename = os.path.basename(img_path)
        print(f"\n[{idx}/{len(image_files)}] {filename}")

        start_time = time.time()
        plate, is_valid = ocr.process_image(img_path)
        elapsed = time.time() - start_time

        status = "O" if is_valid else "?"
        print(f"  결과: {plate} ({status}) - {elapsed:.2f}초")

        results.append({
            'filename': filename,
            'plate': plate,
            'valid': is_valid,
            'time': elapsed
        })

    total_time = time.time() - total_start

    # 결과 파일 생성
    print("\n" + "-" * 50)
    print("결과 파일 생성 중...")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# 자동차 번호판 인식 결과 (Tesseract OCR)\n\n")
        f.write(f"**생성일시:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("---\n\n")
        f.write("## 인식된 번호판 목록\n\n")
        f.write("| No | 파일명 | 번호판 | 상태 | 소요시간 |\n")
        f.write("|:---:|:---|:---|:---:|---:|\n")

        valid_count = 0
        for idx, r in enumerate(results, 1):
            status = "O" if r['valid'] else "?"
            if r['valid']:
                valid_count += 1
            f.write(f"| {idx} | {r['filename']} | **{r['plate']}** | {status} | {r['time']:.2f}s |\n")

        f.write("\n---\n\n")
        f.write("## 성능 요약\n\n")
        f.write(f"| 항목 | 값 |\n")
        f.write(f"|------|----:|\n")
        f.write(f"| 총 이미지 | {len(results)} 개 |\n")
        f.write(f"| 인식 성공 | {valid_count} 개 |\n")
        f.write(f"| 확인 필요 | {len(results) - valid_count} 개 |\n")
        f.write(f"| 인식률 | {valid_count/len(results)*100:.1f}% |\n")
        f.write(f"| 총 소요시간 | {total_time:.2f}초 |\n")
        f.write(f"| 이미지당 평균 | {total_time/len(results):.2f}초 |\n")

    print("\n" + "=" * 50)
    print("  완료!")
    print(f"  결과 파일: {output_file}")
    print(f"  인식 성공: {valid_count}/{len(results)}")
    print(f"  총 소요시간: {total_time:.2f}초")
    print(f"  이미지당 평균: {total_time/len(results):.2f}초")
    print("=" * 50 + "\n")


if __name__ == '__main__':
    main()
