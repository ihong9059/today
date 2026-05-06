# Ontology와 Obsidian의 관계 — 검토 보고서

> 작성일: 2026-05-06
> 작성자: 홍광선 (UTTEC) — Claude Code 협업
> 보고서 성격: 개념 정리 + 사용자 실 운영 분석 + 도입 가이드
> 분석 대상: `myWiki/second-brain/` (Obsidian) + `myWiki/ontology/memory.json` (Memory MCP)

---

## 0. Executive Summary (한 페이지 결론)

| 질문 | 답 |
|-----|-----|
| **Obsidian이 ontology인가?** | 아니다. Obsidian은 **무타입 wiki 그래프**. ontology는 **타입 있는 의미 그래프**. |
| **Obsidian의 연결에 ontology 개념이 포함되는가?** | 부분적 — frontmatter `type:`, tags가 약한 타이핑 제공. 정식 ontology는 아님. |
| **다른 용도로 봐야 하는가?** | **다른 계층**. Obsidian = 서술·탐색, Ontology = 추론·쿼리. 보완 관계. |
| **사용자(홍광선)는 이미 결합했는가?** | **YES**. myWiki(Obsidian) + Memory MCP(property graph)로 4계층 중 3계층까지 운영 중. |
| **추가로 필요한가?** | 일반 사업: 현재 수준 충분. 의료기기·금융·규제 진입 시 Layer 4(정식 ontology) 검토 필요. |
| **다음 단계?** | (1) Obsidian에 frontmatter `type:` 일관화 (2) Memory MCP-Obsidian 자동 동기화 패턴 정립 (3) Layer 4는 필요 시점에만 |

**핵심 한 줄**: ontology는 "관계에 의미를 부여하는 격자(grid)", Obsidian은 "관계를 자유롭게 늘어놓는 캔버스". **사용자는 두 개를 이미 운영 중이고, 정식 ontology(RDF/OWL)는 필요할 때만 도입한다.**

---

## 1. 보고서의 목적과 범위

### 1.1 사용자 질문 (인용)
> "obsidian의 관계 형성에 있어서 ontology의 개념이 포함되어있는지, 아니면 다른 용도로 생각해야하는지"

### 1.2 보고서가 답하는 4가지
1. Ontology와 Obsidian의 **본질적 차이**
2. Obsidian이 **부분적으로** 가진 ontology적 요소
3. 사용자의 **실제 운영 구조**(myWiki + Memory MCP)가 이 스펙트럼 어디에 위치하는가
4. **추가 도입이 필요한 시점**과 그 방법

### 1.3 분석 방법
- Memory MCP `memory.json` 실 데이터 직접 검토 (20개 entities + 58개 relations 분석)
- Obsidian myWiki/second-brain 운영 패턴 분석
- W3C ontology stack(RDF/RDFS/OWL/SPARQL), schema.org, SNOMED CT 등 표준 참조

---

## 2. Ontology의 4계층 정의

"ontology"는 단일 개념이 아니다. 4가지 다른 의미가 혼용된다:

### 2.1 Layer A — 철학적 ontology (Philosophy)
- **정의**: 존재론 — "**무엇이 존재하는가**"에 대한 학문 (아리스토텔레스 이래)
- **관심**: 개념의 본질, 분류 체계의 정당성
- **예시**: 시간이 존재하는가? 가능 세계는 실재인가?
- **컴퓨팅과의 관계**: 철학적 토대만 제공, 직접 도구 X

### 2.2 Layer B — 정보과학 ontology (Information Science)
- **정의**: "**공유된 개념화의 형식적·명시적 명세**" (Gruber 1993)
- **구성**:
  - **Class** (개념·종): 사람, 부품, 회사
  - **Instance** (개체): 홍광선, MCP1755, UTTEC
  - **Property** (속성): 가격, 출생일
  - **Relation** (관계): 운영한다, 부품이다
  - **Axiom** (공리): "사람은 회사를 운영할 수 있다"
- **표준**: RDF, RDFS, OWL, SPARQL, schema.org
- **추론 가능**: "A isA B, B isA C → A isA C" 자동 도출

### 2.3 Layer C — 도메인 ontology (Domain-Specific)
- **정의**: 특정 분야의 표준 어휘·관계 집합
- **예시**:
  - **SNOMED CT** (의료): 35만+ 의료 개념, 진단·치료 코드
  - **GO** (Gene Ontology, 생물학): 유전자 기능 분류
  - **FIBO** (금융): 금융 상품·기관 분류
  - **schema.org** (웹): Person, Organization, Event 표준
- **사용자 관련**: REVITA가 의료기기로 진입할 경우 SNOMED CT 검토 가치

