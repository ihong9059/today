"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConstructionMachineryStudyPage() {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const topics = [
    {
      title: "디젤엔진",
      description: "구조, 작동원리, 연료계통",
      questions: [
        "디젤엔진의 4행정 사이클을 설명하시오.",
        "디젤엔진의 압축비와 특성을 설명하시오.",
        "연료분사펌프의 기능과 종류를 설명하시오.",
        "인젝터(분사노즐)의 작동원리를 설명하시오.",
        "글로우플러그의 역할과 작동을 설명하시오.",
        "연료필터 교환시기와 방법을 설명하시오.",
        "에어클리너의 종류와 관리를 설명하시오.",
        "터보차저의 구조와 기능을 설명하시오.",
        "인터쿨러의 역할을 설명하시오.",
        "디젤엔진 과열원인과 대책을 설명하시오.",
      ],
    },
    {
      title: "유압장치",
      description: "유압펌프, 밸브, 실린더",
      questions: [
        "유압시스템의 구성요소를 설명하시오.",
        "유압펌프의 종류와 특성을 설명하시오.",
        "기어펌프의 구조와 작동원리를 설명하시오.",
        "피스톤펌프의 특성을 설명하시오.",
        "방향제어밸브의 기능을 설명하시오.",
        "유량제어밸브의 역할을 설명하시오.",
        "압력제어밸브(릴리프밸브)를 설명하시오.",
        "유압실린더의 종류와 구조를 설명하시오.",
        "유압모터의 작동원리를 설명하시오.",
        "유압오일의 규격과 교환주기를 설명하시오.",
      ],
    },
    {
      title: "동력전달장치",
      description: "변속기, 주행장치, 선회장치",
      questions: [
        "토크컨버터의 구조와 기능을 설명하시오.",
        "트랜스미션의 종류를 설명하시오.",
        "유성기어장치의 원리를 설명하시오.",
        "파이널드라이브의 기능을 설명하시오.",
        "스프로킷과 트랙의 관계를 설명하시오.",
        "선회모터의 구조와 작동을 설명하시오.",
        "선회감속기의 기능을 설명하시오.",
        "주행모터의 종류와 특성을 설명하시오.",
        "트랙롤러와 캐리어롤러를 설명하시오.",
        "아이들러와 리코일스프링을 설명하시오.",
      ],
    },
    {
      title: "작업장치",
      description: "붐, 암, 버킷 구조",
      questions: [
        "붐(Boom)의 구조와 기능을 설명하시오.",
        "암(Arm)의 구조와 역할을 설명하시오.",
        "버킷의 종류와 용도를 설명하시오.",
        "붐실린더의 작동원리를 설명하시오.",
        "암실린더의 기능을 설명하시오.",
        "버킷실린더의 구조를 설명하시오.",
        "링크기구의 역할을 설명하시오.",
        "핀과 부싱의 마모관리를 설명하시오.",
        "작업장치의 그리스 주입요령을 설명하시오.",
        "어태치먼트(브레이커 등) 교환방법을 설명하시오.",
      ],
    },
    {
      title: "전기장치 및 냉각계통",
      description: "배터리, 스타터, 냉각시스템",
      questions: [
        "굴삭기 전기회로의 구성을 설명하시오.",
        "배터리의 점검과 관리를 설명하시오.",
        "스타터모터의 작동원리를 설명하시오.",
        "알터네이터(발전기)의 기능을 설명하시오.",
        "퓨즈와 릴레이의 역할을 설명하시오.",
        "냉각시스템의 구성을 설명하시오.",
        "워터펌프의 기능과 점검을 설명하시오.",
        "써모스탯의 역할과 작동을 설명하시오.",
        "라디에이터 관리요령을 설명하시오.",
        "냉각수 점검과 교환주기를 설명하시오.",
      ],
    },
  ];

  const handleAIHelper = (question: string) => {
    const prompt = `굴삭기운전기능사 건설기계일반 과목 문제입니다:\n\n"${question}"\n\n이 문제에 대해 상세히 설명해주세요. 굴삭기의 기계적 특성과 실제 정비 현장에서의 적용 방법을 포함하여 답변해주세요.`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-gray-600 to-slate-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/category/mechanical/excavator-operator" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            굴삭기운전기능사 메인으로
          </Link>
          <h1 className="text-4xl font-bold mb-4">건설기계일반</h1>
          <p className="text-xl text-gray-300">디젤엔진, 유압장치, 동력전달, 작업장치</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">총 문항수</p>
            <p className="text-3xl font-bold text-gray-600">50문항</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">출제비중</p>
            <p className="text-3xl font-bold text-slate-600">30%</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <p className="text-gray-600 text-sm">난이도</p>
            <p className="text-3xl font-bold text-orange-600">상</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3">건설기계일반 핵심 포인트</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <ul className="space-y-1">
              <li>• 디젤엔진 4행정과 압축점화</li>
              <li>• 유압펌프 종류 (기어/피스톤)</li>
              <li>• 제어밸브 (방향/유량/압력)</li>
            </ul>
            <ul className="space-y-1">
              <li>• 토크컨버터와 동력전달</li>
              <li>• 붐/암/버킷 실린더 작동</li>
              <li>• 냉각계통과 전기장치</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedTopic(expandedTopic === index ? null : index)} className="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                  <p className="text-gray-600">{topic.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{topic.questions.length}문항</span>
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
                          <span className="bg-gray-600 text-white text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">{qIndex + 1}</span>
                          <span className="text-gray-700">{question}</span>
                        </div>
                        <button onClick={() => handleAIHelper(question)} className="flex-shrink-0 bg-gradient-to-r from-gray-500 to-slate-600 text-white px-3 py-1 rounded-lg text-sm hover:from-gray-600 hover:to-slate-700 transition-colors">AI 도움</button>
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
            <Link href="/category/mechanical/excavator-operator/study/safety-management" className="bg-red-50 hover:bg-red-100 rounded-lg p-3 text-center transition-colors"><span className="text-red-700 font-medium">안전관리</span></Link>
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
