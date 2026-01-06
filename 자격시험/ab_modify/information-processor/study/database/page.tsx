'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'sql-basic',
    name: 'SQL 기본',
    color: 'from-cyan-600 to-cyan-500',
    questions: [
      { id: 1, question: 'SELECT 문의 기본 구조와 실행 순서를 설명하시오.', answer: 'SELECT-FROM-WHERE-GROUP BY-HAVING-ORDER BY, 실행순서: FROM-WHERE-GROUP BY-HAVING-SELECT-ORDER BY', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: SELECT 문의 기본 구조와 실행 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'WHERE 절에서 사용하는 비교 연산자 5가지를 쓰시오.', answer: '=, <>, <, >, <=, >=, BETWEEN, IN, LIKE, IS NULL', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: WHERE 절에서 사용하는 비교 연산자 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'DISTINCT 키워드의 역할과 사용법을 설명하시오.', answer: '중복된 행을 제거하여 유일한 값만 반환', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: DISTINCT 키워드의 역할과 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'ORDER BY 절에서 ASC와 DESC의 차이를 설명하시오.', answer: 'ASC: 오름차순(기본값), DESC: 내림차순', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: ORDER BY 절에서 ASC와 DESC의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'INSERT 문의 기본 구문과 다중 행 삽입 방법을 쓰시오.', answer: 'INSERT INTO 테이블(컬럼) VALUES(값), 다중행: VALUES 절 여러개 또는 SELECT 사용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: INSERT 문의 기본 구문과 다중 행 삽입 방법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'UPDATE 문의 기본 구문을 작성하시오.', answer: 'UPDATE 테이블 SET 컬럼=값 WHERE 조건', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: UPDATE 문의 기본 구문을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'DELETE 문과 TRUNCATE 문의 차이점을 설명하시오.', answer: 'DELETE: 조건부 삭제, 롤백 가능. TRUNCATE: 전체 삭제, 롤백 불가, 더 빠름', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: DELETE 문과 TRUNCATE 문의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'GROUP BY 절의 역할과 집계함수 5가지를 쓰시오.', answer: '특정 컬럼 기준 그룹화, COUNT, SUM, AVG, MAX, MIN', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: GROUP BY 절의 역할과 집계함수 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'HAVING 절과 WHERE 절의 차이점을 설명하시오.', answer: 'WHERE: 그룹화 전 조건, HAVING: 그룹화 후 조건(집계함수 사용 가능)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: HAVING 절과 WHERE 절의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'LIKE 연산자의 와일드카드 문자 %와 _의 차이를 설명하시오.', answer: '%: 0개 이상의 문자, _: 정확히 1개의 문자', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: LIKE 연산자의 와일드카드 문자 %와 _의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: 'NULL 값의 특성과 NULL 비교 방법을 설명하시오.', answer: 'NULL은 알 수 없는 값, IS NULL 또는 IS NOT NULL로 비교', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: NULL 값의 특성과 NULL 비교 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'COALESCE 함수와 NVL 함수의 역할을 설명하시오.', answer: 'NULL을 다른 값으로 대체, COALESCE는 여러 인자 중 첫 번째 NOT NULL 반환', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: COALESCE 함수와 NVL 함수의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'CASE 표현식의 사용법과 예시를 작성하시오.', answer: 'CASE WHEN 조건 THEN 결과 ELSE 기본값 END', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: CASE 표현식의 사용법과 예시를 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'BETWEEN 연산자와 IN 연산자의 차이를 설명하시오.', answer: 'BETWEEN: 범위 조건, IN: 목록 내 포함 여부', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: BETWEEN 연산자와 IN 연산자의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'UNION과 UNION ALL의 차이점을 설명하시오.', answer: 'UNION: 중복 제거, UNION ALL: 중복 포함', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: UNION과 UNION ALL의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: 'INTERSECT와 EXCEPT(MINUS) 연산의 역할을 설명하시오.', answer: 'INTERSECT: 교집합, EXCEPT/MINUS: 차집합', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: INTERSECT와 EXCEPT(MINUS) 연산의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: 'ALIAS(별칭)의 사용법과 장점을 설명하시오.', answer: '테이블명 AS 별칭 또는 컬럼명 AS 별칭, 가독성 향상 및 간결한 표현', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: ALIAS(별칭)의 사용법과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: 'TOP/LIMIT/ROWNUM의 역할과 DBMS별 차이를 설명하시오.', answer: '결과 행 수 제한, SQL Server: TOP, MySQL: LIMIT, Oracle: ROWNUM', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: TOP/LIMIT/ROWNUM의 역할과 DBMS별 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: 'DDL, DML, DCL, TCL의 종류와 대표 명령어를 쓰시오.', answer: 'DDL: CREATE/ALTER/DROP, DML: SELECT/INSERT/UPDATE/DELETE, DCL: GRANT/REVOKE, TCL: COMMIT/ROLLBACK', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: DDL, DML, DCL, TCL의 종류와 대표 명령어를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: 'CREATE TABLE 문의 기본 구문과 제약조건 지정 방법을 쓰시오.', answer: 'CREATE TABLE 테이블명(컬럼명 데이터타입 제약조건), PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: CREATE TABLE 문의 기본 구문과 제약조건 지정 방법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'join',
    name: 'JOIN',
    color: 'from-teal-600 to-teal-500',
    questions: [
      { id: 1, question: 'JOIN의 개념과 필요성을 설명하시오.', answer: '두 개 이상의 테이블을 연결하여 데이터를 조회하는 방법, 정규화된 테이블 결합', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: JOIN의 개념과 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'INNER JOIN의 개념과 기본 구문을 작성하시오.', answer: '두 테이블의 교집합, SELECT ... FROM A INNER JOIN B ON A.키=B.키', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: INNER JOIN의 개념과 기본 구문을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'LEFT OUTER JOIN의 개념과 특징을 설명하시오.', answer: '왼쪽 테이블의 모든 행 + 오른쪽 테이블의 일치하는 행, 불일치 시 NULL', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: LEFT OUTER JOIN의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'RIGHT OUTER JOIN의 개념과 특징을 설명하시오.', answer: '오른쪽 테이블의 모든 행 + 왼쪽 테이블의 일치하는 행, 불일치 시 NULL', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: RIGHT OUTER JOIN의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'FULL OUTER JOIN의 개념과 특징을 설명하시오.', answer: '양쪽 테이블의 모든 행, LEFT와 RIGHT JOIN의 합집합', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: FULL OUTER JOIN의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'CROSS JOIN의 개념과 결과 행 수를 설명하시오.', answer: '카테시안 곱, 두 테이블 행 수의 곱만큼 결과 생성', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: CROSS JOIN의 개념과 결과 행 수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'SELF JOIN의 개념과 사용 예시를 설명하시오.', answer: '같은 테이블을 자기 자신과 조인, 계층구조나 비교에 사용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: SELF JOIN의 개념과 사용 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'NATURAL JOIN의 개념과 특징을 설명하시오.', answer: '동일한 컬럼명을 자동으로 조인 조건으로 사용, 중복 컬럼 제거', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: NATURAL JOIN의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'USING 절과 ON 절의 차이점을 설명하시오.', answer: 'USING: 동일 컬럼명 지정, ON: 다른 컬럼명이나 복잡한 조건 가능', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: USING 절과 ON 절의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '등가 조인(Equi Join)과 비등가 조인(Non-Equi Join)의 차이를 설명하시오.', answer: '등가: = 연산자 사용, 비등가: BETWEEN, >, < 등 사용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 등가 조인(Equi Join)과 비등가 조인(Non-Equi Join)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '3개 이상의 테이블을 조인하는 방법을 설명하시오.', answer: '순차적으로 JOIN 절 추가, A JOIN B ON ... JOIN C ON ...', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 3개 이상의 테이블을 조인하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'JOIN 시 성능을 향상시키는 방법 3가지를 쓰시오.', answer: '인덱스 활용, 필요한 컬럼만 조회, 조인 순서 최적화', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: JOIN 시 성능을 향상시키는 방법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'Oracle의 (+) 표기법과 ANSI 조인 문법의 관계를 설명하시오.', answer: '(+)는 Oracle 고유 문법으로 OUTER JOIN 표현, ANSI 표준 권장', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: Oracle의 (+) 표기법과 ANSI 조인 문법의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '안티 조인(Anti Join)의 개념과 구현 방법을 설명하시오.', answer: '일치하지 않는 행만 반환, NOT IN 또는 NOT EXISTS 사용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 안티 조인(Anti Join)의 개념과 구현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '세미 조인(Semi Join)의 개념과 구현 방법을 설명하시오.', answer: '서브쿼리와 일치하는 행만 반환, EXISTS 또는 IN 사용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 세미 조인(Semi Join)의 개념과 구현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'subquery',
    name: '서브쿼리',
    color: 'from-blue-600 to-blue-500',
    questions: [
      { id: 1, question: '서브쿼리(Subquery)의 정의와 사용 위치를 설명하시오.', answer: '쿼리 안의 쿼리, SELECT/FROM/WHERE/HAVING 절에서 사용 가능', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 서브쿼리(Subquery)의 정의와 사용 위치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '스칼라 서브쿼리(Scalar Subquery)의 특징을 설명하시오.', answer: 'SELECT 절에서 사용, 반드시 단일 값 반환, 컬럼처럼 사용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 스칼라 서브쿼리(Scalar Subquery)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '인라인 뷰(Inline View)의 개념과 사용 예시를 설명하시오.', answer: 'FROM 절에서 사용하는 서브쿼리, 가상의 테이블처럼 동작', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 인라인 뷰(Inline View)의 개념과 사용 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '중첩 서브쿼리(Nested Subquery)의 개념을 설명하시오.', answer: 'WHERE/HAVING 절에서 사용하는 서브쿼리, 조건 비교에 활용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 중첩 서브쿼리(Nested Subquery)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '상관 서브쿼리(Correlated Subquery)의 특징을 설명하시오.', answer: '메인 쿼리의 컬럼을 서브쿼리에서 참조, 행마다 실행', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 상관 서브쿼리(Correlated Subquery)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'EXISTS와 IN 연산자의 차이점을 설명하시오.', answer: 'EXISTS: 존재 여부 확인(TRUE/FALSE), IN: 값 목록과 비교', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: EXISTS와 IN 연산자의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'NOT EXISTS와 NOT IN의 차이와 NULL 처리를 설명하시오.', answer: 'NOT IN은 NULL 포함 시 전체가 NULL, NOT EXISTS는 영향 없음', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: NOT EXISTS와 NOT IN의 차이와 NULL 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'ANY(SOME)와 ALL 연산자의 사용법을 설명하시오.', answer: 'ANY: 하나라도 만족, ALL: 모두 만족해야 함', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: ANY(SOME)와 ALL 연산자의 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '다중 행 서브쿼리와 단일 행 서브쿼리의 차이를 설명하시오.', answer: '단일 행: 비교연산자 사용, 다중 행: IN, ANY, ALL, EXISTS 사용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 다중 행 서브쿼리와 단일 행 서브쿼리의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '다중 컬럼 서브쿼리의 사용 예시를 작성하시오.', answer: 'WHERE (컬럼1, 컬럼2) IN (SELECT 컬럼1, 컬럼2 FROM ...)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 다중 컬럼 서브쿼리의 사용 예시를 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '서브쿼리를 조인으로 변환하는 방법과 장점을 설명하시오.', answer: '성능 향상 가능, 옵티마이저가 더 효율적인 실행계획 수립 가능', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 서브쿼리를 조인으로 변환하는 방법과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: 'WITH 절(CTE, Common Table Expression)의 개념과 장점을 설명하시오.', answer: '임시 결과집합 정의, 가독성 향상, 재사용 가능', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: WITH 절(CTE, Common Table Expression)의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '재귀적 CTE의 개념과 사용 예시를 설명하시오.', answer: '자기 자신을 참조하는 CTE, 계층형 데이터 처리에 활용', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 재귀적 CTE의 개념과 사용 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'INSERT ... SELECT 문의 사용법을 설명하시오.', answer: '서브쿼리 결과를 테이블에 삽입, INSERT INTO 테이블 SELECT ...', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: INSERT ... SELECT 문의 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'UPDATE/DELETE 문에서 서브쿼리 사용 방법을 설명하시오.', answer: 'SET 절이나 WHERE 절에서 서브쿼리로 값 또는 조건 지정', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: UPDATE/DELETE 문에서 서브쿼리 사용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'normalization',
    name: '정규화',
    color: 'from-purple-600 to-purple-500',
    questions: [
      { id: 1, question: '정규화(Normalization)의 정의와 목적을 설명하시오.', answer: '데이터 중복 제거, 이상현상 방지, 데이터 무결성 유지', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 정규화(Normalization)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '이상현상(Anomaly)의 3가지 유형을 설명하시오.', answer: '삽입 이상, 갱신 이상, 삭제 이상', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 이상현상(Anomaly)의 3가지 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '함수적 종속성(Functional Dependency)의 개념을 설명하시오.', answer: 'X가 Y를 결정하면 Y는 X에 함수적 종속, X→Y로 표기', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 함수적 종속성(Functional Dependency)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '제1정규형(1NF)의 조건과 예시를 설명하시오.', answer: '모든 속성이 원자값(Atomic Value)을 가져야 함, 반복 그룹 제거', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 제1정규형(1NF)의 조건과 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '제2정규형(2NF)의 조건을 설명하시오.', answer: '1NF + 부분적 함수 종속 제거, 기본키 전체에 완전 종속', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 제2정규형(2NF)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '부분적 함수 종속과 완전 함수 종속의 차이를 설명하시오.', answer: '부분: 기본키 일부에 종속, 완전: 기본키 전체에 종속', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 부분적 함수 종속과 완전 함수 종속의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '제3정규형(3NF)의 조건을 설명하시오.', answer: '2NF + 이행적 함수 종속 제거, 비기본키 속성은 기본키에만 종속', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 제3정규형(3NF)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '이행적 함수 종속(Transitive Dependency)을 설명하시오.', answer: 'X→Y, Y→Z이면 X→Z 성립, 3NF에서 제거 대상', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 이행적 함수 종속(Transitive Dependency)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'BCNF(Boyce-Codd Normal Form)의 조건을 설명하시오.', answer: '모든 결정자가 후보키여야 함, 3NF보다 강한 조건', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: BCNF(Boyce-Codd Normal Form)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '3NF와 BCNF의 차이점을 예시와 함께 설명하시오.', answer: '3NF에서는 후보키가 아닌 결정자 허용, BCNF에서는 불허', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 3NF와 BCNF의 차이점을 예시와 함께 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '제4정규형(4NF)의 조건인 다치 종속을 설명하시오.', answer: '다치 종속(MVD) 제거, X->>Y 형태의 비정상적 종속 제거', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 제4정규형(4NF)의 조건인 다치 종속을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '제5정규형(5NF)의 조건인 조인 종속을 설명하시오.', answer: '조인 종속(JD) 제거, 무손실 분해 보장', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 제5정규형(5NF)의 조건인 조인 종속을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '반정규화(Denormalization)의 개념과 적용 시기를 설명하시오.', answer: '성능 향상을 위해 정규화를 일부 되돌림, 조회 성능 개선 필요시', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 반정규화(Denormalization)의 개념과 적용 시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '반정규화 기법 3가지를 설명하시오.', answer: '테이블 병합, 테이블 분할(수직/수평), 중복 속성 추가', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 반정규화 기법 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '정규화 과정을 1NF부터 BCNF까지 순서대로 설명하시오.', answer: '1NF(원자값) → 2NF(부분종속제거) → 3NF(이행종속제거) → BCNF(결정자=후보키)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 정규화 과정을 1NF부터 BCNF까지 순서대로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'transaction',
    name: '트랜잭션',
    color: 'from-orange-600 to-orange-500',
    questions: [
      { id: 1, question: '트랜잭션(Transaction)의 정의와 특성을 설명하시오.', answer: '논리적 작업 단위, ACID 특성 보장', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 트랜잭션(Transaction)의 정의와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'ACID 특성 4가지를 각각 설명하시오.', answer: 'Atomicity(원자성), Consistency(일관성), Isolation(격리성), Durability(지속성)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: ACID 특성 4가지를 각각 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'COMMIT과 ROLLBACK의 역할을 설명하시오.', answer: 'COMMIT: 트랜잭션 확정, ROLLBACK: 트랜잭션 취소(이전 상태 복구)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: COMMIT과 ROLLBACK의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'SAVEPOINT의 개념과 사용법을 설명하시오.', answer: '트랜잭션 내 특정 지점 저장, ROLLBACK TO SAVEPOINT로 부분 롤백', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: SAVEPOINT의 개념과 사용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '동시성 제어(Concurrency Control)의 필요성을 설명하시오.', answer: '다중 트랜잭션 환경에서 데이터 일관성과 무결성 유지', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 동시성 제어(Concurrency Control)의 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '동시성 문제 4가지(갱신 손실, Dirty Read, Non-Repeatable Read, Phantom Read)를 설명하시오.', answer: '갱신손실: 덮어쓰기, Dirty Read: 커밋 전 읽기, Non-Repeatable Read: 재조회 값 변경, Phantom Read: 행 추가/삭제', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 동시성 문제 4가지(갱신 손실, Dirty Read, Non-Repeatable Read, Phantom Read)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '로킹(Locking) 기법의 개념과 종류를 설명하시오.', answer: '데이터 접근 제한, 공유 락(S-Lock)과 배타 락(X-Lock)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 로킹(Locking) 기법의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '공유 락(Shared Lock)과 배타 락(Exclusive Lock)의 차이를 설명하시오.', answer: '공유 락: 읽기만 허용, 배타 락: 읽기/쓰기 모두 차단', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 공유 락(Shared Lock)과 배타 락(Exclusive Lock)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '2단계 로킹 프로토콜(2PL)의 개념을 설명하시오.', answer: '확장 단계(락 획득만)와 축소 단계(락 해제만)로 구분, 직렬 가능성 보장', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: '2단계 로킹 프로토콜(2PL)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '교착상태(Deadlock)의 발생 조건 4가지를 쓰시오.', answer: '상호배제, 점유대기, 비선점, 환형대기', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 교착상태(Deadlock)의 발생 조건 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '교착상태 해결 방법 3가지를 설명하시오.', answer: '예방, 회피, 탐지/회복', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 교착상태 해결 방법 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '트랜잭션 격리 수준 4가지를 설명하시오.', answer: 'READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 트랜잭션 격리 수준 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '낙관적 동시성 제어와 비관적 동시성 제어의 차이를 설명하시오.', answer: '낙관적: 충돌 가정 안 함(나중에 검증), 비관적: 충돌 가정(먼저 락)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 낙관적 동시성 제어와 비관적 동시성 제어의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '회복(Recovery) 기법의 종류와 REDO, UNDO를 설명하시오.', answer: 'REDO: 재실행(커밋된 변경 반영), UNDO: 취소(미커밋 변경 복구)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 회복(Recovery) 기법의 종류와 REDO, UNDO를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '체크포인트(Checkpoint)의 역할을 설명하시오.', answer: '회복 시작점 설정, 회복 시간 단축', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 체크포인트(Checkpoint)의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'data-modeling',
    name: '데이터 모델링',
    color: 'from-pink-600 to-pink-500',
    questions: [
      { id: 1, question: '데이터 모델링의 정의와 3단계를 설명하시오.', answer: '현실세계를 데이터베이스로 표현, 개념적-논리적-물리적 모델링', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 데이터 모델링의 정의와 3단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '개념적 데이터 모델링의 목적과 산출물을 설명하시오.', answer: '업무 요구사항을 추상적으로 표현, ERD 산출', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 개념적 데이터 모델링의 목적과 산출물을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'ER 다이어그램의 구성요소 3가지를 설명하시오.', answer: '엔터티(Entity), 속성(Attribute), 관계(Relationship)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: ER 다이어그램의 구성요소 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '엔터티(Entity)의 정의와 종류를 설명하시오.', answer: '업무에서 관리하는 데이터 집합, 기본/중심/행위 엔터티', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 엔터티(Entity)의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '속성(Attribute)의 종류를 설명하시오.', answer: '기본속성, 설계속성, 파생속성 / 단일속성, 복합속성, 다중속성', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 속성(Attribute)의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '관계(Relationship)의 종류와 표기법을 설명하시오.', answer: '1:1, 1:N, M:N 관계, 카디널리티와 참여도 표기', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 관계(Relationship)의 종류와 표기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '카디널리티(Cardinality)와 선택성(Optionality)을 설명하시오.', answer: '카디널리티: 관계 참여 최대 수, 선택성: 필수/선택 참여 여부', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 카디널리티(Cardinality)와 선택성(Optionality)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '기본키(Primary Key)의 특성 3가지를 쓰시오.', answer: '유일성, NOT NULL, 최소성', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 기본키(Primary Key)의 특성 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '후보키, 기본키, 대체키, 외래키의 차이를 설명하시오.', answer: '후보키: 유일식별 가능, 기본키: 선택된 후보키, 대체키: 나머지 후보키, 외래키: 다른 테이블 참조', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 후보키, 기본키, 대체키, 외래키의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '슈퍼타입과 서브타입의 개념을 설명하시오.', answer: '슈퍼타입: 공통 속성, 서브타입: 고유 속성, 일반화/특수화 관계', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 슈퍼타입과 서브타입의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '식별 관계와 비식별 관계의 차이를 설명하시오.', answer: '식별: 부모 PK가 자식 PK에 포함, 비식별: 부모 PK가 자식 FK만', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 식별 관계와 비식별 관계의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '논리적 데이터 모델링의 목적과 활동을 설명하시오.', answer: 'DBMS에 맞게 변환, 정규화/데이터타입 정의/무결성 규칙 설정', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 논리적 데이터 모델링의 목적과 활동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '물리적 데이터 모델링에서 고려할 사항 5가지를 쓰시오.', answer: '테이블/컬럼명 결정, 데이터타입, 인덱스, 파티셔닝, 저장공간', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 물리적 데이터 모델링에서 고려할 사항 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '참조 무결성(Referential Integrity)의 개념을 설명하시오.', answer: '외래키 값은 참조 테이블의 기본키 값이거나 NULL이어야 함', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 참조 무결성(Referential Integrity)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '참조 무결성 제약의 옵션(CASCADE, SET NULL, RESTRICT)을 설명하시오.', answer: 'CASCADE: 연쇄 삭제/수정, SET NULL: NULL로 변경, RESTRICT: 삭제/수정 거부', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 참조 무결성 제약의 옵션(CASCADE, SET NULL, RESTRICT)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '도메인(Domain)의 정의와 설정 방법을 설명하시오.', answer: '속성이 가질 수 있는 값의 범위, 데이터타입/제약조건으로 정의', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 도메인(Domain)의 정의와 설정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: '뷰(View)의 개념과 장단점을 설명하시오.', answer: '가상 테이블, 보안/편의성 향상, 독립적 수정 불가/성능 저하 가능', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 뷰(View)의 개념과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: '인덱스(Index)의 개념과 종류를 설명하시오.', answer: '검색 속도 향상을 위한 자료구조, B-Tree/Hash/Bitmap 인덱스', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 인덱스(Index)의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '클러스터드 인덱스와 논클러스터드 인덱스의 차이를 설명하시오.', answer: '클러스터드: 물리적 정렬(테이블당 1개), 논클러스터드: 별도 구조(여러 개 가능)', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 클러스터드 인덱스와 논클러스터드 인덱스의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: '파티셔닝(Partitioning)의 개념과 종류를 설명하시오.', answer: '대용량 테이블 분할, Range/List/Hash/Composite 파티셔닝', prompt: `정보처리기사 데이터베이스 구축 문제입니다.\n\n문제: 파티셔닝(Partitioning)의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function DatabaseStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('database-progress');
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
    localStorage.setItem('database-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-cyan-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-cyan-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it/information-processor" className="text-gray-600 hover:text-cyan-600">정보처리기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">데이터베이스 구축</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🗄️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">데이터베이스 구축 학습</h1>
                <p className="text-cyan-100">정보처리기사 필기 2과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-cyan-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
