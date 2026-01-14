# IP Webcam OCR

스마트폰 IP Webcam에서 영상을 받아 PC에서 OCR(문자 인식)을 수행하는 프로그램입니다.

## 기능

- 스마트폰 카메라 실시간 스트리밍 수신
- 한글 + 영어 텍스트 인식 (EasyOCR)
- 번호판 인식 (한글 오인식 자동 보정)
- 다중 캡처 투표 시스템 (3회 촬영 후 최다 결과 선택)

## 사전 준비

### 1. 스마트폰에 IP Webcam 앱 설치

Google Play Store에서 "IP Webcam" 앱 설치:
- 앱 이름: IP Webcam
- 개발자: Pavel Khlebovich
- 링크: https://play.google.com/store/apps/details?id=com.pas.webcam

### 2. IP Webcam 앱 설정

1. 앱 실행
2. 화면 하단 "Start server" 버튼 클릭
3. 표시되는 IP 주소 확인 (예: `http://192.168.0.32:8080`)

## 실행 방법

```bash
# 방법 1: 명령줄 인자로 IP 주소 전달
python ip_webcam_ocr.py 192.168.0.32:8080

# 방법 2: 실행 후 IP 주소 입력
python ip_webcam_ocr.py
```

## 조작법

| 키 | 기능 |
|---|---|
| `C` 또는 `Space` | 캡처 및 OCR 인식 |
| `M` | 다중 캡처 모드 (3회 촬영 후 투표) |
| `Q` 또는 `ESC` | 종료 |

## 기술 스택

- Python 3.13+
- OpenCV - 영상 처리
- EasyOCR - 한글/영어 OCR (PyTorch 기반)
- NumPy - 수치 연산

## 설치된 패키지

```
opencv-python==4.11.0.86
easyocr==1.7.2
torch==2.9.1
torchvision==0.24.1
numpy==2.4.1
```

## 네트워크 요구사항

- PC와 스마트폰이 **같은 WiFi 네트워크**에 연결되어 있어야 함
- 방화벽에서 포트 8080 허용 필요 (IP Webcam 기본 포트)

## 문제 해결

### 연결 안 됨
1. IP Webcam 앱이 실행 중인지 확인
2. PC와 스마트폰이 같은 네트워크인지 확인
3. 웹 브라우저에서 `http://IP주소:8080` 접속 테스트

### OCR 인식률 낮음
- 조명이 충분한지 확인
- 카메라를 텍스트와 가깝게 위치
- 다중 캡처 모드(M키) 사용

## 버전

- v1.0.0 (2026-01-11)
  - 최초 릴리즈
  - 한글/영어 OCR 지원
  - 번호판 한글 오인식 보정
  - 다중 캡처 투표 시스템
