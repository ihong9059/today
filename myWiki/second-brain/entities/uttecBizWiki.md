---
title: uttecBizWiki (onDevice AI 제품 비즈니스 vault)
type: entity
created: 2026-05-05
updated: 2026-05-07
status: ✅ 본격 진입 (5/7~), scope 정정 (5/7 18:05)
tags: [vault, biz-wiki, AI-FanStick, Stage4, onDevice-AI, 단일제품군]
links: [onDevice-ai, ai-fanstick, uttec-stage-package]
---

# uttecBizWiki

## 한 줄 정의

`onDevice_AI/` vault에서 개발하는 제품(AI FanStick 차세대 + Stage 4 패키지)의 **비즈니스 전용 vault**. **단일 제품군 전용** — 다른 사업 영역은 본 vault에 포함하지 않음.

## 위치

`C:\todo\today\uttecBizWiki\` (myWiki 외부)

## scope (정정 5/7 18:05)

### ✅ 본 vault 포함
- AI FanStick 차세대 비즈니스 (제품 1)
- Stage 4 패키지 비즈니스 (제품 2)
- 위 두 제품의 고객·시장·매출

### ❌ 본 vault 미포함 (다른 곳에서 처리)
| 영역 | 어디에 |
|---|---|
| 위시캣 일반 활동 | myWiki entities/위시캣활동.md |
| 한국기계 Stage 0·1·2·3 일반 영업 | 영업/Stage0_견적서 + myWiki |
| 강사양성 파일럿 | aiStudy/.../강사양성_파일럭/ + myWiki entities/강사양성_파일럿.md |
| 정부지원 교육사업 | 영업/정부지원_교육사업/ + myWiki entities/정부지원_교육사업.md |
| uttec-edu, REVITA, 스마트팩토리, 다른 제품 | myWiki |

## 분리 원칙

> **"이 제품(AI FanStick 차세대 / Stage 4)의 비즈니스인가?"** — ✅ 본 vault, ❌ 다른 곳.

## 진화 이력

| 날짜 | 상태 |
|---|---|
| 2026-05-05 | 검토 노트 작성 (UTTEC 사업 전반 가설), 보류 |
| 2026-05-07 17:50 | 본격 진입 (광범위 scope, 잘못 작성) |
| **2026-05-07 18:05** | **scope 정정** — onDevice AI 제품 전용으로 좁힘 |

## 3-vault 구조 (5/7 확정)

| vault | 역할 | 책임 |
|---|---|---|
| `myWiki/second-brain/` | 학습+개인+도구+**모든 사업 영역** | 본 vault 외 모든 영역 |
| **`uttecBizWiki/`** | **onDevice AI 제품 비즈니스만** | AI FanStick + Stage 4 |
| `onDevice_AI/` | 같은 제품의 **기술 검증** (단기) | (한 쌍) |

## 폴더 구조

```
uttecBizWiki/
├── README.md / CLAUDE.md / index.md / log.md
├── 0_검토_노트.md (5/5)
├── entities/
│   └── AI_FanStick.md (제품 1)
│   (예정) Stage4_패키지.md, 한국기계_Stage4.md, K-POP_시장.md
├── raw/  (제품 영업 이벤트만)
└── thoughts/  (제품 비즈니스 패턴만)
```

## cross-link 흐름

```
[onDevice_AI] 기술 검증
       ↓ 검증 결과 (실측 SRAM·시간·BOM)
       ↓
[uttecBizWiki/entities/AI_FanStick.md] ← 본 vault
       ↓ 비즈니스 갱신
       ↓
[Stage 4 영업 자료 + 첫 수주 시도]
       ↑ 시장 피드백
       ↑
[onDevice_AI] 다음 검증 사이클
```

## 다음 갱신 시점

| 시점 | 갱신 |
|---|---|
| onDevice 검증 Phase 1A 완료 | entities/AI_FanStick.md "기술 근거" |
| 영업 이벤트 발생 | raw/ 미팅·매출 기록 |
| 첫 Stage 4 수주 | thoughts/ 종합 + 메타 갱신 |

## 관련 페이지
- [[onDevice-ai]] — 기술 vault (한 쌍)
- [[ai-fanstick]] — 제품 기술·특허 (myWiki, 학습/큰그림)
- [[uttec-stage-package]] — 4.5-Stage 영업 모델 (Stage 4 한 부분)

## 메타

| 항목 | 값 |
|---|---|
| 검토 노트 | 2026-05-05 |
| 본격 진입 | 2026-05-07 17:50 |
| scope 정정 | 2026-05-07 18:05 |
| 첫 entity | AI FanStick |
| 운영 영구성 | onDevice AI 제품 라인 살아있는 한 영구 |
