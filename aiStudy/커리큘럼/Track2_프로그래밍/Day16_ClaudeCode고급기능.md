# Day 16: Claude Code 고급 기능 — "프로 개발자처럼 Claude Code를 쓰자"

## 학습 목표
- /compact 명령으로 긴 대화를 효율적으로 관리
- CLAUDE.md 파일로 프로젝트 컨텍스트 최적화
- hooks 기능으로 자동화 워크플로우 구성
- 멀티 파일 수정 요청 패턴 습득

## 준비물
- Day 1-15에서 설정한 개발 환경
- 지금까지 만든 메모 앱 프로젝트

---

## 실습 1: CLAUDE.md — 프로젝트 문맥 설정 (20분)

1. Claude Code에게 요청:
```
우리 메모 앱 프로젝트에 최적화된 CLAUDE.md 파일을 만들어줘.
다음 내용을 포함해줘:
1. 프로젝트 개요 (메모 앱, FastAPI + SQLite + HTML/JS)
2. 기술 스택과 버전
3. 프로젝트 구조 (파일별 역할)
4. 실행 방법 (uvicorn 명령)
5. 코딩 컨벤션:
   - Python: PEP 8, 한글 주석
   - 함수명: snake_case
   - 클래스명: PascalCase
6. 주의사항:
   - .env 파일은 절대 커밋하지 않음
   - SQLite DB 파일은 gitignore 대상
   - 에러 처리에 logging 사용
7. 테스트 실행 방법 (pytest)
```

2. CLAUDE.md의 효과 확인:
```
CLAUDE.md를 만든 후에, "새로운 API 엔드포인트를 추가해줘"라고 요청해봐.
프로젝트 구조와 코딩 스타일을 이해하고 있는지 확인하자.
```

3. Claude Code에게 질문:
```
CLAUDE.md 파일이 있을 때와 없을 때 Claude Code의 응답이 어떻게 달라져?
좋은 CLAUDE.md를 작성하는 팁을 알려줘.
```

### 관찰 포인트
- CLAUDE.md가 있으면 매번 프로젝트를 설명하지 않아도 됨
- 코딩 컨벤션을 명시하면 일관된 스타일의 코드가 생성됨
- 프로젝트가 커질수록 CLAUDE.md의 가치가 높아짐

---

## 실습 2: /compact — 대화 관리 (10분)

1. Claude Code에서 직접 실습:
```
/compact
```

2. Claude Code에게 요청:
```
/compact 명령의 역할을 설명해줘.
1. 긴 대화가 쌓이면 어떤 문제가 생기는지
2. /compact가 어떤 식으로 대화를 정리하는지
3. 언제 /compact를 사용하면 좋은지
4. /compact 후에도 유지되는 정보와 사라지는 정보
```

3. 실전 활용:
```
지금까지 대화에서 핵심 내용만 요약해서 /compact를 실행해줘.
```

### 관찰 포인트
- 대화가 길어지면 Claude Code의 응답 품질이 떨어질 수 있음
- /compact로 컨텍스트를 정리하면 효율적인 대화 유지 가능
- CLAUDE.md에 있는 정보는 /compact와 무관하게 항상 참조됨

---

## 실습 3: 멀티 파일 수정 패턴 (20분)

1. Claude Code에게 요청:
```
메모 앱에 "카테고리" 기능을 추가해줘.
다음 파일들을 한번에 수정해야 해:

1. database.py — categories 테이블 추가, 관련 CRUD 함수
2. main.py — 카테고리 API 엔드포인트 추가 (GET/POST/DELETE /api/categories)
3. main.py — 메모 생성 시 카테고리 연결
4. static/index.html — 카테고리 필터 UI 추가
5. static/app.js — 카테고리 관련 API 호출 함수
6. static/style.css — 카테고리 태그 스타일

모든 파일을 일관성 있게 수정해줘.
각 파일에서 변경된 부분을 정리해줘.
```

2. 변경 사항 확인:
```bash
git diff
```

3. Claude Code에게 검증 요청:
```
방금 수정한 카테고리 기능이 제대로 동작하는지 확인해줘.
필요하면 테스트 코드도 추가해줘.
```

### 관찰 포인트
- Claude Code가 여러 파일을 동시에 일관성 있게 수정하는 능력
- 새 기능 추가 시 수정해야 할 파일 목록을 미리 파악하는 것이 중요
- git diff로 변경 사항을 확인하는 습관

---

## 실습 4: hooks — 자동화 워크플로우 (20분)

1. Claude Code에게 요청:
```
Claude Code의 hooks 기능을 설명하고 실용적인 예제를 만들어줘.

.claude/settings.json에 hooks를 설정해줘:
1. PreToolUse hook: 파일 수정 전에 자동으로 git 상태 확인
2. PostToolUse hook: 파일 수정 후 자동으로 린터(flake8) 실행
3. Notification hook: 긴 작업 완료 시 알림

각 hook이 언제 트리거되는지, 어떤 용도로 쓸 수 있는지 설명해줘.
```

2. hooks 동작 확인:
```
아무 파일이나 수정해봐. hook이 자동으로 실행되는지 확인하자.
```

3. 실용적 hook 추가:
```
커밋 전에 자동으로 pytest를 실행하는 pre-commit hook을 설정해줘.
테스트가 실패하면 커밋을 막도록.
```

### 관찰 포인트
- hooks로 반복적인 확인 작업을 자동화할 수 있음
- 코드 품질을 자동으로 관리하는 CI/CD의 기초 개념
- pre-commit hook으로 버그가 있는 코드의 커밋을 방지

---

## 과제

### 제출물: "Claude Code 고급 기능 활용 보고서"

```markdown
# Claude Code 고급 기능 활용 보고서

## CLAUDE.md 작성
- 포함한 항목:
- 효과 (CLAUDE.md 유무 비교):

## /compact 활용
- 사용 전 대화 길이:
- 사용 후 변화:
- 적절한 사용 시점:

## 멀티 파일 수정 경험
- 추가한 기능:
- 수정한 파일 목록:
| 파일 | 변경 내용 |
|------|----------|
| | |

## hooks 설정
| hook 종류 | 트리거 시점 | 실행 내용 |
|----------|-----------|----------|
| | | |

## Claude Code 사용 팁 (나만의 노하우)
1.
2.
3.
```

---

## 강사 참고 사항
- CLAUDE.md는 "Claude Code에게 주는 매뉴얼"이라고 설명하면 이해가 쉬움
- hooks 기능은 고급이므로 이해 못하는 학생은 CLAUDE.md와 /compact에 집중
- 이 Day는 도구 활용법이므로 코딩보다 "효율적인 작업 방법"에 초점
