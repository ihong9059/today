# Day 15: Tailscale VPN + 보안 강화 — "서버를 철통 방어로"

## 학습 목표
- Tailscale VPN을 설치하여 안전한 사설 네트워크를 구성한다
- fail2ban으로 SSH 브루트포스 공격을 자동 차단한다
- Nginx 보안 헤더를 설정하여 웹 보안을 강화한다
- 서버 보안 점검 체크리스트를 완성한다

## 준비물
- DigitalOcean 서버
- Tailscale 계정 (무료)
- SSH 접속 환경
- Claude Code CLI

## 실습 1: Tailscale VPN 설정 (30분)

1. 서버에 Tailscale을 설치한다

```bash
ssh deploy@myserver
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
# 브라우저에서 인증 URL 열기
```

2. 로컬 PC(WSL)에도 Tailscale을 설치한다

```bash
# WSL에서
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

3. VPN IP로 서버에 접속한다

```bash
tailscale status
# 서버의 Tailscale IP 확인 (100.x.x.x)
ssh deploy@100.x.x.x
curl http://100.x.x.x:8000
```

4. Claude Code에게 VPN 상태를 확인하게 한다

```
Claude에게: "Tailscale VPN 상태를 확인해줘. 연결된 장치 목록, 각 장치의 IP, 연결 상태를 정리해줘. VPN을 통해 서버에 접속 가능한지도 테스트해줘."
```

### 관찰 포인트
- 공인 IP 대신 Tailscale IP(100.x.x.x)로 접속하면 어떤 장점이 있는가?
- VPN을 통하면 SSH 포트를 외부에 노출하지 않아도 되는 이유는?

## 실습 2: fail2ban 설정 (30분)

1. fail2ban을 설치하고 설정한다

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
```

2. SSH 보호 설정을 만든다

```bash
sudo cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3
banaction = ufw

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
EOF

sudo systemctl restart fail2ban
```

3. fail2ban 상태를 확인한다

```bash
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

4. Claude Code에게 fail2ban 설정을 점검하게 한다

```
Claude에게: "fail2ban 설정을 확인하고 분석해줘. 현재 차단된 IP가 있는지, 설정이 적절한지, 추가로 보호해야 할 서비스(nginx 등)가 있는지 알려줘."
```

5. Nginx에 대한 fail2ban 필터도 추가한다

```bash
sudo cat > /etc/fail2ban/jail.d/nginx.conf << 'EOF'
[nginx-http-auth]
enabled = true
port = http,https
filter = nginx-http-auth
logpath = /var/log/nginx/error.log
maxretry = 5
bantime = 3600

[nginx-botsearch]
enabled = true
port = http,https
filter = nginx-botsearch
logpath = /var/log/nginx/access.log
maxretry = 2
bantime = 86400
EOF

sudo systemctl restart fail2ban
```

### 관찰 포인트
- maxretry=3이면 3번 실패 후 차단, 너무 적지는 않은가?
- bantime=3600(1시간)이 적절한 이유는?

## 실습 3: Nginx 보안 헤더 설정 (30분)

1. Claude Code에게 보안 헤더 설정을 만들게 한다

```
Claude에게: "Nginx에 보안 헤더를 추가해줘. /etc/nginx/snippets/security-headers.conf 파일로. 포함할 헤더: (1) X-Frame-Options, (2) X-Content-Type-Options, (3) X-XSS-Protection, (4) Strict-Transport-Security (HSTS), (5) Content-Security-Policy (기본), (6) Referrer-Policy, (7) Permissions-Policy. 각 헤더의 역할을 주석으로 설명해줘."
```

2. 보안 헤더 파일을 만든다

```bash
sudo cat > /etc/nginx/snippets/security-headers.conf << 'EOF'
# 클릭재킹 방지
add_header X-Frame-Options "SAMEORIGIN" always;

# MIME 타입 스니핑 방지
add_header X-Content-Type-Options "nosniff" always;

# XSS 필터 활성화
add_header X-XSS-Protection "1; mode=block" always;

# HTTPS 강제 (1년)
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# 리퍼러 정책
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# 권한 정책
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
EOF
```

3. Nginx 서버 블록에 보안 헤더를 포함한다

```bash
# /etc/nginx/sites-available/myapp 에 추가
# server { 블록 안에:
#     include snippets/security-headers.conf;
sudo nginx -t
sudo systemctl reload nginx
```

4. 보안 헤더를 확인한다

```bash
curl -I https://myapp-student01.duckdns.org
```

### 관찰 포인트
- X-Frame-Options이 클릭재킹을 어떻게 방지하는가?
- HSTS가 설정되면 HTTP 접속 시 무슨 일이 발생하는가?

## 실습 4: 종합 보안 점검 (20분)

1. Claude Code에게 전체 보안 점검을 요청한다

```
Claude에게: "서버의 전체 보안 상태를 점검해줘: (1) SSH 설정(root 로그인, 비밀번호 인증), (2) 방화벽(ufw) 상태, (3) fail2ban 상태, (4) Nginx 보안 헤더, (5) Docker 보안(non-root 사용자, 포트 노출), (6) SSL 인증서 상태, (7) 시스템 업데이트 상태. 각 항목별 통과/미통과/개선필요로 평가하고 종합 점수를 매겨줘."
```

2. SSH 포트를 VPN 전용으로 변경한다 (선택)

```bash
# ufw에서 공개 SSH를 닫고 Tailscale IP만 허용
sudo ufw delete allow 22/tcp
sudo ufw allow in on tailscale0 to any port 22
sudo ufw status
```

### 관찰 포인트
- SSH를 VPN 전용으로 변경하면 보안이 얼마나 강화되는가?
- Tailscale이 다운되면 서버에 접근할 수 없는 문제의 대비책은?

## 과제

### 제출물: "서버 보안 종합 점검 보고서"

```markdown
# 서버 보안 종합 점검 보고서

## Tailscale VPN
- 서버 Tailscale IP:
- 연결 장치 수:
- VPN 경유 SSH 접속: 성공 / 실패

## fail2ban
- 활성화 jail 수:
- 현재 차단된 IP 수:
- SSH maxretry:
- bantime:

## Nginx 보안 헤더
| 헤더 | 설정값 | 확인 |
|------|--------|------|
| X-Frame-Options | SAMEORIGIN | |
| X-Content-Type-Options | nosniff | |
| Strict-Transport-Security | max-age=31536000 | |
| Referrer-Policy | | |
| Permissions-Policy | | |

## 종합 보안 점검
| 항목 | 상태 | 비고 |
|------|------|------|
| SSH 키 인증 | | |
| root 로그인 비활성화 | | |
| 방화벽 (ufw) | | |
| fail2ban | | |
| HTTPS (SSL) | | |
| 보안 헤더 | | |
| Docker non-root | | |
| DB 포트 미노출 | | |
| VPN 접속 | | |

## 종합 점수: ___/10

## 추가 보안 조치 계획
1.
2.
3.
```

## 강사 참고 사항
- Tailscale은 무료 플랜에서 100대까지 지원하므로 교육용으로 충분하다
- fail2ban 테스트 시 자기 자신을 차단하지 않도록 주의시킨다 (whitelist 설정)
- SSH를 VPN 전용으로 변경 시 Tailscale 장애 대비로 콘솔 접속 방법도 안내한다
