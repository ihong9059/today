# RPi 직결 표준연결 SOP — 신품 보드를 이 PC에서 즉시 설정하기

> **배경**: 2026-11-15 bins 사무실에서 새 RPi4 ↔ PC 연결 실패로 고생한 사건 계기.
> 신품 보드 첫 접속 실패는 거의 항상 3요소다 — ① SSH 미활성 ② IP를 모름 ③ DHCP 서버 부재.
> 본 SOP는 세 가지를 전부 차단한다. (2026-11-16 제정, 본 PC RPi3 실테스트 검증)

## 표준 구성

```
[RPi eth0] ──(일반 랜케이블 1개, 크로스 불필요)── [이 PC 본체 이더넷 포트]
```

| 항목 | 표준 |
|---|---|
| PC 측 포트 | **본체 이더넷(이 PC = "이더넷 6", Intel I219-V)** — RPi 직결 전용 |
| 방식 | **방법 A = Windows ICS**(PC가 DHCP 서버+인터넷 공유) 우선, 불가 시 방법 B(link-local) |
| RPi 측 사전조치 | **0단계(SD 굽기 시 SSH·계정 설정)만 하면 RPi 측 추가 설정 0** |
| IP 대역 | 방법 A: RPi = `192.168.137.x` (PC=192.168.137.1 고정) / 방법 B: `169.254.x.x` 양쪽 자동 |

---

## 0단계 — SD 카드 단계에서 SSH·계정 확보 (신품 보드 필수) 🚨

신품 보드 실패의 1번 원인 = **Raspberry Pi OS는 기본적으로 SSH가 꺼져 있다.**
모니터·키보드 없이 가려면 SD를 굽거나/꽂을 때 미리 심어야 한다.

**방법 ①** (굽기 전, 권장): Raspberry Pi Imager → ⚙️ 고급 설정(Ctrl+Shift+X) →
- hostname 지정(예: `rpi4-bins`) / **SSH 사용 체크** / 사용자·비밀번호 지정(예: `uttec`)
- Wi-Fi는 비워도 됨(직결이 대신함)

**방법 ②** (이미 구운 카드): SD를 **이 PC에 꽂으면** boot(FAT32) 파티션이 보인다 →
1. 빈 파일 `ssh` 생성 (확장자 없음) → SSH 활성화
2. (Bookworm 이후 계정도 필요) `userconf.txt` 생성, 내용 1줄: `uttec:<암호화된 비번>`
   - 암호 해시 생성(이 PC Git Bash): `echo 'mypassword' | openssl passwd -6 -stdin`

> 구형 이미지(Bullseye 이전)는 `ssh` 파일만으로 충분, 기본 계정 pi/raspberry.

---

## 1단계 — 물리 연결

1. RPi eth0 ↔ PC 본체 이더넷 포트, 일반 랜케이블 직결 (auto-MDIX라 크로스 불필요)
2. RPi 전원 ON → PC에서 링크 확인:
```powershell
Get-NetAdapter -Name "이더넷 6"    # Status=Up 확인 (RPi3=100Mbps, RPi4=1Gbps 정상)
```
Link가 Up이 안 되면: 케이블/포트 불량 또는 RPi 부팅 전 — RPi LED(녹색 깜빡임=부팅 중) 확인.

---

## 2단계 — 방법 A: ICS 활성화 (1회 설정, 재사용 시 생략)

PC가 DHCP 서버 + 인터넷 게이트웨이가 된다. **RPi 측 설정 0** — 신품 기본값(DHCP)이 그대로 동작.

**스크립트 (권장)** — 같은 폴더 `enable-ics.ps1` (UAC 승인 1회):
```powershell
# RPi를 꽂은 포트를 -Private로 지정 (기본: 이더넷 6 / USB 어댑터면 '이더넷 9')
Start-Process powershell -Verb RunAs -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass',`
  '-File','C:\todo\today\tailscale\enable-ics.ps1'   # 결과는 ics-result.txt
