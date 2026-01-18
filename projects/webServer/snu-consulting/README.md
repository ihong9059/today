# SNU Consulting - 서울대 입시 컨설팅 시스템

서울대학교 입시를 준비하는 학생들을 위한 학과 추천 웹 서비스입니다.

## 주요 기능

- **성적 기반 추천**: 모의고사 점수(국어, 수학, 영어, 탐구)와 내신 등급을 입력하면 지원 가능한 학과를 추천합니다.
- **MBTI 기반 추천**: MBTI 성격 유형에 맞는 학과를 추천합니다.
- **3단계 분류**: 안정 지원, 적정 지원, 상향 지원으로 구분하여 전략적 지원이 가능합니다.

## 실행 방법

### 방법 1: Python 서버 (권장)

```bash
cd snu-consulting
python3 start_server.py
```

브라우저가 자동으로 열리며 `http://localhost:8080`에서 확인할 수 있습니다.

### 방법 2: 직접 HTTP 서버 실행

```bash
cd snu-consulting
python3 -m http.server 8080
```

브라우저에서 `http://localhost:8080` 접속

### 방법 3: Node.js (npx)

```bash
cd snu-consulting
npx serve -p 8080
```

## 파일 구조

```
snu-consulting/
├── index.html          # 메인 HTML
├── css/
│   └── style.css       # 스타일시트
├── js/
│   └── app.js          # 메인 JavaScript (추천 로직 포함)
├── data/
│   └── snu_departments.json  # 서울대 학과 데이터
├── start_server.py     # 로컬 서버 실행 스크립트
└── README.md           # 이 파일
```

## 데이터 설명

### snu_departments.json

- **15개 단과대학**, **80+ 학과/전공** 정보 포함
- 각 학과별 정보:
  - `cutline`: 예상 커트라인 (국어, 수학, 영어등급, 탐구)
  - `naesin`: 내신 기준 등급
  - `mbti`: 적합한 MBTI 유형 (최대 4개)
  - `keywords`: 학과 키워드
  - `career`: 졸업 후 진로

## 추천 알고리즘

1. **점수 기반 분석**
   - 서울대 정시 반영비율 적용 (국어 33.3%, 수학 40%, 탐구 26.7%)
   - 수학 가중치 1.2, 탐구 가중치 0.8 적용

2. **매칭 레벨 분류**
   - **안정 지원**: 커트라인 대비 +3점 이상
   - **적정 지원**: 커트라인 대비 -2 ~ +3점
   - **상향 지원**: 커트라인 대비 -5 ~ -2점

3. **MBTI 매칭**
   - 각 학과별 적합 MBTI 4개 유형 지정
   - 매칭 순위에 따라 정렬

## 확장 계획

추후 대한민국 전체 대학으로 확장 예정:
- 서울 주요 대학 (연세대, 고려대, 서강대, 성균관대 등)
- 지방 거점 국립대학
- 의약학 계열 특화

## 참고사항

- 본 서비스는 **참고용**이며, 실제 입시 결과와 다를 수 있습니다.
- 정확한 입시 정보는 [서울대학교 입학본부](https://admission.snu.ac.kr)에서 확인하세요.
- 커트라인 데이터는 예상치이며 실제 합격선과 차이가 있을 수 있습니다.

## 참고 사이트

- [서울대학교 입학본부](https://admission.snu.ac.kr)
- [대학어디가](https://www.adiga.kr)
- [진학사](https://www.jinhak.com)
- [유웨이](https://www.uway.com)
