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
      title: "트레일러 연결장치",
      description: "커플링, 킹핀, 연결부 구조",
      questions: [
        "제5륜 연결장치(Fifth Wheel)를 설명하시오.",
        "킹핀(King Pin)의 구조와 역할을 설명하시오.",
        "커플러(Coupler)의 종류를 설명하시오.",
        "히치(Hitch) 종류와 특징을 설명하시오.",
        "세미트레일러 연결 구조를 설명하시오.",
        "풀트레일러 연결 구조를 설명하시오.",
        "연결장치 안전핀 기능을 설명하시오.",
        "슬라이딩 제5륜의 기능을 설명하시오.",
        "연결장치 윤활 관리를 설명하시오.",
        "연결장치 점검 항목을 설명하시오.",
      ],
    },
    {
      title: "피견인차 제동장치",
      description: "에어브레이크, ABS, 비상제동",
      questions: [
        "트레일러 에어브레이크 시스템을 설명하시오.",
        "서비스 브레이크와 비상 브레이크를 설명하시오.",
        "글래디핸드(Gladhand) 연결을 설명하시오.",
        "공기압 전달 호스 구조를 설명하시오.",
        "트레일러 ABS 시스템을 설명하시오.",
        "비상제동장치(Breakaway)를 설명하시오.",
        "주차브레이크 작동원리를 설명하시오.",
        "트레일러 릴레이 밸브를 설명하시오.",
        "제동력 배분 장치를 설명하시오.",
        "제동장치 공기압 점검을 설명하시오.",
      ],
    },
    {
      title: "트레일러 차체구조",
      description: "프레임, 현가장치, 차축",
      questions: [
        "세미트레일러 프레임 구조를 설명하시오.",
        "구스넥(Gooseneck) 구조를 설명하시오.",
        "트레일러 랜딩기어를 설명하시오.",
        "트레일러 현가장치 종류를 설명하시오.",
        "에어 서스펜션 특성을 설명하시오.",
        "탠덤 차축 구조를 설명하시오.",
        "슬라이딩 탠덤의 기능을 설명하시오.",
        "컨테이너 섀시 구조를 설명하시오.",
        "저상 트레일러 특성을 설명하시오.",
        "트레일러 차체 강도 기준을 설명하시오.",
      ],
    },
    {
      title: "레커 구조 및 장비",
      description: "견인장치, 윈치, 특수장비",
      questions: [
        "레커 윈치 구조와 작동을 설명하시오.",
        "붐(Boom) 장치의 기능을 설명하시오.",
        "휠리프트(Wheellift) 구조를 설명하시오.",
        "플랫베드 레커 구조를 설명하시오.",
        "견인바(Tow Bar) 사용법을 설명하시오.",
        "돌리(Dolly) 장치를 설명하시오.",
        "레커 유압 시스템을 설명하시오.",
        "레커 PTO 장치를 설명하시오.",
        "레커 경광등 설치 기준을 설명하시오.",
        "레커 장비 안전점검을 설명하시오.",
      ],
    },
    {
      title: "전기장치 및 점검",
      description: "조명연결, 점검항목, 정비",
      questions: [
        "트레일러 전기 연결 커넥터를 설명하시오.",
        "7핀 커넥터 배선도를 설명하시오.",
        "트레일러 등화장치 규정을 설명하시오.",
        "반사판 설치 기준을 설명하시오.",
        "후진등 연결 방법을 설명하시오.",
        "출발 전 연결장치 점검을 설명하시오.",
        "제동장치 일상점검을 설명하시오.",
        "타이어 및 휠 점검을 설명하시오.",
        "트레일러 정기검사 항목을 설명하시오.",
        "연결차량 종합점검 순서를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `1종 특수면허 자동차구조 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 트레일러/레커의 특수한 구조와 실제 운전 시 적용 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-gray-600 to-slate-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-special" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 특수면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">자동차구조</h1>
          <p className="text-xl text-gray-300">연결장치, 피견인차 제동, 레커 특수장비</p>
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
            <p className="text-3xl font-bold text-slate-600">10%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-red-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 mb-8 border border-purple-200">
          <h3 className="font-bold text-purple-800 mb-3">특수차량 구조 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
            <ul className="space-y-1">
              <li>• 제5륜(Fifth Wheel) 연결장치</li>
              <li>• 킹핀과 커플러 구조</li>
              <li>• 글래디핸드 공기압 연결</li>
            </ul>
            <ul className="space-y-1">
              <li>• 비상제동(Breakaway) 시스템</li>
              <li>• 레커 윈치/붐 장치</li>
              <li>• 7핀 전기 커넥터 배선</li>
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
            <Link href="/category/driving/driver-license-1-special/study/traffic-law" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">도로교통법규</span></Link>
            <Link href="/category/driving/driver-license-1-special/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
            <Link href="/category/driving/driver-license-1-special/study/practical" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">실기(장내/도로)</span></Link>
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
