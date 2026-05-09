---
title: log.md 분기 아카이브
type: log-archive-index
created: 2026-05-09
updated: 2026-05-09
---

# log-archive — 분기별 위키 로그 아카이브

## 목적
`log.md`(시간순 위키 로그)가 사이즈 누적으로 컨텍스트 부담을 일으키지 않도록, **분기 단위로 분리 보관**한다.

## 정책 (확정: 2026-05-09)

### 트리거 (둘 중 먼저 도달)
1. **사이즈**: 활성 `log.md` ≥ 500 KB
2. **시간**: 직전 분기 종료일 + 7일 경과 (예: Q1 종료 3/31 → 4/7 트리거)

### 활성/아카이브 분리
- **활성 `log.md`**: 최근 90일치만 유지 (가벼움)
- **아카이브 `log-archive/YYYY-QN.md`**: 90일 이상 지난 항목

### 분기 정의
- Q1 = 1월 ~ 3월 (1/1 ~ 3/31)
- Q2 = 4월 ~ 6월 (4/1 ~ 6/30)
- Q3 = 7월 ~ 9월 (7/1 ~ 9/30)
- Q4 = 10월 ~ 12월 (10/1 ~ 12/31)

## 분리 절차

트리거 도달 시 (`/work-end`에서 자동 알림) 사용자 확인 후:

1. log.md에서 분리 대상 분기 항목 추출
2. `log-archive/YYYY-QN.md` 생성 (또는 기존 파일에 append)
3. 신규 파일 프론트매터:
   ```yaml
   ---
   title: 위키 로그 아카이브 YYYY-QN
   type: log
   created: YYYY-MM-DD
   updated: YYYY-MM-DD
   archived_from: log.md
   ---
   ```
4. log.md에서 해당 항목 제거
5. log.md 상단 `updated:` 갱신 + "분리: YYYY-QN → log-archive" 1줄 메모
6. work-end git commit에 함께 포함

## 참조 패턴 (Claude)

| 작업 | 읽는 파일 |
|------|---------|
| `/work-start`, `/work-end` (일상) | `log.md` (활성)만 |
| 일반 query | `log.md`만 (충분한 경우) |
| "작년/3개월 전 X 했지?" | `log-archive/YYYY-QN.md` 해당 분기만 |
| 시간 횡단 검색 | `Grep` 도구로 `log*.md` 또는 `log-archive/*.md` |

## 아카이브 목록

(첫 분리 시 이 섹션에 자동 추가)

| 파일 | 기간 | 항목 수 | 사이즈 |
|------|------|--------|--------|
| (아직 없음) | | | |

## 관련 정책 문서
- `myWiki/second-brain/CLAUDE.md` — "log.md 분기 아카이브 정책" 섹션
- `.claude/skills/work-end/SKILL.md` — 5-D 단계 (자동 트리거 체크)
