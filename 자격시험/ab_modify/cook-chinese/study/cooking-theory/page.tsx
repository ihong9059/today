"use client";

import { useState } from "react";
import Link from "next/link";

export default function CookingTheoryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "중식 기초",
      description: "중식조리 특징, 지역별 요리, 조리도구",
      questions: [
        "중국요리의 4대 요리 계통을 설명하시오.", "산동요리(노채)의 특징을 설명하시오.", "사천요리(천채)의 특징을 설명하시오.", "광동요리(월채)의 특징을 설명하시오.", "상해요리(소채)의 특징을 설명하시오.",
        "웍(중화팬)의 특성과 사용법을 설명하시오.", "중식도의 종류와 용도를 설명하시오.", "중식조리의 기본 썰기법을 설명하시오.", "중식에서 기름 온도 관리를 설명하시오.", "중식의 불 조절 기술을 설명하시오.",
      ],
    },
    {
      title: "중식 조리법",
      description: "볶기, 튀기기, 찌기, 끓이기",
      questions: [
        "차오(炒, 볶음)의 조리법을 설명하시오.", "자(炸, 튀김)의 조리법을 설명하시오.", "젠(煎, 지짐)의 조리법을 설명하시오.", "정(蒸, 찜)의 조리법을 설명하시오.", "둔(燉, 끓임)의 조리법을 설명하시오.",
        "류(溜, 녹말볶음)의 조리법을 설명하시오.", "훙사오(紅燒)의 조리법을 설명하시오.", "파오(爆, 센불볶음)의 조리법을 설명하시오.", "뤄(烙, 굽기)의 조리법을 설명하시오.", "훈제(熏製)의 조리법을 설명하시오.",
      ],
    },
    {
      title: "중식 재료",
      description: "향신료, 소스, 특수재료",
      questions: [
        "중식의 기본 조미료를 설명하시오.", "두반장의 특성과 용도를 설명하시오.", "하오유(굴소스)의 특성과 용도를 설명하시오.", "두시(黑豆醬)의 특성과 용도를 설명하시오.", "화자오(花椒)의 특성과 용도를 설명하시오.",
        "팔각(八角)의 특성과 용도를 설명하시오.", "목이버섯의 특성과 사용법을 설명하시오.", "죽순의 특성과 사용법을 설명하시오.", "건해삼의 불리는 방법을 설명하시오.", "두부 종류와 조리법을 설명하시오.",
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
      description: "웍, 찜기, 튀김기 관리",
      questions: [
        "웍(중화팬)의 길들이기 방법을 설명하시오.", "중화렌지의 특성을 설명하시오.", "딤섬 찜기의 사용법을 설명하시오.", "튀김기의 기름 관리를 설명하시오.", "중식도의 관리 방법을 설명하시오.",
        "도마의 재질별 특성을 설명하시오.", "냉장고 온도 관리를 설명하시오.", "조리기구 세척 및 소독을 설명하시오.", "가스 기기 안전 관리를 설명하시오.", "주방 기기 예방정비를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `중식조리기능사 조리이론과 원가계산 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 실무 적용 사례\n4. 시험 출제 포인트\n5. 계산 문제 예시 (해당 시)`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-chinese" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            중식조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">조리이론과 원가계산</h1>
          <p className="text-xl text-blue-200">중식조리법, 재료, 원가계산, 기기관리</p>
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
            <Link href="/category/service/cook-chinese/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-chinese/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
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
