'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TOEICPracticalPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('toeic-practical-completed');
    if (saved) {
      setCompletedItems(new Set(JSON.parse(saved)));
    }
  }, []);

  const saveProgress = (newCompleted: Set<string>) => {
    localStorage.setItem('toeic-practical-completed', JSON.stringify([...newCompleted]));
  };

  const toggleItem = (itemId: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId);
    } else {
      newCompleted.add(itemId);
    }
    setCompletedItems(newCompleted);
    saveProgress(newCompleted);
  };

  const toggleTopic = (index: number) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTopics(newExpanded);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: "시험 당일 전략",
      icon: "📋",
      items: [
        { id: "p1-1", title: "시험 전날 준비 체크리스트", desc: "준비물, 수면, 컨디션 관리", prompt: "TOEIC 시험 전날 준비해야 할 것들을 체크리스트로 알려주세요. 준비물(신분증, 연필, 지우개 등), 수면 관리, 식사, 컨디션 조절 등 구체적인 팁을 포함해주세요." },
        { id: "p1-2", title: "시험장 도착 및 마음가짐", desc: "시험장 환경 적응 팁", prompt: "TOEIC 시험장에 도착해서 시험 시작 전까지 어떻게 시간을 보내면 좋을까요? 긴장 완화 방법, 집중력 향상 팁, 시험장 환경 적응 방법을 알려주세요." },
        { id: "p1-3", title: "LC 파트별 시간 활용법", desc: "음성 시작 전 선택지 미리보기", prompt: "TOEIC LC(Listening Comprehension) 시험 중 음성이 나오기 전에 선택지를 미리 보는 기술에 대해 설명해주세요. 파트별로 어떻게 시간을 활용하면 효과적인지 알려주세요." },
        { id: "p1-4", title: "RC 시간 배분 전략", desc: "75분 최적 배분법", prompt: "TOEIC RC(Reading Comprehension) 75분을 어떻게 배분하면 좋을까요? Part 5, 6, 7 각각에 할당할 시간과 시간 부족 시 대처 방법을 구체적으로 알려주세요." },
        { id: "p1-5", title: "마킹 전략과 실수 방지", desc: "OMR 마킹 요령", prompt: "TOEIC 시험에서 OMR 마킹 실수를 방지하는 방법과 효율적인 마킹 전략을 알려주세요. 시간 절약하면서 정확하게 마킹하는 요령을 포함해주세요." }
      ]
    },
    {
      title: "점수대별 공략법",
      icon: "🎯",
      items: [
        { id: "p2-1", title: "600점 목표 전략", desc: "기초 다지기 집중 영역", prompt: "TOEIC 600점을 목표로 하는 학습자를 위한 공략법을 알려주세요. 집중해야 할 파트, 기본 문법/어휘 학습 방법, 효율적인 시간 투자 전략을 포함해주세요." },
        { id: "p2-2", title: "700점 목표 전략", desc: "약점 파트 보완 방법", prompt: "TOEIC 700점을 목표로 하는 학습자를 위한 공략법을 알려주세요. 600점대에서 700점으로 올리기 위해 집중해야 할 영역과 학습 방법을 구체적으로 알려주세요." },
        { id: "p2-3", title: "800점 목표 전략", desc: "고득점 진입 핵심 포인트", prompt: "TOEIC 800점을 목표로 하는 학습자를 위한 고득점 전략을 알려주세요. 어려운 문제 유형 대처법, Part 7 독해력 향상법, LC 고난도 문제 공략법을 포함해주세요." },
        { id: "p2-4", title: "900점+ 목표 전략", desc: "만점 근접 완벽 대비", prompt: "TOEIC 900점 이상 고득점을 위한 전략을 알려주세요. 실수 최소화 방법, 시간 여유 확보, 어려운 함정 문제 식별법, 만점에 가까워지기 위한 핵심 팁을 포함해주세요." },
        { id: "p2-5", title: "단기간 점수 향상 전략", desc: "2주/1개월 집중 학습법", prompt: "TOEIC 시험까지 2주 또는 1개월 남았을 때 단기간에 점수를 최대한 올리는 방법을 알려주세요. 집중해야 할 영역, 버려야 할 부분, 효율적인 학습 스케줄을 포함해주세요." }
      ]
    },
    {
      title: "LC 실전 기술",
      icon: "🎧",
      items: [
        { id: "p3-1", title: "Part 1 사진 빠르게 분석하기", desc: "5초 안에 핵심 파악", prompt: "TOEIC Part 1에서 사진을 빠르게 분석하는 기술을 알려주세요. 사람/사물/배경 중 무엇에 집중해야 하는지, 자주 나오는 오답 패턴은 무엇인지 설명해주세요." },
        { id: "p3-2", title: "Part 2 의문사 집중 듣기", desc: "첫 단어에 모든 것이 달렸다", prompt: "TOEIC Part 2에서 의문사(Who, What, When, Where, Why, How)별 정답 패턴을 알려주세요. 각 의문사에 대한 전형적인 답변 유형과 함정 패턴을 포함해주세요." },
        { id: "p3-3", title: "Part 3 대화 흐름 예측", desc: "상황별 전형적 대화 패턴", prompt: "TOEIC Part 3에서 자주 나오는 대화 상황(사무실, 식당, 호텔, 공항 등)별 전형적인 대화 흐름과 예상 질문 유형을 알려주세요." },
        { id: "p3-4", title: "Part 4 담화 유형별 핵심", desc: "안내방송, 광고, 뉴스 등", prompt: "TOEIC Part 4에서 자주 나오는 담화 유형(안내방송, 광고, 뉴스, 전화 메시지, 회의 발표 등)별 핵심 포인트와 자주 묻는 질문 유형을 알려주세요." },
        { id: "p3-5", title: "LC 집중력 유지 훈련", desc: "45분 동안 집중하는 법", prompt: "TOEIC LC 45분 동안 집중력을 유지하는 방법을 알려주세요. 집중력이 떨어지는 구간 대처법, 실전에서 멘탈 관리하는 방법을 포함해주세요." }
      ]
    },
    {
      title: "RC 실전 기술",
      icon: "📖",
      items: [
        { id: "p4-1", title: "Part 5 10초 풀이법", desc: "빈칸 앞뒤만 보고 풀기", prompt: "TOEIC Part 5를 문제당 평균 10초 안에 푸는 방법을 알려주세요. 빈칸 앞뒤 단어만 보고 답을 찾는 기술, 전체를 읽어야 하는 문제 구분법을 포함해주세요." },
        { id: "p4-2", title: "Part 6 문맥 파악 기술", desc: "빈칸 문장 삽입 문제 공략", prompt: "TOEIC Part 6에서 문장 삽입 문제를 효과적으로 푸는 방법을 알려주세요. 글의 흐름 파악, 연결어 활용, 시간 효율적으로 풀기 위한 전략을 포함해주세요." },
        { id: "p4-3", title: "Part 7 지문 유형별 접근법", desc: "이메일, 광고, 기사 등", prompt: "TOEIC Part 7의 지문 유형(이메일, 편지, 광고, 기사, 공지, 채팅 등)별로 어떻게 접근해야 효율적인지 알려주세요. 각 유형의 특징과 핵심 정보 찾는 방법을 포함해주세요." },
        { id: "p4-4", title: "이중/삼중 지문 공략", desc: "연계 정보 빠르게 찾기", prompt: "TOEIC Part 7의 이중/삼중 지문 문제를 효과적으로 푸는 방법을 알려주세요. 지문 간 연결 정보 찾기, 시간 배분, 문제 순서대로 풀지 않는 전략 등을 포함해주세요." },
        { id: "p4-5", title: "시간 부족 시 응급 전략", desc: "남은 5분으로 최대 점수", prompt: "TOEIC RC에서 시간이 부족할 때 남은 5분 동안 최대한 점수를 얻는 방법을 알려주세요. 빠르게 풀 수 있는 문제 유형, 찍기 전략, 마지막까지 포기하지 않는 방법을 포함해주세요." }
      ]
    },
    {
      title: "고득점 핵심 스킬",
      icon: "🏆",
      items: [
        { id: "p5-1", title: "Paraphrasing 인식 능력", desc: "같은 의미 다른 표현 찾기", prompt: "TOEIC에서 Paraphrasing(바꿔 말하기)이 어떻게 사용되는지 설명해주세요. LC와 RC에서 자주 나오는 paraphrasing 패턴과 이를 빠르게 인식하는 연습 방법을 알려주세요." },
        { id: "p5-2", title: "오답 소거법 마스터", desc: "확실한 오답부터 제거", prompt: "TOEIC에서 오답 소거법을 효과적으로 사용하는 방법을 알려주세요. LC와 RC 각각에서 전형적인 오답 패턴과 이를 빠르게 제거하는 기술을 포함해주세요." },
        { id: "p5-3", title: "함정 문제 식별법", desc: "자주 나오는 트릭 유형", prompt: "TOEIC에서 자주 나오는 함정 문제 유형을 알려주세요. LC와 RC 각각에서 조심해야 할 트릭과 이를 피하는 방법을 구체적인 예시와 함께 설명해주세요." },
        { id: "p5-4", title: "비즈니스 영어 필수 표현", desc: "TOEIC 단골 비즈니스 용어", prompt: "TOEIC에서 자주 나오는 비즈니스 영어 표현 50개를 알려주세요. 회의, 출장, 인사, 마케팅, 재무 등 상황별로 정리해주시고 예문도 포함해주세요." },
        { id: "p5-5", title: "멘탈 관리와 실수 최소화", desc: "시험장에서 평정심 유지", prompt: "TOEIC 시험 중 멘탈 관리하는 방법을 알려주세요. 어려운 문제를 만났을 때 대처법, 실수를 최소화하는 습관, 마지막까지 집중력 유지하는 방법을 포함해주세요." }
      ]
    }
  ];

  const totalItems = topics.reduce((sum, topic) => sum + topic.items.length, 0);
  const completedCount = completedItems.size;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/category/language/toeic"
              className="p-2 hover:bg-blue-100 rounded-lg transition"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-800">TOEIC 실전대비</h1>
              <p className="text-sm text-gray-500">시험 전략 및 고득점 스킬</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-medium">학습 진행률</span>
            <span className="text-blue-600 font-bold">{completedCount} / {totalItems}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-right text-sm text-gray-500 mt-2">{progressPercent}% 완료</p>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500">
                      {topic.items.filter(item => completedItems.has(item.id)).length} / {topic.items.length} 완료
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedTopics.has(topicIndex) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedTopics.has(topicIndex) && (
                <div className="px-6 pb-4 space-y-2">
                  {topic.items.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border-2 transition ${
                        completedItems.has(item.id)
                          ? 'bg-blue-50 border-blue-200'
                          : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            completedItems.has(item.id)
                              ? 'bg-blue-500 border-blue-500 text-white'
                              : 'border-gray-300 hover:border-blue-400'
                          }`}
                        >
                          {completedItems.has(item.id) && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => openAIModal(item.prompt)}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-indigo-600 transition shadow-md"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3">💡 실전 Tip</h3>
          <ul className="space-y-2 text-blue-100">
            <li>• LC는 음성을 듣기 전에 선택지를 미리 읽어두세요</li>
            <li>• RC Part 5는 평균 20초 이내에 풀어야 Part 7에 시간 여유가 생깁니다</li>
            <li>• 모르는 문제는 과감히 찍고 넘어가세요 - 시간 관리가 핵심입니다</li>
            <li>• 시험 전날은 새로운 내용보다 복습에 집중하세요</li>
          </ul>
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{currentPrompt}</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-sm text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-sm text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-2xl">💙</span>
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
