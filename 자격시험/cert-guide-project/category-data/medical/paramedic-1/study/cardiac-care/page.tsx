'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CardiacCarePage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const topics = [
    {
      id: 'cpr',
      title: '심폐소생술 (CPR)',
      questions: [
        {
          id: 1,
          question: '성인 기본소생술(BLS)의 순서와 방법은?',
          answer: '1. 반응 확인:\n   - 어깨 두드리며 "괜찮으세요?"\n\n2. 119 신고 및 AED 요청\n\n3. 호흡 확인 (10초 이내):\n   - 정상 호흡 없으면 CPR 시작\n\n4. 가슴압박 30회:\n   - 위치: 가슴 중앙 (흉골 하부 1/2)\n   - 깊이: 5-6cm\n   - 속도: 100-120회/분\n   - 완전한 이완\n\n5. 인공호흡 2회:\n   - 1초간, 가슴 올라올 정도\n\n6. 30:2 비율로 반복',
          prompt: '성인 심폐소생술의 단계별 방법과 고품질 CPR의 요소를 설명해주세요.'
        },
        {
          id: 2,
          question: '고품질 CPR의 5가지 핵심 요소는?',
          answer: '1) 적절한 압박 깊이:\n   - 성인: 5-6cm\n   - 소아: 4-5cm\n   - 영아: 4cm\n\n2) 적절한 압박 속도:\n   - 100-120회/분\n\n3) 완전한 가슴 이완:\n   - 매 압박 후 완전 복귀\n\n4) 중단 최소화:\n   - 10초 이내\n   - 압박 분율 >60%\n\n5) 과도한 환기 방지:\n   - 30:2 비율 유지\n   - 1초간 2회',
          prompt: '고품질 CPR의 각 요소가 왜 중요한지, 그리고 흔한 실수를 설명해주세요.'
        },
        {
          id: 3,
          question: 'AED(자동제세동기) 사용법은?',
          answer: '1. 전원 켜기:\n   - 자동으로 음성 안내 시작\n\n2. 패드 부착:\n   - 우측 쇄골 아래\n   - 좌측 젖꼭지 옆 겨드랑이\n   - 피부가 젖었으면 닦기\n\n3. 리듬 분석:\n   - 환자에게서 떨어지기\n   - "모두 떨어지세요"\n\n4. 제세동:\n   - 충격 필요 시 버튼 누름\n   - "모두 떨어지세요" 확인\n\n5. 즉시 CPR 재개:\n   - 2분간 30:2\n\n6. 2분마다 리듬 재분석',
          prompt: 'AED의 작동 원리와 안전한 사용법, 주의사항을 설명해주세요.'
        }
      ]
    },
    {
      id: 'ecg',
      title: '심전도',
      questions: [
        {
          id: 1,
          question: '정상 심전도의 구성 요소는?',
          answer: 'P파:\n- 심방 탈분극\n- 폭: <0.12초\n- 높이: <2.5mm\n\nPR간격:\n- 방실 전도 시간\n- 0.12-0.20초\n\nQRS파:\n- 심실 탈분극\n- 폭: <0.12초\n\nST분절:\n- 심실 재분극 초기\n- 기준선과 같은 높이\n\nT파:\n- 심실 재분극\n- QRS와 같은 방향\n\nQT간격:\n- 심실 탈분극-재분극\n- 심박수에 따라 변함',
          prompt: '정상 심전도의 각 파형이 나타내는 심장 활동과 비정상 소견의 의미를 설명해주세요.'
        },
        {
          id: 2,
          question: '제세동이 필요한 리듬은?',
          answer: '심실세동 (VF):\n- 불규칙한 파형\n- 심박출 없음\n- 가장 흔한 급사 원인\n- 즉시 제세동 필요\n\n무맥성 심실빈맥 (Pulseless VT):\n- 규칙적인 넓은 QRS\n- 심박출 없음\n- 즉시 제세동 필요\n\n제세동 에너지:\n- 이상성: 120-200J\n- 단상성: 360J\n- 실패 시 에너지 증가',
          prompt: '제세동 가능한 리듬의 특징과 제세동 시행 방법, 성공률을 높이는 방법을 설명해주세요.'
        },
        {
          id: 3,
          question: '주요 부정맥의 종류와 치료는?',
          answer: '서맥 (<60회/분):\n- 증상 있으면: 아트로핀 0.5mg IV\n- 경피적 심박동 고려\n\n빈맥 (>100회/분):\n1) 동성 빈맥:\n   - 원인 치료 (통증, 발열 등)\n\n2) 심방세동:\n   - 항응고, 심박수 조절\n   - 불안정 시 동율동전환\n\n3) 심실빈맥:\n   - 안정: 아미오다론\n   - 불안정: 동율동전환\n\n4) 심실세동:\n   - 즉시 제세동',
          prompt: '주요 부정맥의 감별 방법과 각각의 응급 치료 알고리즘을 설명해주세요.'
        }
      ]
    },
    {
      id: 'acs',
      title: '급성관상동맥증후군',
      questions: [
        {
          id: 1,
          question: '급성 심근경색의 증상과 비전형 증상은?',
          answer: '전형적 증상:\n- 흉통: 압박감, 조이는 듯\n- 30분 이상 지속\n- 좌측 팔, 턱으로 방사\n- 니트로글리세린 효과 없음\n\n동반 증상:\n- 호흡곤란\n- 오심, 구토\n- 식은땀\n- 불안감\n\n비전형 증상 (당뇨, 노인, 여성):\n- 소화불량\n- 피로감\n- 호흡곤란만 있음\n- 의식 변화',
          prompt: '급성 심근경색의 전형적 증상과 비전형 증상, 그리고 조기 진단의 중요성을 설명해주세요.'
        },
        {
          id: 2,
          question: 'STEMI의 진단과 응급 처치는?',
          answer: '진단:\n- ST분절 상승 (≥2개 인접 유도)\n- 새로운 좌각차단\n- 심근표지자 상승\n\n응급 처치 (MONA):\nM - Morphine (통증)\n   - 2-4mg IV\n\nO - Oxygen (저산소증 시)\n   - SpO2 <90%이면 투여\n\nN - Nitroglycerin\n   - 0.4mg 설하, 5분마다\n   - 혈압 >90mmHg 확인\n\nA - Aspirin\n   - 325mg 씹어 복용\n\n추가:\n- 12유도 심전도\n- 정맥로 확보\n- 신속한 이송',
          prompt: 'STEMI 환자의 응급 처치와 병원 전 단계에서의 시간 관리 중요성을 설명해주세요.'
        },
        {
          id: 3,
          question: '심근경색 합병증의 종류는?',
          answer: '급성기 합병증:\n1) 부정맥:\n   - 심실세동 (가장 흔한 사망원인)\n   - 심실빈맥\n   - 방실차단\n\n2) 심인성 쇼크:\n   - 심박출량 감소\n   - 저혈압, 말초순환 장애\n\n3) 급성 심부전:\n   - 폐부종\n   - 호흡곤란\n\n기계적 합병증:\n- 유두근 파열\n- 심실 파열\n- 심실중격 결손\n\n치료:\n- 집중 모니터링\n- 조기 재관류',
          prompt: '심근경색의 합병증과 조기 발견 방법, 예방 전략을 설명해주세요.'
        }
      ]
    },
    {
      id: 'heart-failure',
      title: '심부전 및 쇼크',
      questions: [
        {
          id: 1,
          question: '급성 심부전의 증상과 처치는?',
          answer: '증상:\n- 호흡곤란 (특히 누우면 악화)\n- 기좌호흡\n- 발작성 야간 호흡곤란\n- 수포음 (폐부종)\n- 경정맥 확장\n- 하지 부종\n\n처치:\n1) 자세: 반좌위\n2) 산소: 고농도\n3) 니트로글리세린:\n   - 전부하 감소\n   - 혈압 모니터링\n4) 이뇨제: Furosemide\n5) CPAP/BiPAP 고려\n\n금기:\n- 과도한 수액 투여',
          prompt: '급성 심부전의 병태생리와 응급 치료, 그리고 폐부종의 관리 방법을 설명해주세요.'
        },
        {
          id: 2,
          question: '쇼크의 분류와 특징은?',
          answer: '1) 저혈량성 쇼크:\n   - 출혈, 탈수\n   - 수액 치료 반응 좋음\n\n2) 심인성 쇼크:\n   - 심박출량 감소\n   - 폐부종 동반\n\n3) 분배성 쇼크:\n   - 패혈성: 발열, 빈맥\n   - 아나필락시스: 두드러기\n   - 신경성: 서맥 동반\n\n4) 폐쇄성 쇼크:\n   - 긴장성 기흉\n   - 심낭압전\n\n공통 징후:\n- 저혈압\n- 빈맥\n- 차갑고 축축한 피부\n- 의식 변화',
          prompt: '쇼크의 종류별 병태생리와 감별 방법, 치료 원칙을 설명해주세요.'
        },
        {
          id: 3,
          question: '쇼크의 단계와 보상 기전은?',
          answer: '1단계 (대상성 쇼크):\n- 혈압 정상 유지\n- 빈맥, 말초혈관 수축\n- 소변량 감소\n- 가역적\n\n2단계 (비대상성 쇼크):\n- 저혈압 발생\n- 의식 변화\n- 대사성 산증\n- 치료하면 회복 가능\n\n3단계 (불응성 쇼크):\n- 치료 반응 없음\n- 다발성 장기 부전\n- 비가역적\n\n보상 기전:\n- 교감신경 활성화\n- RAAS 활성화\n- ADH 분비\n- 스트레스 호르몬',
          prompt: '쇼크의 진행 단계와 각 단계별 치료 전략, 조기 발견의 중요성을 설명해주세요.'
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/자격시험/medical/paramedic-1"
            className="text-purple-600 hover:text-purple-800 font-semibold mb-4 inline-block"
          >
            ← 응급구조사 1급 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-purple-600 mb-2">심장응급</h1>
          <p className="text-gray-600">심폐소생술, 심전도, 심혈관응급</p>
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
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-purple-50'
                    }`}
                  >
                    <div className="font-semibold">{topic.title}</div>
                    <div className={`text-sm ${selectedTopic === index ? 'text-purple-100' : 'text-gray-500'}`}>
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
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* 질문 */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">질문</h3>
                <p className="text-gray-700 text-lg">{currentQuestion.question}</p>
              </div>

              {/* 답변 표시/숨기기 버튼 */}
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors mb-4"
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
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
