# UTTEC Raspberry Pi Multi-Function Shield
## 라즈베리파이 다기능 확장 보드 개발 포트폴리오

---

## 1. 포트폴리오 소개

### 서비스 카테고리
**IoT / 산업용 통신 / 임베디드 시스템**

### 제품 개요
라즈베리파이 40핀 GPIO에 연결하여 다양한 산업용 통신 및 디스플레이 기능을 제공하는 올인원 확장 보드

### 메인 타깃
- **산업 자동화 엔지니어**: 공장 자동화, 설비 모니터링
- **IoT 개발자**: LoRa 기반 장거리 무선 통신 프로젝트
- **교육 기관**: 임베디드 시스템 및 통신 프로토콜 교육
- **메이커/연구자**: 프로토타이핑 및 연구 개발

### 한 줄 소개
> **산업용 통신(RS485/RS422)과 장거리 무선통신(LoRa)을 지원하는 라즈베리파이 다기능 확장 보드 개발**

---

## 2. 작업 범위

### 2.1 하드웨어 개발

| 항목 | 내용 |
|------|------|
| **회로 설계** | 전체 회로도 설계 및 검증 |
| **PCB 설계** | 4층 PCB 아트워크 설계 |
| **부품 선정** | 산업용 등급 부품 선정 및 BOM 작성 |
| **프로토타입** | 시제품 제작 및 테스트 |
| **양산 설계** | DFM(Design for Manufacturing) 적용 |

### 2.2 소프트웨어 개발

| 항목 | 내용 |
|------|------|
| **디바이스 드라이버** | 각 모듈별 Python 드라이버 개발 |
| **라이브러리** | 통합 Python 라이브러리 개발 |
| **예제 코드** | 각 기능별 샘플 코드 작성 |
| **API 문서** | 개발자용 API 레퍼런스 문서 |

### 2.3 지원 환경

| 구분 | 지원 사항 |
|------|-----------|
| **하드웨어** | Raspberry Pi 3B/3B+/4B/5 (40핀 GPIO) |
| **운영체제** | Raspberry Pi OS (Bullseye/Bookworm) |
| **프로그래밍** | Python 3.7+ |
| **통신** | UART, SPI, I2C |

---

## 3. 하드웨어 구성

### 3.1 보드 사양

```
┌────────────────────────────────────────────────────────────┐
│                    UTTEC RPi Shield                        │
│                                                            │
│  ┌──────────┐                          ┌─────────────────┐ │
│  │ Terminal │  ┌────────┐   ┌───┐      │   LoRa Module   │ │
│  │  Block   │  │SSD1306 │   │LED│      │   (SX1276)      │ │
│  │ (RS485)  │  │ OLED   │   └───┘      │                 │──── Antenna
│  └──────────┘  └────────┘              └─────────────────┘ │
│                                                            │
│  ┌──────────┐  ┌─────────────────────────────────────────┐ │
│  │ Terminal │  │         Raspberry Pi 40-Pin Header      │ │
│  │  Block   │  │                                         │ │
│  │ (RS422)  │  └─────────────────────────────────────────┘ │
│  └──────────┘                                              │
│                ┌────────┐  ┌────────────────┐              │
│  ┌────────┐    │  RJ45  │  │ I2C Connector  │              │
│  │7-Seg   │    │        │  │ (4-digit 7Seg) │              │
│  │Connect │    └────────┘  └────────────────┘              │
│  └────────┘                                                │
└────────────────────────────────────────────────────────────┘
```

### 3.2 모듈별 사양

| 모듈 | 칩셋/규격 | 인터페이스 | 주요 사양 |
|------|-----------|------------|-----------|
| **LoRa** | SX1276/SX1278 | SPI | 868/915MHz, 최대 20dBm, 15km+ |
| **OLED** | SSD1306 | I2C | 128x64 픽셀, 0.96인치 |
| **LED** | 5mm Red LED | GPIO | 상태 표시용 |
| **RS485** | MAX485 | UART | Half-duplex, 최대 10Mbps |
| **RS422** | MAX490 | UART | Full-duplex, 최대 10Mbps |
| **7-Segment** | TM1637 | I2C | 4자리, 공통 캐소드 |
| **RJ45** | - | - | RS485/422 외부 연결용 |

### 3.3 핀 맵핑

| 기능 | Raspberry Pi GPIO | 비고 |
|------|-------------------|------|
| **LoRa MOSI** | GPIO 10 (SPI0_MOSI) | SPI 통신 |
| **LoRa MISO** | GPIO 9 (SPI0_MISO) | SPI 통신 |
| **LoRa SCK** | GPIO 11 (SPI0_SCLK) | SPI 통신 |
| **LoRa CS** | GPIO 8 (CE0) | Chip Select |
| **LoRa RST** | GPIO 22 | Reset |
| **LoRa DIO0** | GPIO 27 | Interrupt |
| **OLED SDA** | GPIO 2 (I2C1_SDA) | I2C 데이터 |
| **OLED SCL** | GPIO 3 (I2C1_SCL) | I2C 클럭 |
| **LED** | GPIO 17 | 디지털 출력 |
| **RS485 TX** | GPIO 14 (UART_TXD) | UART 송신 |
| **RS485 RX** | GPIO 15 (UART_RXD) | UART 수신 |
| **RS485 DE/RE** | GPIO 4 | 송수신 방향 제어 |
| **7-Seg CLK** | GPIO 23 | TM1637 클럭 |
| **7-Seg DIO** | GPIO 24 | TM1637 데이터 |

---

## 4. 주요 기능 (Python 구현)

### 4.1 LoRa 무선 통신

#### 기능 설명
- 장거리 저전력 무선 통신 (LoRa)
- 최대 15km 이상 통신 거리
- 센서 데이터 수집, 원격 제어 등에 활용

#### Python 코드 예제

