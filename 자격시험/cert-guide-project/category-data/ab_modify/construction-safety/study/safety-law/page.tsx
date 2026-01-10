'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SafetyLawStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{question: string, answer: string} | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('construction-safety-law-completed');
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
      const newCompleted = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('construction-safety-law-completed', JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const openAIHelper = (question: string, answer: string) => {
    setSelectedQuestion({ question, answer });
    setShowAIModal(true);
  };

  const getAIPrompt = () => {
    if (!selectedQuestion) return '';
    return `건설안전기사 산업안전관계법규 문제입니다.\n\n문제: ${selectedQuestion.question}\n정답: ${selectedQuestion.answer}\n\n이 문제에 대해 자세히 설명해주세요. 관련 법 조항과 실무 적용 사례도 포함해서 설명해주세요.`;
  };

  const topics = [
    {
      title: "1. 산업안전보건법 총칙",
      questions: [
        { id: 1, q: "산업안전보건법의 목적으로 옳은 것은?", a: "산업 안전 및 보건에 관한 기준 확립, 산업재해 예방 - 쾌적한 작업환경 조성, 노동자 안전 및 보건 증진" },
        { id: 2, q: "산업안전보건법상 '사업주'의 정의로 옳은 것은?", a: "근로자를 사용하여 사업을 하는 자 - 실질적으로 사업을 경영하는 자를 의미" },
        { id: 3, q: "산업안전보건법상 '근로자'에 해당하지 않는 자는?", a: "자영업자 - 근로기준법의 근로자 정의를 준용" },
        { id: 4, q: "산업안전보건법에서 정한 '중대재해'의 기준이 아닌 것은?", a: "3일 이상 휴업재해 - 중대재해는 사망 1명, 3개월 이상 부상 2명, 질병 10명 이상" },
        { id: 5, q: "사업주의 일반적 의무가 아닌 것은?", a: "이윤 극대화 - 사업주는 안전보건조치, 교육, 건강진단 실시 등의 의무가 있음" },
        { id: 6, q: "근로자의 의무로 옳지 않은 것은?", a: "안전보건관리비 부담 - 근로자는 안전보건 조치 준수, 교육 이수 등의 의무가 있음" },
        { id: 7, q: "산업안전보건법 적용 제외 업종이 아닌 것은?", a: "건설업 - 건설업은 산업안전보건법 전면 적용 대상" },
        { id: 8, q: "법령 용어 중 '유해위험물질'의 정의로 옳은 것은?", a: "근로자의 건강장해를 유발하는 화학물질 및 물리적 인자 - 법령상 열거된 물질" },
        { id: 9, q: "산업안전보건기준에 관한 규칙의 성격은?", a: "고용노동부령 - 산업안전보건법 시행규칙과 함께 세부 기준 규정" },
        { id: 10, q: "산업안전보건법상 과태료 부과 대상이 아닌 것은?", a: "안전인증 미표시 제품 제조 - 이는 벌칙(형사처벌) 대상" }
      ]
    },
    {
      title: "2. 안전보건관리체제",
      questions: [
        { id: 11, q: "안전보건관리책임자를 선임해야 하는 사업장 기준은?", a: "상시근로자 50인 이상(건설업은 공사금액 50억 이상) - 안전보건 총괄 관리" },
        { id: 12, q: "관리감독자의 업무가 아닌 것은?", a: "안전보건교육 계획 수립 - 관리감독자는 작업 지휘, 점검, 이상 시 조치 등 현장 업무" },
        { id: 13, q: "안전관리자의 선임 대상 업종이 아닌 것은?", a: "상시근로자 300인 미만 소매업 - 위험도가 높은 업종 위주로 선임 의무" },
        { id: 14, q: "보건관리자의 업무로 옳지 않은 것은?", a: "위험성평가 실시 총괄 - 보건관리자는 건강진단, 보건교육, 작업환경측정 업무" },
        { id: 15, q: "산업안전보건위원회 구성 시 근로자위원 비율은?", a: "전체 위원의 절반 이상 - 노사 동수로 구성하여 협의" },
        { id: 16, q: "산업안전보건위원회 심의 의결 사항이 아닌 것은?", a: "인사·급여에 관한 사항 - 안전보건에 관한 중요 사항만 심의" },
        { id: 17, q: "안전보건총괄책임자를 두어야 하는 경우는?", a: "같은 장소에서 행하는 사업의 일부를 도급 시 - 수급인 근로자 안전보건 총괄" },
        { id: 18, q: "건설업 안전관리자 선임기준 공사금액은?", a: "120억원 이상 또는 상시근로자 300인 이상 - 규모에 따라 인원 결정" },
        { id: 19, q: "명예산업안전감독관의 권한이 아닌 것은?", a: "사업장 시정명령 - 명예감독관은 참여, 건의, 보고 등의 권한" },
        { id: 20, q: "안전보건관리규정 작성 대상 사업장 기준은?", a: "상시근로자 100인 이상 - 자체적인 안전보건관리 기준 마련" }
      ]
    },
    {
      title: "3. 유해위험 방지조치",
      questions: [
        { id: 21, q: "유해위험작업에 대한 작업허가제 대상이 아닌 것은?", a: "일반 청소 작업 - 작업허가제는 밀폐공간, 화기사용, 굴착 등 위험작업 대상" },
        { id: 22, q: "추락 방지조치가 필요한 작업 높이 기준은?", a: "2m 이상 - 추락위험이 있는 장소에서 안전난간, 안전망 등 설치" },
        { id: 23, q: "물질안전보건자료(MSDS) 게시 장소로 옳은 것은?", a: "해당 화학물질 취급 작업장 내 근로자가 쉽게 볼 수 있는 장소" },
        { id: 24, q: "밀폐공간 작업 시 산소농도 기준은?", a: "18% 이상 23.5% 미만 - 산소결핍 및 과잉 방지" },
        { id: 25, q: "보호구 지급 의무가 있는 경우가 아닌 것은?", a: "사무실 업무 - 보호구는 유해위험 작업 시 지급 의무" },
        { id: 26, q: "안전검사 대상 기계기구가 아닌 것은?", a: "휴대용 전동공구 - 안전검사 대상은 프레스, 크레인, 리프트, 압력용기 등" },
        { id: 27, q: "특별안전보건교육 대상 작업이 아닌 것은?", a: "일반 용접 작업 - 특별교육은 밀폐공간, 석면, 방사선 등 특별히 위험한 작업" },
        { id: 28, q: "작업환경측정 대상 유해인자 판정 기준 중 소음은?", a: "85dB 이상 - 1일 8시간 기준 작업장 소음" },
        { id: 29, q: "특수건강진단 대상 유해인자가 아닌 것은?", a: "분진(일반) - 특수건강진단은 납, 유기용제, 소음 등 법정 유해인자" },
        { id: 30, q: "방호장치를 해체하거나 사용을 중지한 경우 조치는?", a: "사업주에게 보고 후 지체없이 원상복구 - 무단 해체 금지" }
      ]
    },
    {
      title: "4. 건설안전 관련 법규",
      questions: [
        { id: 31, q: "건설업 유해위험방지계획서 제출 대상 공사는?", a: "지상 높이 31m 이상 또는 깊이 10m 이상 굴착공사 등 - 규모에 따라 제출" },
        { id: 32, q: "건설공사 안전관리비 계상 기준은?", a: "총 공사금액의 일정비율(공사종류별 요율) - 직접 공사비 기준 계상" },
        { id: 33, q: "건설업 안전보건교육 시간 기준(신규 채용 시)은?", a: "8시간 이상 - 일반 작업 신규 채용 교육" },
        { id: 34, q: "타워크레인 설치·해체 시 신호수 배치 기준은?", a: "작업 반경 내 1명 이상 - 신호체계 확립 필요" },
        { id: 35, q: "굴착공사 시 지반조사 실시 의무 깊이는?", a: "2m 이상 - 토사붕괴 방지를 위한 사전 조사" },
        { id: 36, q: "달비계의 안전계수 기준은?", a: "10 이상 - 달비계 와이어로프, 달기체인 등" },
        { id: 37, q: "가설구조물 설계 시 안전율 기준은?", a: "구조용 강재 1.5, 목재 2.0 이상 - 허용응력 산정 시 적용" },
        { id: 38, q: "해체공사 시 감리원 배치 대상 건축물은?", a: "연면적 1,000㎡ 이상 또는 3층 이상 건축물" },
        { id: 39, q: "고소작업대 사용 시 안전모 착용 의무 높이는?", a: "2m 이상 - 추락 위험 방지를 위한 보호구" },
        { id: 40, q: "거푸집 동바리 조립도면 작성 대상은?", a: "높이 5m 이상 또는 교량 상부구조 지보공 등 - 구조계산서 첨부" }
      ]
    },
    {
      title: "5. 벌칙 및 행정처분",
      questions: [
        { id: 41, q: "산업안전보건법상 가장 중한 벌칙은?", a: "7년 이하 징역 또는 1억원 이하 벌금 - 중대재해로 사망 발생 시" },
        { id: 42, q: "사업주가 안전조치 미이행으로 근로자 사망 시 처벌은?", a: "7년 이하 징역 또는 1억원 이하 벌금 - 산업안전보건법 제167조" },
        { id: 43, q: "작업중지 명령을 위반한 경우 처벌은?", a: "5년 이하 징역 또는 5천만원 이하 벌금 - 중대재해 발생 우려 시" },
        { id: 44, q: "안전보건교육 미실시 시 과태료 기준은?", a: "500만원 이하 - 위반 횟수에 따라 가중" },
        { id: 45, q: "양벌규정이 적용되는 경우 벌칙 감경 조건은?", a: "사업주가 상당한 주의와 감독을 게을리하지 않은 경우 - 면책사유" },
        { id: 46, q: "행정처분 중 '영업정지'에 해당하지 않는 것은?", a: "시정명령 - 영업정지는 안전관리 전문기관, 지정기관 등에 대한 처분" },
        { id: 47, q: "안전인증 미취득 위험기계 사용 시 처벌은?", a: "3년 이하 징역 또는 3천만원 이하 벌금 - 안전인증 의무 위반" },
        { id: 48, q: "사업주의 중대재해 발생 보고 의무 위반 시 처벌은?", a: "1천만원 이하 과태료 - 보고 의무 이행 강제" },
        { id: 49, q: "근로자의 안전조치 준수의무 위반 시 처벌은?", a: "300만원 이하 과태료 - 근로자에 대한 의무 부과" },
        { id: 50, q: "중대재해처벌법상 경영책임자 처벌 기준은?", a: "1년 이상 징역 또는 10억원 이하 벌금 - 안전보건확보 의무 위반으로 사망 시" }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/construction/construction-safety" className="text-amber-600 hover:text-amber-800 flex items-center gap-2">
            <span>←</span>
            <span>건설안전기사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⚖️</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">산업안전관계법규</h1>
              <p className="text-gray-600">건설안전기사 필기 제4과목</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">{completedQuestions.length}/{totalQuestions} 완료</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                <span className="font-semibold">{topic.title}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">
                    {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                  </span>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {openTopics.includes(topicIndex) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((item) => (
                    <div key={item.id} className={`p-4 rounded-lg border-2 transition-all ${completedQuestions.includes(item.id) ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={completedQuestions.includes(item.id)}
                          onChange={() => toggleQuestion(item.id)}
                          className="mt-1 w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{item.id}. {item.q}</p>
                          <p className="text-gray-600 text-sm bg-white p-3 rounded border">💡 {item.a}</p>
                          <button
                            onClick={() => openAIHelper(item.q, item.a)}
                            className="mt-2 text-sm text-amber-600 hover:text-amber-800 flex items-center gap-1"
                          >
                            <span>🤖</span>
                            <span>AI에게 더 자세히 물어보기</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3">📚 산업안전관계법규 학습 팁</h3>
          <ul className="space-y-2 text-amber-700 text-sm">
            <li>• 산업안전보건법 총칙의 용어 정의를 정확히 암기하세요</li>
            <li>• 안전보건관리체제의 선임기준과 업무범위를 구분하세요</li>
            <li>• 숫자로 된 기준(높이, 금액, 인원)은 반드시 암기하세요</li>
            <li>• 벌칙의 경중(징역, 벌금, 과태료)을 비교하여 학습하세요</li>
            <li>• 최근 개정된 중대재해처벌법 내용을 확인하세요</li>
          </ul>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🤖 AI 학습 도우미</h3>
            <p className="text-gray-600 mb-4">아래 AI 서비스를 선택하여 더 자세한 설명을 받아보세요:</p>

            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(getAIPrompt())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <div className="font-bold">Claude</div>
                    <div className="text-sm opacity-90">Anthropic의 AI 어시스턴트</div>
                  </div>
                </div>
              </a>

              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(getAIPrompt())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-bold">ChatGPT</div>
                    <div className="text-sm opacity-90">OpenAI의 대화형 AI</div>
                  </div>
                </div>
              </a>

              <a
                href={`https://gemini.google.com/?q=${encodeURIComponent(getAIPrompt())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <div className="font-bold">Gemini</div>
                    <div className="text-sm opacity-90">Google의 AI 어시스턴트</div>
                  </div>
                </div>
              </a>
            </div>

            <button
              onClick={() => setShowAIModal(false)}
              className="mt-4 w-full p-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
