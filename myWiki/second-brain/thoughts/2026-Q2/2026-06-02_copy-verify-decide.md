---
title: 사본 정책 (Copy + Verify, Then Decide) — 펌웨어 원본 품질 게이트 단계 진입
type: thought
created: 2026-06-02
updated: 2026-06-02
tags: [사본정책, copy-verify-decide, 원본품질게이트, 양산RA15, doc트리단일화, LTE단일게이트, revita, ingest14, 양면IQC깊이확장, 결정26, 결정27, 결정28]
links: [revita, strengths, gaps, ai-direction, 2026-06-01_tower-modular-rewrite-iqc-stage2, 2026-05-27_revita-IQC-자동화-인프라]
---

# 사본 정책 (Copy + Verify, Then Decide) — 펌웨어 원본 품질 게이트 단계 진입

## 트리거

2026-06-02 revita-claude 카드 #2026-06-02-001 흡수 (ingest #14-A/B). link_v2 자체 시험 10/10 PASS + 원본 버그 4건 발견 + checklist 위키 정본 격상 + LTE 단일 게이트. **신규 entity 0건, 갱신 5건** — 모두 깊이 확장.

## A + B → C 패턴

[기존 §10 양면 IQC (Link 단면 + Tower 단면 진입)] + [link_v2_test/ 9K LOC 사본 자체 시험 + 원본 버그 4건 발견] → **§11 펌웨어 원본 품질 게이트 단계 진입 (3단계 진화)**.

| 단계 | 시점 | 의미 | 자산 |
|:-:|---|---|---|
| 1 | 5/29 §9 | 양산 IQC 자동화 (Link 단면) | scenarios/ 17 PASS, 캐파 월 7,200대 |
| 2 | 6/1 §10 | 양면 IQC (Link + Tower) | Static 31 PASS (sbc 11 + security 12 + lux 8), 인증 자산 18 정본 |
| **3** ⭐ | **6/2 §11 NEW** | **펌웨어 원본 품질 게이트** | **사본 디버깅 → 원본 결정 정책 + 양산 RA 15 + doc/ 트리 단일화** |

## 사본 정책 (Copy + Verify, Then Decide)

> "검증된 fix 의 원본 반영은 즉시 하지 않고 별도 결정. 양산 출하 게이트 전까지 사본·원본 병행 운영."

**Why**: 원본 직접 수정 시 (a) 다른 시험에서 회귀 가능 (b) 원본의 stability 보장 무너짐. 사본 검증 → 원본 반영 시점 = **양산 출하 게이트 통과 시점**.

**revita 적용**:
- `link_v2_test/` (9K LOC) = `link_v2` 본체의 사본
- 자체 시험 10/10 PASS + 원본 버그 4건 발견 (sensor_module NVS chunk / device_manager nvs_write 반환값 / sensor_cfg all-zero / rs485 wait_rx drain)
- fix는 사본에서만 검증, 원본 미반영 carry → gaps.md 양산 RA 7~10 박제

**일반화 가능 영역**:
- **펌웨어 다중 시험 트랙**: link_v2 / kc_cert_link_v2 / 다른 펌웨어 시험에서 동일 패턴
- **AI 모델 fork**: 모델 fork → 검증 → 원본 merge (예: ondevice INT8 quantization 검증 사본 → 원본 적용 시점 결정)
- **강의안 / 사업계획서 / 외부 발송 문서**: 사본 → 검증 → 원본 (memory `feedback_document_version_separate_file.md` 5/30 박제와 일관 — 외부 발송 문서 in-place 금지 + 별도 버전 파일 정책)
- **위시캣 지원서**: 회사명 마스킹 사본 → 검증 → 원본 (memory `feedback_wishket_no_company_name.md`)

## doc/ 트리 단일화 (결정 27)

`apps/system/tower/test/` (code 옆) → `doc/revita_tower_firmware/checklist/` (정본 문서 옆) 통합. KC 인증 + 양산 IQC + 운영 매뉴얼 + 디버깅 사례 (양산 RA 15) **단일 doc/ 트리 export**.

