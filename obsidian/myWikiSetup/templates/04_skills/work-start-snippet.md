# work-start SKILL.md § 1-C 통합 snippet

> 본 snippet을 기존 `work-start/SKILL.md`의 "단계 1" 시리즈 뒤(또는 "단계 2" 직전)에 삽입.
> 셋업 시 `{{WIKI_PATH}}`만 본인 경로로 치환.

---

### 1-C. multi-agent _inbox 카드 확인

**시스템 가이드**: `{{WIKI_PATH}}/_inbox/SYSTEM_GUIDE.md` (전체 개요·합의 이력·다음 Claude를 위한 빠른 진입점)

본 위키는 다른 Claude와 `_inbox/` 메일박스로 비동기 협업한다. 미처리 카드 우선 처리.

```bash
ls "{{WIKI_PATH}}/_inbox/pending/" 2>/dev/null
```

**판단 후 행동:**
- **빈 폴더 또는 없음** → 침묵 (보고 생략, 다음 단계 진행)
- **미처리 카드 있음** → 사용자에게 알림:
  ```
  📬 {{WIKI_PATH}}/_inbox/pending/ 미처리 카드 N건 — multi-agent 통신
    - [priority/type] from {발신측} | {subject}
  처리: 카드 본문 읽기 → 5단계 흡수 (외부 위키 흡수 정책) → processed/로 이동 + status: done
  발신측 inbox에 done 회신 카드 발송 (PROTOCOL: {{WIKI_PATH}}/_inbox/PROTOCOL.md)
  ```
- 사용자가 처리 결정 → 카드 본문 읽고 5단계 흡수 수행. 처리 후 다음 단계 진행
- 사용자가 보류 → 다음 work-start에서 다시 알림

**5단계 흡수 체크리스트** (CLAUDE.md § "외부 위키 흡수" 참조):
1. 신규 entity → skills.md / strengths.md
2. 신규 gotcha → gaps.md
3. 신규 decision → ai-direction.md 판단 로그
4. 매칭 패턴 → thoughts/YYYY-Q{N}/
5. 본 위키 측 entity → entities/* 갱신

처리 완료 시:
1. 카드 → `_inbox/processed/` 이동 + frontmatter `status: done`
2. 발신측 inbox에 `done` 회신 카드 발송
3. `log.md`에 `## [날짜] absorb | ...` 박제
