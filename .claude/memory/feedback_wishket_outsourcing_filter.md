---
name: 위시캣 외주(도급) 필터 우선 확인 SOP
description: /wishket-check 실행 시 ID 1씩 검색 전 외주(도급) 필터 페이지 우선 확인. 본 vault는 외주만 가능 + ID 비단조 + 비공개 본문 우회.
type: feedback
originSessionId: b17f0efd-fea9-4ef5-a14b-43f044b3e430
---
`/wishket-check` 실행 시 **ID 1씩 검색 전 외주(도급) 필터 페이지 우선 확인** (사전 단계). 본 vault는 외주(도급)만 가능하므로 외주 필터가 본 vault 영업 정조준 검색이다.

**Why**: 5/27 #155421 (1.5억 / 200일 / 외주, 5/26 활성) 누락 사고 — `/wishket-check` 5/27 catch-up이 `#155593` 이상만 검색 → 시작 ID 미만 외주는 검색 범위 외. #155421 본문 직접 fetch는 PRIME·PRO·BOOST 한정 매칭이라 비공개 redirect되어 ID 단조 증가 가정으로 영원히 못 봤음. **그러나 외주(도급) 필터 페이지(`?employee_type=projc_term`)는 비로그인에서도 제목·단가·기간 노출**. wishket-claude가 5/27 본일 catch-up megasession 중 #155421을 발견 + #001 cascade 정정으로 박제. ID 단조 증가 가정 = 외주 풀 별도 채번 또는 비공개→공개 전환 시점에 옛 ID 재노출 가능성으로 거짓.

**How to apply**:
1. `/wishket-check` 절차 시 `https://www.wishket.com/project/?employee_type=projc_term` 페이지를 ID sequential 검색 **이전에** WebFetch
2. 첫 페이지 5~10건의 모든 외주 ID·제목·단가·기간·근무 추출 → 가능프로젝트 후보 박제
3. 외주 필터 페이지가 비공개 본문 우회 채널 = ID redirect 함정 회피
4. ID sequential 검색은 보조 검색으로 격하 (외주 필터가 1차)
5. wishketProject 측 SKILL.md v3 § 3 "사전 단계" 신설 완료, today 측은 inode 동기 (심볼릭/하드 링크)
6. 본 vault에서 직접 `/wishket-check` 실행 시 같은 행동 — wishket-claude 자매 (n8n cron 09:00)에도 같은 정책 권고 필요
