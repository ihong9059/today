# Day 10: 모니터링 + 로그 — "서버가 아프면 바로 알아야 한다"

## 학습 목표
- htop, docker stats 등으로 서버 리소스를 실시간 모니터링한다
- 앱에 헬스체크 API를 구현하고 자동화된 상태 확인을 설정한다
- journalctl과 docker logs로 로그를 효과적으로 분석한다
- 간단한 모니터링 스크립트를 만들어 알림을 설정한다

## 준비물
- Docker Compose 스택이 동작하는 서버
- SSH 접속 환경
- Claude Code CLI

## 실습 1: 시스템 리소스 모니터링 (25분)

1. htop을 설치하고 시스템 상태를 확인한다

```bash
ssh deploy@myserver
sudo apt install -y htop
htop
# q로 종료
```

2. 명령줄로 리소스를 확인한다

```bash
# CPU 사용률
top -bn1 | head -5

# 메모리
free -h

# 디스크
df -h

# 네트워크 연결
ss -tlnp
```

3. Docker 컨테이너별 리소스를 확인한다

```bash
docker stats --no-stream
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
```

4. Claude Code에게 종합 리포트를 만들게 한다

```
Claude에게: "서버의 전체 리소스 상태를 확인해줘. CPU, 메모리, 디스크, 네트워크, Docker 컨테이너별 리소스를 모두 조사해서 대시보드 형태로 정리해줘. 위험 수준이 있으면 경고해줘."
```

### 관찰 포인트
- 메모리 사용량에서 used와 available의 차이는?
- 어떤 컨테이너가 가장 많은 리소스를 사용하는가?

## 실습 2: 헬스체크 API 구현 (30분)

1. 앱에 상세한 헬스체크 엔드포인트를 추가한다

```
Claude에게: "FastAPI 앱에 /health 엔드포인트를 만들어줘. 다음 정보를 반환해야 해: (1) 앱 상태(ok/error), (2) 업타임, (3) DB 연결 상태, (4) 메모리 사용량, (5) 현재 시간. DB 연결 실패 시 status를 degraded로 반환하고 HTTP 503을 리턴해줘."
```

2. 헬스체크 스크립트를 만든다

```bash
cat > ~/health-check.sh << 'SCRIPT'
#!/bin/bash
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

if [ "$RESPONSE" != "200" ]; then
    echo "[$TIMESTAMP] ALERT: Health check failed! Status: $RESPONSE" >> ~/health.log
    # 여기에 알림 추가 가능 (이메일, 슬랙 등)
else
    echo "[$TIMESTAMP] OK: Status $RESPONSE" >> ~/health.log
fi
SCRIPT
chmod +x ~/health-check.sh
```

3. cron으로 1분마다 자동 실행한다

```bash
(crontab -l 2>/dev/null; echo "* * * * * ~/health-check.sh") | crontab -
crontab -l
```

4. 헬스체크를 테스트한다

```bash
./health-check.sh
cat ~/health.log
# 앱을 일부러 중지시켜 실패 로그를 확인
docker compose stop app
sleep 5
./health-check.sh
cat ~/health.log
docker compose start app
```

### 관찰 포인트
- 헬스체크가 앱 자체와 DB 상태를 각각 확인하는 이유는?
- 1분 간격이면 최대 1분간 장애를 모를 수 있다 — 적절한 간격은?

## 실습 3: 로그 관리와 분석 (30분)

1. Docker 로그를 다양한 방식으로 확인한다

```bash
# 전체 로그
docker compose logs

# 특정 서비스 최근 50줄
docker compose logs --tail 50 app

# 실시간 로그 모니터링
docker compose logs -f app

# 시간 범위 지정
docker compose logs --since 1h app
```

2. systemd 서비스 로그를 확인한다

```bash
sudo journalctl -u docker --since "1 hour ago"
sudo journalctl --disk-usage
```

3. Claude Code에게 로그 분석을 요청한다

```
Claude에게: "Docker Compose 스택의 모든 서비스 로그를 최근 100줄씩 가져와서 분석해줘. 에러, 경고, 느린 요청(1초 이상)을 찾아서 정리해줘. 각 서비스별로 요약해줘."
```

4. 로그 로테이션을 설정한다

```bash
# Docker 로그 크기 제한
cat > /tmp/daemon.json << 'EOF'
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF
sudo cp /tmp/daemon.json /etc/docker/daemon.json
sudo systemctl restart docker
```

### 관찰 포인트
- Docker 로그 파일이 무한히 커지면 어떤 문제가 발생하는가?
- max-size 10m, max-file 3이면 최대 로그 용량은?

## 실습 4: 간단한 모니터링 대시보드 (25분)

1. Claude Code에게 모니터링 스크립트를 만들게 한다

```
Claude에게: "서버 모니터링 bash 스크립트를 만들어줘. 기능: (1) CPU/메모리/디스크 사용률 표시, (2) Docker 컨테이너 상태 표시, (3) 최근 에러 로그 5줄, (4) 헬스체크 결과, (5) 위험 항목 하이라이트. 터미널에서 깔끔한 표 형태로 출력되도록. ~/monitor.sh로 저장."
```

2. 스크립트를 실행하고 결과를 확인한다

```bash
chmod +x ~/monitor.sh
~/monitor.sh
```

3. 장애 상황을 시뮬레이션한다

```bash
# 메모리 부하 테스트 (5초 후 자동 종료)
docker run --rm -d --name stress --memory 100m alpine sh -c "dd if=/dev/zero of=/dev/null bs=1M &; sleep 5"
~/monitor.sh
```

### 관찰 포인트
- 모니터링 스크립트의 출력에서 가장 중요한 항목은?
- 실제 운영에서는 Prometheus + Grafana 같은 도구를 사용하는 이유는?

## 과제

### 제출물: "서버 모니터링 운영 계획서"

```markdown
# 서버 모니터링 운영 계획서

## 현재 서버 상태 스냅샷
| 항목 | 값 | 상태 |
|------|-----|------|
| CPU 사용률 | | 정상/경고/위험 |
| 메모리 사용률 | | |
| 디스크 사용률 | | |
| Docker 컨테이너 수 | | |

## 헬스체크 설정
- 엔드포인트: /health
- 체크 주기: 1분
- 알림 조건:

## 로그 관리 설정
- Docker 로그 크기 제한: max-size=____, max-file=____
- 로그 보관 기간:
- 로그 분석 방법:

## 모니터링 스크립트
(monitor.sh 내용)

## 장애 대응 플로우
1. 헬스체크 실패 감지 →
2. 로그 확인 →
3. 조치 →
4. 복구 확인 →

## 개선 계획
- 단기:
- 중기:
- 장기:
```

## 강사 참고 사항
- 모니터링은 "문제가 생기기 전에 아는 것"이 핵심임을 강조한다
- 실제 프로덕션에서는 Prometheus, Grafana, Datadog 등을 사용하지만, 원리를 이해하는 것이 먼저라고 설명한다
- 스트레스 테스트 시 서버가 실제로 느려질 수 있으므로 작은 값으로 테스트한다
