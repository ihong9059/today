"use client";

import { useState } from "react";
import Link from "next/link";

export default function FoodScienceStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "탄수화물",
      description: "당류, 전분, 식이섬유",
      questions: [
        "탄수화물의 정의와 분류를 설명하시오.", "단당류의 종류와 특성을 설명하시오.", "이당류의 종류와 특성을 설명하시오.", "다당류의 종류와 특성을 설명하시오.", "전분의 호화(α화)를 설명하시오.",
        "전분의 노화(β화)를 설명하시오.", "전분의 호정화(덱스트린화)를 설명하시오.", "캐러멜화 반응을 설명하시오.", "마이야르 반응을 설명하시오.", "식이섬유의 종류와 기능을 설명하시오.",
      ],
    },
    {
      title: "단백질",
      description: "아미노산, 변성, 효소",
      questions: [
        "단백질의 정의와 구조를 설명하시오.", "필수 아미노산의 종류를 나열하시오.", "단백질의 분류를 설명하시오.", "단백질의 변성을 설명하시오.", "단백질의 열변성을 설명하시오.",
        "산에 의한 단백질 변성을 설명하시오.", "효소의 특성과 작용을 설명하시오.", "육류 단백질의 특성을 설명하시오.", "계란 단백질의 특성을 설명하시오.", "우유 단백질의 특성을 설명하시오.",
      ],
    },
    {
      title: "지방",
      description: "지방산, 산패, 유화",
      questions: [
        "지방의 정의와 분류를 설명하시오.", "포화지방산과 불포화지방산의 차이를 설명하시오.", "필수지방산의 종류와 기능을 설명하시오.", "지방의 산패를 설명하시오.", "자동산화를 설명하시오.",
        "가열산화를 설명하시오.", "유화(emulsion)를 설명하시오.", "튀김 시 기름의 변화를 설명하시오.", "식용유의 종류와 특성을 설명하시오.", "트랜스지방산의 특성과 위해성을 설명하시오.",
      ],
    },
    {
      title: "비타민과 무기질",
      description: "수용성/지용성 비타민, 미네랄",
      questions: [
        "비타민의 분류를 설명하시오.", "지용성 비타민(A, D, E, K)의 특성을 설명하시오.", "수용성 비타민(B군, C)의 특성을 설명하시오.", "비타민 A의 기능과 급원식품을 설명하시오.", "비타민 C의 기능과 특성을 설명하시오.",
        "조리에 의한 비타민 손실을 설명하시오.", "무기질의 분류를 설명하시오.", "칼슘의 기능과 급원식품을 설명하시오.", "철분의 기능과 급원식품을 설명하시오.", "나트륨과 건강의 관계를 설명하시오.",
      ],
    },
    {
      title: "식품의 색과 맛",
      description: "색소, 갈변, 향미",
      questions: [
        "식품의 색소 분류를 설명하시오.", "클로로필(엽록소)의 특성을 설명하시오.", "카로티노이드의 특성을 설명하시오.", "안토시아닌의 특성을 설명하시오.", "효소적 갈변반응을 설명하시오.",
        "비효소적 갈변반응을 설명하시오.", "갈변 방지법을 설명하시오.", "맛의 종류(5미)를 설명하시오.", "맛의 상호작용을 설명하시오.", "식품의 향미 성분을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `중식조리기능사 식품학 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 중식 조리 적용 사례\n4. 시험 출제 포인트\n5. 암기 팁`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-chinese" className="inline-flex items-center text-green-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            중식조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">식품학</h1>
          <p className="text-xl text-green-200">영양소, 식품 성분, 조리 시 변화</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-green-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-emerald-600">15문항/60</p></div>
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
            <Link href="/category/service/cook-chinese/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-chinese/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-chinese/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
            <Link href="/category/service/cook-chinese/study/practical" className="bg-rose-50 hover:bg-rose-100 rounded-lg p-3 text-center transition-colors"><span className="text-rose-700 font-medium">실기</span></Link>
          </div>
        </div>
      </div>

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
