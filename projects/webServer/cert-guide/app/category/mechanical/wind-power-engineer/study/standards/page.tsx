'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StandardsStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: 'KEC 규정', icon: '📋' },
    { id: 1, name: '신재생에너지법', icon: '🌱' },
    { id: 2, name: '전기사업법', icon: '⚡' },
    { id: 3, name: '전기안전관리법', icon: '🛡️' },
    { id: 4, name: '환경 인허가', icon: '🌿' },
    { id: 5, name: '전력거래', icon: '💰' },
    { id: 6, name: '기타 규정', icon: '📚' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '한국전기설비규정(KEC)의 적용 범위를 설명하시오.', answer: 'KEC는 전기설비의 안전한 설치와 운용을 위한 기술기준으로 저압, 고압, 특고압 설비에 적용한다.', explanation: '2021년 전면 개정 시행' },
      { id: 2, question: 'KEC에서 정한 접지시스템의 종류를 설명하시오.', answer: 'TT, TN(TN-S, TN-C, TN-C-S), IT 접지시스템이 있으며, 첫 글자는 전원측, 두번째는 기기측 접지를 의미한다.', explanation: '풍력발전은 TN-S 주로 적용' },
      { id: 3, question: '분산형전원 계통연계 기술기준을 설명하시오.', answer: '전압, 주파수, 역률, 고조파, 보호협조, 단독운전방지 요건을 규정한다.', explanation: 'KEC 520조 분산형전원' },
      { id: 4, question: 'KEC에서 규정하는 저압과 고압의 구분 기준을 설명하시오.', answer: '직류 750V, 교류 600V 이하가 저압, 초과~7kV가 고압, 7kV 초과가 특별고압이다.', explanation: '풍력발전은 특고압 적용' },
      { id: 5, question: '접지저항 기준치와 측정 방법을 설명하시오.', answer: '고압/특고압 접지: 10Ω 이하, 전위강하법 또는 클램프법으로 측정한다.', explanation: '계절별 변화 고려' },
      { id: 6, question: '피뢰설비 설치 기준을 설명하시오.', answer: '피뢰침, 피뢰도선, 접지극으로 구성하며 보호각 또는 회전구체법으로 보호범위를 결정한다.', explanation: 'IEC 62305 기반 KEC 적용' },
      { id: 7, question: '전선 및 케이블 선정 기준을 설명하시오.', answer: '허용전류, 전압강하, 기계적 강도, 환경 조건을 고려하여 선정한다.', explanation: '하중전류의 1.25배 이상' }
    ],
    1: [
      { id: 8, question: '신재생에너지법의 목적과 적용 대상을 설명하시오.', answer: '신재생에너지의 기술개발, 보급 확대, 산업 활성화를 목적으로 하며, 풍력, 태양광 등이 포함된다.', explanation: '정식명칭: 신에너지 및 재생에너지 개발·이용·보급 촉진법' },
      { id: 9, question: 'RPS(신재생에너지 공급의무화제도)를 설명하시오.', answer: '발전사업자에게 총 발전량의 일정 비율을 신재생에너지로 공급하도록 의무화하는 제도이다.', explanation: '500MW 이상 발전사업자 대상' },
      { id: 10, question: 'REC(신재생에너지 공급인증서)의 개념을 설명하시오.', answer: 'REC는 신재생에너지 발전량 1MWh당 발급되며, RPS 의무 이행에 사용된다.', explanation: '가중치에 따라 REC 수량 결정' },
      { id: 11, question: '풍력발전 REC 가중치를 설명하시오.', answer: '육상풍력 1.0, 연안해상(~5km) 2.0, 근해해상(5-10km) 2.5, 원해해상(10km~) 3.5이다.', explanation: '자가소비 및 ESS 연계 가중치 별도' },
      { id: 12, question: '신재생에너지 발전사업 허가 요건을 설명하시오.', answer: '사업자 자격, 기술인력, 재정능력, 설비 기준을 갖추어 산업통상자원부에 등록한다.', explanation: '1MW 이상 허가 대상' },
      { id: 13, question: '신재생에너지 설비인증제도를 설명하시오.', answer: '신재생에너지 설비의 성능과 품질을 인증하며, REC 가중치 적용 조건이다.', explanation: '에너지공단 인증' },
      { id: 14, question: '신재생에너지 클러스터 제도를 설명하시오.', answer: '신재생에너지 R&D, 실증, 인력양성을 위한 거점을 지정하여 육성하는 제도이다.', explanation: '새만금, 울산 등 지정' }
    ],
    2: [
      { id: 15, question: '전기사업법의 목적과 주요 내용을 설명하시오.', answer: '전기사업의 합리적 발전과 전기사용자 보호를 목적으로 발전, 송전, 배전, 판매사업을 규정한다.', explanation: '산업통상자원부 소관' },
      { id: 16, question: '발전사업 허가 절차를 설명하시오.', answer: '사업계획서 → 전력거래소 검토 → 산업부 허가 → 사업 개시 신고 순서이다.', explanation: '3MW 이상 발전사업 허가' },
      { id: 17, question: '전기품질 유지 의무를 설명하시오.', answer: '전기사업자는 전압, 주파수, 역률, 고조파 등 전기품질을 기준에 맞게 유지해야 한다.', explanation: '전기공급약관에 규정' },
      { id: 18, question: '계통연계 절차를 설명하시오.', answer: '사전협의 → 계통영향평가 → 접속설비 협의 → 공사계획 신고 → 사용전검사 순서이다.', explanation: '전력거래소, 한전과 협의' },
      { id: 19, question: '전기위원회의 역할을 설명하시오.', answer: '전기사업 관련 분쟁 조정, 기술기준 심의, 요금 심의 등을 수행한다.', explanation: '산업부 산하 위원회' },
      { id: 20, question: '전기사업자의 공급의무를 설명하시오.', answer: '정당한 사유 없이 전기 공급을 거부할 수 없으며, 보편적 공급 의무가 있다.', explanation: '전기공급약관 적용' },
      { id: 21, question: '발전소 공사계획 신고 대상을 설명하시오.', answer: '3MW 이상 발전설비의 설치, 변경 시 공사계획을 신고하고 사용전검사를 받아야 한다.', explanation: '안전관리법과 연계' }
    ],
    3: [
      { id: 22, question: '전기안전관리법의 목적을 설명하시오.', answer: '전기설비의 안전관리와 전기로 인한 재해 방지를 목적으로 한다.', explanation: '산업통상자원부 소관' },
      { id: 23, question: '전기안전관리자 선임 기준을 설명하시오.', answer: '용량에 따라 기술사, 기사, 산업기사, 기능사 자격자를 선임해야 한다.', explanation: '1MW 이상 발전소 선임 의무' },
      { id: 24, question: '사용전검사 대상과 절차를 설명하시오.', answer: '3MW 이상 전기설비는 설치 후 사용전검사를 받아야 하며, 전기안전공사가 수행한다.', explanation: '공사계획 승인 후 실시' },
      { id: 25, question: '정기검사 주기와 내용을 설명하시오.', answer: '3년마다 정기검사를 받으며, 안전관리 상태, 설비 성능을 확인한다.', explanation: '자체검사로 대체 가능 조건' },
      { id: 26, question: '전기설비 안전점검 항목을 설명하시오.', answer: '절연저항, 접지저항, 보호장치 동작, 외관 상태를 점검한다.', explanation: '월간/연간 점검 구분' },
      { id: 27, question: '전기안전관리 대행 제도를 설명하시오.', answer: '일정 규모 이하 전기설비는 안전관리 전문기관에 대행할 수 있다.', explanation: '한전 대행 또는 전문기관' },
      { id: 28, question: '전기재해 발생 시 조치사항을 설명하시오.', answer: '신속한 응급조치, 관계기관 신고, 원인조사, 재발방지 대책을 시행한다.', explanation: '중대재해 24시간 내 신고' }
    ],
    4: [
      { id: 29, question: '풍력발전 환경영향평가 대상을 설명하시오.', answer: '10MW 이상 풍력발전 또는 보전지역 내 설치 시 환경영향평가 대상이다.', explanation: '환경부 협의' },
      { id: 30, question: '환경영향평가 항목을 설명하시오.', answer: '대기, 수질, 토양, 소음, 진동, 생태계, 경관, 조류 영향을 평가한다.', explanation: '조류 충돌 예측 포함' },
      { id: 31, question: '소규모 환경영향평가 대상을 설명하시오.', answer: '환경영향평가 대상 외 개발사업 중 환경민감지역은 소규모 평가 대상이다.', explanation: '5MW 이상 풍력 해당' },
      { id: 32, question: '발전사업 개발행위 허가 절차를 설명하시오.', answer: '개발행위허가(군청) → 농지전용(농지법) → 산지전용(산림청) 등을 취득한다.', explanation: '인허가 통합 간소화 추진' },
      { id: 33, question: '해상풍력 해역이용협의 절차를 설명하시오.', answer: '해양수산부와 해역이용협의를 거쳐 공유수면 점사용 허가를 받는다.', explanation: '어업권, 항로 영향 협의' },
      { id: 34, question: '조류 충돌 저감 대책을 설명하시오.', answer: '터빈 배치 조정, 블레이드 도색, 레이더 감시, 운전 제어 등을 시행한다.', explanation: '철새 이동 시기 모니터링' },
      { id: 35, question: '소음 규제 기준과 저감 대책을 설명하시오.', answer: '주거지역 야간 45dB 이하, 저소음 블레이드, 운전 모드 조절로 저감한다.', explanation: '이격거리 확보' }
    ],
    5: [
      { id: 36, question: '전력시장 운영 체계를 설명하시오.', answer: '전력거래소가 실시간 전력시장을 운영하며, SMP(계통한계가격)로 정산한다.', explanation: '비용기반풀(CBP) 시장' },
      { id: 37, question: 'SMP(계통한계가격) 결정 방법을 설명하시오.', answer: 'SMP는 전력수요를 충족하는 마지막 발전기의 변동비로 결정된다.', explanation: '시간대별 SMP 변동' },
      { id: 38, question: '풍력발전 전력거래 방식을 설명하시오.', answer: '풍력발전은 변동비 0원으로 우선급전되며, SMP로 정산받는다.', explanation: 'REC 별도 거래' },
      { id: 39, question: 'PPA(전력구매계약) 유형을 설명하시오.', answer: '고정가격 PPA, 시장연동 PPA, CPPA(기업 직접구매) 등이 있다.', explanation: 'RE100 대응 CPPA 증가' },
      { id: 40, question: 'REC 거래 방식을 설명하시오.', answer: '현물시장(전력거래소), 계약시장(한전 등 의무자), 자체이행으로 거래한다.', explanation: 'REC 가격 변동성 있음' },
      { id: 41, question: '용량요금제(Capacity Market)를 설명하시오.', answer: '발전용량 확보에 대한 보상으로, 신재생에너지 변동성 보완 목적이다.', explanation: '한국은 정산 방식 적용' },
      { id: 42, question: '계통접속 비용 분담 원칙을 설명하시오.', answer: '발전사업자는 전용설비 비용을, 공용설비는 비용분담 기준에 따라 분담한다.', explanation: '접속설비 확충 공동 분담' }
    ],
    6: [
      { id: 43, question: 'IEC 61400 시리즈 표준을 설명하시오.', answer: 'IEC 61400은 풍력발전시스템의 설계, 시험, 측정에 관한 국제표준이다.', explanation: '61400-1: 설계요건' },
      { id: 44, question: 'IEC 61400-12 출력곡선 측정 표준을 설명하시오.', answer: '풍속별 출력을 측정하여 보증 출력곡선을 검증하는 표준이다.', explanation: '측풍탑 설치 기준 포함' },
      { id: 45, question: 'IECRE 인증제도를 설명하시오.', answer: 'IECRE는 풍력발전 설비의 국제적 적합성 인증을 위한 제도이다.', explanation: '형식인증, 프로젝트인증' },
      { id: 46, question: '한국산업표준(KS)의 풍력 관련 규격을 설명하시오.', answer: 'KS C IEC 61400 시리즈로 국제표준을 부합화하여 적용한다.', explanation: 'KS 인증 제품 우대' },
      { id: 47, question: '건축법 풍력발전 관련 규정을 설명하시오.', answer: '일정 높이 이상 구조물은 건축허가 대상이며, 구조 안전 확인이 필요하다.', explanation: '항공장애등 설치 의무' },
      { id: 48, question: '항공법 풍력발전 관련 규정을 설명하시오.', answer: '높이 60m 이상 구조물은 항공장애표시등과 표지를 설치해야 한다.', explanation: '공항 주변 고도제한' },
      { id: 49, question: '소방법 풍력발전 관련 규정을 설명하시오.', answer: '변전소, 나셀 내 소화설비 설치와 피난설비를 갖추어야 한다.', explanation: '자동소화설비 권장' },
      { id: 50, question: '근로기준법 안전보건 규정을 설명하시오.', answer: '풍력발전 건설·운영 시 산업안전보건법에 따른 안전조치를 해야 한다.', explanation: '고소작업 특별안전교육' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`풍력발전설비기사 시험 관련 질문입니다:\n\n${question}\n\n이 문제에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-purple-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link><span>/</span>
            <Link href="/category/mechanical/wind-power-engineer" className="hover:text-white">풍력발전설비기사</Link><span>/</span>
            <Link href="/category/mechanical/wind-power-engineer/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">전기설비기술기준 및 법규</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">📋 전기설비기술기준 및 법규</h1>
          <p className="text-purple-100">KEC, 신재생에너지법, 전기사업법, 안전관리법</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-purple-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">📚 학습 토픽</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button key={topic.id} onClick={() => setCurrentTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-purple-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-purple-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-purple-50 rounded-lg"><p className="font-medium text-purple-900">✅ 정답</p><p className="text-purple-800 mt-1">{q.answer}</p></div>
                    <div className="p-4 bg-gray-50 rounded-lg"><p className="font-medium text-gray-700">💡 해설</p><p className="text-gray-600 mt-1">{q.explanation}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">🤖 AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto"><p className="text-gray-700 text-sm whitespace-pre-wrap">{currentPrompt}</p></div>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium">Claude에서 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium">ChatGPT에서 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium">Gemini에서 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
