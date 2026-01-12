"use client";

import { useState } from "react";
import Link from "next/link";

export default function MaritimeLawStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "해상충돌예방규칙",
      description: "항법, 피항, 유지, 등화",
      questions: [
        "해상충돌예방규칙 적용범위를 설명하시오.",
        "경계(망견) 의무를 설명하시오.",
        "안전한 속력을 설명하시오.",
        "충돌위험 판단방법을 설명하시오.",
        "충돌회피 동작을 설명하시오.",
        "마주치는 상태 항법을 설명하시오.",
        "횡단 상태 항법을 설명하시오.",
        "추월 상태 항법을 설명하시오.",
        "피항선의 의무를 설명하시오.",
        "유지선의 의무를 설명하시오.",
      ],
    },
    {
      title: "등화 및 형상물",
      description: "항해등, 정박등, 주간형상물",
      questions: [
        "마스트등의 규정을 설명하시오.",
        "현등(좌현등, 우현등)을 설명하시오.",
        "선미등을 설명하시오.",
        "범선 항해등을 설명하시오.",
        "동력선 항해등을 설명하시오.",
        "정박등(앵커등)을 설명하시오.",
        "예인선 항해등을 설명하시오.",
        "조종불능선 등화/형상물을 설명하시오.",
        "조종제한선 등화/형상물을 설명하시오.",
        "주간형상물 종류를 설명하시오.",
      ],
    },
    {
      title: "음향신호 및 등신호",
      description: "기적신호, 조우신호, 안개신호",
      questions: [
        "음향신호 장치를 설명하시오.",
        "조종신호(단음, 장음)를 설명하시오.",
        "경고신호를 설명하시오.",
        "협수로 음향신호를 설명하시오.",
        "시계제한 시 음향신호를 설명하시오.",
        "동력선 안개신호를 설명하시오.",
        "범선 안개신호를 설명하시오.",
        "정박선 안개신호를 설명하시오.",
        "예인선 안개신호를 설명하시오.",
        "조난신호를 설명하시오.",
      ],
    },
    {
      title: "수상레저안전법",
      description: "면허, 준수사항, 금지행위",
      questions: [
        "수상레저안전법 목적을 설명하시오.",
        "수상레저기구 정의를 설명하시오.",
        "조종면허 종류를 설명하시오.",
        "조종면허 취득요건을 설명하시오.",
        "면허 결격사유를 설명하시오.",
        "음주운항 금지기준을 설명하시오.",
        "안전장비 착용의무를 설명하시오.",
        "수상레저활동 금지구역을 설명하시오.",
        "보험가입 의무를 설명하시오.",
        "사고 시 조치의무를 설명하시오.",
      ],
    },
    {
      title: "해사안전법 및 선박법",
      description: "선박검사, 승무기준, 등록",
      questions: [
        "해사안전법 목적을 설명하시오.",
        "선박 항행구역을 설명하시오.",
        "선장의 직무와 책임을 설명하시오.",
        "승무기준을 설명하시오.",
        "선박검사 종류를 설명하시오.",
        "안전설비 기준을 설명하시오.",
        "선박등록 절차를 설명하시오.",
        "선박검사증서를 설명하시오.",
        "해양사고 보고의무를 설명하시오.",
        "해양환경보전법 준수사항을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `요트조종면허 법규 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 관련 법조문과 실제 적용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/yacht-license" className="inline-flex items-center text-indigo-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            요트조종면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">법규</h1>
          <p className="text-xl text-indigo-200">충돌예방규칙, 등화, 수상레저법, 해사법</p>
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
          <h3 className="font-bold text-indigo-800 mb-3">법규 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
            <ul className="space-y-1">
              <li>• 해상충돌예방규칙 항법</li>
              <li>• 피항선/유지선 의무</li>
              <li>• 등화 및 형상물</li>
            </ul>
            <ul className="space-y-1">
              <li>• 음향신호 (안개, 조종)</li>
              <li>• 수상레저안전법 준수</li>
              <li>• 음주운항 금지기준</li>
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
            <Link href="/category/driving/yacht-license/study/water-safety" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">수상안전</span></Link>
            <Link href="/category/driving/yacht-license/study/navigation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">항해술</span></Link>
            <Link href="/category/driving/yacht-license/study/yacht-operation" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">요트운용</span></Link>
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
