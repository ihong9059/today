# Domain Research Summary

## 유사 CLI 할일 관리 도구

### 1. Taskwarrior
- **특징**: 가장 유명한 CLI 기반 태스크 관리 도구
- **주요 명령어**: `task add`, `task list`, `task done`
- **장점**: 강력한 필터링, 태그, 프로젝트 관리
- **복잡도**: 높음 (우리 MVP에는 과함)

### 2. Todo.txt
- **특징**: 텍스트 파일 기반의 심플한 할일 관리
- **형식**: `(A) 2024-01-01 할일 내용 +project @context`
- **장점**: 단순함, 이식성
- **참고**: 우선순위 문법 `(A)`, `(B)` 등

### 3. Todoist CLI
- **특징**: Todoist 서비스의 CLI 클라이언트
- **참고사항**: 클라우드 동기화 (우리 범위 밖)

## MVP에 적용할 패턴

### 명령어 구조
```bash
task <command> [arguments] [options]
```

### 데이터 저장 형식 (JSON)
```json
{
  "tasks": [
    {
      "id": 1,
      "text": "할일 내용",
      "done": false,
      "createdAt": "2026-03-24T10:00:00Z"
    }
  ],
  "nextId": 2
}
```

### 출력 형식
```
[ ] 1. 첫 번째 할일
[x] 2. 완료된 할일
[ ] 3. 세 번째 할일
```

## 기술 스택 결정

| 구성요소 | 선택 | 대안 |
|---------|------|------|
| CLI 파서 | Commander.js | yargs, meow |
| 저장소 | JSON 파일 | SQLite, LowDB |
| 색상 출력 | chalk | colors |

## 결론

MVP 범위:
- 3개 명령어: `add`, `list`, `done`
- JSON 파일 저장
- Commander.js 사용
- 간단한 콘솔 출력

확장 가능성 (Phase 2 이후):
- `delete` 명령어
- 우선순위
- 필터링
