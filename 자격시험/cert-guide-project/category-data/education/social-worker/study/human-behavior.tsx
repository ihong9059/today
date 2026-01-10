'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'psychodynamic',
    name: '정신역동이론',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '프로이트의 성격구조 3요소를 설명하고, 각각의 특징과 기능을 설명하시오.',
        answer: 'Id(원초아): 쾌락원리, Ego(자아): 현실원리, Superego(초자아): 도덕원리',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 프로이트의 성격구조 3요소를 설명하고, 각각의 특징과 기능을 설명하시오.

다음 순서로 설명해주세요:
1. Id(원초아): 쾌락원리, 무의식, 본능적 욕구
2. Ego(자아): 현실원리, 의식+무의식, 중재자 역할
3. Superego(초자아): 도덕원리, 양심과 이상적 자아
4. 세 요소 간의 갈등과 방어기제
5. 사회복지실천에서의 적용 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '융(Jung)의 분석심리학에서 집단무의식과 원형(Archetype)의 개념을 설명하시오.',
        answer: '집단무의식: 인류 공통 무의식, 원형: 페르소나, 그림자, 아니마/아니무스, 자기',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 융(Jung)의 분석심리학에서 집단무의식과 원형(Archetype)의 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 집단무의식의 정의와 특징
2. 개인무의식과의 차이점
3. 주요 원형: 페르소나, 그림자, 아니마/아니무스, 자기
4. 원형의 기능과 역할
5. 사회복지실천에서의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '에릭슨의 심리사회적 발달이론 8단계를 나열하고, 각 단계의 발달과업을 설명하시오.',
        answer: '신뢰감 대 불신감(0-1세), 자율성 대 수치심(1-3세) 등 8단계',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 에릭슨의 심리사회적 발달이론 8단계를 나열하고, 각 단계의 발달과업을 설명하시오.

다음 순서로 설명해주세요:
1. 8단계 전체 개요 (영아기~노년기)
2. 각 단계별 발달과업과 위기
3. 성공 시와 실패 시의 결과
4. 프로이트 이론과의 차이점
5. 생애주기별 사회복지실천 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '방어기제의 종류 10가지를 나열하고, 각각의 예시를 들어 설명하시오.',
        answer: '억압, 합리화, 투사, 승화, 퇴행, 반동형성, 부인, 전치, 동일시, 보상',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 방어기제의 종류 10가지를 나열하고, 각각의 예시를 들어 설명하시오.

다음 순서로 설명해주세요:
1. 방어기제의 정의와 기능
2. 10가지 방어기제 설명 (억압, 합리화, 투사, 승화, 퇴행, 반동형성, 부인, 전치, 동일시, 보상)
3. 각 방어기제의 구체적 사례
4. 성숙한 방어기제 vs 미성숙한 방어기제
5. 사회복지실천에서 클라이언트의 방어기제 다루기

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '아들러의 개인심리학 핵심개념(열등감, 우월성 추구, 생활양식, 사회적 관심)을 설명하시오.',
        answer: '열등감 극복 → 우월성 추구 → 생활양식 형성 → 사회적 관심 발달',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 아들러의 개인심리학 핵심개념(열등감, 우월성 추구, 생활양식, 사회적 관심)을 설명하시오.

다음 순서로 설명해주세요:
1. 열등감과 열등감 콤플렉스
2. 우월성 추구와 보상 메커니즘
3. 생활양식(라이프스타일)의 형성
4. 사회적 관심(공동체 감각)의 중요성
5. 출생순위와 성격 형성
6. 사회복지실천 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'behaviorism',
    name: '행동주의이론',
    color: 'from-rose-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '파블로프의 고전적 조건형성 과정을 단계별로 설명하고, 소거와 자발적 회복을 설명하시오.',
        answer: 'US→UR, CS+US→UR, CS→CR (조건형성), 소거, 자발적 회복',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 파블로프의 고전적 조건형성 과정을 단계별로 설명하고, 소거와 자발적 회복을 설명하시오.

다음 순서로 설명해주세요:
1. 무조건 자극(US)과 무조건 반응(UR)
2. 중성 자극이 조건 자극(CS)이 되는 과정
3. 조건 반응(CR)의 형성
4. 소거(Extinction): CS만 제시 시 CR 감소
5. 자발적 회복(Spontaneous Recovery)
6. 사회복지실천 적용 (공포증 치료 등)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '스키너의 조작적 조건형성에서 강화와 처벌의 종류를 구분하고 예시를 드시오.',
        answer: '정적강화, 부적강화, 정적처벌, 부적처벌',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 스키너의 조작적 조건형성에서 강화와 처벌의 종류를 구분하고 예시를 드시오.

