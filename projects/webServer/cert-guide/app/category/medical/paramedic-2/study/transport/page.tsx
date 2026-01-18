'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TransportPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic2-transport-completed');
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
      localStorage.setItem('paramedic2-transport-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "이송 장비",
      questions: [
        { id: 1, text: "휠체어(Wheeled stretcher)의 구조와 사용법은?" },
        { id: 2, text: "바스켓 들것(Basket stretcher)의 용도와 사용 상황은?" },
        { id: 3, text: "스쿱 들것(Scoop stretcher)의 구조와 사용법은?" },
        { id: 4, text: "긴 척추판(Long spine board)의 용도와 고정 방법은?" },
        { id: 5, text: "짧은 척추판(Short spine board/KED)의 용도와 적용법은?" },
        { id: 6, text: "진공 들것(Vacuum mattress)의 원리와 장점은?" },
        { id: 7, text: "계단용 의자(Stair chair)의 사용 상황과 방법은?" },
        { id: 8, text: "응급 이송 담요(Emergency blanket)의 활용법은?" },
        { id: 9, text: "이송 장비 선택 시 고려해야 할 요소는?" },
        { id: 10, text: "이송 장비의 정기 점검 항목은?" },
      ]
    },
    {
      title: "척추 고정",
      questions: [
        { id: 11, text: "척추 손상이 의심되는 기전(MOI)은?" },
        { id: 12, text: "경추 고정대(Cervical collar)의 크기 선택 방법은?" },
        { id: 13, text: "경추 고정대 적용 순서를 설명하시오." },
        { id: 14, text: "도수 척추 고정(Manual stabilization) 방법은?" },
        { id: 15, text: "앙와위 환자의 긴 척추판 고정 절차는?" },
        { id: 16, text: "서 있는 환자의 긴 척추판 고정 방법은?" },
        { id: 17, text: "앉은 환자에서 KED 적용 순서는?" },
        { id: 18, text: "척추판에서 환자 고정 순서(가슴-골반-머리)의 이유는?" },
        { id: 19, text: "헬멧 착용 환자의 척추 고정 시 주의사항은?" },
        { id: 20, text: "척추 고정 중 환자가 구토 시 대처 방법은?" },
      ]
    },
    {
      title: "환자 이동 기술",
      questions: [
        { id: 21, text: "환자 이동 전 확인해야 할 사항은?" },
        { id: 22, text: "긴급 이동(Emergency move)이 필요한 상황은?" },
        { id: 23, text: "옷 끌기(Clothes drag) 방법을 설명하시오." },
        { id: 24, text: "담요 끌기(Blanket drag) 방법은?" },
        { id: 25, text: "소방관 끌기(Firefighter's drag)와 업기(Carry)는?" },
        { id: 26, text: "비긴급 이동(Non-emergency move)의 종류는?" },
        { id: 27, text: "직접 들기(Direct ground lift) 방법은?" },
        { id: 28, text: "익스트리케이션(Extremity lift) 방법은?" },
        { id: 29, text: "로그롤(Log roll) 기법과 적용 상황은?" },
        { id: 30, text: "2인 이상의 들것 이동 시 협동 방법은?" },
      ]
    },
    {
      title: "특수 상황 이송",
      questions: [
        { id: 31, text: "계단 이송 시 환자 머리 방향과 그 이유는?" },
        { id: 32, text: "좁은 공간에서의 이송 기법은?" },
        { id: 33, text: "경사면 이송 시 주의사항은?" },
        { id: 34, text: "비만 환자 이송 시 고려사항은?" },
        { id: 35, text: "소아 환자 이송 시 특별 고려사항은?" },
        { id: 36, text: "임산부 이송 시 체위와 주의사항은?" },
        { id: 37, text: "정신과 환자 이송 시 주의사항은?" },
        { id: 38, text: "심폐소생술 중 이송 방법은?" },
        { id: 39, text: "차량 내 환자 구출(Vehicle extrication) 기본 원칙은?" },
        { id: 40, text: "다수 환자 발생 시 이송 우선순위 결정 방법은?" },
      ]
    },
    {
      title: "이송 중 관리",
      questions: [
        { id: 41, text: "이송 중 환자 모니터링 항목은?" },
        { id: 42, text: "이송 중 환자 상태 변화 시 대응 방법은?" },
        { id: 43, text: "이송 중 재평가 시점과 빈도는?" },
        { id: 44, text: "환자 보온 유지의 중요성과 방법은?" },
        { id: 45, text: "이송 중 산소 투여 관리 방법은?" },
        { id: 46, text: "이송 중 수액 라인 관리 주의사항은?" },
        { id: 47, text: "구급차 내 환자 고정 방법은?" },
        { id: 48, text: "이송 기록(PCR) 작성 항목은?" },
        { id: 49, text: "병원 도착 전 인계(Pre-arrival report) 내용은?" },
        { id: 50, text: "병원 인계 시 SBAR/MIST 보고 방법은?" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/category/medical/paramedic-2" className="text-green-600 hover:text-green-800 mb-4 inline-block">
            ← 응급구조사 2급으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">환자이송</h1>
          <p className="text-gray-600">응급구조사 2급 필기시험 - 이송장비 및 이송기술</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-green-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
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
                    <span className="text-2xl">🚑</span>
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
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-100 hover:border-green-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              completedQuestions.includes(question.id)
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-300 hover:border-green-400'
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
                                href={`https://claude.ai/new?q=${encodeURIComponent(`응급구조사 2급 환자이송 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                              >
                                Claude
                              </a>
                              <a
                                href={`https://chat.openai.com/?q=${encodeURIComponent(`응급구조사 2급 환자이송 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                              >
                                ChatGPT
                              </a>
                              <a
                                href={`https://gemini.google.com/app?q=${encodeURIComponent(`응급구조사 2급 환자이송 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
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
        <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 환자이송 학습 포인트</h3>
          <ul className="space-y-1 text-green-100">
            <li>• 다양한 이송 장비의 명칭과 용도를 정확히 구분하세요</li>
            <li>• 척추 고정 순서(경추→몸통→머리)를 반드시 기억하세요</li>
            <li>• 긴급/비긴급 이동 상황의 구분과 적절한 기법을 선택하세요</li>
            <li>• 특수 환자(임산부, 소아, 비만)별 이송 주의사항을 숙지하세요</li>
            <li>• 이송 중 재평가와 기록 작성의 중요성을 기억하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
