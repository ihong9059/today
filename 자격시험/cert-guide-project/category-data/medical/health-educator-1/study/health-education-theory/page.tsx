'use client';

import { useState, useEffect } from 'react';

interface Question {
  id: string;
  question: string;
  answer: string;
  prompt: string;
}

interface Topic {
  title: string;
  questions: Question[];
}

export default function HealthEducationTheoryPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '보건교육의 철학과 역사',
      questions: [
        {
          id: 'het-1-1',
          question: '보건교육의 개념과 목적은 무엇인가?',
          answer: '보건교육은 개인과 지역사회의 건강 증진을 위해 지식, 태도, 행동을 긍정적으로 변화시키는 교육 과정입니다.',
          prompt: '보건교육사 1급 시험을 준비하는 학생입니다. 보건교육의 개념, 목적, 목표에 대해 상세히 설명해주세요. 특히 건강증진과의 관계, 일차예방과의 연관성, 그리고 WHO의 보건교육 정의를 포함하여 설명해주세요.'
        },
        {
          id: 'het-1-2',
          question: '보건교육의 역사적 발전 과정은?',
          answer: '보건교육은 19세기 위생운동에서 시작하여 20세기 건강증진 시대로 발전했습니다.',
          prompt: '보건교육의 역사적 발전 과정을 시대별로 설명해주세요. 19세기 위생운동, 20세기 초 공중보건교육, 1970년대 건강증진 개념 등장, 현대 보건교육의 특징까지 포함하여 상세히 설명해주세요.'
        },
        {
          id: 'het-1-3',
          question: '보건교육의 윤리적 원칙은 무엇인가?',
          answer: '자율성 존중, 악행 금지, 선행, 정의의 원칙이 보건교육의 핵심 윤리입니다.',
          prompt: '보건교육사로서 지켜야 할 윤리적 원칙에 대해 설명해주세요. 자율성 존중, 악행 금지, 선행, 정의의 원칙을 각각 설명하고, 실제 보건교육 현장에서 적용되는 사례를 들어주세요.'
        },
        {
          id: 'het-1-4',
          question: '보건교육의 철학적 기초는?',
          answer: '인본주의, 실용주의, 구성주의 등이 보건교육의 철학적 기반입니다.',
          prompt: '보건교육의 철학적 기초에 대해 설명해주세요. 인본주의, 실용주의, 구성주의 철학이 보건교육에 어떻게 적용되는지, 각 철학의 특징과 보건교육에서의 의미를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '보건교육 이론 및 모델',
      questions: [
        {
          id: 'het-2-1',
          question: 'PRECEDE-PROCEED 모델이란?',
          answer: '그린(Green)의 포괄적 보건교육 기획 모델로, 진단과 평가를 체계적으로 수행하는 틀입니다.',
          prompt: '보건교육사 1급 수준에서 PRECEDE-PROCEED 모델을 설명해주세요. 9단계의 구체적인 내용, 각 단계에서 수행해야 할 활동, 실제 보건프로그램에 적용하는 방법을 상세히 설명해주세요.'
        },
        {
          id: 'het-2-2',
          question: '사회인지이론(SCT)의 핵심 개념은?',
          answer: '반두라의 이론으로, 개인, 행동, 환경의 상호작용과 자기효능감을 강조합니다.',
          prompt: '반두라의 사회인지이론을 보건교육 관점에서 설명해주세요. 상호결정론, 관찰학습, 자기효능감, 결과기대 등의 개념과 보건교육 프로그램 설계에 적용하는 방법을 설명해주세요.'
        },
        {
          id: 'het-2-3',
          question: '건강신념모형(HBM)의 구성요소는?',
          answer: '지각된 민감성, 심각성, 유익성, 장애성, 행동계기로 구성됩니다.',
          prompt: '건강신념모형(Health Belief Model)의 각 구성요소를 상세히 설명해주세요. 지각된 민감성, 심각성, 유익성, 장애성, 행동계기, 자기효능감이 건강행동에 미치는 영향과 실제 적용 사례를 설명해주세요.'
        },
        {
          id: 'het-2-4',
          question: '범이론적 모형(TTM)의 변화 단계는?',
          answer: '전숙고, 숙고, 준비, 실행, 유지 단계로 구성됩니다.',
          prompt: '프로차스카의 범이론적 모형(Transtheoretical Model)을 설명해주세요. 5단계 변화 과정, 각 단계의 특징, 단계별 중재 전략, 변화 과정과 의사결정 균형에 대해 상세히 설명해주세요.'
        },
        {
          id: 'het-2-5',
          question: '계획적 행동이론(TPB)은?',
          answer: '태도, 주관적 규범, 지각된 행동통제가 행동의도와 행동을 결정합니다.',
          prompt: '아이젠의 계획적 행동이론을 설명해주세요. 태도, 주관적 규범, 지각된 행동통제의 개념과 이들이 행동의도 및 실제 행동에 미치는 영향, 보건교육에서의 적용 방법을 설명해주세요.'
        }
      ]
    },
    {
      title: '교수-학습 방법론',
      questions: [
        {
          id: 'het-3-1',
          question: '효과적인 보건교육 방법의 선택 기준은?',
          answer: '대상자 특성, 교육 목표, 교육 내용, 시간과 자원을 고려하여 선택합니다.',
          prompt: '보건교육 방법을 선택할 때 고려해야 할 요인들을 설명해주세요. 대상자의 연령, 교육 수준, 문화적 배경, 교육 목표의 수준(지식, 태도, 행동), 교육 내용의 특성, 가용 자원 등을 포함하여 설명해주세요.'
        },
        {
          id: 'het-3-2',
          question: '강의법과 토의법의 장단점은?',
          answer: '강의법은 대규모 정보 전달에 효율적이고, 토의법은 비판적 사고와 문제해결 능력 향상에 효과적입니다.',
          prompt: '보건교육에서 사용되는 강의법과 토의법을 비교 설명해주세요. 각 방법의 특징, 장점과 단점, 적절한 활용 상황, 효과적인 운영 방법을 구체적으로 설명해주세요.'
        },
        {
          id: 'het-3-3',
          question: '실습 및 시범 교육의 효과는?',
          answer: '실제 경험을 통해 기술을 습득하고 자신감을 향상시킬 수 있습니다.',
          prompt: '보건교육에서 실습과 시범 교육의 중요성과 방법을 설명해주세요. 시범-재시범 기법, 실습 교육의 단계, 피드백 제공 방법, 효과적인 실습 환경 조성 등을 포함하여 설명해주세요.'
        },
        {
          id: 'het-3-4',
          question: '소집단 학습법의 종류와 특징은?',
          answer: '버즈세션, 브레인스토밍, 역할극, 사례연구 등이 있으며 각각 고유한 목적과 효과가 있습니다.',
          prompt: '보건교육에서 활용되는 소집단 학습 방법들을 설명해주세요. 버즈세션, 브레인스토밍, 역할극, 사례연구, 문제중심학습(PBL)의 특징과 적용 방법, 효과를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '교육 매체 활용',
      questions: [
        {
          id: 'het-4-1',
          question: '보건교육 매체의 종류와 분류는?',
          answer: '시각 매체, 청각 매체, 시청각 매체, 디지털 매체로 분류됩니다.',
          prompt: '보건교육에서 사용되는 교육 매체를 분류하고 각각의 특징을 설명해주세요. 인쇄 매체, 전시 매체, 투사 매체, 시청각 매체, 디지털 매체의 종류, 장단점, 활용 방법을 상세히 설명해주세요.'
        },
        {
          id: 'het-4-2',
          question: '효과적인 보건교육 매체 제작 원리는?',
          answer: '명확성, 단순성, 일관성, 문화적 적절성, 대상자 이해도를 고려해야 합니다.',
          prompt: '보건교육 매체를 제작할 때 지켜야 할 원칙들을 설명해주세요. 메시지의 명확성, 디자인의 단순성, 색상과 글꼴의 일관성, 문화적 적절성, 가독성, 대상자 특성 고려 등을 포함하여 설명해주세요.'
        },
        {
          id: 'het-4-3',
          question: '디지털 보건교육 매체의 활용은?',
          answer: '웹사이트, 모바일 앱, SNS, 가상현실 등을 활용하여 접근성과 상호작용성을 높입니다.',
          prompt: '디지털 시대의 보건교육 매체 활용 전략을 설명해주세요. 웹 기반 교육, 모바일 헬스(mHealth), 소셜 미디어, e-러닝, 가상현실(VR)의 특징과 효과적인 활용 방법을 설명해주세요.'
        }
      ]
    },
    {
      title: '학습자 중심 교육',
      questions: [
        {
          id: 'het-5-1',
          question: '성인학습이론(Andragogy)의 원리는?',
          answer: '성인의 자기주도성, 경험 활용, 실용성 중시, 문제중심 학습을 강조합니다.',
          prompt: '말콤 놀즈의 성인학습이론을 보건교육에 적용하는 방법을 설명해주세요. 성인학습자의 특성, 6가지 핵심 원리, 성인 대상 보건교육 설계 시 고려사항을 상세히 설명해주세요.'
        },
        {
          id: 'het-5-2',
          question: '문화적 감수성을 고려한 보건교육은?',
          answer: '대상자의 문화적 배경, 신념, 가치관을 존중하고 맞춤형 교육을 제공합니다.',
          prompt: '문화적으로 적절한 보건교육을 위한 전략을 설명해주세요. 문화적 역량의 개념, 문화적 다양성 고려, 언어 장벽 극복, 문화적 신념과 보건교육의 통합 방법을 상세히 설명해주세요.'
        },
        {
          id: 'het-5-3',
          question: '건강문해력(Health Literacy)과 보건교육은?',
          answer: '대상자의 건강정보 이해 능력을 고려하여 교육 내용과 방법을 조정해야 합니다.',
          prompt: '건강문해력의 개념과 보건교육에서의 중요성을 설명해주세요. 건강문해력 수준 평가 방법, 낮은 건강문해력 대상자를 위한 교육 전략, 쉬운 건강정보 제공 방법을 상세히 설명해주세요.'
        },
        {
          id: 'het-5-4',
          question: '임파워먼트(Empowerment) 기반 보건교육은?',
          answer: '대상자의 자기결정력과 문제해결 능력을 강화하여 주도적 건강관리를 가능하게 합니다.',
          prompt: '임파워먼트 이론을 보건교육에 적용하는 방법을 설명해주세요. 임파워먼트의 개념, 수준(개인, 조직, 지역사회), 임파워먼트를 촉진하는 교육 전략, 실제 적용 사례를 상세히 설명해주세요.'
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-health-education-theory-progress');
    if (saved) {
      setCompletedQuestions(new Set(JSON.parse(saved)));
    }
  }, []);

  const toggleComplete = (questionId: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(questionId)) {
      newCompleted.delete(questionId);
    } else {
      newCompleted.add(questionId);
    }
    setCompletedQuestions(newCompleted);
    localStorage.setItem(
      'health-educator-1-health-education-theory-progress',
      JSON.stringify(Array.from(newCompleted))
    );
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

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const completedCount = completedQuestions.size;
  const progress = totalQuestions > 0 ? (completedCount / totalQuestions) * 100 : 0;

  const openAI = (prompt: string, provider: 'claude' | 'chatgpt' | 'gemini') => {
    const urls = {
      claude: `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      chatgpt: `https://chat.openai.com/?q=${encodeURIComponent(prompt)}`,
      gemini: `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`
    };
    window.open(urls[provider], '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">보건교육학</h1>
          <p className="text-xl text-gray-600 mb-6">보건교육의 이론적 기초와 실제</p>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">학습 진도</span>
              <span className="text-sm font-semibold text-emerald-600">
                {completedCount} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">{progress.toFixed(1)}% 완료</p>
          </div>
        </div>

        <div className="space-y-6">
          {topics.map((topic, topicIndex) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.has(q.id)).length;
            const topicTotal = topic.questions.length;
            const isExpanded = expandedTopics.has(topicIndex);

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-emerald-600">
                      {topicIndex + 1}
                    </span>
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-gray-900">{topic.title}</h2>
                      <p className="text-sm text-gray-500">
                        {topicCompleted} / {topicTotal} 완료
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform ${
                      isExpanded ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions.has(q.id);

                      return (
                        <div
                          key={q.id}
                          className={`border-2 rounded-lg p-4 transition-all ${
                            isCompleted
                              ? 'border-emerald-200 bg-emerald-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 flex-1">
                              {q.question}
                            </h3>
                            <button
                              onClick={() => toggleComplete(q.id)}
                              className={`ml-4 px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
                                isCompleted
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {isCompleted ? '완료' : '미완료'}
                            </button>
                          </div>

                          <p className="text-gray-700 mb-4 pl-4 border-l-4 border-emerald-300">
                            {q.answer}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => openAI(q.prompt, 'claude')}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                            >
                              Claude로 학습
                            </button>
                            <button
                              onClick={() => openAI(q.prompt, 'chatgpt')}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                            >
                              ChatGPT로 학습
                            </button>
                            <button
                              onClick={() => openAI(q.prompt, 'gemini')}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                            >
                              Gemini로 학습
                            </button>
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
      </div>
    </div>
  );
}
