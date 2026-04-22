# Notion 연동 설계서
> 작성일: 2026-04-22

## 현재 상태
- Obsidian: Second Brain 32+ 페이지, Claude Code가 유지/업데이트
- Notion: "오늘 작업" 페이지, AI FanStick 문서, 간단 메모
- MCP Notion 도구: 이미 사용 가능 (검색, 읽기, 쓰기, 페이지 생성)
- 환경변수: NOTION_TOKEN 설정 완료

## 역할 분담 (최종 결정)

| 구분 | Obsidian (Second Brain) | Notion |
|------|------------------------|--------|
| **위치** | 사무실 PC | 모바일/어디서나 |
| **관리자** | Claude Code | 수동 + Claude MCP |
| **용도** | 깊은 분석, 방향 판단, 기술 문서 | 현장 메모, 할일, 빠른 참조, 공유 |
| **업데이트 주기** | 매일 (/work-end) | 수시 |
| **데이터 방향** | 원본 (Source of Truth) | 파생 (요약/참조) |

## 동기화 범위

### Obsidian → Notion (자동화 대상)
| 항목 | 방식 | 주기 |
|------|------|------|
| 오늘 할일 | /work-start 시 Notion "오늘 작업" 업데이트 | 매일 아침 |
| 프로젝트 요약 | 주간 dashboard 스냅샷 → Notion | 주 1회 |
| 주요 판단/결정 | ai-direction.md 판단 로그 신규 항목 | 발생 시 |

### Notion → Obsidian (수동)
| 항목 | 방식 | 주기 |
|------|------|------|
| 현장 메모 | /work-start 시 Notion 확인 → ingest | 매일 아침 |
| 회의/미팅 노트 | 수동 ingest | 발생 시 |

### 동기화하지 않는 것
- 코어 페이지 전문 (me, skills, experience 등) → 너무 큼, Obsidian에서만 관리
- raw/ 소스 파일 → 로컬 전용
- 위키 구조/링크 → Obsidian 전용 기능

## 구현 방안

### Phase 1 (즉시 가능)
- `/work-start`에 Notion "오늘 작업" 확인 단계 추가
- `/work-end`에 Notion "오늘 작업" 완료 상태 반영
- MCP 도구로 수동 읽기/쓰기 (현재도 가능)

### Phase 2 (향후)
- 주간 프로젝트 요약 자동 업로드 Skill
- Notion → Obsidian ingest 자동화 Skill
- 판단 로그 자동 동기화

## 결론
- **전면 동기화는 하지 않는다** — 복잡도 대비 가치 낮음
- **요약/할일만 양방향** — 최소 범위로 시작
- **Obsidian이 원본** — Notion은 모바일 창구
