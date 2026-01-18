# Raspberry Pi Camera V2 설치 및 테스트 가이드

**대상:** 라즈베리파이 3 B+ + Camera Module V2
**작성일:** 2026-01-06

---

## 목차
1. [Camera V2 개요](#1-camera-v2-개요)
2. [하드웨어 설치](#2-하드웨어-설치)
3. [소프트웨어 설치](#3-소프트웨어-설치)
4. [카메라 테스트](#4-카메라-테스트)
5. [문제 해결](#5-문제-해결)

---

## 1. Camera V2 개요

### 1.1 Camera Module V2 사양

| 항목 | 사양 |
|------|------|
| 센서 | Sony IMX219 |
| 해상도 | 8 메가픽셀 (3280 × 2464) |
| 비디오 | 1080p30, 720p60, 640×480p90 |
| 센서 크기 | 1/4 인치 |
| 인터페이스 | CSI (Camera Serial Interface) |
| 리본 케이블 | 15핀 FFC |
| 크기 | 25mm × 23mm × 9mm |

### 1.2 Camera V2 vs NoIR Camera V2

| 항목 | Camera V2 | NoIR Camera V2 |
|------|-----------|----------------|
| IR 필터 | 있음 | 없음 |
| 주간 촬영 | 최적 | 색상 왜곡 |
| 야간 촬영 | 불가 | 가능 (IR 조명 필요) |
| 용도 | 일반 촬영 | 야간/보안 |

### 1.3 USB 카메라 대비 장점

| 항목 | Camera V2 | USB 카메라 |
|------|-----------|-----------|
| 지연시간 | 낮음 (~50ms) | 높음 (~150ms) |
| CPU 부하 | 낮음 (GPU 처리) | 높음 |
| 전력 소모 | 낮음 (~250mW) | 높음 (~500mW) |
| 최대 해상도 | 8MP | 제품별 상이 |
| 고속 촬영 | 720p60, VGA90 | 대부분 30fps |

---

## 2. 하드웨어 설치

### 2.1 CSI 포트 위치

```
┌─────────────────────────────────────────────────────────────┐
│                    Raspberry Pi 3 B+ (상단)                  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │   GPIO 40핀 헤더                                     │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│        HDMI         Audio    ┌────────┐                     │
│        [   ]         [  ]    │  CSI   │  ← 카메라 포트      │
│                              │  Port  │    (CAMERA)         │
│                              └────────┘                     │
│                                                              │
│        Ethernet              USB 포트들                      │
│        [     ]               [  ] [  ]                      │
│                              [  ] [  ]                      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 리본 케이블 연결 방법

```
⚠️ 중요: 반드시 전원을 끈 상태에서 연결하세요!

[연결 순서]

1. 라즈베리파이 전원 OFF
   └─→ 전원 케이블 분리

2. CSI 포트 클립 열기
   └─→ 검은색 플라스틱 클립을 위로 부드럽게 당김
   └─→ 약 2mm 정도 들어올림

3. 리본 케이블 삽입
   ┌─────────────────────────────────────┐
   │                                     │
   │   ← 파란색 면 (접점 반대쪽)         │
   │      HDMI 포트 방향을 향함          │
   │                                     │
   │   ← 은색 접점 면                    │
   │      Ethernet 포트 방향을 향함      │
   │                                     │
   └─────────────────────────────────────┘

4. 케이블을 끝까지 밀어넣기
   └─→ 약 2~3mm 깊이로 삽입

5. 클립 닫기
   └─→ 검은색 클립을 아래로 눌러 고정
   └─→ 케이블이 빠지지 않는지 확인

6. 카메라 모듈 방향 확인
   ┌─────────────────┐
   │  ○ 렌즈        │
   │                 │  ← 케이블이 뒤쪽으로 나옴
   │  Camera V2     │
   └────────┬────────┘
            │
            │ 리본 케이블
            │
            ▼
        라즈베리파이 CSI 포트

7. 전원 연결 및 부팅
```

### 2.3 설치 확인 사진 가이드

```
[올바른 연결]
                    ┌─────────┐
                    │ ○ 렌즈  │
                    │         │
                    └────┬────┘
                         │ 리본
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    │               ┌────┴────┐               │
    │               │   CSI   │               │
    │               │ ═══════ │ ← 파란면이 위 │
    │               └─────────┘               │
    │                                         │
    │            Raspberry Pi 3 B+            │
    └─────────────────────────────────────────┘

[잘못된 연결 - 케이블 방향 반대]
⚠️ 접점이 잘못된 방향이면 카메라가 인식되지 않음
```

---

## 3. 소프트웨어 설치

### 3.1 카메라 인터페이스 활성화

```bash
# 방법 1: raspi-config 사용
sudo raspi-config

# 메뉴 이동:
# Interface Options → Legacy Camera → Enable
# (또는 Interface Options → Camera → Enable)

# 재부팅
sudo reboot
```

```bash
# 방법 2: config.txt 직접 수정
sudo nano /boot/config.txt

# 다음 줄 추가 또는 수정:
start_x=1
gpu_mem=128

# 저장 후 재부팅
sudo reboot
```

### 3.2 시스템 패키지 설치

```bash
# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# libcamera 스택 설치 (새로운 카메라 API)
sudo apt install -y libcamera-apps

# 레거시 카메라 도구 (raspistill, raspivid)
sudo apt install -y libraspberrypi-bin

# Python 라이브러리
sudo apt install -y python3-picamera2 python3-libcamera

# OpenCV
sudo apt install -y python3-opencv
```

### 3.3 Python 환경 설정

```bash
# 프로젝트 디렉토리
mkdir -p ~/ocr-anpr
cd ~/ocr-anpr

# 가상환경 (선택)
python3 -m venv venv --system-site-packages
source venv/bin/activate

# 추가 패키지
pip install numpy pillow pytesseract
```

### 3.4 카메라 감지 확인

```bash
# 카메라 감지 상태 확인
vcgencmd get_camera

# 정상 출력:
# supported=1 detected=1
# (또는 libcamera 사용 시)
# supported=1 detected=1, libcamera interfaces=1

# 실패 시 출력:
# supported=1 detected=0  ← 케이블 연결 확인 필요
# supported=0 detected=0  ← 카메라 미활성화
```

---

## 4. 카메라 테스트

### 4.1 libcamera 명령어 테스트

```bash
# 카메라 정보 확인
libcamera-hello --list-cameras

# 출력 예시:
# Available cameras
# -----------------
# 0 : imx219 [3280x2464] (/base/soc/i2c0mux/i2c@1/imx219@10)
#     Modes: 'SRGGB10_CSI2P' : 640x480 [206.65 fps]
#                              1640x1232 [41.85 fps]
#                              1920x1080 [47.57 fps]
#                              3280x2464 [21.19 fps]

# 5초간 미리보기 (GUI 환경)
libcamera-hello -t 5000

# 정지 이미지 캡처
libcamera-still -o test_picamera.jpg

# 해상도 지정 캡처
libcamera-still -o test_hd.jpg --width 1920 --height 1080

# 비디오 녹화 (10초)
libcamera-vid -t 10000 -o test_video.h264
```

### 4.2 레거시 명령어 테스트 (구버전)

```bash
# 레거시 모드 필요 시 config.txt에 추가:
# camera_auto_detect=0
# start_x=1

# 정지 이미지 캡처
raspistill -o test_legacy.jpg

# 비디오 녹화
raspivid -t 10000 -o test_legacy.h264
```

### 4.3 Python PiCamera2 테스트

```python
#!/usr/bin/env python3
# 파일명: test_picamera2.py
"""Camera V2 (PiCamera2) 테스트"""

import sys
import time

def test_camera_detection():
    """카메라 감지 테스트"""
    print("=" * 50)
    print("Camera V2 감지 테스트")
    print("=" * 50)

    try:
        from picamera2 import Picamera2

        # 카메라 목록 확인
        cameras = Picamera2.global_camera_info()
        print(f"[성공] 감지된 카메라: {len(cameras)}개")

        for i, cam in enumerate(cameras):
            print(f"  카메라 {i}: {cam}")

        return True

    except ImportError:
        print("[실패] picamera2 모듈이 설치되지 않았습니다.")
        print("  설치: sudo apt install python3-picamera2")
        return False

    except Exception as e:
        print(f"[실패] 카메라 감지 오류: {e}")
        return False

def test_camera_initialize():
    """카메라 초기화 테스트"""
    print("\n" + "=" * 50)
    print("카메라 초기화 테스트")
    print("=" * 50)

    try:
        from picamera2 import Picamera2

        picam2 = Picamera2()

        # 설정 생성
        config = picam2.create_preview_configuration(
            main={"size": (640, 480), "format": "RGB888"}
        )
        picam2.configure(config)

        print("[성공] 카메라 초기화 완료")
        print(f"  설정: {config}")

        picam2.close()
        return True

    except Exception as e:
        print(f"[실패] 초기화 오류: {e}")
        return False

def test_capture_image():
    """이미지 캡처 테스트"""
    print("\n" + "=" * 50)
    print("이미지 캡처 테스트")
    print("=" * 50)

    try:
        from picamera2 import Picamera2
        import numpy as np

        picam2 = Picamera2()
        config = picam2.create_still_configuration(
            main={"size": (1920, 1080)}
        )
        picam2.configure(config)

        # 카메라 시작
        picam2.start()
        time.sleep(2)  # 자동 노출 안정화 대기

        # 이미지 캡처
        frame = picam2.capture_array()

        print(f"[성공] 이미지 캡처 완료")
        print(f"  크기: {frame.shape}")
        print(f"  데이터 타입: {frame.dtype}")

        # 저장 (OpenCV 사용)
        import cv2
        # RGB → BGR 변환
        frame_bgr = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
        cv2.imwrite('picamera2_test.jpg', frame_bgr)
        print("  저장됨: picamera2_test.jpg")

        picam2.stop()
        picam2.close()
        return True

    except Exception as e:
        print(f"[실패] 캡처 오류: {e}")
        return False

def test_continuous_capture(duration=5):
    """연속 캡처 테스트 (FPS 측정)"""
    print("\n" + "=" * 50)
    print(f"연속 캡처 테스트 ({duration}초)")
    print("=" * 50)

    try:
        from picamera2 import Picamera2

        picam2 = Picamera2()
        config = picam2.create_preview_configuration(
            main={"size": (640, 480), "format": "RGB888"}
        )
        picam2.configure(config)
        picam2.start()

        frame_count = 0
        start_time = time.time()

        while time.time() - start_time < duration:
            frame = picam2.capture_array()
            frame_count += 1

        elapsed = time.time() - start_time
        actual_fps = frame_count / elapsed

        print(f"[결과]")
        print(f"  총 프레임: {frame_count}")
        print(f"  경과 시간: {elapsed:.2f}초")
        print(f"  실제 FPS: {actual_fps:.1f}")

        picam2.stop()
        picam2.close()
        return True

    except Exception as e:
        print(f"[실패] 연속 캡처 오류: {e}")
        return False

def test_video_preview(duration=10):
    """비디오 미리보기 테스트"""
    print("\n" + "=" * 50)
    print(f"비디오 미리보기 테스트 ({duration}초)")
    print("=" * 50)

    try:
        from picamera2 import Picamera2
        import cv2

        picam2 = Picamera2()
        config = picam2.create_preview_configuration(
            main={"size": (640, 480), "format": "RGB888"}
        )
        picam2.configure(config)
        picam2.start()

        print("미리보기 시작... ('q' 키로 종료)")

        start_time = time.time()
        frame_count = 0

        while time.time() - start_time < duration:
            frame = picam2.capture_array()
            frame_count += 1

            # RGB → BGR 변환
            frame_bgr = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

            # FPS 계산 및 표시
            elapsed = time.time() - start_time
            fps = frame_count / elapsed if elapsed > 0 else 0
            cv2.putText(frame_bgr, f"PiCamera2 - FPS: {fps:.1f}",
                       (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

            cv2.imshow('PiCamera2 Test', frame_bgr)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        print(f"[성공] 미리보기 완료 (평균 FPS: {fps:.1f})")

        picam2.stop()
        picam2.close()
        cv2.destroyAllWindows()
        return True

    except Exception as e:
        print(f"[실패] 미리보기 오류: {e}")
        return False

if __name__ == "__main__":
    print("\n*** Camera V2 테스트 시작 ***\n")

    # 1. 감지 테스트
    if not test_camera_detection():
        sys.exit(1)

    # 2. 초기화 테스트
    if not test_camera_initialize():
        sys.exit(1)

    # 3. 이미지 캡처 테스트
    if not test_capture_image():
        sys.exit(1)

    # 4. 연속 캡처 테스트
    if not test_continuous_capture(5):
        sys.exit(1)

    # 5. 비디오 미리보기 (GUI 환경에서만)
    # test_video_preview(10)

    print("\n*** 모든 테스트 완료 ***")
```

### 4.4 테스트 실행

```bash
cd ~/ocr-anpr
python3 test_picamera2.py
```

---

## 5. 문제 해결

### 5.1 "Camera not detected" 오류

```bash
# 1. vcgencmd으로 상태 확인
vcgencmd get_camera
# detected=0 이면:

# 2. 케이블 재연결 (전원 OFF 상태에서)

# 3. config.txt 확인
cat /boot/config.txt | grep -E "camera|start_x|gpu_mem"

# 4. 필요 시 추가:
sudo nano /boot/config.txt
# start_x=1
# gpu_mem=128

# 5. 재부팅
sudo reboot
```

### 5.2 "mmal" 오류 (레거시)

```bash
# mmal: Cannot read camera info
# 해결: libcamera로 전환

# config.txt에서 레거시 모드 비활성화
sudo nano /boot/config.txt
# camera_auto_detect=1 (또는 이 줄 삭제)

sudo reboot
```

### 5.3 권한 오류

```bash
# video 그룹에 사용자 추가
sudo usermod -aG video $USER

# 로그아웃 후 재로그인
exit
```

### 5.4 GPU 메모리 부족

```bash
# GPU 메모리 확인
vcgencmd get_mem gpu

# 부족하면 증가 (128MB 권장)
sudo nano /boot/config.txt
# gpu_mem=128

sudo reboot
```
