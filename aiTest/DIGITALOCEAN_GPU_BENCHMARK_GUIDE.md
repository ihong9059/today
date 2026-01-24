# DigitalOcean GPU Droplets 벤치마크 가이드

**작성일:** 2026-01-24
**목적:** DigitalOcean GPU Droplet에서 AI 벤치마크 실행 방법

---

## 1. 개요

### 1.1 벤치마크 대상

| 테스트 | 설명 | 스크립트 |
|:-------|:-----|:---------|
| 번호판 OCR | EasyOCR 기반 번호판 인식 | `test/plate_ocr_benchmark.py` |
| 볼트 품질검사 | MobileNetV3 학습/추론 | `boltTest/src/benchmark.py` |

### 1.2 현재 벤치마크 결과 (비교용)

| 플랫폼 | 번호판 OCR | 볼트 AI 추론 |
|:-------|:----------:|:------------:|
| Windows PC (i5-1235U) | 1.00 FPS | 31.2 FPS |
| Mac (i7-4770HQ) | 0.84 FPS | (테스트 필요) |
| Jetson Nano (GPU) | 0.44 FPS | (테스트 필요) |
| **DO GPU (예상)** | **5-10 FPS** | **100+ FPS** |

---

## 2. DigitalOcean GPU Droplet 선택

### 2.1 권장 GPU Droplet

| 용도 | GPU | 가격 | GPU 메모리 | vCPU | RAM | 권장 |
|:-----|:----|-----:|:----------:|:----:|:---:|:----:|
| **테스트/개발** | RTX 4000 Ada | **$0.76/hr** | 20 GB | 8 | 32 GB | ✅ |
| 프로덕션 (소규모) | RTX 6000 Ada | $1.57/hr | 48 GB | 8 | 64 GB | |
| AI 학습 | H100 | $3.39/hr | 80 GB | 20 | 240 GB | |

### 2.2 예상 비용

| 사용 시간 | RTX 4000 Ada | RTX 6000 Ada |
|:----------|-------------:|-------------:|
| 1시간 | $0.76 | $1.57 |
| 4시간 (테스트) | **$3.04** | $6.28 |
| 8시간 | $6.08 | $12.56 |

> **권장**: RTX 4000 Ada로 4시간 테스트 ($3.04)

### 2.3 사용 가능 데이터센터

- NYC2 (뉴욕) - 권장
- TOR1 (토론토)
- AMS3 (암스테르담)

---

## 3. GPU Droplet 생성

### 3.1 DigitalOcean 콘솔에서 생성

1. https://cloud.digitalocean.com/droplets 접속
2. **Create Droplet** 클릭
3. **GPU** 탭 선택
4. 설정:
   - **Region**: NYC2
   - **GPU**: NVIDIA RTX 4000 Ada
   - **OS**: Ubuntu 22.04 (CUDA pre-installed)
   - **SSH Key**: 기존 키 사용
   - **Hostname**: `ai-benchmark-gpu`

### 3.2 SSH 접속 설정

#### Windows SSH config 추가

```bash
# C:\Users\{사용자명}\.ssh\config 에 추가

Host do-gpu
    HostName {GPU_DROPLET_IP}
    User root
    IdentityFile ~/.ssh/id_rsa
    StrictHostKeyChecking no
```

#### 접속 테스트

```bash
ssh do-gpu
```

---

## 4. GPU 서버 환경 설정

### 4.1 기본 설정 (최초 1회)

```bash
# SSH 접속
ssh do-gpu

# 시스템 업데이트
apt update && apt upgrade -y

# GPU 확인
nvidia-smi
```

예상 출력:
```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 535.xx       Driver Version: 535.xx       CUDA Version: 12.2    |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
|   0  NVIDIA RTX 4000 Ada   On | 00000000:00:05.0 Off |                  Off |
+-------------------------------+----------------------+----------------------+
```

### 4.2 Python 환경 설정

```bash
# 가상환경 생성
python3 -m venv /opt/ai-benchmark
source /opt/ai-benchmark/bin/activate

# pip 업그레이드
pip install --upgrade pip
```

### 4.3 PyTorch (CUDA) 설치

