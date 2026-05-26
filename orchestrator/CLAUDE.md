# Todo Web 오케스트레이션 규칙

이 폴더는 **오케스트레이터 패턴의 데모 프로젝트**입니다.
**5개 서브에이전트**가 협업하여 사용자 요구사항을 받아 `todo-web/`에 반영합니다.

---

## 🎯 두 가지 진입점

### 진입점 A. 직접 명령
사용자: "todo-web에 X 기능 추가해줘"
→ 메인이 곧바로 적절한 builder 에이전트 병렬 호출

### 진입점 B. 요구사항 큐 처리 (NEW)
사용자가 `requirements-web` (포트 4000)에 요구사항을 입력 →
`requirements/REQ-*.json` 파일로 누적 →
사용자가 Claude에게 **"요구사항 처리해줘"** / **"요구사항 반영해줘"** / **"requirement 처리"** 등을 말하면:

```
[1단계] Task(requirement-handler)
  ↓ pending 요구사항 분석 + 카테고리 분류 + 담당 에이전트 결정
[2단계] requirements/ 폴더의 해당 요구사항 status → "in_progress" 갱신
  ↓ Edit으로 .json 파일 수정
[3단계] 분류 결과에 따라 적절한 builder들을 한 메시지에서 병렬 호출
  ↓ Task(frontend-builder), Task(backend-builder), Task(test-writer), Task(doc-writer)
[4단계] 결과 통합 후 requirements/*.json status → "done" + result 기록
[5단계] todo-web에서 npm test 실행하여 회귀 확인
[6단계] 사용자에게 처리된 요구사항 목록 보고
```

---

## 작업 정책

`todo-web/` 관련 요청이 들어오면:

1. **메인 Claude는 직접 코드를 쓰지 않는다.** `.claude/agents/`의 서브에이전트에게 위임한다.
2. **병렬 가능한 작업은 한 메시지에 묶는다.** 단일 응답 내에서 여러 Task 호출 = 자동 병렬 실행.
3. **각 에이전트는 자기 영역만 만진다** (파일 충돌 방지):
   - `frontend-builder` → `todo-web/public/*`
   - `backend-builder` → `todo-web/server.js`, `todo-web/package.json`
   - `test-writer` → `todo-web/test.js`
   - `doc-writer` → `todo-web/README.md`
   - `requirement-handler` → **읽기 전용** (분류·라우팅만, 코드 수정 ❌)
4. **메인 Claude의 역할**:
   - 요구사항 분석·라우팅 (또는 requirement-handler에게 위임)
   - Task 병렬 호출
   - `requirements/*.json` 상태 갱신 (pending → in_progress → done)
   - 결과 통합·검증 (`npm test`)
   - 사용자 보고

---

## 서브에이전트 매핑

| 키워드 / 의도 | 호출할 에이전트 |
|---|---|
| **"요구사항 처리"**, **"requirement 반영"**, **"큐 처리"** | `requirement-handler` (첫 단계) → 결과에 따라 아래 |
| UI, HTML, 화면, 스타일, 다크모드, 검색창, 정렬 UI | `frontend-builder` |
| 서버, API, 백엔드, Express, 필드 추가, 정렬 로직 | `backend-builder` |
| 테스트, 검증, QA | `test-writer` |
| 문서, README, 설명 | `doc-writer` |

---

## 요구사항 큐 처리 — 메인 Claude의 의무 절차

사용자가 "요구사항 처리해줘"라고 하면 **이 순서대로**:

### Step 1. requirement-handler 호출
```
Task(
  subagent_type: "requirement-handler",
  description: "요구사항 큐 분석",
  prompt: "requirements/ 폴더의 pending 요구사항을 모두 분석하여
           각각의 카테고리와 담당 에이전트를 결정하고 보고하세요."
)
```

### Step 2. 결과 받아 status 갱신
받은 분류 결과를 바탕으로 처리할 각 요구사항 .json 파일을 **Edit**으로:
- `"status": "pending"` → `"status": "in_progress"`
- `"category"`, `"assignedAgents"` 채움

### Step 3. 분류 결과에 따라 builder 병렬 호출
한 메시지 안에서 필요한 만큼 Task 호출:
```
Task(frontend-builder, "REQ-XXX 구현: ...")
Task(backend-builder, "REQ-XXX 구현: ...")
Task(test-writer, "REQ-XXX 테스트: ...")
```

### Step 4. 완료 후 status → "done"
각 처리된 .json을 다시 Edit:
- `"status": "in_progress"` → `"status": "done"`
- `"result"`: 처리 요약 한 줄
- `"completedAt"`: 현재 ISO 시각

### Step 5. 회귀 검증
```
Bash("cd todo-web && npm test")
```

### Step 6. 사용자 보고
처리한 요구사항 N건, 호출한 에이전트, 회귀 테스트 결과를 요약하여 보고.

---

## 금지 사항

- 메인 Claude가 `todo-web/` 내부 파일을 **직접** 작성·수정하지 말 것
- 서브에이전트끼리 다른 에이전트의 영역을 침범하지 말 것
- 의존성 없는 작업을 **순차로** 실행하지 말 것 (반드시 병렬)
- `requirement-handler`가 `todo-web/` 코드를 수정하지 말 것 (라우터 역할만)
- 요구사항 처리 시 status 갱신을 빠뜨리지 말 것 (사용자가 Web에서 진행 상황을 봄)
