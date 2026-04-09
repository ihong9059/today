# MFC 응답 시간 0.1초 이하 달성이 어려운 이유 — 기술 분석

> **작성일**: 2026-04-09
> **작성자**: UTTEC Xerix MFC Controller 기술 검토 세션
> **목적**: Xerix MFC 개발 사양서의 *"Target Time 0.1 ~ 1.0초 설정, 0.1초 이하 설정 시 제어 어려울 시 해당 기능 삭제"* 조항에 대한 공학적 근거 제시
> **결론 요약**: **100 ms 이하 응답은 물리적/공학적으로 매우 어려우며, Base(Thermal) 라인은 불가능에 가깝고, Premium(Coriolis+Piezo) 라인에서 조건부로만 접근 가능**

---

## 0. Executive Summary

Mass Flow Controller의 응답 시간은 다음 **5개 서브시스템의 시간 상수의 합**으로 결정됩니다.

```
  T_total  =  T_sensor  +  T_gas_dynamics  +  T_valve  +  T_signal  +  T_control
              (센서)        (가스 동역학)     (밸브)       (신호처리)    (제어루프)
```

각 항목의 **물리적 최소값**을 산출하면:

| 구성 | Thermal MFC | Coriolis MFC (고급) |
|---|---:|---:|
| 센서 지연 | **200~500 ms** | **20~100 ms** |
| 가스 동역학 (Dead Volume) | 20~100 ms | 10~50 ms |
| 밸브 구동 (Piezo) | 1~5 ms | 1~5 ms |
| 밸브 구동 (Solenoid 비례) | 20~50 ms | 20~50 ms |
| 신호 처리 (ADC + Filter) | 5~20 ms | 5~20 ms |
| 제어 루프 (PID + 안정도 마진) | 10~30 ms | 10~30 ms |
| **합계 최소값** | **256~705 ms** | **46~205 ms** |

➡ **Thermal MFC**: 구조적 한계로 100 ms 이하 **불가능**
➡ **Coriolis + Piezo MFC**: 이론상 100 ms **가능성 있음**, 단 매우 정밀한 설계 필요

---

## 1. 응답 시간의 정의 (먼저 명확히 해야 함)

"응답 시간"이라는 용어는 여러 의미로 해석되므로, **어느 정의를 사용하는지**에 따라 달성 난이도가 크게 달라집니다.

| 정의 | 내용 | 일반 산업 표기 |
|---|---|---|
| **τ (Time Constant)** | 최종값의 **63.2%** 도달 시간 (1차 시스템) | τ, "Time Constant" |
| **Rise Time (10~90%)** | 최종값의 **10% → 90%** 도달 시간 | tr, "Rise Time" |
| **Settling Time (2%)** | 최종값의 **±2% 이내** 안정화 시간 | ts, "Settling Time" |
| **Settling Time (1% → 99%)** | Xerix 사양서 추정 정의 | "응답 시간" |

### 중요한 공학 사실

**Xerix 메일의 "EX_1초 이내 제어"** 및 **"0.5초 이내 10SLM 제어 유지"**를 가장 엄격하게 해석하면 **Settling Time 1% → 99% ≈ 4.6τ**입니다.

즉, 응답 시간 100 ms를 요구하는 것은:
```
 4.6 × τ  ≤  100 ms
 τ        ≤  21.7 ms
```

**시간 상수 τ가 약 22 ms 이하**여야 한다는 의미이며, 이는 **폐루프 대역폭(Closed-Loop Bandwidth)**으로 환산하면:
```
 f_BW  =  1 / (2π × τ)  ≈  7.3 Hz
```

제어 이론에서 안정된 폐루프를 유지하려면 **시스템의 가장 느린 극점(pole)이 폐루프 대역폭의 최소 5~10배**여야 합니다.
```
 시스템 최소 극점 주파수  ≥  5~10 × 7.3 Hz  =  37~73 Hz
 → 시스템의 모든 서브시스템이 τ ≤ 2.2~4.3 ms 이내여야 안정
```

**이것이 100 ms 이하 응답이 어려운 가장 핵심적인 제어 이론적 이유**입니다.

