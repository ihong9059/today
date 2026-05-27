---
name: 분산 호스트 broker 양방향 자동화 패턴 ⭐
description: 분산 vault (factory-rpi4·shield 등) ↔ myWiki 카드 sync는 pull/push 스크립트 자동화. 사용자 수동 broker 금지 — frontmatter `to:` 필드로 라우팅.
type: feedback
originSessionId: 79c08776-ba5b-46d3-a9fd-cea60372b44b
---
분산 호스트 vault (factory-rpi4, shield, n8n, uttec-vault, uttec-search, uttec-rag-local 등)와 myWiki 사이 multi-agent 카드 sync는 **자동 broker 스크립트**로만 진행한다. 사용자 수동 scp · copy 금지.

**Why**: 5/26 야간 이전까지는 모든 분산 vault가 사용자 broker (scp 또는 사본 path) 의존 → shield는 5/22~ 9건 outbound가 누적된 상태로 정체. 사용자 행동이 cross-vault 통신의 bottleneck. 5/26 야간 broker 양방향 자동화 신설 + 동작 검증 (factory-rpi4 join 카드 + shield 9 outbound 일괄 sync + myWiki ack push) → 사용자 broker 0건 운영 모델 진화.

**How to apply**:

1. **스크립트 위치**:
   - pull (분산 → myWiki): `today/.claude/hooks/pull-multi-agent-outbound.py`
   - push (myWiki → 분산): `today/.claude/hooks/push-multi-agent-pending.py`
   - 자동 호출: `today/.claude/skills/work-end/SKILL.md § 6-Z` (git commit 직전)

2. **라우팅 (5/27 11:00 시점 활성)**:
   - **ssh+scp**: factory-rpi4 (100.109.84.79) + shield-rpi4 (100.110.51.14) + **n8n-claude (100.90.158.36)** ⭐NEW 5/27
   - **본 PC vault file copy**: ondevice / wishket / lemonlabs / uttechome / search / revita (6 vault)
   - **미정의**: uttec-vault / uttec-search / uttec-rag-local (필요 시 추가)

3. **카드 발신 컨벤션**:
   - frontmatter `to:` 필드 기준 자동 라우팅 (예: `to: mywiki-claude`, `to: ondevice-claude`)
   - 라우팅 미정의 vault 발신 시 broker가 skip → outbox-staging 누적 함정 (5/20 frontmatter 없는 카드 2건 + 5/24 uttec-vault 라우팅 미정의 1건 사례)
   - **새 vault 합류 시 라우팅 추가 필수** (스크립트 라우팅 dict)

4. **흡수 후 처리**:
   - pull 자동 처리: 원격 outbound → outbound-archived/ 이동 (재발송 방지)
   - push 자동 처리: myWiki pending → 분산 vault `_inbox/pending/` 도착 후 myWiki processed/로 이동

5. **사용자 broker가 필요한 케이스 (예외)**:
   - 라우팅 미정의 vault (스크립트 갱신 전 임시)
   - frontmatter 없는 legacy 카드 (수동 정리)
   - 본 PC 외부 vault인데 ssh 미설정 (라우팅 추가 전)

6. **fact-check 룰** ⭐ (5/27 §6-4 발견 박제):
   - 발신측 vault 자체 점검 미흡 → in_reply_to 카드 §"잔여 결단" 박제 시 자기 진행상황 누락 가능 (사례: wishket-claude #002 §6-4가 09:01에 자기 vault CLAUDE.md 신설했음에도 09:58 카드 작성 시 "결단 보류 중"으로 기재)
   - **수신측 (mywiki-claude) 처리 룰**: 카드 §"권고/결단 후보"에 따라 새 카드 발신 또는 vault 측 작업 트리거 직전, **발신측 vault 실제 상태 cross-check** (파일 존재, mtime, git log 등) → stale 결단이면 카드 발송 회피 + thought/entity에 "stale 결단 확인" 박제
   - 일반화: 카드 작성 시 자기 vault 진행상황 자체 점검 + 수신측은 trust-but-verify 적용

**관련 사건**:
- 5/26 야간 broker 첫 진화 (factory-rpi4 join + shield 9 outbound 일괄 흡수)
- 5/27 n8n-claude 라우팅 활성화 (push 스크립트 line 43 주석 → 실 라우팅, scp 발송 검증 후 자동화 전환)
- 5/27 §6-4 fact-check 발견 = wishket-claude CLAUDE.md 자율 신설 stale 결단 + 룰 6 신설
- onDevice_AI/_outbox/ (`_outbox` 경로 컨벤션) ↔ broker가 사용하는 `_inbox/outbound` 차이 — onDevice_AI 라우팅 추가 시 어댑터 필요
