# STM32F429ZI 상세 사양서

> **작성일**: 2026-04-09
> **목적**: Xerix MFC Controller 프로젝트용 MCU 기술 사양 정리
> **제조사**: STMicroelectronics (www.st.com)
> **부품 번호**: STM32F429ZIT6 (표준 주문 코드)
> **패키지**: LQFP144 (20×20 mm, 0.5 mm pitch)
> **관련 문서**:
> - `Xerix_MFC_Controller_개발_제안서_UTTEC_v1.0.md`
> - `Xerix_MFC_PID_제어방식_비교_분석.md`

---

## 1. 제품 개요

STM32F429ZI는 STMicroelectronics의 **STM32 F4 시리즈 고성능 ARM Cortex-M4 기반 마이크로컨트롤러**로, 풍부한 주변장치와 고성능 DSP 기능을 제공하며 **산업 제어, IoT, 모션 제어, 그래픽 디스플레이** 등 고성능 임베디드 응용에 적합합니다.

### 1.1 핵심 특징
- **180 MHz** ARM Cortex-M4 with FPU
- **2 MB Flash** / **256 KB SRAM + 4 KB 백업 RAM**
- **Ethernet MAC 내장** (10/100)
- **LCD-TFT Controller 내장**
- **Chrom-ART Accelerator** 그래픽 가속기
- **144핀 LQFP 패키지**
- **114개 GPIO**

---

## 2. 코어 및 성능

| 항목 | 사양 |
|---|---|
| **CPU 코어** | ARM® 32-bit Cortex®-M4 |
| **FPU (부동소수점)** | 단정밀도 FPU (Single-Precision) 내장 |
| **최대 클럭** | **180 MHz** |
| **성능** | **225 DMIPS** @ 180 MHz |
| **CoreMark 점수** | 608 CoreMark @ 180 MHz |
| **명령어 세트** | Thumb-2 / ARMv7E-M |
| **DSP 명령어** | SIMD (Single Instruction Multiple Data) 지원 |
| **MPU (Memory Protection)** | 내장 |
| **ART Accelerator™** | Adaptive Real-Time accelerator (Flash zero-wait access) |
| **캐시** | 별도 D/I-Cache 없음 (ART로 대체) |

### 2.1 CPU 성능 비교

| MCU | 클럭 | DMIPS | FPU | Xerix MFC 적합도 |
|---|:---:|:---:|:---:|:---:|
| STM32F103 (M3) | 72 MHz | 90 | ❌ | △ (FPU 없음) |
| STM32F303 (M4) | 72 MHz | 90 | SP | ○ |
| **STM32F429ZI (M4)** | **180 MHz** | **225** | **SP** | ✅ **최적** |
| STM32H743 (M7) | 480 MHz | 1027 | DP | ◎ (과잉) |

---

## 3. 메모리

| 항목 | 사양 |
|---|---|
| **Flash** | **2,048 KB (2 MB)** |
| **SRAM 총량** | **256 KB** (4 KB Backup RAM 별도) |
|   └ CCM (Core Coupled Memory) | **64 KB** (Cortex-M4에 직접 연결, 고속 데이터 영역) |
|   └ 일반 SRAM | 192 KB |
|   └ Backup SRAM | 4 KB (VBAT 배터리 백업) |
| **Flash Wait State** | ART Accelerator로 Zero-Wait 효과 |
| **ECC (오류 정정)** | 없음 |

### 3.1 Flash 페이지 구성
- **섹터 12개** 구성: 4×16KB + 1×64KB + 7×128KB
- 각 섹터 개별 Erase/Write 가능
- 사용자 펌웨어 + EtherCAT ESI + PID Gain Table + MGMR Gas Profile 저장에 충분

---

## 4. 전원

| 항목 | 사양 |
|---|---|
| **입력 전압 (VDD)** | **1.8 V ~ 3.6 V** |
| **I/O 전압** | 1.8 V ~ 3.6 V |
| **Analog 전압 (VDDA)** | 1.7 V ~ 3.6 V |
| **VBAT (배터리)** | 1.65 V ~ 3.6 V |
| **POR/PDR** | 내장 (Power-on/Power-down Reset) |
| **PVD** | Programmable Voltage Detector |
| **최대 전력 소비** | 약 500 mW (전부하, 180 MHz) |
| **Run Mode (180 MHz)** | 약 260 mA @ 3.3V |
| **Stop Mode** | < 2.5 µA (RTC 유지) |
| **Standby Mode** | < 2 µA |
| **Backup Mode** | < 1 µA (VBAT 유지) |