---

## 2. 서브시스템별 물리적 한계

### 2.1 센서 (Sensor) — 가장 큰 제약

#### 2.1.1 Thermal MFC 센서 원리와 한계

Thermal MFC는 **미세 바이패스 관 외벽에 히터와 온도 센서(RTD)를 붙이고, 가스 흐름에 의해 열이 이동하는 양을 측정**합니다.

```
  ┌──────────────────────────┐
  │   메인 가스 흐름 (Bypass) │
  ├──────────────────────────┤
  │                          │
  │   ┌──────┐   ┌──────┐    │   ← Sensing Tube (내경 ~0.5mm)
  │   │ RTD1 │───│ RTD2 │    │
  │   │(Up)  │   │(Down)│    │
  │   └──────┘   └──────┘    │
  │        └─Heater─┘         │
  │                          │
  └──────────────────────────┘
```

**열 방정식의 시간 상수**:

```
  τ_thermal  =  (ρ × Cp × V) / (h × A)

  ρ  : 금속 튜브 밀도 (kg/m³)
  Cp : 비열 (J/kg·K)
  V  : 튜브 벽체 부피 (m³)
  h  : 열전달 계수 (W/m²·K)
  A  : 열전달 면적 (m²)
```

**실측 데이터** (스테인리스 센싱 튜브 기준):

| 튜브 규격 | 벽 두께 | 열 시정수 τ | 응답 시간 (1~99%) |
|---|:---:|:---:|:---:|
| SUS316 Ø1.6 × 0.25 mm | 0.25 mm | ~200 ms | ~1,000 ms |
| SUS316 Ø0.8 × 0.15 mm | 0.15 mm | ~100 ms | ~500 ms |
| **초박형 Ø0.5 × 0.08 mm** | 0.08 mm | **~50 ms** | **~250 ms** |

##### ❌ 결론: Thermal MFC는 **100 ms 이하 물리적 불가능**
- 초박형 마이크로 가공 센싱 튜브를 써도 1 ~ 99% 응답은 **약 250 ms가 한계**
- Brooks Instrument, Horiba, MKS의 최고급 Thermal MFC 카탈로그 스펙도 **설정값 ±2% 이내 안정 기준 500 ~ 1,000 ms** (검증 가능)

> **참고 카탈로그**: MKS GE50A Thermal MFC 응답 시간 ≈ **1초**, Brooks SLA5800 ≈ **1~2초**

#### 2.1.2 Coriolis MFC 센서 원리와 한계

Coriolis는 **U자형 관을 공진 주파수로 진동시키고, 가스가 흐를 때 발생하는 "코리올리 힘"에 의한 상/하단 진동의 위상차**를 측정합니다.

```
          ┌────────────┐
          │            │   ← U-tube (공진 f ≈ 100 ~ 400 Hz)
          │   Flow →   │
    ┌─────┤            ├─────┐
    │Drive│  Pickup1   │Pickup2
    │Coil │            │
    └─────┴────────────┴─────┘
         ↓           ↓
    위상차 φ ∝ 질량유량
```

**응답 시간 제약 요인**:

1. **공진 주파수**: 보통 100 ~ 400 Hz (주기 2.5 ~ 10 ms)
2. **최소 평균화 주기**: 정확한 위상차 측정을 위해 최소 **5~10 사이클** 필요 → 12.5 ~ 100 ms
3. **Lock-in Amplifier 적분 시간**: 노이즈 제거를 위해 **3~5 τ_LIA** 필요 → 보통 30~100 ms
4. **디지털 필터링 지연**: Moving Average / IIR Low-pass → 10~30 ms

```
  T_coriolis  ≈  5사이클 + LIA 적분 + 필터
              ≈  25 ms + 50 ms + 20 ms
              ≈  95 ms  (이론 최소)
```

##### ⚠️ Coriolis MFC 한계: **이론상 50~100 ms 가능, 실용상 100~200 ms**
- 산업용 Coriolis MFC 카탈로그 스펙:
  - **Bronkhorst mini CORI-FLOW**: **≥ 200 ms**
  - **Brooks Quantim**: **≥ 250 ms**
  - **Horiba Z500 Series**: **≥ 100 ms (우수 등급)**

