---
title: search vault (myWiki AI 검색·정리 web)
type: entity
created: 2026-05-21
updated: 2026-05-21 (search-claude 9th 합류 — Phase 0 셋업 megasession)
tags: [웹, 검색, 위키노출, vault, Tier3, multi-agent, search-claude, prompt-driven, claude-api, FastAPI, React]
links: [me, skills, uttec-homepage, claude-code, memory-mcp, obsidian-시리즈-사업화, ai-education-web]
---

# search vault (myWiki AI 검색·정리 web)

## 한 줄 정의
**myWiki second-brain (38일치 누적 자료) 위에서 동작하는 prompt-driven 검색·정리·요약 web 서비스**. 사용자가 자연어 질의 → Claude API + wiki 자료 검색 → web 출력. 2026-05-21 **9번째 Tier 3 vault 분리** + **search-claude 9th multi-agent 합류**.

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

## Phase 진행

- **Phase 0** (2026-05-21) ✅ — vault 셋업 완료: 디렉토리·git·.gitignore·CLAUDE.md·_inbox·junction·skills·hooks·myWiki entity·memory 갱신·GitHub repo·backend/frontend skeleton (38 files, commit `40adc7c`)
- **Phase 1** (2026-05-21) ✅ — MVP 동작: backend FastAPI `/api/query` + grep wiki_search + Claude Max CLI subprocess (OAuth, API 키 불요) + React Vite frontend + Tailwind + 출처 토글 UI + 포트 8888/8889 swap (Vite/FastAPI) + fabricate 차단 (`--strict-mcp-config` + `--setting-sources project` + system prompt 강화 + 작업보고서 SEARCH_DIRS + 날짜 가중치)
- **Phase 2** — UI 다듬기: shadcn/ui · 검색 결과 카드 · 다크모드 · 모바일 · 검색 히스토리
- **Phase 3** — 검색 정확도: prompt caching · 임베딩 · 인덱스 캐시 · BM25
- **Phase 4** — 배포: Tailscale → DigitalOcean 별도 droplet (uttecHome 7777과 분리)

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
