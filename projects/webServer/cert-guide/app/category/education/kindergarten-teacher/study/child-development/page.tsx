'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Topic {
  id: number;
  question: string;
  prompt: string;
}

const topics: { title: string; icon: string; items: Topic[] }[] = [
  {
    title: '발달의 기초 이론',
    icon: '🧒',
    items: [
      { id: 1, question: '발달의 개념과 원리는?', prompt: '발달의 개념, 성숙과 학습의 관계, 발달의 원리(연속성, 방향성, 개인차, 분화와 통합 등)에 대해 자세히 설명해주세요.' },
      { id: 2, question: '유전과 환경의 상호작용은?', prompt: '유전과 환경의 상호작용이 발달에 미치는 영향, 유전-환경 논쟁의 역사, 현대적 관점(상호작용주의)을 설명해주세요.' },
      { id: 3, question: '발달 연구 방법에는 무엇이 있는가?', prompt: '아동발달 연구 방법(종단연구, 횡단연구, 관찰법, 실험법, 사례연구 등)의 특징과 장단점을 설명해주세요.' },
      { id: 4, question: '프로이트의 심리성적 발달이론은?', prompt: '프로이트(Freud)의 심리성적 발달단계(구강기, 항문기, 남근기, 잠복기, 생식기), 이드-자아-초자아의 개념을 설명해주세요.' },
      { id: 5, question: '에릭슨의 심리사회적 발달이론은?', prompt: '에릭슨(Erikson)의 심리사회적 발달단계 8단계, 특히 유아기 관련 단계(신뢰vs불신, 자율성vs수치심, 주도성vs죄책감)를 설명해주세요.' },
      { id: 6, question: '발달 과업이란 무엇인가?', prompt: '하비거스트(Havighurst)의 발달과업 개념, 유아기의 발달과업, 발달과업 성취의 중요성에 대해 설명해주세요.' },
      { id: 7, question: '생태학적 발달이론은?', prompt: '브론펜브레너(Bronfenbrenner)의 생태학적 체계이론(미시체계, 중간체계, 외체계, 거시체계, 시간체계)을 유아교육에 적용하여 설명해주세요.' },
      { id: 8, question: '발달의 결정적 시기란?', prompt: '발달의 결정적 시기(critical period)와 민감기(sensitive period)의 개념, 로렌츠의 각인이론, 유아교육에서의 시사점을 설명해주세요.' },
      { id: 9, question: '발달의 연속성과 불연속성은?', prompt: '발달의 연속성(점진적 변화)과 불연속성(단계적 변화) 관점의 차이, 각 관점을 지지하는 이론들을 설명해주세요.' },
      { id: 10, question: '초기 경험의 중요성은?', prompt: '초기 경험이 발달에 미치는 영향, 애착의 중요성, 초기 개입의 효과, 발달의 가소성에 대해 설명해주세요.' }
    ]
  },
  {
    title: '인지 발달',
    icon: '🧠',
    items: [
      { id: 11, question: '피아제의 인지발달 이론은?', prompt: '피아제(Piaget)의 인지발달 이론 핵심 개념(도식, 동화, 조절, 평형화)과 인지발달 4단계를 자세히 설명해주세요.' },
      { id: 12, question: '전조작기 유아의 사고 특성은?', prompt: '피아제의 전조작기(2-7세) 유아의 사고 특성(상징적 사고, 자기중심성, 물활론, 보존개념 미발달 등)을 예시와 함께 설명해주세요.' },
      { id: 13, question: '비고츠키의 사회문화적 이론은?', prompt: '비고츠키(Vygotsky)의 사회문화적 이론, 근접발달영역(ZPD), 비계설정(Scaffolding), 내면화 개념을 설명해주세요.' },
      { id: 14, question: '피아제와 비고츠키 이론 비교는?', prompt: '피아제와 비고츠키 이론의 공통점과 차이점, 각 이론의 교육적 시사점을 비교 분석해주세요.' },
      { id: 15, question: '정보처리 이론이란?', prompt: '정보처리 이론의 핵심 개념(주의, 기억, 메타인지), 유아의 정보처리 능력 발달, 교육적 적용 방안을 설명해주세요.' },
      { id: 16, question: '유아의 기억 발달은?', prompt: '유아의 기억 발달(단기기억, 작업기억, 장기기억), 기억 전략의 발달, 기억력 향상을 위한 교육 방법을 설명해주세요.' },
      { id: 17, question: '유아의 주의집중력 발달은?', prompt: '유아의 주의집중력 발달 특성, 선택적 주의, 주의력 결핍의 이해, 주의집중력 향상을 위한 지도 방법을 설명해주세요.' },
      { id: 18, question: '마음이론(Theory of Mind)이란?', prompt: '마음이론의 개념, 틀린믿음과제, 유아기 마음이론의 발달, 마음이론과 사회성 발달의 관계를 설명해주세요.' },
      { id: 19, question: '실행기능이란 무엇인가?', prompt: '실행기능(Executive Function)의 개념과 구성요소(억제, 작업기억, 인지적 유연성), 유아기 실행기능 발달과 지원 방안을 설명해주세요.' },
      { id: 20, question: '유아의 수 개념 발달은?', prompt: '유아의 수 개념 발달 단계, 수세기, 수량 비교, 연산 능력의 발달, 수 개념 발달을 촉진하는 활동을 설명해주세요.' }
    ]
  },
  {
    title: '언어 발달',
    icon: '💬',
    items: [
      { id: 21, question: '언어발달 이론에는 무엇이 있는가?', prompt: '언어발달에 대한 다양한 이론(행동주의, 생득주의, 상호작용주의)과 각 이론의 핵심 개념을 비교 설명해주세요.' },
      { id: 22, question: '촘스키의 언어획득장치란?', prompt: '촘스키(Chomsky)의 생득주의 언어이론, 언어획득장치(LAD), 보편문법, 결정적 시기 가설에 대해 설명해주세요.' },
      { id: 23, question: '영아기 언어 발달 과정은?', prompt: '영아기 언어 발달 과정(옹알이, 일어문, 이어문, 전보문 등), 첫 단어 출현, 어휘폭발 현상에 대해 설명해주세요.' },
      { id: 24, question: '유아기 언어 발달 특성은?', prompt: '유아기(3-5세) 언어 발달 특성, 어휘 확장, 문법 발달, 화용론적 발달, 의사소통 능력 발달을 설명해주세요.' },
      { id: 25, question: '유아의 음운 인식 발달은?', prompt: '음운 인식(Phonological Awareness)의 개념, 음운 인식 발달 단계, 읽기 발달과의 관계, 음운 인식 촉진 활동을 설명해주세요.' },
      { id: 26, question: '유아의 문해력 발달은?', prompt: '유아기 문해력(Literacy) 발달, 발현적 문해(Emergent Literacy), 읽기와 쓰기 발달, 문해력 촉진 환경 조성을 설명해주세요.' },
      { id: 27, question: '이중언어 발달의 특성은?', prompt: '이중언어 아동의 언어 발달 특성, 이중언어 발달의 장점과 도전, 효과적인 이중언어 교육 방안을 설명해주세요.' },
      { id: 28, question: '언어 발달 지체의 이해는?', prompt: '언어 발달 지체의 유형과 원인, 조기 발견의 중요성, 언어 발달 지체 유아를 위한 지원 방안을 설명해주세요.' },
      { id: 29, question: '그림책과 언어 발달의 관계는?', prompt: '그림책 읽어주기가 유아의 언어 발달에 미치는 영향, 효과적인 그림책 읽기 상호작용, 책 선정 기준을 설명해주세요.' },
      { id: 30, question: '유아의 내러티브 능력 발달은?', prompt: '유아의 내러티브(이야기) 능력 발달, 이야기 구조 이해, 이야기 만들기 능력 발달, 내러티브 능력 촉진 방안을 설명해주세요.' }
    ]
  },
  {
    title: '사회정서 발달',
    icon: '❤️',
    items: [
      { id: 31, question: '애착이론이란 무엇인가?', prompt: '볼비(Bowlby)의 애착이론, 애착의 유형(안정/불안정-회피/불안정-저항/혼란), 애착이 발달에 미치는 영향을 설명해주세요.' },
      { id: 32, question: '기질이란 무엇인가?', prompt: '기질의 개념과 유형(순한 기질, 까다로운 기질, 느린 기질), 기질과 환경의 적합성(Goodness of Fit), 기질에 맞는 양육법을 설명해주세요.' },
      { id: 33, question: '유아의 자아개념 발달은?', prompt: '유아기 자아개념(Self-concept)과 자아존중감(Self-esteem)의 발달, 긍정적 자아개념 형성을 위한 지원 방안을 설명해주세요.' },
      { id: 34, question: '유아의 정서 발달은?', prompt: '유아의 정서 발달 과정, 기본 정서와 복합 정서의 발달, 정서 이해 및 표현 능력, 정서조절 능력 발달을 설명해주세요.' },
      { id: 35, question: '유아의 정서지능이란?', prompt: '정서지능(EQ)의 개념, 정서지능의 구성요소, 유아의 정서지능 발달, 정서지능 향상을 위한 교육 방안을 설명해주세요.' },
      { id: 36, question: '유아의 또래관계 발달은?', prompt: '유아기 또래관계의 발달, 놀이를 통한 또래 상호작용, 우정의 발달, 또래관계가 발달에 미치는 영향을 설명해주세요.' },
      { id: 37, question: '유아의 사회적 능력이란?', prompt: '유아의 사회적 능력(Social Competence)의 개념과 구성요소, 사회적 기술의 발달, 사회적 능력 향상 지도 방법을 설명해주세요.' },
      { id: 38, question: '유아의 친사회적 행동 발달은?', prompt: '친사회적 행동(돕기, 나누기, 위로하기)의 발달, 공감능력의 발달, 친사회적 행동 촉진을 위한 교육 방안을 설명해주세요.' },
      { id: 39, question: '유아의 공격성과 갈등해결은?', prompt: '유아의 공격성 유형과 원인, 공격적 행동 감소를 위한 지도법, 갈등해결 능력 발달과 지도 방안을 설명해주세요.' },
      { id: 40, question: '유아의 도덕성 발달은?', prompt: '피아제와 콜버그의 도덕성 발달 이론, 유아기 도덕성 발달 특성, 도덕성 발달을 촉진하는 교육 방안을 설명해주세요.' }
    ]
  },
  {
    title: '신체 및 운동 발달',
    icon: '🏃',
    items: [
      { id: 41, question: '유아의 신체 발달 특성은?', prompt: '유아기 신체 발달의 특성(신장, 체중, 신체 비율의 변화), 성장 곡선, 발달의 개인차, 건강한 성장을 위한 조건을 설명해주세요.' },
      { id: 42, question: '유아의 뇌 발달은?', prompt: '유아기 뇌 발달의 특성(시냅스 형성, 수초화, 가지치기), 뇌 발달에 영향을 미치는 요인, 뇌 발달을 촉진하는 경험을 설명해주세요.' },
      { id: 43, question: '유아의 대근육 운동 발달은?', prompt: '유아의 대근육(Gross Motor) 운동 발달 과정, 기본 동작 기술(걷기, 뛰기, 던지기 등), 대근육 운동 능력 향상 활동을 설명해주세요.' },
      { id: 44, question: '유아의 소근육 운동 발달은?', prompt: '유아의 소근육(Fine Motor) 운동 발달 과정, 눈-손 협응, 도구 사용 능력, 소근육 운동 능력 향상 활동을 설명해주세요.' },
      { id: 45, question: '유아의 지각 발달은?', prompt: '유아의 지각 발달(시지각, 청지각, 촉지각), 지각-운동 협응의 발달, 지각 능력 향상을 위한 활동을 설명해주세요.' },
      { id: 46, question: '유아의 건강과 영양은?', prompt: '유아기 건강 관리(예방접종, 건강검진), 균형 잡힌 영양 섭취, 올바른 식습관 형성, 비만 예방에 대해 설명해주세요.' },
      { id: 47, question: '유아의 수면과 발달의 관계는?', prompt: '유아기 수면의 중요성, 적정 수면 시간, 수면과 발달의 관계, 건강한 수면 습관 형성 방안을 설명해주세요.' },
      { id: 48, question: '유아의 안전사고 예방은?', prompt: '유아기 흔한 안전사고 유형, 발달 특성에 따른 안전사고 위험, 안전교육의 내용과 방법에 대해 설명해주세요.' },
      { id: 49, question: '발달장애의 조기 발견은?', prompt: '발달장애의 조기 징후, 발달선별검사의 종류와 실시 방법, 조기 개입의 중요성과 지원 체계를 설명해주세요.' },
      { id: 50, question: '통합적 발달 지원이란?', prompt: '유아 발달의 통합성(신체, 인지, 언어, 사회정서 영역의 상호 연관성), 통합적 발달 지원의 원리와 실천 방안을 설명해주세요.' }
    ]
  }
];

