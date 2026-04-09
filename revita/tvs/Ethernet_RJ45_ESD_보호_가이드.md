# Ethernet RJ45 단자 ESD 보호 가이드

> **작성일**: 2026-04-09
> **대상**: 산업용 임베디드 보드의 RJ45 Ethernet 인터페이스 ESD/서지 보호 설계
> **요약**: 트랜스포머 기본 보호 + TVS Array + Bob Smith Termination을 조합한 산업 표준 보호 구조

---

## 0. 핵심 결론

| 환경 | TVS 필요 여부 |
|---|:---:|
| 실내 사무 환경 | ⚪ 선택 |
| **산업 환경** (전기 노이즈/정전기) | ✅ **필수** |
| **자동차 / 차량용** | ✅ **필수** (AEC-Q101) |
| **옥외 / 외부 노출** (지하차도/터널/야외) | ✅ **필수** |
| **방사선 / 의료 / 정밀 계측** | ✅ **필수** |
| **EMC 인증 필요** (KC/CE/FCC) | ✅ **필수** |
| **빈번한 핫플러그** | ✅ **필수** |

> Ethernet RJ45는 트랜스포머(자화) 아이솔레이션이 1차 보호(1.5~2 kV)를 제공하므로 일반 실내에서는 동작하지만, **위 환경에서는 TVS 추가 필수**.

---

## 1. 표준 Ethernet 보호 구조

```
   RJ45                  Magnetics              PHY
  ┌─────┐              ┌──────────┐          ┌──────┐
  │ TX+ ├──────────────┤ ╱╲    ╱╲ ├──────────┤ TXP  │
  │ TX- ├──────────────┤ ╲╱    ╲╱ ├──────────┤ TXN  │
  │ RX+ ├──────────────┤ ╱╲    ╱╲ ├──────────┤ RXP  │
  │ RX- ├──────────────┤ ╲╱    ╲╱ ├──────────┤ RXN  │
  └─────┘              └──────────┘          └──────┘
   ▲                       ▲                    ▲
   │                       │                    │
  케이블측              아이솔레이션          MCU측
   (라인측)             (1.5~2 kV)          (보호 필요)
```

### 1.1 트랜스포머가 제공하는 1차 보호
- **Hi-Pot Isolation**: 1.5 kV ~ 2 kV (60초 기준)
- **Common-mode 노이즈 차단**
- **DC 차단** (직류 절연)

### 1.2 트랜스포머가 막지 못하는 것
- ⚠️ **Differential mode ESD** (TX+/TX- 사이 펄스)
- ⚠️ **Common-mode 고전압 서지** (8 kV ~ 15 kV ESD)
- ⚠️ **케이블 연결/분리 시 정전기 (Hot-plug ESD)**
- ⚠️ **번개 유도 서지** (실외 설치 시)

---

## 2. 권장 회로 구성

### 2.1 옵션 A — 기본 보호 (실내, 장비간 연결)

```
                                    Magnetics
   RJ45                             ┌─────────┐
  ┌─────┐                           │         │
  │ TX+ ├─────┬─────────────────────┤ ╱╲   ╱╲ ├──── PHY
  │ TX- ├─────┼┬────────────────────┤ ╲╱   ╲╱ ├──── PHY
  │ RX+ ├─────┼┼┬───────────────────┤ ╱╲   ╱╲ ├──── PHY
  │ RX- ├─────┼┼┼┬──────────────────┤ ╲╱   ╲╱ ├──── PHY
  └──┬──┘     ││││                  └─────────┘
     │ Shield ▼▼▼▼
     │       ESD Array (4ch TVS)
     │       SP3012, TPD4E004, ESDA6V1 등
     │
     │       Bob Smith Termination
     │       75Ω × 4 + 1nF/2kV → PE
     │
     ▼
   Chassis GND
```

### 2.2 옵션 B — 강화 보호 (산업 / 외부 노출)

```
   RJ45 ──┬── TVS Array ──┬── 트랜스포머 ──┬── TVS (PHY측) ── PHY
          │               │                  │
          └── Bob Smith ──┘                  └── Common-mode
                                                Choke 추가
```

---

## 3. TVS 부품 선정 가이드

### 3.1 추천 부품 (Ethernet 100BASE-TX 라인측)

| 부품 | 제조사 | 채널 | Vrwm | IPP | 패키지 | 용도 |
|---|---|:---:|:---:|:---:|---|---|
| **SP3012-04UTG** ⭐ | Littelfuse | 4ch | 6V | 12A | SOT-23-6 | **Ethernet 권장** |
| PESD1CAN | NXP | 1ch | 5V | 32A | SOT-23 | 단일 라인 분산 |
| TPD4E004 | TI | 4ch | 5.5V | 8A | SOT-23-6 | 저가, IO 라인 |
| ESDA6V1L | STMicro | 1ch | 5V | 36A | SOT-23 | 단일 라인 |
| NUP4202W1T2G | onsemi | 4ch | 5V | 35A | SOT-563 | 4ch 통합 |
| PRTR5V0U2X | NXP | 2ch | 5V | 32A | SOT-143B | 2ch |
| PESD2ETH100-T | NXP | 2ch | 5V | - | SOT-23 | 전용 Ethernet |

