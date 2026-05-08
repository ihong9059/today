---
title: onDevice AI 확장 영역 시장조사 — 응원봉 부분 통합 + 타 분야 적용
created: 2026-05-08
type: market-research
status: 1차 조사 (시장 데이터 + UTTEC 적합도)
sources:
  - 외부: TinyML/SLM 2026 시장 보고서 (Voice AI, Smart Toy, Edge AI)
  - 내부: 응원봉 newMvp 검토서, onDevice_AI_검증 vault, REVITA·xerix·smartFactory 자산
related:
  - 2026-05-08_온디바이스AI_정렬도검토.md (정지선 1차 결정)
---

# onDevice AI 확장 영역 시장조사

## Executive Summary

이전 검토(`2026-05-08_온디바이스AI_정렬도검토.md`)에서 **응원봉 본체 풀-기능 AI 비서 = 부적합**이라는 결론을 내렸다. 본 보고서는 두 질문에 답한다:

1. **응원봉 시스템 안에서**, onDevice AI가 풀-기능이 아닌 **"부분 기능"**으로 어떤 역할을 할 수 있나?
2. **응원봉이 아닌 다른 분야**에서 microGPT/SLM 4K~150K 파라미터 클래스의 onDevice AI가 가질 수 있는 시장은?

**핵심 결론**:
- 응원봉 시스템 내 적합 영역 = **5가지 부분 통합 시나리오** (Wake Word, Keyword Spotting, 제스처, LED 패턴 생성, 노이즈 필터)
- 타 분야 우선 진입 후보 = **상위 3개**: ① 자영업 음성주문 키오스크, ② 산업용 음성명령 HMI, ③ 노약자 케어 컴패니언

---

# Part 1 — 응원봉 시스템 내 부분 통합 시나리오

## 전제

응원봉 시스템 = **응원봉(ESP32-C3) + 스마트폰 앱 + 클라우드 AI**의 3계층 구조. 풀-AI 비서는 스마트폰 Gemma 2B + Cloud Gemini가 담당. 응원봉 본체는 **명령 수신 + LED 제어 + 마이크/센서 입력**만.

이 구조에서 **응원봉 본체에서만 동작 가능한** 작은 AI 역할 5가지:

## 1.1 Wake Word Detection ("Hey FanStick")

| 항목 | 내용 |
|---|---|
| 모델 크기 | 8~50 KB (TinyML KWS 표준) |
| 응답 시간 | 85ms 이하 (검증된 벤치마크) |
| RAM 요구 | 256KB 미만 (ESP32-C3로도 충분) |
| 사용자 가치 | "스마트폰 안 켜고도 응원봉 깨우기" |
| UTTEC 적합도 | ★★★ — 이미 ESP32 + 마이크 경험 보유 |
| 구현 난이도 | 낮음 (Edge Impulse Studio 1주) |

**시나리오**: 사용자가 "Hey FanStick" → 응원봉이 즉시 LED 깜빡 → 스마트폰 앱 자동 활성화 → 본격 음성 인식 시작.

**근거**: 2026 TinyML 평균 응답 시간 1.2초 → 85ms로 단축. 콘서트장처럼 스마트폰 꺼내기 어려운 환경에서 결정적.

## 1.2 Keyword Spotting (응원 명령 감지)

| 항목 | 내용 |
|---|---|
| 모델 크기 | 50~200 KB |
| 응답 시간 | 100ms 이하 |
| 인식 단어 | "앵콜", "사랑해", "최고", "보라해" 등 10~20개 (콘서트 특화) |
| 사용자 가치 | 큰 소음 환경에서도 짧은 명령으로 LED/진동 제어 |
| UTTEC 적합도 | ★★★ |

**시나리오**: 콘서트장 100dB 소음 속, 사용자가 "앵콜!" 외침 → 응원봉이 즉시 빨강 깜빡 + 진동. 스마트폰 거치지 않음.

