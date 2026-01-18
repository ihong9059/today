'use client';

import { useState } from 'react';

export default function PatentAttorneyPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const aiQuestions = [
    {
      title: "특허법 핵심 개념",
      prompt: `변리사 시험 특허법에 대해 설명해주세요.

다음 순서로 설명해주세요:
1. 특허요건 (신규성, 진보성, 산업상 이용가능성)
2. 특허출원 절차와 심사과정
3. 특허권의 효력과 제한
4. 특허침해와 권리범위해석
5. 주요 판례 5개와 핵심 요지`
    },
    {
      title: "상표법 기초",
      prompt: `변리사 시험 상표법에 대해 설명해주세요.

다음 순서로 설명해주세요:
1. 상표의 개념과 기능
2. 상표등록요건과 거절이유
3. 상표권의 효력범위
4. 상표침해 유형과 판단기준
5. 부정경쟁방지법과의 관계`
    },
    {
      title: "명세서 작성법",
      prompt: `변리사 실무에서 중요한 특허명세서 작성에 대해 설명해주세요.

다음 순서로 설명해주세요:
1. 명세서의 구성 (발명의 명칭, 기술분야, 배경기술 등)
2. 청구항 작성 원칙과 유형
3. 청구범위 해석 방법
4. 균등론과 출원경과금반언
5. 실제 명세서 작성 예시`
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
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/legal" className="text-gray-600 hover:text-blue-600">법률</a>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">변리사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">🔬</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">변리사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가전문자격</span>
              </div>
              <p className="text-cyan-100 text-lg mb-4">Patent Attorney</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★★</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 4,000명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 1차 25% / 2차 15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/legal/patent-attorney/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-cyan-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">1차 시험</p>
            <p className="font-bold text-gray-800">객관식 3과목</p>
            <p className="text-xs text-gray-400">210분</p>
            <p className="text-xs text-cyan-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/legal/patent-attorney/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-cyan-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">2차 시험</p>
            <p className="font-bold text-gray-800">논술형 3과목</p>
            <p className="text-xs text-gray-400">360분</p>
            <p className="text-xs text-cyan-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">1차 30,000원</p>
            <p className="text-xs text-gray-400">2차 35,000원</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">특허청</p>
            <p className="text-xs text-gray-400">한국산업인력공단 위탁</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* 개요 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                변리사는 특허, 실용신안, 디자인, 상표 등 산업재산권에 관한 모든 절차를 대리하는 전문자격사입니다.
                기술과 법률 지식을 융합하여 발명의 권리화를 돕고, 지식재산 분쟁을 해결합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h3 className="font-semibold text-cyan-800 mb-2">📌 주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 특허/실용신안 출원 및 등록</li>
                    <li>• 상표/디자인 출원 및 등록</li>
                    <li>• 특허심판원 심판 대리</li>
                    <li>• 특허침해소송 대리</li>
                    <li>• 기술가치평가 및 라이선싱</li>
                  </ul>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-800 mb-2">💼 진출 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 특허법인/특허사무소</li>
                    <li>• 대기업 지식재산팀</li>
                    <li>• 연구기관 기술이전팀</li>
                    <li>• 특허청/심판원</li>
                    <li>• 해외특허 전문 사무소</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 1차 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📝</span> 1차 시험 과목 (객관식)
              </h2>
              <div className="space-y-4">
                <a href="/category/legal/patent-attorney/study/industrial-property" className="block bg-gray-50 rounded-lg p-4 hover:bg-cyan-50 transition border-2 border-transparent hover:border-cyan-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">1. 산업재산권법</h3>
                      <p className="text-sm text-gray-500 mt-1">40문항 (특허법+상표법+디자인보호법)</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">특허법</span>
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">상표법</span>
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">디자인보호법</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">난이도</span>
                      <p className="text-yellow-500">★★★★★</p>
                      <p className="text-xs text-cyan-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <a href="/category/legal/patent-attorney/study/civil-law" className="block bg-gray-50 rounded-lg p-4 hover:bg-cyan-50 transition border-2 border-transparent hover:border-cyan-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">2. 민법개론</h3>
                      <p className="text-sm text-gray-500 mt-1">40문항</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">총칙</span>
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">물권법</span>
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">채권법</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">난이도</span>
                      <p className="text-yellow-500">★★★★☆</p>
                      <p className="text-xs text-cyan-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <a href="/category/legal/patent-attorney/study/natural-science" className="block bg-gray-50 rounded-lg p-4 hover:bg-cyan-50 transition border-2 border-transparent hover:border-cyan-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">3. 자연과학개론</h3>
                      <p className="text-sm text-gray-500 mt-1">20문항 (물리/화학/생물/지구과학 택1)</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">물리학</span>
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">화학</span>
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">생물학</span>
                        <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">지구과학</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">난이도</span>
                      <p className="text-yellow-500">★★★☆☆</p>
                      <p className="text-xs text-cyan-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="mt-4 p-3 bg-cyan-50 rounded-lg text-sm text-cyan-700">
                💡 1차 합격기준: 과목당 40점 이상, 전 과목 평균 60점 이상
              </div>
            </section>

            {/* 2차 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-teal-500">✍️</span> 2차 시험 과목 (논술형)
              </h2>
              <div className="space-y-4">
                <a href="/category/legal/patent-attorney/study/patent-law" className="block bg-gray-50 rounded-lg p-4 hover:bg-teal-50 transition border-2 border-transparent hover:border-teal-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">1교시: 특허법</h3>
                      <p className="text-sm text-gray-500 mt-1">120분 (200점 만점)</p>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>• 특허요건, 명세서 작성, 청구범위 해석</li>
                        <li>• 특허침해, 무효심판, 권리범위확인</li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">배점</span>
                      <p className="font-bold text-teal-600">200점</p>
                      <p className="text-xs text-teal-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <a href="/category/legal/patent-attorney/study/trademark-law" className="block bg-gray-50 rounded-lg p-4 hover:bg-teal-50 transition border-2 border-transparent hover:border-teal-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">2교시: 상표법</h3>
                      <p className="text-sm text-gray-500 mt-1">120분 (100점 만점)</p>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>• 상표등록요건, 거절이유, 상표권 효력</li>
                        <li>• 상표침해, 부정경쟁행위, 국제출원</li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">배점</span>
                      <p className="font-bold text-teal-600">100점</p>
                      <p className="text-xs text-teal-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <a href="/category/legal/patent-attorney/study/civil-procedure" className="block bg-gray-50 rounded-lg p-4 hover:bg-teal-50 transition border-2 border-transparent hover:border-teal-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">3교시: 민사소송법</h3>
                      <p className="text-sm text-gray-500 mt-1">120분 (100점 만점)</p>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>• 소송요건, 당사자, 소송물</li>
                        <li>• 증거법, 판결효력, 상소</li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">배점</span>
                      <p className="font-bold text-teal-600">100점</p>
                      <p className="text-xs text-teal-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="mt-4 p-3 bg-teal-50 rounded-lg text-sm text-teal-700">
                💡 2차 합격기준: 매 과목 40% 이상, 전 과목 총점 60% 이상 (240점/400점)
              </div>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📚</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg p-4">
                  <h3 className="font-semibold text-cyan-800 mb-3">🎯 이공계 출신 (약 1.5~2년 과정)</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">1️⃣ 특허법 기초 (4개월)</span>
                    <span className="text-cyan-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">2️⃣ 민법 (3개월)</span>
                    <span className="text-cyan-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">3️⃣ 상표법 (2개월)</span>
                    <span className="text-cyan-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">4️⃣ 1차 정리 (3개월)</span>
                    <span className="text-cyan-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">5️⃣ 2차 논술 (6개월)</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-800 mb-3">🎓 법학 출신 (약 2~2.5년 과정)</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">1️⃣ 자연과학 기초 (4개월)</span>
                    <span className="text-teal-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">2️⃣ 특허법 (4개월)</span>
                    <span className="text-teal-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">3️⃣ 명세서 분석 (3개월)</span>
                    <span className="text-teal-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">4️⃣ 1차+2차 병행 (9개월)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-cyan-100 mb-4">AI에게 변리사 관련 질문을 해보세요!</p>
              <div className="grid gap-3">
                {aiQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition"
                  >
                    <span className="font-medium">{q.title}</span>
                    <p className="text-sm text-cyan-200 mt-1">클릭하여 AI에게 질문하기</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-cyan-50 rounded">
                  <span className="text-gray-600">원서접수</span>
                  <span className="font-medium text-cyan-600">1월 예정</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">1차 시험</span>
                  <span className="font-medium">2월 예정</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">1차 합격발표</span>
                  <span className="font-medium">4월 예정</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-teal-50 rounded">
                  <span className="text-gray-600">2차 시험</span>
                  <span className="font-medium text-teal-600">7월 예정</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">최종 합격발표</span>
                  <span className="font-medium">10월 예정</span>
                </div>
              </div>
              <a href="https://www.kipo.go.kr" target="_blank" rel="noopener noreferrer"
                className="block mt-4 text-center text-sm text-cyan-600 hover:text-cyan-800">
                특허청 시험 공고 확인 →
              </a>
            </section>

            {/* 과목별 목표점수 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 1차 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '산업재산권법', target: 85, max: 100 },
                  { name: '민법개론', target: 75, max: 100 },
                  { name: '자연과학개론', target: 80, max: 100 }
                ].map((subject, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className="text-cyan-600 font-medium">{subject.target}점</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full"
                        style={{ width: `${subject.target}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-cyan-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">목표 평균</p>
                <p className="text-2xl font-bold text-cyan-600">80점</p>
                <p className="text-xs text-gray-500">(합격선: 평균 60점 이상)</p>
              </div>
            </section>

            {/* 연계 자격증 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <a href="/category/legal/judicial-scrivener" className="block p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 transition">
                  <div className="font-medium text-gray-800">법무사</div>
                  <p className="text-xs text-gray-500">법률 문서 + 지재권 연계</p>
                </a>
                <a href="/category/it/information-processing-engineer" className="block p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 transition">
                  <div className="font-medium text-gray-800">정보처리기사</div>
                  <p className="text-xs text-gray-500">IT 특허 분야 시너지</p>
                </a>
                <a href="/category/it/engineer-information-security" className="block p-3 bg-gray-50 rounded-lg hover:bg-cyan-50 transition">
                  <div className="font-medium text-gray-800">정보보안기사</div>
                  <p className="text-xs text-gray-500">보안 기술 특허</p>
                </a>
              </div>
            </section>

            {/* 추천 교재 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📖</span> 추천 교재
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">특허법 기본서</p>
                  <p className="text-gray-500 text-xs">정상조 특허법 / 조영선 특허법</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">상표법</p>
                  <p className="text-gray-500 text-xs">송영식 상표법 / 사례로 배우는 상표법</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">민법 (변리사용)</p>
                  <p className="text-gray-500 text-xs">박승수 민법개론</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">기출문제집</p>
                  <p className="text-gray-500 text-xs">최근 10개년 기출문제 해설</p>
                </div>
              </div>
            </section>

            {/* 변리사 특성 */}
            <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>💡</span> 알아두세요
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 이공계+법학 융합 자격</li>
                <li>• 해외 특허 출원 시 영어 필수</li>
                <li>• 기술 분야별 전문화 가능</li>
                <li>• 연봉: 초봉 5,000만원+</li>
                <li>• 개업 시 고수익 가능</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
          <p className="text-gray-500 text-sm mt-2">본 사이트는 자격시험 정보 제공 목적으로 운영됩니다.</p>
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
              >
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
