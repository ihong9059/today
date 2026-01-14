'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WindTurbineStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '풍력 에너지 기초', icon: '💨' },
    { id: 1, name: '공기역학', icon: '🔄' },
    { id: 2, name: '바람 자원 분석', icon: '📊' },
    { id: 3, name: '풍속 분포', icon: '📈' },
    { id: 4, name: '풍력터빈 구조', icon: '⚙️' },
    { id: 5, name: '터빈 제어', icon: '🎛️' },
    { id: 6, name: '에너지 생산', icon: '⚡' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '풍력 에너지의 기본 원리와 바람이 가진 에너지를 설명하시오.', answer: '풍력 에너지는 대기 중 공기의 운동 에너지를 회전 에너지로 변환하여 전기를 생산하는 것이다.', explanation: '바람의 운동에너지 P = ½ρAV³ (ρ: 공기밀도, A: 수풍면적, V: 풍속)' },
      { id: 2, question: '베츠 한계(Betz Limit)의 의미와 그 값을 설명하시오.', answer: '베츠 한계는 풍력터빈이 바람으로부터 추출할 수 있는 에너지의 이론적 최대치로, 약 59.3%(16/27)이다.', explanation: '독일 물리학자 알버트 베츠가 1919년 유도한 이론으로, 실제 터빈 효율은 45-50% 수준' },
      { id: 3, question: '양력형(Lift)과 항력형(Drag) 풍력터빈의 차이를 설명하시오.', answer: '양력형은 날개에 작용하는 양력을 이용해 회전하며, 항력형은 바람의 직접적인 힘(항력)을 이용한다.', explanation: '현대 대형 풍력터빈은 대부분 양력형(수평축)이며, 사보니우스 터빈은 대표적인 항력형' },
      { id: 4, question: '풍력 발전의 출력계수(Cp)란 무엇인가?', answer: '출력계수는 바람이 가진 에너지 중 터빈이 실제로 추출한 에너지의 비율이다.', explanation: 'Cp = 터빈출력 / 바람에너지, 이론 최대값은 베츠 한계인 0.593' },
      { id: 5, question: '수평축 풍력터빈(HAWT)과 수직축 풍력터빈(VAWT)을 비교하시오.', answer: 'HAWT는 풍향에 따라 방향 조절이 필요하나 효율이 높고, VAWT는 풍향에 무관하나 효율이 낮다.', explanation: 'HAWT: 대형 발전용, VAWT(다리우스, 사보니우스): 소형, 도심형' },
      { id: 6, question: '풍력터빈의 정격 풍속과 컷인/컷아웃 풍속의 의미를 설명하시오.', answer: '정격풍속은 정격출력 도달 풍속, 컷인은 발전 시작 풍속(3-4m/s), 컷아웃은 안전을 위한 정지 풍속(25m/s)이다.', explanation: '컷아웃 풍속 이상에서는 터빈 보호를 위해 자동 정지' },
      { id: 7, question: '풍력발전의 설비이용률(Capacity Factor)이란?', answer: '설비이용률은 실제 발전량을 정격용량으로 연간 운전시 발전량으로 나눈 비율이다.', explanation: '국내 육상풍력 약 20-25%, 해상풍력 약 30-40%' }
    ],
    1: [
      { id: 8, question: '풍력터빈 블레이드에 작용하는 양력과 항력의 관계를 설명하시오.', answer: '양력은 블레이드에 수직으로, 항력은 바람 방향으로 작용하며, 양항비(L/D)가 클수록 효율적이다.', explanation: '현대 블레이드는 양항비 100:1 이상을 목표로 설계' },
      { id: 9, question: '블레이드의 받음각(Angle of Attack)과 피치각의 관계를 설명하시오.', answer: '받음각은 상대풍과 시위선의 각도이며, 피치각 조절로 받음각을 제어하여 출력을 조정한다.', explanation: '받음각이 너무 크면 실속(stall) 발생' },
      { id: 10, question: '블레이드 실속(Stall) 현상과 발생 원인을 설명하시오.', answer: '실속은 받음각이 임계각을 넘어 양력이 급격히 감소하고 항력이 증가하는 현상이다.', explanation: '능동 실속제어(Active Stall) 터빈에서는 의도적으로 활용' },
      { id: 11, question: '블레이드의 팁 속도비(Tip Speed Ratio, TSR)란 무엇인가?', answer: 'TSR은 블레이드 팁 속도를 바람 속도로 나눈 값으로, 최적 TSR에서 최대 효율을 얻는다.', explanation: 'TSR = ωR/V, 3엽 터빈의 최적 TSR은 6-8 정도' },
      { id: 12, question: '블레이드 수에 따른 풍력터빈의 특성 차이를 설명하시오.', answer: '블레이드 수가 많으면 토크는 크나 RPM이 낮고, 적으면 고속 회전에 유리하다.', explanation: '발전용 대형터빈은 대부분 3엽, 양수용은 다엽' },
      { id: 13, question: '풍력터빈의 추력(Thrust)과 구조 설계의 관계를 설명하시오.', answer: '추력은 로터에 작용하는 축방향 힘으로, 타워와 기초 설계의 핵심 하중이다.', explanation: '추력계수(CT)는 TSR에 따라 변화' },
      { id: 14, question: '블레이드의 비틀림(Twist) 설계 이유를 설명하시오.', answer: '반경 위치에 따라 상대풍 각도가 달라지므로, 각 단면에서 최적 받음각을 유지하기 위함이다.', explanation: '허브 쪽은 큰 피치각, 팁 쪽은 작은 피치각' }
    ],
    2: [
      { id: 15, question: '풍황 분석(Wind Resource Assessment)의 목적과 주요 항목을 설명하시오.', answer: '풍력발전 사업성 평가를 위해 풍속, 풍향, 난류강도, 바람 에너지 밀도 등을 측정 분석한다.', explanation: '최소 1년 이상의 장기 데이터 수집 필요' },
      { id: 16, question: '바람 장미(Wind Rose)의 용도와 해석 방법을 설명하시오.', answer: '바람 장미는 방향별 풍속 빈도를 나타내며, 터빈 배치와 방향 설정에 활용한다.', explanation: '16방위 또는 12방위로 표시, 주풍향 파악' },
      { id: 17, question: '풍력 밀도(Wind Power Density)의 계산과 활용을 설명하시오.', answer: '풍력 밀도 = ½ρV³ (W/m²), 사이트의 풍력 자원 등급 판정에 사용된다.', explanation: 'Class 1(400W/m² 이상)이 우수한 풍력 자원' },
      { id: 18, question: '대기 안정도가 풍력발전에 미치는 영향을 설명하시오.', answer: '불안정 대기는 난류가 크고, 안정 대기는 풍속의 연직 변화(wind shear)가 크다.', explanation: '야간은 안정, 주간은 불안정 대기 경향' },
      { id: 19, question: '지표 거칠기(Surface Roughness)와 풍속 분포의 관계를 설명하시오.', answer: '거칠기가 클수록 지표 부근 풍속이 감소하고, 높이에 따른 풍속 증가율이 커진다.', explanation: '거칠기 길이 z0: 해상 0.0002m, 도시 0.5-1m' },
      { id: 20, question: '연직 풍속 분포를 계산하는 멱법칙(Power Law)을 설명하시오.', answer: 'V2/V1 = (z2/z1)^α, 여기서 α는 지표 거칠기와 대기 안정도에 따른 지수이다.', explanation: '일반적으로 α = 1/7(0.143) 사용' },
      { id: 21, question: '측풍탑(Met Mast) 설치와 측정 기준을 설명하시오.', answer: '허브 높이에서 최소 1년간 풍속, 풍향, 온도, 기압 등을 측정한다.', explanation: 'IEC 61400-12에 따른 측정 기준 적용' }
    ],
    3: [
      { id: 22, question: '바이블 분포(Weibull Distribution)의 매개변수와 의미를 설명하시오.', answer: '형상계수 k는 분포 형태를, 척도계수 c는 평균풍속 수준을 나타낸다.', explanation: 'k≈2일 때 레일리 분포와 유사' },
      { id: 23, question: '레일리 분포(Rayleigh Distribution)와 풍속 분포의 관계를 설명하시오.', answer: '레일리 분포는 k=2인 바이블 분포의 특수한 경우로, 평균풍속만으로 분포를 추정한다.', explanation: '예비 분석이나 간이 계산에 주로 사용' },
      { id: 24, question: '풍속의 난류강도(Turbulence Intensity)의 정의와 영향을 설명하시오.', answer: '난류강도 = 풍속 표준편차/평균풍속, 높은 난류는 터빈 피로하중을 증가시킨다.', explanation: 'IEC 등급: A(높음), B(중간), C(낮음)' },
      { id: 25, question: '계절별/시간대별 풍속 변동 특성을 설명하시오.', answer: '일반적으로 봄철 강풍, 야간 안정 대기로 인한 풍속 변동이 특징적이다.', explanation: '일변화: 오후 풍속 증가, 새벽 감소 경향' },
      { id: 26, question: '극치풍속(Extreme Wind Speed) 분석의 목적과 방법을 설명하시오.', answer: '50년 재현주기 극치풍속을 산정하여 터빈 구조 설계에 적용한다.', explanation: 'Gumbel 분포 등 극치통계 분석 활용' },
      { id: 27, question: '풍속 빈도 분포를 활용한 연간 발전량 예측 방법을 설명하시오.', answer: '풍속 빈도 분포와 터빈 출력곡선을 결합하여 연간 에너지 생산량(AEP)을 계산한다.', explanation: 'AEP = Σ(출력(V) × 빈도(V) × 8760시간)' },
      { id: 28, question: '장기 풍황 데이터 보정(MCP: Measure-Correlate-Predict)을 설명하시오.', answer: '단기 측정 데이터를 장기 기준 데이터와 상관분석하여 장기 풍황을 예측한다.', explanation: '최소 10년 이상의 기준 데이터 활용' }
    ],
    4: [
      { id: 29, question: '풍력터빈의 주요 구성요소와 기능을 설명하시오.', answer: '로터(블레이드, 허브), 나셀(발전기, 기어박스), 타워, 기초로 구성된다.', explanation: '최근 대형화로 직접구동(Direct Drive) 방식 증가' },
      { id: 30, question: '기어박스형과 직접구동형 풍력터빈의 장단점을 비교하시오.', answer: '기어박스형은 발전기가 작으나 유지보수 필요, 직접구동형은 기어박스 없어 신뢰성 높다.', explanation: '해상풍력은 유지보수 비용 고려 직접구동 선호' },
      { id: 31, question: '풍력터빈 블레이드의 재료와 제조 방법을 설명하시오.', answer: '유리섬유 또는 탄소섬유 강화 복합재료(GFRP/CFRP)를 사용하며, 진공주입 성형법으로 제작한다.', explanation: '100m급 블레이드는 탄소섬유 보강 필수' },
      { id: 32, question: '풍력터빈 타워의 종류와 특징을 설명하시오.', answer: '강관형(Tubular Steel), 콘크리트형, 하이브리드형이 있으며, 높이에 따라 선정한다.', explanation: '100m 이상 높이는 하이브리드 타워 적용 증가' },
      { id: 33, question: '나셀(Nacelle) 내부의 주요 장비와 배치를 설명하시오.', answer: '저속축, 기어박스, 고속축, 발전기, 브레이크, 요시스템, 제어반이 배치된다.', explanation: '나셀 후방에 변압기를 설치하기도 함' },
      { id: 34, question: '허브(Hub)의 구조와 피치 시스템의 원리를 설명하시오.', answer: '허브는 블레이드를 연결하며, 내부 피치 베어링과 액추에이터로 블레이드 각도를 제어한다.', explanation: '유압식 또는 전동식 피치 시스템' },
      { id: 35, question: '풍력터빈 요 시스템(Yaw System)의 기능과 구성을 설명하시오.', answer: '요 시스템은 나셀을 풍향에 맞게 회전시키며, 요 모터, 요 베어링, 요 브레이크로 구성된다.', explanation: '케이블 꼬임 방지를 위한 요 카운터 필요' }
    ],
    5: [
      { id: 36, question: '피치 제어(Pitch Control) 방식의 원리와 장점을 설명하시오.', answer: '블레이드 피치각을 조절하여 출력을 제어하며, 정격풍속 이상에서도 안정적 발전이 가능하다.', explanation: '능동형 제어로 부드러운 출력 조절' },
      { id: 37, question: '실속 제어(Stall Control) 방식의 원리와 특징을 설명하시오.', answer: '블레이드 형상에 의해 고풍속에서 자연 실속이 발생하여 출력을 제한한다.', explanation: '고정 피치로 구조가 단순하나 효율 낮음' },
      { id: 38, question: '풍력터빈의 MPPT(Maximum Power Point Tracking) 제어를 설명하시오.', answer: '가변속 운전으로 모든 풍속에서 최적 TSR을 유지하여 최대 출력을 추출한다.', explanation: '발전기 토크 제어를 통해 구현' },
      { id: 39, question: '풍력터빈의 비상정지 시스템을 설명하시오.', answer: '피치 페더링, 기계 브레이크, 요 브레이크를 통해 긴급 정지한다.', explanation: '배터리 백업으로 정전시에도 작동 보장' },
      { id: 40, question: '풍력터빈 SCADA 시스템의 기능을 설명하시오.', answer: 'SCADA는 터빈 상태 모니터링, 원격 제어, 데이터 수집 및 분석을 수행한다.', explanation: '예지정비를 위한 CMS 연계 확대' },
      { id: 41, question: '가변속 발전시스템의 장점을 설명하시오.', answer: '풍속 변화에 따라 회전수를 조절하여 효율을 높이고, 기계적 스트레스를 줄인다.', explanation: 'DFIG, PMSG 모두 가변속 운전' },
      { id: 42, question: '풍력터빈 상태감시(CMS: Condition Monitoring System)의 역할을 설명하시오.', answer: 'CMS는 진동, 온도, 오일 상태 등을 모니터링하여 고장을 조기 감지한다.', explanation: '베어링, 기어박스 고장 예측에 효과적' }
    ],
    6: [
      { id: 43, question: '풍력터빈 출력곡선(Power Curve)의 의미와 특성을 설명하시오.', answer: '출력곡선은 풍속별 발전출력을 나타내며, 컷인-정격-컷아웃 구간으로 구분된다.', explanation: 'IEC 61400-12-1에 따라 측정 검증' },
      { id: 44, question: '연간 에너지 생산량(AEP) 계산 방법을 설명하시오.', answer: 'AEP = Σ(출력곡선값 × 풍속빈도 × 8760시간) - 손실', explanation: '가용률, 어레이 손실 등 반영' },
      { id: 45, question: '풍력터빈의 주요 에너지 손실 요인을 설명하시오.', answer: '어레이 손실(후류), 전기적 손실, 가용률 손실, 환경 손실 등이 있다.', explanation: '총 손실은 일반적으로 15-25%' },
      { id: 46, question: '후류 효과(Wake Effect)와 터빈 배치의 관계를 설명하시오.', answer: '앞 터빈의 후류로 뒤 터빈 풍속이 감소하므로, 적정 이격거리 확보가 필요하다.', explanation: '주풍향 5-10D, 직각방향 3-5D 이격' },
      { id: 47, question: '풍력발전의 용량계수(Capacity Factor)를 설명하시오.', answer: '용량계수 = 실제발전량 / (정격용량 × 8760시간), 설비 효율성 지표이다.', explanation: '육상 20-30%, 해상 35-50%' },
      { id: 48, question: '풍력터빈의 가용률(Availability)과 영향 요인을 설명하시오.', answer: '가용률 = 운전가능시간 / 총시간, 고장, 정비, 계통 문제 등이 영향을 미친다.', explanation: '목표 가용률 95% 이상' },
      { id: 49, question: '풍력발전 경제성 평가 지표(LCOE)를 설명하시오.', answer: 'LCOE(균등화발전비용) = 총비용의 현재가치 / 총발전량의 현재가치', explanation: '투자비, 운영비, 할인율, 발전량 반영' },
      { id: 50, question: '해상풍력과 육상풍력의 에너지 생산 특성을 비교하시오.', answer: '해상은 풍속이 높고 안정적이나, 설치·운영비용이 높아 대형화로 경제성 확보가 필요하다.', explanation: '해상풍력 설비이용률 35-50% (육상 대비 1.5배)' }
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
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-cyan-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link>
            <span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link>
            <span>/</span>
            <Link href="/category/mechanical/wind-power-engineer" className="hover:text-white">풍력발전설비기사</Link>
            <span>/</span>
            <Link href="/category/mechanical/wind-power-engineer/study" className="hover:text-white">학습</Link>
            <span>/</span>
            <span className="text-white">풍력발전시스템 이론</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🌬️ 풍력발전시스템 이론</h1>
          <p className="text-cyan-100">풍력 에너지 원리, 공기역학, 바람 자원 분석</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-cyan-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Topics Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">📚 학습 토픽</h3>
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setCurrentTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      currentTopic === topic.id
                        ? 'bg-cyan-500 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-medium text-gray-900">
                    <span className="text-cyan-500 font-bold">Q{q.id}.</span> {q.question}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAnswer(q.id)}
                    className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm"
                  >
                    {showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}
                  </button>
                  <button
                    onClick={() => openAIModal(q.question)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    🤖 AI에게 질문
                  </button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-cyan-50 rounded-lg">
                      <p className="font-medium text-cyan-900">✅ 정답</p>
                      <p className="text-cyan-800 mt-1">{q.answer}</p>
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

      {/* AI Modal */}
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
