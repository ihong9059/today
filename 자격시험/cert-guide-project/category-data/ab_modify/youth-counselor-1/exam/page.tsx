'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function YouthCounselor1ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  const requiredSubjects = [
    {
      name: '상담자 교육 및 사례지도',
      icon: '👨‍🏫',
      questions: 25,
      difficulty: '상',
      passRate: 40,
      topics: [
        { name: '슈퍼비전의 개념과 모델', desc: '발달적/통합적/차별적 모델' },
        { name: '사례개념화', desc: '인지행동, 정신역동 접근' },
        { name: '상담자 발달단계', desc: 'Stoltenberg 모델' },
        { name: '슈퍼비전 기술', desc: '피드백, 자기개방, 직면' },
        { name: '윤리적 이슈', desc: '이중관계, 비밀보장' },
        { name: '집단슈퍼비전', desc: '동료슈퍼비전, 팀접근' },
        { name: '평가와 사정', desc: '슈퍼바이지 평가' },
        { name: '문화적 역량', desc: '다문화 슈퍼비전' }
      ],
      tips: '슈퍼비전 모델(Stoltenberg, Bernard)의 특징과 차이점 반드시 암기'
    },
    {
      name: '청소년 관련 법과 행정',
      icon: '⚖️',
      questions: 25,
      difficulty: '중상',
      passRate: 50,
      topics: [
        { name: '청소년기본법', desc: '청소년정책 기본방향' },
        { name: '청소년보호법', desc: '유해매체, 유해환경 규제' },
        { name: '청소년복지지원법', desc: '복지시설, 지원체계' },
        { name: '학교폭력예방법', desc: '자치위원회, 조치사항' },
        { name: '청소년활동진흥법', desc: '활동시설, 지도자' },
        { name: '아동복지법', desc: '아동학대, 보호체계' },
        { name: '청소년정책 행정체계', desc: '여가부, 지자체 역할' },
        { name: '청소년상담복지체계', desc: '1388, 꿈드림센터' }
      ],
      tips: '각 법률의 목적, 대상연령, 주요조항 비교표 정리 필수'
    },
    {
      name: '상담연구방법론의 실제',
      icon: '📊',
      questions: 25,
      difficulty: '상',
      passRate: 35,
      topics: [
        { name: '연구설계', desc: '실험/준실험/비실험설계' },
        { name: '양적연구방법', desc: '조사연구, 상관연구' },
        { name: '질적연구방법', desc: '현상학, 근거이론, 사례연구' },
        { name: '혼합연구방법', desc: '순차적/동시적 설계' },
        { name: '측정과 척도', desc: '신뢰도, 타당도' },
        { name: '통계분석', desc: 't검정, ANOVA, 회귀분석' },
        { name: '상담성과연구', desc: '효과크기, 메타분석' },
        { name: '연구윤리', desc: 'IRB, 연구대상자 보호' }
      ],
      tips: '통계분석 방법 선택 기준과 해석 방법 숙지 필수'
    }
  ];

  const selectiveSubjects = [
    {
      name: '위기상담',
      icon: '🆘',
      questions: 25,
      difficulty: '상',
      passRate: 45,
      topics: [
        { name: '위기이론', desc: 'Caplan, Roberts 모델' },
        { name: '위기개입 6단계', desc: '문제정의~추수지도' },
        { name: '자살위기개입', desc: '자살위험성 평가, QPR' },
        { name: '트라우마 상담', desc: 'PTSD, 복합외상' },
        { name: '학교폭력 위기개입', desc: '피해자/가해자 상담' },
        { name: '가정폭력 위기개입', desc: '안전계획, 쉼터연계' },
        { name: '재난심리지원', desc: 'PFA, 디브리핑' },
        { name: '위기상담 윤리', desc: '비밀보장 예외, 신고의무' }
      ],
      tips: '위기개입 6단계 모델 및 자살위험성 평가도구(SBQ-R, SSI) 암기 필수',
      recommended: true
    },
    {
      name: '비행상담',
      icon: '🚨',
      questions: 25,
      difficulty: '중상',
      passRate: 50,
      topics: [
        { name: '비행이론', desc: '긴장이론, 사회학습이론' },
        { name: '비행청소년 특성', desc: '발달적, 심리적 특성' },
        { name: '비행유형별 개입', desc: '폭력, 절도, 성비행' },
        { name: '소년사법체계', desc: '소년법, 보호처분' },
        { name: '교정상담', desc: '소년원, 보호관찰' },
        { name: '가족치료적 접근', desc: 'MST, FFT' },
        { name: '재범예방 프로그램', desc: '인지행동적 접근' },
        { name: '회복적 정의', desc: '피해자-가해자 조정' }
      ],
      tips: '비행이론과 가족치료 모델(MST, FFT) 특징 비교 정리',
      recommended: true
    },
    {
      name: '성상담',
      icon: '💕',
      questions: 25,
      difficulty: '중',
      passRate: 55,
      topics: [
        { name: '성발달 이론', desc: '청소년기 성발달 과업' },
        { name: '성교육', desc: '포괄적 성교육 내용' },
        { name: '성폭력 상담', desc: '피해자 지원, 2차 피해 예방' },
        { name: '성매매 청소년', desc: '지원체계, 보호조치' },
        { name: '디지털 성범죄', desc: '사이버 그루밍, 성착취물' },
        { name: '성정체성 상담', desc: 'LGBTQ+ 청소년' },
        { name: '성문제 행동', desc: '성중독, 성충동' },
        { name: '성상담 윤리', desc: '경계, 전문가 소진' }
      ],
      tips: '성폭력 상담 절차 및 디지털 성범죄 관련 법률 숙지'
    },
    {
      name: '약물상담',
      icon: '💊',
      questions: 25,
      difficulty: '중',
      passRate: 55,
      topics: [
        { name: '청소년 약물남용 실태', desc: '음주, 흡연, 마약' },
        { name: '중독이론', desc: '생물심리사회 모델' },
        { name: '약물남용 선별검사', desc: 'AUDIT, DAST' },
        { name: '동기강화상담', desc: 'MI 원리와 기법' },
        { name: '인지행동치료', desc: '유발요인, 대처기술' },
        { name: '가족개입', desc: 'CRAFT, Al-Anon' },
        { name: '재발예방', desc: 'Marlatt 모델' },
        { name: '치료체계 연계', desc: '의료기관, 자조모임' }
      ],
      tips: '동기강화상담(MI) 원리와 OARS 기법 중점 학습'
    }
  ];

  const interviewAreas = [
    {
      area: '상담 전문성',
      weight: 30,
      criteria: ['고급 상담이론 적용능력', '사례개념화 능력', '개입전략 수립'],
      sampleQuestions: [
        '복합외상을 경험한 청소년에 대한 사례개념화와 개입전략을 설명하시오.',
        '인지행동치료와 정신역동 접근을 통합하여 우울 청소년을 상담한다면?'
      ]
    },
    {
      area: '슈퍼비전 역량',
      weight: 25,
      criteria: ['슈퍼비전 모델 이해', '교육훈련 설계능력', '피드백 기술'],
      sampleQuestions: [
        '초심상담자가 내담자에게 과도하게 동일시할 때 어떻게 슈퍼비전 하시겠습니까?',
        '발달적 슈퍼비전 모델에 따른 상담자 발달단계별 슈퍼비전 전략은?'
      ]
    },
    {
      area: '정책·행정 이해',
      weight: 20,
      criteria: ['청소년정책 이해', '법률 지식', '행정체계 파악'],
      sampleQuestions: [
        '청소년상담복지센터와 학교밖청소년지원센터의 역할과 연계방안을 설명하시오.',
        '청소년보호법 개정에 따른 상담현장의 변화와 대응방안은?'
      ]
    },
    {
      area: '위기개입 능력',
      weight: 25,
      criteria: ['위기평가 능력', '긴급대응 역량', '연계체계 활용'],
      sampleQuestions: [
        '자살위기 청소년을 발견했을 때 즉각적인 개입 절차를 설명하시오.',
        '학교폭력 피해 청소년의 외상후스트레스 증상에 대한 개입전략은?'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">홈</Link>
            <span className="mx-2">/</span>
            <Link href="/category/welfare" className="hover:text-gray-700">복지·상담</Link>
            <span className="mx-2">/</span>
            <Link href="/category/welfare/youth-counselor-1" className="hover:text-gray-700">청소년상담사 1급</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">시험정보</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2">청소년상담사 1급 시험정보</h1>
          <p className="text-purple-100">필기시험 + 면접시험 상세 안내</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('written')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'written'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'interview'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              🎤 면접시험
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* Written Exam Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-purple-600">과목수</p>
                  <p className="text-2xl font-bold text-purple-800">5과목</p>
                  <p className="text-xs text-purple-600">필수3 + 선택2</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-purple-600">문항수</p>
                  <p className="text-2xl font-bold text-purple-800">125문항</p>
                  <p className="text-xs text-purple-600">과목당 25문항</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-purple-600">시험시간</p>
                  <p className="text-2xl font-bold text-purple-800">150분</p>
                  <p className="text-xs text-purple-600">2시간 30분</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-purple-600">합격기준</p>
                  <p className="text-2xl font-bold text-purple-800">60점</p>
                  <p className="text-xs text-purple-600">평균 60점, 과락 40점</p>
                </div>
              </div>
            </div>

            {/* Required Subjects */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">●</span> 필수과목 (3과목)
              </h2>
              <div className="space-y-6">
                {requiredSubjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold">{subject.name}</h3>
                          <p className="text-sm text-gray-500">{subject.questions}문항 | 난이도 {subject.difficulty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">예상 합격률</p>
                        <p className="text-xl font-bold text-purple-600">{subject.passRate}%</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {subject.topics.map((topic, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-gray-800">{topic.name}</p>
                          <p className="text-sm text-gray-500">{topic.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>💡 학습 팁:</strong> {subject.tips}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selective Subjects */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500">●</span> 선택과목 (4과목 중 2과목 선택)
              </h2>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  <strong>⭐ 선택 추천:</strong> 위기상담 + 비행상담 (출제빈도 높고, 다른 필수과목과 연계성 좋음)
                </p>
              </div>
              <div className="space-y-6">
                {selectiveSubjects.map((subject, index) => (
                  <div key={index} className={`border rounded-xl p-5 ${subject.recommended ? 'border-blue-300 bg-blue-50/30' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="text-lg font-bold flex items-center gap-2">
                            {subject.name}
                            {subject.recommended && (
                              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">추천</span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500">{subject.questions}문항 | 난이도 {subject.difficulty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">예상 합격률</p>
                        <p className="text-xl font-bold text-purple-600">{subject.passRate}%</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {subject.topics.map((topic, i) => (
                        <div key={i} className="bg-white rounded-lg p-3 border border-gray-100">
                          <p className="font-medium text-gray-800">{topic.name}</p>
                          <p className="text-sm text-gray-500">{topic.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>💡 학습 팁:</strong> {subject.tips}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Passing Strategy */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">📈 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-purple-700">과목별 학습 비중</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>상담자 교육 및 사례지도</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>청소년 관련 법과 행정</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>상담연구방법론의 실제</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>선택과목 2개</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-indigo-500 h-3 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-purple-700">핵심 합격 포인트</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      <span>슈퍼비전 모델(발달적, 통합적) 완벽 이해</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      <span>청소년 관련 법률 간 비교표 작성</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      <span>통계분석 방법 선택 기준 숙지</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      <span>위기개입 6단계 절차 암기</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-500">✓</span>
                      <span>최근 5개년 기출문제 3회독</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Interview Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">면접시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-indigo-600">면접방식</p>
                  <p className="text-xl font-bold text-indigo-800">구술면접</p>
                  <p className="text-xs text-indigo-600">개별 심층면접</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-indigo-600">면접시간</p>
                  <p className="text-xl font-bold text-indigo-800">20~30분</p>
                  <p className="text-xs text-indigo-600">1인당</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-indigo-600">면접위원</p>
                  <p className="text-xl font-bold text-indigo-800">3인</p>
                  <p className="text-xs text-indigo-600">전문가 패널</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-indigo-600">합격기준</p>
                  <p className="text-xl font-bold text-indigo-800">15점↑</p>
                  <p className="text-xs text-indigo-600">3인 합계 (각 5점)</p>
                </div>
              </div>
            </div>

            {/* Interview Areas */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6">면접 평가영역</h2>
              <div className="space-y-6">
                {interviewAreas.map((area, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">{area.area}</h3>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        배점 {area.weight}%
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">평가 기준</p>
                      <div className="flex flex-wrap gap-2">
                        {area.criteria.map((criterion, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                            {criterion}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-indigo-800 mb-2">예상 질문</p>
                      <ul className="space-y-2">
                        {area.sampleQuestions.map((q, i) => (
                          <li key={i} className="text-sm text-indigo-700 flex items-start gap-2">
                            <span>Q.</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Tips */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">🎯 면접 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-indigo-700">사전 준비</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">1.</span>
                      <span>자기소개서 핵심 경력 3가지 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">2.</span>
                      <span>슈퍼비전 경험 사례 2-3개 준비</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">3.</span>
                      <span>위기개입 실제 사례 구조화</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">4.</span>
                      <span>최근 청소년정책 이슈 파악</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-indigo-700">면접 당일</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">✓</span>
                      <span>단정한 복장 (정장 권장)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">✓</span>
                      <span>질문 경청 후 구조화된 답변</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">✓</span>
                      <span>구체적 사례와 근거 제시</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-indigo-500">✓</span>
                      <span>모르는 질문은 솔직히 인정</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800">
                  <strong>💡 핵심 포인트:</strong> 1급은 "슈퍼바이저로서의 역량"을 가장 중점적으로 평가합니다.
                  2·3급 상담사를 어떻게 교육하고 성장시킬 것인지에 대한 비전과 실제 경험을 잘 전달하세요.
                </p>
              </div>
            </div>

            {/* Past Interview Questions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">📋 기출 면접 질문 예시</h2>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"슈퍼비전에서 상담자의 역전이를 어떻게 다루시겠습니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"청소년상담복지센터 운영에서 가장 중요한 3가지는 무엇이라고 생각하십니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"자해 위기청소년에 대한 개입 경험과 그 과정에서의 어려움을 말씀해 주세요."</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"청소년상담 분야의 전문성 향상을 위해 어떤 노력을 하고 계십니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"상담연구 경험이 있으시다면 연구 주제와 방법론에 대해 설명해 주세요."</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Study Links */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">📚 과목별 학습하기</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[...requiredSubjects, ...selectiveSubjects.slice(0, 2)].map((subject, index) => (
              <Link
                key={index}
                href={`/category/welfare/youth-counselor-1/study/${
                  index === 0 ? 'supervision' :
                  index === 1 ? 'youth-law' :
                  index === 2 ? 'research-method' :
                  index === 3 ? 'crisis-counseling' : 'delinquency-counseling'
                }`}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition"
              >
                <span className="text-2xl">{subject.icon}</span>
                <div>
                  <p className="font-medium">{subject.name}</p>
                  <p className="text-sm text-gray-500">{subject.questions}문항</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            본 정보는 한국청소년상담복지개발원 공식 정보를 기반으로 작성되었습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
