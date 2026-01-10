'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function YouthCounselor1Page() {
  const [activeTab, setActiveTab] = useState('overview');

  const subjects = [
    {
      name: '상담자 교육 및 사례지도',
      slug: 'supervision',
      questions: 25,
      icon: '👨‍🏫',
      difficulty: '상',
      description: '상담자 교육, 슈퍼비전, 사례개념화',
      topics: ['슈퍼비전 모델', '사례개념화', '상담자 발달', '윤리적 이슈']
    },
    {
      name: '청소년 관련 법과 행정',
      slug: 'youth-law',
      questions: 25,
      icon: '⚖️',
      difficulty: '중상',
      description: '청소년 관련 법령, 정책, 행정체계',
      topics: ['청소년기본법', '청소년보호법', '청소년복지법', '행정체계']
    },
    {
      name: '상담연구방법론의 실제',
      slug: 'research-method',
      questions: 25,
      icon: '📊',
      difficulty: '상',
      description: '연구설계, 통계분석, 논문작성',
      topics: ['연구설계', '양적연구', '질적연구', '통계분석']
    },
    {
      name: '위기상담 (선택)',
      slug: 'crisis-counseling',
      questions: 25,
      icon: '🆘',
      difficulty: '상',
      description: '위기개입, 자살예방, 트라우마 상담',
      topics: ['위기개입모델', '자살예방', '트라우마', '재난상담']
    },
    {
      name: '비행상담 (선택)',
      slug: 'delinquency-counseling',
      questions: 25,
      icon: '🚨',
      difficulty: '중상',
      description: '비행청소년 상담, 교정상담',
      topics: ['비행이론', '교정상담', '가족치료', '재범예방']
    }
  ];

  const schedule2026 = [
    { round: '제22회', apply: '2026.07.06 ~ 07.10', written: '2026.10.17(토)', interview: '2026.12.12(토)', result: '2027.01월' }
  ];

  const aiQuestions = [
    "청소년상담사 1급에서 슈퍼비전의 핵심 모델과 기법을 설명해주세요",
    "청소년기본법과 청소년보호법의 주요 차이점을 비교해주세요",
    "위기개입 6단계 모델을 사례와 함께 설명해주세요"
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
            <span className="text-gray-900">청소년상담사 1급</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🎓</span>
            <div>
              <h1 className="text-3xl font-bold">청소년상담사 1급</h1>
              <p className="text-purple-100">Youth Counselor Level 1</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm text-purple-100">난이도</span>
              <p className="font-bold">★★★★★</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm text-purple-100">연간 응시자</span>
              <p className="font-bold">약 300명</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm text-purple-100">합격률</span>
              <p className="font-bold">필기 35% / 면접 70%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-sm text-gray-500">필기시험</div>
                <div className="font-bold">5과목 125문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">🎤</div>
                <div className="text-sm text-gray-500">면접시험</div>
                <div className="font-bold">구술면접</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-500">응시료</div>
                <div className="font-bold">필기+면접 각 20,000원</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500">시행기관</div>
                <div className="font-bold text-sm">한국청소년상담복지개발원</div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>청소년상담사 1급</strong>은 청소년상담 분야의 최고 전문가 자격으로,
                  청소년상담 정책 개발, 상담 프로그램 총괄, 2·3급 상담사 교육 및 슈퍼비전을 담당합니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-bold text-purple-800 mb-2">📌 주요 역할</h3>
                    <ul className="text-sm space-y-1 text-purple-700">
                      <li>• 청소년상담 정책 개발 및 행정 총괄</li>
                      <li>• 2·3급 상담사 교육 및 슈퍼비전</li>
                      <li>• 상담 프로그램 개발 및 평가</li>
                      <li>• 위기청소년 개입 총괄</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h3 className="font-bold text-indigo-800 mb-2">💼 주요 진출분야</h3>
                    <ul className="text-sm space-y-1 text-indigo-700">
                      <li>• 청소년상담복지센터 센터장</li>
                      <li>• 학교밖청소년지원센터 관리자</li>
                      <li>• 대학 및 연구기관 전문가</li>
                      <li>• 청소년정책 관련 공무원</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>✅</span> 응시자격
              </h2>
              <div className="space-y-3">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-800 font-medium">다음 중 하나에 해당해야 합니다</p>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">①</span>
                    <span>청소년상담사 2급 자격 취득 후 <strong>상담실무경력 3년 이상</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">②</span>
                    <span>대학원에서 청소년(지도)학·교육학·심리학·사회사업학·정신의학·아동(복지)학 분야 <strong>박사학위 취득</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">③</span>
                    <span>상담 관련 박사학위 취득 후 <strong>상담실무경력 1년 이상</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">④</span>
                    <span>대학에서 상담 관련 조교수 이상 <strong>재직 3년 이상</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📚</span> 시험과목
              </h2>
              <div className="mb-4">
                <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                  필수 3과목 + 선택 2과목 (비행상담, 성상담, 약물상담, 위기상담 중 택2)
                </p>
              </div>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-bold">{subject.name}</h3>
                          <p className="text-sm text-gray-500">{subject.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm px-2 py-1 rounded ${
                          subject.difficulty === '상' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          난이도 {subject.difficulty}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{subject.questions}문항</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {subject.topics.map((topic, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Link
                        href={`/category/welfare/youth-counselor-1/study/${subject.slug}`}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        학습하기 →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🎤</span> 면접시험
              </h2>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-bold text-purple-800 mb-2">면접 평가 영역</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <p className="font-medium text-purple-700">상담 전문성</p>
                      <p className="text-sm text-gray-600">고급 상담이론, 사례개념화, 개입전략</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="font-medium text-purple-700">슈퍼비전 역량</p>
                      <p className="text-sm text-gray-600">교육·훈련 방법, 피드백 기술</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="font-medium text-purple-700">정책·행정 이해</p>
                      <p className="text-sm text-gray-600">청소년정책, 법률, 행정체계</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="font-medium text-purple-700">위기개입 능력</p>
                      <p className="text-sm text-gray-600">자살예방, 트라우마, 긴급대응</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-bold text-gray-800 mb-2">합격 기준</h3>
                  <p className="text-gray-600">면접위원 3인의 평정 점수 합계 <strong>15점 이상</strong> (각 5점 만점)</p>
                </div>
              </div>
            </div>

            {/* Study Order */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📖</span> 추천 학습 순서
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h3 className="font-bold">상담자 교육 및 사례지도 (4주)</h3>
                    <p className="text-sm text-gray-600">슈퍼비전 이론 및 모델 집중 학습</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h3 className="font-bold">청소년 관련 법과 행정 (3주)</h3>
                    <p className="text-sm text-gray-600">관련 법령 및 정책 체계 이해</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h3 className="font-bold">상담연구방법론의 실제 (3주)</h3>
                    <p className="text-sm text-gray-600">연구설계 및 통계분석 심화학습</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h3 className="font-bold">선택과목 2개 (4주)</h3>
                    <p className="text-sm text-gray-600">위기상담 + 비행상담 권장 (출제빈도 높음)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                  <div>
                    <h3 className="font-bold">기출문제 및 면접 준비 (2주)</h3>
                    <p className="text-sm text-gray-600">최근 5개년 기출 분석 + 모의면접</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Helper */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">
                AI에게 질문하여 청소년상담사 1급 시험을 효과적으로 준비하세요.
              </p>
              <div className="space-y-2">
                {aiQuestions.map((question, index) => (
                  <a
                    key={index}
                    href={`https://claude.ai/new?q=${encodeURIComponent(question)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg p-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition border border-gray-200"
                  >
                    💬 {question}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Schedule */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span>📅</span> 2026년 시험일정
              </h3>
              {schedule2026.map((item, index) => (
                <div key={index} className="space-y-2 text-sm">
                  <div className="font-bold text-purple-600">{item.round}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">원서접수</span>
                    <span>{item.apply}</span>
                    <span className="text-gray-500">필기시험</span>
                    <span>{item.written}</span>
                    <span className="text-gray-500">면접시험</span>
                    <span>{item.interview}</span>
                    <span className="text-gray-500">최종발표</span>
                    <span>{item.result}</span>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-800">
                ⚠️ 연 1회 시행 (10월 필기)
              </div>
            </div>

            {/* Target Scores */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span>🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {subjects.slice(0, 3).map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="truncate">{subject.name}</span>
                      <span className="text-purple-600 font-medium">70점</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">평균 목표</span>
                    <span className="text-purple-600 font-bold">70점 이상</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">과목당 40점 이상 + 평균 60점 이상 합격</p>
                </div>
              </div>
            </div>

            {/* Exam Link */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold mb-4">📝 시험 상세정보</h3>
              <Link
                href="/category/welfare/youth-counselor-1/exam"
                className="block w-full py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition font-medium"
              >
                시험정보 자세히 보기
              </Link>
            </div>

            {/* Related Certifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span>🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/welfare/youth-counselor-2" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="font-medium">청소년상담사 2급</span>
                  <p className="text-xs text-gray-500">1급 응시를 위한 선행 자격</p>
                </Link>
                <Link href="/category/education/youth-instructor-2" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="font-medium">청소년지도사 2급</span>
                  <p className="text-xs text-gray-500">청소년활동 전문가 자격</p>
                </Link>
                <Link href="/category/welfare/counseling-psychologist-1" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="font-medium">상담심리사 1급</span>
                  <p className="text-xs text-gray-500">심리상담 전문가 자격</p>
                </Link>
              </div>
            </div>

            {/* Study Resources */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span>📚</span> 추천 교재
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">청소년상담사 1급 필기 기본서</p>
                  <p className="text-gray-500">한국청소년상담복지개발원</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">슈퍼비전의 이론과 실제</p>
                  <p className="text-gray-500">상담전문가 양성용</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">청소년 위기개입론</p>
                  <p className="text-gray-500">위기상담 선택과목 대비</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            본 정보는 한국청소년상담복지개발원 공식 정보를 기반으로 작성되었습니다.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            최신 정보는 <a href="https://www.kyci.or.kr" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">한국청소년상담복지개발원</a>에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
