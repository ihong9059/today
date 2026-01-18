'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'basic-law',
    name: '사회복지법의 기초',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 1,
        question: '사회복지법의 개념과 특성을 설명하시오.',
        answer: '사회권 보장, 공공성, 급부적 성격, 생존권',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 사회복지법의 개념과 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지법의 정의
2. 사회권(Social Rights) 보장
3. 공공성과 공익성
4. 급부적 성격 (권리 부여)
5. 생존권 보장 (헌법 제34조)
6. 일반 법과의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '사회복지법의 법원(법률, 명령, 조례)을 설명하시오.',
        answer: '헌법→법률→대통령령→부령→조례',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 사회복지법의 법원(법률, 명령, 조례)을 설명하시오.

다음 순서로 설명해주세요:
1. 법원(法源, Source of Law)의 개념
2. 헌법: 최고 규범
3. 법률: 국회 제정
4. 대통령령(시행령), 부령(시행규칙)
5. 조례: 지방자치단체
6. 법의 위계 질서

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '헌법상 사회권(제34조)의 내용을 설명하시오.',
        answer: '인간다운 생활권, 국가 보호 의무, 생활무능력자 보호',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 헌법상 사회권(제34조)의 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 헌법 제34조 제1항: 인간다운 생활권
2. 국가의 사회보장·사회복지 증진 의무
3. 생활무능력자 보호 의무
4. 여자, 노인, 청소년, 장애인 복지
5. 재해 예방과 위험으로부터 보호
6. 프로그램 규정 vs 법적 권리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '사회복지사업법의 목적과 기본 이념을 설명하시오.',
        answer: '사회복지사업 규정, 복지 증진, 인권 존중',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 사회복지사업법의 목적과 기본 이념을 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지사업법 제1조 (목적)
2. 사회복지사업의 정의 (제2조)
3. 기본 이념: 인권 존중, 자립 지원
4. 사회복지서비스 신청권
5. 사회복지시설 및 법인
6. 사회복지사 자격 관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '사회보장기본법의 기본 원칙을 설명하시오.',
        answer: '보편성, 형평성, 민주성, 포괄성',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 사회보장기본법의 기본 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 사회보장기본법의 목적
