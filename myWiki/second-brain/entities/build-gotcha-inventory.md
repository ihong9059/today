---
title: 빌드 함정 인벤토리 (cross-vendor 누적 박제)
type: entity
created: 2026-05-24
updated: 2026-05-28 R38 흡수 — STM-16 Zephyr stm32 fmc_sdram driver Kconfig 필수 (dts status okay만으로 부족 → Imprecise BUS FAULT). STM 15 → 16건, 누적 50 → 51건
tags: [빌드함정, debugging-자산, esp32s3, ESP-IDF, Nordic, Zephyr, CMSIS-NN, cmake, ninja, Windows-cmd, PowerShell, governance-신뢰성, 자기진단정정, 함정14-v3, NDK, clang, vectorizer, STM32, STM32H745, carry-over-효과, sweep-race-fix, monitor-시간계산, dual-core-boot, M4-console-UART, INFO-emit-cache, baseline-artifact-정정, paired-check, STM-16-fmc-sdram-Kconfig, R38-SDRAM]
links: [onDevice-ai, ai-fanstick, uttec-stage-package, gaps, ai-direction, stm32h745-disco, 2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질, 2026-05-25_STM32H745-Zephyr-통합-cross-vendor, 2026-05-27_Cortex-M-tier-최강-AI-노드, 2026-05-28_R36-R37-baseline-artifact-paired-check-fix, 2026-05-28_R38-stm32h745-SDRAM-QSPI-3tier-메모리-실증]
---

## 2026-05-28 R38 SDRAM+QSPI 흡수 — STM-16 신규 함정 ⭐ (Zephyr fmc_sdram Kconfig 필수)

### STM-16 (R38-A1) ⭐ — Zephyr stm32 fmc_sdram driver Kconfig 활성 필수

- **원인**: H745I-DISCO SDRAM2 (IS42S16400J 8MB @ 0xD0000000) 사용 시 dts node `status="okay"`만으로 **부족**. SDRAM access 시 Imprecise BUS FAULT → ZEPHYR FATAL ERROR 26 (panic, no recovery).
- **우회**: `prj.conf`에 다음 두 Kconfig 활성화 필수:
  ```
  CONFIG_MEMC=y
  CONFIG_MEMC_STM32_SDRAM=y
  ```
  FLASH 사이즈 영향: +1.5KB (FMC controller driver).
- **발현 시점**: R38 Phase A 진입 시 첫 SDRAM read attempt. dts만 점검하던 표준 절차로는 사전 검출 불가 (build 정상 + boot 정상 → 첫 access 시 panic).
- **carry-over**: 다른 STM32 + SDRAM 보드 (H7Sx / H7Bx / F4xx + SDRAM HAL) 동일 패턴. Zephyr stm32 family 전체 → SDRAM 사용 시 Kconfig 체크리스트 박제.

→ STM 함정 누적 15 → **16건**. cross-vendor 빌드 함정 누적 50 → **51건** (Espressif 16 + Nordic 18 + NDK 1 + STM32 16).

---

## 2026-05-28 R37/R36 정정 cascade 흡수 — STM-13/14/15 신규 함정 3건 + 자기 진단 정정 사이클 1건 ⭐⭐⭐

### STM-13 ⭐⭐ — H745 dual-core boot 시퀀스

- **원인**: Zephyr H7 SoC init (`soc_m7.c:53`)이 M7 init에서 BCM4 option byte 체크 후 M4 release 시퀀스 가정. M7 빈 상태 + M4 firmware만 flash → console 0 bytes (silent boot fail).
- **우회**: M7 stub firmware (`boards/stm32_m7_stub_project/`) Bank 1 flash 필수. dual-core flash sequence: **mass erase → M7 stub flash → M4 cell flash**.
- **carry-over**: 다른 H745 M4 측정 + 다른 dual-core Cortex-M family (H755 / H7Sx 등) 진입 시 동일 패턴.

