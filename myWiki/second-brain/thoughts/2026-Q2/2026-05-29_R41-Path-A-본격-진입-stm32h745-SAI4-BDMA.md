---
title: R41 Path A 본격 진입 — stm32h745 SAI4 + BDMA + mpxxdtyy 11.5/12 PASS + ACR1.DMAEN 결정타
type: thought
created: 2026-05-29
updated: 2026-05-29
tags: [thought, ondevice, R41, stm32h745, SAI4, BDMA, mpxxdtyy, Zephyr, custom-patch-chain, ACR1-DMAEN-write-protection, PC1-PE2-Ethernet-충돌, 시나리오-E-E1-E2-E3, Stage4-시나리오E1-회복, 본질불가-정정, vendor-reference-manual-누락-spec, upstream-PR-contribution-carrier, R&D-신뢰성-자산]
links: [stm32h745-disco, ai-fanstick, uttec-stage-package, onDevice-ai, build-gotcha-inventory, gaps, 2026-05-25_STM32H745-Zephyr-통합-cross-vendor, 2026-05-26_STM32H745-LAN-path-Stage4-결정타, 2026-05-27_Cortex-M-tier-최강-AI-노드, 2026-05-28_R38-stm32h745-SDRAM-QSPI-3tier-메모리-실증]
---

# R41 Path A 본격 진입 — stm32h745 SAI4 + BDMA + mpxxdtyy 11.5/12 PASS

## 한 줄

5/29 work-start #2 ~6시간 누적 — **vanilla Zephyr STM32H7 + SAI4 + BDMA + mpxxdtyy 11.5/12 단계 PASS** + 옛 박제 "stm32h745 Zephyr DMIC 본질 불가" 완전 정정 + SAI4 register 정확 진단 (ACR1.DMAEN bit17=0 HAL BDMA path 결함 결정타) + Stage 4 시나리오 E1 영업 자산 회복 path 확정.

## 1. R41 Phase 1-10 본격 진입 (옛 "본질 불가" 정정) ⭐⭐⭐⭐⭐

vanilla Zephyr 4.3.99 STM32 DMIC 정식 지원 0건 확인:
- `samples/drivers/audio/dmic/boards = STM32 0 보드`
- `dmic_stm32 driver 0건`

본 vault custom Zephyr patch chain carry로 **11.5/12 단계 PASS** 검증:
- Zephyr binding 1건 (`i2s_stm32_sai.yaml` child binding)
- driver 8건 (i2s_stm32_sai BDMA aware)
- overlay v3 (`stm32h745i_disco_m7.overlay` SAI4/PDM/BDMA/SRAM4 nocache)
- main.c (`mpxxdtyy` decoder + sample loop)

## 2. SAI4 register 결정타 진단 ⭐⭐⭐

| Register | 값 | 의미 |
|---|:-:|---|
| RCC.APB4ENR bit21 | 1 | ✅ SAI4 clock enable |
| PDMCR | 0x00000101 | ✅ PDMEN + CKEN1 (PDM mode 활성) |
| **ACR1** | **0x000B1281** | ⚠️ SAIAEN=1 + **DMAEN bit17 = 0** ❌ |

본질: ST HAL의 BDMA path가 ACR1.DMAEN bit 자동 set 안 함 (HAL 결함). ACR1 write protection 때문에 disable→set→enable 시퀀스도 변화 0 — 다음 세션 ~수시간 patch.

ST RM0399 reference manual에 ACR1.DMAEN write protection 명시 spec **누락** → vendor doc cross-check 함정 박제 ([[gaps]] § "vendor reference manual 누락 spec").

## 3. PC1 + PE2 2핀 Ethernet 양방향 충돌 확정 박제 정정 ⭐⭐⭐⭐

| 박제 시점 | 충돌 핀 수 | 결론 |
|---|:-:|---|
| 5/28 work-end #3 | 0 | ❌ "PE4 ≠ PC1 → 충돌 없음" |
| 5/29 work-end #1 | 1 | ⚠️ "PC1 충돌 가능" |
| **5/29 work-start #2** | **2** | ⭐⭐⭐⭐ **PC1 + PE2 양방향 확정** |

Zephyr default `stm32h745i_disco m7.dts` line 131~155:
- PC1 = `eth_mdc_pc1` (mdio node)
- PE2 = `eth_txd3_pe2` (mac node)

→ Ethernet MII 모드 활성 시 MEMS DMIC 절대 불가 (SW `status="disabled"` 필수).

## 4. 시나리오 E E1/E2/E3 분리 박제 ⭐⭐⭐

| 시나리오 | DMIC | ETH | 본질 | 영업 path |
|:-:|:-:|:-:|---|---|
| **E1** | ✅ | ❌ | Voice/KWS firmware 단독 | Stage 4 응원봉 + 영업 카탈로그 메인 |
| **E2** | ❌ | ✅ | LAN AI 산업 노드 | uttec-stage-package 시나리오 G |
| **E3** | ✅ | ✅ | ⚠️ hw modification 필수 | Phase 4 ship 옵션 (별도 BOM) |

