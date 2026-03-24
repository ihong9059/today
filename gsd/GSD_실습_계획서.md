# GSD 실습 프로젝트 계획서

## 개요

GSD(Get Shit Done) 워크플로우를 직접 체험하기 위한 실습 프로젝트입니다.
간단한 CLI 도구를 만들면서 GSD의 핵심 명령어들을 순서대로 경험해봅니다.

## 프로젝트: Task Tracker CLI

간단한 할일 관리 CLI 도구를 Node.js로 구현합니다.

### 기능 요구사항

1. **할일 추가**: `task add "할일 내용"`
2. **할일 목록**: `task list`
3. **할일 완료**: `task done <id>`
4. **할일 삭제**: `task delete <id>`

### 기술 스택

- Node.js
- JSON 파일 기반 저장소
- Commander.js (CLI 파싱)

---

## GSD 워크플로우 실습 순서

### Phase 1: 프로젝트 초기화
```bash
/gsd:new-project
```
- PROJECT.md 생성
- 요구사항 정의
- 기술 결정

### Phase 2: 마일스톤 생성
```bash
/gsd:new-milestone "v1.0 기본 기능"
```
- ROADMAP.md 생성
- 페이즈 분할

### Phase 3: 페이즈 논의
```bash
/gsd:discuss-phase 1
```
- 구현 방향 논의
- 가정 검토

### Phase 4: 페이즈 계획
```bash
/gsd:plan-phase 1
```
- PLAN.md 생성
- 태스크 분해

### Phase 5: 페이즈 실행
```bash
/gsd:execute-phase 1
```
- 코드 구현
- 원자적 커밋

### Phase 6: 검증
```bash
/gsd:verify-work 1
```
- UAT 검증
- 기능 테스트

---

## 예상 산출물

```
gsd/
├── .planning/
│   ├── PROJECT.md
│   ├── ROADMAP.md
│   └── phases/
│       └── 1/
│           ├── PLAN.md
│           └── VERIFICATION.md
├── package.json
├── src/
│   ├── index.js
│   ├── commands/
│   └── storage.js
└── tasks.json
```

---

## 시작하기

아래 명령어로 GSD 워크플로우를 시작합니다:

```bash
/gsd:new-project
```

이 명령어는 프로젝트의 맥락을 수집하고 PROJECT.md를 생성합니다.

---

## 참고: 주요 GSD 명령어

| 단계 | 명령어 | 설명 |
|------|--------|------|
| 시작 | `/gsd:new-project` | 프로젝트 초기화 |
| 계획 | `/gsd:discuss-phase N` | 페이즈 논의 |
| 계획 | `/gsd:plan-phase N` | 상세 계획 수립 |
| 실행 | `/gsd:execute-phase N` | 계획 실행 |
| 검증 | `/gsd:verify-work N` | 작업 검증 |
| 진행 | `/gsd:next` | 다음 단계로 자동 이동 |
| 빠른실행 | `/gsd:fast [작업]` | 간단한 작업 즉시 실행 |

---

*작성일: 2026-03-24*
