"use client";

import { useState } from "react";
import Link from "next/link";

export default function YachtOperationStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "요트 구조와 명칭",
      description: "선체, 돛, 삭구, 장비",
      questions: [
        "요트 선체 구조를 설명하시오.",
        "킬(Keel)의 종류와 역할을 설명하시오.",
        "러더(Rudder)의 구조를 설명하시오.",
        "마스트와 붐의 역할을 설명하시오.",
        "메인세일과 집(Jib)을 설명하시오.",
        "스피네이커(Spinnaker)를 설명하시오.",
        "시트(Sheet)와 할야드(Halyard)를 설명하시오.",
        "윈치(Winch) 사용법을 설명하시오.",
        "클리트(Cleat) 결박법을 설명하시오.",
        "요트 각 부분 명칭을 설명하시오.",
      ],
    },
    {
      title: "세일 조작",
      description: "전개, 조정, 수납, 리프",
      questions: [
        "메인세일 전개 절차를 설명하시오.",
        "집세일 전개 절차를 설명하시오.",
        "세일 트림(Trim) 조정을 설명하시오.",
        "풍향에 따른 세일 각도를 설명하시오.",
        "텔테일(Telltale) 활용법을 설명하시오.",
        "리프(Reef) 작업을 설명하시오.",
        "리프 해제 절차를 설명하시오.",
        "세일 수납 절차를 설명하시오.",
        "강풍 시 세일 관리를 설명하시오.",
        "세일 손상 응급처치를 설명하시오.",
      ],
    },
    {
      title: "계류 및 닻 작업",
      description: "접안, 이안, 투묘, 양묘",
      questions: [
        "계류로프 종류와 명칭을 설명하시오.",
        "계류 매듭법을 설명하시오.",
        "접안 절차를 설명하시오.",
        "이안 절차를 설명하시오.",
        "횡풍 접안을 설명하시오.",
        "조류 접안을 설명하시오.",
        "닻의 종류와 특성을 설명하시오.",
        "투묘 절차를 설명하시오.",
        "양묘 절차를 설명하시오.",
        "묘박 중 주의사항을 설명하시오.",
      ],
    },
    {
      title: "엔진 및 추진장치",
      description: "선외기, 선내기, 정비",
      questions: [
        "요트용 엔진 종류를 설명하시오.",
        "선외기 구조와 특성을 설명하시오.",
        "선내기 구조와 특성을 설명하시오.",
        "엔진 시동 전 점검사항을 설명하시오.",
        "연료 시스템 관리를 설명하시오.",
        "냉각수 시스템을 설명하시오.",
        "프로펠러 점검을 설명하시오.",
        "엔진 고장 시 응급조치를 설명하시오.",
        "엔진 동계 보관법을 설명하시오.",
        "엔진 일상 정비를 설명하시오.",
      ],
    },
    {
      title: "요트 관리 및 점검",
      description: "출항점검, 세척, 보관",
      questions: [
        "출항 전 점검사항을 설명하시오.",
        "귀항 후 점검사항을 설명하시오.",
        "선체 세척방법을 설명하시오.",
        "선저 관리(방오도료)를 설명하시오.",
        "삭구류 점검을 설명하시오.",
        "전기시스템 점검을 설명하시오.",
        "안전장비 점검을 설명하시오.",
        "동계 보관 절차를 설명하시오.",
        "춘계 재정비를 설명하시오.",
        "요트 보험 및 등록을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `요트조종면허 요트운용 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 요트 운항에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/yacht-license" className="inline-flex items-center text-sky-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            요트조종면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">요트운용</h1>
          <p className="text-xl text-sky-200">요트구조, 세일조작, 계류, 엔진, 관리</p>
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
            <p className="text-3xl font-bold text-blue-600">20%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-cyan-600">중</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 mb-8 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">요트운용 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-sky-700">
            <ul className="space-y-1">
              <li>• 요트 각 부분 명칭</li>
              <li>• 세일 전개/수납 절차</li>
              <li>• 세일 트림 조정</li>
            </ul>
            <ul className="space-y-1">
              <li>• 계류/이안 절차</li>
              <li>• 엔진 점검 및 정비</li>
              <li>• 출항 전 점검사항</li>
            </ul>
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
            <Link href="/category/driving/yacht-license/study/water-safety" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">수상안전</span></Link>
            <Link href="/category/driving/yacht-license/study/navigation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">항해술</span></Link>
            <Link href="/category/driving/yacht-license/study/maritime-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">법규</span></Link>
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
