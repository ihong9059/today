---
title: REVITA 동글 — MP2338GTL → 12V to 3.3V LDO 교체 검토
type: hardware-review
created: 2026-05-06
related:
  - 회로도: 리비타 동글 회로도.pdf (V1.0, 2026-05-04 작성, 2026-05-06 갱신)
  - MCU: STM32F103C8T6
  - RF: CC1101
  - RS485: MAX3485ESA
  - 현재 SMPS: MP2338GTL-Z (12V → 3.3V buck, EN 제어)
status: 검토 노트, 결정 대기
keywords: [LDO, low Iq, standby current, 12V to 3.3V, MP2338GTL, REVITA dongle]
---

# REVITA 동글 — MP2338GTL → 12V to 3.3V LDO 교체 검토

> **목적**: REVITA_DONGLE의 MP2338GTL buck 컨버터를 **저Iq LDO**로 교체하여 standby 전류 절감.
>
> **결론 미리**: 단순 교체는 **발열 트레이드오프** 발생. 권장은 **A안(펌웨어 EN 제어)** > B안(2단 구성) > C안(LDO 교체).

---

## 1. 현재 회로 구성 (REVITA_DONGLE V1.0)

### 블록 구성
| 블록 | 부품 | 역할 |
|------|------|------|
| MCU | STM32F103C8T6 | 메인 컨트롤러 |
| RF | CC1101 | 무선 통신 |
| RS485 | MAX3485ESA (UMW) | 유선 통신 |
| 보호 | SMBJ15A + SM712.TCT | 서지·EFT 보호 |
| **전원** | **MP2338GTL-Z** | **12-14V → 3.3V buck (현재)** |
| 인덕터 | L1 = 6.8μH | MP2338GTL 출력 인덕터 |

### 현재 전원 구조 (MP2338GTL-Z 동기 buck)
```
12-14V ──┬── MP2338GTL ── L1(6.8μH) ── 3.3V ──┬── STM32 (VCC3V3)
         │                                    ├── CC1101 (VCC)
         │                                    └── MAX3485 (VCC)
         └── EN_IN (R7/R8 분압으로 enable 임계)
```

### MP2338GTL-Z 핵심 사양
- 효율: 12V→3.3V 시 ~85%
- Iq (active): ~80μA
- Iq (shutdown, EN=Low): **~1μA**
- 전류 능력: 4A (과한 사양, REVITA 부하에는 ~70mA만 필요)

---

## 2. 부하 추정 (REVITA 동글)

| 모드 | STM32 | CC1101 | MAX3485 | 합계 |
|------|:----:|:------:|:-------:|:----:|
| Active TX | 35mA | 30mA | 1mA | **~66mA** |
| Active RX | 35mA | 17mA | 1mA | **~53mA** |
| MCU run / RF idle | 35mA | 1.7mA | 0.4mA | ~37mA |
| **Standby (sleep)** | ~10μA | <1μA | ~5μA | **~15μA** |

### 핵심 통찰
- **Active 시 전류 ≫ Standby 시 전류** (수천 배)
- Standby에서 **회로 자체 Iq가 부하보다 클 수 있음** → MP2338GTL의 Iq 80μA가 부하 15μA보다 5배 큼
- → **LDO의 nA~μA Iq가 standby에서 의미**

---

## 3. ⚠️ LDO 사용 시 핵심 트레이드오프

### LDO vs Buck 비교
| 항목 | MP2338GTL (현재 buck) | LDO |
|------|----------------------|-----|
| 효율 (12V→3.3V) | **~85%** | **27.5%** (Vout/Vin = 3.3/12) |
| Active 손실 (50mA 부하) | ~25mW | **435mW** (열로 소실) |
| Iq (자기 소비) | ~80μA | **0.3 ~ 25μA** ← LDO 장점 |
| 노이즈 | 높음 (스위칭) | 매우 낮음 (RF에 유리) |
| 부품 수 | 인덕터 + 8 RC + IC | 입출력 캡 2개 + IC |
| Standby 효율 | Iq 80μA + 부하 15μA = 95μA | Iq 0.3~5μA + 부하 15μA = 16~20μA |

