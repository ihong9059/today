# Day 12: Claude API 직접 호출 — "AI를 내 프로그램에 넣자"

## 학습 목표
- Anthropic Python SDK 설치 및 API 키 설정
- .env 파일로 환경 변수 관리하는 방법 이해
- Claude API를 직접 호출하여 AI 기능을 프로그램에 통합
- 자동 번역기 프로그램 제작

## 준비물
- Day 1-11에서 설정한 개발 환경
- Anthropic API 키 (console.anthropic.com에서 발급)
- python-dotenv 패키지

---

## 실습 1: API 키 설정 + 첫 호출 (15분)

1. 패키지 설치:
```bash
pip install anthropic python-dotenv
```

2. Claude Code에게 요청:
```
Claude API를 호출하는 기본 예제를 만들어줘.

1. .env 파일 생성 (ANTHROPIC_API_KEY=sk-ant-...)
2. .gitignore에 .env 추가 (보안)
3. first_api.py 작성:
   - dotenv로 API 키 로드
   - anthropic.Anthropic() 클라이언트 생성
   - messages.create()로 간단한 질문 전송
   - 응답에서 텍스트 추출하여 출력
4. 에러 처리: API 키 없을 때, 네트워크 에러, 토큰 초과 등

.env 파일에 실제 키를 넣는 방법과 절대 Git에 올리면 안 되는 이유를 주석으로 설명해줘.
```

3. API 키 설정 후 실행:
```bash
# .env 파일에 API 키 입력 후
python first_api.py
```

### 관찰 포인트
- .env 파일로 민감한 정보를 코드와 분리하는 패턴
- API 호출의 기본 구조: 클라이언트 생성 → 메시지 전송 → 응답 수신
- API 키가 유출되면 요금이 청구될 수 있다는 보안 이슈

---

## 실습 2: Claude API 옵션 탐색 (15분)

1. Claude Code에게 요청:
```
Claude API의 다양한 옵션을 실험하는 api_options.py를 만들어줘.
1. model 파라미터: claude-sonnet-4-20250514 vs claude-haiku-35-20241022 비교
2. max_tokens 설정: 100 vs 1000 결과 차이
3. temperature 설정: 0 (정확) vs 1 (창의적) 비교
4. system 프롬프트 설정: 역할 부여
5. 대화 이력(messages 배열)으로 멀티턴 대화

같은 질문에 대해 모델, temperature를 바꿔가며 결과를 비교하고 출력해줘.
비용(토큰 수)도 함께 표시해줘.
```

2. 실행 후 결과 비교:
```bash
python api_options.py
```

### 관찰 포인트
- 모델에 따라 속도, 품질, 비용이 다름
- temperature가 0이면 같은 질문에 같은 답 (결정적), 높으면 다양한 답
- system 프롬프트로 AI의 역할과 톤을 제어하는 방법

---

## 실습 3: 자동 번역기 만들기 (25분)

1. Claude Code에게 요청:
```
Claude API를 활용한 자동 번역기 translator.py를 만들어줘.

기능:
1. 입력 텍스트의 언어를 자동 감지
2. 한국어 ↔ 영어 ↔ 일본어 ↔ 중국어 번역
3. 번역 스타일 선택: 일상회화 / 비즈니스 / 학술
4. 번역 결과와 함께 발음 가이드 제공
5. 파일 입력 지원: 텍스트 파일을 통째로 번역
6. 번역 결과를 파일로 저장

CLI 인터페이스로 만들어줘:
- 대화형 모드: 계속 번역 요청 가능
- 파일 모드: python translator.py input.txt 으로 파일 번역

system 프롬프트를 활용해서 번역 품질을 높여줘.
```

2. 번역기 테스트:
```bash
python translator.py
# "오늘 회의에서 논의할 사항을 정리했습니다" 입력
```

3. 기능 추가 요청:
```
번역기에 다음 기능을 추가해줘:
1. 번역 기록 저장 (history.json)
2. 이전 번역 기록 조회
3. 용어집(glossary) 기능: 특정 단어는 항상 지정된 번역 사용
```

### 관찰 포인트
- system 프롬프트에 번역 규칙을 상세히 지정하면 품질이 향상됨
- API 호출마다 비용이 발생하므로 불필요한 호출을 줄이는 것이 중요
- 용어집 기능으로 도메인별 전문 번역이 가능

---

## 실습 4: 웹 기반 번역기 (15분)

1. Claude Code에게 요청:
```
translator.py를 FastAPI 웹 앱으로 변환해줘.
1. POST /api/translate — 번역 API
2. GET / — 웹 번역기 UI (HTML)
3. 프론트엔드: 입력 텍스트, 언어 선택, 스타일 선택, 번역 버튼
4. 번역 결과를 실시간으로 표시
5. 번역 기록을 아래에 목록으로 표시

Day 10에서 배운 패턴으로 구현해줘.
```

2. 웹 번역기 테스트:
```bash
uvicorn translator_web:app --reload
# 브라우저에서 http://localhost:8000 접속
```

### 관찰 포인트
- CLI 프로그램을 웹 앱으로 전환하는 과정이 Day 9-10의 복습
- API를 래핑하여 새로운 서비스를 만드는 패턴

---

## 과제

### 제출물: "나만의 AI 도구"

```markdown
# 나만의 AI 도구

## 프로그램 정보
- 파일명:
- 기능: (번역기 / 요약기 / 질문 답변기 / 기타)
- 사용한 모델:

## API 설정
- [ ] .env 파일로 API 키 관리
- [ ] .gitignore에 .env 포함
- [ ] 에러 처리 구현

## system 프롬프트
```
(사용한 system 프롬프트 내용)
```

## 실행 결과 (입력 → 출력 예시)

## API 사용량
- 총 호출 수:
- 대략적 토큰 사용량:

## 개선하고 싶은 점
```

---

## 강사 참고 사항
- API 키 보안을 매우 강조 — .env 파일이 GitHub에 올라가면 키가 노출됨
- 강의용 API 키를 사전에 준비하거나, 학생별 무료 크레딧 안내
- 번역 품질은 system 프롬프트에 크게 좌우되므로 프롬프트 엔지니어링 복습 기회
