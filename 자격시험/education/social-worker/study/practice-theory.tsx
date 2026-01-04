'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'history-philosophy',
    name: '사회복지실천의 역사와 철학',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '사회복지실천의 역사적 발달과정(COS, Settlement House)을 비교 설명하시오.',
        answer: 'COS: 개별적 접근, 우애방문, Settlement: 집단·지역사회, 인보관 운동',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 사회복지실천의 역사적 발달과정(COS, Settlement House)을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 자선조직협회(COS): 개별적 접근, 우애방문, 과학적 자선
2. 인보관운동(Settlement House): 집단·지역사회, 환경개선
3. 각 운동의 철학과 방법론 차이
4. 현대 사회복지실천에 미친 영향
5. 메리 리치몬드와 제인 아담스
6. 한국 사회복지실천의 발달

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '사회복지실천의 가치와 윤리, 윤리적 딜레마 해결 방법을 설명하시오.',
        answer: '자기결정권, 비밀보장, 수용, 개별화 / 윤리강령, 슈퍼비전',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 사회복지실천의 가치와 윤리, 윤리적 딜레마 해결 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지실천의 핵심 가치
2. 기본 원칙: 자기결정권, 비밀보장, 수용, 개별화
3. 윤리적 딜레마의 유형
4. 윤리강령의 역할
5. 윤리적 의사결정 모델
6. 사례: 비밀보장 vs 위해 예방

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '통합적 방법론(Generalist Practice)의 개념과 특징을 설명하시오.',
        answer: '개인-가족-집단-지역사회 통합, 문제해결 과정, 생태체계 관점',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 통합적 방법론(Generalist Practice)의 개념과 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 통합적 방법론의 등장 배경
2. 미시-중범위-거시 실천의 통합
3. 생태체계 관점
4. 문제해결 과정(접수-사정-개입-종결-평가)
5. 전문적 관계의 중요성
6. 한국 사회복지실천 현장 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '사회복지사의 역할(중개자, 옹호자, 조력자, 교육자 등)을 설명하시오.',
        answer: '중개자(자원연결), 옹호자(권익옹호), 조력자(empowerment), 교육자',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 사회복지사의 역할(중개자, 옹호자, 조력자, 교육자 등)을 설명하시오.

다음 순서로 설명해주세요:
1. 중개자(Broker): 자원과 클라이언트 연결
2. 옹호자(Advocate): 권익 옹호, 정책 변화
3. 조력자(Enabler): 임파워먼트
4. 교육자(Educator): 정보 제공, 기술 습득
5. 조정자(Coordinator), 중재자(Mediator)
6. 상황에 따른 역할 선택

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '클라이언트 체계의 유형(개인, 가족, 집단, 지역사회)을 설명하시오.',
        answer: '개인(케이스워크), 가족(가족치료), 집단(그룹워크), 지역사회(조직화)',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 클라이언트 체계의 유형(개인, 가족, 집단, 지역사회)을 설명하시오.

다음 순서로 설명해주세요:
1. 개인 체계: 개별 케이스워크
2. 가족 체계: 가족치료, 가족 역동
3. 집단 체계: 그룹워크, 상호원조
4. 지역사회 체계: 지역사회조직, 사회행동
5. 각 체계의 특징과 개입 방법
6. 통합적 접근의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'relationship',
    name: '전문적 관계',
    color: 'from-rose-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '전문적 관계의 기본 요소(진정성, 공감, 무조건적 긍정적 존중)를 설명하시오.',
        answer: '진정성(일치성), 공감(감정이입), 무조건적 긍정적 존중(수용)',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 전문적 관계의 기본 요소(진정성, 공감, 무조건적 긍정적 존중)를 설명하시오.

다음 순서로 설명해주세요:
1. 진정성(Genuineness): 일치성, 솔직함
2. 공감(Empathy): 감정이입, 정확한 이해
3. 무조건적 긍정적 존중(Unconditional Positive Regard)
4. 로저스의 인간중심 상담 이론
5. 전문적 관계와 친밀한 관계의 차이
6. 사회복지실천 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '라포(Rapport) 형성의 중요성과 방법을 설명하시오.',
        answer: '신뢰관계, 경청, 공감, 비언어적 의사소통',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 라포(Rapport) 형성의 중요성과 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 라포의 정의: 신뢰와 친밀감
2. 라포 형성의 중요성
3. 경청(Active Listening) 기술
4. 공감적 반응
5. 비언어적 의사소통 (눈 맞춤, 자세)
6. 저항적 클라이언트와의 라포 형성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '전이(Transference)와 역전이(Countertransference)를 설명하시오.',
        answer: '전이: 클라이언트→사회복지사, 역전이: 사회복지사→클라이언트',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 전이(Transference)와 역전이(Countertransference)를 설명하시오.

