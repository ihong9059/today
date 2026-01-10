'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'c-language',
    name: 'C언어',
    color: 'from-purple-600 to-purple-500',
    questions: [
      { id: 1, question: '포인터 변수의 정의와 선언 방법을 설명하시오.', answer: '메모리 주소를 저장하는 변수, 자료형 *변수명 형태로 선언', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 포인터 변수의 정의와 선언 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '포인터 연산자 *와 &의 역할을 설명하시오.', answer: '*: 간접 참조(값 접근), &: 주소 연산자(주소 반환)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 포인터 연산자 *와 &의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '이중 포인터(더블 포인터)의 개념과 사용 예를 설명하시오.', answer: '포인터를 가리키는 포인터, int **pp 형태로 선언', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 이중 포인터(더블 포인터)의 개념과 사용 예를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '배열과 포인터의 관계를 설명하시오.', answer: '배열명은 배열 첫 번째 요소의 주소(포인터 상수)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 배열과 포인터의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '1차원 배열의 선언과 초기화 방법을 쓰시오.', answer: 'int arr[5] = {1, 2, 3, 4, 5}; 또는 int arr[] = {1, 2, 3};', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 1차원 배열의 선언과 초기화 방법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '2차원 배열에서 arr[i][j]를 포인터로 표현하시오.', answer: '*(*(arr+i)+j) 또는 *(arr[i]+j)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 2차원 배열에서 arr[i][j]를 포인터로 표현하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '문자열을 저장하는 2가지 방법과 차이점을 설명하시오.', answer: 'char 배열(수정 가능), char 포인터(상수 문자열, 수정 불가)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 문자열을 저장하는 2가지 방법과 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '구조체(struct)의 정의와 선언 방법을 설명하시오.', answer: '서로 다른 자료형을 하나로 묶는 사용자 정의 자료형', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 구조체(struct)의 정의와 선언 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '구조체 멤버 접근 연산자 .과 ->의 차이를 설명하시오.', answer: '.: 구조체 변수로 접근, ->: 구조체 포인터로 접근', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 구조체 멤버 접근 연산자 .과 ->의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'typedef의 용도와 사용 예를 설명하시오.', answer: '자료형에 새로운 이름을 부여, typedef struct Student STU;', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: typedef의 용도와 사용 예를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '공용체(union)와 구조체(struct)의 차이점을 설명하시오.', answer: '공용체: 메모리 공유(가장 큰 멤버 크기), 구조체: 각 멤버 별도 메모리', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 공용체(union)와 구조체(struct)의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '함수의 매개변수 전달 방식 2가지를 비교하시오.', answer: '값에 의한 전달(복사본), 주소에 의한 전달(원본 변경 가능)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 함수의 매개변수 전달 방식 2가지를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '함수 포인터의 선언과 사용 방법을 설명하시오.', answer: '함수를 가리키는 포인터, int (*fp)(int, int);', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 함수 포인터의 선언과 사용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'malloc()과 free() 함수의 역할을 설명하시오.', answer: 'malloc: 동적 메모리 할당, free: 할당된 메모리 해제', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: malloc()과 free() 함수의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'calloc()과 malloc()의 차이점을 설명하시오.', answer: 'calloc: 0으로 초기화, 배열 형태 할당 / malloc: 초기화 안됨', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: calloc()과 malloc()의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: 'sizeof 연산자의 역할과 사용 예를 설명하시오.', answer: '자료형이나 변수의 크기(바이트)를 반환', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: sizeof 연산자의 역할과 사용 예를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: '전역 변수와 지역 변수의 차이점을 설명하시오.', answer: '전역: 프로그램 전체에서 접근, 지역: 해당 블록 내에서만 접근', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 전역 변수와 지역 변수의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: 'static 키워드의 의미와 사용 목적을 설명하시오.', answer: '지역변수: 값 유지, 전역변수/함수: 파일 내부로 범위 제한', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: static 키워드의 의미와 사용 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '선행처리기(전처리기)의 역할과 주요 지시자를 쓰시오.', answer: '컴파일 전 소스코드 처리, #include, #define, #ifdef 등', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 선행처리기(전처리기)의 역할과 주요 지시자를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: '#define과 const의 차이점을 설명하시오.', answer: '#define: 전처리기 매크로(치환), const: 상수 변수(타입 검사)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: #define과 const의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 21, question: '문자열 함수 strlen, strcpy, strcmp의 기능을 설명하시오.', answer: 'strlen: 길이, strcpy: 복사, strcmp: 비교(같으면 0)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 문자열 함수 strlen, strcpy, strcmp의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 22, question: 'printf와 scanf 함수의 서식 지정자 5가지를 쓰시오.', answer: '%d(정수), %f(실수), %c(문자), %s(문자열), %p(주소)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: printf와 scanf 함수의 서식 지정자 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 23, question: 'enum(열거형)의 정의와 사용 목적을 설명하시오.', answer: '정수형 상수 집합 정의, 가독성 향상과 유지보수 용이', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: enum(열거형)의 정의와 사용 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 24, question: '비트 연산자 &, |, ^, ~, <<, >>의 기능을 설명하시오.', answer: '&: AND, |: OR, ^: XOR, ~: NOT, <<: 좌시프트, >>: 우시프트', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 비트 연산자 &, |, ^, ~, <<, >>의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 25, question: 'C언어에서 메모리 영역 4가지를 설명하시오.', answer: '코드(텍스트), 데이터(전역/정적), 힙(동적), 스택(지역/매개변수)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: C언어에서 메모리 영역 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'java',
    name: 'Java',
    color: 'from-orange-600 to-orange-500',
    questions: [
      { id: 1, question: '클래스와 객체의 관계를 설명하시오.', answer: '클래스는 객체의 설계도, 객체는 클래스의 인스턴스', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 클래스와 객체의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '생성자(Constructor)의 특징 3가지를 쓰시오.', answer: '클래스명과 동일, 반환형 없음, 객체 생성 시 자동 호출', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 생성자(Constructor)의 특징 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '접근 제어자 4가지와 접근 범위를 설명하시오.', answer: 'public(모든 곳), protected(같은 패키지+자식), default(같은 패키지), private(같은 클래스)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 접근 제어자 4가지와 접근 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'this와 super 키워드의 차이를 설명하시오.', answer: 'this: 현재 객체 참조, super: 부모 클래스 참조', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: this와 super 키워드의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'static 멤버와 인스턴스 멤버의 차이를 설명하시오.', answer: 'static: 클래스 소속(공유), 인스턴스: 객체 소속(각각 생성)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: static 멤버와 인스턴스 멤버의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '상속(Inheritance)의 개념과 extends 키워드 사용법을 설명하시오.', answer: '부모 클래스의 멤버를 자식 클래스가 물려받음, class 자식 extends 부모', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 상속(Inheritance)의 개념과 extends 키워드 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '메서드 오버로딩(Overloading)의 조건을 설명하시오.', answer: '같은 이름, 다른 매개변수(개수, 타입, 순서)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 메서드 오버로딩(Overloading)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '메서드 오버라이딩(Overriding)의 조건을 설명하시오.', answer: '부모 메서드와 동일한 시그니처, 접근 제어자 같거나 넓게', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 메서드 오버라이딩(Overriding)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '다형성(Polymorphism)의 개념과 장점을 설명하시오.', answer: '같은 타입이지만 실행 결과가 다양, 유연하고 확장 가능한 코드', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 다형성(Polymorphism)의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '업캐스팅(Upcasting)과 다운캐스팅(Downcasting)을 설명하시오.', answer: '업캐스팅: 자식→부모(자동), 다운캐스팅: 부모→자식(명시적)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 업캐스팅(Upcasting)과 다운캐스팅(Downcasting)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '추상 클래스(abstract class)의 특징을 설명하시오.', answer: '인스턴스 생성 불가, 추상 메서드 포함 가능, 상속용 클래스', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 추상 클래스(abstract class)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '인터페이스(interface)의 특징과 구현 방법을 설명하시오.', answer: '상수와 추상 메서드만 포함, implements 키워드로 구현', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 인터페이스(interface)의 특징과 구현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '추상 클래스와 인터페이스의 차이점을 설명하시오.', answer: '추상 클래스: 단일 상속, 일반 메서드 가능 / 인터페이스: 다중 구현, 명세만', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 추상 클래스와 인터페이스의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'final 키워드의 3가지 사용 위치와 의미를 설명하시오.', answer: '변수: 상수, 메서드: 오버라이딩 금지, 클래스: 상속 금지', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: final 키워드의 3가지 사용 위치와 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '예외(Exception)와 에러(Error)의 차이를 설명하시오.', answer: '예외: 프로그램으로 처리 가능, 에러: 시스템 레벨 문제(복구 불가)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 예외(Exception)와 에러(Error)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: 'try-catch-finally 구문의 실행 흐름을 설명하시오.', answer: 'try: 예외 발생 가능 코드, catch: 예외 처리, finally: 항상 실행', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: try-catch-finally 구문의 실행 흐름을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: 'throws와 throw 키워드의 차이를 설명하시오.', answer: 'throws: 메서드가 발생시킬 수 있는 예외 선언, throw: 예외 발생', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: throws와 throw 키워드의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: 'Checked Exception과 Unchecked Exception의 차이를 설명하시오.', answer: 'Checked: 컴파일 시 검사(IOException), Unchecked: 런타임 예외(NullPointerException)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: Checked Exception과 Unchecked Exception의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: 'String, StringBuilder, StringBuffer의 차이를 설명하시오.', answer: 'String: 불변, StringBuilder: 가변(동기화X), StringBuffer: 가변(동기화O)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: String, StringBuilder, StringBuffer의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: 'ArrayList와 LinkedList의 차이를 설명하시오.', answer: 'ArrayList: 인덱스 접근 빠름, LinkedList: 삽입/삭제 빠름', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: ArrayList와 LinkedList의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 21, question: 'HashMap과 HashTable의 차이를 설명하시오.', answer: 'HashMap: 동기화X, null 허용 / HashTable: 동기화O, null 불허', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: HashMap과 HashTable의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 22, question: '제네릭(Generic)의 개념과 장점을 설명하시오.', answer: '타입을 매개변수화, 컴파일 시 타입 체크로 안정성 향상', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 제네릭(Generic)의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 23, question: 'equals()와 ==의 차이를 설명하시오.', answer: '==: 주소(참조) 비교, equals(): 값(내용) 비교', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: equals()와 ==의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 24, question: 'instanceof 연산자의 용도를 설명하시오.', answer: '객체가 특정 클래스/인터페이스의 인스턴스인지 확인', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: instanceof 연산자의 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 25, question: '내부 클래스(Inner Class)의 종류 4가지를 쓰시오.', answer: '멤버 클래스, 정적 내부 클래스, 지역 클래스, 익명 클래스', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 내부 클래스(Inner Class)의 종류 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 26, question: '람다 표현식(Lambda Expression)의 문법을 설명하시오.', answer: '(매개변수) -> {실행문}, 함수형 인터페이스 구현에 사용', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 람다 표현식(Lambda Expression)의 문법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 27, question: '스레드(Thread) 생성 방법 2가지를 설명하시오.', answer: 'Thread 클래스 상속, Runnable 인터페이스 구현', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 스레드(Thread) 생성 방법 2가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 28, question: 'synchronized 키워드의 역할을 설명하시오.', answer: '동기화를 통해 멀티스레드 환경에서 공유 자원 보호', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: synchronized 키워드의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 29, question: 'JVM의 구성요소와 역할을 설명하시오.', answer: '클래스 로더, 실행 엔진, 메모리 영역(Method, Heap, Stack 등)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: JVM의 구성요소와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 30, question: '가비지 컬렉션(Garbage Collection)의 개념을 설명하시오.', answer: '사용하지 않는 객체를 자동으로 메모리에서 해제하는 기능', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 가비지 컬렉션(Garbage Collection)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    color: 'from-blue-600 to-blue-500',
    questions: [
      { id: 1, question: '리스트(list)의 특징과 생성 방법을 설명하시오.', answer: '순서 있음, 가변, 중복 허용, [] 또는 list()로 생성', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 리스트(list)의 특징과 생성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '리스트 슬라이싱 문법 list[start:end:step]을 설명하시오.', answer: 'start부터 end-1까지 step 간격으로 추출', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 리스트 슬라이싱 문법 list[start:end:step]을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '리스트 메서드 append, extend, insert의 차이를 설명하시오.', answer: 'append: 끝에 추가, extend: 요소들을 확장, insert: 특정 위치에 삽입', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 리스트 메서드 append, extend, insert의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '리스트 컴프리헨션(List Comprehension)의 문법을 쓰시오.', answer: '[표현식 for 변수 in 반복가능객체 if 조건]', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 리스트 컴프리헨션(List Comprehension)의 문법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '튜플(tuple)과 리스트(list)의 차이를 설명하시오.', answer: '튜플: 불변(immutable), 리스트: 가변(mutable)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 튜플(tuple)과 리스트(list)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '딕셔너리(dict)의 특징과 생성 방법을 설명하시오.', answer: '키-값 쌍, 키는 유일, {} 또는 dict()로 생성', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 딕셔너리(dict)의 특징과 생성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '딕셔너리 메서드 keys(), values(), items()의 역할을 설명하시오.', answer: 'keys: 키 목록, values: 값 목록, items: (키, 값) 쌍 목록', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 딕셔너리 메서드 keys(), values(), items()의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'get() 메서드와 []를 이용한 딕셔너리 값 접근의 차이를 설명하시오.', answer: 'get(): 키 없으면 None 반환, []: 키 없으면 KeyError 발생', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: get() 메서드와 []를 이용한 딕셔너리 값 접근의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '집합(set)의 특징과 주요 연산을 설명하시오.', answer: '순서 없음, 중복 불허, 합집합|, 교집합&, 차집합-, 대칭차집합^', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 집합(set)의 특징과 주요 연산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '함수 정의 문법과 return 문의 역할을 설명하시오.', answer: 'def 함수명(매개변수): 본문, return은 값을 반환하고 함수 종료', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 함수 정의 문법과 return 문의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '위치 인자(positional)와 키워드 인자(keyword)의 차이를 설명하시오.', answer: '위치 인자: 순서대로 전달, 키워드 인자: 매개변수명=값 형태로 전달', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 위치 인자(positional)와 키워드 인자(keyword)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '*args와 **kwargs의 의미와 사용법을 설명하시오.', answer: '*args: 가변 위치 인자(튜플), **kwargs: 가변 키워드 인자(딕셔너리)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: *args와 **kwargs의 의미와 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '람다(lambda) 함수의 문법과 사용 예를 쓰시오.', answer: 'lambda 매개변수: 표현식, 예: lambda x: x*2', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 람다(lambda) 함수의 문법과 사용 예를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'map(), filter(), reduce() 함수의 역할을 설명하시오.', answer: 'map: 각 요소에 함수 적용, filter: 조건 만족 요소 추출, reduce: 누적 연산', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: map(), filter(), reduce() 함수의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'global과 nonlocal 키워드의 차이를 설명하시오.', answer: 'global: 전역 변수 참조, nonlocal: 중첩 함수에서 바깥 함수 변수 참조', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: global과 nonlocal 키워드의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '클래스 정의와 객체 생성 방법을 설명하시오.', answer: 'class 클래스명: 본문, 객체생성: 클래스명()', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 클래스 정의와 객체 생성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: '__init__ 메서드의 역할을 설명하시오.', answer: '생성자, 객체 생성 시 자동 호출되어 초기화 수행', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: __init__ 메서드의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: 'self 키워드의 의미와 역할을 설명하시오.', answer: '인스턴스 자기 자신을 참조, 메서드의 첫 번째 매개변수', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: self 키워드의 의미와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '클래스 변수와 인스턴스 변수의 차이를 설명하시오.', answer: '클래스 변수: 모든 객체 공유, 인스턴스 변수: 각 객체별 독립', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 클래스 변수와 인스턴스 변수의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: '상속(Inheritance) 문법과 super()의 사용법을 설명하시오.', answer: 'class 자식(부모):, super()로 부모 클래스 메서드 호출', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 상속(Inheritance) 문법과 super()의 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 21, question: '다중 상속과 MRO(Method Resolution Order)를 설명하시오.', answer: '여러 부모 클래스 상속, MRO는 메서드 탐색 순서(C3 선형화)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 다중 상속과 MRO(Method Resolution Order)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 22, question: '매직 메서드(특수 메서드) 5가지를 쓰시오.', answer: '__init__, __str__, __repr__, __len__, __eq__', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 매직 메서드(특수 메서드) 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 23, question: '데코레이터(Decorator)의 개념과 사용 예를 설명하시오.', answer: '함수를 감싸서 기능을 추가, @데코레이터명으로 적용', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 데코레이터(Decorator)의 개념과 사용 예를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 24, question: '예외 처리 구문 try-except-else-finally를 설명하시오.', answer: 'try: 실행, except: 예외처리, else: 예외없을 때, finally: 항상 실행', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 예외 처리 구문 try-except-else-finally를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 25, question: '파일 입출력에서 with 문 사용의 장점을 설명하시오.', answer: '자동으로 파일 닫기 처리, 예외 발생해도 안전하게 리소스 해제', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 파일 입출력에서 with 문 사용의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'common',
    name: '공통 개념',
    color: 'from-green-600 to-green-500',
    questions: [
      { id: 1, question: '변수의 정의와 명명 규칙을 설명하시오.', answer: '값을 저장하는 메모리 공간, 문자로 시작, 예약어 사용 불가', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 변수의 정의와 명명 규칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '기본 자료형(정수, 실수, 문자, 논리)의 특징을 설명하시오.', answer: '정수: int, 실수: float/double, 문자: char, 논리: boolean(true/false)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 기본 자료형(정수, 실수, 문자, 논리)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '형변환(Type Casting)의 종류 2가지를 설명하시오.', answer: '묵시적 형변환(자동), 명시적 형변환(강제 캐스팅)', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 형변환(Type Casting)의 종류 2가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '산술 연산자 5가지와 기능을 쓰시오.', answer: '+: 덧셈, -: 뺄셈, *: 곱셈, /: 나눗셈, %: 나머지', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 산술 연산자 5가지와 기능을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '비교 연산자 6가지를 쓰시오.', answer: '==, !=, <, >, <=, >=', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 비교 연산자 6가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '논리 연산자 AND, OR, NOT의 기능을 설명하시오.', answer: 'AND(&&): 둘 다 참, OR(||): 하나라도 참, NOT(!): 부정', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 논리 연산자 AND, OR, NOT의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '증감 연산자 ++와 --의 전위/후위 차이를 설명하시오.', answer: '전위(++a): 먼저 증가 후 사용, 후위(a++): 사용 후 증가', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 증감 연산자 ++와 --의 전위/후위 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '삼항 연산자(조건 연산자)의 문법을 쓰시오.', answer: '조건식 ? 참값 : 거짓값', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 삼항 연산자(조건 연산자)의 문법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '연산자 우선순위 규칙을 설명하시오.', answer: '괄호 > 단항 > 산술 > 비교 > 논리 > 대입, 같은 순위는 좌→우', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 연산자 우선순위 규칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'if-else 조건문의 실행 흐름을 설명하시오.', answer: '조건이 참이면 if 블록 실행, 거짓이면 else 블록 실행', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: if-else 조건문의 실행 흐름을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: 'switch-case 문의 특징과 break의 역할을 설명하시오.', answer: '값에 따라 분기, break 없으면 fall-through 발생', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: switch-case 문의 특징과 break의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'for 반복문의 구조와 실행 순서를 설명하시오.', answer: 'for(초기화; 조건; 증감) {본문}, 초기화→조건→본문→증감 반복', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: for 반복문의 구조와 실행 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'while과 do-while 반복문의 차이를 설명하시오.', answer: 'while: 조건 먼저 검사, do-while: 본문 먼저 실행 후 조건 검사', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: while과 do-while 반복문의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'break와 continue의 차이를 설명하시오.', answer: 'break: 반복문 완전 탈출, continue: 현재 반복 건너뛰고 다음 반복', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: break와 continue의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '중첩 반복문(다중 루프)의 실행 흐름을 설명하시오.', answer: '외부 루프 1회 실행 시 내부 루프 전체 실행', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 중첩 반복문(다중 루프)의 실행 흐름을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '재귀 함수(Recursive Function)의 정의와 구성요소를 설명하시오.', answer: '자기 자신을 호출하는 함수, 기저 조건(종료 조건)과 재귀 호출 필요', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 재귀 함수(Recursive Function)의 정의와 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: '팩토리얼을 재귀 함수로 구현하는 방법을 설명하시오.', answer: 'n! = n * (n-1)!, 기저조건: n=0이면 1 반환', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 팩토리얼을 재귀 함수로 구현하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: '피보나치 수열을 재귀로 구현할 때의 문제점을 설명하시오.', answer: '중복 계산으로 인한 지수적 시간 복잡도, 메모이제이션으로 해결', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 피보나치 수열을 재귀로 구현할 때의 문제점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '꼬리 재귀(Tail Recursion)의 개념과 장점을 설명하시오.', answer: '재귀 호출이 마지막 연산, 스택 프레임 재사용으로 최적화 가능', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 꼬리 재귀(Tail Recursion)의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: '스택 오버플로우(Stack Overflow)가 발생하는 원인을 설명하시오.', answer: '재귀 호출이 너무 깊거나 종료 조건 없을 때 스택 메모리 초과', prompt: `정보처리기사 프로그래밍 언어 활용 문제입니다.\n\n문제: 스택 오버플로우(Stack Overflow)가 발생하는 원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function ProgrammingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('programming-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('programming-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-purple-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-purple-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it/information-processor" className="text-gray-600 hover:text-purple-600">정보처리기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">프로그래밍 언어 활용</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">💻</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">프로그래밍 언어 활용 학습</h1>
                <p className="text-purple-100">정보처리기사 필기 3과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-purple-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(
              (q) => completedQuestions[`${topic.id}-${q.id}`]
            ).length;

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">
                        {topicCompleted}/{topic.questions.length} 완료
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">
                                Q{q.id}. {q.question}
                              </p>
                              <p className="text-sm text-gray-600 mb-3">
                                <strong>정답:</strong> {q.answer}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <a
                                  href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                                >
                                  🧡 Claude
                                </a>
                                <a
                                  href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                                >
                                  💚 ChatGPT
                                </a>
                                <a
                                  href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                                >
                                  💙 Gemini
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
