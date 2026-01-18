'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function BodyAssessmentPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('loss-adjuster-body-assessment-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('loss-adjuster-body-assessment-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => {
    setCurrentQuestion(q);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '상해보험 손해사정',
      questions: [
        { id: 'ba1-1', q: '상해의 보험적 정의는?', a: '급격하고 우연한 외래의 사고로 인한 신체의 손상입니다. 세 가지 요건(급격성, 우연성, 외래성)을 모두 충족해야 합니다.' },
        { id: 'ba1-2', q: '급격성의 의미는?', a: '사고 발생이 갑작스럽고 예기치 못한 것이어야 합니다. 서서히 진행되는 질병과 구별되는 요건입니다.' },
        { id: 'ba1-3', q: '우연성의 의미는?', a: '피보험자의 의사에 의하지 않은 사고여야 합니다. 고의 사고는 보상에서 제외됩니다.' },
        { id: 'ba1-4', q: '외래성의 의미는?', a: '신체 외부의 원인에 의한 사고여야 합니다. 내부적 원인(질병)으로 인한 손해와 구별됩니다.' },
        { id: 'ba1-5', q: '상해보험 보상 항목은?', a: '①사망보험금, ②후유장해보험금, ③입원의료비, ④통원의료비, ⑤휴업손해 등입니다.' },
        { id: 'ba1-6', q: '상해와 질병의 경합 시 처리는?', a: '상해의 기여도를 평가하여 그 비율만큼 보상합니다. 기왕증(기존 질병)이 있으면 기여도를 감액합니다.' },
        { id: 'ba1-7', q: '상해보험 면책사항은?', a: '고의 자해, 자살, 범죄행위, 음주·무면허 운전 중 사고, 전쟁·내란 등이 면책됩니다.' },
        { id: 'ba1-8', q: '직업·직종에 따른 보험료 차이는?', a: '위험등급에 따라 보험료가 다릅니다. 고위험 직종(광부, 잠수부 등)은 할증됩니다.' },
        { id: 'ba1-9', q: '상해사고 조사의 핵심은?', a: '사고경위 확인, 상해와 사고의 인과관계 입증, 기왕증 유무 확인이 중요합니다.' },
        { id: 'ba1-10', q: '골절 상해의 분류는?', a: '단순골절, 복합골절, 개방골절 등으로 분류합니다. 골절 부위와 정도에 따라 보상액이 다릅니다.' }
      ]
    },
    {
      title: '후유장해 평가',
      questions: [
        { id: 'ba2-1', q: '후유장해의 정의는?', a: '치료 종결 후 더 이상 회복이 어려운 영구적 신체기능 저하 상태입니다. 증상 고정 후 평가합니다.' },
        { id: 'ba2-2', q: '후유장해등급표의 구조는?', a: '1급~14급(또는 80%~3%)으로 구분됩니다. 신체부위별, 장해 정도별로 등급이 정해져 있습니다.' },
        { id: 'ba2-3', q: '장해지급률 산정방법은?', a: '장해등급표에 따른 지급률입니다. 복합장해 시 합산방식(가산, 병합 등)을 적용합니다.' },
        { id: 'ba2-4', q: '복합장해의 합산원칙은?', a: '동일 부위 장해는 상위등급 적용, 다른 부위 장해는 합산합니다. 최고 100%를 초과할 수 없습니다.' },
        { id: 'ba2-5', q: '관절운동범위(ROM) 측정은?', a: '각도기로 관절의 운동가능 범위를 측정합니다. 정상치 대비 제한 정도로 장해율을 산정합니다.' },
        { id: 'ba2-6', q: '노동능력상실률의 개념은?', a: '후유장해로 인한 노동능력 감소 비율입니다. 맥브라이드 방식 등으로 산정합니다.' },
        { id: 'ba2-7', q: '기왕장해의 처리방법은?', a: '사고 전 기존 장해율을 공제합니다. 신규 장해율 - 기왕장해율 = 최종 지급률입니다.' },
        { id: 'ba2-8', q: '장해 평가 시기는?', a: '증상 고정(치료 종결) 후 평가합니다. 통상 사고 후 6개월~2년 사이에 평가합니다.' },
        { id: 'ba2-9', q: '정신·신경장해 평가의 특수성은?', a: '객관적 측정이 어려워 전문의 진단에 의존합니다. 지능검사, 심리검사 등을 활용합니다.' },
        { id: 'ba2-10', q: '추후치료비 인정기준은?', a: '장래 확실히 예상되는 치료비입니다. 의학적 필요성과 상당인과관계가 입증되어야 합니다.' }
      ]
    },
    {
      title: '의료비 적정성 심사',
      questions: [
        { id: 'ba3-1', q: '의료비 심사의 목적은?', a: '사고와 인과관계 있는 적정 의료비만 보상하기 위함입니다. 과잉진료, 사기 방지가 목적입니다.' },
        { id: 'ba3-2', q: '급여와 비급여 구분은?', a: '급여는 국민건강보험 적용 항목, 비급여는 비적용 항목입니다. 실손보험은 비급여 위주로 담보합니다.' },
        { id: 'ba3-3', q: '의료비 청구서류는?', a: '진료비 계산서, 진료비 세부내역서, 진단서, 의무기록 사본 등이 필요합니다.' },
        { id: 'ba3-4', q: '적정 입원기간 판단기준은?', a: '질환의 중증도, 치료 필요성, 통원치료 가능성 등을 고려합니다. 과다 입원은 감액됩니다.' },
        { id: 'ba3-5', q: '한방치료비 인정범위는?', a: '상해 치료에 필요한 경우 인정됩니다. 양방치료와 중복 시 필요성을 심사합니다.' },
        { id: 'ba3-6', q: '상급병실료 차액 인정기준은?', a: '의학적 필요성이 있거나 병실 사정으로 불가피한 경우 일정한도 내 인정합니다.' },
        { id: 'ba3-7', q: '사고와 무관한 치료비 처리는?', a: '사고와 인과관계 없는 기왕증 치료비는 제외합니다. 인과관계 입증책임은 청구인에게 있습니다.' },
        { id: 'ba3-8', q: '약제비 적정성 심사는?', a: '처방된 약제가 상해 치료에 적정한지 검토합니다. 허가범위 초과 사용은 제한됩니다.' },
        { id: 'ba3-9', q: '진료수가 기준은?', a: '건강보험 요양급여 기준에 따릅니다. 비급여 항목은 통상적 비용을 기준으로 합니다.' },
        { id: 'ba3-10', q: '의료자문의 역할은?', a: '치료의 적정성, 인과관계, 장해평가 등에 대해 의학적 의견을 제시합니다.' }
      ]
    },
    {
      title: '휴업손해 산정',
      questions: [
        { id: 'ba4-1', q: '휴업손해의 정의는?', a: '상해로 인해 일을 하지 못하여 발생한 소득감소액입니다. 실제 소득감소를 입증해야 합니다.' },
        { id: 'ba4-2', q: '휴업손해 산정공식은?', a: '일평균 소득 × 휴업일수 × 노동능력상실률입니다. 100% 휴업은 전액 인정됩니다.' },
        { id: 'ba4-3', q: '일평균 소득 산정방법은?', a: '사고 전 3개월~1년간의 평균소득을 산정합니다. 소득증명이 어려우면 통계소득을 적용합니다.' },
        { id: 'ba4-4', q: '급여소득자 휴업손해는?', a: '월급 - 유급휴가·병가 차감 후 실제 감소액입니다. 상여금, 각종 수당도 포함됩니다.' },
        { id: 'ba4-5', q: '자영업자 휴업손해는?', a: '매출감소액 - 변동비 절감액입니다. 세금신고서, 장부 등으로 소득을 입증합니다.' },
        { id: 'ba4-6', q: '주부 휴업손해 인정여부는?', a: '가사노동의 경제적 가치를 인정합니다. 통계청 가계생산 위성계정 등을 기준으로 합니다.' },
        { id: 'ba4-7', q: '무직자 휴업손해는?', a: '노동능력은 있으나 소득 입증이 어려운 경우, 일용근로자 임금 등을 적용할 수 있습니다.' },
        { id: 'ba4-8', q: '휴업기간 산정기준은?', a: '의사의 진단서 상 치료기간과 실제 회복기간을 고려합니다. 증상 고정까지의 기간입니다.' },
        { id: 'ba4-9', q: '부분휴업의 처리는?', a: '노동능력 일부 상실 시 그 비율만큼 휴업손해를 산정합니다. 100% 미만 휴업입니다.' },
        { id: 'ba4-10', q: '휴업손해와 일실수익의 차이는?', a: '휴업손해는 치료기간 중, 일실수익은 후유장해로 인한 장래 소득상실입니다.' }
      ]
    },
    {
      title: '위자료 산정기준',
      questions: [
        { id: 'ba5-1', q: '위자료의 법적 성격은?', a: '정신적 손해에 대한 배상입니다. 민법 제751조에 근거하며, 재산적 손해와 별도입니다.' },
        { id: 'ba5-2', q: '위자료 인정사유는?', a: '생명, 신체, 자유, 명예 등 인격적 법익 침해 시 인정됩니다. 상해보험에서는 주로 배상책임보험에서 적용됩니다.' },
        { id: 'ba5-3', q: '사망 시 위자료 산정은?', a: '피해자 본인, 유족(배우자, 부모, 자녀)에게 각각 인정됩니다. 법원 실무기준을 참조합니다.' },
        { id: 'ba5-4', q: '부상 시 위자료 산정은?', a: '상해 정도, 치료기간, 후유장해 정도 등을 고려합니다. 장해등급별 기준표를 활용합니다.' },
        { id: 'ba5-5', q: '위자료 감액 사유는?', a: '피해자 과실, 가해자의 사과·합의 노력, 피해자측 잘못 등으로 감액될 수 있습니다.' },
        { id: 'ba5-6', q: '정신적 고통 입증방법은?', a: '직접 입증이 어려워 상해 정도, 치료과정, 후유장해 등 객관적 사정으로 추정합니다.' },
        { id: 'ba5-7', q: '보험약관상 위자료 특약은?', a: '일부 보험에서 위자료 담보 특약이 있습니다. 가해자 배상책임보험에서 주로 보상합니다.' },
        { id: 'ba5-8', q: '위자료와 손해배상금의 관계는?', a: '손해배상 = 적극적 손해 + 소극적 손해 + 위자료입니다. 각각 별도로 산정 합산합니다.' },
        { id: 'ba5-9', q: '합의금과 위자료의 차이는?', a: '합의금은 당사자 간 협의금액, 위자료는 법률상 배상금입니다. 합의금이 위자료를 포함하기도 합니다.' },
        { id: 'ba5-10', q: '위자료 청구권 소멸시효는?', a: '손해 및 가해자를 안 날로부터 3년, 불법행위일로부터 10년입니다. 단, 생명·신체 침해는 특례가 있습니다.' }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">신체손해사정</h1>
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
