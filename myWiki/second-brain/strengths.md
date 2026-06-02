---
title: 강점 분석
type: identity
created: 2026-04-19
updated: 2026-06-02 야간 (§12 인증 매니지먼트 역량 신설 — KC 5 범주 분리 + 배터리 직교 트랙 박제 + 셀 모델 양산 BOM 의사결정 우선순위, revita ingest #15 + 배터리 인증 흡수, 양산 RA 15→24)
tags: [강점, 분석]
links: [me, skills, ai-direction, gaps]
---

# 강점 분석

## 핵심 강점

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
