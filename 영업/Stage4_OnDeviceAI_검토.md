---
title: Stage 4 (On-Device AI) 신설 검토 + 4.5-Stage 패키지 확장
type: business-decision
created: 2026-05-07
updated: 2026-05-08
status: 채택 (4.5-Stage 패키지로 확장) + Phase 1A·1B 검증 데이터 반영
related:
  - 영업/Stage0_Core_Services_견적서.md
  - myWiki/second-brain/entities/uttec-stage-package.md
  - onDevice_AI_검증/microGPT/01_검증절차.md (실증 검증)
  - onDevice_AI_검증/통합검증/01_SRAM_파라미터_매트릭스.md (실측 매트릭스)
  - 작업보고서_항목: #19 3.5-Stage → 4.5-Stage 확장 검토
tags: [영업, 패키지, Stage4, On-Device AI, 의사결정]
---

# Stage 4 (On-Device AI) 신설 검토 + 4.5-Stage 패키지 확장

## 한 줄 결론

> **Stage 4 (On-Device AI) 신설 채택. 패키지를 3.5-Stage → 4.5-Stage로 확장. 단가 1,500만/모듈, Stage 0 견적서 옵션 섹션에 한 줄 추가.**

---

## 1. 검토 배경

myWiki ontology에 명시된 신설 후보:
- `{from: "3.5-Stage 패키지", to: "On-Device AI", relationType: "Stage 4 신설 후보이다"}`

검토 트리거:
- 사용자 강점 영역(임베디드 38년 + AI 통합)이 On-Device AI 시장에 정확 매칭
- Hailo-8 / Jetson Orin / SLM(Small Language Model) 시장 형성 (2024~2025)
- microGPT(Karpathy 4,192 파라미터) 검증으로 ESP32-S3 탑재 가능성 입증
- 기존 3.5-Stage는 클라우드/네트워크 의존 — 차별화 가치 부족

---

## 2. On-Device AI 시장 분석 (요약)

### 시장 동력
| 동력 | 내용 |
|---|---|
| 보안 | 데이터 외부 유출 0% (제조·의료·국방 강한 수요) |
| 비용 | 클라우드 추론비 → 0 (1회 보드 비용만) |
| 인터넷 끊김 | 공장·차량·해외에서도 동작 |
| 지연시간 | 클라우드 RTT 200ms → 로컬 추론 10~50ms |

### 시장 보드 옵션
| 보드 | 가격대 | TFLOPS | 적용 시나리오 |
|---|:-:|:-:|---|
| **Hailo-8** | 7~15만 | 26 | 산업용 비전·예측정비 |
| **Jetson Orin Nano** | 50~70만 | 40 | 로봇·드론·자율주행 |
| **Jetson Orin NX** | 100~150만 | 100 | 휴머노이드·차량 SDV |
| **ESP32-S3** | 1~2만 | 0.001 | IoT·센서·응원봉(SLM 4K 파라미터) |
| **Raspberry Pi 5 + Coral** | 15~25만 | 4 | 교육·MVP·소형 |

### 사용자 자산 매칭
- **Hailo-8 / Jetson**: 스마트팩토리 25개 데모 + 파쇄기 AI 85억 제안서 → 즉시 영업 진입
- **ESP32-S3**: AI FanStick 특허 + microGPT 검증 → 양산 제품 라인
- **Raspberry Pi 5**: 교육 자산 (uttec-edu Track F)

---

## 3. Stage 4 정의

### 산출물 (1,500만 / 모듈 / 표준 4주)

| # | 산출물 | 내용 |
|:-:|---|---|
| 1 | **보드 시스템** | Hailo-8 또는 Jetson Orin Nano 또는 ESP32-S3 (고객 요구 맞춤 1종) |
| 2 | **모델** | SLM 1~7B 파라미터 또는 microGPT 변종 (도메인 fine-tuning 1회) |
| 3 | **C++ 추론 엔진** | 사용자 38년 임베디드 자산 활용, 실시간 처리 (10~50ms) |
| 4 | **통합** | 기존 Stage 0 인프라(n8n + Obsidian + Memory MCP)와 연결 |
| 5 | **운영 매뉴얼 + 영상** | PDF 30p + 1시간 강의 (Stage 0 패턴 준수) |
| 6 | **30일 무상 지원** | 영업일 24h 이내 응답 (Stage 0 패턴 준수) |

### 진행 일정 (4주)

| Week | 작업 |
|:-:|---|
| 1 | 사전 미팅 (요구사항 + 보드 결정 + 모델 후보 결정) + 보드 입수 |
| 2 | C++ 추론 엔진 + 모델 fine-tuning |
| 3 | Stage 0 인프라 통합 + 운영 매뉴얼 작성 |
| 4 | 검증 + 사용자 교육(1시간) + 인계 |

