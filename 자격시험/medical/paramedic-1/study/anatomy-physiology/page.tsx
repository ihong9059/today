'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnatomyPhysiologyPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const topics = [
    {
      id: 'skeletal-system',
      title: '골격계',
      questions: [
        {
          id: 1,
          question: '인체의 주요 뼈는 몇 개이며, 축골격과 부속골격의 구성은?',
          answer: '전체: 약 206개\n\n축골격 (80개):\n- 두개골 (22개)\n- 청각골 (6개)\n- 설골 (1개)\n- 척추 (26개)\n- 흉곽 (25개)\n\n부속골격 (126개):\n- 상지대 및 상지 (64개)\n- 하지대 및 하지 (62개)',
          prompt: '인체 골격계의 구조와 축골격, 부속골격의 기능적 차이를 설명해주세요.'
        },
        {
          id: 2,
          question: '척추의 구성과 각 부위의 특징은?',
          answer: '경추 (Cervical, 7개): C1(환추), C2(축추), 가장 유연\n흉추 (Thoracic, 12개): 늑골과 연결\n요추 (Lumbar, 5개): 가장 큰 척추체, 체중 지지\n천추 (Sacral, 5개 융합): 골반과 연결\n미추 (Coccyx, 3-5개 융합): 퇴화된 꼬리뼈',
          prompt: '척추의 각 부위별 구조적 특징과 기능, 그리고 외상 시 각 부위의 위험성을 설명해주세요.'
        },
        {
          id: 3,
          question: '골절의 종류와 특징은?',
          answer: '1) 폐쇄골절: 피부 손상 없음\n2) 개방골절: 피부 손상, 감염 위험\n3) 완전골절: 뼈가 완전히 분리\n4) 불완전골절: 일부만 골절 (녹색가지골절)\n5) 분쇄골절: 여러 조각으로 골절\n6) 압박골절: 척추에 흔함',
          prompt: '골절의 종류별 응급처치 방법과 합병증 예방법을 설명해주세요.'
        }
      ]
    },
    {
      id: 'circulatory-system',
      title: '순환계',
      questions: [
        {
          id: 1,
          question: '심장의 4개 방과 혈액 흐름 순서는?',
          answer: '우심방 → 삼첨판 → 우심실 → 폐동맥판 → 폐동맥 → 폐 → 폐정맥 → 좌심방 → 승모판 → 좌심실 → 대동맥판 → 대동맥 → 전신\n\n우심계: 정맥혈 수용, 폐로 펌프\n좌심계: 산소혈 수용, 전신으로 펌프',
          prompt: '심장의 구조와 혈액 순환 경로, 그리고 각 판막의 기능을 상세히 설명해주세요.'
        },
        {
          id: 2,
          question: '관상동맥의 주요 분지와 허혈 시 영향은?',
          answer: '좌관상동맥:\n- 좌전하행지(LAD): 전벽, 중격 공급\n- 좌회선지(LCX): 측벽 공급\n\n우관상동맥(RCA): 하벽, 우심실 공급\n\n허혈 시:\n- LAD 폐색: 광범위 전벽 경색, 가장 위험\n- LCX 폐색: 측벽 경색\n- RCA 폐색: 하벽 경색, 부정맥 위험',
          prompt: '관상동맥의 해부학과 각 혈관 폐색 시 나타나는 심전도 변화 및 증상을 설명해주세요.'
        },
        {
          id: 3,
          question: '혈압 조절 기전은?',
          answer: '1) 심박출량 (CO = HR × SV)\n   - 심박수 증가 → 혈압 상승\n   - 1회 박출량 증가 → 혈압 상승\n\n2) 말초혈관저항\n   - 혈관 수축 → 혈압 상승\n   - 혈관 확장 → 혈압 하강\n\n3) 신경성 조절: 교감/부교감 신경\n4) 체액성 조절: RAAS, ADH',
          prompt: '혈압 조절 기전과 쇼크 상태에서의 보상 기전을 설명해주세요.'
        }
      ]
    },
    {
      id: 'respiratory-system',
      title: '호흡계',
      questions: [
        {
          id: 1,
          question: '기도의 구조와 각 부위의 특징은?',
          answer: '상기도:\n- 코, 인두, 후두\n- 공기 여과, 가온, 가습\n- 후두개: 기도 보호\n\n하기도:\n- 기관 (직경 2.5cm, 16-20개 연골)\n- 기관지 (우측이 더 수직적)\n- 세기관지\n- 폐포 (가스교환)',
          prompt: '기도의 해부학적 구조와 기도폐쇄 시 각 부위별 응급처치 방법을 설명해주세요.'
        },
        {
          id: 2,
          question: '호흡의 기전과 조절은?',
          answer: '흡기:\n- 횡격막 수축 (하강)\n- 외늑간근 수축\n- 흉강 내압 감소 → 공기 유입\n\n호기:\n- 횡격막 이완 (상승)\n- 수동적 과정\n\n조절:\n- 연수의 호흡중추\n- CO2, O2, pH 감지\n- 화학수용체 피드백',
          prompt: '정상 호흡 기전과 호흡 조절, 그리고 호흡곤란 시 나타나는 보상 기전을 설명해주세요.'
        },
        {
          id: 3,
          question: '가스교환과 산소해리곡선의 의미는?',
          answer: '폐포-모세혈관 가스교환:\n- O2: 폐포 → 혈액 (확산)\n- CO2: 혈액 → 폐포 (확산)\n\n산소해리곡선:\n- S자 모양 곡선\n- 우측 이동: 산소 방출 증가\n  (체온↑, CO2↑, pH↓)\n- 좌측 이동: 산소 방출 감소',
          prompt: '폐포에서의 가스교환 과정과 산소해리곡선이 임상적으로 중요한 이유를 설명해주세요.'
        }
      ]
    },
    {
      id: 'nervous-system',
      title: '신경계',
      questions: [
        {
          id: 1,
          question: '중추신경계와 말초신경계의 구성은?',
          answer: '중추신경계 (CNS):\n- 뇌 (대뇌, 소뇌, 뇌간)\n- 척수\n\n말초신경계 (PNS):\n1) 체성신경계: 수의적 운동\n2) 자율신경계:\n   - 교감신경: 투쟁-도피 반응\n   - 부교감신경: 휴식-소화 반응',
          prompt: '중추신경계와 말초신경계의 구조와 기능, 그리고 손상 시 나타나는 증상을 설명해주세요.'
        },
        {
          id: 2,
          question: '뇌의 주요 부위와 기능은?',
          answer: '대뇌:\n- 전두엽: 운동, 언어, 판단\n- 두정엽: 감각, 공간인지\n- 측두엽: 청각, 기억\n- 후두엽: 시각\n\n소뇌: 균형, 협응\n뇌간: 생명중추 (호흡, 심혈관)',
          prompt: '뇌의 각 부위별 기능과 외상이나 뇌졸중 시 나타나는 국소 증상을 설명해주세요.'
        },
        {
          id: 3,
          question: '뇌압상승의 기전과 징후는?',
          answer: '원인:\n- 두개내 출혈\n- 뇌부종\n- 종양\n- 수두증\n\nMonro-Kellie 원리:\n- 두개내압 = 뇌 + 혈액 + 뇌척수액\n- 한 성분 증가 시 다른 성분 감소로 보상\n\n징후 (Cushing triad):\n- 고혈압\n- 서맥\n- 불규칙한 호흡',
          prompt: '뇌압상승의 병태생리와 응급처치 방법, 그리고 뇌탈출의 위험성을 설명해주세요.'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/자격시험/medical/paramedic-1"
            className="text-blue-600 hover:text-blue-800 font-semibold mb-4 inline-block"
          >
            ← 응급구조사 1급 홈으로
          </Link>
          <h1 className="text-4xl font-bold text-blue-600 mb-2">해부생리학</h1>
          <p className="text-gray-600">인체 구조와 기능, 생리학적 원리</p>
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
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
                    }`}
                  >
                    <div className="font-semibold">{topic.title}</div>
                    <div className={`text-sm ${selectedTopic === index ? 'text-blue-100' : 'text-gray-500'}`}>
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
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* 질문 */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">질문</h3>
                <p className="text-gray-700 text-lg">{currentQuestion.question}</p>
              </div>

              {/* 답변 표시/숨기기 버튼 */}
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-4"
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
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
