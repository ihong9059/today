"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function EngineStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "선박기관 기초",
      description: "내연기관, 가솔린, 디젤",
      questions: [
        "내연기관의 정의와 종류를 설명하시오.",
        "4행정 사이클 엔진을 설명하시오.",
        "2행정 사이클 엔진을 설명하시오.",
        "가솔린 엔진과 디젤 엔진 차이를 설명하시오.",
        "선외기(아웃보드) 구조를 설명하시오.",
        "선내외기(스턴드라이브) 구조를 설명하시오.",
        "선내기(인보드) 구조를 설명하시오.",
        "엔진 출력과 토크를 설명하시오.",
        "압축비의 의미를 설명하시오.",
        "점화순서를 설명하시오.",
      ],
    },
    {
      title: "연료 및 윤활",
      description: "연료장치, 윤활유, 냉각",
      questions: [
        "연료탱크 구조와 관리를 설명하시오.",
        "연료필터의 역할을 설명하시오.",
        "연료펌프의 종류를 설명하시오.",
        "기화기(카뷰레터)의 원리를 설명하시오.",
        "전자연료분사(EFI) 장치를 설명하시오.",
        "윤활유의 역할을 설명하시오.",
        "윤활유 점도와 규격을 설명하시오.",
        "윤활유 교환주기를 설명하시오.",
        "냉각장치의 종류를 설명하시오.",
        "수냉식 냉각장치 구성을 설명하시오.",
      ],
    },
    {
      title: "전기 및 시동장치",
      description: "배터리, 시동, 점화, 충전",
      questions: [
        "선박용 배터리 종류를 설명하시오.",
        "배터리 관리방법을 설명하시오.",
        "시동장치 구성을 설명하시오.",
        "시동모터 작동원리를 설명하시오.",
        "점화장치 구성을 설명하시오.",
        "점화플러그 역할과 점검을 설명하시오.",
        "전자점화(CDI) 장치를 설명하시오.",
        "충전장치(발전기) 구성을 설명하시오.",
        "배선도 읽는 방법을 설명하시오.",
        "전기계통 고장진단을 설명하시오.",
      ],
    },
    {
      title: "추진 및 조향장치",
      description: "프로펠러, 추진축, 조향",
      questions: [
        "프로펠러의 구조를 설명하시오.",
        "프로펠러 피치와 직경을 설명하시오.",
        "프로펠러 재질과 특성을 설명하시오.",
        "프로펠러 손상과 점검을 설명하시오.",
        "추진축 구조를 설명하시오.",
        "기어박스(역전감속기)를 설명하시오.",
        "워터젯 추진장치를 설명하시오.",
        "조타장치 구조를 설명하시오.",
        "케이블 조향장치를 설명하시오.",
        "유압 조향장치를 설명하시오.",
      ],
    },
    {
      title: "정비 및 고장진단",
      description: "일상점검, 고장원인, 수리",
      questions: [
        "출항 전 엔진 점검사항을 설명하시오.",
        "운항 중 엔진 점검사항을 설명하시오.",
        "귀항 후 엔진 관리를 설명하시오.",
        "동계 보관 시 조치사항을 설명하시오.",
        "엔진 시동불량 원인을 설명하시오.",
        "엔진 과열 원인과 대책을 설명하시오.",
        "출력저하 원인을 설명하시오.",
        "비정상 진동/소음 원인을 설명하시오.",
        "연료계통 고장진단을 설명하시오.",
        "냉각수 부족/누수 대응을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `소형선박조종사 기관 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 선박 기관의 구조와 정비 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/boat-license" className="inline-flex items-center text-orange-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            소형선박조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">기관</h1>
          <p className="text-xl text-orange-200">선박기관, 연료/윤활, 전기, 추진장치, 정비</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-orange-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-red-600">20%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-amber-600">중</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">기관 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
            <ul className="space-y-1">
              <li>• 2행정/4행정 엔진 차이</li>
              <li>• 선외기/선내외기/선내기 구분</li>
              <li>• 연료·윤활·냉각 장치</li>
            </ul>
            <ul className="space-y-1">
              <li>• 프로펠러 피치/직경</li>
              <li>• 출항 전 점검사항</li>
              <li>• 고장원인 및 응급조치</li>
            </ul>
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
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm hover:from-orange-600 hover:to-red-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/boat-license/study/navigation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">항해</span></Link>
            <Link href="/category/driving/boat-license/study/seamanship" className="bg-teal-50 hover:bg-teal-100 rounded-lg p-3 text-center transition-colors"><span className="text-teal-700 font-medium">운용</span></Link>
            <Link href="/category/driving/boat-license/study/maritime-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">법규</span></Link>
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
