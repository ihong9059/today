"use client";

import { useState } from "react";
import Link from "next/link";

export default function DriverLicense1LargePage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleAIHelper = (topic: string) => {
    const prompt = `1종 대형면허 시험 준비 중입니다. "${topic}"에 대해 핵심 개념과 출제 포인트를 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const studySubjects = [
    { name: "도로교통법규", path: "traffic-law", icon: "📋", desc: "대형차량 교통법규, 특별규정", questions: 50 },
    { name: "안전운전", path: "safe-driving", icon: "🛡️", desc: "대형차 방어운전, 사고예방", questions: 50 },
    { name: "자동차구조", path: "vehicle-structure", icon: "🔧", desc: "대형차 엔진, 제동장치, 에어브레이크", questions: 50 },
    { name: "실기(장내/도로)", path: "practical", icon: "🚛", desc: "대형차 코스, 도로주행", questions: 50 },
  ];

  const examTopics = [
    "대형차량 제한속도",
    "에어브레이크 작동원리",
    "대형차 사각지대",
    "화물적재 규정",
    "운행기록계 장착",
    "대형차 교차로 통행",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-zinc-700 to-stone-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/category/driving"
            className="inline-flex items-center text-zinc-300 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            운전·조종 분야로 돌아가기
          </Link>
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl backdrop-blur">
              <span className="text-6xl">🚛</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-3">1종 대형면허</h1>
              <p className="text-xl text-zinc-300">대형승합차, 대형화물차, 특수차량 운전</p>
              <div className="flex gap-4 mt-4">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">필기시험 40문항</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">기능+도로주행</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-zinc-500">
            <p className="text-gray-500 text-sm mb-1">필기 문항수</p>
            <p className="text-3xl font-bold text-zinc-600">40문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-stone-500">
            <p className="text-gray-500 text-sm mb-1">필기 합격</p>
            <p className="text-3xl font-bold text-stone-600">60점</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-neutral-500">
            <p className="text-gray-500 text-sm mb-1">시험시간</p>
            <p className="text-3xl font-bold text-neutral-600">50분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-amber-500">
            <p className="text-gray-500 text-sm mb-1">응시연령</p>
            <p className="text-3xl font-bold text-amber-600">만19세</p>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-gradient-to-r from-zinc-50 to-stone-50 rounded-2xl p-8 mb-12 border border-zinc-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">시험 개요</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-zinc-700 mb-3 flex items-center gap-2">
                <span className="bg-zinc-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                응시자격
              </h3>
              <ul className="space-y-2 text-gray-600 ml-10">
                <li>• 만 19세 이상</li>
                <li>• 1종 보통면허 보유자</li>
                <li>• 신체검사 합격자</li>
                <li>• 학과교육 이수자 (3시간)</li>
                <li>• 기능교육 이수자 (10시간)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-700 mb-3 flex items-center gap-2">
                <span className="bg-zinc-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                운전 가능 차량
              </h3>
              <ul className="space-y-2 text-gray-600 ml-10">
                <li>• 승합자동차 (모든 인원)</li>
                <li>• 화물자동차 (적재중량 무제한)</li>
                <li>• 건설기계 (덤프트럭, 콘크리트믹서)</li>
                <li>• 특수자동차 (구난차 등)</li>
                <li>• 1종 보통 운전 가능 차량 전부</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 면허 비교 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">1종 대형 vs 1종 보통 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 text-left text-gray-600">구분</th>
                  <th className="py-3 text-center text-zinc-600 font-bold">1종 대형</th>
                  <th className="py-3 text-center text-slate-600 font-bold">1종 보통</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">승합차</td>
                  <td className="py-3 text-center font-medium text-zinc-700">제한 없음</td>
                  <td className="py-3 text-center">15인승 이하</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">화물차</td>
                  <td className="py-3 text-center font-medium text-zinc-700">제한 없음</td>
                  <td className="py-3 text-center">12톤 미만</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">건설기계</td>
                  <td className="py-3 text-center font-medium text-zinc-700">덤프, 믹서트럭</td>
                  <td className="py-3 text-center">-</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">응시연령</td>
                  <td className="py-3 text-center">만 19세</td>
                  <td className="py-3 text-center">만 18세</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">취득 난이도</td>
                  <td className="py-3 text-center text-red-600 font-medium">어려움</td>
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
                href={`/category/driving/driver-license-1-large/study/${subject.path}`}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-zinc-500"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-zinc-500 to-stone-600 w-14 h-14 rounded-xl flex items-center justify-center text-2xl">
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{subject.name}</h3>
                    <p className="text-gray-500 text-sm">{subject.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-sm font-medium">
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
        <div className="bg-gradient-to-r from-zinc-600 to-stone-700 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-4">AI 학습 도우미</h2>
          <p className="text-zinc-300 mb-6">
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
            href="/category/driving/driver-license-1-large/exam"
            className="inline-flex items-center gap-2 bg-zinc-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-700 transition-colors"
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
