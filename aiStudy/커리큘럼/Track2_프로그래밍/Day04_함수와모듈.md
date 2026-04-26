# Day 4: 함수, 모듈 — "코드를 정리하고 재사용하자"

## 학습 목표
- 함수 정의와 호출, 매개변수와 반환값 이해
- 코드 리팩토링 — 반복 코드를 함수로 분리
- import로 모듈 가져오기, pip install로 외부 패키지 설치
- Claude Code에게 리팩토링을 요청하는 방법 습득

## 준비물
- Day 1-3에서 설정한 개발 환경
- Day 3에서 만든 게임 파일들

---

## 실습 1: 함수 기초 — 정의, 호출, 반환 (15분)

1. Claude Code에게 요청:
```
Python 함수를 배우기 위한 functions.py를 만들어줘.
다음 함수들을 예제로 포함해줘:
1. 인사하기 함수 (이름을 받아서 인사 메시지 출력)
2. 두 수의 사칙연산 함수 (덧셈, 뺄셈, 곱셈, 나눗셈)
3. 리스트의 평균을 구하는 함수 (return 사용)
4. 기본값 매개변수 예제 (인사 언어 기본값 = "한국어")
5. *args와 **kwargs 간단 예제
각 함수마다 docstring(설명 문자열)을 포함하고,
함수 정의 후 호출하는 코드도 작성해줘.
```

2. Claude Code에게 개념 질문:
```
return과 print의 차이가 뭐야? 함수에서 return을 쓰는 게 왜 중요한지 설명해줘.
```

### 관찰 포인트
- def 키워드로 함수를 정의하는 구조
- return이 있는 함수와 없는 함수의 차이
- 함수를 호출할 때 인자(argument)가 매개변수(parameter)에 전달되는 과정

---

## 실습 2: 리팩토링 — Day 3 게임 코드 개선 (20분)

1. Claude Code에게 요청:
```
Day 3에서 만든 rps_game.py를 함수로 리팩토링해줘.
다음과 같이 분리해줘:
1. get_user_choice() — 사용자 입력 받기
2. get_computer_choice() — 컴퓨터 랜덤 선택
3. determine_winner(user, computer) — 승패 판정, 결과 문자열 반환
4. display_score(wins, losses, draws) — 전적 표시
5. play_game() — 메인 게임 루프
6. main() — 프로그램 시작점

if __name__ == "__main__": 패턴도 적용해줘.
리팩토링 전후 코드 비교를 주석으로 설명해줘.
```

2. Claude Code에게 리팩토링 효과 질문:
```
리팩토링 전과 후의 코드를 비교해줘.
왜 함수로 나누는 게 좋은지 구체적 이유 3가지를 알려줘.
```

### 관찰 포인트
- 하나의 긴 코드가 여러 함수로 분리되면 가독성이 향상됨
- `if __name__ == "__main__":` 패턴의 의미와 필요성
- 함수 단위로 테스트하기 쉬워지는 장점

---

## 실습 3: 모듈과 import — 코드 분리 (15분)

1. Claude Code에게 요청:
```
다음과 같은 모듈 구조를 만들어줘:

utils/
  __init__.py
  math_helper.py  (수학 관련 함수: 평균, 최대, 최소, 표준편차)
  string_helper.py (문자열 관련 함수: 역순, 단어수세기, 대소문자변환)
main.py (utils 모듈에서 함수를 import해서 사용)

import 방법 3가지를 모두 보여줘:
1. import utils.math_helper
2. from utils.math_helper import average
3. from utils import string_helper as sh
```

2. 실행 확인:
```bash
python main.py
```

### 관찰 포인트
- `__init__.py` 파일의 역할
- import 방식에 따른 사용법 차이
- 패키지(폴더) 구조로 코드를 조직화하는 방법

---

## 실습 4: pip install — 외부 패키지 사용 (10분)

1. Claude Code에게 요청:
```
pip으로 외부 패키지를 설치하고 사용하는 예제를 보여줘.
1. pip install requests 실행
2. requests로 간단한 HTTP 요청 보내기 (httpbin.org 사용)
3. pip install rich 실행
4. rich 라이브러리로 터미널에 예쁜 표 출력하기
5. pip freeze로 설치된 패키지 목록 확인
6. requirements.txt 파일 생성
```

2. 직접 실행:
```bash
pip install requests rich
python pip_example.py
pip freeze > requirements.txt
```

### 관찰 포인트
- pip은 Python 패키지 관리자 — npm(Node.js)과 같은 역할
- requirements.txt로 프로젝트 의존성 관리
- 가상환경(venv)의 필요성 간단 언급

---

## 과제

### 제출물: "나만의 유틸리티 모듈"

```markdown
# 나만의 유틸리티 모듈

## 모듈 구조
```
프로젝트폴더/
  my_utils/
    __init__.py
    ???.py
    ???.py
  main.py
```

## 만든 함수 목록
| 함수명 | 파일 | 기능 | 매개변수 | 반환값 |
|--------|------|------|----------|--------|
| | | | | |

## 리팩토링 경험
- 원래 코드 (함수 없이):
- 리팩토링 후 (함수 분리):
- 느낀 점:

## 사용한 외부 패키지
| 패키지명 | 용도 |
|----------|------|
| | |
```

---

## 강사 참고 사항
- 리팩토링은 "코드를 고치는 게 아니라 정리하는 것"이라는 인식 심어주기
- pip install 시 회사 네트워크 방화벽으로 실패할 수 있음 — proxy 설정 방법 준비
- 함수 이름은 동사로 시작하는 것이 관례 (get_, calculate_, display_ 등)
