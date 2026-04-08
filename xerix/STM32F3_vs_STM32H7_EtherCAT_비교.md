# STM32F3 vs STM32H7 — EtherCAT Slave MCU 선정 비교

> **프로젝트**: Xerix 반도체 공정용 유체/기체 MFC Controller (EtherCAT 적용)
> **센서 방식**: Pressure-based (압력식) + Coriolis (코리올리식) 하이브리드
> **대상 ESC**: LAN9252 (Microchip) — **양쪽 모두 외장 필요**
> **작성일**: 2026-04-08

---

## 0. 중요 선결 확인 — STM32는 ESC 내장이 없다

**STM32 전 라인업에 ESC(EtherCAT Slave Controller) 내장 MCU는 존재하지 않는다.**

| STM32 계열 | Ethernet MAC | ESC 내장 | EtherCAT Slave 구현 방법 |
|---|---|---|---|
| STM32F3 | ❌ 없음 | ❌ 없음 | 외장 LAN9252 + SPI |
| STM32F4 | ✅ 있음 | ❌ 없음 | 외장 LAN9252 + SPI |
| STM32F7 | ✅ 있음 | ❌ 없음 | 외장 LAN9252 + SPI |
| **STM32H723/H735** | ✅ 있음 | ❌ **없음** | 외장 LAN9252 + SPI |
| STM32MP1 | ✅ 있음 | ❌ 없음 | 외장 LAN9252 + SPI or Linux SOEM |

> **참고**: ESC를 내장한 MCU는 Infineon XMC4700/4800, TI AM243x/AM64x, Renesas RZ/T 계열 등이며, STM32는 이 카테고리에 포함되지 않는다.

따라서 의미 있는 비교는 "F3 + LAN9252" 와 "H7 + LAN9252" 이다.

---

## 1. MCU 사양 비교

### 1.1 핵심 스펙

| 항목 | STM32F303 | STM32H723/H735 |
|---|---|---|
| **코어** | ARM Cortex-M4F | ARM Cortex-M7 |
| **최대 클럭** | 72 MHz | **550 MHz** |
| **DMIPS** | 90 DMIPS | **1,177 DMIPS** (약 13배) |
| **FPU** | 단정밀도(SP) | **단+배정밀도(SP+DP)** |
| **캐시** | 없음 | **I-Cache 16KB + D-Cache 16KB** |
| **Flash** | 64~512 KB | 128 KB~1 MB |
| **SRAM** | 48~80 KB | **564 KB** |
| **DSP 명령** | ✅ | ✅ |
| **전용 DSP 주변장치** | **CORDIC, FMAC** (F3 고유) | 없음 (ART Accelerator로 대체) |
| **패키지** | LQFP48~LQFP100 | LQFP100~TFBGA240 |
| **가격대** (단가) | $3~8 | $10~20 |
| **제품 수명** | 안정적, 장수명 | 신형, 장기 공급 보장 |

### 1.2 주변장치 비교

| 항목 | STM32F303 | STM32H723/H735 |
|---|---|---|
| **ADC** | 12bit, 5 Msps (4ch 동시) | **16bit, 3.6 Msps** (3ch) |
| **DAC** | 12bit, 2ch | 12bit, 2ch |
| **SPI 최대 속도** | 18 MHz | **200 MHz** |
| **Ethernet MAC** | ❌ | ✅ (진단용 EoE 가능) |
| **USB** | FS | HS |
| **CAN** | bxCAN | **FD-CAN** |
| **TRNG (난수)** | ❌ | ✅ |
| **Crypto HW** | ❌ | ✅ (H735만) |
| **전원 전압** | 2.0~3.6V | 1.62~3.6V |

---

## 2. EtherCAT Slave 구현 관점 비교

### 2.1 LAN9252 연결 성능

LAN9252 SPI 최대 속도는 **30 MHz** (Async) 또는 **80 MHz** (Sync).

| MCU | 지원 SPI 속도 | LAN9252 연결 시 병목 |
|---|---|---|
| **STM32F3** | 18 MHz | ⚠️ Async 모드 일부만 활용 가능 (약 60% 대역) |
| **STM32H7** | 200 MHz | ✅ LAN9252 최대 속도 80 MHz 여유롭게 수용 |

