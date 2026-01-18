"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function NutritionStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "영양소 총론",
      description: "영양소의 정의, 분류, 기능",
      questions: [
        "영양소의 정의와 분류를 설명하시오.", "열량 영양소의 종류와 열량을 설명하시오.", "탄수화물의 기능을 설명하시오.", "단백질의 기능을 설명하시오.", "지방의 기능을 설명하시오.",
        "비타민의 분류와 기능을 설명하시오.", "무기질의 종류와 기능을 설명하시오.", "물의 기능을 설명하시오.", "식이섬유의 기능을 설명하시오.", "영양소 섭취기준을 설명하시오.",
      ],
    },
    {
      title: "탄수화물",
      description: "당류, 전분, 식이섬유",
      questions: [
        "탄수화물의 분류를 설명하시오.", "단당류의 종류와 특성을 설명하시오.", "이당류의 종류와 특성을 설명하시오.", "다당류의 종류와 특성을 설명하시오.", "전분의 소화와 흡수를 설명하시오.",
        "혈당지수(GI)의 의미를 설명하시오.", "당뇨병과 탄수화물의 관계를 설명하시오.", "식이섬유의 종류를 설명하시오.", "탄수화물의 적정 섭취량을 설명하시오.", "제과에서 당류의 역할을 설명하시오.",
      ],
    },
    {
      title: "단백질과 지방",
      description: "아미노산, 지방산, 콜레스테롤",
      questions: [
        "필수 아미노산의 종류를 설명하시오.", "단백질의 질 평가 방법을 설명하시오.", "단백질의 소화와 흡수를 설명하시오.", "단백질 결핍증을 설명하시오.", "포화지방산과 불포화지방산을 설명하시오.",
        "필수지방산의 종류와 기능을 설명하시오.", "콜레스테롤의 기능을 설명하시오.", "트랜스지방의 위험성을 설명하시오.", "지방의 적정 섭취량을 설명하시오.", "제과에서 유지의 역할을 설명하시오.",
      ],
    },
    {
      title: "비타민",
      description: "수용성, 지용성 비타민",
      questions: [
        "지용성 비타민의 종류와 특성을 설명하시오.", "비타민 A의 기능과 결핍증을 설명하시오.", "비타민 D의 기능과 결핍증을 설명하시오.", "비타민 E의 기능을 설명하시오.", "비타민 K의 기능을 설명하시오.",
        "수용성 비타민의 종류와 특성을 설명하시오.", "비타민 B군의 기능을 설명하시오.", "비타민 C의 기능과 결핍증을 설명하시오.", "비타민의 손실 원인을 설명하시오.", "제과 시 비타민 보존법을 설명하시오.",
      ],
    },
    {
      title: "무기질과 물",
      description: "다량무기질, 미량무기질, 수분",
      questions: [
        "다량무기질의 종류를 설명하시오.", "칼슘의 기능과 결핍증을 설명하시오.", "철분의 기능과 결핍증을 설명하시오.", "나트륨의 기능과 과잉증을 설명하시오.", "칼륨의 기능을 설명하시오.",
        "미량무기질의 종류를 설명하시오.", "아연의 기능을 설명하시오.", "요오드의 기능을 설명하시오.", "체내 수분의 역할을 설명하시오.", "수분 필요량 산정을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `제과기능사 영양학 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 제과 관련 적용\n4. 시험 출제 포인트\n5. 암기 팁`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/confectioner" className="inline-flex items-center text-orange-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            제과기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">영양학</h1>
          <p className="text-xl text-orange-200">영양소, 탄수화물, 단백질, 지방, 비타민, 무기질</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-orange-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-amber-600">중</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">난이도</p><p className="text-3xl font-bold text-yellow-600">중</p></div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-orange-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-orange-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-3 py-1 rounded-lg text-sm hover:from-orange-600 hover:to-amber-700 transition-colors">AI 도움</button>
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
            <Link href="/category/service/confectioner/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
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
