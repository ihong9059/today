# Tailscale VPN 가이드

## 1. Tailscale이란?
- WireGuard 기반의 메시 VPN 서비스
- 설치만 하면 어디서든 내 모든 장비에 접속 가능
- SSH 포트포워딩, 방화벽 설정 없이 바로 연결
- 무료 플랜: 최대 100대 장비, 3명 사용자
- "설치하면 끝" — 복잡한 네트워크 설정 불필요

## 2. 왜 Tailscale이 필요한가?
### 2.1 기존 원격 접속의 문제
- SSH는 포트 열기 + 방화벽 설정 + 공인 IP 필요
- 카페에서 회사 서버 접속? → VPN 설정 복잡
- IP가 바뀌면? → DuckDNS 등 추가 설정

### 2.2 Tailscale의 해결책
- 각 장비에 고정 IP 부여 (100.x.x.x)
- 인터넷만 되면 어디서든 접속
- NAT 뒤에 있어도, 공인 IP 없어도 OK
- 포트포워딩 필요 없음
- 양방향 접속 가능 (PC → 서버, 서버 → PC)

### 2.3 SSH vs Tailscale 비교
| 구분 | SSH (일반) | Tailscale + SSH |
|------|-----------|-----------------|
| 공인 IP | 필요 | 불필요 |
| 포트 열기 | 필요 (22번) | 불필요 |
| 방화벽 설정 | 필요 | 불필요 |
| IP 변경 대응 | DuckDNS 등 필요 | 자동 (고정 IP) |
| 설정 난이도 | 중~상 | 하 |
| 보안 | 키 관리 필요 | 자동 암호화 |

## 3. 설치
### 3.1 Windows
1. https://tailscale.com/download 접속
2. "Download for Windows" 클릭
3. 설치 파일 실행 → 설치 완료
4. 시스템 트레이에 Tailscale 아이콘 클릭
5. "Log in" → Google/GitHub/Microsoft 계정으로 로그인
6. 자동으로 100.x.x.x IP 부여됨

### 3.2 Linux (서버/라즈베리파이)
```bash
# 설치 (한 줄)
curl -fsSL https://tailscale.com/install.sh | sh

# 시작
sudo tailscale up

# 브라우저 인증 URL이 표시됨 → 같은 계정으로 로그인
# IP 확인
tailscale ip -4
```

### 3.3 macOS
```bash
# Homebrew로 설치
brew install --cask tailscale
```
또는 App Store에서 "Tailscale" 검색

### 3.4 모바일 (Android/iOS)
- Play Store / App Store에서 "Tailscale" 검색
- 같은 계정으로 로그인
- 스마트폰에서도 서버 접속 가능

## 4. 기본 사용법
### 4.1 장비 목록 확인
```bash
tailscale status
```
또는 https://login.tailscale.com/admin/machines 에서 웹으로 확인

### 4.2 다른 장비에 SSH 접속
```bash
# Tailscale IP로 바로 접속
ssh user@100.79.180.64

# 또는 장비 이름으로 접속
ssh user@myhome-rpi5
```
- 포트포워딩 불필요!
- 방화벽 설정 불필요!

### 4.3 파일 전송
```bash
scp 파일 user@100.79.180.64:/경로/
```

### 4.4 웹 서비스 접근
서버에서 포트 3000으로 웹 서비스 실행 중이라면:
```
브라우저에서: http://100.79.180.64:3000
```
- 로컬 포트포워딩 필요 없음!

## 5. 실전 활용 예시
### 5.1 재택근무 시나리오
- 집에서 Tailscale 설치
- 회사 서버에도 Tailscale 설치
- 집에서 ssh user@100.x.x.x 로 바로 접속
- 회사 웹 서비스도 브라우저로 직접 접속

### 5.2 라즈베리파이 원격 관리
```bash
# 카페에서도
ssh pi@100.79.180.64

# Jupyter 접근
http://100.79.180.64:8888
```

### 5.3 Claude Code 원격 사용
- 서버에 Claude Code 설치
- Tailscale SSH로 접속
- 원격 서버에서 Claude Code 실행

### 5.4 다중 장비 네트워크 예시
```
내 PC (100.100.1.1)
  ├── 사무실 서버 (100.100.1.2)
  ├── 자택 라즈베리파이 (100.100.1.3)
  ├── AWS EC2 (100.100.1.4)
  ├── Jetson Nano (100.100.1.5)
  └── 스마트폰 (100.100.1.6)
```
- 모든 장비가 같은 네트워크 안에 있는 것처럼 동작

## 6. 관리
### 6.1 장비 이름 변경
웹 콘솔 (login.tailscale.com) > 장비 선택 > 이름 변경

### 6.2 장비 제거
```bash
# 장비에서 로그아웃
sudo tailscale logout
```
또는 웹 콘솔에서 삭제

### 6.3 자동 시작 설정
- Windows: 기본으로 시작 시 자동 실행
- Linux:
```bash
sudo systemctl enable tailscaled
```

## 7. 보안
- 모든 통신은 WireGuard로 암호화
- 같은 계정으로 로그인한 장비만 접근 가능
- ACL(접근 제어 목록)으로 세밀한 권한 관리 가능
- 2FA(이중 인증) 지원
- 공인 IP 노출 없음 → 외부 공격 차단

## 8. 요금제
| 플랜 | 비용 | 장비 수 | 사용자 수 |
|------|------|---------|-----------|
| Personal | 무료 | 100대 | 3명 |
| Personal Plus | $48/년 | 100대 | 3명 |
| Starter | $60/년 | 무제한 | 6명+ |
- 개인/소규모 팀은 무료 플랜으로 충분

## 9. 자주 묻는 질문
- Q: 속도가 느리지 않나요? → WireGuard 기반이라 일반 VPN보다 빠름
- Q: 인터넷 없이 사용 가능? → 같은 로컬 네트워크면 가능, 아니면 인터넷 필요
- Q: SSH 키 설정도 해야 하나요? → SSH 키는 여전히 권장 (Tailscale은 네트워크 레이어)
- Q: 회사 네트워크에서 차단되나요? → 대부분 정상 작동 (HTTPS 기반 우회)

## 10. 다음 단계
- [09_Slack_업무협의.md](09_Slack_업무협의.md) - 팀 업무 알림 허브 만들기
