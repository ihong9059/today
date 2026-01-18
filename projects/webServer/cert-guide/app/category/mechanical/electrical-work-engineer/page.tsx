'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ElectricalWorkEngineerPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const subjects = [
    {
      id: 'electrical-application',
      name: '전기응용',
      icon: '💡',
      description: '조명공학, 전열공학, 전기화학, 전동력 응용',
      topics: ['조명설계', '전열계산', '전기화학', '전동기 선정'],
      difficulty: 4,
      questionCount: 20,
      href: '/category/mechanical/electrical-work-engineer/study/electrical-application',
    },
    {
      id: 'electrical-equipment',
      name: '전기설비기술기준',
      icon: '📋',
      description: '전기설비의 설치·운용 기술기준과 판단기준',
      topics: ['전압별 시설기준', '접지설비', '배선공사', '안전시설'],
      difficulty: 4,
      questionCount: 20,
      href: '/category/mechanical/electrical-work-engineer/study/electrical-equipment',
    },
    {
      id: 'electrical-machine',
      name: '전기기기',
      icon: '⚡',
      description: '변압기, 유도기, 동기기, 직류기의 원리와 특성',
      topics: ['변압기', '유도전동기', '동기기', '직류기'],
      difficulty: 4,
      questionCount: 20,
      href: '/category/mechanical/electrical-work-engineer/study/electrical-machine',
    },
    {
      id: 'distribution-equipment',
      name: '배전설비',
      icon: '🔌',
      description: '배전계통 구성, 배전선로 설계, 보호장치',
      topics: ['배전계통', '배전선로', '보호장치', '배전자동화'],
      difficulty: 3,
      questionCount: 20,
      href: '/category/mechanical/electrical-work-engineer/study/distribution-equipment',
    },
  ];

  const practicalAreas = [
    { name: '공사계획 수립', ratio: 20 },
    { name: '배선공사', ratio: 30 },
    { name: '기기설치공사', ratio: 25 },
    { name: '시운전 및 검사', ratio: 25 },
  ];

  const studyOrder = [
    { step: 1, title: '전기기기', desc: '기본 원리와 특성 이해', duration: '3주' },
    { step: 2, title: '전기응용', desc: '조명/전열/전동력 응용', duration: '3주' },
    { step: 3, title: '전기설비기술기준', desc: 'KEC 기준 암기', duration: '3주' },
    { step: 4, title: '배전설비', desc: '배전계통과 보호장치', duration: '2주' },
    { step: 5, title: '실기 대비', desc: '도면해석/공사계획', duration: '4주' },
  ];

  const aiQuestions = [
    '전기공사기사 수변전설비 시험 단골 문제 알려줘',
    '접지저항 계산 방법과 공식 설명해줘',
    '전기공사 견적서 작성 요령 알려줘',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-amber-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/mechanical" className="text-gray-600 hover:text-amber-600">기계·전기</Link>
            <span className="text-gray-300">›</span>
            <span className="text-amber-600 font-medium">전기공사기사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-6xl">🔧</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">전기공사기사</h1>
              <p className="text-amber-100 mt-2 text-lg">Engineer Electrical Construction</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가기술자격</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">한국산업인력공단</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">전기공사업 필수</span>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-300">★★★★</span><span className="text-white/40">★</span>
                  <span className="ml-1 text-sm">난이도</span>
                </div>
                <div className="text-sm">
                  <span className="font-bold">연 5만명</span> 응시
                </div>
                <div className="text-sm">
                  합격률 <span className="font-bold">필기 40%</span> / <span className="font-bold">실기 45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-gray-500 text-sm">필기시험</p>
            <p className="font-bold text-lg">4과목 80문항</p>
            <p className="text-gray-400 text-xs">2시간</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-gray-500 text-sm">실기시험</p>
            <p className="font-bold text-lg">필답+작업형</p>
            <p className="text-gray-400 text-xs">약 4시간</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-gray-500 text-sm">응시료</p>
            <p className="font-bold text-lg">필기 19,400원</p>
            <p className="text-gray-400 text-xs">실기 39,800원</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <p className="text-gray-500 text-sm">시행</p>
            <p className="font-bold text-lg">연 3회</p>
            <p className="text-gray-400 text-xs">Q-Net 접수</p>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📋 자격 개요</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>전기공사기사</strong>는 전기공사의 설계, 시공, 감리, 안전관리 등
                전기공사 전반에 관한 전문 기술인력을 양성하기 위한 국가기술자격입니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-bold text-amber-800">주요 업무</h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• 전기공사 설계 및 시공</li>
                    <li>• 전기설비 공사감리</li>
                    <li>• 전기안전관리 업무</li>
                    <li>• 전기공사 견적 및 계약</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-800">취업 분야</h4>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>• 전기공사업체</li>
                    <li>• 건설회사 전기부서</li>
                    <li>• 전기안전공사</li>
                    <li>• 공공기관 시설관리</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Exam Detail Link */}
          <section className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-amber-800 text-lg">📝 시험 상세 정보</h3>
                <p className="text-amber-600 text-sm mt-1">필기/실기 과목별 상세 출제 범위와 합격 전략</p>
              </div>
              <Link
                href="/category/mechanical/electrical-work-engineer/exam"
                className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition font-medium"
              >
                상세보기 →
              </Link>
            </div>
          </section>

          {/* Subjects */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📚 필기시험 과목</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={subject.href}
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-amber-50 transition border border-gray-100 hover:border-amber-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{subject.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{subject.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {subject.topics.slice(0, 3).map((topic, i) => (
                          <span key={i} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className={s <= subject.difficulty ? 'text-yellow-400' : 'text-gray-200'}>★</span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{subject.questionCount}문항</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Practical */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🔧 실기시험 구성</h2>
            <div className="mb-4">
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                필답형 + 작업형 복합
              </span>
            </div>
            <div className="space-y-3">
              {practicalAreas.map((area, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-32 text-sm text-gray-600">{area.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full"
                      style={{ width: `${area.ratio}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-bold text-amber-600">{area.ratio}%</span>
                </div>
              ))}
            </div>
            <Link
              href="/category/mechanical/electrical-work-engineer/study/practical"
              className="block mt-4 text-center bg-amber-50 text-amber-700 py-2 rounded-lg hover:bg-amber-100 transition"
            >
              실기 대비 학습하기 →
            </Link>
          </section>

          {/* Study Order */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📖 추천 공부 순서</h2>
            <div className="space-y-4">
              {studyOrder.map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <span className="text-sm text-amber-600 font-medium">{item.duration}</span>
                </div>
              ))}
            </div>
          </section>

          {/* AI Helper */}
          <section className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">🤖 AI 학습 도우미</h2>
            <p className="text-amber-100 mb-4">자주 묻는 질문을 AI에게 물어보세요</p>
            <div className="space-y-2">
              {aiQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrentPrompt(q); setShowAIModal(true); }}
                  className="w-full text-left bg-white/20 hover:bg-white/30 transition px-4 py-3 rounded-lg"
                >
                  {q}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Exam Schedule */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3">📅 2026년 시험일정</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">1회차 필기</span>
                <span className="font-medium">3월 2일</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">1회차 실기</span>
                <span className="font-medium">4월 26일~5월 11일</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">2회차 필기</span>
                <span className="font-medium">5월 11일</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">2회차 실기</span>
                <span className="font-medium">6월 28일~7월 13일</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">3회차 필기</span>
                <span className="font-medium">8월 3일</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3">🎯 과목별 목표점수</h3>
            <div className="space-y-3">
              {subjects.map((s) => (
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{s.name}</span>
                    <span className="text-amber-600 font-medium">70점</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className="bg-amber-400 h-2 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Certs */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-bold text-gray-800 mb-3">🔗 연계 자격증</h3>
            <div className="space-y-2">
              <Link href="/category/mechanical/electric-engineer" className="block text-sm text-gray-600 hover:text-amber-600 py-1">
                → 전기기사
              </Link>
              <Link href="/category/mechanical/electric-craftsman" className="block text-sm text-gray-600 hover:text-amber-600 py-1">
                → 전기산업기사
              </Link>
              <Link href="/category/mechanical/electrician-technician" className="block text-sm text-gray-600 hover:text-amber-600 py-1">
                → 전기기능사
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <h3 className="font-bold text-amber-800 mb-3">📚 추천 교재</h3>
            <ul className="text-sm text-amber-700 space-y-2">
              <li>• 전기공사기사 필기 기출문제</li>
              <li>• 전기설비기술기준(KEC) 해설</li>
              <li>• 전기공사 실기 실무</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

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
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
