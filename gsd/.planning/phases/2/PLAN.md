# Phase 2: 데이터 저장소 구현

## Goal
JSON 파일 기반 할일 저장/로드 기능 구현

## Requirements Covered
- NFR-1: 데이터 저장 (JSON 파일 기반, UTF-8)

## Tasks

### Task 2.1: storage.js 모듈 생성
**Action**: 데이터 저장소 모듈 생성
**Files**:
- `src/storage.js` (create)

**Functions**:
- `loadTasks()` - tasks.json 읽기
- `saveTasks(data)` - tasks.json 쓰기
- `getNextId()` - 다음 ID 반환

### Task 2.2: 데이터 스키마 구현
**Action**: 초기 데이터 구조 정의
**Schema**:
```json
{
  "tasks": [],
  "nextId": 1
}
```

### Task 2.3: 파일 자동 생성
**Action**: tasks.json이 없을 때 자동 생성
**Details**:
- 파일이 없으면 기본 스키마로 생성
- 파일이 있으면 읽어서 반환

### Task 2.4: 저장소 테스트
**Action**: 모듈 동작 확인
**Tests**:
- loadTasks() 호출 시 객체 반환
- saveTasks() 호출 시 파일 저장
- 파일 없을 때 자동 생성 확인

## Verification Criteria
- [ ] `src/storage.js` 파일 존재
- [ ] loadTasks() 함수가 객체 반환
- [ ] saveTasks() 함수가 파일에 저장
- [ ] tasks.json이 없을 때 자동 생성

## Dependencies
- Phase 1 완료 (프로젝트 구조)

## Data Schema
```json
{
  "tasks": [
    {
      "id": 1,
      "text": "할일 내용",
      "done": false,
      "createdAt": "2026-03-24T10:00:00.000Z"
    }
  ],
  "nextId": 2
}
```

## Estimated Effort
- 작업량: 소규모
- 복잡도: 낮음
