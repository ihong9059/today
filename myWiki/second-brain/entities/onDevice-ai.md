---
title: onDevice AI 검증 vault
type: entity
created: 2026-05-07
updated: 2026-05-15 (vault 기초 구조 구축 완료 — 정의·실험계획·인재상·hardware 폴더 9파일)
status: ✅ Phase 1A·1B 완료 (PC PoC) / **vault foundation v1.0 완료 (5/15)** / Phase 1 (E1·E9·E10) 진입 가능 — 보드·환경·계획·인재상 모두 ✅, 담당자 합류 또는 Claude 단독 Phase 0 가능
tags: [vault, On-Device AI, microGPT, AI FanStick, ESP32-S3, Stage4, 정지선, foundation]
links: [ai-fanstick, uttec-stage-package, On-Device AI, claude-code, 2026-05-08_응원봉-온디바이스AI-정지선]
---

> **2026-05-15 vault foundation v1.0 완료**: scope 확장 (microGPT + AI FanStick → 7 hardware × 10 응용). 핵심 문서 4종 — `00_정의_OnDeviceAI.md`(헌법·5축 15질문), `0_실험계획서.md`(12 실험 + Phase 1~4), `0_인재상.md`(페르소나 3종 + 평가 80점), `hardware/`(7 보드 + matrix). vault가 분석 → 실행 단계 전환 가능.

# onDevice AI 검증 vault

## 한 줄 정의

ESP32-S3 + On-Device AI 통합 검증 작업 공간. **microGPT(Karpathy 200줄) + AI FanStick 차세대 + Stage 4 영업 패키지를 한 vault에서 통합 검증**.

## 위치

`C:\todo\today\onDevice_AI\` (myWiki 외부, 별도 vault)

## 통합 의미

3개 작업 항목을 하나의 검증 사이클로 통합:

| 출처 | 본질 |
|---|---|
| 작업보고서 #18 microGPT 직접 실행 | **검증 1**: Karpathy 200줄 PC 실행 + ESP32-S3 포팅 |
| Notion #21 AI FanStick SLM 통합 | **검증 2**: ESP32-S3 hello_world + SLM 통합 |
| 작업보고서 #23 UTTEC 사업용 새 vault | **운영 형태**: 본 vault |

## 핵심 가설

> microGPT 4,192 파라미터 = ESP32-S3 SRAM 520KB의 1% 미만 → 탑재 가능 → AI FanStick "외부 인터넷 0% 카피" 검증 가능 → Stage 4 (1,500만) 영업 패키지의 기술 근거.

## vault 폴더 구조

```
onDevice_AI/
├── README.md                       네비게이션
├── CLAUDE.md                       schema (Claude 운영 규칙)
├── 0_검증계획.md                   통합 검증 매트릭스 + 진행 흐름
├── log.md                          시간순 기록
├── microGPT/                       Karpathy 200줄 검증
│   └── 01_검증절차.md (Phase 1A·1B)
├── aiFanStick_차세대/              AI FanStick + SLM 통합
│   └── 01_검증절차.md (Phase 2)
└── 통합검증/                       두 검증의 교집합
    ├── 01_SRAM_파라미터_매트릭스.md
    └── 02_Stage4_영업매핑.md
