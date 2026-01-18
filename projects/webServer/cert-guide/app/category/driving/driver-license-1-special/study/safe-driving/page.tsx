"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function SafeDrivingStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "트레일러 방어운전",
      description: "연결차량 특성, 사각지대, 위험예측",
      questions: [
        "트레일러 사각지대 범위를 설명하시오.",
        "세미트레일러 회전 시 궤적 차이를 설명하시오.",
        "트레일러 내륜차 현상을 설명하시오.",
        "트레일러 제동거리 특성을 설명하시오.",
        "연결차량 차로변경 주의사항을 설명하시오.",
        "트레일러 후진 시 주의사항을 설명하시오.",
        "연결차량 추월 시 안전거리를 설명하시오.",
        "트레일러 교차로 통행 방어운전을 설명하시오.",
        "풀트레일러 스윙아웃 현상을 설명하시오.",
        "연결차량 급커브 통과 요령을 설명하시오.",
      ],
    },
    {
      title: "트레일러 사고예방",
      description: "잭나이프, 전복, 스윙아웃 방지",
      questions: [
        "잭나이프(Jackknife) 현상을 설명하시오.",
        "잭나이프 발생 원인을 설명하시오.",
        "잭나이프 예방 방법을 설명하시오.",
        "트레일러 전복사고 원인을 설명하시오.",
        "트레일러 전복 예방법을 설명하시오.",
        "스윙아웃(Swing-out) 현상을 설명하시오.",
        "연결부 파손 사고 예방을 설명하시오.",
        "트레일러 화재 예방을 설명하시오.",
        "연결차량 추돌사고 예방을 설명하시오.",
        "피견인차 이탈 사고 예방을 설명하시오.",
      ],
    },
    {
      title: "레커 안전운전",
      description: "견인 중 안전, 사고현장 대응",
      questions: [
        "레커 견인 시 안전거리 확보를 설명하시오.",
        "견인 중 피견인차 확인 방법을 설명하시오.",
        "사고차량 견인 시 주의사항을 설명하시오.",
        "고장차량 견인 시 주의사항을 설명하시오.",
        "레커 후방 경고장치 사용을 설명하시오.",
        "고속도로 견인 시 안전조치를 설명하시오.",
        "야간 견인 시 안전조치를 설명하시오.",
        "악천후 견인 시 주의사항을 설명하시오.",
        "견인 중 2차 사고 예방을 설명하시오.",
        "플랫베드 레커 적재 시 안전을 설명하시오.",
      ],
    },
    {
      title: "악천후 연결차량 운전",
      description: "비, 눈, 안개, 강풍 시 운전",
      questions: [
        "트레일러 빗길 운전 주의사항을 설명하시오.",
        "연결차량 수막현상 대처법을 설명하시오.",
        "트레일러 눈길 운전 요령을 설명하시오.",
        "연결차량 빙판길 제동 방법을 설명하시오.",
        "트레일러 안개 운전 주의사항을 설명하시오.",
        "연결차량 강풍 시 운전 요령을 설명하시오.",
        "트레일러 측풍 대처법을 설명하시오.",
        "연결차량 폭우 시 운전 요령을 설명하시오.",
        "트레일러 결빙구간 통과법을 설명하시오.",
        "악천후 시 연결부 점검을 설명하시오.",
      ],
    },
    {
      title: "응급상황 대처",
      description: "연결부 파손, 전복, 화재 대응",
      questions: [
        "연결부 파손 시 대처법을 설명하시오.",
        "트레일러 전복 시 대처법을 설명하시오.",
        "견인 중 피견인차 이탈 시 대처를 설명하시오.",
        "트레일러 화재 시 대처법을 설명하시오.",
        "연결차량 제동불량 시 대처를 설명하시오.",
        "트레일러 타이어 파열 시 대처를 설명하시오.",
        "연결차량 사고 시 초동조치를 설명하시오.",
        "위험물 트레일러 사고 대처를 설명하시오.",
        "고속도로 연결차량 고장 시 대처를 설명하시오.",
        "트레일러 침수 시 대처법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `1종 특수면허 안전운전 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 트레일러/레커 특성을 고려한 실제 운전 상황에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-1-special" className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            1종 특수면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">안전운전</h1>
          <p className="text-xl text-emerald-200">트레일러/레커 방어운전, 잭나이프 예방, 응급대처</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-emerald-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-teal-600">30%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-red-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-8 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">핵심 안전 포인트</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-red-700">
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">잭나이프 현상</p>
              <p>급제동 시 트랙터-트레일러 접힘</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">스윙아웃 현상</p>
              <p>회전 시 트레일러 외측 이탈</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">내륜차 현상</p>
              <p>회전 시 후륜 안쪽 궤적</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-emerald-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-emerald-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-lg text-sm hover:from-emerald-600 hover:to-teal-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/driver-license-1-special/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
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