2. 보편성의 원칙
3. 형평성의 원칙
4. 민주성의 원칙
5. 포괄성의 원칙
6. 사회보장 정책의 방향

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'public-assistance',
    name: '공공부조법',
    color: 'from-rose-500 to-red-500',
    questions: [
      {
        id: 1,
        question: '국민기초생활보장법의 기본 원리를 설명하시오.',
        answer: '최저생활보장, 보충급여, 신청주의, 자활 조성',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 국민기초생활보장법의 기본 원리를 설명하시오.

다음 순서로 설명해주세요:
1. 최저생활보장의 원칙
2. 보충급여의 원칙 (소득인정액)
3. 신청주의 원칙 (제21조)
4. 자활 조성의 원칙
5. 급여의 기준: 중위소득 대비
6. 급여의 종류: 생계, 의료, 주거, 교육

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '수급권자 선정 기준(소득인정액, 부양의무자)을 설명하시오.',
        answer: '소득인정액 = 소득평가액 + 재산의 소득환산액',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 수급권자 선정 기준(소득인정액, 부양의무자)을 설명하시오.

다음 순서로 설명해주세요:
1. 소득인정액의 개념
2. 소득평가액 계산
3. 재산의 소득환산액
4. 부양의무자 기준 (완화 추세)
5. 급여별 선정 기준 (생계 30%, 의료 40%, 주거 48%)
6. 근로능력 판정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '급여의 종류(생계, 의료, 주거, 교육)와 내용을 설명하시오.',
        answer: '생계급여, 의료급여, 주거급여, 교육급여',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 급여의 종류(생계, 의료, 주거, 교육)와 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 생계급여: 현금, 중위소득 30%
2. 의료급여: 현물, 1종·2종
3. 주거급여: 임차료, 수선유지비
4. 교육급여: 입학금, 수업료, 학용품비
5. 해산급여, 장제급여
6. 자활급여

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '의료급여법의 수급권자와 급여 내용을 설명하시오.',
        answer: '1종, 2종, 본인부담금, 건강보험과 차이',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 의료급여법의 수급권자와 급여 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 의료급여 수급권자: 1종, 2종
2. 1종: 근로무능력 가구
3. 2종: 근로능력 가구
4. 본인부담금 차이 (1종 무료~1,000원, 2종 10~15%)
5. 의료급여기관 (1, 2, 3차)
6. 건강보험과의 차이

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '긴급복지지원법의 지원 요건과 내용을 설명하시오.',
        answer: '위기 상황, 신속한 지원, 생계·의료·주거 등',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 긴급복지지원법의 지원 요건과 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 긴급지원의 목적과 원칙
2. 위기 상황의 정의 (주소득자 사망, 중한 질병 등)
3. 소득·재산 기준 (기준 중위소득 75%)
4. 지원 내용: 생계, 의료, 주거, 사회복지시설 이용
5. 지원 기간: 1개월, 최대 6개월
6. 사후조사와 환수

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'social-insurance',
    name: '사회보험법',
    color: 'from-orange-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: '국민연금법의 가입 대상과 급여 종류를 설명하시오.',
        answer: '18~60세 강제가입, 노령연금, 장애연금, 유족연금',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 국민연금법의 가입 대상과 급여 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 가입 대상: 18세 이상 60세 미만
2. 사업장가입자, 지역가입자, 임의가입자
3. 노령연금: 10년 이상 가입, 수급 개시 연령
4. 장애연금: 장애등급 1~4급
5. 유족연금: 배우자, 자녀
6. 반환일시금

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '국민건강보험법의 가입자와 보험료 부과를 설명하시오.',
        answer: '직장가입자, 지역가입자, 소득·재산 보험료',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 국민건강보험법의 가입자와 보험료 부과를 설명하시오.

다음 순서로 설명해주세요:
1. 전국민 강제가입
2. 직장가입자: 근로자와 사용자 부담
3. 지역가입자: 소득, 재산 기준
4. 피부양자: 보험료 없음
5. 요양급여: 진찰, 검사, 약제
6. 본인부담금

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '노인장기요양보험법의 장기요양등급과 급여를 설명하시오.',
        answer: '1~5등급, 인지지원등급, 재가급여, 시설급여',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 노인장기요양보험법의 장기요양등급과 급여를 설명하시오.

다음 순서로 설명해주세요:
1. 적용 대상: 65세 이상 노인 또는 65세 미만 노인성 질병
2. 장기요양등급: 1~5등급, 인지지원등급
3. 장기요양인정 절차
4. 재가급여: 방문요양, 주야간보호, 단기보호
5. 시설급여: 노인요양시설
6. 본인부담금: 15~20%

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '고용보험법의 실업급여 요건과 내용을 설명하시오.',
        answer: '구직급여, 180일 이상 가입, 비자발적 이직',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 고용보험법의 실업급여 요건과 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 실업급여의 종류: 구직급여, 취업촉진수당
2. 수급 요건: 180일 이상 피보험 단위기간
3. 비자발적 이직 (자발적 이직 제외)
4. 적극적 구직활동
5. 급여액: 퇴직 전 평균임금의 60%
6. 소정급여일수: 120~270일

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '산업재해보상보험법의 업무상 재해와 급여를 설명하시오.',
        answer: '업무상 사고·질병, 요양급여, 장해급여, 유족급여',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 산업재해보상보험법의 업무상 재해와 급여를 설명하시오.

다음 순서로 설명해주세요:
1. 업무상 재해의 정의: 업무상 사고, 업무상 질병
2. 무과실책임주의
3. 요양급여: 치료비 전액
4. 휴업급여: 평균임금의 70%
5. 장해급여: 장해등급 1~14급
6. 유족급여, 상병보상연금

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'welfare-services',
    name: '사회복지서비스법',
    color: 'from-blue-500 to-purple-500',
    questions: [
      {
        id: 1,
        question: '아동복지법의 아동 권리와 보호 체계를 설명하시오.',
        answer: '아동 권리, 학대 신고, 보호조치, 아동복지시설',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 아동복지법의 아동 권리와 보호 체계를 설명하시오.

다음 순서로 설명해주세요:
1. 아동의 정의: 18세 미만
2. 아동 권리 (생존권, 보호권, 발달권, 참여권)
3. 아동학대 신고 의무 (아동학대처벌법)
4. 보호조치: 가정 복귀, 시설 입소, 위탁
5. 아동복지시설의 종류
6. 아동수당, 보육료 지원

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '노인복지법의 노인 복지 서비스를 설명하시오.',
        answer: '노인복지시설, 재가노인복지시설, 노인학대 신고',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 노인복지법의 노인 복지 서비스를 설명하시오.

다음 순서로 설명해주세요:
1. 노인의 정의: 65세 이상
2. 노인복지시설: 노인주거복지시설, 노인의료복지시설
3. 재가노인복지시설: 방문요양, 주야간보호
4. 노인여가복지시설: 노인복지관, 경로당
5. 노인학대 신고 의무
6. 기초연금법과의 관계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '장애인복지법의 장애인 권리와 서비스를 설명하시오.',
        answer: '장애인 정의, 등록, 활동지원, 차별금지',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 장애인복지법의 장애인 권리와 서비스를 설명하시오.

다음 순서로 설명해주세요:
1. 장애인의 정의와 분류 (15종)
2. 장애인 등록제도
3. 장애인 활동지원 서비스
4. 장애인복지시설
5. 장애인차별금지 및 권리구제에 관한 법률
6. 장애인연금, 장애수당

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '한부모가족지원법의 지원 대상과 내용을 설명하시오.',
        answer: '한부모가족, 청소년 한부모, 생계비·아동양육비',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 한부모가족지원법의 지원 대상과 내용을 설명하시오.

다음 순서로 설명해주세요:
1. 한부모가족의 정의
2. 지원 대상: 소득인정액 기준 중위소득 60%
3. 청소년 한부모 (24세 이하)
4. 지원 내용: 생계비, 아동양육비, 아동교육지원비
5. 한부모가족복지시설
6. 복지급여 우선 지급

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '정신건강증진법의 입원과 퇴원 절차를 설명하시오.',
        answer: '자의입원, 동의입원, 행정입원, 인권 보호',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 정신건강증진법의 입원과 퇴원 절차를 설명하시오.

다음 순서로 설명해주세요:
1. 입원의 종류: 자의입원, 동의입원, 행정입원
2. 자의입원: 본인 동의
3. 동의입원: 보호의무자 동의
4. 행정입원: 특별자치시장·시장·군수·구청장
5. 정신건강심사위원회
6. 인권 보호와 퇴원 청구권

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
  {
    id: 'institutions-professionals',
    name: '사회복지시설 및 전문인력',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: '사회복지시설의 종류와 설치·운영을 설명하시오.',
        answer: '국공립, 법인, 개인 시설, 신고·허가, 평가',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 사회복지시설의 종류와 설치·운영을 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지시설의 정의 (사회복지사업법 제2조)
2. 시설 종류: 국공립, 법인, 개인
3. 설치 신고 및 허가
4. 시설의 장 자격
5. 시설 평가 (3년마다)
6. 보조금 지원과 관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '사회복지법인의 설립과 운영을 설명하시오.',
        answer: '허가제, 이사회, 재산 요건, 공익법인',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 사회복지법인의 설립과 운영을 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지법인의 정의
2. 설립 허가 (보건복지부장관, 시·도지사)
3. 기본재산 요건
4. 이사회 구성: 이사 7명 이상
5. 법인의 운영과 감독
6. 공익법인으로서 세제 혜택

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '사회복지사 자격 제도를 설명하시오.',
        answer: '1급, 2급, 국가시험, 결격사유, 보수교육',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 사회복지사 자격 제도를 설명하시오.

다음 순서로 설명해주세요:
1. 사회복지사의 등급: 1급, 2급
2. 1급: 국가시험 합격
3. 2급: 대학 이수, 양성기관 과정
4. 결격사유 (정신질환자, 금고 이상 형 등)
5. 자격 취소 및 정지
6. 보수교육 의무

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '사회복지사의 권리와 의무를 설명하시오.',
        answer: '신분 보장, 비밀 누설 금지, 품위 유지',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 사회복지사의 권리와 의무를 설명하시오.

다음 순서로 설명해주세요:
1. 권리: 신분 보장, 처우 개선
2. 의무: 비밀 누설 금지 (형법상 처벌)
3. 품위 유지 의무
4. 충실 의무
5. 겸직 금지 (공무원인 경우)
6. 사회복지사 윤리강령

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '지역사회보장협의체의 구성과 기능을 설명하시오.',
        answer: '대표협의체, 실무협의체, 심의·자문, 민관 협력',
        prompt: `사회복지사 1급 사회복지법제론 문제입니다.

문제: 지역사회보장협의체의 구성과 기능을 설명하시오.

다음 순서로 설명해주세요:
1. 법적 근거: 사회보장급여법
2. 대표협의체: 위원장(시장·군수·구청장)
3. 실무협의체: 실무 협력
4. 기능: 지역사회보장계획 심의·자문
5. 민관 협력 거버넌스
6. 통합사례관리와의 연계

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
    ],
  },
];

export default function LegislationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('social-worker-legislation-progress');
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
    localStorage.setItem('social-worker-legislation-progress', JSON.stringify(newCompleted));
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
            <span className="text-pink-600 font-medium">사회복지법제론</span>
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
                <h1 className="text-2xl font-bold">사회복지법제론 학습</h1>
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
