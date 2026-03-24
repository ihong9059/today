# Phase 4: 마무리 및 테스트

## Goal
에러 처리 강화, 문서화, 최종 검증

## Requirements Covered
- NFR-2: 에러 처리
- AC-5: --help 도움말

## Tasks

### Task 4.1: 에러 처리 개선
**Action**: 빈 목록 메시지 및 에러 상황 처리 확인
**Files**: 이미 구현됨 (Phase 3에서 처리)

**Verification**:
- 빈 목록: "No tasks yet..." 메시지
- 존재하지 않는 ID: "Task #X not found" 메시지

### Task 4.2: README.md 작성
**Action**: 프로젝트 사용법 문서 작성
**Files**:
- `README.md` (create)

**Contents**:
- 프로젝트 소개
- 설치 방법
- 사용법 (명령어 예시)

### Task 4.3: 전체 기능 테스트
**Action**: 모든 기능 최종 검증
**Tests**:
- `--help` 도움말 출력
- `--version` 버전 출력
- `add`, `list`, `done` 전체 워크플로우
- 에러 상황 처리

## Verification Criteria
- [ ] README.md 파일 존재
- [ ] `task --help` 도움말 출력
- [ ] 모든 명령어 정상 동작
- [ ] 에러 메시지 적절히 출력

## Dependencies
- Phase 1, 2, 3 완료
