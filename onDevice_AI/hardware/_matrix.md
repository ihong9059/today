---
title: hardware × application 매트릭스
type: cross-cutting-matrix
created: 2026-05-15
purpose: 어느 보드에서 어느 응용이 실용적인지 한 장으로. 가설·실측·결정의 단일 출처.
update_policy: 새 실측 결과가 나올 때마다 셀 갱신 (이력은 git log로 추적)
---

# Hardware × Application 매트릭스

> **본 vault의 cross-cutting 단일 출처.** 보드별 능력(hardware/)과 응용별 요구(applications/)가 교차하는 셀에 가능성·실측을 기록.

## 셀 표기 규칙

| 기호 | 의미 |
|:-:|---|
| ✅ | 실측 완료 — 실용적 (정확도·속도 모두 합격) |
| ⚙️ | 실측 완료 — 동작은 하나 제약 있음 (저정확도·저속·메모리 빠듯) |
| ⬜ | 미실측, 분석 상 가능 |
| ❓ | 미실측, 분석 필요 |
| ❌ | 불가 (메모리·연산·구조적 한계로 명백히 안 됨) |
| — | 의미 없음 (예: pc에서 KWS는 굳이 검증할 이유 없음) |

## 매트릭스 (현재 상태: 2026-05-15)

### 작은 응용 (T1 범위)

| 응용 | pca10040<br>(64KB) | pca10056<br>(256KB) | esp32wroom<br>(520KB) | esp32c6<br>(512KB) | esp32s3<br>(512KB+PSRAM) | smartphone | pc |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **KWS** (Keyword Spotting, 음성 명령) | ❓ | ⬜ | ⬜ | ⬜ | ⬜ | — | — |
| **microGPT 4K params (INT8 4KB)** | ❓ | ⬜ | ⬜ | ⬜ | ✅ (분석) | — | ✅ |
| **microGPT 154K params (Korean-Small)** | ❌ | ❌ | ⬜ | ⬜ | ⬜ (PSRAM) | — | ✅ |
| **AI FanStick 응원 패턴 SLM (4K~10K)** | ❌ | ⬜ | ⬜ | ⬜ | ⬜ | — | — |
| **센서 분류** (가속도·온도·진동) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | — | ✅ |
| **이상탐지** (Anomaly Detection, AE 5~50KB) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | — | — |
| **제스처 인식** (IMU 기반) | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | — | — |

### 중간 응용 (T1+ ~ T3 범위)

| 응용 | esp32s3<br>(+PSRAM) | smartphone | pc |
|---|:-:|:-:|:-:|
| **이미지 분류** (MobileNet 류 1~5MB) | ⬜ | ✅ | ✅ |
| **객체 탐지** (YOLO-nano 1~10MB) | ❓ | ✅ | ✅ |
| **음성→텍스트** (Whisper tiny 40MB) | ❌ | ⬜ | ✅ |
| **TTS** (작은 모델 10~50MB) | ❓ | ⬜ | ✅ |

### 큰 응용 (T3~T4 범위)

| 응용 | smartphone | pc |
|---|:-:|:-:|
| **LLM 1~3B** (Q4 600MB~2GB) | ⬜ | ✅ |
| **LLM 7~8B** (Q4 4GB) | ⬜ | ✅ |
| **LLM 70B** (Q4 35GB) | ❌ | ⬜ |
| **이미지 생성** (SD-1.5 등) | ⬜ | ✅ |
| **멀티모달** (CLIP·SigLIP) | ⬜ | ✅ |

## 채워나가는 우선순위

> 정의 Section 7 (우선순위) 와 일치.

1. **esp32s3 행 우선** — microGPT·AI FanStick 둘 다 메인 타겟
2. **microGPT 열 우선** — 보드별 model_limits 측정 (PC ✅ → S3 ⬜ → C6 ⬜ → WROOM ⬜ → 56 ⬜ → 40 ❌예상)
3. **AI FanStick 열** — 학습 시나리오 4 경로 검토 완료(✅), 칩별 가능성 확정 필요

## 정의에서 본 매트릭스의 의미

| 셀의 분포 | 정의에서의 답 |
|---|---|
| 전 보드 ✅ | 정의 Section 4의 **Cost 가치 ◎** — 가장 저렴한 보드에 배포 가능 |
| esp32s3 이상만 ✅ | AI 가속이 결정적 — Section 3.1 NPU 축 |
| smartphone 이상만 ✅ | T3 티어 — UTTEC 영업 범위 밖 (참조용) |
| 전 보드 ❌ | 알고리즘·증류로 풀거나, 응용을 작게 쪼개야 함 |

## 매트릭스 갱신 로그

| 일자 | 셀 | 변경 | 출처 |
|---|---|---|---|
| 2026-05-15 | (전체 보드) | 보유 ✅ 7/7 확인, 즉시 실측 가능 상태 | USB·SSH 검출 |
| 2026-05-15 | smartphone 행 | 가정 (플래그십 30~80 TOPS) → 실제 (Galaxy A51 5G 2.1 TOPS) 갱신, LLM 1B borderline·3B+ 불가 | USB 검출 |
| 2026-05-15 | (전체) | 초안 골격 작성 | 폴더 운영 결정 |
| 2026-05-08 | esp32s3 × microGPT 4K | ✅ (분석) | `microGPT/01_검증절차.md` |
| 2026-05-08 | esp32s3+PSRAM × microGPT 154K | ⬜ → 분석 완료 | `통합검증/01_SRAM_파라미터_매트릭스.md` |

## 참조

- 보드 spec: 각 `hardware/<board>/00_spec.md`
- 응용 정의: `applications/<app>/README.md` (작성 예정)
- 정의 (왜 이 매트릭스가 필요한가): `00_정의_OnDeviceAI.md` Section 5, 6, 7
- 검증 매트릭스 (기존): `통합검증/01_SRAM_파라미터_매트릭스.md` (microGPT 특화, 추후 흡수 검토)
