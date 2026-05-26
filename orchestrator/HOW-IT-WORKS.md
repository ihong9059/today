# 🔬 오케스트레이터 동작 원리 (상세 해설)

## 1. 무엇이 "오케스트레이터"인가?

**오케스트레이터 = 메인 Claude 인스턴스**가 직접 일하지 않고, **여러 서브에이전트**에게 작업을 분배·조율하는 패턴입니다.

오케스트라 지휘자에 비유:
- 지휘자(메인 Claude) → 악보(요구사항)를 읽고 → 각 악기(서브에이전트)에게 신호
- 바이올린(frontend) + 첼로(backend) + 드럼(test) + 플루트(doc)이 **동시에 연주**
- 각자 자기 파트만 알면 됨, 전체 곡은 지휘자가 책임

---

## 2. 왜 이 패턴을 쓰는가?

### A. Context window 보존
- 메인 Claude가 직접 코드를 다 읽으면 → context가 빠르게 소진됨
- 서브에이전트는 **독립 context**에서 실행 → 메인에는 **요약 결과만** 반환
- 결과: 메인이 큰 그림을 유지하면서도 깊은 작업 가능

### B. 병렬 처리 (시간 절약)
- 한 메시지에 여러 `Task` 호출을 넣으면 → **동시 실행**
- 예: frontend + backend + test 작성을 동시에 → 3배 빠름

### C. 전문화 (품질 향상)
- 각 에이전트는 좁은 영역에 집중 → 더 정확한 결과
- 도구 제한(예: test-writer는 Write만)으로 실수 방지

---

## 3. 실제 동작 흐름 (Todo Web 예제 기준)

### 🎬 시나리오: 사용자가 "Todo Web 만들어줘"라고 요청

```
[사용자]
  │ "Todo Web 만들어줘"
  ▼
┌─────────────────────────────────────────────────┐
│  메인 Claude (오케스트레이터)                    │
│  ─ 요구사항 분석                                  │
│  ─ 4개 서브에이전트로 분해                        │
│  ─ 의존성 파악: backend ← frontend, test, doc    │
└─────────────────────────────────────────────────┘
                    │
       ┌────────────┼────────────┬───────────────┐
       │            │            │               │
       ▼ (병렬)     ▼ (병렬)     ▼ (병렬)        ▼ (병렬)
  ┌─────────┐  ┌─────────┐  ┌─────────┐    ┌─────────┐
  │frontend │  │backend  │  │test     │    │doc      │
  │-builder │  │-builder │  │-writer  │    │-writer  │
  │         │  │         │  │         │    │         │
  │HTML/CSS │  │Express  │  │API 테스트│    │README   │
  │/JS 작성  │  │+ CRUD   │  │ 작성    │    │작성     │
  └─────────┘  └─────────┘  └─────────┘    └─────────┘
       │            │            │               │
       └────────────┴────────────┴───────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────┐
│  메인 Claude: 결과 통합                          │
│  ─ 4개 결과 검토                                  │
│  ─ npm install + npm start로 검증                │
│  ─ 사용자에게 완성 보고                          │
└─────────────────────────────────────────────────┘
```

---

## 4. 메인 Claude의 실제 호출 코드

오케스트레이터가 한 메시지에서 **4개 Task를 병렬 호출**하는 패턴:

```javascript
// 의사 코드 — 메인 Claude의 단일 응답 안에 들어가는 호출
[
  Task({
    subagent_type: "frontend-builder",
    description: "Todo UI 작성",
    prompt: "todo-web/public/ 에 index.html, style.css, app.js를 작성하세요.
             요구사항: 입력창 + 추가 버튼 + 목록 + 완료 체크 + 삭제..."
  }),
  Task({
    subagent_type: "backend-builder",
    description: "Express API 작성",
    prompt: "todo-web/ 에 server.js와 package.json을 작성하세요.
             요구사항: GET/POST/PUT/DELETE /api/todos, 메모리 저장..."
  }),
  Task({
    subagent_type: "test-writer",
    description: "API 통합 테스트",
    prompt: "todo-web/test.js 에 API 테스트를 작성하세요..."
  }),
  Task({
    subagent_type: "doc-writer",
    description: "README 문서화",
    prompt: "todo-web/README.md 에 사용법 문서를 작성하세요..."
  })
]
```

이 **단일 메시지에 4개 Task** → Claude Code 런타임이 **자동으로 병렬 실행**.

