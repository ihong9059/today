'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'concepts-models',
    name: '지역사회 개념과 모델',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '지역사회(Community)의 개념과 구성요소를 설명하시오.',
        answer: '지리적 공동체, 기능적 공동체, 공동 유대감',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회(Community)의 개념과 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회의 정의
2. 지리적 공동체(Geographic Community)
3. 기능적 공동체(Functional Community)
4. 구성요소: 지역성, 공동 유대감, 상호작용
5. 워런(Warren)의 지역사회 기능
6. 현대 사회의 지역사회 변화

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '로스만(Rothman)의 지역사회조직 3모델을 비교 설명하시오.',
        answer: '지역사회개발, 사회계획, 사회행동',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 로스만(Rothman)의 지역사회조직 3모델을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회개발(Locality Development): 자조, 합의
2. 사회계획(Social Planning): 문제해결, 전문가
3. 사회행동(Social Action): 권력 재분배, 갈등
4. 각 모델의 목표와 전략
5. 실천가의 역할 차이
6. 통합 모델의 필요성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '지역사회복지의 이념(자조, 협동, 참여, 권리)을 설명하시오.',
        answer: '자조(Self-help), 협동, 주민참여, 권리 옹호',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회복지의 이념(자조, 협동, 참여, 권리)을 설명하시오.

다음 순서로 설명해주세요:
1. 자조(Self-help)와 자립
2. 협동과 연대
3. 주민참여(Citizen Participation)
4. 권리 옹호(Advocacy)
5. 사회통합과 포용
6. 한국 지역사회복지의 이념적 지향

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '지역사회 사정(Community Assessment)의 방법을 설명하시오.',
        answer: '욕구조사, 자원조사, 강점 사정, SWOT 분석',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회 사정(Community Assessment)의 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회 사정의 목적
2. 욕구조사(Needs Assessment)
3. 자원조사(Resource Assessment)
4. 강점 사정(Strengths Assessment)
5. SWOT 분석
6. 지역사회 지도(Community Mapping)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '지역사회복지 실천의 원칙을 설명하시오.',
        answer: '주민참여, 자기결정, 통합성, 지속가능성',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회복지 실천의 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 주민참여와 임파워먼트
2. 자기결정과 자율성
3. 통합성(포괄성)
4. 지속가능성
5. 협력과 파트너십
6. 사회정의와 평등

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'practice-methods',
    name: '지역사회복지 실천 방법',
    color: 'from-rose-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '지역사회조직(Community Organization)의 과정을 설명하시오.',
        answer: '준비→초기조직화→자원동원→실행→평가',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회조직(Community Organization)의 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 준비 단계: 문제 확인, 사정
2. 초기 조직화: 주민 모집, 조직 구성
3. 자원 동원: 인적·물적 자원
4. 실행: 전략 수립, 활동 전개
5. 평가와 환류
6. 지속가능성 확보

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '주민조직화(Community Organizing) 전략을 설명하시오.',
        answer: '의식화, 리더 발굴, 소집단 조직, 연대',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 주민조직화(Community Organizing) 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 의식화(Consciousness Raising)
2. 리더 발굴과 양성
3. 소집단 조직화
4. 연대와 네트워크 구축
5. 집합행동(Collective Action)
6. 알린스키(Alinsky)의 조직화 원칙

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '지역사회 네트워크(Network)의 개념과 유형을 설명하시오.',
        answer: '정보 공유, 조정, 협력, 통합, 공식·비공식',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회 네트워크(Network)의 개념과 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 네트워크의 정의와 중요성
2. 정보 공유형 네트워크
3. 조정형 네트워크
4. 협력형 네트워크
5. 통합형 네트워크
6. 공식·비공식 네트워크

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '지역사회 옹호(Community Advocacy)의 전략을 설명하시오.',
        answer: '개별 옹호, 집단 옹호, 정책 옹호, 법적 대응',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회 옹호(Community Advocacy)의 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 옹호의 정의와 목적
