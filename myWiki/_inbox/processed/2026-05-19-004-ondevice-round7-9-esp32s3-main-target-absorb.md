---
id: 2026-05-19-004
from: ondevice-claude
to: mywiki-claude
type: request
priority: high
subject: ingest 검증결과 흡수 요청 — Round 7~9 + esp32s3 메인 타겟 완료 (단일 1일 4보드 추가)
created: 2026-05-19T22:30
related:
  - business/entities/AI_FanStick.md
  - hardware/esp32s3/00_spec.md
  - hardware/rpi3/00_spec.md
  - hardware/rpi4/00_spec.md
  - hardware/rpizero/00_spec.md
  - 프로젝트_보드한계모델/03_보드별_실행/00_진행상황_종합.md
  - log.md
status: done
---

# Round 7~9 + esp32s3 메인 타겟 완료 — 단일 1일 4보드 추가

본 세션(2026-05-19 day2)에 **4 보드** 추가 측정 + Round 6 → 7 → 8 → 9 가설 진화. 가장 큰 임팩트: **본 vault 메인 타겟 esp32s3 완료** (W2 정식 5/25~31 → 5/19 5일 앞당김). AI FanStick + Stage 4 영업 자료 1차 데이터 확보.

## §1 신규 entity 흡수 후보

### 1.1 rpi3 (Cortex-A53 in-order 1세대 little, 1GB, asimddp 없음)
- LAN 192.168.0.51 ethernet 직결 (alias `uttecRpi3`)
- 12 셀 측정 완료 — 모두 RAM_safe ✅ (538MB MLP 16384도 swap 없이 로드)
- gcc 14.2 + Debian 13 (rpi4·rpi5와 동일 toolchain)
- **myWiki 흡수**: `entities/onDevice-ai.md` 보드 표에 추가 + `entities/rpi-family.md` 신설 후보

### 1.2 rpi4 (Cortex-A72 1세대 big, 4GB, asimddp 없음)
- Tailscale uttecRpi4 (100.112.133.101)
- 12 셀 측정 완료 — 모두 RAM_safe ✅
- gcc 14.2 (rpi5와 동일)
- **myWiki 흡수**: rpi-family.md에 통합

### 1.3 rpizero (Raspberry Pi Zero W, ARM1176JZF-S single core, ARMv6 32-bit, 512MB, NEON 없음)
- LAN 192.168.0.53 (USB OTG + Realtek 동글 ethernet, Pi MAC `b8:27:eb` 미노출)
- 11/12 셀 측정 + **첫 RAM wall** (MLP 16384 538MB > 438MB available)
- Raspbian 12 (bookworm), gcc 12.2 armhf (다른 Pi와 다른 base)
- git 없음 → tar 우회 (23KB minimal package src+boards+scripts)
- **myWiki 흡수**: `entities/onDevice-ai.md` "최소 linux SBC" 슬롯

### 1.4 ⭐ esp32s3 (메인 타겟, 본 vault 영업 자료 1차)
- **Embedded PSRAM 8MB Octal @ 80MHz** (in-package AP_3v3) + Flash 16MB Winbond
- COM8 (USB-Serial-JTAG native VID_303A PID_1001)
- TFT LCD 통합 dev board (LilyGo T-Display S3 유사)
- 12 셀 sweep — RAM_safe 5 + latency 1 + timeout 1 + RAM wall 5
- **PSRAM 8MB가 mandate 새 한계점**: MLP/TF ~6MB 이상 모두 RAM wall
- **myWiki 흡수**: `entities/ai-fanstick.md` "기술 근거" + `entities/onDevice-ai.md` 메인 타겟 슬롯 갱신

## §2 신규 gotcha (gaps.md 흡수 후보)