```python
#!/usr/bin/env python3
"""
UTTEC RPi Shield - LoRa Communication Module
SX1276/SX1278 LoRa Transceiver Driver
"""

import spidev
import RPi.GPIO as GPIO
import time

class LoRaModule:
    """LoRa SX1276/SX1278 통신 모듈 클래스"""

    # 레지스터 정의
    REG_FIFO = 0x00
    REG_OP_MODE = 0x01
    REG_FRF_MSB = 0x06
    REG_FRF_MID = 0x07
    REG_FRF_LSB = 0x08
    REG_PA_CONFIG = 0x09
    REG_FIFO_ADDR_PTR = 0x0D
    REG_FIFO_TX_BASE_ADDR = 0x0E
    REG_FIFO_RX_BASE_ADDR = 0x0F
    REG_FIFO_RX_CURRENT_ADDR = 0x10
    REG_IRQ_FLAGS = 0x12
    REG_RX_NB_BYTES = 0x13
    REG_MODEM_CONFIG_1 = 0x1D
    REG_MODEM_CONFIG_2 = 0x1E
    REG_PAYLOAD_LENGTH = 0x22
    REG_MODEM_CONFIG_3 = 0x26
    REG_DIO_MAPPING_1 = 0x40
    REG_VERSION = 0x42

    # 동작 모드
    MODE_SLEEP = 0x00
    MODE_STDBY = 0x01
    MODE_TX = 0x03
    MODE_RX_CONTINUOUS = 0x05
    MODE_LORA = 0x80

    def __init__(self, spi_bus=0, spi_device=0,
                 rst_pin=22, dio0_pin=27, frequency=915.0):
        """
        LoRa 모듈 초기화

        Args:
            spi_bus: SPI 버스 번호 (기본값: 0)
            spi_device: SPI 디바이스 번호 (기본값: 0)
            rst_pin: 리셋 핀 GPIO 번호 (기본값: 22)
            dio0_pin: DIO0 인터럽트 핀 GPIO 번호 (기본값: 27)
            frequency: 통신 주파수 MHz (기본값: 915.0)
        """
        self.rst_pin = rst_pin
        self.dio0_pin = dio0_pin
        self.frequency = frequency

        # GPIO 설정
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(self.rst_pin, GPIO.OUT)
        GPIO.setup(self.dio0_pin, GPIO.IN)

        # SPI 설정
        self.spi = spidev.SpiDev()
        self.spi.open(spi_bus, spi_device)
        self.spi.max_speed_hz = 5000000
        self.spi.mode = 0

        # 모듈 리셋 및 초기화
        self._reset()
        self._init_lora()

    def _reset(self):
        """모듈 하드웨어 리셋"""
        GPIO.output(self.rst_pin, GPIO.LOW)
        time.sleep(0.01)
        GPIO.output(self.rst_pin, GPIO.HIGH)
        time.sleep(0.01)

    def _read_register(self, address):
        """레지스터 읽기"""
        response = self.spi.xfer2([address & 0x7F, 0x00])
        return response[1]

    def _write_register(self, address, value):
        """레지스터 쓰기"""
        self.spi.xfer2([address | 0x80, value])

    def _init_lora(self):
        """LoRa 모드 초기화"""
        # Sleep 모드로 전환
        self._write_register(self.REG_OP_MODE, self.MODE_SLEEP | self.MODE_LORA)
        time.sleep(0.01)

        # 주파수 설정
        self.set_frequency(self.frequency)

        # FIFO 주소 설정
        self._write_register(self.REG_FIFO_TX_BASE_ADDR, 0x00)
        self._write_register(self.REG_FIFO_RX_BASE_ADDR, 0x00)

        # 출력 전력 설정 (17dBm)
        self._write_register(self.REG_PA_CONFIG, 0xFF)

        # 모뎀 설정 (BW=125kHz, CR=4/5, SF=7)
        self._write_register(self.REG_MODEM_CONFIG_1, 0x72)
        self._write_register(self.REG_MODEM_CONFIG_2, 0x74)
        self._write_register(self.REG_MODEM_CONFIG_3, 0x04)

        # Standby 모드로 전환
        self._write_register(self.REG_OP_MODE, self.MODE_STDBY | self.MODE_LORA)

    def set_frequency(self, freq_mhz):
        """
        통신 주파수 설정

        Args:
            freq_mhz: 주파수 (MHz)
        """
        frf = int((freq_mhz * 1000000.0) / 61.035)
        self._write_register(self.REG_FRF_MSB, (frf >> 16) & 0xFF)
        self._write_register(self.REG_FRF_MID, (frf >> 8) & 0xFF)
        self._write_register(self.REG_FRF_LSB, frf & 0xFF)

    def set_spreading_factor(self, sf):
        """
        Spreading Factor 설정 (6-12)

        Args:
            sf: Spreading Factor (6-12)
        """
        if sf < 6 or sf > 12:
            raise ValueError("SF must be between 6 and 12")

        config2 = self._read_register(self.REG_MODEM_CONFIG_2)
        config2 = (config2 & 0x0F) | ((sf << 4) & 0xF0)
        self._write_register(self.REG_MODEM_CONFIG_2, config2)

    def set_bandwidth(self, bw):
        """
        대역폭 설정

        Args:
            bw: 대역폭 (7.8, 10.4, 15.6, 20.8, 31.25, 41.7, 62.5, 125, 250, 500 kHz)
        """
        bw_map = {
            7.8: 0, 10.4: 1, 15.6: 2, 20.8: 3, 31.25: 4,
            41.7: 5, 62.5: 6, 125: 7, 250: 8, 500: 9
        }
        if bw not in bw_map:
            raise ValueError(f"Invalid bandwidth: {bw}")

        config1 = self._read_register(self.REG_MODEM_CONFIG_1)
        config1 = (config1 & 0x0F) | (bw_map[bw] << 4)
        self._write_register(self.REG_MODEM_CONFIG_1, config1)

    def send(self, data):
        """
        데이터 전송

        Args:
            data: 전송할 데이터 (bytes 또는 string)

        Returns:
            bool: 전송 성공 여부
        """
        if isinstance(data, str):
            data = data.encode('utf-8')

        # Standby 모드로 전환
        self._write_register(self.REG_OP_MODE, self.MODE_STDBY | self.MODE_LORA)

        # FIFO 포인터 리셋
        self._write_register(self.REG_FIFO_ADDR_PTR, 0x00)

        # 데이터를 FIFO에 쓰기
        for byte in data:
            self._write_register(self.REG_FIFO, byte)

        # 페이로드 길이 설정
        self._write_register(self.REG_PAYLOAD_LENGTH, len(data))

        # TX 모드로 전환
        self._write_register(self.REG_OP_MODE, self.MODE_TX | self.MODE_LORA)

        # 전송 완료 대기
        timeout = 100
        while timeout > 0:
            irq_flags = self._read_register(self.REG_IRQ_FLAGS)
            if irq_flags & 0x08:  # TxDone
                self._write_register(self.REG_IRQ_FLAGS, 0xFF)
                return True
            time.sleep(0.01)
            timeout -= 1

        return False

    def receive(self, timeout=10):
        """
        데이터 수신

        Args:
            timeout: 수신 대기 시간 (초)

        Returns:
            bytes: 수신된 데이터 또는 None
        """
        # RX Continuous 모드로 전환
        self._write_register(self.REG_OP_MODE,
                            self.MODE_RX_CONTINUOUS | self.MODE_LORA)

        start_time = time.time()
        while (time.time() - start_time) < timeout:
            irq_flags = self._read_register(self.REG_IRQ_FLAGS)

            if irq_flags & 0x40:  # RxDone
                # CRC 에러 체크
                if irq_flags & 0x20:
                    self._write_register(self.REG_IRQ_FLAGS, 0xFF)
                    continue

                # 수신 데이터 읽기
                rx_addr = self._read_register(self.REG_FIFO_RX_CURRENT_ADDR)
                self._write_register(self.REG_FIFO_ADDR_PTR, rx_addr)

                rx_len = self._read_register(self.REG_RX_NB_BYTES)
                data = bytes([self._read_register(self.REG_FIFO)
                             for _ in range(rx_len)])

                self._write_register(self.REG_IRQ_FLAGS, 0xFF)
                return data

            time.sleep(0.01)

        return None

    def get_rssi(self):
        """
        수신 신호 강도 (RSSI) 반환

        Returns:
            int: RSSI 값 (dBm)
        """
        return self._read_register(0x1A) - 137

    def get_snr(self):
        """
        신호 대 잡음비 (SNR) 반환

        Returns:
            float: SNR 값 (dB)
        """
        snr = self._read_register(0x19)
        if snr > 127:
            snr = snr - 256
        return snr / 4.0

    def close(self):
        """리소스 정리"""
        self.spi.close()
        GPIO.cleanup([self.rst_pin, self.dio0_pin])


# 사용 예제
if __name__ == "__main__":
    # LoRa 모듈 초기화
    lora = LoRaModule(frequency=915.0)

    print("LoRa Module Initialized")
    print(f"Version: 0x{lora._read_register(0x42):02X}")

    # 데이터 전송
    message = "Hello from UTTEC Shield!"
    if lora.send(message):
        print(f"Sent: {message}")
    else:
        print("Send failed")

    # 데이터 수신 대기
    print("Waiting for data...")
    received = lora.receive(timeout=30)
    if received:
        print(f"Received: {received.decode('utf-8')}")
        print(f"RSSI: {lora.get_rssi()} dBm")
        print(f"SNR: {lora.get_snr()} dB")

    lora.close()
```

#### 주요 기능
- **송신 (send)**: 문자열/바이너리 데이터 전송
- **수신 (receive)**: 타임아웃 기반 데이터 수신
- **주파수 설정**: 868MHz, 915MHz 등 설정 가능
- **SF/BW 설정**: Spreading Factor, Bandwidth 조절
- **RSSI/SNR**: 신호 품질 모니터링

---

### 4.2 SSD1306 OLED 디스플레이

#### 기능 설명
- 128x64 픽셀 OLED 디스플레이
- 텍스트, 그래픽, 이미지 표시
- I2C 인터페이스 (주소: 0x3C)

#### Python 코드 예제

