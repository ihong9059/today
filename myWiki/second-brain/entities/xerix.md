---
title: Xerix MFC Controller
type: entity
created: 2026-04-19
updated: 2026-04-19
tags: [프로젝트, 산업, EtherCAT, 제안]
links: [experience, projects, skills, 스마트팩토리, 양산제품, 위시캣활동]
---

# Xerix MFC Controller

## 한 줄 정의
EtherCAT 기반 MFC(Mass Flow Controller) 제어 보드 + 펌웨어 개발 프로젝트. 제안가 4,970만원.

## 현재 상태
- 기술 검토 완료 (문서 6건)
- 제안서 v1.0 발송 (2026-04-09)
- 회신 대기 중

## 기술 구성
- EtherCAT (LAN9252 / ET1100)
- STM32F429ZI (사용자 결정: H723 권장 → F429 확정)
- PID 제어 (가스 유량)
- Coriolis/Piezo 센서

## 핵심 판단
| 판단 | 근거 |
|------|------|
| MCU: F429 확정 | F4 개발 리소스 풀이 가장 두터움 |
| 가격: 1.42억→4,970만원 | 스마트팩토리 시장 진입 레퍼런스 확보 목적 |

## 코드베이스 (C:/todo/today/xerix/)
- 35개 파일
- 제안서 v1.0 (48KB) + 개발계획서 v2.1 (59KB)
- PID 제어 비교 분석 (45KB)
- 응답시간 0.1초 이하 달성 난이도 분석
- EtherCAT ESC 비교, STM32 계열 비교
- 제안 영상 KO/EN (154MB/161MB)

## 상세 기술
- **3보드 모듈 구조**: 메인보드(STM32F4) + 통신보드(EtherCAT/RS485/DeviceNet) + 센서보드
- **3프로토콜 지원**: PIO + RS485, DeviceNet, EtherCAT (DIP 스위치 전환)
- **센서**: Thermal + Coriolis 이중 유량 감지
- **밸브**: Piezo Stack (프리미엄) + Solenoid (표준)
- **응답 시간**: ≤300ms (프리미엄 <150ms)
- **PCB**: 110×70mm, OrCAD/Allegro 설계

## 관련 페이지
- [[projects]]: 프로젝트 맵
- [[skills]]: EtherCAT, STM32, PID 제어
- [[experience]]: 산업 자동화 경험
- [[위시캣활동]]: 프리랜서 영업 활동
- [[양산제품]]: STM32/RPi 양산 경험 활용
- [[스마트팩토리]]: 산업 AI 관련
