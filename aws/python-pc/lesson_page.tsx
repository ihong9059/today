'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Copy, Check, Clock, Code, Lightbulb, ExternalLink } from 'lucide-react';

// 90일 프롬프트 데이터
const prompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  1: {
    title: 'Hello World & 자기소개',
    app: '자기소개 프로그램',
    files: ['main.py', 'greeting.py', 'utils.py', 'README.md'],
    prompt: `[Day 1] Python 초급 - Hello World & 자기소개

Python으로 자기소개 프로그램을 만들어주세요.

프로젝트 구조:
day01_self_intro/
├── main.py              # 메인 실행 파일
├── greeting.py          # 인사 관련 함수 모듈
├── utils.py             # 유틸리티 함수 (꾸미기 등)
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 사용자에게 이름, 나이, 취미를 입력받습니다
2. 입력받은 정보를 예쁜 박스 형태로 출력합니다
3. 환영 메시지를 여러 언어로 출력합니다 (한국어, 영어, 일본어)
4. 각 파일에는 한글 주석을 포함해주세요

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: greeting.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: utils.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  2: {
    title: '변수와 자료형',
    app: '단위 변환 계산기',
    files: ['main.py', 'converter.py', 'constants.py', 'README.md'],
    prompt: `[Day 2] Python 초급 - 변수와 자료형

단위 변환 계산기를 만들어주세요.

프로젝트 구조:
day02_unit_converter/
├── main.py              # 메인 실행 파일
├── converter.py         # 변환 함수 모듈
├── constants.py         # 변환 상수 정의
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 길이 변환: cm ↔ inch, m ↔ feet
2. 무게 변환: kg ↔ pound
3. 온도 변환: 섭씨 ↔ 화씨
4. int, float, str 자료형을 활용
5. 형변환(int(), float(), str())을 사용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: converter.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: constants.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  3: {
    title: '연산자와 표현식',
    app: '쇼핑 할인 계산기',
    files: ['main.py', 'discount.py', 'README.md'],
    prompt: `[Day 3] Python 초급 - 연산자와 표현식

쇼핑 할인 계산기를 만들어주세요.

프로젝트 구조:
day03_discount_calc/
├── main.py              # 메인 실행 파일
├── discount.py          # 할인 계산 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 상품 가격과 수량을 입력받습니다
2. 할인율을 적용합니다 (10%, 20%, 30% 중 선택)
3. 총액이 5만원 이상이면 추가 5% 할인
4. 산술/비교/논리 연산자를 모두 활용
5. 최종 결제 금액과 절약 금액을 표시

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: discount.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  4: {
    title: '조건문 (if-elif-else)',
    app: '성적 등급 판정기',
    files: ['main.py', 'grade.py', 'README.md'],
    prompt: `[Day 4] Python 초급 - 조건문

성적 등급 판정기를 만들어주세요.

프로젝트 구조:
day04_grade_checker/
├── main.py              # 메인 실행 파일
├── grade.py             # 등급 판정 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 국어, 영어, 수학 점수를 입력받습니다
2. 평균을 계산합니다
3. 평균에 따라 등급 부여 (A: 90+, B: 80+, C: 70+, D: 60+, F: 60미만)
4. 각 과목별로 최고점, 최저점 표시
5. if-elif-else와 중첩 조건문 활용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: grade.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  5: {
    title: '반복문 (for)',
    app: '구구단 출력기',
    files: ['main.py', 'multiplication.py', 'README.md'],
    prompt: `[Day 5] Python 초급 - for 반복문

구구단 출력기를 만들어주세요.

프로젝트 구조:
day05_multiplication/
├── main.py              # 메인 실행 파일
├── multiplication.py    # 구구단 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 원하는 단을 입력받습니다
2. 해당 단의 구구단을 예쁘게 출력합니다
3. 전체 구구단(2-9단) 출력 옵션
4. for 루프와 range() 함수 활용
5. 리스트 순회도 사용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: multiplication.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  6: {
    title: '반복문 (while)',
    app: '숫자 맞추기 게임',
    files: ['main.py', 'game.py', 'README.md'],
    prompt: `[Day 6] Python 초급 - while 반복문

숫자 맞추기 게임을 만들어주세요.

프로젝트 구조:
day06_number_game/
├── main.py              # 메인 실행 파일
├── game.py              # 게임 로직
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 1-100 사이의 랜덤 숫자 생성
2. 사용자가 숫자를 맞출 때까지 반복
3. 힌트 제공 (더 크다/작다)
4. 시도 횟수 표시
5. while 루프와 break/continue 활용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: game.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  7: {
    title: '리스트와 튜플',
    app: '학생 성적 관리',
    files: ['main.py', 'student.py', 'README.md'],
    prompt: `[Day 7] Python 초급 - 리스트와 튜플

학생 성적 관리 프로그램을 만들어주세요.

프로젝트 구조:
day07_student_grades/
├── main.py              # 메인 실행 파일
├── student.py           # 학생 관리 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 학생 이름과 성적을 리스트로 관리
2. 학생 추가, 삭제, 조회 기능
3. 평균, 최고점, 최저점 계산
4. 리스트 인덱싱, 슬라이싱 활용
5. 튜플로 학생 정보 (이름, 점수) 저장

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: student.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  8: {
    title: '딕셔너리',
    app: '영한 사전',
    files: ['main.py', 'dictionary.py', 'README.md'],
    prompt: `[Day 8] Python 초급 - 딕셔너리

영한 사전 프로그램을 만들어주세요.

프로젝트 구조:
day08_dictionary/
├── main.py              # 메인 실행 파일
├── dictionary.py        # 사전 관리 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 영어 단어와 한글 뜻을 딕셔너리로 관리
2. 단어 검색, 추가, 삭제 기능
3. 전체 단어 목록 출력
4. 딕셔너리 메서드 활용 (keys, values, items)
5. 단어가 없을 때 처리

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: dictionary.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  9: {
    title: '집합 (Set)',
    app: '로또 번호 생성기',
    files: ['main.py', 'lotto.py', 'README.md'],
    prompt: `[Day 9] Python 초급 - 집합 (Set)

로또 번호 생성기를 만들어주세요.

프로젝트 구조:
day09_lotto/
├── main.py              # 메인 실행 파일
├── lotto.py             # 로또 로직
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 1-45 중 중복 없는 6개 번호 생성
2. 보너스 번호 1개 추가
3. 여러 세트 생성 기능
4. Set를 활용한 중복 제거
5. 집합 연산 (교집합, 합집합) 활용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: lotto.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  10: {
    title: '문자열 처리',
    app: '텍스트 분석기',
    files: ['main.py', 'analyzer.py', 'README.md'],
    prompt: `[Day 10] Python 초급 - 문자열 처리

텍스트 분석기를 만들어주세요.

프로젝트 구조:
day10_text_analyzer/
├── main.py              # 메인 실행 파일
├── analyzer.py          # 분석 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 텍스트를 입력받습니다
2. 글자 수, 단어 수, 문장 수 계산
3. 가장 많이 사용된 단어 Top 5
4. 문자열 메서드 활용 (split, strip, lower 등)
5. f-string 포맷팅 사용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: analyzer.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  11: {
    title: '함수 기초',
    app: '계산기 (함수형)',
    files: ['main.py', 'calculator.py', 'README.md'],
    prompt: `[Day 11] Python 초급 - 함수 기초

함수형 계산기를 만들어주세요.

프로젝트 구조:
day11_calculator/
├── main.py              # 메인 실행 파일
├── calculator.py        # 계산 함수들
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 사칙연산 함수 (add, subtract, multiply, divide)
2. 함수 정의, 매개변수, 반환값 활용
3. 기본값 매개변수 사용
4. 여러 값 반환 (튜플)
5. 계산 이력 저장

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: calculator.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  12: {
    title: '함수 심화',
    app: '통계 계산기',
    files: ['main.py', 'stats.py', 'README.md'],
    prompt: `[Day 12] Python 초급 - 함수 심화

통계 계산기를 만들어주세요.

프로젝트 구조:
day12_statistics/
├── main.py              # 메인 실행 파일
├── stats.py             # 통계 함수들
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 평균, 중앙값, 최빈값 계산
2. 표준편차, 분산 계산
3. *args를 활용한 가변 인자
4. **kwargs를 활용한 키워드 인자
5. 람다 함수 활용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: stats.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  13: {
    title: '모듈과 패키지',
    app: '날짜/시간 유틸리티',
    files: ['main.py', 'date_utils.py', 'time_utils.py', 'README.md'],
    prompt: `[Day 13] Python 초급 - 모듈과 패키지

날짜/시간 유틸리티를 만들어주세요.

프로젝트 구조:
day13_datetime_utils/
├── main.py              # 메인 실행 파일
├── date_utils.py        # 날짜 관련 함수
├── time_utils.py        # 시간 관련 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 현재 날짜/시간 표시
2. 두 날짜 사이의 일수 계산
3. D-Day 계산기
4. datetime, random 모듈 활용
5. 사용자 정의 모듈 import

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: date_utils.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: time_utils.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  14: {
    title: '파일 입출력',
    app: '메모장 프로그램',
    files: ['main.py', 'file_handler.py', 'README.md'],
    prompt: `[Day 14] Python 초급 - 파일 입출력

메모장 프로그램을 만들어주세요.

프로젝트 구조:
day14_notepad/
├── main.py              # 메인 실행 파일
├── file_handler.py      # 파일 처리 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 새 메모 작성 및 저장
2. 기존 메모 불러오기
3. 메모 목록 보기
4. with문을 활용한 파일 처리
5. 읽기/쓰기 모드 활용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: file_handler.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  },
  15: {
    title: '초급 종합 프로젝트',
    app: '가계부 프로그램',
    files: ['main.py', 'account.py', 'file_manager.py', 'utils.py', 'README.md'],
    prompt: `[Day 15] Python 초급 - 종합 프로젝트

가계부 프로그램을 만들어주세요.

프로젝트 구조:
day15_account_book/
├── main.py              # 메인 실행 파일
├── account.py           # 수입/지출 관리
├── file_manager.py      # 데이터 저장/로드
├── utils.py             # 유틸리티 함수
└── README.md            # 실행 방법 설명

기능 요구사항:
1. 수입/지출 내역 추가
2. 카테고리별 분류 (식비, 교통, 문화 등)
3. 월별/카테고리별 통계
4. 데이터 파일 저장/불러오기
5. 초급에서 배운 모든 개념 활용

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: account.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: file_manager.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: utils.py =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(실행 방법)
===== 파일 끝 =====`
  }
};

// Day 16-45 (중급)
const intermediatePrompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  16: { title: 'Flask 설치와 Hello World', app: '첫 웹서버', files: ['app.py', 'README.md'], prompt: `[Day 16] Python 중급 - Flask 기초\n\nFlask로 첫 웹서버를 만들어주세요.\n\n프로젝트 구조:\nday16_flask_hello/\n├── app.py               # Flask 앱\n└── README.md\n\n기능: Flask 설치, 라우팅, 여러 페이지\n\n===== 파일: app.py =====\n(코드)\n===== 파일 끝 =====` },
  17: { title: 'HTML 템플릿 렌더링', app: '프로필 페이지', files: ['app.py', 'templates/index.html', 'templates/profile.html', 'README.md'], prompt: `[Day 17] Python 중급 - HTML 템플릿\n\n프로필 페이지를 만들어주세요.\n\n프로젝트 구조:\nday17_profile/\n├── app.py\n├── templates/\n│   ├── index.html\n│   └── profile.html\n└── README.md\n\n기능: render_template, Jinja2 변수 전달\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  18: { title: 'Jinja2 템플릿 문법', app: '상품 목록 페이지', files: ['app.py', 'templates/products.html', 'README.md'], prompt: `[Day 18] Python 중급 - Jinja2\n\n상품 목록 페이지를 만들어주세요.\n\n기능: Jinja2 반복문, 조건문, 필터\n상품 리스트를 동적으로 렌더링\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  19: { title: 'CSS 스타일링', app: '포트폴리오 페이지', files: ['app.py', 'templates/index.html', 'static/style.css', 'README.md'], prompt: `[Day 19] Python 중급 - CSS 연동\n\n포트폴리오 페이지를 만들어주세요.\n\n프로젝트 구조:\nday19_portfolio/\n├── app.py\n├── templates/index.html\n├── static/style.css\n└── README.md\n\n기능: static 폴더, CSS 스타일링\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  20: { title: 'JavaScript 연동', app: '동적 카운터', files: ['app.py', 'templates/index.html', 'static/script.js', 'README.md'], prompt: `[Day 20] Python 중급 - JavaScript\n\n동적 카운터를 만들어주세요.\n\n기능: JS 기초, DOM 조작, 이벤트\n버튼 클릭으로 숫자 증감\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  21: { title: 'Form 데이터 처리', app: '회원가입 폼', files: ['app.py', 'templates/register.html', 'templates/success.html', 'README.md'], prompt: `[Day 21] Python 중급 - Form 처리\n\n회원가입 폼을 만들어주세요.\n\n기능: GET/POST 처리, 폼 검증\n이름, 이메일, 비밀번호 입력\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  22: { title: '세션과 쿠키', app: '로그인 시스템', files: ['app.py', 'templates/login.html', 'templates/dashboard.html', 'README.md'], prompt: `[Day 22] Python 중급 - 세션/쿠키\n\n로그인 시스템을 만들어주세요.\n\n기능: session, 로그인 상태 유지\n로그인/로그아웃 기능\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  23: { title: 'JSON 데이터 처리', app: 'JSON 설정 관리자', files: ['app.py', 'config.json', 'README.md'], prompt: `[Day 23] Python 중급 - JSON\n\nJSON 설정 관리자를 만들어주세요.\n\n기능: json 모듈, 파일 저장/로드\n설정 읽기/수정/저장\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  24: { title: 'requests 라이브러리', app: '날씨 정보 조회', files: ['app.py', 'weather.py', 'README.md'], prompt: `[Day 24] Python 중급 - requests\n\n날씨 정보 조회 프로그램을 만들어주세요.\n\n기능: HTTP 요청, API 호출\n(무료 날씨 API 활용)\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  25: { title: 'REST API 호출', app: '뉴스 헤드라인 수집기', files: ['app.py', 'news_api.py', 'README.md'], prompt: `[Day 25] Python 중급 - REST API\n\n뉴스 헤드라인 수집기를 만들어주세요.\n\n기능: GET/POST 요청, 헤더 설정\n뉴스 API 연동\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  26: { title: 'Flask REST API 만들기', app: '할일 목록 API', files: ['app.py', 'README.md'], prompt: `[Day 26] Python 중급 - REST API 구축\n\n할일 목록 REST API를 만들어주세요.\n\n기능: CRUD API 엔드포인트\nGET, POST, PUT, DELETE\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  27: { title: 'AJAX와 Fetch API', app: '실시간 검색 자동완성', files: ['app.py', 'templates/search.html', 'static/search.js', 'README.md'], prompt: `[Day 27] Python 중급 - AJAX/Fetch\n\n검색 자동완성을 만들어주세요.\n\n기능: 비동기 요청, JSON 응답\n실시간 검색어 추천\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  28: { title: '외부 API 통합', app: '환율 계산기', files: ['app.py', 'templates/exchange.html', 'README.md'], prompt: `[Day 28] Python 중급 - 외부 API\n\n환율 계산기를 만들어주세요.\n\n기능: API 키 관리, 에러 처리\n실시간 환율 조회\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  29: { title: '에러 핸들링과 로깅', app: 'API 모니터링 대시보드', files: ['app.py', 'logger.py', 'templates/dashboard.html', 'README.md'], prompt: `[Day 29] Python 중급 - 에러/로깅\n\nAPI 모니터링 대시보드를 만들어주세요.\n\n기능: try-except, logging 모듈\n에러 기록 및 표시\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  30: { title: '파일 업로드', app: '이미지 갤러리', files: ['app.py', 'templates/gallery.html', 'README.md'], prompt: `[Day 30] Python 중급 - 파일 업로드\n\n이미지 갤러리를 만들어주세요.\n\n기능: 멀티파트 폼, 파일 저장\n이미지 업로드 및 표시\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  31: { title: 'Flask-WTF 폼 검증', app: '설문조사 폼', files: ['app.py', 'forms.py', 'templates/survey.html', 'README.md'], prompt: `[Day 31] Python 중급 - WTForms\n\n설문조사 폼을 만들어주세요.\n\n기능: WTForms, CSRF 보호\n폼 검증 및 에러 메시지\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  32: { title: '블루프린트 (모듈화)', app: '미니 블로그', files: ['app.py', 'blueprints/auth.py', 'blueprints/posts.py', 'README.md'], prompt: `[Day 32] Python 중급 - Blueprint\n\n미니 블로그를 만들어주세요.\n\n기능: 앱 구조화, 블루프린트\nauth, posts 분리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  33: { title: '정적 파일 관리', app: '랜딩 페이지', files: ['app.py', 'templates/landing.html', 'static/css/style.css', 'static/js/main.js', 'README.md'], prompt: `[Day 33] Python 중급 - 정적 파일\n\n랜딩 페이지를 만들어주세요.\n\n기능: 이미지, 폰트, CDN 연동\n완성도 높은 UI\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  34: { title: 'JavaScript DOM 심화', app: '칸반보드', files: ['app.py', 'templates/kanban.html', 'static/kanban.js', 'static/kanban.css', 'README.md'], prompt: `[Day 34] Python 중급 - DOM 심화\n\n칸반보드를 만들어주세요.\n\n기능: 드래그앤드롭, DOM 조작\n할일 카드 이동\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  35: { title: 'JavaScript 이벤트', app: '인터랙티브 퀴즈', files: ['app.py', 'templates/quiz.html', 'static/quiz.js', 'README.md'], prompt: `[Day 35] Python 중급 - JS 이벤트\n\n인터랙티브 퀴즈를 만들어주세요.\n\n기능: 이벤트 리스너, 타이머\n점수 계산, 시간 제한\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  36: { title: 'Chart.js 연동', app: '데이터 시각화 대시보드', files: ['app.py', 'templates/charts.html', 'static/charts.js', 'README.md'], prompt: `[Day 36] Python 중급 - Chart.js\n\n데이터 시각화 대시보드를 만들어주세요.\n\n기능: 차트 그리기, 데이터 바인딩\n막대, 원형, 선 그래프\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  37: { title: 'Bootstrap 통합', app: '반응형 관리자 페이지', files: ['app.py', 'templates/admin.html', 'README.md'], prompt: `[Day 37] Python 중급 - Bootstrap\n\n관리자 페이지를 만들어주세요.\n\n기능: 반응형 UI, Bootstrap 컴포넌트\n테이블, 카드, 네비게이션\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  38: { title: '이메일 발송', app: '문의하기 폼', files: ['app.py', 'email_sender.py', 'templates/contact.html', 'README.md'], prompt: `[Day 38] Python 중급 - 이메일\n\n문의하기 폼을 만들어주세요.\n\n기능: smtplib, Flask-Mail\n이메일 전송 기능\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  39: { title: '스케줄링 (APScheduler)', app: '자동 리포트 생성기', files: ['app.py', 'scheduler.py', 'README.md'], prompt: `[Day 39] Python 중급 - 스케줄링\n\n자동 리포트 생성기를 만들어주세요.\n\n기능: APScheduler, 주기적 작업\n정해진 시간에 리포트 생성\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  40: { title: '크롤링 (BeautifulSoup)', app: '웹 스크래퍼', files: ['app.py', 'scraper.py', 'README.md'], prompt: `[Day 40] Python 중급 - BeautifulSoup\n\n웹 스크래퍼를 만들어주세요.\n\n기능: HTML 파싱, 데이터 추출\n뉴스/상품 정보 수집\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  41: { title: '크롤링 (Selenium)', app: '동적 페이지 크롤러', files: ['app.py', 'selenium_crawler.py', 'README.md'], prompt: `[Day 41] Python 중급 - Selenium\n\n동적 페이지 크롤러를 만들어주세요.\n\n기능: 동적 페이지, 브라우저 자동화\nJavaScript 렌더링 페이지 크롤링\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  42: { title: '배포 준비 (Gunicorn)', app: '프로덕션 설정', files: ['app.py', 'wsgi.py', 'config.py', 'README.md'], prompt: `[Day 42] Python 중급 - Gunicorn\n\n프로덕션 설정을 만들어주세요.\n\n기능: WSGI, Gunicorn 설정\n프로덕션 환경 구성\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  43: { title: 'Docker 기초', app: 'Flask 앱 컨테이너화', files: ['app.py', 'Dockerfile', 'docker-compose.yml', 'requirements.txt', 'README.md'], prompt: `[Day 43] Python 중급 - Docker\n\nFlask 앱을 컨테이너화해주세요.\n\n기능: Dockerfile, docker-compose\nDocker 이미지 빌드 및 실행\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  44: { title: '테스트 (pytest)', app: 'API 테스트', files: ['app.py', 'tests/test_api.py', 'conftest.py', 'README.md'], prompt: `[Day 44] Python 중급 - pytest\n\nAPI 테스트를 작성해주세요.\n\n기능: 단위 테스트, 픽스처\nAPI 엔드포인트 테스트\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  45: { title: '중급 종합 프로젝트', app: '북마크 관리 서비스', files: ['app.py', 'models.py', 'routes/auth.py', 'routes/bookmarks.py', 'templates/base.html', 'templates/bookmarks.html', 'static/style.css', 'README.md'], prompt: `[Day 45] Python 중급 - 종합 프로젝트\n\n북마크 관리 서비스를 만들어주세요.\n\n기능:\n- 사용자 인증\n- 북마크 CRUD\n- 카테고리/태그 분류\n- 검색 기능\n- 반응형 UI\n\n모든 중급 개념 활용\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` }
};

// Day 46-90 (고급) - 간략화
const advancedPrompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  46: { title: 'SQLite 소개', app: '주소록 데이터베이스', files: ['app.py', 'database.py', 'README.md'], prompt: `[Day 46] Python 고급 - SQLite\n\n주소록 데이터베이스를 만들어주세요.\n\n기능: SQLite 연결, 테이블 생성\n연락처 CRUD\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  47: { title: 'SQL 기초', app: '도서 관리 시스템', files: ['app.py', 'models.py', 'README.md'], prompt: `[Day 47] Python 고급 - SQL 기초\n\n도서 관리 시스템을 만들어주세요.\n\n기능: SELECT, INSERT, UPDATE, DELETE\n도서 CRUD 기능\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  48: { title: 'SQL 심화 (JOIN)', app: '주문 관리 시스템', files: ['app.py', 'models.py', 'README.md'], prompt: `[Day 48] Python 고급 - SQL JOIN\n\n주문 관리 시스템을 만들어주세요.\n\n기능: JOIN 쿼리, 관계형 데이터\n고객-주문-상품 연결\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  49: { title: 'Flask-SQLAlchemy ORM', app: '블로그 시스템', files: ['app.py', 'models.py', 'README.md'], prompt: `[Day 49] Python 고급 - SQLAlchemy\n\n블로그 시스템을 만들어주세요.\n\n기능: ORM 기초, 모델 정의\n게시글 CRUD\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  50: { title: '관계형 모델링 (1:N)', app: '게시판 (글+댓글)', files: ['app.py', 'models.py', 'README.md'], prompt: `[Day 50] Python 고급 - 1:N 관계\n\n게시판을 만들어주세요.\n\n기능: 외래키, 1:N 관계\n글-댓글 연결\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  51: { title: '관계형 모델링 (N:M)', app: '태그 시스템', files: ['app.py', 'models.py', 'README.md'], prompt: `[Day 51] Python 고급 - N:M 관계\n\n태그 시스템을 만들어주세요.\n\n기능: 다대다 관계, 중간 테이블\n글-태그 연결\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  52: { title: '마이그레이션', app: '스키마 버전 관리', files: ['app.py', 'migrations/versions/init.py', 'README.md'], prompt: `[Day 52] Python 고급 - 마이그레이션\n\n스키마 버전 관리를 구현해주세요.\n\n기능: Flask-Migrate, Alembic\n스키마 변경 관리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  53: { title: 'MySQL 연동', app: 'MySQL 전환', files: ['app.py', 'config.py', 'README.md'], prompt: `[Day 53] Python 고급 - MySQL\n\nMySQL 연동을 구현해주세요.\n\n기능: MySQL 설치, 연결 설정\nSQLite에서 MySQL로 전환\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  54: { title: '트랜잭션', app: '포인트 시스템', files: ['app.py', 'models.py', 'README.md'], prompt: `[Day 54] Python 고급 - 트랜잭션\n\n포인트 시스템을 만들어주세요.\n\n기능: ACID, 롤백\n안전한 포인트 이체\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  55: { title: '인덱스와 최적화', app: '대용량 데이터 처리', files: ['app.py', 'README.md'], prompt: `[Day 55] Python 고급 - DB 최적화\n\n대용량 데이터 처리를 구현해주세요.\n\n기능: 인덱스, 실행계획\n쿼리 최적화\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  56: { title: 'Redis 캐싱', app: '캐시 레이어', files: ['app.py', 'cache.py', 'README.md'], prompt: `[Day 56] Python 고급 - Redis\n\n캐시 레이어를 추가해주세요.\n\n기능: Redis 연동, 캐시 전략\n응답 속도 개선\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  57: { title: '비밀번호 해싱', app: '안전한 회원가입', files: ['app.py', 'auth.py', 'README.md'], prompt: `[Day 57] Python 고급 - 보안\n\n안전한 회원가입을 구현해주세요.\n\n기능: bcrypt, 솔트\n비밀번호 안전 저장\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  58: { title: 'JWT 인증', app: '토큰 기반 API', files: ['app.py', 'auth.py', 'README.md'], prompt: `[Day 58] Python 고급 - JWT\n\n토큰 기반 API를 만들어주세요.\n\n기능: JWT 발급, 검증\n토큰 인증 시스템\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  59: { title: 'OAuth 2.0', app: '소셜 로그인', files: ['app.py', 'oauth.py', 'README.md'], prompt: `[Day 59] Python 고급 - OAuth\n\n소셜 로그인을 구현해주세요.\n\n기능: Google OAuth\n소셜 로그인 연동\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  60: { title: '역할 기반 접근제어', app: '관리자/사용자 권한', files: ['app.py', 'decorators.py', 'README.md'], prompt: `[Day 60] Python 고급 - RBAC\n\n권한 시스템을 구현해주세요.\n\n기능: RBAC, 권한 관리\n역할별 접근 제어\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  61: { title: 'CORS 설정', app: '프론트엔드 분리', files: ['app.py', 'README.md'], prompt: `[Day 61] Python 고급 - CORS\n\nCORS 설정을 구현해주세요.\n\n기능: Flask-CORS, 도메인 설정\n프론트엔드 분리 환경\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  62: { title: 'HTTPS와 보안 헤더', app: '보안 설정 강화', files: ['app.py', 'security.py', 'README.md'], prompt: `[Day 62] Python 고급 - HTTPS\n\n보안 설정을 강화해주세요.\n\n기능: SSL, 보안 헤더\nHTTPS 설정\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  63: { title: '입력 검증', app: '보안 코드 리뷰', files: ['app.py', 'validators.py', 'README.md'], prompt: `[Day 63] Python 고급 - 입력 검증\n\n보안 코드 리뷰를 수행해주세요.\n\n기능: SQL Injection, XSS 방지\n입력 검증 구현\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  64: { title: 'Rate Limiting', app: 'API 요청 제한', files: ['app.py', 'README.md'], prompt: `[Day 64] Python 고급 - Rate Limit\n\nAPI 요청 제한을 구현해주세요.\n\n기능: Flask-Limiter\n요청 횟수 제한\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  65: { title: '로깅과 모니터링', app: '중앙 로그 시스템', files: ['app.py', 'logger.py', 'README.md'], prompt: `[Day 65] Python 고급 - 로깅\n\n중앙 로그 시스템을 구축해주세요.\n\n기능: 구조화된 로깅\n로그 수집 및 분석\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  66: { title: '백업과 복구', app: '데이터 백업', files: ['app.py', 'backup.py', 'README.md'], prompt: `[Day 66] Python 고급 - 백업\n\n데이터 백업 시스템을 만들어주세요.\n\n기능: 자동 백업, 복구\n데이터 안전 보장\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  67: { title: 'WebSocket 기초', app: '실시간 채팅', files: ['app.py', 'templates/chat.html', 'README.md'], prompt: `[Day 67] Python 고급 - WebSocket\n\n실시간 채팅을 만들어주세요.\n\n기능: Flask-SocketIO\n양방향 통신\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  68: { title: '실시간 알림', app: '알림 시스템', files: ['app.py', 'notifications.py', 'README.md'], prompt: `[Day 68] Python 고급 - 알림\n\n알림 시스템을 만들어주세요.\n\n기능: 서버 푸시\n실시간 알림 전송\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  69: { title: '파일 스트리밍', app: '대용량 파일 다운로드', files: ['app.py', 'streaming.py', 'README.md'], prompt: `[Day 69] Python 고급 - 스트리밍\n\n대용량 파일 다운로드를 구현해주세요.\n\n기능: 청크 전송\n스트리밍 다운로드\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  70: { title: 'Server-Sent Events', app: '실시간 대시보드', files: ['app.py', 'templates/sse.html', 'README.md'], prompt: `[Day 70] Python 고급 - SSE\n\n실시간 대시보드를 만들어주세요.\n\n기능: SSE 구현\n서버 이벤트 전송\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  71: { title: 'GraphQL 기초', app: 'GraphQL API', files: ['app.py', 'schema.py', 'README.md'], prompt: `[Day 71] Python 고급 - GraphQL\n\nGraphQL API를 만들어주세요.\n\n기능: Graphene\nQuery, Mutation\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  72: { title: 'gRPC 기초', app: 'gRPC 서비스', files: ['server.py', 'client.py', 'service.proto', 'README.md'], prompt: `[Day 72] Python 고급 - gRPC\n\ngRPC 서비스를 만들어주세요.\n\n기능: Protocol Buffers\ngRPC 통신\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  73: { title: '메시지 큐 (RabbitMQ)', app: '비동기 작업 처리', files: ['producer.py', 'consumer.py', 'README.md'], prompt: `[Day 73] Python 고급 - RabbitMQ\n\n비동기 작업 처리를 구현해주세요.\n\n기능: 발행/구독\n메시지 큐 활용\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  74: { title: 'Celery 비동기 작업', app: '백그라운드 작업', files: ['app.py', 'tasks.py', 'README.md'], prompt: `[Day 74] Python 고급 - Celery\n\n백그라운드 작업을 구현해주세요.\n\n기능: Celery 설정\n비동기 태스크\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  75: { title: '마이크로서비스 기초', app: '서비스 분리', files: ['user_service/app.py', 'order_service/app.py', 'README.md'], prompt: `[Day 75] Python 고급 - 마이크로서비스\n\n마이크로서비스를 구현해주세요.\n\n기능: 서비스 분리\n독립 배포 가능한 구조\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  76: { title: 'API Gateway', app: '통합 게이트웨이', files: ['gateway/app.py', 'README.md'], prompt: `[Day 76] Python 고급 - API Gateway\n\nAPI Gateway를 구현해주세요.\n\n기능: 게이트웨이 패턴\n라우팅, 인증 통합\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  77: { title: '멀티스레딩', app: '병렬 다운로더', files: ['app.py', 'downloader.py', 'README.md'], prompt: `[Day 77] Python 고급 - 멀티스레딩\n\n병렬 다운로더를 만들어주세요.\n\n기능: Thread, Lock\n병렬 다운로드\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  78: { title: '멀티프로세싱', app: 'CPU 집약 작업', files: ['app.py', 'processor.py', 'README.md'], prompt: `[Day 78] Python 고급 - 멀티프로세싱\n\nCPU 집약 작업을 처리해주세요.\n\n기능: Process, Pool\n병렬 계산\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  79: { title: 'Asyncio 비동기', app: '비동기 크롤러', files: ['app.py', 'crawler.py', 'README.md'], prompt: `[Day 79] Python 고급 - Asyncio\n\n비동기 크롤러를 만들어주세요.\n\n기능: async/await, aiohttp\n비동기 HTTP 요청\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  80: { title: 'FastAPI 소개', app: 'FastAPI 마이그레이션', files: ['main.py', 'README.md'], prompt: `[Day 80] Python 고급 - FastAPI\n\nFastAPI로 마이그레이션해주세요.\n\n기능: FastAPI 기초\nFlask에서 FastAPI로\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  81: { title: 'Pydantic', app: '데이터 검증', files: ['main.py', 'schemas.py', 'README.md'], prompt: `[Day 81] Python 고급 - Pydantic\n\n데이터 검증을 구현해주세요.\n\n기능: 타입 힌팅, 검증\nPydantic 모델\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  82: { title: '의존성 주입', app: 'DI 패턴', files: ['main.py', 'dependencies.py', 'README.md'], prompt: `[Day 82] Python 고급 - 의존성 주입\n\nDI 패턴을 적용해주세요.\n\n기능: 의존성 주입\n테스트 용이한 구조\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  83: { title: 'CI/CD 파이프라인', app: 'GitHub Actions', files: ['.github/workflows/ci.yml', 'README.md'], prompt: `[Day 83] Python 고급 - CI/CD\n\nCI/CD 파이프라인을 구축해주세요.\n\n기능: GitHub Actions\n자동 테스트/배포\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  84: { title: '모니터링 (Prometheus)', app: '메트릭 수집', files: ['app.py', 'metrics.py', 'README.md'], prompt: `[Day 84] Python 고급 - Prometheus\n\n메트릭 수집을 구현해주세요.\n\n기능: Prometheus 연동\n성능 모니터링\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  85: { title: '로그 집계 (ELK)', app: '중앙 로그', files: ['app.py', 'elk_config.py', 'README.md'], prompt: `[Day 85] Python 고급 - ELK\n\n중앙 로그 시스템을 구축해주세요.\n\n기능: Elasticsearch, Kibana\n로그 집계 및 시각화\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  86: { title: '부하 테스트', app: '성능 테스트', files: ['locustfile.py', 'README.md'], prompt: `[Day 86] Python 고급 - 부하 테스트\n\n성능 테스트를 수행해주세요.\n\n기능: Locust\n부하 테스트 시나리오\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  87: { title: '최종 프로젝트 설계', app: '커뮤니티 플랫폼 - 설계', files: ['docs/architecture.md', 'docs/api_spec.md', 'README.md'], prompt: `[Day 87] Python 고급 - 프로젝트 설계\n\n커뮤니티 플랫폼을 설계해주세요.\n\n기능: 요구사항 분석, 아키텍처 설계\nAPI 명세서 작성\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  88: { title: '최종 프로젝트 백엔드', app: '커뮤니티 플랫폼 - 백엔드', files: ['app/main.py', 'app/models.py', 'app/routes/users.py', 'app/routes/posts.py', 'README.md'], prompt: `[Day 88] Python 고급 - 백엔드 개발\n\n커뮤니티 플랫폼 백엔드를 구현해주세요.\n\n기능: FastAPI, SQLAlchemy\n사용자, 게시글 API\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  89: { title: '최종 프로젝트 프론트', app: '커뮤니티 플랫폼 - 프론트', files: ['templates/index.html', 'static/js/app.js', 'static/css/style.css', 'README.md'], prompt: `[Day 89] Python 고급 - 프론트 개발\n\n커뮤니티 플랫폼 프론트엔드를 구현해주세요.\n\n기능: HTML/CSS/JS\n사용자 인터페이스\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  90: { title: '최종 프로젝트 배포', app: '커뮤니티 플랫폼 - 배포', files: ['Dockerfile', 'docker-compose.yml', 'nginx.conf', 'README.md'], prompt: `[Day 90] Python 고급 - 배포\n\n커뮤니티 플랫폼을 배포해주세요.\n\n기능: Docker, Nginx\n프로덕션 배포\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` }
};

// 모든 프롬프트 합치기
const allPrompts = { ...prompts, ...intermediatePrompts, ...advancedPrompts };

// AI 서비스 목록
const aiServices = [
  { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-500' },
  { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-500' },
  { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600' },
];

export default function PythonPCLessonPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const lessonData = allPrompts[day];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    // 완료 상태 로드
    const saved = localStorage.getItem(`python-pc-${level}-completed`);
    if (saved) {
      const completed = JSON.parse(saved);
      setIsCompleted(completed.includes(day));
    }
  }, [level, day]);

  const handleCopy = async () => {
    if (lessonData?.prompt) {
      await navigator.clipboard.writeText(lessonData.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleComplete = () => {
    const saved = localStorage.getItem(`python-pc-${level}-completed`);
    let completed = saved ? JSON.parse(saved) : [];

    if (isCompleted) {
      completed = completed.filter((d: number) => d !== day);
    } else {
      completed.push(day);
    }

    localStorage.setItem(`python-pc-${level}-completed`, JSON.stringify(completed));
    setIsCompleted(!isCompleted);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  // 이전/다음 레슨 계산
  const prevDay = day > 1 ? day - 1 : null;
  const nextDay = day < 90 ? day + 1 : null;

  const getLevelForDay = (d: number) => {
    if (d <= 15) return '초급';
    if (d <= 45) return '중급';
    return '고급';
  };

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">레슨을 찾을 수 없습니다</h1>
          <Link href={`/course/coding/python-pc/${level}`} className="text-blue-600 hover:underline">
            레벨 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/course/coding/python-pc/${level}`} className="hover:text-gray-700">Python PC - {level}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Day {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Day {day}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {level}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{lessonData.title}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Code className="w-4 h-4" />
                만들 프로그램: <span className="font-medium">{lessonData.app}</span>
              </p>
            </div>
            <button
              onClick={toggleComplete}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {isCompleted ? '완료됨' : '완료 표시'}
            </button>
          </div>

          {/* 파일 목록 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-2">생성할 파일 목록:</h3>
            <div className="flex flex-wrap gap-2">
              {lessonData.files.map((file, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border rounded text-sm font-mono">
                  {file}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI 서비스 선택 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            AI 서비스 선택
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            아래 프롬프트를 복사한 후, 원하는 AI 서비스에 붙여넣으세요.
          </p>
          <div className="flex flex-wrap gap-3">
            {aiServices.map((service) => (
              <a
                key={service.name}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${service.color} text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition`}
              >
                {service.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* 프롬프트 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">AI에게 입력할 프롬프트</h2>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '복사됨!' : '프롬프트 복사'}
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
              {lessonData.prompt}
            </pre>
          </div>
        </div>

        {/* 학습 가이드 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-yellow-900 mb-2">📌 코드 저장 방법</h3>
          <ol className="text-yellow-800 text-sm space-y-1">
            <li>1. AI 응답에서 <code className="bg-yellow-100 px-1 rounded">===== 파일: xxx =====</code> 구분자를 찾습니다</li>
            <li>2. 각 구분자 사이의 코드를 해당 파일명으로 저장합니다</li>
            <li>3. 폴더 구조에 맞게 파일을 배치합니다</li>
            <li>4. VSCode에서 터미널을 열고 <code className="bg-yellow-100 px-1 rounded">python main.py</code> 실행</li>
          </ol>
        </div>

        {/* 네비게이션 */}
        <div className="flex justify-between">
          {prevDay ? (
            <Link
              href={`/course/coding/python-pc/${getLevelForDay(prevDay)}/lesson/${prevDay}`}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              이전 레슨 (Day {prevDay})
            </Link>
          ) : (
            <div />
          )}
          {nextDay ? (
            <Link
              href={`/course/coding/python-pc/${getLevelForDay(nextDay)}/lesson/${nextDay}`}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              다음 레슨 (Day {nextDay})
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
