"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function FoodHygieneStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "식품위생법",
      description: "법의 목적, 용어정의, 복어 관련 규정",
      questions: [
        "식품위생법의 목적을 설명하시오.", "식품위생법에서 정의하는 '식품'이란 무엇인가?", "식품위생법상 '영업'의 정의를 설명하시오.", "복어 취급 영업의 허가 요건을 설명하시오.", "복어조리기능사 자격 없이 복어를 조리할 경우 처벌을 설명하시오.",
        "식품위생법상 복어 판매업소의 준수사항을 설명하시오.", "복어 취급업소의 표시 의무를 설명하시오.", "식품위생법 위반 시 행정처분의 종류를 설명하시오.", "식품위생법상 식품위생감시원의 역할을 설명하시오.", "복어 관련 자가품질검사 제도를 설명하시오.",
      ],
    },
    {
      title: "HACCP 제도",
      description: "위해요소중점관리기준, 7원칙, 복어 HACCP",
      questions: [
        "HACCP의 정의와 목적을 설명하시오.", "HACCP의 7원칙을 나열하고 설명하시오.", "HACCP의 12절차를 순서대로 나열하시오.", "HACCP에서 CCP(중요관리점)란 무엇인가?", "복어 조리에서 CCP를 설명하시오.",
        "HACCP에서 모니터링 절차를 설명하시오.", "복어 독소 제거의 한계기준을 설명하시오.", "HACCP에서 검증절차를 설명하시오.", "HACCP에서 기록유지 절차를 설명하시오.", "HACCP 선행요건 프로그램을 설명하시오.",
      ],
    },
    {
      title: "복어 중독 예방",
      description: "테트로도톡신, 중독증상, 응급처치",
      questions: [
        "테트로도톡신(TTX)의 특성을 설명하시오.", "복어독의 열 안정성을 설명하시오.", "복어 중독의 증상을 단계별로 설명하시오.", "복어 중독 시 응급처치 방법을 설명하시오.", "복어 부위별 독성 강도를 설명하시오.",
        "복어 종류별 독성 차이를 설명하시오.", "복어 독소의 계절별 변화를 설명하시오.", "복어 중독 발생 시 보고 절차를 설명하시오.", "복어 중독 예방을 위한 관리방법을 설명하시오.", "복어 독소의 치사량을 설명하시오.",
      ],
    },
    {
      title: "개인위생관리",
      description: "손씻기, 복장, 건강관리",
      questions: [
        "조리종사자의 개인위생관리 기준을 설명하시오.", "올바른 손씻기 6단계를 설명하시오.", "복어 손질 시 위생장갑 착용 이유를 설명하시오.", "조리종사자의 복장 규정을 설명하시오.", "조리종사자의 건강진단 기준을 설명하시오.",
        "조리종사자가 조리를 금지해야 하는 질병을 설명하시오.", "개인위생 점검표의 항목을 설명하시오.", "손 소독제의 올바른 사용법을 설명하시오.", "장신구 착용 제한 이유를 설명하시오.", "조리종사자 위생교육의 내용을 설명하시오.",
      ],
    },
    {
      title: "조리장 위생관리",
      description: "시설기준, 소독, 폐기물관리",
      questions: [
        "복어 취급업소의 시설기준을 설명하시오.", "복어 전용 도마, 칼의 관리를 설명하시오.", "조리장의 환기시설 기준을 설명하시오.", "조리장의 조명 기준을 설명하시오.", "복어 손질 도구의 세척 및 소독방법을 설명하시오.",
        "복어 독소 부위 폐기 방법을 설명하시오.", "냉장고, 냉동고의 온도관리 기준을 설명하시오.", "복어 보관 시 주의사항을 설명하시오.", "복어 폐기물 전용용기 관리를 설명하시오.", "복어 취급업소 청소 및 소독 방법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `복어조리기능사 식품위생 및 법규 과목 문제입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 핵심 개념 정리\n2. 상세 설명\n3. 복어 관련 특별 규정\n4. 시험 출제 포인트\n5. 암기 팁`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-pufferfish" className="inline-flex items-center text-red-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            복어조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">식품위생 및 법규</h1>
          <p className="text-xl text-red-200">식품위생법, HACCP, 복어 중독 예방, 위생관리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-red-600">50문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">출제비중</p><p className="text-3xl font-bold text-rose-600">15문항/60</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">난이도</p><p className="text-3xl font-bold text-pink-600">중상</p></div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-red-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-red-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-red-500 to-rose-600 text-white px-3 py-1 rounded-lg text-sm hover:from-red-600 hover:to-rose-700 transition-colors">AI 도움</button>
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
            <Link href="/category/service/cook-pufferfish/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
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