### 2.4 Layer D — 일상적 의미 (Casual Usage)
- **정의**: 단순히 "**구조화된 분류 체계**"라는 느슨한 의미
- **예시**:
  - Notion DB의 카테고리 = "카테고리 ontology"
  - Obsidian 태그 트리 = "태그 ontology"
- **특징**: 형식 의미론(formal semantics) 없음, 비-기술자가 흔히 사용

### 2.5 Foundry/Palantir에서의 "Ontology"
- **사용자 학습 출처** (Kelly Ontology Hub 채널)
- Foundry Ontology = **객체(명사) + 액션(동사) + 링크(관계)**
- 위 4계층 중 Layer B(약식) + Layer D(운영용) 혼합
- 정식 OWL ontology는 아니고 **property graph + 액션 통합**의 비즈니스 운영 모델

→ 본 보고서에서 "ontology"라 할 때 **Layer B(정식)**와 **Layer D(일상)**을 구분해서 다룬다.

---

## 3. Obsidian의 그래프 모델

### 3.1 기본 모델 (Default)
- **노드**: 마크다운 노트 1개
- **엣지**: `[[wiki link]]`
- **타입**: 없음 (모든 노드는 동일하게 "Note", 모든 엣지는 "links to")
- **방향**: 작성 방향이 있으나, 양방향 자동 등록 (백링크)
- **속성**: 노드에 frontmatter YAML, 엣지에는 없음

→ **그래프 이론적으로**: directed multigraph with optional node attributes (frontmatter), no edge attributes

### 3.2 약한 타이핑 도구 (확장 시)
| 메커니즘 | 제공하는 것 | 한계 |
|---------|-----------|------|
| frontmatter `type:` 필드 | 노드 타입(클래스) | 표준화 X, 자유 텍스트 |
| `tags` (`#영업/정부`) | 다중 분류 | 계층 외 의미론 X |
| frontmatter `links: []` | 명시적 관계 선언 | 관계 타입 X |
| Dataview 쿼리 | 스키마처럼 활용 | 쿼리 시점 검증, 사전 강제 X |
| Templater 템플릿 | 클래스 인스턴스화 | 강제력 X (지키든 말든) |

### 3.3 Obsidian이 명시적으로 **하지 않는** 것
1. **노드 타입 강제**: "Person 타입은 birthday 필드가 필수"  X
2. **관계 타입 강제**: "이 링크는 'employs' 관계여야 한다"  X
3. **카디널리티**: "한 사람은 하나의 회사를 employs"  X
4. **추론**: "A는 B를 운영, B isA 회사 → A는 회사 운영자"  X
5. **검증**: 빈 필드, 잘못된 참조, 순환 등을 자동 차단  X

→ Obsidian은 **자유도 우선**. 형식주의 모자라지만 **글 쓰기에는 최적**.

### 3.4 결론: Obsidian의 위치
- **Layer A·B**: 거리 멂 (정식 ontology 아님)
- **Layer C**: 직접 지원 X (플러그인으로 가능하나 일반적 X)
- **Layer D**: ✅ 충족 (느슨한 분류·연결)

→ "Obsidian의 관계 형성에 ontology가 포함되었느냐"는 **Layer D 의미로는 YES, Layer B 의미로는 NO**.

---

## 4. 스펙트럼: Plain Text → Formal Ontology

자료 구조의 형식성(formality)은 7단계 스펙트럼에 위치한다:

| 단계 | 명칭 | 예시 | 강점 | 약점 |
|:---:|------|------|------|------|
| 1 | Plain Text | 메모장 .txt | 작성 즉시성 | 검색·연결 0 |
| 2 | Wiki Link | Obsidian 기본 | 양방향 자동 연결 | 무타입 |
| 3 | Tagged Wiki | + `#태그` | 약한 분류 | 계층 외 의미론 X |
| 4 | Frontmatter Wiki | + `type:`, `links:` | 클래스·관계 명시 | 검증 X |
| 5 | **Property Graph** | **Memory MCP**, Neo4j | 타입 있는 노드·엣지 | 추론 약함 |
| 6 | Light Ontology | RDF + RDFS | 클래스 계층 + 추론 | 학습 곡선 |
| 7 | Formal Ontology | OWL + SPARQL + reasoner | 강한 추론, 표준화 | 무거움, 진입장벽 |

### 4.1 사용자(홍광선) 위치
- **Obsidian myWiki**: 단계 **3~4** 사이 (frontmatter + tags 일부 사용)
- **Memory MCP**: 단계 **5** (property graph)
- **둘 결합**: 단계 4~5의 하이브리드 — **실용적 균형점**

