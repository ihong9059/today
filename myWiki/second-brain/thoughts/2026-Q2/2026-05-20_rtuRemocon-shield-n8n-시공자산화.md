---
title: rtuRemocon + shield + n8n = 시공 자산화 사업 라인 1순위
type: thought
created: 2026-05-20
tags: [revita, shield, n8n, 한림용인CC, 시공자산화, 산업통합제어, 사업라인, 매칭패턴]
links: [rtu-remocon, shield, n8n-uttec, 한림용인cc-고가수조, revita, 영업전략, 위시캣활동]
---

# rtuRemocon + shield + n8n = 시공 자산화 사업 라인 1순위

## 사실 A — revita 측 rtuRemocon end-to-end 검증 (2026-05-15)

RS485 Modbus RTU(0x20) + CC1101 OOK 447.925 MHz + Flask Web UI(:5003) 통합 응용 완성. 단순 RF Replay → **산업 통합 제어 시스템**으로 격상. 자세히: [[rtu-remocon]]

## 사실 B — shield 시험 플랫폼 합류 (2026-05-16)

LoRa / RS485 / RS422 / MESH / I2C 통합 시험 플랫폼, RPi Linux 분산 호스트. work-end always-send 강제 룰로 myWiki 흡수 보장. 자세히: [[shield]]

## 사실 C — n8n-uttec 자동화 허브 (2026-05-16~17)

n8n 2.20.7-exp.0 + 817 unique 노드. Ubuntu Mac→Linux 컨버전 + Tailscale. shield × n8n 매칭으로 "측정 책임 vs 통신·기록 책임" 분리 패턴 첫 실증.

## 사실 D — 한림용인CC 고가수조 시공 임박 (2026-05-20 D-day)

8 노드 (I2C 수위 센서 + LoRa) → n8n MQTT Trigger → Notion DB + Gmail + 시공 D-day. 1,000만원 거래. UTTEC 단발 SI 첫 Tier 2 sub-vault 사례.

## 판단 — UTTEC 턴키 사업 모델 1순위

**rtuRemocon (산업 표준 packaging) + shield (시험 검증) + n8n (자동화 통합) + 한림용인CC (현장 적용)** = "측정 → 검증 → 통합 → 시공 → 운용 SLA" 풀 라이프사이클이 **하나의 사업 라인**으로 정립.

```
revita 양산 자산 (CC1101 OOK)
  ↓ packaging
rtuRemocon (RS485 Modbus + Web UI)
  ↓ 시험 플랫폼
shield (LoRa·RS485·I2C·MESH 통합)
  ↓ 자동화 허브
n8n-uttec (MQTT·Notion·Gmail·Slack 통합)
  ↓ 현장 시공
한림용인CC 고가수조 (8노드 / 1,000만원)
  ↓ 운영 SLA
재거래 패턴 (한림그룹 + 골프장 다수)
```

→ **데모는 누구나 / 운용은 1인 기업이 직접** 차별화 카피의 풀스택 실증.

## 행동 — 영업·박제 cascade

### D1. 영업전략.md 패턴 박제

[[영업전략]] § 시공 + 운영 SLA 턴키 모델 → 본 사이클을 사례로 박제. 한림용인CC 외에도 광릉CC·필로스GC 등 한림그룹 산하 골프장 다수에 같은 사이클 적용 가능.

### D2. AISG 3.0 #155057 위시캣 영업 격상

[[위시캣활동]] AISG 매칭 카피 격상:
- 옛: "단순 RF Replay 시연"
- 새: "산업 통합 제어 시스템 운용 — rtuRemocon Modbus + RF + Web UI 풀스택"

### D3. 사업 라인 응용 확장 (Solar + 5종 → 6종)

[[2026-05-12_원격모니터링-사업라인]] 사업 라인 응용 영역:
- 옛 5종: Solar 모니터링 / 골프수조 / AISG / 스마트팩토리 / 양식
- 새 6종: + rtuRemocon (산업 시설 무선 제어)

### D4. shield × 한림용인CC 시공 직전 연계

shield의 I2C 수위 + LoRa 통합 시험 결과를 [[한림용인cc-고가수조]] 8노드 모듈로 raw 활용 가능 (PoC → 실 사용). 5/20 D-day 시공 후 운영 SLA 데이터 → shield → revita 양산 evidence cascade.

### D5. 강의·교재 자산

본 cascade 자체가 **호오컨설팅·인프런·강사양성 Day 5 사례**:
- "1인 기업이 검증·시공·운영 풀스택을 어떻게 운영하는가"
- "multi-agent vault가 시공 자산화 cascade를 어떻게 자동화하는가"
- 시범 자료 = `wishketProject/위시캣/2026-05-17_프로젝트155381_미팅준비/14_제안동영상_시나리오나레이션.md` Remotion 동영상 5분 9 Scene

## 매칭 — 본 패턴의 다른 사업 라인 적용

| 사업 라인 | rtuRemocon-style packaging 적용 |
|---|---|
| AI FanStick (onDevice) | microGPT INT8 → BLE+SLM 산업 통합 (Stage 4) |
| Solar 모니터링 (revita) | LoRa SF12 + INA219 + Flask → 산업 시설 무선 모니터링 |
| AISG 3.0 (위시캣) | RF Replay → AISG 안테나 자동 제어 시스템 격상 |
| 스마트팩토리 (Obsidian+Claude) | wiki + 자동화 → 공장 운용 SLA 패키지 |
| lemonLabs AI Consulting | n8n-uttec 컨설팅 deliverable |

→ 본 패턴은 **UTTEC 전 사업 라인의 메타 운용 모델**. 5/20 cascade로 검증 완료.

## 관련 페이지

- [[rtu-remocon]] — 본 cascade 핵심 entity (revita ingest #9)
- [[shield]] — 시험 플랫폼 (multi-agent 5번째)
- [[n8n-uttec]] — 자동화 허브
- [[한림용인cc-고가수조]] — Tier 2 첫 시공 사례
- [[revita]] — 본 cascade 원천 vault
- [[영업전략]] — Tier 3 정부사업 패턴 + 분기 정부지원 SOP
- [[위시캣활동]] — 5/17·5/18 megasession 흡수

## 메타

| 항목 | 값 |
|---|---|
| 박제일 | 2026-05-20 |
| 흡수 카드 | 5/17-001 wishket / 5/17-003 mywiki-absorb-shield / 5/17-003 revita-ingest-9 / 5/18-001 wishket-tier3 / 5/19-002 lemonlabs-batch |
| 트리거 | inbox 잔여 12장 lifecycle megasession 일괄 처리 |
| 다음 적용 | 5/20 한림용인CC 시공 결과 → cascade 데이터 누적 → 위시캣 AISG 영업 활용 |