export default function ChildDevelopmentPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-child-development-progress');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kindergarten-child-development-progress', JSON.stringify(completedItems));
  }, [completedItems]);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleComplete = (id: number) => {
    setCompletedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAIHelp = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const totalItems = topics.reduce((acc, topic) => acc + topic.items.length, 0);
  const progressPercentage = (completedItems.length / totalItems) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/category/education/kindergarten-teacher" className="hover:text-green-600 transition">
              유치원정교사
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">아동발달</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">🌱 아동발달 학습</h1>
          <p className="text-gray-600 mt-1">인지, 언어, 사회정서, 신체 발달 50문제</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">학습 진도</h2>
              <p className="text-gray-600">{completedItems.length} / {totalItems} 완료</p>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {completedItems.length > 0 && (
            <button
              onClick={() => setCompletedItems([])}
              className="mt-4 text-sm text-red-500 hover:text-red-700 transition"
            >
              진도 초기화
            </button>
          )}
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicCompleted = topic.items.filter(item =>
              completedItems.includes(item.id)
            ).length;

            return (
              <div key={topicIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${(topicCompleted / topic.items.length) * 100}%` }}
                      />
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="border-t divide-y">
                    {topic.items.map((item) => (
                      <div
                        key={item.id}
                        className={`px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition ${
                          completedItems.includes(item.id) ? 'bg-green-50' : ''
                        }`}
                      >
                        <button
                          onClick={() => toggleComplete(item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            completedItems.includes(item.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {completedItems.includes(item.id) && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedItems.includes(item.id) ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {item.id}. {item.question}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAIHelp(item.prompt)}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition shadow-md"
                        >
                          🤖 AI 도움
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/category/education/kindergarten-teacher/study/early-childhood-education"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-md"
          >
            ← 유아교육개론
          </Link>
          <Link
            href="/category/education/kindergarten-teacher/study/curriculum"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-600 transition shadow-md"
          >
            유치원 교육과정 →
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">🤖 AI 학습 도우미</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6 text-sm bg-gray-50 p-4 rounded-xl">
                {currentPrompt.slice(0, 100)}...
              </p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-3xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-sm text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-3xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-sm text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-3xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-sm text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
