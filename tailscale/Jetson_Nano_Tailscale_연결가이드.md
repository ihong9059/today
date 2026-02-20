# Jetson Nano Tailscale 연결 가이드

## Jetson Nano 정보

| 항목 | 값 |
|------|-----|
| **Tailscale IP** | 100.108.162.50 |
| **Hostname** | uttec |
| **OS** | Ubuntu 18.04.6 LTS |
| **로컬 IP** | 192.168.1.11 |
| **SSH 계정** | uttec / uttec |

---

## Mac에서 연결하기

### 1. Tailscale 설치 확인

```bash
# 상태 확인
tailscale status
```

### 2. SSH Config 설정 (권장)

`~/.ssh/config` 파일에 추가:

```
Host jetson
    HostName 100.108.162.50
    User uttec
```

### 3. SSH 연결

```bash
# 권장 방법 (SSH Config 설정 후)
ssh jetson

# 또는 IP로 직접 연결
ssh uttec@100.108.162.50
```

### 4. 파일 복사 (SCP)

```bash
# Mac → Jetson
scp myfile.txt jetson:~/

# Jetson → Mac
scp jetson:~/myfile.txt ./

# 폴더 복사
scp -r myfolder jetson:~/
```

---

## Windows에서 연결하기

### 1. Tailscale 설치

1. https://tailscale.com/download/windows 에서 다운로드
2. 설치 후 시스템 트레이의 Tailscale 아이콘 클릭
3. **Log in** 클릭하여 로그인

### 2. 연결 확인

PowerShell 또는 CMD에서:
```powershell
tailscale status
```

### 3. SSH Config 설정 (권장)

`C:\Users\<사용자명>\.ssh\config` 파일 생성/편집:

```
Host jetson
    HostName 100.108.162.50
    User uttec
```

### 4. SSH 연결

#### 방법 A: PowerShell / CMD (권장)
```powershell
ssh jetson
# 비밀번호: uttec
```

#### 방법 B: IP로 직접 연결
```powershell
ssh uttec@100.108.162.50
```

#### 방법 C: PuTTY 사용

1. PuTTY 실행
2. Host Name: `100.108.162.50`
3. Port: `22`
4. Connection type: `SSH`
5. **Open** 클릭
6. 로그인: `uttec` / `uttec`

### 5. 파일 복사 (SCP)

```powershell
# Windows → Jetson
scp C:\path\to\file.txt jetson:~/

# Jetson → Windows
scp jetson:~/file.txt C:\path\to\
```

---

## VS Code Remote SSH 연결

Mac과 Windows 모두 동일:

1. VS Code 설치
2. **Remote - SSH** 확장 설치
3. `F1` → `Remote-SSH: Connect to Host...`
4. `jetson` 입력 (SSH Config 설정된 경우)
5. 비밀번호 입력: `uttec`

> SSH Config 설정이 안 된 경우: `uttec@100.108.162.50` 입력

---

## 유용한 명령어

### Jetson에서 Tailscale 상태 확인
```bash
tailscale status
tailscale ip
```

### Jetson에서 GPU 상태 확인
```bash
tegrastats
```

### CUDA 예제 실행
```bash
cd ~/cuda/week1/code
./hello_cuda
```

---

## 문제 해결

### 연결이 안 될 때

1. Tailscale이 양쪽 모두 연결되어 있는지 확인
   ```bash
   tailscale status
   ```

2. Jetson에서 Tailscale 서비스 확인
   ```bash
   sudo systemctl status tailscaled
   ```

3. Tailscale 재시작
   ```bash
   sudo systemctl restart tailscaled
   ```

### Tailscale IP 변경 시

Admin Console에서 확인: https://login.tailscale.com/admin/machines

---

## 참고

- Tailscale은 NAT 환경에서도 직접 연결 가능
- 같은 Tailscale 네트워크에 있으면 어디서든 접속 가능
- VPN 없이 안전한 P2P 연결 제공

---

*작성일: 2026-02-20*