### 4.1 Xerix MFC 전원 고려사항
- **Main Controller 3.3V** 공급 → STM32F429 단독 약 1A 필요 (여유 포함)
- +24V → TPS54360 DC-DC Buck → 5V → LDO → 3.3V 경로 권장
- **탄탈륨 금지** 조건 준수: 알루미늄 폴리머 + MLCC 조합

---

## 5. 클럭 소스

| 소스 | 주파수 | 용도 |
|---|---|---|
| **HSI (Internal RC)** | 16 MHz | 초기 부팅, 저정밀 |
| **HSE (External XTAL)** | 4 ~ 26 MHz | 고정밀 클럭 (PLL 입력) |
| **LSI (Internal RC)** | 32 kHz | 저전력 RTC, Watchdog |
| **LSE (External XTAL)** | 32.768 kHz | RTC 고정밀 |
| **PLL 1** | 최대 180 MHz | 시스템 클럭 생성 |
| **PLL 2 (PLLI2S)** | 가변 | I²S, SAI 전용 |
| **PLL 3 (PLLSAI)** | 가변 | LCD-TFT, USB 전용 |
| **MCO (Clock Out)** | - | 외부 칩 클럭 공급 (예: ET1100 25 MHz 공급 가능) |

### 5.1 Xerix MFC 권장 클럭 구성
- **HSE**: 8 MHz 또는 25 MHz 수정 발진자
- **System Clock**: PLL로 180 MHz 생성
- **APB1 (저속)**: 45 MHz (UART/I²C/CAN)
- **APB2 (고속)**: 90 MHz (SPI/ADC)
- **Ethernet**: 25 MHz 또는 50 MHz RMII

---

## 6. 주변장치 (Peripherals)

### 6.1 통신 인터페이스

| 인터페이스 | 수량 | 사양 | Xerix MFC 용도 |
|---|:---:|---|---|
| **USART** | **4** | 최대 11.25 Mbps | UART1 Debug (HIX), UART2 Customer (HIC), UART3 DeviceNet, UART4 EtherCAT 디버그 |
| **UART** | **4** | 기본 UART | RS485 (UART5/6 등 추가 활용) |
| **SPI** | **6** | 최대 45 Mbps | **ET1100 (SPI1), Sensor AFE (SPI2), OLED (SPI3)**, 여유 3개 |
| **I²S** | **2** | SPI2/SPI3와 공유 | — |
| **I²C** | **3** | 100/400 kHz, Fast Mode+ 1 MHz | Pressure Sensor, Sensor EEPROM |
| **CAN** | **2** | 2.0B Active | **DeviceNet Sub-Board** |
| **USB OTG FS** | **1** | Full-Speed with On-Chip PHY | 펌웨어 업데이트 |
| **USB OTG HS** | **1** | High-Speed (ULPI로 외부 PHY 필요) | — |
| **Ethernet MAC** | **1** | 10/100 with DMA | EoE 진단, 웹 서버 (옵션) |
| **SDIO** | **1** | SD/MMC/eMMC | 로그 저장 (옵션) |

### 6.2 아날로그 주변장치

| 항목 | 사양 | Xerix MFC 용도 |
|---|---|---|
| **ADC** | **3개 × 12bit, 24채널** | 보조 측정 (온도, 전원 모니터, 밸브 피드백) |
|   └ 변환 속도 | 최대 **2.4 MSPS** (Fast Mode) | |
|   └ 정밀도 | ENOB 약 10.5 bit (noise 포함) | |
|   └ 특수 기능 | Triple Interleaved Mode (7.2 MSPS 가능) | |
|   └ 기준 전압 | VREF+ 외부 입력 또는 VDDA | |
| **DAC** | **2개 × 12bit** | 밸브 드라이버 제어 (Solenoid 비례 전류원) |
| **온도 센서** | 내장 (ADC 채널 16) | MCU 자체 온도 모니터 |
| **VBAT 측정** | 내장 (ADC 채널 18) | 배터리 상태 |

> ※ 고정밀 센서 측정(Coriolis 24/32bit)에는 **외장 ADS1220/ADS1263** 사용 (내장 12bit는 부족)

### 6.3 타이머

