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
    question: '더존 Smart A에서 회사 기본정보 등록 시 "회계기간"의 설정 목적은 무엇인가요?',
    answer: '회계기간은 회계처리의 기준 기간을 설정하는 것으로, 일반적으로 1월 1일~12월 31일의 1년 단위입니다. 이 기간 동안의 모든 거래가 해당 회계연도에 귀속됩니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 회사 기본정보 등록 시 회계기간 설정의 목적과 중요성을 설명해주세요. 회계기간이 재무제표 작성에 미치는 영향도 알려주세요.'
  },
  {
    id: 2,
    topic: '기초정보등록',
    question: '거래처 등록 시 "거래처코드"를 체계적으로 부여하는 이유는 무엇인가요?',
    answer: '거래처코드를 체계적으로 부여하면 거래처를 쉽게 검색하고 분류할 수 있습니다. 예를 들어 매입처는 1000번대, 매출처는 2000번대로 구분하면 관리가 편리합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 거래처 등록 시 거래처코드를 체계적으로 부여하는 방법과 장점을 설명해주세요. 실무에서 사용하는 코드 체계 예시도 알려주세요.'
  },
  {
    id: 3,
    topic: '기초정보등록',
    question: '계정과목 등록에서 "잔액방향"을 차변 또는 대변으로 설정하는 기준은?',
    answer: '자산과 비용 계정은 잔액방향을 차변으로, 부채, 자본, 수익 계정은 잔액방향을 대변으로 설정합니다. 이는 회계등식의 원리에 따른 것입니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 계정과목의 잔액방향 설정 기준을 설명해주세요. 자산, 부채, 자본, 수익, 비용 각 계정의 잔액방향과 그 이유를 알려주세요.'
  },
  {
    id: 4,
    topic: '기초정보등록',
    question: '전기분 재무제표 이월 시 "이월이익잉여금" 계정의 역할은?',
    answer: '전기에서 당기로 이월 시 전기의 당기순이익(손실)이 이월이익잉여금에 반영됩니다. 이는 전기말 자본 금액을 당기초로 정확하게 이월하기 위한 것입니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 전기분 재무제표 이월 시 이월이익잉여금의 역할과 처리 방법을 설명해주세요. 전기 당기순이익과의 관계도 알려주세요.'
  },
  {
    id: 5,
    topic: '기초정보등록',
    question: '기초잔액 입력 후 "시산표"를 조회하여 확인해야 할 사항은?',
    answer: '기초잔액 입력 후 시산표를 조회하여 차변 합계와 대변 합계가 일치하는지(대차균형) 확인해야 합니다. 불일치 시 입력 오류를 찾아 수정해야 합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 기초잔액 입력 후 시산표 조회 시 확인해야 할 사항을 설명해주세요. 대차균형이 맞지 않을 때 오류 수정 방법도 알려주세요.'
  },

  // 전표입력 (5문항)
  {
    id: 6,
    topic: '전표입력',
    question: '일반전표에서 "입금전표", "출금전표", "대체전표"의 차이점은 무엇인가요?',
    answer: '입금전표는 현금 입금 시, 출금전표는 현금 출금 시 사용하며, 대체전표는 현금 이동이 없는 거래(외상, 대체 등)에 사용합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 입금전표, 출금전표, 대체전표의 차이점과 각각의 사용 상황을 구체적인 예시와 함께 설명해주세요.'
  },
  {
    id: 7,
    topic: '전표입력',
    question: '상품을 외상으로 매입하고 세금계산서를 받았을 때의 분개는?',
    answer: '(차) 상품 / 부가세대급금, (대) 외상매입금으로 분개합니다. 부가세대급금은 나중에 부가세 신고 시 공제받을 금액입니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 외상매입 시 세금계산서 수취 거래의 분개 방법을 설명해주세요. 부가세대급금의 의미와 처리 방법도 알려주세요.'
  },
  {
    id: 8,
    topic: '전표입력',
    question: '비품을 현금으로 구입했을 때 전표 유형과 분개는?',
    answer: '출금전표를 사용하며, (차) 비품 / (대) 현금으로 분개합니다. 출금전표는 대변에 현금이 자동 입력되므로 차변 계정만 입력하면 됩니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 비품 현금 구입 시 전표입력 방법을 설명해주세요. 출금전표의 특성과 분개 입력 과정을 상세히 알려주세요.'
  },
  {
    id: 9,
    topic: '전표입력',
    question: '전표입력 시 "적요"를 정확하게 기재해야 하는 이유는?',
    answer: '적요는 거래의 내용을 설명하는 것으로, 나중에 장부 조회나 감사 시 거래 내용을 파악하는 데 필수적입니다. 거래처명, 품목, 수량 등을 명확히 기재해야 합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 전표입력 시 적요 기재의 중요성을 설명해주세요. 효과적인 적요 작성 방법과 예시를 알려주세요.'
  },
  {
    id: 10,
    topic: '전표입력',
    question: '외상매출금을 현금으로 회수했을 때의 전표 유형과 분개는?',
    answer: '입금전표를 사용하며, (차) 현금 / (대) 외상매출금으로 분개합니다. 입금전표는 차변에 현금이 자동 입력됩니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 외상매출금 현금 회수 시 전표입력 방법을 설명해주세요. 입금전표의 특성과 분개 과정을 상세히 알려주세요.'
  },

  // 장부조회 (5문항)
  {
    id: 11,
    topic: '장부조회',
    question: '"일(월)계표"와 "시산표"의 차이점은 무엇인가요?',
    answer: '일(월)계표는 특정 일/월의 차변/대변 발생액을 계정별로 집계한 표이고, 시산표는 각 계정의 잔액을 집계하여 대차균형을 확인하는 표입니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 일(월)계표와 시산표의 차이점을 설명해주세요. 각각의 작성 목적과 활용 방법을 알려주세요.'
  },
  {
    id: 12,
    topic: '장부조회',
    question: '"거래처원장"을 조회하면 어떤 정보를 확인할 수 있나요?',
    answer: '거래처원장에서는 특정 거래처와의 모든 거래 내역, 입금/출금 현황, 현재 미수금 또는 미지급금 잔액을 확인할 수 있습니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 거래처원장 조회 방법과 확인할 수 있는 정보를 설명해주세요. 채권/채무 관리에 활용하는 방법도 알려주세요.'
  },
  {
    id: 13,
    topic: '장부조회',
    question: '"현금출납장"과 "계정별원장(현금)"의 차이점은?',
    answer: '현금출납장은 현금의 수입/지출만 시간순으로 기록한 보조장부이고, 계정별원장(현금)은 현금계정의 차변/대변을 분개 형태로 보여줍니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 현금출납장과 계정별원장(현금)의 차이를 설명해주세요. 각 장부의 활용 목적과 조회 방법을 알려주세요.'
  },
  {
    id: 14,
    topic: '장부조회',
    question: '"합계잔액시산표"에서 차변 합계와 대변 합계가 일치해야 하는 이유는?',
    answer: '복식부기 원리에 따라 모든 거래는 차변과 대변에 동일한 금액이 기록되므로, 시산표의 차변 합계와 대변 합계는 반드시 일치해야 합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 합계잔액시산표의 대차균형 원리를 설명해주세요. 불일치 시 오류를 찾는 방법도 알려주세요.'
  },
  {
    id: 15,
    topic: '장부조회',
    question: '"전표조회" 기능에서 특정 기간의 전표를 검색하는 방법은?',
    answer: '전표조회 화면에서 조회 시작일과 종료일을 설정하고, 필요시 전표유형, 계정과목, 거래처 등의 조건을 추가하여 검색할 수 있습니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 전표조회 기능 사용법을 설명해주세요. 기간별, 계정과목별, 거래처별 검색 방법을 상세히 알려주세요.'
  },

  // 결산기초 (5문항)
  {
    id: 16,
    topic: '결산기초',
    question: '결산의 목적과 결산 절차의 순서를 설명해주세요.',
    answer: '결산은 회계기간 동안의 경영성과와 재무상태를 파악하기 위해 수행합니다. 순서는 수정분개 → 장부마감 → 시산표 작성 → 재무제표 작성입니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 결산의 목적과 결산 절차 순서를 설명해주세요. 각 단계에서 수행하는 작업을 구체적으로 알려주세요.'
  },
  {
    id: 17,
    topic: '결산기초',
    question: '"수정분개(결산정리분개)"가 필요한 항목의 예시는?',
    answer: '감가상각비 계상, 대손충당금 설정, 선급비용/미지급비용 정리, 재고자산 평가 등이 결산정리분개가 필요한 대표적인 항목입니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 수정분개(결산정리분개)가 필요한 항목들을 설명해주세요. 각 항목의 분개 방법과 예시를 알려주세요.'
  },
  {
    id: 18,
    topic: '결산기초',
    question: '기말 재고자산을 확정한 후 "매출원가"를 계산하는 방법은?',
    answer: '매출원가 = 기초재고 + 당기매입 - 기말재고로 계산합니다. 더존 Smart A에서는 기말재고를 입력하면 매출원가가 자동 계산됩니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 매출원가 계산 방법을 설명해주세요. 기초재고, 당기매입, 기말재고의 관계와 입력 방법을 알려주세요.'
  },
  {
    id: 19,
    topic: '결산기초',
    question: '"손익계산서"와 "재무상태표"에 표시되는 계정의 차이는?',
    answer: '손익계산서에는 수익과 비용 계정이, 재무상태표에는 자산, 부채, 자본 계정이 표시됩니다. 당기순이익은 양쪽에 모두 연결됩니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 손익계산서와 재무상태표에 표시되는 계정의 차이를 설명해주세요. 두 재무제표의 연결관계도 알려주세요.'
  },
  {
    id: 20,
    topic: '결산기초',
    question: '결산 후 재무제표를 조회하고 출력하는 방법은?',
    answer: '재무제표 메뉴에서 손익계산서, 재무상태표를 선택하고 조회기간을 설정하면 됩니다. 미리보기 후 인쇄하거나 엑셀로 내보낼 수 있습니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 결산 후 재무제표 조회 및 출력 방법을 설명해주세요. 손익계산서와 재무상태표 각각의 조회 경로를 알려주세요.'
  },

  // 종합실무 (5문항)
  {
    id: 21,
    topic: '종합실무',
    question: '신규 회사를 등록하고 기초정보를 입력하는 전체 순서는?',
    answer: '회사등록 → 회계기간 설정 → 계정과목 확인 → 거래처 등록 → 기초잔액 입력 → 시산표 검증 순서로 진행합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 신규 회사 등록부터 기초정보 입력까지의 전체 순서를 설명해주세요. 각 단계별 주의사항도 알려주세요.'
  },
  {
    id: 22,
    topic: '종합실무',
    question: '한 달간의 거래를 모두 입력한 후 검증하는 방법은?',
    answer: '월계표와 시산표를 조회하여 대차균형을 확인하고, 현금출납장의 잔액과 실제 현금이 일치하는지, 거래처원장의 잔액이 정확한지 검증합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 월간 거래 입력 후 검증하는 방법을 설명해주세요. 오류 발견 시 수정 방법도 알려주세요.'
  },
  {
    id: 23,
    topic: '종합실무',
    question: '전표입력 후 오류를 발견했을 때 수정하는 방법은?',
    answer: '전표조회에서 해당 전표를 찾아 수정하거나 삭제할 수 있습니다. 또는 반대분개(역분개)를 입력하고 정확한 전표를 새로 입력할 수도 있습니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 전표 오류 수정 방법을 설명해주세요. 직접 수정, 삭제 후 재입력, 역분개 방법의 차이점을 알려주세요.'
  },
  {
    id: 24,
    topic: '종합실무',
    question: '회계 데이터를 백업하고 복원하는 방법과 중요성은?',
    answer: '정기적으로 데이터를 외부 저장장치에 백업하여 시스템 오류나 데이터 손실에 대비해야 합니다. 파일 > 백업/복원 메뉴를 사용합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. 더존 Smart A에서 회계 데이터 백업 및 복원 방법을 설명해주세요. 백업 주기와 보관 방법에 대한 권장사항도 알려주세요.'
  },
  {
    id: 25,
    topic: '종합실무',
    question: 'FAT 2급 실무시험에서 자주 출제되는 유형과 대비 방법은?',
    answer: '기초정보등록, 일반전표 입력, 장부조회, 시산표 작성이 주요 출제 유형입니다. 더존 Smart A 프로그램을 반복 실습하여 메뉴와 단축키에 익숙해져야 합니다.',
    prompt: 'FAT 2급 실무연습 문제입니다. FAT 2급 실무시험의 주요 출제 유형과 효과적인 대비 방법을 설명해주세요. 시험 시간 배분 전략도 알려주세요.'
  }
];