다음 순서로 설명해주세요:
1. 전이(Transference): 과거 관계를 현재 관계로 투사
2. 긍정적 전이와 부정적 전이
3. 역전이(Countertransference): 사회복지사의 감정 반응
4. 역전이의 부정적 영향
5. 역전이 인식과 관리 방법
6. 슈퍼비전의 역할

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '저항(Resistance)의 유형과 다루는 방법을 설명하시오.',
        answer: '침묵, 지각, 주제 회피, 반항 / 수용, 탐색, 직면',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 저항(Resistance)의 유형과 다루는 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 저항의 정의와 발생 원인
2. 저항의 유형: 침묵, 지각, 주제 회피, 반항
3. 저항을 다루는 기본 태도
4. 저항 탐색과 해석
5. 직면(Confrontation) 기법
6. 비자발적 클라이언트 다루기

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '이중관계(Dual Relationship)의 문제점과 경계 설정의 중요성을 설명하시오.',
        answer: '전문적 관계 침해, 착취 위험, 명확한 경계, 윤리강령',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 이중관계(Dual Relationship)의 문제점과 경계 설정의 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 이중관계의 정의: 전문적 + 개인적 관계
2. 이중관계의 유형과 위험성
3. 착취 가능성과 권력 불균형
4. 명확한 경계(Boundaries) 설정
5. 윤리강령과 법적 규제
6. 소규모 지역사회에서의 경계 관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'intake-assessment',
    name: '접수와 사정',
    color: 'from-orange-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '접수(Intake) 단계의 목적과 과업을 설명하시오.',
        answer: '문제 파악, 적격성 판정, 라포 형성, 계약',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 접수(Intake) 단계의 목적과 과업을 설명하시오.

다음 순서로 설명해주세요:
1. 접수의 정의와 목적
2. 클라이언트 문제 파악
3. 기관 서비스 적격성 판정
4. 라포 형성
5. 초기 계약(contracting)
6. 의뢰(Referral) 절차

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '사정(Assessment)의 개념과 사정 도구를 설명하시오.',
        answer: '자료수집-분석-종합, 생태도, 가계도, DSM-5',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 사정(Assessment)의 개념과 사정 도구를 설명하시오.

다음 순서로 설명해주세요:
1. 사정의 정의: 자료수집-분석-종합
2. 생태도(Eco-map): 환경과의 관계
3. 가계도(Genogram): 가족 구조와 역사
4. DSM-5: 정신장애 진단
5. 강점 사정(Strengths Assessment)
6. PIE(Person-In-Environment) 체계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '생태체계 관점에서의 사정을 설명하시오.',
        answer: '개인-환경 상호작용, 미시-중범위-거시 체계',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 생태체계 관점에서의 사정을 설명하시오.

다음 순서로 설명해주세요:
1. 생태체계 관점의 특징
2. 개인과 환경의 상호작용
3. 미시체계, 중범위체계, 거시체계
4. 브론펜브레너의 생태학적 체계 이론
5. 적합성(Goodness of Fit)
6. 생태도 작성과 해석

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '강점 관점(Strengths Perspective)의 원칙과 사정 방법을 설명하시오.',
        answer: '병리→강점, 자원 발견, 임파워먼트, 회복탄력성',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 강점 관점(Strengths Perspective)의 원칙과 사정 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 강점 관점의 기본 가정
2. 병리 모델 vs 강점 모델
3. 클라이언트의 강점과 자원 발견
4. 회복탄력성(Resilience)
5. 임파워먼트(Empowerment)
6. 강점 사정 질문 기법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '문제 규정과 목표 설정의 원칙을 설명하시오.',
        answer: '구체적, 측정 가능, 달성 가능, 관련성, 시간제한(SMART)',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 문제 규정과 목표 설정의 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 문제의 우선순위 결정
2. 목표 설정의 SMART 원칙
3. Specific(구체적), Measurable(측정 가능)
4. Achievable(달성 가능), Relevant(관련성)
5. Time-bound(시간제한)
6. 클라이언트 참여의 중요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'intervention',
    name: '개입과 종결',
    color: 'from-blue-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '계획(Planning) 단계의 과업과 계약 내용을 설명하시오.',
        answer: '목표 설정, 개입 전략, 역할 분담, 서면 계약',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 계획(Planning) 단계의 과업과 계약 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 목표와 하위목표 설정
2. 개입 전략과 방법 선택
3. 역할과 책임 분담
4. 서면 계약(Written Contract)
5. 시간계획과 평가계획
6. 클라이언트 동의와 참여

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '직접적 개입과 간접적 개입의 차이를 설명하시오.',
        answer: '직접: 클라이언트 대상, 간접: 환경 변화',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 직접적 개입과 간접적 개입의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 직접적 개입: 클라이언트 대상 (상담, 치료)
