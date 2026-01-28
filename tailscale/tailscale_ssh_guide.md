# Tailscale을 통한 SSH 접속 가이드

## 개요

Tailscale은 WireGuard 기반의 VPN 서비스로, 복잡한 네트워크 설정 없이 어디서나 안전하게 원격 장치에 접속할 수 있습니다.

---

## 대상 장치 정보

| 항목 | 값 |
|------|-----|
| 장치 | Raspberry Pi 4 |
| Tailscale IP | `100.73.114.75` |
| 호스트명 | `uttec` |
| SSH 사용자명 | `uttec` |
| SSH 비밀번호 | `uttec` |
| SSH 포트 | `22` |

---

## 1. macOS에서 접속하기

### 1.1 Tailscale 설치

#### 방법 A: App Store (권장)
1. Mac App Store 열기
2. "Tailscale" 검색
3. 설치 버튼 클릭

#### 방법 B: Homebrew
```bash
brew install --cask tailscale
```

### 1.2 Tailscale 로그인

1. 메뉴바에서 Tailscale 아이콘 클릭
2. "Log in" 클릭
3. 웹 브라우저에서 계정으로 로그인 (Google, Microsoft, GitHub 등)
4. **중요**: Raspberry Pi와 동일한 계정으로 로그인해야 함

### 1.3 SSH 접속

#### 터미널에서 접속
```bash
# IP 주소로 접속
ssh uttec@100.73.114.75

# 또는 Tailscale 호스트명으로 접속
ssh uttec@uttec
```

#### 접속 예시
```bash
maeg@MacBookPro ~ % ssh uttec@100.73.114.75
uttec@100.73.114.75's password: uttec
Linux uttec 6.x.x-v8+ #xxxx SMP PREEMPT aarch64

uttec@uttec:~ $
```

### 1.4 SSH 설정 파일로 간편하게 접속 (선택사항)

`~/.ssh/config` 파일에 추가:
```
Host rpi
    HostName 100.73.114.75
    User uttec
    Port 22
```

이후 간단히 접속:
```bash
ssh rpi
```

---

## 2. Windows에서 접속하기

### 2.1 Tailscale 설치

#### 방법 A: 공식 웹사이트 (권장)
1. https://tailscale.com/download/windows 접속
2. "Download Tailscale for Windows" 클릭
3. 다운로드된 설치 파일 실행
4. 설치 완료 후 재부팅 (필요시)

#### 방법 B: winget (Windows 패키지 관리자)
PowerShell을 관리자 권한으로 실행:
```powershell
winget install Tailscale.Tailscale
```

#### 방법 C: Microsoft Store
1. Microsoft Store 열기
2. "Tailscale" 검색
3. 설치

### 2.2 Tailscale 로그인

1. 시스템 트레이에서 Tailscale 아이콘 클릭
2. "Log in" 클릭
3. 웹 브라우저에서 계정으로 로그인
4. **중요**: Raspberry Pi와 동일한 계정으로 로그인해야 함

### 2.3 SSH 접속

#### 방법 A: Windows Terminal / PowerShell (Windows 10/11)
```powershell
ssh uttec@100.73.114.75
```

비밀번호 입력 프롬프트가 나타나면 `uttec` 입력

#### 방법 B: 명령 프롬프트 (CMD)
```cmd
ssh uttec@100.73.114.75
```

#### 방법 C: PuTTY 사용

1. **PuTTY 다운로드 및 설치**
   - https://www.putty.org 접속
   - "Download PuTTY" 클릭
   - 설치 파일 다운로드 후 실행

2. **PuTTY 설정**
   - Host Name: `100.73.114.75`
   - Port: `22`
   - Connection type: `SSH` 선택

3. **세션 저장 (선택사항)**
   - Saved Sessions에 "RaspberryPi" 입력
   - "Save" 클릭

4. **접속**
   - "Open" 클릭
   - 첫 접속 시 보안 경고 → "Accept" 클릭
   - login as: `uttec`
   - password: `uttec`

#### 방법 D: MobaXterm 사용 (고급 기능)

1. https://mobaxterm.mobatek.net 에서 다운로드
2. Session → SSH 선택
3. Remote host: `100.73.114.75`
4. Username: `uttec`
5. OK 클릭

### 2.4 Windows SSH 키 설정 (선택사항)

PowerShell에서:
```powershell
# SSH 키 생성
ssh-keygen -t ed25519

# 공개키를 Raspberry Pi에 복사
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh uttec@100.73.114.75 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

---

## 3. Ubuntu (Linux)에서 접속하기

### 3.1 Tailscale 설치

#### 방법 A: 공식 설치 스크립트 (권장)
```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