```python
#!/usr/bin/env python3
"""
UTTEC RPi Shield - SSD1306 OLED Display Module
128x64 OLED Display Driver
"""

import smbus2
import time
from PIL import Image, ImageDraw, ImageFont

class SSD1306:
    """SSD1306 OLED 디스플레이 클래스"""

    # 디스플레이 크기
    WIDTH = 128
    HEIGHT = 64

    # I2C 주소
    I2C_ADDRESS = 0x3C

    # 명령어 정의
    CMD_DISPLAY_OFF = 0xAE
    CMD_DISPLAY_ON = 0xAF
    CMD_SET_CONTRAST = 0x81
    CMD_NORMAL_DISPLAY = 0xA6
    CMD_INVERT_DISPLAY = 0xA7
    CMD_SET_MUX_RATIO = 0xA8
    CMD_SET_DISPLAY_OFFSET = 0xD3
    CMD_SET_START_LINE = 0x40
    CMD_SET_SEGMENT_REMAP = 0xA1
    CMD_SET_COM_SCAN_DEC = 0xC8
    CMD_SET_COM_PINS = 0xDA
    CMD_SET_CLOCK_DIV = 0xD5
    CMD_SET_PRECHARGE = 0xD9
    CMD_SET_VCOM_DETECT = 0xDB
    CMD_CHARGE_PUMP = 0x8D
    CMD_MEMORY_MODE = 0x20
    CMD_COLUMN_ADDR = 0x21
    CMD_PAGE_ADDR = 0x22

    def __init__(self, i2c_bus=1, address=0x3C):
        """
        SSD1306 OLED 초기화

        Args:
            i2c_bus: I2C 버스 번호 (기본값: 1)
            address: I2C 주소 (기본값: 0x3C)
        """
        self.bus = smbus2.SMBus(i2c_bus)
        self.address = address
        self.buffer = [0] * (self.WIDTH * self.HEIGHT // 8)

        # 디스플레이 초기화
        self._init_display()

    def _write_command(self, cmd):
        """명령어 전송"""
        self.bus.write_byte_data(self.address, 0x00, cmd)

    def _write_data(self, data):
        """데이터 전송"""
        # 32바이트씩 나눠서 전송
        for i in range(0, len(data), 32):
            chunk = data[i:i+32]
            self.bus.write_i2c_block_data(self.address, 0x40, chunk)

    def _init_display(self):
        """디스플레이 초기화 시퀀스"""
        init_sequence = [
            self.CMD_DISPLAY_OFF,
            self.CMD_SET_CLOCK_DIV, 0x80,
            self.CMD_SET_MUX_RATIO, 0x3F,
            self.CMD_SET_DISPLAY_OFFSET, 0x00,
            self.CMD_SET_START_LINE,
            self.CMD_CHARGE_PUMP, 0x14,
            self.CMD_MEMORY_MODE, 0x00,
            self.CMD_SET_SEGMENT_REMAP,
            self.CMD_SET_COM_SCAN_DEC,
            self.CMD_SET_COM_PINS, 0x12,
            self.CMD_SET_CONTRAST, 0xCF,
            self.CMD_SET_PRECHARGE, 0xF1,
            self.CMD_SET_VCOM_DETECT, 0x40,
            self.CMD_NORMAL_DISPLAY,
            self.CMD_DISPLAY_ON
        ]

        for cmd in init_sequence:
            self._write_command(cmd)

    def clear(self):
        """화면 지우기"""
        self.buffer = [0] * (self.WIDTH * self.HEIGHT // 8)
        self.display()

    def fill(self, color=1):
        """화면 채우기"""
        self.buffer = [0xFF if color else 0x00] * (self.WIDTH * self.HEIGHT // 8)

    def pixel(self, x, y, color=1):
        """
        픽셀 그리기

        Args:
            x: X 좌표 (0-127)
            y: Y 좌표 (0-63)
            color: 1=켜기, 0=끄기
        """
        if 0 <= x < self.WIDTH and 0 <= y < self.HEIGHT:
            index = x + (y // 8) * self.WIDTH
            if color:
                self.buffer[index] |= (1 << (y % 8))
            else:
                self.buffer[index] &= ~(1 << (y % 8))

    def line(self, x0, y0, x1, y1, color=1):
        """
        직선 그리기 (Bresenham 알고리즘)

        Args:
            x0, y0: 시작점 좌표
            x1, y1: 끝점 좌표
            color: 1=켜기, 0=끄기
        """
        dx = abs(x1 - x0)
        dy = abs(y1 - y0)
        sx = 1 if x0 < x1 else -1
        sy = 1 if y0 < y1 else -1
        err = dx - dy

        while True:
            self.pixel(x0, y0, color)
            if x0 == x1 and y0 == y1:
                break
            e2 = 2 * err
            if e2 > -dy:
                err -= dy
                x0 += sx
            if e2 < dx:
                err += dx
                y0 += sy

    def rect(self, x, y, w, h, color=1, fill=False):
        """
        사각형 그리기

        Args:
            x, y: 좌상단 좌표
            w, h: 너비, 높이
            color: 1=켜기, 0=끄기
            fill: True=채우기, False=테두리만
        """
        if fill:
            for i in range(x, x + w):
                for j in range(y, y + h):
                    self.pixel(i, j, color)
        else:
            self.line(x, y, x + w - 1, y, color)
            self.line(x, y + h - 1, x + w - 1, y + h - 1, color)
            self.line(x, y, x, y + h - 1, color)
            self.line(x + w - 1, y, x + w - 1, y + h - 1, color)

    def circle(self, cx, cy, r, color=1, fill=False):
        """
        원 그리기 (Midpoint 알고리즘)

        Args:
            cx, cy: 중심 좌표
            r: 반지름
            color: 1=켜기, 0=끄기
            fill: True=채우기, False=테두리만
        """
        x = r
        y = 0
        err = 0

        while x >= y:
            if fill:
                self.line(cx - x, cy + y, cx + x, cy + y, color)
                self.line(cx - x, cy - y, cx + x, cy - y, color)
                self.line(cx - y, cy + x, cx + y, cy + x, color)
                self.line(cx - y, cy - x, cx + y, cy - x, color)
            else:
                self.pixel(cx + x, cy + y, color)
                self.pixel(cx - x, cy + y, color)
                self.pixel(cx + x, cy - y, color)
                self.pixel(cx - x, cy - y, color)
                self.pixel(cx + y, cy + x, color)
                self.pixel(cx - y, cy + x, color)
                self.pixel(cx + y, cy - x, color)
                self.pixel(cx - y, cy - x, color)

            y += 1
            err += 1 + 2 * y
            if 2 * (err - x) + 1 > 0:
                x -= 1
                err += 1 - 2 * x

    def text(self, string, x, y, size=1):
        """
        텍스트 표시 (PIL 사용)

        Args:
            string: 표시할 문자열
            x, y: 시작 좌표
            size: 폰트 크기 (기본값: 1)
        """
        # PIL 이미지 생성
        image = Image.new('1', (self.WIDTH, self.HEIGHT), 0)
        draw = ImageDraw.Draw(image)

        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
                                      10 * size)
        except:
            font = ImageFont.load_default()

        draw.text((x, y), string, font=font, fill=1)

        # 이미지를 버퍼에 복사
        pixels = list(image.getdata())
        for i, pixel in enumerate(pixels):
            px = i % self.WIDTH
            py = i // self.WIDTH
            if pixel:
                self.pixel(px, py, 1)

    def image(self, img):
        """
        PIL 이미지 표시

        Args:
            img: PIL Image 객체 (128x64, mode='1')
        """
        if img.size != (self.WIDTH, self.HEIGHT):
            img = img.resize((self.WIDTH, self.HEIGHT))
        if img.mode != '1':
            img = img.convert('1')

        pixels = list(img.getdata())
        self.buffer = [0] * (self.WIDTH * self.HEIGHT // 8)

        for i, pixel in enumerate(pixels):
            if pixel:
                x = i % self.WIDTH
                y = i // self.WIDTH
                self.pixel(x, y, 1)

    def display(self):
        """버퍼 내용을 디스플레이에 전송"""
        self._write_command(self.CMD_COLUMN_ADDR)
        self._write_command(0)
        self._write_command(self.WIDTH - 1)

        self._write_command(self.CMD_PAGE_ADDR)
        self._write_command(0)
        self._write_command(self.HEIGHT // 8 - 1)

        self._write_data(self.buffer)

    def set_contrast(self, value):
        """
        밝기(대비) 설정

        Args:
            value: 밝기 값 (0-255)
        """
        self._write_command(self.CMD_SET_CONTRAST)
        self._write_command(value)

    def invert(self, invert=True):
        """
        화면 반전

        Args:
            invert: True=반전, False=정상
        """
        self._write_command(self.CMD_INVERT_DISPLAY if invert
                           else self.CMD_NORMAL_DISPLAY)

    def scroll_h(self, direction='left', start_page=0, end_page=7):
        """
        수평 스크롤

        Args:
            direction: 'left' 또는 'right'
            start_page: 시작 페이지 (0-7)
            end_page: 끝 페이지 (0-7)
        """
        cmd = 0x27 if direction == 'left' else 0x26
        self._write_command(cmd)
        self._write_command(0x00)
        self._write_command(start_page)
        self._write_command(0x00)
        self._write_command(end_page)
        self._write_command(0x00)
        self._write_command(0xFF)
        self._write_command(0x2F)  # 스크롤 시작

    def stop_scroll(self):
        """스크롤 중지"""
        self._write_command(0x2E)

    def close(self):
        """리소스 정리"""
        self.bus.close()


# 사용 예제
if __name__ == "__main__":
    # OLED 초기화
    oled = SSD1306()

    # 화면 지우기
    oled.clear()

    # 텍스트 표시
    oled.text("UTTEC Shield", 10, 0, size=1)
    oled.text("Raspberry Pi", 15, 20, size=1)

    # 도형 그리기
    oled.rect(0, 0, 128, 64, color=1)  # 테두리
    oled.line(0, 40, 127, 40, color=1)  # 수평선
    oled.circle(100, 50, 10, color=1)  # 원

    # 화면 업데이트
    oled.display()

    print("OLED Display Test Complete")

    # 5초 후 스크롤 테스트
    time.sleep(5)
    oled.scroll_h('left')
    time.sleep(5)
    oled.stop_scroll()

    oled.close()
```

#### 주요 기능
- **텍스트 표시**: 다양한 크기의 문자열 출력
- **도형 그리기**: 점, 선, 사각형, 원
- **이미지 표시**: PIL 이미지 출력
- **화면 효과**: 반전, 스크롤, 밝기 조절

---

### 4.3 LED 제어

#### 기능 설명
- 상태 표시용 LED 제어
- PWM을 이용한 밝기 조절
- 다양한 점멸 패턴

#### Python 코드 예제

