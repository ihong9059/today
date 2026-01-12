"use client";

import { useState } from "react";
import Link from "next/link";

export default function SafeDrivingStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "대형차 방어운전",
      description: "대형차 특성, 사각지대, 위험예측",
      questions: [
        "대형차량의 사각지대 범위를 설명하시오.",
        "대형차 우회전 시 내륜차 현상을 설명하시오.",
        "대형차량 후진 시 주의사항을 설명하시오.",
        "대형차 제동거리 특성을 설명하시오.",
        "대형차 좌회전 시 궤적 차이를 설명하시오.",
        "대형차 차로변경 시 주의사항을 설명하시오.",
        "대형차 추월 시 안전거리를 설명하시오.",
        "대형버스 승객 안전 확보를 설명하시오.",
        "대형화물차 화물 이탈 방지를 설명하시오.",
        "대형차 교차로 통행 방어운전을 설명하시오.",
      ],
    },
    {
      title: "대형차 사고예방",
      description: "전복사고, 추돌사고, 화재예방",
      questions: [
        "대형차 전복사고 원인과 예방을 설명하시오.",
        "대형차 급커브 전복 방지를 설명하시오.",
        "대형트럭 잭나이프 현상을 설명하시오.",
        "대형차 추돌사고 예방법을 설명하시오.",
        "대형버스 승객 부상 예방을 설명하시오.",
        "대형차 화재 원인과 예방을 설명하시오.",
        "타이어 파열 시 대처법을 설명하시오.",
        "대형차 제동장치 과열 방지를 설명하시오.",
        "대형차 터널 사고 예방을 설명하시오.",
        "대형차 고속도로 사고 예방을 설명하시오.",
      ],
    },
    {
      title: "악천후 대형차 운전",
      description: "비, 눈, 안개, 강풍 시 운전",
      questions: [
        "대형차 빗길 운전 주의사항을 설명하시오.",
        "대형차 수막현상 대처법을 설명하시오.",
        "대형차 눈길 운전 요령을 설명하시오.",
        "대형차 빙판길 제동 방법을 설명하시오.",
        "대형차 안개 운전 주의사항을 설명하시오.",
        "대형차 강풍 시 운전 요령을 설명하시오.",
        "대형차 측풍 대처법을 설명하시오.",
        "대형차 폭우 시 운전 요령을 설명하시오.",
        "대형차 결빙구간 통과법을 설명하시오.",
        "대형차 야간 악천후 운전을 설명하시오.",
      ],
    },
    {
      title: "응급상황 대처",
      description: "사고대응, 응급조치, 비상탈출",
      questions: [
        "대형차 사고 시 초동조치를 설명하시오.",
        "대형버스 비상탈출 유도방법을 설명하시오.",
        "대형차 화재 시 대처법을 설명하시오.",
        "대형차 전복 시 대처법을 설명하시오.",
        "대형차 제동불량 시 대처법을 설명하시오.",
        "대형차 2차 사고 예방을 설명하시오.",
        "위험물 차량 사고 시 대처를 설명하시오.",
        "대형버스 승객 응급처치를 설명하시오.",
        "고속도로 대형차 고장 시 대처를 설명하시오.",
        "대형차 침수 시 탈출 방법을 설명하시오.",
      ],
    },
    {
      title: "운전자 건강관리",
      description: "피로운전 예방, 건강관리, 휴식",
      questions: [
        "대형차 운전자 피로 증상을 설명하시오.",
        "장거리 운전 피로예방법을 설명하시오.",
        "졸음운전 예방 방법을 설명하시오.",
        "졸음쉼터 이용 방법을 설명하시오.",
        "운전자 건강검진 의무를 설명하시오.",
        "야간운전 건강 관리법을 설명하시오.",
        "운전 중 스트레칭 방법을 설명하시오.",
        "음주 후 운전 금지 시간을 설명하시오.",
        "약물 복용 후 운전 주의사항을 설명하시오.",
        "운전자 정기 휴식 규정을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `1종 대형면허 안전운전 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 대형차량 특성을 고려한 실제 운전 상황에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-large" className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 대형면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">안전운전</h1>
          <p className="text-xl text-emerald-200">대형차 방어운전, 사고예방, 응급상황 대처</p>
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
            <p className="text-3xl font-bold text-teal-600">30%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-orange-600">상</p>
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
            <Link href="/category/driving/driver-license-1-large/study/traffic-law" className="bg-zinc-50 hover:bg-zinc-100 rounded-lg p-3 text-center transition-colors"><span className="text-zinc-700 font-medium">도로교통법규</span></Link>
            <Link href="/category/driving/driver-license-1-large/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
            <Link href="/category/driving/driver-license-1-large/study/practical" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">실기(장내/도로)</span></Link>
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
