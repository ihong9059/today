# Obsidian 지식 관리 가이드

## 1. Obsidian이란?
- 마크다운(.md) 기반의 지식 관리 도구 (Personal Knowledge Management)
- 로컬 파일 기반 — 모든 데이터가 내 PC에 저장 (클라우드 종속 없음)
- **양방향 링크** [[페이지명]] — 메모 간 연결로 지식 네트워크 구축
- 그래프 뷰로 지식의 연결 관계를 시각적으로 확인
- "세컨드 브레인(Second Brain)" 구축에 최적
- 무료 사용 가능 (상업용도 포함)

## 2. 왜 Obsidian이 필요한가?
### 2.1 Notion vs Obsidian
| 구분 | Notion | Obsidian |
|------|--------|----------|
| 저장 위치 | 클라우드 | 로컬 PC |
| 오프라인 | 제한적 | 완벽 지원 |
| 속도 | 느림 (대용량 시) | 매우 빠름 |
| 데이터 포맷 | 독점 형식 | 표준 마크다운 |
| 양방향 링크 | 기본 지원 | 핵심 기능 |
| 그래프 뷰 | 없음 | 핵심 기능 |
| 용도 | 프로젝트 관리, 협업 | 개인 지식 관리, 연구 |
- **Notion은 "업무 도구"**, **Obsidian은 "두뇌 확장 도구"** — 둘 다 필요

### 2.2 AI 시대에 왜 필요한가?
- AI가 쏟아내는 정보를 체계적으로 정리하고 연결
- Claude Code + Obsidian = AI가 생성한 지식을 내 위키에 자동 축적
- 프로젝트가 쌓일수록 지식이 복리로 성장하는 시스템

## 3. 설치
### 3.1 다운로드
1. https://obsidian.md 접속
2. "Get Obsidian for free" 클릭
3. Windows/Mac/Linux 중 선택
4. 설치 파일 실행 → Next → Finish

### 3.2 첫 번째 Vault 만들기
1. Obsidian 실행
2. "Create new vault" 선택
3. 이름 입력 (예: "my-wiki")
4. 저장 위치 선택 (예: C:\Users\사용자\Documents\my-wiki)
5. "Create" 클릭

## 4. 기본 사용법
### 4.1 새 노트 만들기
- Ctrl+N: 새 노트 생성
- 제목 입력 후 내용 작성 (마크다운 문법)

### 4.2 마크다운 기본 문법
```markdown
# 제목 1
## 제목 2
### 제목 3

**굵게** *기울임* ~~취소선~~

- 목록 항목
- [ ] 체크리스트

> 인용문

| 열1 | 열2 |
|-----|-----|
| 값1 | 값2 |

```코드 블록```
```

### 4.3 양방향 링크 (핵심 기능!)
```markdown
이 프로젝트는 [[Claude Code]]와 [[GitHub]]를 사용합니다.
```
- [[ 입력하면 기존 노트 목록이 자동 표시
- 클릭하면 해당 노트로 이동
- 존재하지 않는 노트도 링크 가능 (나중에 생성)

### 4.4 태그
```markdown
#AI #교육 #프로젝트
```
- 태그로 노트를 분류/검색

### 4.5 그래프 뷰
- 좌측 메뉴에서 그래프 아이콘 클릭
- 또는 Ctrl+G
- 노트 간 연결 관계를 네트워크로 시각화
- 연결이 많은 노트 = 핵심 지식

## 5. Second Brain (세컨드 브레인) 구축
### 5.1 추천 폴더 구조
```
my-wiki/
├── 00_inbox/          # 임시 메모, 미정리 노트
├── 01_projects/       # 프로젝트별 노트
├── 02_areas/          # 지속 관심 영역 (업무, 학습, 건강 등)
├── 03_resources/      # 참고 자료, 레퍼런스
├── 04_archive/        # 완료/보관 노트
├── entities/          # 사람, 조직, 도구, 기술 등 엔티티
├── thoughts/          # 생각, 인사이트, 일기
├── templates/         # 노트 템플릿
├── log.md             # 시간순 활동 기록
└── index.md           # 전체 목차
```

### 5.2 일일 노트 (Daily Note)
- 설정 > Core plugins > Daily notes 활성화
- 매일 자동으로 오늘 날짜 노트 생성
- 할일, 메모, 회의록 등 기록
- Ctrl+D로 오늘 노트 바로 열기

### 5.3 템플릿 활용
설정 > Core plugins > Templates 활성화
```markdown
# {{title}}
- 생성일: {{date}}
- 태그: #

## 요약

## 상세 내용

## 관련 노트
- [[]]
```

## 6. 유용한 플러그인
### 6.1 Core Plugins (기본 내장)
- Daily Notes: 일일 노트
- Templates: 노트 템플릿
- Graph View: 지식 그래프
- Search: 전체 검색
- File Explorer: 파일 탐색기

### 6.2 Community Plugins (추천)
설정 > Community plugins > "Turn on" > Browse

| 플러그인 | 용도 |
|----------|------|
| Dataview | SQL처럼 노트 쿼리/테이블 생성 |
| Calendar | 달력에서 일일 노트 탐색 |
| Kanban | 칸반 보드 (프로젝트 관리) |
| Excalidraw | 다이어그램/화이트보드 |
| Git | Git 저장소와 자동 동기화 |

## 7. Git + Obsidian = 멀티 PC 동기화
### 7.1 왜 Git과 연결하나?
- Obsidian Vault를 GitHub에 저장
- 집 PC와 회사 PC에서 같은 위키 사용
- 변경 이력 자동 보존 (타임머신)

### 7.2 설정 방법
1. Vault 폴더에서 git init
```bash
cd my-wiki
git init
git remote add origin https://github.com/사용자/my-wiki.git
git add . && git commit -m "init" && git push -u origin main
```
2. Community plugin "Obsidian Git" 설치
3. 자동 백업 간격 설정 (예: 10분마다)

## 8. Claude Code + Obsidian 연동
- Claude Code가 마크다운 파일을 직접 읽고/쓰기 가능
- "이 작업 내용을 위키에 기록해줘" → Obsidian Vault에 자동 저장
- myWiki second-brain을 Claude가 관리하는 시스템 구축 가능
- 작업 종료 시 자동으로 위키 로그 업데이트

## 9. 자주 묻는 질문
- Q: 무료인가요? → 개인 사용은 완전 무료. Sync/Publish는 유료 ($4~$8/월)
- Q: Notion 대신 써야 하나요? → 둘 다 사용 추천. Notion=협업/프로젝트, Obsidian=개인 지식
- Q: 모바일에서 사용 가능? → iOS/Android 앱 있음
- Q: 데이터 유출 위험은? → 로컬 저장이므로 클라우드 유출 없음

## 10. 다음 단계
- [11_Tailscale_VPN.md](11_Tailscale_VPN.md) - Tailscale VPN으로 어디서든 접속하기