```bash
# PyTorch with CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 설치 확인
python -c "import torch; print(f'CUDA: {torch.cuda.is_available()}, GPU: {torch.cuda.get_device_name(0)}')"
```

### 4.4 추가 패키지 설치

```bash
# 번호판 OCR용
pip install easyocr opencv-python-headless pillow numpy

# 볼트 품질검사용 (이미 설치됨)
# pip install torch torchvision (위에서 설치됨)
```

---

## 5. 벤치마크 코드 업로드

### 5.1 로컬에서 서버로 전송

#### 방법 1: SCP로 전체 폴더 전송

```bash
# Windows PowerShell 또는 Git Bash에서 실행
cd C:\todo\today

# aiTest 폴더 전송
scp -r aiTest do-gpu:/opt/ai-benchmark/
```

#### 방법 2: 필요한 파일만 전송

```bash
# 번호판 OCR 벤치마크
scp aiTest/test/plate_ocr_benchmark.py do-gpu:/opt/ai-benchmark/
scp -r aiTest/test/data do-gpu:/opt/ai-benchmark/plate_data/

# 볼트 품질검사 벤치마크
scp aiTest/boltTest/src/benchmark.py do-gpu:/opt/ai-benchmark/bolt_benchmark.py
scp -r aiTest/boltTest/data do-gpu:/opt/ai-benchmark/bolt_data/
```

### 5.2 서버에서 폴더 구조 확인

```bash
ssh do-gpu

ls -la /opt/ai-benchmark/
# aiTest/
# ├── test/
# │   ├── plate_ocr_benchmark.py
# │   └── data/
# └── boltTest/
#     ├── src/benchmark.py
#     └── data/
```

---

## 6. 벤치마크 실행

### 6.1 번호판 OCR 벤치마크

```bash
ssh do-gpu
source /opt/ai-benchmark/bin/activate

cd /opt/ai-benchmark/aiTest/test
python plate_ocr_benchmark.py
```

예상 출력:
```
======================================================================
  번호판 인식 벤치마크 - 크로스 플랫폼
======================================================================
플랫폼: Linux PC (Linux)
아키텍처: x86_64
Python: 3.10.x
GPU 사용: True
CUDA: 12.2
cuDNN: 8902

테스트 이미지: 30개

[1] 모델 로딩...
    로딩 시간: 2.15초      ← Windows PC: 2.56초

[2] 워밍업...
    워밍업 시간: 0.12초    ← Windows PC: 0.44초

[3] 벤치마크 (30개 이미지)
----------------------------------------------------------------------
  plate_01.png: 23오14587        [O] 0.08s   ← Windows PC: 0.37s
  plate_02.png: 45하9283         [O] 0.15s   ← Windows PC: 1.18s
  ...

======================================================================
  결과 요약
======================================================================
  인식 성공: 25개 (83%)
  총 시간: 5.2초              ← Windows PC: 29.93초
  평균 시간: 0.17초/장        ← Windows PC: 1.00초/장
  처리 속도: 5.8 FPS          ← Windows PC: 1.00 FPS
```

### 6.2 볼트 품질검사 벤치마크

```bash
cd /opt/ai-benchmark/aiTest/boltTest
python src/benchmark.py
```

예상 출력:
```
======================================================================
  볼트 품질검사 AI 벤치마크 - 크로스 플랫폼
======================================================================
플랫폼: Linux PC (Linux)
GPU 사용: True
CUDA: 12.2
GPU: NVIDIA RTX 4000 Ada Generation

[1] 데이터 로드
    Train: 264개
    Val: 66개
    Test: 66개

[2] 모델 로드 (MobileNetV3-Small)
    로딩 시간: 0.85초        ← Windows PC: 1.10초

[3] 학습 벤치마크 (10 에폭)
----------------------------------------------------------------------
  Epoch  1/10 | Train: 75.2% | Val: 80.3% | Recall: 65.0% | 3.5s  ← Win: 18.6s
  Epoch  2/10 | Train: 88.5% | Val: 85.2% | Recall: 90.1% | 2.8s  ← Win: 14.7s
  ...
  Epoch 10/10 | Train: 96.8% | Val: 90.1% | Recall: 95.0% | 2.7s  ← Win: 14.9s

[4] 테스트 평가
    정확도: 93.5%
    재현율: 88.5%
    정밀도: 100.0%

[5] 추론 속도 벤치마크
    테스트 이미지: 66개
    평균 시간: 0.42초
    처리 속도: 157.1 FPS      ← Windows PC: 31.2 FPS
    이미지당: 6.4ms           ← Windows PC: 32.1ms

======================================================================
  결과 요약
======================================================================
  학습 시간 (10 에폭): 32.5초 (0.54분)  ← Windows PC: 2.45분
  추론 속도: 157.1 FPS                   ← Windows PC: 31.2 FPS
```

