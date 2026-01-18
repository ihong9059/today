'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['voucher']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-2-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-2-practical-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 전표입력 (1-5)
    { id: 1, topic: 'voucher', question: '일반전표 입력 시 차변과 대변의 입력 순서와 방법을 설명하시오.', answer: '차변 먼저 입력, 대변 자동 균형, 적요 입력', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 일반전표 입력 시 차변과 대변의 입력 순서와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전표 유형 선택\n2. 차변 계정과목 입력\n3. 대변 계정과목 입력\n4. 적요 작성 방법\n5. 실전 연습 예제 3개' },
    { id: 2, topic: 'voucher', question: '매입매출전표 입력 시 세금계산서 유형별 입력 방법을 설명하시오.', answer: '과세/영세/면세 구분, 공급가액과 세액 분리', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 매입매출전표 입력 시 세금계산서 유형별 입력 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세금계산서 유형 구분\n2. 과세 매입/매출 입력\n3. 영세율 거래 입력\n4. 면세 거래 입력\n5. 실전 연습 예제 3개' },
    { id: 3, topic: 'voucher', question: '고정자산 취득 및 처분 시 전표 입력 방법을 설명하시오.', answer: '취득가액 산정, 감가상각누계액 대체, 처분손익', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 고정자산 취득 및 처분 시 전표 입력 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정자산 취득 분개\n2. 부대비용 처리\n3. 감가상각 입력\n4. 처분 시 분개\n5. 실전 연습 예제 3개' },
    { id: 4, topic: 'voucher', question: '급여 지급 시 원천징수 관련 전표 입력 방법을 설명하시오.', answer: '급여 총액, 원천세 예수금, 실지급액 분리', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 급여 지급 시 원천징수 관련 전표 입력 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 급여 지급 분개 구조\n2. 소득세/주민세 예수금\n3. 4대보험 처리\n4. 퇴직급여충당부채\n5. 실전 연습 예제 3개' },
    { id: 5, topic: 'voucher', question: '어음 거래(받을어음/지급어음) 전표 입력 방법을 설명하시오.', answer: '어음 수취/발행/만기결제/할인 분개', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 어음 거래(받을어음/지급어음) 전표 입력 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 받을어음 수취 분개\n2. 지급어음 발행 분개\n3. 어음 만기 결제\n4. 어음 할인 처리\n5. 실전 연습 예제 3개' },

    // 결산처리 (6-10)
    { id: 6, topic: 'closing', question: '결산정리사항 입력 순서와 주요 항목을 설명하시오.', answer: '수정분개, 결산분개, 재무제표 생성', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 결산정리사항 입력 순서와 주요 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산정리 전 확인사항\n2. 감가상각비 계상\n3. 대손충당금 설정\n4. 미수/미지급 비용 처리\n5. 실전 연습 예제 3개' },
    { id: 7, topic: 'closing', question: '감가상각비 자동 계산 및 수동 입력 방법을 설명하시오.', answer: '정액법/정률법 선택, 내용연수, 잔존가치', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 감가상각비 자동 계산 및 수동 입력 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고정자산 등록 확인\n2. 상각방법 설정\n3. 자동 상각 실행\n4. 수동 조정 방법\n5. 실전 연습 예제 3개' },
    { id: 8, topic: 'closing', question: '대손충당금 설정 및 대손 처리 방법을 설명하시오.', answer: '대손설정률 적용, 대손발생 시 상계', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 대손충당금 설정 및 대손 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대손충당금 설정 기준\n2. 설정률 계산\n3. 결산 분개 입력\n4. 실제 대손 발생 처리\n5. 실전 연습 예제 3개' },
    { id: 9, topic: 'closing', question: '재고자산 결산 처리(매출원가 계산) 방법을 설명하시오.', answer: '기초재고+당기매입-기말재고=매출원가', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 재고자산 결산 처리(매출원가 계산) 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재고자산 실사\n2. 기말재고 입력\n3. 매출원가 계산 구조\n4. 결산 분개 작성\n5. 실전 연습 예제 3개' },
    { id: 10, topic: 'closing', question: '결산 후 재무제표 조회 및 검증 방법을 설명하시오.', answer: '합계잔액시산표 검증, 재무상태표/손익계산서 조회', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 결산 후 재무제표 조회 및 검증 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합계잔액시산표 확인\n2. 차대 균형 검증\n3. 재무상태표 조회\n4. 손익계산서 조회\n5. 오류 수정 방법' },

    // 부가세신고 (11-15)
    { id: 11, topic: 'vat', question: '부가가치세 신고서 작성 순서와 방법을 설명하시오.', answer: '매출세액-매입세액=납부세액, 신고서 작성', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 부가가치세 신고서 작성 순서와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출세액 집계\n2. 매입세액 집계\n3. 공제/불공제 구분\n4. 납부세액 계산\n5. 실전 연습 예제 3개' },
    { id: 12, topic: 'vat', question: '세금계산서합계표 작성 및 검증 방법을 설명하시오.', answer: '매출/매입 세금계산서 집계, 거래처별 확인', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 세금계산서합계표 작성 및 검증 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출 세금계산서 집계\n2. 매입 세금계산서 집계\n3. 거래처별 명세 확인\n4. 오류 검증 방법\n5. 실전 연습 예제 3개' },
    { id: 13, topic: 'vat', question: '매입세액 불공제 항목 처리 방법을 설명하시오.', answer: '접대비, 비영업용 승용차, 면세관련 매입 불공제', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 매입세액 불공제 항목 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불공제 대상 항목\n2. 불공제 입력 방법\n3. 비영업용 승용차 처리\n4. 접대비 관련 처리\n5. 실전 연습 예제 3개' },
    { id: 14, topic: 'vat', question: '영세율 매출 및 수출 관련 부가세 처리 방법을 설명하시오.', answer: '영세율 세금계산서, 수출실적명세서', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 영세율 매출 및 수출 관련 부가세 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영세율 적용 대상\n2. 영세율 매출 입력\n3. 수출실적명세서 작성\n4. 영세율 첨부서류\n5. 실전 연습 예제 3개' },
    { id: 15, topic: 'vat', question: '부가세 신고 시 가산세 계산 방법을 설명하시오.', answer: '무신고/과소신고/납부지연 가산세 계산', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 부가세 신고 시 가산세 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무신고 가산세\n2. 과소신고 가산세\n3. 납부지연 가산세\n4. 세금계산서 미발급 가산세\n5. 실전 연습 예제 3개' },

    // 원천징수 (16-20)
    { id: 16, topic: 'withholding', question: '원천징수이행상황신고서 작성 방법을 설명하시오.', answer: '소득구분별 인원/지급액/세액 기재', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 원천징수이행상황신고서 작성 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소득 구분 코드\n2. 인원 및 지급액 입력\n3. 소득세/주민세 계산\n4. 환급 신청 방법\n5. 실전 연습 예제 3개' },
    { id: 17, topic: 'withholding', question: '근로소득 간이세액표 적용 및 원천징수 방법을 설명하시오.', answer: '월급여액, 공제대상가족수 기준 세액 조회', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 근로소득 간이세액표 적용 및 원천징수 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 월급여액 계산\n2. 공제대상가족수 확인\n3. 간이세액표 조회\n4. 80%/100%/120% 선택\n5. 실전 연습 예제 3개' },
    { id: 18, topic: 'withholding', question: '사업소득 원천징수 및 신고 방법을 설명하시오.', answer: '3.3% 원천징수, 사업소득 지급명세서', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 사업소득 원천징수 및 신고 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업소득 범위\n2. 3.3% 원천징수 계산\n3. 원천징수영수증 발급\n4. 지급명세서 제출\n5. 실전 연습 예제 3개' },
    { id: 19, topic: 'withholding', question: '기타소득 원천징수 및 신고 방법을 설명하시오.', answer: '기타소득 60% 필요경비, 20% 원천징수율', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 기타소득 원천징수 및 신고 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기타소득 유형\n2. 필요경비 적용\n3. 원천징수세율 계산\n4. 지급명세서 작성\n5. 실전 연습 예제 3개' },
    { id: 20, topic: 'withholding', question: '퇴직소득 원천징수 및 신고 방법을 설명하시오.', answer: '퇴직소득세 계산, 퇴직소득원천징수영수증', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 퇴직소득 원천징수 및 신고 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직소득 범위\n2. 퇴직소득공제 계산\n3. 퇴직소득세 산출\n4. 원천징수영수증 발급\n5. 실전 연습 예제 3개' },

    // 종합실무 (21-25)
    { id: 21, topic: 'comprehensive', question: '월별 회계 마감 절차를 순서대로 설명하시오.', answer: '전표 검토→계정조정→시산표 확인→마감', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 월별 회계 마감 절차를 순서대로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전표 입력 완료 확인\n2. 계정과목 조정\n3. 합계잔액시산표 검증\n4. 월말 마감 처리\n5. 월별 마감 체크리스트' },
    { id: 22, topic: 'comprehensive', question: '분기별 세무 신고 일정 및 업무를 정리하시오.', answer: '부가세/원천세/법인세 중간예납 일정 관리', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 분기별 세무 신고 일정 및 업무를 정리하시오.\n\n다음 순서로 설명해주세요:\n1. 1분기 신고 일정\n2. 2분기 신고 일정\n3. 3분기 신고 일정\n4. 4분기 신고 일정\n5. 연간 세무 캘린더' },
    { id: 23, topic: 'comprehensive', question: '전산세무 프로그램 데이터 백업 및 복구 방법을 설명하시오.', answer: '정기 백업, 데이터 복원, 기간별 관리', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 전산세무 프로그램 데이터 백업 및 복구 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 백업 필요성\n2. 백업 방법 및 주기\n3. 백업 파일 관리\n4. 데이터 복구 절차\n5. 백업 실패 시 대응' },
    { id: 24, topic: 'comprehensive', question: '거래처 관리 및 거래처별 원장 조회 방법을 설명하시오.', answer: '거래처 등록, 코드 관리, 채권채무 현황', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 거래처 관리 및 거래처별 원장 조회 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거래처 등록 방법\n2. 거래처 코드 체계\n3. 거래처별 원장 조회\n4. 채권채무 현황 관리\n5. 거래처 정리 방법' },
    { id: 25, topic: 'comprehensive', question: '실기시험 시간 관리 및 문제 풀이 전략을 설명하시오.', answer: '문제 유형별 시간배분, 검토 시간 확보', prompt: '전산세무 2급 실무연습 문제입니다.\n\n문제: 실기시험 시간 관리 및 문제 풀이 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시험 구성 파악\n2. 문제 유형별 시간배분\n3. 쉬운 문제 우선 풀이\n4. 검토 시간 활용\n5. 실수 방지 팁' },
  ];

  const topics = [
    { id: 'voucher', name: '전표입력', icon: '📝', count: 5 },
    { id: 'closing', name: '결산처리', icon: '📊', count: 5 },
    { id: 'vat', name: '부가세신고', icon: '💰', count: 5 },
    { id: 'withholding', name: '원천징수', icon: '📋', count: 5 },
    { id: 'comprehensive', name: '종합실무', icon: '🎯', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-tax-2" className="text-gray-500 hover:text-gray-700">전산세무 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-amber-600 font-medium">실무연습</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-amber-500 to-orange-400 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">💻</div>
            <div>
              <h1 className="text-2xl font-bold">실무연습</h1>
              <p className="text-amber-100">전산세무 2급 | 전표입력, 결산처리, 세무신고 실습</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>학습 진행률</span>
              <span>{completedQuestions.length} / {questions.length} ({progress}%)</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-amber-100 border-2 border-amber-300'
                    : 'bg-white border border-gray-200 hover:border-amber-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{topic.icon}</span>
                  <span className="font-medium text-sm">{topic.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{completed}/{topic.count} 완료</div>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            expandedTopics.includes(topic.id) && (
              <div key={topic.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                  <h2 className="font-bold flex items-center gap-2">
                    <span>{topic.icon}</span> {topic.name}
                  </h2>
                  <span className="text-sm text-gray-500">{topic.count}문항</span>
                </div>
                <div className="divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-amber-500 border-amber-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : ''}`}>
                              {q.id}. {q.question}
                            </p>
                            <button
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-amber-100 text-amber-600 rounded-lg text-sm hover:bg-amber-200 transition flex-shrink-0"
                            >
                              AI
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Link href="/category/accounting/computerized-tax-2/study/vat" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 부가가치세
          </Link>
          <Link href="/category/accounting/computerized-tax-2" className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
            메인으로 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 전산세무 2급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
