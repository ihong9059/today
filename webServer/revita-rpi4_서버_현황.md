# revita-rpi4 웹 서버 현황

- **PC 이름**: revita-rpi4
- **호스트명**: uttec
- **Tailscale IP**: 100.73.114.75
- **로컬 IP**: 192.168.0.29 (wlan0)
- **아키텍처**: aarch64 (ARM64)
- **OS**: Debian 13 (trixie)
- **리버스 프록시**: 없음 (Nginx 미설치)
- **프로세스 관리**: 없음 (PM2 미설치, Docker 미설치)
- **조사일**: 2026-04-21

---

## 웹 서비스

| 포트 | 프로세스 | 경로 | 시작일 | 설명 |
|:----:|----------|------|:------:|------|
| 80 | python3 resource_monitor.py | /home/uttec/ | Apr 02 | PC 리소스 모니터링 웹 서버 (Python http.server + psutil). CPU, 메모리, 디스크, 네트워크 실시간 모니터링 대시보드. 접속: http://100.73.114.75 |
| 5000 | python3 app.py /dev/ttyACM4 | /home/uttec/revita/zephyr_workspace/hw_bringup/host_test/web/ | Apr 10 | REVITA Host 테스트 웹 UI (Flask). LTE 세션 기반 Tower 통신 시뮬레이션. USB CDC 시리얼(/dev/ttyACM4)로 명령 큐 전달/데이터 수집. 2개 프로세스 (PID 730671 + 752217) |
| 5001 | python3 host/app.py 5001 | /home/uttec/revita/zephyr_workspace/battery_test/chargeTest/ | Apr 03 | 배터리 충전 모니터 (Flask). 시리얼 통신으로 전압 데이터 수집, 실시간 차트, CSV 로깅. 최대 72000개 데이터포인트 (약 20시간) |
| 8080 | python3 app.py /dev/ttyACM4 | /home/uttec/revita/zephyr_workspace/hw_bringup/host_test/web/ | Apr 10 | REVITA Host 테스트 웹 UI (Flask). 포트 5000과 동일 앱의 두 번째 인스턴스. 2개 프로세스 (PID 731059 + 752219) |

---

## 서비스 상세

### PC Resource Monitor (포트 80)
- **프레임워크**: Python 내장 http.server + psutil
- **기능**: CPU/메모리/디스크/네트워크 실시간 모니터링
- **실행 방식**: root 권한 (포트 80 사용)

### REVITA Host Test Web UI (포트 5000, 8080)
- **프레임워크**: Flask
- **기능**:
  - Tower 디바이스와 USB CDC 시리얼 통신 (/dev/ttyACM4)
  - LTE 세션 시뮬레이션 (연결→데이터 업로드→명령 다운로드→해제)
  - 세션 간 명령 큐잉 및 일괄 전달
- **참고**: 현재 USB CDC로 시뮬레이션, 실제 LTE 미연동 단계

### Battery Charge Monitor (포트 5001)
- **프레임워크**: Flask
- **기능**:
  - 시리얼 통신으로 배터리 전압 실시간 수집 (1초 간격)
  - 웹 대시보드 실시간 차트
  - CSV 파일 자동 로깅
  - x2 전압 분배기 보정

---

## 기타

### Cursor Server (원격 IDE)
- Cursor 원격 서버가 실행 중 (로컬 포트만 사용)
- Extension Host, File Watcher, Language Server 등 동작 중

### 시스템 서비스

| 서비스 | 포트 | 설명 |
|--------|:----:|------|
| SSH | 22 | 원격 접속 |
| Tailscale | 60465 | VPN 메시 네트워크 |
| VNC | 5900 | 원격 데스크톱 (WayVNC) |
| CUPS | 631 | 프린터 서비스 |
| rpcbind | 111 | RPC 포트매퍼 |

---

## 참고
- Nginx, PM2, Docker 모두 미설치 상태
- 주로 REVITA 프로젝트 (Zephyr RTOS 기반 임베디드) 개발/테스트용
- 시리얼 장치 /dev/ttyACM4에 연결된 하드웨어 테스트 환경
