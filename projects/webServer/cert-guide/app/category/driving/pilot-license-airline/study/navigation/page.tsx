"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function NavigationStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "FMS/RNAV 심화",
      description: "FMC, 성능기반항법, RNP",
      questions: [
        "FMS 구성요소를 설명하시오.",
        "FMC 데이터베이스를 설명하시오.",
        "LNAV/VNAV 모드를 설명하시오.",
        "RNP APCH를 설명하시오.",
        "RNP AR 접근을 설명하시오.",
        "RF Leg를 설명하시오.",
        "PBN 개념을 설명하시오.",
        "항법정확도 모니터링을 설명하시오.",
        "GPS RAIM을 설명하시오.",
        "SBAS/GBAS를 설명하시오.",
      ],
    },
    {
      title: "대양횡단 항법",
      description: "NAT, PACOTS, 분리",
      questions: [
        "북대서양 항로체계(NAT)를 설명하시오.",
        "NAT Track Message를 설명하시오.",
        "태평양 항로체계(PACOTS)를 설명하시오.",
        "Random Routing을 설명하시오.",
        "대양 분리기준을 설명하시오.",
        "MNPS 요건을 설명하시오.",
        "대양 위치보고를 설명하시오.",
        "SELCAL 시스템을 설명하시오.",
        "HF 통신 절차를 설명하시오.",
        "CPDLC 운용을 설명하시오.",
      ],
    },
    {
      title: "특수항법",
      description: "극지방, ETOPS, 특수공역",
      questions: [
        "극지방 항법특성을 설명하시오.",
        "Grid Navigation을 설명하시오.",
        "True North/Grid North를 설명하시오.",
        "극지방 통신제약을 설명하시오.",
        "ETOPS 요건을 설명하시오.",
        "ETOPS 운항계획을 설명하시오.",
        "Equal Time Point를 설명하시오.",
        "Point of No Return을 설명하시오.",
        "RVSM 운항을 설명하시오.",
        "고고도 특수공역을 설명하시오.",
      ],
    },
    {
      title: "CAT II/III 운항",
      description: "정밀접근, 저시정 운항",
      questions: [
        "CAT II/III 기준을 설명하시오.",
        "DH/RVR 요건을 설명하시오.",
        "Autoland 시스템을 설명하시오.",
        "HUD 운용을 설명하시오.",
        "Alert Height를 설명하시오.",
        "저시정 이륙(LVTO)을 설명하시오.",
        "지상장비 요건을 설명하시오.",
        "항공기 장비 요건을 설명하시오.",
        "승무원 자격 요건을 설명하시오.",
        "저시정 절차를 설명하시오.",
      ],
    },
    {
      title: "운항통제",
      description: "디스패치, 비행계획, MEL",
      questions: [
        "운항통제 시스템을 설명하시오.",
        "디스패처 역할을 설명하시오.",
        "공동운항책임을 설명하시오.",
        "컴퓨터 비행계획을 설명하시오.",
        "최적고도 선정을 설명하시오.",
        "연료계획 수립을 설명하시오.",
        "MEL/CDL 적용을 설명하시오.",
        "ETOPS 디스패치를 설명하시오.",
        "기상 최저치를 설명하시오.",
        "운항 Release를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `운송용조종사 항법 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 대형기 국제선 운항과 항공사 실무를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/pilot-license-airline" className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            운송용조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">항법</h1>
          <p className="text-xl text-emerald-200">FMS/RNAV, 대양횡단, 특수항법, CAT II/III</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-emerald-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-teal-600">20%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-green-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8 border border-emerald-200">
          <h3 className="font-bold text-emerald-800 mb-3">항법 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700">
            <ul className="space-y-1">
              <li>• FMS/RNP AR</li>
              <li>• NAT/PACOTS</li>
              <li>• ETOPS 계획</li>
            </ul>
            <ul className="space-y-1">
              <li>• CAT II/III</li>
              <li>• 극지방 항법</li>
              <li>• 운항통제</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-emerald-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-emerald-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-lg text-sm hover:from-emerald-600 hover:to-teal-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/pilot-license-airline/study/aviation-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">항공법규</span></Link>
            <Link href="/category/driving/pilot-license-airline/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/pilot-license-airline/study/flight-theory" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">비행이론</span></Link>
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
