# ESP32/D1 Mini + RC522 RFID 프로젝트

RFID 카드 읽기/쓰기를 위한 Arduino 프로젝트

## 프로젝트 구조

```
ESP32-RC522-RFID/
├── README.md
├── docs/
│   ├── SPEC.md           # ESP32 + RC522 상세 스펙
│   ├── WIRING.md         # ESP32 배선도
│   └── D1_MINI_SPEC.md   # D1 Mini 스펙 및 배선도
└── src/
    ├── ESP32_RC522_ReadWrite/
    │   └── ESP32_RC522_ReadWrite.ino   # ESP32용 코드
    └── D1Mini_RC522_ReadWrite/
        └── D1Mini_RC522_ReadWrite.ino  # D1 Mini용 코드
```

## 하드웨어 요구사항

- **MCU**: ESP32-DEVKIT_V4 또는 ESP8266 D1 Mini
- **RFID 모듈**: RC522 (MFRC522)
- **RFID 카드/태그**: MIFARE Classic 1K/4K
- **점퍼선**: 7개

## 배선 요약

### ESP32-DEVKIT_V4
| RC522 | ESP32 |
|-------|-------|
| 3.3V | 3V3 |
| GND | GND |
| SDA | GPIO5 |
| SCK | GPIO18 |
| MOSI | GPIO23 |
| MISO | GPIO19 |
| RST | GPIO4 |

### D1 Mini
| RC522 | D1 Mini |
|-------|---------|
| 3.3V | 3V3 |
| GND | GND |
| SDA | D8 (GPIO15) |
| SCK | D5 (GPIO14) |
| MOSI | D7 (GPIO13) |
| MISO | D6 (GPIO12) |
| RST | D2 (GPIO4) |

## 설치 방법

### 1. Arduino IDE 설정

**ESP32 보드 추가:**
1. 파일 > 환경설정 > 추가적인 보드 매니저 URLs:
   ```
   https://dl.espressif.com/dl/package_esp32_index.json
   ```
2. 도구 > 보드 > 보드 매니저 > "esp32" 검색 후 설치

**ESP8266 보드 추가:**
1. 파일 > 환경설정 > 추가적인 보드 매니저 URLs:
   ```
   http://arduino.esp8266.com/stable/package_esp8266com_index.json
   ```
2. 도구 > 보드 > 보드 매니저 > "esp8266" 검색 후 설치

### 2. 라이브러리 설치

스케치 > 라이브러리 포함하기 > 라이브러리 관리
- "MFRC522" 검색 후 설치 (by GithubCommunity)

### 3. 보드 선택

- **ESP32**: 도구 > 보드 > ESP32 Arduino > ESP32 Dev Module
- **D1 Mini**: 도구 > 보드 > ESP8266 Boards > LOLIN(WEMOS) D1 R2 & mini

### 4. 업로드

1. USB 연결
2. 포트 선택 (도구 > 포트)
3. 업로드 버튼 클릭

## 사용 방법

1. 시리얼 모니터 열기 (115200 baud)
2. 명령어 입력:
   - `r` - 카드 읽기
   - `w` - 카드 쓰기
   - `d` - 카드 전체 덤프
   - `i` - 시스템 정보 (D1 Mini만)
3. RFID 카드를 RC522에 가까이 대기

## 출력 예시

```
========================================
  ESP32 + RC522 RFID Read/Write
========================================
Firmware Version: 0x92 = v2.0

카드를 가까이 대주세요...

----------------------------------------
카드 감지! UID:  A1 B2 C3 D4
카드 타입: MIFARE 1KB
----------------------------------------
블록 4 데이터:  48 65 6C 6C 6F 20 52 46 49 44 21 00 00 00 00 00
          텍스트: Hello RFID!.....
```

## 주의사항

1. **전압**: RC522는 반드시 **3.3V** 사용 (5V 연결 시 손상)
2. **블록 0**: 제조사 데이터 - 쓰기 금지
3. **트레일러 블록**: 섹터별 마지막 블록(3,7,11...) - 키 저장용
4. **기본 키**: `0xFF 0xFF 0xFF 0xFF 0xFF 0xFF`

## 문제 해결

| 증상 | 해결 방법 |
|------|----------|
| RC522를 찾을 수 없음 | 배선 확인, 특히 SDA/SCK |
| 카드 인식 안됨 | 카드를 안테나 가까이 대기 |
| 인증 실패 | 기본 키가 변경된 카드일 수 있음 |
| D1 Mini 부팅 실패 | D8에 10K 풀다운 저항 추가 |

## 참고 자료

- [MFRC522 라이브러리](https://github.com/miguelbalboa/rfid)
- [ESP32 핀맵](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)
- [D1 Mini 핀맵](https://www.wemos.cc/en/latest/d1/d1_mini.html)