### 4.2 단계별 진입 비용 vs 효과
```
효과 ▲
     │           ┌── 7. Formal Ontology
     │          ╱     (의료/법무/금융 도메인)
     │         ╱
     │      ┌─5. Property Graph ★ 사용자 현재
     │     ╱   (Memory MCP)
     │   ┌─4. Frontmatter Wiki
     │  ╱
     │┌3. Tagged Wiki
     ├2. Wiki Link
     └1. Plain Text
              비용 ▶
```

→ **5단계까지는 가성비 매우 우수**. 6~7단계는 도메인 요구가 명확할 때만.

---

## 5. 핵심 차이 매트릭스 (Obsidian vs Property Graph vs Formal Ontology)

| 차원 | Obsidian (default) | Property Graph (Memory MCP) | Formal Ontology (OWL) |
|------|:-----------------:|:--------------------------:|:--------------------:|
| 노드 타입 | 없음 (모두 Note) | 자유 문자열 (`entityType: tool`) | 클래스 계층 (`Tool ⊑ Artifact`) |
| 노드 속성 | frontmatter 자유 | `observations[]` 자유 | datatype property 강제 |
| 엣지 타입 | 없음 (모두 link) | 자유 문자열 (`도구로포함한다`) | object property + domain/range |
| 엣지 속성 | 없음 | 없음 (대부분 구현) | reified statement로 가능 |
| 카디널리티 | 강제 X | 강제 X | `min/max` axiom 가능 |
| 추론 | X | X (검색·매칭만) | 자동 (reasoner) |
| 표준화 | 없음 | 없음 (자체 어휘) | RDF/OWL 표준 |
| 쿼리 | 검색·Dataview | API 호출 | SPARQL |
| 시각화 | Graph View | 외부 도구 필요 | Protégé, WebVOWL 등 |
| 학습 곡선 | 1시간 | 반나절 | 1~3개월 |
| 협업 | 마크다운 공유 | JSON 공유 | RDF 표준 교환 |
| 파일 형식 | .md (영구 호환) | .json (자체 포맷) | .ttl/.rdf (표준) |

**해석**:
- Obsidian: **사람의 글쓰기·탐색** 최적
- Property Graph: **AI의 사실 검색·매칭** 최적
- Formal Ontology: **자동 추론·표준 교환** 최적 (의료·정부 인증 등)

---

## 6. Obsidian 안에서 ontology 흔적 찾기

Obsidian은 정식 ontology가 아니지만 **ontology 사고**를 흉내내는 5가지 패턴이 있다:

### 6.1 frontmatter `type:` 필드 → 클래스 시뮬레이션
```yaml
---
type: project | entity | thought | log | adr | issue
---
```
- 효과: Dataview로 `WHERE type = "project"` 같은 쿼리 가능
- 한계: 표준화 X — 사람마다 다른 어휘 쓸 수 있음

### 6.2 계층 태그 → ISA 시뮬레이션
```
#영업/정부지원/디지털배움터
#영업/민간/인프런
#dept/개발
#dept/구매
```
- 효과: 부분-전체(part-of), 분류 표현
- 한계: ISA(is-a)와 part-of 구분 X

### 6.3 frontmatter `links: []` → 명시적 관계
```yaml
links: [revita, ADR-007, MCP1755]
```
- 효과: 본문에 안 쓰여도 관계 선언
- 한계: 관계 **타입** X (어떤 관계인지 모름)

### 6.4 Dataview 쿼리 → 스키마 흉내
```dataview
TABLE status, priority FROM "이슈" WHERE status != "done"
```
- 효과: 동적 인덱스, 미작성 항목 검출
- 한계: 강제 검증 X (있어야 할 필드가 없어도 통과)

### 6.5 MOC (Map of Content) → 분류 체계 흉내
- "교육 채널 MOC"이 9개 채널을 묶어 카테고리 형성
- 한계: 사람이 수동 유지

### 6.6 평가
- 위 5개 패턴을 모두 사용하면 **단계 4(Frontmatter Wiki)**에 도달
- 더 가면 별도 도구(Dataview 강력 활용 / Plugin: Breadcrumbs / 외부 Property Graph)로 이전 필요
- → 사용자(홍광선)는 이미 6.1, 6.2, 6.3을 부분 적용 중

---

## 7. Memory MCP 분석 (사용자 실제 운영)

### 7.1 데이터 구조 (실측)
사용자의 `myWiki/ontology/memory.json` 검토 결과:

```json
{"type":"entity", "name":"UTTEC", "entityType":"company", "observations":[...]}
{"type":"entity", "name":"홍광선", "entityType":"person", "observations":[...]}
{"type":"relation", "from":"홍광선", "to":"UTTEC", "relationType":"운영한다"}
```

**구성 통계** (2026-05-06 기준):
- Entities: 20개
- Relations: 58개
- Observations: ~250+ (entity당 5~30개)

