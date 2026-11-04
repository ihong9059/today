---
title: livecow ↔ onDevice_AI 첫 기술 연계 — 수주 과제와 제품 R&D가 보드 매트릭스에서 만나다
type: thought
created: 2026-11-02
updated: 2026-11-02
tags: [thought, livecow, onDevice-ai, LoRa, STM32WLE5, rak3172, 수주R&D양방향, 보드매트릭스, NDA경계, vault횡단]
links: [livecow, onDevice-ai, uttec-academy, lora, ai-direction, feedback_vault_scope_isolation]
---

# livecow ↔ onDevice_AI 첫 기술 연계

## 복리 인사이트 패턴

```
[사실 A] livecow(위시캣 수주) Collar/캡슐의 LoRa 칩 = RAK3172 (STM32WLE5)
   +
[사실 B] onDevice_AI(제품 R&D)가 RAK3172를 16번째 보드로 투입 → R48 제스처 INT8(3.17KB)
         CMSIS-NN 10.71ms · 정확도 100% (3번째 칩 패밀리 nRF52→STM32WLE5 재현)
   ↓
[판단 C] 수주 과제의 하드웨어가 제품 R&D 보드 매트릭스에 편입되며
         처음으로 두 축이 기술로 직접 연결 — 양방향 가치 발생
   ↓
[행동 D] livecow = "LoRa + 제스처 AI 단일 칩" 확장 제안 거리 /
         onDevice_AI = LoRa 축 신규(Stage 4 시나리오 C의 BLE 자리에 LoRa 변형, 축산·원격 자산 모니터링)
```

## 왜 의미 있나

지금까지 [[livecow]](위시캣에서 졸업한 delivery 실행 트랙)와 [[onDevice-ai]](AI FanStick·Stage 4 제품 R&D vault)는 **서로 다른 사업 축**이었다. livecow는 LoRa 통신·수신율·캡슐 양산에 집중했고, onDevice_AI는 MCU 온디바이스 AI(제스처·KWS·이상탐지)에 집중했다. 둘은 접점이 없었다.

**RAK3172(STM32WLE5)라는 단일 칩이 그 접점을 만들었다.** 이 칩은 LoRaWAN 스택(RUI3)과 CMSIS-NN 추론을 **한 칩에서 공존**시킬 수 있음이 실측으로 성립했다 — 즉 "LoRa로 통신하는 원격 노드가 동시에 거동을 온디바이스로 분류"하는 제품 형태가 기술적으로 열렸다. 축산 캡슐·목걸이(Collar)가 단순 센서 송신기를 넘어 **엣지 추론 노드**가 될 수 있다는 뜻이다.

## 양방향 가치

| 방향 | 가치 |
|---|---|
| onDevice_AI → livecow | "LoRa + 제스처/거동 AI 단일 칩" = 캡슐·Collar에 온디바이스 분류 탑재 여지 (BNOW/충북대에 확장 제안 거리) |
| livecow → onDevice_AI | **LoRa 축 신규** — 기존 보드 매트릭스는 BLE/WiFi 중심, 축산·원격 자산 모니터링(Stage 4 시나리오 C의 BLE 자리에 LoRa 변형)이라는 신규 응용 path |

## 횡단 운영 원칙 2건

1. **NDA 경계 운영**: 측정 자체는 livecow(BNOW/CBNU NDA) 벤치에서 수행하되, onDevice_AI·myWiki 박제는 **일반 기술 사실만**(식별 정보·클라이언트 데이터 제외). 수주 과제의 기밀을 지키면서 재사용 가능한 기술 자산만 추출하는 분리 운영의 사례.
2. **역할 분담 정합**: 같은 11/2에 확정된 academy↔onDevice_AI 역할 분담([[feedback_vault_scope_isolation|vault scope 격리]])과 동형 — onDevice_AI가 **기술 정본(단일 출처)** 역할을 맡으므로, livecow·academy 등 여러 vault가 rak3172 검증 결과를 중복 박제 없이 cross-link로 참조한다.

## 교육 연계 (3호 시너지)

같은 칩이 [[uttec-academy]] 교육 시리즈로도 이어진다: **micro:bit(BLE) → RAK3172(LoRa)** 2호+ 구도. 제품 R&D에서 검증한 칩이 그대로 교육 kit·커리큘럼으로 환류 = onDevice_AI(기술 정본) → academy(교육 취합)의 역할 분담이 실제로 작동하는 첫 경로.

## 함의

UTTEC의 멀티 vault 구조는 각 축이 독립 진화하되, **공용 기술 자산(칩·보드·모델)이 축을 가로질러 재사용**될 때 복리가 발생한다. RAK3172는 그 복리의 첫 교차점 — 수주(livecow)·제품(onDevice_AI)·교육(academy) 3개 축이 **한 칩**에서 만났다. 향후 보드 매트릭스에 신규 칩이 편입될 때마다 "이 칩이 어느 수주/제품/교육 축과 연결되는가"를 점검하는 것이 cross-vault 가치 발굴의 루틴이 될 수 있다.

→ 근거: [[onDevice-ai]] § 2026-11-03 + [[livecow]] § 2026-11-02 + [[ai-direction]] § 2026-11-02 + onDevice_AI vault `hardware/rak3172/00_spec.md`.
