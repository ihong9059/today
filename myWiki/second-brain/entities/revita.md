---
title: REVITA
type: entity
created: 2026-04-19
updated: 2026-06-04 (노지관리 신사업 본격 진입 결단 + `노지관리Wiki/` vault 분리 — revita-claude 카드 003+004 흡수 / 박제 위치 `노지관리Wiki/entities/entity-satellite-fusion` 참조 / cross-vault 참조 규약 `[[revita:]]` `[[mywiki:]]` `[[노지관리:]]` 정착 / 결정 40)
tags: [프로젝트, IoT, 펌웨어, LoRa, Zephyr, CC1101, Sub-GHz, BLE-LR, Solar, revitaProject, rtuRemocon, Modbus, 산업통합제어, link_v2_test_tower, 회귀시험자동화, kc_cert_link_v2, kc_cert_tower, KC인증통합트랙, BLE-pairing-L2, DUT-다중-브리지-단일, IQC자동화, Flask-Web-5010, tower_DK-deprecated, 두-하향-경로-동일-규약, 펌웨어모듈-단일진실, 위성-원격탐사, 노지관리-신사업, 농림위성, 마이크로매크로-fusion, vault분리, 사업단위vault, carrier역량]
links: [claude-code, experience, projects, skills, tailscale네트워크, 양산제품, 위시캣활동, rtu-remocon, shield, 한림용인cc-고가수조, aisg, 영업전략, 정부R&D실증사업, 2026-05-27_revita-IQC-자동화-인프라, 2026-06-03_위성-원격탐사-노지관리-신사업, 2026-06-04_노지관리-신사업-본격진입]
---

# REVITA

