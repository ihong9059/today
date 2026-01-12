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
        "굴삭기 작업 전 안전점검 사항을 설명하시오.",
        "굴삭기 탑승 시 안전수칙을 설명하시오.",
        "굴삭기 시동 전 안전확인 사항을 설명하시오.",
        "작업 중 주변 확인 요령을 설명하시오.",
        "굴삭기 선회 시 안전수칙을 설명하시오.",
        "작업반경 내 출입금지 조치를 설명하시오.",
        "굴삭기 이동 시 안전조치를 설명하시오.",
        "작업종료 후 안전조치를 설명하시오.",
        "굴삭기 주차 시 안전수칙을 설명하시오.",
        "야간작업 시 안전조명 설치기준을 설명하시오.",
      ],
    },
    {
      title: "사고예방",
      description: "전도, 추락, 협착 사고예방",
      questions: [
        "굴삭기 전도사고 원인을 설명하시오.",
        "굴삭기 전도사고 예방법을 설명하시오.",
        "경사지 전도방지 요령을 설명하시오.",
        "연약지반 침하사고 예방을 설명하시오.",
        "협착사고 발생원인을 설명하시오.",
        "협착사고 예방대책을 설명하시오.",
        "낙하물 사고예방 조치를 설명하시오.",
        "충돌사고 예방대책을 설명하시오.",
        "감전사고 예방조치를 설명하시오.",
        "화재폭발 사고예방을 설명하시오.",
      ],
    },
    {
      title: "위험요소 관리",
      description: "고압선, 매설물, 지하시설물",
      questions: [
        "고압선 인근 작업 시 이격거리를 설명하시오.",
        "지하매설물 확인방법을 설명하시오.",
        "가스관 인근 작업 안전조치를 설명하시오.",
        "상수도관 인근 작업 요령을 설명하시오.",
        "전력케이블 손상방지 조치를 설명하시오.",
        "통신케이블 보호조치를 설명하시오.",
        "건물 인접 굴착 시 안전조치를 설명하시오.",
        "옹벽 인근 작업 주의사항을 설명하시오.",
        "도로인접 작업 시 교통안전을 설명하시오.",
        "민원발생 예방조치를 설명하시오.",
      ],
    },
    {
      title: "개인보호구 및 안전장치",
      description: "보호구, ROPS, FOPS, 안전벨트",
      questions: [
        "굴삭기 운전자 개인보호구를 설명하시오.",
        "안전모 착용기준을 설명하시오.",
        "안전화의 종류와 선택기준을 설명하시오.",
        "ROPS(전복보호구조)를 설명하시오.",
        "FOPS(낙하물보호구조)를 설명하시오.",
        "안전벨트 착용 필요성을 설명하시오.",
        "후방카메라 설치기준을 설명하시오.",
        "경광등 및 경보장치를 설명하시오.",
        "소화기 비치기준을 설명하시오.",
        "비상정지장치의 위치와 사용법을 설명하시오.",
      ],
    },
    {
      title: "응급조치 및 사고대응",
      description: "응급처치, 사고보고, 현장보존",
      questions: [
        "굴삭기 사고 발생 시 초동조치를 설명하시오.",
        "부상자 응급처치 요령을 설명하시오.",
        "골절 시 응급처치법을 설명하시오.",
        "출혈 시 지혈방법을 설명하시오.",
        "화상 시 응급처치를 설명하시오.",
        "감전 시 응급조치를 설명하시오.",
        "사고현장 보존방법을 설명하시오.",
        "사고보고 절차를 설명하시오.",
        "산업재해 보상절차를 설명하시오.",
        "안전사고 재발방지 대책을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `굴삭기운전기능사 안전관리 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 산업안전보건법과 실제 건설현장에서의 적용 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/excavator-operator" className="inline-flex items-center text-red-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            굴삭기운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">안전관리</h1>
          <p className="text-xl text-red-200">안전수칙, 사고예방, 응급조치, 보호장비</p>
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
              <p>경사지, 연약지반 주의</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">협착사고 예방</p>
              <p>작업반경 출입금지</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-bold">감전사고 예방</p>
              <p>고압선 이격거리 준수</p>
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
            <Link href="/category/mechanical/excavator-operator/study/excavator-operation" className="bg-amber-50 hover:bg-amber-100 rounded-lg p-3 text-center transition-colors"><span className="text-amber-700 font-medium">굴삭기조종</span></Link>
            <Link href="/category/mechanical/excavator-operator/study/construction-machinery" className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 text-center transition-colors"><span className="text-gray-700 font-medium">건설기계일반</span></Link>
            <Link href="/category/mechanical/excavator-operator/study/practical" className="bg-green-50 hover:bg-green-100 rounded-lg p-3 text-center transition-colors"><span className="text-green-700 font-medium">실기시험</span></Link>
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
