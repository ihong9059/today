# SSH와 포트포워딩 가이드

## 1. SSH란?
- SSH(Secure Shell): 원격 컴퓨터에 안전하게 접속하는 프로토콜
- 네트워크를 통해 다른 컴퓨터의 터미널을 사용
- 모든 통신이 암호화되어 안전
- 클라우드 서버(AWS EC2 등), 라즈베리파이 등에 접속할 때 필수

## 2. SSH 클라이언트 설치

### 2.1 Windows
Windows 10/11은 SSH가 기본 내장:
```bash
# 확인
ssh -V
```
설치 안 되어 있으면:
- 설정 > 앱 > 선택적 기능 > "OpenSSH 클라이언트" 추가

또는 PuTTY 사용:
- https://putty.org 에서 다운로드
- GUI로 SSH 접속 가능

### 2.2 SSH 키 생성 (비밀번호 대신 키 인증)
```bash
ssh-keygen -t ed25519 -C "내이메일@email.com"
```
- 저장 위치: Enter (기본값: ~/.ssh/id_ed25519)
- 패스프레이즈: 입력 또는 빈칸(없음)
- 결과:
  - ~/.ssh/id_ed25519 (개인 키 — 절대 공유 금지!)
  - ~/.ssh/id_ed25519.pub (공개 키 — 서버에 등록)

## 3. SSH 기본 사용법

### 3.1 원격 서버 접속
```bash
# 기본 형식
ssh 사용자명@서버IP

# 예시
ssh ubuntu@192.168.1.100
ssh ec2-user@52.78.xxx.xxx

# 포트 지정 (기본: 22)
ssh -p 2222 사용자명@서버IP

# 키 파일 지정
ssh -i ~/.ssh/my-key.pem ubuntu@서버IP
```

### 3.2 파일 전송 (SCP)
```bash
# 로컬 → 서버
scp 로컬파일 사용자명@서버IP:/원격경로/

# 서버 → 로컬
scp 사용자명@서버IP:/원격파일 ./로컬경로/

# 폴더 전체 전송
scp -r 로컬폴더 사용자명@서버IP:/원격경로/
```

### 3.3 SFTP (파일 탐색기처럼)
```bash
sftp 사용자명@서버IP
# 접속 후 명령어
ls        # 원격 파일 목록
lls       # 로컬 파일 목록
get 파일  # 다운로드
put 파일  # 업로드
exit      # 종료
```

## 4. SSH 키 등록

### 4.1 서버에 공개 키 등록
```bash
# 방법 1: ssh-copy-id (가장 간편)
ssh-copy-id 사용자명@서버IP

# 방법 2: 수동 복사
cat ~/.ssh/id_ed25519.pub | ssh 사용자명@서버IP "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

### 4.2 GitHub에 SSH 키 등록
1. 공개 키 복사:
```bash
cat ~/.ssh/id_ed25519.pub
```
2. GitHub > Settings > SSH and GPG keys > "New SSH key"
3. 복사한 공개 키 붙여넣기

4. 연결 테스트:
```bash
ssh -T git@github.com
# "Hi 사용자명! You've successfully authenticated" 메시지 확인
```

## 5. SSH 설정 파일 (~/.ssh/config)

매번 긴 명령을 입력하지 않도록 설정:

```
# ~/.ssh/config 파일
Host my-server
    HostName 52.78.xxx.xxx
    User ubuntu
    IdentityFile ~/.ssh/my-key.pem
    Port 22

Host raspberry
    HostName 192.168.1.50
    User pi
    Port 22

Host aws-gpu
    HostName 13.xxx.xxx.xxx
    User ec2-user
    IdentityFile ~/.ssh/aws-key.pem
