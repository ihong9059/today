# Multi-Agent Claude 협업 시스템 — 빠른 진입 가이드 (6 Claude)

> 새 Claude 세션이 한 번에 시스템 전체를 파악하고 즉시 합류 가능하게 만든 진입점.
> 본 가이드는 합의 일자: 2026-05-12. 갱신: 2026-05-16 (wishket-claude 합류, 6 Claude로 확장).

## 핵심 한 줄

> **6 Claude(`mywiki-claude` / `revita-claude` / `ondevice-claude` / `n8n-claude` / `shield-claude` / `wishket-claude`)가 각자의 프로젝트 폴더에서 `_inbox/pending/` 메일박스를 통해 비동기 협업한다. 사용자가 broker 역할을 하지 않아도 ingest·흡수·정합화가 자동.**

## 시스템 구성도 (6 Claude, 5/16~)

```
┌──── revita-claude (작업 위치: C:\todo\revitaProject\orgRevita\) ───┐
│  Windows · .claude/hooks/check-inbox.py + check-ingest.py          │
│  _inbox/pending/   ← 수신                                           │
│  application/revitaWiki/log.md  ← ingest #N                         │
│  → work-end 시 myWiki/_inbox/pending/ 에 흡수 카드 자동 작성       │
└────────────────────────────────────────────────────────────────────┘
                          ↕ (비동기)
┌──── mywiki-claude (작업 위치: C:\todo\today\myWiki\) ──────────────┐
│  Windows · .claude/hooks/check-inbox.py                             │
│  _inbox/pending/   ← 수신 (모든 vault의 흡수 허브)                  │
│  second-brain/log.md  ← absorb 박제                                 │
│  thoughts/2026-Q{N}/  ← 매칭 패턴 발견 시 신규                      │
│  → 응답 카드 → revita / ondevice / n8n / shield / wishket 측 _inbox/│
└────────────────────────────────────────────────────────────────────┘
                          ↕ (비동기)
┌──── ondevice-claude (작업 위치: C:\todo\onDevice_AI\) ─────────────┐
│  Windows · .claude/hooks/check-inbox.py (5/15~)                    │
│  _inbox/pending/   ← 수신                                           │
│  log.md  ← 검증·비즈니스 통합 시간순                                │
│  business/  ← 제품 비즈니스 (구 uttecBizWiki 흡수)                   │
│  → work-end 시 myWiki/_inbox/pending/ 에 흡수 카드 자동 작성       │
└────────────────────────────────────────────────────────────────────┘
                          ↕ (비동기, 분산 호스트)
┌──── n8n-claude (작업 위치: /home/uttec/project/n8nUttec/) ────────┐
│  Ubuntu 22.04 · Tailscale 100.90.158.36 / LAN 192.168.0.7          │
│  .claude/hooks/check-inbox.py (5/16~)                              │
│  _inbox/pending/   ← 수신                                           │
│  workflows/  ← n8n 워크플로우 JSON 박제 (source-of-truth)            │
│  → work-end 시 myWiki/_inbox/pending/ 에 흡수 카드 자동 작성       │
└────────────────────────────────────────────────────────────────────┘
                          ↕ (비동기, 분산 호스트)
┌──── shield-claude (작업 위치: /home/uttec/project/shield/) ───────┐
│  RPi Linux · Tailscale 100.120.255.34 / LAN 192.168.0.3            │
│  .claude/hooks/check-inbox.py (5/16~)                              │
│  _inbox/pending/   ← 수신                                           │
│  second-brain/log.md  ← shield 시험 결과·박제                        │
│  구현/, 회로도/  ← hardware 응용 (LoRa·RS485·RS422·MESH·I2C)        │
│  → work-end 시 myWiki/_inbox/pending/ 에 absorb 카드 ★ 강제         │
│  (work-end SKILL § 5-F 커스텀: 매 work-end always send card)        │
└────────────────────────────────────────────────────────────────────┘
                          ↕ (비동기, **사업 트랙 vault**)
┌──── wishket-claude (작업 위치: C:\todo\wishketProject\) ──────────┐ ⭐ NEW (5/16)
│  Windows · .claude/hooks/check-inbox.py                            │
│  _inbox/pending/   ← 수신                                           │
│  second-brain/log.md  ← 영업 활동 시간순                             │
│  위시캣/  ← 지원서 27건+ / 가능프로젝트 35건+ / ref 이력서/경력서    │
│  .claude/skills/wishket-{check,apply}/SKILL.md (절대 경로화)        │
│  → work-end 시 myWiki/_inbox/pending/ 에 absorb 카드 ★ 강제         │
│  (work-end SKILL § 5-F 커스텀: 매 work-end always send card)        │
│  자매 시스템: n8n-claude (Ubuntu cron 09:00 자동검색) → 결과 흡수    │
└────────────────────────────────────────────────────────────────────┘
```

