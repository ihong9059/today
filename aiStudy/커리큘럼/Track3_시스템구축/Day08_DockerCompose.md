# Day 8: Docker Compose — "앱+DB+Nginx를 한 번에"

## 학습 목표
- Docker Compose의 필요성과 YAML 문법을 이해한다
- 앱 + PostgreSQL + Nginx 3-Tier 아키텍처를 Compose로 구성한다
- 볼륨(Volume)을 사용하여 데이터를 영구 보존한다
- `docker compose up/down` 명령으로 전체 스택을 관리한다

## 준비물
- Day 7에서 만든 Docker 이미지
- Docker Compose (docker-compose-plugin)
- Claude Code CLI

## 실습 1: 첫 Docker Compose 파일 (30분)

1. 프로젝트 디렉토리를 구성한다

```bash
mkdir -p ~/compose-practice && cd ~/compose-practice
mkdir -p app nginx
```

2. 앱 코드를 준비한다 (DB 연결 포함)

```bash
cat > app/app.py << 'PYEOF'
from fastapi import FastAPI
import os
import asyncpg

app = FastAPI()
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://appuser:secret@db:5432/appdb")

@app.get("/")
def root():
    return {"message": "3-Tier App Running!"}

@app.get("/health")
def health():
    return {"status": "healthy", "db": DATABASE_URL.split("@")[1]}
PYEOF

cat > app/requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
asyncpg==0.29.0
EOF

cat > app/Dockerfile << 'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
EOF
```

3. Claude Code에게 Compose 파일을 만들게 한다

```
Claude에게: "Docker Compose 파일을 만들어줘. 3개 서비스: (1) app: 위의 FastAPI Dockerfile 빌드, 포트 8000, DATABASE_URL 환경변수, (2) db: postgres:15, 볼륨으로 데이터 영구 저장, 사용자/비밀번호/DB명 설정, (3) nginx: nginx:alpine, 80포트 → app:8000 리버스 프록시. depends_on도 설정해줘."
```

### 관찰 포인트
- 서비스 간 네트워크 통신에서 서비스 이름(db, app)이 DNS 역할을 하는 이유는?
- depends_on이 보장하는 것과 보장하지 않는 것은?

## 실습 2: Nginx 설정 + Compose 실행 (30분)

1. Nginx 설정 파일을 만든다

```bash
cat > nginx/default.conf << 'EOF'
upstream app_server {
    server app:8000;
}

server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://app_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
```

2. docker-compose.yml을 확인하고 실행한다

```yaml
version: "3.8"

services:
  app:
    build: ./app
    environment:
      - DATABASE_URL=postgresql://appuser:secret@db:5432/appdb
    depends_on:
      - db
    restart: always

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: appdb
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app
    restart: always

volumes:
  pgdata:
```

3. Compose를 실행한다

```bash
cd ~/compose-practice
docker compose up -d
docker compose ps
docker compose logs
```

4. 접속을 테스트한다

```bash
curl http://localhost
curl http://localhost/health
```

### 관찰 포인트
- `docker compose up -d`에서 서비스 시작 순서는?
- 볼륨 `pgdata`는 실제로 어디에 저장되는가?

## 실습 3: Compose 관리 명령어 (25분)

1. 개별 서비스 로그를 확인한다

```bash
docker compose logs app
docker compose logs db
docker compose logs -f nginx
```

2. 서비스를 개별적으로 재시작한다

```bash
docker compose restart app
docker compose stop db
docker compose start db
```

3. 앱 코드를 수정하고 재빌드한다

```bash
# app/app.py 수정 후
docker compose up -d --build app
docker compose ps
```

4. Claude Code에게 Compose 상태를 분석하게 한다

```
Claude에게: "현재 Docker Compose 스택의 상태를 확인해줘. 각 서비스의 상태, 포트 매핑, 리소스 사용량, 로그에서 에러가 있는지 종합 분석해줘."
```

### 관찰 포인트
- `--build` 플래그 없이 up하면 이전 이미지를 재사용하는가?
- 하나의 서비스만 재시작해도 다른 서비스에 영향이 없는가?

## 실습 4: 볼륨과 데이터 영구성 확인 (25분)

1. DB에 데이터를 넣는다

```bash
docker compose exec db psql -U appuser -d appdb -c "CREATE TABLE test (id serial PRIMARY KEY, name text);"
docker compose exec db psql -U appuser -d appdb -c "INSERT INTO test (name) VALUES ('hello'), ('docker');"
docker compose exec db psql -U appuser -d appdb -c "SELECT * FROM test;"
```

2. 전체 스택을 내리고 다시 올린다

```bash
docker compose down
docker compose up -d
docker compose exec db psql -U appuser -d appdb -c "SELECT * FROM test;"
# 데이터가 살아있다!
```

3. 볼륨까지 삭제하면 데이터가 사라진다

```bash
docker compose down -v
docker compose up -d
docker compose exec db psql -U appuser -d appdb -c "SELECT * FROM test;"
# 에러: 테이블이 없다
```

### 관찰 포인트
- `docker compose down`과 `docker compose down -v`의 차이는?
- 볼륨 데이터의 백업은 어떻게 하는가?

## 과제

### 제출물: "3-Tier Docker Compose 구성서"

```markdown
# 3-Tier Docker Compose 구성서

## 아키텍처
```
[Client] → :80 [Nginx] → :8000 [App] → :5432 [PostgreSQL]
```

## docker-compose.yml
(전체 내용 붙여넣기)

## 서비스별 정보
| 서비스 | 이미지 | 포트 | 볼륨 | 환경변수 |
|--------|-------|------|------|---------|
| nginx | | | | |
| app | | | | |
| db | | | | |

## 데이터 영구성 테스트
- compose down 후 재시작: 데이터 유지됨 / 사라짐
- compose down -v 후 재시작: 데이터 유지됨 / 사라짐

## 배운 Compose 명령어
| 명령어 | 설명 |
|--------|------|
| docker compose up -d | |
| docker compose down | |
| docker compose logs | |
| docker compose exec | |
| docker compose ps | |
```

## 강사 참고 사항
- YAML 들여쓰기 에러가 가장 흔한 실수이므로, 에디터의 공백/탭 설정을 확인시킨다
- depends_on은 컨테이너 시작 순서만 보장하고, 앱 ready 상태는 보장하지 않음을 설명한다
- 볼륨 삭제 시 데이터가 영구 손실되므로 `-v` 옵션 사용 시 주의를 강조한다
