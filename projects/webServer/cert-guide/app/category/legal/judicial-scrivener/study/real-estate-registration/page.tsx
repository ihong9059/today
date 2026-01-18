'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function RealEstateRegistrationStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('judicial-real-estate-reg-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('judicial-real-estate-reg-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '등기제도 총론',
      questions: [
        { id: 1, question: '등기의 종류(기입, 변경, 경정, 말소, 회복)는?', answer: '기입: 새 권리 등재 / 변경: 내용 변경 / 경정: 착오 수정 / 말소: 권리 소멸 / 회복: 말소된 등기 회복' },
        { id: 2, question: '등기의 효력(공시력, 공신력, 추정력)은?', answer: '공시력: 외부에 권리관계 표시 / 공신력: 한국은 불인정 / 추정력: 등기와 일치하는 권리 있다고 추정' },
        { id: 3, question: '등기부의 구성과 열람은?', answer: '표제부(표시사항), 갑구(소유권), 을구(소유권 외 권리). 누구나 열람·발급 가능' },
        { id: 4, question: '등기소와 등기관의 역할은?', answer: '등기소: 등기사무 처리기관 / 등기관: 등기관할 법원 소속 법원사무관 등' },
        { id: 5, question: '등기의 관할은?', answer: '부동산 소재지 관할 등기소. 관할 위반 시 각하' },
        { id: 6, question: '등기신청의 방식은?', answer: '공동신청 원칙(등기권리자+의무자), 예외: 단독신청, 촉탁등기' },
        { id: 7, question: '등기신청서 기재사항은?', answer: '부동산 표시, 등기원인, 등기목적, 신청인 표시, 첨부서면 목록, 등록면허세' },
        { id: 8, question: '등기원인증명정보란?', answer: '등기원인의 존재를 증명하는 서면(매매계약서, 상속증명서 등)' },
        { id: 9, question: '등기필정보(등기완료증)란?', answer: '등기 완료 시 등기권리자에게 통지되는 고유 식별번호. 다음 등기 시 제출' },
        { id: 10, question: '등기의 순위와 순위번호는?', answer: '같은 구에서 순위번호 순 / 갑구·을구 간에는 접수번호 순으로 우열 결정' }
      ]
    },
    {
      name: '소유권 등기',
      questions: [
        { id: 11, question: '소유권보존등기의 의의와 신청인은?', answer: '미등기 부동산에 최초로 하는 소유권등기. 신청인: 토지대장·건축물대장 소유자, 확정판결 받은 자' },
        { id: 12, question: '소유권이전등기의 원인과 종류는?', answer: '원인: 매매, 증여, 상속, 경매, 수용 등 / 종류: 매매, 상속, 증여, 대물변제 등' },
        { id: 13, question: '매매로 인한 소유권이전등기 절차는?', answer: '등기신청서 + 등기원인증명정보(계약서) + 취득세영수필확인서 + 인감증명서 + 주민등록등본' },
        { id: 14, question: '상속으로 인한 소유권이전등기 특칙은?', answer: '단독신청. 첨부: 상속증명정보(제적등본, 가족관계증명서), 상속인 전원의 인감증명서' },
        { id: 15, question: '증여로 인한 소유권이전등기 절차는?', answer: '공동신청. 증여계약서, 검인받은 계약서 또는 공정증서' },
        { id: 16, question: '공유물분할로 인한 등기는?', answer: '공유자 전원 공동신청 또는 분할판결에 기한 단독신청' },
        { id: 17, question: '합유자 탈퇴·가입 시 등기는?', answer: '합유자 변동 시 합유등기 변경등기. 조합원 전원 공동신청' },
        { id: 18, question: '수용으로 인한 소유권이전등기는?', answer: '사업시행자 단독신청. 재결서 정본 첨부' },
        { id: 19, question: '경매로 인한 소유권이전등기는?', answer: '법원 촉탁. 매수인은 별도 신청 불요' },
        { id: 20, question: '협의분할로 인한 상속등기는?', answer: '상속인 전원의 협의에 의한 분할. 협의분할서 + 인감증명서' }
      ]
    },
    {
      name: '담보권 등기',
      questions: [
        { id: 21, question: '저당권설정등기의 의의와 절차는?', answer: '채권담보를 위한 권리. 공동신청, 채권액·이자·위약금 기재' },
        { id: 22, question: '근저당권의 특성과 등기사항은?', answer: '불특정 채권 담보, 채권최고액 기재 필수. 확정기 약정 시 기재' },
        { id: 23, question: '근저당권 채권최고액 변경등기는?', answer: '증액: 후순위권리자 승낙 필요 / 감액: 승낙 불요' },
        { id: 24, question: '전세권설정등기의 의의와 등기사항은?', answer: '전세금 지급 후 사용·수익. 존속기간, 전세금, 범위 기재' },
        { id: 25, question: '저당권 이전등기(채권양도)는?', answer: '채권과 함께 저당권 이전. 양도인·양수인 공동신청' },
        { id: 26, question: '근저당권 이전등기와 확정 후 이전의 차이는?', answer: '확정 전: 근저당권 이전 / 확정 후: 저당권으로서 이전, 확정채권액 기재' },
        { id: 27, question: '저당권 말소등기의 원인은?', answer: '피담보채권 소멸(변제, 상계 등), 저당권 포기, 혼동' },
        { id: 28, question: '공동저당의 등기와 대위등기는?', answer: '수개 부동산에 저당권 설정. 후순위권리자 대위: 일부 부동산 매각 시 대위등기' },
        { id: 29, question: '질권설정등기(권리질권)는?', answer: '채권, 지식재산권 등 권리에 질권 설정. 부동산에는 질권 설정 불가' },
        { id: 30, question: '담보가등기의 효력은?', answer: '담보 목적 가등기. 가등기담보법 적용, 청산절차 거쳐야 본등기 가능' }
      ]
    },
    {
      name: '가등기·예고등기·촉탁등기',
      questions: [
        { id: 31, question: '가등기의 종류와 효력은?', answer: '청구권보전가등기, 담보가등기. 순위보전효력, 본등기 시 가등기 순위로 소급' },
        { id: 32, question: '가등기에 기한 본등기 절차는?', answer: '가등기권리자 단독신청. 가등기 후 제3자 권리는 직권 말소' },
        { id: 33, question: '가등기 말소의 원인과 절차는?', answer: '원인: 채권 소멸, 포기, 기간 만료 / 공동신청 또는 판결에 의한 단독신청' },
        { id: 34, question: '예고등기의 의의와 효력은?', answer: '등기원인 무효·취소 등 소송 계속 표시. 경고적 효력만 있고 순위보전효 없음' },
        { id: 35, question: '촉탁등기의 종류는?', answer: '법원촉탁(경매, 가압류), 관공서촉탁(수용, 환지), 공탁관촉탁(공탁물)' },
        { id: 36, question: '경매로 인한 촉탁등기 절차는?', answer: '매각대금 납부 → 법원이 소유권이전, 담보권 말소 촉탁' },
        { id: 37, question: '가압류등기의 효력과 말소는?', answer: '효력: 처분금지, 본압류로 이행 가능 / 말소: 집행취소결정, 해방공탁' },
        { id: 38, question: '가처분등기의 종류와 효력은?', answer: '처분금지가처분: 처분 제한 / 점유이전금지가처분: 점유 변경 금지' },
        { id: 39, question: '신탁등기의 의의와 등기사항은?', answer: '신탁재산임을 공시. 신탁원부 작성, 수탁자 명의로 소유권이전' },
        { id: 40, question: '환지등기(토지구획정리)란?', answer: '구획정리사업으로 환지 확정 시 직권등기. 종전토지 등기 이기' }
      ]
    },
    {
      name: '상업등기법',
      questions: [
        { id: 41, question: '상업등기의 의의와 종류는?', answer: '상인에 관한 일정 사항 등기. 상호등기, 지배인등기, 회사등기(법인등기)' },
        { id: 42, question: '상호등기의 절차와 효력은?', answer: '본점소재지 등기소에 신청. 동일상호 사용금지 효력' },
        { id: 43, question: '회사설립등기의 기재사항은?', answer: '상호, 목적, 본점, 자본금, 발행주식총수, 이사 성명, 대표이사 주소' },
        { id: 44, question: '이사·대표이사 변경등기 절차는?', answer: '2주 내 등기. 첨부: 주주총회의사록, 취임승낙서, 인감증명서' },
        { id: 45, question: '본점이전등기의 절차는?', answer: '구소재지: 2주 내 이전등기 / 신소재지: 3주 내 설립과 같은 등기' },
        { id: 46, question: '증자(자본금 증가) 등기는?', answer: '납입기일 다음 날부터 2주 내. 변경등기신청서 + 주금납입증명' },
        { id: 47, question: '감자(자본금 감소) 등기 절차는?', answer: '채권자보호절차 → 주주총회 특별결의 → 2주 내 변경등기' },
        { id: 48, question: '합병등기의 절차는?', answer: '흡수: 존속회사 변경등기 + 소멸회사 해산등기 / 신설: 신회사 설립등기 + 소멸회사 해산등기' },
        { id: 49, question: '해산 및 청산등기는?', answer: '해산사유 발생 시 2주 내 해산등기, 청산인 취임등기. 청산종결등기로 법인격 소멸' },
        { id: 50, question: '등기신청서 각하사유는?', answer: '관할 위반, 등기할 사항 아님, 신청서 흠결, 등록면허세 미납, 첨부서면 불비' }
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
            <span className="text-violet-600 font-medium">부동산등기법</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold">부동산등기법·상업등기법 학습</h1>
          <p className="text-violet-200 mt-1">법무사 1차 시험 핵심과목 · 50문항</p>
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
                              setCurrentPrompt(`법무사 시험 부동산등기법·상업등기법 문제입니다.\n\n문제: ${q.question}\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문·예규\n3. 서식 작성 연계\n4. 실무 적용 사례\n5. 연습문제 3개`);
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
          <a href="/category/legal/judicial-scrivener/study/commercial-law" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">← 상법·비송</a>
          <a href="/category/legal/judicial-scrivener/study/practical" className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition">2차 서식 →</a>
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
