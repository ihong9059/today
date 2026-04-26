# Day 17: 배포 기초 — "내가 만든 앱을 세상에 공개하자"

## 학습 목표
- requirements.txt와 .env로 프로젝트 배포 준비
- GitHub Pages로 정적 사이트 배포
- ngrok으로 로컬 서버를 외부에 공개
- 배포 시 보안 체크리스트 이해

## 준비물
- Day 1-16에서 설정한 개발 환경
- GitHub 계정
- ngrok 계정 (ngrok.com 무료 가입)

---

## 실습 1: 배포 준비 — 프로젝트 정리 (15분)

1. Claude Code에게 요청:
```
메모 앱 프로젝트를 배포할 수 있도록 정리해줘.
1. requirements.txt 생성 (pip freeze 결과 정리)
2. .env.example 파일 생성 (실제 값 없이 키 이름만)
3. .gitignore 완성:
   - .env, __pycache__/, *.db, venv/, .idea/, .vscode/
4. README.md 작성:
   - 프로젝트 설명
   - 설치 방법 (pip install -r requirements.txt)
   - 실행 방법
   - API 문서 링크 (/docs)
   - 환경 변수 설정 방법
5. 프로젝트 구조를 정리해서 보여줘
```

2. 배포 체크리스트 확인:
```
배포 전 보안 체크리스트를 만들어줘:
1. API 키가 코드에 하드코딩되어 있지 않은지
2. .env 파일이 .gitignore에 포함되어 있는지
3. debug=True가 프로덕션에서 꺼져 있는지
4. CORS 설정이 적절한지
5. SQL 인젝션 방어가 되어 있는지
```

### 관찰 포인트
- requirements.txt로 다른 사람이 같은 환경을 재현할 수 있음
- .env.example은 "어떤 환경 변수가 필요한지" 알려주는 가이드
- README.md는 프로젝트의 "첫인상" — 잘 써야 함

---

## 실습 2: GitHub Pages — 정적 사이트 배포 (20분)

1. Claude Code에게 요청:
```
GitHub Pages로 배포할 수 있는 포트폴리오 사이트를 만들어줘.
portfolio/ 폴더에:
1. index.html — 자기소개 + 프로젝트 목록
2. style.css — 모던한 디자인
3. projects.html — 지금까지 만든 프로젝트 소개:
   - 가위바위보 게임 (Day 3)
   - 데이터 분석 도구 (Day 5)
   - 메모 앱 (Day 10+13)
   - AI 번역기 (Day 12)
4. 각 프로젝트별 스크린샷 영역, 기술 스택, GitHub 링크
5. 반응형 디자인 (모바일 대응)
```

2. GitHub Pages 배포:
```bash
cd portfolio
git init
git add .
git commit -m "포트폴리오 사이트 배포"
git remote add origin https://github.com/내아이디/portfolio.git
git push -u origin main
```

3. GitHub 설정: Settings → Pages → main 브랜치 선택 → Save
4. 배포 URL 확인: https://내아이디.github.io/portfolio

### 관찰 포인트
- GitHub Pages는 정적 사이트(HTML/CSS/JS)만 호스팅 가능
- Python 서버(Flask/FastAPI)는 GitHub Pages에 올릴 수 없음
- 무료로 HTTPS가 적용되는 장점

---

## 실습 3: ngrok — 로컬 서버 외부 공개 (20분)

1. ngrok 설치 및 설정:
```bash
# ngrok 설치 (https://ngrok.com 에서 다운로드)
ngrok config add-authtoken 나의토큰
```

2. Claude Code에게 요청:
```
ngrok으로 메모 앱을 외부에 공개하는 방법을 알려줘.
1. 메모 앱 서버 실행 (uvicorn main:app --host 0.0.0.0 --port 8000)
2. ngrok http 8000 으로 터널 생성
3. 생성된 URL로 외부에서 접속하는 방법
4. ngrok 대시보드에서 트래픽 모니터링

주의사항:
- ngrok 무료 버전의 제한사항
- 보안 주의사항 (누구나 접속 가능)
- 서버를 끄면 URL도 만료됨
```

3. 실습:
```bash
# 터미널 1: 메모 앱 실행
uvicorn main:app --host 0.0.0.0 --port 8000

# 터미널 2: ngrok 터널 생성
ngrok http 8000
```

4. 생성된 ngrok URL을 옆 사람에게 공유하여 접속 테스트

### 관찰 포인트
- ngrok이 로컬 서버와 인터넷 사이의 "터널"을 만들어주는 원리
- 실제 서비스 배포와 ngrok의 차이 (임시 vs 영구)
- 다른 사람이 내 앱에 접속하는 것을 보는 성취감

---

## 실습 4: 배포 자동화 기초 (15분)

1. Claude Code에게 요청:
```
배포를 자동화하는 스크립트를 만들어줘.

deploy.py:
1. requirements.txt 자동 업데이트
2. 테스트 실행 (pytest) — 실패하면 배포 중단
3. .env 파일 존재 여부 확인
4. git add, commit, push 자동 실행
5. 배포 완료 메시지 출력

start.sh (서버 시작 스크립트):
1. 가상환경 활성화
2. 의존성 설치 (pip install -r requirements.txt)
3. DB 마이그레이션 (테이블 생성)
4. 서버 시작

각 단계에서 에러가 발생하면 명확한 메시지와 함께 중단하도록 해줘.
```

2. 배포 스크립트 실행:
```bash
python deploy.py
```

### 관찰 포인트
- 배포 프로세스를 스크립트로 자동화하면 실수를 줄일 수 있음
- 테스트를 배포 전에 실행하는 것이 안전한 배포의 핵심
- 실무에서는 GitHub Actions 등 CI/CD 도구를 사용

---

## 과제

### 제출물: "나의 배포 결과"

```markdown
# 나의 배포 결과

## GitHub Pages 포트폴리오
- URL: https://내아이디.github.io/portfolio
- 포함된 프로젝트 수:

## ngrok 테스트 결과
- 생성된 URL:
- 외부 접속 성공 여부:
- 접속자 수:

## 배포 체크리스트
- [ ] requirements.txt 생성
- [ ] .env.example 생성
- [ ] .gitignore 완성
- [ ] README.md 작성
- [ ] 보안 점검 완료
- [ ] 테스트 통과

## 프로젝트 최종 파일 구조
```
memo-app/
  main.py
  database.py
  ...
```

## 배포 과정에서 어려웠던 점
```

---

## 강사 참고 사항
- ngrok은 무료 버전에서 URL이 랜덤으로 바뀌므로 데모용으로만 사용
- 회사 네트워크에서 ngrok이 차단될 수 있으므로 모바일 핫스팟 대안 준비
- GitHub Pages 배포 후 실제 URL로 접속되는 순간이 학생들에게 큰 성취감을 줌
