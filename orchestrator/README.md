# 🎯 Claude Code 오케스트레이터 — Todo Web 완성 예제

이 폴더는 **Claude Code의 오케스트레이터 패턴**을 실제로 보여주는 완전한 예제입니다.
**5개의 서브에이전트가 협업**하여 Todo Web을 만들고, 사용자 요구사항을 자동 반영합니다.

---

## 📁 폴더 구조

```
orchestrator/
├── README.md                    ← 이 파일 (전체 안내)
├── HOW-IT-WORKS.md             ← 동작 원리 상세 해설
├── HOW-REQUIREMENTS-WORK.md    ← 🆕 요구사항 처리 파이프라인 설명서
├── ORCHESTRATION-SCRIPT.md     ← 메인 Claude의 실행 시나리오
├── CLAUDE.md                   ← 오케스트레이션 규칙 (Claude Code가 자동 로드)
├── .claude/
│   └── agents/                 ← 서브에이전트 정의 (5개)
│       ├── requirement-handler.md  ← 🆕 요구사항 라우터
│       ├── frontend-builder.md
│       ├── backend-builder.md
│       ├── test-writer.md
│       └── doc-writer.md
├── requirements-web/           ← 🆕 요구사항 입력 Web (포트 4000)
│   ├── server.js
│   ├── package.json
│   └── public/{index.html, style.css, app.js}
├── requirements/               ← 🆕 요구사항 큐 (REQ-*.json)
└── todo-web/                   ← 실제 완성된 결과물 (포트 3000)
    ├── server.js               ← Express 백엔드
    ├── package.json
    ├── public/{index.html, style.css, app.js}
    ├── test.js
    └── README.md
```

---

## 🚀 빠른 시작 — 두 서버 동시 구동

```powershell
# 터미널 1 — Todo Web (결과물)
cd C:\todo\today\orchestrator\todo-web
npm install
npm start
# → http://localhost:3000

# 터미널 2 — Requirements Web (요구사항 입력)
cd C:\todo\today\orchestrator\requirements-web
npm install
npm start
# → http://localhost:4000
```

테스트:
```powershell
cd C:\todo\today\orchestrator\todo-web
npm test
```

---

## 🎬 사용 시나리오 (자동 처리 모드 — B1 활성화됨 ✅)

1. **http://localhost:4000** 접속 → "다크모드 추가해줘" 같은 요구사항 입력
2. Claude에게 **아무 메시지나** 보냄 (예: "안녕", 또는 다른 작업 요청 — 처리 지시 명시 불필요!)
3. **Hook이 자동으로 큐를 감지** → Claude에게 처리 지시 주입 → 자동 처리 시작
4. `requirement-handler` 분류 → 적절한 builder들 병렬 호출
5. **http://localhost:3000** 에서 결과 반영 확인 + 요구사항 Web에서 ✅ 완료 상태 자동 표시

> 🤖 **자동화 방식**: `.claude/settings.json`에 `SessionStart` + `UserPromptSubmit` hook 등록.
> `node .claude/hooks/scan-requirements.js`가 pending을 감지하면 Claude에게 처리 지시를 자동 주입.

---

## 🎓 학습 순서

1. **[HOW-IT-WORKS.md](./HOW-IT-WORKS.md)** ← 먼저 읽기. 오케스트레이터의 기본 원리
2. **[HOW-REQUIREMENTS-WORK.md](./HOW-REQUIREMENTS-WORK.md)** ← 🆕 요구사항 처리 파이프라인 (이 확장)
3. **[CLAUDE.md](./CLAUDE.md)** ← Claude Code가 자동 로드하는 규칙
4. **[.claude/agents/*.md](./.claude/agents/)** ← 5개 서브에이전트 정의
5. **[ORCHESTRATION-SCRIPT.md](./ORCHESTRATION-SCRIPT.md)** ← 메인 Claude의 호출 시퀀스
6. **[todo-web/](./todo-web/)** ← 결과물 / **[requirements-web/](./requirements-web/)** ← 입력 진입점

---

## 🤖 5개 서브에이전트의 역할

| 에이전트 | 역할 | 도구 | 모델 |
|---|---|---|---|
| `requirement-handler` 🆕 | 요구사항 분류·라우팅 (read-only) | Read, Glob, Bash | sonnet |
| `frontend-builder` | HTML/CSS/JS UI 작성 | Read, Write, Edit | sonnet |
| `backend-builder` | Express 서버 + API 작성 | Read, Write, Edit, Bash | sonnet |
| `test-writer` | 통합 테스트 작성 | Read, Write, Bash | haiku |
| `doc-writer` | README + 사용법 문서화 | Read, Write | haiku |

---

## 💡 핵심 원리 (한 줄 요약)

> **메인 Claude는 "지휘자"** — 직접 코드를 안 쓰고, 5개 서브에이전트에게 작업을 분배한다.
> 사용자가 요구사항 Web에 입력 → `requirement-handler`가 분류 → builder들이 병렬로 구현.
> **병렬 가능한 작업은 한 메시지에 여러 Task로 묶어서** 동시 실행 → 시간 절약 + context 보존.

자세한 내용:
- 기본 원리 → [HOW-IT-WORKS.md](./HOW-IT-WORKS.md)
- 요구사항 처리 파이프라인 → [HOW-REQUIREMENTS-WORK.md](./HOW-REQUIREMENTS-WORK.md)