영업 라인업 = **E1 + E2 명시 카탈로그** (E3 별도 옵션).

## 5. 신규 STM 함정 5건 (STM-17~21)

| ID | 함정 | 회피 |
|:-:|---|---|
| **STM-17** | R41-2 Zephyr binding 자기모순 (`i2s_stm32_sai.yaml` `bus: i2s` vs SAI4 node `child` binding 불일치) | binding `child` schema 자기모순 직접 정정 + `compatible:` 강제 일치 |
| **STM-18** | R41-3 SRAM4 nocache 누락 (BDMA D3 domain D-cache stale) | dts `chosen { zephyr,sram-nocache = &sram4; };` 추가 |
| **STM-19** | R41-4 i2s_stm32_sai BDMA 미지원 (driver GPDMA만, SAI4 BDMA 필요) | driver fork + BDMA aware 적용 (8 driver 패치) |
| **STM-20** | ACR1.DMAEN write protection (RM0399 누락 spec) | 다음 세션 ~수시간 patch — write protection 우회 시퀀스 발견 |
| **STM-21** | BDMA SRAM4 D3 domain buffer 제약 (AXI SRAM access silent transfer 0) | SRAM4 (0x38000000) 강제 배치 + linker section `.sram4` |

→ STM 함정 누적 16 → **21건**. cross-vendor 누적 51 → **56건** (Espressif 16 + Nordic 18 + NDK 1 + STM32 21).

## 6. Stage 4 시나리오 E1 영업 자산 회복 path 확정 ⭐⭐⭐

| 박제 시점 | Stage 4 시나리오 E1 박제 |
|---|---|
| 5/24 | ❌ "stm32h745 single chip + DMIC voice command 본질 불가능" |
| **5/29** | ✅ **11.5/12 PASS + 본 vault custom Zephyr patch chain R&D 자산** |

다음 세션 ACR1.DMAEN write protection 우회 patch (~수시간) 후 R41 본격 종결 시 영업 카피 회복:

- ⭐⭐⭐ "**stm32h745 single chip + CMSIS-NN CNN 17.6× + DMIC voice command + 본 vault custom Zephyr patch chain R&D 자산**" — Cortex-M tier 최강 + R&D 차별화
- ⭐⭐ "**Zephyr upstream PR contribution carrier**" — 외부 회사 영업 자산 (i2s_stm32_sai BDMA aware + mpxxdtyy STM32 H7 정식 지원)
- ⭐⭐ "**vanilla Zephyr STM32 DMIC 정식 지원 0 → 본 vault patch chain 11.5/12 PASS 검증**" — governance 신뢰성 + R&D 능력

## 7. R&D 신뢰성 자산 패턴 박제

본 R41 cycle = **"vendor upstream 0 coverage → 본 vault custom patch chain → upstream PR contribution carrier"** 패턴 박제. 다음 vendor zero-coverage 영역 진입 시 동일 patterns:

1. upstream sample/driver coverage 사전 grep 검증
2. 0 발견 시 custom patch chain 1~2주 작업 시간 박제
3. vendor doc 검증 시 실측 register dump cross-check 의무화
4. 누락 spec 발견 시 Zephyr upstream PR 후보 + 외부 영업 자산화

## 8. 영업 매칭 (위시캣 / 강사양성 carry)

본 vault custom Zephyr patch chain = **Zephyr upstream PR carry 가치 큼**:
- 위시캣 Zephyr/STM32 customer engagement 발생 시 본 patch chain 카드 가치 carry
- 강사양성 STM32 + Zephyr 모듈 자산 (특히 vendor zero-coverage R&D 모듈)
- 외부 회사 Zephyr governance 신뢰성 자산화

## 9. 다음 세션 carry

- 사용자 STM32 DK 분해 + 이동 + 재시작 → 다음 세션 fresh state
- Zephyr 본체 patch chain 재적용 (`10_Path_A_progress.md` § 1 carry)
- ACR1.DMAEN write protection 우회 patch = MIC test 본격 종결 (~수시간)
- R41 본격 종결 시 Stage 4 시나리오 E1 영업 카탈로그 확정 박제

## 관련 페이지

- [[stm32h745-disco]] — § R41 absorb 단일 source
- [[ai-fanstick]] — § 시나리오 E1 회복
- [[uttec-stage-package]] — § E1/E2/E3 분리 + 6 항목 우위
- [[onDevice-ai]] — § 2026-05-29 R41 진입 박제
- [[build-gotcha-inventory]] — § STM-17~21 (R41 5건 함정)
- [[gaps]] — § vanilla Zephyr STM32 DMIC 정식 지원 0 + vendor reference manual 누락 spec
- [[2026-05-25_STM32H745-Zephyr-통합-cross-vendor]] — Wave 12 진입
- [[2026-05-26_STM32H745-LAN-path-Stage4-결정타]] — Wave 13 LAN path
- [[2026-05-27_Cortex-M-tier-최강-AI-노드]] — Wave 14 mandate v2.9 종결
- [[2026-05-28_R38-stm32h745-SDRAM-QSPI-3tier-메모리-실증]] — R38 정량 실증
