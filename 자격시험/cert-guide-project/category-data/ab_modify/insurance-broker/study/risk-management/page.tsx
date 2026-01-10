'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RiskManagementPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('insurance-broker-risk-management-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('insurance-broker-risk-management-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => { setCurrentQuestion(q); setShowAIModal(true); };

  const topics = [
    {
      title: '위험의 개념과 분류',
      questions: [
        { id: 'rm1-1', q: '위험(Risk)의 정의는?', a: '손실 발생의 불확실성입니다. 손실 발생 가능성과 그 결과의 불확실성을 모두 포함합니다.' },
        { id: 'rm1-2', q: '순수위험(Pure Risk)과 투기적위험(Speculative Risk)의 차이는?', a: '순수위험은 손실만 가능(화재), 투기적위험은 손실·이익 모두 가능(투자). 보험은 순수위험만 담보.' },
        { id: 'rm1-3', q: '특정위험(Particular Risk)과 기본위험(Fundamental Risk)의 차이는?', a: '특정위험은 개인에게 영향(도난), 기본위험은 사회 전체에 영향(지진, 전쟁). 기본위험은 보험 인수 제한.' },
        { id: 'rm1-4', q: '정적위험과 동적위험의 차이는?', a: '정적위험은 경제변동과 무관(자연재해), 동적위험은 경제변동에 따라 변화(인플레이션).' },
        { id: 'rm1-5', q: '객관적위험과 주관적위험의 차이는?', a: '객관적위험은 실제 손실변동성(측정 가능), 주관적위험은 개인의 심리적 인식(불안감).' },
        { id: 'rm1-6', q: '위험요소(Risk Factor)의 종류는?', a: '①위태(Hazard): 손실 가능성 증가 요인, ②페릴(Peril): 손실의 직접 원인, ③손실노출(Exposure): 위험에 노출된 대상.' },
        { id: 'rm1-7', q: '물리적 위태와 도덕적 위태의 차이는?', a: '물리적 위태는 물적 조건(가연물), 도덕적 위태는 심리적 요인(고의사고). 모럴해저드는 도덕적 위태.' },
        { id: 'rm1-8', q: '운영위험(Operational Risk)이란?', a: '부적절한 내부 프로세스, 인력, 시스템 또는 외부 사건으로 인한 손실 위험입니다.' },
        { id: 'rm1-9', q: '전략적위험(Strategic Risk)이란?', a: '잘못된 경영의사결정, 시장환경 변화에 대한 부적절한 대응으로 인한 위험입니다.' },
        { id: 'rm1-10', q: '신흥위험(Emerging Risk)의 예는?', a: '사이버위험, 기후변화위험, 팬데믹위험, AI·자율주행 관련 위험 등 새롭게 부각되는 위험.' }
      ]
    },
    {
      title: '위험관리 프로세스',
      questions: [
        { id: 'rm2-1', q: '위험관리(Risk Management)의 정의는?', a: '조직의 목표 달성에 영향을 미치는 위험을 체계적으로 식별, 분석, 평가하고 적절히 대응하는 과정.' },
        { id: 'rm2-2', q: '위험관리의 4단계 프로세스는?', a: '①위험식별(Identification), ②위험분석(Analysis), ③위험평가(Evaluation), ④위험처리(Treatment).' },
        { id: 'rm2-3', q: '위험식별(Risk Identification)의 방법은?', a: '체크리스트, 흐름도 분석, 재무제표 분석, 현장조사, 인터뷰, 브레인스토밍 등.' },
        { id: 'rm2-4', q: '위험분석의 정량적 방법은?', a: '확률분포 분석, 민감도 분석, 시나리오 분석, 몬테카를로 시뮬레이션, VaR 분석 등.' },
        { id: 'rm2-5', q: '위험분석의 정성적 방법은?', a: '위험등급 매트릭스, 전문가 판단, 델파이 기법, SWOT 분석 등.' },
        { id: 'rm2-6', q: '위험평가(Risk Evaluation)의 목적은?', a: '분석된 위험의 중요도를 판단하고 처리 우선순위를 결정하는 것입니다.' },
        { id: 'rm2-7', q: '위험맵(Risk Map)이란?', a: '발생빈도(X축)와 영향도(Y축)로 위험을 시각화한 도표. 우선순위 결정에 활용.' },
        { id: 'rm2-8', q: '위험관리 성과지표(KRI)란?', a: 'Key Risk Indicator. 위험 수준 변화를 모니터링하는 지표. 조기경보 역할.' },
        { id: 'rm2-9', q: '위험관리위원회의 역할은?', a: '위험관리 정책 수립, 한도 설정, 모니터링, 보고체계 운영, 이사회 보고.' },
        { id: 'rm2-10', q: '위험관리 프레임워크(COSO ERM)란?', a: 'Committee of Sponsoring Organizations가 제시한 전사적 위험관리 체계. 8가지 구성요소.' }
      ]
    },
    {
      title: '위험평가 기법',
      questions: [
        { id: 'rm3-1', q: 'VaR(Value at Risk)란?', a: '일정 기간, 일정 신뢰수준에서 발생할 수 있는 최대 손실액입니다. 시장위험 측정에 주로 사용.' },
        { id: 'rm3-2', q: 'VaR 계산 방법은?', a: '①역사적 시뮬레이션, ②분산-공분산법, ③몬테카를로 시뮬레이션이 있습니다.' },
        { id: 'rm3-3', q: '스트레스 테스트(Stress Test)란?', a: '극단적 상황(금융위기 등)을 가정하여 손실을 추정하는 기법. VaR의 한계를 보완.' },
        { id: 'rm3-4', q: '시나리오 분석의 유형은?', a: '①역사적 시나리오(과거 사건 기반), ②가상 시나리오(가정 기반), ③역스트레스테스트.' },
        { id: 'rm3-5', q: 'PML(Probable Maximum Loss)이란?', a: '합리적으로 예상되는 최대 손해액입니다. 재물보험 언더라이팅에서 주로 사용.' },
        { id: 'rm3-6', q: 'MFL(Maximum Foreseeable Loss)이란?', a: '예견 가능한 최악의 조건에서 발생할 수 있는 최대 손해액. PML보다 보수적.' },
        { id: 'rm3-7', q: 'EML(Estimated Maximum Loss)과 NLE의 차이는?', a: 'EML은 정상적 방호시설 작동 가정, NLE(Normal Loss Expectancy)는 최적 조건 가정.' },
        { id: 'rm3-8', q: '손해빈도(Loss Frequency)와 손해심도(Loss Severity)란?', a: '빈도는 손해 발생 횟수, 심도는 건당 손해 규모. 기대손실 = 빈도 × 심도.' },
        { id: 'rm3-9', q: '위험등급 매트릭스 사용법은?', a: '발생가능성(낮음~높음)과 영향(낮음~높음)의 조합으로 위험등급 결정. 5×5 매트릭스 흔함.' },
        { id: 'rm3-10', q: 'FMEA(Failure Mode and Effects Analysis)란?', a: '고장모드영향분석. 시스템·프로세스의 잠재적 고장 모드와 영향을 체계적으로 분석.' }
      ]
    },
    {
      title: '위험처리 방법',
      questions: [
        { id: 'rm4-1', q: '위험처리의 4가지 기본 방법은?', a: '①회피(Avoidance), ②경감(Reduction), ③전가(Transfer), ④보유(Retention)입니다.' },
        { id: 'rm4-2', q: '위험회피(Risk Avoidance)란?', a: '위험이 있는 활동 자체를 하지 않는 것입니다. 가장 확실하지만 기회도 포기.' },
        { id: 'rm4-3', q: '위험경감(Risk Reduction)의 방법은?', a: '손실예방(발생확률 감소)과 손실감소(피해규모 감소). 스프링클러, 안전교육 등.' },
        { id: 'rm4-4', q: '위험전가(Risk Transfer)의 방법은?', a: '①보험가입, ②계약상 면책조항, ③헤지(파생상품), ④아웃소싱 등.' },
        { id: 'rm4-5', q: '위험보유(Risk Retention)란?', a: '위험을 스스로 감당하는 것. 적극적 보유(자가보험)와 소극적 보유(무인식 보유).' },
        { id: 'rm4-6', q: '자가보험(Self-Insurance)의 장단점은?', a: '장점: 보험료 절감, 손해방지 유인. 단점: 대재해 취약, 전문성 필요, 자금 부담.' },
        { id: 'rm4-7', q: '캡티브보험(Captive Insurance)의 장점은?', a: '위험관리 통제, 보험료 절감, 세제 혜택, 비전통적 위험 담보, 재보험시장 접근.' },
        { id: 'rm4-8', q: '위험금융(Risk Financing)이란?', a: '손실 발생 시 필요한 자금을 조달하는 방법. 보험, 자가보험, 비상자금 등.' },
        { id: 'rm4-9', q: '위험처리 방법 선택 기준은?', a: '빈도-심도 매트릭스: 고빈도-고심도(회피), 고빈도-저심도(경감), 저빈도-고심도(전가), 저빈도-저심도(보유).' },
        { id: 'rm4-10', q: '위험처리의 비용-효익 분석이란?', a: '위험처리 비용과 기대손실 감소액을 비교하여 최적의 처리방법을 선택하는 것.' }
      ]
    },
    {
      title: '기업위험관리(ERM)',
      questions: [
        { id: 'rm5-1', q: 'ERM(Enterprise Risk Management)이란?', a: '기업 전체 관점에서 모든 위험을 통합적으로 관리하는 체계. 사일로 관리의 한계 극복.' },
        { id: 'rm5-2', q: 'ERM과 전통적 위험관리의 차이는?', a: 'ERM은 전사적·통합적·전략적 접근, 전통은 부서별·개별적·방어적 접근.' },
        { id: 'rm5-3', q: 'ERM의 주요 구성요소(COSO)는?', a: '내부환경, 목표설정, 사건식별, 위험평가, 위험대응, 통제활동, 정보·커뮤니케이션, 모니터링.' },
        { id: 'rm5-4', q: 'ERM 도입의 이점은?', a: '위험의 통합 관리, 의사결정 지원, 자본 효율화, 규제 대응, 기업가치 제고.' },
        { id: 'rm5-5', q: '위험성향(Risk Appetite)이란?', a: '조직이 목표 달성을 위해 수용할 의사가 있는 위험의 총량입니다. 이사회에서 결정.' },
        { id: 'rm5-6', q: '위험한도(Risk Limit)란?', a: '개별 위험에 대해 설정하는 한계치입니다. 위험성향을 구체화한 운영 기준.' },
        { id: 'rm5-7', q: '위험문화(Risk Culture)란?', a: '조직 구성원들의 위험에 대한 인식, 태도, 행동 양식. ERM 성공의 핵심 요소.' },
        { id: 'rm5-8', q: 'CRO(Chief Risk Officer)의 역할은?', a: '전사 위험관리 총괄, 위험정책 수립, 위험보고체계 운영, 이사회·경영진 자문.' },
        { id: 'rm5-9', q: '3선 방어모델(Three Lines of Defense)이란?', a: '1선: 사업부문(위험소유), 2선: 위험관리·컴플라이언스(감독), 3선: 내부감사(독립검증).' },
        { id: 'rm5-10', q: 'ERM과 보험중개사의 역할 연계는?', a: '기업 위험 진단, 보험 프로그램 설계, 위험전가 최적화, 클레임 관리, 위험 컨설팅 제공.' }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">위험관리론</h1>
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
