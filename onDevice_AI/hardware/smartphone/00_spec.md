---
title: smartphone (Samsung Galaxy A51 5G) — spec
type: hardware-spec
created: 2026-05-15
updated: 2026-05-15 (USB 연결 디바이스 검출)
board_id: SM-A516 (Galaxy A51 5G)
chip: Samsung Exynos 980
tier: T3- (mid-range, 2020)
status: confirmed
---

# smartphone — Samsung Galaxy A51 5G

## 한 줄 위치

본 vault의 **실측 가능 T3 디바이스**. 2024 플래그십이 아닌 **2020 미드레인지**라는 점이 오히려 가치 — "현재 시장에 깔린 보통 폰에서 On-Device AI가 어디까지 되는가" 의 현실적 검증.

## 사양 (실측 2026-05-15, USB 검출)

| 항목 | 값 |
|---|---|
| 모델명 | **Samsung Galaxy A51 5G (SM-A516)** |
| 출시 | 2020 4월 |
| 폼팩터 | 6.5" FHD+ Super AMOLED (1080×2400, 405 PPI) |
| **SoC** | **Samsung Exynos 980** (8nm) |
| CPU | 2× Cortex-A77 @ 2.2GHz + 6× Cortex-A55 @ 1.8GHz (octa-core) |
| GPU | Mali-G76 MP5 |
| **NPU** | Samsung 2세대 NPU (~2.1 TOPS 추정) |
| **RAM** | **6 GB** (한국 출시 기본) |
| 저장 | 128GB (UFS 2.1) + microSD |
| 모뎀 | **5G NSA 통합** (Exynos 980 첫 통합 5G 모뎀 칩) |
| 배터리 | 4500mAh, 15W 충전 |
| OS | Android 10 출시 → 13까지 업데이트 (One UI 5) |
| 출시가 | ₩57만원 (2020) / 현재 중고 ~₩15만 |

## 입수

- **사용자 보유: ✅** (USB 연결 상태 검출, 2026-05-15)
- 검출 방식: Windows PnP — "Galaxy A51 5G" + "SAMSUNG Mobile USB Composite Device"

## 개발 환경

| 항목 | 도구 |
|---|---|
| 플랫폼 | Android (Samsung One UI) |
| 빌드 | **Android Studio** + Gradle |
| 추론 SDK | **TFLite** / ML Kit / **NNAPI** / MediaPipe |
| LLM 구동 | **MLC LLM** / **llama.cpp Android port** / Termux + llama.cpp |
| 양자화 | GGUF (llama.cpp), TFLite quantization |
| USB 디버그 | **adb 필요** (현재 Windows 미설치 — 향후 설치) |

## AI 관련 특이점 (Galaxy A51 5G 한정)

- **NPU 2.1 TOPS ≪ 2024 플래그십 30~80 TOPS** — 약 15~40배 차이. 차세대 응용은 어려움.
- **RAM 6GB는 LLM 추론에 빠듯**: OS·One UI·앱이 2~3GB 점유 → 가용 3~4GB. Llama 3 8B Q4 (4GB)는 불가, **1~3B Q4 (600MB~2GB)** 는 가능.
- **Exynos 980 첫 5G 통합 칩**: 본 칩의 핵심 가치는 AI보다 5G. AI는 부수 기능.
- **One UI ML 통합 제한적**: Apple Intelligence·Pixel AI 같은 시스템 통합은 거의 없음. 외부 앱으로만 활용.

## 본 vault 관련성

| 질문 | 답 |
|---|---|
| 정의 Section 6의 어느 축? | 응용 축 Q9 (T3 응용 발굴), 영업 축 Q13 (시장 현황) |
| 왜 추적하는가? | (1) **현실 검증** — 플래그십 아닌 보통 폰의 한계 측정 (2) **T1 다운스트림 발굴** — 폰에서 작동하는 응용 중 T1으로 가져올 후보 |
| 영업 가치 | UTTEC 직접 시장 아님. 영업 setup: **"플래그십 폰에서 8B 모델, 미드레인지 폰에서 1~3B, 그리고 우리는 8달러 칩에서 KB급 응용"** 라는 스펙트럼 제시. |
| 우선순위 | 참조용 + 가벼운 실증 1~2건 (예: llama.cpp로 1B 모델 구동 시도) |

## 가능 응용 (Galaxy A51 5G 현실 기준)

| 응용 | 가능성 | 비고 |
|---|:-:|---|
| TTS / STT 작은 모델 | ✅ | TFLite 기본 |
| KWS (Keyword Spotting) | ✅ | 가벼움 |
| 이미지 분류 (MobileNet) | ✅ | NPU 활용 |
| 객체 탐지 (YOLO-nano) | ⚙️ | 느림 (NPU 약함) |
| LLM 1B Q4 (TinyLlama 1.1B) | ⚙️ | 가능 but RAM 빠듯, 5~10 tok/s 추정 |
| LLM 3B Q4 (Phi-3 mini) | ❌ | RAM 부족 |
| LLM 7B+ | ❌ | 절대 불가 |
| 이미지 생성 (SD) | ❌ | NPU/RAM 모두 부족 |
| 실시간 통역 (작은 모델) | ⚙️ | 가벼운 task 선택 시 가능 |

→ **현실적 demo 후보**: TinyLlama 1.1B Q4 구동, MobileNet 이미지 분류, MediaPipe 손동작 인식.

## 제약·함정

- **2020 디바이스 한계**: NPU·RAM 모두 현 시점 minimum. 새 모델·새 SDK 호환성 떨어질 수 있음.
- **OS 업데이트 종료 임박**: Samsung 4년 정책 → Android 13이 마지막일 가능성. 보안 패치만 유지.
- **adb 미설치 (Windows)**: 향후 USB 연결 활용 시 Android Platform Tools 설치 필요.
- **모델 시장 진입 불가**: Samsung·Apple 영역. UTTEC은 응용 발굴에만 활용.

## 다음 검증·추적

- [ ] adb 설치 (Windows Android Platform Tools)
- [ ] **실증 1**: MLC LLM 또는 llama.cpp Android로 TinyLlama 1.1B Q4 구동 → 속도·발열·배터리 측정
- [ ] **실증 2**: TFLite MobileNet 이미지 분류 latency 측정
- [ ] 04_applications.md — Galaxy A51 5G 기준 가능 응용 카탈로그 + T1 다운스트림 후보
- [ ] T3 응용 중 T1 다운스트림 가능 후보 5건 식별

## 참조

- Exynos 980 specs: https://semiconductor.samsung.com/processor/mobile-processor/exynos-980/
- Galaxy A51 5G 공식: https://www.samsung.com/sec/smartphones/galaxy-a/
- MLC LLM Android: https://mlc.ai/mlc-llm/
- llama.cpp Android: https://github.com/ggerganov/llama.cpp (CMake Android NDK)
- TFLite Android: https://www.tensorflow.org/lite/android
- 이전 대화 (스마트폰 응용 카탈로그 초안): 2026-05-15 대화 (정의 등록 후 후속)
