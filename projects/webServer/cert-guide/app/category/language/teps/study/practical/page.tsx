'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TEPSPracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teps-practical-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('teps-practical-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const openAIHelper = (question: string) => {
    setCurrentQuestion(question);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "시험 당일 전략",
      icon: "📅",
      items: [
        "컨디션 관리: 시험 전날 충분한 수면과 가벼운 식사",
        "준비물 확인: 신분증, 수험표, 연필, 지우개 준비",
        "시간 여유: 시험 30분 전까지 시험장 도착",
        "마음가짐: 긴장 풀기 위한 심호흡, 자신감 유지",
        "105분 집중력: 장시간 집중력 유지 연습 필요"
      ]
    },
    {
      title: "시간 배분 전략",
      icon: "⏱️",
      items: [
        "청해 40분: 음원 진행에 맞춰 바로바로 마킹",
        "어휘 25분: 문항당 50초 이내, 모르면 표시 후 넘기기",
        "문법 25분: 문항당 50초 이내, 문장 구조 빠르게 분석",
        "독해 40분: 지문당 3~4분 배분, 시간 체크 필수",
        "마지막 5분: 마킹 검토 및 빈칸 채우기"
      ]
    },
    {
      title: "점수대별 공략법",
      icon: "📊",
      items: [
        "300점 미만: 기초 문법/어휘 집중, 청해 기본 훈련",
        "300~350점: 취약 영역 파악 및 집중 보완",
        "350~400점: 시간 관리 연습, 오답노트 활용",
        "400~450점: 고급 어휘/문법, 독해 속도 향상",
        "450점+: 실전 감각 유지, 만점 영역 확보"
      ]
    },
    {
      title: "영역별 고득점 전략",
      icon: "🎯",
      items: [
        "청해: 선택지 미리 읽기, 집중력 유지가 관건",
        "어휘: 구어체/문어체 구분, 콜로케이션 숙지",
        "문법: 문장 구조 분석력, 자주 출제 패턴 암기",
        "독해: 속독 능력 향상, 질문 유형별 접근법 숙지",
        "공통: 기출문제 반복 풀이로 유형 파악"
      ]
    },
    {
      title: "학습 계획 수립",
      icon: "📝",
      items: [
        "목표 설정: 목표 점수와 기한 명확히 설정",
        "취약점 분석: 모의고사로 취약 영역 파악",
        "균형 학습: 4개 영역 균형 있게 학습",
        "실전 연습: 주 2회 이상 실전 모의고사",
        "오답 분석: 틀린 문제 원인 분석 및 정리"
      ]
    }
  ];

  const totalItems = topics.reduce((sum, t) => sum + t.items.length, 0);
  const progress = Math.round((completedItems.length / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/language/teps" className="text-sky-600 hover:text-sky-800 flex items-center gap-2">
            <span>←</span>
            <span>TEPS로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🎯</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">실전 대비</h1>
              <p className="text-gray-600">시험 전략 25문항</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-sky-500 to-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalItems}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicItems = topic.items.map((_, i) => `${topicIndex}-${i}`);
            const completedInTopic = topicItems.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-sky-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.items.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.items.map((item, itemIndex) => {
                      const itemId = `${topicIndex}-${itemIndex}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={itemIndex}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-sky-50 border-sky-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => toggleItem(itemId)}
                            className="mt-1 w-5 h-5 text-sky-600 rounded cursor-pointer"
                          />
                          <span className={`flex-1 text-sm ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                            {item}
                          </span>
                          <button
                            onClick={() => openAIHelper(item)}
                            className="text-sky-500 hover:text-sky-700 text-xs px-2 py-1 rounded bg-sky-100 hover:bg-sky-200"
                          >
                            AI
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-sky-50 rounded-xl p-6 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">💡 TEPS 실전 핵심</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• 105분 동안 135문항을 풀어야 하므로 시간 관리가 핵심</li>
            <li>• 청해는 한 번만 들려주므로 집중력 유지 필수</li>
            <li>• 모르는 문제는 표시 후 넘기고 나중에 돌아오기</li>
            <li>• 기출문제 반복 풀이로 유형과 난이도 파악하기</li>
          </ul>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">AI에게 질문하기</h3>
            <p className="text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">{currentQuestion}</p>
            <div className="space-y-2">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`TEPS 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TEPS 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TEPS 실전 전략 관련 질문입니다: "${currentQuestion}" - 구체적인 방법을 설명해주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-indigo-600"
              >
                Gemini에게 질문
              </a>
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
