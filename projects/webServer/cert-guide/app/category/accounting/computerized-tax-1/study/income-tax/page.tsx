'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function IncomeTaxStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['comprehensive']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-1-income-tax-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-1-income-tax-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 종합소득 (1-10)
    { id: 1, topic: 'comprehensive', question: '종합소득세의 과세체계를 설명하시오.', answer: '이자, 배당, 사업, 근로, 연금, 기타소득 합산과세', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 종합소득세 과세체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종합소득 구성\n2. 과세표준 계산\n3. 세율 구조\n4. 세액계산\n5. 연습문제 3개' },
    { id: 2, topic: 'comprehensive', question: '종합소득금액의 계산구조를 설명하시오.', answer: '각 소득금액의 합계 = 종합소득금액', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 종합소득금액 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이자소득금액\n2. 배당소득금액\n3. 사업소득금액\n4. 근로소득금액\n5. 연습문제 3개' },
    { id: 3, topic: 'comprehensive', question: '이자소득의 범위와 과세방법을 설명하시오.', answer: '예금이자, 채권이자 등 14% 원천징수', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 이자소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이자소득 범위\n2. 비과세 이자소득\n3. 과세방법\n4. 원천징수세율\n5. 연습문제 3개' },
    { id: 4, topic: 'comprehensive', question: '배당소득의 범위와 Gross-up 제도를 설명하시오.', answer: '법인세 이중과세 조정을 위한 배당가산', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 배당소득과 Gross-up을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배당소득 범위\n2. Gross-up 대상\n3. 가산율(11%)\n4. 배당세액공제\n5. 연습문제 3개' },
    { id: 5, topic: 'comprehensive', question: '금융소득종합과세 기준과 계산을 설명하시오.', answer: '금융소득 2천만원 초과시 종합과세', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 금융소득종합과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종합과세 기준금액\n2. 비교과세 방법\n3. 세액계산\n4. 분리과세 금융소득\n5. 연습문제 3개' },
    { id: 6, topic: 'comprehensive', question: '연금소득의 종류와 과세방법을 설명하시오.', answer: '공적연금, 사적연금 구분과세', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 연금소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공적연금 범위\n2. 사적연금 범위\n3. 연금소득공제\n4. 분리과세 요건\n5. 연습문제 3개' },
    { id: 7, topic: 'comprehensive', question: '기타소득의 범위와 필요경비를 설명하시오.', answer: '일시적 소득, 필요경비 60~80%', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 기타소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기타소득 범위\n2. 필요경비율\n3. 원천징수세율\n4. 분리과세 vs 종합과세\n5. 연습문제 3개' },
    { id: 8, topic: 'comprehensive', question: '종합소득 과세표준과 세율구조를 설명하시오.', answer: '6단계 초과누진세율(6%~45%)', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 종합소득 세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 구간\n2. 세율 구조\n3. 누진공제액\n4. 세액 계산\n5. 연습문제 3개' },
    { id: 9, topic: 'comprehensive', question: '종합소득세 신고납부 절차를 설명하시오.', answer: '5월 확정신고, 11월 중간예납', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 종합소득세 신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고기한\n2. 중간예납\n3. 분납제도\n4. 가산세\n5. 연습문제 3개' },
    { id: 10, topic: 'comprehensive', question: '비거주자의 소득세 과세방법을 설명하시오.', answer: '국내원천소득에 대해 원천징수 또는 신고납부', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 비거주자 과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비거주자 판정\n2. 국내원천소득\n3. 과세방법\n4. 조세조약\n5. 연습문제 3개' },

    // 근로소득 (11-20)
    { id: 11, topic: 'employment', question: '근로소득의 범위와 수입시기를 설명하시오.', answer: '고용관계에서 받는 급여, 지급일 기준', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 근로소득 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근로소득 정의\n2. 수입시기\n3. 급여 형태\n4. 근로 판정 기준\n5. 연습문제 3개' },
    { id: 12, topic: 'employment', question: '비과세 근로소득의 종류를 설명하시오.', answer: '식대 20만원, 자가운전보조금, 출산수당 등', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 비과세 근로소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 식대(20만원)\n2. 자가운전보조금(20만원)\n3. 출산/육아수당\n4. 기타 비과세\n5. 연습문제 3개' },
    { id: 13, topic: 'employment', question: '근로소득공제의 계산방법을 설명하시오.', answer: '총급여 구간별 공제율 적용', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 근로소득공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제 구간\n2. 공제율\n3. 한도액\n4. 계산 사례\n5. 연습문제 3개' },
    { id: 14, topic: 'employment', question: '연말정산 절차와 시기를 설명하시오.', answer: '매년 2월 급여지급시 정산, 3월 10일 신고', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 연말정산 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정산시기\n2. 절차\n3. 제출서류\n4. 지급명세서\n5. 연습문제 3개' },
    { id: 15, topic: 'employment', question: '일용근로자의 소득세 계산을 설명하시오.', answer: '일급 - 15만원 공제 후 6% 원천징수', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 일용근로자 과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일용근로자 정의\n2. 세액계산\n3. 비과세 금액\n4. 근로장려금\n5. 연습문제 3개' },
    { id: 16, topic: 'employment', question: '퇴직소득의 범위와 과세체계를 설명하시오.', answer: '퇴직금, 퇴직연금 일시금 등 분류과세', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 퇴직소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직소득 범위\n2. 과세체계\n3. 퇴직급여\n4. 퇴직연금\n5. 연습문제 3개' },
    { id: 17, topic: 'employment', question: '퇴직소득세 계산구조를 설명하시오.', answer: '퇴직급여 - 공제 = 환산급여 - 환산공제', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 퇴직소득세 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직소득공제\n2. 환산급여\n3. 환산급여공제\n4. 세액계산\n5. 연습문제 3개' },
    { id: 18, topic: 'employment', question: '학자금 대여금의 과세여부를 설명하시오.', answer: '조건부 대여금은 비과세, 무조건 지급은 과세', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 학자금 과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비과세 요건\n2. 과세 대상\n3. 상환면제 시점\n4. 세무처리\n5. 연습문제 3개' },
    { id: 19, topic: 'employment', question: '주식매수선택권(스톡옵션) 과세를 설명하시오.', answer: '행사시 근로소득, 양도시 양도소득', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 스톡옵션 과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세시점\n2. 근로소득 계산\n3. 분할 과세\n4. 양도소득\n5. 연습문제 3개' },
    { id: 20, topic: 'employment', question: '근로소득 원천징수 방법을 설명하시오.', answer: '간이세액표에 따른 원천징수', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 근로소득 원천징수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간이세액표\n2. 원천징수세액\n3. 부양가족 반영\n4. 납부절차\n5. 연습문제 3개' },

    // 사업소득 (21-30)
    { id: 21, topic: 'business', question: '사업소득의 범위와 판단기준을 설명하시오.', answer: '계속적, 반복적 영리활동 소득', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 사업소득 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업소득 정의\n2. 판단기준\n3. 업종 분류\n4. 기타소득과 구분\n5. 연습문제 3개' },
    { id: 22, topic: 'business', question: '총수입금액의 범위와 계상시기를 설명하시오.', answer: '매출액 등 사업관련 수입, 권리확정주의', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 총수입금액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 총수입금액 범위\n2. 계상시기\n3. 간주수입금액\n4. 수입금액 조정\n5. 연습문제 3개' },
    { id: 23, topic: 'business', question: '필요경비의 범위와 인정기준을 설명하시오.', answer: '총수입금액 관련 비용, 일반적 인정기준', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 필요경비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필요경비 범위\n2. 인정요건\n3. 불산입 항목\n4. 증빙요건\n5. 연습문제 3개' },
    { id: 24, topic: 'business', question: '기장의무와 추계과세를 설명하시오.', answer: '복식부기의무자, 간편장부대상자, 추계신고', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 기장의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복식부기의무자\n2. 간편장부대상자\n3. 추계과세\n4. 기장불성실가산세\n5. 연습문제 3개' },
    { id: 25, topic: 'business', question: '경비율 제도(단순경비율, 기준경비율)를 설명하시오.', answer: '추계시 적용, 단순경비율과 기준경비율', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 경비율 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단순경비율\n2. 기준경비율\n3. 적용대상\n4. 소득금액 계산\n5. 연습문제 3개' },
    { id: 26, topic: 'business', question: '성실신고확인제도를 설명하시오.', answer: '일정규모 이상 사업자의 세무대리인 확인', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 성실신고확인제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상\n2. 확인절차\n3. 혜택\n4. 미이행시 불이익\n5. 연습문제 3개' },
    { id: 27, topic: 'business', question: '공동사업장의 소득분배를 설명하시오.', answer: '손익분배비율에 따라 각 출자자에게 분배', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 공동사업장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공동사업장 정의\n2. 손익분배비율\n3. 특수관계자 합산\n4. 신고방법\n5. 연습문제 3개' },
    { id: 28, topic: 'business', question: '부동산임대업의 소득금액 계산을 설명하시오.', answer: '임대수입 - 필요경비 = 임대소득금액', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 부동산임대업 소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임대소득 범위\n2. 간주임대료\n3. 필요경비\n4. 분리과세(주택)\n5. 연습문제 3개' },
    { id: 29, topic: 'business', question: '결손금 공제와 이월공제를 설명하시오.', answer: '당해연도 통산, 15년 이월공제', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 결손금 공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결손금 정의\n2. 통산 순서\n3. 이월공제\n4. 공제한도\n5. 연습문제 3개' },
    { id: 30, topic: 'business', question: '사업소득 원천징수 대상을 설명하시오.', answer: '봉사료, 인적용역, 의료비 등 원천징수', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 사업소득 원천징수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원천징수 대상\n2. 봉사료 원천징수\n3. 인적용역 원천징수\n4. 세율\n5. 연습문제 3개' },

    // 소득공제 (31-40)
    { id: 31, topic: 'deduction', question: '인적공제의 종류와 요건을 설명하시오.', answer: '기본공제(150만원), 추가공제(경로우대 등)', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 인적공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본공제\n2. 추가공제\n3. 부양가족 요건\n4. 중복공제 금지\n5. 연습문제 3개' },
    { id: 32, topic: 'deduction', question: '부양가족의 판정기준을 설명하시오.', answer: '나이요건, 소득요건(100만원), 생계요건', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 부양가족 판정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 나이요건\n2. 소득요건\n3. 생계요건\n4. 판정 시점\n5. 연습문제 3개' },
    { id: 33, topic: 'deduction', question: '연금보험료공제를 설명하시오.', answer: '국민연금, 공무원연금 등 전액 공제', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 연금보험료공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공적연금\n3. 사적연금\n4. 공제한도\n5. 연습문제 3개' },
    { id: 34, topic: 'deduction', question: '특별소득공제의 종류를 설명하시오.', answer: '건강보험료, 고용보험료, 주택자금공제', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 특별소득공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보험료공제\n2. 주택자금공제\n3. 공제한도\n4. 적용순서\n5. 연습문제 3개' },
    { id: 35, topic: 'deduction', question: '주택담보대출 이자공제를 설명하시오.', answer: '무주택 또는 1주택자, 상환기간별 한도', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 주택담보대출 이자공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제요건\n2. 상환기간별 한도\n3. 주택가격 요건\n4. 계산사례\n5. 연습문제 3개' },
    { id: 36, topic: 'deduction', question: '개인연금저축공제와 연금계좌공제를 설명하시오.', answer: '연금저축 400만원, IRP 포함 700만원 한도', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 연금계좌공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연금저축\n2. 퇴직연금(IRP)\n3. 공제한도\n4. 세액공제율\n5. 연습문제 3개' },
    { id: 37, topic: 'deduction', question: '신용카드 등 사용금액 소득공제를 설명하시오.', answer: '총급여 25% 초과분, 신용카드 15%, 현금영수증 30%', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 신용카드 소득공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공제율\n3. 공제한도\n4. 제외항목\n5. 연습문제 3개' },
    { id: 38, topic: 'deduction', question: '소기업소상공인 공제부금 공제를 설명하시오.', answer: '노란우산공제, 연 500만원 한도', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 소기업소상공인 공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노란우산공제\n2. 공제한도\n3. 가입요건\n4. 해지시 과세\n5. 연습문제 3개' },
    { id: 39, topic: 'deduction', question: '주택마련저축 공제를 설명하시오.', answer: '무주택 세대주, 청약저축 등 40% 공제', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 주택마련저축 공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제요건\n2. 대상저축\n3. 공제율\n4. 공제한도\n5. 연습문제 3개' },
    { id: 40, topic: 'deduction', question: '표준세액공제를 설명하시오.', answer: '특별소득공제 미적용시 13만원(7만원)', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 표준세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상\n2. 공제금액\n3. 근로자 vs 사업자\n4. 선택 적용\n5. 연습문제 3개' },

    // 세액공제 (41-50)
    { id: 41, topic: 'taxcredit', question: '자녀세액공제의 계산을 설명하시오.', answer: '자녀 1인당 15만원(셋째부터 30만원)', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 자녀세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공제금액\n3. 출산입양공제\n4. 연령요건\n5. 연습문제 3개' },
    { id: 42, topic: 'taxcredit', question: '연금계좌 세액공제를 설명하시오.', answer: '연금저축+IRP 최대 700만원, 세액공제율 12~15%', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 연금계좌 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공제한도\n3. 공제율\n4. 총급여별 차등\n5. 연습문제 3개' },
    { id: 43, topic: 'taxcredit', question: '보험료 세액공제를 설명하시오.', answer: '보장성보험 연 100만원 한도, 12% 공제', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 보험료 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 보장성보험\n3. 장애인보험\n4. 공제율과 한도\n5. 연습문제 3개' },
    { id: 44, topic: 'taxcredit', question: '의료비 세액공제를 설명하시오.', answer: '총급여 3% 초과분 15% 공제, 난임시술 30%', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 의료비 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 3% 기준금액\n3. 공제율\n4. 한도액\n5. 연습문제 3개' },
    { id: 45, topic: 'taxcredit', question: '교육비 세액공제를 설명하시오.', answer: '본인 전액, 자녀 300만원(대학 900만원) 한도', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 교육비 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 본인교육비\n3. 자녀교육비\n4. 한도와 공제율\n5. 연습문제 3개' },
    { id: 46, topic: 'taxcredit', question: '기부금 세액공제를 설명하시오.', answer: '법정기부금 100%, 지정기부금 30% 한도, 15~25%', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 기부금 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기부금 종류\n2. 한도계산\n3. 공제율\n4. 이월공제\n5. 연습문제 3개' },
    { id: 47, topic: 'taxcredit', question: '월세 세액공제를 설명하시오.', answer: '무주택 세대주, 총급여 7천만원 이하, 12~17%', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 월세 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제요건\n2. 주택요건\n3. 공제율\n4. 한도(750만원)\n5. 연습문제 3개' },
    { id: 48, topic: 'taxcredit', question: '배당세액공제를 설명하시오.', answer: 'Gross-up 배당에 대한 법인세 이중과세 조정', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 배당세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. Gross-up 배당\n3. 공제율\n4. 공제한도\n5. 연습문제 3개' },
    { id: 49, topic: 'taxcredit', question: '근로소득 세액공제를 설명하시오.', answer: '산출세액 55~30% 공제, 최대 74만원', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 근로소득 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공제율\n3. 한도액\n4. 총급여별 차등\n5. 연습문제 3개' },
    { id: 50, topic: 'taxcredit', question: '외국납부세액공제를 설명하시오.', answer: '외국에서 납부한 세액의 이중과세 조정', prompt: '전산세무 1급 소득세 문제입니다.\n\n문제: 외국납부세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제요건\n2. 공제방법\n3. 공제한도\n4. 이월공제\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'comprehensive', name: '종합소득', icon: '📊', count: 10 },
    { id: 'employment', name: '근로소득', icon: '💼', count: 10 },
    { id: 'business', name: '사업소득', icon: '🏪', count: 10 },
    { id: 'deduction', name: '소득공제', icon: '📋', count: 10 },
    { id: 'taxcredit', name: '세액공제', icon: '💰', count: 10 },
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
            <Link href="/category/accounting/computerized-tax-1" className="text-gray-500 hover:text-gray-700">전산세무 1급</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/computerized-tax-1/study" className="text-gray-500 hover:text-gray-700">학습</Link>
            <span className="text-gray-300">/</span>
            <span className="text-pink-600 font-medium">소득세</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-pink-600 to-rose-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">💸</div>
            <div>
              <h1 className="text-2xl font-bold">소득세</h1>
              <p className="text-pink-100">전산세무 1급 | 종합소득, 근로소득, 사업소득, 소득공제, 세액공제</p>
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
                    ? 'bg-pink-100 border-2 border-pink-300'
                    : 'bg-white border border-gray-200 hover:border-pink-200'
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
                              ? 'bg-pink-500 border-pink-500 text-white'
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
                              className="px-3 py-1 bg-pink-100 text-pink-600 rounded-lg text-sm hover:bg-pink-200 transition flex-shrink-0"
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

        <div className="mt-8 flex justify-center">
          <Link href="/category/accounting/computerized-tax-1/study" className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
            학습 목록으로 돌아가기
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">AI 선택</h3>
                <button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">&times;</button>
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
                프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">2026 자격증 가이드. 전산세무 1급 소득세 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
