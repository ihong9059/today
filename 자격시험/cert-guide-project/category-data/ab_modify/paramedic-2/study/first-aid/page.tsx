'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FirstAidPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic2-first-aid-completed');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => {
      const newCompleted = prev.includes(id)
        ? prev.filter(q => q !== id)
        : [...prev, id];
      localStorage.setItem('paramedic2-first-aid-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "출혈 및 쇼크",
      questions: [
        { id: 1, text: "출혈의 종류(동맥, 정맥, 모세혈관)별 특징과 구분법은?" },
        { id: 2, text: "직접압박법의 올바른 방법과 주의사항은?" },
        { id: 3, text: "지혈대(tourniquet) 적용의 적응증과 방법은?" },
        { id: 4, text: "지혈대 적용 시 시간 기록이 중요한 이유는?" },
        { id: 5, text: "쇼크의 정의와 종류를 설명하시오." },
        { id: 6, text: "저혈량성 쇼크의 증상과 응급처치는?" },
        { id: 7, text: "아나필락시스 쇼크의 원인과 증상은?" },
        { id: 8, text: "쇼크 환자의 체위(다리올림자세)와 그 이유는?" },
        { id: 9, text: "내부 출혈이 의심되는 증상은?" },
        { id: 10, text: "코피(비출혈) 환자의 올바른 처치법은?" },
      ]
    },
    {
      title: "골절 및 근골격계 손상",
      questions: [
        { id: 11, text: "골절의 종류(개방성/폐쇄성)와 특징은?" },
        { id: 12, text: "골절의 일반적인 증상과 징후는?" },
        { id: 13, text: "부목 적용의 일반 원칙은?" },
        { id: 14, text: "부목 적용 시 상하 관절을 고정해야 하는 이유는?" },
        { id: 15, text: "탈구의 정의와 응급처치 원칙은?" },
        { id: 16, text: "염좌와 좌상의 차이점과 처치법(RICE)은?" },
        { id: 17, text: "상지 골절 시 삼각건(arm sling) 적용법은?" },
        { id: 18, text: "하지 골절 시 부목 적용 방법은?" },
        { id: 19, text: "골반골절 환자의 특징과 주의사항은?" },
        { id: 20, text: "개방성 골절 환자의 상처 처치법은?" },
      ]
    },
    {
      title: "화상",
      questions: [
        { id: 21, text: "화상의 깊이에 따른 분류(1도/2도/3도)와 특징은?" },
        { id: 22, text: "9의 법칙(Rule of Nines)을 이용한 화상 면적 계산법은?" },
        { id: 23, text: "열 화상의 초기 응급처치 방법은?" },
        { id: 24, text: "화학 화상의 처치 시 주의사항은?" },
        { id: 25, text: "전기 화상의 특징과 응급처치는?" },
        { id: 26, text: "기도 화상이 의심되는 증상과 징후는?" },
        { id: 27, text: "화상 환자에게 물집을 터뜨리면 안 되는 이유는?" },
        { id: 28, text: "화상 부위에 적용하면 안 되는 것들은?" },
        { id: 29, text: "중증 화상의 판정 기준은?" },
        { id: 30, text: "화상 환자의 저체온 예방이 중요한 이유는?" },
      ]
    },
    {
      title: "중독 및 환경응급",
      questions: [
        { id: 31, text: "중독의 경로(경구, 흡입, 접촉, 주사)별 특징은?" },
        { id: 32, text: "경구 중독 환자에게 구토를 유발하면 안 되는 경우는?" },
        { id: 33, text: "일산화탄소 중독의 증상과 응급처치는?" },
        { id: 34, text: "농약 중독 환자의 응급처치 원칙은?" },
        { id: 35, text: "알코올 중독 환자의 관찰 포인트는?" },
        { id: 36, text: "열사병과 열탈진의 차이점과 처치법은?" },
        { id: 37, text: "저체온증의 단계별 증상과 처치법은?" },
        { id: 38, text: "동상의 정도별 증상과 응급처치는?" },
        { id: 39, text: "익수(물에 빠진) 환자의 응급처치 순서는?" },
        { id: 40, text: "벌 쏘임 환자의 응급처치와 아나필락시스 주의사항은?" },
      ]
    },
    {
      title: "상처 처치",
      questions: [
        { id: 41, text: "상처의 종류(찰과상, 열상, 자상 등)와 특징은?" },
        { id: 42, text: "상처 세척의 목적과 방법은?" },
        { id: 43, text: "붕대의 종류와 각각의 용도는?" },
        { id: 44, text: "롤러붕대 감는 기본 원칙은?" },
        { id: 45, text: "삼각건의 다양한 활용법은?" },
        { id: 46, text: "관통상(물체가 박힌 상처)의 처치 원칙은?" },
        { id: 47, text: "복부 장기 탈출(evisceration) 환자의 처치법은?" },
        { id: 48, text: "눈 손상 환자의 응급처치 원칙은?" },
        { id: 49, text: "절단 부위와 절단된 신체의 보관법은?" },
        { id: 50, text: "감염 예방을 위한 상처 처치 원칙은?" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/category/medical/paramedic-2" className="text-orange-600 hover:text-orange-800 mb-4 inline-block">
            ← 응급구조사 2급으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">응급처치</h1>
          <p className="text-gray-600">응급구조사 2급 필기시험 - 기본응급처치학</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-orange-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {completedQuestions.length} / {totalQuestions} 문제 완료
          </p>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, index) => {
            const topicCompleted = topic.questions.filter(q => completedQuestions.includes(q.id)).length;
            const isOpen = openTopics.includes(index);

            return (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🩹</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topicCompleted}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-6 pb-4 space-y-2">
                    {topic.questions.map((question) => (
                      <div
                        key={question.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          completedQuestions.includes(question.id)
                            ? 'border-orange-200 bg-orange-50'
                            : 'border-gray-100 hover:border-orange-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              completedQuestions.includes(question.id)
                                ? 'border-orange-500 bg-orange-500'
                                : 'border-gray-300 hover:border-orange-400'
                            }`}
                          >
                            {completedQuestions.includes(question.id) && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1">
                            <p className="text-gray-800 font-medium">{question.id}. {question.text}</p>
                            <div className="mt-2 flex gap-2">
                              <a
                                href={`https://claude.ai/new?q=${encodeURIComponent(`응급구조사 2급 응급처치 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                              >
                                Claude
                              </a>
                              <a
                                href={`https://chat.openai.com/?q=${encodeURIComponent(`응급구조사 2급 응급처치 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                              >
                                ChatGPT
                              </a>
                              <a
                                href={`https://gemini.google.com/app?q=${encodeURIComponent(`응급구조사 2급 응급처치 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                              >
                                Gemini
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary Card */}
        <div className="mt-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 응급처치 학습 포인트</h3>
          <ul className="space-y-1 text-orange-100">
            <li>• 출혈 지혈법과 쇼크 증상/처치를 우선 학습하세요</li>
            <li>• 골절 부목 적용의 원칙을 정확히 암기하세요</li>
            <li>• 화상 깊이별 분류와 9의 법칙을 숙지하세요</li>
            <li>• 중독 환자에서 구토 유발 금기 상황을 기억하세요</li>
            <li>• 상처 처치 시 감염 예방 원칙을 항상 염두에 두세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
