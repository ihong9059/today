"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "케이크류",
      description: "스펀지, 시폰, 파운드, 롤케이크",
      questions: [
        "버터스펀지케이크 제조법을 설명하시오.", "시폰케이크 제조법을 설명하시오.", "파운드케이크 제조법을 설명하시오.", "젤리롤케이크 제조법을 설명하시오.", "소프트롤케이크 제조법을 설명하시오.",
        "마데라컵케이크 제조법을 설명하시오.", "과일케이크 제조법을 설명하시오.", "브라우니 제조법을 설명하시오.", "치즈케이크 제조법을 설명하시오.", "초코머핀 제조법을 설명하시오.",
      ],
    },
    {
      title: "쿠키류",
      description: "버터쿠키, 스노볼, 아몬드튀일",
      questions: [
        "버터쿠키 제조법을 설명하시오.", "스노볼쿠키 제조법을 설명하시오.", "아몬드튀일 제조법을 설명하시오.", "쿠키 반죽의 특성을 설명하시오.", "짤주머니 사용법을 설명하시오.",
        "쿠키의 적정 굽기 온도를 설명하시오.", "쿠키 보관 방법을 설명하시오.", "드롭쿠키와 아이스박스쿠키의 차이를 설명하시오.", "쿠키 반죽 냉장 휴지의 이유를 설명하시오.", "쿠키 품질 결점과 원인을 설명하시오.",
      ],
    },
    {
      title: "파이/타르트류",
      description: "사과파이, 호두파이, 타르트",
      questions: [
        "파이 반죽(파트 브리제) 제조법을 설명하시오.", "사과파이 제조법을 설명하시오.", "호두파이 제조법을 설명하시오.", "타르트 쉘 제조법을 설명하시오.", "파이의 바삭함을 유지하는 방법을 설명하시오.",
        "파이 반죽 휴지의 이유를 설명하시오.", "파이 필링의 종류를 설명하시오.", "블라인드 베이킹의 목적을 설명하시오.", "파이 굽기 온도와 시간을 설명하시오.", "파이 품질 결점과 원인을 설명하시오.",
      ],
    },
    {
      title: "슈/특수과자류",
      description: "슈, 다쿠아즈, 마들렌, 무스",
      questions: [
        "슈 반죽 제조법을 설명하시오.", "슈 반죽의 원리를 설명하시오.", "다쿠아즈 제조법을 설명하시오.", "마들렌 제조법을 설명하시오.", "무스케이크 제조법을 설명하시오.",
        "젤라틴 사용법을 설명하시오.", "이탈리안 머랭 제조법을 설명하시오.", "슈 굽기 시 주의사항을 설명하시오.", "냉과류 제조 시 주의사항을 설명하시오.", "특수과자류 보관법을 설명하시오.",
      ],
    },
    {
      title: "실기시험 요령",
      description: "재료계량, 작업순서, 위생관리",
      questions: [
        "실기시험 재료 계량 요령을 설명하시오.", "제과 작업 순서 계획을 설명하시오.", "오븐 예열의 중요성을 설명하시오.", "팬닝(팬에 담기) 요령을 설명하시오.", "반죽 비중 맞추는 방법을 설명하시오.",
        "제품 냉각 및 마무리 요령을 설명하시오.", "위생복 착용 기준을 설명하시오.", "작업대 정리정돈 요령을 설명하시오.", "시간 관리 요령을 설명하시오.", "채점 기준별 주의사항을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `제과기능사 실기시험 관련 질문입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 제조 순서 (단계별)\n2. 핵심 포인트\n3. 재료 배합비 (해당 시)\n4. 자주 하는 실수\n5. 채점 시 주의사항`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/confectioner" className="inline-flex items-center text-purple-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            제과기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 대비</h1>
          <p className="text-xl text-purple-200">케이크, 쿠키, 파이, 슈 제조 실습</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제품목</p><p className="text-3xl font-bold text-purple-600">20종</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">시험시간</p><p className="text-3xl font-bold text-violet-600">2~4시간</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">합격기준</p><p className="text-3xl font-bold text-fuchsia-600">60점 이상</p></div>
        </div>

        <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-pink-800 mb-4">채점 기준 (100점 만점)</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { name: "위생상태", weight: "10%", desc: "복장, 청결" },
              { name: "작업순서", weight: "20%", desc: "계량, 반죽, 굽기" },
              { name: "제품외관", weight: "30%", desc: "모양, 색상" },
              { name: "제품내상", weight: "25%", desc: "조직, 기공" },
              { name: "맛/풍미", weight: "15%", desc: "맛의 조화" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-3 text-center">
                <p className="font-bold text-pink-700">{item.name}</p>
                <p className="text-2xl font-bold text-pink-600">{item.weight}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-purple-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-purple-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-violet-600 text-white px-3 py-1 rounded-lg text-sm hover:from-purple-600 hover:to-violet-700 transition-colors">AI 도움</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl p-6">
          <h3 className="font-bold text-purple-800 mb-3">실기시험 준비물</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">👨‍🍳</span><p className="text-sm mt-1">위생복/위생모</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">⚖️</span><p className="text-sm mt-1">전자저울</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🥣</span><p className="text-sm mt-1">볼/거품기</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🧤</span><p className="text-sm mt-1">오븐장갑</p></div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">필기과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/service/confectioner/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생학</span></Link>
            <Link href="/category/service/confectioner/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/confectioner/study/nutrition" className="bg-orange-50 hover:bg-orange-100 rounded-lg p-3 text-center transition-colors"><span className="text-orange-700 font-medium">영양학</span></Link>
            <Link href="/category/service/confectioner/study/baking-theory" className="bg-pink-50 hover:bg-pink-100 rounded-lg p-3 text-center transition-colors"><span className="text-pink-700 font-medium">제과이론</span></Link>
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
