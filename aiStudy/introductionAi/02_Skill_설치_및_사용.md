# Skill 설치 및 사용 가이드

## 1. Skill이란?
- Skill은 Claude Code에서 특정 작업을 자동화하는 커스텀 명령어
- /명령어 형태로 호출 (예: /work-start, /work-end)
- .claude/skills/ 폴더에 skill.md 파일로 정의
- Claude가 skill.md의 지시에 따라 자동으로 작업 수행

## 2. Skill 구조 이해

### 2.1 폴더 구조
```
프로젝트/
├── .claude/
│   └── skills/
│       ├── work-start/
│       │   └── skill.md
│       └── work-end/
│           └── skill.md
```

### 2.2 skill.md 파일 형식
- 프론트매터(---로 감싸는 YAML): name, description, user_invocable: true
- 본문: Claude에게 주는 실행 지시사항 (마크다운)

## 3. /work-start Skill 설치

### 3.1 용도
- 작업 시작 시 실행하는 Skill
- git pull로 저장소 동기화
- 이전 세션 복원
- 오늘 작업보고서 확인/생성
- 할일 목록 통합 표시

### 3.2 설치 방법

1. 프로젝트 루트에서 폴더 생성
```bash
mkdir -p .claude/skills/work-start
```

2. skill.md 파일 작성 - 아래 내용으로 작성

```markdown
---
name: work-start
description: 작업 시작 시 저장소 동기화, 세션 복원, 할일 확인
user_invocable: true
---

# 작업 시작 Skill

작업 시작 시 다음을 순서대로 수행합니다:

1. git pull로 저장소 동기화
2. 이전 세션 파일 확인 및 복원
3. 오늘 작업보고서 확인 또는 생성
4. 할일 통합 표시
```

### 3.3 사용 방법
Claude Code 터미널에서:
```
/work-start
```
입력하면 자동으로 실행

## 4. /work-end Skill 설치

### 4.1 용도
- 작업 종료 시 실행하는 Skill
- 세션 상태 저장 (완료/미완료 작업, 중요 정보)
- 작업보고서 업데이트
- git commit & push

### 4.2 설치 방법

1. 폴더 생성
```bash
mkdir -p .claude/skills/work-end
```

2. skill.md 파일 작성

```markdown
---
name: work-end
description: 작업 종료 시 세션 저장, 작업보고서 업데이트, git commit/push
user_invocable: true
---

# 작업 종료 Skill

작업 종료 시 다음을 순서대로 수행합니다:

1. 현재 세션 상태 저장
   - 완료된 작업 목록
   - 미완료 작업 목록
   - 다음에 할 일
   - 중요 정보/메모
2. 작업보고서 업데이트 (완료 사항, 생성/수정 파일 기록)
3. git add, commit, push
```

### 4.3 사용 방법
```
/work-end
```

## 5. Skill 커스터마이징

### 5.1 기존 Skill 수정
- .claude/skills/[skill명]/skill.md 파일을 직접 편집
- Claude Code에서 "skill.md 수정해줘"라고 요청

### 5.2 새 Skill 만들기
- 폴더 생성 → skill.md 작성 → /명령어로 사용
- user_invocable: true 필수 (사용자가 직접 호출하려면)

### 5.3 프로젝트용 vs 글로벌 Skill
- 프로젝트용: 프로젝트/.claude/skills/ (해당 프로젝트에서만 사용)
- 글로벌: ~/.claude/skills/ (모든 프로젝트에서 사용)

## 6. Skill 활용 팁
- Skill은 Claude에게 주는 "매뉴얼"과 같음
- 반복 작업을 Skill로 만들면 일관성 있게 자동 실행
- 팀원과 .claude/skills/ 폴더를 공유하면 동일한 워크플로우 사용 가능

## 7. 자주 묻는 질문
- Q: Skill이 목록에 안 보여요 → user_invocable: true 확인, 파일 경로 확인
- Q: Skill 실행 중 에러가 나요 → skill.md의 지시사항이 현재 환경과 맞는지 확인
- Q: Skill을 삭제하려면? → 해당 skills/[skill명] 폴더를 삭제

## 8. 다음 단계
- [03_MCP_연결.md](03_MCP_연결.md) - MCP 서버 연결 방법 알아보기
