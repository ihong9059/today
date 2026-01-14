'use client';

import { useState, useEffect } from 'react';

export default function PracticalStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const subject = { name: '실기 대비', icon: '✍️', description: '설계계산, 측정실습, 도면작성 등 실기시험 대비 핵심 문제' };

  const topics = [
    {
      id: 1, name: '설계 계산',
      questions: [
        { id: 1, question: '100kW 태양광 발전소의 연간 발전량을 계산하시오. (일사량 3.5kWh/m²/일, PR 0.8)', answer: '100kW × 3.5h × 365 × 0.8 = 102,200 kWh/년', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 100kW 태양광 발전소의 연간 발전량을 계산하시오.\n조건: 일사량 3.5kWh/m²/일, PR 0.8\n\n다음 순서로 설명해주세요:\n1. 계산 공식\n2. 단계별 계산\n3. 최종 답\n4. 관련 개념\n5. 유사 문제 3개' },
        { id: 2, question: '500Wp 모듈 20개로 스트링 구성 시, 인버터 MPPT 범위(200-600V) 적합 여부를 판단하시오. (Vmpp=40V, 온도계수 -0.35%/℃)', answer: '최고온도 70℃: 40×(1-0.35%×45)×20 = 674V → 범위 초과', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 스트링 전압 범위 적합성을 판단하시오.\n조건: 500Wp 모듈, Vmpp=40V, 온도계수 -0.35%/℃, 인버터 MPPT 200-600V\n\n다음 순서로 설명해주세요:\n1. 최고/최저 온도 조건\n2. 전압 보정 계산\n3. 적합성 판단\n4. 적정 모듈 수 제안\n5. 유사 문제 3개' },
        { id: 3, question: '50kW 태양광 설비의 DC 케이블 굵기를 선정하시오. (거리 100m, 전압강하 2% 이내, DC 600V)', answer: 'I=50000/600=83.3A, Vd≤12V, A=2×83.3×100×0.0175/12=24.3mm² → 35mm² 선정', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: DC 케이블 굵기를 선정하시오.\n조건: 50kW, 거리 100m, 전압강하 2% 이내, DC 600V\n\n다음 순서로 설명해주세요:\n1. 전류 계산\n2. 전압강하 계산\n3. 단면적 계산\n4. 케이블 선정\n5. 유사 문제 3개' },
        { id: 4, question: '경사각 30°, 모듈 높이 2m일 때 동지 기준 이격거리를 계산하시오. (위도 36°)', answer: '고도각=90-36-23.5=30.5°, D=2×sin30°/tan30.5°=1.7m', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 동지 기준 이격거리를 계산하시오.\n조건: 경사각 30°, 모듈 높이 2m, 위도 36°\n\n다음 순서로 설명해주세요:\n1. 고도각 계산\n2. 그림자 길이 계산\n3. 이격거리 산정\n4. 설계 적용\n5. 유사 문제 3개' },
        { id: 5, question: '1MW 발전소의 REC 수익을 계산하시오. (발전량 1,200MWh/년, REC 가중치 1.2, REC 가격 50,000원)', answer: '1,200 × 1.2 × 50,000 = 72,000,000원/년', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: REC 수익을 계산하시오.\n조건: 1MW, 발전량 1,200MWh/년, 가중치 1.2, REC 가격 50,000원\n\n다음 순서로 설명해주세요:\n1. REC 발급량 계산\n2. 수익 계산\n3. SMP 수익 추가\n4. 총 수익 분석\n5. 유사 문제 3개' },
        { id: 6, question: 'LCOE를 계산하시오. (초기투자 1억원, 연간운영비 200만원, 연간발전량 12만kWh, 수명 20년)', answer: 'LCOE = (100,000,000 + 2,000,000×20) / (120,000×20) = 58.3원/kWh', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: LCOE를 계산하시오.\n조건: 초기투자 1억원, 연간운영비 200만원, 발전량 12만kWh/년, 수명 20년\n\n다음 순서로 설명해주세요:\n1. 총 비용 계산\n2. 총 발전량 계산\n3. LCOE 계산\n4. 경제성 평가\n5. 유사 문제 3개' },
      ],
    },
    {
      id: 2, name: '측정 및 시험',
      questions: [
        { id: 7, question: '절연저항 측정 방법과 판정 기준을 설명하시오.', answer: 'DC측: 500V 메거, 1MΩ 이상 / AC측: 500V 메거, 0.1MΩ 이상', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 절연저항 측정 방법과 판정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 장비\n2. 측정 절차\n3. 판정 기준\n4. 불량 시 조치\n5. 유사 문제 3개' },
        { id: 8, question: '접지저항 측정 방법(3전극법)을 설명하시오.', answer: '접지극-보조전극1(10m)-보조전극2(20m) 일직선 배치, 저항값 측정', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 접지저항 측정 방법(3전극법)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 원리\n2. 전극 배치\n3. 측정 절차\n4. 결과 해석\n5. 유사 문제 3개' },
        { id: 9, question: 'I-V 특성 측정 방법과 결과 분석을 설명하시오.', answer: 'I-V 트레이서 사용, STC 보정, Voc/Isc/Pmax/FF 확인', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: I-V 특성 측정 방법과 결과 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 장비\n2. 측정 절차\n3. 결과 분석\n4. 이상 판정\n5. 유사 문제 3개' },
        { id: 10, question: '개방전압(Voc) 측정값이 이론값보다 낮은 원인을 분석하시오.', answer: '고온, 음영, 셀 불량, 배선 불량, 바이패스다이오드 동작', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 개방전압이 낮은 원인을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 정상 Voc 계산\n2. 저하 원인\n3. 진단 방법\n4. 조치 방안\n5. 유사 문제 3개' },
        { id: 11, question: '열화상 카메라를 이용한 핫스팟 진단 방법을 설명하시오.', answer: '부하상태 촬영, 10℃ 이상 온도차 핫스팟 판정, 원인 분석', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 열화상 카메라를 이용한 핫스팟 진단 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 촬영 조건\n2. 분석 방법\n3. 판정 기준\n4. 조치 방안\n5. 유사 문제 3개' },
        { id: 12, question: '인버터 효율 측정 방법을 설명하시오.', answer: 'DC 입력전력, AC 출력전력 측정, 효율 = Pac/Pdc × 100%', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 인버터 효율 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 측정 장비\n2. 측정 절차\n3. 효율 계산\n4. 결과 분석\n5. 유사 문제 3개' },
      ],
    },
    {
      id: 3, name: '도면 및 문서',
      questions: [
        { id: 13, question: '단선결선도에 포함해야 할 요소를 나열하시오.', answer: 'PV어레이, 접속함, 인버터, 분전반, 차단기, 계량기, 접지', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 단선결선도에 포함해야 할 요소를 나열하시오.\n\n다음 순서로 설명해주세요:\n1. 구성 요소\n2. 기호 표기\n3. 연결 순서\n4. 작성 요령\n5. 유사 문제 3개' },
        { id: 14, question: '어레이 배치도 작성 시 표기해야 할 항목을 설명하시오.', answer: '모듈 배치, 방위각, 경사각, 이격거리, 접속함 위치', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 어레이 배치도 작성 시 표기 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표기 항목\n2. 작성 방법\n3. 축척 표시\n4. 주의사항\n5. 유사 문제 3개' },
        { id: 15, question: '전기계산서에 포함해야 할 계산 항목을 설명하시오.', answer: '스트링 구성, 케이블 선정, 전압강하, 차단기 용량, 접지', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 전기계산서에 포함해야 할 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계산 항목\n2. 계산 공식\n3. 작성 양식\n4. 검증 방법\n5. 유사 문제 3개' },
        { id: 16, question: '시운전 체크리스트 항목을 작성하시오.', answer: '육안검사, 극성확인, 절연측정, 접지측정, 전압확인, 출력확인', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 시운전 체크리스트 항목을 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 항목\n2. 점검 순서\n3. 판정 기준\n4. 기록 방법\n5. 유사 문제 3개' },
      ],
    },
    {
      id: 4, name: '고장 진단 및 조치',
      questions: [
        { id: 17, question: '발전량이 급감한 경우 원인 분석 및 조치 방법을 설명하시오.', answer: '모듈오염, 음영, 인버터고장, 배선불량 순으로 점검', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 발전량 급감 원인 분석 및 조치 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원인 분류\n2. 진단 순서\n3. 조치 방법\n4. 예방 대책\n5. 유사 문제 3개' },
        { id: 18, question: '인버터 에러 발생 시 조치 방법을 설명하시오.', answer: '에러코드 확인, 원인분석, 리셋, 부품교체, 제조사 연락', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 인버터 에러 발생 시 조치 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 에러 확인\n2. 원인 분석\n3. 조치 순서\n4. 예방 관리\n5. 유사 문제 3개' },
        { id: 19, question: '접지 불량 시 원인과 조치 방법을 설명하시오.', answer: '접지선 단선, 접속불량, 부식 확인 후 재시공', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 접지 불량 시 원인과 조치 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불량 원인\n2. 진단 방법\n3. 조치 절차\n4. 예방 대책\n5. 유사 문제 3개' },
        { id: 20, question: '계통연계 트립 발생 시 원인 분석을 설명하시오.', answer: '과전압/저전압, 주파수이탈, 단독운전, 계통이상', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 계통연계 트립 발생 시 원인 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 트립 원인\n2. 로그 분석\n3. 조치 방법\n4. 재발 방지\n5. 유사 문제 3개' },
      ],
    },
    {
      id: 5, name: '안전 및 유지보수',
      questions: [
        { id: 21, question: '태양광 설비 점검 시 안전 수칙을 설명하시오.', answer: '활선작업 금지, 절연장갑, 차광, 고소작업 안전장비', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 태양광 설비 점검 시 안전 수칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기 안전\n2. 고소 작업\n3. 보호구 착용\n4. 비상 대응\n5. 유사 문제 3개' },
        { id: 22, question: '모듈 세정 작업 시 주의사항을 설명하시오.', answer: '저압 물세척, 세제 주의, 고온 시 피하기, 흠집 방지', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 모듈 세정 작업 시 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세정 방법\n2. 세정 시기\n3. 주의사항\n4. 효과 확인\n5. 유사 문제 3개' },
        { id: 23, question: '정기점검 항목과 주기를 작성하시오.', answer: '일상: 육안, 월간: 청소/점검, 연간: 정밀점검/측정', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 정기점검 항목과 주기를 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 종류\n2. 점검 항목\n3. 점검 주기\n4. 기록 관리\n5. 유사 문제 3개' },
        { id: 24, question: '화재 발생 시 대응 절차를 설명하시오.', answer: '전원차단, 119신고, 대피, 소화, DC전압 주의', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 화재 발생 시 대응 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 대응\n2. 신고 절차\n3. 진압 방법\n4. 사후 조치\n5. 유사 문제 3개' },
        { id: 25, question: '성능저하 분석 보고서 작성 항목을 설명하시오.', answer: '발전량 분석, 원인 조사, 조치 내용, 개선 방안', prompt: '태양광발전설비기사 실기 시험 준비 중입니다.\n\n문제: 성능저하 분석 보고서 작성 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보고서 구성\n2. 분석 방법\n3. 원인 규명\n4. 개선 제안\n5. 유사 문제 3개' },
      ],
    },
  ];

  useEffect(() => { const saved = localStorage.getItem('solar-practical-completed'); if (saved) setCompletedQuestions(JSON.parse(saved)); }, []);
  const toggleComplete = (id: number) => { const updated = completedQuestions.includes(id) ? completedQuestions.filter((q) => q !== id) : [...completedQuestions, id]; setCompletedQuestions(updated); localStorage.setItem('solar-practical-completed', JSON.stringify(updated)); };
  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50"><div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between"><a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a><nav className="flex items-center gap-2 text-sm"><a href="/" className="text-gray-600 hover:text-purple-600">홈</a><span className="text-gray-300">›</span><a href="/category/mechanical/solar-power-engineer" className="text-gray-600 hover:text-purple-600">태양광발전설비기사</a><span className="text-gray-300">›</span><span className="text-purple-600 font-medium">{subject.name}</span></nav></div></header>

      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-8"><div className="max-w-6xl mx-auto px-4"><div className="flex items-center gap-4 mb-4"><span className="text-4xl">{subject.icon}</span><div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-purple-100">{subject.description}</p></div></div><div className="bg-white/20 rounded-lg p-4"><div className="flex justify-between text-sm mb-2"><span>진행률</span><span>{completedQuestions.length}/{totalQuestions} ({progress}%)</span></div><div className="h-3 bg-white/30 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }}></div></div></div></div></section>

      <main className="max-w-6xl mx-auto px-4 py-8"><div className="space-y-4">{topics.map((topic, tIdx) => (<div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden"><button onClick={() => setExpandedTopics(expandedTopics.includes(tIdx) ? expandedTopics.filter((t) => t !== tIdx) : [...expandedTopics, tIdx])} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"><div className="flex items-center gap-3"><span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">{tIdx + 1}</span><span className="font-bold text-gray-800">{topic.name}</span><span className="text-sm text-gray-500">({topic.questions.length}문항)</span></div><span className={`transform transition ${expandedTopics.includes(tIdx) ? 'rotate-180' : ''}`}>▼</span></button>{expandedTopics.includes(tIdx) && (<div className="px-6 pb-6 space-y-3">{topic.questions.map((q) => (<div key={q.id} className={`border rounded-lg p-4 ${completedQuestions.includes(q.id) ? 'bg-green-50 border-green-300' : 'border-gray-200'}`}><div className="flex items-start gap-3"><button onClick={() => toggleComplete(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${completedQuestions.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions.includes(q.id) && '✓'}</button><div className="flex-1"><p className="text-gray-800 font-medium">Q{q.id}. {q.question}</p><p className="text-sm text-purple-700 mt-2 bg-purple-50 p-2 rounded">💡 {q.answer}</p><button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition">🤖 AI에게 질문</button></div></div></div>))}</div>)}</div>))}</div></main>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
