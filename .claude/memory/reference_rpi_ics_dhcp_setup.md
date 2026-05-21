---
name: RPi 본체 ethernet + ICS DHCP 셋업 (Wi-Fi 인터넷 공유)
description: PC 본체 ethernet(이더넷 6 = Intel I219-V)으로 RPi 연결 + Wi-Fi 4 ICS 활성화. RPi가 DHCP IP 자동 부여 + 인터넷 공유까지. 2026-05-21 검증 완료
type: reference
originSessionId: c8e21a73-5f24-4c8e-a3f1-d8e57f9b2c44
---

# RPi 본체 ethernet + ICS DHCP 셋업

**규칙**: RPi 측 셋업 변경 없이 LAN 케이블만 꽂으면 자동으로 SSH 접속 가능. 인터넷 공유 보너스 (RPi에서 apt update 가능). USB ethernet 직결(static IP)과 별개의 시나리오.

**Why**: 2026-05-21 RPi 3 B+ 접속 셋업 시 두 방식 모두 검증. USB ethernet 직결(`reference_rpi_usb_ethernet_direct.md`)은 RPi 측에 static IP 셋업 필요. ICS DHCP는 RPi 측 변경 0 + 인터넷 공유 추가 — 가장 편리. 사용자가 이전에 사용했던 방식.

## 본 PC 자산 (myhome-lenovo, 2026-05-21 박제)

| 어댑터 | 역할 | 정보 |
|---|---|---|
| **Wi-Fi 4** | 인터넷 측 (ICS source) | Intel Wi-Fi 6 AX201, SSID "TP_tester", "공유됨" 상태 |
| **이더넷 6** | RPi 측 (ICS target) | Intel I219-V (내장), MAC 74-5D-22-17-D8-79, ICS 활성 시 192.168.137.1/24 |
| 이더넷 9 | (별개 시나리오) USB ethernet 직결용 | Realtek USB GbE, 10.0.0.1/24 |

→ 두 시나리오 (이더넷 6 ICS · 이더넷 9 USB 직결) 동시 사용 가능. 서로 독립.

## 검증된 RPi 3 정체 (2026-05-21 셋업)

| 항목 | 값 |
|---|---|
| Hostname | `uttec` (FQDN: `uttec.mshome.net` — Windows ICS 기본 도메인) |
| MAC | **B8-27-EB-25-F8-4C** (Raspberry Pi Foundation OUI) |
| 부여된 IP | 192.168.137.248 |
| SSH user | `uttec` |
| SSH 접속 | `ssh uttec@192.168.137.248` 또는 `ssh uttec@uttec.mshome.net` |

⚠️ IP는 DHCP 부여라 매번 다를 수 있음. 셋업 시 `arp -a | findstr 192.168.137`로 확인.

## 셋업 절차 (4단계 GUI, 5분)

### 1단계 — 물리 연결

LAN 케이블을 PC 본체 RJ-45 포트(이더넷 6)와 RPi의 eth0에 꽂기.

→ Get-NetAdapter "이더넷 6" 으로 Status = Up + MediaConnectionState = Connected 확인.

### 2단계 — 네트워크 연결 창

`Win+R` → `ncpa.cpl` → Enter

### 3단계 — Wi-Fi 4 공유 활성화

1. **`Wi-Fi 4` 우클릭** → **속성**
2. 상단 **공유** 탭
3. ✅ **"다른 네트워크 사용자가 이 컴퓨터의 인터넷 연결을 통해 연결할 수 있도록 허용"** 체크
4. **홈 네트워킹 연결**: 드롭다운에서 **`이더넷 6`** 선택
5. **확인**

→ Windows가 자동으로:
- 이더넷 6 IP를 **192.168.137.1/24**로 변경
- 이더넷 6에 DHCP 서버 + NAT gateway 활성화
- 네트워크 연결 창에서 Wi-Fi 4 옆에 **"공유됨"** 표시

### 4단계 — RPi 부팅·DHCP 받기 + IP 확인

1분 대기 (RPi가 DHCP 요청·응답). PC에서 확인:

```powershell
# RPi MAC (b8:27:eb 또는 dc:a6:32 또는 e4:5f:01)으로 IP 찾기
arp -a | findstr "192.168.137"
# 또는 모든 RPi MAC 후보
arp -a | findstr -i "b8-27-eb dc-a6-32 e4-5f-01 d8-3a-dd"

# Get-NetNeighbor로 더 명확
Get-NetNeighbor -InterfaceAlias "이더넷 6" | Where-Object {$_.LinkLayerAddress -like "B8-27-EB-*" -or $_.LinkLayerAddress -like "DC-A6-32-*" -or $_.LinkLayerAddress -like "E4-5F-01-*"}
```

→ RPi IP (예: 192.168.137.248) 확인 후 SSH 접속:

