'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'concept',
    name: '보건교육의 개념과 정의',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '보건교육의 정의와 목적을 설명하시오.',
        answer: '개인/집단의 건강에 유익한 행동을 자발적으로 수행하도록 돕는 교육과정',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육의 정의와 목적을 설명하시오.

다음 순서로 설명해주세요:
1. 보건교육의 정의 (WHO, 한국)
2. 보건교육의 궁극적 목적
3. 건강증진과의 관계
4. 보건교육의 특성
5. 연습문제 3개`
      },
      {
        id: 2,
        question: '보건교육과 건강증진의 차이점을 설명하시오.',
        answer: '보건교육은 교육적 접근, 건강증진은 환경/정책 포함한 포괄적 접근',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육과 건강증진의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. 보건교육의 정의와 범위
2. 건강증진의 정의와 범위
3. 두 개념의 관계
4. 오타와 헌장의 건강증진 개념
5. 연습문제 3개`
      },
      {
        id: 3,
        question: 'WHO가 정의한 건강의 개념을 설명하시오.',
        answer: '신체적, 정신적, 사회적 안녕 상태이며 단순히 질병이 없는 상태가 아님',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: WHO가 정의한 건강의 개념을 설명하시오.

다음 순서로 설명해주세요:
1. WHO 건강 정의 원문
2. 신체적 건강의 의미
3. 정신적 건강의 의미
4. 사회적 건강의 의미
5. 연습문제 3개`
      },
      {
        id: 4,
        question: '보건교육의 3대 영역(지식, 태도, 행동)을 설명하시오.',
        answer: '인지적 영역(지식), 정의적 영역(태도), 심동적 영역(행동)',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육의 3대 영역(지식, 태도, 행동)을 설명하시오.

다음 순서로 설명해주세요:
1. 인지적 영역(Cognitive Domain)
2. 정의적 영역(Affective Domain)
3. 심동적 영역(Psychomotor Domain)
4. 블룸의 교육목표 분류
5. 연습문제 3개`
      },
      {
        id: 5,
        question: '보건교육의 궁극적 목표는 무엇인가?',
        answer: '자기건강관리능력 배양을 통한 건강한 생활실천',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육의 궁극적 목표는 무엇인가?

다음 순서로 설명해주세요:
1. 단기 목표 vs 장기 목표
2. 자기건강관리능력의 의미
3. 건강행동 변화의 단계
4. 목표 설정의 SMART 원칙
5. 연습문제 3개`
      },
      {
        id: 6,
        question: '보건교육의 원리 5가지를 설명하시오.',
        answer: '관심의 원리, 동기유발, 이해의 원리, 반복의 원리, 참여의 원리',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육의 원리 5가지를 설명하시오.

다음 순서로 설명해주세요:
1. 관심의 원리
2. 동기유발의 원리
3. 이해의 원리
4. 반복의 원리
5. 참여의 원리
6. 연습문제 3개`
      },
      {
        id: 7,
        question: '1차, 2차, 3차 예방의 개념과 보건교육의 역할을 설명하시오.',
        answer: '1차(건강증진/예방), 2차(조기발견/치료), 3차(재활/합병증예방)',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 1차, 2차, 3차 예방의 개념과 보건교육의 역할을 설명하시오.

다음 순서로 설명해주세요:
1. 1차 예방의 정의와 예시
2. 2차 예방의 정의와 예시
3. 3차 예방의 정의와 예시
4. 각 단계에서 보건교육의 역할
5. 연습문제 3개`
      },
      {
        id: 8,
        question: '보건교육의 역사적 발전과정을 설명하시오.',
        answer: '19세기 위생교육 → 20세기 초 학교보건 → 1970년대 건강증진 → 현재',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육의 역사적 발전과정을 설명하시오.

다음 순서로 설명해주세요:
1. 19세기 위생교육 시대
2. 20세기 초 학교보건교육
3. 1970년대 이후 건강증진 운동
4. 한국 보건교육의 발전사
5. 연습문제 3개`
      },
      {
        id: 9,
        question: '보건교육사의 역할과 직무를 설명하시오.',
        answer: '건강증진 프로그램 기획/실행/평가, 건강상담, 보건교육자료 개발',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육사의 역할과 직무를 설명하시오.

다음 순서로 설명해주세요:
1. 보건교육사 자격제도 개요
2. 등급별 직무 범위
3. 주요 활동 영역
4. 보건교육사의 윤리
5. 연습문제 3개`
      },
      {
        id: 10,
        question: '국민건강증진법에서 규정하는 보건교육의 내용을 설명하시오.',
        answer: '금연, 절주, 운동, 영양, 구강건강, 정신건강 등',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 국민건강증진법에서 규정하는 보건교육의 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 국민건강증진법의 목적
2. 법에서 규정하는 보건교육 내용
3. 건강증진사업의 종류
4. 국가 건강증진 정책 방향
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'learning-theory',
    name: '학습이론과 교육심리',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 11,
        question: '행동주의 학습이론의 핵심 개념을 설명하시오.',
        answer: '자극-반응, 강화, 조건형성을 통한 외현적 행동 변화 중심',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 행동주의 학습이론의 핵심 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 행동주의의 기본 가정
2. 고전적 조건형성 (파블로프)
3. 조작적 조건형성 (스키너)
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
      {
        id: 12,
        question: '인지주의 학습이론의 핵심 개념을 설명하시오.',
        answer: '정보처리, 인지구조 변화, 통찰학습 등 내적 정신과정 중심',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 인지주의 학습이론의 핵심 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 인지주의의 기본 가정
2. 정보처리이론
3. 피아제의 인지발달이론
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
      {
        id: 13,
        question: '사회학습이론(반두라)의 핵심 개념을 설명하시오.',
        answer: '관찰학습, 모델링, 자기효능감, 상호결정론',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 사회학습이론(반두라)의 핵심 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 사회학습이론의 기본 가정
2. 관찰학습의 4단계 (주의-기억-재생-동기)
3. 자기효능감의 개념과 원천
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
      {
        id: 14,
        question: '구성주의 학습이론의 특징을 설명하시오.',
        answer: '학습자 중심, 능동적 지식구성, 맥락적 학습, 협동학습',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 구성주의 학습이론의 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 구성주의의 기본 가정
2. 인지적 구성주의 (피아제)
3. 사회적 구성주의 (비고츠키)
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
      {
        id: 15,
        question: '성인학습이론(안드라고지)의 특징을 설명하시오.',
        answer: '자기주도성, 경험활용, 문제중심학습, 내적동기',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 성인학습이론(안드라고지)의 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 놀즈(Knowles)의 안드라고지 원리
2. 성인학습자의 특성
3. 페다고지와 안드라고지의 차이
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
      {
        id: 16,
        question: '동기이론 중 매슬로우의 욕구위계이론을 설명하시오.',
        answer: '생리적→안전→소속→존경→자아실현 욕구의 위계적 발달',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 동기이론 중 매슬로우의 욕구위계이론을 설명하시오.

다음 순서로 설명해주세요:
1. 5단계 욕구의 내용
2. 결핍욕구와 성장욕구
3. 위계성의 의미
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
      {
        id: 17,
        question: '강화(reinforcement)의 종류와 효과를 설명하시오.',
        answer: '정적강화, 부적강화, 정적벌, 부적벌의 행동 증가/감소 효과',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 강화(reinforcement)의 종류와 효과를 설명하시오.

다음 순서로 설명해주세요:
1. 정적 강화의 정의와 예시
2. 부적 강화의 정의와 예시
3. 정적 벌과 부적 벌
4. 보건교육에서의 강화 활용
5. 연습문제 3개`
      },
      {
        id: 18,
        question: '자기효능감(Self-efficacy)의 4가지 원천을 설명하시오.',
        answer: '성공경험, 대리경험, 언어적 설득, 생리적/정서적 상태',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 자기효능감(Self-efficacy)의 4가지 원천을 설명하시오.

다음 순서로 설명해주세요:
1. 성공경험(Mastery Experience)
2. 대리경험(Vicarious Experience)
3. 언어적 설득(Verbal Persuasion)
4. 생리적/정서적 상태
5. 자기효능감 증진 전략
6. 연습문제 3개`
      },
      {
        id: 19,
        question: '학습전이(Transfer of Learning)의 개념과 유형을 설명하시오.',
        answer: '학습한 내용을 새로운 상황에 적용하는 것 (정적/부적 전이)',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 학습전이(Transfer of Learning)의 개념과 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 학습전이의 정의
2. 정적 전이와 부적 전이
3. 근전이와 원전이
4. 학습전이 촉진 방법
5. 연습문제 3개`
      },
      {
        id: 20,
        question: '학습양식(Learning Style)의 유형과 특징을 설명하시오.',
        answer: '시각형, 청각형, 읽기/쓰기형, 운동감각형 등 선호하는 학습방식',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 학습양식(Learning Style)의 유형과 특징을 설명하시오.

다음 순서로 설명해주세요:
1. VARK 학습양식 모델
2. 콜브의 경험학습 유형
3. 학습양식과 교수전략
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'instruction',
    name: '교수설계와 교육방법',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 21,
        question: 'ADDIE 모형의 5단계를 설명하시오.',
        answer: '분석(Analysis)-설계(Design)-개발(Development)-실행(Implementation)-평가(Evaluation)',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: ADDIE 모형의 5단계를 설명하시오.

다음 순서로 설명해주세요:
1. 분석(Analysis) 단계
2. 설계(Design) 단계
3. 개발(Development) 단계
4. 실행(Implementation) 단계
5. 평가(Evaluation) 단계
6. 연습문제 3개`
      },
      {
        id: 22,
        question: '교육목표 진술 시 SMART 원칙을 설명하시오.',
        answer: 'Specific(구체적), Measurable(측정가능), Achievable(달성가능), Relevant(관련성), Time-bound(기한)',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 교육목표 진술 시 SMART 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. Specific(구체적)
2. Measurable(측정가능)
3. Achievable(달성가능)
4. Relevant(관련성)
5. Time-bound(기한설정)
6. 연습문제 3개`
      },
      {
        id: 23,
        question: '강의법의 장단점과 효과적인 활용방법을 설명하시오.',
        answer: '장점: 다수 대상 효율적, 단점: 일방적, 활용: 도입/요약에 적합',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 강의법의 장단점과 효과적인 활용방법을 설명하시오.

다음 순서로 설명해주세요:
1. 강의법의 정의와 특징
2. 강의법의 장점
3. 강의법의 단점
4. 효과적인 강의 기법
5. 연습문제 3개`
      },
      {
        id: 24,
        question: '토의법의 유형과 특징을 설명하시오.',
        answer: '브레인스토밍, 버즈세션, 패널토의, 심포지엄, 포럼 등',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 토의법의 유형과 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 브레인스토밍
2. 버즈세션(소집단 토의)
3. 패널토의
4. 심포지엄
5. 포럼
6. 연습문제 3개`
      },
      {
        id: 25,
        question: '역할극(Role Play)의 교육적 효과와 진행방법을 설명하시오.',
        answer: '공감능력 향상, 문제해결력 증진, 실제상황 연습 가능',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 역할극(Role Play)의 교육적 효과와 진행방법을 설명하시오.

다음 순서로 설명해주세요:
1. 역할극의 정의와 목적
2. 교육적 효과
3. 진행 단계
4. 보건교육에서의 활용 예시
5. 연습문제 3개`
      },
      {
        id: 26,
        question: '문제중심학습(PBL)의 특징과 절차를 설명하시오.',
        answer: '실제 문제 해결 중심, 자기주도학습, 협동학습, 촉진자 역할',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 문제중심학습(PBL)의 특징과 절차를 설명하시오.

다음 순서로 설명해주세요:
1. PBL의 정의와 특징
2. PBL의 교육적 효과
3. PBL 진행 절차
4. 보건교육에서의 PBL 적용
5. 연습문제 3개`
      },
      {
        id: 27,
        question: '시범교육(Demonstration)의 장점과 효과적인 진행방법을 설명하시오.',
        answer: '실기 기술 전달에 효과적, 단계별 시연과 연습 필요',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 시범교육(Demonstration)의 장점과 효과적인 진행방법을 설명하시오.

다음 순서로 설명해주세요:
1. 시범교육의 정의
2. 시범교육의 장점
3. 효과적인 시범 진행 단계
4. 보건교육에서의 활용 (CPR 등)
5. 연습문제 3개`
      },
      {
        id: 28,
        question: '교육매체 선정 시 고려해야 할 요소를 설명하시오.',
        answer: '학습목표, 학습자 특성, 교육환경, 비용, 접근성 등',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 교육매체 선정 시 고려해야 할 요소를 설명하시오.

다음 순서로 설명해주세요:
1. 학습목표와의 적합성
2. 학습자 특성 고려
3. 교육환경 조건
4. 비용 효과성
5. 매체 유형별 특징
6. 연습문제 3개`
      },
      {
        id: 29,
        question: '데일(Dale)의 경험원추(Cone of Experience)를 설명하시오.',
        answer: '추상적 경험(상징) → 구체적 경험(직접경험)의 11단계 위계',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 데일(Dale)의 경험원추(Cone of Experience)를 설명하시오.

다음 순서로 설명해주세요:
1. 경험원추의 개념
2. 11단계 경험의 위계
3. 추상적 경험과 구체적 경험
4. 보건교육 매체 선정에의 시사점
5. 연습문제 3개`
      },
      {
        id: 30,
        question: '효과적인 프레젠테이션 기법을 설명하시오.',
        answer: '도입-본론-결론 구조, 시각자료 활용, 청중 참여 유도',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 효과적인 프레젠테이션 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 프레젠테이션 구조 설계
2. 효과적인 시각자료 제작
3. 발표 기법 (목소리, 제스처)
4. 청중 참여 유도 방법
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'evaluation',
    name: '교육평가와 요구도 조사',
    color: 'from-purple-500 to-violet-500',
    questions: [
      {
        id: 31,
        question: '교육평가의 유형(진단/형성/총괄평가)을 설명하시오.',
        answer: '진단: 사전수준, 형성: 과정중, 총괄: 최종성과 평가',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 교육평가의 유형(진단/형성/총괄평가)을 설명하시오.

다음 순서로 설명해주세요:
1. 진단평가의 목적과 시기
2. 형성평가의 목적과 시기
3. 총괄평가의 목적과 시기
4. 각 평가유형의 활용 예시
5. 연습문제 3개`
      },
      {
        id: 32,
        question: '커크패트릭(Kirkpatrick)의 4단계 평가모형을 설명하시오.',
        answer: '반응(Reaction)-학습(Learning)-행동(Behavior)-결과(Results)',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 커크패트릭(Kirkpatrick)의 4단계 평가모형을 설명하시오.

다음 순서로 설명해주세요:
1. 1단계: 반응(Reaction) 평가
2. 2단계: 학습(Learning) 평가
3. 3단계: 행동(Behavior) 평가
4. 4단계: 결과(Results) 평가
5. 보건교육 평가에의 적용
6. 연습문제 3개`
      },
      {
        id: 33,
        question: '평가도구의 타당도(Validity) 유형을 설명하시오.',
        answer: '내용타당도, 준거타당도, 구인타당도',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 평가도구의 타당도(Validity) 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 타당도의 정의
2. 내용타당도(Content Validity)
3. 준거타당도(Criterion Validity)
4. 구인타당도(Construct Validity)
5. 타당도 확보 방법
6. 연습문제 3개`
      },
      {
        id: 34,
        question: '평가도구의 신뢰도(Reliability) 측정방법을 설명하시오.',
        answer: '검사-재검사, 동형검사, 반분, 내적일관성(Cronbach α)',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 평가도구의 신뢰도(Reliability) 측정방법을 설명하시오.

다음 순서로 설명해주세요:
1. 신뢰도의 정의
2. 검사-재검사 신뢰도
3. 동형검사 신뢰도
4. 반분 신뢰도
5. 내적일관성 (Cronbach α)
6. 연습문제 3개`
      },
      {
        id: 35,
        question: '요구도 조사(Needs Assessment)의 목적과 방법을 설명하시오.',
        answer: '현재 상태와 바람직한 상태의 격차 파악, 우선순위 결정',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 요구도 조사(Needs Assessment)의 목적과 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 요구도 조사의 정의와 목적
2. 요구의 유형 (규범적, 인지적, 표현적, 비교적)
3. 요구도 조사 방법
4. 우선순위 결정 기준
5. 연습문제 3개`
      },
      {
        id: 36,
        question: '설문지 문항 작성 시 주의사항을 설명하시오.',
        answer: '이중질문 금지, 유도질문 금지, 명확한 용어 사용, 적절한 응답범주',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 설문지 문항 작성 시 주의사항을 설명하시오.

다음 순서로 설명해주세요:
1. 이중질문(Double-barreled question) 피하기
2. 유도질문(Leading question) 피하기
3. 명확한 용어 사용
4. 응답범주 설계
5. 문항 배열 순서
6. 연습문제 3개`
      },
      {
        id: 37,
        question: '질적 자료수집 방법(면접, 관찰, 포커스그룹)을 비교 설명하시오.',
        answer: '면접: 심층탐색, 관찰: 행동관찰, FGD: 집단상호작용',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 질적 자료수집 방법(면접, 관찰, 포커스그룹)을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 심층면접(In-depth Interview)
2. 관찰법(Observation)
3. 포커스그룹 토의(FGD)
4. 각 방법의 장단점 비교
5. 연습문제 3개`
      },
      {
        id: 38,
        question: '리커트 척도(Likert Scale)의 특징과 활용방법을 설명하시오.',
        answer: '태도/의견 측정, 5점 또는 7점 척도, 등간척도로 간주',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 리커트 척도(Likert Scale)의 특징과 활용방법을 설명하시오.

다음 순서로 설명해주세요:
1. 리커트 척도의 정의
2. 척도 구성 방법 (5점, 7점)
3. 점수 계산 방법
4. 장점과 한계점
5. 보건교육 조사에서의 활용
6. 연습문제 3개`
      },
      {
        id: 39,
        question: '과정평가와 결과평가의 차이점을 설명하시오.',
        answer: '과정평가: 실행과정 모니터링, 결과평가: 목표달성도 측정',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 과정평가와 결과평가의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. 과정평가의 정의와 목적
2. 과정평가의 항목 (충실도, 참여율 등)
3. 결과평가의 정의와 목적
4. 결과평가의 항목 (지식, 태도, 행동)
5. 연습문제 3개`
      },
      {
        id: 40,
        question: '영향평가(Impact Evaluation)와 효과평가(Outcome Evaluation)를 비교하시오.',
        answer: '영향평가: 장기적 사회적 영향, 효과평가: 단기적 목표 달성',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 영향평가(Impact Evaluation)와 효과평가(Outcome Evaluation)를 비교하시오.

다음 순서로 설명해주세요:
1. 효과평가의 정의와 범위
2. 영향평가의 정의와 범위
3. 평가 시점의 차이
4. 평가 지표의 차이
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'program',
    name: '보건교육 프로그램 기획',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 41,
        question: 'PRECEDE-PROCEED 모형의 구성요소를 설명하시오.',
        answer: 'PRECEDE(사회/역학/행동환경/교육조직/행정정책진단), PROCEED(실행/평가)',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: PRECEDE-PROCEED 모형의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. PRECEDE의 5단계 진단
2. PROCEED의 4단계 평가
3. 모형의 특징과 장점
4. 보건교육 기획에의 적용
5. 연습문제 3개`
      },
      {
        id: 42,
        question: 'PRECEDE 모형에서 소인성/가능성/강화요인을 설명하시오.',
        answer: '소인성: 지식/태도, 가능성: 자원/기술, 강화: 보상/지지',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: PRECEDE 모형에서 소인성/가능성/강화요인을 설명하시오.

다음 순서로 설명해주세요:
1. 소인성 요인(Predisposing Factors)
2. 가능성 요인(Enabling Factors)
3. 강화요인(Reinforcing Factors)
4. 세 요인의 상호작용
5. 보건교육 전략 수립에의 적용
6. 연습문제 3개`
      },
      {
        id: 43,
        question: '보건교육 프로그램 목표 수립 시 고려사항을 설명하시오.',
        answer: '대상자 특성, 요구도, 자원, 기간, 측정가능성, 현실성',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육 프로그램 목표 수립 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 목표의 위계 (궁극적/중간/구체적)
2. SMART 원칙 적용
3. 대상자 특성 반영
4. 자원과 기간 고려
5. 연습문제 3개`
      },
      {
        id: 44,
        question: '보건교육 프로그램의 내용 선정 기준을 설명하시오.',
        answer: '요구도, 교육목표, 대상자 수준, 실용성, 최신성',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육 프로그램의 내용 선정 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 요구도 분석 결과 반영
2. 교육목표와의 연계성
3. 대상자 수준과 흥미
4. 내용의 실용성과 적용가능성
5. 연습문제 3개`
      },
      {
        id: 45,
        question: '보건교육 프로그램 예산 편성 시 고려사항을 설명하시오.',
        answer: '인건비, 운영비, 매체비, 평가비, 예비비 등 항목별 배분',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육 프로그램 예산 편성 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 예산 항목의 종류
2. 인건비 산정
3. 운영비/매체비 산정
4. 비용-효과 분석
5. 연습문제 3개`
      },
      {
        id: 46,
        question: '보건교육 프로그램 홍보 전략을 설명하시오.',
        answer: '대상자 분석, 매체 선정, 메시지 개발, 시기 결정, 효과 평가',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육 프로그램 홍보 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 홍보 대상 분석
2. 홍보 매체 선정
3. 홍보 메시지 개발
4. 홍보 시기와 빈도 결정
5. 연습문제 3개`
      },
      {
        id: 47,
        question: '건강증진사업의 우선순위 결정 기준을 설명하시오.',
        answer: '문제의 심각성, 해결가능성, 효과성, 비용효율성, 형평성',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 건강증진사업의 우선순위 결정 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 건강문제의 심각성/규모
2. 문제 해결 가능성
3. 중재의 효과성
4. 비용-효율성
5. PEARL 기준
6. 연습문제 3개`
      },
      {
        id: 48,
        question: '보건교육 프로그램 실행 시 장애요인과 극복방안을 설명하시오.',
        answer: '자원부족, 참여저조, 환경제약 등 장애요인별 극복전략',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육 프로그램 실행 시 장애요인과 극복방안을 설명하시오.

다음 순서로 설명해주세요:
1. 자원 관련 장애요인
2. 대상자 관련 장애요인
3. 환경 관련 장애요인
4. 각 장애요인별 극복방안
5. 연습문제 3개`
      },
      {
        id: 49,
        question: '보건교육 프로그램의 지속가능성 확보 방안을 설명하시오.',
        answer: '제도화, 역량강화, 지역사회 참여, 재정 확보, 네트워크 구축',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 보건교육 프로그램의 지속가능성 확보 방안을 설명하시오.

다음 순서로 설명해주세요:
1. 지속가능성의 개념
2. 제도화 전략
3. 지역사회 역량강화
4. 재정 확보 방안
5. 연습문제 3개`
      },
      {
        id: 50,
        question: '근거기반 보건교육(Evidence-based Health Education)의 개념을 설명하시오.',
        answer: '과학적 근거에 기반하여 효과가 입증된 중재 방법 적용',
        prompt: `보건교육사 2급 보건교육학개론 문제입니다.

문제: 근거기반 보건교육(Evidence-based Health Education)의 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 근거기반 실천의 정의
2. 근거의 수준과 유형
3. 근거 탐색 방법
4. 보건교육에의 적용
5. 연습문제 3개`
      },
    ],
  },
];

export default function HealthEducationIntroStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-2-intro-progress');
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
    localStorage.setItem('health-educator-2-intro-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-pink-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/health-educator-2" className="text-gray-600 hover:text-pink-600">보건교육사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">보건교육학개론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">📚</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">보건교육학개론 학습</h1>
                <p className="text-pink-100">보건교육사 2급 필기 1과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-pink-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
