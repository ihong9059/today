'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

interface Question {
  id: number;
  question: string;
  answer: string;
  prompt: string;
}

const questions: Question[] = [
  // 토픽 1: 회계의 정의 (5문항)
  { id: 1, question: '회계의 정의에 대해 가장 적절하게 설명한 것은 무엇인가요?', answer: '기업의 경제활동을 화폐 단위로 기록, 분류, 요약하여 정보이용자에게 전달하는 시스템', prompt: 'FAT 2급 회계기초 문제입니다. 회계의 정의와 목적에 대해 초보자도 이해할 수 있도록 쉽게 설명해주세요. 회계가 왜 필요한지도 함께 알려주세요.' },
  { id: 2, question: '회계정보의 주요 이용자에 해당하지 않는 것은 무엇인가요?', answer: '경쟁사 직원(내부 정보 비공개 대상)이며, 투자자/채권자/주주/정부가 주요 이용자임', prompt: 'FAT 2급 회계기초 문제입니다. 회계정보 이용자의 종류와 각각이 회계정보를 어떻게 활용하는지 설명해주세요. 내부 이용자와 외부 이용자로 구분해서 알려주세요.' },
  { id: 3, question: '회계의 가장 중요한 목적은 무엇인가요?', answer: '경제적 의사결정에 유용한 재무정보를 제공하는 것', prompt: 'FAT 2급 회계기초 문제입니다. 회계의 목적이 왜 의사결정 지원인지, 그리고 회계정보가 없다면 어떤 문제가 발생하는지 실생활 예시와 함께 설명해주세요.' },
  { id: 4, question: '재무회계와 관리회계의 차이점은 무엇인가요?', answer: '재무회계는 외부 이해관계자용, 관리회계는 내부 경영자용 정보 제공', prompt: 'FAT 2급 회계기초 문제입니다. 재무회계와 관리회계의 차이점을 표로 정리해서 설명해주세요. 각각 어떤 상황에서 활용되는지도 알려주세요.' },
  { id: 5, question: '회계기간의 개념과 일반적인 회계기간은 무엇인가요?', answer: '기업 활동을 일정 기간으로 구분하여 성과 측정, 일반적으로 1년(1월 1일~12월 31일)', prompt: 'FAT 2급 회계기초 문제입니다. 회계기간이 왜 필요한지, 그리고 분기/반기 회계기간은 무엇인지 설명해주세요.' },

  // 토픽 2: 재무제표 개요 (5문항)
  { id: 6, question: '재무제표의 종류 5가지를 나열하면 무엇인가요?', answer: '재무상태표, 손익계산서, 현금흐름표, 자본변동표, 주석', prompt: 'FAT 2급 회계기초 문제입니다. 5가지 재무제표 각각의 역할과 특징을 간단히 설명해주세요.' },
  { id: 7, question: '재무제표를 작성하는 주된 목적은 무엇인가요?', answer: '정보이용자에게 기업의 재무상태와 경영성과를 알리기 위함', prompt: 'FAT 2급 회계기초 문제입니다. 재무제표가 없다면 투자자나 은행이 어떤 어려움을 겪는지 예시를 들어 설명해주세요.' },
  { id: 8, question: '재무상태표와 손익계산서의 가장 큰 차이점은 무엇인가요?', answer: '재무상태표는 특정 시점의 상태(정태적), 손익계산서는 일정 기간의 성과(동태적)', prompt: 'FAT 2급 회계기초 문제입니다. 정태적 재무제표와 동태적 재무제표의 차이를 사진과 동영상에 비유해서 쉽게 설명해주세요.' },
  { id: 9, question: '현금흐름표가 필요한 이유는 무엇인가요?', answer: '발생주의 회계와 별도로 실제 현금의 유입/유출을 파악하기 위함', prompt: 'FAT 2급 회계기초 문제입니다. 손익계산서에서 이익이 났는데 현금이 부족한 상황이 가능한 이유를 설명해주세요.' },
  { id: 10, question: '주석(Notes)의 역할은 무엇인가요?', answer: '재무제표 본문에 표시하기 어려운 세부 정보와 회계정책을 설명', prompt: 'FAT 2급 회계기초 문제입니다. 주석에 어떤 내용들이 기재되는지 구체적인 예시와 함께 알려주세요.' },

  // 토픽 3: 회계등식 (5문항)
  { id: 11, question: '회계등식(회계의 기본 공식)은 무엇인가요?', answer: '자산 = 부채 + 자본', prompt: 'FAT 2급 회계기초 문제입니다. 회계등식이 왜 항상 균형을 이루어야 하는지, 실생활 예시로 설명해주세요.' },
  { id: 12, question: '회계등식에서 자본을 구하는 공식은 무엇인가요?', answer: '자본 = 자산 - 부채 (순자산 개념)', prompt: 'FAT 2급 회계기초 문제입니다. 자본이 왜 순자산이라고도 불리는지, 개인 재정에 비유해서 설명해주세요.' },
  { id: 13, question: '거래가 발생해도 회계등식이 항상 균형을 유지하는 이유는?', answer: '복식부기 원리에 의해 모든 거래가 차변과 대변에 동시에 기록되기 때문', prompt: 'FAT 2급 회계기초 문제입니다. 복식부기의 원리를 간단한 거래 예시로 설명해주세요.' },
  { id: 14, question: '현금 100만원으로 상품을 구입하면 회계등식에 어떤 변화가 생기나요?', answer: '자산 내 구성 변화(현금 감소, 상품 증가), 등식 총액은 변함없음', prompt: 'FAT 2급 회계기초 문제입니다. 자산 내 구성 변화와 자산 총액 변화의 차이를 여러 거래 예시로 설명해주세요.' },
  { id: 15, question: '은행에서 100만원을 빌리면 회계등식에 어떤 변화가 생기나요?', answer: '자산(현금) 100만원 증가, 부채(차입금) 100만원 증가, 양쪽 동시 증가', prompt: 'FAT 2급 회계기초 문제입니다. 돈을 빌릴 때와 출자받을 때 회계등식의 변화 차이를 비교해서 설명해주세요.' },

  // 토픽 4: 자산의 개념 (5문항)
  { id: 16, question: '자산(Asset)의 정의는 무엇인가요?', answer: '과거 거래의 결과로 기업이 통제하고 미래 경제적 효익을 창출하는 자원', prompt: 'FAT 2급 회계기초 문제입니다. 자산의 3가지 인식 조건을 쉬운 예시와 함께 설명해주세요.' },
  { id: 17, question: '유동자산과 비유동자산의 구분 기준은 무엇인가요?', answer: '1년 이내 현금화 또는 사용 여부(1년 기준)', prompt: 'FAT 2급 회계기초 문제입니다. 유동자산과 비유동자산의 구체적인 예시를 각각 5개씩 들어주세요.' },
  { id: 18, question: '매출채권과 미수금의 차이점은 무엇인가요?', answer: '매출채권은 영업활동(상품 판매)에서 발생, 미수금은 영업외 활동에서 발생', prompt: 'FAT 2급 회계기초 문제입니다. 매출채권과 미수금이 발생하는 구체적인 상황을 예시로 설명해주세요.' },
  { id: 19, question: '선급금과 선급비용의 차이점은 무엇인가요?', answer: '선급금은 재화/용역 수령 전 지급, 선급비용은 이미 지급한 비용의 미경과분', prompt: 'FAT 2급 회계기초 문제입니다. 선급금, 선급비용, 선수금, 선수수익의 차이를 표로 정리해서 설명해주세요.' },
  { id: 20, question: '유형자산에 해당하는 것을 3가지 이상 말하면?', answer: '토지, 건물, 기계장치, 차량운반구, 비품, 건설중인자산 등', prompt: 'FAT 2급 회계기초 문제입니다. 유형자산과 무형자산의 차이점과 각각의 예시를 설명해주세요.' },

  // 토픽 5: 부채의 개념 (5문항)
  { id: 21, question: '부채(Liability)의 정의는 무엇인가요?', answer: '과거 거래의 결과로 미래에 자원을 이전해야 하는 현재의 의무', prompt: 'FAT 2급 회계기초 문제입니다. 부채의 정의와 인식 조건을 쉬운 예시와 함께 설명해주세요.' },
  { id: 22, question: '유동부채와 비유동부채의 구분 기준은 무엇인가요?', answer: '1년 이내 상환 의무 여부(1년 기준)', prompt: 'FAT 2급 회계기초 문제입니다. 유동부채와 비유동부채의 구체적인 예시를 각각 5개씩 들어주세요.' },
  { id: 23, question: '매입채무와 미지급금의 차이점은 무엇인가요?', answer: '매입채무는 영업활동(상품 구입)에서 발생, 미지급금은 영업외 활동에서 발생', prompt: 'FAT 2급 회계기초 문제입니다. 매입채무와 미지급금이 발생하는 구체적인 상황을 예시로 설명해주세요.' },
  { id: 24, question: '선수금의 의미와 발생 상황은 무엇인가요?', answer: '재화/용역 제공 전 미리 받은 대금, 제공 의무가 있어 부채로 계상', prompt: 'FAT 2급 회계기초 문제입니다. 선수금이 왜 자산이 아니라 부채인지 설명하고, 선수금이 수익으로 전환되는 과정을 알려주세요.' },
  { id: 25, question: '충당부채란 무엇인가요?', answer: '지급 시기나 금액이 불확실하지만 지급 의무가 있는 부채(예: 퇴직급여충당부채)', prompt: 'FAT 2급 회계기초 문제입니다. 충당부채의 종류와 왜 이를 부채로 인식해야 하는지 설명해주세요.' },

  // 토픽 6: 자본의 개념 (5문항)
  { id: 26, question: '자본(Equity)의 정의는 무엇인가요?', answer: '자산에서 부채를 차감한 잔여 지분, 순자산이라고도 함', prompt: 'FAT 2급 회계기초 문제입니다. 자본이 왜 소유주의 몫인지, 그리고 자본의 구성요소를 설명해주세요.' },
  { id: 27, question: '자본금과 이익잉여금의 차이점은 무엇인가요?', answer: '자본금은 주주가 납입한 금액, 이익잉여금은 영업활동으로 벌어들인 누적 이익', prompt: 'FAT 2급 회계기초 문제입니다. 자본금과 이익잉여금의 차이를 회사 설립부터 배당까지의 과정으로 설명해주세요.' },
  { id: 28, question: '자본잉여금이란 무엇인가요?', answer: '자본거래에서 발생한 잉여금(예: 주식발행초과금)', prompt: 'FAT 2급 회계기초 문제입니다. 자본잉여금이 발생하는 구체적인 상황을 예시와 함께 설명해주세요.' },
  { id: 29, question: '배당을 지급하면 자본에 어떤 영향이 있나요?', answer: '이익잉여금(자본)이 감소하고, 현금(자산)이 감소', prompt: 'FAT 2급 회계기초 문제입니다. 배당의 종류(현금배당, 주식배당)와 각각이 자본에 미치는 영향을 설명해주세요.' },
  { id: 30, question: '자본의 마이너스(결손금)란 무엇인가요?', answer: '누적 손실로 인해 이익잉여금이 마이너스가 된 상태', prompt: 'FAT 2급 회계기초 문제입니다. 결손금이 발생하면 어떤 문제가 생기는지, 그리고 결손보전 방법을 알려주세요.' },

  // 토픽 7: 수익과 비용 (5문항)
  { id: 31, question: '수익(Revenue)의 정의는 무엇인가요?', answer: '영업활동으로 인한 자산의 유입 또는 부채의 감소로 자본을 증가시키는 요소', prompt: 'FAT 2급 회계기초 문제입니다. 수익의 종류(영업수익, 영업외수익)와 각각의 예시를 설명해주세요.' },
  { id: 32, question: '비용(Expense)의 정의는 무엇인가요?', answer: '영업활동으로 인한 자산의 유출 또는 부채의 증가로 자본을 감소시키는 요소', prompt: 'FAT 2급 회계기초 문제입니다. 비용의 종류(매출원가, 판매비와관리비, 영업외비용)를 구분해서 설명해주세요.' },
  { id: 33, question: '수익과 이익의 차이점은 무엇인가요?', answer: '수익은 총 벌어들인 금액, 이익은 수익에서 비용을 차감한 순이익', prompt: 'FAT 2급 회계기초 문제입니다. 매출액, 매출총이익, 영업이익, 당기순이익의 차이를 단계별로 설명해주세요.' },
  { id: 34, question: '발생주의와 현금주의의 차이점은 무엇인가요?', answer: '발생주의는 거래 발생 시점에 인식, 현금주의는 현금 수수 시점에 인식', prompt: 'FAT 2급 회계기초 문제입니다. 발생주의 회계가 왜 더 정확한지 구체적인 예시로 비교 설명해주세요.' },
  { id: 35, question: '수익비용대응의 원칙이란 무엇인가요?', answer: '수익과 그 수익을 얻기 위해 발생한 비용을 같은 기간에 인식하는 원칙', prompt: 'FAT 2급 회계기초 문제입니다. 수익비용대응 원칙의 예시와 이 원칙이 왜 중요한지 설명해주세요.' },

  // 토픽 8: 재무상태표 (5문항)
  { id: 36, question: '재무상태표의 다른 이름은 무엇인가요?', answer: '대차대조표(Balance Sheet)', prompt: 'FAT 2급 회계기초 문제입니다. 재무상태표가 왜 대차대조표라고 불리는지, 그리고 표의 구조를 설명해주세요.' },
  { id: 37, question: '재무상태표에서 자산의 배열 순서는 어떻게 되나요?', answer: '유동성 배열법(현금화 쉬운 순서): 유동자산 → 비유동자산', prompt: 'FAT 2급 회계기초 문제입니다. 유동성 배열법과 고정성 배열법의 차이를 설명해주세요.' },
  { id: 38, question: '재무상태표 등식(좌변=우변)은 무엇인가요?', answer: '자산 = 부채 + 자본 (차변 = 대변)', prompt: 'FAT 2급 회계기초 문제입니다. 재무상태표가 항상 균형을 이루는 이유를 복식부기와 연결해서 설명해주세요.' },
  { id: 39, question: '재무상태표에 표시되는 금액은 언제 시점의 금액인가요?', answer: '특정 시점(보통 회계연도 말일, 예: 12월 31일)의 잔액', prompt: 'FAT 2급 회계기초 문제입니다. 재무상태표의 시점 개념과 손익계산서의 기간 개념을 비교해서 설명해주세요.' },
  { id: 40, question: '재무상태표에서 부채와 자본의 배열 순서는 어떻게 되나요?', answer: '유동부채 → 비유동부채 → 자본(상환 순서)', prompt: 'FAT 2급 회계기초 문제입니다. 재무상태표 우측(대변)의 배열 순서와 그 이유를 설명해주세요.' },

  // 토픽 9: 손익계산서 (5문항)
  { id: 41, question: '손익계산서의 목적은 무엇인가요?', answer: '일정 기간의 경영성과(수익-비용=이익 또는 손실)를 보여주는 것', prompt: 'FAT 2급 회계기초 문제입니다. 손익계산서가 왜 중요한지, 투자자 관점에서 설명해주세요.' },
  { id: 42, question: '매출총이익의 계산식은 무엇인가요?', answer: '매출총이익 = 매출액 - 매출원가', prompt: 'FAT 2급 회계기초 문제입니다. 매출원가에 포함되는 항목들과 매출총이익의 의미를 설명해주세요.' },
  { id: 43, question: '영업이익의 계산식은 무엇인가요?', answer: '영업이익 = 매출총이익 - 판매비와관리비', prompt: 'FAT 2급 회계기초 문제입니다. 판매비와관리비에 포함되는 항목들과 영업이익이 중요한 이유를 설명해주세요.' },
  { id: 44, question: '당기순이익의 계산식은 무엇인가요?', answer: '당기순이익 = 영업이익 + 영업외수익 - 영업외비용 - 법인세비용', prompt: 'FAT 2급 회계기초 문제입니다. 영업외수익과 영업외비용의 예시, 그리고 당기순이익의 의미를 설명해주세요.' },
  { id: 45, question: '손익계산서에서 비용은 어떤 순서로 표시되나요?', answer: '매출원가 → 판매비와관리비 → 영업외비용 → 법인세비용', prompt: 'FAT 2급 회계기초 문제입니다. 손익계산서의 단계별 이익(매출총이익→영업이익→당기순이익) 구조를 설명해주세요.' },

  // 토픽 10: 기타 회계기초 (5문항)
  { id: 46, question: '기업실체의 가정이란 무엇인가요?', answer: '기업을 소유주와 분리된 독립적인 회계단위로 보는 것', prompt: 'FAT 2급 회계기초 문제입니다. 기업실체 가정이 왜 중요한지 개인사업자 예시로 설명해주세요.' },
  { id: 47, question: '계속기업의 가정이란 무엇인가요?', answer: '기업이 예측 가능한 미래에 청산되지 않고 계속 영업할 것이라는 가정', prompt: 'FAT 2급 회계기초 문제입니다. 계속기업 가정이 무너지면 회계처리가 어떻게 달라지는지 설명해주세요.' },
  { id: 48, question: '화폐단위 가정이란 무엇인가요?', answer: '모든 경제활동을 화폐(원)라는 공통 단위로 측정하여 기록한다는 가정', prompt: 'FAT 2급 회계기초 문제입니다. 화폐단위 가정의 한계점(물가변동, 비계량 정보 등)을 설명해주세요.' },
  { id: 49, question: '기간별 보고 가정이란 무엇인가요?', answer: '기업의 경제활동을 일정 기간(회계기간)으로 구분하여 보고한다는 가정', prompt: 'FAT 2급 회계기초 문제입니다. 회계기간을 구분하는 이유와 결산의 필요성을 설명해주세요.' },
  { id: 50, question: '신뢰성 있는 회계정보의 질적 특성은 무엇인가요?', answer: '표현의 충실성(완전성, 중립성, 무오류), 검증가능성, 적시성, 이해가능성', prompt: 'FAT 2급 회계기초 문제입니다. 회계정보의 질적 특성(목적적합성, 신뢰성 등)을 쉽게 설명해주세요.' }
];

