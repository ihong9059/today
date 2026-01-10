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

export default function PracticalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'practical',
    name: '실기',
    icon: '🧪',
    color: 'from-orange-500 to-red-500',
  };

  const topics: Topic[] = [
    {
      id: 'sample-preparation',
      title: '시료 전처리',
      description: '분석 시료의 준비 및 처리',
      icon: '🧫',
      questions: [
        {
          id: 'prep-1',
          question: '고체 시료를 용액으로 만드는 과정에서 질산 분해의 특징은?',
          options: ['환원성', '산화분해에 효과적', '유기물 분해 불가', '저온에서 진행'],
          answer: 1,
          explanation: '질산(HNO₃)은 강한 산화력을 가져 금속 및 유기물 분해에 효과적입니다.',
        },
        {
          id: 'prep-2',
          question: '회화(ashing) 시 온도가 너무 높으면 발생하는 문제는?',
          options: ['분해 불완전', '휘발성 원소 손실', '분석 시간 증가', '시료 팽창'],
          answer: 1,
          explanation: '고온 회화 시 As, Cd, Pb 등 휘발성 원소가 손실될 수 있어 적정 온도 유지가 중요합니다.',
        },
        {
          id: 'prep-3',
          question: '마이크로파 분해의 장점이 아닌 것은?',
          options: ['빠른 분해', '시약 사용량 감소', '밀폐용기 사용', '대용량 처리'],
          answer: 3,
          explanation: '마이크로파 분해는 밀폐 용기에서 진행하므로 대용량 처리에는 제한이 있습니다.',
        },
        {
          id: 'prep-4',
          question: '수질 시료 보존 시 질산을 첨가하는 이유는?',
          options: ['pH 상승', '미생물 활동 억제 및 금속 용해 유지', '색 변화 방지', '산화 방지'],
          answer: 1,
          explanation: '질산 첨가는 pH를 낮춰 금속이온의 침전을 방지하고 미생물 활동을 억제합니다.',
        },
        {
          id: 'prep-5',
          question: '여과 시 막필터의 공극 크기로 일반적으로 사용되는 것은?',
          options: ['0.1mm', '0.45μm', '10μm', '1nm'],
          answer: 1,
          explanation: '0.45μm 막필터는 부유물질과 미생물을 제거하는 표준 여과 규격입니다.',
        },
      ],
    },
    {
      id: 'titration',
      title: '적정 분석',
      description: '용량 분석 실무',
      icon: '🔬',
      questions: [
        {
          id: 'tit-1',
          question: 'NaOH 표준용액 표정에 사용되는 1차 표준물질은?',
          options: ['HCl', '프탈산수소칼륨(KHP)', 'NaCl', '옥살산'],
          answer: 1,
          explanation: '프탈산수소칼륨(KHP)은 순도가 높고 안정하여 NaOH 표정의 1차 표준물질로 사용됩니다.',
        },
        {
          id: 'tit-2',
          question: '0.1M NaOH 1L 조제 시 필요한 NaOH의 질량은? (NaOH=40)',
          options: ['2g', '4g', '40g', '400g'],
          answer: 1,
          explanation: '0.1mol × 40g/mol = 4g의 NaOH가 필요합니다.',
        },
        {
          id: 'tit-3',
          question: 'EDTA 적정에서 금속지시약 EBT의 색 변화는?',
          options: ['무색→분홍', '적색→청색', '청색→적색', '황색→녹색'],
          answer: 1,
          explanation: 'EBT(Eriochrome Black T)는 금속과 결합시 적색, 유리상태에서 청색을 나타냅니다.',
        },
        {
          id: 'tit-4',
          question: '역적정(back titration)을 사용하는 경우는?',
          options: ['반응이 빠를 때', '종말점이 뚜렷할 때', '시료 반응이 느릴 때', '시료가 액체일 때'],
          answer: 2,
          explanation: '역적정은 직접 적정이 어렵거나 반응이 느린 경우, 과량의 시약을 가하고 남은 양을 적정합니다.',
        },
        {
          id: 'tit-5',
          question: '적정 시 뷰렛 눈금을 읽는 올바른 방법은?',
          options: ['위에서 아래로', '메니스커스 상단 기준', '메니스커스 하단 기준', '아무 위치나'],
          answer: 2,
          explanation: '투명한 용액의 경우 메니스커스(오목한 액면)의 가장 낮은 점을 기준으로 읽습니다.',
        },
      ],
    },
    {
      id: 'instrumental-practice',
      title: '기기 분석 실무',
      description: '분석기기 조작 및 측정',
      icon: '📊',
      questions: [
        {
          id: 'inst-1',
          question: 'UV-Vis 측정 시 큐벳의 올바른 취급법은?',
          options: ['투과면을 손으로 잡음', '광학면을 티슈로 닦음', '광학면을 손으로 잡지 않음', '물로 세척 후 바로 사용'],
          answer: 2,
          explanation: '큐벳의 광학면(투과면)은 지문이 묻지 않도록 손으로 잡지 않아야 합니다.',
        },
        {
          id: 'inst-2',
          question: 'GC 분석에서 시료 주입 시 주의사항은?',
          options: ['천천히 주입', '빠르고 정확하게 주입', '공기 함께 주입', '주사기 가열'],
          answer: 1,
          explanation: 'GC 시료 주입은 재현성을 위해 빠르고 일정하게 주입해야 합니다.',
        },
        {
          id: 'inst-3',
          question: 'AAS 분석 시 표준용액 검정곡선의 상관계수(R²)는 최소 얼마 이상이어야 하는가?',
          options: ['0.90', '0.95', '0.99', '1.00'],
          answer: 2,
          explanation: '일반적으로 정량 분석의 검정곡선은 R² ≥ 0.99 이상을 요구합니다.',
        },
        {
          id: 'inst-4',
          question: 'HPLC 이동상 사용 전 반드시 해야 하는 것은?',
          options: ['가열', '탈기(degassing)', '착색', '희석'],
          answer: 1,
          explanation: '용존 가스는 기포를 형성하여 검출기 신호에 영향을 주므로 탈기가 필요합니다.',
        },
        {
          id: 'inst-5',
          question: '기기분석에서 바탕시험(blank test)의 목적은?',
          options: ['시료 농도 측정', '기기 오염 측정', '시약 및 용기로 인한 오염 확인', '온도 측정'],
          answer: 2,
          explanation: '바탕시험은 시료 외 요인(시약, 용기, 환경)에 의한 오염이나 간섭을 확인합니다.',
        },
      ],
    },
    {
      id: 'data-analysis',
      title: '데이터 분석 및 보고서',
      description: '분석 결과 처리 및 품질관리',
      icon: '📝',
      questions: [
        {
          id: 'data-1',
          question: '분석 결과 23.456에서 유효숫자 3자리로 표현하면?',
          options: ['23.4', '23.5', '23.456', '24.0'],
          answer: 1,
          explanation: '23.456을 유효숫자 3자리로 반올림하면 23.5입니다.',
        },
        {
          id: 'data-2',
          question: '검출한계(LOD)의 일반적 정의는?',
          options: ['S/N = 1', 'S/N = 3', 'S/N = 10', 'S/N = 100'],
          answer: 1,
          explanation: '검출한계(LOD)는 일반적으로 신호 대 잡음비(S/N) = 3으로 정의합니다.',
        },
        {
          id: 'data-3',
          question: '정량한계(LOQ)의 일반적 정의는?',
          options: ['S/N = 3', 'S/N = 5', 'S/N = 10', 'S/N = 20'],
          answer: 2,
          explanation: '정량한계(LOQ)는 일반적으로 S/N = 10으로 정의하며, 정확한 정량이 가능한 최소 농도입니다.',
        },
        {
          id: 'data-4',
          question: '분석 결과의 정확도를 평가하는 방법은?',
          options: ['반복 측정의 표준편차', '인증표준물질(CRM) 분석', '검정곡선 기울기', '검출한계 측정'],
          answer: 1,
          explanation: '정확도는 인증표준물질(CRM)을 분석하여 인증값과 측정값을 비교하여 평가합니다.',
        },
        {
          id: 'data-5',
          question: '관리도(control chart)에서 경고한계선은 일반적으로?',
          options: ['±1σ', '±2σ', '±3σ', '±4σ'],
          answer: 1,
          explanation: '관리도에서 경고한계는 ±2σ, 조치한계(관리한계)는 ±3σ로 설정합니다.',
        },
      ],
    },
    {
      id: 'safety',
      title: '안전 관리',
      description: '실험실 안전 및 폐기물 관리',
      icon: '⚠️',
      questions: [
        {
          id: 'safe-1',
          question: '산과 염기가 눈에 들어갔을 때 응급처치는?',
          options: ['문지른다', '15분 이상 물로 세척', '중화제 사용', '안대 착용'],
          answer: 1,
          explanation: '화학물질이 눈에 들어가면 즉시 15분 이상 흐르는 물로 세척하고 의료진 처치를 받습니다.',
        },
        {
          id: 'safe-2',
          question: '유기용매 화재 시 사용해야 할 소화기는?',
          options: ['물 소화기', 'CO₂ 또는 분말 소화기', '모래만', '없음'],
          answer: 1,
          explanation: '유기용매 화재는 B급 화재로, CO₂ 또는 분말 소화기를 사용합니다. 물은 부적합합니다.',
        },
        {
          id: 'safe-3',
          question: '폐산과 폐알칼리의 올바른 처리 방법은?',
          options: ['혼합 후 버림', '별도 수집 후 중화처리', '하수구 배출', '증발 건조'],
          answer: 1,
          explanation: '폐산과 폐알칼리는 별도 수집하여 중화처리하거나 전문업체에 위탁처리합니다.',
        },
        {
          id: 'safe-4',
          question: 'MSDS(물질안전보건자료)에서 확인할 수 없는 정보는?',
          options: ['유해성', '응급조치', '구매가격', '폐기방법'],
          answer: 2,
          explanation: 'MSDS는 화학물질의 유해성, 취급방법, 응급조치, 폐기방법 등을 포함하지만 가격정보는 없습니다.',
        },
        {
          id: 'safe-5',
          question: '실험실에서 흄후드(fume hood) 사용 목적은?',
          options: ['보관', '유해가스 배출', '건조', '냉각'],
          answer: 1,
          explanation: '흄후드는 실험 중 발생하는 유해가스, 증기를 외부로 배출하여 작업자를 보호합니다.',
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
    let prompt = `[화학분석기사 - 실기] 문제:\n${question.question}\n\n`;
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
              <p className="text-white/80">화학분석기사 실기시험</p>
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
            href="/category/chemistry/chemical-analyst/study/environmental-chemistry"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 환경화학
          </Link>
          <Link
            href="/category/chemistry/chemical-analyst"
            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
          >
            화학분석기사 홈 →
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
