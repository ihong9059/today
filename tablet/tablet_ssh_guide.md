# Lenovo Tablet SSH 연결 가이드

**작성일:** 2026-02-03

---

## 태블릿 정보

| 항목 | 내용 |
|:-----|:-----|
| 모델 | Lenovo TB310FU |
| Android 버전 | 13 |
| Tailscale IP | 100.112.196.53 |

---

## 1단계: Termux 설치

### 방법 A: F-Droid에서 설치 (권장)

1. 태블릿 브라우저에서 https://f-droid.org/packages/com.termux/ 접속
2. APK 다운로드 및 설치
3. Play Store 버전은 오래되어 권장하지 않음

### 방법 B: ADB로 설치

```bash
# PC에서 실행
adb install termux.apk
```

---

## 2단계: Termux에서 SSH 서버 설정

태블릿의 Termux 앱에서 아래 명령어 실행:

```bash
# 패키지 업데이트
pkg update && pkg upgrade

# OpenSSH 설치
pkg install openssh

# 비밀번호 설정
passwd
# 원하는 비밀번호 입력 (예: uttec)

# SSH 서버 시작
sshd

# SSH 서버 상태 확인
ps aux | grep sshd
```

---

## 3단계: PC에서 SSH 접속

### Tailscale 네트워크를 통한 접속

```bash
ssh -p 8022 100.112.196.53
```

### 접속 정보

| 항목 | 값 |
|:-----|:---|
| IP | 100.112.196.53 |
| 포트 | 8022 (Termux 기본) |
| 인증 | 비밀번호 |

---

## 자동 시작 설정 (선택)

Termux에서 부팅 시 자동으로 SSH 서버 시작:

```bash
# Termux:Boot 앱 설치 필요 (F-Droid)
mkdir -p ~/.termux/boot
echo "sshd" > ~/.termux/boot/start-sshd.sh
chmod +x ~/.termux/boot/start-sshd.sh
```

---

## SSH 키 인증 설정 (선택)

### PC에서 공개키 복사

```bash
# PC의 공개키를 태블릿으로 전송
ssh-copy-id -p 8022 100.112.196.53
```

### 또는 수동으로 설정

```bash
# PC에서
cat ~/.ssh/id_rsa.pub

# 태블릿 Termux에서
mkdir -p ~/.ssh
echo "공개키내용" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## 트러블슈팅

### SSH 연결 거부

```bash
# Termux에서 SSH 서버 재시작
pkill sshd
sshd
```

### 포트 확인

```bash
# Termux에서
netstat -tlnp | grep 8022
```

### Tailscale 연결 확인

```bash
# PC에서
ping 100.112.196.53
```

---

## 유용한 명령어

```bash
# 파일 전송 (PC → 태블릿)
scp -P 8022 file.txt 100.112.196.53:~/

# 파일 전송 (태블릿 → PC)
scp -P 8022 100.112.196.53:~/file.txt ./

# 디렉토리 전송
scp -P 8022 -r folder/ 100.112.196.53:~/
```

---

*Tailscale VPN을 통해 어디서든 태블릿에 접속 가능*
