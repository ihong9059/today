# myWiki 시스템 셋업 가이드 — Phase 1~5

> 본 가이드는 새 회사·단체가 위 시스템을 자기 환경에 도입하는 단계별 절차.
> 각 Phase 종료 시 CHECKLIST.md의 해당 항목을 확인.

## 사전 준비

| 항목 | 확인 |
|---|---|
| Claude Code 설치 (또는 Claude.ai 활용 가능 환경) | ✅ 필수 |
| Git 사용 가능 (위키 commit·push 영구 보존) | ✅ 필수 |
| Python 3.x (SessionStart hook 작동) | ✅ 필수 |
| 작업 디렉토리 확정 (예: `C:\company\` 또는 `/home/user/company/`) | ✅ 필수 |
| Claude 식별자 결정 (예: `mywiki-claude` / `tech-claude` 같이 영문 소문자 + 하이픈) | ✅ 필수 |

## 변수 명세

본 패키지의 template 파일은 `{{변수}}` 형식의 치환 변수를 사용. 셋업 시 모두 결정:

| 변수 | 의미 | 예시 |
|---|---|---|
| `{{COMPANY_NAME}}` | 회사·단체명 | 유티텍 / UTTEC |
| `{{WIKI_ID}}` | 위키 식별자 (영문) | myWiki / acmeWiki |
| `{{WIKI_TITLE}}` | 위키 제목 (한글 가능) | UTTEC Second Brain |
| `{{SELF_CLAUDE_ID}}` | 본 위키 Claude 식별자 | mywiki-claude |
| `{{PEER_CLAUDE_ID}}` | 협업 상대 Claude 식별자 (multi-agent 셋업 시) | revita-claude |
| `{{WIKI_PATH}}` | 위키 절대 경로 | C:/company/myWiki |
| `{{PEER_PATH}}` | 상대 프로젝트 절대 경로 | C:/company/techProject |
| `{{TODAY}}` | 셋업 일자 | 2026-05-12 |
| `{{CURRENT_QUARTER}}` | 현재 분기 | 2026-Q2 |

# Phase 1 — 단일 위키 본체 셋업

## 1.1 디렉토리 구조

```bash
mkdir -p {{WIKI_PATH}}
mkdir -p {{WIKI_PATH}}/entities
mkdir -p {{WIKI_PATH}}/thoughts/{{CURRENT_QUARTER}}
mkdir -p {{WIKI_PATH}}/raw
mkdir -p {{WIKI_PATH}}/log-archive
```

## 1.2 핵심 파일 복사 + 변수 치환

| template 원본 | 대상 | 치환 |
|---|---|---|
| `templates/01_second-brain/CLAUDE.md` | `{{WIKI_PATH}}/CLAUDE.md` | 모든 변수 |
| `templates/01_second-brain/log.md` | `{{WIKI_PATH}}/log.md` | TODAY |
| `templates/01_second-brain/index.md` | `{{WIKI_PATH}}/index.md` | WIKI_TITLE |
| `templates/01_second-brain/README-thoughts.md` | `{{WIKI_PATH}}/thoughts/README.md` | (없음) |

## 1.3 핵심 페이지 6개 생성 (수동)

본 시스템은 다음 6개 페이지를 기본으로 가정:

| 파일 | 의미 |
|---|---|
| `me.md` | 핵심 정체성 (사용자·창업자가 누구인가) |
| `skills.md` | 기술 스택 인벤토리 |
| `strengths.md` | 강점 분석 |
| `gaps.md` | 부족한 부분 (현장 배포 함정 패턴 등 박제 가능) |
| `goals.md` | 목표·방향 |
| `ai-direction.md` | AI 방향 판단 + 판단 로그 (시간순 결정 기록) |

→ 각 파일 frontmatter는 `type: identity` 로 시작. 내용은 회사·개인마다 자유 작성.

## 1.4 첫 entity 1~3개 생성

`{{WIKI_PATH}}/entities/{회사명}.md` — 본인 회사 entity로 시작. `templates/01_second-brain/README-entities-example.md` 참조.

# Phase 2 — Multi-Agent `_inbox/` 통신 셋업 (선택, 권장)

> 2번째 Claude·프로젝트가 있을 때만 필요. 단일 위키만 있으면 Phase 2 스킵 가능.

## 2.1 디렉토리 + 핵심 파일

```bash
mkdir -p {{WIKI_PATH}}/_inbox/pending
mkdir -p {{WIKI_PATH}}/_inbox/processed
```

| template | 대상 | 치환 |
|---|---|---|
| `templates/02_inbox/PROTOCOL.md` | `{{WIKI_PATH}}/_inbox/PROTOCOL.md` | SELF_CLAUDE_ID, PEER_CLAUDE_ID, PEER_PATH |
| `templates/02_inbox/SYSTEM_GUIDE.md` | `{{WIKI_PATH}}/_inbox/SYSTEM_GUIDE.md` | 위와 동일 |

## 2.2 상대 프로젝트도 동일하게 셋업

상대 Claude가 작업할 프로젝트(예: `{{PEER_PATH}}`)에도 동일:

```bash
mkdir -p {{PEER_PATH}}/_inbox/{pending,processed}
cp {{WIKI_PATH}}/_inbox/PROTOCOL.md {{PEER_PATH}}/_inbox/PROTOCOL.md
cp {{WIKI_PATH}}/_inbox/SYSTEM_GUIDE.md {{PEER_PATH}}/_inbox/SYSTEM_GUIDE.md
```

→ 양쪽 PROTOCOL.md는 **동일 내용**이어야 함 (사본 유지 원칙).

# Phase 3 — SessionStart Hook 셋업

## 3.1 Hook 스크립트

| template | 대상 | 치환 |
|---|---|---|
| `templates/03_hooks/check-inbox.py` | `{{WIKI_PATH}}/.claude/hooks/check-inbox.py` | **`SELF_ID = "{{SELF_CLAUDE_ID}}"`** |
| `templates/03_hooks/settings.local.json` | `{{WIKI_PATH}}/.claude/settings.local.json` | (참고용 — 기존 settings 있으면 hooks 섹션만 merge) |

## 3.2 settings.local.json hooks 등록

기존 `settings.local.json`이 있으면:

```json
{
  "기존_필드": "...",
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "python3 .claude/hooks/check-inbox.py",
            "timeout": 5,
            "statusMessage": "_inbox 미처리 카드 확인 중..."
          }
        ]
      }
    ]
  }
}
```

→ 같은 구조를 상대 프로젝트(`{{PEER_PATH}}/.claude/`)에도 적용.

## 3.3 Hook 동작 검증

```bash
cd {{WIKI_PATH}}
python3 .claude/hooks/check-inbox.py
```

- 빈 출력 = pending 카드 0개 (정상)
- JSON 출력 = pending 카드 발견 (정상 — 단 첫 셋업이라 보통 0)

# Phase 4 — work-start / work-end 스킬 통합 (선택, 강력 권장)

> Claude Code의 work-start / work-end skill이 이미 있는 사용자만. 없으면 Phase 4 스킵.

## 4.1 work-start 스킬 패치

기존 `work-start/SKILL.md` 의 "단계 2" 직전에 `templates/04_skills/work-start-snippet.md` 내용을 삽입.

핵심: 매 세션 시작 시 `_inbox/pending/` 명시적 확인 + 5단계 흡수 안내.

## 4.2 work-end 스킬 패치

기존 `work-end/SKILL.md` 의 적절한 위치(예: "단계 6" 직전)에 `templates/04_skills/work-end-snippet.md` 의 3개 단계 삽입:

- § 5-E: 외부 위키 흡수 점검
- § 5-F: multi-agent 인계 카드 작성
- § 5-G: 시스템 자산 존재 검증

# Phase 5 — 첫 사이클 검증

## 5.1 첫 entity 작성

위키 본문에 entity 1개 작성. 예: `entities/{{COMPANY_NAME}}.md`. frontmatter + 본문 + `[[other-page]]` 링크 1개 이상.

## 5.2 첫 thought 작성 (선택)

매칭 패턴 발견 시 `thoughts/{{CURRENT_QUARTER}}/{{TODAY}}_제목.md`.

## 5.3 첫 log.md 항목

```markdown
## [{{TODAY}}] setup | myWiki 시스템 셋업 완료