```python
#!/usr/bin/env python3
"""
UTTEC RPi Shield - LED Control Module
Status LED Driver with PWM Support
"""

import RPi.GPIO as GPIO
import time
import threading

class LEDController:
    """LED 제어 클래스"""

    def __init__(self, pin=17, pwm_freq=1000):
        """
        LED 컨트롤러 초기화

        Args:
            pin: LED 연결 GPIO 핀 (기본값: 17)
            pwm_freq: PWM 주파수 Hz (기본값: 1000)
        """
        self.pin = pin
        self.pwm_freq = pwm_freq
        self._blink_thread = None
        self._blink_stop = threading.Event()

        # GPIO 설정
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(self.pin, GPIO.OUT)

        # PWM 설정
        self.pwm = GPIO.PWM(self.pin, pwm_freq)
        self.pwm.start(0)

        self._brightness = 0
        self._is_on = False

    @property
    def is_on(self):
        """LED 상태 반환"""
        return self._is_on

    @property
    def brightness(self):
        """현재 밝기 반환"""
        return self._brightness

    def on(self):
        """LED 켜기"""
        self.stop_blink()
        GPIO.output(self.pin, GPIO.HIGH)
        self._is_on = True
        self._brightness = 100

    def off(self):
        """LED 끄기"""
        self.stop_blink()
        GPIO.output(self.pin, GPIO.LOW)
        self._is_on = False
        self._brightness = 0

    def toggle(self):
        """LED 토글"""
        if self._is_on:
            self.off()
        else:
            self.on()

    def set_brightness(self, percent):
        """
        밝기 설정 (PWM)

        Args:
            percent: 밝기 퍼센트 (0-100)
        """
        self.stop_blink()
        percent = max(0, min(100, percent))
        self.pwm.ChangeDutyCycle(percent)
        self._brightness = percent
        self._is_on = percent > 0

    def fade_in(self, duration=1.0, steps=50):
        """
        페이드 인 효과

        Args:
            duration: 총 소요 시간 (초)
            steps: 단계 수
        """
        self.stop_blink()
        step_time = duration / steps
        for i in range(steps + 1):
            brightness = (i / steps) * 100
            self.pwm.ChangeDutyCycle(brightness)
            time.sleep(step_time)
        self._brightness = 100
        self._is_on = True

    def fade_out(self, duration=1.0, steps=50):
        """
        페이드 아웃 효과

        Args:
            duration: 총 소요 시간 (초)
            steps: 단계 수
        """
        self.stop_blink()
        step_time = duration / steps
        for i in range(steps, -1, -1):
            brightness = (i / steps) * 100
            self.pwm.ChangeDutyCycle(brightness)
            time.sleep(step_time)
        self._brightness = 0
        self._is_on = False

    def blink(self, on_time=0.5, off_time=0.5, count=None):
        """
        LED 점멸

        Args:
            on_time: 켜짐 시간 (초)
            off_time: 꺼짐 시간 (초)
            count: 점멸 횟수 (None=무한)
        """
        self.stop_blink()
        self._blink_stop.clear()

        def blink_thread():
            iterations = 0
            while not self._blink_stop.is_set():
                if count is not None and iterations >= count:
                    break
                GPIO.output(self.pin, GPIO.HIGH)
                self._blink_stop.wait(on_time)
                if self._blink_stop.is_set():
                    break
                GPIO.output(self.pin, GPIO.LOW)
                self._blink_stop.wait(off_time)
                iterations += 1
            GPIO.output(self.pin, GPIO.LOW)

        self._blink_thread = threading.Thread(target=blink_thread)
        self._blink_thread.start()

    def blink_pattern(self, pattern, repeat=1):
        """
        패턴 점멸

        Args:
            pattern: (on_time, off_time) 튜플의 리스트
            repeat: 반복 횟수

        Example:
            # SOS 패턴
            led.blink_pattern([
                (0.2, 0.2), (0.2, 0.2), (0.2, 0.5),  # S: ...
                (0.5, 0.2), (0.5, 0.2), (0.5, 0.5),  # O: ---
                (0.2, 0.2), (0.2, 0.2), (0.2, 1.0)   # S: ...
            ])
        """
        self.stop_blink()

        for _ in range(repeat):
            for on_time, off_time in pattern:
                GPIO.output(self.pin, GPIO.HIGH)
                time.sleep(on_time)
                GPIO.output(self.pin, GPIO.LOW)
                time.sleep(off_time)

    def heartbeat(self):
        """심장박동 효과 (비동기)"""
        self.stop_blink()
        self._blink_stop.clear()

        def heartbeat_thread():
            while not self._blink_stop.is_set():
                # 첫 번째 박동
                for i in range(0, 100, 10):
                    if self._blink_stop.is_set():
                        return
                    self.pwm.ChangeDutyCycle(i)
                    time.sleep(0.02)
                for i in range(100, 0, -10):
                    if self._blink_stop.is_set():
                        return
                    self.pwm.ChangeDutyCycle(i)
                    time.sleep(0.02)
                time.sleep(0.1)

                # 두 번째 박동
                for i in range(0, 70, 10):
                    if self._blink_stop.is_set():
                        return
                    self.pwm.ChangeDutyCycle(i)
                    time.sleep(0.02)
                for i in range(70, 0, -10):
                    if self._blink_stop.is_set():
                        return
                    self.pwm.ChangeDutyCycle(i)
                    time.sleep(0.02)
                time.sleep(0.5)

            self.pwm.ChangeDutyCycle(0)

        self._blink_thread = threading.Thread(target=heartbeat_thread)
        self._blink_thread.start()

    def breathe(self, period=2.0):
        """
        숨쉬기 효과 (비동기)

        Args:
            period: 한 주기 시간 (초)
        """
        self.stop_blink()
        self._blink_stop.clear()

        def breathe_thread():
            import math
            step = 0
            while not self._blink_stop.is_set():
                # 사인파 이용 부드러운 밝기 변화
                brightness = (math.sin(step) + 1) / 2 * 100
                self.pwm.ChangeDutyCycle(brightness)
                step += 0.1
                time.sleep(period / 63)
            self.pwm.ChangeDutyCycle(0)

        self._blink_thread = threading.Thread(target=breathe_thread)
        self._blink_thread.start()

    def stop_blink(self):
        """점멸 중지"""
        if self._blink_thread and self._blink_thread.is_alive():
            self._blink_stop.set()
            self._blink_thread.join(timeout=2)

    def close(self):
        """리소스 정리"""
        self.stop_blink()
        self.pwm.stop()
        GPIO.cleanup(self.pin)


# 사용 예제
if __name__ == "__main__":
    # LED 초기화
    led = LEDController(pin=17)

    print("LED Control Test")

    # 기본 ON/OFF
    print("1. Basic ON/OFF")
    led.on()
    time.sleep(1)
    led.off()
    time.sleep(1)

    # 밝기 조절
    print("2. Brightness Control")
    for b in [25, 50, 75, 100]:
        led.set_brightness(b)
        print(f"   Brightness: {b}%")
        time.sleep(0.5)

    # 페이드 효과
    print("3. Fade Effect")
    led.fade_out(duration=1)
    led.fade_in(duration=1)

    # 점멸
    print("4. Blink")
    led.blink(on_time=0.2, off_time=0.2, count=5)
    time.sleep(2.5)

    # SOS 패턴
    print("5. SOS Pattern")
    sos_pattern = [
        (0.2, 0.2), (0.2, 0.2), (0.2, 0.5),
        (0.5, 0.2), (0.5, 0.2), (0.5, 0.5),
        (0.2, 0.2), (0.2, 0.2), (0.2, 1.0)
    ]
    led.blink_pattern(sos_pattern)

    # 심장박동
    print("6. Heartbeat Effect")
    led.heartbeat()
    time.sleep(5)

    # 숨쉬기 효과
    print("7. Breathing Effect")
    led.breathe()
    time.sleep(5)

    led.off()
    led.close()
    print("Test Complete")
```

#### 주요 기능
- **ON/OFF 제어**: 기본 켜기/끄기
- **밝기 조절**: PWM 기반 0-100% 밝기
- **페이드 효과**: 부드러운 켜짐/꺼짐
- **점멸 패턴**: 사용자 정의 점멸 패턴
- **특수 효과**: 심장박동, 숨쉬기 효과

---

### 4.4 RS485 통신

#### 기능 설명
- 산업용 반이중 직렬 통신
- 최대 1200m 통신 거리
- Modbus RTU 프로토콜 지원

#### Python 코드 예제

