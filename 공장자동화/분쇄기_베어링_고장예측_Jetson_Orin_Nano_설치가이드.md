# 분쇄기 베어링 고장 예측 시스템 구축 가이드

## NVIDIA Jetson Orin Nano 기반 AI 예지정비 시스템

**작성일:** 2026년 01월 15일
**버전:** 1.0
**대상:** 분체/분쇄 설비 현장 담당자
**목적:** 분쇄기 베어링 상태 실시간 모니터링 및 고장 예측

---

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [NVIDIA Jetson Orin Nano 소개](#2-nvidia-jetson-orin-nano-소개)
3. [필요 장비 목록](#3-필요-장비-목록)
4. [시스템 아키텍처](#4-시스템-아키텍처)
5. [1단계: 하드웨어 설치](#5-1단계-하드웨어-설치)
6. [2단계: Jetson Orin Nano 초기 설정](#6-2단계-jetson-orin-nano-초기-설정)
7. [3단계: 센서 연결 및 데이터 수집](#7-3단계-센서-연결-및-데이터-수집)
8. [4단계: AI 모델 학습](#8-4단계-ai-모델-학습)
9. [5단계: 실시간 모니터링 시스템 구축](#9-5단계-실시간-모니터링-시스템-구축)
10. [6단계: 결과 해석 방법](#10-6단계-결과-해석-방법)
11. [유지보수 가이드](#11-유지보수-가이드)
12. [문제 해결 (트러블슈팅)](#12-문제-해결-트러블슈팅)
13. [용어 설명](#13-용어-설명)

---

## 1. 시스템 개요

### 1.1 이 시스템이 하는 일

```
┌─────────────────────────────────────────────────────────────────┐
│                    분쇄기 베어링 고장 예측 시스템                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [분쇄기]          [센서]           [Jetson]        [결과]     │
│                                                                 │
│   ┌─────┐       ┌─────────┐      ┌─────────┐     ┌─────────┐  │
│   │     │       │ 진동센서 │      │         │     │ 정상    │  │
│   │ 🔄  │ ───▶  │ 온도센서 │ ───▶ │ AI 분석 │ ───▶│ 주의    │  │
│   │베어링│       │ 전류센서 │      │         │     │ 위험    │  │
│   │     │       │         │      │         │     │ 잔여수명 │  │
│   └─────┘       └─────────┘      └─────────┘     └─────────┘  │
│                                                                 │
│   • 24시간 실시간 모니터링                                        │
│   • 이상 발생 시 즉시 알림                                        │
│   • 베어링 잔여 수명 예측                                         │
│   • 최적 교체 시기 제안                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 기대 효과

| 항목 | 기존 방식 | AI 예지정비 도입 후 |
|------|----------|-------------------|
| **정비 방식** | 고장 후 수리 또는 정기 교체 | 상태 기반 최적 시기 교체 |
| **비계획 정지** | 월 2~3회 | 월 0.5회 미만 (75% 감소) |
| **베어링 수명** | 정기 교체로 낭비 발생 | 최대 수명까지 사용 (30% 연장) |
| **정비 비용** | 긴급 수리로 높은 비용 | 계획 정비로 비용 최적화 |

### 1.3 왜 Jetson Orin Nano인가?

| 비교 항목 | 일반 산업용 PC | Jetson Orin Nano |
|----------|--------------|------------------|
| **AI 처리 성능** | CPU만 사용 (느림) | GPU 가속 (40배 빠름) |
| **크기** | 큼 (데스크탑 사이즈) | 작음 (신용카드 2배) |
| **전력 소비** | 200W 이상 | 7~15W (절전) |
| **가격** | 100만원 이상 | 약 30만원 |
| **실시간 처리** | 어려움 | 1초 이내 분석 가능 |

---

## 2. NVIDIA Jetson Orin Nano 소개

### 2.1 Jetson Orin Nano란?

Jetson Orin Nano는 NVIDIA가 만든 **소형 AI 컴퓨터**입니다.
스마트폰보다 작은 크기에 강력한 AI 처리 능력을 갖추고 있어,
공장 현장에서 실시간으로 데이터를 분석할 수 있습니다.

### 2.2 주요 사양

```
┌─────────────────────────────────────────────────────────────────┐
│                  NVIDIA Jetson Orin Nano 사양                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │   ┌─────────────┐     크기: 100mm x 79mm (신용카드 2배)   │  │
│  │   │             │                                         │  │
│  │   │   NVIDIA    │     GPU: 1024개 CUDA 코어               │  │
│  │   │   Jetson    │     CPU: 6코어 ARM Cortex-A78AE         │  │
│  │   │   Orin      │     RAM: 8GB LPDDR5                     │  │
│  │   │   Nano      │     저장: 128GB NVMe SSD (별도)         │  │
│  │   │             │     전력: 7W ~ 15W                      │  │
│  │   └─────────────┘     AI 성능: 40 TOPS (초당 40조 연산)   │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  포트 구성:                                                      │
│  • USB 3.0 x 4개 (센서 연결용)                                   │
│  • 이더넷 (네트워크 연결)                                         │
│  • HDMI (모니터 연결)                                            │
│  • GPIO 40핀 (센서 직접 연결)                                    │
│  • CSI 카메라 포트 x 2개                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 TOPS란?

**TOPS (Tera Operations Per Second)** = 초당 1조 번 연산

- Jetson Orin Nano: **40 TOPS**
- 즉, 1초에 40조 번의 계산을 할 수 있음
- 이 덕분에 복잡한 AI 분석을 실시간으로 처리 가능

---

## 3. 필요 장비 목록

### 3.1 메인 장비

| 번호 | 장비명 | 수량 | 용도 | 예상 가격 |
|:----:|--------|:----:|------|-----------|
| 1 | NVIDIA Jetson Orin Nano Developer Kit | 1 | AI 처리 장치 | 30만원 |
| 2 | NVMe SSD 256GB | 1 | 데이터 저장 | 5만원 |
| 3 | 5V 4A 전원 어댑터 (DC 배럴잭) | 1 | 전원 공급 | 2만원 |
| 4 | 산업용 방열 케이스 | 1 | Jetson 보호 | 10만원 |

### 3.2 센서 장비

| 번호 | 장비명 | 수량 | 용도 | 예상 가격 |
|:----:|--------|:----:|------|-----------|
| 5 | 산업용 진동센서 (MEMS 가속도계) | 2 | 진동 측정 | 20만원/개 |
| 6 | PT100 온도센서 (RTD) | 2 | 온도 측정 | 5만원/개 |
| 7 | 전류센서 (CT, 0-50A) | 1 | 모터 전류 측정 | 8만원 |
| 8 | USB DAQ (데이터 수집 장치) | 1 | 센서 → Jetson 연결 | 30만원 |

### 3.3 연결 및 부속 장비

| 번호 | 장비명 | 수량 | 용도 | 예상 가격 |
|:----:|--------|:----:|------|-----------|
| 9 | 산업용 이더넷 케이블 (CAT6) | 2 | 네트워크 연결 | 1만원 |
| 10 | 센서 케이블 (실드 케이블) | 10m | 센서 연결 | 3만원 |
| 11 | DIN 레일 마운트 | 1 | 제어반 설치용 | 2만원 |
| 12 | 접지 단자대 | 1 | 노이즈 방지 | 1만원 |

### 3.4 총 예상 비용

| 구분 | 금액 |
|------|------|
| 메인 장비 | 47만원 |
| 센서 장비 | 88만원 |
| 연결/부속 | 7만원 |
| **총계** | **약 142만원** |

---

## 4. 시스템 아키텍처

### 4.1 전체 시스템 구성도

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         전체 시스템 구성도                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                        분쇄기 (현장)                              │   │
│  │  ┌───────────┐                                                   │   │
│  │  │           │   ← 진동센서 (베어링 하우징에 부착)               │   │
│  │  │   분쇄기   │   ← 온도센서 (베어링 외륜 근처)                  │   │
│  │  │   모터    │   ← 전류센서 (모터 전원 케이블에 클램프)          │   │
│  │  │           │                                                   │   │
│  │  └───────────┘                                                   │   │
│  └──────────┬───────────────────────────────────────────────────────┘   │
│             │ 센서 케이블 (실드 처리)                                    │
│             ▼                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    제어반 내부                                     │   │
│  │  ┌───────────────────────────────────────────────────────────┐  │   │
│  │  │  USB DAQ (데이터 수집 장치)                                │  │   │
│  │  │  • 아날로그 입력 8채널                                     │  │   │
│  │  │  • 샘플링: 50kHz                                          │  │   │
│  │  │  • 센서 신호 → 디지털 변환                                 │  │   │
│  │  └─────────────────────┬─────────────────────────────────────┘  │   │
│  │                        │ USB 3.0                                 │   │
│  │                        ▼                                         │   │
│  │  ┌───────────────────────────────────────────────────────────┐  │   │
│  │  │  NVIDIA Jetson Orin Nano                                  │  │   │
│  │  │  ┌─────────────────────────────────────────────────────┐  │  │   │
│  │  │  │ 1. 데이터 수집 (1초에 10,000개 샘플)                 │  │  │   │
│  │  │  │ 2. FFT 변환 (진동 → 주파수 분석)                     │  │  │   │
│  │  │  │ 3. AI 모델 추론 (정상/이상 판단)                      │  │  │   │
│  │  │  │ 4. RUL 예측 (잔여 수명 계산)                         │  │  │   │
│  │  │  │ 5. 결과 전송 (대시보드/알림)                          │  │  │   │
│  │  │  └─────────────────────────────────────────────────────┘  │  │   │
│  │  └─────────────────────┬─────────────────────────────────────┘  │   │
│  └────────────────────────┼─────────────────────────────────────────┘   │
│                           │ 이더넷 (유선 네트워크)                       │
│                           ▼                                             │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    사무실 / 클라우드                               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │   │
│  │  │ 웹 대시보드  │  │ 모바일 알림 │  │ 데이터 저장  │              │   │
│  │  │ (실시간)    │  │ (SMS/카톡)  │  │ (이력 관리)  │              │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 데이터 흐름

```
센서 데이터 흐름:

[진동센서] ──┐
             │     ┌──────────┐     ┌──────────┐     ┌──────────┐
[온도센서] ──┼────▶│ USB DAQ  │────▶│  Jetson  │────▶│  결과    │
             │     │(A/D변환) │     │ (AI분석) │     │ (알림)   │
[전류센서] ──┘     └──────────┘     └──────────┘     └──────────┘

        아날로그 신호    →    디지털 신호    →    분석 결과
        (mV, mA)              (숫자 데이터)       (정상/이상/RUL)
```

---

## 5. 1단계: 하드웨어 설치

### 5.1 센서 설치 위치

#### 5.1.1 진동센서 설치

```
┌─────────────────────────────────────────────────────────────────┐
│                    진동센서 설치 위치                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│       [모터]                    [분쇄기 본체]                    │
│    ┌─────────┐              ┌─────────────────┐                │
│    │         │              │                 │                │
│    │    M    │──── 축 ──────│    분쇄 로터    │                │
│    │         │              │                 │                │
│    └────┬────┘              └────────┬────────┘                │
│         │                            │                          │
│         ▼                            ▼                          │
│    ┌─────────┐              ┌─────────────────┐                │
│    │ 베어링1  │              │     베어링2      │                │
│    │ (모터측) │              │   (반대측/자유측) │                │
│    └────┬────┘              └────────┬────────┘                │
│         │                            │                          │
│    [진동센서1]                   [진동센서2]                     │
│    설치 위치                     설치 위치                       │
│                                                                 │
│  ※ 진동센서는 베어링 하우징의 수직 방향(12시 방향)에 설치        │
│  ※ 볼트 구멍이 있으면 스터드 마운트, 없으면 에폭시 접착          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 진동센서 설치 순서

| 순서 | 작업 내용 | 주의사항 |
|:----:|----------|---------|
| 1 | 설치 위치 표면 청소 | 기름, 먼지 완전 제거 |
| 2 | 설치면 평탄화 | 그라인더로 평평하게 |
| 3 | 센서 베이스 부착 | 에폭시 또는 스터드 볼트 |
| 4 | 센서 장착 | 센서를 베이스에 나사 체결 |
| 5 | 케이블 정리 | 케이블 타이로 고정 |

**중요:** 센서는 반드시 **베어링 하우징**에 직접 부착해야 합니다. 커버나 외부 케이스에 부착하면 정확한 측정이 어렵습니다.

#### 5.1.2 온도센서 설치

```
┌─────────────────────────────────────────────────────────────────┐
│                    온도센서 설치 위치                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                   베어링 하우징 단면도                            │
│                                                                 │
│              ┌────────────────────────────┐                    │
│              │                            │                    │
│              │    ┌──────────────────┐    │                    │
│              │    │                  │    │                    │
│              │    │   ◯ 베어링 내륜   │    │                    │
│              │    │   ◯◯◯◯◯◯◯◯   │    │ ← 외륜              │
│              │    │                  │    │                    │
│              │    └──────────────────┘    │                    │
│              │                            │                    │
│              └───────────────┬────────────┘                    │
│                              │                                  │
│                        [온도센서 설치 위치]                       │
│                        베어링 외륜과 가장 가까운                   │
│                        하우징 측면 (구멍 가공 필요)                │
│                                                                 │
│  ※ 가능하면 베어링 외륜과 5mm 이내 거리에 설치                    │
│  ※ 구멍 가공 후 열전도 그리스 도포                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 5.1.3 전류센서 설치

```
┌─────────────────────────────────────────────────────────────────┐
│                    전류센서 설치 위치                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│        [제어반]                                                  │
│    ┌────────────────────────────────────────┐                  │
│    │                                        │                  │
│    │   [차단기] ─── [인버터/직접구동] ─── [모터로]               │
│    │                      │                 │                  │
│    │                      ▼                 │                  │
│    │               [전류센서(CT)]            │                  │
│    │               클램프 타입               │                  │
│    │                                        │                  │
│    │   ※ 3상 모터의 경우: 1개 상(R상)에만 설치 가능              │
│    │   ※ 정확도를 위해: 3상 모두 설치 권장                       │
│    │                                        │                  │
│    └────────────────────────────────────────┘                  │
│                                                                 │
│  설치 방법:                                                      │
│  1. 모터 전원 케이블 중 1개 상을 CT 구멍에 통과                   │
│  2. CT를 단단히 잠금                                             │
│  3. 출력 케이블을 USB DAQ에 연결                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Jetson Orin Nano 설치

#### 5.2.1 설치 위치 선정

| 조건 | 권장 사항 |
|------|----------|
| **온도** | 0~40°C (방열 케이스 사용 시 50°C까지 가능) |
| **습도** | 85% 이하 (결로 발생 금지) |
| **진동** | 진동이 적은 제어반 내부 |
| **먼지** | 밀폐형 케이스 또는 필터 사용 |
| **전원** | 안정적인 5V 4A 공급 |

#### 5.2.2 설치 순서

```
Jetson Orin Nano 설치 순서:

1. 방열 케이스에 Jetson 장착
   └── NVMe SSD 먼저 장착 후 케이스 조립

2. DIN 레일 마운트 부착
   └── 케이스 뒷면에 DIN 레일 어댑터 부착

3. 제어반 내 DIN 레일에 장착
   └── 다른 기기와 10cm 이상 간격 유지

4. 전원 연결
   └── 5V 4A 어댑터 연결 (DC 배럴잭)

5. USB DAQ 연결
   └── USB 3.0 포트에 연결

6. 이더넷 연결
   └── 공장 네트워크에 연결
```

### 5.3 배선도

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            배선 연결도                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [현장 센서]                        [제어반 내부]                         │
│                                                                         │
│  ┌─────────────┐                   ┌─────────────────────────────────┐  │
│  │ 진동센서 #1 │─── 실드케이블 ───▶│ USB DAQ                         │  │
│  │ (4-20mA)    │    (2심+실드)     │                                 │  │
│  └─────────────┘                   │  CH1: 진동센서 #1 (0-10V)       │  │
│                                    │  CH2: 진동센서 #2 (0-10V)       │  │
│  ┌─────────────┐                   │  CH3: 온도센서 #1 (PT100)       │  │
│  │ 진동센서 #2 │─── 실드케이블 ───▶│  CH4: 온도센서 #2 (PT100)       │  │
│  │ (4-20mA)    │    (2심+실드)     │  CH5: 전류센서 (0-5V)           │  │
│  └─────────────┘                   │                                 │  │
│                                    │  [USB 3.0] ────────────────┐    │  │
│  ┌─────────────┐                   └─────────────────────────────┼───┘  │
│  │ 온도센서 #1 │─── 실드케이블 ─────────────────────────────────▶│      │
│  │ (PT100)     │    (4심+실드)                                   │      │
│  └─────────────┘                                                 │      │
│                                    ┌─────────────────────────────┼───┐  │
│  ┌─────────────┐                   │ Jetson Orin Nano            │   │  │
│  │ 온도센서 #2 │─── 실드케이블 ───▶│                             │   │  │
│  │ (PT100)     │    (4심+실드)     │  USB ◀────────────────────┘   │  │
│  └─────────────┘                   │  Ethernet ◀─── 공장 네트워크  │  │
│                                    │  Power ◀────── 5V 4A 어댑터   │  │
│  ┌─────────────┐                   │  HDMI ◀────── 모니터 (설정용) │  │
│  │ 전류센서    │─── 실드케이블 ───▶│                               │  │
│  │ (CT)        │    (2심+실드)     └───────────────────────────────┘  │
│  └─────────────┘                                                       │
│                                                                         │
│  ※ 모든 실드(Shield)는 제어반 접지단자에 연결 (한쪽만!)                  │
│  ※ 실드 양쪽 연결 시 그라운드 루프로 노이즈 발생                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. 2단계: Jetson Orin Nano 초기 설정

### 6.1 운영체제 설치

#### 6.1.1 필요 준비물

- microSD 카드 32GB 이상 (또는 NVMe SSD)
- USB 키보드, 마우스
- HDMI 모니터
- 인터넷 연결

#### 6.1.2 JetPack 설치

```bash
# 1. NVIDIA SDK Manager를 사용하여 JetPack 6.0 설치
#    (Ubuntu PC에서 작업)

# 2. Jetson에 전원 연결 후 부팅
#    첫 부팅 시 초기 설정 마법사 실행

# 3. 사용자 계정 설정
#    - 사용자명: uttec
#    - 비밀번호: (보안을 위해 복잡하게 설정)

# 4. 네트워크 설정
#    - 고정 IP 권장 (예: 192.168.1.100)
```

### 6.2 기본 소프트웨어 설치

#### 6.2.1 시스템 업데이트

```bash
# 터미널에서 실행
sudo apt update
sudo apt upgrade -y
```

#### 6.2.2 Python 환경 설정

```bash
# Python 3.10 확인
python3 --version

# pip 업그레이드
pip3 install --upgrade pip

# 가상환경 생성
python3 -m venv ~/bearing_pdm
source ~/bearing_pdm/bin/activate
```

#### 6.2.3 필수 라이브러리 설치

```bash
# 가상환경 활성화 상태에서 실행
pip install numpy scipy pandas matplotlib
pip install scikit-learn tensorflow
pip install pyserial flask flask-socketio
pip install paho-mqtt

# Jetson 전용 CUDA 지원 TensorFlow 설치
# (JetPack 버전에 맞는 wheel 파일 사용)
pip install --extra-index-url https://developer.download.nvidia.com/compute/redist/jp/v60 tensorflow==2.15.0+nv24.05
```

### 6.3 USB DAQ 드라이버 설치

```bash
# USB DAQ 제조사별 드라이버 설치 (예: National Instruments)
# 또는 범용 pyusb 사용

pip install pyusb
sudo apt install libusb-1.0-0-dev
```

### 6.4 시스템 자동 시작 설정

```bash
# 부팅 시 자동 실행 서비스 등록
sudo nano /etc/systemd/system/bearing_pdm.service
```

서비스 파일 내용:

```ini
[Unit]
Description=Bearing Predictive Maintenance Service
After=network.target

[Service]
Type=simple
User=uttec
WorkingDirectory=/home/uttec/bearing_pdm
ExecStart=/home/uttec/bearing_pdm/bin/python /home/uttec/bearing_pdm/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

서비스 활성화:

```bash
sudo systemctl daemon-reload
sudo systemctl enable bearing_pdm
sudo systemctl start bearing_pdm
```

---

## 7. 3단계: 센서 연결 및 데이터 수집

### 7.1 센서 연결 확인

```bash
# USB DAQ 연결 확인
lsusb

# 출력 예시:
# Bus 001 Device 003: ID xxxx:xxxx USB DAQ Device
```

### 7.2 데이터 수집 프로그램

#### 7.2.1 기본 데이터 수집 코드

```python
#!/usr/bin/env python3
"""
파일명: data_collector.py
목적: 분쇄기 베어링 센서 데이터 수집
"""

import numpy as np
import time
from datetime import datetime
import json

# USB DAQ 라이브러리 (제조사별 다름)
# from nidaqmx import task  # National Instruments 예시

class SensorDataCollector:
    """센서 데이터 수집 클래스"""

    def __init__(self, sample_rate=10000, duration=1.0):
        """
        초기화

        매개변수:
            sample_rate: 샘플링 속도 (Hz) - 1초에 몇 번 측정
            duration: 측정 시간 (초)
        """
        self.sample_rate = sample_rate  # 10,000 Hz = 1초에 10,000번 측정
        self.duration = duration
        self.num_samples = int(sample_rate * duration)

    def read_vibration(self, channel):
        """
        진동 센서 데이터 읽기

        반환값:
            numpy 배열: 진동 가속도 데이터 (g 단위)
        """
        # 실제 DAQ 코드로 대체
        # 여기서는 시뮬레이션 데이터 생성
        t = np.linspace(0, self.duration, self.num_samples)

        # 정상 베어링 시뮬레이션 (기본 회전 주파수 + 약간의 노이즈)
        base_freq = 25  # 25Hz = 1500RPM
        vibration = 0.5 * np.sin(2 * np.pi * base_freq * t)
        vibration += 0.1 * np.random.randn(len(t))  # 노이즈

        return vibration

    def read_temperature(self, channel):
        """
        온도 센서 데이터 읽기 (PT100)

        반환값:
            float: 온도 (°C)
        """
        # 실제 DAQ 코드로 대체
        # PT100 저항값 → 온도 변환 필요
        temperature = 45.0 + np.random.randn() * 2  # 시뮬레이션
        return temperature

    def read_current(self, channel):
        """
        전류 센서 데이터 읽기

        반환값:
            float: 전류 (A)
        """
        # CT 출력 전압 → 전류 변환 필요
        current = 15.0 + np.random.randn() * 0.5  # 시뮬레이션
        return current

    def collect_all(self):
        """
        모든 센서 데이터 수집

        반환값:
            dict: 수집된 모든 데이터
        """
        timestamp = datetime.now().isoformat()

        data = {
            "timestamp": timestamp,
            "vibration_1": self.read_vibration(0).tolist(),
            "vibration_2": self.read_vibration(1).tolist(),
            "temperature_1": self.read_temperature(2),
            "temperature_2": self.read_temperature(3),
            "motor_current": self.read_current(4),
            "sample_rate": self.sample_rate
        }

        return data


# 사용 예시
if __name__ == "__main__":
    collector = SensorDataCollector(sample_rate=10000, duration=1.0)

    while True:
        data = collector.collect_all()
        print(f"[{data['timestamp']}] 온도1: {data['temperature_1']:.1f}°C, "
              f"온도2: {data['temperature_2']:.1f}°C, "
              f"전류: {data['motor_current']:.1f}A")

        # 1초마다 수집
        time.sleep(1)
```

### 7.3 데이터 저장 형식

```json
{
  "timestamp": "2026-01-15T10:30:00.123456",
  "vibration_1": [0.12, 0.15, -0.08, ...],
  "vibration_2": [0.10, 0.13, -0.05, ...],
  "temperature_1": 45.2,
  "temperature_2": 43.8,
  "motor_current": 15.3,
  "sample_rate": 10000
}
```

### 7.4 데이터 수집 기간

| 단계 | 기간 | 목적 |
|------|------|------|
| **초기 수집** | 2~4주 | 정상 상태 데이터 확보 |
| **AI 학습** | 1주 | 모델 학습 및 검증 |
| **실시간 운영** | 지속 | 상시 모니터링 |

**중요:** 정상 상태의 데이터가 충분히 쌓여야 AI가 "정상"을 학습할 수 있습니다!

---

## 8. 4단계: AI 모델 학습

### 8.1 FFT (고속 푸리에 변환) 이해하기

#### 8.1.1 FFT란?

```
┌─────────────────────────────────────────────────────────────────┐
│                      FFT 변환 개념                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [시간 영역 - 원본 진동 신호]                                     │
│                                                                 │
│  진폭 ▲                                                         │
│       │    /\    /\    /\    /\                                │
│   0 ──┼───/──\──/──\──/──\──/──\──────▶ 시간                   │
│       │  /    \/    \/    \/    \                              │
│       │ /                        \                              │
│                                                                 │
│                    ↓ FFT 변환                                   │
│                                                                 │
│  [주파수 영역 - 분석 결과]                                        │
│                                                                 │
│  크기 ▲                                                         │
│       │     ▄                                                   │
│       │     █                    ▄                              │
│       │     █         ▄         █                              │
│       │  ▄  █    ▄    █    ▄    █                              │
│   0 ──┼──█──█────█────█────█────█─────▶ 주파수 (Hz)            │
│       │  ↑  ↑    ↑    ↑    ↑    ↑                              │
│          25 50   75  100  125  150                              │
│          Hz Hz   Hz   Hz   Hz   Hz                              │
│                                                                 │
│  해석:                                                           │
│  • 25Hz에서 가장 큰 피크 = 축 회전 주파수 (1500RPM)              │
│  • 50Hz 피크 = 2차 고조파 (정상)                                 │
│  • 다른 주파수에 큰 피크가 나타나면 = 베어링 결함 의심            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### 8.1.2 베어링 결함 주파수

베어링이 손상되면 특정 주파수에서 진동이 증가합니다:

| 결함 유형 | 주파수 명칭 | 계산 공식 | 의미 |
|----------|------------|----------|------|
| **외륜 결함** | BPFO | n/2 × (1 - Bd/Pd × cosα) × RPM/60 | 볼이 외륜 결함을 지나갈 때 |
| **내륜 결함** | BPFI | n/2 × (1 + Bd/Pd × cosα) × RPM/60 | 볼이 내륜 결함을 지나갈 때 |
| **볼 결함** | BSF | Pd/2Bd × (1 - (Bd/Pd × cosα)²) × RPM/60 | 볼 자체의 손상 |
| **케이지 결함** | FTF | 1/2 × (1 - Bd/Pd × cosα) × RPM/60 | 케이지(리테이너) 손상 |

- n: 볼 개수
- Bd: 볼 직경
- Pd: 피치 직경
- α: 접촉각

### 8.2 특징 추출 (Feature Extraction)

#### 8.2.1 시간 영역 특징

```python
"""
파일명: feature_extraction.py
목적: 진동 신호에서 특징값 추출
"""

import numpy as np
from scipy import stats
from scipy.fft import fft, fftfreq

def extract_time_features(signal):
    """
    시간 영역에서 특징 추출

    매개변수:
        signal: 진동 신호 (numpy 배열)

    반환값:
        dict: 추출된 특징값들
    """
    features = {}

    # 1. RMS (Root Mean Square) - 진동의 전체 에너지
    # 베어링 상태가 나빠지면 RMS가 증가
    features['rms'] = np.sqrt(np.mean(signal**2))

    # 2. Peak (최대값) - 충격성 진동
    # 결함이 있으면 순간적인 피크가 발생
    features['peak'] = np.max(np.abs(signal))

    # 3. Crest Factor - Peak / RMS
    # 정상: 3~5, 초기 결함: 6~8, 심각한 결함: 8 이상
    features['crest_factor'] = features['peak'] / features['rms']

    # 4. Kurtosis (첨도) - 신호의 뾰족한 정도
    # 정상: ~3, 충격성 결함 시: 증가
    features['kurtosis'] = stats.kurtosis(signal)

    # 5. Skewness (왜도) - 신호의 비대칭 정도
    features['skewness'] = stats.skew(signal)

    # 6. Standard Deviation (표준편차)
    features['std'] = np.std(signal)

    return features


def extract_frequency_features(signal, sample_rate, rpm=1500):
    """
    주파수 영역에서 특징 추출 (FFT)

    매개변수:
        signal: 진동 신호
        sample_rate: 샘플링 속도 (Hz)
        rpm: 모터 회전 속도

    반환값:
        dict: 주파수 영역 특징값들
    """
    features = {}

    # FFT 수행
    n = len(signal)
    yf = fft(signal)
    xf = fftfreq(n, 1/sample_rate)

    # 양의 주파수만 사용
    positive_freq_idx = xf > 0
    xf = xf[positive_freq_idx]
    yf = np.abs(yf[positive_freq_idx])

    # 1. 회전 주파수 (1X)
    rotation_freq = rpm / 60  # Hz
    idx_1x = np.argmin(np.abs(xf - rotation_freq))
    features['amp_1x'] = yf[idx_1x]

    # 2. 2차 고조파 (2X)
    idx_2x = np.argmin(np.abs(xf - 2*rotation_freq))
    features['amp_2x'] = yf[idx_2x]

    # 3. 3차 고조파 (3X)
    idx_3x = np.argmin(np.abs(xf - 3*rotation_freq))
    features['amp_3x'] = yf[idx_3x]

    # 4. 베어링 결함 주파수 대역 에너지
    # (베어링 사양에 따라 계산된 BPFO, BPFI 주변)
    # 예시: BPFO ≈ 5.2 × 회전주파수
    bpfo = 5.2 * rotation_freq
    bpfo_band = (xf > bpfo * 0.9) & (xf < bpfo * 1.1)
    features['bpfo_energy'] = np.sum(yf[bpfo_band]**2)

    # 5. 고주파 대역 에너지 (500Hz~2000Hz)
    # 베어링 결함 시 고주파 에너지 증가
    high_freq_band = (xf > 500) & (xf < 2000)
    features['high_freq_energy'] = np.sum(yf[high_freq_band]**2)

    return features


def extract_all_features(signal, sample_rate, rpm=1500):
    """
    모든 특징 추출 (시간 + 주파수)
    """
    time_features = extract_time_features(signal)
    freq_features = extract_frequency_features(signal, sample_rate, rpm)

    # 합치기
    all_features = {**time_features, **freq_features}

    return all_features
```

### 8.3 AI 모델 학습

#### 8.3.1 이상 탐지 모델 (Autoencoder)

```python
"""
파일명: train_model.py
목적: 베어링 이상 탐지 AI 모델 학습
"""

import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.preprocessing import StandardScaler
import joblib

def create_autoencoder(input_dim):
    """
    Autoencoder 모델 생성

    Autoencoder란?
    - 입력을 압축했다가 다시 복원하는 신경망
    - 정상 데이터로만 학습하면, 정상 데이터는 잘 복원하고
      이상 데이터는 잘 복원하지 못함
    - 복원 오차가 크면 = 이상 상태
    """

    # 인코더: 입력 → 압축
    encoder = keras.Sequential([
        keras.layers.Dense(32, activation='relu', input_shape=(input_dim,)),
        keras.layers.Dense(16, activation='relu'),
        keras.layers.Dense(8, activation='relu'),  # 압축된 표현
    ])

    # 디코더: 압축 → 복원
    decoder = keras.Sequential([
        keras.layers.Dense(16, activation='relu', input_shape=(8,)),
        keras.layers.Dense(32, activation='relu'),
        keras.layers.Dense(input_dim, activation='linear'),  # 원본 크기로 복원
    ])

    # 전체 모델
    autoencoder = keras.Sequential([encoder, decoder])

    autoencoder.compile(
        optimizer='adam',
        loss='mse'  # 평균 제곱 오차
    )

    return autoencoder


def train_model(normal_data, model_path='bearing_model.h5'):
    """
    정상 데이터로 모델 학습

    매개변수:
        normal_data: 정상 상태의 특징 데이터 (2D numpy 배열)
        model_path: 모델 저장 경로
    """

    # 1. 데이터 정규화 (평균 0, 표준편차 1로 변환)
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(normal_data)

    # 2. 모델 생성
    input_dim = normal_data.shape[1]
    model = create_autoencoder(input_dim)

    # 3. 모델 학습
    print("모델 학습 시작...")
    history = model.fit(
        scaled_data, scaled_data,  # 입력 = 출력 (복원 학습)
        epochs=100,
        batch_size=32,
        validation_split=0.1,
        verbose=1
    )

    # 4. 이상 임계값 설정
    # 정상 데이터의 복원 오차 계산
    reconstructed = model.predict(scaled_data)
    mse = np.mean(np.power(scaled_data - reconstructed, 2), axis=1)

    # 임계값: 평균 + 3×표준편차 (99.7% 신뢰구간)
    threshold = np.mean(mse) + 3 * np.std(mse)

    # 5. 모델 저장
    model.save(model_path)
    joblib.dump(scaler, 'scaler.pkl')
    joblib.dump(threshold, 'threshold.pkl')

    print(f"모델 학습 완료!")
    print(f"임계값: {threshold:.6f}")
    print(f"모델 저장: {model_path}")

    return model, scaler, threshold


# 학습 실행 예시
if __name__ == "__main__":
    # 정상 데이터 로드 (CSV 파일에서)
    import pandas as pd

    df = pd.read_csv('normal_features.csv')
    normal_data = df.values

    model, scaler, threshold = train_model(normal_data)
```

#### 8.3.2 잔여 수명 예측 모델 (RUL)

```python
"""
파일명: rul_model.py
목적: 베어링 잔여 수명 (RUL) 예측
"""

import numpy as np
from sklearn.linear_model import LinearRegression
import joblib

class RULPredictor:
    """
    잔여 수명 예측기

    원리:
    - 건강 지표(Health Index)가 시간에 따라 어떻게 변하는지 추적
    - 변화 추세를 기반으로 언제 임계값에 도달할지 예측
    """

    def __init__(self, window_size=100):
        """
        매개변수:
            window_size: 추세 분석에 사용할 데이터 개수
        """
        self.window_size = window_size
        self.history = []
        self.failure_threshold = 0.8  # 건강 지표가 이 값 이하면 교체 권장

    def calculate_health_index(self, features):
        """
        특징값들을 종합하여 건강 지표 계산 (0~1)

        1.0 = 완벽한 상태
        0.0 = 고장 임박
        """
        # 각 특징값의 정상 범위 정의
        normal_ranges = {
            'rms': (0.1, 0.5),           # 정상 RMS 범위
            'crest_factor': (3.0, 5.0),   # 정상 Crest Factor
            'kurtosis': (2.5, 4.0),       # 정상 Kurtosis
            'high_freq_energy': (0, 100)  # 정상 고주파 에너지
        }

        scores = []
        for key, (low, high) in normal_ranges.items():
            if key in features:
                value = features[key]
                if low <= value <= high:
                    score = 1.0  # 정상 범위 내
                elif value < low:
                    score = max(0, value / low)  # 범위 아래
                else:
                    score = max(0, 1 - (value - high) / high)  # 범위 위
                scores.append(score)

        # 평균 건강 지표
        health_index = np.mean(scores) if scores else 1.0
        return health_index

    def update(self, features, timestamp):
        """
        새 데이터로 이력 업데이트
        """
        hi = self.calculate_health_index(features)
        self.history.append({
            'timestamp': timestamp,
            'health_index': hi
        })

        # 윈도우 크기 유지
        if len(self.history) > self.window_size:
            self.history.pop(0)

    def predict_rul(self):
        """
        잔여 수명 예측

        반환값:
            dict: RUL 예측 결과
                - rul_hours: 예상 잔여 시간
                - health_index: 현재 건강 지표
                - trend: 추세 (improving/stable/degrading)
        """
        if len(self.history) < 10:
            return {
                'rul_hours': None,
                'health_index': self.history[-1]['health_index'] if self.history else 1.0,
                'trend': 'unknown',
                'message': '데이터 부족 (최소 10개 필요)'
            }

        # 시간과 건강 지표 추출
        times = np.arange(len(self.history)).reshape(-1, 1)
        health_values = np.array([h['health_index'] for h in self.history])

        # 선형 회귀로 추세 분석
        model = LinearRegression()
        model.fit(times, health_values)

        slope = model.coef_[0]  # 기울기 (시간당 변화량)
        current_hi = self.history[-1]['health_index']

        # 추세 판단
        if slope > 0.001:
            trend = 'improving'  # 개선 중
        elif slope < -0.001:
            trend = 'degrading'  # 악화 중
        else:
            trend = 'stable'  # 안정

        # RUL 계산 (건강 지표가 임계값에 도달할 때까지 시간)
        if slope < 0:
            # 악화 추세일 때만 RUL 계산
            remaining_drop = current_hi - self.failure_threshold
            if remaining_drop > 0:
                samples_to_failure = remaining_drop / abs(slope)
                # 샘플 수 → 시간 변환 (1시간에 3600개 샘플 가정)
                rul_hours = samples_to_failure / 3600
            else:
                rul_hours = 0  # 이미 임계값 이하
        else:
            rul_hours = float('inf')  # 악화 추세 아님

        return {
            'rul_hours': rul_hours,
            'rul_days': rul_hours / 24 if rul_hours != float('inf') else float('inf'),
            'health_index': current_hi,
            'trend': trend,
            'slope': slope
        }
```

### 8.4 학습 데이터 수집 체크리스트

| 단계 | 확인 사항 | 완료 |
|:----:|----------|:----:|
| 1 | 분쇄기가 정상 가동 상태인가? | ☐ |
| 2 | 센서가 올바르게 설치되었는가? | ☐ |
| 3 | 데이터 수집 프로그램이 정상 실행 중인가? | ☐ |
| 4 | 최소 2주간의 데이터가 수집되었는가? | ☐ |
| 5 | 수집된 데이터에 이상한 값이 없는가? | ☐ |
| 6 | 다양한 부하 조건의 데이터가 포함되었는가? | ☐ |

---

## 9. 5단계: 실시간 모니터링 시스템 구축

### 9.1 메인 모니터링 프로그램

```python
"""
파일명: main.py
목적: 실시간 베어링 상태 모니터링 및 예측
"""

import numpy as np
import time
from datetime import datetime
import json
import threading

import tensorflow as tf
import joblib

from data_collector import SensorDataCollector
from feature_extraction import extract_all_features
from rul_model import RULPredictor

class BearingMonitor:
    """실시간 베어링 모니터링 시스템"""

    def __init__(self):
        # 센서 데이터 수집기
        self.collector = SensorDataCollector(sample_rate=10000)

        # AI 모델 로드
        self.model = tf.keras.models.load_model('bearing_model.h5')
        self.scaler = joblib.load('scaler.pkl')
        self.threshold = joblib.load('threshold.pkl')

        # RUL 예측기
        self.rul_predictor = RULPredictor()

        # 상태 저장
        self.current_status = {
            'status': 'unknown',
            'health_index': 1.0,
            'rul_days': None,
            'last_update': None
        }

    def analyze(self, data):
        """
        센서 데이터 분석
        """
        # 1. 특징 추출
        features_1 = extract_all_features(
            np.array(data['vibration_1']),
            data['sample_rate']
        )
        features_2 = extract_all_features(
            np.array(data['vibration_2']),
            data['sample_rate']
        )

        # 온도, 전류 추가
        features_1['temperature'] = data['temperature_1']
        features_2['temperature'] = data['temperature_2']
        features_1['current'] = data['motor_current']

        # 2. 이상 탐지
        feature_vector = np.array(list(features_1.values())).reshape(1, -1)
        scaled_features = self.scaler.transform(feature_vector)
        reconstructed = self.model.predict(scaled_features, verbose=0)
        mse = np.mean(np.power(scaled_features - reconstructed, 2))

        # 3. 상태 판정
        if mse < self.threshold * 0.5:
            status = 'normal'      # 정상
            status_code = 0
        elif mse < self.threshold:
            status = 'warning'     # 주의
            status_code = 1
        else:
            status = 'critical'    # 위험
            status_code = 2

        # 4. RUL 업데이트
        self.rul_predictor.update(features_1, data['timestamp'])
        rul_result = self.rul_predictor.predict_rul()

        # 5. 결과 저장
        result = {
            'timestamp': data['timestamp'],
            'status': status,
            'status_code': status_code,
            'mse': float(mse),
            'threshold': float(self.threshold),
            'health_index': rul_result['health_index'],
            'rul_hours': rul_result['rul_hours'],
            'rul_days': rul_result.get('rul_days'),
            'trend': rul_result['trend'],
            'temperature_1': data['temperature_1'],
            'temperature_2': data['temperature_2'],
            'motor_current': data['motor_current'],
            'features': features_1
        }

        self.current_status = result
        return result

    def run(self):
        """
        실시간 모니터링 실행
        """
        print("=" * 60)
        print("  분쇄기 베어링 AI 예지정비 시스템 시작")
        print("=" * 60)

        while True:
            try:
                # 데이터 수집
                data = self.collector.collect_all()

                # 분석
                result = self.analyze(data)

                # 결과 출력
                self.print_status(result)

                # 알림 (위험 시)
                if result['status'] == 'critical':
                    self.send_alert(result)

                # 1초 대기
                time.sleep(1)

            except KeyboardInterrupt:
                print("\n모니터링 종료")
                break
            except Exception as e:
                print(f"오류 발생: {e}")
                time.sleep(5)

    def print_status(self, result):
        """
        상태 출력
        """
        status_icons = {
            'normal': '✅ 정상',
            'warning': '⚠️  주의',
            'critical': '🚨 위험'
        }

        print(f"\n[{result['timestamp']}]")
        print(f"상태: {status_icons.get(result['status'], result['status'])}")
        print(f"건강 지표: {result['health_index']:.2%}")

        if result['rul_days'] and result['rul_days'] != float('inf'):
            print(f"예상 잔여 수명: {result['rul_days']:.1f}일")

        print(f"온도: {result['temperature_1']:.1f}°C / {result['temperature_2']:.1f}°C")
        print(f"전류: {result['motor_current']:.1f}A")
        print(f"추세: {result['trend']}")
        print("-" * 40)

    def send_alert(self, result):
        """
        알림 발송 (이메일, SMS, 카카오톡 등)
        """
        message = f"""
        🚨 분쇄기 베어링 이상 감지!

        시간: {result['timestamp']}
        상태: {result['status']}
        건강지표: {result['health_index']:.2%}
        온도: {result['temperature_1']:.1f}°C

        즉시 점검이 필요합니다!
        """

        # TODO: 실제 알림 서비스 연동
        print(message)

        # 알림 로그 저장
        with open('alerts.log', 'a') as f:
            f.write(f"{result['timestamp']}: {result['status']}\n")


# 실행
if __name__ == "__main__":
    monitor = BearingMonitor()
    monitor.run()
```

### 9.2 웹 대시보드

#### 9.2.1 대시보드 서버 코드

```python
"""
파일명: dashboard.py
목적: 웹 기반 실시간 모니터링 대시보드
"""

from flask import Flask, render_template, jsonify
from flask_socketio import SocketIO
import threading
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# 메인 모니터와 연동
from main import BearingMonitor
monitor = BearingMonitor()

@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/api/status')
def get_status():
    """현재 상태 API"""
    return jsonify(monitor.current_status)

def background_monitoring():
    """백그라운드 모니터링"""
    while True:
        data = monitor.collector.collect_all()
        result = monitor.analyze(data)

        # 웹소켓으로 실시간 전송
        socketio.emit('update', result)

        time.sleep(1)

if __name__ == '__main__':
    # 모니터링 스레드 시작
    thread = threading.Thread(target=background_monitoring)
    thread.daemon = True
    thread.start()

    # 웹 서버 시작
    socketio.run(app, host='0.0.0.0', port=5000)
```

#### 9.2.2 대시보드 HTML

```html
<!-- templates/dashboard.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>분쇄기 베어링 모니터링</title>
    <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: #1a237e;
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .status-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .status-normal { border-left: 5px solid #4caf50; }
        .status-warning { border-left: 5px solid #ff9800; }
        .status-critical { border-left: 5px solid #f44336; }
        .metric {
            display: inline-block;
            margin: 10px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 5px;
        }
        .metric-value {
            font-size: 24px;
            font-weight: bold;
        }
        .metric-label {
            font-size: 12px;
            color: #666;
        }
        .chart-container {
            height: 300px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏭 분쇄기 베어링 AI 예지정비 시스템</h1>
        <p>실시간 모니터링 대시보드</p>
    </div>

    <div class="status-card" id="status-card">
        <h2>현재 상태: <span id="status-text">연결 중...</span></h2>

        <div class="metric">
            <div class="metric-value" id="health-index">--</div>
            <div class="metric-label">건강 지표</div>
        </div>

        <div class="metric">
            <div class="metric-value" id="rul-days">--</div>
            <div class="metric-label">예상 잔여 수명 (일)</div>
        </div>

        <div class="metric">
            <div class="metric-value" id="temp1">--</div>
            <div class="metric-label">베어링 온도 1 (°C)</div>
        </div>

        <div class="metric">
            <div class="metric-value" id="temp2">--</div>
            <div class="metric-label">베어링 온도 2 (°C)</div>
        </div>

        <div class="metric">
            <div class="metric-value" id="current">--</div>
            <div class="metric-label">모터 전류 (A)</div>
        </div>
    </div>

    <div class="status-card">
        <h3>건강 지표 추이</h3>
        <div class="chart-container">
            <canvas id="healthChart"></canvas>
        </div>
    </div>

    <script>
        const socket = io();

        // 차트 초기화
        const ctx = document.getElementById('healthChart').getContext('2d');
        const healthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '건강 지표',
                    data: [],
                    borderColor: '#1a237e',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        min: 0,
                        max: 1
                    }
                }
            }
        });

        // 실시간 데이터 수신
        socket.on('update', function(data) {
            // 상태 업데이트
            const statusCard = document.getElementById('status-card');
            statusCard.className = 'status-card status-' + data.status;

            const statusText = {
                'normal': '✅ 정상',
                'warning': '⚠️ 주의',
                'critical': '🚨 위험'
            };
            document.getElementById('status-text').textContent =
                statusText[data.status] || data.status;

            // 값 업데이트
            document.getElementById('health-index').textContent =
                (data.health_index * 100).toFixed(1) + '%';
            document.getElementById('rul-days').textContent =
                data.rul_days ? data.rul_days.toFixed(1) : '--';
            document.getElementById('temp1').textContent =
                data.temperature_1.toFixed(1);
            document.getElementById('temp2').textContent =
                data.temperature_2.toFixed(1);
            document.getElementById('current').textContent =
                data.motor_current.toFixed(1);

            // 차트 업데이트
            const time = new Date(data.timestamp).toLocaleTimeString();
            healthChart.data.labels.push(time);
            healthChart.data.datasets[0].data.push(data.health_index);

            // 최근 60개만 유지
            if (healthChart.data.labels.length > 60) {
                healthChart.data.labels.shift();
                healthChart.data.datasets[0].data.shift();
            }

            healthChart.update();
        });
    </script>
</body>
</html>
```

### 9.3 모니터링 시스템 시작

```bash
# 터미널에서 실행
cd ~/bearing_pdm
source bin/activate

# 메인 모니터링 실행 (터미널 출력용)
python main.py

# 또는 웹 대시보드 실행
python dashboard.py

# 웹 브라우저에서 접속
# http://[Jetson IP 주소]:5000
```

---

## 10. 6단계: 결과 해석 방법

### 10.1 상태 판정 기준

```
┌─────────────────────────────────────────────────────────────────┐
│                       상태 판정 기준표                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ✅ 정상 (Normal)                                        │   │
│  │                                                          │   │
│  │  • 건강 지표: 80% 이상                                   │   │
│  │  • 복원 오차: 임계값의 50% 미만                          │   │
│  │  • 조치: 정상 운전 계속                                   │   │
│  │  • 알림: 없음                                             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ⚠️ 주의 (Warning)                                       │   │
│  │                                                          │   │
│  │  • 건강 지표: 50~80%                                     │   │
│  │  • 복원 오차: 임계값의 50~100%                           │   │
│  │  • 조치: 점검 계획 수립, 부품 준비                        │   │
│  │  • 알림: 담당자 이메일 발송                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  🚨 위험 (Critical)                                      │   │
│  │                                                          │   │
│  │  • 건강 지표: 50% 미만                                   │   │
│  │  • 복원 오차: 임계값 초과                                │   │
│  │  • 조치: 즉시 점검, 필요 시 가동 중단                     │   │
│  │  • 알림: SMS/카카오톡 즉시 발송                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.2 지표별 해석 가이드

#### 10.2.1 RMS (진동 세기)

| RMS 값 (g) | 상태 | 의미 |
|-----------|------|------|
| < 0.5 | 양호 | 정상 범위 |
| 0.5 ~ 1.0 | 주의 | 마모 진행 중 |
| 1.0 ~ 2.0 | 나쁨 | 점검 필요 |
| > 2.0 | 위험 | 즉시 교체 |

#### 10.2.2 온도

| 온도 (°C) | 상태 | 조치 |
|-----------|------|------|
| < 50 | 정상 | 유지 |
| 50 ~ 70 | 주의 | 윤활 상태 확인 |
| 70 ~ 90 | 위험 | 과부하 또는 윤활 불량 |
| > 90 | 긴급 | 즉시 정지 |

#### 10.2.3 Crest Factor (파고율)

| Crest Factor | 상태 | 의미 |
|--------------|------|------|
| 3 ~ 5 | 정상 | 건전한 베어링 |
| 5 ~ 6 | 주의 | 초기 결함 발생 |
| 6 ~ 8 | 나쁨 | 결함 진행 중 |
| > 8 | 위험 | 심각한 손상 |

### 10.3 결함 유형별 특징

```
┌─────────────────────────────────────────────────────────────────┐
│                     결함 유형별 진동 특징                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. 외륜 결함 (Outer Race Defect)                               │
│  ───────────────────────────────                                │
│  • BPFO 주파수에서 피크 발생                                     │
│  • 일정한 진폭의 충격성 진동                                     │
│  • 결함이 고정되어 있어 패턴이 일정함                            │
│                                                                 │
│  2. 내륜 결함 (Inner Race Defect)                               │
│  ───────────────────────────────                                │
│  • BPFI 주파수에서 피크 발생                                     │
│  • 회전에 따라 진폭이 변조됨 (AM 변조)                           │
│  • 부하 영역을 통과할 때 진폭 증가                               │
│                                                                 │
│  3. 볼/롤러 결함 (Rolling Element Defect)                       │
│  ───────────────────────────────────────                        │
│  • BSF 주파수에서 피크 발생                                      │
│  • 불규칙한 패턴                                                 │
│  • 케이지 주파수로 변조됨                                        │
│                                                                 │
│  4. 윤활 불량 (Lubrication Deficiency)                          │
│  ─────────────────────────────────────                          │
│  • 고주파 대역(1~5kHz) 에너지 증가                              │
│  • 온도 상승 동반                                                │
│  • 초기에는 진동보다 온도가 먼저 증가                            │
│                                                                 │
│  5. 불균형 (Unbalance)                                          │
│  ─────────────────                                              │
│  • 1X (회전 주파수)에서 큰 피크                                  │
│  • 회전 속도에 비례하여 진동 증가                                │
│  • 수평/수직 방향 진동 크기 유사                                 │
│                                                                 │
│  6. 미스얼라인먼트 (Misalignment)                               │
│  ─────────────────────────────────                              │
│  • 2X (2차 고조파)에서 큰 피크                                   │
│  • 축방향 진동 증가                                              │
│  • 1X와 2X 비율로 판단                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 10.4 조치 가이드

| 상황 | 권장 조치 | 긴급도 |
|------|----------|:------:|
| RMS 급증 | 베어링 교체 준비, 윤활 상태 확인 | ⭐⭐⭐ |
| 온도 상승 | 윤활유 보충/교체, 과부하 확인 | ⭐⭐⭐ |
| BPFO 피크 발생 | 외륜 손상, 베어링 교체 계획 | ⭐⭐ |
| BPFI 피크 발생 | 내륜 손상, 베어링 교체 계획 | ⭐⭐ |
| 고주파 에너지 증가 | 윤활 상태 점검 | ⭐⭐ |
| 1X 피크 증가 | 불균형 점검, 밸런싱 필요 | ⭐ |
| 2X 피크 증가 | 얼라인먼트 점검 | ⭐ |

---

## 11. 유지보수 가이드

### 11.1 일상 점검 (매일)

| 점검 항목 | 방법 | 정상 기준 |
|----------|------|----------|
| Jetson 동작 상태 | LED 확인 | 녹색 LED 점등 |
| 대시보드 접속 | 웹 브라우저 | 정상 표시 |
| 센서 데이터 | 대시보드 확인 | 값 갱신됨 |
| 알림 시스템 | 테스트 알림 | 수신 확인 |

### 11.2 정기 점검 (월 1회)

| 점검 항목 | 방법 | 조치 |
|----------|------|------|
| 센서 케이블 | 육안 점검 | 손상 시 교체 |
| 센서 고정 상태 | 손으로 흔들어봄 | 느슨하면 재고정 |
| Jetson 발열 | 케이스 온도 측정 | 60°C 이하 유지 |
| 저장 공간 | df -h 명령 | 80% 이하 유지 |
| 로그 정리 | 오래된 로그 삭제 | 3개월 이상 삭제 |

### 11.3 정기 점검 (연 1회)

| 점검 항목 | 방법 | 조치 |
|----------|------|------|
| AI 모델 재학습 | 최근 데이터로 재학습 | 정확도 향상 |
| 임계값 조정 | 운영 데이터 분석 | 필요 시 조정 |
| 센서 교정 | 기준 센서와 비교 | 오차 10% 이상 시 교체 |
| 시스템 업데이트 | OS, 라이브러리 업데이트 | 보안 패치 적용 |

### 11.4 데이터 백업

```bash
# 매일 자동 백업 스크립트 (cron 등록)
#!/bin/bash

BACKUP_DIR="/home/uttec/backup"
DATE=$(date +%Y%m%d)

# 데이터 백업
tar -czf $BACKUP_DIR/data_$DATE.tar.gz /home/uttec/bearing_pdm/data/

# 모델 백업
cp /home/uttec/bearing_pdm/bearing_model.h5 $BACKUP_DIR/model_$DATE.h5

# 7일 이상 된 백업 삭제
find $BACKUP_DIR -mtime +7 -delete

echo "백업 완료: $DATE"
```

---

## 12. 문제 해결 (트러블슈팅)

### 12.1 자주 발생하는 문제

| 증상 | 원인 | 해결 방법 |
|------|------|----------|
| Jetson이 켜지지 않음 | 전원 문제 | 전원 어댑터 확인, 5V 4A 이상 사용 |
| 센서 데이터가 0 | 케이블 단선 | 케이블 연결 확인, 테스터기로 점검 |
| 데이터에 노이즈 많음 | 접지 불량 | 실드 접지 확인, 접지선 추가 |
| AI 분석 느림 | GPU 미사용 | TensorFlow GPU 버전 확인 |
| 대시보드 접속 안됨 | 네트워크 문제 | IP 주소 확인, 방화벽 설정 |
| 알림이 오지 않음 | 설정 오류 | 알림 서비스 설정 확인 |

### 12.2 로그 확인 방법

```bash
# 시스템 로그 확인
journalctl -u bearing_pdm -f

# 애플리케이션 로그 확인
tail -f /home/uttec/bearing_pdm/logs/app.log

# 에러 로그만 확인
grep -i error /home/uttec/bearing_pdm/logs/app.log
```

### 12.3 시스템 재시작

```bash
# 서비스 재시작
sudo systemctl restart bearing_pdm

# Jetson 재부팅
sudo reboot

# 네트워크 재시작
sudo systemctl restart NetworkManager
```

### 12.4 긴급 연락처

| 구분 | 담당 | 연락처 |
|------|------|--------|
| 시스템 문의 | UTTEC 기술지원 | 010-3922-1809 |
| 센서 문의 | 센서 공급업체 | (업체별 연락처) |
| 네트워크 문의 | IT 담당자 | (사내 연락처) |

---

## 13. 용어 설명

### 13.1 하드웨어 용어

| 용어 | 영문 | 설명 |
|------|------|------|
| **GPU** | Graphics Processing Unit | 그래픽 처리 장치. AI 연산을 빠르게 처리 |
| **CUDA** | Compute Unified Device Architecture | NVIDIA GPU 프로그래밍 기술 |
| **DAQ** | Data Acquisition | 데이터 수집 장치. 센서 신호를 디지털로 변환 |
| **CT** | Current Transformer | 전류 변성기. 높은 전류를 안전하게 측정 |
| **PT100** | Platinum 100Ω | 백금 저항 온도계. 정밀 온도 측정 |
| **MEMS** | Micro Electro Mechanical Systems | 초소형 기계장치. 진동센서에 사용 |

### 13.2 AI/소프트웨어 용어

| 용어 | 영문 | 설명 |
|------|------|------|
| **FFT** | Fast Fourier Transform | 고속 푸리에 변환. 시간→주파수 변환 |
| **RUL** | Remaining Useful Life | 잔여 유효 수명 |
| **PdM** | Predictive Maintenance | 예지정비 |
| **Autoencoder** | - | 데이터 압축/복원 신경망. 이상 탐지에 사용 |
| **Threshold** | - | 임계값. 정상/이상을 구분하는 기준 |
| **MSE** | Mean Squared Error | 평균 제곱 오차. 예측 오차 측정 |

### 13.3 베어링 용어

| 용어 | 영문 | 설명 |
|------|------|------|
| **BPFO** | Ball Pass Frequency Outer | 외륜 결함 주파수 |
| **BPFI** | Ball Pass Frequency Inner | 내륜 결함 주파수 |
| **BSF** | Ball Spin Frequency | 볼 회전 주파수 |
| **FTF** | Fundamental Train Frequency | 케이지 회전 주파수 |
| **RMS** | Root Mean Square | 실효값. 진동의 전체 에너지 |
| **Crest Factor** | - | 파고율. Peak/RMS 비율 |

---

## 부록: 체크리스트

### A. 설치 전 체크리스트

- [ ] 분쇄기 베어링 사양서 확보
- [ ] 센서 설치 위치 선정 완료
- [ ] 네트워크 IP 주소 할당
- [ ] 제어반 내 설치 공간 확보
- [ ] 전원 공급 확인 (5V 4A)

### B. 설치 완료 체크리스트

- [ ] 진동센서 2개 설치 완료
- [ ] 온도센서 2개 설치 완료
- [ ] 전류센서 설치 완료
- [ ] USB DAQ 연결 완료
- [ ] Jetson Orin Nano 설치 완료
- [ ] 네트워크 연결 완료
- [ ] 전원 연결 완료

### C. 시운전 체크리스트

- [ ] Jetson 부팅 정상
- [ ] 센서 데이터 수신 확인
- [ ] 데이터 저장 확인
- [ ] 대시보드 접속 확인
- [ ] 알림 테스트 완료

### D. 학습 완료 체크리스트

- [ ] 2주 이상 정상 데이터 수집
- [ ] AI 모델 학습 완료
- [ ] 임계값 설정 완료
- [ ] 테스트 분석 정상

---

**문서 끝**

---

*이 문서는 UTTEC에서 작성되었습니다.*
*문의: uttec@uttec.co.kr / 010-3922-1809*
*버전: 1.0 (2026-01-15)*
