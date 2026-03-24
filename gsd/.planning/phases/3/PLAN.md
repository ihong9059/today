# Phase 3: 핵심 명령어 구현

## Goal
add, list, done 3가지 핵심 명령어 완전 구현

## Requirements Covered
- FR-1: 할일 추가
- FR-2: 할일 목록
- FR-3: 할일 완료
- AC-1, AC-2, AC-3, AC-4

## Tasks

### Task 3.1: add 명령어 구현
**Action**: `task add "내용"` 명령어 구현
**Files**:
- `src/index.js` (modify)

**Details**:
- storage.js의 loadTasks, saveTasks 사용
- 새 할일에 ID 부여
- 저장 후 확인 메시지 출력

**Output**: `Added: [1] 할일 내용`

### Task 3.2: list 명령어 구현
**Action**: `task list` 명령어 구현
**Files**:
- `src/index.js` (modify)

**Details**:
- 모든 할일을 체크박스 형식으로 출력
- 빈 목록일 때 안내 메시지

**Output**:
```
[ ] 1. 미완료 할일
[x] 2. 완료된 할일
```

### Task 3.3: done 명령어 구현
**Action**: `task done <id>` 명령어 구현
**Files**:
- `src/index.js` (modify)

**Details**:
- ID로 할일 찾기
- done 플래그 true로 변경
- 존재하지 않는 ID 에러 처리

**Output**: `Completed: [1] 할일 내용`
**Error**: `Task #<id> not found`

### Task 3.4: 통합 테스트
**Action**: 전체 워크플로우 테스트
**Commands**:
```bash
node src/index.js add "첫 번째 할일"
node src/index.js add "두 번째 할일"
node src/index.js list
node src/index.js done 1
node src/index.js list
node src/index.js done 999  # 에러 테스트
```

## Verification Criteria
- [ ] `task add "test"` 실행 시 할일 추가됨
- [ ] `task list` 실행 시 체크박스 형식 출력
- [ ] `task done 1` 실행 시 완료 표시됨
- [ ] 존재하지 않는 ID에 에러 메시지 출력

## Dependencies
- Phase 1: CLI 구조
- Phase 2: storage.js 모듈