```
ssh uttec@192.168.137.248
```

또는 hostname (mDNS·NetBIOS):
```
ssh uttec@uttec.mshome.net    # Windows ICS 기본 도메인
ssh uttec@raspberrypi.local   # mDNS (avahi 설치 시)
```

## 두 시나리오 비교 (어느 걸 선택?)

| 항목 | 이 reference (이더넷 6 + ICS) | `reference_rpi_usb_ethernet_direct.md` (이더넷 9 USB) |
|---|---|---|
| PC 측 어댑터 | 본체 ethernet (Intel I219-V) | USB ethernet (Realtek GbE) |
| PC 측 IP | 192.168.137.1/24 (ICS auto) | 10.0.0.1/24 (static) |
| RPi 측 셋업 | **변경 0** (DHCP client 기본) | static IP 10.0.0.2/24 셋업 필요 |
| RPi 인터넷 | ✅ 가능 (NAT gateway) | ❌ 불가 (직결만) |
| 셋업 비용 | GUI 5단계 (PC 측만) | RPi 측 + PC 측 |
| 사용 시점 | 일반 작업·apt update 필요 시 | 격리·보안·외부 노출 0 필요 시 |

→ **일반 사용**: 본 reference (ICS) 권장. RPi 측 셋업 변경 없음 + 인터넷 가능.
→ **격리 작업**: USB ethernet (static).

## "식별되지 않은 네트워크" 메시지는 정상

이더넷 6에 "식별되지 않은 네트워크" 표시 나옴. Windows가 일반 인터넷·DNS 확인 못 해서 다는 default 레이블. **DHCP 서버·NAT gateway 역할은 100% 정상**. ICS 활성화 후 항상 이렇게 보임.

## ICS 해제 (필요 시)

```
ncpa.cpl → Wi-Fi 4 우클릭 → 속성 → 공유 탭 → 체크 해제 → 확인
```

→ 이더넷 6 IP가 자동으로 link-local (169.254.x.x)로 돌아감.

## 사고 패턴 (주의)

1. **RPi 전원 꺼져있음** — link 잡혔지만 DHCP 요청 안 함. RPi LED 확인 (빨강 = 전원, 초록 = activity).
2. **RPi 부팅 시간** — 30~60초 대기 후 ARP 재확인 (`arp -a`).
3. **ICS와 Hyper-V 충돌** — vEthernet (Default Switch) 같은 Hyper-V 어댑터와 192.168.137.x 충돌 가능. 본 PC는 충돌 없음 검증됨.
4. **ICS는 사용자 세션 의존** — Windows 재부팅 후 활성 유지되지만, 일부 케이스에서 SharedAccess 서비스 재시작 필요. `Restart-Service SharedAccess`.
5. **이미 Wi-Fi 4에서 다른 어댑터 공유 중** — 한 번에 하나만 공유 가능. 이전 공유 해제 필요.
6. **ICS 활성화 시 충돌 dialog** — "이미 192.168.137.x 사용 중" 같은 경고. 다른 네트워크와 충돌이면 ICS 못 활성. 본 PC는 충돌 없음.

## 검증 명령 (전체 셋업 정상 확인)

```powershell
# 1. ICS 활성 확인
Get-NetIPAddress -InterfaceAlias "이더넷 6" -AddressFamily IPv4
# → IPAddress: 192.168.137.1 / PrefixLength: 24

# 2. RPi 발견
arp -a | findstr "192.168.137"
# → 192.168.137.x b8-27-eb-XX-XX-XX (RPi)

# 3. SSH port 22 reachable
Test-NetConnection -ComputerName 192.168.137.248 -Port 22
# → TcpTestSucceeded: True

# 4. RPi에서 인터넷 가능 (ssh 접속 후)
# ssh uttec@192.168.137.248 후 RPi에서: ping -c 2 8.8.8.8
```

## 관련 자산

- `reference_rpi_usb_ethernet_direct.md` — USB ethernet 직결 (static IP, 격리 모드)
- `myWiki/second-brain/entities/서버인프라.md` — 5 PC·RPi 인프라 종합
- `myWiki/second-brain/entities/tailscale네트워크.md` — Tailscale 메시
- `myWiki/second-brain/entities/shield.md` — shield 보드 (다른 RPi 용도)

## 메타

| 항목 | 값 |
|---|---|
| 본 reference 신설 | 2026-05-21 (RPi 3 B+ 셋업 megasession) |
| 검증 환경 | myhome-lenovo Windows 11 + Wi-Fi 4 (TP_tester) + 이더넷 6 (Intel I219-V) + RPi 3 B+ |
| 다음 검증 후보 | 다른 PC (office-dell 등)에서 같은 절차 + 다른 OS RPi (Ubuntu) |
