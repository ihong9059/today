# Python PC 프로그래밍 90일 커리큘럼

## 커리큘럼 개요

| 등급 | 기간 | 일수 | 핵심 주제 |
|------|------|------|----------|
| 초급 | Day 1-15 | 15일 | Python 문법, 기본 프로그래밍 |
| 중급 | Day 16-45 | 30일 | 웹 개발(Flask), HTML/JS, API 통신 |
| 고급 | Day 46-90 | 45일 | Database, 고급 통신, 시스템 개발 |

---

# 초급 과정 (Day 1-15): Python 기초 문법

## Week 1: 프로그래밍 기초 (Day 1-7)

### Day 1: Hello World & 개발환경
**애플리케이션**: 자기소개 프로그램
```
프롬프트:
Python으로 사용자 자기소개 프로그램을 만들어주세요.
- 이름, 나이, 취미를 입력받아 예쁘게 출력
- 파일명: day01_self_intro.py
- 한글 주석 포함
```

### Day 2: 변수와 자료형
**애플리케이션**: 단위 변환 계산기
```
프롬프트:
Python으로 단위 변환 계산기를 만들어주세요.
- km ↔ mile, kg ↔ pound, 섭씨 ↔ 화씨
- 파일명: day02_unit_converter.py
- 변수 타입 활용 (int, float, str)
```

### Day 3: 연산자와 표현식
**애플리케이션**: 쇼핑 할인 계산기
```
프롬프트:
Python으로 쇼핑 할인 계산기를 만들어주세요.
- 원가, 할인율 입력 → 최종가, 절약금액 출력
- 산술/비교/논리 연산자 활용
- 파일명: day03_discount_calc.py
```

### Day 4: 조건문 (if-elif-else)
**애플리케이션**: 성적 등급 판정기
```
프롬프트:
Python으로 성적 등급 판정 프로그램을 만들어주세요.
- 점수 입력 → A/B/C/D/F 등급 출력
- 평균 점수와 합격/불합격 판정
- 파일명: day04_grade_checker.py
```

### Day 5: 반복문 (for)
**애플리케이션**: 구구단 출력기
```
프롬프트:
Python으로 구구단 프로그램을 만들어주세요.
- 원하는 단 입력 → 해당 구구단 출력
- 전체 구구단(2~9단) 출력 옵션
- 파일명: day05_multiplication.py
```

### Day 6: 반복문 (while)
**애플리케이션**: 숫자 맞추기 게임
```
프롬프트:
Python으로 숫자 맞추기 게임을 만들어주세요.
- 1~100 랜덤 숫자 생성
- 사용자가 맞출 때까지 힌트(UP/DOWN) 제공
- 시도 횟수 기록
- 파일명: day06_number_guess.py
```

### Day 7: 리스트와 튜플
**애플리케이션**: 학생 성적 관리 (기초)
```
프롬프트:
Python으로 학생 성적 관리 프로그램을 만들어주세요.
- 학생 이름과 점수를 리스트로 관리
- 평균, 최고점, 최저점 계산
- 파일명: day07_student_scores.py
```

## Week 2: 자료구조와 함수 (Day 8-14)

### Day 8: 딕셔너리
**애플리케이션**: 영한 사전 프로그램
```
프롬프트:
Python으로 간단한 영한 사전을 만들어주세요.
- 단어 검색, 추가, 삭제 기능
- 딕셔너리 활용
- 파일명: day08_dictionary.py
```

### Day 9: 집합 (Set)
**애플리케이션**: 로또 번호 생성기
```
프롬프트:
Python으로 로또 번호 생성기를 만들어주세요.
- 1~45 중 중복 없이 6개 + 보너스 1개
- Set 활용으로 중복 방지
- 여러 게임 생성 옵션
- 파일명: day09_lotto.py
```

### Day 10: 문자열 처리
**애플리케이션**: 텍스트 분석기
```
프롬프트:
Python으로 텍스트 분석 프로그램을 만들어주세요.
- 글자 수, 단어 수, 문장 수 카운트
- 가장 많이 사용된 단어 Top 5
- 파일명: day10_text_analyzer.py
```

