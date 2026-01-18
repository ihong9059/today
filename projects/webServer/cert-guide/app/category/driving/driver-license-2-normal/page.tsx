"use client";

import { useState } from "react";
import Link from "next/link";

export default function DriverLicense2NormalPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleAIHelper = (topic: string) => {
    const prompt = `2종 보통면허 시험 준비 중입니다. "${topic}"에 대해 핵심 개념과 출제 포인트를 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const studySubjects = [
    { name: "도로교통법규", path: "traffic-law", icon: "📋", desc: "교통신호, 안전표지, 운전규칙", questions: 50 },
    { name: "안전운전", path: "safe-driving", icon: "🛡️", desc: "방어운전, 사고예방, 응급상황", questions: 50 },
    { name: "자동차구조", path: "vehicle-structure", icon: "🔧", desc: "엔진, 제동장치, 조향장치", questions: 50 },
    { name: "실기(장내/도로)", path: "practical", icon: "🚙", desc: "장내기능, 도로주행, 코스운전", questions: 50 },
  ];

  const examTopics = [
    "교통신호 및 안전표지",
    "차로통행 및 앞지르기",
    "교차로 통행방법",
    "보행자 보호",
    "긴급자동차 양보",
    "음주운전 처벌기준",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/category/driving"
            className="inline-flex items-center text-sky-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            운전·조종 분야로 돌아가기
          </Link>
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl backdrop-blur">
              <span className="text-6xl">🚙</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-3">2종 보통면허</h1>
              <p className="text-xl text-sky-200">승용차, 승합차(10인 이하), 화물차(4톤 이하)</p>
              <div className="flex gap-4 mt-4">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">필기시험 40문항</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">실기시험 2종</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-sky-500">
            <p className="text-gray-500 text-sm mb-1">필기 문항수</p>
            <p className="text-3xl font-bold text-sky-600">40문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500">
            <p className="text-gray-500 text-sm mb-1">필기 합격</p>
            <p className="text-3xl font-bold text-blue-600">60점</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-indigo-500">
            <p className="text-gray-500 text-sm mb-1">시험시간</p>
            <p className="text-3xl font-bold text-indigo-600">50분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-green-500">
            <p className="text-gray-500 text-sm mb-1">응시연령</p>
            <p className="text-3xl font-bold text-green-600">만18세</p>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 mb-12 border border-sky-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">시험 개요</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-sky-700 mb-3 flex items-center gap-2">
                <span className="bg-sky-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                응시자격
              </h3>
              <ul className="space-y-2 text-gray-600 ml-10">
                <li>• 만 18세 이상</li>
                <li>• 신체검사 합격자</li>
                <li>• 학과교육 이수자 (1시간)</li>
                <li>• 기능교육 이수자 (4시간)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sky-700 mb-3 flex items-center gap-2">
                <span className="bg-sky-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                운전 가능 차량
              </h3>
              <ul className="space-y-2 text-gray-600 ml-10">
                <li>• 승용자동차</li>
                <li>• 승합자동차 (10인승 이하)</li>
                <li>• 화물자동차 (적재중량 4톤 이하)</li>
                <li>• 원동기장치자전거</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 1종 vs 2종 비교 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">1종 보통 vs 2종 보통 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 text-left text-gray-600">구분</th>
                  <th className="py-3 text-center text-sky-600 font-bold">2종 보통</th>
                  <th className="py-3 text-center text-slate-600 font-bold">1종 보통</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">승합차</td>
                  <td className="py-3 text-center">10인승 이하</td>
                  <td className="py-3 text-center">15인승 이하</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">화물차</td>
                  <td className="py-3 text-center">4톤 이하</td>
                  <td className="py-3 text-center">12톤 미만</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">변속기</td>
                  <td className="py-3 text-center">자동만 (AT한정 가능)</td>
                  <td className="py-3 text-center">수동/자동</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">취득 난이도</td>
                  <td className="py-3 text-center text-green-600 font-medium">쉬움</td>
                  <td className="py-3 text-center text-orange-600 font-medium">보통</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Study Subjects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">과목별 학습</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {studySubjects.map((subject, index) => (
              <Link
                key={index}
                href={`/category/driving/driver-license-2-normal/study/${subject.path}`}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-sky-500"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-sky-500 to-blue-600 w-14 h-14 rounded-xl flex items-center justify-center text-2xl">
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{subject.name}</h3>
                    <p className="text-gray-500 text-sm">{subject.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium">
                      {subject.questions}문항
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-4">총 200문항의 예상문제로 학습할 수 있습니다</p>
        </div>

        {/* AI Helper Section */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-4">AI 학습 도우미</h2>
          <p className="text-sky-200 mb-6">
            각 과목 학습 페이지에서 AI 버튼을 클릭하면 Claude, ChatGPT, Gemini 중 선택하여 심화 학습할 수 있습니다.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {examTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleAIHelper(topic)}
                className="bg-white/10 hover:bg-white/20 rounded-lg p-3 text-left transition-colors"
              >
                <span className="text-sm">{topic}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Exam Info Link */}
        <div className="text-center">
          <Link
            href="/category/driving/driver-license-2-normal/exam"
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-sky-700 transition-colors"
          >
            📋 상세 시험정보 보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-colors">Claude</a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors">ChatGPT</a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-colors">Gemini</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
