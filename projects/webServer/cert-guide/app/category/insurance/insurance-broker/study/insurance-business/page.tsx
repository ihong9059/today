'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function InsuranceBusinessPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('insurance-broker-insurance-business-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('insurance-broker-insurance-business-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => { setCurrentQuestion(q); setShowAIModal(true); };

  const topics = [
    {
      title: '생명보험 상품',
      questions: [
        { id: 'ibb1-1', q: '종신보험의 특징과 용도는?', a: '평생 사망보장, 상속·유산 목적, 고정보험료, 해약환급금 있음. 보험료가 비싸지만 확실한 보장.' },
        { id: 'ibb1-2', q: '정기보험과 종신보험의 선택 기준은?', a: '일정 기간 보장이면 정기보험(저렴), 평생 보장이면 종신보험. 소득, 부양가족, 목적에 따라 선택.' },
        { id: 'ibb1-3', q: '연금보험의 유형은?', a: '즉시연금(일시납 후 바로 수령), 거치연금(적립 후 수령), 확정연금, 종신연금, 변액연금 등.' },
        { id: 'ibb1-4', q: '변액보험의 리스크는?', a: '투자실적에 따라 보험금 변동, 원금손실 가능, 시장위험·금리위험 있음. 최저보증 옵션 확인 필요.' },
        { id: 'ibb1-5', q: '유니버설보험의 유연성이란?', a: '보험료 납입의 자유(일시정지, 추가납입), 보장과 저축 비율 조정, 투명한 비용 공개.' },
        { id: 'ibb1-6', q: 'CI보험(Critical Illness)의 특징은?', a: '중대질병(암, 뇌졸중, 심근경색 등) 진단 시 보험금 선지급. 사망 전 생활자금 확보 목적.' },
        { id: 'ibb1-7', q: '저축성보험과 보장성보험의 세제 차이는?', a: '보장성은 보험료 세액공제, 저축성은 비과세 이자소득(10년 이상). 목적에 따라 선택.' },
        { id: 'ibb1-8', q: '단체보험의 특징과 장점은?', a: '기업이 임직원을 위해 가입. 개인가입보다 저렴, 간편가입, 단체할인. 복리후생 수단.' },
        { id: 'ibb1-9', q: '무배당보험과 유배당보험의 차이는?', a: '유배당은 이익 환원(배당금), 무배당은 보험료 저렴. 최근은 무배당이 주류.' },
        { id: 'ibb1-10', q: '생명보험 상품 비교 시 중점사항은?', a: '보장범위, 보험료, 해약환급금, 면책사항, 갱신조건, 회사 건전성을 종합 비교.' }
      ]
    },
    {
      title: '손해보험 상품',
      questions: [
        { id: 'ibb2-1', q: '화재보험의 담보범위는?', a: '화재, 낙뢰, 폭발·파열로 인한 직접손해. 소방손해, 피난손해도 포함. 확장담보 추가 가능.' },
        { id: 'ibb2-2', q: '자동차보험의 담보구성은?', a: '대인배상Ⅰ·Ⅱ, 대물배상, 자기신체사고, 자기차량손해, 무보험차상해 등으로 구성.' },
        { id: 'ibb2-3', q: '배상책임보험의 종류는?', a: '영업배상, 전문인배상, 생산물배상, 임원배상(D&O), 사이버배상, 환경오염배상 등.' },
        { id: 'ibb2-4', q: '영업배상책임보험의 담보범위는?', a: '사업활동 중 제3자에게 입힌 신체상해, 재물손해의 법률상 배상책임을 담보.' },
        { id: 'ibb2-5', q: '전문인배상책임보험 대상 직종은?', a: '의사, 변호사, 회계사, 건축사, 감정평가사, 세무사, 보험중개사 등 전문직.' },
        { id: 'ibb2-6', q: 'D&O보험(임원배상책임보험)이란?', a: '이사·임원의 업무상 과실로 인한 배상책임을 담보. 주주대표소송, 증권집단소송 대비.' },
        { id: 'ibb2-7', q: '기업휴지보험(BI)의 담보내용은?', a: '화재 등으로 영업중단 시 영업이익 손실, 고정비용을 보상. 물적손해보험과 함께 가입.' },
        { id: 'ibb2-8', q: '건설공사보험(CAR)의 특징은?', a: '공사 중 우연한 사고로 인한 공사목적물 손해 담보. 제3자 배상책임도 포함.' },
        { id: 'ibb2-9', q: '해상보험의 담보대상은?', a: '선박, 화물, 운임, 해상배상책임 등. 적하보험, 선박보험, P&I보험으로 구분.' },
        { id: 'ibb2-10', q: '기업성보험 설계 시 고려사항은?', a: '기업의 위험프로파일, 업종특성, 자산규모, 계약조건, 보험료 예산, 보험사 서비스.' }
      ]
    },
    {
      title: '언더라이팅',
      questions: [
        { id: 'ibb3-1', q: '언더라이팅의 목적은?', a: '위험의 선택과 분류, 역선택 방지, 적정 보험료 산정, 보험의 건전성 유지입니다.' },
        { id: 'ibb3-2', q: '언더라이팅 프로세스는?', a: '정보수집→위험평가→인수결정→조건부여→사후관리 순으로 진행됩니다.' },
        { id: 'ibb3-3', q: '생명보험 언더라이팅 요소는?', a: '나이, 성별, 건강상태, 직업, 취미, 가족력, 보험금액, 기존계약 등.' },
        { id: 'ibb3-4', q: '손해보험 언더라이팅 요소는?', a: '피보험목적물, 소재지, 용도, 안전시설, 손해경력, 보험가액, 자기부담금 등.' },
        { id: 'ibb3-5', q: '표준체와 표준미달체(Substandard)란?', a: '표준체는 표준요율 적용, 표준미달체는 할증요율·제한조건·면책 등 특별조건 부여.' },
        { id: 'ibb3-6', q: '언더라이팅 결정의 종류는?', a: '①표준인수, ②할증인수, ③조건부인수(면책), ④연기, ⑤거절입니다.' },
        { id: 'ibb3-7', q: '의적검사(Medical Examination)의 목적은?', a: '건강상태 확인, 고지의무 보완, 위험등급 결정, 부실고지 방지입니다.' },
        { id: 'ibb3-8', q: '간편심사보험의 특징은?', a: '건강고지 간소화, 진단서 없이 가입. 대신 보험료 높고 보장제한 있음.' },
        { id: 'ibb3-9', q: '자동언더라이팅의 장단점은?', a: '장점: 빠른 심사, 비용절감, 일관성. 단점: 복잡한 케이스 처리 한계.' },
        { id: 'ibb3-10', q: '빅데이터·AI 언더라이팅의 동향은?', a: '대체데이터 활용, 예측모델 고도화, 실시간 심사, 개인 맞춤형 요율 산정.' }
      ]
    },
    {
      title: '보험요율',
      questions: [
        { id: 'ibb4-1', q: '보험료의 구성요소는?', a: '순보험료(위험보험료+저축보험료) + 부가보험료(사업비)입니다.' },
        { id: 'ibb4-2', q: '순보험료 산정 원리는?', a: '예정위험률(사고율) × 보험금입니다. 대수의 법칙에 기반하여 산출.' },
        { id: 'ibb4-3', q: '부가보험료의 구성은?', a: '신계약비(모집비), 유지비(관리비), 수금비로 구성됩니다.' },
        { id: 'ibb4-4', q: '생명보험의 3이원(三利源)이란?', a: '사차익(실제사망률<예정), 이차익(실제이율>예정), 비차익(실제비용<예정)입니다.' },
        { id: 'ibb4-5', q: '손해보험의 손해율이란?', a: '발생손해액/경과보험료입니다. 손해율이 높으면 보험료 인상 요인.' },
        { id: 'ibb4-6', q: '합산비율(Combined Ratio)이란?', a: '손해율+사업비율입니다. 100% 초과 시 보험영업 적자.' },
        { id: 'ibb4-7', q: '경험요율제(Experience Rating)란?', a: '개별 계약자의 손해경험에 따라 요율을 조정하는 제도. 할인·할증.' },
        { id: 'ibb4-8', q: '소급요율제(Retrospective Rating)란?', a: '보험기간 종료 후 실제 손해를 반영하여 보험료를 정산하는 방식.' },
        { id: 'ibb4-9', q: '참조순보험요율제도란?', a: '보험개발원이 참조순보험요율을 산출하고, 각 회사가 이를 참조하여 요율 결정.' },
        { id: 'ibb4-10', q: '자동차보험료 할인·할증 요인은?', a: '무사고경력, 사고건수, 나이, 차종, 용도, 주행거리, 특약 등.' }
      ]
    },
    {
      title: '재보험',
      questions: [
        { id: 'ibb5-1', q: '재보험의 정의는?', a: '보험회사(원보험자)가 인수한 위험의 일부 또는 전부를 다른 보험회사(재보험자)에게 전가하는 것.' },
        { id: 'ibb5-2', q: '재보험의 기능은?', a: '①위험분산, ②인수능력 확대, ③경영안정, ④대재해 대비, ⑤언더라이팅 지원.' },
        { id: 'ibb5-3', q: '비례재보험의 종류는?', a: '①비율재보험(Quota Share), ②초과재보험(Surplus)입니다. 보험금을 비율로 분담.' },
        { id: 'ibb5-4', q: '비비례재보험의 종류는?', a: '①초과손해재보험(Excess of Loss), ②손해율초과재보험(Stop Loss). 일정액 초과분 담보.' },
        { id: 'ibb5-5', q: '비율재보험(Quota Share)의 특징은?', a: '모든 계약을 일정 비율로 출재. 간단하지만 보험료·손해 모두 비례 분담.' },
        { id: 'ibb5-6', q: '초과손해재보험(XOL)의 특징은?', a: '개별 사고당 일정액 초과 손해를 재보험자가 부담. 대형사고 대비에 효과적.' },
        { id: 'ibb5-7', q: '임의재보험과 특약재보험의 차이는?', a: '임의: 개별 건마다 협상, 특약: 사전에 조건을 정하고 자동 출재.' },
        { id: 'ibb5-8', q: '재보험 브로커의 역할은?', a: '원보험자와 재보험자 연결, 조건협상, 계약체결 중개, 클레임 지원.' },
        { id: 'ibb5-9', q: '대재해채권(Cat Bond)이란?', a: '자연재해 위험을 자본시장으로 전가하는 수단. 투자자가 재해위험 부담.' },
        { id: 'ibb5-10', q: '재보험시장의 특징은?', a: '글로벌 시장, 소수 대형사 과점, 경기변동 민감, 대재해 영향 큼.' }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">보험업무</h1>
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
