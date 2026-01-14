'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PowerSystemsStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '발전기 시스템', icon: '🔌' },
    { id: 1, name: 'DFIG 시스템', icon: '⚡' },
    { id: 2, name: 'PMSG 시스템', icon: '🧲' },
    { id: 3, name: '전력변환장치', icon: '🔄' },
    { id: 4, name: '계통연계', icon: '🌐' },
    { id: 5, name: '전력품질', icon: '📊' },
    { id: 6, name: '보호시스템', icon: '🛡️' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '풍력터빈에 사용되는 발전기의 종류와 특징을 설명하시오.', answer: '유도발전기(SCIG, DFIG)와 동기발전기(PMSG, EESG)가 있으며, 각각 다른 제어 특성을 가진다.', explanation: 'SCIG: 고정속, DFIG: 제한 가변속, PMSG: 완전 가변속' },
      { id: 2, question: '농형 유도발전기(SCIG)의 특징과 제한사항을 설명하시오.', answer: 'SCIG는 구조가 간단하고 견고하나, 고정속 운전으로 효율이 낮고 무효전력 소비가 크다.', explanation: '초기 소형 터빈에 주로 사용' },
      { id: 3, question: '발전기의 동기속도와 슬립의 관계를 설명하시오.', answer: '동기속도 Ns = 120f/p, 슬립 s = (Ns-N)/Ns, 유도발전기는 음의 슬립으로 발전한다.', explanation: '발전기 슬립: -1~-3% 범위' },
      { id: 4, question: '풍력발전기의 극수와 회전속도의 관계를 설명하시오.', answer: '극수가 많을수록 동기속도가 낮아지며, 다극 발전기는 기어박스 없이 직접 구동에 적합하다.', explanation: 'PMSG 직접구동: 수십~수백 극' },
      { id: 5, question: '발전기 효율에 영향을 미치는 요인을 설명하시오.', answer: '기계손(마찰, 풍손), 철손(히스테리시스, 와전류), 동손(저항손실)이 효율에 영향을 미친다.', explanation: '대형 발전기 효율 95% 이상' },
      { id: 6, question: '발전기 절연등급과 허용 온도를 설명하시오.', answer: '절연등급 B(130℃), F(155℃), H(180℃)가 있으며, 등급에 따라 허용 온도가 결정된다.', explanation: '풍력발전기는 주로 F급 사용' },
      { id: 7, question: '발전기 냉각 방식의 종류를 설명하시오.', answer: '공냉식(IC411), 수냉식(IC71W), 밀폐순환식 등이 있으며, 용량에 따라 선택한다.', explanation: '대형 발전기는 수냉식 권장' }
    ],
    1: [
      { id: 8, question: 'DFIG(이중여자유도발전기)의 구조와 동작 원리를 설명하시오.', answer: 'DFIG는 고정자가 계통에 직접 연결되고, 회전자는 컨버터를 통해 여자되어 가변속 운전이 가능하다.', explanation: '동기속도 ±30% 가변속 운전' },
      { id: 9, question: 'DFIG의 슬립링과 브러시 시스템의 역할을 설명하시오.', answer: '슬립링과 브러시는 회전하는 로터에 전력변환장치의 전력을 공급하는 역할을 한다.', explanation: '브러시 마모로 정기 교체 필요' },
      { id: 10, question: 'DFIG 시스템의 로터측 컨버터(RSC)의 기능을 설명하시오.', answer: 'RSC는 로터 전류를 제어하여 토크와 무효전력을 독립적으로 제어한다.', explanation: '벡터 제어 방식 적용' },
      { id: 11, question: 'DFIG 시스템의 계통측 컨버터(GSC)의 기능을 설명하시오.', answer: 'GSC는 DC링크 전압을 일정하게 유지하고, 슬립 전력을 계통과 교환한다.', explanation: '역률 1로 운전 가능' },
      { id: 12, question: 'DFIG의 아과동기(Sub-synchronous)와 과동기(Super-synchronous) 운전을 설명하시오.', answer: '아과동기는 로터가 전력을 흡수, 과동기는 로터도 전력을 출력하여 효율이 높다.', explanation: '동기속도 이상에서 효율 극대화' },
      { id: 13, question: 'DFIG의 크라우바(Crowbar) 보호 시스템을 설명하시오.', answer: '계통 사고 시 과전류로부터 로터측 컨버터를 보호하기 위해 로터를 단락시키는 장치이다.', explanation: '능동형 크라우바: 빠른 복귀 가능' },
      { id: 14, question: 'DFIG 컨버터의 용량이 전체 발전기 용량의 약 30%인 이유를 설명하시오.', answer: '컨버터가 슬립 전력만 처리하므로, ±30% 가변속 범위에서 최대 30%의 슬립 전력만 전달한다.', explanation: '비용 절감의 장점' }
    ],
    2: [
      { id: 15, question: 'PMSG(영구자석동기발전기)의 구조와 특징을 설명하시오.', answer: 'PMSG는 로터에 영구자석을 사용하여 여자 손실이 없고 효율이 높으며, 기어박스 없이 직접구동이 가능하다.', explanation: '해상풍력에서 선호되는 방식' },
      { id: 16, question: 'PMSG의 영구자석 재료(NdFeB)의 특성을 설명하시오.', answer: 'NdFeB(네오디뮴) 자석은 높은 에너지밀도와 보자력을 가지나, 고온에서 감자 위험이 있다.', explanation: '희토류 가격 변동이 비용에 영향' },
      { id: 17, question: 'PMSG 풀컨버터(Full Converter) 시스템의 구성을 설명하시오.', answer: '발전기-정류기-DC링크-인버터-변압기로 구성되어 전력 전체가 컨버터를 통과한다.', explanation: '완전 가변속 운전, LVRT 유리' },
      { id: 18, question: 'PMSG의 직접구동(Direct Drive) 방식의 장단점을 설명하시오.', answer: '기어박스가 없어 유지보수가 줄고 신뢰성이 높으나, 발전기가 크고 무거워진다.', explanation: '해상풍력 O&M 비용 절감' },
      { id: 19, question: 'PMSG의 MPPT(최대출력점추종) 제어 방법을 설명하시오.', answer: '풍속에 따라 발전기 토크를 제어하여 최적 TSR을 유지하고 최대 전력을 추출한다.', explanation: '토크 기준 또는 속도 기준 제어' },
      { id: 20, question: 'PMSG와 DFIG의 계통 사고 시 대응 특성을 비교하시오.', answer: 'PMSG는 풀컨버터가 계통과 분리되어 LVRT가 용이하고, DFIG는 크라우바가 필요하다.', explanation: 'PMSG가 계통 연계 요건 충족 유리' },
      { id: 21, question: 'PMSG의 감자(Demagnetization) 방지 대책을 설명하시오.', answer: '과전류 제한, 온도 관리, 단락 보호를 통해 영구자석의 감자를 방지한다.', explanation: '발전기 내부 온도 모니터링 필수' }
    ],
    3: [
      { id: 22, question: '풍력발전 전력변환장치의 구성과 역할을 설명하시오.', answer: '정류기(AC→DC), DC링크(에너지 저장), 인버터(DC→AC)로 구성되어 가변속 운전을 가능하게 한다.', explanation: '양방향 전력 흐름 제어' },
      { id: 23, question: 'PWM(펄스폭변조) 방식의 원리와 장점을 설명하시오.', answer: 'PWM은 스위칭 펄스의 폭을 조절하여 출력 파형을 제어하며, 고조파를 줄이고 효율을 높인다.', explanation: '스위칭 주파수 2-20kHz' },
      { id: 24, question: 'IGBT와 MOSFET 스위칭 소자의 특성을 비교하시오.', answer: 'IGBT는 고전압·대전류에 적합하고, MOSFET은 고속 스위칭에 적합하다.', explanation: '풍력발전은 주로 IGBT 사용' },
      { id: 25, question: 'DC링크 커패시터의 역할과 설계 고려사항을 설명하시오.', answer: 'DC링크 커패시터는 전압을 안정화하고 순간 전력 변동을 흡수한다.', explanation: '전해 커패시터 또는 필름 커패시터' },
      { id: 26, question: '2레벨과 3레벨 인버터의 차이점을 설명하시오.', answer: '3레벨 인버터는 출력 전압 레벨이 많아 고조파가 적고 필터 크기가 작아진다.', explanation: 'NPC(Neutral Point Clamped) 방식' },
      { id: 27, question: '전력변환장치의 효율과 손실 요인을 설명하시오.', answer: '스위칭 손실, 도통 손실, 스너버 손실 등이 있으며, 전체 효율은 97-99%이다.', explanation: '냉각 시스템 설계에 반영' },
      { id: 28, question: '전력변환장치의 냉각 방식을 설명하시오.', answer: '공냉식, 수냉식, 히트파이프 방식이 있으며, 대용량은 수냉식을 주로 사용한다.', explanation: '온도 관리가 신뢰성에 중요' }
    ],
    4: [
      { id: 29, question: '계통연계 기술기준의 주요 항목을 설명하시오.', answer: '전압, 주파수, 역률, 고조파, LVRT, 출력제어 등의 요건을 만족해야 한다.', explanation: '전력거래소 계통연계 기술기준' },
      { id: 30, question: 'LVRT(Low Voltage Ride-Through) 요건을 설명하시오.', answer: 'LVRT는 계통 전압 저하 시에도 일정 시간 연계를 유지하여 계통 안정에 기여하는 것이다.', explanation: '전압 20%까지 150ms 유지 등' },
      { id: 31, question: 'HVRT(High Voltage Ride-Through)의 필요성을 설명하시오.', answer: 'HVRT는 계통 과전압 시에도 연계를 유지하며, 선로 개방 등에 의한 과전압에 대응한다.', explanation: '최근 계통연계 요건에 추가' },
      { id: 32, question: '풍력발전 무효전력 제어의 목적과 방법을 설명하시오.', answer: '계통 전압 유지를 위해 무효전력을 공급/흡수하며, 컨버터 제어로 구현한다.', explanation: '역률 0.9 지상~0.9 진상 요구' },
      { id: 33, question: '주파수 조정(Frequency Response) 기능을 설명하시오.', answer: '계통 주파수 변동 시 출력을 조정하여 주파수 안정화에 기여한다.', explanation: '드룹 제어, 관성 모사 기능' },
      { id: 34, question: '출력 제한(Curtailment)이 필요한 상황과 방법을 설명하시오.', answer: '계통 과발전, 송전선 혼잡 시 출력을 제한하며, 피치 제어로 구현한다.', explanation: '경제급전 지령에 따라 수행' },
      { id: 35, question: '계통연계용 변압기의 선정 기준을 설명하시오.', answer: '용량, 전압비, 임피던스, 결선방식을 고려하여 선정하며, 고조파 대책도 반영한다.', explanation: 'Dyn11 결선이 일반적' }
    ],
    5: [
      { id: 36, question: '풍력발전이 전력품질에 미치는 영향을 설명하시오.', answer: '전압변동, 플리커, 고조파, 주파수변동 등의 전력품질 문제를 유발할 수 있다.', explanation: 'IEC 61400-21 평가 기준' },
      { id: 37, question: '플리커(Flicker)의 원인과 대책을 설명하시오.', answer: '풍속 변동에 따른 출력 변동이 전압 변동을 일으켜 플리커가 발생하며, 가변속 운전으로 완화한다.', explanation: 'Pst, Plt 값으로 평가' },
      { id: 38, question: '고조파 발생 원인과 저감 대책을 설명하시오.', answer: '전력변환장치의 스위칭에 의해 고조파가 발생하며, PWM 제어와 필터로 저감한다.', explanation: 'THD 5% 이하 유지' },
      { id: 39, question: '전압변동률 계산과 허용 기준을 설명하시오.', answer: '전압변동률 = ΔV/V × 100(%), 배전계통 연계 시 ±5% 이내 유지해야 한다.', explanation: '연계점 단락용량과 관련' },
      { id: 40, question: '역률 보상의 필요성과 방법을 설명하시오.', answer: '무효전력 소비로 인한 전압 강하와 손실을 줄이기 위해 컨버터 제어 또는 커패시터를 사용한다.', explanation: '지정 역률 0.9 이상 유지' },
      { id: 41, question: '계통 단락용량과 풍력발전 영향의 관계를 설명하시오.', answer: '단락용량이 클수록 풍력발전의 전압 영향이 작아지며, 연계 용량 산정에 활용한다.', explanation: 'SCR(Short Circuit Ratio) 평가' },
      { id: 42, question: '아일랜딩(Islanding) 방지 대책을 설명하시오.', answer: '계통 분리 시 발전을 자동 정지하여 작업자 안전과 재폐로 문제를 방지한다.', explanation: '능동적/수동적 검출 방식' }
    ],
    6: [
      { id: 43, question: '풍력발전 보호계전시스템의 구성을 설명하시오.', answer: '과전류, 지락, 과전압, 저전압, 주파수, 역전력 계전기 등으로 구성된다.', explanation: '디지털 보호계전기 적용' },
      { id: 44, question: '과전류계전기(OCR)의 정정 방법을 설명하시오.', answer: '정격전류의 1.2-1.5배로 순시요소를, 시한특성 곡선에 맞게 시한요소를 정정한다.', explanation: '상위 보호와 협조 필요' },
      { id: 45, question: '지락보호계전기(GR, SGR)의 역할을 설명하시오.', answer: 'GR은 저항 접지 계통, SGR은 선택지락 보호에 사용하여 지락 사고를 검출한다.', explanation: '영상전류 또는 영상전압 검출' },
      { id: 46, question: '풍력발전 단지 내 보호협조 방안을 설명하시오.', answer: '터빈 보호-집전 계통 보호-연계점 보호가 시간 협조되어 고장 구간만 분리한다.', explanation: '상위-하위 계전기 협조' },
      { id: 47, question: '피뢰설비의 구성과 설치 기준을 설명하시오.', answer: '블레이드 리셉터, 다운컨덕터, 접지시스템으로 구성되어 낙뢰 전류를 안전하게 방류한다.', explanation: 'IEC 62305, IEC 61400-24' },
      { id: 48, question: '접지시스템의 설계 기준을 설명하시오.', answer: '통합접지 10Ω 이하, 개별접지 연결 등으로 구성하며 등전위 본딩을 실시한다.', explanation: '링 접지 + 수직 접지봉' },
      { id: 49, question: '풍력터빈 자체 보호 기능을 설명하시오.', answer: '과속, 과진동, 과온도, 유압/윤활 이상 등을 감시하여 자동 정지한다.', explanation: '독립적인 안전 시스템 구성' },
      { id: 50, question: '고장 파급 방지를 위한 FRT(Fault Ride-Through) 기능을 설명하시오.', answer: 'FRT는 계통 사고 시 풍력발전기가 연계를 유지하여 대량 탈락으로 인한 2차 사고를 방지한다.', explanation: 'LVRT, HVRT 포함' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];

  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) {
      setCompletedQuestions(prev => new Set([...prev, id]));
    }
  };

  const openAIModal = (question: string) => {
    setCurrentPrompt(`풍력발전설비기사 시험 관련 질문입니다:\n\n${question}\n\n이 문제에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };

  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link>
            <span>/</span>
            <Link href="/category/mechanical/wind-power-engineer" className="hover:text-white">풍력발전설비기사</Link>
            <span>/</span>
            <Link href="/category/mechanical/wind-power-engineer/study" className="hover:text-white">학습</Link>
            <span>/</span>
            <span className="text-white">전력계통 및 전기설비</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">⚡ 전력계통 및 전기설비</h1>
          <p className="text-blue-100">발전기, 전력변환장치, 계통연계, 보호시스템</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-blue-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">📚 학습 토픽</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setCurrentTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentTopic === topic.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-medium text-gray-900">
                    <span className="text-blue-500 font-bold">Q{q.id}.</span> {q.question}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                    {showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}
                  </button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    🤖 AI에게 질문
                  </button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900">✅ 정답</p>
                      <p className="text-blue-800 mt-1">{q.answer}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-700">💡 해설</p>
                      <p className="text-gray-600 mt-1">{q.explanation}</p>
                    </div>
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
            <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto">
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{currentPrompt}</p>
            </div>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700">Claude에서 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700">ChatGPT에서 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700">Gemini에서 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
