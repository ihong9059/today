"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function FoodScienceStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "복어 독소",
      description: "테트로도톡신, 독소 분포, 독성",
      questions: [
        "테트로도톡신(TTX)의 화학적 특성을 설명하시오.", "테트로도톡신의 작용 기전을 설명하시오.", "복어 독소의 열 안정성을 설명하시오.", "복어 부위별 독소 분포를 설명하시오.", "복어 독소가 가장 강한 부위를 순서대로 나열하시오.",
        "복어 종류별 독성 차이를 설명하시오.", "복어 독소의 계절별 변화를 설명하시오.", "복어 독소의 치사량(LD50)을 설명하시오.", "테트로도톡신 해독제 유무를 설명하시오.", "복어 독소 검출 방법을 설명하시오.",
      ],
    },
    {
      title: "복어의 종류",
      description: "식용 복어, 독성 복어 구분",
      questions: [
        "우리나라에서 식용 가능한 복어 종류를 나열하시오.", "자주복의 특징과 독성을 설명하시오.", "검복의 특징과 독성을 설명하시오.", "까치복의 특징과 독성을 설명하시오.", "졸복의 특징과 독성을 설명하시오.",
        "흰점복의 특징과 독성을 설명하시오.", "참복의 특징과 독성을 설명하시오.", "황복의 특징과 독성을 설명하시오.", "식용 불가 복어의 종류를 설명하시오.", "복어 종류 판별 방법을 설명하시오.",
      ],
    },
    {
      title: "복어의 영양",
      description: "단백질, 아미노산, 영양가",
      questions: [
        "복어살의 영양성분을 설명하시오.", "복어의 단백질 특성을 설명하시오.", "복어의 지방 함량과 특성을 설명하시오.", "복어 콜라겐의 특성을 설명하시오.", "복어 정소(이리)의 영양성분을 설명하시오.",
        "복어의 비타민 함량을 설명하시오.", "복어의 무기질 함량을 설명하시오.", "복어의 칼로리를 설명하시오.", "복어의 필수아미노산 조성을 설명하시오.", "복어의 건강 기능성을 설명하시오.",
      ],
    },
    {
      title: "일반 식품학",
      description: "탄수화물, 단백질, 지방",
      questions: [
        "탄수화물의 정의와 분류를 설명하시오.", "단백질의 정의와 구조를 설명하시오.", "필수 아미노산의 종류를 나열하시오.", "단백질의 변성을 설명하시오.", "지방의 정의와 분류를 설명하시오.",
        "포화지방산과 불포화지방산의 차이를 설명하시오.", "비타민의 분류를 설명하시오.", "무기질의 분류를 설명하시오.", "효소적 갈변반응을 설명하시오.", "맛의 종류(5미)를 설명하시오.",
      ],
    },
    {
      title: "식품 저장",
      description: "복어 저장, 신선도 판별",
      questions: [
        "복어의 신선도 판별법을 설명하시오.", "활복어 관리 방법을 설명하시오.", "복어의 냉장 저장 방법을 설명하시오.", "복어의 냉동 저장 방법을 설명하시오.", "복어 해동 시 주의사항을 설명하시오.",
        "복어의 사후강직을 설명하시오.", "복어의 자가소화를 설명하시오.", "복어의 부패 징후를 설명하시오.", "복어의 적정 저장 온도를 설명하시오.", "복어의 유통기한 설정 기준을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `복어조리기능사 식품학 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 복어 관련 특수 사항\n4. 시험 출제 포인트\n5. 암기 팁`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-pufferfish" className="inline-flex items-center text-green-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            복어조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">식품학</h1>
          <p className="text-xl text-green-200">복어 독소, 복어 종류, 영양, 저장</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-green-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-emerald-600">15문항/60</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">난이도</p><p className="text-3xl font-bold text-teal-600">상</p></div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-green-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-green-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:from-green-600 hover:to-emerald-700 transition-colors">AI 도움</button>
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
            <Link href="/category/service/cook-pufferfish/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
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
