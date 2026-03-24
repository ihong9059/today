# Requirements: Task Tracker CLI v1.0

## Milestone: v1.0 MVP

### Functional Requirements

#### FR-1: 할일 추가 (Add Task)
- **명령어**: `task add "할일 내용"`
- **동작**: 새 할일을 생성하고 고유 ID 부여
- **출력**: `Added: [1] 할일 내용`
- **저장**: tasks.json 파일에 즉시 저장

#### FR-2: 할일 목록 (List Tasks)
- **명령어**: `task list`
- **동작**: 모든 할일을 ID 순서로 표시
- **출력 형식**:
  ```
  [ ] 1. 미완료 할일
  [x] 2. 완료된 할일
  ```
- **빈 목록**: `No tasks yet. Add one with: task add "your task"`

#### FR-3: 할일 완료 (Complete Task)
- **명령어**: `task done <id>`
- **동작**: 지정된 ID의 할일을 완료 상태로 변경
- **출력**: `Completed: [1] 할일 내용`
- **오류**: ID가 없으면 `Task #<id> not found`

### Non-Functional Requirements

#### NFR-1: 데이터 저장
- JSON 파일 기반 (`tasks.json`)
- 실행 디렉토리에 저장
- UTF-8 인코딩

#### NFR-2: 에러 처리
- 잘못된 명령어: 도움말 표시
- 파일 접근 오류: 명확한 에러 메시지

#### NFR-3: 사용성
- `task --help` 도움말 제공
- `task --version` 버전 표시

### Data Model

```json
{
  "tasks": [
    {
      "id": 1,
      "text": "string",
      "done": false,
      "createdAt": "ISO8601"
    }
  ],
  "nextId": 2
}
```

### Acceptance Criteria

| ID | Criteria | Priority |
|----|----------|----------|
| AC-1 | `task add "test"` 실행 시 tasks.json에 새 항목 추가됨 | Must |
| AC-2 | `task list` 실행 시 모든 할일이 체크박스 형태로 출력됨 | Must |
| AC-3 | `task done 1` 실행 시 해당 할일이 완료 표시됨 | Must |
| AC-4 | 존재하지 않는 ID로 done 실행 시 에러 메시지 표시 | Should |
| AC-5 | `task --help` 실행 시 사용법 출력 | Should |
