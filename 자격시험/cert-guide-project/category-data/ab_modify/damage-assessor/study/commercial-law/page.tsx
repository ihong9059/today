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
  // 보험계약 총론 (13문제)
  {
    id: 1,
    question: "상법상 보험계약의 정의로 옳은 것은?",
    options: ["당사자 일방이 약정한 보험료를 지급하고 상대방이 재산상 손해를 보상하는 계약", "당사자 일방이 약정한 보험료를 지급하고 상대방이 재산 또는 생명·신체에 관한 불확정한 사고 발생 시 보상하는 계약", "보험자가 피보험자에게 일정 금액을 지급하기로 하는 계약", "보험계약자와 피보험자 사이의 손해배상 계약"],
    answer: 1,
    explanation: "상법 제638조에서 보험계약이란 당사자 일방이 약정한 보험료를 지급하고 재산 또는 생명이나 신체에 불확정한 사고가 발생할 경우에 상대방이 일정한 보험금이나 그 밖의 급여를 지급할 것을 약정함으로써 효력이 생긴다고 정의합니다.",
    category: "보험계약 총론"
  },
  {
    id: 2,
    question: "보험계약에서 '피보험이익'이란?",
    options: ["보험자가 얻는 이익", "보험계약자가 납부하는 금액", "피보험자가 보험사고 발생으로 손해를 입을 수 있는 경제적 이해관계", "보험금 수령권"],
    answer: 2,
    explanation: "피보험이익이란 피보험자가 보험사고의 발생으로 인하여 손해를 입을 우려가 있는 경제적 이해관계를 말합니다.",
    category: "보험계약 총론"
  },
  {
    id: 3,
    question: "보험계약자의 고지의무 위반 시 보험자의 권리는?",
    options: ["계약 해지 및 보험금 지급 거절 가능", "보험료 환급 의무 발생", "자동으로 계약 종료", "보험금 2배 청구"],
    answer: 0,
    explanation: "보험계약자 또는 피보험자가 고지의무를 위반한 경우 보험자는 그 사실을 안 날로부터 1개월 내, 계약을 체결한 날로부터 3년 내에 계약을 해지할 수 있습니다.",
    category: "보험계약 총론"
  },
  {
    id: 4,
    question: "상법상 보험계약의 당사자가 아닌 것은?",
    options: ["보험자", "보험계약자", "피보험자", "보험수익자"],
    answer: 3,
    explanation: "보험계약의 당사자는 보험자와 보험계약자입니다. 피보험자와 보험수익자는 보험계약의 관계인입니다.",
    category: "보험계약 총론"
  },
  {
    id: 5,
    question: "보험계약에서 통지의무란?",
    options: ["계약 체결 시 중요사항을 알릴 의무", "계약 체결 후 위험변경이나 위험증가 사실을 알릴 의무", "보험금 청구 시 사고내용을 알릴 의무", "보험료 납부를 알릴 의무"],
    answer: 1,
    explanation: "통지의무는 보험계약 성립 후 위험이 현저하게 변경 또는 증가된 사실이 있을 때 지체 없이 보험자에게 통지해야 하는 의무입니다.",
    category: "보험계약 총론"
  },
  {
    id: 6,
    question: "보험계약의 해지에 관한 설명으로 옳지 않은 것은?",
    options: ["보험사고 발생 전에는 언제든지 계약 해지 가능", "해지 시 미경과보험료 반환", "사기로 인한 계약은 취소 가능", "해지는 장래에 대해서만 효력 발생"],
    answer: 0,
    explanation: "보험계약자는 보험사고가 발생하기 전에는 언제든지 계약의 전부 또는 일부를 해지할 수 있으나, 타인을 위한 보험계약의 경우에는 그 타인의 동의가 필요합니다.",
    category: "보험계약 총론"
  },
  {
    id: 7,
    question: "보험계약의 무효사유가 아닌 것은?",
    options: ["보험계약 당시 보험사고가 이미 발생한 경우", "보험계약 당시 보험사고 발생이 불가능한 경우", "사행계약적 성격", "보험계약자의 사기"],
    answer: 2,
    explanation: "보험계약은 본질적으로 사행계약적 성격을 가지므로 이는 무효사유가 아닙니다. 계약 당시 이미 사고 발생이나 불가능한 경우가 무효사유입니다.",
    category: "보험계약 총론"
  },
  {
    id: 8,
    question: "타인을 위한 보험계약에서 피보험자의 권리는?",
    options: ["보험금 청구권 없음", "보험금 청구권 있음", "보험료 납부 의무", "계약 해지권"],
    answer: 1,
    explanation: "타인을 위한 보험계약에서 피보험자는 당연히 보험금을 청구할 권리가 있습니다.",
    category: "보험계약 총론"
  },
  {
    id: 9,
    question: "보험증권의 법적 성격은?",
    options: ["유가증권", "증거증권", "면책증권", "지시증권"],
    answer: 1,
    explanation: "보험증권은 보험계약의 성립과 내용을 증명하는 증거증권이며, 유가증권이 아닙니다.",
    category: "보험계약 총론"
  },
  {
    id: 10,
    question: "보험료의 지급시기에 관한 원칙은?",
    options: ["후불주의", "선불주의", "분할납부주의", "약정주의"],
    answer: 1,
    explanation: "보험료는 원칙적으로 보험계약 체결 시 선불로 지급해야 합니다(선불주의).",
    category: "보험계약 총론"
  },
  {
    id: 11,
    question: "보험계약의 부활에 관한 설명으로 옳은 것은?",
    options: ["해지된 모든 계약에 적용", "보험료 미납으로 해지된 계약에 적용", "새로운 계약 체결", "보험자의 의무사항"],
    answer: 1,
    explanation: "보험료 미납으로 해지된 계약에 대하여 일정 기간 내에 연체보험료와 이자를 납부하면 계약을 부활시킬 수 있습니다.",
    category: "보험계약 총론"
  },
  {
    id: 12,
    question: "상법상 보험금청구권의 소멸시효는?",
    options: ["1년", "2년", "3년", "5년"],
    answer: 2,
    explanation: "상법 제662조에 의해 보험금청구권은 3년간 행사하지 않으면 소멸시효가 완성됩니다.",
    category: "보험계약 총론"
  },
  {
    id: 13,
    question: "보험약관의 교부·설명의무 위반 시 효과는?",
    options: ["계약 무효", "보험자에게 불리하게 해석", "계약 해지", "보험료 환급"],
    answer: 1,
    explanation: "보험자가 약관의 중요 내용을 설명하지 않은 경우 해당 약관 내용은 보험계약자에게 유리하게(보험자에게 불리하게) 해석됩니다.",
    category: "보험계약 총론"
  },
  // 손해보험 (13문제)
  {
    id: 14,
    question: "손해보험의 가장 중요한 원칙은?",
    options: ["이익균등의 원칙", "실손보상의 원칙", "대위변제의 원칙", "보험료산정의 원칙"],
    answer: 1,
    explanation: "손해보험은 실제 발생한 손해만을 보상하는 실손보상(이득금지)의 원칙이 적용됩니다.",
    category: "손해보험"
  },
  {
    id: 15,
    question: "손해보험에서 보험가액이란?",
    options: ["보험계약에서 정한 보험금의 최고한도", "피보험이익을 금전으로 평가한 금액", "보험료를 산정하는 기준", "손해액의 합계"],
    answer: 1,
    explanation: "보험가액은 피보험이익을 금전으로 평가한 금액으로, 보험사고 발생 시 피보험자가 입을 수 있는 최대 손해액을 의미합니다.",
    category: "손해보험"
  },
  {
    id: 16,
    question: "초과보험에 관한 설명으로 옳은 것은?",
    options: ["보험금액이 보험가액을 초과하는 경우", "보험가액이 보험금액을 초과하는 경우", "보험료가 보험금을 초과하는 경우", "손해액이 보험금을 초과하는 경우"],
    answer: 0,
    explanation: "초과보험은 보험금액(약정한 최고 보상한도)이 보험가액(피보험이익의 금전 평가액)을 초과하는 경우를 말합니다.",
    category: "손해보험"
  },
  {
    id: 17,
    question: "중복보험에서 각 보험자의 책임은?",
    options: ["연대책임", "각자 독립하여 책임", "보험금액 비율로 안분 책임", "선착순 책임"],
    answer: 2,
    explanation: "중복보험의 경우 각 보험자는 각자의 보험금액의 비율에 따라 보상책임을 분담합니다.",
    category: "손해보험"
  },
  {
    id: 18,
    question: "일부보험에서 보험금 산정 방법은?",
    options: ["실제 손해액 전액 보상", "보험금액 전액 지급", "보험금액/보험가액 비율로 손해 보상", "보험가액 전액 보상"],
    answer: 2,
    explanation: "일부보험에서는 보험금액의 보험가액에 대한 비율로 손해를 보상합니다(비례보상).",
    category: "손해보험"
  },
  {
    id: 19,
    question: "손해보험에서 보험자대위란?",
    options: ["보험자가 피보험자를 대신하여 계약 체결", "보험금 지급 후 피보험자의 권리를 취득", "피보험자가 보험자의 권리를 취득", "보험계약자가 보험자를 대위"],
    answer: 1,
    explanation: "보험자대위란 보험자가 보험금을 지급한 후 피보험자가 제3자에 대해 가지는 손해배상청구권 등을 취득하는 것입니다.",
    category: "손해보험"
  },
  {
    id: 20,
    question: "화재보험의 피보험이익에 해당하지 않는 것은?",
    options: ["건물의 소유자", "건물의 임차인", "건물의 저당권자", "건물을 지나가는 행인"],
    answer: 3,
    explanation: "화재보험의 피보험이익을 가지려면 그 목적물에 대해 경제적 이해관계가 있어야 합니다. 단순 행인은 피보험이익이 없습니다.",
    category: "손해보험"
  },
  {
    id: 21,
    question: "책임보험에서 피보험자가 제3자에게 손해배상책임을 진 경우, 보험자의 책임은?",
    options: ["피보험자의 청구가 있어야 보상", "피해자가 직접 보험자에게 청구 가능", "보험계약자만 청구 가능", "법원의 판결이 있어야 보상"],
    answer: 1,
    explanation: "책임보험에서는 피해자(제3자)가 보험자에게 직접 보험금을 청구할 수 있는 직접청구권이 인정됩니다.",
    category: "손해보험"
  },
  {
    id: 22,
    question: "손해보험계약의 양도 시 보험자에 대한 효력 발생 요건은?",
    options: ["양도 통지 필요", "보험자의 동의 필요", "보험증권 배서 필요", "별도 요건 없음"],
    answer: 0,
    explanation: "손해보험계약의 양도는 보험자에게 통지하지 않으면 보험자에게 대항할 수 없습니다.",
    category: "손해보험"
  },
  {
    id: 23,
    question: "기평가보험에 관한 설명으로 옳은 것은?",
    options: ["보험가액을 정하지 않는 보험", "보험계약 시 당사자가 보험가액을 미리 정하는 보험", "보험금액만 정하는 보험", "손해액을 정액으로 정하는 보험"],
    answer: 1,
    explanation: "기평가보험은 보험계약 체결 시 당사자가 보험가액을 미리 정하여 두는 보험입니다.",
    category: "손해보험"
  },
  {
    id: 24,
    question: "운송보험의 보험기간 원칙은?",
    options: ["1년 단위", "운송 시작부터 종료까지", "계약 체결일부터 1년", "화물 인도일까지"],
    answer: 1,
    explanation: "운송보험은 운송의 시작부터 종료까지를 보험기간으로 합니다.",
    category: "손해보험"
  },
  {
    id: 25,
    question: "손해방지비용에 관한 설명으로 옳은 것은?",
    options: ["보험금에서 공제", "보험금에 추가하여 보상", "보험계약자 부담", "보험자 책임 없음"],
    answer: 1,
    explanation: "손해방지비용은 보험자가 보험금에 추가하여 보상해야 합니다(보험금과 별도).",
    category: "손해보험"
  },
  {
    id: 26,
    question: "잔존물대위란?",
    options: ["잔존물을 폐기하는 권리", "보험자가 전부보험금 지급 후 잔존물에 대한 권리 취득", "피보험자가 잔존물을 처분하는 권리", "잔존물 가액을 손해액에서 공제"],
    answer: 1,
    explanation: "잔존물대위란 보험자가 보험의 목적의 전부가 멸실한 경우에 보험금액 전부를 지급하고 그 목적에 대한 피보험자의 권리를 취득하는 것입니다.",
    category: "손해보험"
  },
  // 인보험 (12문제)
  {
    id: 27,
    question: "인보험에서 이득금지원칙이 적용되지 않는 이유는?",
    options: ["법률로 금지되어 있어서", "인간의 생명과 신체는 금전으로 평가할 수 없어서", "보험료가 높아서", "보험회사의 수익을 위해서"],
    answer: 1,
    explanation: "인간의 생명과 신체는 금전으로 평가할 수 없으므로 인보험에서는 실손보상(이득금지)의 원칙이 적용되지 않습니다.",
    category: "인보험"
  },
  {
    id: 28,
    question: "생명보험에서 타인의 생명을 보험계약의 목적으로 할 때 필요한 것은?",
    options: ["보험자의 동의", "피보험자의 서면 동의", "보험수익자의 동의", "별도의 동의 불필요"],
    answer: 1,
    explanation: "타인의 사망을 보험사고로 하는 생명보험계약에는 그 타인(피보험자)의 서면에 의한 동의가 필요합니다.",
    category: "인보험"
  },
  {
    id: 29,
    question: "생명보험에서 보험수익자 지정이 없는 경우 보험금 수령권자는?",
    options: ["보험계약자", "피보험자의 상속인", "보험자", "국가"],
    answer: 1,
    explanation: "보험수익자가 지정되지 않은 경우에는 피보험자의 상속인이 보험금을 수령합니다.",
    category: "인보험"
  },
  {
    id: 30,
    question: "상해보험에서 담보하는 위험은?",
    options: ["질병으로 인한 사망", "급격하고 우연한 외래의 사고로 인한 신체상해", "자연사", "노화로 인한 장애"],
    answer: 1,
    explanation: "상해보험은 급격하고 우연한 외래의 사고로 인한 피보험자의 신체상해를 담보합니다.",
    category: "인보험"
  },
  {
    id: 31,
    question: "생명보험계약에서 자살에 대한 보험자 면책에 관한 설명으로 옳은 것은?",
    options: ["모든 자살에 대해 면책", "계약 후 2년 이내 자살 시 면책", "자살은 항상 보상", "자살 면책 조항 없음"],
    answer: 1,
    explanation: "생명보험에서 피보험자가 계약일(부활일)로부터 2년 이내에 자살한 경우 보험자가 면책됩니다.",
    category: "인보험"
  },
  {
    id: 32,
    question: "보험수익자의 보험금청구권이 발생하는 시점은?",
    options: ["계약 체결 시", "보험료 납입 완료 시", "보험사고 발생 시", "보험금 지급 시"],
    answer: 2,
    explanation: "보험수익자의 보험금청구권은 보험사고가 발생한 때에 비로소 발생합니다.",
    category: "인보험"
  },
  {
    id: 33,
    question: "상해보험에서 '급격성'의 의미는?",
    options: ["천천히 발생하는 사고", "사고와 결과 사이에 시간적 간격이 없음", "반복적 사고", "예측 가능한 사고"],
    answer: 1,
    explanation: "급격성이란 사고 발생과 상해 결과 사이에 시간적 간격이 없이 즉시적으로 발생하는 것을 의미합니다.",
    category: "인보험"
  },
  {
    id: 34,
    question: "생명보험에서 보험사고의 고의유발에 관한 설명으로 옳은 것은?",
    options: ["고의로 사고를 유발해도 보험금 지급", "보험계약자나 보험수익자가 고의로 피보험자를 사망케 하면 면책", "피보험자의 동의가 있으면 보상", "보험자가 선택"],
    answer: 1,
    explanation: "보험계약자 또는 보험수익자가 고의로 피보험자를 사망케 한 경우 보험자는 면책됩니다.",
    category: "인보험"
  },
  {
    id: 35,
    question: "단체보험의 특징으로 옳지 않은 것은?",
    options: ["다수의 피보험자를 하나의 계약으로 담보", "개별 심사 없이 가입 가능", "단체의 구성원만 피보험자 가능", "개인보험보다 보험료가 비쌈"],
    answer: 3,
    explanation: "단체보험은 다수를 일괄 가입시키므로 사무비용이 절감되어 개인보험보다 보험료가 저렴합니다.",
    category: "인보험"
  },
  {
    id: 36,
    question: "상해보험에서 보험자의 면책사유가 아닌 것은?",
    options: ["피보험자의 고의", "전쟁, 기타 변란", "피보험자의 범죄행위", "일상생활 중 발생한 우연한 사고"],
    answer: 3,
    explanation: "일상생활 중 발생한 우연한 사고는 상해보험의 담보 범위에 해당하며 면책사유가 아닙니다.",
    category: "인보험"
  },
  {
    id: 37,
    question: "인보험에서 피보험자의 나이를 잘못 알고 계약한 경우의 효과는?",
    options: ["계약 무효", "보험료를 정산하여 조정", "보험자 면책", "계약 해지"],
    answer: 1,
    explanation: "피보험자의 나이를 잘못 알고 계약한 경우에는 정확한 나이에 해당하는 보험료로 정산하여 조정합니다.",
    category: "인보험"
  },
  {
    id: 38,
    question: "생명보험에서 보험자대위가 적용되지 않는 이유는?",
    options: ["법률로 금지되어 있어서", "인보험은 정액보험이므로", "보험료가 높아서", "피보험자의 권리 보호를 위해"],
    answer: 1,
    explanation: "인보험은 정액보험으로서 손해의 전보가 아닌 약정 금액을 지급하므로 보험자대위가 적용되지 않습니다.",
    category: "인보험"
  },
  // 보험금청구와 대위 (12문제)
  {
    id: 39,
    question: "보험금 지급청구권의 성질은?",
    options: ["형성권", "청구권(채권)", "항변권", "물권"],
    answer: 1,
    explanation: "보험금 지급청구권은 보험사고 발생 시 보험자에게 보험금 지급을 청구할 수 있는 채권입니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 40,
    question: "손해보험에서 보험자의 잔존물대위권 취득 요건은?",
    options: ["일부 보험금 지급", "전부 보험금 지급", "손해방지비용 지급", "보험료 수령"],
    answer: 1,
    explanation: "잔존물대위는 보험의 목적이 전부 멸실한 경우 보험자가 보험금액 전부를 지급했을 때 발생합니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 41,
    question: "보험금 청구 시 보험계약자 또는 피보험자의 의무는?",
    options: ["손해방지의무", "위험유지의무", "손해증명의무", "고지의무"],
    answer: 2,
    explanation: "보험금을 청구할 때에는 피보험자가 손해의 발생과 그 정도를 증명해야 합니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 42,
    question: "청구권대위에서 보험자가 취득하는 권리의 범위는?",
    options: ["지급한 보험금 한도 내", "피보험자의 모든 권리", "보험금액 전액", "손해액 전액"],
    answer: 0,
    explanation: "청구권대위에서 보험자는 지급한 보험금 한도 내에서 피보험자의 제3자에 대한 권리를 취득합니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 43,
    question: "보험자의 면책사유에 해당하지 않는 것은?",
    options: ["보험계약자의 고의", "피보험자의 중대한 과실", "전쟁, 기타 변란", "보험사고의 우연성"],
    answer: 3,
    explanation: "보험사고는 우연한 것이어야 하며, 우연성은 보험의 본질적 요소이므로 면책사유가 아니라 보험사고의 요건입니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 44,
    question: "손해보험에서 보험자가 보상하는 손해의 범위에 포함되지 않는 것은?",
    options: ["직접 손해", "손해방지비용", "잔존물 제거비용", "간접적·결과적 손해(약정 없는 경우)"],
    answer: 3,
    explanation: "원칙적으로 보험자는 직접 손해만 보상하며, 간접적·결과적 손해는 특약이 없으면 보상하지 않습니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 45,
    question: "보험금 지급기일에 관한 상법 규정은?",
    options: ["청구일로부터 10일 이내", "청구일로부터 30일 이내", "보험사고 발생일로부터 30일 이내", "약정에 따름"],
    answer: 0,
    explanation: "보험자는 보험금의 청구를 받은 때에는 지체 없이, 늦어도 청구일로부터 10일 이내에 보험금을 지급해야 합니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 46,
    question: "보험수익자가 보험사고를 고의로 발생시킨 경우 보험자의 책임은?",
    options: ["전액 보상", "일부 보상", "면책", "보험료 환급"],
    answer: 2,
    explanation: "보험수익자가 고의로 보험사고를 발생시킨 경우 보험자는 면책됩니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 47,
    question: "손해보험에서 손해액 산정 시 감가상각을 적용하는 이유는?",
    options: ["보험료를 높이기 위해", "실제 손해액을 산정하기 위해", "보험자 이익을 위해", "법률상 의무"],
    answer: 1,
    explanation: "손해보험은 실손보상이 원칙이므로 보험목적물의 실제 가치(감가상각 반영)를 기준으로 손해액을 산정합니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 48,
    question: "보험금청구권의 양도에 관한 설명으로 옳은 것은?",
    options: ["양도 금지", "보험자 동의 필요", "자유롭게 양도 가능", "피보험자만 양도 가능"],
    answer: 2,
    explanation: "보험금청구권은 채권이므로 특별한 제한이 없는 한 자유롭게 양도할 수 있습니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 49,
    question: "보험자가 피보험자의 피보험이익을 대위 취득하는 경우는?",
    options: ["일부보험금 지급 시", "전부보험금 지급 후 잔존물이 있는 경우", "손해방지비용 지급 시", "보험료 환급 시"],
    answer: 1,
    explanation: "보험자가 전손에 대해 보험금 전액을 지급하면 잔존물에 대한 피보험자의 권리(피보험이익)를 대위 취득합니다.",
    category: "보험금청구와 대위"
  },
  {
    id: 50,
    question: "상법상 보험금청구권에 대한 압류가 가능한 경우는?",
    options: ["모든 경우 압류 가능", "생명보험금청구권만 압류 금지", "손해보험금청구권만 압류 금지", "압류 가능하나 일정 한도에서 제한"],
    answer: 3,
    explanation: "보험금청구권도 채권이므로 압류가 가능하나, 생계보장 등을 위해 일정 한도에서 제한될 수 있습니다.",
    category: "보험금청구와 대위"
  }
];

