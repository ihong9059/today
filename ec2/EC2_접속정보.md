# AWS EC2 접속 정보

**최종 업데이트**: 2026-01-14

---

## 1. EC2 인스턴스 현황

| 별칭 | IP | 용도 | 상태 |
|------|-----|------|------|
| **uttec-ec2** | 52.78.119.132 | 메인 서버 (cert-guide, sensor-monitor) | 운영 중 |
| hw-c-edu-platform | 13.125.148.58 | 교육 플랫폼 | 운영 중 |
| uttec-first-ec2 | 3.35.139.224 | 테스트용 | 대기 |

---

## 2. 빠른 접속 방법

### SSH 접속 (Mac)

```bash
# 메인 EC2 서버 (uttec-ec2) - SSH config 설정됨
ssh uttec-ec2

# 직접 접속
ssh -i ~/.ssh/uttec-first-ec2.pem ec2-user@52.78.119.132
```

### SSH Config 설정 (~/.ssh/config)

```
Host uttec-ec2
    HostName 52.78.119.132
    User ec2-user
    IdentityFile ~/.ssh/uttec-first-ec2.pem
    StrictHostKeyChecking no
```

---

## 3. uttec-ec2 서버 상세 (52.78.119.132)

### 3.1 서버 사양

| 항목 | 값 |
|------|-----|
| OS | Amazon Linux 2023 |
| 디스크 | 30GB (사용: 8.2GB, 28%) |
| 메모리 | 약 8GB |
| 리전 | ap-northeast-2 (서울) |

### 3.2 실행 중인 서비스

| 서비스 | 포트 | URL | 설명 |
|--------|------|-----|------|
| **cert-guide** | 3000 | http://uttec-cert.duckdns.org | 자격증 가이드 (Next.js) |
| **sensor-monitor** | 5000 | http://52.78.119.132:5000 | 센서 모니터 대시보드 |

### 3.3 프로젝트 경로

```
/home/ec2-user/
├── cert-guide/           # 자격증 가이드 (Next.js)
│   ├── app/              # 페이지 라우트
│   ├── .next/            # 빌드 결과물
│   └── package.json
│
└── sensor-monitor/       # 센서 모니터
    ├── server.js         # Express + Socket.IO 서버
    ├── public/           # 웹 대시보드 (index.html)
    └── images/           # 카메라 이미지 저장
```

### 3.4 PM2 명령어

```bash
# 서비스 상태 확인
ssh uttec-ec2 "pm2 list"

# 로그 확인
ssh uttec-ec2 "pm2 logs"
ssh uttec-ec2 "pm2 logs sensor-monitor --lines 50"
ssh uttec-ec2 "pm2 logs cert-guide --lines 50"

# 서비스 재시작
ssh uttec-ec2 "pm2 restart sensor-monitor"
ssh uttec-ec2 "pm2 restart cert-guide"
ssh uttec-ec2 "pm2 restart all"

# 서비스 중지/시작
ssh uttec-ec2 "pm2 stop sensor-monitor"
ssh uttec-ec2 "pm2 start sensor-monitor"
```

---

## 4. 파일 배포 방법

### 4.1 SensorMonitor 배포

```bash
# 서버 파일 업로드
scp /Users/maeg/todo/today/SensorMonitor/server/server.js uttec-ec2:~/sensor-monitor/
scp /Users/maeg/todo/today/SensorMonitor/server/public/index.html uttec-ec2:~/sensor-monitor/public/

# 서버 재시작
ssh uttec-ec2 "pm2 restart sensor-monitor"
```

### 4.2 cert-guide 배포

```bash
# 페이지 파일 업로드 (예: study 페이지)
scp /path/to/page.tsx uttec-ec2:~/cert-guide/app/category/xxx/study/yyy/

# Next.js 빌드 및 재시작
ssh uttec-ec2 "cd ~/cert-guide && npm run build && pm2 restart cert-guide"
```

---

## 5. PEM 키 파일 위치

| 위치 | 경로 |
|------|------|
| **Mac** | `~/.ssh/uttec-first-ec2.pem` |
| **작업폴더** | `/Users/maeg/todo/today/uttec-first-ec2.pem` |

> **주의**: PEM 키 파일은 절대 Git에 커밋하지 마세요!

---

## 6. 도메인 정보

| 도메인 | IP | 서비스 |
|--------|-----|-------|
| uttec-cert.duckdns.org | 52.78.119.132 | cert-guide (포트 3000) |

### DuckDNS 업데이트

```bash
# IP 변경 시 DuckDNS 업데이트
curl "https://www.duckdns.org/update?domains=uttec-cert&token=YOUR_TOKEN&ip=NEW_IP"
```

---

## 7. 보안 그룹 포트

| 포트 | 프로토콜 | 용도 |
|------|---------|------|
| 22 | SSH | 원격 접속 |
| 80 | HTTP | 웹 서버 |
| 443 | HTTPS | 보안 웹 |
| 3000 | TCP | cert-guide (Next.js) |
| 5000 | TCP | sensor-monitor |
| 5432 | TCP | PostgreSQL |

---

## 8. 문제 해결

### 접속 안될 때

```bash
# 1. EC2 상태 확인 (AWS 콘솔에서)
# 2. SSH 연결 테스트
ssh -v uttec-ec2

# 3. 포트 열림 확인
nc -zv 52.78.119.132 22
nc -zv 52.78.119.132 5000
```

### PM2 서비스 문제

```bash
# 로그 확인
ssh uttec-ec2 "pm2 logs --err --lines 100"

# 서비스 삭제 후 재등록
ssh uttec-ec2 "pm2 delete sensor-monitor"
ssh uttec-ec2 "cd ~/sensor-monitor && pm2 start server.js --name sensor-monitor"
ssh uttec-ec2 "pm2 save"
```

### 디스크 용량 부족

```bash
# 용량 확인
ssh uttec-ec2 "df -h"

# 큰 파일 찾기
ssh uttec-ec2 "du -sh ~/* | sort -hr | head -10"

# PM2 로그 정리
ssh uttec-ec2 "pm2 flush"

# 이미지 폴더 정리
ssh uttec-ec2 "rm -rf ~/sensor-monitor/images/*"
```

---

*작성: Claude Code*