**차별화 포인트**: K팝 응원 어휘 특화 데이터셋 자체 구축 → 경쟁사 카피 불가능한 자산.

## 1.3 제스처 인식 (응원봉 흔들기 패턴)

| 항목 | 내용 |
|---|---|
| 모델 크기 | 10~30 KB |
| 입력 | MPU6050 가속도/자이로 6축 |
| 분류 클래스 | "흔들기 강", "박수 패턴", "위아래", "원형", "정지" |
| 사용자 가치 | 무대 스크린에 "팬 열정 게이지" 시각화 |
| UTTEC 적합도 | ★★★ — REVITA 가속도 데이터 처리 경험 보유 |

**시나리오**: 응원봉 휘두르기 패턴 → 강도/리듬 분류 → BLE로 스마트폰 → 콘서트장 서버 집계 → 무대 스크린 "구역별 열정 그래프".

**관련 자산**: REVITA에서 동작 패턴 처리 경험 → 동일 접근.

## 1.4 LED 패턴 자동 생성 (microGPT 4K 직접 활용)

| 항목 | 내용 |
|---|---|
| 모델 크기 | 4~16 KB (microGPT 변종) |
| 학습 데이터 | RGB 시퀀스 (BGM 비트 → 색상 패턴) |
| 출력 | 16 토큰 = 16 색상 점등 시퀀스 |
| 사용자 가치 | "오늘 셋리스트에 맞는 LED 댄스 자동 생성" |
| UTTEC 적합도 | ★★ — 새 분야지만 microGPT 기반 활용 가능 |

**시나리오**: 사용자가 곡명/BPM 입력 → 응원봉이 자체적으로 곡에 맞는 LED 시퀀스 생성. **microGPT 4K가 처음으로 "킬러 기능"을 갖는 영역**.

**중요**: 이건 **언어가 아닌 색상 시퀀스 학습**이라 4K 파라미터로도 충분. microGPT 검증 자산을 그대로 활용 가능.

## 1.5 음성 활동 감지 (VAD) + 로컬 노이즈 필터

| 항목 | 내용 |
|---|---|
| 모델 크기 | 5~20 KB |
| 역할 | 무의미한 잡음 제거 → STT 호출 횟수 절감 |
| 사용자 가치 | 배터리 절약, 클라우드 API 비용 절감 |
| UTTEC 적합도 | ★★ |

**시나리오**: 응원봉이 사람 음성 vs 군중 함성을 구분 → 사람 음성일 때만 BLE로 스마트폰에 송신 → 스마트폰의 STT/AI 호출 횟수 5분의 1로.

**경제성**: API 비용 80% 절감 → 응원봉 구독료 인하 여지.

## 1.6 응원봉 통합 시나리오 매트릭스

| 시나리오 | 모델 크기 | ESP32-C3 가능? | 사용자 체감 가치 | 구현 우선도 |
|---|:-:|:-:|:-:|:-:|
| Wake Word | 8~50 KB | ✅ | ★★★ | **1순위** |
| Keyword Spotting | 50~200 KB | ⚠️ (PSRAM 필요) | ★★★ | **2순위** |
| 제스처 인식 | 10~30 KB | ✅ | ★★★ | **2순위** |
| LED 패턴 생성 | 4~16 KB | ✅ | ★★ | 3순위 |
| VAD/노이즈 필터 | 5~20 KB | ✅ | ★ (간접) | 3순위 |

**결론**: 응원봉 본체 onDevice AI = "풀 GPT" 대신 **5개의 작은 전용 모델 조합**. 칩 변경 불필요(ESP32-C3 그대로) + 사용자 체감 가치 명확. **이 방향은 양산 적용 검토 가치 있음** (이전 정지선과 별개 트랙).

---

# Part 2 — 응원봉 외 다른 분야 시장조사

## 시장 전반 (2026 데이터)

