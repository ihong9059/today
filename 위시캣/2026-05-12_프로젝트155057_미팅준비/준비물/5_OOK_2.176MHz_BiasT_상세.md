# 5. AISG OOK 2.176 MHz PHY + Bias-T 상세 — 미팅 답변용 심층 자료

> 클라이언트의 핵심 질문 "OOK PHY 어떻게 구현하실 건가요?"에 답변할 수 있는 깊이.
> AISG v2.0 / v3.0의 **PHY 계층은 동일** — 본 자료는 v3.0에도 100 % 그대로 적용된다.

---

## 0. 한 줄 요약 (미팅에서 가장 먼저 말할 문장)

> "AISG OOK PHY는 **2.176 MHz on-off keying carrier**를 **Bias-T로 RF feeder 케이블에 superimpose**해서 ALD를 원격 제어하는 방식입니다. **v3.0에서도 PHY는 0 % 변경**이라서 v2.0 modem 자산이 그대로 재사용됩니다. 우리는 single-chip modem(**ADI MAX11947**)과 자체 디스크리트(REVITA의 CC1101 자산 응용) **2경로**를 BOM·일정에 따라 선택할 수 있습니다."

---

## 1. PHY 계층 핵심 파라미터 (AISG v2.0 § Modem, v3.0 § PHY)

| 항목 | 값 | 근거 |
|---|---|---|
| **변조** | OOK (On-Off Keying = ASK 1-bit) | AISG-STD-v2.0 / v3.0 PHY |
| **반송파** | **2.176 MHz** | AISG 표준 고정 |
| **데이터 레이트** | **9.6 kbps** (basic baud rate) | AISG 표준 |
| **프레임** | HDLC (ISO/IEC 13239), bit-stuffing, FCS-16 (CRC-CCITT) | AISG L2 |
| **TX 출력 (정격)** | **+3 dBm = 0.89 Vpp @ 50 Ω** | MAX11947 default (`TXPWR=0x07`) |
| **TX 출력 (범위)** | **−0.5 ~ +7.0 dBm**, 0.5 dB step | MAX11947 SPI 설정 |
| **RX BPF** | **200 kHz BW @ 2.176 MHz** center | AISG modem 내장 |
| **RX carrier detect 임계** | −15 ~ −21.5 dBm | MAX11947 |
| **기준 클럭** | **8.704 MHz 수정 (= 4 × carrier)** | AISG modem 표준 |
| **주파수 정확도** | **±100 ppm** | AISG 표준 요구사항 |
| **공존 RF 대역** | 800 ~ 2200 MHz (LTE 전 대역, RFS는 690~2700) | 상용 Smart Bias-T 정격 |
| **DC 전원 (피더)** | **10 ~ 30 V DC**, 최대 **2 A** | AISG v2.0 / 상용 정격 |

### 왜 2.176 MHz인가
- 셀룰러 RF (UHF) 대비 **3 자리 이하의 저주파** → BPF 분리 용이
- 8.704 MHz 표준 수정의 **4분주** → 클럭 디자인 단순화
- 셀룰러 1st adjacent 대비 충분한 가드 → spectral mask 통과 가능

---

## 2. Bias-T — DC + RF + OOK 3-way 결합기

### 2.1 토폴로지 (기본 구조)

```
        ┌────────[L = Choke]──────────┐
        │                              │   (DC + OOK 2.176 MHz)
   DC+OOK 포트                          │
   (AISG 8-pin)                         │
        ▲                              ▼
        └──────────────────────┐  ┌──── ALD 방향
                                ╳  RF Feeder
                                ╱   (cellular 800~2200 MHz)
        BTS / 라디오 ◀━━━━━━━━━┘
                  │
              [C = DC Block]
              (HPF)
```

| 소자 | 역할 | 통과 신호 | 차단 신호 |
|---|---|---|---|
| **L** (chock 인덕터) | LPF — DC + OOK 통과 | DC 10~30 V, 2.176 MHz OOK | 셀룰러 RF (800~2200 MHz) |
| **C** (DC 차단 커패시터) | HPF — RF 통과 | 셀룰러 RF | DC, 2.176 MHz OOK |