다음 순서로 설명해주세요:
1. 정적 강화(Positive Reinforcement): 자극 제공
2. 부적 강화(Negative Reinforcement): 자극 제거
3. 정적 처벌(Positive Punishment): 혐오 자극 제공
4. 부적 처벌(Negative Punishment): 보상 제거
5. 강화계획(연속, 간헐)의 종류
6. 사회복지실천 적용 (행동수정 기법)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '반두라의 사회학습이론에서 관찰학습(모델링)의 4단계 과정을 설명하시오.',
        answer: '주의집중 → 파지 → 운동재생 → 동기화',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 반두라의 사회학습이론에서 관찰학습(모델링)의 4단계 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 주의집중(Attention): 모델 행동 관찰
2. 파지(Retention): 기억 과정
3. 운동재생(Motor Reproduction): 행동 재현
4. 동기화(Motivation): 강화와 동기
5. 자기효능감(Self-Efficacy) 개념
6. 사회복지실천 적용 (역할모델링)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '행동주의 치료기법 중 체계적 둔감화와 혐오치료를 설명하시오.',
        answer: '체계적 둔감화: 불안위계 + 이완훈련, 혐오치료: 부적 자극 결합',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 행동주의 치료기법 중 체계적 둔감화와 혐오치료를 설명하시오.

다음 순서로 설명해주세요:
1. 체계적 둔감화(Systematic Desensitization)의 절차
2. 불안 위계 작성과 이완훈련
3. 혐오치료(Aversion Therapy)의 원리
4. 각 기법의 적용 대상
5. 장단점과 윤리적 고려사항
6. 사회복지실천 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '토큰 경제(Token Economy)의 원리와 실행 절차를 설명하시오.',
        answer: '목표행동 설정 → 토큰 제공 → 백업 강화물 교환',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 토큰 경제(Token Economy)의 원리와 실행 절차를 설명하시오.

다음 순서로 설명해주세요:
1. 토큰 경제의 정의와 이론적 배경
2. 목표행동 구체적 설정
3. 토큰의 제공 규칙
4. 백업 강화물(backup reinforcer) 선정
5. 실행 시 유의사항
6. 사회복지 현장 적용 (정신병동, 아동시설 등)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'humanism',
    name: '인본주의이론',
    color: 'from-orange-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '매슬로우의 욕구위계론 5단계를 설명하고, 자아실현의 특징을 서술하시오.',
        answer: '생리적 욕구 → 안전 → 소속/애정 → 존중 → 자아실현',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 매슬로우의 욕구위계론 5단계를 설명하고, 자아실현의 특징을 서술하시오.

다음 순서로 설명해주세요:
1. 욕구위계 5단계 (생리적→안전→소속/애정→존중→자아실현)
2. 결핍욕구 vs 성장욕구
3. 자아실현인의 특징 15가지
4. 절정경험(Peak Experience)
5. 욕구위계론에 대한 비판
6. 사회복지실천 적용 (클라이언트 욕구 사정)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '로저스의 인간중심 상담이론에서 3대 핵심조건을 설명하시오.',
        answer: '무조건적 긍정적 존중, 공감적 이해, 일치성(진솔성)',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 로저스의 인간중심 상담이론에서 3대 핵심조건을 설명하시오.

다음 순서로 설명해주세요:
1. 무조건적 긍정적 존중(Unconditional Positive Regard)
2. 공감적 이해(Empathic Understanding)
3. 일치성/진솔성(Congruence/Genuineness)
4. 실현화 경향(Actualizing Tendency)
5. 완전히 기능하는 사람(Fully Functioning Person)
6. 사회복지실천에서 치료적 관계 형성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '로저스의 현상학적 장이론에서 자기개념의 형성과정을 설명하시오.',
        answer: '현실적 자기 vs 이상적 자기, 일치/불일치',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 로저스의 현상학적 장이론에서 자기개념의 형성과정을 설명하시오.

다음 순서로 설명해주세요:
1. 현상학적 장(Phenomenal Field)의 개념
2. 자기(Self)와 자기개념(Self-Concept)
3. 현실적 자기 vs 이상적 자기
4. 일치(Congruence)와 불일치(Incongruence)
5. 조건적 가치(Conditions of Worth)
6. 심리적 부적응과 치료

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '인본주의 심리학의 주요 특징과 행동주의와의 차이점을 비교 설명하시오.',
        answer: '자유의지, 주관적 경험, 전인적 인간관 vs 결정론, 객관적 행동',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 인본주의 심리학의 주요 특징과 행동주의와의 차이점을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 인본주의의 기본 가정 (자유의지, 성장 잠재력)
