'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function FinancialAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['financial-statements']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-1-financial-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-1-financial-accounting-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 재무제표작성 (1-10)
    { id: 1, topic: 'financial-statements', question: '재무제표의 종류와 각각의 목적을 설명하시오.', answer: '재무상태표, 손익계산서, 현금흐름표, 자본변동표, 주석', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 재무제표의 종류와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무제표의 정의\n2. 재무상태표의 목적\n3. 손익계산서의 목적\n4. 현금흐름표와 자본변동표\n5. 연습문제 3개' },
    { id: 2, topic: 'financial-statements', question: '재무상태표의 구성요소와 작성원리를 설명하시오.', answer: '자산=부채+자본, 유동/비유동 분류', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 재무상태표 작성원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무상태표 등식\n2. 유동/비유동 분류기준\n3. 자산 배열순서\n4. 부채와 자본 구성\n5. 연습문제 3개' },
    { id: 3, topic: 'financial-statements', question: '손익계산서의 작성방법(보고식/계정식)을 설명하시오.', answer: '보고식: 수직형태, 계정식: T계정형태', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 손익계산서 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보고식 손익계산서\n2. 계정식 손익계산서\n3. 매출총이익 계산\n4. 영업이익과 당기순이익\n5. 연습문제 3개' },
    { id: 4, topic: 'financial-statements', question: '결산정리분개의 종류와 목적을 설명하시오.', answer: '수익비용 귀속, 자산부채 평가, 미수미지급 인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 결산정리분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산정리의 필요성\n2. 감가상각비 계상\n3. 미수수익/미지급비용\n4. 선급비용/선수수익\n5. 연습문제 3개' },
    { id: 5, topic: 'financial-statements', question: '현금흐름표의 작성방법(직접법/간접법)을 설명하시오.', answer: '직접법: 현금수입지출, 간접법: 당기순이익 조정', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 현금흐름표 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업활동 현금흐름\n2. 직접법 작성\n3. 간접법 작성\n4. 투자/재무활동\n5. 연습문제 3개' },
    { id: 6, topic: 'financial-statements', question: '자본변동표의 구성요소와 작성방법을 설명하시오.', answer: '자본금, 자본잉여금, 이익잉여금, 기타포괄손익누계', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 자본변동표 작성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본변동표의 목적\n2. 구성항목\n3. 변동사유별 표시\n4. 작성 사례\n5. 연습문제 3개' },
    { id: 7, topic: 'financial-statements', question: '계정과목 분류와 재무제표 표시를 설명하시오.', answer: '자산5분류, 부채2분류, 자본3분류, 수익/비용', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 계정과목 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자산의 분류\n2. 부채의 분류\n3. 자본의 분류\n4. 수익과 비용 구분\n5. 연습문제 3개' },
    { id: 8, topic: 'financial-statements', question: '결산절차와 장부마감 과정을 설명하시오.', answer: '시산표작성→결산정리→수정후시산표→마감분개', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 결산절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산의 의의\n2. 시산표 작성\n3. 결산정리사항\n4. 장부마감 분개\n5. 연습문제 3개' },
    { id: 9, topic: 'financial-statements', question: '재무제표 주석 공시사항을 설명하시오.', answer: '회계정책, 주요 추정, 후속사건 등 공시', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 재무제표 주석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주석의 목적\n2. 필수 공시사항\n3. 회계정책 공시\n4. 우발부채 공시\n5. 연습문제 3개' },
    { id: 10, topic: 'financial-statements', question: '재무제표 작성시 일반원칙(계속기업, 발생기준 등)을 설명하시오.', answer: '계속기업 가정, 발생기준, 일관성, 비교가능성', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 재무제표 작성 일반원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계속기업 가정\n2. 발생기준 회계\n3. 일관성의 원칙\n4. 비교가능성\n5. 연습문제 3개' },

    // 유형자산 (11-20)
    { id: 11, topic: 'tangible-assets', question: '유형자산의 인식조건과 취득원가를 설명하시오.', answer: '미래경제적효익 확실, 원가 신뢰성 측정 가능', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 유형자산 인식과 취득원가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인식조건 2가지\n2. 취득원가 구성요소\n3. 부대비용 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 12, topic: 'tangible-assets', question: '감가상각방법(정액법/정률법/생산량비례법)을 설명하시오.', answer: '정액법: 균등배분, 정률법: 체감상각, 생산량비례법: 사용량 기준', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 감가상각방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정액법 계산\n2. 정률법 계산\n3. 생산량비례법\n4. 방법 선택 기준\n5. 연습문제 3개' },
    { id: 13, topic: 'tangible-assets', question: '유형자산의 후속지출(자본적지출/수익적지출)을 설명하시오.', answer: '자본적: 자산화, 수익적: 당기비용', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 유형자산 후속지출을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본적지출 조건\n2. 수익적지출 조건\n3. 판단 기준\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 14, topic: 'tangible-assets', question: '유형자산 재평가모형을 설명하시오.', answer: '공정가치로 재측정, 재평가잉여금 인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 유형자산 재평가모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재평가모형 적용조건\n2. 재평가증가 처리\n3. 재평가감소 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 15, topic: 'tangible-assets', question: '유형자산 손상차손과 손상차손환입을 설명하시오.', answer: '회수가능액 < 장부금액 시 손상인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 유형자산 손상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손상징후 판단\n2. 회수가능액 결정\n3. 손상차손 인식\n4. 손상차손환입\n5. 연습문제 3개' },
    { id: 16, topic: 'tangible-assets', question: '유형자산 처분손익의 계산과 회계처리를 설명하시오.', answer: '처분손익 = 처분금액 - 장부금액', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 유형자산 처분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 처분손익 계산\n2. 처분이익 분개\n3. 처분손실 분개\n4. 중간 감가상각\n5. 연습문제 3개' },
    { id: 17, topic: 'tangible-assets', question: '건설중인자산의 회계처리와 자본화이자를 설명하시오.', answer: '건설기간 이자비용 자본화 가능', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 건설중인자산과 자본화이자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 건설중인자산 인식\n2. 자본화이자 조건\n3. 자본화 금액 계산\n4. 완공시 대체\n5. 연습문제 3개' },
    { id: 18, topic: 'tangible-assets', question: '정부보조금 수령시 유형자산 회계처리를 설명하시오.', answer: '자산차감 표시 또는 이연수익 처리', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 정부보조금 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정부보조금 유형\n2. 자산차감 방식\n3. 이연수익 방식\n4. 상각방법\n5. 연습문제 3개' },
    { id: 19, topic: 'tangible-assets', question: '유형자산 교환거래의 회계처리를 설명하시오.', answer: '상업적 실질 있으면 공정가치, 없으면 장부금액', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 유형자산 교환을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상업적 실질 판단\n2. 공정가치 측정\n3. 교환손익 인식\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 20, topic: 'tangible-assets', question: '투자부동산의 정의와 회계처리를 설명하시오.', answer: '임대수익/시세차익 목적, 원가모형/공정가치모형', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 투자부동산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투자부동산 정의\n2. 원가모형 처리\n3. 공정가치모형 처리\n4. 계정 대체\n5. 연습문제 3개' },

    // 금융자산 (21-30)
    { id: 21, topic: 'financial-assets', question: '금융자산의 분류기준(FVPL, FVOCI, AC)을 설명하시오.', answer: '사업모형과 계약현금흐름특성(SPPI)에 따라 분류', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 금융자산 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 기준\n2. FVPL 금융자산\n3. FVOCI 금융자산\n4. AC(상각후원가) 금융자산\n5. 연습문제 3개' },
    { id: 22, topic: 'financial-assets', question: '현금및현금성자산의 범위와 회계처리를 설명하시오.', answer: '현금, 요구불예금, 3개월 내 만기 단기투자', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 현금및현금성자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금의 범위\n2. 현금성자산 조건\n3. 현금과부족 처리\n4. 소액현금제도\n5. 연습문제 3개' },
    { id: 23, topic: 'financial-assets', question: '매출채권과 대손충당금의 회계처리를 설명하시오.', answer: '대손추산액 설정, 대손발생시 상계', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 매출채권과 대손충당금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출채권 인식\n2. 대손추산방법\n3. 대손충당금 설정\n4. 대손발생 처리\n5. 연습문제 3개' },
    { id: 24, topic: 'financial-assets', question: '받을어음의 할인과 배서양도를 설명하시오.', answer: '할인시 매출채권처분손실, 조건부 우발부채 인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 받을어음 할인과 배서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 받을어음 할인\n2. 할인료 계산\n3. 배서양도\n4. 우발부채 인식\n5. 연습문제 3개' },
    { id: 25, topic: 'financial-assets', question: '단기투자자산(FVPL 금융자산)의 회계처리를 설명하시오.', answer: '공정가치 평가, 평가손익 당기손익', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 단기투자자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득시 분개\n2. 결산시 평가\n3. 평가손익 처리\n4. 처분시 분개\n5. 연습문제 3개' },
    { id: 26, topic: 'financial-assets', question: '만기보유금융자산(AC 금융자산)의 회계처리를 설명하시오.', answer: '유효이자율법 상각, 손상차손 인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 만기보유금융자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득시 분개\n2. 유효이자율법\n3. 할인/할증 상각\n4. 손상차손\n5. 연습문제 3개' },
    { id: 27, topic: 'financial-assets', question: '매도가능금융자산(FVOCI 금융자산)의 회계처리를 설명하시오.', answer: '공정가치 평가, 평가손익 기타포괄손익', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 매도가능금융자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득시 분개\n2. 결산시 평가\n3. OCI 처리\n4. 처분시 재분류\n5. 연습문제 3개' },
    { id: 28, topic: 'financial-assets', question: '지분법적용투자주식의 회계처리를 설명하시오.', answer: '유의적영향력, 지분법손익 인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 지분법적용투자주식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지분법 적용요건\n2. 취득시 처리\n3. 지분법손익 인식\n4. 배당금 수령\n5. 연습문제 3개' },
    { id: 29, topic: 'financial-assets', question: '선급금과 선급비용의 구분과 회계처리를 설명하시오.', answer: '선급금: 재화용역 대가, 선급비용: 기간경과 비용', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 선급금과 선급비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선급금 정의\n2. 선급비용 정의\n3. 결산시 조정\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 30, topic: 'financial-assets', question: '미수금과 미수수익의 구분과 회계처리를 설명하시오.', answer: '미수금: 영업외, 미수수익: 발생주의 수익', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 미수금과 미수수익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미수금 정의\n2. 미수수익 정의\n3. 결산시 인식\n4. 분개 예시\n5. 연습문제 3개' },

    // 충당부채 (31-40)
    { id: 31, topic: 'provisions', question: '충당부채의 인식요건 3가지를 설명하시오.', answer: '현재의무, 자원유출 가능성, 금액 신뢰성', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 충당부채 인식요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과거사건의 현재의무\n2. 자원유출 가능성\n3. 금액의 신뢰성\n4. 우발부채와 구분\n5. 연습문제 3개' },
    { id: 32, topic: 'provisions', question: '퇴직급여충당부채(확정급여형)의 회계처리를 설명하시오.', answer: '퇴직급여충당부채 설정, 퇴직급여 비용인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 퇴직급여충당부채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확정급여형 정의\n2. 충당부채 설정\n3. 퇴직급여 계상\n4. 퇴직시 처리\n5. 연습문제 3개' },
    { id: 33, topic: 'provisions', question: '판매보증충당부채의 회계처리를 설명하시오.', answer: '예상 보증비용을 충당부채로 설정', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 판매보증충당부채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인식 시점\n2. 추정 방법\n3. 충당부채 설정\n4. 보증비 발생시\n5. 연습문제 3개' },
    { id: 34, topic: 'provisions', question: '손실충당부채(손해배상, 소송 등)의 회계처리를 설명하시오.', answer: '손해배상 가능성 높으면 충당부채 인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 손실충당부채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손해배상충당부채\n2. 소송충당부채\n3. 인식 vs 공시\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 35, topic: 'provisions', question: '우발부채와 우발자산의 회계처리를 설명하시오.', answer: '우발부채: 주석공시, 우발자산: 거의확실시만 인식', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 우발부채와 우발자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 우발부채 정의\n2. 우발자산 정의\n3. 인식 기준\n4. 주석 공시\n5. 연습문제 3개' },
    { id: 36, topic: 'provisions', question: '사채와 사채할인(할증)발행차금의 회계처리를 설명하시오.', answer: '유효이자율법 상각, 이자비용 조정', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 사채발행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사채 발행분개\n2. 할인발행차금\n3. 할증발행차금\n4. 유효이자율법\n5. 연습문제 3개' },
    { id: 37, topic: 'provisions', question: '미지급금과 미지급비용의 구분과 회계처리를 설명하시오.', answer: '미지급금: 확정채무, 미지급비용: 발생주의', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 미지급금과 미지급비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미지급금 정의\n2. 미지급비용 정의\n3. 결산시 인식\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 38, topic: 'provisions', question: '선수금과 선수수익의 구분과 회계처리를 설명하시오.', answer: '선수금: 재화용역 대가, 선수수익: 미경과 수익', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 선수금과 선수수익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선수금 정의\n2. 선수수익 정의\n3. 결산시 조정\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 39, topic: 'provisions', question: '충당부채의 변동(추가설정, 환입)을 설명하시오.', answer: '추정치 변경시 충당부채 조정', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 충당부채 변동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 추가설정 사유\n2. 환입 사유\n3. 회계처리 방법\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 40, topic: 'provisions', question: '장기부채의 유동성 대체를 설명하시오.', answer: '1년 이내 만기 도래시 유동부채로 대체', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 유동성대체를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동성대체 정의\n2. 대체 시점\n3. 장기차입금 대체\n4. 분개 예시\n5. 연습문제 3개' },

    // 자본변동 (41-50)
    { id: 41, topic: 'equity-changes', question: '자본의 구성요소(자본금, 자본잉여금, 이익잉여금)를 설명하시오.', answer: '자본금: 발행주식 액면, 자본잉여금: 주식관련 초과액', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 자본 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본금\n2. 자본잉여금\n3. 이익잉여금\n4. 기타자본항목\n5. 연습문제 3개' },
    { id: 42, topic: 'equity-changes', question: '주식발행(액면발행, 할증발행, 할인발행)의 회계처리를 설명하시오.', answer: '할증: 주식발행초과금, 할인: 주식할인발행차금', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 주식발행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 액면발행\n2. 할증발행\n3. 할인발행\n4. 현물출자\n5. 연습문제 3개' },
    { id: 43, topic: 'equity-changes', question: '자기주식 취득과 처분의 회계처리를 설명하시오.', answer: '자기주식은 자본차감, 처분손익은 자본조정', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 자기주식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득시 분개\n2. 자본차감 표시\n3. 처분이익\n4. 처분손실\n5. 연습문제 3개' },
    { id: 44, topic: 'equity-changes', question: '배당금(현금배당, 주식배당)의 회계처리를 설명하시오.', answer: '현금배당: 미지급배당금, 주식배당: 자본금 증가', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 배당금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배당결의시\n2. 현금배당 지급\n3. 주식배당\n4. 중간배당\n5. 연습문제 3개' },
    { id: 45, topic: 'equity-changes', question: '유상증자와 무상증자의 회계처리를 설명하시오.', answer: '유상증자: 자본유입, 무상증자: 자본내 계정간 대체', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 유상증자와 무상증자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유상증자 분개\n2. 무상증자 분개\n3. 재원별 처리\n4. 주주 영향\n5. 연습문제 3개' },
    { id: 46, topic: 'equity-changes', question: '감자(유상감자, 무상감자)의 회계처리를 설명하시오.', answer: '유상감자: 주주환급, 무상감자: 결손보전', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 감자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유상감자 분개\n2. 무상감자 분개\n3. 감자차익/차손\n4. 결손보전\n5. 연습문제 3개' },
    { id: 47, topic: 'equity-changes', question: '이익준비금과 임의적립금의 적립과 사용을 설명하시오.', answer: '이익준비금: 법정적립, 임의적립금: 회사재량', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 이익준비금과 임의적립금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이익준비금 적립\n2. 임의적립금 적립\n3. 적립금 사용\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 48, topic: 'equity-changes', question: '기타포괄손익누계액의 종류와 회계처리를 설명하시오.', answer: 'FVOCI평가손익, 재평가잉여금, 해외사업환산차이', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 기타포괄손익누계액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. OCI의 종류\n2. FVOCI 평가손익\n3. 재평가잉여금\n4. 당기손익 재분류\n5. 연습문제 3개' },
    { id: 49, topic: 'equity-changes', question: '주식분할과 주식병합의 효과를 설명하시오.', answer: '주식분할: 주식수 증가, 주식병합: 주식수 감소', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 주식분할과 주식병합을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주식분할 효과\n2. 주식병합 효과\n3. 자본금 변동여부\n4. 주당순자산 변동\n5. 연습문제 3개' },
    { id: 50, topic: 'equity-changes', question: '결손금 처리와 이익잉여금처분계산서를 설명하시오.', answer: '이익잉여금처분: 배당, 적립, 이월', prompt: '전산세무 1급 재무회계 문제입니다.\n\n문제: 결손금 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결손금 보전순서\n2. 이익잉여금처분계산서\n3. 처분확정일\n4. 분개 예시\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'financial-statements', name: '재무제표작성', icon: '📊', count: 10 },
    { id: 'tangible-assets', name: '유형자산', icon: '🏭', count: 10 },
    { id: 'financial-assets', name: '금융자산', icon: '💳', count: 10 },
    { id: 'provisions', name: '충당부채', icon: '📋', count: 10 },
    { id: 'equity-changes', name: '자본변동', icon: '📈', count: 10 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-tax-1" className="text-gray-500 hover:text-gray-700">전산세무 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500">학습</span>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">재무회계</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-rose-600 to-red-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📊</div>
            <div>
              <h1 className="text-2xl font-bold">재무회계</h1>
              <p className="text-rose-100">전산세무 1급 필기 | 10문항 출제</p>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-rose-100 border-2 border-rose-300'
                    : 'bg-white border border-gray-200 hover:border-rose-200'
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
                              ? 'bg-rose-500 border-rose-500 text-white'
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
                              className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-sm hover:bg-rose-200 transition flex-shrink-0"
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
          <Link href="/category/accounting/computerized-tax-1" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 전산세무 1급 홈
          </Link>
          <Link href="/category/accounting/computerized-tax-1/study/cost-accounting" className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600">
            원가회계 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 전산세무 1급 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
