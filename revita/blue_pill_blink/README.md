# Blue Pill — Default LED Blink

STM32F103C8T6 (Blue Pill) 보드의 기본 LED(**PC13, active LOW**)를 약 2 Hz로 점멸하는 최소 펌웨어.

## 보드 / 구성

| 항목 | 값 |
|---|---|
| MCU | STM32F103C8T6 (Cortex-M3, 72 MHz max) |
| Flash | 64 KB @ 0x08000000 |
| RAM | 20 KB @ 0x20000000 |
| Default LED | **PC13 (active LOW)** — 핀 LOW → LED ON |
| 클럭 | HSI 8 MHz (reset 직후 기본값, 본 펌웨어는 PLL 미사용) |
| Toolchain | STM32CubeIDE 1.19.0 번들 ARM GCC (별도 설치 불필요) |
| Flasher | STM32CubeProgrammer CLI + ST-Link |

## 파일 구성

```
blue_pill_blink/
├── README.md      ← 본 파일
├── main.c         ← LED 점멸 본체 (레지스터 직접 제어)
├── startup.c      ← Cortex-M3 vector table + Reset_Handler
├── linker.ld      ← Flash/RAM 메모리 맵
├── build.ps1      ← 빌드 스크립트 (PowerShell)
└── flash.ps1      ← ST-Link 플래시 스크립트 (PowerShell)
```

CMSIS / HAL / LL 라이브러리 의존성 0. 순수 레지스터 접근.

## 사용법

### 1단계 — 빌드

```powershell
.\build.ps1
```

성공 시 `blink.elf` / `blink.hex` / `blink.bin` 생성. Section size와 Flash 사용률 표시.

### 2단계 — 플래시 (전제: ST-Link 드라이버 정상)

```powershell
.\flash.ps1
```

플래시 성공 시 약 250 ms 주기로 PC13 LED 점멸.

## ST-Link 드라이버 문제 해결

현재 PC에 꽂힌 ST-Link 동글이 **Problem Code 28 (드라이버 미설치)** 상태일 수 있습니다.

### 옵션 1 — STM32CubeProgrammer 재설치 시 드라이버 동시 설치
설치 마법사에서 "ST-LINK driver" 체크박스 활성화.

### 옵션 2 — 단독 드라이버 패키지
https://www.st.com/en/development-tools/stsw-link009.html  
다운로드 후 `dpinst_amd64.exe` 실행 (관리자 권한).

### 옵션 3 — STM32CubeIDE에서 ST-Link 펌웨어 업그레이드
CubeIDE 메뉴 → Help → ST-LINK Upgrade. 동글 펌웨어가 너무 오래된 경우 필요.

설치 후 ST-Link 동글을 USB에서 뺐다 다시 꽂으면 `장치 관리자`의 `STM32 STLink`가 정상(`OK`) 상태로 변경되어야 합니다.

## ST-Link ↔ Blue Pill 배선

기본 SWD 4선:

| ST-Link | Blue Pill (보드 후면 4핀 헤더) |
|---|---|
| 3.3V | 3.3V |
| GND | GND |
| SWDIO | DIO |
| SWCLK | DCLK |

> Boot 모드 점퍼는 **BOOT0=0, BOOT1=0** (정상 Flash 부팅 위치, 보통 점퍼 모두 1쪽으로 빠짐) 상태에서 플래시.

## 동작 검증

1. 빌드 후 `blink.bin` 크기 출력 — 1 KB 미만이어야 정상 (보통 ~400 bytes)
2. 플래시 후 보드 reset (자동 `-rst` 옵션 포함) → 즉시 PC13 LED 점멸 시작
3. 점멸 주기가 너무 빠르거나 느리면 `main.c`의 `delay(800000)` 값 조정

## 메모리 사용량 예시

```
   text	   data	    bss	    dec	    hex	filename
    ~280	      0	      0	    ~280	    118	blink.elf
```

전형적으로 Flash 64 KB의 1% 미만 사용. 본격 펌웨어 작성 시 충분한 여유.

## 다음 단계 (참고)

- CMSIS 헤더 (`stm32f103xb.h`) 추가 → 레지스터 매크로를 표준화
- SysTick 기반 정밀 1 ms 타이머
- USART1 (PA9 TX / PA10 RX)로 printf 디버그
- UART → revita 호스트와 시리얼 연동 (현재 REMOCON 보드처럼 USB CDC도 가능 — 다만 USB CDC는 코드 양이 많아짐)

## 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-12 |
| 작성 계기 | 갑작스러운 작업 — Blue Pill default LED 점멸 검증 |
| 위치 | `revita/blue_pill_blink/` (revita 본 프로젝트와 별개 — revita 본체는 nRF52840/Zephyr) |