| 시장 | 2026 규모 | CAGR | 출처 |
|---|---|:-:|---|
| Voice AI in Smart Homes | $29.5B (2026) | 47.6% | Research and Markets |
| AI Voice Assistant Global | $50.9B (2026) | ~15% | Business Research Insights |
| Smart AI Toy | $18.5B (2025) → $55.2B (2035) | 11.85% | SNS Insider |
| Educational Toys | $69.5B (2025) → $185.6B (2035) | 10.32% | SNS Insider |
| Voice-Based AI Companion | $63.4B (2035) | 26% (devices) | Precedence Research |
| Edge AI on-device 처리 비율 | 70% of voice queries | 응답 150ms | 시장 평균 |

**핵심 트렌드**: SLM(Small Language Model) 7B 파라미터급이 LLM 대비 10~30배 저렴 + 80~90% 품질 → **2027년까지 전용 SLM 사용량이 범용 LLM의 3배** (Gartner).

## 후보 분야 10개 (UTTEC 적합도 평가)

각 분야별 평가 기준:
- **시장 크기**: 글로벌/국내 매출 잠재력
- **진입 난이도**: UTTEC 자원으로 PoC까지 시간
- **자산 활용도**: 기존 UTTEC 자산(REVITA·AI FanStick·ESP32 양산 경험·강의 라인) 재사용 가능성
- **차별화 가능성**: 경쟁 환경 vs UTTEC 강점

### A. 자영업 음성주문 키오스크 (B2B 소상공인)

| 항목 | 내용 |
|---|---|
| 시장 크기 | 국내 자영업자 600만, 음식점 70만 |
| 진입 난이도 | 중 (기존 obsidian 6편 시리즈 + 자영업 AI 플랫폼 진행 중) |
| 자산 활용도 | ★★★★★ — obsidian/자영업-AI플랫폼 + 음성 자산 |
| 차별화 | 클라우드 의존 키오스크 대비 **오프라인 작동, 월 구독료 0** |
| 가설 | "주문 받기" 어휘 50개 → KWS 200KB로 95% 정확도 |
| **종합 우선도** | **1순위** |

**시나리오**: 식당 주방에 ESP32-S3 박스 1개 설치 → "김치찌개 둘", "콜라 추가", "테이블 3번" 같은 짧은 명령 인식 → POS 자동 입력. 인터넷 없이도 작동.

**왜 1순위인가**: 이미 진행 중인 obsidian 자영업 플랫폼과 직접 결합 가능. 시장 6,000개 식당만 잡아도 단가 50만원 = 30억.

### B. 산업용 음성명령 HMI (B2B 제조업)

| 항목 | 내용 |
|---|---|
| 시장 크기 | Embedded World 2026 핵심 트렌드 (Advantech·Espressif 시연) |
| 진입 난이도 | 중 (smartFactory + 한국기계 자산) |
| 자산 활용도 | ★★★★ — smartFactory 자산 + Stage 4 패키지 |
| 차별화 | 손에 기름 묻은 작업자도 음성으로 장비 제어 |
| 가설 | "정지", "재시작", "온도 50도", "배출" 등 30개 명령 |
| **종합 우선도** | **2순위** |

**시나리오**: 한국기계의 분쇄/믹서 장비 → 음성 명령 ("긴급 정지") + 음성 안내 ("필터 교체 시기"). Stage 4 패키지의 첫 사례.

### C. 노약자 케어 컴패니언 (B2C 시니어)

| 항목 | 내용 |
|---|---|
| 시장 크기 | Voice-Based AI Companion $63B (2035), 한국 65세 인구 1,000만 |
| 진입 난이도 | 중-높 (의료/안전 책임) |
| 자산 활용도 | ★★★ — AI FanStick 음성 자산 + 노약자 외부 도움 컨택 |
| 차별화 | 클라우드 의존하는 SmartSpeaker 대비 **데이터 외부 송신 0** (개인정보) |
| 가설 | "도와줘", "약 먹었어", "넘어졌어" 등 응급/일상 30개 키워드 |
| **종합 우선도** | **3순위** (사회적 임팩트 큼, 책임 부담 있음) |