2. 개별 옹호(Case Advocacy)
3. 집단 옹호(Cause Advocacy)
4. 정책 옹호(Policy Advocacy)
5. 법적 대응과 소송
6. 미디어 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '지역사회 교육(Community Education)의 방법을 설명하시오.',
        answer: '주민교육, 리더교육, 인식개선, 역량강화',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회 교육(Community Education)의 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 주민 교육과 학습
2. 리더 교육과 훈련
3. 인식 개선 캠페인
4. 역량강화(Capacity Building)
5. 프레이리(Freire)의 의식화 교육
6. 평생학습 지역사회

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'welfare-planning',
    name: '지역사회복지계획',
    color: 'from-orange-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '지역사회복지계획의 개념과 법적 근거를 설명하시오.',
        answer: '사회복지사업법 제15조의2, 4년마다 수립',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회복지계획의 개념과 법적 근거를 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회복지계획의 정의
2. 법적 근거: 사회복지사업법 제15조의2
3. 시·군·구 계획 수립 의무
4. 4년마다 수립, 매년 시행계획
5. 지역사회보장협의체와의 관계
6. 주민참여와 공청회

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '지역사회복지계획 수립 과정을 설명하시오.',
        answer: '욕구조사→목표설정→전략수립→실행계획→평가',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회복지계획 수립 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 지역 진단과 욕구조사
2. 비전과 목표 설정
3. 추진전략 수립
4. 세부 실행계획
5. 재원 확보 방안
6. 평가 지표 설정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '지역사회보장협의체의 구성과 기능을 설명하시오.',
        answer: '대표협의체-실무협의체-실무분과, 심의·자문',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회보장협의체의 구성과 기능을 설명하시오.

다음 순서로 설명해주세요:
1. 지역사회보장협의체의 법적 근거
2. 대표협의체: 심의·자문
3. 실무협의체: 실무 조정
4. 실무분과: 분야별 협력
5. 민·관 협력 거버넌스
6. 통합사례관리와의 연계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '지역사회복지계획의 평가 방법을 설명하시오.',
        answer: '과정평가, 결과평가, 성과지표, 환류',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회복지계획의 평가 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 평가의 목적과 중요성
2. 과정 평가(Process Evaluation)
3. 결과 평가(Outcome Evaluation)
4. 성과지표(Performance Indicator) 설정
5. 주민 만족도 조사
6. 환류(Feedback)와 계획 수정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '통합사례관리와 지역사회보장협의체의 연계를 설명하시오.',
        answer: '사례발굴, 자원연계, 사례회의, 협력',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 통합사례관리와 지역사회보장협의체의 연계를 설명하시오.

다음 순서로 설명해주세요:
1. 통합사례관리의 개념
2. 사례발굴과 의뢰 체계
3. 지역 자원 연계와 조정
4. 사례회의와 협력
5. 복합적 욕구 대응
6. 지역사회보장협의체의 지원 기능

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'service-delivery',
    name: '지역사회복지 전달체계',
    color: 'from-blue-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '공공 전달체계(읍면동, 시군구, 시도)의 구조를 설명하시오.',
        answer: '읍면동 복지허브, 시군구 희망복지지원단, 시도 조정',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 공공 전달체계(읍면동, 시군구, 시도)의 구조를 설명하시오.

다음 순서로 설명해주세요:
1. 읍면동: 복지허브화, 찾아가는 보장
2. 시군구: 희망복지지원단, 통합사례관리
3. 시도: 조정 및 지원
4. 사회복지담당 공무원 역할
5. 민관 협력 체계
6. 전달체계 개편 방향

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '민간 전달체계(사회복지관, 자원봉사센터 등)를 설명하시오.',
        answer: '사회복지관, 자원봉사센터, NPO, 협동조합',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 민간 전달체계(사회복지관, 자원봉사센터 등)를 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지관: 종합 서비스 제공
2. 자원봉사센터: 자원 연계
3. 비영리조직(NPO)의 역할
4. 사회적경제 조직(협동조합, 사회적기업)
5. 민관 협력과 역할 분담
6. 민간 전달체계의 한계와 과제

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '사회복지관의 기능과 사업을 설명하시오.',
        answer: '사례관리, 서비스제공, 지역조직화, 자원개발·관리',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 사회복지관의 기능과 사업을 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지관의 정의와 법적 근거