### 발열 검산 (LDO 채택 시)
| 부하 | 손실 P | SOT-23-5 (θJA=250°C/W) | SOT-89 (θJA=60°C/W) |
|------|:------:|:----------------------:|:-------------------:|
| 15μA (standby) | 0.13mW | 0.03°C | 0.008°C |
| 50mA (active) | 435mW | **109°C 상승** ⚠️ | 26°C 상승 |
| 70mA (active TX) | 749mW | **187°C 상승** ❌ | 45°C 상승 |
| 100mA | 1,070mW | 268°C 상승 ❌❌ | 64°C 상승 |

→ **단일 LDO 교체 시 SOT-89 패키지 필수**, SOT-23-5는 active 시 자기 가열로 셧다운 위험.

---

## 4. 추천 12V → 3.3V Low-Iq LDO 후보

| 모델 | 제조사 | Vin max | **Iq (typ)** | Iout | 패키지 | 비고 |
|------|--------|:------:|:----------:|:----:|--------|------|
| ⭐ **MCP1755-3302E/MC** | Microchip | 16V | **1.6 μA** | 300mA | SOT-89 | **1순위 — 발열 + Iq 균형** |
| ⭐ STM **STLQ020-3.3** | STMicro | 18V | **300 nA** | 200mA | SOT-23-5 | 동급 최저 Iq (active 발열 주의) |
| ⭐ **MAX8881EUT33+T** | Maxim | 28V | 4 μA | 200mA | SOT-23-5 | 산업/IoT 인기 |
| **TPS7A24-33** | TI | 18V | 3 μA | 200mA | SOT-23-5 | 추천, ESR-free |
| **AP2138R-3.3** | Diodes | 18V | 1.5 μA | 250mA | SOT-23-5 | 가성비 |
| **HT7533-1** | Holtek | 30V | 4 μA | 100mA | SOT-89 | 한국 부품상 흔함, 저렴 |
| **TPS7B82-Q1** | TI | 40V | 25 μA | 300mA | SOT-223 | 자동차/산업 강건성 (RS485 환경) |
| LP2985-33 | TI | 16V | 100 μA | 150mA | SOT-23-5 | 클래식 (Iq 부족) |

### 후보 평가 (REVITA 환경 기준)
- **Vin 14V 안전 마진**: 모든 후보 ≥16V 충족
- **Iout 70mA 능력**: 모든 후보 충족
- **Iq 작을수록 좋음**: STLQ020(300nA) > MCP1755(1.6μA) ≈ AP2138(1.5μA) > TPS7A24(3μA) > MAX8881(4μA) > HT7533(4μA)
- **발열 처리**: SOT-89 또는 SOT-223 우선 (MCP1755, HT7533, TPS7B82-Q1)

---

## 5. 🥇 최종 1순위 — MCP1755-3302E/MC (Microchip)

### 선택 이유
- **Iq 1.6μA** = MP2338GTL 대비 50배 낮음 (standby 절약)
- **Iout 300mA** = active TX 70mA 대비 4배 여유
- **SOT-89 패키지** = SOT-23보다 발열 처리 유리 (θJA 60°C/W)
- **Vin 16V** = 12-14V 입력에 안전 마진 충분
- **입력 캡 1μF + 출력 캡 1μF**만 있으면 동작 (BOM 단순화)

### 발열 검산 (MCP1755 / SOT-89, 최악 조건)
- Vin=14V, Iout=70mA → P = (14-3.3) × 0.07 = **749mW**
- TJ-TA = 749mW × 60°C/W = **45°C 상승**
- TA=25°C 시 TJ=70°C → **한계 125°C 내, 안전**
- ⚠️ 주의: SOT-23-5 패키지(MCP1755S)는 70°C 상승 → 마진 부족, **비추천**

