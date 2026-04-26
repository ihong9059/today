# Day 13: 데이터베이스 + CRUD — "데이터를 영구 저장하자"

## 학습 목표
- SQLite 데이터베이스의 개념과 SQL 기본 문법 이해
- Python에서 SQLite 연동 (sqlite3 모듈)
- Day 10의 메모 앱을 DB 기반으로 업그레이드
- Claude Code로 DB 스키마 설계와 쿼리 작성

## 준비물
- Day 1-12에서 설정한 개발 환경
- Day 10에서 만든 메모 앱 코드

---

## 실습 1: SQL 기초 — SQLite 시작 (15분)

1. Claude Code에게 요청:
```
SQLite와 SQL 기본을 배우는 sql_basics.py를 만들어줘.
1. sqlite3로 데이터베이스 파일(study.db) 생성
2. 테이블 생성 (CREATE TABLE):
   - students: id, name, age, grade, created_at
3. 데이터 삽입 (INSERT): 학생 5명
4. 데이터 조회 (SELECT): 전체, 조건, 정렬
5. 데이터 수정 (UPDATE): 특정 학생 성적 변경
6. 데이터 삭제 (DELETE): 특정 학생 삭제
7. 집계 함수: COUNT, AVG, MAX, MIN

각 SQL 쿼리에 주석으로 설명을 달아줘.
with문으로 connection을 안전하게 관리하는 패턴도 보여줘.
```

2. 실행 후 DB 파일 확인:
```bash
python sql_basics.py
```

3. Claude Code에게 개념 질문:
```
데이터를 리스트에 저장하는 것과 DB에 저장하는 것의 차이가 뭐야?
서버를 재시작하면 리스트 데이터는 사라지는데, DB는 왜 유지되는지 설명해줘.
```

### 관찰 포인트
- SQL이 영어 문장처럼 읽히는 구조 (SELECT name FROM students WHERE age > 20)
- sqlite3는 Python 내장 모듈이라 별도 설치 불필요
- DB 파일(.db)이 프로젝트 폴더에 생성되는 것 확인

---

## 실습 2: DB 유틸리티 클래스 만들기 (15분)

1. Claude Code에게 요청:
```
재사용 가능한 DB 관리 클래스 database.py를 만들어줘.

class Database:
    def __init__(self, db_name)
    def create_table(self, table_sql)
    def insert(self, sql, params)
    def select(self, sql, params)
    def update(self, sql, params)
    def delete(self, sql, params)
    def close(self)

1. SQL 인젝션 방지를 위해 파라미터 바인딩(?) 사용
2. 에러 처리 (try-except)
3. 연결 자동 관리 (__enter__, __exit__ 또는 with)
4. 로깅: 실행된 쿼리를 로그로 출력

테스트 코드도 함께 만들어줘.
```

### 관찰 포인트
- SQL 인젝션 공격의 위험성과 파라미터 바인딩으로 방어하는 방법
- 클래스로 DB 로직을 캡슐화하면 재사용이 쉬움
- context manager 패턴(__enter__/__exit__)

---

## 실습 3: 메모 앱 DB 연동 (25분)

1. Claude Code에게 요청:
```
Day 10에서 만든 메모 앱을 SQLite DB로 업그레이드해줘.

1. memos 테이블 생성:
   - id (INTEGER PRIMARY KEY AUTOINCREMENT)
   - title (TEXT NOT NULL)
   - content (TEXT NOT NULL)
   - is_important (BOOLEAN DEFAULT 0)
   - created_at (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
   - updated_at (TIMESTAMP)

2. main.py의 API 수정:
   - 리스트 저장 → SQLite 저장으로 변경
   - GET /api/memos — DB에서 전체 조회
   - POST /api/memos — DB에 삽입
   - PUT /api/memos/{id} — DB에서 수정
   - DELETE /api/memos/{id} — DB에서 삭제
   - GET /api/memos/search?q= — LIKE 검색

3. 서버를 재시작해도 데이터가 유지되는 것을 확인

database.py 유틸리티 클래스를 활용해줘.
```

2. 테스트 순서:
```bash
uvicorn main:app --reload
# 1. 메모 3개 작성
# 2. 서버 중지 (Ctrl+C)
# 3. 서버 재시작
# 4. 메모가 유지되는지 확인!
```

### 관찰 포인트
- 리스트 저장 → DB 저장으로 바꿔도 API 인터페이스는 동일 (추상화)
- 서버 재시작 후에도 데이터가 살아있는 것이 DB의 핵심 가치
- AUTOINCREMENT로 ID가 자동 증가하는 편리함

---

## 실습 4: 고급 기능 — 태그 + 통계 (15분)

1. Claude Code에게 요청:
```
메모 앱에 태그 기능과 통계를 추가해줘.

1. tags 테이블 추가 (id, name)
2. memo_tags 관계 테이블 (memo_id, tag_id) — 다대다 관계
3. 메모 작성 시 태그 추가 기능
4. 태그별 메모 필터링 API (GET /api/memos?tag=업무)
5. 통계 API (GET /api/stats):
   - 총 메모 수
   - 태그별 메모 수
   - 이번 주 작성한 메모 수
   - 가장 많이 사용된 태그

프론트엔드에도 태그 입력과 필터 기능을 추가해줘.
```

### 관찰 포인트
- 다대다(Many-to-Many) 관계의 개념
- JOIN 쿼리로 여러 테이블의 데이터를 결합하는 방법
- 통계 쿼리(GROUP BY, COUNT)의 활용

---

## 과제

### 제출물: "DB 연동 메모 앱"

```markdown
# DB 연동 메모 앱

## 데이터베이스 설계
### 테이블 구조
| 테이블명 | 컬럼 | 타입 | 설명 |
|---------|------|------|------|
| memos | id | INTEGER | 자동 증가 |
| | | | |

## 리스트 저장 vs DB 저장 비교
| 항목 | 리스트 | SQLite |
|------|--------|--------|
| 서버 재시작 | 데이터 사라짐 | |
| 검색 기능 | | |
| 대량 데이터 | | |

## 구현한 API 목록
| 메서드 | URL | SQL 쿼리 |
|--------|-----|----------|
| | | |

## 테스트 결과
- 데이터 영구 저장 확인: O / X
- 검색 기능 동작: O / X
- 태그 기능 동작: O / X

## 어려웠던 SQL 쿼리와 해결 방법
```

---

## 강사 참고 사항
- "서버를 끄고 다시 켜도 데이터가 남아있다"는 시연이 매우 인상적 — 반드시 라이브로 보여주기
- SQL 인젝션 공격 예시를 보여주면 보안 의식이 높아짐
- 실무에서는 SQLite보다 PostgreSQL, MySQL을 사용하지만 학습 단계에서는 SQLite로 충분