| 타이머 | 수량 | 특징 | 용도 |
|---|:---:|---|---|
| **Advanced-Control Timer (TIM1, TIM8)** | 2 | 16bit, 3상 PWM, 데드타임, 브레이크 | 밸브 PWM 생성 |
| **General Purpose (TIM2, TIM5)** | 2 | **32bit**, 캡처/비교 | PID 1ms 타이머, 시간 측정 |
| **General Purpose 16bit** | 8 | TIM3, TIM4, TIM9~14 | DShot, 서보, 카운터 |
| **Basic Timer** | 2 | TIM6, TIM7 | DAC Trigger, DMA Trigger |
| **Watchdog** | 2 | Independent (IWDG) + Window (WWDG) | 시스템 감시 |
| **RTC** | 1 | 캘린더, 알람 2개, Tamper | 시간 기록, 이벤트 타임스탬프 |
| **SysTick** | 1 | 24bit Cortex 내장 | OS Tick, 1ms 주기 |

**총 17개 타이머** (Advanced 2 + GP 10 + Basic 2 + Watchdog 2 + RTC 1)

### 6.4 DMA

| 항목 | 사양 |
|---|---|
| **DMA 컨트롤러** | **2개** (DMA1, DMA2) |
| **스트림 수** | **16 스트림** (각 DMA 8개) |
| **FIFO** | 각 스트림별 4 level FIFO |
| **Burst 전송** | 지원 (4/8/16 beat) |
| **Dual-Buffer Mode** | 지원 (Ping-Pong) |
| **Memory-to-Memory** | 지원 (DMA2만) |

#### Xerix MFC DMA 활용 계획
- DMA2 Stream 0: ADS1263 SPI 연속 샘플링 (Coriolis)
- DMA1 Stream 3: ADS1220 SPI (Thermal)
- DMA1 Stream 5: UART RS485 RX 연속 수신
- DMA2 Stream 6: ET1100 SPI PDI
- DMA2 Stream 4: DAC 업데이트 (PID 출력)

### 6.5 외부 메모리 컨트롤러 (FMC)

| 항목 | 사양 |
|---|---|
| **FMC (Flexible Memory Controller)** | 내장 |
| **지원 메모리** | SRAM, PSRAM, SDRAM/LPSDR SDRAM, NOR Flash, NAND Flash, Compact Flash |
| **데이터 버스 폭** | 최대 **32bit** |
| **SDRAM 용량** | 최대 **256 MB** |
| **ET1100 Parallel PDI 활용** | FMC로 ET1100 Parallel 16bit PDI 연결 가능 (SPI 대비 고속) |

### 6.6 LCD-TFT Controller

| 항목 | 사양 |
|---|---|
| **내장 LCD-TFT Controller** | 있음 (F429/F439 시리즈 특징) |
| **해상도** | 최대 4096 × 2048 |
| **픽셀 클럭** | 최대 83 MHz |
| **레이어** | 2개 (오버레이) |
| **색상** | 16M Color |
| **Chrom-ART Accelerator™** | 그래픽 가속기 (2D BitBLT, PFC) |

> ※ Xerix MFC는 **SSD1306 OLED (SPI)**를 사용하므로 내장 LCD-TFT는 활용하지 않음. 향후 고급 디스플레이 요구 시 확장 여지.

### 6.7 카메라 인터페이스

| 항목 | 사양 |
|---|---|
| **DCMI** | 8 ~ 14bit 병렬 카메라 인터페이스 |
| **용도** | 머신 비전, 이미지 캡처 |

### 6.8 기타 주변장치

| 항목 | 사양 |
|---|---|
| **CRC 계산 유닛** | 하드웨어 CRC32 |
| **진난수 생성기 (RNG)** | True Random Number Generator |
| **GPIO** | **114개** (LQFP144 기준) |
| **외부 인터럽트** | 23 EXTI 라인 |

---

## 7. 패키지 및 핀

| 항목 | 사양 |
|---|---|
| **패키지** | **LQFP144** |
| **크기** | 20 × 20 mm (본체) / 22 × 22 mm (리드 포함) |
| **핀 간격 (Pitch)** | 0.5 mm |
| **핀 수** | 144 |
| **GPIO 가용** | **114개** (전원/GND/디버그/VREF 제외) |
| **납땜 등급** | RoHS3 / 무연 |
| **MSL (Moisture Sensitivity Level)** | Level 3 |

### 7.1 Xerix MFC 핀 배분 계획

