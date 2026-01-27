# Jetson Nano WS2812 LED 제어 프로젝트

## 작업 일자
2026-01-27

## 목표
Jetson Nano 40핀 헤더를 통해 WS2812 LED를 제어

## 진행 사항

### 1. GPIO 비트뱅잉 시도
- **Pin 19 (GPIO16)** 사용
- `/dev/mem`을 통한 직접 GPIO 레지스터 제어
- ARM cycle counter를 이용한 정밀 타이밍 구현

#### 결과
- GPIO 토글 동작 확인 (blink2.c)
- WS2812 타이밍 측정 (오실로스코프):
  - T0H: ~300ns (목표: 220-380ns) ✓
  - T1H: ~700ns (목표: 580-1000ns) ✓
- **색상 순서 확인: GRB (WS2812 표준)**
  - Byte1 = Green
  - Byte2 = Red
  - Byte3 = Blue

#### 문제점
- Linux 커널 인터럽트로 인한 타이밍 불안정
- 색상이 불규칙하게 표시됨 (가끔 작동, 가끔 흰색)
- **GPIO 비트뱅잉은 실시간 OS가 아닌 Linux에서 불안정**

### 2. SPI 시도
- `/dev/spidev0.0`, `/dev/spidev1.0` 등 SPI 디바이스 존재 확인
- SPI 컨트롤러 상태: okay (활성화됨)

#### 결과
- **Pin 19에서 SPI 신호 없음**
- Pinmux가 GPIO 모드로 설정되어 있음
- `/dev/mem`으로 pinmux 변경 시도했으나 실패

#### 문제점
- SPI 핀이 40핀 헤더에 물리적으로 연결되지 않음
- **Device Tree 수정 필요** (부팅 설정 변경)
- 이전에 Device Tree 수정으로 부팅 실패 경험 있음

### 3. PWM 검토
- pwmchip0, pwmchip4 존재 확인
- **WS2812에 부적합** (각 비트마다 다른 duty cycle 필요)

## 생성된 파일

| 파일 | 설명 |
|------|------|
| blink.c | GPIO 토글 테스트 (초기 버전) |
| blink2.c | GPIO 토글 테스트 (정상 작동) |
| ws2812_v2~v9.c | WS2812 타이밍 조정 버전들 |
| ws2812_scope.c | 오실로스코프 타이밍 측정용 |
| ws2812_final_grb.c | 최종 GRB 순서 적용 버전 |
| ws2812_spi.c | SPI 방식 시도 |
| app.py | AHT20 센서 웹 앱 |

## 결론

| 방법 | 상태 | 비고 |
|------|------|------|
| GPIO 비트뱅잉 | △ 불안정 | Linux 인터럽트 문제 |
| SPI | ✗ 불가 | Device Tree 수정 필요 |
| PWM | ✗ 부적합 | WS2812 프로토콜과 맞지 않음 |

## 권장 해결책

1. **Arduino 사용 (추천)**
   - Jetson → Serial/I2C → Arduino → WS2812
   - 가장 안정적

2. **Device Tree 수정**
   - SPI 핀 활성화
   - 백업 필수, 위험 있음

3. **ESP32 사용**
   - RMT 하드웨어로 완벽한 타이밍
   - WiFi/Serial로 Jetson과 통신

## 다음 작업
- Device Tree 수정하여 SPI 활성화 시도 (백업 후)
- 또는 Arduino를 이용한 WS2812 제어 구현

## 하드웨어 연결

```
Jetson Nano 40-Pin Header:
- Pin 19 (GPIO16): WS2812 DIN
- Pin 2/4 (5V): WS2812 VCC
- Pin 6/9/14/20/25 (GND): WS2812 GND
```

## Tegra210 GPIO 정보

```
GPIO16 = Port C, Bit 0
GPIO Base: 0x6000d000
- GPIO_CNF: 0x08 (Port C)
- GPIO_OE:  0x18 (Port C)
- GPIO_OUT: 0x28 (Port C)
```
