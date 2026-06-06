---
title: 강점 분석
type: identity
created: 2026-04-19
updated: 2026-06-06 야간 (§13 carrier 역량 사례 표 3번째 행 추가 — ponet 광주 협력 회사 vault 신설, 자체 SSH fact-finding 신설 패턴 첫 사례, 결정 46 박제. carrier 패턴 정착 확정 / 이전 6/6: §13 weldRobot 2번째 + §15 풀스택 + §16 시제품 검사 + §14 sensor 매트릭스)
tags: [강점, 분석, carrier역량, vault분리, 다중vault, sensor라이브러리, AI매트릭스, 풀스택양산, 모바일앱양산, AWS양산, 통합단일진행]
links: [me, skills, ai-direction, gaps, revita, onDevice-ai, ai-fanstick, 양산제품, 회사소개, 영업전략, 위시캣활동]
---

# 강점 분석

## 핵심 강점

### 16. 시제품 검사 도메인 영업 자산 — Vision 좌표 학습 + LS XGT 가격 인덱스 + ReportLab PDF 양식 (2026-06-06 저녁) ⭐⭐ NEW

wishket-claude #2026-06-06-001 흡수 (동아정밀 #155220 견적·사양서 v1 송부 단계). 본 사례에서 도출된 **다른 시제품 검사·반복 측정 외주 미팅 재활용 자산** 박제.

| 자산 | 본질 | 재활용 |
|---|---|---|
| **Vision 좌표 학습 시스템** | 검은점 마킹 → OpenCV blob 검출 → 호모그래피 → mechanical X-Y mm → PLC D영역 Recipe 저장 → 자동 측정 | 시제품 검사 도메인 표준 — Option B USB3+OpenCV 65만원 / Option A COGNEX 290만원 |
| **LS XGT 모듈 가격 인덱스 (2026-06)** | XGK-CPUSN Ethernet 내장 + XBF-PN08B 8축 EtherCAT | CPU 518K / 포지셔닝 379K / HSC 280K / ADC 430K / 서보 200W 드라이브 301K + 모터 209K — 다른 외주 견적 즉시 활용 |
| **ReportLab + 맑은고딕 PDF 양식** | 사양서 11장 162KB + 견적서 140KB 재생성 스크립트 | 다른 미팅 송부용 PDF 양식 즉시 재활용 |
| **TCO 3-Plan 분리 표준** | 인건비 vs 자재 vs 라이선스 3축 | 다른 외주 미팅 견적 표준 |

→ 자세히 [[위시캣활동]] § 2026-06-06 견적·사양서 v1 송부 + [[ai-direction]] § 결정 39 확장.

---

### 15. 풀스택 양산 자산 통합 진행 가능 — 임베디드 + 모바일 앱 + AWS + AI (2026-06-06) ⭐⭐⭐

wishket-claude 카드 #2026-06-04-001 흡수 후 박제. **5/29 모바일 앱 + 6/4 AWS 누적 사용자 지적 2회**로 박제 강화.

**자산 구조** (4 트랙 한 팀 단일 진행):

| 트랙 | 양산 자산 | [[양산제품]] # |
|---|---|:-:|
| **임베디드** | UTSOL LED 10만+ / STM32 5종 / RPi CM4 EtherCAT / AMANO BLE Mesh 3,800대 일본 양산 | #0~6 |
| **모바일 앱** | Android Native 3 + Flutter 4 + iOS 신규+앱스토어 + BLE/USB 시리얼 연동 + FCM/APNs | #7 |
| **AWS 서버** | IoT Core + DynamoDB + API Gateway + Lambda 다년 양산 + REST/API 설계 | #8 |
| **AI** | sensor 12 모듈 + AI 매트릭스 491 lines + R50 Path D + R48 Path C + 음성/CNN 통합 | [[onDevice-ai]] |

**차별화 본질** (위시캣 채널 결정적 경쟁우위):

