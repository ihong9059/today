---
title: Claude Code
type: entity
created: 2026-04-19
updated: 2026-05-09
tags: [도구, AI, 핵심]
links: [ai-direction, ai-landscape, me, python-vibe, skills, strengths, 사전빌드, 유투브]
---

# Claude Code

## 한 줄 정의
Anthropic의 CLI 기반 AI 코딩 도구. 내 모든 작업의 **핵심 개발 파트너**.

## 나에게 어떤 의미인가
단순 보조 도구가 아닌 **생산성의 근간**. 코딩, 문서, 자동화, 교육 콘텐츠 전반에 활용.
이 도구 없이는 현재의 산출량이 불가능하다.

## 활용 방식

### Skill 시스템 (자체 구축)
| Skill | 용도 |
|-------|------|
| work-start | 세션 복원, 작업보고서 확인, 할일 통합 |
| work-end | 세션 저장, 작업보고서 업데이트, git commit/push |
| wishket-check | 위시캣 신규 프로젝트 검토 |
| wishket-apply | 맞춤형 지원서 생성 |
| ai-lesson | 교육 레슨 비디오 제작 |
| youtube-summary | 유튜브 영상 요약 |
| deploy-web | 서버 배포 자동화 |

### 코드 생성
- 펌웨어 코드 자동 생성 (사전빌드 272개)
- Flutter 앱 코드 생성
- 서버/웹 코드 생성
- Python Vibe에서 학생 요청에 실시간 코드 생성

### 문서 자동화
- 작업보고서 작성
- 위시캣 지원서 생성
- 제안서/설계서 작성
- 이 Second Brain 위키 전체 작성

## 핵심 판단 이력
| 판단 | 근거 |
|------|------|
| API 대신 CLI 직접 호출 | API 크레딧 불필요, 로컬 실행 |
| Haiku→Sonnet 전환 | 1차 빌드 성공률 향상 |
| Skill 시스템 정립 | 반복 워크플로우 자동화 |
| Claude Cowork 불가 | macOS 12 (14.2 필요) → CLI 유지 |

## 신기능 트래킹 (2026-05-09 — Code w/ Claude 발표 기준)

영상 출처: `유투브/02_Claude_Code/Claude_Code_새로운_기능_소개_Code_w_Claude_상세.md` (Dixon Sai, Anthropic)

### 개발자 경험 축
| 기능 | 활용 후보 |
|------|-----------|
| **Remote Control** | 모바일 미러링 → 외출 중 long-running 세션 모니터/지시 |
| **TUI Full Screen** | 스크롤백 가상화, 깜빡임 제거. 발표자 팀 대부분 전환 |
| **`/voice` 음성 모드** | 스페이스바로 발화 입력 |
| **Desktop 챕터 고정 → 목차** | 긴 세션 탐색용 (실험 기능) |
| **댓글 → 일괄 응답** | 다중 부분 선택 → 한 번에 처리 |

### 자율성 4종 세트 — 인간 승인 횟수 자체를 축소
| 기능 | 핵심 메커니즘 |
|------|---------------|
| **Auto Mode** | 권한 분류기가 ① 파괴적인가 ② 프롬프트 인젝션인가 자동 판단 |
| **Worktree** (`/worktree`) | Git worktree 통합 → N개 기능 격리 병렬. CLAUDE.md에 의도 적으면 Claude가 자체 진입/종료 |
| **Auto Memory** (`memory.md`) | 세션 지식을 디렉토리 + 인덱스로 축적, sub-agent별 메모리 격리 가능 |
| **`/ultra review`** (+ GitHub 앱) | 다단계·다주체 코드 리뷰 자동 실행 |

### Routines (연구 프리뷰) + `/loop`
- **Routines**: 프롬프트 + 저장소 + 커넥터 + 트리거(cron / GitHub webhook / API) → 무인 자동 실행
- 예시: 매일 GitHub 이슈 분류 → Slack 통보 / 매출 발생 시 자동 실행
- **`/loop`**: 단일 세션 내부 반복 실행 (`cron 생성 도구` 기반)
- **Tool Search**: 도구 정의에 간접 단계 추가 → 환경 부담 없이 더 많은 도구 동시 제공

### 도입 우선순위 (홍광선 기준)
1. **Auto Memory** — 사전빌드/python-vibe 학생별 컨텍스트 누적에 즉시 가치 (현재 수동으로 CLAUDE.md 작성 중)
2. **Worktree** — 펌웨어 + 웹 + 영상 병렬 작업이 잦음 → 세션 격리 효과 큼
3. **Routines** — 위시캣 신규 분석 매일 cron, n8n 자동화와 분리/통합 비교 검토
4. **TUI Full Screen** — 즉시 전환

## 관련 페이지
- [[me]]: 핵심 도구 의존성
- [[skills]]: AI 활용 역량
- [[ai-landscape]]: LLM 기술 지형
- [[ai-direction]]: AI 도구 활용 전략
- [[strengths]]: "AI 도구 극대화 활용" 강점
- [[사전빌드]]: 펌웨어 코드 생성에 활용
- [[python-vibe]]: AI 코드 생성 엔진
- [[유투브]]: Code w/ Claude 발표 영상 — 신기능 트래킹 출처
