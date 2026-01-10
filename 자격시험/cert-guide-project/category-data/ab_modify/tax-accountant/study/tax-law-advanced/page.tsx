'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TaxLawAdvancedStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['tax-law-part1']);

  useEffect(() => {
    const saved = localStorage.getItem('tax-accountant-tax-law-advanced-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tax-accountant-tax-law-advanced-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 세법학1부: 소득세법·법인세법 (1-15)
    { id: 1, topic: 'tax-law-part1', question: '거주자와 비거주자의 과세범위를 비교하시오.', answer: '거주자는 전세계소득, 비거주자는 국내원천소득에 대해 과세된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 거주자와 비거주자의 과세범위를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 거주자 판정기준\n2. 거주자의 과세범위(전세계소득)\n3. 비거주자의 과세범위(국내원천소득)\n4. 조세조약과의 관계\n5. 논술형 답안 예시' },
    { id: 2, topic: 'tax-law-part1', question: '실질과세원칙과 조세회피행위 부인을 설명하시오.', answer: '명의가 아닌 실질에 따라 과세하며, 조세회피목적 거래는 부인될 수 있다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 실질과세원칙과 조세회피행위 부인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실질과세원칙의 근거\n2. 귀속의 실질과 거래의 실질\n3. 조세회피행위의 개념\n4. 부인의 요건과 한계\n5. 논술형 답안 예시' },
    { id: 3, topic: 'tax-law-part1', question: '소득세법상 이자소득과 배당소득의 과세방법을 논하시오.', answer: '금융소득종합과세 대상 여부에 따라 분리과세 또는 종합과세된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 소득세법상 이자소득과 배당소득의 과세방법을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 이자소득의 범위\n2. 배당소득의 범위와 의제배당\n3. 금융소득종합과세 기준\n4. 배당세액공제\n5. 논술형 답안 예시' },
    { id: 4, topic: 'tax-law-part1', question: '양도소득세의 비과세와 감면을 체계적으로 설명하시오.', answer: '1세대 1주택 비과세, 8년 자경농지 감면, 중소기업 주식 감면 등이 있다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 양도소득세의 비과세와 감면을 체계적으로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1세대 1주택 비과세 요건\n2. 고가주택의 과세\n3. 8년 자경농지 감면\n4. 기타 감면 제도\n5. 논술형 답안 예시' },
    { id: 5, topic: 'tax-law-part1', question: '법인세법상 익금과 익금불산입 항목을 논하시오.', answer: '익금은 순자산증가 거래이며, 주식발행초과금 등은 익금불산입된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 법인세법상 익금과 익금불산입 항목을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 익금의 개념과 범위\n2. 주요 익금 항목\n3. 익금불산입의 취지\n4. 주요 익금불산입 항목\n5. 논술형 답안 예시' },
    { id: 6, topic: 'tax-law-part1', question: '법인세법상 손금과 손금불산입 항목을 논하시오.', answer: '손금은 순자산감소 거래이며, 업무무관경비 등은 손금불산입된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 법인세법상 손금과 손금불산입 항목을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 손금의 개념과 범위\n2. 일반 손금인정 요건\n3. 주요 손금불산입 항목\n4. 손금산입·익금불산입\n5. 논술형 답안 예시' },
    { id: 7, topic: 'tax-law-part1', question: '부당행위계산부인 제도를 상세히 논하시오.', answer: '특수관계인과의 거래에서 시가와 차이가 있고 조세부담을 감소시키면 부인된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 부당행위계산부인 제도를 상세히 논하시오.\n\n다음 순서로 설명해주세요:\n1. 제도의 취지와 법적 성격\n2. 적용 요건(특수관계, 시가차이, 조세감소)\n3. 부인 유형별 분석\n4. 시가의 산정 방법\n5. 논술형 답안 예시' },
    { id: 8, topic: 'tax-law-part1', question: '이월결손금 공제 제도를 논하시오.', answer: '결손금은 15년간 이월되며 중소기업 100%, 일반법인 60% 한도로 공제된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 이월결손금 공제 제도를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 이월결손금의 의의\n2. 공제 요건과 기간\n3. 공제한도(중소기업 vs 일반기업)\n4. 합병·분할 시 결손금 승계\n5. 논술형 답안 예시' },
    { id: 9, topic: 'tax-law-part1', question: '법인의 합병에 따른 세무처리를 논하시오.', answer: '적격합병은 양도손익 이연, 비적격합병은 시가 양도로 처리된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 법인의 합병에 따른 세무처리를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 적격합병의 요건\n2. 적격합병의 세무처리\n3. 비적격합병의 세무처리\n4. 합병매수차익과 합병차익\n5. 논술형 답안 예시' },
    { id: 10, topic: 'tax-law-part1', question: '연결납세제도의 내용과 효과를 논하시오.', answer: '완전지배관계 내국법인이 하나의 과세단위로 법인세를 신고·납부한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 연결납세제도의 내용과 효과를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 연결납세제도의 의의\n2. 적용대상과 요건\n3. 연결소득금액 계산\n4. 내부거래 손익 조정\n5. 논술형 답안 예시' },
    { id: 11, topic: 'tax-law-part1', question: '비거주자·외국법인의 국내원천소득 과세를 논하시오.', answer: '국내사업장 유무에 따라 종합과세 또는 원천징수된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 비거주자·외국법인의 국내원천소득 과세를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 국내원천소득의 종류\n2. 국내사업장의 개념\n3. 국내사업장이 있는 경우\n4. 국내사업장이 없는 경우\n5. 논술형 답안 예시' },
    { id: 12, topic: 'tax-law-part1', question: '과소자본세제와 소득대비 이자비용 제한을 논하시오.', answer: '차입금 과다 법인의 지급이자 손금을 제한하는 제도이다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 과소자본세제와 소득대비 이자비용 제한을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 과소자본세제의 취지\n2. 적용요건과 부인금액\n3. 소득대비 이자비용 제한\n4. 두 제도의 관계\n5. 논술형 답안 예시' },
    { id: 13, topic: 'tax-law-part1', question: '동업기업 과세특례 제도를 논하시오.', answer: '동업기업 소득을 동업자별로 배분하여 과세하는 pass-through 방식이다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 동업기업 과세특례 제도를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 동업기업의 정의\n2. 특례 적용 선택\n3. 소득 배분 방법\n4. 동업자별 과세\n5. 논술형 답안 예시' },
    { id: 14, topic: 'tax-law-part1', question: '외국납부세액공제 제도를 상세히 논하시오.', answer: '국제적 이중과세 방지를 위해 외국납부세액을 세액공제한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 외국납부세액공제 제도를 상세히 논하시오.\n\n다음 순서로 설명해주세요:\n1. 제도의 취지\n2. 공제한도 계산\n3. 직접외국납부세액공제\n4. 간접외국납부세액공제\n5. 논술형 답안 예시' },
    { id: 15, topic: 'tax-law-part1', question: '국제조세조정에 관한 법률의 이전가격세제를 논하시오.', answer: '특수관계자와의 국제거래에서 정상가격으로 소득을 조정한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 국제조세조정에 관한 법률의 이전가격세제를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 이전가격세제의 의의\n2. 정상가격 산출방법\n3. 국제거래명세서 제출\n4. 사전승인제도(APA)\n5. 논술형 답안 예시' },

    // 세법학2부: 부가가치세법 (16-28)
    { id: 16, topic: 'tax-law-part2', question: '부가가치세의 과세대상과 과세거래를 논하시오.', answer: '재화·용역의 공급과 재화의 수입이 과세대상이다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 부가가치세의 과세대상과 과세거래를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 재화의 공급\n2. 용역의 공급\n3. 재화의 수입\n4. 간주공급\n5. 논술형 답안 예시' },
    { id: 17, topic: 'tax-law-part2', question: '영세율과 면세의 차이를 상세히 논하시오.', answer: '영세율은 매입세액 환급 가능, 면세는 매입세액 불공제된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 영세율과 면세의 차이를 상세히 논하시오.\n\n다음 순서로 설명해주세요:\n1. 영세율의 의의와 적용대상\n2. 면세의 의의와 적용대상\n3. 매입세액 공제 차이\n4. 면세포기 제도\n5. 논술형 답안 예시' },
    { id: 18, topic: 'tax-law-part2', question: '세금계산서 제도와 관련 가산세를 논하시오.', answer: '세금계산서는 거래증빙으로 미발급·허위발급 시 가산세가 부과된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 세금계산서 제도와 관련 가산세를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 세금계산서의 기재사항\n2. 전자세금계산서 의무발급\n3. 미발급·지연발급 가산세\n4. 허위세금계산서 가산세\n5. 논술형 답안 예시' },
    { id: 19, topic: 'tax-law-part2', question: '매입세액 불공제 항목을 상세히 논하시오.', answer: '업무무관자산, 접대비, 비영업용 소형승용차 등은 불공제된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 매입세액 불공제 항목을 상세히 논하시오.\n\n다음 순서로 설명해주세요:\n1. 불공제 취지\n2. 사업과 직접 관련 없는 지출\n3. 비영업용 소형승용차\n4. 접대비 관련 매입세액\n5. 논술형 답안 예시' },
    { id: 20, topic: 'tax-law-part2', question: '공통매입세액 안분계산을 논하시오.', answer: '과세·면세 공통사용 매입세액은 과세공급가액 비율로 안분한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 공통매입세액 안분계산을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 공통매입세액의 의의\n2. 실지귀속 구분\n3. 비례안분 계산\n4. 정산과 납부(환급)\n5. 논술형 답안 예시' },
    { id: 21, topic: 'tax-law-part2', question: '간이과세제도의 내용과 문제점을 논하시오.', answer: '영세사업자의 납세편의를 위한 제도로 업종별 부가가치율을 적용한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 간이과세제도의 내용과 문제점을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 간이과세자 적용범위\n2. 세액계산 방법\n3. 의제매입세액공제\n4. 문제점과 개선방향\n5. 논술형 답안 예시' },
    { id: 22, topic: 'tax-law-part2', question: '대손세액공제 제도를 논하시오.', answer: '공급받는 자의 파산 등으로 대금을 회수하지 못하면 매출세액에서 공제한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 대손세액공제 제도를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 대손세액공제의 의의\n2. 공제요건\n3. 공제시기와 절차\n4. 대손세액 회수\n5. 논술형 답안 예시' },
    { id: 23, topic: 'tax-law-part2', question: '부동산임대업의 부가가치세 과세문제를 논하시오.', answer: '토지 임대는 면세이나 건물 임대는 과세된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 부동산임대업의 부가가치세 과세문제를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 토지 임대와 건물 임대 구분\n2. 과세표준 계산\n3. 전세금 간주임대료\n4. 공통매입세액 문제\n5. 논술형 답안 예시' },
    { id: 24, topic: 'tax-law-part2', question: '수출 및 국제운송용역의 영세율 적용을 논하시오.', answer: '수출재화는 영세율이 적용되며 직수출과 간접수출이 있다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 수출 및 국제운송용역의 영세율 적용을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 직접수출의 영세율\n2. 간접수출(내국신용장)\n3. 국제운송용역\n4. 외화획득 용역\n5. 논술형 답안 예시' },
    { id: 25, topic: 'tax-law-part2', question: '재화의 공급시기와 세금계산서 발급시기를 논하시오.', answer: '원칙적으로 인도일에 공급하고 세금계산서를 발급한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 재화의 공급시기와 세금계산서 발급시기를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 재화의 공급시기 원칙\n2. 특례 규정\n3. 세금계산서 발급시기\n4. 선발급·후발급\n5. 논술형 답안 예시' },
    { id: 26, topic: 'tax-law-part2', question: '용역의 공급장소 판정기준을 논하시오.', answer: '역무가 제공되는 장소를 기준으로 국내공급 여부를 판정한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 용역의 공급장소 판정기준을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 공급장소 원칙\n2. 부동산 관련 용역\n3. 전자적 용역\n4. 국외용역의 과세\n5. 논술형 답안 예시' },
    { id: 27, topic: 'tax-law-part2', question: '부가가치세 환급제도를 논하시오.', answer: '매출세액보다 매입세액이 많으면 일반환급 또는 조기환급된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 부가가치세 환급제도를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 환급의 발생사유\n2. 일반환급\n3. 조기환급\n4. 영세율 등 조기환급\n5. 논술형 답안 예시' },
    { id: 28, topic: 'tax-law-part2', question: '사업자등록과 관련 제재를 논하시오.', answer: '사업개시일로부터 20일 내 등록하며 미등록 시 가산세가 부과된다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 사업자등록과 관련 제재를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 등록신청 의무\n2. 미등록 가산세\n3. 사업자등록 정정\n4. 휴업·폐업신고\n5. 논술형 답안 예시' },

    // 회계학심화 (29-40)
    { id: 29, topic: 'accounting-advanced', question: '수익인식기준(K-IFRS 제1115호)을 논하시오.', answer: '5단계 모형에 따라 수행의무 이행 시점에 수익을 인식한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 수익인식기준(K-IFRS 제1115호)을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 5단계 수익인식 모형\n2. 한 시점 vs 기간에 걸쳐 인식\n3. 변동대가와 계약변경\n4. 세무상 수익인식과 비교\n5. 논술형 답안 예시' },
    { id: 30, topic: 'accounting-advanced', question: '금융상품의 분류와 측정을 논하시오.', answer: '사업모형과 계약상 현금흐름에 따라 AC, FVOCI, FVPL로 분류한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 금융상품의 분류와 측정을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 금융자산의 분류기준\n2. 상각후원가 측정\n3. 공정가치 측정\n4. 세무상 취급과 차이\n5. 논술형 답안 예시' },
    { id: 31, topic: 'accounting-advanced', question: '리스회계(K-IFRS 제1116호)를 논하시오.', answer: '리스이용자는 사용권자산과 리스부채를 인식한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 리스회계(K-IFRS 제1116호)를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 리스의 식별\n2. 리스이용자 회계처리\n3. 리스제공자 회계처리\n4. 세무상 리스료 손금인정\n5. 논술형 답안 예시' },
    { id: 32, topic: 'accounting-advanced', question: '연결재무제표 작성절차를 논하시오.', answer: '지배기업은 종속기업을 연결하여 연결재무제표를 작성한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 연결재무제표 작성절차를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 연결범위 결정\n2. 내부거래 제거\n3. 비지배지분\n4. 영업권 인식\n5. 논술형 답안 예시' },
    { id: 33, topic: 'accounting-advanced', question: '충당부채와 우발부채의 회계처리를 논하시오.', answer: '충당부채는 인식하고, 우발부채는 주석으로 공시한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 충당부채와 우발부채의 회계처리를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 충당부채 인식요건\n2. 측정(최선의 추정치)\n3. 우발부채 처리\n4. 세무상 충당금 한도\n5. 논술형 답안 예시' },
    { id: 34, topic: 'accounting-advanced', question: '법인세회계(이연법인세)를 논하시오.', answer: '일시적차이에 대해 이연법인세자산·부채를 인식한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 법인세회계(이연법인세)를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 일시적차이의 개념\n2. 이연법인세자산 인식\n3. 이연법인세부채 인식\n4. 재무제표 표시\n5. 논술형 답안 예시' },
    { id: 35, topic: 'accounting-advanced', question: '유형자산의 재평가모형과 손상을 논하시오.', answer: '재평가모형 선택 시 공정가치로 측정하고 손상검사를 수행한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 유형자산의 재평가모형과 손상을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 원가모형과 재평가모형\n2. 재평가잉여금 처리\n3. 손상차손 인식\n4. 세무상 감가상각 한도\n5. 논술형 답안 예시' },
    { id: 36, topic: 'accounting-advanced', question: '사업결합회계를 논하시오.', answer: '취득법을 적용하여 이전대가와 식별가능순자산 차액을 영업권으로 인식한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 사업결합회계를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 취득법의 적용\n2. 이전대가 측정\n3. 식별가능순자산 공정가치\n4. 영업권과 염가매수차익\n5. 논술형 답안 예시' },
    { id: 37, topic: 'accounting-advanced', question: '주식기준보상의 회계처리를 논하시오.', answer: '주식결제형은 자본, 현금결제형은 부채로 인식한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 주식기준보상의 회계처리를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 주식결제형 보상\n2. 현금결제형 보상\n3. 선택형 보상\n4. 세무상 손금인정 시기\n5. 논술형 답안 예시' },
    { id: 38, topic: 'accounting-advanced', question: '공정가치측정의 체계를 논하시오.', answer: '동일자산 시장가격, 유사자산 시장가격, 평가기법 순으로 측정한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 공정가치측정의 체계를 논하시오.\n\n다음 순서로 설명해주세요:\n1. 공정가치의 정의\n2. 수준1: 활성시장 공시가격\n3. 수준2: 관측가능 투입변수\n4. 수준3: 관측불가능 투입변수\n5. 논술형 답안 예시' },
    { id: 39, topic: 'accounting-advanced', question: '현금흐름표의 작성방법을 논하시오.', answer: '영업활동은 직접법 또는 간접법, 투자·재무활동은 직접법으로 작성한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 현금흐름표의 작성방법을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 직접법과 간접법\n2. 영업활동 현금흐름\n3. 투자활동 현금흐름\n4. 재무활동 현금흐름\n5. 논술형 답안 예시' },
    { id: 40, topic: 'accounting-advanced', question: '회계변경과 오류수정을 논하시오.', answer: '회계정책 변경은 소급적용, 회계추정 변경은 전진적용한다.', prompt: '세무사 2차 세법학 문제입니다.\n\n문제: 회계변경과 오류수정을 논하시오.\n\n다음 순서로 설명해주세요:\n1. 회계정책 변경\n2. 회계추정 변경\n3. 전기오류 수정\n4. 세무조정과의 관계\n5. 논술형 답안 예시' },

    // 논술답안작성 (41-50)
    { id: 41, topic: 'essay-writing', question: '논술형 답안 작성의 기본원칙을 설명하시오.', answer: '논점파악, 법적근거, 논리전개, 결론도출의 순서로 작성한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 논술형 답안 작성의 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 논점 파악 방법\n2. 법적 근거 인용\n3. 논리적 전개 방법\n4. 결론 도출과 마무리\n5. 실전 팁' },
    { id: 42, topic: 'essay-writing', question: '세법학 논술 답안의 구조와 형식을 설명하시오.', answer: '서론-본론-결론 구조로 법조문, 판례, 학설을 인용하여 작성한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 세법학 논술 답안의 구조와 형식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서론 작성법\n2. 본론 전개법\n3. 결론 작성법\n4. 분량 조절\n5. 실전 팁' },
    { id: 43, topic: 'essay-writing', question: '법조문 인용방법과 주의사항을 설명하시오.', answer: '조문번호와 핵심내용을 정확히 인용하고 해석을 덧붙인다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 법조문 인용방법과 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조문 인용 형식\n2. 핵심 키워드 강조\n3. 해석과 적용\n4. 흔한 실수 방지\n5. 실전 팁' },
    { id: 44, topic: 'essay-writing', question: '판례 인용방법과 활용법을 설명하시오.', answer: '대법원 판례의 판시사항을 인용하고 사안에 적용한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 판례 인용방법과 활용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 판례 인용 형식\n2. 판시사항 요약\n3. 사안 적용\n4. 반대해석 주의점\n5. 실전 팁' },
    { id: 45, topic: 'essay-writing', question: '시간배분과 답안분량 조절방법을 설명하시오.', answer: '문제별 배점에 비례하여 시간과 분량을 배분한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 시간배분과 답안분량 조절방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시간 배분 전략\n2. 문제 분석 시간\n3. 답안 작성 시간\n4. 검토 시간 확보\n5. 실전 팁' },
    { id: 46, topic: 'essay-writing', question: '복합형 문제(2개 이상 쟁점) 해결방법을 설명하시오.', answer: '각 쟁점을 분리하여 순차적으로 검토하고 종합 결론을 도출한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 복합형 문제(2개 이상 쟁점) 해결방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 쟁점 분리 방법\n2. 각 쟁점별 검토\n3. 상호관계 분석\n4. 종합 결론\n5. 실전 팁' },
    { id: 47, topic: 'essay-writing', question: '계산문제가 포함된 논술 답안 작성법을 설명하시오.', answer: '계산과정을 명확히 제시하고 법적 근거와 연결한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 계산문제가 포함된 논술 답안 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계산 문제 접근법\n2. 과정과 근거 제시\n3. 논술과 계산 연결\n4. 검산 방법\n5. 실전 팁' },
    { id: 48, topic: 'essay-writing', question: '학설대립 문제의 답안 작성법을 설명하시오.', answer: '각 학설을 설명하고 판례의 입장을 제시한 후 사안에 적용한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 학설대립 문제의 답안 작성법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학설 정리 방법\n2. 판례 입장 제시\n3. 사견 표명\n4. 결론 도출\n5. 실전 팁' },
    { id: 49, topic: 'essay-writing', question: '모범답안 분석과 자가점검 방법을 설명하시오.', answer: '채점기준표를 참고하여 핵심 키워드와 논리구조를 점검한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 모범답안 분석과 자가점검 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모범답안 분석법\n2. 채점기준 이해\n3. 자가점검 체크리스트\n4. 개선점 도출\n5. 실전 팁' },
    { id: 50, topic: 'essay-writing', question: '실전 답안작성 연습 전략을 설명하시오.', answer: '기출문제 풀이, 시간제한 연습, 첨삭피드백을 반복한다.', prompt: '세무사 2차 시험 논술 가이드입니다.\n\n문제: 실전 답안작성 연습 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기출문제 분석\n2. 타이머 연습\n3. 첨삭과 피드백\n4. 오답노트 활용\n5. 실전 팁' },
  ];

  const topics = [
    { id: 'tax-law-part1', name: '세법학1부 (소득세법·법인세법)', count: 15 },
    { id: 'tax-law-part2', name: '세법학2부 (부가가치세법)', count: 13 },
    { id: 'accounting-advanced', name: '회계학 심화', count: 12 },
    { id: 'essay-writing', name: '논술답안작성', count: 10 },
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
            <span className="text-emerald-600 font-medium">세법학 심화</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📖 세법학 심화</h1>
          <p className="text-gray-600">세무사 2차 시험 | 논술형</p>
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
          <Link href="/category/accounting/tax-accountant/study/commercial-law" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 상법</Link>
          <Link href="/category/accounting/tax-accountant/study/practical" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">다음: 실무연습 →</Link>
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
