# Day 5: 도메인 + HTTPS — "진짜 웹사이트처럼 만들기"

## 학습 목표
- DuckDNS로 무료 도메인을 등록하고 서버 IP에 연결한다
- Nginx를 리버스 프록시로 설정하여 80 포트로 앱에 접근한다
- certbot으로 Let's Encrypt SSL 인증서를 발급받아 HTTPS를 적용한다
- HTTP → HTTPS 리다이렉션을 설정한다

## 준비물
- Day 4까지 설정한 서버 (systemd 서비스 동작 중)
- DuckDNS 계정 (GitHub 로그인 가능)
- Claude Code CLI

## 실습 1: DuckDNS 도메인 설정 (20분)

1. DuckDNS 웹사이트에서 도메인을 등록한다
   - https://www.duckdns.org 접속 → GitHub 로그인
   - 서브도메인 입력: `myapp-student01` → myapp-student01.duckdns.org
   - current ip에 서버 IP 입력 → update

2. 도메인 연결을 확인한다

```bash
ping myapp-student01.duckdns.org
nslookup myapp-student01.duckdns.org
```

3. 서버에서 DuckDNS 자동 업데이트 크론잡을 설정한다

```bash
ssh deploy@myserver
mkdir -p ~/duckdns
cat > ~/duckdns/duck.sh << 'EOF'
#!/bin/bash
echo url="https://www.duckdns.org/update?domains=myapp-student01&token=YOUR_TOKEN&ip=" | curl -k -o ~/duckdns/duck.log -K -
EOF
chmod 700 ~/duckdns/duck.sh
(crontab -l 2>/dev/null; echo "*/5 * * * * ~/duckdns/duck.sh") | crontab -
```

### 관찰 포인트
- DuckDNS 같은 동적 DNS 서비스가 필요한 이유는?
- 도메인 → IP 변환이 얼마나 빨리 반영되는가?

## 실습 2: Nginx 리버스 프록시 설정 (40분)

1. Nginx를 설치한다

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

2. 브라우저에서 Nginx 기본 페이지를 확인한다

```
브라우저: http://myapp-student01.duckdns.org
→ "Welcome to nginx!" 페이지가 보여야 한다
```

3. Claude Code에게 리버스 프록시 설정을 만들게 한다

```
Claude에게: "Nginx 리버스 프록시 설정 파일을 만들어줘. 조건: 도메인은 myapp-student01.duckdns.org, 백엔드는 localhost:8000, WebSocket 지원, proxy 헤더 설정 포함. /etc/nginx/sites-available/myapp 경로로."
```

4. 설정을 활성화하고 테스트한다

```bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

5. 80 포트로 접속하여 앱이 보이는지 확인한다

```bash
curl http://myapp-student01.duckdns.org
```

### 관찰 포인트
- 리버스 프록시가 없으면 앱 포트(8000)를 직접 노출해야 하는 문제는?
- nginx -t로 설정을 미리 검증하는 이유는?

## 실습 3: HTTPS 인증서 발급 (30분)

1. certbot을 설치한다

```bash
sudo apt install -y certbot python3-certbot-nginx
```

2. SSL 인증서를 발급받는다

```bash
sudo certbot --nginx -d myapp-student01.duckdns.org --non-interactive --agree-tos -m student@example.com
```

3. HTTPS 접속을 확인한다

```
브라우저: https://myapp-student01.duckdns.org
→ 자물쇠 아이콘이 보여야 한다
```

4. 인증서 자동 갱신을 확인한다

```bash
sudo certbot renew --dry-run
sudo systemctl list-timers | grep certbot
```

5. Claude Code에게 SSL 설정을 점검하게 한다

```
Claude에게: "현재 Nginx의 SSL 설정을 확인하고, 보안 등급을 분석해줘. 개선할 점이 있으면 알려줘. SSL Labs 기준 A 등급을 받으려면 어떤 설정이 필요한지도 설명해줘."
```

### 관찰 포인트
- Let's Encrypt 인증서의 유효기간은? (90일)
- certbot이 Nginx 설정 파일을 어떻게 자동 수정했는가?

## 실습 4: HTTP → HTTPS 리다이렉션 + 마무리 (30분)

1. HTTP 접속 시 HTTPS로 자동 전환되는지 확인한다

```bash
curl -I http://myapp-student01.duckdns.org
# 301 Moved Permanently → https://... 이 나와야 한다
```

2. 불필요한 포트를 닫는다

```bash
sudo ufw delete allow 8000/tcp
sudo ufw status
```

3. Nginx 설정 파일의 최종 상태를 확인한다

```bash
sudo cat /etc/nginx/sites-available/myapp
```

4. Claude Code에게 전체 접속 경로를 분석하게 한다

```
Claude에게: "현재 서버의 네트워크 흐름을 분석해줘: 사용자 브라우저 → DNS → 서버 → Nginx → 앱 까지의 전체 경로를 다이어그램으로 설명해줘. 각 단계에서 어떤 포트와 프로토콜이 사용되는지도 포함해줘."
```

### 관찰 포인트
- 8000 포트를 닫아도 앱에 접근할 수 있는 이유는?
- Nginx가 중간에서 하는 역할은 정확히 무엇인가?

## 과제

### 제출물: "도메인 + HTTPS 구성 보고서"

```markdown
# 도메인 + HTTPS 구성 보고서

## 도메인 정보
- 도메인: ____________.duckdns.org
- 서버 IP:
- HTTPS 적용: Yes / No

## 접속 테스트
| URL | 상태코드 | 설명 |
|-----|---------|------|
| http://도메인 | 301 | HTTPS로 리다이렉션 |
| https://도메인 | 200 | 정상 접속 |
| https://도메인/health | | |

## SSL 인증서 정보
- 발급자:
- 유효기간:
- 자동 갱신 설정: Yes / No

## Nginx 설정 파일 내용
(설정 파일 전체 붙여넣기)

## 네트워크 흐름 다이어그램
브라우저 → [____] → [____] → [____] → 앱

## 방화벽 최종 상태
(ufw status 출력)
```

## 강사 참고 사항
- DuckDNS 토큰은 개인 정보이므로 화면에 노출하지 않도록 안내한다
- certbot이 실패하면 80/443 포트가 열려있는지, 도메인 DNS가 전파되었는지 확인한다
- 이 시점에서 전체 아키텍처(DNS → Nginx → App)를 화이트보드에 그려주면 좋다
