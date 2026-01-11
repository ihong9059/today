# Termux Claude Code CLI 설치 가이드

**작성일**: 2026-01-12
**대상**: Android 스마트폰/태블릿 (Termux 환경)

---

## 사전 준비

### 1. Termux 설치

Google Play Store가 아닌 **F-Droid**에서 설치를 권장합니다.
- F-Droid: https://f-droid.org/packages/com.termux/
- GitHub: https://github.com/termux/termux-app/releases

### 2. 스마트폰 설정

| 설정 항목 | 경로 |
|----------|------|
| 개발자 옵션 활성화 | 설정 → 휴대전화 정보 → 소프트웨어 정보 → 빌드번호 7회 탭 |
| USB 디버깅 | 설정 → 개발자 옵션 → USB 디버깅 ON |
| 무선 디버깅 (선택) | 설정 → 개발자 옵션 → 무선 디버깅 ON |

---

## 설치 과정

### Step 1: Termux 초기 설정

스마트폰의 Termux 앱에서 실행:

```bash
# 저장소 접근 권한 설정
termux-setup-storage

# 패키지 업데이트
pkg update && pkg upgrade -y
```

### Step 2: SSH 서버 설정

```bash
# OpenSSH 설치
pkg install openssh -y

# 비밀번호 설정 (PC에서 접속 시 필요)
passwd

# 현재 사용자명 확인
whoami

# IP 주소 확인
ifconfig | grep inet

# SSH 서버 시작
sshd
```

> **참고**: Termux SSH 포트는 **8022** (기본 22가 아님)

### Step 3: PC에서 SSH 접속

```bash
# 접속 형식
ssh <사용자명>@<IP주소> -p 8022

# 예시
ssh u0_a314@192.168.0.32 -p 8022
```

### Step 4: Node.js 설치

```bash
# Node.js 설치 (npm 포함)
pkg install -y nodejs

# 설치 확인
node --version   # v18+ 필요
npm --version    # v8+ 필요
```

### Step 5: Claude Code CLI 설치

```bash
# Claude Code CLI 전역 설치
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version
```

### Step 6: Claude 실행 및 인증

```bash
# Claude 실행 (최초 실행 시 브라우저 인증)
claude

# 또는 API 키로 인증
export ANTHROPIC_API_KEY="sk-ant-xxxxx"
claude
```

---

## SSH 자동 시작 설정 (선택)

Termux 시작 시 SSH 서버 자동 실행:

```bash
# .bashrc에 추가
echo 'sshd' >> ~/.bashrc
```

---

## 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `claude` | Claude 대화 시작 |
| `claude /path` | 특정 디렉토리에서 시작 |
| `claude --help` | 도움말 보기 |
| `claude --version` | 버전 확인 |

---

## 문제 해결

### SSH 연결 문제

| 증상 | 원인 | 해결 |
|------|------|------|
| Connection refused | sshd 미실행 | Termux에서 `sshd` 실행 |
| Permission denied | 비밀번호 미설정 | `passwd`로 비밀번호 설정 |
| Connection timeout | IP 주소 오류 | `ifconfig`로 IP 재확인 |
| Host key 오류 | 기존 키 충돌 | PC에서 `ssh-keygen -R <IP>` |

### Node.js 설치 문제

| 증상 | 해결 |
|------|------|
| pkg 오류 | `pkg update && pkg upgrade` |
| 저장 공간 부족 | `pkg clean` 후 재시도 |
| 권한 오류 | Termux 재시작 |

### Claude 실행 문제

| 증상 | 해결 |
|------|------|
| command not found | `npm install -g @anthropic-ai/claude-code` 재실행 |
| 인증 오류 | API 키 확인 또는 브라우저 인증 |
| 메모리 부족 | 다른 앱 종료 후 재시도 |

---

## 설치 확인 체크리스트

```bash
# 1. SSH 접속 확인
ssh <user>@<ip> -p 8022 "echo 'SSH OK'"

# 2. Node.js 확인
node --version && npm --version

# 3. Claude 확인
claude --version

# 4. 기기 정보 확인
uname -a
getprop ro.product.model
```

---

## 설치 완료 후

설치가 완료되면 해당 기기의 spec 문서에 다음 정보를 추가하세요:

```markdown
## Termux 개발 환경

### SSH 접속 설정
- **IP 주소**: xxx.xxx.xxx.xxx
- **포트**: 8022
- **사용자**: u0_axxx

### 설치된 개발 도구
| 도구 | 버전 |
|------|------|
| Node.js | vXX.X.X |
| npm | XX.X.X |
| Claude Code | X.X.X |
```

---

## 외부에서 SSH 접속하기

스마트폰이 다른 네트워크(카페, 회사, LTE/5G 등)에 연결되어 있을 때 외부에서 SSH로 접속하는 방법입니다.

### 방법 1: 공유기 포트 포워딩 (집 네트워크)

집 공유기에서 포트 포워딩을 설정하면 외부에서 접속할 수 있습니다.

