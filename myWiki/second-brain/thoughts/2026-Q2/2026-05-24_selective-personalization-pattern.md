---
title: Selective personalization 패턴 — 가장 필요한 사용자가 가장 큰 benefit
type: thought
created: 2026-05-24
updated: 2026-05-24
tags: [thoughts, 2026-Q2, selective-personalization, KWS, R26, UX-결정, ai-fanstick, threshold-기반-자동-trigger, mandate-v2.7, 영업카피]
links: [ai-fanstick, onDevice-ai, uttec-stage-package, ai-direction, 2026-05-24_negative-finding-누적-신뢰성-자산]
---

# Selective personalization 패턴 — 가장 필요한 사용자가 가장 큰 benefit (R26 흡수, 2026-05-24)

## 사건 (5/24 megasession 흡수)

ondevice-claude R26 실제 KWS 데이터 (TensorFlow `mini_speech_commands` 8 keyword × 1,000 sample, 182 MB) 정확도 검증 결과:

- baseline MLP (1024→128→8) hold-out 175 화자 정확도: **78.7%**
- LoRA personalization 5 hyperparameter iteration → sweet spot 발견
- **어려운 화자 (acc<70%) K=5: +11.4% improvement** (max +23.1%, 3/4 화자)
- 카타스트로픽 포겟팅: drift < 1.1% ✅

## ⭐⭐⭐ 신규 finding

> **personalization 은 baseline 잘 작동 사용자에게는 효과 없거나 약간 손해. 못 알아듣는 사용자에게는 +11.4% 개선** — 가장 필요한 사용자가 가장 큰 benefit.

## UX 결정 — AI FanStick 자동 trigger

```
사용자 KWS baseline 측정
  ↓
acc ≥ 70% → personalization 제안 X (효과 없거나 손해)
acc < 70% → "내 목소리로 학습할까요?" 자동 제안
            ↓
사용자 동의 → 5 utterance 수집 → R25 0.37초 LoRA 학습
            ↓
KWS +11.4% improvement (max +23.1%)
```

## 5-tuple hyperparameter sweet spot (R26 측정)

| iteration | LR | alpha | epochs | A_init | rank | 결과 |
|---|---|---|---|---|---|---|
| v1 | 1e-3 | 1.0 | 5 | 0.01 | 4 | 실패 |
| v2 | 1e-3 | 2.0 | 5 | 0.01 | 4 | 실패 |
| v3 | 3e-3 | 1.0 | 5 | 0.01 | 4 | 실패 |
| v4 | 3e-3 | 1.5 | 8 | 0.01 | 4 | 부분 성공 |
| **v5** ⭐ | **3e-3** | **1.5** | **10** | **0.03** | **5** | ✅ +11.4% (어려운 화자) |

→ **sweet spot 매우 좁음** = LoRA hyperparameter 자체가 강사양성 Day 5 / 호오컨설팅 사례 자료 valuable. 외부 회사 임베디드 적용 시 5-tuple 탐색 SOP 필요.

## 가설 판정 종합

| 가설 | 결과 |
|---|:-:|
| H1 (Random K=5 +20%) | ❌ FAIL (-2.7%) |
| **H1' (Difficult K=5 +5%)** ⭐ | ✅ **PASS (+11.4%)** |
| H3 (학습 안정성 < 10%) | ✅ PASS (< 1.1%) |
| H4 (catastrophic forgetting < 5%) | ✅ PASS (< 1.1%) |
| H5 (5 vs 10 utt diff < 5%) | ✅ PASS (0.36%) |

## 일반화 — 일률 적용 mindset 탈피

본 패턴은 KWS 외 영역에도 적용 가능:

| 도메인 | "일률 적용" 함정 | "selective trigger" 패턴 |
|---|---|---|
| KWS personalization (본 케이스) | 전 사용자 학습 강제 = baseline 잘 작동 사용자 손해 | acc <70% 만 학습 trigger |
| ML model fine-tuning | 모든 task fine-tune = 일반화 손실 | task 별 perf gap 측정 → gap >10% 만 fine-tune |
| UI A/B testing | 전 사용자 A 변경 = 활성 사용자 churn 위험 | 신규 사용자 / 낮은 engagement 만 trigger |
| 의료 personalization | 표준 치료 일률 = 개인차 무시 | 표준 무반응 환자만 개인화 |
| 학습 (강사양성) | 일률 강의 = 진도 차이 무시 | baseline 측정 → 낮은 group 만 개인 코칭 |

→ **"selective trigger threshold = 도메인별 측정 후 결정"** 패턴 표준.

## 영업 카피 결정타 (AI FanStick)

> **"baseline 정확도 70% 이상 사용자는 학습 불필요 (효과 없거나 손해) — 어려운 사용자만 +11.4% 자동 학습"** (5/24 신규)

> **"내 목소리 못 알아듣는 사용자에게만 0.37초 즉시 학습 — R25 + R26 결합"**

> **"개인화 = 일률 적용 X, threshold 기반 자동 trigger (R26 검증)"**

## cascade

- [[ai-fanstick]] § Premium Plus 4 tier — R26 selective +11.4% 정확도 carrier
- [[onDevice-ai]] § Round 26 Selective personalization 신규 finding
- [[uttec-stage-package]] § Stage 4 영업 카피
- [[ai-direction]] § 결정 4 — AI FanStick Premium Plus 4 tier 양산 trigger
