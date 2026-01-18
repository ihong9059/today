'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CprAedPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic2-cpr-aed-completed');
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
      localStorage.setItem('paramedic2-cpr-aed-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "성인 기본소생술",
      questions: [
        { id: 1, text: "성인 심폐소생술의 올바른 순서(C-A-B)를 설명하시오." },
        { id: 2, text: "가슴압박의 정확한 위치와 방법은?" },
        { id: 3, text: "성인 가슴압박의 적절한 깊이와 속도는?" },
        { id: 4, text: "가슴압박과 인공호흡의 비율은?" },
        { id: 5, text: "1인 구조자와 2인 구조자의 심폐소생술 차이점은?" },
        { id: 6, text: "효과적인 가슴압박을 위한 주의사항은?" },
        { id: 7, text: "가슴압박 중단을 최소화해야 하는 이유는?" },
        { id: 8, text: "심폐소생술 중 구조자 교대 시점과 방법은?" },
        { id: 9, text: "심폐소생술 중단 조건은 무엇인가?" },
        { id: 10, text: "가슴압박 후 가슴의 완전한 이완이 중요한 이유는?" },
      ]
    },
    {
      title: "소아·영아 소생술",
      questions: [
        { id: 11, text: "소아의 정의와 연령 구분 기준은?" },
        { id: 12, text: "영아 심폐소생술의 가슴압박 위치와 방법은?" },
        { id: 13, text: "소아 가슴압박의 적절한 깊이는?" },
        { id: 14, text: "영아 가슴압박의 적절한 깊이는?" },
        { id: 15, text: "소아·영아에서 압박-인공호흡 비율(1인/2인)은?" },
        { id: 16, text: "영아에서 두 손가락 압박법과 양손 감싸쥐기법의 차이는?" },
        { id: 17, text: "소아·영아의 심정지 원인이 성인과 다른 이유는?" },
        { id: 18, text: "영아 인공호흡 시 주의사항은?" },
        { id: 19, text: "소아·영아에서 맥박 확인 위치의 차이는?" },
        { id: 20, text: "소아·영아 소생술에서 환기의 중요성은?" },
      ]
    },
    {
      title: "자동제세동기(AED)",
      questions: [
        { id: 21, text: "AED의 작동 원리와 목적은?" },
        { id: 22, text: "AED 사용의 올바른 순서를 설명하시오." },
        { id: 23, text: "AED 패드의 정확한 부착 위치는?" },
        { id: 24, text: "소아용 AED 패드와 에너지 용량의 차이는?" },
        { id: 25, text: "AED가 제세동이 필요 없다고 분석할 때 조치는?" },
        { id: 26, text: "AED 충격 전 주변 사람에게 경고해야 하는 이유는?" },
        { id: 27, text: "젖은 환경에서 AED 사용 시 주의사항은?" },
        { id: 28, text: "환자에게 패치가 부착되어 있을 때 AED 사용법은?" },
        { id: 29, text: "AED 사용 중 환자가 움직이면 어떻게 해야 하는가?" },
        { id: 30, text: "AED 분석 중 가슴압박을 중단해야 하는 이유는?" },
      ]
    },
    {
      title: "기도폐쇄 처치",
      questions: [
        { id: 31, text: "기도폐쇄의 원인과 증상은?" },
        { id: 32, text: "의식 있는 성인의 기도폐쇄 처치법(복부밀어올리기)은?" },
        { id: 33, text: "의식 없는 환자의 기도폐쇄 처치법은?" },
        { id: 34, text: "영아의 기도폐쇄 처치법(등 두드리기/가슴압박)은?" },
        { id: 35, text: "임산부나 비만 환자의 기도폐쇄 처치법은?" },
        { id: 36, text: "기도폐쇄 환자가 의식을 잃으면 어떻게 해야 하는가?" },
        { id: 37, text: "부분 기도폐쇄와 완전 기도폐쇄의 차이점은?" },
        { id: 38, text: "기도폐쇄 예방을 위한 교육 내용은?" },
        { id: 39, text: "혼자 있을 때 기도폐쇄 발생 시 자가처치법은?" },
        { id: 40, text: "기도폐쇄 처치 후 의료기관 이송이 필요한 경우는?" },
      ]
    },
    {
      title: "기도 관리",
      questions: [
        { id: 41, text: "기도개방의 두 가지 기본 방법(머리젖힘-턱들기/턱밀어올리기)은?" },
        { id: 42, text: "경추 손상이 의심될 때 기도개방 방법은?" },
        { id: 43, text: "구강 대 구강 인공호흡의 방법과 주의사항은?" },
        { id: 44, text: "포켓마스크를 이용한 인공호흡 방법은?" },
        { id: 45, text: "백밸브마스크(BVM) 사용법과 환기량은?" },
        { id: 46, text: "효과적인 인공호흡의 확인 방법은?" },
        { id: 47, text: "인공호흡 시 위팽만(gastric inflation) 예방법은?" },
        { id: 48, text: "구인두기도기(OPA)의 적응증과 삽입 방법은?" },
        { id: 49, text: "비인두기도기(NPA)의 적응증과 삽입 방법은?" },
        { id: 50, text: "흡인(suction)이 필요한 상황과 방법은?" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/category/medical/paramedic-2" className="text-red-600 hover:text-red-800 mb-4 inline-block">
            ← 응급구조사 2급으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">심폐소생술/AED</h1>
          <p className="text-gray-600">응급구조사 2급 필기시험 - 기본소생술 및 자동제세동기</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-red-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-300"
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
                    <span className="text-2xl">❤️</span>
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
                            ? 'border-red-200 bg-red-50'
                            : 'border-gray-100 hover:border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              completedQuestions.includes(question.id)
                                ? 'border-red-500 bg-red-500'
                                : 'border-gray-300 hover:border-red-400'
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
                                href={`https://claude.ai/new?q=${encodeURIComponent(`응급구조사 2급 심폐소생술/AED 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                              >
                                Claude
                              </a>
                              <a
                                href={`https://chat.openai.com/?q=${encodeURIComponent(`응급구조사 2급 심폐소생술/AED 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                              >
                                ChatGPT
                              </a>
                              <a
                                href={`https://gemini.google.com/app?q=${encodeURIComponent(`응급구조사 2급 심폐소생술/AED 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
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
        <div className="mt-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 심폐소생술/AED 학습 포인트</h3>
          <ul className="space-y-1 text-red-100">
            <li>• C-A-B 순서(가슴압박-기도개방-인공호흡)를 정확히 기억하세요</li>
            <li>• 성인/소아/영아별 차이점을 구분해서 암기하세요</li>
            <li>• AED 사용 순서와 주의사항을 반복 학습하세요</li>
            <li>• 기도폐쇄 처치법은 실제 동작을 연습하면서 익히세요</li>
            <li>• 실기시험에서 가장 중요한 과목이므로 완벽히 숙지하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
