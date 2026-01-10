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

export default function PracticalPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '보건교육 실습 및 시연',
      questions: [
        {
          id: 'pr-1-1',
          question: '효과적인 보건교육 시연의 구성요소는?',
          answer: '도입, 전개, 정리의 3단계와 명확한 목표, 적절한 방법, 참여 유도가 필수입니다.',
          prompt: '보건교육사 1급 시험을 준비하는 학생입니다. 보건교육 시연의 구성과 실행 방법을 설명해주세요. 도입-전개-정리의 각 단계별 핵심 내용, 효과적인 전달 기법, 학습자 참여 유도 전략을 상세히 설명해주세요.'
        },
        {
          id: 'pr-1-2',
          question: '교육 매체 활용 실습은?',
          answer: '목적과 대상에 맞는 매체를 선택하고 효과적으로 활용하는 능력이 필요합니다.',
          prompt: '보건교육에서 다양한 매체를 활용하는 방법을 설명해주세요. PPT, 동영상, 실물자료, 시범도구 등의 특징과 활용 전략, 매체 선택 시 고려사항, 효과적인 제작 원칙을 상세히 설명해주세요.'
        },
        {
          id: 'pr-1-3',
          question: '강의법 실습의 핵심은?',
          answer: '명확한 메시지 전달, 적절한 언어 사용, 효과적인 비언어적 소통이 중요합니다.',
          prompt: '효과적인 보건교육 강의 기법을 설명해주세요. 음성(속도, 억양, 강조), 시선 처리, 제스처, 공간 활용, 청중과의 상호작용, 질문 기법을 상세히 설명해주세요.'
        },
        {
          id: 'pr-1-4',
          question: '실습 및 시범 교육의 실제는?',
          answer: '단계별 시범과 피드백을 통해 실제 기술을 습득하도록 지도합니다.',
          prompt: '보건교육에서 실습과 시범 교육을 진행하는 방법을 설명해주세요. 시범-재시범-실습 단계, 효과적인 피드백 제공 방법, 학습자 수준별 지도 전략을 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '사례 분석 및 문제 해결',
      questions: [
        {
          id: 'pr-2-1',
          question: '보건교육 사례 분석 방법은?',
          answer: '상황 파악, 문제 진단, 해결책 제시, 실행 계획 수립의 단계로 접근합니다.',
          prompt: '보건교육 사례를 분석하고 해결책을 제시하는 체계적인 접근 방법을 설명해주세요. 사례 분석 틀, 문제 파악 기법, 근거기반 해결책 도출, 실행 가능성 평가를 상세히 설명해주세요.'
        },
        {
          id: 'pr-2-2',
          question: '건강 문제 우선순위 결정 실습은?',
          answer: '크기, 심각성, 해결 가능성을 종합 평가하여 우선순위를 정합니다.',
          prompt: '실제 지역사회에서 건강 문제의 우선순위를 결정하는 과정을 설명해주세요. 평가 기준 설정, 자료 수집 및 분석, 우선순위 결정 도구 활용, 이해관계자 합의 도출 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pr-2-3',
          question: '중재 전략 선택 및 적용은?',
          answer: '이론 기반 중재를 선택하고 대상자와 상황에 맞게 적용합니다.',
          prompt: '건강 문제에 대한 적절한 중재 전략을 선택하고 적용하는 방법을 설명해주세요. 이론 기반 중재 설계, 대상자 특성 고려, 자원과 제약 반영, 문화적 적절성 확보를 상세히 설명해주세요.'
        },
        {
          id: 'pr-2-4',
          question: '윤리적 딜레마 해결은?',
          answer: '윤리 원칙에 기반하여 체계적으로 판단하고 의사결정합니다.',
          prompt: '보건교육 현장에서 발생하는 윤리적 딜레마를 해결하는 방법을 설명해주세요. 윤리적 의사결정 모델, 원칙 간 갈등 해결, 이해관계자 고려, 최선의 결정 도출 과정을 상세히 설명해주세요.'
        },
        {
          id: 'pr-2-5',
          question: '갈등 관리 및 조정 능력은?',
          answer: '이해관계자 간 갈등을 파악하고 효과적으로 중재하는 능력입니다.',
          prompt: '보건프로그램 실행 중 발생하는 갈등을 관리하는 방법을 설명해주세요. 갈등의 유형과 원인 분석, 갈등 해결 전략, 협상과 조정 기법, Win-Win 해결책 모색을 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '교육 자료 개발 실무',
      questions: [
        {
          id: 'pr-3-1',
          question: '교육 자료 개발 원칙은?',
          answer: '대상자 중심, 명확성, 정확성, 문화적 적절성, 매력성을 고려합니다.',
          prompt: '효과적인 보건교육 자료 개발의 원칙과 과정을 설명해주세요. 대상자 분석, 메시지 개발, 디자인 원칙, 가독성 확보, 사전 검토 및 수정 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pr-3-2',
          question: '리플렛 및 포스터 제작은?',
          answer: '핵심 메시지, 시각적 요소, 행동 유도가 포함된 효과적인 자료를 제작합니다.',
          prompt: '보건교육용 리플렛과 포스터 제작 실무를 설명해주세요. 레이아웃 구성, 색상과 글꼴 선택, 이미지 활용, 메시지 전달력 강화, 행동 유도 요소 삽입 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pr-3-3',
          question: '건강문해력을 고려한 자료 제작은?',
          answer: '쉬운 언어, 명확한 구조, 시각 자료 활용으로 이해도를 높입니다.',
          prompt: '낮은 건강문해력 대상자를 위한 교육 자료 제작 방법을 설명해주세요. 쉬운 언어 사용, 문장 구조 단순화, 시각 자료 활용, 핵심 메시지 강조, 가독성 평가 도구 활용을 상세히 설명해주세요.'
        },
        {
          id: 'pr-3-4',
          question: '디지털 교육 콘텐츠 개발은?',
          answer: '상호작용성, 접근성, 사용자 경험을 고려한 디지털 콘텐츠를 개발합니다.',
          prompt: '디지털 보건교육 콘텐츠 개발 방법을 설명해주세요. 웹/앱 기반 콘텐츠 설계, 인터랙티브 요소 활용, 모바일 최적화, 접근성 확보, 사용자 테스트를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '프로그램 운영 실무',
      questions: [
        {
          id: 'pr-4-1',
          question: '프로그램 참여자 모집 및 관리는?',
          answer: '효과적인 홍보, 참여 동기 부여, 지속적인 관계 유지가 중요합니다.',
          prompt: '보건프로그램 참여자 모집과 관리 실무를 설명해주세요. 타겟팅 전략, 다양한 홍보 채널 활용, 참여 장애요인 제거, 중도 탈락 방지, 지속적 참여 유도 방법을 상세히 설명해주세요.'
        },
        {
          id: 'pr-4-2',
          question: '프로그램 진행 및 촉진 기술은?',
          answer: '효과적인 진행, 참여 촉진, 시간 관리, 돌발 상황 대처 능력이 필요합니다.',
          prompt: '보건프로그램을 효과적으로 진행하는 촉진 기술을 설명해주세요. 아이스브레이킹, 집단 역동 관리, 참여 유도 기법, 질문과 토의 촉진, 시간 관리, 어려운 참여자 대응을 상세히 설명해주세요.'
        },
        {
          id: 'pr-4-3',
          question: '현장 평가 및 피드백 수집은?',
          answer: '실시간 평가와 피드백을 통해 프로그램을 개선합니다.',
          prompt: '프로그램 진행 중 평가와 피드백 수집 방법을 설명해주세요. 과정 평가 도구, 실시간 반응 파악, 참여자 만족도 조사, 피드백 분석 및 반영, 즉각적인 개선 조치를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '전문성 개발 및 리더십',
      questions: [
        {
          id: 'pr-5-1',
          question: '보건교육사의 전문성 개발은?',
          answer: '지속적인 학습, 연구 활동, 네트워킹을 통해 전문성을 향상시킵니다.',
          prompt: '보건교육사의 전문성 개발 방법을 설명해주세요. 계속 교육, 학술대회 참여, 전문 저널 구독, 연구 활동, 멘토링, 전문가 네트워크 구축을 상세히 설명해주세요.'
        },
        {
          id: 'pr-5-2',
          question: '팀워크 및 협업 능력은?',
          answer: '다학제 팀에서 효과적으로 협력하고 소통하는 능력입니다.',
          prompt: '보건교육사의 팀워크와 협업 능력을 설명해주세요. 다학제 팀 협력, 효과적인 의사소통, 역할 분담과 조정, 갈등 해결, 공동 목표 달성 전략을 상세히 설명해주세요.'
        },
        {
          id: 'pr-5-3',
          question: '리더십과 변화 관리는?',
          answer: '조직과 지역사회에서 건강증진을 주도하는 리더십을 발휘합니다.',
          prompt: '보건교육사의 리더십과 변화 관리 능력을 설명해주세요. 리더십 유형, 비전 제시, 변화 촉진, 이해관계자 관리, 혁신 주도, 지속가능성 확보를 상세히 설명해주세요.'
        },
        {
          id: 'pr-5-4',
          question: '지역사회 파트너십 구축은?',
          answer: '다양한 조직과 협력 관계를 형성하고 유지하는 능력입니다.',
          prompt: '효과적인 지역사회 파트너십 구축 방법을 설명해주세요. 파트너 식별, 관계 형성, 상호 이익 창출, 협력 체계 구축, 지속적 협력 유지, 성과 공유를 상세히 설명해주세요.'
        },
        {
          id: 'pr-5-5',
          question: '옹호 활동 실천은?',
          answer: '건강증진 정책과 환경 개선을 위해 적극적으로 옹호 활동을 합니다.',
          prompt: '보건교육사의 옹호 활동 실천 방법을 설명해주세요. 건강 이슈 파악, 근거 수집, 메시지 개발, 정책 결정자 접근, 미디어 활용, 지역사회 동원 전략을 상세히 설명해주세요.'
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-practical-progress');
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
      'health-educator-1-practical-progress',
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">실기</h1>
          <p className="text-xl text-gray-600 mb-6">보건교육 실습 및 실무 역량</p>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">학습 진도</span>
              <span className="text-sm font-semibold text-indigo-600">
                {completedCount} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
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
                    <span className="text-2xl font-bold text-indigo-600">
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
                              ? 'border-indigo-200 bg-indigo-50'
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
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {isCompleted ? '완료' : '미완료'}
                            </button>
                          </div>

                          <p className="text-gray-700 mb-4 pl-4 border-l-4 border-indigo-300">
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
