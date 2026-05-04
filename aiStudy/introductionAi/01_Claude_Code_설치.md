# Claude Code 설치 가이드

## 1. Claude Code란?

- Claude Code는 터미널(CLI)에서 Claude AI를 사용하는 도구
- 코딩, 파일 편집, 시스템 관리 등 다양한 작업 가능
- Claude Pro($20/월) 또는 Max($100/월 또는 $200/월) 구독 필요

---

## 2. 사전 준비

### 2.1 Claude 계정 및 구독

**계정 가입**
1. [claude.ai](https://claude.ai) 접속
2. "Sign up" 클릭
3. 이메일 또는 구글 계정으로 가입
4. 이메일 인증 완료

**Pro 구독 방법**
1. claude.ai 로그인 후 우측 상단 프로필 클릭
2. Settings > Billing 이동
3. "Upgrade to Pro" 클릭
4. 신용카드 정보 입력 후 결제 ($20/월)

**Max 구독 설명**
- Max5: $100/월 - 일반 Pro의 5배 사용량
- Max20: $200/월 - 일반 Pro의 20배 사용량
- 대용량 작업, 장시간 코딩 세션에 적합

---

### 2.2 Node.js 설치

**Windows에서 설치**
1. [nodejs.org](https://nodejs.org) 접속
2. "LTS" 버전 다운로드 (안정 버전, 권장)
3. 다운로드된 `.msi` 파일 실행
4. 설치 마법사에서 계속 "Next" 클릭
5. "Install" 클릭 후 완료

**설치 확인**

PowerShell 또는 명령 프롬프트를 열고 아래 명령 실행:

```bash
node --version
```

예상 출력:
```
v20.11.0
```

```bash
npm --version
```

예상 출력:
```
10.2.4
```

> 최소 Node.js **18 이상** 필요. 버전이 낮으면 nodejs.org에서 최신 LTS 재설치.

---

## 3. Claude Code 설치

### 3.1 npm으로 설치

터미널(PowerShell, 명령 프롬프트, Git Bash 등)을 열고 실행:

```bash
npm install -g @anthropic-ai/claude-code
```

예상 출력:
```
added 1 package in 3s
```

> `-g` 옵션은 전역(global) 설치를 의미. 어느 폴더에서든 `claude` 명령 사용 가능.

---

### 3.2 설치 확인

```bash
claude --version
```

예상 출력:
```
1.x.x
```

버전 번호가 출력되면 설치 성공.

---

### 3.3 첫 실행 및 로그인

```bash
claude
```

예상 흐름:
```
Opening browser for authentication...
Waiting for login...
```

1. 브라우저가 자동으로 열리며 Claude 로그인 페이지 표시
2. claude.ai 계정으로 로그인
3. "Allow" 클릭하여 OAuth 인증 허용
4. 브라우저에 "You can close this tab" 메시지 표시
5. 터미널로 돌아오면 로그인 완료

성공 시 터미널:
```
Logged in as your@email.com
>
```

---

## 4. 기본 사용법

### 4.1 대화형 모드

```bash
claude
```

터미널에서 바로 Claude와 대화할 수 있는 모드 진입:

```
> 안녕하세요! 오늘 무엇을 도와드릴까요?

You: 파이썬으로 Hello World 코드 작성해줘

> 네, 파이썬 Hello World 코드입니다:
  print("Hello, World!")
```

---

### 4.2 한 줄 명령

터미널을 열지 않고 바로 질문할 때 사용:

```bash
claude -p "이 폴더의 파일 목록을 보여줘"
```

예상 출력:
```
현재 폴더의 파일 목록입니다:
- main.py
- README.md
- requirements.txt
```

다른 예시:
```bash
claude -p "현재 날짜와 시간을 알려줘"
claude -p "git status 결과를 설명해줘"
```

---

### 4.3 파일과 함께 사용

특정 파일의 내용을 Claude에게 전달하여 분석 요청:

```bash
claude "이 코드를 설명해줘" --file main.py
```

예상 출력:
```
main.py 파일을 분석했습니다.
이 코드는 Flask 웹 서버를 구동하는 코드로...
```

여러 파일 동시 전달:
```bash
claude "두 파일의 차이점을 설명해줘" --file old.py --file new.py
```

---

### 4.4 종료

대화형 모드에서 종료하는 방법:

```bash
Ctrl + C
```

또는 프롬프트에 입력:

```
/exit
```

---

## 5. 주요 설정

### 5.1 모델 선택

대화형 모드에서 모델 변경:

```
/model
```

출력 예시:
```
Available models:
  claude-sonnet-4-5    (현재 선택)
  claude-opus-4
  claude-haiku-3-5
```

| 모델 | 특징 | 추천 상황 |
|------|------|-----------|
| Sonnet | 빠름, 기본값 | 일상적인 코딩, 일반 질문 |
| Opus | 최고 성능, 느림 | 복잡한 분석, 어려운 문제 |
| Haiku | 경량, 매우 빠름 | 간단한 질문, 빠른 응답 필요 시 |

---

### 5.2 권한 설정

Claude Code는 파일 편집, 명령 실행 등의 권한을 요청함.

처음 사용 시:
```
Claude wants to run: ls -la
Allow? (y/n/always)
```

- `y` : 이번 한 번만 허용
- `n` : 거부
- `always` : 이후 동일 명령은 자동 허용

권한 레벨 설정 (`--dangerously-skip-permissions` 옵션):
```bash
# 모든 권한 자동 허용 (주의: 신뢰할 수 있는 환경에서만 사용)
claude --dangerously-skip-permissions
```

---

### 5.3 테마 설정

대화형 모드에서 실행:

```
/config
```

설정 메뉴 예시:
```
Settings:
  theme: dark      ← 다크 테마
  theme: light     ← 라이트 테마
  auto-save: on
```

방향키로 선택 후 Enter.

---

## 6. 자주 묻는 질문 (FAQ)

**Q: Pro 구독 없이 사용 가능한가요?**

A: API Key를 직접 설정하면 구독 없이 사용 가능. 단, 사용량(토큰)에 따라 요금 발생.

API Key 설정 방법:
```bash
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxx"
claude
```

---

**Q: 어떤 운영체제에서 사용 가능한가요?**

A: Windows, macOS, Linux 모두 지원.

| 운영체제 | 터미널 |
|----------|--------|
| Windows | PowerShell, 명령 프롬프트, Git Bash |
| macOS | Terminal, iTerm2, Warp |
| Linux | bash, zsh 등 모든 셸 |

---

**Q: 업데이트 방법은?**

A: 설치할 때와 동일한 명령 재실행:

```bash
npm install -g @anthropic-ai/claude-code
```

현재 버전 확인:
```bash
claude --version
```

---

**Q: Claude Code 데스크톱 앱도 있나요?**

A: 있음. 다양한 방식으로 사용 가능:

| 방식 | 설명 |
|------|------|
| CLI (터미널) | 이 가이드에서 다룬 방식 |
| Windows/Mac 데스크톱 앱 | claude.ai/download 에서 다운로드 |
| VS Code 확장 | VS Code 마켓플레이스에서 "Claude" 검색 |
| JetBrains IDE 확장 | JetBrains Marketplace에서 "Claude" 검색 |

---

**Q: 한국어로 사용 가능한가요?**

A: 가능. Claude는 한국어를 완벽하게 지원. 한국어로 질문하면 한국어로 답변.

```bash
claude -p "파이썬 리스트 컴프리헨션을 한국어로 설명해줘"
```

---

## 7. 문제 해결

**`claude` 명령을 찾을 수 없는 경우**

```bash
# npm 전역 경로 확인
npm config get prefix

# Windows PowerShell에서 PATH 추가
$env:PATH += ";C:\Users\사용자이름\AppData\Roaming\npm"
```

터미널을 완전히 닫고 새로 열면 해결되는 경우가 많음.

---

**로그인이 안 될 경우**

```bash
# 로그아웃 후 재로그인
claude logout
claude login
```

---

**설치 오류: permission denied**

```bash
# Windows: 관리자 권한으로 PowerShell 실행 후 재설치
npm install -g @anthropic-ai/claude-code
```

---

## 8. 다음 단계

설치가 완료되었다면 다음 가이드로 이동:

- [02_Obsidian_지식관리.md](02_Obsidian_지식관리.md) - 세컨드 브레인 만들기
