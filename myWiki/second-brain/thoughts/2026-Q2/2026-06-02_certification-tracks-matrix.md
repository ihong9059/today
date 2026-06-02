---
title: 인증 5 범주 분리 매트릭스 + 셀 모델 양산 BOM 의사결정 우선순위 + ESP32-P4 CNN 가속 신사업 carry
type: thought
created: 2026-06-02
updated: 2026-06-02
tags: [인증매트릭스, KC인증5범주, 배터리인증, KC62133, UN38.3, 충전기KC, 셀모델우선의사결정, 양산BOM, ESP32-P4, CNN가속, 영상추론노드, AISG-CNN-carry, 농업IoT신사업, 도메인권고박제, ingest외-박제패턴, 자동화가지치기, revita, 결정29, 결정30, 결정31]
links: [revita, strengths, gaps, ai-direction, aisg, 한림용인cc-고가수조, ai-fanstick, onDevice-ai, 2026-06-02_copy-verify-decide, 2026-06-01_tower-modular-rewrite-iqc-stage2]
---

# 인증 5 범주 분리 매트릭스 + 셀 모델 우선 의사결정 + ESP32-P4 신사업 carry

## 트리거

2026-06-02 야간 revita-claude 카드 #2026-06-02-003 흡수. **2건 통합** = ① ingest #15 (TC-21 후속 + Tower SBC 대체 보드 조사) + ② 배터리 인증 양산 게이트 (사용자 도메인 질의 후속, ingest 아님). 신규 entity 1건 (battery-cert, revita 측), 갱신 entity 2건. 위험 carry 9건 → 양산 RA 15 → 24.

## A + B + C → D 패턴

[A: 6/1 §10 양면 IQC (Link + Tower)] + [B: 6/2 §11 펌웨어 원본 품질 게이트 (사본 정책 + doc/ 단일화)] + **[C: 6/2 야간 §12 인증 매니지먼트 역량 (KC 5 범주 분리 + 셀 모델 우선 의사결정)]** → **D: 양산 출하 게이트 풀스택 자산화 (펌웨어 + 인증 트랙 + BOM 의사결정 트리)**.

| 단계 | 시점 | 자산 |
|:-:|---|---|
| 1 | 5/29 §9 | 양산 IQC 자동화 (Link 단면) |
| 2 | 6/1 §10 | 양면 IQC (Link + Tower) |
| 3 | 6/2 §11 | 펌웨어 원본 품질 게이트 (사본 정책 + doc/ 트리 단일화 + 양산 RA 15) |
| **4** ⭐ | **6/2 야간 §12 NEW** | **인증 매니지먼트 역량 (KC 5 범주 + 배터리 직교 + 셀 모델 우선 의사결정 + 양산 RA 24)** |

5채널 영업 카피 4단계 깊이 확장. 양산 BOM 의사결정 트리 최상위 자산 신설.

## KC 인증 5 범주 분리 매트릭스 (결정 30)

| 범주 | 배터리 직접 시험? | 현 entity-kc-cert family 다룸 |
|---|:-:|:-:|
| KC EMC (5/19 RE fail 회복) | ❌ | ⭕ |
| KC RF (LoRa SRD) | ❌ | ⭕ (모듈 인증 활용) |
| **KC 62133 (셀 안전)** | ⭕ 필수 | ❌ (트랙 부재) |
| **충전기 KC (솔라/외부)** | ⭕ 조건부 | ❌ (트랙 부재) |
| **UN38.3 (운송)** | ⭕ 필수 | ❌ (트랙 부재) |

→ **현 KC 트랙 (EMC/RF/기능시험 중심) 과 직교**. 배터리 직접 시험 3개 (62133 + 충전기 + UN38.3) 양산 출하 전 별도 해소.

## 양산 BOM 의사결정 트리 (최상위 = 셀 모델)

```
양산 진입
└─ [1] 셀/팩 모델 결정 (← 최상위, cost·duration impact 최대)
    ├─ 외부 인증품 구매 → 완제품 시험 면제 (인증서 보관만, 비용 0)
    └─ 자체 셀 조립 + PCM 설계
        └─ 자체 인증 필요 (KTL/KTC, 수백~수천만원, 8~12주)
    └─ [2] 충전회로 결정 (솔라 내장? 외부 어댑터?)
        └─ 충전기 KC 적용 여부 분기
    └─ [3] 운송 인증 (UN38.3 필수)
    └─ [4] PCM 검증 (셀 인증서 범위 일치)
    └─ [5] 다른 부품 (BLE/LoRa/MCU) — 인증 impact 작음
```

→ **셀 모델이 다른 부품보다 인증 cost·duration impact 가장 큼**. 양산 캐파 산정 진입 시 우선 의사결정 항목.

## 신사업 carry — ESP32-P4 CNN 가속 영상 추론 (결정 31)

ingest #15-2 Tower SBC 대체 보드 조사 (Core3506 Linux $17 vs **ESP32-P4+C6 RTOS $14**) — CNN 가속 내장. 본 vault AISG / 한림용인CC / onDevice_AI Stage 4와 강하게 매칭.

### 매칭 영역