- 참조: [[index]]
- 처리: Phase 1~3 완료 (단일 위키 + multi-agent inbox + hook)
- 다음: 첫 entity·thought 작성하며 운영 시작
```

## 5.4 (Phase 2 진행했다면) 첫 카드 발송 시험

상대 Claude에게 ping 카드 발송:

```yaml
---
id: {{TODAY}}-001
from: {{SELF_CLAUDE_ID}}
to: {{PEER_CLAUDE_ID}}
type: request
priority: low
subject: 시스템 셋업 완료 — 첫 가동 ping
created: {{TODAY}}T09:00
status: pending
---

# 시스템 셋업 완료 ping

본 시스템 셋업 완료. 받으시면 done 카드 회신 부탁드립니다.
```

위치: `{{PEER_PATH}}/_inbox/pending/{{TODAY}}-001-setup-ping.md`

# Phase 6 — 운영 (지속 사이클)

## 6.1 일상 흐름

```
매 세션 시작:
  1. /work-start (또는 SessionStart hook 자동 알림)
  2. _inbox/pending/ 카드 있으면 우선 처리
  3. 작업 진행

작업 중:
  - entity·thought 갱신
  - 새 발견 시 entities/ 또는 thoughts/ 신설
  - log.md 박제

매 세션 종료:
  1. /work-end
  2. § 5-E 외부 위키 흡수 점검
  3. § 5-F 다른 Claude에 인계 카드 발송 (필요 시)
  4. § 5-G 시스템 자산 검증
  5. git commit / push