**Why**: 분산 시 외부 (인증 기관, 양산 라인) 제공 시 부분 누락 위험. 단일 트리로 자산화 1단계 완결.

**uttec 사업 자산화 운영 정책 후보**:
- KC 인증 자료 + 양산 IQC + 영업 카피 + 디버깅 사례를 vault 측에서도 단일 트리로 export 가능하게 정렬
- 다른 vault (uttechome / wishket / lemonLabs / onDevice_AI) 동일 패턴 적용 검토
- 외부 제공 시 vault 측 SOP: "doc/ 트리 zip export → 인증 기관 / 영업 채널 / 양산 라인 공유"

## LTE 단일 게이트 (결정 28)

`lte_build` (CMake/Kconfig/TODO) + `lte_runtime` (FSM 8 시나리오) 분리 + README §LTE 완료 기준 = 단일 판정. 모듈 간 LTE 의존 항목 PASS 게이트 단일화.

**Why**: Security/Power/Lux/SBC 의 LTE 관련 항목이 각자 독립 판정하면 분기 폭증. 단일 게이트로 의존 가시화 + 부분 판정 명확화.

**일반화 패턴**: 모듈 간 의존 단일 게이트 = 분기 폭증 방지 + 책임 분리 (빌드 vs 런타임 vs 실기). 다른 의존 패턴 (UART MUX / 12V 공유 버스 / NVS slot 등)에도 적용 가능.

## 5채널 영업 깊이 확장 ⭐⭐⭐

§11 진입으로 5채널 영업 카피 단계 격상:

| 채널 | 6/1 §10 | **6/2 §11 신규** |
|---|---|---|
| **uttechome** | 양면 IQC + RM76 BATCH 요금 협상 | "양산 IQC 자동화 → 양면 IQC → **원본 품질 게이트 + 양산 RA 15 자산화**" 3단계 차별화 |
| **위시캣 사례연구** | 17 PASS + 99.1% + 디버그 사이클 3분 | **펌웨어 디버깅 실전 사례 15건 박제** (다른 1인 컨설팅 대비 결정타) |
| **한림용인CC** | Flask + AUTO 모드 시공 풀스택 | **doc/ 트리 단일화** — 시공 자료 + 운영 매뉴얼 + 회로도 단일 export |
| **shield-claude** | DUT 다중 + 브리지 단일 | **사본 정책** — RPi 자동화 검증 후 원본 반영 정책 carry |
| **n8n-claude** | KC2 wire + bridge_app UART 표준화 | **모듈 간 의존 단일 게이트** — 다중 path 자동화 패턴 일반화 |

## 후속 트리거

- **원본 link_v2 버그 4건 (5.5~5.8) 원본 반영 시점** → 양산 출하 게이트 통과 확인 카드 (revita-claude → mywiki-claude)
- **양산 RA 15 → N 항목 해소 진행** → milestone 카드 (양면 캐파 산정 단계 진입 시)
- **kc_cert_link_v2 측 v2 와이어 호출부 점검 결과** → 다른 앱 마이그레이션 risk 박제
- **다음 ingest #15** (ssh revita HEAD `87174e2a` 이후 변경 시)

## 행동 변화 D

1. **사본 정책을 다른 vault 디버깅 영역에도 도입 검토** (ondevice / search / shield / n8n)
2. **doc/ 트리 단일화 SOP 신설** — uttec 사업 자산화 운영 정책 후보로 carry
3. **모듈 간 의존 단일 게이트 원칙** — 빌드/런타임/실기 분리, 분기 폭증 방지

## 관련

- [[revita]] § 6/2 ingest #14-A/B
- [[strengths]] §11 펌웨어 원본 품질 게이트
- [[ai-direction]] §결정 26~28
- [[gaps]] § 양산 RA 6 → 15
- [[2026-06-01_tower-modular-rewrite-iqc-stage2]] (직전 단계 §10)
- [[2026-05-27_revita-IQC-자동화-인프라]] (1단계 §9)
