---
title: LoRa 자율 제어망 + onDevice 예측정비 = 산업 사업화 cascade
type: thought
created: 2026-06-17
updated: 2026-06-17
tags: [thought, lora, onDevice, 예측정비, 자율제어망, 무인노드, 산업사업화, 공장자동화, multi-agent흡수, 매칭패턴]
links: [lora, onDevice-ai, factory, 한림용인cc-고가수조, ai-direction, strengths, gaps, 한국기계, ai-fanstick]
---

# LoRa 자율 제어망 + onDevice 예측정비 = 산업 사업화 cascade

2026-06-17 _inbox 흡수 megasession (lora-claude 4장 + ondevice-claude 1장)에서 도출된 매칭 패턴.

## 복리 인사이트 패턴

```
[사실 A: LoRa 자율 제어망 PoC 검증 1호 — 게이트웨이 의존 최소화 토폴로지]
        +
[사실 B: onDevice 비지도 이상탐지 F1 0.995 — single-chip 예측정비]
        ↓
[판단 C: 두 역량이 동일 산업 고객(공장 자동화·원격 무인 설비)을 향한다]
        ↓
[행동 D: factory vault 공장 자동화 narrative에 "무선 자율 제어 + 엣지 예측정비" 통합 패키지로 cascade]
```

## A — LoRa 자율 제어망 (lora vault)

- 골프장 수조 제어망: 단일채널 + 1바이트 주소 + 고정 8B frame + 일일 sync TDMA. 실보드 송수신 무손실(SEQ·CRC OK) = **양산 제어망 PoC 검증 1호**.
- 핵심: **센서가 pump를 그룹 폐루프 직접 제어, master는 monitoring만** = 게이트웨이 의존 최소화. 한림 외 SI 시공·공장 자동화 재사용 토폴로지.
- 무인 노드 배터리 모니터링(nRF52832 SAADC 4.2V 절대측정) + 솔라 전원체인 = **원격 무인 노드 사업** 근거.
- 확장 경로: 이종 혼용·정밀 RF 필요 시 SPI 모듈(E22-M/E19) + Zephyr 전환 (E22↔E32 교차 불가 제약 때문).

## B — onDevice 비지도 이상탐지 (onDevice_AI vault)

- CWRU 산업 표준 베어링 진동 isolation forest 정상만 학습 → 결함 **F1 0.995** on-device.
- edge AI 모델 클래스가 지도 분류 3종(MNIST/KWS/gesture) → **비지도 이상탐지** 신규 1축 확장.
- "검증된 산업 표준 알고리즘을 single-chip($3~5)에 양산" = 산업 예측정비(predictive maintenance) 진입 근거.

## C — 매칭: 동일 산업 고객을 향하는 두 역량

| 축 | LoRa 자율 제어망 | onDevice 예측정비 | 통합 narrative |
|---|---|---|---|
| 고객 | 공장·골프장·농장 원격 설비 | 회전기계·모터·베어링 보유 공장 | 센서+제어+AI 통합 공장 자동화 |
| 가치 | 게이트웨이 없는 자율 무선 제어 | 클라우드 없는 엣지 이상 감지 | **인프라 의존 0 + 무인 운영** |
| 단가 | E22 노드 저비용 | single-chip $3~5 | 양산 BOM 경쟁력 |
| 사업 트랙 | [[factory]] · [[한림용인cc-고가수조]] | [[factory]] · 한국기계 Stage 4 | [[factory]] 통합 패키지 |

→ **[[factory]] 공장 자동화 사업 = LoRa 무선 자율 제어 + 엣지 예측정비** 두 축을 한 패키지로 묶을 수 있다. 한국기계(분쇄·파쇄 설비) 회전기계 = 베어링 이상탐지 직접 적용 + LoRa 원격 모니터링 = 무인 운영. 위시캣 산업 IoT 고객 매칭 + 강사양성 산업 AI 교육 사례.

## D — 부수 교육 자산

- **중력-방향 shortcut 버그** (held-out 100%여도 on-device fail) = "AI 검증의 함정 / 데이터 누수 / shortcut learning" 강사양성·교육 콘텐츠 직접 활용 ([[gaps]] § 2026-06-17).

## 결정 연결

[[ai-direction]] § 결정 51(LoRa 단일 출처 + SPI 전환) · 52(자율 제어망 = 무인 노드 사업) · 53(edge AI 2축 = 예측정비). [[strengths]] §19(LoRa 통신 스택) · §20(비지도 이상탐지).
