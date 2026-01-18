'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'advanced-teaching',
    name: '고급 교수학습 이론',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '구성주의 학습이론과 평생교육을 설명하시오.', answer: '지식구성, 상황학습, 협력학습, 실천공동체', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 구성주의 학습이론과 평생교육을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성주의의 철학적 배경\n2. 지식구성과 의미생성\n3. 상황학습이론\n4. 협력학습과 실천공동체\n5. 평생교육 적용 사례\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '성인학습 동기이론을 설명하시오.', answer: '기대이론, 자기효능감, 자기결정성, 학습지향성', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 성인학습 동기이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기대이론(Expectancy Theory)\n2. 자기효능감(Self-efficacy)\n3. 자기결정성이론\n4. 학습지향성과 목표지향성\n5. 동기 촉진 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '전문가 학습이론을 설명하시오.', answer: '숙련성 발달, 의도적 연습, 적응적 전문성, 반성적 실천', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 전문가 학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전문성 발달 단계\n2. 의도적 연습(Deliberate Practice)\n3. 적응적 전문성\n4. 반성적 실천가(Reflective Practitioner)\n5. 전문가 교육 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '조직학습이론을 설명하시오.', answer: '학습조직, 지식창출, 단일순환·이중순환, 조직역량', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 조직학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습조직의 개념\n2. 지식창출이론(SECI 모델)\n3. 단일순환 vs 이중순환 학습\n4. 조직역량 개발\n5. 학습조직 구축 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '비형식·무형식 학습을 설명하시오.', answer: '경험학습, 우연학습, 일터학습, 학습의 인정', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 비형식·무형식 학습을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 형식·비형식·무형식 학습의 구분\n2. 경험학습과 우연학습\n3. 일터학습(Workplace Learning)\n4. 비형식학습의 인정과 활용\n5. 학습성과 인정체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'instructional-design',
    name: '교수설계 및 매체 활용',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: 'ADDIE 모형을 활용한 교수설계를 설명하시오.', answer: '분석-설계-개발-실행-평가, 체계적 교수설계', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: ADDIE 모형을 활용한 교수설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ADDIE 모형의 5단계\n2. 분석(Analysis) 단계\n3. 설계(Design) 단계\n4. 개발(Development) 단계\n5. 실행(Implementation)과 평가(Evaluation)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '블렌디드 러닝 설계를 설명하시오.', answer: '온·오프라인 통합, 플립러닝, 하이브리드, 학습경험 설계', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 블렌디드 러닝 설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 블렌디드 러닝의 개념\n2. 온·오프라인 통합 모형\n3. 플립러닝(거꾸로 교실)\n4. 하이브리드 학습환경\n5. 효과적인 설계 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '이러닝 교수설계 원리를 설명하시오.', answer: '상호작용, 학습자 통제, 멀티미디어 활용, LMS', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 이러닝 교수설계 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이러닝의 특징과 장점\n2. 상호작용 설계\n3. 학습자 통제와 개별화\n4. 멀티미디어 학습 원리\n5. LMS 활용 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: 'UDL(보편적 학습설계)를 설명하시오.', answer: '다양한 표상, 행동·표현, 참여, 접근성', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: UDL(보편적 학습설계)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. UDL의 개념과 배경\n2. 다양한 표상 수단 제공\n3. 다양한 행동·표현 수단\n4. 다양한 참여 수단\n5. 평생교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '교육공학의 최신 동향을 설명하시오.', answer: 'AI·VR·AR 활용, 학습분석, 적응적 학습, 게이미피케이션', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 교육공학의 최신 동향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AI 기반 맞춤형 학습\n2. VR·AR·메타버스 활용\n3. 학습분석(Learning Analytics)\n4. 적응적 학습 시스템\n5. 게이미피케이션 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'teaching-methods',
    name: '교수법 및 촉진 기법',
    color: 'from-violet-500 to-purple-500',
    questions: [
      { id: 1, question: '퍼실리테이션 기법을 설명하시오.', answer: '촉진자 역할, 참여 유도, 집단역학, 의사결정 지원', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 퍼실리테이션 기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퍼실리테이션의 개념\n2. 촉진자의 역할과 자질\n3. 참여 유도 기법\n4. 집단역학 관리\n5. 의사결정 지원 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '문제기반학습(PBL)을 설명하시오.', answer: '실제 문제, 자기주도학습, 협력학습, 성찰', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 문제기반학습(PBL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PBL의 개념과 특징\n2. 실제적 문제 설계\n3. 자기주도학습 과정\n4. 협력학습 촉진\n5. 성찰과 피드백\n\n비슯한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '코칭과 멘토링을 설명하시오.', answer: '성장 지원, 질문기법, 피드백, 관계형성', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 코칭과 멘토링을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 코칭과 멘토링의 차이\n2. 코칭 질문기법\n3. 효과적인 피드백\n4. 신뢰관계 형성\n5. 평생교육에의 적용\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '액션러닝을 설명하시오.', answer: '실제 과제, 팀학습, 질문과 성찰, 실행', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 액션러닝을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 액션러닝의 개념\n2. 실제 과제 선정\n3. 팀학습 과정\n4. 질문과 성찰\n5. 실행과 학습의 통합\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '워크숍 설계와 운영을 설명하시오.', answer: '목표 설정, 프로그램 구성, 참여활동, 산출물', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 워크숍 설계와 운영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 워크숍의 특징\n2. 목표와 산출물 설정\n3. 프로그램 구성 원리\n4. 참여활동 설계\n5. 효과적인 운영 전략\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'assessment',
    name: '평가 및 질 관리',
    color: 'from-pink-500 to-rose-500',
    questions: [
      { id: 1, question: '학습성과 평가 체계를 설명하시오.', answer: '학습목표, 평가방법, 루브릭, 포트폴리오', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 학습성과 평가 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습목표와 평가의 연계\n2. 다양한 평가방법\n3. 루브릭 개발과 활용\n4. 포트폴리오 평가\n5. 평가결과 환류\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '역량기반 평가를 설명하시오.', answer: 'NCS, 직무역량, 수행평가, 인증', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 역량기반 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역량의 개념과 유형\n2. NCS 기반 역량평가\n3. 직무역량 평가도구\n4. 수행평가 방법\n5. 역량인증 체계\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '교육품질관리 체계를 설명하시오.', answer: 'ISO, 품질지표, 자체평가, 인증평가', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 교육품질관리 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교육품질의 개념\n2. ISO 품질관리 기준\n3. 품질지표 개발\n4. 자체평가 실시\n5. 인증평가 대응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '학습자 만족도 조사를 설명하시오.', answer: '설문설계, 척도개발, 통계분석, 개선방안', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 학습자 만족도 조사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 만족도 조사의 목적\n2. 설문지 설계\n3. 척도 개발과 타당화\n4. 통계분석 방법\n5. 결과 활용 및 개선\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '교육효과성 측정을 설명하시오.', answer: 'Kirkpatrick 4단계, ROI, 성과측정, 장기효과', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 교육효과성 측정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Kirkpatrick 4단계 평가모형\n2. ROI(투자대비효과) 분석\n3. 성과측정 지표\n4. 장기효과 추적\n5. 효과성 제고 방안\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'learner-support',
    name: '학습자 지원 체계',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '학습상담 체계를 설명하시오.', answer: '학습진단, 상담기법, 동기부여, 학습전략 지도', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 학습상담 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습진단 도구\n2. 학습상담 기법\n3. 동기부여 전략\n4. 학습전략 지도\n5. 상담 사례관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '학습장애 지원을 설명하시오.', answer: '접근성, 보조공학, 합리적 배려, 통합교육', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 학습장애 지원을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습장애의 유형\n2. 교육접근성 보장\n3. 보조공학 활용\n4. 합리적 배려 제공\n5. 통합교육 실현\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '학습공동체 구축을 설명하시오.', answer: '상호작용, 협력학습, 학습동아리, 네트워크', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 학습공동체 구축을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습공동체의 개념\n2. 상호작용 촉진\n3. 협력학습 문화\n4. 학습동아리 운영\n5. 네트워크 활성화\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '온라인 학습자 지원을 설명하시오.', answer: 'LMS, 튜터링, 기술지원, 학습분석', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 온라인 학습자 지원을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LMS 활용 지원\n2. 온라인 튜터링\n3. 기술지원 체계\n4. 학습분석 기반 지원\n5. 학습 지속성 제고\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '학습성과 인정체계를 설명하시오.', answer: '학점은행제, 자격연계, 마이크로크리덴셜, 배지', prompt: '평생교육사 1급 평생교육방법론 문제입니다.\n\n문제: 학습성과 인정체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학점은행제도\n2. 자격연계 체계\n3. 마이크로크리덴셜\n4. 디지털 배지\n5. 학습이력 관리\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function Methodology1StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lifelong-educator-1-methodology-progress');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('lifelong-educator-1-methodology-progress', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education" className="text-gray-600 hover:text-indigo-600">교육</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/education/lifelong-educator-1" className="text-gray-600 hover:text-indigo-600">평생교육사 1급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">평생교육방법론</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🎓</span>
            <h1 className="text-2xl font-bold text-gray-800">평생교육방법론 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">평생교육사 1급 시험과목 - 교수학습 이론, 방법 및 평가</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-indigo-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
