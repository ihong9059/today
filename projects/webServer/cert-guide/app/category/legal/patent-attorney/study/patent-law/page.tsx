'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function PatentLawStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('patent-attorney-patent-law-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleComplete = (id: number) => {
    const newCompleted = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(newCompleted);
    localStorage.setItem('patent-attorney-patent-law-completed', JSON.stringify(newCompleted));
  };

  const topics = [
    {
      title: '특허요건 (논술 핵심)',
      questions: [
        { id: 1, question: '특허법상 발명의 정의와 발명의 성립요건을 설명하고, 소프트웨어 발명의 특허적격성을 논하시오.', answer: '자연법칙 이용, 기술적 사상, 창작, 고도성 / SW는 하드웨어 결합 필요' },
        { id: 2, question: '신규성 판단기준과 신규성 상실 예외규정(공지예외주장)의 적용요건 및 효과를 설명하시오.', answer: '출원전 공지 여부, 12개월내 자기공지 예외, 증명서류 제출' },
        { id: 3, question: '진보성의 의의와 판단방법, 진보성 판단시 고려되는 2차적 고려요소에 대해 논하시오.', answer: 'TSM 테스트, 상업적 성공, 장기간 미해결 과제, 오랜 필요성' },
        { id: 4, question: '선출원주의와 확대된 선원주의(제29조 제3항)의 취지와 요건을 비교 설명하시오.', answer: '선출원: 동일발명, 확대선원: 선출원 명세서 기재발명과 동일' },
        { id: 5, question: '명세서 기재요건(실시가능요건, 뒷받침요건)의 의의와 위반 효과를 논하시오.', answer: '통상의 기술자가 실시가능하도록 명확히 기재, 거절/무효사유' },
        { id: 6, question: '청구범위 기재요건과 발명의 설명에 의한 뒷받침 요건의 판단기준을 설명하시오.', answer: '필수구성요소 기재, 발명의 설명에 의해 뒷받침' },
        { id: 7, question: '발명의 단일성 위반과 그 처리방법(분할출원)에 대해 설명하시오.', answer: '하나의 총괄적 발명 개념, 분할출원으로 해결' },
        { id: 8, question: '불특허사유(제32조)의 유형과 구체적 판단기준을 설명하시오.', answer: '공서양속 위반, 위생 해, 국기 등' },
        { id: 9, question: '의약품 발명의 진보성 판단 특수성과 용도발명의 특허성을 논하시오.', answer: '임상시험 결과, 효과 현저성, 용도 한정의 기술적 의미' },
        { id: 10, question: '선택발명의 특허요건과 진보성 판단기준을 설명하시오.', answer: '상위개념 선행기술로부터 선택, 현저한 효과 필요' },
      ]
    },
    {
      title: '청구범위 해석 (논술 핵심)',
      questions: [
        { id: 11, question: '청구범위 해석의 원칙과 주변한정주의·중심한정주의를 비교 설명하시오.', answer: '청구범위 문언 중심 해석, 발명의 설명 참작' },
        { id: 12, question: '균등론의 의의, 적용요건(5요건) 및 균등침해 판단방법을 논하시오.', answer: '과제해결원리 동일, 치환가능, 치환용이, 비공지, 금반언 없음' },
        { id: 13, question: '출원경과금반언(Prosecution History Estoppel)의 의의와 적용범위를 설명하시오.', answer: '출원경과에서 의식적 제외한 사항에 균등 주장 불가' },
        { id: 14, question: '기능식 청구항(means plus function)의 해석방법과 한계를 논하시오.', answer: '기능으로 특정, 명세서 기재 구조로 한정 해석' },
        { id: 15, question: '수치한정발명의 청구범위 해석과 진보성 판단을 설명하시오.', answer: '임계적 의의 유무, 수치범위 선택의 용이성' },
        { id: 16, question: '간접침해(제127조)의 성립요건과 전용품·범용품의 구별기준을 논하시오.', answer: '전용품: 특허발명에만 사용, 범용품: 악의시 침해' },
        { id: 17, question: '특허발명의 권리범위 해석과 권리범위확인심판의 관계를 설명하시오.', answer: '권리범위 확인 절차, 소극적/적극적 확인' },
        { id: 18, question: '발명의 동일성 판단기준과 출원분할시 발명의 동일성 문제를 논하시오.', answer: '기술적 사상 실질적 동일, 분할시 원출원과 비동일 필요' },
        { id: 19, question: '자유기술(공지기술) 항변의 의의와 인정요건을 설명하시오.', answer: '공지기술과 동일하면 권리범위 미포함' },
        { id: 20, question: '특허청구범위의 감축과 정정심판의 요건 및 효과를 설명하시오.', answer: '청구범위 감축/오기정정/불명료 정정, 소급효' },
      ]
    },
    {
      title: '특허권의 효력과 제한',
      questions: [
        { id: 21, question: '특허권의 적극적 효력(실시권)과 소극적 효력(배제권)을 설명하시오.', answer: '업으로서 실시 독점, 타인 실시 배제' },
        { id: 22, question: '특허권의 효력이 미치지 않는 범위(제96조)를 구체적으로 설명하시오.', answer: '연구시험, 통과운송, 출원전 국내존재 등' },
        { id: 23, question: '선사용권(제103조)의 성립요건과 효과를 설명하시오.', answer: '선의, 발명인정, 사업준비, 통상실시권' },
        { id: 24, question: '소진론(특허권 소진)의 의의와 국제소진의 인정여부를 논하시오.', answer: '적법한 판매 후 소진, 국제소진 논란' },
        { id: 25, question: '전용실시권과 통상실시권의 차이 및 각각의 효력범위를 설명하시오.', answer: '전용: 독점적 배타권, 통상: 비독점적 실시권' },
        { id: 26, question: '법정실시권(중용권, 선사용권)의 유형과 성립요건을 비교 설명하시오.', answer: '중용권: 무효심결후 실시, 선사용권: 출원전 실시' },
        { id: 27, question: '강제실시권(재정)의 의의와 재정청구 사유를 설명하시오.', answer: '불실시, 공공이익, 반경쟁행위 시재정' },
        { id: 28, question: '이용·저촉 관계의 의의와 법률관계를 설명하시오.', answer: '이용: 선발명 포함실시, 저촉: 권리범위 중첩' },
        { id: 29, question: '특허권의 존속기간 연장제도와 그 요건을 설명하시오.', answer: '허가로 인한 불실시기간, 5년 한도 연장' },
        { id: 30, question: '특허권의 소멸사유와 포기의 요건을 설명하시오.', answer: '기간만료, 등록료불납, 포기, 무효심결 확정' },
      ]
    },
    {
      title: '심판 및 소송',
      questions: [
        { id: 31, question: '특허무효심판의 청구인적격과 무효사유를 설명하시오.', answer: '이해관계인+심사관, 특허요건 위반 등' },
        { id: 32, question: '정정심판과 정정청구의 차이점 및 정정의 요건을 설명하시오.', answer: '정정심판: 단독, 정정청구: 무효심판 중' },
        { id: 33, question: '권리범위확인심판의 의의와 소극적/적극적 확인의 차이를 설명하시오.', answer: '실시기술이 특허권 범위 내인지 확인' },
        { id: 34, question: '거절결정불복심판과 심결취소소송의 관계를 설명하시오.', answer: '심판 전치주의, 특허법원→대법원' },
        { id: 35, question: '특허침해소송의 당사자적격과 전속관할을 설명하시오.', answer: '특허권자/전용실시권자, 기술 5개 지법' },
        { id: 36, question: '침해금지청구권의 요건과 효과를 설명하시오.', answer: '침해+침해의 우려, 침해중지+예방청구' },
        { id: 37, question: '손해배상청구권의 요건과 손해액 산정방법(제128조)을 설명하시오.', answer: '고의/과실, 실시료상당액, 일실이익 등' },
        { id: 38, question: '과실추정규정(제130조)의 의의와 효과를 설명하시오.', answer: '등록특허 침해시 과실 추정' },
        { id: 39, question: '특허침해소송과 무효심판의 관계 및 권리남용 항변을 설명하시오.', answer: '무효사유 명백시 권리행사 제한' },
        { id: 40, question: '가처분과 침해금지청구의 관계를 설명하시오.', answer: '긴급성, 보전의 필요성, 본안 판단' },
      ]
    },
    {
      title: 'PCT/파리조약/판례',
      questions: [
        { id: 41, question: 'PCT 국제출원제도의 절차와 국내단계 진입요건을 설명하시오.', answer: '국제출원→조사→예비심사→국내단계(31개월)' },
        { id: 42, question: '파리조약상 우선권주장의 요건과 효과를 설명하시오.', answer: '12개월 내, 선출원일 기준 신규성/진보성 판단' },
        { id: 43, question: '국제조사와 국제예비심사의 의의와 효력을 설명하시오.', answer: '특허성 예비판단, 비구속적 의견' },
        { id: 44, question: '특허협력조약(PCT)과 유럽특허조약(EPC)의 차이를 설명하시오.', answer: 'PCT: 출원통합, EPC: 심사통합' },
        { id: 45, question: '지식재산권 관련 국제조약(TRIPs, 파리조약, PCT)의 관계를 설명하시오.', answer: '최소기준, 내국민대우, 최혜국대우' },
        { id: 46, question: '진보성 판단에 관한 주요 대법원 판례를 설명하시오.', answer: '대법원 2007후3660 등 TSM 기준' },
        { id: 47, question: '균등침해에 관한 주요 대법원 판례를 설명하시오.', answer: '대법원 2000다27602 5요건 정립' },
        { id: 48, question: '간접침해에 관한 주요 대법원 판례를 설명하시오.', answer: '전용품/범용품 구별 기준' },
        { id: 49, question: '권리범위 해석에 관한 주요 대법원 판례를 설명하시오.', answer: '특허발명의 보호범위 획정' },
        { id: 50, question: '자유기술 항변에 관한 주요 대법원 판례를 설명하시오.', answer: '공지기술과 실질동일시 비침해' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progressPercent = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-blue-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/legal/patent-attorney" className="text-gray-600 hover:text-blue-600">변리사</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">특허법 (2차)</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">📝</span>
              <div>
                <h1 className="text-2xl font-bold">특허법 (2차 논술)</h1>
                <p className="text-teal-100">2차 시험 | 200점 | 120분</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-teal-100 text-sm">학습 진도</p>
              <p className="text-3xl font-bold">{progressPercent}%</p>
              <p className="text-teal-200 text-sm">{completedQuestions.length}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIndex)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-teal-50 to-emerald-50 hover:from-teal-100 hover:to-emerald-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📖</span>
                  <div className="text-left">
                    <h2 className="font-bold text-gray-800">{topic.title}</h2>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-teal-600 font-medium">
                      {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                    </span>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {openTopics.includes(topicIndex) && (
                <div className="p-6 space-y-4">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border-2 transition ${
                        completedQuestions.includes(q.id)
                          ? 'bg-teal-50 border-teal-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleComplete(q.id)}
                          className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-teal-500 border-teal-500 text-white'
                              : 'border-gray-300 hover:border-teal-500'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-teal-600 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded">
                            💡 {q.answer}
                          </p>
                          <button
                            onClick={() => {
                              setCurrentPrompt(`변리사 2차 시험 특허법 논술 문제입니다.

문제: ${q.question}

다음 형식으로 논술 답안을 작성해주세요:
1. 쟁점 정리
2. 관련 조문
3. 학설 및 판례
4. 사안의 적용
5. 결론`);
                              if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } if (!isPaid) { alert('결제 후 이용할 수 있는 기능입니다.'); return; } setShowAIModal(true);
                            }}
                            className="mt-2 px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition"
                          >
                            🤖 AI에게 질문하기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Study Tips */}
        <section className="mt-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4">💡 특허법 논술 작성 전략</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">쟁점→조문→판례</h3>
              <p className="text-sm text-teal-100">논리적 흐름으로 답안 구성</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">주요 판례 암기</h3>
              <p className="text-sm text-teal-100">30개 핵심 판례 완벽 숙지</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">시간 관리</h3>
              <p className="text-sm text-teal-100">문제당 30분 원칙</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>

      {/* AI Modal */}
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
              >
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
