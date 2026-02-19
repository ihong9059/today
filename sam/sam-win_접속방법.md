# sam-win 접속 방법

## 서버 정보
- **호스트명**: SAM22-15
- **Tailscale IP**: 100.99.239.85
- **로컬 IP**: 192.168.1.17
- **사용자**: visitor
- **비밀번호**: 3232

---

## Mac에서 접속

### 방법 1: SSH config 사용 (권장)
```bash
ssh sam-win
```
> SSH config가 이미 설정되어 있어 비밀번호 없이 접속 가능

### 방법 2: 직접 접속
```bash
ssh visitor@100.99.239.85
```

### SSH config 설정 (최초 1회)
`~/.ssh/config` 파일에 추가:
```
Host sam-win
    HostName 100.99.239.85
    User visitor
    StrictHostKeyChecking no
```

### 공개키 등록 (비밀번호 없이 접속)
```bash
# Mac 공개키 확인
cat ~/.ssh/id_rsa.pub

# Windows에 등록 (관리자용 authorized_keys)
ssh visitor@100.99.239.85
# 비밀번호: 3232

# PowerShell에서 실행
Add-Content -Path 'C:\ProgramData\ssh\administrators_authorized_keys' -Value '공개키내용'
icacls 'C:\ProgramData\ssh\administrators_authorized_keys' /inheritance:r /grant 'Administrators:F' /grant 'SYSTEM:F'
```

---

## Windows PC에서 접속 (집에서)

### 사전 요구사항
1. **Tailscale 설치**: https://tailscale.com/download
2. **동일한 Tailscale 계정으로 로그인**

### 방법 1: PowerShell / CMD
```powershell
ssh visitor@100.99.239.85
```
비밀번호: `3232`

### 방법 2: Git Bash
```bash
ssh visitor@100.99.239.85
```

### 방법 3: SSH config 설정 (비밀번호 없이 접속)

#### 1. SSH 키 생성 (최초 1회)
PowerShell에서:
```powershell
ssh-keygen -t rsa -b 4096
# Enter 3번 누르기 (기본값 사용)
```

#### 2. 공개키 확인
```powershell
type $env:USERPROFILE\.ssh\id_rsa.pub
```

#### 3. sam-win에 공개키 등록
sam-win에 접속 후 PowerShell에서:
```powershell
# 공개키 추가
Add-Content -Path 'C:\ProgramData\ssh\administrators_authorized_keys' -Value '여기에_공개키_붙여넣기'

# 권한 설정
icacls 'C:\ProgramData\ssh\administrators_authorized_keys' /inheritance:r /grant 'Administrators:F' /grant 'SYSTEM:F'
```

#### 4. SSH config 설정
`C:\Users\사용자명\.ssh\config` 파일 생성/편집:
```
Host sam-win
    HostName 100.99.239.85
    User visitor
    StrictHostKeyChecking no
```

#### 5. 접속
```powershell
ssh sam-win
```

---

## 문제 해결

### Tailscale 연결 확인
```bash
# Mac
tailscale status

# Windows (PowerShell)
tailscale status
```

### SSH 연결 테스트
```bash
# 포트 확인
nc -zv 100.99.239.85 22

# 상세 로그
ssh -v visitor@100.99.239.85
```

### Windows OpenSSH 서비스 확인 (sam-win에서)
```powershell
Get-Service sshd
# 서비스 시작
Start-Service sshd
```

---

## Lenovo Windows PC에서 접속 (설정 완료)

### SSH config 위치
`C:\Users\lenovo\.ssh\config`

### 설정 내용
```
Host sam-win
  HostName 100.99.239.85
  User visitor
  IdentityFile ~/.ssh/id_ed25519_sam
```

### 접속 방법
```bash
ssh sam-win
```
> 비밀번호 없이 바로 접속됨

### 사용된 키 파일
- 개인키: `C:\Users\lenovo\.ssh\id_ed25519_sam`
- 공개키: `C:\Users\lenovo\.ssh\id_ed25519_sam.pub`

---

## 참고
- sam-win의 visitor 계정은 관리자 그룹에 속해 있음
- 관리자 계정은 `C:\ProgramData\ssh\administrators_authorized_keys` 파일 사용
- Tailscale을 통해 어디서든 동일한 IP(100.99.239.85)로 접속 가능