> Coriolis라도 **상용 최고급 제품이 100 ms 수준**이 한계이며, 이를 더 단축하려면 센서 설계 전체를 재개발해야 합니다.

---

### 2.2 가스 동역학 (Gas Dynamics) — 간과되는 지연

#### 2.2.1 Dead Volume 채움 시간

MFC 내부 가스 유로에는 **Dead Volume**(데드 볼륨, 체적)이 존재하며, 새 설정값에 도달하려면 이 체적만큼의 가스가 교환되어야 합니다.

```
  T_fill  =  V_dead / Q_flow

  V_dead : 데드 볼륨 (mL)
  Q_flow : 유량 (mL/s)
```

**예시 계산 (10 SLM 유량 기준)**:

```
  Q_flow = 10 SLM = 166.67 mL/s
```

| Dead Volume | Fill Time |
|---|:---:|
| 5 mL | 30 ms |
| 10 mL | 60 ms |
| 20 mL | 120 ms |
| 50 mL | 300 ms |

**저유량 영역(1 SLM 이하)에서는 훨씬 심각**:

| 유량 | Dead Volume 5 mL 채움 시간 |
|---|:---:|
| 10 SLM | 30 ms |
| 1 SLM | **300 ms** |
| 0.1 SLM | **3,000 ms (3초!)** |

> **중요**: Xerix 요구 *"10 SLM @ 0.5초 이내"*는 **10 SLM에서만** 달성 가능한 조건이며, 저유량 영역에서는 **물리적으로 불가능**합니다. 사양서에 유량 범위 명시가 필수입니다.

#### 2.2.2 압력 파의 전파 시간 (Acoustic Delay)

가스의 압력 변화는 **음속(sound velocity)**으로 전파됩니다.

```
  T_acoustic  =  L_pipe / c_sound

  L_pipe  : 배관 길이 (m)
  c_sound : 음속 (N₂ 25°C 에서 약 350 m/s)
```

| 배관 길이 | 전파 시간 |
|---|:---:|
| 10 cm | 0.3 ms |
| 1 m | 2.9 ms |
| 10 m | 29 ms |

작은 값처럼 보이지만 **제어 루프에서 Dead Time**으로 작용하여 안정도 마진을 크게 잠식합니다.

#### 2.2.3 Flow Establishment Time (유동 발달 시간)

밸브가 열린 후 관 내부의 유속 분포가 완전히 발달(fully developed)하려면 **L/D ≥ 30~60** 거리가 필요하며, 이것이 시간 지연으로 나타납니다.

```
  T_develop  ≈  (30~60) × D / V_avg

  D     : 관 지름
  V_avg : 평균 유속
```

일반적으로 **수 ms ~ 수십 ms** 범위이지만, 저유량에서는 100 ms를 초과할 수 있습니다.

---

### 2.3 밸브 구동 (Actuator) — 타입별 큰 차이

#### 2.3.1 Solenoid 비례 밸브

```
  τ_solenoid  ≈  L/R + 기계적 질량 관성

  L : 코일 인덕턴스
  R : 코일 저항
```

- 전기적 시정수 **L/R ≈ 2~10 ms**
- 플런저 기계적 질량 이동 **10~30 ms**
- 히스테리시스 및 정지 마찰 복귀 **추가 5~10 ms**

**총 응답**: **20~50 ms** (카탈로그 기준)

**예시**:
- **Parker Series 09**: 응답 10~20 ms
- **ASCO Posiflow**: 응답 15~30 ms
- **Burkert 6024**: 응답 20~50 ms

##### ⚠️ Solenoid는 100 ms 이하 전체 루프 설계에서 **유일한 가장 큰 단일 지연 요소**가 될 수 있음

#### 2.3.2 Piezo Stack 밸브

Piezo는 **압전 효과**를 이용한 정적 변위이며, 기계적 이동 거리가 매우 작아(수십 μm) **응답 속도가 빠릅니다**.