### Day 11: 함수 기초
**애플리케이션**: 계산기 (함수형)
```
프롬프트:
Python으로 사칙연산 계산기를 함수로 만들어주세요.
- add, subtract, multiply, divide 함수
- 메뉴 선택 방식
- 파일명: day11_calculator_func.py
```

### Day 12: 함수 심화 (가변인자, 람다)
**애플리케이션**: 통계 계산기
```
프롬프트:
Python으로 통계 계산기를 만들어주세요.
- 여러 숫자 입력 → 합계, 평균, 분산, 표준편차
- *args 활용
- lambda 함수로 정렬 기능
- 파일명: day12_statistics.py
```

### Day 13: 모듈과 패키지
**애플리케이션**: 날짜/시간 유틸리티
```
프롬프트:
Python으로 날짜/시간 유틸리티를 만들어주세요.
- datetime, calendar 모듈 활용
- D-Day 계산, 요일 확인, 달력 출력
- 파일명: day13_datetime_util.py
```

### Day 14: 파일 입출력
**애플리케이션**: 메모장 프로그램
```
프롬프트:
Python으로 메모장 프로그램을 만들어주세요.
- 메모 작성, 저장, 불러오기, 삭제
- 텍스트 파일로 저장
- 파일명: day14_notepad.py
```

## Week 3: 마무리 (Day 15)

### Day 15: 초급 종합 프로젝트
**애플리케이션**: 가계부 프로그램
```
프롬프트:
Python으로 가계부 프로그램을 만들어주세요.
- 수입/지출 기록 (날짜, 분류, 금액, 메모)
- 월별 요약 보고서
- 파일 저장/불러오기
- 모든 초급 개념 활용
- 파일명: day15_account_book.py
```

---

# 중급 과정 (Day 16-45): 웹 개발 & API

## Week 4: Flask 기초 (Day 16-22)

### Day 16: Flask 설치와 Hello World
**애플리케이션**: 첫 웹서버
```
프롬프트:
Flask로 Hello World 웹서버를 만들어주세요.

### 파일: day16_hello_flask/app.py ###
(Flask 앱 코드)
### 파일 끝 ###

### 파일: day16_hello_flask/requirements.txt ###
flask
### 파일 끝 ###

실행 방법도 포함해주세요.
```

### Day 17: HTML 템플릿 렌더링
**애플리케이션**: 프로필 페이지
```
프롬프트:
Flask로 개인 프로필 웹페이지를 만들어주세요.

프로젝트 구조:
day17_profile/
├── app.py
├── templates/
│   └── profile.html
└── requirements.txt

### 파일: {경로} ### 형식으로 작성해주세요.
```

### Day 18: Jinja2 템플릿 문법
**애플리케이션**: 상품 목록 페이지
```
프롬프트:
Flask로 상품 목록 페이지를 만들어주세요.
- Python 리스트 데이터를 템플릿에서 반복 출력
- 조건문으로 품절 표시
- Jinja2 문법 활용

day18_products/
├── app.py
├── templates/
│   ├── base.html
│   └── products.html
└── requirements.txt
```

### Day 19: CSS 스타일링
**애플리케이션**: 포트폴리오 페이지
```
프롬프트:
Flask로 포트폴리오 웹페이지를 만들어주세요.
- 반응형 CSS 적용
- static 폴더 활용

day19_portfolio/
├── app.py
├── templates/
│   └── index.html
├── static/
│   └── css/
│       └── style.css
└── requirements.txt
```

### Day 20: JavaScript 기초 연동
**애플리케이션**: 동적 카운터
```
프롬프트:
Flask + JavaScript로 카운터 웹페이지를 만들어주세요.
- +/- 버튼으로 숫자 증감
- 리셋 버튼
- JS로 DOM 조작

day20_counter/
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── css/style.css
│   └── js/main.js
└── requirements.txt
```

