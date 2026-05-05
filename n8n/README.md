---
title: n8n — 왜 설치하는가 + Docker 설치 가이드
type: infrastructure
created: 2026-05-05
updated: 2026-05-05
tags: [n8n, docker, revita, automation, 영업전략, foundry, pipeline-builder]
links: [Pipeline_Builder_적용_검토, n8n_실행_가이드, Core_Services_무료대체_매핑, 영업전략, Stage0_Core_Services_견적서]
---

# n8n 폴더 — 설치 이유 + Docker 셋업 + 운영

> **이 폴더의 목적**: revita 서버에 n8n Docker를 설치하기 위한 "왜·무엇·어떻게"를 한 곳에 모은다.
> 영업 활용·워크플로우 운영 전략은 [`smartFactory/업무효율화/참고/n8n_실행_가이드.md`](../smartFactory/업무효율화/참고/n8n_실행_가이드.md) 참조.

---

## 1. 왜 지금 n8n을 설치하는가 (4가지 동시 목적)

### 1-1. 영업 차별화 — Pipeline Builder의 1/100 가격
- 팔란티어 Foundry **Pipeline Builder**(2층 데이터 통합)는 라이선스만 연 수억~수십억
- 1:1 클론은 수십억 달러 R&D, Lite 자체 구현은 NIH(Not Invented Here) 함정
- **결론**: n8n(오픈소스, 노드 400+, AI 노드 포함, Self-host)으로 80% 대체
- 영업 카피: **"Pipeline Builder가 풀려는 문제(사일로 해체 + 비코더 협업 + AI 통합)를 우리 도구 스택으로 1/100 비용에 해결"**
- 출처: [`smartFactory/업무효율화/참고/Pipeline_Builder_적용_검토.md`](../smartFactory/업무효율화/참고/Pipeline_Builder_적용_검토.md)

### 1-2. Stage 0 견적서의 약속 산출물 #4
- `영업/Stage0_Core_Services_견적서.md`에서 **"n8n 자체 호스팅 1대 + 첫 워크플로우 1개"**를 명시 산출물로 약속
- 첫 시범 고객 발송 전에 **본인 환경에서 실제 동작하는 데모**가 필요
- 데모 없이 견적서만 보내는 것은 신뢰도가 떨어짐 — 화면 캡처 1장이 백 마디 설명보다 강함
- 출처: [`영업/Stage0_Core_Services_견적서.md`](../영업/Stage0_Core_Services_견적서.md)

### 1-3. 본인 업무 자동화 — 즉시 ROI
- `/wishket-check` 등 매일 수동 실행하는 skill을 cron 자동화
- 매일 30분 절약 + 누락 방지 — 1주 학습으로 **매일 사용하는 도구**가 됨
- 학습 → 데모 → 영업 자료의 자연스러운 파이프라인

