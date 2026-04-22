# Track 2: AI와 함께 프로그래밍
> 기간: 4주 (20일) | 선행: Track 1 | 도구: Claude Code, Python, VS Code

## 목표
- Python 기초를 AI와 함께 학습
- Claude Code로 실제 프로그램 작성
- 웹앱 + API 서버를 직접 만들어 배포

---

## Week 1: Python 기초 (AI가 가르쳐주는 코딩)

### Day 1: 개발 환경 설정
- **실습**:
  - Python 설치 (3.12+)
  - VS Code 설치 + Python 확장
  - Claude Code CLI 설치 및 설정
  - 터미널 기본 명령어 (cd, ls, mkdir, python)
- **과제**: "Hello, AI World!" 프로그램 실행

### Day 2: 변수와 데이터 타입
- **실습**: Claude에게 "변수란 무엇인가 쉽게 설명해줘" → 코드 예제 생성 → 실행
  - 숫자, 문자열, 리스트, 딕셔너리
  - f-string 포매팅
- **방법**: Claude가 코드 생성 → 학생이 실행 → 결과 관찰 → 수정 요청
- **과제**: 자기소개 프로그램 (이름, 나이, 취미 출력)

### Day 3: 조건문과 반복문
- **실습**:
  - if/elif/else 조건 분기
  - for/while 반복
  - Claude에게 "가위바위보 게임 만들어줘" → 코드 분석 → 수정
- **과제**: 숫자 맞히기 게임

### Day 4: 함수와 모듈
- **실습**:
  - 함수 정의/호출
  - 매개변수와 반환값
  - import로 외부 모듈 사용
  - Claude에게 "이 코드를 함수로 리팩토링해줘"
- **과제**: 간단한 계산기 프로그램 (4칙 연산)

### Day 5: 파일 처리와 데이터
- **실습**:
  - 파일 읽기/쓰기 (txt, csv, json)
  - CSV 데이터 분석 (pandas 기초)
  - Claude에게 "이 CSV 파일을 분석하는 코드 만들어줘"
- **과제**: 매출 데이터 CSV → 월별 합계/평균 출력

---

## Week 2: 실전 프로그래밍

### Day 6: 웹 스크래핑
- **실습**:
  - requests + BeautifulSoup
  - Claude에게 "뉴스 사이트에서 제목 수집하는 코드"
  - JSON API 호출 (날씨, 환율)
- **과제**: 관심 사이트 데이터 수집 프로그램

### Day 7: 데이터 시각화
- **실습**:
  - matplotlib 기초 (선, 막대, 파이 차트)
  - Claude에게 "이 데이터를 그래프로 그려줘"
  - pandas + matplotlib 조합
- **과제**: Day 5 매출 데이터 → 시각화 리포트

### Day 8: 자동화 스크립트
- **실습**:
  - 파일 정리 자동화 (폴더별 분류)
  - 엑셀 자동화 (openpyxl)
  - 이메일 발송 자동화 (smtplib)
  - Claude에게 "매일 아침 데이터 요약 보내는 스크립트"
- **과제**: 업무 자동화 스크립트 1개 완성

### Day 9: API 이해와 활용
- **이론**: REST API 개념 (GET/POST, JSON, 상태코드)
- **실습**:
  - 공공 API 호출 (공공데이터포털)
  - Claude API 직접 호출 (anthropic 패키지)
  - API 키 관리 (.env)
- **과제**: Claude API로 자동 번역기 만들기

### Day 10: Git과 버전 관리
- **실습**:
  - Git 기초 (init, add, commit, push)
  - GitHub 계정 생성 + 저장소 만들기
  - Claude Code에서 Git 활용
  - .gitignore, README.md 작성
- **과제**: 지금까지 코드를 GitHub에 올리기

---

## Week 3: 웹 개발 입문

