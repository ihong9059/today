# Web Server Projects Backup

**작성일**: 2026-01-18
**목적**: ihong9059 계정의 웹서버 프로젝트 백업 및 로컬 테스트 환경 구축

---

## 프로젝트 목록

| 프로젝트 | 기술 스택 | 포트 | 설명 |
|----------|----------|:----:|------|
| **cert-guide** | Next.js 16, TypeScript | 3000 | 자격시험 가이드 웹사이트 |
| **hw-c-edu-platform** | Next.js 14 + Express | 3000/3001 | C/ESP32 교육 플랫폼 |
| **uttec-webserver** | Static HTML | 8080 | UTTEC 교육 사이트 |
| **raspberry-weather-monitor** | Express.js | 3000 | 날씨 모니터링 API 서버 |
| **aws-education-platform** | 문서 | - | 교육 플랫폼 설계 문서 |

---

## 1. cert-guide (자격시험 가이드)

### 개요
- **기술 스택**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **설명**: 다양한 자격시험 정보 및 학습 가이드 제공
- **원래 배포**: https://uttec-cert.duckdns.org (AWS EC2)

### 실행 방법

```bash
cd projects/webServer/cert-guide

# 의존성 설치
npm install

# 개발 모드 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start
```

### 주요 스크립트
| 스크립트 | 설명 |
|----------|------|
| `npm run dev` | 개발 서버 시작 (HMR 지원) |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 시작 |
| `npm run lint` | ESLint 검사 |

### 폴더 구조
```
cert-guide/
├── app/              # Next.js App Router
├── src/              # 소스 코드
├── public/           # 정적 파일
├── education/        # 교육 콘텐츠
└── package.json
```

---

## 2. hw-c-edu-platform (C/ESP32 교육 플랫폼)

### 개요
- **기술 스택**:
  - Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
  - Backend: Express.js, Prisma, PostgreSQL
- **설명**: AI 기반 Hardware C언어/ESP32 교육 플랫폼
- **원래 배포**: Raspberry Pi 4 (192.168.0.3)

### 실행 방법

#### Backend (API 서버)

```bash
cd projects/webServer/hw-c-edu-platform/backend

# 의존성 설치
npm install

# 환경 변수 설정 (.env 파일 생성)
cat > .env << EOF
DATABASE_URL="postgresql://user:password@localhost:5432/edu_platform"
JWT_SECRET="your-secret-key"
ANTHROPIC_API_KEY="sk-ant-xxxxx"
PORT=3000
EOF

# Prisma 클라이언트 생성
npm run prisma:generate

# 개발 모드 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드 및 실행
npm run build
npm run start
```

#### Frontend (웹 클라이언트)

```bash
cd projects/webServer/hw-c-edu-platform/frontend

# 의존성 설치
npm install

# 환경 변수 설정 (.env 파일 생성)
cat > .env << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000
EOF

# 개발 모드 실행 (http://localhost:3001)
npm run dev -- -p 3001

# 프로덕션 빌드 및 실행
npm run build
npm run start -- -p 3001
```

### 주요 의존성
| 패키지 | 용도 |
|--------|------|
| `@anthropic-ai/sdk` | Claude AI API |
| `@prisma/client` | PostgreSQL ORM |
| `@monaco-editor/react` | 코드 에디터 |
| `express` | API 서버 |
| `jsonwebtoken` | JWT 인증 |

### 데이터베이스 설정 (PostgreSQL)
```bash
# PostgreSQL 설치 후
createdb edu_platform

# Prisma 마이그레이션
cd backend
npm run prisma:migrate
```

---

## 3. uttec-webserver (UTTEC 교육 사이트)

### 개요
- **기술 스택**: Static HTML, CSS, JavaScript
- **설명**: UTTEC 교육 정적 웹사이트
- **특징**: 별도 빌드 불필요, 바로 서빙 가능

### 실행 방법

```bash
cd projects/webServer/uttec-webserver

# 방법 1: Python 간단 서버
python -m http.server 8080

# 방법 2: Node.js http-server
npx http-server -p 8080

# 방법 3: Live Server (VS Code 확장)
# VS Code에서 index.html 열고 "Go Live" 클릭
```