const topics = [
  '회계의 정의',
  '재무제표 개요',
  '회계등식',
  '자산의 개념',
  '부채의 개념',
  '자본의 개념',
  '수익과 비용',
  '재무상태표',
  '손익계산서',
  '기타 회계기초'
];

const getTopicByIndex = (index: number): string => {
  if (index < 5) return '회계의 정의';
  if (index < 10) return '재무제표 개요';
  if (index < 15) return '회계등식';
  if (index < 20) return '자산의 개념';
  if (index < 25) return '부채의 개념';
  if (index < 30) return '자본의 개념';
  if (index < 35) return '수익과 비용';
  if (index < 40) return '재무상태표';
  if (index < 45) return '손익계산서';
  return '기타 회계기초';
};

export default function FAT2AccountingBasicsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  const STORAGE_KEY = 'fat-2-accounting-basics-progress';

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  const filteredQuestions = selectedTopic
    ? questions.filter((_, idx) => getTopicByIndex(idx) === selectedTopic)
    : questions;

  const currentQ = filteredQuestions[currentQuestion];
  const currentTopic = getTopicByIndex(questions.findIndex(q => q.id === currentQ.id));

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setProgress(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  const handleTopicChange = (topic: string | null) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setShowAnswer(false);
  };

  const handleAIHelp = () => {
    setCurrentPrompt(currentQ.prompt);
    setShowAIModal(true);
  };

  const getTopicProgress = (topic: string) => {
    const topicQuestions = questions.filter((_, idx) => getTopicByIndex(idx) === topic);
    const completed = topicQuestions.filter(q => progress[q.id]).length;
    return { completed, total: topicQuestions.length };
  };

  const totalProgress = Object.keys(progress).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-cyan-50">
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
            <span className="text-cyan-600 font-medium">회계기초</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-cyan-100">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📊</span> 학습 진행률
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>전체 진행률</span>
                  <span className="font-bold text-cyan-600">{totalProgress}/50</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 rounded-full transition-all"
                    style={{ width: `${(totalProgress / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Topic Selection */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-cyan-100">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">📚</span> 토픽 선택
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicChange(null)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-cyan-100 text-cyan-700 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>전체 문항</span>
                    <span className="text-sm text-gray-500">50문항</span>
                  </div>
                </button>
                {topics.map((topic) => {
                  const { completed, total } = getTopicProgress(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => handleTopicChange(topic)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedTopic === topic
                          ? 'bg-cyan-100 text-cyan-700 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">{topic}</span>
                        <span className="text-xs text-gray-500">{completed}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-sky-300 rounded-full"
                          style={{ width: `${(completed / total) * 100}%` }}
                        ></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                if (confirm('학습 진행상황을 초기화하시겠습니까?')) {
                  setProgress({});
                  localStorage.removeItem(STORAGE_KEY);
                }
              }}
              className="w-full py-3 text-gray-500 hover:text-gray-700 text-sm transition"
            >
              진행상황 초기화
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title */}
            <div className="bg-gradient-to-r from-cyan-600 to-sky-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📖</span>
                <div>
                  <h1 className="text-2xl font-bold mb-1">회계기초 학습</h1>
                  <p className="text-cyan-100">
                    {selectedTopic ? `${selectedTopic} - ${filteredQuestions.length}문항` : 'FAT 2급 회계기초 전체 50문항'}
                  </p>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm border border-cyan-100 overflow-hidden">
              {/* Question Header */}
              <div className="bg-gradient-to-r from-cyan-50 to-sky-50 px-6 py-4 border-b border-cyan-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                      {currentTopic}
                    </span>
                    <span className="text-gray-500 text-sm">
                      문항 {currentQuestion + 1} / {filteredQuestions.length}
                    </span>
                  </div>
                  {progress[currentQ.id] && (
                    <span className="text-green-500 text-sm font-medium flex items-center gap-1">
                      <span>✓</span> 학습완료
                    </span>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                  Q{currentQ.id}. {currentQ.question}
                </h2>

                {/* Answer Section */}
                {!showAnswer ? (
                  <button
                    onClick={handleShowAnswer}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-sky-600 transition shadow-sm"
                  >
                    정답 보기
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-50 to-sky-50 rounded-xl p-5 border border-cyan-200">
                      <h3 className="font-bold text-cyan-800 mb-2 flex items-center gap-2">
                        <span>💡</span> 정답
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{currentQ.answer}</p>
                    </div>

                    <button
                      onClick={handleAIHelp}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-pink-600 transition flex items-center justify-center gap-2"
                    >
                      <span>🤖</span> AI에게 자세히 질문하기
                    </button>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    ← 이전
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentQuestion === filteredQuestions.length - 1}
                    className="px-5 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    다음 →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-cyan-100">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span className="text-cyan-500">🔢</span> 문항 바로가기
              </h3>
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setShowAnswer(false);
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      currentQuestion === idx
                        ? 'bg-cyan-600 text-white'
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

            {/* Study Tips */}
            <div className="bg-gradient-to-r from-cyan-100 to-sky-100 rounded-xl p-5">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span>📝</span> 학습 팁
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 회계등식(자산=부채+자본)을 항상 기억하세요</li>
                <li>• 재무제표 5가지의 역할을 명확히 구분하세요</li>
                <li>• 자산/부채/자본/수익/비용의 정의를 정확히 암기하세요</li>
                <li>• 모르는 개념은 AI에게 질문해서 완벽히 이해하세요</li>
              </ul>
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
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
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
