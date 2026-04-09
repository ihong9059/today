# STM32F429ZI 사양서 — 한 페이지 요약

> **Xerix MFC Controller 채택 MCU**
> **제조사**: STMicroelectronics | **Part**: STM32F429ZIT6 | **패키지**: LQFP144
> **상세 문서**: `STM32F429ZI_사양서_상세.md`

---

## 🎯 핵심 사양 한눈에 보기

| 분류 | 사양 |
|---|---|
| **코어** | ARM® Cortex®-M4 @ **180 MHz** + 단정밀도 FPU + DSP |
| **성능** | **225 DMIPS** / 608 CoreMark |
| **Flash** | **2 MB** (섹터 12개, ART Zero-wait) |
| **RAM** | **256 KB** (CCM 64KB + SRAM 192KB) + 4KB Backup |
| **패키지** | **LQFP144** (20×20mm, 0.5mm pitch) |
| **GPIO** | **114핀** 사용 가능 |
| **동작 전압** | 1.8 ~ 3.6 V |
| **동작 온도** | **−40°C ~ +85°C** (산업용 ZIT7은 +105°C) |
| **전력** | Run 260mA @ 180MHz / Stop < 2.5µA |
| **단가** | 약 **$10~12** @ 100개 기준 |

---

## 📡 주변장치 요약

| 종류 | 수량 | 세부 |
|---|:---:|---|
| **USART / UART** | **4 + 4** | 최대 11.25 Mbps |
| **SPI** | **6** | 최대 45 Mbps |
| **I²C** | **3** | 100k / 400k / 1M Hz |
| **CAN** | **2** | 2.0B Active |
| **USB** | OTG FS + OTG HS | FS는 내장 PHY |
| **Ethernet MAC** | **1** | 10/100, DMA 내장 |
| **ADC** | **3 × 12bit** | 24채널, 2.4 MSPS |
| **DAC** | **2 × 12bit** | — |
| **타이머** | **17개** | Advanced 2 + GP 10 + Basic 2 + WDG 2 + RTC 1 |
| **DMA** | **16 stream × 2** | FIFO + Burst |
| **FMC** | 1 | SRAM/SDRAM/NOR/NAND, 32bit 버스 |
| **LCD-TFT** | 1 | 최대 4096×2048 |
| **CRC / RNG** | 각 1 | HW CRC32 + TRNG |

---

## ✅ Xerix MFC 적합도

### Xerix 요구사항 충족 매트릭스

| 요구 | 필요 수량 | F429ZI 제공 | 결과 |
|---|:---:|:---:|:---:|
| SPI (ET1100 + Sensor AFE + OLED) | 3+ | **6** | ✅ 2배 여유 |
| UART (HIX + HIC + DeviceNet + EtherCAT) | 4 | **4+4** | ✅ 2배 여유 |
| I²C (Pressure + EEPROM) | 2 | **3** | ✅ 충분 |
| CAN (DeviceNet) | 1 | **2** | ✅ 충분 |
| DAC (Piezo + Solenoid) | 2 | **2** | ✅ 정확 |
| Flash (FW + ESI + EDS + Gas Table) | ~500KB | **2 MB** | ✅ 4배 여유 |
| RAM (변수 + 버퍼) | ~50KB | **256 KB** | ✅ 5배 여유 |
| 1ms PID + MGMR + EtherCAT | 100+ MIPS | **225 DMIPS** | ✅ 충분 |
| 동작 온도 | 0~60°C | −40~+85°C | ✅ 충분 |

### 종합 평가: ⭐⭐⭐⭐⭐ **Xerix MFC에 최적**

---

## 🔌 Xerix MFC 핀 배분 (요약)

| 기능 | 핀 수 |
|---|:---:|
| EtherCAT ET1100 (SPI1 + IRQ) | 6 |
| Sensor AFE (SPI2 + I²C) | 6 |
| OLED Display (SPI3) | 3 |
| UART1 (Debug HIX) | 2 |
| UART2 (Customer HIC) | 2 |
| UART3 (DeviceNet) | 2 |
| UART4 (EtherCAT Debug) | 2 |
| CAN1 (DeviceNet 대체) | 2 |
| I²C1 (Pressure Sensor) | 2 |
| I²C2 (Sensor EEPROM) | 2 |
| Internal ADC (보조 측정) | 8 |
| DAC (밸브 구동) | 2 |
| TIM PWM (Solenoid + Dither) | 4 |
| OLED + Button + LED | 6 |
| DIP Switch (센서/아날로그/프로토콜) | 4 |
| Ethernet RMII (옵션) | 9 |
| JTAG/SWD 디버그 | 5 |
| 기타/예비 | ~13 |
| **합계 (사용)** | **~80핀** |
| **여유분** | **~34핀** (30%) |