### 미포함 (옵션)
- 추가 보드 1종당 +500만 (다중 보드 시)
- 모델 fine-tuning 추가 1회당 +300만
- 양산 BOM 설계 (별도 협의)

---

## 4. 1,500만 적정성 검증

### 비교 견적

| 패키지 | 단가 | 시간 | 시간당 |
|---|:-:|:-:|:-:|
| Stage 0 (Core Services) | 500만 | 5일 | 100만/일 |
| Stage 1 (교육) | 300만 | 5일 | 60만/일 |
| Stage 2 (위키 + 워크플로우) | 2,500만 | 1.5개월 | 80만/일 |
| Stage 3 (운영 앱) | 2,500만 | 1.5개월 | 80만/일 |
| **Stage 4 (On-Device AI)** | **1,500만** | **4주** | **75만/일** |

→ Stage 2·3과 비슷한 시간당 단가. 보드 비용(7~150만)은 별도 청구 또는 포함 협의.

### 시장 가격 비교

| 외주 견적 (시장) | 단가 |
|---|---|
| Hailo-8 + 펌웨어 통합 (소형 SI) | 1,500~3,000만 |
| Jetson Orin + 모델 fine-tuning | 2,000~4,000만 |
| 대기업 R&D 외주 (Samsung/LG급) | 5,000만~ |

→ **1,500만은 시장 하한선 수준**. 단, 사용자 1인 + 자체 인프라(myWiki·Memory MCP)로 비용 절감 가능 → 적정.

### 결론
**1,500만 적정.** 보드 비용은 별도 옵션(별도 청구 / 포함 협의)으로 처리.

---

## 5. 기존 Stage 1·2·3과의 관계

### 종속 vs 독립

| 시나리오 | 가능 여부 | 권장 |
|---|:-:|---|
| Stage 0 + Stage 4 (Stage 1·2·3 생략) | ✅ 가능 | 임베디드 특화 고객 |
| Stage 1·2·3 완료 후 Stage 4 추가 | ✅ 가능 | 풀스택 패키지 |
| Stage 4 단독 (Stage 0 없이) | ⚠️ 비권장 | 인프라 없이 진행 시 통합 어려움 |

→ **Stage 4는 옵션, 독립 신설 가능**. 단 Stage 0(인프라)이 선결 조건 권장.

### 통합 매핑 (Foundry 5층 아키텍처와)
- Stage 0 = Foundry 1층 (Core Services)
- Stage 1 = Foundry 4층 (Analysis) 일부 + 교육
- Stage 2 = Foundry 2~3층 (Data Connection + Ontology)
- Stage 3 = Foundry 5층 (Application)
- **Stage 4 = Foundry 4층 보조 (On-Device 추론) + Application 확장**

---

## 6. 영업 시나리오 (고객 매칭)

### 시나리오 A — 한국기계 (스마트팩토리)
- Stage 0 (인프라) → Stage 1 (교육) → **Stage 4 (Hailo-8 예측정비)**
- 매출 합: 500 + 300 + 1,500 = 2,300만
- Stage 2·3까지 가면: 5,800만 ~ 7,300만

### 시나리오 B — 자영업 / 1인 사업자
- Stage 0 → Stage 1 (교육) — Stage 4 미포함
- 매출 합: 800만 ~ 1,000만

### 시나리오 C — 임베디드 신생기업 / IoT 스타트업
- Stage 0 (선택) + **Stage 4 단독** (ESP32-S3 SLM 탑재)
- 매출 합: 1,500 ~ 2,000만
- **실증 데이터** (2026-05-08 Phase 1A·1B 완료):
  - microGPT 4,192 파라미터 PC 직접 실행 성공 (Loss 3.37 → 2.65, ~3분)
  - INT8 양자화: 4.1 KB / SRAM 520KB의 0.79% (압도적 여유)
  - ESP32-S3 추정 추론 시간: token당 0.1~5 ms (인터랙티브 < 1초)
  - C++ 포팅: 약 500~700줄 (1~2주), ESP-DSP SIMD 활용
  - **차별화 카피**: "1인이 PC에서 직접 검증한 ESP32-S3 SLM 사례 보유"

#### 사례 카드: AI FanStick (응원봉 자체 GPT) — Stage 4 첫 PoC

> **본 사례는 PR·B2B 영업·강의 콘텐츠 트랙 한정**. AI FanStick 응원봉 양산은 별도 트랙(스마트폰 Gemma 2B 하이브리드, `응원봉/newMvp/온디바이스_AI_검토서.md`)으로 잠금. 본 사례는 "ESP32-S3 PoC 보유"의 영업 무기로 활용. 정지선 근거: `myWiki/.../thoughts/2026-05-08_응원봉-온디바이스AI-정지선.md`.

