# Phase 1: 프로젝트 설정 및 CLI 구조

## Goal
Node.js 프로젝트 초기화 및 Commander.js 기반 CLI 기본 구조 구축

## Requirements Covered
- NFR-3: 사용성 (--help, --version)

## Tasks

### Task 1.1: Node.js 프로젝트 초기화
**Action**: `npm init` 실행 및 package.json 설정
**Files**:
- `package.json` (create)

**Details**:
- name: "task-tracker-cli"
- version: "1.0.0"
- bin 필드로 CLI 진입점 설정
- type: "module" (ES modules 사용)

### Task 1.2: 의존성 설치
**Action**: Commander.js 설치
**Command**: `npm install commander`

### Task 1.3: CLI 진입점 생성
**Action**: src/index.js 생성
**Files**:
- `src/index.js` (create)

**Details**:
- Commander.js 기반 CLI 설정
- add, list, done 명령어 스켈레톤
- --help, --version 자동 지원

### Task 1.4: 실행 테스트
**Action**: CLI 동작 확인
**Commands**:
```bash
node src/index.js --help
node src/index.js --version
```

## Verification Criteria
- [ ] `node src/index.js --help` 실행 시 도움말 출력
- [ ] `node src/index.js --version` 실행 시 버전 출력
- [ ] add, list, done 명령어가 help에 표시됨

## Dependencies
- Node.js (이미 설치되어 있다고 가정)

## Estimated Effort
- 작업량: 소규모
- 복잡도: 낮음
