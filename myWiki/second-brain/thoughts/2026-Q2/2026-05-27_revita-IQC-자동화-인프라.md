---
title: revita IQC 자동화 인프라 — DUT 다중 + 브리지 단일 + 두 하향 경로 동일 규약 패턴 (5/27 직전 → 5/29 정착 완료)
type: thought
created: 2026-05-27
updated: 2026-05-29 정착 완료 — 5/27 "정착 직전" → 5/29 "정착 완료" / 32 시험 카드 + 4 자동화 모듈 + 17 PASS + EVT 1.75초 + 수신율 99.1% + 디버그 사이클 3분 + 월 7,200대 캐파 + 5채널 영업 가치 실측 carry
tags: [thought, revita, IQC자동화, DUT-다중, 브리지-단일, Flask-Web-5010, AUTO모드, link_v2_test_tower, kc_cert_link_v2, kc_cert_tower, BLE-pairing-L2, 두-하향-경로-동일규약, 회귀시험자동화, n8n-cron, 위시캣-사례연구, uttechome-제품신뢰도, 한림용인CC-IQC-확장, 시공자산화, 정착완료-2026-05-29, 32시험카드, 17PASS, EVT-1.75초, 수신율-99.1%, 디버그사이클-3분, 월7200대-캐파, I2C핀충돌-RAK4631, PyMuPDF]
links: [revita, shield, ai-direction, projects, 양산제품, 위시캣활동, 한림용인cc-고가수조, 2026-05-12_원격모니터링-사업라인, 2026-05-20_rtuRemocon-shield-n8n-시공자산화, 2026-05-29_revita-IQC-5채널-실측-carry]
---

# revita IQC 자동화 인프라 — DUT 다중 + 브리지 단일 + 두 하향 경로 동일 규약 패턴

## 2026-05-29 정착 완료 표시 ⭐⭐⭐⭐

5/27 박제 "정착 직전" → 5/29 ingest #12 완료 시점 **정착 완료** 박제. 본 thought 4축 패턴이 **실제 시험 풀스택**으로 정착:

| 항목 | 5/27 박제 (정착 직전) | **5/29 정착 완료 (실측)** |
|---|---|---|
| 시험 카드 | 0 | **32** (test_kc_v2/ 22 + newTest/ 10) |
| 자동화 모듈 | 계획만 | **4 .py** (proto_kc2 + tc_kc_01 + tc_kc_l2 + tc_kc_20) |
| JSON 증적 | 0 | **4건** + reports/ 구조 |
| PASS 누적 | 0 | **17 PASS** (test_kc_v2 11/12 + newTest 6/10) |
| EVT 수신 시간 | 미측정 | **1.75초** (예상 5~15초보다 3~8× 빠름) |
| 수신율 | 미측정 | **99.1%** (2분 윈도우, 68 EVT) |
| 디버그 사이클 | 미측정 | **3분** (FAIL → 재실행 → PASS) |
| MVP 시점까지 | 예상 3~4일 | **약 3시간 (32× 빠름)** |
| 양산 캐파 | 추정 월 3,000대 | **월 7,200대** (모드 A, 실측 2× 상향) |

### 신규 운영 노하우 (gotcha 박제)

1. **RAK4631 I2C 핀 충돌** — I2C0(P0.13/14)·I2C1(P0.24/25)이 Valve/Buzzer와 충돌 → overlay disable 필수. [[gaps]] § "RAK4631 I2C 핀 충돌" 박제.
2. **외부 J-Link 프로그래머 운영 패턴** — RAK4631 자체 J-Link OB 대신 별도 pca10056 SW9 외부 타깃 + `JLinkExe -SelectEmuBySN <SN>` 직접 호출. 양산 jig 적용 가능.
3. **PyMuPDF 도입** — 회로도 v3 21페이지 PNG 변환 + 인스턴스 카운트 분석 (reportlab 생성 + PyMuPDF 분석 풀스택).

자세히 [[revita]] § 5/29 정착 + [[2026-05-29_revita-IQC-5채널-실측-carry]] + [[strengths]] § 9 양산 IQC 자동화 인프라 풀스택.

---

## 한 줄

