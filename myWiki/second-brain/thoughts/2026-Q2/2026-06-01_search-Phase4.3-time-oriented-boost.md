---
title: search Phase 4.3 — time-oriented score 15배 향상 + 정체성 D dogfooding-via-self 검증 사례
type: thought
created: 2026-06-01
updated: 2026-06-01
tags: [thought, search, Phase4.3, time-oriented, 정체성D, dogfooding, 검색정확도, cross-vault-feedback-loop, memory-인덱싱, session-인덱싱, 외부mode-turn-off]
links: [search, ai-direction, gaps, project_search_external_mode_gap]
---

# search Phase 4.3 — time-oriented score 15배 향상 + cross-vault feedback loop 풀사이클 첫 완결

## 사실 A — 5/22 사고: "오늘 할일" query top-1 margin 0.11 (이전 사고)

기존 search vault answer 품질 격차: 작업보고서 디부스트 (`authority = 0.6`) + date_bonus 0.05 × 3 = 0.15 → 다른 entity와의 차이 미미 → "오늘 할일" query에서 시간성 결정타 누락.

## 사실 B — 5/22~23 megasession: 9 패치 + 정체성 D 결단

- 정체성 D 결단: **dogfooding-via-self** — 1차 사용자 = 본인 / 궁극 목표 = 외부 회사 web 서비스 prototype / 본인이 dogfooder
- 메모리·세션 인덱싱 E·F 본인용 OK, 외부 deploy 시 turn-off 옵션
- mywiki 5/23 megasession 9 패치 카드 발송 (A·B·C·D today rescue + E·F·H·I·J answer source)

## 사실 C — 6/1 search-claude 9 패치 일괄 적용 완결

- **A**: `_TIME_KEYWORDS` 14 신규 확장 (할일/할 일/할거/todo/tasks/오늘 일정/뭐 해야/스케줄/다음에 할 등)
- **B**: `score = base * authority + chunk_richness + _date_bonus * 0.15` (기존 0.05 × 3) + time-oriented 시 authority 0.6 → 1.0
- **C**: 모든 query 약 today rescue (`_today_paths` 후보 풀 누락 차단)
- **D**: SourceHit `base_score/authority/date_bonus/chunk_richness` + QueryResponse `time_oriented` 노출
- **E** ⭐⭐: `.claude/memory/*.md` 44 files 인덱싱
- **F** ⭐⭐: `.claude/sessions/session_*.md` 최근 3개 인덱싱 (work-end 유지 정책 일치)
- **H**: SYSTEM_PROMPT § "답변 원칙 (Phase 4.3 — H)" 5 원칙 추가
- **I**: context 확장 `default_max_hits 8→12` / `max_chars_per_hit 2000→4000`
- **J** ⭐⭐⭐: `test_answer_consistency.py` 19 tests all PASS

**실측**: "오늘 할일을 알려주세요" top-1 score **3.584** / margin **~1.7~1.8** = **5/22 사고 대비 15배 향상**.

## 새로운 판단 D — cross-vault feedback loop 풀사이클 정착 (첫 1회 완결)

A + B + C 종합:
- vault scope 결함 진단 (5/22 search answer 품질 격차)
- → main vault 능동 카드 발송 (5/23 megasession 9 패치)
- → 별도 vault (search) 자율 진행
- → ack 카드 회신 (6/1 cards #001 + #002)
- → mywiki 흡수 (본 thought)

**일반화 원칙**: 다른 vault (uttechome / wishket / lemonLabs / revita / ondevice) 결함 발견 시 동일 패턴 적용. **결정 24 박제**.

## 행동 변화 E

1. **결정 24 (ai-direction.md)** — cross-vault feedback loop 정착 사례 박제
2. **gaps.md gap 신규** — search 외부 mode 메모리·세션 turn-off 옵션 미구현 (Phase 5/6 candidate). 위시캣 마스킹·세션 carry 누설 위험. memory `project_search_external_mode_gap.md` 박제 완료
3. **검색 정확도 vs 디부스트 균형 — time-oriented 분기 패턴** = A·B의 핵심 디자인 결단을 향후 다른 vault 검색 시스템 (uttec-search / uttec-rag-local) 표준 패턴으로 carry

## 의미

본 사이클은 **정체성 D = dogfooding-via-self 검증의 첫 실증**. 본인이 dogfooder로서 myWiki에서 발견한 결함을 → search vault에 카드 발송 → search 자율 진행 → 본인이 다시 dogfood로 검증 = **self-reinforcing feedback loop**.

→ 외부 web service prototype 완성 path에 정량 자산 누적. 검색 정확도 격차의 본질이 모델·임베딩이 아니라 **컨텍스트 (메모리·세션 인덱싱)** + **디부스트 균형** 임을 정량 입증.

## carry-over

- **Phase 5/6**: `SEARCH_EXTERNAL_MODE=1` 환경변수 toggle 신설 — memory_root + session_root collect 스킵
- **uttec-search / uttec-rag-local**: E·F 패치 fork 적용 가치 검토 (현재는 search vault scope 격리 정책 따라 양방향 직접 수정 X, 향후 별도 카드 발송 검토)

## 관련

- [[search]] § Phase 4.3 megasession
- [[ai-direction]] § 결정 24 정체성 D 검증
- [[gaps]] § search 외부 mode turn-off 미구현
