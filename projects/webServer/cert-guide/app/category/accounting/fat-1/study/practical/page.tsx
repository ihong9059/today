'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Question {
  id: number;
  topic: string;
  question: string;
  answer: string;
  prompt: string;
}

const questions: Question[] = [
  // 기초정보등록 (5문항)
  {
    id: 1,
    topic: '기초정보등록',
    question: '더존 Smart A에서 신규 회사를 등록할 때 반드시 입력해야 하는 항목으로 올바르지 않은 것은?',
    answer: '법인의 경우 사업자등록번호, 회사명, 대표자명, 회계기간은 필수 입력 항목이지만, 자본금 정보는 선택 입력 항목입니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 회사 기초정보 등록 시 필수 입력 항목과 선택 입력 항목의 차이점을 설명해주세요. 특히 사업자등록번호, 회사명, 대표자명, 회계기간, 자본금 등 각 항목의 중요성과 실무에서 주의해야 할 점을 알려주세요.'
  },
  {
    id: 2,
    topic: '기초정보등록',
    question: '거래처 등록 시 매입/매출 구분을 설정하는 주된 이유는?',
    answer: '거래처를 매입처/매출처로 구분하면 부가세 신고 시 매입처별세금계산서합계표와 매출처별세금계산서합계표를 자동으로 분류하여 작성할 수 있습니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 거래처 등록 시 매입/매출 구분 설정의 중요성을 설명해주세요. 부가세 신고 시 어떻게 활용되는지, 실제 프로그램에서 설정하는 방법은 무엇인지 상세히 알려주세요.'
  },
  {
    id: 3,
    topic: '기초정보등록',
    question: '계정과목 설정에서 외화평가 대상 계정을 지정하는 목적은?',
    answer: '외화자산·부채 계정을 외화평가 대상으로 지정하면 결산 시 환율 변동에 따른 외화환산손익을 자동으로 계산할 수 있습니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 계정과목 설정 시 외화평가 대상 계정 지정의 목적과 방법을 설명해주세요. 외화환산손익 처리 과정과 실무에서 주의해야 할 점을 알려주세요.'
  },
  {
    id: 4,
    topic: '기초정보등록',
    question: '기초잔액 입력 시 이월이익잉여금 계정의 역할은?',
    answer: '기초잔액 입력 시 차변 합계와 대변 합계의 차이를 이월이익잉여금 계정으로 조정하여 대차균형을 맞춥니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 기초잔액 입력 시 이월이익잉여금의 역할을 설명해주세요. 대차균형이 맞지 않을 때 어떻게 처리하는지, 실제 프로그램에서의 입력 방법을 알려주세요.'
  },
  {
    id: 5,
    topic: '기초정보등록',
    question: '품목 등록 시 재고수불 관리를 위해 필수적으로 설정해야 하는 항목은?',
    answer: '재고수불 관리를 위해서는 품목코드, 품목명, 단위뿐만 아니라 재고관리여부를 "여"로 설정해야 입출고 처리가 가능합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 품목 등록과 재고수불 관리 설정 방법을 설명해주세요. 품목코드 체계, 재고관리여부 설정, 입출고 처리의 연관성을 상세히 알려주세요.'
  },

  // 전표입력 (5문항)
  {
    id: 6,
    topic: '전표입력',
    question: '일반전표에서 현금 출금 거래를 입력할 때 사용하는 전표 유형은?',
    answer: '현금 출금 거래는 "출금전표"로 입력하며, 대변에 자동으로 현금 계정이 입력됩니다. 차변에는 해당 비용이나 자산 계정을 입력합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 현금 출금 거래 입력 방법을 설명해주세요. 출금전표의 특징, 차변/대변 자동 입력 방식, 실무에서 자주 사용하는 거래 예시를 알려주세요.'
  },
  {
    id: 7,
    topic: '전표입력',
    question: '매입매출전표에서 과세유형 "51.면세"를 선택하는 경우는?',
    answer: '면세사업자로부터 농산물, 의료용품 등 부가세 면세 품목을 매입할 때 "51.면세"를 선택하며, 이 경우 부가세대급금이 발생하지 않습니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A 매입매출전표에서 과세유형 "51.면세" 적용 대상과 회계처리 방법을 설명해주세요. 면세와 영세율의 차이점, 부가세 신고서에 미치는 영향을 알려주세요.'
  },
  {
    id: 8,
    topic: '전표입력',
    question: '외상매입금을 현금으로 지급하면서 2% 현금할인을 받은 경우의 회계처리는?',
    answer: '(차) 외상매입금 전액 / (대) 현금(지급액), 매입할인(할인액)으로 분개합니다. 매입할인은 영업외수익으로 처리됩니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 외상매입금 결제 시 현금할인 회계처리 방법을 설명해주세요. 매입할인 계정의 성격, 분개 방법, 재무제표에 미치는 영향을 알려주세요.'
  },
  {
    id: 9,
    topic: '전표입력',
    question: '전자세금계산서를 발급받은 매입거래를 입력할 때 전자세금계산서 구분은?',
    answer: '"전자(01)"를 선택합니다. 이는 전자세금계산서를 정상적으로 수취했음을 의미하며, 매입세액 공제가 가능합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 전자세금계산서 매입 입력 방법을 설명해주세요. 전자세금계산서 구분 코드의 종류와 의미, 매입세액 공제 요건을 상세히 알려주세요.'
  },
  {
    id: 10,
    topic: '전표입력',
    question: '고정자산(차량운반구)을 취득하면서 취득세와 등록면허세를 납부한 경우의 처리 방법은?',
    answer: '취득세와 등록면허세는 차량의 취득원가에 포함하여 차량운반구 계정에 합산 처리합니다. 부대비용은 자산의 취득원가에 포함됩니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 고정자산 취득 시 부대비용 처리 방법을 설명해주세요. 취득원가에 포함되는 항목과 비용 처리되는 항목의 구분 기준을 알려주세요.'
  },

  // 결산처리 (5문항)
  {
    id: 11,
    topic: '결산처리',
    question: '결산자료입력에서 감가상각비를 계상할 때 "내용연수 경과자산"의 처리 방법은?',
    answer: '내용연수가 경과한 자산도 잔존가치(비망가액 1원)가 남아 있다면 계속 자산으로 관리하며, 추가 감가상각은 발생하지 않습니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 내용연수가 경과한 고정자산의 결산 처리 방법을 설명해주세요. 비망가액의 개념, 완전상각자산의 관리 방법을 알려주세요.'
  },
  {
    id: 12,
    topic: '결산처리',
    question: '대손충당금 설정 시 보충법과 총액법의 차이점은?',
    answer: '보충법은 기말 필요 충당금에서 기존 잔액을 차감한 금액만 추가 설정하고, 총액법은 기존 잔액을 환입 후 필요액 전액을 새로 설정합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 대손충당금 설정 시 보충법과 총액법의 차이를 설명해주세요. 각 방법의 분개 예시와 재무제표에 미치는 영향을 알려주세요.'
  },
  {
    id: 13,
    topic: '결산처리',
    question: '선급보험료 중 차기 귀속분을 이연 처리하는 결산분개는?',
    answer: '(차) 선급비용 / (대) 보험료로 분개합니다. 당기에 비용 처리된 보험료 중 차기분을 선급비용으로 자산화합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 선급비용 결산정리 방법을 설명해주세요. 경과계정의 개념, 선급비용과 미지급비용의 차이, 분개 예시를 상세히 알려주세요.'
  },
  {
    id: 14,
    topic: '결산처리',
    question: '기말재고자산 평가 시 저가법을 적용하는 경우 평가손실의 처리 방법은?',
    answer: '재고자산을 순실현가능가치로 평가하여 장부금액보다 낮은 경우, 재고자산평가손실(매출원가 또는 영업외비용)을 인식합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 기말재고자산 저가법 평가와 평가손실 처리 방법을 설명해주세요. 순실현가능가치의 개념과 회계처리를 알려주세요.'
  },
  {
    id: 15,
    topic: '결산처리',
    question: '외화채권(외상매출금) 결산 시 환율 상승으로 원화 평가액이 증가한 경우의 회계처리는?',
    answer: '(차) 외상매출금 / (대) 외화환산이익으로 분개합니다. 외화환산이익은 영업외수익으로 분류됩니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 외화채권의 결산 환산 처리 방법을 설명해주세요. 환율 변동에 따른 외화환산손익의 계산과 회계처리를 상세히 알려주세요.'
  },

  // 부가세신고 (5문항)
  {
    id: 16,
    topic: '부가세신고',
    question: '신용카드매출전표등발행금액집계표에 포함되는 항목은?',
    answer: '신용카드 매출, 직불카드 매출, 현금영수증 발급분이 포함됩니다. 이들은 세금계산서 발급 대상이 아닌 소비자 대상 매출입니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 신용카드매출전표등발행금액집계표 작성 방법을 설명해주세요. 포함 항목, 부가세 신고서와의 관계, 실무 작성 시 주의사항을 알려주세요.'
  },
  {
    id: 17,
    topic: '부가세신고',
    question: '의제매입세액공제를 받을 수 있는 업종과 공제율은?',
    answer: '음식점업 등 면세농산물을 원재료로 사용하는 사업자가 대상이며, 업종에 따라 2/102~8/108의 공제율이 적용됩니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 의제매입세액공제 신고 방법을 설명해주세요. 대상 업종, 공제율 계산, 한도 계산 방법을 상세히 알려주세요.'
  },
  {
    id: 18,
    topic: '부가세신고',
    question: '부가세 예정신고 누락분을 확정신고 시 반영하는 방법은?',
    answer: '확정신고 시 "예정신고누락분"란에 해당 금액을 기재하여 합산 신고합니다. 가산세가 부과될 수 있으므로 주의가 필요합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 부가세 예정신고 누락분의 확정신고 반영 방법을 설명해주세요. 가산세 계산, 신고서 기재 방법을 알려주세요.'
  },
  {
    id: 19,
    topic: '부가세신고',
    question: '공통매입세액 안분계산이 필요한 경우는?',
    answer: '과세사업과 면세사업을 겸영하는 사업자가 공통으로 사용하는 매입에 대해 과세매출 비율에 따라 공제 매입세액을 안분 계산합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 공통매입세액 안분계산 방법을 설명해주세요. 겸영사업자의 매입세액 공제 한도, 안분 비율 계산식을 상세히 알려주세요.'
  },
  {
    id: 20,
    topic: '부가세신고',
    question: '부가세 신고서에서 "그 밖의 공제매입세액"에 해당하는 항목은?',
    answer: '재활용폐자원 매입세액, 신용카드 매출전표 발행 세액공제, 대손세액공제 등이 "그 밖의 공제매입세액"에 해당합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 부가세 신고서의 "그 밖의 공제매입세액" 항목을 설명해주세요. 각 공제 항목의 요건과 계산 방법을 상세히 알려주세요.'
  },

  // 종합실무 (5문항)
  {
    id: 21,
    topic: '종합실무',
    question: '전기오류수정 시 당기에 발견된 전기 매출누락의 회계처리 방법은?',
    answer: '중요하지 않은 오류는 당기 매출로 처리하고, 중요한 오류는 전기이월이익잉여금을 수정하여 소급 적용합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 전기오류수정 회계처리 방법을 설명해주세요. 중요성 판단 기준, 당기처리와 소급적용의 차이, 재무제표 수정 방법을 알려주세요.'
  },
  {
    id: 22,
    topic: '종합실무',
    question: '법인세 중간예납액을 납부했을 때의 회계처리와 결산 시 처리 방법은?',
    answer: '납부 시 (차) 선납세금 / (대) 현금으로 처리하고, 결산 시 법인세비용 계상 후 선납세금을 차감하여 미지급법인세를 계상합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 법인세 중간예납과 결산 시 법인세 회계처리 방법을 설명해주세요. 선납세금, 미지급법인세 계정의 흐름을 상세히 알려주세요.'
  },
  {
    id: 23,
    topic: '종합실무',
    question: '퇴직급여충당부채 설정 시 확정급여형(DB)과 확정기여형(DC)의 차이점은?',
    answer: 'DB형은 퇴직급여충당부채를 설정하고, DC형은 매기 납입액을 퇴직급여로 비용 처리합니다. 부채 인식 방법이 다릅니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 퇴직급여 회계처리 방법을 설명해주세요. DB형과 DC형의 차이, 퇴직급여충당부채 설정 방법, 퇴직연금 납입 처리를 알려주세요.'
  },
  {
    id: 24,
    topic: '종합실무',
    question: '장기차입금의 유동성대체 시점과 회계처리 방법은?',
    answer: '결산일로부터 1년 이내에 만기가 도래하는 장기차입금은 유동성장기부채로 대체합니다. (차) 장기차입금 / (대) 유동성장기부채',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 유동성대체 회계처리 방법을 설명해주세요. 대상 계정, 대체 기준, 재무상태표 표시 방법을 상세히 알려주세요.'
  },
  {
    id: 25,
    topic: '종합실무',
    question: '당기순이익의 이익잉여금 처분 순서로 올바른 것은?',
    answer: '이익준비금(법정적립금) → 기타법정적립금 → 임의적립금 → 배당금 순서로 처분합니다. 이익준비금은 자본금의 50%까지 적립해야 합니다.',
    prompt: 'FAT 1급 실무연습 문제입니다. 더존 Smart A에서 이익잉여금처분계산서 작성 방법을 설명해주세요. 법정적립금과 임의적립금의 차이, 처분 순서, 배당금 계산 방법을 알려주세요.'
  }
];