2. 간접적 개입: 환경 변화 (옹호, 자원 연계)
3. 미시적 개입과 거시적 개입
4. 사례관리(Case Management)
5. 통합적 접근의 필요성
6. 개입 방법 선택 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '종결(Termination)의 유형과 종결 시 과업을 설명하시오.',
        answer: '계획된 종결, 조기 종결, 성과 평가, 의뢰, 사후관리',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 종결(Termination)의 유형과 종결 시 과업을 설명하시오.

다음 순서로 설명해주세요:
1. 종결의 유형: 계획된 종결, 조기 종결
2. 종결 신호 인식
3. 성과 평가와 목표 달성도 검토
4. 감정 처리 (상실감, 의존성)
5. 사후관리(Follow-up) 계획
6. 다른 기관으로 의뢰

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '평가(Evaluation)의 종류와 방법을 설명하시오.',
        answer: '과정 평가, 결과 평가, 단일사례설계, 목표달성척도(GAS)',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 평가(Evaluation)의 종류와 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 과정 평가(Process Evaluation)
2. 결과 평가(Outcome Evaluation)
3. 단일사례설계(Single-Subject Design)
4. 목표달성척도(Goal Attainment Scaling)
5. 표준화된 척도 활용
6. 클라이언트 만족도 조사

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '기록(Recording)의 목적과 종류를 설명하시오.',
        answer: '과정기록, 이야기체, 문제중심기록(SOAP), 비밀보장',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 기록(Recording)의 목적과 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 기록의 목적: 책임성, 지속성, 평가
2. 과정기록(Process Recording)
3. 이야기체 기록(Narrative Recording)
4. 문제중심기록(SOAP: Subjective, Objective, Assessment, Plan)
5. 전자기록의 장단점
6. 비밀보장과 기록 관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'perspectives-models',
    name: '실천 관점과 모델',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '심리사회적 모델의 특징과 주요 개입 기법을 설명하시오.',
        answer: '정신역동, 상황 속의 인간, 직접·간접치료, 지지-통찰',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 심리사회적 모델의 특징과 주요 개입 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 정신역동 이론 기반
2. 상황 속의 인간(Person-in-Situation)
3. 직접치료와 간접치료
4. 지지(Sustaining)와 통찰(Insight)
5. 반성적 논의(Reflective Discussion)
6. 사회복지실천 적용 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '인지행동 모델의 이론적 배경과 개입 기법을 설명하시오.',
        answer: '엘리스 REBT, 벡 인지치료, 인지재구조화, 행동수정',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 인지행동 모델의 이론적 배경과 개입 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 인지행동 모델의 기본 가정
2. 엘리스의 합리정서행동치료(REBT)
3. 벡의 인지치료
4. 인지재구조화(Cognitive Restructuring)
5. 행동수정 기법 (체계적 둔감화, 토큰 경제)
6. 우울·불안장애 개입 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '과제중심 모델의 특징과 실천 과정을 설명하시오.',
        answer: '단기개입, 과제 설정-수행-검토, 구조화, 문제해결',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 과제중심 모델의 특징과 실천 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 과제중심 모델의 특징: 단기, 구조화
2. 목표 문제(Target Problem) 선정
3. 과제 설정과 계약
4. 과제 수행과 검토
5. 장애물 해결
6. 한시적 개입 (6-12회기)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '위기개입 모델의 원리와 개입 절차를 설명하시오.',
        answer: '위기 = 위험+기회, 즉각 개입, 안정화, 대처능력 강화',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 위기개입 모델의 원리와 개입 절차를 설명하시오.

다음 순서로 설명해주세요:
1. 위기의 정의: 균형 상실, 대처 실패
2. 위기의 유형: 발달적, 상황적
3. 위기개입의 원칙: 신속, 제한적 목표
4. 개입 단계: 안정화 → 사정 → 문제해결
5. 대처능력(Coping) 강화
6. 자살 위기 개입 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '역량강화(Empowerment) 모델의 철학과 실천 원칙을 설명하시오.',
        answer: '권력 이양, 강점 관점, 의식화, 집단 연대',
        prompt: `사회복지사 1급 사회복지실천론 문제입니다.

문제: 역량강화(Empowerment) 모델의 철학과 실천 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 역량강화의 정의: 권력과 자원에 대한 접근
2. 억압과 차별에 대한 인식
3. 강점 관점과 자원 동원
4. 의식화(Consciousness Raising)
5. 집단 연대와 사회행동
6. 소외계층 대상 실천

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function PracticeTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-worker-practice-theory-progress');
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
    localStorage.setItem('social-worker-practice-theory-progress', JSON.stringify(newCompleted));
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
            <span className="text-pink-600 font-medium">사회복지실천론</span>
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
                <h1 className="text-2xl font-bold">사회복지실천론 학습</h1>
                <p className="text-pink-100">사회복지사 1급 - 사회복지실천 영역</p>
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
