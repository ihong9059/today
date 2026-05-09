---
title: oldProject (UTTEC 과거 프로젝트 아카이브)
type: entity
created: 2026-05-09
updated: 2026-05-09
tags: [아카이브, IP, 양산실적, 영업자산]
links: [ai-fanstick, 양산제품, 일본-시장, whybiz-tracker, 군사업, strengths, experience]
---

# oldProject

## 한 줄 정의
UTTEC가 과거 진행한 프로젝트 자료 큐레이션 아카이브. 과거 IP를 검색·재사용 가능한 영업·기술 자산으로 격상.

## 왜 중요한가
- [[strengths|강점]] "양산 실적 5종" 의 실제 PCB·BOM·회로도 근거
- [[ai-fanstick]] 특허 IP 의 백업 자료 (60건/200MB)
- 일본·군 시장 영업 시 **검증된 사례** 즉시 인용 가능
- 신규 프로젝트 시 회로도·BOM 재사용으로 개발 기간 단축

## 보관 위치
- **GitHub repo**: `ihong9059/oldProject` (private)
- URL: https://github.com/ihong9059/oldProject
- 로컬: `C:\todo\today\oldProject\` (today repo `.gitignore` 처리 — 별도 추적)
- 사이즈: 1,200 파일 / 574.6 MB

## 폴더 구조 (5분류)

### 태양광/ — 32 files / 26.4 MB
- ESS 중앙계약시장 정부 발표자료 2건 (2025년 1차)
- 인버터·BMS·배터리 비교 docx
- 전기설계도면.pdf (6.7MB) + 천장5호 도면.pdf (4.5MB)
- grid 다이어그램 9장 + 이격거리 정책 PNG 3장
- 관련업체·주요업체사이트 docx
- **활용**: 신규 ESS 사업 검토 시 시장·정책·벤더 즉시 참조

### 일본/도카이/ — 30 files / 50.4 MB ([[일본-시장]] 참조)
- 자전거 주차장 System pptx + 제어 시스템 pptx
- BLE Mesh re-mesh 설명 (KOR), 東海技研様 ご質問 v1·v2
- Solar Cell 적용 제안.pptx, gateway 일본어 PDF
- **타사제안서**: UTTEC_to_Patron_Proposal_Win365_20251023.pptx (10.4MB) + AI 생성 이미지 14장 (smart city/factory/logistics/farm — 재사용 자산)
- **활용**: 동해기연·Patron 일본 영업 트랙 진행 자료, 향후 일본 영업 baseline

### 일본/AMANO/ — 62 files / 12.5 MB ([[일본-시장]] 참조)
- AMANO 주차장 BLE Mesh System (nRF52832 기반)
- **PCB 최종**: pcb_0814/whybiz_amano_BOM/ — Gerber + Schematic + BOM + DXF
- 핵심부품 데이터시트: HFD2/SK6812/TQ2-3V/WS2812B
- 출장 보고 (2024-09-25) + AMANO Dimmer Setting
- 회로도 (amano + amano_주차장 변형)
- **활용**: [[양산제품|양산]] 6번째 — BLE Mesh nRF52832 일본 주차장 LED 제어 (3,800대 양산)

### rfTech/ — 815 files / 406.2 MB
- **응원봉/응원봉특허_now** (60 files / 200 MB) — [[ai-fanstick]] IP 특허 백업
- **군대_충전기** (211 files / 61 MB) — RTC + RFID + spec + 회로도 ([[군사업]])
- **ITM-G3_Program** (433 files / 47 MB) — 군 통신기 RF 테스트 ([[군사업]])
- **다이소 Project** (71 files / 58 MB) — STM32C071 + ESP32/8266 실험 코드
- 루트: NUCLEO-c071rb / nRF52840 dongle 공식 schematic 참조용
- 소형: rfid·wsn·자료·지뢰감시센서·학교충전기·함상통신기·센서개발

### whybiz/ — 253 files / 78.4 MB ([[whybiz-tracker]] 참조)
- **tracker_final** (143 files / 88 MB) — GPS Tracker 최종 (EG915U LTE + KG200Z Zigbee + LG77L LoRa)
- ESP32_C6, lora, modbus, sensorModule, mother_module IO Board
- GPS_tracker거버pdf, module거버pdf, mother거버pdf — Gerber 출력
- **활용**: IoT GPS 추적 시스템 솔루션 IP (LoRa·Modbus·BLE Mesh 통합)

### 회로도/ — 8 files / 0.7 MB
- nrf52832 rack/sink, nrf52840 rack/sink/21540_sink, bleModule, setup포함
- whybiz_module
- **활용**: BLE Mesh / nRF52 신규 설계 시 회로도 즉시 재사용

## 큐레이션 정책 (2026-05-09)

원본 다운로드 폴더 기준 다음 기준으로 선별 복사:
- ✅ **포함**: UTTEC IP, 벤더 자료, 기술 레퍼런스, 제안서 본문
- ❌ **제외**: 외부 공개 자료 (WeAct Studio GitHub, ABOV Example_Code, Quectel Qnavigator), 명백한 중복 (PCB BOM 버전 + non-BOM 동일 폴더), 시연 영상 추정 ppt 247MB
- ⚠️ **응원봉**: today repo `응원봉/특허/`와 중복 위험 → `_now` 버전만 보존

## 검색 키워드 (위키 검색용)
- 양산: AMANO, 주차장 LED, BLE Mesh, nRF52832
- 일본 영업: 도카이, 동해기연, Patron, 자전거주차장
- 군: ITM-G3, 군대충전기, 함상통신기, 지뢰감시센서, RF Test
- 응원봉: 응원봉특허, AI FanStick, K-POP
- IoT: whybiz, GPS Tracker, LoRa, Modbus, EG915U, KG200Z
- 회로도: nrf52832, nrf52840, schematic, BOM, Gerber

## 관련 페이지
- [[strengths]]: 양산·IP 누적의 실제 자료
- [[ai-fanstick]]: 응원봉 특허 IP 백업 (rfTech/응원봉/응원봉특허_now)
- [[양산제품]]: AMANO BLE Mesh 일본 3,800대 양산 사례 추가 근거
- [[일본-시장]]: 도카이 + AMANO + Patron 영업 트랙
- [[whybiz-tracker]]: GPS Tracker IoT IP
- [[군사업]]: 군대충전기 + ITM-G3 군 시장 진입 IP
- [[experience]]: 과거 프로젝트 누적 경험