```
> 🚨 PS 5.1은 BOM 없는 UTF-8 .ps1의 한글을 오해석해 **조용히 파싱 실패**한다 — 본 스크립트는 BOM 포함 저장됨(수정 시 유지할 것).

GUI 5단계 (`ncpa.cpl`):
1. `Win+R` → `ncpa.cpl`
2. **인터넷이 되는 어댑터**(Wi-Fi 4) 우클릭 → 속성 → **공유** 탭
3. "다른 네트워크 사용자가 이 컴퓨터의 인터넷 연결을 통해 연결할 수 있도록 허용" 체크
4. 홈 네트워킹 연결 드롭다운 = **이더넷 6** 선택 → 확인
5. 확인: `ipconfig` 에서 이더넷 6 = **192.168.137.1** 이면 활성

> ⚠️ ICS는 Wi-Fi 네트워크(프로필)가 바뀌면 풀릴 수 있다 — 직결 전 192.168.137.1 여부 먼저 확인.
> ⚠️ PC의 다른 어댑터가 192.168.137.x를 쓰고 있으면 충돌 — 본 PC 기준 해당 없음.

---

## 3단계 — RPi 발견 (IP 찾기)

RPi 부팅 완료까지 신품 첫 부팅은 ~1-2분 (파일시스템 확장). 이후 순서대로:

```powershell
# ① mDNS (hostname 아는 경우 — 0단계에서 지정한 이름 또는 기본 raspberrypi)
ping rpi4-bins.local        # 또는 ping raspberrypi.local

# ② DHCP 임대 흔적 스캔 (ICS 방식)
Get-NetNeighbor -InterfaceAlias "이더넷 6" -AddressFamily IPv4 |
  Where-Object IPAddress -like "192.168.137.*" | Select IPAddress, LinkLayerAddress, State

# ③ ②가 비면 브로드캐스트로 ARP 테이블 채운 후 재스캔
ping -n 1 192.168.137.255; arp -a | findstr 192.168.137
```

- RPi MAC 제조사 prefix: `B8-27-EB`(RPi3 이전) / `DC-A6-32`, `E4-5F-01`(RPi4) — ARP 목록에서 RPi 식별에 사용.

---

## 4단계 — SSH 접속 + 후속 표준화

```powershell
ssh uttec@192.168.137.xxx          # 또는 ssh uttec@rpi4-bins.local
```

**첫 접속 후 키 등록** (Windows엔 ssh-copy-id가 없다 — 아래 한 줄, 비밀번호 1회 입력):
```powershell
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh uttec@192.168.137.xxx "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```
이후 비밀번호 없이 접속 가능. (자동화 맥락이면 python paramiko로 동일 작업 가능 — 2026-11-16 검증)

접속되면 즉시 (인터넷이 ICS로 공유되므로 바로 가능):
1. `sudo apt update` 동작 확인 = 인터넷 공유 검증
2. **Tailscale 설치** → 이후에는 직결 없이 어디서나 접속:
   `curl -fsSL https://tailscale.com/install.sh | sh && sudo tailscale up`
3. 호스트 정보를 myWiki/작업 기록에 박제 (hostname·MAC·Tailscale IP)

---

## 방법 B — ICS 불가 시 fallback: link-local 직결 (인터넷 공유 없음)

관리자 권한이 없거나 ICS가 말을 안 들을 때. 양쪽이 DHCP 실패 → 자동으로 `169.254.x.x`(APIPA)를 잡는 성질을 이용.

1. 직결 후 PC: `ipconfig` → 이더넷 6에 `169.254.x.x` 자동 할당 확인
2. RPi: Bullseye(dhcpcd)는 자동 fallback ✅ / **Bookworm(NetworkManager)은 fallback이 안 될 수 있음** 🚨 → 이 경우 0단계 방법 ②에서 boot 파티션에 고정 IP를 심거나 방법 A(ICS) 사용이 답
3. 발견은 **mDNS가 사실상 유일**: `ping raspberrypi.local` → 응답 IP(169.254.x.x)로 `ssh`
4. 한계: RPi에 인터넷 없음(apt 불가) — Tailscale 설치하려면 결국 방법 A 또는 공유기 필요