### 가용성 (한국 시장)
- 디바이스마트, 엘레파츠, 디지키 등에서 즉시 구매 가능
- 가격: ~500원/개 (단가)

---

## 6. 🥈 2순위 — STM STLQ020-3.3 (절대 최저 Iq)

### 선택 이유
- **Iq 300nA** = 동급 최저 (배터리 동작 시 무적)
- Iout 200mA로 active TX 70mA 충분

### 한계
- ⚠️ **SOT-23-5만 제공** → active 시 발열 한계 근처
- 749mW에서 187°C 상승 → **매우 위험**
- → Active 부하가 50mA 이하이거나, **방열 PCB 설계 (Cu pour, thermal via)** 필수

### 적용 조건
- TX 무선 사용 빈도 낮은 경우 (예: 시간당 몇 회 송신)
- PCB 방열 설계 가능 시
- 절대 최저 standby 전류 필수일 때

---

## 7. 🥉 3순위 — HT7533-1 (가성비 + 한국 조달 용이)

### 선택 이유
- 한국 일반 부품상 즉시 구매 가능
- SOT-89 발열 처리 OK
- 가격 ~200원/개 (매우 저렴)

### 한계
- Iout 100mA → 부하 70mA 마진 작음
- Iq 4μA로 1순위 대비 약간 높음

### 적용 조건
- 빠른 프로토타입
- BOM 비용 최소화

---

## 8. 🚨 권장 솔루션 비교 (A·B·C 안)

### A안 — MP2338GTL 유지 + EN 핀 활용 ⭐ **가장 권장**

#### 핵심 아이디어
- 현재 회로에 **EN_IN 핀 제어**가 이미 존재 (R7/R8 분압으로 enable 임계 설정)
- MCU에서 **Standby 시 EN을 LOW로** 떨어뜨리면:
  - MP2338GTL **shutdown current ~1μA** (LDO보다 더 낮음!)
  - 12V 레일은 그대로 유지, MP2338GTL만 꺼짐
- Active 시에만 켜고, sleep 시 12V → 3.3V 변환을 끊음

#### 구현 흐름
```
Active 시: MCU → EN_IN High → MP2338GTL ON → 3.3V 공급
Sleep 시: MCU → EN_IN Low → MP2338GTL Off → 3.3V Off
```

#### 문제점
- ⚠️ **3.3V가 꺼지면 MCU도 꺼짐** → MCU 자체가 sleep 후 EN을 다시 High로 못 함
- → **별도 wake-up 소스** 필요 (외부 인터럽트, RTC, 별도 슬립용 LDO)

#### 해결안 1: 슬립용 보조 LDO + 메인 buck 분리
```
12V ──┬── MP2338GTL (메인, 큰 전류) ─→ 3.3V_MAIN (CC1101 + MAX3485 전원)
      └── HT7533 (슬립용, 작음) ─────→ 3.3V_STANDBY (MCU 전원)

MCU는 항상 ON, EN_IN으로 메인 buck 제어
```
- Standby 시: MCU만 동작 (~10μA), CC1101/MAX3485 전원 차단
- Active 시: 메인 buck ON으로 모든 회로 깨움
- **표준 IoT 저전력 패턴**

#### 해결안 2: WAKE-UP 외부 신호로 EN 직접 제어
- RS485 수신 신호로 EN 임계 트리거
- 라인 활동 감지 시 자동 깨우기

#### 비용
- 회로 추가 (추가 LDO 1개 + 다이오드/저항 ~10개)
- BOM 변경 최소
- **펌웨어 변경 + 슬립 LDO 추가만으로 해결**

---

### B안 — 2단 구성 (12V → 5V Buck → 3.3V LDO)

#### 회로
```
12-14V ── 12V→5V Buck ── 5V ── 3.3V LDO ── 3.3V
```

