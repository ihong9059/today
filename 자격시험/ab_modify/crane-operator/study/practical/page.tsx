"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "실기시험 개요",
      description: "시험방식, 평가항목, 합격기준",
      questions: [
        "기중기운전기능사 실기시험 방식을 설명하시오.",
        "실기시험 평가항목을 설명하시오.",
        "실기시험 합격기준을 설명하시오.",
        "실기시험 시간제한을 설명하시오.",
        "실기시험 감점기준을 설명하시오.",
        "실기시험 실격항목을 설명하시오.",
        "실기시험 응시자격을 설명하시오.",
        "실기시험 장비규격을 설명하시오.",
        "실기시험장 코스구성을 설명하시오.",
        "실기시험 채점방식을 설명하시오.",
      ],
    },
    {
      title: "인양작업",
      description: "후크결속, 권상, 인양물 확인",
      questions: [
        "인양물 결속 확인 절차를 설명하시오.",
        "후크 걸림상태 확인을 설명하시오.",
        "와이어로프 각도 확인을 설명하시오.",
        "권상 시작 시 안전확인을 설명하시오.",
        "지상이격 확인(바닥떼기)을 설명하시오.",
        "인양물 수평 확인을 설명하시오.",
        "인양 높이 조절요령을 설명하시오.",
        "권상 정지 시 제동을 설명하시오.",
        "인양작업 시간배분을 설명하시오.",
        "인양작업 감점포인트를 설명하시오.",
      ],
    },
    {
      title: "이동/선회작업",
      description: "선회, 붐 조작, 이동경로",
      questions: [
        "인양물 이동 시 선회요령을 설명하시오.",
        "선회 속도 조절요령을 설명하시오.",
        "선회 정지 시 관성 대응을 설명하시오.",
        "붐 기복과 선회 복합작업을 설명하시오.",
        "이동경로 장애물 확인을 설명하시오.",
        "인양물 흔들림 방지를 설명하시오.",
        "이동 중 높이 유지를 설명하시오.",
        "목표지점 접근요령을 설명하시오.",
        "이동작업 시간배분을 설명하시오.",
        "이동작업 감점포인트를 설명하시오.",
      ],
    },
    {
      title: "정위치 작업",
      description: "내려놓기, 위치조정, 결속해제",
      questions: [
        "정위치 접근 방법을 설명하시오.",
        "인양물 위치 미세조정을 설명하시오.",
        "인양물 하강 절차를 설명하시오.",
        "착지 시 속도 조절을 설명하시오.",
        "정위치 정확도 확인을 설명하시오.",
        "인양물 안착 확인방법을 설명하시오.",
        "와이어로프 이완 확인을 설명하시오.",
        "후크 이탈 요령을 설명하시오.",
        "정위치작업 시간배분을 설명하시오.",
        "정위치작업 감점포인트를 설명하시오.",
      ],
    },
    {
      title: "종합 평가포인트",
      description: "조작정확도, 안전, 시간관리",
      questions: [
        "올바른 조종자세를 설명하시오.",
        "레버조작 정확성 평가를 설명하시오.",
        "작업의 연속성 평가를 설명하시오.",
        "안전확인 동작 평가를 설명하시오.",
        "신호수 신호 수신 평가를 설명하시오.",
        "7분 시간배분 요령을 설명하시오.",
        "긴장완화 방법을 설명하시오.",
        "실기시험 전 연습요령을 설명하시오.",
        "자주 틀리는 포인트를 설명하시오.",
        "합격을 위한 핵심 팁을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `기중기운전기능사 실기시험 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 실제 실기시험에서의 적용 방법과 합격을 위한 핵심 포인트를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/crane-operator" className="inline-flex items-center text-green-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            기중기운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">실기시험</h1>
          <p className="text-xl text-green-200">인양작업, 이동/선회, 정위치 작업</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-green-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">시험형태</p>
            <p className="text-3xl font-bold text-emerald-600">작업형</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">시험시간</p>
            <p className="text-3xl font-bold text-teal-600">7분</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">합격기준</p>
            <p className="text-3xl font-bold text-blue-600">60점</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-200">
          <h3 className="font-bold text-green-800 mb-3">실기시험 핵심 과제</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-green-700">
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">인양작업</p>
              <p>권상, 바닥떼기, 수평</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">이동/선회</p>
              <p>흔들림 방지, 경로유지</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">정위치</p>
              <p>정확도, 안전착지</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-green-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-green-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-lg text-sm hover:from-green-600 hover:to-emerald-700 transition-colors">AI 도움</button>
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
            <Link href="/category/mechanical/crane-operator/study/crane-operation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">기중기조종</span></Link>
            <Link href="/category/mechanical/crane-operator/study/construction-machinery" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">건설기계일반</span></Link>
            <Link href="/category/mechanical/crane-operator/study/safety-management" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">안전관리</span></Link>
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
