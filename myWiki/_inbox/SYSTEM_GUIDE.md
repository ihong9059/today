# Multi-Agent Claude 협업 시스템 — 빠른 진입 가이드

> 새 Claude 세션이 한 번에 시스템 전체를 파악하고 즉시 합류 가능하게 만든 진입점.
> 본 가이드는 합의 일자: 2026-05-12.

## 핵심 한 줄

> **두 Claude(`mywiki-claude` / `revita-claude`)가 각자의 프로젝트 폴더에서 `_inbox/pending/` 메일박스를 통해 비동기 협업한다. 사용자가 broker 역할을 하지 않아도 ingest·흡수·정합화가 자동.**

## 시스템 구성도 (3 Claude, 5/15~)

```
┌──── revita-claude (작업 위치: C:\todo\revitaProject\) ────────┐
│  .claude/hooks/check-inbox.py + check-ingest.py                │
│  _inbox/pending/   ← 수신                                       │
│  application/revitaWiki/log.md  ← ingest #N                     │
│  → work-end 시 myWiki/_inbox/pending/ 에 흡수 카드 자동 작성   │
└────────────────────────────────────────────────────────────────┘
                          ↕ (비동기)
┌──── mywiki-claude (작업 위치: C:\todo\today\myWiki\) ──────────┐
│  .claude/hooks/check-inbox.py                                   │
│  _inbox/pending/   ← 수신                                       │
│  second-brain/log.md  ← absorb 박제                             │
│  thoughts/2026-Q{N}/  ← 매칭 패턴 발견 시 신규                  │
│  → 응답 카드 → revita / ondevice 측 _inbox/pending/             │
└────────────────────────────────────────────────────────────────┘
                          ↕ (비동기)
┌──── ondevice-claude (작업 위치: C:\todo\onDevice_AI\) ─────────┐
│  .claude/hooks/check-inbox.py (5/15~)                          │
│  _inbox/pending/   ← 수신                                       │
│  log.md  ← 검증·비즈니스 통합 시간순                            │
│  business/  ← 제품 비즈니스 (구 uttecBizWiki 흡수)               │
│  hardware/, microGPT/, aiFanStick_차세대/  ← 검증               │
│  → work-end 시 myWiki/_inbox/pending/ 에 흡수 카드 자동 작성   │
└────────────────────────────────────────────────────────────────┘
```

## 핵심 자산 (각 위치, 5/15~ 3 Claude)

| 위치 | 파일 | 역할 |
|---|---|---|
| `C:\todo\today\myWiki\_inbox\` | `PROTOCOL.md` | 3 Claude 동일 표준 |
| 위와 동일 | `SYSTEM_GUIDE.md` | **본 파일** — 빠른 진입 가이드 |
| 위와 동일 | `pending/`, `processed/` | myWiki 측 메일박스 |
| `C:\todo\today\myWiki\.claude\hooks\` | `check-inbox.py` | `SELF_ID="mywiki-claude"` |
| `C:\todo\today\myWiki\.claude\` | `settings.local.json` | SessionStart hook 등록 |
| `C:\todo\today\myWiki\second-brain\` | `CLAUDE.md` § "외부 위키 흡수 (Absorption)" | 5단계 흡수 체크리스트 |
| 위와 동일 | `CLAUDE.md` § "today/ 신규 폴더 → entity 검토 정책" | 3단계 신규 폴더 흡수 |
| `C:\todo\revitaProject\_inbox\` | `PROTOCOL.md` 사본 + `pending/processed/` | revita 측 메일박스 |
| `C:\todo\revitaProject\.claude\hooks\` | `check-inbox.py` | `SELF_ID="revita-claude"` |
| **`C:\todo\onDevice_AI\_inbox\`** (5/15~) | **`PROTOCOL.md` 사본 + `SYSTEM_GUIDE.md` 사본 + `pending/processed/`** | **ondevice 측 메일박스** |
| **`C:\todo\onDevice_AI\.claude\hooks\`** | **`check-inbox.py`** | **`SELF_ID="ondevice-claude"`** |
| **`C:\todo\onDevice_AI\.claude\commands\`** | **`work-start.md`, `work-end.md`** | **vault 단위 자동화 (revita 패턴)** |
| `C:\todo\today\.claude\skills\work-start\` | `SKILL.md` § 1-C | _inbox 확인 통합 |
| `C:\todo\today\.claude\skills\work-end\` | `SKILL.md` § 5-E, 5-F, 5-G | 흡수 점검 / 인계 카드 / 자산 보호 |

## 표준 카드 형식 (요약)

```yaml
---
id: 2026-MM-DD-NNN
from: revita-claude          # 또는 mywiki-claude / 기타
to: mywiki-claude            # 수신측
type: request                # request | acknowledge | done | escalate
priority: normal             # low | normal | high | urgent
subject: {제목}
created: ISO-시각
expires: YYYY-MM-DD (옵션)
related: [관련 id 또는 파일]
status: pending              # pending | in_progress | done | rejected
---

