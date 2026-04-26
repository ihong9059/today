# Day 10: FastAPI + 프론트엔드 — "메모 앱 풀스택 개발"

## 학습 목표
- FastAPI의 특징과 Flask와의 차이 이해
- REST API 설계 (GET, POST, DELETE)
- HTML/CSS/JavaScript 프론트엔드와 API 연동
- 풀스택 메모 앱을 Claude Code로 빠르게 구축

## 준비물
- Day 1-9에서 설정한 개발 환경
- FastAPI 설치 (실습 중 진행)

---

## 실습 1: FastAPI 시작하기 (15분)

1. 패키지 설치:
```bash
pip install fastapi uvicorn
```

2. Claude Code에게 요청:
```
FastAPI로 첫 API 서버를 만드는 main.py를 만들어줘.
1. GET "/" — {"message": "메모 앱 API에 오신 걸 환영합니다"}
2. GET "/health" — 서버 상태 확인
3. GET "/items/{item_id}" — 경로 파라미터 예제
4. GET "/search?q=키워드" — 쿼리 파라미터 예제
5. POST "/echo" — 요청 본문을 그대로 반환

Flask와 FastAPI의 차이점을 주석으로 설명해줘.
특히 자동 API 문서(/docs)가 생기는 것을 강조해줘.
```

3. 서버 실행:
```bash
uvicorn main:app --reload
```

4. 브라우저에서 확인:
   - http://localhost:8000
   - http://localhost:8000/docs (Swagger UI 자동 생성)

### 관찰 포인트
- FastAPI의 자동 API 문서(Swagger UI)가 얼마나 편리한지
- 타입 힌트로 자동 검증이 되는 장점
- --reload 옵션으로 코드 변경 시 자동 재시작

---

## 실습 2: 메모 API 설계 — CRUD (20분)

1. Claude Code에게 요청:
```
메모 앱 REST API를 만들어줘. main.py에 구현해줘.

데이터 모델 (Pydantic):
- id: 자동 생성
- title: 제목 (필수)
- content: 내용 (필수)
- created_at: 생성 시간 (자동)
- updated_at: 수정 시간 (자동)

API 엔드포인트:
1. GET /api/memos — 전체 메모 목록 조회
2. GET /api/memos/{memo_id} — 특정 메모 조회
3. POST /api/memos — 새 메모 작성
4. PUT /api/memos/{memo_id} — 메모 수정
5. DELETE /api/memos/{memo_id} — 메모 삭제
6. GET /api/memos/search?q=키워드 — 메모 검색

데이터 저장은 Python 리스트로 구현하고,
Pydantic 모델로 요청/응답 검증을 적용해줘.
에러 처리(404 Not Found 등)도 포함해줘.
```

2. Swagger UI에서 API 테스트:
   - http://localhost:8000/docs에서 각 엔드포인트 직접 테스트

### 관찰 포인트
- Pydantic 모델로 입력 데이터를 자동 검증하는 방식
- HTTP 상태 코드 (200 OK, 201 Created, 404 Not Found)
- Swagger UI에서 API를 바로 테스트할 수 있는 편리함

---

## 실습 3: 프론트엔드 — HTML + JavaScript (25분)

1. Claude Code에게 요청:
```
메모 앱의 프론트엔드를 만들어줘.
FastAPI에서 정적 파일을 서빙하도록 설정하고, 다음 파일을 만들어줘:

static/
  index.html
  style.css
  app.js

기능:
1. 메모 목록 표시 (카드 형태)
2. 새 메모 작성 폼 (모달 팝업)
3. 메모 수정 기능
4. 메모 삭제 기능 (확인 후 삭제)
5. 검색 기능 (실시간 필터링)
6. 반응형 디자인 (모바일 대응)

JavaScript에서 fetch()로 API를 호출해줘.
async/await 패턴을 사용하고, 각 함수에 주석을 달아줘.
디자인은 모던하고 깔끔하게 해줘.
```

2. main.py에 정적 파일 서빙 추가:
```
main.py에 StaticFiles 마운트와 "/" 경로에서 index.html을 반환하도록 설정해줘.
```

3. 브라우저에서 메모 앱 전체 테스트

### 관찰 포인트
- 프론트엔드(HTML/JS)와 백엔드(FastAPI) 사이의 통신 구조
- fetch() API로 HTTP 요청을 보내는 JavaScript 코드
- async/await로 비동기 처리하는 패턴

---

## 실습 4: 기능 추가 + 마무리 (10분)

1. Claude Code에게 요청:
```
메모 앱에 다음 기능을 추가해줘:
1. 메모에 중요도 표시 (별표) 기능
2. 메모 정렬 (최신순, 제목순)
3. 메모 개수 통계 표시
4. 다크 모드 토글 버튼
5. 로컬 스토리지로 테마 설정 저장
```

2. 최종 테스트 후 git 커밋:
```bash
git add .
git commit -m "메모 앱 풀스택 구현 완료"
git push
```

### 관찰 포인트
- 기능을 하나씩 추가하는 점진적 개발 방식
- 프론트엔드와 백엔드를 동시에 수정하는 풀스택 개발 경험

---

## 과제

### 제출물: "나의 메모 앱"

```markdown
# 나의 메모 앱

## API 엔드포인트 목록
| 메서드 | URL | 기능 | 상태코드 |
|--------|-----|------|---------|
| GET | /api/memos | | 200 |
| POST | /api/memos | | 201 |
| | | | |

## 프론트엔드 기능
- [ ] 메모 목록 표시
- [ ] 메모 작성
- [ ] 메모 수정
- [ ] 메모 삭제
- [ ] 검색
- [ ] 추가 기능:

## 스크린샷

## Flask와 FastAPI 비교 (느낀 점)
| 항목 | Flask | FastAPI |
|------|-------|---------|
| 코드 양 | | |
| API 문서 | | |
| 데이터 검증 | | |

## Claude Code 활용 핵심 프롬프트
```

---

## 강사 참고 사항
- 풀스택 개발은 이 과정의 하이라이트 — "나도 웹 앱을 만들 수 있다"는 자신감 부여
- JavaScript를 모르는 학생도 Claude Code가 작성해주므로 부담 없이 진행 가능
- CORS 에러가 발생할 수 있으므로 FastAPI CORS 미들웨어 설정 포함 확인
