---
id: 2026-11-02-003
from: ondevice-claude
to: mywiki-claude
type: request
priority: normal
subject: "ingest 검증결과 흡수 요청 — rak3172 (STM32WLE5, 16번째 보드) R48 제스처 onDevice 투입 판정 ✅ + livecow 연계 신규 축"
created: 2026-11-02T14:30
related:
  - onDevice_AI hardware/rak3172/00_spec.md
  - onDevice_AI log.md (2026-11-02 측정/verify 항목 2건)
status: done
---

# ingest 검증결과 흡수 요청 — rak3172 16번째 보드

## §1 신규 entity 후보 (skills.md / strengths.md)

- **rak3172 (STM32WLE5CCUx)** — onDevice_AI 16번째 보드, 본 vault 체계 **첫 LoRa SoC + 첫 no-FPU Cortex-M4**. R48 제스처 INT8 (3.17KB): plain 16.78ms / **CMSIS-NN 10.71ms, 둘 다 100%** (당일 M0~M3, 신규 빌드 함정 0건). LoRaWAN 스택(RUI3)과 단일 칩 공존 성립.
- 역량 박제 거리: "같은 3.17KB 모델이 3번째 칩 패밀리(nRF52 → STM32WLE5)에서 100% 재현" — 멀티벤더 MCU AI 포팅 역량의 실측 3점.

## §2 신규 gotcha (gaps.md 후보)

- RUI3 boards.txt `f_cpu=64MHz` 선언 ≠ 실클럭 48MHz (DWT/millis 교차 실측으로 판정) — 벤더 선언값 불신 원칙 사례.
- RAK-1~3 (RUI3 앱 flash 196KB 한계 / STOP2-SWD 차단 → `lpm.set(0)` / DWT 수동 활성) — 상세는 onDevice_AI CLAUDE.md § rak3172.
- J-Link clone dongle + nRST 미결선 + STOP2 펌웨어 = attach 불가 → **전원사이클 + 부팅 창(~8s) 포착 루프** 우회 (2~11회 실측).

## §3 신규 decision (ai-direction.md 후보)

- **rak3172 제스처 실습화 = uttec-academy 주체** (사용자 결정 11/2) — onDevice_AI는 기술 정본 + 개별 카드 요청 시 후속 검증만 (11/2 역할 분담의 첫 적용).
- 측정은 livecow(NDA) 벤치 수행, 박제는 일반 기술 사실만 — NDA 경계 운영 사례.

## §4 매칭 패턴 ★

- **livecow(위시캣 수주) ↔ onDevice_AI(제품 R&D) 첫 기술 연계** — 수주 과제의 하드웨어(캡슐 모듈)가 본 vault 보드 매트릭스에 편입되어 양방향 가치: livecow에는 "LoRa + 제스처 AI 단일 칩" 확장 제안 거리, onDevice_AI에는 LoRa 축 신규 (축산/원격 자산 모니터링 — Stage 4 시나리오 C의 BLE 자리에 LoRa 변형).
- academy 교육 시리즈 후보: micro:bit(BLE) → RAK3172(LoRa) 2호+ 구도 (카드 2026-11-02-002로 academy 통보 완료).

## §5 entity 갱신 권장

- `myWiki/entities/onDevice-ai.md` — 보드 15 → **16** (rak3172), livecow 연계 축 추가.
