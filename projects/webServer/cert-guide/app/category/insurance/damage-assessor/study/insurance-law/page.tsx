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
  // 농어업재해보험법 총칙 (13문제)
  {
    id: 1,
    question: "농어업재해보험법의 목적으로 옳은 것은?",
    options: ["농어업인의 소득 보장", "농어업 생산성 향상", "농어업재해로 인한 손실 보전 및 농어업 경영 안정", "농산물 가격 안정"],
    answer: 2,
    explanation: "농어업재해보험법은 농어업재해로 인한 농작물, 임산물, 양식수산물, 가축 등의 피해를 보상하여 농어업 경영의 안정을 도모함을 목적으로 합니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 2,
    question: "농어업재해보험법상 '농어업재해'의 정의에 해당하지 않는 것은?",
    options: ["자연재해", "조수해(鳥獸害)", "화재", "시장가격 하락"],
    answer: 3,
    explanation: "농어업재해란 자연재해, 조수해, 화재, 질병 등으로 인한 피해를 말하며, 시장가격 하락은 재해에 해당하지 않습니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 3,
    question: "농어업재해보험의 종류에 해당하지 않는 것은?",
    options: ["농작물재해보험", "가축재해보험", "양식수산물재해보험", "농기계재해보험"],
    answer: 3,
    explanation: "농어업재해보험에는 농작물재해보험, 가축재해보험, 양식수산물재해보험, 임산물재해보험이 있습니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 4,
    question: "농어업재해보험법상 '손해평가사'를 두는 보험은?",
    options: ["양식수산물재해보험만", "농작물재해보험과 가축재해보험", "모든 농어업재해보험", "임산물재해보험만"],
    answer: 1,
    explanation: "손해평가사는 농작물재해보험과 가축재해보험의 손해평가 업무를 수행합니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 5,
    question: "농어업재해보험사업을 관장하는 주무부처는?",
    options: ["기획재정부", "농림축산식품부와 해양수산부", "국토교통부", "환경부"],
    answer: 1,
    explanation: "농작물재해보험과 가축재해보험은 농림축산식품부, 양식수산물재해보험은 해양수산부가 관장합니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 6,
    question: "농어업재해보험의 가입 대상자는?",
    options: ["모든 국민", "농어업인과 농어업법인", "농협 조합원만", "전업농만"],
    answer: 1,
    explanation: "농어업재해보험의 가입 대상은 농어업인과 농어업법인입니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 7,
    question: "농어업재해보험법상 '재보험사업'의 목적은?",
    options: ["보험료 인상", "보험사업자의 경영 안정", "가입자 확대", "손해평가 간소화"],
    answer: 1,
    explanation: "재보험사업은 농어업재해보험사업자의 보험금 지급 책임을 분산하여 경영 안정을 도모합니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 8,
    question: "국가와 지방자치단체의 보험료 지원에 관한 설명으로 옳은 것은?",
    options: ["보험료 전액 지원", "보험료 일부를 지원할 수 있음", "보험료 지원 불가", "손해액의 50% 지원"],
    answer: 1,
    explanation: "국가와 지방자치단체는 농어업인의 보험료 일부를 예산 범위에서 지원할 수 있습니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 9,
    question: "농어업재해보험심의회의 기능이 아닌 것은?",
    options: ["보험사업 기본계획 심의", "보험요율 심의", "손해평가 업무 수행", "재보험 관련 사항 심의"],
    answer: 2,
    explanation: "농어업재해보험심의회는 정책 심의기구이며, 손해평가 업무는 손해평가사가 수행합니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 10,
    question: "농어업재해보험기금의 재원에 해당하지 않는 것은?",
    options: ["정부 출연금", "재보험료 수입", "기금 운용 수익", "농어업인 부담금"],
    answer: 3,
    explanation: "농어업재해보험기금의 재원은 정부 출연금, 재보험료, 기금 운용 수익 등이며, 농어업인 부담금은 재원이 아닙니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 11,
    question: "농어업재해보험법의 시행에 관한 규칙을 정하는 기관은?",
    options: ["대통령", "국회", "농림축산식품부장관 또는 해양수산부장관", "농협중앙회"],
    answer: 2,
    explanation: "농어업재해보험법 시행규칙은 농림축산식품부장관 또는 해양수산부장관이 정합니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 12,
    question: "농어업재해보험의 보험목적물이 아닌 것은?",
    options: ["농작물", "가축", "양식수산물", "농업용 토지"],
    answer: 3,
    explanation: "농어업재해보험의 보험목적물은 농작물, 가축, 양식수산물, 임산물 등이며, 농업용 토지는 포함되지 않습니다.",
    category: "농어업재해보험법 총칙"
  },
  {
    id: 13,
    question: "농어업재해보험사업자가 될 수 있는 자는?",
    options: ["모든 보험회사", "농협, 수협 등 법에서 정한 자", "개인 보험설계사", "외국 보험회사만"],
    answer: 1,
    explanation: "농어업재해보험사업자는 농협, 수협 등 농어업재해보험법에서 정한 자만 될 수 있습니다.",
    category: "농어업재해보험법 총칙"
  },
  // 손해평가사 제도 (12문제)
  {
    id: 14,
    question: "손해평가사의 업무로 옳은 것은?",
    options: ["보험계약 체결 대리", "손해의 조사 및 평가", "보험료 징수", "보험상품 개발"],
    answer: 1,
    explanation: "손해평가사는 농작물재해보험 및 가축재해보험의 손해에 대한 조사 및 평가 업무를 수행합니다.",
    category: "손해평가사 제도"
  },
  {
    id: 15,
    question: "손해평가사 자격시험의 시행기관은?",
    options: ["농림축산식품부", "한국산업인력공단", "농업금융원", "농협중앙회"],
    answer: 2,
    explanation: "손해평가사 자격시험은 농업금융원에서 시행합니다.",
    category: "손해평가사 제도"
  },
  {
    id: 16,
    question: "손해평가사 결격사유에 해당하지 않는 것은?",
    options: ["피성년후견인", "파산선고를 받고 복권되지 않은 자", "자격 취소 후 3년 미경과자", "농업 비전공자"],
    answer: 3,
    explanation: "농업 비전공이라는 이유만으로 손해평가사가 될 수 없는 것은 아닙니다. 결격사유는 법률에서 정한 사항에 한합니다.",
    category: "손해평가사 제도"
  },
  {
    id: 17,
    question: "손해평가사 자격증 취소 사유에 해당하지 않는 것은?",
    options: ["거짓이나 부정한 방법으로 자격 취득", "손해평가 업무 관련 부정행위", "손해평가 업무 수행 중 과실", "결격사유 발생"],
    answer: 2,
    explanation: "단순한 과실은 자격 취소 사유가 아닙니다. 고의적인 부정행위나 거짓 취득 등이 취소 사유입니다.",
    category: "손해평가사 제도"
  },
  {
    id: 18,
    question: "손해평가사의 신의성실 의무에 관한 설명으로 옳은 것은?",
    options: ["보험사업자의 이익을 우선", "공정하고 성실하게 손해평가 업무 수행", "빠른 처리를 최우선", "농어업인의 요청대로 평가"],
    answer: 1,
    explanation: "손해평가사는 공정하고 성실하게 손해평가 업무를 수행해야 합니다.",
    category: "손해평가사 제도"
  },
  {
    id: 19,
    question: "손해평가사 자격시험의 시험과목 수는?",
    options: ["1차 2과목, 2차 2과목", "1차 3과목, 2차 2과목", "1차 3과목, 2차 3과목", "1차 4과목, 2차 2과목"],
    answer: 1,
    explanation: "손해평가사 1차 시험은 3과목(상법 보험편, 농어업재해보험법령, 농학개론), 2차 시험은 2과목입니다.",
    category: "손해평가사 제도"
  },
  {
    id: 20,
    question: "손해평가사 1차 시험 면제 대상이 아닌 것은?",
    options: ["변호사", "보험계리사", "손해사정사", "농학 관련 박사 학위 소지자"],
    answer: 3,
    explanation: "농학 박사 학위만으로는 1차 시험이 면제되지 않습니다. 변호사, 보험계리사, 손해사정사 등 일부 자격 소지자는 면제됩니다.",
    category: "손해평가사 제도"
  },
  {
    id: 21,
    question: "손해평가사의 등록에 관한 설명으로 옳은 것은?",
    options: ["등록 없이 업무 수행 가능", "농업금융원에 등록해야 업무 수행 가능", "농림축산식품부에 직접 등록", "등록 의무 없음"],
    answer: 1,
    explanation: "손해평가사는 농업금융원에 등록해야 손해평가 업무를 수행할 수 있습니다.",
    category: "손해평가사 제도"
  },
  {
    id: 22,
    question: "손해평가인과 손해평가사의 관계에 관한 설명으로 옳은 것은?",
    options: ["동일한 자격", "손해평가인은 손해평가사의 지도·감독을 받음", "손해평가사는 손해평가인의 상위 자격", "관계 없음"],
    answer: 1,
    explanation: "손해평가인은 손해평가 보조 업무를 수행하며, 손해평가사의 지도·감독을 받습니다.",
    category: "손해평가사 제도"
  },
  {
    id: 23,
    question: "손해평가사 자격시험 합격 기준은?",
    options: ["총점 60점 이상", "과목당 40점 이상, 전과목 평균 60점 이상", "과목당 60점 이상", "총점 70점 이상"],
    answer: 1,
    explanation: "손해평가사 자격시험은 각 과목 40점 이상이고 전과목 평균 60점 이상이면 합격입니다.",
    category: "손해평가사 제도"
  },
  {
    id: 24,
    question: "손해평가사의 비밀유지의무에 관한 설명으로 옳은 것은?",
    options: ["업무상 알게 된 비밀을 누설하면 안 됨", "비밀유지의무 없음", "업무 종료 후에는 비밀유지의무 없음", "동료 손해평가사에게는 공유 가능"],
    answer: 0,
    explanation: "손해평가사는 업무상 알게 된 비밀을 누설해서는 안 됩니다.",
    category: "손해평가사 제도"
  },
  {
    id: 25,
    question: "손해평가사에 대한 행정처분 종류가 아닌 것은?",
    options: ["자격 취소", "자격 정지", "과태료", "벌금형"],
    answer: 3,
    explanation: "벌금형은 형사처분이며, 손해평가사에 대한 행정처분에는 자격 취소, 자격 정지, 과태료 등이 있습니다.",
    category: "손해평가사 제도"
  },
  // 농작물재해보험 (13문제)
  {
    id: 26,
    question: "농작물재해보험의 보험대상 작물이 아닌 것은?",
    options: ["사과", "배", "포도", "모든 농작물이 대상"],
    answer: 3,
    explanation: "농작물재해보험은 정부가 지정한 대상 작물에 한하여 가입할 수 있습니다.",
    category: "농작물재해보험"
  },
  {
    id: 27,
    question: "농작물재해보험에서 담보하는 재해가 아닌 것은?",
    options: ["태풍", "우박", "가뭄", "해충에 의한 일반적 피해"],
    answer: 3,
    explanation: "농작물재해보험은 자연재해(태풍, 우박, 가뭄 등)와 조수해를 담보하며, 일반적인 병해충 피해는 별도 특약입니다.",
    category: "농작물재해보험"
  },
  {
    id: 28,
    question: "농작물재해보험의 보험기간에 관한 설명으로 옳은 것은?",
    options: ["1년 단위로 고정", "작물의 생육기간에 따라 설정", "5년 단위", "무기한"],
    answer: 1,
    explanation: "농작물재해보험의 보험기간은 작물의 생육기간(파종~수확)에 따라 설정됩니다.",
    category: "농작물재해보험"
  },
  {
    id: 29,
    question: "농작물재해보험 가입 시 자기부담비율이란?",
    options: ["보험회사 부담 비율", "정부 지원 비율", "농어업인이 스스로 부담하는 손해 비율", "재보험 비율"],
    answer: 2,
    explanation: "자기부담비율은 손해 발생 시 가입자가 직접 부담하는 손해의 비율로, 보험료 결정에 영향을 줍니다.",
    category: "농작물재해보험"
  },
  {
    id: 30,
    question: "농작물재해보험의 보험가액 산정 기준은?",
    options: ["과거 판매가격", "표준수확량 × 기준가격", "농어업인 신고가격", "정부 고시가격"],
    answer: 1,
    explanation: "농작물재해보험의 보험가액은 표준수확량에 기준가격을 곱하여 산정합니다.",
    category: "농작물재해보험"
  },
  {
    id: 31,
    question: "농작물재해보험에서 '착과감소보장방식'이란?",
    options: ["열매 품질 보장", "꽃이 열매로 변하는 비율(착과율) 감소 보장", "병해충 보장", "수확량 보장"],
    answer: 1,
    explanation: "착과감소보장방식은 자연재해로 꽃이 열매가 되는 비율(착과율)이 감소한 경우 보상하는 방식입니다.",
    category: "농작물재해보험"
  },
  {
    id: 32,
    question: "농작물재해보험에서 손해액 산정 시 고려하지 않는 것은?",
    options: ["피해율", "표준수확량", "자기부담비율", "농어업인의 나이"],
    answer: 3,
    explanation: "손해액 산정 시 피해율, 표준수확량, 자기부담비율 등을 고려하며, 농어업인의 나이는 관계없습니다.",
    category: "농작물재해보험"
  },
  {
    id: 33,
    question: "농작물재해보험의 보험료 납입방법은?",
    options: ["월납만 가능", "연납만 가능", "일시납 또는 분할납", "수확 후 정산"],
    answer: 2,
    explanation: "농작물재해보험의 보험료는 일시납 또는 분할납(2회)이 가능합니다.",
    category: "농작물재해보험"
  },
  {
    id: 34,
    question: "농작물재해보험의 가입 시기에 관한 설명으로 옳은 것은?",
    options: ["연중 언제든지 가입", "작물별로 정해진 가입 기간 내 가입", "수확 후에도 가입 가능", "재해 발생 후 가입 가능"],
    answer: 1,
    explanation: "농작물재해보험은 작물별로 정해진 가입 기간 내에만 가입할 수 있습니다.",
    category: "농작물재해보험"
  },
  {
    id: 35,
    question: "농작물재해보험에서 전손(全損)의 의미는?",
    options: ["50% 이상 피해", "70% 이상 피해", "80% 이상 피해", "100% 피해"],
    answer: 2,
    explanation: "농작물재해보험에서는 일반적으로 80% 이상 피해 시 전손으로 간주합니다.",
    category: "농작물재해보험"
  },
  {
    id: 36,
    question: "농작물재해보험의 보험금 지급 제외 사유가 아닌 것은?",
    options: ["고의에 의한 손해", "전쟁, 내란", "원자력 사고", "자연재해로 인한 손해"],
    answer: 3,
    explanation: "자연재해로 인한 손해는 농작물재해보험의 보상 대상이며, 보험금 지급 제외 사유가 아닙니다.",
    category: "농작물재해보험"
  },
  {
    id: 37,
    question: "농작물재해보험의 손해평가 절차로 옳은 것은?",
    options: ["피해신고 → 현장조사 → 손해평가 → 보험금 지급", "보험금 청구 → 현장조사 → 피해신고", "현장조사 → 피해신고 → 보험금 지급", "손해평가 → 피해신고 → 현장조사"],
    answer: 0,
    explanation: "농작물재해보험의 손해평가는 피해신고, 현장조사, 손해평가, 보험금 지급 순으로 진행됩니다.",
    category: "농작물재해보험"
  },
  {
    id: 38,
    question: "농작물재해보험에서 '기준수확량'이란?",
    options: ["실제 수확량", "지역·작물별 평균 수확량", "최대 수확량", "최소 수확량"],
    answer: 1,
    explanation: "기준수확량은 지역·작물별로 산정한 평균 수확량으로 보험가액 및 손해액 산정의 기준이 됩니다.",
    category: "농작물재해보험"
  },
  // 가축재해보험 (12문제)
  {
    id: 39,
    question: "가축재해보험의 대상 가축이 아닌 것은?",
    options: ["소", "돼지", "닭", "반려동물"],
    answer: 3,
    explanation: "가축재해보험 대상은 소, 돼지, 닭, 오리, 말 등 가축사육업 목적의 축종이며, 반려동물은 제외됩니다.",
    category: "가축재해보험"
  },
  {
    id: 40,
    question: "가축재해보험에서 담보하는 손해가 아닌 것은?",
    options: ["폐사", "긴급도살", "도난", "재해로 인한 질병 폐사"],
    answer: 2,
    explanation: "가축재해보험은 폐사, 긴급도살, 질병 등으로 인한 손해를 담보하며, 도난은 일반적으로 제외됩니다.",
    category: "가축재해보험"
  },
  {
    id: 41,
    question: "가축재해보험에서 법정전염병으로 인한 살처분은?",
    options: ["보험금 지급", "보험금 지급 제외(정부 보상)", "50% 보상", "자기부담"],
    answer: 1,
    explanation: "법정전염병(구제역, AI 등)으로 인한 살처분은 정부에서 별도 보상하므로 가축재해보험 보상에서 제외됩니다.",
    category: "가축재해보험"
  },
  {
    id: 42,
    question: "가축재해보험의 보험가액 산정 방법은?",
    options: ["시중 거래가격", "가축별 표준가격표에 의한 평가", "농어업인 신고가격", "보험회사 자율 결정"],
    answer: 1,
    explanation: "가축재해보험의 보험가액은 축종·월령·성별 등에 따른 표준가격표를 기준으로 산정합니다.",
    category: "가축재해보험"
  },
  {
    id: 43,
    question: "가축재해보험에서 폐사 시 손해평가 절차는?",
    options: ["폐사 확인만으로 충분", "폐사신고 → 현장확인 → 원인조사 → 손해액 확정", "보험금 청구 후 확인", "농어업인 자체 평가"],
    answer: 1,
    explanation: "가축 폐사 시 폐사신고, 현장확인, 원인조사, 손해액 확정의 절차를 거칩니다.",
    category: "가축재해보험"
  },
  {
    id: 44,
    question: "가축재해보험에서 '긴급도살'이란?",
    options: ["일반 출하", "질병·사고로 폐사 직전 긴급히 도살하는 것", "예정 도살", "선별 도살"],
    answer: 1,
    explanation: "긴급도살은 질병이나 사고로 폐사가 임박하여 긴급히 도살하는 것으로, 보험금 지급 대상이 됩니다.",
    category: "가축재해보험"
  },
  {
    id: 45,
    question: "가축재해보험 가입 시 고지해야 할 사항이 아닌 것은?",
    options: ["축종 및 두수", "사육시설 현황", "과거 질병 이력", "농어업인의 학력"],
    answer: 3,
    explanation: "가축재해보험 가입 시 축종, 두수, 사육시설, 질병 이력 등을 고지해야 하며, 농어업인의 학력은 무관합니다.",
    category: "가축재해보험"
  },
  {
    id: 46,
    question: "가축재해보험의 보험료 산정 요소가 아닌 것은?",
    options: ["축종", "사육 두수", "사육 지역", "농어업인의 재산 상태"],
    answer: 3,
    explanation: "가축재해보험 보험료는 축종, 사육 두수, 지역 등을 고려하여 산정하며, 농어업인의 재산 상태는 고려하지 않습니다.",
    category: "가축재해보험"
  },
  {
    id: 47,
    question: "가축재해보험에서 '도태'란?",
    options: ["자연사", "질병·불임·노화 등으로 사육 가치가 없어 도살하는 것", "출하", "폐사"],
    answer: 1,
    explanation: "도태는 질병, 불임, 노화 등으로 경제적 사육 가치가 없어져 도살 처분하는 것입니다.",
    category: "가축재해보험"
  },
  {
    id: 48,
    question: "가축재해보험의 보험기간은?",
    options: ["축종별로 다름(일반적으로 1년)", "6개월 고정", "사육 기간 전체", "3년"],
    answer: 0,
    explanation: "가축재해보험의 보험기간은 축종별로 다르며, 일반적으로 1년 단위입니다.",
    category: "가축재해보험"
  },
  {
    id: 49,
    question: "가축재해보험에서 보험금 청구 시 필요한 서류가 아닌 것은?",
    options: ["폐사 확인서", "수의사 진단서", "손해평가서", "농어업인의 졸업증명서"],
    answer: 3,
    explanation: "보험금 청구 시 폐사 확인서, 수의사 진단서, 손해평가서 등이 필요하며, 졸업증명서는 필요하지 않습니다.",
    category: "가축재해보험"
  },
  {
    id: 50,
    question: "가축재해보험에서 자기부담금의 의미는?",
    options: ["정부 지원금", "손해 발생 시 가입자가 부담하는 금액", "보험료 할인액", "재보험료"],
    answer: 1,
    explanation: "자기부담금은 손해 발생 시 가입자가 직접 부담하는 금액으로, 보험금에서 공제됩니다.",
    category: "가축재해보험"
  }
];

