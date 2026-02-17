# Plan It - AI 식단 플래너

AI를 활용한 개인 맞춤형 주간 식단 계획 자동화 웹 애플리케이션입니다.

## 주요 기능

### 1. AI 멀티모달 데이터 입력
- **사진 기반 영양 분석**: 음식 사진 업로드로 칼로리/영양성분 자동 추정
- **자연어 음성/텍스트 로깅**: "오늘 점심으로 닭가슴살 샐러드 먹었어" 같은 입력 지원

### 2. 지능형 주간 식단 생성
- 식이 제한(비건, 키토, 당뇨식 등), 목표(체중감량, 근육증량), 예산 반영
- 냉장고 파먹기: 보유 식재료 기반 레시피 우선 추천
- 알레르기/재료 부족 시 대체 재료 AI 제안

### 3. 협업 및 관리 도구
- 가족/파트너 공유 플래너 및 실시간 장바구니 공유
- 유통기한 추적 및 임박 재료 활용 식단 푸시 알림

### 4. 게이미피케이션
- 진행 표시줄 및 목표 설정
- 연속 기록(Streaks) 달성 시 배지/쿠폰 제공

## 기술 스택

### Backend
- **Framework**: FastAPI (Python)
- **Database**:
  - PostgreSQL (사용자, 건강 데이터)
  - MongoDB (레시피, 유연한 데이터)
- **Authentication**: JWT (python-jose)
- **AI**: OpenAI GPT-4V, Google Gemini

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI

### External APIs
- 식품안전나라 I2790 API (한국 영양 데이터)
- USDA FDC API (미국 영양 데이터)
- Spoonacular API (레시피)

## 설치 및 실행

### Backend

```bash
cd backend

# 가상환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 환경변수 설정
cp .env.example .env
# .env 파일 편집하여 API 키 설정

# 서버 실행
python run.py
```

### Frontend

```bash
cd frontend

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env.local

# 개발 서버 실행
npm run dev
```

## 디자인 가이드

### 컬러 팔레트
- **메인 컬러**: Sage Green (#b9c7bd) - 신선함, 투명성
- **데이터 시각화**: Cool Blue (#bde6ee), Purple (#837cb3) - 신뢰감, 평온함
- **CTA 버튼**: Orange (#fa7f1c) - 활기, 행동 유도

### UX 원칙
- 인지적 부하 최소화
- 과도한 알림 자제 (디지털 웰빙)
- 30초 이내 식사 로깅 완료

## API 엔드포인트

### Authentication
- `POST /api/v1/auth/register` - 회원가입
- `POST /api/v1/auth/login` - 로그인
- `POST /api/v1/auth/onboarding` - 온보딩 정보 입력
- `GET /api/v1/auth/me` - 내 정보

### Meals
- `POST /api/v1/meals/log` - 식사 기록
- `POST /api/v1/meals/log/image` - 사진으로 기록
- `POST /api/v1/meals/log/text` - 텍스트로 기록
- `GET /api/v1/meals/today` - 오늘 식사
- `GET /api/v1/meals/summary/today` - 오늘 영양 요약

### Recipes
- `GET /api/v1/recipes` - 레시피 목록
- `GET /api/v1/recipes/search` - 레시피 검색
- `GET /api/v1/recipes/by-ingredients` - 재료로 검색
- `POST /api/v1/recipes` - 레시피 생성

### Meal Plans
- `POST /api/v1/meal-plans/generate` - AI 식단 생성
- `POST /api/v1/meal-plans/save` - 식단 저장
- `GET /api/v1/meal-plans/current` - 현재 식단
- `GET /api/v1/meal-plans/{id}/shopping-list` - 장바구니 생성

### Pantry
- `GET /api/v1/pantry` - 냉장고 재료 목록
- `GET /api/v1/pantry/expiring` - 유통기한 임박 재료
- `POST /api/v1/pantry` - 재료 추가

### Family
- `POST /api/v1/family/create` - 가족 그룹 생성
- `POST /api/v1/family/join` - 가족 참여
- `GET /api/v1/family/members` - 구성원 목록
- `POST /api/v1/family/shopping-list/add` - 공유 장바구니에 추가

## 라이선스

MIT License
