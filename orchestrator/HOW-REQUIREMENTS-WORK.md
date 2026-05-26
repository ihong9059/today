# 📥 요구사항 처리 파이프라인 — 동작 원리 설명서

이 문서는 **사용자가 자연어로 요구사항을 입력 → Claude 오케스트레이터가 자동 분류·반영**하는 전체 흐름을 설명합니다.

기본 오케스트레이터 개념은 [`HOW-IT-WORKS.md`](./HOW-IT-WORKS.md)를 먼저 읽으세요.
이 문서는 그 위에 **"사용자 입력 진입점"**을 추가하는 확장입니다.

---

## 🎬 전체 흐름 한눈에 보기

```
┌──────────────────────────────────────────────────────────────┐
│ [사용자 브라우저] http://localhost:4000  (요구사항 입력 Web)   │
│   ↓ "다크모드 토글 추가해줘" 입력                              │
└──────────────────────────────────────────────────────────────┘
                              │ POST /api/requirements
                              ▼
┌──────────────────────────────────────────────────────────────┐
│ [requirements-web/server.js]                                  │
│   → requirements/REQ-20260525-NNNN.json 파일 생성              │
│   → status: "pending"                                          │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ ⏳ 대기 (큐에 쌓임)
                              │
                              ▼
              사용자: "요구사항 처리해줘" (Claude에게)
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│ [메인 Claude — 오케스트레이터]                                 │
│                                                                │
│  Step 1. Task(requirement-handler) 호출                       │
│          → 큐 스캔, 자연어 분석, 카테고리 분류                 │
│                                                                │
│  Step 2. 각 요구사항 .json → status: "in_progress" 갱신       │
│                                                                │
│  Step 3. 분류 결과로 builder들 한 메시지에서 병렬 호출:       │
│          ┌─ Task(frontend-builder)                            │
│          ├─ Task(backend-builder)                             │
│          ├─ Task(test-writer)                                 │
│          └─ Task(doc-writer)                                  │
│                                                                │
│  Step 4. 각 요구사항 .json → status: "done" + result 기록    │
│                                                                │
│  Step 5. Bash("cd todo-web && npm test") 회귀 검증            │
│                                                                │
│  Step 6. 사용자에게 처리 보고                                  │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
   브라우저(4000)에서 ✅ 상태로 표시됨 (5초마다 자동 새로고침)
   브라우저(3000)에서 todo-web에 새 기능 반영 확인 가능
```

---

## 📁 추가된 폴더·파일

```
orchestrator/
├── requirements-web/              ← 별도 입력 Web (포트 4000)
│   ├── server.js                  Express + 파일 큐 핸들러
│   ├── package.json
│   └── public/
│       ├── index.html
│       ├── style.css              핑크 그라데이션 (todo-web과 시각 구분)
│       └── app.js                 5초마다 자동 새로고침
├── requirements/                  .json 큐 저장소
│   └── REQ-YYYYMMDD-NNNN.json     (요구사항 1개 = 1 파일)
├── .claude/
│   ├── agents/
│   │   └── requirement-handler.md 라우터 에이전트
│   ├── hooks/                     ← 🆕 (B1 자동화)
│   │   └── scan-requirements.js   pending 감지 → 자동 처리 지시 주입
│   └── settings.json              ← 🆕 SessionStart + UserPromptSubmit hook 등록
└── CLAUDE.md                      Step 1~6 절차 명시
```

---

## 🆕 새 서브에이전트 — `requirement-handler`

### 역할
**라우터(분류기)**. 코드를 수정하지 않고, 사용자 요구사항을 분석하여 "어느 builder를 호출해야 하는지"만 결정합니다.

### 왜 별도 에이전트인가?
- 분류 작업과 구현 작업을 **분리** → 각자 전문화
- 메인 Claude의 context 보존 (요구사항 .json 파일 N개를 읽는 부담을 위임)
- 분류 결과만 메인에 반환 → 메인은 라우팅만 결정

### 입력
`requirements/REQ-*.json` 중 `status === "pending"` 인 것들

