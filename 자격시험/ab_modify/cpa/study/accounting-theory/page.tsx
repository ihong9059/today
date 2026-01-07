'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AccountingTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['basic']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cpa-accounting-theory-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('cpa-accounting-theory-completed', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 재무회계 기초 (1-13)
    { id: 1, topic: 'basic', question: '재무보고의 목적과 개념체계를 설명하시오.', answer: '의사결정에 유용한 재무정보 제공, 질적특성', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 재무보고 개념체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무보고 목적\n2. 질적특성(근본적/보강적)\n3. 재무제표 요소\n4. 인식과 측정\n5. 연습문제 3개' },
    { id: 2, topic: 'basic', question: '재무제표의 종류와 상호관계를 설명하시오.', answer: '재무상태표, 포괄손익계산서, 현금흐름표, 자본변동표, 주석', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 재무제표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5가지 재무제표\n2. 각 재무제표의 역할\n3. 상호관계\n4. 작성 기준일\n5. 연습문제 3개' },
    { id: 3, topic: 'basic', question: '회계순환과정을 설명하시오.', answer: '거래분석→분개→전기→시산표→수정→재무제표→마감', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 회계순환과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분개와 전기\n2. 시산표 작성\n3. 수정분개\n4. 마감분개\n5. 연습문제 3개' },
    { id: 4, topic: 'basic', question: '현금및현금성자산의 범위를 설명하시오.', answer: '통화, 요구불예금, 취득일로부터 만기 3개월 이내 금융상품', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 현금및현금성자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금의 범위\n2. 현금성자산 요건\n3. 은행계정조정표\n4. 소액현금\n5. 연습문제 3개' },
    { id: 5, topic: 'basic', question: '재고자산의 단가결정방법을 비교 설명하시오.', answer: '개별법, 선입선출법, 가중평균법', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 재고자산 단가결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개별법\n2. 선입선출법\n3. 가중평균법\n4. 방법별 효과 비교\n5. 연습문제 3개' },
    { id: 6, topic: 'basic', question: '재고자산의 저가법 평가를 설명하시오.', answer: '원가와 순실현가능가치 중 낮은 금액', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 재고자산 저가법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 순실현가능가치\n2. 저가법 적용\n3. 평가손실 회계처리\n4. 환입\n5. 연습문제 3개' },
    { id: 7, topic: 'basic', question: '유형자산의 취득원가와 감가상각을 설명하시오.', answer: '매입원가+부대비용, 정액법/정률법/생산량비례법', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 유형자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득원가 구성\n2. 자본적지출 vs 수익적지출\n3. 감가상각 방법\n4. 내용연수 변경\n5. 연습문제 3개' },
    { id: 8, topic: 'basic', question: '무형자산의 인식과 상각을 설명하시오.', answer: '식별가능성, 통제, 미래경제적효익 / 내용연수 상각', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 무형자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무형자산 인식요건\n2. 내부창출 무형자산\n3. 상각과 손상\n4. 비한정내용연수\n5. 연습문제 3개' },
    { id: 9, topic: 'basic', question: '충당부채와 우발부채를 비교 설명하시오.', answer: '충당부채: 인식, 우발부채: 주석공시', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 충당부채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충당부채 인식요건\n2. 측정(최선의 추정치)\n3. 우발부채\n4. 우발자산\n5. 연습문제 3개' },
    { id: 10, topic: 'basic', question: '현금흐름표의 작성방법을 설명하시오.', answer: '직접법, 간접법 / 영업, 투자, 재무활동', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 현금흐름표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 3가지 활동 분류\n2. 직접법\n3. 간접법\n4. 활동별 항목\n5. 연습문제 3개' },
    { id: 11, topic: 'basic', question: '자본의 분류와 구성요소를 설명하시오.', answer: '자본금, 자본잉여금, 이익잉여금, 기타포괄손익누계액', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 자본을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본 구성요소\n2. 자본잉여금\n3. 이익잉여금\n4. 자기주식\n5. 연습문제 3개' },
    { id: 12, topic: 'basic', question: '사채의 발행과 회계처리를 설명하시오.', answer: '액면발행, 할인발행, 할증발행 / 유효이자율법', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 사채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사채 발행\n2. 할인/할증 상각\n3. 유효이자율법\n4. 조기상환\n5. 연습문제 3개' },
    { id: 13, topic: 'basic', question: '오류수정과 회계정책변경을 설명하시오.', answer: '소급적용, 전진적용, 비교표시 재작성', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 오류수정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오류의 유형\n2. 소급재작성법\n3. 회계정책변경\n4. 회계추정변경\n5. 연습문제 3개' },

    // 재무회계 심화 (14-25)
    { id: 14, topic: 'advanced', question: '금융상품의 분류와 측정을 설명하시오.', answer: 'FVPL, FVOCI, AC / 사업모형, 계약현금흐름특성', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 금융상품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 기준\n2. 각 분류별 측정\n3. 재분류\n4. 손상\n5. 연습문제 3개' },
    { id: 15, topic: 'advanced', question: '수익인식의 5단계 모형을 설명하시오.', answer: '계약식별→이행의무→거래가격→배분→수익인식', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 수익인식 5단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계약 식별\n2. 이행의무 식별\n3. 거래가격 산정\n4. 배분과 인식\n5. 연습문제 3개' },
    { id: 16, topic: 'advanced', question: '리스회계(IFRS 16)를 설명하시오.', answer: '리스이용자: 사용권자산과 리스부채 인식', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 리스회계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리스의 식별\n2. 리스이용자 회계\n3. 리스제공자 회계\n4. 판매후리스\n5. 연습문제 3개' },
    { id: 17, topic: 'advanced', question: '종업원급여의 회계처리를 설명하시오.', answer: '단기급여, 퇴직급여(확정기여/확정급여)', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 종업원급여를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단기종업원급여\n2. 확정기여제도\n3. 확정급여제도\n4. 재측정요소\n5. 연습문제 3개' },
    { id: 18, topic: 'advanced', question: '법인세회계를 설명하시오.', answer: '이연법인세자산/부채, 일시적차이', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 법인세회계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일시적차이\n2. 이연법인세 인식\n3. 세율변경 효과\n4. 자산인식 제한\n5. 연습문제 3개' },
    { id: 19, topic: 'advanced', question: '주당이익의 계산을 설명하시오.', answer: '기본주당이익, 희석주당이익', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 주당이익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본주당이익 계산\n2. 가중평균보통주식수\n3. 희석주당이익\n4. 반희석효과\n5. 연습문제 3개' },
    { id: 20, topic: 'advanced', question: '외화환산회계를 설명하시오.', answer: '기능통화, 표시통화, 환율차이', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 외화환산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기능통화 결정\n2. 외화거래 환산\n3. 해외사업장 환산\n4. 환산차이 처리\n5. 연습문제 3개' },
    { id: 21, topic: 'advanced', question: '사업결합(IFRS 3)을 설명하시오.', answer: '취득법, 영업권, 식별가능순자산', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 사업결합을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득법 적용\n2. 이전대가\n3. 영업권 계산\n4. 염가매수차익\n5. 연습문제 3개' },
    { id: 22, topic: 'advanced', question: '연결재무제표 작성을 설명하시오.', answer: '지배력 판단, 연결조정분개', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 연결재무제표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지배력 판단\n2. 연결범위\n3. 연결조정분개\n4. 비지배지분\n5. 연습문제 3개' },
    { id: 23, topic: 'advanced', question: '관계기업과 지분법을 설명하시오.', answer: '유의적영향력, 지분법 적용', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 지분법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유의적영향력\n2. 지분법손익\n3. 내부거래\n4. 손상\n5. 연습문제 3개' },
    { id: 24, topic: 'advanced', question: '파생상품과 위험회피회계를 설명하시오.', answer: '선물, 옵션, 스왑 / 공정가치위험회피, 현금흐름위험회피', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 파생상품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파생상품 정의\n2. 공정가치 측정\n3. 위험회피회계\n4. 효과성 평가\n5. 연습문제 3개' },
    { id: 25, topic: 'advanced', question: '공정가치 측정(IFRS 13)을 설명하시오.', answer: '시장참여자 관점, 3수준 서열체계', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 공정가치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공정가치 정의\n2. 평가기법\n3. 공정가치 서열\n4. 공시 요구사항\n5. 연습문제 3개' },

    // 원가관리회계 (26-38)
    { id: 26, topic: 'cost', question: '원가의 분류와 흐름을 설명하시오.', answer: '직접재료비, 직접노무비, 제조간접비', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 원가분류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원가의 3요소\n2. 제조원가 흐름\n3. 기간비용\n4. 제조원가명세서\n5. 연습문제 3개' },
    { id: 27, topic: 'cost', question: '개별원가계산과 종합원가계산을 비교 설명하시오.', answer: '개별: 작업별 집계, 종합: 공정별 집계', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 원가계산 방법을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 개별원가계산\n2. 종합원가계산\n3. 완성품환산량\n4. 선입선출법 vs 평균법\n5. 연습문제 3개' },
    { id: 28, topic: 'cost', question: 'CVP 분석을 설명하시오.', answer: '공헌이익, 손익분기점, 목표이익', prompt: '공인회계사 회계학 문제입니다.\n\n문제: CVP분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공헌이익 개념\n2. 손익분기점 계산\n3. 목표이익 분석\n4. 안전한계율\n5. 연습문제 3개' },
    { id: 29, topic: 'cost', question: '표준원가계산과 차이분석을 설명하시오.', answer: '재료, 노무, 제조간접비 차이 분석', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 표준원가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준원가 설정\n2. 재료비차이\n3. 노무비차이\n4. 제조간접비차이\n5. 연습문제 3개' },
    { id: 30, topic: 'cost', question: '활동기준원가계산(ABC)을 설명하시오.', answer: '활동 식별, 원가동인, 원가배부', prompt: '공인회계사 회계학 문제입니다.\n\n문제: ABC를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전통적 방법 한계\n2. ABC 절차\n3. 원가동인 선정\n4. 장단점\n5. 연습문제 3개' },
    { id: 31, topic: 'cost', question: '대체가격(이전가격)을 설명하시오.', answer: '시장가격, 협상가격, 원가기준', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 대체가격을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대체가격 목적\n2. 시장기준 가격\n3. 원가기준 가격\n4. 협상가격\n5. 연습문제 3개' },
    { id: 32, topic: 'cost', question: '관련원가와 의사결정을 설명하시오.', answer: '차액원가, 기회원가, 매몰원가', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 관련원가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련원가 개념\n2. 특별주문 의사결정\n3. 자가제조 vs 외주\n4. 제약조건 하 의사결정\n5. 연습문제 3개' },
    { id: 33, topic: 'cost', question: '성과평가와 책임회계를 설명하시오.', answer: 'ROI, RI(잔여이익), EVA', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 성과평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 책임회계 개념\n2. ROI\n3. 잔여이익\n4. EVA\n5. 연습문제 3개' },
    { id: 34, topic: 'cost', question: '균형성과표(BSC)를 설명하시오.', answer: '재무, 고객, 내부프로세스, 학습성장 관점', prompt: '공인회계사 회계학 문제입니다.\n\n문제: BSC를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 4가지 관점\n2. 전략지도\n3. 핵심성과지표\n4. 구축 절차\n5. 연습문제 3개' },
    { id: 35, topic: 'cost', question: '예산편성과 통제를 설명하시오.', answer: '종합예산, 탄력예산, 예산차이분석', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 예산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예산 기능\n2. 종합예산 체계\n3. 탄력예산\n4. 예산차이분석\n5. 연습문제 3개' },
    { id: 36, topic: 'cost', question: '품질원가를 설명하시오.', answer: '예방원가, 평가원가, 실패원가', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 품질원가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 품질원가 분류\n2. 예방원가\n3. 평가원가\n4. 실패원가\n5. 연습문제 3개' },
    { id: 37, topic: 'cost', question: '목표원가계산을 설명하시오.', answer: '목표가격 - 목표이익 = 목표원가', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 목표원가계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 목표원가 개념\n2. 산정절차\n3. 가치공학\n4. 원가기획\n5. 연습문제 3개' },
    { id: 38, topic: 'cost', question: '수명주기원가계산을 설명하시오.', answer: '개발~폐기까지 전체 원가 관리', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 수명주기원가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수명주기 단계\n2. 원가 발생 패턴\n3. 원가절감 기회\n4. 의사결정 활용\n5. 연습문제 3개' },

    // 회계감사 (39-50)
    { id: 39, topic: 'audit', question: '감사의 의의와 목적을 설명하시오.', answer: '재무제표 신뢰성에 대한 합리적 확신', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 감사의 의의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감사의 정의\n2. 감사의 목적\n3. 감사의 한계\n4. 감사기준\n5. 연습문제 3개' },
    { id: 40, topic: 'audit', question: '감사위험모형을 설명하시오.', answer: 'AR = IR × CR × DR', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 감사위험모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감사위험 정의\n2. 고유위험\n3. 통제위험\n4. 적발위험\n5. 연습문제 3개' },
    { id: 41, topic: 'audit', question: '중요성의 개념과 적용을 설명하시오.', answer: '재무제표 이용자 의사결정에 영향을 미치는 정도', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중요성 정의\n2. 중요성 결정\n3. 수행중요성\n4. 명백한 경미금액\n5. 연습문제 3개' },
    { id: 42, topic: 'audit', question: '내부통제의 이해와 평가를 설명하시오.', answer: 'COSO 프레임워크, 5가지 구성요소', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 내부통제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내부통제 정의\n2. 5가지 구성요소\n3. 통제테스트\n4. 통제위험 평가\n5. 연습문제 3개' },
    { id: 43, topic: 'audit', question: '감사증거의 속성과 절차를 설명하시오.', answer: '충분성, 적합성 / 검사, 관찰, 질문, 확인 등', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 감사증거를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감사증거 속성\n2. 감사절차 유형\n3. 충분성 판단\n4. 적합성 판단\n5. 연습문제 3개' },
    { id: 44, topic: 'audit', question: '분석적절차를 설명하시오.', answer: '비율분석, 추세분석, 합리성검증', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 분석적절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분석적절차 정의\n2. 적용 시점\n3. 유형\n4. 효과\n5. 연습문제 3개' },
    { id: 45, topic: 'audit', question: '표본감사를 설명하시오.', answer: '통계적 표본추출, 비통계적 표본추출', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 표본감사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표본감사 의의\n2. 표본추출 방법\n3. 표본크기 결정\n4. 결과 평가\n5. 연습문제 3개' },
    { id: 46, topic: 'audit', question: '감사의견의 유형을 설명하시오.', answer: '적정, 한정, 부적정, 의견거절', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 감사의견을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적정의견\n2. 한정의견\n3. 부적정의견\n4. 의견거절\n5. 연습문제 3개' },
    { id: 47, topic: 'audit', question: '강조사항과 기타사항을 설명하시오.', answer: '재무제표 이해에 근본적인 사항 강조', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 강조사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강조사항 문단\n2. 기타사항 문단\n3. 사용 상황\n4. 의견과의 관계\n5. 연습문제 3개' },
    { id: 48, topic: 'audit', question: '계속기업 가정에 대한 감사를 설명하시오.', answer: '중대한 불확실성 존재 시 공시 확인', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 계속기업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계속기업 가정\n2. 의문 사건\n3. 경영진 평가\n4. 감사보고 영향\n5. 연습문제 3개' },
    { id: 49, topic: 'audit', question: '부정과 오류에 대한 감사인 책임을 설명하시오.', answer: '부정으로 인한 중요왜곡표시 발견 책임', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 부정감사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부정 vs 오류\n2. 부정위험 평가\n3. 대응절차\n4. 보고 의무\n5. 연습문제 3개' },
    { id: 50, topic: 'audit', question: '감사조서의 작성과 보관을 설명하시오.', answer: '감사수행 증거, 최종조서완료일로부터 5년 보관', prompt: '공인회계사 회계학 문제입니다.\n\n문제: 감사조서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감사조서 목적\n2. 기재사항\n3. 작성 시점\n4. 보관 기간\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'basic', name: '재무회계 기초', icon: '📊', count: 13 },
    { id: 'advanced', name: '재무회계 심화', icon: '📈', count: 12 },
    { id: 'cost', name: '원가관리회계', icon: '🧮', count: 13 },
    { id: 'audit', name: '회계감사', icon: '🔍', count: 12 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/accounting/cpa" className="text-gray-500 hover:text-gray-700">공인회계사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-cyan-600 font-medium">회계학</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📊</div>
            <div>
              <h1 className="text-2xl font-bold">회계학</h1>
              <p className="text-cyan-100">1차 시험 80문항 | 재무회계, 원가회계, 회계감사</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
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
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
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
          <Link href="/category/accounting/cpa/study/tax-intro" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 세법개론
          </Link>
          <Link href="/category/accounting/cpa/study/financial-accounting" className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
            재무회계(2차) →
          </Link>
        </div>
      </div>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 회계학 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
