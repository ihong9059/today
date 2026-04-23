# revitaWiki 검토 결과

> 검토일: 2026-04-22
> 대상: C:\todo\revitaProject\revitaWiki (52 페이지)

## 현황

| 항목 | 수치 |
|------|------|
| 위키 페이지 | 52개 |
| 엔티티 (모듈) | 10개 (5 구현, 5 stub) |
| ADR (설계 결정) | 6건 |
| 테스트 케이스 | 28건 (전항 PASS) |
| 개선/갭/아이디어 | 10건 |
| 로드맵 | 5 Phase (Phase 1 ~80%) |

## 평가: 양호 (8/10)

### 강점
- SCHEMA.md 명확 (ingest/query/synthesize/evaluate)
- ADR 6건 — 설계 결정 이유가 기록됨
- gap/gotcha 분류 실용적
- TC 단위 개발 체계적
- LLM 전략 5단계 정의

### 개선 5건

| # | 이슈 | 심각도 | 권고 |
|---|------|:------:|------|
| 1 | revitaWiki/revitaBrain 이원화 — 수동 동기화, 원본 불명확 | 중 | 원본 확정, 다른 하나는 뷰 역할 |
| 2 | Phase 2 블로커(Tower RS485) 해결 계획 없음 | 상 | 디버깅 계획+기한 추가 |
| 3 | 부정 테스트 0/28건 | 중 | Phase 2 전 최소 5건 추가 |
| 4 | myWiki와 상호참조 없음 | 하 | 양쪽에 안내 문구 추가 |
| 5 | overview.md 수동 갱신 | 하 | /brain ingest 시 자동 반영 |

## myWiki ↔ revitaWiki 역할 분담

| 영역 | myWiki | revitaWiki |
|------|--------|-----------|
| 프로젝트 요약 | revita.md | overview.md |
| 설계 결정 | — | ADR 6건 |
| 사업/영업 | 영업전략, 전시회 | — |
| 기술 상세 | — | entities/ 10개 |
| 목표 | goals.md (전체) | roadmap.md (전용) |
