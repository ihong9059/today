'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function YouthCounselor2ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  const requiredSubjects = [
    {
      name: '청소년상담의 이론과 실제',
      icon: '💬',
      questions: 25,
      difficulty: '중상',
      passRate: 45,
      topics: [
        { name: '상담이론', desc: '정신분석, 인간중심, 인지행동' },
        { name: '청소년 발달', desc: '발달과업, 발달단계' },
        { name: '상담과정', desc: '구조화, 초기면접' },
        { name: '상담기법', desc: '경청, 반영, 질문' },
        { name: '문제유형별 상담', desc: '학업, 진로, 대인관계' },
        { name: '매체상담', desc: '전화상담, 사이버상담' },
        { name: '상담윤리', desc: '비밀보장, 이중관계' },
        { name: '다문화상담', desc: '문화적 역량, 다양성' }
      ],
      tips: '각 상담이론(정신분석, 인간중심, 인지행동, 게슈탈트)의 핵심 개념과 기법 비교표 작성 필수'
    },
    {
      name: '상담연구방법론의 기초',
      icon: '📊',
      questions: 25,
      difficulty: '중',
      passRate: 55,
      topics: [
        { name: '과학적 연구', desc: '연구의 목적, 과정' },
        { name: '연구설계', desc: '실험/비실험 설계' },
        { name: '표집방법', desc: '확률/비확률 표집' },
        { name: '측정', desc: '측정수준, 척도유형' },
        { name: '신뢰도·타당도', desc: '검사의 양호도' },
        { name: '기술통계', desc: '평균, 표준편차' },
        { name: '추론통계', desc: 't검정, 상관분석' },
        { name: '연구윤리', desc: '연구대상자 보호' }
      ],
      tips: '신뢰도 유형(검사-재검사, 동형, 반분, 내적합치도)과 타당도 유형 구분 암기'
    },
    {
      name: '심리측정평가의 활용',
      icon: '📋',
      questions: 25,
      difficulty: '중상',
      passRate: 40,
      topics: [
        { name: '심리검사 이론', desc: '검사의 기초, 규준' },
        { name: '지능검사', desc: 'K-WISC, K-WAIS' },
        { name: '성격검사', desc: 'MMPI-2, MBTI' },
        { name: '투사검사', desc: 'HTP, BGT, SCT' },
        { name: '진로검사', desc: 'Holland, Strong' },
        { name: '행동평가', desc: 'CBCL, K-BASC' },
        { name: '검사해석', desc: '프로파일 분석' },
        { name: '검사 활용', desc: '보고서 작성, 피드백' }
      ],
      tips: 'K-WISC-V 하위검사 구성과 MMPI-2 타당도/임상척도 해석 중점 학습'
    },
    {
      name: '이상심리',
      icon: '🧠',
      questions: 25,
      difficulty: '중상',
      passRate: 45,
      topics: [
        { name: '이상심리 모델', desc: '생물, 심리, 사회 모델' },
        { name: '불안장애', desc: '범불안, 공황, 사회불안' },
        { name: '우울장애', desc: '주요우울, 지속성우울' },
        { name: '양극성장애', desc: '조증, 경조증 삽화' },
        { name: '외상관련 장애', desc: 'PTSD, 급성스트레스' },
        { name: '섭식장애', desc: '신경성 식욕부진/폭식' },
        { name: '청소년기 장애', desc: 'ADHD, 품행장애' },
        { name: 'DSM-5 진단체계', desc: '진단기준, 감별진단' }
      ],
      tips: 'DSM-5 진단기준 숫자(기간, 증상 수)와 청소년 특이 양상 반드시 암기'
    },
    {
      name: '진로상담',
      icon: '🎯',
      questions: 25,
      difficulty: '중',
      passRate: 55,
      topics: [
        { name: '진로발달이론', desc: 'Super, Gottfredson' },
        { name: '특성요인이론', desc: 'Parsons, Holland' },
        { name: '사회인지이론', desc: 'Bandura, Lent' },
        { name: '진로의사결정', desc: 'Gelatt, Krumboltz' },
        { name: '진로검사', desc: 'Holland, 직업카드' },
        { name: '진로상담 과정', desc: '탐색, 구체화' },
        { name: '청소년 진로개입', desc: '진로교육, 체험' },
        { name: '학업상담', desc: '학습동기, 학습전략' }
      ],
      tips: 'Super 진로발달 5단계와 Holland 6각형 모델(RIASEC) 특징 완벽 이해'
    }
  ];

  const selectiveSubjects = [
    {
      name: '집단상담',
      icon: '👥',
      questions: 25,
      difficulty: '중',
      passRate: 60,
      topics: [
        { name: '집단상담 이론', desc: 'Yalom, Corey' },
        { name: '집단역동', desc: '응집력, 보편성' },
        { name: '집단발달단계', desc: '형성기~종결기' },
        { name: '집단상담 기법', desc: '연결짓기, 차단' },
        { name: '집단상담자 역할', desc: '촉진, 모델링' },
        { name: '청소년 집단상담', desc: '학교집단, 치료집단' },
        { name: '집단프로그램', desc: '프로그램 개발' },
        { name: '윤리적 이슈', desc: '비밀보장, 이중관계' }
      ],
      tips: 'Yalom의 치료적 요인 11가지와 집단발달 5단계 특징 암기',
      recommended: true
    },
    {
      name: '가족상담',
      icon: '👨‍👩‍👧',
      questions: 25,
      difficulty: '중상',
      passRate: 50,
      topics: [
        { name: '가족체계이론', desc: 'Bowen, 경계' },
        { name: '구조적 가족치료', desc: 'Minuchin' },
        { name: '전략적 가족치료', desc: 'Haley, MRI' },
        { name: '경험적 가족치료', desc: 'Satir, Whitaker' },
        { name: '해결중심 가족치료', desc: 'de Shazer' },
        { name: '가족생활주기', desc: '발달과업, 전환기' },
        { name: '가족평가', desc: '가계도, 순환질문' },
        { name: '청소년 가족상담', desc: '부모-자녀 갈등' }
      ],
      tips: '각 가족치료 이론가(Bowen, Minuchin, Satir)의 핵심 개념과 기법 비교'
    },
    {
      name: '학업상담',
      icon: '📖',
      questions: 25,
      difficulty: '중',
      passRate: 55,
      topics: [
        { name: '학습이론', desc: '행동주의, 인지주의' },
        { name: '학습동기', desc: '내재동기, 자기효능감' },
        { name: '학습전략', desc: '인지전략, 초인지' },
        { name: '학습부진', desc: '원인분석, 개입' },
        { name: '시험불안', desc: '평가, 개입' },
        { name: '자기조절학습', desc: 'Zimmerman 모델' },
        { name: '학업중단', desc: '위험요인, 예방' },
        { name: '학습상담 개입', desc: '학습코칭, 멘토링' }
      ],
      tips: '자기조절학습 모델과 학습동기 관련 이론(기대-가치, 귀인) 연계 학습'
    }
  ];

  const interviewAreas = [
    {
      area: '청소년 이해 및 상담지식',
      weight: 30,
      criteria: ['청소년 발달 특성 이해', '상담이론 적용능력', '문제유형별 지식'],
      sampleQuestions: [
        '인지행동치료를 우울한 청소년에게 적용할 때 핵심 기법을 설명하시오.',
        '청소년기 자아정체감 발달의 특성과 상담에서의 고려점은?'
      ]
    },
    {
      area: '상담 실무 역량',
      weight: 30,
      criteria: ['상담기법 활용', '사례개념화', '개입전략 수립'],
      sampleQuestions: [
        '학교폭력 피해 청소년 상담 시 초기 면접에서 다루어야 할 내용은?',
        '부모와의 갈등으로 가출을 반복하는 청소년을 어떻게 상담하시겠습니까?'
      ]
    },
    {
      area: '문제해결 능력',
      weight: 20,
      criteria: ['위기대응 능력', '사례관리 역량', '자원연계'],
      sampleQuestions: [
        '상담 중 자해 흔적을 발견했을 때 어떻게 대응하시겠습니까?',
        '학업중단 위기 청소년에 대한 개입계획을 수립해 보세요.'
      ]
    },
    {
      area: '상담자 자질 및 윤리',
      weight: 20,
      criteria: ['윤리의식', '자기이해', '전문성 개발'],
      sampleQuestions: [
        '청소년 상담에서 비밀보장의 한계는 무엇이며 어떻게 설명하시겠습니까?',
        '상담자로서 본인의 강점과 성장이 필요한 영역은?'
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
            <Link href="/category/welfare/youth-counselor-2" className="hover:text-gray-700">청소년상담사 2급</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">시험정보</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2">청소년상담사 2급 시험정보</h1>
          <p className="text-teal-100">필기시험 + 면접시험 상세 안내</p>
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
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'interview'
                  ? 'border-teal-600 text-teal-600'
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
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-teal-600">과목수</p>
                  <p className="text-2xl font-bold text-teal-800">6과목</p>
                  <p className="text-xs text-teal-600">필수5 + 선택1</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-teal-600">문항수</p>
                  <p className="text-2xl font-bold text-teal-800">150문항</p>
                  <p className="text-xs text-teal-600">과목당 25문항</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-teal-600">시험시간</p>
                  <p className="text-2xl font-bold text-teal-800">180분</p>
                  <p className="text-xs text-teal-600">3시간</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-teal-600">합격기준</p>
                  <p className="text-2xl font-bold text-teal-800">60점</p>
                  <p className="text-xs text-teal-600">평균 60점, 과락 40점</p>
                </div>
              </div>
            </div>

            {/* Required Subjects */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">●</span> 필수과목 (5과목)
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
                        <p className="text-xl font-bold text-teal-600">{subject.passRate}%</p>
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
                <span className="text-blue-500">●</span> 선택과목 (3과목 중 1과목 선택)
              </h2>
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  <strong>⭐ 선택 추천:</strong> 집단상담 (출제범위 명확, 실무 활용도 높음)
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
                        <p className="text-xl font-bold text-teal-600">{subject.passRate}%</p>
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
                  <h3 className="font-bold text-teal-700">과목별 학습 비중</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>청소년상담의 이론과 실제</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-teal-500 h-3 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>심리측정평가의 활용</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-teal-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>이상심리</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-teal-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>진로상담 + 연구방법론</span>
                        <span>20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-cyan-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>선택과목</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-cyan-500 h-3 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-teal-700">핵심 합격 포인트</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500">✓</span>
                      <span>상담이론 4대 접근(정신분석, 인간중심, 인지행동, 게슈탈트) 완벽 비교</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500">✓</span>
                      <span>DSM-5 진단기준(기간, 증상 수) 숫자 암기</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500">✓</span>
                      <span>MMPI-2 타당도/임상척도 해석 반복 연습</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500">✓</span>
                      <span>Super 진로발달이론 5단계 특징 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-500">✓</span>
                      <span>최근 5개년 기출문제 최소 3회독</span>
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
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-cyan-600">면접방식</p>
                  <p className="text-xl font-bold text-cyan-800">구술면접</p>
                  <p className="text-xs text-cyan-600">개별 심층면접</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-cyan-600">면접시간</p>
                  <p className="text-xl font-bold text-cyan-800">15~20분</p>
                  <p className="text-xs text-cyan-600">1인당</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-cyan-600">면접위원</p>
                  <p className="text-xl font-bold text-cyan-800">3인</p>
                  <p className="text-xs text-cyan-600">전문가 패널</p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-cyan-600">합격기준</p>
                  <p className="text-xl font-bold text-cyan-800">15점↑</p>
                  <p className="text-xs text-cyan-600">3인 합계 (각 5점)</p>
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
                      <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
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

                    <div className="bg-cyan-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-cyan-800 mb-2">예상 질문</p>
                      <ul className="space-y-2">
                        {area.sampleQuestions.map((q, i) => (
                          <li key={i} className="text-sm text-cyan-700 flex items-start gap-2">
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
                  <h3 className="font-bold text-cyan-700">사전 준비</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">1.</span>
                      <span>자기소개 및 지원동기 1분 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">2.</span>
                      <span>상담 경험 사례 2-3개 구조화</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">3.</span>
                      <span>주요 상담이론별 개입 시나리오 준비</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">4.</span>
                      <span>윤리적 딜레마 상황 대처방안 정리</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-cyan-700">면접 당일</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">✓</span>
                      <span>단정한 복장 (정장 또는 세미정장)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">✓</span>
                      <span>질문 이해 후 구조화된 답변</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">✓</span>
                      <span>구체적 사례 제시 (추상적 답변 X)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-500">✓</span>
                      <span>모르는 질문은 솔직히 인정</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800">
                  <strong>💡 핵심 포인트:</strong> 2급은 "실무 상담 역량"을 중점 평가합니다.
                  이론적 지식보다 실제 상담 상황에서의 대처능력과 청소년에 대한 이해를 보여주세요.
                </p>
              </div>
            </div>

            {/* Past Interview Questions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">📋 기출 면접 질문 예시</h2>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"청소년 내담자와 라포 형성을 위해 어떤 노력을 하시겠습니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"상담 중 내담자가 자살사고를 언급할 때 어떻게 대처하시겠습니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"부모가 상담내용을 알려달라고 할 때 어떻게 대응하시겠습니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"게임 과몰입 청소년을 상담한다면 어떤 접근을 사용하시겠습니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"상담자로서 소진을 경험했을 때 어떻게 관리하시겠습니까?"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Study Links */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">📚 과목별 학습하기</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[...requiredSubjects, selectiveSubjects[0]].map((subject, index) => (
              <Link
                key={index}
                href={`/category/welfare/youth-counselor-2/study/${
                  index === 0 ? 'counseling-theory' :
                  index === 1 ? 'research-basics' :
                  index === 2 ? 'psychological-assessment' :
                  index === 3 ? 'abnormal-psychology' :
                  index === 4 ? 'career-counseling' : 'group-counseling'
                }`}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-teal-50 transition"
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
