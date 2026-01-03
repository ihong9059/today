# UTTEC Edu 사이트 구조 분석

**분석일시:** 2026년 01월 03일 (업데이트)
**서버:** EC2 (13.125.148.58)
**프로젝트 경로:** `/home/ec2-user/hw-c-edu-platform/frontend/`

---

## 1. 정리 완료 요약 ✅

### 1.1 정리 작업 (2026-01-03 완료)

| 작업 | 상태 |
|------|------|
| src/app 폴더 삭제 | ✅ 완료 |
| course/1 폴더 삭제 | ✅ 완료 |
| course/2 폴더 삭제 | ✅ 완료 |
| app/c-esp32 폴더 삭제 | ✅ 완료 |
| app/courses 폴더 삭제 | ✅ 완료 |
| 탭 네비게이션 추가 | ✅ 완료 |
| /courses 링크 수정 → / | ✅ 완료 |
| 빌드 테스트 | ✅ 성공 |
| 사이트 동작 확인 | ✅ 정상 |

### 1.2 정리 결과
- **정리 전:** 142개 page.tsx
- **정리 후:** 90개 page.tsx
- **삭제:** 55개 파일, 22,845줄 코드 제거

### 1.3 백업 위치
```
/home/ec2-user/backups/2026-01-03/hw-c-edu-platform-backup (1.3GB)
```

---

## 2. 현재 전체 폴더 구조

