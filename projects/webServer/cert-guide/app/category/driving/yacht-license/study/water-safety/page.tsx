"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function WaterSafetyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "구명설비",
      description: "구명조끼, 구명정, 구명환",
      questions: [
        "구명조끼의 종류와 특성을 설명하시오.",
        "구명조끼 착용방법을 설명하시오.",
        "자동팽창식 구명조끼를 설명하시오.",
        "구명환(링부이)의 사용법을 설명하시오.",
        "구명정의 종류를 설명하시오.",
        "구명뗏목 사용절차를 설명하시오.",
        "구명설비 점검주기를 설명하시오.",
        "비상시 구명설비 배치를 설명하시오.",
        "침수 시 구명조끼 활용을 설명하시오.",
        "저체온증 예방을 위한 구명설비를 설명하시오.",
      ],
    },
    {
      title: "응급처치",
      description: "익수자 구조, CPR, 저체온증",
      questions: [
        "익수자 구조 순서를 설명하시오.",
        "익수자 인양방법을 설명하시오.",
        "심폐소생술(CPR) 절차를 설명하시오.",
        "자동심장충격기(AED) 사용법을 설명하시오.",
        "저체온증 증상을 설명하시오.",
        "저체온증 응급처치를 설명하시오.",
        "열사병 응급처치를 설명하시오.",
        "외상 응급처치를 설명하시오.",
        "골절 시 응급처치를 설명하시오.",
        "선상 구급함 비치품목을 설명하시오.",
      ],
    },
    {
      title: "기상 및 해상상태",
      description: "기상정보, 파도, 조류, 안개",
      questions: [
        "해상기상정보 입수방법을 설명하시오.",
        "풍력계급(보퍼트)을 설명하시오.",
        "요트 운항 불가 기상조건을 설명하시오.",
        "파도의 종류와 특성을 설명하시오.",
        "너울(스웰)이 요트에 미치는 영향을 설명하시오.",
        "조류가 요트 항해에 미치는 영향을 설명하시오.",
        "안개 발생 시 주의사항을 설명하시오.",
        "낙뢰 시 안전조치를 설명하시오.",
        "돌풍(스콜) 대응방법을 설명하시오.",
        "기상악화 시 피항방법을 설명하시오.",
      ],
    },
    {
      title: "비상시 대응",
      description: "화재, 침수, 좌초, 충돌",
      questions: [
        "선상 화재 시 초동대응을 설명하시오.",
        "소화기 종류와 사용법을 설명하시오.",
        "전기화재 대응방법을 설명하시오.",
        "침수 시 응급조치를 설명하시오.",
        "배수펌프 사용법을 설명하시오.",
        "좌초 시 대응방법을 설명하시오.",
        "충돌 시 대응절차를 설명하시오.",
        "기관고장 시 비상조치를 설명하시오.",
        "퇴선 결정 기준을 설명하시오.",
        "퇴선 시 행동요령을 설명하시오.",
      ],
    },
    {
      title: "조난통신 및 구조요청",
      description: "VHF, 신호, EPIRB, 구조대기",
      questions: [
        "VHF 조난통신 절차를 설명하시오.",
        "MAYDAY 호출방법을 설명하시오.",
        "PAN-PAN 호출방법을 설명하시오.",
        "EPIRB(비상위치지시용무선표지)를 설명하시오.",
        "주간 조난신호 종류를 설명하시오.",
        "야간 조난신호 종류를 설명하시오.",
        "구조대 도착 전 대기방법을 설명하시오.",
        "헬기 구조 시 주의사항을 설명하시오.",
        "해상 수색구조체계를 설명하시오.",
        "해경 신고방법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `요트조종면허 수상안전 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 요트 운항에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/yacht-license" className="inline-flex items-center text-red-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            요트조종면허 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">수상안전</h1>
          <p className="text-xl text-red-200">구명설비, 응급처치, 기상, 비상대응</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-red-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-rose-600">25%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">중요도</p>
            <p className="text-3xl font-bold text-orange-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 mb-8 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">수상안전 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-red-700">
            <ul className="space-y-1">
              <li>• 구명조끼 착용법 및 종류</li>
              <li>• 익수자 구조 및 CPR</li>
              <li>• 저체온증 예방/처치</li>
            </ul>
            <ul className="space-y-1">
              <li>• 화재/침수 시 대응</li>
              <li>• MAYDAY 호출절차</li>
              <li>• 기상악화 시 피항</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-red-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-red-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded-lg text-sm hover:from-red-600 hover:to-rose-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/yacht-license/study/navigation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">항해술</span></Link>
            <Link href="/category/driving/yacht-license/study/maritime-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">법규</span></Link>
            <Link href="/category/driving/yacht-license/study/yacht-operation" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">요트운용</span></Link>
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
