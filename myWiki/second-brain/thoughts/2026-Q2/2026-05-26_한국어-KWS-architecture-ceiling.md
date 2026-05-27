---
title: 한국어 KWS architecture 보강 무효 = 본질 한계 finding (R35)
type: thought
created: 2026-05-26
updated: 2026-05-27
tags: [thought, KWS, 한국어, architecture-ceiling, MLP, CNN, capacity-보강-무효, carrier-부분-carry-over, KsponSpeech, R35, R26-영어-비교, mandate-v2.8-종결]
links: [onDevice-ai, ai-fanstick, build-gotcha-inventory, ai-direction, 2026-05-24_application별-SoC-결정-Hybrid-SoC, 2026-05-27_Cortex-M-tier-최강-AI-노드]
---

# 한국어 KWS architecture 보강 무효 = 본질 한계 finding (R35)

## 한 줄

**MLP 130K parameter vs CNN 35K parameter — 4× capacity 차이에도 한국어 KWS baseline 동일 (48.0 vs 48.3%, -0.3%p) = 한국어 KWS는 architecture/capacity 보강으로 극복 불가능한 ceiling 존재.** R26 영어 78.7% baseline의 carry-over 가설을 정량 검증으로 무너뜨림. 한국어 KWS 본질 한계는 **데이터/task 본질** (KsponSpeech 일반 대화 vs KWS-specific 녹음 차이 + 53× 불균형 + alignment 정확도)에서 비롯됨. capacity 보강은 자원만 소진하고 효과 없음.

## 정량 매트릭스

| 모델 | parameter | test 정확도 | 가설 H1 (≥70%) |
|---|---:|---:|:-:|
| MLP (R26 carry, 130K) | 130,000 | **48.3%** | ❌ FAIL |
| CNN (R25 carry, 35K) | 35,000 | **48.0%** | ❌ FAIL |
| 차이 | 4× | -0.3%p | (동일) |

→ 영어 78.7% baseline 대비 **-30%p ceiling gap** = 본질 한계 정량.

## 영어 vs 한국어 carrier carry-over 매트릭스 (Wave 14 정리)

| carrier | 영어 (R26) | 한국어 (R35) | carry 강도 |
|---|---:|---:|:-:|
| baseline 정확도 | 78.7% | **48.0~48.3%** | **부분 (60% 강도)** |
| LoRA K=5 +정확도 | +11.4% | **+5.38%** | **부분 (50% 강도)** |
| LoRA K=10 +정확도 | (미측정) | **+6.60%** | (부분) |
| esp32s3 personalization total | 0.37초 (architecture identity) | **0.37초** | **완전 (100% carry)** |
| esp32s3 inference | (미측정) | 52.9ms (H4 학술 FAIL) | (carry) |
| capacity 보강 효과 | (미검증) | **0 (무효)** | **본질 한계 확정** |

→ carrier 종류별 carry 강도 분기:
- **architecture identity carrier** (esp32s3 latency) = **완전 carry** (100%)
- **task 의존 carrier** (정확도, LoRA 향상폭) = **부분 carry** (50~60%)
- **capacity 보강** = **무효** (본질 한계)

## 본질 한계 원인 (가설, mandate v2.9 검증 대상)

### 1. 데이터 본질 차이 (가장 유력)

- **R26 영어**: mini_speech_commands = KWS-specific 녹음 (Google "Speech Commands" dataset, 발음·녹음 환경 통제)
- **R35 한국어**: KsponSpeech = **일반 대화 corpus** (TV/방송/일상 발화, 발음·환경 다양성 큼)
- ctc-segmentation으로 키워드 잘라낸 ~1초 WAV는 KWS-specific 녹음 대비 noise 많음

### 2. 53× 불균형

- 아니 14,986 ↔ 꺼 281 (R26은 균등 1,000)
- class weight balancing해도 sparse class 학습 한계

### 3. alignment 정확도

- wav2vec2-large-xlsr-korean alignment confidence 보정해도 ~5~10% 시작 noise
- KWS 1초 window 내 키워드가 정확히 가운데 위치 보장 불가

