# myWiki / Second Brain 현황 분석
> 분석일: 2026-04-22 | 위키 초기화일: 2026-04-19

## 1. 위키 전체 구조

| 구분 | 수량 | 내용 |
|------|:----:|------|
| 핵심 페이지 | 9 | me, skills, experience, goals, strengths, gaps, ai-landscape, ai-direction, log |
| 엔티티 페이지 | 20 | 프로젝트/기술/사업별 상세 문서 |
| 생각 페이지 | 3 | second-brain-start, notion-연계, notion-data |
| raw/ 소스 파일 | 134 | junction link로 원본 참조 |
| Obsidian 플러그인 | 7 | dataview, excalidraw, obsidian-git, icon-folder, terminal, calendar, open-in-terminal |

## 2. 프로젝트별 진행 상태

| 프로젝트 | 위키 기록 상태 | 실제 현재 상태 | 판정 |
|----------|---------------|---------------|:----:|
| 사전빌드 | WROOM 155 + Mini 117 = 272개 완료, C6-LCD 미착수 | 동시빌드 미해결, C6-LCD 미착수 | 진행중 |
| Python Vibe | 100개 예제, 서버 v2.0 | 완성, 실습 배포 대기 | 유지 |
| UTTEC Edu | 37과정, 765일 커리큘럼 | 안정화 | 운영중 |
| AI FanStick | MVP 완료, 특허출원 | 제안 대기 | 보류 |
| Xerix | 제안서 v1.0 발송 (4/9) | 응답 대기 | 보류 |
| 위시캣 | 16건 지원, #153090 진행 | nRF52 현장 주3회 | 활발 |
| 스마트팩토리 | 25 데모, 슈레더 85억 제안 | 제안 상태 | 보류 |
| 외벽로봇 | 개념분석 완료 | 구현 미시작 | 보류 |
| 충전기(PowerDock) | 사업계획 완료 | 프로토타입 미시작 | 보류 |
| 의료AI | 5단계 로드맵 | 구현 미시작 | 보류 |
| CUDA교육 | 6주 커리큘럼 | 자료 완성 | 유지 |

## 3. 개선 필요 사항

### 3-1. 위키 콘텐츠 노후화 (최우선)
- 마지막 업데이트: 2026-04-19 (3일 경과)
- experience.md: 4/20~4/22 활동 미반영
- 서버인프라.md: webServer/ 문서 5개, aiPython/snu-consulting 복구 미반영
- goals.md: 단기 목표 일부 완료/변경 가능성

### 3-2. Lint(정합성 점검) 미실행
- CLAUDE.md에 Lint 워크플로우 정의되어 있으나 실행 기록 0회
- 모순, 고아 링크, 오래된 주장 점검 필요

### 3-3. thoughts/ 활용 부족
- 4/19 이후 새 생각 기록 0건
- 일상적 판단/인사이트 축적 안 됨

### 3-4. Obsidian 기능 활용 미비
- dataview 플러그인 설치되어 있으나 쿼리/대시보드 미구성
- Graph View 상호 링크 검증 필요

### 3-5. Notion 연동 미구현
- notion-연계.md에 계획만 있고 실제 동기화 미구축
- MCP Notion 도구는 사용 가능 상태

### 3-6. obsidian-git 자동 백업 미확인
- 플러그인 설치되어 있으나 실제 동작 여부 불명

### 3-7. raw/ 폴더 정체
- 초기 구축 이후 새 raw 소스 추가 없음

## 4. 권장 작업 순서

| 우선순위 | 작업 | 비고 |
|:--------:|------|------|
| 1 | Lint 실행 (정합성 첫 점검) | 할일 #7 겸용 |
| 2 | experience.md 업데이트 (4/20~4/22) | 3일치 활동 반영 |
| 3 | 서버인프라.md 업데이트 | webServer/ 5개 + 서비스 복구 |
| 4 | dataview 대시보드 구성 | 프로젝트 상태 한눈에 보기 |
| 5 | Notion 동기화 구조 결정 | MCP 도구 활용 |
