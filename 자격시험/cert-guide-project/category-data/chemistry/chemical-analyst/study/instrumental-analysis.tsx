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

export default function InstrumentalAnalysisPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  const subject = {
    id: 'instrumental-analysis',
    name: '기기분석',
    icon: '📊',
    color: 'from-purple-500 to-pink-500',
  };

  const topics: Topic[] = [
    {
      id: 'spectroscopy',
      title: '분광분석법',
      description: '빛과 물질의 상호작용을 이용한 분석',
      icon: '🌈',
      questions: [
        {
          id: 'sp-1',
          question: 'UV-Vis 분광법에서 Beer-Lambert 법칙은?',
          options: ['A = εbc', 'A = log(I₀/I)', 'T = I/I₀', 'E = hν'],
          answer: 0,
          explanation: 'Beer-Lambert 법칙: A = εbc (A:흡광도, ε:몰흡광계수, b:셀길이, c:농도)',
        },
        {
          id: 'sp-2',
          question: 'IR 분광법에서 주로 관측되는 것은?',
          options: ['전자전이', '분자진동', '핵스핀전이', '형광'],
          answer: 1,
          explanation: 'IR(적외선) 분광법은 분자의 진동(신축, 굽힘)에 의한 에너지 흡수를 측정합니다.',
        },
        {
          id: 'sp-3',
          question: '형광분광법의 특징으로 옳은 것은?',
          options: ['흡수보다 높은 에너지 방출', '흡수보다 낮은 에너지 방출', '같은 파장 방출', '자외선만 사용'],
          answer: 1,
          explanation: '형광은 Stokes shift로 인해 흡수광보다 긴 파장(낮은 에너지)의 빛을 방출합니다.',
        },
        {
          id: 'sp-4',
          question: 'UV-Vis에서 conjugation이 증가하면 λmax는?',
          options: ['단파장으로 이동', '장파장으로 이동', '변화 없음', '소멸됨'],
          answer: 1,
          explanation: '공액 이중결합이 증가하면 HOMO-LUMO 에너지 갭이 줄어 λmax가 장파장으로 이동(적색이동)합니다.',
        },
        {
          id: 'sp-5',
          question: 'AAS(원자흡수분광법)의 광원으로 주로 사용되는 것은?',
          options: ['텅스텐 램프', '중수소 램프', '중공음극관(HCL)', 'LED'],
          answer: 2,
          explanation: '원자흡수분광법에서는 분석 원소를 함유한 중공음극관(Hollow Cathode Lamp)을 광원으로 사용합니다.',
        },
      ],
    },
    {
      id: 'chromatography',
      title: '크로마토그래피',
      description: '혼합물의 분리와 분석',
      icon: '📈',
      questions: [
        {
          id: 'ch-1',
          question: 'GC에서 분리능(Resolution)에 영향을 주지 않는 인자는?',
          options: ['이론단수', '선택성', '용량인자', '시료 색상'],
          answer: 3,
          explanation: '분리능 Rs = (1/4)√N × (α-1)/α × k/(k+1). 시료 색상은 분리능과 무관합니다.',
        },
        {
          id: 'ch-2',
          question: 'HPLC에서 역상 크로마토그래피의 정지상은?',
          options: ['실리카겔', 'C18 결합 실리카', '알루미나', '활성탄'],
          answer: 1,
          explanation: '역상 크로마토그래피에서는 C18(옥타데실) 같은 비극성 정지상을 사용합니다.',
        },
        {
          id: 'ch-3',
          question: 'GC에서 FID(불꽃이온화검출기)로 검출이 어려운 것은?',
          options: ['메탄', '에탄올', '물', '벤젠'],
          answer: 2,
          explanation: 'FID는 탄소-수소 결합을 가진 유기물에 반응하므로 물(H₂O)은 거의 검출되지 않습니다.',
        },
        {
          id: 'ch-4',
          question: 'van Deemter 식에서 최적 유속을 결정하는 항은?',
          options: ['A항', 'B항', 'C항', 'B항과 C항'],
          answer: 3,
          explanation: 'H = A + B/u + Cu에서 B항(세로확산)과 C항(물질전달)이 유속에 의존하여 최적 유속이 결정됩니다.',
        },
        {
          id: 'ch-5',
          question: 'HPLC의 UV 검출기에서 사용되는 셀 재질은?',
          options: ['유리', '플라스틱', '석영', '다이아몬드'],
          answer: 2,
          explanation: 'UV 검출기 셀은 자외선 투과가 좋은 석영(quartz)으로 제작됩니다.',
        },
      ],
    },
    {
      id: 'electrochemistry',
      title: '전기화학분석',
      description: '전기적 특성을 이용한 분석',
      icon: '⚡',
      questions: [
        {
          id: 'ec-1',
          question: 'pH 측정에 사용되는 유리전극의 원리는?',
          options: ['전위차법', '전류법', '전기전도도법', '쿨롱법'],
          answer: 0,
          explanation: 'pH 유리전극은 H⁺ 농도에 따른 전위 변화를 측정하는 전위차법을 이용합니다.',
        },
        {
          id: 'ec-2',
          question: '전위차 적정에서 종말점 결정은?',
          options: ['색 변화', '전위 급변점', '온도 변화', '밀도 변화'],
          answer: 1,
          explanation: '전위차 적정에서 종말점은 적정 곡선에서 전위가 급격히 변하는 점(변곡점)으로 결정합니다.',
        },
        {
          id: 'ec-3',
          question: '이온선택성 전극(ISE)의 장점이 아닌 것은?',
          options: ['선택성', '빠른 응답', '비파괴 분석', '절대량 측정'],
          answer: 3,
          explanation: 'ISE는 활동도 측정이며, 절대량 측정은 쿨롱법의 특징입니다.',
        },
        {
          id: 'ec-4',
          question: '전기전도도법으로 측정 가능한 것은?',
          options: ['용액 중 특정 이온', '총 이온 농도', '비전해질', 'pH'],
          answer: 1,
          explanation: '전기전도도법은 용액 내 모든 이온의 총 전도도를 측정하므로 총 이온 농도를 반영합니다.',
        },
        {
          id: 'ec-5',
          question: '분극전극을 사용하는 분석법은?',
          options: ['전위차법', '폴라로그래피', '전도도법', '쿨롱법'],
          answer: 1,
          explanation: '폴라로그래피는 수은 적하 전극을 사용하며, 전극 표면에서 분극 현상을 이용합니다.',
        },
      ],
    },
    {
      id: 'mass-spectrometry',
      title: '질량분석법',
      description: '이온의 질량 대 전하비 측정',
      icon: '⚛️',
      questions: [
        {
          id: 'ms-1',
          question: '질량분석기의 기본 구성 순서로 옳은 것은?',
          options: ['검출기-분석기-이온원', '이온원-분석기-검출기', '분석기-이온원-검출기', '이온원-검출기-분석기'],
          answer: 1,
          explanation: '질량분석기는 시료를 이온화(이온원) → 질량별 분리(분석기) → 검출(검출기) 순으로 구성됩니다.',
        },
        {
          id: 'ms-2',
          question: 'EI(전자충격) 이온화의 특징은?',
          options: ['부드러운 이온화', '분자이온 주로 생성', '조각 이온 많이 생성', '다전하 이온 생성'],
          answer: 2,
          explanation: 'EI는 70eV 전자로 충격하여 강한 이온화로 인해 많은 조각(fragment) 이온이 생성됩니다.',
        },
        {
          id: 'ms-3',
          question: 'LC-MS에서 주로 사용되는 이온화 방법은?',
          options: ['EI', 'ESI', 'MALDI', 'FAB'],
          answer: 1,
          explanation: 'LC-MS에서는 상압에서 작동하고 용매와 호환되는 ESI(전기분무 이온화)가 주로 사용됩니다.',
        },
        {
          id: 'ms-4',
          question: 'TOF(비행시간) 질량분석기의 분리 원리는?',
          options: ['자기장', '전기장 주사', '비행시간 차이', '공명주파수'],
          answer: 2,
          explanation: 'TOF는 같은 에너지로 가속된 이온이 질량에 따라 다른 비행시간을 갖는 원리를 이용합니다.',
        },
        {
          id: 'ms-5',
          question: 'm/z = 15인 조각 이온으로 가장 가능성 있는 것은?',
          options: ['CH₃⁺', 'NH₃⁺', 'O⁺', 'H₂O⁺'],
          answer: 0,
          explanation: 'm/z = 15는 CH₃⁺(메틸 양이온)으로, 많은 유기화합물에서 관찰되는 특징적 조각입니다.',
        },
      ],
    },
    {
      id: 'other-methods',
      title: '기타 분석법',
      description: 'X선, NMR 및 기타 분석기술',
      icon: '🔭',
      questions: [
        {
          id: 'om-1',
          question: '¹H NMR에서 TMS의 역할은?',
          options: ['용매', '내부표준', '시약', '완충제'],
          answer: 1,
          explanation: 'TMS(테트라메틸실란)는 화학적 이동의 기준점(0 ppm)으로 사용되는 내부표준물질입니다.',
        },
        {
          id: 'om-2',
          question: 'XRF 분석의 원리는?',
          options: ['X선 회절', 'X선 형광', 'X선 흡수', 'X선 투과'],
          answer: 1,
          explanation: 'XRF(X선 형광 분석)는 시료에 X선을 조사하여 발생하는 특성 X선 형광을 측정합니다.',
        },
        {
          id: 'om-3',
          question: 'ICP-OES의 플라즈마 온도는 약 몇 K인가?',
          options: ['1,000K', '3,000K', '6,000-10,000K', '20,000K 이상'],
          answer: 2,
          explanation: 'ICP(유도결합 플라즈마)의 온도는 약 6,000-10,000K로 대부분의 원소를 여기시킬 수 있습니다.',
        },
        {
          id: 'om-4',
          question: 'NMR에서 spin-spin 결합(J-coupling)에 의해 나타나는 현상은?',
          options: ['화학적 이동', '피크 분열', '피크 넓어짐', '피크 소멸'],
          answer: 1,
          explanation: 'J-coupling은 인접 핵 스핀 간의 상호작용으로 피크가 분열(splitting)되어 나타납니다.',
        },
        {
          id: 'om-5',
          question: 'TGA(열중량분석)에서 측정하는 것은?',
          options: ['열량 변화', '질량 변화', '온도 변화', '부피 변화'],
          answer: 1,
          explanation: 'TGA는 온도에 따른 시료의 질량 변화를 측정하여 분해, 산화, 휘발 등을 분석합니다.',
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
    let prompt = `[화학분석기사 - 기기분석] 문제:\n${question.question}\n\n`;
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
            href="/category/chemistry/chemical-analyst/study/analytical-chemistry"
            className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-300 transition"
          >
            ← 분석화학
          </Link>
          <Link
            href="/category/chemistry/chemical-analyst/study/environmental-chemistry"
            className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-center hover:opacity-90 transition"
          >
            환경화학 →
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
