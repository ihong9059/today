"use client";

import { useState } from "react";
import Link from "next/link";

export default function ClinicalPsychologist2Page() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const examSubjects = [
    { name: "심리학개론", questions: 20, icon: "🧠", color: "bg-cyan-500", description: "심리학의 기초 이론과 개념" },
    { name: "이상심리학", questions: 20, icon: "🔬", color: "bg-blue-500", description: "정신장애의 이해와 분류" },
    { name: "심리검사", questions: 20, icon: "📊", color: "bg-indigo-500", description: "심리측정의 기초와 검사 해석" },
    { name: "임상심리학", questions: 20, icon: "🏥", color: "bg-violet-500", description: "임상심리의 기초와 실무" },
    { name: "심리상담", questions: 20, icon: "💬", color: "bg-purple-500", description: "상담이론과 기본 기법" },
  ];

  const studySubjects = [
    { id: "psychology-intro", name: "심리학개론", icon: "🧠", href: "/category/welfare/clinical-psychologist-2/study/psychology-intro" },
    { id: "abnormal-psychology", name: "이상심리학", icon: "🔬", href: "/category/welfare/clinical-psychologist-2/study/abnormal-psychology" },
    { id: "psychological-assessment", name: "심리검사", icon: "📊", href: "/category/welfare/clinical-psychologist-2/study/psychological-assessment" },
    { id: "clinical-psychology", name: "임상심리학", icon: "🏥", href: "/category/welfare/clinical-psychologist-2/study/clinical-psychology" },
    { id: "counseling", name: "심리상담", icon: "💬", href: "/category/welfare/clinical-psychologist-2/study/counseling" },
    { id: "practical", name: "실기", icon: "📝", href: "/category/welfare/clinical-psychologist-2/study/practical" },
  ];

  const handleAIHelper = (topic: string) => {
    const prompt = `임상심리사 2급 시험 준비를 도와주세요.

주제: ${topic}

다음 내용을 포함해서 설명해주세요:
1. 핵심 개념 정리
2. 시험에 자주 출제되는 포인트
3. 이해하기 쉬운 예시
4. 암기 팁과 학습 전략`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <span className="font-bold text-gray-800">자격시험 가이드</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
              <span className="text-gray-300">/</span>
              <Link href="/category/welfare" className="text-gray-500 hover:text-gray-700">사회복지·상담</Link>
              <span className="text-gray-300">/</span>
              <span className="text-cyan-600 font-medium">임상심리사 2급</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/20 p-6 rounded-2xl">
              <span className="text-7xl">🧠</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">임상심리사 2급</h1>
              <p className="text-cyan-100 text-lg mb-4">Clinical Psychologist Level 2</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm">국가기술자격</span>
                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm">한국산업인력공단</span>
                <span className="bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-medium">난이도 ★★★☆☆</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <p className="text-gray-500 text-sm mb-1">필기시험</p>
            <p className="text-2xl font-bold text-cyan-600">5과목</p>
            <p className="text-xs text-gray-400">100문항 / 150분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <p className="text-gray-500 text-sm mb-1">실기시험</p>
            <p className="text-2xl font-bold text-blue-600">2시간</p>
            <p className="text-xs text-gray-400">필답형</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <p className="text-gray-500 text-sm mb-1">합격률</p>
            <p className="text-2xl font-bold text-indigo-600">40~50%</p>
            <p className="text-xs text-gray-400">2024년 기준</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 text-center">
            <p className="text-gray-500 text-sm mb-1">응시료</p>
            <p className="text-2xl font-bold text-violet-600">41,900원</p>
            <p className="text-xs text-gray-400">필기+실기 합산</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* 자격 개요 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📋</span> 자격 개요
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-800">임상심리사 2급</strong>은 심리평가 및 심리상담의
                  기초 업무를 수행하는 심리전문가 자격입니다. 1급 취득을 위한 필수 과정입니다.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <h4 className="font-bold text-cyan-800 mb-2">주요 업무</h4>
                    <ul className="text-sm space-y-1 text-cyan-700">
                      <li>• 심리검사 보조 실시</li>
                      <li>• 검사 채점 및 자료 정리</li>
                      <li>• 기초 심리상담</li>
                      <li>• 심리평가 보조 업무</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">취업 분야</h4>
                    <ul className="text-sm space-y-1 text-blue-700">
                      <li>• 병원 정신건강의학과</li>
                      <li>• 정신건강복지센터</li>
                      <li>• 심리상담센터</li>
                      <li>• 사회복지시설</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 응시자격 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-blue-500">🎓</span> 응시자격
              </h2>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border-l-4 border-cyan-500">
                  <p className="font-medium text-gray-800">관련학과 4년제 대학 졸업(예정)자</p>
                  <p className="text-sm text-gray-600">심리학, 상담학, 교육심리학 등</p>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="font-medium text-gray-800">관련학과 전문대 졸업 + 실무경력 2년</p>
                </div>
                <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border-l-4 border-indigo-500">
                  <p className="font-medium text-gray-800">비관련학과 졸업 + 실무경력 4년</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">* 관련학과: 심리학, 상담심리학, 임상심리학 등</p>
              </div>
            </div>

            {/* 필기시험 과목 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-indigo-500">📝</span> 필기시험 과목
              </h2>
              <div className="space-y-3">
                {examSubjects.map((subject, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className={`${subject.color} text-white w-10 h-10 rounded-lg flex items-center justify-center text-xl`}>
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{subject.name}</h4>
                      <p className="text-sm text-gray-500">{subject.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-cyan-600 font-bold">{subject.questions}문항</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
                <p className="text-sm text-cyan-800">
                  <strong>합격 기준:</strong> 과목당 40점 이상, 전과목 평균 60점 이상
                </p>
              </div>
            </div>

            {/* 실기시험 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-violet-500">🔬</span> 실기시험
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-5">
                  <h4 className="font-bold text-violet-800 mb-3">임상심리실무</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-violet-700 mb-2">주요 출제 영역</p>
                      <ul className="text-sm text-violet-600 space-y-1">
                        <li>• 심리검사의 실시와 채점</li>
                        <li>• 검사 결과 해석의 기초</li>
                        <li>• 심리평가 보고서 기초</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-violet-700 mb-2">시험 형태</p>
                      <ul className="text-sm text-violet-600 space-y-1">
                        <li>• 필답형 (서술형)</li>
                        <li>• 시험시간: 2시간</li>
                        <li>• 합격: 60점 이상</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 학습 과목 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-purple-500">📚</span> 과목별 학습하기
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {studySubjects.map((subject) => (
                  <Link
                    key={subject.id}
                    href={subject.href}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg hover:from-cyan-100 hover:to-blue-100 transition group"
                  >
                    <span className="text-2xl">{subject.icon}</span>
                    <span className="font-medium text-gray-800 group-hover:text-cyan-700">{subject.name}</span>
                    <span className="ml-auto text-cyan-500 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* 시험 일정 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>📅</span> 2026년 시험 일정
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-500 pl-4">
                  <p className="font-bold text-cyan-700">제1회</p>
                  <p className="text-sm text-gray-600">필기: 3월 2일</p>
                  <p className="text-sm text-gray-600">실기: 4월 27일</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-bold text-blue-700">제2회</p>
                  <p className="text-sm text-gray-600">필기: 5월 11일</p>
                  <p className="text-sm text-gray-600">실기: 7월 6일</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <p className="font-bold text-indigo-700">제3회</p>
                  <p className="text-sm text-gray-600">필기: 8월 3일</p>
                  <p className="text-sm text-gray-600">실기: 10월 19일</p>
                </div>
              </div>
            </div>

            {/* 추천 공부 순서 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>🎯</span> 추천 공부 순서
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="bg-cyan-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <span className="text-gray-700">심리학개론</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <span className="text-gray-700">이상심리학</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-indigo-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <span className="text-gray-700">임상심리학</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-violet-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <span className="text-gray-700">심리검사</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <span className="text-gray-700">심리상담</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-fuchsia-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <span className="text-gray-700">실기 대비</span>
                </div>
              </div>
            </div>

            {/* AI 도우미 */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span>🤖</span> AI 학습 도우미
              </h3>
              <p className="text-cyan-100 text-sm mb-4">
                어려운 개념이 있다면 AI에게 질문해보세요!
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => handleAIHelper("심리검사의 신뢰도와 타당도")}
                  className="w-full text-left bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-sm transition"
                >
                  💡 신뢰도와 타당도 설명해줘
                </button>
                <button
                  onClick={() => handleAIHelper("이상심리학의 주요 정신장애")}
                  className="w-full text-left bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-sm transition"
                >
                  💡 주요 정신장애 종류
                </button>
                <button
                  onClick={() => handleAIHelper("상담의 기본 기법과 원리")}
                  className="w-full text-left bg-white/20 hover:bg-white/30 rounded-lg px-4 py-2 text-sm transition"
                >
                  💡 상담 기본 기법
                </button>
              </div>
            </div>

            {/* 시험 상세 링크 */}
            <Link
              href="/category/welfare/clinical-psychologist-2/exam"
              className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">시험 상세 정보</h3>
                  <p className="text-sm text-gray-500">과목별 출제경향, 합격전략</p>
                </div>
                <span className="text-cyan-500 text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* 1급 안내 */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">📈 1급 도전하기</h3>
              <p className="text-sm text-gray-600 mb-3">
                2급 취득 후 5년 경력이면 1급에 도전할 수 있습니다.
              </p>
              <Link href="/category/welfare/clinical-psychologist-1" className="text-cyan-600 text-sm font-medium hover:text-cyan-700">
                임상심리사 1급 알아보기 →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
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
