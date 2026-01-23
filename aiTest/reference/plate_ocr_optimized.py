#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
번호판 인식 - 속도 최적화 테스트
FP16, cuDNN benchmark 모드 비교
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
except ImportError:
    print("필요 패키지: pip install easyocr opencv-python torch")
    sys.exit(1)

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
GPU_MODE = torch.cuda.is_available()


def extract_plate_number(text):
    """번호판 번호 추출 (보정 포함)"""
    cleaned = re.sub(r'[^0-9가-힣]', '', text)
    match = re.search(r'(\d{2,3})([가-힣])(\d{4})', cleaned)
    if match:
        return f"{match.group(1)}{match.group(2)}{match.group(3)}", True

    digits = re.sub(r'[^0-9]', '', cleaned)
    if len(digits) == 7:
        return f"{digits[:2]}오{digits[3:]}", True
    if len(digits) == 8:
        return f"{digits[:3]}오{digits[4:]}", True

    return cleaned, False


def benchmark_mode(mode_name, use_fp16=False, use_cudnn_benchmark=False):
    """
    특정 최적화 모드로 벤치마크 실행
    """
    print(f"\n{'='*60}")
    print(f"  모드: {mode_name}")
    print(f"  FP16: {use_fp16}, cuDNN benchmark: {use_cudnn_benchmark}")
    print(f"{'='*60}")

    # cuDNN 설정
    if use_cudnn_benchmark:
        cudnn.benchmark = True
        cudnn.deterministic = False
    else:
        cudnn.benchmark = False

    # 모델 로딩
    print("\n[1] 모델 로딩...")
    load_start = time.time()
    reader = easyocr.Reader(['ko', 'en'], gpu=GPU_MODE)
    load_time = time.time() - load_start
    print(f"  로딩 시간: {load_time:.2f}초")

    # FP16 변환 (가능한 경우)
    if use_fp16 and GPU_MODE:
        try:
            # EasyOCR 내부 모델을 FP16으로 변환 시도
            if hasattr(reader, 'detector') and reader.detector is not None:
                reader.detector.half()
            if hasattr(reader, 'recognizer') and reader.recognizer is not None:
                reader.recognizer.half()
            print("  FP16 변환: 성공")
        except Exception as e:
            print(f"  FP16 변환: 실패 ({e})")

    # 워밍업
    print("\n[2] 워밍업...")
    warmup_img = cv2.imread(os.path.join(DATA_DIR, 'plate_01.png'))
    warmup_img = cv2.resize(warmup_img, (640, 640))

    warmup_start = time.time()
    _ = reader.readtext(warmup_img)
    warmup_time = time.time() - warmup_start
    print(f"  워밍업 시간: {warmup_time:.2f}초")

    # 벤치마크
    print("\n[3] 벤치마크 (10개 이미지)")
    print("-" * 60)

    img_files = sorted([f for f in os.listdir(DATA_DIR) if f.endswith('.png')])
    results = []
    total_time = 0
    valid_count = 0

    for filename in img_files:
        img_path = os.path.join(DATA_DIR, filename)
        img = cv2.imread(img_path)
        img = cv2.resize(img, (640, 640))

        # FP16용 이미지 변환
        if use_fp16 and GPU_MODE:
            img_input = img.astype(np.float16)
        else:
            img_input = img

        start = time.time()
        ocr_result = reader.readtext(img)
        elapsed = time.time() - start
        total_time += elapsed

        # 번호판 추출
        best_plate = ""
        for r in ocr_result:
            plate, is_valid = extract_plate_number(r[1])
            if is_valid and len(plate) >= 7:
                best_plate = plate
                break

        is_valid = bool(best_plate)
        if is_valid:
            valid_count += 1

        results.append({
            'file': filename,
            'plate': best_plate or "(없음)",
            'time': elapsed,
            'valid': is_valid
        })

        status = "✅" if is_valid else "❌"
        print(f"  {filename}: {best_plate or '(없음)':<12} {status} ({elapsed:.2f}s)")

    # 결과 요약
    avg_time = total_time / len(img_files)
    print(f"\n[4] 결과 요약")
    print(f"  인식률: {valid_count}/10 ({valid_count*10}%)")
    print(f"  총 시간: {total_time:.2f}초")
    print(f"  평균 시간: {avg_time:.2f}초")

    return {
        'mode': mode_name,
        'load_time': load_time,
        'warmup_time': warmup_time,
        'total_time': total_time,
        'avg_time': avg_time,
        'valid_count': valid_count
    }


