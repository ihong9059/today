# Skill-Based Vault Template

> **목적**: `today` vault에서 운영하는 **skill 기반 세션 연속성 원리**를 그대로 이식해 새 vault를 만들기 위한 템플릿.
>
> **차이점**: `templates/claude_project_template`는 skill을 *거부*하고 폴더 파일만으로 동작(이식성 우선). 본 템플릿은 skill·hook을 **실제로 포함·상속**한다(운영 원리 재현 우선).
>
> **신설일**: 2026-07-27

---

## 무엇을 이식하는가

| 구성요소 | 파일 | 역할 |
|---|---|---|
| `/work-start` skill | `.claude/skills/work-start/SKILL.md` | git pull → 세션 복원 → 할일 통합표 → wiki 점검 |
| `/work-end` skill | `.claude/skills/work-end/SKILL.md` | 세션 저장 → 작업보고서 갱신 → wiki 반영 → git commit/push |
| SessionStart 훅 | `.claude/hooks/create-daily-report.py` | 세션 진입 시 오늘 작업보고서 자동 생성 |
| 훅 등록 | `.claude/settings.json` | SessionStart 매핑 |
| 세션 저장소 | `.claude/sessions/` | `session_*.md` + `_current_progress.md` |
| 작업보고서 | `작업보고서/` | 일별 할일 통합표 |
| 세컨드 브레인 | `wiki/` | log · entities · thoughts |

원본 vault 전용 외부 연동(Notion·myWiki cascade·revitaWiki·rpi 브로커)은 **제외**하고, 각 skill 하단 "확장점" 섹션에 삽입 위치만 남겼다.

---

## 폴더 구조

```
skill-vault-template/
├── README.md                          ← 본 가이드 (적용 후 프로젝트별로 갱신/삭제)
├── CLAUDE.md                          ← vault 지침 + 운영 원리
├── .claude/
│   ├── settings.json                  ← SessionStart 훅 등록
│   ├── skills/
│   │   ├── work-start/SKILL.md
│   │   └── work-end/SKILL.md
│   ├── hooks/
│   │   └── create-daily-report.py
│   └── sessions/
│       └── .gitkeep
├── wiki/
│   ├── CLAUDE.md
│   ├── log.md
│   ├── entities/.gitkeep
│   └── thoughts/.gitkeep
└── 작업보고서/
    └── .gitkeep
```

---

## 사용법

### 1. 새 vault 폴더로 복사

```powershell
# PowerShell (Windows)
robocopy "C:\todo\today\templates\skill-vault-template" "C:\path\to\새vault" /E
```
```bash
# Bash / Mac / Linux
cp -r skill-vault-template/ /path/to/새vault/
```

### 2. placeholder 채우기
- `CLAUDE.md` 0번 표(`[프로젝트명]` 등) + 2번 가이드라인
- `README.md`는 프로젝트용으로 다시 쓰거나 삭제

### 3. 첫 로그 박제
- `wiki/log.md`에 `## [YYYY-MM-DD] start | 프로젝트 시작`

### 4. (git 사용 시) 초기화
```bash
git init && git add -A && git commit -m "init: 새 vault (skill-vault-template)"
```

### 5. 사용
- Claude Code에서 해당 폴더를 cwd로 실행 → SessionStart 훅이 오늘 작업보고서 자동 생성
- "작업 시작"/`/work-start` → 세션 복원 + 할일 통합
- "작업 종료"/`/work-end` → 세션 저장 + git 커밋

---

## 외부 확장 (선택)

자기완결로 충분하면 그대로 사용. 원본 `today` vault처럼 확장하려면 각 skill 하단 "확장점" 참조:
- **Notion 단방향 sync** — 할일 통합 직후 sync 훅 체이닝 (`settings.json`의 command에 `&& python ...`)
- **memory 링크** — `~/.claude/projects/<proj>/memory/` ↔ `.claude/memory/`
- **multi-agent `_inbox`** — 다른 vault와 카드 기반 비동기 협업
- **cross-vault staleness** — sibling vault log vs 본 wiki entity 비교 훅

---

## 다른 템플릿과의 관계

| 템플릿 | 특징 | 언제 쓰나 |
|---|---|---|
| `claude_project_template` | skill·외부의존 0, 폴더 파일만 | USB·타 repo·타 PC 이식성 최우선 |
| `sub-vault-template` | wiki 골격만 (log·entities·thoughts) | Tier 2 프로젝트 격리 위키 |
| **`skill-vault-template`** ⭐ | **skill·hook 포함, 세션 연속성 자동화** | **본 vault처럼 work-start/end로 운영할 새 vault** |
