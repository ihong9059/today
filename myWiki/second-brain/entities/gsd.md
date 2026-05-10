---
title: GSD 워크플로우 (archive)
type: entity
status: archived
created: 2026-04-22
updated: 2026-05-10
archived: 2026-05-10
archived_to: ihong9059/ext (commit 695e4ea, path gsd/)
tags: [GSD, 프로젝트관리, CLI, 학습, archived]
links: [claude-code, skills, projects]
---

# GSD 워크플로우 (gsd) — archived

> ⚠️ **2026-05-10 archive**: 학습 완료(v1.0 MVP, 2026-03-24 모든 페이즈 COMPLETED) 후 운용 중단. [`ihong9059/ext` repo의 `gsd/` 폴더](https://github.com/ihong9059/ext/tree/main/gsd)로 이동. today repo에서 제거.
>
> **`/gsd:*` 슬래시 명령은 ~/.claude/commands/gsd/ 와 ~/.claude/get-shit-done/에 별도 설치되어 본 폴더와 무관 — 정상 동작 유지**.

## 개요
Get-Shit-Done 프로젝트 관리 프레임워크 학습 프로젝트. Claude Code의 GSD 스킬을 실습하기 위한 간단한 Task Tracker CLI 구현 + 산출물 사례.

## 구성 (archive 시점)

### 코드
- **CLI 앱** (`src/`): Commander.js 기반 Task Tracker
  - `src/index.js` — add / list / done 명령어
  - `src/storage.js` — JSON 파일 저장소
- **데이터** (`tasks.json`): 런타임 데이터

### GSD 산출물 (`.planning/`)
- PROJECT.md / REQUIREMENTS.md / ROADMAP.md / STATE.md
- `phases/1~4/PLAN.md` + `phases/1~4/VERIFICATION.md` — 4 페이즈 모두 COMPLETED
- `research/SUMMARY.md` — 사전 조사 (Taskwarrior, Todo.txt 비교)

### 학습 가이드
- **`실습_설명서.md`** (23KB, 2026-05-10 추가) — 9 섹션 종합 한국어 가이드. **새 실습 프로젝트(예: Number Memo CLI)를 만들 때 그대로 따라 쓸 수 있는 템플릿 + 6단계 산출물 작성법 + 함정 + 학습 순서**.
- `GSD_실습_계획서.md` — 실습 메타 계획 (스킬 호출 순서 포함)

### 상태
- 모든 페이즈 COMPLETED
- v1.0 MVP 마일스톤 완료
- 작업 마지막: 2026-03-24

## GSD 스킬 (별도 설치, 폴더 무관)
- /gsd:new-project, /gsd:plan-phase, /gsd:execute-phase
- /gsd:progress, /gsd:verify-work, /gsd:ship
- 총 40+ 스킬 명령어 (~/.claude/commands/gsd/, ~/.claude/get-shit-done/)

## 부활 시 (실습 재개)
```bash
git -C /tmp clone --depth 1 https://github.com/ihong9059/ext.git
cp -r /tmp/ext/gsd /c/todo/today/gsd
# 새 실습은 별도 폴더 권장: /c/todo/today/gsd_practice/numberMemo/
# 실습_설명서.md §3 참조
```

또는 **새 실습만 즉시 시작하려면**: ext repo의 `gsd/실습_설명서.md` §3 (Number Memo CLI) 만 참조해도 충분.

## 관련
- [[claude-code]] — GSD 스킬 시스템의 호스트 (스킬은 별도 설치, 본 폴더 archive와 무관)
- [[projects]] — 프로젝트 관리 방법론
