# Day 14: 환경 분리 + 백업 — "운영 환경은 소중하니까"

## 학습 목표
- 개발(dev)과 운영(prod) 환경을 분리하여 관리한다
- 환경별 설정 파일(.env.dev, .env.prod)을 사용한다
- cron과 pg_dump로 데이터베이스를 자동 백업한다
- 백업 복원(restore) 절차를 실습한다

## 준비물
- Docker Compose 스택이 동작하는 서버
- PostgreSQL 컨테이너 (Day 8에서 구성)
- Claude Code CLI

## 실습 1: 환경별 설정 분리 (30분)

1. 환경별 .env 파일을 만든다

```bash
cd /opt/apps/my-api-project

cat > .env.dev << 'EOF'
PORT=8000
DEBUG=true
DATABASE_URL=postgresql://appuser:devpass@db:5432/appdb_dev
LOG_LEVEL=debug
CORS_ORIGINS=*
EOF

cat > .env.prod << 'EOF'
PORT=8000
DEBUG=false
DATABASE_URL=postgresql://appuser:prodpass_STRONG@db:5432/appdb_prod
LOG_LEVEL=warning
CORS_ORIGINS=https://myapp.duckdns.org
EOF
```

2. 환경별 Compose override 파일을 만든다

```
Claude에게: "Docker Compose에서 환경 분리를 해줘. (1) docker-compose.yml은 공통 설정, (2) docker-compose.dev.yml은 개발용 오버라이드(디버그 모드, 코드 볼륨 마운트), (3) docker-compose.prod.yml은 운영용(리소스 제한, restart 정책). 각 파일을 만들어줘."
```

3. 환경별로 실행하는 방법을 확인한다

```bash
# 개발 환경
docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up -d

# 운영 환경
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d
```

4. 편의를 위한 Makefile을 만든다

```bash
cat > Makefile << 'EOF'
dev-up:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up -d

dev-down:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down

prod-up:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d

prod-down:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down

logs:
	docker compose logs -f
EOF
```

### 관찰 포인트
- dev와 prod 환경의 핵심 차이점은?
- .env.prod 파일이 git에 포함되면 안 되는 이유는?

## 실습 2: 데이터베이스 백업 스크립트 (35분)

1. 백업 디렉토리를 만든다

```bash
mkdir -p ~/backups/db
```

2. Claude Code에게 백업 스크립트를 만들게 한다

```
Claude에게: "PostgreSQL Docker 컨테이너의 DB를 백업하는 bash 스크립트를 만들어줘. 조건: (1) pg_dump로 SQL 덤프, (2) 파일명에 날짜+시간 포함, (3) gzip 압축, (4) 7일 이상 된 백업 자동 삭제, (5) 성공/실패 로그 기록. ~/backups/backup-db.sh로 저장."
```

3. 생성된 스크립트를 확인한다

```bash
cat > ~/backups/backup-db.sh << 'SCRIPT'
#!/bin/bash
BACKUP_DIR=~/backups/db
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
DB_CONTAINER="my-api-project-db-1"
DB_NAME="appdb_prod"
DB_USER="appuser"
LOG_FILE=~/backups/backup.log

# 백업 실행
echo "[$(date)] Starting backup..." >> "$LOG_FILE"
docker exec "$DB_CONTAINER" pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$BACKUP_DIR/backup_${TIMESTAMP}.sql.gz"

if [ $? -eq 0 ]; then
    SIZE=$(ls -lh "$BACKUP_DIR/backup_${TIMESTAMP}.sql.gz" | awk '{print $5}')
    echo "[$(date)] Backup successful: backup_${TIMESTAMP}.sql.gz ($SIZE)" >> "$LOG_FILE"
else
    echo "[$(date)] ERROR: Backup failed!" >> "$LOG_FILE"
fi

# 7일 이상 된 백업 삭제
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +7 -delete
echo "[$(date)] Cleaned old backups" >> "$LOG_FILE"
SCRIPT
chmod +x ~/backups/backup-db.sh
```

4. 수동으로 백업을 실행하고 확인한다

```bash
~/backups/backup-db.sh
ls -la ~/backups/db/
cat ~/backups/backup.log
```

