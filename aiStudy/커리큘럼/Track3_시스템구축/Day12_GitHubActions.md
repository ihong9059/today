# Day 12: GitHub Actions — "코드를 push하면 테스트가 자동으로"

## 학습 목표
- GitHub Actions의 개념(워크플로우, 잡, 스텝)을 이해한다
- CI 파이프라인을 설정하여 push 시 자동으로 pytest를 실행한다
- 워크플로우 YAML 파일을 작성하고 수정할 수 있다
- 테스트 실패 시 PR 머지를 차단하는 설정을 적용한다

## 준비물
- Day 11의 GitHub 레포
- pytest가 포함된 Python 프로젝트
- Claude Code CLI

## 실습 1: 테스트 코드 작성 (25분)

1. 앱에 테스트를 추가한다

```bash
cd ~/git-practice
cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
pytest==7.4.3
httpx==0.25.2
EOF
```

2. Claude Code에게 테스트 코드를 만들게 한다

```
Claude에게: "src/app.py의 FastAPI 앱에 대한 pytest 테스트를 만들어줘. tests/test_app.py에 저장. (1) / 엔드포인트 200 응답 확인, (2) /health 엔드포인트 확인, (3) 존재하지 않는 경로 404 확인. TestClient를 사용해줘."
```

3. 로컬에서 테스트를 실행한다

```bash
pip install -r requirements.txt
pytest tests/ -v
```

### 관찰 포인트
- 테스트가 왜 필요한가? 수동 테스트와의 차이는?
- 테스트가 통과해야 배포한다는 원칙의 장점은?

## 실습 2: GitHub Actions 워크플로우 생성 (40분)

1. 워크플로우 디렉토리를 만든다

```bash
mkdir -p .github/workflows
```

2. Claude Code에게 CI 워크플로우를 만들게 한다

```
Claude에게: "GitHub Actions CI 워크플로우를 만들어줘. 파일 경로: .github/workflows/ci.yml. 조건: (1) main과 모든 PR에서 실행, (2) Python 3.11, (3) requirements.txt 설치, (4) pytest 실행, (5) 테스트 결과를 Job Summary에 표시. 각 스텝에 주석 달아줘."
```

3. 워크플로우 파일을 확인한다

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      # 코드 체크아웃
      - uses: actions/checkout@v4

      # Python 설정
      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      # 의존성 캐시
      - name: Cache pip packages
        uses: actions/cache@v3
        with:
          path: ~/.cache/pip
          key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}

      # 패키지 설치
      - name: Install dependencies
        run: pip install -r requirements.txt

      # 테스트 실행
      - name: Run tests
        run: pytest tests/ -v --tb=short

      # 테스트 결과 요약
      - name: Test Summary
        if: always()
        run: pytest tests/ --tb=no -q || true
```

4. push하고 Actions 실행을 확인한다

```bash
git add .
git commit -m "Add CI workflow with pytest"
git push origin main
gh run list
gh run view --log
```

### 관찰 포인트
- `on: push`와 `on: pull_request`의 차이는?
- `actions/cache`가 빌드 속도에 미치는 영향은?

## 실습 3: CI 실패 체험 및 디버깅 (30분)

1. 일부러 실패하는 테스트를 만든다

```bash
git checkout -b feature/broken-test
cat >> tests/test_app.py << 'EOF'

def test_should_fail():
    assert 1 == 2, "This test is intentionally broken"
EOF

git add tests/test_app.py
git commit -m "Add intentionally failing test"
git push -u origin feature/broken-test
```

2. PR을 생성하고 CI 실패를 확인한다

```bash
gh pr create --title "Broken test PR" --body "Testing CI failure detection"
```

3. Actions 실행 결과를 확인한다

```bash
gh run list
gh run view --log-failed
```

4. Claude Code에게 실패 원인을 분석하게 한다

```
Claude에게: "GitHub Actions CI가 실패했어. 실패 로그를 분석하고 원인을 알려줘. 수정 방법도 제안해줘."
```

5. 테스트를 수정하고 다시 push한다

```bash
# 실패하는 테스트 제거
git checkout tests/test_app.py
git add tests/test_app.py
git commit -m "Fix broken test"
git push
# Actions가 다시 실행되어 통과하는지 확인
```

### 관찰 포인트
- CI 실패 시 PR에 어떤 표시가 나타나는가?
- 실패 로그에서 원인을 빠르게 찾는 방법은?

## 실습 4: 브랜치 보호 규칙 설정 (25분)

1. main 브랜치 보호 규칙을 설정한다

```bash
gh api repos/{owner}/{repo}/branches/main/protection -X PUT \
  -f "required_status_checks[strict]=true" \
  -f "required_status_checks[contexts][]=test" \
  -f "enforce_admins=false" \
  -f "required_pull_request_reviews=null" \
  -f "restrictions=null"
```

2. 또는 GitHub 웹에서 Settings → Branches → Add rule:
   - Branch name pattern: `main`
   - Require status checks: `test` job 선택
   - Require branches to be up to date

3. CI 실패 시 머지 불가능한 것을 확인한다

```
Claude에게: "현재 레포의 브랜치 보호 규칙을 확인해줘. main 브랜치에 어떤 보호가 설정되어 있는지 정리해줘."
```

### 관찰 포인트
- 브랜치 보호 규칙이 팀 개발에서 중요한 이유는?
- CI가 통과하지 않으면 절대 머지할 수 없는 것이 장점인 이유는?

## 과제

### 제출물: "CI 파이프라인 구축 보고서"

```markdown
# CI 파이프라인 구축 보고서

## 워크플로우 정보
- 파일: .github/workflows/ci.yml
- 트리거: push to main, PR to main
- Python 버전:

## 워크플로우 YAML
(전체 내용 붙여넣기)

## CI 실행 기록
| Run # | 트리거 | 결과 | 소요시간 |
|-------|--------|------|---------|
| | push | pass | |
| | PR | fail | |
| | PR (수정 후) | pass | |

## 테스트 목록
| 테스트 | 설명 | 결과 |
|--------|------|------|
| test_root | / 엔드포인트 확인 | |
| test_health | /health 확인 | |
| test_not_found | 404 확인 | |

## 브랜치 보호 규칙
- [ ] CI 통과 필수
- [ ] PR 리뷰 필수
- [ ] 브랜치 최신 상태 필수

## CI/CD 이해도
- CI란:
- 자동 테스트의 장점:
```

## 강사 참고 사항
- GitHub Actions의 무료 사용량(월 2,000분)을 안내하여 과도한 사용을 방지한다
- 워크플로우 YAML의 들여쓰기가 중요하므로 에디터 설정을 확인시킨다
- CI 실패 → 수정 → 통과 사이클을 직접 체험하는 것이 핵심이다
