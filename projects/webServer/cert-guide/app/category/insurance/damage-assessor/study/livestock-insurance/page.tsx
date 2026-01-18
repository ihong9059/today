'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  // 가축재해보험 이론 (13문제)
  {
    id: 1,
    question: "가축재해보험의 목적으로 옳은 것은?",
    options: ["가축 생산성 향상", "가축 질병 예방", "가축 재해로 인한 손실 보전 및 축산 경영 안정", "가축 판매 촉진"],
    answer: 2,
    explanation: "가축재해보험은 자연재해, 질병, 화재 등으로 인한 가축 손실을 보상하여 축산 경영의 안정을 도모합니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 2,
    question: "가축재해보험 대상 축종이 아닌 것은?",
    options: ["소", "돼지", "반려견", "닭"],
    answer: 2,
    explanation: "가축재해보험 대상은 소, 돼지, 닭, 오리, 말 등 축산업 목적의 가축이며, 반려동물은 제외됩니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 3,
    question: "가축재해보험에서 담보하는 위험이 아닌 것은?",
    options: ["자연재해로 인한 폐사", "질병으로 인한 폐사", "시장 가격 하락", "화재로 인한 폐사"],
    answer: 2,
    explanation: "시장 가격 하락은 재해가 아니므로 가축재해보험에서 담보하지 않습니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 4,
    question: "가축재해보험에서 '폐사'의 정의는?",
    options: ["가축의 출하", "가축의 도태", "가축의 죽음", "가축의 분만"],
    answer: 2,
    explanation: "폐사란 자연재해, 질병, 사고 등의 원인으로 가축이 죽는 것을 의미합니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 5,
    question: "'긴급도살'의 의미는?",
    options: ["계획적 도살", "질병 또는 사고로 폐사 직전 긴급히 도살하는 것", "대량 도살", "시장 출하"],
    answer: 1,
    explanation: "긴급도살은 질병이나 사고로 폐사가 임박하여 긴급히 도살 처분하는 것으로, 보험금 지급 대상입니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 6,
    question: "가축재해보험에서 법정전염병으로 인한 살처분의 보상 주체는?",
    options: ["보험회사", "정부(농림축산식품부)", "농협", "지방자치단체"],
    answer: 1,
    explanation: "구제역, AI 등 법정전염병으로 인한 살처분은 정부에서 별도 보상하므로 가축재해보험에서는 제외됩니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 7,
    question: "가축재해보험의 보험가액 산정 기준은?",
    options: ["농가 희망가격", "축종·월령별 표준가격표", "시장 거래가격", "사료비 합계"],
    answer: 1,
    explanation: "가축재해보험의 보험가액은 축종, 월령, 성별 등에 따른 표준가격표를 기준으로 산정합니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 8,
    question: "가축재해보험 가입 시 고지해야 할 사항이 아닌 것은?",
    options: ["사육 두수", "축종 및 월령", "과거 질병 이력", "농가주의 학력"],
    answer: 3,
    explanation: "가입 시 사육 두수, 축종, 월령, 질병 이력 등을 고지해야 하며, 농가주 학력은 고지 대상이 아닙니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 9,
    question: "가축재해보험의 자기부담금이란?",
    options: ["정부 지원금", "손해 발생 시 가입자가 부담하는 금액", "보험료 할인액", "재보험료"],
    answer: 1,
    explanation: "자기부담금은 손해 발생 시 가입자(축산농가)가 직접 부담하는 금액으로, 보험금에서 공제됩니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 10,
    question: "가축재해보험의 보험기간은?",
    options: ["1개월", "6개월", "일반적으로 1년", "3년"],
    answer: 2,
    explanation: "가축재해보험의 보험기간은 일반적으로 1년 단위입니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 11,
    question: "가축 개체 식별의 중요성은?",
    options: ["불필요한 절차", "보험 대상 가축의 정확한 확인 및 부정 방지", "사료 관리", "번식 관리"],
    answer: 1,
    explanation: "개체 식별(이표, 이력관리)은 보험 대상 가축을 정확히 확인하고 부정 청구를 방지하기 위해 중요합니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 12,
    question: "가축 손해평가 시 수의사 진단의 중요성은?",
    options: ["선택 사항", "폐사 원인 규명 및 면책 여부 판단", "비용 절감", "행정 편의"],
    answer: 1,
    explanation: "수의사 진단은 폐사 원인을 규명하고 보험금 지급 여부(면책 해당 여부)를 판단하는 데 중요합니다.",
    category: "가축재해보험 이론"
  },
  {
    id: 13,
    question: "가축재해보험에서 보험금 청구 시 필요한 서류가 아닌 것은?",
    options: ["폐사 확인서", "수의사 진단서", "손해평가서", "농가주 졸업증명서"],
    answer: 3,
    explanation: "보험금 청구 시 폐사 확인서, 수의사 진단서, 손해평가서 등이 필요하며, 졸업증명서는 필요하지 않습니다.",
    category: "가축재해보험 이론"
  },
  // 축종별 손해평가 (12문제)
  {
    id: 14,
    question: "한우 손해평가 시 '월령'의 중요성은?",
    options: ["중요하지 않음", "보험가액(시가) 산정의 기준", "번식 관리용", "사료량 결정"],
    answer: 1,
    explanation: "한우의 월령은 보험가액 산정의 중요한 기준으로, 월령에 따라 가축의 가치가 달라집니다.",
    category: "축종별 손해평가"
  },
  {
    id: 15,
    question: "젖소 손해평가 시 고려하는 요소가 아닌 것은?",
    options: ["월령", "비유량(우유 생산량)", "임신 여부", "사육장 면적"],
    answer: 3,
    explanation: "젖소 손해평가 시 월령, 비유량, 임신 여부 등을 고려하며, 사육장 면적은 평가 기준이 아닙니다.",
    category: "축종별 손해평가"
  },
  {
    id: 16,
    question: "돼지 손해평가 시 '일령'의 의미는?",
    options: ["돼지의 무게", "돼지가 태어난 후 경과 일수", "돼지의 품종", "사육 농가 수"],
    answer: 1,
    explanation: "일령은 돼지가 태어난 후 경과한 일수로, 보험가액 산정의 기준이 됩니다.",
    category: "축종별 손해평가"
  },
  {
    id: 17,
    question: "양계(닭) 손해평가의 특성은?",
    options: ["개체별 평가", "무리(떼) 단위 평가", "개체 식별 필수", "월령별 평가"],
    answer: 1,
    explanation: "닭은 개체 수가 많아 개체별 평가가 어려우므로 무리(떼) 단위로 평가합니다.",
    category: "축종별 손해평가"
  },
  {
    id: 18,
    question: "산란계와 육계의 손해평가 차이점은?",
    options: ["차이 없음", "산란계는 일령, 육계는 무게 기준", "산란계만 보험 대상", "육계만 보험 대상"],
    answer: 1,
    explanation: "산란계는 일령과 산란 능력을, 육계는 무게와 출하 시기를 기준으로 손해평가합니다.",
    category: "축종별 손해평가"
  },
  {
    id: 19,
    question: "오리 손해평가 시 주요 평가 항목은?",
    options: ["털 색깔", "일령 및 폐사 두수", "소리 크기", "발 모양"],
    answer: 1,
    explanation: "오리 손해평가 시 일령, 폐사 두수, 폐사 원인 등을 주로 평가합니다.",
    category: "축종별 손해평가"
  },
  {
    id: 20,
    question: "말 손해평가 시 고려하는 요소가 아닌 것은?",
    options: ["월령", "품종", "용도(경주마, 승용마 등)", "말의 성격"],
    answer: 3,
    explanation: "말 손해평가 시 월령, 품종, 용도 등을 고려하며, 말의 성격은 평가 기준이 아닙니다.",
    category: "축종별 손해평가"
  },
  {
    id: 21,
    question: "번식용 암소와 비육용 수소의 보험가액 차이 원인은?",
    options: ["차이 없음", "용도에 따른 경제적 가치 차이", "크기 차이만", "색깔 차이"],
    answer: 1,
    explanation: "번식용 암소는 송아지 생산 가치가, 비육용 수소는 육류 가치가 있어 경제적 가치가 다릅니다.",
    category: "축종별 손해평가"
  },
  {
    id: 22,
    question: "자돈(새끼 돼지)의 손해평가 특성은?",
    options: ["성돈과 동일", "폐사율이 높아 정밀 조사 필요", "보험 대상 아님", "평가 불필요"],
    answer: 1,
    explanation: "자돈은 폐사율이 높아 폐사 원인, 일령, 두수 등을 정밀하게 조사해야 합니다.",
    category: "축종별 손해평가"
  },
  {
    id: 23,
    question: "종돈(씨돼지)의 보험가액이 일반 돼지보다 높은 이유는?",
    options: ["크기가 커서", "번식 가치가 있어서", "사료비가 많이 들어서", "차이 없음"],
    answer: 1,
    explanation: "종돈은 번식용으로 경제적 가치(번식 능력)가 높아 일반 돼지보다 보험가액이 높습니다.",
    category: "축종별 손해평가"
  },
  {
    id: 24,
    question: "가금류(닭, 오리) 폐사 시 즉시 신고해야 하는 이유는?",
    options: ["행정 편의", "폐사 원인 규명 및 전염병 확산 방지", "보험료 환급", "사료 회수"],
    answer: 1,
    explanation: "가금류 폐사 시 전염병(AI 등) 가능성이 있어 즉시 신고하여 원인을 규명하고 확산을 방지해야 합니다.",
    category: "축종별 손해평가"
  },
  {
    id: 25,
    question: "양봉(꿀벌) 손해평가의 특성은?",
    options: ["개체별 평가", "군(봉군) 단위 평가", "무게 단위 평가", "색깔별 평가"],
    answer: 1,
    explanation: "양봉 손해평가는 개별 벌이 아닌 봉군(벌통) 단위로 평가합니다.",
    category: "축종별 손해평가"
  },
  // 질병 및 폐사 평가 (13문제)
  {
    id: 26,
    question: "가축 폐사 원인 규명의 중요성은?",
    options: ["불필요한 절차", "면책 여부 판단 및 보험금 산정", "농가 편의", "통계 작성"],
    answer: 1,
    explanation: "폐사 원인 규명은 면책 사유 해당 여부와 정확한 보험금 산정을 위해 중요합니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 27,
    question: "법정 1종 전염병에 해당하지 않는 것은?",
    options: ["구제역", "고병원성 AI", "소 결핵", "일반 감기"],
    answer: 3,
    explanation: "구제역, 고병원성 AI, 소 결핵 등은 법정 전염병이며, 일반 감기는 해당하지 않습니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 28,
    question: "구제역 발생 시 가축재해보험의 보상은?",
    options: ["전액 보상", "면책(정부 보상)", "50% 보상", "보험료 환급"],
    answer: 1,
    explanation: "구제역 등 법정전염병은 정부에서 별도 보상하므로 가축재해보험에서는 면책됩니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 29,
    question: "고병원성 조류인플루엔자(AI) 발생 시 조치는?",
    options: ["일반 치료", "살처분 및 이동 제한", "출하 허용", "보험금만 청구"],
    answer: 1,
    explanation: "고병원성 AI 발생 시 살처분, 이동 제한 등의 방역 조치가 시행되며, 정부가 보상합니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 30,
    question: "소 브루셀라병의 특징은?",
    options: ["호흡기 질환", "유산 및 불임 유발", "피부 질환", "소화기 질환"],
    answer: 1,
    explanation: "브루셀라병은 유산, 불임, 관절염 등을 유발하는 전염병으로 도태 원인이 됩니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 31,
    question: "돼지 열병(CSF)으로 인한 폐사의 보험 처리는?",
    options: ["일반 질병으로 보상", "법정전염병으로 정부 보상", "보험 대상 아님", "자기부담 100%"],
    answer: 1,
    explanation: "돼지 열병(CSF)은 법정전염병으로 정부에서 보상하며, 가축재해보험에서는 면책됩니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 32,
    question: "일반 질병으로 인한 폐사 시 가축재해보험 처리는?",
    options: ["면책", "보험금 지급 대상", "정부 보상", "보험료 환급"],
    answer: 1,
    explanation: "법정전염병이 아닌 일반 질병으로 인한 폐사는 가축재해보험 보험금 지급 대상입니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 33,
    question: "폐사 가축의 사체 처리 방법은?",
    options: ["농가 자유 처리", "관련 법규에 따른 적법 처리(매몰, 소각 등)", "시장 판매", "방치"],
    answer: 1,
    explanation: "폐사 가축은 가축전염병예방법 등 관련 법규에 따라 매몰, 소각, 렌더링 등으로 처리해야 합니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 34,
    question: "도태와 폐사의 차이점은?",
    options: ["동일한 개념", "도태는 살아있는 상태에서 도살, 폐사는 자연사", "폐사가 더 가치 있음", "차이 없음"],
    answer: 1,
    explanation: "도태는 경제적 가치 상실로 살아있는 가축을 도살하는 것이고, 폐사는 자연사입니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 35,
    question: "폐사 신고 시기로 적절한 것은?",
    options: ["월말 일괄 신고", "폐사 확인 즉시", "연말 정산 시", "출하 시"],
    answer: 1,
    explanation: "폐사 확인 즉시 신고해야 정확한 원인 규명과 신속한 보험 처리가 가능합니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 36,
    question: "부검(病理解剖)의 목적은?",
    options: ["육류 판매", "폐사 원인의 정확한 규명", "개체 식별", "보험료 산정"],
    answer: 1,
    explanation: "부검은 폐사 가축의 정확한 사인을 규명하기 위해 실시합니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 37,
    question: "만성 질환으로 인한 도태 시 손해평가 방법은?",
    options: ["폐사와 동일 처리", "도태 사유, 시기, 잔존가치 등 고려", "보험 대상 아님", "정액 지급"],
    answer: 1,
    explanation: "도태 시에는 도태 사유, 시기, 잔존가치(긴급도살 시 육가 등)를 고려하여 평가합니다.",
    category: "질병 및 폐사 평가"
  },
  {
    id: 38,
    question: "사고로 인한 폐사(낙뢰, 감전 등)의 보험 처리는?",
    options: ["면책", "보험금 지급 대상", "정부 보상", "자기부담 100%"],
    answer: 1,
    explanation: "낙뢰, 감전, 익수 등 사고로 인한 폐사는 가축재해보험 보험금 지급 대상입니다.",
    category: "질병 및 폐사 평가"
  },
  // 보험금 산정 (12문제)
  {
    id: 39,
    question: "가축재해보험 보험금 산정 공식은?",
    options: ["보험가액 전액", "보험가입금액 - 자기부담금 - 잔존가치", "(보험가입금액 × 피해율) - 자기부담금", "시장가격 기준"],
    answer: 1,
    explanation: "보험금 = 보험가입금액 - 자기부담금 - 잔존가치(있는 경우)",
    category: "보험금 산정"
  },
  {
    id: 40,
    question: "긴급도살 시 잔존가치(육가)의 처리는?",
    options: ["보험금에 추가", "보험금에서 공제", "별도 지급", "고려하지 않음"],
    answer: 1,
    explanation: "긴급도살 시 수취한 육가(잔존가치)는 보험금에서 공제됩니다.",
    category: "보험금 산정"
  },
  {
    id: 41,
    question: "보험가입금액 500만원, 자기부담금 50만원, 잔존가치 30만원일 때 보험금은?",
    options: ["500만원", "420만원", "450만원", "470만원"],
    answer: 1,
    explanation: "보험금 = 500만원 - 50만원 - 30만원 = 420만원",
    category: "보험금 산정"
  },
  {
    id: 42,
    question: "일부 두수만 폐사 시 보험금 산정 방법은?",
    options: ["전체 보험금 지급", "폐사 두수 비율로 산정", "지급하지 않음", "정액 지급"],
    answer: 1,
    explanation: "가입 두수 중 일부만 폐사 시 폐사 두수에 해당하는 보험금만 산정하여 지급합니다.",
    category: "보험금 산정"
  },
  {
    id: 43,
    question: "보험가액이 실제 가치보다 낮게 가입된 경우는?",
    options: ["초과보험", "일부보험", "전부보험", "재보험"],
    answer: 1,
    explanation: "보험가입금액이 보험가액(실제 가치)보다 낮은 경우를 일부보험이라 합니다.",
    category: "보험금 산정"
  },
  {
    id: 44,
    question: "자기부담금의 역할은?",
    options: ["보험료 증가", "도덕적 해이 방지 및 소액 손해 처리 비용 절감", "보험금 증가", "관계 없음"],
    answer: 1,
    explanation: "자기부담금은 가입자의 주의 의무를 높이고 소액 손해 처리 비용을 절감하는 역할을 합니다.",
    category: "보험금 산정"
  },
  {
    id: 45,
    question: "보험금 지급 기한에 관한 설명으로 옳은 것은?",
    options: ["기한 없음", "손해평가 완료 후 일정 기간 내", "1년 후", "농가 요청 시"],
    answer: 1,
    explanation: "보험금은 손해평가가 완료되고 청구가 접수된 후 일정 기간(약 14일) 내에 지급됩니다.",
    category: "보험금 산정"
  },
  {
    id: 46,
    question: "보험금 과다 청구 시 처벌은?",
    options: ["없음", "계약 해지, 보험금 반환, 형사 처벌 가능", "보험료 할인", "재가입 우대"],
    answer: 1,
    explanation: "허위·과다 청구 시 계약 해지, 이미 지급된 보험금 반환, 사기죄 등 형사 처벌을 받을 수 있습니다.",
    category: "보험금 산정"
  },
  {
    id: 47,
    question: "이의신청 시 보험금 지급은?",
    options: ["즉시 지급 중단", "이의 심사 결과에 따라 처리", "전액 지급", "반액 지급"],
    answer: 1,
    explanation: "이의신청이 있으면 재심사를 거쳐 최종 결과에 따라 보험금이 처리됩니다.",
    category: "보험금 산정"
  },
  {
    id: 48,
    question: "연간 사육 두수 변동 시 보험 처리는?",
    options: ["처음 가입 두수 기준 고정", "변동 사항 통지 및 보험료 정산", "보험 자동 해지", "관계 없음"],
    answer: 1,
    explanation: "사육 두수 변동 시 보험사에 통지하고 보험료를 정산해야 합니다.",
    category: "보험금 산정"
  },
  {
    id: 49,
    question: "면책 사유에 해당하는 것은?",
    options: ["자연재해로 인한 폐사", "농가의 고의에 의한 폐사", "질병으로 인한 폐사", "사고로 인한 폐사"],
    answer: 1,
    explanation: "가입자의 고의에 의한 손해는 면책 사유로 보험금이 지급되지 않습니다.",
    category: "보험금 산정"
  },
  {
    id: 50,
    question: "보험금 청구권의 소멸시효는?",
    options: ["1년", "2년", "3년", "5년"],
    answer: 2,
    explanation: "상법에 따라 보험금 청구권의 소멸시효는 3년입니다.",
    category: "보험금 산정"
  }
];