### 출력
```markdown
## 처리 대상 요구사항 N건

### REQ-20260525-1234 — "다크모드 토글 추가"
- category: frontend
- 호출할 에이전트: [frontend-builder]
- 구현 가이드:
  - frontend-builder: "헤더에 토글 버튼, body에 .dark 클래스 토글..."
```

→ 메인 Claude가 이 보고서를 받아 적절한 builder를 호출.

---

## 📦 요구사항 .json 데이터 구조

```json
{
  "id": "REQ-20260525-1234",
  "text": "다크모드 토글 버튼 추가해줘",
  "status": "pending",
  "created": "2026-05-25T14:30:00.000Z",
  "category": null,
  "assignedAgents": [],
  "result": null,
  "completedAt": null
}
```

**status 전이**:
```
pending  ──(requirement-handler 분석 후 메인이 갱신)──▶  in_progress
                                                            │
                                                            │ (builder들 작업 완료 후 메인이 갱신)
                                                            ▼
                                                          done
```

---

## 🚀 처음부터 끝까지 실행해보기

### 1. 두 서버를 모두 띄움

```powershell
# 터미널 1 — Todo Web (포트 3000)
cd C:\todo\today\orchestrator\todo-web
npm install
npm start

# 터미널 2 — Requirements Web (포트 4000)
cd C:\todo\today\orchestrator\requirements-web
npm install
npm start
```

### 2. 브라우저로 접속

- **요구사항 입력**: http://localhost:4000
- **Todo Web 결과 확인**: http://localhost:3000

### 3. 요구사항 입력

http://localhost:4000 에서:
- `"다크모드 토글 버튼 추가해줘"` 입력 → 추가
- `"할일에 우선순위(priority) 필드 추가"` 입력 → 추가

→ `requirements/` 폴더에 `.json` 파일 2개 생성됨, 상태는 `pending`.

### 4. Claude에게 처리 요청

Claude Code 세션에서:
```
요구사항 처리해줘
```

→ Claude가 자동으로:
1. `requirement-handler` 호출 → 분류
2. 적절한 builder 병렬 호출 → 코드 수정
3. `requirements/*.json` 상태 갱신
4. `npm test` 회귀 확인
5. 보고

### 5. 결과 확인

- http://localhost:4000 → 5초 이내 ✅ 완료 상태로 표시
- http://localhost:3000 → 새 기능 반영됨 (다크모드 버튼, 우선순위 필드 등)
- `requirements/*.json` → `status: "done"`, `result: "..."` 기록됨

---

## 🧠 왜 이렇게 설계했나? — 4가지 핵심 결정

### 1. 큐를 **파일 시스템**으로 (DB 아님)
- Claude가 직접 Read/Edit/Glob으로 다룰 수 있음
- 별도 DB 설치·연결 불필요
- 사람도 텍스트 에디터로 확인·디버깅 가능

### 2. 처리는 **수동 트리거** (자동 X)
- 사용자가 "요구사항 처리해줘"라고 명시적으로 말함
- 이유: hook이나 watcher로 자동화하면 의도치 않은 코드 변경 발생 가능
- 데모 목적상 사용자 통제권을 우선

### 3. **별도 에이전트(`requirement-handler`)** 도입
- 메인 Claude가 직접 분류해도 되지만, 별도로 분리한 이유:
  - 책임 분리 (라우터 vs 빌더)
  - 메인 context 절약 (큐 파일들을 메인이 안 읽어도 됨)
  - 분류 로직이 복잡해지면 이 에이전트만 개선

### 4. **상태 갱신은 메인 Claude가 담당**
- `requirement-handler`는 읽기 전용
- builder들은 자기 영역(`todo-web/`)만 만짐
- `requirements/*.json` 갱신은 **메인의 책임** → 흐름이 명확

---

## 🎓 메인 Claude의 단일 응답 예시 (실제 호출 패턴)

