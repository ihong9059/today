# Day 5: Claude Code 심화 — "/init, CLAUDE.md, 프로젝트 관리"

## 학습 목표
- Claude Code를 개발 프로젝트의 핵심 도구로 세팅
- /init으로 프로젝트 초기화, CLAUDE.md로 규칙 설정
- 코드 탐색, 분석, 파일 생성을 Claude Code로

## 준비물
- Claude Code CLI 설치 완료
- 자기 프로젝트 또는 샘플 프로젝트 폴더

---

## 실습 1: 프로젝트 초기화 (10분)

### /init 실행
프로젝트 폴더에서:
```bash
cd ~/projects/my-project
claude
```

```
/init
```

→ Claude Code가 프로젝트를 분석하고 CLAUDE.md를 생성

### CLAUDE.md 확인 + 수정
```
CLAUDE.md를 보여줘
```
```
CLAUDE.md에 다음 규칙을 추가해줘:
- 코드 스타일: Black 포매터 사용
- 테스트: pytest, 함수당 최소 1개 테스트
- 커밋 메시지: Conventional Commits (feat/fix/docs)
- 문서: 공개 함수에 docstring 필수
```

---

## 실습 2: 프로젝트 구조 파악 (10분)

### 처음 보는 프로젝트 분석
```
이 프로젝트의 전체 구조를 설명해줘.
- 폴더별 역할
- 주요 파일과 기능
- 진입점 (엔트리포인트)
- 의존성 (requirements.txt 또는 package.json 분석)
```

### 코드 맵 생성
```
이 프로젝트의 모듈 의존성을 Mermaid 다이어그램으로 그려줘.
어떤 파일이 어떤 파일을 import하는지.
```

### 기술 부채 분석
```
이 프로젝트의 기술 부채를 분석해줘:
1. TODO/FIXME/HACK 주석 찾기
2. 중복 코드
3. 테스트 커버리지가 낮은 부분
4. 업데이트 필요한 의존성
```

---

## 실습 3: 파일 생성/수정 패턴 (15분)

### 새 파일 생성
```
src/utils/validators.py를 만들어줘.
이메일, 비밀번호, 전화번호 검증 함수 3개.
각 함수에 타입 힌트, docstring, 에러 처리 포함.
```

### 기존 파일 수정
```
src/routes/auth.py를 읽고, 다음을 수정해줘:
1. 비밀번호 강도 검증 추가 (8자+, 대소문자+숫자+특수문자)
2. 로그인 실패 시 구체적 에러 메시지
3. rate limiting 주석으로 TODO 추가
```

### 여러 파일 동시 작업
```
validators.py를 만든 후, auth.py에서 import해서 사용하도록 수정해줘.
두 파일을 동시에 업데이트.
```

---

## 실습 4: Git 연동 (10분)

```
현재 변경사항을 확인해줘 (git status + git diff)
```
```
커밋 메시지를 작성해줘. Conventional Commits 형식으로.
```
```
이 변경사항으로 PR을 만든다면, PR 제목과 설명을 작성해줘.
```

---

## 과제

### 제출물
1. CLAUDE.md (자기 프로젝트 규칙 설정)
2. 프로젝트 구조 분석 결과
3. Claude Code로 생성한 파일 1개 이상

---

## 강사 참고 사항
- 개발자에게 Claude Code는 Day 5가 아니라 Day 1부터 핵심 도구
- /init + CLAUDE.md가 "프로젝트의 컨텍스트를 이해시키는 것"임을 강조
- 자기 프로젝트로 실습해야 효과적 — 샘플보다 실제 코드가 동기 부여
- Git 연동 실습은 실무 워크플로우와 직결
