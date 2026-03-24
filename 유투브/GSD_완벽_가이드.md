# GSD (Get Shit Done) 완벽 가이드

## GSD란?

**GSD(Get Shit Done)**는 Claude Code, OpenCode, Gemini CLI, Codex, Copilot, Cursor, Antigravity를 위한 **메타프롬프팅, 컨텍스트 엔지니어링, 스펙 기반 개발 시스템**입니다.

> "Claude Code는 강력합니다. GSD는 그것을 신뢰할 수 있게 만듭니다."

---

## 핵심 문제: Context Rot

Claude Code를 사용하다 보면 경험하는 현상:
- 처음엔 천재처럼 작동
- 1시간 후 이전에 정한 규칙을 잊음
- 본인이 짠 코드를 덮어씀
- 같은 실수를 반복

**이것이 Context Rot (컨텍스트 부패)입니다.**

컨텍스트 윈도우가 차면서 품질이 저하되는 구조적 한계입니다.

### GSD의 해결 방식

| 문제 | GSD 해결책 |
|------|------------|
| 컨텍스트 과부하 | 서브 에이전트로 분리 (각각 20만 토큰 프레시한 컨텍스트) |
| 정보 손실 | 구조화된 마크다운 문서로 전달 |
| 작업 방향 이탈 | 원자적 계획 + 자체 검증 |
| 수동 관리 부담 | 자동화된 워크플로우 |

---

## 설치 방법

### 기본 설치 (대화형)

```bash
npx get-shit-done-cc@latest
```

설치 시 선택:
1. **런타임** - Claude Code, OpenCode, Gemini, Codex, Copilot, Cursor, Antigravity
2. **위치** - Global (모든 프로젝트) 또는 Local (현재 프로젝트만)

### 비대화형 설치 (스크립트/CI용)

```bash
# Claude Code 글로벌 설치
npx get-shit-done-cc --claude --global

# Claude Code 로컬 설치
npx get-shit-done-cc --claude --local

# 모든 런타임에 설치
npx get-shit-done-cc --all --global
```

### 설치 확인

```
/gsd:help
```

### 업데이트

```bash
npx get-shit-done-cc@latest
```

---

## 핵심 워크플로우: 5단계 사이클

```
┌─────────────────────────────────────────────────────────────┐
│                    GSD 워크플로우                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   1. NEW-PROJECT     2. DISCUSS        3. PLAN             │
│   ┌─────────┐       ┌─────────┐       ┌─────────┐          │
│   │ 질문    │  →    │ 논의    │  →    │ 계획    │          │
│   │ 리서치  │       │ 결정    │       │ 검증    │          │
│   │ 요구사항│       │         │       │         │          │
│   │ 로드맵  │       │         │       │         │          │
│   └─────────┘       └─────────┘       └─────────┘          │
│                                            ↓               │
│   5. VERIFY          ←          4. EXECUTE                 │
│   ┌─────────┐                  ┌─────────┐                 │
│   │ 검증    │       ←          │ 실행    │                 │
│   │ 수정    │                  │ 커밋    │                 │
│   └─────────┘                  └─────────┘                 │
│        ↓                                                   │
│   6. SHIP → 다음 Phase 또는 Complete Milestone             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 상세 사용법

### 1단계: 프로젝트 초기화

```
/gsd:new-project
```

시스템이 수행하는 작업:
1. **질문** - 목표, 제약 조건, 기술 스택, 엣지 케이스 파악
2. **리서치** - 병렬 에이전트가 도메인 조사 (선택사항이지만 권장)
3. **요구사항** - v1, v2, 범위 외 항목 추출
4. **로드맵** - 요구사항에 매핑된 단계(Phase) 생성

**생성 파일**: `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`

---

### 2단계: Phase 논의

```
/gsd:discuss-phase 1
```

로드맵의 각 Phase는 한두 문장으로 되어 있습니다. 이것만으로는 **당신이 원하는 방식**으로 구현하기 어렵습니다.

시스템이 분석하는 영역:
- **시각적 기능** → 레이아웃, 밀도, 인터랙션, 빈 상태
- **API/CLI** → 응답 형식, 플래그, 에러 처리
- **콘텐츠 시스템** → 구조, 톤, 깊이, 흐름

**생성 파일**: `{phase_num}-CONTEXT.md`

---

### 3단계: Phase 계획

```
/gsd:plan-phase 1
```

시스템이 수행하는 작업:
1. **리서치** - CONTEXT.md 결정 사항을 기반으로 구현 방법 조사
2. **계획** - 2-3개의 원자적 태스크 플랜 생성 (XML 구조)
3. **검증** - 요구사항 대비 계획 검증, 통과할 때까지 반복

**생성 파일**: `{phase_num}-RESEARCH.md`, `{phase_num}-{N}-PLAN.md`

---

### 4단계: Phase 실행

```
/gsd:execute-phase 1
```

시스템이 수행하는 작업:
1. **웨이브 단위 실행** - 독립적인 계획은 병렬, 의존성 있는 것은 순차
2. **계획당 프레시 컨텍스트** - 20만 토큰이 순수하게 구현에만 사용
3. **태스크당 커밋** - 각 태스크마다 원자적 Git 커밋
4. **목표 대비 검증** - 코드베이스가 Phase 목표를 달성했는지 확인

#### 웨이브 실행 방식

```
┌────────────────────────────────────────────────────────────────────┐
│  PHASE 실행                                                        │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│  WAVE 1 (병렬)              WAVE 2 (병렬)              WAVE 3      │
│  ┌─────────┐ ┌─────────┐    ┌─────────┐ ┌─────────┐    ┌─────────┐ │
│  │ Plan 01 │ │ Plan 02 │ →  │ Plan 03 │ │ Plan 04 │ →  │ Plan 05 │ │
│  │ User    │ │ Product │    │ Orders  │ │ Cart    │    │ Checkout│ │
│  │ Model   │ │ Model   │    │ API     │ │ API     │    │ UI      │ │
│  └─────────┘ └─────────┘    └─────────┘ └─────────┘    └─────────┘ │
│                                                                    │
│  독립적인 Plan → 같은 Wave → 병렬 실행                              │
│  의존성 있는 Plan → 다음 Wave → 순차 실행                           │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

