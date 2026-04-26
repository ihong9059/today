# Day 6: Docker 기초 — "컨테이너라는 마법의 상자"

## 학습 목표
- 컨테이너와 가상머신(VM)의 차이를 설명할 수 있다
- Docker를 설치하고 기본 명령어(run, ps, stop, rm)를 사용한다
- hello-world, nginx 등 공식 이미지를 실행해본다
- 컨테이너의 생명주기(생성 → 실행 → 중지 → 삭제)를 이해한다

## 준비물
- DigitalOcean 서버 또는 WSL2 환경
- SSH 접속 환경
- Claude Code CLI

## 실습 1: Docker 설치 (20분)

1. Docker를 설치한다

```bash
ssh deploy@myserver
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

2. deploy 사용자에게 Docker 권한을 부여한다

```bash
sudo usermod -aG docker deploy
# 재접속하여 적용
exit
ssh deploy@myserver
docker --version
```

3. Claude Code에게 설치 상태를 확인하게 한다

```
Claude에게: "서버에서 Docker 설치 상태를 확인해줘. Docker 버전, Docker Compose 버전, Docker 데몬 실행 상태를 모두 확인해줘."
```

### 관찰 포인트
- sudo 없이 docker 명령을 쓸 수 있게 된 이유는?
- Docker 데몬(dockerd)은 어떤 역할을 하는가?

## 실습 2: 첫 컨테이너 실행 (30분)

1. hello-world 컨테이너를 실행한다

```bash
docker run hello-world
```

2. Nginx 컨테이너를 실행하고 접속한다

```bash
docker run -d --name my-nginx -p 8080:80 nginx
curl http://localhost:8080
```

3. 컨테이너 상태를 확인한다

```bash
docker ps              # 실행 중인 컨테이너
docker ps -a           # 모든 컨테이너 (중지된 것 포함)
docker logs my-nginx   # 로그 확인
docker inspect my-nginx | head -30
```

4. Claude Code에게 컨테이너 정보를 분석하게 한다

```
Claude에게: "현재 실행 중인 Docker 컨테이너 목록을 확인하고, 각 컨테이너의 이름, 이미지, 포트 매핑, 상태, 메모리 사용량을 정리해줘"
```

### 관찰 포인트
- `-d` 플래그는 무엇을 의미하는가? (detached mode)
- `-p 8080:80`에서 호스트 포트와 컨테이너 포트의 관계는?

## 실습 3: 컨테이너 생명주기 (30분)

1. 컨테이너를 중지, 시작, 재시작한다

```bash
docker stop my-nginx
docker ps          # 비어있다
docker ps -a       # Exited 상태로 보인다
docker start my-nginx
docker restart my-nginx
```

2. 컨테이너 내부에 접속한다

```bash
docker exec -it my-nginx bash
ls /usr/share/nginx/html/
cat /etc/nginx/nginx.conf
exit
```

3. 컨테이너를 삭제한다

```bash
docker stop my-nginx
docker rm my-nginx
docker ps -a       # 사라졌다
```

4. 이미지를 관리한다

```bash
docker images
docker pull python:3.11-slim
docker images
docker rmi hello-world
```

### 관찰 포인트
- 컨테이너를 삭제하면 내부 데이터는 어떻게 되는가?
- 이미지와 컨테이너의 관계는? (클래스 vs 인스턴스)

## 실습 4: 컨테이너 vs VM 비교 체험 (20분)

1. 컨테이너 시작 속도를 측정한다

```bash
time docker run --rm hello-world
time docker run --rm nginx echo "started"
```

2. 컨테이너 크기를 확인한다

```bash
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

3. Claude Code에게 비교 분석을 요청한다

```
Claude에게: "컨테이너와 VM의 차이를 아키텍처 관점에서 설명해줘. 시작 시간, 리소스 사용량, 격리 수준, 이미지 크기를 표로 비교해줘. 우리 서버에서 실제로 확인한 nginx 이미지 크기도 포함해줘."
```

### 관찰 포인트
- 컨테이너가 VM보다 빠르게 시작하는 이유는?
- 컨테이너의 격리 수준은 VM과 어떻게 다른가?

## 과제

### 제출물: "Docker 기초 실습 보고서"

```markdown
# Docker 기초 실습 보고서

## Docker 환경
- Docker 버전:
- Docker Compose 버전:
- 호스트 OS:

## 실행한 컨테이너 기록
| 이미지 | 컨테이너명 | 포트 매핑 | 상태 |
|--------|-----------|-----------|------|
| hello-world | | | |
| nginx | my-nginx | 8080:80 | |
| python:3.11-slim | | | |

## 컨테이너 vs VM 비교
| 항목 | 컨테이너 | VM |
|------|---------|-----|
| 시작 시간 | | |
| 이미지 크기 | | |
| 격리 수준 | | |
| 리소스 오버헤드 | | |

## 핵심 명령어 정리
| 명령어 | 설명 |
|--------|------|
| docker run | |
| docker ps | |
| docker stop | |
| docker rm | |
| docker exec | |
| docker logs | |

## 질문/궁금한 점
```

## 강사 참고 사항
- Docker 설치가 복잡하므로 사전에 설치 스크립트를 준비해두면 좋다
- `docker run`의 다양한 옵션(-d, -p, --name, --rm, -it)을 하나씩 설명한다
- "이미지 = 설계도, 컨테이너 = 설계도로 만든 실체" 비유가 효과적이다
