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
      title: "밥/국/탕류",
      description: "비빔밥, 콩나물밥, 완자탕",
      questions: [
        "비빔밥의 조리 순서와 핵심 포인트를 설명하시오.",
        "콩나물밥의 조리법과 물 조절을 설명하시오.",
        "장국밥의 육수 만들기를 설명하시오.",
        "완자탕의 완자 만드는 방법을 설명하시오.",
        "생선찌개의 비린내 제거법을 설명하시오.",
      ],
    },
    {
      title: "찌개/전골류",
      description: "두부젓국찌개, 김치찌개",
      questions: [
        "두부젓국찌개의 간 맞추기를 설명하시오.",
        "김치찌개의 맛있게 끓이는 비결을 설명하시오.",
        "된장찌개의 재료 투입 순서를 설명하시오.",
        "순두부찌개의 조리 포인트를 설명하시오.",
        "전골과 찌개의 차이점을 설명하시오.",
      ],
    },
    {
      title: "볶음/조림류",
      description: "제육볶음, 오징어볶음, 두부조림",
      questions: [
        "제육볶음의 양념장 배합을 설명하시오.",
        "오징어볶음의 오징어 손질법을 설명하시오.",
        "두부조림의 두부 물기 제거를 설명하시오.",
        "감자조림의 조림장 만들기를 설명하시오.",
        "볶음 요리의 불 조절 방법을 설명하시오.",
      ],
    },
    {
      title: "구이/전류",
      description: "생선양념구이, 육원전, 생선전",
      questions: [
        "생선양념구이의 양념장 레시피를 설명하시오.",
        "더덕구이의 더덕 손질법을 설명하시오.",
        "육원전(동그랑땡)의 반죽 비율을 설명하시오.",
        "생선전의 밀가루/달걀 입히기를 설명하시오.",
        "풋고추전의 소 만들기를 설명하시오.",
      ],
    },
    {
      title: "김치/기타",
      description: "배추김치, 오이소박이, 잡채",
      questions: [
        "배추김치의 배추 절이기를 설명하시오.",
        "오이소박이의 오이 칼집 넣기를 설명하시오.",
        "나박김치의 국물 만들기를 설명하시오.",
        "잡채의 당면 삶기와 양념을 설명하시오.",
        "탕평채의 청포묵 손질을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `한식조리기능사 실기시험 관련 질문입니다.

"${question}"

이 문제에 대해 상세히 설명해주세요.

다음 순서로 답변해주세요:
1. 조리 순서 (단계별)
2. 핵심 포인트 (채점 기준)
3. 자주 하는 실수
4. 시간 배분 팁
5. 위생 주의사항`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/service/cook-korean" className="inline-flex items-center text-orange-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            한식조리기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험 대비</h1>
          <p className="text-xl text-orange-200">31종 품목 조리법, 채점 포인트, 시간관리</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-orange-600">25문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">시험시간</p>
            <p className="text-3xl font-bold text-amber-600">70분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">합격기준</p>
            <p className="text-3xl font-bold text-yellow-600">60점 이상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 mb-8 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">실기시험 핵심 체크포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
            <ul className="space-y-1">
              <li>• 위생복, 위생모 필수 착용</li>
              <li>• 시간 내 완성 (70분)</li>
              <li>• 재료 손질 균일하게</li>
            </ul>
            <ul className="space-y-1">
              <li>• 불 조절 정확하게</li>
              <li>• 양념 배합 비율 암기</li>
              <li>• 정리정돈 습관화</li>
            </ul>
          </div>
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
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500" style={{ width: `${item.weight}%` }} />
                </div>
                <span className="w-10 text-right font-bold text-orange-600">{item.weight}%</span>
                <span className="w-40 text-xs text-gray-500">{item.items}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-orange-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
                  <svg className={`w-6 h-6 text-gray-400 transition-transform ${expandedTopic === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expandedTopic === index && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start justify-between gap-4 p-3 bg-white rounded-lg">
                        <div className="flex items-start gap-3">
                          <span className="bg-orange-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-lg text-sm hover:from-orange-600 hover:to-amber-600 transition-colors">AI 도움</button>
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
            <Link href="/category/service/cook-korean/study/food-hygiene" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">식품위생법규</span></Link>
            <Link href="/category/service/cook-korean/study/food-science" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">식품학</span></Link>
            <Link href="/category/service/cook-korean/study/cooking-theory" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">조리이론/원가</span></Link>
            <Link href="/category/service/cook-korean/study/public-health" className="bg-purple-50 hover:bg-purple-100 rounded-lg p-3 text-center transition-colors"><span className="text-purple-700 font-medium">공중보건학</span></Link>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">AI 도우미 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
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
