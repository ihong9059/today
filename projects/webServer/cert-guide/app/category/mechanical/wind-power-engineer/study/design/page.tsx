'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DesignStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '터빈 선정', icon: '🔍' },
    { id: 1, name: '타워 설계', icon: '🗼' },
    { id: 2, name: '기초 설계', icon: '🏗️' },
    { id: 3, name: '전기설계', icon: '⚡' },
    { id: 4, name: '단지 배치', icon: '📍' },
    { id: 5, name: '해상풍력', icon: '🌊' },
    { id: 6, name: '경제성 분석', icon: '💰' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: 'IEC 61400-1에 따른 풍력터빈 등급(Class)을 설명하시오.', answer: 'Class I(10m/s), II(8.5m/s), III(7.5m/s)로 구분하며, 연평균풍속과 극치풍속 기준이다.', explanation: 'S Class는 특수 조건용' },
      { id: 2, question: '풍력터빈 선정 시 고려해야 할 주요 인자를 설명하시오.', answer: '풍황조건, 터빈등급, 로터직경, 허브높이, 정격출력, 제조사 신뢰성 등을 고려한다.', explanation: '사이트 조건과 터빈 사양 매칭' },
      { id: 3, question: '로터 직경과 정격출력의 관계를 설명하시오.', answer: '출력은 수풍면적에 비례하므로 직경 제곱에 비례하며, 같은 출력 시 저풍속 사이트는 큰 직경이 유리하다.', explanation: '특정 출력밀도(W/m²) 기준 선정' },
      { id: 4, question: '허브 높이 결정 시 고려사항을 설명하시오.', answer: '풍속 증가율, 난류, 시각적 영향, 운송 제한, 경제성을 종합하여 결정한다.', explanation: '높이 증가 시 발전량↑, 비용↑' },
      { id: 5, question: '연간 에너지 생산량(AEP) 계산에 필요한 입력 데이터를 설명하시오.', answer: '풍속 빈도 분포, 터빈 출력곡선, 가용률, 손실계수가 필요하다.', explanation: '불확실성 분석(P50, P90) 포함' },
      { id: 6, question: '터빈 배치 최적화의 목표와 제약조건을 설명하시오.', answer: '발전량 최대화, 후류 손실 최소화를 목표로 이격거리, 지형, 소음, 시각적 제약을 고려한다.', explanation: '수학적 최적화 알고리즘 적용' },
      { id: 7, question: '터빈 선정 시 복잡지형의 영향을 설명하시오.', answer: '복잡지형은 풍속 증속, 난류 증가, 풍향 변화를 유발하므로 정밀 해석이 필요하다.', explanation: 'CFD 또는 선형화 모델 적용' }
    ],
    1: [
      { id: 8, question: '풍력터빈 타워의 종류와 특징을 비교하시오.', answer: '강관타워(조립, 운송 제한), 콘크리트타워(현장타설 가능), 하이브리드(높이 대응)가 있다.', explanation: '높이 100m 이상은 하이브리드 검토' },
      { id: 9, question: '타워 구조 설계 시 고려하는 하중 조합을 설명하시오.', answer: '정상 발전, 극치 조건, 긴급정지, 피로 하중 등 IEC 설계하중 케이스를 적용한다.', explanation: 'DLC(Design Load Case) 분석' },
      { id: 10, question: '타워의 고유진동수 설계 기준을 설명하시오.', answer: '타워 1차 고유진동수가 로터 회전주파수(1P)와 블레이드 통과주파수(3P) 사이가 되도록 설계한다.', explanation: 'Soft-Stiff 설계 범위' },
      { id: 11, question: '타워의 피로 해석 방법을 설명하시오.', answer: '레인플로우 계수법으로 하중 사이클을 분류하고, S-N 곡선과 마이너 법칙으로 피로 수명을 평가한다.', explanation: 'DEL(Damage Equivalent Load) 활용' },
      { id: 12, question: '타워 플랜지 연결부 설계 고려사항을 설명하시오.', answer: '볼트 프리텐션, 피로강도, 면압, 분리현상 방지를 고려하여 설계한다.', explanation: 'L-플랜지 또는 T-플랜지' },
      { id: 13, question: '타워 내부 승강설비와 안전설비를 설명하시오.', answer: '사다리, 엘리베이터, 추락방지대, 조명, 환기설비를 설치해야 한다.', explanation: '높이 30m 이상 엘리베이터 권장' },
      { id: 14, question: '타워 부식 방지 대책을 설명하시오.', answer: '도장(외부), 제습기(내부), 희생양극법(해상) 등을 적용한다.', explanation: '해상풍력은 부식 환경 가혹' }
    ],
    2: [
      { id: 15, question: '육상풍력 기초의 종류와 적용 조건을 설명하시오.', answer: '중력식(연약지반), 말뚝기초(암반), 슬래브기초(양호지반)가 있다.', explanation: '지반조사 결과에 따라 선정' },
      { id: 16, question: '기초 설계 시 고려하는 하중과 조합을 설명하시오.', answer: '수직력(자중), 수평력(추력), 전도모멘트, 비틀림모멘트를 조합하여 설계한다.', explanation: '극한상태와 사용상태 검토' },
      { id: 17, question: '기초의 전도 안정성 검토 방법을 설명하시오.', answer: '전도모멘트에 대한 저항모멘트의 비율(안전율)이 1.5 이상이어야 한다.', explanation: '편심거리 e < B/6 확인' },
      { id: 18, question: '지반지지력 검토 방법을 설명하시오.', answer: '지반반력이 허용지지력을 초과하지 않도록 기초 크기를 결정한다.', explanation: '테르자기 공식 적용' },
      { id: 19, question: '해상풍력 기초의 종류를 설명하시오.', answer: '모노파일, 자켓, 트라이포드, 중력식, 석션버켓, 부유식이 있다.', explanation: '수심에 따라 적합한 형식 선정' },
      { id: 20, question: '모노파일 기초의 설계 고려사항을 설명하시오.', answer: '횡방향 지지력, 피로, 세굴, 부식을 고려하며 직경 6-10m급이 적용된다.', explanation: '수심 30m 이하 적용' },
      { id: 21, question: '세굴(Scour) 현상과 방지 대책을 설명하시오.', answer: '해류/파도에 의해 기초 주변 해저가 침식되며, 세굴방지공(스톤백)을 설치한다.', explanation: '세굴 깊이 예측 필수' }
    ],
    3: [
      { id: 22, question: '풍력단지 전기설계의 주요 항목을 설명하시오.', answer: '집전계통, 변전소, 연계선로, 접지, 피뢰, 보호시스템을 설계한다.', explanation: '단지 배치와 연계하여 최적화' },
      { id: 23, question: '집전계통(Collection System) 설계 고려사항을 설명하시오.', answer: '케이블 용량, 손실, 신뢰성, 비용을 고려하여 방사형 또는 루프형으로 설계한다.', explanation: '33kV 중전압 케이블 사용' },
      { id: 24, question: '해상풍력 케이블 설계 고려사항을 설명하시오.', answer: '기계적 강도, 수밀성, 열특성, 매설/포설 방법을 고려하여 설계한다.', explanation: '케이블 보호공 설치' },
      { id: 25, question: '단지 내 변전소 설계 항목을 설명하시오.', answer: '변압기, 개폐장치, 보호반, 무효전력 보상장치, SCADA를 포함한다.', explanation: '해상변전소는 플랫폼 설계 포함' },
      { id: 26, question: '풍력단지 접지시스템 설계를 설명하시오.', answer: '각 터빈 접지를 집전계통 접지도체로 연결하여 등전위를 형성한다.', explanation: '통합접지저항 10Ω 이하' },
      { id: 27, question: '단지 내 전력손실 계산 방법을 설명하시오.', answer: '케이블 저항손실(I²R), 변압기 손실을 계산하며 연간발전량의 2-4%이다.', explanation: '케이블 단면적 최적화' },
      { id: 28, question: '풍력발전 연계점 설비를 설명하시오.', answer: '계통연계 변전소, 차단기, 보호계전기, 계측설비, 통신설비로 구성된다.', explanation: '계통운영자 기술기준 준수' }
    ],
    4: [
      { id: 29, question: '풍력단지 레이아웃 설계 절차를 설명하시오.', answer: '풍황분석 → 제약조건 파악 → 초기배치 → 후류해석 → 최적화 순서로 진행한다.', explanation: 'GIS 기반 다기준 분석' },
      { id: 30, question: '터빈 이격거리 결정 기준을 설명하시오.', answer: '주풍향 방향 5-10D, 직각방향 3-5D 이격을 기본으로 후류해석으로 최적화한다.', explanation: 'D: 로터 직경' },
      { id: 31, question: '후류 모델의 종류와 특징을 설명하시오.', answer: 'Jensen, Frandsen, CFD 모델이 있으며, 정확도와 계산시간이 다르다.', explanation: 'WindPRO, OpenWind 등 SW 활용' },
      { id: 32, question: '소음 규제와 터빈 배치의 관계를 설명하시오.', answer: '인근 주거지까지 거리와 야간 소음기준을 고려하여 배치를 결정한다.', explanation: '야간 45dB 이하 등 규정' },
      { id: 33, question: '시각적 영향(Visual Impact) 평가 방법을 설명하시오.', answer: 'ZTV(Zone of Theoretical Visibility) 분석으로 가시 영역을 파악하고 영향을 최소화한다.', explanation: '포토몽타주 활용' },
      { id: 34, question: '그림자 깜박임(Shadow Flicker) 평가를 설명하시오.', answer: '태양 위치, 터빈 위치, 수용체 위치로 연간 영향시간을 계산한다.', explanation: '연간 30시간 이하 권고' },
      { id: 35, question: '환경영향평가 항목을 설명하시오.', answer: '조류/생태계 영향, 소음, 그림자, 경관, 전자파 간섭 등을 평가한다.', explanation: '조류 충돌 위험 평가 포함' }
    ],
    5: [
      { id: 36, question: '해상풍력 사이트 조사 항목을 설명하시오.', answer: '해상기상, 해저지반, 해류/파도, 수심, 해저케이블 경로를 조사한다.', explanation: '최소 1년 해상측풍 수행' },
      { id: 37, question: '해상풍력 기초 형식 선정 기준을 설명하시오.', answer: '수심, 지반조건, 파도/해류, 터빈 용량, 설치선박 가용성을 고려한다.', explanation: '수심 증가시 자켓, 부유식 검토' },
      { id: 38, question: '부유식 해상풍력의 종류와 특징을 설명하시오.', answer: 'Spar, Semi-sub, TLP, Barge 형식이 있으며, 수심 50m 이상에 적용한다.', explanation: '계류시스템 설계 필수' },
      { id: 39, question: '해상변전소(OSS) 설계 고려사항을 설명하시오.', answer: '변압기, 개폐장치, 보조설비를 탑재하고, 접근성, 안전설비를 고려한다.', explanation: 'HVDC 연계시 컨버터스테이션' },
      { id: 40, question: '해상풍력 설치선박의 종류를 설명하시오.', answer: 'Jack-up Vessel, Heavy Lift Vessel, Cable Laying Vessel 등이 있다.', explanation: '설치선박 가용성이 공정에 영향' },
      { id: 41, question: '해상풍력 O&M 전략을 설명하시오.', answer: 'CTV/SOV 활용, 예방정비, 상태감시, 원격 모니터링으로 가용률을 높인다.', explanation: 'O&M 항구 위치 선정 중요' },
      { id: 42, question: '해상풍력 케이블 경로 설계를 설명하시오.', answer: '해저지형, 기존시설, 어장, 선박항로를 피하여 최적 경로를 결정한다.', explanation: '케이블 매설깊이 1-2m' }
    ],
    6: [
      { id: 43, question: 'LCOE(균등화발전비용) 산정 방법을 설명하시오.', answer: 'LCOE = (CAPEX×CRF + OPEX) / AEP, 투자비, 운영비, 발전량을 반영한다.', explanation: '할인율, 수명 20-25년 가정' },
      { id: 44, question: '풍력발전 투자비(CAPEX) 구성을 설명하시오.', answer: '터빈(65-75%), 기초/타워(10-15%), 전기설비(10%), 개발/인허가(5%)로 구성된다.', explanation: '해상풍력은 기초/설치 비중 증가' },
      { id: 45, question: '운영비(OPEX) 항목을 설명하시오.', answer: '정비, 보험, 토지임대, 계통사용료, 관리비 등이 포함된다.', explanation: '연간 CAPEX의 2-3%(육상)' },
      { id: 46, question: '경제성 분석 시 불확실성 평가 방법을 설명하시오.', answer: 'P50/P90 발전량, 민감도 분석, 시나리오 분석으로 위험을 평가한다.', explanation: 'P90: 90% 확률로 초과 발전량' },
      { id: 47, question: 'REC/RPS 제도와 수익구조를 설명하시오.', answer: 'SMP(전력판매) + REC(공급인증서) 수익으로 구성되며, REC 가중치가 수익에 영향을 미친다.', explanation: '해상풍력 REC 가중치 높음' },
      { id: 48, question: 'PPA(전력구매계약)의 종류와 특징을 설명하시오.', answer: '장기고정가격 PPA, 시장연동 PPA가 있으며, 프로젝트 파이낸싱에 필수이다.', explanation: '15-20년 장기계약 선호' },
      { id: 49, question: '풍력발전 프로젝트 파이낸싱 구조를 설명하시오.', answer: '자기자본(Equity)과 타인자본(Debt)으로 구성되며, 부채비율 70-80%가 일반적이다.', explanation: 'DSCR(부채상환비율) 1.2 이상' },
      { id: 50, question: '풍력발전 수익성 지표(IRR, NPV)를 설명하시오.', answer: 'IRR(내부수익률)은 할인율 기준, NPV(순현재가치)는 절대수익을 나타낸다.', explanation: 'IRR 8-12%, NPV>0 목표' }
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
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-teal-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link><span>/</span>
            <Link href="/category/mechanical/wind-power-engineer" className="hover:text-white">풍력발전설비기사</Link><span>/</span>
            <Link href="/category/mechanical/wind-power-engineer/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">풍력발전설비 설계</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">📐 풍력발전설비 설계</h1>
          <p className="text-teal-100">터빈 선정, 타워/기초 설계, 전기설계, 단지배치</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-teal-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-teal-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-teal-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-teal-50 rounded-lg"><p className="font-medium text-teal-900">✅ 정답</p><p className="text-teal-800 mt-1">{q.answer}</p></div>
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
