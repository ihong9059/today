"""
IP Webcam OCR - 스마트폰 IP Webcam에서 영상을 받아 OCR 인식
기술 스택: Python, OpenCV, EasyOCR (한글 지원), Tkinter GUI

사용법:
1. 스마트폰에 IP Webcam 앱 설치 및 실행
2. 앱에서 표시되는 IP 주소 확인 (예: http://192.168.0.100:8080)
3. 이 프로그램 실행 시 IP 주소 입력
"""

import cv2
import numpy as np
import easyocr
import time
import sys
import threading
import tkinter as tk
from tkinter import ttk, messagebox
from PIL import Image, ImageTk
from collections import Counter
import re

# 버전 정보
APP_VERSION = "1.0.0"
CAPTURE_COUNT = 3
CAPTURE_DELAY_MS = 100

# 한글 자모 오인식 보정 매핑 (번호판용)
KOREAN_CORRECTION_MAP = {
    '두': '누', '루': '누', '무': '누', '부': '누', '수': '누', '우': '누', '주': '누', '구': '누',
    'ㄷ': 'ㄴ', 'ㄹ': 'ㄴ', 'ㅁ': 'ㄴ', 'ㅂ': 'ㄴ', 'ㅅ': 'ㄴ', 'ㅇ': 'ㄴ', 'ㅈ': 'ㄴ', 'ㄱ': 'ㄴ',
}

# 번호판에 사용되는 한글 (지역/용도)
LICENSE_PLATE_CHARS = set([
    '가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하',
    '거', '너', '더', '러', '머', '버', '서', '어', '저', '처', '커', '터', '퍼', '허',
    '고', '노', '도', '로', '모', '보', '소', '오', '조', '초', '코', '토', '포', '호',
    '구', '누', '두', '루', '무', '부', '수', '우', '주', '추', '쿠', '투', '푸', '후',
    '배', '허', '하', '호', '국', '합', '육', '공', '해'
])

# 비슷한 한글 그룹
SIMILAR_HANGUL_GROUPS = [
    set(['누', '두', '루', '무', '부', '수', '우', '주', '구']),
    set(['너', '더', '러', '머', '버', '서', '어', '저', '거']),
    set(['나', '다', '라', '마', '바', '사', '아', '자', '가']),
    set(['노', '도', '로', '모', '보', '소', '오', '조', '고']),
    set(['허', '호', '하', '헌', '헐'])
]


