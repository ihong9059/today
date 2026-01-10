'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DamageAssessmentPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('loss-adjuster-damage-assessment-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('loss-adjuster-damage-assessment-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => {
    setCurrentQuestion(q);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '손해사정의 개념',
      questions: [
        { id: 'da1-1', q: '손해사정(Loss Adjustment)의 정의는?', a: '보험사고 발생 시 손해액과 보험금을 객관적으로 평가·산정하는 행위입니다. 보험자와 계약자 간의 공정한 보험금 결정을 위한 전문 업무입니다.' },
        { id: 'da1-2', q: '손해사정사의 역할은?', a: '①손해발생 사실 확인, ②보험약관 적용 판단, ③손해액 산정, ④보험금 산출, ⑤손해사정서 작성 등을 수행합니다.' },
        { id: 'da1-3', q: '손해사정의 기본 원칙은?', a: '①공정성(Fairness), ②정확성(Accuracy), ③신속성(Promptness), ④전문성(Expertise)입니다.' },
        { id: 'da1-4', q: '손해사정사의 독립성 원칙이란?', a: '손해사정은 보험자나 계약자 어느 한쪽에 치우치지 않고 객관적이고 공정하게 수행되어야 합니다.' },
        { id: 'da1-5', q: '고용손해사정사와 독립손해사정사의 차이는?', a: '고용손해사정사는 보험회사 소속이고, 독립손해사정사는 손해사정법인 또는 개인사업자로 독립적 지위에서 업무를 수행합니다.' },
        { id: 'da1-6', q: '손해사정의 법적 근거는?', a: '보험업법 제185조~제190조에 손해사정에 관한 규정이 있습니다. 손해사정사 자격, 등록, 의무 등을 규정합니다.' },
        { id: 'da1-7', q: '손해사정 업무의 범위는?', a: '재물손해사정(1종), 차량손해사정(2종), 신체손해사정(3종)으로 구분됩니다.' },
        { id: 'da1-8', q: '손해사정서의 필수 기재사항은?', a: '①사고개요, ②손해조사 내용, ③손해액 산정근거, ④보험금 산출내역, ⑤손해사정사 의견 등입니다.' },
        { id: 'da1-9', q: '손해사정 분쟁의 해결방법은?', a: '금융감독원 분쟁조정, 중재, 민사소송 등이 있습니다. 소액사건은 조정 결정이 재판상 화해와 같은 효력이 있습니다.' },
        { id: 'da1-10', q: '손해사정의 윤리강령은?', a: '공정성, 정직성, 전문성, 비밀유지, 이해충돌 방지 등을 포함합니다.' }
      ]
    },
    {
      title: '손해사정 절차',
      questions: [
        { id: 'da2-1', q: '손해사정의 일반적 절차는?', a: '접수→현장조사→원인분석→손해액산정→약관적용→보험금산출→손해사정서작성→결과통보 순입니다.' },
        { id: 'da2-2', q: '사고 접수 시 확인할 사항은?', a: '①사고일시·장소, ②사고경위, ③피해상황, ④계약내용, ⑤타보험 가입여부 등을 확인합니다.' },
        { id: 'da2-3', q: '현장조사의 목적은?', a: '사고현장 확인, 손해 범위 파악, 사고원인 규명, 증거자료 수집입니다.' },
        { id: 'da2-4', q: '현장조사 시 수집할 자료는?', a: '사진, 도면, 관계자 진술서, 관련 서류, 물적 증거 등입니다.' },
        { id: 'da2-5', q: '손해 원인 분석의 중요성은?', a: '보험 담보 여부 판단, 면책 해당 여부 확인, 구상권 행사 가부 결정에 필요합니다.' },
        { id: 'da2-6', q: '면책사유 조사의 범위는?', a: '고의사고, 중과실, 법령위반, 면책기간 사고, 고지의무위반 관련 사항 등을 조사합니다.' },
        { id: 'da2-7', q: '손해액 산정 시 고려사항은?', a: '①직접손해와 간접손해, ②재조달가액과 시가, ③감가상각, ④잔존물가치 등을 고려합니다.' },
        { id: 'da2-8', q: '보험금 산출 시 적용하는 조항은?', a: '보험가액, 보험금액, 자기부담금, 비례보상, 면책금액 등의 약관 조항을 적용합니다.' },
        { id: 'da2-9', q: '손해사정서 작성의 요건은?', a: '객관적 사실 기재, 법적 근거 명시, 산정근거 상세 설명, 논리적 구성이 필요합니다.' },
        { id: 'da2-10', q: '손해사정 결과 통보 의무는?', a: '손해사정이 완료되면 보험계약자에게 손해사정서 사본을 교부해야 합니다(보험업법 제189조).' }
      ]
    },
    {
      title: '손해액 산정 원칙',
      questions: [
        { id: 'da3-1', q: '시가(時價)의 개념은?', a: '보험사고 발생 시점의 해당 물건의 시장가치입니다. 동종·동질물의 거래가격을 기준으로 산정합니다.' },
        { id: 'da3-2', q: '재조달가액(Replacement Cost)이란?', a: '손해 발생 당시 동일 용도의 물건을 재취득하는 데 필요한 금액입니다. 감가상각을 적용하지 않습니다.' },
        { id: 'da3-3', q: '감가상각(Depreciation)의 계산방법은?', a: '정액법, 정률법, 내용연수법 등이 있습니다. 취득가액에서 경과연수에 따른 가치감소액을 공제합니다.' },
        { id: 'da3-4', q: '실손보상원칙의 적용은?', a: '손해보험에서 실제 손해액만 보상합니다. 보험금이 손해액을 초과하면 초과분은 지급하지 않습니다.' },
        { id: 'da3-5', q: '비례보상(Pro-rata)의 개념은?', a: '보험금액이 보험가액보다 적은 일부보험 시, 손해액 × (보험금액/보험가액)으로 보험금을 산출합니다.' },
        { id: 'da3-6', q: '자기부담금(Deductible)의 종류는?', a: '면책금액형(Straight Deductible), 손해참가형(Loss Participation), 프랜차이즈형이 있습니다.' },
        { id: 'da3-7', q: '잔존물 공제란?', a: '손해액에서 잔존물(Salvage)의 가치를 공제하는 것입니다. 잔존물대위를 통해 보험자가 처분권을 취득합니다.' },
        { id: 'da3-8', q: '간접손해(Consequential Loss)의 범위는?', a: '영업손실, 휴업손해, 추가비용 등입니다. 약관에 명시된 경우에만 보상합니다.' },
        { id: 'da3-9', q: '손해방지비용의 처리는?', a: '손해의 방지·경감을 위해 지출한 합리적 비용은 보험금과 별도로 보상합니다.' },
        { id: 'da3-10', q: '대위권 행사의 조건은?', a: '보험금 지급 후 제3자에게 구상권을 행사합니다. 지급보험금 한도 내에서 권리를 취득합니다.' }
      ]
    },
    {
      title: '보험금 지급기준',
      questions: [
        { id: 'da4-1', q: '보험금 지급의 법적 기한은?', a: '접수일로부터 30일 이내입니다. 조사가 필요한 경우 추가 기간이 허용되나, 지연사유를 통보해야 합니다.' },
        { id: 'da4-2', q: '보험금 지급지연 시 이자는?', a: '지급기일 초과 시 지연이자를 가산합니다. 약관에서 정한 이율(보통 보험개발원 공시이율+α)을 적용합니다.' },
        { id: 'da4-3', q: '일부보험의 보험금 산출은?', a: '손해액 × (보험금액/보험가액)으로 비례보상합니다. 계약자 과실 여부와 관계없이 적용됩니다.' },
        { id: 'da4-4', q: '초과보험의 효과는?', a: '보험금액이 보험가액을 초과하면 초과 부분은 무효입니다. 손해액 한도에서만 보상합니다.' },
        { id: 'da4-5', q: '중복보험의 보험금 분담은?', a: '각 보험자가 독립책임액 한도로 연대책임을 지거나, 보험금액 비율로 분담합니다.' },
        { id: 'da4-6', q: '실손의료비 보험금 산출 특례는?', a: '다수보험 가입 시 비례분담합니다. 표준약관에 따라 분담 순서와 방법이 정해져 있습니다.' },
        { id: 'da4-7', q: '면책사항 적용 기준은?', a: '약관에 명시된 면책사항에 해당하면 보상하지 않습니다. 면책사유 입증책임은 보험자에게 있습니다.' },
        { id: 'da4-8', q: '보험금 감액 사유는?', a: '손해방지의무 위반, 통지의무 위반, 계약자 과실 등으로 손해가 확대된 경우 감액할 수 있습니다.' },
        { id: 'da4-9', q: '보험금 청구 소멸시효는?', a: '보험금청구권은 3년간 행사하지 않으면 시효로 소멸합니다. 보험사고 발생일이 기산점입니다.' },
        { id: 'da4-10', q: '가지급보험금이란?', a: '손해사정이 진행 중일 때 긴급하게 필요한 금액을 먼저 지급하는 것입니다. 최종 보험금에서 공제합니다.' }
      ]
    },
    {
      title: '손해사정 윤리',
      questions: [
        { id: 'da5-1', q: '손해사정사의 선관주의의무란?', a: '선량한 관리자로서 주의의무를 다해 업무를 수행해야 합니다. 위반 시 손해배상책임이 발생합니다.' },
        { id: 'da5-2', q: '비밀유지의무의 범위는?', a: '업무상 알게 된 계약자, 피보험자의 개인정보와 사고 관련 정보를 누설해서는 안 됩니다.' },
        { id: 'da5-3', q: '이해충돌 방지의무란?', a: '동일 사안에서 보험자와 계약자 양측을 위해 손해사정을 할 수 없습니다. 이해충돌 시 업무를 거절해야 합니다.' },
        { id: 'da5-4', q: '손해사정서 허위작성의 제재는?', a: '등록취소, 업무정지 등 행정처분과 형사처벌을 받을 수 있습니다.' },
        { id: 'da5-5', q: '부당한 손해사정의 예는?', a: '증거조작, 손해액 과다·과소 산정, 약관 자의적 해석, 청탁수수 등이 해당합니다.' },
        { id: 'da5-6', q: '손해사정사 배상책임보험 가입의무는?', a: '독립손해사정사와 손해사정법인은 배상책임보험에 가입해야 합니다. 업무상 배상책임에 대비하기 위한 것입니다.' },
        { id: 'da5-7', q: '자격증 대여 금지의 이유는?', a: '무자격자의 손해사정 업무 방지, 손해사정의 전문성·공정성 확보를 위한 것입니다.' },
        { id: 'da5-8', q: '손해사정사 교육이수의무는?', a: '등록갱신을 위해 정기적으로 보수교육을 이수해야 합니다. 전문성 유지와 법령 변경사항 숙지가 목적입니다.' },
        { id: 'da5-9', q: '손해사정 결과에 불복하는 방법은?', a: '금융감독원 분쟁조정 신청, 다른 손해사정사 선임, 소송 제기 등이 있습니다.' },
        { id: 'da5-10', q: '손해사정사 징계의 종류는?', a: '등록취소, 업무정지(6개월 이내), 견책이 있습니다. 금융감독원장이 처분합니다.' }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">손해사정이론</h1>
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
