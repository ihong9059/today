"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "수프류",
      description: "콘소메, 차우더, 포타주",
      questions: [
        "콘소메 수프의 조리 순서를 설명하시오.", "피시 차우더의 조리법을 설명하시오.", "미네스트로네의 조리법을 설명하시오.", "비시수아즈의 조리법을 설명하시오.", "수프 맑게 만드는 방법을 설명하시오.",
      ],
    },
    {
      title: "소스류",
      description: "브라운소스, 화이트소스, 홀란다이즈",
      questions: [
        "브라운 루(Roux)의 조리법을 설명하시오.", "브라운 소스의 조리법을 설명하시오.", "베샤멜 소스의 조리법을 설명하시오.", "홀란다이즈 소스의 조리법을 설명하시오.", "타르타르 소스의 조리법을 설명하시오.",
      ],
    },
    {
      title: "육류/가금류",
      description: "스테이크, 커틀릿, 로스트",
      questions: [
        "비프 스테이크 굽기 단계를 설명하시오.", "비프 커틀릿의 조리법을 설명하시오.", "폭 커틀릿의 조리법을 설명하시오.", "치킨 커틀릿의 조리법을 설명하시오.", "로스트 치킨의 조리법을 설명하시오.",
      ],
    },
    {
      title: "해산물/에그류",
      description: "생선뫼니에르, 오믈렛, 수란",
      questions: [
        "생선 뫼니에르의 조리법을 설명하시오.", "관자 버터구이의 조리법을 설명하시오.", "플레인 오믈렛의 조리법을 설명하시오.", "포치드 에그의 조리법을 설명하시오.", "스크램블 에그의 조리법을 설명하시오.",
      ],
    },
    {
      title: "샐러드/기타",
      description: "시저샐러드, 샌드위치, 파스타",
      questions: [
        "시저 샐러드의 조리법을 설명하시오.", "발도프 샐러드의 조리법을 설명하시오.", "BLT 샌드위치의 조리법을 설명하시오.", "스파게티 카르보나라의 조리법을 설명하시오.", "알리오 올리오의 조리법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `양식조리기능사 실기시험 관련 질문입니다.\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요.\n\n다음 순서로 답변해주세요:\n1. 조리 순서 (단계별)\n2. 핵심 포인트 (채점 기준)\n3. 자주 하는 실수\n4. 시간 배분 팁\n5. 위생 주의사항`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-western" className="inline-flex items-center text-indigo-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            양식조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 대비</h1>
          <p className="text-xl text-indigo-200">30종 품목 조리법, 채점 포인트, 시간관리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">총 문항수</p><p className="text-3xl font-bold text-indigo-600">25문항</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">시험시간</p><p className="text-3xl font-bold text-blue-600">70분</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><p className="text-gray-600 text-sm">합격기준</p><p className="text-3xl font-bold text-cyan-600">60점 이상</p></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="font-bold text-gray-800 mb-4">📋 채점 기준 (100점 만점)</h3>
          <div className="space-y-3">
            {[
              { name: "위생상태", weight: 20, items: "복장, 개인위생, 조리대 청결" },
              { name: "조리과정", weight: 30, items: "재료손질, 조리순서, 불조절" },
              { name: "완성품", weight: 40, items: "맛, 색, 형태, 분량, 온도" },
              { name: "정리정돈", weight: 10, items: "설거지, 쓰레기처리" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="w-20 text-sm font-medium">{item.name}</span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500" style={{ width: `${item.weight}%` }} /></div>
                <span className="w-10 text-right font-bold text-indigo-600">{item.weight}%</span>
                <span className="w-40 text-xs text-gray-500">{item.items}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-indigo-50 transition-colors">
                <div className="text-left"><h3 className="text-xl font-bold text-gray-800">{topic.title}</h3><p className="text-gray-600">{topic.description}</p></div>
                <div className="flex items-center gap-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3"><span className="bg-indigo-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span><span className="text-gray-700">{question}</span></div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:from-indigo-600 hover:to-blue-600 transition-colors">AI 도움</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">⚠️ 실격 사유</h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• 위생복, 위생모 미착용</li>
            <li>• 요리 미완성 (시간 내 제출 못함)</li>
            <li>• 재료를 심하게 태우거나 오염시킨 경우</li>
            <li>• 지정된 요리가 아닌 다른 요리를 만든 경우</li>
          </ul>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">필기과목 학습하기</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/category/service/cook-western/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-western/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-western/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-western/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
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
