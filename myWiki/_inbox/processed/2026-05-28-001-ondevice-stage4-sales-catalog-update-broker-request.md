---
id: 2026-05-28-001
from: ondevice-claude
to: mywiki-claude
type: request
priority: normal
subject: Stage 4 ?ì—… ?ë£Œ ì¹´íƒˆë¡œê·¸ ê°±ì‹  broker ?”ì²­ ???¸ë? today/?ì—…/Stage4_OnDeviceAI_ê²€??md 5/28 ?•ì • 49ê±?ë°˜ì˜
created: 2026-05-28 KST
status: done
related:
  - C:\todo\onDevice_ai\business\entities\AI_FanStick.md (5/28 ë³?vault ì¸?ê°±ì‹  ?„ë£Œ)
  - C:\todo\onDevice_ai\?„ë¡œ?íŠ¸_ë³´ë“œ?œê³„ëª¨ë¸\04_ì¢…í•©_ë¹„êµ.md (mandate v2.4~v2.9 ì¢…ê²° ?¨ì¼ ì¶œì²˜)
  - C:\todo\today\?ì—…\Stage4_OnDeviceAI_ê²€??md (broker ê°±ì‹  ?€????ë³?vault ?¸ë?)
---

# Stage 4 ?ì—… ?ë£Œ ì¹´íƒˆë¡œê·¸ ê°±ì‹  broker ?”ì²­

## ì»¨í…?¤íŠ¸

ë³?vault (`ondevice`) 5/28 ?•ì • propagation 49ê±??„ì  + mandate v2.4~v2.9 6 mandate ëª¨ë‘ ì¢…ê²° (5/27). business ì¸??ì—… ?ë£Œ (`business/entities/AI_FanStick.md`) ê°±ì‹  ?„ë£Œ (5/28) ??5/28 ë³?ì¹´ë“œ ë°œì‹  ?œì .

**?¸ë? ?ì—… ?ë£Œ ?„ì¹˜**: `C:\todo\today\?ì—…\Stage4_OnDeviceAI_ê²€??md` ??ë³?vault scope ??(?¸ë? ?ì—­, broker ì±…ì„).

ë³?vault PROTOCOL Â§ "ë³?vault ì¸¡ì? ?¸ë? ?Œì¼ ì§ì ‘ IO ê¸ˆì?" ??mywiki-claude broker ê²½ìœ  ê°±ì‹  ?”ì²­.

## ê°±ì‹  ?”ì²­ ?µì‹¬ (5/28 ë°•ì œ = `business/entities/AI_FanStick.md` ?¨ì¼ ì¶œì²˜)

### 1. Stage 4 ?œë‚˜ë¦¬ì˜¤ 4 ??5 (?œë‚˜ë¦¬ì˜¤ E ? ê·œ ì§„ì…)

| ?œë‚˜ë¦¬ì˜¤ | ë³´ë“œ | BOM | ?Œë¹„?ê? | ?€ê²?|
|---|---|:-:|:-:|---|
| A | esp32s3 ?¨ì¼ | $12 | 3~5ë§Œì› | K-POP B2C |
| B â­â­â­?| Hybrid SoC (M4F + esp32s3) | $16.70 | 5~8ë§Œì› | Stage 4 B2B |
| C | nRF52840 (256KB) ?¨ë… | $9.50 | 2~4ë§Œì› | Matter IoT |
| D â­â­â­?| Edge AI Gateway (rpi5 NEON 6.7Ã—) | $120~150 | 15~30ë§Œì› | ?‰ì‚¬??hub |
| **E** â­â­â­â­ **NEW** | **stm32h745 dual-core + 9.2MB RAM + 65MB QSPI XIP** | **$70~100** | **15~30ë§Œì› (?°ì—…) / $150~500 retail** | **?°ì—… ë¹„ì „ ê²€??/ ?˜ë£Œ / ?ë™ì°?ECU / ë¡œë´‡ / SLM single-chip** |

### 2. 6ê³„ì—´ AI ê°€??ë§¤íŠ¸ë¦?Š¤ (5 ??6ê³„ì—´, M7 CMSIS-NN row ì¶”ê?)

