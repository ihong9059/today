'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BrokeragePracticePage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('insurance-broker-brokerage-practice-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('insurance-broker-brokerage-practice-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => { setCurrentQuestion(q); setShowAIModal(true); };

  const topics = [
    {
      title: '보험중개의 개념',
      questions: [
        { id: 'bp1-1', q: '보험중개사와 보험대리점의 핵심 차이는?', a: '대리점은 보험회사 편에서 활동, 중개사는 계약자 편에서 독립적으로 활동합니다. 충성의무 대상이 다름.' },
        { id: 'bp1-2', q: '보험중개사의 3대 의무는?', a: '①선관주의의무, ②충실의무(Duty of Care), ③비밀유지의무입니다. 위반 시 손해배상책임.' },
        { id: 'bp1-3', q: '보험중개사의 독립성이란?', a: '특정 보험회사에 종속되지 않고 계약자의 이익을 위해 독립적으로 판단하고 중개하는 것.' },
        { id: 'bp1-4', q: '보험중개사 선임의 장점은?', a: '①복수 회사 비교, ②전문적 조언, ③맞춤형 설계, ④클레임 지원, ⑤협상력 제고.' },
        { id: 'bp1-5', q: '보험중개의 대상 업무는?', a: '①위험분석, ②보험설계, ③보험회사 선정, ④계약체결 중개, ⑤계약관리, ⑥클레임 지원.' },
        { id: 'bp1-6', q: '기업보험 중개의 특징은?', a: '복잡한 위험, 고액 보험료, 맞춤형 설계, 국제보험시장 접근, 전문성 요구가 높음.' },
        { id: 'bp1-7', q: '개인보험 중개의 특징은?', a: '표준화된 상품, 비교·추천 중심, 설명의무 중요, 디지털 플랫폼 활용 증가.' },
        { id: 'bp1-8', q: '재보험 브로커의 역할은?', a: '원보험자와 재보험자 연결, 재보험 프로그램 설계, 조건 협상, 클레임 조정.' },
        { id: 'bp1-9', q: '국제보험중개사의 역할은?', a: '다국적기업 보험 설계, 글로벌 프로그램 운영, 해외시장 접근, 현지 규제 대응.' },
        { id: 'bp1-10', q: '보험중개 시장의 구조는?', a: '글로벌 대형 브로커(Marsh, Aon, WTW), 지역 브로커, 전문 브로커(해상, 항공 등)로 구분.' }
      ]
    },
    {
      title: '중개계약',
      questions: [
        { id: 'bp2-1', q: '중개계약(Broking Agreement)의 내용은?', a: '중개 범위, 수수료, 의무, 면책, 기간, 해지, 비밀유지 등을 규정합니다.' },
        { id: 'bp2-2', q: '전속중개와 비전속중개의 차이는?', a: '전속중개는 특정 중개사에게만 의뢰, 비전속은 복수 중개사에게 의뢰 가능.' },
        { id: 'bp2-3', q: '중개수수료(Brokerage)의 결정 방법은?', a: '보험료의 일정 비율, 정액 수수료, 성과 기반 수수료 등. 투명한 공개 필요.' },
        { id: 'bp2-4', q: '수수료 공개의무란?', a: '중개사는 보험회사로부터 받는 수수료를 계약자에게 공개해야 합니다. 이해충돌 방지.' },
        { id: 'bp2-5', q: '피수수료(Fee)와 커미션의 차이는?', a: '피는 계약자가 직접 지급, 커미션은 보험회사가 지급. 피 방식은 독립성 강화.' },
        { id: 'bp2-6', q: '중개계약의 해지 사유는?', a: '계약 위반, 신뢰 상실, 합의 해지, 계약 만료 등. 해지 시 진행 중 업무 처리 규정 필요.' },
        { id: 'bp2-7', q: '이해충돌(Conflict of Interest) 관리란?', a: '중개사가 자신의 이익과 계약자 이익이 충돌할 때 공개하고 적절히 관리하는 것.' },
        { id: 'bp2-8', q: '중개계약서의 핵심 조항은?', a: '서비스 범위, 보수, 책임제한, 면책, 비밀유지, 지배법률, 분쟁해결 조항 등.' },
        { id: 'bp2-9', q: '클레임 지원 범위의 명확화란?', a: '사고 통보, 서류 준비, 보험회사 협상, 보험금 수령 지원 등의 범위를 계약서에 명시.' },
        { id: 'bp2-10', q: '중개계약의 법적 성격은?', a: '위임계약의 성격입니다. 민법상 위임 규정이 적용되며, 선관주의의무 부담.' }
      ]
    },
    {
      title: '보험분석 방법',
      questions: [
        { id: 'bp3-1', q: '기업 위험 진단의 절차는?', a: '①현황조사, ②위험식별, ③위험분석, ④위험평가, ⑤보험 니즈 파악 순서.' },
        { id: 'bp3-2', q: '위험 인벤토리 작성이란?', a: '기업이 보유한 모든 위험을 목록화하는 것. 자산, 책임, 인적, 전략적 위험 등.' },
        { id: 'bp3-3', q: '기존 보험 분석의 포인트는?', a: '담보범위, 보험금액, 면책사항, 보험료, 보험회사, 클레임 경험을 검토.' },
        { id: 'bp3-4', q: '갭(Gap) 분석이란?', a: '현재 보험과 적정 보험 간의 차이를 분석하는 것. 부족담보, 과잉담보 파악.' },
        { id: 'bp3-5', q: '벤치마킹의 활용은?', a: '동종업계 보험 가입 현황과 비교하여 적정성 판단. 모범사례 참조.' },
        { id: 'bp3-6', q: '보험금액 적정성 평가 방법은?', a: '재조달가액, 시가, 매출액, 책임한도 등 기준에 따라 적정 금액 산정.' },
        { id: 'bp3-7', q: '손해경험 분석의 목적은?', a: '과거 손해 패턴 파악, 손해율 분석, 위험개선 포인트 도출, 요율 협상 자료.' },
        { id: 'bp3-8', q: '위험개선 제안의 내용은?', a: '손해예방 조치, 안전관리 강화, 위험통제 방안을 제안하여 보험료 절감 도모.' },
        { id: 'bp3-9', q: '토탈 코스트 오브 리스크(TCOR)란?', a: '보험료+자기부담손실+위험관리비용+간접비용의 합. 총위험비용 최적화가 목표.' },
        { id: 'bp3-10', q: '시장조사(Market Survey)의 방법은?', a: '복수 보험회사에 견적 요청, 조건 비교, 서비스 평가, 재무건전성 검토.' }
      ]
    },
    {
      title: '제안서 작성',
      questions: [
        { id: 'bp4-1', q: '보험제안서의 구성요소는?', a: '위험분석 결과, 보험설계안, 보험회사 비교, 보험료, 특약조건, 서비스 내용.' },
        { id: 'bp4-2', q: '효과적인 제안서의 특징은?', a: '고객 니즈 반영, 명확한 구조, 시각적 표현, 비교 용이, 실행 가능한 제안.' },
        { id: 'bp4-3', q: '보험회사 비교표 작성 시 포함사항은?', a: '담보범위, 면책사항, 보험료, 자기부담금, 부가서비스, 재무등급.' },
        { id: 'bp4-4', q: '조건 협상의 포인트는?', a: '담보범위 확대, 면책 축소, 보험료 인하, 자기부담금 조정, 부가서비스 추가.' },
        { id: 'bp4-5', q: '특별조건(Endorsement) 협상이란?', a: '표준약관에 추가하거나 수정하는 조건. 맞춤형 담보를 위해 협상.' },
        { id: 'bp4-6', q: '제안 프레젠테이션의 요령은?', a: '핵심 내용 중심, 질의응답 준비, 시각자료 활용, 의사결정 지원 정보 제공.' },
        { id: 'bp4-7', q: '가격 협상 전략은?', a: '복수 견적 비교, 장기계약 할인, 손해율 기반 협상, 부가서비스 교환.' },
        { id: 'bp4-8', q: '계약조건 확정 시 확인사항은?', a: '담보내용, 보험료, 면책사항, 특별약관, 보험기간, 결제조건을 최종 확인.' },
        { id: 'bp4-9', q: '보험증권 검토의 중요성은?', a: '제안 내용과 증권 내용 일치 여부 확인. 오류 발견 시 즉시 정정 요청.' },
        { id: 'bp4-10', q: '계약자에 대한 설명의무는?', a: '보험상품 주요 내용, 면책사항, 계약자 의무 등을 이해하기 쉽게 설명해야 함.' }
      ]
    },
    {
      title: '클레임 지원',
      questions: [
        { id: 'bp5-1', q: '클레임 지원의 범위는?', a: '사고통보, 손해조사 지원, 서류 준비, 보험회사 협상, 보험금 수령 지원.' },
        { id: 'bp5-2', q: '사고 발생 시 초기 대응은?', a: '손해 확대 방지, 증거 보전, 사고 통보, 관계기관 신고, 서류 수집 시작.' },
        { id: 'bp5-3', q: '손해통보(Notice of Loss)의 중요성은?', a: '약관상 정해진 기한 내 통보 필요. 지연 시 보상 거절 사유가 될 수 있음.' },
        { id: 'bp5-4', q: '클레임 서류 준비 사항은?', a: '사고경위서, 손해명세서, 증빙서류(영수증, 사진), 관련 계약서 등.' },
        { id: 'bp5-5', q: '손해사정사와의 협력 방법은?', a: '자료 제공, 현장 입회, 손해액 협의, 이견 시 조정, 계약자 입장 대변.' },
        { id: 'bp5-6', q: '보험금 청구 협상 전략은?', a: '약관 근거 제시, 손해 입증자료 충실, 유사 판례 인용, 조정 가능 범위 파악.' },
        { id: 'bp5-7', q: '분쟁 발생 시 대응 방안은?', a: '금융감독원 분쟁조정, 보험중재원 중재, 소송 등. 계약자 이익 최대화 도모.' },
        { id: 'bp5-8', q: '클레임 경험 분석의 활용은?', a: '손해 원인 분석, 재발 방지 대책, 갱신 시 조건 협상 자료로 활용.' },
        { id: 'bp5-9', q: '대위권 행사 지원이란?', a: '제3자에 대한 구상권 행사를 지원하여 보험회사의 손해 회수를 돕는 것.' },
        { id: 'bp5-10', q: '클레임 관리 보고서 작성은?', a: '사고 현황, 처리 경과, 보험금 수령 결과, 개선 제안을 정기적으로 보고.' }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">중개실무</h1>
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
