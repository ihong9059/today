'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function InsuranceTheoryPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('insurance-broker-insurance-theory-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('insurance-broker-insurance-theory-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => { setCurrentQuestion(q); setShowAIModal(true); };

  const topics = [
    {
      title: '보험의 개념과 역사',
      questions: [
        { id: 'ibt1-1', q: '보험의 경제적 정의는?', a: '동일한 위험에 노출된 다수의 경제주체가 우연한 사고에 대비하여 공동으로 기금을 출연하고, 사고 발생 시 그 기금으로 손실을 보전하는 경제제도입니다.' },
        { id: 'ibt1-2', q: '대수의 법칙(Law of Large Numbers)이 보험에서 갖는 의미는?', a: '관찰 대상이 많을수록 실제 발생률이 예상 확률에 수렴합니다. 보험자는 이를 통해 위험률을 정확히 예측하고 적정 보험료를 산정합니다.' },
        { id: 'ibt1-3', q: '근대 보험의 시초인 해상보험은 어디서 발달했나?', a: '14세기 이탈리아(제노바, 베니스, 피렌체)에서 지중해 무역과 함께 발달했습니다. 로이즈(Lloyd\'s)는 17세기 영국에서 시작되었습니다.' },
        { id: 'ibt1-4', q: '로이즈(Lloyd\'s of London)의 특징은?', a: '보험회사가 아닌 보험시장(거래소)입니다. 개인 인수인(Underwriter)들이 신디케이트를 구성하여 위험을 인수합니다.' },
        { id: 'ibt1-5', q: '생명보험의 역사적 기원은?', a: '17세기 영국의 톤틴(Tontine) 제도에서 발전했습니다. 1762년 설립된 에퀴터블 생명(Equitable Life)이 최초의 근대적 생명보험회사입니다.' },
        { id: 'ibt1-6', q: '우리나라 최초의 보험회사는?', a: '1921년 설립된 조선생명보험주식회사입니다. 최초의 손해보험회사는 1922년 설립된 조선화재해상보험입니다.' },
        { id: 'ibt1-7', q: '보험의 사회적 기능은?', a: '①손실보상, ②자금축적과 자본시장 발전, ③신용제도 보완, ④사회안전망 기능, ⑤위험관리 촉진 등입니다.' },
        { id: 'ibt1-8', q: '보험의 역기능(부작용)은?', a: '①도덕적 위험(Moral Hazard), ②역선택(Adverse Selection), ③보험사기, ④보험의존심리 등이 있습니다.' },
        { id: 'ibt1-9', q: '보험과 저축의 차이점은?', a: '저축은 확정적 금액이 적립되지만, 보험은 불확정적 사고 발생 시 보험금이 지급됩니다. 보험은 위험 전가의 성격이 있습니다.' },
        { id: 'ibt1-10', q: '보험과 도박의 근본적 차이는?', a: '보험은 기존 위험의 분산이고, 도박은 위험의 창출입니다. 보험은 피보험이익이 있어야 하고 사회적으로 유용합니다.' }
      ]
    },
    {
      title: '보험의 원리와 기능',
      questions: [
        { id: 'ibt2-1', q: '수지상등의 원칙이란?', a: '전체 보험료 수입 = 전체 보험금 지출이 되어야 한다는 원칙입니다. P×n = Z×n×S (보험료×가입자수 = 사고율×가입자수×보험금)' },
        { id: 'ibt2-2', q: '급부반대급부 균등의 원칙이란?', a: '개별 계약자가 납입하는 보험료는 그가 받을 보험금의 기대값과 같아야 합니다. P = Z×S (보험료 = 사고율×보험금)' },
        { id: 'ibt2-3', q: '피보험이익(Insurable Interest)의 4가지 요건은?', a: '①경제적 이익, ②적법한 이익, ③확정 가능한 이익, ④금전으로 평가 가능한 이익이어야 합니다.' },
        { id: 'ibt2-4', q: '손해보험에서 실손보상원칙의 의미는?', a: '피보험자가 입은 실제 손해액만 보상합니다. 보험으로 이득을 얻을 수 없다는 이득금지원칙의 구체적 표현입니다.' },
        { id: 'ibt2-5', q: '보험대위(Subrogation)의 두 가지 종류는?', a: '①잔존물대위: 전손 시 보험목적물에 대한 권리 취득, ②청구권대위: 제3자에 대한 손해배상청구권 취득입니다.' },
        { id: 'ibt2-6', q: '중복보험의 처리 방법은?', a: '①비례분담: 보험금액 비율로 분담, ②독립책임액 한도: 각 보험자가 단독 시 부담할 금액 한도로 연대책임을 집니다.' },
        { id: 'ibt2-7', q: '초과보험의 효력은?', a: '보험가액 초과 부분은 무효입니다. 선의의 초과보험은 보험가액 한도로 유효하고, 악의면 계약 전체가 무효될 수 있습니다.' },
        { id: 'ibt2-8', q: '일부보험의 비례보상 원칙은?', a: '보험금 = 손해액 × (보험금액/보험가액). 보험금액이 보험가액보다 적으면 비례하여 보상합니다.' },
        { id: 'ibt2-9', q: '정액보험과 손해보험의 차이는?', a: '정액보험은 약정금액 전액 지급(생명보험), 손해보험은 실제 손해액 보상입니다. 정액보험은 이득금지원칙 적용 안 됨.' },
        { id: 'ibt2-10', q: '근인(Proximate Cause) 원칙이란?', a: '손해의 직접적이고 지배적인 원인이 담보위험에 해당해야 보상합니다. 인과관계 판단의 기준이 됩니다.' }
      ]
    },
    {
      title: '보험계약의 구성요소',
      questions: [
        { id: 'ibt3-1', q: '보험계약의 당사자는?', a: '보험자(보험회사)와 보험계약자입니다. 피보험자와 보험수익자는 관계인이지 당사자는 아닙니다.' },
        { id: 'ibt3-2', q: '보험계약의 법적 성격 4가지는?', a: '①유상계약, ②쌍무계약, ③낙성계약, ④부합계약(약관에 의한 계약)입니다.' },
        { id: 'ibt3-3', q: '보험계약의 불요식계약 성격이란?', a: '계약 성립에 특별한 형식이 필요 없습니다. 구두 합의만으로도 계약이 성립할 수 있습니다(실무상 서면 작성).' },
        { id: 'ibt3-4', q: '고지의무(Duty of Disclosure)란?', a: '계약 체결 시 계약자가 중요 사항을 보험자에게 알려야 하는 의무입니다. 위반 시 계약 해지, 보험금 지급 거절 가능.' },
        { id: 'ibt3-5', q: '통지의무와 고지의무의 차이는?', a: '고지의무는 계약 체결 시, 통지의무는 계약 후 위험변경 시 알리는 의무입니다. 둘 다 위반 시 불이익이 있습니다.' },
        { id: 'ibt3-6', q: '위험변경증가 통지의무의 내용은?', a: '계약 후 위험이 현저히 증가하면 지체 없이 보험자에게 통지해야 합니다. 미통지 시 보험자는 계약 해지 가능.' },
        { id: 'ibt3-7', q: '보험약관의 교부설명의무란?', a: '보험자는 약관의 중요 내용을 계약자에게 설명해야 합니다. 미이행 시 해당 약관 조항을 계약 내용으로 주장 불가.' },
        { id: 'ibt3-8', q: '청약철회권의 행사 기간은?', a: '보험증권을 받은 날부터 15일 이내(단, 청약일로부터 30일 초과 불가). 통신판매는 30일 이내입니다.' },
        { id: 'ibt3-9', q: '보험증권의 법적 성격은?', a: '증거증권(계약 내용 증명)이자 면책증권(증권 소지인에게 지급 시 면책)입니다. 유가증권은 아닙니다.' },
        { id: 'ibt3-10', q: '보험료 납입과 책임개시의 관계는?', a: '제1회 보험료 수령 시 보험자 책임이 개시됩니다. 다만 청약 거절사유 없으면 청약 시점부터 소급 보장.' }
      ]
    },
    {
      title: '보험상품의 종류',
      questions: [
        { id: 'ibt4-1', q: '생명보험의 기본 유형 3가지는?', a: '①사망보험(정기, 종신), ②생존보험(연금, 교육), ③생사혼합보험(양로)입니다.' },
        { id: 'ibt4-2', q: '정기보험과 종신보험의 차이는?', a: '정기보험은 일정 기간만 보장(저렴), 종신보험은 평생 보장(비쌈). 정기보험은 만기환급금 없음.' },
        { id: 'ibt4-3', q: '변액보험의 특징은?', a: '특별계정에서 펀드 운용하여 투자 실적에 따라 보험금 변동. 투자 위험을 계약자가 부담합니다.' },
        { id: 'ibt4-4', q: '유니버설보험의 특징은?', a: '보험료 납입의 유연성(자유 납입), 보장과 저축 비율 조정 가능. 투명한 비용구조가 특징입니다.' },
        { id: 'ibt4-5', q: '손해보험의 대표적 종목은?', a: '화재, 해상, 자동차, 보증, 배상책임, 상해, 질병보험 등이 있습니다.' },
        { id: 'ibt4-6', q: '제3보험의 개념과 범위는?', a: '생명보험과 손해보험의 중간 영역입니다. 상해, 질병, 간병보험 등이 해당. 생손보사 모두 판매 가능.' },
        { id: 'ibt4-7', q: '배상책임보험의 종류는?', a: '영업배상, 전문인배상, 생산물배상, 임원배상책임(D&O), 사이버배상 등이 있습니다.' },
        { id: 'ibt4-8', q: '기업성보험의 특징은?', a: '기업의 위험을 담보하는 보험입니다. 패키지 보험, 맞춤형 설계, 고액 담보가 특징입니다.' },
        { id: 'ibt4-9', q: '재보험의 기능은?', a: '원보험자의 위험분산, 인수능력 확대, 경영안정, 대재해 대비, 언더라이팅 노하우 획득입니다.' },
        { id: 'ibt4-10', q: '실손의료보험의 특징은?', a: '실제 발생한 의료비 보상. 국민건강보험 비급여 부분 보장. 자기부담금 있고 다수계약 비례분담.' }
      ]
    },
    {
      title: '국제보험시장',
      questions: [
        { id: 'ibt5-1', q: '세계 최대 보험시장은?', a: '미국이 1위, 중국이 2위, 일본이 3위입니다. 한국은 세계 7~8위권의 보험시장입니다.' },
        { id: 'ibt5-2', q: '로이즈 보험시장의 구조는?', a: '신디케이트(인수단), 멤버(자본공급), 브로커(중개), 관리대리인(MA)으로 구성됩니다.' },
        { id: 'ibt5-3', q: '글로벌 재보험사의 특징은?', a: 'Munich Re, Swiss Re 등이 대표적. 대재해 위험인수, 신상품 개발, 글로벌 네트워크가 강점입니다.' },
        { id: 'ibt5-4', q: '역외보험(Offshore Insurance)이란?', a: '조세회피지역(버뮤다, 케이맨 등)에 설립된 보험사를 통한 보험입니다. 세제 혜택이 목적입니다.' },
        { id: 'ibt5-5', q: '캡티브보험(Captive Insurance)이란?', a: '기업이 자회사로 설립한 보험회사입니다. 위험관리 통제, 보험료 절감, 세제 혜택 등이 목적입니다.' },
        { id: 'ibt5-6', q: '국제보험중개사(International Broker)의 역할은?', a: '다국적기업 보험 설계, 글로벌 프로그램 운영, 해외 보험시장 접근, 클레임 지원 등입니다.' },
        { id: 'ibt5-7', q: '보험침투도(Insurance Penetration)란?', a: '보험료/GDP 비율입니다. 한국은 약 10~11%로 세계 최고 수준입니다.' },
        { id: 'ibt5-8', q: '보험밀도(Insurance Density)란?', a: '1인당 보험료입니다. 선진국이 높고, 신흥국이 낮습니다. 한국은 약 4,000달러 수준.' },
        { id: 'ibt5-9', q: '인슈어테크(Insurtech)의 주요 분야는?', a: '디지털 플랫폼, AI 언더라이팅, 빅데이터 분석, 블록체인 적용, 텔레매틱스 보험 등입니다.' },
        { id: 'ibt5-10', q: '기후변화가 보험산업에 미치는 영향은?', a: '자연재해 증가로 손해율 상승, 새로운 위험 출현, ESG 투자 확대, 그린보험 상품 개발 등.' }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">보험이론</h1>
          <p className="text-teal-100">필기시험 핵심 과목</p>
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
