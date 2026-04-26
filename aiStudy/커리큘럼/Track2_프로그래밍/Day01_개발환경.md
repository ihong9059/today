# Day 1: 개발 환경 + Claude Code 심화 — "코딩의 시작, 환경부터 잡자"

## 학습 목표
- Python 설치 및 VS Code 개발 환경 구성
- Claude Code 설치 및 /init 명령으로 프로젝트 초기화
- 터미널에서 Hello World 실행
- Claude Code에게 코드 작성을 요청하는 기본 흐름 이해

## 준비물
- 노트북 또는 PC (Windows 10 이상)
- 인터넷 연결
- Claude Code 계정 (Anthropic API 키 또는 Claude Max)

---

## 실습 1: Python + VS Code 설치 (15분)

1. Python 공식 사이트(python.org) 접속 → Python 3.12 다운로드
2. 설치 시 **"Add Python to PATH"** 반드시 체크
3. VS Code 공식 사이트(code.visualstudio.com) 접속 → 설치
4. VS Code 확장 프로그램 설치:
   - Python (Microsoft)
   - Korean Language Pack
5. 터미널에서 확인:
```bash
python --version
pip --version
```

### 관찰 포인트
- `python --version`이 정상 출력되는가?
- PATH 설정이 안 되어 있으면 어떤 에러가 나는가?

---

## 실습 2: Claude Code 설치 + 프로젝트 초기화 (15분)

1. Claude Code 설치:
```bash
npm install -g @anthropic-ai/claude-code
```

2. 작업 폴더 생성 및 이동:
```bash
mkdir my-python-project
cd my-python-project
```

3. Claude Code 실행 후 프로젝트 초기화:
```
claude
```

4. Claude Code 안에서 /init 실행:
```
/init
```

5. 생성된 CLAUDE.md 파일 확인 — 프로젝트 설명이 자동 작성됨

### 관찰 포인트
- /init이 만들어준 CLAUDE.md에는 어떤 내용이 들어가는가?
- Claude Code가 프로젝트 구조를 어떻게 파악하는가?

---

## 실습 3: Hello World — Claude Code로 첫 코드 작성 (15분)

1. Claude Code에게 요청:
```
Python으로 "Hello, World!"를 출력하는 hello.py 파일을 만들어줘.
실행하면 이름을 입력받아서 "안녕하세요, {이름}님! Python 세계에 오신 걸 환영합니다!" 를 출력하도록 해줘.
```

2. 생성된 hello.py 확인 후 실행:
```bash
python hello.py
```

3. Claude Code에게 기능 추가 요청:
```
hello.py에 현재 날짜와 시간도 함께 출력하는 기능을 추가해줘.
datetime 모듈을 사용해줘.
```

### 관찰 포인트
- Claude Code가 파일을 직접 생성하는 과정 관찰
- 기존 파일에 코드를 추가할 때 어떻게 수정하는가?

---

## 실습 4: Claude Code 기본 명령어 익히기 (15분)

1. 코드 설명 요청:
```
hello.py 코드를 한 줄씩 설명해줘. 초보자가 이해할 수 있게 주석도 달아줘.
```

2. 에러 해결 연습 — 일부러 에러를 만들고 Claude Code에게 도움 요청:
```
hello.py를 실행했더니 "NameError: name 'datetime' is not defined" 에러가 났어.
원인과 해결 방법을 알려줘.
```

3. 유용한 슬래시 명령어 체험:
```
/help
/status
/clear
```

### 관찰 포인트
- Claude Code가 에러 메시지를 분석하는 방식
- 슬래시 명령어로 Claude Code 상태를 관리하는 방법

---

## 과제

### 제출물: "나의 첫 Python 프로그램"

```markdown
# 나의 첫 Python 프로그램

## 환경 설정 결과
- Python 버전:
- VS Code 설치 여부:
- Claude Code 설치 여부:

## hello.py 실행 결과
- 스크린샷 또는 터미널 출력 복사:

## Claude Code 사용 소감
- 코드 생성 요청 시 느낀 점:
- 기존 코딩 학습과 다른 점:
- 내일 만들어보고 싶은 프로그램:

## 오늘 배운 명령어 정리
| 명령어 | 기능 |
|--------|------|
| python --version | |
| pip --version | |
| claude | |
| /init | |
| /help | |
```

---

## 강사 참고 사항
- Windows 환경에서 Python PATH 문제가 가장 흔한 장애물 — 설치 시 체크박스 강조
- Claude Code 설치에 Node.js 18+가 필요하므로 사전 설치 안내 필수
- "코딩을 직접 타이핑하지 않아도 된다"는 점을 강조하여 초보자 부담 완화
