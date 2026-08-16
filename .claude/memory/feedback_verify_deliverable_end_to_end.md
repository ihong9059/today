---
name: feedback_verify_deliverable_end_to_end
description: "인계·전달물은 '구조가 같으니 되겠지' 가정 금지 — 반드시 실측 end-to-end 검증 후 완성 선언"
metadata:
  node_type: memory
  type: feedback
---

전달물(특히 **초보자에게 인계**하는 vault·kit·설치물)은 **"작동한다"고 말하기 전에 반드시 실제로 돌려서 확인**한다. 구조가 기존 작동 사례와 동일하다는 이유로 "될 것"이라 **가정하고 완성 선언 금지**.

**박제 사건 (2026-08-14)**: livecow-cost-kit(홍광삼 관리팀장 인계용)에 `/work-start`·`/work-end` skill을 넣고 "jangminha-kit과 구조 동일하니 된다"고 가정만 함. 홍광삼 PC에서 복사 후 skill 미표시 → 사용자가 "확인했냐"고 2회 지적. 초보자 인계물인데 미검증품을 완성이라 넘겨 **사용자·Claude 신뢰 훼손**. 실제 원인은 숨김 폴더 `.claude` 복사 누락이었음.

**Why**: 초보자는 스스로 진단·복구 못 한다. "그대로 열면 된다"가 실측 보장돼야 완성. 가정 기반 인계 = 미완성품 납품 = 사용자가 제3자(팀장) 앞에서 곤란.

**How to apply**:
1. **end-to-end 실측**: 파일 정적검증(YAML·인코딩)에 그치지 말고 실제 실행까지. 예) skill이면 대상 폴더에서 `claude -p`로 새 세션 띄워 인식 확인. clone/zip 해제본 등 **격리 환경**에서 재현.
2. **전달 취약점 선제 제거**: Windows 숨김 폴더 `.claude`는 탐색기 드래그·기본 압축서 누락됨 → **git archive/7-Zip으로 패키징**하고, 그 패키지를 풀어서 재검증 후 전달.
3. **완성 선언은 검증 근거와 함께**. 관련 [[feedback_dont_assume_ask_when_unclear]](짐작 금지) — 결과물 검증에도 동일 적용.