---

## 🆚 대안 MCU 비교

| MCU | 클럭 | Flash | RAM | Ethernet | 단가 | Xerix 적합 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| STM32F103 (M3) | 72 MHz | 1 MB | 96 KB | ❌ | $5 | △ |
| STM32F303 (M4) | 72 MHz | 512 KB | 80 KB | ❌ | $6 | ○ |
| **STM32F429ZI (M4)** ⭐ | **180 MHz** | **2 MB** | **256 KB** | **✅** | **$10** | **✅✅** |
| STM32F746 (M7) | 216 MHz | 1 MB | 320 KB | ✅ | $13 | ○ (과잉) |
| STM32H723 (M7) | 550 MHz | 1 MB | 564 KB | ✅ | $15 | ○ (과잉) |
| STM32H743 (M7) | 480 MHz | 2 MB | 1 MB | ✅ | $18 | ○ (과잉) |

**선정 근거**: 성능/가격/개발 자료/공급 안정성의 **최적 균형점**

---

## 🛠️ 개발 환경 (모두 무료)

| 도구 | 용도 |
|---|---|
| **STM32CubeMX** | 핀 설정, 클럭 트리, 코드 생성 |
| **STM32CubeIDE** | 통합 개발 환경 (Eclipse + GCC) |
| **STM32CubeProgrammer** | Flash 프로그래밍 |
| **HAL/LL Driver** | 공식 드라이버 라이브러리 |
| **X-CUBE-ECAT** | EtherCAT Slave 스택 (LAN9252용, ET1100 포팅 필요) |
| **Nucleo-F429ZI** | 평가 보드 ($25) |
| **ST-Link V3** | JTAG/SWD 디버거 |

---

## ⚠️ 주요 고려사항

| # | 항목 | 대응 |
|:---:|---|---|
| 1 | 내장 ADC 12bit (고정밀 센서 부족) | **외장 ADS1220/ADS1263** 사용 (24/32bit) |
| 2 | 180 MHz 고클럭 → EMI | Clock spreading + Guard Ring + 필터 |
| 3 | 단정밀도 FPU (H7은 DP) | Coriolis 위상차에 SP 충분 |
| 4 | X-CUBE-ECAT는 LAN9252 기준 | **ET1100 SPI 포팅 +1주** (Phase 3) |

---

## 📚 공식 문서

| 문서 | 번호 |
|---|---|
| Datasheet | **DS9405** |
| Reference Manual | **RM0090** (약 1,700 페이지) |
| Programming Manual | **PM0214** |
| Errata Sheet | **ES0206** |
| Application Note (ADC) | AN3116 |
| Application Note (Ethernet) | AN3968 |

**공식 URL**: https://www.st.com/en/microcontrollers-microprocessors/stm32f429zi.html

---

## 🎯 결론

STM32F429ZI는 **Xerix MFC Controller 요구사항을 모두 충족**하며, 특히 다음 항목에서 강점을 보입니다.

✅ **180 MHz M4 + FPU** — PID 1ms + MGMR + EtherCAT 동시 처리 충분
✅ **6개 SPI** — ET1100 + Sensor AFE + OLED + 예비 3개
✅ **4+4 UART** — 4종 프로토콜(HIX/HIC/DeviceNet/ECAT) 동시 지원
✅ **Ethernet MAC 내장** — EoE 진단 웹 구현 가능
✅ **2 MB Flash / 256 KB RAM** — 여유 공간 4~5배
✅ **LQFP144** — 납땜 용이, 재작업 가능 (BGA 대비 장점)
✅ **한국 내 개발 자료/커뮤니티 풍부**
✅ **단가 $10 수준** — 양산 원가 적정

> **최종 권고**: **STM32F429ZIT6** (상용 −40~+85°C) 채택 — 2만개 이상 양산 시 ZIT7 (산업 −40~+105°C) 전환 검토

---

**작성일**: 2026-04-09
**작성자**: UTTEC Xerix MFC Controller 기술 검토 세션
**상세 문서**: `STM32F429ZI_사양서_상세.md`

**공식 출처**:
- [STM32F429ZI Product Page (STMicroelectronics)](https://www.st.com/en/microcontrollers-microprocessors/stm32f429zi.html)