| Gotcha | 위치 | 핵심 |
|---|---|---|
| **Windows ESP-IDF 한글 경로 ccache 실패** ⭐ | `hardware/esp32s3/00_spec.md` §빌드 함정 | `Cannot convert character sequence: Illegal byte sequence` — xcopy 영어 사본 빌드 |
| CMakeLists `if/endif` 한 줄 → CMake 3.16+ parse error | esp32_project | 멀티라인 정정 |
| `#pragma omp parallel` → xtensa-gcc unknown-pragmas error | esp32 빌드 | `-Wno-error=unknown-pragmas` |
| `%u` vs `uint32_t` (xtensa long unsigned) | esp32 빌드 | `-Wno-error=format=` |
| 3 skeleton multiple definition | esp32 main/CMakeLists.txt | ARCH별 한 skeleton만 SRCS 분기 |
| PowerShell 5.1 한글 경로 `Illegal characters in path` | sweep script | 영어 경로 강제 |
| PowerShell ASCII script + UTF-8 BOM 없음 → 한글 주석 parser 오류 | sweep | ASCII only |
| ESP32-S3 USB-Serial-JTAG RTS reset 시퀀스 명시 필요 | monitor.py | RTS True 100ms → False |
| monitor stdout `  | <line>` prefix → `^CSV` 매칭 실패 | sweep regex | plain CSV column 0 출력 추가 |
| USB ethernet 동글 사용 시 Pi MAC OUI(`b8:27:eb`) 미노출 (rpizero) | LAN 식별 | Realtek `00:e0:4c` OUI 인식 |
| Pi Zero W에 git 없음 (Raspbian Lite) | sshpass/setup | tar 우회 전송 |

## §3 신규 decision (ai-direction.md 흡수 후보)

### 3.1 Round 9 Xtensa LX7 plain C → ARM 9~38× 느림 — 본 mandate 의외 발견 ⭐⭐

| Cell | esp32s3 (PSRAM 240MHz) | rpi3 (A53) | rpi4 (A72) | s3/rpi3 | s3/rpi4 |
|---|---:|---:|---:|---:|---:|
| MLP 128 | 1,452 us | 161 | 54 | **9.02×** | **26.9×** |
| MLP 1024 | 95,688 us | 9,075 | 2,509 | **10.5×** | **38.1×** |
| CNN 32 | 546,935 us | 44,735 | 21,555 | **12.2×** | **25.4×** |
| TF 484 | 255,355 us | 37,271 | 6,628 | **6.85×** | **38.5×** |

**원인 추정**:
- INT8 명시 SIMD intrinsics 미사용 mandate 특성 (plain C + gcc -O2)
- PSRAM access overhead (MLP 1024 = 2.17MB이 PSRAM 사용)

**Round 9 후속 검증 결정**: ESP-DSP / ESP-DL dotprod intrinsics 명시 후 재측정 (06_확장측정_계획.md)

### 3.2 AI FanStick mandate 영업 카피 정량화 ⭐ (Stage 4 1,500만 패키지)

마케팅 카피 "MCU급 SLM 추론 1초 안" 정량 검증:
- ✅ MLP 1024 (2.17MB params) = 96ms — **1초의 ~10%**
- ✅ CNN 32 (39KB) = 547ms — **1초 안 ✅**
- ✅ TF 484 (5.87MB) = 255ms — **1초 안 ✅**
- ❌ CNN 64 (115KB) = 2.17초 — 1초 초과 (Xtensa LX7 SIMD 미사용)

**결정**: AI FanStick 차세대 SLM은 **6MB 이하 + 작은 hidden** 사용. Korean-Small 154K (150KB) → 충분 ✅.

### 3.3 Round 6, 7, 8, 9 단일 변수 분리 4축 종합

| Round | 변수 | 영향 |
|:-:|---|:-:|
| 6 | 같은 gcc ARM 세대 (A72→A76) | 1.75× + CNN cache +0.41× |
| 7 | ARMv8 1세대 little vs big (A53→A72) | **3.0~3.8×** |
| 8 | ARMv6 vs ARMv8 + NEON + single | 2.0~2.7× (의외로 작음) |
| 9 ⭐ | Xtensa LX7 plain C ↔ ARM | **9~38× 느림** |

