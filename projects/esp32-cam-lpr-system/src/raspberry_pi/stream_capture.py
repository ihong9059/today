#!/usr/bin/env python3
"""
ESP32-CAM 스트림 캡처 모듈
"""

import logging
import time
from typing import Optional

import cv2
import numpy as np
import requests


class StreamCapture:
    """ESP32-CAM 스트림 캡처 클래스"""

    def __init__(self, camera_url: str, timeout: int = 5):
        """
        Args:
            camera_url: ESP32-CAM IP 주소 (예: http://192.168.1.100)
            timeout: 요청 타임아웃 (초)
        """
        self.camera_url = camera_url.rstrip('/')
        self.timeout = timeout
        self.logger = logging.getLogger(__name__)

        # 엔드포인트
        self.capture_endpoint = f"{self.camera_url}/capture"
        self.stream_endpoint = f"{self.camera_url}:81/stream"
        self.status_endpoint = f"{self.camera_url}/status"

    def check_connection(self) -> bool:
        """
        카메라 연결 상태 확인

        Returns:
            연결 성공 여부
        """
        try:
            response = requests.get(self.status_endpoint, timeout=self.timeout)
            return response.status_code == 200
        except Exception as e:
            self.logger.error(f"카메라 연결 확인 실패: {e}")
            return False

    def capture_single(self, retries: int = 3) -> Optional[np.ndarray]:
        """
        단일 이미지 캡처

        Args:
            retries: 재시도 횟수

        Returns:
            캡처된 이미지 (numpy 배열) 또는 None
        """
        for attempt in range(retries):
            try:
                response = requests.get(
                    self.capture_endpoint,
                    timeout=self.timeout
                )

                if response.status_code == 200:
                    # JPEG 바이트를 numpy 배열로 변환
                    img_array = np.frombuffer(response.content, dtype=np.uint8)
                    frame = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

                    if frame is not None:
                        self.logger.debug(f"이미지 캡처 성공: {frame.shape}")
                        return frame
                    else:
                        self.logger.warning("이미지 디코딩 실패")
                else:
                    self.logger.warning(f"HTTP 오류: {response.status_code}")

            except requests.exceptions.Timeout:
                self.logger.warning(f"타임아웃 (시도 {attempt + 1}/{retries})")
            except requests.exceptions.ConnectionError:
                self.logger.warning(f"연결 실패 (시도 {attempt + 1}/{retries})")
            except Exception as e:
                self.logger.error(f"캡처 중 오류: {e}")

            if attempt < retries - 1:
                time.sleep(1)

        return None

    def capture_stream(self):
        """
        스트림 캡처 제너레이터

        Yields:
            각 프레임 이미지 (numpy 배열)
        """
        cap = cv2.VideoCapture(self.stream_endpoint)
        cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        if not cap.isOpened():
            self.logger.error("스트림 연결 실패")
            return

        try:
            while True:
                ret, frame = cap.read()

                if ret:
                    yield frame
                else:
                    self.logger.warning("프레임 읽기 실패")
                    # 재연결 시도
                    cap.release()
                    time.sleep(1)
                    cap = cv2.VideoCapture(self.stream_endpoint)
                    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

        finally:
            cap.release()

    def set_resolution(self, framesize: int) -> bool:
        """
        카메라 해상도 설정

        Args:
            framesize: 해상도 코드
                - 10: UXGA (1600x1200)
                - 9: SXGA (1280x1024)
                - 8: XGA (1024x768)
                - 7: SVGA (800x600)
                - 6: VGA (640x480)
                - 5: CIF (400x296)
                - 4: QVGA (320x240)

        Returns:
            설정 성공 여부
        """
        try:
            url = f"{self.camera_url}/control?var=framesize&val={framesize}"
            response = requests.get(url, timeout=self.timeout)
            return response.status_code == 200
        except Exception as e:
            self.logger.error(f"해상도 설정 실패: {e}")
            return False

    def set_quality(self, quality: int) -> bool:
        """
        JPEG 품질 설정

        Args:
            quality: 품질 값 (4-63, 낮을수록 좋음)

        Returns:
            설정 성공 여부
        """
        quality = max(4, min(63, quality))
        try:
            url = f"{self.camera_url}/control?var=quality&val={quality}"
            response = requests.get(url, timeout=self.timeout)
            return response.status_code == 200
        except Exception as e:
            self.logger.error(f"품질 설정 실패: {e}")
            return False

    def toggle_flash(self, on: bool) -> bool:
        """
        플래시 LED 토글

        Args:
            on: True면 켜기, False면 끄기

        Returns:
            설정 성공 여부
        """
        try:
            val = 255 if on else 0
            url = f"{self.camera_url}/control?var=led_intensity&val={val}"
            response = requests.get(url, timeout=self.timeout)
            return response.status_code == 200
        except Exception as e:
            self.logger.error(f"플래시 설정 실패: {e}")
            return False


# 테스트 코드
if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)

    # 테스트
    capture = StreamCapture("http://192.168.1.100")

    print("카메라 연결 확인...")
    if capture.check_connection():
        print("연결 성공!")

        print("이미지 캡처 중...")
        frame = capture.capture_single()

        if frame is not None:
            print(f"캡처 성공: {frame.shape}")
            cv2.imwrite("test_capture.jpg", frame)
            print("test_capture.jpg 저장됨")
        else:
            print("캡처 실패")
    else:
        print("연결 실패")
