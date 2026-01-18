"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function CraneOperationStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "조종장치 구조",
      description: "레버, 페달, 계기판 조작",
      questions: [
        "기중기 권상/권하 레버 조작방법을 설명하시오.",
        "선회 레버의 기능과 조작법을 설명하시오.",
        "붐 기복(상승/하강) 레버를 설명하시오.",
        "붐 신축(텔레스코픽) 조작을 설명하시오.",
        "주행 레버의 기능을 설명하시오.",
        "아웃트리거 조작 레버를 설명하시오.",
        "엔진 스로틀 레버 사용법을 설명하시오.",
        "비상정지 스위치의 위치와 사용을 설명하시오.",
        "계기판의 주요 경고등 의미를 설명하시오.",
        "과부하 방지장치(OLP) 표시를 설명하시오.",
      ],
    },
    {
      title: "권상/권하 작업",
      description: "후크 조작, 하중 인양/하강",
      questions: [
        "권상 작업 절차를 설명하시오.",
        "권하 작업 시 주의사항을 설명하시오.",
        "후크 위치 확인방법을 설명하시오.",
        "와이어로프 감김 확인을 설명하시오.",
        "인양물 균형잡기를 설명하시오.",
        "급격한 권상/권하 방지법을 설명하시오.",
        "미세 조정(인칭) 작업을 설명하시오.",
        "권상 높이 한계 확인을 설명하시오.",
        "권상 속도 조절요령을 설명하시오.",
        "권상 작업 중 비상정지를 설명하시오.",
      ],
    },
    {
      title: "선회/이동 작업",
      description: "선회조작, 붐 이동, 주행",
      questions: [
        "선회 작업 절차를 설명하시오.",
        "선회 브레이크의 기능을 설명하시오.",
        "선회 시 원심력 영향을 설명하시오.",
        "붐 기복과 선회 복합작업을 설명하시오.",
        "붐 신축 작업 시 주의사항을 설명하시오.",
        "작업반경과 정격하중 관계를 설명하시오.",
        "기중기 주행 시 붐 위치를 설명하시오.",
        "경사지 주행 시 안전조치를 설명하시오.",
        "협소공간 선회 작업을 설명하시오.",
        "장애물 회피 선회법을 설명하시오.",
      ],
    },
    {
      title: "아웃트리거 설치",
      description: "설치절차, 지반확인, 안전장치",
      questions: [
        "아웃트리거의 기능과 종류를 설명하시오.",
        "아웃트리거 설치 절차를 설명하시오.",
        "아웃트리거 설치 지반확인을 설명하시오.",
        "아웃트리거 받침판 사용을 설명하시오.",
        "아웃트리거 수평조정 방법을 설명하시오.",
        "아웃트리거 완전인출 확인을 설명하시오.",
        "연약지반 아웃트리거 설치를 설명하시오.",
        "아웃트리거 잠금장치 확인을 설명하시오.",
        "아웃트리거 철거 절차를 설명하시오.",
        "아웃트리거 미설치 작업 금지를 설명하시오.",
      ],
    },
    {
      title: "정격하중 및 작업계획",
      description: "하중표, 작업반경, 안전율",
      questions: [
        "정격하중표 읽는 방법을 설명하시오.",
        "작업반경 측정방법을 설명하시오.",
        "붐 길이와 정격하중 관계를 설명하시오.",
        "붐 각도와 정격하중 관계를 설명하시오.",
        "인양물 무게 산정방법을 설명하시오.",
        "안전율 적용 계산을 설명하시오.",
        "작업계획서 작성항목을 설명하시오.",
        "중량물 인양 전 확인사항을 설명하시오.",
        "과부하 방지장치 작동을 설명하시오.",
        "정격하중 초과 시 조치를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `기중기운전기능사 기중기조종 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 기중기 조종 현장에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/crane-operator" className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            기중기운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">기중기조종</h1>
          <p className="text-xl text-blue-200">조종장치, 권상/권하, 선회, 아웃트리거</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-blue-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-indigo-600">40%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-violet-600">중상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">기중기조종 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <ul className="space-y-1">
              <li>• 정격하중표 해석</li>
              <li>• 아웃트리거 완전인출</li>
              <li>• 권상/선회 복합작업</li>
            </ul>
            <ul className="space-y-1">
              <li>• 작업반경과 붐 각도</li>
              <li>• 과부하방지장치(OLP)</li>
              <li>• 신호수와 협력 작업</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-blue-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-blue-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/category/mechanical/crane-operator/study/construction-machinery" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">건설기계일반</span></Link>
            <Link href="/category/mechanical/crane-operator/study/safety-management" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">안전관리</span></Link>
            <Link href="/category/mechanical/crane-operator/study/practical" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">실기시험</span></Link>
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
