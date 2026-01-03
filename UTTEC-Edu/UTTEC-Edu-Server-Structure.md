# UTTEC Edu 서버 구조

**서버**: AWS EC2 (13.125.148.58)
**도메인**: https://uttec-edu.duckdns.org/
**업데이트**: 2026-01-03

---

## 1. 프로젝트 위치

```
/home/ec2-user/
├── hw-c-edu-platform/          # ✅ 메인 프로젝트 (운영 중)
│   ├── frontend/               # Next.js 프론트엔드
│   └── backend/                # 백엔드 서버
├── uttec-edu/                  # ⚠️ 이전 백업 (사용 안함)
├── backups/                    # 백업 폴더
│   └── 2026-01-03/
└── [임시 파일들]               # ❌ 삭제 권장 (아래 참조)
```

---

## 2. Frontend 구조 (/hw-c-edu-platform/frontend/)

### 2.1 App 디렉토리 구조

```
app/
├── page.tsx                    # 홈페이지
├── layout.tsx                  # 루트 레이아웃
├── globals.css                 # 글로벌 스타일
│
├── about/                      # 소개 페이지
├── admin/                      # 관리자
│   ├── dashboard/
│   └── login/
├── api/                        # API 라우트
│   └── visitor/
├── dashboard/                  # 대시보드
├── faq/                        # FAQ
├── login/                      # 로그인
├── mbti/                       # MBTI 테스트
├── playground/                 # 플레이그라운드
│
└── course/                     # 📚 코스 (핵심)
    │
    ├── coding/                 # 🖥️ 코딩 전문가 (4개 트랙)
    │   ├── page.tsx
    │   ├── c-esp32/            # ESP32 (C)
    │   │   ├── page.tsx
    │   │   └── [level]/
    │   │       ├── page.tsx
    │   │       └── lesson/[day]/page.tsx
    │   ├── c-pc/               # C언어 (PC)
    │   │   ├── page.tsx
    │   │   └── [level]/...
    │   ├── python-pc/          # Python (PC)
    │   │   ├── page.tsx
    │   │   └── [level]/...
    │   └── python-uttec/       # Python (UTTEC)
    │       ├── page.tsx
    │       └── [level]/...
    │
    ├── english/                # 📖 영어 (학년별)
    │   ├── page.tsx
    │   ├── elementary/         # 초등
    │   │   ├── grade-3-4/
    │   │   └── grade-5-6/
    │   ├── middle/             # 중등
    │   │   ├── grade-7/
    │   │   ├── grade-8/
    │   │   └── grade-9/
    │   └── high/               # 고등
    │       ├── common/
    │       ├── reading/
    │       ├── writing/
    │       └── suneung/
    │
    ├── math/                   # 📐 수학 (학년별)
    │   ├── page.tsx
    │   ├── elementary/
    │   │   ├── grade-3-4/
    │   │   └── grade-5-6/
    │   ├── middle/
    │   │   ├── grade-7/
    │   │   ├── grade-8/
    │   │   └── grade-9/
    │   └── high/
    │       ├── math1/
    │       ├── math2/
    │       ├── calculus/
    │       └── suneung/
    │
    ├── korean/                 # 📝 국어 (수능)
    │   └── [subject]/
    │       └── lesson/[day]/
    │
    ├── exploration/            # 🔬 과학탐구 (수능)
    │   └── [subject]/
    │       └── lesson/[day]/
    │
    ├── english-suneung/        # 🎯 영어 (수능)
    │   └── [subject]/
    │       └── lesson/[day]/
    │
    ├── math-suneung/           # 🎯 수학 (수능)
    │   └── [subject]/
    │       └── lesson/[day]/
    │
    ├── history-suneung/        # 🏛️ 한국사 (수능)
    │   └── [subject]/
    │       └── lesson/[day]/
    │
    ├── english-conversation/   # 💬 영어 회화
    │   └── [level]/
    │       └── lesson/[day]/
    │
    ├── chinese-conversation/   # 🀄 중국어 회화
    │   └── [level]/
    │       └── lesson/[day]/
    │
    ├── japanese-conversation/  # 🎌 일본어 회화
    │   └── [level]/
    │       └── lesson/[day]/
    │
    ├── spanish-conversation/   # 🇪🇸 스페인어 회화
    │   └── [level]/
    │       └── lesson/[day]/
    │
    ├── parent/                 # 👨‍👩‍👧 학부형 (4단계)
    │   ├── page.tsx
    │   ├── [course]/           # ai-basics, mindset, education, career
    │   │   └── lesson/[day]/
    │   └── ai-tools/           # AI 도구 심화
    │       └── [tool]/
    │           └── lesson/[day]/
    │
    ├── teacher/                # 👩‍🏫 교사/교육자 (3단계)
    │   ├── page.tsx
    │   └── [level]/            # elementary, middle, high
    │       └── lesson/[day]/
    │
    ├── career-change/          # 🔄 진로전환자 (8단계)
    │   ├── page.tsx
    │   └── [course]/
    │       └── lesson/[day]/
    │
    ├── beginner/               # 🌱 사회초년생 (3단계)
    │   ├── page.tsx
    │   └── [course]/
    │       └── lesson/[day]/
    │
    └── free/                   # 🎁 Free 체험 (5개)
        ├── page.tsx
        └── [course]/           # film-director, renewable-energy,
            └── lesson/[day]/   # elementary-teacher, welding-technician,
                                # orchard-owner
```