2. 사례관리 기능
3. 서비스 제공 기능 (가족, 지역사회보호)
4. 지역조직화 기능
5. 자원 개발과 관리
6. 사회복지관 평가

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '지역사회복지 전달체계의 원칙을 설명하시오.',
        answer: '접근성, 포괄성, 지속성, 책임성, 통합성',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회복지 전달체계의 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 접근성(Accessibility): 이용 용이성
2. 포괄성(Comprehensiveness): 다양한 서비스
3. 지속성(Continuity): 연속적 지원
4. 책임성(Accountability): 투명성
5. 통합성(Integration): 조정·연계
6. 한국 전달체계의 문제점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '찾아가는 보장제도와 복지사각지대 발굴을 설명하시오.',
        answer: '능동적 발굴, 빅데이터 활용, 읍면동 방문',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 찾아가는 보장제도와 복지사각지대 발굴을 설명하시오.

다음 순서로 설명해주세요:
1. 찾아가는 보장제도의 개념
2. 능동적(Proactive) 발굴
3. 빅데이터와 정보 연계 활용
4. 읍면동 복지 담당 방문
5. 민관 협력 발굴체계
6. 복지사각지대 해소 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'participation-governance',
    name: '주민참여와 거버넌스',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '주민참여의 단계(아른스타인)를 설명하시오.',
        answer: '8단계 사다리: 비참여-형식적 참여-실질적 참여',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 주민참여의 단계(아른스타인)를 설명하시오.

다음 순서로 설명해주세요:
1. 아른스타인(Arnstein)의 참여 사다리
2. 비참여: 조작, 치료
3. 형식적 참여: 정보제공, 상담, 회유
4. 실질적 참여: 파트너십, 권한위임, 주민통제
5. 한국의 주민참여 수준
6. 참여 활성화 방안

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '거버넌스(Governance)의 개념과 유형을 설명하시오.',
        answer: '협력적 의사결정, 민관 협력, 네트워크',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 거버넌스(Governance)의 개념과 유형을 설명하시오.

다음 순서로 설명해주세요:
1. 거버넌스의 정의: 협력적 통치
2. 정부 중심(Government) → 거버넌스
3. 민관 협력 거버넌스
4. 네트워크 거버넌스
5. 참여 거버넌스
6. 지역사회보장협의체와 거버넌스

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '주민자치와 풀뿌리 민주주의를 설명하시오.',
        answer: '자치회, 마을만들기, 주민총회, 참여예산',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 주민자치와 풀뿌리 민주주의를 설명하시오.

다음 순서로 설명해주세요:
1. 주민자치의 개념과 원리
2. 주민자치회 구성과 운영
3. 마을만들기(Community Building)
4. 주민총회와 숙의민주주의
5. 참여예산제도
6. 풀뿌리 민주주의 활성화

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '사회적 자본(Social Capital)의 개념과 형성 방법을 설명하시오.',
        answer: '신뢰, 규범, 네트워크, 호혜성',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 사회적 자본(Social Capital)의 개념과 형성 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 사회적 자본의 정의
2. 핵심 요소: 신뢰, 규범, 네트워크
3. 호혜성(Reciprocity)
4. 결속형(Bonding) vs 가교형(Bridging)
5. 사회적 자본 형성 방법
6. 지역사회복지와의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '지역사회 임파워먼트(Empowerment)의 전략을 설명하시오.',
        answer: '의식화, 역량강화, 자원 접근, 집합행동',
        prompt: `사회복지사 1급 지역사회복지론 문제입니다.

문제: 지역사회 임파워먼트(Empowerment)의 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 임파워먼트의 정의와 수준
2. 개인적 임파워먼트
3. 조직적 임파워먼트
4. 지역사회 임파워먼트
5. 의식화와 역량강화
6. 자원과 권력에 대한 접근

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function CommunityWelfareStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-worker-community-welfare-progress');
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
    localStorage.setItem('social-worker-community-welfare-progress', JSON.stringify(newCompleted));
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
            <span className="text-pink-600 font-medium">지역사회복지론</span>
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
                <h1 className="text-2xl font-bold">지역사회복지론 학습</h1>
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