### Day 11: HTML/CSS 기초
- **실습**:
  - HTML 구조 (head, body, div, p, img)
  - CSS 스타일링 (색상, 폰트, 레이아웃)
  - Claude에게 "자기소개 웹페이지 만들어줘"
- **과제**: 개인 프로필 페이지

### Day 12: JavaScript 기초
- **실습**:
  - 변수, 함수, 이벤트
  - DOM 조작 (버튼 클릭 → 내용 변경)
  - Claude에게 "To-Do 리스트 만들어줘"
- **과제**: 인터랙티브 웹페이지 1개

### Day 13: Flask 웹 서버
- **실습**:
  - Flask 설치 + Hello World 서버
  - 라우팅 (/, /about, /api)
  - 템플릿 (Jinja2)
  - Claude에게 "게시판 서버 만들어줘"
- **과제**: 간단한 웹앱 서버 실행

### Day 14: FastAPI + 프론트엔드 연동
- **실습**:
  - FastAPI 소개 (Flask보다 빠른 이유)
  - API 엔드포인트 설계
  - 프론트엔드 → API 호출 (fetch)
  - Claude에게 "메모 앱 풀스택으로 만들어줘"
- **과제**: 프론트 + 백엔드 연동 메모 앱

### Day 15: 데이터베이스 기초
- **실습**:
  - SQLite (파일 기반 DB, 설치 불필요)
  - CRUD 작업 (Create, Read, Update, Delete)
  - Python + SQLite 연동
  - Claude에게 "사용자 관리 시스템 만들어줘"
- **과제**: 메모 앱에 DB 연동 (저장/불러오기)

---

## Week 4: 프로젝트 + Claude Code 심화

### Day 16: Claude Code 심화
- **실습**:
  - Claude Code 주요 기능 (Read, Edit, Bash, Grep)
  - 프로젝트 분석: "이 코드 설명해줘"
  - 리팩토링: "이 코드를 개선해줘"
  - 디버깅: "이 에러 고쳐줘"
- **과제**: 기존 프로젝트를 Claude Code로 개선

### Day 17: 테스트와 품질
- **실습**:
  - 단위 테스트 (pytest)
  - Claude에게 "이 함수의 테스트 코드 작성해줘"
  - 코드 리뷰 요청
  - 에러 처리 (try/except)
- **과제**: 메모 앱에 테스트 추가

### Day 18: 배포 기초
- **실습**:
  - requirements.txt 작성
  - 환경 변수 관리 (.env)
  - 로컬 서버 외부 접근 (ngrok 또는 Tailscale)
  - GitHub Pages로 정적 사이트 배포
- **과제**: 메모 앱을 외부에서 접근 가능하게 배포

### Day 19: 종합 프로젝트 제작
- **프로젝트**: Claude를 활용한 웹앱 만들기 (택 1)
  - A: AI 챗봇 웹앱 (Claude API + Flask)
  - B: 데이터 대시보드 (CSV 업로드 → 분석 → 시각화)
  - C: 업무 관리 도구 (할일 + 일정 + 메모)
- Claude Code로 전 과정 진행

### Day 20: 발표 + 수료
- **발표**: 프로젝트 데모 + 코드 리뷰
- **회고**: AI와 함께 코딩한 경험 공유
- **수료**: Track 2 수료증 발급

---

## 평가 기준
| 항목 | 비중 | 내용 |
|------|:----:|------|
| 일일 과제 | 30% | Day 1~18 과제 |
| 종합 프로젝트 | 50% | Day 19~20 결과물 + 발표 |
| 코드 품질 | 20% | Git 관리, 테스트, 문서화 |

## 준비물
- 노트북 (Windows/Mac)
- Claude Pro 계정 (Claude Code 사용)
- VS Code + Python 3.12+
- GitHub 계정

## 다음 단계
→ **Track 3: 시스템 구축** (서버/인프라/DevOps)
→ **Track 4: AI 전문가** (컴퓨터 비전/딥러닝)
