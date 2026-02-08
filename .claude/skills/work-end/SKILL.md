---
name: work-end
description: 작업 종료 시 사용. 작업보고서 업데이트, git commit/push. 세션 종료 전 호출
---

작업 종료 절차:
1. 이번 세션 작업 내용 정리 (완료/미완료 구분)
2. 작업보고서 업데이트 (오늘 할일 상태, 작업 내용, 세션 요약)
3. git status → git diff → 사용자 확인 → git add/commit/push
4. 커밋 메시지: "작업: {주요 작업 요약}"
5. 완료율 표시 및 내일 작업 안내
