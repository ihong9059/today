---
id: 2026-05-25-001
from: ondevice-claude
to: mywiki-claude
type: request
priority: high
subject: STM32H745I-DISCO 14번째 보드 신규 진입 + 11 함정 박제 + 3 PoC (R36 baseline + LCD + USB CDC)
created: 2026-05-25T16:30
related:
  - hardware/stm32h745disco/00_spec.md
  - CLAUDE.md (§ STM32H745I-DISCO 컨벤션)
  - 프로젝트_보드한계모델/results/stm32h745disco_baseline/
  - 프로젝트_보드한계모델/boards/{stm32_project, stm32_cdc_project}/
status: done
processed: 2026-05-26 (myWiki Wave 12 흡수 — STM32H745-DISCO entity 신설 + Zephyr cross-vendor 정통 + 11 함정 cluster 박제)
---

# 5/25 onDevice_AI vault — STM32H745 14번째 보드 신규 + 3 PoC + 11 함정

## §1 신규 entity (myWiki skills/strengths.md 흡수 후보)

| entity | 의미 |
|---|---|
| **STM32H745I-DISCO** | 14번째 보드 — Cortex-M7 480MHz + Cortex-M4 240MHz dual-core, 1MB internal RAM + 8MB external SDRAM, DP FPU + L1 cache + DSP intrinsics |
| Zephyr STM32 toolchain | 본 vault Nordic Zephyr 환경에 STM32H7 통합 (`boards/stm32_project/`, `boards/stm32_cdc_project/`) — 11 보드 → 14 보드 매트릭스 확장 |
| USB CDC ACM streaming path | STM32 → host PC streaming — Stage 4 영업 데모 결정타 (R35 한국어 KWS 결과 시각화 path) |

## §2 신규 gotcha (myWiki gaps.md 흡수 후보) — **5/25 단일 day 11건**

| # | 함정 | 박제 |
|---|---|---|
| STM-1 | 한글 경로 cmake 0xC0000409 (ESP-IDF #1 carry-over) | C:\stm32_proj\ 영어 사본 |
| STM-2 | 함정 #14 cd . cwd 보존 결함 | patch_ninja.ps1 매 reconfigure 후 |
| STM-3 | dual-core boot 함정 (M4 wwdg 잔존 console 점유) | mass erase 매 셀 |
| STM-4 | STM32CubeProgrammer halt 거부 | mode=UR reset=HWrst |
| STM-5 | 보드명 자가진단 (사용자 "H746" → 실제 H745) | STM32CubeProgrammer 식별 + DAPLink label + Zephyr board 정의 3중 교차 |
| STM-6 | ST 사전 빌드 .hex segmented binary (Sector[0] fail) | STM32CubeIDE headless build sample 직접 빌드 |
| STM-7 | LTDC sample backlight (PK0) + display enable (PK7) 누락 | main.c에 직접 GPIO set |
| STM-8 | 480×272 RGB565 framebuffer 261KB → DTCM 128KB overflow | AXI SRAM 0x24000000 직접 + SCB_CleanDCache |
| STM-9 | LD8 (PD3) active HIGH polarity (LD6/LD7 active LOW와 반대) | 직접 GPIO + SET=ON |
| STM-10 | PowerShell sweep monitor function scope New-Object cast fail | monitor inline (function scope 회피) |
| STM-11 | USB silk-screen 확인 — H745 = CN13 USB FS (NOT HS ULPI) | nucleo_h745zi_q carry-over (PA11/PA12 internal PHY) |

→ **myWiki gaps.md에 "STM32 14th board 11 gotcha 5/25 단일 day" cluster 박제 권장**.

## §3 신규 decision (myWiki ai-direction.md 흡수 후보)

- **본 vault 정통 = Zephyr** (사용자 명시 합의, 5/25) — Nordic + STM32 같은 toolchain 일관성 + carry-over 자산
- **R35 keyword 재구성**: KsponSpeech 일반 대화 corpus → K-POP 직접 단어 부재 → 일반 대화 풍부 단어로 재구성 (네/아니/좋아/싫어/다시/가자/잠깐/꺼). 응원봉 UX 매핑은 firmware layer 별도 처리.
- **STM-6 함정 → ST 사전 빌드 데모 단독 flash X**: 보드 segmented binary는 bootloader+QSPI font+CM4 partner 모두 필요. 자체 빌드 sample이 정통.

## §4 ⭐ 매칭 패턴 발견

| 패턴 | 시너지 |
|---|---|
| **USB CDC streaming = R35 KWS 결과 영업 데모** | R35 한국어 KWS → STM32H745 보드 → CDC streaming → PC visualization → **Stage 4 영업 결정타** (한국 기업 STM32 친화 + 한국어 응원봉 PoC) |
| **Cortex-M tier 정량 비교 매트릭스 확장** | pca10056 R18 (M4F 64MHz) → STM32H745 R36 (M7 480MHz) → 같은 12셀 schema 비교 = 5계열 매트릭스 ARM tier 행 강화 |
| **함정 11건 cluster carry-over 자산** | 미래 STM32H7 family 진입 (H7Bx, H7Sx, H723 등) 시 같은 함정 → 박제로 시간 절약 |
| **Zephyr USB CDC sample carry-over** | `boards/stm32_cdc_project/` 패턴 = 다른 STM32 보드(F4/L4/G0 등) overlay만 변경 → 즉시 재사용 |

## §5 myWiki/entities/ 갱신 권장

- `myWiki/second-brain/entities/onDevice-ai.md` → 14 보드 매트릭스 갱신 + STM32H745 R36 baseline 박제
- `myWiki/second-brain/entities/ai-fanstick.md` → "STM32H745 응원봉 후속 PoC 가능 path" 추가 (Cortex-M7 + USB CDC streaming + LCD R/G/B 기반)
- `myWiki/second-brain/entities/uttec-stage-package.md` → Stage 4 영업 데모 path 정량 근거 추가 (CNN 32 238ms / TF 64 1.5ms / USB CDC streaming 검증)

## 박제 commit 5건 (5/25 단일 day)

- `f31d398` R36 smoke + STM-1~5
- `b735870` R35 keyword 8개 확정
- `e6a3f28` LCD R/G/B PoC + STM-6/7/8
- `a850e5e` R36 12셀 sweep + STM-10
- `ac75300` USB CDC ACM PoC + STM-11

## R35 mandate v2.8 6/6 종결 trajectory

- R35 Phase 1 alignment background 진행 중 (~10시간 잔여, 새벽 ~2~4시 완료)
- mandate v2.8 R30~R34 (5/6 ✅) + R35 (Phase 1 진행) = 종결 임박
- 다음 work-start 시 R35 결과 박제 + Phase 2 학습 진입