### Day 21: Form 데이터 처리 (GET/POST)
**애플리케이션**: 회원가입 폼
```
프롬프트:
Flask로 회원가입 폼을 만들어주세요.
- 이름, 이메일, 비밀번호 입력
- POST 방식으로 전송
- 유효성 검사 (서버 측)

day21_signup/
├── app.py
├── templates/
│   ├── signup.html
│   └── success.html
├── static/
│   └── css/style.css
└── requirements.txt
```

### Day 22: 세션과 쿠키
**애플리케이션**: 로그인/로그아웃 시스템
```
프롬프트:
Flask로 로그인 시스템을 만들어주세요.
- 세션 기반 인증
- 로그인/로그아웃 기능
- 로그인 상태 유지

day22_login/
├── app.py
├── templates/
│   ├── login.html
│   ├── dashboard.html
│   └── base.html
├── static/
│   └── css/style.css
└── requirements.txt
```

## Week 5: API 통신 기초 (Day 23-29)

### Day 23: JSON 데이터 처리
**애플리케이션**: JSON 설정 관리자
```
프롬프트:
Python으로 JSON 설정 파일 관리 프로그램을 만들어주세요.
- 설정 읽기/쓰기/수정
- 중첩 구조 처리

day23_json_config/
├── app.py
├── config.json
└── requirements.txt
```

### Day 24: requests 라이브러리
**애플리케이션**: 날씨 정보 조회
```
프롬프트:
Python으로 날씨 정보 조회 프로그램을 만들어주세요.
- OpenWeatherMap API 또는 공공 API 활용
- requests로 API 호출
- JSON 응답 파싱

day24_weather/
├── app.py
├── .env.example  # API 키 예시
└── requirements.txt
```

### Day 25: REST API 개념과 호출
**애플리케이션**: 뉴스 헤드라인 수집기
```
프롬프트:
Python으로 뉴스 API를 호출하는 프로그램을 만들어주세요.
- NewsAPI 또는 공공데이터 활용
- GET 요청으로 데이터 조회
- 카테고리별 뉴스 필터링

day25_news/
├── app.py
├── config.py
└── requirements.txt
```

### Day 26: Flask REST API 만들기
**애플리케이션**: 할일 목록 API
```
프롬프트:
Flask로 할일(Todo) REST API를 만들어주세요.
- GET /todos - 목록 조회
- POST /todos - 추가
- PUT /todos/<id> - 수정
- DELETE /todos/<id> - 삭제
- 메모리(리스트) 저장

day26_todo_api/
├── app.py
└── requirements.txt
```

### Day 27: AJAX와 Fetch API
**애플리케이션**: 실시간 검색 자동완성
```
프롬프트:
Flask + JavaScript로 검색 자동완성 기능을 만들어주세요.
- 입력 시 실시간 API 호출
- Fetch API 사용
- 검색 결과 드롭다운 표시

day27_autocomplete/
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── css/style.css
│   └── js/search.js
└── requirements.txt
```

### Day 28: 외부 API 통합
**애플리케이션**: 환율 계산기
```
프롬프트:
Flask로 환율 계산기 웹앱을 만들어주세요.
- 환율 API로 실시간 환율 조회
- USD, EUR, JPY, CNY 지원
- 프론트엔드에서 변환

day28_exchange/
├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── css/style.css
│   └── js/exchange.js
└── requirements.txt
```

### Day 29: 에러 핸들링과 로깅
**애플리케이션**: API 모니터링 대시보드
```
프롬프트:
Flask로 API 상태 모니터링 대시보드를 만들어주세요.
- 여러 API의 상태 확인
- 에러 로깅
- 대시보드 UI

day29_monitor/
├── app.py
├── logger.py
├── templates/
│   └── dashboard.html
├── static/
│   └── css/style.css
├── logs/
└── requirements.txt
```

## Week 6-7: 중급 심화 (Day 30-45)

