'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
}

export default function FirePreventionPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'fire-prevention',
    name: '화재예방과 소화방법',
    icon: '🔥',
    color: 'from-red-500 to-orange-500',
  };

  const topics: Topic[] = [
    {
      id: 'combustion',
      title: '연소 이론',
      description: '연소의 원리와 조건',
      icon: '🔥',
      questions: [
        {
          id: 'comb-1',
          question: '연소의 3요소가 아닌 것은?',
          options: ['가연물', '점화원', '산소공급원', '촉매'],
          answer: 3,
          explanation: '연소의 3요소는 가연물, 점화원(열), 산소공급원입니다. 촉매는 연소 요소가 아닙니다.',
        },
        {
          id: 'comb-2',
          question: '인화점의 정의로 옳은 것은?',
          options: ['자연 발화 온도', '점화원 없이 발화', '가연성 증기 발생 최저 온도', '연소 지속 온도'],
          answer: 2,
          explanation: '인화점은 가연성 액체가 점화원에 의해 착화할 수 있는 최저 온도입니다.',
        },
        {
          id: 'comb-3',
          question: '발화점과 인화점의 관계로 옳은 것은?',
          options: ['발화점 > 인화점', '발화점 < 인화점', '항상 같음', '관계없음'],
          answer: 0,
          explanation: '발화점(자연발화온도)은 점화원 없이 발화하는 온도로, 인화점보다 높습니다.',
        },
        {
          id: 'comb-4',
          question: '연소범위(폭발한계)에 대한 설명으로 옳은 것은?',
          options: ['넓을수록 안전', '좁을수록 위험', '넓을수록 위험', '폭발과 무관'],
          answer: 2,
          explanation: '연소범위가 넓을수록 폭발 가능성이 높아 위험합니다.',
        },
        {
          id: 'comb-5',
          question: '완전연소의 생성물은?',
          options: ['CO, H₂O', 'CO₂, H₂O', 'CO, CO₂', 'CH₄, H₂O'],
          answer: 1,
          explanation: '완전연소 시 탄소는 CO₂로, 수소는 H₂O로 완전히 산화됩니다.',
        },
      ],
    },
    {
      id: 'fire-classification',
      title: '화재의 분류',
      description: '화재 종류와 특성',
      icon: '🏷️',
      questions: [
        {
          id: 'fc-1',
          question: 'A급 화재의 대상물은?',
          options: ['유류', '전기설비', '일반 가연물(목재, 종이)', '금속'],
          answer: 2,
          explanation: 'A급 화재는 일반화재로 목재, 종이, 섬유 등 일반 가연물 화재입니다.',
        },
        {
          id: 'fc-2',
          question: 'B급 화재에 적합한 소화약제는?',
          options: ['물', '포소화약제', '물분무', '산알칼리 소화기'],
          answer: 1,
          explanation: 'B급(유류화재)에는 포, CO₂, 분말 소화약제가 적합합니다. 물은 부적합합니다.',
        },
        {
          id: 'fc-3',
          question: 'C급 화재의 특징은?',
          options: ['목재 화재', '유류 화재', '전기 화재', '금속 화재'],
          answer: 2,
          explanation: 'C급 화재는 전기설비 화재로, 먼저 전원을 차단해야 합니다.',
        },
        {
          id: 'fc-4',
          question: 'D급 화재에 물을 사용하면 안 되는 이유는?',
          options: ['효과 없음', '수소 발생 위험', '전기 감전', '비경제적'],
          answer: 1,
          explanation: '금속화재(D급)에 물을 사용하면 수소가스가 발생하여 폭발 위험이 있습니다.',
        },
        {
          id: 'fc-5',
          question: '주방 화재(K급)에 적합한 소화약제는?',
          options: ['물', '건조화학소화약제', '습식화학소화약제', 'CO₂'],
          answer: 2,
          explanation: '주방 유류화재(K급)에는 습식화학소화약제(칼륨계)가 효과적입니다.',
        },
      ],
    },
    {
      id: 'extinguishing',
      title: '소화 원리',
      description: '소화의 방법과 원리',
      icon: '🧯',
      questions: [
        {
          id: 'ext-1',
          question: '질식소화의 원리는?',
          options: ['온도 저하', '산소 차단', '가연물 제거', '연쇄반응 억제'],
          answer: 1,
          explanation: '질식소화는 산소 농도를 15% 이하로 낮추어 연소를 중단시킵니다.',
        },
        {
          id: 'ext-2',
          question: '물 소화의 주된 효과는?',
          options: ['질식효과', '냉각효과', '부촉매효과', '희석효과'],
          answer: 1,
          explanation: '물은 큰 증발잠열로 연소물의 온도를 낮추는 냉각효과가 주됩니다.',
        },
        {
          id: 'ext-3',
          question: '할론 소화약제의 소화 원리는?',
          options: ['냉각', '질식', '부촉매(억제)', '제거'],
          answer: 2,
          explanation: '할론은 연소의 연쇄반응을 억제하는 부촉매효과(negative catalysis)가 주효과입니다.',
        },
        {
          id: 'ext-4',
          question: '포소화약제의 소화 원리가 아닌 것은?',
          options: ['질식효과', '냉각효과', '피복효과', '부촉매효과'],
          answer: 3,
          explanation: '포소화약제는 질식, 냉각, 피복(차단)효과가 있으나 부촉매효과는 없습니다.',
        },
        {
          id: 'ext-5',
          question: '이산화탄소(CO₂) 소화기의 특징이 아닌 것은?',
          options: ['전기화재에 적합', '잔류물 없음', '밀폐공간 사용 주의', 'A급 화재에 최적'],
          answer: 3,
          explanation: 'CO₂ 소화기는 B, C급 화재에 적합하며, A급 화재(일반화재)에는 냉각효과가 부족합니다.',
        },
      ],
    },
    {
      id: 'fire-prevention',
      title: '화재예방',
      description: '화재 예방 대책',
      icon: '🛡️',
      questions: [
        {
          id: 'fp-1',
          question: '정전기 화재 예방 방법이 아닌 것은?',
          options: ['접지', '습도 유지', '대전 방지제', '온도 상승'],
          answer: 3,
          explanation: '정전기 예방은 접지, 습도 60-70% 유지, 대전 방지제 사용이 효과적입니다.',
        },
        {
          id: 'fp-2',
          question: '자연발화 방지 방법이 아닌 것은?',
          options: ['통풍', '저온 저장', '퇴적 방지', '점화원 접근'],
          answer: 3,
          explanation: '자연발화 방지는 열 축적 방지(통풍, 저온, 퇴적 방지)가 중요합니다.',
        },
        {
          id: 'fp-3',
          question: '폭발 방지를 위한 불활성 가스는?',
          options: ['수소', '산소', '질소', '일산화탄소'],
          answer: 2,
          explanation: '질소(N₂), 이산화탄소(CO₂) 등 불활성 가스로 산소를 치환하여 폭발을 방지합니다.',
        },
        {
          id: 'fp-4',
          question: '방폭 구조의 종류가 아닌 것은?',
          options: ['내압방폭', '유입방폭', '본질안전방폭', '가압방폭'],
          answer: 1,
          explanation: '방폭 구조에는 내압방폭, 압력방폭, 안전증방폭, 본질안전방폭 등이 있습니다.',
        },
        {
          id: 'fp-5',
          question: '화재감지기의 종류가 아닌 것은?',
          options: ['열감지기', '연기감지기', '불꽃감지기', '습도감지기'],
          answer: 3,
          explanation: '화재감지기는 열, 연기, 불꽃을 감지합니다. 습도감지기는 화재감지와 무관합니다.',
        },
      ],
    },
    {
      id: 'fire-fighting',
      title: '소방시설',
      description: '소화설비와 경보설비',
      icon: '🚒',
      questions: [
        {
          id: 'ff-1',
          question: '옥내소화전의 호스 길이 기준은?',
          options: ['10m', '15m', '25m', '40m'],
          answer: 1,
          explanation: '옥내소화전의 호스 길이는 15m가 표준입니다.',
        },
        {
          id: 'ff-2',
          question: '스프링클러 헤드의 작동 원리는?',
          options: ['수동 개방', '감열 자동 개방', '연기 감지', '원격 제어'],
          answer: 1,
          explanation: '스프링클러 헤드는 열에 의해 퓨즈링크가 녹아 자동으로 개방됩니다.',
        },
        {
          id: 'ff-3',
          question: '자동화재탐지설비의 구성이 아닌 것은?',
          options: ['감지기', '수신기', '발신기', '급수장치'],
          answer: 3,
          explanation: '자동화재탐지설비는 감지기, 수신기, 발신기, 중계기 등으로 구성됩니다.',
        },
        {
          id: 'ff-4',
          question: '이산화탄소 소화설비가 적합한 장소는?',
          options: ['주거시설', '전기실', '주방', '다중이용시설'],
          answer: 1,
          explanation: 'CO₂ 소화설비는 전기실, 통신실 등 잔류물이 없어야 하는 곳에 적합합니다.',
        },
        {
          id: 'ff-5',
          question: '피난설비에 해당하지 않는 것은?',
          options: ['피난사다리', '완강기', '비상조명등', '스프링클러'],
          answer: 3,
          explanation: '스프링클러는 소화설비입니다. 피난설비는 피난사다리, 완강기, 비상조명등 등입니다.',
        },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem(`completed-${subject.id}`);
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, [subject.id]);

  const toggleQuestion = (questionId: string) => {
    const newCompleted = {
      ...completedQuestions,
      [questionId]: !completedQuestions[questionId],
    };
    setCompletedQuestions(newCompleted);
    localStorage.setItem(`completed-${subject.id}`, JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / totalQuestions) * 100);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const createAIPrompt = (question: Question, showAnswer: boolean) => {
    let prompt = `[위험물산업기사 - 화재예방과 소화방법] 문제:\n${question.question}\n\n`;
    prompt += `선택지:\n${question.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`;
    if (showAnswer) {
      prompt += `\n\n정답: ${question.answer + 1}번 (${question.options[question.answer]})`;
      prompt += `\n해설: ${question.explanation}`;
      prompt += `\n\n이 문제에 대해 더 자세히 설명해주세요.`;
    } else {
      prompt += `\n\n이 문제의 정답과 해설을 알려주세요.`;
    }
    return prompt;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-orange-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry/hazardous-materials" className="text-gray-600 hover:text-orange-600">위험물산업기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">{subject.name}</span>
          </nav>
        </div>
      </header>

      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{subject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{subject.name}</h1>
              <p className="text-white/80">위험물산업기사 필기시험</p>
            </div>
          </div>

          <div className="mt-4 bg-white/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">학습 진행률</span>
              <span className="text-sm font-medium">{completedCount}/{totalQuestions} ({progressPercentage}%)</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions[q.id]).length;
            const isExpanded = expandedTopics[topic.id];

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topic.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length}</span>
                    <span className={`transform transition ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t divide-y">
                    {topic.questions.map((question, qIndex) => {
                      const isCompleted = completedQuestions[question.id];

                      return (
                        <div key={question.id} className="p-4">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleQuestion(question.id)}
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                isCompleted
                                  ? 'bg-orange-500 border-orange-500 text-white'
                                  : 'border-gray-300'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {qIndex + 1}. {question.question}
                              </p>
                              <div className="mt-2 space-y-1">
                                {question.options.map((option, oIndex) => (
                                  <div
                                    key={oIndex}
                                    className={`p-2 rounded text-sm ${
                                      oIndex === question.answer
                                        ? 'bg-orange-100 text-orange-800 font-medium'
                                        : 'bg-gray-50 text-gray-600'
                                    }`}
                                  >
                                    {oIndex + 1}. {option}
                                    {oIndex === question.answer && ' ✓'}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                  <strong>해설:</strong> {question.explanation}
                                </p>
                              </div>
                              <div className="mt-2 flex gap-2">
                                <button
                                  onClick={() => {
                                    const prompt = createAIPrompt(question, true);
                                    copyToClipboard(prompt);
                                    window.open('https://claude.ai', '_blank');
                                  }}
                                  className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition flex items-center gap-1"
                                >
                                  🧡 Claude
                                </button>
                                <button
                                  onClick={() => {
                                    const prompt = createAIPrompt(question, true);
                                    copyToClipboard(prompt);
                                    window.open('https://chat.openai.com', '_blank');
                                  }}
                                  className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition flex items-center gap-1"
                                >
                                  💚 ChatGPT
                                </button>
                                <button
                                  onClick={() => {
                                    const prompt = createAIPrompt(question, true);
                                    copyToClipboard(prompt);
                                    window.open('https://gemini.google.com', '_blank');
                                  }}
                                  className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition flex items-center gap-1"
                                >
                                  💙 Gemini
                                </button>
                              </div>
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

        <div className="mt-6 flex gap-3">
          <Link
            href="/category/chemistry/hazardous-materials/study/general-chemistry"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 일반화학
          </Link>
          <Link
            href="/category/chemistry/hazardous-materials/study/hazardous-properties"
            className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
          >
            위험물의 성질과 취급 →
          </Link>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
