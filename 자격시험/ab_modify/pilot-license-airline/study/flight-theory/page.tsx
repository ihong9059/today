"use client";

import { useState } from "react";
import Link from "next/link";

export default function FlightTheoryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "제트기 공기역학",
      description: "천음속, 초음속, 고속비행",
      questions: [
        "천음속 영역 특성을 설명하시오.",
        "임계마하수를 설명하시오.",
        "항력발산 마하수를 설명하시오.",
        "충격파 실속을 설명하시오.",
        "마하 터크를 설명하시오.",
        "마하 버핏을 설명하시오.",
        "커핏 코너(Coffin Corner)를 설명하시오.",
        "Dutch Roll을 설명하시오.",
        "요 댐퍼를 설명하시오.",
        "스포일러 기능을 설명하시오.",
      ],
    },
    {
      title: "터보팬 엔진",
      description: "구조, 성능, 운용",
      questions: [
        "터보팬 엔진 구조를 설명하시오.",
        "바이패스비를 설명하시오.",
        "N1/N2 의미를 설명하시오.",
        "EGT/ITT 한계를 설명하시오.",
        "추력 산출을 설명하시오.",
        "FADEC 기능을 설명하시오.",
        "APU 역할을 설명하시오.",
        "역추력장치를 설명하시오.",
        "엔진 시동절차를 설명하시오.",
        "엔진 고장 절차를 설명하시오.",
      ],
    },
    {
      title: "대형기 시스템",
      description: "유압, 전기, FBW, 자동비행",
      questions: [
        "3중 유압시스템을 설명하시오.",
        "RAM Air Turbine을 설명하시오.",
        "Fly-By-Wire 시스템을 설명하시오.",
        "비행제어법칙을 설명하시오.",
        "오토파일럿 모드를 설명하시오.",
        "오토스로틀 기능을 설명하시오.",
        "EFIS/ECAM을 설명하시오.",
        "FMC/FMGC를 설명하시오.",
        "EGPWS 기능을 설명하시오.",
        "TCAS II 운용을 설명하시오.",
      ],
    },
    {
      title: "성능계획",
      description: "이륙/순항/착륙 성능",
      questions: [
        "Balanced Field Length를 설명하시오.",
        "V1/VR/V2/VREF를 설명하시오.",
        "Flex/Derate Takeoff를 설명하시오.",
        "Contaminated Runway를 설명하시오.",
        "Cost Index를 설명하시오.",
        "Step Climb을 설명하시오.",
        "LRC/Mach Schedule을 설명하시오.",
        "착륙중량 제한을 설명하시오.",
        "Autoland 조건을 설명하시오.",
        "Go-Around 절차를 설명하시오.",
      ],
    },
    {
      title: "Human Factors",
      description: "CRM, TEM, 피로관리",
      questions: [
        "CRM의 발전과정을 설명하시오.",
        "TEM(위협오류관리)을 설명하시오.",
        "위협의 종류를 설명하시오.",
        "오류관리 전략을 설명하시오.",
        "Startle Effect를 설명하시오.",
        "Situation Awareness를 설명하시오.",
        "의사결정 모델을 설명하시오.",
        "피로의 영향을 설명하시오.",
        "Circadian Rhythm을 설명하시오.",
        "시차적응 전략을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `운송용조종사 비행이론 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 대형 제트기 운항과 실제 항공사 운용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/pilot-license-airline" className="inline-flex items-center text-violet-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            운송용조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">비행이론</h1>
          <p className="text-xl text-violet-200">제트기 공기역학, 엔진, 시스템, CRM</p>
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
              <li>• Coffin Corner</li>
              <li>• 터보팬/FADEC</li>
              <li>• FBW/자동비행</li>
            </ul>
            <ul className="space-y-1">
              <li>• 성능계획</li>
              <li>• CRM/TEM</li>
              <li>• Human Factors</li>
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
            <Link href="/category/driving/pilot-license-airline/study/aviation-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">항공법규</span></Link>
            <Link href="/category/driving/pilot-license-airline/study/meteorology" className="bg-sky-50 hover:bg-sky-100 rounded-lg p-3 text-center transition-colors"><span className="text-sky-700 font-medium">항공기상</span></Link>
            <Link href="/category/driving/pilot-license-airline/study/navigation" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">항법</span></Link>
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
