'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HealthEducator1Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const studySubjects = [
    { id: 'health-education-theory', name: '보건교육학', icon: '📚', color: 'pink', desc: '보건교육 이론과 실무', topics: ['교육철학', '학습이론', '교수설계', '평가방법'] },
    { id: 'health-promotion', name: '건강증진이론', icon: '💪', color: 'blue', desc: '건강증진 이론과 전략', topics: ['행동변화이론', '건강신념모형', '사회생태학', '임파워먼트'] },
    { id: 'health-policy', name: '보건정책', icon: '📋', color: 'green', desc: '보건정책 수립과 평가', topics: ['정책분석', '보건의료체계', '건강보험', '공중보건법'] },
    { id: 'program-planning', name: '프로그램개발', icon: '🎯', color: 'orange', desc: '보건교육 프로그램 기획', topics: ['요구도분석', 'PRECEDE-PROCEED', '프로그램설계', '효과평가'] },
    { id: 'practical', name: '실기', icon: '🎤', color: 'purple', desc: '실제 보건교육 진행', topics: ['교육시연', '매체개발', '커뮤니케이션', '현장실습'] },
  ];

  const colorClasses: { [key: string]: { bg: string; text: string; border: string; light: string } } = {
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-200', light: 'bg-pink-50' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', light: 'bg-blue-50' },
    green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', light: 'bg-green-50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-200', light: 'bg-orange-50' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200', light: 'bg-purple-50' },
  };

  const aiQuestions = [
    '보건교육사 1급 시험에서 가장 어려운 과목은 무엇인가요?',
    'PRECEDE-PROCEED 모형의 각 단계를 설명해주세요',
    '건강증진이론 중 건강신념모형의 핵심 개념은?',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-pink-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <span className="text-pink-600 font-medium">보건교육사 1급</span>
          </nav>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">🏥</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">보건교육사 1급</h1>
              <p className="text-pink-100 text-lg">Health Educator Level 1</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">난이도: ★★★★★</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">연간 응시자: 약 200명</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">합격률: 약 30%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 빠른 정보 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">📝</div>
                <div className="text-xs text-gray-500">필기시험</div>
                <div className="font-bold text-pink-600">4과목</div>
                <div className="text-xs text-gray-400">객관식 100문항</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">🎤</div>
                <div className="text-xs text-gray-500">실기시험</div>
                <div className="font-bold text-pink-600">교육시연</div>
                <div className="text-xs text-gray-400">발표형</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-xs text-gray-500">응시료</div>
                <div className="font-bold text-pink-600">50,000원</div>
                <div className="text-xs text-gray-400">필기+실기</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <div className="text-2xl mb-1">🏛️</div>
                <div className="text-xs text-gray-500">주관기관</div>
                <div className="font-bold text-pink-600">한국보건의료인국가시험원</div>
                <div className="text-xs text-gray-400">국시원</div>
              </div>
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">보건교육사 1급이란?</h3>
                  <p>보건교육사 1급은 국민의 건강증진을 위한 보건교육 분야의 최고급 전문가 자격증입니다. 보건교육사 2급 취득 후 3년 이상의 실무경력을 갖춘 자가 응시할 수 있습니다.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">주요 업무</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>보건교육 정책 수립 및 기획</li>
                    <li>건강증진 프로그램 개발 및 평가</li>
                    <li>보건교육 전문인력 양성 및 교육</li>
                    <li>지역사회 건강증진사업 총괄</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">취업 분야</h3>
                  <p>보건소, 건강보험공단, 국민건강보험공단, 대학교, 병원, 기업체 건강관리실, 건강증진센터, 보건교육 관련 연구기관</p>
                </div>
              </div>
            </div>

            {/* 응시자격 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">✅</span> 응시자격
              </h2>
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <p className="text-gray-700">
                  <span className="font-bold text-pink-600">보건교육사 2급</span> 자격 취득 후
                  <span className="font-bold text-pink-600"> 보건교육 업무 3년 이상</span> 경력자
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ※ 경력 인정 기관: 보건소, 건강보험공단, 병원, 학교 등 보건교육 관련 기관
                </p>
              </div>
            </div>

            {/* 필기시험 과목 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {studySubjects.filter(s => s.id !== 'practical').map((subject, idx) => (
                  <div key={subject.id} className={`${colorClasses[subject.color].light} rounded-lg p-4 border ${colorClasses[subject.color].border}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{subject.icon}</span>
                        <div>
                          <h3 className={`font-bold ${colorClasses[subject.color].text}`}>{idx + 1}과목: {subject.name}</h3>
                          <p className="text-sm text-gray-500">{subject.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">25문항</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {subject.topics.map((topic, i) => (
                        <span key={i} className="text-xs bg-white px-2 py-1 rounded border text-gray-600">{topic}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 실기시험 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🎤</span> 실기시험 구성
              </h2>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🎤</span>
                  <div>
                    <h3 className="font-bold text-purple-700">교육시연 평가</h3>
                    <p className="text-sm text-gray-600">실제 보건교육 진행 능력 평가</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800 mb-2">평가 항목</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 교육 기획 및 설계 능력</li>
                      <li>• 교육 매체 활용 능력</li>
                      <li>• 발표 및 전달력</li>
                      <li>• 참여자 상호작용</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <h4 className="font-semibold text-gray-800 mb-2">시험 형식</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 시험시간: 20분 (준비 10분 + 시연 10분)</li>
                      <li>• 주제: 당일 발표</li>
                      <li>• 합격기준: 60점 이상</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">📖</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200">
                  <h3 className="font-bold text-pink-700 mb-3">1급 응시자 (2급 보유자)</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">1. 보건교육학 심화</span>
                    <span className="text-pink-300">→</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">2. 건강증진이론</span>
                    <span className="text-pink-300">→</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">3. 보건정책</span>
                    <span className="text-pink-300">→</span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">4. 프로그램개발</span>
                    <span className="text-pink-300">→</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">5. 실기 준비</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                  <strong>💡 학습 팁:</strong> 2급 취득 시 학습한 기본 이론을 바탕으로, 1급에서는 정책 분석, 프로그램 기획/평가, 현장 적용 능력에 집중하세요.
                </div>
              </div>
            </div>

            {/* 과목별 학습하기 */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-pink-500">🎯</span> 과목별 학습하기
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studySubjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={`/category/medical/health-educator-1/study/${subject.id}`}
                    className={`block p-4 ${colorClasses[subject.color].light} rounded-lg hover:shadow-md transition border-2 ${colorClasses[subject.color].border} hover:border-opacity-100`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{subject.icon}</span>
                      <h3 className={`font-bold ${colorClasses[subject.color].text}`}>{subject.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{subject.desc}</p>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${colorClasses[subject.color].text}`}>학습하기 →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-pink-100 mb-4">보건교육사 1급 시험 준비에 AI를 활용해보세요!</p>
              <div className="space-y-2">
                {aiQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPrompt(`보건교육사 1급 시험 준비를 위한 질문입니다.\n\n${q}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 시험 출제 포인트\n4. 관련 기출문제 예시`);
                      setShowAIModal(true);
                    }}
                    className="w-full text-left bg-white/10 hover:bg-white/20 rounded-lg p-3 transition text-sm"
                  >
                    💬 {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">원서접수</span>
                  <span className="font-medium">4월 예정</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">필기시험</span>
                  <span className="font-medium">5월 예정</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">실기시험</span>
                  <span className="font-medium">7월 예정</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">합격발표</span>
                  <span className="font-medium">8월 예정</span>
                </div>
              </div>
              <a
                href="https://www.kuksiwon.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center bg-pink-50 text-pink-600 py-2 rounded-lg text-sm font-medium hover:bg-pink-100 transition"
              >
                국시원 바로가기 →
              </a>
            </div>

            {/* 과목별 목표 점수 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 과목별 목표 점수
              </h3>
              <div className="space-y-3">
                {studySubjects.filter(s => s.id !== 'practical').map((subject) => (
                  <div key={subject.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className={`font-medium ${colorClasses[subject.color].text}`}>70점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${colorClasses[subject.color].bg} rounded-full`} style={{ width: '70%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">※ 합격기준: 과목별 40점 이상, 전체 평균 60점 이상</p>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-xl shadow-sm border p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <Link href="/category/medical/health-educator-2" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">보건교육사 2급</div>
                  <div className="text-xs text-gray-500">1급 응시를 위한 기본 자격</div>
                </Link>
                <Link href="/category/welfare/social-worker-1" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">사회복지사 1급</div>
                  <div className="text-xs text-gray-500">보건복지 연계</div>
                </Link>
                <Link href="/category/medical/nutritionist" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800">영양사</div>
                  <div className="text-xs text-gray-500">건강관리 연계</div>
                </Link>
              </div>
            </div>

            {/* 시험 상세 버튼 */}
            <Link
              href="/category/medical/health-educator-1/exam"
              className="block bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg"
            >
              📋 시험 정보 상세보기
            </Link>
          </div>
        </div>
      </div>

      {/* AI 선택 모달 */}
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

      {/* 푸터 */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
