---
title: pc — spec (Windows + Ubuntu 듀얼)
type: hardware-spec
created: 2026-05-15
updated: 2026-05-15 (실제 사양 측정)
tier: T4
status: confirmed
machines: 2 (Windows lenovo / Ubuntu uttec-MacBookPro)
---

# pc — T4 학습·증류·시뮬레이션 환경

## 한 줄 위치

본 vault에서 **학습·증류·시뮬레이션 환경**. 직접 영업 대상이 아니라 **T1을 위한 도구**. microGPT 학습, 모델 양자화, 보드 추론 시뮬레이션이 여기서 일어남. 2대 운영 — **Windows = myWiki/일상, Ubuntu = 개발 전용** (memory `project_dual_pc.md`).

## 사양 (실측 2026-05-15)

### Machine A — Windows PC (this lenovo)

| 항목 | 값 |
|---|---|
| 모델 | Lenovo 21E7S31000 (ThinkPad) |
| OS | Windows 11 Pro 26200 |
| CPU | **Intel Core i5-1235U** (12th gen, Alder Lake-U) |
| 코어 | 10 physical (2P + 8E) / 12 logical, P-core max 4.4GHz |
| **RAM** | **15.7 GB** (DDR4/DDR5 LPDDR5 추정) |
| GPU | Intel Iris Xe (integrated, 96 EU) — AI 추론에 미흡 |
| NPU | ❌ (i5-1235U는 NPU 미탑재, Meteor Lake 이후만) |
| 역할 | **myWiki / 일상 / 본 vault 작성 거점** |

### Machine B — Ubuntu PC (`ssh ubuntu`)

