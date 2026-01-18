# C:/todo/today 디렉토리 구조 설명서

**최종 업데이트:** 2026년 01월 18일

---

## 개요

이 문서는 `C:/todo/today` 폴더의 전체 구조와 각 디렉토리/파일의 용도를 설명합니다.
GitHub Repository: https://github.com/ihong9059/today.git

---

## 디렉토리 트리 구조

```
C:/todo/today/
├── .claude/                    # Claude Code 설정
├── .git/                       # Git 저장소
├── aiWebSite/                  # AI 웹사이트 (ESP32 + Python)
├── ai영상/                     # AI 영상 콘텐츠
├── aws/                        # AWS 교육 플랫폼 콘텐츠
├── ec2/                        # EC2 서버 관리 문서
├── ffmpeg/                     # FFmpeg 도구
├── gpu적용Project/             # GPU 적용 프로젝트
├── projects/                   # ★ 주요 개발 프로젝트 모음 ★
├── raspberry/                  # Raspberry Pi 관련 자료
├── rftech/                     # RFID/NFC 기술 프로젝트
├── SensorMonitor/              # 센서 모니터링 Android 앱
├── skills/                     # Claude Skills 설정
├── smartphoneServer/           # 스마트폰 서버 관련
├── test/                       # 테스트용 폴더
├── UTTEC-Edu/                  # UTTEC 교육 콘텐츠
├── vrew/                       # Vrew 영상 편집 관련
├── 공장자동화/                 # 공장 자동화 프로젝트 (데모 사이트)
├── 수원시/                     # 수원시 프로젝트
├── 위시켓/                     # 위시켓 관련
├── 입시요강/                   # 입시 요강 자료
├── 자격시험/                   # 자격시험 가이드 콘텐츠
├── 작업보고서/                 # ★ 일일 작업보고서 ★
└── 특허/                       # 특허 관련 자료
```

---

## 1. 핵심 프로젝트 디렉토리

### projects/ - 주요 개발 프로젝트 모음

| 하위 폴더 | 설명 | 기술 스택 |
|-----------|------|-----------|
| `webServer/` | **★ 웹서버 프로젝트 (가장 활발)** | Node.js, Next.js |
| `SensorMonitor/` | 센서 모니터링 Android 앱 | Kotlin, Android |
| `AI_OCR_App/` | AI OCR 안드로이드 앱 | Kotlin, ML Kit |
| `android-lpr/` | 차량 번호판 인식 앱 | Android, OpenCV |
| `esp32-cam-lpr-system/` | ESP32 카메라 번호판 시스템 | ESP32, C++ |
| `esp32Camera/` | ESP32 카메라 프로젝트 | ESP32, Arduino |
| `rpi-ocr-anpr/` | Raspberry Pi OCR/ANPR | Python |
| `ai교육/` | AI 교육 자료 | - |
| `ai교육시스템/` | AI 교육 시스템 | - |
| `ai비지니스/` | AI 비즈니스 자료 | - |

#### projects/webServer/ - 웹서버 프로젝트 (핵심)

| 폴더 | 설명 | 포트 | 상태 |
|------|------|:----:|:----:|
| `SensorMonitor/` | 센서 모니터링 서버 | 5000 | ✅ 운영 중 |
| `cert-guide/` | 자격시험 가이드 | 4000 | ✅ 운영 중 |
| `hw-c-edu-platform/` | C/ESP32 교육 플랫폼 | 3000, 3001 | ✅ 운영 중 |
| `device-info/` | 태블릿 시스템 정보 서버 | 8080 | ✅ 운영 중 |
| `device-info-pc/` | PC 시스템 정보 서버 | 8080 | ✅ 운영 중 |
| `snu-consulting/` | SNU 입시 컨설팅 | 8080 | 회사 Pi5 |

---

## 2. 문서/자료 디렉토리

### 작업보고서/ - 일일 작업 기록

| 파일 | 설명 |
|------|------|
| `YYYY-MM-DD_작업보고서.md` | 일일 작업 보고서 |
| `CLAUDE.md` | Claude Code 프로젝트 가이드 (자동 참조) |

### ec2/ - AWS EC2 서버 관리

| 파일 | 설명 |
|------|------|
| `EC2_접속정보.md` | EC2 인스턴스 접속 정보 |
| `서비스_상세정보.md` | 운영 중인 서비스 상세 |
| `자주쓰는_명령어.md` | EC2 관리 명령어 모음 |

### 공장자동화/ - 공장 자동화 프로젝트

| 파일/폴더 | 설명 |
|-----------|------|
| `데모사이트_링크.md` | 25개 데모 사이트 URL 모음 |
| `반도체설비업체/` | 반도체 업체 조사 자료 |
| `업체/` | 영업 대상 업체 목록 |
| `uttec소개/` | UTTEC 회사 소개 자료 |
| `NVIDIA_Jetson_*` | Jetson 개발 가이드 |

### 자격시험/ - 자격시험 가이드 콘텐츠

| 폴더 | 설명 |
|------|------|
| `ab_modify/` | 자격증별 페이지 (물류관리사, 무역영어 등) |
| `cert-guide-project/` | cert-guide 프로젝트 원본 |

---

## 3. 하드웨어/IoT 프로젝트

