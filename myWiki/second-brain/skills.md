---
title: 기술 스택 인벤토리
type: skill
created: 2026-04-19
updated: 2026-09-04 (Legacy Retrofit·IDE→SSD 이미징 + 디스플레이 4종(LVDS·TTL/RGB·VGA·DVI) 등재 — wishket #158166 계기 사용자 확인 자산, 카드 `2026-09-04-001` 흡수)
tags: [기술, 역량]
links: [me, projects, ai-direction, strengths, gaps]
---

# 기술 스택 인벤토리

## 임베디드/하드웨어 (핵심 강점, 38년 경력)
| 기술 | 수준 | 활용 프로젝트 | 사용 빈도 |
|------|------|--------------|----------|
| ESP32 (WROOM, C3, C6) | 상 | 사전빌드, aiS3, FanStick | 매우 높음 |
| Arduino-CLI / PlatformIO | 상 | 펌웨어 빌드 자동화 | 매우 높음 |
| STM32 (F4, F7, H7) | 상 | 컴프레서/세탁기 컨트롤러 (양산) | 과거 양산 |
| BLE (NimBLE, nRF52832) | 상 | OTA, 온도 컨트롤러 (양산) | 높음 |
| **BLE OTA 농가 자가 업데이트 (SMP/mcumgr/MCUboot)** | 중상 | revita link_v2 실구현 — 스마트폰 앱 + 검증 대시보드 + 속도 기준선 (MTU252 / 1.2KBps / 235KB≈3분). field 사용자가 직접 폰으로 펌웨어 OTA (ingest #16, 2026-06-13 박제) | 신규(2026-06) ★ |
| **임베디드 무선 암호화 통합 (TinyCrypt AES-128)** | 중 | revita LoRa 평문 → 암호화 전환 (keystream XOR + packet_id nonce 설계). 양산 보안 baseline. AEAD·키 프로비저닝 carry → [[gaps]] § 2026-06-13 | 신규(2026-06) |
| Raspberry Pi (3B/4/5/CM4/Zero) | 상 | EtherCAT (양산), 서버, 교육 | 높음 |
| MQTT/RS485/Modbus RTU | 상 | 산업 통신, KC 인증 | 높음 |
| **nRF52832 USB 시리얼 통신 (USB CDC ACM) + 연동 모바일 앱** | 상 | **수년간 직접 구현 + 연동 앱 다수 제작 (Android USB Host API / UsbSerialForAndroid 통합). 펌웨어 측 CDC ACM + 모바일 측 시리얼 표준 자산 (2026-05-21 박제 — wishket-claude 지원서 작성 중 누락 발견 후 사용자 정정 지시로 정식 등재)** | 활성 |
| CAN 통신 | 중상 | 대한전선 Winder Controller | 과거 |
| **산업용 PC / Legacy System Retrofit** | 상 | 노후 장비 현대화 직접 수행 — **IDE HDD→SSD 섹터 이미징 + 레거시 BIOS 부팅 유지** 실적 포함 (2026-09-04 박제, #158166 계기 사용자 확인. 구체 제품명·수치 확보 시 상세화) | 활성 ★ |
| **디스플레이 인터페이스 4종 (LVDS·TTL/RGB·VGA·DVI)** | 상 | 전 인터페이스 실개발 (2026-09-04 박제, #158166 계기 사용자 확인) — LCD 교체·레거시 패널 대체 외주 정조준 | 활성 ★ |
| LoRa/Zigbee | 중상 | REVITA, IoT 통신, **[[한림용인cc-고가수조]] (2026-05 시공 직전, 1,000만원)** | 활성 |
| LoRa E22 EByte 920MHz 풀스택 | 중상 | [[한림용인cc-고가수조]] 노드·중계기·게이트웨이 / oldProject bleModule (config read/write 검증·mode mapping 정정·air rate 0.3k 통일) | 신규(2026-05) |
| **LoRa 4종 모듈 풀스택 + 자율 제어망 프로토콜** | 중상 | [[lora]] vault — E22-400/900·E32-433/915 (2칩 패밀리 SX126x/SX127x × 2대역) TX/RX 전부 + 칩별 config 단일 출처 + 8B frame 자율 제어망(단일채널·1B 주소·일일 sync TDMA) 실보드 송수신 무손실 실증 + nRF52832 SAADC 배터리 절대측정. SPI(E22-M/E19)+Zephyr 전환 carry | 신규(2026-06) ★ |
| 수위센서 + 펌프제어 무선 | 중 | [[한림용인cc-고가수조]] 압력센서 + 임계값 + LoRa 명령 + 펌프 ON/OFF (응답 3~5초) | 신규(2026-05) |
| **원격 모니터링 풀스택 (Flask+pyserial+Chart.js+systemd)** | 중상 | revita Solar Monitor 운영 (5분 평균·data.json 영속화·Chart.js 로컬·Y축 고정·Serial Log·systemd 자동 실행). [[한림용인cc-고가수조]] / 농업·양식 등 확장 가능. 사업 라인: [[2026-05-12_원격모니터링-사업라인]] | 신규(2026-05) ★ |
| Linux systemd 서비스 운용 | 중 | revita Solar `solar-monitor.service` — 자동 실행·재시작·로그 통합 (현장 배포 안정성) | 활성 |
| Web UI 오프라인 배포 (정적 자원 로컬 호스팅) | 중 | Chart.js / fonts / icons 로컬 호스팅 정책 — 현장 인터넷 불안정 대응 | 신규(2026-05) |
| CC1101 Sub-GHz / OOK Replay (433~447MHz) | 중상 | remocon 데모 + OOK Replay 10버튼 디코딩 (REVITA, 2026-05) | 신규 |
| AISG 3.0 (안테나 인터페이스 — HDLC + RS-485/OOK PHY) | 분석 완료 | 위시캣 #155057 ([[aisg]]) | 분석 |
| Jetson Nano/CUDA | 중 | AI 추론, 비전, 교육 | 간헐 |
| ODROID C2 | 중 | 원격 빌드 서버 | 최근 구축 |
| Luckfox (RISC-V) | 초중 | revita 프로젝트 | 탐색 중 |
| EtherCAT (LAN9252) | 중 | Xerix MFC, CM4 컨트롤러 | 간헐 |

## 모바일
| 기술 | 수준 | 활용 프로젝트 | 사용 빈도 |
|------|------|--------------|----------|
| Flutter/Dart | 중상 | 사전빌드 앱 4개, Python Vibe | 매우 높음 (4월~) |
| Android Kotlin/Compose | 중 | FanStick, SensorMonitor, 영업관리 | 감소 (Flutter 전환) |

## 서버/백엔드
| 기술 | 수준 | 활용 프로젝트 | 사용 빈도 |
|------|------|--------------|----------|
| Python (Flask/FastAPI) | 상 | 빌드 서버, AI 통합, 웹앱 다수 | 매우 높음 |
| Node.js/Express | 중상 | 영업관리, 학습 앱, 데모 사이트 | 높음 |
| Java/Spring | 중 | 기존 프로젝트 | 과거 |

## 프론트엔드/웹
| 기술 | 수준 | 활용 프로젝트 | 사용 빈도 |
|------|------|--------------|----------|
| Next.js/React/TypeScript | 중상 | ai-education-web, UTTEC 홈페이지 | 높음 |
| HTML/CSS/JavaScript | 상 | 데모 사이트, 전시 웹서버, 웹앱 | 매우 높음 |
| Three.js | 중 | 공장자동화 3D 모니터링 25개 | 간헐 |
| Tailwind CSS | 중 | UTTEC 홈페이지 | 최근 도입 |

## AI/ML
| 기술 | 수준 | 활용 프로젝트 | 사용 빈도 |
|------|------|--------------|----------|
| Claude Code/CLI 활용 | 상 | 전 프로젝트 (Skill 시스템 구축) | 매일 |
| LLM API (Claude, GPT, Gemini, Groq) | 중상 | 챗봇 4종, FanStick AI, 코드 생성 | 높음 |
| EasyOCR/Tesseract | 중상 | 번호판 인식 (90% 인식률) | 완료 |
| PyTorch/CNN | 중 | MNIST(99.32%), 볼트 검사(100%) | 교육용 |
| YOLO | 중 | 번호판 검출 | 교육용 |
| MobileNetV3 | 중 | 볼트 품질검사 AI | 완료 |
| Google Colab | 중 | 시계열 분석 노트북 13개+ | 간헐 |
| Memory MCP (지식 그래프) | 중상 | second-brain 30+ entity, 12 entities/20 relations 시드, JSONL 영구 저장 | 매일 |
| Palantir Foundry Ontology | 학습 완료 | 시리즈 3편 (객체+액션 4단계 End-to-End) | 분석 |

## 영상/콘텐츠 제작
| 기술 | 수준 | 활용 프로젝트 | 사용 빈도 |
|------|------|--------------|----------|
| Remotion | 상 | 교육 비디오 30편+ | 높음 |
| edge-tts | 상 | TTS 내레이션 (한/영) | 높음 |
| FFmpeg | 중 | 영상 압축/변환 | 간헐 |

## 인프라/DevOps
| 기술 | 수준 | 활용 프로젝트 | 사용 빈도 |
|------|------|--------------|----------|
| Git/GitHub | 상 | 전체 (6개 repo 분리 관리) | 매일 |
| SSH/SCP/Tailscale | 상 | 원격 관리 (6대+ 장비) | 매일 |
| Nginx + SSL (Let's Encrypt) | 중상 | 5개+ 도메인 HTTPS | 높음 |
| PM2 | 중상 | 프로세스 관리 (DO, RPi) | 높음 |
| Digital Ocean | 중상 | 주 서버 배포 | 높음 |
| AWS EC2 | 중 | 보조 서버 | 간헐 |
| DuckDNS | 중상 | 동적 DNS (5개+ 도메인) | 높음 |
| Docker | 중 | Pi5 마이그레이션 | 간헐 |
| Cloudflare Tunnel | 중 | 원격 SSH | 간헐 |

## 문서/도구
| 도구 | 용도 | 사용 빈도 |
|------|------|----------|
| Claude Code | 핵심 개발 도구 (코딩, 문서, 자동화) | 매일 |
| n8n (Docker self-host) | 워크플로우 자동화 — Telegram polling 표준·Gmail·Schedule cron, Tailscale-only 환경 통합 패턴 (n8nUttec vault) | 주간 |
| Markdown | 문서/보고서/제안서 | 매일 |
| Playwright | HTML→PDF 변환 | 간헐 |
| NotebookLM | 리서치/학습 | 간헐 |

## 양산 제품 (5개 운영 중)
1. STM32F756 컴프레서 밸브 컨트롤러
2. STM32F407 세탁기 컨트롤러
3. Raspberry Pi CM4 EtherCAT 컨트롤러
4. Raspberry Pi 3 V-Cut 컨트롤러
5. nRF52832 BLE 온도 컨트롤러

## 수준 기준
- **상**: 실전 프로젝트 다수 완료, 양산/배포 경험, 문제 해결 자립
- **중상**: 실전 경험 있음, 대부분 자립
- **중**: 기본 활용 가능, 복잡한 문제는 도움 필요
- **초중**: 학습 중, 기초 수준

## 관련 페이지
- [[me]]: 핵심 정체성
- [[projects]]: 기술이 활용되는 프로젝트들
- [[ai-direction]]: 기술 투자 방향 판단
- [[strengths]]: 강점 분석
- [[gaps]]: 부족한 부분
