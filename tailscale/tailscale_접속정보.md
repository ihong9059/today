# Tailscale 장치 접속 정보 종합

**최종 업데이트:** 2026-02-06

---

## 등록 장치 목록

| 장치명 | Tailscale IP | OS | 사용자 | 비밀번호 | 상태 |
|:-------|:-------------|:---|:-------|:---------|:----:|
| **myhome-rpi5** | 100.79.180.64 | Linux | uttec | uttec | 온라인 |
| **office-rpi4** | 100.73.114.75 | Linux | uttec | uttec | 온라인 |
| **lenovo-tab-m9** | 100.112.196.53:8022 | Android | u0_a286 | uttec | 온라인 |
| **samsung-sm-a516n** | 100.117.189.72 | Android | - | - | 온라인 |
| **office-dell** | 100.89.156.126 | Windows | - | - | 온라인 |
| **macbookpro** | 100.124.44.55 | macOS | maeg | - | 온라인 |
| **myhome-lenovo** | 100.82.193.50 | Windows | - | - | 가변 |
| **office-mac** | 100.108.139.43 | macOS | - | - | 가변 |
| **home-linux** | 100.67.68.70 | Linux | - | - | 가변 |

---

## 빠른 접속 명령어

### Raspberry Pi 5 (집)
```bash
ssh uttec@myhome-rpi5
# 또는
ssh uttec@100.79.180.64
```
- 비밀번호: `uttec`

### Raspberry Pi 4 (사무실)
```bash
ssh uttec@office-rpi4
# 또는
ssh uttec@100.73.114.75
```
- 비밀번호: `uttec`

### Lenovo Tablet (Termux SSH)
```bash
ssh -p 8022 u0_a286@100.112.196.53
```
- 포트: 8022 (Termux 기본)
- 비밀번호: `uttec`

---

## SSH Config 설정 (권장)

`~/.ssh/config` 파일에 추가:

```
# 집 Raspberry Pi 5
Host myhome-rpi5
    HostName 100.79.180.64
    User uttec
    StrictHostKeyChecking no

# 사무실 Raspberry Pi 4
Host office-rpi4
    HostName 100.73.114.75
    User uttec
    StrictHostKeyChecking no

# Lenovo Tablet (Termux)
Host lenovo-tab
    HostName 100.112.196.53
    User u0_a286
    Port 8022
    StrictHostKeyChecking no
```

설정 후 간단히 접속:
```bash
ssh myhome-rpi5
ssh office-rpi4
ssh lenovo-tab
```

---

## 대체 접속 방법 (Tailscale 안 될 때)

### 집 공인 IP로 접속

| 장치 | 공인 IP | 포트 | 명령어 |
|:-----|:--------|:----:|:-------|
| 집 Rpi5 | 121.137.66.41 | 5555 | `ssh -p 5555 uttec@121.137.66.41` |
| 집 Rpi5 | 121.137.66.41 | 4441 | `ssh -p 4441 uttec@121.137.66.41` |

### 사무실 공인 IP로 접속

| 장치 | 공인 IP | 포트 | 명령어 |
|:-----|:--------|:----:|:-------|
| 사무실 Rpi5 | 221.163.229.213 | 2222 | `ssh -p 2222 uttec@221.163.229.213` |

---

## Tailscale 문제 해결

### 1. 상태 확인
```bash
tailscale status
```

### 2. 로그아웃 상태일 때
```bash
# 방법 1: 일반 로그인
tailscale login

# 방법 2: sudo로 시작
sudo tailscale up

# 방법 3: 인증 키 사용 (브라우저 문제 시)
sudo tailscale up --authkey=tskey-auth-xxxxx
```

### 3. 연결 끊김 시
```bash
sudo tailscale down
sudo tailscale up
```

### 4. 특정 장치 ping 테스트
```bash
tailscale ping myhome-rpi5
```

### 5. 네트워크 진단
```bash
tailscale netcheck
```

---

## 유용한 명령어

| 명령어 | 설명 |
|:-------|:-----|
| `tailscale status` | 모든 장치 목록 및 상태 |
| `tailscale ip` | 자신의 Tailscale IP |
| `tailscale ping <장치명>` | 특정 장치 ping |
| `tailscale netcheck` | 네트워크 연결 진단 |
| `sudo tailscale up` | Tailscale 연결 |
| `sudo tailscale down` | Tailscale 연결 해제 |
| `tailscale logout` | 로그아웃 |

---

## 관련 문서

- [tailscale_ssh_guide.md](./tailscale_ssh_guide.md) - OS별 설치 및 접속 가이드
- [tailscale_ip_확인방법.md](./tailscale_ip_확인방법.md) - IP 확인 방법

---

## Tailscale 관리

- **웹 콘솔**: https://login.tailscale.com/admin/machines
- **계정**: ihong9059@gmail.com

---

*작성일: 2026-02-06*
