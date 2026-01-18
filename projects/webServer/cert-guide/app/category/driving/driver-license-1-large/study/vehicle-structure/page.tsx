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
      title: "대형차 엔진 및 동력전달",
      description: "디젤엔진, 터보차저, 동력전달장치",
      questions: [
        "디젤엔진의 작동원리를 설명하시오.",
        "디젤엔진과 가솔린엔진의 차이를 설명하시오.",
        "터보차저의 구조와 역할을 설명하시오.",
        "인터쿨러의 기능을 설명하시오.",
        "대형차 냉각시스템 특성을 설명하시오.",
        "대형차 변속기 종류를 설명하시오.",
        "AMT(자동화 수동변속기)를 설명하시오.",
        "대형차 클러치 특성을 설명하시오.",
        "PTO(동력인출장치)를 설명하시오.",
        "리타더(보조제동장치)를 설명하시오.",
      ],
    },
    {
      title: "에어브레이크 시스템",
      description: "공기압 제동장치, 복합제동, 안전장치",
      questions: [
        "에어브레이크 작동원리를 설명하시오.",
        "에어탱크와 컴프레서 역할을 설명하시오.",
        "브레이크 챔버 구조를 설명하시오.",
        "릴레이 밸브의 기능을 설명하시오.",
        "풋 밸브(브레이크 밸브)를 설명하시오.",
        "스프링 브레이크(주차브레이크)를 설명하시오.",
        "ABS(잠김방지장치) 대형차 적용을 설명하시오.",
        "EBS(전자제어 브레이크)를 설명하시오.",
        "공기압 부족 시 경고시스템을 설명하시오.",
        "에어브레이크 일상점검 항목을 설명하시오.",
      ],
    },
    {
      title: "조향 및 현가장치",
      description: "파워스티어링, 현가장치, 차축구조",
      questions: [
        "대형차 파워스티어링 특성을 설명하시오.",
        "인테그럴 파워스티어링을 설명하시오.",
        "대형차 조향기어비 특성을 설명하시오.",
        "대형차 전륜 현가장치를 설명하시오.",
        "리프 스프링 구조를 설명하시오.",
        "에어 서스펜션 특성을 설명하시오.",
        "탠덤 차축 구조를 설명하시오.",
        "후륜 현가장치 특성을 설명하시오.",
        "대형차 프레임 구조를 설명하시오.",
        "차축 정렬의 중요성을 설명하시오.",
      ],
    },
    {
      title: "전기장치 및 타이어",
      description: "24V 시스템, 대형타이어, 휠 구조",
      questions: [
        "대형차 24V 전기시스템을 설명하시오.",
        "대형차 배터리 병렬연결을 설명하시오.",
        "대형차 발전기(알터네이터) 특성을 설명하시오.",
        "대형차 시동모터 특성을 설명하시오.",
        "대형차 등화장치 규정을 설명하시오.",
        "대형차 타이어 규격 표시를 설명하시오.",
        "듀얼타이어(복륜) 구조를 설명하시오.",
        "대형차 타이어 공기압 관리를 설명하시오.",
        "타이어 마모한계 점검법을 설명하시오.",
        "휠 볼트 체결 토크를 설명하시오.",
      ],
    },
    {
      title: "점검 및 정비",
      description: "출발전 점검, 정기점검, 고장대응",
      questions: [
        "대형차 출발 전 점검항목을 설명하시오.",
        "에어브레이크 공기압 점검을 설명하시오.",
        "엔진오일 점검 방법을 설명하시오.",
        "냉각수 점검 및 보충을 설명하시오.",
        "연료필터 점검 시기를 설명하시오.",
        "대형차 정기검사 주기를 설명하시오.",
        "운행기록계 점검 방법을 설명하시오.",
        "대형차 계기판 경고등을 설명하시오.",
        "공기압 저하 시 대처법을 설명하시오.",
        "엔진 과열 시 대처법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `1종 대형면허 자동차구조 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 대형차량의 특수한 구조와 실제 운전 시 적용 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-gray-600 to-slate-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-large" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 대형면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">자동차구조</h1>
          <p className="text-xl text-gray-300">대형차 엔진, 에어브레이크, 특수장치</p>
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
            <p className="text-3xl font-bold text-orange-600">상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-8 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3">대형차 구조 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
            <ul className="space-y-1">
              <li>• 에어브레이크 시스템 필수 이해</li>
              <li>• 디젤엔진 특성 (터보, 인터쿨러)</li>
              <li>• 24V 전기시스템</li>
            </ul>
            <ul className="space-y-1">
              <li>• 리타더 등 보조제동장치</li>
              <li>• 에어서스펜션 특성</li>
              <li>• 복륜(듀얼타이어) 구조</li>
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
            <Link href="/category/driving/driver-license-1-large/study/traffic-law" className="bg-zinc-50 hover:bg-zinc-100 rounded-lg p-3 text-center transition-colors"><span className="text-zinc-700 font-medium">도로교통법규</span></Link>
            <Link href="/category/driving/driver-license-1-large/study/safe-driving" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">안전운전</span></Link>
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
