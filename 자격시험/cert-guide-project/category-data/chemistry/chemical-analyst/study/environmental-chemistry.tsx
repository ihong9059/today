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

export default function EnvironmentalChemistryPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'environmental-chemistry',
    name: '환경화학',
    icon: '🌿',
    color: 'from-teal-500 to-cyan-500',
  };

  const topics: Topic[] = [
    {
      id: 'air-pollution',
      title: '대기화학',
      description: '대기오염물질과 화학반응',
      icon: '💨',
      questions: [
        {
          id: 'ap-1',
          question: '광화학 스모그의 주요 생성물질은?',
          options: ['CO', 'SO₂', 'O₃', 'NH₃'],
          answer: 2,
          explanation: '광화학 스모그에서 NOx와 VOCs가 자외선과 반응하여 오존(O₃)을 생성합니다.',
        },
        {
          id: 'ap-2',
          question: '산성비의 주요 원인 물질이 아닌 것은?',
          options: ['SO₂', 'NOx', 'CO₂', 'HCl'],
          answer: 2,
          explanation: 'CO₂는 약산성을 띠지만 산성비의 주요 원인은 SO₂, NOx가 산화되어 생성되는 황산, 질산입니다.',
        },
        {
          id: 'ap-3',
          question: '오존층 파괴물질로 알려진 것은?',
          options: ['CO₂', 'CFCs', 'N₂O', 'CH₄'],
          answer: 1,
          explanation: '염화불화탄소(CFCs)는 성층권에서 자외선에 의해 분해되어 염소 라디칼을 생성, 오존을 파괴합니다.',
        },
        {
          id: 'ap-4',
          question: 'PM2.5의 정의로 옳은 것은?',
          options: ['입자 크기 2.5mm 이하', '입자 크기 2.5μm 이하', '입자 농도 2.5ppm', '입자 질량 2.5g'],
          answer: 1,
          explanation: 'PM2.5는 공기역학적 직경이 2.5μm(마이크로미터) 이하인 미세먼지를 의미합니다.',
        },
        {
          id: 'ap-5',
          question: '온실가스 중 지구온난화지수(GWP)가 가장 높은 것은?',
          options: ['CO₂', 'CH₄', 'N₂O', 'SF₆'],
          answer: 3,
          explanation: 'SF₆(육불화황)의 GWP는 약 23,900으로, CO₂(1)에 비해 매우 높습니다.',
        },
      ],
    },
    {
      id: 'water-pollution',
      title: '수질화학',
      description: '수질오염과 수처리 화학',
      icon: '💧',
      questions: [
        {
          id: 'wp-1',
          question: 'BOD가 측정하는 것은?',
          options: ['용존산소량', '생물학적 산소요구량', '화학적 산소요구량', 'pH'],
          answer: 1,
          explanation: 'BOD(Biochemical Oxygen Demand)는 미생물이 유기물을 분해할 때 필요한 산소량을 측정합니다.',
        },
        {
          id: 'wp-2',
          question: '부영양화의 주요 원인 영양소는?',
          options: ['탄소, 수소', '질소, 인', '칼슘, 마그네슘', '철, 망간'],
          answer: 1,
          explanation: '부영양화는 질소(N)와 인(P)의 과다 유입으로 조류가 대량 번식하는 현상입니다.',
        },
        {
          id: 'wp-3',
          question: '정수처리에서 응집제로 주로 사용되는 것은?',
          options: ['NaCl', 'Al₂(SO₄)₃', 'CaCO₃', 'NaOH'],
          answer: 1,
          explanation: '황산알루미늄 Al₂(SO₄)₃(명반)은 콜로이드 입자를 응집시키는 대표적 응집제입니다.',
        },
        {
          id: 'wp-4',
          question: '수질 지표 중 DO(용존산소)가 높을수록?',
          options: ['수질이 나쁨', '수질이 좋음', '유기물 많음', 'pH 낮음'],
          answer: 1,
          explanation: '용존산소(DO)가 높으면 수생생물이 살기 좋은 환경이므로 수질이 좋다고 판단합니다.',
        },
        {
          id: 'wp-5',
          question: '염소 소독의 단점으로 발생하는 부산물은?',
          options: ['암모니아', '트리할로메탄(THMs)', '과산화수소', '오존'],
          answer: 1,
          explanation: '염소 소독 시 유기물과 반응하여 발암성 물질인 트리할로메탄(THMs)이 생성될 수 있습니다.',
        },
      ],
    },
    {
      id: 'soil-pollution',
      title: '토양화학',
      description: '토양오염과 복원 화학',
      icon: '🌱',
      questions: [
        {
          id: 'sp-1',
          question: '토양의 양이온교환용량(CEC)에 영향을 주는 주요 인자는?',
          options: ['토양 색상', '점토와 유기물 함량', '토양 온도', '강수량'],
          answer: 1,
          explanation: 'CEC는 점토 광물과 유기물의 표면 전하에 의해 결정되므로, 이들의 함량이 중요합니다.',
        },
        {
          id: 'sp-2',
          question: '중금속 오염토양 복원에 사용되는 식물정화법은?',
          options: ['소각', 'phytoremediation', '매립', '희석'],
          answer: 1,
          explanation: 'Phytoremediation(식물정화)은 식물을 이용해 중금속을 흡수·축적·분해하는 친환경 복원법입니다.',
        },
        {
          id: 'sp-3',
          question: '토양 pH가 낮을 때 용해도가 증가하는 중금속은?',
          options: ['대부분의 중금속', 'As(비소)만', 'Cr(크롬)만', '없음'],
          answer: 0,
          explanation: '토양 pH가 낮아지면(산성) 대부분의 중금속 양이온의 용해도가 증가하여 이동성이 커집니다.',
        },
        {
          id: 'sp-4',
          question: '유류오염 토양의 생물학적 복원에 필요한 조건이 아닌 것은?',
          options: ['산소', '영양분(N, P)', '적정 수분', '고온(100°C 이상)'],
          answer: 3,
          explanation: '생물학적 복원(bioremediation)은 미생물 활동에 적합한 온도(보통 20-40°C)가 필요합니다.',
        },
        {
          id: 'sp-5',
          question: '토양오염 복원 중 현장처리(in-situ)의 장점은?',
          options: ['처리 속도 빠름', '토양 이동 불필요', '모든 오염에 적용', '비용 높음'],
          answer: 1,
          explanation: '현장처리는 오염토양을 굴착·이동하지 않고 처리하므로 비용과 교란을 줄일 수 있습니다.',
        },
      ],
    },
    {
      id: 'waste-management',
      title: '폐기물화학',
      description: '폐기물 처리와 자원화',
      icon: '♻️',
      questions: [
        {
          id: 'wm-1',
          question: '폐기물 소각 시 발생하는 다이옥신을 저감하는 조건은?',
          options: ['저온(300°C) 연소', '고온(850°C 이상) 완전연소', '불완전연소', '저산소 연소'],
          answer: 1,
          explanation: '다이옥신은 고온(850°C 이상)에서 완전연소시키고, 급랭하여 저감할 수 있습니다.',
        },
        {
          id: 'wm-2',
          question: '매립지 침출수의 특성으로 옳지 않은 것은?',
          options: ['높은 BOD', '높은 중금속', 'pH 중성으로 일정', '암모니아성 질소 함유'],
          answer: 2,
          explanation: '침출수의 pH는 매립 단계에 따라 산성~알칼리성까지 변동하며 일정하지 않습니다.',
        },
        {
          id: 'wm-3',
          question: '유해폐기물 안정화에 시멘트를 사용하는 이유는?',
          options: ['부피 감소', '중금속 고정화', '발열량 증가', '악취 제거'],
          answer: 1,
          explanation: '시멘트 안정화/고화는 중금속을 시멘트 매트릭스에 고정하여 용출을 방지합니다.',
        },
        {
          id: 'wm-4',
          question: '폐기물 에너지화(WtE)의 예가 아닌 것은?',
          options: ['소각발전', '매립가스 회수', '열분해', '단순매립'],
          answer: 3,
          explanation: '단순매립은 폐기물을 묻는 것으로, 에너지 회수가 없는 처분 방법입니다.',
        },
        {
          id: 'wm-5',
          question: '재활용 가능한 폐플라스틱 분류 기호 중 PET의 번호는?',
          options: ['1', '2', '4', '5'],
          answer: 0,
          explanation: 'PET(폴리에틸렌 테레프탈레이트)는 재활용 분류 번호 1번입니다.',
        },
      ],
    },
    {
      id: 'environmental-monitoring',
      title: '환경측정분석',
      description: '환경오염물질 분석 기법',
      icon: '📡',
      questions: [
        {
          id: 'em-1',
          question: '대기오염물질 시료채취 중 흡수법에 사용되는 것은?',
          options: ['필터', '임핀저', '캐니스터', '흡착관'],
          answer: 1,
          explanation: '임핀저(impinger)는 가스상 오염물질을 흡수액에 용해시켜 채취하는 장치입니다.',
        },
        {
          id: 'em-2',
          question: '수질 중 미량 중금속 분석에 적합한 기기는?',
          options: ['UV-Vis', 'ICP-MS', 'IR', 'GC'],
          answer: 1,
          explanation: 'ICP-MS는 ppb~ppt 수준의 미량 중금속을 다원소 동시 분석할 수 있습니다.',
        },
        {
          id: 'em-3',
          question: '휘발성유기화합물(VOCs) 분석에 주로 사용되는 기기는?',
          options: ['AAS', 'HPLC', 'GC', 'IC'],
          answer: 2,
          explanation: 'GC(가스크로마토그래피)는 휘발성 화합물 분리·분석에 적합합니다.',
        },
        {
          id: 'em-4',
          question: '환경시료 전처리 중 산분해의 목적은?',
          options: ['희석', '금속 용해', '유기물 제거', '침전'],
          answer: 1,
          explanation: '산분해는 고체 시료 중 금속을 산으로 용해시켜 용액 상태로 만드는 전처리 과정입니다.',
        },
        {
          id: 'em-5',
          question: '수질 COD 측정에서 산화제로 사용되는 것은?',
          options: ['과산화수소', 'KMnO₄ 또는 K₂Cr₂O₇', '오존', '염소'],
          answer: 1,
          explanation: 'COD 측정은 과망간산칼륨(CODMn) 또는 중크롬산칼륨(CODCr)을 산화제로 사용합니다.',
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
    let prompt = `[화학분석기사 - 환경화학] 문제:\n${question.question}\n\n`;
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
            href="/category/chemistry/chemical-analyst/study/instrumental-analysis"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 기기분석
          </Link>
          <Link
            href="/category/chemistry/chemical-analyst/study/practical"
            className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
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
