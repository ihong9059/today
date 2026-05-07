---
title: UTTEC 영업 패키지 (4.5-Stage)
type: entity
created: 2026-05-05
updated: 2026-05-07
tags: [영업, 패키지, Stage, foundry, business-model]
links: [영업전략, Stage0_Core_Services_견적서, On-Device AI, Foundry 5층 아키텍처]
---

# UTTEC 영업 패키지 (4.5-Stage)

## 한 줄 정의

UTTEC의 단계별 영업 모델. **Foundry 1/100 가격 재현** 컨셉 + 단계별 도입으로 고객 부담 최소화.

## 진화 이력

| 날짜 | 이벤트 | 패키지 명 |
|---|---|---|
| 2026-05-05 | Stage 0 견적서 1페이지 작성 (한국기계·태명과학 발송) | 3.5-Stage 패키지 |
| 2026-05-07 | **Stage 4 (On-Device AI) 신설 결정** | **4.5-Stage 패키지** |
| (검토 중) | Stage -1 (자영업 진입 단계) 추가 후보 | (미정, 5.5-Stage 또는 별도 funnel) |

## Stage 매트릭스 (4.5-Stage)

| Stage | 단가 | 기간 | 산출물 | Foundry 매핑 |
|:-:|:-:|:-:|---|---|
| **Stage 0** | 500만 | 1주 | Core Services Starter Pack (Tailscale + Git + Obsidian + n8n) | 1층 (Core Services) |
| **Stage 1** | 300만 | 1주 | 13개 AI 도구 가이드 + 5 Track 코스 (교육) | 4층 (Analysis) 일부 |
| **Stage 2** | 2,500만 | 1.5개월 | 도메인 wiki 30~50p + n8n 워크플로우 5종 | 2~3층 (Data + Ontology) |
| **Stage 3** | 2,500만 | 1.5개월 | demo_live.html 진화형 운영 앱 | 5층 (Application) |
| **Stage 4** | **1,500만** | **4주** | **On-Device AI 보드 + 모델 + C++ 추론 + 통합** | **4층 보조 + Application 확장** |
| **Total** | **7,300만** | (단계별) | 풀 패키지 | Foundry 1~5층 풀 |

## 단가 의미 ("4.5"의 정의)

```
Stage 0 (0.5) + Stage 1 (1) + Stage 2 (1) + Stage 3 (1) + Stage 4 (1) = 4.5
```

→ Stage 0이 1주 단발(시범) 성격이라 0.5로 카운트, 나머지는 본격 단계로 1씩.

## 핵심 차별화 메시지

> **"Foundry급 인프라를 1/100 가격에 구축합니다."**

Palantir Foundry 라이선스 연 수억~수십억 → UTTEC 4.5-Stage 풀 7,300만.

## 영업 흐름 (단계별 도입)

```
[잠재 고객 발굴]
  ↓
[Stage 0 견적서 발송] (영업/Stage0_Core_Services_견적서.md)
  ↓
[Stage 0 시범 운영] (1주 500만)
  ↓ (만족 시)
[Stage 1·2·3·4 단계별 도입] (총 6,800만)
  ↓ (불만족 시)
[1주 후 모든 자료 인계 후 종료]
```

→ **Stage 0이 진입 장벽을 낮춤** (1/10 가격 + 1주 단기), 그 후 단계별 확장.

## Stage별 산출물 상세

### Stage 0 — Core Services Starter Pack (500만)
- 산출물: Tailscale ACL + Git 표준 저장소 + Obsidian Vault + n8n 자체 호스팅 + Slack 통합 + 매뉴얼·영상
- 자세히: `영업/Stage0_Core_Services_견적서.md`

### Stage 1 — 교육 (300만)
- 산출물: 13개 AI 도구 가이드 + 5 Track 코스 (Track A~E) + 영상 강의
- 컨텐츠 출처: `aiStudy/introductionAi/` 13가이드

### Stage 2 — 위키 + 워크플로우 (2,500만)
- 산출물: 도메인 wiki 30~50 페이지 + n8n 워크플로우 5종 (영업·재고·CS·생산·품질 중)

### Stage 3 — 운영 앱 (2,500만)
- 산출물: demo_live.html 진화형 운영 앱 (단일 HTML 파일 1개로 시작 → 진화)

### Stage 4 — On-Device AI (1,500만, 신규 5/7)
- 산출물: 보드(Hailo-8/Jetson Orin/ESP32-S3) + 모델(SLM/microGPT 변종) + C++ 추론 엔진 + 기존 Stage 0 통합
- 자세히: `영업/Stage4_OnDeviceAI_검토.md`

## 영업 시나리오

### 시나리오 A — 한국기계 (스마트팩토리)
- Stage 0 → Stage 1 → Stage 4 (Hailo-8 예측정비)
- 매출: 2,300만 ~ 풀스택 7,300만

### 시나리오 B — 자영업·1인 사업자
- Stage 0 → Stage 1
- 매출: 800만

### 시나리오 C — 임베디드 신생기업
- Stage 0 (선택) + Stage 4 단독
- 매출: 1,500 ~ 2,000만

### 시나리오 D — 풀스택 (대형 고객)
- Stage 0 + 1 + 2 + 3 + 4 = 7,300만

## 고객 후보 (현재)

| 고객 | 단계 | 상태 |
|---|---|---|
| 한국기계 (15억 협력 진행 중) | Stage 0 PDF 발송 (5/5) | 회신 대기 |
| 태명과학 (스마트팩토리 제안 진행) | Stage 0 PDF 발송 (5/5) | 회신 대기 |

## 관련 페이지
- [[영업전략]] — 3대 사업 라인 + 정부지원 매트릭스 + 경쟁 분석
- [[Stage0_Core_Services_견적서]] — 1페이지 영업 자료
- [[On-Device AI]] — Stage 4 핵심 기술
- [[Foundry 5층 아키텍처]] — 참조 아키텍처
- [[uttec-edu]] — Stage 1 교육 콘텐츠 출처
- [[Memory MCP]] — Stage 0~2 도구
- [[Obsidian myWiki]] — Stage 0 핵심 도구

## 메타

| 항목 | 값 |
|---|---|
| 첫 견적서 발송 | 2026-05-05 (한국기계·태명과학) |
| 첫 매출 | (대기) |
| 매출 임팩트 (Stage 4 신설로) | +1,500만 (+26%, 풀스택 시) |
| 다음 갱신 | Stage -1 (자영업 진입 단계) 검토 시 또는 첫 수주 시 |