**시나리오**: 거실 콘센트형 디바이스. "도와줘" 외치면 → 가족 자동 알림 + LED/사운드 응급. 약 복용 시간 음성 알림. 클라우드 안 보내서 사생활 보호.

### D. 어린이 학습 토이 (B2C 교육)

| 항목 | 내용 |
|---|---|
| 시장 크기 | Smart AI Toy $55B (2035), 교육 분야 CAGR 19.5% |
| 진입 난이도 | 높 (콘텐츠 IP 필요) |
| 자산 활용도 | ★★ — aiStudy 4 Track + Remotion 음성 합성 |
| 차별화 | 한국어 발음 교정 (microGPT 한국어 변종) |
| 가설 | "사과", "고양이" 등 200단어 발음 분류 |
| **종합 우선도** | 4순위 (시장 큼, IP/디자인 부담) |

### E. 자전거/킥보드 음성 컨트롤 (B2C 모빌리티)

| 항목 | 내용 |
|---|---|
| 시장 크기 | 국내 PM 시장 1,000만 사용자 |
| 진입 난이도 | 중 |
| 자산 활용도 | ★★ — REVITA IoT 디바이스 |
| 차별화 | 라이딩 중 손 안 떼고 "라이트 켜", "속도 줄여" |
| **종합 우선도** | 5순위 |

### F. 보안 음성 감지 (유리 깨짐, 비명) — B2B/B2C

| 항목 | 내용 |
|---|---|
| 시장 크기 | 보안 IoT $30B+ |
| 진입 난이도 | 중 (단순 분류기) |
| 자산 활용도 | ★★ — ESP32 양산 경험 |
| 차별화 | 음향 anomaly detection 4K~10K 모델로 가능 |
| **종합 우선도** | 6순위 |

### G. 농축산 행동 패턴 모니터 (B2B 농업)

| 항목 | 내용 |
|---|---|
| 시장 크기 | 디지털 농업 국내 정부 지원 활성화 |
| 진입 난이도 | 중 |
| 자산 활용도 | ★★ — REVITA 가속도 처리 경험 |
| 차별화 | 가축 행동 분류 (먹이 시간, 발정기, 질병 징후) |
| **종합 우선도** | 7순위 |

### H. K-POP 다른 그룹 응원봉 OEM (B2B HYBE/SM/JYP/YG)

| 항목 | 내용 |
|---|---|
| 시장 크기 | 4대 기획사 응원봉 연 수십만 대 |
| 진입 난이도 | 매우 높 (대형 클라이언트 영업) |
| 자산 활용도 | ★★★★ — AI FanStick 그대로 |
| 차별화 | 본 응원봉 검증 결과 그대로 OEM 제안 |
| **종합 우선도** | 별도 트랙 (장기) |

### I. 스포츠 응원도구 (야구·축구 응원봉/카드)

| 항목 | 내용 |
|---|---|
| 시장 크기 | 국내 KBO 1,000만 관중 |
| 자산 활용도 | ★★★ |
| **종합 우선도** | 8순위 |

### J. 음성 문진/처방 지원 (B2B 의료) — 의사 보조

| 항목 | 내용 |
|---|---|
| 시장 크기 | doctor 분야 myWiki 자산 보유 |
| 진입 난이도 | 매우 높 (인증 부담) |
| 자산 활용도 | ★★ — doctor 분야 |
| **종합 우선도** | 별도 트랙 (장기) |

## 후보 분야 종합 매트릭스