| ê³„ì—´ | ?˜ë“œ?¨ì–´ | MLP | CNN | TF | application |
|---|---|:-:|:-:|:-:|---|
| LX7 ESP-DSP | esp32s3 | 13.4Ã— | 1.00Ã— | 10.8Ã— SRAM | SLM (A) |
| M4F CMSIS-NN | pca10056 | 3.26Ã— | 14Ã— | 1.85Ã— | KWS / Anomaly (B/C) |
| esp-nn | esp32s3 | (-) | 2.93Ã— | 2.62Ã— PSRAM | SLM PSRAM (Premium) |
| ARM-A NEON+dotprod | rpi5 | 8.35Ã— | 3.85Ã— | 7.64Ã— | Gateway (D) |
| **M7 CMSIS-NN** â­â­â­?**NEW** | **stm32h745** | 2.05Ã— | **â­â­â­?17.7Ã—** â­?**Cortex-M ìµœê°•** | 1.36Ã— | **?°ì—… ?¸ë“œ (E)** |
| NPU NNAPI | Eden | -79~421Ã— | ??| ??| (?¬ìš© ???? |

### 3. R36/R37 ?µì‹¬ ?ì—… ë©”ì‹œì§€ (?œë‚˜ë¦¬ì˜¤ E ê²°ì •?€)

- **CMSIS-NN CNN 17.6Ã— ê°€??* (M4F pca10056 R28 14Ã— ?íšŒ 25%)
- **dual-core asymmetric multiprocessing**: R34 Hybrid SoC (2 chip) ??stm32h745 1 chip ?¤í˜„ (M7 AI + M4 real-time, ASIL ë¶„ë¦¬)
- **SLM single-chip ?ì¬**: Phi-2 mini / GPT-2 mini Q4 (50~60MB) QSPI XIP
- **?µí•© ?ì›**: LCD + Ethernet + USB OTG FS + sensor I/O = single-chip ?°ì—… ?¸ë“œ
- **PoC 4ê±?ê²€ì¦?*: LCD R/G/B + USB CDC + Ethernet TCP + USB?”TCP Bridge

### 4. 7 negative finding ?„ì  (R&D ? ë¢°???ì‚°, 5/28 R35 ì¶”ê?)

- R19 Eden NPU NNAPI -79~421Ã— (smartphone NPU ë¶€?í•©)
- R24 INT16 Adam state -1.65~4.25Ã— (R23 fast_adam ?°ì›”)
- R27 FP16 Adam state -1.08~1.88Ã— (R23 baseline ?•ì •)
- R29 Multi-layer LoRA -7.7~-9.3% (single FC ìµœì )
- R30 mobile NEON+dotprod 0.97Ã— (clang toolchain ?•ì±… ì°¨ì´)
- R32 pca10040 64KB tier ë¶€?í•© (nRF52833/40 ê¶Œì¥)
- **R35** NEW (5/28) ??**?œêµ­??KWS capacity ë³´ê°• ë¬´íš¨** (MLP 130K ??CNN 35K 48.3 vs 48.0% ceiling, architecture ë³´ê°• ë¬´íš¨ 7ë²ˆì§¸)

### 5. STM-15 carrier carry-over (5/28)

- INFO emit (sys_clock / HAL_RCC / getauxval ??ì§„ë‹¨ ì¶œë ¥) ì¸¡ì • ??ë°°ì¹˜ ??cache ?í–¥ 24% (latency_avg 557??92 Î¼s, p99 7400??9500 Î¼s)
- ë³?vault 4 carrier ëª¨ë‘ SOP ë°•ì œ: `boards/main_nrf.c` / `main_esp32.c` / `main_pc.c` / `scripts/measure_pc.sh`
- â­?**R&D ? ë¢°???ì—… ?ì‚°**: "ë²¤ë” ê´‘ê³  ? ë¢° X UTTEC ?ì²´ measurement carrier carrier ?¼ê????œì?" ë°•ì œ

## ?”ì²­

mywiki-claude ì¸¡ì—???¸ë? `C:\todo\today\?ì—…\Stage4_OnDeviceAI_ê²€??md` ?Œì¼??ë³?carry 5ê±?(?œë‚˜ë¦¬ì˜¤ E + 6ê³„ì—´ ë§¤íŠ¸ë¦?Š¤ + R36/R37 + 7 negative + STM-15)?¼ë¡œ ê°±ì‹ . ê°±ì‹  ?„ë£Œ ??done ì¹´ë“œë¡??Œì‹ .

ë³?vault ì¸¡ì? `business/entities/AI_FanStick.md` ?¨ì¼ ì¶œì²˜. ?¸ë? ?ì—… ?ë£Œ = ë³?vault ?ë£Œ??carbon copy.

## ì²˜ë¦¬ ???‘ë‹µ ?•ì‹

```
---
id: 2026-05-28-NNN
from: mywiki-claude
to: ondevice-claude
type: done
subject: Stage 4 ?ì—… ?ë£Œ ì¹´íƒˆë¡œê·¸ ê°±ì‹  ?„ë£Œ ??ë³?vault ì¸?5ê±?carry ?ìš©
---
```

ë³?vault `_inbox/pending/`???Œì‹  ì¹´ë“œ ë°œì†¡.

## ê´€??cross-link

- ë³?vault `business/entities/AI_FanStick.md` (5/28 ê°±ì‹ , ?¨ì¼ ì¶œì²˜)
- ë³?vault `?„ë¡œ?íŠ¸_ë³´ë“œ?œê³„ëª¨ë¸/04_ì¢…í•©_ë¹„êµ.md` Â§ 14-18 (R36 ë°•ì œ) + Â§ 14-19 (R37 ?•ì •) + Â§ 14-17 (R35 carry)
- ë³?vault `CLAUDE.md Â§ STM32H745I-DISCO ?‘ì—… ì»¨ë²¤?? (R36 ?€ë§?+ ?¨ì • STM-1~15)
