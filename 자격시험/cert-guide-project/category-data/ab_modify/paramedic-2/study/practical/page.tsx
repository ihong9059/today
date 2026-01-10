'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic2-practical-completed');
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
      localStorage.setItem('paramedic2-practical-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "심폐소생술 술기",
      questions: [
        { id: 1, text: "성인 기본소생술의 전체 수행 순서를 시연하시오." },
        { id: 2, text: "AED 사용과 함께 심폐소생술을 수행하시오." },
        { id: 3, text: "영아 심폐소생술의 정확한 손 위치와 압박법을 시연하시오." },
        { id: 4, text: "의식 있는 환자의 기도폐쇄 처치(복부밀어올리기)를 시연하시오." },
        { id: 5, text: "백밸브마스크(BVM)를 이용한 인공호흡을 시연하시오." },
      ]
    },
    {
      title: "환자평가 술기",
      questions: [
        { id: 6, text: "1차 평가(ABCDE) 전 과정을 시연하시오." },
        { id: 7, text: "활력징후(맥박, 호흡, 혈압) 측정을 정확히 수행하시오." },
        { id: 8, text: "SAMPLE 병력 청취를 실제 시나리오로 수행하시오." },
        { id: 9, text: "Head-to-Toe 신체검사를 순서대로 시연하시오." },
        { id: 10, text: "의식 수준 평가(AVPU, GCS)를 수행하시오." },
      ]
    },
    {
      title: "응급처치 술기",
      questions: [
        { id: 11, text: "직접압박 지혈법과 지혈대 적용을 시연하시오." },
        { id: 12, text: "상지 골절에 부목과 삼각건을 적용하시오." },
        { id: 13, text: "하지 골절에 적절한 부목을 적용하시오." },
        { id: 14, text: "롤러붕대를 이용한 드레싱을 수행하시오." },
        { id: 15, text: "화상 환자 초기 처치를 시연하시오." },
      ]
    },
    {
      title: "척추고정 술기",
      questions: [
        { id: 16, text: "경추 고정대(C-collar) 적용을 시연하시오." },
        { id: 17, text: "긴 척추판(Long spine board)에 환자를 고정하시오." },
        { id: 18, text: "KED를 이용한 척추 고정을 시연하시오." },
        { id: 19, text: "로그롤 기법으로 환자를 이동시키시오." },
        { id: 20, text: "서 있는 환자를 척추판에 고정하는 전 과정을 시연하시오." },
      ]
    },
    {
      title: "환자이송 술기",
      questions: [
        { id: 21, text: "긴급 이동(옷 끌기, 담요 끌기)을 시연하시오." },
        { id: 22, text: "직접 들기(Direct ground lift)를 수행하시오." },
        { id: 23, text: "들것을 이용한 환자 이송을 시연하시오." },
        { id: 24, text: "계단에서 환자 이송 시 올바른 방향과 방법을 시연하시오." },
        { id: 25, text: "구급차 내 환자 고정과 인계 보고를 수행하시오." },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/category/medical/paramedic-2" className="text-purple-600 hover:text-purple-800 mb-4 inline-block">
            ← 응급구조사 2급으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">실기</h1>
          <p className="text-gray-600">응급구조사 2급 실기시험 - 술기 평가 대비</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-purple-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-500 h-3 rounded-full transition-all duration-300"
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
                    <span className="text-2xl">🎯</span>
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
                            ? 'border-purple-200 bg-purple-50'
                            : 'border-gray-100 hover:border-purple-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              completedQuestions.includes(question.id)
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300 hover:border-purple-400'
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
                                href={`https://claude.ai/new?q=${encodeURIComponent(`응급구조사 2급 실기시험 술기입니다: "${question.text}" 이 술기의 정확한 수행 순서와 주의사항을 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                              >
                                Claude
                              </a>
                              <a
                                href={`https://chat.openai.com/?q=${encodeURIComponent(`응급구조사 2급 실기시험 술기입니다: "${question.text}" 이 술기의 정확한 수행 순서와 주의사항을 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                              >
                                ChatGPT
                              </a>
                              <a
                                href={`https://gemini.google.com/app?q=${encodeURIComponent(`응급구조사 2급 실기시험 술기입니다: "${question.text}" 이 술기의 정확한 수행 순서와 주의사항을 상세히 설명해주세요.`)}`}
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
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 실기시험 준비 포인트</h3>
          <ul className="space-y-1 text-purple-100">
            <li>• 실기시험은 정해진 프로토콜을 정확한 순서로 수행해야 합니다</li>
            <li>• 심폐소생술이 가장 중요! 압박 깊이, 속도, 비율을 완벽히 숙지하세요</li>
            <li>• 술기 시행 전 환자 안전과 감염 예방 조치를 먼저 언급하세요</li>
            <li>• 마네킹을 이용한 실제 연습이 필수입니다</li>
            <li>• 시간 내에 정확하게 수행하는 연습을 반복하세요</li>
            <li>• 동영상 강의를 통해 올바른 동작을 눈에 익히세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
