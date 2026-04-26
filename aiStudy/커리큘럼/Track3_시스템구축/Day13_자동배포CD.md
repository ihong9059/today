# Day 13: 자동 배포 (CD) — "push하면 서버에 자동 반영"

## 학습 목표
- CD(Continuous Deployment) 파이프라인의 전체 흐름을 이해한다
- GitHub Actions에서 Docker 이미지를 빌드하고 레지스트리에 push한다
- 서버에서 자동으로 최신 이미지를 pull하여 배포한다
- GitHub Secrets로 민감 정보를 안전하게 관리한다

## 준비물
- Day 12의 GitHub 레포 + CI 워크플로우
- Docker가 설치된 서버
- GitHub Container Registry(ghcr.io) 사용
- Claude Code CLI

## 실습 1: GitHub Secrets 설정 (20분)

1. 배포에 필요한 시크릿을 등록한다

```bash
# 서버 SSH 키를 시크릿으로 등록
gh secret set SERVER_HOST --body "YOUR_SERVER_IP"
gh secret set SERVER_USER --body "deploy"
gh secret set SERVER_SSH_KEY < ~/.ssh/id_ed25519
```

2. 등록된 시크릿을 확인한다

```bash
gh secret list
```

3. Claude Code에게 시크릿 관리를 점검하게 한다

```
Claude에게: "현재 GitHub 레포의 Secrets 목록을 확인하고, CD 파이프라인에 필요한 시크릿이 모두 등록되어 있는지 점검해줘. 빠진 것이 있으면 알려줘."
```

### 관찰 포인트
- 코드에 비밀번호나 SSH 키를 직접 넣으면 안 되는 이유는?
- GitHub Secrets의 값은 로그에서 어떻게 마스킹되는가?

## 실습 2: Docker 이미지 자동 빌드 + Push (35분)

1. Dockerfile을 프로젝트 루트에 추가한다

```bash
cd ~/git-practice
cat > Dockerfile << 'EOF'
FROM python:3.11-slim
RUN groupadd -r appuser && useradd -r -g appuser appuser
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN chown -R appuser:appuser /app
USER appuser
EXPOSE 8000
CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8000"]
EOF
```

2. Claude Code에게 CD 워크플로우를 만들게 한다

```
Claude에게: "GitHub Actions CD 워크플로우를 만들어줘. 파일: .github/workflows/cd.yml. 조건: (1) main push 시에만 실행, (2) 먼저 테스트 실행, (3) Docker 이미지를 ghcr.io에 빌드+push, (4) SSH로 서버에 접속하여 docker pull + docker compose up -d 실행. GitHub Secrets에서 SERVER_HOST, SERVER_USER, SERVER_SSH_KEY를 사용해줘."
```

3. CD 워크플로우를 확인한다

```yaml
name: CD

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: pip install -r requirements.txt
      - run: pytest tests/ -v

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            docker pull ghcr.io/${{ github.repository }}:latest
            cd /opt/apps/my-api-project
            docker compose down
            docker compose up -d
            docker system prune -f
```

### 관찰 포인트
- `needs: test`가 보장하는 것은? (테스트 통과 후에만 빌드)
- ghcr.io는 Docker Hub와 어떻게 다른가?

## 실습 3: 서버 Compose 파일 업데이트 (30분)

1. 서버의 docker-compose.yml을 ghcr.io 이미지를 사용하도록 수정한다

```bash
ssh deploy@myserver
cat > /opt/apps/my-api-project/docker-compose.yml << 'EOF'
version: "3.8"

services:
  app:
    image: ghcr.io/YOUR_USERNAME/git-practice:latest
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
EOF
```

2. ghcr.io 로그인을 설정한다

```bash
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_USERNAME --password-stdin
```

3. 배포를 테스트한다

```bash
docker compose pull
docker compose up -d
curl http://localhost
```

### 관찰 포인트
- 이미지를 직접 빌드하지 않고 pull 하는 장점은?
- 배포 시 다운타임은 얼마나 발생하는가?

## 실습 4: 전체 CD 파이프라인 테스트 (25분)

1. 코드를 수정하고 push한다

```bash
cd ~/git-practice
# app.py 수정
sed -i 's/Hello Team/Hello CI-CD/' src/app.py
git add .
git commit -m "Update greeting message"
git push origin main
```

2. GitHub Actions 실행을 모니터링한다

```bash
gh run list
gh run watch
```

3. 서버에서 변경이 반영되었는지 확인한다

```bash
curl http://YOUR_SERVER_IP
# "Hello CI-CD" 가 나와야 한다
```

4. Claude Code에게 전체 파이프라인을 검증하게 한다

```
Claude에게: "가장 최근 GitHub Actions CD 실행의 결과를 확인해줘. test, build-and-push, deploy 세 단계가 모두 성공했는지, 각 단계 소요 시간은 얼마인지, 서버에 새 버전이 실제로 배포되었는지 종합 확인해줘."
```

### 관찰 포인트
- push → 서버 반영까지 총 소요 시간은?
- 어떤 단계에서 가장 시간이 많이 걸리는가?

## 과제

### 제출물: "CD 파이프라인 구축 보고서"

```markdown
# CD 파이프라인 구축 보고서

## 파이프라인 구성
```
[push] → [test] → [build & push image] → [deploy to server]
```

## CD 워크플로우
(cd.yml 전체 내용)

## GitHub Secrets
| 이름 | 용도 | 등록 여부 |
|------|------|----------|
| SERVER_HOST | 서버 IP | |
| SERVER_USER | SSH 사용자 | |
| SERVER_SSH_KEY | SSH 키 | |

## 배포 테스트 결과
| 단계 | 소요시간 | 결과 |
|------|---------|------|
| test | | |
| build & push | | |
| deploy | | |
| 총 시간 | | |

## 서버 확인
- 배포 전 응답:
- 배포 후 응답:
- 다운타임:

## 수동 배포 vs 자동 배포 비교
| 항목 | 수동 (Day 3) | 자동 (Day 13) |
|------|-------------|--------------|
| 소요 시간 | | |
| 실수 가능성 | | |
| 재현 가능성 | | |
```

## 강사 참고 사항
- GitHub Container Registry는 별도 가입 없이 GitHub 계정으로 사용 가능하다
- SSH 키를 Secrets에 등록할 때 줄바꿈이 깨지지 않도록 주의한다
- 첫 CD가 성공하면 "push만 하면 배포 끝"이라는 체험이 매우 강렬하다 — 이 순간을 강조한다
