"use client";

import Link from "next/link";
import { useState } from "react";

export default function BakeryPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const examInfo = {
    title: "제빵기능사",
    englishTitle: "Craftsman Baking",
    description: "빵류 제조에 관한 전문 기능을 가진 기술인력 양성을 위한 국가기술자격",
    category: "서비스",
    difficulty: "★★★☆☆",
    applicants: "약 4만명/년",
    passRate: { written: "45%", practical: "50%" },
    agency: "한국산업인력공단",
  };

  const subjects = [
    { name: "빵류재료", questions: 20, color: "bg-amber-500", desc: "밀가루, 이스트, 유지류 등" },
    { name: "제조 및 위생관리", questions: 40, color: "bg-orange-500", desc: "반죽법, 발효, 위생관리" },
  ];

  const features = [
    { icon: "🍞", title: "식빵 제조", desc: "산식, 풀먼 식빵 등" },
    { icon: "🥐", title: "조리빵 제조", desc: "크로와상, 데니쉬 등" },
    { icon: "🥖", title: "프랑스빵", desc: "바게트, 바타르 등" },
    { icon: "🧁", title: "특수빵", desc: "호밀빵, 건강빵 등" },
  ];

  const studySubjects = [
    { name: "식품위생학", icon: "🦠", href: "/category/service/bakery/study/food-hygiene", color: "from-red-400 to-rose-500", questions: 50 },
    { name: "식품학", icon: "🧬", href: "/category/service/bakery/study/food-science", color: "from-green-400 to-emerald-500", questions: 50 },
    { name: "영양학", icon: "🥗", href: "/category/service/bakery/study/nutrition", color: "from-orange-400 to-amber-500", questions: 50 },
    { name: "제빵이론", icon: "🍞", href: "/category/service/bakery/study/baking-theory", color: "from-amber-400 to-yellow-500", questions: 50 },
    { name: "실기", icon: "👨‍🍳", href: "/category/service/bakery/study/practical", color: "from-purple-400 to-violet-500", questions: 50 },
  ];

  const schedule2026 = [
    { round: "상시", written: "CBT 상시시험", practical: "별도 공고" },
  ];

  const targetScores = [
    { subject: "식품위생학", target: 70, color: "bg-red-500" },
    { subject: "식품학", target: 65, color: "bg-green-500" },
    { subject: "영양학", target: 60, color: "bg-orange-500" },
    { subject: "제빵이론", target: 75, color: "bg-amber-500" },
  ];

  const relatedCerts = [
    { name: "제과기능사", path: "/category/service/confectioner" },
    { name: "한식조리기능사", path: "/category/service/cook-korean" },
    { name: "양식조리기능사", path: "/category/service/cook-western" },
  ];

  const aiQuestions = [
    "제빵기능사 실기시험 준비 어떻게 해야 하나요?",
    "발효의 원리와 이스트의 역할을 설명해주세요",
    "글루텐 형성 원리와 반죽법 차이를 알려주세요",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white py-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-amber-200 mb-6 text-sm">
            <Link href="/" className="hover:text-white transition">홈</Link>
            <span>/</span>
            <Link href="/category/service" className="hover:text-white transition">서비스</Link>
            <span>/</span>
            <span className="text-white">제빵기능사</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">국가기술자격</span>
            <span className="bg-yellow-400/30 px-4 py-2 rounded-full text-sm font-medium">인기자격</span>
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">{examInfo.difficulty}</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">🍞</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{examInfo.title}</h1>
              <p className="text-amber-100 text-lg">{examInfo.englishTitle}</p>
            </div>
          </div>

          <p className="text-xl text-amber-100 mb-6 max-w-2xl">{examInfo.description}</p>

          <div className="flex flex-wrap gap-6 text-sm mb-8">
            <div className="flex items-center gap-2">
              <span className="text-amber-200">응시자</span>
              <span className="font-bold">{examInfo.applicants}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-200">필기합격률</span>
              <span className="font-bold">{examInfo.passRate.written}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-200">실기합격률</span>
              <span className="font-bold">{examInfo.passRate.practical}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/category/service/bakery/exam" className="bg-white text-amber-600 px-8 py-3 rounded-xl font-bold hover:bg-amber-50 transition-colors shadow-lg">
              시험 상세정보
            </Link>
            <Link href="/category/service/bakery/study/food-hygiene" className="bg-amber-400 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-300 transition-colors">
              학습 시작하기
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 빠른 정보 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-amber-500">
                <div className="text-3xl mb-2">📝</div>
                <div className="text-sm text-gray-500 mb-1">필기시험</div>
                <div className="font-bold text-gray-800">60문항/60분</div>
                <div className="text-xs text-gray-400">CBT 상시</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-orange-500">
                <div className="text-3xl mb-2">👨‍🍳</div>
                <div className="text-sm text-gray-500 mb-1">실기시험</div>
                <div className="font-bold text-gray-800">3~4시간</div>
                <div className="text-xs text-gray-400">작업형</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-yellow-500">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-sm text-gray-500 mb-1">응시료</div>
                <div className="font-bold text-gray-800">14,500원</div>
                <div className="text-xs text-gray-400">필기 기준</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-red-500">
                <div className="text-3xl mb-2">🏛️</div>
                <div className="text-sm text-gray-500 mb-1">주관기관</div>
                <div className="font-bold text-gray-800 text-sm">한국산업인력공단</div>
                <div className="text-xs text-gray-400">Q-Net</div>
              </div>
            </div>

            {/* 특징 카드 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* 자격 개요 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-amber-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-bold text-amber-600 mb-2">제빵기능사란?</h3>
                  <p>제빵에 관한 숙련기능을 가지고 식빵류, 조리빵류, 프랑스빵류, 특수빵류 등을 제조하는 직무를 수행하는 전문 기술인력입니다.</p>
                </div>
                <div>
                  <h3 className="font-bold text-amber-600 mb-2">주요 업무</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>각종 빵류 반죽 제조 및 발효 관리</li>
                    <li>성형, 팬닝, 굽기 등 제빵 공정 수행</li>
                    <li>제빵 재료의 선별 및 관리</li>
                    <li>제품 품질 관리 및 위생 관리</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-amber-600 mb-2">취업 분야</h3>
                  <p>베이커리, 호텔, 리조트, 프랜차이즈 빵집, 식품회사 R&D, 제빵 학원 강사, 창업 등</p>
                </div>
              </div>
            </div>

            {/* 필기시험 과목 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-amber-500">📚</span> 필기시험 과목
              </h2>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                    <div className={`w-3 h-16 ${subject.color} rounded-full`}></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{subject.name}</h3>
                      <p className="text-sm text-gray-600">{subject.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                        {subject.questions}문항
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                <p className="text-amber-800">
                  <strong>합격기준:</strong> 60문항 중 36문항 이상 정답 (60점 이상)
                </p>
              </div>
            </div>

            {/* 실기시험 구성 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-amber-500">👨‍🍳</span> 실기시험 구성
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-amber-50 rounded-xl">
                  <h3 className="font-bold text-amber-700 mb-2">시험 방식</h3>
                  <p className="text-gray-700">작업형 실기시험</p>
                  <p className="text-sm text-gray-500 mt-1">지정된 제품을 직접 제조</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <h3 className="font-bold text-orange-700 mb-2">시험 시간</h3>
                  <p className="text-gray-700">3~4시간</p>
                  <p className="text-sm text-gray-500 mt-1">품목에 따라 상이</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-bold text-gray-800 mb-3">실기 출제 품목 (20종)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["식빵", "단과자빵", "소시지빵", "크림빵", "버터톱식빵", "밤식빵", "옥수수식빵", "우유식빵",
                    "통밀빵", "모카빵", "더치빵", "베이글", "빵도넛", "소보로빵", "스위트롤", "버터롤",
                    "그리시니", "브리오슈", "풀먼식빵", "호밀빵"].map((item, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm text-center">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                <p className="text-amber-800">
                  <strong>합격기준:</strong> 100점 만점 중 60점 이상
                </p>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-amber-500">🎯</span> 추천 공부 순서
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                  <h3 className="font-bold text-amber-700 mb-4">비전공자 추천 순서</h3>
                  <ol className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <span>제빵이론 (기초 개념)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <span>식품학 (재료 이해)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <span>영양학 (기초)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                      <span>식품위생학 (암기)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                      <span>실기 (실습)</span>
                    </li>
                  </ol>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                  <h3 className="font-bold text-orange-700 mb-4">전공자/경력자 추천 순서</h3>
                  <ol className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                      <span>실기 (실습 병행)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                      <span>식품위생학 (법규)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-amber-400 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                      <span>제빵이론 (심화)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                      <span>기출문제 풀이</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 과목별 학습하기 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-amber-500">📖</span> 과목별 학습하기
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {studySubjects.map((subject, index) => (
                  <Link key={index} href={subject.href} className={`bg-gradient-to-br ${subject.color} text-white p-6 rounded-xl text-center hover:scale-105 transition-transform`}>
                    <div className="text-3xl mb-2">{subject.icon}</div>
                    <div className="font-bold">{subject.name}</div>
                    <div className="text-sm opacity-80">{subject.questions}문항</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI 학습 도우미 */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h2>
              <p className="text-amber-100 mb-6">제빵기능사 학습 중 궁금한 점을 AI에게 물어보세요!</p>
              <div className="space-y-3">
                {aiQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPrompt(`제빵기능사 시험 관련 질문입니다.\n\n${q}\n\n다음 내용을 포함해서 상세히 설명해주세요:\n1. 핵심 개념\n2. 실제 시험 출제 포인트\n3. 암기 팁\n4. 실기 적용 방법`);
                      setShowAIModal(true);
                    }}
                    className="w-full text-left bg-white/10 hover:bg-white/20 p-4 rounded-xl transition flex items-center gap-3"
                  >
                    <span className="text-xl">💡</span>
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-amber-500">📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-3">
                {schedule2026.map((item, index) => (
                  <div key={index} className="p-3 bg-amber-50 rounded-lg">
                    <div className="font-bold text-amber-700">{item.round}</div>
                    <div className="text-sm text-gray-600">필기: {item.written}</div>
                    <div className="text-sm text-gray-600">실기: {item.practical}</div>
                  </div>
                ))}
              </div>
              <a href="https://www.q-net.or.kr" target="_blank" rel="noopener noreferrer" className="block mt-4 text-center text-amber-600 hover:text-amber-700 text-sm">
                Q-Net에서 일정 확인 →
              </a>
            </div>

            {/* 과목별 목표점수 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-amber-500">🎯</span> 과목별 목표점수
              </h3>
              <div className="space-y-4">
                {targetScores.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.subject}</span>
                      <span className="font-bold text-gray-800">{item.target}점</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.target}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
                평균 60점 이상 + 과락 없음 (40점 미만 과목 X)
              </div>
            </div>

            {/* 연계 자격증 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-amber-500">🔗</span> 연계 자격증
              </h3>
              <div className="space-y-2">
                {relatedCerts.map((cert, index) => (
                  <Link key={index} href={cert.path} className="block p-3 bg-gray-50 hover:bg-amber-50 rounded-lg transition text-gray-700 hover:text-amber-700">
                    {cert.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 추천 교재 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-amber-500">📚</span> 추천 교재
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">2026 제빵기능사 필기</div>
                  <div className="text-sm text-gray-500">시대고시기획</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">제빵기능사 실기</div>
                  <div className="text-sm text-gray-500">크라운출판사</div>
                </div>
              </div>
            </div>
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
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 UTTEC 자격시험 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
