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

export default function GeneralChemistryPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'hm-general-chemistry',
    name: '일반화학',
    icon: '⚗️',
    color: 'from-blue-500 to-indigo-500',
  };

  const topics: Topic[] = [
    {
      id: 'atomic-structure',
      title: '원자와 분자',
      description: '원자의 구조와 분자의 형성',
      icon: '⚛️',
      questions: [
        {
          id: 'as-1',
          question: '원자번호 17인 염소(Cl)의 최외각 전자 수는?',
          options: ['5개', '6개', '7개', '8개'],
          answer: 2,
          explanation: '염소는 17족 원소로 최외각 전자가 7개입니다. (2,8,7 전자배치)',
        },
        {
          id: 'as-2',
          question: '이온결합 화합물의 특징이 아닌 것은?',
          options: ['높은 녹는점', '수용액에서 전기전도', '결정구조', '공유전자쌍 존재'],
          answer: 3,
          explanation: '이온결합은 전자의 이동으로 형성되며, 공유전자쌍은 공유결합의 특징입니다.',
        },
        {
          id: 'as-3',
          question: '다음 중 공유결합 물질은?',
          options: ['NaCl', 'MgO', 'H₂O', 'CaF₂'],
          answer: 2,
          explanation: '물(H₂O)은 수소와 산소가 전자를 공유하여 형성된 공유결합 물질입니다.',
        },
        {
          id: 'as-4',
          question: '원소의 주기율표에서 같은 족 원소의 공통점은?',
          options: ['원자번호', '원자량', '최외각 전자 수', '전자껍질 수'],
          answer: 2,
          explanation: '같은 족 원소는 최외각 전자 수가 같아 화학적 성질이 유사합니다.',
        },
        {
          id: 'as-5',
          question: '분자량이 가장 큰 것은?',
          options: ['H₂O (18)', 'CO₂ (44)', 'NH₃ (17)', 'CH₄ (16)'],
          answer: 1,
          explanation: 'CO₂의 분자량: 12 + 16×2 = 44로 가장 큽니다.',
        },
      ],
    },
    {
      id: 'chemical-reactions',
      title: '화학반응',
      description: '반응의 종류와 반응식',
      icon: '🔄',
      questions: [
        {
          id: 'cr-1',
          question: '산화-환원 반응에서 산화제의 역할은?',
          options: ['전자를 잃음', '전자를 얻음', '수소를 얻음', '산소를 잃음'],
          answer: 1,
          explanation: '산화제는 다른 물질을 산화시키면서 자신은 전자를 얻어 환원됩니다.',
        },
        {
          id: 'cr-2',
          question: '발열반응의 특징은?',
          options: ['에너지 흡수', '주위 온도 하강', '에너지 방출', '반응속도 감소'],
          answer: 2,
          explanation: '발열반응은 에너지를 방출하여 주위 온도가 상승합니다. 연소가 대표적입니다.',
        },
        {
          id: 'cr-3',
          question: 'pH 7보다 작은 수용액의 성질은?',
          options: ['염기성', '중성', '산성', '알칼리성'],
          answer: 2,
          explanation: 'pH 7 미만은 산성, pH 7은 중성, pH 7 초과는 염기성입니다.',
        },
        {
          id: 'cr-4',
          question: '중화반응의 생성물은?',
          options: ['산과 염기', '물과 염', '산화물', '수소가스'],
          answer: 1,
          explanation: '산 + 염기 → 물 + 염 (중화반응). 예: HCl + NaOH → H₂O + NaCl',
        },
        {
          id: 'cr-5',
          question: '촉매의 역할로 옳은 것은?',
          options: ['반응열 증가', '활성화 에너지 감소', '평형상수 변화', '반응물 농도 증가'],
          answer: 1,
          explanation: '촉매는 활성화 에너지를 낮추어 반응속도를 빠르게 하지만, 평형에는 영향을 주지 않습니다.',
        },
      ],
    },
    {
      id: 'solutions',
      title: '용액과 농도',
      description: '용액의 성질과 농도 계산',
      icon: '🧪',
      questions: [
        {
          id: 'sol-1',
          question: '10% NaCl 수용액 200g 중 NaCl의 질량은?',
          options: ['10g', '20g', '50g', '100g'],
          answer: 1,
          explanation: '질량백분율 = (용질/용액)×100, 10% = (x/200)×100, x = 20g',
        },
        {
          id: 'sol-2',
          question: '1M NaOH 용액 1L에 들어있는 NaOH의 몰수는?',
          options: ['0.1mol', '0.5mol', '1mol', '2mol'],
          answer: 2,
          explanation: '몰농도(M) = 몰수/부피(L), 1M = x/1L, x = 1mol',
        },
        {
          id: 'sol-3',
          question: '용해도에 영향을 주는 요인이 아닌 것은?',
          options: ['온도', '압력', '용매의 종류', '용기의 색상'],
          answer: 3,
          explanation: '용해도는 온도, 압력, 용매의 종류에 영향을 받지만 용기 색상과는 무관합니다.',
        },
        {
          id: 'sol-4',
          question: '포화용액에 대한 설명으로 옳은 것은?',
          options: ['더 이상 용질을 녹일 수 없음', '용질이 없음', '온도와 무관', '항상 묽음'],
          answer: 0,
          explanation: '포화용액은 일정 온도에서 용매에 녹을 수 있는 최대량의 용질이 녹아있는 상태입니다.',
        },
        {
          id: 'sol-5',
          question: '끓는점 오름과 관련 없는 것은?',
          options: ['용질의 몰랄농도', '용매의 종류', '용질의 색상', '반트호프 인자'],
          answer: 2,
          explanation: '끓는점 오름은 용질의 몰랄농도와 용매의 종류에 의존하며, 용질의 색상과는 무관합니다.',
        },
      ],
    },
    {
      id: 'gases',
      title: '기체',
      description: '기체의 법칙과 성질',
      icon: '💨',
      questions: [
        {
          id: 'gas-1',
          question: '이상기체 방정식 PV = nRT에서 R은?',
          options: ['온도상수', '압력상수', '기체상수', '부피상수'],
          answer: 2,
          explanation: 'R은 기체상수(8.314 J/mol·K)로, 모든 이상기체에 동일하게 적용됩니다.',
        },
        {
          id: 'gas-2',
          question: '표준상태(STP)에서 1몰의 기체 부피는?',
          options: ['11.2L', '22.4L', '44.8L', '100L'],
          answer: 1,
          explanation: '표준상태(0°C, 1atm)에서 모든 이상기체 1몰의 부피는 22.4L입니다.',
        },
        {
          id: 'gas-3',
          question: '보일의 법칙은 온도가 일정할 때 어떤 관계를 나타내는가?',
          options: ['P와 T 비례', 'V와 T 비례', 'P와 V 반비례', 'P와 V 비례'],
          answer: 2,
          explanation: '보일의 법칙: 온도 일정 시 P₁V₁ = P₂V₂ (압력과 부피는 반비례)',
        },
        {
          id: 'gas-4',
          question: '기체의 확산속도에 관한 그레이엄의 법칙에서 확산속도는 무엇에 반비례하는가?',
          options: ['분자량', '분자량의 제곱근', '온도', '압력'],
          answer: 1,
          explanation: '그레이엄의 법칙: 확산속도 ∝ 1/√M (분자량의 제곱근에 반비례)',
        },
        {
          id: 'gas-5',
          question: '혼합기체에서 각 성분기체의 부분압의 합은?',
          options: ['0', '전체 압력', '전체 압력의 반', '측정 불가'],
          answer: 1,
          explanation: '돌턴의 부분압 법칙: P전체 = P₁ + P₂ + P₃ + ... (부분압의 합 = 전체 압력)',
        },
      ],
    },
    {
      id: 'thermochemistry',
      title: '열화학',
      description: '반응열과 에너지 변화',
      icon: '🔥',
      questions: [
        {
          id: 'tc-1',
          question: '생성열의 정의로 옳은 것은?',
          options: ['분해 시 방출열', '연소 시 발생열', '원소로부터 1몰 생성 시 열', '용해열'],
          answer: 2,
          explanation: '생성열은 표준상태의 원소로부터 화합물 1몰을 생성할 때의 반응열입니다.',
        },
        {
          id: 'tc-2',
          question: '헤스의 법칙이 적용되는 이유는?',
          options: ['반응속도 일정', '엔탈피가 상태함수', '온도 일정', '촉매 사용'],
          answer: 1,
          explanation: '엔탈피는 상태함수이므로 반응 경로와 관계없이 처음과 나중 상태만으로 결정됩니다.',
        },
        {
          id: 'tc-3',
          question: '흡열반응의 ΔH 값은?',
          options: ['양(+)의 값', '음(-)의 값', '0', '측정 불가'],
          answer: 0,
          explanation: '흡열반응은 에너지를 흡수하므로 ΔH > 0 (양의 값)입니다.',
        },
        {
          id: 'tc-4',
          question: '연소열 측정에 사용되는 장치는?',
          options: ['증류기', '봄브 열량계', '전기분해 장치', 'pH미터'],
          answer: 1,
          explanation: '봄브 열량계(bomb calorimeter)는 밀폐용기에서 시료를 완전 연소시켜 연소열을 측정합니다.',
        },
        {
          id: 'tc-5',
          question: '결합 에너지와 반응열의 관계로 옳은 것은?',
          options: ['반응열 = 생성물 결합에너지 - 반응물 결합에너지', '반응열 = 반응물 결합에너지 - 생성물 결합에너지', '관계없음', '항상 같음'],
          answer: 1,
          explanation: 'ΔH = Σ(반응물 결합에너지) - Σ(생성물 결합에너지)',
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
    let prompt = `[위험물산업기사 - 일반화학] 문제:\n${question.question}\n\n`;
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
            href="/category/chemistry/hazardous-materials"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 위험물산업기사 홈
          </Link>
          <Link
            href="/category/chemistry/hazardous-materials/study/fire-prevention"
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
          >
            화재예방과 소화방법 →
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
