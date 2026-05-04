# GitHub 설치 및 사용 가이드

## 1. GitHub이란?
- 코드와 파일을 저장/관리/공유하는 클라우드 서비스
- 버전 관리: 변경 이력을 자동으로 기록
- 팀 협업: 여러 사람이 동시에 작업 가능
- Claude Code와 연동하면 AI가 직접 코드를 커밋/푸시 가능

## 2. Git 설치
### 2.1 Windows
1. https://git-scm.com/download/win 에서 다운로드
2. 설치 시 기본값으로 Next 클릭 (중요: "Git Bash" 체크 확인)
3. 설치 확인:
```bash
git --version
```

### 2.2 초기 설정 (필수)
```bash
git config --global user.name "내이름"
git config --global user.email "내이메일@email.com"
```

## 3. GitHub 계정 만들기
1. https://github.com 접속
2. "Sign up" 클릭
3. 이메일, 비밀번호, 사용자명 입력
4. 이메일 인증 완료

## 4. GitHub 인증 설정 (gh CLI)
### 4.1 GitHub CLI 설치
```bash
winget install GitHub.cli
```
또는 https://cli.github.com 에서 다운로드

### 4.2 로그인
```bash
gh auth login
```
- GitHub.com 선택
- HTTPS 선택
- 브라우저로 인증

## 5. 저장소(Repository) 기본 사용법
### 5.1 새 저장소 만들기
GitHub 웹에서:
1. "+" 버튼 > "New repository"
2. 이름 입력, Public/Private 선택
3. "Create repository" 클릭

CLI에서:
```bash
gh repo create my-project --private
```

### 5.2 저장소 클론 (다운로드)
```bash
git clone https://github.com/사용자명/저장소명.git
cd 저장소명
```

### 5.3 기본 워크플로우 (add → commit → push)
```bash
# 1. 변경된 파일 확인
git status

# 2. 파일 추가 (스테이징)
git add 파일명
# 또는 모든 변경 파일
git add .

# 3. 커밋 (변경 기록)
git commit -m "작업 내용 설명"

# 4. 푸시 (서버에 업로드)
git push
```

### 5.4 최신 코드 받기
```bash
git pull
```

## 6. 자주 쓰는 Git 명령어
| 명령어 | 설명 |
|--------|------|
| git status | 변경된 파일 확인 |
| git log --oneline | 커밋 이력 보기 |
| git diff | 변경 내용 비교 |
| git branch | 브랜치 목록 |
| git checkout -b 이름 | 새 브랜치 생성 및 이동 |
| git stash | 임시 저장 |

## 7. Claude Code와 GitHub 연동
- Claude Code에서 "git push 해줘" 요청 가능
- /work-end Skill로 자동 커밋/푸시 가능
- GitHub MCP 연결하면 PR/이슈도 관리 가능

## 8. GitHub Desktop (GUI 도구)
- CLI가 어렵다면 GitHub Desktop 추천
- https://desktop.github.com 에서 다운로드
- 시각적으로 커밋, 푸시, 풀 가능

## 9. .gitignore 파일
- 추적하지 않을 파일 패턴 지정
```
node_modules/
.env
*.log
```

## 10. 자주 묻는 질문
- Q: push 할 때 에러가 나요 → git pull 먼저 실행 후 다시 push
- Q: 실수로 커밋했어요 → git reset --soft HEAD~1 (직전 커밋 취소)
- Q: Private 저장소는 무료인가요? → 네, GitHub 무료 계정도 Private 가능

## 11. 다음 단계
- [07_SSH_포트포워딩.md](07_SSH_포트포워딩.md) - 원격 서버 접속하기