```
/home/ec2-user/hw-c-edu-platform/frontend/
│
├── app/                              ← 메인 라우팅 폴더 (Next.js App Router)
│   ├── page.tsx                      ← 메인 페이지 (/)
│   ├── login/
│   │   └── page.tsx                  ← 로그인 (/login)
│   ├── dashboard/
│   │   └── page.tsx                  ← 대시보드 (/dashboard)
│   ├── about/
│   │   └── page.tsx                  ← 소개 (/about)
│   ├── mbti/
│   │   └── page.tsx                  ← MBTI (/mbti)
│   ├── faq/
│   │   └── page.tsx                  ← FAQ (/faq)
│   ├── playground/
│   │   └── page.tsx                  ← 플레이그라운드 (/playground)
│   │
│   ├── admin/                        ← 관리자
│   │   ├── login/page.tsx            ← /admin/login
│   │   └── dashboard/page.tsx        ← /admin/dashboard
│   │
│   └── course/                       ← 코스 라우팅
│       │
│       ├── coding/                   ← 코딩 코스
│       │   ├── c-esp32/              ← ESP32 (C언어)
│       │   │   ├── page.tsx
│       │   │   └── [level]/
│       │   │       ├── page.tsx
│       │   │       └── lesson/[day]/page.tsx
│       │   ├── c-pc/                 ← PC C언어
│       │   │   └── [level]/
│       │   │       ├── page.tsx
│       │   │       └── lesson/[day]/page.tsx
│       │   ├── python-pc/            ← Python PC
│       │   │   └── [level]/
│       │   │       ├── page.tsx
│       │   │       └── lesson/[day]/page.tsx
│       │   └── python-uttec/         ← Python UTTEC
│       │       └── [level]/
│       │           ├── page.tsx
│       │           └── lesson/[day]/page.tsx
│       │
│       ├── beginner/                 ← 사회초년생 트랙
│       │   ├── page.tsx
│       │   ├── [course]/
│       │   │   ├── page.tsx
│       │   │   └── lesson/[day]/page.tsx
│       │   └── ai-tools/             ← AI 도구
│       │       └── [tool]/
│       │           ├── page.tsx
│       │           └── lesson/[day]/page.tsx
│       │
│       ├── parent/                   ← 학부형 트랙
│       │   ├── page.tsx
│       │   ├── [course]/
│       │   │   ├── page.tsx
│       │   │   └── lesson/[day]/page.tsx
│       │   └── ai-tools/
│       │       └── [tool]/
│       │           ├── page.tsx
│       │           └── lesson/[day]/page.tsx
│       │
│       ├── teacher/                  ← 교사/교육자 트랙
│       │   ├── page.tsx
│       │   └── [level]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── career-change/            ← 진로 전환자 트랙
│       │   ├── page.tsx
│       │   └── [course]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── free/                     ← Free 체험
│       │   ├── page.tsx
│       │   └── [course]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── english/                  ← 영어 (학년별) + CourseTabNav
│       │   ├── page.tsx
│       │   ├── elementary/
│       │   │   ├── grade-3-4/
│       │   │   │   ├── page.tsx
│       │   │   │   └── lesson/[day]/page.tsx
│       │   │   └── grade-5-6/
│       │   │       ├── page.tsx
│       │   │       └── lesson/[day]/page.tsx
│       │   ├── middle/
│       │   │   ├── grade-7/page.tsx
│       │   │   ├── grade-8/page.tsx
│       │   │   ├── grade-9/page.tsx
│       │   │   └── [grade]/lesson/[day]/page.tsx
│       │   └── high/
│       │       ├── common/page.tsx
│       │       ├── reading/page.tsx
│       │       ├── writing/page.tsx
│       │       ├── suneung/page.tsx
│       │       └── [course]/lesson/[day]/page.tsx
│       │
│       ├── math/                     ← 수학 (학년별) + CourseTabNav
│       │   ├── page.tsx
│       │   ├── elementary/
│       │   │   ├── grade-3-4/
│       │   │   │   ├── page.tsx
│       │   │   │   └── lesson/[day]/page.tsx
│       │   │   └── grade-5-6/
│       │   │       ├── page.tsx
│       │   │       └── lesson/[day]/page.tsx
│       │   ├── middle/
│       │   │   ├── grade-7/page.tsx
│       │   │   ├── grade-8/page.tsx
│       │   │   ├── grade-9/page.tsx
│       │   │   └── [grade]/lesson/[day]/page.tsx
│       │   └── high/
│       │       ├── math1/page.tsx
│       │       ├── math2/page.tsx
│       │       ├── calculus/page.tsx
│       │       ├── suneung/page.tsx
│       │       └── [course]/lesson/[day]/page.tsx
│       │
│       ├── english-conversation/     ← 영어회화 + ConversationTabNav
│       │   ├── page.tsx
│       │   └── [level]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── japanese-conversation/    ← 일본어회화 + ConversationTabNav
│       │   ├── page.tsx
│       │   └── [level]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── chinese-conversation/     ← 중국어회화 + ConversationTabNav
│       │   ├── page.tsx
│       │   └── [level]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── spanish-conversation/     ← 스페인어회화 + ConversationTabNav
│       │   ├── page.tsx
│       │   └── [level]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── exploration/              ← 탐구영역 (사회/과학) + CourseTabNav
│       │   ├── page.tsx
│       │   └── [subject]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── korean/                   ← 국어 + CourseTabNav
│       │   ├── page.tsx
│       │   └── [subject]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── english-suneung/          ← 수능 영어 + CourseTabNav
│       │   ├── page.tsx
│       │   └── [subject]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       ├── math-suneung/             ← 수능 수학 + CourseTabNav
│       │   ├── page.tsx
│       │   └── [subject]/
│       │       ├── page.tsx
│       │       └── lesson/[day]/page.tsx
│       │
│       └── history-suneung/          ← 수능 한국사 + CourseTabNav
│           ├── page.tsx
│           └── [subject]/
│               ├── page.tsx
│               └── lesson/[day]/page.tsx
│
├── components/                       ← 공통 컴포넌트
│   ├── CourseTabNav.tsx              ← 대학진학 코스 탭 네비게이션 (NEW)
│   └── ConversationTabNav.tsx        ← 회화 코스 탭 네비게이션 (NEW)
│
├── lib/                              ← 라이브러리/데이터
│   ├── esp32-prompts/                ← ESP32 프롬프트
│   │   ├── advanced1.ts
│   │   ├── advanced2.ts
│   │   ├── advanced3-part1.ts
│   │   ├── advanced3-part2.ts
│   │   ├── intermediate2.ts
│   │   ├── intermediate3.ts
│   │   └── master.ts
│   └── exploration-data/
│       └── lesson-titles.ts
│
├── .next/                            ← Next.js 빌드 출력
│
└── package.json
```

