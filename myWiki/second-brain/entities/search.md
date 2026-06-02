---
title: search vault (myWiki AI 검색·정리 web)
type: entity
created: 2026-05-21
updated: 2026-06-01 Phase 4.3 megasession ✅ 완결 (9 패치 통합 — A·B·C·D today rescue 강화 + E·F·H·I·J answer source 일관성, G는 Phase 4.2 선행 / memory 44 files + session 최근 3개 인덱싱 / time-oriented score 15배 향상 / 외부 mode turn-off Phase 5/6 candidate gap)
tags: [웹, 검색, 위키노출, vault, Tier3, multi-agent, search-claude, prompt-driven, claude-api, FastAPI, React, WebSocket, 세션모델, --resume, 핸드오프]
links: [me, skills, uttec-homepage, claude-code, memory-mcp, obsidian-시리즈-사업화, ai-education-web, 2026-05-22_claude-max-cli-subprocess-pattern]
---

# search vault (myWiki AI 검색·정리 web)

## 한 줄 정의
**myWiki second-brain (38일치 누적 자료) 위에서 동작하는 prompt-driven 검색·정리·요약 web 서비스**. 사용자가 자연어 질의 → Claude API + wiki 자료 검색 → web 출력. 2026-05-21 **9번째 Tier 3 vault 분리** + **search-claude 9th multi-agent 합류**.

## 2026-06-01 — Phase 4.3 megasession ✅ 완결 (9 패치 통합) ⭐⭐⭐⭐

