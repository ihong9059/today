# Folder Work Template — 임의 폴더에 적용하는 work-start/work-end 표준

> **목적**: 어떤 폴더든 이 템플릿을 적용하면 그 폴더 안에서 `/work-start` + `/work-end` 슬래시 명령으로 일관된 작업 시작·종료 워크플로우를 사용할 수 있습니다.
> **작성**: 2026-05-15
> **출처**: today/.claude/skills/work-start, work-end (UTTEC 본 환경)을 일반 폴더용으로 단순화·표준화

---

## 한 줄 정의

> **`/work-start` = 작업 진입 (작업보고서 폴더 + 전 세션 인계 파악 + git pull/init + 다음 할일 표시 + vault hook chain)**
> **`/work-end` = 작업 종료 (오늘 작업보고서 작성 + 다음 세션 인계 저장 + vault hook chain + git commit & push)**

## Vault hook chain (자동)

본 템플릿은 **공통 부트스트랩**만 책임진다. 폴더가 vault(예: lemonLabs, myWiki)일 때 필요한 vault 특화 자동화는 **각 vault의 `vault-start.md` / `vault-end.md`에 격리**해서 작성한다.

- `/work-start` Step 5에서 `.claude/skills/vault-start/SKILL.md` 또는 `.claude/commands/vault-start.md`가 있으면 그 절차를 그대로 chain
- `/work-end` Step 4에서 동일하게 `vault-end.md` chain (단, git commit 직전 → vault 박제도 한 commit에)
- vault hook 파일이 없으면 자동 skip → 일반 폴더는 영향 받지 않음

→ 사용자는 어떤 폴더에서든 `/work-start` / `/work-end` 두 명령만 알면 됨. vault 특화 동작은 폴더가 알아서 자기 vault-*.md를 흡수.

---

## 무엇을 해결하나

| 문제 | 해결 |
|---|---|
| 폴더마다 작업 진행이 흩어짐 | 폴더 안 `작업보고서/`에 시간순 박제 |
| 다음 세션이 직전 세션 진행을 모름 | `.context/`에 인계 메모 자동 저장·복원 |
| git 관리 빠짐 (commit 안 함, push 안 함) | work-end가 자동 commit + push (ihong9059 계정) |
| 폴더에 git repo 없음 | work-start가 감지 → 폴더 이름으로 ihong9059 remote 생성 |

---

## 패키지 구성

```
_folder_work_template/
├── README.md              ← 본 파일 (개요)
├── INSTALL.md             ← 적용 절차 (target 폴더에서 어떻게 설치하나)
├── skills/
│   ├── work-start.md      ← /work-start 스킬 본문 (target 폴더의 .claude/skills/work-start/SKILL.md 로 복사)
│   └── work-end.md        ← /work-end 스킬 본문 (target 폴더의 .claude/skills/work-end/SKILL.md 로 복사)
└── helpers/
    └── apply.sh           ← 적용 자동화 (한 줄로 install)
```

---

## 적용 결과 (target 폴더에 install 후)

target 폴더 구조 추가:
```
<target_folder>/
├── (기존 파일들)
├── .claude/
│   └── skills/
│       ├── work-start/SKILL.md     ← /work-start 명령
│       └── work-end/SKILL.md       ← /work-end 명령
├── 작업보고서/                       ← 일일 작업 기록 (work-end가 채움)
│   └── .context/                    ← 다음 세션 인계 메모 (work-end가 저장)
└── .git/                            ← git repo (없으면 work-start가 init)
```

target 폴더 내에서 Claude 세션 시작 후:
```
/work-start    → 작업 시작 (자동: 작업보고서 폴더 + 전 세션 인계 + git pull + 할일 표시 + vault hook chain)
... 작업 진행 ...
/work-end      → 작업 종료 (자동: 오늘 보고서 + 인계 저장 + vault hook chain + git commit + push)
```

vault 특화 자동화가 필요한 폴더는 같은 폴더에 `vault-start.md` / `vault-end.md`를 추가하면 자동으로 흡수됨 (위 "Vault hook chain" 섹션 참조).

---

## 적용 시나리오

| 시나리오 | 적용 |
|---|---|
| 새 프로젝트 폴더 만들었음 | `apply.sh` 한 줄 → 즉시 `/work-start` 사용 가능 |
| 기존 폴더에 일관된 워크플로우 도입 | INSTALL.md 따라 5분 |
| 여러 폴더에 같은 패턴 적용 | 폴더마다 apply 반복 (자동화 가능) |

---

## 본 환경(UTTEC)의 기존 work-start/work-end와 차이

| 항목 | UTTEC `today/.claude/skills/` | 본 템플릿 (`_folder_work_template/`) |
|---|---|---|
| 위치 | today/ 전체 단일 워크플로우 | **폴더별 독립** 워크플로우 |
| 작업보고서 위치 | `today/작업보고서/` | **각 폴더 내** `작업보고서/` |
| Notion sync | ✅ (사용자 환경 특화) | ❌ (일반 폴더 가정) |
| myWiki 반영 | ✅ (UTTEC 특화) | ❌ |
| multi-agent _inbox | UTTEC 환경 한정 | ❌ |
| git account | 사용자 설정 | **`ihong9059` 명시** |
| 복잡도 | 8 단계 + 다수 hook | **3 단계 핵심만** |

→ 본 템플릿은 **단순·일반화** 버전. UTTEC 본 환경(today/, myWiki/, onDevice_AI/, revitaProject/)은 기존 풍부한 스킬 그대로 사용.

---

## 다음 단계

→ **`INSTALL.md`** 읽기 (target 폴더에 적용하는 정확한 절차)
