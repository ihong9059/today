# Day 2: 원격 서버 접속 + 설정 — "내 서버가 생겼다"

## 학습 목표
- DigitalOcean에서 클라우드 서버(Droplet)를 생성할 수 있다
- SSH 키 기반 인증으로 안전하게 서버에 접속한다
- ufw 방화벽을 설정하여 기본 보안을 구성한다
- 서버 초기 설정(사용자 생성, 패키지 업데이트)을 수행한다

## 준비물
- DigitalOcean 계정 (GitHub Student Pack 또는 $200 크레딧)
- WSL2 터미널
- Claude Code CLI

## 실습 1: SSH 키 생성 및 서버 생성 (30분)

1. SSH 키 쌍을 생성한다

```bash
ssh-keygen -t ed25519 -C "student@aiclass" -f ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
```

2. DigitalOcean 대시보드에서 Droplet을 생성한다
   - Region: Singapore (sgp1)
   - Image: Ubuntu 22.04 LTS
   - Size: Basic $6/mo (1GB RAM, 25GB SSD)
   - SSH Key: 위에서 생성한 공개키 등록

3. 서버 IP를 확인하고 접속을 테스트한다

```bash
ssh root@YOUR_SERVER_IP
```

4. Claude Code에게 SSH 설정 파일을 만들게 한다

```
Claude에게: "~/.ssh/config 파일을 만들어줘. 호스트명은 myserver, IP는 xxx.xxx.xxx.xxx, 사용자는 root, 키 파일은 ~/.ssh/id_ed25519 로 설정해줘"
```

### 관찰 포인트
- 비밀번호 인증 대비 SSH 키 인증의 장점은?
- SSH config 파일이 있으면 접속 명령이 어떻게 짧아지는가?

## 실습 2: 서버 초기 보안 설정 (40분)

1. 서버에 접속하여 시스템을 업데이트한다

```bash
ssh myserver
apt update && apt upgrade -y
```

2. 일반 사용자를 생성하고 sudo 권한을 부여한다

```bash
adduser deploy
usermod -aG sudo deploy
```

3. 새 사용자에게 SSH 키를 복사한다

```bash
mkdir -p /home/deploy/.ssh
cp ~/.ssh/authorized_keys /home/deploy/.ssh/
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

4. Claude Code에게 SSH 보안 강화를 요청한다

```
Claude에게: "서버의 /etc/ssh/sshd_config를 수정해서 root 로그인을 비활성화하고, 비밀번호 인증을 끄는 설정을 만들어줘. 변경 전후를 비교해서 보여줘."
```

### 관찰 포인트
- root 직접 로그인을 비활성화하는 이유는?
- authorized_keys 파일의 권한이 600이어야 하는 이유는?

## 실습 3: 방화벽(ufw) 설정 (30분)

1. ufw를 활성화하고 기본 규칙을 설정한다

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose
```

2. Claude Code에게 방화벽 상태를 분석하게 한다

```
Claude에게: "현재 서버의 ufw 방화벽 상태를 확인하고, 웹 서버 운영에 필요한 포트가 모두 열려있는지 점검해줘. 불필요한 포트가 열려있으면 알려줘."
```

3. 특정 IP에서만 SSH를 허용하도록 규칙을 추가한다

```bash
sudo ufw delete allow 22/tcp
sudo ufw allow from YOUR_HOME_IP to any port 22
sudo ufw status numbered
```

### 관찰 포인트
- ufw enable 전에 반드시 SSH 포트를 열어야 하는 이유는?
- deny incoming이 기본인 이유는?

## 실습 4: 서버 상태 모니터링 기초 (20분)

1. 서버 리소스를 확인한다

```bash
free -h
df -h
top -bn1 | head -20
uptime
```

2. Claude Code로 서버 건강 진단을 한다

```
Claude에게: "서버에 SSH 접속해서 CPU, 메모리, 디스크 사용량을 확인하고 종합 리포트를 만들어줘. 주의할 항목이 있으면 경고해줘."
```

### 관찰 포인트
- free -h에서 available과 free의 차이는?
- 디스크 사용량이 몇 % 이상이면 위험한가?

## 과제

### 제출물: "서버 초기 설정 체크리스트"

```markdown
# 서버 초기 설정 체크리스트

## 서버 정보
- IP:
- Region:
- OS:
- 사양:

## 보안 설정 완료 여부
- [ ] SSH 키 기반 인증 설정
- [ ] root 직접 로그인 비활성화
- [ ] 비밀번호 인증 비활성화
- [ ] 일반 사용자(deploy) 생성 + sudo 권한
- [ ] ufw 방화벽 활성화
- [ ] 필요 포트만 개방 (22, 80, 443)

## ufw 상태 캡처
(ufw status verbose 출력 붙여넣기)

## SSH config 내용
(~/.ssh/config 내용 붙여넣기)

## 서버 리소스 현황
| 항목 | 값 |
|------|-----|
| 메모리 | |
| 디스크 | |
| CPU | |
```

## 강사 참고 사항
- DigitalOcean 크레딧이 없는 학생은 강사 계정에서 Droplet을 생성해줄 수 있다
- ufw enable 시 SSH 포트를 안 열고 활성화하면 접속 불가 — 반드시 순서를 강조한다
- SSH 키 생성 시 passphrase 설정을 권장하되, 실습 편의상 생략 가능하다