| 기능 | 핀 수 | 비고 |
|---|:---:|---|
| SPI1 (ET1100) | 4 | SCK, MISO, MOSI, nSS |
| SPI2 (Sensor AFE) | 4 | ADS1220 / ADS1263 |
| SPI3 (OLED) | 3 | SCK, MOSI, DC |
| SPI4~6 | 12 | 예비 |
| UART1 (Debug HIX) | 2 | TX, RX |
| UART2 (Customer HIC) | 2 | TX, RX |
| UART3 (DeviceNet 예비) | 2 | TX, RX |
| UART4 (EtherCAT 디버그) | 2 | TX, RX |
| I²C1 (Pressure Sensor) | 2 | SCL, SDA |
| I²C2 (Sensor EEPROM) | 2 | SCL, SDA |
| CAN1 (DeviceNet) | 2 | TX, RX (MCP2515 대체) |
| ADC (보조 12bit) | 8 | 온도, 전원 모니터, 밸브 피드백 |
| DAC (밸브 구동) | 2 | Piezo HV 기준 / Solenoid 기준 |
| TIM1/TIM8 PWM (Solenoid) | 4 | PWM + Dither |
| OLED + Button + LED | 6 | |
| DIP SW (센서/아날로그/프로토콜) | 4 | |
| EtherCAT SYNC0/1 IRQ | 2 | ET1100 인터럽트 |
| Ethernet RMII (옵션) | 9 | |
| JTAG/SWD | 5 | |
| 기타 GPIO | ~ | 여유분 |
| **합계** | **~80 핀 사용** | 114 핀 중 약 70% |

**여유 GPIO 약 34핀** → Sub-Board 인식, 확장 I/O, 향후 기능 추가에 충분

---

## 8. 디버그 인터페이스

| 항목 | 사양 |
|---|---|
| **JTAG** | 5-wire (TCK, TMS, TDI, TDO, TRST) |
| **SWD** | 2-wire (SWDIO, SWCLK) |
| **ETM (Trace)** | 4-pin (옵션) |
| **ITM (Instrumentation)** | 지원 (SWO 단일 핀으로 printf 가능) |
| **권장 디버거** | ST-Link V3, J-Link, DAPLink |

---

## 9. 동작 환경

| 항목 | 사양 |
|---|---|
| **동작 온도** | **−40°C ~ +85°C** (TA, 상용) |
| **확장 온도** | −40°C ~ +105°C (TA, 산업용) — 별도 주문 코드 |
| **저장 온도** | −65°C ~ +150°C |
| **ESD** | HBM ±2 kV, CDM ±500 V |
| **Latch-up** | 규격 적합 |

---

## 10. 주문 정보

| Part Number | 패키지 | Flash | RAM | 온도 |
|---|---|---|---|---|
| **STM32F429ZIT6** | LQFP144 | 2 MB | 256 KB | −40°C ~ +85°C |
| STM32F429ZIT7 | LQFP144 | 2 MB | 256 KB | −40°C ~ +105°C |
| STM32F429ZGT6 | LQFP144 | 1 MB | 256 KB | −40°C ~ +85°C |
| STM32F429ZET6 | LQFP144 | 512 KB | 256 KB | −40°C ~ +85°C |

> **Xerix MFC 권장**: **STM32F429ZIT6** (가장 큰 Flash, 상용 온도)

### 10.1 단가 참고
- Digi-Key 1개 단가: 약 $15~18
- 100개 배치: 약 $10~12
- 1,000개 배치: 약 $7~9
- 10,000개 배치: 약 $5~7 (STMicro 직거래)

---

## 11. 개발 리소스

### 11.1 공식 도구 (무료)
- **STM32CubeMX**: 핀 설정, 클럭 트리, 코드 생성
- **STM32CubeIDE**: 통합 개발환경 (Eclipse 기반, GCC)
- **STM32CubeProgrammer**: Flash 쓰기 도구
- **STM32 HAL / LL Driver**: 공식 드라이버 라이브러리

### 11.2 지원 패키지
- **STM32CubeF4**: F4 시리즈 펌웨어 패키지
- **X-CUBE-ECAT**: EtherCAT Slave 스택 (LAN9252 기준, ET1100은 포팅 필요)
- **X-CUBE-USB**: USB OTG 스택
- **X-CUBE-LWIP**: Ethernet TCP/IP 스택
- **X-CUBE-FATFS**: SD Card 파일시스템

### 11.3 평가 보드
| 보드 | 가격 | 용도 |
|---|---|---|
| **Nucleo-F429ZI** | 약 $25 | 저가 개발 보드, Ethernet + USB |
| **STM32F429I-DISC1** | 약 $40 | LCD-TFT 내장 디스커버리 킷 |
| **EVAL-STM32F429I** | 약 $400 | Full Eval Board (모든 주변장치) |

