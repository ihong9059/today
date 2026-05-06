---
title: Memory MCP (지식 그래프)
type: entity
created: 2026-05-05
updated: 2026-05-05
tags: [도구, MCP, 온톨로지, AI, second-brain]
links: [claude-code, 스마트팩토리, 영업전략, Obsidian myWiki, ai-direction]
---

# Memory MCP

## 한 줄 정의
Anthropic 공식 지식 그래프 MCP 서버. AI가 세션 간 영구적으로 entities/relations/observations를 누적·쿼리할 수 있는 구조화 저장소. **Foundry 3층 온톨로지의 70% 대체 도구.**

## 설치 정보
- 패키지: `@modelcontextprotocol/server-memory`
- 클라이언트: Claude Code (✓ Connected)
- 등록일: 2026-05-05
- 저장 경로: `C:\todo\today\myWiki\ontology\memory.json` (JSONL 형식)
- 환경변수: `MEMORY_FILE_PATH` (`.claude.json`의 mcpServers.memory.env 블록에서 설정)

## 제공 도구 9종
| 도구 | 용도 |
|------|------|
| `read_graph` | 전체 그래프 조회 |
| `create_entities` | 엔티티 일괄 생성 (name, entityType, observations[]) |
| `create_relations` | 관계 일괄 생성 (from, to, relationType — 능동태) |
| `add_observations` | 기존 엔티티에 observation 추가 |
| `delete_entities` / `delete_observations` / `delete_relations` | 삭제 |
| `search_nodes` | 텍스트 매칭 검색 (이름/entityType/observation 본문 대상) |
| `open_nodes` | 이름 배열로 엔티티 + 관련 관계 조회 |

## 시드 그래프 (2026-05-05 첫 활용)
**12 entities** + **20 relations**:

### 핵심 비즈니스 엔티티
- **UTTEC** (company), **홍광선** (person)
- **3.5-Stage 패키지** (business-model)
- **스마트팩토리**, **uttec-edu** (business-line)
- **한국기계**, **태명과학** (customer-prospect)
- **n8n**, **Memory MCP**, **Obsidian myWiki** (tool)
- **revita 서버** (infrastructure)
- **Foundry 5층 아키텍처** (reference-architecture)

### 핵심 관계
- 홍광선 → UTTEC (운영한다)
- UTTEC → 스마트팩토리 / uttec-edu (사업라인이다)
- UTTEC → 3.5-Stage 패키지 (영업모델이다)
- 3.5-Stage 패키지 → Foundry 5층 아키텍처 (참조아키텍처로한다)
- 3.5-Stage 패키지 → n8n / Obsidian myWiki / Memory MCP (도구로포함한다)
- n8n → Foundry 5층 아키텍처 (1층_2층을대체한다)
- Memory MCP → Foundry 5층 아키텍처 (3층_온톨로지를70%대체한다)
- 한국기계 / 태명과학 → 3.5-Stage 패키지 (Stage1_2시범견적후보다)

## Obsidian myWiki와의 역할 분담
| 차원 | Obsidian myWiki | Memory MCP |
|------|-----------------|-----------|
| 사용자 | 사람 (시각 탐색) | AI (구조화 쿼리) |
| 형식 | 마크다운 + frontmatter | JSON 노드 + 엣지 |
| 강점 | 풍부한 컨텍스트, Graph View | 즉시 검색, 관계 추론 |
| 약점 | LLM이 모든 파일 읽기 비효율 | 시각 탐색 불가, 약타입 |

**워크플로우**: Obsidian이 1차 저장소 — 사용자가 직접 작성. Memory MCP는 AI가 자동 누적 — 위시캣 검토, 고객 미팅, 시장 인사이트 등에서 entities를 자동 추출하여 그래프에 추가.

## 검증 결과 (2026-05-05)
- 생성·읽기·검색 모든 도구 정상 동작
- **search_nodes 패턴**: 단일 키워드 OK, 다중 단어 AND 매칭. 한글 entityType 검색 시 영문 entityType이 매칭 안 됨 → observation 본문에 한글 키워드 포함하여 작성 권장
- **영구 저장 이슈**: `.claude.json` env 블록이 `{}`로 비어있어 MEMORY_FILE_PATH가 서버에 전달 안 됨 → env 블록 직접 추가 + 시드 JSONL 파일 배치로 해결

## 한계
- Writeback 없음 (n8n으로 보강)
- 시각 UI 없음 (Obsidian Graph View로 보완)
- 단일 파일 JSON (1만 노드 이하 권장)
- 약타입 (스키마 강제 안 됨)
- 파일 손상 시 복구 어려움 → `memory_seed_*.jsonl` 백업 패턴 운영

## 사업 적용
- **Stage 0 (Core Services Starter Pack)** 패키지의 핵심 인프라 구성요소
- 영업 컨설팅 시 고객사·담당자·관심사 자동 누적 → 재방문 시 즉시 컨텍스트 복원
- 3.5-Stage 패키지의 "온톨로지 레이어" 실제 구현 도구

## 관련 페이지
- [[claude-code]]: 클라이언트
- [[Obsidian myWiki|second-brain]]: 1차 저장소 (보완 관계)
- [[스마트팩토리]]: 사업 적용 영역
- [[영업전략]]: 3.5-Stage 패키지 영업 모델
- [[ai-direction]]: AI 도구 도입 판단 (FOMO 회피 원칙 통과 사례)

## 산출물
- `C:\todo\today\myWiki\ontology\memory.json` (시드 + 운영 파일)
- `C:\todo\today\myWiki\ontology\memory_seed_2026-05-05.jsonl` (초기 시드 백업)
- `~/.claude/projects/C--todo-today/memory/reference_memory_mcp.md` (Claude 메모리 노트)
- `smartFactory/업무효율화/참고/Core_Services_무료대체_매핑.md` (3층 온톨로지 구현 분석)
