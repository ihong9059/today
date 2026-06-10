---
title: factory — UTTEC 공장 자동화 사업화 vault (16th, carrier 4번째)
type: entity
created: 2026-06-10
updated: 2026-06-10 (vault 신설 + carrier 패턴 4번째 적용 사례 + 분쇄·파쇄 설비 도메인 4국 deep search + 핵심 10사 entity 신설 + 한국기계 자산 + smartFactory 자산 이식)
tags: [factory, vault분리, carrier4번째, 16th, 공장자동화, 분쇄설비, 파쇄설비, 한국기계확장, 사업화, 센서제어]
links: [한국기계, weldRobot, ponet, strengths, ai-direction, shield, uttec-factory-claude, onDevice-ai, 위시캣활동, 영업전략]
---

# factory — UTTEC 공장 자동화 사업화 vault

## 한 줄 정의

**UTTEC 공장 자동화 사업화 vault** (`C:/todo/factory/`, Tier 3, multi-agent 16번째 factory-claude). 1차 진입 = **분쇄·파쇄 설비 도메인 (한국기계 베이스 → 동종 회사 확장)**, 확장 = **센서 + 제어 기반 공장 자동화** 전반. mywiki §13 carrier 패턴 **4번째 적용 사례** (2026-06-10).

## 상태 매트릭스

| 축 | 상태 |
|---|---|
| **vault 위치** | `C:/todo/factory/` (Windows, 본 PC) |
| **vault 신설** | ✅ 2026-06-10 |
| **multi-agent ID** | `factory-claude` (16th 합류) |
| **Tier 분류** | Tier 3 (사업화 트랙 + multi-agent + 별도 vault) |
| **사업 도메인 1차** | 분쇄·파쇄 설비 (한국기계 베이스 → 동종 회사 확장) |
| **사업 도메인 확장** | 센서 + 제어 기반 공장 자동화 전반 (모니터링·예지보전·SCADA·Edge AI) |
| **타겟 고객** | 분쇄·파쇄 설비 제조사 + 운영 공장 + 재활용 라인 통합업체 |
| **첫 자산 이식** | smartFactory/업무효율화/한국기계/ 전체 카피 + shredder 도메인 + AI 교육 계획서 |
| **첫 시장 조사** | 4국 deep search (한국·일본·중국·독일) + 핵심 10사 entity |

## 신설 본질 — carrier 패턴 4번째 적용 사례

| 사례 | 일자 | vault 위치 | 본질 |
|---|---|---|---|
| 1번째 | 2026-06-04 | `revitaProject/application/노지관리Wiki/` | 노지 관리 신사업 |
| 2번째 | 2026-06-06 낮 | `C:/todo/weldRobot/` | 용접 로봇 신사업 |
| 3번째 | 2026-06-06 밤 | `C:/todo/ponet/` | Ponet 광주 협력 |
| **4번째** | **2026-06-10** | **`C:/todo/factory/`** ⭐ | **공장 자동화 + 분쇄 설비 확장** |

→ **carrier 패턴 정착 패턴 검증 (4 사례 누적)**. 다음 사례 (lemonLabs 확장 / AISG / 정부 R&D 사업화 등) templates 즉시 적용 가능.

## 사업 도메인 본질 (사용자 명시 결단)

> "한국기계 관련 비지니스를 다른 회사로 확장. factory vault를 todo folder에 만들어, ponet vault와 같이 myWiki와 정보 주고받기. skill도 동일. **주요 목적은 센서 및 제어를 이용한 공장 자동화 분야 사업화**." (2026-06-10)

→ 1차 진입 = 분쇄·파쇄 설비 (한국기계 트랙 3 신설). 본 entity와 별도로 mywiki [[한국기계]] § 트랙 3 추가.

## 첫 시장 조사 (4국 deep search 결과) ⭐⭐⭐

### 핵심 10사 entity (본 vault second-brain/entities/)

| 국가 | 회사 | 본질 | 본 vault 측 우선순위 |
|---|---|---|---|
| 🇰🇷 | HKPS (한국분체시스템) | 산업용 슈레더 (저속 고torque) | 직접 경쟁 |
| 🇰🇷 | ZATO Korea | 2축 파쇄기·Pre-shredder·Hammer 콤보 | 직접 경쟁 |
| 🇯🇵 | KURIMOTO (栗本鐵工所) | Jaw Crusher NC/ST (광업·건자재) | 벤치마크 |
| 🇯🇵 | Meiji Machine (明治機械) | Swing-type Hammer Mill (사료·곡물) | 벤치마크 (사료 도메인 라이벌) |
| 🇨🇳 | ZENITH (上海建冶) | Crusher + Grinding Mill 종합 (1987~) | 가격 위협 |
| 🇨🇳 | Shanghai SANME | Sino-German JV (광업 분쇄) | **벤치마크 모델 1순위** (협력 모델 fork 후보) |
| 🇨🇳 | GEP ECOTECH | 1·2·4축 슈레더 (신흥) | 가격 위협 |
| 🇩🇪 | JEHMLICH | Roll/Hammer/Cutting/Pin Mill 풀라인 | **벤치마크 1순위** (한국기계 1:1 대응) |
| 🇩🇪 | WEIMA | 산업용 슈레더 (한국 진출 검증) | "독일 품질 + 한국 가격" narrative 검증 |
| 🇩🇪 | ZERMA | Slow/Cutting/Fine mill·Shredder (70년+) | 노포 벤치마크 |