### 1-4. Foundry 5층 1~2층의 자체 구현 증명
- `Core_Services_무료대체_매핑.md`에서 약속한 **API Gateway**(1층 #7) + **Deployment Pipeline**(1층 #8)을 n8n Webhook으로 보강
- 동시에 **2층 Data Connection**(데이터 통합)의 80% 대체 도구 역할
- "Foundry급 시스템을 무료 도구로 재현했습니다"의 가시적 증거

---

## 2. n8n이 무엇인가 (30초 요약)

**드래그&드롭 노드 연결로 워크플로우를 만드는 오픈소스 자동화 플랫폼.**

- **트리거 노드**: 웹훅 / 스케줄(cron) / 이벤트 / 파일 변경
- **액션 노드**: 400+ 종 (HTTP / DB / AI Agent / 이메일 / Slack / Notion / Google / GitHub …)
- **시각적 캔버스**: 비코더(영업·기획·디자이너)도 워크플로우 이해·수정 가능
- **Self-host 가능**: 데이터가 외부 클라우드를 거치지 않음 → 대기업 보안 대응

```
[매일 09:00 트리거] → [위시캣 스크래핑] → [Claude 적합도 평가]
       → [점수 7+ 필터] → [Notion DB 추가] → [Slack 알림]
```

→ 위 흐름을 **15노드, 30분이면 구현**. 같은 걸 Python으로 만들면 200줄 + 인프라 셋업 1일.

---

## 3. 어디에 설치하는가 (인프라 결정)

| 옵션 | 위치 | 장점 | 단점 | 평가 |
|------|------|------|------|------|
| **A. home-odroidc2** | Tailscale `100.89.56.69` | 24h 가동(uptime 17일+) / Tailscale 접근 / 비용 0 / Self-host 영업 메시지 | ARM64 / RAM 2GB / 디스크 7GB(SD) | ⭐⭐⭐ **선택** |
| B. 본인 PC Docker | 로컬 | 학습 편함 / 즉시 시작 | PC 끄면 워크플로우 정지 | ⭐ |
| C. n8n Cloud | n8n.io | 설치 0분 | 월 $24~ / Self-host 영업 메시지 약화 | ⭐⭐ |
| D. digitalocean droplet | `100.94.160.121` (uttec-edu 호스팅) | x86_64 / 디스크/RAM 여유 | 운영 영향 우려 / 비용 가중 | ⭐⭐ (대안) |

**선택**: **A. home-odroidc2 Docker** — 영업 메시지(Self-host) + 24h 가동 + 비용 0의 3박자. ARM64/저자원 제약은 메모리 제한 + SQLite 기본 + 백업 정책으로 대응.

### home-odroidc2 사전 점검 결과 (2026-05-05)
- **호스트**: `odroidc2` / Tailscale `100.89.56.69` / 직접 라우팅 192.168.0.39 (LAN 내)
- **OS**: Armbian 26.2.1 (Ubuntu 24.04 noble), 커널 6.18.15 aarch64
- **CPU**: ARM Cortex-A53 4코어 (aarch64) — n8n 공식 이미지 multi-arch ✅
- **RAM**: 1.9GB (가용 1.6GB) + Swap 958MB
- **디스크**: `/dev/mmcblk1p1` 7.0GB (가용 5.0GB, 28% 사용) — microSD/eMMC, 마모 주의
- **Docker**: ❌ 미설치 → Step 0-1 수행
- **포트 5678**: ✅ free
- **Hub.docker.com**: ✅ HTTP 200
- **sudo**: 비밀번호 필요 (Docker 설치 시 입력)

### 자원 제약 대응 (ODROID-C2 특화)
1. n8n Node.js 메모리 제한: `NODE_OPTIONS=--max-old-space-size=768`
2. DB는 **SQLite 기본 유지** (PostgreSQL 미도입 — RAM 절약 + SD 쓰기 절감)
3. 백업 보관 7일로 단축 + 외부(digitalocean) rsync 옵션 검토
4. 디스크 80% 도달 시 Slack 알림 (워크플로우로 셀프 모니터링)

---

## 4. Docker 설치 상세 절차

### Step 0: 사전 점검 (home-odroidc2 SSH 접속 후)

```bash
ssh uttec@100.89.56.69
# 점검 자동화: C:\todo\today\n8n\docs\precheck.py 실행 결과 docs/installation_log.md 참조
```

→ 2026-05-05 점검 완료, 결과는 위 §3 "사전 점검 결과" 표 참조.

### Step 0-1: Docker 미설치 시 (Ubuntu 기준)

```bash
# 공식 스크립트 (간편)
curl -fsSL https://get.docker.com | sudo sh

# 사용자에 docker 그룹 추가 (재로그인 필요)
sudo usermod -aG docker $USER
newgrp docker

# 동작 확인
docker run hello-world
```

### Step 1: 데이터 영구 디렉토리 + .env 생성

```bash
# 데이터 영속화 디렉토리
mkdir -p ~/n8n/data
cd ~/n8n

# 환경변수 파일
cat > .env <<'EOF'
N8N_HOST=100.89.56.69
N8N_PROTOCOL=http
N8N_PORT=5678
TZ=Asia/Seoul
GENERIC_TIMEZONE=Asia/Seoul
NODE_OPTIONS=--max-old-space-size=768
EOF

chmod 600 .env
```

> **인증 모델 (n8n 2.x)**: Basic Auth는 2.x에서 deprecated. 첫 브라우저 접속 시 **Owner 계정 생성 화면**이 표시되고, 이메일+이름+비밀번호로 본인이 직접 만든다. 이후 모든 로그인은 그 계정 사용. **네트워크 게이트는 Tailscale 사설망**(외부 인터넷 미노출).

### Step 2: docker-compose.yml 작성 (한 번에 관리)

```yaml
# ~/n8n/docker-compose.yml
version: "3.8"

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=${N8N_HOST}
      - N8N_PROTOCOL=${N8N_PROTOCOL}
      - N8N_PORT=${N8N_PORT}
      - WEBHOOK_URL=http://${N8N_HOST}:${N8N_PORT}/
      - TZ=${TZ}
      - GENERIC_TIMEZONE=${GENERIC_TIMEZONE}
      - NODE_OPTIONS=${NODE_OPTIONS}
      - DB_TYPE=sqlite
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=168       # 7일
      - N8N_SECURE_COOKIE=false           # HTTP 환경 (Tailscale 내부망)
    deploy:
      resources:
        limits:
          memory: 1024M
    volumes:
      - ./data:/home/node/.n8n
```

> **참고**: n8n 2.x에서는 `N8N_BASIC_AUTH_*`와 `N8N_RUNNERS_ENABLED` 모두 deprecated. 인증은 Owner 계정(이메일+비밀번호) 기반 User Management로 일원화.

### Step 3: 기동

```bash
cd ~/n8n
docker compose up -d        # 백그라운드 기동
docker compose ps           # 상태 확인
docker compose logs -f n8n  # 로그 실시간 (Ctrl+C로 종료)
```

### Step 4: 브라우저 접속 + 초기 셋업

1. 본인 PC 브라우저(Chrome): `http://100.73.114.75:5678`
2. Basic Auth 로그인 (uttec / <비밀번호>)
3. n8n 가입 화면 — 이메일·이름 입력 (소유자 계정 생성)
4. **Hello World 테스트**: Manual Trigger → Set 노드("hello") → 실행 확인

### Step 5: 백업 cron (필수)

```bash
# ~/n8n/backup.sh
#!/bin/bash
BACKUP_DIR=~/n8n/backups
mkdir -p $BACKUP_DIR
TS=$(date +%Y%m%d_%H%M%S)
tar czf $BACKUP_DIR/n8n_data_$TS.tar.gz -C ~/n8n data
find $BACKUP_DIR -name "n8n_data_*.tar.gz" -mtime +14 -delete
```

```bash
chmod +x ~/n8n/backup.sh

# crontab -e — 매일 03:00 자동 백업
0 3 * * * /home/<user>/n8n/backup.sh >> /home/<user>/n8n/backups/cron.log 2>&1
```

---

## 5. 첫 워크플로우: 위시캣 자동 검색 (최우선)

**현재**: `/wishket-check` skill을 본인이 수동 호출
**n8n 후**: 매일 09:00 자동 → Notion + Slack 알림

```
1. Schedule Trigger (cron: 0 9 * * *)
2. HTTP Request — 위시캣 신규 프로젝트 목록 (마지막 ID 이후)
3. Function — 마지막 ID 비교 + 필터링
4. AI Agent (Claude) — 각 프로젝트 적합도 1~10점 + 사유
5. IF — 점수 ≥ 7 분기
6. Notion DB Append — "오늘 할 일" 페이지에 행 추가
7. Slack Send — 요약 알림 ("신규 적합 N건")
8. Set Static Data — 마지막 ID 저장
```

**예상 가치**: 매일 30분 절약 + 누락 방지. **첫 주 학습 대상 1순위.**

---

## 6. 보안·운영 체크리스트

### 보안
- [ ] Basic Auth 비밀번호 32자 랜덤
- [ ] `.env` 파일 git 제외 (.gitignore)
- [ ] revita 방화벽: 포트 5678은 **Tailscale 인터페이스에만 개방** (공개 인터넷 비노출)
- [ ] Webhook URL은 Tailscale 주소 사용 (외부 노출 시 별도 reverse proxy + HTTPS)
- [ ] Claude API 키 등 자격증명은 **n8n Credentials**에 저장 (워크플로우에 평문 금지)

### 운영
- [ ] 일일 백업 cron 설정 (~/n8n/data tar)
- [ ] 백업 14일 자동 정리
- [ ] 워크플로우 실패 알림 → Slack 통합
- [ ] 월 1회 `docker compose pull && docker compose up -d` 업데이트
- [ ] 업데이트 전 백업 필수 (DB 스키마 마이그레이션 가능성)

### 트러블슈팅
| 증상 | 원인 후보 | 확인 방법 |
|------|----------|----------|
| 접속 불가 | Tailscale 미연결 | `tailscale status` |
| 컨테이너 즉시 종료 | 포트 충돌 | `docker logs n8n` |
| Webhook 미작동 | WEBHOOK_URL 오설정 | `.env`의 N8N_HOST 확인 |
| 데이터 휘발 | volume mount 누락 | `docker inspect n8n` |
| AI 노드 호출 실패 | Credentials 미설정 | n8n UI > Credentials |

---

## 7. 다음 액션 체크리스트

### Day 1 (오늘 또는 다음 세션)
- [ ] revita SSH 접속 + 사전 점검 (Docker / 디스크 / 포트)
- [ ] Docker 미설치 시 설치
- [ ] `~/n8n/` 디렉토리 + `.env` + `docker-compose.yml` 작성
- [ ] `docker compose up -d` 기동
- [ ] 브라우저 접속 + 소유자 계정 생성
- [ ] Hello World 워크플로우

### Day 2~3
- [ ] 위시캣 자동 검색 워크플로우 구현
- [ ] Claude API Credential 등록
- [ ] Notion API Credential 등록
- [ ] Slack Webhook 등록
- [ ] 7일 연속 안정 가동 검증

### Week 2 (영업 전환)
- [ ] 태명과학 견적 데모 워크플로우
- [ ] 한국기계 BOM 데모
- [ ] 화면 캡처 → Stage 0 견적서 부록 추가
- [ ] 시범 고객 1곳에 견적서 + 데모 캡처 발송

### Week 3
- [ ] 5분 데모 영상 (Remotion + n8n 캡처 합성)
- [ ] aiStudy/introductionAi/ 14번째 가이드("n8n 자동화") 추가 검토

---

## 8. 핵심 인사이트 (한 줄)

**n8n은 "도구"가 아니라 "영업 자산"이다.** 본인 업무 자동화는 학습용이자 즉시 ROI 회수 수단이고, **진짜 가치는 고객사에 보여줄 시각적 워크플로우**다. 화면 캡처 1장이 견적서 10페이지를 이긴다.

---

## 관련 문서

| 문서 | 위치 | 역할 |
|------|------|------|
| n8n 실행 가이드 (영업·운영 전략) | `smartFactory/업무효율화/참고/n8n_실행_가이드.md` | Phase 1~3 트랙 / 우선순위 매트릭스 |
| Pipeline Builder 적용 검토 | `smartFactory/업무효율화/참고/Pipeline_Builder_적용_검토.md` | 왜 n8n인가 (상위 분석) |
| Core Services 무료 대체 매핑 | `smartFactory/업무효율화/참고/Core_Services_무료대체_매핑.md` | n8n의 Foundry 1층·2층 대체 역할 |
| Stage 0 견적서 | `영업/Stage0_Core_Services_견적서.md` | 산출물 #4가 n8n 자체 호스팅 |
| 영업 전략 종합 | `myWiki/second-brain/영업전략.md` | 3.5-Stage 패키지 전체 맥락 |

---

## 폴더 구조 계획

```
n8n/
├── README.md                    # 이 파일 (왜 + Docker 설치)
├── workflows/                   # 워크플로우 export (.json)
│   ├── wishket_auto_search.json
│   ├── work_report_sync.json
│   └── ...
├── credentials/                 # ★ git 제외, .env / API 키 비고만
│   └── .gitkeep
├── docs/                        # 운영 노하우·트러블슈팅
│   └── installation_log.md      # 설치 이력 + 이슈
└── customer-demos/              # 고객 데모용 워크플로우
    ├── 태명과학_견적자동화.json
    └── 한국기계_BOM자동생성.json
```

> **다음 단계**: revita에 실제 Docker 설치 진행하면서 `docs/installation_log.md`에 시간순 기록.