**생성 파일**: `{phase_num}-{N}-SUMMARY.md`, `{phase_num}-VERIFICATION.md`

---

### 5단계: 작업 검증

```
/gsd:verify-work 1
```

자동 검증 + 사용자 직접 확인:
1. **테스트 가능한 항목 추출** - 지금 할 수 있어야 하는 것들
2. **하나씩 확인** - "이메일로 로그인 되나요?" Yes/No
3. **실패 시 자동 진단** - 디버그 에이전트가 근본 원인 분석
4. **수정 계획 생성** - 즉시 재실행 가능

**생성 파일**: `{phase_num}-UAT.md`, 문제 발견 시 수정 계획

---

### 6단계: 반복 → 배포 → 완료 → 다음 마일스톤

```
/gsd:discuss-phase 2
/gsd:plan-phase 2
/gsd:execute-phase 2
/gsd:verify-work 2
/gsd:ship 2                  # 검증된 작업으로 PR 생성
...
/gsd:complete-milestone      # 마일스톤 완료, 릴리스 태그
/gsd:new-milestone           # 다음 버전 시작
```

자동으로 다음 단계 실행:
```
/gsd:next                    # 자동으로 다음 단계 감지 및 실행
```

---

## GSD의 핵심 장점

### 1. 컨텍스트 엔지니어링

| 파일 | 역할 |
|------|------|
| `PROJECT.md` | 프로젝트 비전, 항상 로드됨 |
| `research/` | 생태계 지식 (스택, 기능, 아키텍처, 함정) |
| `REQUIREMENTS.md` | 범위가 정해진 v1/v2 요구사항 |
| `ROADMAP.md` | 어디로 가는지, 뭐가 완료됐는지 |
| `STATE.md` | 결정사항, 차단요소, 현재 위치 - 세션 간 기억 |
| `PLAN.md` | XML 구조의 원자적 태스크, 검증 단계 포함 |
| `SUMMARY.md` | 무슨 일이 있었는지, 뭐가 바뀌었는지, 히스토리에 커밋 |

### 2. XML 프롬프트 포맷팅

모든 계획은 Claude에 최적화된 구조화된 XML:

```xml
<task type="auto">
  <name>로그인 엔드포인트 생성</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>
    JWT에 jose 사용 (jsonwebtoken 아님 - CommonJS 이슈).
    users 테이블에서 자격 증명 검증.
    성공 시 httpOnly 쿠키 반환.
  </action>
  <verify>curl -X POST localhost:3000/api/auth/login이 200 + Set-Cookie 반환</verify>
  <done>유효한 자격 증명은 쿠키 반환, 무효한 것은 401 반환</done>
</task>
```

