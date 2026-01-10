'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FinancialAccountingStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['financial']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cpa-financial-accounting-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('cpa-financial-accounting-completed', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 금융상품 (1-13)
    { id: 1, topic: 'financial', question: '금융자산의 분류 기준(사업모형, SPPI)을 설명하시오.', answer: '사업모형: 보유목적, SPPI: 계약현금흐름특성', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 금융자산 분류 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업모형 평가\n2. SPPI 테스트\n3. 분류 유형(FVPL, FVOCI, AC)\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 2, topic: 'financial', question: 'FVPL 금융자산의 회계처리를 설명하시오.', answer: '공정가치 변동을 당기손익으로 인식', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: FVPL 금융자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최초 측정\n2. 후속 측정\n3. 거래원가 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 3, topic: 'financial', question: 'FVOCI 금융자산(채무상품)의 회계처리를 설명하시오.', answer: '공정가치 변동을 OCI로 인식, 손상·이자·환차는 당기손익', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: FVOCI 채무상품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 요건\n2. 이자수익 인식\n3. 평가손익 처리\n4. 제거시 재분류\n5. 연습문제 3개' },
    { id: 4, topic: 'financial', question: 'AC(상각후원가) 금융자산의 회계처리를 설명하시오.', answer: '유효이자율법으로 상각, 손상차손 인식', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: AC 금융자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 요건\n2. 유효이자율법\n3. 손상 인식\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 5, topic: 'financial', question: '금융자산 손상(ECL 모형)을 설명하시오.', answer: '기대신용손실 인식, 3단계 손상 모형', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: ECL 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 3단계 손상 모형\n2. 12개월 ECL\n3. 전체기간 ECL\n4. 손상 회계처리\n5. 연습문제 3개' },
    { id: 6, topic: 'financial', question: '금융자산 제거의 요건을 설명하시오.', answer: '현금흐름 권리 소멸, 위험과 보상 이전', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 금융자산 제거를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제거 요건\n2. 위험과 보상 평가\n3. 통제 평가\n4. 지속적 관여\n5. 연습문제 3개' },
    { id: 7, topic: 'financial', question: '파생상품의 정의와 회계처리를 설명하시오.', answer: '기초변수 존재, 적은 투자, 미래결제', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 파생상품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파생상품 정의\n2. 선도계약 회계\n3. 옵션 회계\n4. 스왑 회계\n5. 연습문제 3개' },
    { id: 8, topic: 'financial', question: '공정가치위험회피회계를 설명하시오.', answer: '위험회피대상의 공정가치 변동을 당기손익', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 공정가치위험회피를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용요건\n2. 위험회피대상 회계\n3. 위험회피수단 회계\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 9, topic: 'financial', question: '현금흐름위험회피회계를 설명하시오.', answer: '위험회피수단 평가손익을 OCI로 이연', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 현금흐름위험회피를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적용요건\n2. 효과적 부분 처리\n3. 비효과적 부분 처리\n4. 재분류 조정\n5. 연습문제 3개' },
    { id: 10, topic: 'financial', question: '내재파생상품의 분리를 설명하시오.', answer: '주계약과 다른 성격, 분리 측정', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 내재파생상품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내재파생상품 정의\n2. 분리 요건\n3. 회계처리\n4. 사례\n5. 연습문제 3개' },
    { id: 11, topic: 'financial', question: '전환사채의 회계처리를 설명하시오.', answer: '부채요소와 자본요소 분리 측정', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 전환사채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 요소 분리\n2. 부채요소 측정\n3. 자본요소 측정\n4. 전환시 회계처리\n5. 연습문제 3개' },
    { id: 12, topic: 'financial', question: '신주인수권부사채의 회계처리를 설명하시오.', answer: '사채와 신주인수권 분리', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 신주인수권부사채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분리형 vs 비분리형\n2. 공정가치 배분\n3. 행사시 회계\n4. 상환시 회계\n5. 연습문제 3개' },
    { id: 13, topic: 'financial', question: '금융부채의 분류와 측정을 설명하시오.', answer: 'FVPL, 상각후원가 / 공정가치옵션', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 금융부채를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 기준\n2. 상각후원가 측정\n3. 공정가치옵션\n4. 자기신용위험 변동\n5. 연습문제 3개' },

    // 수익인식 (14-25)
    { id: 14, topic: 'revenue', question: '수익인식 5단계 모형을 설명하시오.', answer: '계약→이행의무→거래가격→배분→수익인식', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 수익인식 5단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1단계 계약식별\n2. 2단계 이행의무\n3. 3단계 거래가격\n4. 4-5단계 배분과 인식\n5. 연습문제 3개' },
    { id: 15, topic: 'revenue', question: '이행의무의 식별을 설명하시오.', answer: '구별되는 재화·용역, 일련의 구별되는 재화·용역', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 이행의무 식별을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구별 가능성\n2. 단일 이행의무\n3. 일련의 재화·용역\n4. 사례\n5. 연습문제 3개' },
    { id: 16, topic: 'revenue', question: '변동대가의 추정과 제약을 설명하시오.', answer: '기댓값, 가능성 높은 금액 / 환입가능성 제약', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 변동대가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변동대가 유형\n2. 추정 방법\n3. 제약 조건\n4. 환불부채\n5. 연습문제 3개' },
    { id: 17, topic: 'revenue', question: '유의적 금융요소를 설명하시오.', answer: '1년 이상 선수금/후수금시 이자 조정', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 유의적 금융요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 금융요소 식별\n2. 거래가격 조정\n3. 이자수익/비용\n4. 실무적 간편법\n5. 연습문제 3개' },
    { id: 18, topic: 'revenue', question: '기간에 걸쳐 이행하는 수익을 설명하시오.', answer: '진행률에 따라 수익 인식, 투입법/산출법', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 기간 수익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인식 요건\n2. 투입법\n3. 산출법\n4. 진행률 측정\n5. 연습문제 3개' },
    { id: 19, topic: 'revenue', question: '본인과 대리인의 구분을 설명하시오.', answer: '본인: 총액, 대리인: 순액 수익인식', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 본인과 대리인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 판단 기준\n2. 통제 여부\n3. 총액 vs 순액\n4. 사례\n5. 연습문제 3개' },
    { id: 20, topic: 'revenue', question: '라이선스 수익을 설명하시오.', answer: '사용권 vs 접근권, 한 시점 vs 기간', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 라이선스 수익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라이선스 유형\n2. 사용권 라이선스\n3. 접근권 라이선스\n4. 로열티 제약\n5. 연습문제 3개' },
    { id: 21, topic: 'revenue', question: '계약변경의 회계처리를 설명하시오.', answer: '별도 계약, 기존 계약 종료, 누적효과 조정', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 계약변경을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 별도 계약 처리\n2. 기존 계약 종료\n3. 누적효과 조정\n4. 사례\n5. 연습문제 3개' },
    { id: 22, topic: 'revenue', question: '고객충성제도의 회계처리를 설명하시오.', answer: '옵션으로 별도 이행의무, 거래가격 배분', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 고객충성제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중요한 권리 판단\n2. 거래가격 배분\n3. 포인트 사용시 수익\n4. 사례\n5. 연습문제 3개' },
    { id: 23, topic: 'revenue', question: '위탁판매와 반품권부 판매를 설명하시오.', answer: '위탁: 수탁자 판매시 인식, 반품: 환불부채', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 위탁판매와 반품권을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위탁판매 인식시점\n2. 반품권 처리\n3. 환불부채\n4. 반환자산\n5. 연습문제 3개' },
    { id: 24, topic: 'revenue', question: '건설계약의 수익인식을 설명하시오.', answer: '진행기준, 투입원가비율', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 건설계약을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기간 인식 요건\n2. 진행률 계산\n3. 계약자산/부채\n4. 손실예상 처리\n5. 연습문제 3개' },
    { id: 25, topic: 'revenue', question: '계약원가의 자본화를 설명하시오.', answer: '계약체결 증분원가, 계약이행원가', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 계약원가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계약체결원가\n2. 계약이행원가\n3. 상각\n4. 손상\n5. 연습문제 3개' },

    // 연결재무제표 (26-38)
    { id: 26, topic: 'consolidation', question: '지배력의 판단 기준을 설명하시오.', answer: '힘, 변동이익 노출, 연관관계', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 지배력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지배력 3요소\n2. 힘의 원천\n3. 변동이익\n4. 연관관계\n5. 연습문제 3개' },
    { id: 27, topic: 'consolidation', question: '연결범위와 연결제외를 설명하시오.', answer: '모든 종속기업 연결, 투자기업 예외', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 연결범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연결대상 판단\n2. 연결제외 사유\n3. 투자기업 예외\n4. 실무적 고려\n5. 연습문제 3개' },
    { id: 28, topic: 'consolidation', question: '취득일의 연결회계처리를 설명하시오.', answer: '이전대가, 식별가능순자산, 영업권', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 취득일 연결을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이전대가 측정\n2. 순자산 공정가치\n3. 영업권 계산\n4. 취득관련원가\n5. 연습문제 3개' },
    { id: 29, topic: 'consolidation', question: '비지배지분의 측정과 변동을 설명하시오.', answer: '공정가치법, 비례적지분법', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 비지배지분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최초 측정\n2. 후속 측정\n3. 손익 배분\n4. 지분변동\n5. 연습문제 3개' },
    { id: 30, topic: 'consolidation', question: '연결조정분개의 유형을 설명하시오.', answer: '투자계정과 자본 상계, 내부거래 제거', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 연결조정분개를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투자계정 상계\n2. 내부거래 제거\n3. 미실현손익 제거\n4. 이연법인세\n5. 연습문제 3개' },
    { id: 31, topic: 'consolidation', question: '재고자산 내부거래의 연결조정을 설명하시오.', answer: '미실현이익 제거, 이연법인세', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 재고자산 내부거래를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하향판매 조정\n2. 상향판매 조정\n3. NCI 배분\n4. 이연법인세\n5. 연습문제 3개' },
    { id: 32, topic: 'consolidation', question: '유형자산 내부거래의 연결조정을 설명하시오.', answer: '처분손익 제거, 감가상각 조정', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 유형자산 내부거래를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 처분손익 제거\n2. 감가상각 조정\n3. 후속연도 조정\n4. NCI 영향\n5. 연습문제 3개' },
    { id: 33, topic: 'consolidation', question: '지배력 상실 없는 지분변동을 설명하시오.', answer: '자본거래, 손익 인식 안함', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 지분변동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 추가 취득\n2. 일부 처분\n3. 자본거래 처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 34, topic: 'consolidation', question: '지배력 상실의 회계처리를 설명하시오.', answer: '종속기업 제거, 잔여지분 공정가치', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 지배력 상실을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제거 손익\n2. 잔여지분 측정\n3. OCI 재분류\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 35, topic: 'consolidation', question: '단계적 취득의 회계처리를 설명하시오.', answer: '기존 지분 공정가치로 재측정', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 단계적 취득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기존 지분 재측정\n2. 손익 인식\n3. 취득일 회계\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 36, topic: 'consolidation', question: '관계기업 지분법을 설명하시오.', answer: '유의적 영향력, 지분법손익 인식', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 지분법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유의적 영향력\n2. 지분법 적용\n3. 내부거래 조정\n4. 손상\n5. 연습문제 3개' },
    { id: 37, topic: 'consolidation', question: '공동약정의 회계처리를 설명하시오.', answer: '공동영업, 공동기업 구분', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 공동약정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공동지배력\n2. 공동영업 vs 공동기업\n3. 각각의 회계처리\n4. 분개 예시\n5. 연습문제 3개' },
    { id: 38, topic: 'consolidation', question: '영업권 손상검사를 설명하시오.', answer: 'CGU별 검사, 회수가능액', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 영업권 손상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손상검사 시기\n2. CGU 배분\n3. 회수가능액 측정\n4. 손상차손 배분\n5. 연습문제 3개' },

    // 기타 (39-50)
    { id: 39, topic: 'others', question: '리스이용자 회계처리를 설명하시오.', answer: '사용권자산과 리스부채 인식', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 리스이용자 회계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사용권자산 측정\n2. 리스부채 측정\n3. 후속 측정\n4. 재평가와 변경\n5. 연습문제 3개' },
    { id: 40, topic: 'others', question: '확정급여제도의 회계처리를 설명하시오.', answer: '확정급여부채, 순이자, 재측정요소', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 확정급여제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확정급여채무\n2. 사외적립자산\n3. 순이자원가\n4. 재측정요소(OCI)\n5. 연습문제 3개' },
    { id: 41, topic: 'others', question: '이연법인세의 인식과 측정을 설명하시오.', answer: '일시적차이, 이연법인세자산/부채', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 이연법인세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일시적차이 유형\n2. 이연법인세자산\n3. 이연법인세부채\n4. 세율변경\n5. 연습문제 3개' },
    { id: 42, topic: 'others', question: '주식기준보상의 회계처리를 설명하시오.', answer: '주식결제형, 현금결제형', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 주식기준보상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주식결제형\n2. 현금결제형\n3. 가득조건\n4. 조건변경\n5. 연습문제 3개' },
    { id: 43, topic: 'others', question: '기본주당이익과 희석주당이익을 설명하시오.', answer: '보통주 귀속 당기순이익 / 가중평균주식수', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 주당이익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본주당이익\n2. 가중평균주식수\n3. 희석주당이익\n4. 반희석효과\n5. 연습문제 3개' },
    { id: 44, topic: 'others', question: '외화거래와 해외사업장 환산을 설명하시오.', answer: '기능통화 환산, 표시통화 환산', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 외화환산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기능통화 결정\n2. 외화거래 환산\n3. 해외사업장 환산\n4. 환산차이 처리\n5. 연습문제 3개' },
    { id: 45, topic: 'others', question: '사업결합 취득법을 설명하시오.', answer: '취득자 식별, 이전대가, 영업권', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 취득법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취득자 식별\n2. 취득일 결정\n3. 이전대가 측정\n4. 영업권/염가매수\n5. 연습문제 3개' },
    { id: 46, topic: 'others', question: '자산손상의 회계처리를 설명하시오.', answer: '회수가능액 = Max(순공정가치, 사용가치)', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 자산손상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손상징후\n2. 회수가능액\n3. 손상차손 인식\n4. 손상차손 환입\n5. 연습문제 3개' },
    { id: 47, topic: 'others', question: '중단영업의 표시와 공시를 설명하시오.', answer: '별도 표시, 처분자산집단', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 중단영업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중단영업 정의\n2. 처분자산집단\n3. 손익 표시\n4. 재분류\n5. 연습문제 3개' },
    { id: 48, topic: 'others', question: '회계정책변경과 오류수정을 설명하시오.', answer: '소급적용, 전진적용, 재작성', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 회계정책변경을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회계정책변경\n2. 회계추정변경\n3. 오류수정\n4. 공시\n5. 연습문제 3개' },
    { id: 49, topic: 'others', question: '보고기간후사건의 회계처리를 설명하시오.', answer: '수정후속사건, 비수정후속사건', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 보고기간후사건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수정후속사건\n2. 비수정후속사건\n3. 계속기업\n4. 공시\n5. 연습문제 3개' },
    { id: 50, topic: 'others', question: '공정가치 측정과 서열체계를 설명하시오.', answer: '3수준 서열, 활성시장 여부', prompt: '공인회계사 2차 재무회계 문제입니다.\n\n문제: 공정가치 서열을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공정가치 정의\n2. 수준 1 투입변수\n3. 수준 2 투입변수\n4. 수준 3 투입변수\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'financial', name: '금융상품', icon: '💳', count: 13 },
    { id: 'revenue', name: '수익인식', icon: '💰', count: 12 },
    { id: 'consolidation', name: '연결재무제표', icon: '🏢', count: 13 },
    { id: 'others', name: '기타', icon: '📑', count: 12 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/accounting/cpa" className="text-gray-500 hover:text-gray-700">공인회계사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">재무회계(2차)</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">💰</div>
            <div>
              <h1 className="text-2xl font-bold">재무회계 (2차 심화)</h1>
              <p className="text-emerald-100">2차 시험 240분 | 금융상품, 수익인식, 연결회계</p>
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
                    ? 'bg-emerald-100 border-2 border-emerald-300'
                    : 'bg-white border border-gray-200 hover:border-emerald-200'
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
                              ? 'bg-emerald-500 border-emerald-500 text-white'
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
                              className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition flex-shrink-0"
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
          <Link href="/category/accounting/cpa/study/accounting-theory" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 회계학
          </Link>
          <Link href="/category/accounting/cpa/study/practical" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
            실무연습 →
          </Link>
        </div>
      </div>

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 재무회계 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
