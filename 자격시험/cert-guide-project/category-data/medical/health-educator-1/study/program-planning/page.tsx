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

export default function ProgramPlanningPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '보건프로그램 기획의 기초',
      questions: [
        {
          id: 'pp-1-1',
          question: '보건프로그램 기획의 개념과 원칙은?',
          answer: '보건 문제 해결을 위한 체계적이고 조직적인 활동 계획 수립 과정입니다.',
          prompt: '보건교육사 1급 시험을 준비하는 학생입니다. 보건프로그램 기획의 정의, 특성, 기본 원칙을 설명해주세요. 기획의 중요성, 체계적 접근의 필요성, 효과적인 기획의 요소를 상세히 설명해주세요.'
        },
        {
          id: 'pp-1-2',
          question: '프로그램 기획 모형은?',
          answer: 'PRECEDE-PROCEED, PATCH, MAPP 등 다양한 모형이 활용됩니다.',
          prompt: '주요 보건프로그램 기획 모형들을 비교 설명해주세요. PRECEDE-PROCEED, PATCH, MAPP, PEARL 모형의 특징, 장단점, 적용 상황을 상세히 설명해주세요.'
        },
        {
          id: 'pp-1-3',
          question: '논리모형(Logic Model)이란?',
          answer: '프로그램의 투입, 활동, 산출, 성과 간 논리적 연결을 시각화한 도구입니다.',
          prompt: '논리모형의 개념과 구성요소를 설명해주세요. 투입, 활동, 산출, 단기성과, 중장기성과, 영향의 관계, 논리모형 작성 방법, 활용 목적을 상세히 설명해주세요.'
        },
        {
          id: 'pp-1-4',
          question: '이해관계자 분석은?',
          answer: '프로그램에 영향을 미치거나 영향을 받는 개인과 조직을 파악하고 분석하는 과정입니다.',
          prompt: '이해관계자 분석의 필요성과 방법을 설명해주세요. 이해관계자 식별, 이해와 우선순위 분석, 참여 전략 수립, 이해관계자 매핑 기법을 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '요구도 사정',
      questions: [
        {
          id: 'pp-2-1',
          question: '요구도 사정의 개념과 목적은?',
          answer: '대상자의 건강 문제와 교육 요구를 체계적으로 파악하는 과정입니다.',
          prompt: '요구도 사정의 정의와 중요성을 설명해주세요. 요구(need)의 개념, 요구도 사정의 목적, 유형(규범적, 인지된, 표현된, 비교 요구), 단계를 상세히 설명해주세요.'
        },
        {
          id: 'pp-2-2',
          question: '요구도 사정 방법은?',
          answer: '설문조사, 면담, 포커스 그룹, 관찰, 기존 자료 분석 등을 활용합니다.',
          prompt: '요구도 사정에 사용되는 방법들을 설명해주세요. 양적 방법(설문조사, 기존 통계)과 질적 방법(면담, FGI, 관찰)의 특징, 장단점, 적절한 활용 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pp-2-3',
          question: '지역사회 건강 진단은?',
          answer: '지역사회의 건강 수준, 자원, 문제를 포괄적으로 평가하는 과정입니다.',
          prompt: '지역사회 건강 진단의 개념과 방법을 설명해주세요. 2차 자료 분석, 1차 자료 수집, SWOT 분석, 지역사회 자원 조사, 우선순위 결정 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pp-2-4',
          question: '우선순위 결정 방법은?',
          answer: '문제의 크기, 심각성, 해결 가능성을 고려하여 우선순위를 결정합니다.',
          prompt: '건강 문제의 우선순위를 결정하는 방법을 설명해주세요. Bryant의 우선순위 결정 공식, Hanlon 방법, PEARL 기준, 델파이 기법 등을 상세히 설명해주세요.'
        },
        {
          id: 'pp-2-5',
          question: 'PRECEDE 모형의 진단 단계는?',
          answer: '사회적, 역학적, 행동환경적, 교육생태학적, 행정정책적 진단 5단계입니다.',
          prompt: 'PRECEDE 모형의 5단계 진단 과정을 상세히 설명해주세요. 각 진단 단계의 목적, 내용, 방법, 산출물을 포함하여 설명해주세요.'
        }
      ]
    },
    {
      title: '프로그램 설계 및 개발',
      questions: [
        {
          id: 'pp-3-1',
          question: '프로그램 목표 설정은?',
          answer: 'SMART 원칙에 따라 구체적이고 측정 가능한 목표를 설정합니다.',
          prompt: '효과적인 프로그램 목표 설정 방법을 설명해주세요. SMART 기준(구체적, 측정가능, 달성가능, 관련성, 시한), 목표와 목적의 차이, 학습 목표 분류(인지적, 정의적, 심동적 영역)를 상세히 설명해주세요.'
        },
        {
          id: 'pp-3-2',
          question: '프로그램 내용 선정과 조직은?',
          answer: '요구도 사정 결과와 목표에 기초하여 적절한 내용을 선정하고 체계적으로 조직합니다.',
          prompt: '프로그램 내용 선정과 조직 원리를 설명해주세요. 내용 선정 기준, 조직 원리(계열성, 계속성, 통합성), 교육과정 조직 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pp-3-3',
          question: '교육 방법 및 매체 선택은?',
          answer: '대상자 특성, 목표, 내용, 자원을 고려하여 적절한 방법과 매체를 선택합니다.',
          prompt: '보건교육 방법과 매체 선택 기준을 설명해주세요. 대상자 분석, 목표 수준에 따른 방법 선택, 매체 선택 원칙, 효과성과 효율성 고려 사항을 상세히 설명해주세요.'
        },
        {
          id: 'pp-3-4',
          question: '파일럿 테스트는?',
          answer: '프로그램 본 실행 전 소규모로 시험 실시하여 문제점을 파악하고 수정하는 과정입니다.',
          prompt: '파일럿 테스트의 목적과 방법을 설명해주세요. 실시 시기, 대상 선정, 평가 항목, 결과 분석 및 반영 방법을 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '프로그램 실행 및 관리',
      questions: [
        {
          id: 'pp-4-1',
          question: '프로그램 실행 계획 수립은?',
          answer: '구체적인 활동, 일정, 책임자, 자원을 명시한 실행 계획을 작성합니다.',
          prompt: '프로그램 실행 계획 수립 방법을 설명해주세요. 활동 계획, 일정 계획(간트 차트), 인력 배치, 예산 편성, 위험 관리 계획을 상세히 설명해주세요.'
        },
        {
          id: 'pp-4-2',
          question: '예산 편성 및 관리는?',
          answer: '프로그램 활동에 필요한 재원을 산출하고 효율적으로 관리하는 과정입니다.',
          prompt: '보건프로그램 예산 편성과 관리를 설명해주세요. 예산 항목, 비용 산출 방법, 예산 편성 원칙, 예산 집행 및 관리, 비용-효과 분석을 상세히 설명해주세요.'
        },
        {
          id: 'pp-4-3',
          question: '프로그램 마케팅 전략은?',
          answer: '대상자 모집과 참여 촉진을 위한 홍보 및 마케팅 활동입니다.',
          prompt: '보건프로그램 마케팅의 개념과 전략을 설명해주세요. 사회적 마케팅의 4P(Product, Price, Place, Promotion), 대상자 세분화, 홍보 채널 선택, 참여 동기 강화 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pp-4-4',
          question: '프로그램 모니터링은?',
          answer: '프로그램 진행 과정을 지속적으로 관찰하고 점검하여 문제를 조기에 발견하고 조치하는 활동입니다.',
          prompt: '프로그램 모니터링의 목적과 방법을 설명해주세요. 모니터링 지표, 자료 수집 방법, 진행 상황 점검, 문제 해결, 과정 평가와의 관계를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '프로그램 평가',
      questions: [
        {
          id: 'pp-5-1',
          question: '프로그램 평가의 개념과 목적은?',
          answer: '프로그램의 가치와 효과를 체계적으로 판단하는 과정입니다.',
          prompt: '보건프로그램 평가의 정의, 목적, 중요성을 설명해주세요. 평가의 기능(책무성, 개선, 의사결정), 평가의 유형, 평가 윤리를 상세히 설명해주세요.'
        },
        {
          id: 'pp-5-2',
          question: '평가 유형은?',
          answer: '형성평가, 과정평가, 영향평가, 결과평가, 효율성 평가로 구분됩니다.',
          prompt: '프로그램 평가의 유형들을 설명해주세요. 각 평가 유형의 목적, 시기, 내용, 방법, 평가 지표를 구체적으로 설명해주세요.'
        },
        {
          id: 'pp-5-3',
          question: '평가 설계는?',
          answer: '평가 질문에 답하기 위한 자료 수집과 분석의 체계적인 계획입니다.',
          prompt: '프로그램 평가 설계의 종류와 특징을 설명해주세요. 실험 설계, 준실험 설계, 비실험 설계의 특징, 장단점, 타당도와 신뢰도, 적절한 활용 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pp-5-4',
          question: '평가 자료 수집 및 분석은?',
          answer: '양적, 질적 방법을 활용하여 평가 자료를 수집하고 분석합니다.',
          prompt: '프로그램 평가 자료 수집과 분석 방법을 설명해주세요. 양적 방법(설문, 통계 분석)과 질적 방법(면담, 관찰, 내용 분석), 혼합 방법, 결과 해석을 상세히 설명해주세요.'
        },
        {
          id: 'pp-5-5',
          question: '평가 결과 활용과 보고는?',
          answer: '평가 결과를 이해관계자에게 효과적으로 전달하고 프로그램 개선에 활용합니다.',
          prompt: '평가 결과의 활용과 보고 방법을 설명해주세요. 평가 보고서 작성, 결과 전파 전략, 이해관계자별 맞춤 보고, 프로그램 개선 방안 도출, 지속가능성 확보를 상세히 설명해주세요.'
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-program-planning-progress');
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
      'health-educator-1-program-planning-progress',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">보건프로그램개발</h1>
          <p className="text-xl text-gray-600 mb-6">프로그램 기획, 실행, 평가의 전 과정</p>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">학습 진도</span>
              <span className="text-sm font-semibold text-blue-600">
                {completedCount} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
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
                    <span className="text-2xl font-bold text-blue-600">
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
                              ? 'border-blue-200 bg-blue-50'
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
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {isCompleted ? '완료' : '미완료'}
                            </button>
                          </div>

                          <p className="text-gray-700 mb-4 pl-4 border-l-4 border-blue-300">
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