```
[메인 Claude의 단일 응답 안에 들어가는 호출들]

# 1단계: requirement-handler 호출
Task(
  subagent_type: "requirement-handler",
  description: "큐 분석",
  prompt: "requirements/ 폴더의 pending 요구사항을 모두 분석하여
           각 요구사항의 카테고리와 담당 에이전트를 결정하세요."
)

→ 결과 받음:
   "REQ-1234 → frontend-builder, REQ-1235 → frontend+backend+test"

# 2단계: status 갱신 (Edit)
Edit("requirements/REQ-1234.json": "pending" → "in_progress")
Edit("requirements/REQ-1235.json": "pending" → "in_progress")

# 3단계: 다음 응답에서 builder들 병렬 호출 (한 메시지 안에서)
Task(frontend-builder, "REQ-1234: 다크모드 토글 추가...")
Task(frontend-builder, "REQ-1235: 검색 입력창 추가...")    ← 같은 에이전트 2번도 OK
Task(backend-builder, "REQ-1235: API에 ?q 쿼리 지원...")
Task(test-writer,     "REQ-1235: 검색 테스트 시나리오...")

→ 4개 작업 결과 받음

# 4단계: status 갱신
Edit("requirements/REQ-1234.json": "in_progress" → "done", result: "...")
Edit("requirements/REQ-1235.json": "in_progress" → "done", result: "...")

# 5단계: 회귀
Bash("cd todo-web && npm test")

# 6단계: 사용자 보고
"REQ-1234, REQ-1235 두 건 처리 완료. 회귀 7/7 통과."
```

---

## 🔁 응용 — 본인 프로젝트에 이 패턴 적용하기

이 구조는 **모든 "사용자 요청 → 자동 처리" 시스템**의 기반입니다:

### 응용 예시 A: 블로그 자동 발행
- 요구사항 Web: "이 주제로 글 써줘" 입력
- handler: "기술 글" / "여행 글" / "리뷰" 분류
- builder들: `tech-writer`, `travel-writer`, `review-writer` 등

### 응용 예시 B: 위키 자동 정리
- 요구사항 Web: "X 카드를 Y 폴더로 옮기고 link 갱신"
- handler: 카드/폴더/링크 작업으로 분해
- builder들: `card-mover`, `link-updater`, `index-rebuilder`

### 응용 예시 C: 데이터 마이그레이션
- 요구사항 Web: SQL 마이그레이션 요청
- handler: 스키마/데이터/인덱스 영향 분석
- builder들: `schema-migrator`, `data-mover`, `index-rebuilder`

**핵심 패턴**:
1. **입력 Web** = 사용자 진입점 (파일 큐로 저장)
2. **handler 에이전트** = 분류기 (코드 수정 X)
3. **builder 에이전트들** = 실제 구현 (영역별 분리)
4. **메인 Claude** = 지휘자 (handler→builder 라우팅 + 상태 갱신)

---

## ⚠️ 알려진 제약

- **큐 파일이 많아지면** requirement-handler의 1회 분석량 부담 → 50개 넘으면 배치 처리 권장
- **동시 처리 시 race condition**: 두 사용자가 동시에 "요구사항 처리해줘"라고 하면 status 충돌 가능 (데모는 단일 사용자 가정)
- **수동 트리거**: Claude 세션이 살아있어야 처리됨. 24/7 자동 처리는 별도 daemon 필요
- **회귀 실패 시 롤백 없음**: 현재는 status만 "done"으로 마킹, git 자동 되돌리기는 미구현

---

## 📚 참고 문서

- [HOW-IT-WORKS.md](./HOW-IT-WORKS.md) — 기본 오케스트레이터 원리 (먼저 읽기)
- [ORCHESTRATION-SCRIPT.md](./ORCHESTRATION-SCRIPT.md) — 메인 Claude의 호출 시퀀스 예시
- [CLAUDE.md](./CLAUDE.md) — 이 폴더의 작업 규칙 (Claude가 자동 로드)
- [.claude/agents/requirement-handler.md](./.claude/agents/requirement-handler.md) — 라우터 에이전트 정의
- [.claude/agents/](./.claude/agents/) — 5개 에이전트 전체 정의

---

## 🤖 자동 처리 모드 (B1 — Hook 방식) ✅ 활성화됨

이 프로젝트는 **Claude Code Hook**을 통해 요구사항 자동 처리가 활성화되어 있습니다.
사용자가 "요구사항 처리해줘"라고 명시적으로 말하지 않아도, 큐에 pending이 있으면 **자동으로** 처리됩니다.

### 동작 흐름

