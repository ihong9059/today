---
name: DigitalOcean SSH 접속 불가 — Recovery Console 진단 SOP
description: ssh digital(178.128.90.37) 접속 실패 시 즉시 진단·복구 절차. Web Console과 Recovery Console 구분 + sshd disabled 함정 박제
type: feedback
originSessionId: c8e21a73-5f24-4c8e-a3f1-d8e57f9b2c44
---

# DigitalOcean SSH 접속 불가 진단 SOP (5/21 박제)

**규칙**: SSH 접속 실패 시 **port test → Cloud Firewall → 즉시 Recovery Console**. Restart는 sshd가 `enabled` 상태일 때만 의미 있음 — `disabled` 상태면 Restart 무효 (5/21 사건 함정).

**Why**: 2026-05-21 DigitalOcean droplet (178.128.90.37 / `digital` SSH alias / Tailscale 100.94.160.121) `ssh digital` 실패. 진단에 40~50분 소요. 정답 경로는 10분이었음. 시간 낭비 원인 = "Web Console = Recovery Console" 잘못된 가정 + "Restart로 sshd 자동 복구된다" 통념 의존. 실제 원인은 sshd가 `systemctl disable ssh` 상태였고 Restart 후에도 자동 시작 안 됨.

## How to apply — 5단계 SOP

### 1단계 — port test (1분, Windows PowerShell)

```powershell
Test-NetConnection -ComputerName 178.128.90.37 -Port 22  # SSH
Test-NetConnection -ComputerName 178.128.90.37 -Port 80  # Nginx (살아있나)
Test-NetConnection -ComputerName 178.128.90.37 -Port 443
Test-NetConnection -ComputerName 178.128.90.37 -Port 7777  # uttec-web
Test-NetConnection -ComputerName 100.94.160.121 -Port 22  # Tailscale도 확인
```

**판정**:
- 22만 단독 차단 + 다른 포트 OK = **sshd 단독 문제 확정** (방화벽 전면 차단 아님)
- Tailscale로도 22 차단 = OS 내부 또는 Cloud Firewall (외부 라우터 아님)
- ping OK + 80 OK = droplet OS 살아있음 (재부팅 불필요)

### 2단계 — Cloud Firewall 점검 (2분)

DigitalOcean 콘솔 → 좌측 사이드바 **NETWORKING** → **Firewalls** → droplet에 적용된 firewall 확인.
- "You don't have any firewalls" → Cloud Firewall 아님, **droplet 내부 OS 문제로 좁혀짐**
- Firewall 있는데 22 rule 없음 → 즉시 22 ALLOW rule 추가하면 해결 (가장 쉬운 길)

### 3단계 — Recovery Console 진입 (5분) ⭐

⚠️ **함정**: DigitalOcean에 두 종류 콘솔이 있음.
- **Web Console** (droplet 페이지 우상단 버튼) = **SSH 기반**, sshd 죽으면 같이 실패 "SSH Connection Lost"
- **Recovery Console** (Settings 탭 안) = **sshd 우회 hypervisor TTY**, sshd 죽어도 진입 가능 ⭐

진입 경로:
1. droplet → **Settings** 탭 (오른쪽 끝 탭) 클릭
2. **Reset root password** 섹션 → **`Reset Root`** 클릭 → 등록 이메일로 임시 비밀번호 발송 + droplet 자동 shut down/restart (5~10분 다운)
3. droplet ● Active 복귀 후 → 같은 페이지 **Recovery console** 섹션 → **`Launch Console`** 클릭
4. `login:` prompt → `root` + 이메일 임시 비밀번호 입력
5. 첫 로그인 시 즉시 새 비밀번호로 변경 요구됨 (Linux 정책). password manager에 저장.

### 4단계 — 진단 명령 (콘솔에서, 1분)

```bash
systemctl status ssh                                          # disabled 또는 dead?
ss -tlnp | grep :22                                           # listen 중?
ufw status verbose                                            # UFW 22 차단?
grep -E "^Port|^ListenAddress|^PermitRootLogin|^PasswordAuthentication" /etc/ssh/sshd_config  # config
journalctl -u ssh --since "1 day ago" | tail -30              # 죽은 이유
```

### 5단계 — 케이스별 복구 명령

| 진단 결과 | 복구 명령 |
|---|---|
| `inactive (dead) + disabled` ⭐ (5/21 사건) | `systemctl start ssh && systemctl enable ssh` |
| `inactive (dead) + enabled` (부팅 실패) | `journalctl -u ssh -b` 로그 분석 → sshd_config syntax 점검 |
| `active` 인데 외부에서 안 됨 | UFW `ufw allow 22/tcp && ufw reload` 또는 Port 변경 여부 (sshd_config Port 22 → 다른 값) |
| Port 22 → 다른 포트 변경 | `sed -i 's/^Port .*/Port 22/' /etc/ssh/sshd_config && systemctl restart ssh` |