### 2.2 Components 디렉토리

```
components/
├── Header.tsx                  # 헤더
├── Footer.tsx                  # 푸터
├── VisitorTracker.tsx          # 방문자 추적
│
├── CourseTabNav.tsx            # 대학진학 탭 (blue, 6탭)
├── ConversationTabNav.tsx      # 회화 탭 (emerald, 4탭)
├── CodingTabNav.tsx            # 코딩 탭 (green, 4탭)
├── ParentTabNav.tsx            # 학부형 탭 (purple, 4탭)
├── TeacherTabNav.tsx           # 교사 탭 (indigo, 3탭)
├── CareerChangeTabNav.tsx      # 진로전환 탭 (orange, 8탭)
├── BeginnerTabNav.tsx          # 사회초년생 탭 (cyan, 3탭)
├── FreeTabNav.tsx              # Free체험 탭 (rose, 5탭)
└── TrackTabNav.tsx             # 특화트랙 메인 탭
```

### 2.3 기타 디렉토리

```
lib/                            # 유틸리티/라이브러리
public/                         # 정적 파일
├── images/
│   ├── esp32-board.jpg
│   └── uttec-shield.jpg
├── downloads/
│   ├── CP210x_Windows_Drivers.zip
│   └── ESP32_Serial_Test.zip
├── mbti-test.html
├── mmtic-test.html
├── edu_advertizing.mp4
└── favicon*.png
styles/                         # 스타일
.next/                          # Next.js 빌드
node_modules/                   # 의존성
```

---

## 3. 코스 트랙 요약

| 트랙 | 경로 | 하위 코스 | 탭 컴포넌트 |
|------|------|-----------|-------------|
| 대학진학 | `/course/english`, `/course/math` 등 | 영어, 수학, 과학, 국어, 국사, 통합 | CourseTabNav |
| 회화 | `/course/*-conversation` | 영어, 중국어, 일본어, 스페인어 | ConversationTabNav |
| 코딩 전문가 | `/course/coding/*` | ESP32-C, C-PC, Python-PC, Python-UTTEC | CodingTabNav |
| 학부형 | `/course/parent/*` | AI기초, 마인드셋, 교육실전, 진로 | ParentTabNav |
| 교사/교육자 | `/course/teacher/*` | 초등, 중등, 고등 | TeacherTabNav |
| 진로전환자 | `/course/career-change/*` | 8개 단계 | CareerChangeTabNav |
| 사회초년생 | `/course/beginner/*` | AI기초, 업무활용, 자기개발 | BeginnerTabNav |
| Free 체험 | `/course/free/*` | 5개 직업 체험 | FreeTabNav |

---

## 4. 삭제 권장 파일 (홈 디렉토리)

```
/home/ec2-user/
├── day-page.tsx                # ❌ 임시 파일
├── level-page.tsx              # ❌ 임시 파일
├── page.tsx                    # ❌ 임시 파일
├── esp32-board.jpg             # ❌ 중복 (public/images에 있음)
├── temp_coding_course.tsx      # ❌ 임시 파일
├── temp_coding_level_course.tsx# ❌ 임시 파일
├── temp_course_detail.tsx      # ❌ 임시 파일
├── temp_courses_page_v4.tsx    # ❌ 임시 파일
├── temp_courses_page_v5.tsx    # ❌ 임시 파일
├── temp_dashboard_v2.tsx       # ❌ 임시 파일
├── temp_esp32_lesson.tsx       # ❌ 임시 파일
├── temp_lesson_detail.tsx      # ❌ 임시 파일
├── temp_login_page.tsx         # ❌ 임시 파일
└── uttec-edu/                  # ⚠️ 이전 백업 (선택적 삭제)
```

---

## 5. PM2 프로세스

```bash
# 상태 확인
pm2 list

# 재시작
pm2 restart all

# 로그 확인
pm2 logs
```

---

## 6. 서버 관리 명령어

```bash
# SSH 접속
ssh -i "uttec-first-ec2.pem" ec2-user@13.125.148.58

# Git pull & 재빌드
cd /home/ec2-user/hw-c-edu-platform/frontend
git pull
npm run build
pm2 restart all

# 임시 파일 정리 (권장)
cd /home/ec2-user
rm -f day-page.tsx level-page.tsx page.tsx esp32-board.jpg
rm -f temp_*.tsx
rm -rf uttec-edu/
```

---

## 7. 통계

- **총 페이지 수**: 94개 page.tsx
- **총 컴포넌트**: 12개
- **코스 트랙**: 8개
- **하위 코스**: 37개+
