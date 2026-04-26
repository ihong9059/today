# Day 3: 기술 문서 작성 — "README, API 문서, 기술 블로그를 Claude로"

## 학습 목표
- 개발자가 가장 미루는 "문서 작성"을 AI로 해결
- README, API 문서, 기술 블로그 초안 자동 생성
- 문서 품질 기준과 수정 워크플로우

---

## 실습 1: README.md 작성 (10분)

### 프롬프트
```
아래 프로젝트 정보로 README.md를 작성해주세요.

프로젝트: TaskFlow (업무 관리 API)
언어: Python 3.12
프레임워크: FastAPI
DB: PostgreSQL
인증: JWT
배포: Docker + Nginx
라이선스: MIT

포함 섹션:
1. 프로젝트 소개 (뱃지 포함: Python, FastAPI, PostgreSQL)
2. 주요 기능 (5가지)
3. 기술 스택 (표)
4. 설치 방법 (step-by-step, 코드 블록)
5. 환경 변수 (.env 예시)
6. API 엔드포인트 요약 (표)
7. 프로젝트 구조 (tree 형식)
8. 기여 방법 (Contributing)
9. 라이선스

실제 GitHub에 올릴 수 있는 품질로.
```

---

## 실습 2: API 문서 작성 (15분)

### 프롬프트
```
TaskFlow API의 엔드포인트 문서를 작성해주세요.

엔드포인트:
- POST /api/auth/register — 회원가입
- POST /api/auth/login — 로그인 (JWT 발급)
- GET /api/tasks — 할일 목록 조회 (페이지네이션)
- POST /api/tasks — 할일 생성
- PATCH /api/tasks/{id} — 할일 수정
- DELETE /api/tasks/{id} — 할일 삭제

각 엔드포인트마다:
1. URL + Method
2. 설명
3. Headers (Authorization 등)
4. Request Body (JSON 예시)
5. Response (성공/실패 JSON 예시)
6. 에러 코드 (400, 401, 404, 500)

마크다운 형식으로.
```

### 추가 요청
```
이 API 문서에 cURL 요청 예시도 각 엔드포인트마다 추가해줘.
```

---

## 실습 3: 기술 블로그 초안 (10분)

### 프롬프트
```
기술 블로그 글을 써줘.

제목: "FastAPI에서 JWT 인증을 제대로 구현하는 방법"
대상: 주니어~미드 Python 개발자
분량: 2000자

구성:
1. 도입: 왜 JWT인가? (세션 vs JWT 비교)
2. 핵심 개념: Access Token, Refresh Token
3. 구현 코드 (단계별, 코드 블록 포함)
4. 흔한 실수 3가지와 해결법
5. 보안 체크리스트
6. 결론

톤: 친근하지만 기술적으로 정확하게
코드는 Python + FastAPI + PyJWT 기반
```

### 수정 요청
```
"흔한 실수" 섹션에 실제 보안 사고 사례도 추가해줘.
```

---

## 실습 4: CHANGELOG / 릴리스 노트 (10분)

### 프롬프트
```
아래 git 커밋 메시지들로 릴리스 노트(CHANGELOG)를 작성해줘.

버전: v2.1.0

커밋:
- feat: 할일 우선순위 필터 추가
- feat: 다크모드 지원
- fix: 로그인 시 토큰 만료 처리 버그
- fix: 페이지네이션 마지막 페이지 에러
- refactor: 인증 미들웨어 분리
- docs: API 문서 업데이트
- chore: Python 3.12 업그레이드

형식: Keep a Changelog (https://keepachangelog.com)
카테고리: Added, Fixed, Changed, Documentation
```

---

## 과제

### 제출물: 기술 문서 3종

1. **README.md** (자기 프로젝트 또는 가상)
2. **API 문서** (3개 이상 엔드포인트)
3. **기술 블로그 초안** 또는 **CHANGELOG**

---

## 강사 참고 사항
- "문서 쓰기 싫어하는 개발자"에게 AI가 초안을 만들어주면 문서화 허들이 낮아짐
- README 품질이 프로젝트 첫인상을 결정한다는 점 강조
- 블로그 글은 실제로 발행하면 포트폴리오가 됨
- 자기 프로젝트 코드를 가져오면 실습 효과 극대화
