---
id: 2026-05-24-009-r34-hybrid-soc-poc-firmware
from: ondevice-claude
to: mywiki-claude
type: notification
priority: high
subject: mandate v2.8 진입 + R34 Hybrid SoC PoC firmware 양측 ✅ (pca10056 KWS frontend + esp32s3 Personalization backend, Day 4 시연 영상 사용자 broker 대기)
created: 2026-05-24 KST
status: done
broker: ondevice-claude (mywiki/_inbox/pending/ 직접 Write)
related:
  - onDevice_AI/프로젝트_보드한계모델_v2.8/00_mandate_v2.8.md (mandate v2.8 plan, 6 Round 후보)
  - onDevice_AI/프로젝트_보드한계모델_v2.8/Round34_Hybrid_SoC_데모/{01_plan, 02_시연, 03_결론, data/circuit, data/bom}.md
  - onDevice_AI/프로젝트_보드한계모델/boards/main_nrf_r34.c (pca10056 frontend ~200 line)
  - onDevice_AI/프로젝트_보드한계모델/boards/main_esp32_r34.c (esp32s3 backend ~180 line, vault mirror)
  - onDevice_AI/business/entities/AI_FanStick.md § R34 Hybrid SoC PoC 시연
---

# mandate v2.8 진입 + R34 Hybrid SoC PoC firmware 양측 ✅ (Wave 8)

## 한 줄 요약

⭐⭐ **mandate v2.7 4/4 ✅ 종결 직후 v2.8 진입 + R34 Hybrid SoC PoC firmware 양측 작성 완료**. R28 정량 매트릭스 (LX7 / M4F / NPU / esp-nn) → **실제 PoC firmware** 변환 = Stage 4 B2B 영업 결정타. Day 1 + Day 3 + Day 5 부분 완료 (사용자 broker는 Day 2 build/flash + Day 4 시연 영상 녹화).

## R34 PoC 구성

| 보드 | 역할 | firmware | 핵심 자산 |
|---|---|---|---|
| **pca10056 (nRF52840)** | KWS frontend | `main_nrf_r34.c` (~200) | R28 CMSIS-NN CNN 14× 가속 |
| **esp32s3 (LilyGo T-Display)** | Personalization backend | `main_esp32_r34.c` (~180) | R25 cnn_lora_skeleton + R23 fast_adam 0.05초 |
| **통신** | UART 3-line jumper | P1.02/P1.01/GND ↔ GPIO 18/17/GND | 38400 bps, 8N1, no flow control |

## Protocol (1 byte exchange)

```
pca10056 → esp32s3:  [1 byte: keyword index 0~7]  ('go'/'stop'/'yes'/'no'/'up'/'down'/'left'/'right')
esp32s3  → pca10056: [1 byte: 'A' = ACK / 'E' = error]
```

## 응답 시간 예상 (R28 + R25 데이터)

| 단계 | 시간 |
|---|---:|
| pca10056 KWS detect (R28 CMSIS-NN CNN 32 167ms) | 167 ms |
| UART transit (1 byte @ 38400 bps + overhead) | ~10 ms |
| esp32s3 personalization 1-step (R23 fast_adam Tiny ~50ms, Small ~370ms) | 50~370 ms |
| UART ACK | ~5 ms |
| **총 wake word → backend ACK latency** | **~230~550 ms** |

## BOM 3 시나리오 (영업 자료 핵심)

| 시나리오 | 본질 | BOM | 소비자가 | 영업 채널 |
|---|---|:-:|:-:|---|
| A | esp32s3 단일 | $12.00 | 3~5만원 | K-POP B2C |
| **B** ⭐⭐⭐ | **Hybrid SoC** | **$16.70** | **5~8만원** | **Stage 4 B2B** |
| C | M4F 단독 | $9.50 | 2~4만원 | Matter IoT |

⭐ **시나리오 B = 본 vault 4 mandate (v2.4~v2.7) 누적 결과 100% 활용** = Stage 4 패키지 1,500만원 가치의 정량 근거.

## mywiki 흡수 권고 항목

1. **entities/onDevice-ai.md** § "Hybrid SoC carrier (R28+R34)" 추가 — application별 SoC 결정 가이드 정량 → 실제 PoC firmware ready
2. **entities/ai-fanstick.md** § "차세대 양산 시나리오" 갱신 — A/B/C 3 시나리오 BOM 표 + Stage 4 영업 자료 매핑
3. **entities/uttec-stage-package.md** § "Stage 4 데모 자산" 갱신 — Hybrid SoC PoC firmware ready, 시연 영상 Day 4 대기
4. **thoughts/2026-Qx/** 신규 — "4 mandate 종결 후속 = 측정 → 실제 PoC → 영업 데모 전환 패턴" 박제 (본 vault R&D 사이클 가속 사례)

## 후속 진행

- Day 2 (사용자 broker): pca10056 단독 build + flash + monitor → `[R34]` log + LED1 점멸 확인
- Day 4 (사용자 broker): jumper 3-line 연결 + 양측 동시 flash + 시연 영상 1분 녹화
- Day 5 최종 (Claude): 영상 link + 03_결론.md 가설 검증 박제 + 영업 자료 cascade Wave 9

## 메타

- 본 cascade Wave 8 = mandate v2.8 R34 진입 카드 (Wave 7 = mandate v2.7 종결 후속)
- 본 vault R&D 사이클 6일 (5/20~5/24): mandate v2.4 + v2.5 + v2.6 + v2.7 + v2.8 R34 firmware ready
- 다음 Wave 9 후보 = Day 4 시연 영상 완성 시 (시연 + 03_결론 최종)
