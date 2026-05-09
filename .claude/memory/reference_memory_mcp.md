---
name: Memory MCP 설치
description: Anthropic 공식 Memory MCP (지식 그래프) 설치 정보. Foundry Ontology 70% 대체. 위키 ontology/ 폴더에 저장
type: reference
originSessionId: 58ef5da6-34ca-492c-9fc5-31c9f21be601
---
**패키지**: `@modelcontextprotocol/server-memory` (Anthropic 공식)
**설치일**: 2026-05-05
**클라이언트**: Claude Code (Claude Desktop엔 미설치)

**저장 경로**: `C:\todo\today\myWiki\ontology\memory.json`
**환경변수**: `MEMORY_FILE_PATH` (User 영구 설정)

**제공 도구 9종**:
- create_entities, delete_entities, add_observations, delete_observations
- create_relations, delete_relations
- read_graph, search_nodes, open_nodes

**용도**:
- 객체(엔티티) + 관계 + 속성을 영구 저장 (세션 간 유지)
- Obsidian Wiki와 보완 결합 — Wiki는 사람용, Memory MCP는 AI 쿼리용
- 영업 컨설팅 시 고객사·담당자·관심사 자동 누적
- Stage 0 (Core Services 셋업) 패키지에 포함되는 핵심 인프라

**관련 문서**:
- smartFactory/업무효율화/참고/Core_Services_무료대체_매핑.md (3층 온톨로지 구현)
- smartFactory/업무효율화/참고/n8n_실행_가이드.md
- smartFactory/업무효율화/참고/Pipeline_Builder_적용_검토.md

**한계**:
- Writeback 없음 (n8n으로 보강 필요)
- 시각 UI 없음 (Obsidian Graph View로 보완)
- 단일 파일 JSON (1만 노드 이하 권장)
- 약타입 (스키마 강제 안 됨)

**검증 완료** (2026-05-05 첫 활용):
- `read_graph` ✓ — 빈 그래프 정상 반환
- `create_entities` ✓ — 엔티티 12개 일괄 생성 (UTTEC, 홍광선, 3.5-Stage 패키지, 스마트팩토리, uttec-edu, 한국기계, 태명과학, n8n, revita 서버, Memory MCP, Obsidian myWiki, Foundry 5층 아키텍처)
  - ⚠️ 2026-05-06 수정: 시드 작성 시 사용자 이름을 "이형근"으로 잘못 기재했음. 실제는 **홍광선** (UTTEC 대표). Memory MCP 저장소(memory.json)도 동기화 필요
- `create_relations` ✓ — 관계 20건 일괄 생성 (운영한다/사업라인이다/도구로포함한다/고객후보다 등)
- `open_nodes` ✓ — 이름 배열로 엔티티 + 관련 관계 정확히 반환
- `search_nodes` ✓ — 단일 키워드 매칭 정상, 다중 단어는 AND 매칭 (모든 단어 포함 필요)

**검색 패턴 노하우**:
- entity 이름·observation 본문·entityType에서 텍스트 매칭
- 한글 entityType("고객후보")로 검색 시 빈 결과 — 영문 entityType("customer-prospect") 일관 사용 권장
- 또는 observation 본문에 한글 키워드 포함하여 검색 가능하도록 작성

**실제 저장 위치 확인**: `C:\todo\today\myWiki\ontology\memory.json` (12개 entities + 20개 relations 저장됨)