---

## 3. 탭 네비게이션 구조

### 3.1 대학진학 코스 탭 (CourseTabNav)

| 탭 | URL | 아이콘 |
|-----|-----|--------|
| 영어 | /course/english | 🇬🇧 |
| 수학 | /course/math | 🔢 |
| 탐구 | /course/exploration | 📊 |
| 국어 | /course/korean | 📝 |
| 영어수능 | /course/english-suneung | 🎯 |
| 수학수능 | /course/math-suneung | 📐 |
| 한국사 | /course/history-suneung | 🏛️ |

### 3.2 회화 코스 탭 (ConversationTabNav)

| 탭 | URL | 아이콘 |
|-----|-----|--------|
| 영어회화 | /course/english-conversation | 🇬🇧 |
| 일본어회화 | /course/japanese-conversation | 🇯🇵 |
| 중국어회화 | /course/chinese-conversation | 🇨🇳 |
| 스페인어회화 | /course/spanish-conversation | 🇪🇸 |

---

## 4. 코스 카테고리 정리

### 4.1 메인 페이지 8개 트랙
| 트랙 | URL | 설명 |
|------|-----|------|
| 대학진학 코스 | /course/english, /course/math, 등 | AI 기반 영어·수학·탐구 |
| 회화 코스 | /course/*-conversation | 영어/일본어/중국어/스페인어 |
| 학부형 트랙 | /course/parent | 자녀 교육 방법론 |
| 사회초년생 트랙 | /course/beginner | 직장인 필수 역량 |
| 코딩 전문가 | /course/coding | ESP32, C, Python |
| 교사/교육자 | /course/teacher | 30일 AI 활용 교육 |
| 진로 전환자 | /course/career-change | 새 분야 도전 |
| Free 체험 | /course/free | 무료 직업 체험 |

### 4.2 대학진학 세부 코스
| 과목 | URL | 콘텐츠 |
|------|-----|--------|
| 영어 (학년별) | /course/english | 초등3-4, 초등5-6, 중1-3, 고등 |
| 수학 (학년별) | /course/math | 초등3-4, 초등5-6, 중1-3, 고등 |
| 국어 | /course/korean | 45일 |
| 수능 영어 | /course/english-suneung | 45일 |
| 수능 수학 | /course/math-suneung | 45일 |
| 수능 한국사 | /course/history-suneung | 45일 |
| 탐구영역 | /course/exploration | 사회9과목 + 과학8과목 |

---

## 5. 파일 통계

| 항목 | 개수 |
|------|------|
| 총 page.tsx 파일 | 90개 |
| 컴포넌트 파일 | 2개 (CourseTabNav, ConversationTabNav) |

---

## 6. 완료된 작업

- [x] src/app 폴더 백업 후 삭제
- [x] course/1, course/2 폴더 삭제
- [x] app/c-esp32 폴더 삭제
- [x] app/courses 폴더 삭제
- [x] 대학진학 코스 탭 네비게이션 추가 (CourseTabNav)
- [x] 회화 코스 탭 네비게이션 추가 (ConversationTabNav)
- [x] 모든 /courses 링크를 / (홈)으로 수정
- [x] 빌드 테스트 (npm run build)
- [x] 사이트 정상 동작 확인
- [x] GitHub 커밋 (5cd9d29, b41d8ad)

---

## 7. GitHub 커밋 내역

| 시간 | 커밋 | 내용 |
|------|------|------|
| 2026-01-03 | 5cd9d29 | 중복 폴더 정리 (src/app, course/1, course/2, c-esp32) |
| 2026-01-03 | b41d8ad | 탭 네비게이션 추가 및 /courses 링크 수정 |
