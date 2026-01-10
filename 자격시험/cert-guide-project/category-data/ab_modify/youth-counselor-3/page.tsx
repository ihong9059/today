'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function YouthCounselor3Page() {
  const [activeTab, setActiveTab] = useState('overview');

  const subjects = [
    {
      name: '발달심리',
      slug: 'developmental-psychology',
      questions: 25,
      icon: '🌱',
      difficulty: '중',
      description: '인간발달 이론, 청소년기 발달특성',
      topics: ['발달이론', '청소년기 발달', '인지발달', '사회정서발달']
    },
    {
      name: '집단상담의 기초',
      slug: 'group-counseling-basics',
      questions: 25,
      icon: '👥',
      difficulty: '중',
      description: '집단상담 이론, 집단역동, 집단과정',
      topics: ['집단역동', '집단발달', '집단기법', '집단상담자']
    },
    {
      name: '심리측정 및 평가',
      slug: 'psychological-testing',
      questions: 25,
      icon: '📊',
      difficulty: '중',
      description: '심리검사 이해, 검사 해석',
      topics: ['심리검사 이론', '지능검사', '성격검사', '적성검사']
    },
    {
      name: '상담이론',
      slug: 'counseling-theory',
      questions: 25,
      icon: '💬',
      difficulty: '중상',
      description: '주요 상담이론 및 기법',
      topics: ['정신분석', '인간중심', '인지행동', '현실치료']
    },
    {
      name: '학습이론',
      slug: 'learning-theory',
      questions: 25,
      icon: '📚',
      difficulty: '중',
      description: '학습의 원리와 응용',
      topics: ['행동주의', '인지주의', '학습동기', '학습전략']
    }
  ];

  const schedule2026 = [
    { round: '제22회', apply: '2026.07.06 ~ 07.10', written: '2026.10.17(토)', interview: '2026.12.12(토)', result: '2027.01월' }
  ];

  const aiQuestions = [
    "청소년상담사 3급에서 Erikson의 심리사회적 발달단계를 설명해주세요",
    "집단상담의 치료적 요인(Yalom)에 대해 알려주세요",
    "인간중심 상담의 핵심 조건 3가지를 설명해주세요"
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
            <span className="text-gray-900">청소년상담사 3급</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🌿</span>
            <div>
              <h1 className="text-3xl font-bold">청소년상담사 3급</h1>
              <p className="text-emerald-100">Youth Counselor Level 3</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm text-emerald-100">난이도</span>
              <p className="font-bold">★★★☆☆</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm text-emerald-100">연간 응시자</span>
              <p className="font-bold">약 4,000명</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2">
              <span className="text-sm text-emerald-100">합격률</span>
              <p className="font-bold">필기 50% / 면접 80%</p>
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
                  <strong>청소년상담사 3급</strong>은 청소년상담 분야의 입문 자격으로,
                  기초적인 상담 지식과 기술을 갖추고 청소년 상담 실무를 수행할 수 있는 전문가입니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <h3 className="font-bold text-emerald-800 mb-2">📌 주요 역할</h3>
                    <ul className="text-sm space-y-1 text-emerald-700">
                      <li>• 청소년 개인상담 실시</li>
                      <li>• 상담 접수 및 초기상담</li>
                      <li>• 집단상담 프로그램 보조</li>
                      <li>• 상담행정 업무 지원</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-bold text-green-800 mb-2">💼 주요 진출분야</h3>
                    <ul className="text-sm space-y-1 text-green-700">
                      <li>• 청소년상담복지센터</li>
                      <li>• 학교상담실 (Wee클래스)</li>
                      <li>• 청소년쉼터/자립생활관</li>
                      <li>• 지역아동센터</li>
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
                    <span className="text-emerald-500 mt-1">①</span>
                    <span>대학 및 평생교육시설에서 상담 관련 과목(필수 4, 선택 2) <strong>이수 후 졸업</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">②</span>
                    <span>전문대학 졸업 후 <strong>상담실무경력 2년 이상</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">③</span>
                    <span>고등학교 졸업 후 <strong>상담실무경력 5년 이상</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">④</span>
                    <span><strong>대학 재학 중</strong> 관련 과목 이수 (자격증 교부는 졸업 후)</span>
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
                  필수 5과목 (선택과목 없음)
                </p>
              </div>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition">
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
                          subject.difficulty === '중상' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
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
                        href={`/category/welfare/youth-counselor-3/study/${subject.slug}`}
                        className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
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
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h3 className="font-bold text-emerald-800 mb-2">면접 평가 영역</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white rounded p-3">
                      <p className="font-medium text-emerald-700">상담 기초지식</p>
                      <p className="text-sm text-gray-600">상담이론, 발달심리 이해</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="font-medium text-emerald-700">의사소통 능력</p>
                      <p className="text-sm text-gray-600">경청, 공감, 표현력</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="font-medium text-emerald-700">청소년 이해</p>
                      <p className="text-sm text-gray-600">청소년기 특성, 문제 이해</p>
                    </div>
                    <div className="bg-white rounded p-3">
                      <p className="font-medium text-emerald-700">상담자 자질</p>
                      <p className="text-sm text-gray-600">윤리의식, 성장의지</p>
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
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h3 className="font-bold">발달심리 (3주)</h3>
                    <p className="text-sm text-gray-600">인간발달 이론과 청소년기 특성 이해</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h3 className="font-bold">상담이론 (3주)</h3>
                    <p className="text-sm text-gray-600">주요 상담이론과 기법 학습</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h3 className="font-bold">집단상담의 기초 (2주)</h3>
                    <p className="text-sm text-gray-600">집단역동과 집단상담 과정</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h3 className="font-bold">심리측정 및 평가 (2주)</h3>
                    <p className="text-sm text-gray-600">심리검사의 이해와 해석</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                  <div>
                    <h3 className="font-bold">학습이론 + 기출 (2주)</h3>
                    <p className="text-sm text-gray-600">학습원리 이해 + 최근 기출 3회독</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Helper */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">
                AI에게 질문하여 청소년상담사 3급 시험을 효과적으로 준비하세요.
              </p>
              <div className="space-y-2">
                {aiQuestions.map((question, index) => (
                  <a
                    key={index}
                    href={`https://claude.ai/new?q=${encodeURIComponent(question)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg p-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition border border-gray-200"
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
                  <div className="font-bold text-emerald-600">{item.round}</div>
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
                {subjects.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="truncate">{subject.name}</span>
                      <span className="text-emerald-600 font-medium">65점</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">평균 목표</span>
                    <span className="text-emerald-600 font-bold">65점 이상</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">과목당 40점 이상 + 평균 60점 이상 합격</p>
                </div>
              </div>
            </div>

            {/* Exam Link */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-bold mb-4">📝 시험 상세정보</h3>
              <Link
                href="/category/welfare/youth-counselor-3/exam"
                className="block w-full py-3 bg-emerald-600 text-white text-center rounded-lg hover:bg-emerald-700 transition font-medium"
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
                  <p className="text-xs text-gray-500">상위 자격 (3급+경력 2년)</p>
                </Link>
                <Link href="/category/welfare/youth-counselor-1" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="font-medium">청소년상담사 1급</span>
                  <p className="text-xs text-gray-500">최상위 자격</p>
                </Link>
                <Link href="/category/education/youth-instructor-3" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="font-medium">청소년지도사 3급</span>
                  <p className="text-xs text-gray-500">청소년활동 전문가</p>
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
                  <p className="font-medium">청소년상담사 3급 필기 기본서</p>
                  <p className="text-gray-500">한국청소년상담복지개발원</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">발달심리학 (최신판)</p>
                  <p className="text-gray-500">청소년기 발달 중점</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">상담심리학 입문</p>
                  <p className="text-gray-500">상담이론 기초 학습</p>
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
            최신 정보는 <a href="https://www.kyci.or.kr" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">한국청소년상담복지개발원</a>에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
