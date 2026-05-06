---
title: 기술 스택 인벤토리
type: skill
created: 2026-04-19
updated: 2026-04-19
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
| Raspberry Pi (3B/4/5/CM4/Zero) | 상 | EtherCAT (양산), 서버, 교육 | 높음 |
| MQTT/RS485/Modbus RTU | 상 | 산업 통신, KC 인증 | 높음 |
| CAN 통신 | 중상 | 대한전선 Winder Controller | 과거 |
| LoRa/Zigbee | 중 | REVITA, IoT 통신 | 간헐 |
| CC1101 Sub-GHz (433MHz) | 중 | remocon 데모 (pca10056+HW-863) | 신규 |
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
