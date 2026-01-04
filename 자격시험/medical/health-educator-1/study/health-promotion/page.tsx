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

export default function HealthPromotionPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '건강증진의 개념과 원리',
      questions: [
        {
          id: 'hp-1-1',
          question: '건강증진의 정의와 특성은?',
          answer: 'WHO 오타와 헌장(1986)에서 건강증진은 사람들이 자신의 건강을 통제하고 개선할 수 있도록 하는 과정입니다.',
          prompt: '보건교육사 1급 시험을 준비하는 학생입니다. WHO 오타와 헌장의 건강증진 개념, 5대 활동 영역, 3대 전략, 건강증진과 질병예방의 차이를 상세히 설명해주세요.'
        },
        {
          id: 'hp-1-2',
          question: '건강의 결정요인은?',
          answer: '개인 행동, 사회경제적 요인, 물리적 환경, 보건의료 서비스가 건강을 결정합니다.',
          prompt: '건강의 결정요인 모델을 설명해주세요. Dahlgren과 Whitehead의 무지개 모델, 사회적 건강 결정요인, 건강 불평등과의 관계를 포함하여 상세히 설명해주세요.'
        },
        {
          id: 'hp-1-3',
          question: '건강형평성과 건강증진은?',
          answer: '모든 사람이 건강 잠재력을 실현할 공정한 기회를 갖도록 하는 것이 건강형평성입니다.',
          prompt: '건강형평성의 개념과 건강증진과의 관계를 설명해주세요. 건강 불평등의 원인, 건강형평성 달성 전략, 취약계층 건강증진 접근법을 상세히 설명해주세요.'
        },
        {
          id: 'hp-1-4',
          question: '생태학적 모델의 적용은?',
          answer: '개인, 대인, 조직, 지역사회, 정책 수준의 다층적 접근으로 건강증진을 실현합니다.',
          prompt: '생태학적 모델을 건강증진에 적용하는 방법을 설명해주세요. 각 수준의 특성, 다층적 중재 전략, 실제 건강증진 프로그램 사례를 포함하여 설명해주세요.'
        }
      ]
    },
    {
      title: '건강행동 변화 이론',
      questions: [
        {
          id: 'hp-2-1',
          question: '건강행동의 개념과 유형은?',
          answer: '건강행동은 건강을 보호, 유지, 증진하기 위한 개인의 행위로 예방행동과 질병행동으로 구분됩니다.',
          prompt: '건강행동의 개념과 분류를 설명해주세요. 예방행동, 질병행동, 건강증진행동의 차이, 건강행동에 영향을 미치는 요인들을 상세히 설명해주세요.'
        },
        {
          id: 'hp-2-2',
          question: '변화단계모형(TTM)의 실제 적용은?',
          answer: '대상자의 변화 단계를 평가하고 단계별 맞춤 중재를 제공합니다.',
          prompt: '범이론적 모형을 건강증진 프로그램에 적용하는 구체적인 방법을 설명해주세요. 각 단계별 특징, 단계별 중재 전략, 변화 과정, 의사결정 균형을 포함하여 실제 사례와 함께 설명해주세요.'
        },
        {
          id: 'hp-2-3',
          question: '자기효능감 이론의 적용은?',
          answer: '자기효능감을 높이기 위해 성공 경험, 대리 경험, 언어적 설득, 생리적 상태를 활용합니다.',
          prompt: '반두라의 자기효능감 이론을 건강증진에 적용하는 방법을 설명해주세요. 자기효능감의 4가지 정보원, 자기효능감 향상 전략, 건강행동 변화에서의 역할을 상세히 설명해주세요.'
        },
        {
          id: 'hp-2-4',
          question: '사회적 지지와 건강행동은?',
          answer: '정서적, 정보적, 평가적, 도구적 지지가 건강행동 실천과 유지를 촉진합니다.',
          prompt: '사회적 지지의 유형과 건강행동에 미치는 영향을 설명해주세요. 각 유형의 특징, 사회적 지지망 구축 방법, 건강증진 프로그램에서의 활용 전략을 설명해주세요.'
        },
        {
          id: 'hp-2-5',
          question: '동기면담(Motivational Interviewing)은?',
          answer: '대상자 중심의 상담 기법으로 내재적 동기를 강화하여 행동 변화를 촉진합니다.',
          prompt: '동기면담의 원리와 건강증진에서의 활용을 설명해주세요. 4가지 기본 원리(RULE), OARS 기법, 변화 대화 이끌어내기, 실제 적용 사례를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '지역사회 건강증진',
      questions: [
        {
          id: 'hp-3-1',
          question: '지역사회 조직화 이론은?',
          answer: '지역사회 주민의 참여와 역량강화를 통해 건강 문제를 해결하는 접근법입니다.',
          prompt: '지역사회 조직화의 개념과 모델을 설명해주세요. 지역사회 개발, 사회계획, 사회행동 모델의 특징, 지역사회 역량강화 전략, 주민참여 촉진 방법을 상세히 설명해주세요.'
        },
        {
          id: 'hp-3-2',
          question: '지역사회 역량(Community Capacity)이란?',
          answer: '지역사회가 건강 문제를 파악하고 해결하기 위해 필요한 자원과 능력의 총합입니다.',
          prompt: '지역사회 역량의 개념과 구성요소를 설명해주세요. 리더십, 자원, 네트워크, 참여, 문제해결 능력 등의 요소와 지역사회 역량 강화 전략을 상세히 설명해주세요.'
        },
        {
          id: 'hp-3-3',
          question: '참여적 행동연구(PAR)는?',
          answer: '지역사회 주민이 연구와 실천 과정에 주도적으로 참여하는 방법론입니다.',
          prompt: '참여적 행동연구의 개념과 건강증진에서의 적용을 설명해주세요. PAR의 원리, 단계, 전통적 연구와의 차이, 지역사회 건강증진 사업에서의 활용 방법을 설명해주세요.'
        },
        {
          id: 'hp-3-4',
          question: '지역사회 기반 참여 연구(CBPR)는?',
          answer: '연구자와 지역사회가 동등한 파트너십으로 건강 문제를 해결하는 접근법입니다.',
          prompt: 'CBPR의 개념과 원칙을 설명해주세요. 9가지 핵심 원칙, 전통적 연구와의 차이, 건강형평성 증진에서의 역할, 실제 적용 사례를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '건강 커뮤니케이션',
      questions: [
        {
          id: 'hp-4-1',
          question: '건강 커뮤니케이션의 개념은?',
          answer: '건강 정보와 영향을 전달하고 교환하여 개인과 지역사회의 건강을 증진하는 과정입니다.',
          prompt: '건강 커뮤니케이션의 정의, 목적, 유형을 설명해주세요. 대인 커뮤니케이션, 집단 커뮤니케이션, 대중 커뮤니케이션의 특징과 건강증진에서의 활용 방법을 설명해주세요.'
        },
        {
          id: 'hp-4-2',
          question: '효과적인 건강 메시지 설계는?',
          answer: '대상자 특성, 메시지 프레이밍, 적절한 채널 선택이 중요합니다.',
          prompt: '효과적인 건강 메시지 작성 원칙을 설명해주세요. 메시지 프레이밍(긍정/부정), 메시지 테일러링, 문화적 적절성, 건강문해력 고려, 설득 전략을 상세히 설명해주세요.'
        },
        {
          id: 'hp-4-3',
          question: '소셜 미디어와 건강증진은?',
          answer: '소셜 미디어를 활용하여 건강정보 확산, 사회적 지지, 행동 변화를 촉진할 수 있습니다.',
          prompt: '소셜 미디어를 건강증진에 활용하는 전략을 설명해주세요. 장단점, 효과적인 활용 방법, 건강 정보의 신뢰성 확보, SNS 기반 건강증진 프로그램 사례를 설명해주세요.'
        }
      ]
    },
    {
      title: '건강증진 정책과 옹호',
      questions: [
        {
          id: 'hp-5-1',
          question: '건강증진 정책의 개념은?',
          answer: '인구집단의 건강을 증진하기 위한 정부와 조직의 의사결정과 행동입니다.',
          prompt: '건강증진 정책의 정의, 유형, 특징을 설명해주세요. 규제 정책, 경제 정책, 정보 정책의 사례와 건강증진 정책의 효과성을 높이는 전략을 설명해주세요.'
        },
        {
          id: 'hp-5-2',
          question: '건강 옹호(Health Advocacy)란?',
          answer: '개인과 지역사회의 건강을 위해 정책과 환경 변화를 촉구하는 활동입니다.',
          prompt: '건강 옹호의 개념과 전략을 설명해주세요. 옹호 활동의 유형, 효과적인 옹호 전략, 정책 변화 과정, 보건교육사의 옹호자 역할을 상세히 설명해주세요.'
        },
        {
          id: 'hp-5-3',
          question: '건강친화적 환경 조성은?',
          answer: '물리적, 사회적 환경을 건강에 유리하게 변화시키는 것입니다.',
          prompt: '건강친화적 환경 조성 전략을 설명해주세요. 건강도시, 건강증진학교, 건강증진병원의 개념과 실제 적용 사례, 환경 변화를 통한 건강증진 효과를 설명해주세요.'
        },
        {
          id: 'hp-5-4',
          question: '다부문 협력(Multi-sectoral Collaboration)은?',
          answer: '건강 문제 해결을 위해 보건 외 다양한 부문이 협력하는 접근법입니다.',
          prompt: '다부문 협력의 개념과 필요성을 설명해주세요. Health in All Policies(HiAP) 접근, 효과적인 협력 체계 구축 방법, 부문 간 협력 사례를 상세히 설명해주세요.'
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-health-promotion-progress');
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
      'health-educator-1-health-promotion-progress',
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">건강증진이론</h1>
          <p className="text-xl text-gray-600 mb-6">행동변화 이론과 건강증진 전략</p>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">학습 진도</span>
              <span className="text-sm font-semibold text-teal-600">
                {completedCount} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
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
                    <span className="text-2xl font-bold text-teal-600">
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
                              ? 'border-teal-200 bg-teal-50'
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
                                  ? 'bg-teal-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {isCompleted ? '완료' : '미완료'}
                            </button>
                          </div>

                          <p className="text-gray-700 mb-4 pl-4 border-l-4 border-teal-300">
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