---

## 7. 결과 파일 다운로드

### 7.1 결과 파일 확인

```bash
# 서버에서 결과 파일 확인
ls -la /opt/ai-benchmark/aiTest/test/benchmark_result_*.json
ls -la /opt/ai-benchmark/aiTest/boltTest/benchmark/benchmark_result_*.json
```

### 7.2 로컬로 다운로드

```bash
# Windows PowerShell에서 실행
cd C:\todo\today\aiTest\benchmark

# 번호판 OCR 결과
scp do-gpu:/opt/ai-benchmark/aiTest/test/benchmark_result_linux_pc.json ./plate_ocr_do_gpu.json
scp do-gpu:/opt/ai-benchmark/aiTest/test/benchmark_result_linux_pc.md ./plate_ocr_do_gpu.md

# 볼트 품질검사 결과
scp do-gpu:/opt/ai-benchmark/aiTest/boltTest/benchmark/benchmark_result_linux_pc.json ./bolt_test_do_gpu.json
scp do-gpu:/opt/ai-benchmark/aiTest/boltTest/benchmark/benchmark_result_linux_pc.md ./bolt_test_do_gpu.md
```

### 7.3 파일명 변경 (GPU 식별용)

다운로드 후 파일명을 DO GPU로 변경:
- `plate_ocr_do_gpu_rtx4000.json`
- `bolt_test_do_gpu_rtx4000.json`

---

## 8. 비용 절약 팁

### 8.1 Droplet 중지/삭제

테스트 완료 후 **반드시 Droplet 삭제** (중지만 하면 스토리지 비용 발생)

```bash
# DigitalOcean 콘솔에서:
# Droplet → More → Destroy
```

### 8.2 스냅샷 저장 (선택)

환경 설정을 재사용하려면 스냅샷 저장:

```bash
# DigitalOcean 콘솔:
# Droplet → Snapshots → Take Snapshot

# 스냅샷 비용: $0.06/GB/월
# 32GB 시스템: ~$1.92/월
```

### 8.3 예상 총 비용

| 항목 | 비용 |
|:-----|-----:|
| GPU Droplet 4시간 (RTX 4000 Ada) | $3.04 |
| 스냅샷 1개월 (선택) | ~$2.00 |
| **총 예상 비용** | **$3~5** |

---

## 9. 빠른 시작 스크립트

### 9.1 원클릭 설정 스크립트

서버에서 실행할 설정 스크립트:

```bash
#!/bin/bash
# setup_benchmark.sh - GPU 서버 벤치마크 환경 설정

set -e

echo "=== AI 벤치마크 환경 설정 시작 ==="

# 1. 시스템 업데이트
apt update && apt upgrade -y

# 2. Python 가상환경
python3 -m venv /opt/ai-benchmark
source /opt/ai-benchmark/bin/activate

# 3. PyTorch (CUDA)
pip install --upgrade pip
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 4. 추가 패키지
pip install easyocr opencv-python-headless pillow numpy

# 5. GPU 확인
python -c "import torch; print(f'CUDA: {torch.cuda.is_available()}')"
nvidia-smi

echo "=== 설정 완료 ==="
echo "사용법: source /opt/ai-benchmark/bin/activate"
```

### 9.2 사용법

