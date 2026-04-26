# Day 6: 웹 스크래핑 + API 호출 — "인터넷에서 데이터를 수집하자"

## 학습 목표
- requests 라이브러리로 HTTP 요청 보내기 (GET/POST)
- BeautifulSoup으로 웹 페이지 파싱 및 데이터 추출
- 공공 API를 호출하여 JSON 데이터 처리
- 웹 스크래핑의 윤리적 기준과 robots.txt 이해

## 준비물
- Day 1-5에서 설정한 개발 환경
- 인터넷 연결
- 공공 API 키 (data.go.kr 회원가입)

---

## 실습 1: requests 기초 — HTTP 요청 이해 (15분)

1. Claude Code에게 요청:
```
requests 라이브러리로 HTTP 요청을 배우는 http_basics.py를 만들어줘.
1. GET 요청: httpbin.org/get 호출하고 응답 상태코드, 헤더, 본문 출력
2. POST 요청: httpbin.org/post에 데이터 전송
3. JSON 응답 파싱: response.json()으로 딕셔너리 변환
4. 요청 파라미터 전달: params, headers 옵션
5. 에러 처리: status_code 확인, timeout 설정, try-except
각 단계에서 HTTP 통신 과정을 주석으로 설명해줘.
```

2. Claude Code에게 개념 질문:
```
HTTP GET과 POST의 차이를 쉽게 설명해줘.
상태코드 200, 404, 500이 각각 무슨 의미야?
```

### 관찰 포인트
- HTTP 요청-응답 구조 (클라이언트 → 서버 → 클라이언트)
- JSON 데이터가 Python 딕셔너리로 변환되는 과정

---

## 실습 2: BeautifulSoup — 웹 페이지 파싱 (20분)

1. 패키지 설치:
```bash
pip install beautifulsoup4
```

2. Claude Code에게 요청:
```
BeautifulSoup으로 웹 스크래핑하는 web_scraper.py를 만들어줘.
예제 사이트: http://quotes.toscrape.com (스크래핑 연습용 사이트)

1. requests로 페이지 가져오기
2. BeautifulSoup으로 HTML 파싱
3. 모든 명언(quote) 텍스트 추출
4. 명언 작성자(author) 추출
5. 태그(tags) 추출
6. 결과를 딕셔너리 리스트로 정리
7. CSV 파일로 저장 (pandas 사용)
8. 여러 페이지 순회 (페이지네이션 처리)

각 단계에서 HTML 구조를 분석하는 과정을 주석으로 설명해줘.
find(), find_all(), select() 등 다양한 선택자를 보여줘.
```

3. 실행 후 결과 확인:
```bash
python web_scraper.py
```

### 관찰 포인트
- HTML 태그 구조에서 원하는 데이터를 찾아가는 과정
- CSS 선택자를 활용한 데이터 추출 방법
- 페이지네이션 처리 패턴

---

## 실습 3: 공공 API 호출 — 실시간 데이터 (20분)

1. Claude Code에게 요청:
```
공공 API를 호출하는 public_api.py를 만들어줘.

예제 1: 무료 날씨 API (wttr.in)
- wttr.in/Seoul?format=j1 호출
- 현재 온도, 습도, 날씨 상태 출력

예제 2: JSONPlaceholder (연습용 REST API)
- https://jsonplaceholder.typicode.com/posts 에서 게시물 목록 조회
- 특정 게시물 조회 (GET /posts/1)
- 새 게시물 작성 시뮬레이션 (POST /posts)

예제 3: 환율 API (exchangerate-api.com 무료 버전)
- USD, JPY, EUR 대비 KRW 환율 조회
- 환율 정보를 보기 좋게 표 형태로 출력

각 API 호출 시 에러 처리와 타임아웃 설정을 포함해줘.
```

2. 실행 후 결과 확인:
```bash
python public_api.py
```

### 관찰 포인트
- API 엔드포인트의 URL 구조 (base URL + path + parameters)
- JSON 응답에서 필요한 데이터만 추출하는 방법
- API 호출 시 rate limit과 에러 처리의 중요성

---

## 실습 4: 종합 — 뉴스/데이터 수집기 (15분)

1. Claude Code에게 요청:
```
뉴스 데이터를 수집하고 분석하는 news_collector.py를 만들어줘.
1. 무료 뉴스 API (newsapi.org 또는 RSS 피드) 활용
2. 특정 키워드로 뉴스 검색
3. 제목, 날짜, 출처, URL 추출
4. pandas DataFrame으로 정리
5. 출처별 기사 수 통계
6. 결과를 CSV와 JSON 파일로 저장
7. 간단한 워드클라우드나 빈도수 분석 (선택)

robots.txt 확인 방법과 스크래핑 윤리에 대한 안내도 주석으로 포함해줘.
```

2. Claude Code에게 윤리 질문:
```
웹 스크래핑할 때 주의할 점은? robots.txt란 뭐야?
법적으로 문제가 될 수 있는 경우는 어떤 게 있어?
```

### 관찰 포인트
- robots.txt로 스크래핑 허용 범위를 확인하는 방법
- 요청 간 시간 간격(time.sleep)을 두는 이유
- 수집한 데이터를 구조화하여 저장하는 패턴

---

## 과제

### 제출물: "나만의 데이터 수집기"

```markdown
# 나만의 데이터 수집기

## 수집 대상
- 사이트/API:
- 수집 데이터 종류:
- 활용 목적:

## 기술 스택
| 라이브러리 | 용도 |
|-----------|------|
| requests | |
| BeautifulSoup | |
| pandas | |

## 수집 결과
- 수집된 데이터 건수:
- 저장 형식: (CSV / JSON / Excel)
- 데이터 샘플 (상위 5건):

## 스크래핑 윤리 체크
- [ ] robots.txt 확인했음
- [ ] 요청 간 적절한 지연 시간 설정
- [ ] 개인정보 수집하지 않음

## 어려웠던 점과 해결 방법
```

---

## 강사 참고 사항
- 회사 네트워크에서 외부 API 호출이 차단될 수 있으므로 모바일 핫스팟 준비
- 웹 스크래핑은 법적 이슈가 있으므로 연습용 사이트(quotes.toscrape.com) 사용 권장
- 공공 API 키 발급은 시간이 걸리므로 무료 API(wttr.in, JSONPlaceholder) 먼저 진행
