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
      title: "일식 기초",
      description: "일식조리 특징, 조리도구, 기본기술",
      questions: [
        "일본요리의 5가지 특징을 설명하시오.", "일식의 5색(五色)을 설명하시오.", "일식의 5미(五味)를 설명하시오.", "일식의 5법(五法)을 설명하시오.", "사시미칼(야나기바)의 특성과 사용법을 설명하시오.",
        "데바칼의 특성과 용도를 설명하시오.", "우스바칼의 특성과 용도를 설명하시오.", "마끼스(김밥말이)의 사용법을 설명하시오.", "다시(육수)의 종류와 만드는 법을 설명하시오.", "가쓰오부시의 특성과 용도를 설명하시오.",
      ],
    },
    {
      title: "일식 조리법",
      description: "회, 구이, 조림, 튀김, 찜",
      questions: [
        "사시미(刺身)의 조리법을 설명하시오.", "야키모노(焼物, 구이)의 조리법을 설명하시오.", "니모노(煮物, 조림)의 조리법을 설명하시오.", "아게모노(揚物, 튀김)의 조리법을 설명하시오.", "무시모노(蒸物, 찜)의 조리법을 설명하시오.",
        "스노모노(酢物, 초회)의 조리법을 설명하시오.", "아에모노(和物, 무침)의 조리법을 설명하시오.", "스시(寿司)의 조리법을 설명하시오.", "나베모노(鍋物)의 조리법을 설명하시오.", "멘루이(麺類, 면요리)의 조리법을 설명하시오.",
      ],
    },
    {
      title: "생선 손질",
      description: "회뜨기, 포뜨기, 뼈처리",
      questions: [
        "생선의 신선도 판별법을 설명하시오.", "3장 뜨기(산마이오로시)를 설명하시오.", "5장 뜨기(고마이오로시)를 설명하시오.", "히라즈쿠리(평조림)를 설명하시오.", "소기즈쿠리(썰기)를 설명하시오.",
        "우스즈쿠리(얇게 썰기)를 설명하시오.", "이토즈쿠리(실썰기)를 설명하시오.", "가쿠즈쿠리(깍둑썰기)를 설명하시오.", "활어회 손질법을 설명하시오.", "생선 뼈 처리법을 설명하시오.",
      ],
    },
    {
      title: "원가계산",
      description: "식재료비, 원가율, 손익분기점",
      questions: [
        "원가의 정의와 구성요소를 설명하시오.", "식재료비의 계산 방법을 설명하시오.", "원가율 계산 공식을 설명하시오.", "판매가격 결정 방법을 설명하시오.", "손익분기점의 의미와 계산을 설명하시오.",
        "직접비와 간접비의 차이를 설명하시오.", "고정비와 변동비의 차이를 설명하시오.", "폐기율과 가식율을 설명하시오.", "출고단가 계산 방법을 설명하시오.", "메뉴 원가분석 방법을 설명하시오.",
      ],
    },
    {
      title: "조리기기 관리",
      description: "칼, 도마, 냉장설비 관리",
      questions: [
        "일식칼의 종류와 관리를 설명하시오.", "칼 갈기(숫돌 사용법)를 설명하시오.", "도마의 재질별 특성을 설명하시오.", "냉장고 온도 관리를 설명하시오.", "생선 저장 온도 관리를 설명하시오.",
        "조리기구 세척 및 소독을 설명하시오.", "다마고야끼팬 사용법을 설명하시오.", "튀김기 기름 관리를 설명하시오.", "스시 냉장쇼케이스 관리를 설명하시오.", "주방 기기 예방정비를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `일식조리기능사 조리이론과 원가계산 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 실무 적용 사례\n4. 시험 출제 포인트\n5. 계산 문제 예시 (해당 시)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-japanese" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            일식조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">조리이론과 원가계산</h1>
          <p className="text-xl text-blue-200">일식조리법, 생선손질, 원가계산, 기기관리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-blue-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-indigo-600">15문항/60</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">난이도</p><p className="text-3xl font-bold text-violet-600">중</p></div>
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
            <Link href="/category/service/cook-japanese/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-japanese/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-japanese/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
            <Link href="/category/service/cook-japanese/study/practical" className="bg-cyan-50 hover:bg-cyan-100 rounded-lg p-3 text-center transition-colors"><span className="text-cyan-700 font-medium">실기</span></Link>
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
