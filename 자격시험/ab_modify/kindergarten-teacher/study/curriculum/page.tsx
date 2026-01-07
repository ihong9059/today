'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Topic {
  id: number;
  question: string;
  prompt: string;
}

const topics: { title: string; icon: string; items: Topic[] }[] = [
  {
    title: '누리과정의 이해',
    icon: '📋',
    items: [
      { id: 1, question: '2019 개정 누리과정의 특징은?', prompt: '2019 개정 누리과정의 주요 특징(놀이중심, 유아중심, 현장자율성), 이전 누리과정과의 차이점, 개정 배경을 자세히 설명해주세요.' },
      { id: 2, question: '누리과정의 성격은?', prompt: '누리과정의 성격(국가수준 공통 교육과정, 놀이를 통한 배움 등), 추구하는 인간상, 목적과 목표를 설명해주세요.' },
      { id: 3, question: '누리과정의 구성 방향은?', prompt: '누리과정의 구성 방향(유아중심, 놀이중심, 5개 영역의 통합적 운영)과 편성·운영 원칙을 설명해주세요.' },
      { id: 4, question: '놀이중심 교육과정이란?', prompt: '놀이중심 교육과정의 의미, 놀이의 교육적 가치, 놀이를 통한 배움의 특성, 교사의 역할 변화에 대해 설명해주세요.' },
      { id: 5, question: '유아중심 교육과정이란?', prompt: '유아중심 교육과정의 의미, 유아의 흥미와 관심 존중, 유아 주도적 학습, 개별화 교육의 원리를 설명해주세요.' },
      { id: 6, question: '누리과정과 표준보육과정의 연계는?', prompt: '누리과정과 0-2세 표준보육과정의 연계성, 연령별 특성에 따른 교육과정 구성, 연속적인 발달 지원 방안을 설명해주세요.' },
      { id: 7, question: '누리과정과 초등교육 연계는?', prompt: '누리과정과 초등학교 교육과정의 연계, 유초연계의 필요성, 연계 프로그램 운영 방안을 설명해주세요.' },
      { id: 8, question: '교육과정 자율성 확대란?', prompt: '2019 개정 누리과정의 현장 자율성 확대, 교사의 교육과정 재구성 권한, 자율적 운영의 의미와 방법을 설명해주세요.' },
      { id: 9, question: '누리과정 운영 시간은?', prompt: '누리과정 운영 시간(1일 4~5시간 기준), 일과 운영의 유연성, 시간 배분의 원리와 실제를 설명해주세요.' },
      { id: 10, question: '혼합연령 학급 운영은?', prompt: '혼합연령(다연령) 학급에서의 누리과정 운영, 혼합연령 학급의 장단점, 효과적인 운영 전략을 설명해주세요.' }
    ]
  },
  {
    title: '누리과정 5개 영역',
    icon: '📚',
    items: [
      { id: 11, question: '신체운동·건강 영역의 내용은?', prompt: '누리과정 신체운동·건강 영역의 목표, 내용 범주(신체활동 즐기기, 건강하게 생활하기, 안전하게 생활하기), 지도 방법을 설명해주세요.' },
      { id: 12, question: '의사소통 영역의 내용은?', prompt: '누리과정 의사소통 영역의 목표, 내용 범주(듣기와 말하기, 읽기와 쓰기에 관심 가지기, 책과 이야기 즐기기), 지도 방법을 설명해주세요.' },
      { id: 13, question: '사회관계 영역의 내용은?', prompt: '누리과정 사회관계 영역의 목표, 내용 범주(나를 알고 존중하기, 더불어 생활하기, 사회에 관심 가지기), 지도 방법을 설명해주세요.' },
      { id: 14, question: '예술경험 영역의 내용은?', prompt: '누리과정 예술경험 영역의 목표, 내용 범주(아름다움 찾아보기, 창의적으로 표현하기, 예술 감상하기), 지도 방법을 설명해주세요.' },
      { id: 15, question: '자연탐구 영역의 내용은?', prompt: '누리과정 자연탐구 영역의 목표, 내용 범주(탐구과정 즐기기, 생활 속에서 탐구하기, 자연과 더불어 살기), 지도 방법을 설명해주세요.' },
      { id: 16, question: '5개 영역의 통합적 운영은?', prompt: '누리과정 5개 영역의 통합적 운영 방법, 영역 간 연계, 통합 활동 계획의 원리와 실제 사례를 설명해주세요.' },
      { id: 17, question: '영역별 내용 이해의 세분화란?', prompt: '누리과정 영역별 내용 이해에서 연령별(만 3, 4, 5세) 발달 특성 고려, 수준별 접근 방법을 설명해주세요.' },
      { id: 18, question: '안전교육의 내용은?', prompt: '누리과정 안전교육의 영역(교통안전, 재난안전, 생활안전, 약물오남용 등), 연간 안전교육 계획, 안전교육 방법을 설명해주세요.' },
      { id: 19, question: '기본생활습관 지도는?', prompt: '누리과정에서의 기본생활습관 지도(식사예절, 청결, 질서 등), 일과를 통한 지도 방법, 가정연계 방안을 설명해주세요.' },
      { id: 20, question: '세계시민교육의 반영은?', prompt: '누리과정에 반영된 세계시민교육(다문화이해, 환경보호, 평화교육 등)의 내용과 실천 방안을 설명해주세요.' }
    ]
  },
  {
    title: '교육과정 편성과 운영',
    icon: '📝',
    items: [
      { id: 21, question: '연간 교육계획의 수립은?', prompt: '유치원 연간 교육계획 수립의 원리, 생활주제 선정, 학기별·월별 계획, 연간 행사 계획 수립 방법을 설명해주세요.' },
      { id: 22, question: '월간·주간 교육계획은?', prompt: '월간·주간 교육계획의 수립 방법, 주제 전개 계획, 활동 계획 시 고려사항, 계획안 작성 형식을 설명해주세요.' },
      { id: 23, question: '일일 교육계획과 일과 운영은?', prompt: '일일 교육계획 수립 방법, 하루 일과 구성(등원-자유선택활동-대소집단활동-바깥놀이-하원), 시간 배분 원리를 설명해주세요.' },
      { id: 24, question: '놀이 흐름에 따른 운영은?', prompt: '유아의 놀이 흐름에 따른 유연한 교육과정 운영, 계획과 실행의 조화, 교사의 관찰과 지원 방법을 설명해주세요.' },
      { id: 25, question: '자유선택활동 운영은?', prompt: '자유선택활동(자유놀이)의 교육적 의미, 흥미영역 구성, 운영 시간과 방법, 교사의 역할을 설명해주세요.' },
      { id: 26, question: '대소집단 활동 운영은?', prompt: '대집단 활동과 소집단 활동의 특징, 효과적인 운영 방법, 활동 유형별 지도 방법을 설명해주세요.' },
      { id: 27, question: '바깥놀이 운영은?', prompt: '바깥놀이(실외놀이)의 교육적 가치, 운영 시간과 방법, 실외 환경 구성, 안전 지도 방안을 설명해주세요.' },
      { id: 28, question: '생활주제 vs 발현적 교육과정은?', prompt: '생활주제 중심 교육과정과 발현적 교육과정의 특징과 차이점, 각 접근법의 장단점, 통합적 활용 방안을 설명해주세요.' },
      { id: 29, question: '교육과정 문서화란?', prompt: '교육과정 문서화의 의미와 목적, 문서화 방법(사진, 동영상, 기록), 포트폴리오 활용, 결과 공유 방안을 설명해주세요.' },
      { id: 30, question: '교육과정 평가는?', prompt: '누리과정 운영 평가의 목적과 방법, 평가 내용(교육과정, 교수학습, 환경 등), 평가 결과 활용 방안을 설명해주세요.' }
    ]
  },
  {
    title: '유아 관찰과 평가',
    icon: '👀',
    items: [
      { id: 31, question: '유아 평가의 목적과 원칙은?', prompt: '누리과정에서 유아 평가의 목적, 평가의 원칙(과정중심, 일상적 맥락, 개별 유아 이해), 평가의 역할 변화를 설명해주세요.' },
      { id: 32, question: '관찰의 방법과 유형은?', prompt: '유아 관찰의 다양한 방법(일화기록, 체크리스트, 평정척도, 표본식 기록 등)과 각 방법의 특징, 활용 방안을 설명해주세요.' },
      { id: 33, question: '일화기록 작성법은?', prompt: '일화기록(Anecdotal Record)의 개념, 작성 방법, 작성 시 유의사항, 일화기록 활용 방법을 설명해주세요.' },
      { id: 34, question: '포트폴리오 평가란?', prompt: '포트폴리오 평가의 개념과 목적, 포트폴리오 구성 내용, 수집과 정리 방법, 활용 방안을 설명해주세요.' },
      { id: 35, question: '놀이 관찰과 기록은?', prompt: '유아 놀이 관찰의 중요성, 놀이 관찰의 초점, 놀이 기록 방법, 관찰을 통한 놀이 지원 방안을 설명해주세요.' },
      { id: 36, question: '유아 평가의 환류는?', prompt: '유아 평가 결과의 환류 방법, 평가를 통한 교육과정 개선, 개별 유아 지원 계획 수립 방안을 설명해주세요.' },
      { id: 37, question: '발달 평가와 선별검사는?', prompt: '유아 발달 평가의 목적, 표준화된 발달검사와 선별검사의 종류, 적절한 활용 방법과 주의점을 설명해주세요.' },
      { id: 38, question: '평가 결과 부모 소통은?', prompt: '유아 평가 결과를 부모와 소통하는 방법, 부모 상담 시 주의사항, 효과적인 피드백 제공 방안을 설명해주세요.' },
      { id: 39, question: '유아 특성 이해 및 기록은?', prompt: '개별 유아의 특성과 발달 수준 이해, 유아 개인 기록부 작성, 기록의 비밀 보장과 윤리적 고려사항을 설명해주세요.' },
      { id: 40, question: '평가의 신뢰도와 타당도는?', prompt: '유아 평가의 신뢰도와 타당도의 개념, 관찰 및 평가의 객관성 확보 방법, 평가의 오류 방지 방안을 설명해주세요.' }
    ]
  },
  {
    title: '환경 구성',
    icon: '🏠',
    items: [
      { id: 41, question: '유치원 환경 구성의 원리는?', prompt: '유치원 물리적 환경 구성의 원리(안전성, 쾌적성, 발달 적합성, 심미성, 융통성), 환경이 유아에게 미치는 영향을 설명해주세요.' },
      { id: 42, question: '실내 흥미영역 구성은?', prompt: '실내 흥미영역(쌓기, 역할, 언어, 수·조작, 과학, 음률, 미술)의 구성 원리, 영역별 배치와 자료 구비 방법을 설명해주세요.' },
      { id: 43, question: '놀잇감 선정과 제공은?', prompt: '발달에 적합한 놀잇감 선정 기준, 개방적 자료와 폐쇄적 자료, 놀잇감 교체와 관리 방법을 설명해주세요.' },
      { id: 44, question: '실외 놀이 환경 구성은?', prompt: '실외 놀이터 환경 구성(고정 놀이시설, 모래·물놀이, 자연 탐구 공간), 안전 기준, 자연친화적 환경 조성을 설명해주세요.' },
      { id: 45, question: '계절과 주제에 따른 환경 변화는?', prompt: '계절 변화와 교육 주제에 따른 환경 구성 변화, 게시물 활용, 유아 참여 환경 구성 방안을 설명해주세요.' },
      { id: 46, question: '유아 작품 전시 방법은?', prompt: '유아 작품 전시의 교육적 의미, 효과적인 전시 방법, 유아 참여 전시 기획, 작품 관리 방안을 설명해주세요.' },
      { id: 47, question: '특별실 환경 구성은?', prompt: '특별실(도서실, 신체활동실, 미술실 등)의 환경 구성 원리, 효과적인 활용 방안을 설명해주세요.' },
      { id: 48, question: '안전한 환경 구성은?', prompt: '유치원 안전 환경 조성(바닥재, 모서리 보호, 전기 안전, 미끄럼 방지 등), 안전점검 체크리스트 활용을 설명해주세요.' },
      { id: 49, question: '통합교육을 위한 환경은?', prompt: '장애 유아 통합교육을 위한 물리적 환경 지원(편의시설, 보조공학, 환경 수정), 통합적 환경 조성 방안을 설명해주세요.' },
      { id: 50, question: '지속가능한 환경 구성은?', prompt: '지속가능발전교육을 위한 환경 구성(자연친화적 소재, 재활용 자료, 에너지 절약), 생태적 환경 조성 방안을 설명해주세요.' }
    ]
  }
];

export default function CurriculumPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('kindergarten-curriculum-progress');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kindergarten-curriculum-progress', JSON.stringify(completedItems));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/category/education/kindergarten-teacher" className="hover:text-blue-600 transition">
              유치원정교사
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">유치원 교육과정</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">📋 유치원 교육과정 학습</h1>
          <p className="text-gray-600 mt-1">누리과정, 교육계획, 평가 50문제</p>
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
            <div className="text-3xl font-bold text-blue-600">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
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
                        className="bg-blue-500 h-2 rounded-full transition-all"
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
                              : 'border-gray-300 hover:border-blue-500'
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
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 transition shadow-md"
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
            href="/category/education/kindergarten-teacher/study/child-development"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-md"
          >
            ← 아동발달
          </Link>
          <Link
            href="/category/education/kindergarten-teacher/study/teaching-methods"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-600 transition shadow-md"
          >
            교수학습방법 →
          </Link>
        </div>
      </div>

      {/* AI Modal */}
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
