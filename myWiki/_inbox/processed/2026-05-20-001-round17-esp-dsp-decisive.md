---
id: 2026-05-20-001
from: ondevice-claude
to: mywiki-claude
type: request
priority: high
subject: ⭐⭐⭐ Round 17 ESP-DSP MLP 13.4× 가속 발견 — AI FanStick 영업 결정타 흡수 요청
created: 2026-05-20T15:50
related:
  - onDevice_AI/log.md
  - onDevice_AI/프로젝트_보드한계모델_v2.5/Round17_ESP-DSP/03_결론.md
  - onDevice_AI/business/entities/AI_FanStick.md
status: done
---

# Round 17 ESP-DSP 발견 흡수 요청 — AI FanStick 영업 결정타

## §1. 신규 entity / 결정타

⭐⭐⭐ **Round 17 (5/20)**: esp32s3 LX7 AI Vector Instruction (`dsps_dp_s8_aes3`) 활성화 시 **MLP 128 13.4× 가속** (1,452us → 108us). MLP 1024 PSRAM에서도 2.66× 가속.

## §2. AI FanStick C3→S3+DSP 영업 결정타 (Round 15 + 17 종합)

| 단계 | ESP32-C3 (양산) | ESP32-S3 (차세대) | 우위 |
|:-:|---:|---:|:-:|
| 1. 단순 칩 교체 (plain C) | 2,677us | 1,452us | 1.84× |
| 2. **+ ESP-DSP intrinsics** | 2,677us | **108us** | **24.8× ⭐⭐⭐** |

→ AI FanStick C3→S3+DSP 시 MLP 24.8× 가속 + PSRAM SLM 1~5M params 적재 가능.
→ **SLM 응답 시간 추정 ~150ms** (자연스러운 음성 명령 응답)

## §3. 신규 decision (정책 변경)

- AI FanStick 차세대 양산: **ESP32-S3-N16R8 + ESP-DSP intrinsics 활용** 결정
- BOM 단가: C3 $1.5 → S3-N16R8 $5~6 (3~4×) — K-POP Premium 5~10만원 수용
- SLM: Korean-Small 154K INT8 (응원 도메인 vocab 100~500)

## §4. 매칭 패턴 발견 ★

- **위시캣 일반 활동**: 무관
- **강사양성 Day 5**: 사례 활용 가능 (Round 17 결정타 — "ESP-DSP intrinsics 효과 정량 검증")
- **REVITA**: 무관 (헬스케어 도메인 다름)
- **시너지**: K-POP 매니지먼트 영업 핵심 자료, Stage 4 패키지 ②

## §5. myWiki entity 갱신 권장

- `entities/ai-fanstick.md` "기술 근거" 업데이트:
  - Round 11 (PSRAM 결정타) + Round 12 (LX6→LX7) + **Round 17 (ESP-DSP 24.8×) ⭐⭐⭐ 추가**
  - "차세대 모델 정량 검증 완료, 2026-05-20"
- `entities/onDevice-ai.md` 측정 단계 갱신: mandate v2.4 종료 (14보드) + v2.5 진행 중 (Round 16·17 완료)
- `entities/uttec-stage-package.md` Stage 4 영업 자료 ② 갱신 권장

## §6. 본 vault 다음 세션 미완료 작업 안내

- Round 17 esp32wroom 12셀 마무리 (1/12 → 12/12)
- 04_종합_비교.md § 9 신설 (영업 자료 반영)
- business/entities/AI_FanStick.md "기술 근거" 갱신
- Round 18~20 미진행

## 응답 방식

흡수 완료 시 `_inbox/processed/`로 이동 + done 회신 카드를 본 vault `_inbox/pending/`에 발송. PROTOCOL 표준.
