"use client";

import { useState } from "react";
import Link from "next/link";

export default function SafetyManagementStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "안전수칙",
      description: "작업 전/중/후 안전수칙",
      questions: [
        "기중기 작업 전 안전점검 사항을 설명하시오.",
        "기중기 시동 전 확인사항을 설명하시오.",
        "작업 시작 전 신호체계 확인을 설명하시오.",
        "인양물 결속 상태 확인을 설명하시오.",
        "작업반경 내 출입금지 조치를 설명하시오.",
        "중량물 인양 시 안전수칙을 설명하시오.",
        "인양물 이동 시 주의사항을 설명하시오.",
        "인양물 하강 시 안전조치를 설명하시오.",
        "작업종료 후 안전조치를 설명하시오.",
        "기중기 주차 시 안전수칙을 설명하시오.",
      ],
    },
    {
      title: "사고예방",
      description: "전도, 붕괴, 협착, 낙하 예방",
      questions: [
        "기중기 전도사고 원인을 설명하시오.",
        "기중기 전도사고 예방법을 설명하시오.",
        "과부하 전도 방지법을 설명하시오.",
        "아웃트리거 미설치 위험성을 설명하시오.",
        "인양물 낙하사고 원인을 설명하시오.",
        "와이어로프 파단사고 예방을 설명하시오.",
        "협착사고 발생원인을 설명하시오.",
        "선회 시 협착사고 예방을 설명하시오.",
        "붐 접촉사고 예방을 설명하시오.",
        "감전사고 예방조치를 설명하시오.",
      ],
    },
    {
      title: "신호수 및 협력작업",
      description: "수신호, 무선신호, 협력체계",
      questions: [
        "기중기 작업 수신호 종류를 설명하시오.",
        "권상/권하 수신호를 설명하시오.",
        "선회 수신호를 설명하시오.",
        "붐 기복 수신호를 설명하시오.",
        "비상정지 수신호를 설명하시오.",
        "무선신호 사용법을 설명하시오.",
        "신호수 배치 요령을 설명하시오.",
        "신호 불명확 시 조치를 설명하시오.",
        "복수 신호수 운영을 설명하시오.",
        "운전자-신호수 협력체계를 설명하시오.",
      ],
    },
    {
      title: "작업환경 안전",
      description: "고압선, 지반, 악천후",
      questions: [
        "고압선 인접 작업 이격거리를 설명하시오.",
        "송전선 충전전로 인근 작업을 설명하시오.",
        "지반 지지력 확인방법을 설명하시오.",
        "연약지반 작업 안전조치를 설명하시오.",
        "경사지 작업 안전조치를 설명하시오.",
        "강풍 시 작업중지 기준을 설명하시오.",
        "우천 시 작업 주의사항을 설명하시오.",
        "뇌우 시 안전조치를 설명하시오.",
        "야간작업 안전조치를 설명하시오.",
        "협소공간 작업 안전을 설명하시오.",
      ],
    },
    {
      title: "응급조치 및 사고대응",
      description: "응급처치, 사고보고, 안전교육",
      questions: [
        "기중기 사고 시 초동조치를 설명하시오.",
        "인양물 낙하사고 시 대응을 설명하시오.",
        "와이어로프 파단 시 조치를 설명하시오.",
        "부상자 응급처치 요령을 설명하시오.",
        "골절 시 응급처치법을 설명하시오.",
        "감전 시 응급조치를 설명하시오.",
        "사고현장 보존방법을 설명하시오.",
        "사고보고 절차를 설명하시오.",
        "안전보건교육 이수의무를 설명하시오.",
        "재발방지 대책 수립을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `기중기운전기능사 안전관리 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 산업안전보건법과 실제 기중기 작업현장에서의 적용 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/crane-operator" className="inline-flex items-center text-red-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            기중기운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">안전관리</h1>
          <p className="text-xl text-red-200">안전수칙, 사고예방, 신호수, 응급조치</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-red-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-rose-600">20%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">중요도</p>
            <p className="text-3xl font-bold text-orange-600">최상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 mb-8 border border-red-200">
          <h3 className="font-bold text-red-800 mb-3">안전관리 핵심 포인트</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-red-700">
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">전도사고 예방</p>
              <p>아웃트리거 완전설치</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">낙하사고 예방</p>
              <p>와이어로프 점검</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">신호수 협력</p>
              <p>수신호 체계 준수</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-red-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-red-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/category/mechanical/crane-operator/study/crane-operation" className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-colors"><span className="text-blue-700 font-medium">기중기조종</span></Link>
            <Link href="/category/mechanical/crane-operator/study/construction-machinery" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">건설기계일반</span></Link>
            <Link href="/category/mechanical/crane-operator/study/practical" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">실기시험</span></Link>
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
