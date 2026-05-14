---
name: 위시캣 지원서 회사명 금지
description: 위시캣 지원서에 회사명(UTTEC, 유티즘 등)을 절대 포함하지 않아야 함 - 중계업체 페널티
type: feedback
originSessionId: 817dfab6-954e-458a-8297-923287d3843b
---
위시캣 지원서에 회사명(UTTEC, 유티즘 등)을 절대 포함하지 말 것. URL에 포함된 회사명도 제거하거나 마스킹 처리.

**Why:** 위시캣은 중간 중계 플랫폼이며, 지원서에 회사명이 노출되면 페널티가 부과됨.

**How to apply:** /wishket-apply 실행 시 지원서 전체에서 UTTEC, 유티즘, uttec 등 회사명을 검색하여 "당사", "저희 팀" 등으로 대체. URL도 "별도 제공"으로 마스킹. skill.md DON'T 섹션에도 규칙 추가 완료.

**중요 — 도메인 prefix도 식별 정보**: `uttec-sensor.duckdns.org`처럼 회사명 prefix가 붙은 서브도메인 / DuckDNS 도메인 / 자사 운영 URL은 모두 식별 가능 → 마스킹 필수. 위시캣 #155225 지원서 작성 시 본 URL을 2회 노출시킨 위반 발생 (2026-05-15) → 사용자가 직접 "수행 예제 있음"으로 수정. 권장 마스킹 표현: `"수행 예제 있음"` 또는 `"별도 제공"`. GitHub `github.com/ihong9059`도 개인 식별 가능하므로 노출 여부는 사용자 사전 확인 권장.

**작성 직후 자가 점검**: 지원서 txt 저장 직후 다음 패턴 grep 필수:
- `UTTEC` / `uttec` / `유티즘` / `유티텍`
- `uttec-sensor.duckdns.org` 등 자사 도메인
- `uttec.co.kr` / 회사 전화번호 / 회사 주소
