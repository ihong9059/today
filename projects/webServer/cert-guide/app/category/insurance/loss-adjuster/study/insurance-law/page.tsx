'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function InsuranceLawPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('loss-adjuster-insurance-law-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('loss-adjuster-insurance-law-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => {
    setCurrentQuestion(q);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '보험업법 총칙',
      questions: [
        { id: 'il1-1', q: '보험업법의 목적은?', a: '보험업을 건전하게 육성하고 보험계약자, 피보험자, 그 밖의 이해관계인의 권익을 보호하여 국민경제의 균형 있는 발전에 이바지함을 목적으로 합니다.' },
        { id: 'il1-2', q: '보험업법상 "보험업"의 정의는?', a: '보험상품의 취급과 관련하여 발생하는 보험의 인수, 보험료 수수 및 보험금 지급 등을 영업으로 하는 것입니다.' },
        { id: 'il1-3', q: '보험회사가 될 수 있는 자는?', a: '보험업법에 따라 허가를 받은 자만이 보험업을 영위할 수 있습니다. 주식회사 또는 상호회사의 형태로 설립해야 합니다.' },
        { id: 'il1-4', q: '생명보험업과 손해보험업의 겸영 금지 원칙은?', a: '생명보험업과 손해보험업은 겸영할 수 없습니다. 다만 제3보험은 양쪽 모두 취급 가능합니다.' },
        { id: 'il1-5', q: '보험업 허가의 종류는?', a: '생명보험업, 손해보험업, 제3보험업으로 구분됩니다. 각 보험업 내에서 보험종목별로 허가를 받아야 합니다.' },
        { id: 'il1-6', q: '보험업 허가 요건은?', a: '①자본금 또는 기금 충족, ②임원 적격성, ③사업계획의 타당성, ④보험계약자 보호가 가능한 재무건전성 등입니다.' },
        { id: 'il1-7', q: '최소 자본금/기금 요건은?', a: '생명보험업 200억원, 손해보험업 300억원, 보증보험업 300억원 이상입니다. 보험종목별로 추가 요건이 있습니다.' },
        { id: 'il1-8', q: '보험회사의 임원 적격성 요건은?', a: '금고 이상의 형을 받고 5년이 경과하지 않은 자, 파산선고 후 복권되지 않은 자 등은 임원이 될 수 없습니다.' },
        { id: 'il1-9', q: '외국보험회사의 국내영업 요건은?', a: '금융위원회의 허가를 받고, 국내대표자를 선임하며, 영업기금을 예치해야 합니다.' },
        { id: 'il1-10', q: '보험업법 위반시 제재는?', a: '허가 취소, 영업정지, 업무개선명령, 과징금, 과태료 등이 있으며, 형사처벌도 가능합니다.' }
      ]
    },
    {
      title: '보험회사의 설립과 운영',
      questions: [
        { id: 'il2-1', q: '보험회사의 조직형태는?', a: '주식회사 또는 상호회사입니다. 주식회사는 영리법인, 상호회사는 비영리사단법인의 성격을 갖습니다.' },
        { id: 'il2-2', q: '상호회사의 특징은?', a: '보험계약자가 사원이 됩니다. 잉여금은 보험계약자에게 배당되고, 주주가 없어 이익배당 부담이 적습니다.' },
        { id: 'il2-3', q: '보험회사의 주요 기관은?', a: '주식회사는 주주총회, 이사회, 감사(위원회)이고, 상호회사는 사원총회(총대회), 이사회, 감사입니다.' },
        { id: 'il2-4', q: '기초서류란?', a: '보험약관, 사업방법서, 보험료 및 책임준비금 산출방법서입니다. 금융위원회에 신고해야 합니다.' },
        { id: 'il2-5', q: '보험약관 신고제도의 목적은?', a: '보험계약자 보호와 보험시장 질서 유지입니다. 불공정 조항 방지, 보험상품 적정성 심사를 위한 것입니다.' },
        { id: 'il2-6', q: '책임준비금이란?', a: '보험회사가 장래의 보험금 지급에 충당하기 위해 적립하는 금액입니다. 보험료적립금, 미경과보험료, 지급준비금 등으로 구성됩니다.' },
        { id: 'il2-7', q: '지급여력비율(RBC)이란?', a: '지급여력금액을 지급여력기준금액으로 나눈 비율입니다. 100% 이상을 유지해야 하며, 보험회사의 재무건전성 지표입니다.' },
        { id: 'il2-8', q: '재보험의 규제는?', a: '재보험 거래는 금융위원회에 보고해야 하며, 재보험자의 재무건전성을 고려한 거래가 요구됩니다.' },
        { id: 'il2-9', q: '자산운용 규제의 내용은?', a: '부동산, 주식, 대출 등에 대한 투자한도가 있습니다. 계열회사 투자 제한, 위험자산 투자한도 등이 있습니다.' },
        { id: 'il2-10', q: '경영공시 의무란?', a: '보험회사는 재무정보, 경영지표, 상품정보 등을 공시해야 합니다. 경영투명성 제고와 계약자 보호가 목적입니다.' }
      ]
    },
    {
      title: '보험모집 규제',
      questions: [
        { id: 'il3-1', q: '보험모집인의 종류는?', a: '보험설계사, 보험대리점, 보험중개사가 있습니다. 각각 모집행위의 범위와 법적 지위가 다릅니다.' },
        { id: 'il3-2', q: '보험설계사의 법적 지위는?', a: '보험회사를 위해 보험계약 체결을 중개하는 자입니다. 회사와 위임관계이며, 계약체결 권한은 없습니다.' },
        { id: 'il3-3', q: '보험대리점의 법적 지위는?', a: '보험회사를 대리하여 계약을 체결할 권한이 있습니다. 대리점의 행위는 보험회사의 행위로 간주됩니다.' },
        { id: 'il3-4', q: '보험중개사의 법적 지위는?', a: '독립적인 지위에서 계약자를 위해 보험계약 체결을 중개합니다. 계약자에 대해 선관주의의무를 부담합니다.' },
        { id: 'il3-5', q: '보험모집 시 설명의무란?', a: '보험상품의 주요 내용, 보험료, 보장범위, 면책사항 등을 계약자가 이해할 수 있도록 설명해야 합니다.' },
        { id: 'il3-6', q: '적합성 원칙이란?', a: '보험회사는 계약자의 연령, 재산상황, 보험가입목적 등을 파악하여 적합한 상품을 권유해야 합니다.' },
        { id: 'il3-7', q: '금지되는 모집행위는?', a: '허위·과장 광고, 특별이익 제공, 기존계약 부당 비교, 다른 모집종사자 비방 등이 금지됩니다.' },
        { id: 'il3-8', q: '특별이익 제공 금지란?', a: '보험료 할인, 사은품 제공 등 계약 유인을 위한 이익 제공이 금지됩니다. 공정한 경쟁을 위한 규정입니다.' },
        { id: 'il3-9', q: '승환계약 규제란?', a: '기존 보험계약을 해지하고 새로운 계약을 체결하게 하는 행위에 대한 규제입니다. 계약자 불이익 방지가 목적입니다.' },
        { id: 'il3-10', q: '청약 철회 제도란?', a: '보험계약자는 보험증권을 받은 날부터 15일 이내(통신판매는 30일)에 청약을 철회할 수 있습니다.' }
      ]
    },
    {
      title: '보험계약 보호',
      questions: [
        { id: 'il4-1', q: '예금자보호제도의 보험업 적용은?', a: '보험회사가 파산 시 예금보험공사가 1인당 5천만원까지 보험금 등을 지급합니다.' },
        { id: 'il4-2', q: '보험계약 이전제도란?', a: '부실 보험회사의 계약을 다른 보험회사로 이전하는 제도입니다. 계약자 보호를 위한 것입니다.' },
        { id: 'il4-3', q: '금융분쟁조정제도란?', a: '금융감독원에서 운영하며, 보험계약 관련 분쟁을 조정합니다. 소액사건은 조정결과가 재판상 화해와 동일한 효력이 있습니다.' },
        { id: 'il4-4', q: '보험금 지급지연 시 제재는?', a: '지연이자 지급의무가 있으며, 정당한 사유 없는 지연 시 과태료 등 제재를 받을 수 있습니다.' },
        { id: 'il4-5', q: '보험사기 규제는?', a: '보험사기방지특별법에 따라 보험사기는 10년 이하 징역 또는 5천만원 이하 벌금에 처합니다.' },
        { id: 'il4-6', q: '약관의 설명의무 위반 효과는?', a: '보험자가 약관의 중요 내용을 설명하지 않으면 해당 약관 조항을 계약 내용으로 주장할 수 없습니다.' },
        { id: 'il4-7', q: '약관의 불명확 조항 해석원칙은?', a: '작성자 불이익의 원칙에 따라 약관 작성자인 보험자에게 불리하게, 계약자에게 유리하게 해석합니다.' },
        { id: 'il4-8', q: '단체보험의 계약자 보호는?', a: '단체보험에서도 피보험자인 개인에게 약관 교부, 주요내용 설명의무가 있습니다.' },
        { id: 'il4-9', q: '온라인 보험계약의 보호는?', a: '전자서명, 중요사항 확인절차, 청약철회기간 연장(30일) 등 계약자 보호 장치가 있습니다.' },
        { id: 'il4-10', q: '보험금 청구권 소멸시효는?', a: '3년입니다. 보험금 청구권은 보험사고 발생 후 3년간 행사하지 않으면 소멸합니다.' }
      ]
    },
    {
      title: '손해사정 관련 조문',
      questions: [
        { id: 'il5-1', q: '손해사정사의 법적 정의는?', a: '보험업법 제186조에 따라 보험사고로 인한 손해액 및 보험금을 사정하는 업무를 수행하는 자입니다.' },
        { id: 'il5-2', q: '손해사정사의 자격요건은?', a: '금융위원회가 실시하는 시험에 합격하고 실무수습을 마친 후 금융감독원에 등록해야 합니다.' },
        { id: 'il5-3', q: '손해사정사의 등록 요건은?', a: '시험 합격, 실무수습 완료, 결격사유 해당 없음을 갖추어 금융감독원장에게 등록합니다.' },
        { id: 'il5-4', q: '손해사정사의 결격사유는?', a: '미성년자, 피성년후견인, 금고 이상 형 선고 후 3년 미경과자, 등록취소 후 3년 미경과자 등입니다.' },
        { id: 'il5-5', q: '손해사정업의 영업형태는?', a: '독립손해사정사(개인), 손해사정법인, 보험회사 소속 손해사정사가 있습니다.' },
        { id: 'il5-6', q: '손해사정서의 법적 효력은?', a: '손해사정서는 보험금 지급의 기초자료이며, 보험자와 계약자 모두에게 교부되어야 합니다.' },
        { id: 'il5-7', q: '손해사정사의 금지행위는?', a: '거짓 손해사정서 작성, 부당한 손해사정, 업무상 알게 된 비밀 누설, 타인에게 자격증 대여 등입니다.' },
        { id: 'il5-8', q: '손해사정사의 손해배상책임은?', a: '고의 또는 과실로 계약자 등에게 손해를 끼친 경우 배상책임이 있으며, 배상책임보험 가입이 의무입니다.' },
        { id: 'il5-9', q: '보험계약자의 손해사정사 선임권은?', a: '보험계약자는 자신의 비용으로 손해사정사를 선임하여 손해사정을 의뢰할 수 있습니다.' },
        { id: 'il5-10', q: '손해사정업무 관련 분쟁해결은?', a: '금융감독원의 분쟁조정제도를 이용하거나, 민사소송으로 해결할 수 있습니다.' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = completedQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/insurance/loss-adjuster" className="inline-flex items-center text-orange-100 hover:text-white mb-4 transition">← 손해사정사</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">보험업법</h1>
          <p className="text-orange-100">1차 시험 핵심 과목</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white/20 rounded-full px-4 py-2"><span className="font-bold">{completedCount}</span> / {totalQuestions} 완료</div>
            <div className="flex-1 max-w-xs bg-white/20 rounded-full h-3">
              <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setOpenTopic(openTopic === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">{idx + 1}</span>
                  <span className="font-semibold text-gray-800">{topic.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{topic.questions.filter(q => completedQuestions.has(q.id)).length}/{topic.questions.length}</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${openTopic === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openTopic === idx && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleComplete(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${completedQuestions.has(q.id) ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.has(q.id) && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{q.a}</p>
                          <button onClick={() => handleAIHelp(q)} className="mt-2 text-orange-600 text-sm hover:underline">🤖 AI에게 더 물어보기</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {showAIModal && currentQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-2">🤖 AI에게 질문하기</h3>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-1">선택한 문제:</p>
              <p className="font-medium text-gray-800">{currentQuestion.q}</p>
            </div>
            <div className="grid gap-2">
              <a href="https://claude.ai" target="_blank" className="flex items-center p-3 border rounded-lg hover:bg-orange-50 transition">
                <span className="text-xl mr-3">🟠</span><div><div className="font-semibold">Claude</div></div>
              </a>
              <a href="https://chat.openai.com" target="_blank" className="flex items-center p-3 border rounded-lg hover:bg-green-50 transition">
                <span className="text-xl mr-3">🟢</span><div><div className="font-semibold">ChatGPT</div></div>
              </a>
              <a href="https://gemini.google.com" target="_blank" className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition">
                <span className="text-xl mr-3">🔵</span><div><div className="font-semibold">Gemini</div></div>
              </a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