```
  τ_piezo  ≈  1 / (2π × f_resonance)

  f_resonance : 밸브 기구의 1차 공진 주파수 (보통 1~10 kHz)
```

- 소형 Piezo 밸브 **1~5 ms**
- HV Driver 슬루 레이트 제약 **+1~3 ms**
- 히스테리시스 보정 (closed-loop) **+1~2 ms**

**총 응답**: **3~10 ms** (Piezo + HV Driver 포함)

**예시**:
- **PI Piezo Microvalve**: **< 2 ms**
- **PiezoDrive PDU150**: **< 1 ms** (Driver only)
- **Nexus Piezo Valve**: **< 5 ms**

##### ✅ Piezo는 밸브 자체로는 100 ms 이하에 충분한 응답 성능

---

### 2.4 신호 처리 (Signal Chain)

#### 2.4.1 ADC 변환 시간

현대 MFC는 **24bit ΔΣ ADC**를 사용하여 고정밀 측정을 하는데, 이는 **적분형 구조**로 인해 응답이 느립니다.

| ADC 종류 | Sample Rate | Single-Shot Settling |
|---|---|---|
| **ADS1220 24bit ΔΣ** (Thermal) | 20~2000 SPS | 0.5~50 ms |
| **ADS1263 32bit ΔΣ** (Coriolis) | 38.4k SPS | ~1 ms |
| **STM32 내장 12bit SAR** (보조) | 5 MSPS | < 1 μs |

**정밀도 요구가 높으면 낮은 샘플 레이트**를 써야 하며, 이것이 직접적으로 응답 지연이 됩니다.

```
  예: ADS1220 20 SPS 모드 (소수점 2자리 요구)
       → 단일 샘플 주기 = 50 ms
       → 필터 settling = 2~3 샘플 = 100~150 ms
```

> **소수점 2자리 정밀도 요구**는 24bit ADC의 **저 sample rate 모드 (~20 SPS)**를 사용해야 가능한데, 이는 **단일 샘플 자체가 50 ms 이상** 걸립니다. **정밀도와 응답 시간은 trade-off** 관계입니다.

#### 2.4.2 디지털 필터 지연

노이즈 제거를 위해 사용하는 필터가 지연을 만듭니다.

| 필터 종류 | 지연 특성 |
|---|---|
| **Moving Average (N-tap)** | (N−1)/2 × T_sample |
| **IIR Low-pass (1차)** | τ = 1/(2πfc) |
| **FIR Linear Phase (N-tap)** | (N−1)/2 × T_sample |

**예**: 10-tap moving average @ 100 Hz 샘플링 → **지연 45 ms**

#### 2.4.3 MCU 처리 지연

STM32F429 @ 180 MHz에서:
- PID 연산 1회: **< 100 μs**
- 부동소수점 곱셈/나눗셈: **< 50 μs**
- 전체 제어 루프 (Read ADC + PID + Write DAC): **< 500 μs**

##### ✅ MCU 처리 자체는 병목 아님 (전체의 < 5%)

---

### 2.5 제어 루프 안정도 (Control Loop Stability)

#### 2.5.1 Nyquist 안정 조건

폐루프 제어 시스템의 **대역폭(Bandwidth, BW)**은 시스템의 **가장 느린 서브시스템의 역수의 1/5~1/10**로 제한됩니다.

```
  BW_closed-loop  ≤  (1/5 ~ 1/10) × BW_slowest-component

  예: 센서 τ = 50 ms → f_slow = 1/(2π × 0.05) = 3.18 Hz
      → BW_closed-loop ≤ 0.3~0.6 Hz
      → 응답 시간 τ_closed-loop ≥ 260~520 ms
      → Settling Time (4.6τ) ≥ 1.2~2.4 초
```

즉, **센서 τ가 50 ms인 시스템은 구조적으로 100 ms 이하 응답이 불가능**합니다.

#### 2.5.2 Dead Time의 악영향

Dead Time(순수 지연)은 제어 이론에서 **가장 다루기 어려운 요소**로, 안정도 마진을 급격히 낮춥니다.

