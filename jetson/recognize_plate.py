#!/usr/bin/env python3
"""
자동차 번호판 인식 스크립트
Tesseract OCR을 이용하여 이미지에서 번호판 텍스트를 추출합니다.
"""

import os
import sys
from PIL import Image, ImageFilter, ImageOps
import pytesseract

# 데이터 폴더 경로
DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'list.md')

def preprocess_image(image_path):
    """이미지 전처리: 그레이스케일, 대비 향상, 이진화"""
    img = Image.open(image_path)

    # 그레이스케일 변환
    gray = ImageOps.grayscale(img)

    # 대비 향상
    enhanced = ImageOps.autocontrast(gray, cutoff=2)

    # 선명하게
    sharpened = enhanced.filter(ImageFilter.SHARPEN)

    return sharpened

def recognize_plate(image_path):
    """번호판 텍스트 인식"""
    try:
        # 전처리
        processed = preprocess_image(image_path)

        # OCR 설정 (한글 + 영어)
        # psm 6: 단일 텍스트 블록 가정
        # psm 7: 단일 라인 텍스트
        config = '--psm 6 -l kor+eng'

        # OCR 실행
        text = pytesseract.image_to_string(processed, config=config)

        # 텍스트 정리
        text = text.strip()
        text = ' '.join(text.split())  # 여러 공백을 하나로

        return text if text else "인식 불가"

    except Exception as e:
        return f"오류: {str(e)}"

def process_all_images():
    """data 폴더의 모든 이미지 처리"""
    results = []

    # PNG 파일 목록
    image_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])

    print(f"총 {len(image_files)}개 이미지 발견\n")
    print("-" * 50)

    for image_file in image_files:
        image_path = os.path.join(DATA_DIR, image_file)

        print(f"처리 중: {image_file}")

        # 번호판 인식
        plate_text = recognize_plate(image_path)

        print(f"  -> 인식 결과: {plate_text}")
        print()

        results.append({
            'filename': image_file,
            'plate': plate_text
        })

    return results

def write_results(results):
    """결과를 list.md 파일에 저장"""
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("# 자동차 번호판 인식 결과\n\n")
        f.write(f"**인식 일시:** {get_timestamp()}\n")
        f.write(f"**총 이미지 수:** {len(results)}개\n\n")
        f.write("---\n\n")
        f.write("| 순번 | 파일명 | 인식된 번호판 |\n")
        f.write("|:----:|--------|---------------|\n")

        for i, result in enumerate(results, 1):
            plate = result['plate'].replace('\n', ' ')
            f.write(f"| {i} | {result['filename']} | {plate} |\n")

        f.write("\n---\n\n")
        f.write("*Tesseract OCR (한글+영어) 사용*\n")

    print(f"\n결과가 {OUTPUT_FILE}에 저장되었습니다.")

def get_timestamp():
    """현재 시간 반환"""
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def main():
    print("=" * 50)
    print("자동차 번호판 인식 시작")
    print("=" * 50)
    print()

    # 데이터 폴더 확인
    if not os.path.exists(DATA_DIR):
        print(f"오류: 데이터 폴더를 찾을 수 없습니다: {DATA_DIR}")
        sys.exit(1)

    # 이미지 처리
    results = process_all_images()

    # 결과 저장
    write_results(results)

    print("\n" + "=" * 50)
    print("번호판 인식 완료")
    print("=" * 50)

if __name__ == "__main__":
    main()
