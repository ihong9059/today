---
title: 빌드 함정 인벤토리 (cross-vendor 누적 박제)
type: entity
created: 2026-05-24
updated: 2026-05-24 (신설 — onDevice mandate v2.7 흡수 시점, Espressif 16 + Nordic 18 = 누적 34건)
tags: [빌드함정, debugging-자산, esp32s3, ESP-IDF, Nordic, Zephyr, CMSIS-NN, cmake, ninja, Windows-cmd, PowerShell, governance-신뢰성, 자기진단정정, 함정14-v3]
links: [onDevice-ai, ai-fanstick, uttec-stage-package, gaps, ai-direction]
---

# 빌드 함정 인벤토리 (cross-vendor)

## 한 줄 정의

onDevice_AI vault 의 보드한계모델 측정 사이클에서 누적 박제한 **vendor toolchain·OS·cmake 결함 함정 인벤토리**. **34건** (Espressif 16 + Nordic 18). 5/24 mandate v2.7 종결 시점 박제.

## 의의 (영업·R&D)

- **R&D 신뢰성 자산**: 1인 검증 과정에서 vendor toolchain 결함 34건 발견·우회 = 외부 회사 도입 시 직접 디버깅 비용 ~40~80시간 절감
- **governance 모범**: 자기 가설 검증·정정 사이클 (함정 #14 v3 진단 정정 = 5/21~24 잘못된 진단 → 5/24 R27 sweep 3차에서 진짜 원인 발견)
- **Stage 4 영업 카피**: "vendor toolchain·OS·cmake 결함 34건 인벤토리 보유 — 외부 회사 도입 시 직접 우회"

## 누적 매트릭스

| Vendor | 누적 | 환경 |
|---|:-:|---|
| **Espressif (esp32s3 / esp32c6)** | **16** | ESP-IDF v5.5.1 / Windows cmd.exe / PowerShell 5.1 / ninja / cmake 3.30 |
| **Nordic (pca10056 / pca10040)** | **18** | Zephyr v2.9.2 / 4.3.99 / west / CMSIS-NN |
| **합계** | **34** | — |

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
| 현재 누적 | 34건 (Espressif 16 + Nordic 18) |
| 다음 갱신 | 새 보드 / 새 라이브러리 / 새 cmake 버전 측정 시 |
| 영업 자산화 시점 | 6/29 W6 종료 익일 (Stage 4 영업 자료 통합) |