### 파일 구조
```
uttec-webserver/
├── index.html           # 메인 페이지
├── student-guide.html   # 학생 가이드
├── question.html        # 질문 페이지
├── test-chat.html       # 테스트 채팅
├── admin/               # 관리자 페이지
├── aiKit_wroom_html/    # AI Kit 문서
└── download/            # 다운로드 파일
```

---

## 4. raspberry-weather-monitor (날씨 모니터링)

### 개요
- **기술 스택**: Express.js, MySQL
- **설명**: 라즈베리파이 AHT20 센서 데이터 수집 API 서버
- **특징**: IoT 센서 데이터 저장/조회

### 실행 방법

```bash
cd projects/webServer/raspberry-weather-monitor/server

# 의존성 설치
npm install

# 환경 변수 설정 (.env 파일 생성)
cat > .env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=weather_db
PORT=3000
EOF

# MySQL 데이터베이스 생성
mysql -u root -p -e "CREATE DATABASE weather_db;"

# 서버 실행
npm run start

# 개발 모드 (nodemon)
npm run dev
```

### API 엔드포인트
| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/weather` | 최근 날씨 데이터 조회 |
| POST | `/api/weather` | 새 데이터 저장 |
| GET | `/api/weather/history` | 히스토리 조회 |

### 폴더 구조
```
raspberry-weather-monitor/
├── server/
│   ├── app.js          # Express 앱
│   ├── config/         # 설정 파일
│   ├── routes/         # API 라우터
│   └── package.json
├── raspberry/          # 라즈베리파이 클라이언트
├── public/             # 정적 파일
└── esp32c3/            # ESP32 펌웨어
```

---

## 5. aws-education-platform (설계 문서)

### 개요
- **내용**: AI 기반 Hardware C언어 교육 플랫폼 설계 문서
- **상태**: 문서만 있음 (코드 없음)

### 주요 문서
| 파일 | 설명 |
|------|------|
| `프로젝트_설계서.md` | 전체 설계 문서 |
| `프로젝트_진행현황.md` | 진행 상황 |
| `교육사이트_기획_가이드.md` | 기획 가이드 |

---

## 빠른 테스트 가이드

### 1. 가장 간단한 테스트 (uttec-webserver)
```bash
cd projects/webServer/uttec-webserver
python -m http.server 8080
# 브라우저에서 http://localhost:8080 접속
```

### 2. Next.js 테스트 (cert-guide)
```bash
cd projects/webServer/cert-guide
npm install
npm run dev
# 브라우저에서 http://localhost:3000 접속
```

### 3. 풀스택 테스트 (hw-c-edu-platform)
```bash
# 터미널 1: Backend
cd projects/webServer/hw-c-edu-platform/backend
npm install
npm run dev

# 터미널 2: Frontend
cd projects/webServer/hw-c-edu-platform/frontend
npm install
npm run dev -- -p 3001
# 브라우저에서 http://localhost:3001 접속
```

---

## 환경 요구사항

| 소프트웨어 | 버전 | 필요 프로젝트 |
|-----------|------|--------------|
| Node.js | 18+ | 모든 프로젝트 |
| npm | 8+ | 모든 프로젝트 |
| Python | 3.x | uttec-webserver |
| PostgreSQL | 14+ | hw-c-edu-platform |
| MySQL | 8+ | raspberry-weather-monitor |

---

## 원래 배포 위치

| 프로젝트 | 서버 | URL/IP |
|----------|------|--------|
| cert-guide | AWS EC2 (uttec-ec2) | 52.78.119.132 |
| hw-c-edu-platform | Raspberry Pi 4 | 192.168.0.3:3000/3001 |
| uttec-webserver | - | - |
| raspberry-weather-monitor | Raspberry Pi | - |

---

## 문제 해결

### npm install 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 포트 충돌
```bash
# 사용 중인 포트 확인 (Windows)
netstat -ano | findstr :3000

# 프로세스 종료 (Windows)
taskkill /PID <PID> /F
```

### Prisma 오류
```bash
# Prisma 클라이언트 재생성
npx prisma generate

# 데이터베이스 동기화
npx prisma db push
```

---

*이 문서는 로컬 테스트 환경 구축을 위한 가이드입니다.*
