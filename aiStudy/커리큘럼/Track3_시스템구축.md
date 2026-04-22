# Track 3: 시스템 구축
> 기간: 4주 (20일) | 선행: Track 2 | 도구: Linux, Docker, Nginx, GitHub Actions

## 목표
- Linux 서버 운영 능력 습득
- Docker로 서비스 컨테이너화
- CI/CD 파이프라인으로 자동 배포
- 실제 운영 가능한 서버 인프라 구축

---

## Week 1: Linux와 서버 기초

### Day 1: Linux 입문
- **실습**:
  - WSL2 설치 (Windows) 또는 터미널 (Mac)
  - 기본 명령어: ls, cd, cp, mv, rm, cat, grep, find
  - 파일 권한: chmod, chown
  - Claude에게 "이 명령어가 뭘 하는지 설명해줘"
- **과제**: 폴더/파일 관리 실습 10문제

### Day 2: 원격 서버 접속
- **실습**:
  - SSH 개념 이해 + 키 생성 (ssh-keygen)
  - 클라우드 서버 생성 (DigitalOcean $4/월 또는 AWS Free Tier)
  - SSH 접속 + 기본 서버 설정
  - 사용자 관리 (adduser, sudo)
- **과제**: 클라우드 서버에 SSH 접속 성공

### Day 3: 서버에 Python 앱 배포
- **실습**:
  - Python/pip 설치 (서버)
  - Track 2 메모 앱 소스 업로드 (scp/git clone)
  - 서버에서 앱 실행
  - 방화벽 설정 (ufw)
- **과제**: 서버 IP:포트로 웹앱 접속 확인

### Day 4: 프로세스 관리
- **실습**:
  - nohup, screen, tmux (백그라운드 실행)
  - PM2 설치 + Node.js/Python 프로세스 관리
  - systemd 서비스 등록
  - Claude에게 "이 앱을 systemd 서비스로 만들어줘"
- **과제**: 앱을 PM2 또는 systemd로 자동 시작 설정

### Day 5: 도메인과 HTTPS
- **실습**:
  - 도메인 개념 (DNS, A레코드)
  - DuckDNS 무료 도메인 설정
  - Nginx 리버스 프록시 설정
  - Let's Encrypt SSL 인증서 (certbot)
- **과제**: https://내도메인.duckdns.org 로 앱 접속

---

## Week 2: Docker와 컨테이너

### Day 6: Docker 기초
- **이론**: 컨테이너 vs 가상머신, 왜 Docker를 쓰는가
- **실습**:
  - Docker 설치
  - docker run (hello-world, nginx, python)
  - 이미지 vs 컨테이너 개념
  - docker ps, logs, exec, stop, rm
- **과제**: Nginx 컨테이너로 웹페이지 서빙

### Day 7: Dockerfile 작성
- **실습**:
  - Dockerfile 기본 구조 (FROM, COPY, RUN, CMD)
  - Track 2 메모 앱을 Docker 이미지로 빌드
  - Claude에게 "이 Python 앱의 Dockerfile 만들어줘"
  - .dockerignore 설정
- **과제**: 메모 앱 Docker 이미지 빌드 + 실행

### Day 8: Docker Compose
- **실습**:
  - docker-compose.yml 작성
  - 멀티 컨테이너 (앱 + DB + Nginx)
  - 볼륨 마운트 (데이터 영속성)
  - 환경 변수 관리 (.env)
- **과제**: 앱 + SQLite → 앱 + PostgreSQL (Docker Compose)

### Day 9: Docker 네트워크와 보안
- **실습**:
  - Docker 네트워크 (bridge, host)
  - 컨테이너 간 통신
  - 포트 매핑 전략
  - 보안 기본 (non-root 실행, 이미지 최소화)
- **과제**: Nginx → App → DB 3-Tier 아키텍처 구성

### Day 10: 모니터링
- **실습**:
  - 서버 리소스 모니터링 (htop, df, free)
  - Docker 상태 모니터링
  - 간단한 헬스체크 API 만들기
  - 로그 관리 (docker logs, journalctl)
