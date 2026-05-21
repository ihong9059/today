---
name: RPi USB ethernet 직결 셋업 가이드 (PC ↔ RPi 1:1 SSH)
description: Windows PC와 RPi를 USB-to-Ethernet 어댑터로 직접 연결해 SSH 접속. Tailscale·Wi-Fi 무관. 미래 새 RPi 셋업 시 즉시 적용
type: reference
originSessionId: c8e21a73-5f24-4c8e-a3f1-d8e57f9b2c44
---

# RPi USB ethernet 직결 셋업 가이드

**규칙**: PC ↔ RPi 직결 SSH가 필요할 때 본 절차 따름. 외부 인터넷·Tailscale·Wi-Fi 없이도 작동. 1 Gbps 안정 대역.

**Why**: 2026-05-21 사건에서 본 PC가 이미 USB ethernet 직결 셋업되어 있음을 발견 (`Host rasp_b3_direct`, 어댑터 10.0.0.1/24). 미래 다른 RPi 추가 시 같은 패턴 재사용 가능. 셋업 절차를 잊으면 매번 재발견 비용. 본 reference로 즉시 적용.

## 본 PC 기존 자산 (myhome-lenovo, 2026-05-21 박제)

| 항목 | 값 |
|---|---|
| USB ethernet 어댑터 | Realtek USB GbE Family Controller (이더넷 9) |
| 어댑터 MAC | 00-E0-4C-AA-7C-23 |
| PC 측 IP | **10.0.0.1/24** (static) |
| Gateway | 없음 (직결 전용, 인터넷 공유 안 함) |
| SSH alias 등록 | `Host rasp_b3_direct HostName 10.0.0.2 User uttec` |
| SSH config 위치 | `C:\Users\lenovo\.ssh\config` |

→ 새 RPi 추가 시 PC 측 추가 셋업 불필요 (이미 됨). RPi 측만 셋업하면 즉시 사용.

## 새 RPi 셋업 4단계

### 1. 물리 연결

```
[PC USB 포트] ─USB케이블─ [USB-to-Ethernet 어댑터] ─LAN케이블─ [RPi eth0]
```

⚠️ USB 케이블·LAN 케이블 양 끝 단단히 (흔한 사고 원인).

### 2. PC 측 (다른 PC에서 신규 셋업할 때만)

본 PC(myhome-lenovo)는 이미 셋업됨. 다른 PC에서 신규 셋업 시:

```powershell
# Windows PowerShell 관리자 권한
$adapter = Get-NetAdapter | Where-Object {$_.InterfaceDescription -like "*USB*GbE*" -or $_.InterfaceDescription -like "*USB*Ethernet*"}
New-NetIPAddress -InterfaceIndex $adapter.ifIndex -IPAddress 10.0.0.1 -PrefixLength 24
```

### 3. RPi 측 IP 셋업 (3 옵션 중 택1)

#### A. Raspberry Pi OS (dhcpcd 기반)

```bash
sudo nano /etc/dhcpcd.conf
# 파일 끝에 추가:
interface eth0
static ip_address=10.0.0.2/24
# (gateway 없음)

sudo systemctl restart dhcpcd
```

#### B. Ubuntu 22.04+ (netplan)

```bash
sudo nano /etc/netplan/99-direct-pc.yaml
```
```yaml
network:
  version: 2
  ethernets:
    eth0:
      addresses: [10.0.0.2/24]
      dhcp4: false
```
```bash
sudo netplan apply
```

#### C. mDNS (zero-config, 가장 간단)

```bash
sudo apt install avahi-daemon avahi-utils -y
sudo systemctl enable --now avahi-daemon
```
→ PC에서 `ssh uttec@raspberrypi.local` 로 접속 (Windows 10/11 Bonjour 자동 지원).

### 4. PC SSH config 등록

```
# C:\Users\lenovo\.ssh\config 에 추가
Host new-rpi-direct
    HostName 10.0.0.3        # RPi 측 설정한 IP (10.0.0.2가 이미 점유면 .3, .4…)
    User uttec
    StrictHostKeyChecking no
    UserKnownHostsFile /dev/null
```

→ `ssh new-rpi-direct` 한 줄로 접속.

## 여러 RPi 동시 사용

