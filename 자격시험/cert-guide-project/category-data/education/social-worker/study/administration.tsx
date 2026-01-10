'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'admin-theory',
    name: '사회복지행정의 이론',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '사회복지행정의 개념과 특징을 설명하시오.',
        answer: '사회복지+행정, 서비스 효과성·효율성, 가치지향',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 사회복지행정의 개념과 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지행정의 정의
2. 사회복지와 행정의 통합
3. 서비스 전달의 효과성과 효율성
4. 가치지향성: 사회정의, 평등
5. 일반 행정과의 차이
6. 사회복지행정의 범위

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '고전적 조직이론(과학적 관리론, 관료제)을 설명하시오.',
        answer: '테일러 과학적 관리, 베버 관료제, 효율성',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 고전적 조직이론(과학적 관리론, 관료제)을 설명하시오.

다음 순서로 설명해주세요:
1. 테일러(Taylor)의 과학적 관리론
2. 시간·동작 연구, 표준화
3. 베버(Weber)의 관료제
4. 합리성, 계층제, 규칙, 문서주의
5. 고전이론의 한계: 인간 경시
6. 사회복지조직에의 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '인간관계론과 호손 실험을 설명하시오.',
        answer: '메이요, 호손 실험, 비공식 집단, 사회적 욕구',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 인간관계론과 호손 실험을 설명하시오.

다음 순서로 설명해주세요:
1. 메이요(Mayo)의 인간관계론
2. 호손(Hawthorne) 실험
3. 비공식 집단의 영향
4. 사회적 욕구와 동기
5. 인간관계론의 공헌과 한계
6. 사회복지조직 관리에의 시사점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '체계이론과 환경의 중요성을 설명하시오.',
        answer: '투입-전환-산출, 개방체계, 환경 적응',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 체계이론과 환경의 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 체계이론의 기본 개념
2. 투입(Input)-전환(Throughput)-산출(Output)
3. 개방체계와 환경
4. 환경 적응과 생존
5. 피드백(Feedback)
6. 사회복지조직과 환경의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '상황이론(Contingency Theory)을 설명하시오.',
        answer: '최선의 방법 없음, 상황 적합, 유연성',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 상황이론(Contingency Theory)을 설명하시오.

다음 순서로 설명해주세요:
1. 상황이론의 기본 가정
2. 유일 최선의 방법은 없음
3. 상황에 따른 적합한 관리
4. 조직 구조와 환경의 적합성
5. 리더십 상황이론
6. 사회복지조직 관리의 유연성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'leadership-hr',
    name: '리더십과 인적자원관리',
    color: 'from-rose-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '리더십 이론(특성론, 행동론, 상황론)을 비교 설명하시오.',
        answer: '특성론: 타고남, 행동론: 학습, 상황론: 적합성',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 리더십 이론(특성론, 행동론, 상황론)을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 특성론(Trait Theory): 타고난 리더
2. 행동론(Behavioral Theory): 학습 가능
3. 과업 지향 vs 관계 지향
4. 상황론(Situational Theory): 상황 적합
5. 피들러(Fiedler)의 상황적합이론
6. 변혁적 리더십(Transformational Leadership)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '인적자원관리의 과정(모집-선발-배치-교육-평가)을 설명하시오.',
        answer: '모집→선발→배치→교육훈련→성과평가→보상',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 인적자원관리의 과정(모집-선발-배치-교육-평가)을 설명하시오.

다음 순서로 설명해주세요:
1. 모집(Recruitment): 지원자 유치
2. 선발(Selection): 면접, 시험
3. 배치(Placement): 적재적소
4. 교육훈련(Training & Development)
5. 성과평가(Performance Appraisal)
6. 보상(Compensation)과 동기부여

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '동기부여 이론(욕구위계론, 2요인론, 공정성이론)을 설명하시오.',
        answer: '매슬로우, 허즈버그, 아담스',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 동기부여 이론(욕구위계론, 2요인론, 공정성이론)을 설명하시오.

다음 순서로 설명해주세요:
1. 매슬로우(Maslow)의 욕구위계론
2. 허즈버그(Herzberg)의 2요인론: 위생요인, 동기요인
3. 아담스(Adams)의 공정성이론
4. 기대이론(Expectancy Theory)
5. 내재적 동기 vs 외재적 동기
6. 사회복지사 동기부여 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '슈퍼비전의 기능과 방법을 설명하시오.',
        answer: '행정적, 교육적, 지지적 기능, 개별·집단',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 슈퍼비전의 기능과 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 슈퍼비전의 정의와 목적
