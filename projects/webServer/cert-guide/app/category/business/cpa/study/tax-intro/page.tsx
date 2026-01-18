'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function TaxIntroStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['income']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cpa-tax-intro-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('cpa-tax-intro-completed', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 소득세 (1-13)
    { id: 1, topic: 'income', question: '종합소득세의 과세체계를 설명하시오.', answer: '이자, 배당, 사업, 근로, 연금, 기타소득 합산과세', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 종합소득세 과세체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종합소득 구성\n2. 과세표준 계산\n3. 세율 구조\n4. 세액계산\n5. 연습문제 3개' },
    { id: 2, topic: 'income', question: '이자소득과 배당소득의 과세방법을 설명하시오.', answer: '원천징수 14%, 2천만원 초과시 종합과세', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 금융소득 과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이자소득 범위\n2. 배당소득 범위\n3. 분리과세 vs 종합과세\n4. 금융소득종합과세\n5. 연습문제 3개' },
    { id: 3, topic: 'income', question: '사업소득의 계산구조를 설명하시오.', answer: '총수입금액 - 필요경비 = 사업소득금액', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 사업소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업소득 범위\n2. 총수입금액\n3. 필요경비\n4. 기장의무\n5. 연습문제 3개' },
    { id: 4, topic: 'income', question: '근로소득의 과세방법을 설명하시오.', answer: '총급여 - 근로소득공제 = 근로소득금액', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 근로소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근로소득 범위\n2. 비과세 근로소득\n3. 근로소득공제\n4. 연말정산\n5. 연습문제 3개' },
    { id: 5, topic: 'income', question: '퇴직소득세의 계산구조를 설명하시오.', answer: '퇴직급여 → 퇴직소득공제 → 환산급여 → 세액', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 퇴직소득세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직소득 범위\n2. 퇴직소득공제\n3. 환산급여 계산\n4. 세액 계산\n5. 연습문제 3개' },
    { id: 6, topic: 'income', question: '양도소득세의 과세대상과 계산구조를 설명하시오.', answer: '자산양도차익에 대한 분류과세', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 양도소득세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세대상 자산\n2. 양도차익 계산\n3. 장기보유특별공제\n4. 세율\n5. 연습문제 3개' },
    { id: 7, topic: 'income', question: '소득공제와 세액공제를 비교 설명하시오.', answer: '소득공제: 과세표준 감소, 세액공제: 세액 감소', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 소득공제와 세액공제를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 소득공제 종류\n2. 세액공제 종류\n3. 효과 비교\n4. 주요 공제항목\n5. 연습문제 3개' },
    { id: 8, topic: 'income', question: '원천징수제도를 설명하시오.', answer: '소득지급자가 세금 원천공제 후 납부', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 원천징수제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원천징수 의의\n2. 원천징수 대상\n3. 원천징수세율\n4. 납부절차\n5. 연습문제 3개' },
    { id: 9, topic: 'income', question: '성실신고확인제도를 설명하시오.', answer: '일정규모 이상 사업자의 세무대리인 확인', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 성실신고확인제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상\n2. 확인절차\n3. 혜택\n4. 미이행시 불이익\n5. 연습문제 3개' },
    { id: 10, topic: 'income', question: '종합소득세 신고납부절차를 설명하시오.', answer: '5월 확정신고, 11월 중간예납', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 종합소득세 신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고기한\n2. 중간예납\n3. 분납\n4. 가산세\n5. 연습문제 3개' },
    { id: 11, topic: 'income', question: '비거주자의 소득세 과세방법을 설명하시오.', answer: '국내원천소득에 대해 원천징수 또는 신고납부', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 비거주자 과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비거주자 판정\n2. 국내원천소득\n3. 과세방법\n4. 조세조약\n5. 연습문제 3개' },
    { id: 12, topic: 'income', question: '연금소득의 과세방법을 설명하시오.', answer: '공적연금, 사적연금 구분과세', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 연금소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연금소득 범위\n2. 공적연금 과세\n3. 사적연금 과세\n4. 연금소득공제\n5. 연습문제 3개' },
    { id: 13, topic: 'income', question: '기타소득의 범위와 과세방법을 설명하시오.', answer: '일시적·불규칙 소득, 필요경비 60~80%', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 기타소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기타소득 범위\n2. 필요경비\n3. 분리과세 vs 종합과세\n4. 원천징수\n5. 연습문제 3개' },

    // 법인세 (14-25)
    { id: 14, topic: 'corporate', question: '법인세의 과세체계를 설명하시오.', answer: '각 사업연도 소득 × 세율', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 법인세 과세체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무자\n2. 과세표준\n3. 세율 구조\n4. 신고납부\n5. 연습문제 3개' },
    { id: 15, topic: 'corporate', question: '세무조정의 개념과 유형을 설명하시오.', answer: '결산조정(장부), 신고조정(세무서류)', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 세무조정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 세무조정 의의\n2. 결산조정사항\n3. 신고조정사항\n4. 소득처분\n5. 연습문제 3개' },
    { id: 16, topic: 'corporate', question: '익금과 익금불산입을 설명하시오.', answer: '익금: 순자산 증가, 익금불산입: 과세제외', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 익금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 익금 범위\n2. 주요 익금항목\n3. 익금불산입\n4. 의제배당\n5. 연습문제 3개' },
    { id: 17, topic: 'corporate', question: '손금과 손금불산입을 설명하시오.', answer: '손금: 순자산 감소, 손금불산입: 비용부인', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 손금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손금 범위\n2. 주요 손금항목\n3. 손금불산입\n4. 업무무관비용\n5. 연습문제 3개' },
    { id: 18, topic: 'corporate', question: '접대비 손금한도를 설명하시오.', answer: '기본한도 + 수입금액기준 한도', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 접대비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접대비 범위\n2. 손금한도 계산\n3. 기밀비 처리\n4. 증빙 요건\n5. 연습문제 3개' },
    { id: 19, topic: 'corporate', question: '감가상각의 세무처리를 설명하시오.', answer: '법정상각법, 내용연수, 상각범위액', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 감가상각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감가상각 방법\n2. 내용연수\n3. 상각범위액\n4. 시부인\n5. 연습문제 3개' },
    { id: 20, topic: 'corporate', question: '지급이자 손금불산입을 설명하시오.', answer: '채권자불분명, 업무무관자산, 건설자금이자', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 지급이자 손금불산입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 채권자불분명이자\n2. 업무무관자산 차입금이자\n3. 건설자금이자\n4. 계산방법\n5. 연습문제 3개' },
    { id: 21, topic: 'corporate', question: '충당금의 세무처리를 설명하시오.', answer: '대손충당금, 퇴직급여충당금 등', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 충당금 세무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대손충당금\n2. 퇴직급여충당금\n3. 구상채권상각충당금\n4. 손금한도\n5. 연습문제 3개' },
    { id: 22, topic: 'corporate', question: '법인세 세액계산 구조를 설명하시오.', answer: '산출세액 - 공제·감면 + 가산세 = 납부세액', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 법인세 세액계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산출세액\n2. 세액공제\n3. 세액감면\n4. 가산세\n5. 연습문제 3개' },
    { id: 23, topic: 'corporate', question: '결손금 공제와 이월을 설명하시오.', answer: '당해연도 공제, 15년 이월공제', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 결손금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결손금 정의\n2. 이월공제\n3. 소급공제\n4. 공제한도\n5. 연습문제 3개' },
    { id: 24, topic: 'corporate', question: '부당행위계산부인을 설명하시오.', answer: '특수관계인 거래의 시가조정', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 부당행위계산부인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용요건\n2. 특수관계인\n3. 부당행위 유형\n4. 시가 산정\n5. 연습문제 3개' },
    { id: 25, topic: 'corporate', question: '법인세 신고납부절차를 설명하시오.', answer: '3개월 내 신고, 중간예납', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 법인세 신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고기한\n2. 중간예납\n3. 분납\n4. 수정신고·경정청구\n5. 연습문제 3개' },

    // 부가가치세 (26-38)
    { id: 26, topic: 'vat', question: '부가가치세의 과세체계를 설명하시오.', answer: '매출세액 - 매입세액 = 납부세액', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 부가가치세 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부가가치세 의의\n2. 과세방식\n3. 전단계세액공제\n4. 세율\n5. 연습문제 3개' },
    { id: 27, topic: 'vat', question: '과세거래의 요건을 설명하시오.', answer: '재화·용역의 공급, 재화의 수입', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 과세거래를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재화의 공급\n2. 용역의 공급\n3. 재화의 수입\n4. 공급시기\n5. 연습문제 3개' },
    { id: 28, topic: 'vat', question: '영세율과 면세를 비교 설명하시오.', answer: '영세율: 완전면세, 면세: 부분면세', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 영세율과 면세를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 영세율 적용대상\n2. 면세 적용대상\n3. 매입세액 공제\n4. 효과 비교\n5. 연습문제 3개' },
    { id: 29, topic: 'vat', question: '과세표준의 계산을 설명하시오.', answer: '공급가액 = 공급대가(VAT 미포함)', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 과세표준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 원칙\n2. 특례규정\n3. 공급가액 계산\n4. 부수재화·용역\n5. 연습문제 3개' },
    { id: 30, topic: 'vat', question: '세금계산서 제도를 설명하시오.', answer: '거래증빙, 매입세액공제 요건', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 세금계산서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기재사항\n2. 발급시기\n3. 전자세금계산서\n4. 가산세\n5. 연습문제 3개' },
    { id: 31, topic: 'vat', question: '매입세액 공제와 불공제를 설명하시오.', answer: '사업관련 매입세액 공제, 비영업용 불공제', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 매입세액 공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제요건\n2. 불공제 항목\n3. 공통매입세액\n4. 안분계산\n5. 연습문제 3개' },
    { id: 32, topic: 'vat', question: '대손세액공제를 설명하시오.', answer: '대손발생시 매출세액 환급', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 대손세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제요건\n2. 대손사유\n3. 공제시기\n4. 대손회수\n5. 연습문제 3개' },
    { id: 33, topic: 'vat', question: '간이과세제도를 설명하시오.', answer: '연매출 8천만원 미만 사업자 특례', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 간이과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상\n2. 세액계산\n3. 납부의무면제\n4. 과세유형전환\n5. 연습문제 3개' },
    { id: 34, topic: 'vat', question: '부가가치세 신고납부를 설명하시오.', answer: '예정신고(분기별), 확정신고(반기별)', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 부가가치세 신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세기간\n2. 예정신고\n3. 확정신고\n4. 조기환급\n5. 연습문제 3개' },
    { id: 35, topic: 'vat', question: '의제매입세액공제를 설명하시오.', answer: '면세농산물 매입시 매입세액 의제공제', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 의제매입세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공제율\n3. 공제한도\n4. 증빙\n5. 연습문제 3개' },
    { id: 36, topic: 'vat', question: '재화의 간주공급을 설명하시오.', answer: '자가공급, 개인적공급, 사업상증여, 폐업', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 간주공급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자가공급\n2. 개인적 공급\n3. 사업상 증여\n4. 폐업시 공급\n5. 연습문제 3개' },
    { id: 37, topic: 'vat', question: '부가가치세 가산세를 설명하시오.', answer: '무신고, 과소신고, 세금계산서 가산세', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 부가가치세 가산세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고불성실 가산세\n2. 납부불성실 가산세\n3. 세금계산서 가산세\n4. 감면\n5. 연습문제 3개' },
    { id: 38, topic: 'vat', question: '사업자등록제도를 설명하시오.', answer: '사업개시 20일 내 등록', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 사업자등록을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등록신청\n2. 등록증 발급\n3. 미등록 불이익\n4. 변경신고\n5. 연습문제 3개' },

    // 상속증여세 (39-50)
    { id: 39, topic: 'gift', question: '상속세 과세체계를 설명하시오.', answer: '유산세 방식, 상속재산가액 기준', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 상속세 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무자\n2. 과세물건\n3. 과세표준\n4. 세율\n5. 연습문제 3개' },
    { id: 40, topic: 'gift', question: '상속재산가액의 계산을 설명하시오.', answer: '총상속재산 + 추정상속재산 - 비과세·공제', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 상속재산가액을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 본래 상속재산\n2. 간주상속재산\n3. 추정상속재산\n4. 비과세재산\n5. 연습문제 3개' },
    { id: 41, topic: 'gift', question: '증여세 과세체계를 설명하시오.', answer: '수증자별 과세, 10년 합산과세', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 증여세 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납세의무자\n2. 과세물건\n3. 과세표준\n4. 세율\n5. 연습문제 3개' },
    { id: 42, topic: 'gift', question: '증여재산의 평가방법을 설명하시오.', answer: '시가원칙, 보충적 평가방법', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 증여재산 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시가 평가\n2. 보충적 평가\n3. 비상장주식 평가\n4. 부동산 평가\n5. 연습문제 3개' },
    { id: 43, topic: 'gift', question: '상속공제의 종류를 설명하시오.', answer: '기초공제, 인적공제, 일괄공제, 배우자공제', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 상속공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기초공제\n2. 인적공제\n3. 일괄공제\n4. 배우자공제\n5. 연습문제 3개' },
    { id: 44, topic: 'gift', question: '증여재산공제를 설명하시오.', answer: '배우자 6억, 직계존비속 5천만원 등', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 증여재산공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제금액\n2. 관계별 공제\n3. 10년 합산\n4. 적용순서\n5. 연습문제 3개' },
    { id: 45, topic: 'gift', question: '세대생략 증여 할증과세를 설명하시오.', answer: '손자에게 직접 증여시 30% 할증', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 세대생략 할증을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상\n2. 할증율\n3. 세액계산\n4. 예외\n5. 연습문제 3개' },
    { id: 46, topic: 'gift', question: '상속세 신고납부를 설명하시오.', answer: '상속개시일로부터 6개월 내', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 상속세 신고를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고기한\n2. 신고세액공제\n3. 분납과 연부연납\n4. 물납\n5. 연습문제 3개' },
    { id: 47, topic: 'gift', question: '연대납세의무를 설명하시오.', answer: '상속인, 수유자 상호간 연대책임', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 연대납세의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상속세 연대납세\n2. 증여세 연대납세\n3. 책임 범위\n4. 구상권\n5. 연습문제 3개' },
    { id: 48, topic: 'gift', question: '간주증여를 설명하시오.', answer: '저가양수, 고가양도, 채무면제 등', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 간주증여를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간주증여 유형\n2. 저가양수·고가양도\n3. 채무면제\n4. 과세가액\n5. 연습문제 3개' },
    { id: 49, topic: 'gift', question: '가업상속공제를 설명하시오.', answer: '중소기업 가업승계 최대 600억 공제', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 가업상속공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용요건\n2. 공제금액\n3. 사후관리\n4. 추징사유\n5. 연습문제 3개' },
    { id: 50, topic: 'gift', question: '상속세와 증여세의 관계를 설명하시오.', answer: '사전증여재산 합산, 증여세액 공제', prompt: '공인회계사 세법개론 문제입니다.\n\n문제: 상속·증여세 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합산과세 원칙\n2. 사전증여재산\n3. 증여세액 공제\n4. 세액계산\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'income', name: '소득세', icon: '👤', count: 13 },
    { id: 'corporate', name: '법인세', icon: '🏢', count: 12 },
    { id: 'vat', name: '부가가치세', icon: '🧾', count: 13 },
    { id: 'gift', name: '상속증여세', icon: '🎁', count: 12 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/business/cpa" className="text-gray-500 hover:text-gray-700">공인회계사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-violet-600 font-medium">세법개론</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📋</div>
            <div>
              <h1 className="text-2xl font-bold">세법개론</h1>
              <p className="text-violet-100">1차 시험 40문항 | 소득세, 법인세, 부가가치세, 상속증여세</p>
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
                    ? 'bg-violet-100 border-2 border-violet-300'
                    : 'bg-white border border-gray-200 hover:border-violet-200'
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
                              ? 'bg-violet-500 border-violet-500 text-white'
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
                              className="px-3 py-1 bg-violet-100 text-violet-600 rounded-lg text-sm hover:bg-violet-200 transition flex-shrink-0"
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
          <Link href="/category/business/cpa/study/commercial-law" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 상법
          </Link>
          <Link href="/category/business/cpa/study/accounting-theory" className="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600">
            회계학 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 세법개론 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