### 관찰 포인트
- 압축 전후 백업 파일 크기 차이는?
- 7일 보관 정책이면 최대 몇 개의 백업이 유지되는가?

## 실습 3: 자동 백업 cron 설정 (20분)

1. cron에 백업 스크립트를 등록한다

```bash
# 매일 새벽 3시에 백업
(crontab -l 2>/dev/null; echo "0 3 * * * ~/backups/backup-db.sh") | crontab -
crontab -l
```

2. cron 실행을 테스트한다

```bash
# 바로 실행해서 테스트
~/backups/backup-db.sh
ls -la ~/backups/db/
```

3. Claude Code에게 cron 설정을 점검하게 한다

```
Claude에게: "현재 설정된 모든 cron 작업을 확인하고, 백업 스케줄이 올바른지 점검해줘. DuckDNS 업데이트, 헬스체크, DB 백업이 모두 등록되어 있는지 확인해줘."
```

### 관찰 포인트
- cron 표현식 `0 3 * * *`의 각 필드 의미는?
- 백업 시간을 새벽으로 잡는 이유는?

## 실습 4: 백업 복원 실습 (25분)

1. 현재 DB에 테스트 데이터를 넣는다

```bash
docker exec -it my-api-project-db-1 psql -U appuser -d appdb_prod -c \
  "CREATE TABLE IF NOT EXISTS products (id serial PRIMARY KEY, name text, price int);
   INSERT INTO products (name, price) VALUES ('Apple', 1000), ('Banana', 500);
   SELECT * FROM products;"
```

2. 백업을 실행한다

```bash
~/backups/backup-db.sh
```

3. 데이터를 삭제한다 (장애 시뮬레이션)

```bash
docker exec -it my-api-project-db-1 psql -U appuser -d appdb_prod -c "DROP TABLE products;"
docker exec -it my-api-project-db-1 psql -U appuser -d appdb_prod -c "SELECT * FROM products;"
# ERROR: relation "products" does not exist
```

4. 백업에서 복원한다

```bash
LATEST_BACKUP=$(ls -t ~/backups/db/*.sql.gz | head -1)
echo "Restoring from: $LATEST_BACKUP"
gunzip -c "$LATEST_BACKUP" | docker exec -i my-api-project-db-1 psql -U appuser -d appdb_prod
docker exec -it my-api-project-db-1 psql -U appuser -d appdb_prod -c "SELECT * FROM products;"
# 데이터가 복원되었다!
```

### 관찰 포인트
- 백업 없이 데이터가 날아가면 어떻게 되는가?
- 복원에 걸리는 시간은? (데이터 양에 따라)

## 과제

### 제출물: "환경 분리 및 백업 운영 계획서"

```markdown
# 환경 분리 및 백업 운영 계획서

## 환경 구성
| 항목 | 개발(dev) | 운영(prod) |
|------|----------|-----------|
| DEBUG | true | false |
| DB 비밀번호 | devpass | 강력한 비밀번호 |
| CORS | * | 특정 도메인만 |
| 로그 레벨 | debug | warning |

## Compose 파일 구조
- docker-compose.yml: 공통
- docker-compose.dev.yml: 개발 오버라이드
- docker-compose.prod.yml: 운영 오버라이드

## 백업 정책
- 대상: PostgreSQL (appdb_prod)
- 주기: 매일 03:00
- 보관 기간: 7일
- 저장 위치: ~/backups/db/
- 압축: gzip

## 백업/복원 테스트 결과
| 항목 | 결과 |
|------|------|
| 백업 파일 크기 | |
| 백업 소요 시간 | |
| 복원 소요 시간 | |
| 데이터 무결성 | |

## cron 작업 목록
| 스케줄 | 작업 | 설명 |
|--------|------|------|
| */5 * * * * | DuckDNS | IP 업데이트 |
| * * * * * | health-check | 헬스체크 |
| 0 3 * * * | backup-db | DB 백업 |
```

## 강사 참고 사항
- .env.prod 파일은 절대 git에 커밋하지 않도록 .gitignore에 추가시킨다
- 백업 복원 실습은 "실제로 데이터를 날리고 복원하는" 체험이 중요하다
- 실제 운영에서는 백업을 원격 스토리지(S3 등)에도 보관해야 함을 언급한다
