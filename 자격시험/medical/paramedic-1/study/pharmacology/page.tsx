'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PharmacologyPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const topics = [
    {
      id: 'basic-pharmacology',
      title: '약리학 기본',
      questions: [
        {
          id: 1,
          question: '약물의 투여경로 종류와 특징은?',
          answer: '경구 투여 (PO):\n- 가장 안전하고 편리\n- 효과 발현 느림\n- 응급상황 부적합\n\n정맥 투여 (IV):\n- 가장 빠른 효과\n- 용량 조절 용이\n- 응급상황에 적합\n\n근육 투여 (IM):\n- 경구보다 빠름\n- 일정한 흡수\n\n피하 투여 (SC):\n- 느린 흡수\n- 지속적 효과\n\n흡입 투여:\n- 호흡기 질환에 효과적\n- 빠른 작용',
          prompt: '약물 투여경로의 종류와 각각의 장단점, 그리고 응급상황에서의 선택 기준을 설명해주세요.'
        },
        {
          id: 2,
          question: '약물의 작용 기전 4가지는?',
          answer: '1) 수용체 작용:\n   - 작용제 (Agonist): 수용체 활성화\n   - 길항제 (Antagonist): 수용체 차단\n\n2) 효소 억제:\n   - 특정 효소 활성 차단\n\n3) 물리화학적 작용:\n   - pH 변화, 삼투압 변화\n\n4) 대사 경로 변화:\n   - 세포 대사 과정 조절',
          prompt: '약물 작용 기전의 종류와 각각의 예시 약물, 그리고 임상적 의미를 설명해주세요.'
        },
        {
          id: 3,
          question: '약물의 부작용과 금기사항은?',
          answer: '부작용 종류:\n1) 용량 관련: 과다투여 시 발생\n2) 알레르기 반응: 면역반응\n3) 특이체질 반응: 유전적 요인\n4) 약물 상호작용: 다른 약물과 반응\n\n금기사항:\n- 절대 금기: 절대 사용 불가\n- 상대 금기: 주의하여 사용\n\n확인사항:\n- 알레르기 병력\n- 복용 중인 약물\n- 임신/수유 여부',
          prompt: '약물 부작용의 종류와 예방법, 그리고 금기사항 확인의 중요성을 설명해주세요.'
        }
      ]
    },
    {
      id: 'cardiovascular-drugs',
      title: '심혈관계 약물',
      questions: [
        {
          id: 1,
          question: '에피네프린(Epinephrine)의 작용과 용량은?',
          answer: '작용:\n- α 수용체: 혈관수축\n- β1 수용체: 심박수↑, 수축력↑\n- β2 수용체: 기관지 확장\n\n적응증:\n- 심정지 (1mg IV/IO, 3-5분마다)\n- 아나필락시스 (0.3-0.5mg IM)\n- 천식 발작\n\n부작용:\n- 빈맥, 고혈압\n- 부정맥\n- 심근 산소요구량 증가',
          prompt: '에피네프린의 약리작용과 심정지, 아나필락시스에서의 사용법을 상세히 설명해주세요.'
        },
        {
          id: 2,
          question: '아트로핀(Atropine)의 작용과 적응증은?',
          answer: '작용:\n- 부교감신경 차단\n- 심박수 증가\n- 기관지 분비물 감소\n\n적응증:\n- 서맥 (0.5-1mg IV, 3-5분마다)\n- 유기인 중독\n- 기관삽관 전 처치\n\n금기:\n- 빈맥\n- 녹내장\n- 전립선 비대\n\n부작용:\n- 구갈, 시야 흐림\n- 요정체',
          prompt: '아트로핀의 약리작용과 서맥 치료에서의 역할, 주의사항을 설명해주세요.'
        },
        {
          id: 3,
          question: '니트로글리세린(Nitroglycerin)의 작용은?',
          answer: '작용:\n- 정맥 확장 → 전부하 감소\n- 관상동맥 확장 → 심근 혈류 증가\n- 심근 산소요구량 감소\n\n적응증:\n- 협심증\n- 급성 심근경색\n- 급성 심부전\n\n용법:\n- 설하정: 0.4mg, 5분마다 (최대 3회)\n- IV: 용량 조절\n\n금기:\n- 수축기 혈압 <90mmHg\n- 우심실 경색\n- 최근 비아그라 복용',
          prompt: '니트로글리세린의 작용기전과 협심증 치료에서의 사용법, 금기사항을 설명해주세요.'
        }
      ]
    },
    {
      id: 'respiratory-drugs',
      title: '호흡기계 약물',
      questions: [
        {
          id: 1,
          question: '기관지 확장제의 종류와 작용은?',
          answer: '속효성 β2 작용제:\n- 살부타몰 (Albuterol)\n- 즉각적 기관지 확장\n- 천식 발작 1차 치료\n\n항콜린제:\n- 이프라트로피움 (Ipratropium)\n- 기관지 분비물 감소\n- β2 작용제와 병용\n\n용법:\n- 흡입: 2-4회 분무\n- 필요시 20분마다 반복',
          prompt: '기관지 확장제의 종류와 천식 급성 악화 시 사용법을 설명해주세요.'
        },
        {
          id: 2,
          question: '스테로이드의 응급 사용은?',
          answer: '작용:\n- 강력한 항염증 효과\n- 면역 억제\n- 기관지 부종 감소\n\n적응증:\n- 천식 급성 악화\n- COPD 악화\n- 아나필락시스\n- 척수 손상\n\n약물:\n- 메틸프레드니솔론 (Methylprednisolone)\n- 덱사메타손 (Dexamethasone)\n\n주의:\n- 효과 발현 늦음 (수 시간)\n- 장기 사용 시 부작용',
          prompt: '스테로이드의 항염증 작용과 응급상황에서의 사용 적응증을 설명해주세요.'
        },
        {
          id: 3,
          question: '산소 투여의 원칙과 방법은?',
          answer: '적응증:\n- SpO2 <94%\n- 호흡곤란\n- 쇼크\n- 심근경색\n- 외상\n\n투여 방법:\n1) 비강 캐뉼라: 1-6 L/min (24-44%)\n2) 단순 마스크: 6-10 L/min (35-60%)\n3) 비재호흡 마스크: 10-15 L/min (60-95%)\n4) 벤츄리 마스크: 정확한 FiO2\n\n주의:\n- COPD: 목표 SpO2 88-92%\n- 과도한 산소: CO2 저류 악화',
          prompt: '산소 투여 방법의 종류와 각 상황에 맞는 선택 기준을 설명해주세요.'
        }
      ]
    },
    {
      id: 'analgesics',
      title: '진통제',
      questions: [
        {
          id: 1,
          question: '마약성 진통제의 종류와 작용은?',
          answer: '모르핀 (Morphine):\n- 강력한 진통 효과\n- 용량: 2-4mg IV, 5-10분마다\n- 부작용: 호흡억제, 저혈압\n\n펜타닐 (Fentanyl):\n- 모르핀보다 100배 강력\n- 빠른 작용, 짧은 지속시간\n- 용량: 50-100mcg IV\n\n길항제:\n- 날록손 (Naloxone)\n- 과량투여 시 사용',
          prompt: '마약성 진통제의 작용기전과 응급상황에서의 안전한 사용법을 설명해주세요.'
        },
        {
          id: 2,
          question: '비마약성 진통제의 종류는?',
          answer: '아세트아미노펜 (Acetaminophen):\n- 해열, 진통 효과\n- 항염증 효과 없음\n- 간독성 주의\n\nNSAIDs:\n- 이부프로펜, 케토롤락\n- 항염증, 진통, 해열\n- 위장장애, 신독성 주의\n\n용도:\n- 경증-중등도 통증\n- 염증성 질환',
          prompt: '비마약성 진통제의 종류와 각각의 장단점, 부작용을 설명해주세요.'
        },
        {
          id: 3,
          question: '진통제 사용 시 주의사항은?',
          answer: '평가:\n- 통증 강도 평가 (0-10점)\n- 통증 위치, 성격\n- 활력징후 확인\n\n투여 원칙:\n- 적정 용량부터 시작\n- 효과 및 부작용 모니터링\n- 호흡, 혈압 관찰\n\n금기:\n- 두부 외상 (의식 평가 방해)\n- 복부 통증 (진단 방해 가능)\n- 알레르기\n\n길항제 준비:\n- 날록손 (마약성)\n- 플루마제닐 (벤조디아제핀)',
          prompt: '응급상황에서 진통제를 안전하게 사용하기 위한 평가와 모니터링 방법을 설명해주세요.'
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/자격시험/medical/paramedic-1"
            className="text-green-600 hover:text-green-800 font-semibold mb-4 inline-block"
          >
            ← 응급구조사 1급 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-green-600 mb-2">약리학</h1>
          <p className="text-gray-600">응급약물, 투여경로, 약물작용</p>
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
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-green-50'
                    }`}
                  >
                    <div className="font-semibold">{topic.title}</div>
                    <div className={`text-sm ${selectedTopic === index ? 'text-green-100' : 'text-gray-500'}`}>
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
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* 질문 */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">질문</h3>
                <p className="text-gray-700 text-lg">{currentQuestion.question}</p>
              </div>

              {/* 답변 표시/숨기기 버튼 */}
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors mb-4"
              >
                {showAnswer ? '답변 숨기기' : '답변 보기'}
              </button>

              {/* 답변 */}
              {showAnswer && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
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
                  className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