전체 30+ 회사 list = `factory/research/경쟁사조사/2026-06-10_4국-전체-list.md` (raw 보관).

## UTTEC 자산 cross-매칭 가설 (5축) ⭐⭐⭐⭐

### 차별화 결정타 narrative

> "UTTEC가 검증한 무선 + Edge AI 통합 자산 (한림용인CC fresh 6/8 자정 결정론 + lora_tx_water_level merged.hex + Shield + 한국기계 도메인 8종 제품 + 6종 공정 지식) + 4국 경쟁 환경 자산 (JEHMLICH 1:1 벤치마크 + SANME Sino-German JV 모델 + WEIMA 한국 진출 검증)을 결합하면, **분쇄·파쇄 설비 도메인 무선 모니터링 + Edge AI 예지보전 한국 시장 first mover** 가능."

### 5축 자산

1. ⭐⭐⭐⭐ **LoRa + Modbus 무선 telemetry** (UTTEC BLE Module + E22-900T30D + 한림용인CC 양산 검증) → 분쇄 라인 진동·전류·온도
2. ⭐⭐⭐ **Edge AI** (onDevice_AI Cortex-M tier + STM32H745 LAN bridge) → 입도 분석 + 결함 검출 + 예지보전
3. ⭐⭐⭐ **Shield (RPi + LoRa + RS485)** + factory-rpi4 (uttec-factory-claude) → 분쇄 라인 hub 노드 + 학습 머신
4. ⭐⭐⭐ **한림용인CC 양산 검증** → 실제 산업 현장 안정성 narrative + Tier 2 1,000만/D-3 시공 1번째 사례
5. ⭐⭐ **사업·영업 자산** (한국기계 entity + smartFactory 자산 + 위시캣 활동 + KC·TELEC·CE 인증)

## 자체 SSH fact-finding 패턴 (선택 carry)

- ponet 측 자체 SSH fact-finding 신설 패턴 첫 사례 (2026-06-06) → factory 측에도 적용 가능
- 한국기계 측 협력 진행 시 동일 패턴 적용 후보 (자료 deep dive)

## 의문점 (carry — 사용자 결단 + 첫 미팅 후 박제)

1. 확장 대상 회사 narrowing — 4 방향 중 우선 (국내 보완재 / 일본 사료 / 중국 SANME 모델 / 독일 JEHMLICH 벤치마크 + 한국 진출)
2. 한국기계 본사 측에 본 트랙 의사 통보 시점·방법 (트랙 1 weldRobot dogfood와 분리 명확화)
3. 분쇄 회사 측 실제 pain point (가동률·예지보전·에너지 비용·인력)
4. UTTEC PoC 견적 모델 (100~300만, 1~3개월) — weldRobot Path 4 fork
5. 영업 채널 확보 (분쇄 산업 협회·전시회·B2B 플랫폼)
6. shield-claude / uttec-factory-claude vault와 통신·자산 공유 패턴

## 즉시 todo (다음 work-start)

1. 확장 대상 회사 narrowing 결단 (사용자)
2. UTTEC 자산 cross-매칭 가설 매트릭스 thoughts 박제
3. 첫 영업 narrative (10사 중 우선 접촉 후보)
4. progress/decision-001-vault-신설.md 정식 박제
5. thoughts/2026-Q2/2026-06-10_factory-vault-진입.md 박제

## 본 vault 측 박제 (cross-link)

- vault 정체성: `factory/CLAUDE.md`
- second-brain CLAUDE.md: `factory/second-brain/CLAUDE.md`
- ai-direction: `factory/second-brain/ai-direction.md` § 결정 1
- strengths: `factory/second-brain/strengths.md` (UTTEC 자산 5축 매트릭스)
- index: `factory/second-brain/index.md`
- log: `factory/log.md` + `factory/second-brain/log.md`
- entities (10사): `factory/second-brain/entities/`
- research: `factory/research/경쟁사조사/2026-06-10_분쇄설비-4국-경쟁환경.md` + `..._4국-전체-list.md`
- business: `factory/business/한국기계자산/` + `factory/business/smartFactory-자산/`
- raw junction: `myWiki/raw/factory` → `C:/todo/factory/`

## 관련 페이지

- [[한국기계]] — 도메인 베이스 entity (트랙 3 factory 확장)
- [[strengths]] § 13 carrier 역량 + § 14·15·16 자산 출처
- [[ai-direction]] § 결정 (factory vault 신설)
- [[ponet]] — 3번째 carrier 패턴 사례 (직전 모범)
- [[weldRobot]] — 2번째 carrier 패턴 사례 + 한국기계 트랙 1 dogfood
- [[shield]] — RPi LoRa + RS485 (도메인 직접 정합)
- [[uttec-factory-claude]] — factory-rpi4 공장자동화 교육 vault (cross-link 1순위 후보)
- [[onDevice-ai]] — Edge AI 자산 출처
- [[위시캣활동]] — 영업 narrative 자산
- [[영업전략]] — 본 vault 진입 narrative 통합