**핵심 원리**:
- 인덕터 L의 임피던스 X_L = 2πfL → 셀룰러 RF에서 매우 큼(개방) / DC에서 0Ω(단락)
- 커패시터 C의 임피던스 X_C = 1/(2πfC) → 셀룰러 RF에서 0Ω(단락) / DC에서 매우 큼(개방)
- 2.176 MHz는 두 소자 모두 "통과" 또는 "차단"이 애매한 영역이므로 **별도의 OOK 인젝션 경로**(상용 Smart Bias-T 내부 modem)가 추가됨

### 2.2 Smart Bias-T (= modem 내장 Bias-T)

기본 Bias-T는 DC + RF만 분리. **AISG 통신을 하려면 modem이 필요**:
- "Smart Bias-T" = 기본 Bias-T + AISG modem IC + UART/SPI 호스트 인터페이스
- 사이트의 **tower base** (BTS 측)에 설치 → primary controller가 RS-485로 modem 제어 → OOK 출력 → 피더 인젝션
- ALD 측 (top of tower)도 동일하게 Bias-T로 OOK 추출 → modem 복조 → ALD MCU 처리

```
[BTS]                                       [Antenna / ALD]
  │                                              │
  │ RS-485                                       │ UART
  ▼                                              ▼
[Primary Controller]                       [ALD MCU]
  │                                              │
  │ TXIN/RXOUT                                   │ TXIN/RXOUT
  ▼                                              ▼
[Smart Bias-T (BTS측)]                      [Smart Bias-T (ALD측)]
  │ MAX11947                                     │ MAX11947
  │ + L + C                                      │ + L + C
  │                                              │
  ╞══════[RF Feeder, 30~100 m]══════════════════╡
       DC 10-30V + 2.176 MHz OOK + Cellular RF
```

---

## 3. AISG Modem Driver IC — 확인된 모델

### 3.1 [PRIMARY] Analog Devices (Maxim) **MAX11947** ⭐

**현재 시장에서 사실상 표준인 single-chip AISG modem**.

| 항목 | 사양 |
|---|---|
| **표준 준수** | AISG v2.0 + v3.0 모두 compliant |
| **채널** | **4 채널 (4:1 MUX 내장)** — 1 modem이 ALD 4대 |
| **TX 출력** | +3 dBm nominal, −0.5 ~ +7.0 dBm, 0.5 dB step |
| **RX 감도** | carrier detect −15 ~ −21.5 dBm |
| **호스트 I/F** | **SPI** (configuration) + **TXIN / RXOUT** (data) |
| **VCC** | 3.3 V 또는 5.0 V (5V에서 +7 dBm 최대) |
| **STANDBY mode** | 저전력 (TX chain shutdown) |
| **Reference** | 8.704 MHz 외부 수정 |
| **Package** | **3 × 3 mm TQFN** — 디스크리트 대비 100배 small |
| **Spectral mask margin** | **+15 dB margin @ 30 MHz** (MAX9947 대비 +13 dB 개선) |
| **EVKit** | **MAX11947EVKIT** (Mouser, Digikey 즉시 구매 가능) |
| **가격 (참고)** | 수량별, ADI/Mouser 직접 견적 |

**왜 이 칩이 결정적인가**:
- 양산 사이트 1대당 modem 4 ALD 커버 가능 (RET + TMA + GLS + ASD)
- v3.0 신기능 (Multi-Primary, Auto Discovery)도 PHY 변경 없으므로 본 칩으로 그대로 대응
- 디스크리트 솔루션 대비 BOM 50개 이상 → 1개 + 8 외부 부품 (수정 + L + C + 디커플링)으로 축소

### 3.2 [LEGACY] Maxim **MAX9947** (MAX11947의 전신)

- 2010년 출시, AISG v2.0 단일 채널 modem
- 동일 3 × 3 mm TQFN
- SPI 인터페이스 없음 (외부 저항으로 TX 파워 고정)
- spectral mask margin 1~2 dB → MAX11947 권장
- **새 설계에는 비추천** — 기존 v2.0 양산품 유지·보수에만 사용

### 3.3 [DISCRETE / FPGA] 자체 구현 경로

상용 IC를 안 쓰는 사례:
- **Altera EP3C16E144C8 FPGA + 8-bit ADC + BPF** (IEEE 2011 논문, "Design and Implementation of AISG Modem for Antenna Line Device")
- **MCU + DAC + envelope detector + comparator + analog BPF** 패턴
  - TX: MCU → DAC → 2.176 MHz 캐리어 게이팅 → PA → coupler
  - RX: coupler → BPF (200 kHz BW @ 2.176 MHz) → AGC → envelope detector → comparator → MCU UART
