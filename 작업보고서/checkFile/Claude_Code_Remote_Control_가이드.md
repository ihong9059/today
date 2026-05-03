# Claude Code Remote Control 완전 가이드

> 작성일: 2026-03-25 | Claude Code v2.1.51+

---

## 목차

1. [개요](#1-개요)
2. [요구사항 및 사전 준비](#2-요구사항-및-사전-준비)
3. [Remote Control 시작하기](#3-remote-control-시작하기)
4. [연결 방법](#4-연결-방법)
5. [보안 및 네트워크 아키텍처](#5-보안-및-네트워크-아키텍처)
6. [원격에서 명령 보내기](#6-원격에서-명령-보내기)
7. [고급 설정](#7-고급-설정)
8. [활용 시나리오](#8-활용-시나리오)
9. [CLI 레퍼런스](#9-cli-레퍼런스)
10. [아키텍처 및 데이터 흐름](#10-아키텍처-및-데이터-흐름)
11. [관련 기능 비교](#11-관련-기능-비교)
12. [트러블슈팅](#12-트러블슈팅)
13. [모범 사례](#13-모범-사례)

---

## 1. 개요

### Remote Control이란?

Claude Code Remote Control은 **로컬 머신에서 실행 중인 Claude Code 세션을 다른 기기에서 원격으로 제어**할 수 있는 기능입니다.

**접속 가능한 기기:**
- claude.ai/code (웹 인터페이스)
- Claude 모바일 앱 (iOS/Android)
- 다른 기기의 브라우저

### 핵심 특징

| 특징 | 설명 |
|------|------|
| **로컬 실행** | 모든 작업은 내 컴퓨터에서 실행됨 (클라우드로 이동하지 않음) |
| **전체 환경 접근** | 로컬 파일, MCP 서버, 커스텀 도구, 프로젝트 설정 모두 사용 가능 |
| **자동 재연결** | 네트워크 끊김/머신 슬립 후 자동 복구 (~10분 이내) |
| **다중 기기 동시 접속** | 여러 기기에서 동일 세션을 동시에 보고 제어 가능 |
| **대화 동기화** | 연결된 모든 기기에서 대화가 실시간 동기화 |

### 작동 원리 (간략)

```
[내 컴퓨터: Claude Code] ←→ [Anthropic API] ←→ [원격 기기: 웹/모바일]
         ↓
   로컬 파일시스템
   MCP 서버
   Git, 터미널 등
```

- 로컬 Claude Code가 **아웃바운드 HTTPS 요청만** 사용
- 인바운드 포트를 **절대 열지 않음**
- 모든 트래픽은 TLS 암호화

---

## 2. 요구사항 및 사전 준비

### 필수 요구사항

| 항목 | 조건 |
|------|------|
| **구독 플랜** | Pro, Max, Team, 또는 Enterprise (API 키 불가) |
| **인증 방식** | `claude.ai` 로그인 필수 (API 키 또는 Console 인증 불가) |
| **Claude Code 버전** | v2.1.51 이상 |
| **워크스페이스 신뢰** | 프로젝트 디렉토리에서 `claude`를 최소 1회 실행하여 워크스페이스 신뢰 수락 필요 |

### 버전 확인

```bash
claude --version
```

### Team/Enterprise 추가 설정

관리자가 Claude Code 관리 설정에서 **Remote Control 토글**을 활성화해야 합니다.

경로: `claude.ai/admin-settings/claude-code` → Remote Control → 활성화

### 인증 확인

```bash
claude
# 세션 내에서:
/status    # 로그인 방식 확인
/login     # claude.ai OAuth 로그인
/logout    # 로그아웃
```

---

## 3. Remote Control 시작하기

### 방법 1: 서버 모드 (원격 전용, 권장)

터미널에서 Remote Control 전용 서버를 실행합니다:

```bash
claude remote-control
```

이 모드는 로컬 터미널에서 직접 대화하지 않고, **원격 접속만을 위한 대기 상태**로 실행됩니다.

#### 주요 옵션

```bash
# 커스텀 세션 이름 설정
claude remote-control --name "My Project"

# 동시 세션에서 worktree 사용 (git 저장소 필요)
claude remote-control --spawn worktree

# 최대 동시 세션 수 제한 (기본값: 32)
claude remote-control --capacity 5

# 상세 로그 출력
claude remote-control --verbose

# 샌드박스 모드 (파일시스템/네트워크 격리)
claude remote-control --sandbox

# 조합 사용
claude remote-control --name "Auth Refactor" --spawn worktree --capacity 3 --verbose
```

### 방법 2: 인터랙티브 모드 (로컬 + 원격 동시 접근)

로컬에서도 대화하면서, 동시에 원격 접속도 가능합니다:

```bash
claude --remote-control

# 커스텀 이름과 함께
claude --remote-control "My Project"
```

### 방법 3: 기존 세션에서 활성화 (세션 내 명령)

이미 실행 중인 Claude Code 세션에서 Remote Control을 켤 수 있습니다:

```
/remote-control

# 커스텀 이름과 함께
/remote-control My Project
```

### 방법 4: 모든 세션에 영구 활성화

```
/config
```

설정에서 **"Enable Remote Control for all sessions"** → `true`로 설정하면, 이후 모든 Claude Code 세션이 자동으로 원격 접속 가능해집니다.

---

## 4. 연결 방법

Remote Control 세션이 활성화되면, 다른 기기에서 다음 방법으로 접속합니다.

### 4.1 세션 URL로 접속

터미널에 표시되는 URL을 다른 기기 브라우저에서 열기:

```
https://claude.ai/code/rc/...
```

### 4.2 QR 코드 스캔

- `claude remote-control` 실행 후 **스페이스바**를 누르면 QR 코드 표시/숨기기 토글
- Claude 모바일 앱으로 QR 코드 스캔

### 4.3 세션 목록에서 선택

- `claude.ai/code` 또는 Claude 모바일 앱을 열기
- 세션 목록에서 **컴퓨터 아이콘 + 녹색 점**이 있는 세션을 클릭
- 녹색 점 = 온라인 상태

### 세션 이름 결정 우선순위

Remote Control 세션 이름은 다음 순서로 결정됩니다:

1. `--name`, `--remote-control`, `/remote-control` 으로 전달된 이름
2. `/rename` 명령으로 설정한 이름
3. 대화 기록의 마지막 의미 있는 메시지
4. 사용자가 처음 보내는 프롬프트 (기록이 없을 경우)

---

## 5. 보안 및 네트워크 아키텍처

### 네트워크 모델

```
[내 컴퓨터]                    [Anthropic API]              [원격 기기]
     │                              │                           │
     │── 아웃바운드 HTTPS 요청 ──→  │                           │
     │                              │ ←── HTTPS 연결 ──         │
     │                              │                           │
     │    ※ 인바운드 포트 없음       │    메시지 라우팅            │
     │    ※ TLS 암호화              │                           │
```

### 보안 특징

| 항목 | 설명 |
|------|------|
| **인바운드 포트** | 열지 않음 — 아웃바운드 HTTPS만 사용 |
| **자격 증명** | 다수의 단기(short-lived) 자격 증명 사용 |
| **자격 증명 범위** | 각 자격 증명은 단일 목적으로 범위 제한 |
| **만료** | 자격 증명은 독립적으로 만료됨 |
| **클라우드 저장** | 영구적 자격 증명이 클라우드에 저장되지 않음 |
| **암호화** | 모든 트래픽 TLS 암호화 |
| **파일시스템** | 로컬에 유지 — 클라우드로 이동하지 않음 |

### 로컬에 유지되는 항목

- 모든 파일 접근
- 모든 도구 실행
- MCP 서버 연결
- 프로젝트 설정
- 환경 변수
- Git 작업

### API를 통해 전달되는 항목

- 대화 메시지
- 권한 프롬프트 (자동 승인되지 않은 경우)
- 단기 자격 증명
- 세션 상태

---

## 6. 원격에서 명령 보내기

### 웹 인터페이스 (claude.ai/code)

- 채팅 입력창에 메시지 타이핑
- 파일/이미지 첨부
- 코드 에디터에서 변경사항 검토/편집
- 비주얼 diff 뷰로 코드 변경사항 확인

### 모바일 앱

- 채팅 인터페이스로 메시지 전송
- 세션 상태 및 대화 확인
- Remote Control 전용 기능 사용

### 사용 가능한 명령

원격에서도 로컬과 **동일한 모든 작업**을 수행할 수 있습니다:

- 질문하기, 코드 변경 요청
- 테스트 실행 요청
- `/` 명령어 사용 (`/rename`, `/memory` 등)
- 작업 중단 (인터페이스에 따라 Ctrl+C에 해당하는 기능)

### 명령 전달 흐름

```
1. 원격 기기에서 메시지 입력
2. Anthropic API를 통해 전달
3. 로컬 Claude Code가 수신
4. 로컬 환경에서 처리 (파일 접근, 도구 실행 등)
5. 응답이 API를 통해 원격 기기로 스트리밍
```

---

## 7. 고급 설정

### 다중 동시 세션 (서버 모드)

```bash
claude remote-control --spawn worktree --capacity 5 --name "Team Project"
```

| 옵션 | 설명 |
|------|------|
| `--spawn worktree` | 각 세션이 독립적인 git worktree를 받음 |
| `--capacity 5` | 최대 5개 동시 세션 허용 |
| 장점 | 파일 충돌 방지, 팀 협업에 적합 |

### --spawn 옵션 상세

| 모드 | 설명 |
|------|------|
| `same-dir` (기본값) | 모든 세션이 현재 작업 디렉토리를 공유 |
| `worktree` | 각 세션이 독립적인 git worktree를 받음 (git 저장소 필요) |

### 샌드박스 모드

```bash
claude remote-control --sandbox
```

- 파일시스템 및 네트워크 격리 활성화
- 신뢰할 수 없는 원격 사용자에게 유용
- 로컬 시스템 보호

### 상세 디버깅

```bash
claude remote-control --verbose
```

출력 내용:
- 전체 연결 로그
- 도구 실행 상세 정보
- 세션 활동 내역
- 트러블슈팅에 유용

---

## 8. 활용 시나리오

### 시나리오 1: 소파에서 작업 이어하기

```
[데스크톱]
1. claude remote-control --name "Auth Refactor"
2. 구현 작업 시작
3. 세션 URL/QR 코드 확인

[스마트폰]
1. URL 열기 또는 Claude 앱에서 QR 코드 스캔
2. "로그인 함수에 에러 처리 추가해줘" 전송
3. Claude가 원격으로 작업하는 것을 확인
4. 변경사항 리뷰
5. 데스크톱으로 돌아와서 계속 작업
```

### 시나리오 2: 멀티 기기 워크플로우

```
[집 데스크톱]
- claude remote-control --name "Email Service"

[회사에서]
- claude.ai/code 열기
- "Email Service" 세션 클릭
- "rate limiting 이슈 디버깅해줘" 전송
- Claude가 내 로컬 DB 연결을 사용하여 디버깅

[출퇴근 중 (모바일)]
- Claude 앱에서 진행 상황 모니터링
- 코드 diff 리뷰
- 답변으로 변경사항 승인
```

### 시나리오 3: 팀 협업 (worktree 활용)

```
[내 컴퓨터]
- claude remote-control --name "CI Monitor" --spawn worktree --capacity 3

[팀원 A의 브라우저]
- Remote Control 세션 접속
- "테스트가 통과하는지 확인하고 실패한 것 수정해줘" 전송
- 독립적인 git worktree에서 작업 진행

[팀원 B의 브라우저]
- 동일 세션 접속
- 다른 worktree에서 독립적으로 작업
- 파일 충돌 없음
```

### 시나리오 4: 장시간 작업 모니터링

```
[데스크톱]
- claude remote-control --name "데이터 마이그레이션"
- "데이터베이스 마이그레이션 스크립트 실행하고 진행상황 보고해줘"

[이동 중 (모바일)]
- 진행상황 실시간 확인
- 필요시 추가 지시
- 완료 알림 확인
```

---

## 9. CLI 레퍼런스

### 터미널 명령어

```bash
# 서버 모드 시작
claude remote-control

# 커스텀 이름으로 서버 모드
claude remote-control --name "Debug Session"

# worktree 스폰과 함께 서버 모드
claude remote-control --spawn worktree --capacity 5

# 상세 로그 포함
claude remote-control --verbose

# 샌드박스 모드
claude remote-control --sandbox

# 인터랙티브 + 원격 접근
claude --remote-control
claude --remote-control "Project Name"

# 옵션 조합
claude remote-control --name "Team Work" --spawn worktree --capacity 3 --verbose
```

### 세션 내 명령어

```
/remote-control                 # 현재 세션에서 Remote Control 활성화
/remote-control "Session Name"  # 커스텀 이름으로 활성화
/rename "New Name"              # 세션 이름 변경
/status                         # 인증 상태 확인
/login                          # claude.ai 로그인
/logout                         # 로그아웃
/config                         # 설정 (영구 활성화 등)
```

### 옵션 요약 테이블

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `--name <이름>` | 세션 이름 설정 | 자동 결정 |
| `--spawn <모드>` | 동시 세션 생성 방식 (`same-dir` / `worktree`) | `same-dir` |
| `--capacity <N>` | 최대 동시 세션 수 | 32 |
| `--verbose` | 상세 로그 출력 | 꺼짐 |
| `--sandbox` | 파일시스템/네트워크 격리 | 꺼짐 |
| `--no-sandbox` | 격리 해제 | - |

---

## 10. 아키텍처 및 데이터 흐름

### 세션 라이프사이클

```
[1. 초기화]
    claude remote-control 실행
         ↓
    Anthropic API에 세션 등록
         ↓
    단기 자격 증명 생성
         ↓
    원격 연결 대기

[2. 원격 접속]
    사용자가 URL 열기 / QR 스캔
         ↓
    claude.ai/code에 세션 토큰으로 연결
         ↓
    API가 로컬 머신으로 연결 라우팅
         ↓
    대화 동기화 시작

[3. 메시지 흐름]
    사용자가 웹/모바일에서 입력
         ↓
    API를 통해 메시지 라우팅
         ↓
    로컬 Claude Code가 수신
         ↓
    로컬 환경에서 처리 (전체 파일/도구 접근)
         ↓
    응답이 API를 통해 스트리밍
         ↓
    모든 연결 기기에서 업데이트 확인

[4. 연결 끊김 처리]
    네트워크 끊김 → 로컬 세션이 재연결 폴링
    ~10분 이내 → 자동 재연결
    ~10분 초과 → 세션 타임아웃

[5. 종료]
    터미널 닫기 / claude 종료 → 세션 종료
    원격 기기 연결 해제
    다시 시작: claude remote-control 재실행
```

### 연결 구조도

```
┌─────────────────────┐
│   내 컴퓨터 (로컬)    │
│                     │
│  ┌───────────────┐  │
│  │  Claude Code   │  │
│  │  (프로세스)     │  │
│  └───────┬───────┘  │
│          │          │
│  ┌───────┴───────┐  │
│  │ 로컬 리소스     │  │
│  │ - 파일시스템    │  │
│  │ - MCP 서버     │  │
│  │ - Git          │  │
│  │ - 환경 변수    │  │
│  │ - 터미널       │  │
│  └───────────────┘  │
└─────────┬───────────┘
          │ 아웃바운드 HTTPS only
          ▼
┌─────────────────────┐
│   Anthropic API      │
│   (메시지 라우팅)     │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    ▼           ▼
┌────────┐ ┌────────┐
│  웹     │ │ 모바일  │
│ 브라우저 │ │  앱    │
└────────┘ └────────┘
```

---

## 11. 관련 기능 비교

### Remote Control vs. Claude Code on the Web

| 항목 | Remote Control | Web (클라우드) |
|------|:--------------:|:--------------:|
| 실행 위치 | 내 컴퓨터 | Anthropic 클라우드 |
| 로컬 파일 접근 | O | X (새로 클론) |
| 로컬 MCP 서버 | O | X |
| 커스텀 도구 | O | X |
| 머신 재시작 후 유지 | X | O |
| 설정 필요 | 최소 | 없음 (URL 기반) |

**Remote Control 선택 시:** 로컬 작업 중, 로컬 도구/MCP 필요, 폰에서 이어하기
**Web 선택 시:** 새 작업 시작, 로컬 설정 불가, 항상 실행 상태 필요

### Remote Control vs. Dispatch

| 항목 | Remote Control | Dispatch |
|------|:--------------:|:--------:|
| 방향 | 양방향 제어 | 단방향 (모바일→데스크톱) |
| 세션 상태 | 이미 실행 중인 세션 조종 | 새 세션 스폰 |
| 용도 | 진행 중인 작업 조종 | 부재 중 작업 위임 |

### Remote Control vs. Channels

| 항목 | Remote Control | Channels |
|------|:--------------:|:--------:|
| 모델 | Pull 기반 (직접 조종) | Push 기반 (이벤트 반응) |
| 제어 | 인터랙티브 | 이벤트 드리븐 |
| 용도 | 능동적 조종 | 무인 이벤트 반응 |

### 종합 비교 매트릭스

| 시나리오 | 추천 기능 | 이유 |
|----------|----------|------|
| 소파에서 로컬 작업 이어하기 | **Remote Control** | 세션 실행 중 + 전체 로컬 환경 접근 |
| 모바일에서 새 작업 위임 | **Dispatch** | 새 세션을 온디맨드로 스폰 |
| Slack에서 CI 실패 반응 | **Channels + MCP** | 이벤트를 세션으로 푸시 |
| 무인 야간 PR 리뷰 | **Cloud Scheduled Tasks** | 내 컴퓨터 없이 실행 |
| 세션 내 빠른 반복 폴링 | **`/loop`** | 경량, 세션 범위 제한 |
| 모든 세션에 원격 접근 활성화 | **`/config` 설정** | 1회 설정으로 영구 적용 |
| 팀이 로컬 코드베이스 공유 | **Remote Control + worktree** | 각 멤버 격리된 worktree |

---

## 12. 트러블슈팅

### "Remote Control is not yet enabled for your account"

**원인 및 해결:**

1. **환경 변수가 차단 중**
   - 다음 환경 변수가 설정되어 있으면 해제:
     ```bash
     unset CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
     unset DISABLE_TELEMETRY
     unset CLAUDE_CODE_USE_BEDROCK
     unset CLAUDE_CODE_USE_VERTEX
     unset CLAUDE_CODE_USE_FOUNDRY
     ```

2. **오래된 인증 정보**
   ```
   /logout
   /login
   ```

### "Remote Control is disabled by your organization's policy"

**원인 3가지:**

| 원인 | 확인 방법 | 해결 |
|------|----------|------|
| 잘못된 인증 방식 사용 | `/status`로 확인 | API 키 해제 후 `/login` |
| Team/Enterprise 관리자 미활성화 | 관리자 확인 | `claude.ai/admin-settings/claude-code`에서 활성화 |
| 관리자 토글 비활성(회색) | 관리자 확인 | 컴플라이언스/데이터 보관 설정과 호환 불가 → Anthropic 지원팀 문의 |

### "Remote credentials fetch failed"

| 원인 | 해결 |
|------|------|
| 미로그인 | `claude` 실행 후 `/login` |
| 네트워크/프록시 문제 | `api.anthropic.com:443` 접근 확인 |
| 세션 생성 실패 | 구독 상태 확인, `--verbose`로 상세 정보 확인 |

### 일반적인 문제

| 증상 | 원인 | 해결 |
|------|------|------|
| 세션이 갑자기 끊어짐 | 터미널 닫힘 또는 프로세스 종료 | `claude remote-control` 재실행 |
| 10분 이상 응답 없음 | 네트워크 장애로 타임아웃 | 네트워크 확인 후 재실행 |
| 원격에서 도구 실행 안 됨 | 권한 프롬프트 대기 중 | 로컬 터미널에서 권한 승인 |
| QR 코드 안 보임 | 서버 모드에서만 가능 | 스페이스바 눌러서 토글 |

---

## 13. 모범 사례

### 1. 의미 있는 세션 이름 사용

```bash
# 좋은 예
claude remote-control --name "Bug-fix-auth-service"
claude remote-control --name "데이터 마이그레이션 v2"

# 나쁜 예
claude remote-control --name "test"
claude remote-control  # 이름 없이
```

여러 기기에서 세션을 빠르게 식별할 수 있습니다.

### 2. 협업 시 worktree 사용

```bash
claude remote-control --spawn worktree --capacity 3
```

여러 사람이 동시에 접속할 때 파일 충돌을 방지합니다.

### 3. 로컬 터미널 모니터링 유지

원격 작업 중에도 로컬 터미널을 열어두면:
- 도구 실행 상태 확인 가능
- 연결 상태 모니터링
- 권한 프롬프트에 빠르게 응답

### 4. 신뢰하지 않는 원격 사용자에게는 샌드박스

```bash
claude remote-control --sandbox
```

파일시스템과 네트워크 접근을 격리합니다.

### 5. 영구 활성화로 편의성 확보

```
/config → "Enable Remote Control for all sessions" → true
```

매번 설정할 필요 없이, 모든 세션이 자동으로 원격 접속 가능합니다.

### 6. 민감한 작업 시 주의

- Remote Control은 로컬 환경에 **전체 접근 권한**을 가짐
- 공유 세션의 URL을 신뢰할 수 있는 사람에게만 전달
- 필요시 `--sandbox` 옵션 사용

---

## 부록: 빠른 시작 요약

```bash
# 1. 버전 확인
claude --version  # v2.1.51 이상

# 2. 로그인 (API 키가 아닌 claude.ai OAuth)
claude
/login

# 3. Remote Control 시작
claude remote-control --name "내 프로젝트"

# 4. 표시된 URL을 다른 기기에서 열기 (또는 QR 코드 스캔)
# → 스페이스바로 QR 코드 토글

# 5. 원격 기기에서 평소처럼 작업!
```
