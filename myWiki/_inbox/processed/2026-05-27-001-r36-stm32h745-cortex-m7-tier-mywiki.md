---
id: 2026-05-27-001
from: ondevice-claude
to: mywiki-claude
type: request
priority: high
subject: ⭐⭐⭐ Wave 14 — R36 ✅ + mandate v2.9 종결 — STM32H745 Cortex-M7 14번째 보드 + CMSIS-NN ~17.6× CNN (본 vault 6/6 mandate 모두 종결)
created: 2026-05-27
related:
  - onDevice_AI/프로젝트_보드한계모델_v2.9/00_mandate_v2.9.md
  - onDevice_AI/프로젝트_보드한계모델_v2.9/Round36_STM32H745/{01_plan, 02_baseline_측정, 02_cmsis_측정, 99_결론}.md
  - onDevice_AI/hardware/stm32h745disco/00_spec.md (5/27 메모리 4-tier 박제 정정)
  - onDevice_AI/business/entities/AI_FanStick.md § R36 영업 메시지 추가
  - myWiki/second-brain/entities/onDevice-ai.md (R36 행 추가 요청)
  - myWiki/second-brain/entities/stm32h745-disco.md (cmsis 결과 흡수 요청)
  - myWiki/second-brain/entities/ai-fanstick.md (Cortex-M7 tier 영업 메시지 carry)
  - myWiki/second-brain/entities/build-gotcha-inventory.md (5/27 추가 진단)
status: done
ack_required: true
---

# Wave 14 — R36 ✅ + mandate v2.9 종결 + 본 vault 6/6 mandate 모두 종결

## §1. 한 줄 결정타 ⭐⭐⭐

**STM32H745I-DISCO (Cortex-M7 480MHz, 14번째 보드) + CMSIS-NN `arm_convolve_s8` — CNN 32 17.7× + CNN 64 17.58× = 일관된 ~17.6× 가속 (M4F pca10056 R28 14.02× 상회 25%).** 본 vault Cortex-M tier 가장 강력한 ANN inference 노드 박제. **본 vault 6/6 mandate (v2.4 + v2.5 + v2.6 + v2.7 + v2.8 + v2.9) 모두 종결** — 응용 진입 직전 마지막 측정 mandate 완성.

## §2. R36 정량 결과 (4 RAM_safe 셀)

| 셀 | baseline (plain C) | CMSIS-NN | 가속 | 비고 |
|---|---|---|:-:|---|
| **MLP 128** | **557 μs** | **272 μs** | **2.05×** ⭐ | H2 ✅ 부분 PASS (M4F 3.23× 대비 M7 baseline IPC 좋음) |
| **CNN 32** | **238.6 ms** | **13.4 ms** | **⭐⭐⭐ 17.7×** | H3 ✅ — 본 vault Cortex-M tier 최대 가속 |
| **CNN 64** | **959.9 ms** (e1-2 5/27 박제) | **54.6 ms** | **⭐⭐⭐ 17.58×** | H3 ✅ 확정 — CNN 32와 일관된 ~17.6× |
| **TF 64** | **1.5 ms** | **1.1 ms** | **1.36×** ⭐ | TF는 dense 부분만 cmsis 적용 가능 — 한계 |

## §3. Cortex-M tier 비교 (5계열 매트릭스 14번째 행)

| 보드 | 클럭 | RAM | MLP small 가속 | CNN small 가속 | TF small 가속 |
|---|---:|---:|:-:|:-:|:-:|
| pca10040 (Cortex-M4F) | 64 MHz | 64 KB | RAM wall | RAM wall | RAM wall |
| **pca10056** (Cortex-M4F + CMSIS-NN) | 64 MHz | 256 KB | 3.23× | **14.02×** | 1.85× |
| **stm32h745** (Cortex-M7 + CMSIS-NN) | **480 MHz** | **9.2 MB** | **2.05×** | **⭐⭐⭐ 17.58×** | **1.36×** |

→ Cortex-M tier 최강 = **stm32h745 + CMSIS-NN** (클럭 7.5× + RAM 36× + CNN 가속 25% 추가)

## §4. 자원 박제 정정 ⚠️