- 우리 자산 활용 가능성:
  - **REVITA의 CC1101 OOK 자산은 직접 적용 안 됨** — CC1101은 300~900 MHz Sub-GHz, AISG는 2.176 MHz baseband에 가까움
  - 그러나 **OOK envelope detection·BPF tuning·HDLC bit-stuffing 노하우는 그대로 재사용** → 자체 구현 시 학습 곡선 단축

### 3.4 결정 매트릭스 (미팅에서 클라이언트에게 제안)

| 경로 | 장점 | 단점 | 권장 시점 |
|---|---|---|---|
| **A. MAX11947 single-chip** | 검증된 + AISG v2/v3 완전 준수 + 양산 빠름 | BOM 라인업 ADI 의존 + 가격 | **기본 권장** (90일 일정 + 24M에 적합) |
| **B. MAX9947 (재고 보유 시)** | 기존 v2.0 라인 호환 | v3.0 마진 부족 | v2.0 레거시 유지·보수만 |
| **C. 자체 디스크리트 (MCU+analog)** | IP 자유 + BOM 다변화 + 학습 자산 | NRE 시간 + spectral mask 검증 부담 | 1~2년차 자체 IP 라인업 |
| **D. FPGA (Altera EP3C 계열)** | RX DSP 유연성 | BOM 대형 + 양산 비효율 | 측정 장비 / R&D only |

---

## 4. 상용 Smart Bias-T (외부 조달 대안) — 확인된 제조사

미팅에서 "modem 양산 안 해보셨다면 Smart Bias-T 통째 구매도 가능합니다" 답변용.

| 제조사 | 모델 예시 | 주파수 | DC | 비고 |
|---|---|---|---|---|
| **CCI** (Communication Components Inc.) | **BT-0821-xxx-AG-O** | 800~2200 MHz | 2 A max | AISG 1.1 / 2.0, IL 0.2 dB, 8/20 µs 2 kA surge |
| CCI | BT-0723-xxx-AG-O / BTO-0627-xxx | 다대역 | — | LTE 전대역 |
| **Kaelus** | Smart Bias Tee, DIN(F) to Antenna | LTE 전대역 | — | bottom-of-tower / top-of-tower 모듈 |
| **HUBER+SUHNER** | Smart AISG | **690~2700 MHz** | — | LTE 풀 대역, BTS 또는 안테나 근접 설치 |
| **Amphenol Antenna Solutions** | MODEMxxx SBT-6962690-xxx | LTE 전대역 | — | MODEM 시리즈 |
| **RFS** | AISG 2.0 Bias-T with Surge Protection-2 | LTE 전대역 | — | 서지 보호 포함 |

**CCI BT-0821 확인 사양 (대표값)**:
- IL: 0.2 dB
- Return loss: ≥ 20 dB
- DC: 2 A max
- AISG: v1.1 / v2.0 modem 2.176 MHz / 9600 bps 내장
- Surge: 8/20 µs, ±2 kA, 10회 / IEC-801-5
- 커넥터: 7/16 DIN-M (RF in) + 7/16 DIN-F (RF+DC+AISG out) + 8-pin circular (AISG)

---

## 5. 미팅 시 Q&A 시뮬레이션

### Q1. "OOK PHY는 어떻게 구현하실 건가요?"
> A. 기본 경로는 **ADI MAX11947 single-chip** modem입니다. v2.0/v3.0 모두 compliant + 4채널 MUX 내장이라 ALD 4대를 1 modem으로 커버합니다. EVKit으로 1~2주 내에 PHY 단독 검증 가능합니다. 클라이언트 측에서 자체 IP 요구가 있으시면 디스크리트(MCU + analog BPF + envelope detector) 경로도 가능하지만 일정상 90일 안에는 권장하지 않습니다.

### Q2. "Bias-T는 직접 만드시나요, 사오시나요?"
> A. 양산 사이트용 Bias-T는 **CCI / Kaelus / HUBER+SUHNER / Amphenol** 같은 검증된 외부 부품 권장입니다. 8/20 µs ±2 kA 서지 보호와 IL 0.2 dB는 자체 양산보다 외부가 BOM·시간 측면에서 유리합니다. 다만 **PCB-내장 modem(BTS 측)은 자체 설계** — MAX11947 + 외부 8 부품으로 회로 한 페이지에 들어갑니다.

