# UTTEC Edu 플랫폼 페이지 구조

**최종 수정일:** 2025-12-21
**서버 URL:** http://13.125.148.58:3001

---

## 1. 라우트 구조

```
/                                          # 메인 페이지
├── /about                                 # 소개 페이지 (영상 포함)
├── /courses                               # 강좌 목록 페이지
├── /login                                 # 로그인 페이지
├── /dashboard                             # 내 강의 (대시보드)
├── /mbti                                  # MBTI 검사
├── /faq                                   # FAQ
└── /course
    ├── /1                                 # 기존 코스 (AI 진로교육)
    │   └── /lesson/1
    ├── /2                                 # 코딩 전문가 코스 목록
    │   └── /lesson/1.3
    └── /coding/c-esp32
        └── /[level]                       # 초급/중급/고급 (동적)
            └── /lesson/[day]              # Day 1~10 (동적)
```

---

## 2. 주요 페이지 설명

### 2.1 메인 페이지 (`/`)
- 교육 트랙 선택 (학부형, 사회초년생, 코딩전문가 등)
- **코딩 전문가** 클릭 시 `/courses`로 이동

### 2.2 강좌 목록 (`/courses`)
- 모든 강좌 카드 표시
- 강좌별 레벨 선택 (초급/중급/고급)
- "강의 시작하기" 클릭 시 해당 레벨 코스 페이지로 이동

### 2.3 레벨별 코스 페이지 (`/course/coding/c-esp32/[level]`)
- `[level]`: 초급, 중급, 고급
- Part 1 (Day 1-6), Part 2 (Day 7-10) 구조
- 각 Day 카드 클릭 시 레슨 상세 페이지로 이동
- 진행률 표시
- 완료 시 축하 배너 및 다음 레벨 안내

### 2.4 레슨 상세 페이지 (`/course/coding/c-esp32/[level]/lesson/[day]`)
- **수강 신청 확인 후 접근 가능**
- 학습 목표
- 영상 섹션 (필수/이론/실습)
- 퀴즈 (정답 확인, 점수 표시)
- 추가 학습 자료
- 다음 강의 연결

### 2.5 대시보드 (`/dashboard`)
- **로그인 필수**
- 등록된 강좌 목록
- 학습 통계 (수강 중, 완료, 총 학습시간)
- "바로 학습하기" 버튼 (마지막 학습 위치)
- 구매 내역

---

## 3. 접근 제어

### 수강 신청 기반 접근 제어
```typescript
// 수강 신청 데이터 (실제로는 DB)
const enrollmentData = {
  'test@test.com': ['c-esp32'],  // c-esp32 강좌 등록됨
};
```

### 접근 흐름
1. 레슨 페이지 접근 시도
2. localStorage에서 로그인 상태 확인
3. 수강 신청 여부 확인
4. 미등록 시 → "수강 신청이 필요합니다" 화면

---

## 4. 테스트 계정

| 이메일 | 비밀번호 | 등록된 강좌 |
|--------|----------|-------------|
| test@test.com | admin | C 언어 (ESP32) |

---

## 5. temp 파일 목록

| 파일명 | 설명 | 적용 경로 |
|--------|------|-----------|
| `temp_coding_level_dynamic.tsx` | 레벨별 코스 페이지 | `/course/coding/c-esp32/[level]/page.tsx` |
| `temp_lesson_day_page_v2.tsx` | 레슨 상세 페이지 | `/course/coding/c-esp32/[level]/lesson/[day]/page.tsx` |
| `temp_dashboard_v3.tsx` | 대시보드 | `/dashboard/page.tsx` |
| `temp_coding_course.tsx` | 코딩전문가 코스목록 | `/course/2/page.tsx` |
| `temp_courses_page_v5.tsx` | 강좌 목록 | `/courses/page.tsx` |
| `temp_about_page_v3.tsx` | 소개 페이지 | `/about/page.tsx` |

---

## 6. 배포 명령어

```bash
# EC2 접속
ssh -i "uttec-first-ec2.pem" ec2-user@13.125.148.58

# 파일 업로드 (로컬 → EC2)
scp -i "uttec-first-ec2.pem" 파일명 ec2-user@13.125.148.58:/home/ec2-user/hw-c-edu-platform/frontend/app/경로/

# 빌드 및 재시작
cd /home/ec2-user/hw-c-edu-platform/frontend
npm run build
pm2 restart hw-c-edu-frontend

# 로그 확인
pm2 logs hw-c-edu-frontend
```

---

## 7. 향후 개발 예정

- [ ] 중급/고급 레슨 콘텐츠 추가
- [ ] 다른 강좌 페이지 생성 (Python, Node.js 등)
- [ ] 실제 결제 시스템 연동 (Stripe/토스페이먼츠)
- [ ] 학습 진행 상태 DB 저장 (MongoDB)
- [ ] 퀴즈 결과 저장 및 통계
