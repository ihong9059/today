'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PatientAssessmentPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic2-patient-assessment-completed');
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
      localStorage.setItem('paramedic2-patient-assessment-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "현장 안전 및 1차 평가",
      questions: [
        { id: 1, text: "현장 도착 시 가장 먼저 확인해야 할 사항은?" },
        { id: 2, text: "현장 안전 확인이 중요한 이유는?" },
        { id: 3, text: "1차 평가(Primary Survey)의 목적과 순서는?" },
        { id: 4, text: "의식 확인 방법(AVPU)을 설명하시오." },
        { id: 5, text: "기도 개방 여부 확인 방법은?" },
        { id: 6, text: "호흡 확인을 위한 '보고-듣고-느끼기' 방법은?" },
        { id: 7, text: "순환 상태 평가 시 확인해야 할 항목은?" },
        { id: 8, text: "맥박 확인 위치(경동맥, 요골동맥 등)와 상황별 선택은?" },
        { id: 9, text: "중증 출혈 확인 및 조치의 우선순위는?" },
        { id: 10, text: "1차 평가에서 발견된 생명위협 상황의 즉각 조치 원칙은?" },
      ]
    },
    {
      title: "2차 평가",
      questions: [
        { id: 11, text: "2차 평가(Secondary Survey)의 목적과 시점은?" },
        { id: 12, text: "머리에서 발끝까지(Head-to-Toe) 신체검사 순서는?" },
        { id: 13, text: "두부 검사 시 확인해야 할 항목은?" },
        { id: 14, text: "경부 검사 시 주의사항과 확인 항목은?" },
        { id: 15, text: "흉부 검사 방법(시진, 촉진, 청진, 타진)은?" },
        { id: 16, text: "복부 검사 시 사분면 구분과 확인 항목은?" },
        { id: 17, text: "골반 검사 시 주의사항은?" },
        { id: 18, text: "사지 검사 시 확인해야 할 항목(PMS)은?" },
        { id: 19, text: "신경학적 검사의 기본 항목은?" },
        { id: 20, text: "중점 신체검사와 전신 신체검사의 차이는?" },
      ]
    },
    {
      title: "활력징후",
      questions: [
        { id: 21, text: "활력징후(Vital Signs)의 종류와 정상 범위는?" },
        { id: 22, text: "맥박 측정 방법과 정상 성인의 맥박수는?" },
        { id: 23, text: "맥박의 특성(빈도, 리듬, 강도) 평가법은?" },
        { id: 24, text: "호흡수 측정 방법과 정상 범위는?" },
        { id: 25, text: "비정상적인 호흡 양상의 종류와 특징은?" },
        { id: 26, text: "혈압 측정 방법(청진법)을 설명하시오." },
        { id: 27, text: "수축기 혈압과 이완기 혈압의 의미는?" },
        { id: 28, text: "맥압(Pulse Pressure)의 계산과 의미는?" },
        { id: 29, text: "체온 측정 방법과 부위별 정상 범위는?" },
        { id: 30, text: "산소포화도(SpO2) 측정과 정상 범위는?" },
      ]
    },
    {
      title: "병력 청취(SAMPLE)",
      questions: [
        { id: 31, text: "SAMPLE 병력 청취법의 각 항목을 설명하시오." },
        { id: 32, text: "S(Signs/Symptoms) - 증상 청취 시 확인할 내용은?" },
        { id: 33, text: "A(Allergies) - 알레르기 확인의 중요성은?" },
        { id: 34, text: "M(Medications) - 복용 약물 확인 방법은?" },
        { id: 35, text: "P(Past medical history) - 과거력 청취 항목은?" },
        { id: 36, text: "L(Last oral intake) - 마지막 식사 확인 이유는?" },
        { id: 37, text: "E(Events) - 사고/발병 당시 상황 파악 방법은?" },
        { id: 38, text: "OPQRST를 이용한 통증 평가법을 설명하시오." },
        { id: 39, text: "무의식 환자의 병력 청취 방법은?" },
        { id: 40, text: "소아 환자 병력 청취 시 주의사항은?" },
      ]
    },
    {
      title: "환자 상태 판단",
      questions: [
        { id: 41, text: "응급 환자와 비응급 환자의 구분 기준은?" },
        { id: 42, text: "의식 수준 평가(GCS)의 구성 요소와 점수는?" },
        { id: 43, text: "동공 검사 방법과 비정상 소견은?" },
        { id: 44, text: "청색증(Cyanosis)의 의미와 관찰 부위는?" },
        { id: 45, text: "피부색, 온도, 습도의 평가와 의미는?" },
        { id: 46, text: "모세혈관 재충전 시간(CRT) 검사 방법과 의미는?" },
        { id: 47, text: "경정맥 팽창(JVD)의 의미와 확인 방법은?" },
        { id: 48, text: "환자 상태 변화 시 재평가 시점과 방법은?" },
        { id: 49, text: "중증도 분류(Triage)의 기본 원칙은?" },
        { id: 50, text: "환자 평가 결과의 기록과 인계 방법은?" },
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
          <Link href="/category/medical/paramedic-2" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← 응급구조사 2급으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">환자평가</h1>
          <p className="text-gray-600">응급구조사 2급 필기시험 - 환자평가 및 활력징후</p>
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
                    <span className="text-2xl">🔍</span>
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
                                href={`https://claude.ai/new?q=${encodeURIComponent(`응급구조사 2급 환자평가 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                              >
                                Claude
                              </a>
                              <a
                                href={`https://chat.openai.com/?q=${encodeURIComponent(`응급구조사 2급 환자평가 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                              >
                                ChatGPT
                              </a>
                              <a
                                href={`https://gemini.google.com/app?q=${encodeURIComponent(`응급구조사 2급 환자평가 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
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
          <h3 className="text-xl font-bold mb-2">💡 환자평가 학습 포인트</h3>
          <ul className="space-y-1 text-blue-100">
            <li>• 현장 안전 → 1차 평가 → 2차 평가 순서를 정확히 기억하세요</li>
            <li>• AVPU, SAMPLE, OPQRST 등 약어의 의미를 완벽히 숙지하세요</li>
            <li>• 활력징후의 정상 범위와 측정 방법을 암기하세요</li>
            <li>• Head-to-Toe 신체검사 순서와 각 부위별 확인 항목을 정리하세요</li>
            <li>• 실기시험과 연계되므로 실제 수행 절차를 연습하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