def main():
    print("=" * 60)
    print("  번호판 인식 - 속도 최적화 테스트")
    print("=" * 60)
    print(f"GPU 사용: {GPU_MODE}")
    if GPU_MODE:
        print(f"GPU: {torch.cuda.get_device_name(0)}")
        print(f"CUDA: {torch.version.cuda}")
        print(f"cuDNN: {cudnn.version()}")

    all_results = []

    # 모드 1: 기본 (FP32, cuDNN off)
    result1 = benchmark_mode("기본 (FP32)", use_fp16=False, use_cudnn_benchmark=False)
    all_results.append(result1)

    # 모드 2: cuDNN benchmark
    result2 = benchmark_mode("cuDNN benchmark", use_fp16=False, use_cudnn_benchmark=True)
    all_results.append(result2)

    # 모드 3: FP16 (GPU만)
    if GPU_MODE:
        result3 = benchmark_mode("FP16 (반정밀도)", use_fp16=True, use_cudnn_benchmark=False)
        all_results.append(result3)

        # 모드 4: FP16 + cuDNN
        result4 = benchmark_mode("FP16 + cuDNN", use_fp16=True, use_cudnn_benchmark=True)
        all_results.append(result4)

    # 최종 비교
    print("\n")
    print("=" * 60)
    print("  최종 비교")
    print("=" * 60)
    print(f"{'모드':<20} {'로딩':>8} {'워밍업':>8} {'평균':>8} {'인식률':>8}")
    print("-" * 60)

    baseline_avg = all_results[0]['avg_time']
    for r in all_results:
        speedup = baseline_avg / r['avg_time'] if r['avg_time'] > 0 else 0
        print(f"{r['mode']:<20} {r['load_time']:>7.2f}s {r['warmup_time']:>7.2f}s {r['avg_time']:>7.2f}s {r['valid_count']*10:>7}%")

    print("-" * 60)
    print("\n속도 개선율 (기본 대비):")
    for r in all_results[1:]:
        speedup = baseline_avg / r['avg_time'] if r['avg_time'] > 0 else 0
        improvement = (1 - r['avg_time']/baseline_avg) * 100
        print(f"  {r['mode']}: {speedup:.2f}x ({improvement:+.1f}%)")

    # 결과 파일 저장
    result_file = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               '번호판_인식결과_최적화테스트.md')

    with open(result_file, 'w', encoding='utf-8') as f:
        f.write("# 번호판 인식 - 속도 최적화 테스트 결과\n\n")
        f.write(f"**생성일시:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write(f"**GPU:** {torch.cuda.get_device_name(0) if GPU_MODE else 'CPU only'}\n\n")
        f.write("---\n\n")
        f.write("## 테스트 결과\n\n")
        f.write(f"| 모드 | 모델 로딩 | 워밍업 | 평균 시간 | 인식률 | 속도 개선 |\n")
        f.write(f"|:-----|----------:|-------:|----------:|-------:|----------:|\n")

        for r in all_results:
            speedup = baseline_avg / r['avg_time'] if r['avg_time'] > 0 else 0
            f.write(f"| {r['mode']} | {r['load_time']:.2f}s | {r['warmup_time']:.2f}s | {r['avg_time']:.2f}s | {r['valid_count']*10}% | {speedup:.2f}x |\n")

        f.write("\n---\n\n")
        f.write("## 결론\n\n")

        best = min(all_results, key=lambda x: x['avg_time'])
        f.write(f"- **최적 모드**: {best['mode']}\n")
        f.write(f"- **최고 속도**: {best['avg_time']:.2f}초/장\n")
        f.write(f"- **기본 대비 개선**: {baseline_avg/best['avg_time']:.2f}x\n")

    print(f"\n결과 저장: {result_file}")


if __name__ == '__main__':
    main()
