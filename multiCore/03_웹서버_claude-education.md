# 웹 서버 (claude-education) 상세

> /opt/claude-education 에 구축된 Express 기반 웹 터미널 서버

---

## 1. 개요

| 항목 | 값 |
|------|---|
| 경로 | /opt/claude-education |
| 소유자 | uttec |
| 프레임워크 | Express.js v5.2.1 |
| 포트 | 3000 |
| 방식 | REST API (`claude -p` 비대화형) |
| 상태 | 설치 완료, 수동 실행 (systemd 미등록) |

---

## 2. 디렉토리 구조

```
/opt/claude-education/
├── server.js              # 메인 서버
├── package.json           # npm 설정
├── package-lock.json
├── node_modules/          # 의존성 (express만)
└── public/
    ├── index.html         # 학생 선택 페이지 (메인)
    └── student.html       # 학생별 채팅 터미널 페이지
```

---

## 3. server.js 분석

### 전체 코드

```javascript
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 학생 페이지 라우팅
app.get('/s/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'student.html'));
});

// Claude 질문 API
app.post('/api/ask', (req, res) => {
  const { student, prompt } = req.body;
  if (!student || !prompt) return res.status(400).json({ error: 'missing' });
  const core = parseInt(student.replace('student', ''));
  if (core < 1 || core > 3) return res.status(400).json({ error: 'invalid' });

  const safe = prompt.replace(/\\/g, '\\\\').replace(/'/g, "'\"'\"'");
  const cmd = 'HOME=/home/' + student + " claude -p '" + safe + "' < /dev/null";
  const child = spawn('taskset', ['-c', String(core), 'su', '-s', '/bin/bash',
                       student, '-c', cmd], {
    cwd: '/home/' + student + '/workspace',
    timeout: 120000,  // 2분 타임아웃
  });

  let out = '', err = '';
  child.stdout.on('data', d => { out += d; });
  child.stderr.on('data', d => { err += d; });
  child.on('close', code => {
    res.json({ output: out.trim(), error: code !== 0 ? err.trim() : '',
               code, core, student });
  });
  child.on('error', e => { res.status(500).json({ error: e.message }); });
});

// 리셋 API (미구현, 더미)
app.post('/api/reset', (req, res) => { res.json({ ok: true }); });

app.listen(3000, '0.0.0.0', () => { console.log('Server on 3000'); });
```

### 동작 방식

1. 학생이 웹 브라우저에서 질문 입력
2. `POST /api/ask`로 `{student, prompt}` 전송
3. 서버에서 `taskset -c N su - studentN -c "claude -p '질문'"` 실행
4. Claude의 stdout 출력을 수집하여 JSON으로 응답
5. **비대화형** — 매 질문마다 새 Claude 프로세스 생성 (대화 맥락 미유지)

### 한계점

| 한계 | 설명 |
|------|------|
| 비대화형 | `claude -p`는 1회성 질문-응답, 이전 대화 맥락 없음 |
| 응답 지연 | Claude 프로세스 시작 + API 호출 + 응답 대기 = 수십 초 |
| 동시성 문제 | 같은 학생이 연속 질문 시 프로세스 충돌 가능 |
| 보안 | prompt를 shell 명령으로 전달 — 이스케이프 불완전 시 인젝션 위험 |
| 리셋 | `/api/reset`은 더미 (실제 기능 없음) |

---

## 4. index.html (메인 페이지)

### UI 구성

```
┌─────────────────────────────────────────┐
│     UTTEC Claude Education              │
│     Odroid C2 Multi-Core Claude Terminal │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │ Core 1   │ │ Core 2   │ │ Core 3   ││
│  │Student 1 │ │Student 2 │ │Student 3 ││
│  │Click to  │ │Click to  │ │Click to  ││
│  │enter     │ │enter     │ │enter     ││
│  └──────────┘ └──────────┘ └──────────┘│
└─────────────────────────────────────────┘
```

- 다크 테마 (#0f0f23 배경)
- 그래디언트 제목 (보라색 계열)
- 카드 UI로 학생 3명 선택
- 클릭 시 `/s/1`, `/s/2`, `/s/3`으로 이동

### 디자인 특징

- CSS-only 애니메이션 (hover 시 카드 상승)
- 외부 라이브러리 없음 (순수 HTML/CSS)
- 반응형 레이아웃 (flex-wrap)

---

## 5. student.html (터미널 페이지)

### UI 구성

```
┌─────────────────────────────────────────┐
│ Student 1 (Core 1)              [Back]  │
├─────────────────────────────────────────┤
│                                         │
│  Claude Code ready.                     │
│                                         │
│  > 사용자 질문                           │
│                                         │
│  Claude 응답...                          │
│                                         │
├─────────────────────────────────────────┤
│ [질문 입력창                    ] [Send] │
│ [Ready]                        [Reset]  │
└─────────────────────────────────────────┘
```

### 기능

- URL에서 학생 번호 추출 (`/s/1` → student1)
- Enter 키로 전송 (Shift+Enter는 줄바꿈)
- 전송 시 "Thinking..." 애니메이션
- 응답 색상 구분: 사용자(보라), Claude(밝은 회색), 에러(빨강)
- 대화 이력은 클라이언트 메모리에만 보관 (새로고침 시 초기화)
- Reset 버튼: 화면 초기화 (서버 측은 더미)

### 기술 스택

- 순수 JavaScript (프레임워크 없음)
- fetch API (REST 방식, WebSocket 아님)
- CSS 커스텀 (다크 테마, 그래디언트)

---

## 6. 실행 방법

```bash
# 수동 실행
cd /opt/claude-education
node server.js
# → "Server on 3000"

# 접속
# http://100.89.56.69:3000/
```

### systemd 서비스 등록 (계획서에 포함, 미구현)

```ini
# /etc/systemd/system/claude-education.service
[Unit]
Description=Claude Education Web Terminal
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/claude-education
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
User=root

[Install]
WantedBy=multi-user.target
```

---

## 7. 웹 vs SSH 비교 결론

| 항목 | 웹 서버 (현재) | SSH 직접 접속 |
|------|---------------|-------------|
| 대화형 | X (1회성 질문) | O (완전한 TUI) |
| 맥락 유지 | X | O |
| 응답 속도 | 느림 (프로세스 생성) | 빠름 (상주 프로세스) |
| 사용 편의성 | 브라우저만 필요 | SSH 클라이언트 필요 |
| Claude 기능 | 제한적 (`-p` 모드) | 전체 기능 |
| 파일 편집 | 불가 | 가능 |

**결론**: SSH 직접 접속이 교육 목적에 훨씬 적합. 웹 서버는 간단한 데모/시연용으로만 가치 있음.
