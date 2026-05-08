---
name: biz-end
description: uttecBizWiki vault 작업 종료 시 사용. raw/ 미팅 노트 생성, entity 영업 진행 상태 갱신, log.md 추가, 외부 자산 동기화 체크. "비즈 종료", "영업 정리해줘", "biz-end", "AI FanStick 영업 마무리" 요청 시 사용
---

# 비즈 작업 종료 Skill (uttecBizWiki 전용)

`C:\todo\today\uttecBizWiki\` vault 작업을 마칠 때 영업 이벤트 기록·entity 갱신·log·외부 자산 동기화 체크를 한 번에 수행. today 전역의 `/work-end` 와 별개로 vault 컨텍스트만 정리한다.

## 적용 조건

현재 세션에서 vault 안 파일(entities, raw, thoughts) 또는 본 vault scope 의 영업 활동을 진행했을 때.

## 실행 절차

### 1. 이번 세션 비즈 작업 요약

다음 항목 추출 (간결하게):
- 발생한 영업 이벤트 (미팅·견적·계약·컨택)
- 의사결정자 / 다음 미팅 / 협의 단계
- 시장·고객 신규 사실 (숫자·계약 단가 우선)
- 흡수한 검증 결과 (있으면 onDevice_AI_검증 → entity 반영)
- 미완료 항목 / 막힌 지점
- 다음 액션 1~3개

### 2. raw/ 영업 이벤트 노트 생성 (이벤트 발생 시)

영업 이벤트(미팅·견적 회신·컨택 등)가 발생했으면 `C:\todo\today\uttecBizWiki\raw\YYYY-MM-DD_{고객사}_{이벤트}.md` 신규:

```markdown
---
title: {고객사} {이벤트 유형}
type: sales-event
date: YYYY-MM-DD
customer: {고객사}
product: {AI_FanStick | Stage4_패키지}
stage: {컨택 | 미팅 | 견적 | 계약 | 후속}
status: {진행 | 보류 | 완료 | 실패}
links: [{관련 entity}]
---

# {고객사} {이벤트 유형} (YYYY-MM-DD)

## 핵심 결과

{1~3줄}

## 진행 사항

- 의사결정자: {이름·직책}
- 협의 내용: {요약}
- 견적/계약 조건: {단가·범위·일정}

## 다음 미팅·액션

- 일시: {YYYY-MM-DD}
- 담당: {사용자/Claude}
- 액션: {1~3개}

## 위험 / 이슈

{있으면}

## 관련 페이지

- entities/{관련 제품}.md
- 영업/Stage4_OnDeviceAI_검토.md (해당 시)
```

CLAUDE.md "AI FanStick 영업 한 일 정리해줘" / "Stage 4 한국기계 미팅 결과" 가이드 준수.

### 3. entity 영업 진행 상태 표 갱신

영향받은 entity(`entities/AI_FanStick.md` / `Stage4_패키지.md` / `한국기계_Stage4.md` 등) 의 "영업 진행 상태" 표에:
- 이번 이벤트 행 추가 (시점·이벤트·상태)
- 완료된 ⬜ → ✅
- 진행 중 → 🔄
- 신규 시점·차세대 BOM 영향·매출 모델 변경이 있으면 해당 섹션도 Edit
- updated 필드 갱신 (frontmatter)

상태가 변한 경우에만 Edit. 변경 없으면 스킵.

### 4. 검증 결과 흡수 (해당 시)

이번 세션에서 onDevice_AI_검증 vault 의 결과를 흡수했으면:

- `entities/AI_FanStick.md` "기술 근거" 또는 "차세대 BOM 영향" 섹션에 실측 데이터 반영
- 출처 링크 명시 (예: `onDevice_AI_검증/aiFanStick_차세대/01_검증절차.md` Step N)
- frontmatter `external_refs` 항목 점검

### 5. log.md 한 줄 ingest 추가

`C:\todo\today\uttecBizWiki\log.md` 마지막에 새 블록 추가:

```markdown
## [YYYY-MM-DD HH:MM] {sales|absorb|insight|update} | {한 줄 요약}

- 산출: {새/수정된 파일 (raw/, entities/)}
- 핵심 결론: {1~2줄}
- 다음 액션:
  1. ...
  2. ...