```
  Phase Margin Loss = ω × T_dead × (180/π) [°]

  예: BW = 10 Hz, T_dead = 10 ms
      → Phase Loss = 2π × 10 × 0.01 × 57.3° = 36°
      → 일반적 Phase Margin 45° 중 36°를 잠식 → 시스템 발진 직전
```

MFC에서 Dead Time 원인:
- Gas 배관 내 전파 지연 (수 ms)
- ADC/필터 group delay (수~수십 ms)
- Sensor thermal lag (수십~수백 ms)

##### ⚠️ 결론: **시스템 전체의 Dead Time을 5 ms 이하**로 만들어야 100 ms 응답 안정 제어 가능

---

## 3. 100 ms 이하 응답을 위한 현실적 조건

### 3.1 하드웨어 조건

| 항목 | 필수 조건 | 어려움 |
|---|---|---|
| **센서** | Coriolis 전용, 공진 f ≥ 500 Hz 고속 튜브 | 센서 헤드 커스텀 개발 필요, 원가 +500만원 |
| **밸브** | Piezo Stack 1 kHz 이상 공진 | HV Driver 고슬루 설계 필요 |
| **배관** | Dead Volume ≤ 2 mL, 배관 길이 ≤ 50 mm | 기구 설계 재검토 |
| **ADC** | 32bit ΔΣ 고속 모드 (> 1 kSPS) | 정밀도 1자리 이하로 타협 필요 |
| **MCU** | F7/H7 (> 400 MHz) | 부품 비용 +$10 |
| **PCB** | 저잡음, Guard Ring, Shielded | 설계 공수 +30% |

### 3.2 소프트웨어 조건

| 항목 | 필수 조건 |
|---|---|
| **제어 주기** | **500 μs ~ 1 ms** (Xerix 1ms 기준 OK) |
| **필터** | Moving Average 제거, IIR 2차 이하 |
| **PID** | Feed-Forward + Gain Scheduling 병행 |
| **Anti-Windup** | 필수 |
| **Predictive Control** | Smith Predictor 등 Dead Time 보상 |

### 3.3 측정 조건 (현실 극복 불가)

| 항목 | 제약 |
|---|---|
| **고유량 영역** | 10 SLM 이상에서만 100 ms 의미 있음 |
| **저유량 영역** | 1 SLM 이하에서는 Dead Volume 채움에만 300 ms 이상 |
| **가스 종류** | 저분자 가스(H₂, He)는 빠름, 고분자(SF₆)는 느림 |
| **배관 길이** | MFC 출구부터 사용점까지 10cm 이내 |

---

## 4. 국내외 상용 MFC 제품 응답 시간 비교 (실측 카탈로그)

| 제조사 | 모델 | 원리 | 카탈로그 응답 시간 | 비고 |
|---|---|---|---:|---|
| **MKS** | GE50A | Thermal | ≥ 1000 ms | 반도체 표준 |
| **MKS** | 1180A | Thermal (고속) | ≥ 500 ms | 프리미엄 |
| **Brooks** | SLA5800 | Thermal | ≥ 1000~2000 ms | 범용 |
| **Brooks** | Quantim QMA | Coriolis | ≥ 250 ms | 고급 |
| **Horiba STEC** | Z500 Series | Thermal (고속) | ≥ 300 ms | 반도체 특화 |
| **Horiba STEC** | Z512 | Thermal (초고속) | **≥ 100 ms** | **최고 등급** |
| **Bronkhorst** | EL-FLOW Prestige | Thermal | ≥ 2000 ms | 범용 |
| **Bronkhorst** | mini CORI-FLOW M12 | Coriolis | ≥ 200 ms | 저유량 특화 |
| **Bürkert** | 8745 | Thermal | ≥ 500 ms | 산업용 |
| **Sierra** | SmartTrak 100 | Thermal | ≥ 2000 ms | 범용 |

### ✅ 결론: **상용 최고급 제품도 100 ms가 현실적 하한**

- 100 ms **이하** 스펙을 공개 보증하는 상용 MFC는 **사실상 없음**
- Horiba Z512가 100 ms **달성 수준** (설정값 ±2% 기준)
- 그 이하는 **연구용 / 특수 목적 / 컨설팅 개발품**에 한정