search-claude 카드 2장 일괄 흡수 (#2026-06-01-001 + #2026-06-01-002, in_reply_to mywiki 2026-05-23-001/002 megasession).

### A·B·C·D today rescue 강화 (카드 #001)

- **A**: `_TIME_KEYWORDS` 14 신규 확장 ("할일/할 일/할거/todo/tasks/오늘 일정/뭐 해야/스케줄/다음에 할" 등) → 자연 표현 6 query 모두 time_oriented=True
- **B**: `score = base * authority + chunk_richness + _date_bonus * 0.15` (기존 0.05 × 3) + 작업보고서 authority 디부스트 0.6 → time-oriented 시 1.0 → today 작업보고서 date_bonus = 20.0 × 0.15 = **3.0** (압도적 1순위)
- **C**: 모든 query에 `_today_paths(cache.chunks)` rescue 항상 포함 (time_oriented False여도 후보 풀 누락 차단)
- **D**: SourceHit `base_score/authority/date_bonus/chunk_richness` + QueryResponse `time_oriented` 노출

**실측**: "오늘 할일을 알려주세요" top-1 score **3.584** / margin **~1.7~1.8** (5/22 사고 0.11 → **15배 향상**). pytest 19/19 통과.

### E·F·H·I·J answer source 일관성 (카드 #002, G는 Phase 4.2 선행 완료)

- **E** ⭐⭐ — `.claude/memory/*.md` **44 files** 인덱싱 (memory_root config 추가). 위시캣 회사명 마스킹 룰 검색 가능
- **F** ⭐⭐ — `.claude/sessions/session_*.md` 최근 3개 인덱싱 (work-end 유지 3개 정책 일치)
- **H** — SYSTEM_PROMPT § "답변 원칙 (Phase 4.3 — H)" 5 원칙 추가 (myWiki=5-vault main hub / 작업보고서·메모리·세션 종합 / 시간성 query 다중 참조 / 결단 대기 별도 § 강조 / 외부 도구 언급 금지)
- **I** — context 확장 `default_max_hits 8→12` / `max_chars_per_hit 2000→4000`
- **J** ⭐⭐⭐ — `test_answer_consistency.py` 신설, 19 tests all PASS

### 답변 정합성 검증 결과

| query | top-3 paths | 비고 |
|---|---|---|
| "오늘 할일" | 2026-06-01_작업보고서 + 5/31 + 5/26 | 작업보고서 carry-over ✓ |
| "위시캣 회사명 노출 정책" | 위시캣활동·정부R&D실증사업·6/1 작업보고서 | entity + 메모리 dotted line ✓ |
| "다음에 할 일" | 6/1·5/31·5/26 작업보고서 | A 신규 키워드 작동 ✓ |

### 사용자 결단 carry

- **메모리 source 노출 (E)**: dogfooding-via-self 정체성 D → 본인용 OK. **단 외부 deploy 시 turn-off 옵션 필요** (Phase 5/6 candidate, memory `project_search_external_mode_gap.md` 박제 완료)
- **모델 비용 (G)**: sonnet default 유지. 결단 query만 opus 분기 검토 (Phase 5 category 시스템 연계)
- **session 인덱싱 범위 (F)**: 최근 3개 (work-end 유지 정책 일치)

### Phase 4.3 의미

- **vault scope 결함 진단 → main vault 능동 카드 발송 → search-claude 흡수 megasession 완결** 정책 검증 사례 (cross-vault feedback loop 첫 1회 완결)
- **myWiki ↔ search 답변 일관성 결정타** — 메모리·세션 인덱싱이 격차의 본질
- **검색 정확도 vs 디부스트 균형 — time-oriented 분기 패턴** (A·B의 핵심 디자인 결단)

자세히 [[2026-06-01_search-Phase4.3-time-oriented-boost]] (신규) + [[gaps]] § search 외부 mode turn-off 미구현 + [[ai-direction]] § 정체성 D dogfooding → 메모리/세션 인덱싱 사례.

---

## 2026-05-23 야간 — Phase 3·4 ✅ + Phase 4.2 G 패치 정정 + 정체성 D 박제 ⭐⭐

### Phase 3 ✅ — UI 다듬기 (commit `0107578`)
- shadcn/ui 6 컴포넌트 (Button/Card/Textarea/Badge/Skeleton/Tooltip 수동 도입, CLI 안 씀)
- 360/768/1280 viewport 대응 + TokenGauge header+inline + HandoffToast safe-area
- a11y label + Tab navigation + WCAG AA
- deps 2개만 (class-variance-authority + @radix-ui/react-tooltip)

### Phase 4 ✅ — 검색 정확도 hybrid 임베딩 (commit `44be3c6`)
- 로컬 sentence-transformers multilingual MiniLM L12 v2 (384dim, CPU)
- heading 기반 chunking 3단계 fallback (paragraph → line → hard cut)
- 디스크 캐시 ~9MB pkl + mtime incremental
- hybrid scoring α=0.7 (sem 70% + lex 30%) — S8 평가셋 튜닝 결과 (recall@5 0.396)
- 첫 빌드 257s (4406 chunks, 260 파일) / incremental 75ms / warm query ~100ms

### Phase 4.2 ✅ — 모델 표시 버그 fix ⭐ (commit `8f0dba9`, 5/23)

**정정 박제**: 이전 mywiki 5/22 야간 인식 "haiku-4-5 회귀" → **실제는 sonnet-4-6 정상**. 표시 버그였음.

- 버그: `claude_client.py:110` `next(iter(model_usage.keys()))` (Python 3.7+ dict insertion-ordered, claude CLI 가 haiku 호출 먼저 등록 → first key = haiku → UI 표시만 깨짐)
- 실제 main 응답: 줄곧 `claude-sonnet-4-6` (cache read 2131 + create 3818 = main session)
- haiku 는 CLI 내부 보조 (routing, cost 비율 sonnet:haiku = 37:1)
- Fix: `_pick_main_model()` 헬퍼 (substring 매칭 → cache 사용량 fallback). 5 단위 케이스 + REST 통합 검증 ✅

### 정체성 D 박제 (사용자 결단)
> **D 옵션 (dogfooding-via-self)**: 1차 사용자 = 본인 / 궁극 목표 = 외부 회사 web 서비스 prototype / 본인이 dogfooder

→ memory·session 인덱싱 (E·F) 본인용 적용 (격차 줄임) / 외부 deploy 시 turn-off 옵션 / web UX·검색 정확도·category 라우팅은 외부 사용자 기준 평가.

### 답변 품질 격차 재진단 (모델 → 컨텍스트로)
| 차원 | 격차 | 패치 |
|---|---|---|
| 컨텍스트 | top-8 hits × 2KB = 16KB max (vs mywiki 수십~수백 KB) | A·B·C·D·H·I |
| **메모리 인덱싱 0%** | mywiki 30 files auto-load | **E** ⭐ |
| **세션 carry-over 인덱싱 0%** | mywiki Read 자유 | **F** ⭐ |
| 모델 | sonnet-4-6 정상 | ~~G~~ ✅ Phase 4.2 fix 완료 |

→ Phase 4.3 megasession E·F·A·B·C·D·H·I·J 9 패치 일괄 (G 제외) 진행 예정.

## 위치 / Git
- **실제 위치**: `C:\todo\search\` (5/21 신설)
- **GitHub**: `ihong9059/search` (Private, 5/21 신설 예정 — Phase 0-11)
- **search 측 junction**: `raw/myWiki` → `C:\todo\today\myWiki`, `raw/uttecHome` → `C:\todo\uttecHome`
- **myWiki 역방향 junction**: `raw/search` + `second-brain/raw/search` → `C:\todo\search\`
- **Multi-agent 식별자**: `search-claude` (5/21 9th 합류)

## Tier 분류
- **Tier 3 vault** (myWiki/CLAUDE.md § 3-Tier 정책 기준)
- 자체 코드베이스 (backend + frontend) + ≥ 6개월 장기 + 멀티호스트 (로컬 → DigitalOcean droplet) → 3축 모두 Tier 3 신호
- 9번째 vault (제품 5 [onDevice/wishket/revita/n8n/shield] + 사업 1 [today/myWiki] + 창업 1 [lemonLabs] + 영업 1 [uttecHome] + **사용자 노출 1 [search]** ⭐ 트랙 첫 사례)

## 기술 스택
- **Backend**: Python FastAPI + Anthropic SDK + prompt caching (myWiki 자료 캐싱 시 비용 90% 절감)
- **Frontend**: Vite + React + TypeScript + Tailwind CSS + shadcn/ui (멋있게 보이는 요구사항)
- **Wiki 접근**: junction `raw/myWiki` + `raw/uttecHome` (읽기 전용)
- **검색**: 초기 grep 기반 → 임베딩(ko-sbert 또는 Anthropic embeddings) 후보
- **포트**: 로컬 backend 8888, frontend dev 5173

## 핵심 동작

```
사용자 질의 (web prompt 입력창)
  ↓
backend POST /api/query
  ↓
1. myWiki/uttecHome grep + entity 인덱싱
2. 관련 자료 추출 (top-N)
3. Claude API 호출 (system prompt + retrieved context + user query)
4. 응답 정리 + 출처 link
  ↓
frontend 출력창 표시 (markdown + 출처 카드)
```

## 사업 가치

1. **myWiki 자산 외부 노출**: 38일치 누적 (entities 50+ / thoughts 분기별 / 영업·기술·사례) → 사용자가 활용
2. **강사양성·obsidian 시리즈 강의 자산**: 직접 데모로 활용 가능 (수강생이 자기 wiki 위에 동일 구조 구축 학습)
3. **위시캣 영업 자산**: "obsidian + Claude API 검색 시스템 구축" 신규 supply 영역
4. **회사 차별화**: UTTEC 자체 운영하는 second-brain 검색 시스템 = 다른 1인 컨설팅과 차별점

## 연관 entity

- [[uttec-homepage]] — UTTEC 공식 web. search vault는 별도 독립 서비스이나 future cross-link 후보 (uttecHome `/search` 라우트 또는 별 도메인)
- [[claude-code]] — Anthropic SDK 사용. prompt caching · tool use 정책 동일
- [[memory-mcp]] — 동일한 ontology 활용 후보 (Memory MCP의 graph 데이터를 search 인덱스에 포함 가능)
- [[obsidian-시리즈-사업화]] — search는 obsidian + AI 검색 데모 자산
- [[ai-education-web]] — 동일한 React+TS 패턴 재활용

## Phase 진행 (2026-05-22 재배치)

- **Phase 0** (2026-05-21) ✅ — vault 셋업 완료: 디렉토리·git·.gitignore·CLAUDE.md·_inbox·junction·skills·hooks·myWiki entity·memory 갱신·GitHub repo·backend/frontend skeleton (38 files, commit `40adc7c`)
- **Phase 1** (2026-05-21~22 새벽) ✅ — MVP 동작: backend FastAPI `/api/query` + grep wiki_search + Claude Max CLI subprocess (OAuth, API 키 불요) + React Vite frontend + Tailwind + 출처 토글 UI + 포트 8888/8889 swap (Vite/FastAPI) + fabricate 차단 (`--strict-mcp-config` + `--setting-sources project` + system prompt 강화 + 작업보고서 SEARCH_DIRS + 날짜 가중치)
- **Phase 2** (2026-05-22) ✅ — **세션 기반 대화 model** 완성. stateless single-query → 한 client = 한 WebSocket session, 컨텍스트 자동 핸드오프. PLAN 12 task 모두 검증 통과 (T1~T5 backend / T6~T9 frontend / T10·T11 cleanup·E2E / T12 박제·commit). commit `28d0a5d`. 핵심 결정 D1~D5 (통신 WebSocket / 저장 메모리 dict lifespan-scoped / Claude 연속 CLI `--resume` ⭐ / 측정 last_input + last_cache_read + last_cache_creation / 핸드오프 커스텀 요약 + 새 session preamble) + audit 저장 (`작업보고서/handoffs/<YYYY-MM-DD>_<sid_prefix>.md`)
- **Phase 3** (구 Phase 2 흡수) — UI 다듬기: shadcn/ui 핵심 · 모바일 · 세션 UI 미세조정 · 다크모드 (Step 1 선행 완료)
- **Phase 4** (구 Phase 3) — 검색 정확도: prompt caching · 임베딩 · 인덱스 캐시 · BM25
- **Phase 5** (구 Phase 4) — 배포: Tailscale → DigitalOcean 별도 droplet (uttecHome 7777과 분리)

### Phase 2 ⭐ 세부 — 세션 기반 대화 model (2026-05-22)

stateless single-query API 의 follow-up 불가 문제 (사용자가 "1, 2, 3, 4 중 어떤 것?" 답변 불가능) 해결. WebSocket 세션 + 70/80% 자동 핸드오프 model.

**핵심 결정 5건 (D1~D5)**:

| # | 결정 | 내용 |
|:-:|---|---|
| D1 | 통신 | WebSocket (`/ws/chat`) — HTTP 폴링 대비 latency 우위 + push 지원 |
| D2 | 저장 | 메모리 dict (lifespan-scoped) — Redis 등 외부 의존 0, 단일 instance 검증 단계 적합 |
| D3 | Claude 연속 | CLI `--resume <session_id>` 활용 — Claude session 안에서 history·system_prompt 자동 박제 (input_tokens 거의 0) |
| D4 | 측정 | `last_input` + `last_cache_read` + `last_cache_creation` 추적 → 70/80% 임계값 판정 |
| D5 | 핸드오프 | 70% 도달 시 커스텀 요약 → 80% 도달 시 새 session preamble 로 자동 전환 |

**audit 저장**: 매 세션 종료 후 `작업보고서/handoffs/<YYYY-MM-DD>_<sid_prefix>.md` 박제 (재현 가능 + 측정 데이터 누적).

**Phase 3 후속**: UI 다듬기 (shadcn/ui 핵심 + 모바일 + 세션 UI 미세조정). 다크모드 Step 1 은 Phase 2 진행 전 선행 완료.

## 메모리 공유 정책 (2026-05-22 결정) ⭐

본 vault 는 today 와 **메모리 공유** — 다른 4-vault (onDevice/lemonLabs/uttecHome/revita) 격리 정책 예외.

- `~/.claude/projects/C--todo-search/memory/` → `today/.claude/memory/` junction (30 files)
- 사용자 의도: search vault 가 today 와 거의 동일 수준 web service 로 운영되도록 비교 가능
- search 측 `setup-memory-sync.py` (idempotent) + vault-start Step V0 자동 검증
- 사용자 본명·위시캣 룰·5-vault·할일 Notion 정책 등 글로벌 룰 공유

## 갭

1. **자료 격자 정합성**: 검색이 stale 자료를 가져올 위험 — myWiki updated 일자 기준 weighting 필요
2. **prompt cache invalidation**: myWiki 갱신 빈도가 높아 cache miss 가 잦을 수 있음 → 캐시 전략 검토
3. **외부 노출 시 보안**: Claude API 키 + 사용량 모니터링 + rate limit
4. **검색 품질 평가**: 정성 평가만으로는 부족 — 자동 회귀 test set 필요 (Phase 3)

## 박제

- vault 설립 megasession: `today/작업보고서/2026-05-21_작업보고서.md` § "search vault 셋업"
- _inbox PROTOCOL 9 vault 사본 동기화 필요 (Phase 0 후속 megasession)
