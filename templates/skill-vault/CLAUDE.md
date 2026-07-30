# CLAUDE.md — [프로젝트명] vault 작업 지침

> 이 vault는 **`today` vault의 skill 기반 세션 연속성 운영 원리**를 이식한 것입니다.
> 세션 시작/종료를 `/work-start`·`/work-end` skill이 오케스트레이션합니다.

---

## 0. 프로젝트 컨텍스트 (항상 알아야 할 사실)

> 아래 표를 자기 프로젝트에 맞게 채우세요.

| 항목 | 내용 |
|------|------|
| **프로젝트** | [정식명] |
| **목적** | [무엇을 만들고/해결하는가] |
| **이해관계자** | [발주자/팀/사용자] |
| **현재 단계** | [기획·설계·개발·시험·운용] |
| **기술 스택** | [언어·프레임워크·하드웨어] |
| **중요 제약** | [예산·기한·인증·환경] |

---

## 1. 운영 원리 (이 vault가 돌아가는 방식)

| 구성요소 | 경로 | 역할 |
|---|---|---|
| **skill** | `.claude/skills/work-start`, `work-end` | 세션 시작/종료 오케스트레이션 |
| **세션 파일** | `.claude/sessions/session_*.md` | 세션별 작업 기록 (최근 3개 유지) |
| **러닝 로그** | `.claude/sessions/_current_progress.md` | 이번 세션 응답 누적 (work-end가 세션 파일로 인계) |
| **작업보고서** | `작업보고서/YYYY-MM-DD_작업보고서.md` | 일별 할일 통합표 + 완료/상세/요약 |
| **자동화 훅** | `.claude/hooks/create-daily-report.py` | SessionStart 시 오늘 보고서 자동 생성 |
| **훅 등록** | `.claude/settings.json` | SessionStart 훅 매핑 |
| **wiki** | `wiki/` | 세컨드 브레인 — log·entities·thoughts |

### 세션 시작 시
사용자가 "작업 시작"/`/work-start` → git pull → 러닝로그 초기화 → 직전 세션 복원 → 오늘 할일 통합표 → wiki staleness 점검 → 우선순위 보고.

### 세션 종료 시
사용자가 "작업 종료"/`/work-end` → 러닝로그를 세션 파일로 인계 → 작업보고서 갱신 → wiki 반영 → git commit/push.

---

## 2. 작업 가이드라인 (프로젝트별로 채움)

### 기술
- [라이브러리 버전 / 호환성 / 인증 요구]

### 비즈니스
- [계약·하자보증 / 단계 vs 일괄 기준 / 비용·일정]

### 한계·미정
- [차단 항목 / 의사결정 대기]

---

## 3. 파일 규약

| 파일 | 용도 | 수정 빈도 |
|------|------|-----------|
| `CLAUDE.md` | 본 지침 | 프로토콜 변경 시만 |
| `README.md` | 전체 개요·아키텍처 | 큰 결정 시 |
| `작업보고서/*.md` | 일별 작업 기록 | 매 세션 |
| `.claude/sessions/*.md` | 세션 기록 | 매 세션 종료 |
| `wiki/log.md` | 시간순 박제 (SSOT) | 진행에 따라 |

---

## 4. 외부 확장 (선택 — 기본은 자기완결)

기본 템플릿은 외부 서비스 없이 동작한다. 필요 시 원본 `today` vault 패턴을 이식:
- Notion 단방향 sync / `~/.claude` memory 링크 / multi-agent `_inbox` 브로커 / cross-vault staleness 감지.
- 각 skill 파일 하단의 "확장점" 섹션에 삽입 위치가 명시돼 있다.