export default function InsuranceLawPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('damage-assessor-insurance-law-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setScore(progress.score || 0);
      setAnsweredQuestions(new Set(progress.answered || []));
      setCurrentQuestion(progress.current || 0);
    }
  }, []);

  const saveProgress = (newScore: number, answered: Set<number>, current: number) => {
    localStorage.setItem('damage-assessor-insurance-law-progress', JSON.stringify({
      score: newScore,
      answered: Array.from(answered),
      current
    }));
  };

  const handleAnswer = (index: number) => {
    if (answeredQuestions.has(currentQuestion)) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    const newAnswered = new Set(answeredQuestions).add(currentQuestion);
    setAnsweredQuestions(newAnswered);
    let newScore = score;
    if (index === questions[currentQuestion].answer) {
      newScore = score + 1;
      setScore(newScore);
    }
    saveProgress(newScore, newAnswered, currentQuestion);
    if (newAnswered.size === questions.length) {
      setIsComplete(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      saveProgress(score, answeredQuestions, currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions(new Set());
    setIsComplete(false);
    localStorage.removeItem('damage-assessor-insurance-law-progress');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "농어업재해보험법 총칙": "bg-emerald-100 text-emerald-800",
      "손해평가사 제도": "bg-teal-100 text-teal-800",
      "농작물재해보험": "bg-cyan-100 text-cyan-800",
      "가축재해보험": "bg-blue-100 text-blue-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const progress = (answeredQuestions.size / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/insurance/damage-assessor" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            손해평가사 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">농어업재해보험법령</h1>
          <p className="text-emerald-100">농어업재해보험법, 시행령, 시행규칙</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">학습 진행률</span>
            <span className="text-sm font-medium text-emerald-600">{answeredQuestions.size} / {questions.length} 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">현재 점수: {score}점</span>
            <span className="text-sm text-gray-500">정답률: {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%</span>
          </div>
        </div>

        {isComplete && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg p-8 mb-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">학습 완료!</h2>
            <p className="text-xl mb-4">최종 점수: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
            <button onClick={resetQuiz} className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors">다시 도전하기</button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>{question.category}</span>
            <span className="text-gray-500 text-sm">문제 {currentQuestion + 1} / {questions.length}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ";
              if (showExplanation) {
                if (index === question.answer) buttonClass += "border-green-500 bg-green-50 text-green-800";
                else if (index === selectedAnswer) buttonClass += "border-red-500 bg-red-50 text-red-800";
                else buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
              } else if (answeredQuestions.has(currentQuestion)) {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed";
              } else {
                buttonClass += "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer";
              }
              return (
                <button key={index} onClick={() => handleAnswer(index)} disabled={answeredQuestions.has(currentQuestion)} className={buttonClass}>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>
          {showExplanation && (
            <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <h3 className="font-bold text-teal-800 mb-2">💡 해설</h3>
              <p className="text-teal-900">{question.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            이전 문제
          </button>
          <button onClick={resetQuiz} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">처음부터 다시</button>
          <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            다음 문제
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4">📚 카테고리별 문제 분포</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["농어업재해보험법 총칙", "손해평가사 제도", "농작물재해보험", "가축재해보험"].map((category, idx) => {
              const count = questions.filter(q => q.category === category).length;
              return (
                <div key={idx} className={`p-3 rounded-lg ${getCategoryColor(category)}`}>
                  <div className="font-medium text-sm">{category}</div>
                  <div className="text-sm opacity-80">{count}문제</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