2. 행정적(Administrative) 기능
3. 교육적(Educational) 기능
4. 지지적(Supportive) 기능
5. 슈퍼비전 방법: 개별, 집단
6. 효과적인 슈퍼비전 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '소진(Burnout)의 개념과 예방 방법을 설명하시오.',
        answer: '정서적 소진, 비인간화, 성취감 저하, 슈퍼비전',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 소진(Burnout)의 개념과 예방 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 소진의 정의와 증상
2. 정서적 소진(Emotional Exhaustion)
3. 비인간화(Depersonalization)
4. 개인적 성취감 저하
5. 소진의 원인: 과중한 업무, 지지 부족
6. 소진 예방: 슈퍼비전, 자기돌봄

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'planning-budgeting',
    name: '기획과 재정관리',
    color: 'from-orange-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '전략적 기획(SWOT 분석)의 과정을 설명하시오.',
        answer: 'SWOT 분석, 비전, 목표, 전략',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 전략적 기획(SWOT 분석)의 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 전략적 기획의 정의와 목적
2. SWOT 분석: 강점, 약점, 기회, 위협
3. 비전(Vision)과 미션(Mission) 수립
4. 전략적 목표 설정
5. 실행 계획 수립
6. 평가와 환류

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '논리모델(Logic Model)의 구성요소를 설명하시오.',
        answer: '투입-활동-산출-결과(단기, 장기)',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 논리모델(Logic Model)의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 논리모델의 정의와 목적
2. 투입(Inputs): 자원
3. 활동(Activities): 프로그램 활동
4. 산출(Outputs): 서비스 양
5. 결과(Outcomes): 단기, 중기, 장기
6. 프로그램 기획에의 활용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '예산의 종류(품목별, 성과주의, 영기준)를 비교 설명하시오.',
        answer: '품목별: 통제, 성과주의: 목표, 영기준: 제로베이스',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 예산의 종류(품목별, 성과주의, 영기준)를 비교 설명하시오.

다음 순서로 설명해주세요:
1. 품목별 예산(Line-Item Budget): 통제 용이
2. 성과주의 예산(Performance Budget): 목표와 연계
3. 영기준 예산(Zero-Based Budget): 제로베이스 검토
4. 프로그램 예산(Program Budget)
5. 각 예산의 장단점
6. 사회복지조직 예산 편성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '재원 개발(모금, 후원, 기부)의 전략을 설명하시오.',
        answer: '개인 후원, 기업 후원, 정부 보조금, 관계 구축',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 재원 개발(모금, 후원, 기부)의 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 재원 개발의 필요성
2. 개인 후원자 모집과 관리
3. 기업 후원과 사회공헌
4. 정부 보조금과 민간 재단
5. 장기적 관계 구축
6. 모금 윤리와 투명성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '회계와 재무제표(대차대조표, 손익계산서)를 설명하시오.',
        answer: '대차대조표: 재무상태, 손익계산서: 운영결과',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 회계와 재무제표(대차대조표, 손익계산서)를 설명하시오.

다음 순서로 설명해주세요:
1. 회계의 정의와 목적
2. 대차대조표(Balance Sheet): 자산, 부채, 자본
3. 손익계산서(Income Statement): 수익, 비용
4. 현금흐름표(Cash Flow Statement)
5. 재무비율 분석
6. 비영리조직 회계 특성

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'program-evaluation',
    name: '프로그램 개발과 평가',
    color: 'from-blue-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '프로그램 개발 과정(욕구조사-기획-실행-평가)을 설명하시오.',
        answer: '욕구조사→기획→실행→평가→환류',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 프로그램 개발 과정(욕구조사-기획-실행-평가)을 설명하시오.

다음 순서로 설명해주세요:
1. 욕구조사(Needs Assessment)
2. 프로그램 기획(Planning)
3. 프로그램 실행(Implementation)
4. 프로그램 평가(Evaluation)
5. 환류(Feedback)와 수정
6. 순환적 과정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '욕구조사의 방법(설문, 면접, 표적집단면접, 델파이)을 설명하시오.',
        answer: '설문조사, 심층면접, FGI, 델파이 기법',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 욕구조사의 방법(설문, 면접, 표적집단면접, 델파이)을 설명하시오.

다음 순서로 설명해주세요:
1. 설문조사(Survey): 대규모 조사
2. 심층면접(In-depth Interview)
3. 표적집단면접(FGI, Focus Group Interview)
4. 델파이 기법(Delphi): 전문가 합의
5. 지역사회 포럼
6. 각 방법의 장단점

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '프로그램 평가의 종류(과정평가, 결과평가, 영향평가)를 설명하시오.',
        answer: '과정평가, 결과평가, 영향평가, 총괄평가',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 프로그램 평가의 종류(과정평가, 결과평가, 영향평가)를 설명하시오.

