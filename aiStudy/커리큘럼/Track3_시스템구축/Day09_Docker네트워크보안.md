# Day 9: Docker 네트워크 + 보안 — "컨테이너도 안전하게"

## 학습 목표
- Docker 네트워크 종류(bridge, host, none)를 이해하고 커스텀 네트워크를 생성한다
- non-root 사용자로 컨테이너를 실행하는 방법을 적용한다
- 이미지 크기를 최소화하는 전략(멀티스테이지 빌드, slim/alpine)을 실습한다
- 컨테이너 보안 모범 사례를 적용한다

## 준비물
- Day 8의 Docker Compose 프로젝트
- Docker 설치된 서버
- Claude Code CLI

## 실습 1: Docker 네트워크 이해 (30분)

1. 기본 네트워크를 확인한다

```bash
docker network ls
docker network inspect bridge
```

2. 커스텀 네트워크를 생성하고 테스트한다

```bash
docker network create --driver bridge mynet
docker run -d --name web1 --network mynet nginx:alpine
docker run -d --name web2 --network mynet nginx:alpine
```

3. 컨테이너 간 DNS 통신을 확인한다

```bash
docker exec web1 ping -c 3 web2
docker exec web2 ping -c 3 web1
# 커스텀 네트워크에서는 컨테이너 이름으로 통신 가능
```

4. 기본 bridge 네트워크와 비교한다

```bash
docker run -d --name web3 nginx:alpine
docker exec web3 ping -c 3 web1
# 실패: 다른 네트워크에 있으므로 통신 불가
```

5. Claude Code에게 네트워크 구조를 분석하게 한다

```
Claude에게: "현재 Docker 네트워크 목록과 각 네트워크에 연결된 컨테이너를 확인해줘. 네트워크 간 격리 상태를 다이어그램으로 설명해줘."
```

### 관찰 포인트
- 커스텀 bridge 네트워크와 기본 bridge의 차이(DNS 지원)는?
- 네트워크 격리가 보안에 어떤 도움이 되는가?

## 실습 2: Non-root 컨테이너 실행 (30분)

1. root로 실행되는 컨테이너의 위험을 확인한다

```bash
docker run --rm nginx:alpine whoami
# root
docker run --rm nginx:alpine id
# uid=0(root)
```

2. Dockerfile에 non-root 사용자를 추가한다

```bash
mkdir -p ~/secure-docker && cd ~/secure-docker
cat > app.py << 'EOF'
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def root():
    return {"message": "Secure container!"}
EOF

cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
EOF
```

3. Claude Code에게 보안 강화된 Dockerfile을 만들게 한다

```
Claude에게: "보안이 강화된 Dockerfile을 만들어줘. 조건: (1) python:3.11-slim 기반, (2) non-root 사용자 appuser 생성, (3) 불필요한 패키지 설치 안 함, (4) 파일 권한 최소화, (5) HEALTHCHECK 포함. 각 보안 조치에 대한 주석도 달아줘."
```

4. 빌드하고 사용자를 확인한다

```bash
docker build -t secure-app .
docker run --rm secure-app whoami
# appuser
docker run --rm secure-app id
# uid=1000(appuser)
```

### 관찰 포인트
- root 권한 컨테이너가 호스트에 미치는 보안 위험은?
- 특정 포트(80, 443 등)를 바인딩하려면 root가 필요한데 어떻게 우회하는가?

## 실습 3: 이미지 크기 최소화 (30분)

1. 같은 앱을 다른 베이스 이미지로 빌드하여 크기를 비교한다

```bash
# python:3.11 (전체)
cat > Dockerfile.full << 'EOF'
FROM python:3.11
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

# python:3.11-slim
cat > Dockerfile.slim << 'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

docker build -f Dockerfile.full -t app:full .
docker build -f Dockerfile.slim -t app:slim .
docker images app
```

2. 멀티스테이지 빌드를 실험한다

```
Claude에게: "멀티스테이지 빌드를 사용한 Dockerfile을 만들어줘. 첫 번째 스테이지에서 pip install로 의존성을 설치하고, 두 번째 스테이지에서 설치된 패키지만 복사하는 방식으로. 최종 이미지에는 pip나 빌드 도구가 포함되지 않아야 해."
```

3. 크기를 비교한다

```bash
docker images --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}" | grep app
```

### 관찰 포인트
- full, slim 이미지의 크기 차이는 얼마인가?
- 멀티스테이지 빌드가 가장 효과적인 경우는? (Go, Rust 등 컴파일 언어)

## 실습 4: Compose에 보안 적용 (20분)

1. Day 8의 Compose 파일에 보안 설정을 추가한다

```
Claude에게: "Day 8의 docker-compose.yml을 보안 강화해줘. 조건: (1) 커스텀 네트워크 사용, (2) DB는 외부 포트 노출 안 함, (3) read_only 파일시스템 (가능한 서비스), (4) 리소스 제한(memory, cpu), (5) 환경변수를 .env 파일로 분리"
```

2. 정리한다

```bash
docker stop $(docker ps -aq) 2>/dev/null
docker rm $(docker ps -aq) 2>/dev/null
docker network prune -f
docker system prune -f
```

### 관찰 포인트
- DB 포트를 외부에 노출하지 않아도 앱에서 접근 가능한 이유는?
- 리소스 제한이 없으면 어떤 문제가 발생할 수 있는가?

## 과제

### 제출물: "Docker 보안 점검 보고서"

```markdown
# Docker 보안 점검 보고서

## 이미지 크기 비교
| 이미지 | 크기 | 비고 |
|--------|------|------|
| app:full | | python:3.11 |
| app:slim | | python:3.11-slim |
| app:multi | | 멀티스테이지 |

## 보안 체크리스트
- [ ] non-root 사용자 적용
- [ ] 최소 베이스 이미지(slim/alpine) 사용
- [ ] .dockerignore 적용
- [ ] 불필요한 포트 노출 없음
- [ ] DB 포트 외부 미노출
- [ ] 환경변수 .env 파일 분리
- [ ] 리소스 제한(memory/cpu) 설정
- [ ] HEALTHCHECK 설정

## 네트워크 구성
(커스텀 네트워크 다이어그램)

## 보안 강화 전후 Compose 파일 비교
### Before
(기존 내용)

### After
(보안 강화 후 내용)
```

## 강사 참고 사항
- 보안은 "완벽"보다 "레이어별 방어"가 중요함을 강조한다
- alpine 이미지는 musl libc를 사용하여 일부 Python 패키지 호환 문제가 있을 수 있음을 안내한다
- 실제 프로덕션에서는 Docker Scout 등 취약점 스캔 도구도 사용함을 언급한다
