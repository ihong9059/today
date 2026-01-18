'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function AccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['financial-basic']);

  useEffect(() => {
    const saved = localStorage.getItem('customs-broker-accounting-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('customs-broker-accounting-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 재무회계기초 (1-12)
    { id: 1, topic: 'financial-basic', question: '회계의 정의와 목적을 설명하시오.', answer: '회계는 경제적 정보를 측정·기록·보고하는 체계로, 의사결정에 유용한 정보를 제공한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 회계의 정의와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계의 정의\n2. 회계의 기능\n3. 재무회계와 관리회계\n4. 회계정보의 이용자\n5. 연습문제 3개' },
    { id: 2, topic: 'financial-basic', question: '재무제표의 종류와 상호관계를 설명하시오.', answer: '재무상태표, 손익계산서, 현금흐름표, 자본변동표, 주석이 있으며 유기적으로 연결된다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 재무제표의 종류와 상호관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무상태표\n2. 손익계산서\n3. 현금흐름표\n4. 상호연결관계\n5. 연습문제 3개' },
    { id: 3, topic: 'financial-basic', question: '회계등식(자산=부채+자본)과 거래의 8요소를 설명하시오.', answer: '자산=부채+자본의 등식이 항상 성립하며, 거래는 8가지 요소로 분류된다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 회계등식(자산=부채+자본)과 거래의 8요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계등식의 의의\n2. 거래의 8요소\n3. 차변과 대변\n4. 분개 방법\n5. 연습문제 3개' },
    { id: 4, topic: 'financial-basic', question: '발생주의와 현금주의를 비교하시오.', answer: '발생주의는 거래 발생 시 인식, 현금주의는 현금 수수 시 인식한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 발생주의와 현금주의를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 발생주의의 의의\n2. 현금주의의 의의\n3. K-IFRS의 채택\n4. 수익·비용 인식 차이\n5. 연습문제 3개' },
    { id: 5, topic: 'financial-basic', question: '회계의 기본가정(계속기업, 회계기간, 화폐단위)을 설명하시오.', answer: '계속기업은 무한 존속, 회계기간은 분할 보고, 화폐단위는 측정수단이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 회계의 기본가정(계속기업, 회계기간, 화폐단위)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계속기업 가정\n2. 회계기간 가정\n3. 화폐단위 가정\n4. 가정의 실무 적용\n5. 연습문제 3개' },
    { id: 6, topic: 'financial-basic', question: '재무제표의 질적 특성을 설명하시오.', answer: '목적적합성, 충실한 표현이 근본적 특성이며, 비교가능성 등이 보강적 특성이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 재무제표의 질적 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근본적 질적 특성\n2. 보강적 질적 특성\n3. 목적적합성\n4. 충실한 표현\n5. 연습문제 3개' },
    { id: 7, topic: 'financial-basic', question: '재무상태표의 구조와 작성원칙을 설명하시오.', answer: '자산, 부채, 자본으로 구성되며, 유동성 배열법에 따라 작성한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 재무상태표의 구조와 작성원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자산의 분류\n2. 부채의 분류\n3. 자본의 구성\n4. 유동성 배열법\n5. 연습문제 3개' },
    { id: 8, topic: 'financial-basic', question: '손익계산서의 구조와 수익·비용 인식을 설명하시오.', answer: '매출액에서 비용을 차감하여 당기순이익을 계산하며, 발생주의로 인식한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 손익계산서의 구조와 수익·비용 인식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손익계산서 구조\n2. 수익인식 원칙\n3. 비용인식 원칙\n4. 포괄손익계산서\n5. 연습문제 3개' },
    { id: 9, topic: 'financial-basic', question: '현금흐름표의 구조와 작성방법을 설명하시오.', answer: '영업, 투자, 재무활동으로 구분하며, 직접법 또는 간접법으로 작성한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 현금흐름표의 구조와 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업활동 현금흐름\n2. 투자활동 현금흐름\n3. 재무활동 현금흐름\n4. 직접법과 간접법\n5. 연습문제 3개' },
    { id: 10, topic: 'financial-basic', question: '분개와 전기의 과정을 설명하시오.', answer: '거래를 분개장에 기록하고, 원장에 전기하여 계정별 잔액을 파악한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 분개와 전기의 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분개의 의의\n2. 분개 방법\n3. 원장 전기\n4. 시산표 작성\n5. 연습문제 3개' },
    { id: 11, topic: 'financial-basic', question: '결산수정분개의 종류를 설명하시오.', answer: '선급비용, 미수수익, 선수수익, 미지급비용 등의 수정분개를 한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 결산수정분개의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이연항목\n2. 발생항목\n3. 감가상각\n4. 대손충당금\n5. 연습문제 3개' },
    { id: 12, topic: 'financial-basic', question: '재고자산의 평가방법(FIFO, 평균법)을 비교하시오.', answer: 'FIFO는 먼저 매입한 것 먼저 판매, 평균법은 가중평균단가를 적용한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 재고자산의 평가방법(FIFO, 평균법)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 선입선출법(FIFO)\n2. 가중평균법\n3. 물가변동 시 영향\n4. 세무상 차이\n5. 연습문제 3개' },

    // 자산회계 (13-25)
    { id: 13, topic: 'asset', question: '유동자산과 비유동자산의 분류기준을 설명하시오.', answer: '1년 이내 현금화 또는 정상영업주기 내 실현 여부로 분류한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 유동자산과 비유동자산의 분류기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동자산의 정의\n2. 비유동자산의 정의\n3. 정상영업주기\n4. 분류 예시\n5. 연습문제 3개' },
    { id: 14, topic: 'asset', question: '현금및현금성자산의 범위를 설명하시오.', answer: '현금, 보통예금, 당좌예금, 취득일로부터 3개월 이내 만기 예금이 포함된다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 현금및현금성자산의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금의 범위\n2. 현금성자산의 요건\n3. 은행예금 분류\n4. 제외 항목\n5. 연습문제 3개' },
    { id: 15, topic: 'asset', question: '매출채권과 대손충당금을 설명하시오.', answer: '매출채권은 외상매출에서 발생하며, 회수불능 예상액을 대손충당금으로 설정한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 매출채권과 대손충당금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출채권의 인식\n2. 대손추정 방법\n3. 대손충당금 설정\n4. 대손발생 처리\n5. 연습문제 3개' },
    { id: 16, topic: 'asset', question: '재고자산의 취득원가와 저가법을 설명하시오.', answer: '취득원가는 매입원가+부대비용이며, 순실현가능가치가 낮으면 평가감한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 재고자산의 취득원가와 저가법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득원가 구성\n2. 순실현가능가치\n3. 저가법 적용\n4. 재고자산감모손실\n5. 연습문제 3개' },
    { id: 17, topic: 'asset', question: '유형자산의 취득원가 결정을 설명하시오.', answer: '구입가격에 취득부대비용을 가산하고, 매입할인은 차감한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 유형자산의 취득원가 결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득원가 구성요소\n2. 부대비용 범위\n3. 차입원가 자본화\n4. 취득방법별 원가\n5. 연습문제 3개' },
    { id: 18, topic: 'asset', question: '감가상각의 방법(정액법, 정률법, 생산량비례법)을 설명하시오.', answer: '정액법은 균등상각, 정률법은 체감상각, 생산량비례법은 이용도 기준이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 감가상각의 방법(정액법, 정률법, 생산량비례법)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정액법\n2. 정률법\n3. 생산량비례법\n4. 내용연수와 잔존가치\n5. 연습문제 3개' },
    { id: 19, topic: 'asset', question: '유형자산의 손상차손과 손상차손환입을 설명하시오.', answer: '장부금액이 회수가능액을 초과하면 손상차손을 인식하고, 회복 시 환입한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 유형자산의 손상차손과 손상차손환입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손상 징후\n2. 회수가능액 측정\n3. 손상차손 인식\n4. 손상차손 환입\n5. 연습문제 3개' },
    { id: 20, topic: 'asset', question: '무형자산의 인식요건과 상각을 설명하시오.', answer: '식별가능성, 통제, 미래경제적효익 요건 충족 시 인식하며, 내용연수에 따라 상각한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 무형자산의 인식요건과 상각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인식요건\n2. 무형자산의 종류\n3. 상각방법\n4. 비한정 내용연수 자산\n5. 연습문제 3개' },
    { id: 21, topic: 'asset', question: '금융자산의 분류(FVPL, FVOCI, AC)를 설명하시오.', answer: '사업모형과 현금흐름 특성에 따라 당기손익, 기타포괄손익, 상각후원가로 분류한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 금융자산의 분류(FVPL, FVOCI, AC)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 당기손익-공정가치(FVPL)\n2. 기타포괄손익-공정가치(FVOCI)\n3. 상각후원가(AC)\n4. 분류 기준\n5. 연습문제 3개' },
    { id: 22, topic: 'asset', question: '유형자산의 처분 회계처리를 설명하시오.', answer: '처분가액과 장부금액의 차이를 처분손익으로 인식한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 유형자산의 처분 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 처분손익 계산\n2. 분개 방법\n3. 중도 처분\n4. 교환 거래\n5. 연습문제 3개' },
    { id: 23, topic: 'asset', question: '투자부동산의 회계처리를 설명하시오.', answer: '임대수익이나 시세차익을 위해 보유하는 부동산으로, 원가 또는 공정가치 모형 적용한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 투자부동산의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투자부동산의 정의\n2. 원가모형\n3. 공정가치모형\n4. 계정 대체\n5. 연습문제 3개' },
    { id: 24, topic: 'asset', question: '수입물품 관련 재고자산 회계처리를 설명하시오.', answer: '수입물품의 취득원가는 CIF가격에 관세, 부대비용을 가산한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 수입물품 관련 재고자산 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수입원가 구성\n2. 관세 처리\n3. 환율 적용\n4. 환차손익\n5. 연습문제 3개' },
    { id: 25, topic: 'asset', question: '리스자산의 회계처리를 설명하시오.', answer: '리스이용자는 사용권자산과 리스부채를 인식하고, 상각과 이자비용을 계상한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 리스자산의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사용권자산 인식\n2. 리스부채 측정\n3. 감가상각\n4. 이자비용\n5. 연습문제 3개' },

    // 부채자본 (26-38)
    { id: 26, topic: 'liability-equity', question: '유동부채와 비유동부채의 분류를 설명하시오.', answer: '1년 이내 상환 또는 정상영업주기 내 결제 여부로 분류한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 유동부채와 비유동부채의 분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동부채 정의\n2. 비유동부채 정의\n3. 재분류\n4. 주요 항목\n5. 연습문제 3개' },
    { id: 27, topic: 'liability-equity', question: '매입채무와 미지급비용을 설명하시오.', answer: '매입채무는 상품구입 대금, 미지급비용은 발생했으나 미지급된 비용이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 매입채무와 미지급비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매입채무 인식\n2. 미지급비용 인식\n3. 분개 방법\n4. 결산 처리\n5. 연습문제 3개' },
    { id: 28, topic: 'liability-equity', question: '충당부채의 인식요건과 측정을 설명하시오.', answer: '현재의무, 자원유출가능성, 신뢰성있는 추정 요건 충족 시 인식한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 충당부채의 인식요건과 측정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인식요건\n2. 최선의 추정치\n3. 현재가치 측정\n4. 사용과 환입\n5. 연습문제 3개' },
    { id: 29, topic: 'liability-equity', question: '사채의 발행과 이자비용 회계처리를 설명하시오.', answer: '사채는 현재가치로 발행하며, 유효이자율법으로 이자비용을 인식한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 사채의 발행과 이자비용 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사채 발행가액\n2. 할인발행과 할증발행\n3. 유효이자율법\n4. 상각표 작성\n5. 연습문제 3개' },
    { id: 30, topic: 'liability-equity', question: '퇴직급여충당부채를 설명하시오.', answer: '종업원 퇴직 시 지급할 금액의 현재가치를 부채로 인식한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 퇴직급여충당부채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확정급여제도\n2. 확정기여제도\n3. 보험수리적 가정\n4. 사외적립자산\n5. 연습문제 3개' },
    { id: 31, topic: 'liability-equity', question: '우발부채와 우발자산을 설명하시오.', answer: '우발부채는 발생가능성에 따라 공시, 우발자산은 거의 확실할 때만 인식한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 우발부채와 우발자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 우발부채 정의\n2. 우발자산 정의\n3. 인식과 공시\n4. 확률별 처리\n5. 연습문제 3개' },
    { id: 32, topic: 'liability-equity', question: '자본금과 자본잉여금을 설명하시오.', answer: '자본금은 발행주식 액면총액, 자본잉여금은 주식발행초과금 등이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 자본금과 자본잉여금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본금의 구성\n2. 주식발행초과금\n3. 기타자본잉여금\n4. 자본변동표\n5. 연습문제 3개' },
    { id: 33, topic: 'liability-equity', question: '이익잉여금과 배당을 설명하시오.', answer: '이익잉여금은 누적순이익이며, 이익준비금 적립 후 배당할 수 있다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 이익잉여금과 배당을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이익잉여금 구성\n2. 이익준비금\n3. 현금배당\n4. 주식배당\n5. 연습문제 3개' },
    { id: 34, topic: 'liability-equity', question: '자기주식의 회계처리를 설명하시오.', answer: '자기주식은 자본의 차감항목으로 표시하며, 처분손익은 자본잉여금에 반영한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 자기주식의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기주식 취득\n2. 자본 차감\n3. 처분 회계처리\n4. 소각\n5. 연습문제 3개' },
    { id: 35, topic: 'liability-equity', question: '증자(유상증자, 무상증자)를 설명하시오.', answer: '유상증자는 자금조달, 무상증자는 잉여금의 자본전입이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 증자(유상증자, 무상증자)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유상증자 절차\n2. 신주발행비용\n3. 무상증자\n4. 주식분할\n5. 연습문제 3개' },
    { id: 36, topic: 'liability-equity', question: '기타포괄손익누계액을 설명하시오.', answer: '당기손익으로 인식하지 않은 자본변동으로, FVOCI평가손익 등이 포함된다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 기타포괄손익누계액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기타포괄손익 항목\n2. 재분류조정\n3. FVOCI 평가손익\n4. 해외사업환산\n5. 연습문제 3개' },
    { id: 37, topic: 'liability-equity', question: '주당이익(EPS)을 계산하시오.', answer: 'EPS = (당기순이익-우선주배당금) / 가중평균유통보통주식수이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 주당이익(EPS)을 계산하시오.\n\n다음 순서로 설명해주세요:\n1. 기본주당이익\n2. 희석주당이익\n3. 가중평균주식수\n4. 계산 예시\n5. 연습문제 3개' },
    { id: 38, topic: 'liability-equity', question: '부채비율과 자기자본비율을 설명하시오.', answer: '부채비율=부채/자본, 자기자본비율=자본/총자산으로 재무안정성을 측정한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 부채비율과 자기자본비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부채비율 계산\n2. 자기자본비율\n3. 재무레버리지\n4. 분석 활용\n5. 연습문제 3개' },

    // 원가회계 (39-50)
    { id: 39, topic: 'cost', question: '원가의 분류(제조원가, 비제조원가)를 설명하시오.', answer: '제조원가는 제품 생산에 직접 관련, 비제조원가는 판매관리비이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 원가의 분류(제조원가, 비제조원가)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조원가 구성\n2. 직접비와 간접비\n3. 판매관리비\n4. 원가흐름\n5. 연습문제 3개' },
    { id: 40, topic: 'cost', question: '원가의 3요소(재료비, 노무비, 경비)를 설명하시오.', answer: '재료비는 원재료, 노무비는 인건비, 경비는 기타 제조비용이다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 원가의 3요소(재료비, 노무비, 경비)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접재료비\n2. 직접노무비\n3. 제조간접비\n4. 원가 집계\n5. 연습문제 3개' },
    { id: 41, topic: 'cost', question: '제조원가명세서의 구조를 설명하시오.', answer: '당기총제조비용에서 기초·기말 재공품을 조정하여 당기제품제조원가를 계산한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 제조원가명세서의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 당기총제조비용\n2. 재공품 조정\n3. 당기제품제조원가\n4. 매출원가와의 관계\n5. 연습문제 3개' },
    { id: 42, topic: 'cost', question: '개별원가계산과 종합원가계산을 비교하시오.', answer: '개별원가는 주문별, 종합원가는 기간별로 원가를 집계한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 개별원가계산과 종합원가계산을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 개별원가계산\n2. 종합원가계산\n3. 적용 업종\n4. 원가 집계 방법\n5. 연습문제 3개' },
    { id: 43, topic: 'cost', question: '제조간접비 배부 방법을 설명하시오.', answer: '배부기준(직접노무시간, 기계시간 등)에 따라 제품에 배부한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 제조간접비 배부 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배부기준 선택\n2. 예정배부율\n3. 실제배부\n4. 배부차이 처리\n5. 연습문제 3개' },
    { id: 44, topic: 'cost', question: '손익분기점(BEP) 분석을 설명하시오.', answer: 'BEP는 총수익=총비용인 판매량으로, 고정비/(판매단가-변동비)로 계산한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 손익분기점(BEP) 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BEP 의의\n2. 공헌이익\n3. BEP 계산\n4. 목표이익 분석\n5. 연습문제 3개' },
    { id: 45, topic: 'cost', question: '변동비와 고정비를 구분하시오.', answer: '변동비는 조업도에 비례, 고정비는 조업도에 관계없이 일정하다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 변동비와 고정비를 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 변동비 정의\n2. 고정비 정의\n3. 준변동비·준고정비\n4. 원가행태 분석\n5. 연습문제 3개' },
    { id: 46, topic: 'cost', question: '표준원가와 실제원가의 차이분석을 설명하시오.', answer: '표준원가와 실제원가의 차이를 가격차이, 능률차이로 분석한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 표준원가와 실제원가의 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준원가 설정\n2. 재료비 차이\n3. 노무비 차이\n4. 간접비 차이\n5. 연습문제 3개' },
    { id: 47, topic: 'cost', question: '활동기준원가계산(ABC)을 설명하시오.', answer: '원가동인별로 간접비를 배부하여 제품원가의 정확성을 높인다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 활동기준원가계산(ABC)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ABC의 의의\n2. 원가동인\n3. 활동 분석\n4. 전통적 방법과 비교\n5. 연습문제 3개' },
    { id: 48, topic: 'cost', question: '수입원가 계산 종합문제를 풀이하시오.', answer: '수입물품의 총원가는 CIF+관세+제세금+부대비용으로 계산한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 다음 수입물품의 단위원가를 계산하시오.\n[자료] CIF: $50,000, 수량 1,000개, 환율 1,300원, 관세율 10%, 부가세율 10%, 통관비용 500,000원\n\n다음 순서로 풀이해주세요:\n1. CIF 원화환산\n2. 관세 계산\n3. 부가가치세 계산\n4. 총원가와 단위원가\n5. 분개' },
    { id: 49, topic: 'cost', question: '재무비율 분석(수익성, 안정성, 활동성)을 설명하시오.', answer: 'ROE, 부채비율, 재고자산회전율 등으로 기업 성과를 분석한다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 재무비율 분석(수익성, 안정성, 활동성)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수익성 비율\n2. 안정성 비율\n3. 활동성 비율\n4. 비율 분석 활용\n5. 연습문제 3개' },
    { id: 50, topic: 'cost', question: '무역회계(수출입 회계처리)의 특징을 설명하시오.', answer: '외화거래, 환율적용, 환차손익 등 무역거래 특유의 회계처리가 있다.', prompt: '관세사 회계학 문제입니다.\n\n문제: 무역회계(수출입 회계처리)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외화거래 인식\n2. 환율 적용\n3. 환차손익\n4. 수출입 분개\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'financial-basic', name: '재무회계기초', count: 12 },
    { id: 'asset', name: '자산회계', count: 13 },
    { id: 'liability-equity', name: '부채자본', count: 13 },
    { id: 'cost', name: '원가회계', count: 12 },
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
            <span className="text-sky-600 font-medium">회계학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 회계학</h1>
          <p className="text-gray-600">관세사 1차 시험 | 40문항 | 60분</p>
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
          <Link href="/category/accounting/customs-broker/study/consumption-tax" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 내국소비세법</Link>
          <Link href="/category/accounting/customs-broker/study/customs-advanced" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">다음: 관세법 심화 →</Link>
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
