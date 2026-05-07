---
title: onDevice AI 검증 vault
type: entity
created: 2026-05-07
updated: 2026-05-07
status: 🔄 vault 골격 작성 완료, Phase 1A (microGPT PC 실행) 대기
tags: [vault, On-Device AI, microGPT, AI FanStick, ESP32-S3, Stage4]
links: [ai-fanstick, uttec-stage-package, On-Device AI, claude-code]
---

# onDevice AI 검증 vault

## 한 줄 정의

ESP32-S3 + On-Device AI 통합 검증 작업 공간. **microGPT(Karpathy 200줄) + AI FanStick 차세대 + Stage 4 영업 패키지를 한 vault에서 통합 검증**.

## 위치

`C:\todo\today\onDevice_AI_검증\` (myWiki 외부, 별도 vault)

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
onDevice_AI_검증/
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
| 1A | microGPT PC 직접 실행 | ⬜ 대기 (즉시 가능) |
| 1B | 포팅 가능성 분석 | ⬜ |
| 2 | ESP32-S3 보드 입수 | ⬜ (사용자 직접) |
| 2 | ESP32-S3 hello_world | ⬜ |
| 2 | microGPT ESP32-S3 포팅 | ⬜ |
| 3 | AI FanStick SLM 통합 결정 | ⬜ |
| 3 | Stage 4 영업 자료 갱신 | ⬜ |

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
- **본 vault (onDevice_AI_검증)**: 검증 작업 공간 (단기 프로젝트)
- 둘은 다른 목적 — uttecBizWiki는 사업 운영, 본 vault는 기술 검증

## 관련 페이지
- [[ai-fanstick]] — 특허 출원 완료, 본 vault 검증 후 차세대 버전 갱신
- [[uttec-stage-package]] — Stage 4 영업 패키지 (본 vault 검증 결과 반영)
- [[On-Device AI]] — 핵심 기술 트렌드
- [[claude-code]] — 본 vault 운영 도구

## 메타

| 항목 | 값 |
|---|---|
| vault 시작 | 2026-05-07 |
| 통합 항목 | 작업보고서 #18·#23 + Notion #21 |
| 핵심 가설 | microGPT 4K 파라미터 = ESP32-S3 SRAM 1% 미만 사용 |
| 즉시 진행 가능 | Phase 1A (PC만 필요) |
| 사용자 직접 필요 | ESP32-S3 보드 입수 (1~2주) |
| 예상 매출 임팩트 | 6개월 2,000~3,500만 |