### Day 30: 파일 업로드
**애플리케이션**: 이미지 갤러리
```
day30_gallery/
- 이미지 업로드 기능
- 썸네일 표시
- 삭제 기능
```

### Day 31: Flask-WTF 폼 검증
**애플리케이션**: 설문조사 폼
```
day31_survey/
- WTForms 활용
- 서버/클라이언트 검증
- CSRF 보호
```

### Day 32: 블루프린트 (모듈화)
**애플리케이션**: 미니 블로그 (구조화)
```
day32_blog/
├── app/
│   ├── __init__.py
│   ├── main/
│   │   ├── __init__.py
│   │   └── routes.py
│   └── auth/
│       ├── __init__.py
│       └── routes.py
├── templates/
├── static/
└── run.py
```

### Day 33: 정적 파일 관리
**애플리케이션**: 랜딩 페이지
```
day33_landing/
- 이미지, 폰트, 아이콘 관리
- CDN vs 로컬
- 번들링 기초
```

### Day 34: JavaScript 심화 (DOM)
**애플리케이션**: 드래그 앤 드롭 칸반보드
```
day34_kanban/
- 순수 JS로 드래그 앤 드롭
- 상태 저장 (localStorage)
- Flask와 연동
```

### Day 35: JavaScript 심화 (이벤트)
**애플리케이션**: 인터랙티브 퀴즈
```
day35_quiz/
- 타이머 기능
- 점수 계산
- 결과 화면
```

### Day 36: Chart.js 연동
**애플리케이션**: 데이터 시각화 대시보드
```
day36_charts/
- 막대, 선, 파이 차트
- Flask API에서 데이터 제공
- 동적 업데이트
```

### Day 37: Bootstrap 통합
**애플리케이션**: 반응형 관리자 페이지
```
day37_admin/
- Bootstrap 5 적용
- 네비게이션, 카드, 테이블
- 모달 다이얼로그
```

### Day 38: 이메일 발송
**애플리케이션**: 문의하기 폼
```
day38_contact/
- Flask-Mail 또는 smtplib
- 폼 제출 → 이메일 발송
- 템플릿 이메일
```

### Day 39: 스케줄링 (APScheduler)
**애플리케이션**: 자동 리포트 생성기
```
day39_scheduler/
- 주기적 작업 실행
- 리포트 생성 및 저장
- 로그 기록
```

### Day 40: 크롤링 기초 (BeautifulSoup)
**애플리케이션**: 웹 스크래퍼
```
day40_scraper/
- 뉴스 사이트 크롤링
- 데이터 정제
- JSON/CSV 저장
```

### Day 41: 크롤링 심화 (Selenium)
**애플리케이션**: 동적 페이지 크롤러
```
day41_selenium/
- JavaScript 렌더링 페이지
- 로그인 후 크롤링
- 스크린샷 저장
```

### Day 42: 배포 준비 (Gunicorn)
**애플리케이션**: 프로덕션 설정
```
day42_deploy/
- Gunicorn 설정
- 환경변수 관리
- WSGI 이해
```

### Day 43: Docker 기초
**애플리케이션**: Flask 앱 컨테이너화
```
day43_docker/
├── app.py
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

### Day 44: 테스트 (pytest)
**애플리케이션**: API 테스트 작성
```
day44_testing/
├── app/
├── tests/
│   ├── test_routes.py
│   └── test_api.py
└── pytest.ini
```

### Day 45: 중급 종합 프로젝트
**애플리케이션**: 북마크 관리 서비스
```
day45_bookmarks/
- 사용자 인증
- 북마크 CRUD
- 태그/카테고리
- API + 프론트엔드
- 전체 중급 개념 통합
```

---

# 고급 과정 (Day 46-90): Database & 시스템 개발

## Week 8-9: 데이터베이스 기초 (Day 46-56)

### Day 46: SQLite 소개
**애플리케이션**: 주소록 데이터베이스
```
day46_addressbook/
├── app.py
├── database.py
├── schema.sql
└── requirements.txt

