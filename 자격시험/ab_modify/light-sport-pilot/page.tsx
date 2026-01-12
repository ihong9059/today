"use client";

import { useState } from "react";
import Link from "next/link";

export default function LightSportPilotPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const studySubjects = [
    {
      icon: "📋",
      title: "항공법규",
      description: "항공안전법, 경량항공기 규정",
      path: "/category/driving/light-sport-pilot/study/aviation-law",
      color: "from-indigo-500 to-purple-600",
      questions: 50,
    },
    {
      icon: "🌤️",
      title: "항공기상",
      description: "기상현상, 일기도, 비행기상",
      path: "/category/driving/light-sport-pilot/study/meteorology",
      color: "from-sky-500 to-blue-600",
      questions: 50,
    },
    {
      icon: "✈️",
      title: "비행이론",
      description: "양력, 항력, 비행원리, 경량기 특성",
      path: "/category/driving/light-sport-pilot/study/flight-theory",
      color: "from-violet-500 to-indigo-600",
      questions: 50,
    },
    {
      icon: "🧭",
      title: "항법",
      description: "지문항법, 추측항법, 비행계획",
      path: "/category/driving/light-sport-pilot/study/navigation",
      color: "from-emerald-500 to-teal-600",
      questions: 50,
    },
  ];

  const examTopics = [
    "경량항공기 정의",
    "비행규칙",
    "양력과 항력",
    "기상 판단",
    "지문항법",
    "비상절차",
  ];

  const handleAIHelper = (topic: string) => {
    const prompt = `경량항공기조종사 시험 준비 중입니다.\n\n"${topic}"에 대해 자세히 설명해주세요.\n\n다음 내용을 포함해주세요:\n1. 핵심 개념과 원리\n2. 시험 출제 포인트\n3. 경량항공기 특성에 맞는 적용 사례\n4. 자가용조종사와의 차이점`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-cyan-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/driving" className="text-gray-600 hover:text-cyan-600">운전·조종</Link>
            <span className="text-gray-300">›</span>
            <span className="text-cyan-600 font-medium">경량항공기조종사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-teal-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl backdrop-blur">
              <span className="text-7xl">🪂</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-3">경량항공기조종사</h1>
              <p className="text-cyan-200 text-xl">Light Sport Aircraft Pilot</p>
              <p className="text-cyan-100 mt-2">경량항공기 조종을 위한 입문 자격</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <p className="text-gray-500 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-cyan-600">200문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <p className="text-gray-500 text-sm">시험 구성</p>
            <p className="text-3xl font-bold text-teal-600">필기+실기</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <p className="text-gray-500 text-sm">비행경력</p>
            <p className="text-3xl font-bold text-blue-600">20시간+</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <p className="text-gray-500 text-sm">합격기준</p>
            <p className="text-3xl font-bold text-green-600">70점 이상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-6 mb-10 border border-cyan-200">
          <h2 className="text-xl font-bold text-cyan-800 mb-4">경량항공기조종사란?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-cyan-700">
            <div>
              <h3 className="font-semibold mb-2">경량항공기 범위</h3>
              <ul className="space-y-1 text-sm">
                <li>• 최대이륙중량 600kg 이하</li>
                <li>• 좌석 2개 이하</li>
                <li>• 단발 왕복엔진</li>
                <li>• 프로펠러 고정피치</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">응시자격</h3>
              <ul className="space-y-1 text-sm">
                <li>• 만 17세 이상</li>
                <li>• 항공신체검사 2종 이상</li>
                <li>• 비행경력 20시간 이상</li>
                <li>• 단독비행 5시간 이상</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">과목별 학습</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {studySubjects.map((subject, index) => (
            <Link key={index} href={subject.path} className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`bg-gradient-to-r ${subject.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{subject.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold">{subject.title}</h3>
                      <p className="text-white/80 text-sm">{subject.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <span className="text-gray-600">{subject.questions}문항</span>
                  <span className="text-cyan-600 group-hover:translate-x-1 transition-transform">학습하기 →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">AI 학습 도우미</h2>
            <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">Beta</span>
          </div>
          <p className="text-gray-600 mb-4">궁금한 주제를 선택하면 AI가 상세히 설명해드립니다.</p>
          <div className="flex flex-wrap gap-2">
            {examTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleAIHelper(topic)}
                className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-4 py-2 rounded-lg text-sm transition-colors border border-cyan-200"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              <span className="text-xl">⏱️</span> 비행훈련 요건
            </h3>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li>• 총 비행시간: 20시간 이상</li>
              <li>• 교관동승: 15시간 이상</li>
              <li>• 단독비행: 5시간 이상</li>
              <li>• 야외비행: 포함</li>
              <li>• 훈련비용: 약 500~800만원</li>
            </ul>
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-6 border border-teal-200">
            <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
              <span className="text-xl">🏥</span> 신체검사 (2종)
            </h3>
            <ul className="space-y-2 text-teal-700 text-sm">
              <li>• 시력: 교정시력 1.0 이상</li>
              <li>• 청력: 정상 청력</li>
              <li>• 혈압: 160/95 이하</li>
              <li>• 유효기간: 5년 (40세 미만)</li>
              <li>• 유효기간: 2년 (40세 이상)</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/category/driving/light-sport-pilot/exam"
            className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-4 rounded-xl font-bold text-center hover:from-cyan-700 hover:to-teal-700 transition-colors shadow-lg"
          >
            시험정보 보기 →
          </Link>
          <Link
            href="/category/driving"
            className="bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            목록으로
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">AI 도우미 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">원하는 AI를 선택하면 새 창에서 질문이 자동으로 입력됩니다.</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors"
                >
                  Claude
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors"
                >
                  ChatGPT
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors"
                >
                  Gemini
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
