"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "회/초밥류",
      description: "모듬회, 생선초밥, 김초밥",
      questions: [
        "모듬회의 조리 순서를 설명하시오.", "생선초밥(니기리즈시)의 조리법을 설명하시오.", "김초밥(마끼즈시)의 조리법을 설명하시오.", "참치김밥의 조리법을 설명하시오.", "초밥용 밥(샤리) 만들기를 설명하시오.",
      ],
    },
    {
      title: "구이/조림류",
      description: "소금구이, 간장구이, 조림",
      questions: [
        "삼치소금구이의 조리법을 설명하시오.", "장어소금구이의 조리법을 설명하시오.", "소고기간장구이의 조리법을 설명하시오.", "도미조림의 조리법을 설명하시오.", "전복버터구이의 조리법을 설명하시오.",
      ],
    },
    {
      title: "튀김/덮밥류",
      description: "새우튀김, 돈가스, 덮밥",
      questions: [
        "새우튀김(에비텐)의 조리법을 설명하시오.", "야채튀김의 조리법을 설명하시오.", "돈가스의 조리법을 설명하시오.", "새우튀김덮밥(텐동)의 조리법을 설명하시오.", "규동(소고기덮밥)의 조리법을 설명하시오.",
      ],
    },
    {
      title: "국/찜류",
      description: "맑은국, 된장국, 술찜",
      questions: [
        "도미머리맑은국의 조리법을 설명하시오.", "대합맑은국의 조리법을 설명하시오.", "미소시루(된장국)의 조리법을 설명하시오.", "도미술찜의 조리법을 설명하시오.", "달걀찜(차왕무시)의 조리법을 설명하시오.",
      ],
    },
    {
      title: "면/초회류",
      description: "우동, 소바, 초회",
      questions: [
        "우동의 조리법을 설명하시오.", "냉우동(자루우동)의 조리법을 설명하시오.", "메밀국수(소바)의 조리법을 설명하시오.", "문어초회의 조리법을 설명하시오.", "해삼초회의 조리법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `일식조리기능사 실기시험 관련 질문입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 조리 순서 (단계별)\n2. 핵심 포인트 (채점 기준)\n3. 자주 하는 실수\n4. 시간 배분 팁\n5. 위생 주의사항`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="bg-gradient-to-r from-cyan-600 to-teal-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-japanese" className="inline-flex items-center text-cyan-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            일식조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 대비</h1>
          <p className="text-xl text-cyan-200">30종 품목 조리법, 채점 포인트, 시간관리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-cyan-600">25문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">시험시간</p><p className="text-3xl font-bold text-teal-600">70분</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">합격기준</p><p className="text-3xl font-bold text-emerald-600">60점 이상</p></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">채점 기준 (100점 만점)</h3>
          <div className="space-y-3">
            {[
              { name: "위생상태", weight: 20, items: "복장, 개인위생, 조리대 청결" },
              { name: "조리과정", weight: 30, items: "재료손질, 칼질, 조리순서" },
              { name: "완성품", weight: 40, items: "맛, 색, 형태, 분량, 온도" },
              { name: "정리정돈", weight: 10, items: "설거지, 쓰레기처리" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">{item.name}</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500" style={{ width: `${item.weight}%` }} /></div>
                <span className="w-10 text-right font-bold text-cyan-600">{item.weight}%</span>
                <span className="w-40 text-xs text-gray-500">{item.items}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-cyan-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-cyan-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 py-1 rounded-lg text-sm hover:from-cyan-600 hover:to-teal-600 transition-colors">AI 도움</button>
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

        <div className="mt-8 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-xl p-6">
          <h3 className="font-bold text-cyan-800 mb-3">일식조리 필수 기술</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🔪</span><p className="text-sm mt-1">사시미 썰기</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🍣</span><p className="text-sm mt-1">초밥 쥐기</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🐟</span><p className="text-sm mt-1">생선 손질</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🍱</span><p className="text-sm mt-1">담음새</p></div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">필기과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/service/cook-japanese/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-japanese/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-japanese/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-japanese/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
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
