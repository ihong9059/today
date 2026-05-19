# INSTALL — Folder Work Template 적용 절차

> 임의 폴더 (예: `C:\todo\my_new_project\`) 에 본 템플릿을 적용해서 `/work-start` + `/work-end` 슬래시 명령을 사용 가능하게 만드는 절차.

---

## 사전 준비

| 항목 | 확인 |
|---|---|
| target 폴더 존재 | `C:\todo\<folder_name>\` 경로 결정 |
| GitHub 계정 | `ihong9059` (gh CLI 인증 또는 PAT 토큰 등록 완료) |
| Claude Code | 본 폴더에서 세션 열 수 있어야 함 |

---

## 방법 A — 자동 (1줄, 추천)

```powershell
bash "C:\todo\today\작업보고서\_folder_work_template\helpers\apply.sh" "C:\todo\<target_folder>"
```

→ 자동으로:
1. target 폴더 안에 `.claude/skills/work-start/SKILL.md` 생성
2. `.claude/skills/work-end/SKILL.md` 생성
3. 적용 결과 출력

이후 target 폴더에서 Claude 세션 열어 `/work-start` 사용.

---

## 방법 B — 수동 (4 단계)

### Step 1 — target 폴더에 .claude/skills/ 생성

```powershell
$target = "C:\todo\<target_folder>"
New-Item -ItemType Directory -Path "$target\.claude\skills\work-start" -Force | Out-Null
New-Item -ItemType Directory -Path "$target\.claude\skills\work-end" -Force | Out-Null
```

### Step 2 — work-start SKILL.md 복사

```powershell
Copy-Item "C:\todo\today\작업보고서\_folder_work_template\skills\work-start.md" `
          -Destination "$target\.claude\skills\work-start\SKILL.md"
```

### Step 3 — work-end SKILL.md 복사

```powershell
Copy-Item "C:\todo\today\작업보고서\_folder_work_template\skills\work-end.md" `
          -Destination "$target\.claude\skills\work-end\SKILL.md"
```

### Step 4 — 검증

```powershell
Get-ChildItem "$target\.claude\skills\" -Recurse | Format-Table FullName
```

→ 다음 두 파일 보이면 성공:
- `<target>\.claude\skills\work-start\SKILL.md`
- `<target>\.claude\skills\work-end\SKILL.md`

---

## 첫 사용 (target 폴더에서 Claude 세션)

### 1. target 폴더에서 Claude Code 세션 열기
```powershell
cd C:\todo\<target_folder>
claude
```

### 2. 첫 번째 슬래시 명령
```
/work-start
```

→ 자동으로:
- `작업보고서/` 폴더 생성 (없으면)
- 전 세션 `.context/` 읽기 (없으면 신규 표시)
- git repo 점검 → 없으면 init + ihong9059 remote 추가 + GitHub repo 생성 안내, 있으면 pull
- 진행 가능 할일 목록 출력
- 사용자에게 "이번 세션 작업?" 질문

### 3. 작업 진행 (자유)

### 4. 작업 종료 시
```
/work-end
```

→ 자동으로:
- 오늘 진행사항 요약 → `작업보고서/<YYYY-MM-DD>.md` 작성
- 다음 세션 인계 → `작업보고서/.context/<YYYY-MM-DD>.session.md` 저장
- git status → add → commit → push (ihong9059)
- 결과 보고 출력

---

## 첫 git repo 생성 (target 폴더에 .git이 없을 때)

work-start가 감지하면 사용자에게 안내. 사용자 직접 또는 자동 진행:

### 방법 1 — gh CLI 자동 생성 (인증 완료 가정)
```powershell
cd C:\todo\<target_folder>
gh repo create ihong9059/<target_folder_name> --private --source . --remote ihong --push
```

### 방법 2 — 수동
1. https://github.com/new 접속
2. Repository name: `<target_folder_name>` (target 폴더명과 동일)
3. Private 권장
4. Initialize 체크박스 모두 해제
5. Create repository

이후:
```powershell
cd C:\todo\<target_folder>
git init -b main
git remote add ihong https://github.com/ihong9059/<target_folder_name>.git
git add .
git commit -m "초기 commit"
git push -u ihong main
```

---

## 적용 해제 (template 제거)

```powershell
$target = "C:\todo\<target_folder>"
Remove-Item -Recurse -Force "$target\.claude\skills\work-start"
Remove-Item -Recurse -Force "$target\.claude\skills\work-end"
```

→ `작업보고서/` 폴더와 git repo는 보존 (사용자 작업 결과물). 스킬 파일만 제거.

---

## 트러블슈팅

| 증상 | 원인 | 해결 |
|---|---|---|
| `/work-start` 슬래시 명령이 자동완성에 안 나옴 | Claude 세션이 폴더를 못 인식 | Claude 세션을 target 폴더에서 시작 (cwd) |
| git push 시 `Permission denied` | ihong9059 인증 미설정 | `gh auth status` 확인, PAT 또는 SSH 키 등록 |
| 한글 폴더명에서 git 인코딩 오류 | Windows git core.quotepath 기본값 | `git config --global core.quotepath false` |
| `apply.sh` 실행 시 줄바꿈 오류 | Windows CRLF | `bash` 대신 `git bash` 또는 `wsl bash` 사용 |

---

## Vault 특화 자동화 추가 (선택)

target 폴더가 vault(_inbox, 트랙 컨텍스트, multi-agent 협업 등)이면, vault 특화 절차를 다음 경로 중 하나에 작성:

- `<target>\.claude\skills\vault-start\SKILL.md` (권장 — skill 형식)
- `<target>\.claude\commands\vault-start.md` (slash command 형식도 인식됨)

동일하게 `vault-end.md`도 작성. `/work-start`는 Step 5에서, `/work-end`는 Step 4(git 직전)에서 자동 chain.

vault hook 파일이 없으면 work-start/work-end는 일반 폴더용 공통 동작만 수행 → 일반 폴더는 별도 작업 불필요.

vault hook 예시 — lemonLabs(이진서 × UTTEC 협업 vault)의 `vault-start.md`:
- `_inbox/pending/*` 카드 확인 (multi-agent 통신)
- 4 트랙(AI 응원봉 / 교육 / Consulting / Studio) 컨텍스트 복원
- 지원사업 D-7 마감 알림
- UTTEC 의뢰과제 pending 알림

---

## 다음 단계

→ **target 폴더에서 `/work-start` 첫 사용** + 결과 확인
