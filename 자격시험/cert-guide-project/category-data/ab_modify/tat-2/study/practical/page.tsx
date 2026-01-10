'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  topic: string;
  question: string;
  answer: string;
  prompt: string;
}

const questions: Question[] = [
  // 더존 Smart A 기본 (5문항)
  {
    id: 1,
    topic: '더존 Smart A 기본',
    question: '더존 Smart A를 처음 실행한 후 신규 회사를 등록하는 방법은?',
    answer: '더존 Smart A 실행 후 [기초정보관리]-[회사등록]에서 신규 회사를 등록합니다. 회사명, 사업자등록번호, 대표자, 사업장 주소 등 기본 정보를 입력합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 더존 Smart A를 처음 실행한 후 신규 회사를 등록하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 2,
    topic: '더존 Smart A 기본',
    question: '회사등록 시 사업자등록번호와 업태/종목을 입력하는 이유는?',
    answer: '사업자등록번호는 세금계산서 발행과 신고서 작성 시 필수 정보이며, 업태/종목은 부가세 신고서와 각종 세무 서류에 자동 반영됩니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 회사등록 시 사업자등록번호와 업태/종목을 입력하는 이유는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 3,
    topic: '더존 Smart A 기본',
    question: '거래처를 등록할 때 입력해야 하는 필수 정보는 무엇인가요?',
    answer: '거래처등록에서 거래처명, 사업자등록번호(또는 주민번호), 대표자명, 업태/종목이 필수입니다. 세금계산서 발행을 위해 사업자번호가 정확해야 합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 거래처를 등록할 때 입력해야 하는 필수 정보는 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 4,
    topic: '더존 Smart A 기본',
    question: '기초정보설정에서 회계기간(사업연도)을 설정하는 방법은?',
    answer: '[기초정보관리]-[환경설정]에서 회계기간을 설정합니다. 일반적으로 1월1일~12월31일이며, 법인은 정관에 따라 다를 수 있습니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 기초정보설정에서 회계기간(사업연도)을 설정하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 5,
    topic: '더존 Smart A 기본',
    question: '계정과목을 새로 추가하거나 수정하는 방법은?',
    answer: '[기초정보관리]-[계정과목등록]에서 계정과목을 추가/수정합니다. 계정코드, 계정명, 차변/대변 구분, 대차구분 등을 입력합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 계정과목을 새로 추가하거나 수정하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },

  // 매입전표 입력 (5문항)
  {
    id: 6,
    topic: '매입전표 입력',
    question: '일반 상품을 외상으로 매입한 경우 매입전표 입력 방법은?',
    answer: '[전표입력]-[매입매출전표]에서 유형 51(과세), 거래처, 품목, 공급가액을 입력합니다. 분개는 (차)상품/(대)외상매입금이 자동 생성됩니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 일반 상품을 외상으로 매입한 경우 매입전표 입력 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 7,
    topic: '매입전표 입력',
    question: '신용카드로 비품을 구매한 경우 전표 입력 방법은?',
    answer: '매입매출전표에서 유형 54(카드), 거래처(카드사), 공급가액을 입력합니다. 분개는 (차)비품/(대)미지급금이 생성됩니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 신용카드로 비품을 구매한 경우 전표 입력 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 8,
    topic: '매입전표 입력',
    question: '현금으로 소모품을 구매하고 현금영수증을 받은 경우 입력 방법은?',
    answer: '매입매출전표에서 유형 57(현금), 거래처, 공급가액을 입력합니다. 현금영수증 승인번호를 입력하면 매입세액공제가 가능합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 현금으로 소모품을 구매하고 현금영수증을 받은 경우 입력 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 9,
    topic: '매입전표 입력',
    question: '세금계산서를 받고 상품을 매입한 경우 부가세 처리 방법은?',
    answer: '공급가액과 부가세를 구분하여 입력합니다. 유형 51(과세)로 입력하면 부가세가 자동 계산되어 매입세액으로 처리됩니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 세금계산서를 받고 상품을 매입한 경우 부가세 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 10,
    topic: '매입전표 입력',
    question: '면세물품(농산물 등)을 매입한 경우 전표 유형과 처리 방법은?',
    answer: '유형 52(면세)를 선택하여 입력합니다. 면세 매입은 부가세가 없으므로 공급가액만 입력하고, 의제매입세액공제 대상인지 확인합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 면세물품(농산물 등)을 매입한 경우 전표 유형과 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },

  // 매출전표 입력 (5문항)
  {
    id: 11,
    topic: '매출전표 입력',
    question: '상품을 외상으로 판매한 경우 매출전표 입력 방법은?',
    answer: '[전표입력]-[매입매출전표]에서 유형 11(과세), 거래처, 품목, 공급가액을 입력합니다. 분개는 (차)외상매출금/(대)상품매출이 자동 생성됩니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 상품을 외상으로 판매한 경우 매출전표 입력 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 12,
    topic: '매출전표 입력',
    question: '신용카드 매출이 발생한 경우 전표 입력 방법은?',
    answer: '유형 14(카드)를 선택하고 거래처, 공급가액을 입력합니다. 분개는 (차)카드미수금/(대)상품매출이 생성되며, 카드수수료는 별도 처리합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 신용카드 매출이 발생한 경우 전표 입력 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 13,
    topic: '매출전표 입력',
    question: '현금으로 판매하고 현금영수증을 발행한 경우 입력 방법은?',
    answer: '유형 17(현금)을 선택하고 공급가액을 입력합니다. 현금영수증 발행정보(승인번호, 발행유형)를 함께 입력합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 현금으로 판매하고 현금영수증을 발행한 경우 입력 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 14,
    topic: '매출전표 입력',
    question: '과세 매출과 면세 매출이 동시에 발생한 경우 처리 방법은?',
    answer: '과세 매출은 유형 11(과세), 면세 매출은 유형 12(면세)로 각각 별도의 전표로 입력합니다. 부가세 신고 시 각각 구분하여 집계됩니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 과세 매출과 면세 매출이 동시에 발생한 경우 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 15,
    topic: '매출전표 입력',
    question: '매출 반품이 발생한 경우 전표 처리 방법은?',
    answer: '원래 매출과 동일한 유형으로 음수(-)금액을 입력하거나, 별도의 매출환입 전표를 작성합니다. 세금계산서 발행 건이면 수정세금계산서를 발행해야 합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 매출 반품이 발생한 경우 전표 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },

  // 세금계산서 실무 (5문항)
  {
    id: 16,
    topic: '세금계산서 실무',
    question: '전자세금계산서를 발행하는 절차와 방법은?',
    answer: '[부가세]-[전자세금계산서]-[전자세금계산서발행]에서 거래처, 품목, 공급가액을 입력하고 발행합니다. 공인인증서로 전자서명 후 국세청에 전송합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 전자세금계산서를 발행하는 절차와 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 17,
    topic: '세금계산서 실무',
    question: '세금계산서 필수 기재사항 5가지는 무엇인가요?',
    answer: '공급자 사업자등록번호, 공급받는 자 사업자등록번호, 작성일자, 공급가액, 부가가치세액이 필수 기재사항입니다. 하나라도 누락되면 불성실 가산세가 부과됩니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 세금계산서 필수 기재사항 5가지는 무엇인가요?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 18,
    topic: '세금계산서 실무',
    question: '매입 세금계산서를 수취하여 등록하는 방법은?',
    answer: '매입매출전표에서 거래내역을 입력하거나, 홈택스에서 전자세금계산서를 조회하여 일괄 다운로드 후 업로드할 수 있습니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 매입 세금계산서를 수취하여 등록하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 19,
    topic: '세금계산서 실무',
    question: '전자세금계산서 발행 기한과 지연 발행 시 가산세는?',
    answer: '공급시기가 속하는 달의 다음달 10일까지 발행해야 합니다. 기한 경과 후 발행 시 공급가액의 1% 가산세가 부과됩니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 전자세금계산서 발행 기한과 지연 발행 시 가산세는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 20,
    topic: '세금계산서 실무',
    question: '수정세금계산서를 발행해야 하는 경우와 발행 방법은?',
    answer: '기재사항 착오, 환입, 계약 해제 등의 사유로 발행합니다. [전자세금계산서]-[수정발행]에서 당초 세금계산서를 불러와 수정 사유를 선택하고 발행합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 수정세금계산서를 발행해야 하는 경우와 발행 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },

  // 부가세 신고서 작성 (5문항)
  {
    id: 21,
    topic: '부가세 신고서 작성',
    question: '부가가치세 신고서를 작성하기 전에 확인해야 할 사항은?',
    answer: '매입매출전표 입력 완료 여부, 세금계산서 수취/발행 내역 일치 여부, 신용카드/현금영수증 매출 집계, 영세율/면세 매출 구분을 확인합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 부가가치세 신고서를 작성하기 전에 확인해야 할 사항은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 22,
    topic: '부가세 신고서 작성',
    question: '부가세 신고서에서 매출세액이 집계되는 항목들은?',
    answer: '세금계산서 발급분, 신용카드/현금영수증 발행분, 기타 매출분이 매출세액으로 집계됩니다. 각 항목별 공급가액과 세액을 확인합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 부가세 신고서에서 매출세액이 집계되는 항목들은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 23,
    topic: '부가세 신고서 작성',
    question: '매입세액 공제를 받을 수 있는 항목과 불공제 항목은?',
    answer: '세금계산서 수취분, 신용카드/현금영수증 매입분은 공제됩니다. 접대비, 비영업용 소형승용차, 면세사업 관련 매입은 불공제 대상입니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 매입세액 공제를 받을 수 있는 항목과 불공제 항목은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 24,
    topic: '부가세 신고서 작성',
    question: '납부세액 또는 환급세액을 확인하는 방법은?',
    answer: '[부가세]-[부가세신고서]에서 매출세액에서 매입세액을 차감한 금액이 양수면 납부세액, 음수면 환급세액입니다. 신고서 미리보기로 최종 확인합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 납부세액 또는 환급세액을 확인하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 25,
    topic: '부가세 신고서 작성',
    question: '부가세 신고서 제출 전 검증해야 할 최종 체크리스트는?',
    answer: '매출/매입처별세금계산서합계표 일치 여부, 신용카드매출전표 수령명세서, 현금영수증 매출 집계, 가산세 해당 여부를 최종 확인 후 전자신고합니다.',
    prompt: 'TAT 2급 실무 문제입니다.\n\n문제: 부가세 신고서 제출 전 검증해야 할 최종 체크리스트는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  }
];

const topics = ['더존 Smart A 기본', '매입전표 입력', '매출전표 입력', '세금계산서 실무', '부가세 신고서 작성'];

export default function TAT2PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tat2-practical-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tat2-practical-progress', JSON.stringify(progress));
  }, [progress]);

  const filteredQuestions = selectedTopic
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const currentQ = filteredQuestions[currentQuestion];

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setProgress(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleTopicSelect = (topic: string | null) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setShowAnswer(false);
  };

  const handleAIHelp = () => {
    setCurrentPrompt(currentQ.prompt);
    setShowAIModal(true);
  };

  const getTopicProgress = (topic: string) => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    const completed = topicQuestions.filter(q => progress[q.id]).length;
    return { completed, total: topicQuestions.length };
  };

  const totalProgress = Object.keys(progress).filter(k => progress[Number(k)]).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-violet-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tat-2" className="text-gray-500 hover:text-gray-700">TAT 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-violet-600 font-medium">실무연습</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
              💻
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">실무연습</h1>
              <p className="text-gray-600">더존 Smart A 프로그램 기반 부가가치세 실무 문제 연습</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-violet-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm font-bold text-violet-600">{totalProgress} / {questions.length} 완료</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(totalProgress / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Topic Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-violet-100">
              <h3 className="font-bold text-gray-900 mb-4">토픽 선택</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicSelect(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-violet-100 text-violet-700 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>전체 문항</span>
                    <span className="text-sm text-gray-500">{totalProgress}/{questions.length}</span>
                  </div>
                </button>
                {topics.map((topic) => {
                  const { completed, total } = getTopicProgress(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => handleTopicSelect(topic)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        selectedTopic === topic
                          ? 'bg-violet-100 text-violet-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{topic}</span>
                        <span className={`text-sm ${completed === total ? 'text-violet-600 font-medium' : 'text-gray-500'}`}>
                          {completed}/{total}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${completed === total ? 'bg-violet-500' : 'bg-violet-400'}`}
                          style={{ width: `${(completed / total) * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl p-4 text-white">
              <h3 className="font-bold mb-3">학습 팁</h3>
              <ul className="text-sm space-y-2 text-violet-100">
                <li>- 전표 입력 순서를 정확히 익히세요</li>
                <li>- 과세유형(51, 54, 57 등)을 암기하세요</li>
                <li>- 세금계산서 필수기재사항을 숙지하세요</li>
                <li>- 부가세 신고서 흐름을 이해하세요</li>
              </ul>
            </div>
          </div>

          {/* Main Content - Question Area */}
          <div className="lg:col-span-3">
            {currentQ && (
              <div className="bg-white rounded-xl shadow-sm border border-violet-100 overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {currentQ.topic}
                      </span>
                      <span className="text-violet-100">
                        문제 {currentQuestion + 1} / {filteredQuestions.length}
                      </span>
                    </div>
                    {progress[currentQ.id] && (
                      <span className="bg-violet-200 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
                        완료
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                    {currentQ.question}
                  </h2>

                  {/* Answer Section */}
                  {!showAnswer ? (
                    <button
                      onClick={handleShowAnswer}
                      className="w-full py-4 bg-violet-50 hover:bg-violet-100 text-violet-700 font-medium rounded-xl border-2 border-dashed border-violet-300 transition"
                    >
                      정답 보기
                    </button>
                  ) : (
                    <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">💡</span>
                        <span className="font-bold text-violet-800">정답 해설</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{currentQ.answer}</p>
                    </div>
                  )}

                  {/* Navigation & AI Help */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-3">
                      <button
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        이전
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentQuestion === filteredQuestions.length - 1}
                        className="px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        다음
                      </button>
                    </div>
                    <button
                      onClick={handleAIHelp}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:from-violet-600 hover:to-purple-600 transition"
                    >
                      <span>🤖</span>
                      <span>AI에게 질문</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Question Navigator */}
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-violet-100">
              <h3 className="font-medium text-gray-900 mb-3">문항 네비게이터</h3>
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setShowAnswer(false);
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      idx === currentQuestion
                        ? 'bg-violet-600 text-white'
                        : progress[q.id]
                        ? 'bg-violet-100 text-violet-700 hover:bg-violet-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            본 사이트는 학습 참고용이며, 정확한 시험 정보는
            <a href="https://at.kicpa.or.kr" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline ml-1">한국공인회계사회</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
