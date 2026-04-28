---
title: multiCore Claude 교육 시스템
type: entity
created: 2026-04-28
updated: 2026-04-28
tags: [교육, Claude, SSH, 멀티코어, Odroid, AWS, 인프라]
links: [skills, experience, projects, uttec-edu, 사전빌드, 서버인프라, claude-code, aiStudy]
---

# multiCore Claude 교육 시스템

## 한 줄 정의
Odroid C2 / AWS EC2에서 여러 학생이 SSH로 동시에 Claude Code를 사용하는 교육 플랫폼. **학생 1명 = 전용 코어 1개 + workspace + Claude Code 인스턴스**.

## 현재 상태
- **Odroid C2 (100.89.56.69)** 에서 3명 동시 사용 검증 완료 (2026-04-26)
- SSH 직접 접속 방식 확정 (ttyd 웹 터미널은 Claude TUI 비호환으로 폐기)
- student1~3 계정, /opt/claude-education 웹 서버 구축됨
- AWS EC2 스케일업 계획 수립 (20명 → c7g.8xlarge)

## 검증 환경

| 항목 | 값 |
|------|---|
| 보드 | Odroid C2 (4코어 Cortex-A53, 2GB RAM) |
| OS | Armbian 6.18.15, aarch64 |
| Node.js | v18.19.1 |
| Claude Code | v2.1.112 |
| 접속 | Tailscale VPN (100.89.56.69) |
| 인증 | OAuth symlink 공유 (API Key 전환 예정) |

## 아키텍처

```
[학생 PC] → SSH → [Odroid C2 / EC2]
                    ├── Core 0: 시스템
                    ├── Core 1: student1 → claude (taskset)
                    ├── Core 2: student2 → claude
                    └── Core 3: student3 → claude
                            │
                            ▼
                    Anthropic Claude API
```

## 핵심 검증 결과

| 항목 | 결과 |
|------|------|
| SSH → claude 실행 | 성공 (완전한 대화형 TUI) |
| ttyd 웹 터미널 | **실패** (Ink/React TUI 비호환) |
| OAuth 동시 세션 | **불안정** (토큰 갱신 충돌) |
| .claude.json symlink | **실패** (동시 쓰기 충돌) → 독립 파일로 해결 |
| .hushlogin | **필수** (MOTD + TUI 충돌 방지) |
| ARM(aarch64) Claude | **정상 동작** |

## 검증에서 얻은 핵심 교훈

1. Claude Code TUI(Ink/React)는 ttyd와 비호환 → SSH만 가능
2. `.claude.json`은 반드시 독립 파일 (symlink 금지)
3. `.credentials.json`은 symlink OK (권한 644 유지 필수)
4. `.hushlogin` 필수 + `.bashrc`에 claude 자동실행 금지
5. OAuth 동시 사용 불안정 → API Key 전환 권장

## 미해결 과제

- [ ] taskset alias 미적용 (.bashrc에 추가 필요)
- [ ] credentials 권한 cron 미등록
- [ ] cgroups 리소스 제한 미구현
- [ ] AWS EC2 이전 미착수

## 비용 (AWS 스케일업 시)

| 규모 | 인스턴스 | On-Demand/월 | Spot/월 | 학생당 |
|------|---------|-------------|---------|-------|
| 3명 | c7g.xlarge | $28 | $9 | ~$3~9 |
| 15명 | c7g.4xlarge | $110 | $34 | ~$2~7 |
| 20명 | c7g.8xlarge | $220 | $67 | ~$3~11 |

(+ Claude API 비용 $80~150/월)

## 문서 구성 (multiCore/ 폴더)

| 파일 | 내용 |
|------|------|
| 01_서버환경_현황.md | 하드웨어/소프트웨어/디렉토리 구조 |
| 02_학생계정_구성.md | 학생별 파일 구조, 핵심 파일, 생성 명령 |
| 03_웹서버_claude-education.md | Express 서버 코드 분석, UI, 한계점 |
| 04_SSH_접속_가이드.md | 학생/교육자 접속 흐름, 문제 해결 |
| 05_인증_Credentials_관리.md | OAuth symlink vs API Key, 보안 |
| 06_코어할당_리소스관리.md | taskset/cgroups, 모니터링 |
| 07_검증결과_알려진이슈.md | 7개 실패+해결, 5개 미해결 |
| 08_갭분석_TODO.md | 계획 vs 실제, TODO, 로드맵 |
| 09_학생_비밀번호_관리.md | 자율 변경 + 관리자 초기화 |
| 20명_학생_Claude교육_계획서.md | 핵심 계획서 (AWS 스케일업) |
| AWS_EC2_멀티코어_인스턴스.md | 인스턴스 비교/비용 가이드 |

## 관련 프로젝트와의 관계

- [[uttec-edu]] — 교육 플랫폼의 인프라 레이어
- [[사전빌드]] — 학생이 Claude Code로 사전빌드 항목 제작
- [[aiStudy]] — 4 Track 커리큘럼 중 Track 1(Claude Code 기초)의 실습 환경
- [[claude-code]] — 핵심 도구, multiCore는 Claude Code의 멀티유저 환경
- [[서버인프라]] — Odroid C2가 서버 인프라의 일부

## 관련 페이지
- [[skills]] — SSH, Linux, Node.js, 서버 관리
- [[experience]] — 2026년 4월 인프라 구축
- [[projects]] — 현재 진행 중 프로젝트
- [[goals]] — AI 교육 사업화 목표
