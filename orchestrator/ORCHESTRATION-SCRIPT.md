# 🎬 오케스트레이션 실행 시나리오

이 문서는 **메인 Claude가 사용자 요청을 받고 → 4개 서브에이전트를 호출하여 → 결과를 통합**하는
실제 흐름을 단계별로 보여줍니다.

---

## 🎯 시나리오: 사용자가 "Todo Web 만들어줘"라고 요청

### Step 0 — 사용자 입력

```
User: "todo web을 만들어줘. Express + vanilla JS로,
       추가/완료/삭제 기능, API 테스트, README까지 포함해서."
```

---

### Step 1 — 메인 Claude의 분석 (내부 thinking)

```
요구사항 분해:
1. 프론트엔드 (HTML/CSS/JS) — UI
2. 백엔드 (Express) — API + 정적 파일 서빙
3. 테스트 (API 통합 테스트)
4. 문서 (README)

의존성 분석:
- frontend는 backend의 API 스펙을 알아야 함 → CLAUDE.md에 스펙 명시되어 있음
- 4개 작업이 서로 다른 파일 → 충돌 없음 → 전부 병렬 가능 ✅

→ 결론: 4개 서브에이전트를 한 메시지에서 병렬 호출
```

---

### Step 2 — 메인 Claude의 단일 응답 (4개 Task 병렬 호출)

```
[메인 Claude 응답 — 한 메시지 안에 4개 Task]

Task(
  subagent_type: "frontend-builder",
  description: "Todo UI 작성",
  prompt: "todo-web/public/ 폴더에 index.html, style.css, app.js를
           작성하세요. API는 /api/todos 사용. 입력창+추가버튼+목록+체크박스+삭제버튼.
           카운터(전체/완료) 포함. 반응형, 접근성 준수."
)

Task(
  subagent_type: "backend-builder",
  description: "Express API 작성",
  prompt: "todo-web/ 에 server.js, package.json을 작성하세요.
           express 4.x, 메모리 저장, 정적 파일 서빙(public/).
           엔드포인트: GET/POST/PUT/DELETE /api/todos.
           포트 3000 (PORT 환경변수 지원). 잘못된 입력 400, 없는 id 404."
)

Task(
  subagent_type: "test-writer",
  description: "API 통합 테스트",
  prompt: "todo-web/test.js 를 작성하세요. Node 내장 http+assert만 사용.
           server.js를 child_process로 띄우고, 시나리오 6+1개 검증
           (GET/POST/GET/PUT/DELETE/GET + 잘못된 입력 400).
           테스트용 포트 3100. 성공 시 exit 0, 실패 시 exit 1."
)

Task(
  subagent_type: "doc-writer",
  description: "README 작성",
  prompt: "todo-web/README.md 를 작성하세요. 빠른 시작, 기능, 구조,
           API 명세, 테스트 방법, 제약사항, 4개 서브에이전트 크레딧 포함.
           친근한 톤, 한국어."
)
```

**핵심**: 위 4개 Task가 **동일한 응답 블록 안에** 있으므로,
Claude Code 런타임이 자동으로 **병렬 실행**합니다.

---

### Step 3 — 각 서브에이전트의 독립 작업 (동시 진행)

```
┌─ frontend-builder (sonnet) ─────────────────────┐
│ 1. CLAUDE.md 읽기 → API 스펙 확인               │
│ 2. public/index.html 작성                        │
│ 3. public/style.css 작성                         │
│ 4. public/app.js 작성                            │
│ 5. 결과 보고: "3개 파일 생성, 모든 기능 구현"   │
└─────────────────────────────────────────────────┘

┌─ backend-builder (sonnet) ──────────────────────┐
│ 1. CLAUDE.md 읽기 → 엔드포인트 명세 확인        │
│ 2. server.js 작성 (express + 4개 라우트)        │
│ 3. package.json 작성                             │
│ 4. 결과 보고: "서버 + 4개 API 엔드포인트 완성"  │
└─────────────────────────────────────────────────┘

┌─ test-writer (haiku) ───────────────────────────┐
│ 1. test.js 작성 (http + spawn + assert)         │
│ 2. 7개 시나리오 구현                             │
│ 3. 결과 보고: "7개 테스트 케이스 작성 완료"     │
└─────────────────────────────────────────────────┘

┌─ doc-writer (haiku) ────────────────────────────┐
│ 1. README.md 작성                                │
│ 2. 7개 섹션 (빠른시작/기능/구조/API/테스트/제약/크레딧)  │
│ 3. 결과 보고: "README 작성 완료"                │
└─────────────────────────────────────────────────┘
```

---

### Step 4 — 메인 Claude의 통합 검증

```
[메인 Claude 다음 응답]

받은 결과 4건 검토:
✅ frontend-builder: 3개 파일 OK
✅ backend-builder: server.js + package.json OK
✅ test-writer: test.js OK
✅ doc-writer: README.md OK

검증 명령 실행:
  Bash("cd todo-web && npm install")  → ✓
  Bash("cd todo-web && npm test")     → ✓ 7/7 passed

사용자에게 보고:
"4개 서브에이전트가 협업하여 Todo Web을 완성했습니다.
 npm start로 http://localhost:3000 에서 확인 가능합니다."
```

---

## 🔑 이 흐름이 가능한 이유

### 1. **CLAUDE.md가 규칙을 정의**
메인 Claude가 자동으로 읽음 → "이 폴더에서는 직접 코드 쓰지 말고 서브에이전트에게 위임"이라는 정책 인식.

### 2. **`.claude/agents/` 폴더의 정의 파일**
각 서브에이전트의 `description`이 메인의 라우팅 판단 근거.

### 3. **단일 응답 내 다중 Task 호출 = 병렬 실행**
Claude Code 런타임의 기본 동작. 명시적 동기화 코드 불필요.

### 4. **파일 분리로 충돌 방지**
각 에이전트가 다른 파일을 만짐 → 동시 실행해도 race condition 없음.

---

## 💡 응용 — 다른 프로젝트에 적용하려면

### A. 의존성이 있는 경우 (순차 + 병렬 혼합)

예: **데이터 마이그레이션 도구**
```
[1단계] schema-analyzer 단독       ← 스키마 먼저 파악
   ↓ (결과 → 다음 단계 입력)
[2단계] migration-writer + validator-writer 병렬
   ↓ (결과 → 다음 단계 입력)
[3단계] doc-writer 단독            ← 모든 결과 보고 문서화
```

### B. 동적 라우팅

```
User: "이 버그를 디버깅해줘"
  ↓
메인이 description 매칭:
  - 프론트 버그면 frontend-debugger 호출
  - API 버그면 backend-debugger 호출
  - DB 이슈면 db-inspector 호출
```

### C. 다단계 검증

```
[작성자] code-writer
  ↓
[검토자] code-reviewer   ← 다른 에이전트가 결과 검토
  ↓
[수정자] code-fixer      ← 검토 결과 반영
```

---

## 📚 더 읽기

- [HOW-IT-WORKS.md](./HOW-IT-WORKS.md) — 동작 원리 상세
- [CLAUDE.md](./CLAUDE.md) — 이 프로젝트의 규칙
- [.claude/agents/](./.claude/agents/) — 4개 에이전트 정의
- [todo-web/](./todo-web/) — 완성된 결과물
