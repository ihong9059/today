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
    title: '교직관 및 교사상',
    icon: '👨‍🏫',
    items: [
      { id: 1, question: '본인이 생각하는 좋은 교사란?', prompt: '교원임용 2차 면접에서 "본인이 생각하는 좋은 교사란 무엇인가?"라는 질문에 대해, 교육철학적 관점과 구체적 실천 방안을 포함하여 모범 답변을 제시해주세요.' },
      { id: 2, question: '교사가 되고자 하는 이유는?', prompt: '교원임용 면접에서 "교사가 되고자 하는 이유와 동기"를 묻는 질문에 대해, 진정성 있고 설득력 있는 모범 답변을 제시해주세요.' },
      { id: 3, question: '교사로서 가장 중요한 자질은?', prompt: '교원임용 면접에서 "교사로서 가장 중요한 자질이 무엇이라고 생각하는가?"라는 질문에 대해, 이론적 근거와 실천 방안을 포함한 모범 답변을 제시해주세요.' },
      { id: 4, question: '10년 후 어떤 교사가 되고 싶은가?', prompt: '교원임용 면접에서 "10년 후 어떤 교사가 되어 있을 것인가?"라는 질문에 대해, 구체적인 비전과 자기계발 계획을 담은 모범 답변을 제시해주세요.' },
      { id: 5, question: '교직의 전문성이란 무엇인가?', prompt: '교원임용 면접에서 "교직의 전문성이란 무엇이며, 어떻게 개발할 것인가?"라는 질문에 대해, 교직 전문성의 구성요소와 신장 방안을 포함한 모범 답변을 제시해주세요.' }
    ]
  },
  {
    title: '학생 생활지도',
    icon: '🤝',
    items: [
      { id: 6, question: '학교폭력 발생 시 대처 방법은?', prompt: '교원임용 면접에서 "학교폭력이 발생했을 때 어떻게 대처할 것인가?"라는 질문에 대해, 법적 절차와 교육적 접근을 모두 포함한 모범 답변을 제시해주세요.' },
      { id: 7, question: '수업 중 문제행동 학생 지도법은?', prompt: '교원임용 면접에서 "수업 중 문제행동을 보이는 학생을 어떻게 지도할 것인가?"라는 질문에 대해, 긍정적 행동지원(PBS) 관점의 모범 답변을 제시해주세요.' },
      { id: 8, question: '학교 부적응 학생 지원 방안은?', prompt: '교원임용 면접에서 "학교 부적응 학생을 어떻게 지원할 것인가?"라는 질문에 대해, 위클래스, 전문상담 연계 등 다각적 지원 방안의 모범 답변을 제시해주세요.' },
      { id: 9, question: '자살/자해 위험 학생 발견 시 대응은?', prompt: '교원임용 면접에서 "자살이나 자해 위험이 있는 학생을 발견하면 어떻게 대응할 것인가?"라는 질문에 대해, 위기개입 절차를 포함한 모범 답변을 제시해주세요.' },
      { id: 10, question: '학생 인권과 교권의 균형은?', prompt: '교원임용 면접에서 "학생 인권과 교권이 충돌할 때 어떻게 균형을 잡을 것인가?"라는 질문에 대해, 상호 존중의 관점에서 모범 답변을 제시해주세요.' }
    ]
  },
  {
    title: '수업 및 평가',
    icon: '📝',
    items: [
      { id: 11, question: '학력 격차 해소 방안은?', prompt: '교원임용 면접에서 "학급 내 학력 격차를 어떻게 해소할 것인가?"라는 질문에 대해, 수준별 수업과 개별화 지도 전략의 모범 답변을 제시해주세요.' },
      { id: 12, question: '과정중심평가 실천 방안은?', prompt: '교원임용 면접에서 "과정중심평가를 어떻게 실천할 것인가?"라는 질문에 대해, 형성평가, 피드백, 성장 지원의 관점에서 모범 답변을 제시해주세요.' },
      { id: 13, question: '디지털 리터러시 교육 방안은?', prompt: '교원임용 면접에서 "AI 시대 디지털 리터러시 교육을 어떻게 할 것인가?"라는 질문에 대해, 비판적 사고와 정보 활용 능력 함양 방안의 모범 답변을 제시해주세요.' },
      { id: 14, question: '학생 참여 수업 방법은?', prompt: '교원임용 면접에서 "학생 참여 중심 수업을 어떻게 실천할 것인가?"라는 질문에 대해, 토의토론, 협동학습, PBL 등 다양한 방법의 모범 답변을 제시해주세요.' },
      { id: 15, question: '학습 동기 유발 전략은?', prompt: '교원임용 면접에서 "학습에 흥미가 없는 학생의 동기를 어떻게 유발할 것인가?"라는 질문에 대해, 내재적 동기 이론에 기반한 모범 답변을 제시해주세요.' }
    ]
  },
  {
    title: '학교 조직 및 관계',
    icon: '🏫',
    items: [
      { id: 16, question: '동료 교사와의 갈등 해결 방법은?', prompt: '교원임용 면접에서 "동료 교사와 의견 충돌이 있을 때 어떻게 해결할 것인가?"라는 질문에 대해, 협력적 의사소통의 관점에서 모범 답변을 제시해주세요.' },
      { id: 17, question: '학부모 민원 대응 방법은?', prompt: '교원임용 면접에서 "학부모가 부당한 민원을 제기할 때 어떻게 대응할 것인가?"라는 질문에 대해, 전문성과 공감을 균형있게 보여주는 모범 답변을 제시해주세요.' },
      { id: 18, question: '학교 혁신에 기여하는 방법은?', prompt: '교원임용 면접에서 "신규 교사로서 학교 혁신에 어떻게 기여할 것인가?"라는 질문에 대해, 겸손함과 적극성을 겸비한 모범 답변을 제시해주세요.' },
      { id: 19, question: '전문적 학습공동체 참여 계획은?', prompt: '교원임용 면접에서 "전문적 학습공동체에 어떻게 참여하고 기여할 것인가?"라는 질문에 대해, 협력적 수업 연구와 성장의 관점에서 모범 답변을 제시해주세요.' },
      { id: 20, question: '업무 과다 시 대처 방법은?', prompt: '교원임용 면접에서 "교사 업무가 과다할 때 어떻게 대처할 것인가?"라는 질문에 대해, 업무 우선순위화와 효율적 시간 관리 전략의 모범 답변을 제시해주세요.' }
    ]
  },
  {
    title: '교육 정책 및 시사',
    icon: '📰',
    items: [
      { id: 21, question: 'IB 교육과정에 대한 견해는?', prompt: '교원임용 면접에서 "IB 교육과정 도입에 대해 어떻게 생각하는가?"라는 질문에 대해, 장단점 분석과 균형잡힌 견해의 모범 답변을 제시해주세요.' },
      { id: 22, question: '고교학점제의 과제와 대응은?', prompt: '교원임용 면접에서 "고교학점제 시행의 과제와 교사로서의 대응 방안"을 묻는 질문에 대해, 현실적이고 구체적인 모범 답변을 제시해주세요.' },
      { id: 23, question: '다문화 교육 실천 방안은?', prompt: '교원임용 면접에서 "다문화 학생이 증가하는 상황에서 어떤 교육을 실천할 것인가?"라는 질문에 대해, 포용성과 다양성 존중의 모범 답변을 제시해주세요.' },
      { id: 24, question: '기후위기와 생태전환교육 방안은?', prompt: '교원임용 면접에서 "기후위기 시대 생태전환교육을 어떻게 실천할 것인가?"라는 질문에 대해, 교과 통합적 접근의 모범 답변을 제시해주세요.' },
      { id: 25, question: 'AI 시대 교사의 역할 변화는?', prompt: '교원임용 면접에서 "AI 시대 교사의 역할은 어떻게 변화해야 하는가?"라는 질문에 대해, AI와 협업하는 교사상에 대한 모범 답변을 제시해주세요.' }
    ]
  }
];

