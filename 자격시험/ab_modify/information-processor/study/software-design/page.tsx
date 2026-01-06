'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'requirements',
    name: '요구사항 분석',
    color: 'from-indigo-500 to-indigo-400',
    questions: [
      { id: 1, question: '요구사항 분석 단계에서 수행하는 주요 활동 4가지를 쓰시오.', answer: '요구사항 도출, 분석, 명세, 확인(검증)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 분석 단계에서 수행하는 주요 활동 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '기능 요구사항과 비기능 요구사항의 차이점을 설명하시오.', answer: '기능: 시스템이 수행해야 할 기능, 비기능: 성능/보안/품질 등 제약조건', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 기능 요구사항과 비기능 요구사항의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '요구사항 명세서(SRS)에 포함되어야 할 항목 5가지를 쓰시오.', answer: '기능 요구사항, 비기능 요구사항, 인터페이스, 제약조건, 검증 기준', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 명세서(SRS)에 포함되어야 할 항목 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '요구공학(Requirements Engineering)의 정의와 목적을 설명하시오.', answer: '사용자 요구사항을 체계적으로 수집, 분석, 문서화하는 프로세스', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구공학(Requirements Engineering)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '요구사항 도출 기법 5가지를 쓰시오.', answer: '인터뷰, 설문조사, 브레인스토밍, 프로토타이핑, 관찰', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 도출 기법 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '요구사항 확인(Validation)과 검증(Verification)의 차이를 설명하시오.', answer: 'Validation: 올바른 제품인가?, Verification: 제품을 올바르게 만들었나?', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 확인(Validation)과 검증(Verification)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '요구사항 추적성(Traceability)의 개념과 중요성을 설명하시오.', answer: '요구사항과 설계/구현/테스트 간의 연결관계를 추적하는 것', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 추적성(Traceability)의 개념과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '비기능 요구사항의 종류 5가지를 쓰시오.', answer: '성능, 보안, 신뢰성, 가용성, 유지보수성', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 비기능 요구사항의 종류 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '요구사항 분석에서 발생할 수 있는 문제점 3가지를 쓰시오.', answer: '모호성, 불완전성, 일관성 부족', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 분석에서 발생할 수 있는 문제점 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'JAD(Joint Application Development)의 개념을 설명하시오.', answer: '사용자와 개발자가 공동으로 참여하여 요구사항을 도출하는 기법', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: JAD(Joint Application Development)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '요구사항 우선순위 결정 기법인 MoSCoW 기법을 설명하시오.', answer: 'Must have, Should have, Could have, Won\'t have로 분류', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 우선순위 결정 기법인 MoSCoW 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '프로토타이핑의 종류 2가지와 각각의 특징을 쓰시오.', answer: '진화적 프로토타이핑(계속 발전), 폐기형 프로토타이핑(확인 후 폐기)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 프로토타이핑의 종류 2가지와 각각의 특징을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '요구사항 베이스라인(Baseline)의 개념을 설명하시오.', answer: '공식적으로 승인된 요구사항의 기준선으로 변경 관리의 기준이 됨', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 베이스라인(Baseline)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '요구사항 변경 관리 프로세스 단계를 순서대로 쓰시오.', answer: '변경 요청 → 영향 분석 → 승인/거부 → 변경 구현 → 검증', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 요구사항 변경 관리 프로세스 단계를 순서대로 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '스토리보드(Storyboard)의 개념과 용도를 설명하시오.', answer: '화면 흐름과 사용자 인터페이스를 시각적으로 표현한 문서', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 스토리보드(Storyboard)의 개념과 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'uml',
    name: 'UML',
    color: 'from-blue-500 to-blue-400',
    questions: [
      { id: 1, question: 'UML의 정의와 목적을 설명하시오.', answer: 'Unified Modeling Language, 객체지향 시스템을 시각적으로 모델링하는 표준 언어', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UML의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'UML 다이어그램의 2가지 분류와 각각에 속하는 다이어그램을 쓰시오.', answer: '구조(클래스, 객체, 컴포넌트), 행위(유스케이스, 시퀀스, 상태)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UML 다이어그램의 2가지 분류와 각각에 속하는 다이어그램을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '유스케이스 다이어그램의 구성요소 4가지를 쓰시오.', answer: '액터, 유스케이스, 시스템 경계, 관계', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 유스케이스 다이어그램의 구성요소 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '유스케이스 간의 관계 3가지와 각각의 의미를 설명하시오.', answer: 'include(필수포함), extend(선택확장), generalization(일반화)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 유스케이스 간의 관계 3가지와 각각의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '클래스 다이어그램에서 클래스의 구성요소 3가지를 쓰시오.', answer: '클래스명, 속성(Attribute), 메서드(Operation)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 클래스 다이어그램에서 클래스의 구성요소 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '클래스 간의 관계 6가지를 쓰시오.', answer: '연관, 집합, 합성, 의존, 일반화, 실체화', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 클래스 간의 관계 6가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '집합(Aggregation)과 합성(Composition)의 차이점을 설명하시오.', answer: '집합: 부분이 전체 없이 존재 가능, 합성: 부분이 전체에 종속', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 집합(Aggregation)과 합성(Composition)의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '시퀀스 다이어그램의 구성요소 5가지를 쓰시오.', answer: '객체, 생명선, 활성박스, 메시지, 프레임', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 시퀀스 다이어그램의 구성요소 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '시퀀스 다이어그램에서 메시지 유형 3가지를 설명하시오.', answer: '동기 메시지(실선+채워진 화살표), 비동기 메시지(열린 화살표), 응답 메시지(점선)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 시퀀스 다이어그램에서 메시지 유형 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '상태 다이어그램의 구성요소 4가지를 쓰시오.', answer: '상태, 전이, 이벤트, 액션', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 상태 다이어그램의 구성요소 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '활동 다이어그램에서 사용되는 기호 5가지를 쓰시오.', answer: '시작노드, 종료노드, 활동, 결정노드, 포크/조인', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 활동 다이어그램에서 사용되는 기호 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '컴포넌트 다이어그램의 목적과 구성요소를 설명하시오.', answer: '시스템의 물리적 구성을 표현, 컴포넌트/인터페이스/의존관계', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 컴포넌트 다이어그램의 목적과 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '배치 다이어그램(Deployment Diagram)의 용도를 설명하시오.', answer: '시스템의 하드웨어 구성과 소프트웨어 배치를 표현', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 배치 다이어그램(Deployment Diagram)의 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'UML에서 접근제어자 기호 4가지와 의미를 쓰시오.', answer: '+ public, - private, # protected, ~ package', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UML에서 접근제어자 기호 4가지와 의미를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '다중성(Multiplicity) 표기법의 예시 4가지를 쓰시오.', answer: '1, 0..1, 1..*, 0..*', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 다중성(Multiplicity) 표기법의 예시 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: '스테레오타입(Stereotype)의 개념과 표기법을 설명하시오.', answer: 'UML 요소를 확장하는 메커니즘, <<stereotype>> 형태로 표기', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 스테레오타입(Stereotype)의 개념과 표기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: '패키지 다이어그램의 용도와 표기법을 설명하시오.', answer: '관련 요소들을 그룹화, 폴더 모양으로 표현', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 패키지 다이어그램의 용도와 표기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: '인터페이스를 클래스 다이어그램에서 표현하는 2가지 방법을 쓰시오.', answer: '<<interface>> 스테레오타입, 롤리팝(원) 표기법', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 인터페이스를 클래스 다이어그램에서 표현하는 2가지 방법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '커뮤니케이션 다이어그램과 시퀀스 다이어그램의 차이를 설명하시오.', answer: '커뮤니케이션: 객체 간 관계 중심, 시퀀스: 시간 순서 중심', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 커뮤니케이션 다이어그램과 시퀀스 다이어그램의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: 'UML 4+1 뷰 모델의 5가지 뷰를 쓰시오.', answer: '유스케이스 뷰, 논리 뷰, 프로세스 뷰, 구현 뷰, 배치 뷰', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UML 4+1 뷰 모델의 5가지 뷰를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'ui-design',
    name: 'UI 설계',
    color: 'from-green-500 to-green-400',
    questions: [
      { id: 1, question: 'UI(User Interface)의 정의와 중요성을 설명하시오.', answer: '사용자와 시스템 간의 상호작용 접점, 사용성과 만족도에 직접 영향', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UI(User Interface)의 정의와 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'UI 설계 원칙 4가지를 쓰시오.', answer: '직관성, 유효성, 학습성, 유연성', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UI 설계 원칙 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'UX(User Experience)와 UI의 차이점을 설명하시오.', answer: 'UX: 전체 사용 경험, UI: 시각적 인터페이스 디자인', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UX(User Experience)와 UI의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '와이어프레임(Wireframe)의 정의와 목적을 설명하시오.', answer: '화면 레이아웃과 구조를 보여주는 저해상도 설계 도구', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 와이어프레임(Wireframe)의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '목업(Mockup)과 프로토타입(Prototype)의 차이를 설명하시오.', answer: '목업: 정적 시각 디자인, 프로토타입: 동적 인터랙션 포함', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 목업(Mockup)과 프로토타입(Prototype)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '사용성 테스트(Usability Testing)의 목적과 방법을 설명하시오.', answer: '사용자가 제품을 얼마나 쉽게 사용하는지 평가, 실제 사용자 관찰', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 사용성 테스트(Usability Testing)의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '닐슨의 휴리스틱 평가 원칙 중 5가지를 쓰시오.', answer: '시스템 상태 가시성, 사용자 언어 사용, 오류 방지, 일관성, 유연성', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 닐슨의 휴리스틱 평가 원칙 중 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '반응형 웹 디자인(Responsive Web Design)의 개념을 설명하시오.', answer: '다양한 디바이스 화면 크기에 맞게 레이아웃이 자동 조정되는 설계', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 반응형 웹 디자인(Responsive Web Design)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'GUI와 CLI의 차이점을 설명하시오.', answer: 'GUI: 그래픽 기반, CLI: 텍스트 명령어 기반', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: GUI와 CLI의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '접근성(Accessibility)의 개념과 WCAG를 설명하시오.', answer: '장애인도 사용 가능한 설계, Web Content Accessibility Guidelines', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 접근성(Accessibility)의 개념과 WCAG를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '페르소나(Persona)의 개념과 활용 방법을 설명하시오.', answer: '가상의 대표 사용자 모델, 사용자 중심 설계에 활용', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 페르소나(Persona)의 개념과 활용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '정보 구조(Information Architecture)의 개념을 설명하시오.', answer: '콘텐츠를 조직하고 구조화하여 사용자가 쉽게 탐색하도록 하는 설계', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 정보 구조(Information Architecture)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'UI 설계 시 고려해야 할 인간 공학적 요소 3가지를 쓰시오.', answer: '인지 부하, 시각적 계층, 피츠의 법칙', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: UI 설계 시 고려해야 할 인간 공학적 요소 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '내비게이션 설계의 종류 4가지를 쓰시오.', answer: '글로벌, 로컬, 맥락, 보조 네비게이션', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 내비게이션 설계의 종류 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'A/B 테스트의 개념과 목적을 설명하시오.', answer: '두 가지 버전을 비교하여 더 효과적인 디자인을 선택하는 테스트', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: A/B 테스트의 개념과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'architecture',
    name: '소프트웨어 아키텍처',
    color: 'from-purple-500 to-purple-400',
    questions: [
      { id: 1, question: '소프트웨어 아키텍처의 정의와 중요성을 설명하시오.', answer: '시스템의 기본 구조와 구성요소 간의 관계를 정의, 품질 속성 결정', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 소프트웨어 아키텍처의 정의와 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'MVC 패턴의 구성요소와 각각의 역할을 설명하시오.', answer: 'Model(데이터), View(화면), Controller(제어 로직)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: MVC 패턴의 구성요소와 각각의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '레이어드 아키텍처의 계층 구성을 설명하시오.', answer: 'Presentation, Business Logic, Data Access, Database', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 레이어드 아키텍처의 계층 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '마이크로서비스 아키텍처의 특징 4가지를 쓰시오.', answer: '독립 배포, 분산 시스템, 기술 다양성, 장애 격리', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 마이크로서비스 아키텍처의 특징 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '모놀리식 아키텍처와 마이크로서비스 아키텍처의 차이를 설명하시오.', answer: '모놀리식: 단일 배포 단위, 마이크로서비스: 독립적 서비스 단위', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 모놀리식 아키텍처와 마이크로서비스 아키텍처의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '클라이언트-서버 아키텍처의 개념과 장단점을 설명하시오.', answer: '클라이언트 요청-서버 응답 구조, 중앙 관리 용이/서버 부하 집중', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 클라이언트-서버 아키텍처의 개념과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'SOA(Service Oriented Architecture)의 개념을 설명하시오.', answer: '서비스 단위로 시스템을 구성하여 재사용성과 유연성을 높이는 아키텍처', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: SOA(Service Oriented Architecture)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'REST 아키텍처 스타일의 특징 4가지를 쓰시오.', answer: '무상태성, 캐시 가능, 균일 인터페이스, 계층화', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: REST 아키텍처 스타일의 특징 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '이벤트 기반 아키텍처(Event-Driven Architecture)의 개념을 설명하시오.', answer: '이벤트 발생과 처리를 중심으로 시스템을 구성하는 아키텍처', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 이벤트 기반 아키텍처(Event-Driven Architecture)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '파이프-필터 아키텍처의 개념과 예시를 설명하시오.', answer: '데이터 흐름을 필터로 처리, Unix 파이프 명령어', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 파이프-필터 아키텍처의 개념과 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '레포지토리 아키텍처의 개념을 설명하시오.', answer: '중앙 저장소를 통해 서브시스템 간 데이터를 공유하는 구조', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 레포지토리 아키텍처의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '아키텍처 품질 속성 6가지를 쓰시오.', answer: '성능, 보안, 가용성, 확장성, 유지보수성, 테스트 용이성', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 아키텍처 품질 속성 6가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'MVVM 패턴의 구성요소를 설명하시오.', answer: 'Model, View, ViewModel - 데이터 바인딩 활용', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: MVVM 패턴의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'MVP 패턴과 MVC 패턴의 차이를 설명하시오.', answer: 'MVP: Presenter가 View 제어, MVC: Controller가 흐름 제어', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: MVP 패턴과 MVC 패턴의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: '헥사고날 아키텍처(Hexagonal Architecture)의 개념을 설명하시오.', answer: '포트와 어댑터를 통해 외부 의존성을 분리하는 아키텍처', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 헥사고날 아키텍처(Hexagonal Architecture)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 16, question: 'CQRS(Command Query Responsibility Segregation)의 개념을 설명하시오.', answer: '명령(쓰기)과 조회(읽기)를 분리하는 패턴', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: CQRS(Command Query Responsibility Segregation)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 17, question: 'API Gateway의 역할을 설명하시오.', answer: '마이크로서비스 진입점, 라우팅/인증/로드밸런싱 담당', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: API Gateway의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 18, question: '서비스 메시(Service Mesh)의 개념을 설명하시오.', answer: '마이크로서비스 간 통신을 관리하는 인프라 계층', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 서비스 메시(Service Mesh)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 19, question: '서버리스 아키텍처(Serverless Architecture)의 특징을 설명하시오.', answer: '서버 관리 불필요, 함수 단위 실행, 사용량 기반 과금', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 서버리스 아키텍처(Serverless Architecture)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 20, question: 'Clean Architecture의 핵심 원칙을 설명하시오.', answer: '의존성 규칙 - 외부에서 내부로만 의존, 비즈니스 로직 보호', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: Clean Architecture의 핵심 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'oop',
    name: '객체지향 설계',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: 'SOLID 원칙 5가지를 쓰고 각각을 설명하시오.', answer: 'SRP, OCP, LSP, ISP, DIP - 단일책임, 개방폐쇄, 리스코프치환, 인터페이스분리, 의존역전', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: SOLID 원칙 5가지를 쓰고 각각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: '단일 책임 원칙(SRP)을 위반한 코드의 문제점을 설명하시오.', answer: '변경 이유가 여러 개가 되어 유지보수 어려움, 결합도 증가', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 단일 책임 원칙(SRP)을 위반한 코드의 문제점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: '개방-폐쇄 원칙(OCP)의 의미와 적용 방법을 설명하시오.', answer: '확장에는 열려있고 수정에는 닫혀있어야 함, 추상화 활용', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 개방-폐쇄 원칙(OCP)의 의미와 적용 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: '리스코프 치환 원칙(LSP)을 설명하시오.', answer: '자식 클래스는 부모 클래스를 대체할 수 있어야 함', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 리스코프 치환 원칙(LSP)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: '의존성 역전 원칙(DIP)의 개념을 설명하시오.', answer: '고수준 모듈이 저수준 모듈에 의존하지 않고 추상화에 의존', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 의존성 역전 원칙(DIP)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: '캡슐화(Encapsulation)의 개념과 장점을 설명하시오.', answer: '데이터와 메서드를 하나로 묶고 외부 접근 제한, 정보 은닉', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 캡슐화(Encapsulation)의 개념과 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: '상속(Inheritance)과 합성(Composition)의 차이를 설명하시오.', answer: '상속: is-a 관계, 합성: has-a 관계, 합성이 더 유연', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 상속(Inheritance)과 합성(Composition)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: '다형성(Polymorphism)의 종류와 예시를 설명하시오.', answer: '오버로딩(컴파일 타임), 오버라이딩(런타임)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 다형성(Polymorphism)의 종류와 예시를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: '추상 클래스와 인터페이스의 차이를 설명하시오.', answer: '추상 클래스: 일부 구현 가능, 인터페이스: 명세만 정의', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 추상 클래스와 인터페이스의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: '결합도(Coupling)와 응집도(Cohesion)의 관계를 설명하시오.', answer: '좋은 설계: 낮은 결합도, 높은 응집도', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 결합도(Coupling)와 응집도(Cohesion)의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '결합도의 종류를 약한 것부터 강한 순서로 나열하시오.', answer: '자료, 스탬프, 제어, 외부, 공통, 내용 결합도', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 결합도의 종류를 약한 것부터 강한 순서로 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '응집도의 종류를 약한 것부터 강한 순서로 나열하시오.', answer: '우연적, 논리적, 시간적, 절차적, 통신적, 순차적, 기능적', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 응집도의 종류를 약한 것부터 강한 순서로 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: '팬인(Fan-In)과 팬아웃(Fan-Out)의 개념을 설명하시오.', answer: '팬인: 해당 모듈을 호출하는 수, 팬아웃: 해당 모듈이 호출하는 수', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 팬인(Fan-In)과 팬아웃(Fan-Out)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: '의존성 주입(Dependency Injection)의 3가지 방법을 쓰시오.', answer: '생성자 주입, 세터 주입, 인터페이스 주입', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 의존성 주입(Dependency Injection)의 3가지 방법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'LoD(Law of Demeter, 디미터 법칙)을 설명하시오.', answer: '객체는 직접 관련된 객체와만 상호작용해야 함, 낮은 결합도 유지', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: LoD(Law of Demeter, 디미터 법칙)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
  {
    id: 'interface',
    name: '인터페이스 설계',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: '시스템 인터페이스의 정의와 종류를 설명하시오.', answer: '시스템 간 데이터 교환 방법, 내부/외부 인터페이스', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 시스템 인터페이스의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 2, question: 'API(Application Programming Interface)의 개념을 설명하시오.', answer: '애플리케이션 간 상호작용을 위한 정의된 규약', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: API(Application Programming Interface)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 3, question: 'RESTful API 설계 원칙을 설명하시오.', answer: 'HTTP 메서드 활용, URI로 리소스 표현, 무상태성', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: RESTful API 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 4, question: 'HTTP 메서드 GET, POST, PUT, DELETE의 용도를 설명하시오.', answer: 'GET: 조회, POST: 생성, PUT: 수정, DELETE: 삭제', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: HTTP 메서드 GET, POST, PUT, DELETE의 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 5, question: 'SOAP과 REST의 차이점을 설명하시오.', answer: 'SOAP: XML 기반 프로토콜, REST: HTTP 기반 아키텍처 스타일', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: SOAP과 REST의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 6, question: 'EAI(Enterprise Application Integration)의 4가지 유형을 쓰시오.', answer: 'Point-to-Point, Hub&Spoke, Message Bus, Hybrid', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: EAI(Enterprise Application Integration)의 4가지 유형을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 7, question: 'ESB(Enterprise Service Bus)의 개념과 기능을 설명하시오.', answer: '서비스 간 통신을 중재하는 미들웨어, 라우팅/변환/오케스트레이션', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: ESB(Enterprise Service Bus)의 개념과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 8, question: 'JSON과 XML의 차이점을 설명하시오.', answer: 'JSON: 경량, JavaScript 친화, XML: 태그 기반, 스키마 지원', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: JSON과 XML의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 9, question: 'GraphQL의 특징과 REST 대비 장점을 설명하시오.', answer: '클라이언트가 필요한 데이터만 요청, Over-fetching 방지', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: GraphQL의 특징과 REST 대비 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 10, question: 'WebSocket의 개념과 HTTP와의 차이를 설명하시오.', answer: '양방향 실시간 통신, 연결 유지 (HTTP는 요청-응답)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: WebSocket의 개념과 HTTP와의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 11, question: '메시지 큐(Message Queue)의 개념과 활용 사례를 설명하시오.', answer: '비동기 메시지 처리, 시스템 간 결합도 낮춤 (예: RabbitMQ, Kafka)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 메시지 큐(Message Queue)의 개념과 활용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 12, question: '인터페이스 명세서에 포함되어야 할 항목 5가지를 쓰시오.', answer: '인터페이스 ID, 송수신 시스템, 데이터 포맷, 프로토콜, 보안', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: 인터페이스 명세서에 포함되어야 할 항목 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 13, question: 'gRPC의 특징을 설명하시오.', answer: 'Protocol Buffers 사용, HTTP/2 기반, 고성능 RPC', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: gRPC의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 14, question: 'OAuth 2.0의 개념과 흐름을 설명하시오.', answer: '제3자 인증 프로토콜, Authorization Code Grant 흐름', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: OAuth 2.0의 개념과 흐름을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
      { id: 15, question: 'API 버저닝 방법 3가지를 쓰시오.', answer: 'URL 경로(/v1/), 쿼리 파라미터(?version=1), 헤더(Accept-Version)', prompt: `정보처리기사 소프트웨어 설계 문제입니다.\n\n문제: API 버저닝 방법 3가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 적용 예시\n4. 관련 개념 연결\n5. 연습문제 3개` },
    ],
  },
];

export default function SoftwareDesignStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('software-design-progress');
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
    localStorage.setItem('software-design-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it" className="text-gray-600 hover:text-indigo-600">IT·정보통신</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/it/information-processor" className="text-gray-600 hover:text-indigo-600">정보처리기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">소프트웨어 설계</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">📐</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">소프트웨어 설계 학습</h1>
                <p className="text-indigo-100">정보처리기사 필기 1과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-indigo-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
