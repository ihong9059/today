"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "복어 손질 (독소 제거)",
      description: "방혈, 껍질, 내장, 난소, 간장 제거",
      questions: [
        "복어 손질 전 준비사항을 설명하시오.", "복어 방혈(피 빼기) 방법을 설명하시오.", "복어 껍질 벗기는 순서를 설명하시오.", "복어 내장 제거 시 주의사항을 설명하시오.", "복어 난소(알) 완벽 제거 방법을 설명하시오.",
      ],
    },
    {
      title: "복어회 (테사)",
      description: "회뜨기, 담음새, 곁들임",
      questions: [
        "복어회용 살 포뜨기 방법을 설명하시오.", "복어회 얇게 썰기 기법을 설명하시오.", "복어회 담음새(모양 만들기)를 설명하시오.", "복어껍질회(가와사시) 만드는 법을 설명하시오.", "복어회 곁들임 준비를 설명하시오.",
      ],
    },
    {
      title: "복어탕/찜",
      description: "지리, 매운탕, 찜 조리",
      questions: [
        "복어탕(지리)의 조리 순서를 설명하시오.", "복어뼈 육수 내는 방법을 설명하시오.", "복어매운탕 조리법을 설명하시오.", "복어찜 조리법을 설명하시오.", "복어탕/찜 담음새를 설명하시오.",
      ],
    },
    {
      title: "복어튀김/구이",
      description: "튀김, 불고기, 구이 조리",
      questions: [
        "복어튀김의 조리법을 설명하시오.", "복어 튀김옷 만드는 법을 설명하시오.", "복어불고기 조리법을 설명하시오.", "복어소금구이 조리법을 설명하시오.", "복어양념구이 조리법을 설명하시오.",
      ],
    },
    {
      title: "위생 및 폐기물 처리",
      description: "도구 세척, 독소 부위 폐기",
      questions: [
        "복어 손질 후 도구 세척 방법을 설명하시오.", "복어 독소 부위 폐기 절차를 설명하시오.", "복어 전용 폐기물통 관리를 설명하시오.", "복어 조리장 청소 방법을 설명하시오.", "복어 손질 완료 후 확인사항을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `복어조리기능사 실기시험 관련 질문입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 조리 순서 (단계별)\n2. 핵심 포인트 (채점 기준)\n3. 독소 제거 주의사항\n4. 자주 하는 실수\n5. 안전 주의사항`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-slate-700 to-zinc-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-pufferfish" className="inline-flex items-center text-slate-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            복어조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 대비</h1>
          <p className="text-xl text-slate-300">복어 손질, 독소 제거, 회/탕/튀김 조리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-slate-600">25문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">시험시간</p><p className="text-3xl font-bold text-zinc-600">60분</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">합격기준</p><p className="text-3xl font-bold text-gray-600">60점 이상</p></div>
        </div>

        <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6 mb-8 border-2 border-red-300">
          <h3 className="font-bold text-red-800 mb-4">⚠️ 실기시험 핵심: 독소 완벽 제거</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-red-700 mb-2">반드시 제거할 부위</h4>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• <strong>난소(알)</strong> - 독성 최강</li>
                <li>• <strong>간장</strong> - 독성 매우 강함</li>
                <li>• <strong>내장 전체</strong> - 모두 제거</li>
                <li>• <strong>눈</strong> - 제거 필수</li>
                <li>• <strong>피</strong> - 완전 방혈</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-bold text-red-700 mb-2">독소 제거 실패 시</h4>
              <ul className="text-sm text-red-600 space-y-1">
                <li>• 즉시 <strong>실격</strong> 처리</li>
                <li>• 채점 대상에서 제외</li>
                <li>• 재시험 필요</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">채점 기준 (100점 만점)</h3>
          <div className="space-y-3">
            {[
              { name: "독소제거", weight: 30, items: "난소, 간장, 내장, 눈 완벽 제거" },
              { name: "위생상태", weight: 20, items: "복장, 개인위생, 도구 관리" },
              { name: "조리과정", weight: 20, items: "손질법, 칼질, 조리순서" },
              { name: "완성품", weight: 20, items: "맛, 색, 형태, 분량" },
              { name: "폐기물처리", weight: 10, items: "독소 부위 안전 폐기" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium">{item.name}</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-slate-500 to-zinc-600" style={{ width: `${item.weight}%` }} /></div>
                <span className="w-10 text-right font-bold text-slate-600">{item.weight}%</span>
                <span className="w-48 text-xs text-gray-500">{item.items}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-slate-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-slate-500 to-zinc-600 text-white px-3 py-1 rounded-lg text-sm hover:from-slate-600 hover:to-zinc-700 transition-colors">AI 도움</button>
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
            <li>• <strong>독소 부위 미제거</strong> (가장 중요!)</li>
            <li>• 위생복, 위생모 미착용</li>
            <li>• 요리 미완성 (시간 내 제출 못함)</li>
            <li>• 독소 부위를 일반 폐기물과 혼합</li>
          </ul>
        </div>

        <div className="mt-8 bg-gradient-to-r from-slate-100 to-zinc-100 rounded-xl p-6">
          <h3 className="font-bold text-slate-800 mb-3">복어 손질 필수 도구</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🔪</span><p className="text-sm mt-1">복어전용 칼</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🧤</span><p className="text-sm mt-1">위생장갑</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🪣</span><p className="text-sm mt-1">독소 폐기통</p></div>
            <div className="bg-white rounded-lg p-3 text-center"><span className="text-2xl">🧊</span><p className="text-sm mt-1">얼음/냉수</p></div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">필기과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/service/cook-pufferfish/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-pufferfish/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-pufferfish/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-pufferfish/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
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
