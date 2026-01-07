'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  topic: string;
  question: string;
  answer: string;
  prompt: string;
}

const questions: Question[] = [
  // 더존 Smart A 기본 (5문항)
  {
    id: 1,
    topic: '더존 Smart A 기본',
    question: '더존 Smart A에서 신규 회사를 등록할 때 법인/개인 구분 설정이 중요한 이유는?',
    answer: '법인/개인 구분에 따라 세무신고서 양식, 원천징수 처리, 법인세/소득세 적용이 달라지므로 최초 등록 시 정확히 설정해야 합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 더존 Smart A에서 신규 회사를 등록할 때 법인/개인 구분 설정이 중요한 이유는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 2,
    topic: '더존 Smart A 기본',
    question: '회사등록 시 "사업장 정보"에서 주소득구분(원천징수)을 설정하는 목적은?',
    answer: '원천징수이행상황신고서 작성 시 소득 구분별로 자동 집계되며, 근로소득/사업소득/기타소득 등의 원천세 신고에 활용됩니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 회사등록 시 "사업장 정보"에서 주소득구분(원천징수)을 설정하는 목적은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 3,
    topic: '더존 Smart A 기본',
    question: '기초정보설정에서 거래처등록 시 "세금계산서 구분"을 설정하는 이유는?',
    answer: '거래처별로 전자세금계산서/종이세금계산서 발행 여부를 구분하여 세금계산서합계표 작성 시 자동 분류됩니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 기초정보설정에서 거래처등록 시 "세금계산서 구분"을 설정하는 이유는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 4,
    topic: '더존 Smart A 기본',
    question: '계정과목등록에서 "관리항목"을 연결하는 목적과 주요 관리항목 종류는?',
    answer: '계정과목에 거래처, 부서, 프로젝트 등 관리항목을 연결하면 해당 항목별 상세 집계와 분석이 가능합니다. 외상매출금-거래처, 인건비-사원 등이 대표적입니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 계정과목등록에서 "관리항목"을 연결하는 목적과 주요 관리항목 종류는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 5,
    topic: '더존 Smart A 기본',
    question: '사원등록에서 입력해야 하는 필수 정보와 급여 관련 설정 항목은?',
    answer: '사원번호, 성명, 주민등록번호, 입사일은 필수이며, 급여 탭에서 지급항목, 공제항목, 급여이체계좌 등을 설정해야 급여처리가 가능합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 사원등록에서 입력해야 하는 필수 정보와 급여 관련 설정 항목은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },

  // 부가가치세 실무 (5문항)
  {
    id: 6,
    topic: '부가가치세 실무',
    question: '매입매출전표에서 과세유형 "11.과세"와 "12.영세"의 차이점과 각각 적용되는 거래는?',
    answer: '"11.과세"는 국내 일반 과세거래(10% 부가세), "12.영세"는 수출, 외화획득 재화용역 등 0% 세율이 적용되는 거래에 사용합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 매입매출전표에서 과세유형 "11.과세"와 "12.영세"의 차이점과 각각 적용되는 거래는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 7,
    topic: '부가가치세 실무',
    question: '전자세금계산서 발급 후 수정세금계산서를 발급해야 하는 사유와 수정 유형은?',
    answer: '기재사항 착오, 환입, 계약해제, 내국신용장 사후개설 등의 사유로 수정세금계산서를 발급하며, 각 사유에 맞는 수정 유형을 선택해야 합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 전자세금계산서 발급 후 수정세금계산서를 발급해야 하는 사유와 수정 유형은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 8,
    topic: '부가가치세 실무',
    question: '부가세신고서에서 "매출세액"과 "매입세액"의 차액이 음수인 경우 처리 방법은?',
    answer: '매입세액이 매출세액보다 큰 경우 환급세액이 발생하며, 신고서 "환급세액" 항목에 기재하고 환급신청 또는 다음 기 이월을 선택합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 부가세신고서에서 "매출세액"과 "매입세액"의 차액이 음수인 경우 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 9,
    topic: '부가가치세 실무',
    question: '매입세액불공제 항목을 입력할 때 사용하는 과세유형과 대표적인 불공제 사유는?',
    answer: '"54.불공"을 사용하며, 비영업용 소형승용차 관련 매입, 접대비 관련 매입, 면세사업 관련 매입 등이 대표적인 불공제 사유입니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 매입세액불공제 항목을 입력할 때 사용하는 과세유형과 대표적인 불공제 사유는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 10,
    topic: '부가가치세 실무',
    question: '부가세신고서 부속서류인 "매출처별세금계산서합계표"와 "매입처별세금계산서합계표" 작성 시 자동 집계 조건은?',
    answer: '매입매출전표에 입력된 거래처정보와 세금계산서 번호가 있는 과세/영세 거래가 자동 집계되며, 거래처 사업자등록번호가 정확해야 합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 부가세신고서 부속서류인 "매출처별세금계산서합계표"와 "매입처별세금계산서합계표" 작성 시 자동 집계 조건은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },

  // 원천징수 실무 (5문항)
  {
    id: 11,
    topic: '원천징수 실무',
    question: '급여자료입력에서 "귀속월"과 "지급월"을 구분하여 입력하는 이유는?',
    answer: '귀속월은 급여가 발생한 월, 지급월은 실제 지급한 월로 원천징수 시기와 신고 귀속기간이 달라질 수 있어 정확히 구분해야 합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 급여자료입력에서 "귀속월"과 "지급월"을 구분하여 입력하는 이유는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 12,
    topic: '원천징수 실무',
    question: '간이세액표 적용 시 "부양가족 수"에 포함되는 공제대상자의 범위는?',
    answer: '본인을 포함하여 배우자, 부양가족(직계존속, 직계비속, 형제자매 등) 중 연간 소득금액 100만원 이하인 자가 포함됩니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 간이세액표 적용 시 "부양가족 수"에 포함되는 공제대상자의 범위는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 13,
    topic: '원천징수 실무',
    question: '원천징수이행상황신고서에서 "소득지급 인원"과 "총지급액"이 불일치하는 경우 확인해야 할 사항은?',
    answer: '급여자료 입력 누락, 귀속월/지급월 오류, 사원등록 미비, 중도퇴사자 처리 등을 점검하고 급여대장과 원천징수부를 대조해야 합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 원천징수이행상황신고서에서 "소득지급 인원"과 "총지급액"이 불일치하는 경우 확인해야 할 사항은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 14,
    topic: '원천징수 실무',
    question: '사업소득자(3.3% 원천징수)에게 지급한 금액의 원천징수 처리 방법은?',
    answer: '사업소득자 등록 후 기타소득/사업소득 지급자료를 입력하고, 지급액의 3.3%(소득세 3% + 지방소득세 0.3%)를 원천징수합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 사업소득자(3.3% 원천징수)에게 지급한 금액의 원천징수 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 15,
    topic: '원천징수 실무',
    question: '근로소득원천징수영수증 발급 시 "비과세소득" 항목에 포함되는 대표적인 항목은?',
    answer: '식대(월 20만원), 자가운전보조금(월 20만원), 연구활동비, 출산/보육수당(월 10만원) 등이 대표적인 비과세소득입니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 근로소득원천징수영수증 발급 시 "비과세소득" 항목에 포함되는 대표적인 항목은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },

  // 연말정산 실무 (5문항)
  {
    id: 16,
    topic: '연말정산 실무',
    question: '연말정산 간소화 자료를 일괄 업로드하는 방법과 주의사항은?',
    answer: '국세청 홈택스에서 PDF 파일 다운로드 후 더존에서 간소화자료 업로드 메뉴를 통해 일괄 등록합니다. 사원 주민번호 일치 여부를 확인해야 합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 연말정산 간소화 자료를 일괄 업로드하는 방법과 주의사항은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 17,
    topic: '연말정산 실무',
    question: '부양가족 기본공제 요건 중 "소득요건"과 "나이요건"을 충족해야 하는 경우와 나이 제한이 없는 경우는?',
    answer: '직계존속(60세 이상), 직계비속(20세 이하)은 나이요건 필요. 장애인은 나이 제한 없음. 모든 경우 연 소득 100만원(근로소득만 있으면 총급여 500만원) 이하여야 합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 부양가족 기본공제 요건 중 "소득요건"과 "나이요건"을 충족해야 하는 경우와 나이 제한이 없는 경우는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 18,
    topic: '연말정산 실무',
    question: '신용카드 등 소득공제 계산 시 "총급여액"에 따른 공제한도 계산 방법은?',
    answer: '총급여 7천만원 이하: 300만원, 7천만원 초과 1.2억 이하: 250만원, 1.2억 초과: 200만원이 기본 한도이며, 전통시장/대중교통/도서공연 사용분은 추가 공제됩니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 신용카드 등 소득공제 계산 시 "총급여액"에 따른 공제한도 계산 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 19,
    topic: '연말정산 실무',
    question: '자녀세액공제와 출산/입양 세액공제의 공제금액과 적용 조건은?',
    answer: '기본공제 대상 자녀(7세 이상) 1명 15만원, 2명 30만원, 3명 이상 30만원+추가분. 출산/입양은 첫째 30만원, 둘째 50만원, 셋째 이후 70만원입니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 자녀세액공제와 출산/입양 세액공제의 공제금액과 적용 조건은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 20,
    topic: '연말정산 실무',
    question: '연말정산 결과 추가납부세액이 발생한 경우 분납 처리 방법은?',
    answer: '추가납부세액이 10만원 초과 시 3개월 분납 가능. 급여자료에서 분납 설정 후 2월~4월 급여에서 분할 원천징수합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 연말정산 결과 추가납부세액이 발생한 경우 분납 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },

  // 결산 및 세무조정 (5문항)
  {
    id: 21,
    topic: '결산 및 세무조정',
    question: '결산정리분개에서 감가상각비를 계상할 때 정액법과 정률법의 계산 방법 차이는?',
    answer: '정액법: (취득가액-잔존가액)/내용연수, 정률법: 미상각잔액 x 상각률. 더존에서 자동계산되며, 자산등록 시 감가상각방법을 설정합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 결산정리분개에서 감가상각비를 계상할 때 정액법과 정률법의 계산 방법 차이는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 22,
    topic: '결산 및 세무조정',
    question: '세무조정계산서에서 "익금산입/손금불산입" 항목의 대표적인 예시와 처리 방법은?',
    answer: '접대비 한도초과, 업무무관자산 관련비용, 과다경비 등이 손금불산입됩니다. 조정항목등록에서 해당 항목 선택 후 금액을 입력합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 세무조정계산서에서 "익금산입/손금불산입" 항목의 대표적인 예시와 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 23,
    topic: '결산 및 세무조정',
    question: '대손충당금 세무조정 시 "세법상 한도"와 "회계상 설정액"의 차이 처리 방법은?',
    answer: '세법상 한도(채권잔액의 1%, 금융업 2%)를 초과하는 회계상 설정액은 손금불산입(유보)으로 세무조정하고, 이후 환입 시 익금산입합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 대손충당금 세무조정 시 "세법상 한도"와 "회계상 설정액"의 차이 처리 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 24,
    topic: '결산 및 세무조정',
    question: '법인세신고서 작성 시 "과세표준"과 "산출세액"을 계산하는 순서는?',
    answer: '당기순이익 + 익금산입 - 손금산입 = 각사업연도소득 - 이월결손금 - 비과세소득 - 소득공제 = 과세표준. 과세표준 x 세율 = 산출세액입니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 법인세신고서 작성 시 "과세표준"과 "산출세액"을 계산하는 순서는?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  },
  {
    id: 25,
    topic: '결산 및 세무조정',
    question: '법인세 중간예납세액과 원천징수세액을 법인세신고서에서 공제하는 방법은?',
    answer: '산출세액에서 세액감면/공제를 차감한 후 기납부세액(중간예납+원천징수+수시부과)을 차감하여 납부할 세액을 계산합니다. 선납세금 계정으로 관리합니다.',
    prompt: 'TAT 1급 실무 문제입니다.\n\n문제: 법인세 중간예납세액과 원천징수세액을 법인세신고서에서 공제하는 방법은?\n\n다음 순서로 설명해주세요:\n1. 더존 Smart A 메뉴 경로\n2. 입력 순서 및 방법\n3. 주의사항\n4. 검증 방법\n5. 자주 하는 실수'
  }
];

const topics = ['더존 Smart A 기본', '부가가치세 실무', '원천징수 실무', '연말정산 실무', '결산 및 세무조정'];

export default function TAT1PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tat1-practical-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tat1-practical-progress', JSON.stringify(progress));
  }, [progress]);

  const filteredQuestions = selectedTopic
    ? questions.filter(q => q.topic === selectedTopic)
    : questions;

  const currentQ = filteredQuestions[currentQuestion];

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setProgress(prev => ({ ...prev, [currentQ.id]: true }));
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  const handleTopicSelect = (topic: string | null) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setShowAnswer(false);
  };

  const handleAIHelp = () => {
    setCurrentPrompt(currentQ.prompt);
    setShowAIModal(true);
  };

  const getTopicProgress = (topic: string) => {
    const topicQuestions = questions.filter(q => q.topic === topic);
    const completed = topicQuestions.filter(q => progress[q.id]).length;
    return { completed, total: topicQuestions.length };
  };

  const totalProgress = Object.keys(progress).filter(k => progress[Number(k)]).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-rose-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tat-1" className="text-gray-500 hover:text-gray-700">TAT 1급</Link>
            <span className="text-gray-300">/</span>
            <span className="text-rose-600 font-medium">실무연습</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg">
              💻
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">실무연습</h1>
              <p className="text-gray-600">더존 Smart A 프로그램 기반 세무정보처리 실무 문제 연습</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-rose-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">전체 진행률</span>
              <span className="text-sm font-bold text-rose-600">{totalProgress} / {questions.length} 완료</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${(totalProgress / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Topic Selection */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-rose-100">
              <h3 className="font-bold text-gray-900 mb-4">토픽 선택</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleTopicSelect(null)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    selectedTopic === null
                      ? 'bg-rose-100 text-rose-700 font-medium'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>전체 문항</span>
                    <span className="text-sm text-gray-500">{totalProgress}/{questions.length}</span>
                  </div>
                </button>
                {topics.map((topic) => {
                  const { completed, total } = getTopicProgress(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => handleTopicSelect(topic)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        selectedTopic === topic
                          ? 'bg-rose-100 text-rose-700 font-medium'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{topic}</span>
                        <span className={`text-sm ${completed === total ? 'text-rose-600 font-medium' : 'text-gray-500'}`}>
                          {completed}/{total}
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${completed === total ? 'bg-rose-500' : 'bg-rose-400'}`}
                          style={{ width: `${(completed / total) * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-4 text-white">
              <h3 className="font-bold mb-3">학습 팁</h3>
              <ul className="text-sm space-y-2 text-rose-100">
                <li>- 부가세 신고 흐름을 완벽히 이해하세요</li>
                <li>- 원천징수이행상황신고서 작성을 연습하세요</li>
                <li>- 연말정산 공제항목을 암기하세요</li>
                <li>- 세무조정 항목별 처리방법을 숙지하세요</li>
              </ul>
            </div>
          </div>

          {/* Main Content - Question Area */}
          <div className="lg:col-span-3">
            {currentQ && (
              <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
                {/* Question Header */}
                <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {currentQ.topic}
                      </span>
                      <span className="text-rose-100">
                        문제 {currentQuestion + 1} / {filteredQuestions.length}
                      </span>
                    </div>
                    {progress[currentQ.id] && (
                      <span className="bg-rose-200 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">
                        완료
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6 leading-relaxed">
                    {currentQ.question}
                  </h2>

                  {/* Answer Section */}
                  {!showAnswer ? (
                    <button
                      onClick={handleShowAnswer}
                      className="w-full py-4 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium rounded-xl border-2 border-dashed border-rose-300 transition"
                    >
                      정답 보기
                    </button>
                  ) : (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">💡</span>
                        <span className="font-bold text-rose-800">정답 해설</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{currentQ.answer}</p>
                    </div>
                  )}

                  {/* Navigation & AI Help */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-3">
                      <button
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        이전
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={currentQuestion === filteredQuestions.length - 1}
                        className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        다음
                      </button>
                    </div>
                    <button
                      onClick={handleAIHelp}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 transition"
                    >
                      <span>🤖</span>
                      <span>AI에게 질문</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Question Navigator */}
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-rose-100">
              <h3 className="font-medium text-gray-900 mb-3">문항 네비게이터</h3>
              <div className="flex flex-wrap gap-2">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestion(idx);
                      setShowAnswer(false);
                    }}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                      idx === currentQuestion
                        ? 'bg-rose-600 text-white'
                        : progress[q.id]
                        ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            본 사이트는 학습 참고용이며, 정확한 시험 정보는
            <a href="https://at.kicpa.or.kr" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline ml-1">한국공인회계사회</a>
            에서 확인하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}
