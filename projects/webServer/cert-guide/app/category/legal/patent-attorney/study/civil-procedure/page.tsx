'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function CivilProcedureStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('patent-attorney-civil-procedure-completed');
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
    localStorage.setItem('patent-attorney-civil-procedure-completed', JSON.stringify(newCompleted));
  };

  const topics = [
    {
      title: '소송요건',
      questions: [
        { id: 1, question: '민사소송에서 소송요건의 의의와 종류를 설명하시오.', answer: '본안판단 전제요건, 재판권·관할·당사자적격 등' },
        { id: 2, question: '당사자능력과 소송능력의 차이를 설명하시오.', answer: '당사자능력: 소송당사자 될 자격, 소송능력: 소송행위능력' },
        { id: 3, question: '당사자적격(정당한 당사자)의 의의와 판단기준을 설명하시오.', answer: '소송물에 대한 관리처분권, 이행의 소·확인의 소 구별' },
        { id: 4, question: '소의 이익의 의의와 유형(권리보호이익, 소송형태이익)을 설명하시오.', answer: '소송의 필요성, 확인의 이익 판단' },
        { id: 5, question: '소송물 이론(구소송물이론, 신소송물이론)을 비교 설명하시오.', answer: '실체법적 청구권 vs 신청취지+사실관계' },
        { id: 6, question: '관할의 종류(토지관할, 사물관할, 합의관할)를 설명하시오.', answer: '피고 주소지, 소송목적물 가액, 합의에 의한 변경' },
        { id: 7, question: '이송의 요건과 효과를 설명하시오.', answer: '관할위반, 재량이송, 소송지연 방지' },
        { id: 8, question: '소장의 기재사항과 소장심사를 설명하시오.', answer: '당사자, 청구취지, 청구원인, 보정명령' },
        { id: 9, question: '소송대리의 의의와 소송대리인의 권한범위를 설명하시오.', answer: '소송위임, 특별위임사항' },
        { id: 10, question: '소송참가(보조참가, 독립당사자참가, 공동소송참가)를 설명하시오.', answer: '제3자의 소송관여 방법' },
      ]
    },
    {
      title: '소송절차',
      questions: [
        { id: 11, question: '변론주의의 내용(주장책임, 자백의 구속력, 직권탐지금지)을 설명하시오.', answer: '당사자 주장사실 기초, 자백 취소 제한' },
        { id: 12, question: '처분권주의의 내용(심판범위 제한, 자기구속, 소취하 자유)을 설명하시오.', answer: '청구범위 내 심판, 청구초과 판결 불가' },
        { id: 13, question: '석명권과 석명의무의 의의 및 한계를 설명하시오.', answer: '불명료한 점 해명 촉구, 적극적 석명의무' },
        { id: 14, question: '기일과 기간의 의의 및 불변기간과 통상기간의 차이를 설명하시오.', answer: '불변기간: 연장불가, 통상기간: 연장가능' },
        { id: 15, question: '송달의 의의와 종류(교부송달, 우편송달, 공시송달)를 설명하시오.', answer: '소송서류 전달방법, 효력발생시기' },
        { id: 16, question: '소송행위의 하자와 치유를 설명하시오.', answer: '무효, 취소, 추인에 의한 치유' },
        { id: 17, question: '변론의 분리·병합과 소의 변경을 설명하시오.', answer: '심리 효율화, 청구취지/원인 변경' },
        { id: 18, question: '공동소송의 종류(통상공동소송, 필수적공동소송)를 설명하시오.', answer: '소송공동 허용, 필수적 공동 요건' },
        { id: 19, question: '소의 취하와 청구의 포기·인낙을 설명하시오.', answer: '소송종료, 확정판결 효력' },
        { id: 20, question: '소송절차의 중단과 중지를 설명하시오.', answer: '당사자 사망 등 중단, 법원 결정 중지' },
      ]
    },
    {
      title: '증거법',
      questions: [
        { id: 21, question: '증거의 의의와 종류(증거방법, 증거자료, 증거원인)를 설명하시오.', answer: '법원 심증형성 자료' },
        { id: 22, question: '증명책임의 분배원칙과 전환을 설명하시오.', answer: '법률요건분류설, 증명책임 전환규정' },
        { id: 23, question: '자유심증주의의 의의와 한계를 설명하시오.', answer: '증거력 자유판단, 경험칙·논리법칙 구속' },
        { id: 24, question: '변론전체의 취지와 증거공통의 원칙을 설명하시오.', answer: '심증형성 자료 전체 고려' },
        { id: 25, question: '자백의 구속력과 자백의 취소를 설명하시오.', answer: '재판상 자백, 반진실+착오시 취소' },
        { id: 26, question: '서증의 의의와 문서의 진정성립을 설명하시오.', answer: '문서 증거, 작성자 의사에 기한 작성' },
        { id: 27, question: '증인신문의 절차와 증인의 의무를 설명하시오.', answer: '출석의무, 선서의무, 증언의무' },
        { id: 28, question: '감정의 의의와 감정증거의 특성을 설명하시오.', answer: '전문가 의견, 법원 판단 보조' },
        { id: 29, question: '검증의 의의와 절차를 설명하시오.', answer: '법관 오감 직접 확인' },
        { id: 30, question: '당사자신문의 의의와 성질을 설명하시오.', answer: '보충적 증거방법' },
      ]
    },
    {
      title: '판결',
      questions: [
        { id: 31, question: '판결의 종류(중간판결, 종국판결, 전부판결, 일부판결)를 설명하시오.', answer: '소송절차 진행단계별 구분' },
        { id: 32, question: '판결의 확정과 확정시기를 설명하시오.', answer: '불복방법 종료, 상소기간 도과' },
        { id: 33, question: '기판력의 의의와 범위(객관적, 주관적, 시적 범위)를 설명하시오.', answer: '동일사건 재소 차단, 주문 판단' },
        { id: 34, question: '기판력의 표준시와 실권효를 설명하시오.', answer: '사실심 변론종결시, 표준시 후 사유' },
        { id: 35, question: '형성력과 집행력의 의의를 설명하시오.', answer: '법률관계 변동, 강제집행 근거' },
        { id: 36, question: '가집행선고의 의의와 요건을 설명하시오.', answer: '판결확정 전 집행, 재산권 청구' },
        { id: 37, question: '판결의 경정과 추가판결을 설명하시오.', answer: '계산착오 경정, 누락 청구 추가' },
        { id: 38, question: '청구의 병합과 병합판결을 설명하시오.', answer: '선택적·예비적·중첩적 병합' },
        { id: 39, question: '재심사유와 재심절차를 설명하시오.', answer: '확정판결 취소, 제한적 사유' },
        { id: 40, question: '판결무효의 소와 그 요건을 설명하시오.', answer: '소송요건 흠결, 별소로 무효 주장' },
      ]
    },
    {
      title: '상소/특허소송',
      questions: [
        { id: 41, question: '항소의 요건과 항소심의 심리범위를 설명하시오.', answer: '불복이익, 속심제, 사실심' },
        { id: 42, question: '항소의 취하와 부대항소를 설명하시오.', answer: '상대방 동의 불요, 부대항소 종속성' },
        { id: 43, question: '상고의 요건과 상고심의 심리범위를 설명하시오.', answer: '법률심, 법령위반 사유' },
        { id: 44, question: '파기환송과 파기자판의 차이를 설명하시오.', answer: '원심 환송 vs 직접 재판' },
        { id: 45, question: '가처분의 의의와 특허소송에서의 활용을 설명하시오.', answer: '임시적 지위, 특허침해 가처분' },
        { id: 46, question: '특허침해소송과 심결취소소송의 관계를 설명하시오.', answer: '특허법원 전속관할, 중복문제' },
        { id: 47, question: '침해금지 가처분의 요건(피보전권리, 보전의 필요성)을 설명하시오.', answer: '특허권 소명, 긴급성' },
        { id: 48, question: '손해배상청구소송의 특성과 손해액 산정을 설명하시오.', answer: '일실이익, 실시료상당액, 기여도' },
        { id: 49, question: '확인의 소와 권리범위확인심판의 관계를 설명하시오.', answer: '확인의 이익, 심판 선행문제' },
        { id: 50, question: '특허소송에서의 증거수집과 기술설명회를 설명하시오.', answer: '문서제출명령, 기술이해 촉진' },
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
            <span className="text-teal-600 font-medium">민사소송법 (2차)</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">⚖️</span>
              <div>
                <h1 className="text-2xl font-bold">민사소송법 (2차 논술)</h1>
                <p className="text-teal-100">2차 시험 | 100점 | 120분</p>
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
                              setCurrentPrompt(`변리사 2차 시험 민사소송법 논술 문제입니다.

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
          <h2 className="text-xl font-bold mb-4">💡 민사소송법 논술 작성 전략</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">절차 흐름 이해</h3>
              <p className="text-sm text-teal-100">소제기→변론→증거→판결 순서</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">특허소송 연계</h3>
              <p className="text-sm text-teal-100">특허침해소송 특수문제 중점</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-2">기판력 중요</h3>
              <p className="text-sm text-teal-100">기판력 범위 문제 자주 출제</p>
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
