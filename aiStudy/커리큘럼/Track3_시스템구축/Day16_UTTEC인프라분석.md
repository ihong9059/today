# Day 16: UTTEC 인프라 분석 — "실전 서버 해부하기"

## 학습 목표
- 실제 운영 중인 UTTEC 서버의 인프라 구성을 분석한다
- Nginx, systemd, Docker가 실전에서 어떻게 사용되는지 이해한다
- 운영 서버의 로그와 모니터링 상태를 점검한다
- 지금까지 배운 내용이 실제 서버에서 어떻게 적용되는지 연결한다

## 준비물
- UTTEC 서버 접속 권한 (읽기 전용)
- SSH 접속 환경
- Claude Code CLI
- Day 1~15에서 배운 내용 정리 노트

## 실습 1: 서버 전체 구조 파악 (30분)

1. UTTEC 서버에 접속하여 시스템 정보를 확인한다

```bash
ssh deploy@uttec-server
uname -a
cat /etc/os-release
free -h
df -h
uptime
nproc
```

2. Claude Code에게 서버 전체 현황을 분석하게 한다

```
Claude에게: "UTTEC 서버의 전체 현황을 파악해줘. OS, CPU, 메모리, 디스크, 가동 시간, 설치된 주요 소프트웨어(nginx, docker, python 등)를 모두 조사해서 인프라 카드 형태로 정리해줘."
```

3. 실행 중인 서비스를 확인한다

```bash
sudo systemctl list-units --type=service --state=running
sudo ss -tlnp
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}"
```

4. 포트 사용 현황을 정리한다

```bash
sudo ss -tlnp | grep -E ':(80|443|8000|5432|3000)'
```

### 관찰 포인트
- 서버에서 몇 개의 서비스가 동작하고 있는가?
- 각 포트에서 어떤 서비스가 응답하는가?

## 실습 2: Nginx 설정 분석 (30분)

1. Nginx 설정 파일을 분석한다

```bash
sudo nginx -T  # 전체 설정 출력
ls /etc/nginx/sites-enabled/
sudo cat /etc/nginx/sites-enabled/*
```

2. Claude Code에게 Nginx 설정을 분석하게 한다

```
Claude에게: "UTTEC 서버의 Nginx 설정을 전체 분석해줘. 등록된 도메인, 리버스 프록시 설정, SSL 인증서 상태, 보안 헤더 설정을 정리해줘. Day 5에서 배운 내용과 비교해서 다른 점이 있으면 설명해줘."
```

3. SSL 인증서 상태를 확인한다

```bash
sudo certbot certificates
sudo openssl s_client -connect uttec.com:443 -brief 2>/dev/null | head -10
```

4. 리버스 프록시 흐름을 추적한다

```bash
# 외부 요청이 어떻게 처리되는지 확인
curl -I https://uttec.com
# access log에서 최근 요청 패턴 확인
sudo tail -20 /var/log/nginx/access.log
```

### 관찰 포인트
- Nginx에 등록된 서버 블록(사이트)은 몇 개인가?
- 각 사이트는 어떤 백엔드 서비스로 프록시되는가?

## 실습 3: systemd 서비스 + Docker 분석 (30분)

1. 등록된 커스텀 서비스를 찾는다

```bash
ls /etc/systemd/system/*.service
sudo systemctl list-unit-files --type=service | grep enabled
```

2. 각 서비스의 설정을 분석한다

```bash
# 서비스 파일 내용 확인
sudo cat /etc/systemd/system/myapp.service
sudo systemctl status myapp
```

3. Docker 컨테이너 상태를 분석한다

```bash
docker ps -a
docker images
docker volume ls
docker network ls
docker stats --no-stream
```

4. Claude Code에게 전체 인프라를 다이어그램화하게 한다

```
Claude에게: "UTTEC 서버의 인프라를 분석해서 아키텍처 다이어그램을 텍스트로 그려줘. 외부 요청 → Nginx → 각 서비스(systemd, Docker) → DB 까지의 흐름을 포함해줘. 포트 번호, 프로토콜, 컨테이너 이름도 표시해줘."
```

### 관찰 포인트
- systemd로 직접 실행하는 서비스와 Docker로 실행하는 서비스가 섞여있는 이유는?
- 각 방식의 장단점은?

## 실습 4: 로그 분석 + 보안 점검 (30분)

1. 주요 로그를 분석한다

```bash
# Nginx 접근 로그 분석
sudo cat /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10

# 에러 로그
sudo tail -30 /var/log/nginx/error.log

# systemd 서비스 로그
sudo journalctl -u myapp --since "24 hours ago" -p err
```

2. 보안 상태를 점검한다

```bash
# fail2ban 상태
sudo fail2ban-client status sshd

# 최근 SSH 접속 시도
sudo grep "Failed password" /var/log/auth.log | tail -10

# ���화벽 상태
sudo ufw status verbose
```

3. Claude Code에게 보안 감사를 요청한다

```
Claude에게: "UTTEC 서버의 보안 감사를 수행해줘. SSH 설정, 방화벽, fail2ban, Nginx 보안 헤더, Docker 보안(non-root, 포트 노출), SSL 인증서, 시스템 업데이트 상태를 모두 점검하고 보안 등급을 매겨줘. 개선이 필요한 항목은 구체적 방법과 함께 알려줘."
```

### 관찰 포인트
- 실제 서버에는 어떤 종류의 공격 시도가 오는가?
- 이론으로 배운 보안 설정이 실전에서 잘 적용되어 있는가?

## 과제

### 제출물: "UTTEC 인프라 분석 보고서"

```markdown
# UTTEC 인프라 분석 보고서

## 서버 기본 정보
| 항목 | 값 |
|------|-----|
| OS | |
| CPU | |
| 메모리 | |
| 디스크 | |
| 가동 시간 | |

## 아키텍처 다이어그램
```
[인터넷] → :443 [Nginx]
                ├── /api → :8000 [FastAPI - systemd]
                ├── /app → :3000 [Node.js - Docker]
                └── ...
```

## 서비스 목록
| 서비스명 | 실행 방식 | 포트 | 상태 |
|---------|----------|------|------|
| | systemd | | |
| | Docker | | |

## Nginx 설정 요약
| 도메인 | 백엔드 | SSL | 보안 헤더 |
|--------|--------|-----|----------|
| | | | |

## 보안 점검 결과
| 항목 | 상태 | 평가 |
|------|------|------|
| SSH 키 인증 | | |
| 방화벽 | | |
| fail2ban | | |
| SSL | | |
| 보안 헤더 | | |

## 수업에서 배운 내용과 실전 비교
| 주제 | 수업 | 실전 | 차이점 |
|------|------|------|--------|
| Nginx | Day 5 | | |
| systemd | Day 4 | | |
| Docker | Day 6-9 | | |
| 보안 | Day 15 | | |

## 개선 제안 3가지
1.
2.
3.
```

## 강사 참고 사항
- 학생들에게 읽기 전용 접근 권한만 부여하고, 설정 변경은 하지 않도록 안내한다
- 실제 서버 분석이므로 민감 정보(비밀번호, 토큰)가 노출되지 않도록 주의한다
- "지금까지 배운 모든 것이 실전에서 이렇게 쓰인다"는 연결 고리를 강조한다
