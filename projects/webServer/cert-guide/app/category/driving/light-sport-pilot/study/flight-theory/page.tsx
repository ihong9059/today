"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function FlightTheoryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "양력과 항력",
      description: "베르누이, 양력공식, 항력종류",
      questions: [
        "베르누이 정리를 설명하시오.",
        "양력 발생 원리를 설명하시오.",
        "양력 공식을 설명하시오.",
        "양력계수를 설명하시오.",
        "받음각을 설명하시오.",
        "실속을 설명하시오.",
        "항력의 종류를 설명하시오.",
        "유도항력을 설명하시오.",
        "유해항력을 설명하시오.",
        "양항비를 설명하시오.",
      ],
    },
    {
      title: "경량항공기 구조",
      description: "동체, 날개, 조종면",
      questions: [
        "경량항공기 구조 특성을 설명하시오.",
        "날개 구조를 설명하시오.",
        "에일러론 기능을 설명하시오.",
        "엘리베이터 기능을 설명하시오.",
        "러더 기능을 설명하시오.",
        "플랩 기능을 설명하시오.",
        "착륙장치를 설명하시오.",
        "조종계통을 설명하시오.",
        "동체 구조를 설명하시오.",
        "미익 구조를 설명하시오.",
      ],
    },
    {
      title: "비행 안정성",
      description: "정안정, 동안정, 무게중심",
      questions: [
        "정안정을 설명하시오.",
        "동안정을 설명하시오.",
        "세로안정을 설명하시오.",
        "가로안정을 설명하시오.",
        "방향안정을 설명하시오.",
        "상반각 효과를 설명하시오.",
        "무게중심을 설명하시오.",
        "무게중심 범위를 설명하시오.",
        "전방 CG 영향을 설명하시오.",
        "후방 CG 영향을 설명하시오.",
      ],
    },
    {
      title: "비행 성능",
      description: "이륙, 상승, 순항, 착륙",
      questions: [
        "이륙거리 영향요소를 설명하시오.",
        "이륙활주거리를 설명하시오.",
        "상승률을 설명하시오.",
        "상승한도를 설명하시오.",
        "순항속도를 설명하시오.",
        "최대항속거리를 설명하시오.",
        "착륙거리 영향요소를 설명하시오.",
        "선회비행을 설명하시오.",
        "하중배수를 설명하시오.",
        "밀도고도 영향을 설명하시오.",
      ],
    },
    {
      title: "엔진과 시스템",
      description: "왕복엔진, 프로펠러, 계기",
      questions: [
        "왕복엔진 원리를 설명하시오.",
        "4행정 사이클을 설명하시오.",
        "점화시스템을 설명하시오.",
        "연료시스템을 설명하시오.",
        "기화기 아이싱을 설명하시오.",
        "프로펠러 원리를 설명하시오.",
        "고정피치 프로펠러를 설명하시오.",
        "속도계를 설명하시오.",
        "고도계를 설명하시오.",
        "피토정압 시스템을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `경량항공기조종사 비행이론 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 경량항공기 특성에 맞는 적용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/light-sport-pilot" className="inline-flex items-center text-violet-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            경량항공기조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">비행이론</h1>
          <p className="text-xl text-violet-200">양력/항력, 구조, 안정성, 성능, 시스템</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-violet-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-indigo-600">30%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-purple-600">중상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-6 mb-8 border border-violet-200">
          <h3 className="font-bold text-violet-800 mb-3">비행이론 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-violet-700">
            <ul className="space-y-1">
              <li>• 양력 공식/계수</li>
              <li>• 실속 원인/회복</li>
              <li>• 조종면 역할</li>
            </ul>
            <ul className="space-y-1">
              <li>• 무게중심 영향</li>
              <li>• 기화기 아이싱</li>
              <li>• 밀도고도 영향</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-violet-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3">
                          <span className="bg-violet-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:from-violet-600 hover:to-indigo-700 transition-colors">AI 도움</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">다른 과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/category/driving/light-sport-pilot/study/aviation-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">항공법규</span></Link>
            <Link href="/category/driving/light-sport-pilot/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/light-sport-pilot/study/navigation" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">항법</span></Link>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