| # | 분야 | 시장 매력 | UTTEC 적합도 | 진입 난이도 | 종합 |
|:-:|---|:-:|:-:|:-:|:-:|
| A | 자영업 음성주문 키오스크 | ★★★★ | ★★★★★ | 중 | **1** |
| B | 산업용 음성명령 HMI | ★★★ | ★★★★ | 중 | **2** |
| C | 노약자 컴패니언 | ★★★★★ | ★★★ | 중-높 | **3** |
| D | 어린이 학습 토이 | ★★★★★ | ★★ | 높 | 4 |
| E | 자전거/PM | ★★ | ★★ | 중 | 5 |
| F | 보안 음성 감지 | ★★★ | ★★ | 중 | 6 |
| G | 농축산 모니터 | ★★ | ★★ | 중 | 7 |
| H | K-POP OEM | ★★★★ | ★★★★ | 매우 높 | 별도 |
| I | 스포츠 응원도구 | ★★ | ★★★ | 중 | 8 |
| J | 의료 음성 보조 | ★★★★ | ★★ | 매우 높 | 별도 |

---

# Part 3 — 추천 진입 전략

## 3.1 우선순위 3개 — 6개월 진입 시나리오

### 1순위: 자영업 음성주문 키오스크
- **근거**: 이미 진행 중인 obsidian 자영업 AI 플랫폼과 직접 결합. 시장·자산·차별화 모두 ★★★★+
- **MVP 단계**: 식당 1곳 베타(가족·지인 미용실/카페 활용) → 30개 명령 KWS → 1개월
- **수익 가설**: 단가 50만원/대, 첫 6개월 30대 = **1,500만**
- **myWiki 트리거**: `entities/자영업-AI플랫폼.md` 갱신 (음성 모듈 추가)

### 2순위: 산업용 음성명령 HMI
- **근거**: Stage 4 패키지의 첫 사례 후보. 한국기계 미팅 진행 중.
- **MVP 단계**: 한국기계 분쇄 장비 1대에 음성 명령 모듈 → 안전 명령 우선("정지", "긴급") → 2개월
- **수익 가설**: Stage 4 패키지 1,500만 × 1건 = **1,500만**
- **myWiki 트리거**: `entities/한국기계.md` 또는 `영업/Stage4_OnDeviceAI_검토.md` 갱신

### 3순위: 노약자 컴패니언
- **근거**: 사회적 임팩트 + 정부지원 사업 매칭 가능
- **MVP 단계**: 보호자 가족 베타(시니어 1~2명) → 응급/일상 30 키워드 → 3개월
- **수익 가설**: 정부지원 매칭 600~3,000만 + 디바이스 단가 30만/대
- **myWiki 트리거**: `entities/노약자케어.md` 신설 검토

## 3.2 응원봉 본체 부분 통합도 별도 트랙으로 진행

**Part 1의 5가지 시나리오**(Wake Word, Keyword Spotting, 제스처, LED 패턴, VAD)는 **이전 정지선과 무관**:
- 이전 정지선 = "풀-GPT 비서 양산 적용" ⛔
- Part 1 = "전용 작은 모델 5개 조합" — 칩 변경 불필요, 사용자 가치 명확

→ **응원봉 양산 v2 펌웨어에 Part 1을 1개씩 도입 검토 가능** (단, 각각 사용자 PoC로 가치 검증 후).

## 3.3 즉시 실행 액션 5가지

| # | 액션 | 산출물 | 기한 |
|:-:|---|---|---|
| 1 | obsidian 자영업 플랫폼에 "음성주문 모듈" 항목 추가 | `obsidian/강의모듈_2~3h/` 보강 1 섹션 | 5/15 |
| 2 | 한국기계 미팅 시 "음성 안전 명령 모듈" 1장 자료 준비 | `영업/Stage4_OnDeviceAI_검토.md` 시나리오 F 신설 | 5/20 |
| 3 | 응원봉 v2 펌웨어 백로그에 5개 부분 통합 시나리오 등록 | `응원봉/newMvp/v2_백로그.md` 신설 | 5/15 |
| 4 | myWiki entity 신설: `자영업-AI플랫폼.md` 음성 섹션 보강 | entity 갱신 | 5/15 |
| 5 | 본 보고서 분기 정기 점검 알림 등록 | calendar 일정 (2026-08-08) | 5/8 |