### Q3. "2.176 MHz 캐리어 정확도는 어떻게 보장하시나요?"
> A. **8.704 MHz 수정**을 외부 클럭으로 사용합니다 (캐리어의 4배). AISG 표준 ±100 ppm 요구사항은 일반 SMD 수정(±50 ppm 등급)으로 충분히 만족합니다. MAX11947 내장 PLL로 4분주.

### Q4. "v3.0 신기능 때문에 PHY도 바뀐 거 아닌가요?"
> A. 아닙니다. **PHY는 v2.0 → v3.0 변경 0 %**입니다. 2.176 MHz OOK / 9600 bps / HDLC는 동일. v3.0 신기능 4종(Multi-Primary, Auto Discovery, Site Mapping, Ping)은 모두 **Application Layer(L3)** 변경입니다. 따라서 v2.0 modem 자산을 그대로 가지신 분이라면 PHY는 무손실 이식 가능합니다.

### Q5. "스펙트럼 마스크 통과 검증은요?"
> A. MAX11947은 **30 MHz 인플렉션 포인트에서 +15 dB margin**으로 출시되어 있습니다. 자체 디스크리트라면 EMC lab에서 별도 검증이 필요하지만, MAX11947 single-chip이면 ADI 레퍼런스 디자인 기준 통과 보고서가 같이 제공됩니다.

### Q6. "DC 전류 부하는요? ALD 4대 동시 동작 시?"
> A. 표준 AISG는 **10~30 V DC, 최대 2 A**입니다. RET 1대당 약 0.5 A (모터 정지 시 50 mA 대기) → 4 ALD 동시 틸트 시 최대 약 2 A에 근접. **Bias-T 정격이 2 A 이상인지 확인하고**, 동시 동작 명령은 시퀀스로 분산(우리 BLE Mesh mutex 패턴과 동일 철학) 권장합니다.

---

## 6. 우리 자산과의 매칭 (미팅 차별화 포인트)

| 요구 | UTTEC 자산 매칭 |
|---|---|
| OOK 변복조 (저주파) | REVITA CC1101 (Sub-GHz, 447.925 MHz) — **시연 가능**, 직접적 적용은 아니지만 OOK + envelope detection + HDLC 노하우 동일 |
| HDLC bit-stuffing + FCS-16 | revitaProject/remocon UART 프로토콜 + LoRa E22 BLE Mesh 프레이밍 |
| RS-485 | 양산 KC 인증 RS-485 마스터-슬레이브 다수 출하 (revita / 응원봉 / Modbus 라인) |
| Bias-T DC 인젝션 | Solar 원격 모니터링 라인의 DC + 신호 결합 경험 (별도 영업 자산) |
| 분주 PLL + 수정 클럭 | STM32 / ESP32 / nRF52 다년간 클럭 디자인 |
| EMC / spectral mask | KC 양산 인증 라인 자체 EMC 사이클 보유 |

**핵심 메시지**: "AISG modem **양산 경험은 없습니다**(정직 시그널). 그러나 PHY 구성 요소 중 OOK 변복조·HDLC·RS-485·DC 인젝션·EMC 사이클은 각각 **다른 프로젝트에서 양산 검증된 자산**으로 보유하고 있습니다. 90일은 이 자산들을 AISG 단일 PHY로 통합하는 기간으로 보고 있습니다."

---

## 7. 권장 학습·검증 순서 (수주 후 Phase 1)

1. **MAX11947 EVKit 발주** (1주차) — Mouser/Digikey 즉시
2. **EVKit + 호스트 MCU(STM32 또는 ESP32-S3)** 보드 PHY loopback (2~3주차)
   - 9600 bps HDLC 송수신 검증
   - 200 kHz BPF / AGC threshold 튜닝
   - 8.704 MHz 수정 ±100 ppm 측정
3. **외부 Smart Bias-T 1세트 발주** (CCI BT-0821 또는 동등) (2주차)
4. **PHY 통합 시험** — 30 m 더미 케이블 + 셀룰러 RF 신호 발생기 동시 인가 (4주차)
5. **HDLC + AISG L3 명령(SetTilt 등)** EP 구현 (5~8주차)
6. **EMC pre-scan** — 자체 또는 외부 lab (9~10주차)

