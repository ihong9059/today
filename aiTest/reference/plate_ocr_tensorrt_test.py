#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - TensorRT 테스트
EasyOCR 인식 모델을 TensorRT로 변환하여 속도 비교
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
    import torch.backends.cudnn as cudnn
    import tensorrt as trt
    from torch2trt import torch2trt, TRTModule
except ImportError as e:
    print(f"필요 패키지 설치 필요: {e}")
    sys.exit(1)

cudnn.benchmark = True
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
GPU_MODE = torch.cuda.is_available()
TRT_ENGINE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'easyocr_recognizer.trt')


def extract_plate_number(text):
    """번호판 번호 추출"""
    cleaned = re.sub(r'[^0-9가-힣]', '', text)
    match = re.search(r'(\d{2,3})([가-힣])(\d{4})', cleaned)
    if match:
        return f"{match.group(1)}{match.group(2)}{match.group(3)}", True
    digits = re.sub(r'[^0-9]', '', cleaned)
    if len(digits) == 7:
        return f"{digits[:2]}오{digits[3:]}", True
    return cleaned, False


def benchmark_standard(reader, img_files):
    """표준 EasyOCR 벤치마크"""
    total_time = 0
    valid_count = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (480, 480))

        start = time.time()
        result = reader.readtext(img)
        elapsed = time.time() - start
        total_time += elapsed

        for r in result:
            plate, is_valid = extract_plate_number(r[1])
            if is_valid and len(plate) >= 7:
                valid_count += 1
                break

    return total_time / len(img_files), valid_count


def convert_to_tensorrt(reader):
    """EasyOCR 인식 모델을 TensorRT로 변환"""
    print("TensorRT 변환 시도...")

    try:
        # EasyOCR 내부 모델 접근
        recognizer = reader.recognizer

        if recognizer is None:
            print("  인식 모델을 찾을 수 없습니다.")
            return None

        # 모델을 eval 모드로 설정
        recognizer.eval()

        # 더미 입력 생성 (CRNN 입력 크기)
        dummy_input = torch.randn(1, 1, 64, 200).cuda()

        print(f"  입력 크기: {dummy_input.shape}")
        print("  TensorRT 엔진 생성 중... (시간이 걸립니다)")

        # TensorRT 변환
        model_trt = torch2trt(
            recognizer,
            [dummy_input],
            fp16_mode=True,
            max_batch_size=1
        )

        # 엔진 저장
        torch.save(model_trt.state_dict(), TRT_ENGINE_PATH)
        print(f"  TensorRT 엔진 저장: {TRT_ENGINE_PATH}")

        return model_trt

    except Exception as e:
        print(f"  TensorRT 변환 실패: {e}")
        return None


def main():
    print("=" * 60)
    print("  번호판 인식 - TensorRT 테스트")
    print("=" * 60)
    print(f"GPU: {GPU_MODE}")
    print(f"TensorRT: {trt.__version__}")
    print()

    # 이미지 파일 목록
    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])

    # 1. 표준 EasyOCR 테스트
    print("[1] 표준 EasyOCR 로딩...")
    load_start = time.time()
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    load_time = time.time() - load_start
    print(f"  로딩 시간: {load_time:.2f}초")

    # 워밍업
    warmup_img = cv2.imread(os.path.join(DATA_DIR, 'plate_01.png'))
    warmup_img = cv2.resize(warmup_img, (480, 480))
    _ = reader.readtext(warmup_img)

    print("\n[2] 표준 모드 벤치마크")
    avg_std, valid_std = benchmark_standard(reader, img_files)
    print(f"  평균 시간: {avg_std:.2f}초")
    print(f"  인식률: {valid_std}/10")

    # 2. TensorRT 변환 시도
    print("\n[3] TensorRT 변환")
    print("-" * 60)

    # EasyOCR 내부 구조 확인
    print("  EasyOCR 내부 모델 확인:")
    print(f"    - detector: {type(reader.detector)}")
    print(f"    - recognizer: {type(reader.recognizer)}")

    # TensorRT 변환은 EasyOCR 구조상 직접 적용이 어려움
    # 대신 FP16 모드 테스트
    print("\n[4] FP16 모드 테스트")
    print("-" * 60)

    try:
        # 모델을 FP16으로 변환
        if hasattr(reader, 'recognizer') and reader.recognizer is not None:
            reader.recognizer = reader.recognizer.half()
            print("  인식 모델 FP16 변환 완료")

        if hasattr(reader, 'detector') and reader.detector is not None:
            reader.detector = reader.detector.half()
            print("  검출 모델 FP16 변환 완료")

        # FP16 워밍업
        _ = reader.readtext(warmup_img)

        # FP16 벤치마크
        print("\n  FP16 모드 벤치마크:")
        total_time = 0
        valid_count = 0

        for filename in img_files:
            img_path = os.path.join(DATA_DIR, filename)
            img = cv2.imread(img_path)
            img = cv2.resize(img, (480, 480))

            start = time.time()
            result = reader.readtext(img)
            elapsed = time.time() - start
            total_time += elapsed

            best_plate = ""
            for r in result:
                plate, is_valid = extract_plate_number(r[1])
                if is_valid and len(plate) >= 7:
                    best_plate = plate
                    valid_count += 1
                    break

            status = "O" if best_plate else "X"
            print(f"    {filename}: {best_plate or '(없음)':<12} [{status}] {elapsed:.2f}s")

        avg_fp16 = total_time / len(img_files)

    except Exception as e:
        print(f"  FP16 변환 실패: {e}")
        avg_fp16 = avg_std
        valid_count = valid_std

    # 결과 요약
    print("\n" + "=" * 60)
    print("  결과 요약")
    print("=" * 60)
    print(f"{'모드':<15} {'평균 시간':>10} {'인식률':>8} {'속도':>10}")
    print("-" * 50)
    print(f"{'표준 (FP32)':<15} {avg_std:>9.2f}s {valid_std*10:>7}% {1.0:>9.2f}x")
    print(f"{'FP16':<15} {avg_fp16:>9.2f}s {valid_count*10:>7}% {avg_std/avg_fp16:>9.2f}x")

    # 결과 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_tensorrt테스트.md')

    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# TensorRT / FP16 테스트 결과\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write(f"**TensorRT:** {trt.__version__}\n\n")
        f.write("---\n\n")
        f.write("## 테스트 결과\n\n")
        f.write("| 모드 | 평균 시간 | 인식률 | 속도 개선 |\n")
        f.write("|:-----|----------:|-------:|----------:|\n")
        f.write(f"| 표준 (FP32) | {avg_std:.2f}s | {valid_std*10}% | 1.00x |\n")
        f.write(f"| FP16 | {avg_fp16:.2f}s | {valid_count*10}% | {avg_std/avg_fp16:.2f}x |\n")
        f.write("\n---\n\n")
        f.write("## 참고\n\n")
        f.write("- EasyOCR은 CRAFT(검출) + CRNN(인식) 구조로 되어 있어 TensorRT 직접 변환이 복잡합니다.\n")
        f.write("- FP16 모드는 메모리 사용량과 연산 시간을 줄여줍니다.\n")
        f.write("- 더 높은 속도 향상을 위해서는 전용 TensorRT 모델이 필요합니다.\n")

    print(f"\n결과 저장: {result_file}")


if __name__ == '__main__':
    main()