### STM-14 minor — M4 console UART

- **원인**: M4 dts default `zephyr,console = &usart2`. H745I-DISCO USART2 외부 노출 미확인 → M4 측 console 미작동.
- **우회**: M4 overlay에서 USART3 console redirect (PB10/PB11 ST-Link Virtual COM 활용).

### STM-15 ⭐⭐ — INFO emit cache 영향 24% (carrier 자산)

R36 paired-check 정정 시 발견 (5/27 16:30~17:00):

- **원인**: INFO emit (printk + HAL_RCC peripheral access)을 `model_run_bench` **전**에 배치 시 I-cache layout 변동 + RCC register access → first-trial cache cold → **latency_avg 24% 증가** (557→692μs) + **p99 2.6× 증가** (7400→19500μs). 5회 측정 range 0 → 측정 잡음 아닌 결정론적 build/cache 효과.
- **우회**: INFO emit은 `model_run_bench` 호출 **후** (CSV 출력 후 DONE 전)에 배치. 측정 직전 cache state를 진단 코드 없는 빌드와 동일하게 유지.
- **carry-over**: 본 vault 모든 보드 measurement 일관성 표준. Nordic / ESP32 / Linux PC 측정 시 동일 패턴 (printk emit 위치 검증 필수).

→ STM 함정 누적 12 → **15건**. 누적 cross-vendor 빌드 함정 47 → **50건** (Espressif 16 + Nordic 18 + NDK 1 + STM32 15).

### 자기 진단 정정 사이클 3번째 사례 — R37 → R36 baseline artifact paired-check

| 사례 | 가설 | 정정 | 의의 |
|---|---|---|---|
| search G 패치 (5/22) | Sonnet 모델 격하 | 프론트엔드 표시 버그 정정 | 자가 진단 fix |
| 함정 #14 v3 (5/24) | Claude Code harness cwd reset | ESP-IDF/cmake/Windows cmd.exe 결함 | harness 책임 가설 → vendor toolchain 결함 정정 |
| **R37/R36 baseline (5/27~28)** ⭐⭐ | M4 clock-norm 0.27× 미달 (7번째 negative) + M7 clock-norm 0.43× 미달 | **pca10056 R18 실측 baseline 추정값 함정 → 실측 7,367μs 재확인 → M4 0.99×·M7 1.76× 정상** | 박제 정확성 정정 + negative finding 6건 유지 + 사용자 challenge가 정정 trigger |

→ governance 신뢰성 패턴 박제: **"측정값 의심 시 단일 출처 (실측 CSV) 재확인 후 정정"**. Claude가 자기 박제 자가 정정 + 발신측 cascade 카드 발신 = 외부 회사 도입 시 시연 자산. 자세히 [[2026-05-28_R36-R37-baseline-artifact-paired-check-fix]].

---

## 2026-05-27 uttec-factory 세션 2+3 흡수 — RPi family 함정 2건 추가

### ⭐ GPIO7 = SPI0 CE1 충돌 (LoRa AUX 함정)

- **함정**: UTTEC Shield 회로도 LoRa AUX = GPIO7. 그러나 `dtparam=spi=on` 시 GPIO7이 spidev0.1로 점유 → LoRa AUX GPIO read 불가
- **우회**: `dtoverlay=spi0-1cs` 명시적으로 한 줄로 disable (또는 `dtparam=spi=off`)
- **carry-over**: RPi family 일반 함정, shield A/B 양쪽 + 기타 RPi GPIO7 사용 시 모두 발현

### ⭐ WS2812 root 불가피 — NOPASSWD SOP

- **함정**: WS2812 NeoPixel은 `/dev/mem` PWM/DMA 직접 액세스 필요 → root 권한 필수. SPI 우회 방식도 있으나 본 UTTEC Shield는 GPIO12(PWM0) 배선이라 SPI 우회 불가
- **우회**: `/etc/sudoers.d/ws2812-uttec` 신설:
  ```
  uttec ALL=(root) NOPASSWD: /usr/bin/python3 /home/uttec/project/uttec-factory/구현/ws2812_test.py
  ```
