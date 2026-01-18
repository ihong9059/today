'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function CivilExecutionStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('judicial-civil-execution-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('judicial-civil-execution-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '민사집행법 총론',
      questions: [
        { id: 1, question: '민사집행의 의의와 종류는?', answer: '사법상 청구권을 국가 강제력으로 실현. 종류: 강제집행, 담보권 실행, 형식적 경매, 보전처분' },
        { id: 2, question: '집행권원의 종류 5가지는?', answer: '확정판결, 가집행선고 있는 판결, 화해조서, 인낙조서, 집행증서' },
        { id: 3, question: '집행문의 의의와 부여기관은?', answer: '집행권원에 집행력 있음을 공증하는 문서. 부여기관: 판결 등 법원서기관, 공정증서는 공증인' },
        { id: 4, question: '집행문 부여에 대한 이의와 집행문부여의 소는?', answer: '이의: 부여절차상 하자 / 집행문부여의 소: 조건성취, 승계 등 실체적 사유에 대해 판결로 해결' },
        { id: 5, question: '강제집행 개시요건은?', answer: '적법한 집행권원, 집행문, 송달증명, 집행개시 전 송달, 채무자 특정' },
        { id: 6, question: '집행정지와 집행취소의 차이는?', answer: '집행정지: 일시적 중단 / 집행취소: 이미 한 집행처분의 효력 소멸' },
        { id: 7, question: '청구이의의 소와 제3자이의의 소는?', answer: '청구이의: 채무자가 채권 소멸·변경 등 주장 / 제3자이의: 제3자가 목적물에 대한 권리 주장' },
        { id: 8, question: '집행비용의 부담과 선급은?', answer: '원칙: 채무자 부담 / 선급: 채권자가 먼저 예납, 후에 채무자에게 청구' },
        { id: 9, question: '배당요구의 의의와 요구권자는?', answer: '집행 목적물로부터 만족을 얻으려는 신청. 요구권자: 집행력 있는 정본을 가진 채권자, 담보권자 등' },
        { id: 10, question: '압류금지재산의 종류는?', answer: '생활필수품, 급여 1/2(150만원 초과분 전액), 연금, 퇴직금 1/2 등' }
      ]
    },
    {
      name: '부동산 강제집행',
      questions: [
        { id: 11, question: '부동산 강제경매의 신청과 개시결정은?', answer: '채권자가 집행법원에 신청 → 개시결정 → 압류의 효력 발생 → 등기촉탁' },
        { id: 12, question: '부동산 압류의 효력은?', answer: '처분금지효: 채무자의 처분 제한 / 상대적 효력: 선의 제3자에게 대항 불가' },
        { id: 13, question: '이중경매와 이중압류는?', answer: '이중경매: 다른 채권자의 별도 경매신청 / 이중압류: 먼저 압류된 부동산에 추가 압류' },
        { id: 14, question: '매각기일과 매각결정기일의 차이는?', answer: '매각기일: 입찰 진행 / 매각결정기일: 허가·불허가 결정' },
        { id: 15, question: '매각불허가 사유는?', answer: '절차상 하자, 최저매각가격 이하, 매수인 자격 흠결, 매수신고인의 취소' },
        { id: 16, question: '매각대금 납부의 효과는?', answer: '소유권 취득, 저당권 등 담보권 소멸, 인수되지 않는 부담 소멸' },
        { id: 17, question: '인수주의와 소제주의는?', answer: '인수주의: 매수인이 부담 인수 / 소제주의(원칙): 매각대금으로 부담 소멸' },
        { id: 18, question: '유치권과 경매에서의 처리는?', answer: '유치권은 매각으로 소멸하지 않음(인수). 매수인이 피담보채권 변제해야 인도청구 가능' },
        { id: 19, question: '법정지상권의 성립요건은?', answer: '저당권 설정 당시 토지·건물 동일인 소유, 경매로 소유자 달라짐' },
        { id: 20, question: '강제관리의 의의와 절차는?', answer: '부동산의 수익으로 채권 만족. 관리인 선임 → 수익 추심 → 배당' }
      ]
    },
    {
      name: '채권집행',
      questions: [
        { id: 21, question: '채권압류명령의 효력은?', answer: '제3채무자에게 채무자에 대한 지급 금지, 채무자에게 추심·처분 금지' },
        { id: 22, question: '추심명령과 전부명령의 차이는?', answer: '추심명령: 채권자가 직접 추심, 채권액 한도 / 전부명령: 채권 자체가 채권자에게 이전, 확정 시 변제 효과' },
        { id: 23, question: '전부명령의 효력발생 요건은?', answer: '제3채무자에 대한 송달, 채무자에 대한 송달, 1주 내 즉시항고 없음' },
        { id: 24, question: '제3채무자의 진술의무와 진술최고는?', answer: '채권자 신청 시 제3채무자는 채권 존부, 지급 의사 등 진술 의무' },
        { id: 25, question: '압류경합과 배당요구의 효력은?', answer: '압류경합: 먼저 압류한 채권자 우선 없음 / 배당요구: 집행법원에 신청, 안분배당' },
        { id: 26, question: '예금채권 압류의 특칙은?', answer: '압류 시점의 예금 잔액에 한정, 장래 입금분은 별도 압류 필요' },
        { id: 27, question: '급여채권 압류의 제한은?', answer: '월급여 1/2까지 압류 가능, 150만원 이하 부분은 압류 금지' },
        { id: 28, question: '동산인도청구권의 집행방법은?', answer: '채권집행의 일종으로 압류명령, 추심명령 또는 전부명령' },
        { id: 29, question: '부동산인도청구권의 집행방법은?', answer: '대체집행(제3자 이행) 또는 간접강제(이행강제금)' },
        { id: 30, question: '조건부·기한부 채권의 압류는?', answer: '조건 성취·기한 도래 전에도 압류 가능, 추심·전부는 조건 성취 후' }
      ]
    },
    {
      name: '배당절차',
      questions: [
        { id: 31, question: '배당요구의 종기는?', answer: '배당요구종기: 첫 매각기일 이전으로 법원이 정함. 종기 후 배당요구 불가' },
        { id: 32, question: '배당순위의 일반원칙은?', answer: '1순위: 집행비용, 2순위: 우선채권(조세, 임금 등), 3순위: 담보권, 4순위: 일반채권' },
        { id: 33, question: '근저당권과 확정일자부 임차권의 순위는?', answer: '설정일(등기접수일)과 확정일자 중 앞선 날짜의 권리가 우선' },
        { id: 34, question: '소액임차인의 최우선변제권은?', answer: '확정일자 없어도 대항력 있으면 일정 금액 최우선변제. 지역별 상이' },
        { id: 35, question: '배당이의의 절차는?', answer: '배당기일에 이의 → 합의 안 되면 배당이의의 소 1주 내 제기 → 미제기 시 이의 취하 간주' },
        { id: 36, question: '배당이의의 소의 당사자와 관할은?', answer: '원고: 이의 채권자, 피고: 상대 채권자 또는 채무자. 관할: 집행법원 소재지 지방법원' },
        { id: 37, question: '부당이득반환과 배당이의의 관계는?', answer: '배당이의의 소 제기하지 않으면 배당표 확정, 부당이득반환청구로 다툴 수 없음 (판례)' },
        { id: 38, question: '가압류권자의 배당참가는?', answer: '배당요구 없이도 배당에 참가. 단, 본안 승소 확정 시까지 공탁' },
        { id: 39, question: '안분배당과 우선배당의 차이는?', answer: '안분배당: 동순위 채권자 채권액 비율 / 우선배당: 선순위 채권 먼저 전액 변제' },
        { id: 40, question: '배당금의 공탁사유는?', answer: '채권자 불출석, 배당이의가 있는 경우, 가압류채권자의 본안미확정' }
      ]
    },
    {
      name: '보전처분',
      questions: [
        { id: 41, question: '가압류의 요건과 효과는?', answer: '요건: 피보전권리(금전채권), 보전의 필요성 / 효과: 처분금지, 본집행 보전' },
        { id: 42, question: '가처분의 종류는?', answer: '계쟁물가처분: 특정물 현상유지 / 임시지위가처분: 권리관계 잠정 규율' },
        { id: 43, question: '보전처분의 관할은?', answer: '가압류: 목적물 소재지 또는 본안 관할법원 / 가처분: 본안 관할법원 또는 목적물 소재지' },
        { id: 44, question: '담보제공의 방법은?', answer: '공탁(금전·유가증권), 지급보증위탁계약 체결 문서 제출' },
        { id: 45, question: '가압류·가처분의 집행기간은?', answer: '결정 송달일부터 2주 내 집행해야 함. 미집행 시 효력 상실' },
        { id: 46, question: '가압류해방금 공탁의 효과는?', answer: '채무자가 해방금 공탁 시 가압류 집행 취소, 공탁금에 가압류 효력 존속' },
        { id: 47, question: '사정변경에 의한 보전처분 취소는?', answer: '보전의 필요성 소멸, 담보 제공 등 사정변경 시 채무자 신청으로 취소' },
        { id: 48, question: '본안제소명령과 그 효과는?', answer: '채무자 신청 시 법원이 본안 제소 명령 → 미제소 시 보전처분 취소' },
        { id: 49, question: '가압류 후 본압류로의 이행은?', answer: '본안 승소 확정 후 가압류를 본압류로 이행. 별도 압류명령 불요' },
        { id: 50, question: '보전처분에 대한 불복방법은?', answer: '결정에 대해 즉시항고, 기각결정에 대해 항고 가능' }
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
            <a href="/category/legal/judicial-scrivener" className="text-gray-600 hover:text-violet-600">법무사</a>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">민사집행법</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold">민사집행법 학습</h1>
          <p className="text-violet-200 mt-1">법무사 1차 시험 · 50문항</p>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div className="bg-white h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-violet-200 mt-2">{completedQuestions.length}/{totalQuestions} 완료 ({progress}%)</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-6">
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
                  <span className="text-violet-500 font-bold">{topicIndex + 1}</span>
                  <span className="font-semibold text-gray-800">{topic.name}</span>
                  <span className="text-xs text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topicIndex) && (
                <div className="border-t">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 border-b last:border-b-0 ${completedQuestions.includes(q.id) ? 'bg-violet-50' : ''}`}>
                      <div className="flex gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${completedQuestions.includes(q.id) ? 'bg-violet-500 border-violet-500 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mt-2 bg-gray-100 p-2 rounded">{q.answer}</p>
                          <button
                            onClick={() => {
                              setCurrentPrompt(`법무사 시험 민사집행법 문제입니다.\n\n문제: ${q.question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 관련 조문\n3. 판례 또는 사례\n4. 실무적 적용\n5. 연습문제 3개`);
                              if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } if (!isPaid) { alert('결제 후 이용할 수 있는 기능입니다.'); return; } setShowAIModal(true);
                            }}
                            className="mt-2 px-3 py-1 bg-violet-100 text-violet-600 rounded-lg text-sm hover:bg-violet-200 transition"
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
          <a href="/category/legal/judicial-scrivener/study/civil-law" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">← 민법</a>
          <a href="/category/legal/judicial-scrivener/study/commercial-law" className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition">상법·비송 →</a>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
