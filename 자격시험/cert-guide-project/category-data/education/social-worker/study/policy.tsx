'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'policy-theory',
    name: '사회복지정책의 이론',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '사회복지정책의 개념과 사회복지제도의 관계를 설명하시오.',
        answer: '정책→제도→프로그램→서비스',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 사회복지정책의 개념과 사회복지제도의 관계를 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지정책의 정의
2. 정책, 제도, 프로그램, 서비스의 관계
3. 사회정책과 사회복지정책
4. 정책의 목표: 평등, 형평, 적절성
5. 사회복지정책의 특성
6. 한국 사회복지정책의 현황

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '복지국가의 발달 이론(산업화론, 시민권론, 권력자원론)을 비교 설명하시오.',
        answer: '산업화론, 마샬 시민권론, 에스핑-앤더슨 권력자원론',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 복지국가의 발달 이론(산업화론, 시민권론, 권력자원론)을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 산업화론(Industrialization Theory): 경제발전→복지
2. 마샬(Marshall)의 시민권론: 시민권 확대
3. 권력자원론(Power Resource Theory): 노동계급 조직화
4. 각 이론의 장단점
5. 복지국가 발달의 다차원적 요인
6. 한국 복지국가 발달 경로

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '에스핑-앤더슨의 복지국가 유형(자유주의, 보수주의, 사회민주주의)을 설명하시오.',
        answer: '자유주의(잔여적), 보수주의(조합주의), 사회민주주의(보편적)',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 에스핑-앤더슨의 복지국가 유형(자유주의, 보수주의, 사회민주주의)을 설명하시오.

다음 순서로 설명해주세요:
1. 탈상품화(Decommodification) 개념
2. 자유주의 복지국가: 잔여적, 시장 중심 (미국, 영국)
3. 보수주의 복지국가: 조합주의, 직역별 (독일, 프랑스)
4. 사회민주주의 복지국가: 보편주의 (스웨덴, 노르웨이)
5. 계층화(Stratification) 효과
6. 한국 복지국가의 유형 분류

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '사회복지정책의 가치(평등, 효율, 자유)와 갈등을 설명하시오.',
        answer: '평등 vs 효율, 평등 vs 자유, 형평성',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 사회복지정책의 가치(평등, 효율, 자유)와 갈등을 설명하시오.

다음 순서로 설명해주세요:
1. 평등(Equality): 결과의 평등, 기회의 평등
2. 효율(Efficiency): 자원의 효율적 배분
3. 자유(Freedom): 개인의 선택권
4. 평등 vs 효율의 갈등
5. 평등 vs 자유의 갈등
6. 형평성(Equity)과 사회정의

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '잔여적 복지와 제도적 복지의 차이를 설명하시오.',
        answer: '잔여적: 선별적, 사후적 / 제도적: 보편적, 예방적',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 잔여적 복지와 제도적 복지의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 잔여적 복지(Residual): 선별적, 최후의 안전망
2. 제도적 복지(Institutional): 보편적, 예방적
3. 윌렌스키와 르보(Wilensky & Lebeaux)
4. 각 모델의 장단점
5. 낙인(Stigma) 문제
6. 한국 복지제도의 특징

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'policy-process',
    name: '사회복지정책 과정',
    color: 'from-rose-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '정책의제 설정(Agenda Setting) 과정을 설명하시오.',
        answer: '사회문제→공중의제→정부의제',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 정책의제 설정(Agenda Setting) 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 사회문제의 발견과 인식
2. 공중의제(Public Agenda)
3. 정부의제(Governmental Agenda)
4. 의제설정의 주도자: 정부, 시민단체, 언론
5. 킹던(Kingdon)의 정책창(Policy Window)
6. 한국의 사회복지정책 의제설정 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '정책결정 모형(합리모형, 점증모형, 혼합모형)을 설명하시오.',
        answer: '합리모형(이상적), 점증모형(현실적), 혼합모형',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 정책결정 모형(합리모형, 점증모형, 혼합모형)을 설명하시오.

다음 순서로 설명해주세요:
1. 합리모형(Rational Model): 목표-수단 분석
2. 합리모형의 한계
3. 점증모형(Incremental Model): 린드블롬, 단계적 변화
4. 혼합주사모형(Mixed Scanning): 에치오니
5. 정치적 결정과 타협
6. 한국 복지정책 결정 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '정책집행(Implementation)의 영향 요인을 설명하시오.',
        answer: '전달체계, 예산, 관료재량, 표적집단',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 정책집행(Implementation)의 영향 요인을 설명하시오.

다음 순서로 설명해주세요:
1. 정책집행의 정의와 중요성
2. 전달체계(Delivery System)
3. 예산과 재원
4. 일선 관료의 재량(Street-Level Bureaucracy)
5. 표적집단(Target Group)의 순응
6. 정책집행의 장애요인

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '정책평가의 종류(과정평가, 결과평가, 영향평가)를 설명하시오.',
        answer: '과정평가, 결과평가, 영향평가, 비용편익분석',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 정책평가의 종류(과정평가, 결과평가, 영향평가)를 설명하시오.

