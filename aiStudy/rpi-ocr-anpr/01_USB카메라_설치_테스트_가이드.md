# USB 카메라 설치 및 테스트 가이드

**대상:** 라즈베리파이 3 B+ + USB 웹캠
**작성일:** 2026-01-06

---

## 목차
1. [USB 카메라 개요](#1-usb-카메라-개요)
2. [하드웨어 설치](#2-하드웨어-설치)
3. [소프트웨어 설치](#3-소프트웨어-설치)
4. [카메라 테스트](#4-카메라-테스트)
5. [문제 해결](#5-문제-해결)

---

## 1. USB 카메라 개요

### 1.1 권장 USB 카메라

| 모델 | 해상도 | 가격 | 호환성 | 특징 |
|------|--------|------|--------|------|
| Logitech C270 | 720p | ~25,000원 | 우수 | 가성비, 플러그앤플레이 |
| Logitech C920 | 1080p | ~80,000원 | 우수 | 고화질, 자동초점 |
| Logitech C310 | 720p | ~35,000원 | 우수 | 균형잡힌 성능 |
| 일반 UVC 웹캠 | 다양 | ~15,000원 | 보통 | 저렴, 호환성 확인 필요 |

### 1.2 USB 카메라 장단점

**장점:**
- 플러그앤플레이 (별도 설정 불필요)
- 다양한 제품 선택 가능
- 교체 용이
- 케이블 길이 자유로움

**단점:**
- USB 2.0 대역폭 한계 (고해상도 제한)
- 전력 소모 큼
- CSI 대비 지연시간 높음
- 라즈베리파이 전용 최적화 없음

### 1.3 기술 사양 (UVC)

USB Video Class(UVC)는 USB 카메라의 표준 프로토콜입니다.
- 리눅스에서 기본 지원 (v4l2 드라이버)
- 드라이버 설치 불필요
- /dev/video* 장치로 인식

---

## 2. 하드웨어 설치

### 2.1 연결 방법

```
┌─────────────────────────────────────────┐
│        Raspberry Pi 3 B+                │
│                                         │
│   USB 2.0 포트 (4개)                    │
│   ┌─────┐ ┌─────┐                      │
│   │ USB │ │ USB │  ← USB 카메라 연결    │
│   └─────┘ └─────┘                      │
│   ┌─────┐ ┌─────┐                      │
│   │ USB │ │ USB │                      │
│   └─────┘ └─────┘                      │
│                                         │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│   USB 웹캠      │
│   (Logitech 등) │
└─────────────────┘
```

### 2.2 설치 순서

```bash
# 1. 라즈베리파이 전원 OFF (권장, 핫플러그도 가능)

# 2. USB 카메라를 USB 포트에 연결
#    - 가능하면 USB 2.0 포트 직접 연결 (허브 사용 지양)
#    - 전력 부족 시 전원 공급 USB 허브 사용

# 3. 전원 ON 후 부팅 완료 대기

# 4. SSH 또는 터미널 접속
ssh pi@raspberrypi.local
# 기본 비밀번호: raspberry
```

### 2.3 연결 확인

```bash
# USB 장치 목록 확인
lsusb

# 출력 예시:
# Bus 001 Device 004: ID 046d:0825 Logitech, Inc. Webcam C270
# Bus 001 Device 003: ID 0424:ec00 Standard Microsystems Corp. SMSC9512/9514
# Bus 001 Device 002: ID 0424:9514 Standard Microsystems Corp. SMC9514 Hub
# Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

# 비디오 장치 확인
ls -la /dev/video*

# 출력 예시:
# crw-rw----+ 1 root video 81, 0  1월  6 10:00 /dev/video0
# crw-rw----+ 1 root video 81, 1  1월  6 10:00 /dev/video1
```

---

## 3. 소프트웨어 설치

### 3.1 시스템 업데이트

```bash
# 패키지 목록 업데이트
sudo apt update

# 시스템 업그레이드
sudo apt upgrade -y

# 재부팅 (커널 업데이트 시)
sudo reboot
```

### 3.2 필수 패키지 설치

```bash
# V4L2 유틸리티 (카메라 제어)
sudo apt install -y v4l-utils

# Python OpenCV (컴퓨터 비전)
sudo apt install -y python3-opencv

# 추가 의존성
sudo apt install -y \
    libopencv-dev \
    python3-pip \
    python3-numpy \
    ffmpeg
```

### 3.3 Python 환경 설정

```bash
# 프로젝트 디렉토리 생성
mkdir -p ~/ocr-anpr
cd ~/ocr-anpr

# 가상환경 생성 (선택사항이지만 권장)
python3 -m venv venv
source venv/bin/activate

# pip 업그레이드
pip install --upgrade pip

# 필수 Python 패키지 설치
pip install opencv-python-headless numpy pillow
```

### 3.4 OCR 엔진 설치

```bash
# Tesseract OCR 설치
sudo apt install -y tesseract-ocr

# 한국어 언어팩 설치
sudo apt install -y tesseract-ocr-kor

# 영어 언어팩 (기본 포함, 확인용)
sudo apt install -y tesseract-ocr-eng

# Python 바인딩
pip install pytesseract

# 설치 확인
tesseract --version
tesseract --list-langs
```

---

## 4. 카메라 테스트

### 4.1 V4L2 기본 테스트

```bash
# 카메라 정보 확인
v4l2-ctl --device=/dev/video0 --all

# 지원 포맷 확인
v4l2-ctl --device=/dev/video0 --list-formats-ext

# 출력 예시:
# ioctl: VIDIOC_ENUM_FMT
#   Type: Video Capture
#   [0]: 'YUYV' (YUYV 4:2:2)
#       Size: Discrete 640x480
#           Interval: Discrete 0.033s (30.000 fps)
#       Size: Discrete 1280x720
#           Interval: Discrete 0.100s (10.000 fps)
```

### 4.2 정지 이미지 캡처 테스트

```bash
# fswebcam으로 이미지 캡처
sudo apt install -y fswebcam
fswebcam -r 640x480 --no-banner test_capture.jpg

# 파일 확인
ls -la test_capture.jpg
file test_capture.jpg
```

### 4.3 Python OpenCV 테스트

```python
#!/usr/bin/env python3
# 파일명: test_usb_camera.py
"""USB 카메라 기본 테스트"""

import cv2
import sys

def test_camera_connection():
    """카메라 연결 테스트"""
    print("=" * 50)
    print("USB 카메라 연결 테스트")
    print("=" * 50)

    # 카메라 열기 (인덱스 0 = 첫 번째 카메라)
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("[실패] 카메라를 열 수 없습니다.")
        print("확인사항:")
        print("  1. USB 카메라가 연결되어 있는지 확인")
        print("  2. ls /dev/video* 명령으로 장치 확인")
        print("  3. 다른 프로그램이 카메라를 사용 중인지 확인")
        return False

    print("[성공] 카메라 연결됨")

    # 카메라 속성 출력
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
    fps = cap.get(cv2.CAP_PROP_FPS)

    print(f"  해상도: {int(width)}x{int(height)}")
    print(f"  FPS: {fps}")

    cap.release()
    return True

def test_frame_capture():
    """프레임 캡처 테스트"""
    print("\n" + "=" * 50)
    print("프레임 캡처 테스트")
    print("=" * 50)

    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("[실패] 카메라를 열 수 없습니다.")
        return False

    # 해상도 설정
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    # 프레임 읽기
    ret, frame = cap.read()

    if not ret:
        print("[실패] 프레임을 읽을 수 없습니다.")
        cap.release()
        return False

    print("[성공] 프레임 캡처됨")
    print(f"  프레임 크기: {frame.shape}")
    print(f"  데이터 타입: {frame.dtype}")

    # 이미지 저장
    cv2.imwrite('usb_camera_test.jpg', frame)
    print("  저장됨: usb_camera_test.jpg")

    cap.release()
    return True

def test_continuous_capture(duration=5):
    """연속 캡처 테스트 (FPS 측정)"""
    print("\n" + "=" * 50)
    print(f"연속 캡처 테스트 ({duration}초)")
    print("=" * 50)

    import time

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    if not cap.isOpened():
        print("[실패] 카메라를 열 수 없습니다.")
        return False

    frame_count = 0
    start_time = time.time()

    while time.time() - start_time < duration:
        ret, frame = cap.read()
        if ret:
            frame_count += 1

    elapsed = time.time() - start_time
    actual_fps = frame_count / elapsed

    print(f"[결과]")
    print(f"  총 프레임: {frame_count}")
    print(f"  경과 시간: {elapsed:.2f}초")
    print(f"  실제 FPS: {actual_fps:.1f}")

    cap.release()
    return True

def test_display(timeout=10):
    """화면 표시 테스트 (GUI 환경 필요)"""
    print("\n" + "=" * 50)
    print(f"화면 표시 테스트 ({timeout}초 또는 'q' 키로 종료)")
    print("=" * 50)

    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    if not cap.isOpened():
        print("[실패] 카메라를 열 수 없습니다.")
        return False

    import time
    start_time = time.time()

    print("카메라 영상 표시 중... ('q' 키로 종료)")

    try:
        while time.time() - start_time < timeout:
            ret, frame = cap.read()
            if not ret:
                break

            # FPS 표시
            fps_text = f"USB Camera - Press 'q' to quit"
            cv2.putText(frame, fps_text, (10, 30),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

            cv2.imshow('USB Camera Test', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        print("[성공] 화면 표시 테스트 완료")

    except Exception as e:
        print(f"[오류] 화면 표시 실패: {e}")
        print("  GUI 환경(X11)이 필요합니다.")
        print("  SSH 사용 시: ssh -X pi@raspberrypi.local")
        return False

    finally:
        cap.release()
        cv2.destroyAllWindows()

    return True

if __name__ == "__main__":
    print("\n*** USB 카메라 테스트 시작 ***\n")

    # 1. 연결 테스트
    if not test_camera_connection():
        sys.exit(1)

    # 2. 프레임 캡처 테스트
    if not test_frame_capture():
        sys.exit(1)

    # 3. 연속 캡처 테스트
    if not test_continuous_capture(5):
        sys.exit(1)

    # 4. 화면 표시 테스트 (GUI 환경에서만)
    # test_display(10)

    print("\n*** 모든 테스트 완료 ***")
```

### 4.4 테스트 실행

```bash
# 스크립트 실행
cd ~/ocr-anpr
python3 test_usb_camera.py

# GUI 환경에서 영상 확인 (X11 포워딩)
ssh -X pi@raspberrypi.local
python3 test_usb_camera.py
```

---

## 5. 문제 해결

### 5.1 카메라가 인식되지 않을 때

```bash
# 1. USB 장치 확인
lsusb
dmesg | tail -20

# 2. 비디오 장치 확인
ls /dev/video*

# 3. 권한 확인 및 수정
sudo usermod -aG video $USER
# 로그아웃 후 재로그인

# 4. 다른 USB 포트 시도

# 5. 전원 공급 문제 (별도 전원 허브 사용)
```

### 5.2 프레임 읽기 실패

```bash
# 1. 다른 프로그램이 사용 중인지 확인
fuser /dev/video0

# 2. 프로세스 종료
sudo fuser -k /dev/video0

# 3. 카메라 재연결
```

### 5.3 FPS가 낮을 때

```bash
# 1. 해상도 낮추기
# Python에서: cap.set(cv2.CAP_PROP_FRAME_WIDTH, 320)

# 2. USB 대역폭 확인 (다른 USB 장치 분리)

# 3. MJPEG 포맷 사용 (지원 시)
# cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc('M','J','P','G'))
```