→ **Process Data가 큰 경우 (>128 byte) H7가 유리**

### 2.2 EtherCAT Slave Stack 구동 여유

| 요소 | STM32F3 (72MHz) | STM32H7 (550MHz) |
|---|---|---|
| **SSC Stack CPU 점유율** | 20~35% (1ms 주기) | **2~5%** (1ms 주기) |
| **최소 주기 지원** | 1 ms (권장), 500μs (여유 부족) | **125 μs 가능** |
| **동시 CoE + FoE + EoE** | CoE + FoE 정도 | **전부 동시 가능** |
| **Object Dictionary 크기** | 수백 개 제약 | **수천 개 여유** |

### 2.3 DC 동기 제어 루프 (SYNC0 → PID → DAC)

| 항목 | STM32F3 | STM32H7 |
|---|---|---|
| **인터럽트 지연** | ~300 ns | **~50 ns** (D-Cache + ART) |
| **PID 1회 연산** (SP) | ~1 μs (FPU) | **~100 ns** (FPU+Cache) |
| **ADC 샘플 → DAC 출력 지연** | 5~10 μs | **1~2 μs** |
| **1 kHz 주기 루프 여유** | 충분 | **매우 충분** |
| **10 kHz 주기 루프 여유** | ⚠️ 빠듯 | **충분** |

---

## 3. 센서 신호 처리 관점 비교 (중요)

### 3.1 Coriolis Mass Flow (위상차 측정)

Coriolis는 진동관 양쪽 픽업의 **미세한 위상차(수 μs 수준)** 로 질량 유량을 산출한다. 이것이 두 MCU의 **최대 차별점**이다.

| 처리 단계 | STM32F3 유리점 | STM32H7 유리점 |
|---|---|---|
| **진동관 구동 정현파 생성** | CORDIC 하드웨어로 sin/cos 가속 (1 cycle) | 소프트웨어 또는 LUT |
| **디지털 BPF/DC 제거** | **FMAC 하드웨어** (FIR/IIR 가속) | 소프트 DSP 명령 (빠르지만 CPU 점유) |
| **위상차 계산 (atan2)** | CORDIC으로 1 cycle 처리 | 소프트 FPU (~50 cycle) |
| **질량 유량 환산** | SP FPU | **DP FPU 가능** (교정계수 고정밀) |
| **샘플링 속도** | ADC 5 Msps | ADC 3.6 Msps (더 느림, 단 해상도 16bit) |
| **ADC 해상도** | 12bit | **16bit** (4배 해상도) |

**→ 여기서 중요한 트레이드오프가 발생한다:**

- **STM32F3의 CORDIC/FMAC 는 F3 고유 주변장치** — Coriolis 위상 연산을 거의 무료로 처리
- **STM32H7은 CORDIC/FMAC이 없음** — 대신 압도적 CPU 성능과 16bit ADC로 커버
- 순수 연산 속도: H7 >>> F3
- 순수 하드웨어 가속: **F3 > H7** (Coriolis 특화 연산 한정)
- **결론**: H7이 소프트웨어로 F3 하드웨어를 "쉽게 이기지만" 소비전력·비용은 증가

### 3.2 Pressure-based MFC

| 처리 단계 | STM32F3 | STM32H7 |
|---|---|---|
| **압력 센서 ADC** | 12bit, 5 Msps (4ch 동시) | **16bit, 3.6 Msps** |
| **음속 노즐 유량 환산식** | SP FPU 충분 | DP FPU 여유 |
| **고정밀 교정** | SP (약 7자리) | **DP (약 15자리)** |
| **최종 성능** | 일반 산업용 등급 | **반도체 최정밀 등급** |

**→ 고정밀 요구 시 H7 유리**. 16bit ADC + DP FPU 조합이 결정적.

---

## 4. 비용/양산/공급망 비교