- **효과**: tty 없는 자동화 (work-start/work-end hook + cron + Claude Code skill)에서도 password 없이 직접 구동
- **carry-over**: RPi WS2812 일반 함정, shield A/B + 기타 RPi 자동화 환경 모두 적용

(WS2812 PWM0/audio 충돌은 `feedback_rpi_ws2812_pwm0_audio_conflict.md` 별도 박제)

---

## 2026-05-27 Wave 14 추가 진단 패턴 (sweep race fix + CNN 64 monitor 부족)

### ⭐ sweep race fix 단일 cell 패턴 (carry-over 가치)

R36 sweep [1] first-cell timing fail → 단일 cell 표준 패턴 박제:

```
mass erase → flash → port.Open() + DiscardInBuffer() → 300ms 대기 → reset trigger → monitor loop
```

- **원인**: flash 직후 즉시 monitor 진입 시 reset 전 garbage UART data + first-cell이 prior session console noise mix
- **우회**: `DiscardInBuffer()` + 300ms 대기 + 명시적 reset trigger
- **carry-over**: `sweep12_stm32.ps1` → 다른 STM32 board sweep 즉시 carry 가능

### ⭐ CNN 64 monitor 부족 진단 (silent loss 패턴)

5/27 e1-2 "hang" 의심 → **단순 monitor 시간 부족 확정**:
- bench loop 100회 × ~960ms ≈ **96초** (LATENCY_WALL_US 1초 직전)
- 30s/40s/90s monitor 모두 부족 → silent loss (timeout 시 garbage)
- 150s monitor에서 정상 emit
- **패턴**: `monitor 시간 < bench 총 시간`이면 silent loss → **셀별 monitor budget 계산 필수**
- carry: sweep_cell의 monitor budget = `bench_iter × estimated_latency × 1.5 (safety)` 공식

# 빌드 함정 인벤토리 (cross-vendor)

## 한 줄 정의

onDevice_AI vault 의 보드한계모델 측정 사이클에서 누적 박제한 **vendor toolchain·OS·cmake·vectorizer 결함 함정 인벤토리**. **47건** (Espressif 16 + Nordic 18 + NDK 1 + STM32 12). 5/24 mandate v2.7 종결 시점 신설 → 5/26 Wave 10/11/12/13 흡수 확장.

## 의의 (영업·R&D)

