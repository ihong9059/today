#!/usr/bin/env python3
"""
유틸리티 함수 모듈
"""

import os
import re
import logging
from datetime import datetime
from typing import Optional

import cv2
import numpy as np


def setup_logging(level: int = logging.INFO, log_file: Optional[str] = None):
    """
    로깅 설정

    Args:
        level: 로깅 레벨
        log_file: 로그 파일 경로 (None이면 콘솔만)
    """
    format_str = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'

    handlers = [logging.StreamHandler()]

    if log_file:
        os.makedirs(os.path.dirname(log_file), exist_ok=True)
        handlers.append(logging.FileHandler(log_file, encoding='utf-8'))

    logging.basicConfig(
        level=level,
        format=format_str,
        handlers=handlers
    )


def validate_plate_format(text: str) -> bool:
    """
    한국 번호판 형식 검증

    Args:
        text: 검증할 텍스트

    Returns:
        유효한 형식이면 True
    """
    if not text:
        return False

    # 번호판 패턴들
    patterns = [
        # 신형 번호판 (2019년 이후)
        # 예: 12가3456, 123가4567
        r'^[0-9]{2,3}[가-힣][0-9]{4}$',

        # 구형 번호판 (지역명 포함)
        # 예: 서울12가3456
        r'^[가-힣]{2}[0-9]{2}[가-힣][0-9]{4}$',

        # 영업용 번호판
        # 예: 서울12바3456
        r'^[가-힣]{2}[0-9]{2}[아바사자][0-9]{4}$',

        # 전기차 번호판
        # 예: 12저3456
        r'^[0-9]{2,3}[가-힣][0-9]{4}$',
    ]

    for pattern in patterns:
        if re.match(pattern, text):
            return True

    # 최소 조건: 숫자-한글-숫자 패턴
    if re.match(r'^[0-9]+[가-힣]+[0-9]+$', text) and len(text) >= 7:
        return True

    return False


def save_result(frame: np.ndarray, result: dict, output_dir: str) -> str:
    """
    인식 결과 저장

    Args:
        frame: 원본 이미지
        result: 인식 결과 딕셔너리
        output_dir: 저장 디렉토리

    Returns:
        저장된 파일 경로
    """
    os.makedirs(output_dir, exist_ok=True)

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    if result.get('success') and result.get('plate_number'):
        plate = result['plate_number']
        filename = f"{timestamp}_{plate}.jpg"
    else:
        filename = f"{timestamp}_unknown.jpg"

    filepath = os.path.join(output_dir, filename)

    # 번호판 영역 표시 (성공한 경우)
    if result.get('success') and result.get('plate_region'):
        x, y, w, h = result['plate_region']
        frame_copy = frame.copy()
        cv2.rectangle(frame_copy, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # 텍스트 표시
        text = f"{result['plate_number']} ({result['confidence']:.1f}%)"
        cv2.putText(frame_copy, text, (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

        cv2.imwrite(filepath, frame_copy)
    else:
        cv2.imwrite(filepath, frame)

    logging.getLogger(__name__).info(f"이미지 저장: {filepath}")
    return filepath


def draw_plate_region(frame: np.ndarray, rect: tuple, text: str = "",
                      color: tuple = (0, 255, 0)) -> np.ndarray:
    """
    이미지에 번호판 영역 표시

    Args:
        frame: 원본 이미지
        rect: 영역 (x, y, w, h)
        text: 표시할 텍스트
        color: 색상 (B, G, R)

    Returns:
        영역이 표시된 이미지
    """
    x, y, w, h = rect
    result = frame.copy()

    # 사각형 그리기
    cv2.rectangle(result, (x, y), (x + w, y + h), color, 2)

    # 텍스트 표시
    if text:
        cv2.putText(result, text, (x, y - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

    return result


def resize_with_aspect_ratio(image: np.ndarray, width: int = None,
                              height: int = None) -> np.ndarray:
    """
    가로세로 비율 유지하며 리사이즈

    Args:
        image: 원본 이미지
        width: 목표 너비 (None이면 height 기준)
        height: 목표 높이 (None이면 width 기준)

    Returns:
        리사이즈된 이미지
    """
    h, w = image.shape[:2]

    if width is None and height is None:
        return image

    if width is None:
        ratio = height / h
        dim = (int(w * ratio), height)
    else:
        ratio = width / w
        dim = (width, int(h * ratio))

    return cv2.resize(image, dim, interpolation=cv2.INTER_AREA)


def load_whitelist(filepath: str) -> set:
    """
    화이트리스트 파일 로드

    Args:
        filepath: 파일 경로

    Returns:
        번호판 집합
    """
    whitelist = set()

    if not os.path.exists(filepath):
        logging.getLogger(__name__).warning(f"화이트리스트 파일 없음: {filepath}")
        return whitelist

    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                # 공백 제거
                plate = line.replace(' ', '')
                whitelist.add(plate)

    logging.getLogger(__name__).info(f"화이트리스트 로드: {len(whitelist)}개")
    return whitelist


def check_whitelist(plate: str, whitelist: set) -> bool:
    """
    화이트리스트 확인

    Args:
        plate: 번호판 번호
        whitelist: 화이트리스트 집합

    Returns:
        화이트리스트에 있으면 True
    """
    return plate in whitelist


def get_system_info() -> dict:
    """
    시스템 정보 수집

    Returns:
        시스템 정보 딕셔너리
    """
    import platform

    info = {
        'platform': platform.system(),
        'platform_release': platform.release(),
        'python_version': platform.python_version(),
    }

    # Raspberry Pi 온도 (가능한 경우)
    try:
        with open('/sys/class/thermal/thermal_zone0/temp', 'r') as f:
            temp = int(f.read()) / 1000
            info['cpu_temp'] = f"{temp:.1f}°C"
    except:
        pass

    # OpenCV 버전
    info['opencv_version'] = cv2.__version__

    return info


def calculate_fps(start_time: float, frame_count: int) -> float:
    """
    FPS 계산

    Args:
        start_time: 시작 시간
        frame_count: 프레임 수

    Returns:
        FPS
    """
    import time
    elapsed = time.time() - start_time
    return frame_count / elapsed if elapsed > 0 else 0


# 테스트 코드
if __name__ == '__main__':
    # 번호판 형식 검증 테스트
    test_plates = [
        "12가3456",      # 신형 (유효)
        "123나4567",     # 신형 (유효)
        "서울12가3456",  # 구형 (유효)
        "1가23",         # 무효
        "ABCD1234",      # 무효
    ]

    print("번호판 형식 검증 테스트:")
    for plate in test_plates:
        valid = validate_plate_format(plate)
        print(f"  {plate}: {'유효' if valid else '무효'}")

    print("\n시스템 정보:")
    info = get_system_info()
    for key, value in info.items():
        print(f"  {key}: {value}")
