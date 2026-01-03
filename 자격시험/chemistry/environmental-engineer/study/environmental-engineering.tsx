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

export default function EnvironmentalEngineeringPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'environmental-engineering',
    name: '환경공학개론',
    icon: '🌍',
    color: 'from-teal-500 to-green-500',
  };

  const topics: Topic[] = [
    {
      id: 'environmental-science',
      title: '환경과학 기초',
      description: '환경의 개념과 생태계',
      icon: '🌱',
      questions: [
        {
          id: 'es-1',
          question: '생태계의 구성요소 중 비생물적 요소가 아닌 것은?',
          options: ['빛', '물', '분해자', '토양'],
          answer: 2,
          explanation: '분해자는 생물적 요소입니다. 비생물적 요소는 빛, 물, 토양, 온도, 공기 등입니다.',
        },
        {
          id: 'es-2',
          question: '먹이사슬에서 에너지 전달 효율은 약 몇 %인가?',
          options: ['1%', '10%', '50%', '90%'],
          answer: 1,
          explanation: '먹이사슬에서 각 단계별 에너지 전달 효율은 약 10%(10% 법칙)입니다.',
        },
        {
          id: 'es-3',
          question: '지구온난화의 주요 원인 물질은?',
          options: ['N₂', 'O₂', 'CO₂', 'Ar'],
          answer: 2,
          explanation: '이산화탄소(CO₂)는 대표적인 온실가스로 지구온난화의 주요 원인입니다.',
        },
        {
          id: 'es-4',
          question: '생물농축(bioaccumulation)이 잘 일어나는 물질의 특성은?',
          options: ['수용성', '지용성', '휘발성', '분해성'],
          answer: 1,
          explanation: '지용성 물질(DDT, PCB 등)은 생체 지방조직에 축적되어 생물농축이 잘 일어납니다.',
        },
        {
          id: 'es-5',
          question: '부영양화의 주요 원인 영양소는?',
          options: ['탄소, 수소', '질소, 인', '칼슘, 마그네슘', '철, 망간'],
          answer: 1,
          explanation: '질소(N)와 인(P)의 과다 유입이 부영양화의 주요 원인입니다.',
        },
      ],
    },
    {
      id: 'environmental-pollution',
      title: '환경오염 개론',
      description: '환경오염의 종류와 영향',
      icon: '🏭',
      questions: [
        {
          id: 'ep-1',
          question: '1차 오염물질에 해당하는 것은?',
          options: ['오존', '광화학 스모그', 'SO₂', 'PAN'],
          answer: 2,
          explanation: 'SO₂는 오염원에서 직접 배출되는 1차 오염물질입니다. 오존, PAN은 2차 오염물질입니다.',
        },
        {
          id: 'ep-2',
          question: 'BOD와 COD의 관계로 옳은 것은?',
          options: ['BOD > COD (항상)', 'BOD < COD (일반적)', 'BOD = COD', '관계없음'],
          answer: 1,
          explanation: '일반적으로 COD ≥ BOD입니다. COD는 화학적으로 산화 가능한 모든 물질을 측정합니다.',
        },
        {
          id: 'ep-3',
          question: '수질오염 지표 중 용존산소(DO)가 높으면?',
          options: ['수질 나쁨', '수질 좋음', '오염 심함', '유기물 많음'],
          answer: 1,
          explanation: 'DO가 높으면 수생생물이 살기 좋은 환경으로 수질이 좋다고 판단합니다.',
        },
        {
          id: 'ep-4',
          question: 'PM2.5의 주요 건강 영향은?',
          options: ['피부 자극', '호흡기·심혈관 질환', '소화기 장애', '청력 손실'],
          answer: 1,
          explanation: 'PM2.5는 입자 크기가 작아 폐 깊숙이 침투하여 호흡기·심혈관 질환을 유발합니다.',
        },
        {
          id: 'ep-5',
          question: '소음의 단위는?',
          options: ['Hz', 'dB', 'ppm', 'mg/L'],
          answer: 1,
          explanation: '소음의 크기는 dB(데시벨) 단위로 측정합니다. Hz는 주파수 단위입니다.',
        },
      ],
    },
    {
      id: 'environmental-chemistry',
      title: '환경화학',
      description: '환경 중 화학반응',
      icon: '⚗️',
      questions: [
        {
          id: 'ec-1',
          question: 'pH 5인 산성비의 H⁺ 농도는?',
          options: ['10⁻³ M', '10⁻⁴ M', '10⁻⁵ M', '10⁻⁶ M'],
          answer: 2,
          explanation: 'pH = -log[H⁺]이므로 pH 5 = 10⁻⁵ M',
        },
        {
          id: 'ec-2',
          question: '물의 자정작용 중 희석이 속하는 것은?',
          options: ['물리적 자정', '화학적 자정', '생물학적 자정', '기계적 자정'],
          answer: 0,
          explanation: '희석, 침전, 확산 등은 물리적 자정작용입니다.',
        },
        {
          id: 'ec-3',
          question: '탄소의 순환과정에서 CO₂가 고정되는 과정은?',
          options: ['호흡', '광합성', '연소', '분해'],
          answer: 1,
          explanation: '광합성에서 CO₂가 유기물로 고정됩니다: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
        },
        {
          id: 'ec-4',
          question: '질소순환에서 질산화(nitrification)는?',
          options: ['N₂ → NH₃', 'NH₃ → NO₃⁻', 'NO₃⁻ → N₂', '유기N → NH₃'],
          answer: 1,
          explanation: '질산화는 암모니아가 아질산염을 거쳐 질산염으로 산화되는 과정입니다.',
        },
        {
          id: 'ec-5',
          question: '수질의 완충능력과 관련된 것은?',
          options: ['DO', 'BOD', '알칼리도', 'SS'],
          answer: 2,
          explanation: '알칼리도는 산을 중화시키는 능력으로 수질의 완충능력을 나타냅니다.',
        },
      ],
    },
    {
      id: 'environmental-microbiology',
      title: '환경미생물학',
      description: '환경 중 미생물의 역할',
      icon: '🦠',
      questions: [
        {
          id: 'em-1',
          question: '호기성 분해에서 최종 전자수용체는?',
          options: ['NO₃⁻', 'SO₄²⁻', 'O₂', 'CO₂'],
          answer: 2,
          explanation: '호기성 분해에서는 산소(O₂)가 최종 전자수용체입니다.',
        },
        {
          id: 'em-2',
          question: '활성슬러지 공법에서 주로 작용하는 미생물은?',
          options: ['바이러스', '세균', '곰팡이', '조류'],
          answer: 1,
          explanation: '활성슬러지에서는 호기성 세균이 유기물 분해의 주역할을 합니다.',
        },
        {
          id: 'em-3',
          question: '혐기성 소화에서 메탄 생성 단계의 생성물은?',
          options: ['유기산', '알코올', 'CH₄ + CO₂', 'NH₃'],
          answer: 2,
          explanation: '메탄생성균에 의해 아세트산 등이 CH₄와 CO₂로 전환됩니다.',
        },
        {
          id: 'em-4',
          question: '질소제거 공정 중 탈질소화에 필요한 조건은?',
          options: ['호기성', '혐기성', '무산소', '고온'],
          answer: 2,
          explanation: '탈질소화는 무산소 조건에서 NO₃⁻가 N₂로 환원되는 과정입니다.',
        },
        {
          id: 'em-5',
          question: '대장균군이 수질지표로 사용되는 이유는?',
          options: ['독성', '분변오염 지표', '영양소', '색도'],
          answer: 1,
          explanation: '대장균군은 분변오염의 지표로 사용되어 병원성 미생물 오염 가능성을 나타냅니다.',
        },
      ],
    },
    {
      id: 'environmental-management',
      title: '환경관리',
      description: '환경정책과 관리',
      icon: '📋',
      questions: [
        {
          id: 'mg-1',
          question: '환경영향평가의 목적이 아닌 것은?',
          options: ['사전예방', '의사결정 지원', '사업 승인', '환경보전'],
          answer: 2,
          explanation: '환경영향평가는 환경영향을 예측·평가하여 환경보전에 기여하는 것이 목적이며, 사업 승인 자체가 목적은 아닙니다.',
        },
        {
          id: 'mg-2',
          question: 'ISO 14001은 무엇에 관한 규격인가?',
          options: ['품질경영', '환경경영', '안전보건', '에너지경영'],
          answer: 1,
          explanation: 'ISO 14001은 환경경영시스템(EMS)에 관한 국제규격입니다.',
        },
        {
          id: 'mg-3',
          question: '배출권 거래제의 기본 원리는?',
          options: ['명령통제', '시장원리', '자발적 협약', '정보공개'],
          answer: 1,
          explanation: '배출권 거래제는 배출권의 매매를 통해 시장원리로 오염을 저감하는 제도입니다.',
        },
        {
          id: 'mg-4',
          question: '청정생산(Cleaner Production)의 핵심은?',
          options: ['사후처리', '사전예방', '희석방류', '매립'],
          answer: 1,
          explanation: '청정생산은 생산과정에서 오염물질 발생을 사전에 예방하는 것이 핵심입니다.',
        },
        {
          id: 'mg-5',
          question: '오염자 부담 원칙(PPP)의 의미는?',
          options: ['국가 부담', '수혜자 부담', '오염 발생자가 처리비용 부담', '무료 처리'],
          answer: 2,
          explanation: 'PPP(Polluter Pays Principle)는 오염을 발생시킨 자가 처리비용을 부담해야 한다는 원칙입니다.',
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
    let prompt = `[환경기사 - 환경공학개론] 문제:\n${question.question}\n\n`;
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
            <Link href="/" className="text-gray-600 hover:text-teal-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry" className="text-gray-600 hover:text-teal-600">화학·환경</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/chemistry/environmental-engineer" className="text-gray-600 hover:text-teal-600">환경기사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">{subject.name}</span>
          </nav>
        </div>
      </header>

      <section className={`bg-gradient-to-r ${subject.color} text-white py-8`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{subject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{subject.name}</h1>
              <p className="text-white/80">환경기사 필기시험</p>
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
                                  ? 'bg-teal-500 border-teal-500 text-white'
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
                                        ? 'bg-teal-100 text-teal-800 font-medium'
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
            href="/category/chemistry/environmental-engineer"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 환경기사 홈
          </Link>
          <Link
            href="/category/chemistry/environmental-engineer/study/air-pollution"
            className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
          >
            대기오염방지기술 →
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
