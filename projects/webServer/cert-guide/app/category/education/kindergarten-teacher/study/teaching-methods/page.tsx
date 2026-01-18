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
    title: '놀이 지도',
    icon: '🎮',
    items: [
      { id: 1, question: '놀이의 교육적 가치는?', prompt: '유아 놀이의 교육적 가치, 놀이를 통한 학습(신체, 인지, 사회, 정서 발달), 놀이중심 교육과정의 의미를 설명해주세요.' },
      { id: 2, question: '놀이 발달 단계는?', prompt: '파튼(Parten)의 사회적 놀이 발달 단계(방관자적, 혼자, 병행, 연합, 협동놀이), 스밀란스키의 인지적 놀이 발달 단계를 설명해주세요.' },
      { id: 3, question: '자유놀이 운영 방법은?', prompt: '자유선택활동(자유놀이)의 교육적 의미, 효과적인 운영 방법, 교사의 역할과 개입 수준, 시간 배분을 설명해주세요.' },
      { id: 4, question: '역할놀이 지도 방법은?', prompt: '역할놀이(가상놀이)의 교육적 가치, 역할놀이 영역 구성, 교사의 지원 방법, 역할놀이 확장 전략을 설명해주세요.' },
      { id: 5, question: '구성놀이 지도 방법은?', prompt: '구성놀이(쌓기놀이)의 특성과 발달 단계, 블록 놀이 지도 방법, 구성놀이 영역 운영, 교사의 역할을 설명해주세요.' },
      { id: 6, question: '규칙 있는 게임 지도는?', prompt: '규칙 있는 게임의 교육적 가치, 연령에 적합한 게임 선정, 게임 규칙 지도 방법, 협동게임 활용을 설명해주세요.' },
      { id: 7, question: '바깥놀이 지도 방법은?', prompt: '바깥놀이(실외놀이)의 중요성, 다양한 바깥놀이 유형, 자연물을 활용한 놀이, 안전 지도 방안을 설명해주세요.' },
      { id: 8, question: '모래·물놀이 지도는?', prompt: '모래놀이와 물놀이의 교육적 가치, 영역 구성과 자료 제공, 탐구 활동 연계, 위생과 안전 관리를 설명해주세요.' },
      { id: 9, question: '놀이 관찰과 지원은?', prompt: '유아 놀이 관찰의 방법과 초점, 놀이 흐름 읽기, 놀이 지원과 확장의 전략, 기록과 반성 방법을 설명해주세요.' },
      { id: 10, question: '교사의 놀이 개입 수준은?', prompt: '놀이에서 교사의 개입 수준(방관자, 무대관리자, 공동놀이자, 놀이지도자), 적절한 개입 시점과 방법을 설명해주세요.' }
    ]
  },
  {
    title: '상호작용과 발문',
    icon: '💬',
    items: [
      { id: 11, question: '교사-유아 상호작용의 원리는?', prompt: '효과적인 교사-유아 상호작용의 원리(존중, 반응성, 민감성), 긍정적 상호작용의 중요성, 상호작용 질 향상 방안을 설명해주세요.' },
      { id: 12, question: '비계설정(Scaffolding)이란?', prompt: '비계설정(Scaffolding)의 개념과 원리, 근접발달영역(ZPD)과의 관계, 효과적인 비계설정 전략과 실제 사례를 설명해주세요.' },
      { id: 13, question: '효과적인 발문 기법은?', prompt: '유아교육에서 효과적인 발문 기법, 개방형 질문과 폐쇄형 질문, 사고를 촉진하는 발문, 대기 시간 활용을 설명해주세요.' },
      { id: 14, question: '확장적 대화란?', prompt: '확장적 대화(Sustained Shared Thinking)의 개념, 대화를 통한 사고 확장, 유아의 아이디어 발전 지원 방법을 설명해주세요.' },
      { id: 15, question: '경청과 반응 기술은?', prompt: '유아의 말에 경청하고 반응하는 기술, 적극적 경청, 반영적 언어 사용, 비언어적 의사소통 활용을 설명해주세요.' },
      { id: 16, question: '소집단 상호작용 촉진은?', prompt: '소집단 활동에서의 상호작용 촉진 방법, 또래 간 상호작용 지원, 협력적 대화 유도 전략을 설명해주세요.' },
      { id: 17, question: '갈등 상황 중재 방법은?', prompt: '유아 간 갈등 상황에서의 교사 중재 방법, 갈등 해결 지도, 문제해결력 향상을 위한 지원 전략을 설명해주세요.' },
      { id: 18, question: '피드백 제공 방법은?', prompt: '유아에게 효과적인 피드백 제공 방법, 구체적 칭찬, 과정 중심 격려, 성장 마인드셋 촉진 전략을 설명해주세요.' },
      { id: 19, question: '침묵과 기다림의 가치는?', prompt: '교사의 침묵과 기다림이 유아 사고에 미치는 영향, 대기 시간(Wait Time)의 중요성, 유아 주도성 존중 방안을 설명해주세요.' },
      { id: 20, question: '다양한 유아와의 상호작용은?', prompt: '다양한 특성의 유아(소극적, 적극적, 특수교육 대상 유아 등)와의 개별화된 상호작용 전략을 설명해주세요.' }
    ]
  },
  {
    title: '교수학습 방법',
    icon: '📖',
    items: [
      { id: 21, question: '이야기나누기 지도법은?', prompt: '대집단 이야기나누기의 목적과 운영 방법, 주제 선정, 질문 기법, 유아 참여 유도 전략을 설명해주세요.' },
      { id: 22, question: '동화·동시 활동 지도는?', prompt: '동화 들려주기와 동시 활동의 교육적 가치, 효과적인 동화 구연 기법, 동화 활동의 확장 방법을 설명해주세요.' },
      { id: 23, question: '음악활동 지도법은?', prompt: '유아 음악활동(노래, 악기 연주, 음악 감상)의 지도 방법, 음악적 개념 지도, 창의적 음악 표현 활동을 설명해주세요.' },
      { id: 24, question: '동작활동 지도법은?', prompt: '유아 동작활동(기본동작, 창의적 동작, 전통놀이)의 지도 방법, 동작 요소 지도, 동작 활동 계획과 운영을 설명해주세요.' },
      { id: 25, question: '미술활동 지도법은?', prompt: '유아 미술활동(그리기, 만들기, 꾸미기)의 지도 방법, 미술 발달 단계, 창의적 표현 지원, 작품 감상 지도를 설명해주세요.' },
      { id: 26, question: '과학활동 지도법은?', prompt: '유아 과학활동(관찰, 실험, 탐구)의 지도 방법, 탐구 과정 기술 지도, 과학적 개념 형성 지원 전략을 설명해주세요.' },
      { id: 27, question: '수학활동 지도법은?', prompt: '유아 수학활동(수, 연산, 공간, 측정, 패턴)의 지도 방법, 구체물 활용, 일상에서의 수학적 경험 제공을 설명해주세요.' },
      { id: 28, question: '요리활동 지도법은?', prompt: '유아 요리활동의 교육적 가치, 요리활동 계획과 운영, 안전 지도, 교육과정과의 통합 방안을 설명해주세요.' },
      { id: 29, question: '현장학습 운영 방법은?', prompt: '현장학습(견학)의 교육적 가치, 현장학습 계획(사전-본-사후 활동), 안전 관리, 학습 효과 극대화 방안을 설명해주세요.' },
      { id: 30, question: '통합적 활동 계획은?', prompt: '누리과정 5개 영역을 통합한 활동 계획 방법, 주제 중심 통합, 놀이 중심 통합, 통합 활동 사례를 설명해주세요.' }
    ]
  },
  {
    title: '특별한 요구 지원',
    icon: '🤝',
    items: [
      { id: 31, question: '장애 유아 통합교육이란?', prompt: '장애 유아 통합교육의 의미와 법적 근거, 통합교육의 효과, 성공적인 통합교육 실천 조건을 설명해주세요.' },
      { id: 32, question: '개별화교육계획(IEP)이란?', prompt: '개별화교육계획(IEP)의 개념과 법적 근거, IEP 작성 요소, 작성 절차, 실행과 평가 방법을 설명해주세요.' },
      { id: 33, question: '발달지체 유아 지도법은?', prompt: '발달지체 유아의 특성 이해, 교육적 지원 방법, 교수 수정(교수적합화), 또래와의 상호작용 촉진 전략을 설명해주세요.' },
      { id: 34, question: '자폐스펙트럼장애 유아 지도는?', prompt: '자폐스펙트럼장애 유아의 특성, 의사소통과 사회성 지도, 환경 구조화, 시각적 지원 전략을 설명해주세요.' },
      { id: 35, question: '주의력결핍 과잉행동 유아 지도는?', prompt: 'ADHD 특성을 보이는 유아의 이해, 주의집중력 향상 전략, 행동 지도, 교실 환경 조정 방안을 설명해주세요.' },
      { id: 36, question: '영재 유아 교육은?', prompt: '영재 유아의 특성과 교육적 요구, 영재 유아를 위한 교육과정 수정, 심화·확장 학습 지원 방안을 설명해주세요.' },
      { id: 37, question: '다문화 가정 유아 지도는?', prompt: '다문화 가정 유아의 특성과 교육적 요구, 언어·문화적 지원, 다문화 교육 활동, 편견 없는 교육 환경 조성을 설명해주세요.' },
      { id: 38, question: '정서·행동 문제 유아 지도는?', prompt: '정서·행동 문제를 보이는 유아(공격성, 불안, 위축)의 이해와 지도 방법, 긍정적 행동지원(PBS) 적용을 설명해주세요.' },
      { id: 39, question: '긍정적 행동지원(PBS)이란?', prompt: '긍정적 행동지원(PBS)의 개념과 원리, 1차/2차/3차 예방, 기능적 행동평가, PBS 실행 절차를 설명해주세요.' },
      { id: 40, question: '보조인력 활용 방법은?', prompt: '특수교육 보조인력(보조교사, 특수교육 실무사)의 역할, 효과적인 협력 방안, 보조인력 활용 시 유의점을 설명해주세요.' }
    ]
  },
  {
    title: '디지털 및 미래 교육',
    icon: '💻',
    items: [
      { id: 41, question: '유아 디지털 리터러시 교육은?', prompt: '유아 디지털 리터러시의 개념, 연령에 적합한 디지털 교육, 비판적 미디어 활용 능력 함양 방안을 설명해주세요.' },
      { id: 42, question: '디지털 기기 활용 지침은?', prompt: '유아교육에서 디지털 기기(태블릿, 스마트TV) 활용 지침, 적절한 사용 시간, 교육적 활용 방안을 설명해주세요.' },
      { id: 43, question: '교육용 앱과 콘텐츠 선정은?', prompt: '유아 교육용 앱과 디지털 콘텐츠 선정 기준, 발달에 적합한 콘텐츠 평가, 교육과정 연계 활용 방안을 설명해주세요.' },
      { id: 44, question: 'AI 시대 유아교육의 방향은?', prompt: 'AI 시대 유아교육의 변화와 방향, 창의성·비판적 사고·사회정서 역량 교육, 인간중심 교육의 중요성을 설명해주세요.' },
      { id: 45, question: '코딩·컴퓨팅 사고력 교육은?', prompt: '유아를 위한 코딩 교육과 컴퓨팅 사고력(CT) 교육, 언플러그드 활동, 코딩 교구 활용 방법을 설명해주세요.' },
      { id: 46, question: '메이커 교육이란?', prompt: '유아 메이커 교육의 개념과 가치, 만들기와 창작 활동, 메이커 스페이스 구성, 메이커 활동 사례를 설명해주세요.' },
      { id: 47, question: 'STEAM 교육의 적용은?', prompt: '유아 STEAM 교육의 개념, 통합적 접근의 가치, 유아 발달에 적합한 STEAM 활동 사례와 지도 방법을 설명해주세요.' },
      { id: 48, question: '미래역량 교육이란?', prompt: '미래사회에 필요한 역량(4C: 창의성, 비판적 사고, 의사소통, 협력)을 유아교육에서 기르는 방법을 설명해주세요.' },
      { id: 49, question: '지속가능발전교육(ESD)은?', prompt: '지속가능발전교육(ESD)의 개념, 유아교육에서의 ESD 실천(환경, 사회, 경제 통합), 생태시민교육 방안을 설명해주세요.' },
      { id: 50, question: '원격·블렌디드 수업 운영은?', prompt: '원격수업과 블렌디드 러닝의 개념, 유아 대상 원격수업 운영 방법, 가정연계 활동, 효과적인 운영 전략을 설명해주세요.' }
    ]
  }
];

export default function TeachingMethodsPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-teaching-methods-progress');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kindergarten-teaching-methods-progress', JSON.stringify(completedItems));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/category/education/kindergarten-teacher" className="hover:text-orange-600 transition">
              유치원정교사
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">교수학습방법</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">🎯 교수학습방법 학습</h1>
          <p className="text-gray-600 mt-1">놀이중심, 활동중심 교수법 50문제</p>
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
            <div className="text-3xl font-bold text-orange-600">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500"
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
                        className="bg-orange-500 h-2 rounded-full transition-all"
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
                              : 'border-gray-300 hover:border-orange-500'
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
                          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-amber-600 transition shadow-md"
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
            href="/category/education/kindergarten-teacher/study/curriculum"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-md"
          >
            ← 유치원 교육과정
          </Link>
          <Link
            href="/category/education/kindergarten-teacher/study/interview"
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 transition shadow-md"
          >
            면접 →
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