```python
#!/usr/bin/env python3
"""
UTTEC RPi Shield - RS485 Communication Module
Half-duplex RS485 Driver with Modbus RTU Support
"""

import serial
import RPi.GPIO as GPIO
import time
import struct

class RS485:
    """RS485 통신 클래스"""

    def __init__(self, port='/dev/ttyAMA0', baudrate=9600,
                 de_pin=4, timeout=1):
        """
        RS485 초기화

        Args:
            port: 시리얼 포트 (기본값: /dev/ttyAMA0)
            baudrate: 통신 속도 (기본값: 9600)
            de_pin: DE/RE 제어 핀 GPIO 번호 (기본값: 4)
            timeout: 수신 타임아웃 (초)
        """
        self.de_pin = de_pin

        # GPIO 설정 (DE/RE 핀)
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(self.de_pin, GPIO.OUT)
        GPIO.output(self.de_pin, GPIO.LOW)  # 수신 모드

        # 시리얼 포트 설정
        self.serial = serial.Serial(
            port=port,
            baudrate=baudrate,
            bytesize=serial.EIGHTBITS,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            timeout=timeout
        )

    def _set_tx_mode(self):
        """송신 모드로 전환"""
        GPIO.output(self.de_pin, GPIO.HIGH)
        time.sleep(0.001)  # 안정화 시간

    def _set_rx_mode(self):
        """수신 모드로 전환"""
        time.sleep(0.001)  # 송신 완료 대기
        GPIO.output(self.de_pin, GPIO.LOW)

    def send(self, data):
        """
        데이터 전송

        Args:
            data: 전송할 데이터 (bytes 또는 string)
        """
        if isinstance(data, str):
            data = data.encode('utf-8')

        self._set_tx_mode()
        self.serial.write(data)
        self.serial.flush()
        self._set_rx_mode()

    def receive(self, size=None):
        """
        데이터 수신

        Args:
            size: 수신할 바이트 수 (None=available)

        Returns:
            bytes: 수신된 데이터
        """
        if size:
            return self.serial.read(size)
        else:
            return self.serial.read(self.serial.in_waiting or 1)

    def receive_until(self, terminator=b'\n'):
        """
        종료 문자까지 수신

        Args:
            terminator: 종료 문자

        Returns:
            bytes: 수신된 데이터
        """
        return self.serial.read_until(terminator)

    def send_receive(self, data, response_size=None, delay=0.1):
        """
        전송 후 응답 수신

        Args:
            data: 전송할 데이터
            response_size: 예상 응답 크기
            delay: 응답 대기 시간

        Returns:
            bytes: 응답 데이터
        """
        self.send(data)
        time.sleep(delay)
        return self.receive(response_size)

    def set_baudrate(self, baudrate):
        """통신 속도 변경"""
        self.serial.baudrate = baudrate

    def flush(self):
        """버퍼 비우기"""
        self.serial.reset_input_buffer()
        self.serial.reset_output_buffer()

    def close(self):
        """리소스 정리"""
        self.serial.close()
        GPIO.cleanup(self.de_pin)


class ModbusRTU(RS485):
    """Modbus RTU 프로토콜 클래스"""

    # 기능 코드
    READ_COILS = 0x01
    READ_DISCRETE_INPUTS = 0x02
    READ_HOLDING_REGISTERS = 0x03
    READ_INPUT_REGISTERS = 0x04
    WRITE_SINGLE_COIL = 0x05
    WRITE_SINGLE_REGISTER = 0x06
    WRITE_MULTIPLE_COILS = 0x0F
    WRITE_MULTIPLE_REGISTERS = 0x10

    def __init__(self, port='/dev/ttyAMA0', baudrate=9600, de_pin=4):
        """Modbus RTU 초기화"""
        super().__init__(port, baudrate, de_pin)

    @staticmethod
    def _crc16(data):
        """CRC16 계산 (Modbus)"""
        crc = 0xFFFF
        for byte in data:
            crc ^= byte
            for _ in range(8):
                if crc & 0x0001:
                    crc = (crc >> 1) ^ 0xA001
                else:
                    crc >>= 1
        return crc

    def _build_request(self, slave_id, function_code, *args):
        """요청 프레임 생성"""
        data = bytes([slave_id, function_code]) + b''.join(args)
        crc = self._crc16(data)
        return data + struct.pack('<H', crc)

    def _parse_response(self, response, expected_fc):
        """응답 프레임 파싱"""
        if len(response) < 5:
            raise Exception("Response too short")

        # CRC 검증
        received_crc = struct.unpack('<H', response[-2:])[0]
        calculated_crc = self._crc16(response[:-2])
        if received_crc != calculated_crc:
            raise Exception("CRC mismatch")

        slave_id = response[0]
        function_code = response[1]

        # 예외 응답 체크
        if function_code & 0x80:
            error_code = response[2]
            errors = {
                1: "Illegal Function",
                2: "Illegal Data Address",
                3: "Illegal Data Value",
                4: "Slave Device Failure"
            }
            raise Exception(f"Modbus Error: {errors.get(error_code, 'Unknown')}")

        return response[2:-2]

    def read_holding_registers(self, slave_id, start_addr, count):
        """
        Holding Register 읽기 (Function Code 0x03)

        Args:
            slave_id: 슬레이브 ID (1-247)
            start_addr: 시작 주소
            count: 읽을 레지스터 수

        Returns:
            list: 레지스터 값 리스트
        """
        request = self._build_request(
            slave_id,
            self.READ_HOLDING_REGISTERS,
            struct.pack('>H', start_addr),
            struct.pack('>H', count)
        )

        self.send(request)
        time.sleep(0.1)

        # 응답 수신 (헤더 + 바이트수 + 데이터 + CRC)
        expected_len = 3 + count * 2 + 2
        response = self.receive(expected_len)

        data = self._parse_response(response, self.READ_HOLDING_REGISTERS)
        byte_count = data[0]

        # 레지스터 값 파싱
        registers = []
        for i in range(1, byte_count, 2):
            value = struct.unpack('>H', data[i:i+2])[0]
            registers.append(value)

        return registers

    def read_input_registers(self, slave_id, start_addr, count):
        """
        Input Register 읽기 (Function Code 0x04)

        Args:
            slave_id: 슬레이브 ID
            start_addr: 시작 주소
            count: 읽을 레지스터 수

        Returns:
            list: 레지스터 값 리스트
        """
        request = self._build_request(
            slave_id,
            self.READ_INPUT_REGISTERS,
            struct.pack('>H', start_addr),
            struct.pack('>H', count)
        )

        self.send(request)
        time.sleep(0.1)

        expected_len = 3 + count * 2 + 2
        response = self.receive(expected_len)

        data = self._parse_response(response, self.READ_INPUT_REGISTERS)
        byte_count = data[0]

        registers = []
        for i in range(1, byte_count, 2):
            value = struct.unpack('>H', data[i:i+2])[0]
            registers.append(value)

        return registers

    def write_single_register(self, slave_id, address, value):
        """
        단일 Register 쓰기 (Function Code 0x06)

        Args:
            slave_id: 슬레이브 ID
            address: 레지스터 주소
            value: 쓸 값 (0-65535)

        Returns:
            bool: 성공 여부
        """
        request = self._build_request(
            slave_id,
            self.WRITE_SINGLE_REGISTER,
            struct.pack('>H', address),
            struct.pack('>H', value)
        )

        self.send(request)
        time.sleep(0.1)

        response = self.receive(8)
        self._parse_response(response, self.WRITE_SINGLE_REGISTER)

        return True

    def write_multiple_registers(self, slave_id, start_addr, values):
        """
        다중 Register 쓰기 (Function Code 0x10)

        Args:
            slave_id: 슬레이브 ID
            start_addr: 시작 주소
            values: 값 리스트

        Returns:
            bool: 성공 여부
        """
        count = len(values)
        byte_count = count * 2

        data = struct.pack('>H', start_addr)
        data += struct.pack('>H', count)
        data += bytes([byte_count])

        for value in values:
            data += struct.pack('>H', value)

        request = self._build_request(slave_id, self.WRITE_MULTIPLE_REGISTERS, data)

        self.send(request)
        time.sleep(0.1)

        response = self.receive(8)
        self._parse_response(response, self.WRITE_MULTIPLE_REGISTERS)

        return True

    def read_coils(self, slave_id, start_addr, count):
        """
        Coil 읽기 (Function Code 0x01)

        Args:
            slave_id: 슬레이브 ID
            start_addr: 시작 주소
            count: 읽을 코일 수

        Returns:
            list: 코일 상태 리스트 (True/False)
        """
        request = self._build_request(
            slave_id,
            self.READ_COILS,
            struct.pack('>H', start_addr),
            struct.pack('>H', count)
        )

        self.send(request)
        time.sleep(0.1)

        byte_count = (count + 7) // 8
        expected_len = 3 + byte_count + 2
        response = self.receive(expected_len)

        data = self._parse_response(response, self.READ_COILS)

        coils = []
        for i, byte in enumerate(data[1:]):
            for bit in range(8):
                if len(coils) < count:
                    coils.append(bool(byte & (1 << bit)))

        return coils

    def write_single_coil(self, slave_id, address, value):
        """
        단일 Coil 쓰기 (Function Code 0x05)

        Args:
            slave_id: 슬레이브 ID
            address: 코일 주소
            value: True/False

        Returns:
            bool: 성공 여부
        """
        coil_value = 0xFF00 if value else 0x0000

        request = self._build_request(
            slave_id,
            self.WRITE_SINGLE_COIL,
            struct.pack('>H', address),
            struct.pack('>H', coil_value)
        )

        self.send(request)
        time.sleep(0.1)

        response = self.receive(8)
        self._parse_response(response, self.WRITE_SINGLE_COIL)

        return True


# 사용 예제
if __name__ == "__main__":
    # 기본 RS485 통신
    print("=== RS485 Basic Test ===")
    rs485 = RS485(port='/dev/ttyAMA0', baudrate=9600, de_pin=4)

    # 데이터 전송
    rs485.send("Hello RS485!")
    print("Sent: Hello RS485!")

    # 데이터 수신 대기
    time.sleep(0.5)
    response = rs485.receive()
    if response:
        print(f"Received: {response}")

    rs485.close()

    # Modbus RTU 통신
    print("\n=== Modbus RTU Test ===")
    modbus = ModbusRTU(port='/dev/ttyAMA0', baudrate=9600, de_pin=4)

    try:
        # Holding Register 읽기 (슬레이브 ID: 1, 주소: 0, 개수: 10)
        registers = modbus.read_holding_registers(1, 0, 10)
        print(f"Holding Registers: {registers}")

        # 단일 레지스터 쓰기
        modbus.write_single_register(1, 0, 1234)
        print("Written value 1234 to register 0")

        # Coil 읽기
        coils = modbus.read_coils(1, 0, 8)
        print(f"Coils: {coils}")

    except Exception as e:
        print(f"Modbus Error: {e}")

    modbus.close()
    print("\nTest Complete")
```

#### 주요 기능
- **기본 RS485 통신**: 송수신, 버퍼 관리
- **방향 제어**: DE/RE 핀 자동 제어
- **Modbus RTU**: 표준 프로토콜 지원
  - Register 읽기/쓰기
  - Coil 읽기/쓰기
  - CRC 검증

---

### 4.5 RS422 통신

#### 기능 설명
- 산업용 전이중 직렬 통신
- 동시 송수신 가능
- 최대 1200m 통신 거리

#### Python 코드 예제