revita ingest #10/#11 흡수에서 발견한 **양산 IQC 자동화 풀스택 패턴**: link_v2_test_tower (LoRa 게이트웨이 + Host Web :5003) + kc_cert_link_v2/bridge_app (Flask Web :5010 + AUTO 자동 진입) + kc_cert_tower (PC 브리지 공유). **DUT 다중 + 브리지 단일** + **두 하향 경로 (LoRa + LTE/MQTT) 동일 `bool` 규약** + **BLE pairing 표준 L2 + user 토글**. 양산 검사 자동화 인프라 carrier = 위시캣 사례연구 / uttechome 제품 신뢰도 / 한림용인CC IQC 확장 / shield-claude RPi 자동화 / n8n-claude 다중 path 자동화 5채널 매칭.

## 4축 패턴 박제

### 축 1: DUT 다중 + 브리지 단일 ⭐⭐⭐

`kc_cert_link_v2/bridge_app` 하나로 링크(`kc_cert_link_v2`) + 타워(`kc_cert_tower`) 두 DUT 시험 (KCT=KC2 와이어 동일).

**일반화**:
- 양산 라인 단순화 = PC 브리지 하드웨어 1대로 multi-DUT 검사
- shield-claude RPi 자동화 carry-over: RPi 1대가 multi-DUT (sensor + valve + tower) 동시 검사
- n8n-claude 자동화 carry-over: 1 워크플로우가 multi-DUT 시나리오 + ACK 일관성 검증

### 축 2: 양산 IQC 자동화 인프라 (Flask Web :5010 + AUTO 모드) ⭐⭐⭐

- **Flask Web :5010** = IQC 시험 UI 후보 (`kc_cert_link_v2/bridge_app`)
- **AUTO 모드 자동 진입** = 전원 인가 즉시 X축 5초 교대 + 배터리/RS485/리프 주기 EVT
- 다운링크 **최소만 처리** (AUTO + VALVE STOP만, 그 외 UNSUPPORTED) = 안전 강화
- 빌드 프로파일 3종 (FULL / BLE_ONLY / RS485_ONLY) = 양산 라인 분기

**myWiki 매칭**:
- **uttechome 영업 자료**: "양산 IQC 자동화 = 제품 신뢰도 증빙 = 영업 결정타"
- **위시캣 사례연구**: 펌웨어 품질 트랙 자산 (단순 RF Replay → 운용 가능 제품)
- **한림용인CC IQC 확장**: 5/12 시공 트랙 → IQC 풀스택 확장 후보 (Solar 모니터 같은 Flask + Chart.js 패턴)
- **revita 5/20 RS485 센서 수입검사** + **5/21 회로물 5종 계획서** + **5/22 link_v2_test_tower IQC** = "IQC 자동화 풀스택" 시계열 누적

### 축 3: 두 하향 경로 (LoRa + LTE/MQTT) 동일 `bool` 규약 ⭐⭐