---

## 8. 출처 / 참고 자료

### MAX11947 / MAX9947 / AISG modem
- [Designing with a Physical Layer Modem for AISG v3.0 Compatibility — Analog Devices](https://www.analog.com/en/resources/technical-articles/designing-with-physical-layer-modem-for-aisg-v3pt0.html)
- [New Features for an AISG v3.0 Physical Layer Modem — Analog Devices](https://www.analog.com/en/resources/technical-articles/new-features-for-an-aisg-v30-physical-layer-modem.html)
- [Simplify AISG Control Systems by Integrating the Hardware Discrete Transceiver — Analog Devices](https://www.analog.com/en/resources/technical-articles/simplify-aisg-control-systems-by-integrating-the-hardware-discrete-transceiver.html)
- [MAX11947 4 Channel AISG Integrated Modem — Datasheet PDF](https://www.analog.com/media/en/technical-documentation/data-sheets/MAX11947.pdf)
- [MAX11947 Product Page](https://www.analog.com/en/products/max11947.html)
- [MAX9947 Product Page](https://www.analog.com/en/products/max9947.html)
- [Port Scan Operation of the MAX11947 — Analog Devices](https://www.analog.com/en/technical-articles/port-scan-operation-of-the-max11947.html)
- [Designing with a physical layer modem for AISG v3.0 compatibility — EDN](https://www.edn.com/designing-with-a-physical-layer-modem-for-aisg-v3-0-compatibility/)
- [Single-Chip AISG-Compliant Transceiver is 100x Smaller — GlobeNewswire 2010](https://www.globenewswire.com/news-release/2010/02/25/415179/185208/en/Single-Chip-AISG-Compliant-Transceiver-is-100x-Smaller-Than-Discrete-Designs.html)

### Smart Bias-T 제조사
- [Kaelus AISG Smart Bias Tee — Launch3](https://www.launch3direct.com/products/kaelus-aisg-smart-bias-tee-bottom-of-the-tower-din-f-to-antenna)
- [HUBER+SUHNER ASIG Smart Bias-T — Electronic Specifier](https://wireless.electronicspecifier.com/wireless/asig-smart-bias-ts-are-suited-for-lte-applications)
- [Amphenol MODEMxxx SBT Installation Guide PDF](https://amphenol-antennas.com/wp-content/uploads/datasheets/Amphenol_Installation_Guide_MODEMxxx_-_SBT-6962690-xxx.pdf)
- [CCI BT-0821 Smart Bias-T](https://www.cciproducts.com/index.php/products/antennas/antenna-accessories/item/123-bt-0821-xxx-ag-o)
- [RFS AISG 2.0 Bias-T with Surge Protection](https://alliancecorporation.ca/product/rfs-aisg-2-0-bias-t-with-surge-protection-2/)
- [US20170062911A1 — Input selective smart bias tee (Patent)](https://patents.google.com/patent/US20170062911)

### Bias-T 회로 기초
- [RF/Microwave Bias Tees from Theory to Practice — Mini-Circuits](https://blog.minicircuits.com/rf-microwave-bias-tee-basics/)
- [Bias Tee — Wikipedia](https://en.wikipedia.org/wiki/Bias_tee)
- [AN-2061: Wideband Bias Tee Design Using 0402 SMD — Analog Devices](https://www.analog.com/en/resources/app-notes/an-2061.html)

### AISG 표준 / 학술
- [Antenna Interface Standards Group — Wikipedia](https://en.wikipedia.org/wiki/Antenna_Interface_Standards_Group)
- [Design and Implementation of AISG Modem for Antenna Line Device — IEEE 2011](https://ieeexplore.ieee.org/document/5954333/)
- [AISG Info — AgileAccess](http://www.agileaccess.com/AISG_Info_00.htm)

---

> **사용자 작업 (미팅 1일 전, 15분)**: 본 § 1 표 + § 3.1 MAX11947 사양 + § 5 Q&A 6개를 소리 내어 답변 연습.
> **미팅 중**: 클라이언트가 "PHY는 어떻게…" 류 질문 시 본 자료 화면 공유.
