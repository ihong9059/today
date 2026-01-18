#!/usr/bin/env python3
"""
OCR 처리 모듈
Tesseract OCR을 사용한 번호판 문자 인식
"""

import logging
import re
from typing import Tuple, Optional

import cv2
import numpy as np
import pytesseract
from PIL import Image


class OCRProcessor:
    """Tesseract OCR 처리 클래스"""

    # 한국 번호판에 사용되는 한글 문자
    KOREAN_PLATE_CHARS = (
        "가나다라마바사아자차카타파하"
        "거너더러머버서어저처커터퍼허"
        "고노도로모보소오조초코토포호"
        "구누두루무부수우주추쿠투푸후"
        "그느드르므브스으즈츠크트프흐"
        "기니디리미비시이지치키티피히"
        "배"  # 영업용
    )

    # 번호판 패턴 (정규표현식)
    PLATE_PATTERNS = [
        # 신형 번호판 (2019년 이후): 숫자2-3자리 + 한글 + 숫자4자리
        r'^[0-9]{2,3}[가-힣][0-9]{4}$',
        # 구형 번호판: 지역명2자리 + 숫자2자리 + 한글 + 숫자4자리
        r'^[가-힣]{2}[0-9]{2}[가-힣][0-9]{4}$',
        # 간단 패턴: 숫자 + 한글 + 숫자
        r'^[0-9]+[가-힣]+[0-9]+$',
    ]

    def __init__(self, language: str = 'kor+eng', psm: int = 7, oem: int = 3):
        """
        Args:
            language: Tesseract 언어 설정
            psm: Page Segmentation Mode (7 = single line)
            oem: OCR Engine Mode (3 = default)
        """
        self.language = language
        self.psm = psm
        self.oem = oem
        self.logger = logging.getLogger(__name__)

        # 허용 문자 목록
        self.whitelist = f"0123456789{self.KOREAN_PLATE_CHARS}"

        # Tesseract 설정
        self.config = self._build_config()

        self.logger.info(f"OCRProcessor 초기화: lang={language}, psm={psm}")

    def _build_config(self) -> str:
        """Tesseract 설정 문자열 생성"""
        config_parts = [
            f'--oem {self.oem}',
            f'--psm {self.psm}',
            f'-c tessedit_char_whitelist={self.whitelist}',
        ]
        return ' '.join(config_parts)

    def preprocess_for_ocr(self, image: np.ndarray) -> np.ndarray:
        """
        OCR을 위한 이미지 전처리

        Args:
            image: 입력 이미지 (BGR 또는 그레이스케일)

        Returns:
            전처리된 이진화 이미지
        """
        # 그레이스케일 변환 (필요시)
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image.copy()

        # 크기 확대 (작은 이미지 처리 개선)
        if gray.shape[1] < 200:
            scale = 200 / gray.shape[1]
            gray = cv2.resize(gray, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)

        # 대비 향상
        gray = cv2.normalize(gray, None, 0, 255, cv2.NORM_MINMAX)

        # 노이즈 제거
        gray = cv2.bilateralFilter(gray, 11, 17, 17)

        # 적응형 이진화
        binary = cv2.adaptiveThreshold(
            gray, 255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            11, 2
        )

        # 모폴로지 연산 (노이즈 제거 및 문자 연결)
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
        binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)

        return binary

    def recognize(self, image: np.ndarray) -> Tuple[Optional[str], float]:
        """
        이미지에서 텍스트 인식

        Args:
            image: 번호판 이미지

        Returns:
            (인식된 텍스트, 신뢰도 %) 또는 (None, 0)
        """
        try:
            # 전처리
            processed = self.preprocess_for_ocr(image)

            # PIL 이미지로 변환
            pil_image = Image.fromarray(processed)

            # OCR 수행 (상세 데이터 포함)
            data = pytesseract.image_to_data(
                pil_image,
                lang=self.language,
                config=self.config,
                output_type=pytesseract.Output.DICT
            )

            # 결과 파싱
            texts = []
            confidences = []

            for i, text in enumerate(data['text']):
                conf = int(data['conf'][i])
                if conf > 0 and text.strip():
                    texts.append(text.strip())
                    confidences.append(conf)

            if not texts:
                return None, 0

            # 텍스트 결합
            full_text = ''.join(texts)
            avg_confidence = sum(confidences) / len(confidences) if confidences else 0

            # 정리
            cleaned_text = self._clean_text(full_text)

            self.logger.debug(f"OCR 결과: '{cleaned_text}' (신뢰도: {avg_confidence:.1f}%)")

            return cleaned_text, avg_confidence

        except Exception as e:
            self.logger.error(f"OCR 처리 중 오류: {e}")
            return None, 0

    def _clean_text(self, text: str) -> str:
        """
        인식된 텍스트 정리

        Args:
            text: 원본 텍스트

        Returns:
            정리된 텍스트
        """
        # 공백 및 특수문자 제거
        text = text.replace(' ', '').replace('\n', '').replace('\r', '')

        # 허용된 문자만 유지
        allowed = set(self.whitelist)
        cleaned = ''.join(c for c in text if c in allowed)

        # 일반적인 오인식 수정
        replacements = {
            'O': '0',  # O → 0
            'I': '1',  # I → 1
            'l': '1',  # l → 1
            'S': '5',  # S → 5
            'Z': '2',  # Z → 2
            'B': '8',  # B → 8
        }

        for old, new in replacements.items():
            cleaned = cleaned.replace(old, new)

        return cleaned

    def validate_plate(self, text: str) -> bool:
        """
        번호판 형식 검증

        Args:
            text: 인식된 텍스트

        Returns:
            유효한 번호판 형식이면 True
        """
        for pattern in self.PLATE_PATTERNS:
            if re.match(pattern, text):
                return True
        return False

    def recognize_with_multiple_preprocessing(self, image: np.ndarray) -> Tuple[Optional[str], float]:
        """
        여러 전처리 방법을 시도하여 최적의 결과 반환

        Args:
            image: 번호판 이미지

        Returns:
            (최적의 인식 결과, 신뢰도)
        """
        results = []

        # 원본 이미지로 시도
        text, conf = self.recognize(image)
        if text:
            results.append((text, conf))

        # 반전 이미지로 시도
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image
        inverted = cv2.bitwise_not(gray)
        text, conf = self.recognize(inverted)
        if text:
            results.append((text, conf))

        # OTSU 이진화로 시도
        _, otsu = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        text, conf = self.recognize(otsu)
        if text:
            results.append((text, conf))

        if not results:
            return None, 0

        # 유효한 번호판 형식 우선
        for text, conf in sorted(results, key=lambda x: x[1], reverse=True):
            if self.validate_plate(text):
                return text, conf

        # 없으면 가장 높은 신뢰도 반환
        return max(results, key=lambda x: x[1])


# 테스트 코드
if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)

    # OCR 프로세서 생성
    ocr = OCRProcessor()

    # 테스트 이미지가 있다면
    import os
    if os.path.exists('test_plate.jpg'):
        image = cv2.imread('test_plate.jpg')
        text, confidence = ocr.recognize(image)
        print(f"인식 결과: {text}")
        print(f"신뢰도: {confidence:.1f}%")
        print(f"유효성: {ocr.validate_plate(text) if text else 'N/A'}")
    else:
        print("테스트 이미지 없음. test_plate.jpg 파일을 준비해주세요.")
