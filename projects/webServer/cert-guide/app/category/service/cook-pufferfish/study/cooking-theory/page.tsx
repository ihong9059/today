"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function CookingTheoryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "복어 손질법",
      description: "독소 제거, 해체 순서, 부위별 처리",
      questions: [
        "복어 손질의 기본 순서를 설명하시오.", "복어의 피 빼기(방혈) 방법을 설명하시오.", "복어의 껍질 벗기기 방법을 설명하시오.", "복어의 내장 제거 방법을 설명하시오.", "복어의 난소(알) 제거 시 주의사항을 설명하시오.",
        "복어의 간장 제거 방법을 설명하시오.", "복어의 눈 제거 방법을 설명하시오.", "복어살 포뜨기 방법을 설명하시오.", "복어 뼈 처리 방법을 설명하시오.", "복어 손질 후 세척 방법을 설명하시오.",
      ],
    },
    {
      title: "복어 조리법",
      description: "회, 탕, 튀김, 찜 조리",
      questions: [
        "복어회(테사)의 조리법을 설명하시오.", "복어껍질회(가와사시)의 조리법을 설명하시오.", "복어탕(지리)의 조리법을 설명하시오.", "복어튀김의 조리법을 설명하시오.", "복어찜의 조리법을 설명하시오.",
        "복어죽의 조리법을 설명하시오.", "복어불고기의 조리법을 설명하시오.", "복어샤브샤브의 조리법을 설명하시오.", "복어정소(이리) 조리법을 설명하시오.", "복어요리 담음새를 설명하시오.",
      ],
    },
    {
      title: "복어 전용 도구",
      description: "칼, 도마, 폐기물 처리 도구",
      questions: [
        "복어 전용 칼의 종류와 특성을 설명하시오.", "복어칼 관리 방법을 설명하시오.", "복어 전용 도마의 특성을 설명하시오.", "복어 독소 부위 전용 폐기물통을 설명하시오.", "복어 손질 위생장갑 사용법을 설명하시오.",
        "복어회 접시의 특성을 설명하시오.", "복어 손질용 집게 사용법을 설명하시오.", "복어 보관 용기의 특성을 설명하시오.", "복어 도구 소독 방법을 설명하시오.", "복어 도구 보관 방법을 설명하시오.",
      ],
    },
    {
      title: "원가계산",
      description: "식재료비, 원가율, 손익분기점",
      questions: [
        "원가의 정의와 구성요소를 설명하시오.", "복어 식재료비의 계산 방법을 설명하시오.", "원가율 계산 공식을 설명하시오.", "판매가격 결정 방법을 설명하시오.", "손익분기점의 의미와 계산을 설명하시오.",
        "직접비와 간접비의 차이를 설명하시오.", "고정비와 변동비의 차이를 설명하시오.", "복어의 폐기율과 가식율을 설명하시오.", "출고단가 계산 방법을 설명하시오.", "메뉴 원가분석 방법을 설명하시오.",
      ],
    },
    {
      title: "조리장 관리",
      description: "시설기준, 위생관리, 안전관리",
      questions: [
        "복어 취급업소의 시설기준을 설명하시오.", "복어 조리장의 구획 분리를 설명하시오.", "복어 손질대의 특성을 설명하시오.", "냉장고 온도 관리를 설명하시오.", "활어수조 관리 방법을 설명하시오.",
        "조리기구 세척 및 소독을 설명하시오.", "복어 폐기물 처리 방법을 설명하시오.", "조리장 청소 및 소독을 설명하시오.", "가스 기기 안전 관리를 설명하시오.", "주방 기기 예방정비를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `복어조리기능사 조리이론과 원가계산 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 실무 적용 사례\n4. 시험 출제 포인트\n5. 안전 주의사항`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-pufferfish" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            복어조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">조리이론과 원가계산</h1>
          <p className="text-xl text-blue-200">복어 손질법, 조리법, 원가계산, 조리장 관리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-blue-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-indigo-600">15문항/60</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">난이도</p><p className="text-3xl font-bold text-violet-600">상</p></div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-blue-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-blue-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:from-blue-600 hover:to-indigo-700 transition-colors">AI 도움</button>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/service/cook-pufferfish/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-pufferfish/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-pufferfish/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
            <Link href="/category/service/cook-pufferfish/study/practical" className="bg-slate-50 hover:bg-slate-100 rounded-lg p-3 text-center transition-colors"><span className="text-slate-700 font-medium">실기</span></Link>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-gray-800">AI 도우미 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
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
