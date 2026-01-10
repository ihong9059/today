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

export default function HealthPolicyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set([0]));

  const topics: Topic[] = [
    {
      title: '보건의료 정책의 이해',
      questions: [
        {
          id: 'hpo-1-1',
          question: '보건의료 정책의 개념과 특성은?',
          answer: '국민 건강 보호와 증진을 위한 정부의 권위적 결정과 행동 지침입니다.',
          prompt: '보건교육사 1급 시험을 준비하는 학생입니다. 보건의료 정책의 정의, 특성, 목표를 설명해주세요. 일반 정책과의 차이점, 보건의료 정책의 독특한 특성, 정책 결정 과정을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-1-2',
          question: '정책 형성 과정은?',
          answer: '문제 인식, 의제 설정, 정책 결정, 집행, 평가의 단계로 이루어집니다.',
          prompt: '보건의료 정책의 형성 과정을 단계별로 설명해주세요. 각 단계의 특징, 참여 주체, 고려사항, 실제 정책 사례를 포함하여 상세히 설명해주세요.'
        },
        {
          id: 'hpo-1-3',
          question: '정책 분석 모형은?',
          answer: '합리모형, 점진모형, 혼합모형, 쓰레기통 모형 등이 있습니다.',
          prompt: '보건의료 정책 분석에 사용되는 주요 모형들을 설명해주세요. 합리모형, 점진모형, 혼합모형, 쓰레기통 모형의 특징과 장단점, 적용 사례를 상세히 설명해주세요.'
        },
        {
          id: 'hpo-1-4',
          question: '근거기반 정책(Evidence-Based Policy)이란?',
          answer: '과학적 근거와 연구 결과를 바탕으로 수립하고 시행하는 정책입니다.',
          prompt: '근거기반 보건의료 정책의 개념과 중요성을 설명해주세요. 근거의 수준, 근거 평가 방법, 정책 결정에서 근거 활용 방법, 한계점을 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '국가 보건의료 제도',
      questions: [
        {
          id: 'hpo-2-1',
          question: '우리나라 보건의료 체계는?',
          answer: '국민건강보험을 중심으로 한 사회보험 방식의 보건의료 체계입니다.',
          prompt: '대한민국 보건의료 체계의 구조와 특징을 설명해주세요. 국민건강보험, 의료급여, 공공보건의료, 민간의료의 역할과 상호 관계를 상세히 설명해주세요.'
        },
        {
          id: 'hpo-2-2',
          question: '국민건강보험 제도는?',
          answer: '전 국민 대상 강제 가입 방식의 사회보험으로 의료비 보장을 제공합니다.',
          prompt: '국민건강보험 제도의 특징과 운영 체계를 설명해주세요. 보험료 부과 체계, 급여 범위, 건강보험공단과 심사평가원의 역할, 최근 정책 변화를 상세히 설명해주세요.'
        },
        {
          id: 'hpo-2-3',
          question: '공공보건의료 체계는?',
          answer: '국가와 지방자치단체가 국민 건강을 보장하기 위해 제공하는 보건의료 서비스입니다.',
          prompt: '우리나라 공공보건의료 체계를 설명해주세요. 보건소, 보건지소, 보건진료소의 역할, 공공병원, 지역보건의료계획, 공공보건의료 강화 정책을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-2-4',
          question: '의료전달체계는?',
          answer: '1차, 2차, 3차 의료기관의 기능 분담과 연계를 통한 효율적 의료 제공 체계입니다.',
          prompt: '의료전달체계의 개념과 우리나라의 현황을 설명해주세요. 각 단계별 의료기관의 역할, 의뢰-회송 체계, 현재 문제점과 개선 방안을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-2-5',
          question: '건강보험 보장성 강화 정책은?',
          answer: '의료비 부담 경감을 위해 건강보험 적용 범위를 확대하는 정책입니다.',
          prompt: '건강보험 보장성 강화 정책의 배경과 주요 내용을 설명해주세요. 비급여의 급여화, 본인부담 상한제, 4대 중증질환 보장, 문재인 케어의 내용과 평가를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '보건 관련 법규',
      questions: [
        {
          id: 'hpo-3-1',
          question: '국민건강증진법의 주요 내용은?',
          answer: '국민 건강 증진을 위한 국가와 지방자치단체의 책무, 건강증진사업, 금연 정책 등을 규정합니다.',
          prompt: '국민건강증진법의 목적과 주요 내용을 설명해주세요. 건강증진사업 종류, 건강증진기금, 금연 및 절주 정책, 영양 관리, 구강 건강 관련 조항을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-3-2',
          question: '지역보건법의 핵심 내용은?',
          answer: '지역보건의료 체계 구축과 보건소 설치 및 운영에 관한 사항을 규정합니다.',
          prompt: '지역보건법의 주요 내용을 설명해주세요. 보건소의 설치와 기능, 보건의료원, 지역보건의료계획 수립, 통합건강증진사업 등을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-3-3',
          question: '보건교육사 제도의 법적 근거는?',
          answer: '국민건강증진법 제12조에서 보건교육사 자격과 배치를 규정합니다.',
          prompt: '보건교육사 제도의 법적 근거와 내용을 설명해주세요. 국민건강증진법상 보건교육사 관련 조항, 자격 제도, 배치 기준, 업무 범위, 권한과 책임을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-3-4',
          question: '학교보건법의 주요 내용은?',
          answer: '학생과 교직원의 건강 보호와 증진을 위한 학교 보건 활동을 규정합니다.',
          prompt: '학교보건법의 목적과 주요 내용을 설명해주세요. 보건교육, 학교보건인력(보건교사), 학생 건강검진, 감염병 예방, 학교 환경위생 등을 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '보건 행정과 관리',
      questions: [
        {
          id: 'hpo-4-1',
          question: '보건 행정의 개념과 특성은?',
          answer: '국민 건강을 보호하고 증진하기 위한 공공 행정 활동입니다.',
          prompt: '보건 행정의 정의와 특성을 설명해주세요. 일반 행정과의 차이, 보건 행정의 기능(기획, 조직, 인사, 지휘, 조정, 예산), 우리나라 보건 행정 조직을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-4-2',
          question: '보건의료 조직 관리는?',
          answer: '보건의료 조직의 목표 달성을 위한 계획, 조직, 인력, 예산 관리입니다.',
          prompt: '보건의료 조직의 효과적인 관리 방법을 설명해주세요. 전략 기획, 조직 구조 설계, 인적자원 관리, 재무 관리, 품질 관리, 리더십과 의사소통을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-4-3',
          question: '보건의료 질 관리는?',
          answer: '의료 서비스의 질을 지속적으로 평가하고 개선하는 활동입니다.',
          prompt: '보건의료 질 관리의 개념과 방법을 설명해주세요. 질의 개념(구조, 과정, 결과), 질 평가 지표, 질 향상 활동(QI), 환자안전, 의료기관 인증제를 상세히 설명해주세요.'
        }
      ]
    },
    {
      title: '국제 보건 정책',
      questions: [
        {
          id: 'hpo-5-1',
          question: 'WHO의 역할과 주요 활동은?',
          answer: '세계보건기구는 국제 보건 정책 수립과 조정, 기술 지원을 담당합니다.',
          prompt: 'WHO의 설립 배경, 목표, 조직 구조를 설명해주세요. WHO의 주요 기능, 건강증진 헌장, 지속가능발전목표(SDGs) 중 보건 목표, 최근 주요 활동을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-5-2',
          question: '보편적 건강보장(UHC)이란?',
          answer: '모든 사람이 재정적 어려움 없이 필요한 보건의료 서비스를 받을 수 있도록 하는 것입니다.',
          prompt: '보편적 건강보장의 개념과 구성요소를 설명해주세요. 3차원 큐브(인구 포괄성, 서비스 포괄성, 재정 보호), UHC 달성 전략, 국가별 사례, 우리나라 현황을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-5-3',
          question: '글로벌 건강 이슈는?',
          answer: '기후변화, 감염병, 비감염성 질환, 건강 불평등 등이 주요 글로벌 건강 이슈입니다.',
          prompt: '현재 주요 글로벌 건강 이슈를 설명해주세요. 기후변화와 건강, 신종 감염병, 만성질환 증가, 건강 불평등, 고령화, 국제 보건 규약(IHR)을 상세히 설명해주세요.'
        },
        {
          id: 'hpo-5-4',
          question: '국제 개발협력과 보건은?',
          answer: '개발도상국의 보건 수준 향상을 위한 국제 사회의 협력 활동입니다.',
          prompt: '국제 보건 개발협력의 개념과 현황을 설명해주세요. ODA(공적개발원조), 글로벌 펀드, GAVI, 우리나라의 국제 보건 협력 활동을 상세히 설명해주세요.'
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-1-health-policy-progress');
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
      'health-educator-1-health-policy-progress',
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">보건정책</h1>
          <p className="text-xl text-gray-600 mb-6">보건의료 정책과 제도의 이해</p>

          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">학습 진도</span>
              <span className="text-sm font-semibold text-cyan-600">
                {completedCount} / {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-500"
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
                    <span className="text-2xl font-bold text-cyan-600">
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
                              ? 'border-cyan-200 bg-cyan-50'
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
                                  ? 'bg-cyan-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {isCompleted ? '완료' : '미완료'}
                            </button>
                          </div>

                          <p className="text-gray-700 mb-4 pl-4 border-l-4 border-cyan-300">
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