---

## 트러블슈팅 표

| 증상 | 원인 | 조치 |
|---|---|---|
| 링크 자체가 안 뜸 (0bps) | 케이블·RPi 미부팅 | RPi LED 확인, 케이블 교체 |
| ping raspberrypi.local 무응답 | mDNS 캐시/부팅 미완 | 2분 대기 후 재시도, `ping -4` 강제 |
| 192.168.137.x에 아무도 없음 | ICS 꺼짐(137.1 아님) | 2단계 재수행 (Wi-Fi 바뀌면 풀림) |
| ssh: connection refused | **SSH 미활성 (최다 원인)** | 0단계 — SD를 PC에 꽂아 `ssh` 파일 |
| ssh: permission denied | Bookworm 기본계정 폐지 | 0단계 — `userconf.txt` 생성 |
| 접속은 되나 apt 실패 | 방법 B(인터넷 없음) | 방법 A로 전환 |
| mDNS가 엉뚱한 IP 반환 | RPi가 Wi-Fi 등 다중 접속(멀티홈) — mDNS는 다른 인터페이스 IP를 줄 수 있음 | **②번 ARP 스캔이 확정적** — 192.168.137.x로 직접 접속 |
| ICS 켰는데 RPi가 임대 못 받음 | ICS를 RPi 연결 *후에* 켠 경우 DHCP 재요청 대기 | `Restart-NetAdapter`(관리자)로 링크 bounce → 즉시 재임대 (또는 RPi 재부팅) |

## 검증 기록

- 2026-05-21: RPi 3B+ (MAC B8-27-EB-25-F8-4C, hostname uttec) — ICS 방식 192.168.137.248 검증 ✅
- 2026-11-16: 본 SOP 제정 + **end-to-end 재검증 ✅** — RPi3 (MAC B8-27-EB-8B-00-E4, Debian 13 trixie, hostname uttec)를 USB 어댑터(이더넷 9)에 직결 → `enable-ics.ps1 -Private '이더넷 9'` + `Restart-NetAdapter` → DHCP 임대 192.168.137.160(~30초) → ARP 스캔 발견 → SSH 접속 → **인터넷 공유 확인**(8.8.8.8 ping 33ms·DNS 정상, 기본 라우트 = 192.168.137.1 경유). 실측 특이사항: ① ICS private는 아무 포트나 가능(-Private 인자) ② RPi 멀티홈 시 mDNS가 Wi-Fi IP를 반환(트러블슈팅 표 반영) ③ ICS를 나중에 켜면 링크 bounce로 재임대 유도. (같은 날 2차로 신품 완전 검증 수행 — 아래)
- 2026-11-16 (2차): ⭐ **신품 보드 0단계 포함 완전 검증 ✅** — 같은 RPi3에 **새로 구운 SD**(Imager 고급설정: SSH on·uttec/uttec·hostname uttec, Debian 13) 삽입 → 첫 부팅 → DHCP **192.168.137.79** 자동 임대 → MAC prefix ARP 스캔 발견 → port 22 열림 확인 → **비밀번호 첫 접속 → 공개키 등록(paramiko) → 키 인증 전환** → 인터넷(33ms)·DNS 정상. **SOP 전 단계 실증 완료** — 다음 신품 RPi4(bins 등)는 본 문서 순서대로만 하면 됨. 참고: Imager 생성 계정은 sudo 시 비밀번호 요구(passwordless 아님).

## 관련 자산

- **보기 쉬운 설명서(HTML)**: 같은 폴더 `RPi_직결_SSH접속_설명서.html` — 5-STEP 카드형, 현장 지참/전달용. 본 md = 기술 상세 단일 출처, HTML = 요약 뷰(수정 시 양쪽 동기).

- 메모리: `reference_rpi_ics_dhcp_setup`(ICS 5단계) · `reference_rpi_usb_ethernet_direct`(구 10.0.0.x 방식 — 본 SOP로 대체, RPi 측 사전 설정이 필요해 신품에 부적합)
- mac 직결(169.254 방식) 실측: 2026-11-16 작업보고서
