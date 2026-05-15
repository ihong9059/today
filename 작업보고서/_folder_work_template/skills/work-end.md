---
description: 작업 종료 시 호출. 오늘 작업보고서 작성 + 다음 세션 인계 저장 + git commit + push (ihong9059).
trigger: /work-end, "작업 종료", "마무리"
---

# /work-end — 폴더 작업 종료 표준

본 폴더(현재 cwd)에서 작업 종료 시 호출. 5 단계 자동 실행. 다음 세션이 중단된 작업을 이어갈 수 있도록 인계 저장.

## 핵심 원칙

> **모든 진행 사항을 폴더 안에 영구 박제** + **git에 push** → 다음 세션·다른 PC에서 동일하게 이어갈 수 있게.

---

## Step 1 — 오늘 작업 요약 받기

사용자에게 (또는 본 세션 컨텍스트에서 자동 추출):
- 본 세션 주요 작업 (1~3줄)
- 완료된 항목 목록
- 미완료 / 진행 중 항목 목록
- 발견 사항·이슈

자동 추출 시 base:
- 본 세션 동안 변경된 파일 (`git status`)
- 새로 생성된 파일 (`git status --porcelain` 의 `??`)
- 본 세션의 핵심 결정 (Claude 컨텍스트에서)

---

## Step 2 — 작업보고서 작성 / 갱신

`작업보고서/<YYYY-MM-DD>.md` 파일:
- 없으면 신규 생성
- 있으면 본 세션 항목 추가 (시간순)

### 형식 (template)
```markdown
# 작업보고서 - YYYY-MM-DD

## 세션 N (HH:MM ~ HH:MM)

### 주요 작업
- (1~3줄 요약)

### 완료 사항
- 항목 1
- 항목 2

### 미완료 / 진행 중
- 항목 A — 다음 세션에 이어서

### 변경 파일
- (git status 기반 자동 채움)
- 신규: file1.md, file2.py
- 수정: file3.c

### 메모 / 인사이트
- (선택, 박제 가치 있는 발견)
```

---

## Step 3 — 다음 세션 인계 저장

`작업보고서/.context/<YYYY-MM-DD>.session.md`:

```markdown
# Session Context - YYYY-MM-DD HH:MM

## 세션 요약 (1줄)
{무엇을 했나}

## 완료된 작업
- ...

## 미완료 / 진행 중
- ...

## 다음에 할 일 ★
- 우선순위 1: ...
- 우선순위 2: ...
- (블로커가 있으면 명시: "사용자 직접 작업 필요" 등)

## 중요 정보 (다음 세션이 알아야 할)
- 환경 변수, 비밀번호 위치, 경로 등
- 결정된 파라미터, 진행 중인 의사결정

## 관련 파일
- 신규 / 수정된 파일 목록
```

→ 다음 세션의 `/work-start` 가 이 파일을 읽어 "다음에 할 일"을 자동 표시.

---

## Step 4 — git commit + push (ihong9059)

### 4-A. git status 확인
```bash
git status --short
```

→ 변경 사항 사용자에게 표시 + commit 진행 여부 확인.

### 4-B. add (안전한 패턴 — `.` 대신 명시)

기본:
```bash
git add 작업보고서/ <세션 변경 파일>
```

대량 변경 시:
```bash
git add -A    # 단, 사용자 사전 동의 후
```

### 4-C. commit

자동 메시지 후보 (사용자 확인 또는 자동 채택):
```bash
git commit -m "$(cat <<'EOF'
작업보고서 YYYY-MM-DD 갱신: <한 줄 요약>

<선택: 본문 — 주요 변경 3~5줄>

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

### 4-D. push (ihong9059 계정)

```bash
# ihong remote 존재 확인
git remote get-url ihong 2>/dev/null

# 없으면 사용자에게 안내 (work-start §3-C 참조)
# 있으면 push
git push ihong main 2>&1 | tail -5
```

### 4-E. 인증 실패 처리
- `Permission denied` → `gh auth status` + 재인증 안내
- `Updates were rejected (remote has changes)` → `git pull ihong main` 후 재시도
- `branch unknown` → 현재 브랜치명 확인 (`main` 가정)

---

## Step 5 — 결과 보고

```
=====================================
  작업 종료 — YYYY-MM-DD HH:MM
=====================================

📁 폴더: <현재 cwd>

📝 작업보고서: 작업보고서/YYYY-MM-DD.md
   (신규 생성 / 갱신)

💾 인계 저장: 작업보고서/.context/YYYY-MM-DD.session.md
   다음 세션 /work-start 가 자동 읽음

🔀 Git:
   - Commit: <hash> "<message 첫 줄>"
   - Push: ihong9059/<폴더명> → 성공 / 실패
   - 변경 파일: N개

✅ 본 세션 완료 사항
- (목록)

⏭ 다음 세션 TODO
- (목록)

=====================================
```

---

## 트리거 키워드

- `/work-end` 슬래시 명령
- "작업 종료"
- "마무리"
- "세션 종료"
- "work end"

---

## 작동 보장

- 본 스킬은 **현재 cwd 안에서만** 작동
- 작업보고서 파일은 **덮어쓰지 않음** (append 또는 세션 N 추가)
- `.context/` 인계 파일은 **세션마다 갱신** (덮어씀 — 최신 상태만 보존)
- git remote는 **`ihong`** (origin과 별개)
- commit 메시지는 **사용자 확인 가능** (자동 진행 시 미리 표시)

---

## 안전 가드

- ❌ `--force` push 절대 금지 (사용자 명시 동의 시만)
- ❌ `--no-verify` 절대 금지 (pre-commit hook 우회 금지)
- ❌ 다른 폴더의 git repo 건드리지 않음
- ❌ 비밀번호·토큰을 작업보고서에 박제 금지 (`.secrets`, `.env` 같은 ignore 패턴 사전 점검)

---

## 관련 스킬

- `/work-start` — 작업 시작 시 호출 (인계 읽기 + git pull)
- `_folder_work_template` — 본 스킬을 임의 폴더에 적용하는 템플릿 패키지 (출처)
