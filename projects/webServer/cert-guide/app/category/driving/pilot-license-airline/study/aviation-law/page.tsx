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
      title: "국제항공법 심화",
      description: "ICAO 부속서, 국제협약, 표준",
      questions: [
        "ICAO 부속서 1(인원면허)을 설명하시오.",
        "ICAO 부속서 2(비행규칙)를 설명하시오.",
        "ICAO 부속서 6(운항)을 설명하시오.",
        "ICAO 부속서 8(감항성)을 설명하시오.",
        "시카고협약 체약국 의무를 설명하시오.",
        "SARPS의 법적 효력을 설명하시오.",
        "항공의 자유 5가지를 설명하시오.",
        "오픈스카이 협정을 설명하시오.",
        "바르샤바/몬트리올 협약을 설명하시오.",
        "도쿄/헤이그/몬트리올 협약을 설명하시오.",
      ],
    },
    {
      title: "항공운송사업법",
      description: "면허, 운항증명, 규정",
      questions: [
        "항공운송사업 면허요건을 설명하시오.",
        "국내/국제 항공운송사업을 설명하시오.",
        "소형항공운송사업을 설명하시오.",
        "운항증명(AOC) 요건을 설명하시오.",
        "운항규정 승인절차를 설명하시오.",
        "정비규정 승인절차를 설명하시오.",
        "ETOPS 운항승인을 설명하시오.",
        "RVSM 운항승인을 설명하시오.",
        "CAT II/III 운항승인을 설명하시오.",
        "위험물 운송규정을 설명하시오.",
      ],
    },
    {
      title: "운항승무원 규정",
      description: "자격, 훈련, 휴식, CRM",
      questions: [
        "기장의 법적 권한을 설명하시오.",
        "기장의 운항결정권을 설명하시오.",
        "승무원 구성요건을 설명하시오.",
        "비행근무시간 제한을 설명하시오.",
        "누적피로 관리를 설명하시오.",
        "FRMS(피로위험관리)를 설명하시오.",
        "정기훈련 요건을 설명하시오.",
        "LOFT/CRM 훈련을 설명하시오.",
        "노선자격 요건을 설명하시오.",
        "자격유지 심사를 설명하시오.",
      ],
    },
    {
      title: "안전관리체계",
      description: "SMS, SSP, 위험관리",
      questions: [
        "안전관리시스템(SMS) 4대 요소를 설명하시오.",
        "안전정책과 목표를 설명하시오.",
        "안전위험관리를 설명하시오.",
        "안전보증을 설명하시오.",
        "안전증진을 설명하시오.",
        "국가안전프로그램(SSP)을 설명하시오.",
        "위험도 평가 매트릭스를 설명하시오.",
        "안전성과지표(SPI)를 설명하시오.",
        "Just Culture를 설명하시오.",
        "안전조사와 처벌조사를 설명하시오.",
      ],
    },
    {
      title: "사고조사 및 보고",
      description: "ICAO Annex 13, 보고체계",
      questions: [
        "ICAO Annex 13 적용범위를 설명하시오.",
        "사고조사 목적을 설명하시오.",
        "조사권한 국가를 설명하시오.",
        "CVR/FDR 분석절차를 설명하시오.",
        "의무보고제도(MOR)를 설명하시오.",
        "자발적 보고제도(VRS)를 설명하시오.",
        "비처벌 보고제도를 설명하시오.",
        "ASRS 시스템을 설명하시오.",
        "안전권고의 법적 효력을 설명하시오.",
        "사고조사 보고서 공개를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `운송용조종사 항공법규 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. ICAO 규정과 국내법, 항공사 운항 실무를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/pilot-license-airline" className="inline-flex items-center text-indigo-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            운송용조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">항공법규</h1>
          <p className="text-xl text-indigo-200">국제항공법, 운송사업법, 안전관리체계</p>
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
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-violet-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border border-indigo-200">
          <h3 className="font-bold text-indigo-800 mb-3">항공법규 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
            <ul className="space-y-1">
              <li>• ICAO 부속서</li>
              <li>• 국제협약</li>
              <li>• SMS/SSP</li>
            </ul>
            <ul className="space-y-1">
              <li>• 운항증명(AOC)</li>
              <li>• ETOPS/RVSM</li>
              <li>• 사고조사</li>
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
            <Link href="/category/driving/pilot-license-airline/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/pilot-license-airline/study/flight-theory" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">비행이론</span></Link>
            <Link href="/category/driving/pilot-license-airline/study/navigation" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">항법</span></Link>
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
