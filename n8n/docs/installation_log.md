---
title: n8n revita 설치 이력
type: ops-log
created: 2026-05-05
updated: 2026-05-05
tags: [n8n, docker, revita, installation, 운영로그]
links: [README]
---

# n8n revita 설치 이력

> 시간순 기록. 각 단계의 명령·결과·이슈·해결을 그대로 남긴다.

---

## [2026-05-05 17:00] 폴더 신설 (사전 준비)

### 작업
- `C:\todo\today\n8n\` 폴더 신설
- README.md 작성 (왜 + Docker 설치 절차 8섹션)
- 하위 디렉토리 생성: `workflows/` `docs/` `customer-demos/` `credentials/`
- `.gitignore` 작성 (credentials/.env / data/ / backups/ 제외)

## [2026-05-05 17:15] 서버 사전점검 (paramiko 자동)

### 명령
- `python C:\todo\today\n8n\docs\precheck.py` (uttec@100.89.56.69)

### 결과 — 설치 가능, 자원 제약 있음

| 항목 | 값 | 평가 |
|------|-----|------|
| 호스트 | odroidc2 (Tailscale home-odroidc2) | revita 아닌 ODROID-C2 |
| OS | Armbian 26.2.1 / Ubuntu 24.04 noble / 커널 6.18.15 | 최신 LTS |
| Arch | aarch64 / Cortex-A53 4코어 | ARM64 (multi-arch n8n 호환 ✅) |
| RAM | 1.9GB (가용 1.6GB) + Swap 958MB | n8n OK, AI 워크플로우 빠듯 |
| 디스크 | /dev/mmcblk1p1 7.0GB (가용 5.0GB, 28%) | microSD/eMMC, 마모 주의 |
| Uptime | 17일 19시간 | 안정 |
| Docker | ❌ 미설치 | Step 0-1 필요 |
| 포트 5678 | ✅ free | |
| sudo | 비밀번호 필요 | 설치 시 입력 |
| Hub.docker.com | HTTP 200 | ✅ |

### 결정
- 서버 변경: revita → home-odroidc2 (실제 활성 + 사용 가능)
- README.md 업데이트: §3 인프라 / Step 0 / .env / docker-compose.yml에 ARM64+저자원 대응 반영
  - NODE_OPTIONS=--max-old-space-size=768 (Node.js 메모리 제한)
  - deploy.resources.limits.memory=1024M (컨테이너 메모리 캡)
  - DB_TYPE=sqlite + EXECUTIONS_DATA_PRUNE=true (7일 자동 정리)
  - 백업 14→7일 단축

### 다음 단계
- Docker 설치 (sudo 비밀번호 입력 필요)
- ~/n8n/ 디렉토리 + .env + docker-compose.yml
- `docker compose up -d` 기동
- Hello World 워크플로우

## [2026-05-05 17:20] Docker 설치 — paramiko 자동 (소요 171s)

### 명령
- `python C:\todo\today\n8n\docs\install_docker.py`
- 단계: `apt update` → `apt install curl ca-certificates` → `get.docker.com | sh` → `usermod -aG docker uttec` → `systemctl enable docker` → `docker run hello-world`

### 결과
- ✅ Docker Engine **29.4.2** (linux/arm64) 설치 완료
- ✅ Docker Compose **v5.1.3**
- ✅ hello-world 정상 실행 (arm64v8 이미지)
- ✅ uttec 사용자 docker 그룹 추가
- ✅ systemd 서비스 enabled

## [2026-05-05 17:25] n8n 설치 + 기동

### 명령
- `python C:\todo\today\n8n\docs\install_n8n.py` (.env / docker-compose.yml 업로드)
- `python C:\todo\today\n8n\docs\start_n8n.py` (compose pull + up)
- `python C:\todo\today\n8n\docs\verify_n8n.py` (헬스체크)

### 이슈 + 해결
1. **이슈**: `sudo cd ~/n8n && docker compose ...` 실패 — sudo가 shell built-in `cd`를 실행 못함
   **해결**: `sudo bash -c '...'` + `docker compose -f /home/uttec/n8n/docker-compose.yml` 절대경로 사용

### 결과
- ✅ n8n **2.18.7** 컨테이너 기동 (포트 5678, 0.0.0.0 + IPv6 LISTEN)
- ✅ DB 마이그레이션 30+건 정상 완료 (SQLite 기본)
- ✅ JS Task Runner 등록 완료
- ✅ HTTP 200 — `http://localhost:5678/` 및 `http://100.89.56.69:5678/` (Tailscale 외부)
- ✅ Basic Auth 정상 작동 (HTML 17169 bytes 응답)
- ✅ 메모리: 283 MiB / 1 GiB 한도 (27.7%)
- ✅ CPU: 0.22% (warmup 후 idle)

