"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "계기항법",
      description: "ILS, VOR/DME, GPS/RNAV",
      questions: [
        "ILS 구성요소를 설명하시오.",
        "LOC/GS 특성을 설명하시오.",
        "ILS 카테고리를 설명하시오.",
        "VOR/DME 항법을 설명하시오.",
        "DME 아크 비행을 설명하시오.",
        "GPS 원리를 설명하시오.",
        "RAIM을 설명하시오.",
        "RNAV 항법을 설명하시오.",
        "RNP 정밀도를 설명하시오.",
        "FMS 사용법을 설명하시오.",
      ],
    },
    {
      title: "계기비행절차",
      description: "SID, STAR, 접근절차",
      questions: [
        "SID의 종류를 설명하시오.",
        "RNAV SID를 설명하시오.",
        "STAR의 종류를 설명하시오.",
        "계기접근절차 구조를 설명하시오.",
        "정밀접근과 비정밀접근을 설명하시오.",
        "접근 세그먼트를 설명하시오.",
        "최저강하고도(MDA)를 설명하시오.",
        "결심고도(DA)를 설명하시오.",
        "실패접근 절차를 설명하시오.",
        "선회접근을 설명하시오.",
      ],
    },
    {
      title: "장거리 항법",
      description: "대권항법, 등각항법, 시간대",
      questions: [
        "대권항법을 설명하시오.",
        "대권거리 계산을 설명하시오.",
        "등각항법을 설명하시오.",
        "복합항법을 설명하시오.",
        "관성항법장치(INS)를 설명하시오.",
        "시간대 개념을 설명하시오.",
        "UTC 변환을 설명하시오.",
        "국제날짜변경선을 설명하시오.",
        "ETOPS 요건을 설명하시오.",
        "EDTO를 설명하시오.",
      ],
    },
    {
      title: "비행계획 수립",
      description: "연료계획, 교대비행장, NOTAM",
      questions: [
        "연료 종류와 계산을 설명하시오.",
        "Trip fuel을 설명하시오.",
        "Contingency fuel을 설명하시오.",
        "Alternate fuel을 설명하시오.",
        "Final reserve fuel을 설명하시오.",
        "교대비행장 선정기준을 설명하시오.",
        "MEL/CDL을 설명하시오.",
        "NOTAM 종류를 설명하시오.",
        "항공정보간행물(AIP)을 설명하시오.",
        "비행계획 제출을 설명하시오.",
      ],
    },
    {
      title: "항공교통관제",
      description: "통신, 분리, 비상절차",
      questions: [
        "ATC 통신절차를 설명하시오.",
        "관제지시 복창을 설명하시오.",
        "레이더 관제를 설명하시오.",
        "관제 분리기준을 설명하시오.",
        "TCAS 운용을 설명하시오.",
        "RA/TA 대응을 설명하시오.",
        "비상 스쿼크 코드를 설명하시오.",
        "통신두절 절차를 설명하시오.",
        "긴급선언 절차를 설명하시오.",
        "조난선언 절차를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `사업용조종사 항법 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 계기비행 실무와 운항 적용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/pilot-license-commercial" className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사업용조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">항법</h1>
          <p className="text-xl text-emerald-200">계기항법, IFR절차, 장거리항법, 관제</p>
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
              <li>• ILS/VOR/DME/GPS</li>
              <li>• SID/STAR/접근절차</li>
              <li>• 연료계획 수립</li>
            </ul>
            <ul className="space-y-1">
              <li>• RNAV/RNP/FMS</li>
              <li>• TCAS 운용</li>
              <li>• 비상절차</li>
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
            <Link href="/category/driving/pilot-license-commercial/study/aviation-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">항공법규</span></Link>
            <Link href="/category/driving/pilot-license-commercial/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/pilot-license-commercial/study/flight-theory" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">비행이론</span></Link>
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
