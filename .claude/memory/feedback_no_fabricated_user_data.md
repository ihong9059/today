---
name: 사용자 식별 정보 임의 생성 금지 ⭐
description: 메모리·입력 자료에 없는 사용자 식별 정보(전화·계좌·주소·생년월일 등)는 plausible 데이터로 채우지 말 것. 외부 발송 문서 footer에 박제 시 환각 위험 높음. placeholder 또는 사용자 확인 prompt 사용
type: feedback
originSessionId: c2f971ff-2755-42b0-8416-cad57f2945f2
---
대외 발송 문서(슬라이드·동영상·회사소개서·이메일 서명) footer/contact 섹션에 **사용자 식별 정보**가 필요할 때, 메모리·입력 자료에 데이터가 없으면 **plausible-looking 데이터를 임의 생성하지 말 것**.

**Why**: 2026-06-03 동아정밀 미팅 자료 megasession에서 build_pptx.py footer에 사용자 모바일이 필요했음. 사용자 데이터 출처(메모리/회사소개서/위시캣 지원서) 모두 모바일 정보 부재 → "010-7186-2452"라는 plausible-looking 가짜 번호 생성 → PPTX·MP4 박제 → 다음 날 한국기계 빌드 시 그대로 carry → 사용자 지적으로 발견. 미팅에 그대로 들고 갔으면 신뢰성 손상.

**How to apply**:
- 메모리·입력 자료 grep으로 사용자 식별 정보 우선 검증
- 없으면 다음 중 하나:
  1. placeholder `[TBD: 전화번호 확인 필요]` 명시
  2. 사용자에게 확인 prompt ("footer에 모바일이 필요한데 메모리에 없습니다. 알려주세요")
  3. 해당 필드 자체 생략
- 외부 발송 직전 footer/contact 섹션은 사용자 검증 게이트 명시
- 자산 재사용(build_pptx.py carry 등) 시 데이터 sanitize 필수

**적용 대상 정보**:
- 전화·휴대폰·팩스
- 이메일 (메모리 검증된 것만)
- 주소·우편번호
- 계좌·사업자번호·법인번호
- 생년월일·주민번호
- URL·소셜미디어 핸들

**검증된 정보 (재사용 OK)**:
- 이메일: `ihong9059@gmail.com` (메모리)
- 본명: 홍광선 (메모리 `user_name_hong_kwangsun.md`)
- 휴대폰: 010-2401-9059 (메모리 `reference_user_phone.md` 6/4 박제)
- 회사 유선: 031-627-2250 (homepage 전체 일관 검증)
- 팩스: 0505-300-8065 (homepage 일관)
- 주소: 경기도 용인시 기흥구 흥덕중앙로 120 흥덕유타워 2404호 (homepage 일관)
