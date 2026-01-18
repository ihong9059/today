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
      title: "식품의 성분",
      description: "수분, 탄수화물, 단백질, 지방",
      questions: [
        "식품 중 수분의 역할을 설명하시오.", "자유수와 결합수의 차이를 설명하시오.", "수분활성도(Aw)의 의미를 설명하시오.", "탄수화물의 분류를 설명하시오.", "전분의 호화와 노화를 설명하시오.",
        "단백질의 구조와 기능을 설명하시오.", "단백질의 변성을 설명하시오.", "지방의 분류와 특성을 설명하시오.", "유지의 산패를 설명하시오.", "유화의 원리를 설명하시오.",
      ],
    },
    {
      title: "제과 주재료",
      description: "밀가루, 설탕, 유지, 달걀",
      questions: [
        "밀가루의 종류와 특성을 설명하시오.", "글루텐의 형성과 역할을 설명하시오.", "박력분, 중력분, 강력분의 차이를 설명하시오.", "설탕의 종류와 특성을 설명하시오.", "설탕의 제과에서의 기능을 설명하시오.",
        "버터의 특성과 역할을 설명하시오.", "쇼트닝의 특성과 역할을 설명하시오.", "마가린의 특성을 설명하시오.", "달걀의 구조와 성분을 설명하시오.", "달걀의 제과에서의 기능을 설명하시오.",
      ],
    },
    {
      title: "제과 부재료",
      description: "우유, 팽창제, 초콜릿, 향료",
      questions: [
        "우유의 성분과 특성을 설명하시오.", "크림의 종류와 특성을 설명하시오.", "베이킹파우더의 원리를 설명하시오.", "베이킹소다의 특성을 설명하시오.", "이스트의 특성과 역할을 설명하시오.",
        "초콜릿의 종류와 특성을 설명하시오.", "코코아의 특성을 설명하시오.", "바닐라의 종류와 특성을 설명하시오.", "향료의 종류와 사용법을 설명하시오.", "색소의 종류와 사용법을 설명하시오.",
      ],
    },
    {
      title: "식품의 변질",
      description: "부패, 변패, 산패",
      questions: [
        "식품의 부패 원인을 설명하시오.", "미생물에 의한 변질을 설명하시오.", "효소에 의한 변질을 설명하시오.", "유지의 산패 종류를 설명하시오.", "자동산화의 원리를 설명하시오.",
        "갈변반응의 종류를 설명하시오.", "마이야르 반응을 설명하시오.", "캐러멜화 반응을 설명하시오.", "효소적 갈변을 설명하시오.", "식품 변질 방지법을 설명하시오.",
      ],
    },
    {
      title: "식품의 저장",
      description: "냉장, 냉동, 건조, 포장",
      questions: [
        "냉장 저장의 원리를 설명하시오.", "냉동 저장의 원리를 설명하시오.", "급속냉동과 완만냉동의 차이를 설명하시오.", "해동 방법을 설명하시오.", "건조 저장의 원리를 설명하시오.",
        "포장의 목적을 설명하시오.", "포장재료의 종류를 설명하시오.", "진공포장의 원리를 설명하시오.", "가스치환포장을 설명하시오.", "제과제품의 보관 방법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `제과기능사 식품학 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 제과 적용 사례\n4. 시험 출제 포인트\n5. 암기 팁`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/confectioner" className="inline-flex items-center text-green-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            제과기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">식품학</h1>
          <p className="text-xl text-green-200">식품성분, 제과재료, 식품변질, 저장</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-green-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-emerald-600">높음</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">난이도</p><p className="text-3xl font-bold text-teal-600">중상</p></div>
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
            <Link href="/category/service/confectioner/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생학</span></Link>
            <Link href="/category/service/confectioner/study/nutrition" className="bg-orange-50 hover:bg-orange-100 rounded-lg p-3 text-center transition-colors"><span className="text-orange-700 font-medium">영양학</span></Link>
            <Link href="/category/service/confectioner/study/baking-theory" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-3 text-center transition-colors"><span className="text-pink-700 font-medium">제과이론</span></Link>
            <Link href="/category/service/confectioner/study/practical" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">실기</span></Link>
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
