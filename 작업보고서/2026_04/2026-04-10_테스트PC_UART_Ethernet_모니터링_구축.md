# 테스트 PC 구축 가이드 — UART / Ethernet 모니터링 전용기

**작성일**: 2026-04-10
**대상 장비**: 삼성 넷북 (UTSOL-PC)
**사양**: Intel Atom N2100 @ 1.60GHz / RAM 2.00GB / 32bit / Windows 7 Ultimate K SP1
**목적**: 공장 초기화 후 UART + Ethernet 모니터링 전용 테스트 장비로 활용

---

## 1. 공장 초기화 (삼성 넷북 Recovery)

삼성 넷북은 **Samsung Recovery Solution** 이 숨겨진 복구 파티션에 있음.

### 절차

1. PC 완전히 종료
2. 전원 ON 직후 **F4** 연타 (삼성 로고 나오기 전)
3. Samsung Recovery Solution 진입
4. **"복원" → "전체 복원" → "공장 초기 상태"** 선택
5. 30~60분 대기 → Win7 초기 상태로 복구

### 주의사항

- F4 안 먹으면 BIOS에서 Recovery 활성화 확인 (일부 모델은 F11)
- C 드라이브 전체 삭제되므로 **백업 먼저**
- Recovery 파티션까지 날아갔으면 → Win7 ISO + 정품키(하판 스티커) 필요

---

## 2. 초기화 후 필수 작업 순서

```
① Windows Update 끄기 (SP1 이후 업데이트 무한로딩 방지)
② 불필요 기본 프로그램 제거 (Norton 체험판, 삼성 유틸 등)
③ 전원 옵션 → "고성능" + 절전/화면끄기 "사용 안 함"
④ 절전모드/최대절전 OFF (상시 모니터링 목적)
⑤ 자동 로그인 설정 (netplwiz)
⑥ 고정 IP 설정 (Ethernet 모니터링 편의)
```

---

## 3. 설치할 소프트웨어

### 3.1 USB-Serial 드라이버 (3종 모두 설치)

| 칩셋 | 다운로드 | 비고 |
|---|---|---|
| **FTDI** (FT232) | ftdichip.com/drivers/vcp-drivers | 가장 흔함 |
| **Silicon Labs CP210x** | silabs.com | ESP32 개발보드 대부분 |
| **CH340/CH341** | wch.cn | 중국산 저가 보드 |
| **Prolific PL2303** | (정품만) | 짝퉁 많음 주의 |

### 3.2 UART 터미널 (3개 병행 추천)

| 프로그램 | 용도 | 라이선스 |
|---|---|---|
| **Tera Term** | 메인 터미널, 로그 자동 저장, 매크로 | Free |
| **RealTerm** | HEX/바이너리 덤프, 타임스탬프, Modbus RTU 캡처 | Free |
| **PuTTY** | 간단 세션, SSH 병행 | Free |
| *(옵션)* **Hercules** | TCP/UDP + Serial 겸용 테스트 | Free |

**Tera Term 설정 팁**: Setup → Terminal → "Auto-save log" 체크 → 날짜 포맷 `%Y%m%d_%H%M%S.log`

### 3.3 Ethernet / 네트워크 모니터링

| 프로그램 | 용도 |
|---|---|
| **Wireshark** (Win7 지원 마지막 = **3.6.x LTS**) | 패킷 캡처, Modbus TCP/EtherCAT 디섹터 포함 |
| **Npcap** (Wireshark 설치 시 포함) | 패킷 캡처 드라이버 |
| **TCPView** (Sysinternals) | 실시간 연결 상태 |
| **Nmap** | 네트워크 스캔 |
| **Hercules SETUP** | TCP/UDP Client/Server 테스트 송수신 |
| **Modbus Poll / Modbus Slave** | Modbus TCP/RTU 마스터/슬레이브 시뮬레이터 (유료/체험판) |
| **PingPlotter Free** | 장시간 핑 그래프 |

> **EtherCAT 모니터링은** Wireshark 3.6 + EtherCAT 디섹터로 프레임 구조 확인 가능. 단, 실시간 타이밍 분석은 Beckhoff ET2000 급 장비 필요.

