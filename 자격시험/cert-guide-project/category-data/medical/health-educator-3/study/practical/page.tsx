'use client';

import { useState } from 'react';

export default function PracticalPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);

  const topics = [
    {
      title: '보건교육 프로그램 기획',
      content: [
        {
          subtitle: '요구도 사정',
          points: [
            '지역사회 건강문제 파악: 통계자료, 설문조사, 면담',
            '우선순위 결정: 중요도, 시급성, 해결가능성',
            '대상자 특성 분석: 연령, 성별, 교육수준, 건강상태',
            '자원 및 환경 분석: 인적, 물적, 재정적 자원',
            '이해관계자 파악: 주민, 기관, 전문가'
          ]
        },
        {
          subtitle: '목표 설정',
          points: [
            '총괄목표: 프로그램의 최종 목적 진술',
            '학습목표: SMART 원칙 적용 (구체적, 측정가능, 달성가능, 관련성, 기한)',
            '지식 목표: 건강지식 향상',
            '태도 목표: 건강에 대한 태도 변화',
            '행동 목표: 건강행동 실천'
          ]
        },
        {
          subtitle: '프로그램 내용 구성',
          points: [
            '핵심 내용 선정: 우선순위가 높은 주제',
            '내용 조직: 논리적 순서, 단계별 구성',
            '교육 자료 개발: 리플렛, PPT, 동영상',
            '매체 선택: 대상자 특성에 맞는 매체',
            '시간 배분: 주제별 적절한 시간 할당'
          ]
        },
        {
          subtitle: '실행 계획 수립',
          points: [
            '일정 계획: 회차별 주제 및 일시',
            '장소 선정: 접근성, 편의성, 안전성',
            '강사 및 인력 배치',
            '예산 편성: 항목별 비용 산출',
            '홍보 계획: 대상자 모집 및 참여 독려'
          ]
        }
      ]
    },
    {
      title: '보건교육 방법 및 매체',
      content: [
        {
          subtitle: '교육 방법 선택',
          points: [
            '강의: 많은 인원에게 지식 전달 효과적',
            '토론: 참여와 상호작용 촉진',
            '시범 및 실습: 기술 습득에 효과적',
            '역할극: 태도 변화 및 공감 능력 향상',
            '사례연구: 문제해결 능력 향상'
          ]
        },
        {
          subtitle: '교육 매체 활용',
          points: [
            '인쇄매체: 리플렛, 포스터, 책자 - 정보 전달 및 보관',
            '시청각매체: PPT, 동영상 - 시각적 효과',
            '전시매체: 게시판, 모형 - 현실감',
            '전자매체: 웹사이트, 앱, SNS - 접근성',
            '복합매체: 다양한 매체 통합 활용'
          ]
        },
        {
          subtitle: '교육 자료 개발 원칙',
          points: [
            '대상자 수준에 맞는 내용 및 표현',
            '명확하고 간결한 메시지',
            '시각적 요소 활용 (그림, 도표)',
            '실생활 적용 가능한 정보',
            '문화적 적절성 고려'
          ]
        },
        {
          subtitle: '효과적인 강의 기술',
          points: [
            '도입: 흥미유발, 학습목표 제시',
            '전개: 핵심내용 설명, 예시 활용',
            '정리: 요약, 질의응답',
            '언어적 기술: 명확한 발음, 적절한 속도',
            '비언어적 기술: 시선처리, 제스처, 표정'
          ]
        }
      ]
    },
    {
      title: '보건교육 실행 및 운영',
      content: [
        {
          subtitle: '프로그램 실행 준비',
          points: [
            '장소 및 기자재 점검',
            '교육 자료 준비 및 배포',
            '참여자 명단 확인',
            '진행 일정 재확인',
            '돌발 상황 대비 계획'
          ]
        },
        {
          subtitle: '참여자 관리',
          points: [
            '참여자 등록 및 출결 관리',
            '오리엔테이션: 프로그램 소개, 안내사항',
            '동기부여: 참여의 중요성 강조',
            '참여 독려: 질문, 토론 유도',
            '개별 상담 및 지도'
          ]
        },
        {
          subtitle: '프로그램 진행',
          points: [
            '시간 관리: 정시 시작 및 종료',
            '분위기 조성: 편안하고 개방적인 환경',
            '상호작용 촉진: 질문, 토론, 활동',
            '피드백 제공: 즉각적이고 구체적',
            '유연한 대처: 상황에 따른 조정'
          ]
        },
        {
          subtitle: '과정 모니터링',
          points: [
            '출석률 및 참여도 확인',
            '학습 이해도 점검',
            '만족도 조사',
            '문제점 파악 및 개선',
            '진행 과정 기록 및 보고'
          ]
        }
      ]
    },
    {
      title: '보건교육 평가',
      content: [
        {
          subtitle: '평가 계획 수립',
          points: [
            '평가 목적 명확화',
            '평가 지표 설정: 목표와 연계',
            '평가 방법 선택: 양적, 질적',
            '평가 도구 개발: 설문지, 관찰도구',
            '평가 일정 및 대상 결정'
          ]
        },
        {
          subtitle: '평가 유형',
          points: [
            '반응평가: 참여자 만족도 조사',
            '학습평가: 지식, 태도 변화 측정',
            '행동평가: 실제 행동 변화 확인',
            '결과평가: 건강상태 개선 측정',
            '과정평가: 실행 과정의 적절성'
          ]
        },
        {
          subtitle: '평가 도구',
          points: [
            '설문지: 태도, 만족도 조사',
            '지식 테스트: 사전-사후 비교',
            '관찰: 행동 변화 확인',
            '면담: 심층적 의견 수렴',
            '생리적 측정: 혈압, 혈당 등'
          ]
        },
        {
          subtitle: '평가 결과 활용',
          points: [
            '프로그램 효과성 입증',
            '개선점 도출 및 환류',
            '성공 요인 및 장애 요인 분석',
            '후속 프로그램 기획',
            '보고서 작성 및 공유'
          ]
        }
      ]
    },
    {
      title: '실무 사례 및 응용',
      content: [
        {
          subtitle: '생애주기별 보건교육',
          points: [
            '영유아: 예방접종, 영양, 안전사고 예방',
            '학령기: 성교육, 구강보건, 학교폭력 예방',
            '청년기: 성인병 예방, 건강검진, 정신건강',
            '중장년기: 만성질환 관리, 갱년기 건강',
            '노년기: 낙상예방, 치매예방, 영양관리'
          ]
        },
        {
          subtitle: '질환별 보건교육',
          points: [
            '고혈압: 혈압 관리, 저염식이, 규칙적 운동',
            '당뇨병: 혈당 관리, 식이요법, 합병증 예방',
            '비만: 체중 관리, 균형 잡힌 식단, 신체활동',
            '암: 조기검진, 위험요인 관리, 건강생활',
            '정신질환: 스트레스 관리, 사회적 지지'
          ]
        },
        {
          subtitle: '건강행동별 교육',
          points: [
            '금연교육: 금연 동기강화, 금단증상 관리, 재흡연 예방',
            '절주교육: 적정 음주량, 위험 음주 폐해, 알코올 중독',
            '영양교육: 균형 잡힌 식사, 영양소 기능, 식습관 개선',
            '운동교육: 운동의 효과, 운동 방법, 안전 수칙',
            '스트레스 관리: 이완요법, 시간관리, 대처전략'
          ]
        },
        {
          subtitle: '보건교육 보고서 작성',
          points: [
            '배경 및 필요성: 문제 제기 및 근거',
            '프로그램 개요: 목표, 내용, 방법',
            '실행 과정: 일정, 참여자, 활동',
            '평가 결과: 성과 지표 분석',
            '결론 및 제언: 성과, 한계, 개선방안'
          ]
        }
      ]
    }
  ];

  const questions = [
    {
      question: 'SMART 원칙에서 M이 의미하는 것은?',
      options: [
        'Meaningful (의미있는)',
        'Measurable (측정가능한)',
        'Motivating (동기부여되는)',
        'Manageable (관리가능한)'
      ],
      answer: 1,
      explanation: 'SMART는 Specific(구체적), Measurable(측정가능), Achievable(달성가능), Relevant(관련성), Time-bound(기한설정)의 약자입니다.'
    },
    {
      question: '요구도 사정 시 우선순위 결정 기준이 아닌 것은?',
      options: [
        '문제의 중요도',
        '문제의 시급성',
        '문제의 해결가능성',
        '문제의 역사성'
      ],
      answer: 3,
      explanation: '우선순위는 중요도, 시급성, 해결가능성을 기준으로 결정합니다.'
    },
    {
      question: '강의법의 장점은?',
      options: [
        '개인 맞춤형 교육 가능',
        '많은 인원에게 효율적 지식 전달',
        '기술 습득에 효과적',
        '태도 변화에 가장 효과적'
      ],
      answer: 1,
      explanation: '강의법은 많은 인원에게 체계적으로 지식을 전달하는 데 효율적입니다.'
    },
    {
      question: '보건교육 자료 개발 시 고려사항이 아닌 것은?',
      options: [
        '대상자 수준',
        '명확하고 간결한 메시지',
        '제작자의 취향',
        '문화적 적절성'
      ],
      answer: 2,
      explanation: '교육 자료는 대상자 중심으로 개발해야 하며, 제작자의 취향보다는 대상자의 특성과 요구를 우선 고려해야 합니다.'
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
      explanation: 'Kirkpatrick 모형은 반응평가(만족도) → 학습평가(지식/태도) → 행동평가(행동변화) → 결과평가(건강개선) 순입니다.'
    },
    {
      question: '과정평가에서 확인하는 것은?',
      options: [
        '프로그램 종료 후 건강상태 개선',
        '프로그램 실행 과정의 적절성',
        '참여자의 지식 증가',
        '비용 대비 효과'
      ],
      answer: 1,
      explanation: '과정평가는 프로그램이 계획대로 실행되었는지, 참여율, 만족도 등을 평가합니다.'
    },
    {
      question: '금연교육에서 가장 중요한 것은?',
      options: [
        '흡연의 해로움만 강조',
        '금연 동기강화 및 금단증상 관리',
        '처벌 위협',
        '강제적 금연 유도'
      ],
      answer: 1,
      explanation: '효과적인 금연교육은 개인의 동기를 강화하고 금단증상을 관리하며, 재흡연을 예방하는 것이 중요합니다.'
    },
    {
      question: '보건교육 프로그램 보고서에 포함되지 않는 것은?',
      options: [
        '배경 및 필요성',
        '프로그램 개요',
        '참여자 개인정보',
        '평가 결과'
      ],
      answer: 2,
      explanation: '보고서는 전체적인 프로그램 내용과 성과를 담되, 참여자의 개인정보는 보호해야 합니다.'
    },
    {
      question: '당뇨병 보건교육의 핵심 내용이 아닌 것은?',
      options: [
        '혈당 자가측정',
        '식이요법',
        '규칙적 운동',
        '고지방 식단 권장'
      ],
      answer: 3,
      explanation: '당뇨병 환자는 균형 잡힌 식단, 혈당 관리, 규칙적 운동이 필요하며, 고지방 식단은 피해야 합니다.'
    },
    {
      question: '노인 낙상예방 교육 내용으로 적절한 것은?',
      options: [
        '계단 빨리 오르기',
        '미끄러운 바닥에 매트 깔기',
        '밤에 불 끄고 이동하기',
        '근력 운동 및 균형 훈련'
      ],
      answer: 3,
      explanation: '낙상예방을 위해서는 근력과 균형감각을 키우는 운동, 안전한 환경 조성, 적절한 조명 등이 필요합니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-2">실기</h1>
          <p className="text-gray-600">보건교육 실무 능력</p>
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
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
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
                  <div key={idx} className="border-l-4 border-orange-500 pl-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {section.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {section.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start">
                          <span className="text-orange-600 mr-2 mt-1">✓</span>
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
                                ? 'bg-orange-100 border-orange-500'
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
                      className="text-orange-600 hover:text-orange-700 font-semibold text-sm"
                    >
                      {showAnswer === index ? '답안 숨기기 ▲' : '답안 확인 ▼'}
                    </button>
                    {showAnswer === index && (
                      <div className="mt-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <p className="font-semibold text-orange-800 mb-1">
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
