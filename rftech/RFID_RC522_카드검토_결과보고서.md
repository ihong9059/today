# RFID RC522 카드 검토 결과 보고서

**작성일:** 2026-01-12
**검토 장비:** RC522 RFID Reader Module
**검토 환경:** Raspberry Pi (Debian 13 trixie, aarch64)

---

## 1. 하드웨어 연결 정보

### RC522 모듈 핀 연결

| RC522 핀 | GPIO | Raspberry Pi Pin | 비고 |
|----------|------|------------------|------|
| VCC | 3.3V | Pin 1 또는 17 | 반드시 3.3V 사용 |
| GND | GND | Pin 6, 9, 14, 20 | |
| MOSI | GPIO10 | Pin 19 | SPI0_MOSI |
| MISO | GPIO9 | Pin 21 | SPI0_MISO |
| SCK | GPIO11 | Pin 23 | SPI0_SCLK |
| SDA/SS | GPIO8 | Pin 24 | CE0 |
| RST | 3.3V | Pin 1 또는 17 | 또는 GPIO25 |
| IRQ | - | - | 미사용 |

### RC522 모듈 정보

| 항목 | 값 |
|------|-----|
| Version Register | 0x92 |
| 버전 | RC522 v2.0 |
| SPI 장치 | /dev/spidev0.0 |
| 통신 속도 | 1MHz |

---

## 2. 검토된 RFID 카드 목록

### 카드 요약

| # | UID | TagType | 카드 타입 | Block 0 인증 | UID 변경 |
|---|-----|---------|----------|-------------|---------|
| 1 | 04-DA-0D-2B | 0x0010 | NTAG/Ultralight | 성공 | 불가 |
| 2 | 22-BC-7D-34 | 0x0010 | NTAG/Ultralight | 성공 | 불가 |
| 3 | 2D-D6-C9-01 | 0x0010 | NTAG/Ultralight | 성공 | 불가 |
| 4 | 88-53-FC-9C | 0x0010 | NTAG/Ultralight | 실패 | 불가 |

---

## 3. 카드별 상세 정보

### 카드 #1
```
UID:        04-DA-0D-2B-F8
UID (10진수): 81399083 / 20838165496 (5바이트)
TagType:    0x0010
카드 타입:   NTAG/Ultralight 계열
Block 0:    04 DA 0D 2B F8 08 04 00 62 63 64 65 66 67 68 69
인증 상태:   성공 (Key A: FF FF FF FF FF FF)
UID 변경:   실패 - 일반 카드
비고:       04로 시작 → NXP 정품 카드
```

### 카드 #2
```
UID:        22-BC-7D-34
TagType:    0x0010
카드 타입:   NTAG/Ultralight 계열
Block 0:    22 BC 7D 34 D7 08 04 00 62 63 64 65 66 67 68 69
인증 상태:   성공 (Key A: FF FF FF FF FF FF)
UID 변경:   실패 - 일반 카드
```

### 카드 #3
```
UID:        2D-D6-C9-01
TagType:    0x0010
카드 타입:   NTAG/Ultralight 계열
Block 0:    2D D6 C9 01 33 08 04 00 62 63 64 65 66 67 68 69
인증 상태:   성공 (Key A: FF FF FF FF FF FF)
UID 변경:   실패 - 일반 카드
```

### 카드 #4
```
UID:        88-53-FC-9C
TagType:    0x0010
카드 타입:   NTAG/Ultralight 계열
Block 0:    읽기 불가
인증 상태:   실패 (AUTH ERROR)
UID 변경:   불가
비고:       다른 인증 방식 사용 (MIFARE Classic 키 인증 미지원)
```

---

## 4. Block 0 구조 분석

```
Block 0 (16 bytes):
┌────────────────┬─────┬──────────┬─────────────────┐
│ UID (4 bytes)  │ BCC │ SAK/ATQA │ Manufacturer    │
│ 04 DA 0D 2B    │ F8  │ 08 04 00 │ 62 63 64 65 ... │
└────────────────┴─────┴──────────┴─────────────────┘

- UID: 카드 고유 식별자 (4바이트)
- BCC: Block Check Character (UID XOR 체크섬)
- SAK: Select Acknowledge
- ATQA: Answer To Request Type A
- Manufacturer: 제조사 데이터
```

