# Day 7: Dockerfile — "나만의 컨테이너 이미지 만들기"

## 학습 목표
- Dockerfile의 주요 지시어(FROM, COPY, RUN, CMD, EXPOSE)를 이해한다
- Claude Code가 작성한 Dockerfile을 읽고 수정할 수 있다
- 자신의 Python 앱을 Docker 이미지로 빌드한다
- 이미지 레이어 개념과 캐시 활용을 이해한다

## 준비물
- Docker 설치된 서버
- Track 2에서 만든 FastAPI/Flask 프로젝트
- Claude Code CLI

## 실습 1: 첫 Dockerfile 작성 (30분)

1. 간단한 Python 앱을 준비한다

```bash
mkdir -p ~/docker-practice && cd ~/docker-practice
cat > app.py << 'EOF'
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello from Docker!"}

@app.get("/health")
def health():
    return {"status": "healthy"}
EOF

cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
EOF
```

2. Claude Code에게 Dockerfile을 작성하게 한다

```
Claude에게: "이 FastAPI 앱을 위한 Dockerfile을 만들어줘. Python 3.11-slim 기반, requirements.txt 먼저 복사해서 캐시 활용, 포트 8000 노출, uvicorn으로 실행. 각 줄에 주석으로 설명도 달아줘."
```

3. 생성된 Dockerfile을 확인한다

```dockerfile
# Python 3.11 슬림 이미지 사용
FROM python:3.11-slim

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일만 먼저 복사 (캐시 활용)
COPY requirements.txt .

# 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 앱 소스 복사
COPY . .

# 포트 노출
EXPOSE 8000

# 앱 실행
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 관찰 포인트
- requirements.txt를 먼저 복사하는 이유는? (레이어 캐시)
- `--no-cache-dir` 옵션의 역할은?

## 실습 2: 이미지 빌드 및 실행 (30분)

1. Docker 이미지를 빌드한다

```bash
cd ~/docker-practice
docker build -t myapp:v1 .
```

2. 빌드 과정에서 각 레이어를 관찰한다

```bash
docker history myapp:v1
docker images myapp
```

3. 컨테이너를 실행하고 테스트한다

```bash
docker run -d --name myapp-container -p 8000:8000 myapp:v1
curl http://localhost:8000
curl http://localhost:8000/health
docker logs myapp-container
```

4. Claude Code에게 빌드 결과를 분석하게 한다

```
Claude에게: "myapp:v1 이미지의 레이어 정보를 확인하고, 각 레이어의 크기와 역할을 분석해줘. 이미지 총 크기도 알려줘."
```

### 관찰 포인트
- 빌드 시 "Using cache"가 나오는 단계는 어디인가?
- 이미지 크기는 얼마인가?

## 실습 3: Dockerfile 개선 (30분)

1. 소스 코드를 수정하고 재빌드한다

```bash
# app.py에 새 엔드포인트 추가
cat >> app.py << 'EOF'

@app.get("/version")
def version():
    return {"version": "1.1"}
EOF

docker build -t myapp:v2 .
```

2. 캐시가 어디서부터 무효화되는지 관찰한다

3. .dockerignore 파일을 만든다

```bash
cat > .dockerignore << 'EOF'
__pycache__
*.pyc
.git
.env
venv
.dockerignore
Dockerfile
EOF
```

4. Claude Code에게 Dockerfile 최적화를 요청한다

```
Claude에게: "현재 Dockerfile을 분석해서 개선할 점을 찾아줘. 이미지 크기 줄이기, 보안 강화(non-root 사용자), 빌드 캐시 최적화 관점에서 개선된 버전을 만들어줘."
```

5. 개선된 Dockerfile 예시

```dockerfile
FROM python:3.11-slim

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8000/health || exit 1

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 관찰 포인트
- non-root 사용자로 실행하는 이유는?
- HEALTHCHECK 지시어의 역할은?

## 실습 4: 여러 버전 이미지 관리 (20분)

1. 이미지 태그를 관리한다

```bash
docker images myapp
docker tag myapp:v2 myapp:latest
docker images myapp
```

2. 사용하지 않는 이미지를 정리한다

```bash
docker stop myapp-container
docker rm myapp-container
docker rmi myapp:v1
docker system prune -f
docker system df
```

### 관찰 포인트
- `latest` 태그의 의미와 주의점은?
- `docker system prune`이 정리하는 대상은?

## 과제

### 제출물: "Dockerfile 작성 보고서"

```markdown
# Dockerfile 작성 보고서

## 앱 정보
- 앱 이름:
- 프레임워크:
- Python 버전:

## 최종 Dockerfile
(전체 내용 붙여넣기)

## .dockerignore
(내용 붙여넣기)

## 이미지 정보
| 태그 | 크기 | 레이어 수 |
|------|------|----------|
| v1 | | |
| v2 (최적화) | | |

## 최적화 내용
- [ ] non-root 사용자 적용
- [ ] .dockerignore 적용
- [ ] 레이어 캐시 최적화
- [ ] HEALTHCHECK 추가
- [ ] --no-cache-dir 사용

## Dockerfile 지시어 정리
| 지시어 | 역할 | 예시 |
|--------|------|------|
| FROM | | |
| WORKDIR | | |
| COPY | | |
| RUN | | |
| CMD | | |
| EXPOSE | | |
| USER | | |
```

## 강사 참고 사항
- Dockerfile의 각 줄이 이미지 레이어가 된다는 개념을 시각적으로 보여준다
- COPY와 ADD의 차이, CMD와 ENTRYPOINT의 차이는 간략히만 언급한다
- "Claude Code가 만들어준 Dockerfile을 이해하고 수정할 수 있는 것"이 목표임을 강조한다