```bash
# 1. 서버 접속
ssh do-gpu

# 2. 설정 스크립트 실행 (최초 1회)
bash setup_benchmark.sh

# 3. 코드 업로드 (로컬에서)
scp -r aiTest do-gpu:/opt/ai-benchmark/

# 4. 벤치마크 실행
source /opt/ai-benchmark/bin/activate
cd /opt/ai-benchmark/aiTest/test
python plate_ocr_benchmark.py

cd /opt/ai-benchmark/aiTest/boltTest
python src/benchmark.py

# 5. 결과 다운로드 (로컬에서)
scp do-gpu:/opt/ai-benchmark/aiTest/test/benchmark_result_*.json ./
scp do-gpu:/opt/ai-benchmark/aiTest/boltTest/benchmark/benchmark_result_*.json ./
```

---

## 10. 예상 결과 비교표

### 10.1 번호판 OCR

| 플랫폼 | 평균 시간 | FPS | 인식률 | 비용 |
|:-------|----------:|----:|:------:|-----:|
| Windows PC (i5-1235U) | 1.00초 | 1.00 | 83% | - |
| Mac (i7-4770HQ) | 1.19초 | 0.84 | 83% | - |
| Jetson Nano (GPU) | 2.28초 | 0.44 | 83% | - |
| **DO RTX 4000 Ada** | **~0.17초** | **~5.8** | 83% | $0.76/hr |

### 10.2 볼트 품질검사

| 플랫폼 | 학습 (10에폭) | 추론 FPS | 재현율 | 비용 |
|:-------|-------------:|---------:|:------:|-----:|
| Windows PC (i5-1235U) | 2.45분 | 31.2 | 97.2% | - |
| **DO RTX 4000 Ada** | **~0.5분** | **~157** | 97%+ | $0.76/hr |

---

## 11. 체크리스트

### 사전 준비

- [ ] DigitalOcean 계정 및 결제 수단 설정
- [ ] SSH 키 준비 (기존 키 또는 새로 생성)

### GPU Droplet 생성

- [ ] GPU Droplet 생성 (RTX 4000 Ada, NYC2)
- [ ] SSH config 설정 (`do-gpu`)
- [ ] SSH 접속 테스트

### 환경 설정

- [ ] 시스템 업데이트
- [ ] Python 가상환경 생성
- [ ] PyTorch (CUDA) 설치
- [ ] EasyOCR 설치
- [ ] GPU 동작 확인 (`nvidia-smi`)

### 벤치마크 실행

- [ ] aiTest 폴더 업로드
- [ ] 번호판 OCR 벤치마크 실행
- [ ] 볼트 품질검사 벤치마크 실행
- [ ] 결과 파일 다운로드

### 정리

- [ ] 결과 파일 benchmark 폴더에 저장
- [ ] **Droplet 삭제** (비용 절감)
- [ ] 비교 보고서 업데이트

---

## 12. 문제 해결

### 12.1 CUDA 오류

```bash
# PyTorch CUDA 버전 확인
python -c "import torch; print(torch.version.cuda)"

# 버전 불일치 시 재설치
pip uninstall torch torchvision torchaudio
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

### 12.2 메모리 부족

```bash
# GPU 메모리 확인
nvidia-smi

# 배치 크기 줄이기 (benchmark.py 수정)
BATCH_SIZE = 8  # 16 → 8
```

### 12.3 SSH 연결 끊김

```bash
# 백그라운드 실행
nohup python plate_ocr_benchmark.py > output.log 2>&1 &

# 또는 tmux 사용
tmux new -s benchmark
python plate_ocr_benchmark.py
# Ctrl+B, D로 분리
```

---

## 13. 참고 파일

| 파일 | 설명 |
|:-----|:-----|
| `test/plate_ocr_benchmark.py` | 번호판 OCR 벤치마크 스크립트 |
| `boltTest/src/benchmark.py` | 볼트 품질검사 벤치마크 스크립트 |
| `benchmark/README.md` | 벤치마크 결과 종합 가이드 |
| `작업보고서/digitalocean_gpu_plate_ocr_guide.md` | DigitalOcean GPU 상세 가이드 |

---

*작성일: 2026-01-24*
*DigitalOcean GPU Droplets 벤치마크 가이드*