### 경고 (운영 시 고려)
1. `N8N_RUNNERS_ENABLED` 환경변수 deprecated — 다음 docker-compose.yml 갱신 시 제거
2. Python 3 task runner 미설치 — JS 노드만 사용하므로 영향 없음 (Python 노드 사용 시 `n8nio/n8n-python` 이미지 검토)

### 산출물
- 원격 `~/n8n/` (uttec@100.89.56.69):
  - `.env` (chmod 600)
  - `docker-compose.yml`
  - `data/` (n8n SQLite + 자격증명 + 워크플로우)
  - `backups/` (백업 cron 미설정 — 다음 단계)
- 로컬 `C:\todo\today\n8n\credentials\n8n_basic_auth.txt` (gitignored)

### 접속 정보
- URL: http://100.89.56.69:5678/ (Tailscale 내부망)
- User: uttec
- Password: `n8n/credentials/n8n_basic_auth.txt` 참조

### 다음 단계
- Chrome으로 접속 → 첫 로그인 (n8n 2.x는 Owner 계정 생성 화면 표시)
- Hello World 워크플로우 1개 (Manual Trigger → Set 노드)
- 위시캣 자동 검색 워크플로우 설계 시작
- 백업 cron 등록 (~/n8n/backup.sh + crontab)

## [2026-05-05 17:35] deprecated env 정리 + 컨테이너 recreate

### 배경
- n8n 2.x에서 `N8N_BASIC_AUTH_*` 3종 + `N8N_RUNNERS_ENABLED` 1종 deprecated 확인
- 검증: `/rest/login` 401 반환(User Management) / GET / 인증 무관 200 / 컨테이너 env에는 박혀있으나 실제 로직 무시
- 결정: deprecated env 제거 + Owner 계정(User Management) 모델로 일원화

### 명령
- `python C:\todo\today\n8n\docs\cleanup_env.py`
  - 원격 .env / docker-compose.yml 백업 후 새 버전 업로드
  - `docker compose down && up -d` 재생성

### 변경 사항
**제거** (env + compose 모두):
- `N8N_BASIC_AUTH_ACTIVE=true`
- `N8N_BASIC_AUTH_USER`
- `N8N_BASIC_AUTH_PASSWORD`
- `N8N_RUNNERS_ENABLED=true`

**유지/추가**:
- `N8N_HOST` / `N8N_PROTOCOL` / `N8N_PORT` / `WEBHOOK_URL`
- `TZ` / `GENERIC_TIMEZONE` / `NODE_OPTIONS=--max-old-space-size=768`
- `DB_TYPE=sqlite` / `EXECUTIONS_DATA_PRUNE=true` / `EXECUTIONS_DATA_MAX_AGE=168`
- `N8N_SECURE_COOKIE=false` (HTTP Tailscale 내부망)
- `deploy.resources.limits.memory=1024M`

### 결과
- ✅ 컨테이너 env: CLEAN (deprecated 변수 0개)
- ✅ 로그: deprecation 메시지 0건
- ✅ HTTP 200 (localhost + Tailscale 외부)
- ✅ 메모리: 240 MiB / 1 GiB (23.5%, 정리 후 미세 감소)
- ✅ 백업 보존: `~/n8n/.env.bak.*` + `~/n8n/docker-compose.yml.bak.*`

### 로컬 동기화
- `n8n/README.md` §4 Step 1, Step 2 `.env` / `docker-compose.yml` 예시 갱신
- `n8n/credentials/n8n_basic_auth.txt` → "Owner 계정 메모"로 용도 변경
- Chrome으로 http://100.89.56.69:5678/ 오픈

## [2026-05-05 17:50] Owner 계정 생성 + 첫 워크플로우(Hello World) 진행

### 결과
- ✅ Owner 계정 등록 완료 (홍광선 / ihong9059@gmail.com / UTTEC)
- ✅ 편집기 진입 — Overview 화면, "Welcome, 홍광선!" 표시
- 🔄 Hello World 워크플로우 (Manual Trigger → Edit Fields(Set))
  - n8n 2.x에서 `Set` 노드 표시명이 **`Edit Fields (Set)`**로 변경됨 (괄호 표기로 호환)

## [2026-05-05 18:07] 백업 cron 등록

### 시도 1: user crontab — ❌ 실패
- `crontab -l` / `crontab -` 모두 `/var/spool/cron/: mkstemp: Permission denied`
- 원인: Armbian 26.2 환경에서 user crontab 디렉토리 권한 이슈

### 시도 2: /etc/cron.d/ drop-in — ✅ 성공
- 명령: `python C:\todo\today\n8n\docs\setup_cron_fix.py`
- 산출물 (원격):
  - `/home/uttec/n8n/backup.sh` (1146 bytes, chmod 755, uttec:uttec)
  - `/etc/cron.d/n8n-backup` (293 bytes, chmod 644, root:root)