#### 후보 부품
- 1단 (12V→5V Buck): TPS62932 (Iq 22μA, 95% 효율) 또는 MP2338 그대로 사용
- 2단 (5V→3.3V LDO): TLV70033 (Iq 30nA, 200mA, SOT-23) — Vin 5V는 LDO 발열 미미

#### 손실 검산 (50mA 부하)
- 1단: 12V → 5V, η=92% → 손실 ~22mW
- 2단: 5V → 3.3V, P=(5-3.3)×0.05 = 85mW (LDO 발열)
- 합: ~107mW (vs 단일 LDO 435mW)

#### 장단점
- ✅ Active 효율 좋음 (~80%)
- ✅ Standby Iq 매우 낮음 (5μA + 30nA)
- ✅ RF 노이즈 낮음 (LDO가 후단)
- ❌ 부품 수 증가 (인덕터 1 + IC 2 + 캡 다수)
- ❌ PCB 면적 증가

---

### C안 — 단일 LDO 교체 (사용자 직접 요청)

#### 회로 변경
```
U2: MP2338GTL-Z (8핀)  →  MCP1755-3302E/MC (5핀, SOT-89)
L1: 6.8μH              →  제거
R1, R7, R8, R10        →  제거 (분압/FB 저항 모두)
C3, C4: 0.1μF, 22nF    →  제거
R6, R9: enable/divider →  단순 EN 풀업으로 변경 (또는 직결)
C1A1 20μF + C1B1 0.1μF →  유지 (입력 캡)
C2A_3.3V + C2B_3.3V (22μF×2) + C5 100pF →  유지 (출력 캡)
```

#### MCP1755 핀맵 (SOT-89-3 또는 SOT-23-5)
- VIN, VOUT, GND (기본 3핀) + 일부 패키지에서 SHDN, BYPASS

#### 장단점
- ✅ 부품 수 대폭 감소 (8개 부품 제거)
- ✅ Standby Iq 1.6μA (MP2338GTL 대비 50배 ↓)
- ✅ RF 노이즈 매우 낮음 (스위칭 없음)
- ❌ Active 발열 749mW (SOT-89로 가능하지만 PCB 방열 고려)
- ❌ Active 효율 27.5% → 발열·전력 손실
- ⚠️ **REVITA가 active duty cycle이 낮을 때만 의미**

---

## 9. Active Duty Cycle별 권장

### Duty < 1% (대부분 sleep)
- → **A안 채택** (메인 buck + 슬립 LDO)
- 또는 **C안 + STLQ020 (300nA Iq)** + PCB 방열 강화
- standby 효율이 핵심, active 발열은 짧아서 무시 가능

### Duty 1~10%
- → **A안 또는 B안** (2단 구성)
- 발열 + standby 균형

### Duty > 10%
- → **MP2338GTL 유지** (현재 회로)
- LDO 교체 시 발열·전력 손실이 너무 큼
- standby 절약은 작은 부수 효과

→ REVITA 동글의 active duty cycle 측정 필요.

---

## 10. 최종 추천 우선순위

| 순위 | 솔루션 | 적용 조건 | 예상 standby Iq |
|:---:|--------|----------|:-------------:|
| 1 | **A안 — 펌웨어 EN 제어 + 슬립 LDO 추가** | Duty < 5%, 펌웨어 수정 가능 | ~5μA (HT7533) |
| 2 | **C안 + MCP1755-3302E/MC** | Duty < 1%, 단순 교체 원함 | ~1.6μA |
| 3 | **B안 — 2단 (12V→5V→3.3V)** | 효율·노이즈 모두 중요 | ~5μA |
| 4 | **C안 + STLQ020 + PCB 방열** | 절대 최저 Iq 필수 | **0.3μA** |

---

## 11. 회로 변경 시 BOM 변경 (C안 + MCP1755 채택 가정)

