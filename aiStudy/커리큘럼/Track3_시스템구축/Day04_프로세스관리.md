# Day 4: 프로세스 관리 + 서비스 등록 — "서버가 혼자 일하게 만들기"

## 학습 목표
- Linux 프로세스의 개념(PID, 포그라운드/백그라운드)을 이해한다
- systemd 서비스 파일을 작성하여 앱을 데몬으로 등록한다
- 서버 재부팅 후에도 앱이 자동 시작되도록 설정한다
- journalctl로 서비스 로그를 확인하고 문제를 진단한다

## 준비물
- Day 3에서 배포한 서버 + 앱
- SSH 접속 환경
- Claude Code CLI

## 실습 1: 프로세스 기본 이해 (25분)

1. 현재 실행 중인 프로세스를 확인한다

```bash
ssh deploy@myserver
ps aux | head -20
ps aux | grep python
top -bn1 | head -15
```

2. 백그라운드 실행과 nohup을 실험한다

```bash
cd /opt/apps/my-api-project
source venv/bin/activate
nohup uvicorn main:app --host 0.0.0.0 --port 8000 &
echo $!  # PID 확인
cat nohup.out
```

3. 프로세스를 종료한다

```bash
kill $(pgrep -f uvicorn)
# 또는
kill -9 PID_NUMBER
```

4. Claude Code에게 프로세스 상태를 분석하게 한다

```
Claude에게: "서버에서 현재 실행 중인 Python 관련 프로세스를 모두 찾아서 PID, 메모리 사용량, 실행 시간을 정리해줘"
```

### 관찰 포인트
- nohup으로 실행해도 서버 재부팅하면 어떻게 되는가?
- kill과 kill -9의 차이는? (SIGTERM vs SIGKILL)

## 실습 2: systemd 서비스 파일 작성 (40분)

1. Claude Code에게 서비스 파일을 생성하게 한다

```
Claude에게: "FastAPI 앱을 systemd 서비스로 등록하는 .service 파일을 만들어줘. 조건: 사용자는 deploy, 작업 디렉토리는 /opt/apps/my-api-project, 가상환경의 uvicorn을 사용, 환경변수 파일은 .env, 자동 재시작 설정 포함"
```

2. 생성된 서비스 파일을 확인하고 설치한다

```bash
sudo cat > /etc/systemd/system/myapp.service << 'EOF'
[Unit]
Description=My FastAPI Application
After=network.target

[Service]
Type=simple
User=deploy
Group=deploy
WorkingDirectory=/opt/apps/my-api-project
EnvironmentFile=/opt/apps/my-api-project/.env
ExecStart=/opt/apps/my-api-project/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

3. 서비스를 등록하고 시작한다

```bash
sudo systemctl daemon-reload
sudo systemctl enable myapp
sudo systemctl start myapp
sudo systemctl status myapp
```

### 관찰 포인트
- [Unit], [Service], [Install] 각 섹션의 역할은?
- Restart=always와 Restart=on-failure의 차이는?
- enable과 start의 차이는?

## 실습 3: 서비스 관리 명령어 실습 (30분)

1. 서비스의 다양한 상태를 실험한다

```bash
sudo systemctl stop myapp
sudo systemctl status myapp    # inactive
sudo systemctl start myapp
sudo systemctl status myapp    # active
sudo systemctl restart myapp   # 재시작
```

2. 자동 재시작이 동작하는지 확인한다

```bash
# 앱 프로세스를 강제로 죽인다
sudo kill -9 $(pgrep -f uvicorn)
# 5초 후 자동 재시작 확인
sleep 6
sudo systemctl status myapp
```

3. 부팅 시 자동 시작을 확인한다

```bash
sudo systemctl is-enabled myapp
# 서버를 재부팅해본다 (주의: SSH 연결이 끊어진다)
sudo reboot
# 재접속 후 확인
ssh deploy@myserver
sudo systemctl status myapp
curl http://localhost:8000
```

### 관찰 포인트
- 프로세스를 kill 했을 때 Restart=always가 몇 초 만에 재시작하는가?
- 서버 재부팅 후 앱이 자동으로 떠 있는가?

## 실습 4: 로그 확인 — journalctl (25분)

1. 서비스 로그를 다양한 방식으로 확인한다

```bash
# 전체 로그
sudo journalctl -u myapp

# 최근 50줄
sudo journalctl -u myapp -n 50

# 실시간 로그 (tail -f 처럼)
sudo journalctl -u myapp -f

# 오늘 로그만
sudo journalctl -u myapp --since today

# 에러 로그만
sudo journalctl -u myapp -p err
```

2. Claude Code에게 로그 분석을 맡긴다

```
Claude에게: "myapp 서비스의 최근 로그 100줄을 가져와서 에러나 경고가 있는지 분석해줘. 요청 패턴이나 성능 이슈도 확인해줘."
```

### 관찰 포인트
- journalctl과 직접 로그 파일을 읽는 것의 차이는?
- 로그가 너무 많아지면 어떻게 관리하는가? (로그 로테이션)

## 과제

### 제출물: "systemd 서비스 운영 보고서"

```markdown
# systemd 서비스 운영 보고서

## 서비스 정보
- 서비스명: myapp
- 실행 사용자:
- 포트:
- 자동 시작: enabled / disabled

## 서비스 파일 내용
(.service 파일 전체 내용)

## 테스트 결과
| 테스트 | 결과 | 비고 |
|--------|------|------|
| systemctl start | | |
| systemctl stop | | |
| 프로세스 kill 후 자동 재시작 | | 재시작까지 걸린 시간: |
| 서버 reboot 후 자동 시작 | | |

## journalctl 로그 분석
- 총 로그 라인 수:
- 에러 수:
- 주요 이슈:

## nohup vs systemd 비교
| 항목 | nohup | systemd |
|------|-------|---------|
| 자동 재시작 | | |
| 부팅 시 시작 | | |
| 로그 관리 | | |
| 환경변수 관리 | | |
```

## 강사 참고 사항
- 서비스 파일의 경로나 사용자명 오타가 가장 흔한 에러 원인이다 — journalctl로 디버깅하는 과정을 직접 보여준다
- ExecStart에 가상환경 내 절대 경로를 써야 하는 이유를 강조한다
- 실수로 서버를 reboot한 학생이 당황하지 않도록, 재접속까지 1-2분 걸린다고 안내한다
