"use client";

import { useState } from "react";
import Link from "next/link";

export default function DriverLicense1SpecialPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleAIHelper = (topic: string) => {
    const prompt = `1종 특수면허 시험 준비 중입니다. "${topic}"에 대해 핵심 개념과 출제 포인트를 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const studySubjects = [
    { name: "도로교통법규", path: "traffic-law", icon: "📋", desc: "특수차량 통행규정, 견인규정", questions: 50 },
    { name: "안전운전", path: "safe-driving", icon: "🛡️", desc: "트레일러/레커 안전운전, 사고예방", questions: 50 },
    { name: "자동차구조", path: "vehicle-structure", icon: "🔧", desc: "견인장치, 연결장치, 특수구조", questions: 50 },
    { name: "실기(장내/도로)", path: "practical", icon: "🚚", desc: "트레일러 코스, 견인 도로주행", questions: 50 },
  ];

  const examTopics = [
    "트레일러 연결장치",
    "레커 견인 규정",
    "피견인차 제동장치",
    "특수차량 통행제한",
    "연결차량 후진",
    "특수차량 안전거리",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-violet-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/category/driving"
            className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            운전·조종 분야로 돌아가기
          </Link>
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl backdrop-blur">
              <span className="text-6xl">🚚</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-3">1종 특수면허</h1>
              <p className="text-xl text-purple-200">트레일러, 레커(구난차), 특수작업차량 운전</p>
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
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-purple-500">
            <p className="text-gray-500 text-sm mb-1">필기 문항수</p>
            <p className="text-3xl font-bold text-purple-600">40문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-violet-500">
            <p className="text-gray-500 text-sm mb-1">필기 합격</p>
            <p className="text-3xl font-bold text-violet-600">60점</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-fuchsia-500">
            <p className="text-gray-500 text-sm mb-1">시험시간</p>
            <p className="text-3xl font-bold text-fuchsia-600">50분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-amber-500">
            <p className="text-gray-500 text-sm mb-1">응시연령</p>
            <p className="text-3xl font-bold text-amber-600">만19세</p>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 mb-12 border border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">시험 개요</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                응시자격
              </h3>
              <ul className="space-y-2 text-gray-600 ml-10">
                <li>• 만 19세 이상</li>
                <li>• 1종 보통면허 보유자</li>
                <li>• 신체검사 합격자</li>
                <li>• 학과교육 이수자 (3시간)</li>
                <li>• 기능교육 이수자 (6시간)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                운전 가능 차량
              </h3>
              <ul className="space-y-2 text-gray-600 ml-10">
                <li>• 트레일러 (피견인차)</li>
                <li>• 레커 (구난차)</li>
                <li>• 소형 견인차</li>
                <li>• 특수작업용 자동차</li>
                <li>• 1종 보통 운전 가능 차량</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 특수면허 종류 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">1종 특수면허 종류</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚛</span> 트레일러
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 세미트레일러 (견인형)</li>
                <li>• 풀트레일러 (완전 피견인)</li>
                <li>• 컨테이너 운송차량</li>
                <li>• 특수물 운송 트레일러</li>
              </ul>
            </div>
            <div className="bg-violet-50 rounded-xl p-6 border border-violet-200">
              <h3 className="font-bold text-violet-700 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚗</span> 레커 (구난차)
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• 소형 레커 (견인형)</li>
                <li>• 중형/대형 레커</li>
                <li>• 플랫베드 레커</li>
                <li>• 고장/사고 차량 견인</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 면허 비교 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">1종 면허 비교</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 text-left text-gray-600">구분</th>
                  <th className="py-3 text-center text-purple-600 font-bold">1종 특수</th>
                  <th className="py-3 text-center text-zinc-600 font-bold">1종 대형</th>
                  <th className="py-3 text-center text-slate-600 font-bold">1종 보통</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">주요 대상</td>
                  <td className="py-3 text-center font-medium text-purple-700">트레일러/레커</td>
                  <td className="py-3 text-center">대형버스/화물</td>
                  <td className="py-3 text-center">중형 차량</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">특수 기술</td>
                  <td className="py-3 text-center font-medium text-purple-700">연결/견인</td>
                  <td className="py-3 text-center">대형차 조작</td>
                  <td className="py-3 text-center">일반 운전</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-600">응시연령</td>
                  <td className="py-3 text-center">만 19세</td>
                  <td className="py-3 text-center">만 19세</td>
                  <td className="py-3 text-center">만 18세</td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-600">취득 난이도</td>
                  <td className="py-3 text-center text-red-600 font-medium">최상</td>
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
                href={`/category/driving/driver-license-1-special/study/${subject.path}`}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-purple-500"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-600 w-14 h-14 rounded-xl flex items-center justify-center text-2xl">
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{subject.name}</h3>
                    <p className="text-gray-500 text-sm">{subject.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
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
        <div className="bg-gradient-to-r from-purple-600 to-violet-700 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-4">AI 학습 도우미</h2>
          <p className="text-purple-200 mb-6">
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
            href="/category/driving/driver-license-1-special/exam"
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-700 transition-colors"
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