| 항목 | STM32F303 | STM32H723/H735 |
|---|---|---|
| **단가 (1k pcs)** | $3~5 | $10~15 |
| **PCB 설계 난이도** | 쉬움 (2층 가능) | **4층 이상 필수** (고속 신호, 전원 분리) |
| **전원 회로** | 단일 3.3V | **1.2V 코어 + 3.3V IO** (SMPS 또는 LDO) |
| **BGA 리플로우** | 불필요 (LQFP) | **TFBGA240 권장** (고밀도) |
| **개발 장비** | ST-Link V2 | ST-Link V3 (고속 디버깅) |
| **재고·수급** | 매우 안정 | 안정 (최근 신규 양산) |
| **Long-term availability** | 10년+ 보장 | 10년+ 보장 |
| **인증 비용 (EMC 등)** | 낮음 | 높음 (고속 클럭 노이즈) |

---

## 5. 소프트웨어 개발 관점

| 항목 | STM32F303 | STM32H723/H735 |
|---|---|---|
| **HAL/LL 드라이버** | 성숙 | 성숙 |
| **RTOS (FreeRTOS, ThreadX)** | 모두 지원 | 모두 지원 |
| **Beckhoff SSC 예제** | ✅ 풍부 | ✅ 풍부 |
| **디버깅 난이도** | 쉬움 | 보통 (캐시 관리 필요) |
| **메모리 관리** | 단순 | **MPU + 캐시 coherency** 관리 필요 |
| **학습 곡선** | 낮음 | **보통~높음** |

---

## 6. 장단점 종합 요약

### 6.1 STM32F3 + LAN9252

**✅ 장점**
- 저비용 ($3~5)
- **CORDIC/FMAC** 주변장치 → Coriolis 위상 연산에 최적화 (F3 고유 강점)
- PCB 설계 쉬움 (2~4층, 단일 전원)
- 개발·디버깅 간단
- 저전력, 발열 적음
- 장수명, 산업용 10년 공급 안정
- **기존 제어 제품군과 호환**되는 펌웨어 자산 활용 가능

**❌ 단점**
- CPU 여유 부족 — EtherCAT Stack + 고속 PID + DSP 동시 구동 시 빠듯함
- SPI 18 MHz → LAN9252 최대 속도 활용 불가
- 12bit ADC → 고정밀 반도체 Fab 요구 충족 한계
- **125 μs 주기 EtherCAT 대응 어려움**
- DP FPU 없음 → 초정밀 교정 한계
- Ethernet MAC 없음 → EoE 진단 불가
- 향후 기능 추가 시 여유 부족

### 6.2 STM32H723/H735 + LAN9252

**✅ 장점**
- **압도적 성능**: 550 MHz, 13배 DMIPS
- **125 μs 주기 EtherCAT 가능** → 차세대 고속 Fab 장비 대응
- **16bit ADC** → 고정밀 압력 센서 신호 처리
- **DP FPU** → 초정밀 교정 계수 적용 가능
- CoE + FoE + EoE **동시** 구동 여유
- 대용량 SRAM (564 KB) → 복잡한 Object Dictionary, 데이터 로깅
- Ethernet MAC → 진단 웹 인터페이스 가능
- 향후 AI 추론(TinyML) 등 확장 여유
- **Xerix 제품군의 플래그십 포지션** 구축 가능

**❌ 단점**
- 단가 2~3배 ($10~15)
- PCB 4층 이상 필수, 설계 난이도 증가
- 전원 회로 복잡 (1.2V + 3.3V)
- **CORDIC/FMAC 없음** → Coriolis 위상 연산을 소프트웨어로 처리 (단 CPU 여유로 흡수 가능)
- 캐시 관리, MPU 설정 등 **학습 곡선**
- EMC 설계 난이도 상승
- 초기 개발 기간 증가

---

## 7. Xerix 제품 관점 권장안

### 7.1 요구 조건별 추천

| 요구 조건 | 권장 MCU | 이유 |
|---|---|---|
| **저가 산업용 MFC (비반도체)** | STM32F3 | 비용, 안정성, 기존 자산 |
| **반도체 Fab 중급 제품** | **STM32H723** | 16bit ADC, 125μs 여유, 합리적 비용 |
| **반도체 Fab 최상급 (Z-series 경쟁)** | **STM32H735** | Crypto HW, 보안 인증, 최고 성능 |
| **Coriolis 전용 저가 모델** | STM32F3 | CORDIC/FMAC이 실질적 가치 제공 |
| **Pressure-based 고정밀 모델** | **STM32H7** | 16bit ADC + DP FPU 필수 |

