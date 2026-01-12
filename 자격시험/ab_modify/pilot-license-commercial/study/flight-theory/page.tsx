"use client";

import { useState } from "react";
import Link from "next/link";

export default function FlightTheoryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "고급 공기역학",
      description: "고속비행, 압축성, 천음속",
      questions: [
        "압축성 유동을 설명하시오.",
        "마하수를 설명하시오.",
        "천음속 영역을 설명하시오.",
        "충격파를 설명하시오.",
        "항력발산 마하수를 설명하시오.",
        "면적법칙을 설명하시오.",
        "후퇴익 효과를 설명하시오.",
        "초과속도 제한을 설명하시오.",
        "고속 실속을 설명하시오.",
        "마하 터크를 설명하시오.",
      ],
    },
    {
      title: "비행성능 심화",
      description: "이륙/상승/순항/착륙 성능",
      questions: [
        "이륙성능 계산을 설명하시오.",
        "V1, VR, V2 속도를 설명하시오.",
        "가속정지거리를 설명하시오.",
        "이륙결심속도를 설명하시오.",
        "상승성능 계산을 설명하시오.",
        "서비스 상승한도를 설명하시오.",
        "순항성능 최적화를 설명하시오.",
        "장거리 순항 기법을 설명하시오.",
        "착륙성능 계산을 설명하시오.",
        "습윤활주로 성능저하를 설명하시오.",
      ],
    },
    {
      title: "중량 및 평형",
      description: "무게중심, 적재, 안정성",
      questions: [
        "기본공허중량을 설명하시오.",
        "최대이륙중량을 설명하시오.",
        "최대착륙중량을 설명하시오.",
        "제로연료중량을 설명하시오.",
        "무게중심(CG) 계산을 설명하시오.",
        "MAC(평균공력시위)을 설명하시오.",
        "CG 이동 계산을 설명하시오.",
        "CG 한계를 설명하시오.",
        "전방 CG의 영향을 설명하시오.",
        "후방 CG의 영향을 설명하시오.",
      ],
    },
    {
      title: "다발엔진 운용",
      description: "비대칭 추력, 단발 비행",
      questions: [
        "비대칭 추력을 설명하시오.",
        "임계발동기를 설명하시오.",
        "VMC(최소조종속도)를 설명하시오.",
        "VMCA와 VMCG를 설명하시오.",
        "단발 상승성능을 설명하시오.",
        "단발 천장고도를 설명하시오.",
        "엔진고장 절차를 설명하시오.",
        "프로펠러 깃각 조정을 설명하시오.",
        "페더링을 설명하시오.",
        "드리프트 다운을 설명하시오.",
      ],
    },
    {
      title: "항공기 시스템",
      description: "유압, 전기, 연료, 여압",
      questions: [
        "유압시스템 구성을 설명하시오.",
        "이중 유압시스템을 설명하시오.",
        "전기시스템 구성을 설명하시오.",
        "발전기/교류기를 설명하시오.",
        "배터리 시스템을 설명하시오.",
        "연료시스템 구성을 설명하시오.",
        "연료 이송과 균형을 설명하시오.",
        "여압시스템을 설명하시오.",
        "객실고도 제어를 설명하시오.",
        "비상감압 절차를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `사업용조종사 비행이론 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 공기역학 원리와 실제 운항 적용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/pilot-license-commercial" className="inline-flex items-center text-violet-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            사업용조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">비행이론</h1>
          <p className="text-xl text-violet-200">고급공기역학, 성능, 중량평형, 시스템</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-violet-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-indigo-600">30%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-purple-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-6 mb-8 border border-violet-200">
          <h3 className="font-bold text-violet-800 mb-3">비행이론 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-violet-700">
            <ul className="space-y-1">
              <li>• V1/VR/V2 속도</li>
              <li>• VMC/VMCA/VMCG</li>
              <li>• 무게중심 계산</li>
            </ul>
            <ul className="space-y-1">
              <li>• 단발엔진 비행</li>
              <li>• 고속비행 특성</li>
              <li>• 시스템 구성</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-violet-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-violet-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm hover:from-violet-600 hover:to-indigo-700 transition-colors">AI 도움</button>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/category/driving/pilot-license-commercial/study/aviation-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">항공법규</span></Link>
            <Link href="/category/driving/pilot-license-commercial/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/pilot-license-commercial/study/navigation" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">항법</span></Link>
          </div>
        </div>
      </div>

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
