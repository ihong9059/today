# Windows SSH 설정 가이드

> DigitalOcean 서버 (do-server) SSH 접속 설정
> Claude 세션용 작업 가이드

## 서버 정보

| 항목 | 내용 |
|------|------|
| **IP** | 178.128.90.37 |
| **User** | root |
| **별칭** | do-server |

---

## 1단계: PEM 파일 복사

### 필요한 파일
- `uttec-first-ec2.pem` (GitHub repo의 today 폴더에 있음)

### Windows 위치
```
C:\Users\{사용자명}\.ssh\uttec-first-ec2.pem
```

### 작업
```powershell
# .ssh 폴더 생성 (없으면)
mkdir C:\Users\$env:USERNAME\.ssh

# pem 파일을 .ssh 폴더로 복사
# (GitHub에서 clone한 today 폴더에서)
copy C:\todo\today\uttec-first-ec2.pem C:\Users\$env:USERNAME\.ssh\
```

---

## 2단계: SSH Config 파일 생성/수정

### 파일 위치
```
C:\Users\{사용자명}\.ssh\config
```

### config 파일 내용 추가

메모장 또는 VS Code로 `C:\Users\{사용자명}\.ssh\config` 파일을 열고 아래 내용 추가:

```
Host do-server
    HostName 178.128.90.37
    User root
    IdentityFile ~/.ssh/uttec-first-ec2.pem
    StrictHostKeyChecking no
```

### PowerShell로 생성하는 방법
```powershell
# config 파일에 추가
Add-Content -Path "$env:USERPROFILE\.ssh\config" -Value @"

Host do-server
    HostName 178.128.90.37
    User root
    IdentityFile ~/.ssh/uttec-first-ec2.pem
    StrictHostKeyChecking no
"@
```

---

## 3단계: PEM 파일 권한 설정 (중요!)

Windows에서는 PEM 파일 권한이 너무 열려있으면 SSH가 거부합니다.

### PowerShell (관리자 권한)로 실행:
```powershell
# 현재 사용자만 읽기 권한 부여
$pemPath = "$env:USERPROFILE\.ssh\uttec-first-ec2.pem"

# 상속 제거
icacls $pemPath /inheritance:r

# 현재 사용자에게만 읽기 권한
icacls $pemPath /grant:r "$env:USERNAME:R"
```

---

## 4단계: 접속 테스트

### PowerShell 또는 CMD에서:
```bash
ssh do-server
```

### 성공 시 출력:
```
Welcome to Ubuntu 24.04.3 LTS
root@ubuntu-s-2vcpu-4gb-sgp1-01:~#
```

---

## 문제 해결

### 오류: "Permissions are too open"
→ 3단계 권한 설정 다시 실행

### 오류: "Connection refused"
→ 서버 IP 확인 (178.128.90.37)

### 오류: "Host key verification failed"
```powershell
ssh-keygen -R 178.128.90.37
```

---

## 전체 SSH 별칭 목록 (참고)

```
Host do-server
    HostName 178.128.90.37
    User root
    IdentityFile ~/.ssh/uttec-first-ec2.pem
    StrictHostKeyChecking no

Host rpi
    HostName 192.168.1.10
    User uttec

Host uttec-ec2
    HostName 52.78.119.132
    User ec2-user
    IdentityFile ~/.ssh/uttec-first-ec2.pem
    StrictHostKeyChecking no
```

---

## Claude 세션용 체크리스트

- [ ] PEM 파일이 `C:\Users\{사용자명}\.ssh\`에 있는지 확인
- [ ] config 파일에 do-server 설정이 있는지 확인
- [ ] PEM 파일 권한 설정 완료
- [ ] `ssh do-server` 접속 테스트

---

*작성일: 2026-01-23*