### 7.2 최종 권장 — **제품 라인업 이원화**

```
┌────────────────────────────────────────────────────────┐
│           Xerix EtherCAT MFC 제품 라인업 제안          │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [Standard Line]  STM32F303 + LAN9252                  │
│   ├─ Target: 일반 산업, 비반도체 Fab                   │
│   ├─ 센서: Thermal or Pressure-based (기본)            │
│   ├─ Cycle: 1 ms                                       │
│   ├─ 가격: 합리적                                      │
│   └─ 특징: CORDIC으로 Coriolis 보급형 대응             │
│                                                        │
│  [Premium Line]   STM32H723/H735 + LAN9252             │
│   ├─ Target: 반도체 Fab, 첨단 공정                     │
│   ├─ 센서: Pressure-based + Coriolis 하이브리드        │
│   ├─ Cycle: 125 μs ~ 500 μs                            │
│   ├─ 가격: 프리미엄                                    │
│   └─ 특징: 16bit ADC, DP FPU, EoE 진단, AI 확장        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**근거**:
1. 하드웨어 플랫폼 이원화로 **시장 세그먼트별 가격 포지션** 확보
2. **펌웨어 공통 코어** (PID, CoE Object Dictionary) 재사용 가능 → 개발비 절감
3. Premium 라인으로 Horiba Z500, MKS π-MFC와 **정면 경쟁** 가능
4. Standard 라인은 **진입 장벽을 낮춰** 시장 확대

### 7.3 단일 플랫폼 선택 시

**만약 하나만 고른다면 → STM32H723 권장**

이유:
- 반도체 Fab 진입이 Xerix의 핵심 목표로 판단됨
- F3의 CORDIC/FMAC 장점은 있지만, H7의 CPU 여유가 이를 소프트웨어로 충분히 상쇄
- 125 μs 주기 대응은 **차세대 EtherCAT 장비의 필수 조건**
- 16bit ADC는 가격 대비 압도적 가치
- 제품 수명 10년 이상 보장되어 재설계 리스크 최소화
- H735까지 갈 필요는 없음 (Crypto는 MFC 초기 제품에 과투자)

---

## 8. 참고 — MCU 선정 영향 체크리스트

개발 착수 전 확정해야 할 사항:

- [ ] 목표 시장: 일반 산업 / 반도체 Fab / 연구용
- [ ] EtherCAT Process Data 주기: 1ms / 500μs / 250μs / 125μs
- [ ] 센서 최종 선택: Pressure-based 단독 / Coriolis 단독 / 하이브리드
- [ ] 요구 정확도: ±1% / ±0.5% / ±0.1% (Coriolis 급)
- [ ] 채널 수: 1 MFC/Slave / Multi-channel/Slave
- [ ] 양산 목표 단가: $XX
- [ ] 초기 개발 기간: 3개월 / 6개월 / 9개월
- [ ] Vendor ID 전략: ETG 가입 / OEM Vendor ID 임대
- [ ] 인증 요구: CE, SEMI S2, UL, 기타

이 체크리스트 결과에 따라 F3/H7 선정이 명확해진다.

---

## 9. 핵심 정리

1. **STM32는 어느 계열도 ESC 내장 없음** → F3도 H7도 LAN9252 외장 필수
2. **STM32F3의 핵심 가치는 CORDIC/FMAC** — Coriolis 보급형 제품에 최적
3. **STM32H7의 핵심 가치는 CPU 여유 + 16bit ADC + DP FPU** — 반도체 Fab 프리미엄에 최적
4. **Xerix 전략 권장**: **제품 라인업 이원화** (F3 Standard + H7 Premium)
5. **단일 선택 시**: **STM32H723** (반도체 Fab 진입이 주목표라면)

---

## 참고 자료

- ST STM32F303 Datasheet, RM0316
- ST STM32H723/H735 Datasheet, RM0468
- Microchip LAN9252 Datasheet
- ETG.1000 EtherCAT Specification
- Beckhoff SSC Implementation Guide
- Infineon XMC4800 (비교용 — 실제 ESC 내장 MCU)
