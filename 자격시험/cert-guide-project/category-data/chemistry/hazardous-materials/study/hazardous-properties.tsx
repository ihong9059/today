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

export default function HazardousPropertiesPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'hazardous-properties',
    name: '위험물의 성질과 취급',
    icon: '⚠️',
    color: 'from-yellow-500 to-amber-500',
  };

  const topics: Topic[] = [
    {
      id: 'class1',
      title: '제1류 위험물 (산화성 고체)',
      description: '산화성 고체의 성질과 취급',
      icon: '🟡',
      questions: [
        {
          id: 'c1-1',
          question: '제1류 위험물의 공통 성질은?',
          options: ['가연성', '인화성', '산화성', '자연발화성'],
          answer: 2,
          explanation: '제1류 위험물은 산화성 고체로, 다른 물질의 연소를 돕는 산화성이 공통 성질입니다.',
        },
        {
          id: 'c1-2',
          question: '과염소산칼륨(KClO₄)의 지정수량은?',
          options: ['50kg', '300kg', '1000kg', '3000kg'],
          answer: 0,
          explanation: '과염소산칼륨은 제1류 위험물 중 1종으로 지정수량이 50kg입니다.',
        },
        {
          id: 'c1-3',
          question: '제1류 위험물의 저장 시 주의사항이 아닌 것은?',
          options: ['가연물과 격리', '충격 방지', '수분 접촉 권장', '밀봉 저장'],
          answer: 2,
          explanation: '대부분의 제1류 위험물은 수분과 접촉 시 발열하거나 분해될 수 있어 건조하게 저장합니다.',
        },
        {
          id: 'c1-4',
          question: '질산암모늄(NH₄NO₃)의 위험성은?',
          options: ['인화성', '폭발성', '자연발화', '독성'],
          answer: 1,
          explanation: '질산암모늄은 충격, 가열 시 폭발 위험이 있어 폭발물 원료로도 사용됩니다.',
        },
        {
          id: 'c1-5',
          question: '과산화나트륨(Na₂O₂)의 소화 시 주의점은?',
          options: ['물 사용 금지', '포말 사용', '이산화탄소 사용', '질식소화'],
          answer: 0,
          explanation: '과산화나트륨은 물과 반응하여 산소와 열을 발생시키므로 물 사용이 금지됩니다.',
        },
      ],
    },
    {
      id: 'class2',
      title: '제2류 위험물 (가연성 고체)',
      description: '가연성 고체의 성질과 취급',
      icon: '🔴',
      questions: [
        {
          id: 'c2-1',
          question: '제2류 위험물에 해당하지 않는 것은?',
          options: ['황', '적린', '마그네슘', '나트륨'],
          answer: 3,
          explanation: '나트륨은 제3류 위험물(자연발화성·금수성)입니다. 황, 적린, 마그네슘은 제2류입니다.',
        },
        {
          id: 'c2-2',
          question: '철분의 화재 시 적합한 소화방법은?',
          options: ['물 주수', '마른 모래', '이산화탄소', '포말'],
          answer: 1,
          explanation: '금속분 화재(철분 등)는 마른 모래, 팽창질석, 건조분말로 질식소화합니다.',
        },
        {
          id: 'c2-3',
          question: '황의 발화점(약 ℃)은?',
          options: ['100', '200', '360', '500'],
          answer: 2,
          explanation: '황의 발화점은 약 360℃이며, 인화점은 약 232℃입니다.',
        },
        {
          id: 'c2-4',
          question: '적린과 황린의 차이점으로 옳은 것은?',
          options: ['적린이 더 위험', '황린은 자연발화', '같은 위험물류', '적린은 물에 보관'],
          answer: 1,
          explanation: '황린은 자연발화성(제3류), 적린은 가연성 고체(제2류)로 황린이 더 위험합니다.',
        },
        {
          id: 'c2-5',
          question: '마그네슘 분말의 저장 시 주의사항은?',
          options: ['습기 방지', '산소 주입', '가열 보관', '산과 혼합'],
          answer: 0,
          explanation: '마그네슘 분말은 습기와 반응하여 수소를 발생시키므로 건조하게 저장합니다.',
        },
      ],
    },
    {
      id: 'class3',
      title: '제3류 위험물 (자연발화·금수성)',
      description: '자연발화성 및 금수성 물질',
      icon: '🟠',
      questions: [
        {
          id: 'c3-1',
          question: '제3류 위험물의 공통 성질이 아닌 것은?',
          options: ['자연발화성', '금수성', '산화성', '가연성'],
          answer: 2,
          explanation: '제3류 위험물은 자연발화성, 금수성, 가연성이 특징이며 산화성은 제1류 특징입니다.',
        },
        {
          id: 'c3-2',
          question: '나트륨(Na)의 보관 방법은?',
          options: ['물 속', '석유 속', '산소 차단', '냉동'],
          answer: 1,
          explanation: '나트륨은 물과 반응하므로 석유(등유, 경유)에 잠겨 보관합니다.',
        },
        {
          id: 'c3-3',
          question: '황린(P₄)의 저장 방법은?',
          options: ['석유 속', '물 속', '공기 중', '질소 속'],
          answer: 1,
          explanation: '황린은 공기 중에서 자연발화하므로 물 속에 저장합니다.',
        },
        {
          id: 'c3-4',
          question: '칼륨(K)이 물과 반응할 때 발생하는 기체는?',
          options: ['산소', '이산화탄소', '수소', '질소'],
          answer: 2,
          explanation: '2K + 2H₂O → 2KOH + H₂↑. 발생한 수소가 반응열로 발화할 수 있습니다.',
        },
        {
          id: 'c3-5',
          question: '알킬알루미늄의 화재 시 적합한 소화방법은?',
          options: ['물 주수', '마른 모래', 'CO₂', '포말'],
          answer: 1,
          explanation: '알킬알루미늄은 물, CO₂와도 반응하므로 마른 모래, 팽창질석으로 소화합니다.',
        },
      ],
    },
    {
      id: 'class4',
      title: '제4류 위험물 (인화성 액체)',
      description: '인화성 액체의 성질과 취급',
      icon: '🔵',
      questions: [
        {
          id: 'c4-1',
          question: '제4류 위험물의 위험성 판단 기준은?',
          options: ['발화점', '인화점', '비점', '융점'],
          answer: 1,
          explanation: '제4류 위험물은 인화점을 기준으로 특수인화물, 제1석유류, 제2석유류 등으로 구분합니다.',
        },
        {
          id: 'c4-2',
          question: '특수인화물의 인화점 기준은?',
          options: ['0℃ 이하', '-20℃ 이하', '21℃ 미만', '70℃ 미만'],
          answer: 1,
          explanation: '특수인화물은 인화점 -20℃ 이하이고 비점 40℃ 이하인 인화성 액체입니다.',
        },
        {
          id: 'c4-3',
          question: '휘발유의 지정수량은?',
          options: ['50L', '200L', '400L', '1000L'],
          answer: 1,
          explanation: '휘발유는 제1석유류(비수용성)로 지정수량이 200L입니다.',
        },
        {
          id: 'c4-4',
          question: '알코올류의 지정수량은?',
          options: ['200L', '400L', '1000L', '2000L'],
          answer: 1,
          explanation: '알코올류(메탄올, 에탄올 등)의 지정수량은 400L입니다.',
        },
        {
          id: 'c4-5',
          question: '제4류 위험물 화재 시 물 소화가 부적합한 이유는?',
          options: ['물과 반응', '비중이 물보다 작음', '증발 안 됨', '냉각효과 없음'],
          answer: 1,
          explanation: '대부분의 제4류 위험물은 비중이 물보다 작아 물 위에 뜨면서 화재가 확산됩니다.',
        },
      ],
    },
    {
      id: 'class56',
      title: '제5·6류 위험물',
      description: '자기반응성 물질 및 산화성 액체',
      icon: '🟣',
      questions: [
        {
          id: 'c56-1',
          question: '제5류 위험물의 특징은?',
          options: ['산화성', '인화성', '자기반응성', '금수성'],
          answer: 2,
          explanation: '제5류 위험물은 자기반응성 물질로 분자 내에 산소를 함유하여 자기연소합니다.',
        },
        {
          id: 'c56-2',
          question: '다이너마이트의 주성분인 니트로글리세린은 몇 류?',
          options: ['제1류', '제4류', '제5류', '제6류'],
          answer: 2,
          explanation: '니트로글리세린은 제5류 위험물(자기반응성 물질)입니다.',
        },
        {
          id: 'c56-3',
          question: '제5류 위험물의 취급 시 주의사항은?',
          options: ['가열', '충격 방지', '습기 접촉', '산과 혼합'],
          answer: 1,
          explanation: '제5류 위험물은 충격, 마찰, 가열에 민감하므로 충격을 피해야 합니다.',
        },
        {
          id: 'c56-4',
          question: '제6류 위험물의 예는?',
          options: ['질산', '황산', '염산', '과산화수소'],
          answer: 0,
          explanation: '제6류 위험물(산화성 액체)에는 과염소산, 과산화수소, 질산 등이 있습니다.',
        },
        {
          id: 'c56-5',
          question: '제6류 위험물과 혼합 시 위험한 물질은?',
          options: ['물', '질소', '가연물', '불활성 가스'],
          answer: 2,
          explanation: '제6류 위험물(산화성 액체)은 가연물과 접촉 시 발화·폭발 위험이 있습니다.',
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
    let prompt = `[위험물산업기사 - 위험물의 성질과 취급] 문제:\n${question.question}\n\n`;
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
            href="/category/chemistry/hazardous-materials/study/fire-prevention"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 화재예방과 소화방법
          </Link>
          <Link
            href="/category/chemistry/hazardous-materials/study/practical"
            className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
          >
            실기 →
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
