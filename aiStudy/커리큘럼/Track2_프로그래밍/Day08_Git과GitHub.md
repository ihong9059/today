# Day 8: Git + GitHub — "코드를 안전하게 관리하고 공유하자"

## 학습 목표
- Git의 개념과 버전 관리의 필요성 이해
- init, add, commit, push 기본 명령어 습득
- GitHub 저장소 생성 및 코드 업로드
- Claude Code의 Git 연동 기능 활용

## 준비물
- Day 1-7에서 설정한 개발 환경
- GitHub 계정 (github.com)
- Git 설치 (git-scm.com)

---

## 실습 1: Git 기초 — 버전 관리 시작 (15분)

1. Git 설치 확인:
```bash
git --version
git config --global user.name "나의이름"
git config --global user.email "나의이메일@example.com"
```

2. Claude Code에게 요청:
```
Git의 기본 개념을 이해할 수 있도록 step-by-step으로 알려줘.
my-python-project 폴더에서 Git을 시작하자.
1. git init으로 저장소 초기화
2. .gitignore 파일 생성 (Python 프로젝트용)
3. git status로 현재 상태 확인
4. git add로 파일 스테이징
5. git commit으로 첫 번째 커밋
각 명령어가 뭘 하는 건지 쉬운 비유로 설명해줘.
```

3. 직접 실행:
```bash
cd my-python-project
git init
git status
git add .
git commit -m "첫 번째 커밋: Python 프로젝트 시작"
git log
```

### 관찰 포인트
- Working Directory → Staging Area → Repository 흐름
- git status의 색상 구분 (빨간색: 추적 안됨, 초록색: 스테이징됨)
- .gitignore로 불필요한 파일(venv/, __pycache__/)을 제외하는 이유

---

## 실습 2: 커밋 히스토리 관리 (15분)

1. 코드를 수정하고 여러 번 커밋:
```bash
# hello.py 수정 후
git add hello.py
git commit -m "기능 추가: 날짜 출력 기능"

# 새 파일 추가
git add calculator.py
git commit -m "새 파일: 계산기 프로그램 추가"
```

2. Claude Code에게 요청:
```
Git 커밋 히스토리를 관리하는 방법을 알려줘.
1. git log --oneline으로 간단히 보기
2. git diff로 변경 사항 확인
3. git checkout으로 이전 버전 확인 (읽기 전용)
4. 좋은 커밋 메시지 작성법 알려줘

실습용으로 calculator.py를 3번 수정하면서 각각 의미 있는 커밋 메시지를 작성하는 예제를 보여줘.
```

3. Claude Code의 자동 커밋 기능 활용:
```
현재 변경 사항을 확인하고 적절한 커밋 메시지로 커밋해줘.
```

### 관찰 포인트
- Claude Code가 변경 사항을 분석하고 커밋 메시지를 제안하는 과정
- 커밋은 "의미 있는 단위"로 하는 것이 좋은 관례

---

## 실습 3: GitHub 연동 — 원격 저장소 (20분)

1. GitHub에서 새 저장소 생성 (웹 브라우저)
2. Claude Code에게 요청:
```
GitHub 원격 저장소에 코드를 올리는 방법을 알려줘.
1. git remote add origin으로 원격 저장소 연결
2. git push -u origin main으로 첫 푸시
3. GitHub 인증 방법 (Personal Access Token 또는 SSH 키)
4. push한 후 GitHub 웹에서 코드 확인하는 방법

인증에서 막힐 때 해결 방법도 알려줘.
```

3. 직접 실행:
```bash
git remote add origin https://github.com/내아이디/my-python-project.git
git branch -M main
git push -u origin main
```

4. GitHub 웹에서 확인 → README.md 확인

### 관찰 포인트
- 로컬 저장소와 원격 저장소의 관계
- push는 "올리기", pull은 "내려받기"
- GitHub Personal Access Token 생성 방법

---

## 실습 4: 브랜치와 Pull Request (15분)

1. Claude Code에게 요청:
```
브랜치를 만들고 Pull Request를 생성하는 과정을 알려줘.
1. git checkout -b feature/add-game으로 새 브랜치 생성
2. 새 브랜치에서 파일 추가/수정
3. 커밋 후 git push origin feature/add-game
4. GitHub에서 Pull Request 생성하는 방법

Claude Code에서 브랜치를 만들고 PR을 생성하는 명령도 보여줘.
```

2. 직접 실습:
```bash
git checkout -b feature/add-game
# 파일 수정
git add .
git commit -m "게임 기능 추가"
git push origin feature/add-game
```

3. GitHub 웹에서 Pull Request 생성 → Merge

### 관찰 포인트
- 브랜치는 "독립적인 작업 공간" — 메인 코드에 영향을 주지 않음
- Pull Request는 "코드 리뷰 요청" — 팀 협업의 핵심
- Claude Code가 gh 명령어로 PR을 생성할 수 있음

---

## 과제

### 제출물: "나의 GitHub 저장소"

```markdown
# 나의 GitHub 저장소

## 저장소 정보
- URL: https://github.com/내아이디/my-python-project
- 커밋 수:
- 브랜치 수:

## 커밋 히스토리 (git log --oneline 결과)

## 배운 Git 명령어 정리
| 명령어 | 기능 | 사용 상황 |
|--------|------|----------|
| git init | | |
| git add | | |
| git commit | | |
| git push | | |
| git pull | | |
| git branch | | |
| git checkout | | |

## Git 사용 시 겪은 문제와 해결 방법

## Claude Code의 Git 관련 기능 중 유용했던 것
```

---

## 강사 참고 사항
- GitHub 인증이 가장 큰 장벽 — Personal Access Token 생성을 화면 공유하며 안내
- 회사 보안 정책으로 GitHub 접속이 안 될 수 있으므로 GitLab 대안 준비
- "혼자 개발해도 Git을 써야 하는 이유"를 실수로 코드 날린 경험 사례로 설명
