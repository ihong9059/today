# {{WIKI_TITLE}} - Schema

이 위키는 **{{COMPANY_NAME}}와 운영자(개인)에 대한** 지식 기반이다.
내부 역량과 외부 환경을 기록·연결하여, 회사의 앞날을 데이터 기반으로 판단하는 시스템.

## 목적

### 내부 역량 (안을 본다)
1. **자기 이해**: 우리의 경험, 기술, 성향, 패턴을 구조화
2. **개선점 도출**: 부족한 부분을 식별하고 해결 방향 제시

### 외부 환경 (밖을 본다)
3. **시장 이해**: 고객 니즈, 시장 트렌드, 경쟁 환경 파악
4. **사업 성과 추적**: 매출, 수주, 실패의 원인을 기록하고 패턴 발견

### 의사결정 (판단한다)
5. **방향 판단**: 내부 역량 + 외부 환경을 종합하여 사업 방향 결정
6. **복리 성장**: 모든 기록이 연결되어 점점 정확한 판단이 가능해지는 시스템

## 디렉토리 구조

```
{{WIKI_ID}}/
├── CLAUDE.md          # 이 파일 (스키마/규칙)
├── index.md           # 전체 페이지 목록 + 한줄 요약
├── log.md             # 시간순 기록 — 분기별 archive 정책 적용
├── log-archive/       # 분기별 아카이브 (YYYY-QN.md)
│
├── me.md              # 핵심 정체성
├── skills.md          # 기술 스택 인벤토리
├── strengths.md       # 강점 분석
├── gaps.md            # 부족한 부분
├── goals.md           # 목표·방향
├── ai-direction.md    # AI 방향 판단 + 판단 로그
│
├── entities/          # 사람·조직·도구 단위 entity
├── thoughts/          # 인사이트·매칭 패턴 (분기 sub-folder)
│   └── {{CURRENT_QUARTER}}/
└── raw/               # 원본 소스 (불변, LLM 읽기 전용, junction 가능)
```

## 페이지 규칙

### 프론트매터
모든 위키 페이지는 YAML 프론트매터를 포함:

```yaml
---
title: 페이지 제목
type: identity | skill | experience | project | goal | ai | thought | entity | log
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [태그1, 태그2]
links: [관련 페이지 파일명]
---
```

### 링크 규칙
- 내부 링크: `[[파일명]]` 형식 (Obsidian 호환, 확장자 `.md` 제외)
- 모든 페이지는 최소 1개 이상의 다른 페이지와 연결
- 고아 페이지 금지

## 워크플로우

### 수집 (Ingest)
새로운 경험·생각·정보 공유 시:
1. 관련 기존 페이지에 통합
2. 필요시 새 페이지 생성
3. 상호 참조 갱신
4. index.md / log.md 갱신

### 해석 (Interpret) — 복리 성장 엔진
재료를 받으면 자동 수행:
1. 어디에 넣을지 판단
2. 기존과 연결 (A + B → C 패턴)
3. 인사이트 → thoughts/ 생성
4. 행동 패턴 → me.md 갱신
5. 사업 판단 연결 → 적극 제안

**복리 인사이트 패턴**:
```
[사실 A] + [사실 B] → [새로운 판단 C] → [행동 변화 D]
```

### 외부 위키 흡수 (Absorption) — 다른 위키 ingest 결과 흡수

**배경**: 다른 위키(기술 위키 등)는 자체 ingest 사이클로 자료 축적. 그 자료가 본 위키의 사업 자산으로 자동 전환 안 됨 → 명시적 흡수 사이클 필요.

**트리거**: 외부 위키 `log.md`에 새 `## [날짜] ingest #N |` 항목 추가됨

**5단계 흡수 체크리스트** (사이클당 5~15분):

1. **신규 entity** → 본 위키 `skills.md` / `strengths.md` 새 스킬·강점 추가 검토
2. **신규 gotcha** → `gaps.md` 패턴 함정 누적 (강의·교재 자산화 가치)
3. **신규 decision** → `me.md` 또는 `ai-direction.md` 의사결정 패턴 갱신
4. **매칭 패턴 발견** — 새 entity·gotcha·decision이 다른 entities와 시너지 만드는지 검토 → 발견 시 `thoughts/` 작성
5. **본 위키 측 entity 갱신** — 사업 요약 부분 갱신 필요한지 확인

**판정**: 5단계 모두 "검토 완료"일 때 사이클 종료. 결과는 `log.md`에 한 줄 기록.

### today/ 신규 폴더 → entity 검토 정책

새 폴더 생성 시 사업 자산화 가능 여부 검토:
1. 사업 자산 가치 평가 (매출·고객·기술)
2. entity 신설 여부 결정 (매출 직전 → 즉시 신설 / 탐색 → thought·작업보고서)
3. 관련 페이지 cross-link (회사소개·skills·영업전략)

### entities/ 정기 lint
- 트리거: 분기별 또는 entities 60개 도달 시
- 6개월+ updated 없음 & 참조 0 → `entities-stale/`로 이동

### log.md 분기 아카이브
- 트리거: 500 KB 또는 분기 종료 +7일
- `log-archive/YYYY-QN.md`로 분리, 활성 log.md는 최근 90일

## Multi-Agent 통신 (Phase 2 셋업 시)

다른 Claude(`{{PEER_CLAUDE_ID}}` 등)와 `_inbox/` 메일박스로 비동기 협업.

- SessionStart hook이 자동 알림 (`.claude/hooks/check-inbox.py`)
- 표준 카드 형식: `_inbox/PROTOCOL.md`
- 새 Claude 빠른 진입: `_inbox/SYSTEM_GUIDE.md`

## 메타

| 항목 | 값 |
|---|---|
| 위키 시작일 | {{TODAY}} |
| 셋업 패키지 | obsidian/myWikiSetup |
| 본 SCHEMA 출처 | UTTEC myWiki second-brain (2026-05-12 v1.0) |
