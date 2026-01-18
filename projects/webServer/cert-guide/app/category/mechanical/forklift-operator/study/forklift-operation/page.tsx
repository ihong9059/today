"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function ForkliftOperationStudyPage() {
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
        "지게차 전후진 레버의 조작방법을 설명하시오.",
        "마스트 전후경 레버의 기능을 설명하시오.",
        "포크 승강 레버의 조작방법을 설명하시오.",
        "액셀러레이터 페달의 사용법을 설명하시오.",
        "인칭 페달의 기능과 사용법을 설명하시오.",
        "브레이크 페달의 조작요령을 설명하시오.",
        "주차브레이크의 사용법을 설명하시오.",
        "스티어링 휠의 조작특성을 설명하시오.",
        "계기판의 주요 경고등 의미를 설명하시오.",
        "작동유 온도계의 정상범위를 설명하시오.",
      ],
    },
    {
      title: "기본 운전기술",
      description: "시동, 주행, 정지, 조향",
      questions: [
        "지게차 시동 전 점검사항을 설명하시오.",
        "지게차 시동 절차를 설명하시오.",
        "공차 상태 주행자세를 설명하시오.",
        "적차 상태 주행자세를 설명하시오.",
        "전진/후진 전환방법을 설명하시오.",
        "제자리 회전(피봇 턴) 방법을 설명하시오.",
        "경사로 상향 주행방법을 설명하시오.",
        "경사로 하향 주행방법을 설명하시오.",
        "급정지 시 안전조치를 설명하시오.",
        "주차 절차를 설명하시오.",
      ],
    },
    {
      title: "화물 취급",
      description: "적재, 운반, 하역 기술",
      questions: [
        "팔레트 접근방법을 설명하시오.",
        "포크 삽입요령을 설명하시오.",
        "화물 들어올리기 순서를 설명하시오.",
        "화물 운반 시 포크 높이를 설명하시오.",
        "화물 적재 시 마스트 경사를 설명하시오.",
        "화물 내려놓기 순서를 설명하시오.",
        "2단 적재 시 주의사항을 설명하시오.",
        "장척물 운반방법을 설명하시오.",
        "원통형 화물 운반요령을 설명하시오.",
        "불안정 화물 취급법을 설명하시오.",
      ],
    },
    {
      title: "특수 운전상황",
      description: "협소공간, 경사로, 회전",
      questions: [
        "협소통로 통과방법을 설명하시오.",
        "직각코너 회전요령을 설명하시오.",
        "후진 시 안전확인을 설명하시오.",
        "트럭 상하차 작업방법을 설명하시오.",
        "컨테이너 내부 작업요령을 설명하시오.",
        "고층 랙 적재방법을 설명하시오.",
        "램프 통과방법을 설명하시오.",
        "도크 레벨러 사용법을 설명하시오.",
        "야외 불량노면 주행을 설명하시오.",
        "우천 시 운전주의사항을 설명하시오.",
      ],
    },
    {
      title: "효율 및 관리",
      description: "연료절감, 점검, 유지관리",
      questions: [
        "지게차 연료절감 운전법을 설명하시오.",
        "배터리 지게차 충전관리를 설명하시오.",
        "일일점검 항목을 설명하시오.",
        "타이어 점검방법을 설명하시오.",
        "포크 마모점검을 설명하시오.",
        "체인 장력조정법을 설명하시오.",
        "유압오일 점검방법을 설명하시오.",
        "냉각수 관리요령을 설명하시오.",
        "브레이크 점검방법을 설명하시오.",
        "월간정기점검 항목을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `지게차운전기능사 지게차조종 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 지게차 조종 현장에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="bg-gradient-to-r from-yellow-600 to-amber-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/forklift-operator" className="inline-flex items-center text-yellow-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            지게차운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">지게차조종</h1>
          <p className="text-xl text-yellow-200">조종장치, 운전기술, 화물취급, 특수상황</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-yellow-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-amber-600">40%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-orange-600">중상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mb-8 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">지게차조종 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
            <ul className="space-y-1">
              <li>• 마스트 전경/후경 조작</li>
              <li>• 화물 무게중심과 안정도</li>
              <li>• 경사로 주행 시 화물방향</li>
            </ul>
            <ul className="space-y-1">
              <li>• 협소공간 회전반경</li>
              <li>• 적재 시 마스트 후경</li>
              <li>• 포크 높이 15~20cm 유지</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-yellow-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-yellow-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-3 py-1 rounded-lg text-sm hover:from-yellow-600 hover:to-amber-700 transition-colors">AI 도움</button>
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
            <Link href="/category/mechanical/forklift-operator/study/construction-machinery" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">건설기계일반</span></Link>
            <Link href="/category/mechanical/forklift-operator/study/safety-management" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">안전관리</span></Link>
            <Link href="/category/mechanical/forklift-operator/study/practical" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">실기시험</span></Link>
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
