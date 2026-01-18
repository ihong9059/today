'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function Local9LocalAdminPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('local9-local-admin-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const updated = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(updated);
    localStorage.setItem('local9-local-admin-progress', JSON.stringify(updated));
  };

  const topics = [
    {
      id: 'basic',
      title: '지방자치 기초이론',
      icon: '📚',
      questions: [
        '지방자치의 개념과 본질에 대해 설명하시오.',
        '단체자치와 주민자치의 차이를 비교하시오.',
        '지방자치의 필요성과 가치에 대해 논하시오.',
        '지방분권의 의의와 유형을 설명하시오.',
        '중앙집권과 지방분권의 장단점을 비교하시오.',
        '보충성의 원칙에 대해 설명하시오.',
        '지방자치의 역사적 발전 과정을 설명하시오.',
        '우리나라 지방자치제의 발전 과정을 논하시오.',
        '지방자치 관련 헌법 규정을 설명하시오.',
        '지방자치법의 주요 내용을 설명하시오.',
      ],
    },
    {
      id: 'organization',
      title: '지방자치단체의 구성',
      icon: '🏛️',
      questions: [
        '지방자치단체의 종류와 특성을 설명하시오.',
        '광역자치단체와 기초자치단체를 비교하시오.',
        '특별지방자치단체의 종류와 특성을 설명하시오.',
        '지방자치단체의 구역과 명칭에 대해 논하시오.',
        '지방자치단체의 기관구성 형태를 비교하시오.',
        '지방의회의 지위와 권한을 설명하시오.',
        '지방의회의 조직과 운영에 대해 논하시오.',
        '지방자치단체장의 지위와 권한을 설명하시오.',
        '지방의회와 지방자치단체장의 관계를 논하시오.',
        '지방자치단체의 사무배분 원칙을 설명하시오.',
      ],
    },
    {
      id: 'participation',
      title: '주민참여',
      icon: '👥',
      questions: [
        '주민참여의 의의와 필요성을 설명하시오.',
        '주민투표제도의 내용과 절차를 설명하시오.',
        '주민발의(조례 제정·개폐 청구)제도를 설명하시오.',
        '주민소환제도의 요건과 절차를 설명하시오.',
        '주민소송제도의 내용과 의의를 설명하시오.',
        '주민감사청구제도에 대해 설명하시오.',
        '주민참여예산제도의 의의와 운영을 설명하시오.',
        '공청회와 주민설명회의 차이를 비교하시오.',
        '마을만들기와 주민자치회를 설명하시오.',
        '전자민주주의와 온라인 주민참여를 논하시오.',
      ],
    },
    {
      id: 'finance',
      title: '지방재정',
      icon: '💰',
      questions: [
        '지방재정의 의의와 원칙에 대해 설명하시오.',
        '지방세의 종류와 특성을 설명하시오.',
        '지방세와 국세의 차이를 비교하시오.',
        '보통세와 목적세의 차이를 설명하시오.',
        '지방교부세제도의 의의와 종류를 설명하시오.',
        '국고보조금제도의 특성과 문제점을 논하시오.',
        '지방채의 발행 요건과 한계를 설명하시오.',
        '지방예산의 편성과 집행 과정을 설명하시오.',
        '지방재정자립도와 재정자주도의 차이를 설명하시오.',
        '지방재정 건전성 확보 방안에 대해 논하시오.',
      ],
    },
    {
      id: 'relationship',
      title: '정부 간 관계',
      icon: '🔗',
      questions: [
        '중앙정부와 지방정부의 관계 유형을 설명하시오.',
        '국가 감독의 종류와 방법을 설명하시오.',
        '지방자치단체에 대한 국가 관여를 설명하시오.',
        '중앙정부와 지방정부 간 분쟁조정을 논하시오.',
        '광역행정의 필요성과 방식을 설명하시오.',
        '행정협의회와 지방자치단체조합을 비교하시오.',
        '사무위탁의 의의와 절차를 설명하시오.',
        '지방자치단체 간 갈등과 해결 방안을 논하시오.',
        '지방정부 간 협력 네트워크를 설명하시오.',
        '특별지방행정기관의 문제점과 개선방안을 논하시오.',
      ],
    },
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;

  const handleAIClick = (question: string) => {
    setSelectedQuestion(question);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/civil/local-civil-9" className="text-emerald-600 hover:text-emerald-800 flex items-center gap-2">
            ← 지방직 9급으로 돌아가기
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-3xl">🏘️</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">지방자치론</h1>
              <p className="text-gray-600">지방자치제도, 주민참여, 지방재정</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">진행률</p>
              <p className="text-2xl font-bold text-emerald-600">{completedCount}/{totalQuestions}</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} />
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter((_, idx) => completedQuestions[`${topic.id}-${idx}`]).length;
            return (
              <div key={topic.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button onClick={() => setExpandedTopics((prev) => ({ ...prev, [topic.id]: !prev[topic.id] }))} className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition ${expandedTopics[topic.id] ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {expandedTopics[topic.id] && (
                  <div className="px-6 pb-6 space-y-3">
                    {topic.questions.map((question, idx) => {
                      const isCompleted = completedQuestions[`${topic.id}-${idx}`];
                      return (
                        <div key={idx} className={`p-4 rounded-xl border-2 transition ${isCompleted ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
                          <div className="flex items-start gap-3">
                            <button onClick={() => toggleQuestion(topic.id, idx)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${isCompleted ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 hover:border-emerald-400'}`}>{isCompleted && '✓'}</button>
                            <div className="flex-1">
                              <p className={`${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>{idx + 1}. {question}</p>
                              <button onClick={() => handleAIClick(question)} className="mt-2 text-sm text-emerald-600 hover:text-emerald-800 font-medium">🤖 AI에게 물어보기</button>
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

        <div className="mt-8 bg-emerald-50 rounded-2xl p-6">
          <h3 className="font-bold text-emerald-800 mb-3">📖 지방자치론 학습 가이드</h3>
          <ul className="text-sm text-emerald-700 space-y-2">
            <li>• 지방자치의 기본 이념과 원리 이해</li>
            <li>• 지방자치단체의 조직과 권한 암기</li>
            <li>• 주민참여제도(투표, 소환, 발의)의 요건과 절차</li>
            <li>• 지방재정의 세입구조와 재정조정제도</li>
            <li>• 최근 지방자치법 개정 내용 확인</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">🤖 AI 선택</h3>
            <p className="text-gray-600 mb-4 text-sm">{selectedQuestion}</p>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(selectedQuestion + ' 지방직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 transition">Claude로 학습하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(selectedQuestion + ' 지방직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center rounded-xl font-medium hover:from-emerald-600 hover:to-teal-600 transition">ChatGPT로 학습하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(selectedQuestion + ' 지방직 9급 공무원 시험 수준으로 상세히 설명해주세요.')}`} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-xl font-medium hover:from-blue-600 hover:to-indigo-600 transition">Gemini로 학습하기</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="mt-4 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
