# MCP 연결 가이드 (Notion & Notion Calendar)

## 1. MCP란?
- MCP(Model Context Protocol)는 Claude Code가 외부 서비스와 연결하는 프로토콜
- Claude가 직접 Notion 페이지를 읽고 쓰거나, 캘린더를 조회할 수 있게 해줌
- 마치 Claude에게 "손"을 달아주는 것과 같은 개념
- MCP 서버를 설정하면 Claude Code에서 바로 외부 서비스 사용 가능

## 2. MCP 설정 파일 위치
### 2.1 프로젝트별 설정
- .claude/settings.json 또는 .claude/settings.local.json (git 미추적)

### 2.2 글로벌 설정 (모든 프로젝트에 적용)
- Windows: %USERPROFILE%\.claude\settings.json
- Mac/Linux: ~/.claude/settings.json

### 2.3 설정 파일 구조
```json
{
  "mcpServers": {
    "서버이름": {
      "command": "실행 명령어",
      "args": ["인자1", "인자2"],
      "env": {
        "환경변수": "값"
      }
    }
  }
}
```

## 3. Notion MCP 연결

### 3.1 Notion API 키 발급
1. https://www.notion.so/my-integrations 접속
2. "새 통합 만들기(New integration)" 클릭
3. 이름 입력 (예: "Claude MCP")
4. 연결할 워크스페이스 선택
5. "제출(Submit)" 클릭
6. **Internal Integration Secret** 복사 (ntn_으로 시작하는 키)

### 3.2 Notion 페이지에 통합 연결
1. 연결하려는 Notion 페이지/데이터베이스 열기
2. 우측 상단 "..." 메뉴 > "연결 추가(Add connections)"
3. 위에서 만든 통합(Claude MCP) 선택
4. "확인" 클릭
- 주의: 각 페이지/DB마다 이 작업 필요

### 3.3 Notion MCP 서버 설치 및 설정

**방법 1: npx로 실행 (설치 불필요)**
settings.json에 추가:
```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "ntn_여기에_발급받은_키_입력"
      }
    }
  }
}
```

**방법 2: 글로벌 설치 후 실행**
```bash
npm install -g @notionhq/notion-mcp-server
```
settings.json:
```json
{
  "mcpServers": {
    "notion": {
      "command": "notion-mcp-server",
      "env": {
        "NOTION_API_KEY": "ntn_여기에_발급받은_키_입력"
      }
    }
  }
}
```

### 3.4 Notion MCP 사용 예시
Claude Code에서:
```
"Notion에서 오늘 할 일 목록 가져와줘"
"이 내용을 Notion 페이지에 추가해줘"
"Notion 데이터베이스에서 프로젝트 목록 조회해줘"
```

## 4. Google Calendar MCP 연결 (Notion Calendar 대체)

### 4.1 개요
- Notion Calendar는 Google Calendar 기반
- @cocal/google-calendar-mcp 패키지 사용
- OAuth 인증으로 Google Calendar 접근

### 4.2 Google Cloud 프로젝트 설정
1. https://console.cloud.google.com 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "사용 설정된 API" > Google Calendar API 활성화
4. "사용자 인증 정보" > "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID"
5. 유형: 데스크톱 앱, 이름 지정
6. client_id와 client_secret 복사

### 4.3 OAuth 인증 파일 준비
credentials.json 파일 생성:
```json
{
  "installed": {
    "client_id": "여기에_client_id",
    "client_secret": "여기에_client_secret",
    "redirect_uris": ["http://localhost"]
  }
}
```
저장 위치: ~/.claude/google-calendar/credentials.json

### 4.4 Calendar MCP 설정
settings.json에 추가:
```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "npx",
      "args": ["-y", "@cocal/google-calendar-mcp"],
      "env": {
        "CREDENTIALS_PATH": "C:\\Users\\사용자명\\.claude\\google-calendar\\credentials.json",
        "TOKEN_PATH": "C:\\Users\\사용자명\\.claude\\google-calendar\\token.json"
      }
    }
  }
}
```

### 4.5 첫 인증
1. Claude Code 재시작
2. "오늘 일정 알려줘" 입력
3. 브라우저가 열리면 Google 계정 로그인
4. 권한 허용
5. token.json 자동 생성 → 이후 자동 인증

### 4.6 Calendar MCP 사용 예시
```
"오늘 일정 알려줘"
"내일 오후 2시에 회의 추가해줘"
"이번 주 일정 보여줘"
```

## 5. MCP 연결 확인 및 트러블슈팅
### 5.1 연결 확인
- Claude Code 시작 시 MCP 서버 연결 로그 확인
- /mcp 명령으로 연결된 MCP 서버 목록 확인

### 5.2 자주 발생하는 문제
- "MCP server failed to start" → Node.js 버전 확인, 패키지 재설치
- "NOTION_API_KEY invalid" → API 키 재발급, 환경변수 확인
- "Permission denied" → Notion 페이지에 통합 연결 확인
- Calendar 인증 실패 → credentials.json 경로 확인, token.json 삭제 후 재인증

## 6. 기타 유용한 MCP 서버
| MCP 서버 | 용도 | 패키지명 |
|----------|------|----------|
| GitHub | PR/이슈 관리 | @modelcontextprotocol/server-github |
| Filesystem | 파일 접근 | @modelcontextprotocol/server-filesystem |
| Slack | 메시지 전송 | @anthropic-ai/mcp-server-slack |
| Web Search | 웹 검색 | @anthropic-ai/mcp-server-brave-search |

## 7. 다음 단계
- [06_GitHub_사용법.md](06_GitHub_사용법.md) - GitHub 설치 및 사용법 알아보기