## 핵심 자산 (각 위치, 5/16~ 6 Claude)

| 위치 | 파일 | 역할 |
|---|---|---|
| `C:\todo\today\myWiki\_inbox\` | `PROTOCOL.md` | 6 Claude 동일 표준 |
| 위와 동일 | `SYSTEM_GUIDE.md` | 빠른 진입 가이드 |
| 위와 동일 | `pending/`, `processed/` | myWiki 측 메일박스 |
| `C:\todo\today\myWiki\.claude\hooks\` | `check-inbox.py` | `SELF_ID="mywiki-claude"` |
| `C:\todo\revitaProject\orgRevita\_inbox\` | `PROTOCOL.md` 사본 + `pending/processed/` | revita 측 메일박스 |
| `C:\todo\onDevice_AI\_inbox\` (5/15~) | `PROTOCOL.md` 사본 + `pending/processed/` | ondevice 측 메일박스 |
| `/home/uttec/project/n8nUttec/_inbox/` (5/16~, Ubuntu) | `PROTOCOL.md` 사본 + `pending/processed/` | n8n 측 메일박스 (분산 호스트) |
| `/home/uttec/project/shield/_inbox/` (5/16~, **RPi**) | `PROTOCOL.md` 사본 + `pending/processed/` | shield 측 메일박스 (분산 호스트) |
| **`C:\todo\wishketProject\_inbox\`** (5/16~) | **`PROTOCOL.md` 사본 + `pending/processed/`** | **wishket 측 메일박스 (사업 트랙 vault)** ⭐ |
| **`C:\todo\wishketProject\.claude\hooks\`** | **`check-inbox.py`** | **`SELF_ID="wishket-claude"`** |
| **`C:\todo\wishketProject\.claude\skills\wishket-{check,apply}\`** | **`SKILL.md`** | **영업 자동화 skill (절대 경로화)** |

## 표준 카드 형식 (요약)

```yaml
---
id: 2026-MM-DD-NNN
from: wishket-claude          # 또는 다른 식별자
to: mywiki-claude             # 수신측
type: request                 # request | acknowledge | done | escalate
priority: normal              # low | normal | high | urgent
subject: {제목}
created: ISO-시각
status: pending
---