---

## 5. 서브에이전트 정의 파일의 구조

`.claude/agents/frontend-builder.md` 예시:

```markdown
---
name: frontend-builder              ← 호출 식별자
description: HTML/CSS/JS UI 작성    ← 언제 호출될지 (자동 매칭에 사용)
tools: Read, Write, Edit            ← 허용 도구만 (보안·실수 방지)
model: sonnet                       ← 비용·품질 균형
---

당신은 프론트엔드 빌더입니다. 다음 규칙을 따르세요:
- vanilla JS만 사용 (프레임워크 X)
- 반응형 CSS
- 접근성 고려 (aria-label)
...
```

**핵심 필드 4가지**:
1. `name` — 메인이 호출할 때 쓰는 이름
2. `description` — 메인이 "이 작업은 누구한테 줄까?"를 판단하는 단서
3. `tools` — 도구 제한 (없으면 모든 도구 사용 가능)
4. `model` — `haiku`(빠름·저비용) / `sonnet`(균형) / `opus`(품질) / `inherit`(메인과 같음)

---

## 6. 의존성 처리 — 병렬 불가능한 경우

이 예제는 4개를 전부 병렬로 돌리지만, 실제로는 **의존성**이 있는 경우 순차 실행:

```
[사용자 요청]
   │
   ▼
[1단계] backend-builder  ← API 스펙 먼저 확정
   │
   ▼
[2단계] frontend-builder + test-writer  ← 병렬 (둘 다 API 스펙 필요)
   │
   ▼
[3단계] doc-writer  ← 모든 결과를 받아 문서화
```

**판단 기준**:
- A의 결과가 B의 입력으로 필요? → 순차
- 서로 무관? → 병렬

---

## 7. CLAUDE.md의 역할

`CLAUDE.md`는 **이 폴더에서 작업할 때 메인 Claude가 자동으로 읽는 규칙**입니다.

```markdown
# 이 프로젝트의 오케스트레이션 규칙

todo-web 관련 요청 시:
1. 4개 서브에이전트 병렬 호출
2. 각자 자기 파일만 수정 (충돌 방지)
3. 메인은 통합 검증만
```

→ 이 규칙이 없으면 메인 Claude가 직접 코드를 쓸 수 있음.
→ 규칙이 있으면 "아, 이 작업은 서브에이전트에게 위임해야지"라고 판단.

---

## 8. 비용 최적화 전략

| 작업 유형 | 추천 모델 | 이유 |
|---|---|---|
| 탐색·검색·분석 | `haiku` | 빠르고 저렴, 정확도 충분 |
| 일반 코드 작성 | `sonnet` | 품질과 비용의 균형 |
| 복잡한 설계·디버깅 | `opus` | 최고 품질 필요 |
| 단순 문서 작성 | `haiku` | 텍스트 생성은 가벼움 |

**이 예제의 선택**:
- `frontend-builder`, `backend-builder` → `sonnet` (코드 품질 중요)
- `test-writer`, `doc-writer` → `haiku` (반복적 작업)

---

## 9. 검증 — 실제로 동작하는가?

이 예제는 **실제로 구동**됩니다:

```powershell
cd C:\todo\today\orchestrator\todo-web
npm install        # express만 설치 (~5초)
npm start          # localhost:3000
npm test           # API 테스트 실행
```

브라우저에서 직접 Todo를 추가/완료/삭제할 수 있고,
서버는 메모리에 데이터를 유지합니다.

---

## 10. 다음 단계 — 직접 응용하기

이 패턴을 **본인 프로젝트에 적용**하려면:

1. `.claude/agents/` 폴더에 본인의 서브에이전트 정의
2. `CLAUDE.md`에 오케스트레이션 규칙 작성
3. 메인 Claude에게 "X를 만들어줘"라고 요청 → 자동으로 서브에이전트 분배

**예시 응용**:
- 블로그 시스템: `post-writer` + `comment-handler` + `admin-builder`
- 데이터 파이프라인: `extractor` + `transformer` + `loader` + `validator`
- 위키 자동화: `card-creator` + `link-resolver` + `index-updater`

---

## 📚 더 알아보기

- 공식 문서: https://docs.claude.com/en/docs/claude-code/sub-agents
- GSD 명령들(`/gsd:plan-phase` 등)이 이 패턴의 실전 예시
- 이 환경의 `.claude/agents/` 폴더에도 다양한 에이전트 정의가 있음