SQLite로 CRUD 구현
```

### Day 47: SQL 기초 (SELECT, INSERT)
**애플리케이션**: 도서 관리 시스템
```
day47_books/
- 도서 등록, 조회
- 검색 기능
- 정렬 옵션
```

### Day 48: SQL 심화 (UPDATE, DELETE, JOIN)
**애플리케이션**: 주문 관리 시스템
```
day48_orders/
- 고객, 상품, 주문 테이블
- JOIN으로 데이터 조회
- 주문 상태 업데이트
```

### Day 49: Flask-SQLAlchemy ORM
**애플리케이션**: 블로그 시스템 (ORM)
```
day49_blog_orm/
├── app/
│   ├── __init__.py
│   ├── models.py
│   ├── routes.py
│   └── forms.py
├── templates/
└── run.py
```

### Day 50: 관계형 모델링 (1:N)
**애플리케이션**: 게시판 (글+댓글)
```
day50_board/
- Post, Comment 모델
- 외래키 관계
- Cascade 삭제
```

### Day 51: 관계형 모델링 (N:M)
**애플리케이션**: 태그 시스템
```
day51_tags/
- Article, Tag 모델
- 다대다 관계
- 중간 테이블
```

### Day 52: 마이그레이션 (Flask-Migrate)
**애플리케이션**: 스키마 버전 관리
```
day52_migration/
- Alembic 활용
- 마이그레이션 생성/적용
- 롤백 처리
```

### Day 53: MySQL 설치와 연동
**애플리케이션**: MySQL 전환
```
day53_mysql/
- MySQL 설치/설정
- SQLAlchemy 연동
- 기존 SQLite 앱 마이그레이션
```

### Day 54: 트랜잭션과 동시성
**애플리케이션**: 포인트 시스템
```
day54_points/
- 트랜잭션 처리
- 동시 접근 제어
- 롤백 시나리오
```

### Day 55: 인덱스와 최적화
**애플리케이션**: 대용량 데이터 처리
```
day55_optimization/
- 인덱스 생성
- 쿼리 최적화
- 실행 계획 분석
```

### Day 56: Redis 캐싱
**애플리케이션**: 캐시 레이어 추가
```
day56_redis/
- Redis 설치/연동
- 세션 저장소
- 캐시 전략
```

## Week 10-11: 인증과 보안 (Day 57-66)

### Day 57: 비밀번호 해싱
**애플리케이션**: 안전한 회원가입
```
day57_secure_auth/
- bcrypt/werkzeug 해싱
- 솔트 처리
- 비밀번호 정책
```

### Day 58: JWT 인증
**애플리케이션**: 토큰 기반 API
```
day58_jwt/
- JWT 발급/검증
- 리프레시 토큰
- 로그아웃 처리
```

### Day 59: OAuth 2.0 (Google)
**애플리케이션**: 소셜 로그인
```
day59_oauth/
- Google OAuth 연동
- 사용자 정보 저장
- 기존 계정 연결
```

### Day 60: 역할 기반 접근제어
**애플리케이션**: 관리자/사용자 권한
```
day60_rbac/
- Role, Permission 모델
- 데코레이터 활용
- 관리자 전용 페이지
```

### Day 61: CORS 설정
**애플리케이션**: 프론트엔드 분리
```
day61_cors/
- Flask-CORS 설정
- 도메인 화이트리스트
- 프리플라이트 요청
```

### Day 62: HTTPS와 보안 헤더
**애플리케이션**: 보안 설정 강화
```
day62_security/
- SSL 인증서
- 보안 헤더 설정
- Flask-Talisman
```

### Day 63: 입력 검증과 SQL Injection 방지
**애플리케이션**: 보안 코드 리뷰
```
day63_validation/
- 파라미터 바인딩
- XSS 방지
- 파일 업로드 보안
```

### Day 64: Rate Limiting
**애플리케이션**: API 요청 제한
```
day64_ratelimit/
- Flask-Limiter
- IP별/사용자별 제한
- 429 응답 처리
```

### Day 65: 로깅과 모니터링
**애플리케이션**: 중앙 로그 시스템
```
day65_logging/
- 구조화된 로깅
- 로그 레벨 관리
- 에러 알림
```

### Day 66: 백업과 복구
**애플리케이션**: 데이터 백업 시스템
```
day66_backup/
- 자동 백업 스케줄
- 복구 절차
- 무결성 검증
```

## Week 12-13: 고급 통신 (Day 67-76)

### Day 67: WebSocket 기초 (Flask-SocketIO)
**애플리케이션**: 실시간 채팅
```
day67_chat/
- WebSocket 연결
- 메시지 브로드캐스트
- 접속자 표시
```

### Day 68: 실시간 알림
**애플리케이션**: 알림 시스템
```
day68_notification/
- 서버 → 클라이언트 푸시
- 알림 배지
- 토스트 메시지
```

### Day 69: 파일 스트리밍
**애플리케이션**: 대용량 파일 다운로드
```
day69_streaming/
- 청크 전송
- 진행률 표시
- 이어받기
```

### Day 70: Server-Sent Events
**애플리케이션**: 실시간 대시보드
```
day70_sse/
- SSE 구현
- 자동 재연결
- 이벤트 타입 구분
```

### Day 71: GraphQL 기초
**애플리케이션**: GraphQL API
```
day71_graphql/
- Graphene 라이브러리
- Query/Mutation
- 스키마 정의
```

### Day 72: gRPC 기초
**애플리케이션**: gRPC 서비스
```
day72_grpc/
- Protocol Buffers
- 서버/클라이언트
- 스트리밍
```

### Day 73: 메시지 큐 (RabbitMQ)
**애플리케이션**: 비동기 작업 처리
```
day73_rabbitmq/
- 메시지 발행/구독
- 워커 프로세스
- 작업 큐
```

### Day 74: Celery 비동기 작업
**애플리케이션**: 백그라운드 작업
```
day74_celery/
- Celery 설정
- 작업 정의
- 결과 조회
```

### Day 75: 마이크로서비스 기초
**애플리케이션**: 서비스 분리
```
day75_microservices/
├── api_gateway/
├── user_service/
├── order_service/
└── docker-compose.yml
```

### Day 76: API Gateway 패턴
**애플리케이션**: 통합 게이트웨이
```
day76_gateway/
- 라우팅
- 인증 통합
- 로드밸런싱
```

## Week 14-15: 시스템 개발 (Day 77-86)

### Day 77: 멀티스레딩
**애플리케이션**: 병렬 다운로더
```
day77_threading/
- Thread 생성
- ThreadPool
- 동기화(Lock)
```

### Day 78: 멀티프로세싱
**애플리케이션**: CPU 집약 작업
```
day78_multiprocessing/
- Process 생성
- Pool
- 프로세스 간 통신
```

### Day 79: Asyncio 비동기
**애플리케이션**: 비동기 크롤러
```
day79_asyncio/
- async/await
- aiohttp
- 동시 요청 처리
```

### Day 80: FastAPI 소개
**애플리케이션**: FastAPI 마이그레이션
```
day80_fastapi/
- Pydantic 모델
- 자동 문서화
- 비동기 엔드포인트
```

### Day 81: 타입 힌팅과 Pydantic
**애플리케이션**: 데이터 검증
```
day81_typing/
- Type Hints
- Pydantic 모델
- 런타임 검증
```

### Day 82: 의존성 주입
**애플리케이션**: DI 패턴 적용
```
day82_di/
- 의존성 주입
- 테스트 용이성
- FastAPI Depends
```

### Day 83: CI/CD 파이프라인
**애플리케이션**: GitHub Actions
```
day83_cicd/
├── .github/
│   └── workflows/
│       └── test.yml
├── app/
└── tests/
```

### Day 84: 모니터링 (Prometheus)
**애플리케이션**: 메트릭 수집
```
day84_prometheus/
- 메트릭 노출
- Prometheus 설정
- Grafana 대시보드
```

### Day 85: 로그 집계 (ELK)
**애플리케이션**: 중앙 로그 시스템
```
day85_elk/
- Elasticsearch
- Logstash
- Kibana
```

### Day 86: 부하 테스트 (Locust)
**애플리케이션**: 성능 테스트
```
day86_loadtest/
- Locust 시나리오
- 부하 분석
- 병목 지점 식별
```

## Week 16: 최종 프로젝트 (Day 87-90)

### Day 87-90: 종합 프로젝트
**애플리케이션**: 풀스택 서비스 개발

```
day87_90_final_project/

