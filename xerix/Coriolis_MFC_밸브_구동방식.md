# 반도체 공정용 Coriolis MFC 밸브 구동 방식 상세 검토

> Coriolis 질량유량계(Mass Flow Meter, MFM)로 유량을 측정하고,
> 측정값을 기반으로 PID 제어 루프를 통해 밸브를 구동하여
> 설정 유량(Setpoint)을 유지하는 **Coriolis MFC(Mass Flow Controller)** 의
> 밸브(Control Valve) 구동 방식 정리.

---

## 0. MFC 제어 루프 구조 (전체 개요)

```
 ┌──────────────┐   측정 Flow    ┌──────────┐   Error    ┌─────────┐   구동신호   ┌──────────┐
 │  Coriolis    │ ─────────────▶ │   ADC    │ ─────────▶ │  PID    │ ──────────▶ │  Valve   │
 │  Sensor Tube │                │ (16bit+) │            │ (MCU)   │             │  Driver  │
 └──────────────┘                └──────────┘            └────┬────┘             └────┬─────┘
        ▲                                                     │                        │
        │                                 Setpoint (EtherCAT) │                        ▼
        │                                                     ▼                   ┌──────────┐
        └────────────────── 실제 유량 ◀──────────────────────────────────────────│ Valve 개도 │
                                                                                  └──────────┘
```

**핵심 포인트**
- Coriolis는 **진짜 질량유량**(kg/s)을 직접 측정 → 온도/압력 보상 불필요
- 밸브는 **비례 제어(proportional)** 가능해야 함 (ON/OFF 불가)
- 반도체 공정은 **Ultra-Clean**, **Metal Sealed**, **Zero-dead-volume** 요구
- 응답시간 보통 **< 1 sec**, 고급형 **< 300 ms** 요구

---

## 1. 반도체용 MFC 밸브에 요구되는 조건

| 요구사항 | 세부 내용 | 이유 |
|---|---|---|
| **비례 제어** | 0~100% 연속 개도 제어 | PID 루프 적용 |
| **고응답성** | τ < 100~300 ms | 공정 안정화 |
| **Zero Dead Volume** | 밸브 내부 잔존 용적 최소 | 퍼지/Gas 교체 시간 단축 |
| **All-Metal Seal** | Hastelloy, SUS316L, Elgiloy 다이어프램 | O-ring 불가 (Outgassing / HF 부식) |
| **High Purity** | 내부 전해연마(EP) Ra < 0.13 μm | 파티클 / Metal Contamination 방지 |
| **Chemical Resistance** | HF, Cl₂, BCl₃, NH₃, WF₆ 등 내성 | 식각/증착 공정 가스 |
| **Leak Rate** | He Leak < 1×10⁻⁹ atm·cc/s | UHV/UHP 요구 |
| **Hysteresis** | < 0.2% F.S. | 정밀 제어 |
| **재현성** | < 0.2% F.S. | Run-to-Run 일관성 |

---

## 2. MFC 밸브 구동 방식 5가지 — 원리/특성 비교

### 2.1 솔레노이드 비례 밸브 (Proportional Solenoid Valve)

**원리**
- 코일에 흐르는 전류에 비례하여 플런저(Plunger)가 변위 → 다이어프램을 통해 유로 개폐
- 스프링 복원력과 전자력의 균형점에서 개도 결정

**회로**
- 전류원(Current Source) 구동, PWM 제어 (수 kHz)
- 히스테리시스 보상을 위해 **Dither 신호**(수십 Hz 미세 진동) 인가

**장단점**
| 장점 | 단점 |
|---|---|
| 저가 ($50~150) | 응답 느림 (τ ≈ 500 ms ~ 1 s) |
| 구조 단순, 신뢰성↑ | 코일 발열 → 영점 드리프트 |
| 대유량 가능 | 히스테리시스 큼 (1~2%) |
| 저전압(24V) 구동 | 자기장 영향 |

**적용**
- Bronkhorst EL-FLOW Select, Brooks 5850E 등 **범용 가스 MFC**
- Coriolis 고정밀 MFC에는 **저가형에만** 사용

---

### 2.2 **피에조 비례 밸브** (Piezoelectric Valve) ⭐ **반도체 Coriolis MFC 표준**

**원리**
- **PZT(Lead Zirconate Titanate) 압전소자** 에 인가된 전압에 비례하여 기계적 변위 발생
- Piezo Stack 또는 Bimorph가 다이어프램(Metal Diaphragm)을 밀어 유로 개폐
- 변위 범위: **수 μm ~ 수십 μm** (매우 작지만 기계적 증폭 구조 사용)

