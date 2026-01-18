'use client';

import { useState } from 'react';

export default function JudicialScrivenerPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const aiQuestions = [
    {
      title: "민법 물권법 핵심",
      prompt: `법무사 시험 민법 물권법에 대해 설명해주세요.

다음 순서로 설명해주세요:
1. 물권의 종류와 특성
2. 물권변동의 요건 (등기, 인도 등)
3. 소유권, 용익물권, 담보물권 비교
4. 시험 출제 빈도가 높은 쟁점
5. 관련 판례 5개와 핵심 요지`
    },
    {
      title: "부동산등기 실무",
      prompt: `법무사 시험 부동산등기법 실무에 대해 설명해주세요.

다음 순서로 설명해주세요:
1. 등기의 종류와 효력
2. 등기신청 절차와 서류
3. 소유권이전등기 vs 근저당권설정등기
4. 등기관의 심사권한과 각하사유
5. 실제 등기신청서 작성 예시`
    },
    {
      title: "민사집행 절차",
      prompt: `법무사 시험 민사집행법에 대해 설명해주세요.

다음 순서로 설명해주세요:
1. 강제집행의 종류 (부동산, 채권, 동산)
2. 집행권원과 집행문
3. 경매절차의 주요 단계
4. 배당요구와 배당순위
5. 시험에 자주 나오는 사례 문제`
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
            <span className="text-violet-600 font-medium">법무사</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-6">
            <div className="bg-white/20 p-4 rounded-2xl">
              <span className="text-5xl">⚖️</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">법무사</h1>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">국가전문자격</span>
              </div>
              <p className="text-violet-100 text-lg mb-4">Judicial Scrivener</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span>📊</span>
                  <span>난이도: ★★★★★</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👥</span>
                  <span>연간 응시자: 약 8,000명</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>합격률: 1차 20% / 2차 5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <a href="/category/legal/judicial-scrivener/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-violet-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">📝</span>
            <p className="text-gray-500 text-sm mt-2">1차 시험</p>
            <p className="font-bold text-gray-800">객관식 5과목</p>
            <p className="text-xs text-gray-400">150분</p>
            <p className="text-xs text-violet-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <a href="/category/legal/judicial-scrivener/exam" className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg hover:border-violet-300 border-2 border-transparent transition cursor-pointer">
            <span className="text-2xl">✍️</span>
            <p className="text-gray-500 text-sm mt-2">2차 시험</p>
            <p className="font-bold text-gray-800">논술형+서식형</p>
            <p className="text-xs text-gray-400">240분</p>
            <p className="text-xs text-violet-500 mt-2 font-medium">상세보기 →</p>
          </a>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">💰</span>
            <p className="text-gray-500 text-sm mt-2">응시료</p>
            <p className="font-bold text-gray-800">1차 30,000원</p>
            <p className="text-xs text-gray-400">2차 30,000원</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <span className="text-2xl">🏢</span>
            <p className="text-gray-500 text-sm mt-2">주관</p>
            <p className="font-bold text-gray-800">대법원</p>
            <p className="text-xs text-gray-400">법원행정처</p>
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
                <span className="text-violet-500">📋</span> 자격 개요
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                법무사는 등기, 공탁, 송달, 소송서류 작성 등 법률사무를 처리하는 국가전문자격사입니다.
                변호사와 함께 법률서비스를 제공하며, 특히 부동산등기와 법인등기 분야에서 핵심 역할을 합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-violet-50 rounded-lg p-4">
                  <h3 className="font-semibold text-violet-800 mb-2">📌 주요 업무</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 부동산등기 신청 및 대리</li>
                    <li>• 법인등기 및 상업등기</li>
                    <li>• 민사소송 서류 작성</li>
                    <li>• 공탁 업무 대리</li>
                    <li>• 개인회생/파산 서류 작성</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">💼 진출 분야</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 법무사 사무소 개업</li>
                    <li>• 법무법인·법무조합</li>
                    <li>• 기업체 법무팀</li>
                    <li>• 부동산 관련 기업</li>
                    <li>• 금융권 여신/심사부서</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 1차 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">📝</span> 1차 시험 과목 (객관식)
              </h2>
              <div className="space-y-4">
                <a href="/category/legal/judicial-scrivener/study/civil-law" className="block bg-gray-50 rounded-lg p-4 hover:bg-violet-50 transition border-2 border-transparent hover:border-violet-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">1. 민법</h3>
                      <p className="text-sm text-gray-500 mt-1">40문항 (80점 만점)</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">총칙</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">물권법</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">채권법</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">친족상속법</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">난이도</span>
                      <p className="text-yellow-500">★★★★★</p>
                      <p className="text-xs text-violet-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <a href="/category/legal/judicial-scrivener/study/civil-execution" className="block bg-gray-50 rounded-lg p-4 hover:bg-violet-50 transition border-2 border-transparent hover:border-violet-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">2. 민사집행법</h3>
                      <p className="text-sm text-gray-500 mt-1">20문항 (40점 만점)</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">강제집행</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">경매절차</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">배당</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">난이도</span>
                      <p className="text-yellow-500">★★★★☆</p>
                      <p className="text-xs text-violet-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <a href="/category/legal/judicial-scrivener/study/commercial-law" className="block bg-gray-50 rounded-lg p-4 hover:bg-violet-50 transition border-2 border-transparent hover:border-violet-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">3. 상법 (회사법) + 비송사건절차법</h3>
                      <p className="text-sm text-gray-500 mt-1">20문항 (40점 만점)</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">회사법</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">비송절차</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">법인등기</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">난이도</span>
                      <p className="text-yellow-500">★★★★☆</p>
                      <p className="text-xs text-violet-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <a href="/category/legal/judicial-scrivener/study/real-estate-registration" className="block bg-gray-50 rounded-lg p-4 hover:bg-violet-50 transition border-2 border-transparent hover:border-violet-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">4. 부동산등기법 + 상업등기법</h3>
                      <p className="text-sm text-gray-500 mt-1">20문항 (40점 만점)</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">부동산등기</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">상업등기</span>
                        <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded">등기예규</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">난이도</span>
                      <p className="text-yellow-500">★★★★★</p>
                      <p className="text-xs text-violet-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">5. 헌법 + 공탁법 + 법무사법</h3>
                      <p className="text-sm text-gray-500 mt-1">20문항 (40점 만점)</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">헌법</span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">공탁법</span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">법무사법</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">난이도</span>
                      <p className="text-yellow-500">★★★☆☆</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-violet-50 rounded-lg text-sm text-violet-700">
                💡 1차 합격기준: 과목당 40점 이상, 전 과목 평균 60점 이상
              </div>
            </section>

            {/* 2차 시험 과목 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-purple-500">✍️</span> 2차 시험 과목 (논술형+서식형)
              </h2>
              <div className="space-y-4">
                <a href="/category/legal/judicial-scrivener/study/practical" className="block bg-gray-50 rounded-lg p-4 hover:bg-purple-50 transition border-2 border-transparent hover:border-purple-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">1교시: 등기신청서 작성</h3>
                      <p className="text-sm text-gray-500 mt-1">120분 (200점 만점)</p>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>• 부동산등기 신청서 (3-4문제)</li>
                        <li>• 상업등기 신청서 (1-2문제)</li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">배점</span>
                      <p className="font-bold text-purple-600">200점</p>
                      <p className="text-xs text-purple-500 mt-1">학습하기 →</p>
                    </div>
                  </div>
                </a>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">2교시: 민법·민사집행법 논술</h3>
                      <p className="text-sm text-gray-500 mt-1">120분 (200점 만점)</p>
                      <ul className="text-xs text-gray-500 mt-2 space-y-1">
                        <li>• 민법 논술 (2-3문제)</li>
                        <li>• 민사집행법 논술 (1-2문제)</li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">배점</span>
                      <p className="font-bold text-purple-600">200점</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm text-purple-700">
                💡 2차 합격기준: 매 과목 40% 이상, 전 과목 총점 60% 이상
              </div>
            </section>

            {/* 추천 공부 순서 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">📚</span> 추천 공부 순서
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-violet-800 mb-3">🎯 비전공자 (약 2~3년 과정)</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">1️⃣ 민법 기초 (6개월)</span>
                    <span className="text-violet-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">2️⃣ 부동산등기법 (4개월)</span>
                    <span className="text-violet-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">3️⃣ 상법·비송 (3개월)</span>
                    <span className="text-violet-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">4️⃣ 민사집행법 (3개월)</span>
                    <span className="text-violet-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">5️⃣ 기타과목 (2개월)</span>
                    <span className="text-violet-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">6️⃣ 2차 서식 (6개월)</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-3">🎓 법학전공자 (약 1~2년 과정)</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">1️⃣ 민법 심화 (3개월)</span>
                    <span className="text-purple-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">2️⃣ 등기법·집행법 (4개월)</span>
                    <span className="text-purple-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">3️⃣ 1차 기출정리 (2개월)</span>
                    <span className="text-purple-400">→</span>
                    <span className="bg-white px-3 py-2 rounded-lg text-sm shadow-sm">4️⃣ 2차 서식 집중 (6개월)</span>
                  </div>
                </div>
              </div>
            </section>

            {/* AI 학습 도우미 */}
            <section className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-violet-100 mb-4">Claude AI에게 법무사 관련 질문을 해보세요!</p>
              <div className="grid gap-3">
                {aiQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                    className="bg-white/20 hover:bg-white/30 rounded-lg p-3 text-left transition"
                  >
                    <span className="font-medium">{q.title}</span>
                    <p className="text-sm text-violet-200 mt-1">클릭하여 AI에게 질문하기</p>
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
                <div className="flex justify-between items-center p-2 bg-violet-50 rounded">
                  <span className="text-gray-600">원서접수</span>
                  <span className="font-medium text-violet-600">5월 예정</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">1차 시험</span>
                  <span className="font-medium">7월 예정</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">1차 합격발표</span>
                  <span className="font-medium">8월 예정</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="text-gray-600">2차 시험</span>
                  <span className="font-medium text-purple-600">10월 예정</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-gray-600">최종 합격발표</span>
                  <span className="font-medium">12월 예정</span>
                </div>
              </div>
              <a href="https://www.scourt.go.kr" target="_blank" rel="noopener noreferrer"
                className="block mt-4 text-center text-sm text-violet-600 hover:text-violet-800">
                대법원 시험 공고 확인 →
              </a>
            </section>

            {/* 과목별 목표점수 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 1차 과목별 목표점수
              </h3>
              <div className="space-y-3">
                {[
                  { name: '민법', target: 72, max: 80 },
                  { name: '민사집행법', target: 32, max: 40 },
                  { name: '상법·비송', target: 32, max: 40 },
                  { name: '등기법', target: 36, max: 40 },
                  { name: '헌법·공탁·법무사법', target: 32, max: 40 }
                ].map((subject, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{subject.name}</span>
                      <span className="text-violet-600 font-medium">{subject.target}/{subject.max}점</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${(subject.target / subject.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-violet-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">목표 총점</p>
                <p className="text-2xl font-bold text-violet-600">204/240점</p>
                <p className="text-xs text-gray-500">(평균 85점)</p>
              </div>
            </section>

            {/* 연계 자격증 */}
            <section className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                <a href="/category/finance/real-estate-agent" className="block p-3 bg-gray-50 rounded-lg hover:bg-violet-50 transition">
                  <div className="font-medium text-gray-800">공인중개사</div>
                  <p className="text-xs text-gray-500">부동산 거래 + 등기 연계</p>
                </a>
                <a href="/category/legal/labor-attorney" className="block p-3 bg-gray-50 rounded-lg hover:bg-violet-50 transition">
                  <div className="font-medium text-gray-800">공인노무사</div>
                  <p className="text-xs text-gray-500">노동법 전문가</p>
                </a>
                <a href="/category/accounting/tax-accountant" className="block p-3 bg-gray-50 rounded-lg hover:bg-violet-50 transition">
                  <div className="font-medium text-gray-800">세무사</div>
                  <p className="text-xs text-gray-500">세무·법무 종합 서비스</p>
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
                  <p className="font-medium text-gray-800">민법 기본서</p>
                  <p className="text-gray-500 text-xs">김준호 민법강의 / 지원림 민법강의</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">부동산등기법</p>
                  <p className="text-gray-500 text-xs">곽윤직 부동산등기법</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">2차 서식</p>
                  <p className="text-gray-500 text-xs">법무사 등기신청서 작성 실무</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">기출문제집</p>
                  <p className="text-gray-500 text-xs">최근 10개년 기출문제 해설</p>
                </div>
              </div>
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
