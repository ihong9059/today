# aiTest - 번호판 인식 AI 프로젝트

Mac과 Jetson Nano에서 EasyOCR 기반 한국 자동차 번호판 인식 성능을 비교하는 프로젝트입니다.

---

## 폴더 구조

```
aiTest/
├── README.md          # 이 파일
├── test/              # 현재 테스트에 필요한 파일
│   ├── plate_ocr_benchmark.py
│   ├── benchmark_result_*.json/md
│   ├── 번호판_인식_Mac_vs_Jetson_비교보고서.md
│   └── data/          # 테스트 이미지 30개
├── reference/         # 참고 자료 (과거 테스트, 스크립트, 결과)
│   ├── 스크립트 (기본/최적화/분석)
│   ├── 데이터 파일
│   ├── 결과 파일
│   └── 리포트/가이드
└── venv/              # Python 가상환경 (Mac)
```

---

## 최신 테스트 결과 (30개 이미지)

| 항목 | Mac (CPU) | Jetson Nano (GPU) |
|:-----|----------:|------------------:|
| **인식률** | 83% (25/30) | 83% (25/30) |
| **평균 시간** | **1.19초/장** | 2.28초/장 |
| **처리 속도** | **0.84 FPS** | 0.44 FPS |

---

## 빠른 시작

### Mac에서 테스트

```bash
cd aiTest
source venv/bin/activate
cd test
python plate_ocr_benchmark.py
```

### Jetson Nano에서 테스트

```bash
ssh uttec@192.168.1.11
cd ~/aiTest
python3 plate_ocr_benchmark.py
```

### 새 이미지 추가 후 테스트

1. 이미지를 `test/data/` 폴더에 추가 (plate_XX.png 형식)
2. Jetson에 이미지 전송: `scp test/data/*.png uttec@192.168.1.11:~/aiTest/data/`
3. 양쪽에서 벤치마크 실행

---

## 주요 문서

| 문서 | 위치 | 설명 |
|:-----|:-----|:-----|
| 최종 비교 보고서 | `test/번호판_인식_Mac_vs_Jetson_비교보고서.md` | Mac vs Jetson 성능 비교 |
| 전체 성능 리포트 | `reference/번호판_인식_성능비교_리포트.md` | 모든 테스트 종합 분석 |
| test 폴더 설명 | `test/README.md` | 테스트 파일 상세 설명 |
| reference 폴더 설명 | `reference/README.md` | 참고 자료 상세 설명 |

---

## 기술 스택

| 항목 | 내용 |
|:-----|:-----|
| OCR 엔진 | EasyOCR 1.7.2 |
| 딥러닝 | PyTorch |
| 영역 검출 | OpenCV |
| 테스트 플랫폼 | Mac (CPU), Jetson Nano (GPU) |

---

*마지막 업데이트: 2026-01-23*
