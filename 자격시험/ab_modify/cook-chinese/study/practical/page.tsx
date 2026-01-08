"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "면류",
      description: "짜장면, 짬뽕, 울면",
      questions: [
        "짜장면의 조리 순서를 설명하시오.", "유니짜장의 조리법을 설명하시오.", "짬뽕의 조리법을 설명하시오.", "삼선짬뽕의 조리법을 설명하시오.", "울면의 조리법을 설명하시오.",
      ],
    },
    {
      title: "밥류/만두",
      description: "볶음밥, 덮밥, 만두",
      questions: [
        "새우볶음밥의 조리법을 설명하시오.", "게살볶음밥의 조리법을 설명하시오.", "송이덮밥의 조리법을 설명하시오.", "잡채밥의 조리법을 설명하시오.", "물만두/군만두의 조리법을 설명하시오.",
      ],
    },
    {
      title: "튀김류",
      description: "탕수육, 깐풍기, 깐쇼새우",
      questions: [
        "탕수육의 조리 순서를 설명하시오.", "깐풍기의 조리법을 설명하시오.", "라조기의 조리법을 설명하시오.", "유린기의 조리법을 설명하시오.", "깐쇼새우의 조리법을 설명하시오.",
      ],
    },
    {
      title: "볶음류",
      description: "고추잡채, 팔보채, 마파두부",
      questions: [
        "고추잡채의 조리법을 설명하시오.", "부추잡채의 조리법을 설명하시오.", "팔보채의 조리법을 설명하시오.", "마파두부의 조리법을 설명하시오.", "어향육사의 조리법을 설명하시오.",
      ],
    },
    {
      title: "냉채/탕류",
      description: "양장피, 해파리냉채, 탕류",
      questions: [
        "양장피의 조리법을 설명하시오.", "해파리냉채의 조리법을 설명하시오.", "오이냉국의 조리법을 설명하시오.", "해삼전복탕의 조리법을 설명하시오.", "유산슬의 조리법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `중식조리기능사 실기시험 관련 질문입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 조리 순서 (단계별)\n2. 핵심 포인트 (채점 기준)\n3. 자주 하는 실수\n4. 시간 배분 팁\n5. 위생 주의사항`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="bg-gradient-to-r from-rose-600 to-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-chinese" className="inline-flex items-center text-rose-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            중식조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 대비</h1>
          <p className="text-xl text-rose-200">30종 품목 조리법, 채점 포인트, 시간관리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-rose-600">25문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">시험시간</p><p className="text-3xl font-bold text-red-600">70분</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">합격기준</p><p className="text-3xl font-bold text-pink-600">60점 이상</p></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">채점 기준 (100점 만점)</h3>
          <div className="space-y-3">
            {[
              { name: "위생상태", weight: 20, items: "복장, 개인위생, 조리대 청결" },
              { name: "조리과정", weight: 30, items: "재료손질, 불조절, 조리순서" },
              { name: "완성품", weight: 40, items: "맛, 색, 형태, 분량, 온도" },
              { name: "정리정돈", weight: 10, items: "설거지, 쓰레기처리" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">{item.name}</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-rose-500 to-red-500" style={{ width: `${item.weight}%` }} /></div>
                <span className="w-10 text-right font-bold text-rose-600">{item.weight}%</span>
                <span className="w-40 text-xs text-gray-500">{item.items}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-rose-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-rose-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-rose-500 to-red-500 text-white px-3 py-1 rounded-lg text-sm hover:from-rose-600 hover:to-red-600 transition-colors">AI 도움</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">실격 사유</h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• 위생복, 위생모 미착용</li>
            <li>• 요리 미완성 (시간 내 제출 못함)</li>
            <li>• 재료를 심하게 태우거나 오염시킨 경우</li>
            <li>• 지정된 요리가 아닌 다른 요리를 만든 경우</li>
          </ul>
        </div>

        <div className="mt-8 bg-gradient-to-r from-rose-100 to-red-100 rounded-xl p-6">
          <h3 className="font-bold text-red-800 mb-3">중식조리 필수 기술</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🔥</span><p className="text-sm mt-1">센 불 조절</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🥘</span><p className="text-sm mt-1">웍 다루기</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🔪</span><p className="text-sm mt-1">칼질 기술</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">⏱️</span><p className="text-sm mt-1">시간 관리</p></div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">필기과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/service/cook-chinese/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-chinese/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-chinese/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-chinese/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
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
