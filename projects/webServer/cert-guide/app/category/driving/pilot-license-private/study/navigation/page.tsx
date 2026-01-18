"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function NavigationStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "항공지도",
      description: "도법, 축척, 기호, VFR차트",
      questions: [
        "항공지도의 종류를 설명하시오.",
        "람베르트 도법을 설명하시오.",
        "메르카토르 도법을 설명하시오.",
        "축척의 의미를 설명하시오.",
        "VFR 항공지도 기호를 설명하시오.",
        "공역 표시방법을 설명하시오.",
        "지형지물 표시방법을 설명하시오.",
        "장애물 표시방법을 설명하시오.",
        "비행장 표시방법을 설명하시오.",
        "항공로 표시방법을 설명하시오.",
      ],
    },
    {
      title: "지문항법",
      description: "지도판독, 지표지물, 위치확인",
      questions: [
        "지문항법의 정의를 설명하시오.",
        "지표지물 식별방법을 설명하시오.",
        "선상 지표지물을 설명하시오.",
        "점상 지표지물을 설명하시오.",
        "면상 지표지물을 설명하시오.",
        "지도 접기방법을 설명하시오.",
        "현재위치 확인방법을 설명하시오.",
        "편류 수정방법을 설명하시오.",
        "ETA 계산방법을 설명하시오.",
        "위치상실 시 대응을 설명하시오.",
      ],
    },
    {
      title: "추측항법",
      description: "침로, 속도, 풍향풍속, 비행계획",
      questions: [
        "추측항법의 정의를 설명하시오.",
        "자침방위와 진방위를 설명하시오.",
        "편차와 자차를 설명하시오.",
        "대지속도와 대기속도를 설명하시오.",
        "풍향풍속 보정을 설명하시오.",
        "항적각 계산을 설명하시오.",
        "비행계획서 작성을 설명하시오.",
        "연료 소모량 계산을 설명하시오.",
        "비행시간 계산을 설명하시오.",
        "항법 로그 작성을 설명하시오.",
      ],
    },
    {
      title: "무선항법",
      description: "VOR, NDB, DME, GPS",
      questions: [
        "VOR의 원리를 설명하시오.",
        "VOR 수신 및 이용을 설명하시오.",
        "VOR 레이디얼을 설명하시오.",
        "NDB의 원리를 설명하시오.",
        "ADF 수신기 사용법을 설명하시오.",
        "상대방위와 자기방위를 설명하시오.",
        "DME의 원리를 설명하시오.",
        "GPS 항법 기초를 설명하시오.",
        "RNAV의 개념을 설명하시오.",
        "무선항법 오차를 설명하시오.",
      ],
    },
    {
      title: "비행계획 및 브리핑",
      description: "NOTAM, 기상브리핑, 절차",
      questions: [
        "비행 전 준비사항을 설명하시오.",
        "NOTAM의 종류와 확인을 설명하시오.",
        "기상 브리핑 절차를 설명하시오.",
        "중량/평형 계산을 설명하시오.",
        "연료 계획을 설명하시오.",
        "예비 연료를 설명하시오.",
        "대체비행장 선정을 설명하시오.",
        "비행계획서 제출 절차를 설명하시오.",
        "비행 중 항법 점검을 설명하시오.",
        "회항/우회 결정을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `자가용조종사 항법 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 비행 계획 및 항법 적용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/pilot-license-private" className="inline-flex items-center text-emerald-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            자가용조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">항법</h1>
          <p className="text-xl text-emerald-200">항공지도, 지문항법, 추측항법, 무선항법</p>
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
            <p className="text-3xl font-bold text-teal-600">20%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-green-600">중상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 mb-8 border border-emerald-200">
          <h3 className="font-bold text-emerald-800 mb-3">항법 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-emerald-700">
            <ul className="space-y-1">
              <li>• 항공지도 판독</li>
              <li>• 편차/자차 계산</li>
              <li>• 풍향풍속 보정</li>
            </ul>
            <ul className="space-y-1">
              <li>• VOR/NDB 이용</li>
              <li>• 비행계획서 작성</li>
              <li>• 연료 계획</li>
            </ul>
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
            <Link href="/category/driving/pilot-license-private/study/aviation-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">항공법규</span></Link>
            <Link href="/category/driving/pilot-license-private/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/pilot-license-private/study/flight-theory" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">비행이론</span></Link>
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