2. 주관적 경험과 현상학적 접근
3. 전인적 인간관
4. 행동주의와의 비교 (결정론 vs 자유의지)
5. 인본주의에 대한 비판
6. 사회복지실천에서의 통합적 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '게슈탈트 치료의 주요 기법(빈 의자 기법, 여기-지금 원리)을 설명하시오.',
        answer: '빈 의자: 미해결 과제 해결, 여기-지금: 현재 경험 집중',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 게슈탈트 치료의 주요 기법(빈 의자 기법, 여기-지금 원리)을 설명하시오.

다음 순서로 설명해주세요:
1. 게슈탈트 치료의 기본 원리
2. 빈 의자 기법(Empty Chair Technique)
3. 여기-지금(Here and Now) 원리
4. 알아차림(Awareness) 증진
5. 미해결 과제(Unfinished Business)
6. 사회복지실천 적용 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'cognitive',
    name: '인지이론',
    color: 'from-blue-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '피아제의 인지발달 4단계를 설명하고, 각 단계의 특징을 서술하시오.',
        answer: '감각운동기(0-2세) → 전조작기(2-7세) → 구체적 조작기(7-11세) → 형식적 조작기(11세~)',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 피아제의 인지발달 4단계를 설명하고, 각 단계의 특징을 서술하시오.

다음 순서로 설명해주세요:
1. 감각운동기(0-2세): 대상영속성 획득
2. 전조작기(2-7세): 자아중심성, 물활론, 보존개념 미발달
3. 구체적 조작기(7-11세): 보존개념, 서열화, 분류
4. 형식적 조작기(11세~): 추상적 사고, 가설-연역적 사고
5. 도식, 동화, 조절, 평형화
6. 사회복지실천 적용 (아동 발달 사정)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '콜버그의 도덕성 발달 3수준 6단계를 설명하시오.',
        answer: '인습 이전(1,2단계) → 인습(3,4단계) → 인습 이후(5,6단계)',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 콜버그의 도덕성 발달 3수준 6단계를 설명하시오.

다음 순서로 설명해주세요:
1. 인습 이전 수준: 1단계(처벌과 복종), 2단계(도구적 상대주의)
2. 인습 수준: 3단계(대인관계 조화), 4단계(법과 질서)
3. 인습 이후 수준: 5단계(사회계약), 6단계(보편적 윤리)
4. 하인츠 딜레마 사례
5. 콜버그 이론 비판 (길리건의 배려 윤리)
6. 사회복지실천 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '엘리스의 합리정서행동치료(REBT)에서 ABC 이론을 설명하시오.',
        answer: 'A(사건) - B(신념) - C(결과), 비합리적 신념 논박',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 엘리스의 합리정서행동치료(REBT)에서 ABC 이론을 설명하시오.

다음 순서로 설명해주세요:
1. A(Activating Event): 선행사건
2. B(Belief): 신념 체계
3. C(Consequence): 정서적·행동적 결과
4. D(Dispute): 비합리적 신념 논박
5. E(Effect): 효과적 새로운 철학
6. 11가지 비합리적 신념
7. 사회복지실천 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '벡의 인지치료에서 인지왜곡의 종류를 5가지 이상 설명하시오.',
        answer: '이분법적 사고, 과잉일반화, 선택적 추상화, 개인화, 파국화 등',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 벡의 인지치료에서 인지왜곡의 종류를 5가지 이상 설명하시오.

다음 순서로 설명해주세요:
1. 이분법적 사고(All-or-Nothing Thinking)
2. 과잉일반화(Overgeneralization)
3. 선택적 추상화(Mental Filter)
4. 개인화(Personalization)
5. 파국화(Catastrophizing)
6. 자동적 사고와 핵심신념
7. 우울증 치료에 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '비고츠키의 사회문화적 인지이론에서 근접발달영역(ZPD)을 설명하시오.',
        answer: 'ZPD: 혼자 vs 도움 받아 할 수 있는 능력 차이, 비계설정',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 비고츠키의 사회문화적 인지이론에서 근접발달영역(ZPD)을 설명하시오.