# 본문 (Markdown 자유 형식)
```

상세: `_inbox/PROTOCOL.md` 참조.

## work-start 통합 (myWiki 측 — today repo)

`.claude/skills/work-start/SKILL.md § 1-C` 명시:

1. `myWiki/_inbox/pending/` 자동 확인 (SessionStart hook 이미 함)
2. 미처리 카드 있으면 우선 처리
3. 5단계 흡수 실행 → processed/ 이동 + status:done
4. 발신측에 done 카드 회신
5. `myWiki/log.md` absorb 박제

## work-end 통합 (myWiki 측 — today repo)

`.claude/skills/work-end/SKILL.md § 5-E, 5-F, 5-G` 명시:

- **5-E. 외부 위키 흡수 점검**: revitaWiki 마지막 ingest vs myWiki 마지막 absorb 비교. 미흡수 발견 시 즉시 처리 또는 카드 위임
- **5-F. multi-agent 인계 카드 작성**: 다른 Claude가 알아야 할 변경 시 그쪽 inbox에 카드
- **5-G. 시스템 인지 자산 보호**: PROTOCOL.md / SYSTEM_GUIDE.md / hook 존재 검증

## 첫 사이클 완료 사례 (2026-05-12)

| 카드 | from → to | type | subject |
|---|---|---|---|
| #001 | revita-claude → mywiki-claude | request | ingest #8 흡수 요청 (사용자 broker로 임시 전달, 표준 마이그레이션됨) |
| #002 | revita-claude → mywiki-claude | acknowledge | multi-agent 시스템 ACK + 위치 조정 (외부 → 내부) |
| #003 | mywiki-claude → revita-claude | done | 합의 + myWiki 셋업 완료 |
| #004 | mywiki-claude → revita-claude | done | ingest #8 흡수 완료 (6건 사업 자산 박제) |

→ 카드 4건의 lifecycle이 모두 정상 닫힘. 다음 ingest #9부터는 사용자 broker 부담 0.

## 확장 — 새 Claude / 위키 추가 시

새 Claude 추가 시:

1. 해당 프로젝트에 `_inbox/{pending,processed}/` + `PROTOCOL.md` 사본
2. `.claude/hooks/check-inbox.py` 작성 (SELF_ID만 변경)
3. `.claude/settings.local.json`에 SessionStart hook 등록
4. 모든 기존 Claude의 PROTOCOL.md 합의 이력 §에 새 식별자 등재 (3 Claude 동기화)
5. 본 SYSTEM_GUIDE.md 사본도 만들면 새 Claude도 빠른 진입 가능

**현재 활성 Claude (3 시스템, 5/15~)**:
- `mywiki-claude` — `today/myWiki/`
- `revita-claude` — `revitaProject/`
- `ondevice-claude` — `/todo/onDevice_AI/` (5/15 합류, AI FanStick + Stage 4 제품 통합)

**적용된 셋업 패키지**: `today/obsidian/myWikiSetup/templates/` (시나리오 D — 3번째 위키 추가)

## 합의 이력

- **2026-05-12 단계 1**: myWiki Claude 제안 (옵션 A 단순 메일박스, 표준 카드, 외부 `_claude-bus` 중앙 위치)
- **2026-05-12 단계 2**: revita Claude ACK + 위치 조정 (외부 → 각 프로젝트 내부 `_inbox/`)
- **2026-05-12 단계 3**: myWiki Claude 합의 완료 + 셋업 완료
- **2026-05-12 단계 4**: 첫 흡수 사이클 완료 (ingest #8 → 6건 사업 자산 박제)
- **2026-05-12 단계 5**: work-start / work-end 스킬 통합 + 본 SYSTEM_GUIDE 신설
- **2026-05-15**: **ondevice-claude 합류** — `/todo/onDevice_AI/` (별도 private repo) multi-agent 시스템 합류. AI FanStick + Stage 4 제품의 기술+비즈니스 통합 vault. uttecBizWiki는 본 vault `business/` 폴더로 흡수됨. 3 Claude 시스템으로 확장 (myWikiSetup 시나리오 D 적용 첫 사례).

## 관련 thoughts

- `myWiki/second-brain/thoughts/2026-Q2/2026-05-12_revitaWiki-myWiki-비대칭.md` — 시스템 도입 진단
- `myWiki/second-brain/thoughts/2026-Q2/2026-05-12_원격모니터링-사업라인.md` — 첫 흡수 결과 매칭 패턴

## 메타

| 항목 | 값 |
|---|---|
| 도입일 | 2026-05-12 |
| 신뢰 검증 | 첫 사이클 4 카드 정상 완료 + hook 동작 검증 |
| 향후 점검 | 1개월 후(6/12) — 자동 흡수율 측정 / 분기 후 — 영업 자산화 효과 측정 |
