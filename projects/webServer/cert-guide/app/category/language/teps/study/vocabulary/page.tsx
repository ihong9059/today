'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TEPSVocabularyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('teps-vocabulary-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('teps-vocabulary-completed', JSON.stringify(items));
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
      title: "Part 1: 대화문 빈칸 어휘",
      icon: "💬",
      items: [
        "구어체 표현: gonna, wanna, gotta 등 축약형 이해",
        "관용표현: It's on me, You bet, No way 등 관용 표현",
        "감정 표현: I'm thrilled, I'm fed up with 등 감정 어휘",
        "동의/반대: I couldn't agree more, I beg to differ 등",
        "제안/요청: How about, Why don't we, Would you mind",
        "사과/변명: I apologize for, I'm sorry but 등",
        "칭찬/감사: That's impressive, I appreciate 등",
        "불만/항의: I'm not satisfied with, This is unacceptable",
        "확인/재확인: Are you sure, Let me get this straight",
        "상황별 표현: 쇼핑, 식당, 병원, 직장 등 상황별 어휘"
      ]
    },
    {
      title: "Part 2: 단문 빈칸 어휘",
      icon: "📝",
      items: [
        "학술 어휘: hypothesis, phenomenon, methodology 등",
        "추상 명사: integrity, prosperity, adversity 등",
        "동사 어휘: implement, facilitate, deteriorate 등",
        "형용사 어휘: prominent, substantial, detrimental 등",
        "부사 어휘: considerably, inevitably, predominantly 등",
        "콜로케이션: make a decision, take action, raise concerns",
        "동의어 구분: affect/effect, assure/ensure, adapt/adopt",
        "문맥 어휘: 문맥에 따라 의미가 달라지는 다의어",
        "전문 용어: 경제, 과학, 사회 분야 전문 어휘",
        "고급 어휘: ubiquitous, pragmatic, meticulous 등"
      ]
    },
    {
      title: "접두사/접미사 활용",
      icon: "🔤",
      items: [
        "부정 접두사: un-, in-, im-, dis-, non-, mis-",
        "방향 접두사: pre-, post-, fore-, anti-, counter-",
        "정도 접두사: over-, under-, super-, ultra-, hyper-",
        "명사 접미사: -tion, -ment, -ness, -ity, -ance/-ence",
        "형용사 접미사: -able/-ible, -ful, -less, -ive, -ous",
        "동사 접미사: -ize, -ify, -en, -ate",
        "부사 접미사: -ly, -ward(s), -wise",
        "어근 활용: spect(보다), port(운반), duct(이끌다)",
        "어원 학습: 라틴어, 그리스어 어원 파악",
        "파생어 확장: 하나의 어근에서 파생되는 단어군 학습"
      ]
    },
    {
      title: "주제별 필수 어휘",
      icon: "📚",
      items: [
        "경제/비즈니스: revenue, inflation, deficit, merger",
        "과학/기술: innovation, breakthrough, sustainable, renewable",
        "환경: pollution, conservation, ecosystem, biodiversity",
        "사회/문화: diversity, discrimination, heritage, assimilation",
        "정치/법률: legislation, amendment, jurisdiction, sovereignty",
        "의학/건강: symptom, diagnosis, treatment, prevention",
        "교육: curriculum, assessment, pedagogy, literacy",
        "심리/행동: cognition, perception, motivation, behavior",
        "예술/문학: aesthetic, narrative, metaphor, symbolism",
        "역사/철학: civilization, ideology, ethics, paradigm"
      ]
    },
    {
      title: "어휘 학습 전략",
      icon: "🎯",
      items: [
        "문맥 학습: 예문과 함께 어휘 암기하기",
        "연어(Collocation) 학습: 함께 쓰이는 단어 조합 학습",
        "동의어/반의어: 유사어와 반대어 함께 암기",
        "어원 분석: 접두사, 어근, 접미사로 단어 분석",
        "주제별 분류: 분야별로 관련 어휘 묶어서 학습",
        "반복 복습: 에빙하우스 망각곡선에 따른 복습 주기",
        "플래시카드: 단어장/앱을 활용한 반복 학습",
        "문장 만들기: 새 어휘로 직접 문장 작성해보기",
        "독서 활용: 영문 기사/책 읽으며 어휘 확장",
        "오답노트: 자주 틀리는 어휘 별도 정리"
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
            <span className="text-4xl">📚</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">어휘 (Vocabulary)</h1>
              <p className="text-gray-600">필수 어휘 연습 50문항</p>
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
          <h3 className="font-bold text-sky-800 mb-3">💡 TEPS 어휘 핵심 TIP</h3>
          <ul className="space-y-2 text-sky-700 text-sm">
            <li>• TEPS 어휘는 TOEIC보다 난이도가 높으니 고급 어휘 학습 필수</li>
            <li>• 구어체(Part 1)와 문어체(Part 2) 어휘를 구분하여 학습하세요</li>
            <li>• 접두사/접미사를 활용하면 어휘력을 효율적으로 확장할 수 있습니다</li>
            <li>• 예문과 함께 암기하고 직접 문장을 만들어보세요</li>
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
                href={`https://claude.ai/new?q=${encodeURIComponent(`TEPS 어휘 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예문을 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-amber-600"
              >
                Claude에게 질문
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`TEPS 어휘 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예문을 들어주세요.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg hover:from-green-600 hover:to-emerald-600"
              >
                ChatGPT에게 질문
              </a>
              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(`TEPS 어휘 관련 질문입니다: "${currentQuestion}" - 자세한 설명과 예문을 들어주세요.`)}`}
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
