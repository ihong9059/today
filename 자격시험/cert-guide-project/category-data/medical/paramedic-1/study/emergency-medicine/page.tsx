'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EmergencyMedicinePage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const topics = [
    {
      id: 'ems-system',
      title: '응급의료체계',
      questions: [
        {
          id: 1,
          question: '응급의료체계의 구성요소 5가지는?',
          answer: '1) 대중 접근성 (Public Access)\n2) 초기 응급처치 (First Response)\n3) 병원 전 응급처치 (Prehospital Care)\n4) 응급실 치료 (Emergency Department Care)\n5) 최종 치료 (Definitive Care)',
          prompt: '응급의료체계의 5가지 구성요소와 각각의 역할을 상세히 설명해주세요.'
        },
        {
          id: 2,
          question: '응급의료정보센터(1339)의 역할은?',
          answer: '- 응급의료상담 제공\n- 적정 응급의료기관 안내\n- 구급차 이송병원 선정\n- 응급의료자원 정보 제공\n- 재난 시 응급의료 조정',
          prompt: '응급의료정보센터(1339)의 주요 기능과 중요성에 대해 설명해주세요.'
        },
        {
          id: 3,
          question: '응급의료기관의 3단계 분류는?',
          answer: '1) 권역응급의료센터: 중증응급환자 전담, 24시간 전문의 진료\n2) 지역응급의료센터: 해당 지역 응급환자 진료\n3) 지역응급의료기관: 기본적인 응급환자 진료',
          prompt: '응급의료기관의 3단계 분류 체계와 각 단계별 기능을 설명해주세요.'
        }
      ]
    },
    {
      id: 'patient-assessment',
      title: '환자평가',
      questions: [
        {
          id: 1,
          question: '1차 평가(Primary Survey)의 ABCDE는?',
          answer: 'A - Airway (기도)\nB - Breathing (호흡)\nC - Circulation (순환)\nD - Disability (신경학적 상태)\nE - Exposure (노출 및 체온)',
          prompt: '1차 평가 ABCDE의 각 단계별 평가 방법과 중요성을 설명해주세요.'
        },
        {
          id: 2,
          question: 'GCS(Glasgow Coma Scale)의 구성요소는?',
          answer: '1) 눈뜨기 반응 (Eye Opening, 4점)\n2) 언어 반응 (Verbal Response, 5점)\n3) 운동 반응 (Motor Response, 6점)\n총점: 3~15점 (낮을수록 중증)',
          prompt: 'GCS의 각 구성요소별 평가 방법과 점수 해석에 대해 설명해주세요.'
        },
        {
          id: 3,
          question: 'SAMPLE 병력청취의 의미는?',
          answer: 'S - Signs/Symptoms (증상)\nA - Allergies (알레르기)\nM - Medications (복용약물)\nP - Past medical history (과거병력)\nL - Last oral intake (마지막 식사)\nE - Events (발병 경위)',
          prompt: 'SAMPLE 병력청취의 각 항목이 왜 중요한지 설명해주세요.'
        }
      ]
    },
    {
      id: 'emergency-principles',
      title: '응급처치 원칙',
      questions: [
        {
          id: 1,
          question: '현장 안전평가의 3단계는?',
          answer: '1) 현장 안전 확인 (Scene Safety)\n   - 구조자, 환자, 주변인의 안전\n2) 상황 파악 (Situation Assessment)\n   - 사고 기전, 환자 수, 필요 자원\n3) 표준주의 (Standard Precautions)\n   - 개인보호장구 착용',
          prompt: '현장 안전평가가 왜 최우선이며, 각 단계에서 확인해야 할 사항을 설명해주세요.'
        },
        {
          id: 2,
          question: '응급처치의 우선순위 결정 원칙은?',
          answer: '1순위: 생명을 위협하는 상태\n   - 기도폐쇄, 심정지, 대량출혈\n2순위: 장애를 남길 수 있는 상태\n   - 척추손상, 개방골절\n3순위: 그 외의 손상\n   - 단순 열상, 타박상',
          prompt: '응급상황에서 여러 환자가 있을 때 우선순위를 어떻게 결정하는지 설명해주세요.'
        },
        {
          id: 3,
          question: '표준주의(Standard Precautions)의 핵심은?',
          answer: '- 모든 환자의 혈액과 체액을 감염원으로 간주\n- 개인보호장구(PPE) 착용 필수\n  · 장갑, 마스크, 보안경, 가운\n- 손위생 철저히 시행\n- 날카로운 기구 안전 관리',
          prompt: '표준주의의 개념과 응급구조사가 지켜야 할 감염관리 원칙을 설명해주세요.'
        }
      ]
    },
    {
      id: 'communication',
      title: '의사소통 및 기록',
      questions: [
        {
          id: 1,
          question: '환자 이송 시 병원 보고 내용은?',
          answer: '1) 환자 기본 정보 (나이, 성별)\n2) 주 증상 및 발병시간\n3) 활력징후\n4) 과거병력 및 복용약물\n5) 시행한 응급처치\n6) 예상 도착 시간',
          prompt: '병원 전 단계에서 병원으로의 효과적인 환자 정보 전달 방법을 설명해주세요.'
        },
        {
          id: 2,
          question: '응급활동일지 작성의 중요성은?',
          answer: '- 법적 증거자료로 활용\n- 환자 치료의 연속성 보장\n- 의료진 간 정보 공유\n- 질 관리 및 통계 자료\n- 교육 및 연구 자료',
          prompt: '응급활동일지의 법적 의미와 정확한 기록이 중요한 이유를 설명해주세요.'
        },
        {
          id: 3,
          question: 'SBAR 의사소통 기법이란?',
          answer: 'S - Situation (상황): 현재 상황\nB - Background (배경): 관련 배경정보\nA - Assessment (평가): 평가 결과\nR - Recommendation (권고): 제안사항\n\n간결하고 체계적인 정보 전달 가능',
          prompt: 'SBAR 의사소통 기법을 응급상황에서 어떻게 활용하는지 예시와 함께 설명해주세요.'
        }
      ]
    }
  ];

  const currentQuestion = topics[selectedTopic].questions[selectedQuestion];

  const handleAIClick = (aiType: string) => {
    const prompts = {
      claude: currentQuestion.prompt,
      chatgpt: currentQuestion.prompt,
      gemini: currentQuestion.prompt
    };

    const urls = {
      claude: 'https://claude.ai',
      chatgpt: 'https://chat.openai.com',
      gemini: 'https://gemini.google.com'
    };

    const message = `${prompts[aiType as keyof typeof prompts]}`;

    navigator.clipboard.writeText(message);
    alert(`질문이 클립보드에 복사되었습니다!\n${urls[aiType as keyof typeof urls]} 에서 붙여넣기 하세요.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/자격시험/medical/paramedic-1"
            className="text-red-600 hover:text-red-800 font-semibold mb-4 inline-block"
          >
            ← 응급구조사 1급 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-red-600 mb-2">응급의학총론</h1>
          <p className="text-gray-600">응급의료체계, 응급처치 원칙, 환자평가</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 주제 목록 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">학습 주제</h2>
              <div className="space-y-2">
                {topics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(index);
                      setSelectedQuestion(0);
                      setShowAnswer(false);
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedTopic === index
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-red-50'
                    }`}
                  >
                    <div className="font-semibold">{topic.title}</div>
                    <div className={`text-sm ${selectedTopic === index ? 'text-red-100' : 'text-gray-500'}`}>
                      {topic.questions.length}개 문항
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 질문 및 답변 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {topics[selectedTopic].title}
                </h2>
                <span className="text-sm text-gray-500">
                  {selectedQuestion + 1} / {topics[selectedTopic].questions.length}
                </span>
              </div>

              {/* 질문 네비게이션 */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {topics[selectedTopic].questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedQuestion(index);
                      setShowAnswer(false);
                    }}
                    className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                      selectedQuestion === index
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* 질문 */}
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">질문</h3>
                <p className="text-gray-700 text-lg">{currentQuestion.question}</p>
              </div>

              {/* 답변 표시/숨기기 버튼 */}
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors mb-4"
              >
                {showAnswer ? '답변 숨기기' : '답변 보기'}
              </button>

              {/* 답변 */}
              {showAnswer && (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">답변</h3>
                  <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {currentQuestion.answer}
                  </div>
                </div>
              )}

              {/* AI 도우미 버튼 */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">AI로 더 깊이 학습하기</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  질문이 클립보드에 복사됩니다. AI 사이트에서 붙여넣기하여 더 자세한 설명을 받아보세요.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleAIClick('claude')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Claude
                  </button>
                  <button
                    onClick={() => handleAIClick('chatgpt')}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all"
                  >
                    ChatGPT
                  </button>
                  <button
                    onClick={() => handleAIClick('gemini')}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
                  >
                    Gemini
                  </button>
                </div>
              </div>

              {/* 네비게이션 버튼 */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    if (selectedQuestion > 0) {
                      setSelectedQuestion(selectedQuestion - 1);
                      setShowAnswer(false);
                    }
                  }}
                  disabled={selectedQuestion === 0}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  이전 문제
                </button>
                <button
                  onClick={() => {
                    if (selectedQuestion < topics[selectedTopic].questions.length - 1) {
                      setSelectedQuestion(selectedQuestion + 1);
                      setShowAnswer(false);
                    }
                  }}
                  disabled={selectedQuestion === topics[selectedTopic].questions.length - 1}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음 문제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