**구동 회로**
- **고전압 앰프** (0~150V DC, 일부 0~200V)
- 정전용량성 부하 (수 nF~수십 nF) → 전류 피크 주의
- Charge Mode 또는 Voltage Mode 구동

**장단점**
| 장점 | 단점 |
|---|---|
| **초고속 응답** (τ < 50~200 ms) ⭐ | 고전압 필요 (150V) |
| **히스테리시스 작음** (< 0.1%) | 온도 드리프트 있음 → 보상 회로 필요 |
| 발열 거의 없음 | 큰 유량 제어 어려움 |
| 비접촉 → 마찰/마모 無 | 고가 ($500~1500) |
| 매우 미세한 제어 | Piezo 노화 (장기 Creep) |

**적용 (반도체 표준)**
- **Horiba Z500/Z512** — Z-Piezo 액추에이터
- **Brooks GF135 / Quantim** — Piezo
- **MKS π-MFC, G-Series** — Piezo
- **Bronkhorst mini CORI-FLOW M12/M13** — Piezo (선택)
- **Fujikin FCST** — Piezo

**Coriolis MFC에 피에조가 표준인 이유**
1. Coriolis 센서의 측정 정밀도(0.2%)에 맞는 밸브 분해능 필요
2. 공정 응답시간 < 500 ms 요구를 충족
3. 반도체 공정 가스 특성상 금속 다이어프램 필수 → Piezo 미소 변위가 적합
4. Dead Volume 최소화 가능 (다이어프램 직접 밀기)

---

### 2.3 열팽창 / SMA(Shape Memory Alloy) 밸브

**원리**
- SMA 와이어(Nitinol 등)에 전류를 흘려 발열 → 상변태(Martensite↔Austenite) → 변위
- 또는 Bimetal / Wax 열팽창 방식

**장단점**
| 장점 | 단점 |
|---|---|
| 구조 매우 단순 | **응답 극히 느림** (τ > 2~5 s) |
| 저전력 | 정밀도 낮음 |
| 저가 | 온도 환경 민감 |

**적용**
- **Coriolis MFC에는 부적합** (응답 속도 부족)
- 저가 Thermal MFC의 바이패스 제어 등 제한적 용도

---

### 2.4 스텝 모터 / 마이크로 모터 구동 니들 밸브

**원리**
- Stepper / BLDC / VCM(Voice Coil Motor)이 스핀들 회전 → 니들 포지션 변경
- 엔코더로 포지션 피드백

**장단점**
| 장점 | 단점 |
|---|---|
| 대유량/광범위 가능 | 구조 복잡, 부피↑ |
| 절대 위치 제어 | 응답 상대적 느림 (τ ≈ 300~800 ms) |
| 장기 안정성↑ | 마모/윤활 문제 |
| 전원 OFF 시 위치 유지 | 파티클 발생 우려 |

**적용**
- **액체 공정** (Photoresist, Slurry) CMP 영역
- **Bronkhorst CORI-FLOW (액체용 대유량)** 일부 모델
- 반도체 가스 MFC에는 **거의 안 씀**

---

### 2.5 VCM (Voice Coil Motor) 직동식 밸브

**원리**
- 영구자석 + 코일의 로렌츠 힘 → 직선 변위 (스피커 원리)
- 다이어프램 직접 구동

**장단점**
| 장점 | 단점 |
|---|---|
| 빠른 응답 (τ ≈ 100~300 ms) | 자기장 외부 영향 |
| 선형성 우수 | 고정밀 VCM 고가 |
| 힘 조절 용이 | Piezo보다 변위 크지만 정밀도 낮음 |

**적용**
- **Horiba Z-series 일부**
- **Proportion-Air 등 특수 밸브**
- Coriolis MFC 옵션으로 채택

---

## 3. 5가지 방식 종합 비교표

| 구동 방식 | 응답 τ | 히스테리시스 | 분해능 | 가격 | 반도체 적합 | Coriolis MFC 채택 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Solenoid 비례 | 500~1000 ms | 1~2% | 중 | ★☆☆ | △ | 저가형만 |
| **Piezo** ⭐ | **50~200 ms** | **< 0.1%** | **매우 높음** | ★★★ | ◎ | **표준** |
| SMA/Thermal | 2~5 s | 2~5% | 저 | ★☆☆ | ✗ | 미사용 |
| Stepper/BLDC | 300~800 ms | 0.3% | 높음 | ★★☆ | △ | 액체용 |
| VCM | 100~300 ms | 0.2% | 높음 | ★★★ | ○ | 선택적 |

