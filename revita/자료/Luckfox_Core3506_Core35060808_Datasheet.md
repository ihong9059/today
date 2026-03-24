# Luckfox Core3506 (Core35060808) 사양서

## 개요

Luckfox Core3506은 Rockchip RK3506B 칩 기반의 소형 코어 보드로, IoT, 스마트 오디오, 스마트 디스플레이, 산업 제어 및 교육용 애플리케이션에 적합합니다.

**모델 번호:**
- **Core35060800**: 온보드 스토리지 없음
- **Core35060808**: 8GB eMMC 포함

---

## 하드웨어 사양

### 프로세서

| 항목 | 사양 |
|------|------|
| SoC | Rockchip RK3506B |
| 공정 | 22nm |
| CPU | Triple-core ARM Cortex-A7 (32-bit) @ 1.2GHz |
| MCU | ARM Cortex-M0 (내장) |
| 아키텍처 | 4-core 이종 멀티코어 (3× Cortex-A7 + 1× Cortex-M0) |

### 메모리 및 스토리지

| 항목 | 사양 |
|------|------|
| RAM | 512MB DDR3L (온보드) |
| 스토리지 (Core35060808) | 8GB eMMC |
| 확장 스토리지 | SPI FLASH / eMMC / SDMMC 지원 |

### 인터페이스

| 인터페이스 | 사양 |
|------------|------|
| USB | 2× USB OTG 2.0 |
| 이더넷 | 2× 10M/100M RMII |
| 디스플레이 | MIPI DSI 2-lane (최대 1280×1280 @ 60fps) |
| 오디오 | 아날로그 차동 MIC 인터페이스 × 1 |
| ADC | 4채널 |
| FSPI | 1× |

### GPIO 및 Matrix IO

| 항목 | 사양 |
|------|------|
| GPIO 핀 수 | 32개 Rockchip Matrix IO |
| 연결 방식 | 120핀 캐스텔레이션 홀 (stamp holes) |
| 지원 기능 | PWM, UART, I2C, SPI, I2S, CAN (멀티플렉싱) |

> **참고**: Rockchip Matrix IO 디자인을 통해 98개의 기능 신호를 GPIO 핀에 멀티플렉싱하여 인터페이스를 유연하게 구성할 수 있습니다.

---

## 물리적 사양

| 항목 | 사양 |
|------|------|
| 보드 크기 | 32mm × 32mm |
| 핀 연결 | 120핀 캐스텔레이션 홀 |
| 동작 온도 | -20°C ~ 60°C |

---

## 소프트웨어 지원

- **운영체제**: Buildroot Linux
- **개발 환경**: 임베디드 Linux 개발

---

## 주요 특징

1. **컴팩트한 크기**: 32×32mm 소형 폼팩터
2. **이종 멀티코어**: Cortex-A7 (고성능) + Cortex-M0 (저전력) 조합
3. **풍부한 인터페이스**: 듀얼 USB, 듀얼 이더넷, MIPI 디스플레이
4. **유연한 GPIO**: Matrix IO를 통한 다양한 인터페이스 멀티플렉싱
5. **저전력 설계**: 22nm 공정으로 전력 효율 우수

---

## 응용 분야

- IoT 디바이스
- 스마트 오디오 시스템
- 스마트 디스플레이
- 산업 제어
- 교육용 개발 보드
- 엣지 컴퓨팅

---

## 참고 자료