---

# 부록 — 기술 사양 참고

## 모델 크기 vs ESP32 시리즈 매트릭스

| 모델 클래스 | 크기 (INT8) | ESP32-C3 (320KB) | ESP32-S3 (520KB) | ESP32-S3-N16R8 (8MB PSRAM) |
|---|---|:-:|:-:|:-:|
| microGPT | 4 KB | ✅ | ✅ | ✅ |
| KWS (Wake Word) | 8~50 KB | ✅ | ✅ | ✅ |
| Keyword Spotting (확장) | 50~200 KB | ⚠️ | ✅ | ✅ |
| 제스처 분류 | 10~30 KB | ✅ | ✅ | ✅ |
| Korean-Small | 154 KB | ⚠️ | ✅ | ✅ |
| TinyLlama Q4 | 700 MB | ❌ | ❌ | ❌ (PSRAM 부족) |
| Gemma 2B Q4 | 1.2 GB | ❌ | ❌ | ❌ |

→ **microGPT~Korean-Small 클래스는 ESP32-C3·S3로 충분**. 1B+ 모델은 스마트폰/PC 영역.

## 시장 데이터 출처

- TinyML/ESP32-S3: [zediot.com](https://zediot.com/blog/esp32-s3-tinyml-optimization/), [Hackster.io](https://www.hackster.io/news/espressif-launches-esp32-s3-box-an-all-in-one-esp32-s3-dev-system-for-tinyml-edge-ai-work-89421f602b2d)
- SLM 시장: [Calmops](https://calmops.com/ai/small-language-models-slm-complete-guide-2026/), [Dell](https://www.dell.com/en-us/blog/the-power-of-small-edge-ai-predictions-for-2026/), [Sensory](https://sensory.com/slm-vs-llm-on-device-nlu/)
- Voice AI: [Research and Markets](https://www.researchandmarkets.com/reports/6103646/voice-ai-in-smart-homes-market-report), [Business Research Insights](https://www.businessresearchinsights.com/market-reports/artificial-intelligence-voice-assistant-market-117290), [Astute Analytica](https://www.astuteanalytica.com/industry-report/voice-assistant-market)
- Smart AI Toy: [SNS Insider](https://www.globenewswire.com/news-release/2026/04/10/3271674/0/en/Smart-AI-Toy-Market-Size-to-Surpass-USD-55-23-Billion-by-2035-Research-by-SNS-Insider.html), [StuffPlush](https://www.stuffplush.com/what-is-the-new-ai-toy-trend2026-industry-guide/)
- Voice-Based Companion: [Precedence Research](https://www.precedenceresearch.com/voice-based-ai-companion-product-market)
- KWS Production: [Medium - Wilson Yu](https://medium.com/@yu.wilson110/tinyml-for-keyword-spotting-on-a-microcontroller-6d55426f2f25), [Edge AI TinyML 2026](https://johal.in/edge-ai-tinyml-for-keyword-spotting-in-2026-5/)
- Industrial Voice/Wearable: [Engineer Live](https://www.engineerlive.com/content/ground-nuremberg-s-embedded-world-2026), [Sensory](https://sensory.com/solution/wearables/), [Plaud AI](https://www.plaud.ai/blogs/articles/9-life-changing-ai-wearable-devices-in-2026)

## 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-08 |
| 1차 의사결정 | 우선 진입 1순위 = 자영업 음성주문 키오스크 |
| 2차 의사결정 | 응원봉 v2 백로그 = 5개 부분 통합 시나리오 |
| 다음 점검 | 분기 1회 (2026-08-08, 2026-11-08) |
| 영구 반영 | myWiki/second-brain/thoughts/2026-05-08_onDevice-AI-확장영역.md |