const topics = ['기초정보등록', '전표입력', '결산처리', '부가세신고', '종합실무'];

export default function FAT1PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fat-1-practical-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fat-1-practical-progress', JSON.stringify(progress));
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-emerald-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/fat-1" className="text-gray-500 hover:text-gray-700">FAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">실무연습</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
              💻
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">실무연습</h1>
              <p className="text-gray-600">더존 Smart A 프로그램 기반 실무 문제 연습</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm font-bold text-emerald-600">{totalProgress} / {questions.length} 완료</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-300"
                style={{ width: `${(totalProgress / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Topic Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
              <h3 className="font-bold text-gray-900 mb-4">토픽 선택</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicSelect(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-emerald-100 text-emerald-700 font-medium'
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
                          ? 'bg-emerald-100 text-emerald-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{topic}</span>
                        <span className={`text-sm ${completed === total ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                          {completed}/{total}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${completed === total ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                          style={{ width: `${(completed / total) * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white">
              <h3 className="font-bold mb-3">학습 팁</h3>
              <ul className="text-sm space-y-2 text-emerald-100">
                <li>- 더존 Smart A 메뉴 구조를 먼저 익히세요</li>
                <li>- F2, F5 등 단축키를 활용하세요</li>
                <li>- 전표입력과 결산을 반복 연습하세요</li>
                <li>- 부가세 신고서 흐름을 이해하세요</li>
              </ul>
            </div>
          </div>

          {/* Main Content - Question Area */}
          <div className="lg:col-span-3">
            {currentQ && (
              <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {currentQ.topic}
                      </span>
                      <span className="text-emerald-100">
                        문제 {currentQuestion + 1} / {filteredQuestions.length}
                      </span>
                    </div>
                    {progress[currentQ.id] && (
                      <span className="bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
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
                      className="w-full py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-xl border-2 border-dashed border-emerald-300 transition"
                    >
                      정답 보기
                    </button>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">💡</span>
                        <span className="font-bold text-emerald-800">정답 해설</span>
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
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
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
                        ? 'bg-emerald-600 text-white'
                        : progress[q.id]
                        ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
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
            <a href="https://at.kicpa.or.kr" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline ml-1">한국공인회계사회</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
