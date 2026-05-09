---
name: 2대 PC 동시 사용
description: today 저장소를 2대 PC에서 동시에 사용 중 — git 충돌 주의 필요
type: project
---

today 저장소(github.com/ihong9059/today.git)를 2대 PC (Windows + Mac)에서 동시에 사용 중.

**Why:** 동시 편집 시 git merge conflict 발생 가능. obsidian-git 자동 백업도 양쪽에서 동작.

**How to apply:** git 관련 설정(obsidian-git 등)은 양쪽 PC 동기화 필요. push 전 pull 필수. 충돌 가능성 고려하여 자동 pull 간격을 짧게(5분) 설정.

**메모리 동기화 (2026-05-09 추가):**
- Claude memory(`~/.claude/projects/.../memory/`)는 원래 PC별 로컬 → today repo의 `.claude/memory/`로 junction/symlink 통합
- 양 PC가 같은 메모리 파일을 git으로 공유 (이 메모리도 그렇게 동기화됨)
- 신규 PC 첫 `/work-start` 시 `.claude/hooks/setup-memory-sync.py`가 자동 셋업
- 셋업 스크립트는 idempotent (반복 실행 안전)

**경로 하드코딩 주의:**
- 일부 스킬·훅에 `C:\todo\today\...` 절대경로 박혀 있음 → Mac에서 동작 안 함
- 향후 환경변수 또는 상대경로로 추상화 필요 (별도 작업)