### SensorMonitor/ - 센서 모니터링 시스템

| 파일/폴더 | 설명 |
|-----------|------|
| `app/` | Android 앱 소스코드 |
| `server/` | Node.js 백엔드 서버 |
| `ec2-dashboard/` | EC2 대시보드 |
| `SENSORS.md` | 지원 센서 목록 |
| `CALIBRATION_GUIDE.md` | 센서 캘리브레이션 가이드 |

### raspberry/ - Raspberry Pi 자료

| 파일 | 설명 |
|------|------|
| `Raspberry_Pi_3B+_AI_개발_가이드.md` | AI 개발 가이드 |
| `Raspberry_Pi_AI_적용_프로젝트_검토보고서.md` | 프로젝트 검토 보고서 |
| `raspberry_esp32c3*.md` | ESP32-C3 연동 자료 |
| `커리큘럼/` | 교육 커리큘럼 |

### rftech/ - RFID/NFC 프로젝트

| 파일/폴더 | 설명 |
|-----------|------|
| `ESP32-RC522-RFID/` | ESP32 RFID 프로젝트 |
| `NFCReader/` | NFC 리더 앱 |
| `군대용_스마트충전기_*.md` | 스마트 충전기 제안서 |

---

## 4. 교육 콘텐츠

### aws/ - AWS 교육 플랫폼 콘텐츠

| 폴더 | 설명 |
|------|------|
| `c-esp32/` | C/ESP32 교육 과정 |
| `c-pc/` | C 프로그래밍 (PC) |
| `python-pc/` | Python 프로그래밍 |
| `beginner/` | 입문자 과정 |
| `career-change/` | 진로전환자 과정 |
| `parent/` | 학부모 과정 |
| `teacher/` | 교사 과정 |
| `math-suneung/` | 수능 수학 |
| `english-suneung/` | 수능 영어 |

### UTTEC-Edu/ - UTTEC 교육 콘텐츠

| 폴더 | 설명 |
|------|------|
| `코딩/` | 코딩 교육 |
| `영수코스/` | 영어/수학 코스 |
| `대학진학/` | 대학 진학 과정 |
| `사회초년생코스/` | 사회초년생 과정 |
| `진로전환자/` | 진로전환자 과정 |
| `학부형코스/` | 학부모 과정 |
| `교사교육자코스/` | 교사/교육자 과정 |

---

## 5. 기타 디렉토리

### aiWebSite/ - AI 웹사이트

| 폴더 | 설명 |
|------|------|
| `esp32_arduino/` | ESP32 Arduino 코드 |
| `pc_python/` | PC Python 코드 |

### ai영상/ - AI 영상 콘텐츠

| 폴더 | 설명 |
|------|------|
| `short/` | 숏폼 영상 |

### ffmpeg/ - 영상 처리 도구

| 파일 | 설명 |
|------|------|
| `ffmpeg-8.0.1-essentials_build/` | FFmpeg 실행 파일 |

### vrew/ - Vrew 영상 편집

Vrew AI 영상 편집 관련 자료

---

## 6. 주요 루트 파일

| 파일 | 설명 |
|------|------|
| `.env` | 환경변수 (API 키 등) |
| `.gitignore` | Git 제외 파일 목록 |
| `README.md` | 저장소 설명 |
| `uttec-first-ec2.pem` | AWS EC2 SSH 키 파일 |
| `Termux_SSH_동적IP_접속방법.md` | Termux SSH 접속 가이드 |
| `MainActivity_edit.kt` | Android MainActivity 수정본 |

---

## 7. 웹서버 배포 현황

### 현재 운영 중인 서버

| 위치 | IP | 서비스 | 포트 |
|------|-----|--------|------|
| Windows PC | 192.168.0.12 | SensorMonitor, cert-guide, edu-platform | 3000, 3001, 4000, 5000 |
| Lenovo TB310FU | 192.168.0.31 | 위와 동일 + Device Info | 3000, 3001, 4000, 5000, 8080 |
| Raspberry Pi 4 | 192.168.0.3 | hw-c-edu-platform | 3000, 3001 |
| Raspberry Pi 5 (회사) | 192.168.1.8 | SNU Consulting (ngrok) | 8080 |

### AWS EC2 (현재 접속 불가)

| 서버 | IP | 서비스 |
|------|-----|--------|
| sensor-ec2 | 3.36.86.100 | SensorMonitor |
| uttec-ec2 | 52.78.119.132 | cert-guide |

---

## 8. 자주 사용하는 경로

```bash
# 웹서버 프로젝트
C:/todo/today/projects/webServer/

# 작업보고서
C:/todo/today/작업보고서/

# 센서 모니터링
C:/todo/today/SensorMonitor/

# 자격시험 콘텐츠
C:/todo/today/자격시험/

# 공장자동화 데모
C:/todo/today/공장자동화/
```

---

## 9. Git 관리

```bash
# 저장소 URL
https://github.com/ihong9059/today.git

# 주요 브랜치
main

# 커밋 컨벤션
한글로 작성, 작업 내용 요약
```

---

*이 문서는 프로젝트 구조 이해를 돕기 위해 작성되었습니다.*
*최종 업데이트: 2026-01-18*
