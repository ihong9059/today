'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'hbm',
    name: '건강신념모형(HBM)',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '건강신념모형(Health Belief Model)의 핵심 구성요소를 설명하시오.',
        answer: '지각된 민감성, 지각된 심각성, 지각된 이익, 지각된 장애',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형(Health Belief Model)의 핵심 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 건강신념모형의 개발 배경
2. 지각된 민감성(Perceived Susceptibility)
3. 지각된 심각성(Perceived Severity)
4. 지각된 이익(Perceived Benefits)
5. 지각된 장애(Perceived Barriers)
6. 연습문제 3개`
      },
      {
        id: 2,
        question: '건강신념모형에서 "지각된 민감성"의 개념과 측정 방법을 설명하시오.',
        answer: '특정 질병에 걸릴 가능성에 대한 주관적 인식',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형에서 "지각된 민감성"의 개념과 측정 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 지각된 민감성의 정의
2. 개인적 취약성 인식
3. 측정 문항 예시
4. 지각된 민감성 증가 전략
5. 연습문제 3개`
      },
      {
        id: 3,
        question: '건강신념모형에서 "지각된 심각성"의 개념을 설명하시오.',
        answer: '질병에 걸렸을 때 결과의 심각성에 대한 주관적 인식',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형에서 "지각된 심각성"의 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 지각된 심각성의 정의
2. 의학적 vs 사회적 심각성
3. 측정 문항 예시
4. 지각된 심각성 증가 전략
5. 연습문제 3개`
      },
      {
        id: 4,
        question: '건강신념모형에서 "지각된 위협"의 개념을 설명하시오.',
        answer: '지각된 민감성 × 지각된 심각성 = 지각된 위협',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형에서 "지각된 위협"의 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 지각된 위협의 정의
2. 민감성과 심각성의 조합
3. 행동 동기로서의 위협
4. 적정 수준의 위협
5. 연습문제 3개`
      },
      {
        id: 5,
        question: '건강신념모형에서 "지각된 이익"과 "지각된 장애"의 관계를 설명하시오.',
        answer: '행동의 이익이 장애보다 클 때 행동 가능성 증가',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형에서 "지각된 이익"과 "지각된 장애"의 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 지각된 이익의 정의와 예시
2. 지각된 장애의 정의와 예시
3. 비용-편익 분석
4. 장애 극복 전략
5. 연습문제 3개`
      },
      {
        id: 6,
        question: '건강신념모형에서 "행동의 계기"의 역할을 설명하시오.',
        answer: '내적(증상)/외적(미디어, 타인) 계기가 행동 촉발',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형에서 "행동의 계기"의 역할을 설명하시오.

다음 순서로 설명해주세요:
1. 행동의 계기(Cues to Action) 정의
2. 내적 계기의 예시
3. 외적 계기의 예시
4. 보건교육에서의 활용
5. 연습문제 3개`
      },
      {
        id: 7,
        question: '건강신념모형에서 "자기효능감"의 추가 배경과 역할을 설명하시오.',
        answer: '반두라의 자기효능감 개념 추가, 행동 수행 능력에 대한 확신',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형에서 "자기효능감"의 추가 배경과 역할을 설명하시오.

다음 순서로 설명해주세요:
1. 자기효능감 추가 배경
2. 자기효능감의 정의
3. HBM에서의 자기효능감 역할
4. 자기효능감 향상 전략
5. 연습문제 3개`
      },
      {
        id: 8,
        question: '건강신념모형의 장점과 한계점을 설명하시오.',
        answer: '장점: 이해 용이, 광범위 적용 / 한계: 사회환경 무시, 습관적 행동 설명 부족',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형의 장점과 한계점을 설명하시오.

다음 순서로 설명해주세요:
1. HBM의 장점
2. HBM의 한계점
3. 적용에 적합한 건강행동
4. 다른 이론과의 통합 필요성
5. 연습문제 3개`
      },
      {
        id: 9,
        question: '건강신념모형을 금연 프로그램에 적용하는 방법을 설명하시오.',
        answer: '폐암 위험 인식(민감성/심각성), 금연 이점, 장애 극복, 금연 자신감',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형을 금연 프로그램에 적용하는 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 지각된 민감성/심각성 적용
2. 지각된 이익 강조
3. 지각된 장애 극복 전략
4. 행동 계기 제공
5. 연습문제 3개`
      },
      {
        id: 10,
        question: '건강신념모형을 암 검진 수검률 향상에 적용하는 방법을 설명하시오.',
        answer: '암 위험 인식, 조기발견 이점, 검진 장벽 해소, 리마인더 제공',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강신념모형을 암 검진 수검률 향상에 적용하는 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 암 발생 위험 인식 제고
2. 조기 검진의 이점 강조
3. 검진 장벽 분석 및 해소
4. 검진 계기 제공 방법
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'tpb',
    name: '계획행동이론(TPB)',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 11,
        question: '합리적 행위이론(TRA)의 구성요소를 설명하시오.',
        answer: '행동에 대한 태도 + 주관적 규범 → 의도 → 행동',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 합리적 행위이론(TRA)의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. TRA의 개발 배경
2. 행동에 대한 태도
3. 주관적 규범
4. 행동 의도
5. TRA의 한계점
6. 연습문제 3개`
      },
      {
        id: 12,
        question: '계획행동이론(TPB)이 TRA에서 추가한 구성요소를 설명하시오.',
        answer: '지각된 행동통제력(Perceived Behavioral Control) 추가',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 계획행동이론(TPB)이 TRA에서 추가한 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. TRA의 한계
2. 지각된 행동통제력의 정의
3. 통제신념과 지각된 능력
4. TPB의 전체 모형
5. 연습문제 3개`
      },
      {
        id: 13,
        question: '계획행동이론에서 "행동에 대한 태도"의 구성요소를 설명하시오.',
        answer: '행동신념(Behavioral Beliefs) × 결과평가(Outcome Evaluation)',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 계획행동이론에서 "행동에 대한 태도"의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 태도의 정의
2. 행동신념의 개념
3. 결과평가의 개념
4. 태도 측정 방법
5. 연습문제 3개`
      },
      {
        id: 14,
        question: '계획행동이론에서 "주관적 규범"의 구성요소를 설명하시오.',
        answer: '규범적 신념(Normative Beliefs) × 순응 동기(Motivation to Comply)',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 계획행동이론에서 "주관적 규범"의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 주관적 규범의 정의
2. 규범적 신념의 개념
3. 순응 동기의 개념
4. 주관적 규범 측정 방법
5. 연습문제 3개`
      },
      {
        id: 15,
        question: '계획행동이론에서 "지각된 행동통제력"의 구성요소를 설명하시오.',
        answer: '통제신념(Control Beliefs) × 지각된 능력(Perceived Power)',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 계획행동이론에서 "지각된 행동통제력"의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 지각된 행동통제력의 정의
2. 통제신념의 개념
3. 지각된 능력의 개념
4. 자기효능감과의 관계
5. 연습문제 3개`
      },
      {
        id: 16,
        question: '계획행동이론에서 "의도"와 "행동"의 관계를 설명하시오.',
        answer: '의도는 행동의 가장 강력한 예측변인, 지각된 통제력이 직접 영향도 가능',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 계획행동이론에서 "의도"와 "행동"의 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 행동 의도의 정의
2. 의도-행동 간극(Gap)
3. 지각된 통제력의 직접 효과
4. 의도 측정 방법
5. 연습문제 3개`
      },
      {
        id: 17,
        question: '계획행동이론의 장점과 한계점을 설명하시오.',
        answer: '장점: 예측력, 체계적 / 한계: 정서 무시, 과거행동 무시',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 계획행동이론의 장점과 한계점을 설명하시오.

다음 순서로 설명해주세요:
1. TPB의 장점
2. TPB의 한계점
3. 이론의 확장 (과거행동, 자기정체성)
4. 적용에 적합한 건강행동
5. 연습문제 3개`
      },
      {
        id: 18,
        question: '계획행동이론을 운동 실천 프로그램에 적용하는 방법을 설명하시오.',
        answer: '운동에 대한 긍정적 태도, 사회적 지지, 운동 자신감 증진',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 계획행동이론을 운동 실천 프로그램에 적용하는 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 운동에 대한 태도 변화 전략
2. 주관적 규범 활용 (가족, 친구)
3. 지각된 통제력 향상 방안
4. 운동 의도 형성 촉진
5. 연습문제 3개`
      },
      {
        id: 19,
        question: '계획행동이론에서 기술적 규범(Descriptive Norm)의 개념을 설명하시오.',
        answer: '다른 사람들이 실제로 어떻게 행동하는가에 대한 인식',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 계획행동이론에서 기술적 규범(Descriptive Norm)의 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 기술적 규범의 정의
2. 명령적 규범과의 차이
3. 기술적 규범의 영향력
4. 보건교육에서의 활용
5. 연습문제 3개`
      },
      {
        id: 20,
        question: '의도-행동 간극(Intention-Behavior Gap)을 줄이는 전략을 설명하시오.',
        answer: '실행의도(Implementation Intention), 행동계획, 자기모니터링',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 의도-행동 간극(Intention-Behavior Gap)을 줄이는 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 의도-행동 간극의 원인
2. 실행의도 (When-Where-How)
3. 구체적 행동계획 수립
4. 자기모니터링과 피드백
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'ttm',
    name: '범이론적모형(TTM)',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 21,
        question: '범이론적 모형(Transtheoretical Model)의 5가지 변화단계를 설명하시오.',
        answer: '계획전단계→계획단계→준비단계→행동단계→유지단계',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형(Transtheoretical Model)의 5가지 변화단계를 설명하시오.

다음 순서로 설명해주세요:
1. 계획전단계(Precontemplation)
2. 계획단계(Contemplation)
3. 준비단계(Preparation)
4. 행동단계(Action)
5. 유지단계(Maintenance)
6. 연습문제 3개`
      },
      {
        id: 22,
        question: '범이론적 모형에서 "계획전단계"의 특성과 개입 전략을 설명하시오.',
        answer: '변화 의도 없음, 인식 제고와 정보 제공 필요',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형에서 "계획전단계"의 특성과 개입 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 계획전단계의 정의
2. 이 단계 대상자의 특성
3. 변화 저항의 원인
4. 효과적인 개입 전략
5. 연습문제 3개`
      },
      {
        id: 23,
        question: '범이론적 모형에서 "계획단계"의 특성과 개입 전략을 설명하시오.',
        answer: '6개월 내 변화 고려, 양가감정 탐색과 동기강화 필요',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형에서 "계획단계"의 특성과 개입 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 계획단계의 정의
2. 양가감정(Ambivalence)의 특성
3. 의사결정균형 분석
4. 동기강화 전략
5. 연습문제 3개`
      },
      {
        id: 24,
        question: '범이론적 모형에서 "준비단계"의 특성과 개입 전략을 설명하시오.',
        answer: '1개월 내 행동 계획, 구체적 실행계획과 기술훈련 필요',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형에서 "준비단계"의 특성과 개입 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 준비단계의 정의
2. 행동 준비 표지
3. 구체적 목표 설정
4. 자원 확보와 기술 훈련
5. 연습문제 3개`
      },
      {
        id: 25,
        question: '범이론적 모형에서 "행동단계"의 특성과 개입 전략을 설명하시오.',
        answer: '6개월 미만 행동 변화, 강화와 지지 체계 필요',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형에서 "행동단계"의 특성과 개입 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 행동단계의 정의
2. 행동 변화 유지의 어려움
3. 강화와 보상 전략
4. 사회적 지지 활용
5. 연습문제 3개`
      },
      {
        id: 26,
        question: '범이론적 모형에서 "유지단계"의 특성과 개입 전략을 설명하시오.',
        answer: '6개월 이상 행동 유지, 재발 방지와 자기효능감 강화',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형에서 "유지단계"의 특성과 개입 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 유지단계의 정의
2. 재발(Relapse)의 위험
3. 재발 방지 전략
4. 장기 유지 지원
5. 연습문제 3개`
      },
      {
        id: 27,
        question: '범이론적 모형의 "변화과정" 10가지를 설명하시오.',
        answer: '인지적 과정 5가지 + 행동적 과정 5가지',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형의 "변화과정" 10가지를 설명하시오.

다음 순서로 설명해주세요:
1. 인지적/경험적 과정 5가지
2. 행동적 과정 5가지
3. 단계별 적합한 변화과정
4. 변화과정 활용 전략
5. 연습문제 3개`
      },
      {
        id: 28,
        question: '범이론적 모형에서 "의사결정균형"의 개념을 설명하시오.',
        answer: '변화의 장점(Pros)과 단점(Cons)의 비교 평가',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형에서 "의사결정균형"의 개념을 설명하시오.

다음 순서로 설명해주세요:
1. 의사결정균형의 정의
2. 장점(Pros)과 단점(Cons)
3. 단계별 의사결정균형 변화
4. 균형 전환 전략
5. 연습문제 3개`
      },
      {
        id: 29,
        question: '범이론적 모형에서 "자기효능감"의 역할을 설명하시오.',
        answer: '단계 진행에 따라 자기효능감 증가, 유혹(Temptation) 감소',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형에서 "자기효능감"의 역할을 설명하시오.

다음 순서로 설명해주세요:
1. TTM에서 자기효능감의 위치
2. 단계별 자기효능감 변화
3. 유혹(Temptation)과의 관계
4. 자기효능감 강화 전략
5. 연습문제 3개`
      },
      {
        id: 30,
        question: '범이론적 모형의 장점과 한계점을 설명하시오.',
        answer: '장점: 단계별 맞춤 개입 / 한계: 선형적 진행 가정, 측정 어려움',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 범이론적 모형의 장점과 한계점을 설명하시오.

다음 순서로 설명해주세요:
1. TTM의 장점
2. TTM의 한계점
3. 적용에 적합한 건강행동
4. 실제 적용 시 고려사항
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'social',
    name: '사회인지이론(SCT)',
    color: 'from-orange-500 to-amber-500',
    questions: [
      {
        id: 31,
        question: '사회인지이론(Social Cognitive Theory)의 핵심 개념인 "상호결정론"을 설명하시오.',
        answer: '개인(인지)-행동-환경의 상호 영향 관계',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론(Social Cognitive Theory)의 핵심 개념인 "상호결정론"을 설명하시오.

다음 순서로 설명해주세요:
1. 상호결정론(Reciprocal Determinism)의 정의
2. 개인 요인 (인지, 정서, 생물학적)
3. 행동 요인
4. 환경 요인
5. 세 요인의 상호작용 예시
6. 연습문제 3개`
      },
      {
        id: 32,
        question: '사회인지이론에서 "자기효능감"의 4가지 원천을 설명하시오.',
        answer: '성공경험, 대리경험, 언어적 설득, 생리적/정서적 상태',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론에서 "자기효능감"의 4가지 원천을 설명하시오.

다음 순서로 설명해주세요:
1. 성공경험(Mastery Experience)
2. 대리경험(Vicarious Experience)
3. 언어적 설득(Verbal Persuasion)
4. 생리적/정서적 상태
5. 자기효능감 증진 전략
6. 연습문제 3개`
      },
      {
        id: 33,
        question: '사회인지이론에서 "관찰학습"의 4단계를 설명하시오.',
        answer: '주의-기억-재생-동기의 4단계',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론에서 "관찰학습"의 4단계를 설명하시오.

다음 순서로 설명해주세요:
1. 주의(Attention) 과정
2. 기억(Retention) 과정
3. 재생(Reproduction) 과정
4. 동기(Motivation) 과정
5. 보건교육에서의 적용
6. 연습문제 3개`
      },
      {
        id: 34,
        question: '사회인지이론에서 "결과기대"의 유형을 설명하시오.',
        answer: '신체적 결과기대, 사회적 결과기대, 자기평가적 결과기대',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론에서 "결과기대"의 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 결과기대(Outcome Expectation)의 정의
2. 신체적 결과기대
3. 사회적 결과기대
4. 자기평가적 결과기대
5. 연습문제 3개`
      },
      {
        id: 35,
        question: '사회인지이론에서 "자기조절"의 과정을 설명하시오.',
        answer: '자기관찰-자기판단-자기반응의 순환 과정',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론에서 "자기조절"의 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 자기조절(Self-Regulation)의 정의
2. 자기관찰(Self-Observation)
3. 자기판단(Self-Judgment)
4. 자기반응(Self-Reaction)
5. 자기조절 전략 활용
6. 연습문제 3개`
      },
      {
        id: 36,
        question: '사회인지이론에서 "목표설정"의 원칙을 설명하시오.',
        answer: '근접목표 vs 원거리목표, 구체적, 도전적이나 달성가능한 목표',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론에서 "목표설정"의 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 목표설정의 중요성
2. 근접목표와 원거리목표
3. 효과적인 목표의 특성
4. 목표 달성과 자기효능감
5. 연습문제 3개`
      },
      {
        id: 37,
        question: '사회인지이론에서 "강화"의 유형을 설명하시오.',
        answer: '직접 강화, 대리 강화, 자기 강화',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론에서 "강화"의 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 강화(Reinforcement)의 정의
2. 직접 강화
3. 대리 강화
4. 자기 강화
5. 보건교육에서의 강화 활용
6. 연습문제 3개`
      },
      {
        id: 38,
        question: '사회인지이론에서 "환경"의 개념과 유형을 설명하시오.',
        answer: '부과된 환경, 선택된 환경, 창조된 환경',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론에서 "환경"의 개념과 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 환경의 정의 (객관적 vs 주관적)
2. 부과된 환경(Imposed Environment)
3. 선택된 환경(Selected Environment)
4. 창조된 환경(Created Environment)
5. 연습문제 3개`
      },
      {
        id: 39,
        question: '사회인지이론을 체중관리 프로그램에 적용하는 방법을 설명하시오.',
        answer: '자기효능감, 결과기대, 목표설정, 자기모니터링, 사회적 지지',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론을 체중관리 프로그램에 적용하는 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 자기효능감 증진 전략
2. 긍정적 결과기대 형성
3. 현실적 목표 설정
4. 자기모니터링 기술
5. 사회적 지지 환경 조성
6. 연습문제 3개`
      },
      {
        id: 40,
        question: '사회인지이론의 장점과 한계점을 설명하시오.',
        answer: '장점: 포괄적, 환경 고려 / 한계: 복잡성, 측정 어려움',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회인지이론의 장점과 한계점을 설명하시오.

다음 순서로 설명해주세요:
1. SCT의 장점
2. SCT의 한계점
3. 다른 이론과의 비교
4. 실제 적용 시 고려사항
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'ecological',
    name: '생태학적 모형과 기타 이론',
    color: 'from-cyan-500 to-teal-500',
    questions: [
      {
        id: 41,
        question: '사회생태학적 모형의 다수준 접근을 설명하시오.',
        answer: '개인-대인관계-조직-지역사회-정책의 5수준',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회생태학적 모형의 다수준 접근을 설명하시오.

다음 순서로 설명해주세요:
1. 사회생태학적 관점의 핵심 원리
2. 개인 수준
3. 대인관계 수준
4. 조직/제도 수준
5. 지역사회/정책 수준
6. 연습문제 3개`
      },
      {
        id: 42,
        question: '사회생태학적 모형에서 "상호작용"의 원리를 설명하시오.',
        answer: '각 수준 간 상호 영향, 다수준 개입의 시너지 효과',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회생태학적 모형에서 "상호작용"의 원리를 설명하시오.

다음 순서로 설명해주세요:
1. 수준 간 상호작용의 의미
2. 개인-환경 적합성
3. 다수준 개입의 필요성
4. 시너지 효과
5. 연습문제 3개`
      },
      {
        id: 43,
        question: '사회적 지지(Social Support)의 유형과 건강에 미치는 영향을 설명하시오.',
        answer: '정서적/정보적/도구적/평가적 지지, 스트레스 완충 효과',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회적 지지(Social Support)의 유형과 건강에 미치는 영향을 설명하시오.

다음 순서로 설명해주세요:
1. 사회적 지지의 정의
2. 4가지 지지 유형
3. 직접 효과와 완충 효과
4. 사회적 지지 강화 전략
5. 연습문제 3개`
      },
      {
        id: 44,
        question: '사회적 네트워크(Social Network)의 특성과 건강 영향을 설명하시오.',
        answer: '네트워크 크기, 밀도, 동질성, 호혜성이 건강행동에 영향',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 사회적 네트워크(Social Network)의 특성과 건강 영향을 설명하시오.

다음 순서로 설명해주세요:
1. 사회적 네트워크의 정의
2. 네트워크 구조적 특성
3. 네트워크가 건강에 미치는 영향
4. 네트워크 기반 개입 전략
5. 연습문제 3개`
      },
      {
        id: 45,
        question: '건강행동 변화의 "보호동기이론"을 설명하시오.',
        answer: '위협평가(심각성×취약성)와 대처평가(반응효능감×자기효능감)',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강행동 변화의 "보호동기이론"을 설명하시오.

다음 순서로 설명해주세요:
1. 보호동기이론의 개발 배경
2. 위협 평가 과정
3. 대처 평가 과정
4. 보호동기와 행동 변화
5. 연습문제 3개`
      },
      {
        id: 46,
        question: '정보-동기-행동기술 모형(IMB Model)을 설명하시오.',
        answer: '정보(지식) + 동기(태도/사회적규범) + 행동기술 → 건강행동',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 정보-동기-행동기술 모형(IMB Model)을 설명하시오.

다음 순서로 설명해주세요:
1. IMB 모형의 개발 배경
2. 정보(Information) 구성요소
3. 동기(Motivation) 구성요소
4. 행동기술(Behavioral Skills)
5. 연습문제 3개`
      },
      {
        id: 47,
        question: '건강행동과정접근(HAPA) 모형을 설명하시오.',
        answer: '동기단계(의도형성)와 의지단계(행동실행)의 구분',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강행동과정접근(HAPA) 모형을 설명하시오.

다음 순서로 설명해주세요:
1. HAPA 모형의 특징
2. 동기단계 (의도 형성)
3. 의지단계 (행동 실행)
4. 계획과 자기효능감의 역할
5. 연습문제 3개`
      },
      {
        id: 48,
        question: '확산이론(Diffusion of Innovation)의 채택자 유형을 설명하시오.',
        answer: '혁신자→초기채택자→전기다수→후기다수→지각수용자',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 확산이론(Diffusion of Innovation)의 채택자 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 확산이론의 개요
2. 5가지 채택자 유형
3. 혁신의 특성 (상대적 이점, 적합성 등)
4. 보건프로그램 확산에의 적용
5. 연습문제 3개`
      },
      {
        id: 49,
        question: '건강행동이론 선택 시 고려사항을 설명하시오.',
        answer: '대상행동, 대상자 특성, 환경, 개입 수준에 따른 이론 선택',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 건강행동이론 선택 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 대상 건강행동의 특성
2. 대상자/집단의 특성
3. 개입 수준 (개인, 조직, 지역사회)
4. 이론 통합 접근
5. 연습문제 3개`
      },
      {
        id: 50,
        question: '여러 건강행동이론을 통합 적용하는 방법을 설명하시오.',
        answer: '개인수준(HBM, TPB) + 대인관계(SCT) + 환경(생태학적 모형) 통합',
        prompt: `보건교육사 2급 건강행동이론 문제입니다.

문제: 여러 건강행동이론을 통합 적용하는 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 이론 통합의 필요성
2. 수준별 이론 조합
3. 통합 모형의 예시
4. 통합 적용 시 주의사항
5. 연습문제 3개`
      },
    ],
  },
];

export default function HealthBehaviorStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-2-behavior-progress');
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
    localStorage.setItem('health-educator-2-behavior-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-green-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/health-educator-2" className="text-gray-600 hover:text-green-600">보건교육사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">건강행동이론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🧠</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">건강행동이론 학습</h1>
                <p className="text-green-100">보건교육사 2급 필기 3과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-green-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
