# Day 9: Flask 웹 서버 — "Python으로 나만의 웹사이트를 만들자"

## 학습 목표
- Flask 프레임워크의 구조와 동작 원리 이해
- 라우팅, 템플릿, 정적 파일 개념 습득
- 간단한 게시판 웹 애플리케이션 제작
- Claude Code로 웹 서버 코드를 빠르게 생성하는 방법 학습

## 준비물
- Day 1-8에서 설정한 개발 환경
- Flask 설치 (실습 중 진행)

---

## 실습 1: Flask Hello World (15분)

1. Flask 설치:
```bash
pip install flask
```

2. Claude Code에게 요청:
```
Flask로 첫 웹 서버를 만드는 app.py를 만들어줘.
1. "/" 경로: "안녕하세요! Flask 서버입니다" 출력
2. "/about" 경로: 자기소개 페이지
3. "/time" 경로: 현재 시간 표시
4. "/greet/<name>" 경로: URL 파라미터로 이름 받아서 인사
5. debug=True 모드로 실행

각 라우트 함수에 주석으로 URL 경로와 기능을 설명해줘.
```

3. 서버 실행:
```bash
python app.py
```

4. 브라우저에서 확인: http://localhost:5000

### 관찰 포인트
- @app.route() 데코레이터가 URL과 함수를 연결하는 방식
- 브라우저에서 URL을 입력하면 해당 함수가 실행되는 흐름
- debug=True일 때 코드 수정 시 자동 재시작되는 편리함

---

## 실습 2: HTML 템플릿 — Jinja2 (20분)

1. Claude Code에게 요청:
```
Flask에 HTML 템플릿을 적용해줘.
다음 구조로 만들어줘:

templates/
  base.html (공통 레이아웃: 헤더, 네비게이션, 푸터)
  index.html (메인 페이지)
  about.html (소개 페이지)
static/
  style.css (기본 스타일)

요구사항:
1. base.html에 Jinja2 블록 상속 적용 ({% block content %})
2. 네비게이션 바에 각 페이지 링크
3. CSS로 깔끔한 디자인 적용
4. app.py에서 render_template() 사용
5. 현재 시간을 템플릿에 변수로 전달
```

2. 서버 재시작 후 브라우저에서 확인

3. Claude Code에게 추가 요청:
```
Jinja2의 조건문({% if %})과 반복문({% for %})을 사용하는 예제를 보여줘.
리스트 데이터를 테이블로 렌더링하는 페이지를 추가해줘.
```

### 관찰 포인트
- 템플릿 상속으로 코드 중복을 줄이는 패턴
- Python 변수가 HTML 안에서 {{ 변수명 }}으로 렌더링되는 과정
- 정적 파일(CSS, 이미지)은 static/ 폴더에 위치

---

## 실습 3: 게시판 만들기 — CRUD (25분)

1. Claude Code에게 요청:
```
Flask로 간단한 게시판을 만들어줘.
기능:
1. 글 목록 보기 (GET /)
2. 글 작성 (GET/POST /write)
3. 글 상세 보기 (GET /post/<id>)
4. 글 수정 (GET/POST /edit/<id>)
5. 글 삭제 (POST /delete/<id>)

데이터 저장은 일단 Python 리스트(메모리)로 구현해줘.
각 게시물: id, 제목, 내용, 작성자, 작성일

필요한 HTML 템플릿도 모두 만들어줘:
- index.html (글 목록, 테이블 형태)
- write.html (글 작성 폼)
- post.html (글 상세)
- edit.html (글 수정 폼)

CSS로 보기 좋게 꾸며줘.
폼 전송(POST)과 redirect 처리를 포함해줘.
```

2. 서버 실행 후 게시판 기능 전체 테스트:
```bash
python app.py
```

3. 브라우저에서 글 작성 → 목록 확인 → 수정 → 삭제

### 관찰 포인트
- CRUD (Create, Read, Update, Delete)가 웹 앱의 기본 패턴
- GET은 데이터 조회, POST는 데이터 전송
- redirect()와 url_for()의 역할

---

## 실습 4: 폼 처리 + 플래시 메시지 (10분)

1. Claude Code에게 요청:
```
게시판에 다음 기능을 추가해줘:
1. 글 작성 시 입력값 검증 (제목, 내용이 비어있으면 에러)
2. flash() 메시지로 "글이 작성되었습니다" 알림
3. 글 삭제 시 "정말 삭제하시겠습니까?" 확인
4. 검색 기능 (제목 키워드 검색)
5. 페이지당 5개씩 페이지네이션
```

### 관찰 포인트
- 폼 검증(validation)의 중요성
- flash 메시지가 세션을 통해 한 번만 표시되는 방식
- URL 쿼리 파라미터(?keyword=xxx)로 검색 구현

---

## 과제

### 제출물: "나만의 Flask 웹 앱"

```markdown
# 나만의 Flask 웹 앱

## 프로젝트 정보
- 앱 이름:
- 기능 설명:
- 라우트 목록:

| URL | 메서드 | 기능 |
|-----|--------|------|
| / | GET | |
| | | |

## 파일 구조
```
project/
  app.py
  templates/
    ...
  static/
    ...
```

## 스크린샷 (브라우저 캡처)

## Claude Code에게 가장 도움 된 요청

## 추가하고 싶은 기능
```

---

## 강사 참고 사항
- 웹 개발은 눈에 보이는 결과물이 나오므로 학생 만족도가 높음 — 성취감 극대화
- 포트 충돌(5000번 사용 중) 시 app.run(port=5001)로 변경하는 방법 안내
- 서버를 끄지 않고 새 터미널을 열어 실행하는 실수가 잦으므로 Ctrl+C 안내
