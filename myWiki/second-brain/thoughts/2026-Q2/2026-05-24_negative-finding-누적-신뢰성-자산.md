---
title: negative finding 누적 = R&D 신뢰성 자산 (5건 박제, R23 양산 확정 4 대안 측정 검증)
type: thought
created: 2026-05-24
updated: 2026-05-24
tags: [thoughts, 2026-Q2, negative-finding, R&D-신뢰성, vendor-광고-신뢰X, 측정자산화, mandate-v2.7-종결, R23-fast-adam, governance-신뢰성, 영업카피]
links: [onDevice-ai, ai-fanstick, uttec-stage-package, ai-direction, build-gotcha-inventory, 2026-05-22_npu-vendor-광고-실측-격차, 2026-05-24_application별-SoC-결정-Hybrid-SoC]
---

# negative finding 누적 = R&D 신뢰성 자산 (mandate v2.7 종결, 2026-05-24)

## 사건 (5/24 megasession 흡수)

mandate v2.7 4/4 ✅ 100% 종결 시점에서 negative finding 5건 누적 박제. **R23 fast_adam 양산 결정이 4 대안 (NPU/INT16/Multi-layer LoRA/FP16) 모두 실측 비교 후 도출** = "vendor 광고 신뢰 X, 자체 측정 자산화" R&D 신뢰성 자산화.

## 5 negative finding 매트릭스

| Round | finding | 측정 cell | application 의미 |
|---|---|:-:|---|
| **R19** (5/22) | Eden NPU NNAPI -79~421× 느림 | 5 cell | Samsung 2.1 TOPS 광고 vs 실측 격차 — smartphone NPU 비효율 |
| **R24** (5/24) | INT16 Adam state dynamic scale -1.65~4.25× 느림 | 9 cell | esp32s3 FP32 division (~10 cycles/elem) × 2 division/elem requantize = ~20 cycles → R23 회피한 비용 재도입 |
| **R27** (5/24) | FP16 Adam state R23 미달 -1.08~1.88× 느림 | 8/9 cell | FP16↔FP32 conversion overhead adam phase 단독 — but R24 negative 우월 대안 입증 (1.37~2.25× 빠름) + RAM 50% 절감 carrier |
| **R29** (5/24) | Multi-layer LoRA (마지막 + intermediate fc) -7.7~-9.3% | K=5 | 표현력 trade-off 부정적 — single LoRA 우월 |
| **R28** (5/24) | TF 1.85×만 (attn_causal argmax 비가속) | 추정 | MLP 14× / CNN 14× 대비 절반 — argmax 자체가 SIMD 비호환 |

## 핵심 인사이트 — R23 채택 결정의 신뢰성

**R23 fast_adam 양산 결정 = 4 대안 측정 비교 후 도출** (vendor 광고 만 본 즉결 X):

```
양산 후보 R23 fast_adam (Tiny 0.05초)
  ↓ 검증
대안 1: NPU 시도 (R19) → -79~421× ❌
대안 2: INT16 Adam 시도 (R24) → -1.65~4.25× ❌ (RAM 50% 절감 carrier 무효)
대안 3: FP16 Adam 시도 (R27) → -1.08~1.88× ❌ (R23 우월 확정)
대안 4: Multi-layer LoRA 시도 (R29) → -7.7~9.3% 정확도 ❌
  ↓ 결론
R23 fast_adam baseline 우월 = 양산 확정 ✅
```

→ 4 대안 측정 비용 ~3일 + 26+ cell 측정. but **양산 결정의 신뢰성 확보** = 외부 회사 도입 시 "왜 R23 인가?" 정량 답변 가능.

## 영업 카피 결정타 (Stage 4)

> **"vendor 광고 신뢰 X — UTTEC 자체 측정 자산 (Round 17·18·19·24·27·28·29) 기반 양산 결정"** (5/24 신규)

> **"R23 fast_adam 양산 = 4 대안 measurement 비교 후 도출"**

> **"NPU/INT16/FP16/Multi-layer LoRA 모두 negative — vendor TOPS 광고는 best-case, application class 사전 확인 SOP 필수"**

## 일반화 — negative finding 박제 = R&D 문화 입증

본 5건은 단일 사례가 아닌 **R&D 문화 패턴**:

| 차원 | "양산 결정 즉결" 함정 | "negative finding 박제" 패턴 |
|---|---|---|
| 시간 비용 | 0~1일 (즉결) | ~3일 (4 대안 측정) |
| 양산 결정 신뢰성 | 낮음 (vendor 광고 의존) | 높음 (자체 측정 입증) |
| 외부 회사 도입 시 답변 | "vendor 가 그렇다고 했어요" | "이 measurement Round 에서 입증했습니다" |
| 후속 함정 발견 시 | 양산 후 발견 = 손실 大 | 양산 전 발견 = 비용 0 |
| governance 인상 | "광고에 휘둘림" | "측정 자산화 R&D 문화" |

→ **R&D 문화의 정성적 자산 = negative finding 5건 + 측정 cycle 박제**.

## 추가 패턴 — "Adam 이 너무 빨라 그림자 사라짐" (R25 의외 결과)

R25 측정 결과 **CNN forward 92~99% dominant → LoRA fine-tune 1~8% only** = "사실상 무료" 신규 finding.

- 이유: R23 fast_adam 가속 (3.94×) 후 Adam phase 가 너무 빨라서 forward (esp-nn 가속) 가 dominant 가 됨
- 의미: R23 fast_adam 의 가치가 **재확인** 됨 (Adam 자체 가속 + LoRA fine-tune 비용 미미화)
- 영업 카피: "**0.37초에 KWS personalization** — CNN forward 92~99% dominant 라 LoRA fine-tune 비용 거의 0"

## 함정 #14 v3 진단 정정 = 자체 검증 사이클 모범

5/24 R27 sweep 3차 시도 (~3시간) 에서 **함정 #14 v3 진단 정정** 발견:

- **5/21~24 잘못된 진단**: "Claude Code harness 가 ninja → cmd chain 의 cwd reset"
- **5/24 진짜 원인**: ESP-IDF/cmake 3.30/Windows cmd.exe 의 `cmd /C "cd . && tool ... && cd ."` 패턴 cwd 보존 결함 — 일반 PowerShell 에서도 동일 fail
- **이전 sweep 통과 이유**: build dir cache 로 매 cell incremental → ar/ranlib 안 호출. fresh state 시 노출

→ Claude 자기 가설 검증 + 정정 박제 = governance 패턴 모범. 자세히 [[build-gotcha-inventory]] § 자기 진단 정정 사이클.

## cascade

- [[ai-fanstick]] § R23 fast_adam 양산 확정 4 negative finding 측정 검증
- [[uttec-stage-package]] § Stage 4 영업 카피 "vendor 광고 신뢰 X, 자체 측정 자산화"
- [[onDevice-ai]] § 5 negative finding 누적
- [[build-gotcha-inventory]] — 빌드 함정 34건 + 함정 #14 v3 진단 정정 사이클
- [[2026-05-22_npu-vendor-광고-실측-격차]] — R19 첫 케이스 (NPU vendor 광고)
- [[ai-direction]] § 결정 5 — 5 negative finding 누적