- cron 데몬 재시작 (active, PID 112943)
- 매뉴얼 테스트 백업 1건 생성: `~/n8n/backups/n8n_data_20260505_180629.tar.gz` (365K)
- 다음 자동 실행: **2026-05-06 03:00**

### 백업 정책
- 매일 03:00 자동 실행 (사용자 개입 0)
- 보관: 7일 (find -mtime +7 자동 삭제)
- 디스크 사용 예상: 7일 × ~365K = 약 2.5MB (5GB 여유 디스크에 무부담)
- 디스크 80% 도달 시 cron.log에 WARN 기록
- 복구 명령: `tar xzf n8n_data_YYYYMMDD_HHMMSS.tar.gz -C ~/n8n/` + `docker compose restart n8n`

### 다음 단계
- Hello World 워크플로우 마무리 (현재 진행)
- 위시캣 자동 검색 워크플로우 (Day 2~3)
- 외부 백업 검토 (digitalocean rsync — 선택사항)

## [2026-05-05 18:30] 위시캣 자동 검색 1차 자동화 완성

### 배경
- 사용자 매일 `/wishket-check` skill을 PC에서 수동 호출 (30분 소요)
- 원격(odroidc2)에 Claude Code 2.1.112 + .credentials.json(claudeAiOauth) 설치 확인
- ~/today repo 미동기 → 이력서 컨텍스트는 인라인으로 프롬프트에 포함하는 방식 채택

