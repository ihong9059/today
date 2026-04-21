# Digital Ocean 웹 서버 현황

- **서버 IP**: 178.128.90.37
- **Tailscale IP**: 100.94.160.121
- **도메인**: uttec-ai.duckdns.org, newuttec-info.duckdns.org
- **리버스 프록시**: Nginx (80/443)
- **프로세스 관리**: PM2 (Node.js), nohup/systemd (Python)
- **조사일**: 2026-04-21

---

## PM2 관리 서비스 (Node.js)

| ID | 이름 | 포트 | 경로 | 상태 | 메모리 | 설명 |
|:--:|------|:----:|------|:----:|:------:|------|
| 10 | ai-education | 3002 | /root/ai-education-web | online | 73.8MB | AI 교육 웹사이트 (Next.js 16.1.6). AI/딥러닝 교육 콘텐츠 제공. uttec-ai.duckdns.org 루트(`/`)로 서비스 |
| 1 | server-monitor | 3000 | /root/server-monitor | online | 50.0MB | 서버 모니터링 대시보드 (Node.js http). OS 상태(CPU, 메모리 등) 모니터링. 기본 도메인 루트(`/`)로 서비스 |
| 8 | uttec-web | 7777 | /var/www/uttec-web | online | 40.5MB | UTTEC 회사 웹사이트 (Next.js 14.2.29). 회사 소개 페이지. 현재 Nginx에 직접 연결되어 있지 않음 (포트 7777 직접 접속) |

---

## Python 서비스

| 포트 | 프로세스 | 경로 | 시작일 | 설명 |
|:----:|----------|------|:------:|------|
| 5000 | python3 app.py | - | Mar 04 | Flask/FastAPI 앱 서비스. 상세 용도 미확인 |
| 5050 | python3 app.py | - | Feb 25 | Flask/FastAPI 앱 서비스. 상세 용도 미확인 |
| 6010 | python3 app.py | /root/skz-ai (추정) | Feb 25 | SKZ AI 서비스. HTTPS(443) + SSL 인증서로 178.128.90.37 직접 접속 시 서비스 |
| 8080 | python3 -m http.server | - | Feb 25 | 간단한 정적 파일 서버. newuttec-info.duckdns.org 도메인으로 서비스 |
| 8090 | python3 build_server.py | /root/vibe-firmware | Apr 11 | 펌웨어 빌드 서버 (레거시). ESP32 펌웨어 원격 빌드 요청 처리 |
| 8092 | uvicorn build_server_cloud_arduino:app | /root/vibe-firmware | Apr 12 | 펌웨어 빌드 API 서버 (FastAPI/Uvicorn). Arduino CLI 기반 클라우드 빌드. uttec-ai.duckdns.org/api/v1/ 프록시 |
| 8094 | web_ui_server.py | /root/vibe-firmware | Apr 12 | 펌웨어 빌드 Web UI. 사용자가 웹에서 펌웨어 빌드 요청/다운로드. uttec-ai.duckdns.org/firmware 경로로 서비스 |
| 8096 | uvicorn build_server_cloud_arduino:app | /root/vibe-mini | Apr 14 | Mini 펌웨어 빌드 API 서버 (FastAPI/Uvicorn). ESP32-C3 SuperMini용 클라우드 빌드. uttec-ai.duckdns.org/mini/api/v1/ 프록시 |
| 8098 | web_ui_server.py | /root/vibe-mini | Apr 14 | Mini 펌웨어 빌드 Web UI. ESP32-C3 SuperMini용 웹 인터페이스. uttec-ai.duckdns.org/mini 경로로 서비스 |

---

## Nginx 도메인 라우팅

### uttec-ai.duckdns.org (HTTPS, Let's Encrypt)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:3002 | AI 교육 웹 (ai-education) |
| `/firmware` | localhost:8094 | 펌웨어 빌드 Web UI |
| `/api/v1/` | localhost:8094 | 펌웨어 빌드 API |
| `/mini` | localhost:8098 | Mini 펌웨어 빌드 Web UI |
| `/mini/api/v1/` | localhost:8098 | Mini 펌웨어 빌드 API |

### 178.128.90.37 (기본 도메인, HTTP)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:3000 | 서버 모니터 (server-monitor) |
| `/world-tour-vocab` | localhost:10000 | 영어 단어 학습 (현재 미실행) |
| `/travel-english` | localhost:10001 | 여행 영어 학습 (현재 미실행) |
| `/monitor` | localhost:9999 | 모니터 (현재 미실행) |

### 178.128.90.37:443 (HTTPS, 자체 서명 SSL)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:6010 | SKZ AI 서비스 |

### newuttec-info.duckdns.org (HTTP)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:8080 | 정적 파일 서버 (http.server) |

---

## 기타 시스템 서비스

| 서비스 | 포트 | 설명 |
|--------|:----:|------|
| Nginx | 80, 443 | 리버스 프록시 / SSL 종단 |
| SSH | 22 | 원격 접속 |
| Tailscale | 45017 | VPN 메시 네트워크 |
| fail2ban | - | 보안 (SSH 브루트포스 차단 등) |
| systemd-resolved | 53 | DNS 리졸버 |
