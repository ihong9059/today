# Nginx 포트 기반 설정 가이드

**작성일**: 2026-01-23
**목적**: uttec-cert (5002→4000), uttec-info (5004→8080) 포트 구분 설정

---

## 1. 포트 구성 요약

| 도메인 | 외부 포트 | 내부 포트 | 서비스 |
|--------|:---------:|:---------:|--------|
| uttec-cert.duckdns.org | 5002 | 4000 | cert-guide |
| uttec-info.duckdns.org | 5004 | 8080 | device-info |

---

## 2. Nginx 설정 파일

### 2.1 uttec-cert (포트 5002 → 4000)

```bash
# 파일 생성/수정
sudo nano /etc/nginx/sites-available/uttec-cert-port
```

```nginx
# /etc/nginx/sites-available/uttec-cert-port
server {
    listen 5002 ssl;
    listen [::]:5002 ssl;
    server_name uttec-cert.duckdns.org;

    # SSL 인증서 (기존 인증서 사용)
    ssl_certificate /etc/letsencrypt/live/uttec-cert.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/uttec-cert.duckdns.org/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2.2 uttec-info (포트 5004 → 8080)

```bash
# 파일 생성/수정
sudo nano /etc/nginx/sites-available/uttec-info-port
```

```nginx
# /etc/nginx/sites-available/uttec-info-port
server {
    listen 5004 ssl;
    listen [::]:5004 ssl;
    server_name uttec-info.duckdns.org;

    # SSL 인증서 (기존 인증서 사용)
    ssl_certificate /etc/letsencrypt/live/uttec-edu.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/uttec-edu.duckdns.org/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 3. Nginx 적용 명령어

RPi5에서 순서대로 실행:

```bash
# 1. 심볼릭 링크 생성
sudo ln -sf /etc/nginx/sites-available/uttec-cert-port /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/uttec-info-port /etc/nginx/sites-enabled/

# 2. Nginx 설정 테스트
sudo nginx -t

# 3. Nginx 재시작
sudo systemctl reload nginx

# 4. 포트 확인
sudo ss -tlnp | grep nginx
```

---

## 4. 라우터 포트포워딩 설정

공유기 관리 페이지에서 다음 포트포워딩 규칙 추가:

| 규칙명 | 외부 포트 | 내부 IP | 내부 포트 | 프로토콜 |
|--------|:---------:|---------|:---------:|:--------:|
| cert-guide | 5002 | 192.168.0.32 | 5002 | TCP |
| device-info | 5004 | 192.168.0.32 | 5004 | TCP |

> **참고**: Nginx가 5002, 5004 포트에서 직접 listen하므로 내부 포트도 동일하게 설정

---

## 5. 방화벽 설정 (필요시)

```bash
# UFW 방화벽 사용 시
sudo ufw allow 5002/tcp
sudo ufw allow 5004/tcp
sudo ufw reload
```

---

## 6. 접속 테스트

설정 완료 후 테스트 URL:

| 서비스 | URL |
|--------|-----|
| cert-guide | https://uttec-cert.duckdns.org:5002 |
| device-info | https://uttec-info.duckdns.org:5004 |

```bash
# 내부 테스트 (RPi5에서)
curl -k https://localhost:5002
curl -k https://localhost:5004
```

---

## 7. 기존 443 포트 설정 유지

기존 도메인 기반 설정(443 포트)도 그대로 유지됩니다:
- https://uttec-cert.duckdns.org (443 → 4000)
- https://uttec-info.duckdns.org (443 → 8080)

포트 기반 설정은 **추가** 접속 방법입니다.

---

*작성일: 2026-01-23*
