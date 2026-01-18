'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['calculation']);

  useEffect(() => {
    const saved = localStorage.getItem('customs-broker-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('customs-broker-practical-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 계산문제연습 (1-10)
    { id: 1, topic: 'calculation', question: '수입물품 과세가격 계산 종합문제를 풀이하시오.', answer: 'CIF 가격에 가산요소를 더하고 공제요소를 빼서 과세가격을 산출한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 수입거래의 과세가격을 계산하시오.\n\n[자료]\n- FOB 가격: $80,000\n- 해상운임: $5,000\n- 보험료: $800\n- 로열티(판매조건): 물품가격의 5%\n- 수입후 설치비: $3,000\n- 환율: 1,300원\n\n다음 순서로 풀이해주세요:\n1. CIF 가격 계산\n2. 가산요소 분석(로열티)\n3. 공제요소 분석(설치비)\n4. 과세가격 결정\n5. 원화 환산' },
    { id: 2, topic: 'calculation', question: '관세 및 내국세 종합 계산 문제를 풀이하시오.', answer: '과세가격에 관세, 개별소비세, 교육세, 부가가치세를 순차 계산한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 수입물품의 총 세액을 계산하시오.\n\n[자료]\n- 승용자동차 CIF: $50,000\n- 환율: 1,300원\n- 관세율: 8%\n- 개별소비세율: 5%\n- 교육세율: 30%\n- 부가가치세율: 10%\n\n다음 순서로 풀이해주세요:\n1. 과세가격 계산\n2. 관세 계산\n3. 개별소비세 계산\n4. 교육세 계산\n5. 부가가치세 계산' },
    { id: 3, topic: 'calculation', question: 'FTA 협정세율 적용 시 관세 절감액을 계산하시오.', answer: 'FTA 협정세율과 기본세율의 차이로 관세 절감 효과를 계산한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 수입에 FTA를 적용한 경우 관세 절감액을 계산하시오.\n\n[자료]\n- CIF 가격: $100,000\n- 환율: 1,300원\n- 기본세율: 10%\n- 한-EU FTA 협정세율: 0%\n- 농어촌특별세율: 20%(감면세액 기준)\n\n다음 순서로 풀이해주세요:\n1. 기본세율 적용 시 관세\n2. FTA 적용 시 관세\n3. 농어촌특별세 계산\n4. 순 절감액\n5. 절감률 분석' },
    { id: 4, topic: 'calculation', question: '관세환급액 계산 문제를 풀이하시오.', answer: '수출용 원재료의 개별환급액 또는 간이정액환급액을 계산한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 수출건의 관세환급액을 계산하시오.\n\n[자료]\n- 수출물품: 완구\n- 수출금액: $10,000 (FOB)\n- 원재료 수입 시 납부관세: 1,500,000원\n- 소요량: 수출물품 1개당 원재료 2kg\n- 간이정액환급률: 1,000원/1,000원당\n- 중소기업 여부: 해당\n\n다음 순서로 풀이해주세요:\n1. 개별환급액 계산\n2. 간이정액환급액 계산\n3. 유리한 방법 선택\n4. 환급 신청\n5. 유의사항' },
    { id: 5, topic: 'calculation', question: '원산지 부가가치비율(RVC) 계산 문제를 풀이하시오.', answer: '국내부가가치 비율을 계산하여 원산지 충족 여부를 판정한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 제품의 원산지 기준 충족 여부를 판정하시오.\n\n[자료]\n- FOB 가격: $10,000\n- 비원산지재료 가격: $5,500\n- 원산지 기준: RVC 45% 이상\n\n다음 순서로 풀이해주세요:\n1. 공제법 RVC 계산\n2. 원산지 충족 판정\n3. 집적법 RVC 계산\n4. 비교 분석\n5. 실무 적용' },
    { id: 6, topic: 'calculation', question: '수입물품 원가 계산 문제를 풀이하시오.', answer: 'CIF, 관세, 내국세, 부대비용을 합산하여 총 수입원가를 계산한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 수입물품의 단위당 수입원가를 계산하시오.\n\n[자료]\n- 물품: 기계부품 1,000개\n- CIF 가격: $30,000\n- 환율: 1,300원\n- 관세율: 5%\n- 부가세율: 10%\n- 통관수수료: 300,000원\n- 운반비: 500,000원\n\n다음 순서로 풀이해주세요:\n1. CIF 원화환산\n2. 관세 계산\n3. 부가가치세 계산\n4. 총 수입원가\n5. 단위당 원가' },
    { id: 7, topic: 'calculation', question: '잠정가격 신고 및 정산 문제를 풀이하시오.', answer: '잠정가격으로 신고 후 확정가격에 따라 세액을 정산한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 잠정가격 신고건의 정산 세액을 계산하시오.\n\n[자료]\n- 잠정신고가격: $100,000\n- 확정가격: $110,000\n- 환율(신고시): 1,300원\n- 환율(정산시): 1,350원\n- 관세율: 8%\n\n다음 순서로 풀이해주세요:\n1. 잠정 관세액\n2. 확정 과세가격\n3. 확정 관세액\n4. 추가 납부세액\n5. 가산금 계산' },
    { id: 8, topic: 'calculation', question: '재수출 감세액 계산 문제를 풀이하시오.', answer: '재수출 기간에 따라 감세율을 적용하여 감세액을 계산한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 재수출 물품의 관세 감세액을 계산하시오.\n\n[자료]\n- 물품: 전시용 기계\n- CIF: $20,000\n- 환율: 1,300원\n- 관세율: 8%\n- 재수출 예정기간: 1년\n\n다음 순서로 풀이해주세요:\n1. 일반 관세액\n2. 재수출 감세율\n3. 감세액 계산\n4. 납부세액\n5. 담보 제공' },
    { id: 9, topic: 'calculation', question: '덤핑방지관세 계산 문제를 풀이하시오.', answer: '정상가격과 덤핑가격의 차이만큼 덤핑방지관세가 부과된다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 수입물품의 덤핑방지관세를 계산하시오.\n\n[자료]\n- CIF 가격: $10,000\n- 환율: 1,300원\n- 기본관세율: 8%\n- 덤핑방지관세율: 15.5%\n\n다음 순서로 풀이해주세요:\n1. 기본관세 계산\n2. 덤핑방지관세 계산\n3. 총 관세액\n4. 부가가치세 계산\n5. 총 세부담' },
    { id: 10, topic: 'calculation', question: '세율 적용 우선순위 종합문제를 풀이하시오.', answer: '여러 세율이 경합할 때 우선순위에 따라 유리한 세율을 적용한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 수입물품에 적용할 세율을 결정하시오.\n\n[자료]\n- 물품: HS 8471.30 (노트북)\n- 기본세율: 0%\n- WTO 양허세율: 0%\n- 한-중 FTA 세율: 0%\n- 탄력세율: 적용없음\n\n다음 순서로 분석해주세요:\n1. 적용 가능한 세율\n2. 우선순위 검토\n3. 최적 세율 선택\n4. 원산지증명 필요 여부\n5. 실무 권고' },

    // HS코드분류실습 (11-18)
    { id: 11, topic: 'hs-classification', question: '스마트워치의 HS 품목분류를 결정하시오.', answer: '기능에 따라 시계류 또는 컴퓨터류로 분류가 달라질 수 있다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 스마트워치의 HS 품목분류를 결정하시오.\n\n[물품 설명]\n- 시간 표시 기능\n- 심박수 측정\n- GPS 내장\n- 스마트폰 연동\n- 앱 실행 기능\n\n다음 순서로 분류해주세요:\n1. 물품 특성 분석\n2. 후보 세번 검토\n3. 통칙 적용\n4. 류주·호주 검토\n5. 최종 분류 결정' },
    { id: 12, topic: 'hs-classification', question: '전기자동차 배터리의 HS 품목분류를 결정하시오.', answer: '리튬이온 축전지로 분류하되, 차량용 특성을 고려한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 전기자동차 배터리의 HS 품목분류를 결정하시오.\n\n[물품 설명]\n- 리튬이온 배터리\n- 전기자동차 전용 설계\n- 용량: 60kWh\n- BMS(배터리관리시스템) 내장\n\n다음 순서로 분류해주세요:\n1. 물품 특성 분석\n2. 제85류 검토\n3. 부분품 여부\n4. 해설서 참조\n5. 최종 분류 결정' },
    { id: 13, topic: 'hs-classification', question: '건강기능식품의 HS 품목분류를 결정하시오.', answer: '성분과 형태에 따라 식품류 또는 의약품류로 분류가 결정된다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 건강기능식품의 HS 품목분류를 결정하시오.\n\n[물품 설명]\n- 비타민 C 정제\n- 1정당 1000mg\n- 일반판매용\n- 건강기능식품 인증\n\n다음 순서로 분류해주세요:\n1. 물품 특성 분석\n2. 제21류 vs 제30류\n3. 류주 검토\n4. 용도 및 형태\n5. 최종 분류 결정' },
    { id: 14, topic: 'hs-classification', question: '복합기능 가전제품의 HS 품목분류를 결정하시오.', answer: '통칙3 나호에 따라 본질적 특성을 부여하는 기능으로 분류한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 복합기의 HS 품목분류를 결정하시오.\n\n[물품 설명]\n- 프린터 기능\n- 스캐너 기능\n- 복사 기능\n- 팩스 기능\n\n다음 순서로 분류해주세요:\n1. 각 기능 분석\n2. 통칙3 적용\n3. 본질적 특성 판단\n4. 해설서 참조\n5. 최종 분류 결정' },
    { id: 15, topic: 'hs-classification', question: '세트물품(화장품세트)의 HS 품목분류를 결정하시오.', answer: '소매용 세트로 구성된 경우 통칙3 나호 또는 다호를 적용한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 화장품세트의 HS 품목분류를 결정하시오.\n\n[물품 설명]\n- 스킨 1병\n- 로션 1병\n- 크림 1개\n- 파우치 1개\n- 소매포장 세트\n\n다음 순서로 분류해주세요:\n1. 세트물품 요건 검토\n2. 통칙3 나호 적용\n3. 본질적 특성\n4. 통칙3 다호 적용\n5. 최종 분류 결정' },
    { id: 16, topic: 'hs-classification', question: '미완성품(반제품)의 HS 품목분류를 결정하시오.', answer: '통칙2 가호에 따라 완성품의 본질적 특성을 갖추면 완성품으로 분류한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 미완성 자전거의 HS 품목분류를 결정하시오.\n\n[물품 설명]\n- 자전거 프레임+바퀴+핸들\n- 안장, 페달 미부착\n- 조립하면 완성 자전거\n\n다음 순서로 분류해주세요:\n1. 물품 상태 분석\n2. 통칙2 가호 적용\n3. 본질적 특성 판단\n4. 완성품 vs 부분품\n5. 최종 분류 결정' },
    { id: 17, topic: 'hs-classification', question: '혼합물(화학제품)의 HS 품목분류를 결정하시오.', answer: '혼합물은 주성분, 용도, 특성에 따라 분류 방법이 달라진다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 화학혼합물의 HS 품목분류를 결정하시오.\n\n[물품 설명]\n- 세제(계면활성제 혼합물)\n- 주성분: 음이온 계면활성제 40%\n- 보조제: 효소, 향료 등\n- 용도: 세탁용\n\n다음 순서로 분류해주세요:\n1. 혼합물 성분 분석\n2. 제34류 검토\n3. 류주 확인\n4. 용도 기준\n5. 최종 분류 결정' },
    { id: 18, topic: 'hs-classification', question: '부분품(범용부분품)의 HS 품목분류를 결정하시오.', answer: '범용 부분품은 제15부 주에 따라 해당 재료류로 분류한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 다음 볼트/너트의 HS 품목분류를 결정하시오.\n\n[물품 설명]\n- 철강제 볼트\n- 기계 조립용 범용\n- 특정 기계 전용 아님\n\n다음 순서로 분류해주세요:\n1. 부분품 유형 분석\n2. 전용 vs 범용 판단\n3. 제73류 검토\n4. 제15부 주 확인\n5. 최종 분류 결정' },

    // 답안작성법 (19-25)
    { id: 19, topic: 'answer-writing', question: '관세사 2차 시험 답안 작성의 기본구조를 설명하시오.', answer: '쟁점정리, 법적근거, 분석, 결론의 논리적 구조로 작성한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 관세사 2차 시험 논술형 답안 작성의 기본구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서론(쟁점 정리)\n2. 본론(법적 근거)\n3. 분석(사안 적용)\n4. 결론 도출\n5. 모범답안 예시' },
    { id: 20, topic: 'answer-writing', question: '품목분류 답안 작성법을 설명하시오.', answer: '물품 특성, 후보 세번, 통칙 적용, 결론의 순서로 작성한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 품목분류 문제 답안 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물품 특성 기술\n2. 후보 세번 제시\n3. 통칙 적용 논거\n4. 류주/호주 검토\n5. 분류 결론 도출' },
    { id: 21, topic: 'answer-writing', question: '관세평가 답안 작성법을 설명하시오.', answer: '거래가격 확인, 가산/공제요소, 대체평가방법 순서로 작성한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 관세평가 문제 답안 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거래가격 확인\n2. 가산요소 분석\n3. 공제요소 분석\n4. 대체평가 검토\n5. 과세가격 결론' },
    { id: 22, topic: 'answer-writing', question: '계산문제 답안 작성법을 설명하시오.', answer: '계산과정을 단계별로 명시하고, 단위와 결과를 명확히 기재한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 관세사 시험 계산문제 답안 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계산 과정 표시\n2. 공식 적용\n3. 단위 명시\n4. 중간결과 표시\n5. 최종답 강조' },
    { id: 23, topic: 'answer-writing', question: '시간 관리와 답안 분량 배분 전략을 설명하시오.', answer: '배점에 따라 시간과 분량을 배분하고, 핵심 논점을 우선 작성한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 관세사 2차 시험 시간 관리와 답안 분량 배분 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과목별 시간 배분\n2. 문항별 시간 배분\n3. 분량 기준\n4. 우선순위 결정\n5. 마무리 점검' },
    { id: 24, topic: 'answer-writing', question: '부분점수 획득 전략을 설명하시오.', answer: '핵심 키워드와 논리구조를 유지하여 부분점수를 확보한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 관세사 시험 부분점수 획득 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 키워드 포함\n2. 논리구조 유지\n3. 조문 번호 기재\n4. 부분 계산 제시\n5. 결론 명시' },
    { id: 25, topic: 'answer-writing', question: '실전 모의고사 활용법을 설명하시오.', answer: '실제 시험 환경에서 시간을 측정하며 모의고사를 풀고 복기한다.', prompt: '관세사 실무연습 문제입니다.\n\n문제: 관세사 시험 실전 모의고사 활용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험 환경 조성\n2. 시간 엄수\n3. 채점 기준 적용\n4. 오답 분석\n5. 취약점 보완' },
  ];

  const topics = [
    { id: 'calculation', name: '계산문제연습', count: 10 },
    { id: 'hs-classification', name: 'HS코드분류실습', count: 8 },
    { id: 'answer-writing', name: '답안작성법', count: 7 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/customs-broker" className="text-gray-500 hover:text-gray-700">관세사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sky-600 font-medium">실무연습</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">💼 실무연습</h1>
          <p className="text-gray-600">관세사 시험 실전 대비 | 계산 및 분류 연습</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">학습 진행률</span>
            <span className="text-sky-600 font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-600 to-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.length} / {questions.length} 문항 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{expandedTopics.includes(topic.id) ? '📂' : '📁'}</span>
                  <span className="font-medium text-gray-900">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.count}문항)</span>
                </div>
                <span className="text-gray-400">{expandedTopics.includes(topic.id) ? '▼' : '▶'}</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" checked={completedQuestions.includes(q.id)} onChange={() => toggleQuestion(q.id)} className="mt-1 w-5 h-5 text-sky-600 rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-2">💡 {q.answer}</p>
                          <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-sky-100 text-sky-600 rounded-lg text-sm hover:bg-sky-200 transition">🤖 AI</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link href="/category/accounting/customs-broker/study/customs-advanced" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 관세법 심화</Link>
          <Link href="/category/accounting/customs-broker" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">관세사 메인으로 →</Link>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격증 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