다음 순서로 설명해주세요:
1. 정책평가의 목적과 기준
2. 과정평가(Process Evaluation)
3. 결과평가(Outcome Evaluation)
4. 영향평가(Impact Evaluation)
5. 비용편익분석(Cost-Benefit Analysis)
6. 환류(Feedback)와 정책수정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '정책 이해관계자와 옹호연합(Advocacy Coalition)을 설명하시오.',
        answer: '정부, 시민사회, 이익집단, 옹호연합',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 정책 이해관계자와 옹호연합(Advocacy Coalition)을 설명하시오.

다음 순서로 설명해주세요:
1. 정책 이해관계자(Stakeholders): 정부, 시민단체, 이익집단
2. 옹호연합(Advocacy Coalition) 모형
3. 신념체계(Belief System)의 역할
4. 정책학습(Policy Learning)
5. 정책변동의 요인
6. 한국 복지정책 옹호연합 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'policy-analysis',
    name: '사회복지정책 분석',
    color: 'from-orange-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '길버트와 테렐의 분석틀(4차원)을 설명하시오.',
        answer: '할당(대상), 급여(형태), 전달체계, 재원',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 길버트와 테렐의 분석틀(4차원)을 설명하시오.

다음 순서로 설명해주세요:
1. 할당(Allocation): 누가 받는가? (대상자 선정)
2. 급여(Benefit): 무엇을 받는가? (현금, 현물, 서비스)
3. 전달체계(Delivery System): 어떻게 전달되는가?
4. 재원(Finance): 비용을 누가 부담하는가?
5. 4차원 간의 상호관계
6. 정책 분석 적용 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '급여 대상자 선정 기준(보편주의, 선별주의)을 비교 설명하시오.',
        answer: '보편주의: 모든 국민, 선별주의: 자산조사',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 급여 대상자 선정 기준(보편주의, 선별주의)을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 보편주의(Universalism): 시민권, 모든 국민
2. 선별주의(Selectivism): 욕구, 자산조사
3. 각 원칙의 장단점
4. 낙인(Stigma)과 권리(Right)
5. 재분배 효과
6. 한국 복지제도의 선정 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '급여 형태(현금, 현물, 바우처, 서비스)의 장단점을 설명하시오.',
        answer: '현금: 선택권, 현물: 목적 명확, 바우처: 절충',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 급여 형태(현금, 현물, 바우처, 서비스)의 장단점을 설명하시오.

다음 순서로 설명해주세요:
1. 현금급여(Cash): 선택권, 오용 가능성
2. 현물급여(In-kind): 목적 명확, 선택권 제한
3. 바우처(Voucher): 절충안, 이용권
4. 사회서비스: 인적 서비스
5. 각 급여의 적절한 활용
6. 한국의 급여 형태 현황

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '사회복지 재원 조달 방식(조세, 사회보험료, 본인부담)을 설명하시오.',
        answer: '조세: 일반재정, 사회보험료: 기여, 본인부담',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 사회복지 재원 조달 방식(조세, 사회보험료, 본인부담)을 설명하시오.

다음 순서로 설명해주세요:
1. 조세(Tax): 일반재정, 누진성
2. 사회보험료(Social Insurance Premium): 기여 원칙
3. 본인부담(User Charge)
4. 민간재원(기부, 후원)
5. 각 재원의 장단점
6. 한국 사회복지 재정 구조

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '전달체계의 원칙(전문성, 접근성, 통합성, 책임성)을 설명하시오.',
        answer: '전문성, 접근성, 통합성, 책임성, 지속성',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 전달체계의 원칙(전문성, 접근성, 통합성, 책임성)을 설명하시오.

다음 순서로 설명해주세요:
1. 전문성(Professionalism): 질 높은 서비스
2. 접근성(Accessibility): 이용 용이성
3. 통합성(Integration): 조정과 연계
4. 책임성(Accountability): 투명성
5. 지속성(Continuity): 연속적 지원
6. 한국 전달체계의 문제점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'income-security',
    name: '소득보장정책',
    color: 'from-blue-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '국민연금제도의 특징과 구조를 설명하시오.',
        answer: '사회보험, 강제가입, 소득비례, 세대 간 재분배',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 국민연금제도의 특징과 구조를 설명하시오.

다음 순서로 설명해주세요:
1. 국민연금의 목적: 노령, 장애, 사망
2. 강제가입 사회보험
3. 소득비례 방식
4. 기여와 급여 (보험료율, 소득대체율)
5. 세대 간 재분배
6. 재정안정화 과제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '기초연금제도와 국민연금의 차이를 설명하시오.',
        answer: '기초연금: 조세, 노인 빈곤 완화 / 국민연금: 사회보험',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 기초연금제도와 국민연금의 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 기초연금의 목적: 노인 빈곤 완화
