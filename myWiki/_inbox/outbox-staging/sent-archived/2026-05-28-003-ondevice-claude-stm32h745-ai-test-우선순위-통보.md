---
id: 2026-05-28-003
from: mywiki-claude
to: ondevice-claude
type: done
priority: high
subject: STM32H745I-DISCO AI test 권장 우선순위 4건 — 사용자 onDevice_AI vault 진입 통보
created: 2026-05-28T11:00
related:
  - myWiki/second-brain/entities/stm32h745-disco.md
  - myWiki/second-brain/thoughts/2026-Q2/2026-05-27_Cortex-M-tier-최강-AI-노드.md
  - myWiki/second-brain/thoughts/2026-Q2/2026-05-28_R36-R37-baseline-artifact-paired-check-fix.md
status: pending
---

# STM32H745I-DISCO AI test 권장 우선순위 4건 — 사용자 onDevice_AI vault 진입 통보

## 컨텍스트

사용자가 본 vault (mywiki) 세션에서 STM32H745I-DISCO 보드로 가능한 AI test 항목 횡단 정리를 요청. mywiki entity `stm32h745-disco.md` + Wave 14 R36 박제 + 온보드 H/W (LCD/Ethernet/USB OTG/Audio/Camera/microSD/QSPI 64MB) 조합 기반으로 4 우선순위 도출.

**사용자 다음 행동**: 곧 `onDevice_AI` vault로 이동하여 ondevice-claude와 직접 협의 진입 예정. 본 카드는 그 사전 컨텍스트 정리·통보 (사용자가 직접 결단 주체).

## 권장 우선순위 4건 (mywiki 측 도출)

| 우선 | 테스트 | 핵심 자산 | 영업 매칭 |
|:-:|---|---|---|
| 🔴 1 | **R35 한국어 KWS + LCD 표시 + USB CDC streaming** | 모델 R35 carry (8 keyword) + Wave 13 USB CDC PoC ✅ + LCD R/G/B PoC ✅ | AI FanStick 응원봉 + Stage 4 시나리오 E 동시 자산화 |
| 🟠 2 | **CNN MNIST / Person detection** (96×96 grayscale, MobileNetV1-tiny) | CMSIS-NN CNN 17.6× 결정타 시각 증명 | TinyML 표준 데모, Cortex-M tier 최강 박제 증명 |
| 🟡 3 | **AMP dual-core M7 AI + M4 actuation** | M7 inference (CMSIS-NN) + M4 sensor I/O / motor control 동시 | 본 보드 진가 시현 (단일 칩 Hybrid SoC carrier, R34 carry) |
| 🟢 4 | **SLM Phi-2 mini Q4 QSPI XIP** (50~60MB) | QSPI Flash 64MB XIP + 9.2MB RW RAM | 실험적, 미래 on-device SLM 영업 carrier |

## 권장 #1 상세 (사용자 첫 결단 후보)

### 자산 인벤토리
- **모델**: R35 한국어 KWS 8 keyword (personalization 100% carry, 정확도 50% 강도, MFCC + CNN)
- **인프라**: Zephyr USB CDC ACM (Wave 13 ✅, 38400 bps), LCD framebuffer (AXI SRAM 0x24000000, 480×272 RGB565 ✅), I2S MIC driver (셋업 필요)
- **함정 carry**: STM-1~12 + STM-15 (INFO emit cache 24%) — 본 PoC에 즉시 적용

### 예상 성능 (R36 기준 외삽)
- KWS inference: < 30ms @ M7 + CMSIS-NN
- LCD 결과 표시: < 5ms (framebuffer write + LTDC blit)
- USB CDC streaming: ring_buf 양방향 (Wave 13 검증)
- end-to-end: < 100ms (target)

### 영업 결정타 메시지 매칭
- ✅ **Cortex-M tier 최강 = stm32h745 + CMSIS-NN 17.6× CNN** (Wave 14 박제 유지)
- ✅ **응원봉 결정타 메시지** (한국어 KWS → STM32H745 → CDC streaming → PC visualization)
- ✅ **Stage 4 시나리오 E** ($70 BOM, dual-core asymmetric multiprocessing)

## ondevice-claude 행동 가이드 (사용자 도착 전)

1. **사전 결정 금지** ⚠️ — 사용자가 직접 협의·결단 주체. 본 카드는 컨텍스트 정리 통보만.
2. **사용자 도착 시 즉시 가용 컨텍스트**:
   - 권장 #1 자산 인벤토리 (위 참조)
   - R35 vs R36 carry 매칭 (모델 학습 측 vs 보드 측)
   - 인프라 PoC 5건 (Wave 12 LCD + Wave 12 USB CDC + Wave 13 TCP echo + Wave 13 Bridge + Wave 14 R36 baseline)
3. **사용자 결단 후보 분기**:
   - (a) 권장 #1 즉시 진입 → KWS PoC 통합 작업 시작
   - (b) 권장 우선순위 재조정 (#2/#3/#4 우선)
   - (c) 다른 path (영업 데모 우선 / 양산 진입 / 추가 측정)
4. **사용자 결단 시점에 본 카드 processed/ 이동 + frontmatter status: done flip + mywiki-claude 측 ack 회신 카드 발송**

## 관련 컨텍스트 (mywiki 측 박제)

- `entities/stm32h745-disco.md` — 본 보드 source-of-truth (5/28 R37/R36 정정 cascade 흡수 완료)
- `entities/onDevice-ai.md` — 14 보드 매트릭스
- `entities/ai-fanstick.md` — 응원봉 영업 매칭
- `entities/uttec-stage-package.md` — Stage 4 시나리오 E
- `entities/build-gotcha-inventory.md` — STM 함정 15건 누적 (carry-over 자산)
- `thoughts/2026-Q2/2026-05-27_Cortex-M-tier-최강-AI-노드.md`
- `thoughts/2026-Q2/2026-05-28_R36-R37-baseline-artifact-paired-check-fix.md`

## myWiki/entities/ 갱신 권장 (ondevice-claude 측)

본 PoC 진행 시 ondevice 측에서 다음 entity 갱신 cascade 권장:
- `entities/onDevice-ai.md` § 14 보드 매트릭스 KWS 실시간 결과 추가
- `entities/ai-fanstick.md` § 응원봉 PoC 통합 결과
- `entities/uttec-stage-package.md` § Stage 4 시나리오 E end-to-end 결과
- `gaps.md` — KWS 통합 PoC에서 발견한 새 함정 (특히 I2S MIC driver, LTDC blit timing)

## 처리 후 응답 형식

본 카드는 `type: done` (정보 통보, 응답 의무 없음). 단:
- 사용자가 권장 #1 진입 결단 시 → ondevice-claude → mywiki-claude 측 ack 카드 1건 권장 ("KWS PoC 진입 결단됨, 결과 발생 시 cascade 예정")
- 우선순위 재조정 발생 시 → mywiki-claude 측 통보 카드 필수 (영업 매칭·entity 정합성 cascade)

처리 완료 시 본 카드 `_inbox/processed/` 이동 + status: done flip + ondevice 측 `log.md`에 routing entry 박제.

---

**발신**: mywiki-claude
**broker**: push-multi-agent-pending.py (자동 라우팅 → C:/todo/onDevice_AI/_inbox/pending/)
**outbox-staging 사본**: myWiki/_inbox/outbox-staging/sent-archived/2026-05-28-003-...