class IPWebcamOCR:
    def __init__(self, root, ip_address: str):
        self.root = root
        self.root.title(f"IP Webcam OCR v{APP_VERSION}")
        self.root.geometry("900x700")
        self.root.resizable(True, True)

        self.ip_address = ip_address.replace("http://", "").replace("https://", "")
        self.video_url = f"http://{self.ip_address}/video"

        self.cap = None
        self.reader = None
        self.is_running = False
        self.is_processing = False
        self.is_frozen = False  # 화면 고정 상태
        self.current_frame = None
        self.frozen_frame = None  # 고정된 프레임
        self.captured_image = None
        self.recognized_text = ""
        self.raw_results = []
        self.confidence = 0.0
        self.vote_count = 0
        self.is_license_plate = False
        self.hangul_candidates = set()

        self.setup_ui()
        self.init_ocr_engine()

    def setup_ui(self):
        """UI 구성"""
        # 메인 프레임
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.pack(fill=tk.BOTH, expand=True)

        # 상단: 제목 + 버전
        header_frame = ttk.Frame(main_frame)
        header_frame.pack(fill=tk.X, pady=(0, 10))

        title_label = ttk.Label(header_frame, text="AI 문자 인식", font=("맑은 고딕", 18, "bold"))
        title_label.pack(side=tk.LEFT)

        version_label = ttk.Label(header_frame, text=f"v{APP_VERSION}", font=("맑은 고딕", 10), foreground="gray")
        version_label.pack(side=tk.RIGHT)

        # 연결 상태
        self.status_label = ttk.Label(header_frame, text=f"연결: {self.ip_address}", font=("맑은 고딕", 9), foreground="blue")
        self.status_label.pack(side=tk.RIGHT, padx=20)

        # 카메라 프리뷰 영역
        preview_frame = ttk.LabelFrame(main_frame, text="카메라 프리뷰", padding="5")
        preview_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 10))

        self.preview_label = ttk.Label(preview_frame, text="연결 중...", anchor="center")
        self.preview_label.pack(fill=tk.BOTH, expand=True)

        # 캡처 버튼
        self.capture_btn = ttk.Button(
            main_frame,
            text="캡처 및 인식",
            command=self.capture_and_recognize,
            style="Accent.TButton"
        )
        self.capture_btn.pack(fill=tk.X, pady=(0, 10), ipady=10)

        # 결과 영역
        result_frame = ttk.LabelFrame(main_frame, text="인식 결과", padding="10")
        result_frame.pack(fill=tk.BOTH, expand=True)

        # 결과 내부: 왼쪽(캡처 이미지) + 오른쪽(결과)
        result_inner = ttk.Frame(result_frame)
        result_inner.pack(fill=tk.BOTH, expand=True)

        # 왼쪽: 캡처 이미지 썸네일
        thumb_frame = ttk.Frame(result_inner, width=150)
        thumb_frame.pack(side=tk.LEFT, fill=tk.Y, padx=(0, 10))
        thumb_frame.pack_propagate(False)

        ttk.Label(thumb_frame, text="캡처 이미지", font=("맑은 고딕", 9)).pack()

        self.thumb_label = ttk.Label(thumb_frame, text="캡처\n대기", anchor="center",
                                      background="gray", foreground="white")
        self.thumb_label.pack(fill=tk.BOTH, expand=True, pady=5)

        # 오른쪽: 결과 텍스트
        text_frame = ttk.Frame(result_inner)
        text_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # 결과 헤더 (타입 + 신뢰도)
        result_header = ttk.Frame(text_frame)
        result_header.pack(fill=tk.X)

        self.result_type_label = ttk.Label(result_header, text="결과", font=("맑은 고딕", 11, "bold"))
        self.result_type_label.pack(side=tk.LEFT)

        self.confidence_label = ttk.Label(result_header, text="", font=("맑은 고딕", 10))
        self.confidence_label.pack(side=tk.RIGHT)

        self.vote_label = ttk.Label(result_header, text="", font=("맑은 고딕", 9), foreground="gray")
        self.vote_label.pack(side=tk.RIGHT, padx=10)

        # 인식 결과 텍스트
        self.result_text = tk.Text(text_frame, height=4, font=("맑은 고딕", 14), wrap=tk.WORD, state=tk.DISABLED)
        self.result_text.pack(fill=tk.BOTH, expand=True, pady=5)

        # 한글 후보 표시
        self.candidates_frame = ttk.Frame(text_frame)
        self.candidates_frame.pack(fill=tk.X)

        self.candidates_label = ttk.Label(self.candidates_frame, text="", font=("맑은 고딕", 9), foreground="gray")
        self.candidates_label.pack(side=tk.LEFT)

        # 원본 결과 (디버그)
        self.raw_label = ttk.Label(text_frame, text="", font=("맑은 고딕", 8), foreground="gray", wraplength=500)
        self.raw_label.pack(fill=tk.X)

        # 하단 버튼들
        btn_frame = ttk.Frame(result_frame)
        btn_frame.pack(fill=tk.X, pady=(10, 0))

        self.copy_btn = ttk.Button(btn_frame, text="복사", command=self.copy_result, state=tk.DISABLED)
        self.copy_btn.pack(side=tk.LEFT, expand=True, fill=tk.X, padx=2)

        self.clear_btn = ttk.Button(btn_frame, text="초기화", command=self.clear_result, state=tk.DISABLED)
        self.clear_btn.pack(side=tk.LEFT, expand=True, fill=tk.X, padx=2)

        # 스타일 설정
        style = ttk.Style()
        style.configure("Accent.TButton", font=("맑은 고딕", 12, "bold"))

    def init_ocr_engine(self):
        """OCR 엔진 초기화 (별도 스레드)"""
        def init():
            self.status_label.config(text="OCR 엔진 로딩 중...")
            self.reader = easyocr.Reader(['ko', 'en'], gpu=False)
            self.status_label.config(text=f"연결: {self.ip_address}")
            self.connect_camera()

        thread = threading.Thread(target=init, daemon=True)
        thread.start()

    def connect_camera(self):
        """카메라 연결"""
        self.cap = cv2.VideoCapture(self.video_url)
        if self.cap.isOpened():
            self.is_running = True
            self.update_preview()
        else:
            self.preview_label.config(text="연결 실패!\nIP Webcam 앱이 실행 중인지 확인하세요.")

    def update_preview(self):
        """프리뷰 업데이트"""
        if not self.is_running:
            return

        # 고정 상태면 frozen_frame 표시
        if self.is_frozen and self.frozen_frame is not None:
            frame = self.frozen_frame.copy()
        else:
            ret, frame = self.cap.read()
            if not ret:
                self.root.after(30, self.update_preview)
                return
            self.current_frame = frame.copy()
            frame = self.current_frame

        # BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # 프리뷰 크기 조정
        h, w = frame_rgb.shape[:2]
        preview_w = self.preview_label.winfo_width()
        preview_h = self.preview_label.winfo_height()

        if preview_w > 1 and preview_h > 1:
            scale = min(preview_w / w, preview_h / h)
            new_w, new_h = int(w * scale), int(h * scale)
            frame_rgb = cv2.resize(frame_rgb, (new_w, new_h))

        # 고정 상태 표시
        if self.is_frozen:
            cv2.putText(frame_rgb, "FROZEN", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        # Tkinter 이미지로 변환
        img = Image.fromarray(frame_rgb)
        imgtk = ImageTk.PhotoImage(image=img)

        self.preview_label.imgtk = imgtk
        self.preview_label.config(image=imgtk, text="")

        self.root.after(30, self.update_preview)

    def capture_and_recognize(self):
        """캡처 및 OCR 인식"""
        if self.is_processing or self.current_frame is None or self.reader is None:
            return

        # 화면 고정
        self.is_frozen = True
        self.frozen_frame = self.current_frame.copy()
        self.captured_image = self.frozen_frame.copy()

        self.is_processing = True
        self.capture_btn.config(state=tk.DISABLED, text="분석 중...")

        def process():
            # 고정된 프레임으로 OCR 수행
            rgb_frame = cv2.cvtColor(self.frozen_frame, cv2.COLOR_BGR2RGB)

            self.root.after(0, lambda: self.capture_btn.config(text="OCR 처리 중..."))

            ocr_results = self.reader.readtext(rgb_frame)

            # 텍스트 추출
            texts = []
            for (bbox, text, conf) in ocr_results:
                if conf > 0.3:
                    texts.append(text)

            result_text = " ".join(texts) if texts else ""
            self.raw_results = [result_text] if result_text else []

            if result_text:
                # 번호판 패턴 확인
                plate_pattern = re.compile(r'\d{2,3}[가-힣]\d{4}')
                number_pattern = re.compile(r'(\d{2,3})([가-힣])(\d{4})')

                cleaned = re.sub(r'[\s\-_|/\\]', '', result_text)
                match = plate_pattern.search(cleaned)

                if match:
                    self.is_license_plate = True
                    plate_match = number_pattern.search(match.group())
                    if plate_match:
                        self.recognized_text = f"{plate_match.group(1)} {plate_match.group(2)} {plate_match.group(3)}"
                        self.hangul_candidates = {plate_match.group(2)}
                    else:
                        self.recognized_text = match.group()
                        self.hangul_candidates = set()
                else:
                    self.is_license_plate = False
                    self.recognized_text = result_text
                    self.hangul_candidates = set()

                self.confidence = 1.0
                self.vote_count = 1
            else:
                self.recognized_text = "인식 실패"
                self.vote_count = 0
                self.confidence = 0.0
                self.is_license_plate = False
                self.hangul_candidates = set()

            # UI 업데이트
            self.root.after(0, self.update_result_ui)

        thread = threading.Thread(target=process, daemon=True)
        thread.start()

    def select_best_result(self, results):
        """다중 결과에서 최적 선택"""
        plate_pattern = re.compile(r'\d{2,3}[가-힣]\d{4}')
        number_pattern = re.compile(r'(\d{2,3})([가-힣])(\d{4})')

        # 번호판 패턴 추출
        plate_results = []
        for text in results:
            cleaned = re.sub(r'[\s\-_|/\\]', '', text)
            match = plate_pattern.search(cleaned)
            if match:
                plate_results.append(match.group())

        if not plate_results:
            # 번호판이 없으면 가장 긴 결과
            best = max(results, key=len) if results else ""
            return best, 1, set(), False

        # 숫자 기준 그룹화
        grouped = {}
        for plate in plate_results:
            match = number_pattern.search(plate)
            if match:
                key = f"{match.group(1)}_{match.group(3)}"
                if key not in grouped:
                    grouped[key] = []
                grouped[key].append(plate)

        # 가장 많은 그룹 선택
        best_group = max(grouped.values(), key=len) if grouped else plate_results

        # 한글 투표
        hangul_votes = {}
        hangul_candidates = set()
        for plate in best_group:
            match = number_pattern.search(plate)
            if match:
                hangul = match.group(2)
                hangul_candidates.add(hangul)
                hangul_votes[hangul] = hangul_votes.get(hangul, 0) + 1

        # 최다 투표 한글
        best_hangul = max(hangul_votes, key=hangul_votes.get) if hangul_votes else None
        vote_count = hangul_votes.get(best_hangul, 1) if best_hangul else 1

        # 최종 결과 조합
        sample = best_group[0]
        match = number_pattern.search(sample)
        if match and best_hangul:
            final_result = f"{match.group(1)} {best_hangul} {match.group(3)}"
        else:
            final_result = sample

        return final_result, vote_count, hangul_candidates, True

    def update_result_ui(self):
        """결과 UI 업데이트"""
        # 캡처 이미지 썸네일
        if self.captured_image is not None:
            img_rgb = cv2.cvtColor(self.captured_image, cv2.COLOR_BGR2RGB)
            img_rgb = cv2.resize(img_rgb, (140, 105))
            img = Image.fromarray(img_rgb)
            imgtk = ImageTk.PhotoImage(image=img)
            self.thumb_label.imgtk = imgtk
            self.thumb_label.config(image=imgtk, text="")

        # 결과 타입
        self.result_type_label.config(text="번호판" if self.is_license_plate else "결과")

        # 투표 결과
        if self.recognized_text and self.recognized_text != "인식 실패":
            self.vote_label.config(text=f"{self.vote_count}/{CAPTURE_COUNT}")

            # 신뢰도 색상
            conf_pct = int(self.confidence * 100)
            if self.confidence >= 0.8:
                color = "green"
            elif self.confidence >= 0.5:
                color = "orange"
            else:
                color = "red"
            self.confidence_label.config(text=f"{conf_pct}%", foreground=color)
        else:
            self.vote_label.config(text="")
            self.confidence_label.config(text="")

        # 결과 텍스트
        self.result_text.config(state=tk.NORMAL)
        self.result_text.delete("1.0", tk.END)
        self.result_text.insert("1.0", self.recognized_text if self.recognized_text else "캡처 버튼을 누르세요")
        self.result_text.config(state=tk.DISABLED)

        # 한글 후보
        if self.is_license_plate and len(self.hangul_candidates) > 1:
            self.candidates_label.config(text=f"인식된 후보: {' '.join(self.hangul_candidates)}")
        else:
            self.candidates_label.config(text="")

        # 원본 결과
        if self.raw_results:
            raw_text = f"원본 ({len(self.raw_results)}회): {[r[:30] for r in self.raw_results]}"
            self.raw_label.config(text=raw_text)
        else:
            self.raw_label.config(text="")

        # 버튼 활성화
        has_result = self.recognized_text and self.recognized_text != "인식 실패"
        self.copy_btn.config(state=tk.NORMAL if has_result else tk.DISABLED)
        self.clear_btn.config(state=tk.NORMAL if has_result or self.captured_image is not None else tk.DISABLED)

        # 캡처 버튼 비활성화 (초기화 버튼으로 해제)
        self.is_processing = False
        self.capture_btn.config(state=tk.DISABLED, text="캡처됨 (초기화로 해제)")

    def copy_result(self):
        """결과 복사"""
        if self.recognized_text:
            text = self.recognized_text.replace(" ", "") if self.is_license_plate else self.recognized_text
            self.root.clipboard_clear()
            self.root.clipboard_append(text)
            messagebox.showinfo("복사", "클립보드에 복사되었습니다.")

    def clear_result(self):
        """결과 초기화 및 화면 고정 해제"""
        # 화면 고정 해제 - 순서 중요!
        self.frozen_frame = None
        self.is_frozen = False

        self.recognized_text = ""
        self.raw_results = []
        self.captured_image = None
        self.confidence = 0.0
        self.vote_count = 0
        self.is_license_plate = False
        self.hangul_candidates = set()

        self.thumb_label.config(image="", text="캡처\n대기")
        self.result_type_label.config(text="결과")
        self.vote_label.config(text="")
        self.confidence_label.config(text="")
        self.result_text.config(state=tk.NORMAL)
        self.result_text.delete("1.0", tk.END)
        self.result_text.insert("1.0", "캡처 버튼을 누르세요")
        self.result_text.config(state=tk.DISABLED)
        self.candidates_label.config(text="")
        self.raw_label.config(text="")
        self.copy_btn.config(state=tk.DISABLED)
        self.clear_btn.config(state=tk.DISABLED)

        # 캡처 버튼 활성화
        self.capture_btn.config(state=tk.NORMAL, text="캡처 및 인식")

        print(f"[DEBUG] clear_result: is_frozen={self.is_frozen}, frozen_frame={self.frozen_frame}")

    def on_closing(self):
        """종료 처리"""
        self.is_running = False
        if self.cap:
            self.cap.release()
        self.root.destroy()


def main():
    print("=" * 50)
    print("   IP Webcam OCR - 스마트폰 카메라 문자 인식")
    print("=" * 50)
    print()

    # IP 주소 입력
    if len(sys.argv) > 1:
        ip_address = sys.argv[1]
    else:
        print("스마트폰 IP Webcam 앱의 IP 주소를 입력하세요.")
        print("예: 192.168.0.100:8080")
        ip_address = input("IP 주소: ").strip()

    if not ip_address:
        print("IP 주소가 입력되지 않았습니다.")
        return

    # Tkinter 앱 실행
    root = tk.Tk()
    app = IPWebcamOCR(root, ip_address)
    root.protocol("WM_DELETE_WINDOW", app.on_closing)
    root.mainloop()


if __name__ == "__main__":
    main()