### 11.4 한국어 자료
- ST 공식 한국 홈페이지 (한국어 일부)
- 국내 다수 블로그/유튜브 튜토리얼
- 국내 커뮤니티: AVR Freaks Korea, STM32 KR, 에프원테크

---

## 12. Xerix MFC 프로젝트 적합도 평가

| 항목 | 요구 | STM32F429ZI 제공 | 평가 |
|---|---|---|:---:|
| **코어 성능** | 1ms PID, MGMR 연산 | 180 MHz Cortex-M4 + FPU | ✅ 충분 |
| **Flash** | ~500 KB (FW + ESI + EDS + Gas Table) | 2 MB | ✅ 4배 여유 |
| **RAM** | ~50 KB | 256 KB | ✅ 5배 여유 |
| **SPI 수** | 3+ (ET1100, AFE, OLED) | 6 | ✅ 2배 여유 |
| **UART 수** | 4 (HIX, HIC, DN, ECAT) | 4 USART + 4 UART | ✅ 2배 여유 |
| **I²C 수** | 2 (Pressure, EEPROM) | 3 | ✅ 충분 |
| **CAN** | 1 (DeviceNet) | 2 | ✅ 충분 |
| **ADC** | 보조 측정 | 3 × 12bit 24ch | ✅ 충분 |
| **DAC** | 2 (밸브 기준) | 2 × 12bit | ✅ 정확히 충족 |
| **타이머** | PID 1ms + PWM + RTC | 17개 | ✅ 풍부 |
| **DMA** | 센서 연속 샘플링 | 16 stream × 2 | ✅ 풍부 |
| **Ethernet** | EoE / 웹 진단 (옵션) | MAC 내장 | ✅ 지원 |
| **GPIO** | 약 80핀 필요 | 114핀 | ✅ 30% 여유 |
| **동작 온도** | 산업용 0~60°C | −40~+85°C | ✅ 충분 |
| **개발 자료** | 한국어 자료 | 풍부 | ✅ 최상 |
| **공급 안정성** | 10년+ | 장기 공급 보장 | ✅ 안정 |
| **단가** | 저렴 | $10~12 @ 100ea | ✅ 합리적 |

**종합 평가**: ✅✅✅ **Xerix MFC 프로젝트에 매우 적합한 최적 MCU**

---

## 13. 리스크 및 고려사항

| # | 리스크 | 영향 | 대응 |
|:---:|---|:---:|---|
| 1 | Cortex-M4 단정밀도 FPU (H7은 DP) | 🟢 | Coriolis 위상차 연산에 SP로 충분, 정밀도 검증 필요 |
| 2 | 내장 ADC 12bit (고정밀 센서 부족) | 🟢 | 외장 ADS1220/ADS1263 사용 |
| 3 | BGA 없음 (LQFP144만) | 🟢 | 납땜/재작업 용이, 장점 |
| 4 | 공급 리드타임 | 🟢 | 주요 유통사 재고 안정 (2~4주) |
| 5 | 180 MHz 고클럭 → EMI | 🟡 | Clock spreading, Guard Ring, 적절한 필터 |
| 6 | 2 MB Flash 일부 섹터 write 후 MCU halt (Erratum) | 🟡 | AN4891 참조, Wait state 조정 |

---

## 14. 참고 문서 (STMicroelectronics 공식)

| 문서 | 번호 | 내용 |
|---|---|---|
| **Datasheet** | DS9405 | Electrical Characteristics, Pinout |
| **Reference Manual** | RM0090 | Peripheral 상세 (약 1,700 페이지) |
| **Programming Manual** | PM0214 | Cortex-M4 programming |
| **Errata Sheet** | ES0206 | Known Issues |
| **Application Note (EtherCAT)** | AN5397 | LAN9252 + X-CUBE-ECAT (참고용, ET1100은 별도 포팅) |
| **Application Note (ADC)** | AN3116 | ADC 성능 최적화 |
| **Application Note (Ethernet)** | AN3968 | Ethernet MAC 설정 |

---

**작성일**: 2026-04-09
**작성자**: UTTEC Xerix MFC Controller 기술 검토 세션
**관련 문서**:
- `Xerix_MFC_Controller_개발_제안서_UTTEC_v1.0.md`
- `Xerix_MFC_PID_제어방식_비교_분석.md`
- `MFC_응답시간_0.1초이하_달성_난이도_분석.md`

**공식 출처**:
- STMicroelectronics STM32F429ZI Product Page: https://www.st.com/en/microcontrollers-microprocessors/stm32f429zi.html
- Datasheet DS9405, Reference Manual RM0090