### 3.4 기타 유용 도구

- **7-Zip** — 압축
- **Notepad++** — 로그 파일 뷰어 (대용량 OK)
- **WinSCP** — 리눅스 보드와 파일 전송
- **VNC Viewer / TeamViewer 11** (Win7 마지막 지원 버전) — 원격 접속
- **Process Explorer** (Sysinternals) — 리소스 모니터

---

## 4. 물리적 구성 추천

```
┌─────────────────────────────────────┐
│ 삼성 넷북 (UTSOL-PC, Win7)          │
│   ├─ USB Hub (7포트, 전원 공급형) ──┼─ USB-Serial × 4
│   │                                  │   ├─ STM32 UART1 (로그)
│   │                                  │   ├─ STM32 UART2 (디버그)
│   │                                  │   ├─ ESP32 UART
│   │                                  │   └─ Modbus RTU (RS485)
│   └─ Ethernet ─── 허브 ──────────────┼─ EtherCAT/Modbus TCP 노드
└─────────────────────────────────────┘
```

### 하드웨어 추가 구매 추천

- **전원 공급형 USB 허브** (FTDI 다수 연결 시 전류 부족 방지)
- **USB-RS485 컨버터** (Modbus RTU 스니핑용, FTDI 기반)
- **이더넷 미니 허브 or TAP** (Wireshark 캡처 시 promiscuous 모드)

---

## 5. 초기화 전 체크리스트

- [ ] 정품 키 확인 (배터리 아래 또는 하판 COA 스티커)
- [ ] 드라이버 백업 (DoubleDriver 등) — Recovery 실패 대비
- [ ] 기존 C 드라이브 개인 파일 백업
- [ ] Recovery 파티션 존재 확인 (디스크 관리에서 숨김 파티션 20GB 전후)
- [ ] AC 어댑터 연결 (복구 중 전원 끊기면 벽돌)

---

## 6. 권장 작업 순서

1. **백업**
2. **F4 Recovery 진입** → 공장 초기 상태 복원
3. **Windows Update 끄기**
4. **USB-Serial 드라이버 3종 설치** (FTDI / CP210x / CH340)
5. **Tera Term + RealTerm + PuTTY 설치**
6. **Wireshark 3.6.x LTS + Npcap 설치**
7. **Hercules + Modbus Poll 설치**
8. **고정 IP + 자동 로그인 설정**
9. **테스트 송수신 확인** (Loopback RX-TX / 핑 / 캡처)

---

## 7. 활용 시나리오

### 시나리오 A — Xerix MFC 개발
- STM32F429ZI UART 로그 상시 모니터링 (Tera Term 로그 자동 저장)
- EtherCAT 프레임 캡처 (Wireshark)
- Modbus RTU 패킷 스니핑 (RealTerm HEX)
- RS232/RS485 명령 송수신 테스트

### 시나리오 B — ESP32 / REVITA
- ESP32-C3 BLE OTA 로그 모니터링
- REVITA 디버그 UART 로그 수집
- 장시간 테스트 (24시간 상시 가동)

### 시나리오 C — 네트워크 디버깅
- Modbus TCP 트래픽 분석
- EtherCAT 프레임 구조 확인
- TCP/UDP 통신 테스트 (Hercules)

---

## 8. 제약 사항

| 항목 | 내용 |
|---|---|
| CPU | Atom N2100 = 2코어, 64bit 미지원 → 32bit OS 고정 |
| RAM | 2GB → GUI 최소화, 동시 실행 프로그램 제한 |
| Win7 | 보안 패치 종료 → **외부망 연결 금지**, 내부망/사내망만 |
| USB | USB 2.0 only → USB-Serial은 OK, 고속 캡처카드는 불가 |
| Wireshark | 최신 버전 불가 → 3.6.x LTS 고정 |

---

## 참고

- 메인 작업용 PC와 분리하여 **모니터링 전용기**로만 운용
- 외부 인터넷 연결 없이 **사내망/테스트망**에만 접속
- 장시간 로그 수집 후 USB 또는 SMB 공유로 메인 PC 이관
