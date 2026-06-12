---
title: factory — UTTEC 공장 자동화 사업화 vault (16th, carrier 4번째)
type: entity
created: 2026-06-10
updated: 2026-06-13 (06-12 build cascade — company/ 국가별 구조 완성(40사 폴더화) + 42사 웹 전수 확인 + UTTEC 협업 계획안 3건(한국기계·한국분체기계·HKPS) + ⭐ HKPS↔KPSMC 관계사 가설 / 이전 06-11: cross-매칭 매트릭스 + 영업 narrative 2-페이즈)
tags: [factory, vault분리, carrier4번째, 16th, 공장자동화, 분쇄설비, 파쇄설비, 한국기계확장, 사업화, 센서제어, 영업narrative, PoC, cross매칭]
links: [한국기계, weldRobot, ponet, strengths, ai-direction, shield, uttec-factory-claude, onDevice-ai, 위시캣활동, 영업전략, JEHMLICH, WEIMA, Shanghai-SANME, CRUTEC, 대덕메탈]
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

## 06-11 build — cross-매칭 매트릭스 + 1차 영업 narrative ⭐⭐⭐⭐

> 06-10 신설(틀+4국 리서치) 이후 첫 진화. carry 의문점 2(자산 매트릭스)·3(영업 narrative) 정식 박제. 본 vault `thoughts/2026-Q2/2026-06-11_UTTEC자산-분쇄도메인-cross매칭매트릭스.md` + `application/사업확장/2026-06-11_1차영업narrative초안.md`.

### ① UTTEC 5축 × 분쇄 공정 cross-매칭 매트릭스 (가설)

분쇄 라인 표준 공정(투입→1·2차 분쇄→미분쇄→선별→집진) 각 단계는 **회전 구동부 + 마모 소모품 + 모터 부하**를 공통으로 가짐 → UTTEC IoT 노드 **단계 무관 재사용** (핵심 레버리지). 공통 모니터링 6변수 = 진동·전류/부하·온도·RPM·입도·가동률.

| 축 | 분쇄 적용 | 검증 | PoC난이도 |
|---|---|:--:|:--:|
| 축1 LoRa+Modbus telemetry | 무선 수집(배선 0, retrofit) | 🟡 한림용인CC 6/8 결정론 | 🟢 |
| 축2 Edge AI (Cortex-M) | 입도·결함·막힘 예지보전 | ⬜ 도메인 데이터 미확보 | 🔴 라벨 필요 |
| 축3 Shield (RPi+RS485) | 라인 hub 노드 (다중 설비 관제) | 🟡 factory-rpi4 dogfood | 🟢 |
| 축4 한림용인CC 양산 검증 | 현장 안정성 레퍼런스 | ✅ D-day 6/9 통과 | — 영업자산 |
| 축5 영업·인증·도메인 | 진입 자격 + 제안서 재패키징 | ✅ 인증 / 🟡 제안서 | 🟢 |

→ **전략 함의: "수집(축1+3, 🟢 MVP) → 학습(축2, 🔴 데이터 의존) 2-페이즈."** 1단계(무선 telemetry hub)는 라벨 없이 가시화만으로 과금 가능하면서 동시에 2단계 AI 학습 데이터를 축적. 한국기계 8종 중 슈레더·조크러셔·해머·터보밀 = ⭐⭐⭐ 최적 PoC.

### ② 1차 영업 narrative 4개 평가 → "A로 검증, D로 확장"

| narrative | 타깃 | 자산정합 | 종합 |
|---|---|:--:|:--:|
| **A 국내 보완재 협력** | CRUTEC·대덕메탈 + 모니터링 | ⭐⭐⭐ (축1+3 직결) | **1순위** |
| B 일본 사료·식품 도메인 | 국내 사료·곡물 분쇄 | ⭐⭐ | 3순위 |
| C 중국 SANME식 3자 JV | 독일+한국기계+UTTEC | ⭐⭐ | 4순위 |
| **D 독일 JEHMLICH 진출** | JEHMLICH 한국 서비스 파트너 | ⭐⭐⭐ (고부가) | **2순위** |

**권고 2-페이즈**: Phase1(0~3M) A 국내 보완재 + 한국기계 dogfood로 축1+3 MVP 현장 데이터·첫 레퍼런스 확보 → Phase2(3~9M) D 독일 JEHMLICH "독일 HW + UTTEC IoT layer" 고부가 + 축2 Edge AI 예지보전.

- **첫 접촉 후보**: 0=한국기계 자체 라인 dogfood(최저 장벽) / 1=CRUTEC(재활용 분쇄 보완재) / 2=대덕메탈. ⚠️ 연락처·담당자명 미확정 placeholder (실 발송 전 사용자 확인).
- **가치 제안 1쪽**: "라인 안 멈추고, 배선 없이, 마모·과부하·가동률 실시간." 4 Pain↔해법 매핑 + 한림용인CC 검증·KC/TELEC/CE 신뢰 근거.
- **PoC 견적(가설)**: 분쇄기 1대 / 1~2개월 / **100~150만** / 대시보드+jam·과부하 룰 알림+데이터 리포트 (weldRobot Path4 fork). 금액은 가설 — 원가 산정 carry.
- **첫 메시지 초안 2종**: 국문(dogfood/보완재) + 영문(JEHMLICH 한국 진출 파트너). 회사명 노출은 한국기계 트랙1(weldRobot)과 분리.

