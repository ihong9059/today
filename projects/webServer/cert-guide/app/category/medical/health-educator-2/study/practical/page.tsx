'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'planning',
    name: '보건교육 프로그램 기획',
    color: 'from-purple-500 to-violet-500',
    questions: [
      {
        id: 1,
        question: '보건교육 프로그램 기획서의 주요 구성요소를 작성하시오.',
        answer: '사업명, 배경/필요성, 목적/목표, 대상, 내용, 방법, 일정, 예산, 평가계획',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 보건교육 프로그램 기획서의 주요 구성요소를 작성하시오.

다음 순서로 설명해주세요:
1. 기획서 구성요소 개요
2. 사업 배경 및 필요성 작성법
3. 목적과 목표 설정
4. 대상자 선정 및 내용 구성
5. 예산 및 평가계획 작성
6. 실제 기획서 예시
7. 연습문제 3개`
      },
      {
        id: 2,
        question: '금연 보건교육 프로그램 기획서를 작성하시오.',
        answer: '대상: 성인 흡연자, 목표: 금연 시도율 50% 증가, 내용: 금연 동기강화/기술훈련',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 금연 보건교육 프로그램 기획서를 작성하시오.

다음 순서로 설명해주세요:
1. 사업명 및 배경
2. 목적과 SMART 목표
3. 대상자 및 선정 기준
4. 교육 내용 및 방법
5. 일정 및 예산
6. 평가 지표 설정
7. 연습문제 3개`
      },
      {
        id: 3,
        question: '비만예방 보건교육 프로그램 기획서를 작성하시오.',
        answer: '대상: 과체중 성인, 목표: 체중 5% 감량, 내용: 영양교육+운동프로그램',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 비만예방 보건교육 프로그램 기획서를 작성하시오.

다음 순서로 설명해주세요:
1. 비만예방사업 필요성
2. 프로그램 목표 설정
3. 대상자 모집 전략
4. 영양+운동 통합 내용 구성
5. 주차별 세부 일정
6. 평가 방법
7. 연습문제 3개`
      },
      {
        id: 4,
        question: '직장인 스트레스 관리 프로그램 기획서를 작성하시오.',
        answer: '대상: 직장인, 목표: 스트레스 인지 및 관리능력 향상, 내용: 스트레스 이해/대처기술',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 직장인 스트레스 관리 프로그램 기획서를 작성하시오.

다음 순서로 설명해주세요:
1. 직장인 스트레스 현황
2. 프로그램 목표 설정
3. 교육 내용 구성
4. 실습 활동 포함
5. 회차별 세부 계획
6. 효과 평가 방법
7. 연습문제 3개`
      },
      {
        id: 5,
        question: '노인 낙상예방 보건교육 프로그램을 기획하시오.',
        answer: '대상: 65세 이상 노인, 목표: 낙상 위험요인 인식 및 예방행동 실천',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 노인 낙상예방 보건교육 프로그램을 기획하시오.

다음 순서로 설명해주세요:
1. 노인 낙상의 심각성
2. 프로그램 목표
3. 낙상 위험요인 교육 내용
4. 예방 운동 프로그램
5. 환경 안전 점검
6. 평가 계획
7. 연습문제 3개`
      },
    ],
  },
  {
    id: 'education',
    name: '보건교육 실시',
    color: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 6,
        question: '50분 보건교육 수업의 교수학습지도안을 작성하시오.',
        answer: '도입(10분)-전개(30분)-정리(10분) 구성, 학습목표/내용/방법/매체/평가',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 50분 보건교육 수업의 교수학습지도안을 작성하시오.

다음 순서로 설명해주세요:
1. 교수학습지도안의 구성요소
2. 도입 단계 설계
3. 전개 단계 설계
4. 정리 단계 설계
5. 교육매체 선정
6. 평가 방법
7. 연습문제 3개`
      },
      {
        id: 7,
        question: '당뇨병 예방교육 수업지도안을 작성하시오.',
        answer: '학습목표: 당뇨병 위험요인 인식, 예방 생활습관 3가지 이상 실천의지 형성',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 당뇨병 예방교육 수업지도안을 작성하시오.

다음 순서로 설명해주세요:
1. 학습목표 설정
2. 도입: 당뇨병 현황 제시
3. 전개: 위험요인/예방법 교육
4. 실습: 식품교환표 활용
5. 정리: 실천 다짐
6. 사용 매체 및 자료
7. 연습문제 3개`
      },
      {
        id: 8,
        question: '심폐소생술(CPR) 교육 수업지도안을 작성하시오.',
        answer: '학습목표: CPR 순서 설명, 흉부압박/인공호흡 시범 및 실습',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 심폐소생술(CPR) 교육 수업지도안을 작성하시오.

다음 순서로 설명해주세요:
1. CPR 교육의 필요성
2. 학습목표 설정
3. 이론 설명 (심정지, CPR 순서)
4. 시범 교육
5. 마네킹 실습
6. 평가 및 피드백
7. 연습문제 3개`
      },
      {
        id: 9,
        question: '효과적인 보건교육 발표(프레젠테이션) 기법을 설명하시오.',
        answer: '구조화된 내용, 시각자료 활용, 청중 참여, 명확한 전달, 시간 관리',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 효과적인 보건교육 발표(프레젠테이션) 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 발표 구조 설계 (도입-본론-결론)
2. 시각자료 제작 원칙
3. 발표 기법 (목소리, 제스처)
4. 청중 참여 유도
5. Q&A 대응
6. 연습문제 3개`
      },
      {
        id: 10,
        question: '소그룹 토의를 활용한 보건교육 진행 방법을 설명하시오.',
        answer: '주제 제시, 소그룹 구성, 토의 진행, 발표 및 정리, 촉진자 역할',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 소그룹 토의를 활용한 보건교육 진행 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 소그룹 토의의 교육적 효과
2. 적절한 그룹 크기와 구성
3. 토의 주제 및 질문 설계
4. 촉진자의 역할
5. 토의 결과 정리 및 공유
6. 연습문제 3개`
      },
    ],
  },
  {
    id: 'media',
    name: '교육매체 개발',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      {
        id: 11,
        question: '보건교육용 리플릿(leaflet) 제작 시 고려사항을 설명하시오.',
        answer: '대상자 특성, 핵심메시지, 가독성, 시각적 디자인, 행동 촉구',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 보건교육용 리플릿(leaflet) 제작 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 리플릿의 목적과 특성
2. 대상자 분석
3. 핵심 메시지 선정
4. 레이아웃과 디자인
5. 가독성 확보 (글씨체, 크기)
6. 행동 촉구(CTA) 포함
7. 연습문제 3개`
      },
      {
        id: 12,
        question: '보건교육용 PPT 슬라이드 제작 원칙을 설명하시오.',
        answer: '1슬라이드 1메시지, 시각화, 간결한 텍스트, 일관된 디자인',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 보건교육용 PPT 슬라이드 제작 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 효과적인 PPT의 원칙
2. 1슬라이드 1메시지 원칙
3. 시각 자료 활용
4. 텍스트 최소화
5. 색상과 폰트 선택
6. 애니메이션 적절한 사용
7. 연습문제 3개`
      },
      {
        id: 13,
        question: '건강정보 포스터 제작 시 고려사항을 설명하시오.',
        answer: '시선 유도, 핵심메시지 강조, 이미지 활용, 행동 촉구, 가독성',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 건강정보 포스터 제작 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 포스터의 목적과 특성
2. 시선 흐름 고려
3. 핵심 메시지 강조
4. 이미지와 그래픽 활용
5. 색상 대비와 가독성
6. 연습문제 3개`
      },
      {
        id: 14,
        question: '건강정보 동영상 콘텐츠 기획 방법을 설명하시오.',
        answer: '목적 설정, 스토리보드, 촬영/편집, 배포 채널 선정',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 건강정보 동영상 콘텐츠 기획 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 동영상 교육의 장점
2. 목적과 대상 설정
3. 스토리보드 작성
4. 촬영 및 편집 고려사항
5. 배포 채널 선정
6. 연습문제 3개`
      },
      {
        id: 15,
        question: '보건교육 자료의 가독성(Readability) 평가 방법을 설명하시오.',
        answer: '플레시-킨케이드, SMOG, 문장 길이, 전문용어 사용, 독자 테스트',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 보건교육 자료의 가독성(Readability) 평가 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 가독성의 정의와 중요성
2. 가독성 평가 공식 (Flesch 등)
3. SAM(Suitability Assessment of Materials)
4. 실제 독자 테스트
5. 개선 방안
6. 연습문제 3개`
      },
    ],
  },
  {
    id: 'counseling',
    name: '건강상담 실습',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 16,
        question: '금연 상담의 5A 전략을 실제 상담에 적용하시오.',
        answer: 'Ask(묻기)-Advise(권고)-Assess(평가)-Assist(도움)-Arrange(추적)',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 금연 상담의 5A 전략을 실제 상담에 적용하시오.

다음 순서로 설명해주세요:
1. 5A 전략의 개요
2. Ask: 흡연 여부 묻기
3. Advise: 금연 권고하기
4. Assess: 금연 의지 평가
5. Assist: 금연 도움 제공
6. Arrange: 추적 관리
7. 실제 상담 대화 예시
8. 연습문제 3개`
      },
      {
        id: 17,
        question: '동기강화상담(MI)의 OARS 기법을 실제 상담에 적용하시오.',
        answer: 'Open questions(열린질문)-Affirmations(인정)-Reflections(반영)-Summarizing(요약)',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 동기강화상담(MI)의 OARS 기법을 실제 상담에 적용하시오.

다음 순서로 설명해주세요:
1. OARS 기법의 개요
2. 열린 질문 예시
3. 인정(Affirmation) 표현
4. 반영적 경청 기법
5. 요약 방법
6. 실제 상담 대화 예시
7. 연습문제 3개`
      },
      {
        id: 18,
        question: '당뇨병 환자의 자기관리 상담을 진행하시오.',
        answer: '혈당 자가측정, 식이요법, 운동, 약물복용, 합병증 예방',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 당뇨병 환자의 자기관리 상담을 진행하시오.

다음 순서로 설명해주세요:
1. 당뇨병 자기관리의 중요성
2. 혈당 자가측정 교육
3. 식이요법 상담
4. 운동 상담
5. 약물 순응도 확인
6. 합병증 예방 교육
7. 연습문제 3개`
      },
      {
        id: 19,
        question: '고혈압 환자의 생활습관 개선 상담을 진행하시오.',
        answer: '혈압 모니터링, 저염식, 운동, 절주, 체중관리, 스트레스 관리',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 고혈압 환자의 생활습관 개선 상담을 진행하시오.

다음 순서로 설명해주세요:
1. 혈압 측정 및 기록 지도
2. 나트륨 섭취 줄이기
3. DASH 식단 소개
4. 적절한 운동 권고
5. 절주 및 금연 상담
6. 실제 상담 시나리오
7. 연습문제 3개`
      },
      {
        id: 20,
        question: '비만 대상자의 체중관리 상담을 진행하시오.',
        answer: '현재 상태 평가, 목표 설정, 식이/운동 계획, 행동수정, 지지체계',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 비만 대상자의 체중관리 상담을 진행하시오.

다음 순서로 설명해주세요:
1. 체중/BMI 평가
2. 현실적 목표 설정
3. 식이 조절 전략
4. 운동 계획 수립
5. 행동수정 기법 적용
6. 추적 관리 계획
7. 연습문제 3개`
      },
    ],
  },
  {
    id: 'evaluation',
    name: '프로그램 평가',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 21,
        question: '보건교육 프로그램 평가 계획서를 작성하시오.',
        answer: '평가목적, 평가유형, 평가지표, 자료수집방법, 분석방법, 일정',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 보건교육 프로그램 평가 계획서를 작성하시오.

다음 순서로 설명해주세요:
1. 평가 목적 설정
2. 평가 유형 선정 (과정/결과)
3. 평가 지표 설정
4. 자료수집 방법
5. 분석 방법
6. 평가 일정
7. 연습문제 3개`
      },
      {
        id: 22,
        question: '건강교육 프로그램의 만족도 설문지를 개발하시오.',
        answer: '프로그램 내용, 강사, 교육환경, 전반적 만족도, 개선사항',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 건강교육 프로그램의 만족도 설문지를 개발하시오.

다음 순서로 설명해주세요:
1. 만족도 조사의 목적
2. 조사 영역 설정
3. 문항 유형 (리커트 척도)
4. 문항 작성 원칙
5. 개방형 질문 포함
6. 설문지 예시
7. 연습문제 3개`
      },
      {
        id: 23,
        question: '건강행동 변화 측정을 위한 설문 문항을 개발하시오.',
        answer: '지식, 태도, 자기효능감, 행동의도, 행동실천 측정 문항',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 건강행동 변화 측정을 위한 설문 문항을 개발하시오.

다음 순서로 설명해주세요:
1. 건강행동 변화 지표
2. 지식 측정 문항
3. 태도 측정 문항
4. 자기효능감 측정 문항
5. 행동의도/실천 측정 문항
6. 문항 예시
7. 연습문제 3개`
      },
      {
        id: 24,
        question: '프로그램 평가 결과 보고서를 작성하시오.',
        answer: '요약, 사업개요, 평가방법, 결과, 결론 및 제언',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 프로그램 평가 결과 보고서를 작성하시오.

다음 순서로 설명해주세요:
1. 보고서 구성 요소
2. 요약(Executive Summary)
3. 사업 개요 기술
4. 평가 방법 설명
5. 결과 제시 (표, 그래프)
6. 결론 및 제언
7. 연습문제 3개`
      },
      {
        id: 25,
        question: '보건교육 프로그램 개선을 위한 환류(feedback) 방안을 제시하시오.',
        answer: '평가결과 분석, 개선점 도출, 차기 프로그램 반영, 이해관계자 공유',
        prompt: `보건교육사 2급 실기 문제입니다.

문제: 보건교육 프로그램 개선을 위한 환류(feedback) 방안을 제시하시오.

다음 순서로 설명해주세요:
1. 환류의 정의와 중요성
2. 평가 결과 분석 방법
3. 개선점 도출
4. 차기 프로그램 반영
5. 이해관계자 공유
6. 지속적 질 향상
7. 연습문제 3개`
      },
    ],
  },
];

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-2-practical-progress');
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
    localStorage.setItem('health-educator-2-practical-progress', JSON.stringify(newCompleted));
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
            <Link href="/" className="text-gray-600 hover:text-purple-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-purple-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/health-educator-2" className="text-gray-600 hover:text-purple-600">보건교육사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-500 to-violet-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">🎤</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">실기 학습</h1>
                <p className="text-purple-100">보건교육사 2급 실기시험</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-purple-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
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
                                <strong>핵심:</strong> {q.answer}
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