> ⭐ **가장 자주 쓰는 부품**: **SP3012-04UTG** (Littelfuse) — 4채널, ESD ±15kV (IEC 61000-4-2), 1개로 4라인 보호

### 3.2 핵심 사양 (반드시 확인)
- **Vrwm (Reverse Working Voltage) ≥ 4V**: Ethernet 차동 신호 손상 방지
- **Capacitance ≤ 3 pF**: 100Mbps 신호 무결성 보장 (낮을수록 좋음)
- **IEC 61000-4-2 ±8kV (Contact) / ±15kV (Air)** 통과 인증
- **Bidirectional**: 차동 신호이므로 양방향 필수

---

## 4. TVS 배치 위치 (가장 중요)

### 4.1 ✅ 올바른 배치
```
RJ45 ─── (5mm 이내) ─── TVS ─── 트랜스포머 ─── PHY
              │
              └── 매우 짧게 GND로
```

**핵심 원칙**:
1. **RJ45 핀에 가능한 가까이** (5mm 이내, 이상적 2mm)
2. **TVS의 GND 핀은 가장 짧게 Ground Plane으로** (인덕턴스 최소화)
3. **차동 페어는 대칭 배치** (TX+/TX- 동일 임피던스)
4. **각 라인마다 1개씩** 또는 **4ch 어레이 1개**

### 4.2 ❌ 잘못된 배치
- TVS를 트랜스포머 뒤에 배치 (이미 늦음)
- TVS GND를 길게 라우팅 (인덕턴스로 효과 감소)
- 차동 페어에 비대칭 배치
- TVS에 비아를 거치지 않고 평면 GND 미연결

---

## 5. Bob Smith Termination (선택, 권장)

### 5.1 무엇인가
4개의 75Ω 저항을 사용하지 않는 페어와 PE(Protective Earth)에 연결하여 **공통 모드 노이즈를 흘려보내는** 표준 회로.

```
   미사용 페어 4-5 ──┬── 75Ω ──┐
   미사용 페어 7-8 ──┴── 75Ω ──┤
                                ├── 1nF/2kV ── PE (Chassis)
   사용 페어 1-2  ───── 75Ω ──┤
   사용 페어 3-6  ───── 75Ω ──┘
```

### 5.2 효과
- 공통 모드 노이즈 흡수
- EMI 감소
- ESD 일부 흡수

### 5.3 부품
- **75Ω 1% 0603** × 4
- **1nF / 2kV ~ 3kV X1Y2 안전 인증 캐패시터** × 1
- PE는 **Chassis GND** (Signal GND와 분리)

---

## 6. 케이스별 권장 구성

### Case 1: 실내 산업 장비 (PLC, 일반 IoT)
```
✅ Magjack 트랜스포머 (필수)
✅ Bob Smith Termination (권장)
⚪ TVS Array (선택)
```

### Case 2: REVITA / 정밀 계측 / 반도체 공정
```
✅ Magjack 트랜스포머 (필수)
✅ Bob Smith Termination (권장)
✅ TVS Array (강력 권장)
✅ Common-mode Choke (선택)
```

### Case 3: 방사선 감시기 / 고전압 환경
```
✅ Magjack 트랜스포머 (필수)
✅ Bob Smith Termination (필수)
✅ TVS Array (필수)
✅ Common-mode Choke (필수)
✅ Spark Gap (옵션, 번개 보호)
```

### Case 4: 차량 ECU
```
✅ Magjack 트랜스포머 (필수)
✅ TVS Array (필수, AEC-Q101)
✅ Common-mode Choke (필수)
✅ Reverse Battery Protection (필수)
✅ Load Dump 보호 (필수, ISO 7637)
```

### Case 5: 옥외 설치 (지하차도/터널/야외)
```
✅ Magjack 트랜스포머 (필수)
✅ Bob Smith Termination (필수)
✅ TVS Array (필수)
✅ Common-mode Choke (필수)
✅ GDT (Gas Discharge Tube) 추가 권장
✅ PoE 사용 시 추가 보호 필요
```

---

## 7. 보호 단계별 효과

| 보호 등급 | 구성 | ESD 내성 | 비용 | 적용 |
|---|---|:---:|:---:|---|
| **Level 0** | Magnetics만 | ~2 kV | 최저 | 실험실 |
| **Level 1** | + Bob Smith | ~4 kV | 저 | 실내 사무실 |
| **Level 2** ⭐ | + TVS Array | **~8 kV** | 중 | **산업 표준** |
| **Level 3** | + Common-mode Choke | ~15 kV | 중상 | 산업 강화 |
| **Level 4** | + GDT/Spark Gap | > 25 kV | 고 | 옥외/번개 |

> **IEC 61000-4-2 ±8kV (Contact) / ±15kV (Air)** 통과를 목표한다면 **Level 2 이상 필수**

---

## 8. 추천 부품 조합 (REVITA 표준 제안)

