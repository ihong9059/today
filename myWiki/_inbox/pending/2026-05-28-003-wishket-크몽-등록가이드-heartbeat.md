---
id: 2026-05-28-003-wishket-크몽-등록가이드-heartbeat
from: wishket-claude
to: mywiki-claude
type: done
priority: normal
subject: 크몽 등록가이드 박제 (Step 0~6 + 결정 6건) — heartbeat + 향후 entity 신설 사전 알림
created: 2026-05-28T16:15:00+09:00
related:
  - wishketProject/크몽/등록가이드.md
  - wishketProject/크몽/양산자문/v1.md
  - 2026-05-27 megasession (크몽 양산자문 v1 박제)
status: pending
---

# 크몽 등록가이드 박제 (Step 0~6 + 결정 6건) — heartbeat

## 본 세션 변경 내용 (wishket-claude)

사용자 크몽 가입 완료 보고 (2026-05-28) → 다음 세션 차분 등록 위한 SOP 박제:

- `wishketProject/크몽/등록가이드.md` 신설 (~7KB)
- **Step 0~6**: 전문가 전환 → v1→v2 결정 → 카테고리 확인 → 썸네일 → grep 검증 → 사이트 등록 → 후기 빌딩
- **결정 6건 + 사이트 확인 1건** 양식화:
  - 결정 0. 사업자(UTTEC) vs 프리랜서 — 권장 A
  - 결정 1. 제목 3안 — 권장 A
  - 결정 2. 가격 3안 (99K/299K/790K 보수형 entry) — 권장 A
  - 결정 3. 자문진 회사명 추상 vs 구체 — 권장 A 시작
  - 결정 4. 양산 사례 도메인 추상 vs 구체 — 권장 A 시작
  - 결정 3-image. 썸네일 (자체/vault 모형/AI) — 권장 자체 또는 vault 모형
  - 사이트 확인 1. 카테고리 정확 명칭 + 경로
- 본 SOP = 향후 신규 상품(코드리뷰·IoT 자문) 재사용 가능

## 영향 (mywiki 측)

**즉시 영향 없음 — heartbeat 성격**. 다만 향후 트리거 사전 알림:

1. **크몽 첫 판매 도달 시** → wishket-claude가 absorb 카드 발송하여 mywiki 측 `entities/크몽활동.md` 신설 요청 예정 (현재는 `entities/위시캣활동.md`만 존재)
2. **양산자문 사이트 등록 완료 시** → wishket-claude가 사이트 URL + 상품 ID 박제 카드 발송
3. **결정 0 (UTTEC 사업자 등록)**이 진행되면 사업자번호 활용 영역(세금계산서 발행) 확장 → mywiki 측 영업 자산 박제 후보

## 후속 액션 (mywiki 측)

**현재 시점은 액션 없음** — done 카드. 다음 트리거 시 wishket-claude 측에서 추가 카드 발송.

## 보조 정보

- 본 박제는 5/27 megasession 크몽 진출 (양산자문 v1.md) 후속 — vault 정체성에 "크몽" 채널 신규 추가 인지
- 본 vault CLAUDE.md에 크몽 진출 기록 박제 완료 (5/27)
- 양 vault skill 자동 동기는 wishket-check만 (크몽 관련 skill은 양산자문/v1 외 미신설)

## 발신 트리거

본 vault `/work-end` § 5-F always-send 정책 — 매 work-end 시 mywiki/_inbox/pending/에 absorb 또는 heartbeat 강제.
