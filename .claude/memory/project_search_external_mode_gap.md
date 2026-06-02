---
name: search vault 외부 mode 시 메모리·세션 turn-off 옵션 미구현
description: Phase 4.3 (E·F) 가 본인용 dogfooding 으로 메모리/세션 인덱싱 적용 — 외부 deploy 시 노출 위험. turn-off 옵션 신설 필요 (gap)
type: project
---

# search vault 외부 mode gap (Phase 4.3 — 2026-06-01)

Phase 4.3 패치 E·F 적용 후 미해결 gap.

## 사실

- **현재 상태** (2026-06-01): `backend/app/services/search_index.py:collect_files()` 가 `memory_root` (`.claude/memory/*.md` 44 files) + `session_root` (`.claude/sessions/session_*.md` 최근 3개) 를 무조건 인덱싱.
- **정체성 D** (CLAUDE.md § 정체성) — search vault 는 dogfooding-via-self 모델: 1차 사용자 = 본인. 따라서 메모리·세션 노출 OK.
- **gap**: 향후 외부 회사 deploy 시 (`uttec-search` 같은 fork 포함) 메모리·세션 인덱싱을 **turn-off 가능 옵션** 으로 분리해야 함. 사용자 자기 인식 룰 (위시캣 마스킹·UTTEC 회사명·5-vault 정책 등) 이 외부에 노출되면 안 됨.

## Why

- **위시캣 마스킹 정책 누설 위험**: `feedback_wishket_no_company_name.md` 가 검색 결과 snippet 에 통째로 노출되면 정책 룰이 외부 공개됨.
- **사용자 본명·세션 carry-over 누설**: `feedback_todo_notion_sync.md` / `session_*.md` 등에 본인 작업 흐름·결단 대기 항목·5-vault 운영 details 포함.
- **외부 회사 deploy = 정체성 D 의 궁극 목표** (CLAUDE.md § 정체성). turn-off 옵션 없이는 외부 prototype 단계 자체가 불가능.

## How to apply

- Phase 5 (category 시스템) 또는 Phase 6 (배포) 에서 처리 candidate.
- 구현 후보:
  - (A) `settings.expose_memory: bool = True`, `settings.expose_sessions: bool = True` 환경변수로 toggle. `collect_files` 가 False 면 두 root 무시.
  - (B) deploy mode (`SEARCH_MODE=external` env) 검사 → 강제 turn-off.
  - (C) 메모리 파일별 frontmatter `expose: external|internal|never` 분류 (가장 정교, 가장 비용 큼).
- ack 카드 `2026-06-01-002-search-ack-phase4.3-answer-source-consistency.md` § "사용자 결단 처리 ①" 박제.
- search-claude 가 Phase 5/6 진입 시 본 메모리 참조.

## 관련

- `C:/todo/search/CLAUDE.md` § "정체성 (1차 사용자 — 2026-05-23 결단) ⭐"
- `C:/todo/search/CLAUDE.md` § "Phase 4.3" (적용 완료 박제)
- `C:/todo/search/_inbox/processed/2026-05-23-002-mywiki-search-answer-source-consistency.md` § "고려사항" (메모리 노출 결단 대기 항목)
