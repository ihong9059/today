---
title: AI FanStick (비즈니스 관점)
type: product-entity
created: 2026-05-07
updated: 2026-05-08
status: 현재 — 특허 출원 완료 / 차세대 — Phase 1A·1B 검증 완료 (PC PoC 확보)
tags: [제품, AI, BLE, K-POP, 양산, Stage4]
links: [Stage4_영업, 한국기계, 위시캣]
external_refs:
  - myWiki/second-brain/entities/ai-fanstick.md (제품 기술·특허)
  - onDevice_AI/microGPT/01_검증절차.md (Phase 1A·1B 결과)
  - onDevice_AI/통합검증/01_SRAM_파라미터_매트릭스.md (실측 매트릭스)
  - 영업/Stage4_OnDeviceAI_검토.md (Stage 4 영업 매핑)
---

# AI FanStick (비즈니스 관점)

## 한 줄 정의

K-POP 1.5억+ 팬덤 시장 타겟 **AI 음성 비서 + LED 응원봉 + BLE 통합 제품**. 특허 출원 완료, 차세대(microGPT 탑재) 검증 진행 중.

## 두 버전

| 버전 | 칩 | AI | 상태 | 차별화 |
|---|---|---|:-:|---|
| **현재** | ESP32-C3 | 클라우드 API (Claude/GPT) | 특허 출원 완료, MVP | 음성+AI+BLE 통합 |
| **차세대** | **ESP32-S3** (변경: N16R8 → 기본 S3, PSRAM 불필요) | microGPT 변종 Korean-Small (~154K params, INT8) | **Phase 1A·1B PC PoC 완료** (5/8) | "외부 인터넷 0%, 응원봉 자체 GPT" |

### 차세대 기술 근거 (2026-05-08 PC 검증 결과)

| 항목 | 측정/추정 | 의미 |
|---|---|---|
| microGPT (Tiny) PC 학습 | Loss 3.37→2.65 (-21%, ~3분) | 의존성 0 / 4,192 params / 영문 이름 패턴 학습 |
| INT8 양자화 크기 | 4.1 KB | ESP32-S3 SRAM 520KB의 0.79% |
| Korean-Small (권장 모델) | 154,624 params, INT8 155 KB | SRAM 29.7%, 한국어 짧은 응원 응답 가능 |
| ESP32-S3 추론 추정 | token당 0.1~5 ms | 인터랙티브 응답 (목표 < 1초의 50배 마진) |
| C++ 포팅 일정 | 1~2주 (~500~700줄) | ESP-DSP dotprod SIMD 활용 |
| **칩 변경 결정** | **불필요** (기존 ESP32-S3 그대로) | PSRAM 8MB N16R8은 오버스펙 |

### 학습/배포 4 경로 결정 (2026-05-08 학습설계 폴더 신설)

상세: `onDevice_AI/aiFanStick_차세대/학습설계/` 5 파일

| 경로 | 위치 | 모델 | 채택 여부 |
|:-:|---|---|:-:|
| A | 응원봉 단독 (STT 포함) | Korean-Small | ❌ 비현실적 (STT 어려움) |
| **B** | 스마트폰 | Gemma 2B + LoRA | ✅ 중기 (Phase 5, 6~12개월) |
| **C** | 클라우드 (현재) | OpenAI gpt-4o-mini | ✅ **운영 유지** |
| **D** | 응원봉 자체 SLM (폰 보조) | Korean-Small 154K | ✅ **차별화 핵심, Phase 2~4 검증** |

**핵심 차별화**: 경로 D **"외부 인터넷 0% 응원봉 자체 GPT"** — 다른 응원봉에 없는 유일성, 특허 보강 + Stage 4 영업 카피.

**최종 시스템**: 4 단계 폴백 (클라우드 → 폰 LLM → 응원봉 SLM → 규칙)

## 시장

### 타겟
- K-POP 팬덤 1.5억+ (글로벌)
- 콘서트장 사용 (인터넷 약함 → 자체 처리 강점)
- 1차 시장: 한국·일본·동남아
- 2차 시장: 북미·유럽

### 시장 규모 (추정)
- 응원봉 시장 글로벌: 연 ~3,000억 (가설)
- AI 통합 응원봉 = 신규 카테고리 (경쟁 거의 없음)
- 차세대 가격대: Premium 3~5만원 / Standard 1~2만원

## 경쟁 분석

| 경쟁 제품 | AI 통합 | 우리 차별화 |
|---|:-:|---|
| 일반 LED 응원봉 (각 K-POP 그룹 공식) | ❌ | AI 통합 = 신 카테고리 |
| 스마트 응원봉 (블루투스만) | ❌ | AI 자연어 처리 |
| (검색 결과) AI 응원봉 시장 | 거의 없음 | **블루오션** |

→ 특허 출원 완료 = 시장 진입 장벽 확보.

## 매출 모델

