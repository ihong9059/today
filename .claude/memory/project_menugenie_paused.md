---
name: MenuGenie 거론 보류 (2026-06-06~)
description: 사용자 지시로 MenuGenie 신사업 트랙은 당분간 거론 금지. 재개 시점은 사용자가 명시적으로 통지할 때까지 carry/todo/제안 어디서도 언급하지 않음
type: project
originSessionId: b70fa337-bca6-4689-a4b4-60237c72dd19
---
2026-06-06 사용자 명시 지시: "MenuGenie는 당분간 중단합니다. 다음 진행시까지 거론하지 마세요. 때가되면 알려드리겠읍니다."

**Why**: 사용자가 우선순위·진행 여부를 재검토 중. Claude가 carry로 계속 노출하면 의사결정 노이즈가 되고 보류 의지를 거스름.

**How to apply**:
- work-start 통합 todo 테이블에 MenuGenie 행을 신규로 추가하지 않음 (기존 carry는 `⏸️ 보류` 마킹만 유지, 본문 제목에서 "MenuGenie" 문자열도 가급적 제거하여 노출 최소화)
- /work-end, /biz-end, 작업 제안, "다음 할일" 답변, RPi3 호스팅 옵션 검토, Rickroll URL 교체 등 모든 맥락에서 MenuGenie 거론 금지
- entity 자체(`myWiki/second-brain/entities/menugenie.md`)는 보존 (자료 박제 가치). 단 능동 제안·cross-link 갱신·진행 시도 금지
- 재개 트리거: 사용자가 명시적으로 "MenuGenie 재개", "MenuGenie 진행", "menugenie" 등 키워드 + 진행 의사 표현 시에만 보류 해제
- 보류 기간 동안 외부 정보(GCP 홈페이지 변경 등)도 능동 fetch·확인 금지
