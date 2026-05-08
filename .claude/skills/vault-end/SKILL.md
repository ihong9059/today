---
name: vault-end
description: onDevice_AI_검증 vault 작업 종료 시 사용. log.md 추가, README 진행 상태 갱신, 결과 영역 기록, 영업 자산 동기화 체크. "vault 종료", "결과 기록해줘", "vault-end" 요청 시 사용
---

# vault 작업 종료 Skill (onDevice_AI_검증 전용)

`C:\todo\today\onDevice_AI_검증\` vault 작업을 마칠 때 결과 기록·진행 상태 갱신·외부 자산 동기화 체크를 한 번에 수행. today 전역의 `/work-end`와 별개로 vault 컨텍스트만 정리한다.

## 적용 조건

현재 세션에서 vault 안 파일(검증 절차, 결과)을 수정·실행했을 때.

## 실행 절차

### 1. 이번 세션 vault 작업 요약

다음 항목 추출 (간결하게):
- 진행한 검증 단계 (예: microGPT PC 실행 Step 1~2)
- 측정·확인된 사실 (SRAM, 파라미터 수, 실행 시간 등 숫자 우선)
- 미완료 항목 / 막힌 지점
- 다음 액션 1~3개

### 2. 검증 절차 파일 "결과 기록 영역" 갱신

작업한 검증 절차 파일(예: `microGPT/01_검증절차.md`)의 **"결과 기록 영역"** 섹션에 시간순 추가:

```markdown
### [YYYY-MM-DD HH:MM] {Step N 요약}

- 실행 환경: {PC / ESP32-S3 등}
- 입력: {파라미터·설정}
- 출력: {수치·로그 핵심}
- 판단: {예상 대비, 다음 영향}
```

CLAUDE.md "결과 기록해줘" 규칙 준수.

### 3. log.md 한 줄 ingest 추가

`C:\todo\today\onDevice_AI_검증\log.md` 마지막에 새 블록 추가:

```markdown
## [YYYY-MM-DD HH:MM] {start|step|done} | {한 줄 요약}

- 산출: {새/수정된 파일, 측정 데이터}
- 핵심 결론: {1~2줄}
- 다음 액션:
  1. ...
  2. ...

---
```

`(이후 작업 진행 시 시간순 추가)` 라인은 항상 파일 맨 끝에 한 줄로 유지.

### 4. README.md 진행 상태 표 갱신

`C:\todo\today\onDevice_AI_검증\README.md` 의 "진행 상태" 표에서:
- 이번에 완료한 항목 → ✅
- 부분 완료 → 🟡 (필요 시 새 행 추가)
- 다음 단계 ⬜ 항목 그대로 유지

상태가 변한 경우에만 Edit. 변경 없으면 스킵.

### 5. 외부 영업 자산 동기화 판단

검증 결과가 다음 임계치 중 하나를 넘었으면 외부 자산 갱신 권고:

| 임계치 | 갱신 대상 |
|---|---|
| microGPT 실측 수치(loss·시간) 첫 확보 | `myWiki/second-brain/entities/onDevice-ai-검증.md` |
| ESP32-S3 SRAM 사용량 실측 | `uttecBizWiki/entities/AI_FanStick.md` "기술 근거" |
| Stage 4 영업 적용 가능한 사례 확정 | `영업/Stage4_OnDeviceAI_검토.md` |
| 핵심 가설 검증/반증 | `myWiki/second-brain/log.md` 인사이트 |

해당 시 사용자에게 "지금 동기화할까요? (Y/n)" 질문. 동의 시 Edit으로 반영하고 갱신 결과를 보고서에 표시.

### 6. git 커밋 제안 (vault 한정)

```bash
git status -- onDevice_AI_검증/
git diff --stat -- onDevice_AI_검증/
```

vault 안 변경만 추출하여 커밋 메시지 초안 제시:

```
검증: onDevice_AI — {Step·진행 단계 요약}

- log.md: ...
- README.md 진행 상태: ...
- (검증 절차 결과 기록): ...
```

**사용자 확인 후** `git add onDevice_AI_검증/` → commit → push.

vault 외 변경(영업/, myWiki/, uttecBizWiki/ 등)이 함께 있으면 별도 커밋으로 분리하거나 사용자에게 묶을지 질문.

### 7. 완료 안내

- log.md 추가 항목
- 결과 기록 추가된 검증 절차 파일
- README 진행 상태 변화 (있으면)
- 외부 자산 동기화 결과 (있으면)
- git 커밋/푸시 결과
- 다음 세션 시작점 (`/vault-start` 호출 시 안내될 항목)

## 트리거 키워드

- "vault 종료"
- "결과 기록해줘" (CLAUDE.md 가이드 명시)
- "vault-end"
- "onDevice 마무리"

## /work-end 와의 차이

| 항목 | /work-end | /vault-end |
|---|---|---|
| 세션 파일 저장 | today/.claude/sessions | **하지 않음** |
| 작업보고서 갱신 | today 작업보고서 | **하지 않음** |
| myWiki 반영 | 항상 검토 | 임계치 넘었을 때만 |
| log 기록 | myWiki second-brain/log.md | vault 자체 log.md |
| git commit 범위 | today 전체 | vault 폴더 한정 권고 |
| Notion cleanup | 실행 | **하지 않음** |
| wiki-lint | 실행 | **하지 않음** |

종일 작업이면 `/vault-end` → `/work-end` 순으로 호출. vault만 짧게 작업했으면 `/vault-end` 단독으로 충분.