```

## 진행 상태

| Phase | 단계 | 상태 |
|:-:|---|:-:|
| 0 | vault 골격 작성 | ✅ (5/7) |
| 1A | microGPT PC 직접 실행 | ✅ (5/8, Loss 3.37→2.65, 4192 params) |
| 1B | 포팅 가능성 분석 | ✅ (5/8, FP32 16.4KB / INT8 4.1KB / 추론 0.1~5ms 추정) |
| 1B+ | 모델 확장 시뮬레이션 | ✅ (5/8, Korean-Small 154K params 권장) |
| 2 | ESP32-S3 보드 입수 | ⬜ (사용자 직접) |
| 2 | ESP32-S3 hello_world | ⬜ |
| 2 | microGPT ESP32-S3 포팅 | ⬜ |
| 3 | AI FanStick SLM 통합 결정 | 🔄 1차 (5/8, Korean-Small 권장 / 칩 변경 불필요) |
| 3 | Stage 4 영업 자료 갱신 | ✅ 1차 동기화 (5/8, Stage4_OnDeviceAI_검토.md 실측 추가) |

## Phase 1A·1B 검증 결과 요약 (2026-05-08)

| 항목 | 측정/추정 |
|---|---|
| microGPT 학습 (PC) | Loss 3.37 → 2.65 (-21%, 1000 step, ~3분 Windows Python 3.13) |
| 추론 샘플 | 20개 영문 이름 (anna, lara, anton 등 — 패턴 학습 확인) |
| 파라미터 수 | 4,192 (가이드 일치, 공식 검증) |
| 메모리 | FP32 16.4KB / INT8 4.1KB / INT4 2.0KB → SRAM 520KB의 0.39~3.15% |
| PC 추론 시간 | token당 0.510 ms / sample(16t) 8.16 ms (Python 순수) |
| ESP32-S3 추정 | token당 0.1~5 ms (FPU/SIMD 가정) — 인터랙티브 응답 OK |
| C++ 포팅 분량 | 약 500~700줄, 1~2주 1인 작업 |
| **결론** | **포팅 가능 (압도적 여유), Phase 2 즉시 진행 권장** |
| **AI FanStick 권장 모델** | **Korean-Small (154K params, INT8 155KB) → 칩 변경 불필요** |

## 검증 → 영업 자산 흐름

본 vault 결과 → 다음 4곳에 영구 반영:

1. `영업/Stage4_OnDeviceAI_검토.md` — §3·§4·§6 실측 데이터 보강
2. `entities/uttec-stage-package.md` — Stage 4 사례 신규 (시나리오 E)
3. `entities/ai-fanstick.md` — 차세대 버전 섹션 신설
4. 강사양성 Day 5 / 호오컨설팅 / 인프런 — 사례 1건 신설

## 영업 임팩트 (검증 성공 시)

- Stage 4 첫 수주 가능: 1,500만/4주 (한국기계 또는 임베디드 스타트업)
- 강사양성 Day 5 + 호오컨설팅 + 인프런: 6개월 누계 2,000~3,500만

## uttecBizWiki와의 관계

- **uttecBizWiki**: 사업 일반 wiki (보존, 추후 재검토 후 진입) — 별개 유지
- **본 vault (onDevice_AI)**: 검증 작업 공간 (단기 프로젝트)
- 둘은 다른 목적 — uttecBizWiki는 사업 운영, 본 vault는 기술 검증

## 마케팅 정지선 (2026-05-08)

본 vault는 **응원봉 양산 적용 트랙이 아니라 "회사의 기술 자산·B2B 영업 무기·PR 콘텐츠" 트랙**으로 운영. 정지선은 **Phase 2 종료**.

| Phase | 상태 | 정지선 |
|:-:|---|:-:|
| 1A·1B | ✅ 완료 | — |
| 2 (보드 1대 PoC) | 🔵 진행 권장 | — |
| 3 (Korean-Small 154K 양산 적용) | ⛔ 정지 | ★ 정지선 |
| 3 (양산 칩 ESP32-S3 교체) | ⛔ 정지 | ★ 정지선 |
| 3 (양산 펌웨어 SLM 통합) | ⛔ 정지 | ★ 정지선 |

근거:
- microGPT 4K 파라미터 = 응원봉 사용자 기대 응답 품질에 6~7자릿수 미달
- 응원봉 양산 방향은 newMvp/온디바이스_AI_검토서 결론(스마트폰 Gemma 2B 하이브리드)으로 잠금
- 양산 BOM +1,500원/대 영향, 사용자 가치 미입증

자세한 의사결정 기록: [[2026-05-08_응원봉-온디바이스AI-정지선]]
1차 자료: `응원봉/마케팅검토/2026-05-08_온디바이스AI_정렬도검토.md`

## 관련 페이지
- [[ai-fanstick]] — 특허 출원 완료, 양산 방향은 Gemma 2B 하이브리드로 잠금
- [[uttec-stage-package]] — Stage 4 영업 패키지 (본 vault 검증 결과 반영)
- [[On-Device AI]] — 핵심 기술 트렌드
- [[claude-code]] — 본 vault 운영 도구
- [[2026-05-08_응원봉-온디바이스AI-정지선]] — 정지선 의사결정 기록

## 메타

| 항목 | 값 |
|---|---|
| vault 시작 | 2026-05-07 |
| 통합 항목 | 작업보고서 #18·#23 + Notion #21 |
| 핵심 가설 | microGPT 4K 파라미터 = ESP32-S3 SRAM 1% 미만 사용 |
| 즉시 진행 가능 | Phase 1A (PC만 필요) |
| 사용자 직접 필요 | ESP32-S3 보드 입수 (1~2주) |
| 예상 매출 임팩트 | 6개월 2,000~3,500만 |
