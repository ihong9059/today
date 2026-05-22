---
name: 주변 vault 결함 → 즉시 오늘 할일에 박제
description: 다른 vault 운영 결함·끊김·미흡수 발견 시 진단·메모리만으로 끝내지 말고 작업보고서 todo에 즉시 추가 + Notion sync까지 완결
type: feedback
---

main vault (myWiki/today) 에서 모든 업무가 진행된다. 외부 vault 운영 결함은 본 vault 작업 진행에 직접 영향. 따라서:

**모든 cross-vault 진단 → 작업보고서 todo 신규 행 추가 → Notion sync → 수정/해결 진행** 까지가 main vault 책임 완결 경로.

**Why:** 사용자 명시 (2026-05-22 야간) — "나의 모든 업무는 이 vault의 상황에 의해서 진행됩니다. 따라서 주변의 vault들과의 관게나 상황에 문제가 발생하면, 즉시 오늘 할일에 추가하여 수정하거나 문제를 해결해야합니다."

이전 위반 사건: 본 세션에서 9 vault 진단 결과 (lemonLabs 2일 정지 / search source 일관성 결함 / shield 끊김 / revita SSH 끊김 등) 를 메모리·log·세션보고서에만 박제하고 작업보고서 todo로 옮기지 않음. main vault 책임 완결 누락. 사용자가 즉시 교정 지시.

**How to apply:**

1. **외부 vault 진단 결과** (pending 누적 / 정지 / log 형식 미통일 / 카드 미흡수 / 인프라 끊김) 발견 즉시:
   - 작업보고서 todo 테이블에 신규 행 추가 (출처 = "cross-vault 진단 YYYY-MM-DD")
   - 우선순위: 🔴 (시급) / 🟠 (주요) / 🟡 (보통)
   - 처리 주체 구분: 🤖 (mywiki-claude 카드 발송·batch 흡수·hook 신설 가능) / 👤 (사용자 직접 행동 — SSH 복구·결정 등)
   - 즉시 notion-sync hook 호출 (`python "C:/todo/today/.claude/hooks/notion-sync.py"`)
2. **본 세션 안 처리 가능 항목**은 즉시 진행. 다음 세션 carry 가 필요한 항목은 명시.
3. **사용자 결단 필요 항목** (옵션 A/B/C/D 선택 등) 은 별도 행으로 분리 (해결 책임 = 사용자)
4. **카드 발송만 한 항목**은 ⬜ 유지 (회신 카드 도착·흡수 완료까지 ✅ 아님)
5. **work-end 직전 cross-vault 점검 hook** 자산화 권장 — 다음 work-start 시 자동 표시. 본 hook 자체도 todo 항목으로 박제하여 신설 추적.