다음 순서로 설명해주세요:
1. 과정평가(Process Evaluation): 실행 과정
2. 결과평가(Outcome Evaluation): 목표 달성
3. 영향평가(Impact Evaluation): 인과관계
4. 총괄평가(Summative) vs 형성평가(Formative)
5. 효과성(Effectiveness) vs 효율성(Efficiency)
6. 평가 설계와 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '성과측정과 지표 개발을 설명하시오.',
        answer: 'SMART 목표, 투입-과정-산출-결과 지표',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 성과측정과 지표 개발을 설명하시오.

다음 순서로 설명해주세요:
1. 성과측정의 정의와 목적
2. SMART 목표 설정
3. 투입 지표(Input Indicators)
4. 과정 지표(Process Indicators)
5. 산출 지표(Output Indicators)
6. 결과 지표(Outcome Indicators)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '질 관리(Quality Management)의 원칙과 방법을 설명하시오.',
        answer: 'TQM, 지속적 개선, 고객 만족, ISO',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 질 관리(Quality Management)의 원칙과 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 질 관리의 정의와 목적
2. 총체적 질 관리(TQM, Total Quality Management)
3. 지속적 개선(Continuous Improvement)
4. 고객(클라이언트) 만족
5. ISO 인증과 평가
6. 사회복지서비스 질 향상 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'organization-management',
    name: '조직 관리와 변화',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '조직 구조의 유형(기능별, 사업별, 매트릭스)을 설명하시오.',
        answer: '기능별: 전문화, 사업별: 통합, 매트릭스: 혼합',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 조직 구조의 유형(기능별, 사업별, 매트릭스)을 설명하시오.

다음 순서로 설명해주세요:
1. 기능별 구조(Functional): 전문화
2. 사업별 구조(Divisional): 통합적 관리
3. 매트릭스 구조(Matrix): 이중 보고
4. 네트워크 구조(Network)
5. 각 구조의 장단점
6. 사회복지조직 적합 구조

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '의사소통의 유형(공식, 비공식, 상향, 하향)과 장애요인을 설명하시오.',
        answer: '공식·비공식, 상향·하향·수평, 장애요인',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 의사소통의 유형(공식, 비공식, 상향, 하향)과 장애요인을 설명하시오.

다음 순서로 설명해주세요:
1. 공식적 의사소통 vs 비공식적 의사소통
2. 상향적(Upward) 의사소통
3. 하향적(Downward) 의사소통
4. 수평적(Horizontal) 의사소통
5. 의사소통 장애요인
6. 효과적 의사소통 전략

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '갈등의 원인과 해결 방법을 설명하시오.',
        answer: '자원 경쟁, 목표 차이, 협상, 중재, 타협',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 갈등의 원인과 해결 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 갈등의 정의와 유형
2. 갈등의 원인: 자원 경쟁, 목표 차이
3. 기능적 갈등 vs 역기능적 갈등
4. 갈등 해결 전략: 협상, 중재, 타협
5. 토마스-킬만(Thomas-Kilmann) 갈등 관리 모델
6. 사회복지조직 갈등 관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '조직 변화와 혁신의 과정을 설명하시오.',
        answer: '해빙-변화-재결빙, 저항 관리',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 조직 변화와 혁신의 과정을 설명하시오.

다음 순서로 설명해주세요:
1. 조직 변화의 필요성
2. 레빈(Lewin)의 변화 3단계: 해빙-변화-재결빙
3. 변화에 대한 저항
4. 저항 극복 전략
5. 조직 학습(Organizational Learning)
6. 사회복지조직 혁신 사례

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '조직 문화와 가치의 중요성을 설명하시오.',
        answer: '공유 가치, 규범, 조직 정체성, 사명 중심',
        prompt: `사회복지사 1급 사회복지행정론 문제입니다.

문제: 조직 문화와 가치의 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 조직 문화의 정의
2. 공유된 가치와 규범
3. 조직 정체성(Organizational Identity)
4. 사명 중심(Mission-Driven) 조직
5. 긍정적 조직 문화 형성
6. 사회복지조직의 가치 지향

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function AdministrationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-worker-administration-progress');
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
    localStorage.setItem('social-worker-administration-progress', JSON.stringify(newCompleted));
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
            <span className="text-pink-600 font-medium">사회복지행정론</span>
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
                <h1 className="text-2xl font-bold">사회복지행정론 학습</h1>
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
