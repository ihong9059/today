'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'methodology',
    name: '개발 방법론',
    color: 'from-indigo-500 to-indigo-400',
    questions: [
      { id: 1, question: '폭포수 모델의 특징과 장단점을 설명하시오.', answer: '순차적 진행, 문서 중심, 요구사항 명확할 때 적합. 단점: 피드백 어려움, 변경에 취약', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 폭포수 모델의 특징과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폭포수 모델의 개념\n2. 개발 단계별 특징\n3. 장점과 단점\n4. 적합한 프로젝트 유형\n5. 연습문제 3개` },
      { id: 2, question: '애자일 방법론의 4가지 핵심 가치를 쓰시오.', answer: '개인과 상호작용, 작동하는 소프트웨어, 고객과의 협력, 변화에 대응', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 애자일 방법론의 4가지 핵심 가치를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 애자일 선언문의 배경\n2. 4가지 핵심 가치 상세 설명\n3. 12가지 원칙\n4. 전통적 방법론과의 비교\n5. 연습문제 3개` },
      { id: 3, question: '스크럼(Scrum)의 3가지 역할을 설명하시오.', answer: '제품 책임자(Product Owner), 스크럼 마스터, 개발팀', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 스크럼(Scrum)의 3가지 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스크럼의 개념\n2. 3가지 역할의 책임과 권한\n3. 스크럼 산출물(백로그, 번다운 차트)\n4. 스크럼 이벤트(스프린트, 데일리 스크럼)\n5. 연습문제 3개` },
      { id: 4, question: '스프린트(Sprint)의 개념과 일반적인 기간을 쓰시오.', answer: '타임박스된 반복 주기, 일반적으로 1-4주(보통 2주)', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 스프린트(Sprint)의 개념과 일반적인 기간을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 스프린트의 정의\n2. 스프린트 계획 회의\n3. 스프린트 리뷰와 회고\n4. 스프린트 목표 설정 방법\n5. 연습문제 3개` },
      { id: 5, question: 'XP(Extreme Programming)의 12가지 실천법 중 5가지를 쓰시오.', answer: '짝 프로그래밍, 지속적 통합, TDD, 리팩토링, 집단 코드 소유', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: XP(Extreme Programming)의 12가지 실천법 중 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. XP의 개념과 특징\n2. 12가지 실천법 전체 설명\n3. 각 실천법의 효과\n4. XP의 장단점\n5. 연습문제 3개` },
      { id: 6, question: '나선형 모델의 4단계를 순서대로 쓰시오.', answer: '계획 → 위험 분석 → 개발 → 평가', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 나선형 모델의 4단계를 순서대로 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 나선형 모델의 개념\n2. 4단계 상세 설명\n3. 위험 분석의 중요성\n4. 폭포수 모델과의 비교\n5. 연습문제 3개` },
      { id: 7, question: 'DevOps의 핵심 목표와 CI/CD의 개념을 설명하시오.', answer: '개발과 운영의 협업, 지속적 통합/지속적 배포를 통한 빠른 피드백', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: DevOps의 핵심 목표와 CI/CD의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DevOps의 정의와 목표\n2. CI(지속적 통합)의 개념\n3. CD(지속적 배포)의 개념\n4. DevOps 도구 체인\n5. 연습문제 3개` },
      { id: 8, question: '칸반(Kanban)의 핵심 원칙 3가지를 쓰시오.', answer: '작업 시각화, WIP(진행 중 작업) 제한, 흐름 관리', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 칸반(Kanban)의 핵심 원칙 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 칸반의 기원과 개념\n2. 핵심 원칙 상세 설명\n3. 칸반 보드 구성\n4. 스크럼과의 차이점\n5. 연습문제 3개` },
      { id: 9, question: 'V 모델에서 단위 테스트, 통합 테스트, 시스템 테스트와 대응되는 개발 단계를 쓰시오.', answer: '단위-상세설계, 통합-시스템설계, 시스템-요구사항분석', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: V 모델에서 단위 테스트, 통합 테스트, 시스템 테스트와 대응되는 개발 단계를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. V 모델의 개념\n2. 각 테스트와 개발 단계의 대응 관계\n3. V 모델의 장단점\n4. 폭포수 모델과의 관계\n5. 연습문제 3개` },
      { id: 10, question: 'RAD(Rapid Application Development) 모델의 특징을 설명하시오.', answer: 'CASE 도구 활용, 컴포넌트 재사용, 빠른 프로토타이핑, 고객 참여 중시', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: RAD(Rapid Application Development) 모델의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RAD의 정의와 목적\n2. RAD의 4단계\n3. CASE 도구의 역할\n4. 적합한 프로젝트 유형\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'requirements',
    name: '요구사항 분석',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: '기능적 요구사항과 비기능적 요구사항의 차이를 설명하시오.', answer: '기능적: 시스템이 수행할 기능, 비기능적: 성능, 보안, 유지보수성 등 품질 속성', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 기능적 요구사항과 비기능적 요구사항의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기능적 요구사항의 정의와 예시\n2. 비기능적 요구사항의 정의와 예시\n3. 각각의 명세 방법\n4. 요구사항 검증 방법\n5. 연습문제 3개` },
      { id: 2, question: '요구사항 명세서(SRS)에 포함되어야 할 내용 4가지를 쓰시오.', answer: '기능 요구사항, 비기능 요구사항, 인터페이스 요구사항, 제약사항', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 요구사항 명세서(SRS)에 포함되어야 할 내용 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. SRS의 정의와 목적\n2. 포함 내용 상세 설명\n3. IEEE 830 표준\n4. 좋은 SRS의 특성\n5. 연습문제 3개` },
      { id: 3, question: '유스케이스 다이어그램의 구성요소 4가지를 쓰시오.', answer: '액터, 유스케이스, 시스템 경계, 관계(include, extend, generalization)', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 유스케이스 다이어그램의 구성요소 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 유스케이스 다이어그램의 목적\n2. 각 구성요소의 역할\n3. 관계의 종류와 표기법\n4. 유스케이스 명세서 작성법\n5. 연습문제 3개` },
      { id: 4, question: '요구사항 추적성(Traceability)의 개념과 목적을 설명하시오.', answer: '요구사항과 설계, 코드, 테스트 간의 연결 관리, 변경 영향 분석에 활용', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 요구사항 추적성(Traceability)의 개념과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 추적성의 정의\n2. 추적성 매트릭스\n3. 전방 추적과 후방 추적\n4. 추적성 관리 도구\n5. 연습문제 3개` },
      { id: 5, question: '요구사항 검증 기법 3가지를 쓰시오.', answer: '검토(Review), 프로토타이핑, 모델 검증(워크스루, 인스펙션)', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 요구사항 검증 기법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 요구사항 검증의 목적\n2. 각 검증 기법의 특징\n3. 워크스루와 인스펙션의 차이\n4. 검증 vs 확인(Verification vs Validation)\n5. 연습문제 3개` },
      { id: 6, question: '비기능 요구사항의 품질 속성 5가지를 쓰시오.', answer: '성능, 보안, 가용성, 유지보수성, 이식성', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 비기능 요구사항의 품질 속성 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. ISO 25010 품질 특성\n2. 각 품질 속성의 정의\n3. 품질 속성 측정 방법\n4. 품질 시나리오 작성법\n5. 연습문제 3개` },
      { id: 7, question: 'MoSCoW 기법의 4가지 우선순위를 쓰시오.', answer: 'Must have, Should have, Could have, Won\'t have', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: MoSCoW 기법의 4가지 우선순위를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. MoSCoW 기법의 개념\n2. 각 우선순위 레벨 설명\n3. 우선순위 결정 기준\n4. 다른 우선순위 기법과 비교\n5. 연습문제 3개` },
      { id: 8, question: '사용자 스토리의 형식을 쓰시오.', answer: 'As a [역할], I want [기능], so that [가치/이유]', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 사용자 스토리의 형식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 사용자 스토리의 정의\n2. INVEST 원칙\n3. 인수 기준 작성법\n4. 에픽과 사용자 스토리의 관계\n5. 연습문제 3개` },
      { id: 9, question: '좋은 요구사항 명세의 품질 특성 4가지를 쓰시오.', answer: '완전성, 일관성, 명확성, 검증 가능성', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 좋은 요구사항 명세의 품질 특성 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 각 품질 특성의 정의\n2. 품질 특성 확보 방법\n3. 나쁜 요구사항의 예시\n4. 요구사항 품질 검토 체크리스트\n5. 연습문제 3개` },
      { id: 10, question: '요구사항 수집 기법 4가지를 쓰시오.', answer: '인터뷰, 설문조사, 관찰, 브레인스토밍', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 요구사항 수집 기법 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 각 수집 기법의 특징\n2. 기법별 장단점\n3. 상황에 따른 기법 선택\n4. 요구사항 도출 워크숍\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'design',
    name: '설계 패턴',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '싱글톤 패턴의 목적과 구현 방법을 설명하시오.', answer: '인스턴스를 하나만 생성, private 생성자와 static getInstance() 메서드 사용', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 싱글톤 패턴의 목적과 구현 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 싱글톤 패턴의 정의\n2. 구현 방법 (Eager, Lazy, Thread-safe)\n3. 사용 사례\n4. 장단점\n5. 연습문제 3개` },
      { id: 2, question: '팩토리 메서드 패턴의 목적을 설명하시오.', answer: '객체 생성을 서브클래스에 위임하여 생성 로직을 분리', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 팩토리 메서드 패턴의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 팩토리 메서드 패턴의 정의\n2. 구조와 참여자\n3. 추상 팩토리와의 차이\n4. 사용 사례와 코드 예시\n5. 연습문제 3개` },
      { id: 3, question: '어댑터 패턴의 역할을 설명하시오.', answer: '호환되지 않는 인터페이스를 가진 클래스들이 함께 동작하도록 변환', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 어댑터 패턴의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 어댑터 패턴의 정의\n2. 클래스 어댑터 vs 객체 어댑터\n3. 구조와 참여자\n4. 실제 사용 사례\n5. 연습문제 3개` },
      { id: 4, question: '옵저버 패턴의 개념과 사용 상황을 설명하시오.', answer: '한 객체의 상태 변경을 의존하는 모든 객체에 자동 알림, 발행-구독 모델', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 옵저버 패턴의 개념과 사용 상황을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 옵저버 패턴의 정의\n2. 구조와 참여자(Subject, Observer)\n3. Push vs Pull 방식\n4. 이벤트 기반 시스템과의 관계\n5. 연습문제 3개` },
      { id: 5, question: 'MVC 패턴의 3가지 컴포넌트와 각각의 역할을 설명하시오.', answer: 'Model: 데이터/비즈니스 로직, View: UI 표현, Controller: 입력 처리/중재', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: MVC 패턴의 3가지 컴포넌트와 각각의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MVC 패턴의 정의\n2. 각 컴포넌트의 책임\n3. 동작 흐름\n4. MVP, MVVM과의 비교\n5. 연습문제 3개` },
      { id: 6, question: '데코레이터 패턴의 특징을 설명하시오.', answer: '객체에 동적으로 새로운 책임을 추가, 상속의 유연한 대안', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 데코레이터 패턴의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 데코레이터 패턴의 정의\n2. 구조와 참여자\n3. 상속과의 비교\n4. Java I/O에서의 사용 예시\n5. 연습문제 3개` },
      { id: 7, question: '전략 패턴의 목적을 설명하시오.', answer: '알고리즘 군을 정의하고 캡슐화하여 실행 시점에 교체 가능하게 함', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 전략 패턴의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전략 패턴의 정의\n2. 구조와 참여자\n3. 상태 패턴과의 차이\n4. 사용 사례와 코드 예시\n5. 연습문제 3개` },
      { id: 8, question: 'SOLID 원칙 5가지를 쓰고 설명하시오.', answer: 'SRP(단일책임), OCP(개방폐쇄), LSP(리스코프치환), ISP(인터페이스분리), DIP(의존역전)', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: SOLID 원칙 5가지를 쓰고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 원칙의 정의\n2. 원칙 위반 사례\n3. 원칙 준수 방법\n4. 코드 예시\n5. 연습문제 3개` },
      { id: 9, question: '파사드 패턴의 목적을 설명하시오.', answer: '복잡한 서브시스템에 단순한 인터페이스를 제공', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 파사드 패턴의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파사드 패턴의 정의\n2. 구조와 참여자\n3. 최소 지식 원칙과의 관계\n4. 실제 사용 사례\n5. 연습문제 3개` },
      { id: 10, question: '프록시 패턴의 종류와 용도를 설명하시오.', answer: '가상 프록시(지연 로딩), 보호 프록시(접근 제어), 원격 프록시(원격 객체 대리)', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 프록시 패턴의 종류와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프록시 패턴의 정의\n2. 프록시 종류별 설명\n3. 구조와 참여자\n4. 데코레이터 패턴과의 차이\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'testing',
    name: '테스트 기법',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: '화이트박스 테스트 기법 3가지를 쓰시오.', answer: '문장 커버리지, 분기 커버리지, 경로 커버리지', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 화이트박스 테스트 기법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 화이트박스 테스트의 정의\n2. 각 커버리지 기준 설명\n3. 커버리지 측정 방법\n4. 블랙박스 테스트와의 비교\n5. 연습문제 3개` },
      { id: 2, question: '블랙박스 테스트 기법 3가지를 쓰시오.', answer: '동등 분할, 경계값 분석, 결정 테이블', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 블랙박스 테스트 기법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 블랙박스 테스트의 정의\n2. 각 기법의 특징\n3. 테스트 케이스 설계 방법\n4. 기법별 적용 상황\n5. 연습문제 3개` },
      { id: 3, question: '단위 테스트, 통합 테스트, 시스템 테스트, 인수 테스트의 차이를 설명하시오.', answer: '단위: 개별 모듈, 통합: 모듈 간 인터페이스, 시스템: 전체 시스템, 인수: 사용자 요구사항', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 단위 테스트, 통합 테스트, 시스템 테스트, 인수 테스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 테스트 레벨의 정의\n2. 테스트 대상과 목적\n3. 테스트 주체\n4. V 모델과의 관계\n5. 연습문제 3개` },
      { id: 4, question: '테스트 더블(Test Double)의 종류 4가지를 쓰시오.', answer: 'Stub, Mock, Spy, Fake', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 테스트 더블(Test Double)의 종류 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 테스트 더블의 정의\n2. 각 종류의 특징과 차이\n3. 사용 상황\n4. Mockito 등 도구 활용\n5. 연습문제 3개` },
      { id: 5, question: '회귀 테스트(Regression Test)의 목적을 설명하시오.', answer: '코드 변경 후 기존 기능이 정상 동작하는지 확인', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 회귀 테스트(Regression Test)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회귀 테스트의 정의\n2. 수행 시점\n3. 테스트 케이스 선택 전략\n4. 자동화의 중요성\n5. 연습문제 3개` },
      { id: 6, question: 'TDD(Test-Driven Development)의 Red-Green-Refactor 사이클을 설명하시오.', answer: 'Red: 실패하는 테스트 작성, Green: 테스트 통과하는 코드 작성, Refactor: 코드 개선', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: TDD(Test-Driven Development)의 Red-Green-Refactor 사이클을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TDD의 정의와 목적\n2. 각 단계 상세 설명\n3. TDD의 장단점\n4. BDD와의 관계\n5. 연습문제 3개` },
      { id: 7, question: '통합 테스트 방식 중 상향식, 하향식, 빅뱅의 차이를 설명하시오.', answer: '상향식: Driver 사용, 하향식: Stub 사용, 빅뱅: 한 번에 통합', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 통합 테스트 방식 중 상향식, 하향식, 빅뱅의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 방식의 정의\n2. Driver와 Stub의 역할\n3. 장단점 비교\n4. 샌드위치(혼합) 방식\n5. 연습문제 3개` },
      { id: 8, question: '코드 커버리지 100%가 버그 없음을 보장하지 않는 이유를 설명하시오.', answer: '입력 조합, 로직 오류, 비기능적 결함 등은 커버리지로 발견 불가', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 코드 커버리지 100%가 버그 없음을 보장하지 않는 이유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 코드 커버리지의 정의\n2. 커버리지의 한계\n3. 효과적인 테스트 전략\n4. 커버리지 도구(JaCoCo 등)\n5. 연습문제 3개` },
      { id: 9, question: '알파 테스트와 베타 테스트의 차이를 설명하시오.', answer: '알파: 개발 조직 내 환경, 베타: 실제 사용자 환경', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 알파 테스트와 베타 테스트의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 알파 테스트의 정의와 특징\n2. 베타 테스트의 정의와 특징\n3. 수행 시점과 목적\n4. 피드백 수집 방법\n5. 연습문제 3개` },
      { id: 10, question: '뮤테이션 테스트(Mutation Testing)의 목적을 설명하시오.', answer: '코드에 인위적 결함을 주입하여 테스트 케이스의 품질을 평가', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 뮤테이션 테스트(Mutation Testing)의 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 뮤테이션 테스트의 정의\n2. 뮤턴트와 킬 스코어\n3. 뮤테이션 연산자\n4. 장단점\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'quality',
    name: '품질 관리',
    color: 'from-teal-500 to-teal-400',
    questions: [
      { id: 1, question: 'ISO 25010 소프트웨어 품질 특성 8가지를 쓰시오.', answer: '기능적합성, 성능효율성, 호환성, 사용성, 신뢰성, 보안성, 유지보수성, 이식성', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: ISO 25010 소프트웨어 품질 특성 8가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. ISO 25010의 개요\n2. 각 품질 특성의 정의\n3. 하위 특성\n4. 품질 측정 방법\n5. 연습문제 3개` },
      { id: 2, question: '결합도(Coupling)와 응집도(Cohesion)의 바람직한 방향을 설명하시오.', answer: '결합도는 낮게(Loose Coupling), 응집도는 높게(High Cohesion)', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 결합도(Coupling)와 응집도(Cohesion)의 바람직한 방향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결합도의 정의와 유형\n2. 응집도의 정의와 유형\n3. 좋은 설계의 특징\n4. 개선 방법\n5. 연습문제 3개` },
      { id: 3, question: 'CMMI 레벨 5단계를 쓰시오.', answer: '초기(1) → 관리(2) → 정의(3) → 정량적 관리(4) → 최적화(5)', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: CMMI 레벨 5단계를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. CMMI의 정의와 목적\n2. 각 레벨의 특징\n3. 프로세스 영역(PA)\n4. CMMI 인증 절차\n5. 연습문제 3개` },
      { id: 4, question: '코드 리뷰의 장점 3가지를 쓰시오.', answer: '결함 조기 발견, 지식 공유, 코드 품질 향상', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 코드 리뷰의 장점 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 코드 리뷰의 정의\n2. 코드 리뷰 유형(Pair, Over-the-shoulder, Tool-assisted)\n3. 효과적인 리뷰 방법\n4. 코드 리뷰 도구\n5. 연습문제 3개` },
      { id: 5, question: '기술 부채(Technical Debt)의 개념을 설명하시오.', answer: '빠른 개발을 위해 최선이 아닌 방법을 선택하여 발생하는 미래의 추가 작업 비용', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 기술 부채(Technical Debt)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기술 부채의 정의\n2. 기술 부채의 유형\n3. 발생 원인\n4. 관리 전략\n5. 연습문제 3개` },
      { id: 6, question: '정적 분석과 동적 분석의 차이를 설명하시오.', answer: '정적: 코드 실행 없이 분석, 동적: 코드 실행하며 분석', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 정적 분석과 동적 분석의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정적 분석의 정의와 특징\n2. 동적 분석의 정의와 특징\n3. 각각의 장단점\n4. 분석 도구 예시\n5. 연습문제 3개` },
      { id: 7, question: 'McCabe 순환 복잡도의 계산 방법을 설명하시오.', answer: 'V(G) = E - N + 2P (E: 간선, N: 노드, P: 연결 컴포넌트)', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: McCabe 순환 복잡도의 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 순환 복잡도의 정의\n2. 계산 공식\n3. 복잡도에 따른 품질 해석\n4. 예제 계산\n5. 연습문제 3개` },
      { id: 8, question: 'SonarQube의 주요 기능을 설명하시오.', answer: '코드 품질 분석, 버그/취약점/코드 스멜 검출, 기술 부채 측정', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: SonarQube의 주요 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SonarQube의 개요\n2. 주요 분석 기능\n3. Quality Gate\n4. CI/CD 통합\n5. 연습문제 3개` },
      { id: 9, question: '품질 보증(QA)과 품질 통제(QC)의 차이를 설명하시오.', answer: 'QA: 품질 달성 프로세스 중심, QC: 제품 품질 검증 중심', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 품질 보증(QA)과 품질 통제(QC)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. QA의 정의와 활동\n2. QC의 정의와 활동\n3. QA와 QC의 관계\n4. 품질 관리 체계\n5. 연습문제 3개` },
      { id: 10, question: '리팩토링의 정의와 원칙을 설명하시오.', answer: '외부 동작 유지하며 내부 구조 개선, 작은 단계로 진행, 테스트 필수', prompt: `전자계산기조직응용기사 소프트웨어공학 문제입니다.\n\n문제: 리팩토링의 정의와 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리팩토링의 정의\n2. 리팩토링 원칙\n3. 주요 리팩토링 기법\n4. 코드 스멜과 리팩토링\n5. 연습문제 3개` },
    ],
  },
];

export default function SoftwareEngineeringPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['methodology']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});

  useEffect(() => {
    const saved = localStorage.getItem('computer-org-se-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('computer-org-se-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]);
  };

  const toggleQuestion = (topicId: string, questionId: number) => {
    setCompletedQuestions(prev => {
      const topicCompleted = prev[topicId] || [];
      return {
        ...prev,
        [topicId]: topicCompleted.includes(questionId)
          ? topicCompleted.filter(id => id !== questionId)
          : [...topicCompleted, questionId]
      };
    });
  };

  const getTopicProgress = (topicId: string, total: number) => {
    return Math.round(((completedQuestions[topicId]?.length || 0) / total) * 100);
  };

  const getTotalProgress = () => {
    const total = topics.reduce((acc, t) => acc + t.questions.length, 0);
    const completed = Object.values(completedQuestions).reduce((acc, arr) => acc + arr.length, 0);
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-cyan-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it" className="text-gray-600 hover:text-cyan-600">IT·정보통신</a>
            <span className="text-gray-300">›</span>
            <a href="/category/it/computer-organization" className="text-gray-600 hover:text-cyan-600">전자계산기조직응용기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">소프트웨어공학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">📐</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">소프트웨어공학</h1>
              <p className="text-cyan-100">전자계산기조직응용기사 - 개발 방법론, 설계 패턴, 테스트</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-cyan-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all" style={{ width: `${getTotalProgress()}%` }} />
          </div>
        </div>
      </div>

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
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">{topic.questions.length}문항</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }} />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${completedQuestions[topic.id]?.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-cyan-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border mb-3">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                          <div className="flex flex-wrap gap-2">
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
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