- **과제**: 헬스체크 + 디스크/메모리 알림 스크립트

---

## Week 3: CI/CD와 자동화

### Day 11: Git 고급
- **실습**:
  - 브랜치 전략 (main, develop, feature)
  - Pull Request 워크플로우
  - 충돌 해결
  - Claude에게 "이 PR 리뷰해줘"
- **과제**: 브랜치 만들기 → 수정 → PR → 머지

### Day 12: GitHub Actions 기초
- **실습**:
  - GitHub Actions 개념 (Workflow, Job, Step)
  - 첫 워크플로우: push → 테스트 자동 실행
  - YAML 문법
  - Claude에게 "CI 파이프라인 만들어줘"
- **과제**: push 시 pytest 자동 실행

### Day 13: 자동 배포 (CD)
- **실습**:
  - GitHub Actions → SSH → 서버 배포
  - Docker 이미지 빌드 → 푸시 → 서버에서 pull
  - 배포 스크립트 작성
  - 무중단 배포 개념 (blue-green)
- **과제**: git push → 자동 서버 배포 파이프라인

### Day 14: 환경 관리
- **실습**:
  - 개발 vs 스테이징 vs 운영 환경 분리
  - 환경별 설정 (config.py, .env)
  - GitHub Secrets로 민감 정보 관리
  - Claude에게 "환경별 설정 분리해줘"
- **과제**: 로컬 + 서버 환경 자동 전환 구현

### Day 15: 백업과 복구
- **실습**:
  - 데이터베이스 백업 (pg_dump, cron)
  - 파일 백업 자동화 (rsync)
  - 서버 스냅샷
  - 복구 절차 문서화
- **과제**: 일일 자동 백업 + 복구 테스트

---

## Week 4: 실전 인프라 프로젝트

### Day 16: Tailscale VPN
- **실습**:
  - Tailscale 설치 (서버 + 로컬)
  - 장비 간 SSH 터널
  - 내부 서비스 외부 노출 없이 접근
  - Claude에게 "Tailscale 네트워크 구성도 그려줘"
- **과제**: 2대 이상 장비 VPN 연결

### Day 17: 라즈베리 파이 서버 (선택)
- **실습**:
  - RPi OS 설치 + SSH 설정
  - Python 서비스 배포
  - GPIO 기초 (LED, 센서)
  - 홈 서버로 운영
- **과제**: RPi에서 웹 서비스 운영

### Day 18: 보안 강화
- **실습**:
  - SSH 키 인증 전용 (비밀번호 로그인 차단)
  - fail2ban (무차별 공격 방어)
  - Nginx 보안 헤더
  - CORS 설정
  - Claude에게 "이 서버 보안 점검해줘"
- **과제**: 보안 체크리스트 적용

### Day 19: 종합 프로젝트
- **프로젝트**: 운영 가능한 서비스 인프라 구축
  - 클라우드 서버 + Docker Compose (앱+DB+Nginx)
  - HTTPS + 도메인
  - GitHub Actions CI/CD
  - 모니터링 + 백업
  - 문서화 (README, 아키텍처 다이어그램)

### Day 20: 발표 + 수료
- **발표**: 인프라 아키텍처 설명 + 배포 데모
- **장애 시뮬레이션**: 서비스 중단 → 복구 과정 시연
- **수료**: Track 3 수료증 발급

---

## 평가 기준
| 항목 | 비중 | 내용 |
|------|:----:|------|
| 일일 과제 | 30% | Day 1~18 과제 |
| 종합 프로젝트 | 50% | 운영 가능한 인프라 |
| 문서화 | 20% | README, 아키텍처도, 운영 가이드 |

## 준비물
- 노트북 + WSL2 또는 Mac 터미널
- 클라우드 서버 계정 (DigitalOcean / AWS)
- GitHub 계정
- (선택) Raspberry Pi 4/5

## 다음 단계
→ **Track 4: AI 전문가** (병행 가능)