프로젝트: "커뮤니티 플랫폼"

기능:
- 회원가입/로그인 (JWT + OAuth)
- 게시글 CRUD
- 댓글/좋아요
- 실시간 알림 (WebSocket)
- 이미지 업로드
- 검색 (전문 검색)
- 관리자 대시보드

기술 스택:
- Backend: FastAPI
- Database: MySQL + Redis
- Frontend: HTML/CSS/JS
- 배포: Docker + Nginx

day87: 설계 및 모델링
day88: 백엔드 API 개발
day89: 프론트엔드 개발
day90: 배포 및 테스트
```

---

## 부록: 프롬프트 템플릿 모음

### 초급 템플릿
```
[Day X] Python 초급 - {주제}

Python으로 {애플리케이션}을 만들어주세요.

요구사항:
1. {기능 1}
2. {기능 2}
3. 한글 주석 포함
4. 에러 처리

파일명: dayX_{이름}.py
실행 예시도 보여주세요.
```

### 중급 템플릿
```
[Day X] Python 중급 - {주제}

Flask로 {웹 애플리케이션}을 만들어주세요.

프로젝트 구조:
dayX_{이름}/
├── app.py
├── templates/
├── static/
└── requirements.txt

### 파일: {경로} ###
(코드)
### 파일 끝 ###

