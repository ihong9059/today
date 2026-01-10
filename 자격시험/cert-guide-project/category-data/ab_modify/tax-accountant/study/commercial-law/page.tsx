'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CommercialLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['company-formation']);

  useEffect(() => {
    const saved = localStorage.getItem('tax-accountant-commercial-law-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tax-accountant-commercial-law-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 회사설립 (1-13)
    { id: 1, topic: 'company-formation', question: '회사의 종류와 특징을 비교하시오.', answer: '합명회사, 합자회사, 유한책임회사, 주식회사, 유한회사가 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 회사의 종류와 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 인적회사와 물적회사\n2. 합명회사·합자회사 특징\n3. 주식회사·유한회사 특징\n4. 각 회사형태의 장단점\n5. 연습문제 3개' },
    { id: 2, topic: 'company-formation', question: '발기설립과 모집설립의 절차를 비교하시오.', answer: '발기설립은 발기인이 전 주식을 인수하고, 모집설립은 일부를 모집한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 발기설립과 모집설립의 절차를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 발기설립 절차\n2. 모집설립 절차\n3. 창립총회\n4. 설립등기\n5. 연습문제 3개' },
    { id: 3, topic: 'company-formation', question: '발기인의 권한과 책임을 설명하시오.', answer: '발기인은 설립사무를 수행하며 회사 및 제3자에 대한 책임을 진다.', prompt: '세무사 상법 문제입니다.\n\n문제: 발기인의 권한과 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발기인의 자격과 수\n2. 발기인의 권한\n3. 회사에 대한 책임\n4. 제3자에 대한 책임\n5. 연습문제 3개' },
    { id: 4, topic: 'company-formation', question: '정관의 기재사항(절대적·상대적·임의적)을 구분하시오.', answer: '절대적 기재사항은 필수, 상대적 기재사항은 효력요건, 임의적 기재사항은 선택이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 정관의 기재사항(절대적·상대적·임의적)을 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 절대적 기재사항\n2. 상대적 기재사항\n3. 임의적 기재사항\n4. 정관변경 절차\n5. 연습문제 3개' },
    { id: 5, topic: 'company-formation', question: '변태설립사항의 종류와 검사인 조사를 설명하시오.', answer: '현물출자, 재산인수, 발기인 특별이익, 설립비용이 변태설립사항이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 변태설립사항의 종류와 검사인 조사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변태설립사항의 취지\n2. 현물출자\n3. 재산인수\n4. 검사인 조사 절차\n5. 연습문제 3개' },
    { id: 6, topic: 'company-formation', question: '설립무효와 설립취소의 차이를 설명하시오.', answer: '설립무효는 객관적 하자, 설립취소는 의사표시의 하자가 원인이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 설립무효와 설립취소의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설립무효의 원인\n2. 설립취소의 원인\n3. 소의 제기권자와 기간\n4. 판결의 효력\n5. 연습문제 3개' },
    { id: 7, topic: 'company-formation', question: '자본금과 자본준비금의 차이를 설명하시오.', answer: '자본금은 발행주식 액면총액, 자본준비금은 자본거래로 발생한 잉여금이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 자본금과 자본준비금의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본금의 의의\n2. 자본준비금의 종류\n3. 준비금의 사용\n4. 자본의 3원칙\n5. 연습문제 3개' },
    { id: 8, topic: 'company-formation', question: '회사의 능력(권리능력, 행위능력, 불법행위능력)을 설명하시오.', answer: '회사는 정관의 목적범위 내에서 권리능력을 가지며 이사의 행위로 책임을 진다.', prompt: '세무사 상법 문제입니다.\n\n문제: 회사의 능력(권리능력, 행위능력, 불법행위능력)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 권리능력의 범위\n2. 목적범위 내 행위\n3. 대표기관의 행위\n4. 불법행위책임\n5. 연습문제 3개' },
    { id: 9, topic: 'company-formation', question: '유한책임회사의 설립과 특징을 설명하시오.', answer: '사원 전원이 유한책임을 지며 정관자치가 강화된 회사형태이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 유한책임회사의 설립과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유한책임회사의 정의\n2. 설립 절차\n3. 업무집행사원\n4. 주식회사와의 비교\n5. 연습문제 3개' },
    { id: 10, topic: 'company-formation', question: '설립 시 출자의 이행과 가장납입의 효과를 설명하시오.', answer: '출자 이행이 없으면 실권되며, 가장납입은 형사처벌 대상이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 설립 시 출자의 이행과 가장납입의 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 출자 이행의 의의\n2. 납입과 현물출자 이행\n3. 가장납입의 효력\n4. 형사책임\n5. 연습문제 3개' },
    { id: 11, topic: 'company-formation', question: '설립 후 재산인수와 사후설립을 비교하시오.', answer: '재산인수는 설립 전 계약, 사후설립은 설립 후 2년 내 계약이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 설립 후 재산인수와 사후설립을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 재산인수의 의의\n2. 사후설립의 요건\n3. 주주총회 승인\n4. 위반의 효과\n5. 연습문제 3개' },
    { id: 12, topic: 'company-formation', question: '회사의 상호와 상호권을 설명하시오.', answer: '회사는 반드시 종류를 표시하고, 상호등기로 배타적 권리를 가진다.', prompt: '세무사 상법 문제입니다.\n\n문제: 회사의 상호와 상호권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상호의 선정\n2. 유사상호 금지\n3. 상호등기의 효력\n4. 상호의 양도\n5. 연습문제 3개' },
    { id: 13, topic: 'company-formation', question: '본점과 지점의 등기사항을 설명하시오.', answer: '본점 소재지에서 2주 내 설립등기를 하고, 지점은 3주 내에 등기한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 본점과 지점의 등기사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 본점 등기사항\n2. 지점 등기사항\n3. 등기의 효력\n4. 등기 해태의 효과\n5. 연습문제 3개' },

    // 주식과 주주 (14-25)
    { id: 14, topic: 'stocks-shareholders', question: '주식의 의의와 종류를 설명하시오.', answer: '주식은 자본의 구성단위로 보통주, 우선주, 무의결권주 등이 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주식의 의의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주식의 개념\n2. 보통주와 우선주\n3. 종류주식\n4. 주식의 단위\n5. 연습문제 3개' },
    { id: 15, topic: 'stocks-shareholders', question: '주권의 발행과 효력을 설명하시오.', answer: '주권은 기명식으로 발행하며 유가증권으로서 권리를 표창한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주권의 발행과 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주권의 의의\n2. 주권 기재사항\n3. 주권의 효력\n4. 주권 미발행의 효과\n5. 연습문제 3개' },
    { id: 16, topic: 'stocks-shareholders', question: '주식양도의 방법과 제한을 설명하시오.', answer: '주권 교부로 양도하며, 정관으로 이사회 승인을 요건으로 할 수 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주식양도의 방법과 제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주식양도의 자유\n2. 주권에 의한 양도\n3. 정관에 의한 제한\n4. 법률에 의한 제한\n5. 연습문제 3개' },
    { id: 17, topic: 'stocks-shareholders', question: '주주명부의 기능과 명의개서 절차를 설명하시오.', answer: '주주명부 기재로 회사에 대항할 수 있으며 명의개서 청구권이 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주주명부의 기능과 명의개서 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주주명부의 의의\n2. 기재사항\n3. 명의개서 청구\n4. 명의개서의 효력\n5. 연습문제 3개' },
    { id: 18, topic: 'stocks-shareholders', question: '주주의 권리(자익권, 공익권)를 구분하시오.', answer: '자익권은 경제적 이익, 공익권은 회사경영 참여를 위한 권리이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주주의 권리(자익권, 공익권)를 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 자익권의 종류\n2. 공익권의 종류\n3. 단독주주권과 소수주주권\n4. 주주평등의 원칙\n5. 연습문제 3개' },
    { id: 19, topic: 'stocks-shareholders', question: '신주발행의 절차와 기존 주주의 신주인수권을 설명하시오.', answer: '이사회 결의로 발행하며, 주주는 지분비율로 신주인수권을 가진다.', prompt: '세무사 상법 문제입니다.\n\n문제: 신주발행의 절차와 기존 주주의 신주인수권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신주발행 결정기관\n2. 주주의 신주인수권\n3. 제3자 배정\n4. 납입과 주금납입\n5. 연습문제 3개' },
    { id: 20, topic: 'stocks-shareholders', question: '신주발행무효의 소와 부존재확인의 소를 비교하시오.', answer: '무효의 소는 제소기간이 있으나, 부존재확인의 소는 기간 제한이 없다.', prompt: '세무사 상법 문제입니다.\n\n문제: 신주발행무효의 소와 부존재확인의 소를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 무효사유\n2. 제소권자와 기간\n3. 부존재확인의 소\n4. 판결의 효력\n5. 연습문제 3개' },
    { id: 21, topic: 'stocks-shareholders', question: '자기주식의 취득과 처분을 설명하시오.', answer: '배당가능이익 범위 내에서 취득 가능하며, 상당 기간 내 처분해야 한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 자기주식의 취득과 처분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기주식 취득 허용사유\n2. 취득한도\n3. 자기주식의 지위\n4. 처분과 소각\n5. 연습문제 3개' },
    { id: 22, topic: 'stocks-shareholders', question: '주식배당과 현금배당을 비교하시오.', answer: '주식배당은 신주 발행으로, 현금배당은 금전 지급으로 이익을 배당한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주식배당과 현금배당을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 배당가능이익\n2. 현금배당 절차\n3. 주식배당 절차\n4. 중간배당\n5. 연습문제 3개' },
    { id: 23, topic: 'stocks-shareholders', question: '주식매수청구권의 발생사유와 행사절차를 설명하시오.', answer: '합병 등 반대주주는 주식을 공정가액으로 매수청구할 수 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주식매수청구권의 발생사유와 행사절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발생사유\n2. 반대의사 통지\n3. 매수가액 결정\n4. 효과\n5. 연습문제 3개' },
    { id: 24, topic: 'stocks-shareholders', question: '주식의 소각과 자본감소 절차를 설명하시오.', answer: '이익소각은 이사회 결의로, 자본감소는 주주총회 특별결의가 필요하다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주식의 소각과 자본감소 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이익소각\n2. 자본감소의 방법\n3. 채권자보호절차\n4. 감자무효의 소\n5. 연습문제 3개' },
    { id: 25, topic: 'stocks-shareholders', question: '전환주식과 상환주식의 특징을 비교하시오.', answer: '전환주식은 다른 종류주식으로, 상환주식은 금전으로 상환받는 주식이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 전환주식과 상환주식의 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 전환주식의 발행\n2. 전환권 행사\n3. 상환주식의 발행\n4. 상환 절차\n5. 연습문제 3개' },

    // 이사회와 경영 (26-38)
    { id: 26, topic: 'board-management', question: '주주총회의 권한과 결의방법을 설명하시오.', answer: '주주총회는 법령·정관 사항을 결의하며 보통결의와 특별결의가 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주주총회의 권한과 결의방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주주총회의 권한\n2. 보통결의 요건\n3. 특별결의 요건\n4. 결의취소·무효\n5. 연습문제 3개' },
    { id: 27, topic: 'board-management', question: '이사의 선임과 해임 절차를 설명하시오.', answer: '주주총회 보통결의로 선임하고, 언제든 해임할 수 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 이사의 선임과 해임 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이사의 자격과 수\n2. 선임 결의\n3. 해임 결의\n4. 정당한 이유 없는 해임\n5. 연습문제 3개' },
    { id: 28, topic: 'board-management', question: '이사회의 구성과 결의방법을 설명하시오.', answer: '이사 전원으로 구성되며 과반수 출석과 출석이사 과반수로 결의한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 이사회의 구성과 결의방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이사회의 구성\n2. 소집 절차\n3. 결의 요건\n4. 의사록 작성\n5. 연습문제 3개' },
    { id: 29, topic: 'board-management', question: '대표이사의 권한과 대표권 제한을 설명하시오.', answer: '대표이사는 업무집행과 회사 대표 권한을 가지며 제한은 선의 제3자에 대항 불가하다.', prompt: '세무사 상법 문제입니다.\n\n문제: 대표이사의 권한과 대표권 제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대표이사의 선임\n2. 대표권의 범위\n3. 대표권 제한\n4. 공동대표이사\n5. 연습문제 3개' },
    { id: 30, topic: 'board-management', question: '이사의 충실의무와 경업금지의무를 설명하시오.', answer: '이사는 회사이익을 위해 충실해야 하며 이사회 승인 없이 경업하지 못한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 이사의 충실의무와 경업금지의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충실의무의 내용\n2. 경업금지의무\n3. 이사회 승인\n4. 위반의 효과\n5. 연습문제 3개' },
    { id: 31, topic: 'board-management', question: '이사의 자기거래와 회사기회 유용금지를 설명하시오.', answer: '이사가 회사와 거래하려면 이사회 승인이 필요하고 회사기회를 유용하면 안 된다.', prompt: '세무사 상법 문제입니다.\n\n문제: 이사의 자기거래와 회사기회 유용금지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기거래의 범위\n2. 이사회 승인 절차\n3. 회사기회 유용금지\n4. 위반의 효과\n5. 연습문제 3개' },
    { id: 32, topic: 'board-management', question: '이사의 회사에 대한 책임과 주주대표소송을 설명하시오.', answer: '이사는 임무해태로 회사에 손해배상책임을 지며, 주주는 대표소송을 제기할 수 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 이사의 회사에 대한 책임과 주주대표소송을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손해배상책임 요건\n2. 책임의 면제\n3. 주주대표소송 절차\n4. 판결의 효력\n5. 연습문제 3개' },
    { id: 33, topic: 'board-management', question: '이사의 제3자에 대한 책임을 설명하시오.', answer: '이사가 고의 또는 중대한 과실로 제3자에게 손해를 가하면 책임을 진다.', prompt: '세무사 상법 문제입니다.\n\n문제: 이사의 제3자에 대한 책임을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 책임의 성질\n2. 요건\n3. 제3자의 범위\n4. 연대책임\n5. 연습문제 3개' },
    { id: 34, topic: 'board-management', question: '감사와 감사위원회의 권한을 비교하시오.', answer: '감사는 단독기관, 감사위원회는 이사회 내 위원회로 업무·회계 감사권을 가진다.', prompt: '세무사 상법 문제입니다.\n\n문제: 감사와 감사위원회의 권한을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 감사의 선임과 권한\n2. 감사위원회 구성\n3. 업무감사권\n4. 회계감사권\n5. 연습문제 3개' },
    { id: 35, topic: 'board-management', question: '집행임원제도의 내용을 설명하시오.', answer: '이사회가 집행임원에게 업무집행을 위임하여 감독과 집행을 분리한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 집행임원제도의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집행임원의 의의\n2. 선임과 해임\n3. 권한과 의무\n4. 책임\n5. 연습문제 3개' },
    { id: 36, topic: 'board-management', question: '사외이사의 자격과 역할을 설명하시오.', answer: '사외이사는 경영감시 기능을 수행하며 독립성 요건을 갖추어야 한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 사외이사의 자격과 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사외이사의 의의\n2. 자격 요건\n3. 선임의무회사\n4. 역할과 책임\n5. 연습문제 3개' },
    { id: 37, topic: 'board-management', question: '경영판단의 원칙(Business Judgment Rule)을 설명하시오.', answer: '선의로 합리적 판단을 한 이사는 결과가 나빠도 책임이 면제된다.', prompt: '세무사 상법 문제입니다.\n\n문제: 경영판단의 원칙(Business Judgment Rule)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경영판단원칙의 의의\n2. 적용 요건\n3. 판례의 태도\n4. 한계와 비판\n5. 연습문제 3개' },
    { id: 38, topic: 'board-management', question: '지배주주의 책임과 소수주주 보호를 설명하시오.', answer: '지배주주는 영향력 행사에 따른 책임을 지며 소수주주권으로 보호한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 지배주주의 책임과 소수주주 보호를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지배주주의 의의\n2. 지배주주의 책임\n3. 소수주주권 종류\n4. 주주총회 소집청구권\n5. 연습문제 3개' },

    // 합병과 분할 (39-50)
    { id: 39, topic: 'merger-division', question: '합병의 종류와 절차를 설명하시오.', answer: '흡수합병과 신설합병이 있으며 주주총회 특별결의가 필요하다.', prompt: '세무사 상법 문제입니다.\n\n문제: 합병의 종류와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 흡수합병과 신설합병\n2. 합병계약서 작성\n3. 주주총회 승인\n4. 채권자보호절차\n5. 연습문제 3개' },
    { id: 40, topic: 'merger-division', question: '합병비율의 결정과 공정성을 설명하시오.', answer: '회사가치를 평가하여 신주 배정비율을 정하며 불공정하면 무효사유가 된다.', prompt: '세무사 상법 문제입니다.\n\n문제: 합병비율의 결정과 공정성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합병비율의 의의\n2. 평가방법\n3. 불공정 합병비율\n4. 주주의 구제\n5. 연습문제 3개' },
    { id: 41, topic: 'merger-division', question: '합병무효의 소의 원인과 효과를 설명하시오.', answer: '절차상 하자가 있으면 6개월 내에 합병무효의 소를 제기할 수 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 합병무효의 소의 원인과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무효사유\n2. 제소권자와 기간\n3. 판결의 효력\n4. 합병 후 법률관계\n5. 연습문제 3개' },
    { id: 42, topic: 'merger-division', question: '간이합병과 소규모합병을 비교하시오.', answer: '간이합병은 피합병회사, 소규모합병은 합병회사의 주총을 생략할 수 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 간이합병과 소규모합병을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 간이합병의 요건\n2. 소규모합병의 요건\n3. 반대주주의 보호\n4. 절차의 간소화\n5. 연습문제 3개' },
    { id: 43, topic: 'merger-division', question: '회사분할의 종류와 절차를 설명하시오.', answer: '단순분할, 분할합병, 물적분할이 있으며 주주총회 특별결의가 필요하다.', prompt: '세무사 상법 문제입니다.\n\n문제: 회사분할의 종류와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분할의 유형\n2. 분할계획서 작성\n3. 주주총회 승인\n4. 채권자보호\n5. 연습문제 3개' },
    { id: 44, topic: 'merger-division', question: '분할 시 채권자 보호절차를 설명하시오.', answer: '채권자는 이의를 신청할 수 있으며 분할회사들은 연대책임을 진다.', prompt: '세무사 상법 문제입니다.\n\n문제: 분할 시 채권자 보호절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 채권자 이의 절차\n2. 연대책임\n3. 책임제한 특약\n4. 분할무효의 소\n5. 연습문제 3개' },
    { id: 45, topic: 'merger-division', question: '주식교환과 주식이전의 차이를 설명하시오.', answer: '주식교환은 기존 완전모회사에, 주식이전은 신설 완전모회사에 주식을 이전한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 주식교환과 주식이전의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주식교환의 의의\n2. 주식이전의 의의\n3. 절차의 비교\n4. 효과의 비교\n5. 연습문제 3개' },
    { id: 46, topic: 'merger-division', question: '영업양도와 합병의 차이를 설명하시오.', answer: '영업양도는 개별재산 이전, 합병은 포괄적 권리의무 승계이다.', prompt: '세무사 상법 문제입니다.\n\n문제: 영업양도와 합병의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업양도의 개념\n2. 합병과의 비교\n3. 주주총회 결의\n4. 채권자 보호\n5. 연습문제 3개' },
    { id: 47, topic: 'merger-division', question: '삼각합병의 개념과 특징을 설명하시오.', answer: '모회사 주식을 합병대가로 지급하는 방식으로 모회사의 지배력을 유지한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 삼각합병의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 삼각합병의 의의\n2. 정삼각합병과 역삼각합병\n3. 절차\n4. 세법상 취급\n5. 연습문제 3개' },
    { id: 48, topic: 'merger-division', question: '해산사유와 청산절차를 설명하시오.', answer: '존립기간 만료, 합병, 파산 등으로 해산하고 청산절차를 거쳐 소멸한다.', prompt: '세무사 상법 문제입니다.\n\n문제: 해산사유와 청산절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해산사유\n2. 청산인 선임\n3. 청산사무\n4. 잔여재산 분배\n5. 연습문제 3개' },
    { id: 49, topic: 'merger-division', question: '회사의 계속(해산 취소)을 설명하시오.', answer: '해산등기 후에도 주주총회 특별결의로 회사를 계속할 수 있다.', prompt: '세무사 상법 문제입니다.\n\n문제: 회사의 계속(해산 취소)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회사계속의 의의\n2. 요건\n3. 절차\n4. 효과\n5. 연습문제 3개' },
    { id: 50, topic: 'merger-division', question: '조직변경의 종류와 절차를 설명하시오.', answer: '유한회사와 주식회사 간 조직변경이 가능하며 총사원(총회) 동의가 필요하다.', prompt: '세무사 상법 문제입니다.\n\n문제: 조직변경의 종류와 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직변경의 의의\n2. 허용되는 조직변경\n3. 결의 요건\n4. 등기와 효력\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'company-formation', name: '회사설립', count: 13 },
    { id: 'stocks-shareholders', name: '주식과 주주', count: 12 },
    { id: 'board-management', name: '이사회와 경영', count: 13 },
    { id: 'merger-division', name: '합병과 분할', count: 12 },
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
            <Link href="/category/accounting/tax-accountant" className="text-gray-500 hover:text-gray-700">세무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">상법</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">⚖️ 상법</h1>
          <p className="text-gray-600">세무사 1차 시험 | 40문항 | 60분</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">학습 진행률</span>
            <span className="text-emerald-600 font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
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
                        <input type="checkbox" checked={completedQuestions.includes(q.id)} onChange={() => toggleQuestion(q.id)} className="mt-1 w-5 h-5 text-emerald-600 rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-2">💡 {q.answer}</p>
                          <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition">🤖 AI</button>
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
          <Link href="/category/accounting/tax-accountant/study/accounting-intro" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 회계학개론</Link>
          <Link href="/category/accounting/tax-accountant/study/tax-law-advanced" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">다음: 세법학 심화 →</Link>
        </div>
      </main>

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