export default function InterviewPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teacher-certificate-interview-progress');
    if (saved) {
      setCompletedItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('teacher-certificate-interview-progress', JSON.stringify(completedItems));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/category/education/teacher-certificate" className="hover:text-rose-600 transition">
              교원자격증
            </Link>
            <span>/</span>
            <Link href="/category/education/teacher-certificate/study" className="hover:text-rose-600 transition">
              과목별 학습
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">면접</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">🎤 면접 학습</h1>
          <p className="text-gray-600 mt-1">2차 시험 면접 핵심 영역 25문제</p>
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
            <div className="text-3xl font-bold text-rose-600">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-500"
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

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-rose-800 mb-3">💡 면접 준비 TIP</h3>
          <ul className="space-y-2 text-rose-700">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 mt-1">•</span>
              <span>면접은 개별면접, 집단면접, 심층면접 등 다양한 형태로 진행됩니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 mt-1">•</span>
              <span>교직관, 인성, 전문성, 의사소통 능력 등을 종합적으로 평가합니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 mt-1">•</span>
              <span>최신 교육정책과 이슈에 대한 본인의 견해를 정리해두세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 mt-1">•</span>
              <span>구체적인 경험 사례를 활용하여 답변하면 설득력이 높아집니다</span>
            </li>
          </ul>
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
                        className="bg-rose-500 h-2 rounded-full transition-all"
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
                              : 'border-gray-300 hover:border-rose-500'
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
                          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-rose-600 hover:to-pink-600 transition shadow-md"
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
            href="/category/education/teacher-certificate/study/class-demonstration"
            className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition shadow-md"
          >
            ← 수업실연
          </Link>
          <Link
            href="/category/education/teacher-certificate"
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium rounded-xl hover:from-rose-600 hover:to-pink-600 transition shadow-md"
          >
            메인으로 →
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
