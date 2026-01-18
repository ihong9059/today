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
      title: "방어운전 기법",
      description: "위험예측, 안전확인, 방어운전 요령",
      questions: [
        "방어운전의 개념과 필요성을 설명하시오.",
        "위험예측 운전의 방법을 설명하시오.",
        "사각지대 확인 방법을 설명하시오.",
        "안전확인 순서와 방법을 설명하시오.",
        "2초 법칙(안전거리)을 설명하시오.",
        "교차로에서의 방어운전을 설명하시오.",
        "고속도로에서의 방어운전을 설명하시오.",
        "야간 운전 시 방어운전을 설명하시오.",
        "악천후 시 방어운전을 설명하시오.",
        "터널 내 방어운전을 설명하시오.",
      ],
    },
    {
      title: "보행자 및 자전거 보호",
      description: "보행자 보호, 자전거 안전, 어린이 보호",
      questions: [
        "보행자 보호 의무를 설명하시오.",
        "횡단보도 보행자 보호 방법을 설명하시오.",
        "어린이보호구역 통행 시 주의사항을 설명하시오.",
        "노인보호구역 통행 시 주의사항을 설명하시오.",
        "자전거 추월 시 안전거리를 설명하시오.",
        "자전거 도로 통행 규정을 설명하시오.",
        "어린이통학버스 보호 의무를 설명하시오.",
        "야간 보행자 보호 요령을 설명하시오.",
        "우회전 시 보행자 보호를 설명하시오.",
        "후진 시 보행자 확인 방법을 설명하시오.",
      ],
    },
    {
      title: "사고예방 및 응급조치",
      description: "사고원인, 예방법, 응급처치",
      questions: [
        "교통사고 주요 원인을 설명하시오.",
        "졸음운전 예방법을 설명하시오.",
        "과속의 위험성을 설명하시오.",
        "음주운전의 위험성을 설명하시오.",
        "교통사고 발생 시 조치 순서를 설명하시오.",
        "부상자 응급처치 방법을 설명하시오.",
        "교통사고 신고 방법을 설명하시오.",
        "2차 사고 예방 방법을 설명하시오.",
        "차량 화재 시 대처법을 설명하시오.",
        "침수 차량 탈출 방법을 설명하시오.",
      ],
    },
    {
      title: "특수상황 운전",
      description: "비, 눈, 안개, 야간 운전 요령",
      questions: [
        "빗길 운전 시 주의사항을 설명하시오.",
        "수막현상(하이드로플레이닝)과 대처법을 설명하시오.",
        "눈길 운전 시 주의사항을 설명하시오.",
        "빙판길 운전 요령을 설명하시오.",
        "안개 운전 시 주의사항을 설명하시오.",
        "야간 운전 시 전조등 사용법을 설명하시오.",
        "상향등과 하향등 사용 기준을 설명하시오.",
        "터널 진입/진출 시 주의사항을 설명하시오.",
        "강풍 시 운전 요령을 설명하시오.",
        "폭염 시 운전 주의사항을 설명하시오.",
      ],
    },
    {
      title: "고속도로 및 자동차전용도로",
      description: "고속도로 통행, 진입/진출, 비상시 대처",
      questions: [
        "고속도로 진입 방법을 설명하시오.",
        "고속도로 진출 방법을 설명하시오.",
        "고속도로 차로변경 요령을 설명하시오.",
        "고속도로 안전거리 유지를 설명하시오.",
        "고속도로 졸음쉼터 이용법을 설명하시오.",
        "고속도로 고장 시 대처법을 설명하시오.",
        "고속도로 사고 시 대처법을 설명하시오.",
        "갓길 주정차 금지 규정을 설명하시오.",
        "고속도로 역주행 예방법을 설명하시오.",
        "자동차전용도로 통행 규정을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `2종 보통면허 안전운전 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 운전 상황에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/driver-license-2-normal" className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            2종 보통면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">안전운전</h1>
          <p className="text-xl text-emerald-200">필기시험 핵심 과목 | 방어운전, 사고예방, 응급조치</p>
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
            <p className="text-3xl font-bold text-green-600">중</p>
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
            <Link href="/category/driving/driver-license-2-normal/study/traffic-law" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">도로교통법규</span></Link>
            <Link href="/category/driving/driver-license-2-normal/study/vehicle-structure" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">자동차구조</span></Link>
            <Link href="/category/driving/driver-license-2-normal/study/practical" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">실기(장내/도로)</span></Link>
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
