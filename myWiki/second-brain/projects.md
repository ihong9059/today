---
title: 프로젝트 맵
type: project
created: 2026-04-19
updated: 2026-04-19
tags: [프로젝트, 현재, 과거, 계획]
links: [me, skills, goals, experience]
---

# 프로젝트 맵

## 현재 진행 중 (Active)

### 사전빌드 교육 시스템 (핵심)
- **WROOM**: 155개 항목 빌드 완료, OTA 안정화
- **Mini (C3)**: 117개 항목 빌드 완료
- **C6-LCD**: 105개 항목 빌드 완료 (16카테고리), SD 카드 SDLOAD 파이프라인 완성 (앱→BLE→SD→플래시), 소스코드 표시/서버 URL 설정 미완
- **구조**: Flutter 앱 + Python 빌드 서버 + 웹 UI
- **포트**: 8095(WROOM), 8096(Mini), 8097(C6-LCD build), 8098(C6-LCD prebuilt), 8092(WROOM 커스텀), 8093(Mini 커스텀)
- **과제**: 동시 빌드 문제 해결 필요 (교육 현장 대비)

### Python Vibe 교육앱
- 100개 예시 (10개 카테고리 × 10개), 4탭 구조
- AI 코드 생성 + 실행 + 설명 통합
- 서버: Python sandbox 실행, Claude CLI 연동 (포트 8094)
- 선생님용/학생용 사용설명서 완성

### AI 교육 웹 (ai-education-web)
- Level 0~9 커리큘럼 (765일 분량)
- Remotion 기반 레슨 비디오 30편+
- Google Analytics + YouTube Analytics 관리
- DigitalOcean 배포 운영 중

### UTTEC 홈페이지
- Next.js 14 + Tailwind + TypeScript
- 14개 사례연구 페이지
- 회사소개서 4종
- DigitalOcean 포트 7777 배포

### 프리랜서/위시캣
- 2~4월간 16건+ 지원, 주간 정기 검토 (총 328건+)
- **수주 진행 중**: #153090 nRF52 스마트팜 펌웨어 (주 3회 방문, 월 500만원)
- 임베디드/IoT/펌웨어 프로젝트 타겟
- 지원서 품질 지속 향상 (2월 단순→4월 아키텍처+갭분석 포함)

### multiCore Claude 교육 시스템
- Odroid C2에서 3명 동시 Claude Code 사용 검증 완료 (2026-04-26)
- SSH 직접 접속 방식 확정 (ttyd 웹 터미널 비호환 → 폐기)
- student1~3 계정 + /opt/claude-education 웹서버 구축
- AWS EC2 스케일업 계획 수립 (20명 → c7g.8xlarge)
- 미해결: taskset alias, credentials cron, cgroups 리소스 제한
- 상세 문서 9개 작성 완료 (multiCore/ 폴더)

### 중소기업육성회 Pi 교육
- 중소기업 종업원 대상 Raspberry Pi 공장자동화 + AI 교육 의뢰
- 커리큘럼 3종 작성 완료 (교육과정 비교 개요, 대면 5일 과정, 원격 8주 과정)
- 키트: Pi 4B + 자체 Shield(센서6종+릴레이+모터+OLED) + Camera (185,000원/세트)
- AI: 이상탐지(Isolation Forest) + 비전검사(OpenCV) + AI API(Claude/GPT)
- **출석체크 인증 시스템 구축 완료** (2026-05-01): Flask 웹 서버 + Claude Hook 기반 접속 제어, 출석부 관리, 교육 종료 시 자동 삭제
- 협의 진행 예정

### REVITA
- RAK4630 펌웨어 (Zephyr RTOS)
- LoRa 프로토콜 v2 (16B 통일)
- KC RS485 Modbus RTU 인증 프로토콜
- 회로도/핀매핑 업데이트

## 완료 / 운영 중 (Completed)

### AI FanStick (응원봉)
- 시장조사 → MVP (ESP32-C3+BLE+Android+FastAPI) → 특허 출원
- 블루오션 확인 (기존 응원봉에 AI 통합 제품 없음)
- 텍스트 입력 + WebSocket 재연결 + 사용설명서 v2.1

### 스마트팩토리 데모/영업
- 3D 센서 모니터링 데모 사이트 25개 (Three.js)
- uttec-sensor.duckdns.org 운영 중
- 파쇄기 AI 제안서 (85억, ROI 4.9개월)
- 21개 기업 예지정비 제안서
- **한국기계 AI 업무효율화 계획서** 완성 (Obsidian+Claude+Notion 기반, md+html+pdf)
- **태명과학 AI 업무효율화 계획서** 완성 (부속품 호환 DB 중심, md+html+pdf)

### Xerix MFC Controller
- EtherCAT 기술 검토 (문서 6건)
- 제안서 v1.0 발송 (4,970만원), 회신 대기

### AI OCR/번호판 인식
- EasyOCR 기반, 6개 플랫폼 벤치마크
- 1.94초/장, 90% 인식률
- 볼트 품질검사 AI (MobileNetV3, 재현율 100%)

### RaspShield
- RPi 확장 보드 (10개 HW 모듈)
- Flask 웹앱 (REST + WebSocket)
- Pi Zero W 배포

### 서버 인프라
- DigitalOcean (주 서버) + AWS EC2 (보조)
- Nginx + SSL 5개+ 도메인
- RPi5 백업 서버, ODROID C2 Claude Code 설치

### 영어 학습 웹앱
- 단어 (포트 7070), 다국어 (7071), 여행회화 (10001)

### 세주FA/UTTEC 영업관리
- Android 앱 + Express 서버 + 대시보드

## 탐색/학습 중
- Claude Design 학습
- CUDA/딥러닝 심화 (Jetson Nano)
- Luckfox (RISC-V) 활용
- MCP 서버 개발

## 지속 이월 항목 (주의)
- Pi B3 Docker 환경 구성 (19일+ 이월)
- 회사소개서 최종 확정
- Notion MCP 연동
- Google Play 배포 준비

## 관련 페이지
- [[me]]: 핵심 정체성
- [[skills]]: 프로젝트에 사용된 기술
- [[goals]]: 프로젝트가 향하는 목표
- [[experience]]: 프로젝트에서 축적된 경험
