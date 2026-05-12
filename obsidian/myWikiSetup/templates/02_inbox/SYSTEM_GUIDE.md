# Multi-Agent Claude 협업 시스템 — 빠른 진입 가이드

> 새 Claude 세션이 한 번에 시스템 전체를 파악하고 즉시 합류 가능하게 만든 진입점.
> 셋업 일자: {{TODAY}}

## 핵심 한 줄

> **두 Claude(`{{SELF_CLAUDE_ID}}` / `{{PEER_CLAUDE_ID}}`)가 각자의 프로젝트 폴더에서 `_inbox/pending/` 메일박스를 통해 비동기 협업한다. 사용자가 broker 역할을 하지 않아도 ingest·흡수·정합화가 자동.**

## 시스템 구성도

```
┌──── {{PEER_CLAUDE_ID}} (작업 위치: {{PEER_PATH}}) ────┐
│                                                       │
│  .claude/hooks/check-inbox.py  ← SessionStart 자동   │
│      ↓                                                │
│  _inbox/pending/   ← 자기에게 온 카드                │
│      ├─ 자동 컨텍스트 주입                            │
│      ├─ 처리 후 → processed/                          │
│      └─ 응답 카드 → {{WIKI_PATH}}/_inbox/pending/    │
└───────────────────────────────────────────────────────┘
                          ↕ (비동기)
┌──── {{SELF_CLAUDE_ID}} (작업 위치: {{WIKI_PATH}}) ────┐
│                                                       │
│  .claude/hooks/check-inbox.py  ← SessionStart 자동   │
│      ↓                                                │
│  _inbox/pending/   ← 자기에게 온 카드                │
│      ├─ 5단계 흡수 (외부 위키 흡수 정책)              │
│      ├─ 처리 후 → processed/ + status: done          │
│      └─ done 카드 → {{PEER_PATH}}/_inbox/pending/    │
└───────────────────────────────────────────────────────┘
```

## 핵심 자산 (각 위치)

| 위치 | 파일 | 역할 |
|---|---|---|
| `{{WIKI_PATH}}/_inbox/` | `PROTOCOL.md` | 양쪽 동일 표준 |
| 위와 동일 | `SYSTEM_GUIDE.md` | 본 파일 |
| 위와 동일 | `pending/`, `processed/` | 메일박스 |
| `{{WIKI_PATH}}/.claude/hooks/` | `check-inbox.py` (`SELF_ID="{{SELF_CLAUDE_ID}}"`) | SessionStart 자동 확인 |
| `{{WIKI_PATH}}/.claude/` | `settings.local.json` | hook 등록 |
| `{{WIKI_PATH}}/CLAUDE.md` | § "외부 위키 흡수 (Absorption)" | 5단계 흡수 체크리스트 |
| `{{PEER_PATH}}/_inbox/` | (동일 구조 반대편) | |

## 표준 카드 형식 (요약)

```yaml
---
id: YYYY-MM-DD-NNN
from: {{SELF_CLAUDE_ID}}      # 또는 {{PEER_CLAUDE_ID}}
to: {{PEER_CLAUDE_ID}}        # 수신측
type: request                 # request | acknowledge | done | escalate
priority: normal              # low | normal | high | urgent
subject: 한 줄 제목
created: ISO-시각
status: pending
---

# 본문
```

상세: `PROTOCOL.md`

## work-start 통합

`.claude/skills/work-start/SKILL.md § 1-C` 명시:
1. `_inbox/pending/` 자동 확인 (hook이 함)
2. 미처리 카드 있으면 우선 처리
3. 5단계 흡수 실행 → processed/ 이동 + status:done
4. 발신측에 done 회신 카드
5. `log.md` absorb 박제

## work-end 통합

`.claude/skills/work-end/SKILL.md § 5-E/5-F/5-G`:
- **5-E. 외부 위키 흡수 점검**: 다른 위키 마지막 ingest vs 본 위키 마지막 absorb 비교
- **5-F. multi-agent 인계 카드 작성**: 다른 Claude가 알아야 할 변경 시 카드
- **5-G. 시스템 인지 자산 보호**: PROTOCOL/SYSTEM_GUIDE/hook 존재 검증

## 확장 — 새 Claude / 위키 추가

새 Claude (예: 3번째) 가입 시:
1. 해당 프로젝트에 `_inbox/{pending,processed}/` + `PROTOCOL.md` 사본
2. `.claude/hooks/check-inbox.py` 작성 (SELF_ID만 변경)
3. `.claude/settings.local.json`에 SessionStart hook 등록
4. PROTOCOL.md 합의 이력 § 새 Claude 식별자 등재
5. 본 SYSTEM_GUIDE.md 사본도 만들면 새 Claude 빠른 진입

## 메타

| 항목 | 값 |
|---|---|
| 셋업일 | {{TODAY}} |
| 셋업 패키지 | obsidian/myWikiSetup |
| 출처 | UTTEC + REVITA 2026-05-12 합의 |
