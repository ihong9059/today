'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  // 기초정보관리 (5문항)
  {
    id: 1,
    topic: '기초정보관리',
    question: '케이렙(KcLep)에서 신규 거래처를 등록할 때 필수적으로 입력해야 하는 항목으로 옳지 않은 것은?',
    options: ['거래처코드', '거래처명', '대표자 주민등록번호', '사업자등록번호'],
    answer: 2,
    explanation: '거래처 등록 시 거래처코드, 거래처명, 사업자등록번호는 필수 항목이지만, 대표자 주민등록번호는 선택 항목입니다.'
  },
  {
    id: 2,
    topic: '기초정보관리',
    question: '기초잔액 입력 시 차변 합계와 대변 합계가 일치하지 않을 경우 발생하는 문제는?',
    options: ['전표입력 불가', '결산처리 오류', '대차불일치로 마감 불가', '자동으로 조정됨'],
    answer: 2,
    explanation: '기초잔액 입력 시 차변과 대변의 합계가 일치하지 않으면 대차불일치 상태가 되어 회계기간 마감이 불가능합니다.'
  },
  {
    id: 3,
    topic: '기초정보관리',
    question: '계정과목 설정에서 대손충당금 계정의 성격으로 올바른 것은?',
    options: ['자산의 증가', '자산의 차감', '부채의 증가', '비용의 발생'],
    answer: 1,
    explanation: '대손충당금은 매출채권 등 자산계정의 차감계정으로, 자산의 차감 성격을 가집니다.'
  },
  {
    id: 4,
    topic: '기초정보관리',
    question: '전기분 재무제표 입력 시 주의해야 할 사항으로 옳지 않은 것은?',
    options: ['전기말 재무상태표 금액 입력', '당기 기초잔액과 일치 여부 확인', '전기 손익계산서 금액 입력', '전기 현금흐름표 금액 입력'],
    answer: 3,
    explanation: '전산회계 1급 실기에서는 재무상태표와 손익계산서를 입력하며, 현금흐름표는 일반적으로 입력 대상이 아닙니다.'
  },
  {
    id: 5,
    topic: '기초정보관리',
    question: '회사등록정보에서 설정하는 회계기간의 일반적인 기본값은?',
    options: ['1월 1일 ~ 12월 31일', '4월 1일 ~ 3월 31일', '7월 1일 ~ 6월 30일', '사업자가 임의로 설정'],
    answer: 0,
    explanation: '일반적인 회계기간은 1월 1일부터 12월 31일까지이며, 법인의 경우 정관에 따라 다를 수 있습니다.'
  },

  // 전표입력 (5문항)
  {
    id: 6,
    topic: '전표입력',
    question: '상품 100,000원을 매입하고 대금은 현금으로 지급한 경우, 사용해야 할 전표 유형은?',
    options: ['일반전표(입금)', '일반전표(출금)', '매입매출전표', '대체전표'],
    answer: 2,
    explanation: '상품 매입 시에는 부가세 관련 처리를 위해 매입매출전표를 사용해야 합니다. 세금계산서 수취 여부와 관계없이 매입매출전표로 입력합니다.'
  },
  {
    id: 7,
    topic: '전표입력',
    question: '일반전표 입력 시 적요를 입력하는 주된 목적은?',
    options: ['세무조사 대비', '거래 내용 파악 용이', '결산 자동화', '전표 자동 분류'],
    answer: 1,
    explanation: '적요는 거래의 내용을 기술하여 추후 거래 내용을 쉽게 파악할 수 있도록 하는 것이 주된 목적입니다.'
  },
  {
    id: 8,
    topic: '전표입력',
    question: '고정자산(비품) 500,000원을 현금으로 구입한 경우의 분개로 올바른 것은?',
    options: [
      '(차) 비품 500,000 / (대) 현금 500,000',
      '(차) 소모품비 500,000 / (대) 현금 500,000',
      '(차) 비품 454,545, 부가세대급금 45,455 / (대) 현금 500,000',
      '(차) 비품 500,000, 부가세대급금 50,000 / (대) 현금 550,000'
    ],
    answer: 2,
    explanation: '고정자산 구입 시 세금계산서를 수취하면 공급가액과 부가세를 구분하여 처리합니다. 부가세 포함 금액에서 역산(500,000/1.1)합니다.'
  },
  {
    id: 9,
    topic: '전표입력',
    question: '매출전표 입력 시 [11.과세]와 [12.영세]의 차이점으로 올바른 것은?',
    options: [
      '11.과세는 세금계산서 발급, 12.영세는 미발급',
      '11.과세는 10% 세율 적용, 12.영세는 0% 세율 적용',
      '11.과세는 국내거래, 12.영세는 수출거래 전용',
      '11.과세는 일반과세자, 12.영세는 간이과세자 전용'
    ],
    answer: 1,
    explanation: '과세(11)는 10%의 부가가치세율이 적용되고, 영세(12)는 0%의 세율이 적용됩니다. 영세율은 주로 수출거래에 적용됩니다.'
  },
  {
    id: 10,
    topic: '전표입력',
    question: '외상매출금 회수 시 3% 할인을 적용하여 받은 경우의 회계처리로 올바른 것은?',
    options: [
      '(차) 현금 / (대) 외상매출금, 매출할인',
      '(차) 현금, 매출할인 / (대) 외상매출금',
      '(차) 현금, 매출에누리 / (대) 외상매출금',
      '(차) 현금 / (대) 외상매출금'
    ],
    answer: 1,
    explanation: '외상매출금 회수 시 할인을 적용하면, 매출할인(비용)을 차변에 기록하고 외상매출금 전액을 대변에서 차감합니다.'
  },

  // 부가세신고 (5문항)
  {
    id: 11,
    topic: '부가세신고',
    question: '매출처별세금계산서합계표 작성 시 포함되지 않는 항목은?',
    options: ['세금계산서 발급분', '신용카드 매출분', '현금영수증 매출분', '수정세금계산서 발급분'],
    answer: 1,
    explanation: '매출처별세금계산서합계표에는 세금계산서 발급분만 포함됩니다. 신용카드 매출은 신용카드매출전표등발행금액집계표에 별도 기재합니다.'
  },
  {
    id: 12,
    topic: '부가세신고',
    question: '부가가치세 신고서에서 납부세액 계산 공식으로 올바른 것은?',
    options: [
      '매출세액 - 매입세액',
      '매출세액 - 매입세액 + 가산세',
      '매출세액 - 매입세액 - 공제세액 + 가산세',
      '(매출세액 - 매입세액) × 10%'
    ],
    answer: 2,
    explanation: '납부세액 = 매출세액 - 매입세액 - 기타공제세액(신용카드발행세액공제 등) + 가산세로 계산됩니다.'
  },
  {
    id: 13,
    topic: '부가세신고',
    question: '세금계산서 지연발급 가산세율은?',
    options: ['공급가액의 0.5%', '공급가액의 1%', '공급가액의 2%', '세액의 10%'],
    answer: 1,
    explanation: '세금계산서를 공급시기가 속하는 과세기간 내에 발급하지 않고 지연발급한 경우 공급가액의 1% 가산세가 부과됩니다.'
  },
  {
    id: 14,
    topic: '부가세신고',
    question: '다음 중 매입세액 불공제 대상이 아닌 것은?',
    options: ['접대비 관련 매입세액', '비영업용 소형승용차 관련 매입세액', '사업과 직접 관련 없는 지출', '원재료 구입 관련 매입세액'],
    answer: 3,
    explanation: '원재료 구입은 사업과 직접 관련된 지출이므로 매입세액 공제가 가능합니다. 접대비, 비영업용 소형승용차 등은 불공제 대상입니다.'
  },
  {
    id: 15,
    topic: '부가세신고',
    question: '부가가치세 확정신고 기한(1기)으로 올바른 것은?',
    options: ['6월 25일', '7월 25일', '7월 31일', '8월 25일'],
    answer: 1,
    explanation: '부가가치세 1기 확정신고는 1월~6월 과세기간에 대해 7월 25일까지 신고·납부해야 합니다.'
  },

  // 결산처리 (5문항)
  {
    id: 16,
    topic: '결산처리',
    question: '결산 시 감가상각비 계상을 위해 필요한 정보가 아닌 것은?',
    options: ['취득원가', '내용연수', '잔존가치', '거래처정보'],
    answer: 3,
    explanation: '감가상각비 계산에는 취득원가, 내용연수, 잔존가치, 감가상각방법이 필요하며, 거래처정보는 관련이 없습니다.'
  },
  {
    id: 17,
    topic: '결산처리',
    question: '대손충당금 설정 시 매출채권 잔액 10,000,000원에 대해 2%를 설정하고, 기존 대손충당금 잔액이 150,000원인 경우 추가 설정액은?',
    options: ['50,000원', '150,000원', '200,000원', '350,000원'],
    answer: 0,
    explanation: '필요 대손충당금 = 10,000,000 × 2% = 200,000원. 기존 잔액 150,000원이 있으므로 추가 설정액 = 200,000 - 150,000 = 50,000원'
  },
  {
    id: 18,
    topic: '결산처리',
    question: '케이렙에서 결산자료입력 메뉴를 통해 처리할 수 있는 항목이 아닌 것은?',
    options: ['감가상각비', '대손충당금 설정', '기초잔액 수정', '재고자산평가'],
    answer: 2,
    explanation: '기초잔액 수정은 결산자료입력이 아닌 기초정보관리 메뉴에서 처리합니다. 결산자료입력은 결산정리분개를 위한 메뉴입니다.'
  },
  {
    id: 19,
    topic: '결산처리',
    question: '정액법으로 감가상각 시 연간 감가상각비 계산 공식은?',
    options: [
      '(취득원가 - 잔존가치) ÷ 내용연수',
      '취득원가 × 상각률',
      '기초장부금액 × 상각률',
      '취득원가 ÷ 내용연수'
    ],
    answer: 0,
    explanation: '정액법 감가상각비 = (취득원가 - 잔존가치) ÷ 내용연수로 계산합니다. 매년 동일한 금액을 상각합니다.'
  },
  {
    id: 20,
    topic: '결산처리',
    question: '결산 시 선급비용 중 당기에 해당하는 부분의 회계처리로 올바른 것은?',
    options: [
      '(차) 선급비용 / (대) 해당비용',
      '(차) 해당비용 / (대) 선급비용',
      '(차) 해당비용 / (대) 미지급비용',
      '(차) 선급비용 / (대) 현금'
    ],
    answer: 1,
    explanation: '선급비용 중 당기 귀속분은 비용으로 인식해야 하므로, (차) 해당비용 / (대) 선급비용으로 분개합니다.'
  },

  // 재무제표 (5문항)
  {
    id: 21,
    topic: '재무제표',
    question: '재무상태표에서 유동자산으로 분류되는 항목은?',
    options: ['토지', '건물', '매출채권', '장기대여금'],
    answer: 2,
    explanation: '매출채권은 1년 이내 현금화될 것으로 예상되는 유동자산입니다. 토지, 건물은 비유동자산(유형자산), 장기대여금은 비유동자산입니다.'
  },
  {
    id: 22,
    topic: '재무제표',
    question: '손익계산서에서 매출총이익 계산식으로 올바른 것은?',
    options: [
      '매출액 - 매출원가',
      '매출액 - 매출원가 - 판매비와관리비',
      '매출액 - 매출원가 - 영업외비용',
      '매출액 - 판매비와관리비'
    ],
    answer: 0,
    explanation: '매출총이익 = 매출액 - 매출원가입니다. 판매비와관리비를 차감하면 영업이익이 됩니다.'
  },
  {
    id: 23,
    topic: '재무제표',
    question: '합계잔액시산표에서 확인할 수 있는 정보가 아닌 것은?',
    options: ['계정별 차변 합계', '계정별 대변 합계', '계정별 잔액', '거래처별 미수금 내역'],
    answer: 3,
    explanation: '합계잔액시산표는 계정과목별로 차변/대변 합계와 잔액을 보여주며, 거래처별 세부 내역은 거래처원장에서 확인합니다.'
  },
  {
    id: 24,
    topic: '재무제표',
    question: '재무상태표의 자본 항목 중 이익잉여금에 해당하는 것은?',
    options: ['자본금', '자본잉여금', '이익준비금', '기타자본'],
    answer: 2,
    explanation: '이익준비금은 이익잉여금의 일부로, 당기순이익에서 적립된 금액입니다. 자본금, 자본잉여금은 자본의 다른 항목입니다.'
  },
  {
    id: 25,
    topic: '재무제표',
    question: '케이렙에서 재무제표 출력 전 반드시 확인해야 할 사항은?',
    options: ['거래처 코드 순서', '전표번호 연속성', '차변·대변 일치 여부', '계정과목 코드체계'],
    answer: 2,
    explanation: '재무제표 출력 전 차변과 대변의 합계가 일치하는지 반드시 확인해야 합니다. 불일치 시 재무제표가 정확하게 출력되지 않습니다.'
  }
];