---

## 4. 피에조 밸브 구동 회로 상세 (Xerix 설계 참고)

### 4.1 회로 블록 다이어그램

```
 MCU DAC (0~3.3V)
      │
      ▼
 ┌─────────────┐   0~150V    ┌──────────┐
 │ HV Amplifier│ ──────────▶ │  Piezo   │
 │  (Op-amp +  │             │  Stack   │
 │   HV BJT)   │◀─ 전류 피드백│          │
 └─────────────┘             └──────────┘
      ▲
      │
 VIN (±150V 부스트)
 ┌─────────────┐
 │ Flyback /   │
 │ Boost DC-DC │ ◀── 24V 입력
 └─────────────┘
```

### 4.2 주요 IC 후보

| 부품 | 제조사 | 특징 |
|---|---|---|
| **DRV2700** | TI | Piezo Haptic Driver, 내장 Boost, 최대 200Vpp |
| **PDU150** | PiezoDrive | 전용 Piezo Amplifier, 0~150V, 빠른 Slew |
| **APEX PA94/PA98** | Apex Micro | High Voltage Op-amp, 정밀 아날로그 제어 |
| **LT3469/LT3482** | Analog Devices | Piezo driver with boost converter |
| **MAX7490** | Maxim | 고전압 정밀 구동 |

### 4.3 설계 고려사항
- **충전전류 피크**: I = C · dV/dt → 수 nF 부하에 빠른 응답 시 수백 mA 피크
- **방전 경로**: 전압 하강 시 Sink 전류 확보 필요 (Push-pull 구성)
- **온도 보상**: Piezo 변위는 온도 의존성 있음 → Coriolis 온도 센서와 함께 LUT 적용
- **개방루프 선형성 부족** → 반드시 Coriolis 피드백 기반 PID로 보상
- **히스테리시스**: Preisach Model 또는 간단히 PID로 충분 보정

---

## 5. Xerix PIO Type Coriolis MFC 권장 구성

### 5.1 권장 밸브
- **1차 선택**: **Piezo Stack Valve + Metal Diaphragm**
  - 다이어프램 재질: **Hastelloy C-22** (범용) 또는 **Elgiloy** (부식성 가스)
  - 유로 재질: 316L EP, Ra < 0.13 μm
  - Orifice 교체식 설계 → 유량 범위 모듈화
- **2차 대안 (대유량용)**: VCM 직동식

### 5.2 회로 권장 구성 (STM32H723 기준)

```
STM32H723 DAC1_OUT1 (12bit, 0~3.3V)
    │
    ▼
 PDU150 또는 DRV2700 (HV Amp)
    │ 0~150V
    ▼
 Piezo Stack (예: PI P-885 / Noliac NAC2125)
    │
    ▼
 Metal Diaphragm → Orifice → Coriolis Sensor Tube
                                   │
                                   ▼
                        STM32H723 ADC3 (16bit, 진동 Pickup)
                                   │
                                   ▼
                         PID @ 1ms (EtherCAT DC SYNC0)
```

### 5.3 PID 제어 루프 타이밍
| 항목 | 값 |
|---|---|
| 제어 주기 | **1 ms** (EtherCAT DC SYNC0) |
| Coriolis 신호 샘플링 | 16 kHz (센서 튜브 공진 주파수 약 100~300 Hz 기준 50배 오버샘플) |
| PID 계산 | STM32H7 CORDIC 가속 불필요, DP FPU로 충분 |
| DAC 갱신 | 매 1 ms |
| 설정값 통신 | EtherCAT PDO (SYNC0 1 ms) |

---

## 6. 산업계 대표 제품 — 밸브 구동 방식 조사

| 제품 | 제조사 | 센서 | 밸브 구동 | 응답 (τ) |
|---|---|---|---|:---:|
| **Brooks Quantim QMA/QMB** | Brooks Instrument (US) | Coriolis | Piezo | < 1 s |
| **Bronkhorst mini CORI-FLOW M13** | Bronkhorst (NL) | Coriolis | Piezo 또는 Solenoid 선택 | < 500 ms |
| **Horiba Z512** | Horiba (JP) | Pressure-based | Z-Piezo | < 300 ms |
| **MKS π-MFC** | MKS (US) | Pressure-based | Piezo | < 1 s |
| **Fujikin FCST** | Fujikin (JP) | Thermal/Pressure | Piezo | < 1 s |
| **Horiba SEC-Z700** | Horiba (JP) | Pressure-based | Solenoid | < 1 s |