다음 순서로 설명해주세요:
1. 근접발달영역(Zone of Proximal Development)의 정의
2. 실제 발달 수준 vs 잠재적 발달 수준
3. 비계설정(Scaffolding)의 개념과 기법
4. 사적 언어(Private Speech)의 역할
5. 피아제와의 차이점 (사회적 vs 개인적)
6. 사회복지실천 적용 (교육, 치료)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'life-span',
    name: '생애주기별 발달',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '영아기(0-2세)의 발달특징과 사회복지실천 과제를 설명하시오.',
        answer: '애착형성, 기본적 신뢰감, 감각운동기, 영아보육서비스',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 영아기(0-2세)의 발달특징과 사회복지실천 과제를 설명하시오.

다음 순서로 설명해주세요:
1. 신체 및 운동 발달
2. 인지 발달 (감각운동기, 대상영속성)
3. 정서 및 사회성 발달 (애착 형성)
4. 볼비의 애착이론과 에인스워스의 애착 유형
5. 기본적 신뢰감 형성 (에릭슨)
6. 사회복지실천: 영아보육, 아동학대 예방, 부모교육

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '청소년기의 발달특징(정체감 형성, 제2반항기)과 사회복지실천을 설명하시오.',
        answer: '정체감 확립, 2차 성징, 추상적 사고, 학교사회복지',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 청소년기의 발달특징(정체감 형성, 제2반항기)과 사회복지실천을 설명하시오.

다음 순서로 설명해주세요:
1. 신체 발달 (2차 성징, 급성장)
2. 인지 발달 (형식적 조작기, 자아중심성)
3. 정서 및 사회성 발달 (정체감 확립 vs 역할 혼미)
4. 제2반항기와 또래집단의 중요성
5. 청소년기 문제 (비행, 가출, 학교부적응)
6. 사회복지실천: 학교사회복지, 청소년상담, 진로지도

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '노년기의 발달특징과 성공적 노화를 위한 사회복지실천을 설명하시오.',
        answer: '신체 쇠퇴, 은퇴, 죽음 준비, 자아통합, 노인복지서비스',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 노년기의 발달특징과 성공적 노화를 위한 사회복지실천을 설명하시오.

다음 순서로 설명해주세요:
1. 신체적 변화 (감각기능 저하, 만성질환)
2. 인지적 변화 (결정성 지능 vs 유동성 지능)
3. 사회적 변화 (은퇴, 역할 상실, 배우자 사별)
4. 자아통합 vs 절망 (에릭슨)
5. 성공적 노화 이론 (활동이론, 분리이론, 연속성이론)
6. 사회복지실천: 노인복지관, 요양서비스, 치매 케어

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '중년기의 발달 위기와 사회복지실천 과제를 설명하시오.',
        answer: '생산성 vs 침체성, 갱년기, 빈둥지 증후군, 샌드위치 세대',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 중년기의 발달 위기와 사회복지실천 과제를 설명하시오.

다음 순서로 설명해주세요:
1. 신체적 변화 (갱년기, 체력 저하)
2. 심리적 변화 (중년의 위기, 자아 재평가)
3. 생산성 대 침체성 (에릭슨)
4. 사회적 역할 변화 (자녀 독립, 노부모 부양)
5. 빈둥지 증후군, 샌드위치 세대
6. 사회복지실천: 가족상담, 직업재활, 부양부담 경감

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '영유아기 애착의 중요성과 애착장애 유형을 설명하시오.',
        answer: '안정애착, 불안정애착(회피, 저항, 혼란), 반응성 애착장애',
        prompt: `사회복지사 1급 인간행동과 사회환경 문제입니다.

문제: 영유아기 애착의 중요성과 애착장애 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 볼비의 애착이론 (내적 작동 모델)
2. 에인스워스의 낯선 상황 실험
3. 애착 유형: 안정애착, 불안정 회피, 불안정 저항, 혼란
4. 반응성 애착장애(RAD)의 특징
5. 애착 손상의 장기적 영향
6. 사회복지실천: 애착 증진 프로그램, 위탁아동 지원

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function HumanBehaviorStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-worker-human-behavior-progress');
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
    localStorage.setItem('social-worker-human-behavior-progress', JSON.stringify(newCompleted));
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
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/education/social-worker" className="text-gray-600 hover:text-pink-600">사회복지사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">인간행동과 사회환경</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🤝</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">인간행동과 사회환경 학습</h1>
                <p className="text-pink-100">사회복지사 1급 - 사회복지기초 영역</p>
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
