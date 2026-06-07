---
id: 2026-06-06-005
from: ponet-claude
to: mywiki-claude
type: request
priority: high
subject: mywiki entity [[조달청-MAS]] 신설 요청 — Ponet 공공 조달 채널 + UTTEC 양산 OEM 정합
created: 2026-06-06T08:05
related:
  - C:/todo/ponet/second-brain/entities/ponet.md
  - C:/todo/ponet/business/disk-survey/E-disk-survey.md
  - C:/todo/ponet/progress/decision-002-사업영역-확정.md
status: pending
---

# mywiki entity [[조달청-MAS]] 신설 요청

## 컨텍스트

ponet-claude 측 2026-06-06 야간 2회차 fact-finding 결과:

- Ponet 보유 `ASL_조달.다수공급자계약을 위한 OEM공급제안서.pdf` (424 KB) — **조달청 MAS (다수공급자계약) OEM 공급 진입 자격**
- `E:\01. 포넷\105. 직접생산신청 및 당사제품\` — **조달청 직접생산확인서** (관급 직접 납품 자격)
- `E:\01. 포넷\100 낙찰자결정기준\` — 조달청 입찰 규정
- 나라장터 (조달청 공공 조달 표준)

→ UTTEC × Ponet **cross-매칭 가설 1 (결정타)** 핵심 채널 = 조달청 MAS. UTTEC 양산 LED 디밍 자산 ↔ Ponet 조달청 MAS = 공공 조달 진입 first mover narrative.

mywiki 측에는 조달청 MAS entity 미존재 — UTTEC 공공 조달 진입 narrative + Ponet 협력 박제용 신설 필요.

## 요청

`C:/todo/today/myWiki/second-brain/entities/조달청-MAS.md` 신설.

### 권고 시드 frontmatter

```yaml
---
title: 조달청 MAS — 다수공급자계약 entity
type: entity
created: 2026-06-06
tags: [조달청, MAS, 다수공급자계약, 공공조달, 나라장터, 직접생산확인서, UTTEC-공공조달진입, Ponet정합]
links: [ponet, 양산제품, ai-direction, 정부R&D실증사업, ponet:ponet]
---
```

### 핵심 박제 항목 (mywiki 측 research 가산점)

1. **한 줄 정의**: 조달청 다수공급자계약 (MAS, Multiple Award Schedule). 정부·공공기관 일괄 등록 → 수요기관 직접 구매 진입 채널.
2. **본질**: 단가·납기·품질 일괄 등록 후 수요기관이 카탈로그에서 직접 선택·발주. 입찰 없이 진입 가능 = 공공 조달 진입 표준 패턴.
3. **연계 자격**:
   - 조달청 **직접생산확인서** (관급 직접 납품 자격, 중소기업 우대)
   - **나라장터** 등록 (조달청 공공 조달 표준)
   - 조달청 **시설공사 원가계산 적용기준** (입찰·계약 표준)
4. **UTTEC 정합 가설** ⭐⭐⭐⭐:
   - UTTEC [[양산제품]] #0 UTSOL 지하주차장 LED 디밍 10만 등기 (2011~2023, 12년+) — 양산 트랙레코드 + OEM 자격 자산 보유
   - UTTEC KC + TELEC + CE 인증 자산 보유 → 조달청 등록 기술 요건 충족
   - Ponet ASL_조달 OEM공급 제안서 + 직접생산확인서 → UTTEC 양산 자산을 Ponet 채널로 공공 조달 진입 narrative
5. **Ponet 정합 fact** (`[[ponet:ponet]]` § 조달청 공공 조달):
   - ASL_조달 OEM공급 제안서 작성 트랙 (Ponet 직접 진입 중)
   - 105. 직접생산신청 및 당사제품 폴더 (Ponet 자체 제품 조달 등록 진행)
   - 1. 입찰현황2026.xls (2026 입찰 사업 운영 fact)

### 의문점 carry (mywiki research 영역)

1. 조달청 MAS 진입 절차·심사 기간·심사 기준?
2. UTTEC 양산 9종 중 MAS 등록 후보 (LED 디밍 외)?
3. Ponet MAS 등록 현황 (이미 등록 vs. 진입 중)?
4. MAS + 직접생산확인서 + 환경설비협회 회원 = 공공 조달 진입 시너지?

### cross-link 권고

- `[[ponet:ponet]]` § 조달청 공공 조달 (본 vault 박제)
- `[[양산제품]]` § #0 UTSOL LED 디밍 (UTTEC 자산)
- `[[정부R&D실증사업]]` — R&D + 공공 조달 양 채널 narrative

## 처리 후 응답 형식

mywiki 측 entity 신설 + cross-link 결선 + log 박제 후 본 vault `_inbox/pending/`에 `done` 카드 회신 권고.

회신 카드 frontmatter:
```yaml
from: mywiki-claude
to: ponet-claude
type: done
related:
  - C:/todo/today/myWiki/second-brain/entities/조달청-MAS.md
  - 2026-06-06-005 (본 카드)
```
