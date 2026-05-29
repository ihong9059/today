---
title: DGIST 에너지절약 ESCO사업 LED 조명제어 (Tier 1 단발 SI, 신규사업)
type: entity
created: 2026-05-28
updated: 2026-05-30
tags: [DGIST, ESCO, LED, 조명제어, IR, BLE-Mesh, IoT, 신규사업, Tier1, 영업, B2B, 산학협력, 기술자문, PDF자동화, PyMuPDF]
links: [aisg, onDevice-ai, stm32h745-disco, revita, n8n, uttec-stage-package, ai-fanstick, 영업전략, skills, 회사소개]
---

# DGIST 에너지절약 ESCO사업 LED 조명제어

## 2026-05-30 도면 LED 위치 자동 표시 cascade ⭐⭐⭐

ESCO 사업자 회신 가능 산출물 확보: **E1~E6 7개 도면 31p 470개 LED 위치 파란 원 자동 표시** (`{E1~E7}_LED표시_claude.pdf`). E7만 carry (디밍제어용 zone + 미표시 zone 4p).

**3가지 알고리즘 도출** (도면 구조별):

| 방식 | 적용 | 검출 수 |
|---|---|:-:|
| A. 사용자 ink → 원 변환 | E1, E2 | 161 |
| B. PE/PN 텍스트 라벨 매칭 (strict zone) | E3, E5, E6 | 270 |
| C. 도형 매칭 + PolyLine ㄷ자 strip 분해 | E4 | 39 |

**구역 종류 분류 (2가지)**: 조명제어구역(E1~E6) + 디밍제어용 센서등 교체구역(E7만).

**핵심 알고리즘 신설 — PolyLine vertex segment 분해 → 평행 line 쌍 추출**:
- E4 p4 PolyLine bbox 100×694 (강의실 전체 포함 false zone) → vertex 6개를 평행 segment 쌍으로 분해 → 좁은 strip 71×15 + 15×664 정확 추출
- 결과: 172개 false positive → 25개 정확 검출
- **다른 PDF 도면 비정형 strip 처리에도 재사용 가능** (재사용 자산)

**참조**: `c:\todo\today\신규사업\DGIST_ESCO_LED제어\조명제어\작업기록_2026-05-30.md` (알고리즘 + 함정 + 다음 작업)

## 한 줄 정의

대구경북과학기술원(DGIST)이 발주한 **건물 에너지절약 ESCO사업** (총 사업비 39.9억) 중 **LED 조명제어 시스템 공사 1,271등** 부분에 대한 UTTEC 측 기술 협력 사례. **IR chain (354등) + BLE Mesh IoT (917등)** 듀얼 시스템 제안. 2026-05-28 신규 진입.

## 진입 경위

| 시점 | 사건 |
|---|---|
| 2026-04 | DGIST 시설운영팀 사업설명서 작성·발주 |
| 2026-05-28 | ESCO 사업자가 UTTEC에 시방서 §2.1·§2.2 (page 31~33) 관련 기술자료 요청 |
| 2026-05-28 | UTTEC 측 기술 제안 4개 문서 작성 (`C:/todo/today/신규사업/DGIST_ESCO_LED제어/`) |

## 사업 개요

| 항목 | 값 |
|---|---|
| 발주처 | DGIST 시설운영팀 |
| 사업명 | 건물 에너지절약 ESCO사업 |
| 입찰 자격 | ESCO 등록 + 전기공사업 + ESCO 투자실적 |
| 적격심사 | 종합평점 95점 이상 + 낙찰하한선 86.745% 이상 |
| UTTEC 직접 입찰 | ❌ 부적합 (ESCO 등록 부재) |
| UTTEC 진입 path | **ESCO 사업자 측 기술 협력 / OEM / 통합 SW 공급** |

## UTTEC 제안 듀얼 시스템

| 시방서 | 적용 범위 | 통신 | UTTEC 코어 |
|---|---|---|---|
| §2.1 IR 통신 LED 센서등 | 354등 (컨실리언스센터 지하주차장) | IR (적외선) chain + 리모컨 그룹 | **STM32G030 + NEC v2 확장 32bit 프로토콜** (자체 설계) |
| §2.2 IoT 기반 무선 조명제어 | 917등 (본관·E2~E7동 복도 등) | **BLE Mesh** (나고야 사카에 자전거 주차장 3,300대 Locking 사례 참조) | **nRF52810 노드 + nRF52840 Gateway + LTE Cat-M1** |
| 통합 관제 | 양 시스템 단일 대시보드 | MQTT/HTTPS | **Node-RED + InfluxDB + Grafana** (n8n broker carry) |

### IR chain 시스템 핵심 설계 (§2.1)

- **NEC v2 확장 32bit 프로토콜** (UTTEC 자체 설계): GID 5bit + TTL 3bit + SRCID 8bit + CMD 8bit + PARAM 8bit
- chain TTL = 3 hop → ~30m 거리 chain
- DIP 5bit (32 그룹) + 22키 IR 리모컨 학습 모드
- 노드 구성: MCU(STM32G030) + PIR + IR Tx/Rx + 디밍 (사양 중심)