### 검증 단계
1. `claude -p` 비대화형 동작 확인 — "OK" 응답 정상
2. `--allowedTools "WebFetch"` 플래그로 권한 자동 승인 → 위시캣 페이지 fetch 성공
3. 35초에 5건 평가 + JSON 출력 (1차 테스트, 마크다운 코드펜스 포함)
4. 정제 로직(sed로 ```json 펜스 제거 + jq empty 검증) 추가 → 깔끔한 JSON

### 산출물
- `/home/uttec/n8n/wishket-prompt.txt` — 이력서 매트릭스 + 출력 형식 (1,249 bytes)
- `/home/uttec/n8n/wishket-check.sh` (chmod 755, 1,927 bytes) — claude 호출 + JSON 정제 + 결과 저장 + 옵션 N8N_WEBHOOK_URL POST
- `/etc/cron.d/n8n-wishket` — 매일 09:00 uttec 실행
- `/home/uttec/n8n/data/wishket/YYYY-MM-DD.json` — 일별 결과 (오늘 첫 파일 1,924 bytes)
- `/home/uttec/n8n/data/wishket/log.txt` — 실행 로그
- jq 1.7 설치 확인 (이미 있음)

### 첫 실행 결과 (2026-05-05 18:30, 43초 소요)
- 8개 프로젝트 평가, 2건 high-fit (≥7)
- ⭐ **#155004 전자칠판 기술지원 챗봇 앱 구축** (score 8, 1,500만/60일) — AI+임베디드+교육 융합, 즉시 검토 권장
- #154717 Python/React 특허 행정 자동화 (score 7, 월 500만/90일) — 한일 특허 도메인 매칭
- 일관성 검증: #155037 상품권 자동 매입 — 어제 본인 부적합 판단과 자동 평가(score 3) 일치 → AI 신뢰성 확인

### 모듈성
- 프롬프트 / 스크립트 / cron 분리 → 이력서 변경 시 prompt 파일만 수정
- N8N_WEBHOOK_URL 환경변수 지원 → 다음 Phase에서 n8n UI 통합 가능

### 다음 단계
- ⭐ #155004 전자칠판 챗봇 본인 검토 (위시캣 페이지 직접 확인, 지원 여부 결정)
- n8n Webhook 워크플로우 (호스트 cron이 webhook POST → n8n이 시각화/Slack 발송)
- 마지막 ID 추적 상태 파일 (~/n8n/data/wishket/last_id.txt) — 신규만 평가하도록 최적화
- digitalocean rsync 외부 백업

## [2026-05-05 18:48] 위시캣 자동화 v2 — Notion + Email 통합

### 설계
- 모듈 분리: `notion_add.py` + `email_send.py` 헬퍼 + `wishket-check.sh` 메인
- 비밀 분리: `~/n8n/.secrets` (chmod 600, 소스 환경변수)
- score ≥ 7 (NOTION_SCORE_THRESHOLD / EMAIL_SCORE_THRESHOLD env로 조정 가능)

### Notion 통합
- 기존 PC의 `notion-sync.py` hook과 동일한 PAGE_ID `349cb620-8c2b-817d-a7fe-c887ecdee292`
- "진행" 섹션 heading_id 동적 조회 → to_do 블록 PATCH append
- 포맷: `[위시캣 #ID] 제목 (예산/기간, score N)`
- 사용자의 다음 /work-start hook이 이 항목을 작업보고서에 자동 동기화

### Email 통합
- Gmail SMTP_SSL (smtp.gmail.com:465) + App Password 인증
- 발신 = 수신 = ihong9059@gmail.com (자기 자신에게)
- 본문: high-fit 상세 + 전체 평가 + 위시캣 링크 자동 생성

### 검증 (오늘자 JSON 재처리)
- ✅ Notion: 2/2 추가 (#155004 score 8 + #154717 score 7)
- ✅ Email: 수신 확인 (subject "[위시캣] 2026-05-05 적합 프로젝트 2건 발견")
- 소요: Notion 1초 + Email 2초

### 보안 모델
- `.secrets` 파일: chmod 600, uttec only readable, gitignored
- NOTION_TOKEN은 PC env에서 SFTP로 직접 전달 (로컬 디스크에 token 파일 안 남김)
- Gmail App Password는 사용자 직접 발급 → 16자 (공백 제거된 형태로 저장)
- 2대 PC 사용 환경에서도 안전 — 토큰 파일은 ODROID-C2에만 존재

### 다음 단계
- 내일 09:00 첫 자동 실행 검증 (cron 자동)
- (선택) n8n UI 워크플로우 시각화 — 영업 미팅 데모 자료용
- last_id 추적 (신규만 평가) — 토큰/시간 최적화

## [2026-05-05 18:55] n8n UI 워크플로우 시각화 — REST API 자동 구축

### 목적
- 위시캣 자동화의 모든 기능은 호스트 wrapper로 이미 완성
- n8n UI 워크플로우는 **영업 미팅 데모용 시각화** + Executions 탭에서 실행 이력 시각 확인

### 워크플로우 설계 (7 nodes)
```
1. Webhook (호스트 cron POST)
   ↓
2. JSON 파싱 + 카운트 (Code, JS)
   ↓
3. 적합 ≥ 1 ? (IF)
   ↓ true                              ↓ false
4-A. 요약 메시지 (Set: subject/body)   4-B. 적합 없음 (Set)
   ↓                                   ↓
5. 결과 통합 (Merge, append mode)
   ↓
6. n8n Executions 기록 + 응답 (Code, JSON)
```

### 자동 구축 방법 (REST API)
- 사용자 UI 클릭 없이 Python urllib + cookie auth로 워크플로우 생성·활성화
- 스크립트: `C:\\todo\\today\\n8n\\docs\\create_n8n_workflow.py` + `activate_with_version.py`

### 발견·해결한 n8n 2.x 특이점
1. **PATCH active=true 반응 없음** → active 필드는 PATCH로 변경 안 됨
2. **POST /activate 400 "versionId Required"** → body에 `versionId` 포함하니 200
   ```python
   POST /rest/workflows/{id}/activate
   body: {"versionId": "<workflow.versionId>"}
   ```
3. **컨테이너 재시작도 미해결** → 위 versionId 누락이 진짜 원인
4. **PUT /rest/workflows/{id} 미지원** → POST/PATCH만 사용

### 산출물
- 워크플로우 ID `zuBvYU3mscNqfMzD` ("위시캣 일일 결과 시각화")
- Production webhook: `http://100.89.56.69:5678/webhook/wishket-results`
- `~/n8n/.secrets`에 `N8N_WEBHOOK_URL` 추가 (wrapper가 자동 POST)

### E2E 검증 (호스트 wrapper-style POST)
```
HTTP 200
{
  "received_at": "2026-05-05T09:56:50.725Z",
  "status": "high_fit_found",
  "subject": "[위시캣] 2026-05-05 적합 2건",
  "visualized": "✅ wrapper에서 Notion + Email 이미 처리됨, 본 워크플로우는 흐름 시각화 + 이력 보존 용도",
  "detail": {
    "body": "2026-05-05 검색 결과\\n전체 8건 / 적합 2건\\n[7] #154717 Python/React 특허 자동화\\n[8] #155004 전자칠판 챗봇 앱"
  }
}
```

### 영업 활용
- **Stage 0 견적서 부록 캡처**: workflow 캔버스 + Executions 탭 (시간 흐름) 스크린샷
- **고객 미팅 라이브 데모**: Chrome으로 워크플로우 페이지 열고 실시간 흐름 시연
- **차별화 카피**: "Foundry Pipeline Builder의 시각 흐름을 1/100 가격에 — 매일 검색·평가·알림이 이렇게 자동으로 흐릅니다"

---

## 템플릿 (다음 작업 시 복사하여 사용)

```
## [YYYY-MM-DD HH:MM] <작업 요약>

### 명령
\`\`\`bash
# 실행한 명령 그대로
\`\`\`

### 결과
- 정상 / 오류 메시지

### 이슈
- 발생한 문제

### 해결
- 어떻게 우회/수정했는지

### 다음
- 후속 작업
```
