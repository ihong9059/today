'use client';

import { useState, useEffect } from 'react';

export default function PracticalStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('judicial-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('judicial-practical-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '부동산등기 서식 - 소유권',
      questions: [
        { id: 1, question: '매매로 인한 소유권이전등기 신청서 필수 기재사항은?', answer: '등기목적, 등기원인(매매 및 일자), 신청인(등기권리자·의무자), 부동산 표시, 첨부서면, 등록면허세' },
        { id: 2, question: '소유권이전등기 시 첨부서면은?', answer: '등기원인증명정보(매매계약서), 등기필정보, 인감증명서, 주민등록등본, 취득세영수필확인서' },
        { id: 3, question: '상속으로 인한 소유권이전등기 신청서 작성 시 특기사항은?', answer: '단독신청, 피상속인 표시(주소, 주민등록번호), 상속인 전원 기재, 지분 표시' },
        { id: 4, question: '상속등기 시 첨부서면은?', answer: '상속증명정보(제적등본, 가족관계증명서, 기본증명서), 상속인 인감증명서, 주민등록등본' },
        { id: 5, question: '협의분할에 의한 상속등기의 추가 서면은?', answer: '협의분할서 + 상속인 전원의 인감증명서 (협의분할서에 날인한 인감)' }
      ]
    },
    {
      name: '부동산등기 서식 - 담보권',
      questions: [
        { id: 6, question: '근저당권설정등기 신청서 필수 기재사항은?', answer: '등기목적(근저당권설정), 등기원인(근저당권설정계약), 채권최고액, 채무자, 근저당권자' },
        { id: 7, question: '근저당권설정등기 시 첨부서면은?', answer: '등기원인증명정보(설정계약서), 등기필정보, 인감증명서, 등록면허세영수필확인서' },
        { id: 8, question: '근저당권 채권최고액 변경등기 작성법은?', answer: '등기목적: 근저당권변경, 변경할 사항: 채권최고액 (금 ○○원을 금 ○○원으로)' },
        { id: 9, question: '저당권 이전등기(채권양도)의 기재사항은?', answer: '등기목적: 저당권이전, 등기원인: 채권양도 및 일자, 양수인(새 저당권자) 표시' },
        { id: 10, question: '근저당권 말소등기 신청서 작성은?', answer: '등기목적: 근저당권말소, 등기원인: 해지(또는 변제, 포기), 말소할 등기 표시' }
      ]
    },
    {
      name: '부동산등기 서식 - 기타',
      questions: [
        { id: 11, question: '소유권보존등기 신청서 작성법은?', answer: '단독신청, 등기목적: 소유권보존, 첨부: 토지(건물)대장, 주민등록등본' },
        { id: 12, question: '지상권설정등기 신청서 기재사항은?', answer: '등기목적: 지상권설정, 존속기간, 지료, 목적(건물 소유 등)' },
        { id: 13, question: '전세권설정등기 신청서 기재사항은?', answer: '등기목적: 전세권설정, 전세금, 존속기간, 전세권 범위(전부 또는 일부)' },
        { id: 14, question: '가등기 신청서 작성법은?', answer: '등기목적: 소유권이전청구권가등기, 등기원인: 매매예약, 가등기권리자·의무자' },
        { id: 15, question: '가등기에 기한 본등기 신청서는?', answer: '단독신청, 등기목적: 가등기에 기한 소유권이전, 가등기 표시 (순위번호)' }
      ]
    },
    {
      name: '상업등기 서식',
      questions: [
        { id: 16, question: '주식회사 설립등기 신청서 기재사항은?', answer: '상호, 목적, 본점, 자본금, 발행주식총수, 1주 금액, 이사·대표이사 표시' },
        { id: 17, question: '설립등기 시 첨부서면은?', answer: '정관, 주주총회의사록, 이사회의사록, 취임승낙서, 주금납입증명서, 인감신고서' },
        { id: 18, question: '이사 변경등기 신청서 작성법은?', answer: '등기사항: 이사 취임(또는 퇴임), 취임일자, 새 이사 성명·주민등록번호' },
        { id: 19, question: '대표이사 변경등기 시 첨부서면은?', answer: '이사회의사록, 취임승낙서, 인감증명서, 주민등록등본, 인감신고서' },
        { id: 20, question: '본점이전등기 신청서(관내 이전)는?', answer: '등기사항: 본점 이전, 구 본점 주소 → 신 본점 주소, 이사회의사록 첨부' }
      ]
    },
    {
      name: '2차 논술 핵심 쟁점',
      questions: [
        { id: 21, question: '부동산 이중매매와 등기 법리는?', answer: '제2매수인이 먼저 등기 시 소유권 취득. 제1매수인은 채권적 청구만 가능. 배임죄 문제 별도' },
        { id: 22, question: '명의신탁과 등기의 효력은?', answer: '부동산실명법상 무효. 다만 제3자 보호 규정에 의해 수탁자로부터 취득한 제3자는 보호' },
        { id: 23, question: '취득시효와 등기청구권은?', answer: '점유취득시효 완성 시 소유권이전등기청구권 취득. 원소유자에게 이전등기 청구' },
        { id: 24, question: '경매와 유치권의 관계는?', answer: '유치권은 매수인에게 대항 가능(인수). 매수인이 피담보채권 변제해야 인도청구 가능' },
        { id: 25, question: '가등기담보와 청산절차는?', answer: '담보가등기권자는 청산금 지급 후 본등기 가능. 청산금 없으면 그 사실 통지 필요' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/category/legal/judicial-scrivener" className="text-gray-600 hover:text-purple-600">법무사</a>
            <span className="text-gray-300">›</span>
            <span className="text-purple-600 font-medium">2차 서식·논술</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold">2차 서식·논술 학습</h1>
          <p className="text-purple-200 mt-1">법무사 2차 시험 실전 대비 · 25문항</p>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-purple-200 mt-2">{completedQuestions.length}/{totalQuestions} 완료 ({progress}%)</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* 안내 박스 */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-purple-800 mb-2">✏️ 2차 시험 서식 작성 핵심</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• <strong>등기신청서 양식</strong>을 완벽히 숙지하세요</li>
            <li>• <strong>첨부서면</strong>은 빠짐없이 기재해야 합니다</li>
            <li>• <strong>등록면허세 계산</strong>을 정확히 해야 합니다</li>
            <li>• 기출 서식을 <strong>100회 이상 손으로 작성</strong>해보세요</li>
          </ul>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedTopics(prev =>
                  prev.includes(topicIndex) ? prev.filter(i => i !== topicIndex) : [...prev, topicIndex]
                )}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-purple-500 font-bold">{topicIndex + 1}</span>
                  <span className="font-semibold text-gray-800">{topic.name}</span>
                  <span className="text-xs text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topicIndex) && (
                <div className="border-t">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 border-b last:border-b-0 ${completedQuestions.includes(q.id) ? 'bg-purple-50' : ''}`}>
                      <div className="flex gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-purple-500 border-purple-500 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mt-2 bg-gray-100 p-2 rounded">{q.answer}</p>
                          <button
                            onClick={() => {
                              setCurrentPrompt(`법무사 2차 시험 서식·논술 문제입니다.\n\n문제: ${q.question}\n\n다음 순서로 설명해주세요:\n1. 핵심 작성 포인트\n2. 실제 서식 예시 (해당 시)\n3. 관련 조문·예규\n4. 자주 하는 실수와 주의사항\n5. 유사 기출문제 분석`);
                              setShowAIModal(true);
                            }}
                            className="mt-2 px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition"
                          >🤖 AI</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <a href="/category/legal/judicial-scrivener/study/real-estate-registration" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">← 부동산등기법</a>
          <a href="/category/legal/judicial-scrivener" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">법무사 메인 →</a>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