## 한 줄 정의
IoT 장비 프로젝트. LoRa 무선 통신 + RS485 유선 통신 + KC 인증 대응. **위시캣 수주 (#153090)**. **6/3 결단**: revita LoRa 양산 자산 + 위성 원격탐사 fusion → 노지 관리 신사업 검토 trigger. **6/4 결단**: 노지관리 신사업 본격 진입 + `application/노지관리Wiki/` vault 분리 (사업 단위 = vault 단위).

## 2026-06-04 — 노지관리 신사업 본격 진입 + `노지관리Wiki/` vault 분리 ⭐⭐⭐ (revita-claude 카드 003 + 004 megasession 흡수)

사용자 명시 결단 (2026-06-03) "다음 사업분야 검토" → revita 측 사업 자산화 박제 완료 통보 (카드 003) + 노지관리 신사업 자산을 신규 vault `application/노지관리Wiki/` 분리 통보 (카드 004). myWiki 측 박제 위치 = **`노지관리Wiki/` 참조** (revitaWiki 아님).

### `application/노지관리Wiki/` 신규 vault 분리

```
application/노지관리Wiki/
├── SCHEMA.md              (cross-vault 참조 규약 + 사업 자산화 분리 정책)
├── overview.md            (3단 결합 carrier + 차별화 5 + Phase 0~3)
├── entities/entity-satellite-fusion.md          ← revitaWiki에서 이전
├── direction/eval-노지관리-신사업.md             ← revitaWiki에서 이전
├── progress/  carriers/  research/  poc/  business/  improvement/  작업보고서/
```

**분리 사유**: ① `application/` 사업 응용 분류 정책 (5/12 박제) ② 사업 단위 박제 일관성 (revitaWiki = H/W 기술 / 노지관리Wiki = 위성 노지 사업) ③ Phase 1~3 자료 누적 위치 사전 정착 ④ 본업 명확화.

### cross-vault 참조 규약 신설 (다중 vault 운영 표준)

| 형식 | 의미 |
|---|---|
| `[[revita:entity-link]]` | revitaWiki entity 인용 |
| `[[mywiki:revita#노지-관리-신사업]]` | myWiki 사업 자산 인용 |
| `[[노지관리:entity-satellite-fusion]]` | 노지관리Wiki entity 인용 (신규) |
| `[[entity-satellite-fusion]]` | 동일 vault 내 (prefix 생략) |

본문 wikilink: prefix 생략 자유. frontmatter `links:`: prefix 명시 (정본).

### 사업 가설 (한 줄)

> "위성 광역 영상 (Sentinel-2/3, 농림위성 2026 발사) + 지상 LoRa 노드 (revita 양산 자산) + ESP32-P4 CNN 엣지 추론 (ai-direction §결정 31) = **농지 마이크로 calibration + 매크로 정찰 통합 SaaS**"

### 차별화 5 (CropX/Climate FieldView 대비)

1. **지상 IoT 양산 자산** — 경쟁 SaaS 부재 영역
2. **Solar 자가발전 무인 운영** — 인프라 부재 노지 진입 결정타 (한국 농업 환경 우위)
3. **Modbus 자동 처방 폐회로** — 권고 SaaS → 자동화 SaaS 진화
4. **KC 인증 + 정부 R&D 자격** — 국내 시장 진입 자격 ([[strengths]] §12 인증 매니지먼트)
5. **농림위성 발사 timing** — 한국 사업자 호기 (2026 발사 예정)

### revita 자산 결합 carrier (vault 분리 후 stub 참조)

| revita entity | 결합 가치 | 노지관리Wiki 본본 |
|---|---|---|
| `entity-link` | 지상 ground truth 양산 자산 (7,200대/월) | ⭐⭐⭐ 본 사업 핵심 자산 |
| `entity-solar-monitoring` | 무인 노지 운영 결정타 (인프라 부재) | ⭐⭐⭐ 경쟁 SaaS 미진입 영역 |
| `entity-rtu-remocon` | Modbus 자동 처방 폐회로 | ⭐⭐ 차별화 핵심 |
| `entity-tower-sbc` | ESP32-P4 영상 노드 진화 trigger | ⭐⭐ ai-direction §결정 31 진입점 |

### trigger 후보 (active 모니터링 — 양 vault 동시)

| trigger | action |
|---|---|
| 농진청/농어촌공사 R&D 공고 발견 | 노지관리Wiki business/ 입찰 자료 준비 + strengths §12 활용 |
| 위시캣 농업 IoT+위성 fusion 모집 | wishket-claude cross-매칭 + 결정 34 확장 |
| 농림위성 (2026) 발사·공개 시점 | revita LoRa 양산 자산 연계 PoC 결단 |
| ESP32-P4 채택 결정 (Core3506 대체) | 영상 노드 진화 trigger (entity-satellite-fusion §시너지 매트릭스 활성화) |
| 데이터 사이언티스트 협력 발견 | NDVI 처방 모델 검증 진입 |

자세히 [[ai-direction]] § 결정 40 + [[aisg]] § 위성 fusion 결합 carry 확장 + [[strengths]] § 13 신사업 결합 carrier 역량 + [[영업전략]] § 노지 진입 carry + [[2026-06-04_노지관리-신사업-본격진입]] (신규 thought).

---

## 2026-06-03 — 위성 원격탐사 + LoRa fusion 노지 관리 신사업 검토 trigger ⭐⭐⭐ (사용자 결단 + mywiki → revita 카드 #2026-06-03-001 발송)

## 2026-06-03 — 위성 원격탐사 + LoRa fusion 노지 관리 신사업 검토 trigger ⭐⭐⭐ (사용자 결단 + mywiki → revita 카드 #2026-06-03-001 발송)

사용자 (홍광선) 도메인 질의 ("인공위성 영상으로 곡물/지형 온도·작황 측정 서비스") → mywiki-claude 답변 → **사용자 결단**: "이 data를 이용하여 노지의 관리를 위한 방안을 추구하도록 알려주세요. 다음 사업분야를 검토할려고 합니다." → revita-claude 카드 발송 (broker 양방향) + 본 vault 박제.

### revita 자산 + 위성 fusion 시너지 (사업 검토 대상)

| revita 자산 | 위성 결합 | 노지 관리 본질 |
|---|---|---|
| **LoRa 센서 노드 양산** (지상 ground truth) | Sentinel-2 NDVI / Sentinel-3 LST / **농림위성 2026 발사** | **위성 매크로 + 지상 마이크로 fusion = 정밀 노지 관리** ⭐⭐ |
| **Sub-GHz BLE-LR 통신** | Google Earth Engine 클라우드 + 지상 distribution | 농가 마지막 1km 배달 인프라 |
| **Solar 자가발전** | 위성 매주 / 지상 매일 | 인프라 부재 노지 무인 운영 결정타 |
| **KC 인증 통합 트랙** | 양산 단가 분석 가능 | 정부 R&D (농진청/농어촌공사) Tier 3 트랙 |
| **rtuRemocon Modbus 제어** | 위성 → 결정 → Modbus 출력 (관수·시비·차광) | **위성 → 결정 → 노지 행동 폐회로** ⭐⭐ |

### 사업 진입 시나리오 매트릭스

| 진입 형태 | 적합도 | 시작 timing |
|---|:-:|---|
| 농진청 / 농어촌공사 정부 R&D | ⭐⭐ | 공고 발견 시 |
| **지상 LoRa IoT + 위성 fusion SaaS** | ⭐⭐⭐ | **농림위성 2026 발사 시점** |
| Google Earth Engine + Python SaaS | ⭐ | 즉시 (Python 양산 자산) |
| 위시캣 위성 분석 외주 | ⭐ | 매칭 시 |

### 시장 타이밍 결정타

- **농림위성 (차세대중형위성 4호) 2026년 발사 예정** + revita LoRa 양산 자산 = **동시 활용 가능 시점** ⭐
- 결정 31 (ESP32-P4 CNN 영상 추론, 6/2 야간) + 본 결정 35 = **3차원 데이터 통합** (지상 metric + 영상 + 위성)

### revita 측 카드 발송 (broker 양방향)

`C:\todo\revitaProject\_inbox\pending\2026-06-03-001-satellite-remote-sensing-agriculture-cross-link.md` — type: request, ack_required: true. revita-claude 다음 work-start 시 인지 → 사업 검토 사이클 진입 권고.

자세히 [[ai-direction]] § 결정 35~36 + [[aisg]] § 2026-06-03 위성 결합 + [[2026-06-03_위성-원격탐사-노지관리-신사업]] (신규 thought) + [[영업전략]] § 신사업 검토 carry.

---

## 2026-06-02 야간 ingest #15 + 배터리 인증 흡수 — TC-21 후속 + Tower SBC 대체 보드 조사 + 인증 매니지먼트 단계 진입 ⭐⭐⭐ (revita-claude 카드 #2026-06-02-003)

**한 줄**: 2건 통합 = ① ingest #15 (BASE `87174e2a` → HEAD `d11b0ff4`, 3 commits / 4 파일 / +387/-16, 단일 영역 newTest/) + ② 배터리 인증 양산 게이트 (사용자 도메인 질의 후속 박제, ingest 아님). 갱신 entity 2건 (link-v2 / tower-sbc) + revita 측 신규 entity 1건 (battery-cert). 위험 carry 9건 → 양산 RA 15 → 24. 결정 29~31 신규.

### ingest #15 — TC-21 후속 + Tower SBC 대체 보드 조사

**갱신 entity 2건** (revita 측):

| entity | § | 핵심 |
|---|---|---|
| `entity-link-v2` | §TC-21 후속 — CONFIG 순서 정본화 + qty=3 실측정값 reg1 | **CONFIG_CREATE 는 SESSION_OFF 일 때만 허용** (`sensor_module.c:1287`), SESSION_ON 에서 silent reject. qty=3 변경 시 `collect_status=0x31`, reg1=0x0108 (264) 실측정값. DATA PDU 정본 갱신. TC-21 판정 누적 5회 |
| `entity-tower-sbc` | §대체 보드 후보 조사 — JC-ESP32P4-M3-DEV | Core3506 (RK3506B/Linux/$17) vs ESP32-P4+C6 (FreeRTOS/$14). 장점 6 (RS-485/Ethernet/WiFi/MIPI-CSI+ISP/H.264/CNN + 부팅 1~2s + $3 절감) + 우려 5 (Linux→RTOS 포팅 + RAM 32MB + 전원 + BSP + C6 의존). **채택 미결정 carry** |

**위험 carry 4건** ([[gaps]] RA #16~19): CONFIG 순서 silent reject / 센서 qty 양 트랙 통일 / 센서 레지스터 맵 미확정 / Tower SBC 대체 결정.

### 배터리 인증 양산 게이트 (사용자 도메인 질의 후속)

**사용자 질의**: *"battery로 구동되는 제품인데, kc인증에서 배터리 관련사항은 test하지 않아도 되나요?"* — revita-claude 도메인 권고 정리 + 양산 게이트 박제.

**KC 인증 5 범주 매트릭스** (현 KC 트랙과 직교):

| 범주 | 배터리 직접 시험? | 현 entity-kc-cert family |
|---|:-:|:-:|
| KC EMC (5/19 RE fail 회복) | ❌ | ⭕ |
| KC RF (LoRa SRD) | ❌ | ⭕ |
| **KC 62133 (셀 안전)** | ⭕ 필수 | ❌ (트랙 부재) |
| **충전기 KC (솔라/외부)** | ⭕ 조건부 | ❌ (트랙 부재) |
| **UN38.3 (운송)** | ⭕ 필수 | ❌ (트랙 부재) |

**revita 측 신규 entity**: `entity-battery-cert` (~210줄). 양산 출하 게이트 5건 ([[gaps]] RA #20~24).

**분기점** (양산 BOM 의사결정 트리 최상위):
- 셀/팩 외부 인증품 구매 → 완제품 측 시험 면제 (인증서 보관만)
- 자체 셀 조립 + PCM 직접 설계 → 자체 인증 필요 (KTL/KTC, 비용 수백~수천만원, 8~12주)

**위키 누락 carry** (사용자 결정 후 박제 필요):
- 사용 셀/팩 모델 (Link / Tower 각각)
- KC 62133 + UN38.3 인증서 보유 여부
- PCM 보호회로 구조 (자체 vs 셀 인증서 포함)
- 솔라 충전회로 완제품 내장 여부 + 회로 구조 (MPPT/PWM)
- Tower 측 배터리 (Link 와 동일 셀?)
- 양산 BOM 의 배터리·충전 부품 항목

### 매칭 패턴 (myWiki 흡수 결과)

1. **인증 트랙 분리 일반화** → strengths.md §12 인증 매니지먼트 역량 신설 (KC 5 범주 + 셀 모델 우선 의사결정)
2. **양산 캐파 산정 진입 전 셀 모델 우선순위** → ai-direction §결정 30 (의사결정 우선순위 트리, 다른 양산 진입 프로젝트도 동일 패턴)
3. **ESP32-P4 CNN 가속 신사업 carry** → ai-direction §결정 31 + [[aisg]] § ESP32-P4 carry (AI + 농업 IoT, 영상 추론 노드 진화)
4. **CONFIG 순서 silent reject = 운영 절차 자동 검증 단서** → gaps.md § 자동화 가지치기 단서 (kc_cert_link_v2-test 다음 단계)
5. **도메인 권고 박제 패턴 정착** → ai-direction §결정 29 (ingest 외 사용자 도메인 질의 후속 박제, AI ↔ 사용자 양방향 지식 정착)

### 영업 가치 — 인증 매니지먼트 역량 (5채널 carry)

- **uttechome / 위시캣 사례연구 결정타**: "인증 5 범주 분리 + 셀 모델 우선 의사결정" — 다른 1인 컨설팅 대비 단계 격차 (인증 외주 비용/기간 추정 가능)
- **한림용인CC**: 시공 자료 + 인증 자료 + 운영 매뉴얼 단일 doc/ 트리 (결정 27 + 결정 30 결합)
- **AI FanStick / Stage 4 / onDevice**: 배터리 인증 트랙 carry, 셀/팩 모델 결정 = 양산 BOM 의사결정 트리 최상위
- **lemonLabs (AI 응원봉)**: 동일 패턴 — 배터리 내장 제품 인증 매니지먼트 cross-vault carry

자세히 [[strengths]] §12 + [[ai-direction]] §결정 29~31 + [[gaps]] § RA 15→24 + [[aisg]] § ESP32-P4 carry + [[2026-06-02_certification-tracks-matrix]] (신규).

---

## 2026-06-02 ingest #14-A/B 흡수 — link_v2 자체 시험 10/10 + 원본 버그 4건 + 사본 정책 + checklist 정본 격상 ⭐⭐⭐⭐ (revita-claude 카드 #2026-06-02-001)

**한 줄**: ingest #14 (A+B) — BASE `8e6682a5` (#13-D, 6/1) → HEAD `87174e2a` (#14-C, 6/2), 6 commits / +11,794 / -905 / 103 파일. **신규 entity 0건, 갱신 5건** (link-v2 / link-v2-test-tower / tower-test / tower / mqtt-protocol). **link_v2 자체 시험 10/10 PASS** + **원본 버그 4건 발견** (`link_v2_test/` 사본 정책, 원본 미반영 carry) + **체크리스트 디렉토리 위키 정본 동격 격상** (`apps/system/tower/test/` 삭제 → `doc/revita_tower_firmware/checklist/` 8건) + **LTE 단일 게이트** (build/runtime 분리, Static 8/8 PASS).

### 갱신 entity 5건 (revita 측, depth 확장)

| revita entity | 갱신 핵심 | myWiki carry |
|---|---|---|
| `entity-link-v2` | §자체 시험 10/10 PASS + 원본 버그 4건 발견 (5.5/5.6/5.7/5.8) + 사본 정책 | strengths §11 펌웨어 원본 품질 게이트 |
| `entity-link-v2-test-tower` | §v2 와이어 PATCH 11건 (#13-C 후속 fallout) | skills.md v2 마이그레이션 검증 패턴 (carry) |
| `entity-tower-test` | §체크리스트 디렉토리 위키 정본 격상 + LTE 분할 + Static 8/8 PASS | strengths §10 양산 IQC 인프라 자산화 완결 표기 |
| `entity-tower` | §모듈러 재작성 후속 fix (LTE_PDU_SIZE→MQTT_PDU_SIZE 전 모듈 리네임 + K_MSGQ static 제거 + lux_rs485_exchange_begin) | skills.md 정본 식별자 정합 패턴 |
| `entity-mqtt-protocol` | §코드 상수명 정합 (LTE 종속 → MQTT 정본) | skills.md 와이어 정본 식별자 분리 (LoRa LORA_PDU_SIZE vs MQTT MQTT_PDU_SIZE) |

### 원본 link_v2 버그 4건 (사본 검증 → 원본 미반영 carry) ★★

| # | 위치 | 진단 | fix |
|:-:|---|---|---|
| 5 | `sensor_module.c:271` | NVS push chunk `MIN(9U, remain)` → `device_manager_nvs_write_cfg` 가 `n_apply > 8U` 거절 → sensor CFG NVS 쓰기 항상 실패 → CONFIG_END=NVM_FAILED | `MIN(8U, remain)` |
| 6 | `device_manager.c:783,830` | `nvs_write` 반환값 오판 — Zephyr `nvs_write` 미변경 시 `ret=0`. 코드는 `ret == buf_size` 만 성공 | `ret >= 0` |
| 7 | `sensor_module.c:248 + dm_build_factory_blob` | NVS 비어있을 때 sensor CFG `memset(0)` → hmask=0/mmask=0 → CRON 정상 스케줄 불가, 10분 fallback | `sensor_cfg_valid` 에 all-zero 무효 체크 추가 |
| 8 | `rs485.c:290` | wait_rx drain 응답 유실 — TX 완료 직후 응답 첫 1~2B FIFO 도착, drain 루프 폐기 | wait_rx drain 제거 |

→ gaps.md 양산 RA 7~10 박제, 양산 출하 게이트 통과 시점 원본 반영.

### 결정 3건 (ai-direction §결정 26~28 흡수)

1. **결정 26 ★★★ 사본 정책 (Copy + Verify, Then Decide)** — `link_v2_test/` 9K LOC 사본, 양산 출하 게이트 전까지 원본 미반영
2. **결정 27 ★★★ 위키 정본 동격 격상 (doc/ 트리 단일화)** — KC 인증 + 양산 IQC + 운영 매뉴얼 단일 doc/ 트리
3. **결정 28 LTE 단일 게이트** — `lte_build` + `lte_runtime` 분리 + README §LTE 완료 기준 (모듈 간 의존 단일 판정)

### 양산 RA 6 → 15 확장 (gaps.md 갱신)

기존 6건 + 신규 9건 (원본 link_v2 버그 4 + Button/LED carry 2 + v2 마이그레이션 1 + 메타 2) = **15건 양산 출하 게이트**. 강의·교재 자산화 가치 매우 높음 (펌웨어 디버깅 실전 사례).

### 영업 가치 — 양면 IQC 깊이 확장 (5채널 carry)

- **uttechome 영업**: "양산 IQC 자동화 → 양면 IQC → 원본 품질 게이트 + 양산 RA 15 자산화" 3단계 차별화
- **위시캣 사례연구 결정타**: 펌웨어 디버깅 실전 사례 15건 박제 (다른 1인 컨설팅 대비 단계 격차 결정타)
- **한림용인CC IQC 확장**: doc/ 트리 단일화 패턴 — 시공 자료 + 운영 매뉴얼 + 회로도 단일 export
- **shield-claude / n8n-claude**: 사본 정책 + 모듈 간 의존 단일 게이트 패턴 carry

자세히 [[strengths]] §11 + [[ai-direction]] §결정 26~28 + [[gaps]] § 양산 RA 6→15 + [[2026-06-02_copy-verify-decide]] (신규).

---

## 2026-06-01 ingest #13-A 흡수 — Tower 펌웨어 모듈러 재작성 풀세트 + 양면 IQC (Link + Tower) ⭐⭐⭐⭐⭐ (revita-claude 카드 #2026-06-01-003)

**한 줄**: ingest #13-A (BASE `05f36b56` → HEAD `8e6682a5`, 7 commits / +18,468 / -3,282 / 106 파일 중 ~14K LOC tower 분할). **Tower 펌웨어 모듈러 재작성 풀세트 정착** (11 모듈 .c 약 8,900 LOC + 정본 .md 18건 1,950줄 + 자체 시험 7건 1,031줄). LTE stub → 실구현 2,307줄 (RM76 AT). **양면 IQC 단계 진입** (Link 단면 → Link+Tower 양면).

### 신규 entity 4건 (revita 측 → myWiki skills/strengths 흡수)

| revita entity | myWiki 흡수 영역 | 핵심 carry |
|---|---|---|
| `entity-lux-module` (1,123줄) | skills.md § RS485/Modbus 마스터 / § MUX mutex 공유 | RS485 Modbus 슬레이브 0x03/0x04, FC03, MUX mutex 공유 (Lux 양보 / SBC 우선) |
| `entity-mqtt-protocol` (204줄 정본 + 102줄 PDU) | skills.md § MQTT 와이어 프로토콜 설계 / § 토픽 계층 / § LWT | 16B PDU + 4 토픽 + 13 type_code + 메시지 허용 조합 + ACK + NOTIFY + LWT |
| `entity-tower-test` (체크리스트 1,031줄 + Static Review sbc 11/security 12/lux 8 PASS) | strengths.md §10 양면 IQC | Tower 자체 시험 트랙 정착 |
| `entity-lte-module` 갱신 (stub → 2,307줄 RM76) | skills.md § LTE AT 풀스택 / § MQTT 클라이언트 임베디드 | AT 5 STEP + URC + CME + FSM 7 + TX ring 256 DROP_OLDEST + BATCH 10분 |

### 아키텍처 결정 7건 (정본 18 .md 박제 → ai-direction.md / me.md 흡수)

1. **main.c 17줄 단일 책임** — DM 단일 진입점. `tower_create_task` 다중 스레드 직접 생성 폐기
2. **시간 동기 게이트 LTE-먼저 정착** — sync_lost publish 가 MQTT 경로 의존 → LTE 게이트 이전 activate
3. **12V 공유 버스 비트 OR API** — Lux + SBC 공동 사용, 세션 상태 독립
4. **UART1 MUX mutex 협력** — Lux 양보 (mutex K_NO_WAIT 실패 → slot skip), SBC 우선 점유
5. **LoRa AES ECB keystream XOR 채택 (CCM 아님)** — TinyCrypt 기반, 클리어 헤더 4B IV. perf/메모리 trade-off
6. **LTE TX 큐 DROP_OLDEST 256** — 가득 시 relay 우선 evict, 양산 운영 시 데이터 손실 정책 명시
7. **자체 시험 PASS/FAIL/BLOCKED 3단계** — Static Review 별도 박제, 실기 BLOCKED 사유 박제. KC + 양산 IQC 자료 동시 자산화

### 양산 RA 6 carry 위험 (gaps.md § 양산 출하 전 RA 신설 후보)

1. **LTE 미완 4 TODO** (LWT/KMQTTPUB/mTLS/E2E) — RM76 실기 검증 대기, 양산 일정 risk
2. **ADC 배터리 실측 stub** (`power_module.c #if 0`) — 양산 전 반드시 해소, AIN7 분압 ×5.545 박제됨
3. **USB CDC RX handler 미등록** — Core3506 통신 운영 시 즉시 fix 필요
4. **Button LONG 미정의 (≥3000ms)** — 공장 초기화·BLE 페어링 후보 미합의
5. **BLE module 전체 stub** (15줄 LOG only) — OTA·등록·상태 조회 미구현, 양산 페어링 경로 부재
6. **`TOWER_DM_BOOT_TEST` mode 1 양산 빌드 혼입 risk** — auto UPDATE seed 양산 섞이면 sync_lost 가시성 상실

### 영업 가치 — 양면 IQC 5채널 carry

- **uttechome 영업**: "Link 양산 정착 + Tower 양산 정착" 양면 영업 메시지
- **위시캣 사례연구**: Link 17 PASS + Tower 7건 자체 시험 + 정본 .md 18건 → 양산 onboard 시간 단축 근거 결정타
- **strengths.md §10 (양면 IQC) 신설** — 5/29 §9 단면(Link) → 6/1 §10 양면(Link+Tower) 풀스택
- **양면 캐파 산정 단계** — Tower 측 RM76 sourcing + ADC 실측 + USB CDC RX 등 5 BLOCKED 해소 후

### Tower 신규 모듈 통합 비용 명확화 (양산 onboard 자산)

신규 모듈 4 함수 표준화: `_init / _activate / _handle_cmd / _force_session_off` + NVS 표 1줄 + module_type_code 1행 → 통합 비용 명확. 정본 .md 18건 박제 → 신규 합류 인원 onboard 자산.

자세히 [[strengths]] §10 양면 IQC + [[gaps]] § 양산 출하 전 RA + [[2026-06-01_tower-modular-rewrite-iqc-stage2]] (신규) + [[skills]] § RS485/Modbus + MQTT + LTE 추가.

---

## 2026-05-29 양산 IQC 자동화 인프라 정착 완료 흡수 ⭐⭐⭐⭐ (revita-claude 카드 #2026-05-29-002)

5/27 ingest #11 "정착 직전" 상태 → 5/29 "정착 완료" — 실측 데이터 carry로 5채널 영업 가치 활성화.

### 정착 신호 (구체 실측)

| 항목 | 5/27 박제 | **5/29 정착 실측** |
|---|---|---|
| 상태 | "정착 직전" | **정착 완료** ⭐⭐⭐ |
| 시험 카드 | 0 | **32** (test_kc_v2/ 22 + newTest/ 10) |
| 자동화 모듈 | 계획만 | **4 .py** (proto_kc2 + tc_kc_01 + tc_kc_l2 + tc_kc_20) |
| JSON 증적 | 0 | **4건** + reports/ 구조 |
| PASS 누적 | 0 | **17 PASS** (test_kc_v2 11/12 + newTest 6/10) |
| EVT 수신 시간 | 미측정 | **1.75초** (예상 5~15초보다 3~8× 빠름) |
| 수신율 | 미측정 | **99.1%** (2분 윈도우, 68 EVT) |
| 디버그 사이클 | 미측정 | **3분** (FAIL → 재실행 → PASS, 양산 라인 작동 증명) |
| MVP 시점까지 | 예상 3~4일 | **약 3시간 (32× 빠름)** |

### 사업 가치 5채널 — 실측 데이터 carry ⭐⭐⭐

| 채널 | 5/28 박제 | **5/29 갱신 (실측 데이터)** |
|---|---|---|
| **uttechome 영업** ⭐ | "단순 RF Replay → 운용 가능 제품" | **월 7,200대 생산 가능** (모드 A 1대 1분 15초) — EMI fail 회복 영업 결정타 + I2C 핀 충돌 운영 노하우 |
| **위시캣 사례연구** ⭐ | "1분 자동 시험 + Web PASS/FAIL + CI 통합" | **17 PASS / 2h 40m / 99.1% / 4 자동화 모듈 / 디버그 사이클 3분** — 사례연구 결정타 |
| **한림용인CC IQC 확장** | "Flask + AUTO 모드 = 시공 풀스택" | bridge_cli + Web UI :5010 + 두 트랙 (wire + 모듈) 풀스택 실제 작동 |
| **shield-claude RPi 자동화** | "DUT 다중 + 브리지 단일" | `scenarios/` Python 러너 패턴 (proto + bridge_io + tc_xx + reports) carry 가능 |
| **n8n-claude 다중 path** | "두 하향 경로 동일 규약 + BLE pairing" | KC2 wire + bridge_app UART 표준화 — 다중 path 자동화 패턴 carry |

→ **숫자가 영업 카피로 직결**:
- uttechome: "월 7,200대 자동 검사 가능" / "EMI fail 회복 운영 노하우 + I2C 핀 충돌 양산 대응"
- 위시캣: "FAIL 자동 catch → 3분 재시험 → PASS" (양산 라인 cycle 핵심)

### 양산 캐파 재산정 (실측 1.75초 EVT 기반)

| 모드 | 1대 cycle | 일 캐파(8h) | 월 캐파(20d) |
|---|---:|---:|---:|
| A. 빠른 (자동만) | **1분 15초** | ~360대 | **~7,200대** |
| B. 표준 (+HW EVT) | **1분 40초** | ~270대 | ~5,400대 |
| C. 완전 (+물리/재부팅) | **3분 45초** | ~120대 | ~2,400대 |

이전 본 OVERVIEW 추정 (모드 B 약 3분 = 월 3,000대)을 **약 2× 상향**.

### 운영 노하우 신규 — gotcha 신설 (강의·교재 자산화) ⭐

#### 1) I2C 핀 충돌 (RAK4631 link 계열 전체) ★

- RAK4631 기본 DTS에서 I2C0(P0.13/14)·I2C1(P0.24/25) 활성
- Valve X(P0.13/14), Buzzer(P0.24), Valve Y(P0.25)와 핀 충돌
- 해결: overlay에 `&i2c0 { status = "disabled"; }; &i2c1 { status = "disabled"; };` 추가
- carry 대상: `system/link_v2`, `kc_cert_link/link_app`, `kc_cert_link_v2/link_app` (적용됨), 기타 link 계열 전체

→ [[gaps]] § "RAK4631 I2C 핀 충돌" 박제 + 강의·교재 자산화 가치.

#### 2) 외부 J-Link 프로그래머 운영 패턴

- RAK4631 자체 J-Link OB 대신 별도 pca10056 (nRF52840 DK) SW9 외부 타깃 모드
- `west flash` 안정성 문제 → `JLinkExe -SelectEmuBySN <SN>` 직접 호출
- 양산 라인 적용 가능: 검사 jig에 J-Link OB 1대 고정 + DUT 교체

#### 3) PyMuPDF 도입 (revita-claude 측 본 vault 신 도구)

- 본 vault PC에 `fitz` (PyMuPDF) 발견
- PDF 시각화 풀스택: reportlab (생성, 5/27 NanoVNA) + PyMuPDF (분석, 5/29 회로도)
- 회로도 v3 21페이지 → PNG 변환 → 인스턴스 카운트 분석

### 디렉토리 풀세트 (두 트랙 구조 carry)

```
~/revita/doc/revita_link_firmware/
├── test/                  (기존 system/link_v2 트랙, historical)
├── test_kc_v2/            ★ 5/29 신규 — wire/기능 검증 22 TC (417줄 22KB OVERVIEW + TC-KC-00~42)
└── newTest/               ★ 5/29 신규 — 모듈별 깊이 시험 10 TC (TC-10/11/20/21/30/31/40/41/42/50)

~/revita/zephyr_workspace/apps/kc_cert_link_v2/scenarios/
├── proto_kc2.py        (KC2 wire Python 포팅 4 KB)
├── tc_kc_01.py         (L1 스모크 3.4 KB)
├── tc_kc_l2.py         (L2 다운링크 라우팅 통합 7.8 KB)
├── tc_kc_20.py         (L3 AUTO_TLM 3.6 KB)
├── logs/               (UART 캡처)
└── reports/            (YYYYMMDD_HHMMSS_<tc>.json 4건)
```

### ingest #12 대기 (다음 사이클)

- BASE `0da632f2` (5/27 ingest #11) → HEAD `05f36b56` (5/29 work-end)
- 약 60+ 파일 (43 시험 문서 + scenarios + link_app 재작성 + bridge_app overlay + 작업보고서)
- **D1 분할 권장**:
  - #12-a: 시험 문서 + 자동화 (entity-kc-cert-link-v2 갱신 + 신규 entity-kc-cert-link-v2-test)
  - #12-b: 펌웨어 재작성 (entity-kc-cert-link-v2 본문 + I2C 핀 충돌 gotcha 신설)

자세히 [[2026-05-27_revita-IQC-자동화-인프라]] § 5/29 정착 완료 + [[2026-05-29_revita-IQC-5채널-실측-carry]] + [[strengths]] § "양산 IQC 자동화 인프라 풀스택 운영 능력" + [[gaps]] § "RAK4631 I2C 핀 충돌".

---

## 2026-05-28 ingest #10 + #11 흡수 — LoRa 게이트웨이 신설 + KC 인증 통합 트랙 ⭐⭐⭐

### 신규 entity (3건, revitaWiki 박제)

#### `entity-link-v2-test-tower` (ingest #10, 5/22 commit `56b6f051`)

- 위치: `zephyr_workspace/apps/system/link_v2_test_tower/` (30 파일 / +2,164줄)
- 본질: link_v2 DUT 시험용 **LoRa 게이트웨이 타워** (RAK4631 + LoRa async RX + 상향 ACK + 하향 ACK 테이블 + NOTIFY decoder + Shell `gw` + Host FastAPI Web/CLI)
- 사양: 922 MHz / SF7 / BW 125 kHz / CR 4/5 / 14 dBm / 16B PDU (link_v2와 동일)
- node_id: gw 0x0001, dev 0x001F. ACK 테이블 16 slot · 2s timeout · retry 3
- Host: FastAPI Web (REST API v1) + tower_cli.py + uart_bridge.py (UART 단일 점유)
- 하드웨어: J-Link S/N 683449679, UART `/dev/ttyUSB1`
- **사업 가치**: 회귀 시험 자동화 (1분) + 수입검사 JIG + n8n cron 통합 + 위시캣 사례연구 (펌웨어 품질 트랙)

#### `entity-kc-cert-link-v2` (ingest #11, commit `a5e3ea22`)

- 위치: `apps/kc_cert_link_v2/` (23 파일 / +3,500줄)
- 본질: KC 인증 통합 링크 v2 — 3단 구조 (PC + bridge_app + link_app) + Flask Web :5010 + RS485 Modbus master + BLE pairing L2
- **와이어 프로토콜 KC2** (`kc_lora2_proto.h`, 매직 0x4B 0x32, 7B 헤더 + 32B max payload + XOR checksum)
- **AUTO 모드 자동 진입** (전원 인가 즉시) — X축 5초 교대 + 배터리/RS485/리프 주기 EVT
- 다운링크 **최소만 처리** (AUTO + VALVE STOP만, 그 외 UNSUPPORTED — 안전 강화)
- 빌드 프로파일 3종 (FULL / BLE_ONLY / RS485_ONLY)
- 물리 버튼: 짧게 = AUTO 토글, 5초 = 딥슬립

#### `entity-kc-cert-tower` (ingest #11, commit `1693ab13` + 후속)

- 위치: `apps/system/kc_cert_tower/` (약 1,500줄)
- **PC 브리지는 `kc_cert_link_v2/bridge_app` 공유** (KCT=KC2 와이어 동일) — DUT 다중 + 브리지 단일 패턴
- 구현: LED / 부저 / 배터리(AIN7) / 진동(P1.04 + 50ms 디바운스) / **SBC active 명령(KCT_CMD_SBC_ACTIVE)** / 버튼 EVT
- BLE pairing L2 (link_v2와 동일 코드 사본)
- **tower_DK 흡수**: 기존 SBC 토글 단독 앱이 KCT_CMD_SBC_ACTIVE 명령으로 흡수됨 → tower_DK deprecated 2026-05-27 (-587줄, commit `0da632f2`)

### 갱신 entity (revitaWiki 박제)

- **`entity-link-v2`**: build.sh +168줄 신규 (standalone 빌드) + lora_byte_proto.h v2 ACK 게이트 inline 함수 + DM NOTIFY 상태 매크로 5종 + README +25줄
- **`entity-solar-monitoring`**: 5/18 차트 Y축 + 10분 자동 새로고침 + 5/22 Current Y축 고정 + 시정수 40→80mA 변경 의도 박제 (변경 위치 미확정, 사용자 입력 대기 5/27)
- **`entity-module-lifecycle`**: Tower 펌웨어 정본 채택 (`doc/revita_tower_firmware/01_모듈_공통구성.md` +321줄). Link 정본 동일 4 상태 + NVS `[5]` `session_lifecycle` + DM 경유 NVS API + CONFIG_* 라운드 + B안 커밋. 두 하향 경로 (LoRa+LTE/MQTT) 동일 `bool` 규약
- **`entity-tower`**: 00_적용범위 +98줄 (펌웨어 단위 10개 + 외부 시스템 관계 + 트리거 분류 + 3계층 구성 블록) + 02_Device_Manager +304줄 (DM 시간 동기 게이트 + NVS 32B blob + *_force_session_off 명명 규약)
- **`entity-tower-dk`**: deprecated 2026-05-27 (디렉토리 완전 제거, historical 보존 audit trail)

### 사업 가치 후보 패턴 ⭐⭐ (myWiki 매칭)

| 패턴 | revita 사례 | myWiki 매칭 |
|---|---|---|
| **DUT 다중 + 브리지 단일** | kc_cert_link_v2/bridge_app 하나로 링크 + 타워 시험 | shield-claude (RPi 자동화 DUT 다중) / n8n-claude (자동화 학습) |
| **양산 IQC 자동화 인프라** ★★★ | link_v2_test_tower 회귀 시험 + Flask Web :5010 + AUTO 모드 자동 진입 | **uttechome 영업 자료 (제품 신뢰도 증빙) + 위시캣 사례연구 + 한림용인CC IQC 트랙 확장** |
| **회귀 시험 자동화** | link_v2 빌드 → 1분 시험 → Web PASS/FAIL → CI 통합 | 위시캣 펌웨어 품질 영업 자산 + shield-claude RPi 하드웨어 자동화 |
| **두 하향 경로 동일 규약** | LoRa + LTE/MQTT `bool` 규약 (Tower 펌웨어 정본) | n8n-claude (다중 경로 자동화) + shield-claude (RPi 다중 path) |
| **BLE pairing 표준 L2 + user 토글** | link_v2 / kc_cert_tower 동일 코드 사본 | 양산 BLE 워크플로우 정본화 (n8n-claude 페어링 자동화) |
| **KC 인증 후속 시험 트랙 분리** | 옛 kc_cert_link_app → kc_cert_link_v2 후속, 안전 강화 | uttechome (KC EMI fail 대응 후속 시험 자산화) |

→ thought [[2026-05-27_revita-IQC-자동화-인프라]] (DUT 다중 + 브리지 단일 + IQC 자동화 풀스택 + KC 인증 통합 분리 패턴 박제).

### intentionally skipped (#10 + #11 흡수 범위 외)

- 작업보고서 5/18/5/20/5/22 (메타) — 사실은 entity로 흡수
- `doc/revita_tower_firmware_old/` (+429줄 구버전 archive) — `ignore_paths` 추가
- `ref/MeshCore` / `ref/meshtastic` submodule
- `.claude/settings.local.json` 변경 — 5/24 cleanup 이전 별도 정책

## 현재 상태 (2026-05-15 갱신 — ingest #9 흡수 5/20)

- **rtuRemocon end-to-end 검증 완료** (2026-05-15) ⭐ — RS485 Modbus RTU(0x20) + CC1101 OOK 447.925 MHz + Flask Web UI(:5003) 통합. 단순 RF Replay → **산업 통합 제어 시스템**으로 격상. 자세히: [[rtu-remocon]]
- **tower_DK 신규** (2026-05-12~15) — RAK4631 단독 SBC 토글 앱, MCP 시퀀스 재사용 (rail 80ms + boost 120ms + cam 40ms + mux + reset)
- 응용 매칭: AISG 3.0 #155057 / 한림용인CC 8노드 / shield × n8n 통합 / 시설농업 IoT
- 영업 카피 격상: "단순 RF Replay 데모" → "검증된 RF 자산을 Modbus 슬레이브로 패키징한 운용 가능 제품"

## 이전 상태 (2026-05-08 동기화)
- RAK4630/RAK4631 펌웨어 프로젝트 (Zephyr RTOS NCS v2.x)
- LoRa 프로토콜 v2 (16B 통일) — 양방향 TX/RX, ACK 상태머신 완료
- KC RS485 Modbus RTU **인증 Testbed 완성** (Modbus 슬레이브 + Flask Web UI 마스터)
- 회로도/핀매핑 지속 업데이트
- CC1101 리모콘 데모 완성 + **OOK Replay 447.925MHz 성공** (대상 기기 ON/OFF, 10버튼 코드)
- **Sensor RS485 모듈** 완료 (sensor_rs485.c, sensor_blob NVS 저장)
- **Valve 모듈** 완료 (3선 H-bridge CW/CCW/STOP, 2시간 하드리밋)
- **MCP23017 드라이버** 완성 (Tower I/O 확장, shadow 복구, mutex 직렬화)
- **모듈 파일 분리**: Link 20+ 파일, Tower 8+ 파일 아키텍처
- **펌웨어 정본 문서 5종** 신규 (DM·Power·Sensor·NVS·모듈공통)
- **STM32 Modbus RTU 리모콘 시뮬 (5/6)**: PC Web UI(Flask :5001) ↔ USB CDC ↔ STM32 Slave 0x20 ↔ CC1101 OOK TX 양방향 통신 완성
- **CC1101 전수 검사 firmware (5/6)**: nRF52840 + STM32 6항목 + VERSION 판정 (0x04=양품/0x14=클론)
- **Python 시뮬 스택 (5/6)**: `revita_link_sim/` 26개 테스트 파일 143+ pass
- **link_v2 신설 (5/8)**: `apps/system/link_v2/` ~10K줄, RAK4631 정식 overlay, 모듈 Kconfig 시도
- **CC1101 FSK 양방향 통신 (5/8)**: 433.92MHz 2-FSK 38.4kbps STM32↔nRF52840 4B+CRC 검증
- **BLE Long Range (5/8)**: BLE Coded PHY S=8 (125kbps, 2.4GHz) 검증 — LoRa 대비 통달거리 매우 짧음 확인
- **솔라 원격 모니터링 (5/8)**: RAK4631 + INA219 + LoRa SF12 (922.1MHz, 22dBm) 근거리 RSSI=-86dBm 성공, Web UI Flask :5002
- **KC 인증 통합 Link 앱 (5/8)**: `apps/kc_cert_link/link_app/` main.c 1125줄 — LoRa(KC2) + BLE peripheral + RS485 master + 버튼/sleep 통합
- **정본 문서 재구성 (5/8)**: `doc/revita_link_firmware/` 본문 정리 + `doc/revita_link_firmware_old/` 아카이브 신설

## 기술 스택
- RAK4630 (nRF52840 + SX1262 LoRa)
- nRF52840 DK (pca10056) + CC1101 (HW-863) Sub-GHz RF
- Zephyr RTOS
- Modbus RTU / RS485
- SCP/SSH 원격 관리

## 타임라인
| 날짜 | 마일스톤 |
|------|---------|
| 12/17 | 한국기계 협력 제안 (15억 규모) |
| 4/4 | REVITA_TOWER PDF 전송 |
| 4/7 | tower.h 핀 수정 |
| 4/14 | LoRa 프로토콜 v2 (16B 통일) |
| 4/16 | 회로도 추출 |
| 3/24 | RAK4630 핀매핑, 펌웨어 GSD 계획 |
| 3/30 | KC RS485 프로토콜 설계 + 검증 시스템 |
| 4/27 | CC1101 리모콘 데모 — pca10056 2대 + CC1101 HW-863 2개, TX/RX 433MHz 무선 통신 완성 |
| 4/24~26 | Sensor RS485 + Valve 3선 H-bridge 모듈 완료 (집중 개발) |
| 4/27~5/1 | KC 인증 Testbed + MCP23017 + CC1101 OOK Replay 447MHz 성공 + 펌웨어 정본 문서 5종 |
| 5/6 | STM32 Modbus RTU 리모콘 시뮬 + CC1101 전수검사 + Python 시뮬 스택 (143+ tests) |
| 5/8 | link_v2 신설 + CC1101 FSK 양방향(433MHz) + BLE LR Coded PHY 검증 + 솔라 INA219 + KC 통합 Link 앱(1125줄) |

## 코드베이스

### revitaProject (C:/todo/revitaProject/) — raw/revitaProject junction
- **application/**: REVITA 애플리케이션 소스
- **zephyr_workspace/**: Zephyr RTOS 빌드 환경
- **doc/**: 프로젝트 문서
- **ref/**: 참고 자료
- **revitaWiki/**: REVITA 지식 위키 (유일한 Source of Truth)
- **자료/**: 기타 자료
- **작업보고서/**: REVITA 프로젝트 작업보고서

### 로컬 (C:/todo/today/revita/)
- 약 7,830개 파일
- `protocol/`: 통신 프로토콜 문서
- `luckfox/`: Luckfox Core3506 평가 (RK3506 SBC)
- `회로도/`: Tower v3, Link v3 회로도
- `기구설계/`: 기계 설계 문서
- `kc_cert/`: KC 인증 관련

### 원격 펌웨어 (revita 서버 → raw/revita-apps/)
- **system/**: Link 노드 통합 앱 (DM + 7모듈: LoRa, 센서, 밸브, 보안, 전원, cron)
- **loraPing_tower/**: Tower 게이트웨이 (DATA 수신 → ACK 응답)
- **protocol/**: LoRa 바이트 프로토콜 v2 (19종 메시지, 16B 고정 프레임)
- **test/2026-04-14/**: TC-01~TC-08 **전항 PASS**
- 하드웨어: RAK4631 × 2 (Tower S/N: 001050295470, Link S/N: 001050234191)
- RF: 922MHz, SF7, BW125kHz, CR4/5, 14dBm
- 빌드: `build.sh` (양쪽 빌드/플래시/리셋)

### CC1101 OOK 리모콘 Replay 시스템 (revita 서버 → `~/revita/remocon/`)

당초 nRF52840 ↔ CC1101 4버튼 데모로 출발 → **시판 OOK 리모콘 신호 분석·복제** 풀스택으로 확장. **2026-05-12 로컬 동기화**: `git checkout origin/main -- remocon/` 로 핀포인트 도착 (29 MB / 1507 파일).

#### 펌웨어 변형 5종

| 폴더 | 플랫폼 | RTOS | 역할 |
|---|---|---|---|
| `tx/`, `rx/` | nRF52840 (pca10056) | Zephyr | 2-FSK 패킷 송수신 (당초 데모) |
| `tx_ook/`, `rx_ook/` | nRF52840 | Zephyr | **OOK 송수신** — 시판 리모콘 신호 재방사 |
| `txrx/` | nRF52840 | Zephyr | 통합형 |
| `ble_lr/` | nRF52840 | Zephyr | BLE 5 Coded PHY S=8 거리 비교 (결론: LoRa 대비 짧음) |
| **`stm32/`** | **STM32F103C8T6 Blue Pill** | **bare-metal (libopencm3)** | **Modbus RTU Slave + OOK 10버튼 송신 + USB CDC 디버그** |

#### RF 사양 (실측, OOK Replay)
- 주파수: **447.925 MHz** (CC1101은 +9.6 kHz 보정), OOK / Pulse-Distance Modulation
- 데이터레이트: ~3,769 bps (265 us/bit)
- 프레임: 64 심볼 × 8 프레임/버스트 (고정코드, rolling code 아님)
- **2026-05-01 대상 기기 ON/OFF 제어 성공**

#### 영업 자산화 — AISG와의 시너지
- 본 프로젝트 OOK Replay (447 MHz) ↔ **AISG OOK PHY (2.176 MHz)** — 변조 원리 동일, 주파수만 다름
- → 위시캣 **#155057 AISG 매칭 영업 자산**으로 활용 ([[aisg]] / [[2026-05-07_OOK-두-응용-영역]] 참조)
- 1인이 직접 만든 PoC = "보드 검증 없이 제안만 하는 다른 외주" 대비 차별화

#### 2026-05-12 ingest #8 흡수 — Solar Monitor + 현장 함정 박제

본 ingest #8(BASE `18bfce8f` → HEAD `1da01060`, 5/9~5/12)에서 흡수된 항목:

- **Solar Monitor Web UI 정본화 완료** (revita 부 시스템) — RAK4631 + INA219 + LoRa SF12(922.1MHz) + Flask + Chart.js 로컬 + systemd 자동 실행 + 5분 평균 + data.json 영속화. **현장 배포 가능 단계 진입**. 동일 풀스택이 [[한림용인cc-고가수조]] 시공에 즉시 재사용 가능 → [[2026-05-12_원격모니터링-사업라인]] 참조.
- **현장 배포 함정 3종 박제** ([[gaps]] § "현장 배포 함정 패턴"):
  - CP2104 USB-UART 동글 S/N 충돌 (udev rule ID_PATH 회피)
  - RPi USB Undervoltage (powered USB hub 필수)
  - 외부 CDN 의존 (정적 자원 로컬 호스팅 정책)
- **link_v2 button_module 정본 박제** (502줄 신규, link_v1 정본 유지하면서 v2 노트만)
- **3계층 자동화 패턴** ([[ai-direction]] 판단 로그 2026-05-12) — SessionStart hook + work-start 강화 + `_remote-cache/`. revitaWiki 자체 노하우가 myWiki에도 multi-agent `_inbox/` 패턴으로 확장됨.

#### 2026-05-12 박제 — 현장 식별 단서
- 이 PC USB에 꽂힌 `VID_0483 PID_5740 / S/N REMOCON01` (COM25) = **본 STM32 펌웨어의 USB CDC 식별자**. 향후 보드 회수 시 단서.
- 같은 보드(STM32F103C8T6)로 별도 `today/revita/blue_pill_blink/` 실증 완료 (244 byte, CMSIS-free, STM32CubeIDE 1.19 + arm-none-eabi-gcc 13.3). **본 펌웨어와 보드 호환** → 디버그 출력 통합 시 `stm32/src/usb_cdc.c` 재사용 가능.
- ST-Link 드라이버 본 PC에 영구 설치 완료 (Problem 28 해결).

#### 참조 자료
- **상세 entity**: [`revitaWiki/entities/entity-cc1101-remocon.md`](file:///C:/todo/revitaProject/revitaWiki/entities/entity-cc1101-remocon.md) — 200줄 정밀 명세 (레지스터·버튼 코드·핀맵·검사 절차)
- 보고서 8건: `OOK_TX_REPLAY_REPORT.md`, `CC1101_불량보고서.md`, `OOK_vs_FSK_변조방식_비교.md` 등 — RF 파형 분석 + 모듈 전수 검사
- 빌드: `cd ~/revita/remocon/stm32 && make && st-flash write bin/stm32_remocon.bin 0x08000000`
- 빌드 크기: 35.7 KB / 64 KB

## Zephyr RTOS 아키텍처
- Tower: 4+ 스레드 (LoRa, USB CDC, LTE/MQTT, 센서)
- Link: 3+ 스레드 (LoRa, 센서, 저전력)
- 검증 완료 드라이버: LoRa, USB CDC, QSPI, ADC, GPIO, I2C
- bare-metal 불가 → Zephyr 필수 (LoRa/USB/QSPI 동시성)

## 위키 연결

- **revitaWiki** (C:\todo\revitaProject\revitaWiki) — 기술 상세 (설계 결정, 모듈, TC, 로드맵)
- **myWiki의 이 페이지** — 사업 관점 요약

## 관련 페이지
- [[위시캣활��]]: 수주 이력 (#153090, 주3회, 월500만)
- [[projects]]: 프로젝트 맵
- [[skills]]: LoRa, RS485, Modbus, Zephyr
- [[experience]]: 산업 자동화 경험
- [[tailscale네트워크]]: 원격 접근
- [[양산제품]]: 양산 기술 활용
- [[claude-code]]: 전체 개발을 AI 협업으로 진행
- [[aisg]]: AISG 3.0 통신 프로토콜 — 본 프로젝트의 OOK Replay(447MHz)가 AISG OOK PHY(2.176MHz) 매칭 자산으로 활용 (위시캣 #155057)
- [[2026-05-07_OOK-두-응용-영역]]: OOK 변조 두 응용 영역 통합 인사이트
