# 📝 Todo Web

> Claude Code의 **오케스트레이터 패턴**으로 4개 서브에이전트가 협업하여 만든 Todo Web 데모

---

## 🚀 빠른 시작

```powershell
npm install
npm start
# → http://localhost:3000
```

테스트:
```powershell
npm test
```

---

## ✨ 기능

- ✅ 할일 추가 / 완료 / 삭제
- ✅ 카운터 (전체 / 완료)
- ✅ 반응형 디자인 (모바일·데스크탑)
- ✅ 키보드 단축키 (Enter로 추가)
- ✅ 접근성 (aria-label)

---

## 📁 프로젝트 구조

```
todo-web/
├── server.js           ← Express 서버 (backend-builder)
├── package.json
├── test.js             ← API 통합 테스트 (test-writer)
├── public/
│   ├── index.html      ← UI (frontend-builder)
│   ├── style.css       ← 스타일 (frontend-builder)
│   └── app.js          ← 프론트엔드 로직 (frontend-builder)
└── README.md           ← 이 파일 (doc-writer)
```

---

## 🔌 API 명세

| Method | Path | Body | Response |
|---|---|---|---|
| GET | `/api/todos` | — | `[{id, text, done}, ...]` |
| POST | `/api/todos` | `{text: string}` | `201 {id, text, done: false}` |
| PUT | `/api/todos/:id` | `{done?: bool, text?: string}` | `{id, text, done}` |
| DELETE | `/api/todos/:id` | — | `204 No Content` |

**에러**:
- `400` — 잘못된 입력 (예: 빈 text)
- `404` — 존재하지 않는 id

---

## 🧪 테스트

7개 시나리오를 검증합니다:
1. GET 빈 목록
2. POST 추가
3. GET 추가 확인
4. PUT 토글
5. DELETE 삭제
6. GET 삭제 확인
7. POST 잘못된 입력 → 400

```powershell
npm test
```

서버는 테스트용 포트 **3100**에서 자동 기동·종료됩니다 (개발 서버와 충돌하지 않음).

---

## ⚙️ 설정

- **포트 변경**: `PORT=8080 npm start` (PowerShell: `$env:PORT=8080; npm start`)
- **요구 환경**: Node.js 14 이상

---

## ⚠️ 알려진 제약사항

- **데이터는 메모리 저장** — 서버 재시작 시 모든 todo가 사라집니다.
- **인증 없음** — 데모용. 프로덕션에서는 인증 미들웨어가 필요합니다.
- **단일 사용자 가정** — 동시 접속 시 race condition 가능성 있음.

---

## 🤖 이 프로젝트의 의의

이 Todo Web은 **Claude Code의 오케스트레이터 패턴**을 보여주기 위한 데모입니다.
메인 Claude 인스턴스가 직접 코드를 작성하는 대신, **4개의 전문 서브에이전트**에게 작업을 분배했습니다:

| 에이전트 | 담당 파일 |
|---|---|
| `frontend-builder` | `public/index.html`, `public/style.css`, `public/app.js` |
| `backend-builder` | `server.js`, `package.json` |
| `test-writer` | `test.js` |
| `doc-writer` | `README.md` (이 파일) |

4개 에이전트는 **한 메시지 안에서 병렬로 호출**되어 동시에 작업을 진행했고,
메인 Claude는 결과를 통합·검증했습니다.

오케스트레이터의 동작 원리는 상위 폴더의 [`HOW-IT-WORKS.md`](../HOW-IT-WORKS.md)를 참조하세요.

---

Made with ❤️ by 4 Claude subagents.
