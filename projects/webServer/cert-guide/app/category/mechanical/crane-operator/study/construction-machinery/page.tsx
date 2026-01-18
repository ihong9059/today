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
      title: "엔진 및 동력장치",
      description: "디젤엔진, 동력전달, PTO",
      questions: [
        "디젤엔진의 4행정 사이클을 설명하시오.",
        "기중기 엔진 출력 특성을 설명하시오.",
        "연료분사장치의 기능을 설명하시오.",
        "터보차저의 구조와 역할을 설명하시오.",
        "PTO(동력인출장치)의 기능을 설명하시오.",
        "토크컨버터의 작동원리를 설명하시오.",
        "변속기의 종류와 특성을 설명하시오.",
        "엔진 냉각장치 구성을 설명하시오.",
        "엔진 윤활장치 역할을 설명하시오.",
        "엔진과열 원인과 대책을 설명하시오.",
      ],
    },
    {
      title: "유압장치",
      description: "유압펌프, 밸브, 실린더, 모터",
      questions: [
        "유압시스템의 기본원리를 설명하시오.",
        "기중기 유압펌프 종류를 설명하시오.",
        "가변용량 피스톤펌프를 설명하시오.",
        "방향제어밸브의 기능을 설명하시오.",
        "유량제어밸브의 역할을 설명하시오.",
        "릴리프밸브(압력제어)를 설명하시오.",
        "카운터밸런스밸브 기능을 설명하시오.",
        "유압실린더의 구조를 설명하시오.",
        "유압모터의 종류와 용도를 설명하시오.",
        "유압오일 규격과 교환주기를 설명하시오.",
      ],
    },
    {
      title: "와이어로프 및 권상장치",
      description: "로프구조, 드럼, 시브",
      questions: [
        "와이어로프의 구조를 설명하시오.",
        "와이어로프 꼬임 방향(Z, S)을 설명하시오.",
        "와이어로프 지름 측정방법을 설명하시오.",
        "와이어로프 폐기기준을 설명하시오.",
        "와이어로프 안전계수를 설명하시오.",
        "권상 드럼의 구조를 설명하시오.",
        "드럼 로프감김 방식을 설명하시오.",
        "시브(도르래)의 종류와 기능을 설명하시오.",
        "훅 블록의 구조를 설명하시오.",
        "권과방지장치를 설명하시오.",
      ],
    },
    {
      title: "붐 및 선회장치",
      description: "붐 구조, 선회베어링, 감속기",
      questions: [
        "기중기 붐의 종류를 설명하시오.",
        "텔레스코픽 붐의 구조를 설명하시오.",
        "붐 기복(러핑) 장치를 설명하시오.",
        "붐 기복 실린더 구조를 설명하시오.",
        "선회베어링의 구조와 기능을 설명하시오.",
        "선회 감속기의 역할을 설명하시오.",
        "선회 브레이크 장치를 설명하시오.",
        "선회 락 장치를 설명하시오.",
        "붐 받침대(크래들)를 설명하시오.",
        "붐 점검 및 정비를 설명하시오.",
      ],
    },
    {
      title: "안전장치 및 전기장치",
      description: "OLP, 리미트스위치, 전기계통",
      questions: [
        "과부하방지장치(OLP)를 설명하시오.",
        "모멘트리미터 작동원리를 설명하시오.",
        "권과방지장치 기능을 설명하시오.",
        "붐 기복 리미트스위치를 설명하시오.",
        "선회 제한장치를 설명하시오.",
        "아웃트리거 인터록을 설명하시오.",
        "경보장치의 종류와 기능을 설명하시오.",
        "기중기 전기회로 구성을 설명하시오.",
        "배터리 관리 및 점검을 설명하시오.",
        "조명장치 설치기준을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `기중기운전기능사 건설기계일반 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 기중기의 기계적 특성과 실제 정비 현장에서의 적용 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-gray-600 to-slate-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/crane-operator" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            기중기운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">건설기계일반</h1>
          <p className="text-xl text-gray-300">엔진, 유압장치, 와이어로프, 안전장치</p>
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
              <li>• 와이어로프 폐기기준</li>
              <li>• 유압펌프 종류 (가변용량)</li>
              <li>• 카운터밸런스밸브 기능</li>
            </ul>
            <ul className="space-y-1">
              <li>• 과부하방지장치(OLP)</li>
              <li>• 권과방지장치</li>
              <li>• 텔레스코픽 붐 구조</li>
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
            <Link href="/category/mechanical/crane-operator/study/crane-operation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">기중기조종</span></Link>
            <Link href="/category/mechanical/crane-operator/study/safety-management" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">안전관리</span></Link>
            <Link href="/category/mechanical/crane-operator/study/practical" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">실기시험</span></Link>
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