- **R&D 신뢰성 자산**: 1인 검증 과정에서 vendor toolchain 결함 34건 발견·우회 = 외부 회사 도입 시 직접 디버깅 비용 ~40~80시간 절감
- **governance 모범**: 자기 가설 검증·정정 사이클 (함정 #14 v3 진단 정정 = 5/21~24 잘못된 진단 → 5/24 R27 sweep 3차에서 진짜 원인 발견)
- **Stage 4 영업 카피**: "vendor toolchain·OS·cmake 결함 34건 인벤토리 보유 — 외부 회사 도입 시 직접 우회"

## 누적 매트릭스

| Vendor | 누적 | 환경 |
|---|:-:|---|
| **Espressif (esp32s3 / esp32c6)** | **16** | ESP-IDF v5.5.1 / Windows cmd.exe / PowerShell 5.1 / ninja / cmake 3.30 |
| **Nordic (pca10056 / pca10040)** | **18** | Zephyr v2.9.2 / 4.3.99 / west / CMSIS-NN |
| **NDK (smartphone Android)** (5/24 Wave 11) | **1** | NDK clang 18 / Android / `+dotprod` vectorizer 정책 (E1) |
| **STM32 (STM32H745I-DISCO 14th)** (5/25~28 Wave 12+13+14+15+R38) | **16** ⭐ | Zephyr + STM32CubeProgrammer + STM32CubeIDE headless / DAPLink / LTDC / AXI SRAM / USB FS / dual-core boot / M4 console / INFO emit cache / fmc_sdram Kconfig |
| **합계** | **51** ⭐ | — |

## Espressif 16건 상세

| # | Round | 함정 | 우회 |
|:-:|:-:|---|---|
| 1~4 | R17 | ESP-DSP `dsps_dp_s8_aes3` symbol resolve 함정 4건 | menuconfig CONFIG_DSP_OPTIMIZED |
| 5 | R20-1 | PowerShell 5.1 한글 경로 string ASCII CP949 read 깨짐 (`$patchScript = "...프로젝트_보드한계모델..."` interpolation fail) | patch_ninja.ps1 영어 경로 사본 `C:\esp_proj\scripts\` + sweep script ASCII-only |
| 6 | R21-1 | esp-nn ninja PRE_LINK cd . cwd reset | patch_ninja.ps1 v2 PRE_LINK 패턴 |
| 7 | R21-2 | esp-nn sections.ld-*.bat 상대 경로 | wrapper.bat 절대 경로 변환 |
| 8 | R21-3 | PowerShell 5.1 UTF-8 BOM CP949 fallback | UTF-8 no BOM 강제 |
| 9 | R27-1 | sweep 첫 cell race condition (build dir cache 없음, fresh ar/ranlib) | dummy build 사전 실행 또는 별도 broker |
| 10 | R27-2 | adam phase FP16 conversion overhead 측정 함정 | adam phase 단독 timer |
| 11~13 | (5/22 야간) | Nordic 빌드 함정 cross-vendor revisit 3건 박제 | (Nordic 측 박제 11~16 참조) |
| 14 (v1/v2/**v3**) ⭐⭐ | R27 (5/24) | **함정 #14 진단 정정** ─ 잘못된 진단: "Claude Code harness가 ninja → cmd chain의 cwd를 reset해서 `cd .`이 no-op" (5/21~24 박제). **진짜 원인**: ESP-IDF/cmake 3.30/Windows cmd.exe의 `cmd /C "cd . && tool ... && cd ."` 패턴 cwd 보존 결함 — 일반 PowerShell 에서도 동일 fail (Claude Code harness 책임 아님). R23/R24/R25/R26 sweep 통과 이유: build dir cache 로 매 cell incremental → ar/ranlib 안 호출. fresh state 시 노출. | 우회 3종: ① patch_ninja.ps1 v3 확장 (모든 `cd \.` PRE_LINK/POST_BUILD/ar/ranlib/install/rm + 모든 build.ninja file bootloader subproject 포함) ② ESP-IDF 시스템 파일 1줄 패치 (`$IDF_PATH/components/bootloader/subproject/CMakeLists.txt`에 `set(CMAKE_C_COMPILER_WORKS TRUE)`) ③ sweep 첫 cell race 우회 (별도 broker 또는 dummy 빌드 추가) |
| 15~16 | (누적) | esp-nn 빌드 chain 시 ksm.sh chmod 함정 + heap allocator alignment 함정 | wrapper 패턴 |

## Nordic 18건 상세

| # | Round | 함정 | 우회 |
|:-:|:-:|---|---|
| 1~5 | R18 | Nordic 빌드·monitor 함정 5건 (CMakeLists.txt include / west menuconfig / nrfjprog UART monitor / Zephyr build dir 권한 / SEGGER J-Link console) | (각 함정별 우회 박제 in onDevice/CLAUDE.md § Nordic) |
| 6~7 | R18 후속 | R18-F (pca10040 RAM_safe wall 12/12 CMSIS-NN .bss 34KB 차지) + R18-G (Zephyr build dir 권한 함정) | (pca10040 트랙 분리) |
| 8~16 | (누적 5/22 야간 ~ 5/23) | west fetch 함정 / nordic SDK 버전 호환 / Zephyr dts overlay 함정 / arm-none-eabi-gcc 표준 라이브러리 함정 등 9건 | (각 함정별 우회) |
| 17 | R28-1 (5/24) | **Zephyr 4.3.99 CMSIS-NN module `arm_convolve_s8` 에 `upscale_dims` argument 추가됨** (이전 버전과 signature 불일치) | **`arm_convolve_wrapper_s8` 사용 우회** (자동 dispatch, signature 호환 보장) |
| 18 | R28-2 (5/24) | **Bash → PowerShell env var transfer 함정** (`$` 변수 치환 = bash 와 PS 모두 `$` prefix 사용, escape 충돌) | **별도 wrapper script** 사용 (bash 측 env 파일 export → PS 측 source) |

## NDK 1건 상세 (Wave 11, 5/24)

| # | Round | 함정 | 우회 |
|:-:|:-:|---|---|
| E1 ⭐ | R30 (5/24) | **clang vs gcc INT8 vectorizer 정책 차이** — Galaxy A51 5G NDK clang 18 `-O3 -march=armv8.2-a+dotprod` 시 `+dotprod` flag 인식하나 INT8 src를 `smlal` (INT16 promote) path 선택 → `sdot` 자동 미선택 (rpi5 gcc 14.2 같은 flag로 6.7× 가속과 정반대 0.97×) | 대안 없음 — mobile CPU/NPU 추가 SDK 도입 가치 없음 확정 (3 path 모두 negative). 자세한 일반화 [[2026-05-24_toolchain-vectorizer-정책이-NEON-가속의-본질]] |

## STM32 12건 상세 (Wave 12 + 13, 5/25~26)

| # | Wave | 함정 | 우회 |
|:-:|:-:|---|---|
| STM-1 | 12 | 한글 경로 cmake 0xC0000409 (ESP-IDF #1 carry-over) | `C:\stm32_proj\` 영어 사본 |
| STM-2 | 12 | 함정 #14 cd . cwd 보존 결함 (Espressif #14 v3 carry-over) | patch_ninja.ps1 매 reconfigure 후 |
| STM-3 | 12 | **dual-core boot 함정** (M4 wwdg 잔존 console 점유) | mass erase 매 셀 |
| STM-4 | 12 | STM32CubeProgrammer halt 거부 | mode=UR reset=HWrst |
| STM-5 | 12 | **보드명 자가진단** (사용자 "H746" → 실제 H745) | STM32CubeProgrammer 식별 + DAPLink label + Zephyr board 정의 3중 교차 |
| STM-6 | 12 | ST 사전 빌드 .hex segmented binary (Sector[0] fail) | STM32CubeIDE headless build sample 직접 빌드 |
| STM-7 | 12 | LTDC sample backlight (PK0) + display enable (PK7) 누락 | main.c에 직접 GPIO set |
| STM-8 | 12 | 480×272 RGB565 framebuffer 261KB → DTCM 128KB overflow | AXI SRAM 0x24000000 직접 + SCB_CleanDCache |
| STM-9 | 12 | LD8 (PD3) active HIGH polarity (LD6/LD7 active LOW와 반대) | 직접 GPIO + SET=ON |
| STM-10 | 12 | PowerShell sweep monitor function scope New-Object cast fail | monitor inline (function scope 회피) |
| STM-11 | 12 | USB silk-screen 확인 — H745 = CN13 USB FS (NOT HS ULPI) | nucleo_h745zi_q carry-over (PA11/PA12 internal PHY) |
| **STM-12** ⭐ | **13** | **Zephyr API change**: `net_mgmt_event_handler_t` 시그니처 4.3에서 `uint32_t mgmt_event` → `uint64_t` 변경. 옛 시그니처 사용 시 warning만 (error 아님, runtime 정상). 다른 보드 carry-over 시 **silent breakage 가능성**. | 시그니처 갱신 (uint64_t 사용) |
| **STM-13** ⭐⭐ | **15 (R37)** | **H745 dual-core boot 시퀀스**: Zephyr H7 SoC init (`soc_m7.c:53`)이 M7 init에서 BCM4 option byte 체크 후 M4 release 가정. M7 빈 상태 + M4 firmware만 flash → console 0 bytes (silent boot fail). | M7 stub firmware (`boards/stm32_m7_stub_project/`) Bank 1 flash 필수. dual-core flash: mass erase → M7 stub → M4 cell. carry-over: H755 / H7Sx |
| **STM-14** | **15 (R37)** | **M4 console UART**: M4 dts default `zephyr,console = &usart2`. H745I-DISCO USART2 외부 노출 미확인 → M4 측 console 미작동. | M4 overlay USART3 console redirect (PB10/PB11 ST-Link Virtual COM) |
| **STM-15** ⭐⭐ | **14 (R36 paired-check)** | **INFO emit cache 영향 24%**: printk + HAL_RCC peripheral access 를 `model_run_bench` **전** 배치 시 I-cache layout + RCC register access → first-trial cache cold → latency_avg 24%↑ (557→692μs) + p99 2.6×↑ (7400→19500μs). 5회 range 0 = 결정론적 build/cache 효과 (측정 잡음 아님). | INFO emit은 `model_run_bench` **후** 배치 (CSV 출력 후 DONE 전). carry-over: 본 vault 모든 보드 measurement 일관성 표준 |

### carry-over 효과 정량화 (Wave 13 입증)

11 STM32 함정 (STM-1~11) 박제 후 Wave 13 PoC 2건 진행 → 신규 함정 **1건 (STM-12 minor)** 만 발현.

- R36 sweep = 3차 시도
- 본 PoC (Ethernet + Bridge) = **1차 success** ⭐
- 패턴: **"환경 셋업 함정은 보드 첫 작업에 집중, 이후 PoC는 carry-over로 1차 success"**
- 영업 카피: "vendor 함정 인벤토리 보유 → 외부 회사 도입 시 first-try success ratio 향상"

## 자기 진단 정정 사이클 = governance 신뢰성 모범

| 사례 | 가설 | 정정 | 의의 |
|---|---|---|---|
| **search G 패치** (5/22, search-claude) | "Sonnet 모델 격하" | "프론트엔드 표시 버그 → 자가 진단 fix" | 모델 격하 가설 → 표시 버그 정정 |
| **함정 #14 v3** (5/24, ondevice-claude) | "Claude Code harness cwd reset" | "ESP-IDF/cmake/Windows cmd.exe cwd 보존 결함" | harness 책임 가설 → vendor toolchain 결함 정정 |

→ Claude 가 자기 가설 검증 + 정정 박제 카드 발송 = governance 패턴 모범. 외부 회사 도입 시 "Claude 가 자기 코드·진단 자가 정정 사이클" 시연 자산.

## cascade 권고

| 흡수 위치 | 갱신 내용 |
|---|---|
| [[onDevice-ai]] § 빌드 함정 34건 누적 | 본 entity link cross-reference |
| [[ai-fanstick]] § R&D 신뢰성 카피 | "vendor toolchain 결함 34건 직접 우회" |
| [[uttec-stage-package]] Stage 4 카피 | "1인 검증 시 vendor toolchain 결함 인벤토리 보유 → 외부 회사 도입 시 ~40~80시간 절감" |
| [[gaps]] | 함정 #14 v3 진단 정정 사례 (governance 신뢰성 사례) |

## 메타

| 항목 | 값 |
|---|---|
| 신설 | 2026-05-24 (mandate v2.7 종결 megasession 흡수) |
| 5/26 Wave 10~13 흡수 | 47건 (Espressif 16 + Nordic 18 + NDK 1 + STM32 12) |
| 다음 갱신 | 새 보드 / 새 라이브러리 / 새 cmake 버전 측정 시 |
| 영업 자산화 시점 | 6/29 W6 종료 익일 (Stage 4 영업 자료 통합) |