const topics = ['기초정보등록', '전표입력', '장부조회', '결산기초', '종합실무'];

export default function FAT2PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fat-2-practical-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fat-2-practical-progress', JSON.stringify(progress));
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-cyan-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/fat-2" className="text-gray-500 hover:text-gray-700">FAT 2급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-cyan-600 font-medium">실무연습</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
              💻
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">실무연습</h1>
              <p className="text-gray-600">더존 Smart A 프로그램 기반 기초 실무 문제 연습</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm font-bold text-cyan-600">{totalProgress} / {questions.length} 완료</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${(totalProgress / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Topic Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-cyan-100">
              <h3 className="font-bold text-gray-900 mb-4">토픽 선택</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicSelect(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-cyan-100 text-cyan-700 font-medium'
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
                          ? 'bg-cyan-100 text-cyan-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{topic}</span>
                        <span className={`text-sm ${completed === total ? 'text-cyan-600 font-medium' : 'text-gray-500'}`}>
                          {completed}/{total}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${completed === total ? 'bg-cyan-500' : 'bg-cyan-400'}`}
                          style={{ width: `${(completed / total) * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl p-4 text-white">
              <h3 className="font-bold mb-3">학습 팁</h3>
              <ul className="text-sm space-y-2 text-cyan-100">
                <li>- 회계등식(자산=부채+자본)을 이해하세요</li>
                <li>- 분개의 차변/대변 원리를 익히세요</li>
                <li>- 전표 유형별 특징을 구분하세요</li>
                <li>- 프로그램 메뉴 구조를 파악하세요</li>
              </ul>
            </div>
          </div>

          {/* Main Content - Question Area */}
          <div className="lg:col-span-3">
            {currentQ && (
              <div className="bg-white rounded-xl shadow-sm border border-cyan-100 overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {currentQ.topic}
                      </span>
                      <span className="text-cyan-100">
                        문제 {currentQuestion + 1} / {filteredQuestions.length}
                      </span>
                    </div>
                    {progress[currentQ.id] && (
                      <span className="bg-cyan-200 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium">
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
                      className="w-full py-4 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-medium rounded-xl border-2 border-dashed border-cyan-300 transition"
                    >
                      정답 보기
                    </button>
                  ) : (
                    <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">💡</span>
                        <span className="font-bold text-cyan-800">정답 해설</span>
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
                        className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
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
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-cyan-100">
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
                        ? 'bg-cyan-600 text-white'
                        : progress[q.id]
                        ? 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
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
            <a href="https://at.kicpa.or.kr" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline ml-1">한국공인회계사회</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