### 3. 멀티 에이전트 오케스트레이션

| 단계 | 오케스트레이터 역할 | 에이전트 역할 |
|------|---------------------|---------------|
| 리서치 | 조율, 결과 제시 | 4개 병렬 연구자가 스택, 기능, 아키텍처, 함정 조사 |
| 계획 | 검증, 반복 관리 | 플래너가 계획 생성, 체커가 검증, 통과까지 반복 |
| 실행 | 웨이브 그룹화, 진행 추적 | 실행자들이 병렬 구현, 각각 프레시 20만 컨텍스트 |
| 검증 | 결과 제시, 다음 라우팅 | 검증자가 목표 대비 확인, 디버거가 실패 진단 |

**결과**: 전체 Phase를 실행해도 메인 컨텍스트는 30-40%만 사용. 작업은 프레시한 서브 에이전트 컨텍스트에서 수행.

### 4. 원자적 Git 커밋

각 태스크는 완료 직후 자체 커밋:

```
abc123f docs(08-02): complete user registration plan
def456g feat(08-02): add email confirmation flow
hij789k feat(08-02): implement password hashing
lmn012o feat(08-02): create registration endpoint
```

**장점**:
- `git bisect`로 정확히 실패한 태스크 찾기
- 각 태스크 독립적으로 되돌리기 가능
- 미래 세션에서 Claude가 히스토리 참조 가능

---

## 주요 명령어

### 핵심 워크플로우

| 명령어 | 설명 |
|--------|------|
| `/gsd:new-project` | 전체 초기화: 질문 → 리서치 → 요구사항 → 로드맵 |
| `/gsd:discuss-phase [N]` | 계획 전 구현 결정 캡처 |
| `/gsd:plan-phase [N]` | Phase에 대한 리서치 + 계획 + 검증 |
| `/gsd:execute-phase <N>` | 병렬 웨이브로 모든 계획 실행, 완료 시 검증 |
| `/gsd:verify-work [N]` | 수동 사용자 수락 테스트 |
| `/gsd:ship [N]` | 검증된 Phase 작업으로 PR 생성 |
| `/gsd:next` | 자동으로 다음 논리적 단계로 진행 |
| `/gsd:complete-milestone` | 마일스톤 아카이브, 릴리스 태그 |
| `/gsd:new-milestone` | 다음 버전 시작 |

### 빠른 작업

| 명령어 | 설명 |
|--------|------|
| `/gsd:quick` | 전체 계획 없이 즉석 태스크 실행 |
| `/gsd:fast <text>` | 인라인 사소한 태스크 - 계획 완전 생략 |

### 탐색

| 명령어 | 설명 |
|--------|------|
| `/gsd:progress` | 어디에 있는지? 다음은? |
| `/gsd:help` | 모든 명령어와 사용 가이드 표시 |
| `/gsd:manager` | Phase 관리를 위한 대화형 커맨드 센터 |

### 기존 코드베이스

| 명령어 | 설명 |
|--------|------|
| `/gsd:map-codebase` | new-project 전에 기존 코드베이스 분석 |

### 세션 관리

| 명령어 | 설명 |
|--------|------|
| `/gsd:pause-work` | Phase 중간에 멈출 때 핸드오프 생성 |
| `/gsd:resume-work` | 마지막 세션에서 복원 |

---

## 설정

### 모드

| 설정 | 옵션 | 기본값 | 설명 |
|------|------|--------|------|
| `mode` | `yolo`, `interactive` | `interactive` | 자동 승인 vs 각 단계 확인 |
| `granularity` | `coarse`, `standard`, `fine` | `standard` | Phase 세분화 정도 |

### 모델 프로필

| 프로필 | 계획 | 실행 | 검증 |
|--------|------|------|------|
| `quality` | Opus | Opus | Sonnet |
| `balanced` (기본) | Opus | Sonnet | Sonnet |
| `budget` | Sonnet | Sonnet | Haiku |

프로필 변경:
```
/gsd:set-profile budget
```