const topics = ['기초정보관리', '전표입력', '부가세신고', '결산처리', '재무제표'];

export default function ComputerizedAccounting1PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-accounting-1-practical-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('computerized-accounting-1-practical-progress', JSON.stringify(progress));
  }, [progress]);

  const filteredQuestions = selectedTopic
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const currentQ = filteredQuestions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentQ.answer) {
      setProgress(prev => ({ ...prev, [currentQ.id]: true }));
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleTopicSelect = (topic: string | null) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAIHelp = () => {
    const prompt = `전산회계 1급 실무연습 문제에 대해 도움이 필요합니다.

문제: ${currentQ.question}

보기:
${currentQ.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}

정답: ${currentQ.options[currentQ.answer]}

이 문제에 대해 다음을 설명해주세요:
1. 정답인 이유를 상세히 설명
2. 케이렙(KcLep) 프로그램에서의 실제 처리 방법
3. 관련된 실무 팁이나 주의사항
4. 비슷한 유형의 문제가 출제되는 경우 대비 방법`;
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const getTopicProgress = (topic: string) => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    const completed = topicQuestions.filter(q => progress[q.id]).length;
    return { completed, total: topicQuestions.length };
  };

  const totalProgress = Object.keys(progress).filter(k => progress[Number(k)]).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-accounting-1" className="text-gray-500 hover:text-gray-700">전산회계 1급</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-accounting-1/study" className="text-gray-500 hover:text-gray-700">학습</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">실무연습</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
              💻
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">실무연습</h1>
              <p className="text-gray-600">케이렙(KcLep) 프로그램 기반 실무 문제 연습</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm font-bold text-indigo-600">{totalProgress} / {questions.length} 완료</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${(totalProgress / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Topic Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <h3 className="font-bold text-gray-900 mb-4">토픽 선택</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicSelect(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
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
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{topic}</span>
                        <span className={`text-sm ${completed === total ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                          {completed}/{total}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${completed === total ? 'bg-green-500' : 'bg-indigo-500'}`}
                          style={{ width: `${(completed / total) * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-4 text-white">
              <h3 className="font-bold mb-3">학습 팁</h3>
              <ul className="text-sm space-y-2 text-indigo-100">
                <li>• 케이렙 메뉴 구조를 먼저 익히세요</li>
                <li>• 단축키 활용으로 시간을 절약하세요</li>
                <li>• 실제 프로그램으로 반복 연습하세요</li>
                <li>• 오답 노트를 꼭 작성하세요</li>
              </ul>
            </div>
          </div>

          {/* Main Content - Question Area */}
          <div className="lg:col-span-3">
            {currentQ && (
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {currentQ.topic}
                      </span>
                      <span className="text-indigo-100">
                        문제 {currentQuestion + 1} / {filteredQuestions.length}
                      </span>
                    </div>
                    {progress[currentQ.id] && (
                      <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-medium">
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

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {currentQ.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-xl border-2 transition ${
                          showResult
                            ? idx === currentQ.answer
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : idx === selectedAnswer
                              ? 'border-red-500 bg-red-50 text-red-800'
                              : 'border-gray-200 text-gray-500'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            showResult
                              ? idx === currentQ.answer
                                ? 'bg-green-500 text-white'
                                : idx === selectedAnswer
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {idx + 1}
                          </span>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Explanation */}
                  {showResult && (
                    <div className={`p-4 rounded-xl mb-6 ${
                      selectedAnswer === currentQ.answer
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">
                          {selectedAnswer === currentQ.answer ? '🎉' : '💡'}
                        </span>
                        <span className={`font-bold ${
                          selectedAnswer === currentQ.answer ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {selectedAnswer === currentQ.answer ? '정답입니다!' : '오답입니다'}
                        </span>
                      </div>
                      <p className="text-gray-700">{currentQ.explanation}</p>
                    </div>
                  )}

                  {/* Navigation & AI Help */}
                  <div className="flex items-center justify-between">
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
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        다음
                      </button>
                    </div>
                    <button
                      onClick={handleAIHelp}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition"
                    >
                      <span>🤖</span>
                      <span>AI에게 질문</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Question Navigator */}
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border">
              <h3 className="font-medium text-gray-900 mb-3">문항 네비게이터</h3>
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setSelectedAnswer(null);
                      setShowResult(false);
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      idx === currentQuestion
                        ? 'bg-indigo-600 text-white'
                        : progress[q.id]
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
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
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            본 사이트는 학습 참고용이며, 정확한 시험 정보는
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
