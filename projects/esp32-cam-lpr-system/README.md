# ESP32-CAM + Raspberry Pi 번호판 인식 AI 시스템

## 프로젝트 개요

이 프로젝트는 **ESP32-CAM**과 **Raspberry Pi 3 B+**를 결합하여 자동차 번호판 인식(LPR: License Plate Recognition) 및 문자 인식(OCR) AI 시스템을 구축하는 가이드입니다.

## 시스템 구성도

```
┌─────────────────┐         WiFi          ┌─────────────────────┐
│   ESP32-CAM     │ ◄──────────────────► │  Raspberry Pi 3 B+   │
│   (카메라)       │    HTTP Streaming     │  (AI 처리 서버)      │
│                 │                       │                      │
│  - 영상 캡처     │                       │  - OpenCV           │
│  - WiFi 전송    │                       │  - Tesseract OCR    │
│  - 저전력       │                       │  - Python 처리      │
└─────────────────┘                       └─────────────────────┘
                                                    │
                                                    ▼
                                          ┌─────────────────────┐
                                          │   결과 출력/저장     │
                                          │  - LCD 디스플레이    │
                                          │  - 데이터베이스      │
                                          │  - 웹 인터페이스     │
                                          └─────────────────────┘
```

## 프로젝트 가능성 분석

### 기술적 실현 가능성: ✅ 높음

| 항목 | 평가 | 설명 |
|------|------|------|
| 하드웨어 호환성 | ⭐⭐⭐⭐⭐ | ESP32-CAM과 RPi 3B+ 조합은 검증된 구성 |
| 소프트웨어 지원 | ⭐⭐⭐⭐⭐ | OpenCV, Tesseract 모두 RPi 지원 |
| 성능 | ⭐⭐⭐⭐ | 실시간 처리는 제한적, 이미지 캡처 방식 권장 |
| 비용 | ⭐⭐⭐⭐⭐ | 총 비용 약 5~7만원으로 저렴 |
| 난이도 | ⭐⭐⭐ | 중급 수준의 프로그래밍 지식 필요 |

### 장점

1. **저렴한 비용**: ESP32-CAM (~1만원) + RPi 3B+ (~5만원)
2. **유연한 배치**: WiFi 기반으로 카메라 위치 자유로움
3. **확장성**: 다중 카메라 지원 가능
4. **오픈소스**: 모든 소프트웨어 무료

### 제한사항

1. **실시간 처리 한계**: RPi 3B+에서 실시간 영상 처리는 부담
2. **인식률**: 조명, 각도에 따라 인식률 변동
3. **한글 인식**: 추가 학습 데이터 필요

## 디렉토리 구조

```
esp32-cam-lpr-system/
├── README.md                    # 이 파일
├── docs/
│   ├── 01_시스템_아키텍처.md
│   ├── 02_하드웨어_설정.md
│   ├── 03_소프트웨어_설치.md
│   ├── 04_사용_가이드.md
│   └── 05_트러블슈팅.md
├── src/
│   ├── esp32/
│   │   └── CameraWebServer.ino  # ESP32-CAM 펌웨어
│   └── raspberry_pi/
│       ├── lpr_main.py          # 메인 번호판 인식 스크립트
│       ├── ocr_processor.py     # OCR 처리 모듈
│       ├── stream_capture.py    # 스트림 캡처 모듈
│       └── utils.py             # 유틸리티 함수
└── config/
    └── config.yaml              # 설정 파일
```

## 빠른 시작

### 1. 하드웨어 준비
- ESP32-CAM 모듈
- Raspberry Pi 3 B+ (또는 그 이상)
- 5V 2A 전원 어댑터 (각각)
- MicroSD 카드 (16GB 이상)

### 2. 소프트웨어 설치 (Raspberry Pi)
```bash
# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# OpenCV 설치
sudo apt install python3-opencv -y

# Tesseract OCR 설치
sudo apt install tesseract-ocr tesseract-ocr-kor -y

# Python 패키지 설치
pip3 install pytesseract numpy imutils
```

### 3. ESP32-CAM 펌웨어 업로드
Arduino IDE에서 `CameraWebServer` 예제를 ESP32-CAM에 업로드

### 4. 실행
```bash
python3 src/raspberry_pi/lpr_main.py
```

## 참고 자료

- [ESP32-CAM 공식 문서](https://github.com/espressif/esp32-camera)
- [OpenCV 문서](https://docs.opencv.org/)
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)
- [Random Nerd Tutorials - ESP32-CAM](https://randomnerdtutorials.com/esp32-cam-video-streaming-web-server-camera-home-assistant/)

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