2. 조세 방식, 소득하위 70%
3. 정액급여 (기초연금액)
4. 국민연금과의 차이 (재원, 급여)
5. 기초연금과 국민연금의 연계 감액
6. 노후소득보장체계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '국민기초생활보장제도의 원리와 급여 체계를 설명하시오.',
        answer: '최저생활보장, 맞춤형 급여, 생계·의료·주거·교육',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 국민기초생활보장제도의 원리와 급여 체계를 설명하시오.

다음 순서로 설명해주세요:
1. 최저생활보장 원리
2. 수급권자 선정 기준 (소득인정액)
3. 맞춤형 급여체계 개편 (2015)
4. 생계급여, 의료급여, 주거급여, 교육급여
5. 부양의무자 기준 완화
6. 자활사업과 근로유인

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '고용보험제도의 기능과 급여를 설명하시오.',
        answer: '실업급여, 고용안정, 직업능력개발, 출산육아',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 고용보험제도의 기능과 급여를 설명하시오.

다음 순서로 설명해주세요:
1. 고용보험의 목적: 실업 대비, 고용안정
2. 실업급여: 구직급여, 취업촉진수당
3. 고용안정사업
4. 직업능력개발사업
5. 출산육아기 고용안정지원
6. 고용보험 사각지대 해소

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '긴급복지지원제도와 한시적 지원을 설명하시오.',
        answer: '위기 상황, 긴급지원, 일시적 지원, 연계',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 긴급복지지원제도와 한시적 지원을 설명하시오.

다음 순서로 설명해주세요:
1. 긴급복지지원제도의 목적
2. 위기 상황의 정의 (주소득자 사망, 중한 질병 등)
3. 긴급지원 내용 (생계, 의료, 주거)
4. 한시적 지원 (최대 6개월)
5. 신속한 지원 절차
6. 타 제도로의 연계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'health-service',
    name: '건강 및 사회서비스 정책',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '국민건강보험제도의 원리와 구조를 설명하시오.',
        answer: '사회보험, 강제가입, 보험료, 요양급여',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 국민건강보험제도의 원리와 구조를 설명하시오.

다음 순서로 설명해주세요:
1. 건강보험의 목적: 질병 위험 분산
2. 강제가입 사회보험
3. 보험료: 소득, 재산 기반
4. 요양급여: 진료, 약제
5. 본인부담금
6. 건강보험 재정 안정화

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '노인장기요양보험제도의 특징과 급여를 설명하시오.',
        answer: '장기요양등급, 재가급여, 시설급여, 본인부담',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 노인장기요양보험제도의 특징과 급여를 설명하시오.

다음 순서로 설명해주세요:
1. 장기요양보험의 목적: 노인 돌봄
2. 장기요양등급 판정 (1~5등급, 인지지원등급)
3. 재가급여: 방문요양, 주야간보호
4. 시설급여: 요양시설 입소
5. 본인부담금 (15~20%)
6. 사회서비스 일자리 창출

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '사회서비스 전자바우처 사업을 설명하시오.',
        answer: '이용권, 소비자 선택권, 노인·장애인·아동 돌봄',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 사회서비스 전자바우처 사업을 설명하시오.

다음 순서로 설명해주세요:
1. 바우처의 정의와 장점
2. 소비자 선택권 보장
3. 노인 돌봄 서비스
4. 장애인 활동지원 서비스
5. 아동 돌봄 서비스 (아이돌봄)
6. 제공기관 관리와 품질 평가

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '지역사회 통합돌봄(커뮤니티케어)의 개념과 전략을 설명하시오.',
        answer: '재가서비스, 탈시설, 주거지원, 통합적 지원',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 지역사회 통합돌봄(커뮤니티케어)의 개념과 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 커뮤니티케어의 정의: 지역사회 거주
2. 재가서비스 확충
3. 탈시설화(Deinstitutionalization)
4. 주거지원 (케어안심주택)
5. 통합적 서비스 제공
6. 선도사업 추진 현황

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '산업재해보상보험제도의 특징을 설명하시오.',
        answer: '업무상 재해, 무과실책임, 요양급여, 장해급여',
        prompt: `사회복지사 1급 사회복지정책론 문제입니다.

문제: 산업재해보상보험제도의 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 산재보험의 목적: 업무상 재해 보상
2. 무과실책임 원칙
3. 요양급여: 치료비 전액
4. 장해급여: 장해등급별
5. 휴업급여, 유족급여
6. 산재 예방 사업

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function PolicyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-worker-policy-progress');
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
    localStorage.setItem('social-worker-policy-progress', JSON.stringify(newCompleted));
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
            <span className="text-pink-600 font-medium">사회복지정책론</span>
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
                <h1 className="text-2xl font-bold">사회복지정책론 학습</h1>
                <p className="text-pink-100">사회복지사 1급 - 사회복지정책과 제도 영역</p>
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
