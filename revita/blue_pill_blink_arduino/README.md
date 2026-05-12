# Blue Pill — Arduino IDE 설정

같은 LED 점멸을 Arduino IDE (또는 arduino-cli)로 만드는 방법.

## 핵심 — Arduino라고 드라이버 문제가 사라지진 않음

| 업로드 방식 | ST-Link 드라이버 필요? | 추가 조건 |
|---|:-:|---|
| **STM32CubeProgrammer (SWD)** = ST-Link | ✅ **필요** | 우리가 막힌 그 드라이버 |
| **STM32CubeProgrammer (Serial)** = USB-UART | ❌ 불필요 | USB-UART 어댑터 + BOOT0=1 |
| **HID Bootloader 2.2** | ❌ 불필요 (이후) | **최초 1회는 ST-Link로** 부트로더 굽기 필요 |
| **Maple DFU Bootloader** | ❌ 불필요 (이후) | **최초 1회는 ST-Link로** 부트로더 굽기 필요 |
| **STM32CubeProgrammer (DFU)** | ❌ 불필요 | Blue Pill USB → BOOT0=1로 부트 ROM USB DFU 모드 (F103은 미지원, ❌) |

→ **현재 PC에서 가장 빠른 길**: STM32CubeProgrammer (Serial) + USB-UART 어댑터 + BOOT0=1.

## 옵션 1 — Arduino IDE (GUI) 설정

### ① Arduino IDE 설치
이미 있으면 스킵. 없으면 https://www.arduino.cc/en/software 에서 IDE 2.x 다운로드·설치.

### ② STM32 보드 패키지 추가
1. Arduino IDE → `File` > `Preferences`
2. **Additional Boards Manager URLs** 칸에 추가:
   ```
   https://github.com/stm32duino/BoardManagerFiles/raw/main/package_stmicroelectronics_index.json
   ```
3. `Tools` > `Board` > `Boards Manager...` 열기
4. `STM32` 검색 → **STM32 MCU based boards** 설치 (~200 MB, 5~10분)

### ③ 보드 / 업로드 방식 선택
`Tools` 메뉴에서:

| 항목 | 값 |
|---|---|
| Board | **Generic STM32F1 series** |
| Board part number | **BluePill F103C8** (또는 64 KB Flash인 경우 동일) |
| Upload method | (아래에서 선택) |
| Optimize | Smallest (-Os) |
| C Runtime Library | Newlib Nano (default) |
| USB support | None |
| U(S)ART support | Enabled (generic Serial) |

**Upload method 선택지**:
- **STM32CubeProgrammer (SWD)**: ST-Link로 업로드 — *지금 막힌 그 경로*
- **STM32CubeProgrammer (Serial)**: USB-UART 어댑터 사용 → `Port`에 어댑터 COM 번호 / BOOT0=1로 점퍼 이동 후 reset

### ④ 스케치 열기
`File` > `Open...` → `blue_pill_blink_arduino\blue_pill_blink_arduino.ino` 선택.

### ⑤ 업로드
- Verify (✓) 버튼 → 컴파일 OK 확인
- Upload (→) 버튼 → 플래시

## 옵션 2 — arduino-cli (커맨드라인, 이 PC에 이미 설치됨)

```powershell
# 1. 보드 매니저 URL 등록 (최초 1회)
arduino-cli config init
arduino-cli config add board_manager.additional_urls `
  https://github.com/stm32duino/BoardManagerFiles/raw/main/package_stmicroelectronics_index.json

# 2. STM32 core 설치 (최초 1회, 5~10분)
arduino-cli core update-index
arduino-cli core install STMicroelectronics:stm32

# 3. 컴파일
arduino-cli compile --fqbn STMicroelectronics:stm32:GenF1:pnum=BLUEPILL_F103C8 `
  blue_pill_blink_arduino

# 4-A. ST-Link 업로드 (드라이버 정상일 때)
arduino-cli upload --fqbn STMicroelectronics:stm32:GenF1:pnum=BLUEPILL_F103C8,upload_method=swdMethod `
  blue_pill_blink_arduino

# 4-B. USB-UART + BOOT0=1 업로드 (드라이버 우회)
arduino-cli upload -p COM<번호> `
  --fqbn STMicroelectronics:stm32:GenF1:pnum=BLUEPILL_F103C8,upload_method=serialMethod `
  blue_pill_blink_arduino
```

## 옵션 3 — 가장 빠른 길 (지금 막힌 상태 우회)

USB-UART 어댑터 (CP2102 / CH340 / FTDI 등)가 있으면:

1. **배선**:
   ```
   USB-UART       Blue Pill
   ────────       ─────────
   3.3V    ─────  3.3V
   GND     ─────  GND
   TX      ─────  A10 (PA10 = USART1_RX)
   RX      ─────  A9  (PA9  = USART1_TX)
   ```

2. **BOOT0 점퍼**를 1쪽으로 이동 (USB 옆 노란색 점퍼 2개 중 BOOT0)
3. **Reset 버튼** 누름 → 보드가 내장 ROM USB-UART 부트로더로 진입
4. Arduino IDE에서 Upload method = **STM32CubeProgrammer (Serial)** + Port = USB-UART COM 번호
5. Upload 클릭
6. 완료 후 **BOOT0 점퍼 0쪽으로 복원** → Reset → 사용자 펌웨어 실행 → LED 점멸

## bare-metal 프로젝트와의 비교

| 측면 | `blue_pill_blink/` (bare-metal) | `blue_pill_blink_arduino/` (Arduino) |
|---|---|---|
| 코드 줄 수 | ~50 + startup ~50 + linker ~30 | **10줄** |
| 펌웨어 크기 | **244 bytes** | ~7~10 KB (Arduino runtime 포함) |
| 학습 가치 | 레지스터·메모리·startup 직접 이해 | 빠른 프로토타이핑 |
| 라이브러리 사용 | 0 | Arduino HAL → ST HAL → CMSIS |

두 접근 모두 보존 — 학습용 / 검증용 둘 다 활용 가능.

## 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-12 |
| 트리거 | 사용자 질문 — "아두이노에서 설정하려면?" |
| 위치 | `revita/blue_pill_blink_arduino/` (`blue_pill_blink/` bare-metal과 병행) |
