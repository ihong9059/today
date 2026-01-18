"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import LoginRequiredModal from "@/app/components/LoginRequiredModal";

import { useState } from "react";
import Link from "next/link";

export default function ExcavatorOperationStudyPage() {
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
        "굴삭기 주행레버의 기능과 조작방법을 설명하시오.",
        "작업장치 레버(붐, 암, 버킷)의 역할을 설명하시오.",
        "선회레버의 기능과 안전조작법을 설명하시오.",
        "주행페달과 조향장치의 연동을 설명하시오.",
        "스로틀레버(엔진회전수 조절)의 사용법을 설명하시오.",
        "계기판의 주요 경고등 의미를 설명하시오.",
        "조종석 안전장치(ROPS, FOPS)를 설명하시오.",
        "유압 파일럿 락레버의 기능을 설명하시오.",
        "모드선택 스위치의 종류와 용도를 설명하시오.",
        "주행속도 절환스위치 사용법을 설명하시오.",
      ],
    },
    {
      title: "기본 운전기술",
      description: "시동, 주행, 정지, 선회",
      questions: [
        "굴삭기 시동 전 점검사항을 설명하시오.",
        "굴삭기 시동 절차를 설명하시오.",
        "굴삭기 전진/후진 주행방법을 설명하시오.",
        "굴삭기 직진 및 조향방법을 설명하시오.",
        "굴삭기 정지 및 주차절차를 설명하시오.",
        "상부 선회체 선회조작 요령을 설명하시오.",
        "경사지 주행 시 주의사항을 설명하시오.",
        "연약지반 주행 시 대처법을 설명하시오.",
        "장애물 통과 시 운전요령을 설명하시오.",
        "굴삭기 운반차량 상하차 방법을 설명하시오.",
      ],
    },
    {
      title: "굴삭작업 기본",
      description: "굴삭, 상차, 정지작업",
      questions: [
        "표준 굴삭작업 순서를 설명하시오.",
        "버킷 굴삭각도와 효율의 관계를 설명하시오.",
        "굴삭깊이와 작업반경 계산법을 설명하시오.",
        "덤프트럭 상차작업 요령을 설명하시오.",
        "상차 시 적재위치와 순서를 설명하시오.",
        "정지작업(땅고르기) 요령을 설명하시오.",
        "되메우기 작업방법을 설명하시오.",
        "도랑파기 작업순서를 설명하시오.",
        "버킷 선택기준(토질별)을 설명하시오.",
        "굴삭작업 시 안전거리를 설명하시오.",
      ],
    },
    {
      title: "특수작업 기술",
      description: "암반, 수중, 파쇄 작업",
      questions: [
        "암반 굴삭작업 시 주의사항을 설명하시오.",
        "브레이커(유압해머) 작업요령을 설명하시오.",
        "수중굴삭 작업방법을 설명하시오.",
        "경사면 굴삭작업 요령을 설명하시오.",
        "구조물 해체작업 안전수칙을 설명하시오.",
        "협소공간 작업 시 주의사항을 설명하시오.",
        "야간작업 시 안전조치를 설명하시오.",
        "고압선 인근 작업 시 안전거리를 설명하시오.",
        "지하매설물 인근 작업 요령을 설명하시오.",
        "동절기 작업 시 주의사항을 설명하시오.",
      ],
    },
    {
      title: "작업효율 및 관리",
      description: "연료절감, 작업계획, 유지관리",
      questions: [
        "굴삭기 연료절감 운전법을 설명하시오.",
        "작업사이클 단축방법을 설명하시오.",
        "일일 작업계획 수립요령을 설명하시오.",
        "작업량 산출방법을 설명하시오.",
        "버킷 용량과 작업효율의 관계를 설명하시오.",
        "굴삭기 일상점검 항목을 설명하시오.",
        "그리스 주입 위치와 주기를 설명하시오.",
        "유압오일 점검방법을 설명하시오.",
        "냉각수 관리요령을 설명하시오.",
        "트랙(무한궤도) 장력조정법을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; }
    const prompt = `굴삭기운전기능사 굴삭기조종 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 굴삭기 조종 현장에서의 적용 방법과 시험 출제 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/excavator-operator" className="inline-flex items-center text-amber-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            굴삭기운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">굴삭기조종</h1>
          <p className="text-xl text-amber-200">조종장치, 운전기술, 굴삭작업, 특수작업</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-amber-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-orange-600">40%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-yellow-600">중상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-8 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3">굴삭기조종 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-700">
            <ul className="space-y-1">
              <li>• 작업장치 레버 조작 (붐/암/버킷)</li>
              <li>• 선회-굴삭-상차 복합동작</li>
              <li>• 경사지/연약지반 주행요령</li>
            </ul>
            <ul className="space-y-1">
              <li>• 굴삭깊이와 작업반경</li>
              <li>• 특수작업(브레이커, 수중)</li>
              <li>• 일상점검 및 유지관리</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-amber-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-amber-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-lg text-sm hover:from-amber-600 hover:to-orange-700 transition-colors">AI 도움</button>
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
            <Link href="/category/mechanical/excavator-operator/study/construction-machinery" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">건설기계일반</span></Link>
            <Link href="/category/mechanical/excavator-operator/study/safety-management" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">안전관리</span></Link>
            <Link href="/category/mechanical/excavator-operator/study/practical" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">실기시험</span></Link>
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
