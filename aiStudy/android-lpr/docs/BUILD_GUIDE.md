# Android 번호판 인식 앱 빌드 가이드

## 공통 준비사항

### 1. 개발 환경
- Android Studio Hedgehog (2023.1.1) 이상
- JDK 17
- Android SDK 34

### 2. 프로젝트 열기
1. Android Studio에서 File > Open 선택
2. 원하는 프로젝트 폴더 선택 (mlkit-lpr, tflite-lpr, opencv-lpr)
3. Gradle sync 대기

---

## 1. ML Kit 프로젝트 (mlkit-lpr)

### 빌드 방법
```bash
cd mlkit-lpr
./gradlew assembleDebug
```

### 특이사항
- 추가 설정 없이 바로 빌드 가능
- 한국어 텍스트 인식 모델 자동 다운로드
- 첫 실행 시 모델 다운로드로 시간 소요

### APK 위치
`app/build/outputs/apk/debug/app-debug.apk`

---

## 2. TensorFlow Lite 프로젝트 (tflite-lpr)

### 모델 파일 준비
`app/src/main/assets/` 폴더에 다음 파일 필요:
- `plate_detector.tflite` - 번호판 검출 모델
- `plate_recognizer.tflite` - 문자 인식 모델

### 모델 학습 방법
1. **번호판 검출 모델**
   - YOLOv5, EfficientDet 등 사용
   - 한국 번호판 데이터셋으로 학습
   - TFLite로 변환

2. **문자 인식 모델**
   - CRNN 구조 권장
   - CTC Loss 사용
   - TFLite로 변환

### 빌드 방법
```bash
cd tflite-lpr
./gradlew assembleDebug
```

### 참고 자료
- [TensorFlow Lite 모델 변환](https://www.tensorflow.org/lite/convert)
- [YOLO to TFLite](https://github.com/ultralytics/yolov5)

---

## 3. OpenCV + Tesseract 프로젝트 (opencv-lpr)

### Tesseract 데이터 파일 준비
`app/src/main/assets/tessdata/` 폴더에 다음 파일 필요:
- `kor.traineddata` - 한국어 학습 데이터
- `eng.traineddata` - 영어 학습 데이터 (선택)

### 다운로드 링크
```bash
# 한국어
wget https://github.com/tesseract-ocr/tessdata/raw/main/kor.traineddata

# 영어
wget https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata
```

### 빌드 방법
```bash
cd opencv-lpr
./gradlew assembleDebug
```

### 주의사항
- APK 용량이 ~50MB로 큼
- 첫 실행 시 tessdata 복사로 시간 소요

---

## 테스트 방법

### 1. 디바이스 연결
```bash
adb devices
```

### 2. 앱 설치
```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

### 3. 테스트
1. 앱 실행
2. 카메라 권한 허용
3. 자동차 번호판을 녹색 가이드 안에 위치
4. "인식하기" 버튼 클릭

---

## 성능 비교

| 항목 | ML Kit | TFLite | OpenCV |
|------|--------|--------|--------|
| 정확도 | 중 | 상 | 중 |
| 속도 | 빠름 | 보통 | 느림 |
| 오프라인 | O | O | O |
| 앱 용량 | 10MB | 20MB | 50MB |
| 커스터마이징 | 제한적 | 가능 | 가능 |
| 구현 난이도 | 쉬움 | 어려움 | 보통 |

---

## 문제 해결

### Q: ML Kit 모델 다운로드 실패
A: 인터넷 연결 확인, WiFi 환경에서 재시도

### Q: TFLite "모델 필요" 메시지
A: assets 폴더에 .tflite 모델 파일 추가 필요

### Q: OpenCV 초기화 실패
A: Native 라이브러리 로드 실패, ABI 호환성 확인

### Q: Tesseract OCR 정확도 낮음
A: 번호판용 커스텀 traineddata 사용 권장
