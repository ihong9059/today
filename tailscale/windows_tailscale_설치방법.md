# Windows PC에 Tailscale 설치하기

신규 Windows PC에 Tailscale을 설치하고 기존 네트워크에 연결하는 방법을 안내합니다.

---

## 사전 준비

| 항목 | 설명 |
|:-----|:-----|
| Windows 버전 | Windows 10 이상 권장 (Windows 7/8도 가능) |
| 인터넷 연결 | 필수 (설치 및 인증에 필요) |
| 계정 | Google, Microsoft, GitHub 등 로그인용 계정 |
| 관리자 권한 | 설치 시 필요 |

---

## 1단계: Tailscale 다운로드

### 방법 1: 공식 웹사이트에서 다운로드

1. 웹 브라우저에서 **https://tailscale.com/download** 접속
2. **Windows** 버튼 클릭
3. `tailscale-setup-x.xx.x.exe` 파일 다운로드

### 방법 2: Microsoft Store에서 설치

1. Microsoft Store 앱 실행
2. 검색창에 **"Tailscale"** 입력
3. **Tailscale** 앱 선택 후 **설치** 클릭

```
💡 권장: 공식 웹사이트에서 다운로드
   - 최신 버전 보장
   - 설치 옵션 더 다양
```

---

## 2단계: 설치 진행

### 설치 마법사 실행

1. 다운로드한 `tailscale-setup-x.xx.x.exe` 실행
2. **사용자 계정 컨트롤(UAC)** 창이 뜨면 **예** 클릭

```
┌─────────────────────────────────────────┐
│     Tailscale Setup                     │
│                                         │
│  ☑ Install Tailscale                   │
│  ☐ Add to startup (권장)               │
│                                         │
│           [Install]  [Cancel]           │
└─────────────────────────────────────────┘
```

3. **Install** 버튼 클릭
4. 설치 완료까지 약 30초~1분 소요

### 설치 완료 후

- 시스템 트레이(우측 하단)에 Tailscale 아이콘 표시
- 자동으로 Tailscale 앱이 실행됨

```
시스템 트레이 아이콘:
┌──────────────────────────────────┐
│  ...  🔔  📶  🔊  ⬆️(Tailscale)  │
└──────────────────────────────────┘
```

---

## 3단계: Tailscale 로그인

### 로그인 진행

1. 시스템 트레이의 **Tailscale 아이콘** 클릭
2. **Log in** 버튼 클릭

```
┌─────────────────────────────────┐
│  Tailscale                      │
│                                 │
│  Not connected                  │
│                                 │
│        [ Log in ]               │
│                                 │
└─────────────────────────────────┘
```

3. 웹 브라우저가 자동으로 열림
4. 로그인 방법 선택:

```
┌─────────────────────────────────────────┐
│      Sign in to Tailscale               │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  🔵 Sign in with Google         │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  📘 Sign in with Microsoft      │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  🐙 Sign in with GitHub         │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │  📧 Sign in with Email          │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 기존 네트워크에 연결하기

> **중요**: 기존 Tailscale 네트워크에 연결하려면 **같은 계정**으로 로그인해야 합니다.

| 상황 | 해결 방법 |
|:-----|:----------|
| 개인 네트워크 | 기존에 사용하던 동일 계정으로 로그인 |
| 팀/조직 네트워크 | 조직에서 초대받은 계정으로 로그인 |
| 새 네트워크 생성 | 원하는 계정으로 로그인 (새 네트워크 자동 생성) |

5. 로그인 완료 후 **"Success!"** 메시지 확인
6. 브라우저 창 닫아도 됨

---

## 4단계: 연결 확인

### Tailscale 상태 확인

1. 시스템 트레이의 **Tailscale 아이콘** 클릭
2. 연결 상태 확인

```
┌─────────────────────────────────────┐
│  Tailscale                          │
│                                     │
│  ✅ Connected                       │
│                                     │
│  This machine: windows-pc           │
│  IP: 100.xx.xx.xx                   │
│                                     │
│  ─────────────────────────────────  │
│  📱 macbook-pro      100.82.193.50  │
│  🖥️ linux-server     100.xx.xx.xx  │
│  💻 my-pc            100.xx.xx.xx  │
│                                     │
└─────────────────────────────────────┘
```

### 명령 프롬프트에서 확인

```powershell
# Tailscale 상태 확인
tailscale status