```
사용자가 4000번에 요구사항 입력
   ↓ requirements/REQ-*.json 생성 (status: pending)
   ↓
사용자가 Claude에게 아무 메시지나 보냄
   ↓ (예: "안녕", "지금 뭐해?", 또는 새 요구사항 처리 의도가 없는 어떤 말이라도)
   ↓
[UserPromptSubmit hook 자동 실행]
   ↓ node .claude/hooks/scan-requirements.js
   ↓ pending 감지 → JSON 출력으로 처리 지시 주입
   ↓
Claude가 자동으로 CLAUDE.md 6단계 처리 시작
   ↓
todo-web 반영 + requirements-web ✅ 표시
```

또는:
```
사용자가 큐에 요구사항을 쌓아둔 채 세션 종료 → 나중에 새 세션 시작
   ↓
[SessionStart hook 자동 실행]
   ↓ pending 감지 → 동일하게 자동 처리 지시 주입
   ↓
세션 시작 직후 Claude가 자동으로 처리
```

### 등록된 Hook

`.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      { "matcher": "",
        "hooks": [{ "type": "command",
                    "command": "node \"${CLAUDE_PROJECT_DIR}/.claude/hooks/scan-requirements.js\"" }] }
    ],
    "UserPromptSubmit": [
      { "matcher": "",
        "hooks": [{ "type": "command",
                    "command": "node \"${CLAUDE_PROJECT_DIR}/.claude/hooks/scan-requirements.js\"" }] }
    ]
  }
}
```

### Hook 스크립트 (`.claude/hooks/scan-requirements.js`)

**동작 규약**:
1. `requirements/REQ-*.json` 전체 스캔
2. `status === "pending"` 인 것만 필터
3. **0건**: stdout 빈 출력 → Claude에게 아무 영향 없음 (조용)
4. **1건 이상**: JSON 출력 → `hookSpecificOutput.additionalContext`로 처리 지시 자동 주입

```javascript
// pending 발견 시 출력
{
  "hookSpecificOutput": {
    "additionalContext": "🔔 [AUTO-DETECTED] 요구사항 N건 발견. CLAUDE.md 6단계 절차대로 처리하세요..."
  }
}
```

### 왜 두 hook을 함께 등록했나?

| Hook | 트리거 | 용도 |
|---|---|---|
| `SessionStart` | 세션 시작 (startup/resume/clear/compact) | 이전 세션 종료 후 쌓인 요구사항을 새 세션 시작 시 즉시 인지 |
| `UserPromptSubmit` | 매 사용자 입력 직전 | 세션 중 새로 들어온 요구사항을 다음 메시지에서 즉시 인지 |

→ 두 hook이 합쳐서 **놓치는 타이밍 없음**.

### Hook 비활성화·일시 정지

```powershell
# 임시 비활성화 — settings.json을 다른 이름으로 변경
mv .claude/settings.json .claude/settings.json.bak

# 다시 활성화
mv .claude/settings.json.bak .claude/settings.json
```

또는 `update-config` skill로 토글.

### 주의사항

- **처리 의도가 없는 메시지도 트리거됨**: 예를 들어 "안녕"이라고 해도 pending이 있으면 Claude가 처리에 들어감 → 의도적인 설계 (사용자 통제권은 큐에 요구사항을 넣지 않음으로 확보)
- **무한 루프 방지**: hook은 Claude 메시지가 아닌 사용자 입력 직전에만 실행되므로 안전. 처리 완료 후 status가 done이 되면 다음 hook 호출에서 자동으로 조용해짐
- **세션이 살아있어야 함**: B1은 Claude Code 세션 내에서만 동작. 24/7 자동화는 B2(파일 watcher) 필요

---

## 🎯 다음 단계 제안

추가로 발전시킬 부분:
1. **요구사항 검증**: handler가 "불가능한 요구사항"을 식별·반려 (status: `rejected`)
2. **이력 관리**: done 상태 .json을 `requirements/archive/`로 자동 이동
3. **다중 프로젝트**: 한 requirements-web이 여러 타겟 프로젝트(todo-web, blog-web 등)에 라우팅
4. **B2 보강**: 24/7 동작이 필요하면 파일 watcher 데몬 추가 (Claude CLI 호출 권한 관리 필요)
