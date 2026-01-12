"use client";

import { useState } from "react";
import Link from "next/link";

export default function SeamanshipStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "선박 조종술",
      description: "타효, 조종성능, 선회권",
      questions: [
        "타(키)의 구조와 역할을 설명하시오.",
        "타효(키 효과)를 설명하시오.",
        "전진 시 타효를 설명하시오.",
        "후진 시 타효를 설명하시오.",
        "프로펠러 사이드포스를 설명하시오.",
        "선회권(선회반경)을 설명하시오.",
        "킥(Kick)과 피벗포인트를 설명하시오.",
        "조종성능에 영향을 주는 요소를 설명하시오.",
        "횡풍 시 조선법을 설명하시오.",
        "조류 시 조선법을 설명하시오.",
      ],
    },
    {
      title: "계류 및 이안",
      description: "접안, 계류, 이안, 로프",
      questions: [
        "계류로프의 종류와 역할을 설명하시오.",
        "선수줄(Head Line)을 설명하시오.",
        "선미줄(Stern Line)을 설명하시오.",
        "스프링줄(Spring Line)을 설명하시오.",
        "접안 시 순서를 설명하시오.",
        "횡풍 시 접안방법을 설명하시오.",
        "조류 시 접안방법을 설명하시오.",
        "이안 시 순서를 설명하시오.",
        "계선주 사용방법을 설명하시오.",
        "펜더 사용방법을 설명하시오.",
      ],
    },
    {
      title: "닻 작업",
      description: "투묘, 양묘, 주묘, 묘박",
      questions: [
        "닻의 종류와 특성을 설명하시오.",
        "앵커체인 구조를 설명하시오.",
        "투묘 절차를 설명하시오.",
        "적정 투묘량을 설명하시오.",
        "묘박 시 주의사항을 설명하시오.",
        "주묘(닻끌림) 원인과 대책을 설명하시오.",
        "양묘 절차를 설명하시오.",
        "쌍묘박(쌍닻 투하)을 설명하시오.",
        "긴급 투묘를 설명하시오.",
        "닻 관리 및 점검을 설명하시오.",
      ],
    },
    {
      title: "예인 및 피예인",
      description: "예인작업, 예인삭, 긴급예인",
      questions: [
        "예인작업의 정의와 종류를 설명하시오.",
        "예인삭의 종류와 특성을 설명하시오.",
        "예인삭 연결방법을 설명하시오.",
        "예인 시 안전조치를 설명하시오.",
        "예인 속도 결정요소를 설명하시오.",
        "피예인선의 조종을 설명하시오.",
        "곡선항행 시 예인법을 설명하시오.",
        "협수로 예인 시 주의사항을 설명하시오.",
        "긴급예인 절차를 설명하시오.",
        "예인 중 비상상황 대처를 설명하시오.",
      ],
    },
    {
      title: "해상통신 및 신호",
      description: "VHF, 신호, 조난통신",
      questions: [
        "VHF 무선전화 사용법을 설명하시오.",
        "VHF 채널 16의 용도를 설명하시오.",
        "호출 및 응답 절차를 설명하시오.",
        "음성신호(기적신호)를 설명하시오.",
        "단음, 장음의 의미를 설명하시오.",
        "조우 시 기적신호를 설명하시오.",
        "주간 조난신호를 설명하시오.",
        "야간 조난신호를 설명하시오.",
        "MAYDAY 조난호출을 설명하시오.",
        "국제신호기의 종류를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `소형선박조종사 운용 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 선박 운항에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/boat-license" className="inline-flex items-center text-teal-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            소형선박조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">운용</h1>
          <p className="text-xl text-teal-200">조선, 계류, 닻작업, 예인, 통신</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-teal-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-emerald-600">30%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-green-600">중상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-6 mb-8 border border-teal-200">
          <h3 className="font-bold text-teal-800 mb-3">운용 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-teal-700">
            <ul className="space-y-1">
              <li>• 타효와 프로펠러 사이드포스</li>
              <li>• 계류로프 종류와 역할</li>
              <li>• 접안/이안 순서와 방법</li>
            </ul>
            <ul className="space-y-1">
              <li>• 투묘/양묘 절차</li>
              <li>• VHF 통신 절차</li>
              <li>• 조난신호 및 MAYDAY</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-teal-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-teal-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:from-teal-600 hover:to-emerald-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/boat-license/study/navigation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">항해</span></Link>
            <Link href="/category/driving/boat-license/study/maritime-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">법규</span></Link>
            <Link href="/category/driving/boat-license/study/engine" className="bg-orange-50 hover:bg-orange-100 rounded-lg p-3 text-center transition-colors"><span className="text-orange-700 font-medium">기관</span></Link>
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
