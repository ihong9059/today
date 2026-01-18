#!/usr/bin/env python3
"""
License Plate Recognition (LPR) Main Script
ESP32-CAM + Raspberry Pi 기반 자동차 번호판 인식 시스템

Usage:
    python3 lpr_main.py --mode continuous --interval 3
"""

import os
import sys
import time
import argparse
import logging
from datetime import datetime

import cv2
import numpy as np
import yaml

from stream_capture import StreamCapture
from ocr_processor import OCRProcessor
from utils import setup_logging, validate_plate_format, save_result

# 설정 파일 경로
CONFIG_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'config', 'config.yaml')


class LicensePlateRecognizer:
    """번호판 인식 메인 클래스"""

    def __init__(self, config_path: str = CONFIG_PATH):
        """
        Args:
            config_path: 설정 파일 경로
        """
        self.config = self._load_config(config_path)
        self.logger = logging.getLogger(__name__)

        # 모듈 초기화
        self.stream_capture = StreamCapture(
            camera_url=self.config['camera']['url'],
            timeout=self.config['camera']['timeout']
        )
        self.ocr_processor = OCRProcessor(
            language=self.config['ocr']['language'],
            psm=self.config['ocr']['psm']
        )

        # 이미지 처리 파라미터
        self.img_config = self.config['image_processing']

        self.logger.info("LicensePlateRecognizer 초기화 완료")

    def _load_config(self, config_path: str) -> dict:
        """설정 파일 로드"""
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            # 기본 설정 사용
            return {
                'camera': {
                    'url': 'http://192.168.1.100',
                    'timeout': 5
                },
                'image_processing': {
                    'blur_kernel': 5,
                    'canny_low': 50,
                    'canny_high': 150,
                    'min_plate_area': 1000,
                    'max_plate_area': 50000,
                    'plate_aspect_ratio_min': 2.0,
                    'plate_aspect_ratio_max': 6.0
                },
                'ocr': {
                    'language': 'kor+eng',
                    'psm': 7
                },
                'storage': {
                    'save_images': True,
                    'image_dir': 'captured_images'
                }
            }

    def preprocess_image(self, frame: np.ndarray) -> np.ndarray:
        """
        이미지 전처리

        Args:
            frame: 원본 이미지

        Returns:
            전처리된 이미지 (엣지 검출 결과)
        """
        # 그레이스케일 변환
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # 가우시안 블러
        blur = cv2.GaussianBlur(
            gray,
            (self.img_config['blur_kernel'], self.img_config['blur_kernel']),
            0
        )

        # Canny 엣지 검출
        edges = cv2.Canny(
            blur,
            self.img_config['canny_low'],
            self.img_config['canny_high']
        )

        # 모폴로지 연산 (엣지 연결)
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
        edges = cv2.dilate(edges, kernel, iterations=1)

        return edges

    def find_plate_candidates(self, frame: np.ndarray, edges: np.ndarray) -> list:
        """
        번호판 후보 영역 찾기

        Args:
            frame: 원본 이미지
            edges: 엣지 검출 이미지

        Returns:
            번호판 후보 영역 리스트 [(x, y, w, h), ...]
        """
        candidates = []

        # 컨투어 찾기
        contours, _ = cv2.findContours(
            edges.copy(),
            cv2.RETR_TREE,
            cv2.CHAIN_APPROX_SIMPLE
        )

        # 컨투어 필터링
        for contour in contours:
            # 면적 필터
            area = cv2.contourArea(contour)
            if not (self.img_config['min_plate_area'] < area < self.img_config['max_plate_area']):
                continue

            # 사각형 근사
            peri = cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, 0.02 * peri, True)

            # 4각형 필터
            if len(approx) == 4:
                x, y, w, h = cv2.boundingRect(approx)

                # 가로세로 비율 필터 (한국 번호판: 약 2:1 ~ 5:1)
                aspect_ratio = w / h if h > 0 else 0
                if self.img_config['plate_aspect_ratio_min'] < aspect_ratio < self.img_config['plate_aspect_ratio_max']:
                    candidates.append((x, y, w, h))

        # 면적 기준 정렬 (큰 것 우선)
        candidates.sort(key=lambda c: c[2] * c[3], reverse=True)

        return candidates[:5]  # 상위 5개만 반환

    def extract_plate_image(self, frame: np.ndarray, rect: tuple) -> np.ndarray:
        """
        번호판 영역 추출 및 전처리

        Args:
            frame: 원본 이미지
            rect: 번호판 영역 (x, y, w, h)

        Returns:
            OCR용 전처리된 번호판 이미지
        """
        x, y, w, h = rect

        # 여유 마진 추가
        margin = 5
        x = max(0, x - margin)
        y = max(0, y - margin)
        w = min(frame.shape[1] - x, w + 2 * margin)
        h = min(frame.shape[0] - y, h + 2 * margin)

        # 번호판 영역 추출
        plate_img = frame[y:y+h, x:x+w]

        if plate_img.size == 0:
            return None

        # 크기 확대 (OCR 성능 향상)
        scale = 2
        plate_img = cv2.resize(
            plate_img, None,
            fx=scale, fy=scale,
            interpolation=cv2.INTER_CUBIC
        )

        # 그레이스케일 변환
        gray = cv2.cvtColor(plate_img, cv2.COLOR_BGR2GRAY)

        # 적응형 이진화
        binary = cv2.adaptiveThreshold(
            gray, 255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY_INV,
            11, 2
        )

        # 노이즈 제거
        binary = cv2.medianBlur(binary, 3)

        return binary

    def process_frame(self, frame: np.ndarray) -> dict:
        """
        단일 프레임 처리

        Args:
            frame: 입력 이미지

        Returns:
            인식 결과 딕셔너리
        """
        start_time = time.time()
        result = {
            'success': False,
            'plate_number': None,
            'confidence': 0,
            'candidates': [],
            'processing_time_ms': 0
        }

        try:
            # 1. 이미지 전처리
            edges = self.preprocess_image(frame)

            # 2. 번호판 후보 영역 찾기
            candidates = self.find_plate_candidates(frame, edges)
            result['candidates'] = candidates

            if not candidates:
                self.logger.debug("번호판 후보 영역 없음")
                return result

            # 3. 각 후보에 대해 OCR 수행
            for rect in candidates:
                plate_img = self.extract_plate_image(frame, rect)

                if plate_img is None:
                    continue

                # OCR 수행
                text, confidence = self.ocr_processor.recognize(plate_img)

                if text:
                    # 번호판 형식 검증
                    cleaned_text = text.replace(' ', '').replace('\n', '')

                    if validate_plate_format(cleaned_text):
                        result['success'] = True
                        result['plate_number'] = cleaned_text
                        result['confidence'] = confidence
                        result['plate_region'] = rect
                        self.logger.info(f"번호판 인식 성공: {cleaned_text} (신뢰도: {confidence:.1f}%)")
                        break

        except Exception as e:
            self.logger.error(f"프레임 처리 중 오류: {e}")

        result['processing_time_ms'] = int((time.time() - start_time) * 1000)
        return result

    def run_single(self) -> dict:
        """단일 캡처 모드"""
        self.logger.info("단일 캡처 모드 시작")

        frame = self.stream_capture.capture_single()
        if frame is None:
            self.logger.error("이미지 캡처 실패")
            return {'success': False, 'error': 'Capture failed'}

        result = self.process_frame(frame)

        # 결과 저장
        if self.config['storage']['save_images']:
            save_result(frame, result, self.config['storage']['image_dir'])

        return result

    def run_continuous(self, interval: float = 3.0):
        """
        연속 모니터링 모드

        Args:
            interval: 캡처 간격 (초)
        """
        self.logger.info(f"연속 모니터링 모드 시작 (간격: {interval}초)")

        try:
            while True:
                frame = self.stream_capture.capture_single()

                if frame is not None:
                    result = self.process_frame(frame)

                    if result['success']:
                        print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}]")
                        print(f"  번호판: {result['plate_number']}")
                        print(f"  신뢰도: {result['confidence']:.1f}%")
                        print(f"  처리시간: {result['processing_time_ms']}ms")

                        if self.config['storage']['save_images']:
                            save_result(frame, result, self.config['storage']['image_dir'])
                    else:
                        print(".", end="", flush=True)
                else:
                    self.logger.warning("이미지 캡처 실패, 재시도 중...")

                time.sleep(interval)

        except KeyboardInterrupt:
            self.logger.info("사용자에 의해 중지됨")

    def run_stream(self):
        """실시간 스트림 모드"""
        self.logger.info("스트림 모드 시작")

        stream_url = f"{self.config['camera']['url']}:81/stream"
        cap = cv2.VideoCapture(stream_url)
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        try:
            while True:
                ret, frame = cap.read()

                if not ret:
                    self.logger.warning("프레임 읽기 실패, 재연결 중...")
                    cap.release()
                    time.sleep(1)
                    cap = cv2.VideoCapture(stream_url)
                    continue

                result = self.process_frame(frame)

                if result['success']:
                    print(f"\n번호판 인식: {result['plate_number']} ({result['confidence']:.1f}%)")

        except KeyboardInterrupt:
            self.logger.info("사용자에 의해 중지됨")
        finally:
            cap.release()


def main():
    """메인 함수"""
    parser = argparse.ArgumentParser(description='License Plate Recognition System')
    parser.add_argument('--mode', choices=['single', 'continuous', 'stream'],
                        default='continuous', help='동작 모드')
    parser.add_argument('--config', type=str, default=CONFIG_PATH,
                        help='설정 파일 경로')
    parser.add_argument('--interval', type=float, default=3.0,
                        help='캡처 간격 (초)')
    parser.add_argument('--verbose', action='store_true',
                        help='상세 로그 출력')

    args = parser.parse_args()

    # 로깅 설정
    log_level = logging.DEBUG if args.verbose else logging.INFO
    setup_logging(log_level)

    # LPR 시스템 초기화
    lpr = LicensePlateRecognizer(config_path=args.config)

    # 모드별 실행
    if args.mode == 'single':
        result = lpr.run_single()
        print(f"\n결과: {result}")
    elif args.mode == 'continuous':
        lpr.run_continuous(interval=args.interval)
    elif args.mode == 'stream':
        lpr.run_stream()


if __name__ == '__main__':
    main()