- [Luckfox 공식 사이트 - Core3506](https://www.luckfox.com/Core3506)
- [Luckfox Wiki - Core3506 Introduction](https://wiki.luckfox.com/Core3506/Introduction/)
- [Waveshare - Core3506](https://www.waveshare.com/core3506.htm)
- [Spotpear - Core35060808](https://spotpear.com/shop/Luckfox-Lyra-Ultra-RK3506B-512MB/Core35060808.html)

---

## 모델 비교

| 모델 | RAM | eMMC | 가격 (참고) |
|------|-----|------|-------------|
| Core35060800 | 512MB DDR3L | 없음 | - |
| Core35060808 | 512MB DDR3L | 8GB | ~$19.99 |

---

## Core3506 기반 개발 키트

Core3506을 사용한 공식 개발 보드/키트 목록입니다.

### Luckfox Lyra 시리즈

| 제품명 | 프로세서 | RAM | 스토리지 | 특징 | 가격 (참고) |
|--------|----------|-----|----------|------|-------------|
| **Luckfox Lyra** | RK3506G2 | 128MB DDR3L | - | 기본형, 듀얼 USB OTG 2.0 | ~$7.99 |
| **Luckfox Lyra Plus** | RK3506G2 | 128MB DDR3L | - | 이더넷 포트 포함 | ~$9.99 |
| **Luckfox Lyra Ultra** | RK3506B | 512MB DDR3L | 8GB eMMC | WiFi 6, BT 5.2, PoE 지원 | ~$33.99 |
| **Luckfox Lyra Pi** | RK3506B (Core3506) | 512MB DDR3L | 8GB eMMC | Core3506 모듈 기반, 4G 확장 가능 | ~$29.99 |
| **Luckfox Lyra Zero W** | RK3506G | 256MB DDR3L | - | 소형, WiFi/BT 내장 | ~$12.99 |

### Luckfox Lyra Pi 상세 사양

Core3506 코어 보드를 직접 사용하는 개발 키트입니다.

| 항목 | 사양 |
|------|------|
| 코어 모듈 | Luckfox Core3506 |
| 디스플레이 | MIPI DSI (최대 1280×1280 @ 60Hz) |
| 무선 | 2.4GHz WiFi 6 + Bluetooth 5.2/BLE |
| 4G 확장 | SIM7600G-H-M.2 모듈 지원 (별도 구매) |
| USB | USB OTG 2.0, MX1.25 USB 포트 (4G 전환 가능) |
| 이더넷 | 10/100M RMII |
| GPIO | Rockchip Matrix IO (98개 기능 신호 멀티플렉싱) |

### Luckfox Lyra Ultra 상세 사양

| 항목 | 사양 |
|------|------|
| SoC | Rockchip RK3506B |
| CPU | Triple-core ARM Cortex-A7 @ 1.2GHz |
| MCU | ARM Cortex-M0 (SMP/AMP 지원) |
| RAM | 512MB DDR3L |
| 스토리지 | 8GB eMMC |
| 무선 | 2.4GHz WiFi 6 + Bluetooth 5.2/BLE |
| USB | USB OTG 2.0 × 1, USB HOST 2.0 × 2 (HUB 확장) |
| 디스플레이 | MIPI DSI 2-lane |
| 이더넷 | 10/100M |
| GPIO | 29× Rockchip Matrix IO + 4× GPIO |
| 오디오 | 내장 오디오/비디오 코덱 |

### 키트 옵션

| 제품 | 구성 | 가격 (참고) |
|------|------|-------------|
| Lyra Ultra (기본) | 보드 단품 | ~$33.99 |
| Lyra Ultra W | 보드 + WiFi 모듈 | ~$39.99 |
| Lyra Ultra W PoE Kit | 보드 + WiFi + PoE 모듈 | ~$49.99 |
| Lyra Ultra W LCD Kit B | 보드 + WiFi + 10.1" DSI LCD | ~$79.99 |

### 구매처

- **Luckfox 공식**: [luckfox.com](https://www.luckfox.com/)
  - [Core3506](https://www.luckfox.com/Core3506)
  - [Lyra Pi](https://www.luckfox.com/Luckfox-Lyra-Pi)
  - [Lyra Ultra](https://www.luckfox.com/Luckfox-Lyra-Ultra)
- **Waveshare**: [waveshare.com/core3506.htm](https://www.waveshare.com/core3506.htm)
- **Amazon**: [Luckfox Core3506](https://www.amazon.com/s?k=luckfox+core3506)
- **Spotpear**: [Core35060808](https://spotpear.com/shop/Luckfox-Lyra-Ultra-RK3506B-512MB/Core35060808.html)

---

## Linux 포팅 가이드

Core3506에 Linux를 포팅하는 상세 가이드는 별도 문서를 참조하세요:
- [Luckfox_Core3506_Linux_Porting_Guide.md](./Luckfox_Core3506_Linux_Porting_Guide.md)

---

*문서 작성일: 2026-03-18*
*문서 업데이트: 2026-03-19*
