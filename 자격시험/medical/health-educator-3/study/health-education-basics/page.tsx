'use client';

import { useState } from 'react';

export default function HealthEducationBasicsPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);

  const topics = [
    {
      title: '보건교육의 개념과 역사',
      content: [
        {
          subtitle: '보건교육의 정의',
          points: [
            '보건교육은 개인, 집단, 지역사회가 건강에 유익한 행동을 자발적으로 수행하도록 하는 교육활동',
            'WHO: 사람들로 하여금 건강에 이로운 행동을 자발적으로 수행하도록 하는 과정',
            '지식, 태도, 행동의 변화를 통한 건강증진 목표',
            '예방적, 치료적, 재활적 측면의 포괄적 접근'
          ]
        },
        {
          subtitle: '보건교육의 목적',
          points: [
            '건강증진 및 질병예방',
            '건강한 생활습관 형성',
            '건강에 대한 올바른 지식 함양',
            '건강행동의 실천 능력 향상',
            '건강에 대한 책임의식 고취'
          ]
        },
        {
          subtitle: '보건교육의 역사',
          points: [
            '1900년대 초: 위생교육 중심',
            '1970년대: 건강증진 개념 도입',
            '1986년: 오타와 헌장 - 건강증진의 이정표',
            '2000년대: 근거기반 보건교육 강조',
            '현재: 맞춤형 건강증진 시대'
          ]
        }
      ]
    },
    {
      title: '보건교육 이론 및 모형',
      content: [
        {
          subtitle: '건강신념모형 (Health Belief Model)',
          points: [
            '질병에 대한 민감성 인지',
            '질병의 심각성 인식',
            '건강행동의 이익과 장애 평가',
            '행동 실천을 위한 계기',
            '자기효능감의 중요성'
          ]
        },
        {
          subtitle: '범이론적 모형 (Transtheoretical Model)',
          points: [
            '계획 전 단계: 변화 의도 없음',
            '계획 단계: 6개월 내 변화 의도',
            '준비 단계: 1개월 내 행동 계획',
            '실행 단계: 행동 변화 시작 (6개월 미만)',
            '유지 단계: 행동 지속 (6개월 이상)'
          ]
        },
        {
          subtitle: '사회인지이론 (Social Cognitive Theory)',
          points: [
            '개인적 요인: 지식, 기술, 태도',
            '행동적 요인: 실제 행동 수행',
            '환경적 요인: 물리적, 사회적 환경',
            '상호결정론: 세 요인의 상호작용',
            '자기효능감과 관찰학습의 강조'
          ]
        },
        {
          subtitle: 'PRECEDE-PROCEED 모형',
          points: [
            'PRECEDE: 진단 및 계획 단계',
            '사회적 진단: 삶의 질 평가',
            '역학적 진단: 건강문제 확인',
            '행동환경적 진단: 건강행동 분석',
            'PROCEED: 실행 및 평가 단계'
          ]
        }
      ]
    },
    {
      title: '보건교육 방법론',
      content: [
        {
          subtitle: '개별교육 방법',
          points: [
            '상담: 1:1 맞춤형 건강상담',
            '코칭: 목표 설정 및 동기부여',
            '가정방문: 현장 중심 교육',
            '전화상담: 접근성 높은 상담',
            '장점: 개인 맞춤형, 즉각 피드백'
          ]
        },
        {
          subtitle: '집단교육 방법',
          points: [
            '강의: 많은 인원에게 지식 전달',
            '토론: 참여자 간 의견 교환',
            '시범 및 실습: 실제 기술 습득',
            '역할극: 경험적 학습',
            '워크숍: 집중적 학습 과정'
          ]
        },
        {
          subtitle: '매체 활용 교육',
          points: [
            '인쇄매체: 리플렛, 포스터, 책자',
            '시청각매체: 동영상, PPT, 음성',
            '전시매체: 게시판, 모형, 실물',
            '전자매체: 웹, 앱, SNS',
            '복합매체: 다양한 매체의 통합 활용'
          ]
        },
        {
          subtitle: '지역사회 조직화',
          points: [
            '지역사회 참여 유도',
            '건강증진 네트워크 구축',
            '자조집단 형성 및 지원',
            '지역자원 연계 및 활용',
            '지속가능한 건강증진 환경 조성'
          ]
        }
      ]
    },
    {
      title: '보건교육 프로그램 기획',
      content: [
        {
          subtitle: '요구도 사정',
          points: [
            '대상자의 건강문제 파악',
            '우선순위 결정',
            '자원 및 환경 분석',
            '이해관계자 의견 수렴',
            '근거기반 자료 수집'
          ]
        },
        {
          subtitle: '목표 설정',
          points: [
            '총괄목표: 프로그램의 최종 목적',
            '학습목표: 구체적, 측정가능',
            'SMART 원칙 적용',
            '단기·중기·장기 목표 구분',
            '성과지표 명확화'
          ]
        },
        {
          subtitle: '프로그램 개발',
          points: [
            '교육내용 선정 및 조직',
            '교육방법 및 매체 선택',
            '교육 일정 및 장소 결정',
            '강사 및 인력 배치',
            '예산 편성 및 자원 확보'
          ]
        },
        {
          subtitle: '프로그램 실행',
          points: [
            '사전 준비 및 점검',
            '참여자 모집 및 등록',
            '교육 진행 및 관리',
            '참여자 동기부여',
            '과정 모니터링'
          ]
        }
      ]
    },
    {
      title: '보건교육 평가',
      content: [
        {
          subtitle: '평가의 유형',
          points: [
            '형성평가: 프로그램 진행 중 개선점 파악',
            '총괄평가: 프로그램 종료 후 성과 측정',
            '과정평가: 실행 과정의 적절성',
            '영향평가: 즉각적 효과 측정',
            '결과평가: 장기적 효과 측정'
          ]
        },
        {
          subtitle: '평가 모형 - Kirkpatrick 4단계',
          points: [
            '반응평가: 참여자 만족도',
            '학습평가: 지식, 태도 변화',
            '행동평가: 실제 행동 변화',
            '결과평가: 건강상태 개선',
            '단계별 연계 평가 중요'
          ]
        },
        {
          subtitle: '평가 도구',
          points: [
            '설문지: 태도, 만족도 조사',
            '지식 테스트: 학습 성과 측정',
            '관찰: 행동 변화 확인',
            '면담: 심층적 의견 수렴',
            '생리적 측정: 객관적 건강지표'
          ]
        },
        {
          subtitle: '평가 결과 활용',
          points: [
            '프로그램 개선 및 보완',
            '효과성 입증 및 홍보',
            '예산 확보 근거 자료',
            '후속 프로그램 기획',
            '우수사례 공유 및 확산'
          ]
        }
      ]
    }
  ];

  const questions = [
    {
      question: 'WHO에서 정의하는 보건교육의 핵심 개념은 무엇인가?',
      options: [
        '강제적인 건강행동 변화',
        '자발적인 건강행동 수행',
        '의료서비스 제공',
        '질병 치료 중심'
      ],
      answer: 1,
      explanation: '보건교육은 사람들로 하여금 건강에 이로운 행동을 자발적으로 수행하도록 하는 과정입니다.'
    },
    {
      question: '건강신념모형(HBM)의 구성요소가 아닌 것은?',
      options: [
        '질병에 대한 민감성',
        '질병의 심각성',
        '사회적 지지',
        '자기효능감'
      ],
      answer: 2,
      explanation: '건강신념모형의 주요 구성요소는 민감성, 심각성, 이익과 장애, 행동계기, 자기효능감입니다.'
    },
    {
      question: '범이론적 모형에서 행동변화를 6개월 이상 지속하는 단계는?',
      options: [
        '준비 단계',
        '실행 단계',
        '유지 단계',
        '완료 단계'
      ],
      answer: 2,
      explanation: '유지 단계는 행동변화를 6개월 이상 지속하는 단계로, 재발 방지가 중요합니다.'
    },
    {
      question: 'PRECEDE-PROCEED 모형에서 PRECEDE에 해당하지 않는 것은?',
      options: [
        '사회적 진단',
        '역학적 진단',
        '과정 평가',
        '행동환경적 진단'
      ],
      answer: 2,
      explanation: '과정 평가는 PROCEED(실행 및 평가) 단계에 해당합니다.'
    },
    {
      question: '집단교육 방법의 장점이 아닌 것은?',
      options: [
        '비용 효과적',
        '집단 역동 활용',
        '개인 맞춤형 접근',
        '또래 학습 효과'
      ],
      answer: 2,
      explanation: '개인 맞춤형 접근은 개별교육의 장점입니다. 집단교육은 비용 효과성과 집단 역동을 활용할 수 있습니다.'
    },
    {
      question: 'SMART 목표 설정 원칙에 포함되지 않는 것은?',
      options: [
        'Specific (구체적)',
        'Measurable (측정가능)',
        'Simple (단순한)',
        'Time-bound (기한설정)'
      ],
      answer: 2,
      explanation: 'SMART는 Specific, Measurable, Achievable, Relevant, Time-bound의 약자입니다.'
    },
    {
      question: 'Kirkpatrick 평가모형의 1단계는?',
      options: [
        '학습평가',
        '반응평가',
        '행동평가',
        '결과평가'
      ],
      answer: 1,
      explanation: 'Kirkpatrick 모형의 1단계는 반응평가로, 참여자의 만족도를 측정합니다.'
    },
    {
      question: '형성평가의 주요 목적은?',
      options: [
        '프로그램 종료 후 성과 측정',
        '프로그램 진행 중 개선점 파악',
        '참여자 선발',
        '예산 집행 평가'
      ],
      answer: 1,
      explanation: '형성평가는 프로그램 진행 중에 실시하여 개선점을 파악하고 즉시 반영하는 평가입니다.'
    },
    {
      question: '사회인지이론에서 강조하는 핵심 개념은?',
      options: [
        '유전적 요인',
        '자기효능감',
        '경제적 지위',
        '연령대'
      ],
      answer: 1,
      explanation: '사회인지이론은 자기효능감(자신이 행동을 성공적으로 수행할 수 있다는 믿음)을 핵심 개념으로 강조합니다.'
    },
    {
      question: '보건교육에서 매체 선택 시 고려사항이 아닌 것은?',
      options: [
        '대상자 특성',
        '교육 내용',
        '매체 제작자의 선호도',
        '예산 및 자원'
      ],
      answer: 2,
      explanation: '매체 선택은 대상자 특성, 교육 내용, 예산 등을 고려해야 하며, 제작자의 선호도보다는 교육 효과성이 중요합니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">보건교육기초</h1>
          <p className="text-gray-600">보건교육의 이론적 기초와 원리</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 주제 목록 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">학습 주제</h2>
              <div className="space-y-2">
                {topics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTopic(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTopic === index
                        ? 'bg-green-600 text-white'
                        : 'bg-green-50 text-green-800 hover:bg-green-100'
                    }`}
                  >
                    <div className="font-semibold text-sm">{topic.title}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 학습 내용 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {topics[selectedTopic].title}
              </h2>
              <div className="space-y-6">
                {topics[selectedTopic].content.map((section, idx) => (
                  <div key={idx} className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {section.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {section.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 연습문제 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">연습문제</h2>
              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <p className="font-semibold text-gray-800 mb-3">
                      {index + 1}. {q.question}
                    </p>
                    <div className="space-y-2 mb-3">
                      {q.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-lg border ${
                            showAnswer === index
                              ? optIndex === q.answer
                                ? 'bg-green-100 border-green-500'
                                : 'bg-gray-50 border-gray-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          {optIndex + 1}) {option}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowAnswer(showAnswer === index ? null : index)}
                      className="text-green-600 hover:text-green-700 font-semibold text-sm"
                    >
                      {showAnswer === index ? '답안 숨기기 ▲' : '답안 확인 ▼'}
                    </button>
                    {showAnswer === index && (
                      <div className="mt-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <p className="font-semibold text-green-800 mb-1">
                          정답: {q.answer + 1}번
                        </p>
                        <p className="text-gray-700 text-sm">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
