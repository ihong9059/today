# myhome-rpi5 웹 서버 현황

- **PC 이름**: myhome-rpi5
- **호스트명**: uttec
- **Tailscale IP**: 100.79.180.64
- **아키텍처**: aarch64 (ARM64)
- **OS**: Debian 13 (trixie)
- **리버스 프록시**: Nginx (80/443)
- **프로세스 관리**: PM2 (Node.js/Python), Docker, nohup
- **조사일**: 2026-04-21

---

## PM2 관리 서비스

| ID | 이름 | 포트 | 경로 | 메모리 | 설명 |
|:--:|------|:----:|------|:------:|------|
| 0 | sensor-monitor | 5000 | /home/uttec/webServer/SensorMonitor/server/ | 68.2MB | 센서 모니터링 서비스 (Node.js). 센서 데이터 수집/표시 대시보드. uttec-sensor.duckdns.org로 서비스 (/admin 리다이렉트) |
| 1 | snu-consulting | 8088 | /home/uttec/webServer/snu-consulting/ | 18.8MB | SNU 컨설팅 웹 서비스 (Python). uttec-snu.duckdns.org로 서비스 |
| 2 | device-info | 8080 | /home/uttec/webServer/device-info/ | 66.8MB | 디바이스 정보 조회 서비스 (Node.js). 기본 도메인 루트(`/`) 및 uttec-info.duckdns.org로 서비스 |
| 3 | hongane | 7001 | /home/uttec/homepage/ | 29.5MB | 홍아네 홈페이지 (Python Flask). app.py 실행. 별도 도메인 미설정 |
| 4 | eduBack | 3000 | /home/uttec/webServer/hw-c-edu-platform/backend/ | 81.0MB | HW/C 교육 플랫폼 백엔드 (Node.js). 교육용 하드웨어/C언어 학습 API 서버 |
| 5 | eduFront | 3001 | /home/uttec/webServer/hw-c-edu-platform/frontend/ | 56.6MB | HW/C 교육 플랫폼 프론트엔드 (Next.js, 포트 3001). uttec-edu.duckdns.org로 서비스 |
| 6 | cert | 4000 | /home/uttec/webServer/cert-guide/ | 56.6MB | 자격증 가이드 웹 (Next.js 16.1.1, 포트 4000). uttec-cert.duckdns.org로 서비스 |
| 7 | japan-web | 3002 | /home/uttec/japan-web/ | 65.5MB | 일본어 학습 웹 서비스 (Node.js). 별도 도메인 미설정 (포트 3002 직접) |
| 8 | web-info | 8082 | /home/uttec/web/ | 53.3MB | 웹 정보 서비스 (Node.js). 별도 도메인 미설정 (포트 8082 직접) |

---

## Python 서비스 (PM2 외)

| 포트 | 프로세스 | 경로 | 시작일 | 설명 |
|:----:|----------|------|:------:|------|
| 7000 | python3 server.py | /home/uttec/philenergy/ | Mar 24 | PhilEnergy 서비스. 에너지 관련 웹 서비스 |
| 8081 | python main.py | /home/uttec/ai_fanstick_server/ | Apr 03 | AI FanStick 서버. AI 기반 응원봉 제어, OpenAI+Gemini AI 이중화, WebSocket 통신 |
| 8090 | python3 server.py | - | Apr 14 | 웹 서비스 (상세 미확인). uttec-ask.duckdns.org로 서비스 |
| 8091 | python server.py | /home/uttec/control_center/ | Apr 17 | 관제 센터 서버. AI FanStick 디바이스 관리, 추첨 시스템, WebSocket 디바이스 관리 |
| 8189 | python3 api_server.py | /home/uttec/pc-info/ | Mar 24 | PC 정보 API 서버. 포트 8089(Nginx)의 /api/ 경로로 프록시 |

---

## Docker 컨테이너

| 컨테이너명 | 이미지 | 포트 | 설명 |
|------------|--------|:----:|------|
| monitor-dashboard | monitor-system-dashboard:latest | 3030→80 | 모니터링 시스템 대시보드 (Nginx 프론트엔드). 서버 상태 시각화 UI |
| monitor-server | monitor-system-server | 8000→8000 | 모니터링 시스템 백엔드 (Uvicorn/FastAPI). 센서 데이터 수집/API 제공 |
| monitor-sensor | monitor-system-sensor | - | 모니터링 센서 수집기 (Python). 시스템 센서 데이터 수집 에이전트 |

---

## Nginx 도메인 라우팅

### uttec-sensor.duckdns.org (HTTPS, Let's Encrypt)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` → `/admin` 리다이렉트 | localhost:5000 | 센서 모니터 (sensor-monitor) |

### uttec-edu.duckdns.org (HTTPS, Let's Encrypt)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:3001 | HW/C 교육 플랫폼 프론트엔드 (eduFront) |

### uttec-cert.duckdns.org (HTTPS, Let's Encrypt)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:4000 | 자격증 가이드 (cert) |

### uttec-info.duckdns.org (HTTPS, Let's Encrypt)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:8080 | 디바이스 정보 (device-info) |

### uttec-ask.duckdns.org (HTTPS, Let's Encrypt)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:8090 | 질문 서비스 |

### uttec-snu.duckdns.org (HTTPS, Let's Encrypt)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:8088 | SNU 컨설팅 |

### uttec-python.duckdns.org (HTTPS, Let's Encrypt)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:8085 | aiPython 서비스 (FastAPI, 프롬프트→코드생성→Pyodide 실행) |

### 기본 도메인 (HTTP, 포트 80)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | localhost:8080 | 디바이스 정보 (device-info) |

### 포트 8089 (Nginx 정적 + API 프록시)
| 경로 | 프록시 대상 | 서비스 |
|------|:-----------:|--------|
| `/` | 정적 파일 (/home/uttec/pc-info) | PC 정보 웹 UI |
| `/api/` | localhost:8189 | PC 정보 API |

---

## 기타 시스템 서비스

| 서비스 | 포트 | 설명 |
|--------|:----:|------|
| Nginx | 80, 443 | 리버스 프록시 / SSL 종단 |
| SSH | 22 | 원격 접속 |
| ADB | 5037 | Android Debug Bridge (로컬) |
| Tailscale | 47555 | VPN 메시 네트워크 |
| VNC | 5900 | 원격 데스크톱 (WayVNC) |
| CUPS | 631 | 프린터 서비스 |
| SSH (보조) | 2222 | 보조 SSH 포트 |
| rpcbind | 111 | RPC 포트매퍼 |