### 제거
| 부품 | 값 | 비고 |
|------|----|----|
| U2 | MP2338GTL-Z | LDO로 대체 |
| L1 | 6.8μH | 인덕터 불필요 |
| R1 | 280K, 1% | FB 분압 |
| R7 | 1M, 1% | EN 분압 |
| R8 | 178K, 1% | EN 분압 |
| R10 | 49.9K, 1% | FB 분압 |
| C3 | 0.1μF | BST 캡 |
| C4 | 22nF | SS 캡 |

### 추가/유지
| 부품 | 값 | 변경 |
|------|----|----|
| U2 | MCP1755-3302E/MC | 신규 (SOT-89) |
| C1A1 | 20μF | 유지 (입력 캡, 전해) |
| C1B1 | 0.1μF | 유지 (입력 디커플) |
| C2A_3.3V1 | 22μF | 유지 (출력 캡) |
| C2B_3.3V1 | 22μF | 유지 (출력 캡) |
| C5 | 100pF | 유지 (고주파 디커플) |
| R6 | 10K | EN 풀업 (기존 R6 재사용) |
| R9 | 100K | 제거 또는 풀다운 유지 |

→ **총 8개 부품 제거 + 1개 부품 변경**.

---

## 12. 검증 단계

### Phase 1 — 보드 1매 시작품 제작
- [ ] MCP1755-3302E/MC 5개 발주 (디지키 또는 한국 부품상)
- [ ] 기존 보드에서 U2·L1·R1·R7·R8·R10·C3·C4 제거
- [ ] MCP1755 점퍼 와이어로 임시 연결 (입력 12V, 출력 3.3V, GND)
- [ ] 부하 50mA·70mA에서 LDO 표면 온도 측정 (열화상 카메라 또는 적외선 측정기)

### Phase 2 — Standby 전류 측정
- [ ] 12V 입력단 전류계 연결 (μA 측정 가능)
- [ ] STM32 sleep mode + CC1101 sleep + MAX3485 idle
- [ ] 측정값:
  - MP2338GTL 유지 시: 예상 ~95μA
  - MCP1755 교체 시: 예상 ~17μA
- [ ] 차이 = 약 78μA 절감 효과 검증

### Phase 3 — Active 발열 + 신뢰성
- [ ] 24시간 연속 active TX 모드 → LDO 표면 온도 추적
- [ ] 70°C 이하 유지되는지 확인
- [ ] PCB Cu pour + thermal via 추가 효과 측정

### Phase 4 — 양산 결정
- [ ] 측정 결과 OK 시 → PCB 재설계
- [ ] 측정 결과 발열 한계 시 → A안 또는 B안 재검토

---

## 13. 관련 자료

### 데이터시트 링크
- [MCP1755 (Microchip)](https://www.microchip.com/en-us/product/mcp1755)
- [STLQ020 (STMicro)](https://www.st.com/en/power-management/stlq020.html)
- [MAX8881 (Maxim/ADI)](https://www.analog.com/en/products/max8881.html)
- [TPS7A24 (TI)](https://www.ti.com/product/TPS7A24)
- [HT7533 (Holtek)](https://www.holtek.com/productdetail/-/vg/ht75xx-1)
- [MP2338 (MPS, 현재 사용)](https://www.monolithicpower.com/en/mp2338.html)

### 관련 폴더
- 회로도: `revita/회로도/리비타 동글 회로도.pdf` (V1.0)
- TVS 보호: `revita/tvs/`
- RS485 관련: `revita/rs485/`

---

## 14. 결론 한 줄

> **"단순 LDO 교체보다 펌웨어 EN 제어(A안)가 효과·비용 모두 우수. 단순 교체 원하면 MCP1755-3302E/MC (SOT-89) 1순위, STLQ020 (300nA Iq) 2순위. Active duty cycle 측정 후 결정."**

### 다음 액션
1. **REVITA 동글의 active duty cycle 실측** (1주)
2. Duty < 5% 확인 시 → MCP1755 시제품 1매 제작 + 측정
3. Duty > 10% 확인 시 → MP2338GTL 유지 + EN 제어만 추가

---

*검토 작성일: 2026-05-06*