### 8.1 트랜스포머 (Magjack)
- **Pulse H1102NL** ⭐ (Beckhoff/EtherCAT 표준 권장)
- **Bourns PT60181 시리즈**
- **Halo HFJ11-2450E** (RJ45 일체형)

### 8.2 TVS Array
- **Littelfuse SP3012-04UTG** ⭐ (가장 일반적, ±15kV)
- NXP PESD2ETH100-T (전용 Ethernet)
- Onsemi NUP4114UPXV6T1G (4ch, 저용량)

### 8.3 Common-mode Choke
- **Pulse PE-68386NL**
- TDK ACT45B-101-2P (100Ω @ 100MHz)

### 8.4 Bob Smith
- 75Ω 1% 0603 × 4
- **Murata GA342A1XGD102JW31** (1nF / 2kV X1Y2)

---

## 9. PCB 레이아웃 핵심 규칙

### 9.1 Ethernet 영역 분리
```
┌────────────────────┐
│   RJ45             │  ← Chassis GND 영역
│    │               │
│   TVS              │
│    │               │
│  ────GND Split──── │  ← 그라운드 분리선
│    │               │
│  Magnetics         │  ← Signal GND 영역
│    │               │
│   PHY              │
└────────────────────┘
```

### 9.2 핵심 사항
- **Chassis GND ↔ Signal GND 분리** (Bob Smith 캐패시터로만 연결)
- **차동 페어 100Ω 임피던스** (2-track, 4mil/4mil 등)
- **Length matching** (TX+/TX- ≤ 0.5mm 차이)
- **Magnetics 아래 그라운드 비우기** (이격대)
- **TVS 그라운드 핀은 Via로 즉시 GND 평면**
- **TVS는 RJ45 핀에서 5mm 이내** (이상적 2mm)

### 9.3 임피던스 제어
- 100BASE-TX: **차동 100 Ω**
- 1000BASE-T: **차동 100 Ω** (4페어 모두)
- PCB 스택업과 트랙 폭/간격은 임피던스 계산기로 결정

---

## 10. REVITA 제품군 적용 권고

| 제품 | TVS 추가 | 권장 구성 |
|---|:---:|---|
| **REVITA 일반 산업 보드** | ✅ 필수 | Level 2 (Magnetics + TVS + Bob Smith) |
| **REVITA 차량용** | ✅ 필수 | Level 3 (+ Common-mode Choke + AEC-Q101 등급) |
| **REVITA 옥외 설치** | ✅ 필수 | Level 4 (+ GDT, Spark Gap) |
| **REVITA EtherCAT 컨트롤러** | ✅ 필수 | Level 2~3 (Beckhoff 표준 준수) |

---

## 11. 점검 체크리스트 (양산 BOM/레이아웃 확인용)

- [ ] Magjack 트랜스포머 채택 (Pulse H1102NL 등)
- [ ] TVS Array 채택 (SP3012-04UTG 등)
- [ ] TVS 위치: RJ45 핀에서 5mm 이내
- [ ] TVS GND: 짧은 비아로 GND 평면 직접 연결
- [ ] 차동 페어 임피던스 100Ω 제어
- [ ] 차동 페어 length matching ≤ 0.5mm
- [ ] Bob Smith Termination 적용 (75Ω×4 + 1nF/2kV)
- [ ] Chassis GND ↔ Signal GND 분리 (1nF/2kV 캡으로만 연결)
- [ ] Magnetics 아래 GND 평면 이격 (Split)
- [ ] EMC 인증 요구 시 Common-mode Choke 추가
- [ ] +24V 입력단 탄탈륨 금지 (REVITA 표준 — RJ45와 무관하지만 BOM 검토 시 동시 점검)
- [ ] 옥외/차량 환경 시 GDT/Spark Gap 검토

---

## 12. 참고 자료

### 12.1 표준
- **IEC 61000-4-2**: Electrostatic Discharge Immunity Test (±8kV Contact / ±15kV Air)
- **IEC 61000-4-5**: Surge Immunity Test
- **IEEE 802.3**: Ethernet Standard
- **AEC-Q101**: 자동차용 부품 등급
- **ISO 7637**: 차량 전기 환경 (Load Dump 등)

### 12.2 데이터시트
- Littelfuse SP3012-04UTG Datasheet
- Pulse H1102NL Datasheet
- Bourns Bob Smith Termination Application Note
- TI TPD4E004 Datasheet

### 12.3 Application Note
- TI: "Ethernet ESD Protection"
- NXP: "Protecting 10/100/1000 Base-T Ethernet"
- Littelfuse: "Ethernet ESD Protection Design Guide"
- Beckhoff: "EtherCAT Slave Hardware Reference Design"

---

**작성일**: 2026-04-09
**작성자**: REVITA 기술 검토 세션
**관련 폴더**:
- `revita/tvs/esd 부품.jpg` (참고 부품 이미지)
- `revita/protocol/` (통신 프로토콜 자료)
- `revita/kc_cert/` (KC 인증 자료 — EMC 시험 기준)