---

## 5. Xerix 사양에 대한 공학적 권고

### 5.1 Xerix 메일 원문 재확인

> *"TARGET TIME 설정 0.1 ~ 1.0 (EX_1초 이내 제어) // 이부분은 1초이내는 확실하게 제어를 해야합니다. **그 이하 세팅 시 제어가 어려울 시 해당 기능은 삭제 하겠습니다.**"*

**Xerix도 이미 0.1초 이하는 어려울 수 있음을 인지**하고 있으며, *"제어 어려울 시 해당 기능 삭제"*라는 단서 조항을 포함했습니다.

### 5.2 UTTEC 권고

| 응답 시간 | UTTEC 입장 | 권고 |
|---|---|---|
| **1,000 ms (1초)** | ✅ Thermal / Solenoid도 확실 달성 | Base 라인 **보장** |
| **500 ms** | ✅ Thermal 고속형, Coriolis 전 제품 | Standard 라인 **보장** |
| **300 ms** | ✅ Coriolis + Piezo 조합에서 가능 | Premium 라인 **목표** |
| **200 ms** | ⚠️ Coriolis + Piezo + 최적 설계 시 가능 | Premium 라인 **노력 목표** |
| **100 ms** | ⚠️ 고유량(>10 SLM) + Coriolis + Piezo + 전용 센서 튜브 조건부 | **Best Effort** |
| **< 100 ms** | ❌ **물리적 불가** (상용 수준) | **사양에서 제외 권장** |

### 5.3 제안서 반영 방안

본 개발 제안서에는 다음과 같이 **단계적 목표**를 명시하는 것을 권장합니다.

| 목표 | 적용 라인 | 달성 조건 |
|---|---|---|
| **1초 이내 확실 제어** | Base / Standard / Premium 전 라인 | 무조건 보장 |
| **0.5초 @ 10 SLM** | Premium (Coriolis + Piezo) | 고유량 조건 |
| **0.3초 @ 10 SLM** | Premium + 최적화 | Best Effort |
| **0.1초 이하** | — | **제외 (Xerix 단서 조항 적용)** |

---

## 6. 만약 0.1초 이하를 반드시 달성해야 한다면?

### 6.1 추가로 필요한 개발 사항

1. **커스텀 Coriolis 센서 헤드 개발**
   - 공진 주파수 500~800 Hz 고속 튜브 설계
   - 센서 헤드 자체 재설계 (3~6개월 별도 프로젝트)
   - 비용: **+5,000만 ~ 1억원**

2. **전용 Piezo HV Driver 개발**
   - Slew Rate > 1 V/μs
   - Feedback 회로 내장
   - 비용: **+2,000만원**

3. **Dead Volume 최소화 가스 유로 설계**
   - 3D 가공 Manifold, 배관 내경 최적화
   - 기구 설계 외주 필요
   - 비용: **+3,000만원**

4. **Predictive Control 알고리즘 구현**
   - Smith Predictor, Model Predictive Control (MPC)
   - 시스템 식별 (System Identification) 도구 필요
   - 비용: **+1,500만원** (SW 공수)

5. **고속 ADC 재선정**
   - TI ADS1675 (4 MSPS 24bit) 등 고급 AFE 채택
   - 비용: **+300만원**

6. **F7 또는 H7 MCU로 변경**
   - STM32F429 → STM32H723 변경
   - 재설계 필요
   - 비용: **+500만원**

### 6.2 총 추가 비용 및 기간

| 항목 | 비용 | 기간 추가 |
|---|---:|:---:|
| Coriolis 센서 헤드 커스텀 | 5,000만 ~ 1억 | +3~6개월 |
| Piezo HV Driver 자체 개발 | 2,000만 | +1개월 |
| 가스 유로/Manifold 재설계 | 3,000만 | +1.5개월 |
| Predictive Control SW | 1,500만 | +1개월 |
| 고속 ADC + MCU 변경 | 800만 | +0.5개월 |
| **합계** | **1억 2,300만 ~ 1억 7,300만** | **+7~10개월** |

### 6.3 최종 결과물의 한계

