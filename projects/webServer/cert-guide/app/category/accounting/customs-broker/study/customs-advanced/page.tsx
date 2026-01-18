'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CustomsAdvancedStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['customs-deep']);

  useEffect(() => {
    const saved = localStorage.getItem('customs-broker-customs-advanced-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('customs-broker-customs-advanced-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 관세법심화 (1-12)
    { id: 1, topic: 'customs-deep', question: '관세법 조문 해석의 원칙과 방법을 설명하시오.', answer: '문리해석을 원칙으로 하되, 목적론적 해석과 체계적 해석을 병행한다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 관세법 조문 해석의 원칙과 방법을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 문리해석의 원칙\n2. 목적론적 해석\n3. 체계적 해석\n4. 판례의 해석 태도\n5. 사례 분석' },
    { id: 2, topic: 'customs-deep', question: '관세의 확정절차(신고납부, 부과고지)의 차이를 상세히 설명하시오.', answer: '신고납부는 납세자가 세액 확정, 부과고지는 세관장이 세액 확정하는 제도이다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 관세의 확정절차(신고납부, 부과고지)의 차이를 상세히 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 신고납부 제도\n2. 부과고지 제도\n3. 적용 대상의 차이\n4. 효력 발생시기\n5. 사례 분석' },
    { id: 3, topic: 'customs-deep', question: '수정신고와 경정청구의 요건과 효과를 비교 설명하시오.', answer: '수정신고는 과소신고 시, 경정청구는 과다신고 시 신청하는 제도이다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 수정신고와 경정청구의 요건과 효과를 비교 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 수정신고 요건\n2. 경정청구 요건\n3. 청구 기한\n4. 가산세 적용\n5. 사례 분석' },
    { id: 4, topic: 'customs-deep', question: '관세 부과제척기간과 징수권 소멸시효의 중단·정지 사유를 설명하시오.', answer: '제척기간은 부과권 행사기간, 소멸시효는 징수권 행사기간으로 중단·정지 사유가 다르다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 관세 부과제척기간과 징수권 소멸시효의 중단·정지 사유를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 제척기간의 의의\n2. 소멸시효의 의의\n3. 중단 사유\n4. 정지 사유\n5. 사례 분석' },
    { id: 5, topic: 'customs-deep', question: '관세 가산세의 종류와 감면 사유를 설명하시오.', answer: '무신고, 과소신고, 납부불성실 가산세가 있으며, 정당한 사유 시 감면된다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 관세 가산세의 종류와 감면 사유를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 가산세의 법적 성격\n2. 무신고 가산세\n3. 과소신고 가산세\n4. 감면 사유\n5. 사례 분석' },
    { id: 6, topic: 'customs-deep', question: '관세범의 성립요건과 처벌규정을 설명하시오.', answer: '관세포탈, 밀수입, 허위신고 등의 범칙행위에 형사처벌 또는 통고처분이 적용된다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 관세범의 성립요건과 처벌규정을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 관세범의 종류\n2. 성립요건\n3. 형사처벌\n4. 통고처분\n5. 사례 분석' },
    { id: 7, topic: 'customs-deep', question: '관세불복절차(이의신청, 심사청구, 심판청구)의 관계를 설명하시오.', answer: '필요적 전치주의에 따라 심사청구 또는 심판청구 후 행정소송이 가능하다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 관세불복절차(이의신청, 심사청구, 심판청구)의 관계를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 각 절차의 청구권자\n2. 제기기간\n3. 심리범위\n4. 결정의 효력\n5. 사례 분석' },
    { id: 8, topic: 'customs-deep', question: '보세구역 제도의 법적 성격과 종류별 특징을 설명하시오.', answer: '보세구역은 외국물품을 관세 유보 상태로 장치할 수 있는 특정 장소이다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 보세구역 제도의 법적 성격과 종류별 특징을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 지정보세구역\n2. 특허보세구역\n3. 종합보세구역\n4. 보세구역 외 장치\n5. 사례 분석' },
    { id: 9, topic: 'customs-deep', question: '수입통관 사전심사제도(사전세액심사, 품목분류 사전심사)를 설명하시오.', answer: '수입 전에 세액 또는 품목분류를 미리 심사받아 통관 리스크를 줄인다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 수입통관 사전심사제도(사전세액심사, 품목분류 사전심사)를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 사전세액심사\n2. 품목분류 사전심사\n3. 신청 절차\n4. 효력과 변경\n5. 사례 분석' },
    { id: 10, topic: 'customs-deep', question: '관세 감면의 사후관리 제도를 설명하시오.', answer: '조건부 감면물품의 용도외 사용을 방지하기 위해 사후관리를 실시한다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 관세 감면의 사후관리 제도를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 사후관리 대상\n2. 관리 방법\n3. 용도외 사용\n4. 추징과 처벌\n5. 사례 분석' },
    { id: 11, topic: 'customs-deep', question: '관세환급 제도의 법적 성격과 환급 요건을 설명하시오.', answer: '수출용 원재료의 관세를 환급하여 수출경쟁력을 지원하는 제도이다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: 관세환급 제도의 법적 성격과 환급 요건을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 환급 제도의 취지\n2. 개별환급\n3. 간이정액환급\n4. 환급 제한\n5. 사례 분석' },
    { id: 12, topic: 'customs-deep', question: 'AEO(수출입안전관리 우수업체) 제도를 설명하시오.', answer: '법규준수, 안전관리 우수업체에 통관편의를 제공하는 제도이다.', prompt: '관세사 2차 관세법 문제입니다.\n\n문제: AEO(수출입안전관리 우수업체) 제도를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. AEO 제도의 의의\n2. 인증 요건\n3. 혜택\n4. 상호인정협정(MRA)\n5. 사례 분석' },

    // 품목분류 (13-25)
    { id: 13, topic: 'classification', question: 'HS협약과 관세율표의 구조를 설명하시오.', answer: 'HS협약에 따른 6단위 국제분류에 우리나라 10단위 HSK를 사용한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: HS협약과 관세율표의 구조를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. HS협약의 의의\n2. 류-호-소호 체계\n3. 관세율표 구조\n4. HSK 10단위\n5. 사례 분석' },
    { id: 14, topic: 'classification', question: '품목분류 통칙(통칙1-6)을 순서대로 설명하시오.', answer: '호의 용어와 주 → 성질로 분류 → 세번 순서로 적용한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 품목분류 통칙(통칙1-6)을 순서대로 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 통칙1(호의 용어)\n2. 통칙2(불완전품 등)\n3. 통칙3(경합규정)\n4. 통칙4-6\n5. 적용 사례' },
    { id: 15, topic: 'classification', question: '통칙3(가호, 나호, 다호)의 적용순서와 사례를 설명하시오.', answer: '가호(구체적 표현) → 나호(본질적 특성) → 다호(후순위) 순으로 적용한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 통칙3(가호, 나호, 다호)의 적용순서와 사례를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 통칙3 가호\n2. 통칙3 나호(본질적 특성)\n3. 통칙3 다호\n4. 세트물품 분류\n5. 적용 사례' },
    { id: 16, topic: 'classification', question: '류주와 호주의 해석 방법을 설명하시오.', answer: '류주는 해당 류 전체에, 호주는 특정 호에 적용되는 해석규정이다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 류주와 호주의 해석 방법을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 류주의 역할\n2. 호주의 역할\n3. 포함 규정\n4. 제외 규정\n5. 해석 사례' },
    { id: 17, topic: 'classification', question: '기계류(제16부)의 품목분류 원칙을 설명하시오.', answer: '기능에 따라 분류하며, 다기능 기계는 주된 기능 또는 통칙3에 따른다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 기계류(제16부)의 품목분류 원칙을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 제16부의 구조\n2. 제84류와 제85류\n3. 부분품 분류\n4. 다기능 기계\n5. 분류 사례' },
    { id: 18, topic: 'classification', question: '화학제품(제6부)의 품목분류 원칙을 설명하시오.', answer: '화학구조, 용도, 성분에 따라 분류하며, 혼합물은 주성분 또는 용도로 분류한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 화학제품(제6부)의 품목분류 원칙을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 제6부의 구조\n2. 단일 화합물\n3. 혼합물\n4. 의약품과 화장품\n5. 분류 사례' },
    { id: 19, topic: 'classification', question: '섬유제품(제11부)의 품목분류 원칙을 설명하시오.', answer: '섬유 소재, 구조(직물, 편물), 완성도에 따라 분류한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 섬유제품(제11부)의 품목분류 원칙을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 제11부의 구조\n2. 섬유 소재별 분류\n3. 직물과 편물\n4. 의류의 분류\n5. 분류 사례' },
    { id: 20, topic: 'classification', question: '부분품과 부속품의 품목분류 원칙을 설명하시오.', answer: '전용 부분품은 본체 분류, 범용 부분품은 해당 호에 분류한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 부분품과 부속품의 품목분류 원칙을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 부분품의 정의\n2. 전용 부분품\n3. 범용 부분품\n4. 부속품 분류\n5. 분류 사례' },
    { id: 21, topic: 'classification', question: '품목분류 사전심사의 법적 효력을 설명하시오.', answer: '사전심사 결정은 기속력이 있으며, 동일 물품에 동일하게 적용된다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 품목분류 사전심사의 법적 효력을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 사전심사 제도\n2. 기속력\n3. 변경과 취소\n4. 불복 절차\n5. 사례 분석' },
    { id: 22, topic: 'classification', question: '품목분류 분쟁 사례를 분석하시오.', answer: '주요 품목분류 분쟁 사례를 통해 분류 원칙의 적용을 이해한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 다음 물품의 품목분류를 결정하시오.\n[사례] 무선 이어폰 충전 케이스(배터리 내장)\n\n다음 순서로 분석해주세요:\n1. 물품의 특성\n2. 후보 세번\n3. 통칙 적용\n4. 분류 결정\n5. 근거 설명' },
    { id: 23, topic: 'classification', question: '수출입물품의 원산지 결정기준과 품목분류의 관계를 설명하시오.', answer: '세번변경기준은 품목분류에 기반하여 원산지를 판정한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 수출입물품의 원산지 결정기준과 품목분류의 관계를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 세번변경기준\n2. CC, CTH, CTSH\n3. 품목분류의 중요성\n4. FTA별 적용\n5. 사례 분석' },
    { id: 24, topic: 'classification', question: 'HS해설서와 품목분류의 관계를 설명하시오.', answer: 'HS해설서는 품목분류의 해석지침으로 법적 구속력은 없으나 참고자료이다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: HS해설서와 품목분류의 관계를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. HS해설서의 성격\n2. 법적 효력\n3. 활용 방법\n4. 해설서 개정\n5. 사례 분석' },
    { id: 25, topic: 'classification', question: '신기술 제품의 품목분류 방법을 설명하시오.', answer: '기존 호에 해당하지 않는 신제품은 기능, 용도에 따라 최적 호에 분류한다.', prompt: '관세사 2차 관세율표 문제입니다.\n\n문제: 신기술 제품의 품목분류 방법을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 신제품 분류 원칙\n2. 통칙 적용\n3. WCO 결정\n4. 사전심사 활용\n5. 사례 분석' },

    // 관세평가 (26-38)
    { id: 26, topic: 'valuation', question: '관세평가의 기본원칙(거래가격 원칙)을 설명하시오.', answer: '수입물품의 과세가격은 실제지급가격에 가산요소를 더하여 결정한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 관세평가의 기본원칙(거래가격 원칙)을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 거래가격의 정의\n2. 실제지급가격\n3. 가산요소\n4. 공제요소\n5. 사례 분석' },
    { id: 27, topic: 'valuation', question: '가산요소(로열티, 운임, 보험료 등)의 조정방법을 설명하시오.', answer: '거래가격에 포함되지 않은 비용을 가산하여 과세가격을 조정한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 가산요소(로열티, 운임, 보험료 등)의 조정방법을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 운임과 보험료\n2. 로열티와 라이선스료\n3. 수수료와 중개료\n4. 용기와 포장비용\n5. 사례 분석' },
    { id: 28, topic: 'valuation', question: '공제요소(설치비, 수입후 비용)의 처리방법을 설명하시오.', answer: '수입 후 발생하는 비용은 거래가격에서 공제한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 공제요소(설치비, 수입후 비용)의 처리방법을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 수입후 운임\n2. 설치·조립비용\n3. 관세와 제세금\n4. 금융비용\n5. 사례 분석' },
    { id: 29, topic: 'valuation', question: '거래가격 적용이 배제되는 사유를 설명하시오.', answer: '처분제한, 조건부 판매, 판매대가 미확정, 특수관계 영향 시 배제된다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 거래가격 적용이 배제되는 사유를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 처분·사용 제한\n2. 조건·대가 부과\n3. 귀속수익\n4. 특수관계 영향\n5. 사례 분석' },
    { id: 30, topic: 'valuation', question: '대체평가방법(제2-6방법)의 적용순서를 설명하시오.', answer: '동종동질물품 → 유사물품 → 공제법 → 산정법 → 합리적 방법 순으로 적용한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 대체평가방법(제2-6방법)의 적용순서를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 제2방법(동종동질)\n2. 제3방법(유사물품)\n3. 제4방법(공제법)\n4. 제5방법(산정법)\n5. 제6방법(합리적 방법)' },
    { id: 31, topic: 'valuation', question: '특수관계자 거래의 과세가격 결정을 설명하시오.', answer: '특수관계가 가격에 영향을 미치지 않았음을 입증하거나 검증가격을 사용한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 특수관계자 거래의 과세가격 결정을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 특수관계의 정의\n2. 가격 영향 검토\n3. 검증가격\n4. 입증책임\n5. 사례 분석' },
    { id: 32, topic: 'valuation', question: '이전가격과 관세평가의 관계를 설명하시오.', answer: '이전가격은 법인세 목적, 관세평가는 관세 목적으로 기준이 다를 수 있다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 이전가격과 관세평가의 관계를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 이전가격의 의의\n2. 관세평가와의 차이\n3. 정상가격 원칙\n4. 조정 방법\n5. 사례 분석' },
    { id: 33, topic: 'valuation', question: '잠정가격 신고 제도를 설명하시오.', answer: '가격이 확정되지 않은 경우 잠정가격으로 신고하고, 확정 시 정산한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 잠정가격 신고 제도를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 잠정가격 신고 사유\n2. 신고 절차\n3. 담보 제공\n4. 가격 확정 후 정산\n5. 사례 분석' },
    { id: 34, topic: 'valuation', question: '로열티의 과세가격 포함 여부 판단기준을 설명하시오.', answer: '수입물품과 관련성, 판매조건 해당 여부에 따라 가산 여부를 판단한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 로열티의 과세가격 포함 여부 판단기준을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 로열티의 정의\n2. 관련성 요건\n3. 판매조건 요건\n4. 판단 기준\n5. 사례 분석' },
    { id: 35, topic: 'valuation', question: '무상 제공물품의 과세가격 결정을 설명하시오.', answer: '무상물품도 동종유사물품 가격 등을 기준으로 과세가격을 결정한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 무상 제공물품의 과세가격 결정을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 무상물품의 유형\n2. 과세가격 결정 원칙\n3. 대체평가방법\n4. 면세와의 관계\n5. 사례 분석' },
    { id: 36, topic: 'valuation', question: '신고가격의 사후 검증 절차를 설명하시오.', answer: '세관은 신고가격의 정확성을 사후 심사하여 수정할 수 있다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 신고가격의 사후 검증 절차를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 사후심사의 법적 근거\n2. 심사 대상 선정\n3. 심사 방법\n4. 경정과 추징\n5. 사례 분석' },
    { id: 37, topic: 'valuation', question: '환율 적용 원칙과 외화신고를 설명하시오.', answer: '수입신고일의 관세청 고시환율을 적용하며, 외화신고도 가능하다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 환율 적용 원칙과 외화신고를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 환율 적용 시점\n2. 고시환율\n3. 외화신고 제도\n4. 환차손익 처리\n5. 사례 분석' },
    { id: 38, topic: 'valuation', question: '관세평가 종합 사례문제를 분석하시오.', answer: '복잡한 거래의 과세가격 결정 과정을 종합적으로 분석한다.', prompt: '관세사 2차 관세평가 문제입니다.\n\n문제: 다음 수입거래의 과세가격을 결정하시오.\n[자료] 물품가격 $100,000, 로열티 3%, 해상운임 $5,000, 보험료 $500, 설치비 $3,000(수입후), 수입자와 수출자는 특수관계\n\n다음 순서로 분석해주세요:\n1. 거래가격 확인\n2. 특수관계 영향 검토\n3. 가산요소 분석\n4. 공제요소 분석\n5. 과세가격 결정' },

    // 무역실무 (39-50)
    { id: 39, topic: 'trade-practice', question: '대외무역법상 수출입공고의 법적 성격을 설명하시오.', answer: '수출입공고는 수출입 제한 품목과 절차를 규정하는 고시이다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 대외무역법상 수출입공고의 법적 성격을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 수출입공고의 의의\n2. 법적 근거\n3. 규제 내용\n4. 위반 시 제재\n5. 사례 분석' },
    { id: 40, topic: 'trade-practice', question: '전략물자 수출통제 제도를 설명하시오.', answer: '대량살상무기 관련 물자의 수출을 통제하여 국제평화에 기여한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 전략물자 수출통제 제도를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 전략물자의 정의\n2. 수출허가 제도\n3. 자율준수무역거래자\n4. 위반 시 제재\n5. 사례 분석' },
    { id: 41, topic: 'trade-practice', question: '외국환거래법상 지급등 절차를 설명하시오.', answer: '수출입 대금의 지급과 수령에 대한 외환관리 규정을 적용한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 외국환거래법상 지급등 절차를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 지급의 정의\n2. 수령의 정의\n3. 지급등의 방법\n4. 신고와 허가\n5. 사례 분석' },
    { id: 42, topic: 'trade-practice', question: '수출입 대금결제 방식(T/T, L/C, D/A, D/P)을 비교하시오.', answer: '각 결제방식의 리스크, 비용, 절차가 다르며 거래상황에 따라 선택한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 수출입 대금결제 방식(T/T, L/C, D/A, D/P)을 비교하시오.\n\n다음 순서로 논술해주세요:\n1. 송금방식(T/T)\n2. 신용장방식(L/C)\n3. 추심방식(D/A, D/P)\n4. 리스크 비교\n5. 사례 분석' },
    { id: 43, topic: 'trade-practice', question: '무역보험 제도의 종류와 활용을 설명하시오.', answer: '수출보험, 환변동보험 등으로 무역 리스크를 관리한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 무역보험 제도의 종류와 활용을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 수출보험\n2. 환변동보험\n3. 신용보증\n4. 보험금 청구\n5. 사례 분석' },
    { id: 44, topic: 'trade-practice', question: '해상운송 계약과 선하증권의 법적 성격을 설명하시오.', answer: '선하증권은 화물인도청구권을 표창하는 유가증권이다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 해상운송 계약과 선하증권의 법적 성격을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 해상운송계약\n2. 선하증권의 기능\n3. 유가증권성\n4. 분쟁 해결\n5. 사례 분석' },
    { id: 45, topic: 'trade-practice', question: '적하보험 계약과 보험금 청구를 설명하시오.', answer: '화물 손해에 대해 보험금을 청구하며, 보험자 대위권이 발생한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 적하보험 계약과 보험금 청구를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 적하보험의 담보위험\n2. 보험금액과 보험가액\n3. 손해통지와 청구\n4. 보험자 대위\n5. 사례 분석' },
    { id: 46, topic: 'trade-practice', question: '무역클레임의 종류와 해결방법을 설명하시오.', answer: '품질, 수량, 납기 클레임이 있으며, 협상, 중재, 소송으로 해결한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 무역클레임의 종류와 해결방법을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 클레임 유형\n2. 클레임 제기 절차\n3. 협상과 조정\n4. 중재와 소송\n5. 사례 분석' },
    { id: 47, topic: 'trade-practice', question: '국제상사중재의 절차와 효력을 설명하시오.', answer: '중재합의에 따라 분쟁을 해결하며, 중재판정은 확정판결과 같은 효력이 있다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 국제상사중재의 절차와 효력을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 중재합의\n2. 중재 절차\n3. 중재판정\n4. 집행\n5. 사례 분석' },
    { id: 48, topic: 'trade-practice', question: '수출입 계약서 작성 시 유의사항을 설명하시오.', answer: '계약조건을 명확히 하고, 분쟁해결 조항을 포함해야 한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 수출입 계약서 작성 시 유의사항을 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 계약의 필수조항\n2. 가격조건\n3. 품질 및 수량\n4. 분쟁해결 조항\n5. 체크리스트' },
    { id: 49, topic: 'trade-practice', question: '무역업무 종합 사례(수출입 절차)를 분석하시오.', answer: '수출입 거래의 전 과정을 단계별로 분석한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 다음 수입거래의 전 과정을 설명하시오.\n[사례] 기계장치 CIF 수입, L/C 결제, 한-EU FTA 적용\n\n다음 순서로 분석해주세요:\n1. 계약체결\n2. 신용장 개설\n3. 선적과 보험\n4. 통관과 세금\n5. 대금결제' },
    { id: 50, topic: 'trade-practice', question: '관세사 실무에서의 리스크 관리를 설명하시오.', answer: '품목분류, 관세평가, 원산지 리스크를 사전에 관리한다.', prompt: '관세사 2차 무역실무 문제입니다.\n\n문제: 관세사 실무에서의 리스크 관리를 설명하시오.\n\n다음 순서로 논술해주세요:\n1. 품목분류 리스크\n2. 관세평가 리스크\n3. 원산지 리스크\n4. 사후심사 대응\n5. 컴플라이언스 체계' },
  ];

  const topics = [
    { id: 'customs-deep', name: '관세법심화', count: 12 },
    { id: 'classification', name: '품목분류', count: 13 },
    { id: 'valuation', name: '관세평가', count: 13 },
    { id: 'trade-practice', name: '무역실무', count: 12 },
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
            <span className="text-sky-600 font-medium">관세법 심화/2차</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 관세법 심화/2차</h1>
          <p className="text-gray-600">관세사 2차 시험 대비 | 논술형</p>
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
          <Link href="/category/accounting/customs-broker/study/accounting" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 회계학</Link>
          <Link href="/category/accounting/customs-broker/study/practical" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">다음: 실무연습 →</Link>
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
