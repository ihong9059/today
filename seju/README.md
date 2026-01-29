# 세주FA 영업관리 시스템

세주FA 영업사원을 위한 현장 방문 관리 시스템입니다.

## 시스템 구성

### 1. Android 앱 (영업사원용)
- **경로**: `android-app/`
- **패키지**: `com.seju.sales`
- **기능**:
  - GPS 기반 위치 추적
  - 거래처 방문 기록 (영업/납품/AS/수금/미팅/기타)
  - 현장 사진 촬영 및 업로드
  - 방문 이력 조회

### 2. 웹 서버
- **경로**: `server/`
- **포트**: 90 (http://sejufa.co.kr:90)
- **기술**: Node.js + Express + SQLite
- **기능**:
  - REST API 제공
  - 파일 업로드 처리
  - 관리자 대시보드

## 설치 및 실행

### 서버 실행
```bash
cd server
npm install
npm start
```

### Android 앱 빌드
```bash
cd android-app
./gradlew assembleDebug
```

빌드된 APK: `app/build/outputs/apk/debug/app-debug.apk`

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/api/visit` | 방문 기록 저장 |
| GET | `/api/visit` | 방문 기록 조회 |
| POST | `/api/gps` | GPS 로그 저장 |
| GET | `/api/gps` | GPS 로그 조회 |
| GET | `/api/customers` | 거래처 목록 |
| GET | `/api/stats` | 통계 조회 |
| GET | `/api/devices` | 기기 목록 |
| GET | `/api/salespeople` | 영업사원 목록 |

## 방문 유형

| 코드 | 유형 | 설명 |
|------|------|------|
| sales | 영업 | 일반 영업 방문 |
| delivery | 납품 | 제품 납품 |
| service | AS | 사후 서비스 |
| collect | 수금 | 대금 수금 |
| meeting | 미팅 | 회의/상담 |
| other | 기타 | 기타 방문 |

## 서버 정보

| 항목 | 값 |
|------|-----|
| 도메인 | sejufa.co.kr |
| 포트 | 90 |
| 대시보드 | http://sejufa.co.kr:90 |

---
*작성일: 2026-01-30*