### 워크플로우 에이전트

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `workflow.research` | `true` | 각 Phase 계획 전 도메인 리서치 |
| `workflow.plan_check` | `true` | 실행 전 계획이 목표 달성하는지 검증 |
| `workflow.verifier` | `true` | 실행 후 필수사항 전달됐는지 확인 |
| `workflow.auto_advance` | `false` | discuss → plan → execute 자동 체인 |

---

## GSD 없이도 적용할 수 있는 원칙

GSD를 설치하지 않더라도 이 시스템에서 배울 수 있는 **3가지 핵심 원칙**:

### 1. 대화를 줄이고 문서를 늘리세요

```
❌ 채팅: "이거 만들어 줘", "아 그거 말고", "다시 수정해"
✅ 문서: CLAUDE.md에 프로젝트 구조 정리, 스킬 파일에 반복 지시 정리
```

**효과**: 잡다 섞인 10만 토큰 < 핵심만 정리된 2만 토큰

### 2. 큰 작업은 쪼개서 시키세요

```
❌ 최악: "이 앱 전체를 만들어 줘"
✅ 원자적: "로그인 API부터 만들어 줘. 스펙은 이거야. 끝나면 이 테스트로 확인해 줘."
```

**효과**: 컨텍스트가 넘칠 일이 없음

### 3. 검증을 자동화하세요

```
1. 테스트 코드를 먼저 작성
2. Claude Code에게 구현 맡기기
3. 테스트 통과 = 완료, 실패 = 다시 시키기
```

**효과**: 안전망이 있으면 맘 놓고 맡길 수 있음

---

## 권장 사용 환경

### 권한 스킵 모드 (권장)

GSD는 마찰 없는 자동화를 위해 설계되었습니다:

```bash
claude --dangerously-skip-permissions
```

> `date`와 `git commit`을 50번 승인하느라 멈추는 것은 GSD의 목적에 어긋납니다.

### 세밀한 권한 (대안)

프로젝트의 `.claude/settings.json`에 추가:

```json
{
  "permissions": {
    "allow": [
      "Bash(date:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git status:*)"
    ]
  }
}
```

---

## 보안

### 내장 보안 강화 (v1.27+)

- **경로 순회 방지** - 사용자 제공 파일 경로가 프로젝트 디렉토리 내에서 해결되는지 검증
- **프롬프트 인젝션 감지** - 사용자 제공 텍스트가 계획 아티팩트에 들어가기 전 스캔
- **안전한 JSON 파싱** - 잘못된 인수가 상태를 손상시키기 전에 캐치
- **쉘 인수 검증** - 쉘 보간 전 사용자 텍스트 정제

### 민감한 파일 보호

`.claude/settings.json`의 거부 목록에 추가:

```json
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(.env.*)",
      "Read(**/secrets/*)",
      "Read(**/*.pem)",
      "Read(**/*.key)"
    ]
  }
}
```

---

## 삭제 방법

```bash
# 글로벌 설치 삭제
npx get-shit-done-cc --claude --global --uninstall

# 로컬 설치 삭제
npx get-shit-done-cc --claude --local --uninstall
```

---

## 커뮤니티

- **GitHub**: https://github.com/gsd-build/get-shit-done (⭐ 39.3k)
- **Discord**: https://discord.gg/gsd
- **Twitter/X**: @gsd_foundation

---

## 요약

| 항목 | 내용 |
|------|------|
| **문제** | Context Rot - 컨텍스트가 차면서 품질 저하 |
| **해결책** | 메타프롬프팅 + 컨텍스트 엔지니어링 + 스펙 기반 개발 |
| **핵심 원리** | 서브 에이전트 격리, 구조화된 문서 전달, 원자적 계획 |
| **워크플로우** | 질문 → 논의 → 계획 → 실행 → 검증 (사이클 반복) |
| **장점** | 프레시 컨텍스트, 원자적 커밋, 자동 검증, 병렬 실행 |
| **설치** | `npx get-shit-done-cc@latest` |

> **"바이브코딩은 나쁜 평판을 가지고 있습니다. 원하는 것을 설명하면 AI가 코드를 생성하고, 규모가 커지면 무너지는 일관성 없는 쓰레기를 얻습니다. GSD는 그것을 고칩니다. Claude Code를 신뢰할 수 있게 만드는 컨텍스트 엔지니어링 레이어입니다."**
>
> — TÂCHES (GSD 제작자)

---

*작성일: 2026-03-24*
*참고: https://github.com/gsd-build/get-shit-done*
