"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrafficLawStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "교통신호 및 안전표지",
      description: "신호등, 수신호, 안전표지 종류와 의미",
      questions: [
        "신호등의 녹색등화 의미와 통행방법을 설명하시오.",
        "신호등의 황색등화 의미와 운전자 행동을 설명하시오.",
        "신호등의 적색등화 의미와 예외사항을 설명하시오.",
        "녹색 화살표 신호의 의미를 설명하시오.",
        "황색 점멸신호의 의미와 통행방법을 설명하시오.",
        "적색 점멸신호의 의미와 통행방법을 설명하시오.",
        "경찰관 수신호의 종류와 의미를 설명하시오.",
        "주의표지(황색)의 종류와 의미를 설명하시오.",
        "규제표지(적색)의 종류와 의미를 설명하시오.",
        "지시표지(청색)의 종류와 의미를 설명하시오.",
      ],
    },
    {
      title: "노면표시 및 차로",
      description: "중앙선, 차선, 노면표시의 종류",
      questions: [
        "황색 실선 중앙선의 의미를 설명하시오.",
        "황색 점선 중앙선의 의미를 설명하시오.",
        "백색 실선과 점선의 차이를 설명하시오.",
        "정지선의 위치와 정지방법을 설명하시오.",
        "횡단보도 표시의 의미와 통행방법을 설명하시오.",
        "안전지대 표시의 의미를 설명하시오.",
        "유도선의 의미와 기능을 설명하시오.",
        "버스전용차로 표시와 통행규정을 설명하시오.",
        "고속도로 차로별 통행기준을 설명하시오.",
        "일반도로 차로별 통행기준을 설명하시오.",
      ],
    },
    {
      title: "통행방법 및 우선순위",
      description: "교차로, 앞지르기, 양보 규정",
      questions: [
        "교차로 통행 우선순위를 설명하시오.",
        "신호등 없는 교차로 통행방법을 설명하시오.",
        "회전교차로 통행방법을 설명하시오.",
        "앞지르기 방법과 절차를 설명하시오.",
        "앞지르기 금지 장소를 설명하시오.",
        "앞지르기 금지 상황을 설명하시오.",
        "긴급자동차 양보 의무를 설명하시오.",
        "어린이통학버스 양보 의무를 설명하시오.",
        "좁은 도로 양보 규정을 설명하시오.",
        "비탈길 양보 규정을 설명하시오.",
      ],
    },
    {
      title: "속도제한 및 안전거리",
      description: "제한속도, 서행, 안전거리 규정",
      questions: [
        "일반도로 제한속도 규정을 설명하시오.",
        "고속도로 제한속도 규정을 설명하시오.",
        "어린이보호구역 제한속도를 설명하시오.",
        "서행해야 하는 장소를 설명하시오.",
        "일시정지해야 하는 장소를 설명하시오.",
        "안전거리 확보 기준을 설명하시오.",
        "고속도로 안전거리 규정을 설명하시오.",
        "악천후 시 감속 운전 규정을 설명하시오.",
        "야간 운전 시 속도 제한을 설명하시오.",
        "공사구간 통행 시 속도 제한을 설명하시오.",
      ],
    },
    {
      title: "주정차 및 위반처벌",
      description: "주정차 금지, 위반 시 처벌기준",
      questions: [
        "주차금지 장소를 설명하시오.",
        "정차금지 장소를 설명하시오.",
        "소화전 주변 주정차 금지 규정을 설명하시오.",
        "횡단보도 주정차 금지 규정을 설명하시오.",
        "버스정류장 주정차 금지 규정을 설명하시오.",
        "음주운전 처벌기준을 설명하시오.",
        "무면허운전 처벌기준을 설명하시오.",
        "신호위반 처벌기준을 설명하시오.",
        "속도위반 처벌기준을 설명하시오.",
        "벌점 및 면허정지/취소 기준을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `2종 보통면허 도로교통법규 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 관련 법규 조항, 실제 적용 사례, 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-2-normal" className="inline-flex items-center text-sky-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            2종 보통면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">도로교통법규</h1>
          <p className="text-xl text-sky-200">필기시험 핵심 과목 | 교통신호, 안전표지, 통행규정</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-sky-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-blue-600">60%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-green-600">중</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-sky-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-sky-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:from-sky-600 hover:to-blue-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/driver-license-2-normal/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
            <Link href="/category/driving/driver-license-2-normal/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
            <Link href="/category/driving/driver-license-2-normal/study/practical" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">실기(장내/도로)</span></Link>
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
