---
title: STM32H745 LAN path = Stage 4 산업 노드 결정타 (Wave 13)
type: thought
created: 2026-05-26
updated: 2026-05-26 (myWiki 흡수, Wave 13 카드 흡수 시)
tags: [STM32H745, Ethernet, LAN8742A, USB-CDC, Bridge, ring_buf, Stage4, B2B, 산업노드, 한국기계, ondevice-business, mandate-v2.9, carry-over-효과, single-firmware]
links: [stm32h745-disco, onDevice-ai, ai-fanstick, uttec-stage-package, ai-direction, 2026-05-25_STM32H745-Zephyr-통합-cross-vendor]
---

# STM32H745 LAN path = Stage 4 산업 노드 결정타

## 한 줄 요약

⭐⭐⭐ **STM32H745 = USB CDC + Ethernet 동시 streaming을 단일 firmware로 제공 가능** — Stage 4 영업 데모 두 시나리오(직접 PC = CDC / LAN 네트워크 통합 = TCP) 모두 가능. 한국 산업 환경 (LAN 인프라 + STM32 선호) + Stage 4 통합 노드 동시 만족 → **B2B 산업 노드 영업 path 추가**.

## 정량 결과 (Wave 13, 5/26)

| 항목 | 값 |
|---|---|
| Ethernet PHY | Microchip **LAN8742A** (ID 0x7C111) onboard, MII 100Mb full duplex |
| DHCP 시간 | ~2.1s (PHY link up + IP 할당) |
| TCP echo Memory | FLASH 132KB / RAM 67KB (12.6% / 12.9% of 1MB / 512KB AXI) |
| Bridge Memory | FLASH 150KB / RAM 80KB (USB stack + Net stack 동시 동작) |
| 검증 도구 | PowerShell TcpClient + SerialPort (단일 세션 양방향 round-trip) |
| 신규 함정 | **1건 minor** (STM-12 Zephyr API change) — carry-over 효과 입증 |

## 3 매칭 패턴

### 매칭 1: Cortex-M tier 영업 차별화 (vs Nordic pca10056)

| 보드 | wireless / wired | 영업 시나리오 |
|---|---|---|
| pca10056 (M4F 64MHz 256KB) | BLE wireless (UART/USB-CDC only, **Ethernet 없음**) | KWS / B2B BLE+AI 통합 SoC |
| **STM32H745 (M7 480MHz, 512KB AXI + 1MB internal)** | ⭐ **Ethernet onboard + USB OTG 동시** | **한국 산업 환경 (LAN 인프라 + STM32 선호) + Stage 4 통합 노드** |

영업 시나리오 차별화:
- AI FanStick 응원봉 외 **B2B 산업 노드 영업 추가 가능** (한국기계 등 LAN 기반 Stage 4)
- Stage 4 데모: 두 시나리오 모두 단일 firmware로 demo 가능

### 매칭 2: 함정 carry-over 효과 정량화

- 11 STM32 함정 (STM-1~11) 박제 후 본 세션 PoC 2건 진행 → 신규 함정 **1건 (STM-12 minor)** 만 발현
- 함정 carry-over 효과 = **first-try success ratio 향상**
- R36 sweep = 3차 시도 → 본 PoC = **1차 success** ⭐
- 패턴: "환경 셋업 함정은 보드 첫 작업에 집중, 이후 PoC는 carry-over로 1차 success"
- 영업 카피: "vendor 함정 인벤토리 보유 = 외부 회사 도입 시 first-try success ratio 향상"

### 매칭 3: BSD socket + USB CDC 같은 ring_buf + ISR + thread 패턴

- USB CDC PoC (`uart_irq_callback + ring_buf`) = TCP recv (`zsock_recv + ring_buf`) 구조 동일
- 양방향 bridge = **ring_buf 2개 + ISR 1개 + thread 1개** ⭐
- 다른 보드 (esp32-S3 + ethernet expansion, F4xx ethernet 보드) carry-over 가능 패턴
- 코드 자산 = `boards/stm32_bridge_project/` reference template

## STM-12 — Zephyr API change (minor)

- `net_mgmt_event_handler_t` 시그니처 4.3에서 `uint32_t mgmt_event` → `uint64_t` 변경
- 옛 시그니처 사용 시 `-Wincompatible-pointer-types` warning만 (error 아님, runtime 정상)
- 다른 보드 carry-over 시 silent breakage 가능성 → 함정 인벤토리 등재 ([[build-gotcha-inventory]] STM-12)

## 신규 entity / decision (Wave 13 흡수)

- **entities/onDevice-ai.md**: "STM32H745 14번째 보드" § 갱신 — Ethernet streaming + Bridge PoC 추가 + "Stage 4 영업 path" § 갱신 — 단일 USB CDC → USB + LAN 동시 path
- **entities/ai-fanstick.md**: B2B 산업 노드 영업 추가 가능 메모 (Cortex-M7 480MHz + Ethernet 조합 = 한국 산업 환경 영업 결정타)
- **entities/stm32h745-disco.md**: 신규 entity 신설 (Wave 12 + 13 통합)
- **ai-direction.md**: Stage 4 영업 데모 전략 결단 (USB CDC + Ethernet 동시 streaming 단일 firmware 가능)

## ⭐ 패턴 박제 — 보드 영업 매칭 baseline

```
esp32-S3   → wireless WiFi/BT 강점 (응원봉, K-POP B2C)
Nordic     → BLE 강점 (B2B BLE+AI 통합 SoC)
STM32H7    → 산업 LAN 강점 (한국 산업 노드, Stage 4 통합)
```

→ 다른 보드 영업 매칭 시 본 thought 의 baseline 참조.

## 영업 자료 영향 (Wave 13 cascade)

| 시나리오 | Wave 13 cascade |
|---|---|
| A esp32s3 단일 | 불변 |
| B Hybrid SoC | 불변 (Nordic BLE + esp32s3 W-AI) |
| C M4F 단독 | 불변 |
| D Edge AI Gateway (rpi5) | 불변 (Wave 10 신설) |
| **E ⭐ STM32H7 산업 노드 (신규)** | **USB CDC + LAN 단일 firmware = Stage 4 B2B 통합 노드** (한국기계 등 LAN 인프라 영업) |

## 관련

- [[stm32h745-disco]] — 본 thought의 직접 entity (Wave 12+13 통합)
- [[onDevice-ai]] § Stage 4 영업 path
- [[ai-fanstick]] § B2B 산업 노드 path
- [[uttec-stage-package]] § Stage 4 LAN 영업 카피
- [[2026-05-25_STM32H745-Zephyr-통합-cross-vendor]] — Wave 12 직전 (보드 진입 + 11 함정 cluster)
- [[build-gotcha-inventory]] § STM32 12건 cluster
