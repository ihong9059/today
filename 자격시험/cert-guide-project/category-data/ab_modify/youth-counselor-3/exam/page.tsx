'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function YouthCounselor3ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'interview'>('written');

  const subjects = [
    {
      name: '발달심리',
      icon: '🌱',
      questions: 25,
      difficulty: '중',
      passRate: 55,
      topics: [
        { name: '발달의 기초', desc: '발달개념, 발달연구' },
        { name: '발달이론', desc: 'Freud, Erikson, Piaget' },
        { name: '영유아기 발달', desc: '신체, 인지, 사회성' },
        { name: '아동기 발달', desc: '학령기 발달과업' },
        { name: '청소년기 발달', desc: '신체, 인지, 정서 변화' },
        { name: '청소년기 사회성', desc: '자아정체감, 또래관계' },
        { name: '도덕성 발달', desc: 'Kohlberg, Gilligan' },
        { name: '성인기 발달', desc: '성인기 이후 발달' }
      ],
      tips: 'Erikson 심리사회적 발달 8단계와 Piaget 인지발달 4단계 비교표 필수 암기'
    },
    {
      name: '집단상담의 기초',
      icon: '👥',
      questions: 25,
      difficulty: '중',
      passRate: 60,
      topics: [
        { name: '집단상담 개관', desc: '정의, 유형, 특성' },
        { name: '집단역동', desc: '응집력, 상호작용' },
        { name: '치료적 요인', desc: 'Yalom의 11가지' },
        { name: '집단발달 단계', desc: '초기-과도기-작업-종결' },
        { name: '집단상담자', desc: '역할, 자질, 윤리' },
        { name: '집단상담 기법', desc: '연결, 차단, 지지' },
        { name: '청소년 집단상담', desc: '특성, 운영방법' },
        { name: '집단프로그램', desc: '개발, 평가' }
      ],
      tips: 'Yalom 치료적 요인 11가지와 집단발달 단계별 특성 반드시 암기'
    },
    {
      name: '심리측정 및 평가',
      icon: '📊',
      questions: 25,
      difficulty: '중',
      passRate: 50,
      topics: [
        { name: '심리검사 기초', desc: '개념, 유형, 목적' },
        { name: '신뢰도와 타당도', desc: '유형별 특성' },
        { name: '규준과 점수', desc: '백분위, 표준점수' },
        { name: '지능검사', desc: 'K-WISC, K-WAIS' },
        { name: '성격검사', desc: 'MMPI, MBTI' },
        { name: '적성검사', desc: '직업적성, 흥미검사' },
        { name: '투사검사', desc: 'HTP, TAT' },
        { name: '검사 해석', desc: '통합해석, 보고서' }
      ],
      tips: '신뢰도·타당도 유형 구분 및 MMPI 척도 해석 기초 학습'
    },
    {
      name: '상담이론',
      icon: '💬',
      questions: 25,
      difficulty: '중상',
      passRate: 45,
      topics: [
        { name: '상담의 기초', desc: '정의, 목표, 과정' },
        { name: '정신분석', desc: 'Freud, 방어기제' },
        { name: '분석심리학', desc: 'Jung, 원형' },
        { name: '개인심리학', desc: 'Adler, 열등감' },
        { name: '인간중심', desc: 'Rogers, 핵심조건' },
        { name: '게슈탈트', desc: 'Perls, 지금-여기' },
        { name: '인지행동', desc: 'Beck, Ellis' },
        { name: '현실치료', desc: 'Glasser, 선택이론' }
      ],
      tips: '각 이론가별 핵심 개념과 상담기법 비교표 작성하여 학습'
    },
    {
      name: '학습이론',
      icon: '📚',
      questions: 25,
      difficulty: '중',
      passRate: 55,
      topics: [
        { name: '학습의 기초', desc: '학습개념, 조건' },
        { name: '행동주의', desc: '고전적, 조작적 조건형성' },
        { name: '인지주의', desc: '정보처리, 형태주의' },
        { name: '사회학습', desc: 'Bandura, 관찰학습' },
        { name: '학습동기', desc: '내재동기, 귀인' },
        { name: '학습전략', desc: '인지전략, 초인지' },
        { name: '기억', desc: '기억과정, 망각' },
        { name: '전이', desc: '학습전이, 파지' }
      ],
      tips: '고전적/조작적 조건형성 비교 및 Bandura 관찰학습 4단계 암기'
    }
  ];

  const interviewAreas = [
    {
      area: '상담 기초지식',
      weight: 25,
      criteria: ['상담이론 이해', '발달심리 지식', '상담과정 이해'],
      sampleQuestions: [
        '인간중심 상담에서 상담자의 3가지 핵심 조건을 설명하시오.',
        '청소년기 자아정체감 발달의 특성을 설명하시오.'
      ]
    },
    {
      area: '의사소통 능력',
      weight: 25,
      criteria: ['경청 능력', '공감적 반응', '언어적 표현력'],
      sampleQuestions: [
        '공감적 반응의 의미와 청소년 상담에서의 중요성을 설명하시오.',
        '비언어적 의사소통의 유형과 상담에서의 활용법을 말해보세요.'
      ]
    },
    {
      area: '청소년 이해',
      weight: 25,
      criteria: ['청소년기 특성 이해', '청소년 문제 이해', '문화적 감수성'],
      sampleQuestions: [
        '요즘 청소년들이 겪는 주요 스트레스 요인을 말해보세요.',
        '청소년기 또래관계의 중요성과 영향을 설명하시오.'
      ]
    },
    {
      area: '상담자 자질',
      weight: 25,
      criteria: ['윤리의식', '자기이해', '성장의지'],
      sampleQuestions: [
        '상담자로서 본인의 강점과 보완할 점은 무엇입니까?',
        '청소년상담사가 되고 싶은 이유를 말해보세요.'
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
            <Link href="/category/welfare/youth-counselor-3" className="hover:text-gray-700">청소년상담사 3급</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">시험정보</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2">청소년상담사 3급 시험정보</h1>
          <p className="text-emerald-100">필기시험 + 면접시험 상세 안내</p>
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
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'interview'
                  ? 'border-emerald-600 text-emerald-600'
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
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-emerald-600">과목수</p>
                  <p className="text-2xl font-bold text-emerald-800">5과목</p>
                  <p className="text-xs text-emerald-600">필수 5과목</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-emerald-600">문항수</p>
                  <p className="text-2xl font-bold text-emerald-800">125문항</p>
                  <p className="text-xs text-emerald-600">과목당 25문항</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-emerald-600">시험시간</p>
                  <p className="text-2xl font-bold text-emerald-800">150분</p>
                  <p className="text-xs text-emerald-600">2시간 30분</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-emerald-600">합격기준</p>
                  <p className="text-2xl font-bold text-emerald-800">60점</p>
                  <p className="text-xs text-emerald-600">평균 60점, 과락 40점</p>
                </div>
              </div>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-emerald-500">●</span> 시험과목 (5과목)
              </h2>
              <div className="space-y-6">
                {subjects.map((subject, index) => (
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
                        <p className="text-xl font-bold text-emerald-600">{subject.passRate}%</p>
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

            {/* Passing Strategy */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">📈 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-emerald-700">과목별 학습 비중</h3>
                  <div className="space-y-2">
                    {subjects.map((subject, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{subject.name}</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-emerald-700">핵심 합격 포인트</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>발달이론가(Erikson, Piaget, Kohlberg) 비교 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>주요 상담이론별 핵심 개념과 기법 암기</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>Yalom의 치료적 요인 11가지 숙지</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
                      <span>신뢰도·타당도 유형 구분</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500">✓</span>
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
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600">면접방식</p>
                  <p className="text-xl font-bold text-green-800">구술면접</p>
                  <p className="text-xs text-green-600">개별면접</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600">면접시간</p>
                  <p className="text-xl font-bold text-green-800">10~15분</p>
                  <p className="text-xs text-green-600">1인당</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600">면접위원</p>
                  <p className="text-xl font-bold text-green-800">3인</p>
                  <p className="text-xs text-green-600">전문가 패널</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-600">합격기준</p>
                  <p className="text-xl font-bold text-green-800">15점↑</p>
                  <p className="text-xs text-green-600">3인 합계 (각 5점)</p>
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
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
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

                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-green-800 mb-2">예상 질문</p>
                      <ul className="space-y-2">
                        {area.sampleQuestions.map((q, i) => (
                          <li key={i} className="text-sm text-green-700 flex items-start gap-2">
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
                  <h3 className="font-bold text-green-700">사전 준비</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">1.</span>
                      <span>자기소개 및 지원동기 1분 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">2.</span>
                      <span>주요 상담이론 핵심 개념 정리</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">3.</span>
                      <span>청소년 관련 시사 이슈 파악</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">4.</span>
                      <span>상담자로서의 강점/약점 정리</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-green-700">면접 당일</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>단정한 복장 (정장 또는 세미정장)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>질문 경청 후 침착하게 답변</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>구체적 경험 사례 제시</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span>모르는 질문은 솔직히 인정</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800">
                  <strong>💡 핵심 포인트:</strong> 3급은 "기초 역량과 성장 가능성"을 평가합니다.
                  청소년상담에 대한 열정과 기본적인 상담지식, 청소년에 대한 이해를 보여주세요.
                </p>
              </div>
            </div>

            {/* Past Interview Questions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">📋 기출 면접 질문 예시</h2>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"청소년상담사가 되고자 하는 이유는 무엇입니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"청소년기의 특성을 3가지 말씀해 주세요."</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"좋은 상담자가 되기 위해 어떤 노력을 하고 계십니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"본인이 생각하는 공감이란 무엇입니까?"</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">"청소년 상담에서 비밀보장의 한계는 무엇이라고 생각합니까?"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Study Links */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">📚 과목별 학습하기</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <Link
                key={index}
                href={`/category/welfare/youth-counselor-3/study/${
                  index === 0 ? 'developmental-psychology' :
                  index === 1 ? 'group-counseling-basics' :
                  index === 2 ? 'psychological-testing' :
                  index === 3 ? 'counseling-theory' : 'learning-theory'
                }`}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 transition"
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
