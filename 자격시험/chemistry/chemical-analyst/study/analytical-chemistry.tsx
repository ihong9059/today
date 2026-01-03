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

export default function AnalyticalChemistryPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'analytical-chemistry',
    name: '분석화학',
    icon: '🔬',
    color: 'from-green-500 to-emerald-500',
  };

  const topics: Topic[] = [
    {
      id: 'qualitative-analysis',
      title: '정성분석',
      description: '화학물질의 성분 확인 및 분리',
      icon: '🧫',
      questions: [
        {
          id: 'qa-1',
          question: '제1족 양이온의 침전시약은?',
          options: ['HCl', 'H₂S', 'NH₄OH', 'Na₂CO₃'],
          answer: 0,
          explanation: '제1족 양이온(Ag⁺, Pb²⁺, Hg₂²⁺)은 묽은 HCl로 염화물 침전을 생성합니다.',
        },
        {
          id: 'qa-2',
          question: '불꽃 반응에서 나트륨의 불꽃 색은?',
          options: ['보라색', '노란색', '빨간색', '녹색'],
          answer: 1,
          explanation: '나트륨(Na)은 불꽃 반응에서 특징적인 노란색을 나타냅니다.',
        },
        {
          id: 'qa-3',
          question: '황화물 침전에서 산성 조건으로 침전되는 족은?',
          options: ['제1족', '제2족', '제3족', '제4족'],
          answer: 1,
          explanation: '제2족 양이온(Cu²⁺, Bi³⁺, Cd²⁺ 등)은 산성 황화물 조건에서 침전됩니다.',
        },
        {
          id: 'qa-4',
          question: '마그네시아 혼합물(MgNH₄PO₄)은 어떤 이온의 검출에 사용되는가?',
          options: ['Ca²⁺', 'Ba²⁺', 'NH₄⁺', 'Mg²⁺'],
          answer: 2,
          explanation: '마그네시아 혼합물은 암모늄 이온(NH₄⁺) 검출에 사용되며, 백색 결정성 침전을 형성합니다.',
        },
        {
          id: 'qa-5',
          question: 'K⁺ 이온의 확인 시약으로 사용되는 것은?',
          options: ['염화바륨', '염화백금산', '탄산나트륨', '수산화나트륨'],
          answer: 1,
          explanation: '칼륨 이온은 염화백금산(H₂PtCl₆)과 반응하여 K₂PtCl₆의 노란색 침전을 형성합니다.',
        },
      ],
    },
    {
      id: 'quantitative-analysis',
      title: '정량분석',
      description: '화학물질의 양적 측정',
      icon: '📏',
      questions: [
        {
          id: 'qt-1',
          question: '정량분석에서 시료 채취 시 가장 중요한 것은?',
          options: ['속도', '대표성', '온도', '색상'],
          answer: 1,
          explanation: '시료 채취에서 가장 중요한 것은 대표성입니다. 시료가 전체를 대표해야 정확한 분석이 가능합니다.',
        },
        {
          id: 'qt-2',
          question: '분석값의 정밀도를 나타내는 것은?',
          options: ['평균값', '표준편차', '최대값', '최소값'],
          answer: 1,
          explanation: '표준편차는 측정값들의 산포도를 나타내며, 정밀도의 척도로 사용됩니다.',
        },
        {
          id: 'qt-3',
          question: '유효숫자 처리에서 0.00340의 유효숫자 개수는?',
          options: ['2개', '3개', '4개', '5개'],
          answer: 1,
          explanation: '0.00340에서 앞의 0은 유효숫자가 아니고, 3, 4, 0이 유효숫자로 3개입니다.',
        },
        {
          id: 'qt-4',
          question: '분석 결과의 정확도를 평가하는 방법은?',
          options: ['반복 측정', '표준물질 분석', '온도 보정', '시료 희석'],
          answer: 1,
          explanation: '정확도는 표준물질(인증표준물질) 분석을 통해 평가합니다. 알려진 값과 측정값을 비교합니다.',
        },
        {
          id: 'qt-5',
          question: '계통오차의 특성으로 옳은 것은?',
          options: ['무작위적이다', '일정한 방향으로 발생', '평균으로 상쇄', '예측 불가능'],
          answer: 1,
          explanation: '계통오차(systematic error)는 일정한 방향으로 발생하며, 원인을 파악하면 보정 가능합니다.',
        },
      ],
    },
    {
      id: 'volumetric-analysis',
      title: '용량분석(적정)',
      description: '부피 측정을 통한 정량분석',
      icon: '🧪',
      questions: [
        {
          id: 'va-1',
          question: '산-염기 적정에서 페놀프탈레인의 변색 pH 범위는?',
          options: ['3.1~4.4', '6.0~7.6', '8.0~10.0', '11.0~13.0'],
          answer: 2,
          explanation: '페놀프탈레인은 pH 8.0~10.0에서 무색에서 분홍색으로 변합니다.',
        },
        {
          id: 'va-2',
          question: '0.1N NaOH 용액 25mL로 중화되는 0.1N HCl의 부피는?',
          options: ['12.5mL', '25mL', '50mL', '100mL'],
          answer: 1,
          explanation: 'N₁V₁ = N₂V₂에서 같은 노르말농도이면 같은 부피가 필요합니다. 0.1×25 = 0.1×V₂, V₂=25mL',
        },
        {
          id: 'va-3',
          question: 'KMnO₄ 적정에서 과망간산칼륨의 역할은?',
          options: ['환원제', '산화제', '촉매', '지시약'],
          answer: 1,
          explanation: 'KMnO₄는 강력한 산화제로 작용하며, 자체 색으로 종말점을 지시할 수 있습니다.',
        },
        {
          id: 'va-4',
          question: 'EDTA 적정에서 검출되는 것은?',
          options: ['산-염기', '금속이온', '할로겐', '탄수화물'],
          answer: 1,
          explanation: 'EDTA는 금속이온과 안정한 착화합물을 형성하여 금속이온 정량에 사용됩니다.',
        },
        {
          id: 'va-5',
          question: 'Mohr법에서 사용되는 지시약은?',
          options: ['페놀프탈레인', '메틸오렌지', 'K₂CrO₄', 'EBT'],
          answer: 2,
          explanation: 'Mohr법(염화물 정량)에서는 K₂CrO₄를 지시약으로 사용하여 Ag₂CrO₄의 적갈색 침전으로 종말점을 확인합니다.',
        },
      ],
    },
    {
      id: 'gravimetric-analysis',
      title: '중량분석',
      description: '질량 측정을 통한 정량분석',
      icon: '⚖️',
      questions: [
        {
          id: 'ga-1',
          question: '중량분석에서 침전 조건으로 적절하지 않은 것은?',
          options: ['묽은 용액 사용', '서서히 침전 형성', '급속 냉각', '교반'],
          answer: 2,
          explanation: '급속 냉각은 미세 결정을 형성하여 여과가 어렵고 불순물 혼입 가능성이 높아 부적절합니다.',
        },
        {
          id: 'ga-2',
          question: 'BaSO₄ 침전에서 공침의 원인이 아닌 것은?',
          options: ['흡착', '포접', '고용체 형성', '산화'],
          answer: 3,
          explanation: '공침의 원인은 흡착, 포접, 고용체 형성 등이며, 산화는 공침과 관련이 없습니다.',
        },
        {
          id: 'ga-3',
          question: '회화(ignition)의 목적으로 옳은 것은?',
          options: ['침전 용해', '불순물 제거 및 안정한 형태 전환', '결정 성장', '여과 용이'],
          answer: 1,
          explanation: '회화는 침전을 가열하여 수분 및 휘발성 불순물을 제거하고 안정한 칭량형으로 전환하는 과정입니다.',
        },
        {
          id: 'ga-4',
          question: '중량분석에서 중량인자(gravimetric factor)의 정의는?',
          options: ['시료 무게', '침전물 무게', '목적성분/칭량형의 분자량비', '불순물 함량'],
          answer: 2,
          explanation: '중량인자 = (목적성분의 분자량 × n) / (칭량형의 분자량)으로 정의됩니다.',
        },
        {
          id: 'ga-5',
          question: '숙성(digestion)의 효과가 아닌 것은?',
          options: ['결정 성장', '불순물 감소', '침전 순도 향상', '침전량 증가'],
          answer: 3,
          explanation: '숙성은 결정을 성장시키고 불순물을 감소시켜 순도를 향상시키지만, 침전량 자체를 증가시키지는 않습니다.',
        },
      ],
    },
    {
      id: 'separation-methods',
      title: '분리분석',
      description: '시료의 분리 및 정제 기술',
      icon: '🔄',
      questions: [
        {
          id: 'sm-1',
          question: '용매추출에서 분배계수(D)의 정의는?',
          options: ['유기층 농도/수층 농도', '수층 농도/유기층 농도', '총 농도/초기 농도', '추출률'],
          answer: 0,
          explanation: '분배계수(D) = 유기층 내 용질 농도 / 수층 내 용질 농도',
        },
        {
          id: 'sm-2',
          question: '이온교환 크로마토그래피에서 양이온 교환수지의 작용기는?',
          options: ['-NH₂', '-COOH 또는 -SO₃H', '-OH', '-CN'],
          answer: 1,
          explanation: '양이온 교환수지는 -COOH(약산성) 또는 -SO₃H(강산성) 작용기를 가집니다.',
        },
        {
          id: 'sm-3',
          question: '한 번 추출로 90%를 추출할 때 D값은? (부피비 1:1)',
          options: ['1', '3', '9', '90'],
          answer: 2,
          explanation: '추출률 E = D/(D+1) = 0.9에서 D = 9',
        },
        {
          id: 'sm-4',
          question: '증류에서 비점이 가까운 혼합물 분리에 적합한 방법은?',
          options: ['단순증류', '분별증류', '수증기증류', '감압증류'],
          answer: 1,
          explanation: '분별증류는 여러 단의 평형을 통해 비점이 가까운 혼합물도 효과적으로 분리할 수 있습니다.',
        },
        {
          id: 'sm-5',
          question: '전기영동의 분리 원리는?',
          options: ['밀도 차이', '전하와 크기 차이', '비점 차이', '용해도 차이'],
          answer: 1,
          explanation: '전기영동은 전기장에서 이온의 전하량과 크기에 따른 이동 속도 차이로 분리합니다.',
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
    let prompt = `[화학분석기사 - 분석화학] 문제:\n${question.question}\n\n`;
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
            <Link href="/" className="text-gray-600 hover:text-green-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-green-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry/chemical-analyst" className="text-gray-600 hover:text-green-600">화학분석기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">{subject.name}</span>
          </nav>
        </div>
      </header>

      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{subject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{subject.name}</h1>
              <p className="text-white/80">화학분석기사 필기시험</p>
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
                                  ? 'bg-green-500 border-green-500 text-white'
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
                                        ? 'bg-green-100 text-green-800 font-medium'
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
            href="/category/chemistry/chemical-analyst"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 화학분석기사 홈
          </Link>
          <Link
            href="/category/chemistry/chemical-analyst/study/instrumental-analysis"
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
          >
            기기분석 →
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