export default function LivestockInsurancePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('damage-assessor-livestock-insurance-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setScore(progress.score || 0);
      setAnsweredQuestions(new Set(progress.answered || []));
      setCurrentQuestion(progress.current || 0);
    }
  }, []);

  const saveProgress = (newScore: number, answered: Set<number>, current: number) => {
    localStorage.setItem('damage-assessor-livestock-insurance-progress', JSON.stringify({ score: newScore, answered: Array.from(answered), current }));
  };

  const handleAnswer = (index: number) => { if (answeredQuestions.has(currentQuestion)) return; setSelectedAnswer(index); setShowExplanation(true); const newAnswered = new Set(answeredQuestions).add(currentQuestion); setAnsweredQuestions(newAnswered); let newScore = score; if (index === questions[currentQuestion].answer) newScore = score + 1; setScore(newScore); saveProgress(newScore, newAnswered, currentQuestion); if (newAnswered.size === questions.length) setIsComplete(true); };
  const nextQuestion = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowExplanation(false); saveProgress(score, answeredQuestions, currentQuestion + 1); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowExplanation(false); } };
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); setScore(0); setAnsweredQuestions(new Set()); setIsComplete(false); localStorage.removeItem('damage-assessor-livestock-insurance-progress'); };

  const getCategoryColor = (category: string) => { const colors: { [key: string]: string } = { "가축재해보험 이론": "bg-emerald-100 text-emerald-800", "축종별 손해평가": "bg-teal-100 text-teal-800", "질병 및 폐사 평가": "bg-cyan-100 text-cyan-800", "보험금 산정": "bg-blue-100 text-blue-800" }; return colors[category] || "bg-gray-100 text-gray-800"; };

  const progress = (answeredQuestions.size / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/insurance/damage-assessor" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>손해평가사 메인으로</Link>
          <h1 className="text-3xl font-bold mb-2">가축재해보험 이론과 실무</h1>
          <p className="text-emerald-100">가축질병, 폐사평가, 보험금 산정</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8"><div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-600">학습 진행률</span><span className="text-sm font-medium text-emerald-600">{answeredQuestions.size} / {questions.length} 문제</span></div><div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div></div><div className="flex justify-between items-center mt-2"><span className="text-sm text-gray-500">현재 점수: {score}점</span><span className="text-sm text-gray-500">정답률: {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%</span></div></div>

        {isComplete && (<div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg p-8 mb-8 text-white text-center"><div className="text-6xl mb-4">🎉</div><h2 className="text-2xl font-bold mb-2">학습 완료!</h2><p className="text-xl mb-4">최종 점수: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p><button onClick={resetQuiz} className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">다시 도전하기</button></div>)}

        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6"><span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>{question.category}</span><span className="text-gray-500 text-sm">문제 {currentQuestion + 1} / {questions.length}</span></div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
          <div className="space-y-3">{question.options.map((option, index) => { let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 "; if (showExplanation) { if (index === question.answer) buttonClass += "border-green-500 bg-green-50 text-green-800"; else if (index === selectedAnswer) buttonClass += "border-red-500 bg-red-50 text-red-800"; else buttonClass += "border-gray-200 bg-gray-50 text-gray-500"; } else if (answeredQuestions.has(currentQuestion)) { buttonClass += "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"; } else { buttonClass += "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer"; } return (<button key={index} onClick={() => handleAnswer(index)} disabled={answeredQuestions.has(currentQuestion)} className={buttonClass}><span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}</button>); })}</div>
          {showExplanation && (<div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200"><h3 className="font-bold text-teal-800 mb-2">💡 해설</h3><p className="text-teal-900">{question.explanation}</p></div>)}
        </div>

        <div className="flex justify-between items-center"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>이전 문제</button><button onClick={resetQuiz} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">처음부터 다시</button><button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">다음 문제<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button></div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6"><h3 className="font-bold text-gray-800 mb-4">📚 카테고리별 문제 분포</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{["가축재해보험 이론", "축종별 손해평가", "질병 및 폐사 평가", "보험금 산정"].map((category, idx) => { const count = questions.filter(q => q.category === category).length; return (<div key={idx} className={`p-3 rounded-lg ${getCategoryColor(category)}`}><div className="font-medium">{category}</div><div className="text-sm opacity-80">{count}문제</div></div>); })}</div></div>
      </div>
    </div>
  );
}