**Entity 타입** (실측):
```
company (1)
person (1)
business-line (2): uttec-edu, 스마트팩토리
business-model (1): 3.5-Stage 패키지
tool (3): n8n, Memory MCP, Obsidian myWiki
infrastructure (1): revita 서버
customer-prospect (2): 한국기계, 태명과학
reference-architecture (1): Foundry 5층
sales-asset (1): Stage 0 견적서
technology-trend (4): On-Device AI, 휴머노이드, SDV, Federated Learning
product (1): AI FanStick
research-output (1): 정부지원 교육사업 채널
pilot-plan (1): 강사 양성 파일럿
```

**Relation 타입** (실측):
```
운영한다, 사업라인이다, 영업모델이다, 참조아키텍처로한다,
도구로포함한다, 1층_2층을대체한다, 3층_온톨로지를70%대체한다,
3층_온톨로지를보강한다, 여기에설치된다, AI용보조저장소역할이다,
고객후보다, Stage1_2시범견적후보다, Stage1콘텐츠를제공한다,
Stage0의영업자료이다, 산출물로포함한다, 시범발송후보다,
영업자료로보유한다, 1층_Core_Services_매핑을포함한다,
핵심_적용_대상_기술_트렌드이다, Track_F_교육_주제_후보이다,
Stage 4_신설_후보이다, 후속분석에서_파생되었다,
BOM_8/9_매칭한다, STM32_nRF52_RPi경험을_활용한다,
Stage5_확장후보이다, 이상감지_패키지로_적용한다,
다음버전_personalization_후보이다, 양면모델로_결합한다, ...
```

### 7.2 Memory MCP의 ontology적 성격

Memory MCP는 **단계 5 (Property Graph)** 에 정확히 위치:

✅ **Ontology에 가까운 부분**:
- Entity에 `entityType` 필드 → 클래스 시뮬레이션
- Relation에 `relationType` 필드 → 타입 있는 엣지
- 사람·도구·고객·제품 등 일관된 분류 체계

❌ **Formal Ontology에 못 미치는 부분**:
- entityType이 자유 문자열 (`"company"`, `"customer-prospect"`가 같은 분류 체계인가?)
- relationType이 한국어 자연어 (표준 어휘 X — `"운영한다"`, `"고객후보다"` 등 자유 작성)
- 추론 X (`"홍광선 운영 UTTEC"` + `"UTTEC 사업라인 uttec-edu"` → `"홍광선 운영 uttec-edu"` 자동 도출 X)
- 카디널리티 X
- 도메인/레인지 X (`"운영한다"`가 person→company만이어야 한다는 보장 X)

### 7.3 Memory MCP의 강점·약점
**강점**:
- AI(Claude)가 빠르게 entity·relation 검색 가능 (`search_nodes`, `open_nodes`)
- 사람보다 짧은 fact 단위로 누적 (관찰 1줄씩)
- Obsidian과 분리되어 있어 마크다운 노트의 자유도 유지

**약점**:
- Obsidian myWiki와 **자동 동기화 X** — 둘 사이 정합성은 사람이 책임
- 표준화 약함 — 시간이 지나면 entityType·relationType이 발산할 위험
- 시각화 X (별도 도구 필요)

### 7.4 사용자의 명시적 입장 (메모리 인용)
사용자 메모리(`reference_memory_mcp.md`)에서:
> "Obsidian = 사람용 1차 저장소 / Memory MCP = AI용 구조화 저장소"

→ **이는 본 보고서의 핵심 결론과 일치**: Obsidian과 ontology(Memory MCP)는 **다른 용도, 보완 관계**.

---

## 8. 사용자 운영 분석 — 4계층 모델 매핑

### 8.1 발견: 사용자는 이미 4계층 시스템을 부분 운영 중

| 계층 | 도구 | 역할 | 사용자 운영 |
|:---:|------|------|-----------|
| L1 Capture | inbox/메모/회의록 | 즉시성, 형식 무시 | ⚪ (작업보고서가 일부 대체) |
| L2 Wiki (서술) | **Obsidian myWiki** | 사람의 글쓰기·탐색 | ✅ 49파일 정원사 운영 |
| L3 Property Graph (구조) | **Memory MCP** | AI 검색·매칭, 사실 누적 | ✅ 20 entities + 58 relations |
| L4 Formal Ontology (추론) | RDF/OWL/SNOMED CT | 자동 추론·표준 교환 | ❌ 미적용 (의료기기 진입 시 검토) |

### 8.2 미러링 분석 (L2 ↔ L3)

**같은 entity가 양쪽에 존재**:
| Entity | Obsidian (L2) | Memory MCP (L3) |
|--------|:------------:|:---------------:|
| UTTEC | `회사소개.md`, `me.md` | `name: UTTEC, entityType: company` |
| 홍광선 | `me.md` | `name: 홍광선, entityType: person` |
| n8n | `entities/n8n.md` | `name: n8n, entityType: tool` |
| 한국기계 | `entities/한국기계.md` | `name: 한국기계, entityType: customer-prospect` |
| ... | ... | ... |