```

## 6.2 정기 점검 (분기별)

- thoughts/ 분기 sub-folder 새로 생성 (예: Q2 → Q3)
- entities/ lint (60개 도달 또는 3개월마다)
- log.md 분기 아카이브 (500KB 도달 시)

## 6.3 확장 — 새 Claude 추가

3번째 위키·Claude 합류 시:
1. 해당 프로젝트에 `_inbox/{pending,processed}/` + `PROTOCOL.md` 사본
2. `.claude/hooks/check-inbox.py` (SELF_ID 변경)
3. PROTOCOL.md 합의 이력에 새 Claude 식별자 등재
4. 기존 양쪽 Claude에 신규 가입 알림 카드 발송

# 흔한 함정 (셋업 시)

| 함정 | 해결 |
|---|---|
| settings.local.json의 기존 필드를 덮어씀 | 기존 내용 + `hooks` 섹션만 merge |
| hook의 `SELF_ID` 변경 안 함 | 카드 to 필드와 매칭 안 됨 → 알림 안 옴 |
| PROTOCOL.md 양쪽 사본 내용 불일치 | 합의 이력 §만 다르고 표준 부분은 동일하게 |
| `_inbox/pending/` 폴더 미생성 | hook 실행 시 침묵으로 끝남 |
| Python 3 미설치 (Windows) | `python` 또는 `py` 명령으로 변경 |
| 카드 frontmatter `to:` 잘못 입력 | hook가 무시 → 알림 안 옴 |
| 처리한 카드 `processed/` 이동 안 함 | 다음 세션마다 같은 카드 알림 반복 |

# 다음 가이드

- 셋업 후 검증: `CHECKLIST.md` 30개 항목
- 실 사례: `EXAMPLES.md` (UTTEC + REVITA)
