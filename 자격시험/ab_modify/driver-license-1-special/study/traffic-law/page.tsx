"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrafficLawStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "특수차량 통행규정",
      description: "트레일러/레커 통행제한, 차로지정",
      questions: [
        "트레일러 통행금지 구역을 설명하시오.",
        "트레일러 고속도로 차로 지정을 설명하시오.",
        "레커 긴급출동 시 특례규정을 설명하시오.",
        "특수차량 야간 통행제한을 설명하시오.",
        "연결차량 터널 통행 규정을 설명하시오.",
        "트레일러 교량 통행 하중제한을 설명하시오.",
        "특수차량 주거지역 통행제한을 설명하시오.",
        "컨테이너 트레일러 통행규정을 설명하시오.",
        "특수차량 유턴/회전 금지구역을 설명하시오.",
        "연결차량 일반도로 통행규정을 설명하시오.",
      ],
    },
    {
      title: "견인 관련 규정",
      description: "견인방법, 피견인차 규정, 안전기준",
      questions: [
        "피견인차의 정의와 종류를 설명하시오.",
        "세미트레일러 연결 규정을 설명하시오.",
        "풀트레일러 연결 규정을 설명하시오.",
        "견인차와 피견인차 중량 비율을 설명하시오.",
        "피견인차 제동장치 장착 의무를 설명하시오.",
        "견인 시 안전삼각대 설치를 설명하시오.",
        "고장차량 견인 시 규정을 설명하시오.",
        "사고차량 견인 시 규정을 설명하시오.",
        "견인 속도 제한 규정을 설명하시오.",
        "불법 견인 처벌 규정을 설명하시오.",
      ],
    },
    {
      title: "속도제한 및 안전거리",
      description: "연결차량 제한속도, 안전거리 규정",
      questions: [
        "트레일러 고속도로 제한속도를 설명하시오.",
        "트레일러 일반도로 제한속도를 설명하시오.",
        "레커 견인 시 제한속도를 설명하시오.",
        "연결차량 안전거리 산정 기준을 설명하시오.",
        "특수차량 내리막길 속도제한을 설명하시오.",
        "악천후 시 연결차량 감속 운전을 설명하시오.",
        "연결차량 커브길 속도 제한을 설명하시오.",
        "적재물 운송 시 속도 제한을 설명하시오.",
        "특수차량 공사구간 통행속도를 설명하시오.",
        "피견인차 연결 시 최고속도를 설명하시오.",
      ],
    },
    {
      title: "적재 및 운송규정",
      description: "화물적재, 위험물 운송, 과적단속",
      questions: [
        "트레일러 적재중량 제한을 설명하시오.",
        "컨테이너 적재 규정을 설명하시오.",
        "특수화물(장대물) 운송 규정을 설명하시오.",
        "초과 적재 허가 절차를 설명하시오.",
        "위험물 트레일러 운송 규정을 설명하시오.",
        "연결차량 축중량 제한을 설명하시오.",
        "특수물 운송 표지 부착을 설명하시오.",
        "야간 특수물 운송 규정을 설명하시오.",
        "과적단속 기준과 처벌을 설명하시오.",
        "적재물 고정 의무를 설명하시오.",
      ],
    },
    {
      title: "레커 특별규정",
      description: "구난차 운행, 견인업 규정, 긴급출동",
      questions: [
        "레커(구난차) 정의와 종류를 설명하시오.",
        "레커 긴급자동차 지정 요건을 설명하시오.",
        "레커 경광등 사용 규정을 설명하시오.",
        "견인업 등록 요건을 설명하시오.",
        "레커 요금 기준을 설명하시오.",
        "불법 주정차 차량 견인 규정을 설명하시오.",
        "사고현장 레커 출동 규정을 설명하시오.",
        "고속도로 레커 출동 규정을 설명하시오.",
        "레커 운전자 자격 요건을 설명하시오.",
        "견인 중 사고 책임 규정을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `1종 특수면허 도로교통법규 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 특수차량(트레일러/레커) 관련 법규 조항, 실제 적용 사례, 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-gradient-to-r from-purple-700 to-violet-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-special" className="inline-flex items-center text-purple-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 특수면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">도로교통법규</h1>
          <p className="text-xl text-purple-200">특수차량 통행규정, 견인규정, 레커 특별규정</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-purple-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-violet-600">60%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-red-600">최상</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-purple-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-purple-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-violet-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/driver-license-1-special/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
            <Link href="/category/driving/driver-license-1-special/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
            <Link href="/category/driving/driver-license-1-special/study/practical" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">실기(장내/도로)</span></Link>
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
