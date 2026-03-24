# Roadmap: Task Tracker CLI

## Milestone: v1.0 MVP

GSD 학습을 위한 최소 기능 CLI 할일 관리 도구

### Phase 1: 프로젝트 설정 및 CLI 구조
**Goal**: Node.js 프로젝트 초기화 및 CLI 기본 구조 구축

**Deliverables**:
- package.json 설정
- Commander.js 기반 CLI 진입점
- 기본 명령어 스켈레톤

**Requirements Covered**: NFR-3

---

### Phase 2: 데이터 저장소 구현
**Goal**: JSON 파일 기반 할일 저장/로드 기능

**Deliverables**:
- storage.js 모듈
- tasks.json 읽기/쓰기
- 데이터 스키마 구현

**Requirements Covered**: NFR-1

---

### Phase 3: 핵심 명령어 구현
**Goal**: add, list, done 3가지 명령어 구현

**Deliverables**:
- `task add "내용"` 구현
- `task list` 구현
- `task done <id>` 구현

**Requirements Covered**: FR-1, FR-2, FR-3, AC-1, AC-2, AC-3, AC-4

---

### Phase 4: 마무리 및 테스트
**Goal**: 에러 처리 강화 및 최종 검증

**Deliverables**:
- 에러 처리 개선
- README.md 작성
- 전체 기능 테스트

**Requirements Covered**: NFR-2, AC-5

---

## Progress Tracker

| Phase | Status | Completion |
|-------|--------|------------|
| Phase 1 | Pending | 0% |
| Phase 2 | Pending | 0% |
| Phase 3 | Pending | 0% |
| Phase 4 | Pending | 0% |

---

## Future Milestones (Backlog)

### v1.1 확장 기능 (선택적)
- Phase 5: delete 명령어
- Phase 6: 우선순위 기능
- Phase 7: 필터링 기능
