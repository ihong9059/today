---
name: feedback_report_numeric_table_notion_pollution
description: 작업보고서에 첫 칼럼이 숫자인 보조 테이블 추가 금지 — notion-sync가 todo로 오인해 Notion 오염 (2026-10-25 박제)
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 047277b5-95e9-4845-9441-a4b0c4307164
---

**작업보고서(`작업보고서/YYYY-MM-DD_작업보고서.md`)에 첫 칼럼이 정수인 테이블을 "오늘 할일" 외에 추가하면 안 된다.**

`notion-sync.py`의 `get_report_todos()`는 **파일 전체**에서 `| <정수> | <텍스트> | ... |` 형태(칼럼 ≥4)의 모든 행을 todo로 파싱한다 — 섹션 구분 없음. 보조 테이블(상태 재편표·요약표 등)의 행이 기존 Notion 항목과 fuzzy 매칭에 실패하면 **Notion에 신규 todo로 오염**된다.

**Why:** 2026-10-25 todo 재편표(1~16 숫자 칼럼)를 작업보고서에 박제 → sync가 "[1] _inbox 흡수"·"[2] 여수공항 대시보드" 2건을 Notion에 잘못 추가 → API로 블록 삭제 + 재편표 번호를 ①~⑯으로 교체해 복구.

**How to apply:** 작업보고서에 보조 테이블을 넣을 때 순번 칼럼은 **①②③ 원문자·"1."·비숫자 라벨** 사용 (int() 파싱 실패 형태). 또는 테이블 대신 불릿. sync 실행 후 "작업보고서→Notion N건 추가"가 의도 밖이면 즉시 Notion 블록 확인·삭제. 근본 수정하려면 `get_report_todos()`를 "## 오늘 할일" 섹션 한정으로 패치 ([[feedback_todo_notion_sync]] 참조).
