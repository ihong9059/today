# Track 3: Claude Code로 시스템 구축
> 기간: 4주 (20일) | 선행: Track 2 | 도구: Claude Code, Linux, Docker, Nginx, GitHub Actions

## 목표
- Claude Code를 활용한 서버 운영/인프라 구축
- Docker 컨테이너화 + CI/CD 자동 배포
- UTTEC 실제 운영 인프라를 교재로 학습
- 실전 운영 가능한 서버 인프라 완성

## 교육 철학
> "서버를 처음부터 만들지 마라. Claude Code에게 구조를 설명하고, 실제 운영 코드를 참고해서 배워라."

### 실제 운영 참고 시스템 (aiHardStudy)
| 시스템 | 파일 | 역할 |
|--------|------|------|
| 빌드 서버 | `cloud/build_server_cloud_arduino.py` | FastAPI, AI 코드 생성 + 빌드 |
| 웹 UI 서버 | `cloud/web_ui_server.py` | 정적 파일 서빙 + API 프록시 |
| Nginx 설정 | `cloud/nginx-uttec-ai` | 리버스 프록시 + HTTPS |
| 시스템 사양서 | `시스템사양서/...v2.0.md` | 전체 아키텍처 문서 |

---

## Week 1: Linux + 서버 기초 (Claude Code와 함께)

### Day 1: Linux 입문 — Claude Code가 명령어를 가르쳐준다
- **실습**:
  - WSL2 설치 (Windows) 또는 터미널 (Mac)
  - Claude Code에게 "ls, cd, cp, chmod 사용법 알려줘" → 실습
  - Claude Code Bash 도구로 시스템 명령 실행
  - "이 폴더 구조를 정리해줘" → Claude Code가 실행
- **과제**: Claude Code로 폴더/파일 관리 10문제 해결

### Day 2: 원격 서버 접속 + 설정
- **실습**:
  - 클라우드 서버 생성 (DigitalOcean $4/월)
  - SSH 키 생성 + 접속
  - Claude Code에게 "서버 초기 보안 설정해줘" → 실행
  - 사용자 관리, 방화벽(ufw) 설정
- **과제**: 클라우드 서버 SSH 접속 + 기본 보안 설정 완료

### Day 3: 서버에 앱 배포 — 수동 배포
- **실습**:
  - Track 2 메모 앱을 서버에 업로드 (git clone)
  - Python/pip 설치, 앱 실행
  - 참고: UTTEC 서버(`178.128.90.37`)의 구조 분석
  - Claude Code로 "이 앱을 서버에서 실행하는 스크립트 만들어줘"
- **과제**: 서버 IP:포트로 웹앱 접속 확인

### Day 4: 프로세스 관리 + 서비스 등록
- **실습**:
  - PM2 또는 systemd로 앱을 서비스로 등록
  - Claude Code에게 "이 앱의 systemd 서비스 파일 만들어줘"
  - 참고: UTTEC `uttec-arduino.service`, `uttec-webui.service`
  - 서버 재부팅 후 자동 시작 확인
- **과제**: 앱을 systemd 서비스로 등록

### Day 5: 도메인 + HTTPS
- **실습**:
  - DuckDNS 무료 도메인 설정
  - Nginx 리버스 프록시 — Claude Code가 설정 파일 생성
  - Let's Encrypt SSL 인증서 (certbot)
  - 참고: UTTEC `cloud/nginx-uttec-ai` 실제 설정 파일
- **과제**: https://내도메인.duckdns.org 접속 성공

---

## Week 2: Docker (Claude Code로 컨테이너화)

### Day 6: Docker 기초
- **이론**: 컨테이너 vs 가상머신
- **실습**:
  - Docker 설치 + hello-world 실행
  - Claude Code에게 "docker 기본 명령어 알려줘"
  - docker run nginx → 웹페이지 접속
  - docker ps, logs, exec, stop 체험
- **과제**: Nginx 컨테이너로 웹페이지 서빙

### Day 7: Dockerfile — Claude Code가 작성
- **실습**:
  - Claude Code에게 "이 Python 앱의 Dockerfile 만들어줘"
  - Dockerfile 구조 이해 (FROM, COPY, RUN, CMD)
  - 메모 앱 Docker 이미지 빌드 + 실행
  - .dockerignore 설정
- **과제**: 메모 앱 Docker 이미지 빌드 + 실행

### Day 8: Docker Compose — 멀티 컨테이너
- **실습**:
  - Claude Code에게 "앱+DB+Nginx docker-compose 만들어줘"
  - 볼륨 마운트 (데이터 영속성)
  - 환경 변수 관리 (.env)
  - 앱 + PostgreSQL + Nginx 3-Tier 구성
