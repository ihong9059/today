# Test 폴더 - 번호판 인식 벤치마크

현재 진행 중인 Mac vs Jetson Nano 번호판 인식 성능 비교 테스트에 필요한 파일들입니다.

---

## 폴더 구조

```
test/
├── README.md                              # 이 파일
├── plate_ocr_benchmark.py                 # 벤치마크 스크립트
├── benchmark_result_mac.json              # Mac 테스트 결과 (JSON)
├── benchmark_result_mac.md                # Mac 테스트 결과 (Markdown)
├── benchmark_result_jetson_nano.json      # Jetson Nano 테스트 결과 (JSON)
├── benchmark_result_jetson_nano.md        # Jetson Nano 테스트 결과 (Markdown)
├── 번호판_인식_Mac_vs_Jetson_비교보고서.md  # 최종 비교 보고서
└── data/                                  # 테스트 이미지 (30개)
    ├── plate_01.png ~ plate_30.png
```

---

## 파일 설명

### 1. plate_ocr_benchmark.py
**크로스 플랫폼 번호판 인식 벤치마크 스크립트**

| 항목 | 내용 |
|:-----|:-----|
| 용도 | Mac/Jetson Nano에서 동일한 테스트 수행 |
| OCR 엔진 | EasyOCR 1.7.2 |
| 기능 | 번호판 영역 검출 + OCR + '오' 보정 |
| 출력 | JSON 및 Markdown 결과 파일 |

**실행 방법:**
```bash
# Mac
source venv/bin/activate
python plate_ocr_benchmark.py

# Jetson Nano
python3 plate_ocr_benchmark.py
```

---

### 2. benchmark_result_mac.json / .md
**Mac 테스트 결과**

| 항목 | 값 |
|:-----|:---|
| 플랫폼 | MacBook Pro (i7-4770HQ) |
| GPU | 없음 (CPU 모드) |
| 인식률 | 83% (25/30) |
| 평균 시간 | 1.19초/장 |

---

### 3. benchmark_result_jetson_nano.json / .md
**Jetson Nano 테스트 결과**

| 항목 | 값 |
|:-----|:---|
| 플랫폼 | Jetson Nano (Cortex-A57) |
| GPU | 128 CUDA 코어 |
| 인식률 | 83% (25/30) |
| 평균 시간 | 2.28초/장 |

---

### 4. 번호판_인식_Mac_vs_Jetson_비교보고서.md
**최종 비교 분석 보고서**

- 두 플랫폼 성능 비교
- 파일별 인식 결과
- 그룹별 인식률 분석
- 권장사항 및 결론

---

### 5. data/ 폴더
**테스트 이미지 30개**

| 그룹 | 파일 | 인식률 |
|:-----|:-----|:------:|
| 기존 | plate_01 ~ plate_10 | 90% |
| 추가 1차 | plate_11 ~ plate_20 | 60% |
| 추가 2차 | plate_21 ~ plate_30 | 100% |

---

## 사용법

### 새로운 테스트 실행

1. 이미지를 `data/` 폴더에 추가
2. `plate_ocr_benchmark.py` 실행
3. 결과 파일 확인

### Jetson Nano로 파일 전송

```bash
scp plate_ocr_benchmark.py uttec@192.168.1.11:~/aiTest/
scp data/*.png uttec@192.168.1.11:~/aiTest/data/
```

---

*마지막 업데이트: 2026-01-23*
