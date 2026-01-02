'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, CheckCircle, Copy, Check, Clock, Code, Lightbulb, ExternalLink } from 'lucide-react';

// 90일 프롬프트 데이터
const prompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  1: {
    title: 'Hello World & 기본 출력',
    app: '자기소개 프로그램',
    files: ['main.c', 'intro.c', 'intro.h', 'README.md'],
    prompt: `[Day 1] C언어 초급 - Hello World & 자기소개

C언어로 자기소개 프로그램을 만들어주세요.

프로젝트 구조:
day01_intro/
├── main.c               # 메인 실행 파일
├── intro.c              # 자기소개 함수 구현
├── intro.h              # 헤더 파일
└── README.md            # 컴파일 방법 설명

기능 요구사항:
1. 이름, 나이, 취미를 출력합니다
2. 박스 형태로 예쁘게 출력합니다
3. printf의 다양한 서식 지정자를 사용합니다
4. 각 파일에는 한글 주석을 포함해주세요

컴파일 명령어: gcc main.c intro.c -o intro

각 파일의 전체 코드를 다음 형식으로 작성해주세요:

===== 파일: main.c =====
(코드 내용)
===== 파일 끝 =====

===== 파일: intro.c =====
(코드 내용)
===== 파일 끝 =====

===== 파일: intro.h =====
(코드 내용)
===== 파일 끝 =====

===== 파일: README.md =====
(컴파일 및 실행 방법)
===== 파일 끝 =====`
  },
  2: {
    title: '변수와 자료형',
    app: '변수 계산기',
    files: ['main.c', 'types.c', 'types.h', 'README.md'],
    prompt: `[Day 2] C언어 초급 - 변수와 자료형

변수 계산기를 만들어주세요.

프로젝트 구조:
day02_types/
├── main.c               # 메인 실행 파일
├── types.c              # 자료형 관련 함수
├── types.h              # 헤더 파일
└── README.md

기능 요구사항:
1. int, float, double, char 자료형 사용
2. 각 자료형의 크기(sizeof) 출력
3. 형변환 예제 포함
4. 정수/실수 연산 결과 비교

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  3: {
    title: '입력과 출력',
    app: '사용자 정보 입력기',
    files: ['main.c', 'input.c', 'input.h', 'README.md'],
    prompt: `[Day 3] C언어 초급 - 입력과 출력

사용자 정보 입력기를 만들어주세요.

기능 요구사항:
1. scanf로 이름, 나이, 키, 몸무게 입력
2. printf 서식 지정자 활용 (%d, %f, %s, %c)
3. 입력받은 정보를 정렬된 형태로 출력
4. BMI 계산 및 출력

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  4: {
    title: '연산자',
    app: '사칙연산 계산기',
    files: ['main.c', 'calculator.c', 'calculator.h', 'README.md'],
    prompt: `[Day 4] C언어 초급 - 연산자

사칙연산 계산기를 만들어주세요.

기능 요구사항:
1. 두 숫자와 연산자를 입력받습니다
2. +, -, *, /, % 연산 수행
3. 산술/비교/논리 연산자 활용
4. 0으로 나누기 예외 처리

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  5: {
    title: '조건문 (if-else)',
    app: '성적 등급 판정기',
    files: ['main.c', 'grade.c', 'grade.h', 'README.md'],
    prompt: `[Day 5] C언어 초급 - 조건문 if-else

성적 등급 판정기를 만들어주세요.

기능 요구사항:
1. 점수를 입력받습니다 (0-100)
2. 등급 부여 (A: 90+, B: 80+, C: 70+, D: 60+, F)
3. if-else if-else 구조 사용
4. 중첩 조건문으로 세부 등급 (A+, A0, A-)

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  6: {
    title: '조건문 (switch)',
    app: '요일 판별기',
    files: ['main.c', 'weekday.c', 'weekday.h', 'README.md'],
    prompt: `[Day 6] C언어 초급 - switch문

요일 판별기를 만들어주세요.

기능 요구사항:
1. 1-7 숫자를 입력받습니다
2. switch-case로 요일 출력
3. 평일/주말 구분 출력
4. default 처리

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  7: {
    title: '반복문 (for)',
    app: '구구단 출력기',
    files: ['main.c', 'multiplication.c', 'multiplication.h', 'README.md'],
    prompt: `[Day 7] C언어 초급 - for 반복문

구구단 출력기를 만들어주세요.

기능 요구사항:
1. 원하는 단을 입력받습니다
2. 해당 단의 구구단을 출력
3. 중첩 for문으로 전체 구구단 출력
4. 정렬된 형태로 출력

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  8: {
    title: '반복문 (while)',
    app: '숫자 맞추기 게임',
    files: ['main.c', 'game.c', 'game.h', 'README.md'],
    prompt: `[Day 8] C언어 초급 - while 반복문

숫자 맞추기 게임을 만들어주세요.

기능 요구사항:
1. 1-100 사이 랜덤 숫자 생성 (rand, srand)
2. while문으로 맞출 때까지 반복
3. 힌트 제공 (UP/DOWN)
4. 시도 횟수 표시, do-while 활용

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  9: {
    title: '배열 기초',
    app: '성적 관리 프로그램',
    files: ['main.c', 'scores.c', 'scores.h', 'README.md'],
    prompt: `[Day 9] C언어 초급 - 배열 기초

성적 관리 프로그램을 만들어주세요.

기능 요구사항:
1. 5명 학생의 성적을 배열에 저장
2. 총점, 평균 계산
3. 최고점, 최저점 찾기
4. 배열 인덱스 활용

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  10: {
    title: '문자열 처리',
    app: '문자열 분석기',
    files: ['main.c', 'string_util.c', 'string_util.h', 'README.md'],
    prompt: `[Day 10] C언어 초급 - 문자열 처리

문자열 분석기를 만들어주세요.

기능 요구사항:
1. 문자열 입력받기 (fgets)
2. 문자열 길이, 단어 수 계산
3. 대소문자 변환
4. string.h 함수 활용 (strlen, strcpy, strcat)

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  11: {
    title: '함수 기초',
    app: '함수형 계산기',
    files: ['main.c', 'calc_func.c', 'calc_func.h', 'README.md'],
    prompt: `[Day 11] C언어 초급 - 함수 기초

함수형 계산기를 만들어주세요.

기능 요구사항:
1. add, subtract, multiply, divide 함수 정의
2. 함수 선언과 정의 분리
3. 매개변수와 반환값 활용
4. 함수 프로토타입 헤더 파일에 선언

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  12: {
    title: '함수 심화',
    app: '팩토리얼/피보나치',
    files: ['main.c', 'recursive.c', 'recursive.h', 'README.md'],
    prompt: `[Day 12] C언어 초급 - 함수 심화

팩토리얼과 피보나치를 구현해주세요.

기능 요구사항:
1. 팩토리얼 재귀 함수
2. 피보나치 재귀 함수
3. 반복문 버전과 비교
4. 함수 포인터 기초 예제

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  13: {
    title: '포인터 기초',
    app: '포인터 실습',
    files: ['main.c', 'pointer.c', 'pointer.h', 'README.md'],
    prompt: `[Day 13] C언어 초급 - 포인터 기초

포인터 실습 프로그램을 만들어주세요.

기능 요구사항:
1. 포인터 선언과 초기화
2. 주소 연산자(&)와 역참조(*)
3. 포인터를 통한 값 변경
4. swap 함수 구현 (포인터 활용)

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  14: {
    title: '포인터와 배열',
    app: '배열 정렬 프로그램',
    files: ['main.c', 'sort.c', 'sort.h', 'README.md'],
    prompt: `[Day 14] C언어 초급 - 포인터와 배열

배열 정렬 프로그램을 만들어주세요.

기능 요구사항:
1. 배열과 포인터의 관계 이해
2. 포인터로 배열 순회
3. 버블 정렬 구현
4. 포인터 연산 활용

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  },
  15: {
    title: '초급 종합 프로젝트',
    app: '학생 관리 시스템',
    files: ['main.c', 'student.c', 'student.h', 'utils.c', 'utils.h', 'README.md'],
    prompt: `[Day 15] C언어 초급 - 종합 프로젝트

학생 관리 시스템을 만들어주세요.

기능 요구사항:
1. 학생 추가/삭제/조회/수정
2. 배열로 학생 데이터 관리
3. 성적 평균, 등급 계산
4. 메뉴 기반 인터페이스
5. 초급에서 배운 모든 개념 활용

각 파일을 ===== 파일: xxx ===== 형식으로 작성`
  }
};

// Day 16-45 (중급)
const intermediatePrompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  16: { title: '2차원 배열', app: '행렬 계산기', files: ['main.c', 'matrix.c', 'matrix.h', 'README.md'], prompt: `[Day 16] C언어 중급 - 2차원 배열\n\n행렬 계산기를 만들어주세요.\n\n기능: 행렬 덧셈, 뺄셈, 곱셈\n2차원 배열 활용\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  17: { title: '구조체 기초', app: '학생 정보 관리', files: ['main.c', 'student.c', 'student.h', 'README.md'], prompt: `[Day 17] C언어 중급 - 구조체 기초\n\n학생 정보 관리를 만들어주세요.\n\n기능: struct 정의, 멤버 접근\n학생 이름, 학번, 성적 관리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  18: { title: '구조체 배열', app: '주소록 프로그램', files: ['main.c', 'contact.c', 'contact.h', 'README.md'], prompt: `[Day 18] C언어 중급 - 구조체 배열\n\n주소록 프로그램을 만들어주세요.\n\n기능: 구조체 배열, 검색, 정렬\n연락처 CRUD\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  19: { title: '구조체 포인터', app: '연결된 데이터 처리', files: ['main.c', 'linked_struct.c', 'linked_struct.h', 'README.md'], prompt: `[Day 19] C언어 중급 - 구조체 포인터\n\n구조체 포인터를 활용해주세요.\n\n기능: -> 연산자, 구조체 포인터 전달\n동적 구조체 생성\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  20: { title: '공용체와 열거형', app: '데이터 타입 변환기', files: ['main.c', 'union_enum.c', 'union_enum.h', 'README.md'], prompt: `[Day 20] C언어 중급 - 공용체/열거형\n\n데이터 타입 변환기를 만들어주세요.\n\n기능: union, enum 활용\n다양한 타입 변환\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  21: { title: '동적 메모리 할당', app: '동적 배열 관리', files: ['main.c', 'dynamic.c', 'dynamic.h', 'README.md'], prompt: `[Day 21] C언어 중급 - 동적 메모리\n\n동적 배열 관리를 구현해주세요.\n\n기능: malloc, calloc, free\n동적 크기 배열\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  22: { title: '동적 메모리 심화', app: '가변 크기 배열', files: ['main.c', 'realloc_demo.c', 'realloc_demo.h', 'README.md'], prompt: `[Day 22] C언어 중급 - 동적 메모리 심화\n\n가변 크기 배열을 구현해주세요.\n\n기능: realloc, 메모리 누수 방지\n크기 조절 가능한 배열\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  23: { title: '파일 입출력 기초', app: '텍스트 파일 저장', files: ['main.c', 'file_io.c', 'file_io.h', 'README.md'], prompt: `[Day 23] C언어 중급 - 파일 입출력\n\n텍스트 파일 저장을 구현해주세요.\n\n기능: fopen, fclose, fprintf, fscanf\n텍스트 파일 읽기/쓰기\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  24: { title: '파일 입출력 심화', app: '바이너리 파일 처리', files: ['main.c', 'binary_io.c', 'binary_io.h', 'README.md'], prompt: `[Day 24] C언어 중급 - 바이너리 파일\n\n바이너리 파일 처리를 구현해주세요.\n\n기능: fread, fwrite, fseek\n구조체 바이너리 저장\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  25: { title: '전처리기', app: '매크로 유틸리티', files: ['main.c', 'macros.h', 'README.md'], prompt: `[Day 25] C언어 중급 - 전처리기\n\n매크로 유틸리티를 만들어주세요.\n\n기능: #define, #include, 조건부 컴파일\n매크로 함수\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  26: { title: '헤더 파일 분리', app: '모듈화된 프로젝트', files: ['main.c', 'module_a.c', 'module_a.h', 'module_b.c', 'module_b.h', 'README.md'], prompt: `[Day 26] C언어 중급 - 모듈화\n\n모듈화된 프로젝트를 만들어주세요.\n\n기능: 헤더 가드, 다중 파일 컴파일\n모듈 분리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  27: { title: '비트 연산', app: '비트 플래그 시스템', files: ['main.c', 'bitwise.c', 'bitwise.h', 'README.md'], prompt: `[Day 27] C언어 중급 - 비트 연산\n\n비트 플래그 시스템을 만들어주세요.\n\n기능: &, |, ^, ~, <<, >>\n권한 플래그 시스템\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  28: { title: '연결 리스트 기초', app: '연결 리스트 구현', files: ['main.c', 'linked_list.c', 'linked_list.h', 'README.md'], prompt: `[Day 28] C언어 중급 - 연결 리스트\n\n단일 연결 리스트를 구현해주세요.\n\n기능: 노드 생성, 삽입, 삭제, 탐색\n동적 메모리 활용\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  29: { title: '연결 리스트 심화', app: '이중 연결 리스트', files: ['main.c', 'doubly_linked.c', 'doubly_linked.h', 'README.md'], prompt: `[Day 29] C언어 중급 - 이중 연결 리스트\n\n이중 연결 리스트를 구현해주세요.\n\n기능: prev/next 포인터\n양방향 탐색\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  30: { title: '스택 구현', app: '스택 계산기', files: ['main.c', 'stack.c', 'stack.h', 'README.md'], prompt: `[Day 30] C언어 중급 - 스택\n\n스택 계산기를 만들어주세요.\n\n기능: push, pop, peek\n후위 표기법 계산기\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  31: { title: '큐 구현', app: '큐 시뮬레이터', files: ['main.c', 'queue.c', 'queue.h', 'README.md'], prompt: `[Day 31] C언어 중급 - 큐\n\n큐 시뮬레이터를 만들어주세요.\n\n기능: enqueue, dequeue\n원형 큐 구현\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  32: { title: '정렬 알고리즘 1', app: '정렬 비교 프로그램', files: ['main.c', 'basic_sort.c', 'basic_sort.h', 'README.md'], prompt: `[Day 32] C언어 중급 - 기본 정렬\n\n정렬 비교 프로그램을 만들어주세요.\n\n기능: 버블, 선택, 삽입 정렬\n시간 측정 비교\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  33: { title: '정렬 알고리즘 2', app: '고급 정렬 구현', files: ['main.c', 'advanced_sort.c', 'advanced_sort.h', 'README.md'], prompt: `[Day 33] C언어 중급 - 고급 정렬\n\n고급 정렬을 구현해주세요.\n\n기능: 퀵소트, 머지소트\n재귀 활용\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  34: { title: '검색 알고리즘', app: '검색 프로그램', files: ['main.c', 'search.c', 'search.h', 'README.md'], prompt: `[Day 34] C언어 중급 - 검색\n\n검색 프로그램을 만들어주세요.\n\n기능: 선형 검색, 이진 검색\n성능 비교\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  35: { title: '해시 테이블', app: '해시 테이블 구현', files: ['main.c', 'hashtable.c', 'hashtable.h', 'README.md'], prompt: `[Day 35] C언어 중급 - 해시 테이블\n\n해시 테이블을 구현해주세요.\n\n기능: 해시 함수, 충돌 처리 (체이닝)\n키-값 저장\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  36: { title: '트리 기초', app: '이진 트리 구현', files: ['main.c', 'binary_tree.c', 'binary_tree.h', 'README.md'], prompt: `[Day 36] C언어 중급 - 이진 트리\n\n이진 트리를 구현해주세요.\n\n기능: 노드 생성, 순회 (전위/중위/후위)\n트리 출력\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  37: { title: '이진 탐색 트리', app: 'BST 구현', files: ['main.c', 'bst.c', 'bst.h', 'README.md'], prompt: `[Day 37] C언어 중급 - BST\n\n이진 탐색 트리를 구현해주세요.\n\n기능: 삽입, 삭제, 탐색\n정렬된 출력\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  38: { title: '그래프 기초', app: '그래프 표현', files: ['main.c', 'graph.c', 'graph.h', 'README.md'], prompt: `[Day 38] C언어 중급 - 그래프\n\n그래프를 표현해주세요.\n\n기능: 인접 행렬, 인접 리스트\n그래프 생성/출력\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  39: { title: '그래프 탐색', app: '그래프 탐색기', files: ['main.c', 'graph_search.c', 'graph_search.h', 'README.md'], prompt: `[Day 39] C언어 중급 - 그래프 탐색\n\n그래프 탐색기를 만들어주세요.\n\n기능: DFS (깊이 우선), BFS (너비 우선)\n경로 출력\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  40: { title: '문자열 알고리즘', app: '문자열 검색기', files: ['main.c', 'string_algo.c', 'string_algo.h', 'README.md'], prompt: `[Day 40] C언어 중급 - 문자열 알고리즘\n\n문자열 검색기를 만들어주세요.\n\n기능: 브루트 포스, KMP 알고리즘\n패턴 매칭\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  41: { title: '메모리 관리', app: '메모리 분석 도구', files: ['main.c', 'memory.c', 'memory.h', 'README.md'], prompt: `[Day 41] C언어 중급 - 메모리 관리\n\n메모리 분석 도구를 만들어주세요.\n\n기능: 메모리 구조 이해\n메모리 누수 탐지\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  42: { title: '에러 처리', app: '에러 핸들링 시스템', files: ['main.c', 'error.c', 'error.h', 'README.md'], prompt: `[Day 42] C언어 중급 - 에러 처리\n\n에러 핸들링 시스템을 만들어주세요.\n\n기능: errno, perror, strerror\n에러 코드 관리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  43: { title: '라이브러리 활용', app: '수학 라이브러리 활용', files: ['main.c', 'math_util.c', 'math_util.h', 'README.md'], prompt: `[Day 43] C언어 중급 - 표준 라이브러리\n\n수학 라이브러리를 활용해주세요.\n\n기능: math.h, stdlib.h, time.h\n다양한 수학 함수\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  44: { title: 'Makefile', app: 'Makefile 프로젝트', files: ['main.c', 'module.c', 'module.h', 'Makefile', 'README.md'], prompt: `[Day 44] C언어 중급 - Makefile\n\nMakefile 프로젝트를 만들어주세요.\n\n기능: make 빌드 자동화\n의존성 관리, clean 타겟\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  45: { title: '중급 종합 프로젝트', app: '도서 관리 시스템', files: ['main.c', 'book.c', 'book.h', 'storage.c', 'storage.h', 'ui.c', 'ui.h', 'Makefile', 'README.md'], prompt: `[Day 45] C언어 중급 - 종합 프로젝트\n\n도서 관리 시스템을 만들어주세요.\n\n기능:\n- 도서 CRUD (구조체)\n- 파일 저장/로드\n- 검색/정렬\n- 연결 리스트 활용\n- Makefile 빌드\n\n모든 중급 개념 활용\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` }
};

// Day 46-90 (고급)
const advancedPrompts: { [day: number]: { title: string; app: string; prompt: string; files: string[] } } = {
  46: { title: '시스템 프로그래밍 개요', app: '시스템 정보 출력', files: ['main.c', 'sysinfo.c', 'sysinfo.h', 'README.md'], prompt: `[Day 46] C언어 고급 - 시스템 프로그래밍\n\n시스템 정보 출력 프로그램을 만들어주세요.\n\n기능: POSIX API, 시스템 콜 기초\nuname, getpid, getuid\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  47: { title: '파일 시스템 1', app: '저수준 파일 처리', files: ['main.c', 'lowlevel_io.c', 'lowlevel_io.h', 'README.md'], prompt: `[Day 47] C언어 고급 - 저수준 파일 I/O\n\n저수준 파일 처리를 구현해주세요.\n\n기능: open, read, write, close\n파일 디스크립터\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  48: { title: '파일 시스템 2', app: '파일 탐색기', files: ['main.c', 'explorer.c', 'explorer.h', 'README.md'], prompt: `[Day 48] C언어 고급 - 파일 시스템\n\n파일 탐색기를 만들어주세요.\n\n기능: stat, opendir, readdir\n디렉토리 탐색, 파일 정보\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  49: { title: '프로세스 기초', app: '프로세스 생성기', files: ['main.c', 'process.c', 'process.h', 'README.md'], prompt: `[Day 49] C언어 고급 - 프로세스\n\n프로세스 생성기를 만들어주세요.\n\n기능: fork, exec, wait\n자식 프로세스 생성\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  50: { title: '프로세스 관리', app: '프로세스 모니터', files: ['main.c', 'proc_monitor.c', 'proc_monitor.h', 'README.md'], prompt: `[Day 50] C언어 고급 - 프로세스 관리\n\n프로세스 모니터를 만들어주세요.\n\n기능: 프로세스 상태, 종료 상태\n좀비/고아 프로세스\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  51: { title: '시그널 처리', app: '시그널 핸들러', files: ['main.c', 'signal_handler.c', 'signal_handler.h', 'README.md'], prompt: `[Day 51] C언어 고급 - 시그널\n\n시그널 핸들러를 구현해주세요.\n\n기능: signal, sigaction\nSIGINT, SIGTERM 처리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  52: { title: '파이프 통신', app: '파이프 통신 예제', files: ['main.c', 'pipe_comm.c', 'pipe_comm.h', 'README.md'], prompt: `[Day 52] C언어 고급 - 파이프\n\n파이프 통신을 구현해주세요.\n\n기능: pipe, 익명 파이프\n부모-자식 통신\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  53: { title: '명명된 파이프', app: 'FIFO 통신', files: ['writer.c', 'reader.c', 'fifo.h', 'README.md'], prompt: `[Day 53] C언어 고급 - FIFO\n\nFIFO 통신을 구현해주세요.\n\n기능: mkfifo, 명명된 파이프\n프로세스 간 통신\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  54: { title: '공유 메모리', app: '공유 메모리 IPC', files: ['writer.c', 'reader.c', 'shared.h', 'README.md'], prompt: `[Day 54] C언어 고급 - 공유 메모리\n\n공유 메모리 IPC를 구현해주세요.\n\n기능: shmget, shmat, shmdt\n프로세스 간 데이터 공유\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  55: { title: '메시지 큐', app: '메시지 큐 시스템', files: ['sender.c', 'receiver.c', 'msgqueue.h', 'README.md'], prompt: `[Day 55] C언어 고급 - 메시지 큐\n\n메시지 큐 시스템을 구현해주세요.\n\n기능: msgget, msgsnd, msgrcv\n구조화된 메시지 전송\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  56: { title: '세마포어', app: '동기화 예제', files: ['main.c', 'semaphore.c', 'semaphore.h', 'README.md'], prompt: `[Day 56] C언어 고급 - 세마포어\n\n동기화 예제를 구현해주세요.\n\n기능: semget, semop\n임계 영역 보호\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  57: { title: '스레드 기초', app: '멀티스레드 프로그램', files: ['main.c', 'thread.c', 'thread.h', 'README.md'], prompt: `[Day 57] C언어 고급 - 스레드\n\n멀티스레드 프로그램을 만들어주세요.\n\n기능: pthread_create, pthread_join\n여러 스레드 실행\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  58: { title: '스레드 동기화', app: '생산자-소비자', files: ['main.c', 'producer_consumer.c', 'producer_consumer.h', 'README.md'], prompt: `[Day 58] C언어 고급 - 스레드 동기화\n\n생산자-소비자를 구현해주세요.\n\n기능: mutex, 조건 변수\n동기화된 버퍼\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  59: { title: '스레드 풀', app: '스레드 풀 서버', files: ['main.c', 'threadpool.c', 'threadpool.h', 'README.md'], prompt: `[Day 59] C언어 고급 - 스레드 풀\n\n스레드 풀을 구현해주세요.\n\n기능: 작업 큐, 워커 스레드\n효율적인 스레드 관리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  60: { title: '네트워크 기초', app: '네트워크 개념 정리', files: ['main.c', 'network.c', 'network.h', 'README.md'], prompt: `[Day 60] C언어 고급 - 네트워크 기초\n\n네트워크 개념을 정리해주세요.\n\n기능: TCP/IP, 소켓 개념\nIP 주소, 포트 변환\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  61: { title: 'TCP 서버', app: 'TCP 에코 서버', files: ['server.c', 'common.h', 'README.md'], prompt: `[Day 61] C언어 고급 - TCP 서버\n\nTCP 에코 서버를 만들어주세요.\n\n기능: socket, bind, listen, accept\n클라이언트 연결 처리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  62: { title: 'TCP 클라이언트', app: 'TCP 클라이언트', files: ['client.c', 'common.h', 'README.md'], prompt: `[Day 62] C언어 고급 - TCP 클라이언트\n\nTCP 클라이언트를 만들어주세요.\n\n기능: connect, send, recv\n서버 연결 및 통신\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  63: { title: 'UDP 통신', app: 'UDP 채팅', files: ['udp_server.c', 'udp_client.c', 'common.h', 'README.md'], prompt: `[Day 63] C언어 고급 - UDP\n\nUDP 채팅을 만들어주세요.\n\n기능: sendto, recvfrom\n비연결형 통신\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  64: { title: '멀티클라이언트 서버', app: '다중 클라이언트 서버', files: ['server.c', 'common.h', 'README.md'], prompt: `[Day 64] C언어 고급 - 멀티클라이언트\n\n다중 클라이언트 서버를 만들어주세요.\n\n기능: fork/thread 기반\n동시 접속 처리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  65: { title: 'select/poll', app: 'select 서버', files: ['server.c', 'common.h', 'README.md'], prompt: `[Day 65] C언어 고급 - I/O 다중화\n\nselect 서버를 만들어주세요.\n\n기능: select, fd_set\n다중 소켓 모니터링\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  66: { title: 'epoll', app: 'epoll 서버', files: ['server.c', 'common.h', 'README.md'], prompt: `[Day 66] C언어 고급 - epoll\n\nepoll 서버를 만들어주세요.\n\n기능: epoll_create, epoll_ctl, epoll_wait\n고성능 이벤트 처리\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  67: { title: 'HTTP 프로토콜', app: 'HTTP 파서', files: ['main.c', 'http_parser.c', 'http_parser.h', 'README.md'], prompt: `[Day 67] C언어 고급 - HTTP\n\nHTTP 파서를 만들어주세요.\n\n기능: HTTP 요청/응답 파싱\n헤더, 바디 추출\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  68: { title: '간단한 웹서버', app: '미니 웹서버', files: ['webserver.c', 'http.c', 'http.h', 'README.md'], prompt: `[Day 68] C언어 고급 - 웹서버\n\n미니 웹서버를 만들어주세요.\n\n기능: HTTP 서버 구현\n정적 파일 서빙\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  69: { title: '데이터 직렬화', app: '프로토콜 구현', files: ['main.c', 'protocol.c', 'protocol.h', 'README.md'], prompt: `[Day 69] C언어 고급 - 직렬화\n\n바이너리 프로토콜을 구현해주세요.\n\n기능: 데이터 직렬화/역직렬화\n네트워크 바이트 순서\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  70: { title: '암호화 기초', app: '암호화 유틸', files: ['main.c', 'crypto.c', 'crypto.h', 'README.md'], prompt: `[Day 70] C언어 고급 - 암호화\n\n암호화 유틸을 만들어주세요.\n\n기능: XOR 암호화, 간단한 해시\n파일 암호화\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  71: { title: '메모리 매핑', app: '대용량 파일 처리', files: ['main.c', 'mmap_util.c', 'mmap_util.h', 'README.md'], prompt: `[Day 71] C언어 고급 - mmap\n\n대용량 파일 처리를 구현해주세요.\n\n기능: mmap, munmap\n메모리 매핑 파일\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  72: { title: '동적 라이브러리', app: '플러그인 시스템', files: ['main.c', 'plugin.c', 'plugin.h', 'README.md'], prompt: `[Day 72] C언어 고급 - 동적 라이브러리\n\n플러그인 시스템을 만들어주세요.\n\n기능: dlopen, dlsym, dlclose\n런타임 라이브러리 로딩\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  73: { title: '디버깅 기법', app: '디버깅 실습', files: ['buggy.c', 'README.md'], prompt: `[Day 73] C언어 고급 - 디버깅\n\n디버깅 실습을 수행해주세요.\n\n기능: gdb 사용법, valgrind\n메모리 오류 찾기\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  74: { title: '성능 최적화', app: '성능 분석', files: ['main.c', 'benchmark.c', 'benchmark.h', 'README.md'], prompt: `[Day 74] C언어 고급 - 최적화\n\n성능 분석을 수행해주세요.\n\n기능: 프로파일링, 시간 측정\n최적화 기법\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  75: { title: '임베디드 기초', app: '임베디드 Hello World', files: ['main.c', 'README.md'], prompt: `[Day 75] C언어 고급 - 임베디드\n\n임베디드 기초를 학습해주세요.\n\n기능: 크로스 컴파일 개념\n임베디드 환경 이해\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  76: { title: 'GPIO 제어', app: 'GPIO 프로그램', files: ['main.c', 'gpio.c', 'gpio.h', 'README.md'], prompt: `[Day 76] C언어 고급 - GPIO\n\nGPIO 제어를 구현해주세요.\n\n기능: LED 제어, 버튼 입력\nsysfs 또는 직접 제어\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  77: { title: 'UART 통신', app: 'UART 터미널', files: ['main.c', 'uart.c', 'uart.h', 'README.md'], prompt: `[Day 77] C언어 고급 - UART\n\nUART 터미널을 만들어주세요.\n\n기능: 시리얼 포트 설정\ntermios, 데이터 송수신\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  78: { title: 'I2C 통신', app: 'I2C 센서 읽기', files: ['main.c', 'i2c.c', 'i2c.h', 'README.md'], prompt: `[Day 78] C언어 고급 - I2C\n\nI2C 센서 읽기를 구현해주세요.\n\n기능: I2C 프로토콜\n센서 데이터 읽기\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  79: { title: 'SPI 통신', app: 'SPI 디바이스 제어', files: ['main.c', 'spi.c', 'spi.h', 'README.md'], prompt: `[Day 79] C언어 고급 - SPI\n\nSPI 디바이스 제어를 구현해주세요.\n\n기능: SPI 프로토콜\nMOSI, MISO, CLK\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  80: { title: '타이머/인터럽트', app: '타이머 프로그램', files: ['main.c', 'timer.c', 'timer.h', 'README.md'], prompt: `[Day 80] C언어 고급 - 타이머\n\n타이머 프로그램을 만들어주세요.\n\n기능: 타이머, 인터럽트 개념\nsetitimer, SIGALRM\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  81: { title: 'ADC/DAC', app: '아날로그 센서 읽기', files: ['main.c', 'adc.c', 'adc.h', 'README.md'], prompt: `[Day 81] C언어 고급 - ADC/DAC\n\n아날로그 센서 읽기를 구현해주세요.\n\n기능: ADC 개념\n아날로그 값 읽기\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  82: { title: 'PWM 제어', app: 'LED 밝기/모터 제어', files: ['main.c', 'pwm.c', 'pwm.h', 'README.md'], prompt: `[Day 82] C언어 고급 - PWM\n\nPWM 제어를 구현해주세요.\n\n기능: PWM 출력\n듀티 사이클 조절\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  83: { title: 'RTOS 개념', app: 'RTOS 태스크', files: ['main.c', 'rtos_sim.c', 'rtos_sim.h', 'README.md'], prompt: `[Day 83] C언어 고급 - RTOS\n\nRTOS 태스크를 시뮬레이션해주세요.\n\n기능: 실시간 OS 개념\n태스크 스케줄링\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  84: { title: '커널 모듈 기초', app: 'Hello 커널 모듈', files: ['hello_module.c', 'Makefile', 'README.md'], prompt: `[Day 84] C언어 고급 - 커널 모듈\n\nHello 커널 모듈을 만들어주세요.\n\n기능: 모듈 init/exit\nprintk 로그\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  85: { title: '디바이스 드라이버', app: '간단한 드라이버', files: ['char_driver.c', 'Makefile', 'test_app.c', 'README.md'], prompt: `[Day 85] C언어 고급 - 디바이스 드라이버\n\n간단한 Character 드라이버를 만들어주세요.\n\n기능: file_operations\nopen, read, write, close\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  86: { title: '코드 품질', app: '코드 리뷰 도구', files: ['main.c', 'README.md'], prompt: `[Day 86] C언어 고급 - 코드 품질\n\n코드 품질 도구를 학습해주세요.\n\n기능: 코딩 표준 (MISRA)\n정적 분석 도구\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  87: { title: '최종 프로젝트 설계', app: '채팅 서버 - 설계', files: ['docs/design.md', 'docs/protocol.md', 'README.md'], prompt: `[Day 87] C언어 고급 - 프로젝트 설계\n\n채팅 서버를 설계해주세요.\n\n기능: 요구사항 분석\n아키텍처 설계, 프로토콜 정의\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  88: { title: '최종 프로젝트 서버', app: '채팅 서버 - 서버', files: ['server.c', 'chat.c', 'chat.h', 'user.c', 'user.h', 'Makefile', 'README.md'], prompt: `[Day 88] C언어 고급 - 채팅 서버\n\n채팅 서버를 구현해주세요.\n\n기능: 멀티스레드/epoll 서버\n사용자 관리, 메시지 브로드캐스트\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  89: { title: '최종 프로젝트 클라이언트', app: '채팅 서버 - 클라이언트', files: ['client.c', 'ui.c', 'ui.h', 'Makefile', 'README.md'], prompt: `[Day 89] C언어 고급 - 채팅 클라이언트\n\n채팅 클라이언트를 구현해주세요.\n\n기능: 서버 연결\n메시지 송수신 UI\n\n각 파일을 ===== 파일: xxx ===== 형식으로 작성` },
  90: { title: '최종 프로젝트 완성', app: '채팅 서버 - 완성', files: ['README.md'], prompt: `[Day 90] C언어 고급 - 프로젝트 완성\n\n채팅 서버를 완성해주세요.\n\n기능: 테스트, 버그 수정\n문서화, 코드 정리\n\n전체 프로젝트 검토 및 개선` }
};

// 모든 프롬프트 합치기
const allPrompts = { ...prompts, ...intermediatePrompts, ...advancedPrompts };

// AI 서비스 목록
const aiServices = [
  { name: 'Claude', url: 'https://claude.ai', color: 'bg-orange-500' },
  { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-blue-500' },
  { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'bg-green-600' },
];

export default function CLangLessonPage() {
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

    const saved = localStorage.getItem(`c-pc-${level}-completed`);
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
    const saved = localStorage.getItem(`c-pc-${level}-completed`);
    let completed = saved ? JSON.parse(saved) : [];

    if (isCompleted) {
      completed = completed.filter((d: number) => d !== day);
    } else {
      completed.push(day);
    }

    localStorage.setItem(`c-pc-${level}-completed`, JSON.stringify(completed));
    setIsCompleted(!isCompleted);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

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
          <Link href={`/course/coding/c-pc/${level}`} className="text-blue-600 hover:underline">
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
          <Link href={`/course/coding/c-pc/${level}`} className="hover:text-gray-700">C언어 PC - {level}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Day {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
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
          <h3 className="font-semibold text-yellow-900 mb-2">📌 코드 저장 및 실행 방법</h3>
          <ol className="text-yellow-800 text-sm space-y-1">
            <li>1. AI 응답에서 <code className="bg-yellow-100 px-1 rounded">===== 파일: xxx =====</code> 구분자를 찾습니다</li>
            <li>2. 각 구분자 사이의 코드를 해당 파일명으로 저장합니다</li>
            <li>3. 폴더 구조에 맞게 파일을 배치합니다</li>
            <li>4. VSCode 터미널에서 컴파일: <code className="bg-yellow-100 px-1 rounded">gcc main.c -o main</code></li>
            <li>5. 실행: <code className="bg-yellow-100 px-1 rounded">./main</code> (Windows: <code className="bg-yellow-100 px-1 rounded">main.exe</code>)</li>
          </ol>
        </div>

        {/* 네비게이션 */}
        <div className="flex justify-between">
          {prevDay ? (
            <Link
              href={`/course/coding/c-pc/${getLevelForDay(prevDay)}/lesson/${prevDay}`}
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
              href={`/course/coding/c-pc/${getLevelForDay(nextDay)}/lesson/${nextDay}`}
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