| 항목 | 값 |
|---|---|
| 모델 | **MacBookPro11,4** (2015 15" Mid, Mac → Ubuntu 컨버전 2026-05-14) |
| OS | **Ubuntu 22.04.5 LTS** (jammy, 6.8 kernel) |
| Hostname | uttec-MacBookPro |
| CPU | **Intel Core i7-4770HQ** (4th gen Haswell, Crystalwell) |
| 코어 | 4 physical / 8 logical (HT), 2.2~3.4GHz |
| **RAM** | **16 GB** (DDR3L 1600) |
| GPU | **Intel Iris Pro 5200** (Crystalwell, integrated, no AMD M370X on this variant) |
| NPU | ❌ |
| Tailscale | 100.90.158.36 |
| Python | 3.10.12 |
| Claude Code | v2.1.141 (`/usr/bin/claude`) |
| 역할 | **개발 전용 / 빌드 / SSH 접근** |

### 듀얼 PC 비교

| 측면 | Windows (A) | Ubuntu (B) |
|---|---|---|
| 세대 | 2022 (12세대) | 2015 (4세대) |
| 멀티스레드 성능 | 우세 (P+E 12T) | 열위 (8T) |
| 싱글스레드 성능 | 우세 (P-core 4.4GHz) | 보통 (3.4GHz boost) |
| RAM | 동등 (16GB) | 동등 (16GB) |
| AI 추론 GPU | Iris Xe 96 EU | Iris Pro 5200 (구식) |
| 개발 환경 | 일반 (Windows 한계) | **우세** (Linux 표준, ESP-IDF·toolchain 매끄러움) |

→ **결론**: AI 학습·추론 raw 성능은 Windows(A) 우위, 개발·빌드 환경은 Ubuntu(B) 우위. 둘 다 GPU 가속 약함 — 큰 모델 학습은 외부 (Colab/Vast/Lambda Cloud) 위탁이 현실적.

## 본 vault에서의 역할

### 1. 학습 환경 — 한계 명확
- **소형 모델 OK**: microGPT 4K~154K params → CPU만으로 학습 가능 (5/8 microGPT 4K 학습 완료, Loss 3.37→2.65)
- **중형 모델 borderline**: GPT-2 small (124M) 미세조정 → CPU로 가능하나 매우 느림
- **대형 모델 불가**: Llama 3 8B 학습·증류는 외부 GPU 필요

### 2. 증류 환경
- Teacher (대형 모델) 추론은 GPU 없어도 가능 (Q4 양자화 + CPU 추론, llama.cpp)
- Student (microGPT 류) 학습 자체는 CPU로 충분
- Knowledge Distillation 파이프라인: PC에서 가능

### 3. 시뮬레이션 환경 — 핵심 가치
- 보드 입수 전 **메모리·연산 시뮬레이션** ✅
- 양자화 정확도 손실 (FP32→INT8→INT4) 측정 ✅
- ESP32 QEMU 시뮬 (Ubuntu에서 권장)

### 4. 빌드 환경
- **Ubuntu = 권장**: ESP-IDF, nRF Connect SDK, arm-none-eabi-gcc 모두 표준
- **Windows = 가능**: ESP-IDF Windows installer 있으나 경로/권한 문제 종종 발생
- 사용자 본인 결정: Ubuntu(ssh)에서 빌드, USB는 Windows에서 보드 flash가 분업 적합

## AI 도구 (둘 다 설치 가능)

| 도구 | 용도 | A/B 권장 |
|---|---|---|
| PyTorch | 학습 | B (Ubuntu 표준) |
| llama.cpp | LLM 양자화·추론 (GGUF) | 둘 다 OK |
| ONNX Runtime | 모델 변환 hub | 둘 다 OK |
| TFLite Converter | TFLM용 export | 둘 다 OK |
| ESP-IDF | ESP32 펌웨어 빌드 | **B 권장** |
| nRF Connect SDK | nRF52 펌웨어 빌드 | **B 권장** |
| Hugging Face Transformers | 모델 다운로드·증류 | B (Ubuntu 표준) |

## 본 vault 관련성

| 질문 | 답 |
|---|---|
| 정의 Section 6의 어느 축? | 도구 — 모든 축의 사전 시뮬레이션 |
| 왜 추적하는가? | T1 보드 검증의 **선행 분석 환경**. 보드만 만지면 비효율. |
| 영업 가치 | 직접 영업 대상 아님 |
| 우선순위 | 도구 — 항상 사용 |

## 제약·함정

- **GPU 약함**: 둘 다 정식 NPU·dGPU 없음. 큰 모델 학습 시 외부 클라우드 필수.
- **MacBookPro11,4는 2015년 하드웨어**: i7-4770HQ는 11년 된 칩. 새 PyTorch·CUDA 호환 없음 (CPU only). 발열·전력도 신경 써야 함.
- **PC 결과 ≠ 보드 결과**: PC에서 FP32 동작해도 보드 INT8로 떨어뜨리면 정확도·메모리 모두 달라짐. PC는 **상한선** 추정용.
- **toolchain 환경 차이**: Windows·Ubuntu 빌드 결과 일부 차이 — 보드 flash 전 동일 환경 빌드 권장 (Ubuntu).

## 다음 검증·활용

- [x] microGPT 4K PC 학습 (5/8 완료, Windows·Ubuntu 어디서 했는지 재확인 필요)
- [ ] microGPT 증류 (GPT-2 124M → 4K~154K student) 시도 — Ubuntu에서
- [ ] 양자화 정확도 손실 곡선 (FP32 → INT8 → INT4) PC 실측
- [ ] ESP32 QEMU 시뮬 환경 구축 (Ubuntu에서)
- [ ] llama.cpp Q4로 7B 모델 PC 추론 — 속도·메모리 측정 (Apple Intelligence 등 비교용)

## 참조

- 기존 PC 검증 (microGPT): `../../microGPT/01_검증절차.md`
- PC 인프라 memory: `~/.claude/projects/C--todo-today/memory/project_dual_pc.md`
- Ubuntu PC memory: `~/.claude/projects/C--todo-today/memory/reference_uttec_ubuntu_mac.md`
