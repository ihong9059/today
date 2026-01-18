"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function AviationLawStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "항공안전법 총칙",
      description: "목적, 정의, 적용범위",
      questions: [
        "항공안전법의 목적을 설명하시오.",
        "항공기의 정의를 설명하시오.",
        "경량항공기의 정의를 설명하시오.",
        "초경량비행장치의 정의를 설명하시오.",
        "항공종사자의 종류를 설명하시오.",
        "조종사 면허 종류를 설명하시오.",
        "자가용조종사의 업무범위를 설명하시오.",
        "항공신체검사 기준을 설명하시오.",
        "조종사 면허 결격사유를 설명하시오.",
        "면허 취소/정지 사유를 설명하시오.",
      ],
    },
    {
      title: "공역 및 비행장",
      description: "공역분류, 관제구역, 비행장",
      questions: [
        "공역의 정의와 분류를 설명하시오.",
        "관제공역의 종류를 설명하시오.",
        "비관제공역을 설명하시오.",
        "통제공역을 설명하시오.",
        "비행금지구역을 설명하시오.",
        "비행제한구역을 설명하시오.",
        "초경량비행장치 비행공역을 설명하시오.",
        "비행장의 정의를 설명하시오.",
        "이착륙장의 정의를 설명하시오.",
        "활주로 표지를 설명하시오.",
      ],
    },
    {
      title: "비행규칙",
      description: "시계비행, 계기비행, 관제절차",
      questions: [
        "시계비행규칙(VFR)을 설명하시오.",
        "계기비행규칙(IFR)을 설명하시오.",
        "VFR 기상조건을 설명하시오.",
        "특별시계비행을 설명하시오.",
        "비행계획서 제출 의무를 설명하시오.",
        "비행계획서 기재사항을 설명하시오.",
        "최저안전고도를 설명하시오.",
        "순항고도 규칙을 설명하시오.",
        "우선권 규칙을 설명하시오.",
        "충돌방지 의무를 설명하시오.",
      ],
    },
    {
      title: "항공교통관제",
      description: "관제업무, 통신, 허가",
      questions: [
        "항공교통관제업무 종류를 설명하시오.",
        "비행정보업무를 설명하시오.",
        "경보업무를 설명하시오.",
        "관제허가의 의미를 설명하시오.",
        "관제지시와 관제허가 차이를 설명하시오.",
        "이륙허가 절차를 설명하시오.",
        "착륙허가 절차를 설명하시오.",
        "항공무선통신 절차를 설명하시오.",
        "비상선언 절차를 설명하시오.",
        "통신두절 시 절차를 설명하시오.",
      ],
    },
    {
      title: "항공기 운항",
      description: "감항증명, 정비, 사고보고",
      questions: [
        "감항증명의 정의를 설명하시오.",
        "감항증명 종류를 설명하시오.",
        "항공기 등록의무를 설명하시오.",
        "항공기 등록부호를 설명하시오.",
        "항공일지 기재사항을 설명하시오.",
        "비행 전 점검사항을 설명하시오.",
        "정비 확인사항을 설명하시오.",
        "항공기 사고의 정의를 설명하시오.",
        "사고보고 의무를 설명하시오.",
        "준사고 보고를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `자가용조종사 항공법규 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 관련 법조문과 실제 적용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/pilot-license-private" className="inline-flex items-center text-indigo-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            자가용조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">항공법규</h1>
          <p className="text-xl text-indigo-200">항공안전법, 공역, 비행규칙, 관제</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-indigo-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-purple-600">25%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">중요도</p>
            <p className="text-3xl font-bold text-violet-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border border-indigo-200">
          <h3 className="font-bold text-indigo-800 mb-3">항공법규 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
            <ul className="space-y-1">
              <li>• 공역 분류 (A~G)</li>
              <li>• VFR/IFR 기상조건</li>
              <li>• 비행계획서 제출</li>
            </ul>
            <ul className="space-y-1">
              <li>• 최저안전고도</li>
              <li>• 관제허가/지시</li>
              <li>• 사고보고 의무</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-indigo-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-indigo-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:from-indigo-600 hover:to-purple-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/pilot-license-private/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/pilot-license-private/study/flight-theory" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">비행이론</span></Link>
            <Link href="/category/driving/pilot-license-private/study/navigation" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">항법</span></Link>
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
