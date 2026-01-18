'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HousingManagerExamPage() {
  const [activeTab, setActiveTab] = useState<'first' | 'second'>('first');

  const firstExamSubjects = [
    {
      name: '민법',
      questions: 40,
      time: '50분',
      difficulty: '상',
      passRate: '32%',
      topics: ['민법총칙', '물권법 총론', '소유권과 점유권', '담보물권', '채권법 총론', '계약법', '주택임대차보호법', '집합건물의 소유 및 관리에 관한 법률'],
      studyLink: 'civil-law'
    },
    {
      name: '회계원리',
      questions: 40,
      time: '50분',
      difficulty: '중',
      passRate: '40%',
      topics: ['회계의 기초', '재무제표의 이해', '분개와 전기', '결산절차', '유동자산 회계', '비유동자산 회계', '부채와 자본', '관리회계 기초'],
      studyLink: 'accounting'
    }
  ];

  const secondExamSubjects = [
    {
      name: '공동주택시설개론',
      points: 40,
      time: '60분',
      difficulty: '중상',
      passRate: '38%',
      topics: ['건축구조 일반', '급배수 위생설비', '냉난방 공조설비', '전기설비', '소방설비', '승강기설비', '가스설비', '통신설비'],
      studyLink: 'facility-intro'
    },
    {
      name: '주택관리관계법규',
      points: 40,
      time: '60분',
      difficulty: '상',
      passRate: '35%',
      topics: ['공동주택관리법', '주택법', '민간임대주택에 관한 특별법', '건축법', '소방시설법', '승강기 안전관리법', '전기사업법', '도시가스사업법'],
      studyLink: 'housing-law'
    },
    {
      name: '공동주택관리실무',
      points: 40,
      time: '60분',
      difficulty: '중',
      passRate: '42%',
      topics: ['입주자관리', '관리비 부과', '장기수선계획', '하자담보책임', '입주자대표회의', '관리규약', '회계관리', '안전관리'],
      studyLink: 'practical'
    }
  ];

  const strategies = {
    first: [
      { title: '민법 기초 확립', desc: '물권법과 채권법의 기본 원리를 체계적으로 이해' },
      { title: '회계 분개 연습', desc: '기출문제 분개 유형 반복 학습' },
      { title: '주임법 집중', desc: '주택임대차보호법 조문별 사례 학습' },
      { title: '기출문제 분석', desc: '최근 5년 기출문제 완벽 분석' }
    ],
    second: [
      { title: '법규 조문 암기', desc: '공동주택관리법 핵심 조문 정리' },
      { title: '설비 기초 이해', desc: '각 설비별 작동원리와 점검방법' },
      { title: '실무 케이스 학습', desc: '실제 관리사무소 업무 사례 연구' },
      { title: '논술 답안 연습', desc: '주관식 답안 작성 요령 습득' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/housing-manager" className="text-gray-500 hover:text-gray-700">주택관리사(보)</Link>
            <span className="text-gray-300">/</span>
            <span className="text-cyan-600 font-medium">시험 상세</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">주택관리사(보) 시험 상세</h1>
          <p className="text-gray-600">1차 시험(객관식)과 2차 시험(주관식)의 상세 정보를 확인하세요</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab('first')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'first' ? 'bg-cyan-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            📗 1차 시험 (객관식)
          </button>
          <button onClick={() => setActiveTab('second')}
            className={`px-6 py-3 rounded-xl font-medium transition ${activeTab === 'second' ? 'bg-cyan-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            📘 2차 시험 (주관식)
          </button>
        </div>

        {/* First Exam Tab */}
        {activeTab === 'first' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📋</span> 1차 시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">2과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">80문항</div>
                  <div className="text-sm text-gray-600">총 문항수</div>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">100분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-600">객관식</div>
                  <div className="text-sm text-gray-600">시험유형</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ 합격 기준:</strong> 각 과목 40점 이상 + 전 과목 평균 60점 이상
                </p>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-cyan-500">📚</span> 과목별 상세
              </h2>
              {firstExamSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{idx + 1}과목. {subject.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>{subject.questions}문항</span>
                        <span>{subject.time}</span>
                        <span>난이도: {subject.difficulty}</span>
                        <span>합격률: {subject.passRate}</span>
                      </div>
                    </div>
                    <Link href={`/category/insurance/housing-manager/study/${subject.studyLink}`}
                      className="px-4 py-2 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200 transition text-sm font-medium">
                      학습하기 →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {subject.topics.map((topic, tidx) => (
                      <div key={tidx} className="bg-gray-50 px-3 py-2 rounded-lg text-sm">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* First Exam Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🎯</span> 1차 시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.first.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-cyan-50 rounded-xl">
                    <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-cyan-700">{s.title}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tips */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">💡</span> 1차 시험 학습 팁
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-700 mb-1">민법 공부법</h4>
                  <p className="text-sm text-gray-600">물권법(소유권, 용익물권, 담보물권)과 채권법(계약, 불법행위)의 기본 개념을 먼저 이해하고, 주택임대차보호법은 조문별로 사례와 함께 학습하세요.</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                  <h4 className="font-bold text-green-700 mb-1">회계원리 공부법</h4>
                  <p className="text-sm text-gray-600">분개 연습이 핵심입니다. 기출문제에 나온 분개 유형을 반복 학습하고, 재무제표 작성 과정을 이해하면 고득점이 가능합니다.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Second Exam Tab */}
        {activeTab === 'second' && (
          <div className="space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📋</span> 2차 시험 개요
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">3과목</div>
                  <div className="text-sm text-gray-600">시험과목</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">120점</div>
                  <div className="text-sm text-gray-600">총 배점</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">180분</div>
                  <div className="text-sm text-gray-600">시험시간</div>
                </div>
                <div className="bg-teal-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-teal-600">주관식</div>
                  <div className="text-sm text-gray-600">시험유형</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ 합격 기준:</strong> 각 과목 40점 이상 + 전 과목 평균 60점 이상 (1차 합격자에 한함)
                </p>
              </div>
            </section>

            {/* Subject Details */}
            <section className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="text-teal-500">📚</span> 과목별 상세
              </h2>
              {secondExamSubjects.map((subject, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{idx + 1}과목. {subject.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        <span>{subject.points}점 배점</span>
                        <span>{subject.time}</span>
                        <span>난이도: {subject.difficulty}</span>
                        <span>합격률: {subject.passRate}</span>
                      </div>
                    </div>
                    <Link href={`/category/insurance/housing-manager/study/${subject.studyLink}`}
                      className="px-4 py-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition text-sm font-medium">
                      학습하기 →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {subject.topics.map((topic, tidx) => (
                      <div key={tidx} className="bg-gray-50 px-3 py-2 rounded-lg text-sm">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Frequency */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">📈</span> 출제 경향
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="font-medium">매회 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['장기수선계획', '입주자대표회의', '관리비 부과', '하자담보책임', '관리규약'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="font-medium">자주 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['소방시설 점검', '승강기 안전관리', '전기안전관리', '급수설비', '입주민 분쟁조정'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="font-medium">간헐 출제</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['CCTV 설치', '주차장 관리', '조경관리', '에너지절약'].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Second Exam Strategy */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">🎯</span> 2차 시험 합격 전략
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {strategies.second.map((s, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-teal-50 rounded-xl">
                    <span className="w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">{idx + 1}</span>
                    <div>
                      <h3 className="font-bold text-teal-700">{s.title}</h3>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Writing Tips */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-teal-500">✍️</span> 주관식 답안 작성 요령
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-teal-50 rounded-xl">
                  <h4 className="font-bold text-teal-700 mb-2">1. 답안 구조화</h4>
                  <p className="text-sm text-gray-600">서론-본론-결론 형태로 답안을 구조화하고, 핵심 키워드를 명확히 기술하세요.</p>
                </div>
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <h4 className="font-bold text-cyan-700 mb-2">2. 법령 근거 제시</h4>
                  <p className="text-sm text-gray-600">공동주택관리법 제○조 등 법령 조항을 함께 기술하면 신뢰도가 높아집니다.</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <h4 className="font-bold text-blue-700 mb-2">3. 시간 배분</h4>
                  <p className="text-sm text-gray-600">180분에 3과목이므로 과목당 60분을 기준으로 배분하고, 5분 정도 검토 시간을 확보하세요.</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Common Info */}
        <section className="mt-8 bg-white rounded-2xl p-6 shadow-sm border">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-cyan-500">📌</span> 응시 자격 및 유의사항
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-700 mb-3">응시 자격</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>학력, 경력 제한 없음</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>2차 시험은 해당 연도 1차 합격자 또는 전년도 1차 합격자에 한함</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-1">•</span>
                  <span>결격사유 해당자 제외 (공동주택관리법 제70조)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-700 mb-3">시험 유의사항</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>1차 합격 유효기간: 합격한 연도 + 다음 연도까지</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>2차 시험: 주관식(논술형+단답형 혼합)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 mt-1">•</span>
                  <span>합격 후 실무교육 이수 시 자격증 발급</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 주택관리사(보) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
