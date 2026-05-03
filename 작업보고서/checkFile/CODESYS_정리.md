# CODESYS (COntroller DEvelopment SYStem) 정리

PLC 프로그래밍을 위한 IEC 61131-3 표준 기반 개발 환경.

---

## 기본 정보

| 항목 | 내용 |
|------|------|
| 개발사 | CODESYS GmbH (독일, 3S-Smart Software Solutions) |
| 표준 | IEC 61131-3 |
| 라이선스 | IDE **무료**, 런타임은 유료/하드웨어 번들 |
| 특징 | 하드웨어 독립적 소프트 PLC 플랫폼 |
| 지원 제조사 | 400+ (Beckhoff, WAGO, ABB, Schneider 등) |

---

## IEC 61131-3 지원 언어 (6가지)

| 언어 | 유형 | 설명 |
|------|------|------|
| **LD** (Ladder Diagram) | 그래픽 | 전기 회로도 형태 |
| **FBD** (Function Block Diagram) | 그래픽 | 기능 블록 연결 방식 |
| **SFC** (Sequential Function Chart) | 그래픽 | 순차 공정 제어, 상태 머신 |
| **ST** (Structured Text) | 텍스트 | Pascal/C 유사 문법, 가장 유연 |
| **IL** (Instruction List) | 텍스트 | 어셈블리 유사 (현재 비권장) |
| **CFC** (Continuous Function Chart) | 그래픽 | FBD의 자유 배치 버전 (CODESYS 확장) |

---

## 아키텍처

```
┌─────────────────────────────────┐
│  CODESYS IDE (개발환경, 무료)      │  ← PC에서 프로그래밍
│  - 코드 작성 (ST, LD, FBD 등)     │
│  - 시뮬레이션 / 디버깅             │
│  - 시각화 (HMI) 설계              │
└──────────────┬──────────────────┘
               │ 다운로드
               ▼
┌─────────────────────────────────┐
│  CODESYS Runtime (런타임)         │  ← PLC/임베디드 보드에서 실행
│  - 실시간 태스크 스케줄링           │
│  - I/O 드라이버                   │
│  - 필드버스 통신                   │
└─────────────────────────────────┘
```

---

## 주요 기능

| 기능 | 설명 |
|------|------|
| 소프트 PLC | 일반 PC/임베디드 보드를 PLC로 변환 |
| 모션 제어 | CNC, 로봇 제어 라이브러리 |
| WebVisu | 웹 브라우저 기반 HMI 화면 |
| OPC UA | 산업 표준 통신 프로토콜 내장 |
| EtherCAT | 실시간 필드버스 마스터 지원 |
| CANopen | CAN 기반 통신 지원 |
| MQTT/HTTP | IoT 연동 |
| Git 연동 | 버전 관리 |

---

## 지원 필드버스/통신 프로토콜

| 프로토콜 | 용도 |
|----------|------|
| EtherCAT | 고속 실시간 I/O |
| PROFINET | Siemens 호환 |
| EtherNet/IP | Allen-Bradley 호환 |
| CANopen | CAN 기반 장치 |
| Modbus TCP/RTU | 범용 산업 통신 |
| OPC UA | 상위 시스템 연동 |
| MQTT | IoT/클라우드 |

---

## CODESYS를 사용하는 주요 제조사

| 제조사 | 제품 | 비고 |
|--------|------|------|
| Beckhoff | TwinCAT 3 | CODESYS 기반 독자 발전 |
| WAGO | PFC100/200, CC100 | CODESYS 런타임 탑재 |
| ABB | AC500 | |
| Schneider Electric | Modicon M241/M251 | |
| Bosch Rexroth | IndraMotion | |
| ifm | ecomatController | |
| FESTO | CPX-E | |
| Raspberry Pi | CODESYS Control for RPi | 교육/프로토타입용 |

---

## CODESYS vs 주요 PLC 개발환경

| 항목 | CODESYS | TIA Portal (Siemens) | GX Works (Mitsubishi) |
|------|---------|---------------------|----------------------|
| 표준 | IEC 61131-3 | IEC 61131-3 (변형) | 독자 + IEC |
| 하드웨어 | 400+ 제조사 | Siemens 전용 | Mitsubishi 전용 |
| IDE 비용 | **무료** | 유료 (~$2,000+) | 유료 |
| 언어 | 6개 전체 | LD/FBD/SCL/STL/Graph | LD/ST/FBD/SFC |
| 시뮬레이션 | 내장 | 내장 | 별도 |
| 웹 HMI | WebVisu 내장 | WinCC 별도 | GOT 별도 |
| EtherCAT | 네이티브 | 미지원 (PROFINET) | 미지원 (CC-Link) |

---

## Raspberry Pi에서 CODESYS 실행

- Raspberry Pi에 CODESYS Runtime 설치 가능
- GPIO를 직접 PLC I/O로 사용
- 런타임 라이선스: 2시간 무료 데모 (재시작 시 리셋), 정식 ~€50

---

## 활용 분야

- 공장자동화 (FA): 컨베이어, 포장기, 조립라인
- 모션 제어: CNC, 서보 드라이브, 로봇
- 빌딩 자동화: HVAC, 조명 제어
- 에너지: 태양광/풍력 인버터 제어
- 모바일 기계: 농기계, 건설장비
- IoT/엣지: 데이터 수집 + 클라우드 연동

---

*작성일: 2026-04-18*