---

## 5. UID 변경 가능성 분석

### 검토 결과

| 항목 | 결과 |
|------|------|
| 검토 카드 수 | 4장 |
| UID 변경 가능 | 0장 |
| UID 변경 불가 | 4장 |

### 원인 분석

1. **모든 카드가 NTAG/Ultralight 계열**
   - TagType 0x0010으로 동일
   - MIFARE Classic과 다른 메모리 구조

2. **정품 NXP 카드**
   - 카드 #1의 UID가 04로 시작 (NXP 제조사 코드)
   - 공장에서 UID가 하드코딩되어 변경 불가

3. **Block 0 쓰기 보호**
   - 일반 카드는 Block 0 영역이 읽기 전용
   - Magic Card만 Block 0 쓰기 가능

---

## 6. UID 변경이 필요한 경우 권장 사항

### Magic Card 종류

| 카드 타입 | 특징 | 가격 (대략) |
|----------|------|------------|
| Magic Gen1 | 기본 복제용, 일부 리더기에서 감지됨 | ~500원 |
| Magic Gen2 (CUID) | 안정적, 감지 어려움 | ~800원 |
| Magic Gen2 (FUID) | 1회 쓰기 후 일반 카드처럼 동작 | ~1,000원 |
| UID Changeable NTAG | NTAG 호환, 드물고 비쌈 | ~2,000원+ |

### 구매처
- 알리익스프레스: "UID changeable card", "Magic MIFARE", "CUID card"
- 국내: 네이버 쇼핑 "매직카드", "UID 변경 카드"

---

## 7. 현재 카드 활용 방안

### 방안 1: UID 기반 식별 시스템

```
[RFID 카드] → [RC522 리더기] → [UID 읽기]
                                    ↓
                            [데이터베이스 조회]
                                    ↓
                            [사용자 정보 반환]
```

- 각 카드의 고유 UID를 DB에 등록
- 카드 태그 시 UID로 사용자 식별
- UID는 변경 불가하므로 보안성 확보

### 방안 2: 데이터 영역 활용

```
Block 구조 (MIFARE Classic 1K 기준):
- Block 0: UID (읽기 전용)
- Block 1-2: 사용자 데이터 (읽기/쓰기 가능)
- Block 3: Sector Trailer (키 저장)
```

- 데이터 영역에 사용자 정보 저장
- 포인트, 권한 레벨 등 저장 가능
- 필요 시 데이터 수정 가능

---

## 8. 테스트 환경 정보

### Raspberry Pi 시스템

| 항목 | 값 |
|------|-----|
| 호스트명 | uttec |
| IP 주소 | 192.168.1.10 |
| OS | Debian 13 (trixie) |
| 커널 | 6.12.47+rpt-rpi-v8 aarch64 |
| Python | 3.13.5 |
| Node.js | v22.21.0 |
| Claude Code | 2.1.5 |

### 설치된 라이브러리

| 라이브러리 | 버전 |
|-----------|------|
| spidev | 3.6 |
| RPi.GPIO | 0.7.1 |
| mfrc522 | 0.0.7 |

### SSH 접속 정보

```bash
# 간편 접속
ssh rpi

# 직접 접속
ssh uttec@192.168.1.10
```

---

## 9. 결론

1. **검토된 4장의 카드 모두 UID 변경 불가**
   - 모두 NTAG/Ultralight 계열 일반 카드
   - Block 0 쓰기 보호 활성화

2. **UID 변경이 필요하면 Magic Card 별도 구매 필요**
   - Magic Gen2 (CUID) 권장

3. **현재 카드 활용 가능**
   - UID를 고유 식별자로 사용
   - 데이터 영역에 추가 정보 저장

---

*보고서 작성: Claude Code*
*검토 일시: 2026-01-12 10:30 ~ 11:00*
