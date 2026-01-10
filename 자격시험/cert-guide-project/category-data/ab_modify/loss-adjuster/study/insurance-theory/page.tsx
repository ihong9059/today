'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InsuranceTheoryPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('loss-adjuster-insurance-theory-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('loss-adjuster-insurance-theory-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => {
    setCurrentQuestion(q);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '보험의 개념과 역사',
      questions: [
        { id: 'it1-1', q: '보험의 정의에서 가장 핵심적인 요소는?', a: '위험의 분산과 공동부담입니다. 다수의 경제주체가 우연한 사고에 대비하여 공동으로 재산을 출연하고, 사고 발생 시 그 재산으로 손실을 보전하는 제도입니다.' },
        { id: 'it1-2', q: '대수의 법칙(Law of Large Numbers)이 보험에서 갖는 의미는?', a: '관찰 대상의 수가 많을수록 실제 발생률이 예상 확률에 수렴합니다. 이를 통해 보험자는 위험률을 정확히 예측하고 적정 보험료를 산정할 수 있습니다.' },
        { id: 'it1-3', q: '근대 보험의 시초로 알려진 것은?', a: '14세기 이탈리아 해상보험입니다. 지중해 무역이 발달하면서 선박과 화물의 손실 위험을 분산하기 위해 발전했습니다.' },
        { id: 'it1-4', q: '보험과 도박의 차이점은?', a: '보험은 이미 존재하는 위험을 분산시키는 것이고, 도박은 인위적으로 위험을 창출합니다. 보험은 피보험이익이 있어야 하며 사회적으로 유용합니다.' },
        { id: 'it1-5', q: '공제(共濟)와 보험의 차이점은?', a: '공제는 특정 직역이나 단체 구성원만을 대상으로 하고, 보험은 불특정 다수를 대상으로 합니다. 공제는 상호부조 성격이 강합니다.' },
        { id: 'it1-6', q: '보험의 3대 기능은?', a: '①경제적 보장기능(손실보상), ②금융적 기능(보험료의 축적과 투자), ③사회적 기능(위험관리 촉진)입니다.' },
        { id: 'it1-7', q: '보험자(Insurer)의 정의는?', a: '보험계약의 당사자로서 보험료를 받고 보험사고 발생 시 보험금을 지급할 의무를 지는 자입니다. 보험회사가 이에 해당합니다.' },
        { id: 'it1-8', q: '보험료(Premium)의 구성요소는?', a: '순보험료(위험보험료+저축보험료)와 부가보험료(사업비)로 구성됩니다. 순보험료는 보험금 지급에, 부가보험료는 회사 운영비에 사용됩니다.' },
        { id: 'it1-9', q: '역선택(Adverse Selection)이란?', a: '위험이 높은 사람일수록 보험에 가입하려는 경향입니다. 정보 비대칭으로 발생하며, 보험자는 언더라이팅으로 이를 방지합니다.' },
        { id: 'it1-10', q: '도덕적 위험(Moral Hazard)이란?', a: '보험 가입 후 피보험자가 사고 방지에 소홀해지거나 고의로 사고를 유발하는 것입니다. 자기부담금, 면책조항 등으로 통제합니다.' }
      ]
    },
    {
      title: '보험의 원리와 기능',
      questions: [
        { id: 'it2-1', q: '수지상등의 원칙이란?', a: '보험료 총액 = 보험금 총액이 되어야 한다는 원칙입니다. P(보험료) × n(가입자수) = Z(사고율) × n × S(보험금)의 관계가 성립합니다.' },
        { id: 'it2-2', q: '급부반대급부 균등의 원칙이란?', a: '개별 계약자가 납입하는 보험료는 그가 받을 보험금의 기대값과 같아야 한다는 원칙입니다. P = Z × S (보험료 = 사고율 × 보험금)' },
        { id: 'it2-3', q: '피보험이익(Insurable Interest)의 개념은?', a: '보험사고가 발생하지 않음으로써 피보험자가 갖는 경제적 이익입니다. 피보험이익이 없으면 보험계약은 무효입니다.' },
        { id: 'it2-4', q: '피보험이익이 필요한 이유는?', a: '①도박과의 구별, ②도덕적 위험 방지, ③손해보상의 한도 설정, ④이득금지원칙의 실현을 위해 필요합니다.' },
        { id: 'it2-5', q: '실손보상의 원칙이란?', a: '손해보험에서 피보험자가 입은 실제 손해액만 보상한다는 원칙입니다. 보험으로 이득을 얻을 수 없다는 이득금지원칙과 연결됩니다.' },
        { id: 'it2-6', q: '초과보험의 개념과 효과는?', a: '보험가액보다 보험금액이 큰 경우입니다. 초과 부분은 무효이며, 악의인 경우 계약 전체가 무효가 될 수 있습니다.' },
        { id: 'it2-7', q: '중복보험의 처리방법은?', a: '동일한 피보험이익에 대해 여러 보험에 가입한 경우입니다. 각 보험자는 보험금액 비율로 분담하거나 독립책임액 한도로 연대 책임을 집니다.' },
        { id: 'it2-8', q: '보험대위(Subrogation)란?', a: '보험자가 보험금을 지급한 후 피보험자가 제3자에 대해 가지는 권리를 취득하는 것입니다. 이중배상 방지를 위한 제도입니다.' },
        { id: 'it2-9', q: '잔존물대위와 청구권대위의 차이는?', a: '잔존물대위는 보험목적물에 대한 권리 취득, 청구권대위는 제3자에 대한 손해배상청구권 취득입니다.' },
        { id: 'it2-10', q: '정액보험과 손해보험의 차이는?', a: '정액보험은 약정금액 전액을 지급(생명보험), 손해보험은 실제 손해액을 보상합니다. 정액보험은 이득금지원칙이 적용되지 않습니다.' }
      ]
    },
    {
      title: '보험계약의 구성요소',
      questions: [
        { id: 'it3-1', q: '보험계약의 당사자는?', a: '보험자(보험회사)와 보험계약자입니다. 피보험자와 보험수익자는 당사자는 아니지만 계약의 중요 관계자입니다.' },
        { id: 'it3-2', q: '보험계약자의 주요 의무는?', a: '①보험료 납입의무, ②고지의무, ③통지의무(위험변경증가 통지), ④손해방지의무 등이 있습니다.' },
        { id: 'it3-3', q: '고지의무란?', a: '계약체결 시 중요한 사항을 보험자에게 알릴 의무입니다. 위반 시 보험자는 계약을 해지하고 보험금 지급을 거절할 수 있습니다.' },
        { id: 'it3-4', q: '고지의무 위반의 효과는?', a: '보험자는 계약을 해지할 수 있고, 이미 발생한 보험사고에 대해서도 보험금을 지급하지 않을 수 있습니다. 단, 인과관계가 없으면 지급합니다.' },
        { id: 'it3-5', q: '보험증권의 법적 성격은?', a: '증거증권이자 면책증권입니다. 보험계약의 성립과 내용을 증명하며, 보험자는 증권 소지인에게 보험금을 지급하면 면책됩니다.' },
        { id: 'it3-6', q: '보험약관의 법적 구속력 근거는?', a: '약관의 규제에 관한 법률에 따라 계약 내용으로 편입됩니다. 금융감독원의 인가를 받아야 하며, 불명확한 조항은 고객에게 유리하게 해석합니다.' },
        { id: 'it3-7', q: '청약과 승낙의 관계는?', a: '보험계약은 청약과 승낙에 의해 성립합니다. 보험계약자가 청약하고 보험자가 승낙하면 계약이 성립합니다.' },
        { id: 'it3-8', q: '보험료 납입과 보험자 책임개시의 관계는?', a: '제1회 보험료를 받은 때부터 보험자 책임이 개시됩니다. 다만 승낙 전 사고 발생 시에도 청약 거절사유가 없으면 보상합니다.' },
        { id: 'it3-9', q: '피보험자의 동의가 필요한 경우는?', a: '타인의 생명보험에서 피보험자의 서면 동의가 필요합니다. 도덕적 위험 방지와 피보험자 보호를 위한 것입니다.' },
        { id: 'it3-10', q: '보험계약의 부합계약적 성격이란?', a: '보험자가 미리 작성한 약관에 계약자가 동의하는 형식의 계약입니다. 약관 규제와 설명의무 등으로 계약자를 보호합니다.' }
      ]
    },
    {
      title: '위험관리와 보험',
      questions: [
        { id: 'it4-1', q: '위험관리(Risk Management)의 정의는?', a: '조직이 직면한 위험을 체계적으로 식별, 분석, 평가하고 적절한 대응방안을 수립하여 실행하는 과정입니다.' },
        { id: 'it4-2', q: '위험관리의 4단계 과정은?', a: '①위험 식별(Identification), ②위험 분석(Analysis), ③위험 평가(Evaluation), ④위험 처리(Treatment)입니다.' },
        { id: 'it4-3', q: '위험 처리방법 중 위험회피(Avoidance)란?', a: '위험이 있는 활동 자체를 하지 않는 것입니다. 가장 확실하지만 그만큼 기회도 포기하게 됩니다.' },
        { id: 'it4-4', q: '위험 경감(Reduction)의 방법은?', a: '손실 예방(발생확률 감소)과 손실 감소(피해규모 감소)가 있습니다. 스프링클러 설치, 안전교육 등이 예입니다.' },
        { id: 'it4-5', q: '위험 전가(Transfer)의 대표적 방법은?', a: '보험과 계약입니다. 보험은 위험을 보험자에게, 계약은 면책조항 등을 통해 타방에게 위험을 전가합니다.' },
        { id: 'it4-6', q: '위험 보유(Retention)란?', a: '위험을 스스로 감당하는 것입니다. 적극적 보유(자가보험, 캡티브)와 소극적 보유(무보험 상태)가 있습니다.' },
        { id: 'it4-7', q: '자가보험(Self-Insurance)의 장단점은?', a: '장점은 보험료 절감, 손해방지 노력 유인. 단점은 대재해 발생 시 재정위험, 전문성 필요, 대수법칙 적용 어려움입니다.' },
        { id: 'it4-8', q: '캡티브보험(Captive Insurance)이란?', a: '기업이 자회사 형태로 설립한 보험회사입니다. 위험관리 통제권 확보, 보험료 절감, 세제 혜택 등의 목적으로 활용됩니다.' },
        { id: 'it4-9', q: '언더라이팅(Underwriting)의 목적은?', a: '위험의 선택과 분류를 통해 역선택을 방지하고 적정 보험료를 산정하는 것입니다. 보험의 건전성 유지에 필수적입니다.' },
        { id: 'it4-10', q: '재보험(Reinsurance)의 기능은?', a: '원보험자의 위험을 분산시킵니다. 인수능력 확대, 경영 안정화, 거대위험 인수 가능, 언더라이팅 노하우 획득 등의 기능이 있습니다.' }
      ]
    },
    {
      title: '보험상품의 종류',
      questions: [
        { id: 'it5-1', q: '생명보험의 기본 유형 3가지는?', a: '①사망보험(정기보험, 종신보험), ②생존보험(연금보험), ③생사혼합보험(양로보험)입니다.' },
        { id: 'it5-2', q: '정기보험과 종신보험의 차이는?', a: '정기보험은 일정 기간만 보장하고, 종신보험은 사망 시까지 평생 보장합니다. 정기보험이 보험료가 저렴합니다.' },
        { id: 'it5-3', q: '손해보험의 대표적 종목은?', a: '화재보험, 해상보험, 자동차보험, 배상책임보험, 상해보험, 보증보험 등이 있습니다.' },
        { id: 'it5-4', q: '제3보험의 개념은?', a: '생명보험과 손해보험의 중간 영역으로 상해보험, 질병보험, 간병보험 등이 해당합니다. 생손보사 모두 판매 가능합니다.' },
        { id: 'it5-5', q: '변액보험의 특징은?', a: '보험료의 일부를 특별계정에서 펀드로 운용하여 투자실적에 따라 보험금이 변동됩니다. 최저보증 옵션이 있는 경우가 많습니다.' },
        { id: 'it5-6', q: '실손의료보험의 특징은?', a: '실제 발생한 의료비를 보상합니다. 국민건강보험 비급여 부분 보장이 주 기능이며, 자기부담금이 있습니다.' },
        { id: 'it5-7', q: '배상책임보험의 개념은?', a: '피보험자가 법률상 배상책임을 부담함으로써 입은 손해를 보상합니다. 영업배상, 전문인배상, 임원배상책임보험 등이 있습니다.' },
        { id: 'it5-8', q: '보증보험과 신용보험의 차이는?', a: '보증보험은 채무자의 채무불이행 위험을, 신용보험은 채권자의 채권회수불능 위험을 담보합니다.' },
        { id: 'it5-9', q: '자동차보험의 의무보험 종목은?', a: '대인배상Ⅰ(책임보험)과 대물배상(책임보험)이 의무입니다. 대인배상Ⅱ, 자기신체사고, 자기차량손해는 임의보험입니다.' },
        { id: 'it5-10', q: '장기손해보험의 특징은?', a: '보험기간이 3년 이상인 손해보험입니다. 적립보험료가 있어 만기환급금이 있고, 세제혜택을 받을 수 있습니다.' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = completedQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/category/insurance/loss-adjuster" className="inline-flex items-center text-orange-100 hover:text-white mb-4 transition">
            ← 손해사정사
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">보험이론</h1>
          <p className="text-orange-100">1차 시험 핵심 과목</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="bg-white/20 rounded-full px-4 py-2">
              <span className="font-bold">{completedCount}</span> / {totalQuestions} 완료
            </div>
            <div className="flex-1 max-w-xs bg-white/20 rounded-full h-3">
              <div className="bg-white rounded-full h-3 transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
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

      {/* AI Modal */}
      {showAIModal && currentQuestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-800 mb-2">🤖 AI에게 질문하기</h3>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-600 mb-1">선택한 문제:</p>
              <p className="font-medium text-gray-800">{currentQuestion.q}</p>
            </div>
            <p className="text-gray-600 text-sm mb-4">아래 AI를 선택하면 해당 질문에 대해 더 자세한 설명을 받을 수 있습니다.</p>
            <div className="grid gap-2">
              {[
                { name: 'Claude', color: 'orange', url: 'https://claude.ai', prompt: `손해사정사 시험 보험이론 과목 질문입니다: "${currentQuestion.q}" 이에 대해 자세히 설명해주세요.` },
                { name: 'ChatGPT', color: 'green', url: 'https://chat.openai.com', prompt: `손해사정사 시험 보험이론 과목 질문입니다: "${currentQuestion.q}" 이에 대해 자세히 설명해주세요.` },
                { name: 'Gemini', color: 'blue', url: 'https://gemini.google.com', prompt: `손해사정사 시험 보험이론 과목 질문입니다: "${currentQuestion.q}" 이에 대해 자세히 설명해주세요.` }
              ].map((ai) => (
                <a key={ai.name} href={ai.url} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center p-3 border rounded-lg hover:bg-${ai.color}-50 transition`}>
                  <span className="text-xl mr-3">{ai.color === 'orange' ? '🟠' : ai.color === 'green' ? '🟢' : '🔵'}</span>
                  <div><div className="font-semibold">{ai.name}</div></div>
                </a>
              ))}
            </div>
            <button onClick={() => setShowAIModal(false)} className="w-full mt-4 py-2 text-gray-500 hover:text-gray-700">닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
