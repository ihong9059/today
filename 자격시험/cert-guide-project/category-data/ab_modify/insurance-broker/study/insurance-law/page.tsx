'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InsuranceLawPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('insurance-broker-insurance-law-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('insurance-broker-insurance-law-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => { setCurrentQuestion(q); setShowAIModal(true); };

  const topics = [
    {
      title: '보험업법 총칙',
      questions: [
        { id: 'ibl1-1', q: '보험업법의 목적은?', a: '보험업을 건전하게 육성하고 보험계약자, 피보험자, 그 밖의 이해관계인의 권익을 보호하여 국민경제의 균형 있는 발전에 기여함.' },
        { id: 'ibl1-2', q: '보험업법상 보험업의 정의는?', a: '보험상품의 취급과 관련하여 발생하는 보험의 인수, 보험료 수수 및 보험금 지급 등을 영업으로 하는 것입니다.' },
        { id: 'ibl1-3', q: '생명보험업과 손해보험업의 겸영 금지 원칙은?', a: '한 회사가 생명보험업과 손해보험업을 동시에 영위할 수 없습니다. 다만 제3보험은 양쪽 모두 취급 가능합니다.' },
        { id: 'ibl1-4', q: '보험업 허가의 종류는?', a: '생명보험업, 손해보험업, 제3보험업으로 구분됩니다. 종목별로 세분화하여 허가합니다.' },
        { id: 'ibl1-5', q: '보험업 허가 최소 자본금은?', a: '생명보험업 200억원, 손해보험업 300억원, 보증보험업 300억원 이상입니다.' },
        { id: 'ibl1-6', q: '보험회사 임원의 결격사유는?', a: '금고 이상 형 선고 후 5년 미경과자, 파산 후 복권 안 된 자, 보험업법 위반으로 해임된 후 5년 미경과자 등.' },
        { id: 'ibl1-7', q: '외국보험회사의 국내 영업요건은?', a: '금융위원회 허가, 국내대표자 선임, 영업기금 예치(허가 최소 자본금의 50% 이상)가 필요합니다.' },
        { id: 'ibl1-8', q: '기초서류의 종류는?', a: '사업방법서, 보험약관, 보험료 및 책임준비금 산출방법서입니다. 금융위원회에 신고해야 합니다.' },
        { id: 'ibl1-9', q: '보험회사의 자산운용 규제는?', a: '위험자산 투자한도, 대출한도, 부동산 투자한도, 계열회사 투자제한 등이 있습니다.' },
        { id: 'ibl1-10', q: '지급여력비율(RBC)이란?', a: '지급여력금액/지급여력기준금액으로, 100% 이상 유지해야 합니다. 보험회사의 재무건전성 지표입니다.' }
      ]
    },
    {
      title: '보험계약법',
      questions: [
        { id: 'ibl2-1', q: '보험계약법의 법원(法源)은?', a: '상법 제4편 보험편(제638조~제739조)입니다. 강행규정과 임의규정이 혼재되어 있습니다.' },
        { id: 'ibl2-2', q: '편면적 강행규정이란?', a: '보험계약자에게 불리한 방향으로 약관 변경이 불가한 규정입니다. 계약자 보호를 위한 것입니다.' },
        { id: 'ibl2-3', q: '고지의무 위반의 효과는?', a: '보험자는 계약을 해지하고 보험금 지급을 거절할 수 있습니다. 다만 인과관계 없으면 지급해야 합니다.' },
        { id: 'ibl2-4', q: '고지의무 위반의 제척기간은?', a: '보험자가 안 날로부터 1개월, 계약 체결일로부터 3년입니다. 기간 경과 시 해지권 소멸.' },
        { id: 'ibl2-5', q: '보험계약의 무효사유는?', a: '①사기에 의한 계약, ②피보험이익 없는 계약, ③타인의 사망을 보험사고로 하는 계약에서 피보험자 동의 없는 경우 등.' },
        { id: 'ibl2-6', q: '손해보험계약에서 보험가액이란?', a: '피보험이익을 금전으로 평가한 금액입니다. 보험금 지급의 최고 한도가 됩니다.' },
        { id: 'ibl2-7', q: '보험금청구권의 소멸시효는?', a: '3년입니다. 보험사고 발생일이 기산점입니다. 시효 완성 시 청구권 소멸.' },
        { id: 'ibl2-8', q: '보험자대위의 요건은?', a: '①보험금 지급, ②제3자에 대한 권리 존재, ③지급보험금 한도 내에서 권리 취득입니다.' },
        { id: 'ibl2-9', q: '타인을 위한 보험계약이란?', a: '계약자가 타인(피보험자, 수익자)을 위해 체결하는 계약입니다. 수익자 지정 생명보험이 대표적.' },
        { id: 'ibl2-10', q: '보험수익자 변경권의 행사는?', a: '보험계약자가 보험사고 발생 전까지 보험자에게 통지하여 변경할 수 있습니다. 단, 피보험자 동의 필요 시 있음.' }
      ]
    },
    {
      title: '보험모집 규제',
      questions: [
        { id: 'ibl3-1', q: '보험모집인의 종류는?', a: '보험설계사, 보험대리점, 보험중개사입니다. 각각 법적 지위와 권한이 다릅니다.' },
        { id: 'ibl3-2', q: '보험설계사의 법적 지위는?', a: '보험회사를 위해 계약 체결을 중개하는 자입니다. 계약 체결권은 없고, 회사와 위임관계입니다.' },
        { id: 'ibl3-3', q: '보험대리점의 법적 지위는?', a: '보험회사를 대리하여 계약을 체결할 권한이 있습니다. 대리점의 행위는 회사의 행위로 간주됩니다.' },
        { id: 'ibl3-4', q: '보험중개사의 법적 지위는?', a: '독립적 지위에서 계약자를 위해 중개합니다. 계약자에 대해 선관주의의무, 충실의무를 부담합니다.' },
        { id: 'ibl3-5', q: '보험중개사와 대리점의 핵심 차이는?', a: '대리점은 보험회사 편, 중개사는 계약자 편입니다. 중개사는 복수 회사 상품을 비교 추천할 수 있습니다.' },
        { id: 'ibl3-6', q: '설명의무의 내용은?', a: '보험상품의 주요 내용, 보험료, 보장범위, 면책사항 등을 계약자가 이해할 수 있도록 설명해야 합니다.' },
        { id: 'ibl3-7', q: '적합성 원칙이란?', a: '계약자의 연령, 재산, 보험가입목적 등을 파악하여 적합한 상품을 권유해야 합니다.' },
        { id: 'ibl3-8', q: '금지되는 모집행위는?', a: '허위·과장 광고, 특별이익 제공, 기존계약 부당 비교, 승환계약 유도, 대출 강요 등입니다.' },
        { id: 'ibl3-9', q: '특별이익 제공 금지의 예외는?', a: '보험료 할인(허용 범위 내), 기념품(소액), 보험안내자료 등은 예외적으로 허용됩니다.' },
        { id: 'ibl3-10', q: '통신판매 보험의 특례는?', a: '청약철회기간 30일, 완전판매 모니터링 의무, 음성녹취 의무 등이 있습니다.' }
      ]
    },
    {
      title: '보험중개사 관련 규정',
      questions: [
        { id: 'ibl4-1', q: '보험중개사의 등록요건은?', a: '금융위원회 시험 합격, 실무수습 완료, 금융감독원 등록입니다. 결격사유 해당 시 등록 불가.' },
        { id: 'ibl4-2', q: '보험중개사의 결격사유는?', a: '미성년자, 피성년후견인, 금고 이상 형 선고 후 5년 미경과자, 등록취소 후 3년 미경과자 등.' },
        { id: 'ibl4-3', q: '보험중개사의 실무수습 기간은?', a: '보험중개법인에서 6개월 또는 보험회사에서 1년입니다. 수습 후 등록 신청 가능.' },
        { id: 'ibl4-4', q: '보험중개사의 영업형태는?', a: '개인 보험중개사 또는 보험중개법인 형태로 영업합니다. 법인은 5인 이상 중개사 필요.' },
        { id: 'ibl4-5', q: '보험중개사의 의무는?', a: '선관주의의무, 충실의무, 비밀유지의무, 이해충돌방지의무, 배상책임보험 가입의무 등.' },
        { id: 'ibl4-6', q: '보험중개사의 보수체계는?', a: '보험회사로부터 중개수수료를 받습니다. 계약자로부터 직접 수수료를 받을 수도 있습니다.' },
        { id: 'ibl4-7', q: '보험중개사의 배상책임보험 가입의무는?', a: '업무상 배상책임에 대비하여 의무적으로 가입해야 합니다. 미가입 시 영업 불가.' },
        { id: 'ibl4-8', q: '보험중개사의 금지행위는?', a: '보험회사 임직원 겸직, 보험료 대납, 허위 중개계약서 작성, 자격증 대여 등.' },
        { id: 'ibl4-9', q: '보험중개사 보수교육 의무는?', a: '등록갱신 시 보수교육을 이수해야 합니다. 전문성 유지와 법령 변경사항 숙지 목적.' },
        { id: 'ibl4-10', q: '보험중개사에 대한 제재는?', a: '등록취소, 업무정지(6개월 이내), 과태료 등이 있습니다. 금융감독원장이 처분.' }
      ]
    },
    {
      title: '금융소비자보호법',
      questions: [
        { id: 'ibl5-1', q: '금융소비자보호법의 목적은?', a: '금융소비자의 권익 증진과 금융상품판매업의 건전한 시장질서 구축입니다. 2021년 시행.' },
        { id: 'ibl5-2', q: '금융상품의 유형 구분은?', a: '①예금성, ②투자성, ③보장성, ④대출성 상품으로 구분합니다. 보험은 보장성 상품.' },
        { id: 'ibl5-3', q: '6대 판매행위 규제는?', a: '적합성원칙, 적정성원칙, 설명의무, 불공정영업행위금지, 부당권유금지, 허위광고금지입니다.' },
        { id: 'ibl5-4', q: '적합성원칙과 적정성원칙의 차이는?', a: '적합성: 권유 시 적합한 상품 추천 의무. 적정성: 계약자가 원하는 상품이 부적정하면 고지 의무.' },
        { id: 'ibl5-5', q: '설명의무 강화 내용은?', a: '중요사항 설명, 이해확인, 설명서 제공이 의무입니다. 위반 시 손해배상책임, 계약취소권.' },
        { id: 'ibl5-6', q: '청약철회권의 내용은?', a: '보장성 상품은 청약일부터 15일(통신판매 30일) 내 철회 가능. 이미 보장이 시작되면 제한.' },
        { id: 'ibl5-7', q: '위법계약 해지권이란?', a: '판매자의 위법행위로 계약한 경우 5년 내 해지 가능. 위반사실 안 날로부터 1년 내 행사.' },
        { id: 'ibl5-8', q: '손해배상책임 입증책임 전환이란?', a: '판매자의 고의·과실에 대해 판매자가 없음을 입증해야 합니다. 소비자 보호 강화.' },
        { id: 'ibl5-9', q: '분쟁조정제도의 특례는?', a: '소액분쟁(2천만원 이하)은 금융회사가 조정안을 수락한 것으로 간주됩니다.' },
        { id: 'ibl5-10', q: '과징금 제도란?', a: '위법행위로 얻은 수입의 50% 이내 과징금 부과. 판매자 책임 강화 수단입니다.' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = completedQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/insurance/insurance-broker" className="inline-flex items-center text-teal-100 hover:text-white mb-4 transition">← 보험중개사</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">보험관계법규</h1>
          <p className="text-teal-100">필기시험 핵심 과목</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white/20 rounded-full px-4 py-2"><span className="font-bold">{completedCount}</span> / {totalQuestions} 완료</div>
            <div className="flex-1 max-w-xs bg-white/20 rounded-full h-3"><div className="bg-white rounded-full h-3 transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }}></div></div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button onClick={() => setOpenTopic(openTopic === idx ? null : idx)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-4">
                  <span className="bg-teal-100 text-teal-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">{idx + 1}</span>
                  <span className="font-semibold text-gray-800">{topic.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{topic.questions.filter(q => completedQuestions.has(q.id)).length}/{topic.questions.length}</span>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${openTopic === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              {openTopic === idx && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleComplete(q.id)} className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${completedQuestions.has(q.id) ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.has(q.id) && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{q.a}</p>
                          <button onClick={() => handleAIHelp(q)} className="mt-2 text-teal-600 text-sm hover:underline">🤖 AI에게 더 물어보기</button>
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-2">🤖 AI에게 질문하기</h3>
            <div className="bg-gray-50 p-3 rounded-lg mb-4"><p className="text-sm text-gray-600 mb-1">선택한 문제:</p><p className="font-medium text-gray-800">{currentQuestion.q}</p></div>
            <div className="grid gap-2">
              <a href="https://claude.ai" target="_blank" className="flex items-center p-3 border rounded-lg hover:bg-teal-50"><span className="text-xl mr-3">🟠</span><div className="font-semibold">Claude</div></a>
              <a href="https://chat.openai.com" target="_blank" className="flex items-center p-3 border rounded-lg hover:bg-green-50"><span className="text-xl mr-3">🟢</span><div className="font-semibold">ChatGPT</div></a>
              <a href="https://gemini.google.com" target="_blank" className="flex items-center p-3 border rounded-lg hover:bg-blue-50"><span className="text-xl mr-3">🔵</span><div className="font-semibold">Gemini</div></a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