```python
#!/usr/bin/env python3
"""
UTTEC RPi Shield - RS422 Communication Module
Full-duplex RS422 Driver
"""

import serial
import threading
import queue
import time

class RS422:
    """RS422 통신 클래스 (Full-duplex)"""

    def __init__(self, port='/dev/ttyAMA0', baudrate=9600, timeout=1):
        """
        RS422 초기화

        Args:
            port: 시리얼 포트
            baudrate: 통신 속도
            timeout: 수신 타임아웃
        """
        self.serial = serial.Serial(
            port=port,
            baudrate=baudrate,
            bytesize=serial.EIGHTBITS,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            timeout=timeout
        )

        self._rx_queue = queue.Queue()
        self._rx_thread = None
        self._rx_running = False
        self._rx_callback = None

    def send(self, data):
        """
        데이터 전송

        Args:
            data: 전송할 데이터 (bytes 또는 string)
        """
        if isinstance(data, str):
            data = data.encode('utf-8')
        self.serial.write(data)
        self.serial.flush()

    def receive(self, size=None, timeout=None):
        """
        데이터 수신

        Args:
            size: 수신할 바이트 수
            timeout: 타임아웃 (초)

        Returns:
            bytes: 수신된 데이터
        """
        if timeout:
            old_timeout = self.serial.timeout
            self.serial.timeout = timeout

        if size:
            data = self.serial.read(size)
        else:
            data = self.serial.read(self.serial.in_waiting or 1)

        if timeout:
            self.serial.timeout = old_timeout

        return data

    def receive_line(self):
        """
        한 줄 수신 (개행 문자까지)

        Returns:
            str: 수신된 문자열
        """
        return self.serial.readline().decode('utf-8').strip()

    def start_async_receive(self, callback=None):
        """
        비동기 수신 시작

        Args:
            callback: 데이터 수신 시 호출할 콜백 함수
        """
        self._rx_callback = callback
        self._rx_running = True

        def rx_thread():
            while self._rx_running:
                if self.serial.in_waiting:
                    data = self.serial.read(self.serial.in_waiting)
                    self._rx_queue.put(data)
                    if self._rx_callback:
                        self._rx_callback(data)
                time.sleep(0.01)

        self._rx_thread = threading.Thread(target=rx_thread, daemon=True)
        self._rx_thread.start()

    def stop_async_receive(self):
        """비동기 수신 중지"""
        self._rx_running = False
        if self._rx_thread:
            self._rx_thread.join(timeout=1)

    def get_received_data(self, block=False, timeout=None):
        """
        수신 큐에서 데이터 가져오기

        Args:
            block: 데이터가 있을 때까지 대기
            timeout: 대기 타임아웃

        Returns:
            bytes: 수신된 데이터 또는 None
        """
        try:
            return self._rx_queue.get(block=block, timeout=timeout)
        except queue.Empty:
            return None

    def set_baudrate(self, baudrate):
        """통신 속도 변경"""
        self.serial.baudrate = baudrate

    def flush(self):
        """버퍼 비우기"""
        self.serial.reset_input_buffer()
        self.serial.reset_output_buffer()
        while not self._rx_queue.empty():
            self._rx_queue.get_nowait()

    def available(self):
        """수신 대기 바이트 수"""
        return self.serial.in_waiting

    def close(self):
        """리소스 정리"""
        self.stop_async_receive()
        self.serial.close()


class RS422Protocol:
    """RS422 프로토콜 래퍼 클래스"""

    STX = 0x02  # Start of Text
    ETX = 0x03  # End of Text

    def __init__(self, rs422):
        """
        프로토콜 초기화

        Args:
            rs422: RS422 인스턴스
        """
        self.rs422 = rs422

    @staticmethod
    def _calculate_checksum(data):
        """체크섬 계산 (XOR)"""
        checksum = 0
        for byte in data:
            checksum ^= byte
        return checksum

    def send_packet(self, data):
        """
        패킷 전송 (STX + DATA + CHECKSUM + ETX)

        Args:
            data: 전송할 데이터
        """
        if isinstance(data, str):
            data = data.encode('utf-8')

        checksum = self._calculate_checksum(data)
        packet = bytes([self.STX]) + data + bytes([checksum, self.ETX])
        self.rs422.send(packet)

    def receive_packet(self, timeout=5):
        """
        패킷 수신

        Args:
            timeout: 수신 타임아웃

        Returns:
            bytes: 수신된 데이터 또는 None
        """
        buffer = b''
        start_time = time.time()
        in_packet = False

        while (time.time() - start_time) < timeout:
            byte = self.rs422.receive(1)
            if not byte:
                continue

            if byte[0] == self.STX:
                in_packet = True
                buffer = b''
            elif byte[0] == self.ETX and in_packet:
                if len(buffer) >= 1:
                    data = buffer[:-1]
                    received_checksum = buffer[-1]
                    calculated_checksum = self._calculate_checksum(data)

                    if received_checksum == calculated_checksum:
                        return data
                    else:
                        print("Checksum error")
                in_packet = False
                buffer = b''
            elif in_packet:
                buffer += byte

        return None


# 사용 예제
if __name__ == "__main__":
    # 기본 RS422 통신
    print("=== RS422 Basic Test ===")
    rs422 = RS422(port='/dev/ttyAMA0', baudrate=115200)

    # 데이터 전송
    rs422.send("Hello RS422 Full-Duplex!\n")
    print("Sent: Hello RS422 Full-Duplex!")

    # 비동기 수신 시작
    def on_receive(data):
        print(f"Async Received: {data}")

    rs422.start_async_receive(callback=on_receive)

    # 5초간 송수신 테스트
    for i in range(5):
        rs422.send(f"Message {i}\n")
        time.sleep(1)

    rs422.stop_async_receive()
    rs422.close()

    # 프로토콜 사용
    print("\n=== RS422 Protocol Test ===")
    rs422 = RS422(port='/dev/ttyAMA0', baudrate=115200)
    protocol = RS422Protocol(rs422)

    # 패킷 전송
    protocol.send_packet("SENSOR_DATA:25.5,60.2")
    print("Sent packet: SENSOR_DATA:25.5,60.2")

    # 패킷 수신
    received = protocol.receive_packet(timeout=5)
    if received:
        print(f"Received packet: {received.decode('utf-8')}")

    rs422.close()
    print("\nTest Complete")
```

#### 주요 기능
- **전이중 통신**: 동시 송수신
- **비동기 수신**: 콜백 기반 데이터 수신
- **프로토콜 래퍼**: STX/ETX 프레이밍, 체크섬

---

### 4.6 4자리 7세그먼트 디스플레이 (TM1637)

#### 기능 설명
- 4자리 숫자/문자 표시
- 밝기 조절 가능
- 콜론(:) 표시 지원

#### Python 코드 예제

```python
#!/usr/bin/env python3
"""
UTTEC RPi Shield - 4-Digit 7-Segment Display Module
TM1637 LED Driver
"""

import RPi.GPIO as GPIO
import time

class TM1637:
    """TM1637 4자리 7세그먼트 디스플레이 클래스"""

    # 세그먼트 인코딩 (0-9, A-F, 특수문자)
    DIGITS = {
        '0': 0x3F, '1': 0x06, '2': 0x5B, '3': 0x4F,
        '4': 0x66, '5': 0x6D, '6': 0x7D, '7': 0x07,
        '8': 0x7F, '9': 0x6F,
        'A': 0x77, 'b': 0x7C, 'C': 0x39, 'd': 0x5E,
        'E': 0x79, 'F': 0x71, 'G': 0x3D, 'H': 0x76,
        'h': 0x74, 'I': 0x06, 'J': 0x1E, 'L': 0x38,
        'n': 0x54, 'O': 0x3F, 'o': 0x5C, 'P': 0x73,
        'r': 0x50, 'S': 0x6D, 't': 0x78, 'U': 0x3E,
        'u': 0x1C, 'Y': 0x6E,
        '-': 0x40, '_': 0x08, ' ': 0x00, '°': 0x63,
    }

    # 명령어
    CMD_DATA = 0x40
    CMD_DISPLAY = 0x80
    CMD_ADDRESS = 0xC0

    def __init__(self, clk_pin=23, dio_pin=24):
        """
        TM1637 초기화

        Args:
            clk_pin: 클럭 핀 GPIO 번호 (기본값: 23)
            dio_pin: 데이터 핀 GPIO 번호 (기본값: 24)
        """
        self.clk_pin = clk_pin
        self.dio_pin = dio_pin
        self._brightness = 7
        self._colon = False

        # GPIO 설정
        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)
        GPIO.setup(self.clk_pin, GPIO.OUT)
        GPIO.setup(self.dio_pin, GPIO.OUT)

        GPIO.output(self.clk_pin, GPIO.HIGH)
        GPIO.output(self.dio_pin, GPIO.HIGH)

    def _start(self):
        """I2C 시작 조건"""
        GPIO.output(self.dio_pin, GPIO.LOW)
        self._delay()

    def _stop(self):
        """I2C 정지 조건"""
        GPIO.output(self.dio_pin, GPIO.LOW)
        self._delay()
        GPIO.output(self.clk_pin, GPIO.HIGH)
        self._delay()
        GPIO.output(self.dio_pin, GPIO.HIGH)
        self._delay()

    def _delay(self):
        """비트 지연"""
        time.sleep(0.00001)

    def _write_byte(self, data):
        """바이트 전송"""
        for _ in range(8):
            GPIO.output(self.clk_pin, GPIO.LOW)
            self._delay()

            if data & 0x01:
                GPIO.output(self.dio_pin, GPIO.HIGH)
            else:
                GPIO.output(self.dio_pin, GPIO.LOW)

            self._delay()
            GPIO.output(self.clk_pin, GPIO.HIGH)
            self._delay()
            data >>= 1

        # ACK
        GPIO.output(self.clk_pin, GPIO.LOW)
        GPIO.output(self.dio_pin, GPIO.HIGH)
        self._delay()
        GPIO.output(self.clk_pin, GPIO.HIGH)
        self._delay()

        GPIO.setup(self.dio_pin, GPIO.IN)
        ack = GPIO.input(self.dio_pin)
        GPIO.setup(self.dio_pin, GPIO.OUT)

        GPIO.output(self.clk_pin, GPIO.LOW)
        self._delay()

        return ack == 0

    def _write_data(self, segments, pos=0):
        """세그먼트 데이터 쓰기"""
        # 자동 주소 증가 모드
        self._start()
        self._write_byte(self.CMD_DATA)
        self._stop()

        # 시작 주소 설정
        self._start()
        self._write_byte(self.CMD_ADDRESS | pos)

        # 세그먼트 데이터 전송
        for seg in segments:
            self._write_byte(seg)

        self._stop()

        # 디스플레이 제어
        self._start()
        self._write_byte(self.CMD_DISPLAY | 0x08 | self._brightness)
        self._stop()

    def set_brightness(self, level):
        """
        밝기 설정

        Args:
            level: 밝기 레벨 (0-7)
        """
        self._brightness = max(0, min(7, level))

    def clear(self):
        """화면 지우기"""
        self._write_data([0, 0, 0, 0])

    def show(self, text, colon=False):
        """
        텍스트 표시

        Args:
            text: 표시할 텍스트 (최대 4자)
            colon: 콜론 표시 여부
        """
        segments = []
        text = str(text).upper()[:4]

        # 오른쪽 정렬을 위한 패딩
        text = text.rjust(4)

        for i, char in enumerate(text):
            seg = self.DIGITS.get(char, 0)

            # 두 번째 자리에 콜론 표시
            if i == 1 and colon:
                seg |= 0x80

            segments.append(seg)

        self._write_data(segments)

    def show_number(self, number, leading_zeros=False, colon=False):
        """
        숫자 표시

        Args:
            number: 표시할 숫자 (-999 ~ 9999)
            leading_zeros: 앞자리 0 표시 여부
            colon: 콜론 표시 여부
        """
        if number < -999 or number > 9999:
            self.show("----")
            return

        negative = number < 0
        number = abs(number)

        if leading_zeros:
            if negative:
                text = f"-{number:03d}"
            else:
                text = f"{number:04d}"
        else:
            if negative:
                text = f"-{number}"
            else:
                text = str(number)

        self.show(text, colon)

    def show_temperature(self, temp, unit='C'):
        """
        온도 표시

        Args:
            temp: 온도 값
            unit: 단위 ('C' 또는 'F')
        """
        temp = int(temp)
        if temp < -9 or temp > 99:
            self.show("----")
            return

        text = f"{temp:2d}°{unit}"
        self.show(text)

    def show_time(self, hours, minutes, colon=True):
        """
        시간 표시 (HH:MM)

        Args:
            hours: 시 (0-23)
            minutes: 분 (0-59)
            colon: 콜론 표시 여부
        """
        text = f"{hours:02d}{minutes:02d}"
        self.show(text, colon)

    def show_clock(self, blink_colon=True):
        """
        현재 시간 표시 (실시간)

        Args:
            blink_colon: 콜론 깜빡임 여부
        """
        import datetime

        now = datetime.datetime.now()
        colon = now.second % 2 == 0 if blink_colon else True
        self.show_time(now.hour, now.minute, colon)

    def scroll_text(self, text, delay=0.3):
        """
        텍스트 스크롤

        Args:
            text: 스크롤할 텍스트
            delay: 스크롤 속도 (초)
        """
        text = "    " + text + "    "
        for i in range(len(text) - 3):
            self.show(text[i:i+4])
            time.sleep(delay)

    def set_segment(self, position, segments):
        """
        개별 세그먼트 직접 제어

        Args:
            position: 위치 (0-3)
            segments: 세그먼트 비트 (0-127)
        """
        if 0 <= position <= 3:
            self._start()
            self._write_byte(self.CMD_DATA | 0x04)  # 고정 주소 모드
            self._stop()

            self._start()
            self._write_byte(self.CMD_ADDRESS | position)
            self._write_byte(segments)
            self._stop()

            self._start()
            self._write_byte(self.CMD_DISPLAY | 0x08 | self._brightness)
            self._stop()

    def test(self):
        """디스플레이 테스트 (모든 세그먼트 점등)"""
        self._write_data([0xFF, 0xFF, 0xFF, 0xFF])

    def close(self):
        """리소스 정리"""
        self.clear()
        GPIO.cleanup([self.clk_pin, self.dio_pin])


# 사용 예제
if __name__ == "__main__":
    # 디스플레이 초기화
    display = TM1637(clk_pin=23, dio_pin=24)

    print("7-Segment Display Test")

    # 밝기 설정
    display.set_brightness(7)

    # 테스트 패턴
    print("1. Test pattern")
    display.test()
    time.sleep(1)

    # 숫자 카운트
    print("2. Number count")
    for i in range(10):
        display.show_number(i)
        time.sleep(0.3)

    # 시간 표시
    print("3. Time display")
    for _ in range(6):
        display.show_clock(blink_colon=True)
        time.sleep(0.5)

    # 온도 표시
    print("4. Temperature display")
    display.show_temperature(25, 'C')
    time.sleep(2)

    # 텍스트 표시
    print("5. Text display")
    display.show("HELLO")
    time.sleep(1)

    # 스크롤
    print("6. Scroll text")
    display.scroll_text("UTTEC SHIELD", delay=0.2)

    # 정리
    display.clear()
    display.close()
    print("Test Complete")
```