- **과제**: Docker Compose로 3-Tier 아키텍처 실행

### Day 9: Docker 네트워크 + 보안
- **실습**:
  - 컨테이너 간 통신 (bridge 네트워크)
  - 포트 매핑 전략
  - non-root 실행, 이미지 최소화
  - Claude Code로 보안 점검: "이 Docker 설정 보안 검토해줘"
- **과제**: 보안 강화된 Docker 구성

### Day 10: 모니터링 + 로그
- **실습**:
  - 서버 리소스 모니터링 (htop, df, free)
  - Claude Code로 "헬스체크 API 만들어줘"
  - 로그 관리 (docker logs, journalctl)
  - 알림 스크립트 (디스크 부족 → 이메일)
- **과제**: 헬스체크 + 모니터링 스크립트

---

## Week 3: CI/CD — Claude Code로 자동화

### Day 11: Git 고급 — Claude Code 협업
- **실습**:
  - 브랜치 전략 (main, develop, feature)
  - Claude Code로 PR 생성: "이 변경사항으로 PR 만들어줘"
  - Claude Code로 코드 리뷰: "이 PR 리뷰해줘"
  - 충돌 해결도 Claude Code와 함께
- **과제**: 브랜치 → 수정 → PR → 머지

### Day 12: GitHub Actions — CI 파이프라인
- **실습**:
  - Claude Code에게 "push하면 테스트 자동 실행하는 CI 만들어줘"
  - GitHub Actions YAML 구조 이해
  - pytest 자동 실행 + 결과 확인
- **과제**: push → pytest 자동 실행 파이프라인

### Day 13: 자동 배포 (CD)
- **실습**:
  - Claude Code에게 "GitHub Actions로 서버 자동 배포 만들어줘"
  - Docker 이미지 빌드 → 서버 pull → 재시작
  - GitHub Secrets로 SSH 키/비밀번호 관리
  - 무중단 배포 개념
- **과제**: git push → 서버 자동 배포 완성

### Day 14: 환경 분리 + 백업
- **실습**:
  - 개발 vs 운영 환경 분리 (config 파일)
  - DB 백업 자동화 (cron + pg_dump)
  - Claude Code에게 "일일 백업 스크립트 만들어줘"
  - 복구 절차 문서화
- **과제**: 환경 분리 + 일일 자동 백업

### Day 15: Tailscale VPN + 보안 강화
- **실습**:
  - Tailscale 설치 → 장비 간 VPN 연결
  - SSH 키 인증 전용 (비밀번호 로그인 차단)
  - fail2ban, Nginx 보안 헤더
  - Claude Code에게 "이 서버 보안 점검해줘"
- **과제**: 보안 체크리스트 적용

---

## Week 4: 실전 인프라 프로젝트

### Day 16: UTTEC 인프라 분석 실습
- **실습**:
  - UTTEC 실제 서버 구성 분석 (Claude Code로 코드 리딩)
  - Nginx 설정, systemd 서비스, Docker 구성 분석
  - "이 서버 구조를 다이어그램으로 그려줘"
  - 개선 방안 제안
- **과제**: UTTEC 서버 아키텍처 분석 리포트

### Day 17: 라즈베리 파이 서버 (선택)
- **실습**:
  - RPi OS 설치 + SSH 설정
  - Claude Code로 "RPi에 웹 서비스 배포해줘"
  - Docker on RPi
  - 홈 서버로 운영
- **과제**: RPi에서 웹 서비스 운영

### Day 18-19: 종합 프로젝트
- **프로젝트**: 운영 가능한 서비스 인프라 (Claude Code로 전 과정)
  - 클라우드 서버 + Docker Compose (앱+DB+Nginx)
  - HTTPS + 도메인
  - GitHub Actions CI/CD
  - 모니터링 + 백업
  - 문서화 (README, 아키텍처 다이어그램)

### Day 20: 발표 + 수료
- **발표**: 인프라 아키텍처 + 배포 데모 + 장애 복구 시연
- **수료**: Track 3 수료증 발급

---

## 평가 기준
| 항목 | 비중 | 내용 |
|------|:----:|------|
| 일일 과제 | 30% | Day 1~17 과제 |
| 종합 프로젝트 | 50% | 운영 가능한 인프라 |
| 문서화 | 20% | README, 아키텍처도, 운영 가이드 |

## 준비물
- 노트북 + WSL2 또는 Mac 터미널
- Claude Code CLI (Claude Pro)
- 클라우드 서버 계정 (DigitalOcean / AWS)
- GitHub 계정
- (선택) Raspberry Pi 4/5
