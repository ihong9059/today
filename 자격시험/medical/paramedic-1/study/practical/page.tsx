'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PracticalPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const topics = [
    {
      id: 'airway-management',
      title: '기도관리',
      questions: [
        {
          id: 1,
          question: '기본 기도유지술의 종류와 방법은?',
          answer: '1) 머리 젖히기-턱 들기:\n   - 한 손: 이마에 놓고 뒤로 젖힘\n   - 다른 손: 턱 끝을 위로 들어올림\n   - 주의: 경추 손상 의심 시 금기\n\n2) 하악 거상법:\n   - 양손으로 하악각 파지\n   - 위쪽, 앞쪽으로 당김\n   - 경추 손상 의심 시 사용\n\n3) 구강 인두 기도기:\n   - 크기: 귓불에서 입 중앙까지\n   - 삽입: 180도 회전하며\n   - 구토 반사 있으면 제거\n\n4) 비강 인두 기도기:\n   - 크기: 작은손가락 크기\n   - 윤활제 바르고 삽입\n   - 기저부 골절 시 금기',
          prompt: '기본 기도유지술의 각 방법별 적응증과 금기사항, 합병증을 설명해주세요.'
        },
        {
          id: 2,
          question: '백-밸브-마스크(BVM) 환기법은?',
          answer: '준비:\n- 적절한 마스크 크기 선택\n- 산소 연결 (10-15 L/min)\n- 저장주머니 부착\n\n1인 방법:\n- C-E 기법:\n  · C (엄지+검지): 마스크 고정\n  · E (3-4-5번 손가락): 하악 거상\n- 다른 손: 백 압박\n- 1초에 걸쳐 가슴 올라올 정도\n\n2인 방법:\n- 1인: 양손으로 마스크 밀착\n- 2인: 백 압박\n- 더 효과적\n\n주의:\n- 과도한 환기 금지\n- 위 팽창 주의',
          prompt: 'BVM 환기의 올바른 방법과 흔한 실수, 그리고 효과적인 환기의 지표를 설명해주세요.'
        },
        {
          id: 3,
          question: '기관 삽관의 준비와 절차는?',
          answer: '준비물:\n- 후두경 (Miller/Macintosh)\n- 기관튜브 (성인: 7.0-8.0mm)\n- 스타일렛\n- 10cc 주사기\n- BVM, 흡인기\n\n절차:\n1) 전 산소화 (3-5분)\n2) 자세: Sniffing position\n3) 후두경 삽입:\n   - 우측에서 삽입\n   - 혀를 좌측으로 밀어냄\n4) 성대 확인\n5) 튜브 삽관:\n   - 성대 사이로 통과\n   - Cuff 부풀리기\n6) 확인:\n   - 5점 청진\n   - 호기말 이산화탄소\n7) 고정\n\n금기:\n- 안면 외상\n- 후두 부종',
          prompt: '기관 삽관의 적응증과 시술 과정, 그리고 올바른 삽관 확인 방법을 설명해주세요.'
        }
      ]
    },
    {
      id: 'iv-medication',
      title: '정맥로 확보 및 약물투여',
      questions: [
        {
          id: 1,
          question: '말초 정맥로 확보의 절차는?',
          answer: '준비:\n- 적절한 카테터 선택\n  · 14-16G: 외상, 쇼크\n  · 18-20G: 일반 성인\n  · 22-24G: 소아, 노인\n- 소독제, 지혈대, 테이프\n\n절차:\n1) 부위 선택:\n   - 큰 정맥, 관절 피함\n   - 손등 → 전완 → 상완\n\n2) 지혈대 적용 (5-10cm 위)\n\n3) 소독 (중심에서 바깥으로)\n\n4) 천자:\n   - 피부와 15-30도 각도\n   - 역혈 확인\n   - 카테터 전진, 침 제거\n\n5) 수액 연결 및 고정\n\n6) 확인:\n   - 유속, 부종, 통증',
          prompt: '말초 정맥로 확보의 부위 선택 기준과 합병증 예방법을 설명해주세요.'
        },
        {
          id: 2,
          question: '약물 투여 경로별 특징은?',
          answer: '정맥 투여 (IV):\n- 장점: 빠른 효과, 정확한 용량\n- 단점: 침습적, 합병증\n- 응급상황 1차 선택\n\n골내 투여 (IO):\n- IV 실패 시\n- 소아, 쇼크 환자\n- 근위 경골, 원위 대퇴골\n- 모든 약물/수액 가능\n\n근육 투여 (IM):\n- 중등도 흡수 속도\n- 삼각근, 대퇴부\n- 아나필락시스 (에피네프린)\n\n설하 투여 (SL):\n- 빠른 흡수\n- 니트로글리세린\n\n흡입 투여:\n- 호흡기 질환\n- 기관지 확장제',
          prompt: '응급상황에서 각 약물 투여 경로의 선택 기준과 장단점을 설명해주세요.'
        },
        {
          id: 3,
          question: '정맥로 확보 시 합병증과 예방은?',
          answer: '합병증:\n1) 혈관 외 유출:\n   - 징후: 부종, 통증, 발적\n   - 처치: 즉시 제거, 재삽입\n\n2) 혈종:\n   - 예방: 지혈대 빨리 풀기\n   - 처치: 압박, 냉찜질\n\n3) 정맥염:\n   - 원인: 자극성 약물, 장기 유지\n   - 예방: 정기적 교체\n\n4) 공기 색전:\n   - 예방: 공기 제거\n   - 수액줄 점검\n\n5) 감염:\n   - 예방: 무균술\n   - 정기적 소독\n\n주의사항:\n- 표준주의 준수\n- 정기적 관찰',
          prompt: '정맥로 확보와 유지 중 발생할 수 있는 합병증과 조기 발견 방법을 설명해주세요.'
        }
      ]
    },
    {
      id: 'trauma-skills',
      title: '외상 처치 술기',
      questions: [
        {
          id: 1,
          question: '직접 압박 지혈법과 지혈대 사용법은?',
          answer: '직접 압박 (1차 선택):\n1) 개인보호장구 착용\n2) 멸균 거즈로 직접 압박\n3) 5-10분 유지\n4) 압박 붕대로 고정\n5) 사지는 심장보다 높게\n\n지혈대 (최후 수단):\n적응증:\n- 대량 출혈\n- 직접 압박 실패\n- 다수 사상자\n- 절단 손상\n\n적용:\n1) 출혈 부위 5-7cm 위\n2) 관절 위에 적용 금지\n3) 출혈 멈출 때까지 조임\n4) 시간 기록\n5) 느슨하게 하지 말 것\n\n주의:\n- 2시간 이상 유지 시 허혈',
          prompt: '출혈 조절의 단계별 방법과 지혈대 사용의 적응증, 합병증을 설명해주세요.'
        },
        {
          id: 2,
          question: '척추 고정 술기의 순서는?',
          answer: '준비:\n- 척추판, 경추 보호대\n- 머리 고정 장치\n- 끈/벨트\n\n절차:\n1) 수동 경추 고정:\n   - 양손으로 머리 고정\n   - 중립 위치 유지\n\n2) 경추 보호대 적용:\n   - 적절한 크기 선택\n   - 턱 받침 맞춤\n\n3) 환자 이동:\n   - 통나무 굴리기\n   - 최소 3-4명\n   - 일직선 유지\n\n4) 척추판에 고정:\n   - 몸통 먼저\n   - 머리 나중에\n\n5) 머리 고정 장치\n\n6) 재평가:\n   - 신경학적 상태\n   - 고정 상태',
          prompt: '척추 손상 환자의 안전한 고정과 이송 방법, 주의사항을 설명해주세요.'
        },
        {
          id: 3,
          question: '골절 부목 고정의 원칙은?',
          answer: '고정 전 평가:\n- 신경혈관 상태 (5P):\n  · Pain (통증)\n  · Pallor (창백)\n  · Pulselessness (맥박 소실)\n  · Paresthesia (이상감각)\n  · Paralysis (마비)\n\n고정 원칙:\n1) 발견된 위치에서 고정\n2) 상하 관절 포함\n3) 개방 상처 먼저 드레싱\n4) 손상 부위 노출시키지 않기\n5) 사지 끝 노출 (순환 확인)\n\n부목 종류:\n- 딱딱한 부목\n- 공기 부목\n- 견인 부목 (대퇴골)\n\n고정 후:\n- 신경혈관 재평가\n- 15분마다 확인',
          prompt: '골절 고정의 원칙과 신경혈관 손상 평가 방법을 설명해주세요.'
        }
      ]
    },
    {
      id: 'special-skills',
      title: '특수 술기',
      questions: [
        {
          id: 1,
          question: '흡인(Suction)의 방법과 주의사항은?',
          answer: '적응증:\n- 구강/기도 내 분비물\n- 혈액, 구토물\n- 의식 저하 환자\n\n방법:\n1) 흡인 카테터 선택:\n   - Yankauer: 구강용, 단단함\n   - 부드러운 카테터: 기관내\n\n2) 흡인압 설정:\n   - 성인: 80-120mmHg\n   - 소아: 60-100mmHg\n\n3) 흡인 시행:\n   - 삽입 시: 흡인 안 함\n   - 제거하며 흡인\n   - 회전시키며\n\n주의사항:\n- 시간: 10-15초 이내\n- 저산소증 예방\n- 미주신경 자극 주의\n- 손상 방지',
          prompt: '기도 흡인의 적응증과 안전한 시행 방법, 합병증 예방을 설명해주세요.'
        },
        {
          id: 2,
          question: '산소 투여 장치의 종류와 사용법은?',
          answer: '저유량 장치:\n1) 비강 캐뉼라:\n   - 1-6 L/min (24-44%)\n   - 편안함\n   - 장기 사용 가능\n\n2) 단순 마스크:\n   - 6-10 L/min (35-60%)\n   - 최소 5L/min\n\n3) 비재호흡 마스크:\n   - 10-15 L/min (60-95%)\n   - 저장주머니 팽창 유지\n   - 응급상황 사용\n\n고유량 장치:\n4) 벤츄리 마스크:\n   - 정확한 FiO2\n   - COPD 환자\n\n특수:\n5) CPAP/BiPAP:\n   - 양압 환기\n   - 폐부종, 천식',
          prompt: '각 산소 투여 장치의 특징과 적절한 선택 기준을 설명해주세요.'
        },
        {
          id: 3,
          question: '응급 분만 보조의 절차는?',
          answer: '준비:\n- 개인보호장구\n- 깨끗한 수건, 담요\n- 흡인기, 클램프\n\n분만 단계:\n1) 산모 준비:\n   - 반좌위\n   - 무릎 굽히고 벌림\n   - 사생활 보호\n\n2) 아기 머리 나옴:\n   - 자연스럽게 유도\n   - 회음부 지지\n   - 서두르지 않음\n\n3) 어깨 만출:\n   - 머리 부드럽게 하방 견인\n   - 앞쪽 어깨 먼저\n\n4) 신생아 처치:\n   - 수건으로 닦고 보온\n   - 기도 흡인\n   - APGAR 평가\n\n5) 탯줄 결찰:\n   - 박동 멈추면\n   - 2곳 클램프\n\n6) 태반 만출:\n   - 자연 배출 기다림',
          prompt: '응급 분만의 단계별 절차와 신생아 소생술 준비를 설명해주세요.'
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/자격시험/medical/paramedic-1"
            className="text-pink-600 hover:text-pink-800 font-semibold mb-4 inline-block"
          >
            ← 응급구조사 1급 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-pink-600 mb-2">실기</h1>
          <p className="text-gray-600">실제 응급처치 술기 및 평가</p>
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
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-pink-50'
                    }`}
                  >
                    <div className="font-semibold">{topic.title}</div>
                    <div className={`text-sm ${selectedTopic === index ? 'text-pink-100' : 'text-gray-500'}`}>
                      {topic.questions.length}개 문항
                    </div>
                  </button>
                ))}
              </div>

              {/* 실기 시험 안내 */}
              <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                <h3 className="font-bold text-gray-800 mb-2">실기 시험 팁</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>- 반복 연습이 가장 중요</li>
                  <li>- 순서를 정확히 암기</li>
                  <li>- 소리 내어 설명하며 연습</li>
                  <li>- 시간 제한 내 완료 연습</li>
                  <li>- 동료와 서로 평가</li>
                </ul>
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
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-pink-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* 질문 */}
              <div className="bg-pink-50 border-l-4 border-pink-500 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">질문</h3>
                <p className="text-gray-700 text-lg">{currentQuestion.question}</p>
              </div>

              {/* 답변 표시/숨기기 버튼 */}
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors mb-4"
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
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음 문제
                </button>
              </div>
            </div>

            {/* 실기 연습 가이드 */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">실기 시험 준비 가이드</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="mr-2">1.</span>
                  <p>실습실에서 최소 20회 이상 반복 연습</p>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">2.</span>
                  <p>각 술기의 체크리스트를 만들어 확인하며 연습</p>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">3.</span>
                  <p>동료와 함께 평가자-수행자 역할을 번갈아가며 연습</p>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">4.</span>
                  <p>시간 제한을 두고 실전처럼 연습</p>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">5.</span>
                  <p>술기 수행 중 각 단계를 소리 내어 설명하는 연습</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
