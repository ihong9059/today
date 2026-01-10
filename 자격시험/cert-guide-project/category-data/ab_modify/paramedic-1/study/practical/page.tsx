'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PracticalPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic1-practical-completed');
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
      localStorage.setItem('paramedic1-practical-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "기본 심폐소생술 술기",
      questions: [
        { id: 1, text: "성인 심폐소생술의 정확한 손 위치와 압박 방법은?" },
        { id: 2, text: "AED 패드 부착 위치와 사용 순서를 설명하시오." },
        { id: 3, text: "BVM(백밸브마스크)을 이용한 인공호흡 방법은?" },
        { id: 4, text: "기도폐쇄 환자의 복부밀어올리기(하임리히) 시행 방법은?" },
        { id: 5, text: "영아 심폐소생술의 압박 방법과 위치의 차이점은?" },
      ]
    },
    {
      title: "전문 기도관리 술기",
      questions: [
        { id: 6, text: "기관내삽관(Intubation)의 시행 순서와 확인 방법은?" },
        { id: 7, text: "후두마스크기도기(LMA) 삽입 방법과 적응증은?" },
        { id: 8, text: "식도폐쇄기도기(Combitube) 사용법과 주의사항은?" },
        { id: 9, text: "흡인(Suction) 기법과 적절한 흡인 시간은?" },
        { id: 10, text: "윤상갑상막절개술(Cricothyrotomy)의 적응증과 방법은?" },
      ]
    },
    {
      title: "정맥로 확보 및 약물 투여",
      questions: [
        { id: 11, text: "말초정맥로 확보 시 혈관 선택 순서와 방법은?" },
        { id: 12, text: "골내주사(IO) 삽입 위치와 적응증은?" },
        { id: 13, text: "에피네프린 1:1000과 1:10000의 차이와 투여 방법은?" },
        { id: 14, text: "수액 투여 시 적하계수를 이용한 투여 속도 계산은?" },
        { id: 15, text: "약물 투여 시 안전 확인 사항(5 Rights)은?" },
      ]
    },
    {
      title: "외상 처치 술기",
      questions: [
        { id: 16, text: "경추고정대(C-collar) 적용 방법과 크기 선택법은?" },
        { id: 17, text: "긴척추고정판(Long Backboard) 사용 시 환자 고정 방법은?" },
        { id: 18, text: "부목(Splint) 적용의 일반 원칙과 방법은?" },
        { id: 19, text: "지혈대(Tourniquet) 적용 위치와 시간 기록의 중요성은?" },
        { id: 20, text: "견인부목(Traction Splint) 적용 방법과 적응증은?" },
      ]
    },
    {
      title: "환자 평가 및 이송",
      questions: [
        { id: 21, text: "1차 평가(Primary Survey) ABCDE 각 단계별 확인 항목은?" },
        { id: 22, text: "활력징후 측정 방법과 정상 범위는?" },
        { id: 23, text: "12유도 심전도 전극 부착 위치와 순서는?" },
        { id: 24, text: "환자 이송 시 사용되는 장비와 고정 방법은?" },
        { id: 25, text: "병원 도착 전 인계 보고(SBAR/MIST) 방법은?" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/certifications/paramedic-1" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← 응급구조사 1급으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">실기</h1>
          <p className="text-gray-600">응급구조사 1급 실기시험 - 술기 평가 대비</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-blue-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
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
                            ? 'border-blue-200 bg-blue-50'
                            : 'border-gray-100 hover:border-blue-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              completedQuestions.includes(question.id)
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300 hover:border-blue-400'
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
                                href={`https://claude.ai/new?q=${encodeURIComponent(`응급구조사 1급 실기시험 문제입니다: "${question.text}" 이 술기에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                              >
                                Claude
                              </a>
                              <a
                                href={`https://chat.openai.com/?q=${encodeURIComponent(`응급구조사 1급 실기시험 문제입니다: "${question.text}" 이 술기에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                              >
                                ChatGPT
                              </a>
                              <a
                                href={`https://gemini.google.com/app?q=${encodeURIComponent(`응급구조사 1급 실기시험 문제입니다: "${question.text}" 이 술기에 대해 상세히 설명해주세요.`)}`}
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
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 실기시험 준비 포인트</h3>
          <ul className="space-y-1 text-blue-100">
            <li>• 실기시험은 정해진 프로토콜과 순서를 정확히 따라야 합니다</li>
            <li>• 술기 시행 전 환자 안전과 감염 방지 조치를 먼저 확인하세요</li>
            <li>• 각 술기의 금기사항과 합병증을 반드시 숙지하세요</li>
            <li>• 마네킹 실습을 통해 실제와 동일한 환경에서 연습하세요</li>
            <li>• 시간 제한 내 정확하게 수행하는 연습을 반복하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