### BLE Mesh IoT 시스템 핵심 설계 (§2.2)

- Bluetooth SIG Mesh 1.1 (Light Lightness + LC + Sensor Server 모델)
- 나고야 사카에(栄) 역 자전거 주차장 BLE Mesh Locking 시스템 사례 참조 (3,300대 분산 노드, 배터리 운영, 정산소 ↔ 잠금장치 양방향 mesh)
- Standard/Relay/Friend node + Provisioner Gateway + LTE Cat-M1
- 노드 구성: nRF52810 + 디밍, Gateway = nRF52840 + LTE BG95-M3

## 시방서 §제3장 에너지절감량 산출 매핑

| 시스템 | 시방서 절감률 |
|---|:--:|
| §2.1 IR 디밍 (354등) | **60%** (개선 후 사용량 기준, line 263~268) |
| §2.2 BLE Mesh 제어 (917등) | **50%** (개선 후 사용량 기준, line 273~278) |

## 협력 모델 후보

| 모델 | 내용 | UTTEC 적합도 |
|---|---|:--:|
| A. 기술자문/설계 | §2.1·§2.2 설계도 + 시방서 충족 증빙 작성 협력 | ⭐⭐⭐ |
| B. OEM 펌웨어 | 양산 협력사에 펌웨어 라이선스 공급 | ⭐⭐⭐ |
| C. 통합 SW 플랫폼 | 관제 서버 + 대시보드 + 스케줄 엔진 자체 개발·운영 | ⭐⭐⭐⭐ (UTTEC n8n + webServer 5대 carry) |
| D. PoC + 양산 이관 | DGIST 1개 동 PoC → 효과 측정 → 양산 | ⭐⭐⭐⭐ (영업 강도) |

## UTTEC 차별화 (영업 카피)

| 강점 | 근거 |
|---|---|
| Cortex-M tier AI 박제 | STM32H745 14번째 보드, CMSIS-NN CNN 17.6× 가속 |
| nRF52 14 보드 매트릭스 | BLE Mesh 양산 검증 누적 |
| 빌드 함정 50건 cross-vendor 인벤토리 | Espressif 16 + Nordic 18 + STM32 15 |
| IQC 자동화 4축 패턴 | revita carry (양산 검증 단계) |
| multi-agent 자동화 운영 | n8n broker + Notion + Grafana 통합 — 관제 SW 신속 구축 |
| R&D 신뢰성 자가 진단 정정 사이클 | governance 모범 3건 박제 |

## 본 vault 매칭 (cross-link)

- [[stm32h745-disco]] — Cortex-M tier 최강 AI 노드 (향후 점유 패턴 학습 path)
- [[onDevice-ai]] — 14 보드 매트릭스 + nRF52 BLE Mesh carry
- [[revita]] — IQC 자동화 4축 패턴 carry (양산 단계)
- [[n8n]] — 자동화 broker carry (관제 SW)
- [[aisg]] — 한국 산업 노드 영업 path 매칭
- [[uttec-stage-package]] — Stage 4 시나리오 E 영업 자산

## 자료 위치

```
C:/todo/today/신규사업/DGIST_ESCO_LED제어/
├── README.md (개요)
├── 01_시스템개요.md
├── 02_BLE_Mesh_IoT_제어시스템.md
├── 03_IR_통신_그룹제어시스템.md
├── 04_계통도_및_구현방법.md
└── 원본자료/
    └── 시방서_2장_LED제어_원문발췌.md
```

## Tier 분류

| 축 | 분류 | 근거 |
|---|---|---|
| 금액 | **불확정** (협력 모델별 차이) | 협력 모델 확정 후 결정 |
| 기간 | Phase 0~8 약 7개월 + 사후관리 5년 | 양산 일정 |
| 코드량 | 펌웨어 5종 (Sensor Light + 리모컨 + IR Bridge + Mesh Node + Gateway) + 서버 SW | 자체 코드베이스 다수 |
| 호스트 | 다양 (Cortex-M0+/M4/M33 + 서버) | cross-vendor |

→ **현재 Tier 1 (단발 SI) 분류**, 협력 모델 확정 시 Tier 2 (sub-vault) 또는 Tier 3 (제품화·multi-agent 합류) 승격 후보.

## 다음 단계

1. ESCO 사업자 측 자료 검토 후 후속 미팅
2. 협력 모델 (A/B/C/D 중) 선택
3. Phase 0 사양 확정 (양산 수량·옵션·일정)
4. PoC Zone 선정 (시범 가동 시 적격심사 가점 가능)

## 메타

| 항목 | 값 |
|---|---|
| 진입 일자 | 2026-05-28 |
| 사용자 결단 필요 시점 | ESCO 사업자 미팅 후 협력 모델 선택 |
| myWiki entity 신설 일자 | 2026-05-28 |
| 다음 갱신 | 후속 미팅 결과 / 협력 모델 확정 / Tier 승격 시 |
