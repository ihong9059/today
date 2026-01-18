'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function CommercialLawStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('judicial-commercial-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('judicial-commercial-law-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '상법 총론·회사 통칙',
      questions: [
        { id: 1, question: '상법의 법원(法源)과 적용순서는?', answer: '상법 → 상관습법 → 민법 순으로 적용' },
        { id: 2, question: '회사의 종류와 특징은?', answer: '합명회사(무한책임), 합자회사(무한+유한), 유한책임회사, 주식회사(유한책임), 유한회사' },
        { id: 3, question: '법인격 부인론이란?', answer: '회사의 법인격을 악용하는 경우 그 법인격을 부인하고 배후자에게 책임을 묻는 이론' },
        { id: 4, question: '회사의 설립무효와 취소의 차이는?', answer: '설립무효: 객관적 하자, 소로만 주장 / 설립취소: 주관적 하자(사기, 강박 등)' },
        { id: 5, question: '회사의 해산사유와 청산절차는?', answer: '해산: 존립기간 만료, 합병, 파산, 법원 명령 등 / 청산: 청산인 선임 → 채권자 공고 → 재산분배' },
        { id: 6, question: '법인등기와 상업등기의 관계는?', answer: '상업등기는 상인에 관한 등기, 법인등기(회사등기)는 상업등기의 일종' },
        { id: 7, question: '지배인의 권한과 제한은?', answer: '지배인은 영업에 관한 포괄적 대리권 보유. 단, 영업 양도·담보제공 등은 제한' },
        { id: 8, question: '상호의 등기와 효력은?', answer: '동일 시·군에서 동종영업에 타인의 등기된 상호 사용 금지. 부정목적 사용 시 폐지청구 가능' },
        { id: 9, question: '영업양도의 법적 성질과 효과는?', answer: '법적 성질: 채권계약 / 효과: 영업재산 이전, 경업금지의무, 상호속용 시 채무 인수' },
        { id: 10, question: '회사의 능력(권리능력, 행위능력)은?', answer: '권리능력: 정관 목적 범위 내(목적 범위 외 행위도 유효-판례) / 행위능력: 대표기관 통해 행사' }
      ]
    },
    {
      name: '주식회사 - 설립·주식',
      questions: [
        { id: 11, question: '발기설립과 모집설립의 차이는?', answer: '발기설립: 발기인이 전부 인수 / 모집설립: 주주 모집하여 설립' },
        { id: 12, question: '설립등기의 효력과 등기사항은?', answer: '효력: 회사 성립(창설적 효력) / 등기사항: 목적, 상호, 본점, 자본금, 이사 등' },
        { id: 13, question: '변태설립사항이란?', answer: '현물출자, 재산인수, 발기인 보수, 설립비용. 정관에 기재해야 효력 발생' },
        { id: 14, question: '발기인의 권한과 책임은?', answer: '권한: 설립 관련 행위 / 책임: 회사에 대한 자본충실책임, 제3자에 대한 손해배상책임' },
        { id: 15, question: '주식의 종류와 특성은?', answer: '보통주, 우선주(배당우선), 후배주, 의결권 없는 주식, 상환주식, 전환주식' },
        { id: 16, question: '자기주식 취득의 제한과 예외는?', answer: '원칙: 금지 / 예외: 주식소각, 합병, 반대주주 주식매수청구, 단주 처리 등' },
        { id: 17, question: '주식양도의 자유와 제한은?', answer: '원칙: 자유 / 제한: 정관으로 이사회 승인 요구 가능, 권리주 양도제한' },
        { id: 18, question: '명의개서와 주주명부의 효력은?', answer: '명의개서: 주주권 행사 요건(대항요건) / 주주명부: 기준일 주주에게 의결권 부여' },
        { id: 19, question: '신주발행의 절차와 효력은?', answer: '이사회 결의 → 납입 → 등기 / 효력: 납입기일 다음 날 주주 지위 취득' },
        { id: 20, question: '주식매수선택권(스톡옵션)의 요건은?', answer: '정관 규정, 주주총회 특별결의, 발행주식 10% 한도, 임직원 대상' }
      ]
    },
    {
      name: '주식회사 - 기관',
      questions: [
        { id: 21, question: '주주총회의 권한과 소집절차는?', answer: '권한: 정관변경, 합병, 이사선임 등 / 소집: 이사회 결의 → 2주 전 통지' },
        { id: 22, question: '보통결의와 특별결의의 요건은?', answer: '보통결의: 출석 과반수, 발행주식 1/4 이상 / 특별결의: 출석 2/3 이상, 발행주식 1/3 이상' },
        { id: 23, question: '의결권 대리행사와 서면투표는?', answer: '대리행사: 대리권 증명 서면 제출 / 서면투표: 정관 규정 시 가능' },
        { id: 24, question: '결의취소의 소와 결의무효확인의 소는?', answer: '취소: 절차상 하자, 2월 내 / 무효: 내용상 하자, 제소기간 없음' },
        { id: 25, question: '이사의 선임과 해임 요건은?', answer: '선임: 주주총회 보통결의 / 해임: 특별결의, 정당한 이유 없으면 손해배상' },
        { id: 26, question: '이사의 의무(충실의무, 선관주의의무)는?', answer: '충실의무: 회사이익 우선 / 선관주의: 선량한 관리자의 주의' },
        { id: 27, question: '이사의 자기거래 제한과 승인은?', answer: '이사회 승인 필요. 미승인 시 회사에 대한 효력 부인 가능' },
        { id: 28, question: '이사회의 권한과 결의요건은?', answer: '권한: 업무집행 결정, 이사 감독 / 결의: 재적 과반수 출석, 출석 과반수 찬성' },
        { id: 29, question: '대표이사의 권한과 표현대표이사는?', answer: '권한: 회사 대표, 업무집행 / 표현대표이사: 외관상 대표이사로 보이는 자의 행위에 회사 책임' },
        { id: 30, question: '감사의 권한과 선임·해임은?', answer: '권한: 업무·회계 감사 / 선임: 주주총회, 대주주 의결권 제한 / 해임: 특별결의' }
      ]
    },
    {
      name: '유한회사·조직변경·합병',
      questions: [
        { id: 31, question: '유한회사의 특징과 기관은?', answer: '특징: 소규모 폐쇄회사에 적합 / 기관: 사원총회, 이사(1인 가능), 감사(임의)' },
        { id: 32, question: '유한회사 설립등기 사항은?', answer: '목적, 상호, 본점, 자본금, 이사 성명, 사원 출자좌수' },
        { id: 33, question: '지분양도와 입사·퇴사는?', answer: '양도: 정관으로 제한 가능 / 입사: 신지분 인수 / 퇴사: 사망, 제명, 지분전부 양도' },
        { id: 34, question: '조직변경의 의의와 절차는?', answer: '의의: 회사 형태 변경 / 절차: 특별결의 → 채권자 보호절차 → 변경등기' },
        { id: 35, question: '합병의 종류와 절차는?', answer: '흡수합병, 신설합병 / 절차: 합병계약 → 특별결의 → 채권자 이의 → 합병등기' },
        { id: 36, question: '합병무효의 소와 효과는?', answer: '6월 내 소 제기 / 효과: 장래효, 소급효 없음' },
        { id: 37, question: '분할·분할합병의 의의와 종류는?', answer: '분할: 회사를 둘 이상으로 / 분할합병: 분할 후 다른 회사와 합병 / 물적분할: 자회사 설립' },
        { id: 38, question: '주식교환·주식이전이란?', answer: '주식교환: 완전모자회사 관계 창설 / 주식이전: 신설 완전모회사에 주식 이전' },
        { id: 39, question: '회사분할 시 채권자보호절차는?', answer: '분할계획 승인 후 채권자 이의신청 기간 부여, 이의 있는 채권자에게 변제·담보 제공' },
        { id: 40, question: '영업양도와 회사분할의 차이는?', answer: '영업양도: 계약에 의한 개별 이전 / 회사분할: 포괄승계, 등기로 효력 발생' }
      ]
    },
    {
      name: '비송사건절차법',
      questions: [
        { id: 41, question: '비송사건의 의의와 특징은?', answer: '법원이 사법상 법률관계 형성·확인하는 절차. 쟁송 아닌 형성적 재판' },
        { id: 42, question: '비송사건의 관할은?', answer: '원칙: 상대방 주소지 법원 / 법인사건: 법인 본점 소재지 법원' },
        { id: 43, question: '비송재판의 효력과 불복방법은?', answer: '효력: 고지로 발생, 확정판결과 같은 효력 없음 / 불복: 항고, 재항고' },
        { id: 44, question: '법인등기에서 검사인 선임은?', answer: '현물출자, 재산인수 시 법원이 검사인 선임하여 조사' },
        { id: 45, question: '회사 청산에서 법원의 역할은?', answer: '청산인 선임·해임, 청산사무 감독, 재산처분 허가' },
        { id: 46, question: '일시이사·일시대표이사 선임은?', answer: '이사 결원으로 업무 수행 불가 시 이해관계인 청구로 법원이 선임' },
        { id: 47, question: '유한회사 출자이행청구 절차는?', answer: '이사 청구 → 법원 허가 → 출자 이행 명령' },
        { id: 48, question: '사원권 확인의 비송절차는?', answer: '사원권 존부 다툼 시 비송절차로 확인 가능 (다만 소로 다투는 것이 원칙)' },
        { id: 49, question: '회사정리·회생절차와 비송의 관계는?', answer: '회생절차는 도산법에 의하나, 비송적 성격. 관리인 선임, 재산조사 등' },
        { id: 50, question: '상업등기 관련 비송사건의 예는?', answer: '등기신청 각하결정에 대한 이의, 과태료 재판, 등기관 처분에 대한 이의' }
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
            <span className="text-violet-600 font-medium">상법·비송</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold">상법(회사법)·비송사건절차법 학습</h1>
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
                              setCurrentPrompt(`법무사 시험 상법·비송사건절차법 문제입니다.\n\n문제: ${q.question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 등기실무 연계\n4. 판례 또는 사례\n5. 연습문제 3개`);
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
          <a href="/category/legal/judicial-scrivener/study/civil-execution" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">← 민사집행법</a>
          <a href="/category/legal/judicial-scrivener/study/real-estate-registration" className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition">부동산등기법 →</a>
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
