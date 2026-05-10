---
name: vault 작업은 vault 안만, 외부 자산 자동 동기화 금지
description: vault(onDevice_AI, uttecBizWiki 등)에서 작업할 때 myWiki·영업·외부 entity를 자동 갱신하지 말 것. /work-end와 /vault-end의 책임 분리.
type: feedback
originSessionId: e8c42ebb-f042-45a1-8d7d-0853a8ecdfaa
---
vault 안에서 작업할 때는 그 vault에 관련된 일련의 작업만 진행한다. myWiki·영업·외부 entity를 자동으로 갱신하지 않는다.

**Why:** 5/8 onDevice_AI vault 마무리 시 외부 5곳(myWiki entities/log/thoughts, uttecBizWiki, 영업/Stage4)을 자동 동기화하면서 작업이 길고 복잡해졌다는 피드백. 사용자가 직접 작성한 thoughts와 내가 작성한 학습설계 충돌, git 커밋 3번 분할 등 마찰이 누적됨.

**How to apply:**
- vault 안에서 작업 → vault 안의 결과·log·README만 갱신
- 외부 자산 동기화는 사용자가 명시 요청할 때만 ("외부에도 반영해줘" 등)
- vault-end 스킬도 외부 동기화는 "권고 표시"에 그치고 자동 실행 X
- 두 스킬 책임 분리:
  - `/vault-end` = vault 안만 정리 (log·README·결과 영역·vault git 커밋 1회)
  - `/work-end` = today 전역 마무리 (작업보고서·세션·myWiki·영업·전역 git)
  - 사용자가 vault-end 호출했다고 해서 자동으로 work-end로 체이닝 X
- 외부 자산이 임계치를 넘어 갱신 필요하면 vault-end 보고서에 "다음 /work-end 시 동기화 권고" 한 줄로 표시만
- 검증 결과를 영업 자료에 반영하는 것은 사용자가 결정. Claude가 선제 갱신하지 말 것
