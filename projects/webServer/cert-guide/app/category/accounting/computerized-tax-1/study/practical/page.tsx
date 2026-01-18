'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Question {
  id: number;
  topic: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  // 재무회계실무 (5문항)
  {
    id: 1,
    topic: '재무회계실무',
    question: '케이렙에서 결산정리분개 중 감가상각비를 입력할 때, 어떤 메뉴에서 작업하는가?',
    options: ['일반전표입력', '매입매출전표입력', '결산자료입력', '고정자산등록'],
    answer: 2,
    explanation: '감가상각비는 결산자료입력 메뉴에서 자동계산 후 입력합니다. 고정자산등록에서 등록한 자산 정보를 바탕으로 자동 계산됩니다.'
  },
  {
    id: 2,
    topic: '재무회계실무',
    question: '재무제표를 출력하기 전 반드시 수행해야 하는 작업은?',
    options: ['전표마감', '재무제표자동생성', '결산자료입력 완료', '장부마감'],
    answer: 2,
    explanation: '재무제표 출력 전 결산자료입력을 완료하여 모든 결산정리분개가 반영되어야 정확한 재무제표를 얻을 수 있습니다.'
  },
  {
    id: 3,
    topic: '재무회계실무',
    question: '케이렙에서 전기오류수정손익을 입력할 때 사용하는 계정과목은?',
    options: ['잡손실', '전기오류수정손실', '기타영업외비용', '영업외비용'],
    answer: 1,
    explanation: '전기오류수정손익은 K-IFRS에 따라 전기오류수정손실 또는 전기오류수정이익 계정을 사용하여 처리합니다.'
  },
  {
    id: 4,
    topic: '재무회계실무',
    question: '대손충당금 설정 시 케이렙에서의 올바른 처리 방법은?',
    options: ['일반전표에서 직접 입력', '결산자료입력에서 대손상각비 선택', '매출채권관리에서 설정', '채권관리에서 자동계산'],
    answer: 1,
    explanation: '대손충당금 설정은 결산자료입력 메뉴에서 대손상각비 항목을 선택하여 기말 매출채권 잔액을 기준으로 설정합니다.'
  },
  {
    id: 5,
    topic: '재무회계실무',
    question: '케이렙에서 재고자산 평가손실을 반영할 때 사용하는 메뉴는?',
    options: ['재고수불부', '결산자료입력', '재고자산평가', '원가계산'],
    answer: 1,
    explanation: '재고자산 평가손실은 결산자료입력 메뉴에서 재고자산평가손실 항목을 통해 저가법 적용에 따른 평가손실을 반영합니다.'
  },

  // 부가세신고 (5문항)
  {
    id: 6,
    topic: '부가세신고',
    question: '케이렙에서 부가가치세 신고서 작성 시 세금계산서합계표가 자동반영되지 않을 때 확인해야 할 사항은?',
    options: ['전표승인 여부', '거래처코드 등록', '매입매출전표의 적격증빙 구분', '사업자등록번호 확인'],
    answer: 2,
    explanation: '세금계산서합계표 자동반영을 위해서는 매입매출전표 입력 시 적격증빙 구분(세금계산서, 계산서 등)이 정확히 선택되어야 합니다.'
  },
  {
    id: 7,
    topic: '부가세신고',
    question: '수정세금계산서를 발급받은 경우 케이렙에서의 처리 방법은?',
    options: ['기존 전표 삭제 후 재입력', '매입매출전표에서 수정분 구분 입력', '일반전표로 조정', '차이금액만 추가 입력'],
    answer: 1,
    explanation: '수정세금계산서는 매입매출전표에서 수정분 구분을 선택하여 입력하며, 원래 세금계산서와 별도로 관리됩니다.'
  },
  {
    id: 8,
    topic: '부가세신고',
    question: '부가가치세 예정고지세액을 케이렙에서 어떻게 반영하는가?',
    options: ['일반전표에서 입력', '부가세신고서에서 직접 입력', '예정고지명세에서 입력', '자동반영됨'],
    answer: 2,
    explanation: '예정고지세액은 부가세신고 메뉴 내 예정고지명세에서 입력하면 확정신고서에 자동 반영됩니다.'
  },
  {
    id: 9,
    topic: '부가세신고',
    question: '신용카드매출전표등수령명세서 작성 시 주의할 점은?',
    options: ['모든 카드매출 포함', '세금계산서 수취분 제외', '공제불가분 제외', '매입세액공제 가능분만 포함'],
    answer: 3,
    explanation: '신용카드매출전표등수령명세서는 매입세액공제가 가능한 신용카드, 현금영수증 수취분만 작성합니다.'
  },
  {
    id: 10,
    topic: '부가세신고',
    question: '부가가치세 가산세 중 무신고가산세 계산 시 케이렙에서 반영되는 항목은?',
    options: ['자동계산됨', '가산세명세서에서 수동 입력', '신고서 본문에 직접 입력', '세무조정에서 반영'],
    answer: 1,
    explanation: '가산세는 케이렙의 가산세명세서 메뉴에서 해당 유형을 선택하고 금액을 입력하면 신고서에 자동 반영됩니다.'
  },

  // 원천징수 (5문항)
  {
    id: 11,
    topic: '원천징수',
    question: '케이렙에서 급여대장 작성 시 국민연금 자동계산이 안 될 때 확인할 사항은?',
    options: ['직원등록 정보', '급여항목설정', '4대보험 설정', '공제항목 선택'],
    answer: 2,
    explanation: '4대보험 자동계산을 위해서는 급여항목설정에서 해당 보험료 항목이 자동계산으로 설정되어 있어야 합니다.'
  },
  {
    id: 12,
    topic: '원천징수',
    question: '일용근로자 원천징수 시 케이렙에서 적용되는 기본공제액은?',
    options: ['10만원', '15만원', '18만원', '20만원'],
    answer: 1,
    explanation: '일용근로자의 근로소득 기본공제는 일 15만원이며, 케이렙에서 일용근로 급여 입력 시 자동 적용됩니다.'
  },
  {
    id: 13,
    topic: '원천징수',
    question: '원천징수이행상황신고서에서 "환급세액조정"란에 기재하는 금액은?',
    options: ['당월 환급세액', '전월 이월 환급세액', '연말정산 환급액', '조정환급액'],
    answer: 1,
    explanation: '환급세액조정란에는 전월에서 이월된 환급세액을 기재하여 당월 납부세액과 상계처리합니다.'
  },
  {
    id: 14,
    topic: '원천징수',
    question: '연말정산 시 케이렙에서 부양가족 공제를 위해 반드시 입력해야 하는 정보는?',
    options: ['가족관계증명서', '주민등록번호와 관계', '소득금액증명원', '등본정보'],
    answer: 1,
    explanation: '부양가족 공제를 위해서는 가족구성원의 주민등록번호와 본인과의 관계를 정확히 입력해야 공제요건이 검증됩니다.'
  },
  {
    id: 15,
    topic: '원천징수',
    question: '지급명세서 제출 시 케이렙에서 전자신고를 위한 파일 생성 메뉴는?',
    options: ['신고서출력', '전자신고', '지급명세서전송', '홈택스연계'],
    answer: 1,
    explanation: '지급명세서 전자신고는 해당 지급명세서 화면에서 전자신고 버튼을 통해 홈택스 제출용 파일을 생성합니다.'
  },

  // 법인세신고 (5문항)
  {
    id: 16,
    topic: '법인세신고',
    question: '케이렙에서 세무조정을 시작하기 전 반드시 확인해야 할 것은?',
    options: ['전기분 신고서', '결산완료 여부', '세무조정계산서', '법인등기부등본'],
    answer: 1,
    explanation: '세무조정은 결산이 완료된 재무제표를 기준으로 진행하므로, 결산완료 여부를 먼저 확인해야 합니다.'
  },
  {
    id: 17,
    topic: '법인세신고',
    question: '접대비 한도초과액 세무조정 시 케이렙에서 사용하는 조서는?',
    options: ['접대비명세서', '손금불산입조서', '접대비조정명세서', '기업업무추진비명세서'],
    answer: 2,
    explanation: '접대비 한도초과액 계산 및 세무조정은 접대비조정명세서를 통해 진행하며, 자동으로 한도액이 계산됩니다.'
  },
  {
    id: 18,
    topic: '법인세신고',
    question: '감가상각 시부인 계산 시 케이렙에서 회사계상액과 세법한도액의 차이를 조정하는 조서는?',
    options: ['고정자산명세서', '감가상각비조정명세서', '업무용승용차명세서', '자산부채명세서'],
    answer: 1,
    explanation: '감가상각비조정명세서에서 회사계상액과 세법상 한도액을 비교하여 시부인 금액을 자동 계산합니다.'
  },
  {
    id: 19,
    topic: '법인세신고',
    question: '이월결손금 공제 시 케이렙에서 입력해야 하는 조서와 관련 서류는?',
    options: ['결손금명세서', '소득금액조정합계표', '이월결손금명세서', '과세표준계산서'],
    answer: 2,
    explanation: '이월결손금명세서에서 발생연도별 결손금과 공제한도를 입력하며, 공제순서에 따라 자동 계산됩니다.'
  },
  {
    id: 20,
    topic: '법인세신고',
    question: '법인세 중간예납세액을 케이렙 신고서에 반영하는 방법은?',
    options: ['일반전표 입력', '법인세신고서에서 직접 입력', '중간예납명세에서 입력', '자동반영됨'],
    answer: 2,
    explanation: '중간예납세액은 법인세신고 메뉴 내 중간예납명세에서 입력하면 세액계산서에 자동으로 공제 반영됩니다.'
  },

  // 종합소득세 (5문항)
  {
    id: 21,
    topic: '종합소득세',
    question: '케이렙에서 종합소득세 신고 시 사업소득금액을 계산하는 메뉴는?',
    options: ['손익계산서', '사업소득명세서', '총수입금액명세서', '필요경비명세서'],
    answer: 1,
    explanation: '사업소득금액은 사업소득명세서에서 총수입금액과 필요경비를 입력하여 계산하며, 신고서에 자동 반영됩니다.'
  },
  {
    id: 22,
    topic: '종합소득세',
    question: '기준경비율 적용 사업자의 필요경비 계산 시 케이렙에서 반드시 입력해야 하는 항목은?',
    options: ['총수입금액', '주요경비', '매입비용', '인건비'],
    answer: 1,
    explanation: '기준경비율 적용 시 주요경비(매입비용, 인건비, 임차료)를 입력해야 하며, 나머지는 기준경비율로 계산됩니다.'
  },
  {
    id: 23,
    topic: '종합소득세',
    question: '종합소득세 신고 시 인적공제를 입력하는 케이렙 메뉴는?',
    options: ['기본사항', '소득공제명세', '인적공제명세', '부양가족명세서'],
    answer: 2,
    explanation: '인적공제(기본공제, 추가공제)는 소득공제명세 화면에서 부양가족 정보와 함께 입력합니다.'
  },
  {
    id: 24,
    topic: '종합소득세',
    question: '성실신고확인대상 사업자가 케이렙에서 추가로 작성해야 하는 서류는?',
    options: ['성실신고확인서', '사업장현황신고서', '수입금액검토표', '성실신고확인결과통보서'],
    answer: 0,
    explanation: '성실신고확인대상 사업자는 세무사 등의 확인을 받아 성실신고확인서를 작성하여 제출해야 합니다.'
  },
  {
    id: 25,
    topic: '종합소득세',
    question: '종합소득세 신고서에서 세액공제를 입력하는 순서로 올바른 것은?',
    options: ['기장세액공제 → 자녀세액공제 → 연금계좌세액공제', '자녀세액공제 → 연금계좌세액공제 → 기장세액공제', '연금계좌세액공제 → 자녀세액공제 → 기장세액공제', '순서 무관'],
    answer: 3,
    explanation: '케이렙에서는 세액공제 항목별로 별도 입력란이 있어 순서에 관계없이 입력 가능하며, 자동으로 계산됩니다.'
  }
];

