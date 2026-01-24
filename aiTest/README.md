# aiTest - AI 벤치마크 프로젝트

다양한 플랫폼에서 AI 모델 성능을 비교하는 프로젝트입니다.

---

## 폴더 구조

```
aiTest/
├── README.md                           # 이 파일
├── DIGITALOCEAN_GPU_BENCHMARK_GUIDE.md # DO GPU 벤치마크 가이드
├── benchmark/                          # 벤치마크 결과 통합
│   ├── README.md
│   ├── plate_ocr_*.json/md             # 번호판 OCR 결과
│   └── bolt_test_*.json/md             # 볼트 품질검사 결과
├── test/                               # 번호판 OCR 테스트
│   ├── plate_ocr_benchmark.py
│   ├── benchmark_result_*.json/md
│   ├── 번호판_인식_3자비교_보고서.md
│   └── data/                           # 테스트 이미지 30개
├── boltTest/                           # 볼트 품질검사 AI
│   ├── src/
│   │   ├── benchmark.py                # 벤치마크 스크립트
│   │   ├── train.py                    # 모델 학습
│   │   └── inference.py                # 추론
│   ├── data/                           # 학습/테스트 데이터
│   ├── models/                         # 학습된 모델
│   └── benchmark/                      # 벤치마크 결과
├── scripts/                            # 유틸리티 스크립트
│   ├── setup_do_gpu.sh                 # DO GPU 환경 설정
│   └── run_benchmark_do_gpu.sh         # DO GPU 벤치마크 실행
└── reference/                          # 참고 자료
```

---

## 벤치마크 결과 요약

### 번호판 OCR (30개 이미지)

| 순위 | 플랫폼 | 평균 시간 | FPS | 인식률 |
|:----:|:-------|----------:|----:|:------:|
| 🥇 | **Windows PC (i5-1235U)** | **1.00초** | 1.00 | 83% |
| 🥈 | Mac (i7-4770HQ) | 1.19초 | 0.84 | 83% |
| 🥉 | Jetson Nano (GPU) | 2.28초 | 0.44 | 83% |
| 4 | Raspberry Pi 5 | 2.61초 | 0.38 | 83% |
| 5 | DO Server (2vCPU) | 3.52초 | 0.28 | 83% |
| ? | DO GPU (RTX 4000 Ada) | ~0.17초 | ~5.8 | 예상 |

### 볼트 품질검사 AI (10 에폭 학습)

| 순위 | 플랫폼 | 학습 시간 | 추론 FPS | 재현율 |
|:----:|:-------|----------:|---------:|:------:|
| 🥇 | **Windows PC (i5-1235U)** | **2.45분** | **31.2** | **97.2%** |
| 🥈 | Raspberry Pi 5 | 3.90분 | 21.5 | 94.4% |
| 🥉 | DO Server (2vCPU) | 4.93분 | 18.6 | 88.9% |
| ? | DO GPU (RTX 4000 Ada) | ~0.5분 | ~157 | 예상 |

---

## 빠른 시작

### 1. Windows PC에서 벤치마크

```bash
cd aiTest/test
python plate_ocr_benchmark.py

cd aiTest/boltTest
python src/benchmark.py
```

### 2. DigitalOcean GPU에서 벤치마크

**상세 가이드:** `DIGITALOCEAN_GPU_BENCHMARK_GUIDE.md`

```bash
# 1. GPU Droplet 생성 (RTX 4000 Ada, $0.76/hr)
# 2. SSH 접속
ssh do-gpu

# 3. 환경 설정 (최초 1회)
bash setup_do_gpu.sh

# 4. 코드 업로드 (로컬에서)
scp -r aiTest do-gpu:/opt/ai-benchmark/

# 5. 벤치마크 실행 (서버에서)
bash run_benchmark_do_gpu.sh

# 6. 결과 다운로드 (로컬에서)
scp do-gpu:/opt/ai-benchmark/aiTest/test/benchmark_result_*.json ./
scp do-gpu:/opt/ai-benchmark/aiTest/boltTest/benchmark/benchmark_result_*.json ./

# 7. Droplet 삭제 (비용 절감)
```

---

## 주요 문서

| 문서 | 설명 |
|:-----|:-----|
| `DIGITALOCEAN_GPU_BENCHMARK_GUIDE.md` | **DO GPU 벤치마크 상세 가이드** |
| `benchmark/README.md` | 벤치마크 결과 종합 |
| `test/번호판_인식_3자비교_보고서.md` | 번호판 OCR 3자 비교 |
| `boltTest/README.md` | 볼트 품질검사 프로젝트 |

---

## 테스트 플랫폼

| 플랫폼 | CPU/GPU | 특징 | 상태 |
|:-------|:--------|:-----|:----:|
| Windows PC | i5-1235U (12세대) | 개발/테스트용 | ✅ 완료 |
| Mac | i7-4770HQ (4세대) | 휴대용 | ✅ 완료 |
| Jetson Nano | ARM + 128 CUDA | 임베디드 | ✅ 완료 |
| Raspberry Pi 5 | ARM Cortex-A76 | 임베디드 | ✅ 완료 |
| DO Server | AMD 2vCPU | 클라우드 CPU | ✅ 완료 |
| DO RTX 4000 Ada | 6,144 CUDA | 클라우드 GPU | 📋 예정 |
| DO H100 | 16,896 CUDA | 고성능 AI | 📋 예정 |

---

## 기술 스택

| 항목 | 내용 |
|:-----|:-----|
| OCR 엔진 | EasyOCR 1.7.2 |
| 딥러닝 | PyTorch 2.x |
| 모델 | MobileNetV3-Small |
| 영역 검출 | OpenCV |

---

*마지막 업데이트: 2026-01-24*
