"use client";

import { useState } from "react";
import Link from "next/link";

export default function CraneOperatorPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const handleAIHelper = (topic: string) => {
    const prompt = `기중기운전기능사 시험 준비 중입니다. "${topic}"에 대해 핵심 개념과 출제 포인트를 설명해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const studySubjects = [
    { name: "기중기조종", path: "crane-operation", icon: "🏗️", desc: "조종장치, 권상/선회, 인양작업", questions: 50 },
    { name: "건설기계일반", path: "construction-machinery", icon: "⚙️", desc: "엔진, 유압장치, 와이어로프", questions: 50 },
    { name: "안전관리", path: "safety-management", icon: "🛡️", desc: "안전수칙, 사고예방, 신호수", questions: 50 },
    { name: "실기시험", path: "practical", icon: "🎯", desc: "인양, 이동, 정위치 작업", questions: 50 },
  ];

  const examTopics = [
    "아웃트리거 설치",
    "와이어로프 점검",
    "권상/권하 조작",
    "선회 브레이크",
    "정격하중표 확인",
    "신호수 수신호",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/category/mechanical"
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            기계·전기 분야로 돌아가기
          </Link>
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-6 rounded-2xl backdrop-blur">
              <span className="text-6xl">🏗️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-3">기중기운전기능사</h1>
              <p className="text-xl text-blue-200">건설현장 필수, 크레인 조종 전문가</p>
              <div className="flex gap-4 mt-4">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">필기 60문항</span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">실기 작업형</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-500">
            <p className="text-gray-500 text-sm mb-1">필기 문항수</p>
            <p className="text-3xl font-bold text-blue-600">60문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-indigo-500">
            <p className="text-gray-500 text-sm mb-1">필기 합격</p>
            <p className="text-3xl font-bold text-indigo-600">60점</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-violet-500">
            <p className="text-gray-500 text-sm mb-1">실기시간</p>
            <p className="text-3xl font-bold text-violet-600">7분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-green-500">
            <p className="text-gray-500 text-sm mb-1">응시자격</p>
            <p className="text-3xl font-bold text-green-600">제한없음</p>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">시험 개요</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                시험 구성
              </h3>
              <ul className="space-y-2 text-gray-600 ml-10">
                <li>• 필기시험: CBT 60문항</li>
                <li>• 실기시험: 작업형 (7분)</li>
                <li>• 시험 상시 시행 (CBT)</li>
                <li>• 응시 연령제한 없음</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                취득 후 활용
              </h3>
              <ul className="space-y-2 text-gray-600 ml-10">
                <li>• 건설현장 크레인 조종</li>
                <li>• 제조업체, 조선소</li>
                <li>• 항만, 물류센터</li>
                <li>• 철골구조물 설치</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 기중기 종류 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">기중기 종류</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
              <h3 className="font-bold text-blue-700 mb-2">이동식 크레인</h3>
              <p className="text-sm text-gray-600">트럭탑재형, 크롤러형</p>
            </div>
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200">
              <h3 className="font-bold text-indigo-700 mb-2">타워크레인</h3>
              <p className="text-sm text-gray-600">고층건물 건설현장</p>
            </div>
            <div className="bg-violet-50 rounded-xl p-5 border border-violet-200">
              <h3 className="font-bold text-violet-700 mb-2">정치식 크레인</h3>
              <p className="text-sm text-gray-600">공장, 항만, 조선소</p>
            </div>
          </div>
        </div>

        {/* Study Subjects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">과목별 학습</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {studySubjects.map((subject, index) => (
              <Link
                key={index}
                href={`/category/mechanical/crane-operator/study/${subject.path}`}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-l-4 border-blue-500"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-14 h-14 rounded-xl flex items-center justify-center text-2xl">
                    {subject.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{subject.name}</h3>
                    <p className="text-gray-500 text-sm">{subject.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-4">AI 학습 도우미</h2>
          <p className="text-blue-200 mb-6">
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
            href="/category/mechanical/crane-operator/exam"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
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
