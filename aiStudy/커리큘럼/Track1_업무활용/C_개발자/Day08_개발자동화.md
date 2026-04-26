# Day 8: 개발 자동화 — "Git 워크플로우, PR 템플릿, CI/CD"

## 학습 목표
- Git/GitHub 워크플로우를 Claude Code로 자동화
- PR 템플릿, 이슈 템플릿 자동 생성
- CI/CD 파이프라인 설계
- Notion으로 프로젝트 관리 + 모바일 접근

---

## 실습 1: PR/이슈 템플릿 자동 생성 (10분)

### PR 템플릿
```
.github/pull_request_template.md를 만들어줘.

포함:
## 변경 사항
-

## 변경 이유
-

## 테스트
- [ ] 유닛 테스트 통과
- [ ] 로컬 실행 확인
- [ ] 관련 문서 업데이트

## 스크린샷 (UI 변경 시)

## 리뷰어에게
- 집중해서 봐야 할 파일:
- 질문/논의 사항:
```

### 이슈 템플릿
```
.github/ISSUE_TEMPLATE/ 폴더에 다음 3개 파일을 만들어줘:
1. bug_report.md — 버그 리포트 (재현 방법, 기대 결과, 실제 결과)
2. feature_request.md — 기능 요청 (배경, 제안, 대안)
3. tech_debt.md — 기술 부채 (현재 상태, 문제점, 개선안)
```

---

## 실습 2: 커밋 메시지 + CHANGELOG 자동화 (10분)

```
최근 10개 커밋을 분석해서:
1. Conventional Commits 규칙을 따르고 있는지 확인
2. 규칙을 안 따르는 커밋의 올바른 메시지를 제안
3. CHANGELOG.md 업데이트 초안을 생성
```

### CLAUDE.md에 규칙 추가
```
CLAUDE.md에 커밋 메시지 규칙을 추가해줘:
- feat: 새 기능
- fix: 버그 수정
- docs: 문서 변경
- refactor: 리팩토링
- test: 테스트 추가/수정
- chore: 빌드/설정 변경
```

---

## 실습 3: GitHub Actions CI 설계 (15분)

```
GitHub Actions CI 파이프라인을 만들어줘.

트리거: push (main, develop), PR

Jobs:
1. lint — ruff 린트 체크
2. test — pytest 실행 (커버리지 포함)
3. build — Docker 이미지 빌드 테스트
4. (main만) deploy — 서버 SSH 배포

파일: .github/workflows/ci.yml

환경 변수는 GitHub Secrets 사용.
```

### 추가 요청
```
테스트 커버리지 80% 미만이면 실패하도록 설정해줘.
PR에 커버리지 리포트 코멘트도 추가해줘.
```

---

## 실습 4: Notion 프로젝트 관리 + 모바일 (10분)

### 개발자용 Notion 구조
```
개발자용 Notion 프로젝트 관리 구조를 설계해줘.

페이지:
1. 스프린트 보드 (To Do / In Progress / Review / Done)
2. 기술 부채 트래커 (우선순위, 영향도, 예상 시간)
3. 아키텍처 결정 기록 (ADR — Architecture Decision Records)
4. 온콜 체크리스트
5. 학습 로그 (읽은 글, 배운 것)

각 페이지의 데이터베이스 속성을 구체적으로.
```

### 모바일 활용
- 출퇴근: 오늘 할 일 확인
- 장애 발생: 온콜 체크리스트 즉시 확인
- 아이디어: 스마트폰으로 빠르게 메모 → PC에서 정리

---

## 과제

### 제출물
1. PR 템플릿 + 이슈 템플릿 (3개)
2. GitHub Actions CI YAML
3. CLAUDE.md (커밋 규칙 포함)
4. (선택) Notion 프로젝트 보드

---

## 강사 참고 사항
- PR 템플릿은 "팀 전체 코드 리뷰 품질 향상"으로 연결
- CI/CD는 실제로 GitHub에 push해서 동작 확인하면 효과적
- Notion ADR은 시니어 개발자에게 특히 유용
- "Claude Code가 GitHub Actions YAML을 만들어준다"는 점이 큰 어필