**미러링은 자동 X — 사람이 양쪽 갱신 필요**.

### 8.3 운영상 갭 (gap analysis)

| 갭 | 현 상태 | 위험 | 권장 대응 |
|----|--------|------|----------|
| **자동 동기화 부재** | Obsidian과 Memory MCP를 사람이 따로 갱신 | 시간 지나면 발산 | 동기화 스킬·hook 신설 |
| **entityType 표준 X** | 자유 문자열 사용 | "company" vs "기업" 혼용 위험 | 권장 어휘 목록 정립 |
| **relationType 표준 X** | 한국어 자연어 자유 작성 | 같은 의미 다른 표현 (`"운영한다"` vs `"운영"`) | 30~50개 표준 관계 어휘 정의 |
| **양산제품 entity 부재** | Memory MCP에 일부 entity 누락 | AI 검색 시 누락 | 양산 5제품, 외벽로봇 등 시드 |
| **L4 미적용** | 정식 ontology 없음 | REVITA 의료 진입 시 SNOMED CT 매핑 필요 | 진입 시점에 검토 |

---

## 9. 권장 4계층 하이브리드 아키텍처

### 9.1 권장 모델

```
┌──────────────────────────────────────────────────────┐
│  L1 Capture (속도 우선)                              │
│  - inbox.md, 작업보고서, 회의록 raw                  │
│  - 형식 무시, 일단 던지기                            │
└──────────────────────────────────────────────────────┘
                         ↓ 정리·승격
┌──────────────────────────────────────────────────────┐
│  L2 Obsidian Wiki (서술·탐색)                       │
│  - entities/, thoughts/, projects/                   │
│  - 사람의 글쓰기, 양방향 링크, 그래프 뷰             │
│  - frontmatter type: + tags + links: 적극 사용       │
└──────────────────────────────────────────────────────┘
                         ↓ 사실 추출 (자동/수동)
┌──────────────────────────────────────────────────────┐
│  L3 Memory MCP (AI 검색·매칭)                       │
│  - entities (entityType + observations)              │
│  - relations (typed)                                 │
│  - 짧은 fact 단위 누적, AI가 빠르게 조회             │
└──────────────────────────────────────────────────────┘
                         ↓ 도메인 표준 매핑 (필요 시)
┌──────────────────────────────────────────────────────┐
│  L4 Formal Ontology (필요 시만)                     │
│  - SNOMED CT (의료), FIBO (금융), schema.org (웹)    │
│  - RDF/OWL + SPARQL                                  │
│  - 인증·표준 교환·자동 추론                          │
└──────────────────────────────────────────────────────┘
```

### 9.2 각 계층의 역할 분담

| 작업 | 어느 계층? |
|------|----------|
| 회의록 작성 | L1 → L2 |
| 미팅에서 결정된 ADR | L2 (서술) + L3 (entity·relation 갱신) |
| AI에게 "현재 lead 고객 누구?" | L3 (Memory MCP 검색) |
| 탐색·발산적 사고 | L2 (Obsidian 그래프 뷰) |
| KC 인증 자료 표준 매핑 | L4 (필요 시) |
| 다음 모델 개발 시 이전 자산 검색 | L2 + L3 양쪽 |

### 9.3 동기화 전략 (자동·반자동)

**Option A — 한 방향 동기화 (Obsidian → Memory MCP)**
- Obsidian frontmatter `type:`, `relations:` 작성 시 스킬이 Memory MCP에 자동 반영
- 작업보고서 마감 시 `/work-end`가 동기화 트리거
- 장점: Obsidian이 진실의 소스(SSoT) 유지
- 단점: AI가 Memory MCP에 직접 추가한 fact는 Obsidian에 안 옴

**Option B — 양방향 동기화 (Obsidian ↔ Memory MCP)**
- Obsidian 변경 → MCP 자동
- MCP 변경 → Obsidian entity 노트의 `observations` 섹션 자동 갱신
- 장점: 두 시스템 항상 일치
- 단점: 충돌 처리 필요

**Option C — 명시적 분리 (현재 운영)**
- 사람이 양쪽 수동 관리
- 장점: 단순
- 단점: 발산 위험, 시간 손실

→ **권장: Option A** (Obsidian SSoT + 자동 추출). `/wiki-log` 스킬에 통합 가능.

---

## 10. 실전 적용: REVITA 사례로 4계층 비교

같은 사건(LDO 교체 결정)을 4계층에서 어떻게 표현하는지 비교:

### 10.1 L2 (Obsidian — 서술)
```markdown
# ADR-007 REVITA LDO 교체

## 결정
MP2338GTL buck → MCP1755-3302E LDO

## 근거
- Standby 5μA 만족
- 발열 35°C 상승, SOT-89로 안전
- 디지키 재고 충분

[[revita]] [[MCP1755]] [[MP2338GTL]]
```
→ 사람이 6개월 후 읽어도 맥락 복원 가능. 그래프에서 `revita - ADR-007 - MCP1755` 시각화.

### 10.2 L3 (Memory MCP — 사실 그래프)
```json
// Entities
{"type":"entity","name":"ADR-007","entityType":"decision","observations":[
  "REVITA 동글 LDO 교체 결정",
  "MP2338GTL buck → MCP1755-3302E LDO",
  "결정일 2026-05-06"
]}
{"type":"entity","name":"MCP1755","entityType":"component","observations":[
  "Iq 1.6μA, SOT-89, Iout 300mA",
  "단가 215원 (2026-05-06)"
]}

// Relations
{"type":"relation","from":"ADR-007","to":"MCP1755","relationType":"채택한다"}
{"type":"relation","from":"ADR-007","to":"MP2338GTL","relationType":"대체한다"}
{"type":"relation","from":"MCP1755","to":"revita","relationType":"부품이다"}
```
→ AI에게 "**revita의 모든 부품 결정 보여줘**" 한 마디로 ADR-007이 즉시 검색됨.

### 10.3 L4 (Formal Ontology — 추론 가능)
```turtle
@prefix : <http://uttec.kr/ontology/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

:LDO rdfs:subClassOf :PowerComponent .
:Buck rdfs:subClassOf :PowerComponent .
:MCP1755 a :LDO ;
         :iqCurrent "1.6e-6"^^xsd:double ;
         :package "SOT-89" ;
         :usedIn :REVITA .

:ADR-007 a :Decision ;
         :replaces :MP2338GTL ;
         :selects :MCP1755 ;
         :madeOn "2026-05-06"^^xsd:date .

# Reasoner가 자동 도출:
# :MCP1755 a :PowerComponent  (LDO ⊑ PowerComponent)
# :REVITA :hasComponent :MCP1755
```
→ "**REVITA에 있는 모든 PowerComponent**" SPARQL 쿼리로 자동. 의료기기 인증 시 컴포넌트 목록 자동 생성.

### 10.4 어느 계층이 필요한가?

| 시나리오 | 필요 계층 |
|---------|----------|
| 결정 회상 (6개월 후) | L2 충분 |
| AI에게 "구매 결정 모두 보여줘" | L3 필요 |
| KC 의료 인증 BOM 자동 생성 | L4 필요 |
| 강사양성 워크숍 자료화 | L2 충분 |
| n8n 자동화 워크플로우 트리거 | L3 필요 |

→ **사용자 현재 사업 규모에서 L4는 과도**. REVITA가 의료기기 양산·해외 인증 단계에 가면 검토.

---

## 11. 강점·약점·결정 가이드

### 11.1 Obsidian만 사용 시 (L2)
**강점**: 자유로운 글쓰기, 탐색, 그래프 시각화, 마크다운 영구 소유
**약점**: AI가 사실 단위 검색 어려움, 표준화 X
**언제 충분?**: 1인~소규모, 비규제 도메인, 글쓰기·연결 중심

### 11.2 + Memory MCP 추가 시 (L2+L3, 사용자 현재)
**강점**: AI 검색·매칭 빠름, 사실 누적 효율, Obsidian 자유도 보존
**약점**: 두 시스템 동기화 비용, 표준 어휘 정립 필요
**언제 적합?**: AI 협업 적극, 다수 entity·relation 추적, 1~10인

### 11.3 + Formal Ontology 추가 시 (L2+L3+L4)
**강점**: 자동 추론, 표준 교환(인증·B2B), 도메인 어휘 일관성
**약점**: 학습 곡선 1~3개월, 도구 비용, 운영 부담
**언제 필요?**:
- 의료기기 (SNOMED CT, ICD-10 매핑)
- 금융 (FIBO)
- 정부 인증 (XML/RDF 표준 제출)
- 대규모 협업 (B2B 데이터 교환)
- 자동 추론이 비즈니스 가치 있음

### 11.4 결정 가이드 (Flowchart)

```
Q1. 1인~5인 규모인가?
  YES → L2 + L3 (Obsidian + Memory MCP) 충분
  NO  → 다음

Q2. 도메인이 의료/금융/정부 규제?
  YES → L4 검토 (SNOMED CT, FIBO 등)
  NO  → 다음

Q3. AI에게 사실 검색을 자주 시키는가?
  YES → L3 필수 (Memory MCP)
  NO  → L2만으로도 OK

Q4. B2B 데이터 교환·인증 자동화가 필요한가?
  YES → L4 검토
  NO  → L2+L3 유지
```

