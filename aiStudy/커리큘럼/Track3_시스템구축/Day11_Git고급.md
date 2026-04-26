# Day 11: Git 고급 — "팀으로 코드 관리하기"

## 학습 목표
- 브랜치 전략(Git Flow, GitHub Flow)을 이해하고 적용한다
- Pull Request를 생성하고 코드 리뷰 프로세스를 경험한다
- 머지 충돌을 해결하는 방법을 익힌다
- Claude Code를 활용하여 Git 작업을 자동화한다

## 준비물
- GitHub 계정
- Git이 설치된 환경 (로컬 또는 서버)
- Claude Code CLI
- 팀원 1명 이상 (짝 실습)

## 실습 1: 브랜치 전략 이해 (25분)

1. GitHub Flow를 실습용 레포에 적용한다

```bash
mkdir -p ~/git-practice && cd ~/git-practice
git init
git branch -M main
echo "# Team Project" > README.md
git add README.md
git commit -m "Initial commit"
```

2. GitHub에 레포를 생성하고 push한다

```bash
gh repo create git-practice --public --source=. --remote=origin --push
```

3. feature 브랜치를 만들어 작업한다

```bash
git checkout -b feature/add-api
mkdir src
cat > src/app.py << 'EOF'
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello Team!"}
EOF
git add src/
git commit -m "Add initial API endpoint"
```

4. Claude Code에게 브랜치 상태를 분석하게 한다

```
Claude에게: "현재 Git 레포의 브랜치 구조를 확인하고, main과 feature/add-api 브랜치의 차이(diff)를 보여줘. 커밋 히스토리도 그래프로 표시해줘."
```

### 관찰 포인트
- main 브랜치에서 직접 작업하지 않는 이유는?
- feature 브랜치 이름의 관례(feature/, bugfix/, hotfix/)는?

## 실습 2: Pull Request 생성 및 리뷰 (40분)

1. feature 브랜치를 push하고 PR을 생성한다

```bash
git push -u origin feature/add-api
gh pr create --title "Add initial API endpoint" --body "## Summary
- FastAPI 기본 엔드포인트 추가
- / 경로에 GET 핸들러 구현

## Test
- curl http://localhost:8000 으로 확인"
```

2. PR 정보를 확인한다

```bash
gh pr list
gh pr view 1
gh pr diff 1
```

3. Claude Code에게 코드 리뷰를 요청한다

```
Claude에게: "GitHub PR #1의 변경사항을 리뷰해줘. 코드 품질, 보안 이슈, 개선 제안을 체크리스트 형태로 정리해줘."
```

4. 리뷰 코멘트를 반영하여 코드를 수정한다

```bash
# 리뷰 피드백 반영
cat > src/app.py << 'EOF'
from fastapi import FastAPI

app = FastAPI(title="Team API", version="1.0.0")

@app.get("/")
def root():
    return {"message": "Hello Team!"}

@app.get("/health")
def health():
    return {"status": "healthy"}
EOF

git add src/app.py
git commit -m "Add health endpoint and API metadata per review"
git push
```

### 관찰 포인트
- PR을 통해 코드 리뷰를 하면 어떤 장점이 있는가?
- 리뷰 없이 main에 직접 push하면 어떤 위험이 있는가?

## 실습 3: 머지 충돌 해결 (30분)

1. 충돌 상황을 만든다

```bash
# main에서 같은 파일을 수정
git checkout main
cat > src/app.py << 'EOF'
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def root():
    return {"message": "Updated on main!"}
EOF
git add src/app.py
git commit -m "Update message on main"
```

2. feature 브랜치를 main에 머지 시도한다

```bash
git checkout feature/add-api
git merge main
# CONFLICT 발생!
```

3. Claude Code에게 충돌 해결을 도와달라고 한다

```
Claude에게: "Git 머지 충돌이 발생했어. src/app.py 파일의 충돌 내용을 보여주고, 양쪽 변경을 모두 살리는 방향으로 해결해줘."
```

4. 충돌 해결 후 커밋한다

```bash
git add src/app.py
git commit -m "Resolve merge conflict: keep both changes"
git log --oneline --graph --all
```

### 관찰 포인트
- `<<<<<<<`, `=======`, `>>>>>>>` 마커의 의미는?
- 충돌을 예방하는 방법은? (작은 단위 커밋, 자주 main과 동기화)

## 실습 4: PR 머지 및 브랜치 정리 (25분)

1. PR을 머지한다

```bash
git checkout main
git merge feature/add-api
git push origin main
# 또는 GitHub에서 Merge 버튼
gh pr merge 1 --merge
```

2. 사용 완료된 브랜치를 정리한다

```bash
git branch -d feature/add-api
git push origin --delete feature/add-api
git branch -a
```

3. 태그를 만들어 릴리즈를 표시한다

```bash
git tag -a v1.0.0 -m "First release with API endpoint"
git push origin v1.0.0
```

4. Claude Code에게 Git 히스토리를 정리하게 한다

```
Claude에게: "현재 Git 레포의 전체 커밋 히스토리를 그래프로 보여주고, 브랜치 머지 이력을 분석해줘. 태그 정보도 포함해줘."
```

### 관찰 포인트
- 머지 후 feature 브랜치를 삭제하는 이유는?
- 태그(tag)와 브랜치의 차이는?

## 과제

### 제출물: "Git 워크플로우 실습 보고서"

```markdown
# Git 워크플로우 실습 보고서

## 사용한 브랜치 전략
- 전략명: GitHub Flow
- main 브랜치 보호 규칙:

## PR 기록
| PR # | 제목 | 상태 | 리뷰어 |
|------|------|------|--------|
| 1 | | merged | |

## 충돌 해결 경험
- 충돌 파일:
- 충돌 원인:
- 해결 방법:

## Git 히스토리 (그래프)
(git log --oneline --graph --all 출력)

## 배운 Git 명령어
| 명령어 | 용도 |
|--------|------|
| git checkout -b | |
| git merge | |
| gh pr create | |
| git tag | |

## 팀 작업 시 지킬 규칙 3가지
1.
2.
3.
```

## 강사 참고 사항
- 실습 전에 학생들을 2인 1조로 짝지어 서로의 레포에 PR을 보내도록 한다
- 머지 충돌이 처음이면 당황할 수 있으므로, 간단한 예시로 먼저 시연한다
- GitHub Flow와 Git Flow의 차이는 간략히만 설명하고, 실제로는 GitHub Flow를 사용하도록 안내한다
