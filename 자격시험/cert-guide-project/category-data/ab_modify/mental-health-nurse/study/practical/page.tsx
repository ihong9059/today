'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 1,
    title: '정신상태검사(MSE)',
    questions: [
      { id: 1, question: '정신상태검사(MSE)의 구성요소를 설명하시오', answer: '외모, 행동, 언어, 기분과 정동, 사고과정과 내용, 지각, 인지기능(지남력, 기억, 집중, 추상적 사고), 판단력, 병식으로 구성됩니다.' },
      { id: 2, question: '기분(Mood)과 정동(Affect)의 차이를 설명하시오', answer: '기분은 환자가 보고하는 주관적 감정 상태(우울, 불안)입니다. 정동은 관찰되는 감정 표현(표정, 목소리)으로 범위, 강도, 적절성, 안정성을 평가합니다.' },
      { id: 3, question: '사고과정 장애의 유형을 설명하시오', answer: '사고비약(조증), 사고지연(우울), 사고차단, 지리멸렬, 우원증(이탈), 음연상, 신어증, 보속증이 있습니다. 논리성과 목표지향성을 평가합니다.' },
      { id: 4, question: '사고내용 장애(망상)의 유형을 설명하시오', answer: '피해망상, 관계망상, 과대망상, 허무망상, 신체망상, 질투망상, 색정망상, 조종망상(사고주입, 탈취, 전파)이 있습니다. 확신의 정도와 기능에 미치는 영향을 평가합니다.' },
      { id: 5, question: '인지기능 평가 방법을 설명하시오', answer: '지남력(시간, 장소, 사람), 기억(즉각, 최근, 원격), 집중력(연속7빼기), 추상적 사고(속담해석, 유사성), 계산능력을 평가합니다. MMSE, MoCA 도구를 활용합니다.' },
    ]
  },
  {
    id: 2,
    title: '위기개입과 안전관리',
    questions: [
      { id: 6, question: '자살위험 평가 도구와 방법을 설명하시오', answer: 'SAD PERSONS, C-SSRS, PHQ-9 등을 사용합니다. 자살사고, 계획, 의도, 수단, 시도력, 위험/보호요인을 체계적으로 평가합니다.' },
      { id: 7, question: '자살위기 환자의 안전계획 수립을 설명하시오', answer: '경고징후 인식, 내적 대처전략, 사회적 접촉, 전문가 연락처, 환경 안전화(치명적 수단 제거)를 포함합니다. 환자와 협력하여 작성합니다.' },
      { id: 8, question: '공격적 행동의 단계적 개입을 설명하시오', answer: '언어적 진정(차분한 대화), 환경조정(자극 감소), 약물(PRN), 격리/강박 순으로 최소 제한적 개입을 시도합니다. 사전예방이 최선입니다.' },
      { id: 9, question: '격리와 강박의 적용 원칙을 설명하시오', answer: '최후의 수단, 최소시간, 의사 처방, 정기적 평가, 기본 욕구 충족, 기록, 사후 디브리핑이 원칙입니다. 인권 보호가 중요합니다.' },
      { id: 10, question: '위기상황에서의 의사소통 기법을 설명하시오', answer: '차분하고 명확한 말투, 비위협적 자세, 개인공간 존중, 선택지 제공, 경청, 공감, 한계설정을 사용합니다. 안전 확보가 최우선입니다.' },
    ]
  },
  {
    id: 3,
    title: '사례관리와 재활',
    questions: [
      { id: 11, question: '정신건강 사례관리의 과정을 설명하시오', answer: '접수(스크리닝), 사정(욕구파악), 계획수립(목표설정), 연결(서비스 제공), 점검(모니터링), 평가(결과), 종결로 진행됩니다.' },
      { id: 12, question: '강점기반 사정의 원칙을 설명하시오', answer: '문제보다 강점에 초점, 환자의 희망과 목표 존중, 지역사회 자원 활용, 환자-전문가 협력관계 형성이 원칙입니다. 회복 지향적 접근입니다.' },
      { id: 13, question: '정신재활의 목표와 원칙을 설명하시오', answer: '증상 관리, 사회적 기능 향상, 삶의 질 개선, 지역사회 통합이 목표입니다. 환자 중심, 강점 기반, 희망, 자기결정, 전인적 접근이 원칙입니다.' },
      { id: 14, question: '사회기술훈련의 영역과 방법을 설명하시오', answer: '의사소통기술, 대인관계기술, 일상생활기술, 증상관리기술을 훈련합니다. 역할극, 모델링, 피드백, 과제 수행, 일반화 훈련 방법을 사용합니다.' },
      { id: 15, question: '직업재활의 유형과 단계를 설명하시오', answer: '보호작업장, 지원고용, 경쟁고용이 유형입니다. 직업평가, 직업훈련, 취업알선, 직무지도, 추후관리 단계로 진행됩니다.' },
    ]
  },
  {
    id: 4,
    title: '가족교육과 집단치료',
    questions: [
      { id: 16, question: '정신질환자 가족교육의 내용을 설명하시오', answer: '질병에 대한 이해, 약물치료, 재발 경고징후, 위기 대처, 의사소통 기술, 스트레스 관리, 지역사회 자원, 자기돌봄을 교육합니다.' },
      { id: 17, question: '심리교육의 목적과 구성요소를 설명하시오', answer: '질병 이해, 자가관리 능력 향상, 재발예방이 목적입니다. 정보제공, 기술훈련, 감정적 지지, 문제해결이 구성요소입니다.' },
      { id: 18, question: '집단치료의 치료적 요인을 설명하시오', answer: 'Yalom의 11가지: 희망고취, 보편성, 정보전달, 이타성, 1차 가족집단의 교정적 재현, 사회화기술 발달, 모방행동, 대인관계학습, 집단응집력, 카타르시스, 실존적 요인.' },
      { id: 19, question: '지지집단의 특성과 운영을 설명하시오', answer: '비슷한 경험을 가진 사람들이 상호지지합니다. 자조집단, 가족지지집단 등이 있습니다. 공유, 경청, 비밀유지, 상호존중이 원칙입니다.' },
      { id: 20, question: '동기면담의 원칙과 기술을 설명하시오', answer: '공감표현, 모순개발, 저항과 함께 구르기, 자기효능감 지지가 원칙입니다. OARS(개방형질문, 인정, 반영, 요약) 기술을 사용합니다.' },
    ]
  },
  {
    id: 5,
    title: '문서작성과 윤리',
    questions: [
      { id: 21, question: '정신건강 간호기록의 원칙을 설명하시오', answer: '정확성, 완전성, 적시성, 객관성, 비밀유지가 원칙입니다. 관찰한 사실과 간호중재, 환자 반응을 기록합니다. 법적 문서로서의 가치가 있습니다.' },
      { id: 22, question: '간호과정 적용 시 주관적/객관적 자료 구분을 설명하시오', answer: '주관적 자료: 환자가 말한 내용("잠을 못 자요"). 객관적 자료: 관찰/측정한 것(눈 밑 다크서클, 수면시간 3시간). SOAP 형식으로 기록합니다.' },
      { id: 23, question: '정신건강 영역의 윤리적 원칙을 설명하시오', answer: '자율성 존중(동의, 비밀유지), 선행(최선의 이익), 악행금지(해 끼치지 않기), 정의(공정한 자원분배), 성실성이 원칙입니다.' },
      { id: 24, question: '비자의 입원의 윤리적 쟁점을 설명하시오', answer: '자율성 vs 선행/안전의 충돌입니다. 자타해 위험이 있을 때 제한적으로 허용됩니다. 최소 제한, 정기적 평가, 권리 보호가 필요합니다.' },
      { id: 25, question: '정신건강간호사의 전문적 역할과 책임을 설명하시오', answer: '직접 간호, 건강교육, 상담, 사례관리, 옹호, 협력, 연구, 전문성 개발이 역할입니다. 근거기반실무, 평생학습, 윤리적 실천이 책임입니다.' },
    ]
  }
];

export default function PracticalPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([1]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mental-health-nurse-practical-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('mental-health-nurse-practical-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (questionId: number) => {
    setCompletedQuestions(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = completedQuestions.length;
  const progressPercent = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-purple-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-purple-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/mental-health-nurse" className="text-gray-600 hover:text-purple-600">정신건강간호사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">실기</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">실기</h1>
              <p className="text-gray-600">정신건강간호사 실기시험 대비</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">학습 진행률</span>
              <span className="text-sm font-medium text-purple-600">{completedCount}/{totalQuestions} 완료 ({progressPercent}%)</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📘</span>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map(q => (
                    <div key={q.id} className={`p-4 rounded-lg border ${completedQuestions.includes(q.id) ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 bg-white p-3 rounded border">{q.answer}</p>
                          <div className="mt-2 flex gap-2">
                            <a href={`https://claude.ai/new?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200">Claude</a>
                            <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">ChatGPT</a>
                            <a href={`https://gemini.google.com/?q=${encodeURIComponent(q.question)}`} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Gemini</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
