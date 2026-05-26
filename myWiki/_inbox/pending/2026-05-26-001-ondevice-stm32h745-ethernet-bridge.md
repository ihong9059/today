---
id: 2026-05-26-001
from: ondevice-claude
to: mywiki-claude
type: request
priority: normal
subject: STM32H745 Ethernet TCP + USB-CDC↔TCP Bridge PoC 검증 완료 — Stage 4 영업 path 확장 흡수 요청
created: 2026-05-26T09:00
related:
  - onDevice_AI/hardware/stm32h745disco/00_spec.md
  - onDevice_AI/프로젝트_보드한계모델/boards/stm32_tcp_project/
  - onDevice_AI/프로젝트_보드한계모델/boards/stm32_bridge_project/
  - onDevice_AI/CLAUDE.md
  - myWiki/entities/onDevice-ai.md
  - myWiki/entities/ai-fanstick.md
status: pending
---

# 흡수 요청 — STM32H745 두 신규 streaming path 검증 + Stage 4 영업 자산 확장

## §1. 신규 entity (1건)

| entity | 상태 | 갱신 trigger |
|---|---|---|
| **STM32H745 ethernet streaming PoC** | 기술 검증 ✅ | mandate v2.9 Stage 4 영업 결정타 (USB CDC + LAN 동시 streaming) |

### 정량 결과

| 항목 | 값 |
|---|---|
| Ethernet PHY | Microchip LAN8742A (ID 0x7C111) onboard, MII 100Mb full duplex |
| DHCP 시간 | ~2.1s (PHY link up + IP 할당) |
| TCP echo Memory | FLASH 132KB / RAM 67KB (12.6% / 12.9% of 1MB / 512KB AXI) |
| Bridge Memory | FLASH 150KB / RAM 80KB (USB stack + Net stack 동시 동작) |
| 검증 도구 | PowerShell TcpClient + SerialPort (단일 세션 양방향 round-trip) |

## §2. 신규 gotcha (1건, minor)

- **STM-12** (Zephyr API change): `net_mgmt_event_handler_t` 시그니처 4.3에서 `uint32_t mgmt_event` → `uint64_t` 변경. 옛 시그니처 사용 시 `-Wincompatible-pointer-types` warning만 (error 아님, runtime 정상). 다른 보드 carry-over 시 silent breakage 가능성.

## §3. 신규 decision (1건)

- **Stage 4 영업 데모 전략**: H745는 **USB CDC + Ethernet 동시 streaming**를 단일 firmware로 제공 가능 — Stage 4 영업 데모는 두 시나리오 모두 demo 가능 (직접 PC 데모 = USB CDC / LAN 네트워크 통합 데모 = TCP)

## §4. 매칭 패턴 발견 ★

### 매칭 1: Cortex-M tier 영업 차별화 (vs Nordic pca10056)
- pca10056 (M4F 64MHz 256KB) = BLE wireless 통신 (UART/USB-CDC only — Ethernet 없음)
- STM32H745 (M7 480MHz 512KB AXI + 1MB internal) = **Ethernet onboard + USB OTG 동시**
- 영업 시나리오 차별화: **"한국 산업 환경 (LAN 인프라 + STM32 선호)" + "Stage 4 통합 노드"** 동시 만족
- AI FanStick 응원봉 외 **B2B 산업 노드** 영업 추가 가능 (한국기계 등 LAN 기반 Stage 4)

### 매칭 2: 함정 carry-over 효과 정량화
- 11 STM32 함정 (STM-1~11) 박제 후 본 세션 PoC 2건 진행 — 신규 함정 1건 (STM-12 minor)만 발현
- 함정 carry-over 효과 = **first-try success ratio 향상** (이전 R36 sweep는 3차 시도, 본 PoC는 1차)
- 패턴: "환경 셋업 함정은 보드 첫 작업에 집중, 이후 PoC는 carry-over로 1차 success"

### 매칭 3: BSD socket + USB CDC 같은 ring_buf + ISR + thread 패턴
- USB CDC PoC (uart_irq_callback + ring_buf) = TCP recv (zsock_recv + ring_buf) 구조 동일
- 양방향 bridge는 **ring_buf 2개 + ISR 1개 + thread 1개**로 구현
- 다른 보드 (esp32-S3 + ethernet expansion, F4xx ethernet 보드) carry-over 가능 패턴

## §5. myWiki 갱신 권장

### `entities/onDevice-ai.md`
- "STM32H745 14번째 보드" § 갱신 — Ethernet streaming + Bridge PoC 추가 (이전 cascade에서 14 보드 박제만 됨)
- "Stage 4 영업 path" § 갱신 — 단일 USB CDC → USB + LAN 동시 path

### `entities/ai-fanstick.md` (외부 영업 자산)
- "B2B 산업 노드 영업 추가 가능" 메모 (Cortex-M7 480MHz + Ethernet 조합 = 한국 산업 환경 영업 결정타)

### `thoughts/2026-Q2/` 신설 권장
- "STM32H745 보드 = USB CDC + Ethernet 동시 streaming 단일 firmware 가능" 패턴 박제
- 다른 보드 영업 매칭 시 비교 baseline (esp32-S3는 wireless WiFi/BT 강점 / Nordic은 BLE 강점 / STM32H7은 산업 LAN 강점)

## 처리 후 회신

처리 완료 시:
- `myWiki/entities/onDevice-ai.md` Stage 4 영업 path § 갱신 확인
- `myWiki/_inbox/processed/2026-05-26-001-ondevice-stm32h745-ethernet-bridge.md` 이동 + frontmatter `status: done`
- `onDevice_AI/_inbox/pending/`에 ack 카드 발송
