---
title: uttecBizWiki (DEPRECATED — onDevice_AI/business/로 흡수)
type: entity
created: 2026-05-05
updated: 2026-05-15 (DEPRECATED — onDevice_AI vault에 흡수, 별도 vault 폐지)
status: ⚠️ DEPRECATED (5/15) — `/todo/onDevice_AI/business/` 로 흡수 완료
tags: [vault, deprecated, AI-FanStick, Stage4, onDevice-AI, 흡수완료]
links: [onDevice-ai, ai-fanstick, uttec-stage-package]
---

# ⚠️ DEPRECATED — onDevice_AI/business/ 로 흡수

> **2026-05-15 변경**: 본 vault는 별도 vault에서 `onDevice_AI` vault의 `business/` 하위 폴더로 흡수됨. 별도 vault 폐지.

## 현재 위치

- **신규**: `C:\todo\onDevice_AI\business\` (별도 git repo, private, ihong9059/onDevice_AI)
- **구**: `C:\todo\today\uttecBizWiki\` → 5/15 폴더 제거됨

## 흡수 동기

같은 제품(AI FanStick + Stage 4)의 **기술과 비즈니스가 두 vault에 분리**되어 있어 cross-link 비용이 컸음. 한 vault에서 검증→영업→수주 흐름을 일직선으로 단순화하기 위해 **제품별 통합 vault**로 재구성.

당시 본 vault는 컨텐츠 0에 가까운 schema 선언 상태 (1주 정전, 영업 이벤트 0건). 흡수 비용 낮음.

## 진화 이력

| 날짜 | 상태 |
|---|---|
| 2026-05-05 | 검토 노트 작성 (UTTEC 사업 전반 가설), 보류 |
| 2026-05-07 17:50 | 본격 진입 (광범위 scope, 잘못 작성) |
| 2026-05-07 18:05 | scope 정정 — onDevice AI 제품 전용으로 좁힘 |
| 2026-05-08 | `/biz-*` skill 신설, 평가 갭 6개 분석 |
| **2026-05-15** | **DEPRECATED** — `onDevice_AI/business/` 로 흡수, 별도 vault 폐지 |

## 흡수 후 위치 매핑

| 구 위치 | 신 위치 |
|---|---|
| `today/uttecBizWiki/README.md` + `CLAUDE.md` | `onDevice_AI/business/README.md` + `business/CLAUDE.md` (변형, scope 보존) |
| `today/uttecBizWiki/entities/AI_FanStick.md` | `onDevice_AI/business/entities/AI_FanStick.md` (그대로) |
| `today/uttecBizWiki/0_검토_노트.md` | `onDevice_AI/business/0_검토_노트.md` (그대로) |
| `today/uttecBizWiki/log.md` | `onDevice_AI/log.md` (통합 시간순) |
| `today/uttecBizWiki/index.md` | (제거 — 본 vault 인덱스로 충분) |
| `today/uttecBizWiki/작업보고서/2026-05-08_*.md` | `onDevice_AI/작업보고서/2026-05-08_작업보고서_uttecBizWiki.md` (rename) |

## 2-vault 구조 (5/15~)

| vault | 역할 | 책임 |
|---|---|---|
| `myWiki/second-brain/` | 학습+개인+도구+범 사업 통합 | 본 vault 외 모든 영역 |
| **`/todo/onDevice_AI/`** | **AI FanStick + Stage 4 제품 통합 (기술 + 비즈니스)** | 한 제품의 처음부터 끝까지 |
| (참고) `/todo/revitaProject/` | REVITA 제품 (기술 + 위키) | 별도 제품 |

## 본 entity 처리 방침

- **삭제하지 않음** — 흡수 이력 박제 가치 (1주 vault의 scope 정정 사이클)
- 향후 `/todo/onDevice_AI/business/`로의 redirect anchor 역할
- 본 entity 갱신은 더 이상 발생하지 않음 (DEPRECATED)

## 관련 페이지
- [[onDevice-ai]] — **현재 위치 (흡수처)**
- [[ai-fanstick]] — 제품 기술·특허 (myWiki, 학습/큰그림)
- [[uttec-stage-package]] — 4.5-Stage 영업 모델

## 메타

| 항목 | 값 |
|---|---|
| 검토 노트 | 2026-05-05 |
| 본격 진입 | 2026-05-07 17:50 |
| scope 정정 | 2026-05-07 18:05 |
| **DEPRECATED** | **2026-05-15** — onDevice_AI/business/ 로 흡수 |
| 첫 entity | AI FanStick (현 위치: onDevice_AI/business/entities/) |