| 영역 | 매칭 | 신사업 단서 |
|---|---|---|
| **AISG** ⭐ | RET / TMA / GLS / ASD 측면 영상 분석 | 안테나 정렬·환경 모니터링·고장 예측 영상 노드 |
| **한림용인CC** ⭐ | 수위 sensor 노드 옆 영상 추론 노드 | 탁도 / 이물질 / 구조물 변형 모니터링 |
| **AI + 농업 IoT** ⭐⭐ | 작물 상태 / 병해충 엣지 추론 | LoRa 센서 노드 → 영상 노드 진화 |
| **AI FanStick / Stage 4** | $14 ESP32-P4 BOM path 후보 | onDevice_AI Stage 4 영상 추론 트랙 |
| **lemonLabs AI 응원봉** | 영상 인식 응원 효과 | 신사업 cross-vault carry |

→ 본 thought 박제로 ESP32-P4 채택 결정 (revita 측) 시 즉시 신사업 단서 활용 가능.

## 도메인 권고 박제 패턴 정착 (결정 29)

revita-claude 도입 신규 패턴 = **ingest (코드/문서 변경 흡수) 외에 사용자 도메인 질의 후속 박제** 별도 카테고리. log.md 별도 분류 운용.

> "코드/문서 변경 흡수만 자산화하면 도메인 권고 (인증·규제·시장) 누락. 사용자 질의 후속 박제로 정착."

**적용 영역 (myWiki cross-vault)**:
- ondevice / wishket / lemonLabs / search / uttechome 사용자 도메인 질의 후속 박제
- 사용자 질의 → AI 권고 정리 → vault 측 thoughts/ 또는 ai-direction 판단 로그 카테고리
- AI ↔ 사용자 양방향 지식 정착 흐름 (단방향 ingest 보완)

## 운영 절차 silent failure → 자동화 가지치기 단서

#15-1 CONFIG 순서 silent reject (`sensor_module.c:1287` CONFIG_CREATE 는 SESSION_OFF 일 때만 허용) = **코드 alert 없음 + 운영 매뉴얼 의존**. 양산 IQC 자동화 인프라 (kc_cert_link_v2-test 17 PASS) 의 **다음 단계 = 운영 절차 자동 검증 도구** 단서.

**일반화 패턴** (다른 영역 동일 가능):
- NVS slot 순서 의존성
- 12V boost / 3.3V 안정화 의존성
- BLE pairing 순서 (RF SDR 시점 의존)
- 인증 트랙 순서 (BOM → 셀 모델 → 충전기 → 운송)

→ gaps.md § 자동화 가지치기 단서 + 강의·교재 자산화 가치 (양산 IQC 자동화 다음 단계).

## 5채널 영업 깊이 확장 (4단계)

| 채널 | §10 (6/1) | §11 (6/2) | **§12 (6/2 야간 신규)** |
|---|---|---|---|
| **uttechome** | 양면 IQC + RM76 BATCH | 원본 품질 게이트 + 양산 RA 15 | **인증 5 범주 분리 + 셀 모델 우선 의사결정 (BOM 결정 트리 최상위)** |
| **위시캣 사례연구** | 17 PASS + 99.1% | 펌웨어 디버깅 15건 | **인증 매니지먼트 역량 (외주 비용/기간 추정 가능)** |
| **한림용인CC** | Flask + AUTO 시공 풀스택 | doc/ 트리 단일화 | **시공 + 인증 + 운영 단일 doc/ 트리 (결정 27 + 결정 30 결합)** |
| **shield / n8n** | 다중 path 자동화 | 사본 정책 + 단일 게이트 | **CNN 가속 영상 추론 신사업 carry (cross-vault)** |
| **AI FanStick / lemonLabs** | (작음) | (작음) | **배터리 인증 트랙 cross-vault carry (셀 모델 결정 시점)** |

## 후속 트리거

- **사용자 결정 후 박제 carry** (revita 측 + myWiki 측):
  - 사용 셀/팩 모델 (Link / Tower 각각)
  - KC 62133 + UN38.3 인증서 보유 여부
  - PCM 보호회로 구조 (자체 vs 셀 인증서 포함)
  - 솔라 충전회로 완제품 내장 + 회로 구조 (MPPT/PWM)
  - 양산 BOM 의 배터리·충전 부품 항목
- **ESP32-P4 채택 결정** (revita 측 Core3506 Linux 앱 코드량 확인 후) → AISG / 한림용인CC / onDevice Stage 4 신사업 즉시 활성화
- **운영 절차 자동 검증 도구** (CONFIG 순서 silent reject 후속) — kc_cert_link_v2-test 다음 단계
- **다음 ingest #16** (revita HEAD `d11b0ff4` 이후)

## 행동 변화 D

1. **인증 매니지먼트 역량 영업 자산 활성화** — uttechome / 위시캣 사례연구 카피에 §12 매트릭스 + 셀 모델 의사결정 트리 즉시 carry
2. **다른 양산 진입 프로젝트 동일 패턴 적용** — AI FanStick / Stage 4 / lemonLabs AI 응원봉 / 한림용인CC 모두 셀 모델 우선 의사결정 단서 박제
3. **도메인 권고 박제 카테고리 운용 시작** — myWiki log.md 별도 분류 (사용자 도메인 질의 후속 박제)
4. **운영 절차 자동 검증 도구 단서 보존** — kc_cert_link_v2-test 다음 단계 자산화 단서

## 관련

- [[revita]] § 6/2 야간 ingest #15 + 배터리 인증
- [[strengths]] §12 인증 매니지먼트 역량
- [[gaps]] § 양산 RA 15 → 24
- [[ai-direction]] §결정 29~31
- [[aisg]] § ESP32-P4 CNN 가속 신사업 carry
- [[2026-06-02_copy-verify-decide]] (직전 §11 단계)
- [[2026-06-01_tower-modular-rewrite-iqc-stage2]] (§10 양면 IQC)