**관찰**
- **반도체 등급 고정밀 MFC는 Piezo가 사실상 표준**
- Bronkhorst만 Coriolis + Solenoid 조합 저가 라인 유지
- Horiba Z-series는 자체 설계 Piezo 액추에이터 → 최단 응답 달성

---

## 7. Xerix 개발 로드맵 — 밸브 관련 Phase

| Phase | 내용 | 비고 |
|:---:|---|---|
| **P0** | Piezo Stack 샘플 구매 (PI/Noliac/TDK) + PDU150 평가 보드 | 2~3주 |
| **P1** | STM32H723 + DAC + PDU150 → 단독 Piezo 변위 제어 확인 | 오실로스코프로 응답 τ 측정 |
| **P2** | 더미 다이어프램 + 공기압 → 유량 변화 확인 (Coriolis 없이) | Thermal MFC로 참조 측정 |
| **P3** | Coriolis 센서 결합 → 폐루프 PID 제어 완성 | EtherCAT SYNC0 결합 전 단독 테스트 |
| **P4** | EtherCAT 결합 → Setpoint PDO 입력 | Beckhoff SSC + X-CUBE-ECAT |
| **P5** | 반도체 공정 가스 인증 (N₂→He→공정 가스) | 별도 실링 검증 |

---

## 8. 참고 문헌 / 링크

### 공식 자료
- **Bronkhorst mini CORI-FLOW Technical Documentation**
  - https://www.bronkhorst.com/en-us/products-en/coriolis-mass-flow-meters-and-controllers/mini-cori-flow/
- **Brooks Quantim Series Datasheet**
  - https://www.brooksinstrument.com/en/products/mass-flow-controllers/coriolis/quantim-qmb
- **Horiba Z512 Application Note — Z-Piezo Actuator**
  - https://www.horiba.com/kor/semiconductor/products/mass-flow-controllers/

### 기술 논문
- "Piezoelectric Actuators for Mass Flow Controllers in Semiconductor Processing", SEMI Technology Symposium
- "Coriolis Mass Flow Measurement for Ultra-High-Purity Gas Delivery", Journal of the IEST
- "Control Valve Design for Semiconductor Gas Delivery Systems", Solid State Technology

### Piezo 드라이버 IC
- **TI DRV2700**: https://www.ti.com/product/DRV2700
- **PiezoDrive PDU150**: https://www.piezodrive.com/drivers/pdu150-piezo-driver/
- **Apex Micro PA94**: https://www.apexanalog.com/products/pa94.html

---

## 9. 결론 — Xerix 권장 사양

| 항목 | 권장 |
|---|---|
| **유량 센서** | Coriolis Mass Flow Sensor (기본) + Pressure-based (프리미엄 하이브리드) |
| **밸브 구동 방식** | **Piezo Stack + Metal Diaphragm** ⭐ |
| **Piezo 드라이버 IC** | PiezoDrive PDU150 또는 TI DRV2700 (초기 평가) → 자체 Apex PA94 기반 HV 회로 (양산) |
| **다이어프램 재질** | Hastelloy C-22 (범용) / Elgiloy (부식성 가스) |
| **제어 MCU** | STM32H723 (16bit ADC + DP FPU + Ethernet) |
| **제어 주기** | 1 ms (EtherCAT DC SYNC0 동기) |
| **목표 응답 τ** | < 300 ms (1%→99%) |
| **목표 히스테리시스** | < 0.2% F.S. |
| **목표 재현성** | < 0.2% F.S. |

**핵심 메시지**
> 반도체 공정용 Coriolis MFC의 밸브 구동 방식은 **피에조(Piezo) 직동식이 사실상 업계 표준**이다.
> 이유는 (1) ms 단위 초고속 응답, (2) 서브퍼센트 히스테리시스, (3) 금속 다이어프램과의 기계적 호환성 때문이며,
> Xerix의 고도화 MFC Controller는 **STM32H723 + PDU150(또는 DRV2700) + Piezo Stack + Metal Diaphragm** 구성을 권장한다.
> 초기 개발은 Piezo 평가보드 단독 → 더미 유량 → Coriolis 결합 → EtherCAT 결합의 4단계 Phase로 진행한다.

---

**문서 작성일**: 2026-04-08
**작성자**: Xerix EtherCAT MFC Controller 기술 검토 세션
**관련 문서**:
- `EtherCAT_Role_STM32F3_설계검토.md`
- `ESC_EtherCAT_Slave_Controller_설명.md`
- `STM32F3_vs_STM32H7_EtherCAT_비교.md`
- `EtherCAT_Slave_플랫폼_개발리소스_비교.md`
- `PIO_Type_MFC_개발_개요.md`
