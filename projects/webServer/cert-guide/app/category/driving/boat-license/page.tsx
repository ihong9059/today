"use client";

import { useState } from "react";
import Link from "next/link";

export default function BoatLicenseMainPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const studySubjects = [
    {
      id: "navigation",
      title: "항해",
      description: "해도, 항법, 조류, 기상",
      icon: "🧭",
      color: "from-blue-500 to-cyan-600",
      questions: 50,
    },
    {
      id: "seamanship",
      title: "운용",
      description: "조선, 계류, 예인, 통신",
      icon: "⚓",
      color: "from-teal-500 to-emerald-600",
      questions: 50,
    },
    {
      id: "maritime-law",
      title: "법규",
      description: "해사법규, 선박법, 안전법",
      icon: "📋",
      color: "from-indigo-500 to-purple-600",
      questions: 50,
    },
    {
      id: "engine",
      title: "기관",
      description: "선박기관, 추진장치, 정비",
      icon: "⚙️",
      color: "from-orange-500 to-red-600",
      questions: 50,
    },
  ];

  const examTopics = [
    "해도 판독 및 항법",
    "조류와 기상 이해",
    "선박 조종술",
    "계류 및 이안",
    "해상충돌예방규칙",
    "선박안전법",
    "선박기관 구조",
    "비상시 대응절차",
  ];

  const handleAIHelper = (topic: string) => {
    const prompt = `소형선박조종사 시험 준비 중입니다.\n\n"${topic}"에 대해 자세히 설명해주세요. 실제 시험에서 자주 출제되는 내용과 핵심 포인트를 포함해서 알려주세요.`;
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
            <span className="text-cyan-600 font-medium">소형선박조종사</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-5 rounded-2xl">
              <span className="text-6xl">⛵</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">소형선박조종사</h1>
              <p className="text-cyan-200 text-lg">Small Vessel Operator License</p>
              <div className="flex gap-4 mt-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">5톤 미만 선박</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">해양수산부</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm mb-1">시험 구성</p>
            <p className="text-2xl font-bold text-cyan-600">필기 + 실기</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm mb-1">응시자격</p>
            <p className="text-2xl font-bold text-blue-600">만 14세 이상</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm mb-1">시행기관</p>
            <p className="text-2xl font-bold text-indigo-600">해양수산부</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 mb-10 border border-cyan-200">
          <h3 className="font-bold text-cyan-800 mb-4 text-lg">소형선박조종사란?</h3>
          <p className="text-cyan-700 mb-3">
            총톤수 5톤 미만의 소형선박(모터보트, 요트 등)을 조종할 수 있는 면허입니다.
            레저용 선박을 직접 운항하거나, 수상레저사업에 종사하려면 반드시 취득해야 합니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-cyan-700 mb-2">조종 가능 선박</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 모터보트 (5톤 미만)</li>
                <li>• 요트 (5톤 미만)</li>
                <li>• 수상오토바이</li>
                <li>• 고무보트</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-bold text-cyan-700 mb-2">활용 분야</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 해양레저 (요트, 보트)</li>
                <li>• 수상레저사업 (대여업)</li>
                <li>• 낚시어선 운항</li>
                <li>• 해양관광 가이드</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">과목별 학습</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {studySubjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/category/driving/boat-license/study/${subject.id}`}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 group"
            >
              <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-r ${subject.color} w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}>
                  {subject.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-cyan-600 transition-colors">{subject.title}</h3>
                  <p className="text-gray-500 text-sm">{subject.description}</p>
                </div>
                <div className="text-right">
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">{subject.questions}문항</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">AI 학습 도우미</h2>
            <span className="text-sm text-gray-500">주요 토픽 선택</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {examTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleAIHelper(topic)}
                className="bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 border border-cyan-200 rounded-lg p-3 text-left transition-colors"
              >
                <span className="text-cyan-700 text-sm font-medium">{topic}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/category/driving/boat-license/exam"
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-4 rounded-xl font-bold text-center hover:from-cyan-700 hover:to-blue-700 transition-colors shadow-lg"
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
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">AI 도우미 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="text-gray-600 mb-6">원하는 AI를 선택하면 새 창에서 질문이 자동으로 입력됩니다.</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors">Claude</a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors">ChatGPT</a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors">Gemini</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
