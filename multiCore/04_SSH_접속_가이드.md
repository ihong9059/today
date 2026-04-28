# SSH 직접 접속 방식 가이드

> Odroid C2 검증 결과 확정된 권장 접속 방식

---

## 1. 왜 SSH 직접 접속인가

### 검증 과정

```
1차 시도: ttyd 웹 터미널
  → 실패: Claude Code TUI(Ink/React)가 ttyd와 비호환
  → 입력 불가, 화면 깨짐

2차 시도: 웹 서버 + claude -p (비대화형)
  → 부분 성공: 질문-응답은 가능
  → 한계: 대화 맥락 미유지, 파일 편집 불가, 느림

3차 시도: SSH 직접 접속 → claude 실행
  → 성공: 완전한 대화형 TUI, 모든 기능 사용 가능
  → 최종 채택
```

### SSH 방식의 장점

- Claude Code의 모든 기능 사용 가능 (파일 편집, 도구 실행, 대화 맥락)
- 추가 서버 개발 불필요 (OS 기본 SSH 사용)
- 안정적 (SSH는 검증된 프로토콜)
- 학생별 완전한 격리 (Linux 사용자 수준)

---

## 2. 학생 접속 흐름

### Windows (PuTTY 또는 터미널)

```
1. 터미널 열기 (PowerShell, CMD, 또는 PuTTY)

2. SSH 접속
   ssh student1@100.89.56.69
   비밀번호: (설정된 비밀번호)

3. Claude Code 실행
   student1@odroidc2:~$ claude

4. Claude Code TUI 시작
   ╭──────────────────────────────────────╮
   │  Claude Code v2.1.112                │
   │  /home/student1/workspace            │
   ╰──────────────────────────────────────╯

   > (질문 입력)

5. 종료
   /exit 또는 Ctrl+C
```

### macOS / Linux

```bash
ssh student1@100.89.56.69
# 비밀번호 입력
claude
```

### Chromebook / 태블릿

```
Chrome 브라우저 → Secure Shell 확장 프로그램 사용
또는 Termux (Android) → ssh 명령어
```

---

## 3. 접속 전 필수 조건

### 네트워크

| 항목 | 조건 |
|------|------|
| Tailscale | 학생 PC에 Tailscale 설치 필요 (100.x.x.x 대역) |
| 또는 | 같은 로컬 네트워크에 있어야 함 |
| 포트 | 22 (SSH 기본) |

### 클라이언트

| OS | 도구 |
|----|------|
| Windows 10+ | 기본 터미널 (ssh 명령 내장) |
| Windows (구버전) | PuTTY 설치 |
| macOS | 기본 Terminal |
| Linux | 기본 터미널 |
| Chromebook | Secure Shell 확장 |

---

## 4. 접속 후 환경

### 자동 설정 (이미 적용됨)

| 설정 | 효과 |
|------|------|
| .hushlogin | MOTD 배너 없이 깨끗한 프롬프트 |
| .claude.json | 온보딩/trust 대화상자 건너뛰기 |
| settings.json | 권한 프롬프트 건너뛰기 |
| credentials symlink | 자동 인증 (API Key 또는 OAuth) |

### 학생이 보는 화면

```
student1@odroidc2:~$           ← 깨끗한 프롬프트 (배너 없음)
student1@odroidc2:~$ claude    ← claude 입력
                               ← Claude Code TUI 즉시 시작
╭──────────────────────────────╮
│ Claude Code                  │
│ /home/student1               │
╰──────────────────────────────╯

> Python으로 구구단 프로그램 만들어줘    ← 바로 질문 가능
```

---

## 5. workspace 사용

```
작업 디렉토리: /home/studentN/workspace/

Claude Code가 생성하는 파일은 workspace 안에 저장됨.
학생끼리 다른 학생의 workspace는 접근 불가 (Linux 권한).
```

### 학생이 할 수 있는 것

- Claude Code로 코드 생성/수정
- workspace 안에서 파일 생성/삭제
- Python, Node.js 등 설치된 도구 실행

### 학생이 할 수 없는 것

- 다른 학생 홈 디렉토리 접근 (drwxr-x---)
- sudo 명령 (sudoers 미등록)
- 시스템 설정 변경

---

## 6. 문제 해결

### 접속이 안 될 때

```bash
# Tailscale 연결 확인
tailscale status

# SSH 직접 테스트
ssh -v student1@100.89.56.69

# 서버에서 SSH 서비스 확인 (관리자)
sudo systemctl status sshd
```

### Claude가 안 될 때

```bash
# Claude 버전 확인
claude --version

# credentials 확인
ls -la ~/.claude/.credentials.json

# 수동으로 credentials 권한 확인
ls -la /home/uttec/.claude/.credentials.json
# → -rw-r--r-- 이어야 함 (644)

# 권한이 600으로 바뀌었으면 (관리자)
sudo chmod 644 /home/uttec/.claude/.credentials.json
```

### 화면이 깨질 때

```bash
# 터미널 크기 재설정
resize

# 또는 SSH 재접속
exit
ssh student1@100.89.56.69
```

---

## 7. 교육자 접속 가이드 (수업 시작 전 체크리스트)

```
[ ] Odroid C2 전원 ON 확인
[ ] Tailscale 연결 상태 확인 (ping 100.89.56.69)
[ ] uttec 계정으로 SSH 접속하여 서버 상태 확인
[ ] credentials 파일 권한 확인 (644)
[ ] student1~3으로 각각 테스트 접속
[ ] claude 실행 → 간단한 질문 → 응답 확인
[ ] 학생들에게 접속 정보 배포
```
