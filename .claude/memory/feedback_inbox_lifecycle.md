---
name: _inbox 카드 lifecycle 정책 ⭐
description: pending 누적 = 처리 실패. ~~strikethrough~~ 표시는 5단계 lifecycle 모두 완료된 경우에만 허용. 단순 인지나 검토 완료에 strikethrough 금지.
type: feedback
originSessionId: 6ac6c8c6-711e-42bf-80b8-0990a4c8bea3
---
# _inbox 카드 lifecycle 정책

multi-agent vault 간 통신 카드(`myWiki/_inbox/pending/`)의 처리 lifecycle은 반드시 5단계를 모두 수행해야 한다. 단순 인지·검토·메모만으로 처리 완료로 간주 금지.

## 규칙 1 — strikethrough 표시 정책

**작업보고서 / log.md / 어디서든 `~~카드~~` 취소선 표시는 lifecycle 5단계 모두 완료된 경우에만 허용한다.**

- ❌ 잘못된 사용: "카드 본문 확인했음" → `~~카드~~` 표시
- ❌ 잘못된 사용: "다음 megasession에서 처리 예정" → `~~카드~~` 표시
- ✅ 올바른 사용: 5단계 흡수 + processed/ 이동 + status: done + 발신측 done 회신 카드 발송까지 모두 완료된 경우만 `~~카드~~`

**검토만 했다면**: ⬜ 유지 + "(검토 완료, 흡수 대기)" 메모. strikethrough 사용 금지.

## 규칙 2 — 외부 vault 카드는 다른 작업보다 **항상 우선** ⭐⭐ (2026-05-20 사용자 지시)

`myWiki/_inbox/pending/`에 외부 vault(ondevice / revita / wishket / shield / n8n / lemonlabs / uttechome 등)에서 발송된 카드가 **1장이라도 도착하면 다음 prompt에서 다른 신규 작업보다 우선 처리한다**. 단순 알림이 아니라 **다음 자유 슬롯의 디폴트 작업**으로 둔다.

| pending 수 | 권고 |
|:-:|---|
| 0 | 정상 |
| **≥ 1** | ⭐ **다음 작업 슬롯의 디폴트 = 외부 카드 흡수**. 사용자가 다른 작업을 명시적으로 지시하지 않는 한 흡수 megasession 진행. 시급 사용자 직접 작업(🔴 시공 등)이 있을 때만 미룸. |
| ≥ 5 | **강제 권고 + 작업보고서 #1 자동 등록**: "흡수 megasession이 다른 작업보다 우선합니다. 진행할까요? (Y/n)" 사용자가 명시적으로 "보류"하지 않으면 즉시 진행 |
| ≥ 10 | 위급: 시스템 정합성 부채 누적. work-start 최우선 + work-end 차단까지 검토 |

**우선순위 원칙** (사용자 5/20 지시):
1. 외부 vault 카드 = **다음 작업의 디폴트**
2. work-start에서 카드 발견 시 다른 신규 todo보다 위에 표시 + 우선순위 🟠 이상
3. Claude가 다음 작업을 결정할 때(예: "다음에 뭐 할까요?") **인박스 카드 처리를 첫 옵션으로 제시** 의무
4. 카드 처리가 적용 안 된 채 다른 큰 작업(vault 분리·새 기능 구현 등) 시작 금지

## 규칙 3 — 5단계 lifecycle 체크리스트

각 카드 처리 시 반드시 수행:

1. **신규 entity** → `myWiki/second-brain/entities/` 신설 또는 기존 entity 갱신 (skills.md, strengths.md cross-link 포함)
2. **신규 gotcha** → `myWiki/second-brain/gaps.md` 카테고리 추가
3. **신규 decision** → `myWiki/second-brain/ai-direction.md` 판단 로그 추가
4. **매칭 패턴** → `myWiki/second-brain/thoughts/YYYY-QN/YYYY-MM-DD_{topic}.md` 신설 (사실 A + 사실 B → 판단 C → 행동 D)
5. **발신측 entity 갱신** → 카드에 `§ 5. myWiki/entities/ 갱신 권장` 가이드 있으면 따름

처리 완료 후:
- 카드 frontmatter `status: pending` → `status: done`
- 카드 파일 `_inbox/pending/` → `_inbox/processed/` 이동
- 발신측 inbox에 `done` 회신 카드 발송 (`from: mywiki-claude, to: {원래 발신}, type: ack`)
- `myWiki/log.md`에 `## [날짜] absorb | {카드 id}` 1줄 박제

## 규칙 4 — junction 정합성

`myWiki/second-brain/CLAUDE.md` 스키마에 `raw/{name}/ → junction` 등재된 폴더는 **반드시 실재**해야 한다. vault 위치 변경 시 junction 재생성 누락 금지.

work-start hook에서 자동 검증 권장: schema에 등재됐는데 missing이면 알림.

## 왜 이 정책이 필요한가

**Why:** 2026-05-20 발견 — onDevice_AI vault에서 5/17~19 사이 카드 6장이 발송됐는데 myWiki 측에서 lifecycle 5단계 처리가 한 번도 수행되지 않은 채 ~~strikethrough~~로 마킹만 됐다. 결과적으로 5일치 측정 데이터(9→11 보드, Round 6~11, esp32s3 메인 타겟, esp32c6 추가)가 myWiki entity에 미반영, raw/ junction도 부재. 사용자가 직접 vault를 traversal해야만 확인 가능한 상태였음.

원인 3가지:
1. megasession 4 트랙 동시 진행으로 inbox 흡수가 항상 후순위
2. strikethrough 표시가 "인지" vs "완료" 의미로 혼용
3. lifecycle 자동 트리거 부재 (work-start 알림은 정보성, 강제 권고 없음)

**How to apply:**
- 작업보고서·log·메모에 ~~취소선~~을 쓸 때 반드시 5단계 완료 여부를 검증
- pending 카드 발견 시 위 임계치 표에 따라 행동
- **외부 vault 카드는 1장이라도 다음 prompt에서 우선 처리** (디폴트 작업)
- 새 카드 5장 이상 발견 → 다음 prompt에 "흡수 megasession 우선 진행할까요?" 적극 권고
- vault scope 격리 정책(`feedback_vault_scope_isolation.md`)과 함께 운용 — 흡수 처리는 today repo의 mywiki-claude 책임이지 vault 측 책임 아님

본 정책 도입일: 2026-05-20.
**2026-05-20 보강**: 사용자 명시 지시 — "외부 vault로부터 온 내용은 우선 처리". onDevice 6장 누락 사건 + 잔여 12장 lifecycle 정리 megasession 직후 박제. 규칙 2를 임계치 기반에서 **1장이라도 우선 처리** 디폴트로 강화.