#### 1. 공유기 설정

| 항목 | 값 |
|------|-----|
| 외부 포트 | 8022 (또는 원하는 포트) |
| 내부 IP | 스마트폰 IP (예: 192.168.0.32) |
| 내부 포트 | 8022 |
| 프로토콜 | TCP |

#### 2. 공인 IP 확인

```bash
# 공인 IP 확인 (스마트폰 또는 같은 네트워크 PC에서)
curl ifconfig.me
```

#### 3. 외부에서 접속

```bash
# 공인 IP로 접속
ssh <사용자명>@<공인IP> -p 8022

# 예시
ssh u0_a314@123.456.789.10 -p 8022
```

#### 4. DDNS 설정 (선택)

공인 IP가 변경되는 경우 DDNS를 사용하면 편리합니다.

| DDNS 서비스 | 무료 도메인 예시 |
|-------------|-----------------|
| No-IP | myphone.ddns.net |
| DuckDNS | myphone.duckdns.org |
| ipTIME DDNS | myphone.iptime.org |

```bash
# DDNS로 접속
ssh u0_a314@myphone.ddns.net -p 8022
```

---

### 방법 2: SSH 키 인증 설정 (보안 강화)

비밀번호 대신 SSH 키를 사용하면 더 안전합니다.

#### 1. PC에서 SSH 키 생성

```bash
# Windows (PowerShell) 또는 Linux/Mac
ssh-keygen -t ed25519 -C "my-pc"

# 키 위치: ~/.ssh/id_ed25519 (개인키), ~/.ssh/id_ed25519.pub (공개키)
```

#### 2. 공개키를 스마트폰에 복사

```bash
# 로컬 네트워크에서 먼저 설정
ssh-copy-id -p 8022 u0_a314@192.168.0.32

# 또는 수동으로 복사
cat ~/.ssh/id_ed25519.pub | ssh -p 8022 u0_a314@192.168.0.32 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

#### 3. 키로 접속

```bash
# 비밀번호 없이 접속 가능
ssh u0_a314@192.168.0.32 -p 8022
```

---

### 방법 3: SSH 설정 파일 (편리한 접속)

매번 긴 명령어 대신 별칭으로 쉽게 접속합니다.

#### PC의 ~/.ssh/config 파일 편집

```
# 로컬 네트워크 접속 (집에서)
Host phone-local
    HostName 192.168.0.32
    User u0_a314
    Port 8022

# 외부 네트워크 접속 (외출 시)
Host phone-remote
    HostName myphone.ddns.net  # 또는 공인 IP
    User u0_a314
    Port 8022
```

#### 간편 접속

```bash
# 집에서
ssh phone-local

# 외부에서
ssh phone-remote
```

---

### 방법 4: 모바일 핫스팟 사용 시

스마트폰이 LTE/5G 핫스팟을 사용하는 경우:

1. **같은 핫스팟에 PC 연결**
2. 스마트폰의 핫스팟 IP 확인 (보통 `192.168.43.1`)
3. PC에서 접속:

```bash
ssh u0_a314@192.168.43.1 -p 8022
```

---

### 네트워크별 접속 요약

| 상황 | 접속 방법 |
|------|----------|
| 집 (같은 WiFi) | `ssh user@192.168.0.32 -p 8022` |
| 외부 → 집 스마트폰 | `ssh user@공인IP -p 8022` (포트포워딩 필요) |
| 외부 → 집 스마트폰 (DDNS) | `ssh user@myphone.ddns.net -p 8022` |
| 스마트폰 핫스팟 | `ssh user@192.168.43.1 -p 8022` |

---

### 보안 주의사항

| 항목 | 권장 설정 |
|------|----------|
| 비밀번호 | 강력한 비밀번호 사용 (12자 이상) |
| SSH 키 | 비밀번호 대신 SSH 키 인증 사용 |
| 포트 변경 | 기본 8022 대신 다른 포트 사용 (선택) |
| 방화벽 | 특정 IP만 허용 (가능한 경우) |

---

### 스마트폰 IP 변경 시

스마트폰이 다른 네트워크에 연결되면 IP가 변경됩니다.

#### 현재 IP 확인 (스마트폰 Termux에서)

```bash
# WiFi IP 확인
ifconfig wlan0 | grep inet

# 또는
ip addr show wlan0
```

#### 외부에서 스마트폰 IP 알아내기

Termux에서 스크립트로 IP를 서버에 전송하거나 메시지로 보낼 수 있습니다:

```bash
# 현재 IP를 파일로 저장하고 확인
echo "$(date): $(curl -s ifconfig.me)" >> ~/my_ip_log.txt
```

---

## 참고 자료

- Termux Wiki: https://wiki.termux.com/
- Claude Code: https://github.com/anthropics/claude-code
- Anthropic: https://www.anthropic.com/

---

*이 가이드는 Android Termux 환경에서 Claude Code CLI 설치를 위한 범용 설명서입니다.*
