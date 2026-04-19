---
title: aiHardStudy (바이브 코딩 교육 코드베이스)
type: entity
created: 2026-04-19
updated: 2026-04-19
tags: [프로젝트, 코드, 교육, 임베디드, 핵심]
---

# aiHardStudy (바이브 코딩 교육 코드베이스)

## 한 줄 정의
[[사전빌드]], [[python-vibe]], 그리고 모든 하드웨어 교육 시스템의 **메인 소스 코드 저장소**. 약 48,000개 파일.

## 왜 중요한가
이 저장소가 UTTEC 교육 사업의 **기술적 핵심**. 클라우드 서버, 펌웨어, 앱, 웹 UI가 모두 여기에 있다.

## 구조
| 폴더 | 용도 | 연결 |
|------|------|------|
| `cloud/` | 프로덕션 서버: 빌드 서버, 웹 UI, Nginx | [[서버인프라]] |
| `firmware/` | ESP32 펌웨어 (Arduino, ESP-IDF legacy) | [[사전빌드]] |
| `smartphone/` | Flutter 앱 + Python Vibe | [[python-vibe]] |
| `hardware/` | 보드 사양, 하드웨어 문서 | [[skills]] |
| `사전빌드/` | 사전빌드 시스템 (Flutter앱, DB, 카탈로그 100개) | [[사전빌드]] |
| `사전빌드_mini/` | C3 Mini 버전 (117개) | [[사전빌드]] |
| `aiPython/` | Python 교육 변형 | [[uttec-edu]] |
| `aiS3/` | ESP32-C6-LCD 프로젝트 | [[goals]] |
| `aiEspMini/` | ESP32-C3 SuperMini | [[사전빌드]] |
| `aiGeneral/` | AI Ask 서비스 | [[claude-code]] |

## 프로덕션 서버
- IP: 178.128.90.37
- 도메인: uttec-ai.duckdns.org
- 서비스: Arduino 빌드, 웹 UI, Nginx SSL

## 핵심 기술
- FastAPI (Python) + arduino-cli + Claude CLI
- Flutter (모바일 앱)
- NimBLE (BLE OTA)
- Nginx + Let's Encrypt
- systemd + Cloudflare Tunnel

## 관련 페이지
- [[me]]: 핵심 프로젝트
- [[사전빌드]]: 사전빌드 시스템 상세
- [[python-vibe]]: Python Vibe 상세
- [[uttec-edu]]: 교육 플랫폼
- [[claude-code]]: AI 코드 생성
- [[서버인프라]]: 배포 인프라
- [[skills]]: 전체 기술 스택
- [[projects]]: 프로젝트 맵