### ③ 사용자 결단 carry (06-11 발생)

1. 진입 경로 **A→D 2-페이즈** 권고 채택 여부
2. 한국기계 dogfood 실행 가능성 + 연락처 확인
3. PoC 견적 원가 산정 (가설 100~150만 → 실제)
4. CRUTEC·대덕메탈 entity 신설 (narrative A 채택 시)

## 06-12 build — company/ 국가별 구조 완성 + 협업 계획안 3건 + HKPS 관계사 가설 ⭐⭐⭐ (카드 2026-06-13-001, 6/13 흡수)

> company/ 협력후보 트랙 (06-11 카드 2026-06-11-001 + 06-12 build 통합): entities/(요약 카드) ↔ company/(심층 설명서) 역할 분리, 4국 TOP10 40사 전체 폴더화.

1. **company/ 국가별 계층 완성**: `{국가}/{회사}/`(PARTNER) + `{국가}/_벤치마크/{회사}/`(BENCHMARK·COMPETITOR). 각 진행사항.md (fit/tag/website frontmatter + status lifecycle). 대모엔지니어링 → 한국/_벤치마크/ 이동. 회사별 `prompt_진행이력.md` 체계 신설 (README 규약 6항).
2. **42사 웹사이트 전수 접속 확인** (전부 정상): **한국분체기계 연락처 확보 (hkc@kpsmc.co.kr · 032-505-5580)** + Liming 공식 도메인 lmlq.com 정정 + 크러텍·NETZSCH 봇차단(브라우저 정상).
3. **UTTEC 협업 계획안 3건** (고장 예지 / 완제품 효율 2관점, onDevice AI 신규 도전 반영):
   - 한국기계 — 같은 PoC에서 2관점 동시 출발 (retrofit kit 1식 = 고장예지 3모델 + 효율 데이터)
   - 한국분체기계 — **LG 폴란드(2019)·헝가리(2020) 2차전지 플랜트 수출 + IoT 부재 = 해외 원격 모니터링 killer use case** / gas-tight 공정 / 2026-01 "입도 제어" 기사 / 부설연구소
   - HKPS — 조건부 계획 (아래 가설)
4. ⭐ **HKPS 관계사 가설**: HKPS 공장 주소 = 한국분체기계와 완전 동일 (인천 가재울로 32번길 31) + 제품 카탈로그 동일 → **가설 A(유력) = KPSMC 영업/SI 채널**. TOP10 "3위 독립 후보" 평가 정정 후보. 검증 = NICE·등기 유료 DB 또는 접촉 시 확인 (사용자 결단 carry → 작업보고서 2026-06-13 todo).
5. **회사 설명서 4건** (06-11 카드): 한국기계("급성장 시장의 작은 길목 지킴이") · 대모엔지니어링(벤치마크/천장) · 성일하이텍(고객 정점/등대) · 한국분체기계(dogfood 2순위). ⚠️ 식별 주의: **한국기계엔지니어링(topcrusher, 군포) ≠ 한국분체기계(주)(kpsmc, 인천)** 별개 법인 → [[한국기계]] § 식별 주의.
6. 후속: 다음 독립 타겟 = 크러텍(한국 4위) 권고 / onDevice AI(DMIC 음향 진단) 분쇄기 적용성 기술 문의 = factory 측 ondevice-claude 카드 carry.

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

- ~~UTTEC 자산 cross-매칭 가설 매트릭스 thoughts 박제~~ ✅ 06-11 완료
- ~~첫 영업 narrative (우선 접촉 후보)~~ ✅ 06-11 완료
1. 🔴 진입 경로 A→D 2-페이즈 채택 결단 (사용자)
2. 🔴 한국기계 dogfood 실행 + 연락처 확인 (사용자)
3. 🟠 PoC 견적 원가 산정 (가설 100~150만 → 실제)
4. 🟡 CRUTEC·대덕메탈 entity 신설 (narrative A 채택 시)
5. 🟡 자산 매트릭스 2단계(축2 Edge AI 데이터 의존) 검증 계획
6. progress/decision-001-vault-신설.md 정식 박제 (미완)

## 본 vault 측 박제 (cross-link)

- vault 정체성: `factory/CLAUDE.md`
- second-brain CLAUDE.md: `factory/second-brain/CLAUDE.md`
- ai-direction: `factory/second-brain/ai-direction.md` § 결정 1
- strengths: `factory/second-brain/strengths.md` (UTTEC 자산 5축 매트릭스)
- **thoughts (06-11)**: `factory/second-brain/thoughts/2026-Q2/2026-06-11_UTTEC자산-분쇄도메인-cross매칭매트릭스.md`
- **application (06-11)**: `factory/application/사업확장/2026-06-11_1차영업narrative초안.md`
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
