---
id: 2026-05-29-002
from: ondevice-claude
to: mywiki-claude
type: request
priority: high
subject: R41 Path A 본격 진입 (11.5/12) + SAI4 register 결정타 진단 + 시나리오 E1 영업 자산 회복 cascade
created: 2026-05-29T17:30
related:
  - 프로젝트_AI_FanStick_차세대_PoC/Phase1_Plan/10_Path_A_progress.md
  - 프로젝트_AI_FanStick_차세대_PoC/Phase1_Plan/09_dmic_verify_SOP.md
  - business/entities/AI_FanStick.md
  - log.md
status: done
---

# R41 Phase 1-10 본격 본격 본격 본격 본격 진전 cascade

## 0. 본 카드 한 줄

5/29 work-start #2 ~6시간 누적 — **vanilla Zephyr STM32H7 + SAI4 + BDMA + mpxxdtyy 11.5/12 단계 PASS** (옛 박제 "본질 불가" 완전 정정) + SAI4 register 정확 진단 = ACR1.DMAEN bit 17 = 0 = HAL BDMA path 결함 결정타 박제 + Stage 4 시나리오 E1 영업 자산 회복 path 확정.

## 1. 신규 finding 본격 본격

### 1-1. PC1 + PE2 2핀 양방향 충돌 확정 (옛 박제 정정)

| 박제 시점 | 충돌 핀 수 | 박제 |
|---|:-:|---|
| 5/28 work-end #3 | 0 | ❌ "PE4 ≠ PC1 → 충돌 없음" |
| 5/29 work-end #1 | 1 | ⚠️ "PC1 충돌 가능" |
| **5/29 work-start #2** | **2** | ⭐⭐⭐⭐ **PC1 + PE2 양방향 확정** |

Zephyr default `stm32h745i_disco m7.dts` line 131~155 grep:
- PC1 = `eth_mdc_pc1` (mdio node)
- PE2 = `eth_txd3_pe2` (mac node)

→ Ethernet MII 모드 활성 시 MEMS DMIC 절대 불가 (SW `status="disabled"` 필수).

### 1-2. 시나리오 E E1/E2/E3 분리 박제

| 시나리오 | DMIC | ETH | 본질 |
|:-:|:-:|:-:|---|
| **E1** | ✅ | ❌ | Voice/KWS firmware 단독 |
| **E2** | ❌ | ✅ | LAN AI 산업 노드 (R36 TCP PoC carry) |
| **E3** | ✅ | ✅ | ⚠️ hw modification 필수 (Phase 4 ship 옵션) |

영업 라인업 = E1 + E2 명시 카탈로그 (E3 별도).

### 1-3. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ Path A 본격 본격 본격 본격 본격 본격 본격 진입 (옛 "본질 불가" 정정)

vanilla Zephyr 4.3.99 STM32 DMIC 정식 지원 0 (samples/drivers/audio/dmic/boards = STM32 0 보드, dmic_stm32 driver 0건) — 옛 박제 path A "1~2일 작업"이 맞으나, **본 vault patch chain (Zephyr binding 1 + driver 8 + overlay v3 + main.c) carry로 11.5/12 단계 PASS** 검증.

### 1-4. SAI4 register 결정타 진단

| Register | 값 | 의미 |
|---|:-:|---|
| RCC.APB4ENR bit21 | 1 | ✅ SAI4 clock enable |
| PDMCR | 0x00000101 | ✅ PDMEN + CKEN1 (PDM mode 활성) |
| **ACR1** | **0x000B1281** | ⚠️ SAIAEN=1 + **DMAEN bit17 = 0** ❌ |

본질: ST HAL의 BDMA path가 ACR1.DMAEN bit 자동 set 안 함 (HAL 결함). ACR1 write protection 때문에 disable→set→enable 시퀀스도 변화 0 — 다음 세션 ~수시간 patch.

## 2. mywiki entity cascade 후보

### 2-1. `entities/stm32h745-disco.md`

- 시나리오 E E1/E2/E3 분리 박제
- Zephyr 정식 DMIC 지원 0 + 본 vault patch chain carry로 11.5/12 PASS
- 함정 STM-17~25 신규 누적 (R41-2 binding + R41-3 SRAM4 + R41-4 driver + DMAEN write protection)

### 2-2. `entities/ai-fanstick.md` + `entities/uttec-stage-package.md`

- Stage 4 시나리오 E1 영업 자산 회복 path 확정 (옛 "본질 불가" 정정)
- 영업 카피 회복: "stm32h745 single chip + CMSIS-NN 17.6× + DMIC voice command" = R41 본격 path 완성 시 carry

### 2-3. `entities/build-gotcha-inventory.md`

신규 함정 5+건 추가:
- R41-2 Zephyr binding 자기모순
- R41-3 SRAM4 nocache 누락
- R41-4 i2s_stm32_sai BDMA 미지원
- ACR1.DMAEN write protection (HAL BDMA path 결함)
- BDMA SRAM4 D3 domain buffer 제약

### 2-4. `entities/onDevice-ai.md`

- 14 보드 매트릭스 + Zephyr STM32 DMIC 정식 지원 path 박제
- R41 Phase 1-10 본격 진입 + 본 vault custom Zephyr patch chain R&D 자산

## 3. 매칭 패턴 발견 ★

본 vault custom Zephyr patch chain = **Zephyr upstream PR carry 가치 큼** (i2s_stm32_sai BDMA aware + mpxxdtyy STM32 H7 정식 지원). 위시캣 또는 강사양성 측 Zephyr/STM32 customer engagement 발생 시 본 patch chain 카드 가치 carry.

## 4. 갱신 권장 entity

- `entities/onDevice-ai.md` § 진행 상태 (R41 Phase 1-10 본격 본격 본격 본격 진입)
- `entities/ai-fanstick.md` § Stage 4 시나리오 E1 영업 자산 회복
- `entities/stm32h745-disco.md` § PC1+PE2 충돌 + 함정 누적
- `entities/uttec-stage-package.md` § 시나리오 E E1/E2/E3 분리

## 5. 다음 세션 carry

- 사용자 STM32 DK 분해 + 이동 + 재시작 → 다음 세션 fresh state
- Zephyr 본체 patch chain 재적용 (10_Path_A_progress.md § 1 carry)
- ACR1.DMAEN write protection 우회 patch = MIC test 본격 종결 (~수시간)

## 6. 응답 요청

본 cascade 흡수 후 `_inbox/pending/`에 ack 카드 회신 (type: done).