#### 주요 기능
- **숫자 표시**: 정수, 소수점
- **텍스트 표시**: 영문, 특수문자
- **시간 표시**: HH:MM 형식, 콜론 깜빡임
- **온도 표시**: 도 기호 포함
- **스크롤**: 긴 텍스트 스크롤 효과

---

### 4.7 I2C 버스 유틸리티

#### 기능 설명
- I2C 디바이스 스캔
- 범용 I2C 읽기/쓰기
- 다중 센서 관리

#### Python 코드 예제

```python
#!/usr/bin/env python3
"""
UTTEC RPi Shield - I2C Bus Utility Module
I2C Scanner and Generic Device Communication
"""

import smbus2
import time

class I2CBus:
    """I2C 버스 유틸리티 클래스"""

    def __init__(self, bus_number=1):
        """
        I2C 버스 초기화

        Args:
            bus_number: I2C 버스 번호 (기본값: 1)
        """
        self.bus = smbus2.SMBus(bus_number)
        self.bus_number = bus_number

    def scan(self):
        """
        I2C 버스 스캔

        Returns:
            list: 발견된 디바이스 주소 리스트
        """
        devices = []
        for address in range(0x03, 0x78):
            try:
                self.bus.read_byte(address)
                devices.append(address)
            except:
                pass
        return devices

    def scan_with_info(self):
        """
        I2C 버스 스캔 (상세 정보 포함)

        Returns:
            dict: {주소: 디바이스 이름} 딕셔너리
        """
        # 알려진 I2C 주소 매핑
        known_devices = {
            0x20: "PCF8574 (I/O Expander)",
            0x27: "PCF8574A (I/O Expander) / LCD",
            0x3C: "SSD1306 (OLED Display)",
            0x3D: "SSD1306 (OLED Display)",
            0x48: "ADS1115 (ADC) / TMP102 (Temp)",
            0x50: "AT24C32 (EEPROM)",
            0x57: "AT24C32 (EEPROM)",
            0x68: "DS3231 (RTC) / MPU6050 (IMU)",
            0x76: "BME280/BMP280 (Env Sensor)",
            0x77: "BME280/BMP280 (Env Sensor)",
        }

        result = {}
        for address in self.scan():
            name = known_devices.get(address, "Unknown Device")
            result[address] = name
        return result

    def read_byte(self, address):
        """
        1바이트 읽기

        Args:
            address: 디바이스 주소

        Returns:
            int: 읽은 바이트 값
        """
        return self.bus.read_byte(address)

    def write_byte(self, address, value):
        """
        1바이트 쓰기

        Args:
            address: 디바이스 주소
            value: 쓸 값
        """
        self.bus.write_byte(address, value)

    def read_byte_data(self, address, register):
        """
        레지스터에서 1바이트 읽기

        Args:
            address: 디바이스 주소
            register: 레지스터 주소

        Returns:
            int: 읽은 바이트 값
        """
        return self.bus.read_byte_data(address, register)

    def write_byte_data(self, address, register, value):
        """
        레지스터에 1바이트 쓰기

        Args:
            address: 디바이스 주소
            register: 레지스터 주소
            value: 쓸 값
        """
        self.bus.write_byte_data(address, register, value)

    def read_word_data(self, address, register):
        """
        레지스터에서 2바이트 읽기 (Little Endian)

        Args:
            address: 디바이스 주소
            register: 레지스터 주소

        Returns:
            int: 읽은 워드 값
        """
        return self.bus.read_word_data(address, register)

    def write_word_data(self, address, register, value):
        """
        레지스터에 2바이트 쓰기 (Little Endian)

        Args:
            address: 디바이스 주소
            register: 레지스터 주소
            value: 쓸 값
        """
        self.bus.write_word_data(address, register, value)

    def read_block_data(self, address, register, length):
        """
        블록 데이터 읽기

        Args:
            address: 디바이스 주소
            register: 시작 레지스터 주소
            length: 읽을 바이트 수

        Returns:
            list: 읽은 바이트 리스트
        """
        return self.bus.read_i2c_block_data(address, register, length)

    def write_block_data(self, address, register, data):
        """
        블록 데이터 쓰기

        Args:
            address: 디바이스 주소
            register: 시작 레지스터 주소
            data: 쓸 데이터 리스트
        """
        self.bus.write_i2c_block_data(address, register, data)

    def is_device_present(self, address):
        """
        디바이스 존재 확인

        Args:
            address: 확인할 주소

        Returns:
            bool: 존재 여부
        """
        try:
            self.bus.read_byte(address)
            return True
        except:
            return False

    def close(self):
        """리소스 정리"""
        self.bus.close()


class I2CDevice:
    """범용 I2C 디바이스 클래스"""

    def __init__(self, bus, address):
        """
        I2C 디바이스 초기화

        Args:
            bus: I2CBus 인스턴스
            address: 디바이스 주소
        """
        self.bus = bus
        self.address = address

        if not bus.is_device_present(address):
            raise Exception(f"Device not found at address 0x{address:02X}")

    def read_register(self, register, length=1):
        """
        레지스터 읽기

        Args:
            register: 레지스터 주소
            length: 읽을 바이트 수

        Returns:
            int 또는 list: 읽은 값
        """
        if length == 1:
            return self.bus.read_byte_data(self.address, register)
        else:
            return self.bus.read_block_data(self.address, register, length)

    def write_register(self, register, value):
        """
        레지스터 쓰기

        Args:
            register: 레지스터 주소
            value: 쓸 값 (int 또는 list)
        """
        if isinstance(value, int):
            self.bus.write_byte_data(self.address, register, value)
        else:
            self.bus.write_block_data(self.address, register, value)

    def set_bits(self, register, mask):
        """
        레지스터 비트 설정

        Args:
            register: 레지스터 주소
            mask: 설정할 비트 마스크
        """
        current = self.read_register(register)
        self.write_register(register, current | mask)

    def clear_bits(self, register, mask):
        """
        레지스터 비트 클리어

        Args:
            register: 레지스터 주소
            mask: 클리어할 비트 마스크
        """
        current = self.read_register(register)
        self.write_register(register, current & ~mask)

    def modify_bits(self, register, mask, value):
        """
        레지스터 비트 수정

        Args:
            register: 레지스터 주소
            mask: 수정할 비트 마스크
            value: 새 비트 값
        """
        current = self.read_register(register)
        current = (current & ~mask) | (value & mask)
        self.write_register(register, current)


# 사용 예제
if __name__ == "__main__":
    # I2C 버스 초기화
    i2c = I2CBus(bus_number=1)

    # I2C 스캔
    print("=== I2C Bus Scan ===")
    print(f"Bus: /dev/i2c-{i2c.bus_number}")
    print()

    devices = i2c.scan_with_info()

    if devices:
        print("Found devices:")
        print("-" * 50)
        for addr, name in devices.items():
            print(f"  0x{addr:02X} ({addr:3d}): {name}")
        print("-" * 50)
        print(f"Total: {len(devices)} device(s)")
    else:
        print("No I2C devices found!")

    print()

    # 특정 디바이스 테스트 (SSD1306 OLED)
    if 0x3C in devices:
        print("=== SSD1306 OLED Test ===")
        try:
            oled = I2CDevice(i2c, 0x3C)

            # 디스플레이 초기화 명령 전송
            init_cmds = [0xAE, 0xD5, 0x80, 0xA8, 0x3F]
            for cmd in init_cmds:
                oled.write_register(0x00, cmd)

            print("OLED initialized successfully")
        except Exception as e:
            print(f"OLED Error: {e}")

    i2c.close()
    print("\nTest Complete")
```