#### 방법 B: APT 저장소 수동 추가
```bash
# Tailscale GPG 키 추가
curl -fsSL https://pkgs.tailscale.com/stable/ubuntu/jammy.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null

# 저장소 추가 (Ubuntu 22.04 기준)
echo "deb [signed-by=/usr/share/keyrings/tailscale-archive-keyring.gpg] https://pkgs.tailscale.com/stable/ubuntu jammy main" | sudo tee /etc/apt/sources.list.d/tailscale.list

# 설치
sudo apt update
sudo apt install tailscale
```

### 3.2 Tailscale 시작 및 로그인

```bash
# Tailscale 서비스 시작
sudo systemctl enable --now tailscaled

# 로그인
sudo tailscale up
```

터미널에 표시되는 URL을 웹 브라우저에서 열어 로그인합니다.

**중요**: Raspberry Pi와 동일한 계정으로 로그인해야 함

### 3.3 Tailscale 상태 확인

```bash
# 연결 상태 확인
tailscale status

# 자신의 Tailscale IP 확인
tailscale ip
```

### 3.4 SSH 접속

```bash
# IP 주소로 접속
ssh uttec@100.73.114.75

# 또는 Tailscale 호스트명으로 접속
ssh uttec@uttec
```

### 3.5 SSH 설정 파일로 간편하게 접속 (선택사항)

`~/.ssh/config` 파일 편집:
```bash
nano ~/.ssh/config
```

다음 내용 추가:
```
Host rpi
    HostName 100.73.114.75
    User uttec
    Port 22
    ServerAliveInterval 60
    ServerAliveCountMax 3
```

이후 간단히 접속:
```bash
ssh rpi
```

### 3.6 SSH 키 인증 설정 (선택사항)

```bash
# SSH 키 생성 (없는 경우)
ssh-keygen -t ed25519 -C "your_email@example.com"

# 공개키를 Raspberry Pi에 복사
ssh-copy-id uttec@100.73.114.75
```

---

## 4. 문제 해결

### 4.1 Tailscale 연결 안 됨

```bash
# 상태 확인
tailscale status

# 재연결 시도
sudo tailscale down
sudo tailscale up
```

### 4.2 SSH 연결 거부 (Connection refused)

1. Raspberry Pi에서 SSH 서비스 확인:
```bash
sudo systemctl status ssh
sudo systemctl start ssh
```

2. 방화벽 확인:
```bash
sudo ufw status
sudo ufw allow 22/tcp
```

### 4.3 비밀번호가 틀렸다고 나옴

- 사용자명: `uttec`
- 비밀번호: `uttec`
- 대소문자 확인

### 4.4 Tailscale IP가 변경됨

Tailscale IP는 일반적으로 고정이지만, 장치를 삭제 후 다시 등록하면 변경될 수 있습니다.

```bash
# 최신 IP 확인
tailscale status
```

### 4.5 "Host key verification failed" 오류

```bash
# 기존 호스트 키 제거
ssh-keygen -R 100.73.114.75

# 다시 접속
ssh uttec@100.73.114.75
```

---

## 5. 보안 권장사항

### 5.1 SSH 비밀번호 변경

Raspberry Pi에 접속 후:
```bash
passwd
```

### 5.2 SSH 키 인증 사용 (권장)

비밀번호 대신 SSH 키를 사용하면 보안이 강화됩니다.

### 5.3 Tailscale ACL 설정

Tailscale Admin Console (https://login.tailscale.com/admin)에서 접근 제어 정책을 설정할 수 있습니다.

---

## 6. 유용한 명령어 모음

| 명령어 | 설명 |
|--------|------|
| `tailscale status` | 연결된 장치 목록 확인 |
| `tailscale ip` | 자신의 Tailscale IP 확인 |
| `tailscale ping <hostname>` | 다른 장치에 ping 테스트 |
| `tailscale netcheck` | 네트워크 연결 상태 진단 |
| `sudo tailscale down` | Tailscale 연결 해제 |
| `sudo tailscale up` | Tailscale 연결 |
| `sudo tailscale logout` | 로그아웃 |

---

## 7. 참고 링크

- Tailscale 공식 문서: https://tailscale.com/kb
- Tailscale 다운로드: https://tailscale.com/download
- Tailscale Admin Console: https://login.tailscale.com/admin

---

*문서 작성일: 2026-01-28*
