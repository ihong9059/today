'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CommercialLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['establishment']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cpa-commercial-law-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('cpa-commercial-law-completed', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 회사설립·자본 (1-13)
    { id: 1, topic: 'establishment', question: '발기설립과 모집설립을 비교 설명하시오.', answer: '발기설립: 발기인이 전액인수, 모집설립: 주주공모', prompt: '공인회계사 상법 문제입니다.\n\n문제: 발기설립과 모집설립을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 발기설립 절차\n2. 모집설립 절차\n3. 각각의 장단점\n4. 설립등기\n5. 연습문제 3개' },
    { id: 2, topic: 'establishment', question: '정관의 기재사항을 설명하시오.', answer: '절대적 기재사항(상호, 목적 등), 상대적 기재사항, 임의적 기재사항', prompt: '공인회계사 상법 문제입니다.\n\n문제: 정관의 기재사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절대적 기재사항 6가지\n2. 상대적 기재사항\n3. 임의적 기재사항\n4. 정관변경 절차\n5. 연습문제 3개' },
    { id: 3, topic: 'establishment', question: '자본금과 발행주식총수의 관계를 설명하시오.', answer: '자본금 = 발행주식총수 × 1주의 금액', prompt: '공인회계사 상법 문제입니다.\n\n문제: 자본금 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본금 정의\n2. 액면주식과 무액면주식\n3. 자본금 원칙\n4. 자본충실 원칙\n5. 연습문제 3개' },
    { id: 4, topic: 'establishment', question: '신주발행의 절차와 효력을 설명하시오.', answer: '이사회결의→배정→청약→납입→등기', prompt: '공인회계사 상법 문제입니다.\n\n문제: 신주발행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신주발행 결정기관\n2. 발행절차\n3. 주주의 신주인수권\n4. 불공정발행\n5. 연습문제 3개' },
    { id: 5, topic: 'establishment', question: '자본금 감소의 절차와 방법을 설명하시오.', answer: '주주총회 특별결의, 채권자보호절차 필요', prompt: '공인회계사 상법 문제입니다.\n\n문제: 자본금 감소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감자의 목적\n2. 실질적 감자와 명목적 감자\n3. 감자 절차\n4. 채권자보호\n5. 연습문제 3개' },
    { id: 6, topic: 'establishment', question: '주식소각의 유형과 절차를 설명하시오.', answer: '강제소각, 임의소각, 상환주식 소각', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주식소각을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주식소각 유형\n2. 소각 재원\n3. 소각 절차\n4. 자본금 감소와 관계\n5. 연습문제 3개' },
    { id: 7, topic: 'establishment', question: '자기주식 취득의 제한과 예외를 설명하시오.', answer: '원칙적 금지, 배당가능이익 한도 내 취득 가능', prompt: '공인회계사 상법 문제입니다.\n\n문제: 자기주식 취득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기주식 취득 금지 이유\n2. 예외적 취득 사유\n3. 취득 한도\n4. 처분 의무\n5. 연습문제 3개' },
    { id: 8, topic: 'establishment', question: '발기인의 책임을 설명하시오.', answer: '자본충실책임, 손해배상책임, 연대책임', prompt: '공인회계사 상법 문제입니다.\n\n문제: 발기인의 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회사설립 시 책임\n2. 납입담보책임\n3. 손해배상책임\n4. 책임의 면제\n5. 연습문제 3개' },
    { id: 9, topic: 'establishment', question: '설립무효와 설립취소를 비교 설명하시오.', answer: '무효: 설립절차 하자, 취소: 의사표시 하자', prompt: '공인회계사 상법 문제입니다.\n\n문제: 설립무효와 취소를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 설립무효 사유\n2. 설립취소 사유\n3. 소송 절차\n4. 판결 효력\n5. 연습문제 3개' },
    { id: 10, topic: 'establishment', question: '변태설립사항을 설명하시오.', answer: '현물출자, 재산인수, 발기인 보수, 설립비용', prompt: '공인회계사 상법 문제입니다.\n\n문제: 변태설립사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변태설립사항 4가지\n2. 정관기재 이유\n3. 검사인 조사\n4. 현물출자 절차\n5. 연습문제 3개' },
    { id: 11, topic: 'establishment', question: '준비금제도를 설명하시오.', answer: '자본준비금, 이익준비금, 임의준비금', prompt: '공인회계사 상법 문제입니다.\n\n문제: 준비금제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법정준비금 종류\n2. 자본준비금 적립\n3. 이익준비금 적립\n4. 준비금 사용\n5. 연습문제 3개' },
    { id: 12, topic: 'establishment', question: '주식의 종류와 특성을 설명하시오.', answer: '보통주, 우선주, 전환주식, 상환주식', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보통주와 종류주식\n2. 우선주 유형\n3. 전환주식\n4. 상환주식\n5. 연습문제 3개' },
    { id: 13, topic: 'establishment', question: '주식분할과 주식병합을 비교 설명하시오.', answer: '분할: 1주→수주, 병합: 수주→1주', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주식분할과 병합을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 주식분할 목적\n2. 주식병합 목적\n3. 절차\n4. 단주 처리\n5. 연습문제 3개' },

    // 주식·주주 (14-25)
    { id: 14, topic: 'stock', question: '주식양도의 자유와 제한을 설명하시오.', answer: '원칙적 자유, 정관에 의한 제한 가능', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주식양도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주식양도 자유원칙\n2. 양도제한 방법\n3. 이사회 승인\n4. 양도제한 위반 효과\n5. 연습문제 3개' },
    { id: 15, topic: 'stock', question: '주주총회의 소집절차와 결의방법을 설명하시오.', answer: '이사회결의→소집통지→총회개최→결의', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주주총회를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소집권자\n2. 소집절차\n3. 보통결의와 특별결의\n4. 결의하자\n5. 연습문제 3개' },
    { id: 16, topic: 'stock', question: '의결권과 의결권 제한을 설명하시오.', answer: '1주1의결권 원칙, 특별이해관계인 의결권 제한', prompt: '공인회계사 상법 문제입니다.\n\n문제: 의결권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1주1의결권 원칙\n2. 의결권 제한 사유\n3. 의결권 대리행사\n4. 서면투표\n5. 연습문제 3개' },
    { id: 17, topic: 'stock', question: '주주제안권을 설명하시오.', answer: '소수주주가 총회 안건 제안, 3% 이상 보유', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주주제안권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주주제안권 요건\n2. 제안 절차\n3. 회사의 의무\n4. 거부 사유\n5. 연습문제 3개' },
    { id: 18, topic: 'stock', question: '집중투표제를 설명하시오.', answer: '이사선임 시 의결권 집중 행사, 소수주주 이익 보호', prompt: '공인회계사 상법 문제입니다.\n\n문제: 집중투표제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집중투표 정의\n2. 청구권자와 절차\n3. 투표방법\n4. 배제 가능 여부\n5. 연습문제 3개' },
    { id: 19, topic: 'stock', question: '이익배당과 배당가능이익을 설명하시오.', answer: '배당가능이익 = 순자산 - 자본금 - 준비금', prompt: '공인회계사 상법 문제입니다.\n\n문제: 이익배당을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배당가능이익 계산\n2. 현금배당과 주식배당\n3. 중간배당\n4. 위법배당 책임\n5. 연습문제 3개' },
    { id: 20, topic: 'stock', question: '주주명부의 작성과 효력을 설명하시오.', answer: '주주명부 기재로 회사에 대항', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주주명부를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주주명부 기재사항\n2. 명의개서 절차\n3. 대항력\n4. 기준일 제도\n5. 연습문제 3개' },
    { id: 21, topic: 'stock', question: '신주인수권의 내용과 제한을 설명하시오.', answer: '기존주주의 지분비율 유지권, 예외적 제3자 배정', prompt: '공인회계사 상법 문제입니다.\n\n문제: 신주인수권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신주인수권 의의\n2. 제3자 배정 사유\n3. 신주인수권증서\n4. 실권주 처리\n5. 연습문제 3개' },
    { id: 22, topic: 'stock', question: '소수주주권의 종류와 행사요건을 설명하시오.', answer: '단독주주권, 소수주주권(1%, 3% 등)', prompt: '공인회계사 상법 문제입니다.\n\n문제: 소수주주권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단독주주권 종류\n2. 1% 소수주주권\n3. 3% 소수주주권\n4. 행사방법\n5. 연습문제 3개' },
    { id: 23, topic: 'stock', question: '주주대표소송을 설명하시오.', answer: '이사 책임추궁을 위한 주주의 소송, 1% 보유', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주주대표소송을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대표소송 의의\n2. 제소요건\n3. 소송절차\n4. 판결효력\n5. 연습문제 3개' },
    { id: 24, topic: 'stock', question: '주식매수청구권을 설명하시오.', answer: '반대주주의 주식 공정가액 매수청구', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주식매수청구권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 행사 사유\n2. 청구절차\n3. 매수가격 결정\n4. 대금지급\n5. 연습문제 3개' },
    { id: 25, topic: 'stock', question: '회계장부열람권을 설명하시오.', answer: '3% 이상 주주의 장부열람청구권', prompt: '공인회계사 상법 문제입니다.\n\n문제: 회계장부열람권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열람청구권 요건\n2. 열람 범위\n3. 회사의 거부 사유\n4. 구제방법\n5. 연습문제 3개' },

    // 이사회·경영 (26-38)
    { id: 26, topic: 'board', question: '이사의 선임과 종임을 설명하시오.', answer: '주주총회 보통결의 선임, 임기 3년 이내', prompt: '공인회계사 상법 문제입니다.\n\n문제: 이사 선임과 종임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임절차\n2. 자격요건\n3. 임기\n4. 해임과 사임\n5. 연습문제 3개' },
    { id: 27, topic: 'board', question: '이사회의 권한과 운영을 설명하시오.', answer: '업무집행 의사결정, 이사 직무감독', prompt: '공인회계사 상법 문제입니다.\n\n문제: 이사회를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이사회 권한\n2. 소집절차\n3. 결의방법\n4. 의사록\n5. 연습문제 3개' },
    { id: 28, topic: 'board', question: '대표이사의 선임과 권한을 설명하시오.', answer: '이사회 선임, 대외적 대표권한', prompt: '공인회계사 상법 문제입니다.\n\n문제: 대표이사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선임방법\n2. 대표권 범위\n3. 대표권 제한\n4. 공동대표\n5. 연습문제 3개' },
    { id: 29, topic: 'board', question: '이사의 충실의무와 선관주의의무를 설명하시오.', answer: '회사 이익을 위한 성실한 직무수행', prompt: '공인회계사 상법 문제입니다.\n\n문제: 이사의 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충실의무\n2. 선관주의의무\n3. 경영판단원칙\n4. 의무위반 효과\n5. 연습문제 3개' },
    { id: 30, topic: 'board', question: '경업금지의무를 설명하시오.', answer: '이사회 승인 없이 동종영업 금지', prompt: '공인회계사 상법 문제입니다.\n\n문제: 경업금지의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경업금지 범위\n2. 이사회 승인\n3. 위반 효과\n4. 개입권\n5. 연습문제 3개' },
    { id: 31, topic: 'board', question: '자기거래 제한을 설명하시오.', answer: '회사와 이사 간 거래 시 이사회 승인', prompt: '공인회계사 상법 문제입니다.\n\n문제: 자기거래 제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기거래 정의\n2. 승인절차\n3. 공정성 요건\n4. 위반 효과\n5. 연습문제 3개' },
    { id: 32, topic: 'board', question: '이사의 책임과 면제를 설명하시오.', answer: '회사에 대한 손해배상책임, 주주총회 면제 가능', prompt: '공인회계사 상법 문제입니다.\n\n문제: 이사의 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회사에 대한 책임\n2. 제3자에 대한 책임\n3. 연대책임\n4. 책임면제\n5. 연습문제 3개' },
    { id: 33, topic: 'board', question: '이사회 내 위원회를 설명하시오.', answer: '감사위원회, 사외이사후보추천위원회 등', prompt: '공인회계사 상법 문제입니다.\n\n문제: 이사회 내 위원회를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위원회 설치\n2. 권한위임\n3. 감사위원회\n4. 운영방법\n5. 연습문제 3개' },
    { id: 34, topic: 'board', question: '사외이사 제도를 설명하시오.', answer: '경영감독 기능, 상장회사 의무화', prompt: '공인회계사 상법 문제입니다.\n\n문제: 사외이사 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사외이사 자격\n2. 선임 비율\n3. 역할과 기능\n4. 결격사유\n5. 연습문제 3개' },
    { id: 35, topic: 'board', question: '감사와 감사위원회를 비교 설명하시오.', answer: '감사: 독립기관, 감사위원회: 이사회 내 기관', prompt: '공인회계사 상법 문제입니다.\n\n문제: 감사제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감사 선임과 권한\n2. 감사위원회 구성\n3. 권한 비교\n4. 책임\n5. 연습문제 3개' },
    { id: 36, topic: 'board', question: '업무집행지시자의 책임을 설명하시오.', answer: '사실상 이사로서 이사와 동일한 책임', prompt: '공인회계사 상법 문제입니다.\n\n문제: 업무집행지시자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 업무집행지시자 정의\n2. 그림자이사\n3. 책임 범위\n4. 판례\n5. 연습문제 3개' },
    { id: 37, topic: 'board', question: '이사의 보수 결정을 설명하시오.', answer: '정관 또는 주주총회 결의로 결정', prompt: '공인회계사 상법 문제입니다.\n\n문제: 이사 보수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보수 결정 방법\n2. 퇴직금\n3. 스톡옵션\n4. 과다보수 문제\n5. 연습문제 3개' },
    { id: 38, topic: 'board', question: '표현대표이사를 설명하시오.', answer: '대표권 없이 대표이사 외관 가진 자', prompt: '공인회계사 상법 문제입니다.\n\n문제: 표현대표이사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표현대표이사 요건\n2. 회사의 책임\n3. 선의 제3자 보호\n4. 판례\n5. 연습문제 3개' },

    // 합병·분할 (39-50)
    { id: 39, topic: 'ma', question: '합병의 절차를 설명하시오.', answer: '합병계약→주주총회→채권자보호→등기', prompt: '공인회계사 상법 문제입니다.\n\n문제: 합병 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합병계약 체결\n2. 주주총회 승인\n3. 채권자보호절차\n4. 합병등기\n5. 연습문제 3개' },
    { id: 40, topic: 'ma', question: '합병비율의 산정을 설명하시오.', answer: '기업가치 평가에 따른 주식교환비율', prompt: '공인회계사 상법 문제입니다.\n\n문제: 합병비율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합병비율 의의\n2. 평가방법\n3. 불공정 합병비율\n4. 구제방법\n5. 연습문제 3개' },
    { id: 41, topic: 'ma', question: '간이합병과 소규모합병을 비교 설명하시오.', answer: '간이: 피합병사 90% 보유, 소규모: 5% 미만 신주발행', prompt: '공인회계사 상법 문제입니다.\n\n문제: 간이합병과 소규모합병을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 간이합병 요건\n2. 소규모합병 요건\n3. 절차 간소화\n4. 반대주주 보호\n5. 연습문제 3개' },
    { id: 42, topic: 'ma', question: '회사분할의 유형을 설명하시오.', answer: '단순분할, 분할합병, 물적분할', prompt: '공인회계사 상법 문제입니다.\n\n문제: 회사분할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분할의 의의\n2. 단순분할과 분할합병\n3. 인적분할과 물적분할\n4. 분할절차\n5. 연습문제 3개' },
    { id: 43, topic: 'ma', question: '주식교환과 주식이전을 비교 설명하시오.', answer: '교환: 기존 지주회사, 이전: 신설 지주회사', prompt: '공인회계사 상법 문제입니다.\n\n문제: 주식교환과 이전을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 주식교환 정의\n2. 주식이전 정의\n3. 절차\n4. 효과\n5. 연습문제 3개' },
    { id: 44, topic: 'ma', question: '영업양도의 요건과 효과를 설명하시오.', answer: '주주총회 특별결의, 포괄승계 아님', prompt: '공인회계사 상법 문제입니다.\n\n문제: 영업양도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업양도 정의\n2. 승인절차\n3. 합병과 차이\n4. 양수인 책임\n5. 연습문제 3개' },
    { id: 45, topic: 'ma', question: '합병무효의 소를 설명하시오.', answer: '합병등기 후 6개월 내 소 제기', prompt: '공인회계사 상법 문제입니다.\n\n문제: 합병무효를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무효사유\n2. 소 제기권자\n3. 제소기간\n4. 판결효력\n5. 연습문제 3개' },
    { id: 46, topic: 'ma', question: '반대주주의 주식매수청구권을 설명하시오.', answer: '합병 등 반대 시 공정가액 매수청구', prompt: '공인회계사 상법 문제입니다.\n\n문제: 매수청구권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청구권 발생 사유\n2. 행사절차\n3. 매수가격\n4. 분쟁해결\n5. 연습문제 3개' },
    { id: 47, topic: 'ma', question: '삼각합병을 설명하시오.', answer: '모회사 주식으로 자회사 합병 대가 지급', prompt: '공인회계사 상법 문제입니다.\n\n문제: 삼각합병을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 삼각합병 구조\n2. 활용 목적\n3. 절차\n4. 법적 쟁점\n5. 연습문제 3개' },
    { id: 48, topic: 'ma', question: '교부금합병을 설명하시오.', answer: '합병대가로 현금 지급', prompt: '공인회계사 상법 문제입니다.\n\n문제: 교부금합병을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교부금합병 정의\n2. 허용 범위\n3. 단주 처리\n4. 세무 문제\n5. 연습문제 3개' },
    { id: 49, topic: 'ma', question: '채권자보호절차를 설명하시오.', answer: '공고, 개별최고, 이의신청, 담보제공', prompt: '공인회계사 상법 문제입니다.\n\n문제: 채권자보호절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공고와 최고\n2. 이의신청\n3. 회사 조치\n4. 절차 흠결 효과\n5. 연습문제 3개' },
    { id: 50, topic: 'ma', question: '흡수합병과 신설합병을 비교 설명하시오.', answer: '흡수: 존속회사+소멸회사, 신설: 모두 소멸→신설', prompt: '공인회계사 상법 문제입니다.\n\n문제: 합병 유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 흡수합병 구조\n2. 신설합병 구조\n3. 각각의 장단점\n4. 실무상 선택\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'establishment', name: '회사설립·자본', icon: '🏢', count: 13 },
    { id: 'stock', name: '주식·주주', icon: '📈', count: 12 },
    { id: 'board', name: '이사회·경영', icon: '👔', count: 13 },
    { id: 'ma', name: '합병·분할', icon: '🔄', count: 12 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/business/cpa" className="text-gray-500 hover:text-gray-700">공인회계사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-purple-600 font-medium">상법</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">⚖️</div>
            <div>
              <h1 className="text-2xl font-bold">상법</h1>
              <p className="text-purple-100">1차 시험 40문항 | 회사법 중심</p>
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
                    ? 'bg-purple-100 border-2 border-purple-300'
                    : 'bg-white border border-gray-200 hover:border-purple-200'
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
                              ? 'bg-purple-500 border-purple-500 text-white'
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
                              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition flex-shrink-0"
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
          <Link href="/category/business/cpa/study/economics" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 경제원론
          </Link>
          <Link href="/category/business/cpa/study/tax-intro" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            세법개론 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 상법 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