## 영업 직결 의미 ⭐⭐⭐

### 영업 카피 정정 (78.7% 영어 카피 금지)

| 옛 카피 (금지) | 정정 카피 |
|---|---|
| ~~"한국어 응원봉 KWS 78.7% 정확도"~~ | "한국어 응원봉 personalization +5.38% 향상 + total 0.37초 (Cloud 대비 8~27× 빠름)" |
| ~~"capacity 보강으로 한국어 정확도 향상"~~ | "한국어 KWS는 본질 한계 → personalization carrier 우월성으로 차별화" |
| ~~"한국어 KWS 영어와 동등 성능"~~ | "한국어 baseline 한계는 본질, 그러나 응답 속도 carrier는 100% carry" |

### Stage 4 영업 시나리오 갱신

- **시나리오 B (Hybrid SoC)** = KWS frontend (M4F 14×) + Personalization backend (esp32s3 0.05초) — 한국어 carrier 100% carry로 정량 박제 유지
- **시나리오 E (STM32H7 산업 노드)** = R36 17.58× CNN 가속 + 50~60MB SLM 적재 — 한국어 KWS carrier carry 가능성은 mandate v2.9 후속 검증

## negative finding R&D 신뢰성 자산 + 1 (누적 8건)

| # | Round | finding |
|:-:|---|---|
| 1 | R19 | Eden NPU NNAPI -79~421× |
| 2 | R24 | INT16 dynamic scale -1.65~4.25× |
| 3 | R27 | FP16 R23 미달 -1.08~1.88× |
| 4 | R29 | Multi-layer LoRA -7.7~-9.3% |
| 5 | R28 | TF 1.85×만 (attn_causal argmax 비가속) |
| 6 | R32 | pca10040 64KB 부적합 |
| 7 | R30 | smartphone NEON 0.97× |
| **8 ⭐ NEW** | **R35** | **한국어 KWS architecture 보강 무효 (48% ceiling)** |

→ "vendor 광고 신뢰 X — UTTEC 자체 측정 자산 기반 carrier carry-over 정량 매트릭스" 영업 카피 갱신.

## 패턴 일반화 (다른 vault carry)

### "carrier 부분 carry-over 패턴" (mywiki 메모리 cascade 후보)

기술 carrier (ML model · framework · 알고리즘)를 다른 도메인 적용 시:
- **architecture identity 부분** = 100% carry (HW latency / memory footprint)
- **task 의존 부분** = 50~60% carry (정확도 / fine-tune 향상폭)
- **본질 한계** = capacity 보강 무효, 데이터/task 본질 검증 필요

→ 영업 시 "carry 100%" 과대 약속 금지, 영역별 carry 강도 정량 매트릭스 제시.

### "negative finding이 valuable" 패턴 강화 (8번째)

- 8 negative finding 누적 = R&D 신뢰성 자산
- "vendor 광고 vs 실측 격차 + carrier carry 강도 분기" cross-vendor 인벤토리

## 다음 결단 후보

- mandate v2.9 R36 (이미 종결) + R35 한국어 + esp-nn 가속 측정 (R21 carry) → H4 < 30ms 검증
- 한국어 KWS 본질 한계 원인 검증 (R35 ceiling 원인 3 가설 검증 — 데이터/불균형/alignment)
- 영업 데모 진입 시 한국어 path 정확 카피 사용 (78.7% 영어 카피 금지)

## 관련 페이지

- [[onDevice-ai]] — mandate v2.8 6/6 종결 + R35 한국어 path
- [[ai-fanstick]] — R35 한국어 KWS 영업 카피 정확성 박제
- [[build-gotcha-inventory]] — 8번째 negative finding 추가
- [[ai-direction]] — 결정 12 (KWS 큰 CNN application = stm32h745) + 한국어 본질 한계 carry-over 매트릭스
- [[2026-05-27_Cortex-M-tier-최강-AI-노드]] — Cortex-M tier 최강 (R36) + 한국어 esp-nn 후속 검증 후보
- [[2026-05-24_application별-SoC-결정-Hybrid-SoC]] — Hybrid SoC carrier carry 강도 정량 매트릭스