# 본문 (Markdown 자유 형식)
```

상세: `_inbox/PROTOCOL.md` 참조.

## 확장 — 새 Claude / 위키 추가 시

1. 해당 프로젝트에 `_inbox/{pending,processed}/` + `PROTOCOL.md` 사본
2. `.claude/hooks/check-inbox.py` 작성 (SELF_ID만 변경)
3. `.claude/settings.local.json`에 SessionStart hook 등록
4. 모든 기존 Claude의 PROTOCOL.md 합의 이력 §에 새 식별자 등재 (N Claude 동기화)
5. 본 SYSTEM_GUIDE.md 사본도 만들면 새 Claude도 빠른 진입 가능

**현재 활성 Claude (6 시스템, 5/16~)**:
- `mywiki-claude` — `today/myWiki/` (Windows) — 학습·도구·범 사업 허브
- `revita-claude` — `revitaProject/orgRevita/` (Windows) — REVITA 제품
- `ondevice-claude` — `/todo/onDevice_AI/` (Windows, 5/15 합류) — AI FanStick + Stage 4 제품 통합
- `n8n-claude` — `/home/uttec/project/n8nUttec/` (Ubuntu, 5/16 합류) — n8n 자동화 학습 + UTTEC 영업·사업화 vault
- `shield-claude` — `/home/uttec/project/shield/` (RPi Linux, 5/16 합류) — RPi shield 보드 응용 개발
- **`wishket-claude` — `wishketProject/` (Windows, 5/16 합류) — 위시캣 영업 자산** ⭐ NEW

**vault 트랙 분류 (2026-05-16 정립)**:
- **학습/도구 허브 트랙**: mywiki
- **제품 트랙**: revita / ondevice / shield
- **자동화 학습 트랙**: n8n
- **사업 트랙 (영업 자산)**: wishket ⭐ (첫 사례)

→ 향후 다른 사업 라인 (uttec-edu 등) 사업 트랙 vault 패턴으로 확장 가능.

**적용된 셋업 패키지**: `today/obsidian/myWikiSetup/templates/` — 시나리오 D 4 차례 적용 (2·3·4·5번째 위키), 본 패키지의 메타 검증 강화 (분산 호스트 3 사례 + 사업 트랙 1 사례 누적)

## 합의 이력

- **2026-05-12 단계 1**: myWiki Claude 제안 (옵션 A 단순 메일박스, 표준 카드, 외부 `_claude-bus` 중앙 위치)
- **2026-05-12 단계 2**: revita Claude ACK + 위치 조정 (외부 → 각 프로젝트 내부 `_inbox/`)
- **2026-05-12 단계 3**: myWiki Claude 합의 완료 + 셋업 완료
- **2026-05-12 단계 4**: 첫 흡수 사이클 완료 (ingest #8 → 6건 사업 자산 박제)
- **2026-05-12 단계 5**: work-start / work-end 스킬 통합 + 본 SYSTEM_GUIDE 신설
- **2026-05-15**: **ondevice-claude 합류** — `/todo/onDevice_AI/` (별도 private repo) multi-agent 시스템 합류. 3 Claude 시스템으로 확장 (myWikiSetup 시나리오 D 첫 적용 사례).
- **2026-05-16**: **n8n-claude 합류** — `/home/uttec/project/n8nUttec/` (Ubuntu 호스트) multi-agent 합류. 4 Claude 시스템 + 분산 호스트 Windows ↔ Linux 검증 (시나리오 D 두 번째 사례).
- **2026-05-16**: **shield-claude 합류** — `/home/uttec/project/shield/` (RPi Linux 호스트) multi-agent 합류. 5 Claude 시스템 + 분산 호스트 3 사례 누적 (Windows 1 + Linux 2). work-end § 5-F "always send absorb card" 강제 룰 신설 (시나리오 D 세 번째 사례).
- **2026-05-16**: **wishket-claude 합류** — `C:/todo/wishketProject/` (Windows) multi-agent 합류. **6 Claude 시스템 + 사업 트랙 vault 첫 사례** (기존은 모두 제품·학습 트랙). 분리 lifecycle 3단계 진화 (분리 → 절대 경로화 → multi-agent 합류) 첫 완전 사례. work-end § 5-F always-send 강제 룰 채택 (shield 패턴 재활용). 자매 시스템 n8n-claude (Ubuntu cron 09:00 자동검색)과 영업 사이클 분담 협업. myWikiSetup 시나리오 D 네 번째 적용 사례.

## 관련 thoughts

- `myWiki/second-brain/thoughts/2026-Q2/2026-05-12_revitaWiki-myWiki-비대칭.md` — 시스템 도입 진단
- `myWiki/second-brain/thoughts/2026-Q2/2026-05-12_원격모니터링-사업라인.md` — 첫 흡수 결과 매칭 패턴
- `myWiki/second-brain/thoughts/2026-Q2/2026-05-15_제품별-vault-통합-패턴.md` — 시나리오 D 첫 사례 박제
- `myWiki/second-brain/thoughts/2026-Q2/2026-05-16_n8n-claude-합류.md` — 시나리오 D 두 번째 사례
- `myWiki/second-brain/thoughts/2026-Q2/2026-05-16_shield-claude-합류.md` — 시나리오 D 세 번째 사례 (5 Claude 확장 + 분산 호스트 3 사례)
- `wishketProject/second-brain/thoughts/2026-Q2/2026-05-16_wishket-claude-합류.md` — 본 사례 (6 Claude 확장 + 사업 트랙 첫 사례)

## 메타

| 항목 | 값 |
|---|---|
| 도입일 | 2026-05-12 |
| 6 Claude 확장 | 2026-05-16 |
| 신뢰 검증 | 첫 사이클 4 카드 정상 완료 + hook 동작 검증 + 시나리오 D 4 사례 (분산 호스트 3 + 사업 트랙 1) |
| 향후 점검 | 1개월 후(6/12) — 자동 흡수율 측정 / 분기 후 — 영업 자산화 효과 측정 |
