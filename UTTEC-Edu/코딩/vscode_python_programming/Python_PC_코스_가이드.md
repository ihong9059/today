# Python PC 프로그래밍 코스 가이드

## 1. 코스 개요

### 1.1 목표
- PC 환경에서 Python 프로그래밍을 체계적으로 학습
- AI(Claude, Gemini, ChatGPT)를 활용하여 실제 동작하는 애플리케이션 제작
- 90일 과정으로 초급부터 고급까지 단계별 역량 강화

### 1.2 등급 구성
| 등급 | 기간 | 주요 내용 |
|------|------|----------|
| 초급 | 15일 | Python 문법, 기본 자료구조, 함수, 클래스 |
| 중급 | 30일 | HTML/JS 연동, Flask 웹서버, API 통신 기초 |
| 고급 | 45일 | Database(SQLite, MySQL), REST API, 소켓 통신, 멀티스레딩 |

### 1.3 학습 패턴
```
1. 오늘의 교육 목표 확인
2. 목표를 대표하는 애플리케이션 프롬프트 작성
3. AI(Claude 우선)에 프롬프트 입력
4. AI 출력을 지정된 폴더에 저장
5. VSCode에서 실행 및 테스트
6. 코드 이해 및 수정 실습
```

---

## 2. 다중 파일 처리 방법 (핵심 문제 해결)

### 2.1 문제 정의
중급 이상에서는 하나의 애플리케이션이 여러 파일로 구성됩니다:
- Python 모듈 (.py)
- HTML 템플릿 (.html)
- CSS 스타일 (.css)
- JavaScript (.js)
- 설정 파일 (config.py, .env)
- 데이터베이스 스키마 (.sql)

### 2.2 해결 방법

#### 방법 1: 마커 기반 분리 (권장)
AI에게 파일별로 명확한 마커를 사용하도록 요청합니다.

**프롬프트 예시:**
```
Flask 웹 애플리케이션을 만들어주세요.
각 파일은 다음 형식으로 구분해주세요:

===== 파일명: app.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일명: templates/index.html =====
(코드 내용)
===== 파일 끝 =====
```

**저장 방법:**
1. AI 출력 전체를 복사
2. `===== 파일명:` 마커로 각 섹션 구분
3. 해당 파일명으로 저장 (폴더 구조 포함)

#### 방법 2: ZIP 구조 설명 방식
AI에게 폴더 구조와 함께 코드를 출력하도록 요청합니다.

**프롬프트 예시:**
```
다음 프로젝트 구조로 코드를 작성해주세요:

project/
├── app.py          # 메인 애플리케이션
├── config.py       # 설정 파일
├── templates/
│   └── index.html  # 메인 페이지
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── requirements.txt

각 파일의 전체 코드를 순서대로 작성해주세요.
```

#### 방법 3: 단계별 생성
복잡한 프로젝트는 파일별로 나눠서 요청합니다.

```
1단계: "app.py 메인 파일을 작성해주세요"
2단계: "templates/index.html을 작성해주세요"
3단계: "static/css/style.css를 작성해주세요"
```

### 2.3 프롬프트 템플릿

#### 초급 (단일 파일)
```
[Day X] Python 초급 - {주제}

다음 애플리케이션을 Python으로 작성해주세요:
- 목표: {애플리케이션 설명}
- 파일명: day{X}_{이름}.py
- 실행 환경: VSCode, Python 3.x

요구사항:
1. {기능 1}
2. {기능 2}
3. 코드에 한글 주석 포함
4. 실행 결과 예시도 보여주세요
```

#### 중급 (다중 파일)
```
[Day X] Python 중급 - {주제}

다음 웹 애플리케이션을 Flask로 작성해주세요:
- 목표: {애플리케이션 설명}
- 프로젝트 폴더: day{X}_{이름}/

===== 파일 구분 형식 =====
각 파일은 아래 형식으로 구분해주세요:
### 파일: {경로/파일명} ###
(코드)
### 파일 끝 ###

요구사항:
1. {기능 1}
2. {기능 2}
3. requirements.txt 포함
4. 실행 방법 설명
```

