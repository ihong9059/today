'use client';

import { useState } from 'react';

export default function HealthPsychologyPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);

  const topics = [
    {
      title: '건강심리학 기초',
      content: [
        {
          subtitle: '건강심리학의 개념',
          points: [
            '건강심리학: 건강증진과 질병예방을 위한 심리학적 접근',
            '생물심리사회 모델(Biopsychosocial Model)',
            '신체적, 정신적, 사회적 건강의 통합적 이해',
            '건강행동과 질병행동의 심리적 메커니즘',
            '건강증진을 위한 심리학적 중재'
          ]
        },
        {
          subtitle: '건강과 질병의 심리사회적 요인',
          points: [
            '성격 요인: A형 성격, 낙관주의, 자기효능감',
            '정서 요인: 스트레스, 불안, 우울',
            '인지 요인: 건강신념, 통제소재, 대처방식',
            '사회적 요인: 사회적 지지, 사회경제적 지위',
            '문화적 요인: 건강관련 가치관 및 규범'
          ]
        },
        {
          subtitle: '건강행동의 이해',
          points: [
            '건강행동: 질병예방과 건강증진 행동',
            '질병행동: 증상 인식 및 의료추구 행동',
            '병자역할 행동: 치료순응 및 재활',
            '건강위험행동: 흡연, 음주, 약물남용',
            '건강보호행동: 운동, 영양, 스트레스 관리'
          ]
        }
      ]
    },
    {
      title: '건강행동 이론',
      content: [
        {
          subtitle: '건강신념모형 (Health Belief Model)',
          points: [
            '질병 민감성: 질병에 걸릴 가능성 인식',
            '질병 심각성: 질병 결과의 심각성 인식',
            '행동 이익: 건강행동의 효과성 믿음',
            '행동 장애: 건강행동 실천의 어려움',
            '행동 계기: 건강행동 실천 동기'
          ]
        },
        {
          subtitle: '계획적 행동이론 (Theory of Planned Behavior)',
          points: [
            '태도: 건강행동에 대한 긍정적/부정적 평가',
            '주관적 규범: 중요한 타인의 영향',
            '지각된 행동통제: 행동 실천 능력 인식',
            '행동 의도: 행동 실천 계획',
            '실제 행동: 의도에 따른 행동 실행'
          ]
        },
        {
          subtitle: '범이론적 모형 (Transtheoretical Model)',
          points: [
            '계획 전 단계: 변화 의도 없음 (6개월 이내)',
            '계획 단계: 변화 고려 중 (6개월 이내)',
            '준비 단계: 행동 준비 (1개월 이내)',
            '실행 단계: 행동 실천 시작 (6개월 미만)',
            '유지 단계: 행동 지속 (6개월 이상)'
          ]
        },
        {
          subtitle: '사회인지이론 (Social Cognitive Theory)',
          points: [
            '자기효능감: 행동 수행 능력 믿음',
            '결과 기대: 행동 결과에 대한 예상',
            '관찰학습: 타인 행동 관찰 및 모방',
            '상호결정론: 개인-행동-환경 상호작용',
            '자기조절: 목표설정 및 자기강화'
          ]
        }
      ]
    },
    {
      title: '스트레스와 건강',
      content: [
        {
          subtitle: '스트레스의 개념과 종류',
          points: [
            '스트레스: 환경적 요구와 개인 자원의 불균형 상태',
            '급성 스트레스: 단기간 강한 스트레스',
            '만성 스트레스: 장기간 지속되는 스트레스',
            '생활사건 스트레스: 중요한 삶의 변화',
            '일상적 스트레스: 일상생활의 작은 스트레스'
          ]
        },
        {
          subtitle: '스트레스의 생리적 반응',
          points: [
            '일반적응증후군: 경고-저항-소진 단계',
            '교감신경계 활성화',
            '시상하부-뇌하수체-부신피질(HPA) 축 활성',
            '코르티솔, 아드레날린 분비 증가',
            '면역기능 저하 및 질병 취약성 증가'
          ]
        },
        {
          subtitle: '스트레스 평가와 대처',
          points: [
            '1차 평가: 상황의 위협성 평가',
            '2차 평가: 대처 자원 평가',
            '문제중심 대처: 스트레스 원인 해결',
            '정서중심 대처: 감정 조절 및 적응',
            '사회적 지지 추구: 타인의 도움'
          ]
        },
        {
          subtitle: '스트레스 관리 방법',
          points: [
            '이완훈련: 점진적 근육이완, 복식호흡',
            '명상 및 마음챙김',
            '인지재구조화: 부정적 사고 수정',
            '시간관리 및 문제해결 기술',
            '규칙적 운동 및 충분한 수면'
          ]
        }
      ]
    },
    {
      title: '건강증진 심리학',
      content: [
        {
          subtitle: '건강증진 행동',
          points: [
            '신체활동: 규칙적 운동의 심리적 효과',
            '영양관리: 건강한 식습관 형성',
            '금연: 금연 동기 및 금단증상 관리',
            '절주: 음주 조절 및 알코올 의존',
            '수면위생: 수면의 질 향상'
          ]
        },
        {
          subtitle: '질병예방 및 조기발견',
          points: [
            '건강검진: 정기검진 참여 동기',
            '예방접종: 백신 접종 태도',
            '자가검진: 유방, 고환 자가검진',
            '위험신호 인식: 증상 자각 및 해석',
            '의료추구 행동: 적시 의료서비스 이용'
          ]
        },
        {
          subtitle: '만성질환 관리',
          points: [
            '치료순응: 의료진 지시 따르기',
            '자가관리: 혈당, 혈압 자가측정',
            '질병수용: 만성질환과 함께 살기',
            '삶의 질 유지: 긍정적 태도',
            '가족 및 사회적 지지 활용'
          ]
        },
        {
          subtitle: '건강증진 중재 프로그램',
          points: [
            '동기강화 상담: 변화 동기 촉진',
            '인지행동치료: 행동 변화 촉진',
            '집단 프로그램: 또래 지지 및 학습',
            '디지털 헬스케어: 앱, 웨어러블',
            '지역사회 기반 프로그램'
          ]
        }
      ]
    },
    {
      title: '특수 집단의 건강심리',
      content: [
        {
          subtitle: '생애주기별 건강심리',
          points: [
            '아동 청소년: 건강습관 형성 시기',
            '성인기: 직업 스트레스 및 생활습관병',
            '중년기: 갱년기 및 만성질환 관리',
            '노년기: 노화 수용 및 건강 유지',
            '각 시기별 발달과업과 건강행동'
          ]
        },
        {
          subtitle: '정신건강',
          points: [
            '우울증: 인지행동적 이해와 치료',
            '불안장애: 불안 관리 및 이완',
            '스트레스 관련 장애: PTSD, 적응장애',
            '자살 예방: 위험요인 및 보호요인',
            '정신건강 증진: 회복탄력성'
          ]
        },
        {
          subtitle: '중독과 건강',
          points: [
            '물질 중독: 니코틴, 알코올, 약물',
            '행동 중독: 인터넷, 게임, 도박',
            '중독의 심리적 메커니즘',
            '중독 치료 및 재발 방지',
            '가족 및 사회적 개입'
          ]
        },
        {
          subtitle: '특수 상황의 건강심리',
          points: [
            '만성통증: 통증의 심리적 측면',
            '암 환자: 심리사회적 적응',
            '재활 과정: 동기부여 및 적응',
            '임종 및 사별: 애도 과정',
            '건강 불평등: 취약계층 건강'
          ]
        }
      ]
    }
  ];

  const questions = [
    {
      question: '생물심리사회 모델에서 강조하는 것은?',
      options: [
        '생물학적 요인만 고려',
        '심리적 요인만 고려',
        '사회적 요인만 고려',
        '세 요인의 통합적 이해'
      ],
      answer: 3,
      explanation: '생물심리사회 모델은 건강과 질병을 생물학적, 심리적, 사회적 요인의 상호작용으로 이해합니다.'
    },
    {
      question: '건강신념모형에서 건강행동 실천 가능성이 높은 경우는?',
      options: [
        '질병 민감성과 심각성을 낮게 인식',
        '행동 장애가 크고 이익이 작음',
        '질병 민감성과 심각성을 높게 인식',
        '행동 계기가 없음'
      ],
      answer: 2,
      explanation: '질병에 대한 민감성과 심각성을 높게 인식하고, 행동의 이익이 장애보다 클 때 건강행동 실천 가능성이 높습니다.'
    },
    {
      question: '범이론적 모형에서 변화를 고려하기 시작하는 단계는?',
      options: [
        '계획 전 단계',
        '계획 단계',
        '준비 단계',
        '실행 단계'
      ],
      answer: 1,
      explanation: '계획 단계는 6개월 이내에 변화를 고려하기 시작하는 단계입니다.'
    },
    {
      question: '자기효능감이 가장 높은 사람은?',
      options: [
        '성공 경험이 많은 사람',
        '실패 경험이 많은 사람',
        '행동을 시도한 적 없는 사람',
        '타인의 실패를 본 사람'
      ],
      answer: 0,
      explanation: '자기효능감은 성공 경험, 대리경험, 언어적 설득, 생리적 상태에 영향을 받으며, 성공 경험이 가장 강력합니다.'
    },
    {
      question: '스트레스의 일반적응증후군 단계 순서는?',
      options: [
        '저항-경고-소진',
        '경고-저항-소진',
        '소진-경고-저항',
        '경고-소진-저항'
      ],
      answer: 1,
      explanation: '일반적응증후군은 경고 단계, 저항 단계, 소진 단계 순으로 진행됩니다.'
    },
    {
      question: '문제중심 대처 전략은?',
      options: [
        '감정 표현하기',
        '긍정적으로 재해석하기',
        '스트레스 원인 직접 해결',
        '회피하기'
      ],
      answer: 2,
      explanation: '문제중심 대처는 스트레스의 원인을 직접 해결하거나 변화시키려는 노력입니다.'
    },
    {
      question: '계획적 행동이론에서 행동 의도에 영향을 주는 요인이 아닌 것은?',
      options: [
        '태도',
        '주관적 규범',
        '지각된 행동통제',
        '유전적 요인'
      ],
      answer: 3,
      explanation: '계획적 행동이론에서 행동 의도는 태도, 주관적 규범, 지각된 행동통제에 영향을 받습니다.'
    },
    {
      question: '치료순응도를 높이는 방법이 아닌 것은?',
      options: [
        '복잡한 치료계획 제시',
        '환자 교육 강화',
        '의료진과의 신뢰 관계',
        '사회적 지지 제공'
      ],
      answer: 0,
      explanation: '치료순응도를 높이려면 단순하고 명확한 치료계획, 환자 교육, 신뢰 관계, 사회적 지지가 중요합니다.'
    },
    {
      question: '건강증진을 위한 인지행동치료의 목표는?',
      options: [
        '약물 처방',
        '부정적 사고와 행동 패턴 수정',
        '수술 준비',
        '격리 치료'
      ],
      answer: 1,
      explanation: '인지행동치료는 부정적 사고와 행동 패턴을 인식하고 수정하여 건강행동을 촉진합니다.'
    },
    {
      question: 'A형 성격의 특징으로 옳은 것은?',
      options: [
        '느긋하고 여유로움',
        '경쟁적이고 시간에 쫓김',
        '소극적이고 수동적',
        '무관심하고 냉담함'
      ],
      answer: 1,
      explanation: 'A형 성격은 경쟁적, 적대적, 시간에 쫓기는 특성을 보이며 심혈관질환 위험이 높습니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">건강심리학</h1>
          <p className="text-gray-600">건강행동과 심리적 요인</p>
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
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
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
                  <div key={idx} className="border-l-4 border-purple-500 pl-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {section.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {section.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start">
                          <span className="text-purple-600 mr-2 mt-1">✓</span>
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
                                ? 'bg-purple-100 border-purple-500'
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
                      className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                    >
                      {showAnswer === index ? '답안 숨기기 ▲' : '답안 확인 ▼'}
                    </button>
                    {showAnswer === index && (
                      <div className="mt-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <p className="font-semibold text-purple-800 mb-1">
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
