'use client';
import { useState } from 'react';

export default function CareerCounselor2ExamPage() {
  const [activeTab, setActiveTab] = useState<'written' | 'practical'>('written');

  const subjects = [
    {
      name: '직업상담학',
      slug: 'counseling',
      questions: 20,
      difficulty: 3,
      passRate: 65,
      topics: [
        '직업상담의 개념과 역사',
        '상담이론 (정신분석, 인간중심, 행동주의)',
        '상담기법과 기술',
        '집단상담의 원리',
        '직업상담 윤리',
        '상담과정과 단계',
        '내담자 이해와 평가',
        '상담관계 형성'
      ]
    },
    {
      name: '직업심리학',
      slug: 'psychology',
      questions: 20,
      difficulty: 4,
      passRate: 55,
      topics: [
        '직업심리학의 기초',
        '직업발달이론 (Super, Holland)',
        '직업적성검사',
        '직업흥미검사 (RIASEC)',
        '성격검사 (MBTI, Big5)',
        '직업가치관 검사',
        '심리검사 실시와 해석',
        '진로의사결정이론'
      ]
    },
    {
      name: '직업정보론',
      slug: 'job-information',
      questions: 20,
      difficulty: 3,
      passRate: 60,
      topics: [
        '직업정보의 개념과 유형',
        '한국표준직업분류(KSCO)',
        '한국고용직업분류(KECO)',
        '직업정보 수집과 분석',
        '워크넷과 고용정보시스템',
        '직업전망과 트렌드',
        '노동시장 정보 활용',
        '직업연구 방법론'
      ]
    },
    {
      name: '노동시장론',
      slug: 'labor-market',
      questions: 20,
      difficulty: 3,
      passRate: 60,
      topics: [
        '노동시장의 구조와 특성',
        '노동수요와 공급',
        '임금결정이론',
        '실업의 유형과 원인',
        '고용정책과 제도',
        '인적자원개발',
        '노동시장 유연성',
        '비정규직과 노동시장 이중구조'
      ]
    },
    {
      name: '노동관계법규',
      slug: 'labor-law',
      questions: 20,
      difficulty: 4,
      passRate: 50,
      topics: [
        '근로기준법 핵심 조항',
        '근로계약과 취업규칙',
        '임금과 근로시간',
        '해고와 부당해고 구제',
        '고용보험법',
        '직업안정법',
        '고용정책기본법',
        '산업재해보상보험법'
      ]
    }
  ];

  const practicalAreas = [
    {
      name: '직업상담 사례분석',
      ratio: 30,
      topics: ['상담사례 분석', '상담전략 수립', '내담자 문제 파악', '상담기록 작성'],
      frequency: '매회 출제'
    },
    {
      name: '심리검사 해석',
      ratio: 25,
      topics: ['Holland 검사 해석', 'MBTI 유형 분석', '직업적성검사 해석', '검사결과 상담'],
      frequency: '매회 출제'
    },
    {
      name: '직업정보 분석',
      ratio: 25,
      topics: ['직업분류 적용', '직업전망 분석', '채용정보 해석', '워크넷 활용'],
      frequency: '자주 출제'
    },
    {
      name: '취업지원 실무',
      ratio: 20,
      topics: ['이력서 첨삭', '자기소개서 지도', '면접 코칭', '취업프로그램 기획'],
      frequency: '간헐 출제'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education" className="text-gray-600 hover:text-teal-600">교육</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education/career-counselor-2" className="text-gray-600 hover:text-teal-600">직업상담사 2급</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">시험상세</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📝</span>
            <div>
              <h1 className="text-2xl font-bold">직업상담사 2급 시험 상세</h1>
              <p className="text-teal-100">필기 5과목 100문항 + 실기 필답형</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[57px] z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('written')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'written'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📝 필기시험
            </button>
            <button
              onClick={() => setActiveTab('practical')}
              className={`py-4 px-6 font-medium border-b-2 transition ${
                activeTab === 'practical'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              ✍️ 실기시험
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'written' ? (
          <div className="space-y-8">
            {/* 필기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 필기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <p className="text-2xl font-bold text-teal-600">5과목</p>
                  <p className="text-sm text-gray-600">시험 과목</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <p className="text-2xl font-bold text-teal-600">100문항</p>
                  <p className="text-sm text-gray-600">객관식 4지선다</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <p className="text-2xl font-bold text-teal-600">2시간 30분</p>
                  <p className="text-sm text-gray-600">시험 시간</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <p className="text-2xl font-bold text-teal-600">60점 이상</p>
                  <p className="text-sm text-gray-600">과목당 40점+</p>
                </div>
              </div>
            </section>

            {/* 과목별 상세 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">📚 과목별 상세</h2>
              {subjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.questions}문항</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(s => (
                            <span key={s} className={s <= subject.difficulty ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">합격률 {subject.passRate}%</p>
                      </div>
                      <a
                        href={`/category/education/career-counselor-2/study/${subject.slug}`}
                        className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition text-sm"
                      >
                        학습하기 →
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {subject.topics.map((topic, i) => (
                      <div key={i} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* 합격 전략 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 합격 전략</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-teal-500">✅</span> 고득점 과목 공략
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 직업상담학, 직업정보론은 암기량 대비 점수 효율 높음</li>
                    <li>• 기출문제 5개년 반복 학습으로 70점 이상 가능</li>
                    <li>• 직업심리학 심리검사 유형은 반드시 암기</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    <span className="text-teal-500">⚠️</span> 과락 주의 과목
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 노동관계법규는 법조문 암기가 필수</li>
                    <li>• 근로기준법, 고용보험법 집중 학습</li>
                    <li>• 최소 40점 확보를 위한 핵심 조항 정리</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 실기시험 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">📋 실기시험 개요</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">필답형</p>
                  <p className="text-sm text-gray-600">시험 유형</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">서술형</p>
                  <p className="text-sm text-gray-600">답안 형식</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">2시간 30분</p>
                  <p className="text-sm text-gray-600">시험 시간</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">60점 이상</p>
                  <p className="text-sm text-gray-600">합격 기준</p>
                </div>
              </div>
            </section>

            {/* 영역별 상세 */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">✍️ 영역별 상세</h2>
              {practicalAreas.map((area, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                        {area.ratio}%
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">{area.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          area.frequency === '매회 출제' ? 'bg-red-100 text-red-600' :
                          area.frequency === '자주 출제' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {area.frequency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {area.topics.map((topic, i) => (
                      <div key={i} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* 실기 대비 팁 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">💡 실기 대비 팁</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">사례분석 작성법</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• 문제 파악 → 원인 분석 → 상담전략 순서로 작성</li>
                    <li>• 상담이론을 근거로 제시 (예: "Super의 발달이론에 따르면...")</li>
                    <li>• 구체적인 상담기법 명시 (예: "적극적 경청", "재진술")</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">심리검사 해석법</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Holland 코드(RIASEC) 조합별 직업 암기 필수</li>
                    <li>• MBTI 16유형별 특징과 적합 직업 정리</li>
                    <li>• 검사결과 → 직업추천 → 상담방향 연결</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 실기 학습 링크 */}
            <section className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">📖 실기 학습하기</h2>
              <p className="text-emerald-100 mb-4">사례분석과 심리검사 해석 문제를 연습하세요.</p>
              <a
                href="/category/education/career-counselor-2/study/practical"
                className="inline-block px-6 py-3 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition"
              >
                실기 문제 풀기 →
              </a>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2026 자격시험 가이드. 시험 정보는 Q-Net 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
