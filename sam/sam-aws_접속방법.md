# sam-aws 서버 접속 방법

## 서버 정보

| 항목 | 값 |
|------|---|
| **서버명** | sam-aws |
| **공인 IP** | 15.164.220.60 |
| **Tailscale IP** | 100.78.187.70 |
| **리전** | ap-northeast-2 (서울) |
| **OS** | Amazon Linux 2023 |
| **사용자** | ec2-user |
| **PEM 파일** | `sam/samks204.pem` |

---

## Mac에서 접속 (설정 완료됨)

### 간단한 접속
```bash
ssh sam-aws
```

### SSH config 설정 (이미 적용됨)
`~/.ssh/config` 파일:
```
Host sam-aws
    HostName 100.78.187.70
    User ec2-user
    IdentityFile /Users/maeg/todo/today/sam/samks204.pem
    StrictHostKeyChecking no
```

### PEM 파일로 직접 접속
```bash
# 공인 IP로 접속
ssh -i /Users/maeg/todo/today/sam/samks204.pem ec2-user@15.164.220.60

# Tailscale IP로 접속
ssh -i /Users/maeg/todo/today/sam/samks204.pem ec2-user@100.78.187.70
```

---

## Windows PC에서 Tailscale 설치 및 접속

### 1단계: Tailscale 설치

1. https://tailscale.com/download/windows 접속
2. 설치 파일 다운로드 및 실행
3. 설치 완료 후 시스템 트레이에 Tailscale 아이콘 생성

### 2단계: Tailscale 로그인

1. 시스템 트레이의 Tailscale 아이콘 클릭
2. **"Log in"** 클릭
3. 브라우저에서 Tailscale 계정으로 로그인 (ihong9059@ 계정)
4. 기기 승인 완료

### 3단계: SSH 클라이언트 설치 (선택)

**방법 A: Windows Terminal + OpenSSH (권장)**
- Windows 10/11에 기본 포함
- PowerShell에서 바로 ssh 명령어 사용 가능

**방법 B: PuTTY 사용**
1. https://www.putty.org 에서 PuTTY 다운로드
2. PuTTYgen으로 PEM → PPK 변환 필요

### 4단계: SSH 접속

**Windows Terminal / PowerShell:**
```powershell
# PEM 파일 복사 후 접속
ssh -i C:\경로\samks204.pem ec2-user@100.78.187.70
```

**PEM 파일 권한 설정 (Windows):**
```powershell
# PowerShell에서 실행
icacls "C:\경로\samks204.pem" /inheritance:r
icacls "C:\경로\samks204.pem" /grant:r "%USERNAME%:R"
```

### 5단계: Windows SSH config 설정 (선택)

`C:\Users\사용자명\.ssh\config` 파일 생성:
```
Host sam-aws
    HostName 100.78.187.70
    User ec2-user
    IdentityFile C:\경로\samks204.pem
```

이후 간단히:
```powershell
ssh sam-aws
```

---

## Windows에서 공개키 등록 (PEM 파일 없이 접속)

### 1단계: SSH 키 생성 (없는 경우)
```powershell
ssh-keygen -t rsa -b 4096
```
- 기본 경로: `C:\Users\사용자명\.ssh\id_rsa`

### 2단계: 공개키 확인
```powershell
type C:\Users\사용자명\.ssh\id_rsa.pub
```

### 3단계: 공개키를 서버에 등록

**방법 A: Mac에서 등록 (권장)**
```bash
# Mac에서 실행
ssh sam-aws "echo '여기에_Windows_공개키_붙여넣기' >> ~/.ssh/authorized_keys"
```

**방법 B: 서버에서 직접 등록**
```bash
# sam-aws 서버에 접속 후
echo '여기에_Windows_공개키_붙여넣기' >> ~/.ssh/authorized_keys
```

### 4단계: PEM 없이 접속 확인
```powershell
ssh ec2-user@100.78.187.70
```

---

## Tailscale 네트워크 현황

| 기기명 | Tailscale IP | OS | 상태 |
|-------|-------------|-----|------|
| sam-aws | 100.78.187.70 | Linux | 온라인 |
| macbookpro-2 | 100.126.26.23 | macOS | 온라인 |
| myhome-rpi5 | 100.79.180.64 | Linux | 온라인 |
| office-dell | 100.89.156.126 | Windows | 온라인 |
| home-linux | 100.67.68.70 | Linux | 오프라인 |
| myhome-lenovo | 100.82.193.50 | Windows | 오프라인 |

---

## 문제 해결

### 접속 안 될 때

1. **Tailscale 연결 확인**
   ```bash
   tailscale status
   ```

2. **서버 상태 확인**
   - AWS 콘솔에서 인스턴스 상태 확인
   - 공인 IP가 변경되었을 수 있음 (Tailscale IP는 고정)

3. **PEM 파일 권한 오류**
   ```bash
   chmod 400 /Users/maeg/todo/today/sam/samks204.pem
   ```

### Tailscale 재연결
```bash
# 서버에서
sudo tailscale down
sudo tailscale up
```

---

## 참고

- **Tailscale 관리 콘솔**: https://login.tailscale.com/admin/machines
- **AWS 콘솔**: https://ap-northeast-2.console.aws.amazon.com/ec2/
- **PEM 파일 위치**: `/Users/maeg/todo/today/sam/samks204.pem`

---

*작성일: 2026-02-19*
