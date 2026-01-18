"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function TrafficLawStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "대형차량 통행규정",
      description: "대형차 전용도로, 통행제한, 차로지정",
      questions: [
        "대형차량 통행금지 구역을 설명하시오.",
        "대형차량 고속도로 차로 지정 규정을 설명하시오.",
        "대형화물차 야간 통행제한을 설명하시오.",
        "대형차량 주거지역 통행제한을 설명하시오.",
        "버스전용차로 통행 규정을 설명하시오.",
        "대형차량 터널 통행 규정을 설명하시오.",
        "교량 하중제한 규정을 설명하시오.",
        "대형차량 우회전 전용신호를 설명하시오.",
        "대형차량 좌회전 시 주의사항을 설명하시오.",
        "대형차량 유턴 금지 구역을 설명하시오.",
      ],
    },
    {
      title: "속도제한 및 안전거리",
      description: "대형차 제한속도, 안전거리 규정",
      questions: [
        "대형차량 고속도로 제한속도를 설명하시오.",
        "대형화물차 일반도로 제한속도를 설명하시오.",
        "대형승합차 어린이보호구역 제한속도를 설명하시오.",
        "대형차량 안전거리 산정 기준을 설명하시오.",
        "고속도로에서 대형차 안전거리를 설명하시오.",
        "악천후 시 대형차 감속 운전을 설명하시오.",
        "대형차량 내리막길 속도제한을 설명하시오.",
        "화물적재 시 속도제한 변화를 설명하시오.",
        "대형차량 공사구간 통행속도를 설명하시오.",
        "과적차량 속도제한 규정을 설명하시오.",
      ],
    },
    {
      title: "화물적재 규정",
      description: "적재중량, 적재방법, 과적단속",
      questions: [
        "화물 적재중량 제한 기준을 설명하시오.",
        "화물 적재높이 제한 규정을 설명하시오.",
        "화물 적재길이 제한 규정을 설명하시오.",
        "화물 적재너비 제한 규정을 설명하시오.",
        "화물 고정방법 규정을 설명하시오.",
        "위험물 운송 표지 부착을 설명하시오.",
        "과적단속 기준과 처벌을 설명하시오.",
        "축중량 제한 규정을 설명하시오.",
        "컨테이너 화물 적재 규정을 설명하시오.",
        "적재물 추락방지 의무를 설명하시오.",
      ],
    },
    {
      title: "운행기록 및 휴식규정",
      description: "운행기록계, 휴식시간, 운전시간 제한",
      questions: [
        "운행기록계(타코미터) 장착 의무를 설명하시오.",
        "디지털 운행기록계 기록항목을 설명하시오.",
        "운행기록 보관 기간을 설명하시오.",
        "연속 운전시간 제한 규정을 설명하시오.",
        "1일 운전시간 제한 규정을 설명하시오.",
        "휴식시간 확보 의무를 설명하시오.",
        "야간운전 제한 규정을 설명하시오.",
        "운전자 피로관리 의무를 설명하시오.",
        "운행기록 위반 시 처벌을 설명하시오.",
        "운수회사 운행기록 관리의무를 설명하시오.",
      ],
    },
    {
      title: "대형차 특별규정",
      description: "위험물운송, 특수차량, 긴급차량",
      questions: [
        "위험물 운송차량 표지 규정을 설명하시오.",
        "위험물 운송 시 통행금지 구역을 설명하시오.",
        "탱크로리 운행 규정을 설명하시오.",
        "특수차량 통행허가 절차를 설명하시오.",
        "중장비 운반차량 규정을 설명하시오.",
        "대형버스 승객안전 규정을 설명하시오.",
        "긴급자동차 양보 의무를 설명하시오.",
        "어린이통학버스 특별규정을 설명하시오.",
        "견인차량 운행 규정을 설명하시오.",
        "대형차 음주운전 처벌 강화 규정을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `1종 대형면허 도로교통법규 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 대형차량 관련 법규 조항, 실제 적용 사례, 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="bg-gradient-to-r from-zinc-700 to-stone-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-large" className="inline-flex items-center text-zinc-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 대형면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">도로교통법규</h1>
          <p className="text-xl text-zinc-300">대형차량 특별규정, 화물적재, 운행기록</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-zinc-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-stone-600">60%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-orange-600">상</p>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-zinc-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-zinc-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-zinc-500 to-stone-600 text-white px-3 py-1 rounded-lg text-sm hover:from-zinc-600 hover:to-stone-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/driver-license-1-large/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
            <Link href="/category/driving/driver-license-1-large/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
            <Link href="/category/driving/driver-license-1-large/study/practical" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">실기(장내/도로)</span></Link>
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
