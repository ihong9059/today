# home-odroidc2 웹 서버 현황

- **PC 이름**: home-odroidc2
- **호스트명**: odroidc2
- **Tailscale IP**: 100.89.56.69
- **아키텍처**: aarch64 (ARM64)
- **OS**: Armbian 26.2.1 noble (Ubuntu 24.04 기반)
- **리버스 프록시**: 없음 (Nginx 미설치)
- **프로세스 관리**: 없음 (PM2 미설치, Docker 미설치)
- **조사일**: 2026-04-21

---

## 웹 서비스

| 포트 | 프로세스 | 경로 | 설명 |
|:----:|----------|------|------|
| 8765 | python3 server.py | /home/uttec/resource_web/ | PC 리소스 모니터링 웹 서버 (Python http.server). CPU, 메모리, 디스크, 네트워크 실시간 모니터링 대시보드. 접속: http://100.89.56.69:8765 |

---

## 서비스 상세

### PC Resource Monitor (포트 8765)
- **프레임워크**: Python 내장 http.server (HTTPServer)
- **기능**:
  - `/` — 실시간 리소스 모니터링 대시보드 (HTML/JS 내장)
  - `/api/stats` — 시스템 리소스 JSON API
- **모니터링 항목**:
  - CPU 사용률 (전체 + 코어별) 및 주파수
  - 메모리/Swap 사용량
  - 디스크 사용량 (마운트별, 블록 디바이스)
  - 네트워크 인터페이스 RX/TX 트래픽
  - 시스템 정보 (호스트명, 플랫폼, uptime)
- **업데이트 주기**: 2초 간격 자동 갱신
- **실행 방식**: uttec 사용자로 직접 실행

---

## 기타 시스템 서비스

| 서비스 | 포트 | 설명 |
|--------|:----:|------|
| SSH | 22 | 원격 접속 |
| Tailscale | 50633 | VPN 메시 네트워크 |
| systemd-resolved | 53 | DNS 리졸버 |

---

## 참고
- Nginx, PM2, Docker 모두 미설치 상태
- 홈 디렉토리에 resource_web 프로젝트 1개만 존재
- 주로 가정용 리소스 모니터링 용도로 사용
