'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['basic-info']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-accounting-2-practical-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-accounting-2-practical-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 기초정보관리 (1-5)
    { id: 1, topic: 'basic-info', question: '케이렙에서 거래처를 등록하는 방법을 설명하시오.', answer: '기초정보관리 > 거래처등록 > 거래처코드, 상호, 사업자등록번호 입력', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 거래처를 등록하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기초정보관리 메뉴 접근 방법\n2. 거래처등록 화면 구성\n3. 필수 입력 항목 (거래처코드, 상호, 사업자등록번호 등)\n4. 매입/매출 거래처 구분 방법\n5. 거래처 등록 시 주의사항' },
    { id: 2, topic: 'basic-info', question: '계정과목 체계와 코드구조를 확인하는 방법을 설명하시오.', answer: '기초정보관리 > 계정과목 > 자산/부채/자본/수익/비용 체계 확인', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 계정과목 체계와 코드구조를 확인하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계정과목 조회 메뉴 접근\n2. 자산/부채/자본/수익/비용 분류 체계\n3. 계정과목 코드 구조 (대분류/중분류/소분류)\n4. 사용 계정과 미사용 계정 구분\n5. 계정과목 추가/수정 시 유의점' },
    { id: 3, topic: 'basic-info', question: '기초잔액을 입력하는 방법과 주의사항을 설명하시오.', answer: '기초정보관리 > 전기분재무상태표 > 계정별 차/대 잔액 입력', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 기초잔액을 입력하는 방법과 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전기분재무상태표 메뉴 접근\n2. 자산/부채/자본 계정별 잔액 입력 방법\n3. 차/대 잔액 입력 시 유의사항\n4. 대차평균의 원리 확인 방법\n5. 기초잔액 입력 오류 시 수정 방법' },
    { id: 4, topic: 'basic-info', question: '회사정보 및 회계기간을 설정하는 방법을 설명하시오.', answer: '기초정보관리 > 회사등록 > 상호, 사업자번호, 회계기간 설정', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 회사정보 및 회계기간을 설정하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회사등록 메뉴 접근\n2. 필수 회사정보 항목 (상호, 사업자등록번호, 대표자 등)\n3. 회계기간 설정 방법\n4. 업종 및 업태 코드 입력\n5. 설정 변경 시 주의사항' },
    { id: 5, topic: 'basic-info', question: '적요등록과 자주 사용하는 적요 관리 방법을 설명하시오.', answer: '기초정보관리 > 적요등록 > 자주 쓰는 적요문구 사전 등록', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 적요등록과 자주 사용하는 적요 관리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적요등록 메뉴 접근\n2. 적요코드와 적요내용 입력 방법\n3. 자주 사용하는 적요문구 사전 등록\n4. 전표 입력 시 적요 불러오기\n5. 적요 관리의 업무 효율화 효과' },

    // 일반전표입력 (6-10)
    { id: 6, topic: 'general-voucher', question: '입금전표를 입력하는 방법을 설명하시오.', answer: '전표관리 > 일반전표입력 > 차변: 현금 / 대변: 해당 수익', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 입금전표를 입력하는 방법을 설명하시오.\n\n예시: 상품매출 500,000원을 현금으로 받은 경우\n\n다음 순서로 설명해주세요:\n1. 일반전표입력 메뉴 접근\n2. 전표유형 선택 (입금)\n3. 차변계정 (현금) 입력\n4. 대변계정 (매출) 입력\n5. 적요 및 거래처 입력 방법' },
    { id: 7, topic: 'general-voucher', question: '출금전표를 입력하는 방법을 설명하시오.', answer: '전표관리 > 일반전표입력 > 차변: 해당 비용 / 대변: 현금', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 출금전표를 입력하는 방법을 설명하시오.\n\n예시: 사무용품 100,000원을 현금으로 구입한 경우\n\n다음 순서로 설명해주세요:\n1. 일반전표입력 메뉴 접근\n2. 전표유형 선택 (출금)\n3. 차변계정 (소모품비) 입력\n4. 대변계정 (현금) 입력\n5. 적요 및 증빙 입력 방법' },
    { id: 8, topic: 'general-voucher', question: '대체전표를 입력하는 방법을 설명하시오.', answer: '전표관리 > 일반전표입력 > 현금 외 계정 간 대체 거래', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 대체전표를 입력하는 방법을 설명하시오.\n\n예시: 외상매출금 300,000원을 보통예금으로 회수한 경우\n\n다음 순서로 설명해주세요:\n1. 일반전표입력 메뉴 접근\n2. 전표유형 선택 (대체)\n3. 차변계정 (보통예금) 입력\n4. 대변계정 (외상매출금) 입력\n5. 거래처별 채권관리 연동' },
    { id: 9, topic: 'general-voucher', question: '복합분개 전표를 입력하는 방법을 설명하시오.', answer: '일반전표에서 차변/대변 여러 계정 동시 입력', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 복합분개 전표를 입력하는 방법을 설명하시오.\n\n예시: 급여 2,000,000원 지급 시 원천세 200,000원 공제 후 보통예금 이체\n\n다음 순서로 설명해주세요:\n1. 복합분개의 개념\n2. 차변에 여러 계정 입력 방법\n3. 대변에 여러 계정 입력 방법\n4. 차대평균 확인\n5. 복합분개 오류 수정 방법' },
    { id: 10, topic: 'general-voucher', question: '전표 수정 및 삭제 방법을 설명하시오.', answer: '해당 전표 조회 후 수정/삭제 버튼 클릭', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 입력된 전표를 수정하거나 삭제하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기존 전표 조회 방법\n2. 전표 수정 절차\n3. 전표 삭제 절차\n4. 수정/삭제 후 확인 사항\n5. 마감 후 전표 수정 시 주의사항' },

    // 매입매출전표 (11-15)
    { id: 11, topic: 'purchase-sales', question: '과세매입 전표를 입력하는 방법을 설명하시오.', answer: '매입매출전표 > 매입유형 선택 > 공급가액, 세액 입력', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 과세매입 전표를 입력하는 방법을 설명하시오.\n\n예시: 상품 1,000,000원(부가세 별도)을 외상으로 매입\n\n다음 순서로 설명해주세요:\n1. 매입매출전표입력 메뉴 접근\n2. 매입유형 (과세) 선택\n3. 공급가액과 부가가치세 입력\n4. 거래처 정보 입력\n5. 세금계산서 연동 확인' },
    { id: 12, topic: 'purchase-sales', question: '과세매출 전표를 입력하는 방법을 설명하시오.', answer: '매입매출전표 > 매출유형 선택 > 공급가액, 세액 입력', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 과세매출 전표를 입력하는 방법을 설명하시오.\n\n예시: 상품 2,000,000원(부가세 별도)을 외상으로 매출\n\n다음 순서로 설명해주세요:\n1. 매입매출전표입력 메뉴 접근\n2. 매출유형 (과세) 선택\n3. 공급가액과 부가가치세 입력\n4. 거래처 정보 입력\n5. 세금계산서 발행 연동' },
    { id: 13, topic: 'purchase-sales', question: '면세/영세율 거래 전표를 입력하는 방법을 설명하시오.', answer: '매입매출전표 > 면세/영세 유형 선택 > 부가세 0원', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 면세/영세율 거래 전표를 입력하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 면세와 영세율의 차이점\n2. 면세 매입/매출 전표 입력\n3. 영세율 매입/매출 전표 입력\n4. 부가가치세 신고서 반영 확인\n5. 증빙서류 구분 (계산서/세금계산서)' },
    { id: 14, topic: 'purchase-sales', question: '신용카드 매출 전표를 입력하는 방법을 설명하시오.', answer: '매입매출전표 > 카드매출 유형 > 카드사 정보 입력', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 신용카드 매출 전표를 입력하는 방법을 설명하시오.\n\n예시: 상품 550,000원(부가세 포함)을 신용카드로 매출\n\n다음 순서로 설명해주세요:\n1. 카드매출 유형 선택\n2. 공급가액/부가세 자동 계산\n3. 카드사 정보 입력\n4. 카드매출 계정 연동\n5. 신용카드매출전표 발행 확인' },
    { id: 15, topic: 'purchase-sales', question: '전자세금계산서 연동 방법을 설명하시오.', answer: '매입매출전표 입력 후 전자세금계산서 발행/수취 연동', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 전자세금계산서 연동 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자세금계산서 발행 설정\n2. 매출전표와 세금계산서 연동\n3. 매입전표와 세금계산서 수취 연동\n4. 국세청 전송 확인\n5. 세금계산서 조회 및 수정' },

    // 장부조회 (16-20)
    { id: 16, topic: 'ledger-inquiry', question: '거래처원장을 조회하는 방법을 설명하시오.', answer: '장부관리 > 거래처원장 > 거래처별 채권채무 조회', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 거래처원장을 조회하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거래처원장 메뉴 접근\n2. 조회 기간 설정\n3. 거래처별 조회와 전체 조회\n4. 외상매출금/외상매입금 잔액 확인\n5. 거래처별 채권채무 관리 활용' },
    { id: 17, topic: 'ledger-inquiry', question: '총계정원장을 조회하는 방법을 설명하시오.', answer: '장부관리 > 총계정원장 > 계정과목별 거래내역 조회', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 총계정원장을 조회하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 총계정원장 메뉴 접근\n2. 조회 기간 설정\n3. 특정 계정 조회와 전체 조회\n4. 계정별 차/대변 합계 확인\n5. 총계정원장 활용 사례' },
    { id: 18, topic: 'ledger-inquiry', question: '합계잔액시산표를 조회하는 방법을 설명하시오.', answer: '장부관리 > 합계잔액시산표 > 전체 계정 합계/잔액 확인', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 합계잔액시산표를 조회하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합계잔액시산표 메뉴 접근\n2. 조회 기준일 설정\n3. 차변합계/대변합계 확인\n4. 차변잔액/대변잔액 확인\n5. 대차평균 검증 방법' },
    { id: 19, topic: 'ledger-inquiry', question: '일/월계표를 조회하는 방법을 설명하시오.', answer: '장부관리 > 일/월계표 > 일별/월별 거래 집계 조회', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 일/월계표를 조회하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일계표/월계표 메뉴 접근\n2. 조회 기간 설정\n3. 일별 거래 합계 확인\n4. 월별 거래 합계 확인\n5. 자금 흐름 분석 활용' },
    { id: 20, topic: 'ledger-inquiry', question: '현금출납장을 조회하는 방법을 설명하시오.', answer: '장부관리 > 현금출납장 > 현금 입출금 내역 조회', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 케이렙 프로그램에서 현금출납장을 조회하는 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금출납장 메뉴 접근\n2. 조회 기간 설정\n3. 입금/출금 내역 확인\n4. 현금 잔액 확인\n5. 실제 현금과의 대조 방법' },

    // 종합실습 (21-25)
    { id: 21, topic: 'comprehensive', question: '일반거래 종합 실습: 다양한 전표 유형을 입력하시오.', answer: '입금/출금/대체 전표 복합 입력 실습', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 다음 거래를 케이렙에서 전표 입력하시오.\n\n거래 내역:\n1. 7/1 상품 800,000원 현금 매출\n2. 7/3 사무용품 50,000원 현금 구입\n3. 7/5 외상매출금 200,000원 보통예금 입금\n4. 7/7 급여 1,500,000원 보통예금 이체 (원천세 150,000원 공제)\n5. 7/10 임대료 300,000원 현금 지급\n\n각 거래의 전표 유형과 분개를 설명해주세요.' },
    { id: 22, topic: 'comprehensive', question: '매입매출 종합 실습: 부가세 관련 전표를 입력하시오.', answer: '과세/면세 매입매출 전표 복합 입력 실습', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 다음 거래를 케이렙에서 매입매출전표로 입력하시오.\n\n거래 내역:\n1. 7/2 상품 매입 1,000,000원(부가세 별도) 외상\n2. 7/4 상품 매출 1,500,000원(부가세 별도) 외상\n3. 7/8 신용카드 매출 550,000원(부가세 포함)\n4. 7/12 면세 농산물 매입 200,000원 현금\n5. 7/15 영세율 수출 매출 2,000,000원\n\n각 거래의 분개와 부가세 처리를 설명해주세요.' },
    { id: 23, topic: 'comprehensive', question: '기말 결산 종합 실습: 결산 정리 분개를 입력하시오.', answer: '감가상각, 대손, 재고조정 등 결산 분개', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 다음 결산 정리 사항을 케이렙에서 분개하시오.\n\n결산 정리 내역:\n1. 비품 감가상각비 계상 (취득원가 2,000,000원, 내용연수 5년, 정액법)\n2. 외상매출금 대손충당금 설정 (기말잔액의 2%)\n3. 기말 상품재고액 500,000원 (선입선출법)\n4. 선급비용 인식 (12월 납부 보험료 중 차기분 100,000원)\n5. 미지급비용 계상 (당기 귀속 전기료 80,000원)\n\n각 결산 분개를 설명해주세요.' },
    { id: 24, topic: 'comprehensive', question: '장부 조회 종합 실습: 다양한 장부를 조회하고 분석하시오.', answer: '시산표, 원장, 일계표 종합 조회 및 검증', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 다음 항목을 케이렙에서 조회하고 분석하시오.\n\n조회 항목:\n1. 합계잔액시산표에서 대차평균 확인\n2. 현금 계정의 총계정원장 조회\n3. 외상매출금 거래처별 잔액 조회\n4. 7월 월계표 조회\n5. 부가가치세 신고서 미리보기\n\n각 장부의 조회 방법과 확인 포인트를 설명해주세요.' },
    { id: 25, topic: 'comprehensive', question: '전산회계 2급 실기시험 종합 모의연습을 수행하시오.', answer: '기초정보 > 전표입력 > 장부조회 전 과정 실습', prompt: '전산회계 2급 실무연습 문제입니다.\n\n문제: 전산회계 2급 실기시험 형식의 종합 모의연습입니다.\n\n실습 내용:\n1. 회사 기초정보 확인 및 거래처 등록\n2. 기초잔액 입력 검증\n3. 일반전표 10건 입력\n4. 매입매출전표 5건 입력\n5. 장부 조회 및 오류 검증\n\n각 단계별 실습 포인트와 시험 대비 전략을 설명해주세요.' },
  ];

  const topics = [
    { id: 'basic-info', name: '기초정보관리', icon: '📋', count: 5 },
    { id: 'general-voucher', name: '일반전표입력', icon: '📝', count: 5 },
    { id: 'purchase-sales', name: '매입매출전표', icon: '🧾', count: 5 },
    { id: 'ledger-inquiry', name: '장부조회', icon: '📊', count: 5 },
    { id: 'comprehensive', name: '종합실습', icon: '🎯', count: 5 },
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
            <Link href="/category/accounting/computerized-accounting-2" className="text-gray-500 hover:text-gray-700">전산회계 2급</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-accounting-2/study" className="text-gray-500 hover:text-gray-700">학습</Link>
            <span className="text-gray-300">/</span>
            <span className="text-cyan-600 font-medium">실무연습</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">💻</div>
            <div>
              <h1 className="text-2xl font-bold">실무연습</h1>
              <p className="text-cyan-100">전산회계 2급 | 케이렙 프로그램 실무 중심 학습</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-cyan-100 border-2 border-cyan-300'
                    : 'bg-white border border-gray-200 hover:border-cyan-200'
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
                              ? 'bg-cyan-500 border-cyan-500 text-white'
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
                              className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition flex-shrink-0"
                            >
                              🤖 AI
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
          <Link href="/category/accounting/computerized-accounting-2/study" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 학습 목록
          </Link>
          <Link href="/category/accounting/computerized-accounting-2" className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
            메인으로 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 전산회계 2급 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
