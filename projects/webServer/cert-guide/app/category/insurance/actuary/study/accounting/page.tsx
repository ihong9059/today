'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function AccountingStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('actuary-accounting-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('actuary-accounting-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIClick = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '재무회계 기초',
      questions: [
        { id: 1, question: '재무회계의 목적과 개념체계를 설명하시오.', answer: '재무회계는 외부이해관계자에게 유용한 정보를 제공합니다. 개념체계는 목적, 질적특성, 인식·측정기준 등을 포함합니다.', prompt: '재무회계의 목적, IASB 개념체계의 구성요소, 질적특성을 설명해주세요' },
        { id: 2, question: '재무제표의 종류와 상호관계를 설명하시오.', answer: '재무상태표, 포괄손익계산서, 현금흐름표, 자본변동표, 주석으로 구성됩니다. 당기순이익은 자본변동표와 연결됩니다.', prompt: '5가지 재무제표의 목적과 상호연결관계를 설명해주세요' },
        { id: 3, question: '발생주의와 현금주의의 차이를 설명하시오.', answer: '발생주의는 거래 발생 시점, 현금주의는 현금 이동 시점에 인식합니다. 재무회계는 발생주의를 원칙으로 합니다.', prompt: '발생주의와 현금주의의 차이, 발생주의의 장점을 설명해주세요' },
        { id: 4, question: '회계순환과정을 설명하시오.', answer: '거래분석 → 분개 → 전기 → 시산표 → 수정분개 → 재무제표 작성 → 마감의 순서로 진행됩니다.', prompt: '회계순환과정의 단계별 내용과 목적을 설명해주세요' },
        { id: 5, question: '복식부기의 원리와 장점을 설명하시오.', answer: '모든 거래를 차변과 대변에 동시에 기록합니다. 자기검증기능, 재산과 손익의 동시파악이 가능합니다.', prompt: '복식부기의 원리, 대차평균의 원리, 장점을 설명해주세요' },
        { id: 6, question: '계정과목 분류체계를 설명하시오.', answer: '자산, 부채, 자본, 수익, 비용으로 대분류됩니다. 자산·부채·자본은 재무상태표, 수익·비용은 손익계산서 항목입니다.', prompt: '5대 계정분류, 각각의 증감 차대 관계를 설명해주세요' },
        { id: 7, question: '수정분개의 종류와 사례를 설명하시오.', answer: '선급비용, 미지급비용, 선수수익, 미수수익, 감가상각 등에 대한 수정분개가 필요합니다.', prompt: '수정분개의 유형별 분개사례와 필요성을 설명해주세요' },
        { id: 8, question: '회계기간과 기간귀속의 원칙을 설명하시오.', answer: '회계기간은 경영성과 측정 단위기간입니다. 수익과 비용은 발생기간에 귀속시켜야 합니다.', prompt: '회계기간의 의의, 기간귀속 원칙, 이연과 발생항목을 설명해주세요' },
        { id: 9, question: '자산·부채의 측정기준을 설명하시오.', answer: '역사적원가, 현행원가, 공정가치, 사용가치 등의 측정기준이 있습니다. 항목별로 적합한 기준을 적용합니다.', prompt: '자산·부채의 측정기준 종류와 적용사례를 설명해주세요' },
        { id: 10, question: '수익인식 5단계 모형을 설명하시오.', answer: '① 계약식별 ② 수행의무식별 ③ 거래가격산정 ④ 거래가격배분 ⑤ 수익인식의 5단계로 구성됩니다.', prompt: 'IFRS 15 수익인식 5단계 모형의 각 단계별 내용을 설명해주세요' }
      ]
    },
    {
      title: '자산회계',
      questions: [
        { id: 11, question: '유동자산과 비유동자산의 분류기준을 설명하시오.', answer: '1년 또는 정상영업주기 내 현금화 가능 여부로 분류합니다. 유동자산은 현금, 매출채권, 재고자산 등입니다.', prompt: '유동자산과 비유동자산의 분류기준, 주요 항목을 설명해주세요' },
        { id: 12, question: '현금및현금성자산의 범위를 설명하시오.', answer: '현금, 요구불예금, 취득 시 만기가 3개월 이내인 단기투자자산이 포함됩니다.', prompt: '현금및현금성자산의 정의, 포함범위, 은행계정조정표를 설명해주세요' },
        { id: 13, question: '매출채권의 평가와 대손충당금을 설명하시오.', answer: '매출채권은 순실현가능가치로 평가합니다. 대손충당금을 설정하여 회수불능액을 추정합니다.', prompt: '매출채권 평가, 대손추정방법, 대손충당금 회계처리를 설명해주세요' },
        { id: 14, question: '재고자산의 원가흐름 가정을 설명하시오.', answer: '개별법, 선입선출법, 평균법 등이 있습니다. 원가흐름 가정에 따라 매출원가와 기말재고가 달라집니다.', prompt: '재고자산 원가흐름 가정의 종류와 각각의 특징을 설명해주세요' },
        { id: 15, question: '저가법(순실현가능가치 평가)을 설명하시오.', answer: '재고자산은 원가와 순실현가능가치 중 낮은 금액으로 평가합니다. 평가손실은 매출원가에 가산합니다.', prompt: '저가법의 적용방법, 평가손실 인식과 환입을 설명해주세요' },
        { id: 16, question: '유형자산의 취득원가 결정을 설명하시오.', answer: '취득원가는 구입가격, 부대비용, 해체비용 현재가치 등을 포함합니다. 정부보조금은 차감표시합니다.', prompt: '유형자산 취득원가의 구성요소, 자본화 이자 처리를 설명해주세요' },
        { id: 17, question: '감가상각 방법을 비교하시오.', answer: '정액법, 정률법, 생산량비례법 등이 있습니다. 정액법은 균등상각, 정률법은 체감상각입니다.', prompt: '주요 감가상각 방법의 계산, 특징, 선택기준을 설명해주세요' },
        { id: 18, question: '유형자산의 재평가모형을 설명하시오.', answer: '원가모형 대안으로 공정가치로 재평가합니다. 평가증가는 기타포괄손익, 평가감소는 당기손익으로 처리합니다.', prompt: '재평가모형의 적용방법, 평가손익의 회계처리를 설명해주세요' },
        { id: 19, question: '무형자산의 인식조건을 설명하시오.', answer: '식별가능성, 통제가능성, 미래경제적효익이 인식조건입니다. 내부창출 브랜드, 고객관계 등은 인식 불가합니다.', prompt: '무형자산 인식요건, 내부창출 무형자산의 처리를 설명해주세요' },
        { id: 20, question: '자산손상검사를 설명하시오.', answer: '회수가능액(순공정가치와 사용가치 중 큰 금액)이 장부금액 미만이면 손상차손을 인식합니다.', prompt: '자산손상의 징후, 회수가능액 산정, 손상차손 회계처리를 설명해주세요' }
      ]
    },
    {
      title: '부채·자본회계',
      questions: [
        { id: 21, question: '유동부채와 비유동부채의 분류를 설명하시오.', answer: '1년 내 결제 의무가 있으면 유동부채입니다. 차입금 조건 위반 시에도 유동분류될 수 있습니다.', prompt: '유동·비유동부채 분류기준, 재분류 사례를 설명해주세요' },
        { id: 22, question: '충당부채의 인식요건과 측정을 설명하시오.', answer: '① 현재의무 존재, ② 자원유출 가능성, ③ 신뢰성 있는 추정이 요건입니다. 최선의 추정치로 측정합니다.', prompt: '충당부채의 인식요건, 우발부채와의 차이를 설명해주세요' },
        { id: 23, question: '사채발행의 회계처리를 설명하시오.', answer: '액면이자율과 시장이자율 차이에 따라 할인(할증)발행합니다. 유효이자율법으로 이자비용을 인식합니다.', prompt: '사채의 할인(할증)발행, 유효이자율법 상각, 이자비용 계산을 설명해주세요' },
        { id: 24, question: '전환사채와 신주인수권부사채를 비교하시오.', answer: '전환사채는 주식전환권, 신주인수권부사채는 신주인수권이 부여됩니다. 부채와 자본요소를 분리 인식합니다.', prompt: '전환사채와 신주인수권부사채의 구조와 회계처리를 설명해주세요' },
        { id: 25, question: '종업원급여 회계처리를 설명하시오.', answer: '단기급여는 발생 시 비용인식, 확정급여형 퇴직급여는 보험수리적 가정으로 부채를 측정합니다.', prompt: '단기종업원급여, 퇴직급여(확정기여형/확정급여형)의 회계처리를 설명해주세요' },
        { id: 26, question: '자본의 구성요소를 설명하시오.', answer: '납입자본(자본금, 주식발행초과금), 이익잉여금, 기타포괄손익누계액, 기타자본 등으로 구성됩니다.', prompt: '자본의 구성요소별 내용과 자본변동표의 구조를 설명해주세요' },
        { id: 27, question: '자기주식 회계처리를 설명하시오.', answer: '자기주식 취득은 자본의 차감항목입니다. 처분 시 처분손익은 자본에서 조정합니다.', prompt: '자기주식 취득, 처분, 소각의 회계처리를 설명해주세요' },
        { id: 28, question: '배당금 회계처리를 설명하시오.', answer: '현금배당은 배당선언일에 부채 인식, 주식배당은 자본 내 재분류입니다.', prompt: '현금배당, 주식배당, 배당가능이익의 계산을 설명해주세요' },
        { id: 29, question: '기타포괄손익의 항목을 설명하시오.', answer: 'FVOCI 평가손익, 해외사업환산손익, 재평가잉여금, 확정급여제도 재측정요소 등이 포함됩니다.', prompt: '기타포괄손익의 종류, 당기손익 재분류 여부를 설명해주세요' },
        { id: 30, question: '이익잉여금처분계산서를 설명하시오.', answer: '처분전이익잉여금에서 배당금, 적립금 적립 등을 차감하여 처분후이익잉여금을 계산합니다.', prompt: '이익잉여금처분계산서의 구조와 작성방법을 설명해주세요' }
      ]
    },
    {
      title: '보험회계',
      questions: [
        { id: 31, question: 'IFRS17의 도입배경과 주요 변화를 설명하시오.', answer: 'IFRS4의 한계를 보완하여 보험부채를 시가로 평가합니다. 보험계약마진(CSM) 개념이 도입되었습니다.', prompt: 'IFRS17 도입배경, IFRS4와의 주요 차이점을 설명해주세요' },
        { id: 32, question: 'IFRS17의 측정모형(일반모형)을 설명하시오.', answer: '보험부채 = 미래현금흐름 현재가치 + 비금융위험 조정 + CSM. 이행현금흐름(FCF)과 CSM으로 구성됩니다.', prompt: 'IFRS17 일반모형(BBA)의 구성요소와 측정방법을 설명해주세요' },
        { id: 33, question: '보험계약마진(CSM)의 개념과 상각을 설명하시오.', answer: 'CSM은 미실현이익으로, 보장서비스 제공에 따라 보험수익으로 인식합니다. 최초 인식 후 조정됩니다.', prompt: 'CSM의 정의, 최초인식, 후속측정, 상각방법을 설명해주세요' },
        { id: 34, question: '변동수수료접근법(VFA)을 설명하시오.', answer: '직접참가특성이 있는 보험계약에 적용합니다. 변동수수료를 CSM으로 조정하여 인식합니다.', prompt: 'VFA의 적용요건, 일반모형과의 차이를 설명해주세요' },
        { id: 35, question: '보험료배분접근법(PAA)을 설명하시오.', answer: '잔여보장부채를 보험료 수취로 측정하는 간편법입니다. 단기보험에 주로 적용됩니다.', prompt: 'PAA의 적용요건, 잔여보장부채와 발생사고부채의 측정을 설명해주세요' },
        { id: 36, question: '보험수익의 인식방법을 설명하시오.', answer: 'IFRS17에서 보험수익은 서비스 제공에 따라 인식합니다. 수취보험료가 아닌 서비스 기반 수익입니다.', prompt: 'IFRS17의 보험수익 인식방법, 수취보험료와의 차이를 설명해주세요' },
        { id: 37, question: '보험부채 할인율 결정을 설명하시오.', answer: '보험계약의 특성을 반영한 할인율을 사용합니다. 상향식(무위험+유동성프리미엄) 또는 하향식 접근법을 적용합니다.', prompt: 'IFRS17 할인율 결정방법, 이자율변동의 OCI 선택을 설명해주세요' },
        { id: 38, question: '비금융위험에 대한 위험조정을 설명하시오.', answer: '미래현금흐름의 불확실성에 대한 보상입니다. 신뢰수준법, 원가법 등으로 측정합니다.', prompt: '위험조정의 정의, 측정방법, 공시요구사항을 설명해주세요' },
        { id: 39, question: '재보험계약의 회계처리를 설명하시오.', answer: '원보험계약과 별도로 재보험계약을 인식합니다. 출재보험은 자산, 수재보험은 부채로 표시합니다.', prompt: 'IFRS17에서 재보험계약의 인식, 측정, 표시를 설명해주세요' },
        { id: 40, question: '보험회사 재무제표의 특수성을 설명하시오.', answer: '보험부채가 가장 큰 부채항목이며, 보험수익-보험서비스비용 형태로 손익을 표시합니다.', prompt: '보험회사 재무상태표와 손익계산서의 특수한 구조를 설명해주세요' }
      ]
    },
    {
      title: '원가관리회계',
      questions: [
        { id: 41, question: '원가의 분류방법을 설명하시오.', answer: '기능별(제조/판관비), 행태별(변동/고정), 추적가능성(직접/간접) 등으로 분류합니다.', prompt: '원가분류의 기준과 각 분류의 의미를 설명해주세요' },
        { id: 42, question: '변동원가와 고정원가의 특성을 설명하시오.', answer: '변동원가는 조업도에 비례, 고정원가는 일정합니다. 총액과 단위당 원가의 행태가 다릅니다.', prompt: '변동원가와 고정원가의 특성, CVP 분석에서의 활용을 설명해주세요' },
        { id: 43, question: '손익분기점 분석(CVP)을 설명하시오.', answer: 'BEP 매출액 = 고정원가/(1-변동비율). 손익분기점에서 영업이익이 0이 됩니다.', prompt: '손익분기점 계산, 안전한계, 영업레버리지를 설명해주세요' },
        { id: 44, question: '개별원가계산과 종합원가계산을 비교하시오.', answer: '개별원가는 작업별, 종합원가는 공정별로 원가를 집계합니다. 제품특성에 따라 선택합니다.', prompt: '개별원가계산과 종합원가계산의 차이, 적용상황을 설명해주세요' },
        { id: 45, question: '활동기준원가계산(ABC)을 설명하시오.', answer: '원가를 활동별로 집계한 후 활동에 따라 제품에 배분합니다. 전통적 방법보다 정확한 원가계산이 가능합니다.', prompt: 'ABC의 개념, 원가동인, 전통적 원가계산과의 차이를 설명해주세요' },
        { id: 46, question: '표준원가계산과 차이분석을 설명하시오.', answer: '표준원가와 실제원가의 차이를 분석합니다. 가격차이, 수량차이 등으로 분해하여 원인을 파악합니다.', prompt: '표준원가계산의 목적, 차이분석 방법을 설명해주세요' },
        { id: 47, question: '변동원가계산과 전부원가계산을 비교하시오.', answer: '변동원가계산은 변동제조원가만, 전부원가계산은 모든 제조원가를 제품원가로 합니다.', prompt: '변동원가계산과 전부원가계산의 차이, 영업이익 차이 원인을 설명해주세요' },
        { id: 48, question: '대체가격(이전가격)의 결정방법을 설명하시오.', answer: '시장가격, 원가기준, 협상가격 등의 방법이 있습니다. 사업부 성과평가와 세무에 영향을 미칩니다.', prompt: '대체가격의 결정방법과 각 방법의 장단점을 설명해주세요' },
        { id: 49, question: '성과평가지표(ROI, RI, EVA)를 비교하시오.', answer: 'ROI는 투자수익률, RI는 잔여이익, EVA는 경제적부가가치입니다. 각각 장단점이 있습니다.', prompt: 'ROI, RI, EVA의 계산방법과 장단점을 설명해주세요' },
        { id: 50, question: '균형성과표(BSC)를 설명하시오.', answer: '재무, 고객, 내부프로세스, 학습성장 관점에서 균형있게 성과를 측정합니다.', prompt: 'BSC의 4가지 관점, 전략지도, 성과지표의 연계를 설명해주세요' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = completedQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/actuary" className="text-gray-500 hover:text-gray-700">보험계리사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-purple-600 font-medium">회계학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">회계학</h1>
          <p className="text-gray-600">Accounting - 재무회계, 보험회계, 원가관리회계</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div className="bg-purple-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} />
            </div>
            <span className="text-sm text-gray-500">{completedCount}/{totalQuestions} 완료</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button onClick={() => setOpenTopic(openTopic === topicIdx ? null : topicIdx)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  <div className="text-left">
                    <h2 className="font-bold">{topic.title}</h2>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <span className={`transform transition-transform ${openTopic === topicIdx ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {openTopic === topicIdx && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-xl border ${completedQuestions.has(q.id) ? 'bg-purple-50 border-purple-200' : 'bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleComplete(q.id)} className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${completedQuestions.has(q.id) ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-3">{q.answer}</p>
                          <button onClick={() => handleAIClick(q.prompt)} className="text-sm text-purple-600 hover:text-purple-700">🤖 AI에게 더 자세히 질문하기</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/category/insurance/actuary" className="text-purple-600 hover:text-purple-700 font-medium">← 보험계리사 메인으로</Link>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700">{currentPrompt}</p>
            </div>
            <div className="grid gap-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Gemini에게 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
