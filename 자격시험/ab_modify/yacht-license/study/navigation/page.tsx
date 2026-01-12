"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "해도 및 항해계기",
      description: "해도, 나침반, GPS, 측심기",
      questions: [
        "해도의 종류와 용도를 설명하시오.",
        "해도 축척과 정밀도를 설명하시오.",
        "해도 기호 읽는 방법을 설명하시오.",
        "수심 및 등심선을 설명하시오.",
        "자기나침반 원리를 설명하시오.",
        "나침반 편차와 자차를 설명하시오.",
        "GPS 항법장치 사용법을 설명하시오.",
        "GPS 좌표 표시방법을 설명하시오.",
        "측심기 사용법을 설명하시오.",
        "풍향풍속계 사용법을 설명하시오.",
      ],
    },
    {
      title: "항법 및 위치측정",
      description: "위치결정, 침로, 항적",
      questions: [
        "선위(선박 위치) 결정법을 설명하시오.",
        "교차방위법을 설명하시오.",
        "거리-방위법을 설명하시오.",
        "추측항법을 설명하시오.",
        "진침로와 나침반침로를 설명하시오.",
        "편차와 자차 수정법을 설명하시오.",
        "침로 계산방법을 설명하시오.",
        "조류 보정 침로를 설명하시오.",
        "항적 기록방법을 설명하시오.",
        "목적지까지 거리 계산을 설명하시오.",
      ],
    },
    {
      title: "조석 및 조류",
      description: "조석표, 조류, 조차",
      questions: [
        "조석의 원리를 설명하시오.",
        "대조와 소조를 설명하시오.",
        "조석표 읽는 방법을 설명하시오.",
        "조고와 조차를 설명하시오.",
        "조류의 발생원인을 설명하시오.",
        "조류표 읽는 방법을 설명하시오.",
        "조류가 요트 항해에 미치는 영향을 설명하시오.",
        "조류를 활용한 항해법을 설명하시오.",
        "조류 역류 시 대응법을 설명하시오.",
        "정조 시간 활용법을 설명하시오.",
      ],
    },
    {
      title: "세일링 이론",
      description: "바람, 세일각도, 포인트오브세일",
      questions: [
        "바람의 종류(진풍, 상대풍)를 설명하시오.",
        "풍상/풍하 항해를 설명하시오.",
        "포인트 오브 세일을 설명하시오.",
        "클로즈홀드(Close hauled)를 설명하시오.",
        "빔리치(Beam reach)를 설명하시오.",
        "브로드리치(Broad reach)를 설명하시오.",
        "러닝(Running)을 설명하시오.",
        "태킹(Tacking)을 설명하시오.",
        "자이빙(Gybing)을 설명하시오.",
        "역풍 지역(No-go zone)을 설명하시오.",
      ],
    },
    {
      title: "항로표지",
      description: "등대, 부표, 등질",
      questions: [
        "항로표지의 종류를 설명하시오.",
        "등대의 등질(특성)을 설명하시오.",
        "등대 광달거리를 설명하시오.",
        "측방표지(좌현, 우현)를 설명하시오.",
        "방위표지(NSEW)를 설명하시오.",
        "위험표지를 설명하시오.",
        "안전수역표지를 설명하시오.",
        "특수표지를 설명하시오.",
        "야간 등화 식별법을 설명하시오.",
        "부표 유지관리를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `요트조종면허 항해술 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 요트 항해에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/yacht-license" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            요트조종면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">항해술</h1>
          <p className="text-xl text-blue-200">해도, 항법, 조류, 세일링, 항로표지</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-blue-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-cyan-600">30%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-indigo-600">상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">항해술 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <ul className="space-y-1">
              <li>• 해도 판독 및 기호</li>
              <li>• 편차/자차 수정</li>
              <li>• 조석표/조류표 해석</li>
            </ul>
            <ul className="space-y-1">
              <li>• 포인트 오브 세일</li>
              <li>• 태킹/자이빙</li>
              <li>• 항로표지 식별</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-blue-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-blue-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-3 py-1 rounded-lg text-sm hover:from-blue-600 hover:to-cyan-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/yacht-license/study/maritime-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">법규</span></Link>
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