| 모델 | 단가 | 시장 |
|---|:-:|---|
| **B2C 직판** | 1~5만원 / 대 | K-POP 팬 직접 |
| **B2B 라이센스** | 협의 | K-POP 그룹 공식 응원봉 라이센스 |
| **양산 OEM** | 협의 | 다른 응원봉 제조사에 AI 모듈 공급 |
| **Stage 4 패키지** | 1,500만 | 임베디드 스타트업이 차세대 AI 응원봉 만들 때 기술 자문 |

## Stage 4 영업과의 연결

본 제품 = **Stage 4 (1,500만) 영업 패키지의 첫 검증 사례**:
- 검증 완료 → "AI FanStick 차세대 = 1인이 4주에 검증한 ESP32-S3 SLM 통합 사례"
- 영업 시 차별화: "다른 강사·외주는 보드 검증 없이 제안만, UTTEC는 자체 PoC 보유"

→ Stage 4 첫 수주 후보: 임베디드 스타트업 (응원봉 / 스마트 토이 / IoT 디바이스)

## 영업 진행 상태

| 시점 | 이벤트 | 상태 |
|---|---|:-:|
| 2026-02 | AI FanStick MVP 검증 + 특허 출원 | ✅ 완료 |
| 2026-05-07 | onDevice_AI vault 신설 (차세대 검증 시작) | ✅ |
| 2026-05-08 | Phase 1A (PC 직접 실행) + 1B (포팅 분석) 완료 | ✅ |
| 2026-05-08 | Stage 4 영업 자료 1차 동기화 (실측 데이터 추가) | ✅ |
| Phase 2 (보드 도착 후) | ESP32-S3 hello_world + microGPT C++ 포팅 | ⬜ |
| Phase 2 후 | Korean-Small 학습 + ESP32-S3 탑재 검증 | ⬜ |
| 6/22 이후 | 강사양성 Day 5 사례로 활용 (2차 차수) | ⬜ |
| 검증 완료 후 | 첫 Stage 4 수주 시도 (임베디드 스타트업 / 한국기계) | ⬜ |

## 차세대 BOM 영향 (검증 후 결정)

```
현재 (ESP32-C3)
  - 칩 단가: ~1,500원
  - 양산 단가 영향: 0
  - 판매가: 1~2만원 (Standard)

차세대 (ESP32-S3, 기본 / N16R8 불필요)
  - 칩 단가: ~2,500원 (+1,000원/대, N16R8 대비 절감)
  - 양산 단가 영향: +1,000원/대
  - 판매가: 3~5만원 (Premium 라인 신설)
  - 특허 보강 검토: microGPT 통합 부분
  - 검증 (5/8): SRAM 520KB로 Korean-Small (154K params, INT8 155KB) 충분 확인
```

→ Premium 라인 차별화 가치로 +1,500원 부담 충분히 흡수 가능.

## 특허

- **현재 출원 완료**: 음성+AI+BLE 통합 (2026-02)
- **검토 중 (차세대 보강)**: On-Device AI(microGPT 변종 탑재) 별도 청구항 또는 보강 출원

## K-POP 팬덤 영업 채널

| 채널 | 진입 가능성 | 우선순위 |
|---|:-:|:-:|
| K-POP 팬 커뮤니티 (Twitter, Weverse) | 높음 | 1순위 (B2C 직판 마케팅) |
| K-POP 그룹 매니지먼트 (HYBE·SM·YG·JYP) | 중간 | 2순위 (B2B 라이센스) |
| 응원봉 제조사 (라이트팩토리 등) | 높음 | 3순위 (양산 OEM) |
| 임베디드 스타트업 (자체 응원봉 만드는 곳) | 중간 | 4순위 (Stage 4 패키지) |

## 다음 액션

| 시점 | 액션 | 담당 |
|:-:|---|:-:|
| 검증 진행 중 | onDevice_AI/ Phase 1A 완료 | 사용자 + Claude |
| 검증 완료 | 본 entity "기술 근거" 섹션 갱신 | Claude |
| 검증 완료 후 | Stage 4 영업 자료 갱신 | Claude |
| 6/22 이후 | 강사양성 Day 5 사례 자료 작성 | Claude |
| Q3 2026 | 첫 Stage 4 수주 시도 | 사용자 직접 |

## 관련 페이지

### 본 vault
- [[Stage4_영업]] (예정) — Stage 4 수주 사이클
- [[한국기계]] (예정) — Stage 4 수주 후보
- raw/ — 영업 미팅·이벤트 기록

### 외부 vault
- `myWiki/second-brain/entities/ai-fanstick.md` — 제품 기술·특허 (학습/큰그림)
- `myWiki/second-brain/entities/uttec-stage-package.md` — Stage 4 영업 모델
- `onDevice_AI/aiFanStick_차세대/01_검증절차.md` — 차세대 기술 검증
- `영업/Stage4_OnDeviceAI_검토.md` — Stage 4 1차 영업 자료

## 메타

| 항목 | 값 |
|---|---|
| 등록 (본 vault) | 2026-05-07 |
| 첫 매출 | (대기) |
| 영업 단계 | 검증 진행 → 영업 자료 갱신 → 첫 수주 시도 |
| 다음 갱신 | onDevice_AI Phase 1A 완료 시 |
