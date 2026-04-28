# 인증 / Credentials 관리

> OAuth 토큰 공유 방식과 API Key 방식 비교 및 현재 구성

---

## 1. 현재 구성: OAuth 토큰 Symlink 공유

### 구조

```
/home/uttec/.claude/.credentials.json    ← 원본 (OAuth 토큰)
    ↑ symlink
/home/student1/.claude/.credentials.json
/home/student2/.claude/.credentials.json
/home/student3/.claude/.credentials.json
```

### 원본 파일

```
경로: /home/uttec/.claude/.credentials.json
크기: 471 bytes
권한: -rw-r--r-- (644)  ← 다른 사용자가 읽을 수 있도록 설정
소유자: uttec:uttec
```

### symlink 생성 명령

```bash
sudo ln -sf /home/uttec/.claude/.credentials.json /home/studentN/.claude/.credentials.json
```

---

## 2. OAuth 방식의 문제점

Odroid C2 검증 중 발견된 문제:

| 문제 | 원인 | 영향 |
|------|------|------|
| 동시 세션 시 401 에러 | Claude가 토큰 갱신 시 다른 세션의 토큰 무효화 | 한 학생이 갱신하면 다른 학생 끊김 |
| 권한 자동 초기화 | Claude가 토큰 갱신 시 파일 권한을 600으로 재생성 | 다른 학생이 읽기 불가 |
| 단일 장애점 | 원본 토큰 만료 시 전체 학생 영향 | 수업 중단 위험 |

### 권한 문제 임시 해결 (계획서 제안, 미구현)

```bash
# cron으로 1분마다 644 유지
* * * * * chmod 644 /home/uttec/.claude/.credentials.json 2>/dev/null
```

### 토큰 갱신 충돌 현상

```
학생1: Claude 사용 중 → 토큰 만료 → 자동 갱신 → credentials.json 덮어쓰기
학생2: Claude 사용 중 → 이전 토큰으로 API 호출 → 401 Unauthorized
학생3: 대기 중 → 다음 요청 시 새 토큰 읽음 → 정상
```

---

## 3. 대안: API Key 방식 (AWS 이전 시 권장)

### 환경 변수 설정

```bash
# /etc/environment에 설정 (모든 학생 공유)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

### OAuth vs API Key 비교

| 항목 | OAuth (현재 Odroid) | API Key (AWS 권장) |
|------|--------------------|--------------------|
| 동시 사용 | 충돌 가능 (토큰 갱신) | **무제한 동시** |
| 토큰 갱신 | 자동이지만 충돌 | **불필요** |
| 파일 권한 | 600으로 재설정됨 | **파일 없음** |
| symlink 필요 | 필요 | **불필요** |
| 비용 | Pro 구독 (월 $100 고정) | **사용량 과금** |
| 설정 복잡도 | symlink + cron + 권한 | 환경 변수 1줄 |
| 인증 파일 | .credentials.json | 없음 |

### API Key 설정 방법

```bash
# 방법 1: /etc/environment (전체 시스템)
echo 'ANTHROPIC_API_KEY=sk-ant-api03-xxxxx' | sudo tee -a /etc/environment

# 방법 2: 학생별 .bashrc
echo 'export ANTHROPIC_API_KEY=sk-ant-api03-xxxxx' >> /home/studentN/.bashrc

# 방법 3: systemd 서비스 환경 변수
# [Service]
# Environment=ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

---

## 4. 보안 고려사항

### API Key 보호

| 위험 | 대책 |
|------|------|
| 학생이 API Key 확인 | `env` 명령으로 확인 가능 — 교육 환경이므로 허용 |
| API Key 외부 유출 | 학생에게 공유 금지 안내, 수업 후 Key 교체 |
| 과도한 사용 | Anthropic 대시보드에서 사용량 모니터링 |
| Key 만료/교체 | /etc/environment 수정 후 학생 재로그인 |

### OAuth 보호 (현재)

| 위험 | 대책 |
|------|------|
| credentials 파일 접근 | 644 권한으로 읽기만 허용 |
| 토큰 갱신 충돌 | cron 또는 수동 권한 복구 |
| 세션 만료 | uttec 계정에서 재인증 |

---

## 5. 비용 비교

### OAuth (Pro 구독)

```
월 $100 (고정)
- 모든 학생이 Pro 계정 1개 공유
- 사용량 무관 (무제한)
- 동시 세션 문제 있음
```

### API Key

```
사용량 과금:
- Claude Sonnet: ~$3/1M input tokens, ~$15/1M output tokens
- Claude Haiku: ~$0.25/1M input, ~$1.25/1M output

20명 학생, 보통 사용 기준:
- 월 $80~150 (사용 패턴에 따라)
- 과도한 사용 시 $200+ 가능
```

---

## 6. 현재 Odroid에서의 권장 운영 방법

OAuth 방식을 유지하되, 안정성 확보:

```bash
# 1. cron으로 credentials 권한 유지 (1분 간격)
(crontab -l 2>/dev/null; echo "* * * * * chmod 644 /home/uttec/.claude/.credentials.json 2>/dev/null") | crontab -

# 2. 수업 시작 전 uttec 계정에서 Claude 한번 실행하여 토큰 갱신
ssh uttec@100.89.56.69
claude --version  # 토큰 갱신 트리거

# 3. 학생 동시 사용 시 401 에러 발생하면
chmod 644 /home/uttec/.claude/.credentials.json
# 해당 학생에게 claude 재실행 안내
```

---

## 7. AWS 이전 시 마이그레이션

```
현재 (Odroid C2):
  OAuth → symlink → 권한 관리 → cron

이전 후 (AWS EC2):
  API Key → /etc/environment → 끝

마이그레이션 순서:
1. Anthropic 콘솔에서 API Key 발급
2. EC2 setup.sh에 API Key 포함
3. symlink/credentials 관련 설정 모두 제거
4. 학생 계정에서 .claude/.credentials.json 삭제
```
