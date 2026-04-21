# office-rpi4 웹 서버 현황

- **PC 이름**: office-rpi4
- **호스트명**: uttec
- **Tailscale IP**: 100.72.216.93
- **아키텍처**: aarch64 (ARM64)
- **OS**: Debian 13 (trixie)
- **리버스 프록시**: 없음 (Nginx 미설치)
- **프로세스 관리**: systemd (PM2 미설치, Docker 미설치)
- **조사일**: 2026-04-21

---

## 웹 서비스

| 포트 | 프로세스 | 경로 | 설명 |
|:----:|----------|------|------|
| 5000 | python3 web_server.py | /home/uttec/raspberry-board-control/raspberry/ | Raspberry Pi 보드 제어 웹 서버 (Flask). GPIO 제어, ESP32 제어, 시리얼 통신, DB 관리 기능. 외부 접속: http://100.72.216.93:5000 |

---

## 서비스 상세

### Raspberry Pi Board Control (포트 5000)
- **프레임워크**: Flask (Python)
- **기능**:
  - GPIO 제어 (gpio_controller.py)
  - ESP32 제어 (esp32_controller.py)
  - 데이터베이스 관리 (database.py)
  - 시리얼 루프백 테스트 (serial_loopback.py)
- **실행 방식**: root 권한으로 직접 실행 (systemd 서비스 또는 수동)
- **CORS**: flask_cors 사용 (설치 시)

---

## 프로젝트 디렉토리 (/home/uttec/)

| 디렉토리 | 설명 |
|----------|------|
| raspberry-board-control/ | 라즈베리파이 보드 제어 시스템 (현재 실행 중) |
| arduino_projects/ | Arduino 프로젝트 |
| esp32_projects/ | ESP32 프로젝트 |
| stm32_projects/ | STM32 프로젝트 |
| esp/ | ESP 관련 파일 |
| counter_sketch/ | 카운터 스케치 |
| uttec/ | UTTEC 관련 파일 |

---

## 기타 시스템 서비스

| 서비스 | 포트 | 설명 |
|--------|:----:|------|
| SSH | 22 | 원격 접속 |
| Tailscale | 59188 | VPN 메시 네트워크 |
| VNC | 5900 | 원격 데스크톱 (WayVNC) |
| CUPS | 631 | 프린터 서비스 |
| rpcbind | 111 | RPC 포트매퍼 |

---

## 참고
- Nginx, PM2, Docker 모두 미설치 상태
- 웹 서비스는 Flask 서버 1개만 운영 중
- 주로 임베디드 개발용 (Arduino, ESP32, STM32, Raspberry Pi) PC로 사용
