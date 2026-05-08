---
title: onDevice AI 확장 영역 — 응원봉 부분 통합 + 타 분야 진입
type: thought
created: 2026-05-08
updated: 2026-05-08
tags: [marketing, market-research, onDevice-AI, SLM, TinyML, 확장]
links: [ai-fanstick, onDevice-ai-검증, 자영업-AI플랫폼, uttec-stage-package, ai-direction, 2026-05-08_응원봉-온디바이스AI-정지선]
---

# onDevice AI 확장 영역

## 인사이트 요약

> 정지선 결정(microGPT를 응원봉 풀-AI 양산에 쓰지 않는다)은 끝이 아니라 시작. **microGPT/SLM 4K~150K 클래스는 응원봉 본체에서도 "부분 기능"으로 가치 있고, 응원봉 외 분야 3개에서는 1순위 진입 후보가 된다.** 우선순위: ① 자영업 음성주문 키오스크, ② 산업용 음성명령 HMI(Stage 4), ③ 노약자 컴패니언.

## 복리 패턴

**[사실 A]** 응원봉 풀-AI 비서 = microGPT로 불가능 (정지선 결정, 2026-05-08).

**[사실 B]** TinyML KWS 시장 데이터 — 256KB RAM에 8.5KB 모델 동작, 응답 85ms. 콘서트장 100dB 환경에서 사용 가능.

**[사실 C]** UTTEC 진행 중 자산 — obsidian 자영업 플랫폼, 한국기계 영업, REVITA IoT.

**→ [판단 D]** microGPT/SLM 클래스는 "풀 AI 비서"가 아니라 "전용 작은 모델 5종 조합"으로 위치시키면, 응원봉 본체 + 응원봉 외 3개 분야에서 모두 가치를 만든다.

**→ [행동 E]**
1. 응원봉 v2 펌웨어 백로그 = 5개 부분 통합 시나리오 등록 (Wake Word, KWS, 제스처, LED 패턴, VAD)
2. 자영업 음성주문 키오스크 = 1순위 진입. obsidian 자영업 플랫폼과 결합.
3. 산업용 음성명령 HMI = 2순위. Stage 4 패키지 첫 사례 후보.
4. 노약자 컴패니언 = 3순위. 정부지원 매칭 가능.

## 시장 데이터 (2026)

| 시장 | 2026 규모 | 출처 |
|---|---|---|
| Voice AI Smart Homes | $29.5B | Research and Markets |
| AI Voice Assistant Global | $50.9B | Business Research Insights |
| Smart AI Toy | $18.5B | SNS Insider |
| Educational Toys | $69.5B | SNS Insider |
| Voice-Based Companion | $63.4B (2035) | Precedence Research |

**핵심 트렌드**: 2027년까지 전용 SLM 사용량이 범용 LLM의 3배 (Gartner). Edge AI가 voice query의 70% 처리 (응답 150ms).

## 응원봉 시스템 내 부분 통합 5가지

| # | 시나리오 | 모델 크기 | 우선도 |
|:-:|---|---|:-:|
| 1 | Wake Word ("Hey FanStick") | 8~50 KB | **1** |
| 2 | Keyword Spotting (응원 어휘) | 50~200 KB | **2** |
| 3 | 제스처 인식 (흔들기 패턴) | 10~30 KB | **2** |
| 4 | LED 패턴 자동 생성 (microGPT 4K) | 4~16 KB | 3 |
| 5 | VAD/노이즈 필터 | 5~20 KB | 3 |

**중요**: 이 5개는 이전 정지선과 무관 — "풀 GPT" 양산이 아니라 "전용 작은 모델". ESP32-C3 그대로 사용 가능.

## 응원봉 외 분야 우선순위

### 1순위: 자영업 음성주문 키오스크
- 시장: 국내 식당 70만, 자영업자 600만
- 자산: obsidian 자영업 AI 플랫폼 (진행 중)
- 가설: 50만원/대 × 30대 = **1,500만 (6개월)**
- 트리거: `entities/자영업-AI플랫폼.md` 음성 모듈 보강

### 2순위: 산업용 음성명령 HMI
- 시장: Embedded World 2026 핵심 트렌드
- 자산: smartFactory + 한국기계 진행 중 영업
- 가설: Stage 4 패키지 1,500만 × 1건 = **1,500만**
- 트리거: `영업/Stage4_OnDeviceAI_검토.md` 시나리오 F 신설

### 3순위: 노약자 케어 컴패니언
- 시장: Voice-Based Companion $63B (2035), 한국 65세 1,000만
- 자산: AI FanStick 음성 모듈 + 정부지원
- 가설: 정부지원 600~3,000만 + 디바이스 단가 30만
- 트리거: `entities/노약자케어.md` 신설 검토

## 1차 자료

`C:\todo\today\응원봉\마케팅검토\2026-05-08_onDevice_AI_확장영역_시장조사.md`

## 관련 페이지

- [[ai-fanstick]] — 응원봉 v2 백로그 = 부분 통합 5종
- [[onDevice-ai-검증]] — microGPT/SLM 검증 자산 = 본 확장의 기술 근거
- [[자영업-AI플랫폼]] — 1순위 분야의 진입 채널
- [[uttec-stage-package]] — Stage 4 = 2순위 분야의 영업 통로
- [[ai-direction]] — AI 시대 방향 (microGPT를 "풀 비서"가 아닌 "전용 모듈"로 위치)
- [[2026-05-08_응원봉-온디바이스AI-정지선]] — 정지선 결정 (본 확장은 정지선과 무관 트랙)

## 후속 액션

- [ ] 5/15까지 obsidian 자영업 플랫폼에 음성주문 모듈 항목 추가
- [ ] 5/20까지 한국기계 미팅용 "음성 안전 명령 모듈" 자료 1장
- [ ] 5/15까지 응원봉 v2 펌웨어 백로그 5개 시나리오 등록
- [ ] 5/8 calendar에 분기 점검 일정 등록 (2026-08-08, 2026-11-08)

## AI 방향 함의 (ai-direction에 반영 예정)

본 사례는 다음을 보여준다:
- **"AI가 다 해결" vs "전용 작은 AI 여러 개 조합"** — 후자가 임베디드 환경에서 정답
- **풀 GPT 흉내내려다 실패하지 말고 작은 분류기/생성기 5~10개 조합으로 가라**
- 이는 [[gaps]] 의 "검증·제품 트랙 혼동" 패턴 회피 + [[strengths]] 의 "수직 통합" 강점 활용