LAN 케이블 1:1 직결이라 USB 어댑터 1개에 1 RPi만. 동시 여러 RPi 필요하면:
- 옵션 A: 작은 switch 사용 (5포트 unmanaged switch 1만원대) — 어댑터 → switch → 여러 RPi (각 RPi가 다른 IP)
- 옵션 B: 여러 USB ethernet 어댑터 (PC에 USB 포트만큼) — 각 어댑터 다른 subnet (10.0.0.x · 10.0.1.x · 10.0.2.x)
- 옵션 C: 교대 사용 (가장 흔함) — 1개 어댑터에 1 RPi씩 교체

## 사용 시나리오

| 상황 | 직결 방식 장점 |
|---|---|
| 외부 인터넷 없는 환경 (현장·이동) | 인터넷 없이도 작업 |
| 새 RPi 초기 셋업 | Tailscale 깔기 전 IP 모를 때 |
| Wi-Fi 불안정 fallback | 1 Gbps 안정 |
| 대용량 파일 복사 (rsync·scp) | Wi-Fi/Tailscale보다 빠름 |
| 보안 강화 | 외부 노출 0 (로컬 cable 직결) |
| 모니터·키보드 없이 headless 셋업 | mDNS + SSH 만으로 가능 |

## 사고 패턴 (주의)

1. **gateway 설정 금지** — RPi의 default gateway를 10.0.0.1로 잡으면 RPi가 PC를 통해 인터넷 가려 함 → PC가 ICS(인터넷 공유) 설정 안 했으면 RPi 인터넷 끊김. 직결만 쓰려면 gateway 비움.
2. **eth0 vs eth1 혼동** — RPi에 내장 LAN 포트가 eth0. USB ethernet 어댑터 추가하면 eth1. 명령에서 정확한 인터페이스 명시.
3. **MAC 변경 → IP 못 받음** — 어댑터 교체 시 dhcpcd가 새 MAC을 다른 device로 인식 → hostname 충돌 가능. `sudo dhclient eth0` 재시도.
4. **케이블 풀림** — USB 케이블·LAN 케이블 흔히 헐거움. 사고 시 가장 먼저 점검.
5. **방화벽 mDNS 차단** — Windows firewall이 mDNS 차단하면 옵션 C 안 됨. inbound UDP 5353 허용.
6. **USB ethernet은 부팅 시 인식 지연** — RPi 부팅 직후 USB ethernet이 안 잡히면 30초 대기 후 `ip link show` 재확인.

## 본 PC 기존 alias 활용

집에서 새 RPi 테스트할 때:
- USB ethernet 어댑터 PC에 꽂혀있는지 확인 (`Get-NetAdapter` → "이더넷 9" Up)
- 새 RPi의 eth0를 10.0.0.2로 셋업 → 기존 `rasp_b3_direct` alias 그대로 사용
- 또는 10.0.0.3 으로 셋업 → SSH config에 새 Host alias 추가

## 검증 명령 (PC 측)

```powershell
# 1. 어댑터 상태
Get-NetAdapter | Where-Object {$_.InterfaceDescription -like "*USB*GbE*"} | Format-List Name, Status, LinkSpeed

# 2. PC 측 IP (10.0.0.1 확인)
Get-NetIPAddress -InterfaceAlias "이더넷 9" -AddressFamily IPv4

# 3. RPi 도달성
ping 10.0.0.2
Test-NetConnection 10.0.0.2 -Port 22

# 4. ARP 테이블 (RPi가 link 잡혔는지)
arp -a -N 10.0.0.1

# 5. 어댑터 재초기화 (안 될 때)
Disable-NetAdapter "이더넷 9" -Confirm:$false; Start-Sleep 3; Enable-NetAdapter "이더넷 9"
```

## 관련 자산

- shield entity: `myWiki/second-brain/entities/shield.md` (shield 보드 RPi 작업, 5/16 박제)
- Tailscale 노드: shield-rpi4 (100.110.51.14), revita-rpi4 (100.73.114.75), myhome-rpi5 (100.79.180.64) — Tailscale 우회 가능
- 본 reference 작성 트리거: 2026-05-21 shield-rpi4 USB ethernet 점검 중 자산 발견