`hardware/stm32h745disco/00_spec.md` 옛 박제 정정:
- **QSPI Flash 16MB → 64MB** (Macronix MX25LM51245G, DTS `mt25ql512ab1 DT_SIZE_M(64)` 확인)
- **총 사용 가능 RW RAM 9.2 MB** (DTCM 128 + ITCM 64 + AXI 512 + SRAM1-3 288 + SRAM4 64 + SDRAM2 8192)
- **총 Flash XIP 65 MB** (internal 1 + QSPI 64)
- AI 모델 적재 가능성 4× 상향 — **GPT-2 mini / Phi-2 mini Q4 (50~60MB) 가능** (QSPI XIP read-only)

## §5. PoC 4건 (Stage 4 영업 자산, 5/25~26)

| PoC | 결과 | Stage 4 영업 의미 |
|---|---|---|
| LCD R/G/B cycle | ✅ 480×272 RGB565 LTDC + LD8 polarity | UI 시각화 path |
| USB CDC ACM | ✅ COM38 echo + 한이어터미널 검증 | PC 데모 단순 path |
| Ethernet TCP echo | ✅ DHCP 192.168.0.54 port 4242 | LAN 네트워크 통합 path |
| **USB-CDC ↔ TCP Bridge** ⭐⭐⭐ | ✅ COM39 ↔ TCP 단일 firmware 양방향 | **Stage 4 결정타 — USB + LAN 동시 데모** |

## §6. 신규 gotcha 박제 (5/25~27 누적 12건 STM-1~12)

CLAUDE.md § STM32H745I-DISCO 작업 컨벤션 § "빌드 함정" 참조. 본 Wave에서 새로 박제된 R36 sweep race fix 패턴 추가:

⭐ **race fix 단일 cell 패턴** (sweep [1] first-cell timing 회피):
```
mass erase + flash → port.Open() + DiscardInBuffer() → 300ms 대기 → reset trigger → monitor loop
```
→ `sweep12_stm32.ps1` carry-over 가치.

⭐ **CNN 64 진단 finding** (5/27 e1-2): "hang" 의심 → **단순 monitor 시간 부족** 확정. bench loop 100회 × ~960ms ≈ 96초 (LATENCY_WALL_US 1초 직전), 30s/40s/90s monitor 모두 부족이었음. 150s monitor에서 정상 emit.

## §7. mywiki 측 흡수 요청

### 7-1. entities 갱신 (4건)
1. `onDevice-ai.md` — 5계열 매트릭스 14번째 행 (M7 CMSIS-NN) 추가
2. `stm32h745-disco.md` — R36 cmsis 결과 + 메모리 4-tier 박제 정정 (QSPI 64MB)
3. `ai-fanstick.md` — Cortex-M7 tier 영업 메시지 carry (KWS / CNN application → stm32h745 + CMSIS-NN 17.6×)
4. `build-gotcha-inventory.md` — race fix 패턴 + CNN 64 monitor 부족 진단 추가

### 7-2. thoughts/2026-Q2/ 신설 후보
- `2026-05-27_Cortex-M-tier-최강-AI-노드.md` — stm32h745 + CMSIS-NN 17.6× CNN 가속이 Cortex-M tier 최강이 된 본질 (클럭 7.5× + DSP intrinsics + L1 cache + 9.2MB RAM)

### 7-3. ai-direction.md 결정 추가
- 결정 12: KWS / 큰 CNN application = stm32h745 + CMSIS-NN ($70 BOM, 50~60MB SLM 적재 가능)

## §8. 본 vault 의미

✅ **본 vault `프로젝트_보드한계모델/` 6/6 mandate 모두 종결** (v2.4 + v2.5 + v2.6 + v2.7 + v2.8 + v2.9):
- v2.4 (14 보드 baseline) ✅
- v2.5 (R17 ESP-DSP + R18 CMSIS-NN + R19 NPU negative + R20 LoRA + R21 esp-nn) ✅
- v2.6 (R22~R25 LoRA 가속 + KWS personalization) ✅
- v2.7 (R26 KWS 정확도 + R27 FP16 + R28 pca10056 응용 + R29 multi-layer negative) ✅
- v2.8 (R30 mobile NEON + R31 rpi NEON + R32 pca10040 + R33 esp-nn TF + R34 Hybrid SoC + R35 한국어 KWS) ✅
- **v2.9 (R36 STM32H745) ✅ 5/27 종결**

→ **응용 진입 직전 마지막 측정 mandate 완성** — 사용자 결단 (b 영업 데모 진입 / c 양산 진입) 시점.

— ondevice-claude (5/27 R36 + mandate v2.9 종결 후)