# 출력 예시:
# 100.xx.xx.xx    windows-pc        현재기기
# 100.82.193.50   macbook-pro       online
# 100.xx.xx.xx    linux-server      online
```

```powershell
# Tailscale IP 확인
tailscale ip

# 출력 예시:
# 100.xx.xx.xx
```

### 연결 테스트

```powershell
# 다른 Tailscale 기기에 ping 테스트
ping 100.82.193.50

# 성공 시 출력:
# Reply from 100.82.193.50: bytes=32 time=15ms TTL=64
```

---

## 5단계: 추가 설정 (선택사항)

### 기기 이름 변경

기본적으로 컴퓨터 이름이 Tailscale 기기 이름으로 사용됩니다.

**웹 관리 콘솔에서 변경:**
1. https://login.tailscale.com/admin/machines 접속
2. 해당 기기의 **...** 메뉴 클릭
3. **Edit machine name** 선택
4. 원하는 이름 입력 후 저장

### Windows 시작 시 자동 실행

1. 시스템 트레이의 Tailscale 아이콘 우클릭
2. **Preferences** 클릭
3. **Run at login** 체크 확인 (기본값: 활성화)

```
┌─────────────────────────────────────┐
│  Tailscale Preferences              │
│                                     │
│  ☑ Run at login                    │
│  ☑ Accept routes                   │
│  ☐ Use Tailscale DNS               │
│  ☐ Allow incoming connections      │
│                                     │
└─────────────────────────────────────┘
```

### SSH 서버 활성화 (원격 접속 허용)

다른 기기에서 이 Windows PC로 SSH 접속하려면:

1. Windows에 OpenSSH 서버 설치 필요
2. 설정 > 앱 > 선택적 기능 > 기능 추가
3. **OpenSSH 서버** 선택 후 설치
4. 서비스에서 **OpenSSH SSH Server** 시작

```powershell
# PowerShell (관리자 권한)에서 OpenSSH 서버 설치
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# SSH 서버 시작
Start-Service sshd

# 자동 시작 설정
Set-Service -Name sshd -StartupType 'Automatic'
```

---

## 문제 해결

### 자주 발생하는 문제

| 증상 | 원인 | 해결 방법 |
|:-----|:-----|:----------|
| 연결 안 됨 | 인터넷 연결 문제 | 인터넷 연결 확인 |
| 다른 기기 안 보임 | 다른 계정으로 로그인 | 같은 계정으로 재로그인 |
| 설치 실패 | 관리자 권한 없음 | 관리자 권한으로 실행 |
| ping 안 됨 | 방화벽 차단 | Windows 방화벽에서 Tailscale 허용 |

### 로그 확인

```powershell
# Tailscale 로그 위치
%LOCALAPPDATA%\Tailscale\Logs\

# 또는 이벤트 뷰어에서 확인
eventvwr.msc > Windows 로그 > 응용 프로그램
```

### Tailscale 재시작

```powershell
# 서비스 재시작 (PowerShell 관리자 권한)
Restart-Service Tailscale
```

### 완전 재설치

1. 설정 > 앱 > Tailscale > 제거
2. `%LOCALAPPDATA%\Tailscale` 폴더 삭제
3. PC 재시작
4. 1단계부터 다시 진행

---

## 연결 구성도

```
┌────────────────────────────────────────────────────────────┐
│                    Tailscale 네트워크                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [기존 Mac]              [신규 Windows PC]                 │
│  100.82.193.50           100.xx.xx.xx                     │
│      │                        │                           │
│      │    ┌────────────────┐  │                           │
│      └───→│  암호화된 터널  │←─┘                           │
│           │  (WireGuard)   │                              │
│           └────────────────┘                              │
│                                                            │
│  같은 계정으로 로그인 → 자동으로 같은 네트워크에 연결       │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 요약 체크리스트

- [ ] Tailscale 다운로드 및 설치
- [ ] 기존 네트워크와 **동일한 계정**으로 로그인
- [ ] 시스템 트레이에서 "Connected" 상태 확인
- [ ] `tailscale status`로 다른 기기 목록 확인
- [ ] ping 테스트로 연결 확인
- [ ] (선택) 기기 이름 변경
- [ ] (선택) SSH 서버 활성화

---

*작성일: 2026-02-13*
