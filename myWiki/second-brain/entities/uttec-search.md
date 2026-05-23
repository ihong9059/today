---
title: uttec-search
type: entity
created: 2026-05-23
updated: 2026-05-23
tags: [vault, web-service, ai-search, cross-platform, dogfooding]
links: [search, uttec-vault, vault-portability, ai-direction, ai-fanstick, onDevice-ai]
---

# uttec-search

UTTEC onDevice 제품·비즈니스 hub (`~/uttec-vault/`, Mac/Ubuntu) 위에서 동작하는 prompt-driven AI 검색·정리·요약 web 서비스. **search vault (Windows) 의 cross-platform 첫 fork**.

## 정체성 (2026-05-23 신설)

- **10th vault** (search 9th의 sibling)
- **10th 또는 11th Claude agent** = `uttec-search-claude` (uttec-vault-claude 합류 정합 후 확정)
- **Tier 3** (myWiki 3-Tier 정책 — 별도 repo + multi-agent 합류)
- **위치**: `~/uttec-search/` on uttecMac (Tailscale `100.90.158.36`, Ubuntu 22.04 — Mac→Ubuntu 컨버전, 2026-05-14)
- **정체성 D 계승** (search vault dogfooding-via-self 모델) — 1차 사용자 = 본인 (홍광선)

## 핵심 의미 (왜 신설했나)

1. **vault portability 트랙 첫 실증** — 본 vault entity 와 search vault 의 동등 동작이 [[vault-portability]] 의 단기 측정 지표
2. **search 모델의 두 번째 케이스** — 첫째 (search) = myWiki 38일치 자료 / 둘째 (uttec-search) = uttec-vault 비즈니스 자료. 외부 회사 적용 시 가장 가까운 prototype
3. **uttec-vault dogfooding 강화** — 본인이 web 으로 자기 비즈니스 자료를 검색 → 데이터 결함·UI 격차 즉시 발견 → uttec-vault entity 진화 cycle 가속
4. **cross-platform 비용 측정** — 같은 stack(FastAPI + React + sentence-transformers + Claude CLI) 을 Windows ↔ Linux 동시 운영 시 실제 격차 측정

## 기술 스택 (search 와 동일)

- **backend**: FastAPI + Anthropic SDK + sentence-transformers (multilingual MiniLM, 384dim, CPU) + hybrid scoring (α=0.7) + Claude CLI subprocess (sonnet-4-6) + WebSocket 세션 모델
- **frontend**: Vite + React + TypeScript + Tailwind + shadcn/ui (6 컴포넌트)
- **port**: backend 8891 (search 측 8889) / frontend dev 8890 (search 측 8888)

## search 와 핵심 차이

| 항목 | search (9th, Windows) | uttec-search (10th, Linux) |
|---|---|---|
| 1차 인덱싱 대상 | myWiki (38일치 second-brain) | uttec-vault (5/23 신설, 비즈니스 7영역) |
| 호스트 | Windows | Ubuntu 22.04 (uttecMac) |
| 경로 hardcoding | `C:\todo\search\...` | `/home/uttec/uttec-search/...` |
| Path 도구 | PowerShell | bash/POSIX |
| junction | Windows junction | symlink |
| 메모리 | today (`C:/todo/today/.claude/memory`) 와 공유 | uttec-vault memory 와 공유 |
| 인덱스 SEARCH_DIRS | entities + thoughts + (myWiki 표준 11 root files) | entities + thoughts + 7 비즈니스 영역 + (uttec-vault 5 root files) |

## 셋업 (2026-05-23 Phase 0~4.2 fork)

- search vault tar pipe 로 핵심 62 파일 (584KB) 전송 → Mac에서 변환
- venv 생성 도구로 **uv 0.11.16** 사용 (python3.10-venv 미설치 + sudo 회피)
- 메모리 link: `~/.claude/projects/-home-uttec-uttec-search/memory` → `~/.claude/projects/-home-uttec-uttec-vault/memory`
- 변환 적용 파일들:
  - `backend/.env.example` + `.env`: PORT=8891, WIKI_ROOT=`/home/uttec/uttec-search/raw/uttec-vault`
  - `backend/app/core/config.py`: wiki_root + index_cache_path Linux POSIX
  - `backend/app/services/search_index.py`: SEARCH_DIRS = uttec-vault 7영역 + entities/thoughts, SEARCH_FILES = uttec-vault 5 root .md
  - `frontend/vite.config.ts`: dev 8888→8890, proxy backend→8891
  - `.claude/hooks/check-inbox.py`: SELF_ID = `uttec-search-claude`
  - `.claude/hooks/setup-memory-sync.py`: PROJECT_SLUG + TARGET 변경

## 양방향 통신

- **uttec-vault-claude** (sibling on Mac) — 자료 source. 비즈니스 영역 진화 시 카드 수신.
- **search-claude** (Windows sibling) — cross-platform 검증 양방향. 어떤 결함·개선이 양쪽 동시 발생 시 vault-portability 진화.
- **mywiki-claude** (today, Windows) — main vault. search.md + uttec-search.md + vault-portability 박제 + 9 vault PROTOCOL 정합화 cascade.

## 참고

- vault repo: `~/uttec-search/` on uttecMac
- 모태 vault: [[search]]
- 데이터 source: [[uttec-vault]]
- 진화 트랙: [[vault-portability]]
- 동기: [[ai-direction]] 판단 로그 (2026-05-23 — vault portability 트랙 첫 실증)
