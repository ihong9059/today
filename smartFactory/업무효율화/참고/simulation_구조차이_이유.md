---
title: simulation 예제가 Karpathy LLM Wiki 구조를 따르지 않는 이유
type: analysis
created: 2026-05-04
관련: [[../../myWiki/second-brain/CLAUDE]], [[llm-wiki-ko]]
---

# simulation 예제가 Karpathy LLM Wiki 구조를 따르지 않는 이유

`myWiki/second-brain/`은 Karpathy LLM Wiki 패턴(Raw/Wiki/Schema 3계층 + Ingest/Query/Lint)을 따르지만, `smartFactory/업무효율화/`의 simulation 예제(태명과학, 한국기계)는 **의도적으로 다른 구조**를 사용한다.

## 1. 두 위키의 목적이 본질적으로 다르다

| 항목 | second-brain | 업무효율화 simulation |
|------|--------------|----------------------|
| 주체 | 나/UTTEC (1인칭) | 고객사 (3인칭, 태명과학/한국기계) |
| 목적 | 자기 이해 + 의사결정 (내부 시스템) | 고객 응대 (외부 서비스) |
| 사용자 | UTTEC 본인 + LLM | 고객사 직원 + 고객사 AI 컨설턴트 |
| 데이터 성격 | 경험·판단·인사이트 (주관) | 제품 카탈로그·공정·사례 (객관) |
| 수정 주기 | 매일 (ingest 사이클) | 제품 라인업 변경 시점 |
| 핵심 가치 | 복리 성장 (A+B→C 인사이트) | 도메인 룩업 정확도 |

**핵심 차이**: second-brain은 "나는 누구인가, 어디로 갈 것인가"를 다루는 정체성 위키이고, simulation은 "이 장비는 무엇이고 누구에게 어떻게 팔 것인가"를 다루는 도메인 위키다.

## 2. Karpathy 패턴이 simulation에 부적합한 이유

### Raw/Wiki/Schema 3계층이 불필요
- Karpathy 패턴: 원본 정보(raw)를 LLM이 가공(wiki)하여 정원사처럼 큐레이션
- simulation: 데이터가 **이미 정제된 카탈로그 형태**로 들어옴 — 가공 단계 자체가 의미 없음
- 장비 사양·재질 호환표·공정도는 추측이나 해석의 여지가 없는 **사실 데이터**

### log.md(시간순 기록)이 불필요
- Karpathy 패턴: 시간순 ingest/use/query 로그가 복리 인사이트의 재료
- simulation: 제품 정보는 시간이 흘러도 변하지 않음 (단종 시 일괄 수정)
- 고객 상담 이력은 별도 CRM에 들어가야지 위키 log에 쌓을 일이 아님

### thoughts/(인사이트)가 불필요
- Karpathy 패턴: thoughts/는 "A+B→C" 패턴 발견을 기록하는 핵심
- simulation: AI는 인사이트를 도출하는 게 아니라 **정확한 룩업**을 해야 함
- 인사이트가 필요한 영역(영업 전략·시장 분석)은 second-brain의 영역

### identity 페이지(me/goals/strengths/gaps)가 불필요
- 고객사 자체에 대한 자기 이해는 고객사 내부 문서로 들어가야 함
- UTTEC이 만드는 simulation은 고객사의 외부 응대 도구이지 고객사의 자아가 아님

## 3. simulation이 채택한 구조의 합리성

### 도메인 카테고리 구조 (장비/부속품/공정/사례/템플릿/FAQ)
- 고객 문의 패턴에 1:1 매핑
  - "이 시료에 어떤 장비?" → 장비/ + 시료/
  - "재질은 뭐가 좋아요?" → 부속품/재질/
  - "비슷한 사례 있어요?" → 사례/
  - "견적 좀 보내줘요" → 템플릿/
- LLM이 **답변 경로를 즉각 결정**할 수 있는 구조

### CLAUDE.md를 "역할 정의서"로 사용
- second-brain의 CLAUDE.md는 **스키마/규칙** 정의
- simulation의 CLAUDE.md는 **AI 페르소나·필수 확인 항목·답변 워크플로우** 정의
- 같은 파일명이지만 역할이 다름 — simulation은 시스템 프롬프트에 가까움

### 호환 매트릭스(`_부속품_호환_매트릭스.md`)
- Karpathy 패턴에는 없는 형식이지만 도메인에 필수
- 장비×재질×용량 조합의 정합성을 LLM이 환각 없이 답하게 만드는 안전장치
- 룩업 위키에는 이런 **불변 진실 테이블**이 핵심

### Obsidian Dataview 활용
- index.md를 dataview 쿼리 대시보드로 구성 (`TABLE FROM "장비" WHERE type = "equipment"`)
- frontmatter type 필드로 자동 분류 — 카탈로그형 데이터에 최적
- second-brain은 시간순 log.md가 그 역할을 하지만, simulation은 dataview가 더 적합

## 4. 결론: 같은 위키 아키텍처를 강제하면 안 되는 이유

| 만약 simulation에 Karpathy 패턴을 강제하면 | 결과 |
|---|---|
| log.md 도입 | 매일 갱신할 내용 없음 → 죽은 파일 |
| raw/wiki 분리 | 한 번 정리한 카탈로그를 두 곳에 중복 보관 |
| thoughts/ 도입 | LLM이 인사이트를 강제 생성 → 환각 위험 |
| me/goals/strengths | 고객사 정체성을 UTTEC이 임의로 정의 → 월권 |
| ingest/query/lint 사이클 | 제품 데이터에 사이클 자체가 무의미 |

**판단 원칙**: 위키 구조는 **목적·사용자·데이터 성격**의 함수다. 좋은 패턴이라고 모든 위키에 똑같이 적용하면 안 된다. Karpathy 패턴은 **자기 이해형 위키**(개인의 second brain)에 특화된 설계이고, **도메인 룩업형 위키**(고객사 컨설팅 봇)에는 도메인 카테고리 + 호환 매트릭스 + Dataview 패턴이 더 적합하다.

## 5. 두 위키가 만나는 지점

simulation 자체는 Karpathy 패턴을 따르지 않지만, **simulation을 만든 경험·판단·시장 인사이트**는 second-brain의 thoughts/, projects.md, 영업/UTTEC_사업분야_종합.md에 ingest 되어야 한다.
- "태명과학에 호환 매트릭스 도입했더니 응대 정확도가 올랐다" → thoughts/
- "한국기계는 5 Track으로 분류했다" → projects.md
- 이것이 두 위키가 분리되어 있으면서도 연결되는 방식

## 참고
- second-brain CLAUDE.md: `myWiki/second-brain/CLAUDE.md`
- 태명과학 CLAUDE.md: `smartFactory/업무효율화/태명과학/CLAUDE.md`
- 한국기계 CLAUDE.md: `smartFactory/업무효율화/한국기계/CLAUDE.md`
- LLM Wiki 원본: `작업보고서/checkFile/llm-wiki-ko.md`