1. **외주 협력 의존도 0%** — PM·요건 협의·산출물 통합 책임 한 팀
2. **1순위 일정 준수 + 2순위 산출물 완성도** — 의뢰사 가치관과 직접 부합
3. **임베디드 + 풀스택 동시 요구 입찰** 결정타 (위시캣 #155818 홈 IoT 앱 + 음성인식 AI 3,500만 사례)
4. **단일 견적 단일 책임** — 외주 단가 마진 제거 → 클라이언트 TCO 자연 감소

**자산 인덱스 우선 SOP** (재발 방지):

- `/wishket-apply` 작성 시 wishketProject me.md + mywiki 양산제품.md **전체** 우선 읽기 (cross-vault 의무)
- [△] 약점 분류 전 자산 인덱스 재확인 — 사용자 박제 자산 명시 영역은 [O]로 처리
- 자산 인덱스 누락 발견 시 즉시 cascade 카드 발송 + entity 갱신

**5채널 영업 carry**:
- ⭐⭐⭐ **위시캣 풀스택 일감 정조준** — 모바일·서버·AI 동시 요구 입찰 자동 매칭 룰 6 신설 후보
- ⭐⭐⭐ **외주 비용 절감 narrative** — TCO 분리 패턴(동아정밀 미팅 자료 슬라이드 8 Plan A/B/C)과 결합 시 정량 영업 무기
- ⭐⭐ **lemonLabs 협업 narrative 보강** — UTTEC 풀스택 + lemonLabs 디자인/마케팅 = 창업패키지 차별화

→ 자세히 [[양산제품]] § #7~8 + [[영업전략]] § 통합 단일 업체 + [[ai-direction]] § 결정 44 + [[2026-06-06_carrier-단일진행-자산-인덱스-cascade]] (신규 thought).

---

### 14. sensor 라이브러리 12 모듈 + AI 매트릭스 단일 출처 mandate (2026-06-04) ⭐⭐⭐

`C:\todo\onDevice_AI\sensor\` 카탈로그 = **본 vault project 결단 자산화 단일 출처**. ondevice-claude 카드 005+006+007 megasession 흡수 후 박제.

**자산화 구성**:

| 자산 | 위치 | 규모 |
|---|---|---|
| sensor 12 모듈 README | `sensor/{MODULE}/` | 9 모듈 (6/3 carry) + FT5336/INMP441 (R50, 6/3) + INA219 (R48 Path C, 6/3) |
| AI 매트릭스 단일 출처 | `sensor/AI_매트릭스.md` | 491 lines, 11 sensor × 2~3 AI model × 14 보드 최저선 매핑 |
| 외부 module 7 카테고리 카탈로그 | `sensor/_추가_module_후보/` | 8 파일 1,466 lines, 40+ module |

**검증 carry 박제값 (절대 신뢰값, 6 instance)**:
- R18 (5/22) MLP 3.23× CMSIS-NN
- R44 (6/1) KWS 9.91ms 75%
- R46 (6/1) FC 9.26ms 3.14×
- R47 (6/1) esp-nn 1.06×
- R50 (6/3) MNIST 8.13ms 100%
- R48 Path C (6/3) Phase 1~4 100% delta 0pp

**영업 narrative 결정타** ⭐⭐⭐:
- **본 vault 11 sensor 중 9개는 pca10056 (Cortex-M4F 256KB) 이내 양산 가능** = AI FanStick 차세대 BOM에 거의 모든 sensor 추가 가능
- Stage 4 산업 응용 sensor cluster $50 통합 ([[ai-fanstick]] § Path D+)
- 한림용인CC 양산 노드 sensor 4종 통합 $39 + $26 = $65 단일 노드 carry
- 위시캣 매칭 SOP 룰 5 확장 = sensor + AI model + 최저선 보드 + 외부 module 발주 즉시 응답 (cluster 8 신규)

**5채널 영업 carry**:
- ⭐⭐⭐ **본 vault 자산화 단일 출처 박제** — 결정 41 (sensor AI 매트릭스 단일 출처 mandate, ai-direction)
- ⭐⭐⭐ **결정 42 워크플로우 §0.4 표준** — 원격 학습 + 최저선 deploy 2단계 6 step, 위시캣 영업 자산 (의뢰사 신뢰도 ↑)
- ⭐⭐ **factory-rpi4 6번째 ssh 머신** = production QC + 데이터 수집 + 학습 통합 머신 narrative
- ⭐⭐ **강사양성 Day 5 cluster** — R26 KWS + R34 Hybrid + R36 STM32H745 + R50 LCD touch + R48 Path C IMU (5단계)

→ 자세히 [[onDevice-ai]] § R50 Step 1~3 + sensor 12 + AI 매트릭스 + [[ai-direction]] § 결정 41~43 + [[ai-fanstick]] § Path D 정량.

---

### 13. 신사업 결합 carrier 역량 — vault 분리 패턴 자체가 carrier 역량 박제 (2026-06-04) ⭐⭐⭐ NEW

revita-claude 카드 003+004 흡수 후 박제. **사업 단위 = vault 단위** 정책 정착. revita LoRa 양산 자산 + 위성 원격탐사 + ESP32-P4 CNN = 노지관리 신사업 본격 진입 결단 → `application/노지관리Wiki/` 신규 vault 분리.

**carrier 역량의 실제 박제 = vault 분리 패턴 자체**:

| 요소 | 본질 |
|---|---|
| **application/ 산하 사업별 vault 평행 구조** | revitaWiki / 노지관리Wiki / 향후 AISG·한림용인CC·lemonLabs 사업 vault 평행 |
| **cross-vault 참조 규약** | `[[revita:]]` `[[mywiki:]]` `[[노지관리:]]` `[[entity-X]]` 다중 vault 운영 표준 |
| **사업 단위 박제 일관성** | 사업 단위 vault 신설 시 entities/ direction/ progress/ research/ poc/ business/ improvement/ 사전 정착 |
| **본업 분리 명확화** | 기술 자산 vault (revita) ↔ 사업 carrier vault (노지관리) 분리 |

**차별화 5 (CropX/Climate FieldView 대비)** — 본 carrier 역량 실증 사례:

1. 지상 IoT 양산 자산 (revita LoRa 7,200대/월)
2. Solar 자가발전 무인 운영 (인프라 부재 노지)
3. Modbus 자동 처방 폐회로 (권고 SaaS → 자동화 SaaS)
4. KC 인증 + 정부 R&D 자격 (strengths §12 인증 매니지먼트)
5. 농림위성 (2026 발사) timing

**5채널 영업 carry**:
- ⭐⭐⭐ **uttechome / 위시캣 사례연구**: 다중 vault 운영 표준 = 다른 1인 컨설팅 대비 결정타
- ⭐⭐⭐ **농진청 / 농어촌공사 정부 R&D**: §12 인증 + §13 carrier + sensor 매트릭스 + revita 양산 = 4 자산 통합 입찰 자격
- ⭐⭐ **다른 신사업 trigger 확장 가능** — AISG / 한림용인CC / lemonLabs / AI FanStick 동일 패턴 적용 (templates)
- ⭐⭐ **위시캣 농업 IoT+위성 fusion 모집 active 모니터링** (결정 34 cross-매칭 확장)

→ 자세히 [[revita]] § 노지관리 신사업 + [[ai-direction]] § 결정 40 + [[aisg]] § 위성 fusion 결합 carry + [[2026-06-04_노지관리-신사업-본격진입]] (신규 thought).

**적용 사례 추적** (carrier 패턴 templates 검증) ⭐⭐⭐ NEW (2026-06-06 갱신):

| # | 일자 | vault 위치 | 사업 본질 | carrier 차별화 |
|:-:|---|---|---|---|
| 1 | 2026-06-04 | `revitaProject/application/노지관리Wiki/` | 노지 관리 신사업 (마이크로+매크로 SaaS) | 5축 (지상 IoT + Solar + Modbus 폐회로 + KC + 농림위성) |
| 2 | 2026-06-06 낮 | `C:/todo/weldRobot/` | 용접 로봇 신사업 (Path 4 Vision seam tracking + AI 비드 검사 add-on box) | 자산 이식 90%+ + Add-on SI win-win + 한국 first mover + 결함 SaaS |
| **3** | **2026-06-06 밤** | **`C:/todo/ponet/`** ⭐ | **Ponet 협력 회사 (광주 정보통신공사·가로등설계·도시정비·농공단지 환경설비, 조달청 MAS + 직접생산확인서, 조대홍 사장)** | **자체 SSH fact-finding 신설 패턴 첫 사례 + UTTEC LED 디밍 원조사업 자산 직접 정합 = 무선 가로등 IoT 공공 조달 first mover 결정타 (사업 본질 확정 후 가설 5축)** ⭐⭐⭐⭐ |

→ **carrier 패턴 정착 확정 (3 사례 누적)**. 다음 사례 후보 (AISG / 한림용인CC 확장 / lemonLabs / AI FanStick) templates 즉시 적용 가능. 자세히 [[weldRobot]] + [[ponet]] + [[ai-direction]] § 결정 45·46.

---

### 12. 인증 매니지먼트 역량 — KC 5 범주 분리 + 셀 모델 우선 의사결정 (2026-06-02 야간) ⭐⭐⭐ NEW

revita ingest #15 + 배터리 인증 흡수 (사용자 도메인 질의 후속 박제). 단순 인증 통과 능력이 아닌 **인증 트랙 매니지먼트 역량** 자산화 — 양산 BOM 의사결정 우선순위 + 인증 비용·기간 추정 가능 단계.

**KC 인증 5 범주 분리 매트릭스**:

| 범주 | 배터리 직접 시험? | 현 `entity-kc-cert` family 다룸 |
|---|:-:|:-:|
| KC EMC (5/19 RE fail 회복) | ❌ | ⭕ |
| KC RF (LoRa SRD) | ❌ | ⭕ (모듈 인증 활용) |
| **KC 62133 (셀 안전)** | ⭕ 필수 | ❌ (트랙 부재) |
| **충전기 KC (솔라/외부)** | ⭕ 조건부 | ❌ (트랙 부재) |
| **UN38.3 (운송)** | ⭕ 필수 | ❌ (트랙 부재) |

→ **현 KC 트랙 (EMC/기능시험 중심) 과 직교**. 양산 출하 전 별도 해소 필요.

**의사결정 분기점** (양산 BOM 결정 트리 최상위):

- **셀/팩 외부 인증품 구매** → 완제품 측 시험 면제 (인증서 보관만, 비용 0)
- **자체 셀 조립 + PCM 직접 설계** → 자체 인증 필요 (KTL/KTC, 비용 수백~수천만원, 8~12주)

→ **셀 모델 확정이 다른 부품 (BLE/LoRa/MCU) 보다 인증 cost·duration impact 가장 큼**. 양산 캐파 산정 진입 시 우선 의사결정 항목.

**5채널 영업 carry**:

- ⭐⭐⭐ **uttechome / 위시캣 사례연구**: "인증 5 범주 분리 + 셀 모델 우선 의사결정" — 다른 1인 컨설팅 대비 단계 격차 결정타 (인증 외주 비용/기간 추정 가능)
- ⭐⭐ **한림용인CC**: 시공 자료 + 인증 자료 + 운영 매뉴얼 단일 doc/ 트리 (결정 27 doc/ 단일화 + 결정 30 인증 5 범주 분리 결합)
- ⭐ **AI FanStick / Stage 4 / onDevice**: 배터리 인증 트랙 carry — 셀/팩 모델 결정이 양산 BOM 의사결정 트리 최상위
- ⭐ **shield-claude / lemonLabs (AI 응원봉)**: 동일 패턴 — 배터리 내장 제품의 인증 매니지먼트 자산 cross-vault carry

**재학습 비용 차단 가치**: 인증 관련 표준·시험소 조사 재발 = 8~12주. 본 매트릭스 박제로 다음 사업/제품 확장 시 즉시 활용 가능.

자세히 [[revita]] § 6/2 ingest #15 + [[ai-direction]] §결정 30 + [[gaps]] § 양산 RA 15→24 (#20~24 배터리 인증) + [[2026-06-02_certification-tracks-matrix]] (신규).

---

### 11. 펌웨어 원본 품질 게이트 단계 진입 — 사본 정책 + 양산 RA 15 + doc/ 트리 단일화 (2026-06-02) ⭐⭐⭐ NEW

revita ingest #14-A/B 흡수 (link_v2 자체 시험 10/10 PASS + 원본 버그 4건 발견). §10 양면 IQC (양산 IQC 자동화 + Tower 양면)에 **세 번째 단계** = 펌웨어 원본 품질 게이트 추가:

| 단계 | 의미 | 자산 |
|:-:|---|---|
| 1 (5/29 §9) | 양산 IQC 자동화 (Link 단면) | scenarios/ 17 PASS, 캐파 월 7,200대 |
| 2 (6/1 §10) | 양면 IQC (Link + Tower) | Static 31 PASS (sbc 11 + security 12 + lux 8), 인증 자산 18 정본 |
| **3 (6/2 §11 신규)** ⭐ | **펌웨어 원본 품질 게이트** | **사본 디버깅 → 원본 결정 정책 + 양산 RA 15 + doc/ 트리 단일화** |

**핵심 자산**:
- **link_v2 자체 시험 10/10 PASS** — 양산 출하 게이트 통과 직전 단계
- **원본 link_v2 버그 4건 발견** (sensor_module NVS chunk / device_manager nvs_write 반환값 / sensor_cfg all-zero / rs485 wait_rx drain) — 사본 검증으로 발견, 원본 미반영 carry
- **사본 정책 (Copy + Verify, Then Decide)** — 양산 출하 게이트 전까지 사본·원본 병행 운영 (ai-direction §결정 26)
- **doc/ 트리 단일화** — KC 인증 + 양산 IQC + 운영 매뉴얼 + 디버깅 사례 (양산 RA 15) 단일 doc/ 트리 export 가능 (외부 제공 시 부분 누락 risk 차단)
- **LTE 단일 게이트** — `lte_build` + `lte_runtime` 분리 + README §LTE 완료 기준 (모듈 간 의존 단일 판정)

**5채널 영업 깊이 확장**:
- **uttechome**: "양산 IQC 자동화" → "양면 IQC" → "원본 품질 게이트 + 양산 RA 15 자산화" 3단계 차별화
- **위시캣 사례연구 결정타**: 펌웨어 디버깅 실전 사례 15건 (양산 출하 전 RA 박제) — 다른 1인 컨설팅 대비 단계 격차
- **한림용인CC IQC 확장**: doc/ 트리 단일화 패턴 — 시공 자료 + 운영 매뉴얼 + 회로도 단일 export
- **shield-claude**: 사본 정책 — RPi 자동화 검증 후 원본 반영 정책 carry 가능
- **n8n-claude**: 모듈 간 의존 단일 게이트 — 다중 path 자동화 패턴에 일반화 가능

자세히 [[revita]] § 6/2 ingest #14-A/B + [[ai-direction]] §결정 26~28 + [[gaps]] § 양산 RA 6 → 15 + [[2026-06-02_copy-verify-decide]] (신규).

---

### 10. 양면 IQC 풀스택 운영 능력 — Link + Tower 양면 (2026-06-01) ⭐⭐⭐ NEW

revita ingest #13-A Tower 모듈러 재작성 풀세트 정착 (11 모듈 .c 약 8,900 LOC + 정본 .md 18건 + 자체 시험 7건). 5/29 §9 (Link 단면 IQC) → 6/1 §10 (양면 IQC) 진화 — **양산 IQC 풀스택 Link + Tower 양면**:

| 측 | 양산 자산 | 캐파 / 정량 |
|---|---|---|
| **Link** | kc_cert_link_v2/scenarios/ Python 자동화 4 모듈 + 17 PASS + EVT 1.75초 + 수신율 99.1% + 디버그 사이클 3분 | **월 7,200대** (모드 A) |
| **Tower** ⭐ NEW | tower/test/ 7건 체크리스트 1,031줄 + west build PASS + Static Review (sbc 11 / security 12 / lux 8 PASS) | RM76 sourcing + 5 BLOCKED 해소 후 산정 |

**핵심 자산**:
- 정본 .md 18건 + AT 명령 정본 → KC/RA 인증 자료 자산화
- 신규 모듈 4 함수 표준화 (`_init / _activate / _handle_cmd / _force_session_off`) + NVS 표 1줄 + module_type_code 1행 → 통합 비용 명확

**5채널 영업 carry**: 풀스택 모듈러 패턴 + 자체 시험 + 시간 동기 게이트 + 정본 인증 자산 + RM76 LTE BATCH 모드 요금 협상

→ uttechome / 위시캣 사례연구 / 한림용인CC / shield-claude / n8n-claude 모두 **양면 카피로 격상**. 다른 1인 컨설팅과 차별점 결정타.

자세히 [[revita]] § 6/1 ingest #13-A + [[2026-06-01_tower-modular-rewrite-iqc-stage2]] + [[gaps]] § 양산 출하 전 RA 6 항목.

---

### 1. 수직 통합 능력
하드웨어 회로부터 클라우드 배포까지 전체 스택을 혼자 처리할 수 있다.
회로(OrCAD 25년) → 펌웨어(C/C++ 38년) → 서버(Python/Node) → 앱(Flutter) → 웹(Next.js) → 인프라(Nginx/SSL/PM2).
AI 시대에 더 가치가 올라가는 능력 — AI가 각 레이어의 코드를 생성해도, **레이어 간 통합 판단**은 전체를 이해하는 사람만 할 수 있다.

### 2. 폭발적 실행 속도
계획보다 프로토타입을 먼저 만든다. 실적 증거:
- 하루 만에 100개 예시 앱 구축 (4/19)
- 하루 만에 사전빌드 272개 완성 (4/18)
- 하루 만에 BLE OTA+서버+앱+웹 전체 완성 (4/12)
- 하루 만에 25개 3D 데모 사이트 생성 (1/15~16)
- 2주 만에 AI FanStick 리서치→MVP→특허 (2월)
AI 도구(Claude Code)를 활용해 이 속도를 더 가속하고 있다.

### 3. 양산 실적
6개 제품이 **현재 판매 중**:
- STM32F756 컴프레서 밸브 컨트롤러
- STM32F407 세탁기 컨트롤러
- RPi CM4 EtherCAT 컨트롤러
- RPi 3 V-Cut 컨트롤러
- nRF52832 BLE 온도 컨트롤러
- **nRF52832 BLE Mesh 일본 주차장 LED Dimmer (AMANO, 약 3,800대 일본 양산)** — PCB+BOM+DXF 보존: `oldProject/일본/AMANO/` ([[일본-시장]] 참조)

프로토타입이 아닌 양산 경험은 신뢰성의 핵심 근거. 특히 AMANO는 **일본 직거래 양산** = 한국 1인 사업으로 보기 드문 트랙 레코드.

### 4. 교육 설계 + 기술 구현의 결합
기술을 아는 것과 가르치는 것은 다른 능력이다.
교육 현장의 필요(즉시 체험, 단계별 난이도)를 기술로 구현하는 능력.
- 765일 커리큘럼 설계
- 사전빌드: 선택→즉시 체험 시스템
- Python Vibe: AI 코드 생성→실행→설명 루프

### 5. AI 도구 극대화 활용
Claude Code를 단순 보조가 아닌 **핵심 개발 파트너**로 활용.
- Skill 시스템 구축 (work-start/end, 위시캣, 레슨 비디오 등)
- 사전빌드: Claude가 펌웨어 코드 생성 → 자동 빌드
- 제안서/문서/코드를 동시 생산하는 워크플로우

### 6. 대기업 + 프리랜서 경력의 폭
삼성전자, 파나소닉 대기업 경력으로 품질/프로세스 이해.
프리랜서로서 고객 발굴, 제안, 납품까지 독립 수행 능력.

### 7. 통신 프로토콜 다양성 (8종 직접 경험)
양산 6종 + 직접 구현 1종 + 분석 완료 1종 = 통신 프로토콜 8종 보유.
- **양산 (실제 판매)**: RS-485 Modbus RTU, BLE Mesh, LoRa/MQTT, EtherCAT, CAN, **nRF52832 USB CDC ACM 시리얼 (수년간 직접 양산 + 연동 모바일 앱 다수 제작)** ★ 2026-05-21 박제
- **직접 구현 (검증 완료)**: OOK Sub-GHz RF (CC1101 447.925MHz Replay, REVITA 2026-05)
- **분석 완료**: AISG 3.0 (HDLC + RS-485/OOK PHY, 외주 분석, 2026-05) — [[aisg]]

OOK 변조 두 응용 영역(공중파 RF + RF feeder in-band) 모두 경험은 희소.
→ 통신 프로토콜 포팅·컨설팅 사업 라인 잠재 자산. 자세한 내용: [[2026-05-07_OOK-두-응용-영역]]

**nRF52832 USB 시리얼 + 모바일 앱 통합 = 안드로이드 H/W 연동 앱 외주의 결정적 자산**.
펌웨어 측 USB CDC ACM 구현 + 모바일 측 Android USB Host API
(UsbManager + UsbDeviceConnection) 또는 UsbSerialForAndroid 통합 운영.
스마트폰 ↔ 센서 직결 영역 외주 매칭 정조준 자산.

### 8. 음성 합성 + 지식 그래프 도메인 모델링 (위시캣 #155091에서 발견)
일상 운영 중인 두 도메인이 AI 오디오 프로젝트 영업의 핵심 자산으로 입증.
- **음성 합성 파이프라인**: Remotion + edge-tts 30편+ 영상 운영 (한국어/영어), measure-audio.py 직접 작성 (mp3 신호 측정)
- **지식 그래프**: [[memory-mcp]] 서버 운영 (12 entities + 20 relations, JSONL), Obsidian 그래프 30+ entity 일상 모델링
- **Palantir Foundry Ontology**: 시리즈 3편 학습 완료, 객체+액션 4단계 End-to-End
- **[[ai-fanstick]]**: 음성+AI+BLE 통합 제품 특허 출원

→ 위시캣 #155091 (AI 오디오 믹싱 PoC) 매칭률 8/10 → 9/10 격상 핵심 자산. 위키 검색 워크플로우가 발견한 셀프 디스카운트.

### 9. 양산 IQC 자동화 인프라 풀스택 운영 능력 (2026-05-29 신설)

revita 양산 IQC 자동화 인프라 정착 (5/29 ingest #12) — 단순 시험 자동화 수준이 아닌 **양산 검사 라인 풀스택 운영 능력** 실증:

- **시험 카드 32개** 박제 (test_kc_v2/ 22 + newTest/ 10) + **자동화 모듈 4 .py** (proto_kc2 + tc_kc_01 + tc_kc_l2 + tc_kc_20)
- **17 PASS / 2h 40m / 99.1% 수신율 / EVT 1.75초** (예상 5~15초보다 3~8× 빠름) / **디버그 사이클 3분** (FAIL → 재실행 → PASS 양산 라인 cycle 핵심)
- **양산 캐파 실측**: 모드 A 1대 1분 15초 = **월 7,200대 자동 검사 가능** (이전 모드 B 추정 월 3,000대 2× 상향)
- **DUT 다중 + 브리지 단일 패턴** (kc_cert_link_v2/bridge_app 하나로 링크 + 타워 두 DUT 시험)
- **Flask Web :5010 + AUTO 모드 자동 진입** (전원 인가 즉시 X축 5초 교대 + 배터리/RS485/리프 주기 EVT)
- **빌드 프로파일 3종** (FULL / BLE_ONLY / RS485_ONLY) 양산 라인 분기

영업 카피 직결:
- ⭐⭐⭐ **위시캣 펌웨어 품질 사례연구 결정타** — "FAIL 자동 catch → 3분 재시험 → PASS" + "17 PASS / 99.1% / 4 자동화 모듈"
- ⭐⭐⭐ **uttechome 제품 신뢰도 증빙** — "월 7,200대 자동 검사 가능" + "EMI fail 회복 운영 노하우 + I2C 핀 충돌 양산 대응"
- ⭐⭐ **한림용인CC IQC 트랙 확장** — Flask + AUTO 모드 = 시공 풀스택 확장

→ entity [[revita]] § 5/29 정착 + thought [[2026-05-27_revita-IQC-자동화-인프라]] § 5/29 갱신 + [[2026-05-29_revita-IQC-5채널-실측-carry]] + [[gaps]] § "RAK4631 I2C 핀 충돌" carrier.

## 현장 배포 운용 자산 (2026-05-12 신설 — revitaWiki ingest #8 흡수)

1인이 **시공·배포·운용까지 직접** 한 결과로 축적된 현장 자산. 중국 저가 공세가 닿지 않는 영역.

### 원격 모니터링 풀스택 (실 운영 중)

- **revita Solar Monitor**: RAK4631 + INA219 + LoRa SF12(922.1MHz) + Flask Web UI + Chart.js 로컬 + systemd 자동 실행 + 5분 평균 + data.json 영속화 + Serial Log 패널
- 현장 24시간 동작 검증 + 5/12 진단 사례 박제
- → 동일 풀스택으로 [[한림용인cc-고가수조]] (1,000만원, 시공 직전) 즉시 응용 가능
- → 농업 IoT / 양식장 / 산업 시설 등 확장 영역 — [[2026-05-12_원격모니터링-사업라인]] 참조

### 현장 함정 박제 (강의·교재 자산)

3건의 1인 시공 함정 패턴이 gaps.md에 박제 ([[gaps]] § "현장 배포 함정 패턴"):
- CP2104 S/N 충돌 — udev rule ID_PATH 회피
- RPi USB Undervoltage — powered USB hub 필수
- 외부 CDN 의존 — 정적 자원 로컬 호스팅 정책

→ 호오컨설팅·인프런·강사양성 교재의 차별화 사례 자산.

### Linux 운용 자산 (systemd / udev / cron)

revita Solar에서 검증된 운용 자산이 다른 현장 프로젝트에 즉시 응용 가능. "데모는 누구나 / 운용은 1인 기업이 직접" — 차별화.

## 작업 패턴 강점
- **폭발적 집중**: 빈 날 vs 과부하 날의 극단적 차이 → 집중할 때 대량 산출물
- **문서 선행**: 설계서/사양서 작성 후 구현 → 방향성 있는 개발
- **도구 최적화**: 빌드 시간 270초→44초→18초 같은 반복 최적화

## 이 강점이 AI 시대에 의미하는 것
→ [[ai-direction|AI 방향 판단]] 참조

## 관련 페이지
- [[me]]: 핵심 정체성
- [[skills]]: 강점을 뒷받침하는 기술
- [[gaps]]: 강점의 이면에 있는 부족한 부분