#### 고급 (복합 시스템)
```
[Day X] Python 고급 - {주제}

다음 시스템을 구축해주세요:
- 목표: {시스템 설명}
- 프로젝트 폴더: day{X}_{이름}/

아키텍처:
- Backend: Flask/FastAPI
- Database: SQLite/MySQL
- Frontend: HTML/CSS/JS

파일 구조:
project/
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   └── utils.py
├── templates/
├── static/
├── database/
│   └── schema.sql
├── config.py
├── run.py
└── requirements.txt

### 파일: {경로} ###
(코드)
### 파일 끝 ###

형식으로 모든 파일을 작성해주세요.
```

---

## 3. 폴더 구조

```
C:/todo/today/코딩/vscode_python_programming/
├── Python_PC_코스_가이드.md (본 문서)
├── Python_PC_90일_커리큘럼.md
│
├── 초급_15일/
│   ├── day01_hello_world/
│   ├── day02_variables/
│   ├── ...
│   └── day15_mini_project/
│
├── 중급_30일/
│   ├── day16_flask_intro/
│   ├── day17_html_template/
│   ├── ...
│   └── day45_api_project/
│
└── 고급_45일/
    ├── day46_database_intro/
    ├── day47_sqlite_crud/
    ├── ...
    └── day90_final_project/
```

---

## 4. 실행 환경 설정

### 4.1 필수 소프트웨어
- Python 3.10 이상
- VSCode + Python 확장
- Git (선택)

### 4.2 가상환경 설정
```bash
# 프로젝트 폴더에서
python -m venv venv

# Windows 활성화
venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt
```

### 4.3 VSCode 설정
1. Python 인터프리터 선택 (Ctrl+Shift+P → Python: Select Interpreter)
2. 가상환경 인터프리터 선택
3. 터미널에서 실행 확인

---

## 5. AI 활용 팁

### 5.1 Claude 사용 권장 이유
- 긴 코드도 정확하게 출력
- 파일 구분이 명확함
- 한글 주석 지원 우수
- 코드 설명이 상세함

### 5.2 효과적인 프롬프트 작성법
1. **구체적인 요구사항**: "로그인 기능" → "세션 기반 로그인, 비밀번호 해시 저장"
2. **파일 형식 지정**: 마커 형식을 명시
3. **실행 환경 명시**: Python 버전, OS
4. **예시 포함**: 입출력 예시 제공

### 5.3 오류 해결
AI 코드에서 오류 발생 시:
```
다음 오류가 발생했습니다:
[오류 메시지 붙여넣기]

수정된 코드를 제공해주세요.
```

---

## 6. 학습 체크리스트

### 초급 완료 조건
- [ ] 변수, 자료형 이해
- [ ] 조건문, 반복문 활용
- [ ] 함수 정의 및 호출
- [ ] 클래스와 객체 기초
- [ ] 파일 입출력
- [ ] 예외 처리

### 중급 완료 조건
- [ ] Flask 웹서버 구축
- [ ] HTML 템플릿 렌더링
- [ ] CSS/JS 연동
- [ ] Form 데이터 처리
- [ ] REST API 호출
- [ ] JSON 데이터 처리

### 고급 완료 조건
- [ ] SQLite CRUD 구현
- [ ] MySQL 연동
- [ ] ORM(SQLAlchemy) 활용
- [ ] 인증/권한 시스템
- [ ] WebSocket 통신
- [ ] 멀티스레딩/비동기

---

## 7. 참고 자료

- Python 공식 문서: https://docs.python.org/ko/3/
- Flask 문서: https://flask.palletsprojects.com/
- SQLAlchemy 문서: https://www.sqlalchemy.org/
- MDN Web Docs: https://developer.mozilla.org/ko/
