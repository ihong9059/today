# Reference 폴더 - 번호판 인식 개발 참고 자료

번호판 인식 AI 개발 과정에서 생성된 테스트 스크립트, 실험 결과, 데이터 파일들입니다.

---

## 폴더 구조

```
reference/
├── README.md                    # 이 파일
│
├── [스크립트 - 기본]
│   ├── benchmark_ocr.py         # 기본 벤치마크 스크립트
│   ├── plate_ocr.py             # 기본 번호판 인식 스크립트
│   └── plate_ocr_tesseract.py   # Tesseract OCR 테스트
│
├── [스크립트 - 최적화]
│   ├── plate_ocr_cudnn_test.py      # cuDNN 최적화 테스트
│   ├── plate_ocr_size_test.py       # 이미지 크기 최적화 테스트
│   ├── plate_ocr_optimized.py       # 최적화 버전
│   ├── plate_ocr_optimized_final.py # 최적화 최종 버전
│   ├── plate_ocr_fp16_test.py       # FP16/AMP 테스트
│   └── plate_ocr_tensorrt_test.py   # TensorRT 테스트
│
├── [스크립트 - 분석/개선]
│   ├── plate_ocr_detect.py      # 영역 검출 + OCR 파이프라인
│   ├── plate_ocr_preprocess.py  # 이미지 전처리 테스트
│   ├── plate_ocr_final.py       # 영역 검출 + 보정 최종 버전
│   ├── plate_07_analysis.py     # plate_07 실패 원인 분석
│   ├── plate_07_fix.py          # '오' 보정 테스트
│   └── plate_ocr_paddle_test.py # PaddleOCR 비교 테스트
│
├── [데이터]
│   ├── korean_plates.json       # 한국 번호판 샘플 데이터
│   ├── korean_plates.csv        # 한국 번호판 CSV
│   ├── korean_plate_list.md     # 한국 번호판 목록
│   └── plate_numbers.txt        # 번호판 번호 텍스트
│
├── [결과 - 벤치마크]
│   ├── benchmark_DESKTOP-MD6RE2A.txt        # Windows ThinkPad 결과
│   └── benchmark_maeg-ui-MacBookPro.local.txt # Mac 초기 결과
│
├── [결과 - 인식]
│   ├── 번호판_인식결과.md                 # Mac/Windows EasyOCR 결과
│   ├── 번호판_인식결과_jetson.md          # Jetson EasyOCR 결과
│   ├── 번호판_인식결과_tesseract.md       # Mac Tesseract 결과
│   ├── 번호판_인식결과_tesseract_jetson.md # Jetson Tesseract 결과
│   ├── 번호판_인식결과_전처리비교_jetson.md # 전처리 비교 결과
│   └── 번호판_인식결과_영역검출_jetson.md   # 영역 검출 결과
│
├── [리포트/가이드]
│   ├── 번호판_인식_성능비교_리포트.md    # 전체 성능 비교 리포트
│   └── 번호판_이미지_합성_가이드.md      # 이미지 합성 가이드
│
└── [기타]
    ├── prompt.txt               # 프롬프트 메모
    └── plate_0.txt              # 임시 파일
```

---

## 파일 상세 설명

### 스크립트 - 기본

| 파일 | 설명 | 용도 |
|:-----|:-----|:-----|
| `benchmark_ocr.py` | EasyOCR 기본 벤치마크 | 플랫폼별 성능 측정 |
| `plate_ocr.py` | 기본 번호판 인식 | EasyOCR 기본 테스트 |
| `plate_ocr_tesseract.py` | Tesseract OCR 테스트 | EasyOCR vs Tesseract 비교 |

### 스크립트 - 최적화

