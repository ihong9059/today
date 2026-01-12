"use client";

import { useState } from "react";
import Link from "next/link";

export default function AviationLawStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "항공안전법 심화",
      description: "사업용 운항규정, 안전관리",
      questions: [
        "항공운송사업의 정의와 종류를 설명하시오.",
        "항공기사용사업의 범위를 설명하시오.",
        "운항증명의 정의와 요건을 설명하시오.",
        "운항규정의 내용을 설명하시오.",
        "정비규정의 내용을 설명하시오.",
        "항공안전프로그램(SSP)을 설명하시오.",
        "안전관리시스템(SMS)을 설명하시오.",
        "운항승무원 자격요건을 설명하시오.",
        "기장의 권한과 의무를 설명하시오.",
        "부기장의 역할과 책임을 설명하시오.",
      ],
    },
    {
      title: "운항규정",
      description: "비행시간 제한, 휴식규정, 승무원",
      questions: [
        "비행근무시간 제한을 설명하시오.",
        "승무원 휴식시간 규정을 설명하시오.",
        "연속근무 제한을 설명하시오.",
        "피로위험관리시스템(FRMS)을 설명하시오.",
        "승무원 편성 기준을 설명하시오.",
        "교대근무 규정을 설명하시오.",
        "비행 전 브리핑 요건을 설명하시오.",
        "비행 후 디브리핑 절차를 설명하시오.",
        "승무원 훈련 요건을 설명하시오.",
        "정기심사 및 자격유지를 설명하시오.",
      ],
    },
    {
      title: "공역 및 항공로",
      description: "항공로, 절차, 관제분리",
      questions: [
        "항공로의 종류를 설명하시오.",
        "RNAV 항공로를 설명하시오.",
        "RNP 절차를 설명하시오.",
        "SID/STAR 절차를 설명하시오.",
        "접근절차 종류를 설명하시오.",
        "계기접근 최저치를 설명하시오.",
        "관제분리 기준을 설명하시오.",
        "레이더 분리를 설명하시오.",
        "수직분리축소(RVSM)를 설명하시오.",
        "특별사용공역을 설명하시오.",
      ],
    },
    {
      title: "국제항공법",
      description: "ICAO, 국제협약, 항공협정",
      questions: [
        "시카고협약의 내용을 설명하시오.",
        "ICAO의 역할을 설명하시오.",
        "ICAO 부속서를 설명하시오.",
        "항공의 자유를 설명하시오.",
        "양자간 항공협정을 설명하시오.",
        "영공주권을 설명하시오.",
        "국제민간항공기구를 설명하시오.",
        "IATA의 역할을 설명하시오.",
        "국제항공운송협약을 설명하시오.",
        "몬트리올협약을 설명하시오.",
      ],
    },
    {
      title: "항공보안 및 사고조사",
      description: "보안규정, 사고조사, 보고의무",
      questions: [
        "항공보안법의 목적을 설명하시오.",
        "보안검색 절차를 설명하시오.",
        "기내 보안절차를 설명하시오.",
        "위해물품 규정을 설명하시오.",
        "항공기 사고의 정의를 설명하시오.",
        "중대 준사고를 설명하시오.",
        "사고조사 절차를 설명하시오.",
        "의무보고 항목을 설명하시오.",
        "자발적 보고제도를 설명하시오.",
        "항공안전 의무보고를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `사업용조종사 항공법규 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 관련 법조문과 사업용 운항 실무 적용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/pilot-license-commercial" className="inline-flex items-center text-indigo-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사업용조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">항공법규</h1>
          <p className="text-xl text-indigo-200">항공안전법, 운항규정, 국제항공법</p>
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
            <p className="text-3xl font-bold text-violet-600">상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border border-indigo-200">
          <h3 className="font-bold text-indigo-800 mb-3">항공법규 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
            <ul className="space-y-1">
              <li>• 운항증명/운항규정</li>
              <li>• 비행근무시간 제한</li>
              <li>• RNAV/RNP 절차</li>
            </ul>
            <ul className="space-y-1">
              <li>• ICAO/시카고협약</li>
              <li>• 안전관리시스템(SMS)</li>
              <li>• 사고조사/의무보고</li>
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
            <Link href="/category/driving/pilot-license-commercial/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/pilot-license-commercial/study/flight-theory" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">비행이론</span></Link>
            <Link href="/category/driving/pilot-license-commercial/study/navigation" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">항법</span></Link>
          </div>
        </div>
      </div>

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
