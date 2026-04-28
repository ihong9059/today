---
name: work-end
description: 작업 종료 시 사용. 세션 저장, 작업보고서 업데이트, git commit/push. 세션 종료 전 호출
---

# 작업 종료 Skill (통합)

작업 종료 시 세션 저장, 작업보고서 업데이트, git 커밋을 한 번에 수행합니다.

## 실행 절차

### 1. 이번 세션 작업 내용 정리

현재 세션에서 수행한 작업들을 정리:
- 완료된 작업
- 진행 중인 작업
- 다음에 할 일

### 2. 세션 파일 저장

저장 위치: `C:\todo\today\.claude\sessions\session_[날짜시간].md`

```markdown
# Session Report - [날짜 시간]

## 작업 요약
[오늘 수행한 작업들을 간략히 요약]

## 완료된 작업
- [완료된 작업 목록]

## 진행 중인 작업
- [아직 완료되지 않은 작업]

## 다음에 할 일
- [다음 세션에서 해야 할 작업]

## 중요 정보
- [기억해야 할 중요한 설정, 경로, 변수 등]

## 관련 파일
- [작업한 파일 경로들]

## 메모
[추가 메모사항]
```

### 3. 오래된 세션 파일 정리

최근 3개 세션만 유지하고 나머지 삭제:

```bash
powershell -Command "Get-ChildItem 'C:\todo\today\.claude\sessions\session_*.md' | Sort-Object LastWriteTime -Descending | Select-Object -Skip 3 | Remove-Item -Force"
```

### 4. 작업보고서 업데이트

오늘 작업보고서(YYYY-MM-DD_작업보고서.md) 업데이트:
- 오늘 할일 상태 업데이트 (⬜ → ✅ 또는 유지)
- 오늘 완료 사항 추가
- 작업 상세 내용 추가
- 수정/생성된 파일 목록
- 세션 요약 (주요 작업, 완료 사항, 미완료, 완료율)

### 5. 세컨드 브레인 위키 반영

오늘 작업 내용을 `C:\todo\today\myWiki\second-brain\` 위키에 반영한다.

#### 5-A. 하위 프로젝트 위키 변경 감지 (Lint)

하위 프로젝트 위키가 변경되었으면 myWiki의 해당 엔티티 페이지를 동기화한다.

**감지 대상:**

| 프로젝트 위키 | myWiki 엔티티 | 비교 기준 |
|---|---|---|
| `C:\todo\revitaProject\revitaWiki\overview.md` | `entities/revita.md` | updated 날짜 비교 |

**감지 방법:**
1. revitaWiki `overview.md`의 프론트매터 `updated` 날짜를 읽는다
2. myWiki `entities/revita.md`의 프론트매터 `updated` 날짜와 비교한다
3. revitaWiki가 더 최신이면 → **동기화 필요** 플래그

**동기화 실행 (플래그가 켜진 경우):**
1. revitaWiki `overview.md`에서 현재 상태, 핵심 지표, 완료/미완료 목록을 읽는다
2. myWiki `entities/revita.md`의 "현재 상태", "타임라인" 섹션을 갱신한다
3. `revita.md`의 `updated` 날짜를 오늘로 변경한다
4. 결과를 work-end 리포트에 표시:
   - 동기화됨: `revita.md ← revitaWiki (변경 요약)`
   - 또는: `revita.md: 최신 상태 (변경 불필요)`

**향후 프로젝트 추가 시:** 위 테이블에 행을 추가하면 같은 패턴으로 확장 가능.

#### 5-B. myWiki 자체 반영

**반영 대상 확인:**
- 새로운 프로젝트 진행/완료 → `projects.md` 업데이트
- 새 기술 사용/학습 → `skills.md` 업데이트
- AI 관련 관찰/판단 → `ai-direction.md` 판단 로그 추가, `ai-landscape.md` 업데이트
- 중요한 경험/성과 → `experience.md` 업데이트
- 목표 달성/변경 → `goals.md` 업데이트
- 새로운 강점 발견 → `strengths.md` 업데이트
- 새로운 갭 발견 → `gaps.md` 업데이트
- 관련 엔티티 변화 → `entities/` 해당 페이지 업데이트

**반영 방법:**
1. 오늘 완료된 작업과 핵심 사항을 확인
2. 위키에 의미 있는 변화가 있을 때만 업데이트 (매일 반드시 할 필요는 없음)
3. 업데이트한 경우 `log.md`에 기록 추가
4. `index.md` 업데이트 (새 페이지 추가 시)
5. 링크 형식: `[[파일명]]` (.md 확장자 제외, 경로 제외)

**반영 기준 (하나라도 해당하면 업데이트):**
- 새 프로젝트 시작 또는 중요 마일스톤 달성
- 새 기술 도입 또는 기술 수준 변화
- AI 방향에 영향을 주는 판단/관찰
- 위시캣 지원/수주 결과
- 교육 현장 경험이나 피드백

### 6. Notion "오늘 할 일" 완료 항목 정리

Notion "오늘 할 일" 페이지(ID: `349cb620-8c2b-817d-a7fe-c887ecdee292`)의 완료 섹션에서 **2일 이상 경과한 항목을 자동 삭제**한다.

```bash
python "C:\todo\today\.claude\hooks\notion-cleanup.py"
```

- 완료 섹션의 `[MM/DD] 항목명` 형식에서 날짜를 확인
- 현재 날짜 기준 2일 이상 경과한 항목 삭제
- 삭제 결과를 표시

### 7. Wiki 작업일지 마무리

오늘 날짜의 wiki 작업일지가 있으면 자동으로 마무리한다.

**확인 경로**: `C:\todo\today\myWiki\작업보고서\YYYY-MM-DD\작업일지.md`

파일이 존재하면:
1. 작업일지 하단의 `(이후 작업은 아래에 추가)` 를 삭제
2. 마무리 섹션 추가:

```markdown
---

## 오늘 요약
- **총 작업 수**: N건
- **주요 성과**: {핵심 작업 요약}
- **미완료/이어할 작업**: {있으면 기록}
```

파일이 없으면:
- wiki 작업이 없었으므로 스킵

### 7. git 커밋 및 푸시

```bash
# 1) 상태 확인
git status

# 2) untracked 새 파일/폴더 감지 (push 누락 방지)
git ls-files --others --exclude-standard --directory
```

**중요: untracked 파일/폴더가 있으면 반드시 사용자에게 목록을 보여주고, git add 대상에 포함할지 확인한다.**
새로 생성된 폴더/파일은 add하지 않으면 push되지 않아 다른 PC에서 받을 수 없다.

```bash
# 3) 변경 내용 확인
git diff --stat

# 4) 사용자 확인 후 커밋 (untracked 포함)
git add <변경 파일> <새 파일/폴더>
git commit -m "작업: {주요 작업 요약}"
git push
```

**주의**: 반드시 사용자 확인 후 커밋 진행. .env, credentials 등 민감 파일은 제외.

### 7. 완료 안내

사용자에게 안내:
- 세션 저장 완료 (파일 경로)
- 작업보고서 업데이트 완료
- 세컨드 브레인 반영 여부 (반영했으면 변경 내용 요약)
- git 커밋/푸시 완료
- 오래된 세션 파일 정리 완료
- 오늘 완료율 표시
- 다음 세션에서 `/work-start`로 이어서 진행 가능

## 트리거 키워드

- "작업 종료"
- "작업 끝"
- "세션 저장해줘"
- "오늘 작업 마무리"
- "work end"

## 참고

- 커밋 메시지 형식: "작업: {주요 작업 요약}"
- git 커밋 전 반드시 사용자 확인 필요
