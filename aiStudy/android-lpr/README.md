# Android 자동차 번호판 인식 (LPR) 프로젝트

3가지 방식으로 구현한 Android 번호판 인식 앱

## 프로젝트 구조

```
android-lpr/
├── mlkit-lpr/      # Google ML Kit 기반
├── tflite-lpr/     # TensorFlow Lite 기반
├── opencv-lpr/     # OpenCV + Tesseract 기반
└── docs/           # 문서
```

## 각 방식 비교

| 방식 | 장점 | 단점 | 앱 용량 |
|------|------|------|---------|
| ML Kit | 간단, 무료, 오프라인 | 커스터마이징 제한 | ~10MB |
| TensorFlow Lite | 높은 정확도, 커스텀 모델 | 학습 필요 | ~20MB |
| OpenCV + Tesseract | 세밀한 제어 | 복잡, 큰 용량 | ~50MB |

## 한국 번호판 패턴

- 일반: `12가 3456`
- 구형: `서울12 가 3456`
- 신형: `123가 4567`
- 영업용: `서울12 바 3456`

## 개발 환경

- Android Studio Hedgehog 이상
- Kotlin 1.9+
- minSdk: 24
- targetSdk: 34
