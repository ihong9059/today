---
name: work-end
description: 작업 종료 시 사용. 세션 저장, 작업보고서 업데이트, wiki 반영, git commit/push. 세션 종료 전 호출
---

# 작업 종료 Skill (범용)

작업 종료 시 세션 저장, 작업보고서 갱신, wiki 반영, git 커밋을 한 번에 수행한다.

## 실행 절차

### 1. 이번 세션 작업 내용 정리

완료된 작업 / 진행 중인 작업 / 다음에 할 일을 정리한다.

### 1-Z. 진행 로그 임시 파일 인계

`_current_progress.md`를 정식 세션 파일로 변환한다:
1. `.claude/sessions/_current_progress.md` 읽기
2. 그 내용을 아래 세션 파일의 "상세 진행 로그" 섹션에 그대로 포함
3. 세션 파일 저장 후 `_current_progress.md` 삭제 (다음 work-start가 새로 생성)

### 2. 세션 파일 저장

저장 위치: `.claude/sessions/session_[날짜].md`

```markdown
# Session Report - [날짜]

## 작업 요약
[오늘 수행한 작업 요약]

## 완료된 작업
- [목록]

## 진행 중인 작업
- [미완료]

## 다음에 할 일
- [다음 세션 작업]

## 중요 정보
- [기억할 설정·경로·변수]

## 관련 파일
- [작업한 파일 경로]

## 상세 진행 로그
[_current_progress.md 내용]
```

### 3. 오래된 세션 파일 정리

최근 3개만 유지:
```bash
powershell -Command "Get-ChildItem '.\.claude\sessions\session_*.md' | Sort-Object LastWriteTime -Descending | Select-Object -Skip 3 | Remove-Item -Force"
```

### 4. 작업보고서 업데이트

오늘 작업보고서(`YYYY-MM-DD_작업보고서.md`) 갱신:
- 오늘 할일 상태 (⬜ → ✅ 또는 유지)
- 오늘 완료 사항 추가
- 작업 상세 내용 / 수정·생성 파일 목록
- 세션 요약 (주요 작업·완료·미완료·완료율)

> ⚠️ 할일 완료 표시를 외부 소스(예: Notion)가 관리한다면 임의로 ⬜→✅ 변경 금지 (해당 확장 사용 시).

### 5. wiki(세컨드 브레인) 반영

오늘 작업 중 **의미 있는 변화**를 `wiki/`에 반영한다 (매 세션 강제 아님):
- 진행/완료 프로젝트, 새 기술·결정, 관련 entity 변화
- `wiki/log.md`에 `## [YYYY-MM-DD] {태그} | {한 줄 요약}` 박제
- 새 객체 → `wiki/entities/`, 결정 기록 → `wiki/thoughts/`
- 링크는 `[[파일명]]` 형식 (.md·경로 제외)

### 6. git 커밋 및 푸시

```bash
git status
git ls-files --others --exclude-standard --directory   # untracked 새 파일/폴더 감지
git diff --stat
```

**untracked 새 파일/폴더가 있으면 반드시 사용자에게 목록을 보여주고 add 여부 확인** (add 안 하면 push 누락 → 다른 PC에서 못 받음).

```bash
git add <변경 파일> <새 파일/폴더>
git commit -m "작업: {주요 작업 요약}"
git push
```

> 반드시 사용자 확인 후 커밋. `.env`·credentials 등 민감 파일 제외. git repo가 아니면 스킵.

### 7. 완료 안내

사용자에게: 세션 저장 경로 / 작업보고서 갱신 / wiki 반영 여부 / git 커밋·푸시 / 오늘 완료율 / 다음 세션 `/work-start`로 이어서 진행 가능.

---

## 확장점 (선택)

원본 `today` vault는 아래를 work-end에 통합한다 (필요 시 이식):
- **하위 프로젝트 wiki lint** — sub-wiki `updated` vs 본 entity 비교 후 동기화
- **wiki 정원사 lint** — frontmatter/고아/stale 점검
- **log.md 분기 아카이브** — 사이즈·분기 경계 트리거
- **Notion 완료 항목 정리** — N일 경과 완료 항목 자동 삭제
- **multi-agent broker** — `_inbox/outbox-staging/` 카드 push / 원격 vault pull

## 트리거 키워드
- "작업 종료", "작업 끝", "세션 저장해줘", "오늘 작업 마무리", "work end"
