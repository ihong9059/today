"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function ConstructionMachineryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "엔진 구조",
      description: "가솔린/디젤/LPG 엔진",
      questions: [
        "4행정 사이클 엔진의 작동원리를 설명하시오.",
        "디젤엔진과 가솔린엔진의 차이를 설명하시오.",
        "LPG 엔진의 특성을 설명하시오.",
        "연료분사장치의 기능을 설명하시오.",
        "점화장치의 구성과 역할을 설명하시오.",
        "냉각장치의 구성요소를 설명하시오.",
        "윤활장치의 기능을 설명하시오.",
        "에어클리너의 종류와 관리를 설명하시오.",
        "머플러의 기능을 설명하시오.",
        "엔진과열 원인과 대책을 설명하시오.",
      ],
    },
    {
      title: "유압장치",
      description: "펌프, 밸브, 실린더",
      questions: [
        "유압시스템의 기본원리를 설명하시오.",
        "유압펌프의 종류를 설명하시오.",
        "기어펌프의 구조와 특성을 설명하시오.",
        "방향제어밸브의 기능을 설명하시오.",
        "유량제어밸브의 역할을 설명하시오.",
        "릴리프밸브(압력제어)를 설명하시오.",
        "유압실린더의 구조를 설명하시오.",
        "유압오일의 규격과 교환주기를 설명하시오.",
        "유압호스 점검방법을 설명하시오.",
        "유압장치 고장원인과 대책을 설명하시오.",
      ],
    },
    {
      title: "동력전달장치",
      description: "변속기, 차동장치, 차축",
      questions: [
        "토크컨버터의 구조와 기능을 설명하시오.",
        "변속기의 종류와 특성을 설명하시오.",
        "인칭 브레이크의 기능을 설명하시오.",
        "차동장치의 역할을 설명하시오.",
        "드라이브 액슬의 구조를 설명하시오.",
        "프로펠러 샤프트의 기능을 설명하시오.",
        "클러치의 종류와 작동원리를 설명하시오.",
        "기어오일 점검과 교환을 설명하시오.",
        "휠베어링 점검방법을 설명하시오.",
        "동력전달 효율 향상법을 설명하시오.",
      ],
    },
    {
      title: "마스트와 포크",
      description: "구조, 작동, 체인",
      questions: [
        "마스트의 구조와 종류를 설명하시오.",
        "2단 마스트와 3단 마스트 차이를 설명하시오.",
        "프리리프트(Free Lift)를 설명하시오.",
        "마스트 전경/후경 장치를 설명하시오.",
        "리프트 실린더의 작동원리를 설명하시오.",
        "틸트 실린더의 기능을 설명하시오.",
        "리프트 체인의 구조와 역할을 설명하시오.",
        "체인 장력조정 방법을 설명하시오.",
        "포크의 규격과 선택기준을 설명하시오.",
        "포크 마모한계를 설명하시오.",
      ],
    },
    {
      title: "전기장치 및 기타",
      description: "배터리, 조향, 제동장치",
      questions: [
        "지게차 전기회로 구성을 설명하시오.",
        "배터리 점검과 관리를 설명하시오.",
        "스타터모터 작동원리를 설명하시오.",
        "충전장치의 기능을 설명하시오.",
        "조향장치의 종류를 설명하시오.",
        "파워 스티어링 시스템을 설명하시오.",
        "제동장치의 종류를 설명하시오.",
        "브레이크 오일 점검을 설명하시오.",
        "타이어의 종류와 특성을 설명하시오.",
        "솔리드 타이어와 공기 타이어 비교를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `지게차운전기능사 건설기계일반 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 지게차의 기계적 특성과 실제 정비 현장에서의 적용 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-gray-600 to-slate-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/forklift-operator" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            지게차운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">건설기계일반</h1>
          <p className="text-xl text-gray-300">엔진, 유압장치, 동력전달, 마스트구조</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-gray-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-slate-600">30%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-orange-600">상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">건설기계일반 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <ul className="space-y-1">
              <li>• 토크컨버터 구조와 기능</li>
              <li>• 유압펌프 종류 (기어/피스톤)</li>
              <li>• 릴리프밸브 (압력제한)</li>
            </ul>
            <ul className="space-y-1">
              <li>• 마스트 전경/후경 원리</li>
              <li>• 리프트 체인 장력조정</li>
              <li>• 포크 마모한계 (10%)</li>
            </ul>
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
                          <span className="bg-gray-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-gray-500 to-slate-600 text-white px-3 py-1 rounded-lg text-sm hover:from-gray-600 hover:to-slate-700 transition-colors">AI 도움</button>
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
            <Link href="/category/mechanical/forklift-operator/study/forklift-operation" className="bg-yellow-50 hover:bg-yellow-100 rounded-lg p-3 text-center transition-colors"><span className="text-yellow-700 font-medium">지게차조종</span></Link>
            <Link href="/category/mechanical/forklift-operator/study/safety-management" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">안전관리</span></Link>
            <Link href="/category/mechanical/forklift-operator/study/practical" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">실기시험</span></Link>
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
