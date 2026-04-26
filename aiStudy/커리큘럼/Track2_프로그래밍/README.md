# Track 2: Claude Code로 프로그래밍
> 기간: 4주 (20일) | 선행: Track 1 | 도구: Claude Code, Python, VS Code

## 목표
- Claude Code를 주력 개발 도구로 활용하는 능력
- Python을 Claude Code와 함께 학습 (문법 암기 X, AI 협업 O)
- 웹앱 + API 서버를 Claude Code로 직접 만들어 배포
- 실제 운영 시스템(UTTEC 바이브코딩 플랫폼)을 교재로 활용

## 교육 철학
> "코드를 외우지 마라. Claude Code에게 무엇을 만들지 설명하는 능력을 키워라."

---

## Week 1: Claude Code + Python 기초

### Day 1: 개발 환경 + Claude Code 심화
- **실습**:
  - Python 설치 (3.12+), VS Code 설치
  - Claude Code CLI 복습 + 핵심 기능 정리
  - `/init` — 프로젝트 초기화, CLAUDE.md 생성
  - Claude Code로 "Hello World" → 실행까지 한 번에
- **핵심**: Claude Code가 파일 생성, 수정, 실행까지 모두 처리
- **과제**: Claude Code로 자기소개 Python 프로그램 생성 + 실행

### Day 2: 변수, 데이터 타입 — Claude Code가 가르쳐주는 코딩
- **실습**:
  - "변수란 무엇인가 설명하면서 예제 코드 만들어줘"
  - Claude Code가 코드 생성 → 학생이 실행 → 결과 관찰 → 수정 요청
  - 숫자, 문자열, 리스트, 딕셔너리
  - "이 코드를 수정해서 내 이름으로 바꿔줘"
- **과제**: 자기소개 프로그램 (이름, 나이, 취미 출력)

### Day 3: 조건문, 반복문 — 게임 만들기
- **실습**:
  - "가위바위보 게임 만들어줘" → 코드 분석 → 규칙 수정
  - if/elif/else, for/while 패턴 관찰
  - "이 게임에 점수 기능 추가해줘" — 기능 확장 요청
- **과제**: Claude Code로 숫자 맞히기 게임 만들기

### Day 4: 함수, 모듈 — 코드 구조화
- **실습**:
  - "이 코드를 함수로 리팩토링해줘" 패턴
  - Claude Code로 기존 코드 분석: "이 코드 설명해줘"
  - import로 외부 모듈 사용
  - Claude Code가 자동으로 pip install 처리
- **과제**: 간단한 계산기 프로그램

### Day 5: 파일 처리 + 데이터 분석
- **실습**:
  - "이 CSV 파일을 읽어서 분석하는 코드 만들어줘"
  - pandas 기초 — Claude Code가 설치 + 코드 생성
  - 매출 데이터 → 월별 합계/평균 → 그래프 출력
  - Claude Code로 matplotlib 차트 자동 생성
- **과제**: 실제 데이터(CSV) → 분석 리포트 + 그래프

---

## Week 2: 실전 프로그래밍 — Claude Code로 앱 만들기

### Day 6: 웹 스크래핑 + API 호출
- **실습**:
  - "뉴스 사이트에서 제목 수집하는 코드 만들어줘"
  - requests + BeautifulSoup (Claude Code가 설명하며 작성)
  - 공공 API 호출 (날씨, 환율)
  - Claude Code에게 에러 해결 요청: "이 에러 고쳐줘"
- **과제**: 관심 사이트 데이터 수집 프로그램

### Day 7: 자동화 스크립트
- **실습**:
  - "폴더 안 파일을 확장자별로 정리하는 스크립트" → Claude Code가 생성
  - 엑셀 자동화 (openpyxl)
  - Claude Code Bash 도구로 시스템 명령 실행
  - 실제 업무 자동화 사례 체험
- **과제**: 업무 자동화 스크립트 1개 완성

### Day 8: Git + GitHub — Claude Code와 버전 관리
- **실습**:
  - Git 기초 (init, add, commit, push)
  - Claude Code가 자동으로 커밋 메시지 생성
  - GitHub 저장소 생성 + 코드 업로드
  - Pull Request 작성도 Claude Code로
- **과제**: 지금까지 코드를 GitHub에 올리기

### Day 9: Flask 웹 서버 — 첫 웹앱
- **실습**:
  - "Flask로 Hello World 서버 만들어줘" → 즉시 실행
  - 라우팅, 템플릿(Jinja2) 추가
  - "게시판 만들어줘" → Claude Code가 전체 구조 생성
  - 참고: UTTEC 빌드 서버(`cloud/web_ui_server.py`)가 FastAPI로 동작하는 실제 사례
- **과제**: 간단한 웹앱 서버 완성