Tower 펌웨어 정본 (`entity-module-lifecycle` ingest #10 채택):
- 두 하향 경로 모두 동일 `bool` 규약
- 상향 송신 분리 API (`lora_module_enqueue_tx` vs `lte_module_enqueue_tx`)
- 게이트웨이 모드 LoRa = Tower 전용 모듈 (LTE/SBC/MCP, `module_type` 니블 없음)

**일반화**:
- 다중 통신 경로 (LoRa / LTE / WiFi / BLE / Ethernet) 동일 인터페이스 규약 = 양산 신뢰성 + 검사 단순화
- shield-claude RPi 응용 carry: RPi 1대가 LoRa + LAN 2 경로 동일 인터페이스 hub
- n8n-claude 자동화 carry: 단일 워크플로우로 다중 경로 분기 처리

### 축 4: BLE pairing 표준 L2 + user 토글 ⭐

link_v2 / kc_cert_tower 동일 BLE pairing L2 코드 **사본**:
- L2 bondable + user 토글 = 양산 BLE 워크플로우 표준
- 페어링 자동화 시나리오 (n8n-claude 매칭)

**일반화**: 양산 BLE 워크플로우 정본화 → 다른 BLE 제품 (AI FanStick / uttechome BLE / shield RPi BLE) carry-over.

## 사업 가치 매트릭스 (myWiki 5채널 매칭)

| 채널 | 매칭 사례 | 영업 카피 |
|---|---|---|
| **uttechome 영업** | 양산 IQC 자동화 풀스택 | "단순 RF Replay 데모 → 운용 가능 제품 (IQC 자동화 검증)" |
| **위시캣 사례연구** | link_v2_test_tower 회귀 시험 자동화 | "1분 자동 시험 + Web PASS/FAIL + CI 통합" 펌웨어 품질 트랙 자산 |
| **한림용인CC IQC 확장** | Flask Web :5010 + AUTO 모드 | Solar 모니터 (Flask + Chart.js) + IQC 자동화 = 시공 풀스택 확장 |
| **shield-claude RPi 자동화** | DUT 다중 + 브리지 단일 패턴 | RPi 1대가 multi-DUT (sensor + valve) 동시 검사 |
| **n8n-claude 다중 path 자동화** | 두 하향 경로 동일 규약 + BLE pairing 표준 | 단일 워크플로우로 다중 통신 경로 분기 + 페어링 자동화 |

## KC 인증 후속 시험 트랙 분리 ⭐

- 옛 `entity-kc-cert-link-app` (deprecated 후보)
- 신규 `entity-kc-cert-link-v2` (안전 강화 + 다운링크 최소만 + AUTO 모드 자동 진입)
- 5/19 EMI fail 대응 (사용자 결정 4건 대기) 후 본 트랙 사용 확정 시 옛 entity 전환

→ KC 인증 후속 시험 자산화 = uttechome 영업 자료 (제품 신뢰도 + EMI 대응 후속 시험 능력) 영업 결정타.

## tower_DK deprecated (단순화 가치 박제)

- 기존 SBC 토글 단독 앱 ([[entity-tower-dk]]) → kc_cert_tower KCT_CMD_SBC_ACTIVE 명령으로 흡수
- 디렉토리 완전 제거 (-587줄, commit `0da632f2`)
- historical 보존 (audit trail)
- 신규 작업 reference 시: entity-link-v2-test-tower (LoRa 게이트웨이) / entity-tower-sbc (브링업 정본) / entity-kc-cert-tower (SBC active 명령) 안내

**일반화**: 기능 분산된 entity 통합 → 단순화 가치 박제 (다른 vault 유사 deprecated 패턴 carry).

## 매칭 패턴 (revita ↔ multi-agent 5건)

| revita 자산 | multi-agent 매칭 | carrier 효과 |
|---|---|---|
| link_v2_test_tower (회귀 시험 자동화) | shield-claude (RPi 자동화) | 펌웨어 빌드 → 1분 자동 검증 |
| kc_cert_link_v2 / kc_cert_tower (DUT 다중 + 브리지 단일) | shield-claude / n8n-claude | multi-DUT 단일 워크플로우 |
| Tower 펌웨어 정본 (두 하향 경로 동일 규약) | n8n-claude (다중 path 분기) | 단일 인터페이스 carry |
| BLE pairing L2 (link_v2 + kc_cert_tower 사본) | ai-fanstick (BLE 페어링) | 양산 BLE 워크플로우 표준 |
| Solar Monitor (revita) | uttechome (원격 모니터링) + 한림용인CC (Solar 모니터) | Flask + Chart.js + INA219 인프라 carry |

## 본 vault 의미

- ⭐ **양산 IQC 자동화 풀스택 carrier** — Flask Web :5010 + AUTO 모드 + DUT 다중 + 브리지 단일 4축 박제 → uttechome 영업 자료 + 위시캣 사례연구 + 한림용인CC 확장 직접 활용
- ⭐⭐ **revita 단순 RF Replay 데모 → 운용 가능 제품 진화** — 5/15 rtuRemocon end-to-end + 5/22 link_v2_test_tower + 5/27 kc_cert_link_v2/kc_cert_tower = 영업 카피 격상
- **KC 인증 후속 시험 트랙 분리** — 안전 강화 (다운링크 최소만) + EMI fail 대응 후속 시험 자산화 후보 (uttechome 측)
- **BLE pairing 표준 L2** — 양산 BLE 워크플로우 정본화 (ai-fanstick / uttechome / shield RPi 다른 BLE 제품 carry)

## 관련 페이지

- [[revita]] — 본 thought 단일 source (5/28 ingest #10/#11 흡수 § 박제)
- [[shield]] — RPi 자동화 DUT 다중 carry-over
- [[양산제품]] — 양산 신뢰성 증빙 자산
- [[위시캣활동]] — 펌웨어 품질 트랙 영업 자산
- [[한림용인cc-고가수조]] — Solar 모니터 인프라 + IQC 확장
- [[2026-05-12_원격모니터링-사업라인]] — Solar Monitor Web UI 정본화 매칭
- [[2026-05-20_rtuRemocon-shield-n8n-시공자산화]] — 통합 제어 시스템 격상 시계열