| 파일 | 설명 | 결과 |
|:-----|:-----|:-----|
| `plate_ocr_cudnn_test.py` | cuDNN benchmark 모드 테스트 | 모델 로딩 41% 단축 |
| `plate_ocr_size_test.py` | 이미지 크기별 속도 테스트 | 480x480 최적 (1.80x 빠름) |
| `plate_ocr_optimized.py` | cuDNN + 크기 최적화 적용 | 중간 버전 |
| `plate_ocr_optimized_final.py` | 모든 최적화 적용 | **1.94초/장, 90%** |
| `plate_ocr_fp16_test.py` | FP16/AMP 테스트 | OpenCV 호환 문제로 실패 |
| `plate_ocr_tensorrt_test.py` | TensorRT 변환 테스트 | DataParallel 구조로 실패 |

### 스크립트 - 분석/개선

| 파일 | 설명 | 결과 |
|:-----|:-----|:-----|
| `plate_ocr_detect.py` | OpenCV 영역 검출 + OCR | 인식률 70% → 90% |
| `plate_ocr_preprocess.py` | 이미지 전처리 (CLAHE, denoise 등) | 효과 제한적 (+10%) |
| `plate_ocr_final.py` | 영역 검출 + '오' 보정 최종 | 90% 달성 |
| `plate_07_analysis.py` | plate_07 인식 실패 분석 | '오' → '2' 오인식 발견 |
| `plate_07_fix.py` | '오' ↔ '2' 보정 로직 | plate_07 해결 |
| `plate_ocr_paddle_test.py` | PaddleOCR 테스트 | Python 3.6 호환 문제 |

### 데이터 파일

| 파일 | 설명 | 내용 |
|:-----|:-----|:-----|
| `korean_plates.json` | 한국 번호판 샘플 | JSON 형식 번호판 데이터 |
| `korean_plates.csv` | 한국 번호판 CSV | 스프레드시트용 |
| `korean_plate_list.md` | 한국 번호판 형식 설명 | 번호판 규격, 글자 조합 |
| `plate_numbers.txt` | 테스트용 번호판 번호 | 텍스트 목록 |

### 결과 파일

| 파일 | 플랫폼 | OCR | 인식률 |
|:-----|:-------|:----|:------:|
| `번호판_인식결과.md` | Mac/Windows | EasyOCR | 70% |
| `번호판_인식결과_jetson.md` | Jetson | EasyOCR (GPU) | 70% |
| `번호판_인식결과_tesseract.md` | Mac | Tesseract | 0% |
| `번호판_인식결과_tesseract_jetson.md` | Jetson | Tesseract | 20% |
| `번호판_인식결과_전처리비교_jetson.md` | Jetson | EasyOCR + 전처리 | 50% |
| `번호판_인식결과_영역검출_jetson.md` | Jetson | EasyOCR + 영역검출 | 90% |

### 리포트/가이드

| 파일 | 설명 |
|:-----|:-----|
| `번호판_인식_성능비교_리포트.md` | **전체 성능 비교 종합 리포트** - 플랫폼별, OCR별, 최적화별 비교 |
| `번호판_이미지_합성_가이드.md` | 테스트용 번호판 이미지 생성 가이드 |

---

## 주요 실험 결과 요약

### 속도 최적화 (Jetson Nano)

| 방법 | 시간 | 개선 |
|:-----|-----:|:----:|
| 기본 | 4.55초 | 1.00x |
| cuDNN ON | 3.21초 | 1.42x |
| 480x480 | 1.89초 | 2.41x |
| **최종** | **1.94초** | **2.35x** |

### 인식률 개선

| 방법 | 인식률 |
|:-----|:------:|
| 기본 EasyOCR | 70% |
| 이미지 전처리 | 50% |
| **영역 검출 + '오' 보정** | **90%** |

### OCR 엔진 비교

| OCR | 인식률 | 속도 |
|:----|:------:|:----:|
| **EasyOCR** | **70~90%** | 1.9~4.5초 |
| Tesseract | 0~20% | 0.8~6.3초 |
| PaddleOCR | - | 호환 불가 |

---

## 활용 방법

1. **새로운 최적화 테스트**: 기존 스크립트 참고하여 수정
2. **인식률 분석**: 결과 파일 비교
3. **전체 현황 파악**: `번호판_인식_성능비교_리포트.md` 참조

---

*마지막 업데이트: 2026-01-23*