## 🚫 시간 낭비 함정 (5/21 사건에서 학습)

1. **Web Console 반복 시도 금지** — sshd 죽으면 무한히 "SSH Connection Lost". Recovery Console로 즉시 전환.
2. **Restart 권장 보류** — sshd가 `disabled`면 Restart 후에도 안 살아남. Restart는 `enabled` 상태일 때만 의미.
3. **OOM 가설 추측 자제** — 메모리 % 확인 안 했으면 추측 금지. droplet Overview 탭에 표시됨 (4.7% CPU / 42% Memory였음).
4. **Cloud Firewall 가설 우선순위** — 항상 1순위는 아님. droplet 외부 차단인지 내부 차단인지 port test로 먼저 판단 (Tailscale도 막히면 내부 시사).

## 사건 사실 (2026-05-21 박제)

- droplet: `ubuntu-s-2vcpu-4gb-sgp1-01` (Ubuntu 24.04, 4GB RAM, Singapore, 178.128.90.37)
- 증상: `ssh digital` 실패, Web Console "SSH Connection Lost", port 22 전면 차단 (공인 + Tailscale)
- 원인: `ssh.service ... disabled; preset: enabled / Active: inactive (dead)` — systemctl disable ssh 상태
- 해결: Recovery Console 진입 후 `systemctl start ssh && systemctl enable ssh` 2줄 명령
- 정상 정황: 다른 모든 서비스 정상 (Nginx 80/443, uttec-web 7777, Tailscale node active)

## 근본 원인 확정 (2026-05-21 추적 결과)

**2026-04-30 06:27 UTC (15:27 KST)** `unattended-upgrades`가 보안 업데이트 자동 적용:
- 패키지: `openssh-client + openssh-server + openssh-sftp-server` (1:9.6p1-3ubuntu13.15 → 13.16)
- 절차: dpkg가 패키지 교체 전 `ssh.service Stop` → 패키지 교체 완료 → **`ssh.service Start` 누락** + `disable` 처리
- 로그 증거:
  - `/var/log/apt/history.log.1.gz` Start-Date: 2026-04-30 06:27:00, Commandline: /usr/bin/unattended-upgrade
  - `journalctl -u ssh` "Stopping ssh.service" + "Stopped" 만 있고 "Started" 없음
  - "All upgrades installed" 로그는 출력됨 → apt 입장에서는 성공으로 종료
- 사용자 4/11 이후 SSH 접속 0회 → 3주간 인지 못 함 (모니터링 부재)
- 결론: **Ubuntu 24.04 noble의 needrestart/unattended-upgrades 정책 부작용**. SSH 같은 critical service의 자동 restart를 skip하는 디폴트 동작. 사용자 잘못 아님, 악의적 침입 아님.

## 재발 방지 (2026-05-21 적용 완료)

### A. cron.daily watchdog (24h 자동 복구)
```bash
sudo tee /etc/cron.daily/ssh-watchdog > /dev/null << 'EOF'
#!/bin/bash
systemctl is-enabled ssh >/dev/null 2>&1 || systemctl enable ssh
systemctl is-active ssh >/dev/null 2>&1 || systemctl start ssh
EOF
sudo chmod +x /etc/cron.daily/ssh-watchdog
```

### B. needrestart 자동 정책 (보안 패치 시 service 자동 restart)
```bash
sudo sed -i "s/^#*\$nrconf{restart} = '.';/\$nrconf{restart} = 'a';/" /etc/needrestart/needrestart.conf
# 확인: grep "^\$nrconf{restart}" /etc/needrestart/needrestart.conf → $nrconf{restart} = 'a';
```

### C. 외부 모니터링 (후속 권장, 미적용)
다른 PC (myhome-rpi5 등)에서 5분 주기로 `nc -w 5 178.128.90.37 22` 점검 → 실패 시 Slack/Telegram/Email 알림. 본 사건이 3주 잠복한 핵심 이유 = 외부 모니터링 부재.

## 동일 위험 보유 호스트 (확인 필요)

같은 unattended-upgrades 정책을 쓰는 다른 vault·서버도 같은 사고 위험:
- myhome-rpi5 (Tailscale 100.79.180.64) — Debian/Ubuntu 면 동일 권고 적용
- office-rpi4 / home-odroidc2 / revita-rpi4 등
- 우선순위는 외부 노출 + critical 서비스 호스트부터

→ 각 호스트에서 동일 watchdog cron + needrestart 정책 적용 권장 (이번 SOP를 인프라 표준으로 채택).

## 키워드 (검색)

ssh digital 접속 안 됨 / DigitalOcean SSH Connection Lost / sshd disabled inactive dead / port 22 차단 / Recovery Console / Web Console 차이 / Reset Root Password / systemctl enable ssh / 178.128.90.37