export default function CommercialLawPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('damage-assessor-commercial-law-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      setScore(progress.score || 0);
      setAnsweredQuestions(new Set(progress.answered || []));
      setCurrentQuestion(progress.current || 0);
    }
  }, []);

  const saveProgress = (newScore: number, answered: Set<number>, current: number) => {
    localStorage.setItem('damage-assessor-commercial-law-progress', JSON.stringify({
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
    localStorage.removeItem('damage-assessor-commercial-law-progress');
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "보험계약 총론": "bg-emerald-100 text-emerald-800",
      "손해보험": "bg-teal-100 text-teal-800",
      "인보험": "bg-cyan-100 text-cyan-800",
      "보험금청구와 대위": "bg-blue-100 text-blue-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const progress = (answeredQuestions.size / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Link href="/category/insurance/damage-assessor" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            손해평가사 메인으로
          </Link>
          <h1 className="text-3xl font-bold mb-2">상법(보험편)</h1>
          <p className="text-emerald-100">보험계약, 손해보험, 인보험의 법률관계</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">학습 진행률</span>
            <span className="text-sm font-medium text-emerald-600">{answeredQuestions.size} / {questions.length} 문제</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">현재 점수: {score}점</span>
            <span className="text-sm text-gray-500">정답률: {answeredQuestions.size > 0 ? Math.round((score / answeredQuestions.size) * 100) : 0}%</span>
          </div>
        </div>

        {/* Complete Message */}
        {isComplete && (
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg p-8 mb-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">학습 완료!</h2>
            <p className="text-xl mb-4">최종 점수: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)</p>
            <button
              onClick={resetQuiz}
              className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
            >
              다시 도전하기
            </button>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>
              {question.category}
            </span>
            <span className="text-gray-500 text-sm">문제 {currentQuestion + 1} / {questions.length}</span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ";

              if (showExplanation) {
                if (index === question.answer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer && index !== question.answer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else if (answeredQuestions.has(currentQuestion)) {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed";
              } else {
                buttonClass += "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answeredQuestions.has(currentQuestion)}
                  className={buttonClass}
                >
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="mt-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <h3 className="font-bold text-teal-800 mb-2">💡 해설</h3>
              <p className="text-teal-900">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전 문제
          </button>

          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            처음부터 다시
          </button>

          <button
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            다음 문제
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Category Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-4">📚 카테고리별 문제 분포</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["보험계약 총론", "손해보험", "인보험", "보험금청구와 대위"].map((category, idx) => {
              const count = questions.filter(q => q.category === category).length;
              return (
                <div key={idx} className={`p-3 rounded-lg ${getCategoryColor(category)}`}>
                  <div className="font-medium">{category}</div>
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
