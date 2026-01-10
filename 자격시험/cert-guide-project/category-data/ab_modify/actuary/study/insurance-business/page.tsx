'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function InsuranceBusinessStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('actuary-insurance-business-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('actuary-insurance-business-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIClick = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '보험업법',
      questions: [
        { id: 1, question: '보험업법의 목적과 적용범위를 설명하시오.', answer: '보험업을 영위하는 자의 건전한 경영과 보험계약자 보호를 목적으로 합니다. 보험업, 보험회사, 모집종사자 등에 적용됩니다.', prompt: '보험업법의 목적, 적용대상, 규제체계를 설명해주세요' },
        { id: 2, question: '보험업 허가요건과 절차를 설명하시오.', answer: '자본금(생보 300억, 손보 300억), 사업계획, 전문인력 등 요건을 갖추어 금융위원회 허가를 받아야 합니다.', prompt: '보험업 허가요건, 허가절차, 허가취소 사유를 설명해주세요' },
        { id: 3, question: '보험회사의 업무범위를 설명하시오.', answer: '고유업무(보험업), 부수업무(자산운용 등), 겸영업무(신용카드 등)로 구분됩니다. 업무 간 이해상충을 방지해야 합니다.', prompt: '보험회사의 고유업무, 부수업무, 겸영업무의 범위를 설명해주세요' },
        { id: 4, question: '보험상품의 기초서류 제도를 설명하시오.', answer: '보험약관, 사업방법서, 보험료 및 책임준비금 산출방법서가 기초서류입니다. 금융위 신고 또는 인가가 필요합니다.', prompt: '기초서류의 종류, 신고제와 인가제의 차이, 기초서류 변경절차를 설명해주세요' },
        { id: 5, question: '보험계약의 모집규제를 설명하시오.', answer: '등록된 모집종사자만 모집 가능합니다. 설명의무, 적합성원칙, 부당권유금지 등의 판매행위 규제가 있습니다.', prompt: '모집종사자의 종류, 모집행위 규제, 불공정행위 금지를 설명해주세요' },
        { id: 6, question: '보험회사의 자산운용 규제를 설명하시오.', answer: '총자산의 일정비율 이내에서 투자해야 합니다. 동일인 대출한도, 부동산 취득한도 등 규제가 있습니다.', prompt: '자산운용 규제의 종류와 한도, 규제 취지를 설명해주세요' },
        { id: 7, question: '대주주와의 거래제한을 설명하시오.', answer: '대주주에 대한 신용공여, 자산거래 등이 제한됩니다. 이해상충 방지와 건전경영을 위한 규제입니다.', prompt: '대주주 관련 거래제한의 내용과 예외사유를 설명해주세요' },
        { id: 8, question: '보험회사의 건전성 규제를 설명하시오.', answer: 'RBC비율 100% 이상 유지, 유동성비율, 대손충당금 적립 등 건전성 기준을 준수해야 합니다.', prompt: '보험회사 건전성 규제의 종류와 기준을 설명해주세요' },
        { id: 9, question: '보험회사의 공시의무를 설명하시오.', answer: '경영공시, 상품공시, 비교공시 등을 통해 정보를 공개해야 합니다. 보험소비자 보호를 위한 제도입니다.', prompt: '보험회사 공시제도의 종류와 내용을 설명해주세요' },
        { id: 10, question: '보험회사의 제재와 처분을 설명하시오.', answer: '허가취소, 업무정지, 기관경고, 과태료 등의 제재가 있습니다. 임직원에 대한 제재도 가능합니다.', prompt: '보험업법상 제재의 종류와 사유, 절차를 설명해주세요' }
      ]
    },
    {
      title: '보험감독규정',
      questions: [
        { id: 11, question: 'RBC(지급여력비율) 제도를 설명하시오.', answer: 'RBC비율 = 지급여력금액/지급여력기준금액 × 100. 위험을 보험, 금리, 신용, 시장, 운영리스크로 구분하여 측정합니다.', prompt: 'RBC비율의 계산방법, 위험액 산출, 규제비율을 설명해주세요' },
        { id: 12, question: '보험회사의 조기경보제도를 설명하시오.', answer: 'RBC비율 수준에 따라 정상, 관심, 주의, 경영개선권고, 명령, 요청 등 단계별 조치를 취합니다.', prompt: '적기시정조치의 단계, 각 단계별 조치내용을 설명해주세요' },
        { id: 13, question: '책임준비금 적립기준을 설명하시오.', answer: '보험료적립금, 미경과보험료적립금, 지급준비금, 계약자이익배당준비금 등을 적립해야 합니다.', prompt: '책임준비금의 종류와 적립방법, 법정적립액 산출을 설명해주세요' },
        { id: 14, question: '비상위험준비금 제도를 설명하시오.', answer: '장래 비정상적 위험에 대비하여 이익의 일정액을 적립합니다. 보험종목별로 적립기준이 다릅니다.', prompt: '비상위험준비금의 적립목적, 적립방법, 사용요건을 설명해주세요' },
        { id: 15, question: '해약환급금 산출기준을 설명하시오.', answer: '책임준비금에서 미상각신계약비, 해약공제액 등을 차감하여 산출합니다. 최저해약환급금 기준이 있습니다.', prompt: '해약환급금의 산출구조, 최저보증, 공시기준을 설명해주세요' },
        { id: 16, question: '변액보험의 특별계정 운용규정을 설명하시오.', answer: '변액보험 자산은 일반계정과 분리된 특별계정에서 운용합니다. 펀드유형별 운용규제가 있습니다.', prompt: '변액보험 특별계정의 설정, 운용규제, 수익배분을 설명해주세요' },
        { id: 17, question: '보험료 산출의 원칙을 설명하시오.', answer: '수지상등, 급부반대급부균등, 보험수리적 공정성 원칙에 따라 보험료를 산출합니다.', prompt: '보험료 산출의 기본원칙, 예정기초율의 종류를 설명해주세요' },
        { id: 18, question: '보험상품 심사제도를 설명하시오.', answer: '기초서류 신고 시 금융감독원이 사전심사합니다. 불공정조항, 불합리한 보험료 등을 심사합니다.', prompt: '보험상품 심사의 기준과 절차, 조건부신고 제도를 설명해주세요' },
        { id: 19, question: '보험회사 검사제도를 설명하시오.', answer: '금융감독원이 정기검사, 수시검사를 실시합니다. 건전성, 업무행위, 내부통제 등을 검사합니다.', prompt: '보험회사 검사의 종류, 검사항목, 검사결과 조치를 설명해주세요' },
        { id: 20, question: '보험회사 지배구조 규제를 설명하시오.', answer: '이사회, 감사위원회, 위험관리위원회 등 내부통제체계를 갖추어야 합니다. 사외이사 비율 규정이 있습니다.', prompt: '보험회사 지배구조 규제, 내부통제기준, 이사회 구성을 설명해주세요' }
      ]
    },
    {
      title: '계리업무 실무',
      questions: [
        { id: 21, question: '보험계리사의 역할과 책임을 설명하시오.', answer: '보험료 산출, 책임준비금 평가, 상품개발 등을 수행합니다. 선임계리사는 확인업무, 의견서 제출 등의 책임이 있습니다.', prompt: '보험계리사의 업무범위, 선임계리사의 역할과 책임을 설명해주세요' },
        { id: 22, question: '예정기초율 결정과정을 설명하시오.', answer: '예정이율, 예정위험률, 예정사업비율을 결정합니다. 통계, 경험률, 시장금리 등을 반영합니다.', prompt: '예정기초율의 종류별 결정방법과 고려요소를 설명해주세요' },
        { id: 23, question: '순보험료와 영업보험료의 관계를 설명하시오.', answer: '영업보험료 = 순보험료 + 부가보험료. 순보험료는 급부 원가, 부가보험료는 사업비 원가입니다.', prompt: '순보험료와 영업보험료의 구성, 각 요소의 산출방법을 설명해주세요' },
        { id: 24, question: '위험률 산출과 경험통계를 설명하시오.', answer: '사망률, 발생률 등은 경험통계를 기반으로 산출합니다. 표준경험표와 자사경험률을 비교 검토합니다.', prompt: '위험률 산출과정, 경험통계 분석, 신뢰도 검증을 설명해주세요' },
        { id: 25, question: '보험상품 개발 절차를 설명하시오.', answer: '시장분석 → 상품설계 → 수익성 분석 → 기초서류 작성 → 감독당국 신고 → 판매의 절차로 진행됩니다.', prompt: '보험상품 개발의 단계별 절차와 계리사의 역할을 설명해주세요' },
        { id: 26, question: '수익성 분석(Pricing)을 설명하시오.', answer: '손익분기점 분석, 이익률 분석, 민감도 분석 등을 수행합니다. 목표수익률 달성 여부를 검증합니다.', prompt: '보험상품 수익성 분석의 방법, 주요 지표, 시나리오 분석을 설명해주세요' },
        { id: 27, question: '상품별 특성을 고려한 계리적 분석을 설명하시오.', answer: '보장성/저축성, 정액/실손, 개인/단체 등 특성에 따라 분석방법이 다릅니다.', prompt: '보험상품 유형별 계리적 특성과 분석시 고려사항을 설명해주세요' },
        { id: 28, question: '경험률 분석과 요율조정을 설명하시오.', answer: '실제 손해율, 사업비율 등을 예정률과 비교하여 요율조정 필요성을 판단합니다.', prompt: '경험률 분석방법, 요율조정 절차, 손해율 관리를 설명해주세요' },
        { id: 29, question: '계리적 손익분석을 설명하시오.', answer: '위험차, 이자차, 사업비차, 해약차 등으로 손익을 분해하여 원인을 분석합니다.', prompt: '계리적 손익분석의 방법, 이원별 분석, 실적 관리를 설명해주세요' },
        { id: 30, question: '계리보고서 작성을 설명하시오.', answer: '책임준비금 적정성 의견서, 보험료 산출 의견서 등을 작성합니다. 감독당국 제출이 필요합니다.', prompt: '계리보고서의 종류, 작성기준, 제출시기를 설명해주세요' }
      ]
    },
    {
      title: '준비금 적립',
      questions: [
        { id: 31, question: '보험료적립금의 평가방법을 설명하시오.', answer: '순보험료식, 해약환급금식, Zillmer식 등의 방법이 있습니다. 법정기준에 따라 평가합니다.', prompt: '보험료적립금 평가방법의 종류와 차이, 법정적립기준을 설명해주세요' },
        { id: 32, question: '미경과보험료적립금 산출을 설명하시오.', answer: '수입보험료 중 미경과기간에 해당하는 부분입니다. 1/365법, 월할법 등으로 산출합니다.', prompt: '미경과보험료적립금의 산출방법, 일할법과 월할법의 차이를 설명해주세요' },
        { id: 33, question: 'IBNR(미보고발생손해액) 추정을 설명하시오.', answer: '이미 발생했으나 보고되지 않은 손해를 추정합니다. Chain-Ladder법, BF법 등을 사용합니다.', prompt: 'IBNR 추정방법, 삼각형표 분석, 추정치 검증을 설명해주세요' },
        { id: 34, question: '지급준비금 적립기준을 설명하시오.', answer: '보고된 손해에 대한 추정액과 IBNR을 합한 금액입니다. 개별추정법, 통계적 방법을 사용합니다.', prompt: '지급준비금의 구성, 적립방법, 적정성 검증을 설명해주세요' },
        { id: 35, question: '계약자배당준비금을 설명하시오.', answer: '유배당보험의 배당재원으로 적립합니다. 이익 발생 시 일정비율을 적립합니다.', prompt: '계약자배당준비금의 적립기준, 배당방법, 평활화를 설명해주세요' },
        { id: 36, question: 'LAT(책임준비금 적정성 평가)를 설명하시오.', answer: '책임준비금이 미래현금흐름의 현재가치보다 충분한지 평가합니다. 부족 시 추가적립합니다.', prompt: 'LAT의 의의, 평가방법, 부족 시 조치를 설명해주세요' },
        { id: 37, question: '금리연동형 준비금 평가를 설명하시오.', answer: '금리연동형 상품은 공시이율과 연동하여 준비금을 평가합니다. 최저보증 부분의 평가가 중요합니다.', prompt: '금리연동형 상품의 준비금 평가, 최저보증준비금을 설명해주세요' },
        { id: 38, question: '변액보험 준비금 평가를 설명하시오.', answer: '투자실적에 따라 변동하는 계정과 최저보증 부분을 구분하여 평가합니다.', prompt: '변액보험의 책임준비금 평가, 보증준비금 산출을 설명해주세요' },
        { id: 39, question: '실손의료보험 준비금 특성을 설명하시오.', answer: '갱신형으로 미경과보험료와 지급준비금이 주요 준비금입니다. 손해율 변동에 민감합니다.', prompt: '실손의료보험의 준비금 특성, 손해율 관리를 설명해주세요' },
        { id: 40, question: '재보험 출재 시 준비금 처리를 설명하시오.', answer: '출재보험료, 출재준비금, 재보험자산 등을 적절히 인식합니다. 출재효과를 반영합니다.', prompt: '재보험 출재의 회계처리, 출재준비금, 재보험자산을 설명해주세요' }
      ]
    },
    {
      title: '건전성 규제',
      questions: [
        { id: 41, question: 'K-ICS(신지급여력제도)를 설명하시오.', answer: 'IFRS17에 맞춰 도입된 새로운 지급여력제도입니다. 시가평가 기반으로 위험액을 산출합니다.', prompt: 'K-ICS의 도입배경, RBC와의 차이, 주요 내용을 설명해주세요' },
        { id: 42, question: '보험리스크 측정방법을 설명하시오.', answer: '사망, 장해, 질병, 해지 등의 리스크를 측정합니다. 시나리오법, 계수법 등을 사용합니다.', prompt: '보험리스크의 종류와 측정방법, 위험계수를 설명해주세요' },
        { id: 43, question: '금리리스크 측정방법을 설명하시오.', answer: '금리변동에 따른 자산·부채 가치변동 위험입니다. 듀레이션갭, 시나리오 분석 등으로 측정합니다.', prompt: '금리리스크의 측정방법, ALM, 듀레이션 매칭을 설명해주세요' },
        { id: 44, question: '신용리스크 측정방법을 설명하시오.', answer: '거래상대방의 채무불이행 위험입니다. 신용등급, 부도확률 등을 기반으로 측정합니다.', prompt: '신용리스크의 측정방법, 신용등급별 위험계수를 설명해주세요' },
        { id: 45, question: '시장리스크 측정방법을 설명하시오.', answer: '시장가격 변동에 따른 손실 위험입니다. VaR, 스트레스테스트 등으로 측정합니다.', prompt: '시장리스크의 종류와 측정방법, VaR 산출을 설명해주세요' },
        { id: 46, question: '운영리스크 측정방법을 설명하시오.', answer: '내부프로세스, 인력, 시스템 실패 등의 위험입니다. 기본지표법, 내부측정법 등이 있습니다.', prompt: '운영리스크의 정의, 측정방법, 관리방안을 설명해주세요' },
        { id: 47, question: 'ORSA(자체위험·지급여력평가)를 설명하시오.', answer: '보험회사가 자체적으로 위험과 지급여력을 평가합니다. 전사적 위험관리의 핵심입니다.', prompt: 'ORSA의 목적, 주요 내용, 보고체계를 설명해주세요' },
        { id: 48, question: '스트레스테스트를 설명하시오.', answer: '극단적 시나리오에서 재무상태를 분석합니다. 민감도 분석, 시나리오 분석 등을 수행합니다.', prompt: '스트레스테스트의 목적, 방법, 시나리오 설정을 설명해주세요' },
        { id: 49, question: '보험회사 자본관리를 설명하시오.', answer: '지급여력비율 목표 수준을 설정하고 관리합니다. 자본확충, 위험조정 전략을 수립합니다.', prompt: '자본관리 전략, 자본확충 방안, 자본적정성 관리를 설명해주세요' },
        { id: 50, question: 'ERM(전사적 위험관리)을 설명하시오.', answer: '전사적 관점에서 리스크를 통합 관리합니다. 위험식별, 측정, 통제, 모니터링 체계를 구축합니다.', prompt: 'ERM의 개념, 구성요소, 보험회사에서의 적용을 설명해주세요' }
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
            <span className="text-purple-600 font-medium">보험업법및실무</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">보험업법및실무</h1>
          <p className="text-gray-600">Insurance Business Law & Practice - 보험업법, 감독규정, 계리실무</p>
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
                  <span className="text-2xl">📋</span>
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