| 항목 | 값 |
|---|---|
| **사례명** | "1만원 칩에 GPT 200줄 — UTTEC 한국 최초 시연" |
| **하드웨어** | ESP32-S3 (1만원 단일 보드) |
| **모델** | Karpathy microGPT 4,192 파라미터 (Python 200줄) |
| **PoC 결과 (Phase 1A·1B, 5/8)** | INT8 4.1 KB / SRAM 0.79% / 추론 0.1~5 ms / token |
| **Phase 2 산출 (보드 도착 후)** | hello_world + C++ 포팅 + LED 시연 영상 1편 |
| **활용 채널** | Stage 4 영업 (한국기계·임베디드 스타트업) / 강사양성 Day 5 / 호오컨설팅 / 인프런 / 변리사 미팅 (특허 보강) |
| **첫 영업 시도 시점** | Phase 2 완료 후 (~7월) |
| **차별화 메시지** | "다른 강사·외주는 보드 검증 없이 제안만. UTTEC는 PC PoC + ESP32-S3 시연 영상 보유" |

**Stage 4 영업 시 사용 시나리오**:
1. 첫 미팅: PC PoC 결과 표 + 모델 매트릭스 시연 (3분)
2. 두 번째 미팅: ESP32-S3 보드 시연 영상 (Phase 2 산출, 5분)
3. 견적 제안: 1,500만 / 4주 (보드 + 모델 fine-tune + 통합 + 매뉴얼)
4. 후속: 강의 사례·특허 보강으로 신뢰 누적

**활용 금지 카피 (응원봉 C2C용 X)**: "응원봉 자체 AI 비서" — 사용자 기대 격차로 클레임 위험. 본 카피는 B2B/PR/강의 청자에게만.

### 시나리오 D — 풀스택 (대형 고객)
- Stage 0 + 1 + 2 + 3 + 4 = **7,300만**
- 26% 매출 상승 (vs 현재 5,800만)

---

## 7. 견적서 / 영업 자료 갱신

### Stage 0 견적서 갱신 (영업/Stage0_Core_Services_견적서.md §5)
"미포함 (옵션)" 섹션에 Stage 4 한 줄 추가:
```
- Stage 4 On-Device AI (1,500만 / 4주):
  Hailo-8 또는 Jetson Orin 또는 ESP32-S3 + 모델 fine-tuning + C++ 추론 엔진 + 통합
```

### myWiki entity 신설
- `entities/uttec-stage-package.md` — 4.5-Stage 패키지 정의 + Stage 0~4 매트릭스

### ontology 갱신 (Memory MCP)
- 기존: `from: "3.5-Stage 패키지", to: "On-Device AI", relationType: "Stage 4 신설 후보이다"`
- 갱신: `relationType: "Stage 4이다"` (신설 후보 → 신설 완료)
- 별도 작업 (Memory MCP MCP 명령 또는 ontology/memory.json 직접 편집)

---

## 8. 다음 액션

| 시점 | 액션 | 담당 |
|:-:|---|:-:|
| 즉시 | Stage 0 견적서 갱신 (Stage 4 옵션 한 줄) | Claude (이번 작업으로 처리) |
| 즉시 | myWiki entity + log + ai-direction 갱신 | Claude (이번 작업으로 처리) |
| T-1주 | 다음 영업 미팅 시 Stage 4 안내 (구두) | 사용자 |
| T-1개월 | 첫 Stage 4 수주 시도 (한국기계 또는 임베디드 스타트업) | 사용자 |
| T-2개월 | 첫 Stage 4 산출물 — 보드 + 모델 + 추론 엔진 | 사용자 + Claude |
| T-3개월 | Stage 4 사례 1건 → 마케팅 자료화 | 사용자 |

---

## 9. 한 줄 결론

> **3.5-Stage → 4.5-Stage 확장 채택. Stage 4 (On-Device AI) 1,500만/4주 신설. Stage 0 견적서 옵션 섹션에 한 줄 추가. 첫 Stage 4 수주 목표는 한국기계(스마트팩토리) 또는 임베디드 스타트업.**

---

## 메타

| 항목 | 값 |
|---|---|
| 검토 시간 | 2026-05-07 14:50 ~ 15:50 (1시간) |
| 결정 | 채택 (4.5-Stage 확장) |
| 매출 임팩트 | 5,800만 → 최대 7,300만 (+26%) |
| 종속 작업 | microGPT 직접 실행 테스트(#18 ✅ 5/8 완료), AI FanStick ESP32-S3 검증 (Phase 2 보드 도착 후) |
| Phase 1A 결과 | Loss 3.37→2.65 / 4192 params / INT8 4.1KB / SRAM 0.79% / 추론 0.5ms·PC |
| Phase 1B 결과 | ESP32-S3 추정 token당 0.1~5ms / C++ 500~700줄 / 1~2주 / 포팅 가능 |
| 권장 모델 | Korean-Small 154K params INT8 (한국어 짧은 응원 응답) |
| myWiki 갱신 | log.md decision, ai-direction.md 판단 로그, entities/uttec-stage-package.md 신설 |
