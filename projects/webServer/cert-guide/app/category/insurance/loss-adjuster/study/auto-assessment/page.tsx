'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function AutoAssessmentPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('loss-adjuster-auto-assessment-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('loss-adjuster-auto-assessment-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => {
    setCurrentQuestion(q);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '자동차보험 약관',
      questions: [
        { id: 'aa1-1', q: '자동차보험의 의무가입 담보는?', a: '대인배상Ⅰ(책임보험)은 의무가입입니다. 대인배상Ⅱ, 대물배상, 자기신체사고, 자기차량손해는 임의가입입니다.' },
        { id: 'aa1-2', q: '대인배상Ⅰ과 Ⅱ의 차이는?', a: 'Ⅰ은 자배법상 책임보험으로 사망 1.5억원, 부상 3천만원 한도. Ⅱ는 이를 초과하는 배상책임을 담보합니다.' },
        { id: 'aa1-3', q: '대물배상의 담보범위는?', a: '피보험자동차의 사고로 타인의 재물을 손괴하여 발생한 법률상 배상책임을 담보합니다.' },
        { id: 'aa1-4', q: '자기차량손해의 담보범위는?', a: '충돌, 접촉, 추락, 전복, 화재, 도난 등으로 인한 피보험자동차의 직접손해를 담보합니다.' },
        { id: 'aa1-5', q: '무보험차상해의 개념은?', a: '무보험자동차에 의한 사고로 피보험자가 상해를 입었을 때 가해자 대신 보상하는 담보입니다.' },
        { id: 'aa1-6', q: '자동차보험 피보험자의 범위는?', a: '기명피보험자, 친족, 승낙피보험자, 사용피보험자, 운전피보험자 등이 포함됩니다.' },
        { id: 'aa1-7', q: '음주운전 면책 기준은?', a: '혈중알코올농도 0.03% 이상 시 면책됩니다. 다만 피해자 보호를 위해 대인Ⅰ은 지급 후 구상합니다.' },
        { id: 'aa1-8', q: '무면허운전 면책 기준은?', a: '유효한 운전면허 없이 운전 시 면책입니다. 면허정지, 취소, 면허 외 차량 운전이 해당됩니다.' },
        { id: 'aa1-9', q: '보험료 할인·할증 제도는?', a: '사고 유무와 가입경력에 따라 보험료를 조정합니다. 무사고 할인, 사고 할증이 적용됩니다.' },
        { id: 'aa1-10', q: '긴급자동차 특례란?', a: '구급차, 소방차 등 긴급자동차 사고 시 특례가 적용됩니다. 과실상계에 특칙이 있습니다.' }
      ]
    },
    {
      title: '대물배상 손해사정',
      questions: [
        { id: 'aa2-1', q: '대물손해 배상책임 성립요건은?', a: '①피보험자동차의 운행, ②타인의 재물손괴, ③운행과 손해 간 인과관계, ④위법성·과실이 필요합니다.' },
        { id: 'aa2-2', q: '물적손해의 유형은?', a: '①수리비, ②대차료, ③휴차손해, ④격락손해, ⑤렌트비 등이 있습니다.' },
        { id: 'aa2-3', q: '수리비 산정원칙은?', a: '원상회복에 필요한 비용입니다. 적정 공임, 순정부품 기준, 과잉수리 제외가 원칙입니다.' },
        { id: 'aa2-4', q: '대차료 인정 범위는?', a: '수리기간 중 필요한 대체교통수단 비용입니다. 동급 차량 렌트비를 기준으로 합니다.' },
        { id: 'aa2-5', q: '휴차손해 산정방법은?', a: '영업용 차량이 수리기간 동안 얻지 못한 이익입니다. 일평균 수입-운행비용으로 산정합니다.' },
        { id: 'aa2-6', q: '격락손해(시가하락손해)란?', a: '수리 후에도 사고 전 가치로 회복되지 않는 감가손해입니다. 차량연식, 손상정도에 따라 산정합니다.' },
        { id: 'aa2-7', q: '전손 판정 기준은?', a: '수리비가 사고 직전 차량가액을 초과하거나, 물리적으로 수리불능인 경우 전손입니다.' },
        { id: 'aa2-8', q: '전손 시 보상금액은?', a: '사고 직전 시가에서 잔존물 가치를 공제한 금액입니다. 보험금액이 한도입니다.' },
        { id: 'aa2-9', q: '잔존물 처리방법은?', a: '전손 시 피보험자가 처분하거나, 보험회사가 인수합니다. 인수 시 잔존물 가치를 지급합니다.' },
        { id: 'aa2-10', q: '과실상계 적용방법은?', a: '피해자 과실비율만큼 손해액을 감액합니다. 과실비율은 사고유형별 기준과 수정요소로 판단합니다.' }
      ]
    },
    {
      title: '자기차량손해 사정',
      questions: [
        { id: 'aa3-1', q: '자차손해 담보사고의 유형은?', a: '①충돌·접촉, ②추락·전복, ③화재·폭발, ④도난, ⑤타물체 낙하·충격 등입니다.' },
        { id: 'aa3-2', q: '자차손해 면책사항은?', a: '고의사고, 음주·무면허운전, 영리목적 사용, 요금부정, 자연재해(지진, 분화) 등입니다.' },
        { id: 'aa3-3', q: '자기부담금의 종류는?', a: '①소손해면책(20만원), ②정액자기부담금(30·50·100만원 등), ③추가자기부담금이 있습니다.' },
        { id: 'aa3-4', q: '부분손해 시 손해액 산정은?', a: '수리비(부품비+공임)입니다. 다만 수리비가 차량가액을 초과하면 전손처리 합니다.' },
        { id: 'aa3-5', q: '도난손해의 처리절차는?', a: '경찰 신고→30일 경과→도난 확정→보험금 지급. 발견 시 피보험자에게 반환됩니다.' },
        { id: 'aa3-6', q: '부속품 손해 처리는?', a: '차량에 정착된 부속품은 담보됩니다. 탈착식 내비게이션 등은 별도 특약이 필요합니다.' },
        { id: 'aa3-7', q: '신차특약의 효과는?', a: '출고 후 일정 기간(1~2년) 내 전손 시 신차가격으로 보상합니다. 부분손해는 해당 없습니다.' },
        { id: 'aa3-8', q: '자차담보 보험가액 결정은?', a: '보험개발원이 공시하는 차량가격을 기준으로 합니다. 차량연식, 등급 등이 반영됩니다.' },
        { id: 'aa3-9', q: '손해방지비용 인정범위는?', a: '사고 후 추가손해 방지를 위한 합리적 비용입니다. 긴급견인료, 임시보호조치 비용 등입니다.' },
        { id: 'aa3-10', q: '타차운전담보의 개념은?', a: '타인 소유 차량을 운전 중 발생한 사고를 자신의 보험으로 처리하는 특약입니다.' }
      ]
    },
    {
      title: '자동차 수리비 산정',
      questions: [
        { id: 'aa4-1', q: '수리비 산정의 기본구조는?', a: '수리비 = 부품비 + 공임 + 부대비용입니다. 각 항목별로 적정성을 검토합니다.' },
        { id: 'aa4-2', q: '부품비 산정기준은?', a: '제작사 순정부품 가격이 기준입니다. 대체부품 사용 시 품질이 동등해야 합니다.' },
        { id: 'aa4-3', q: '공임 산정방법은?', a: '표준정비시간×시간당 공임입니다. 보험개발원 표준공임과 표준정비시간을 적용합니다.' },
        { id: 'aa4-4', q: '도장(페인팅) 비용 산정은?', a: '전도장, 부분도장, 컬러매칭 등에 따라 다릅니다. 도장범위와 공정을 확인합니다.' },
        { id: 'aa4-5', q: '판금·용접 비용 산정은?', a: '손상 정도에 따라 판금 또는 교환을 결정합니다. 판금공임은 난이도에 따라 차등적용됩니다.' },
        { id: 'aa4-6', q: '프레임 손상 수리비는?', a: '프레임 교정비, 얼라인먼트 조정비 등이 포함됩니다. 심한 경우 전손 판단 사유가 됩니다.' },
        { id: 'aa4-7', q: '수입차 수리비 특성은?', a: '부품 수입에 따른 비용 증가, 전문정비 필요 등으로 국산차보다 높습니다.' },
        { id: 'aa4-8', q: '과잉수리 판단기준은?', a: '사고와 무관한 수리, 불필요한 부품교환, 과다공수 적용 등을 검토합니다.' },
        { id: 'aa4-9', q: '수리 범위 분쟁의 해결은?', a: '현장사진, 손상도면, 정비내역서 등을 검토합니다. 이견 시 제3의 전문가 감정을 의뢰합니다.' },
        { id: 'aa4-10', q: '수리비와 차량가액 비교는?', a: '수리비가 차량가액의 약 80% 초과 시 경제적 전손을 검토합니다. 안전성도 고려합니다.' }
      ]
    },
    {
      title: '렌터카 및 휴차 손해',
      questions: [
        { id: 'aa5-1', q: '대차료(렌트비) 인정기준은?', a: '수리에 실제 소요되는 기간 동안의 합리적 비용입니다. 동급 차량 렌트비를 기준으로 합니다.' },
        { id: 'aa5-2', q: '대차 인정기간 산정은?', a: '입고일~출고일까지이며, 부품 입고대기, 공휴일 등 합리적 지연기간이 포함됩니다.' },
        { id: 'aa5-3', q: '대차료 감액 사유는?', a: '피해자 과실, 과다대차기간, 대중교통 이용 가능성 등에 따라 감액될 수 있습니다.' },
        { id: 'aa5-4', q: '동급차량 대차의 의미는?', a: '피해차량과 동일하거나 유사한 등급의 차량입니다. 배기량, 차종, 연식 등을 고려합니다.' },
        { id: 'aa5-5', q: '휴차손해 청구권자는?', a: '영업용 차량 소유자입니다. 택시, 화물차, 버스 등 영업에 직접 사용되는 차량이 대상입니다.' },
        { id: 'aa5-6', q: '휴차손해 산정공식은?', a: '(일평균 영업수입 - 운행변동비) × 휴차일수입니다. 실제 영업기록으로 산정합니다.' },
        { id: 'aa5-7', q: '운행변동비의 범위는?', a: '연료비, 통행료, 수리비 등 운행에 따라 발생하는 비용입니다. 고정비는 포함하지 않습니다.' },
        { id: 'aa5-8', q: '휴차손해 입증방법은?', a: '운행일지, 매출장부, 세금신고서, 동종업계 평균수입 등으로 입증합니다.' },
        { id: 'aa5-9', q: '대체차량 투입 시 휴차손해는?', a: '대체차량 투입 비용 또는 휴차손해 중 적은 금액으로 인정합니다.' },
        { id: 'aa5-10', q: '전손 시 휴차손해 기간은?', a: '수리불능 확정일까지 또는 대체차량 구입에 필요한 합리적 기간까지 인정합니다.' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = completedQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <section className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/insurance/loss-adjuster" className="inline-flex items-center text-red-100 hover:text-white mb-4 transition">← 손해사정사</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">차량손해사정</h1>
          <p className="text-red-100">2차 실기시험 과목</p>
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
                  <span className="bg-red-100 text-red-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">{idx + 1}</span>
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
                          className={`mt-1 w-5 h-5 rounded border-2 flex-shrink-0 ${completedQuestions.has(q.id) ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.has(q.id) && <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">{q.q}</p>
                          <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{q.a}</p>
                          <button onClick={() => handleAIHelp(q)} className="mt-2 text-red-600 text-sm hover:underline">🤖 AI에게 더 물어보기</button>
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