const topics = ['재무회계실무', '부가세신고', '원천징수', '법인세신고', '종합소득세'];

export default function ComputerizedTax1PracticalPage() {
  const [currentTopic, setCurrentTopic] = useState<string>('전체');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  // localStorage에서 진행상황 로드
  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-1-practical-progress');
    if (saved) {
      const { answers, results } = JSON.parse(saved);
      setSelectedAnswers(answers || {});
      setShowResults(results || {});
    }
  }, []);

  // 진행상황 저장
  useEffect(() => {
    localStorage.setItem('computerized-tax-1-practical-progress', JSON.stringify({
      answers: selectedAnswers,
      results: showResults
    }));
  }, [selectedAnswers, showResults]);

  const filteredQuestions = currentTopic === '전체'
    ? questions
    : questions.filter(q => q.topic === currentTopic);

  const handleAnswer = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };

  const handleAIHelp = (question: Question) => {
    const prompt = `전산세무 1급 실무연습 문제입니다.

[토픽] ${question.topic}

[문제] ${question.question}

[선택지]
${question.options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}

[정답] ${question.answer + 1}번: ${question.options[question.answer]}

이 문제에 대해:
1. 왜 이것이 정답인지 상세히 설명해주세요
2. 케이렙(KcLep) 프로그램에서 실제로 어떻게 조작하는지 단계별로 알려주세요
3. 다른 보기들이 틀린 이유도 설명해주세요
4. 실무에서 자주 실수하는 부분과 주의사항을 알려주세요`;

    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const resetProgress = () => {
    if (confirm('모든 학습 진행상황을 초기화하시겠습니까?')) {
      setSelectedAnswers({});
      setShowResults({});
      localStorage.removeItem('computerized-tax-1-practical-progress');
    }
  };

  const getProgress = () => {
    const answered = Object.keys(showResults).length;
    const correct = questions.filter(q => selectedAnswers[q.id] === q.answer && showResults[q.id]).length;
    return { answered, correct, total: questions.length };
  };

  const progress = getProgress();

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
            <Link href="/category/accounting/computerized-tax-1" className="text-gray-500 hover:text-gray-700">전산세무 1급</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-tax-1/study" className="text-gray-500 hover:text-gray-700">학습</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">실무연습</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">💻</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">전산세무 1급 실무연습</h1>
              <p className="text-gray-600">케이렙(KcLep) 프로그램 실무 능력을 점검하세요</p>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-gradient-to-r from-rose-600 to-red-500 rounded-2xl p-6 text-white mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">학습 진행률</h2>
              <p className="text-rose-100">총 {progress.total}문항 중 {progress.answered}문항 완료</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">{progress.answered}</div>
                <div className="text-sm text-rose-100">완료</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{progress.correct}</div>
                <div className="text-sm text-rose-100">정답</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {progress.answered > 0 ? Math.round((progress.correct / progress.answered) * 100) : 0}%
                </div>
                <div className="text-sm text-rose-100">정답률</div>
              </div>
            </div>
          </div>
          <div className="mt-4 h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(progress.answered / progress.total) * 100}%` }}
            />
          </div>
          <button
            onClick={resetProgress}
            className="mt-4 text-sm text-rose-100 hover:text-white transition"
          >
            초기화
          </button>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCurrentTopic('전체')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentTopic === '전체'
                  ? 'bg-rose-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              전체 (25)
            </button>
            {topics.map(topic => {
              const count = questions.filter(q => q.topic === topic).length;
              const completed = questions.filter(q => q.topic === topic && showResults[q.id]).length;
              return (
                <button
                  key={topic}
                  onClick={() => setCurrentTopic(topic)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    currentTopic === topic
                      ? 'bg-rose-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {topic} ({completed}/{count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {filteredQuestions.map((question, qIdx) => (
            <div
              key={question.id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              {/* Question Header */}
              <div className="bg-rose-50 px-6 py-4 border-b border-rose-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {question.id}
                    </span>
                    <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">
                      {question.topic}
                    </span>
                  </div>
                  {showResults[question.id] && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedAnswers[question.id] === question.answer
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedAnswers[question.id] === question.answer ? '정답' : '오답'}
                    </span>
                  )}
                </div>
              </div>

              {/* Question Content */}
              <div className="p-6">
                <p className="text-lg font-medium text-gray-900 mb-4">
                  {question.question}
                </p>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, optIdx) => {
                    const isSelected = selectedAnswers[question.id] === optIdx;
                    const isCorrect = question.answer === optIdx;
                    const showResult = showResults[question.id];

                    let optionClass = 'border-gray-200 bg-gray-50 hover:bg-gray-100';
                    if (showResult) {
                      if (isCorrect) {
                        optionClass = 'border-green-500 bg-green-50';
                      } else if (isSelected && !isCorrect) {
                        optionClass = 'border-red-500 bg-red-50';
                      }
                    } else if (isSelected) {
                      optionClass = 'border-rose-500 bg-rose-50';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => !showResult && handleAnswer(question.id, optIdx)}
                        disabled={showResult}
                        className={`w-full text-left p-4 rounded-xl border-2 transition ${optionClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                            showResult && isCorrect
                              ? 'bg-green-500 text-white'
                              : showResult && isSelected && !isCorrect
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {optIdx + 1}
                          </span>
                          <span className={showResult && isCorrect ? 'font-medium text-green-700' : ''}>
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showResults[question.id] && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 text-lg">💡</span>
                      <div>
                        <p className="font-medium text-blue-800 mb-1">해설</p>
                        <p className="text-blue-700 text-sm">{question.explanation}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAIHelp(question)}
                      className="mt-3 flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition text-sm"
                    >
                      <span>🤖</span>
                      AI에게 더 자세히 물어보기
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/category/accounting/computerized-tax-1/study"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
          >
            ← 학습 목록
          </Link>
          <Link
            href="/category/accounting/computerized-tax-1/exam"
            className="px-6 py-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition"
          >
            시험 상세 보기 →
          </Link>
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
            <a href="https://license.kacpta.or.kr" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline ml-1">한국세무사회 자격시험</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
