'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function VisualDesignTechnicianPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const subjects = [
    { id: 'design-general', name: '디자인일반', icon: '🎯', desc: '디자인 역사와 원리', questions: 50, difficulty: '중', color: 'purple' },
    { id: 'visual-design', name: '시각디자인', icon: '👁️', desc: '시각전달 디자인 이론', questions: 50, difficulty: '중상', color: 'pink' },
    { id: 'color-theory', name: '색채 및 도해', icon: '🌈', desc: '색채이론과 도해기법', questions: 50, difficulty: '중', color: 'rose' },
  ];

  const quickInfo = [
    { label: '필기과목', value: '3과목', sub: '60문항', icon: '📝', color: 'purple' },
    { label: '실기시험', value: '작업형', sub: '5시간', icon: '🎨', color: 'pink' },
    { label: '응시료', value: '필기 19,400원', sub: '실기 44,000원', icon: '💰', color: 'rose' },
    { label: '주관기관', value: '한국산업인력공단', sub: 'Q-Net', icon: '🏛️', color: 'fuchsia' },
  ];

  const examSchedule = [
    { round: '1회', apply: '1.6~1.9', written: '2.7~3.2', practical: '4.12~4.27' },
    { round: '2회', apply: '3.24~3.27', written: '4.19~5.8', practical: '6.21~7.6' },
    { round: '3회', apply: '6.9~6.12', written: '7.5~7.20', practical: '9.20~10.5' },
  ];

  const studyOrder = {
    beginner: ['디자인일반', '색채 및 도해', '시각디자인', '실기 연습'],
    experienced: ['시각디자인', '색채 및 도해', '디자인일반', '포트폴리오']
  };

  const aiQuestions = [
    '시각디자인산업기사 실기시험 준비 방법을 알려주세요',
    '그래픽 디자인 포트폴리오 구성 팁을 알려주세요',
    '색채학 기초 개념과 배색 원리를 설명해주세요'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design" className="text-gray-500 hover:text-gray-700">디자인</Link>
          <span className="text-gray-400">/</span>
          <span className="text-purple-600 font-medium">시각디자인산업기사</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-white">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-5xl">
                    🎨
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">시각디자인산업기사</h1>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">국가기술자격</span>
                    </div>
                    <p className="text-purple-100 text-lg mb-4">Visual Design Industrial Engineer</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-300">⭐⭐⭐☆☆</span>
                        <span className="text-purple-100">난이도</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>👥</span>
                        <span className="text-purple-100">연간 약 1.5만명 응시</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📊</span>
                        <span className="text-purple-100">합격률: 필기 55% / 실기 50%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickInfo.map((info, idx) => (
                    <div key={idx} className={`bg-${info.color}-50 rounded-xl p-4 text-center border border-${info.color}-100`}>
                      <div className="text-2xl mb-2">{info.icon}</div>
                      <p className={`text-sm text-${info.color}-600`}>{info.label}</p>
                      <p className={`text-lg font-bold text-${info.color}-800`}>{info.value}</p>
                      <p className={`text-xs text-${info.color}-500`}>{info.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📋</span> 자격 개요
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-semibold text-purple-800 mb-2">시각디자인산업기사란?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    시각디자인산업기사는 광고, 편집, 패키지, CI/BI 등 시각 매체를 통한 디자인 업무를 수행하는
                    전문기술인력입니다. 인쇄매체와 디지털 매체를 아우르는 디자인 능력을 검정합니다.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-pink-50 rounded-xl">
                    <h3 className="font-semibold text-pink-800 mb-2">🎯 주요 업무</h3>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• 광고디자인 기획 및 제작</li>
                      <li>• 편집디자인 및 레이아웃</li>
                      <li>• 패키지 디자인 개발</li>
                      <li>• CI/BI 브랜드 아이덴티티</li>
                      <li>• 인포그래픽 제작</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-xl">
                    <h3 className="font-semibold text-rose-800 mb-2">💼 취업 분야</h3>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>• 광고대행사 디자이너</li>
                      <li>• 출판사 편집디자이너</li>
                      <li>• 기업 사내디자이너</li>
                      <li>• 패키지 디자인 회사</li>
                      <li>• 프리랜서 그래픽디자이너</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 필기시험 과목 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span> 필기시험 과목
              </h2>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">과목</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">문항수</th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-700">난이도</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">핵심 학습 포인트</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-purple-50/50">
                      <td className="px-4 py-3 font-medium text-gray-800">디자인일반</td>
                      <td className="px-4 py-3 text-center text-gray-600">20</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">중</span></td>
                      <td className="px-4 py-3 text-gray-600 text-sm">디자인 역사, 조형원리, 디자인 방법론</td>
                    </tr>
                    <tr className="hover:bg-pink-50/50">
                      <td className="px-4 py-3 font-medium text-gray-800">시각디자인</td>
                      <td className="px-4 py-3 text-center text-gray-600">20</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">중상</span></td>
                      <td className="px-4 py-3 text-gray-600 text-sm">시각전달, 타이포그래피, 편집디자인</td>
                    </tr>
                    <tr className="hover:bg-rose-50/50">
                      <td className="px-4 py-3 font-medium text-gray-800">색채 및 도해</td>
                      <td className="px-4 py-3 text-center text-gray-600">20</td>
                      <td className="px-4 py-3 text-center"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">중</span></td>
                      <td className="px-4 py-3 text-gray-600 text-sm">색채이론, 배색원리, 도해기법, 표현기법</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">
                  <strong>💡 시험 형식:</strong> 객관식 60문항 / 90분 / 과목당 40점 이상, 전과목 평균 60점 이상
                </p>
              </div>
            </div>

            {/* 실기시험 구성 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎨</span> 실기시험 구성
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-purple-800">시각디자인 실무</h3>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">작업형 5시간</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    주어진 주제에 따라 시각디자인 작업물을 제작하는 실무 능력을 평가합니다.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-pink-50 rounded-xl">
                    <h4 className="font-medium text-pink-800 mb-2">📐 주요 평가 영역</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 아이디어 발상 (20%)</li>
                      <li>• 디자인 구성력 (30%)</li>
                      <li>• 표현기법 (25%)</li>
                      <li>• 완성도 (25%)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-rose-50 rounded-xl">
                    <h4 className="font-medium text-rose-800 mb-2">🛠️ 필수 준비물</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 컴퓨터(PC) 사용 시험</li>
                      <li>• 그래픽 소프트웨어 활용</li>
                      <li>• Adobe Illustrator/Photoshop</li>
                      <li>• 개인 준비물 불필요</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🗺️</span> 추천 공부 순서
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 rounded-xl">
                  <h3 className="font-semibold text-purple-800 mb-3">🌱 비전공자 추천</h3>
                  <div className="space-y-2">
                    {studyOrder.beginner.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-pink-50 rounded-xl">
                  <h3 className="font-semibold text-pink-800 mb-3">🎨 디자인 경험자</h3>
                  <div className="space-y-2">
                    {studyOrder.experienced.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 과목별 학습 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span> 과목별 학습
              </h2>
              <div className="space-y-3">
                {subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/design/visual-design-technician/study/${subject.id}`}
                    className="block p-4 bg-gray-50 hover:bg-purple-50 rounded-xl transition group border border-gray-100 hover:border-purple-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{subject.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800 group-hover:text-purple-700">{subject.name}</h3>
                          <p className="text-sm text-gray-500">{subject.desc}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <span className="text-sm font-medium text-purple-600">{subject.questions}문제</span>
                          <p className="text-xs text-gray-400">난이도: {subject.difficulty}</p>
                        </div>
                        <span className="text-gray-400 group-hover:text-purple-500 text-xl">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/category/design/visual-design-technician/exam"
                className="block mt-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition shadow-lg"
              >
                📝 시험 상세 정보 보기
              </Link>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🤖</span> AI 학습 도우미
              </h2>
              <p className="text-gray-600 mb-4">자주 묻는 질문을 AI에게 물어보세요!</p>
              <div className="space-y-2">
                {aiQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setCurrentPrompt(q); setShowAIModal(true); }}
                    className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-xl transition text-gray-700"
                  >
                    💬 {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3">
                {examSchedule.map((schedule, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl text-sm">
                    <div className="font-semibold text-purple-700 mb-1">{schedule.round} 시험</div>
                    <div className="text-gray-600 space-y-1">
                      <p>📝 원서접수: {schedule.apply}</p>
                      <p>✏️ 필기: {schedule.written}</p>
                      <p>🎨 실기: {schedule.practical}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 과목별 목표 점수 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 과목별 목표 점수
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">디자인일반</span>
                    <span className="font-medium text-purple-600">70점</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">시각디자인</span>
                    <span className="font-medium text-pink-600">65점</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">색채 및 도해</span>
                    <span className="font-medium text-rose-600">70점</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-rose-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-gray-500">* 과목당 40점 이상, 평균 60점 이상 합격</p>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/design/visual-design-engineer" className="block p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition">
                  <span className="font-medium text-purple-700">시각디자인기사</span>
                  <p className="text-xs text-gray-500">상위 자격 (기사)</p>
                </Link>
                <Link href="/category/design/computer-graphics" className="block p-3 bg-pink-50 hover:bg-pink-100 rounded-xl transition">
                  <span className="font-medium text-pink-700">컴퓨터그래픽스운용기능사</span>
                  <p className="text-xs text-gray-500">그래픽 실무</p>
                </Link>
                <Link href="/category/design/web-design" className="block p-3 bg-rose-50 hover:bg-rose-100 rounded-xl transition">
                  <span className="font-medium text-rose-700">웹디자인기능사</span>
                  <p className="text-xs text-gray-500">웹 디자인</p>
                </Link>
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📖</span> 추천 교재
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800">시각디자인산업기사 필기</p>
                  <p className="text-gray-500">시대고시기획</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="font-medium text-gray-800">시각디자인산업기사 실기</p>
                  <p className="text-gray-500">시대에듀</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-8 mt-8">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 자격증 가이드. 시각디자인산업기사 학습을 응원합니다! 🎨</p>
        </div>
      </footer>
    </div>
  );
}
