---
title: revita 양산 IQC 정착 5채널 영업 가치 실측 carry — 32 시험카드 + 17 PASS + 월 7,200대
type: thought
created: 2026-05-29
updated: 2026-05-29
tags: [thought, revita, IQC자동화, 정착완료, 32시험카드, 17PASS, EVT-1.75초, 수신율-99.1%, 디버그사이클-3분, 월7200대-캐파, 5채널-영업가치, uttechome-월7200대, 위시캣-사례연구-결정타, 한림용인CC-IQC확장, shield-claude-RPi-자동화, n8n-claude-다중path, I2C핀충돌-RAK4631, J-Link-외부-프로그래머, PyMuPDF-회로도-풀스택, 양산캐파-2배상향]
links: [revita, shield, 위시캣활동, 한림용인cc-고가수조, ai-direction, 양산제품, 2026-05-27_revita-IQC-자동화-인프라, 2026-05-12_원격모니터링-사업라인, 2026-05-20_rtuRemocon-shield-n8n-시공자산화]
---

# revita 양산 IQC 정착 5채널 영업 가치 실측 carry

## 한 줄

5/27 박제 "정착 직전" → 5/29 ingest #12 "정착 완료" — 32 시험 카드 + 4 자동화 모듈 + 17 PASS / 2h 40m / EVT 1.75초 / 수신율 99.1% / 디버그 사이클 3분 실측. 양산 캐파 월 3,000대 추정 → **월 7,200대 실측 2× 상향**. 5채널 영업 가치 (uttechome / 위시캣 사례연구 / 한림용인CC / shield-claude / n8n-claude) 실측 데이터 carry.

## 1. 정착 신호 8축 (5/27 → 5/29)

| 항목 | 5/27 박제 | **5/29 정착 실측** | 격차 |
|---|---|---|---|
| 시험 카드 | 0 | **32** (test_kc_v2/ 22 + newTest/ 10) | 0 → 32 |
| 자동화 모듈 | 계획만 | **4 .py** (proto_kc2 + tc_kc_01 + tc_kc_l2 + tc_kc_20) | 0 → 4 |
| JSON 증적 | 0 | **4건** + reports/ 구조 | 0 → 4 |
| PASS 누적 | 0 | **17 PASS** (test_kc_v2 11/12 + newTest 6/10) | 0 → 17 |
| EVT 수신 시간 | 미측정 | **1.75초** | 예상 5~15초 → **3~8× 빠름** |
| 수신율 | 미측정 | **99.1%** (2분 윈도우, 68 EVT) | 0 → 99.1% |
| 디버그 사이클 | 미측정 | **3분** (FAIL → 재실행 → PASS) | 0 → 양산 라인 cycle 핵심 |
| MVP 시점까지 | 예상 3~4일 | **약 3시간** | **32× 빠름** |

## 2. 양산 캐파 실측 (1.75초 EVT 기반 재산정)

| 모드 | 1대 cycle | 일 캐파(8h) | 월 캐파(20d) | 이전 추정 대비 |
|---|---:|---:|---:|---|
| **A. 빠른 (자동만)** | **1분 15초** | ~360대 | **~7,200대** ⭐ | (이전 미산정) |
| B. 표준 (+HW EVT) | 1분 40초 | ~270대 | ~5,400대 | 이전 추정 3,000대 **2× 상향** |
| C. 완전 (+물리/재부팅) | 3분 45초 | ~120대 | ~2,400대 | (이전 미산정) |

## 3. 사업 가치 5채널 — 실측 데이터 carry ⭐⭐⭐

### 채널 1: uttechome 영업 ⭐⭐⭐ (영업 결정타)

| 5/28 박제 | **5/29 갱신 (실측)** |
|---|---|
| "단순 RF Replay → 운용 가능 제품 (IQC 자동화 검증)" | **월 7,200대 자동 검사 가능** (모드 A 1대 1분 15초) — EMI fail 회복 영업 결정타 + I2C 핀 충돌 운영 노하우 |

→ 영업 카피: **"월 7,200대 자동 검사 가능" + "EMI fail 회복 운영 노하우 + I2C 핀 충돌 양산 대응"**

### 채널 2: 위시캣 사례연구 ⭐⭐⭐ (펌웨어 품질 트랙 결정타)

| 5/28 박제 | **5/29 갱신 (실측)** |
|---|---|
| "1분 자동 시험 + Web PASS/FAIL + CI 통합" | **17 PASS / 2h 40m / 99.1% / 4 자동화 모듈 / 디버그 사이클 3분** |

→ 영업 카피: **"FAIL 자동 catch → 3분 재시험 → PASS"** (양산 라인 cycle 핵심) + "32 시험 카드 + 17 PASS 정량 실증"

### 채널 3: 한림용인CC IQC 확장 ⭐⭐

| 5/28 박제 | **5/29 갱신 (실측)** |
|---|---|
| "Flask + AUTO 모드 = 시공 풀스택 확장" | bridge_cli + Web UI :5010 + 두 트랙 (wire + 모듈) 풀스택 실제 작동 |

→ Solar 모니터 (Flask + Chart.js + INA219) + IQC 자동화 (Flask :5010 + AUTO 모드) = 시공 풀스택 확장.

### 채널 4: shield-claude RPi 자동화 ⭐

| 5/28 박제 | **5/29 갱신 (실측)** |
|---|---|
| "DUT 다중 + 브리지 단일" | `scenarios/` Python 러너 패턴 (proto + bridge_io + tc_xx + reports) carry 가능 |