### Day 10: FastAPI + 프론트엔드 연동
- **실습**:
  - "FastAPI로 메모 앱 풀스택으로 만들어줘"
  - API 엔드포인트 설계 (GET/POST/DELETE)
  - 프론트엔드 → API 호출 (fetch)
  - 참고: UTTEC `cloud/build_server_cloud_arduino.py` — 실제 운영 FastAPI 서버
- **과제**: 프론트 + 백엔드 연동 메모 앱

---

## Week 3: 스마트폰 연동 — aiPython 플랫폼 체험

### Day 11: aiPython 시스템 이해
- **이론**: aiPython 아키텍처 (스마트폰 → 클라우드 → Python 실행 → 결과 반환)
- **실습**:
  - aiPython 서버 코드 분석 — Claude Code로 "이 서버 구조 설명해줘"
  - `aiHardStudy/aiPython/server.py` 코드 리딩
  - 스마트폰에서 한국어 입력 → Python 코드 실행 체험
- **과제**: aiPython 서버 아키텍처 다이어그램 작성 (Claude Code로)

### Day 12: Claude API 직접 호출
- **실습**:
  - Anthropic SDK 설치 + Claude API 키 설정
  - Claude Code로 "Claude API 호출하는 코드 만들어줘"
  - 프롬프트 → 코드 생성 → 실행 파이프라인 이해
  - .env 파일로 API 키 관리
- **과제**: Claude API로 자동 번역기 만들기

### Day 13: 데이터베이스 + CRUD
- **실습**:
  - "SQLite로 사용자 관리 시스템 만들어줘" → Claude Code가 전체 생성
  - CRUD 작업 (Create, Read, Update, Delete)
  - 메모 앱에 DB 연동
  - Claude Code로 마이그레이션, 시드 데이터 생성
- **과제**: 메모 앱 + SQLite 완성

### Day 14: 테스트 + 코드 품질
- **실습**:
  - "이 함수의 테스트 코드 작성해줘" — pytest
  - Claude Code로 코드 리뷰: "이 코드 개선해줘"
  - 에러 처리 (try/except)
  - 타입 힌트 추가
- **과제**: 메모 앱에 테스트 + 에러 처리 추가

### Day 15: Flutter 앱 체험 (선택)
- **실습**:
  - UTTEC Flutter 앱 구조 분석 (`smartphone/vibe_ut_cloud/`)
  - Claude Code로 "이 Flutter 앱 구조 설명해줘"
  - 간단한 UI 수정 체험
  - 웹앱 vs 네이티브 앱 차이 이해
- **과제**: Flutter 앱의 한 화면을 수정해보기

---

## Week 4: 종합 프로젝트 — Claude Code로 풀스택

### Day 16: Claude Code 고급 기능
- **실습**:
  - /compact — 컨텍스트 관리
  - CLAUDE.md — 프로젝트 규칙 설정
  - Claude Code hooks — 자동화 설정
  - 멀티 파일 프로젝트 관리 패턴
- **과제**: 종합 프로젝트 CLAUDE.md 작성

### Day 17: 배포 기초
- **실습**:
  - requirements.txt, .env 관리
  - Claude Code로 "이 앱을 배포할 수 있게 준비해줘"
  - GitHub Pages (정적 사이트) 또는 ngrok (로컬 공유)
  - 참고: UTTEC 서버 배포 구조 (Nginx + systemd + HTTPS)
- **과제**: 프로젝트를 외부에서 접근 가능하게 배포

### Day 18-19: 종합 프로젝트 제작
- **프로젝트** (택 1, Claude Code로 전 과정 진행):
  - A: **AI 챗봇 웹앱** — Claude API + FastAPI + 프론트엔드
  - B: **데이터 대시보드** — CSV 업로드 → 분석 → 시각화
  - C: **스마트폰 센서 앱** — aiPython 확장 (카메라/GPS 활용)
  - D: **업무 관리 도구** — 할일 + 일정 + 메모 + DB
- Claude Code로 설계 → 구현 → 테스트 → 배포

### Day 20: 발표 + 수료
- **발표**: 프로젝트 데모 + Claude Code 활용 사례 공유
- **회고**: "Claude Code 없이 했다면 얼마나 걸렸을까?"
- **수료**: Track 2 수료증 발급

---

## 평가 기준
| 항목 | 비중 | 내용 |
|------|:----:|------|
| 일일 과제 | 30% | Day 1~17 과제 |
| 종합 프로젝트 | 50% | Day 18~20 결과물 + 발표 |
| Claude Code 활용도 | 20% | AI 협업 능력, 프롬프트 품질 |

## 준비물
- 노트북 (Windows/Mac)
- Claude Pro 계정 (Claude Code 사용)
- VS Code + Python 3.12+
- GitHub 계정

## 다음 단계
→ **Track 3: Claude Code로 시스템 구축** (서버/인프라/DevOps)
→ **Track 4: Claude Code로 AI 전문가** (컴퓨터 비전/딥러닝)
