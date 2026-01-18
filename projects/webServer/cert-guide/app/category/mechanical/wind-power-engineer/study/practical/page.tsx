'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PracticalStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '설계계산', icon: '📐' },
    { id: 1, name: '도면해석', icon: '📋' },
    { id: 2, name: '측정시험', icon: '📊' },
    { id: 3, name: '고장진단', icon: '🔍' },
    { id: 4, name: '유지보수', icon: '🔧' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: '풍력 에너지 밀도를 계산하시오. (조건: 공기밀도 1.225kg/m³, 풍속 10m/s)', answer: 'P = ½ρV³ = 0.5 × 1.225 × 10³ = 612.5 W/m²', explanation: '풍력 에너지 밀도는 풍속의 세제곱에 비례' },
      { id: 2, question: '연간 에너지 생산량(AEP)을 계산하시오. (조건: 정격 2MW, 용량계수 28%)', answer: 'AEP = 2,000kW × 8,760시간 × 0.28 = 4,905,600 kWh/년 ≈ 4,906 MWh/년', explanation: '용량계수 = 실제발전량/이론최대발전량' },
      { id: 3, question: '터빈 추력을 계산하시오. (조건: 로터 직경 100m, 풍속 12m/s, 추력계수 0.8)', answer: 'A = π×50² = 7,854m², T = ½×1.225×7,854×12²×0.8 = 552,870N ≈ 553kN', explanation: 'T = ½ρAV²Ct' },
      { id: 4, question: '팁 속도비(TSR)를 계산하시오. (조건: 블레이드 길이 50m, 회전수 15rpm, 풍속 10m/s)', answer: 'ω = 15×2π/60 = 1.57rad/s, TSR = ωR/V = 1.57×50/10 = 7.85', explanation: '3엽 터빈 최적 TSR은 6-8' },
      { id: 5, question: '케이블 허용전류 계산 조건을 설명하고 단면적을 결정하시오.', answer: '부하전류의 1.25배 이상을 허용전류로 선정하고, 온도, 매설조건 보정을 적용한다.', explanation: '전압강하 3% 이내 확인' }
    ],
    1: [
      { id: 6, question: '풍력발전 단선결선도(SLD)의 주요 구성요소를 설명하시오.', answer: '발전기, 변압기, 차단기, 단로기, 피뢰기, 계기용변성기(PT/CT), 보호계전기가 포함된다.', explanation: '전력 흐름과 보호체계 표시' },
      { id: 7, question: '계통연계 도면에서 보호협조 관계를 해석하시오.', answer: '터빈 보호 → 집전계통 보호 → 연계점 보호 순서로 시간 협조되어 고장구간만 분리한다.', explanation: '상위-하위 계전기 정정 시간차' },
      { id: 8, question: '터빈 배치도에서 이격거리 적정성을 판단하시오.', answer: '주풍향 5-10D, 직각방향 3-5D 이격을 확인하고 후류 손실을 검토한다.', explanation: 'D: 로터 직경 기준' },
      { id: 9, question: '접지계통도 해석 시 확인해야 할 사항을 설명하시오.', answer: '접지극 배치, 본딩 연결, 접지저항, 등전위 영역을 확인한다.', explanation: '낙뢰 전류 경로 확인' },
      { id: 10, question: '케이블 루트도 검토 시 확인사항을 설명하시오.', answer: '케이블 종류, 굵기, 경로, 이격거리, 접속함 위치, 매설깊이를 확인한다.', explanation: '도면과 현장 일치 확인' }
    ],
    2: [
      { id: 11, question: '풍속 측정 장비와 방법을 설명하시오.', answer: '컵형/초음파 풍속계로 10분 평균 풍속을 측정하고, 허브 높이에서 최소 1년간 데이터를 수집한다.', explanation: 'IEC 61400-12 기준 적용' },
      { id: 12, question: '출력곡선 측정 절차를 설명하시오.', answer: '풍속-출력 쌍 데이터를 수집하여 빈 평균법으로 출력곡선을 작성한다.', explanation: '최소 180시간 이상 유효 데이터' },
      { id: 13, question: '전력품질 측정 항목과 기준을 설명하시오.', answer: '전압, 주파수, 고조파(THD 5% 이하), 플리커, 역률을 측정한다.', explanation: 'IEC 61400-21 기준' },
      { id: 14, question: '진동 측정 및 분석 방법을 설명하시오.', answer: '주요 베어링, 기어박스, 발전기의 진동을 측정하고 주파수 분석(FFT)으로 이상을 진단한다.', explanation: 'ISO 10816 기준 진동 등급' },
      { id: 15, question: '절연저항 측정 방법과 판정 기준을 설명하시오.', answer: '500V/1000V 메거로 측정하며, 고압회로는 1MΩ 이상을 만족해야 한다.', explanation: '온도, 습도 영향 고려' }
    ],
    3: [
      { id: 16, question: 'SCADA 데이터를 활용한 고장 진단 방법을 설명하시오.', answer: '출력, 풍속, 온도, 진동 트렌드를 분석하여 이상 징후를 조기 감지한다.', explanation: '정상 패턴과 비교 분석' },
      { id: 17, question: '발전기 고장 유형과 진단 방법을 설명하시오.', answer: '권선 절연불량(절연저항), 베어링 이상(진동), 냉각계통 이상(온도)을 점검한다.', explanation: '온라인/오프라인 진단' },
      { id: 18, question: '기어박스 고장 징후와 진단 방법을 설명하시오.', answer: '진동 증가, 오일 오염, 이상 소음이 발생하며 오일 분석과 진동 분석으로 진단한다.', explanation: '금속 입자 분석(Ferrography)' },
      { id: 19, question: '블레이드 손상 유형과 점검 방법을 설명하시오.', answer: '크랙, 침식, 낙뢰손상이 있으며 육안, 드론, 초음파 검사로 점검한다.', explanation: '정기 외관검사 필수' },
      { id: 20, question: '전력변환장치 고장 진단 방법을 설명하시오.', answer: 'IGBT 상태, DC링크 전압, 냉각계통, 게이트 드라이버를 점검한다.', explanation: '열화상 카메라 활용' }
    ],
    4: [
      { id: 21, question: '풍력터빈 예방정비 체계를 수립하시오.', answer: '일상점검(일/주), 정기점검(월/분기), 정밀점검(연간), 법정검사로 구성한다.', explanation: '제조사 권장 주기 준수' },
      { id: 22, question: '오일 교환 주기와 방법을 설명하시오.', answer: '기어박스 오일은 초기 6개월 후 교환, 이후 오일분석 결과에 따라 3-5년 주기로 교환한다.', explanation: '오일 분석 정기 실시' },
      { id: 23, question: '볼트 재체결 점검 방법을 설명하시오.', answer: '토크렌치로 규정 토크 확인, 마킹 이탈 여부 점검, 필요시 재체결한다.', explanation: '타워 플랜지 볼트 중요' },
      { id: 24, question: '블레이드 정비 항목을 설명하시오.', answer: '리딩에지 침식 보수, 균열 보수, 낙뢰 리셉터 점검, 밸런싱을 수행한다.', explanation: '고소작업 안전 확보' },
      { id: 25, question: '대정비(Overhaul) 계획을 수립하시오.', answer: '10-15년 주기로 기어박스, 발전기, 블레이드 등 주요 부품 교체/재생을 계획한다.', explanation: '수명연장 효과' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`풍력발전설비기사 실기시험 관련 질문입니다:\n\n${question}\n\n이 문제에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-red-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/mechanical" className="hover:text-white">기계·전기·전자</Link><span>/</span>
            <Link href="/category/mechanical/wind-power-engineer" className="hover:text-white">풍력발전설비기사</Link><span>/</span>
            <Link href="/category/mechanical/wind-power-engineer/study" className="hover:text-white">학습</Link><span>/</span>
            <span className="text-white">실기시험</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">✍️ 실기시험</h1>
          <p className="text-red-100">설계계산, 도면해석, 측정시험, 고장진단, 유지보수</p>
          <div className="mt-4 bg-white/20 rounded-full h-2 w-full max-w-md">
            <div className="bg-white rounded-full h-2 transition-all" style={{width: `${progress}%`}}></div>
          </div>
          <p className="text-red-100 text-sm mt-2">{completedQuestions.size}/{totalQuestions} 완료 ({Math.round(progress)}%)</p>
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
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentTopic === topic.id ? 'bg-red-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
                    {topic.icon} {topic.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {currentQuestions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-medium text-gray-900 mb-4"><span className="text-red-500 font-bold">Q{q.id}.</span> {q.question}</h3>
                <div className="flex gap-2">
                  <button onClick={() => toggleAnswer(q.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">{showAnswer[q.id] ? '답안 숨기기' : '답안 보기'}</button>
                  <button onClick={() => openAIModal(q.question)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">🤖 AI에게 질문</button>
                </div>
                {showAnswer[q.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="p-4 bg-red-50 rounded-lg"><p className="font-medium text-red-900">✅ 정답</p><p className="text-red-800 mt-1">{q.answer}</p></div>
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