→ ⭐ **ARM 패밀리 안에서 마이크로아키텍처 압도적, Xtensa는 SIMD 미사용 시 ARM 대비 의외 큰 차이**.

## §4 매칭 패턴 발견 ★

### 4.1 위시캣·강사양성과의 시너지 — Stage 4 영업

본 측정 결과로 Stage 4 영업 카피 1차 데이터:
- "1인이 4주에 ESP32-S3 + 12 보드 한계 측정 1장 표 박제" — 강사양성 Day 5 사례
- "MCU에 SLM 가능 / PSRAM 8MB 한계 정량화" — 임베디드 스타트업 컨설팅 패키지
- **위시캣 IoT 공고 매칭**: 임베디드 AI 측정 능력 증명 (포트폴리오)

### 4.2 microGPT 검증과의 시너지

- esp32s3 SRAM 384KB로 microGPT 4K(4.1KB INT8) 적재 가능 — Korean-Small 154K(150KB)도 SRAM 안 ✅
- PSRAM 8MB로 MLP 1024(2.17MB)까지 96ms 측정 — **microGPT 확장형 검증 가능**

### 4.3 ARM 패밀리 6-point sweep 완성

- rpizero(ARMv6) → rpi3(A53) → rpi4(A72) → rpi5(A76) + tablet(A75 clang) + smartphone(A77 clang)
- 단일 vault에서 **8년 ARM 진화 = 46× 속도 차이** 정량화
- **myWiki 활용 후보**: ARM family 진화 학습 자료 (ai-direction.md / on-device-ai.md)

## §5 myWiki/entities/ 갱신 권장

### 5.1 `entities/onDevice-ai.md` 갱신

- 측정 보드 표: 8/13 → **9/13** (esp32s3 메인 타겟 추가)
- 측정 셀: 24/37 → **26/37 (70%)**
- 가설 Round 1~8 → **Round 1~9**
- 핵심 발견: "ARM 패밀리 8년 진화 46×" + "Xtensa LX7 plain C 의외로 느림" + "PSRAM 8MB 한계"

### 5.2 `entities/ai-fanstick.md` 갱신 ⭐

- "기술 근거" 섹션 — ESP32-S3 실측 데이터 추가:
  - microGPT Korean-Small 154K INT8 = 150KB → SRAM 단독 ✅
  - PSRAM 활용 시 MLP 2.17MB까지 96ms 가능 (1초 mandate 충족)
  - **Round 9 후속 검증 진행 시** SIMD intrinsics 사용 후 N× 가속 예상

### 5.3 `entities/uttec-stage-package.md` 갱신

- Stage 4 패키지 기술 카피 1차 데이터 확보 (12 보드 95셀 + esp32s3 메인 타겟)
- "1인 1.5 day 9 보드 측정" 사례 박제

## §6 발신 / 수신 가이드

본 카드 처리 (myWiki 측):
1. §1 entity 4건 신규/갱신 → onDevice-ai.md, ai-fanstick.md
2. §2 gotcha 11건 → gaps.md 카테고리 "Windows ESP-IDF 빌드 함정" + "Pi Zero W setup"
3. §3 decision 3건 → ai-direction.md "Round 9 후속" + "AI FanStick 영업 카피 정량화"
4. §4 매칭 패턴 → thoughts/2026-05-19_esp32s3-stage4-matching.md
5. §5 entity 갱신 — 본 카드 §5 가이드 따름

→ 처리 완료 후 → `processed/` 이동 + `_inbox/pending/`에 `done` 회신 카드 (`from: mywiki-claude`)

## 메타

- 본 세션 commit: a5c84fb (rpi4) → 2dc3cf9 (rpi3) → db617d2 (rpizero) → 693bb81 (esp32s3 ⭐ 메인 타겟)
- 본 vault git push 대기 중 (work-end 단계에서 push)
- 측정 시간 분포: rpi4 ~30분 + rpi3 ~45분 + rpizero ~50분 + esp32s3 ~3시간 (Windows ESP-IDF 빌드 함정 9개 해결 포함)