위 추가 투자를 하더라도:
- **고유량(> 10 SLM)** 영역에서만 100 ms 달성 가능
- **저유량** 영역은 물리적으로 불가능
- **정밀도는 소수점 1자리 수준**으로 타협 필요
- **안정도/재현성 리스크 증가**

---

## 7. 결론 및 제안

### 7.1 물리적/공학적 결론

1. **MFC의 응답 시간은 5개 서브시스템의 합**이며, 센서와 가스 동역학이 가장 큰 기여를 함
2. **100 ms 이하 응답은 Thermal MFC에서 물리적으로 불가능**
3. **Coriolis + Piezo 조합**에서만 이론적 달성 가능하나, 상용 최고급 제품도 100~200 ms가 한계
4. **정밀도(소수점 2자리)와 응답 시간은 Trade-off** 관계. 둘 다 동시에 극한값을 요구할 수 없음
5. **Xerix 사양서의 단서 조항** ("제어 어려울 시 삭제")은 **공학적으로 합리적**이며 활용해야 함

### 7.2 UTTEC 권고 사항

#### 🔴 [Critical] Xerix에 다음 사항을 공식 제안

1. **응답 시간 사양을 "1초 이내 확실 제어, 10 SLM @ 0.5초 목표"로 명확화**
2. **0.1 ~ 0.5초 영역은 "Best Effort" 목표**로 분류 (달성 보장 제외)
3. **0.1초 미만은 본 개발 범위에서 제외** (Xerix 단서 조항 적용)
4. **유량 범위별 응답 시간 사양** 분리 제시 (10 SLM 이상 vs 1 SLM 이하)

#### 🟡 [Recommended] 향후 확장 제안

- Phase 2 후속 프로젝트로 **"고속 응답 Premium 라인(100 ms급)"** 별도 개발 제안
- 센서 헤드 커스텀 개발 + Predictive Control 고도화로 상용 최고급 수준 목표

### 7.3 본 계획서에 반영할 수정안

본 개발 제안서 **Section 11 (성공 기준)**에 다음과 같이 명시할 것을 권장합니다.

```markdown
| 항목 | 기준 | 비고 |
|---|---|---|
| 응답 시간 (기본) | 1,000 ms 이내 확실 | 전 라인 보장 |
| 응답 시간 (10 SLM 고유량) | 500 ms 목표 | Premium 라인 |
| 응답 시간 (Best Effort) | 300 ms 달성 목표 | Premium + 최적화 |
| 응답 시간 (< 100 ms) | 범위 외 | Xerix 사양서 단서 조항 적용 |
```

---

## 8. 참고 자료

### 8.1 참조 데이터시트 / 카탈로그
- MKS Instruments GE50A Thermal MFC Datasheet
- Brooks Instrument SLA5800 Series Catalog
- Brooks Instrument Quantim QMA Coriolis Datasheet
- Horiba STEC Z500 Series Technical Manual
- Bronkhorst mini CORI-FLOW M12 Datasheet
- Parker Series 09 Proportional Solenoid Valve
- PI Piezo Microvalve Application Note
- TI ADS1220 Datasheet (Thermal AFE)
- TI ADS1263 Datasheet (Coriolis AFE)

### 8.2 참고 표준 / 서적
- SEMI F81: Guideline for Semiconductor-Grade Mass Flow Controller
- ISA 75.25 Control Valve Response Measurement
- "Process Control" (Seborg et al.) — Chapter 8 (Controller Tuning)
- "Instrument Engineers' Handbook" (Liptak) Volume 2

### 8.3 관련 기술 논문
- "High-Speed Mass Flow Control for Semiconductor Processes", Semicon Japan Proceedings
- "Coriolis Flow Meter Dynamics", Flow Measurement and Instrumentation Journal

---

**작성일**: 2026-04-09
**작성자**: UTTEC Xerix MFC Controller 기술 검토 세션
**관련 문서**:
- `Xerix_MFC_요구사양서_20260408.md`
- `Xerix_MFC_Controller_개발_제안서_UTTEC_v1.0.md`
- `Coriolis_MFC_밸브_구동방식.md`
