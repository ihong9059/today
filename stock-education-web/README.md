# 주식입문 (Stock Education Web)

> 주식 초보자를 위한 AI 기반 투자 교육 플랫폼

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)

---

## 주요 기능

### 1. 체계적인 교육 과정
- 주식의 역사부터 최신 정책까지 9개 이상의 교육 과정
- 단계별 학습: 입문 → 중급 → 고급
- 퀴즈를 통한 학습 확인

### 2. AI 종목 추천
- 투자 성향 분석 (안정형/균형형/성장형/공격형)
- 맞춤형 종목 추천
- 리스크 점수 및 추천 이유 제공

### 3. 모의투자
- 1억원 가상 자금으로 실전 연습
- 실시간 시세 반영
- 포트폴리오 관리 및 수익률 추적

### 4. 용어사전
- 100+ 주식 용어 정리
- 카테고리별 분류 (기본/지표/거래/분석/정책)
- 실제 예시와 관련 용어 연결

### 5. 실시간 시장 정보
- KOSPI/KOSDAQ 지수 표시
- 환율 정보
- 오늘의 추천 종목

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | Next.js 15 (App Router) |
| **언어** | TypeScript |
| **스타일링** | Tailwind CSS |
| **아이콘** | Lucide React |
| **상태관리** | React Hooks (useState, useEffect) |
| **로컬저장** | LocalStorage (커스텀 Hook) |

---

## 프로젝트 구조

```
stock-education-web/
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── page.tsx           # 메인 홈페이지
│   │   ├── education/         # 교육 과정 페이지
│   │   │   ├── page.tsx       # 교육 목록
│   │   │   └── [id]/page.tsx  # 개별 교육 상세
│   │   ├── recommend/         # AI 종목 추천
│   │   ├── paper-trading/     # 모의투자
│   │   ├── glossary/          # 용어사전
│   │   └── api/               # API Routes
│   │       ├── stocks/        # 주식 데이터
│   │       ├── recommendations/ # 추천 데이터
│   │       ├── education/     # 교육 데이터
│   │       ├── glossary/      # 용어 데이터
│   │       └── market/        # 시장 데이터
│   ├── components/            # 재사용 컴포넌트
│   │   ├── ui/               # 기본 UI (Button, Card, Badge, Progress)
│   │   ├── layout/           # 레이아웃 (Header, Footer)
│   │   └── stock/            # 주식 관련 (StockCard, MarketOverview)
│   ├── data/                  # 정적 데이터
│   │   ├── education.ts      # 교육 콘텐츠 & 용어사전
│   │   └── stocks.ts         # 샘플 주식 데이터
│   ├── hooks/                 # 커스텀 Hooks
│   │   ├── useLocalStorage.ts
│   │   └── useMarketData.ts
│   ├── lib/                   # 유틸리티
│   │   └── utils.ts
│   └── types/                 # TypeScript 타입 정의
│       └── index.ts
├── public/                    # 정적 파일
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 시작하기

### 1. 설치

```bash
# 저장소 클론
git clone https://github.com/ihong9059/today.git
cd today/stock-education-web

# 의존성 설치
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인

### 3. 빌드

```bash
npm run build
npm start
```

---

## 주요 페이지

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 홈 | `/` | 서비스 소개, 실시간 시장 정보, 추천 종목 |
| 교육 | `/education` | 체계적인 주식 교육 과정 |
| 교육 상세 | `/education/[id]` | 개별 교육 콘텐츠 및 퀴즈 |
| AI 추천 | `/recommend` | 투자 성향 분석 & 맞춤 종목 추천 |
| 모의투자 | `/paper-trading` | 1억원 가상 자금 투자 시뮬레이션 |
| 용어사전 | `/glossary` | 주식 용어 검색 및 학습 |

---

## 교육 콘텐츠

### 입문 (Beginner)
1. **주식의 역사** - 동인도회사, 증권거래소, 버블 사건
2. **주식 기초 지식** - 주식 정의, 주주 권리, 거래 시간

### 중급 (Intermediate)
3. **PER, PBR, ROE 이해하기** - 핵심 투자 지표
4. **한국 주식의 역사** - 한국거래소, IMF, 코리아 디스카운트

### 고급 (Advanced)
5. **투자 전략과 리스크 관리** - 장기투자, 분산투자, 손절, 심리관리

---

## 스크린샷

### 메인 페이지
- 히어로 섹션: 서비스 소개 및 CTA 버튼
- 실시간 시장 정보: KOSPI, KOSDAQ, 환율
- 주요 기능 카드: 교육, AI 추천, 모의투자, 용어사전
- 오늘의 추천 종목

### 교육 페이지
- 레벨별 교육 과정 목록
- 진행률 표시
- 마크다운 기반 교육 콘텐츠
- 인터랙티브 퀴즈

---

## API 엔드포인트

| 엔드포인트 | 메서드 | 설명 |
|------------|--------|------|
| `/api/stocks` | GET | 주식 목록 조회 |
| `/api/recommendations` | GET | 추천 종목 조회 |
| `/api/education` | GET | 교육 과정 조회 |
| `/api/glossary` | GET | 용어사전 조회 |
| `/api/market` | GET | 시장 지수 조회 |
| `/api/market/stock` | GET | 개별 종목 시세 조회 |

---

## 향후 계획

- [ ] 실제 주식 API 연동 (한국투자증권 API)
- [ ] 사용자 인증 시스템
- [ ] 학습 진도 저장 (DB 연동)
- [ ] AI 챗봇 (투자 상담)
- [ ] 뉴스 피드 연동
- [ ] 모바일 앱 (React Native)

---

## 라이선스

MIT License

---

## 작성자

**UTTEC** / Claude Code

*작성일: 2026-02-27*
