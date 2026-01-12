"use client";

import { useState } from "react";
import Link from "next/link";

export default function MeteorologyStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "대기의 구조",
      description: "대기권, 기압, 온도, 밀도",
      questions: [
        "대기권의 구조를 설명하시오.",
        "대류권의 특성을 설명하시오.",
        "기압의 정의와 단위를 설명하시오.",
        "표준대기를 설명하시오.",
        "기온감률을 설명하시오.",
        "밀도고도를 설명하시오.",
        "기압고도를 설명하시오.",
        "QNH와 QFE를 설명하시오.",
        "역전층을 설명하시오.",
        "대기안정도를 설명하시오.",
      ],
    },
    {
      title: "바람",
      description: "풍향, 풍속, 바람의 종류",
      questions: [
        "바람의 발생원인을 설명하시오.",
        "지상풍과 상층풍을 설명하시오.",
        "지균풍을 설명하시오.",
        "경도풍을 설명하시오.",
        "해륙풍을 설명하시오.",
        "산곡풍을 설명하시오.",
        "돌풍을 설명하시오.",
        "윈드시어를 설명하시오.",
        "난류를 설명하시오.",
        "열상승기류를 설명하시오.",
      ],
    },
    {
      title: "구름과 강수",
      description: "구름형성, 종류, 비/눈",
      questions: [
        "구름 형성 조건을 설명하시오.",
        "응결고도를 설명하시오.",
        "적운형 구름을 설명하시오.",
        "층운형 구름을 설명하시오.",
        "운량 표시방법을 설명하시오.",
        "운고 측정을 설명하시오.",
        "강수의 종류를 설명하시오.",
        "강수와 비행을 설명하시오.",
        "적란운의 위험을 설명하시오.",
        "뇌우 회피를 설명하시오.",
      ],
    },
    {
      title: "시정과 안개",
      description: "시정, 안개종류, 저시정",
      questions: [
        "시정의 정의를 설명하시오.",
        "시정 측정방법을 설명하시오.",
        "안개의 종류를 설명하시오.",
        "복사안개를 설명하시오.",
        "이류안개를 설명하시오.",
        "활승안개를 설명하시오.",
        "안개 소산조건을 설명하시오.",
        "박무와 연무를 설명하시오.",
        "저시정 비행 주의를 설명하시오.",
        "VFR 기상최저치를 설명하시오.",
      ],
    },
    {
      title: "기상정보",
      description: "METAR, 기상통보, 예보",
      questions: [
        "METAR의 구성을 설명하시오.",
        "METAR 풍향풍속을 설명하시오.",
        "METAR 시정을 설명하시오.",
        "METAR 운량/운고를 설명하시오.",
        "기상통보 확인방법을 설명하시오.",
        "일기도 해석을 설명하시오.",
        "고기압/저기압을 설명하시오.",
        "전선의 종류를 설명하시오.",
        "비행 전 기상확인을 설명하시오.",
        "비행 중 기상판단을 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `경량항공기조종사 항공기상 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 경량항공기 비행 안전과 관련된 적용 사례를 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/driving/light-sport-pilot" className="inline-flex items-center text-sky-200 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            경량항공기조종사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">항공기상</h1>
          <p className="text-xl text-sky-200">대기, 바람, 구름, 시정, 기상정보</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-sky-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-blue-600">25%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-cyan-600">중상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-6 mb-8 border border-sky-200">
          <h3 className="font-bold text-sky-800 mb-3">항공기상 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-sky-700">
            <ul className="space-y-1">
              <li>• METAR 해석</li>
              <li>• 밀도고도 이해</li>
              <li>• 안개 종류</li>
            </ul>
            <ul className="space-y-1">
              <li>• 적란운/뇌우</li>
              <li>• VFR 기상조건</li>
              <li>• 열상승기류</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-sky-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-sky-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:from-sky-600 hover:to-blue-700 transition-colors">AI 도움</button>
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
            <Link href="/category/driving/light-sport-pilot/study/aviation-law" className="bg-indigo-50 hover:bg-indigo-100 rounded-lg p-3 text-center transition-colors"><span className="text-indigo-700 font-medium">항공법규</span></Link>
            <Link href="/category/driving/light-sport-pilot/study/flight-theory" className="bg-violet-50 hover:bg-violet-100 rounded-lg p-3 text-center transition-colors"><span className="text-violet-700 font-medium">비행이론</span></Link>
            <Link href="/category/driving/light-sport-pilot/study/navigation" className="bg-emerald-50 hover:bg-emerald-100 rounded-lg p-3 text-center transition-colors"><span className="text-emerald-700 font-medium">항법</span></Link>
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
