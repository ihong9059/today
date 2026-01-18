'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function CivilLawStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('judicial-civil-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('judicial-civil-law-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '민법 총칙',
      questions: [
        { id: 1, question: '권리능력과 의사능력, 행위능력의 차이점은?', answer: '권리능력은 권리·의무의 주체가 될 수 있는 자격, 의사능력은 의사표시의 의미를 이해할 수 있는 능력, 행위능력은 단독으로 유효한 법률행위를 할 수 있는 능력' },
        { id: 2, question: '법률행위의 성립요건과 효력요건은?', answer: '성립요건: 당사자, 목적, 의사표시 / 효력요건: 권리능력, 의사능력, 행위능력, 목적의 확정·가능·적법·사회적 타당성' },
        { id: 3, question: '비진의 의사표시(제107조)란?', answer: '표의자가 진의 아님을 알면서 한 의사표시. 원칙적 유효, 상대방이 악의 또는 과실로 알 수 있었을 때 무효' },
        { id: 4, question: '통정허위표시(제108조)의 효과는?', answer: '당사자 간에 무효, 선의의 제3자에게 대항 불가' },
        { id: 5, question: '착오로 인한 의사표시(제109조)의 취소요건은?', answer: '법률행위 내용의 중요부분에 착오가 있고, 표의자에게 중대한 과실이 없어야 취소 가능' },
        { id: 6, question: '사기·강박에 의한 의사표시(제110조)의 효과는?', answer: '취소할 수 있음. 제3자의 사기의 경우 상대방이 그 사실을 알았거나 알 수 있었을 때만 취소 가능' },
        { id: 7, question: '대리의 3면관계와 현명주의는?', answer: '본인-대리인-상대방의 3면관계. 현명주의: 대리인이 본인을 위한 것임을 표시해야 함' },
        { id: 8, question: '무권대리와 표현대리의 차이점은?', answer: '무권대리: 대리권 없는 자의 행위(본인 추인 가능), 표현대리: 대리권 외관을 본인이 야기한 경우(본인에게 효력 귀속)' },
        { id: 9, question: '법률행위의 무효와 취소의 차이점은?', answer: '무효: 처음부터 효력 없음, 누구나 주장 가능 / 취소: 취소권자의 의사표시 있을 때까지 유효, 취소 시 소급 무효' },
        { id: 10, question: '소멸시효의 기산점과 중단사유는?', answer: '기산점: 권리를 행사할 수 있는 때 / 중단사유: 청구, 압류·가압류·가처분, 승인' }
      ]
    },
    {
      name: '물권법',
      questions: [
        { id: 11, question: '물권법정주의의 의미와 예외는?', answer: '물권은 법률 또는 관습법에 의해서만 창설 가능. 예외: 관습법상 물권(분묘기지권, 관습법상 법정지상권 등)' },
        { id: 12, question: '물권변동의 성립요건주의와 대항요건주의는?', answer: '성립요건주의(우리나라): 등기해야 물권변동 효력 발생 / 대항요건주의: 등기 없이도 당사자 간 효력, 제3자 대항 시 등기 필요' },
        { id: 13, question: '부동산 물권변동에서 의사주의와 형식주의는?', answer: '의사주의: 의사표시만으로 물권변동 / 형식주의(우리나라): 등기라는 형식 필요' },
        { id: 14, question: '등기의 추정력과 공신력은?', answer: '추정력: 등기와 일치하는 실체적 권리관계가 있다고 추정 / 공신력: 우리나라는 등기 공신력 불인정(선의취득 불가)' },
        { id: 15, question: '점유권의 효력(점유보호청구권)은?', answer: '점유물반환청구권, 점유물방해제거청구권, 점유물방해예방청구권' },
        { id: 16, question: '소유권에 기한 물권적 청구권의 종류는?', answer: '소유물반환청구권(제213조), 소유물방해제거청구권(제214조), 소유물방해예방청구권(제214조)' },
        { id: 17, question: '공동소유의 세 가지 유형은?', answer: '공유: 지분에 따른 소유, 합유: 조합체 소유, 총유: 법인 아닌 사단 소유' },
        { id: 18, question: '지상권, 지역권, 전세권의 차이점은?', answer: '지상권: 타인 토지에 건물·공작물 소유 / 지역권: 타인 토지를 자기 토지 편익에 이용 / 전세권: 전세금 지급 후 타인 부동산 사용·수익' },
        { id: 19, question: '저당권과 근저당권의 차이점은?', answer: '저당권: 특정 채권 담보 / 근저당권: 채권최고액 범위 내 불특정 다수 채권 담보, 계속적 거래관계에 적합' },
        { id: 20, question: '유치권의 성립요건과 효력은?', answer: '성립요건: 타인 물건 점유, 채권이 그 물건에 관하여 생긴 것, 채권의 변제기 도래 / 효력: 유치적 효력, 경매권' }
      ]
    },
    {
      name: '채권총론',
      questions: [
        { id: 21, question: '채무불이행의 유형 세 가지는?', answer: '이행지체(이행 가능하나 기한 도과), 이행불능(이행 불가능), 불완전이행(하자 있는 이행)' },
        { id: 22, question: '손해배상의 범위(제393조)는?', answer: '통상손해: 당연히 배상 / 특별손해: 채무자가 알았거나 알 수 있었던 경우에만 배상' },
        { id: 23, question: '과실상계와 손익상계란?', answer: '과실상계: 채권자 과실 참작하여 배상액 결정 / 손익상계: 채무불이행으로 얻은 이익 공제' },
        { id: 24, question: '채권자대위권의 요건과 효과는?', answer: '요건: 피보전채권 존재, 채무자의 무자력, 채무자가 권리 행사 않을 것, 보전의 필요성 / 효과: 채무자에게 귀속' },
        { id: 25, question: '채권자취소권의 요건은?', answer: '사해행위, 채무자의 악의, 수익자·전득자의 악의 (무상행위는 선의도 취소 가능)' },
        { id: 26, question: '채권양도의 대항요건은?', answer: '채무자 대항요건: 양도인의 채무자에 대한 통지 또는 채무자의 승낙 / 제3자 대항요건: 확정일자 있는 증서' },
        { id: 27, question: '연대채무와 보증채무의 차이는?', answer: '연대채무: 각 채무자가 전부 이행 의무, 주채무와 독립 / 보증채무: 주채무에 부종하는 종된 채무' },
        { id: 28, question: '상계의 요건과 효과는?', answer: '요건: 쌍방 채무의 대립, 동종 목적, 변제기 도래 / 효과: 대등액에서 소멸, 상계적상 시로 소급' },
        { id: 29, question: '변제충당의 순서는?', answer: '지정충당 → 법정충당(비용, 이자, 원본 순)' },
        { id: 30, question: '경개와 면제, 혼동의 의미는?', answer: '경개: 신채무로 구채무 소멸 / 면제: 채권자의 일방적 의사표시로 소멸 / 혼동: 채권·채무가 동일인에게 귀속' }
      ]
    },
    {
      name: '채권각론(계약법)',
      questions: [
        { id: 31, question: '계약의 성립과 청약의 구속력은?', answer: '청약과 승낙의 합치로 성립. 청약은 도달 시 철회 불가(구속력), 승낙기간 내 효력 유지' },
        { id: 32, question: '동시이행항변권의 요건과 효과는?', answer: '요건: 쌍무계약상 채무, 상대방 채무 변제기 도래 / 효과: 이행 거절, 이행지체 불발생' },
        { id: 33, question: '위험부담에서 채권자주의와 채무자주의는?', answer: '채권자주의(우리 민법): 특정물 쌍무계약에서 채무자 귀책 없는 이행불능 시 반대급부 청구 가능 / 채무자주의: 반대급부도 소멸' },
        { id: 34, question: '계약해제와 해지의 차이는?', answer: '해제: 계약 소급 소멸, 원상회복 의무 / 해지: 장래에 대해서만 효력 소멸, 계속적 계약관계에 적용' },
        { id: 35, question: '매도인의 담보책임 유형은?', answer: '권리하자 담보책임: 타인 물건, 권리 제한 / 물건하자 담보책임: 하자 있는 물건' },
        { id: 36, question: '임대차에서 보증금 반환과 동시이행관계는?', answer: '임차인의 목적물 반환과 임대인의 보증금 반환은 동시이행관계 (판례)' },
        { id: 37, question: '주택임대차보호법상 대항력 요건은?', answer: '주택 인도 + 주민등록(전입신고). 익일 0시부터 대항력 취득' },
        { id: 38, question: '도급에서 수급인의 담보책임 기간은?', answer: '목적물 인도 후 1년 (건물 등 토지공작물: 5년, 석조·금속 등: 10년)' },
        { id: 39, question: '사무관리의 요건과 효과는?', answer: '요건: 타인 사무, 관리의사, 의무 없이, 본인 이익에 적합 / 효과: 관리자의 비용상환청구권' },
        { id: 40, question: '부당이득의 요건과 유형은?', answer: '요건: 이득, 손실, 인과관계, 법률상 원인 없음 / 유형: 급부부당이득, 침해부당이득' }
      ]
    },
    {
      name: '친족·상속법',
      questions: [
        { id: 41, question: '혼인의 성립요건(실질적·형식적)은?', answer: '실질적: 혼인의사 합치, 혼인적령, 근친혼 금지 / 형식적: 혼인신고' },
        { id: 42, question: '재판상 이혼사유(제840조)는?', answer: '배우자의 부정행위, 악의의 유기, 심히 부당한 대우, 3년 이상 생사불명, 기타 혼인을 계속할 수 없는 중대한 사유' },
        { id: 43, question: '친생추정과 친생부인의 소는?', answer: '친생추정: 혼인 중 출생자는 부의 자녀로 추정 / 친생부인의 소: 부·모가 그 사실을 안 날부터 2년 내 제기' },
        { id: 44, question: '입양의 요건과 파양사유는?', answer: '요건: 양친될 자 성년, 15세 미만자는 법정대리인 승낙 / 파양사유: 양친·양자 일방의 악의의 유기 등' },
        { id: 45, question: '상속의 순위는?', answer: '1순위: 직계비속, 2순위: 직계존속, 3순위: 형제자매, 4순위: 4촌 이내 방계혈족. 배우자는 1·2순위와 공동상속, 없으면 단독상속' },
        { id: 46, question: '대습상속의 요건은?', answer: '피상속인 사망 전에 상속인(직계비속·형제자매)이 사망·결격된 경우, 그 직계비속이 대습상속' },
        { id: 47, question: '상속의 승인과 포기는?', answer: '단순승인: 무한 책임 / 한정승인: 상속재산 한도 책임 / 포기: 상속 거부 (3개월 내 가정법원에 신고)' },
        { id: 48, question: '유류분 권리자와 유류분 비율은?', answer: '권리자: 직계비속, 배우자, 직계존속, 형제자매 / 비율: 직계비속·배우자 1/2, 직계존속·형제자매 1/3' },
        { id: 49, question: '유언의 방식 5가지는?', answer: '자필증서, 녹음, 공정증서, 비밀증서, 구수증서 유언' },
        { id: 50, question: '유증과 사인증여의 차이는?', answer: '유증: 유언에 의한 무상증여, 단독행위 / 사인증여: 증여자 사망 시 효력 발생, 계약' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/category/legal/judicial-scrivener" className="text-gray-600 hover:text-violet-600">법무사</a>
            <span className="text-gray-300">›</span>
            <span className="text-violet-600 font-medium">민법</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-violet-600 to-purple-500 text-white py-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold">민법 학습</h1>
          <p className="text-violet-200 mt-1">법무사 1차 시험 핵심과목 · 50문항</p>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-violet-200 mt-2">{completedQuestions.length}/{totalQuestions} 완료 ({progress}%)</p>
        </div>
      </section>

      {/* Content */}
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
                <span className={`transform transition ${expandedTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedTopics.includes(topicIndex) && (
                <div className="border-t">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 border-b last:border-b-0 ${completedQuestions.includes(q.id) ? 'bg-violet-50' : ''}`}>
                      <div className="flex gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            completedQuestions.includes(q.id)
                              ? 'bg-violet-500 border-violet-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mt-2 bg-gray-100 p-2 rounded">{q.answer}</p>
                          <button
                            onClick={() => {
                              setCurrentPrompt(`법무사 시험 민법 문제입니다.

문제: ${q.question}

다음 순서로 설명해주세요:
1. 핵심 개념 정리
2. 상세 설명 (관련 조문 포함)
3. 판례 또는 적용 예시
4. 관련 개념 연결
5. 연습문제 3개`);
                              if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } if (!isPaid) { alert('결제 후 이용할 수 있는 기능입니다.'); return; } setShowAIModal(true);
                            }}
                            className="mt-2 px-3 py-1 bg-violet-100 text-violet-600 rounded-lg text-sm hover:bg-violet-200 transition"
                          >
                            🤖 AI
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

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <a href="/category/legal/judicial-scrivener" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            ← 법무사 메인
          </a>
          <a href="/category/legal/judicial-scrivener/study/civil-execution" className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition">
            민사집행법 →
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
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
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
