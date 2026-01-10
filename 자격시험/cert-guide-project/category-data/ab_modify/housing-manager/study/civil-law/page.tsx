'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CivilLawStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('housing-civil-law-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('housing-civil-law-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '민법총칙',
      questions: [
        { id: 1, question: '민법의 기본원칙 중 사적자치의 원칙이란 무엇인가?', answer: '개인은 자신의 법률관계를 스스로의 의사에 따라 자유롭게 형성할 수 있다는 원칙', prompt: '주택관리사 민법 문제입니다.\n\n문제: 민법의 기본원칙 중 사적자치의 원칙이란 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 사적자치 원칙의 정의와 의의\n2. 주택관리 실무에서의 적용 예시\n3. 제한되는 경우\n4. 관련 판례\n5. 연습문제 3개' },
        { id: 2, question: '권리능력과 행위능력의 차이점을 설명하시오.', answer: '권리능력은 권리·의무의 주체가 될 수 있는 자격, 행위능력은 단독으로 법률행위를 할 수 있는 자격', prompt: '주택관리사 민법 문제입니다.\n\n문제: 권리능력과 행위능력의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 권리능력의 개념과 취득시기\n2. 행위능력의 개념과 종류\n3. 제한능력자 제도\n4. 주택관리 실무 적용\n5. 연습문제 3개' },
        { id: 3, question: '법인의 종류와 설립요건을 설명하시오.', answer: '사단법인(사원의 결합)과 재단법인(재산의 집합)으로 구분, 정관작성과 설립등기 필요', prompt: '주택관리사 민법 문제입니다.\n\n문제: 법인의 종류와 설립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사단법인과 재단법인의 구별\n2. 영리법인과 비영리법인\n3. 법인 설립절차\n4. 입주자대표회의의 법인격\n5. 연습문제 3개' },
        { id: 4, question: '법률행위의 무효와 취소의 차이점은?', answer: '무효는 처음부터 효력이 없고, 취소는 취소권 행사 전까지 유효하다가 취소 시 소급 무효', prompt: '주택관리사 민법 문제입니다.\n\n문제: 법률행위의 무효와 취소의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 무효의 개념과 효과\n2. 취소의 개념과 효과\n3. 무효사유와 취소사유\n4. 주택관리 계약에서의 적용\n5. 연습문제 3개' },
        { id: 5, question: '대리의 종류와 무권대리의 효과를 설명하시오.', answer: '임의대리와 법정대리, 무권대리는 본인에게 효력 없으나 추인 시 유효', prompt: '주택관리사 민법 문제입니다.\n\n문제: 대리의 종류와 무권대리의 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대리의 개념과 요건\n2. 임의대리와 법정대리\n3. 무권대리와 표현대리\n4. 관리사무소장의 대리권\n5. 연습문제 3개' },
        { id: 6, question: '소멸시효의 요건과 효과를 설명하시오.', answer: '권리를 행사할 수 있는 때부터 일정 기간 권리를 행사하지 않으면 권리 소멸', prompt: '주택관리사 민법 문제입니다.\n\n문제: 소멸시효의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소멸시효의 의의\n2. 시효기간(채권 10년, 부동산외 3년)\n3. 시효의 중단과 정지\n4. 관리비 청구권과 소멸시효\n5. 연습문제 3개' },
        { id: 7, question: '조건과 기한의 차이점을 설명하시오.', answer: '조건은 발생 여부가 불확실한 장래사실, 기한은 발생이 확실한 장래사실', prompt: '주택관리사 민법 문제입니다.\n\n문제: 조건과 기한의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조건의 개념과 종류\n2. 기한의 개념과 종류\n3. 조건부 법률행위\n4. 관리계약에서의 적용\n5. 연습문제 3개' },
        { id: 8, question: '의사표시의 하자 유형을 설명하시오.', answer: '비진의표시, 허위표시, 착오, 사기, 강박에 의한 의사표시', prompt: '주택관리사 민법 문제입니다.\n\n문제: 의사표시의 하자 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비진의표시와 허위표시\n2. 착오에 의한 의사표시\n3. 사기·강박에 의한 의사표시\n4. 각 유형의 효과\n5. 연습문제 3개' },
        { id: 9, question: '실종선고의 요건과 효과는 무엇인가?', answer: '5년간(위난 1년) 생사불명 시 이해관계인 청구로 선고, 사망 의제', prompt: '주택관리사 민법 문제입니다.\n\n문제: 실종선고의 요건과 효과는 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 실종선고 요건\n2. 실종선고의 효과\n3. 실종선고 취소\n4. 부재자 재산관리\n5. 연습문제 3개' },
        { id: 10, question: '법률행위의 해석 원칙을 설명하시오.', answer: '당사자의 진정한 의사 탐구, 계약의 목적과 거래관행 고려', prompt: '주택관리사 민법 문제입니다.\n\n문제: 법률행위의 해석 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의사주의와 표시주의\n2. 해석의 기준\n3. 보충적 해석\n4. 관리규약 해석 사례\n5. 연습문제 3개' }
      ]
    },
    {
      name: '물권법 총론',
      questions: [
        { id: 11, question: '물권의 특성과 효력을 설명하시오.', answer: '배타성, 절대성, 직접지배성이 있으며 물권적 청구권과 우선적 효력 발생', prompt: '주택관리사 민법 문제입니다.\n\n문제: 물권의 특성과 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물권의 정의와 특성\n2. 물권법정주의\n3. 물권적 청구권\n4. 채권과의 비교\n5. 연습문제 3개' },
        { id: 12, question: '물권변동의 공시방법을 설명하시오.', answer: '부동산은 등기, 동산은 인도(점유이전)', prompt: '주택관리사 민법 문제입니다.\n\n문제: 물권변동의 공시방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공시의 원칙\n2. 부동산 등기제도\n3. 동산의 인도방법\n4. 공신의 원칙\n5. 연습문제 3개' },
        { id: 13, question: '부동산 물권변동의 성립요건주의를 설명하시오.', answer: '부동산 물권변동은 등기해야 효력 발생(형식주의)', prompt: '주택관리사 민법 문제입니다.\n\n문제: 부동산 물권변동의 성립요건주의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성립요건주의의 의의\n2. 의사주의와의 비교\n3. 등기의 종류\n4. 아파트 소유권 이전등기\n5. 연습문제 3개' },
        { id: 14, question: '등기의 추정력과 공신력의 차이점은?', answer: '추정력은 등기내용이 진정하다는 추정, 공신력은 등기를 신뢰한 자 보호(우리나라 부정)', prompt: '주택관리사 민법 문제입니다.\n\n문제: 등기의 추정력과 공신력의 차이점은?\n\n다음 순서로 설명해주세요:\n1. 등기의 추정력\n2. 공신력의 개념\n3. 우리나라 등기의 공신력 여부\n4. 선의취득 제도\n5. 연습문제 3개' },
        { id: 15, question: '물권적 청구권의 종류와 내용을 설명하시오.', answer: '반환청구권, 방해배제청구권, 방해예방청구권', prompt: '주택관리사 민법 문제입니다.\n\n문제: 물권적 청구권의 종류와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물권적 청구권의 의의\n2. 세 가지 청구권 비교\n3. 소유물반환청구권 요건\n4. 공동주택 분쟁 적용\n5. 연습문제 3개' },
        { id: 16, question: '점유권의 취득과 효력을 설명하시오.', answer: '물건을 사실상 지배하는 것으로 취득, 점유보호청구권 발생', prompt: '주택관리사 민법 문제입니다.\n\n문제: 점유권의 취득과 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점유의 개념과 종류\n2. 점유의 취득과 상실\n3. 점유보호청구권\n4. 점유와 소유의 관계\n5. 연습문제 3개' },
        { id: 17, question: '물권의 소멸사유를 설명하시오.', answer: '목적물 멸실, 포기, 혼동, 소멸시효 완성 등', prompt: '주택관리사 민법 문제입니다.\n\n문제: 물권의 소멸사유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절대적 소멸사유\n2. 상대적 소멸사유\n3. 혼동의 예외\n4. 담보물권의 소멸\n5. 연습문제 3개' },
        { id: 18, question: '준물권적 청구권이란 무엇인가?', answer: '채권자가 물권적 청구권에 준하여 인정받는 청구권(임차권 등)', prompt: '주택관리사 민법 문제입니다.\n\n문제: 준물권적 청구권이란 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 준물권적 청구권의 의의\n2. 인정 근거\n3. 임차권의 물권화\n4. 주택임대차와의 관계\n5. 연습문제 3개' },
        { id: 19, question: '일물일권주의란 무엇인가?', answer: '하나의 물건에 하나의 물권만 성립하고, 하나의 물권은 하나의 물건 위에만 성립', prompt: '주택관리사 민법 문제입니다.\n\n문제: 일물일권주의란 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 일물일권주의의 의의\n2. 예외 사례\n3. 집합건물에서의 적용\n4. 구분소유권과의 관계\n5. 연습문제 3개' },
        { id: 20, question: '부동산 이중양도 시 법률관계를 설명하시오.', answer: '먼저 등기한 자가 소유권 취득, 선의·악의 불문', prompt: '주택관리사 민법 문제입니다.\n\n문제: 부동산 이중양도 시 법률관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이중양도의 개념\n2. 소유권 귀속 결정 기준\n3. 양도인의 책임\n4. 판례 분석\n5. 연습문제 3개' }
      ]
    },
    {
      name: '소유권과 용익물권',
      questions: [
        { id: 21, question: '소유권의 내용과 제한을 설명하시오.', answer: '사용·수익·처분권을 가지나 공공복리에 의해 제한 가능', prompt: '주택관리사 민법 문제입니다.\n\n문제: 소유권의 내용과 제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소유권의 개념\n2. 소유권의 내용(사용·수익·처분)\n3. 소유권의 제한\n4. 아파트 소유권의 특수성\n5. 연습문제 3개' },
        { id: 22, question: '공유와 합유, 총유의 차이점을 설명하시오.', answer: '공유는 지분에 따른 분할소유, 합유는 조합적, 총유는 법인 아닌 사단 소유형태', prompt: '주택관리사 민법 문제입니다.\n\n문제: 공유와 합유, 총유의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공동소유의 유형\n2. 공유의 특징과 분할\n3. 합유와 총유의 구별\n4. 아파트 공용부분의 소유형태\n5. 연습문제 3개' },
        { id: 23, question: '상린관계란 무엇인가?', answer: '인접 부동산 소유자 간의 이용조절 관계', prompt: '주택관리사 민법 문제입니다.\n\n문제: 상린관계란 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 상린관계의 의의\n2. 상린관계의 내용\n3. 경계선 관련 규정\n4. 아파트 층간소음 문제\n5. 연습문제 3개' },
        { id: 24, question: '지상권의 내용과 존속기간을 설명하시오.', answer: '타인 토지에 건물 등을 소유하기 위한 물권, 최단 30년', prompt: '주택관리사 민법 문제입니다.\n\n문제: 지상권의 내용과 존속기간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지상권의 의의와 성질\n2. 지상권의 존속기간\n3. 지상권과 임차권의 비교\n4. 분묘기지권, 법정지상권\n5. 연습문제 3개' },
        { id: 25, question: '지역권의 개념과 종류를 설명하시오.', answer: '타인 토지를 자기 토지의 편익에 이용하는 물권, 통행지역권 등', prompt: '주택관리사 민법 문제입니다.\n\n문제: 지역권의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지역권의 의의\n2. 요역지와 승역지\n3. 지역권의 종류\n4. 통행지역권 분쟁\n5. 연습문제 3개' },
        { id: 26, question: '전세권의 내용과 효력을 설명하시오.', answer: '전세금 지급하고 타인 부동산을 사용·수익하는 물권', prompt: '주택관리사 민법 문제입니다.\n\n문제: 전세권의 내용과 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전세권의 의의와 성질\n2. 전세권의 존속기간\n3. 전세금반환청구권\n4. 전세권과 임차권 비교\n5. 연습문제 3개' },
        { id: 27, question: '구분소유권이란 무엇인가?', answer: '1동의 건물 중 구조상 독립한 부분을 목적으로 하는 소유권', prompt: '주택관리사 민법 문제입니다.\n\n문제: 구분소유권이란 무엇인가?\n\n다음 순서로 설명해주세요:\n1. 구분소유의 개념\n2. 전유부분과 공용부분\n3. 대지사용권\n4. 집합건물법과의 관계\n5. 연습문제 3개' },
        { id: 28, question: '취득시효의 요건과 효과를 설명하시오.', answer: '20년(등기부)/10년(등기부+선의무과실) 점유로 소유권 취득', prompt: '주택관리사 민법 문제입니다.\n\n문제: 취득시효의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득시효의 의의\n2. 부동산 취득시효 요건\n3. 점유의 태양\n4. 시효취득과 등기\n5. 연습문제 3개' },
        { id: 29, question: '첨부(부합, 혼화, 가공)의 효과를 설명하시오.', answer: '물건이 결합하여 분리 불가능 시 주된 물건 소유자가 소유권 취득', prompt: '주택관리사 민법 문제입니다.\n\n문제: 첨부(부합, 혼화, 가공)의 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 첨부의 의의\n2. 부합, 혼화, 가공의 구별\n3. 소유권 귀속 결정\n4. 보상청구권\n5. 연습문제 3개' },
        { id: 30, question: '공유물의 분할청구권을 설명하시오.', answer: '공유자는 언제든지 공유물 분할을 청구할 수 있음(5년 불분할 특약 가능)', prompt: '주택관리사 민법 문제입니다.\n\n문제: 공유물의 분할청구권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공유물 분할청구권의 의의\n2. 분할 방법\n3. 불분할 특약\n4. 아파트 공용부분과 분할\n5. 연습문제 3개' }
      ]
    },
    {
      name: '담보물권',
      questions: [
        { id: 31, question: '저당권의 성립요건과 효력을 설명하시오.', answer: '부동산을 담보로 채권 담보, 설정등기로 성립', prompt: '주택관리사 민법 문제입니다.\n\n문제: 저당권의 성립요건과 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저당권의 의의와 성질\n2. 설정요건(합의+등기)\n3. 피담보채권의 범위\n4. 우선변제권\n5. 연습문제 3개' },
        { id: 32, question: '저당권의 물상대위성이란?', answer: '저당물의 매각·멸실 등으로 채무자가 받을 금전에 대해서도 저당권 행사 가능', prompt: '주택관리사 민법 문제입니다.\n\n문제: 저당권의 물상대위성이란?\n\n다음 순서로 설명해주세요:\n1. 물상대위의 개념\n2. 대위 목적물\n3. 압류 요건\n4. 실무 적용 사례\n5. 연습문제 3개' },
        { id: 33, question: '근저당권의 특징을 설명하시오.', answer: '계속적 거래에서 발생하는 불특정 채권을 담보, 채권최고액 설정', prompt: '주택관리사 민법 문제입니다.\n\n문제: 근저당권의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근저당권의 의의\n2. 저당권과의 차이\n3. 채권최고액\n4. 확정과 소멸\n5. 연습문제 3개' },
        { id: 34, question: '질권의 성립과 효력을 설명하시오.', answer: '동산이나 권리를 점유하면서 담보로 제공, 인도가 성립요건', prompt: '주택관리사 민법 문제입니다.\n\n문제: 질권의 성립과 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 질권의 의의\n2. 동산질권과 권리질권\n3. 질권 설정요건\n4. 저당권과의 비교\n5. 연습문제 3개' },
        { id: 35, question: '유치권의 성립요건과 효력을 설명하시오.', answer: '타인의 물건을 점유한 자가 그 물건에 관한 채권이 있을 때 변제받을 때까지 유치', prompt: '주택관리사 민법 문제입니다.\n\n문제: 유치권의 성립요건과 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유치권의 의의\n2. 성립요건 4가지\n3. 유치권의 효력\n4. 아파트 공사대금과 유치권\n5. 연습문제 3개' },
        { id: 36, question: '법정지상권의 성립요건을 설명하시오.', answer: '저당권 설정 당시 토지와 건물 소유자 동일, 경매로 소유자 달라질 때 성립', prompt: '주택관리사 민법 문제입니다.\n\n문제: 법정지상권의 성립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법정지상권의 의의\n2. 민법상 법정지상권(제366조)\n3. 관습법상 법정지상권\n4. 판례 분석\n5. 연습문제 3개' },
        { id: 37, question: '물상보증인의 권리를 설명하시오.', answer: '변제 시 채권자 대위, 구상권 행사 가능', prompt: '주택관리사 민법 문제입니다.\n\n문제: 물상보증인의 권리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물상보증인의 개념\n2. 보증인과의 차이\n3. 변제자 대위\n4. 구상권 행사\n5. 연습문제 3개' },
        { id: 38, question: '공동저당의 배당방법을 설명하시오.', answer: '동시배당 시 각 부동산 가액에 비례, 이시배당 시 후순위권자 대위', prompt: '주택관리사 민법 문제입니다.\n\n문제: 공동저당의 배당방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공동저당의 의의\n2. 동시배당과 이시배당\n3. 후순위권자의 대위\n4. 배당사례 분석\n5. 연습문제 3개' },
        { id: 39, question: '담보물권의 부종성과 수반성을 설명하시오.', answer: '부종성은 피담보채권과 함께 성립·소멸, 수반성은 채권 이전시 함께 이전', prompt: '주택관리사 민법 문제입니다.\n\n문제: 담보물권의 부종성과 수반성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 담보물권의 통유성\n2. 부종성의 의미\n3. 수반성의 의미\n4. 불가분성\n5. 연습문제 3개' },
        { id: 40, question: '저당권 실행방법을 설명하시오.', answer: '경매청구권 행사, 임의경매 신청', prompt: '주택관리사 민법 문제입니다.\n\n문제: 저당권 실행방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저당권 실행의 의의\n2. 경매절차 개요\n3. 배당순위\n4. 실무적 고려사항\n5. 연습문제 3개' }
      ]
    },
    {
      name: '채권법과 주택임대차보호법',
      questions: [
        { id: 41, question: '채권의 효력과 특성을 설명하시오.', answer: '특정인에게만 청구할 수 있는 상대적 권리', prompt: '주택관리사 민법 문제입니다.\n\n문제: 채권의 효력과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 채권의 개념\n2. 물권과의 비교\n3. 채권의 효력\n4. 관리비 채권의 성질\n5. 연습문제 3개' },
        { id: 42, question: '채무불이행의 유형과 효과를 설명하시오.', answer: '이행지체, 이행불능, 불완전이행으로 손해배상청구권 발생', prompt: '주택관리사 민법 문제입니다.\n\n문제: 채무불이행의 유형과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이행지체의 요건과 효과\n2. 이행불능의 요건과 효과\n3. 불완전이행\n4. 손해배상의 범위\n5. 연습문제 3개' },
        { id: 43, question: '주택임대차보호법의 적용범위를 설명하시오.', answer: '주거용 건물 임대차에 적용, 미등기 전세도 포함', prompt: '주택관리사 민법 문제입니다.\n\n문제: 주택임대차보호법의 적용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용대상 건물\n2. 상가와의 구별\n3. 미등기 전세\n4. 일시사용 임대차\n5. 연습문제 3개' },
        { id: 44, question: '주택임대차의 대항력 요건을 설명하시오.', answer: '주택의 인도와 주민등록(전입신고)을 갖추면 다음날부터 대항력 취득', prompt: '주택관리사 민법 문제입니다.\n\n문제: 주택임대차의 대항력 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대항력의 의의\n2. 대항요건(인도+주민등록)\n3. 대항력 취득시기\n4. 대항력의 효력\n5. 연습문제 3개' },
        { id: 45, question: '확정일자의 효력을 설명하시오.', answer: '대항요건을 갖추고 확정일자를 받으면 경매 시 우선변제권 취득', prompt: '주택관리사 민법 문제입니다.\n\n문제: 확정일자의 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확정일자의 의의\n2. 우선변제권의 요건\n3. 배당순서 결정\n4. 확정일자 부여기관\n5. 연습문제 3개' },
        { id: 46, question: '소액임차인의 최우선변제권을 설명하시오.', answer: '소액보증금은 다른 담보물권자보다 우선하여 변제받을 수 있음', prompt: '주택관리사 민법 문제입니다.\n\n문제: 소액임차인의 최우선변제권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최우선변제권의 의의\n2. 소액보증금 기준(지역별)\n3. 최우선변제 한도액\n4. 배당 사례\n5. 연습문제 3개' },
        { id: 47, question: '임대차 기간과 갱신에 관한 규정을 설명하시오.', answer: '최단 2년 보장, 묵시적 갱신, 계약갱신청구권(2년+2년)', prompt: '주택관리사 민법 문제입니다.\n\n문제: 임대차 기간과 갱신에 관한 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최단존속기간 보장\n2. 묵시적 갱신\n3. 계약갱신청구권\n4. 갱신거절 사유\n5. 연습문제 3개' },
        { id: 48, question: '전월세 전환율과 차임증감청구권을 설명하시오.', answer: '전세금을 월세로 전환 시 법정 전환율 적용, 경제사정 변동 시 증감 청구 가능', prompt: '주택관리사 민법 문제입니다.\n\n문제: 전월세 전환율과 차임증감청구권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전월세 전환율 계산\n2. 법정 전환율\n3. 차임증감청구권\n4. 5% 상한제\n5. 연습문제 3개' },
        { id: 49, question: '임차권등기명령제도를 설명하시오.', answer: '임대차 종료 후 보증금 미반환 시 법원에 임차권등기명령 신청 가능', prompt: '주택관리사 민법 문제입니다.\n\n문제: 임차권등기명령제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제도의 의의\n2. 신청요건\n3. 등기의 효력\n4. 실무 절차\n5. 연습문제 3개' },
        { id: 50, question: '집합건물의 소유 및 관리에 관한 법률의 주요 내용을 설명하시오.', answer: '구분소유, 공용부분, 관리단, 규약, 재건축 결의 등 규정', prompt: '주택관리사 민법 문제입니다.\n\n문제: 집합건물의 소유 및 관리에 관한 법률의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집합건물법의 적용 대상\n2. 전유부분과 공용부분\n3. 관리단과 관리인\n4. 규약과 집회\n5. 연습문제 3개' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/housing-manager" className="text-gray-500 hover:text-gray-700">주택관리사(보)</Link>
            <span className="text-gray-300">/</span>
            <span className="text-cyan-600 font-medium">민법</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📜 민법</h1>
          <p className="text-gray-600">주택관리사(보) 1차 시험 - 민법 학습</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">학습 진행률</span>
            <span className="text-cyan-600 font-bold">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button
                onClick={() => setOpenTopics(prev => prev.includes(topicIdx) ? prev.filter(t => t !== topicIdx) : [...prev, topicIdx])}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{topicIdx + 1}</span>
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openTopics.includes(topicIdx) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          checked={completedQuestions.includes(q.id)}
                          onChange={() => toggleQuestion(q.id)}
                          className="mt-1 w-5 h-5 rounded text-cyan-600 shrink-0"
                        />
                        <div className="flex-1">
                          <p className="font-medium mb-2">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-2">{q.answer}</p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-cyan-100 text-cyan-600 rounded-lg text-sm hover:bg-cyan-200 transition"
                          >
                            🤖 AI에게 자세히 묻기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/category/insurance/housing-manager" className="text-cyan-600 hover:text-cyan-700 font-medium">
            ← 주택관리사(보) 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 주택관리사(보) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