형식으로 모든 파일을 작성해주세요.
```

### 고급 템플릿
```
[Day X] Python 고급 - {주제}

{시스템}을 구축해주세요.

아키텍처:
- Backend: {프레임워크}
- Database: {DB}
- 추가 기술: {기술}

프로젝트 구조:
dayX_{이름}/
├── app/
│   ├── __init__.py
│   ├── models.py
│   ├── routes.py
│   └── services/
├── tests/
├── config.py
├── run.py
├── Dockerfile
└── requirements.txt

### 파일: {경로} ###
(코드)
### 파일 끝 ###

형식으로 모든 파일을 작성해주세요.
실행 방법과 테스트 방법도 포함해주세요.
```

---

## 학습 일정 요약

| 주차 | 일수 | 주제 | 핵심 기술 |
|------|------|------|----------|
| 1 | Day 1-7 | 프로그래밍 기초 | 변수, 조건문, 반복문 |
| 2 | Day 8-14 | 자료구조와 함수 | 리스트, 딕셔너리, 함수 |
| 3 | Day 15 | 초급 프로젝트 | 종합 |
| 4 | Day 16-22 | Flask 기초 | 라우팅, 템플릿, 폼 |
| 5 | Day 23-29 | API 통신 | REST, JSON, Fetch |
| 6-7 | Day 30-45 | 중급 심화 | 크롤링, 배포, 테스트 |
| 8-9 | Day 46-56 | Database | SQLite, MySQL, ORM |
| 10-11 | Day 57-66 | 인증/보안 | JWT, OAuth, RBAC |
| 12-13 | Day 67-76 | 고급 통신 | WebSocket, MQ, MSA |
| 14-15 | Day 77-86 | 시스템 개발 | 비동기, CI/CD, 모니터링 |
| 16 | Day 87-90 | 최종 프로젝트 | 풀스택 서비스 |

---

*작성일: 2026-01-01*
*UTTEC Edu Python PC 프로그래밍 코스*
