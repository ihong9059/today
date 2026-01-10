'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TraumaCarePage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const topics = [
    {
      id: 'trauma-assessment',
      title: '외상환자 평가',
      questions: [
        {
          id: 1,
          question: '손상기전(Mechanism of Injury)의 중요성은?',
          answer: '손상기전 평가로 예상 손상 파악:\n\n1) 교통사고:\n   - 정면충돌: 두부, 흉부, 골반 손상\n   - 측면충돌: 늑골, 골반, 장기 손상\n   - 후방충돌: 경추 손상\n   - 차량 전복: 다발성 손상\n\n2) 추락:\n   - 높이 >6m: 중증 손상 의심\n   - 착지 부위에 따른 손상 예측\n\n3) 관통상:\n   - 진입/출구 확인\n   - 궤적 예상',
          prompt: '손상기전에 따른 예상 손상 패턴과 이를 통한 체계적 평가 방법을 설명해주세요.'
        },
        {
          id: 2,
          question: '외상환자의 1차 평가 우선순위는?',
          answer: 'A - Airway (기도) + C-spine:\n   - 경추 보호하며 기도 확보\n   - 하악거상, 기도기 삽입\n\nB - Breathing (호흡):\n   - 호흡수, 호흡음 평가\n   - 긴장성 기흉 감별\n\nC - Circulation (순환):\n   - 출혈 확인 및 지혈\n   - 쇼크 평가\n\nD - Disability (신경):\n   - GCS, 동공 반응\n\nE - Exposure (노출):\n   - 전신 손상 확인\n   - 저체온 예방',
          prompt: '외상환자 1차 평가의 각 단계별 평가 방법과 즉각적 처치를 설명해주세요.'
        },
        {
          id: 3,
          question: 'Golden Hour의 개념은?',
          answer: '외상 후 1시간 이내:\n- 생존율에 결정적 영향\n- 신속한 평가와 처치 필수\n- 적절한 병원 이송\n\n중요 원칙:\n1) 현장 체류 시간 최소화\n   - Scoop and Run\n   - 10분 이내 목표\n\n2) 이송 중 처치:\n   - 기도 유지\n   - 출혈 조절\n   - 정맥로 확보\n\n3) 적절한 병원 선택:\n   - 외상센터 우선',
          prompt: 'Golden Hour의 개념과 병원 전 단계에서의 시간 관리 전략을 설명해주세요.'
        }
      ]
    },
    {
      id: 'head-spine',
      title: '두부 및 척추 손상',
      questions: [
        {
          id: 1,
          question: '두부 손상의 분류와 징후는?',
          answer: '두개골 골절:\n- 선상, 함몰, 기저부 골절\n- 징후: 두피 열상, 혈종, CSF 누출\n\n뇌진탕:\n- 일시적 의식 소실\n- 역행성 기억상실\n\n뇌좌상:\n- 뇌 실질 손상\n- 국소 신경학적 결손\n\n두개내 출혈:\n- 경막외: 중간막동맥 손상\n- 경막하: 정맥 손상\n- 뇌내: 뇌 실질 출혈',
          prompt: '두부 손상의 종류별 특징과 응급처치, 그리고 뇌압상승 징후를 설명해주세요.'
        },
        {
          id: 2,
          question: '척추 손상 의심 기준과 고정법은?',
          answer: '의심 기준:\n- 고에너지 손상 기전\n- 경부 통증 또는 압통\n- 신경학적 결손\n- 의식 변화\n- 중독 상태\n\n경추 고정:\n1) 수동 고정 (최우선)\n2) 경추 보호대 적용\n3) 척추판 고정\n4) 머리 고정 장치\n\n주의사항:\n- 과신전/과굴곡 방지\n- 중립 위치 유지\n- 이송 중 재평가',
          prompt: '척추 손상이 의심되는 환자의 고정 방법과 이송 중 주의사항을 설명해주세요.'
        },
        {
          id: 3,
          question: '척수 손상의 증후군과 특징은?',
          answer: '완전 손상:\n- 손상 부위 이하 완전 마비\n- 감각 완전 소실\n\n불완전 손상:\n1) 전척수 증후군:\n   - 운동, 온도 소실\n   - 위치, 진동 감각 보존\n\n2) 중심척수 증후군:\n   - 상지 > 하지 마비\n   - 과신전 손상\n\n3) Brown-Sequard 증후군:\n   - 편측 손상\n   - 동측 운동/위치 소실\n   - 반대측 온도/통증 소실',
          prompt: '척수 손상 증후군의 종류와 각각의 병태생리, 예후를 설명해주세요.'
        }
      ]
    },
    {
      id: 'chest-abdomen',
      title: '흉부 및 복부 손상',
      questions: [
        {
          id: 1,
          question: '생명을 위협하는 흉부 손상은?',
          answer: '즉시 치명적 (Immediate):\n1) 긴장성 기흉:\n   - 한쪽 폐 팽창 소실\n   - 기관 편위\n   - 경정맥 확장\n   - 즉시 감압 필요\n\n2) 개방성 기흉:\n   - 공기 출입음\n   - 3면 밀봉 드레싱\n\n3) 대량 혈흉:\n   - 쇼크 징후\n   - 호흡음 감소\n\n4) 심낭압전:\n   - Beck triad\n   - 심낭천자 필요',
          prompt: '생명을 위협하는 흉부 손상의 종류와 응급처치 방법을 설명해주세요.'
        },
        {
          id: 2,
          question: '늑골 골절과 연가양 흉부의 처치는?',
          answer: '단순 늑골 골절:\n- 통증 조절\n- 심호흡 권장\n- 압박 붕대 금지\n\n연가양 흉부 (Flail Chest):\n- 정의: 3개 이상 늑골, 2곳 이상 골절\n- 증상: 역설적 호흡 운동\n- 처치:\n  · 산소 투여\n  · 통증 조절\n  · 양압 환기 고려\n  · 손으로 안정화\n\n합병증:\n- 폐좌상\n- 호흡부전',
          prompt: '연가양 흉부의 병태생리와 응급처치, 합병증 예방법을 설명해주세요.'
        },
        {
          id: 3,
          question: '복부 외상의 평가와 처치는?',
          answer: '평가:\n- 손상 기전 확인\n- 복부 압통, 경직\n- 타박상, 좌상 확인\n- 골반 안정성\n\n둔상:\n- 실질 장기 손상 (간, 비장)\n- 내출혈 의심\n- 쇼크 징후 관찰\n\n관통상:\n- 진입/출구 확인\n- 장기 손상 의심\n- 이물 제거 금지\n\n처치:\n- 산소 투여\n- 정맥로 확보\n- 신속한 이송\n- 금식 유지',
          prompt: '복부 외상 환자의 평가 방법과 내출혈 징후, 응급처치를 설명해주세요.'
        }
      ]
    },
    {
      id: 'extremity-trauma',
      title: '사지 손상',
      questions: [
        {
          id: 1,
          question: '골절의 징후와 합병증은?',
          answer: '골절 징후:\n1) 확실한 징후:\n   - 변형\n   - 비정상적 움직임\n   - 뼈 마찰음\n\n2) 의심 징후:\n   - 통증\n   - 부종\n   - 압통\n   - 기능 소실\n\n합병증:\n- 혈관 손상: 맥박 소실\n- 신경 손상: 감각/운동 소실\n- 구획 증후군: 6P signs\n- 지방 색전\n- 감염 (개방골절)',
          prompt: '골절의 진단과 합병증, 그리고 각 합병증의 조기 발견 방법을 설명해주세요.'
        },
        {
          id: 2,
          question: '골절의 고정 원칙과 방법은?',
          answer: '고정 원칙:\n1) 상하 관절 포함 고정\n2) 발견된 위치에서 고정\n3) 개방 상처 드레싱 먼저\n4) 신경혈관 상태 확인\n5) 고정 전후 재평가\n\n고정 방법:\n- 부목: 딱딱한/공기/견인\n- 붕대\n- 삼각건\n- 건측 고정\n\n특수 상황:\n- 대퇴골: 견인 부목\n- 골반: 골반 결속대\n- 척추: 척추판',
          prompt: '골절 고정의 원칙과 부위별 적절한 고정 방법을 설명해주세요.'
        },
        {
          id: 3,
          question: '절단 손상의 처치는?',
          answer: '환자 처치:\n1) 생명 유지 최우선\n2) 직접 압박으로 지혈\n3) 지혈대: 최후 수단\n4) 쇼크 예방 및 치료\n5) 신속한 이송\n\n절단부 관리:\n1) 생리식염수로 세척\n2) 습윤 거즈로 감싸기\n3) 비닐봉지에 밀봉\n4) 얼음물에 담기\n5) 직접 얼음 접촉 금지\n\n재접합 가능성:\n- 6시간 이내 (따뜻한 허혈)\n- 12시간 이내 (차가운 허혈)',
          prompt: '절단 손상 환자의 응급처치와 절단부 보존 방법, 재접합 조건을 설명해주세요.'
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/자격시험/medical/paramedic-1"
            className="text-orange-600 hover:text-orange-800 font-semibold mb-4 inline-block"
          >
            ← 응급구조사 1급 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-orange-600 mb-2">외상처치</h1>
          <p className="text-gray-600">외상환자 평가, 손상 기전, 처치법</p>
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
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-orange-50'
                    }`}
                  >
                    <div className="font-semibold">{topic.title}</div>
                    <div className={`text-sm ${selectedTopic === index ? 'text-orange-100' : 'text-gray-500'}`}>
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
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* 질문 */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">질문</h3>
                <p className="text-gray-700 text-lg">{currentQuestion.question}</p>
              </div>

              {/* 답변 표시/숨기기 버튼 */}
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors mb-4"
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
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