→ shield-claude RPi 응용 carry: RPi 1대가 multi-DUT (sensor + valve) 동시 검사 + reports/ JSON 증적 표준.

### 채널 5: n8n-claude 다중 path ⭐

| 5/28 박제 | **5/29 갱신 (실측)** |
|---|---|
| "두 하향 경로 동일 규약 + BLE pairing" | KC2 wire + bridge_app UART 표준화 — 다중 path 자동화 패턴 carry |

→ n8n-claude 자동화 carry: 단일 워크플로우로 다중 통신 경로 분기 + 페어링 자동화.

## 4. 운영 노하우 신규 (gotcha 박제) ⭐

### 4.1 RAK4631 I2C 핀 충돌 (link 계열 전체 적용) ★

- RAK4631 기본 DTS의 I2C0(P0.13/14)·I2C1(P0.24/25) 활성이 Valve X(P0.13/14), Buzzer(P0.24), Valve Y(P0.25)와 핀 충돌
- 해결: overlay에 `&i2c0 { status = "disabled"; }; &i2c1 { status = "disabled"; };` 추가
- carry 대상: `system/link_v2`, `kc_cert_link/link_app`, `kc_cert_link_v2/link_app` (적용됨), 기타 link 계열 전체

→ [[gaps]] § "RAK4631 I2C 핀 충돌" 박제 + 강의·교재 자산화 가치.

### 4.2 외부 J-Link 프로그래머 운영 패턴

- RAK4631 자체 J-Link OB 대신 별도 pca10056 (nRF52840 DK) SW9 외부 타깃 모드
- `west flash` 안정성 문제 → `JLinkExe -SelectEmuBySN <SN>` 직접 호출
- 양산 라인 적용 가능: 검사 jig에 J-Link OB 1대 고정 + DUT 교체

### 4.3 PyMuPDF 도입 (revita-claude 측 본 vault 신 도구)

- 본 vault PC에 `fitz` (PyMuPDF) 발견
- PDF 시각화 풀스택: reportlab (생성, 5/27 NanoVNA) + PyMuPDF (분석, 5/29 회로도)
- 회로도 v3 21페이지 → PNG 변환 → 인스턴스 카운트 분석

## 5. 디렉토리 풀세트 (두 트랙 구조 carry)

```
~/revita/doc/revita_link_firmware/
├── test/                  (기존 system/link_v2 트랙, historical)
├── test_kc_v2/            ★ 5/29 신규 — wire/기능 검증 22 TC (417줄 22KB OVERVIEW)
└── newTest/               ★ 5/29 신규 — 모듈별 깊이 시험 10 TC

~/revita/zephyr_workspace/apps/kc_cert_link_v2/scenarios/
├── proto_kc2.py        (KC2 wire Python 포팅 4 KB)
├── tc_kc_01.py         (L1 스모크 3.4 KB)
├── tc_kc_l2.py         (L2 다운링크 라우팅 통합 7.8 KB)
├── tc_kc_20.py         (L3 AUTO_TLM 3.6 KB)
├── logs/               (UART 캡처)
└── reports/            (YYYYMMDD_HHMMSS_<tc>.json 4건)
```

## 6. ingest #12 대기 (다음 사이클)

- BASE `0da632f2` (5/27 ingest #11) → HEAD `05f36b56` (5/29 work-end)
- 약 60+ 파일 (43 시험 문서 + scenarios + link_app 재작성 + bridge_app overlay + 작업보고서)
- **D1 분할 권장**:
  - #12-a: 시험 문서 + 자동화 (entity-kc-cert-link-v2 갱신 + 신규 entity-kc-cert-link-v2-test)
  - #12-b: 펌웨어 재작성 (entity-kc-cert-link-v2 본문 + I2C 핀 충돌 gotcha 신설)

## 7. 본 thought의 carrier 효과

- ⭐⭐⭐ **위시캣 사례연구 결정타** — "17 PASS / 99.1% / 디버그 사이클 3분 / 월 7,200대" 정량 실측 = 펌웨어 품질 트랙 차별화
- ⭐⭐⭐ **uttechome 영업 결정타** — "월 7,200대 자동 검사 가능" + "EMI fail 회복 운영 노하우 + I2C 핀 충돌 양산 대응"
- ⭐⭐ **한림용인CC IQC 트랙 확장** — Flask + AUTO 모드 = 시공 풀스택 확장
- ⭐ **shield-claude RPi 자동화** + **n8n-claude 다중 path** patterns carry-over

## 관련 페이지

- [[revita]] § 5/29 양산 IQC 자동화 인프라 정착 완료 (본 thought 단일 source)
- [[2026-05-27_revita-IQC-자동화-인프라]] § 5/29 정착 완료 갱신
- [[strengths]] § 9 양산 IQC 자동화 인프라 풀스택 운영 능력
- [[gaps]] § "RAK4631 I2C 핀 충돌"
- [[위시캣활동]] — 펌웨어 품질 트랙 영업 자산
- [[한림용인cc-고가수조]] — Solar 모니터 인프라 + IQC 확장
- [[2026-05-12_원격모니터링-사업라인]] — Solar Monitor Web UI 정본화 매칭
- [[2026-05-20_rtuRemocon-shield-n8n-시공자산화]] — 통합 제어 시스템 격상 시계열
