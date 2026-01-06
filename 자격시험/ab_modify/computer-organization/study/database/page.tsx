'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'db-concept',
    name: '데이터베이스 개념',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '데이터베이스의 정의와 특징 4가지를 설명하시오.', answer: '통합, 저장, 운영, 공용 데이터 / 실시간 접근, 동시 공유, 내용 참조, 지속적 변화', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 데이터베이스의 정의와 특징 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'DBMS의 기능 3가지를 설명하시오.', answer: '정의(DDL), 조작(DML), 제어(DCL) 기능', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: DBMS의 기능 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '스키마의 3계층 구조를 설명하시오.', answer: '외부 스키마(뷰), 개념 스키마(전체 논리), 내부 스키마(물리 구조)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 스키마의 3계층 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '데이터 독립성의 두 가지 유형을 설명하시오.', answer: '논리적 독립성(개념-외부), 물리적 독립성(내부-개념)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 데이터 독립성의 두 가지 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '데이터 모델의 구성요소 3가지를 설명하시오.', answer: '구조(Structure), 연산(Operation), 제약조건(Constraint)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 데이터 모델의 구성요소 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'E-R 다이어그램의 구성요소를 설명하시오.', answer: '개체(사각형), 속성(타원), 관계(마름모), 연결선', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: E-R 다이어그램의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '관계형 데이터베이스의 릴레이션 구성요소를 설명하시오.', answer: '튜플(행), 속성(열), 도메인, 카디널리티, 차수', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 관계형 데이터베이스의 릴레이션 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '키(Key)의 종류 5가지를 설명하시오.', answer: '후보키, 기본키, 대체키, 슈퍼키, 외래키', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 키(Key)의 종류 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '무결성 제약조건의 종류를 설명하시오.', answer: '개체 무결성, 참조 무결성, 도메인 무결성, 사용자 정의 무결성', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 무결성 제약조건의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '관계 대수 연산자 8가지를 설명하시오.', answer: 'Select, Project, Join, Division, Union, Intersection, Difference, Cartesian Product', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 관계 대수 연산자 8가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'normalization',
    name: '정규화',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '정규화의 목적을 설명하시오.', answer: '데이터 중복 최소화, 이상(Anomaly) 방지, 무결성 보장', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 정규화의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '이상(Anomaly)의 3가지 종류를 설명하시오.', answer: '삽입 이상, 삭제 이상, 갱신 이상', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 이상(Anomaly)의 3가지 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '함수적 종속성(Functional Dependency)을 설명하시오.', answer: 'X→Y: X 값이 Y 값을 유일하게 결정', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 함수적 종속성(Functional Dependency)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '제1정규형(1NF)의 조건을 설명하시오.', answer: '모든 속성이 원자값(Atomic Value)만 가짐', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 제1정규형(1NF)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '제2정규형(2NF)의 조건을 설명하시오.', answer: '1NF + 부분 함수 종속 제거 (완전 함수 종속)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 제2정규형(2NF)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '제3정규형(3NF)의 조건을 설명하시오.', answer: '2NF + 이행적 함수 종속 제거', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 제3정규형(3NF)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'BCNF(Boyce-Codd Normal Form)의 조건을 설명하시오.', answer: '모든 결정자가 후보키여야 함', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: BCNF(Boyce-Codd Normal Form)의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '제4정규형(4NF)과 다치 종속성을 설명하시오.', answer: 'BCNF + 다치 종속 제거, X→→Y', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 제4정규형(4NF)과 다치 종속성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '제5정규형(5NF)과 조인 종속성을 설명하시오.', answer: '4NF + 조인 종속 제거, 무손실 분해', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 제5정규형(5NF)과 조인 종속성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '반정규화(Denormalization)의 목적과 기법을 설명하시오.', answer: '성능 향상 목적, 테이블 병합/분할/중복 속성 추가', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 반정규화(Denormalization)의 목적과 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'sql',
    name: 'SQL',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: 'DDL 명령어 4가지와 용도를 설명하시오.', answer: 'CREATE(생성), ALTER(수정), DROP(삭제), TRUNCATE(초기화)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: DDL 명령어 4가지와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'DML 명령어 4가지와 용도를 설명하시오.', answer: 'SELECT(조회), INSERT(삽입), UPDATE(갱신), DELETE(삭제)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: DML 명령어 4가지와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'DCL 명령어와 용도를 설명하시오.', answer: 'GRANT(권한 부여), REVOKE(권한 회수)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: DCL 명령어와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'JOIN의 종류 4가지를 설명하시오.', answer: 'INNER JOIN, LEFT/RIGHT OUTER JOIN, FULL OUTER JOIN, CROSS JOIN', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: JOIN의 종류 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '서브쿼리의 종류와 위치를 설명하시오.', answer: '스칼라(SELECT), 인라인뷰(FROM), 중첩(WHERE)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 서브쿼리의 종류와 위치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '집계 함수 5가지를 설명하시오.', answer: 'COUNT, SUM, AVG, MAX, MIN', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 집계 함수 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'GROUP BY와 HAVING의 차이를 설명하시오.', answer: 'GROUP BY: 그룹화, HAVING: 그룹에 대한 조건(집계함수 사용)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: GROUP BY와 HAVING의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'VIEW의 특징과 장점을 설명하시오.', answer: '가상 테이블, 보안/단순화/독립성 제공, 물리적 저장 X', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: VIEW의 특징과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'UNION과 UNION ALL의 차이를 설명하시오.', answer: 'UNION: 중복 제거, UNION ALL: 중복 포함', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: UNION과 UNION ALL의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'DELETE, DROP, TRUNCATE의 차이를 설명하시오.', answer: 'DELETE: 행 삭제(롤백O), DROP: 테이블 삭제, TRUNCATE: 전체 행 삭제(롤백X)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: DELETE, DROP, TRUNCATE의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'transaction',
    name: '트랜잭션',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '트랜잭션의 ACID 특성을 설명하시오.', answer: 'Atomicity(원자성), Consistency(일관성), Isolation(고립성), Durability(영속성)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 트랜잭션의 ACID 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '트랜잭션의 상태 5가지를 설명하시오.', answer: '활동, 부분완료, 완료, 실패, 철회', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 트랜잭션의 상태 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'COMMIT과 ROLLBACK의 역할을 설명하시오.', answer: 'COMMIT: 변경사항 확정, ROLLBACK: 변경사항 취소', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: COMMIT과 ROLLBACK의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '동시성 제어의 필요성과 문제점을 설명하시오.', answer: '갱신 분실, 현황 파악 오류, 모순성, 연쇄 복귀', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 동시성 제어의 필요성과 문제점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '로킹(Locking) 기법의 종류를 설명하시오.', answer: '공유 락(S-lock), 배타 락(X-lock), 2단계 로킹', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 로킹(Locking) 기법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '교착상태(Deadlock)의 발생조건 4가지를 설명하시오.', answer: '상호 배제, 점유와 대기, 비선점, 순환 대기', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 교착상태(Deadlock)의 발생조건 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '트랜잭션 격리 수준 4가지를 설명하시오.', answer: 'Read Uncommitted, Read Committed, Repeatable Read, Serializable', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 트랜잭션 격리 수준 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'Dirty Read, Non-Repeatable Read, Phantom Read를 설명하시오.', answer: 'Dirty: 미커밋 데이터 읽기, Non-Repeatable: 같은 쿼리 다른 결과, Phantom: 새 행 추가/삭제', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: Dirty Read, Non-Repeatable Read, Phantom Read를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '타임스탬프 기반 동시성 제어를 설명하시오.', answer: '트랜잭션 시작 시간으로 순서 결정, 로킹 없이 직렬화', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 타임스탬프 기반 동시성 제어를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'MVCC(다중 버전 동시성 제어)를 설명하시오.', answer: '데이터의 여러 버전 유지, 읽기-쓰기 충돌 최소화', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: MVCC(다중 버전 동시성 제어)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'recovery-index',
    name: '회복과 인덱스',
    color: 'from-red-500 to-red-400',
    questions: [
      { id: 1, question: '데이터베이스 회복 기법의 종류를 설명하시오.', answer: '지연 갱신, 즉시 갱신, 검사점, 그림자 페이징', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 데이터베이스 회복 기법의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'REDO와 UNDO의 역할을 설명하시오.', answer: 'REDO: 커밋된 트랜잭션 재실행, UNDO: 미커밋 트랜잭션 취소', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: REDO와 UNDO의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '체크포인트(Checkpoint) 회복 기법을 설명하시오.', answer: '주기적으로 검사점 설정, 그 이후 트랜잭션만 회복 대상', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 체크포인트(Checkpoint) 회복 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '로그 기반 회복의 WAL(Write-Ahead Logging) 원칙을 설명하시오.', answer: '데이터 변경 전 로그 먼저 기록, 회복의 기반', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: '로그 기반 회복의 WAL(Write-Ahead Logging) 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '인덱스의 개념과 장단점을 설명하시오.', answer: '검색 속도 향상, 추가 저장공간 필요, 삽입/수정/삭제 성능 저하', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 인덱스의 개념과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'B-트리 인덱스와 B+트리 인덱스의 차이를 설명하시오.', answer: 'B+트리: 리프 노드에만 데이터, 리프 연결, 범위 검색 효율적', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: B-트리 인덱스와 B+트리 인덱스의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '클러스터드 인덱스와 넌클러스터드 인덱스의 차이를 설명하시오.', answer: '클러스터드: 물리적 정렬(1개), 넌클러스터드: 논리적 순서(여러 개)', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 클러스터드 인덱스와 넌클러스터드 인덱스의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '해시 인덱스의 특징을 설명하시오.', answer: '동등 비교에 최적화, O(1) 검색, 범위 검색 부적합', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 해시 인덱스의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '복합 인덱스 설계 시 고려사항을 설명하시오.', answer: '선행 컬럼 중요, 카디널리티 높은 컬럼 우선, 쿼리 패턴 분석', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 복합 인덱스 설계 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '쿼리 실행계획과 인덱스 튜닝을 설명하시오.', answer: 'EXPLAIN으로 실행계획 분석, Full Scan 회피, 인덱스 힌트 활용', prompt: `전자계산기조직응용기사 데이터베이스 문제입니다.\n\n문제: 쿼리 실행계획과 인덱스 튜닝을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function DatabasePage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['db-concept']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computer-org-database-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('computer-org-database-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (topicId: string, questionId: number) => {
    setCompletedQuestions(prev => {
      const topicCompleted = prev[topicId] || [];
      const newCompleted = topicCompleted.includes(questionId)
        ? topicCompleted.filter(id => id !== questionId)
        : [...topicCompleted, questionId];
      return { ...prev, [topicId]: newCompleted };
    });
  };

  const getTopicProgress = (topicId: string, total: number) => {
    const completed = completedQuestions[topicId]?.length || 0;
    return Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
    const totalCompleted = Object.values(completedQuestions).reduce((acc, arr) => acc + arr.length, 0);
    return Math.round((totalCompleted / totalQuestions) * 100);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-blue-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-organization" className="text-gray-600 hover:text-blue-600">전자계산기조직응용기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">데이터베이스</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🗄️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">데이터베이스</h1>
              <p className="text-blue-100">전자계산기조직응용기사 4과목 - DB개념, 정규화, SQL, 트랜잭션</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-blue-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topics */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    {topic.questions.length}문항
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }}
                    />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border ${
                        completedQuestions[topic.id]?.includes(q.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            completedQuestions[topic.id]?.includes(q.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-blue-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 학습 도우미</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600 whitespace-pre-line">{currentPrompt}</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                위 프롬프트를 복사하여 Claude AI에게 질문하세요.
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentPrompt);
                  alert('프롬프트가 복사되었습니다!');
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
