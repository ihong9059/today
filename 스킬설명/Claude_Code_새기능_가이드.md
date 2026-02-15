# Claude Code 새 기능 및 업데이트 가이드

**작성일**: 2026-02-15
**버전**: Claude Code 2026.02

---

## 목차

1. [주요 기능 현황](#1-주요-기능-현황)
2. [실험적/베타 기능](#2-실험적베타-기능)
3. [Agent Teams](#3-agent-teams)
4. [Subagents (서브에이전트)](#4-subagents-서브에이전트)
5. [Hooks (이벤트 자동화)](#5-hooks-이벤트-자동화)
6. [Skills (커스텀 스킬)](#6-skills-커스텀-스킬)
7. [MCP (Model Context Protocol)](#7-mcp-model-context-protocol)
8. [Plugin System](#8-plugin-system)
9. [주요 명령어 및 단축키](#9-주요-명령어-및-단축키)
10. [설정 파일 위치](#10-설정-파일-위치)

---

## 1. 주요 기능 현황

| 기능명 | 설명 | 상태 | 활성화 방법 |
|--------|------|:----:|------------|
| **Agent Teams** | 여러 에이전트 동시 협업 | 정식 | `/agent-teams` 명령 |
| **Subagents** | 특정 작업 전담 서브 에이전트 | 정식 | `.claude/skills/` 디렉토리 |
| **Hooks** | 커맨드 실행 전/후 자동화 | 정식 | `settings.json` hooks 섹션 |
| **Skills** | 재사용 가능한 작업 흐름 | 정식 | `/skill-creator` 명령 |
| **MCP** | 외부 서비스 통합 (Slack, Jira 등) | 정식 | `settings.json` mcp 섹션 |
| **Plugin System** | 에이전트 스킬 플러그인 | 정식 | `enabledPlugins` 설정 |
| **Headless Mode** | CI/CD 파이프라인 자동화 | 정식 | 환경변수 설정 |
| **Session Management** | 세션 저장/복원 | 정식 | 자동 또는 `/session-save` |
| **CLAUDE.md** | 프로젝트별 코딩 표준 정의 | 정식 | 프로젝트 루트에 파일 생성 |

---

## 2. 실험적/베타 기능

| 기능명 | 설명 | 상태 | 활성화 방법 |
|--------|------|:----:|------------|
| **JetBrains Plugin** | JetBrains IDE 통합 | 베타 | IDE 플러그인 마켓 |
| **Desktop App** | 데스크톱 네이티브 앱 | 정식 | https://code.claude.com |
| **Chrome Extension** | Chrome DevTools 통합 | 실험 | Chrome 웹스토어 |

### 실험적 기능 활성화 (환경변수)

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## 3. Agent Teams

여러 에이전트가 협업하여 복잡한 작업을 병렬로 처리합니다.

### 활성화

`settings.json`:
```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### 사용법

```
"이 작업을 위해 에이전트 팀을 만들어줘"
```

### 팀원 전환

- `Shift+Up/Down`: 팀원 간 전환
- Split panes 모드: tmux 또는 iTerm2 필요

### 적합한 작업

| 추천 | 피해야 할 경우 |
|------|--------------|
| 병렬 연구/검토 | 순차 작업 |
| 여러 기능 동시 개발 | 동일 파일 편집 |
| 경쟁 가설 디버깅 | 높은 의존도 작업 |
| 프론트/백엔드/테스트 분리 | |

---

## 4. Subagents (서브에이전트)

특정 작업을 전담하는 서브에이전트를 생성합니다.

### Agent Teams vs Subagents

| 구분 | Subagents | Agent Teams |
|------|-----------|-------------|
| 범위 | 단일 세션 내 | 독립 세션 |
| 컨텍스트 | 부모 공유 | 각자 독립 |
| 통신 | 보고만 | 직접 통신 |
| 사용 시기 | 특정 작업 격리 | 복잡한 멀티 워크플로우 |

### 설정 방법

```bash
/agents  # 대화형 설정
```

또는 `.claude/agents/` 디렉토리에 YAML 파일 생성

---

## 5. Hooks (이벤트 자동화)

도구 실행 전/후에 자동으로 명령을 실행합니다.

### Hook 이벤트 종류

| 이벤트 | 설명 |
|--------|------|
| `PreToolUse` | 도구 실행 전 |
| `PostToolUse` | 도구 실행 후 |
| `PreBash` | Bash 실행 전 |
| `PostBash` | Bash 실행 후 |
| `Stop` | 작업 중단 시 |

### 설정 예시 (settings.json)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "powershell -c \"[console]::beep(1000,300)\""
          }
        ]
      }
    ],
    "PreBash": [
      {
        "matcher": "git push",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Git push 실행 중...'"
          }
        ]
      }
    ]
  }
}
```

---

## 6. Skills (커스텀 스킬)

재사용 가능한 작업 흐름을 패키징합니다.

### 스킬 생성

```bash
/skill-creator
```

### 스킬 파일 구조

```
.claude/skills/my-skill/
└── SKILL.md
```

### SKILL.md 템플릿

```markdown
---
name: my-skill
description: 스킬 설명 (트리거 키워드 포함)
---

# 스킬 이름

## 트리거 키워드
- "키워드1"
- "키워드2"

## 실행 절차
1. 단계 1
2. 단계 2

## 사용 예시
예제 내용
```

### 현재 프로젝트 스킬 목록

| 스킬명 | 설명 |
|--------|------|
| `/work-start` | 작업 시작: git pull, 세션 복원, 할일 표시 |
| `/work-end` | 작업 종료: 세션 저장, 보고서 업데이트, git push |
| `/claude-news` | Claude Code 새 기능 알림 |
| `/ec2-remote` | AWS EC2 원격 명령 실행 |
| `/wishket-check` | 위시캣 신규 프로젝트 검토 |
| `/wishket-apply` | 위시캣 프로젝트 지원서 작성 |
| `/yt-summary` | YouTube 영상 요약 생성 |

---

## 7. MCP (Model Context Protocol)

외부 서비스와 통합합니다.

### 설정 위치

`settings.json` 또는 `.claude/config.json`

### MCP 서버 연결 예시

```json
{
  "mcp": {
    "servers": {
      "google-drive": {
        "command": "npx",
        "args": ["@modelcontextprotocol/server-google-drive"]
      },
      "slack": {
        "command": "npx",
        "args": ["@modelcontextprotocol/server-slack"]
      },
      "jira": {
        "command": "npx",
        "args": ["@modelcontextprotocol/server-jira"]
      }
    }
  }
}
```

### 사용 가능한 MCP 서버

- Google Drive
- Slack
- Jira
- GitHub
- AWS
- 커스텀 서버

---

## 8. Plugin System

에이전트 스킬 플러그인을 활성화합니다.

### 활성화 방법

`settings.json`:
```json
{
  "enabledPlugins": {
    "example-skills@anthropic-agent-skills": true,
    "document-skills@anthropic-agent-skills": true
  }
}
```

### 주요 플러그인 스킬

| 스킬명 | 설명 |
|--------|------|
| `example-skills:frontend-design` | 웹 UI 디자인 |
| `example-skills:mcp-builder` | MCP 서버 구축 가이드 |
| `example-skills:skill-creator` | 스킬 생성 가이드 |
| `example-skills:xlsx` | 스프레드시트 작업 |
| `example-skills:pdf` | PDF 생성/편집 |
| `example-skills:docx` | 문서 작업 |
| `example-skills:pptx` | 프레젠테이션 작업 |
| `example-skills:web-artifacts-builder` | React/Tailwind 아티팩트 |

---

## 9. 주요 명령어 및 단축키

### 내장 명령어

| 명령어 | 기능 |
|--------|------|
| `/help` | 도움말 보기 |
| `/context` | 컨텍스트 확인 |
| `/usage` | API 사용량 확인 |
| `/model` | 모델 변경 |
| `/todos` | 할일 목록 |
| `/teleport` | 웹↔터미널 전환 |
| `/desktop` | 데스크톱 앱 전환 |
| `/init` | CLAUDE.md 자동 생성 |

### 단축키

| 단축키 | 기능 |
|--------|------|
| `Ctrl+C` | 현재 작업 중단 |
| `Shift+Up/Down` | Agent Teams 팀원 전환 |

---

## 10. 설정 파일 위치

| 파일 | 위치 | 용도 |
|------|------|------|
| 글로벌 설정 | `~/.claude/settings.json` | 전역 설정 |
| 프로젝트 설정 | `.claude/settings.local.json` | 프로젝트별 설정 |
| 스킬 | `.claude/skills/` | 커스텀 스킬 |
| 세션 | `.claude/sessions/` | 세션 저장 |
| 프로젝트 가이드 | `CLAUDE.md` | 코딩 표준 |

---

## 참고 링크

- 공식 문서: https://code.claude.com/docs
- GitHub: https://github.com/anthropics/claude-code
- Claude API: https://platform.claude.com/docs

---

*마지막 업데이트: 2026-02-15*
