---
description: 작업 시작 시 호출. 작업보고서 폴더 점검 + 전 세션 인계 파악 + git 동기화 + 다음 할일 표시 + (vault hook 있으면 자동 chain). ihong9059 GitHub 계정 사용.
trigger: /work-start, "작업 시작", "이어서 진행"
---

# /work-start — 폴더 작업 시작 표준

본 폴더(현재 cwd)에서 작업을 시작할 때 호출. 6 단계 자동 실행.

## 핵심 원칙

> **현재 cwd 폴더가 "작업 단위"**. 모든 작업보고서·git·인계는 이 폴더 안에서만 처리.
> **vault 특화 자동화**(예: lemonLabs의 _inbox 카드, 트랙 컨텍스트)는 같은 폴더의 `vault-start.md`에 격리. work-start는 마지막에 그것을 자동 chain.

---

## Step 1 — 작업보고서 폴더 보장

```bash
mkdir -p 작업보고서/.context
```

- `작업보고서/`가 없으면 신규 생성
- `작업보고서/.context/`도 같이 생성 (다음 세션 인계용)
- 이미 있으면 침묵하고 다음 단계

---

## Step 2 — 전 세션 인계 파악

`작업보고서/.context/` 에서 가장 최근 `*.session.md` 파일 읽기:

```bash
ls -t 작업보고서/.context/*.session.md 2>/dev/null | head -1
```

### 파일이 있으면
파일 내용을 읽어 다음 사용자에게 표시:
- **이전 세션 요약** (한 줄)
- **완료된 작업** (목록)
- **미완료 / 진행 중** (목록)
- **다음에 할 일** (목록) ← 이번 세션의 후보 작업

### 파일이 없으면 (첫 사용)
- "이전 세션 인계 없음 — 신규 작업 폴더로 시작" 안내
- Step 3로 진행

---

## Step 3 — git repo 점검 및 동기화

### 3-A. git repo 존재 여부 확인
```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

### 3-B. repo가 있으면 → pull
```bash
# ihong remote 존재 확인
git remote get-url ihong 2>/dev/null

# 있으면 pull
git pull ihong main 2>&1 | tail -5
```

- pull 결과 (변경 N건 / Already up to date) 사용자에게 보고
- conflict 발생 시 즉시 사용자에게 알림 + 자동 진행 멈춤

### 3-C. repo가 없으면 → 사용자에게 옵션 제시

```
🆕 본 폴더에 git repo가 없습니다. 다음 옵션:
  1. 자동 생성: gh CLI로 ihong9059/<폴더명> private repo 생성 + init + push
  2. 수동 생성: https://github.com/new 에서 직접 만들고 알려주세요
  3. 건너뛰기: 이번 세션은 git 없이 진행

폴더 이름: <현재 폴더명>
원격 URL 후보: https://github.com/ihong9059/<폴더명>.git
```

사용자가 1번 선택 시 자동 실행:
```bash
folder_name=$(basename "$PWD")
gh repo create "ihong9059/$folder_name" --private --source . --remote ihong --push 2>&1 | tail -3
```

(gh CLI가 ihong9059로 인증되어 있다고 가정. 인증 안 되어 있으면 사용자에게 `gh auth login` 안내.)

---

## Step 4 — 다음 할일 통합 + 표시

다음 소스를 종합:
- Step 2의 "다음에 할 일" (전 세션 인계)
- 어제·그제 작업보고서 (`작업보고서/<YYYY-MM-DD>.md`) 미완료 항목
- 폴더 내 TODO 파일 또는 README의 미완료 표시

테이블 형식으로 사용자에게 출력:

```
| 순번 | 할일 | 출처 | 상태 |
|:----:|------|------|:----:|
| 1 | ... | 세션 인계 | ⬜ |
| 2 | ... | 어제 미완료 | ⬜ |
| 3 | ... | TODO.md | ⬜ |
```

---

## Step 5 — Vault hook chain (있으면 자동 실행)

본 폴더가 vault일 수도 있고, vault 특화 자동화가 필요할 수도 있다. 다음 경로를 **순서대로** 확인:

1. `.claude/skills/vault-start/SKILL.md`
2. `.claude/commands/vault-start.md`

### 존재하면
- 그 파일을 읽고 본문 절차를 **본 work-start 후속 단계로 그대로 실행**
- vault 특화 로직 (예: `_inbox/pending` 카드 확인, 트랙 컨텍스트 복원, multi-agent 협업 hook, 지원사업 마감 알림) 흡수
- vault hook 결과를 사용자에게 통합 보고
- vault hook이 추가로 "다음에 할 일"을 제시하면 Step 4의 할일 테이블에 통합

### 없으면
- skip — 일반 폴더로 간주
- Step 6 (사용자 질문)으로 진행

### 호출 형식 예
```bash
# vault-start hook 존재 확인
test -f .claude/skills/vault-start/SKILL.md || test -f .claude/commands/vault-start.md
```

존재하면 파일 본문의 절차를 본 Claude 세션이 직접 실행 (별도 프로세스 X, 같은 컨텍스트).

---

## Step 6 — 사용자 질문

```
이번 세션 작업 결정:
  A. 이전 작업 이어서 (세션 인계 항목 #1부터)
  B. 다른 작업 (구체적으로 알려주세요)
  C. 빠른 점검 후 종료
```

vault hook이 우선 처리할 카드·미팅·마감을 제시한 경우, 사용자 결정 전 그것을 명시.

---

## 트리거 키워드

- `/work-start` 슬래시 명령
- "작업 시작"
- "이어서 진행"
- "이전 작업 이어서"
- "work start"

---

## 작동 보장

- 본 스킬은 **현재 cwd 안에서만** 작동 (외부 폴더 영향 X)
- git remote는 **`ihong`** 이름으로 통일 (origin과 별개로 ihong9059 push 보장)
- 작업보고서 파일명 형식: `<YYYY-MM-DD>.md` (한 폴더, 평면)
- 인계 파일 형식: `.context/<YYYY-MM-DD>.session.md`

---

## 관련 스킬

- `/work-end` — 작업 종료 시 호출 (인계 저장 + git push)
- `_folder_work_template` — 본 스킬을 임의 폴더에 적용하는 템플릿 패키지 (출처)
- **Vault hook**: `.claude/skills/vault-start/SKILL.md` 또는 `.claude/commands/vault-start.md` — 본 work-start가 Step 5에서 자동 chain. vault 특화 자동화(예: lemonLabs의 _inbox 카드, 4 트랙 컨텍스트, multi-agent 협업)는 모두 여기에 격리해서 작성.