---
```

`(이후 영업·매출·미팅 이벤트 시간순 추가)` 라인은 항상 파일 맨 끝에 한 줄로 유지.

태그 가이드:
- `sales` — 영업 이벤트 (미팅·견적·컨택)
- `absorb` — 검증 결과 흡수
- `insight` — thoughts/ 인사이트 작성
- `update` — entity·README·schema 갱신

### 6. 외부 영업 자산 동기화 판단

본 vault 결과가 다음 임계치 중 하나를 넘었으면 외부 자산 갱신 권고:

| 임계치 | 갱신 대상 |
|---|---|
| Stage 4 첫 견적 회신 / 첫 수주 후보 확정 | `영업/Stage4_OnDeviceAI_검토.md` |
| K-POP B2B 라이센스 컨택 진행 | `myWiki/second-brain/entities/ai-fanstick.md` (큰그림) |
| Stage 영업 모델 단가·구조 변경 | `myWiki/second-brain/entities/uttec-stage-package.md` |
| 신규 시장 인사이트 / 제품 카테고리 가설 | `myWiki/second-brain/log.md` |
| 검증 결과 흡수로 차세대 BOM 변경 | `영업/Stage4_OnDeviceAI_검토.md` BOM 섹션 |

해당 시 사용자에게 "지금 동기화할까요? (Y/n)" 질문. 동의 시 Edit으로 반영하고 갱신 결과를 보고서에 표시.

### 7. thoughts/ 인사이트 판단

다음 신호 중 하나라도 있으면 `thoughts/YYYY-MM-DD_{주제}.md` 신규 권고:
- 같은 영업 패턴이 2회 이상 반복 (예: 동일한 거절 사유)
- 시장·고객 행동에서 처음 본 신호
- 매출 모델·단가 가설을 흔드는 사실
- Stage 4 vs B2C 라이센스 선택 기준 변화

신규 권고만 — 사용자 확인 후 작성.

### 8. git 커밋 제안 (vault 한정)

```bash
git status -- uttecBizWiki/
git diff --stat -- uttecBizWiki/
```

vault 안 변경만 추출하여 커밋 메시지 초안 제시:

```
비즈: uttecBizWiki — {제품·고객·단계 요약}

- raw/: {신규 영업 이벤트}
- entities/: {갱신한 영업 진행 상태}
- log.md: {태그 한 줄}
```

**사용자 확인 후** `git add uttecBizWiki/` → commit → push.

vault 외 변경(영업/, myWiki/, onDevice_AI_검증/ 등)이 함께 있으면 별도 커밋으로 분리하거나 사용자에게 묶을지 질문.

### 9. 완료 안내

- log.md 추가 항목
- 신규 raw/ 노트 (있으면)
- 갱신된 entity (있으면)
- 흡수한 검증 결과 (있으면)
- 외부 자산 동기화 결과 (있으면)
- thoughts/ 신규 (있으면)
- git 커밋/푸시 결과
- 다음 세션 시작점 (`/biz-start` 호출 시 안내될 항목)

## 트리거 키워드

- "비즈 종료"
- "영업 정리해줘"
- "biz-end"
- "AI FanStick 영업 마무리"
- "Stage 4 미팅 정리"
- "uttecBizWiki 종료"

## scope 외 요청 처리

본 vault scope 가 아닌 작업(위시캣 일반·강사양성·Stage 0 등)을 정리해달라는 요청이 오면:
- "이 작업은 본 vault scope 가 아닙니다. [정확한 위치]에 처리하시는 게 맞습니다." 안내
- 본 vault log·entity 에 잘못 추가하지 않음
- CLAUDE.md "책임 / 비책임" 매트릭스 참조

## /work-end, /vault-end 와의 차이

| 항목 | /work-end | /vault-end (onDevice) | /biz-end (uttecBizWiki) |
|---|---|---|---|
| 세션 파일 저장 | today/.claude/sessions | 안 함 | 안 함 |
| 작업보고서 갱신 | today 작업보고서 | 안 함 | 안 함 |
| 결과 기록 위치 | (해당 없음) | 검증 절차 파일 "결과 기록 영역" (수치) | raw/YYYY-MM-DD_*.md (이벤트) |
| 진행 상태 갱신 | 작업보고서 | README 진행 상태 표 | entities/ "영업 진행 상태" 표 |
| 검증/제품 흐름 | (관여 없음) | 결과 → uttecBizWiki entity (정방향) | 검증 결과 흡수 (역방향) |
| myWiki 반영 | 항상 검토 | 임계치 넘었을 때만 | 임계치 넘었을 때만 |
| log 기록 | myWiki second-brain/log.md | onDevice_AI_검증/log.md | uttecBizWiki/log.md |
| git commit 범위 | today 전체 | onDevice_AI_검증/ 한정 | uttecBizWiki/ 한정 |
| Notion cleanup | 실행 | 안 함 | 안 함 |
| wiki-lint | 실행 | 안 함 | 안 함 |

종일 작업이면 `/biz-end` → `/work-end` 순으로 호출. vault만 짧게 작업했으면 `/biz-end` 단독으로 충분.
