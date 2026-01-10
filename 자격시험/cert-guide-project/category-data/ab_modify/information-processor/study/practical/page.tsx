'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'code-execution',
    name: '프로그래밍 코드 실행 결과',
    color: 'from-emerald-600 to-emerald-500',
    questions: [
      { id: 1, question: '다음 C 코드의 실행 결과를 쓰시오.\n```c\nint a = 5, b = 3;\nprintf("%d", a++ + ++b);\n```', answer: '9', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 C 코드의 실행 결과를 쓰시오.\nint a = 5, b = 3;\nprintf("%d", a++ + ++b);\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 코드 실행 흐름 분석\n3. 연산자 우선순위와 증감 연산자 동작\n4. 유사 문제 3개` },
      { id: 2, question: '다음 C 코드의 실행 결과를 쓰시오.\n```c\nint arr[] = {1, 2, 3, 4, 5};\nint *p = arr;\nprintf("%d", *(p + 2));\n```', answer: '3', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 C 코드의 실행 결과를 쓰시오.\nint arr[] = {1, 2, 3, 4, 5};\nint *p = arr;\nprintf("%d", *(p + 2));\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (포인터와 배열)\n2. 코드 실행 흐름 분석\n3. 포인터 연산 상세 설명\n4. 유사 문제 3개` },
      { id: 3, question: '다음 C 코드의 실행 결과를 쓰시오.\n```c\nint i, sum = 0;\nfor(i = 1; i <= 10; i += 2)\n    sum += i;\nprintf("%d", sum);\n```', answer: '25', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 C 코드의 실행 결과를 쓰시오.\nint i, sum = 0;\nfor(i = 1; i <= 10; i += 2)\n    sum += i;\nprintf("%d", sum);\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (for 반복문)\n2. 반복 과정 상세 추적\n3. 결과값 도출 과정\n4. 유사 문제 3개` },
      { id: 4, question: '다음 Java 코드의 실행 결과를 쓰시오.\n```java\nString str = "Hello";\nSystem.out.println(str.substring(1, 4));\n```', answer: 'ell', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Java 코드의 실행 결과를 쓰시오.\nString str = "Hello";\nSystem.out.println(str.substring(1, 4));\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (String 메서드)\n2. substring 메서드 동작 원리\n3. 인덱스 범위 분석\n4. 유사 문제 3개` },
      { id: 5, question: '다음 Java 코드의 실행 결과를 쓰시오.\n```java\nint[] arr = {3, 1, 4, 1, 5};\nArrays.sort(arr);\nSystem.out.println(arr[2]);\n```', answer: '3', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Java 코드의 실행 결과를 쓰시오.\nint[] arr = {3, 1, 4, 1, 5};\nArrays.sort(arr);\nSystem.out.println(arr[2]);\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (배열 정렬)\n2. 정렬 전후 배열 상태\n3. 인덱스 접근 분석\n4. 유사 문제 3개` },
      { id: 6, question: '다음 Python 코드의 실행 결과를 쓰시오.\n```python\nlist1 = [1, 2, 3, 4, 5]\nprint(list1[1:4])\n```', answer: '[2, 3, 4]', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Python 코드의 실행 결과를 쓰시오.\nlist1 = [1, 2, 3, 4, 5]\nprint(list1[1:4])\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (리스트 슬라이싱)\n2. 슬라이싱 문법 상세 설명\n3. 인덱스 범위 분석\n4. 유사 문제 3개` },
      { id: 7, question: '다음 Python 코드의 실행 결과를 쓰시오.\n```python\ndef func(a, b=10):\n    return a + b\nprint(func(5))\n```', answer: '15', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Python 코드의 실행 결과를 쓰시오.\ndef func(a, b=10):\n    return a + b\nprint(func(5))\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (기본 매개변수)\n2. 함수 호출 시 인자 전달\n3. 기본값 적용 원리\n4. 유사 문제 3개` },
      { id: 8, question: '다음 C 코드의 실행 결과를 쓰시오.\n```c\nint a = 10;\nint b = a > 5 ? a * 2 : a / 2;\nprintf("%d", b);\n```', answer: '20', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 C 코드의 실행 결과를 쓰시오.\nint a = 10;\nint b = a > 5 ? a * 2 : a / 2;\nprintf("%d", b);\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (삼항 연산자)\n2. 조건 평가 과정\n3. 연산 결과 도출\n4. 유사 문제 3개` },
      { id: 9, question: '다음 Java 코드의 실행 결과를 쓰시오.\n```java\nint x = 5;\nswitch(x) {\n    case 3: System.out.print("A"); break;\n    case 5: System.out.print("B");\n    case 7: System.out.print("C"); break;\n    default: System.out.print("D");\n}\n```', answer: 'BC', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Java 코드의 실행 결과를 쓰시오.\nint x = 5;\nswitch(x) {\n    case 3: System.out.print("A"); break;\n    case 5: System.out.print("B");\n    case 7: System.out.print("C"); break;\n    default: System.out.print("D");\n}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (switch문과 fall-through)\n2. 실행 흐름 분석\n3. break 유무에 따른 동작\n4. 유사 문제 3개` },
      { id: 10, question: '다음 Python 코드의 실행 결과를 쓰시오.\n```python\nresult = [x**2 for x in range(1, 5)]\nprint(sum(result))\n```', answer: '30', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Python 코드의 실행 결과를 쓰시오.\nresult = [x**2 for x in range(1, 5)]\nprint(sum(result))\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (리스트 컴프리헨션)\n2. 리스트 생성 과정\n3. sum 함수 결과\n4. 유사 문제 3개` },
      { id: 11, question: '다음 C 코드의 실행 결과를 쓰시오.\n```c\nint func(int n) {\n    if(n <= 1) return n;\n    return func(n-1) + func(n-2);\n}\nprintf("%d", func(6));\n```', answer: '8', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 C 코드의 실행 결과를 쓰시오.\nint func(int n) {\n    if(n <= 1) return n;\n    return func(n-1) + func(n-2);\n}\nprintf("%d", func(6));\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (재귀함수, 피보나치)\n2. 재귀 호출 트리 분석\n3. 결과값 도출 과정\n4. 유사 문제 3개` },
      { id: 12, question: '다음 Java 코드의 실행 결과를 쓰시오.\n```java\nclass Parent {\n    void show() { System.out.print("P"); }\n}\nclass Child extends Parent {\n    void show() { System.out.print("C"); }\n}\nParent p = new Child();\np.show();\n```', answer: 'C', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Java 코드의 실행 결과를 쓰시오.\nclass Parent {\n    void show() { System.out.print("P"); }\n}\nclass Child extends Parent {\n    void show() { System.out.print("C"); }\n}\nParent p = new Child();\np.show();\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (다형성, 오버라이딩)\n2. 객체 생성과 참조 분석\n3. 메서드 호출 결정 원리\n4. 유사 문제 3개` },
      { id: 13, question: '다음 Python 코드의 실행 결과를 쓰시오.\n```python\ndict1 = {"a": 1, "b": 2, "c": 3}\nprint(list(dict1.keys())[1])\n```', answer: 'b', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Python 코드의 실행 결과를 쓰시오.\ndict1 = {"a": 1, "b": 2, "c": 3}\nprint(list(dict1.keys())[1])\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (딕셔너리 메서드)\n2. keys() 메서드 동작\n3. 인덱스 접근 분석\n4. 유사 문제 3개` },
      { id: 14, question: '다음 C 코드의 실행 결과를 쓰시오.\n```c\nchar str[] = "HELLO";\nprintf("%c", *(str + 2));\n```', answer: 'L', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 C 코드의 실행 결과를 쓰시오.\nchar str[] = "HELLO";\nprintf("%c", *(str + 2));\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (문자 배열과 포인터)\n2. 포인터 연산 분석\n3. 문자 접근 원리\n4. 유사 문제 3개` },
      { id: 15, question: '다음 Java 코드의 실행 결과를 쓰시오.\n```java\nint[][] arr = {{1,2},{3,4},{5,6}};\nSystem.out.println(arr[1][0] + arr[2][1]);\n```', answer: '9', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 다음 Java 코드의 실행 결과를 쓰시오.\nint[][] arr = {{1,2},{3,4},{5,6}};\nSystem.out.println(arr[1][0] + arr[2][1]);\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (2차원 배열)\n2. 배열 구조 분석\n3. 인덱스 접근과 연산\n4. 유사 문제 3개` },
    ],
  },
  {
    id: 'sql',
    name: 'SQL 작성',
    color: 'from-emerald-600 to-emerald-500',
    questions: [
      { id: 1, question: '학생 테이블에서 학과가 "컴퓨터"인 학생의 이름을 조회하는 SQL을 작성하시오.', answer: 'SELECT 이름 FROM 학생 WHERE 학과 = \'컴퓨터\';', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 학생 테이블에서 학과가 "컴퓨터"인 학생의 이름을 조회하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (SELECT, WHERE)\n2. SQL 문법 상세 설명\n3. 실행 결과 예시\n4. 유사 문제 3개` },
      { id: 2, question: '사원 테이블에서 급여가 300만원 이상인 사원의 수를 구하는 SQL을 작성하시오.', answer: 'SELECT COUNT(*) FROM 사원 WHERE 급여 >= 3000000;', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 사원 테이블에서 급여가 300만원 이상인 사원의 수를 구하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (집계함수 COUNT)\n2. SQL 문법 상세 설명\n3. 실행 결과 예시\n4. 유사 문제 3개` },
      { id: 3, question: '주문 테이블과 고객 테이블을 고객번호로 조인하여 고객명과 주문일자를 조회하는 SQL을 작성하시오.', answer: 'SELECT 고객.고객명, 주문.주문일자 FROM 주문 JOIN 고객 ON 주문.고객번호 = 고객.고객번호;', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 주문 테이블과 고객 테이블을 고객번호로 조인하여 고객명과 주문일자를 조회하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (JOIN)\n2. SQL 문법 상세 설명\n3. 조인 유형별 차이\n4. 유사 문제 3개` },
      { id: 4, question: '학생 테이블에서 학과별 학생 수를 구하는 SQL을 작성하시오.', answer: 'SELECT 학과, COUNT(*) FROM 학생 GROUP BY 학과;', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 학생 테이블에서 학과별 학생 수를 구하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (GROUP BY)\n2. SQL 문법 상세 설명\n3. 실행 결과 예시\n4. 유사 문제 3개` },
      { id: 5, question: '사원 테이블에서 급여가 가장 높은 사원의 이름을 조회하는 SQL을 작성하시오. (서브쿼리 사용)', answer: 'SELECT 이름 FROM 사원 WHERE 급여 = (SELECT MAX(급여) FROM 사원);', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 사원 테이블에서 급여가 가장 높은 사원의 이름을 조회하는 SQL을 작성하시오. (서브쿼리 사용)\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (서브쿼리)\n2. SQL 문법 상세 설명\n3. 서브쿼리 실행 순서\n4. 유사 문제 3개` },
      { id: 6, question: '상품 테이블에서 가격이 10000원 이상이고 재고가 50개 이상인 상품명을 조회하는 SQL을 작성하시오.', answer: 'SELECT 상품명 FROM 상품 WHERE 가격 >= 10000 AND 재고 >= 50;', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 상품 테이블에서 가격이 10000원 이상이고 재고가 50개 이상인 상품명을 조회하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (AND 조건)\n2. SQL 문법 상세 설명\n3. 복합 조건 활용\n4. 유사 문제 3개` },
      { id: 7, question: '회원 테이블에서 이름이 "김"으로 시작하는 회원을 조회하는 SQL을 작성하시오.', answer: 'SELECT * FROM 회원 WHERE 이름 LIKE \'김%\';', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 회원 테이블에서 이름이 "김"으로 시작하는 회원을 조회하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (LIKE 연산자)\n2. 와일드카드 문자 설명\n3. 패턴 매칭 예시\n4. 유사 문제 3개` },
      { id: 8, question: '부서별 평균 급여가 300만원 이상인 부서를 조회하는 SQL을 작성하시오.', answer: 'SELECT 부서 FROM 사원 GROUP BY 부서 HAVING AVG(급여) >= 3000000;', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 부서별 평균 급여가 300만원 이상인 부서를 조회하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (HAVING)\n2. WHERE와 HAVING의 차이\n3. GROUP BY와 함께 사용\n4. 유사 문제 3개` },
      { id: 9, question: '사원 테이블에 새로운 사원(사번: 1001, 이름: 홍길동, 부서: 개발팀)을 추가하는 SQL을 작성하시오.', answer: 'INSERT INTO 사원(사번, 이름, 부서) VALUES(1001, \'홍길동\', \'개발팀\');', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 사원 테이블에 새로운 사원(사번: 1001, 이름: 홍길동, 부서: 개발팀)을 추가하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (INSERT)\n2. SQL 문법 상세 설명\n3. 데이터 입력 시 주의사항\n4. 유사 문제 3개` },
      { id: 10, question: '사원 테이블에서 개발팀 사원의 급여를 10% 인상하는 SQL을 작성하시오.', answer: 'UPDATE 사원 SET 급여 = 급여 * 1.1 WHERE 부서 = \'개발팀\';', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 사원 테이블에서 개발팀 사원의 급여를 10% 인상하는 SQL을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리 (UPDATE)\n2. SQL 문법 상세 설명\n3. 조건부 UPDATE 활용\n4. 유사 문제 3개` },
    ],
  },
  {
    id: 'uml-design',
    name: 'UML/설계',
    color: 'from-emerald-600 to-emerald-500',
    questions: [
      { id: 1, question: 'UML 다이어그램 중 시스템의 기능과 사용자 관점을 표현하는 다이어그램의 이름을 쓰시오.', answer: '유스케이스 다이어그램 (Use Case Diagram)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: UML 다이어그램 중 시스템의 기능과 사용자 관점을 표현하는 다이어그램의 이름을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 구성요소 설명\n3. 작성 예시\n4. 관련 문제 3개` },
      { id: 2, question: '클래스 간의 관계에서 "부분-전체" 관계를 나타내며, 전체 객체가 소멸해도 부분 객체가 존재할 수 있는 관계를 쓰시오.', answer: '집합 관계 (Aggregation)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 클래스 간의 관계에서 "부분-전체" 관계를 나타내며, 전체 객체가 소멸해도 부분 객체가 존재할 수 있는 관계를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. Aggregation vs Composition 비교\n3. UML 표기법\n4. 관련 문제 3개` },
      { id: 3, question: '객체 간의 메시지 교환을 시간 순서에 따라 표현하는 UML 다이어그램을 쓰시오.', answer: '시퀀스 다이어그램 (Sequence Diagram)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 객체 간의 메시지 교환을 시간 순서에 따라 표현하는 UML 다이어그램을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 구성요소 (생명선, 활성박스 등)\n3. 작성 예시\n4. 관련 문제 3개` },
      { id: 4, question: 'GoF 디자인 패턴 중 객체 생성을 서브클래스에서 결정하도록 하는 생성 패턴의 이름을 쓰시오.', answer: '팩토리 메서드 패턴 (Factory Method Pattern)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: GoF 디자인 패턴 중 객체 생성을 서브클래스에서 결정하도록 하는 생성 패턴의 이름을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 패턴 구조 설명\n3. 코드 예시\n4. 관련 문제 3개` },
      { id: 5, question: '시스템에서 단 하나의 인스턴스만 생성하여 사용하는 디자인 패턴의 이름을 쓰시오.', answer: '싱글톤 패턴 (Singleton Pattern)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 시스템에서 단 하나의 인스턴스만 생성하여 사용하는 디자인 패턴의 이름을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 구현 방법\n3. 코드 예시\n4. 관련 문제 3개` },
      { id: 6, question: '클래스의 속성(Attribute)을 외부에서 접근할 수 없도록 하고, 메서드를 통해서만 접근하도록 하는 객체지향 원칙을 쓰시오.', answer: '캡슐화 (Encapsulation) / 정보 은닉', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 클래스의 속성(Attribute)을 외부에서 접근할 수 없도록 하고, 메서드를 통해서만 접근하도록 하는 객체지향 원칙을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 접근 제어자 설명\n3. 코드 예시\n4. 관련 문제 3개` },
      { id: 7, question: 'UML에서 <<include>>와 <<extend>> 관계의 차이점을 설명하시오.', answer: 'include: 필수 포함, extend: 선택적 확장', prompt: `정보처리기사 실기 문제입니다.\n\n문제: UML에서 <<include>>와 <<extend>> 관계의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 각 관계의 특징\n3. 사용 예시\n4. 관련 문제 3개` },
      { id: 8, question: '하나의 메서드가 다양한 타입의 객체를 처리할 수 있는 객체지향 특성을 쓰시오.', answer: '다형성 (Polymorphism)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 하나의 메서드가 다양한 타입의 객체를 처리할 수 있는 객체지향 특성을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 오버로딩 vs 오버라이딩\n3. 코드 예시\n4. 관련 문제 3개` },
    ],
  },
  {
    id: 'new-tech-security',
    name: '신기술/보안 용어',
    color: 'from-emerald-600 to-emerald-500',
    questions: [
      { id: 1, question: '블록체인 네트워크에서 거래 기록을 검증하고 새로운 블록을 생성하는 과정을 무엇이라 하는지 쓰시오.', answer: '마이닝 (Mining) / 채굴', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 블록체인 네트워크에서 거래 기록을 검증하고 새로운 블록을 생성하는 과정을 무엇이라 하는지 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 마이닝 과정 설명\n3. 합의 알고리즘 종류\n4. 관련 문제 3개` },
      { id: 2, question: '사용자 몰래 설치되어 개인정보를 수집하거나 시스템을 손상시키는 악성 소프트웨어의 총칭을 쓰시오.', answer: '멀웨어 (Malware)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 사용자 몰래 설치되어 개인정보를 수집하거나 시스템을 손상시키는 악성 소프트웨어의 총칭을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 멀웨어 종류 (바이러스, 웜, 트로이목마 등)\n3. 대응 방안\n4. 관련 문제 3개` },
      { id: 3, question: '인공지능 기술 중 인간의 뇌 신경망을 모방한 학습 알고리즘을 무엇이라 하는지 쓰시오.', answer: '딥러닝 (Deep Learning) / 심층학습', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 인공지능 기술 중 인간의 뇌 신경망을 모방한 학습 알고리즘을 무엇이라 하는지 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 신경망 구조 설명\n3. 활용 분야\n4. 관련 문제 3개` },
      { id: 4, question: '네트워크에 연결된 다양한 사물들이 데이터를 주고받는 기술을 영어 약어 3글자로 쓰시오.', answer: 'IoT (Internet of Things)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 네트워크에 연결된 다양한 사물들이 데이터를 주고받는 기술을 영어 약어 3글자로 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. IoT 구성요소\n3. 활용 사례\n4. 관련 문제 3개` },
      { id: 5, question: 'SQL 인젝션 공격을 방지하기 위해 사용하는 DB 접근 기법으로, SQL 쿼리를 미리 컴파일하여 사용하는 방식을 쓰시오.', answer: 'Prepared Statement / 선처리 질의문', prompt: `정보처리기사 실기 문제입니다.\n\n문제: SQL 인젝션 공격을 방지하기 위해 사용하는 DB 접근 기법으로, SQL 쿼리를 미리 컴파일하여 사용하는 방식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. SQL 인젝션 공격 원리\n3. 방어 방법\n4. 관련 문제 3개` },
      { id: 6, question: '웹사이트에 악성 스크립트를 삽입하여 사용자의 세션 정보를 탈취하는 공격 기법을 영문 약어로 쓰시오.', answer: 'XSS (Cross-Site Scripting)', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 웹사이트에 악성 스크립트를 삽입하여 사용자의 세션 정보를 탈취하는 공격 기법을 영문 약어로 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 공격 유형 (Stored, Reflected, DOM)\n3. 방어 방법\n4. 관련 문제 3개` },
      { id: 7, question: '데이터를 암호화하고 복호화하는 데 동일한 키를 사용하는 암호화 방식을 쓰시오.', answer: '대칭키 암호화 / 비밀키 암호화', prompt: `정보처리기사 실기 문제입니다.\n\n문제: 데이터를 암호화하고 복호화하는 데 동일한 키를 사용하는 암호화 방식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 대표적 알고리즘 (AES, DES 등)\n3. 비대칭키와 비교\n4. 관련 문제 3개` },
    ],
  },
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('practical-progress');
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
    localStorage.setItem('practical-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-emerald-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-emerald-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it/information-processor" className="text-gray-600 hover:text-emerald-600">정보처리기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">💻</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">실기 학습</h1>
                <p className="text-emerald-100">정보처리기사 실기</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-emerald-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
                              <p className="font-medium text-gray-800 mb-2 whitespace-pre-wrap">
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
