'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PlantDesignStudyPage() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<{[key: number]: boolean}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());

  const topics = [
    { id: 0, name: '공정도 기초', icon: '📋' },
    { id: 1, name: 'P&ID', icon: '🔧' },
    { id: 2, name: '배관설계', icon: '🔩' },
    { id: 3, name: '장치설계', icon: '⚙️' },
    { id: 4, name: '안전설계', icon: '⚠️' },
    { id: 5, name: '경제성평가', icon: '💰' }
  ];

  const questions: {[key: number]: Array<{id: number; question: string; answer: string; explanation: string}>} = {
    0: [
      { id: 1, question: 'PFD(공정흐름도)에 포함되는 정보는?', answer: '주요장치, 물질흐름, 운전조건(온도, 압력, 유량), 에너지수지', explanation: '개념설계 단계 도면' },
      { id: 2, question: 'BFD(블록흐름도)의 용도는?', answer: '공정 전체 개요 파악, 주요 단위공정 연결 표시', explanation: '가장 상위 수준 도면' },
      { id: 3, question: '물질수지의 기본 원리는?', answer: '유입량 = 유출량 + 축적량, 정상상태에서 축적=0', explanation: '질량보존법칙 적용' },
      { id: 4, question: '에너지수지 계산시 고려사항은?', answer: '엔탈피 변화, 반응열, 열손실, 상변화열', explanation: '열교환기 설계 기초' }
    ],
    1: [
      { id: 5, question: 'P&ID에 표시되는 주요 정보는?', answer: '모든 장치, 배관, 계기, 밸브, 제어루프, 유틸리티 연결', explanation: '상세설계 단계 도면' },
      { id: 6, question: '계장 기호에서 TIC의 의미는?', answer: 'Temperature Indicator Controller, 온도지시제어기', explanation: '첫글자: 측정변수, 뒤: 기능' },
      { id: 7, question: '밸브 종류와 용도를 설명하시오.', answer: '게이트(차단), 글로브(조절), 볼(차단), 체크(역류방지), 안전(과압방출)', explanation: '용도에 따라 선정' },
      { id: 8, question: '제어밸브 Cv값의 의미는?', answer: 'ΔP=1psi에서 물 유량(gpm), 밸브 용량 지표', explanation: '적정 Cv 선정 중요' },
      { id: 9, question: 'ISA 기호 체계에서 첫 번째 문자의 의미는?', answer: '측정변수: P(압력), T(온도), F(유량), L(레벨), A(분석)', explanation: '국제 표준 기호' }
    ],
    2: [
      { id: 10, question: '배관 재질 선정시 고려사항은?', answer: '유체특성, 온도, 압력, 부식성, 경제성', explanation: 'CS, SS, 특수합금 등' },
      { id: 11, question: '배관 스케줄 번호의 의미는?', answer: 'Sch = 1000×P/S, 높을수록 두꺼운 벽', explanation: 'Sch 40, 80, 160 등' },
      { id: 12, question: '배관 응력해석의 목적은?', answer: '열팽창, 자중, 압력에 의한 응력이 허용치 이내인지 확인', explanation: '유연성 확보 중요' },
      { id: 13, question: '플랜지 등급(Rating)의 의미는?', answer: 'Class 150, 300, 600 등 압력-온도 등급', explanation: '높은 등급=고압용' }
    ],
    3: [
      { id: 14, question: '압력용기 설계시 ASME 코드 적용은?', answer: 'ASME Section VIII, 최소두께, 용접부 강도 규정', explanation: '법적 요구사항' },
      { id: 15, question: '열교환기 TEMA 분류란?', answer: '전면헤드, 쉘, 후면헤드 타입으로 분류 (AES, BEM 등)', explanation: '용도별 선정 기준' },
      { id: 16, question: '펌프 선정시 고려사항은?', answer: '유량, 양정, NPSH, 유체특성, 효율', explanation: '원심펌프가 가장 일반적' },
      { id: 17, question: '압축기 종류별 특성은?', answer: '왕복동(고압), 원심(대용량), 축류(초대용량), 스크류(중용량)', explanation: '용량-압력비로 선정' }
    ],
    4: [
      { id: 18, question: 'HAZOP 분석 방법은?', answer: '가이드워드(No, More, Less 등)로 이탈 원인과 결과 분석', explanation: 'Hazard and Operability' },
      { id: 19, question: '안전밸브 설정압력 결정은?', answer: '설계압력의 110% 이하, MAWP 기준', explanation: '과압방지 최후수단' },
      { id: 20, question: '방폭지역 구분 기준은?', answer: 'Zone 0(상시), Zone 1(정상운전시), Zone 2(비정상시 가연성)', explanation: '전기설비 등급 결정' },
      { id: 21, question: '인터록(Interlock) 시스템의 역할은?', answer: '위험조건 감지시 자동 차단/조치로 사고 예방', explanation: 'SIS, ESD 시스템' }
    ],
    5: [
      { id: 22, question: '설비투자비(CAPEX) 추정방법은?', answer: '주요장비비×Lang factor, 상세견적, 모듈법', explanation: 'Lang factor: 3~6배' },
      { id: 23, question: '운전비(OPEX)에 포함되는 항목은?', answer: '원료비, 유틸리티비, 인건비, 유지보수비, 보험료', explanation: '연간 운영비용' },
      { id: 24, question: '순현재가치(NPV) 계산법은?', answer: 'NPV = Σ(CFt/(1+r)^t) - 초기투자비, NPV>0이면 투자가치', explanation: '할인율 r 적용' },
      { id: 25, question: '내부수익률(IRR)의 의미는?', answer: 'NPV=0이 되는 할인율, IRR>요구수익률이면 투자가치', explanation: '투자 수익성 지표' }
    ]
  };

  const currentQuestions = questions[currentTopic] || [];
  const toggleAnswer = (id: number) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
    if (!completedQuestions.has(id)) setCompletedQuestions(prev => new Set([...prev, id]));
  };
  const openAIModal = (question: string) => {
    setCurrentPrompt(`화공기사 화학공장설계 관련 질문입니다:\n\n${question}\n\n이에 대해 자세히 설명해주세요.`);
    setShowAIModal(true);
  };
  const totalQuestions = Object.values(questions).flat().length;
  const progress = (completedQuestions.size / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-teal-100 mb-4">
            <Link href="/" className="hover:text-white">홈</Link><span>/</span>
            <Link href="/category/chemistry" className="hover:text-white">화학·환경</Link><span>/</span>
            <Link href="/category/chemistry/chemical-engineer" className="hover:text-white">화공기사</Link><span>/</span>
            <span className="text-white">화학공장설계</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">🏭 화학공장설계</h1>
          <p className="text-teal-100">공정도, P&ID, 배관설계, 경제성평가</p>
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
