'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CardiacCarePage() {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('paramedic1-cardiac-care-completed');
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
      localStorage.setItem('paramedic1-cardiac-care-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const topics = [
    {
      title: "심전도 기초",
      questions: [
        { id: 1, text: "심전도의 P파가 나타내는 의미는 무엇인가?" },
        { id: 2, text: "QRS complex의 정상 폭(duration)은 얼마인가?" },
        { id: 3, text: "심전도에서 T파가 의미하는 것은 무엇인가?" },
        { id: 4, text: "정상 PR 간격의 범위는 얼마인가?" },
        { id: 5, text: "ST 분절 상승이 의미하는 바는 무엇인가?" },
        { id: 6, text: "심전도 리드 II에서 관찰되는 심장 부위는?" },
        { id: 7, text: "V1-V4 전흉부 유도에서 관찰되는 심장 부위는?" },
        { id: 8, text: "심전도 300법칙을 이용한 심박수 계산 방법은?" },
        { id: 9, text: "심전도에서 U파가 나타나는 원인은 무엇인가?" },
        { id: 10, text: "정상 QT 간격의 범위와 연장의 의미는?" },
      ]
    },
    {
      title: "부정맥 판독",
      questions: [
        { id: 11, text: "동성빈맥(Sinus Tachycardia)의 심전도 특징은?" },
        { id: 12, text: "심방세동(Atrial Fibrillation)의 심전도 소견은?" },
        { id: 13, text: "심방조동(Atrial Flutter)의 특징적인 파형은?" },
        { id: 14, text: "심실빈맥(Ventricular Tachycardia)의 심전도 특징은?" },
        { id: 15, text: "심실세동(Ventricular Fibrillation)의 특징과 치료는?" },
        { id: 16, text: "1도 방실차단의 심전도 소견은?" },
        { id: 17, text: "2도 방실차단 Mobitz Type I의 특징은?" },
        { id: 18, text: "2도 방실차단 Mobitz Type II의 특징과 위험성은?" },
        { id: 19, text: "3도(완전) 방실차단의 심전도 특징은?" },
        { id: 20, text: "조기심실수축(PVC)의 심전도 소견과 의미는?" },
      ]
    },
    {
      title: "급성관상동맥증후군",
      questions: [
        { id: 21, text: "STEMI의 정의와 심전도 진단 기준은?" },
        { id: 22, text: "NSTEMI와 불안정 협심증의 차이점은?" },
        { id: 23, text: "급성 심근경색의 초기 증상 중 비전형적 증상은?" },
        { id: 24, text: "심근경색 환자에서 '골든 타임'의 의미는?" },
        { id: 25, text: "전벽 심근경색의 심전도 변화가 나타나는 유도는?" },
        { id: 26, text: "하벽 심근경색의 심전도 변화가 나타나는 유도는?" },
        { id: 27, text: "급성관상동맥증후군 환자의 초기 약물 치료(MONA)는?" },
        { id: 28, text: "심근경색 환자에게 니트로글리세린 투여 금기 사항은?" },
        { id: 29, text: "급성 심근경색의 심장효소 마커와 상승 시간은?" },
        { id: 30, text: "우심실 경색의 특징적인 소견과 주의사항은?" },
      ]
    },
    {
      title: "심폐소생술",
      questions: [
        { id: 31, text: "성인 기본소생술(BLS)의 압박-인공호흡 비율은?" },
        { id: 32, text: "가슴압박의 적절한 깊이와 속도는?" },
        { id: 33, text: "제세동 가능 리듬(shockable rhythm)의 종류는?" },
        { id: 34, text: "자동제세동기(AED) 사용 시 주의사항은?" },
        { id: 35, text: "에피네프린의 심폐소생술 중 투여 용량과 간격은?" },
        { id: 36, text: "아미오다론의 심폐소생술 중 적응증과 용량은?" },
        { id: 37, text: "심폐소생술 중 가역적 원인(H's and T's)은?" },
        { id: 38, text: "무맥성 전기활동(PEA)의 치료 원칙은?" },
        { id: 39, text: "무수축(Asystole)의 치료 과정은?" },
        { id: 40, text: "자발순환회복(ROSC) 후 관리 원칙은?" },
      ]
    },
    {
      title: "심장응급 처치",
      questions: [
        { id: 41, text: "급성 심부전의 응급 처치 단계는?" },
        { id: 42, text: "심인성 쇼크의 특징적인 활력징후 패턴은?" },
        { id: 43, text: "고혈압성 응급(Hypertensive Emergency)의 정의와 처치는?" },
        { id: 44, text: "대동맥 박리의 전형적인 증상과 응급 처치는?" },
        { id: 45, text: "심장 탐포나드의 3대 징후(Beck's Triad)는?" },
        { id: 46, text: "심낭천자(Pericardiocentesis)의 적응증과 방법은?" },
        { id: 47, text: "동기화 심율동전환(Synchronized Cardioversion)의 적응증은?" },
        { id: 48, text: "경피적 심박조율(Transcutaneous Pacing)의 적응증은?" },
        { id: 49, text: "심장 환자 이송 시 주의사항과 모니터링 항목은?" },
        { id: 50, text: "심장응급 환자의 12유도 심전도 촬영 방법과 시점은?" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/certifications/paramedic-1" className="text-rose-600 hover:text-rose-800 mb-4 inline-block">
            ← 응급구조사 1급으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">심장응급</h1>
          <p className="text-gray-600">응급구조사 1급 필기시험 - 심전도 및 심장응급처치</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">학습 진행률</span>
            <span className="text-rose-600 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-rose-500 h-3 rounded-full transition-all duration-300"
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
                            ? 'border-rose-200 bg-rose-50'
                            : 'border-gray-100 hover:border-rose-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleQuestion(question.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              completedQuestions.includes(question.id)
                                ? 'border-rose-500 bg-rose-500'
                                : 'border-gray-300 hover:border-rose-400'
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
                                href={`https://claude.ai/new?q=${encodeURIComponent(`응급구조사 1급 심장응급 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
                              >
                                Claude
                              </a>
                              <a
                                href={`https://chat.openai.com/?q=${encodeURIComponent(`응급구조사 1급 심장응급 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                              >
                                ChatGPT
                              </a>
                              <a
                                href={`https://gemini.google.com/app?q=${encodeURIComponent(`응급구조사 1급 심장응급 문제입니다: "${question.text}" 이 문제에 대해 상세히 설명해주세요.`)}`}
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
        <div className="mt-8 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">💡 심장응급 학습 포인트</h3>
          <ul className="space-y-1 text-rose-100">
            <li>• 심전도 판독은 체계적인 접근법(Rate → Rhythm → Axis)이 중요합니다</li>
            <li>• 부정맥의 특징적인 파형을 반복 학습하세요</li>
            <li>• 급성관상동맥증후군의 12유도 심전도 해석법을 숙지하세요</li>
            <li>• 심폐소생술 알고리즘과 약물 용량을 정확히 암기하세요</li>
            <li>• 실제 시뮬레이션 훈련을 통해 술기를 연습하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
