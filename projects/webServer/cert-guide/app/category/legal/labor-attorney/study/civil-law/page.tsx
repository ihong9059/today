'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CivilLawStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('labor-attorney-civil-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('labor-attorney-civil-law-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (idx: number) => {
    setOpenTopics(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const topics = [
    {
      title: '권리능력과 행위능력',
      desc: '자연인, 법인, 제한능력자',
      questions: [
        { id: 1, q: '권리능력의 시기와 종기는?', a: '출생(전부노출설)으로 시작, 사망으로 종료' },
        { id: 2, q: '태아의 권리능력에 관한 입법례는?', a: '개별적 보호주의(우리나라), 불법행위·상속·유증 등에서 인정' },
        { id: 3, q: '법인의 종류와 구별기준은?', a: '사단법인/재단법인, 영리법인/비영리법인으로 구분' },
        { id: 4, q: '법인의 권리능력 제한 사유는?', a: '성질에 의한 제한, 법률에 의한 제한, 목적에 의한 제한' },
        { id: 5, q: '미성년자의 행위능력은?', a: '법정대리인의 동의 필요, 무동의 행위는 취소 가능' },
        { id: 6, q: '피성년후견인의 행위능력은?', a: '원칙적으로 성년후견인 동의 필요, 일용품 구입 등 예외' },
        { id: 7, q: '제한능력자의 상대방 보호제도는?', a: '철회권, 최고권, 거절권 인정' },
        { id: 8, q: '법인격부인론의 요건과 효과는?', a: '법인격 남용 시 예외적으로 배후자에게 책임 추궁' }
      ]
    },
    {
      title: '법률행위',
      desc: '의사표시, 무효와 취소',
      questions: [
        { id: 9, q: '법률행위의 성립요건과 효력요건은?', a: '성립: 당사자, 목적, 의사표시 / 효력: 확정성, 가능성, 적법성, 사회적 타당성' },
        { id: 10, q: '의사표시의 요소 3가지는?', a: '효과의사, 표시의사, 표시행위' },
        { id: 11, q: '진의 아닌 의사표시의 효력은?', a: '원칙 유효, 상대방이 악의인 경우 무효' },
        { id: 12, q: '통정허위표시의 효력은?', a: '당사자 간 무효, 선의의 제3자에게 대항 불가' },
        { id: 13, q: '착오로 인한 취소의 요건은?', a: '법률행위 내용의 중요부분 착오, 표의자에게 중과실 없을 것' },
        { id: 14, q: '사기·강박에 의한 의사표시의 효과는?', a: '취소 가능, 선의의 제3자에게 대항 불가' },
        { id: 15, q: '무효와 취소의 차이점은?', a: '무효는 처음부터 효력 없음, 취소는 취소 시까지 유효하다가 소급 무효' },
        { id: 16, q: '취소권의 행사기간과 방법은?', a: '추인 가능 시점부터 3년, 행위 시로부터 10년 내 상대방에게 의사표시' }
      ]
    },
    {
      title: '대리',
      desc: '대리권, 무권대리, 표현대리',
      questions: [
        { id: 17, q: '대리의 3면관계를 설명하시오.', a: '본인-대리인(대리권 수여), 대리인-상대방(대리행위), 본인-상대방(효과 귀속)' },
        { id: 18, q: '임의대리와 법정대리의 차이는?', a: '임의대리는 본인 수권으로, 법정대리는 법률규정에 의해 발생' },
        { id: 19, q: '현명의 원칙과 예외는?', a: '대리의사 표시 필요, 상대방이 알 수 있었으면 본인에게 효과' },
        { id: 20, q: '자기계약·쌍방대리 금지의 취지는?', a: '본인 이익 보호, 본인 허락 시 유효' },
        { id: 21, q: '복대리인의 법적 지위는?', a: '본인의 대리인이며, 원대리인은 복대리인 선임·감독 책임' },
        { id: 22, q: '무권대리행위의 효과는?', a: '본인에 대해 효력 없음, 추인 가능, 무권대리인은 상대방에게 책임' },
        { id: 23, q: '표현대리의 3가지 유형은?', a: '대리권 수여의 표시, 권한 유월, 대리권 소멸 후 표현대리' },
        { id: 24, q: '표현대리의 요건과 효과는?', a: '정당한 이유로 신뢰한 상대방 보호, 본인에게 효과 귀속' }
      ]
    },
    {
      title: '소멸시효',
      desc: '시효기간, 중단, 정지',
      questions: [
        { id: 25, q: '소멸시효의 의의와 존재이유는?', a: '권리불행사 상태의 계속으로 권리 소멸, 법적 안정성·증거보전' },
        { id: 26, q: '소멸시효의 일반원칙과 기간은?', a: '채권 10년, 채권·소유권 이외의 재산권 20년' },
        { id: 27, q: '단기소멸시효의 종류는?', a: '3년(의료·건축), 2년(도급·매매), 1년(음식·숙박)' },
        { id: 28, q: '소멸시효 기산점의 원칙은?', a: '권리를 행사할 수 있는 때부터 진행' },
        { id: 29, q: '소멸시효 중단사유는?', a: '청구(재판상/재판외), 압류·가압류·가처분, 승인' },
        { id: 30, q: '소멸시효 정지사유는?', a: '천재·전쟁, 무능력자, 부부 관계 등 일시적 장애' },
        { id: 31, q: '시효의 원용과 이익의 포기는?', a: '당사자가 원용해야 효력 발생, 시효완성 전 포기 불가' },
        { id: 32, q: '소멸시효 완성의 효과는?', a: '소급효(기산점으로 소급), 항변권 취득' }
      ]
    },
    {
      title: '채권총론',
      desc: '채권의 효력, 다수당사자',
      questions: [
        { id: 33, q: '채무불이행의 3가지 유형은?', a: '이행지체, 이행불능, 불완전이행' },
        { id: 34, q: '이행지체의 요건과 효과는?', a: '이행기 도과 + 이행 가능 + 귀책사유, 손해배상·계약해제 가능' },
        { id: 35, q: '이행불능의 판단기준은?', a: '물리적·법률적·사회관념상 불능 포함' },
        { id: 36, q: '손해배상의 범위는?', a: '통상손해 + 특별손해(예견 가능한 경우)' },
        { id: 37, q: '채권자대위권의 요건은?', a: '채권보전 필요, 채무자 무자력, 피보전채권 기한 도래' },
        { id: 38, q: '채권자취소권의 요건은?', a: '사해행위, 채권자 해하는 것을 알았을 것, 수익자 악의' },
        { id: 39, q: '연대채무의 효력은?', a: '채권자는 각 채무자에게 전부 청구 가능, 내부적 구상' },
        { id: 40, q: '보증채무의 특성은?', a: '부종성, 보충성, 수반성, 독립성' }
      ]
    },
    {
      title: '계약법',
      desc: '계약의 성립·효력, 해제·해지',
      questions: [
        { id: 41, q: '계약 성립의 일반원칙은?', a: '청약과 승낙의 합치로 성립' },
        { id: 42, q: '청약의 구속력과 철회는?', a: '원칙적으로 구속력, 도달 전 철회 가능' },
        { id: 43, q: '승낙기간의 효과는?', a: '기간 내 승낙 시 계약 성립, 연착된 승낙은 새로운 청약' },
        { id: 44, q: '동시이행항변권의 요건은?', a: '쌍무계약, 채무 변제기 도래, 상대방 불이행' },
        { id: 45, q: '위험부담의 원칙은?', a: '채무자주의(쌍무계약), 채권자주의(특정물 매매)' },
        { id: 46, q: '계약해제의 요건과 효과는?', a: '최고 + 불이행, 원상회복의무 발생, 손해배상 청구 가능' },
        { id: 47, q: '약정해제권과 법정해제권의 차이는?', a: '약정은 당사자 합의, 법정은 법률요건 충족 시' },
        { id: 48, q: '계약해지의 효과는?', a: '장래에 대해서만 효력 소멸, 소급효 없음' },
        { id: 49, q: '매매계약의 담보책임이란?', a: '매도인이 부담하는 하자·권리 하자에 대한 책임' },
        { id: 50, q: '불법행위의 성립요건은?', a: '고의·과실, 위법행위, 손해 발생, 인과관계' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm mb-2">
            <Link href="/category/legal/labor-attorney" className="text-gray-500 hover:text-gray-700">공인노무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">민법</span>
          </nav>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">📜 민법 핵심문제</h1>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-sm text-gray-600">{completedQuestions.length}/{totalQuestions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {topics.map((topic, tidx) => (
          <div key={tidx} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <button
              onClick={() => toggleTopic(tidx)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center font-bold">
                  {tidx + 1}
                </span>
                <div className="text-left">
                  <h2 className="font-bold">{topic.title}</h2>
                  <p className="text-sm text-gray-500">{topic.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length}
                </span>
                <span className={`transform transition ${openTopics.includes(tidx) ? 'rotate-180' : ''}`}>▼</span>
              </div>
            </button>

            {openTopics.includes(tidx) && (
              <div className="border-t divide-y">
                {topic.questions.map((q) => (
                  <div key={q.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                          completedQuestions.includes(q.id) ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300'
                        }`}
                      >
                        {completedQuestions.includes(q.id) && '✓'}
                      </button>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">{q.id}. {q.q}</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{q.a}</p>
                        <button
                          onClick={() => {
                            setCurrentPrompt(`공인노무사 시험 민법 문제입니다.

문제: ${q.q}

다음 순서로 상세히 설명해주세요:
1. 핵심 법리와 관련 조문
2. 대법원 판례와 해석
3. 노동관계에서의 적용
4. 시험 출제 포인트
5. 유사 개념과의 비교`);
                            if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } if (!isPaid) { alert('결제 후 이용할 수 있는 기능입니다.'); return; } setShowAIModal(true);
                          }}
                          className="mt-2 px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition"
                        >
                          🤖 AI 해설
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인노무사 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