```

사용:
```bash
# 이제 간단하게 접속
ssh my-server
ssh raspberry
scp 파일 my-server:/home/ubuntu/
```

## 6. 포트포워딩 (Port Forwarding)

### 6.1 포트포워딩이란?
- 원격 서버의 서비스를 내 PC에서 접근할 수 있게 하는 기술
- 예: 원격 서버에서 실행 중인 웹 서비스를 내 브라우저에서 접근
- 보안 터널 역할 (SSH 암호화)

### 6.2 로컬 포트포워딩 (Local Port Forwarding)
원격 서버의 포트를 내 PC의 포트로 가져오기:
```bash
ssh -L 로컬포트:대상호스트:대상포트 사용자@서버IP
```

예시 1: 원격 서버의 웹 서비스(8080) 접근
```bash
ssh -L 8080:localhost:8080 ubuntu@서버IP
# 이제 내 브라우저에서 http://localhost:8080 접속 가능
```

예시 2: 원격 서버의 Jupyter Notebook 접근
```bash
ssh -L 8888:localhost:8888 ubuntu@서버IP
# 서버에서 jupyter notebook 실행 후
# 내 브라우저에서 http://localhost:8888 접속
```

예시 3: 원격 데이터베이스 접근
```bash
ssh -L 3306:localhost:3306 ubuntu@서버IP
# 내 PC에서 localhost:3306으로 원격 DB 접속 가능
```

### 6.3 리모트 포트포워딩 (Remote Port Forwarding)
내 PC의 서비스를 외부에서 접근 가능하게:
```bash
ssh -R 원격포트:localhost:로컬포트 사용자@서버IP
```

예시: 내 PC의 웹 서버를 외부에 공개
```bash
ssh -R 8080:localhost:3000 ubuntu@서버IP
# 서버IP:8080으로 접속하면 내 PC의 3000번 포트로 연결
```

### 6.4 다이나믹 포트포워딩 (SOCKS 프록시)
```bash
ssh -D 1080 사용자@서버IP
# 브라우저 프록시를 localhost:1080으로 설정하면
# 모든 트래픽이 서버를 경유
```

### 6.5 백그라운드 포트포워딩
```bash
# -f: 백그라운드 실행, -N: 명령 실행 안 함
ssh -f -N -L 8080:localhost:8080 ubuntu@서버IP
```

## 7. 실전 활용 예시

### 7.1 AWS EC2 + Jupyter Notebook
```bash
# 1. EC2 접속 + 포트포워딩
ssh -L 8888:localhost:8888 -i key.pem ec2-user@EC2_IP

# 2. 서버에서 Jupyter 실행
jupyter notebook --no-browser --port=8888

# 3. 내 브라우저에서 접속
# http://localhost:8888
```

### 7.2 라즈베리파이 원격 제어
```bash
# SSH 접속
ssh pi@raspberrypi.local

# 웹 대시보드 포트포워딩
ssh -L 3000:localhost:3000 pi@raspberrypi.local
```

### 7.3 Tailscale (VPN 대안 - 추천)
- SSH 없이도 원격 접근 가능한 메시 VPN
- https://tailscale.com 에서 설치
- 각 디바이스에 100.x.x.x IP 부여
- 포트포워딩 없이 직접 접근 가능
```bash
# Tailscale IP로 바로 SSH 접속
ssh user@100.89.56.69
```

## 8. 보안 주의사항
- 개인 키(id_ed25519)는 절대 공유하지 않기
- 비밀번호 인증보다 키 인증 사용 권장
- 기본 포트(22) 변경 고려 (보안 강화)
- 불필요한 포트포워딩은 종료
- .pem 파일 권한 설정: chmod 400 key.pem (Linux/Mac)

## 9. 자주 묻는 질문
- Q: "Connection refused" 에러 → 서버에서 SSH 서비스 실행 중인지, 방화벽/보안그룹 포트 열려있는지 확인
- Q: "Permission denied (publickey)" → 키 파일 경로 확인, 서버에 공개 키 등록 확인
- Q: 접속이 자꾸 끊겨요 → SSH config에 ServerAliveInterval 60 추가
- Q: Windows에서 .pem 권한 설정은? → 파일 속성 > 보안 > 고급 > 상속 비활성화 > 본인만 읽기 권한

## 10. SSH config 전체 예시 (실무용)
```
# ~/.ssh/config

# 접속 끊김 방지 (전역 설정)
Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3

# AWS EC2
Host aws
    HostName 52.78.xxx.xxx
    User ec2-user
    IdentityFile ~/.ssh/aws-key.pem

# 라즈베리파이 (Tailscale)
Host rpi
    HostName 100.89.56.69
    User uttec

# 포트포워딩 전용 (백그라운드)
Host aws-jupyter
    HostName 52.78.xxx.xxx
    User ec2-user
    IdentityFile ~/.ssh/aws-key.pem
    LocalForward 8888 localhost:8888
```
