"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function VehicleStructureStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "엔진 및 동력전달장치",
      description: "엔진 구조, 변속기, 클러치",
      questions: [
        "가솔린 엔진의 4행정 사이클을 설명하시오.",
        "디젤 엔진의 특징과 장단점을 설명하시오.",
        "엔진 냉각장치의 역할과 구성을 설명하시오.",
        "엔진 윤활장치의 역할을 설명하시오.",
        "클러치의 역할과 작동원리를 설명하시오.",
        "수동변속기의 작동원리를 설명하시오.",
        "자동변속기의 특징을 설명하시오.",
        "추진축과 차동장치의 역할을 설명하시오.",
        "하이브리드 자동차의 동력시스템을 설명하시오.",
        "전기자동차의 동력시스템을 설명하시오.",
      ],
    },
    {
      title: "제동장치",
      description: "브레이크 종류, ABS, 제동원리",
      questions: [
        "유압식 브레이크의 작동원리를 설명하시오.",
        "디스크 브레이크의 구조와 특징을 설명하시오.",
        "드럼 브레이크의 구조와 특징을 설명하시오.",
        "주차 브레이크의 역할과 사용법을 설명하시오.",
        "ABS(잠김방지 브레이크)의 원리와 효과를 설명하시오.",
        "ESC(전자식 차체자세제어)의 기능을 설명하시오.",
        "브레이크 페이드 현상과 원인을 설명하시오.",
        "베이퍼 록 현상과 예방법을 설명하시오.",
        "엔진 브레이크의 원리와 사용법을 설명하시오.",
        "회생제동 시스템의 원리를 설명하시오.",
      ],
    },
    {
      title: "조향 및 현가장치",
      description: "핸들 구조, 서스펜션, 타이어",
      questions: [
        "조향장치의 구성요소를 설명하시오.",
        "파워스티어링의 원리와 종류를 설명하시오.",
        "현가장치(서스펜션)의 역할을 설명하시오.",
        "독립식 현가장치의 특징을 설명하시오.",
        "쇼크업소버의 역할을 설명하시오.",
        "타이어의 구조와 규격 표시를 설명하시오.",
        "타이어 공기압 관리의 중요성을 설명하시오.",
        "타이어 마모 한계와 교체 시기를 설명하시오.",
        "휠 얼라인먼트의 의미를 설명하시오.",
        "스페어타이어 사용 시 주의사항을 설명하시오.",
      ],
    },
    {
      title: "전기장치 및 계기판",
      description: "배터리, 전기장치, 경고등",
      questions: [
        "자동차 배터리의 역할과 관리법을 설명하시오.",
        "시동장치의 구성과 작동원리를 설명하시오.",
        "충전장치(발전기)의 역할을 설명하시오.",
        "점화장치의 역할과 구성을 설명하시오.",
        "전조등의 종류와 사용법을 설명하시오.",
        "방향지시등과 비상경고등 사용법을 설명하시오.",
        "엔진 경고등의 의미와 대처법을 설명하시오.",
        "오일 경고등의 의미와 대처법을 설명하시오.",
        "브레이크 경고등의 의미와 대처법을 설명하시오.",
        "배터리 경고등의 의미와 대처법을 설명하시오.",
      ],
    },
    {
      title: "안전장치 및 점검",
      description: "에어백, 안전벨트, 일상점검",
      questions: [
        "안전벨트의 구조와 착용 효과를 설명하시오.",
        "에어백의 종류와 작동원리를 설명하시오.",
        "머리받침의 올바른 조절 방법을 설명하시오.",
        "운행 전 점검 항목을 설명하시오.",
        "엔진오일 점검 방법을 설명하시오.",
        "냉각수 점검 방법을 설명하시오.",
        "브레이크액 점검 방법을 설명하시오.",
        "윈드실드 와이퍼 점검과 교체를 설명하시오.",
        "등화장치 점검 방법을 설명하시오.",
        "차량 외관 점검 항목을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `1종 보통면허 자동차구조 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 구조와 원리, 실제 운전 시 적용 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-gray-700 to-zinc-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-normal" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 보통면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">자동차구조</h1>
          <p className="text-xl text-gray-300">필기시험 핵심 과목 | 엔진, 제동장치, 전기장치</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-gray-700">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-zinc-700">10%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-blue-600">하</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-gray-700 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-gray-600 to-zinc-700 text-white px-3 py-1 rounded-lg text-sm hover:from-gray-700 hover:to-zinc-800 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/driver-license-1-normal/study/traffic-law" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-3 text-center transition-colors"><span className="text-slate-700 font-medium">도로교통법규</span></Link>
            <Link href="/category/driving/driver-license-1-normal/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
            <Link href="/category/driving/driver-license-1-normal/study/practical" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">실기(장내/도로)</span></Link>
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
