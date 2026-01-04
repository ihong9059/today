'use client';

import { useState } from 'react';

export default function PublicHealthPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);

  const topics = [
    {
      title: '공중보건학 총론',
      content: [
        {
          subtitle: '공중보건의 정의와 개념',
          points: [
            '공중보건: 조직화된 지역사회의 노력으로 질병예방, 수명연장, 건강증진을 도모',
            'WHO 정의: 모든 사람이 최고 수준의 건강에 도달하도록 하는 과학이자 기술',
            '질병중심에서 건강증진 중심으로 패러다임 전환',
            '예방의학, 사회의학, 환경의학의 통합적 접근'
          ]
        },
        {
          subtitle: '공중보건의 핵심 기능',
          points: [
            '평가: 지역사회 건강상태 진단 및 조사',
            '정책개발: 근거기반 보건정책 수립',
            '보장: 필수 보건서비스 제공 보장',
            '건강증진: 건강한 환경 조성',
            '질병예방: 전염병 및 만성질환 예방'
          ]
        },
        {
          subtitle: '건강의 결정요인',
          points: [
            '생물학적 요인: 유전, 연령, 성별',
            '행동적 요인: 흡연, 음주, 운동, 식습관',
            '환경적 요인: 물리적, 화학적, 생물학적 환경',
            '사회경제적 요인: 소득, 교육, 직업',
            '보건의료 서비스: 접근성, 질, 형평성'
          ]
        }
      ]
    },
    {
      title: '역학 및 질병관리',
      content: [
        {
          subtitle: '역학의 기본 개념',
          points: [
            '역학: 질병 발생의 분포와 결정요인 연구',
            '기술역학: 시간, 장소, 사람별 질병 분포',
            '분석역학: 질병 발생의 원인 규명',
            '실험역학: 중재의 효과 평가',
            '적용역학: 역학적 지식의 실제 적용'
          ]
        },
        {
          subtitle: '역학 지표',
          points: [
            '발생률(Incidence): 일정기간 새로 발생한 환자 비율',
            '유병률(Prevalence): 특정시점의 전체 환자 비율',
            '치명률(Case Fatality Rate): 환자 중 사망자 비율',
            '사망률(Mortality Rate): 인구 중 사망자 비율',
            '상대위험도(RR), 교차비(OR): 위험요인 평가'
          ]
        },
        {
          subtitle: '감염병 관리',
          points: [
            '감염병 3요소: 병원체, 숙주, 환경',
            '예방 전략: 병원체 제거, 전파경로 차단, 숙주 저항력 증진',
            '감염병 감시체계 운영',
            '예방접종 프로그램',
            '격리 및 접촉자 관리'
          ]
        },
        {
          subtitle: '만성질환 관리',
          points: [
            '심뇌혈관질환: 고혈압, 당뇨, 이상지질혈증 관리',
            '암 관리: 조기검진 및 건강생활실천',
            '정신건강: 우울, 자살, 중독 예방',
            '건강행동 개선: 금연, 절주, 신체활동',
            '지역사회 통합 건강증진 서비스'
          ]
        }
      ]
    },
    {
      title: '환경보건',
      content: [
        {
          subtitle: '환경보건의 개념',
          points: [
            '환경보건: 환경요인이 건강에 미치는 영향 연구 및 관리',
            '환경위해요인: 물리적, 화학적, 생물학적, 사회심리적',
            '환경성질환: 천식, 아토피, 납중독 등',
            '환경보건 정책 및 법규',
            '환경영향평가 및 건강영향평가'
          ]
        },
        {
          subtitle: '대기 및 실내공기질',
          points: [
            '대기오염물질: 미세먼지, 오존, 이산화질소',
            '실내공기 오염원: 라돈, 폼알데하이드, VOCs',
            '대기질 관리 기준 및 모니터링',
            '호흡기질환 및 심혈관질환 위험',
            '취약계층(어린이, 노인) 보호 대책'
          ]
        },
        {
          subtitle: '수질 및 식품위생',
          points: [
            '상수도 관리: 정수처리, 수질검사',
            '하수도 관리: 오폐수 처리',
            '수인성 질병: 콜레라, 장티푸스, 이질',
            '식품위생: HACCP, 식중독 예방',
            '식품첨가물 및 잔류농약 관리'
          ]
        },
        {
          subtitle: '기후변화와 건강',
          points: [
            '온열질환: 열사병, 열탈진',
            '감염병 분포 변화',
            '대기질 악화 및 알레르기 질환 증가',
            '자연재해 증가 및 정신건강',
            '기후변화 적응 및 완화 정책'
          ]
        }
      ]
    },
    {
      title: '보건행정 및 정책',
      content: [
        {
          subtitle: '보건행정의 개념',
          points: [
            '보건행정: 국민건강 증진을 위한 조직적 활동',
            '보건의료 자원의 효율적 배분',
            '보건의료 서비스의 질 관리',
            '보건의료 정보 관리',
            '보건의료 인력 관리'
          ]
        },
        {
          subtitle: '우리나라 보건의료체계',
          points: [
            '국민건강보험제도: 전국민 건강보험',
            '의료급여제도: 저소득층 의료보장',
            '공공보건의료: 보건소, 보건지소, 보건진료소',
            '민간의료기관: 병원, 의원, 한의원',
            '보건의료 전달체계'
          ]
        },
        {
          subtitle: '보건정책 과정',
          points: [
            '정책의제 설정: 건강문제 인식 및 우선순위',
            '정책형성: 대안 개발 및 선택',
            '정책집행: 계획 실행 및 모니터링',
            '정책평가: 성과 측정 및 피드백',
            '이해관계자 참여 및 협력'
          ]
        },
        {
          subtitle: '건강증진 정책',
          points: [
            '국민건강증진법 및 기본계획',
            '건강생활실천 사업: 금연, 절주, 영양, 운동',
            '생애주기별 건강관리',
            '지역사회 건강조사 및 건강플랜',
            '건강도시 및 건강친화적 환경 조성'
          ]
        }
      ]
    },
    {
      title: '보건통계 및 조사방법',
      content: [
        {
          subtitle: '보건통계의 기초',
          points: [
            '인구통계: 출생률, 사망률, 인구구조',
            '건강통계: 질병, 장애, 건강행동',
            '보건의료 이용통계',
            '기술통계: 평균, 표준편차, 백분율',
            '추론통계: 가설검정, 신뢰구간'
          ]
        },
        {
          subtitle: '건강조사 방법',
          points: [
            '설문조사: 면접, 전화, 우편, 온라인',
            '건강검진: 신체계측, 생화학검사',
            '표본추출: 무작위, 층화, 집락',
            '자료수집: 타당도, 신뢰도 확보',
            '윤리적 고려사항: 개인정보보호, 동의'
          ]
        },
        {
          subtitle: '국가건강조사',
          points: [
            '국민건강영양조사',
            '지역사회건강조사',
            '청소년건강행태조사',
            '노인실태조사',
            '환자조사 및 의료이용 통계'
          ]
        },
        {
          subtitle: '근거기반 보건의료',
          points: [
            '과학적 근거의 체계적 수집',
            '연구결과의 비판적 평가',
            '임상적 전문성과 통합',
            '환자 가치 및 선호 고려',
            '의사결정에 근거 활용'
          ]
        }
      ]
    }
  ];

  const questions = [
    {
      question: 'WHO가 정의하는 공중보건의 목표는?',
      options: [
        '질병의 완전한 퇴치',
        '모든 사람이 최고 수준의 건강에 도달',
        '의료비용 절감',
        '병원 시설 확충'
      ],
      answer: 1,
      explanation: 'WHO는 공중보건을 모든 사람이 최고 수준의 건강에 도달하도록 하는 과학이자 기술로 정의합니다.'
    },
    {
      question: '발생률(Incidence)의 정의는?',
      options: [
        '특정시점의 전체 환자 수',
        '일정기간 새로 발생한 환자 비율',
        '환자 중 사망자 비율',
        '인구 전체의 사망률'
      ],
      answer: 1,
      explanation: '발생률은 일정 기간 동안 새로 발생한 환자의 비율을 의미합니다.'
    },
    {
      question: '감염병 3요소에 포함되지 않는 것은?',
      options: [
        '병원체',
        '숙주',
        '환경',
        '백신'
      ],
      answer: 3,
      explanation: '감염병 3요소는 병원체, 숙주, 환경입니다. 백신은 예방 수단이지 감염병 발생 요소가 아닙니다.'
    },
    {
      question: '1차 예방에 해당하는 것은?',
      options: [
        '조기진단',
        '예방접종',
        '재활치료',
        '합병증 관리'
      ],
      answer: 1,
      explanation: '1차 예방은 질병 발생 전 예방으로, 예방접종, 건강증진이 포함됩니다.'
    },
    {
      question: '대기오염물질이 아닌 것은?',
      options: [
        '미세먼지',
        '오존',
        '이산화질소',
        '대장균'
      ],
      answer: 3,
      explanation: '대장균은 생물학적 오염물질로 주로 수질 오염 지표입니다.'
    },
    {
      question: '우리나라의 전국민 건강보장제도는?',
      options: [
        '민간보험',
        '국민건강보험',
        '의료공제',
        '자율진료'
      ],
      answer: 1,
      explanation: '우리나라는 국민건강보험제도를 통해 전국민 건강보장을 실현하고 있습니다.'
    },
    {
      question: '유병률(Prevalence)이 높아지는 경우는?',
      options: [
        '질병 발생이 감소할 때',
        '질병 기간이 길어질 때',
        '치료율이 높아질 때',
        '사망률이 증가할 때'
      ],
      answer: 1,
      explanation: '유병률은 질병 기간이 길어질수록, 발생률이 높을수록, 치료율과 사망률이 낮을수록 증가합니다.'
    },
    {
      question: 'HACCP의 의미는?',
      options: [
        '위해요소중점관리기준',
        '환경영향평가',
        '건강영향평가',
        '대기질관리기준'
      ],
      answer: 0,
      explanation: 'HACCP(Hazard Analysis Critical Control Point)은 식품의 위해요소중점관리기준입니다.'
    },
    {
      question: '지역사회 건강조사의 주요 목적은?',
      options: [
        '개인 질병 진단',
        '의료비용 산정',
        '지역주민 건강수준 파악',
        '병원 수익 증대'
      ],
      answer: 2,
      explanation: '지역사회 건강조사는 지역주민의 건강수준과 건강행태를 파악하여 보건정책 수립에 활용합니다.'
    },
    {
      question: '환경보건의 물리적 위해요인이 아닌 것은?',
      options: [
        '소음',
        '방사선',
        '세균',
        '진동'
      ],
      answer: 2,
      explanation: '세균은 생물학적 위해요인입니다. 물리적 위해요인에는 소음, 방사선, 진동, 온도 등이 있습니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">공중보건학</h1>
          <p className="text-gray-600">공중보건의 개념과 실제</p>
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
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
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
                  <div key={idx} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {section.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {section.points.map((point, pidx) => (
                        <li key={pidx} className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">✓</span>
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
                                ? 'bg-blue-100 border-blue-500'
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
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      {showAnswer === index ? '답안 숨기기 ▲' : '답안 확인 ▼'}
                    </button>
                    {showAnswer === index && (
                      <div className="mt-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p className="font-semibold text-blue-800 mb-1">
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
