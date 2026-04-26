# Day 3: 서버에 앱 배포 — "코드를 세상에 내보내다"

## 학습 목표
- git clone으로 서버에 소스 코드를 가져올 수 있다
- Python 가상환경(venv)을 만들고 pip로 의존성을 설치한다
- Flask/FastAPI 앱을 서버에서 수동 실행하여 외부 접속을 확인한다
- 배포 과정의 전체 흐름(코드 → 서버 → 실행 → 접속)을 이해한다

## 준비물
- Day 2에서 설정한 DigitalOcean 서버
- GitHub에 올린 Flask 또는 FastAPI 프로젝트 (Track 2에서 만든 것)
- SSH 접속 환경

## 실습 1: 서버에 Python 환경 구성 (20분)

1. 서버에 접속하여 Python과 필수 도구를 설치한다

```bash
ssh deploy@myserver
sudo apt update
sudo apt install -y python3 python3-pip python3-venv git
python3 --version
pip3 --version
```

2. 프로젝트용 디렉토리를 만든다

```bash
sudo mkdir -p /opt/apps
sudo chown deploy:deploy /opt/apps
```

3. Claude Code에게 서버 Python 환경을 점검하게 한다

```
Claude에게: "서버에 SSH 접속해서 Python3, pip, venv, git이 모두 설치되어 있는지 확인하고, 버전 정보를 요약해줘"
```

### 관찰 포인트
- /opt/apps 경로를 사용하는 이유는? (홈 디렉토리 vs 시스템 경로)
- deploy 사용자에게 소유권을 주는 이유는?

## 실습 2: 코드 배포 및 의존성 설치 (30분)

1. GitHub에서 프로젝트를 클론한다

```bash
cd /opt/apps
git clone https://github.com/YOUR_USERNAME/my-api-project.git
cd my-api-project
```

2. 가상환경을 생성하고 패키지를 설치한다

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

3. 환경변수 파일을 만든다

```bash
cat > .env << 'EOF'
PORT=8000
DEBUG=false
DATABASE_URL=sqlite:///./app.db
EOF
```

4. Claude Code에게 배포 스크립트를 만들게 한다

```
Claude에게: "서버에서 git pull → 가상환경 활성화 → pip install → 앱 재시작을 하는 deploy.sh 스크립트를 만들어줘. /opt/apps/my-api-project 경로 기준으로."
```

### 관찰 포인트
- 가상환경 없이 pip install을 하면 어떤 문제가 생기는가?
- .env 파일은 왜 git에 포함하면 안 되는가?

## 실습 3: 앱 실행 및 외부 접속 테스트 (40분)

1. 앱을 수동으로 실행한다

```bash
cd /opt/apps/my-api-project
source venv/bin/activate
# FastAPI인 경우
uvicorn main:app --host 0.0.0.0 --port 8000
# Flask인 경우
# python app.py --host 0.0.0.0 --port 8000
```

2. 새 터미널에서 서버 내부 테스트를 한다

```bash
ssh deploy@myserver
curl http://localhost:8000
curl http://localhost:8000/health
```

3. 로컬 PC 브라우저에서 외부 접속을 확인한다

```
브라우저: http://YOUR_SERVER_IP:8000
```

4. ufw에서 8000 포트를 임시로 열어야 한다

```bash
sudo ufw allow 8000/tcp
```

5. Claude Code에게 접속 테스트를 자동화하게 한다

```
Claude에게: "서버의 http://localhost:8000 엔드포인트에 GET 요청을 보내서 응답 상태코드와 응답 시간을 확인해줘. /health, /api/items 등 주요 엔드포인트도 함께 테스트해줘."
```

### 관찰 포인트
- `--host 0.0.0.0`을 쓰지 않으면 외부에서 접속이 안 되는 이유는?
- 터미널을 닫으면 앱이 종료되는 문제를 어떻게 해결할까? (→ Day 4 예고)

## 실습 4: 수동 배포의 한계 체험 (20분)

1. 코드를 수정하고 다시 배포하는 과정을 반복한다

```bash
# 로컬에서 코드 수정 후
git add . && git commit -m "Update API response" && git push

# 서버에서
cd /opt/apps/my-api-project
git pull
source venv/bin/activate
pip install -r requirements.txt
# 앱을 Ctrl+C로 종료하고 다시 실행
uvicorn main:app --host 0.0.0.0 --port 8000
```

2. 배포할 때마다 수동으로 해야 하는 단계를 목록으로 정리한다

```
Claude에게: "지금까지 수동 배포한 과정을 단계별로 정리해줘. 자동화할 수 있는 부분과 위험한 부분을 표시해줘."
```

### 관찰 포인트
- 수동 배포의 단점은? (시간, 실수 가능성, 다운타임)
- 이 문제들은 어떤 도구로 해결할 수 있는가?

## 과제

### 제출물: "첫 배포 기록서"

```markdown
# 첫 배포 기록서

## 배포한 앱
- 앱 이름:
- GitHub URL:
- 서버 IP:
- 포트:

## 배포 절차 (실제 수행한 순서)
1.
2.
3.
4.
5.

## 접속 테스트 결과
| 엔드포인트 | 상태코드 | 응답시간 |
|-----------|---------|---------|
| / | | |
| /health | | |
| /api/... | | |

## 수동 배포의 문제점 3가지
1.
2.
3.

## deploy.sh 스크립트 내용
(스크립트 붙여넣기)
```

## 강사 참고 사항
- Track 2에서 만든 프로젝트가 없는 학생을 위해 간단한 FastAPI 샘플 레포를 준비한다
- 0.0.0.0 바인딩과 localhost의 차이를 네트워크 다이어그램으로 설명하면 이해가 빠르다
- 8000 포트는 실습 후 반드시 닫도록 안내한다 (Day 5에서 Nginx 리버스 프록시로 대체)