→ **사용자 현재**: Q1 YES → L2+L3 충분. Q2의 REVITA 의료기기 진입 시 재평가.

---

## 12. 단계적 도입 로드맵

### 12.1 Phase 1 (즉시, 1주 — 비용 0)
**목표**: Obsidian의 ontology 흔적 강화

- [ ] frontmatter `type:` 필드 표준 어휘 정립 (10~15개)
  - 권장: `project, entity, thought, log, adr, issue, voc, bom, gate, test, customer, vendor, component, person, organization`
- [ ] `tags`의 계층 어휘 정립
  - 권장: `#dept/{영업,구매,개발,생산,품질,서비스}`, `#stage/{기획,설계,시제,파일럿,양산}`, `#product/{revita,...}`
- [ ] 모든 entities/*.md에 frontmatter 일관 적용
- [ ] Dataview 쿼리 5~10개 정립 (인벤토리 자동화)

### 12.2 Phase 2 (1개월 — 비용 0)
**목표**: Memory MCP 표준 어휘 정립 + 동기화 패턴

- [ ] entityType 표준 어휘 목록 (현재 사용 중인 것 기반 + 빈 곳 채움)
- [ ] relationType 표준 어휘 목록 (30~50개 — 영어/한국어 일관 결정)
  - 권장 (도메인 무관): `isA, partOf, has, uses, decides, replaces, supersedes, references, locatedAt, ownedBy, employs, customerOf, vendorOf, deployedTo, blockedBy, dependsOn`
  - 권장 (사용자 도메인): `사업라인이다, 고객후보다, 부품이다, 결정한다, 대체한다`
- [ ] `/wiki-log` 스킬에 Memory MCP 자동 갱신 통합 (Option A)
- [ ] `/wiki-lint`에 entityType/relationType 표준 검사 추가

### 12.3 Phase 3 (3개월 — 선택)
**목표**: Property Graph 활용 고도화

- [ ] entity 시드 추가 (양산제품·외벽로봇·부품 등 누락 항목)
- [ ] Memory MCP 시각화 도구 도입 (간단한 D3.js HTML 또는 외부)
- [ ] AI 질의 패턴 정립 (예: "**현재 진행 중인 ADR 모두**")

### 12.4 Phase 4 (REVITA 의료기기 진입 시)
**목표**: L4 Formal Ontology 검토

- [ ] SNOMED CT 의료 도메인 진입 검토
- [ ] BOM 자동 생성 + 인증 매핑
- [ ] OWL/Protégé 학습 (1~2주)
- [ ] **결정 보류 가능**: 사업 규모가 정당화할 때만

---

## 13. 결론

### 13.1 사용자 질문에 대한 직접 답변

**Q1. Obsidian의 관계 형성에 ontology의 개념이 포함되어 있는가?**
- **Layer D 의미(느슨한 분류)**: 부분적으로 YES. frontmatter `type:`, tags, 계층 태그가 ontology적 사고를 흉내낸다.
- **Layer B 의미(정식 ontology)**: NO. Obsidian은 무타입 wiki 그래프이며, 클래스 계층·관계 타입·추론·제약이 없다.

**Q2. 다른 용도로 봐야 하는가?**
- **YES, 다른 계층으로 본다**. Obsidian = **서술·탐색·글쓰기 도구** (Layer 2). Ontology = **추론·표준 교환·AI 검색 도구** (Layer 3~5).
- 두 도구는 **경쟁 관계 X, 보완 관계**.
- **사용자는 이미 두 가지를 결합 운영 중**: myWiki(L2) + Memory MCP(L3).

### 13.2 사용자 현재 상태 평가
- **L2(Obsidian)**: ✅ 49파일 정원사 운영, 권장 수준
- **L3(Memory MCP)**: ✅ 20 entities + 58 relations, 권장 수준 (표준 어휘 정립으로 강화 가능)
- **L4(Formal Ontology)**: ❌ 미적용 (현 사업 규모에서 적정)
- **종합**: 1인~소규모 사업자가 도달 가능한 **거의 최적의 구조**

### 13.3 다음 행동 권고 (우선순위)

| 우선 | 액션 | 비용 | 효과 |
|:---:|------|:---:|------|
| 🔴 1 | Obsidian frontmatter `type:` 표준 어휘 10~15개 정립 + 일괄 적용 | 4시간 | 즉시 — Dataview 쿼리 활성화 |
| 🔴 2 | Memory MCP entityType/relationType 표준 어휘 목록 작성 | 2시간 | 발산 방지 |
| 🟠 3 | `/wiki-log`에 Memory MCP 자동 동기화 통합 | 1일 | 두 시스템 정합성 자동 |
| 🟡 4 | 누락 entity 시드 (양산제품·외벽로봇 등) | 2시간 | AI 검색 완전성 |
| 🟢 5 | L4 Formal Ontology 검토 보류 (REVITA 의료 진입 시 재평가) | — | — |

### 13.4 한 줄 결론
> **Obsidian은 ontology가 아니다. 그러나 ontology와 함께 쓰면 강력하다. 사용자는 이미 그 결합을 실현하고 있고, 표준 어휘 정립과 자동 동기화를 통해 한 단계 더 강화할 수 있다.**

---

## 14. 부록 A — Memory MCP ↔ Obsidian 동기화 패턴 예시

### 14.1 자동 추출 규칙 (Phase 2 구현 시)

**Obsidian frontmatter → Memory MCP entity**:
```yaml
---
title: MCP1755
type: component             ← entityType: component
created: 2026-05-06
links: [LDO, REVITA]        ← relations 후보
specs:
  iq: 1.6μA                 ← observations 후보
  package: SOT-89
  cost: 215원
---
```
→ 스크립트가 frontmatter 파싱 후 Memory MCP 호출:
```javascript
mcp.create_entity({
  name: "MCP1755",
  entityType: "component",
  observations: ["Iq 1.6μA", "package SOT-89", "단가 215원"]
})
mcp.create_relation({from: "MCP1755", to: "LDO", relationType: "isA"})
mcp.create_relation({from: "MCP1755", to: "REVITA", relationType: "사용된다"})
```

### 14.2 표준 어휘 후보 (Vocabulary)

**EntityType 표준 (15개 권장)**:
```
person, organization, company, customer, vendor,
product, component, tool, infrastructure, asset,
project, decision, issue, document, event
```

**RelationType 표준 (한국어, 30개 권장)**:
```
일반: isA(이다), 부분이다, 가진다, 사용한다
운영: 운영한다, 보유한다, 고용한다, 협력한다
영업: 고객이다, 견적발송한다, 계약한다, 납품한다
개발: 채택한다, 대체한다, 부품이다, 의존한다
프로젝트: 결정한다, 차단한다, 후속이다, 검증한다
시간: 이전이다, 이후이다, 동시이다
```

### 14.3 발산 방지 lint 규칙
- 새 entityType이 표준 외이면 경고
- 새 relationType이 표준 외이면 경고
- 동의어 자동 매핑 ("회사" → "company")

---

## 15. 부록 B — 추가 학습 자료

### 15.1 Ontology 입문
- "Ontology Engineering" (Asunción Gómez-Pérez) — 표준 교과서
- W3C OWL 2 Primer (https://www.w3.org/TR/owl2-primer/)
- schema.org (https://schema.org) — 가벼운 시작점

### 15.2 Property Graph
- Neo4j Cypher 가이드 — Memory MCP보다 강력한 property graph
- Memory MCP 자체 (`@modelcontextprotocol/server-memory`)

### 15.3 도메인 ontology
- SNOMED CT (https://www.snomed.org) — 의료
- FIBO (https://spec.edmcouncil.org/fibo/) — 금융

### 15.4 Obsidian + 강한 타이핑
- Obsidian Plugin: Breadcrumbs (계층 관계 시각화)
- Obsidian Plugin: Excalidraw (시각적 ontology 그리기)
- Dataview 고급 활용 (https://blacksmithgu.github.io/obsidian-dataview/)

---

## 16. 핵심 한 페이지 요약 (재확인)

```
Obsidian = 무타입 wiki 그래프 (Layer 2, 서술·탐색)
Ontology = 타입 있는 의미 그래프 (Layer 3~5, 추론·검색)

  ↓ 두 개는 ↓
  
경쟁 X, 보완 ✅

  ↓ 사용자는 ↓
  
Obsidian myWiki (L2) + Memory MCP (L3) 결합 운영 중 = 거의 최적

  ↓ 강화 방향 ↓
  
1. frontmatter type: 표준화 (Obsidian 안에 ontology 흔적 강화)
2. relationType 표준 어휘 (Memory MCP 발산 방지)
3. /wiki-log 자동 동기화 (정합성 자동)

  ↓ 향후 ↓
  
REVITA 의료기기 진입 시 → SNOMED CT (L4) 검토
그 외 → 현재 수준 유지가 정답
```

---

> 이 보고서는 사용자(홍광선)의 실제 myWiki + Memory MCP 데이터 분석에 기반하여 작성되었으며, 결론은 **사용자의 현재 운영이 1인~소규모 사업자에게 거의 최적의 구조**임을 확인합니다. 강사양성 파일럿 Day 4의 "위키 운영 + AI 메모리 결합" 차별화 콘텐츠로 그대로 재가공 가능합니다.
