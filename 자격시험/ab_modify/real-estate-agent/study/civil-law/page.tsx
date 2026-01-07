'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CivilLawStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['general']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('realtor-civil-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('realtor-civil-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 민법총칙 (1-5)
    { id: 1, topic: 'general', question: '권리능력의 시기와 종기를 설명하시오.', answer: '출생 시 취득, 사망 시 소멸', prompt: '공인중개사 민법 문제입니다.\n\n문제: 권리능력의 시기와 종기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 2, topic: 'general', question: '행위능력 제한자의 종류와 법률행위의 효력을 설명하시오.', answer: '미성년자, 피성년후견인, 피한정후견인', prompt: '공인중개사 민법 문제입니다.\n\n문제: 행위능력 제한자의 종류와 법률행위의 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 3, topic: 'general', question: '법률행위의 목적의 유효요건을 설명하시오.', answer: '확정성, 실현가능성, 적법성, 사회적 타당성', prompt: '공인중개사 민법 문제입니다.\n\n문제: 법률행위의 목적의 유효요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 4, topic: 'general', question: '의사표시의 하자(착오, 사기, 강박)에 따른 효력을 설명하시오.', answer: '착오: 취소, 사기강박: 취소', prompt: '공인중개사 민법 문제입니다.\n\n문제: 의사표시의 하자(착오, 사기, 강박)에 따른 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 5, topic: 'general', question: '무효와 취소의 구별을 설명하시오.', answer: '무효: 처음부터 효력 없음, 취소: 소급적 무효', prompt: '공인중개사 민법 문제입니다.\n\n문제: 무효와 취소의 구별을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 물권법 총론 (6-10)
    { id: 6, topic: 'property-general', question: '물권의 종류와 특성을 설명하시오.', answer: '점유권, 소유권, 용익물권, 담보물권', prompt: '공인중개사 민법 문제입니다.\n\n문제: 물권의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 7, topic: 'property-general', question: '물권법정주의의 의의와 내용을 설명하시오.', answer: '물권 종류와 내용은 법률로만 정함', prompt: '공인중개사 민법 문제입니다.\n\n문제: 물권법정주의의 의의와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 8, topic: 'property-general', question: '부동산 물권변동의 성립요건주의를 설명하시오.', answer: '등기가 물권변동의 성립요건', prompt: '공인중개사 민법 문제입니다.\n\n문제: 부동산 물권변동의 성립요건주의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 9, topic: 'property-general', question: '법률행위에 의한 물권변동과 법률규정에 의한 물권변동을 비교하시오.', answer: '법률행위: 등기 필요, 법률규정: 등기 불요', prompt: '공인중개사 민법 문제입니다.\n\n문제: 법률행위에 의한 물권변동과 법률규정에 의한 물권변동을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 10, topic: 'property-general', question: '등기의 추정력과 공신력을 설명하시오.', answer: '추정력 인정, 공신력 부정', prompt: '공인중개사 민법 문제입니다.\n\n문제: 등기의 추정력과 공신력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 점유권과 소유권 (11-15)
    { id: 11, topic: 'possession-ownership', question: '점유의 종류와 효력을 설명하시오.', answer: '자주점유, 타주점유, 선의점유, 악의점유', prompt: '공인중개사 민법 문제입니다.\n\n문제: 점유의 종류와 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 12, topic: 'possession-ownership', question: '점유권에 기한 물권적 청구권을 설명하시오.', answer: '점유보호청구권, 점유보전청구권, 점유물반환청구권', prompt: '공인중개사 민법 문제입니다.\n\n문제: 점유권에 기한 물권적 청구권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 13, topic: 'possession-ownership', question: '점유취득시효의 요건과 효과를 설명하시오.', answer: '20년(10년) 점유로 소유권 취득', prompt: '공인중개사 민법 문제입니다.\n\n문제: 점유취득시효의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 14, topic: 'possession-ownership', question: '소유권의 취득원인을 설명하시오.', answer: '원시취득(시효취득, 선점 등), 승계취득(매매, 상속 등)', prompt: '공인중개사 민법 문제입니다.\n\n문제: 소유권의 취득원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 15, topic: 'possession-ownership', question: '상린관계에서 인접지 사용권을 설명하시오.', answer: '경계선 부근의 건축, 통행권 등', prompt: '공인중개사 민법 문제입니다.\n\n문제: 상린관계에서 인접지 사용권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 용익물권 (16-20)
    { id: 16, topic: 'usufruct', question: '지상권의 의의와 성립요건을 설명하시오.', answer: '타인의 토지에 건물 기타 공작물을 소유하기 위한 권리', prompt: '공인중개사 민법 문제입니다.\n\n문제: 지상권의 의의와 성립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 17, topic: 'usufruct', question: '법정지상권의 성립요건을 설명하시오.', answer: '토지와 건물 동일인 소유 후 소유자 달라질 때', prompt: '공인중개사 민법 문제입니다.\n\n문제: 법정지상권의 성립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 18, topic: 'usufruct', question: '지역권의 의의와 특성을 설명하시오.', answer: '승역지를 요역지의 편익에 이용하는 권리', prompt: '공인중개사 민법 문제입니다.\n\n문제: 지역권의 의의와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 19, topic: 'usufruct', question: '전세권의 의의와 성립요건을 설명하시오.', answer: '전세금 지급하고 타인의 부동산을 사용수익', prompt: '공인중개사 민법 문제입니다.\n\n문제: 전세권의 의의와 성립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 20, topic: 'usufruct', question: '전세권의 존속기간과 법정갱신을 설명하시오.', answer: '최단 2년, 최장 10년, 법정갱신 가능', prompt: '공인중개사 민법 문제입니다.\n\n문제: 전세권의 존속기간과 법정갱신을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 담보물권 (21-25)
    { id: 21, topic: 'security', question: '저당권의 의의와 효력범위를 설명하시오.', answer: '부동산을 점유 이전 없이 담보로 제공', prompt: '공인중개사 민법 문제입니다.\n\n문제: 저당권의 의의와 효력범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 22, topic: 'security', question: '저당권의 물상대위를 설명하시오.', answer: '담보물의 멸실 등으로 받은 금전에 대해 효력 미침', prompt: '공인중개사 민법 문제입니다.\n\n문제: 저당권의 물상대위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 23, topic: 'security', question: '질권의 의의와 성립요건을 설명하시오.', answer: '채권자가 목적물을 점유하는 담보물권', prompt: '공인중개사 민법 문제입니다.\n\n문제: 질권의 의의와 성립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 24, topic: 'security', question: '유치권의 성립요건과 효력을 설명하시오.', answer: '채권과 물건 사이 견련관계 필요', prompt: '공인중개사 민법 문제입니다.\n\n문제: 유치권의 성립요건과 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 25, topic: 'security', question: '근저당권의 의의와 특성을 설명하시오.', answer: '채권최고액 한도 내 불특정 채권 담보', prompt: '공인중개사 민법 문제입니다.\n\n문제: 근저당권의 의의와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 채권법 총론 (26-30)
    { id: 26, topic: 'obligation', question: '채권의 효력과 채무불이행의 유형을 설명하시오.', answer: '이행지체, 이행불능, 불완전이행', prompt: '공인중개사 민법 문제입니다.\n\n문제: 채권의 효력과 채무불이행의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 27, topic: 'obligation', question: '손해배상의 범위와 방법을 설명하시오.', answer: '통상손해 + 특별손해(예견가능한 경우)', prompt: '공인중개사 민법 문제입니다.\n\n문제: 손해배상의 범위와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 28, topic: 'obligation', question: '채권양도의 요건과 대항요건을 설명하시오.', answer: '채무자에 대한 통지 또는 승낙', prompt: '공인중개사 민법 문제입니다.\n\n문제: 채권양도의 요건과 대항요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 29, topic: 'obligation', question: '채무인수의 유형과 요건을 설명하시오.', answer: '면책적 채무인수, 병존적 채무인수', prompt: '공인중개사 민법 문제입니다.\n\n문제: 채무인수의 유형과 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 30, topic: 'obligation', question: '상계의 요건과 효과를 설명하시오.', answer: '대등액에서 채무 소멸, 소급효', prompt: '공인중개사 민법 문제입니다.\n\n문제: 상계의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 계약법 (31-35)
    { id: 31, topic: 'contract', question: '계약의 성립요건을 설명하시오.', answer: '청약과 승낙의 합치', prompt: '공인중개사 민법 문제입니다.\n\n문제: 계약의 성립요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 32, topic: 'contract', question: '동시이행의 항변권을 설명하시오.', answer: '쌍무계약에서 상대방 이행 시까지 자기이행 거절', prompt: '공인중개사 민법 문제입니다.\n\n문제: 동시이행의 항변권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 33, topic: 'contract', question: '계약해제의 요건과 효과를 설명하시오.', answer: '채무불이행 시 해제권 발생, 원상회복의무', prompt: '공인중개사 민법 문제입니다.\n\n문제: 계약해제의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 34, topic: 'contract', question: '약정해제(해약금)와 법정해제를 비교하시오.', answer: '약정해제: 해약금 포기, 법정해제: 채무불이행', prompt: '공인중개사 민법 문제입니다.\n\n문제: 약정해제(해약금)와 법정해제를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 35, topic: 'contract', question: '계약해지의 의의와 해제와의 차이를 설명하시오.', answer: '해지는 장래효, 해제는 소급효', prompt: '공인중개사 민법 문제입니다.\n\n문제: 계약해지의 의의와 해제와의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 매매계약 (36-40)
    { id: 36, topic: 'sales', question: '매도인의 의무를 설명하시오.', answer: '재산권이전의무, 담보책임', prompt: '공인중개사 민법 문제입니다.\n\n문제: 매도인의 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 37, topic: 'sales', question: '매수인의 의무를 설명하시오.', answer: '대금지급의무, 목적물 수령의무', prompt: '공인중개사 민법 문제입니다.\n\n문제: 매수인의 의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 38, topic: 'sales', question: '매도인의 담보책임의 종류를 설명하시오.', answer: '권리하자담보, 물건하자담보', prompt: '공인중개사 민법 문제입니다.\n\n문제: 매도인의 담보책임의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 39, topic: 'sales', question: '하자담보책임의 요건과 효과를 설명하시오.', answer: '하자 존재 + 매수인 선의, 손해배상 또는 해제', prompt: '공인중개사 민법 문제입니다.\n\n문제: 하자담보책임의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 40, topic: 'sales', question: '환매특약의 의의와 요건을 설명하시오.', answer: '매도인이 대금을 반환하고 매매목적물 환수', prompt: '공인중개사 민법 문제입니다.\n\n문제: 환매특약의 의의와 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 주택임대차보호법 (41-45)
    { id: 41, topic: 'housing-lease', question: '주택임대차보호법상 대항력의 요건과 효과를 설명하시오.', answer: '주택 인도 + 주민등록, 다음 날 0시 대항력 취득', prompt: '공인중개사 민법 문제입니다.\n\n문제: 주택임대차보호법상 대항력의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 42, topic: 'housing-lease', question: '우선변제권의 요건과 효과를 설명하시오.', answer: '대항요건 + 확정일자, 경매 시 우선변제', prompt: '공인중개사 민법 문제입니다.\n\n문제: 우선변제권의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 43, topic: 'housing-lease', question: '소액임차인의 최우선변제권을 설명하시오.', answer: '일정 보증금 이하 임차인의 우선변제권', prompt: '공인중개사 민법 문제입니다.\n\n문제: 소액임차인의 최우선변제권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 44, topic: 'housing-lease', question: '계약갱신청구권의 요건과 효과를 설명하시오.', answer: '임차인의 갱신요구권, 2년 단위 1회', prompt: '공인중개사 민법 문제입니다.\n\n문제: 계약갱신청구권의 요건과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 45, topic: 'housing-lease', question: '임차권등기명령제도를 설명하시오.', answer: '임대차 종료 후에도 대항력 유지', prompt: '공인중개사 민법 문제입니다.\n\n문제: 임차권등기명령제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },

    // 상가건물임대차보호법 (46-50)
    { id: 46, topic: 'commercial-lease', question: '상가건물임대차보호법의 적용범위를 설명하시오.', answer: '환산보증금 일정액 이하 상가건물', prompt: '공인중개사 민법 문제입니다.\n\n문제: 상가건물임대차보호법의 적용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 47, topic: 'commercial-lease', question: '환산보증금의 계산방법을 설명하시오.', answer: '보증금 + (월차임 x 100)', prompt: '공인중개사 민법 문제입니다.\n\n문제: 환산보증금의 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 48, topic: 'commercial-lease', question: '상가임대차의 대항력과 우선변제권을 설명하시오.', answer: '인도 + 사업자등록, 확정일자 시 우선변제', prompt: '공인중개사 민법 문제입니다.\n\n문제: 상가임대차의 대항력과 우선변제권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 49, topic: 'commercial-lease', question: '권리금 회수기회 보호제도를 설명하시오.', answer: '임대인의 방해금지의무, 손해배상책임', prompt: '공인중개사 민법 문제입니다.\n\n문제: 권리금 회수기회 보호제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
    { id: 50, topic: 'commercial-lease', question: '상가임대차의 계약갱신요구권을 설명하시오.', answer: '10년간 갱신요구 가능, 거절사유 제한', prompt: '공인중개사 민법 문제입니다.\n\n문제: 상가임대차의 계약갱신요구권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 관련 조문\n3. 판례 해석\n4. 사례 적용\n5. 기출 포인트' },
  ];

  const topics = [
    { id: 'general', name: '민법총칙', icon: '📜', count: 5 },
    { id: 'property-general', name: '물권법 총론', icon: '🏠', count: 5 },
    { id: 'possession-ownership', name: '점유권과 소유권', icon: '🔑', count: 5 },
    { id: 'usufruct', name: '용익물권', icon: '🌳', count: 5 },
    { id: 'security', name: '담보물권', icon: '🔒', count: 5 },
    { id: 'obligation', name: '채권법 총론', icon: '📋', count: 5 },
    { id: 'contract', name: '계약법', icon: '📝', count: 5 },
    { id: 'sales', name: '매매계약', icon: '🤝', count: 5 },
    { id: 'housing-lease', name: '주택임대차보호법', icon: '🏡', count: 5 },
    { id: 'commercial-lease', name: '상가건물임대차보호법', icon: '🏪', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-500 hover:text-gray-700">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/real-estate-agent" className="text-gray-500 hover:text-gray-700">공인중개사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">민법</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">⚖️</div>
            <div>
              <h1 className="text-2xl font-bold">민법 및 민사특별법</h1>
              <p className="text-teal-100">2차 시험 | 부동산 관련 민법 중심</p>
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
                    ? 'bg-teal-100 border-2 border-teal-300'
                    : 'bg-white border border-gray-200 hover:border-teal-200'
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
                              ? 'bg-teal-500 border-teal-500 text-white'
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
                              className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition flex-shrink-0"
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
          <Link href="/category/finance/real-estate-agent" className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
            공인중개사 메인으로
          </Link>
        </div>
      </div>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">X</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">2026 자격증 가이드. 공인중개사 민법 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
