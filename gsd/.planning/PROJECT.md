# Task Tracker CLI

## Vision
GSD 워크플로우 학습을 위한 실습 프로젝트로, 간단한 CLI 기반 할일 관리 도구를 구현합니다.

## Problem Statement
GSD(Get Shit Done) 워크플로우를 직접 체험하면서 학습하기 위해 실제 동작하는 작은 프로젝트가 필요합니다.

## Solution
Node.js 기반의 최소 기능(MVP) CLI 도구를 구현합니다:
- `task add "내용"` - 할일 추가
- `task list` - 할일 목록 조회
- `task done <id>` - 할일 완료 처리

## Target Users
- GSD 워크플로우를 학습하는 개발자

## Success Criteria
- [ ] 3가지 기본 명령어 동작 (add, list, done)
- [ ] JSON 파일 기반 데이터 저장
- [ ] GSD 워크플로우 전체 사이클 완료

## Technical Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | Node.js | 빠른 프로토타이핑, 널리 사용됨 |
| CLI Parser | Commander.js | 간단하고 직관적인 API |
| Storage | JSON 파일 | 외부 의존성 없이 간단하게 구현 |

## Constraints
- 학습 목적이므로 복잡한 기능은 배제
- 외부 서비스 의존성 없음
- 단일 사용자 환경 가정

## Out of Scope
- 사용자 인증
- 클라우드 동기화
- 팀 협업 기능
- GUI 인터페이스
