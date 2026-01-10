'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function IncomeTaxStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['tax-system']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('computerized-tax-2-income-tax-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('computerized-tax-2-income-tax-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 소득세 과세체계 (1-5)
    { id: 1, topic: 'tax-system', question: '소득세의 납세의무자를 설명하시오.', answer: '거주자(국내외 모든 소득), 비거주자(국내원천소득)', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 소득세의 납세의무자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거주자 정의\n2. 비거주자 정의\n3. 과세범위 차이\n4. 거주자 판정기준\n5. 연습문제 3개' },
    { id: 2, topic: 'tax-system', question: '소득세의 과세기간과 납세지를 설명하시오.', answer: '과세기간 1.1~12.31, 납세지는 주소지', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 소득세의 과세기간과 납세지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세기간\n2. 납세지 원칙\n3. 납세지 예외\n4. 사업장 소재지\n5. 연습문제 3개' },
    { id: 3, topic: 'tax-system', question: '종합소득과 분류과세 소득의 차이를 설명하시오.', answer: '종합소득(합산과세), 퇴직/양도소득(분류과세)', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 종합소득과 분류과세 소득의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 종합소득 구성\n2. 분류과세 소득\n3. 과세방식 차이\n4. 세율 적용\n5. 연습문제 3개' },
    { id: 4, topic: 'tax-system', question: '소득세 과세표준과 세율구조를 설명하시오.', answer: '6단계 초과누진세율(6%~45%)', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 소득세 과세표준과 세율구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 구간\n2. 세율 구조\n3. 누진공제액\n4. 세액 계산\n5. 연습문제 3개' },
    { id: 5, topic: 'tax-system', question: '소득세 신고납부 절차를 설명하시오.', answer: '5월 확정신고, 11월 중간예납', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 소득세 신고납부 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 확정신고 기한\n2. 중간예납\n3. 분납제도\n4. 가산세\n5. 연습문제 3개' },

    // 이자소득 (6-10)
    { id: 6, topic: 'interest', question: '이자소득의 범위를 설명하시오.', answer: '예금이자, 채권이자, 저축성보험차익 등', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 이자소득의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예금이자\n2. 채권이자\n3. 저축성보험차익\n4. 비영업대금의 이익\n5. 연습문제 3개' },
    { id: 7, topic: 'interest', question: '비과세 이자소득의 종류를 설명하시오.', answer: '농어가목돈마련저축, 장기주택마련저축 등', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 비과세 이자소득의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비과세 저축\n2. 비과세 요건\n3. 조세특례\n4. 한도금액\n5. 연습문제 3개' },
    { id: 8, topic: 'interest', question: '이자소득의 수입시기를 설명하시오.', answer: '약정에 따른 이자지급일', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 이자소득의 수입시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원칙(지급일)\n2. 해지시 수입시기\n3. 만기일\n4. 특수한 경우\n5. 연습문제 3개' },
    { id: 9, topic: 'interest', question: '이자소득의 원천징수세율을 설명하시오.', answer: '일반이자 14%, 비영업대금 25%', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 이자소득의 원천징수세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일반이자소득(14%)\n2. 비영업대금(25%)\n3. 지방소득세\n4. 분리과세\n5. 연습문제 3개' },
    { id: 10, topic: 'interest', question: '금융소득종합과세 기준을 설명하시오.', answer: '금융소득 2천만원 초과시 종합과세', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 금융소득종합과세 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기준금액(2천만원)\n2. 종합과세 대상\n3. 비교과세\n4. 세액계산\n5. 연습문제 3개' },

    // 배당소득 (11-15)
    { id: 11, topic: 'dividend', question: '배당소득의 범위를 설명하시오.', answer: '내국법인 배당, 의제배당, 인정배당 등', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 배당소득의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금배당\n2. 주식배당\n3. 의제배당\n4. 인정배당\n5. 연습문제 3개' },
    { id: 12, topic: 'dividend', question: '의제배당의 종류를 설명하시오.', answer: '잉여금 자본전입, 감자, 해산, 합병 시 배당', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 의제배당의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 잉여금 자본전입\n2. 감자 의제배당\n3. 해산 의제배당\n4. 합병 의제배당\n5. 연습문제 3개' },
    { id: 13, topic: 'dividend', question: '배당소득 Gross-up 제도를 설명하시오.', answer: '법인세 이중과세 조정을 위한 11% 가산', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 배당소득 Gross-up 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Gross-up 목적\n2. 가산율(11%)\n3. 대상배당\n4. 배당세액공제\n5. 연습문제 3개' },
    { id: 14, topic: 'dividend', question: '배당소득의 수입시기를 설명하시오.', answer: '잉여금처분결의일, 주식배당 결의일', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 배당소득의 수입시기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금배당\n2. 주식배당\n3. 의제배당\n4. 집합투자기구\n5. 연습문제 3개' },
    { id: 15, topic: 'dividend', question: '배당소득의 원천징수를 설명하시오.', answer: '14% 원천징수, 지방소득세 1.4% 별도', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 배당소득의 원천징수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원천징수세율\n2. 지방소득세\n3. 원천징수시기\n4. 원천징수의무자\n5. 연습문제 3개' },

    // 사업소득 (16-20)
    { id: 16, topic: 'business', question: '사업소득의 범위를 설명하시오.', answer: '영리를 목적으로 계속적, 반복적 활동 소득', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 사업소득의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업소득 정의\n2. 업종 분류\n3. 판단기준\n4. 기타소득과 구분\n5. 연습문제 3개' },
    { id: 17, topic: 'business', question: '사업소득 필요경비의 범위를 설명하시오.', answer: '수입금액에 대응하는 비용, 일반적으로 인정되는 통상적 비용', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 사업소득 필요경비의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필요경비 정의\n2. 인정요건\n3. 불산입 항목\n4. 증빙요건\n5. 연습문제 3개' },
    { id: 18, topic: 'business', question: '기장의무와 추계과세를 설명하시오.', answer: '복식부기의무자, 간편장부대상자, 추계', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 기장의무와 추계과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복식부기의무자\n2. 간편장부대상자\n3. 추계과세\n4. 가산세\n5. 연습문제 3개' },
    { id: 19, topic: 'business', question: '경비율 제도를 설명하시오.', answer: '단순경비율, 기준경비율 적용', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 경비율 제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단순경비율\n2. 기준경비율\n3. 적용대상\n4. 소득금액 계산\n5. 연습문제 3개' },
    { id: 20, topic: 'business', question: '부동산임대업의 소득계산을 설명하시오.', answer: '임대료수입 - 필요경비 = 임대소득', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 부동산임대업의 소득계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임대소득 범위\n2. 간주임대료\n3. 필요경비\n4. 분리과세(주택)\n5. 연습문제 3개' },

    // 근로소득 (21-25)
    { id: 21, topic: 'employment', question: '근로소득의 범위를 설명하시오.', answer: '고용관계에 의해 받는 급여, 상여, 수당 등', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 근로소득의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근로소득 정의\n2. 급여 종류\n3. 수입시기\n4. 근로 판정\n5. 연습문제 3개' },
    { id: 22, topic: 'employment', question: '비과세 근로소득의 종류를 설명하시오.', answer: '식대 20만원, 자가운전보조금 20만원 등', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 비과세 근로소득의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 식대(20만원)\n2. 자가운전보조금\n3. 출산육아수당\n4. 기타 비과세\n5. 연습문제 3개' },
    { id: 23, topic: 'employment', question: '근로소득공제의 계산방법을 설명하시오.', answer: '총급여 구간별 공제율 적용', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 근로소득공제의 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제 구간\n2. 공제율\n3. 한도액\n4. 계산 사례\n5. 연습문제 3개' },
    { id: 24, topic: 'employment', question: '연말정산의 절차를 설명하시오.', answer: '2월 급여지급시 정산, 3월 10일까지 신고', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 연말정산의 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정산시기\n2. 절차\n3. 제출서류\n4. 지급명세서\n5. 연습문제 3개' },
    { id: 25, topic: 'employment', question: '일용근로자의 소득세를 설명하시오.', answer: '(일급 - 15만원) x 6% 원천징수', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 일용근로자의 소득세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일용근로자 정의\n2. 세액계산\n3. 비과세 금액\n4. 근로장려금\n5. 연습문제 3개' },

    // 연금소득 (26-30)
    { id: 26, topic: 'pension', question: '연금소득의 범위를 설명하시오.', answer: '공적연금, 사적연금으로 구분', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 연금소득의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공적연금 범위\n2. 사적연금 범위\n3. 일시금 수령\n4. 연금 외 수령\n5. 연습문제 3개' },
    { id: 27, topic: 'pension', question: '공적연금의 종류를 설명하시오.', answer: '국민연금, 공무원연금, 사학연금, 군인연금', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 공적연금의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국민연금\n2. 공무원연금\n3. 사학연금\n4. 군인연금\n5. 연습문제 3개' },
    { id: 28, topic: 'pension', question: '사적연금의 종류를 설명하시오.', answer: '연금저축, 퇴직연금(DC, IRP)', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 사적연금의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연금저축\n2. 퇴직연금(DC)\n3. 개인형퇴직연금(IRP)\n4. 연금보험\n5. 연습문제 3개' },
    { id: 29, topic: 'pension', question: '연금소득공제를 설명하시오.', answer: '총연금액 구간별 공제(최대 900만원)', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 연금소득공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제 구간\n2. 공제율\n3. 한도액\n4. 계산 사례\n5. 연습문제 3개' },
    { id: 30, topic: 'pension', question: '연금소득의 분리과세 요건을 설명하시오.', answer: '사적연금 연 1,500만원 이하 분리과세 선택', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 연금소득의 분리과세 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분리과세 대상\n2. 한도금액\n3. 세율\n4. 선택 방법\n5. 연습문제 3개' },

    // 기타소득 (31-35)
    { id: 31, topic: 'other', question: '기타소득의 범위를 설명하시오.', answer: '일시적, 우발적 소득(상금, 강연료, 원고료 등)', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 기타소득의 범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기타소득 정의\n2. 상금, 현상금\n3. 강연료, 원고료\n4. 복권당첨금\n5. 연습문제 3개' },
    { id: 32, topic: 'other', question: '기타소득의 필요경비를 설명하시오.', answer: '원고료 등 60%, 복권당첨 구입비 실제금액', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 기타소득의 필요경비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필요경비율(60%)\n2. 80% 적용 대상\n3. 실제경비 공제\n4. 필요경비 없는 경우\n5. 연습문제 3개' },
    { id: 33, topic: 'other', question: '기타소득의 원천징수세율을 설명하시오.', answer: '기타소득금액의 20%, 복권 30%', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 기타소득의 원천징수세율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일반 기타소득(20%)\n2. 복권당첨(30%)\n3. 지방소득세\n4. 원천징수 계산\n5. 연습문제 3개' },
    { id: 34, topic: 'other', question: '기타소득의 분리과세와 종합과세를 설명하시오.', answer: '기타소득금액 300만원 이하 분리과세 선택', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 기타소득의 분리과세와 종합과세를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분리과세 요건\n2. 종합과세\n3. 유리한 방법 선택\n4. 무조건 분리과세\n5. 연습문제 3개' },
    { id: 35, topic: 'other', question: '비과세 기타소득을 설명하시오.', answer: '서화, 골동품 양도(6천만원 이하) 등', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 비과세 기타소득을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서화골동품(6천만원)\n2. 국가유공자 보상금\n3. 문예창작품\n4. 기타 비과세\n5. 연습문제 3개' },

    // 원천징수 (36-40)
    { id: 36, topic: 'withholding', question: '원천징수의 개념과 목적을 설명하시오.', answer: '소득지급시 세금을 미리 징수하여 납부', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 원천징수의 개념과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원천징수 정의\n2. 목적\n3. 원천징수의무자\n4. 납세의무자\n5. 연습문제 3개' },
    { id: 37, topic: 'withholding', question: '원천징수세율을 소득별로 설명하시오.', answer: '이자 14%, 배당 14%, 근로 간이세액표', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 원천징수세율을 소득별로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이자소득\n2. 배당소득\n3. 근로소득\n4. 기타소득\n5. 연습문제 3개' },
    { id: 38, topic: 'withholding', question: '원천징수 납부절차를 설명하시오.', answer: '징수일이 속하는 달의 다음달 10일까지', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 원천징수 납부절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 납부기한\n2. 반기별 납부\n3. 납부서 작성\n4. 가산세\n5. 연습문제 3개' },
    { id: 39, topic: 'withholding', question: '원천징수이행상황신고서를 설명하시오.', answer: '원천징수세액 신고를 위한 신고서', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 원천징수이행상황신고서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신고서 목적\n2. 신고기한\n3. 작성방법\n4. 제출처\n5. 연습문제 3개' },
    { id: 40, topic: 'withholding', question: '지급명세서 제출의무를 설명하시오.', answer: '소득을 지급한 자가 지급내역 제출', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 지급명세서 제출의무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제출의무자\n2. 제출기한\n3. 지급명세서 종류\n4. 미제출 가산세\n5. 연습문제 3개' },

    // 종합소득공제 (41-45)
    { id: 41, topic: 'deduction', question: '인적공제의 종류와 요건을 설명하시오.', answer: '기본공제(150만원), 추가공제(경로우대 등)', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 인적공제의 종류와 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기본공제\n2. 추가공제\n3. 부양가족 요건\n4. 중복공제 금지\n5. 연습문제 3개' },
    { id: 42, topic: 'deduction', question: '부양가족의 판정기준을 설명하시오.', answer: '나이요건, 소득요건(100만원), 생계요건', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 부양가족의 판정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 나이요건\n2. 소득요건\n3. 생계요건\n4. 판정시점\n5. 연습문제 3개' },
    { id: 43, topic: 'deduction', question: '연금보험료공제를 설명하시오.', answer: '국민연금 등 공적연금 전액 공제', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 연금보험료공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공적연금\n3. 공제금액\n4. 공제한도\n5. 연습문제 3개' },
    { id: 44, topic: 'deduction', question: '특별소득공제를 설명하시오.', answer: '건강보험료, 고용보험료, 주택자금공제', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 특별소득공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보험료공제\n2. 주택자금공제\n3. 공제한도\n4. 적용순서\n5. 연습문제 3개' },
    { id: 45, topic: 'deduction', question: '신용카드 등 소득공제를 설명하시오.', answer: '총급여 25% 초과분, 신용카드 15%', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 신용카드 등 소득공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공제율\n3. 공제한도\n4. 제외항목\n5. 연습문제 3개' },

    // 세액계산 (46-50)
    { id: 46, topic: 'tax-calc', question: '산출세액의 계산방법을 설명하시오.', answer: '과세표준 x 세율 = 산출세액', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 산출세액의 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과세표준 계산\n2. 세율 적용\n3. 누진공제\n4. 산출세액\n5. 연습문제 3개' },
    { id: 47, topic: 'tax-calc', question: '세액공제의 종류를 설명하시오.', answer: '자녀세액공제, 연금계좌, 보험료, 의료비 등', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 세액공제의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자녀세액공제\n2. 연금계좌세액공제\n3. 보험료세액공제\n4. 의료비세액공제\n5. 연습문제 3개' },
    { id: 48, topic: 'tax-calc', question: '근로소득 세액공제를 설명하시오.', answer: '산출세액의 55~30%, 최대 74만원', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 근로소득 세액공제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공제대상\n2. 공제율\n3. 한도액\n4. 총급여별 차등\n5. 연습문제 3개' },
    { id: 49, topic: 'tax-calc', question: '결정세액과 납부세액의 계산을 설명하시오.', answer: '결정세액 = 산출세액 - 세액공제, 납부세액 = 결정세액 - 기납부세액', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 결정세액과 납부세액의 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산출세액\n2. 세액공제\n3. 결정세액\n4. 납부(환급)세액\n5. 연습문제 3개' },
    { id: 50, topic: 'tax-calc', question: '소득세 가산세의 종류를 설명하시오.', answer: '무신고, 과소신고, 납부지연 가산세 등', prompt: '전산세무 2급 소득세 문제입니다.\n\n문제: 소득세 가산세의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무신고가산세\n2. 과소신고가산세\n3. 납부지연가산세\n4. 기장불성실가산세\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'tax-system', name: '소득세 과세체계', icon: '📋', count: 5 },
    { id: 'interest', name: '이자소득', icon: '💰', count: 5 },
    { id: 'dividend', name: '배당소득', icon: '📈', count: 5 },
    { id: 'business', name: '사업소득', icon: '🏪', count: 5 },
    { id: 'employment', name: '근로소득', icon: '💼', count: 5 },
    { id: 'pension', name: '연금소득', icon: '👴', count: 5 },
    { id: 'other', name: '기타소득', icon: '📦', count: 5 },
    { id: 'withholding', name: '원천징수', icon: '🏦', count: 5 },
    { id: 'deduction', name: '종합소득공제', icon: '📝', count: 5 },
    { id: 'tax-calc', name: '세액계산', icon: '🧮', count: 5 },
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
            <Link href="/category/accounting/computerized-tax-2" className="text-gray-500 hover:text-gray-700">전산세무 2급</Link>
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
              <p className="text-pink-100">전산세무 2급 | 과세체계, 이자/배당/사업/근로/연금/기타소득, 원천징수, 공제, 세액계산</p>
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
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
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
          <Link href="/category/accounting/computerized-tax-2" className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
            전산세무 2급 메인으로 돌아가기
          </Link>
        </div>
      </div>

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
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">2026 자격증 가이드. 전산세무 2급 소득세 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