#### 주요 기능
- **디바이스 스캔**: 연결된 I2C 디바이스 검색
- **범용 읽기/쓰기**: 바이트, 워드, 블록 데이터
- **비트 조작**: 레지스터 비트 설정/클리어
- **디바이스 추상화**: 범용 I2C 디바이스 클래스

---

### 4.8 통합 예제 - 환경 모니터링 시스템

#### Python 코드 예제

```python
#!/usr/bin/env python3
"""
UTTEC RPi Shield - Integrated Environmental Monitoring System
모든 기능을 활용한 환경 모니터링 시스템 예제
"""

import time
import threading
from datetime import datetime

# 각 모듈 임포트 (위에서 정의한 클래스들)
# from lora_module import LoRaModule
# from ssd1306 import SSD1306
# from led_controller import LEDController
# from rs485 import ModbusRTU
# from tm1637 import TM1637

class EnvironmentalMonitor:
    """환경 모니터링 시스템 클래스"""

    def __init__(self):
        """시스템 초기화"""
        print("Initializing Environmental Monitoring System...")

        # 각 모듈 초기화
        self.oled = SSD1306()
        self.led = LEDController(pin=17)
        self.segment = TM1637(clk_pin=23, dio_pin=24)
        self.lora = LoRaModule(frequency=915.0)
        self.modbus = ModbusRTU(port='/dev/ttyAMA0', baudrate=9600)

        # 센서 데이터
        self.temperature = 0.0
        self.humidity = 0.0
        self.running = False

        print("System initialized!")

    def read_sensors(self):
        """센서 데이터 읽기 (Modbus 온습도 센서)"""
        try:
            # 온습도 센서 (슬레이브 ID: 1, 레지스터 0-1)
            data = self.modbus.read_input_registers(1, 0, 2)
            self.temperature = data[0] / 10.0
            self.humidity = data[1] / 10.0
            return True
        except Exception as e:
            print(f"Sensor read error: {e}")
            return False

    def update_display(self):
        """디스플레이 업데이트"""
        # OLED 디스플레이 업데이트
        self.oled.clear()
        self.oled.text(f"Temp: {self.temperature:.1f} C", 0, 0)
        self.oled.text(f"Humi: {self.humidity:.1f} %", 0, 20)
        self.oled.text(datetime.now().strftime("%H:%M:%S"), 0, 45)
        self.oled.display()

        # 7세그먼트 - 온도 표시
        self.segment.show_temperature(int(self.temperature))

    def check_alerts(self):
        """경고 조건 확인"""
        if self.temperature > 30 or self.humidity > 80:
            self.led.blink(on_time=0.2, off_time=0.2)
            return True
        else:
            self.led.heartbeat()
            return False

    def send_lora_data(self):
        """LoRa로 데이터 전송"""
        data = f"T:{self.temperature:.1f},H:{self.humidity:.1f}"
        if self.lora.send(data):
            print(f"LoRa sent: {data}")
        else:
            print("LoRa send failed")

    def run(self):
        """메인 루프 실행"""
        self.running = True
        lora_counter = 0

        print("Starting monitoring...")
        self.led.heartbeat()

        while self.running:
            # 센서 읽기
            if self.read_sensors():
                # 디스플레이 업데이트
                self.update_display()

                # 경고 확인
                alert = self.check_alerts()

                # 10초마다 LoRa 전송
                lora_counter += 1
                if lora_counter >= 10:
                    self.send_lora_data()
                    lora_counter = 0

            time.sleep(1)

    def stop(self):
        """시스템 중지"""
        self.running = False
        self.led.off()
        self.oled.clear()
        self.segment.clear()
        print("System stopped")

    def close(self):
        """리소스 정리"""
        self.stop()
        self.oled.close()
        self.led.close()
        self.segment.close()
        self.lora.close()
        self.modbus.close()


# 메인 실행
if __name__ == "__main__":
    monitor = EnvironmentalMonitor()

    try:
        monitor.run()
    except KeyboardInterrupt:
        print("\nShutdown requested...")
    finally:
        monitor.close()
        print("Goodbye!")
```

---

## 5. 주안점

### 5.1 하드웨어 설계 주안점

| 항목 | 주안점 | 구현 방법 |
|------|--------|-----------|
| **전원 안정성** | 노이즈 없는 안정적 전원 공급 | 다중 디커플링 캐패시터, LDO 레귤레이터 |
| **신호 무결성** | 고속 신호 품질 확보 | 임피던스 매칭, GND 플레인 설계 |
| **EMI/EMC** | 전자파 간섭 최소화 | 실드, 필터, 적절한 배선 |
| **열 관리** | 발열 부품 온도 관리 | 방열 패드, 통풍 설계 |
| **커넥터 신뢰성** | 견고한 물리적 연결 | 산업용 등급 커넥터 사용 |

### 5.2 소프트웨어 설계 주안점

| 항목 | 주안점 | 구현 방법 |
|------|--------|-----------|
| **모듈화** | 각 기능의 독립적 사용 | 클래스 기반 설계, 느슨한 결합 |
| **에러 처리** | 안정적인 동작 보장 | 예외 처리, 타임아웃, 재시도 로직 |
| **리소스 관리** | 메모리/핸들 누수 방지 | Context Manager, close() 메서드 |
| **확장성** | 새로운 기능 추가 용이 | 상속, 인터페이스 설계 |
| **문서화** | 사용 편의성 | Docstring, 타입 힌트, 예제 코드 |

### 5.3 통신 프로토콜 주안점

| 항목 | 주안점 | 구현 방법 |
|------|--------|-----------|
| **데이터 무결성** | 전송 오류 검출 | CRC, 체크섬 적용 |
| **동기화** | 정확한 타이밍 | 프레이밍 (STX/ETX), 타임아웃 |
| **호환성** | 표준 프로토콜 준수 | Modbus RTU 표준 구현 |
| **안정성** | 통신 장애 복구 | 재전송, 핸드셰이킹 |

---

## 6. 시스템 요구사항

### 6.1 하드웨어 요구사항

| 항목 | 요구사항 |
|------|----------|
| **Raspberry Pi** | 3B/3B+/4B/5 (40-pin GPIO) |
| **전원** | 5V 3A 이상 권장 |
| **SD Card** | 16GB 이상 |
| **네트워크** | WiFi 또는 Ethernet (선택) |

### 6.2 소프트웨어 요구사항

| 항목 | 요구사항 |
|------|----------|
| **OS** | Raspberry Pi OS (Bullseye/Bookworm) |
| **Python** | 3.7 이상 |
| **라이브러리** | RPi.GPIO, spidev, smbus2, pyserial, Pillow |

### 6.3 라이브러리 설치

```bash
# 시스템 패키지 업데이트
sudo apt update && sudo apt upgrade -y

# Python 라이브러리 설치
pip3 install RPi.GPIO spidev smbus2 pyserial Pillow

# I2C, SPI 활성화
sudo raspi-config
# -> Interface Options -> I2C -> Enable
# -> Interface Options -> SPI -> Enable

# UART 설정 (RS485/RS422용)
sudo raspi-config
# -> Interface Options -> Serial Port
#    -> Login shell: No
#    -> Serial hardware: Yes

# 재부팅
sudo reboot
```

---

## 7. 문의 및 지원

### 제품 정보
- **제품명**: UTTEC Raspberry Pi Multi-Function Shield
- **제조사**: UTTEC
- **버전**: 1.0

### 연락처
- **기술 지원**:
- **이메일**:
- **웹사이트**:

---

*© 2024 UTTEC. All Rights Reserved.*
