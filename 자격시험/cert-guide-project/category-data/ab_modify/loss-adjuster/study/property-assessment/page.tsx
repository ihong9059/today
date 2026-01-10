'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PropertyAssessmentPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('loss-adjuster-property-assessment-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('loss-adjuster-property-assessment-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIHelp = (q: any) => {
    setCurrentQuestion(q);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '화재보험 손해사정',
      questions: [
        { id: 'pa1-1', q: '화재보험의 담보 범위는?', a: '화재, 낙뢰, 폭발·파열 등으로 인한 직접손해를 담보합니다. 연소손해, 소방손해, 피난손해도 포함됩니다.' },
        { id: 'pa1-2', q: '화재의 3요소는?', a: '①점화원(열원), ②가연물(연료), ③산소(공기)입니다. 이 세 가지가 동시에 존재해야 화재가 발생합니다.' },
        { id: 'pa1-3', q: '화재 원인 분류는?', a: '①전기화재, ②가스화재, ③유류화재, ④방화, ⑤담배꽁초, ⑥불꽃·불티 등으로 구분합니다.' },
        { id: 'pa1-4', q: '화재조사의 순서는?', a: '외부관찰→발화점 추정→발화점 조사→발화원 확정→연소확대 경로 확인 순으로 진행합니다.' },
        { id: 'pa1-5', q: '발화점(Point of Origin) 판정 기준은?', a: '탄화심도, V패턴, 연소형태, 목격자 진술, 잔해물 분석 등을 종합하여 판정합니다.' },
        { id: 'pa1-6', q: '소방손해의 범위는?', a: '화재 진압 과정에서 발생한 손해입니다. 소화수 손해, 진압 중 파괴 손해, 화학약품 손해 등이 포함됩니다.' },
        { id: 'pa1-7', q: '피난손해란?', a: '화재 시 피난으로 인한 보험목적물의 손해입니다. 분실, 도난, 파손 등이 해당됩니다.' },
        { id: 'pa1-8', q: '화재보험 면책사항은?', a: '지진, 분화에 의한 화재, 고의 방화, 전쟁, 핵위험 등은 면책입니다. 중과실도 약관에 따라 면책될 수 있습니다.' },
        { id: 'pa1-9', q: '잔존물 처리방법은?', a: '잔존물은 손해액에서 공제하거나, 보험자가 잔존물대위로 취득합니다. 계약자 동의 하에 처분합니다.' },
        { id: 'pa1-10', q: '화재 감식의 법적 효력은?', a: '소방서 화재조사서는 공문서로 증거력이 높습니다. 손해사정사는 이를 기초로 하되 독자적 판단을 합니다.' }
      ]
    },
    {
      title: '재물보험 손해액 산정',
      questions: [
        { id: 'pa2-1', q: '건물 손해액 산정방법은?', a: '①복구비용 산정(수리비), ②전손 시 재조달가액 또는 시가, ③수리불능 시 잔존가치 공제 방식을 적용합니다.' },
        { id: 'pa2-2', q: '건물 재조달가액 산정방법은?', a: '건축비 지수, 표준건축비, 실제 건축비용 등을 기준으로 산정합니다. 건물 구조, 용도, 면적을 반영합니다.' },
        { id: 'pa2-3', q: '건물 감가상각 계산법은?', a: '정액법: (취득가-잔존가치)/내용연수×경과연수. 경과연수와 내용연수의 비율로 감가율을 산정합니다.' },
        { id: 'pa2-4', q: '기계장치 손해액 산정방법은?', a: '수리비, 교체비용, 가동중단손해 등을 산정합니다. 기계의 특성상 기술적 진부화도 고려합니다.' },
        { id: 'pa2-5', q: '재고자산 손해액 산정방법은?', a: '원가주의(취득원가), 시가주의(판매가-정상이익), 실지재고조사법 등을 적용합니다.' },
        { id: 'pa2-6', q: '집기·비품 손해액 산정은?', a: '취득가액에서 감가상각액을 공제한 시가로 산정합니다. 개별 물건마다 내용연수가 다릅니다.' },
        { id: 'pa2-7', q: '수리비 산정 시 주의사항은?', a: '수리범위 확정, 적정 단가 적용, 개량부분 제외, 수리업체 선정의 합리성 등을 검토합니다.' },
        { id: 'pa2-8', q: '간접손해 산정방법은?', a: '휴업손해: 매출감소액-절감비용. 기업휴지보험에서 담보하며, 보상한도와 기간이 약정되어 있습니다.' },
        { id: 'pa2-9', q: '손해방지비용의 범위는?', a: '소화기 사용비용, 소방설비 가동비용, 긴급 임시조치 비용 등 합리적이고 필요한 비용입니다.' },
        { id: 'pa2-10', q: '전손과 분손의 구별 기준은?', a: '수리비가 보험가액의 일정비율(보통 80%)을 초과하면 추정전손, 물리적 멸실은 현실전손입니다.' }
      ]
    },
    {
      title: '특종보험 실무',
      questions: [
        { id: 'pa3-1', q: '도난보험의 담보 범위는?', a: '강도, 절도에 의한 보험목적물의 분실, 훼손 손해를 담보합니다. 단순분실, 횡령은 면책입니다.' },
        { id: 'pa3-2', q: '도난 사고의 입증 방법은?', a: '경찰신고서, CCTV 영상, 침입 흔적, 목격자 진술 등으로 도난 사실을 입증합니다.' },
        { id: 'pa3-3', q: '유리보험의 특징은?', a: '우연한 사고로 인한 유리의 파손을 담보합니다. 파손 원인에 관계없이 보상하는 포괄담보 방식입니다.' },
        { id: 'pa3-4', q: '기계보험의 담보 범위는?', a: '기계의 돌발적 사고로 인한 물적 손해를 담보합니다. 설계결함, 재질결함, 조작미숙 등이 포함됩니다.' },
        { id: 'pa3-5', q: '건설공사보험(CAR)의 담보는?', a: '공사 중 우연한 사고로 인한 공사목적물의 손해를 담보합니다. 제3자 배상책임도 포함됩니다.' },
        { id: 'pa3-6', q: '동산종합보험의 특징은?', a: '이동 가능한 동산에 대해 화재, 도난, 파손 등 복합위험을 포괄담보하는 보험입니다.' },
        { id: 'pa3-7', q: '배상책임보험 손해사정 특징은?', a: '법률상 배상책임 성립 여부, 손해배상액, 방어비용 등을 산정합니다. 과실비율 판단이 중요합니다.' },
        { id: 'pa3-8', q: '영업배상책임보험의 범위는?', a: '사업활동 중 제3자에게 입힌 신체상해, 재물손해에 대한 법률상 배상책임을 담보합니다.' },
        { id: 'pa3-9', q: '생산물배상책임보험이란?', a: '제조·판매한 제품의 결함으로 발생한 제3자 손해에 대한 배상책임을 담보하는 보험입니다.' },
        { id: 'pa3-10', q: '전문인배상책임보험의 특징은?', a: '전문직 업무 수행 중 과실로 의뢰인에게 입힌 손해를 담보합니다. 의사, 변호사, 회계사 등이 대상입니다.' }
      ]
    },
    {
      title: '재조달가액 산정',
      questions: [
        { id: 'pa4-1', q: '재조달가액의 정의는?', a: '손해 발생 당시 동일한 용도의 물건을 새로 취득하는 데 필요한 금액입니다. 감가상각을 하지 않습니다.' },
        { id: 'pa4-2', q: '재조달가액 특약의 효과는?', a: '감가상각 없이 새 물건의 가격으로 보상합니다. 보험료가 높지만 충분한 보상을 받을 수 있습니다.' },
        { id: 'pa4-3', q: '건물 재조달가액 산정요소는?', a: '구조(철근콘크리트, 철골 등), 용도, 면적, 건축년도, 지역, 부대설비 등을 고려합니다.' },
        { id: 'pa4-4', q: '표준건축비 적용방법은?', a: '한국감정원이나 건설업협회 발표 표준단가에 면적을 곱하고, 구조별·용도별 계수를 적용합니다.' },
        { id: 'pa4-5', q: '기계 재조달가액 산정법은?', a: '동일 기계의 현재 구입가격이 기준입니다. 단종 시 대체기계 가격이나 수입 시 관세 포함가격을 적용합니다.' },
        { id: 'pa4-6', q: '재고자산 재조달가액 기준은?', a: '상품은 매입단가, 제품은 제조원가, 원재료는 취득원가를 기준으로 현재 시점 가격을 적용합니다.' },
        { id: 'pa4-7', q: '재조달가액과 시가의 차이는?', a: '재조달가액은 새 물건 가격, 시가는 감가상각을 반영한 현재 가치입니다. 재조달가액이 항상 높습니다.' },
        { id: 'pa4-8', q: '재조달가액 적용의 조건은?', a: '통상 실제 복구(수리 또는 재취득)를 조건으로 합니다. 복구하지 않으면 시가로 보상하기도 합니다.' },
        { id: 'pa4-9', q: '부분손해 시 재조달가액 적용은?', a: '손상 부분의 수리비 또는 교체비용을 재조달가액 기준으로 산정합니다. 전체 교체 여부 판단이 중요합니다.' },
        { id: 'pa4-10', q: '인플레이션 조정조항이란?', a: '보험기간 중 물가상승을 반영하여 보험금액을 자동조정하는 조항입니다. 일부보험 방지 목적입니다.' }
      ]
    },
    {
      title: '감가상각 계산',
      questions: [
        { id: 'pa5-1', q: '감가상각의 목적은?', a: '자산의 경제적 가치 감소를 반영하여 공정한 손해액을 산정하기 위함입니다. 이득금지원칙을 실현합니다.' },
        { id: 'pa5-2', q: '정액법 감가상각 계산은?', a: '연간감가액 = (취득가액-잔존가치)/내용연수. 매년 동일한 금액을 감가합니다.' },
        { id: 'pa5-3', q: '정률법 감가상각 계산은?', a: '연간감가액 = 기초장부가액×상각률. 초기에 많이 상각되고 점차 감소합니다.' },
        { id: 'pa5-4', q: '잔존가치(Salvage Value)란?', a: '내용연수 종료 후 자산의 예상처분가액입니다. 보통 취득가액의 10%로 설정합니다.' },
        { id: 'pa5-5', q: '내용연수 결정 기준은?', a: '물리적 내용연수(물리적 마모), 기능적 내용연수(기술진부화), 경제적 내용연수를 종합 고려합니다.' },
        { id: 'pa5-6', q: '건물의 표준 내용연수는?', a: '철근콘크리트 50년, 철골조 40년, 블록조 30년, 목조 20년 정도입니다. 실제 사용상태도 반영합니다.' },
        { id: 'pa5-7', q: '기계장치 내용연수 특성은?', a: '기계 종류별로 5~20년으로 다양합니다. 기술발전이 빠른 분야는 짧게, 범용기계는 길게 적용합니다.' },
        { id: 'pa5-8', q: '감가상각 시 관찰감가란?', a: '실제 사용상태를 관찰하여 감가율을 조정하는 것입니다. 잘 관리된 물건은 감가율을 낮출 수 있습니다.' },
        { id: 'pa5-9', q: '초과감가의 개념은?', a: '내용연수를 초과하여 사용 중인 자산의 가치 산정입니다. 잔존가치 이하로 평가하지 않는 것이 원칙입니다.' },
        { id: 'pa5-10', q: '감가상각과 보험금의 관계는?', a: '시가 기준 보험은 감가상각을 적용하고, 재조달가액 특약은 적용하지 않습니다. 약관 확인이 필요합니다.' }
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">재물손해사정</h1>
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
