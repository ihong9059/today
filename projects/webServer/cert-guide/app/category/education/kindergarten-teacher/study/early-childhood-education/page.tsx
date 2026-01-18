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
    title: '유아교육의 역사와 사상',
    icon: '📜',
    items: [
      { id: 1, question: '코메니우스의 유아교육 사상은?', prompt: '코메니우스(Comenius)의 유아교육 사상, 감각교육의 중요성, 세계도회(Orbis Pictus), 대교수학에 대해 자세히 설명해주세요.' },
      { id: 2, question: '루소의 자연주의 교육관은?', prompt: '루소(Rousseau)의 자연주의 교육철학, 에밀(Emile), 아동중심교육, 소극적 교육의 의미와 현대 유아교육에 미친 영향을 설명해주세요.' },
      { id: 3, question: '페스탈로치의 교육이론은?', prompt: '페스탈로치(Pestalozzi)의 교육사상, 가정교육의 중요성, 직관교육, 머리-가슴-손의 조화로운 발달에 대해 설명해주세요.' },
      { id: 4, question: '프뢰벨의 유치원 교육은?', prompt: '프뢰벨(Froebel)의 유치원(Kindergarten) 창시, 은물(Gifts), 작업(Occupations), 놀이의 교육적 가치에 대해 자세히 설명해주세요.' },
      { id: 5, question: '몬테소리 교육법의 특징은?', prompt: '몬테소리(Montessori) 교육법의 핵심 원리, 민감기, 준비된 환경, 교구 활용법, 자동교육에 대해 설명해주세요.' },
      { id: 6, question: '듀이의 진보주의 교육은?', prompt: '듀이(Dewey)의 진보주의 교육철학, 경험중심 교육, 아동중심교육, 학교와 사회의 관계에 대해 설명해주세요.' },
      { id: 7, question: '우리나라 유아교육의 역사는?', prompt: '한국 유아교육의 역사적 발전 과정, 최초의 유치원 설립, 해방 이후 유아교육 발전, 유아교육법 제정 등을 설명해주세요.' },
      { id: 8, question: '방정환의 아동관은?', prompt: '방정환 선생의 아동관, 어린이 운동, 어린이날 제정, 한국 아동문학과 유아교육에 미친 영향을 설명해주세요.' },
      { id: 9, question: '현대 유아교육의 동향은?', prompt: '현대 유아교육의 최신 동향, 놀이중심 교육, 유아 중심 교육, 생태유아교육, 다문화교육 등 새로운 접근법을 설명해주세요.' },
      { id: 10, question: '유아교육 패러다임 변화는?', prompt: '유아교육 패러다임의 변화, 교사 중심에서 유아 중심으로, 지식 전달에서 경험 중심으로의 변화와 그 의미를 설명해주세요.' }
    ]
  },
  {
    title: '유아교육 프로그램',
    icon: '📚',
    items: [
      { id: 11, question: '레지오 에밀리아 접근법은?', prompt: '레지오 에밀리아(Reggio Emilia) 접근법의 핵심 원리, 프로젝트 접근, 기록화(Documentation), 아뜰리에, 교사의 역할을 설명해주세요.' },
      { id: 12, question: '하이스코프 프로그램은?', prompt: '하이스코프(High/Scope) 프로그램의 특징, 능동적 학습, 계획-실행-평가(Plan-Do-Review), 핵심경험, 일과운영을 설명해주세요.' },
      { id: 13, question: '발도르프 교육은?', prompt: '발도르프(Waldorf) 교육의 철학, 슈타이너의 인지학, 기질교육, 리듬 있는 생활, 자연재료 활용에 대해 설명해주세요.' },
      { id: 14, question: '프로젝트 접근법은?', prompt: '프로젝트 접근법(Project Approach)의 특징, 캐츠와 차드의 이론, 프로젝트 진행 단계(도입-전개-마무리), 교사와 유아의 역할을 설명해주세요.' },
      { id: 15, question: '뱅크 스트리트 프로그램은?', prompt: '뱅크 스트리트(Bank Street) 프로그램의 발달-상호작용 접근, 통합교육과정, 환경구성, 교사의 역할에 대해 설명해주세요.' },
      { id: 16, question: '생태유아교육 프로그램은?', prompt: '생태유아교육의 철학과 원리, 자연친화교육, 산책과 텃밭 활동, 전통문화 교육, 실천 방안에 대해 설명해주세요.' },
      { id: 17, question: '숲유치원 교육은?', prompt: '숲유치원(Forest Kindergarten)의 개념과 특징, 자연에서의 학습, 위험감수(risky play), 숲체험 활동의 교육적 가치를 설명해주세요.' },
      { id: 18, question: '다중지능 이론의 적용은?', prompt: '가드너의 다중지능 이론을 유아교육에 적용하는 방법, 8가지 지능 영역, 프로젝트 스펙트럼, 강점 기반 교육을 설명해주세요.' },
      { id: 19, question: '표준보육과정과 누리과정의 차이는?', prompt: '표준보육과정과 누리과정의 특징과 차이점, 영유아 발달 특성에 따른 구성, 연계성 확보 방안을 설명해주세요.' },
      { id: 20, question: '유아교육 프로그램 선택 기준은?', prompt: '다양한 유아교육 프로그램의 비교 분석, 프로그램 선택 시 고려해야 할 요소, 기관 특성에 맞는 프로그램 적용 방법을 설명해주세요.' }
    ]
  },
  {
    title: '유아교육기관 운영',
    icon: '🏫',
    items: [
      { id: 21, question: '유치원과 어린이집의 차이는?', prompt: '유치원과 어린이집의 법적 근거, 관할 부처, 교사 자격, 교육과정, 운영 방식의 차이점과 유보통합 방향을 설명해주세요.' },
      { id: 22, question: '유아교육기관의 조직 구조는?', prompt: '유치원의 조직 구조와 행정 체계, 원장-원감-교사의 역할과 책임, 업무 분장, 의사결정 구조를 설명해주세요.' },
      { id: 23, question: '학급 운영의 원리는?', prompt: '유치원 학급 운영의 기본 원리, 학급 편성 기준, 담임교사의 역할, 보조인력 활용, 일과 운영을 설명해주세요.' },
      { id: 24, question: '유아교육기관 평가제란?', prompt: '유치원 평가와 어린이집 평가제의 개요, 평가 지표와 영역, 평가 절차, 평가 결과 활용 방안을 설명해주세요.' },
      { id: 25, question: '유치원 재정 운영은?', prompt: '유치원 재정 운영의 원리, 예산 편성과 집행, 회계 관리, 재정 관련 법규, 투명한 운영 방안을 설명해주세요.' },
      { id: 26, question: '장학의 개념과 유형은?', prompt: '유치원 장학의 개념과 목적, 장학의 유형(컨설팅 장학, 동료장학, 자기장학), 장학 방법과 절차를 설명해주세요.' },
      { id: 27, question: '교직원 인사관리는?', prompt: '유치원 교직원 채용, 연수, 평가, 승진 등 인사관리 체계, 교원 전문성 개발 지원 방안을 설명해주세요.' },
      { id: 28, question: '유아교육기관의 시설 기준은?', prompt: '유치원 시설·설비 기준, 교실 면적, 놀이터 기준, 급식 시설, 안전 시설 관련 법적 기준을 설명해주세요.' },
      { id: 29, question: '유아 건강·안전 관리는?', prompt: '유아교육기관의 건강관리(건강검진, 감염병 예방), 안전관리(시설안전, 재난대응), 급식위생 관리에 대해 설명해주세요.' },
      { id: 30, question: '유아교육 관련 법규는?', prompt: '유아교육법, 영유아보육법, 학교안전법 등 유아교육 관련 주요 법규의 내용과 교사가 알아야 할 사항을 설명해주세요.' }
    ]
  },
  {
    title: '부모교육과 가정연계',
    icon: '👨‍👩‍👧',
    items: [
      { id: 31, question: '부모교육의 개념과 필요성은?', prompt: '부모교육의 개념, 목적, 필요성, 부모교육의 역사적 발전, 현대 부모교육의 동향에 대해 설명해주세요.' },
      { id: 32, question: '부모교육 이론에는 무엇이 있는가?', prompt: '드라이커스, 기노트, 고든의 부모교육 이론, 각 이론의 핵심 원리와 실천 방법을 비교 설명해주세요.' },
      { id: 33, question: '부모교육 프로그램 유형은?', prompt: '다양한 부모교육 프로그램(STEP, PET, 적극적 부모역할훈련 등)의 특징, 진행 방법, 효과를 설명해주세요.' },
      { id: 34, question: '부모참여 활동의 유형은?', prompt: '유아교육기관의 부모참여 활동 유형(일일교사, 현장학습 도우미, 재능기부 등), 효과적인 운영 방안을 설명해주세요.' },
      { id: 35, question: '가정연계 교육 방법은?', prompt: '가정과 유아교육기관의 연계 교육 방법, 가정통신문, 알림장, 포트폴리오 공유, 온라인 소통 방안을 설명해주세요.' },
      { id: 36, question: '부모상담 방법과 기술은?', prompt: '부모상담의 유형(개별상담, 집단상담), 효과적인 상담 기법, 의사소통 기술, 어려운 부모 대응법을 설명해주세요.' },
      { id: 37, question: '맞벌이 가정 지원 방안은?', prompt: '맞벌이 가정 유아를 위한 교육적 지원, 돌봄교실 운영, 부모-자녀 상호작용 지원 방안을 설명해주세요.' },
      { id: 38, question: '한부모 가정 유아 지원은?', prompt: '한부모 가정 유아의 특성과 교육적 요구, 교사의 역할, 가정-기관 연계 지원 방안을 설명해주세요.' },
      { id: 39, question: '다문화 가정 부모교육은?', prompt: '다문화 가정 부모교육의 필요성, 언어·문화적 장벽 극복 방안, 다문화 가정 유아 지원 프로그램을 설명해주세요.' },
      { id: 40, question: '조부모 양육 가정 지원은?', prompt: '조손가정, 조부모 양육 가정의 특성과 요구, 세대 간 양육관 차이 이해, 교육적 지원 방안을 설명해주세요.' }
    ]
  },
  {
    title: '유아교사론',
    icon: '👩‍🏫',
    items: [
      { id: 41, question: '유아교사의 역할과 자질은?', prompt: '유아교사의 다양한 역할(양육자, 교수자, 관찰자, 환경구성자 등), 필요한 자질과 역량에 대해 설명해주세요.' },
      { id: 42, question: '유아교사의 전문성 발달 단계는?', prompt: 'Katz의 유아교사 발달 단계(생존-강화-갱신-성숙), 각 단계별 특성과 지원 방안을 설명해주세요.' },
      { id: 43, question: '반성적 교사란 무엇인가?', prompt: '반성적 사고와 반성적 교사의 개념, 반성적 실천의 중요성, 반성적 저널 쓰기, 수업 성찰 방법을 설명해주세요.' },
      { id: 44, question: '교사의 교육신념이란?', prompt: '유아교사의 교육신념(교육관, 아동관)이 교육실천에 미치는 영향, 신념 형성과 변화 요인을 설명해주세요.' },
      { id: 45, question: '교사의 직무스트레스 관리는?', prompt: '유아교사의 직무스트레스 원인, 소진(Burnout) 예방, 스트레스 관리 전략, 조직 차원의 지원 방안을 설명해주세요.' },
      { id: 46, question: '교사의 자아효능감이란?', prompt: '교사효능감의 개념, 교수효능감이 교육 실천에 미치는 영향, 교사효능감 향상 방안을 설명해주세요.' },
      { id: 47, question: '교사의 전문성 개발 방법은?', prompt: '유아교사의 전문성 개발 방법(현직연수, 학습공동체, 멘토링, 자기연수), 효과적인 전문성 개발 지원 방안을 설명해주세요.' },
      { id: 48, question: '교사 간 협력과 멘토링은?', prompt: '동료교사 간 협력, 수석교사 제도, 신규교사 멘토링, 협력적 교사 문화 형성 방안을 설명해주세요.' },
      { id: 49, question: '교사의 윤리강령은?', prompt: '유아교사의 전문직 윤리, 윤리강령의 내용(유아에 대한 윤리, 가정에 대한 윤리, 동료에 대한 윤리)을 설명해주세요.' },
      { id: 50, question: '미래 유아교사의 역할은?', prompt: 'AI 시대, 미래사회에서 유아교사의 역할 변화, 디지털 역량, 창의적 교수 역량, 지속적 학습 능력의 중요성을 설명해주세요.' }
    ]
  }
];

export default function EarlyChildhoodEducationPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-early-childhood-education-progress');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kindergarten-early-childhood-education-progress', JSON.stringify(completedItems));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/category/education/kindergarten-teacher" className="hover:text-pink-600 transition">
              유치원정교사
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">유아교육개론</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">📚 유아교육개론 학습</h1>
          <p className="text-gray-600 mt-1">유아교육의 역사, 철학, 이론적 기초 50문제</p>
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
            <div className="text-3xl font-bold text-pink-600">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
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
                        className="bg-pink-500 h-2 rounded-full transition-all"
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
                              : 'border-gray-300 hover:border-pink-500'
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
                          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-purple-600 transition shadow-md"
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
            href="/category/education/kindergarten-teacher"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-md"
          >
            ← 메인으로
          </Link>
          <Link
            href="/category/education/kindergarten-teacher/study/child-development"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-xl hover:from-pink-600 hover:to-purple-600 transition shadow-md"
          >
            아동발달 →
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
