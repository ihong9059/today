'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function InsuranceLawStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('actuary-insurance-law-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('actuary-insurance-law-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIClick = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '보험계약 총론',
      questions: [
        { id: 1, question: '보험계약의 정의와 법적 성질을 설명하시오.', answer: '보험계약은 당사자 일방이 약정한 보험료를 지급하고 상대방이 재산 또는 생명·신체에 관한 불확정한 사고가 발생할 경우 보험금을 지급할 것을 약정하는 계약입니다.', prompt: '보험계약의 법적 정의와 특성(쌍무계약, 유상계약, 낙성계약, 불요식계약, 부합계약, 사행계약)을 설명해주세요' },
        { id: 2, question: '보험계약의 당사자와 관계자를 구분하시오.', answer: '당사자는 보험자와 보험계약자이며, 관계자는 피보험자(손해/생명)와 보험수익자(생명보험)입니다. 피보험자는 보험사고의 객체, 수익자는 보험금청구권자입니다.', prompt: '보험계약의 당사자(보험자, 보험계약자)와 관계자(피보험자, 보험수익자)의 개념과 역할을 설명해주세요' },
        { id: 3, question: '보험계약의 성립요건과 효력발생시기를 설명하시오.', answer: '청약과 승낙의 합치로 성립합니다. 보험자가 승낙한 때 효력이 발생하나, 최초보험료를 받은 경우 청약과 동시에 효력이 발생합니다.', prompt: '보험계약의 성립요건, 청약과 승낙, 그리고 효력발생시기에 관한 상법 규정을 설명해주세요' },
        { id: 4, question: '보험증권의 법적 성질과 효력을 설명하시오.', answer: '보험증권은 증거증권이며, 보험계약 내용의 추정력을 갖습니다. 유가증권이 아니므로 증권 없이도 권리행사가 가능합니다.', prompt: '보험증권의 법적 성질, 추정력, 그리고 유가증권과의 차이를 설명해주세요' },
        { id: 5, question: '보험약관의 규제와 해석원칙을 설명하시오.', answer: '보험약관은 금융감독원의 심사를 받아야 합니다. 해석 시 작성자불이익의 원칙, 개별약정우선의 원칙이 적용됩니다.', prompt: '보험약관의 인가, 신고제도, 그리고 약관해석의 원칙을 설명해주세요' },
        { id: 6, question: '보험의 목적과 피보험이익의 관계를 설명하시오.', answer: '보험의 목적은 보험사고의 객체, 피보험이익은 보험의 목적에 대해 피보험자가 갖는 경제적 이해관계입니다. 손해보험에서 피보험이익은 필수요소입니다.', prompt: '보험의 목적과 피보험이익의 정의, 관계, 그리고 손해보험에서 피보험이익의 중요성을 설명해주세요' },
        { id: 7, question: '보험가액과 보험금액의 차이를 설명하시오.', answer: '보험가액은 피보험이익의 금전적 평가액(객관적), 보험금액은 당사자가 정한 보험자 책임의 최고한도(약정금액)입니다.', prompt: '보험가액과 보험금액의 정의, 차이점, 그리고 초과보험·일부보험과의 관계를 설명해주세요' },
        { id: 8, question: '보험료의 법적 성질과 지급시기를 설명하시오.', answer: '보험료는 보험자의 위험부담에 대한 대가입니다. 원칙적으로 선급이며, 최초보험료 미납 시 보험자는 계약을 해지할 수 있습니다.', prompt: '보험료의 법적 성질, 지급시기, 그리고 보험료 미납 시 효과를 설명해주세요' },
        { id: 9, question: '보험기간과 보험료기간의 차이를 설명하시오.', answer: '보험기간은 보험자가 책임을 지는 기간, 보험료기간은 보험료 납입과 관련된 기간입니다. 보험기간과 보험료납입기간이 다를 수 있습니다.', prompt: '보험기간, 보험료기간, 보험료납입기간의 개념과 차이를 설명해주세요' },
        { id: 10, question: '보험계약의 무효사유를 설명하시오.', answer: '① 피보험이익 없는 경우, ② 보험사고 이미 발생, ③ 보험사고 발생불가능, ④ 사기계약 등의 경우 계약이 무효입니다.', prompt: '보험계약의 무효사유와 각각의 법적 효과를 설명해주세요' }
      ]
    },
    {
      title: '고지의무',
      questions: [
        { id: 11, question: '고지의무의 정의와 법적 성질을 설명하시오.', answer: '보험계약자와 피보험자가 계약 체결 시 중요사항을 보험자에게 알려야 하는 의무입니다. 진정한 의무가 아닌 간접의무(자기의무)입니다.', prompt: '고지의무의 정의, 법적 성질(간접의무), 그리고 존재 이유를 설명해주세요' },
        { id: 12, question: '고지의무자와 고지수령권자를 설명하시오.', answer: '고지의무자는 보험계약자와 피보험자입니다. 고지수령권자는 보험자와 그 대리인(보험모집인)입니다.', prompt: '고지의무자의 범위, 고지수령권자, 그리고 보험모집인의 고지수령권에 대해 설명해주세요' },
        { id: 13, question: '중요한 사항의 판단기준을 설명하시오.', answer: '보험자가 위험측정과 보험료 산출에 영향을 미치는 사항으로, 객관적·일반적 기준에 따라 판단합니다. 보험자가 서면질문한 사항은 중요사항으로 추정됩니다.', prompt: '고지의무에서 중요한 사항의 판단기준과 서면질문의 효과를 설명해주세요' },
        { id: 14, question: '고지의무 위반의 요건을 설명하시오.', answer: '① 중요사항의 불고지 또는 부실고지, ② 고지의무자의 고의 또는 중대한 과실이 요건입니다. 경과실에 의한 위반은 해지사유가 아닙니다.', prompt: '고지의무 위반의 주관적·객관적 요건을 설명해주세요' },
        { id: 15, question: '고지의무 위반의 효과를 설명하시오.', answer: '보험자는 계약을 해지할 수 있고, 해지 전 발생한 보험사고에도 면책됩니다. 다만, 인과관계 없는 사고는 보상합니다.', prompt: '고지의무 위반 시 보험자의 해지권, 면책, 인과관계 부존재 특칙을 설명해주세요' },
        { id: 16, question: '보험자의 해지권 제한사유를 설명하시오.', answer: '① 보험자가 알았거나 중과실로 모른 경우, ② 3년 경과, ③ 1개월 내 미해지, ④ 보험자가 진단할 기회를 부여한 경우 해지할 수 없습니다.', prompt: '고지의무 위반 시 보험자의 해지권이 제한되는 경우를 설명해주세요' },
        { id: 17, question: '사기에 의한 계약과 고지의무 위반의 차이를 설명하시오.', answer: '사기계약은 무효이고 보험료 반환의무 없음, 고지의무 위반은 해지권 발생하고 해약환급금은 반환합니다. 고의 여부와 정도가 다릅니다.', prompt: '사기계약과 고지의무 위반의 요건과 효과 차이를 설명해주세요' },
        { id: 18, question: '계약전 알릴의무와 계약후 통지의무를 비교하시오.', answer: '고지의무는 계약 체결 시 의무, 통지의무는 계약 후 위험변경·증가 시 의무입니다. 통지의무 위반 시도 보험자는 해지할 수 있습니다.', prompt: '고지의무와 통지의무의 시기, 내용, 위반효과 차이를 설명해주세요' },
        { id: 19, question: '단체보험에서 고지의무의 특칙을 설명하시오.', answer: '단체보험에서 피보험자의 고지의무가 완화됩니다. 특히 단체전원 가입의 경우 개별 피보험자의 고지의무가 면제될 수 있습니다.', prompt: '단체보험에서 고지의무의 특칙과 그 이유를 설명해주세요' },
        { id: 20, question: '자동차보험에서 고지의무의 특수성을 설명하시오.', answer: '자동차보험은 의무보험이므로 고지의무 위반으로 인한 계약해지가 제한됩니다. 피해자 보호를 위해 면책사유가 제한됩니다.', prompt: '자동차보험에서 고지의무 규정의 특수성과 피해자 보호 규정을 설명해주세요' }
      ]
    },
    {
      title: '보험금 청구권',
      questions: [
        { id: 21, question: '보험금청구권의 발생요건과 행사를 설명하시오.', answer: '보험기간 중 보험사고의 발생으로 청구권이 발생합니다. 청구권자는 손해보험은 피보험자, 생명보험은 보험수익자입니다.', prompt: '보험금청구권의 발생요건, 청구권자, 그리고 행사 방법을 설명해주세요' },
        { id: 22, question: '보험금청구권의 소멸시효를 설명하시오.', answer: '보험금청구권은 3년간 행사하지 않으면 시효로 소멸합니다. 기산점은 보험사고 발생시점이나, 안 때부터 진행한다는 견해도 있습니다.', prompt: '보험금청구권의 소멸시효 기간과 기산점에 관한 논의를 설명해주세요' },
        { id: 23, question: '보험자의 면책사유를 설명하시오.', answer: '① 고의사고, ② 전쟁 등 비상위험, ③ 고지의무 위반과 인과관계 있는 사고 등이 법정면책사유입니다. 약관으로 추가 면책사유를 정할 수 있습니다.', prompt: '법정면책사유와 약관면책사유의 종류와 요건을 설명해주세요' },
        { id: 24, question: '보험계약자·피보험자의 고의사고 면책을 설명하시오.', answer: '보험계약자나 피보험자의 고의로 발생한 사고는 면책됩니다. 다만, 생명보험에서 피보험자가 자살한 경우 일정기간 경과 후에는 보상합니다.', prompt: '고의사고 면책의 요건, 입증책임, 그리고 생명보험 자살조항을 설명해주세요' },
        { id: 25, question: '보험금 지급의무의 이행기를 설명하시오.', answer: '보험자는 보험금청구를 받은 날로부터 일정기간 내에 지급해야 합니다. 지연 시 지연이자를 지급해야 하며, 약관에서 구체적 기간을 정합니다.', prompt: '보험금 지급기한, 지연이자, 그리고 가지급금 제도를 설명해주세요' },
        { id: 26, question: '보험금액의 일부지급과 분쟁해결을 설명하시오.', answer: '보험자가 책임이 있다고 인정되는 금액에 대해서는 먼저 지급해야 합니다. 분쟁 시 금융분쟁조정, 소송 등을 통해 해결합니다.', prompt: '보험금 일부지급 제도와 보험분쟁 해결 절차를 설명해주세요' },
        { id: 27, question: '보험자대위의 개념과 요건을 설명하시오.', answer: '보험자가 보험금을 지급한 후 피보험자의 제3자에 대한 권리를 취득하는 것입니다. 잔존물대위와 청구권대위가 있습니다.', prompt: '보험자대위의 종류(잔존물대위, 청구권대위), 요건, 범위를 설명해주세요' },
        { id: 28, question: '중복보험의 처리를 설명하시오.', answer: '동일한 피보험이익에 대해 여러 보험이 존재하는 경우입니다. 각 보험자는 독립책임액의 비율로 분담하는 것이 원칙입니다.', prompt: '중복보험의 정의, 보험자 간 분담방법, 그리고 다른 보험계약 통지의무를 설명해주세요' },
        { id: 29, question: '초과보험과 일부보험의 처리를 설명하시오.', answer: '초과보험은 보험금액이 보험가액을 초과하는 경우로 보험가액 한도 보상, 일부보험은 그 반대로 비례보상이 원칙입니다.', prompt: '초과보험과 일부보험의 정의, 효과, 그리고 보험료 반환 문제를 설명해주세요' },
        { id: 30, question: '보험사기의 유형과 법적 제재를 설명하시오.', answer: '보험사기는 허위청구, 고의사고 유발 등 다양한 유형이 있습니다. 형사처벌, 민사손해배상, 계약해지 등의 제재가 가능합니다.', prompt: '보험사기의 유형, 법적 제재, 그리고 보험사기특별법의 주요 내용을 설명해주세요' }
      ]
    },
    {
      title: '손해보험계약',
      questions: [
        { id: 31, question: '손해보험의 특성과 이득금지 원칙을 설명하시오.', answer: '손해보험은 실손보상 원칙이 적용됩니다. 피보험자는 실제 손해를 초과하여 이익을 얻을 수 없습니다(이득금지 원칙).', prompt: '손해보험의 실손보상 원칙과 이득금지 원칙의 의미와 근거를 설명해주세요' },
        { id: 32, question: '화재보험의 보상범위를 설명하시오.', answer: '화재로 인한 직접손해와 소방손해를 보상합니다. 피보험자의 경과실에 의한 화재도 보상하나, 고의·중과실은 면책됩니다.', prompt: '화재보험의 보상범위, 소방손해, 면책사유를 설명해주세요' },
        { id: 33, question: '책임보험의 구조와 특성을 설명하시오.', answer: '피보험자가 제3자에게 부담하는 손해배상책임을 담보합니다. 직접청구권, 방어의무 등 특수한 제도가 있습니다.', prompt: '책임보험의 구조, 직접청구권, 방어의무를 설명해주세요' },
        { id: 34, question: '자동차보험의 구성과 의무보험을 설명하시오.', answer: '대인배상Ⅰ(의무), 대인배상Ⅱ(임의), 대물배상, 자기신체사고, 자기차량손해로 구성됩니다. 책임보험에 미가입 시 과태료가 부과됩니다.', prompt: '자동차보험의 담보 구성, 의무보험과 임의보험의 구분을 설명해주세요' },
        { id: 35, question: '운행자 책임과 무과실책임을 설명하시오.', answer: '자배법상 운행자는 자동차 운행으로 인한 인신사고에 대해 무과실책임을 집니다. 다만, 3가지 면책사유 증명 시 면책됩니다.', prompt: '운행자의 정의, 무과실책임의 근거, 면책사유를 설명해주세요' },
        { id: 36, question: '해상보험의 특성과 담보위험을 설명하시오.', answer: '해상보험은 해상사업에 관한 위험을 담보합니다. 해상고유의 위험(침몰, 좌초 등)과 외래위험을 보상합니다.', prompt: '해상보험의 특성, 담보위험의 종류, 피보험이익의 특수성을 설명해주세요' },
        { id: 37, question: '운송보험과 적하보험을 비교하시오.', answer: '운송보험은 운송인의 책임을 담보, 적하보험은 화물소유자의 이익을 담보합니다. 담보범위와 피보험자가 다릅니다.', prompt: '운송보험과 적하보험의 피보험이익, 담보범위, 피보험자 차이를 설명해주세요' },
        { id: 38, question: '보증보험의 법적 성질을 설명하시오.', answer: '보증보험은 보증과 보험의 성질을 겸유합니다. 판례는 손해보험으로 보나, 구상권, 해지 등에서 특수성이 있습니다.', prompt: '보증보험의 법적 성질에 관한 논의와 보증과의 차이를 설명해주세요' },
        { id: 39, question: '배상책임보험에서 직접청구권을 설명하시오.', answer: '피해자가 보험자에게 직접 보험금을 청구할 수 있는 권리입니다. 자동차보험, 의무보험에서 인정됩니다.', prompt: '직접청구권의 법적 성질, 인정범위, 행사요건을 설명해주세요' },
        { id: 40, question: '상해보험의 법적 성질을 설명하시오.', answer: '상해보험은 손해보험적 성격과 인보험적 성격을 겸유합니다. 정액급부와 실손급부가 모두 가능합니다.', prompt: '상해보험의 법적 성질, 손해보험설과 인보험설, 그리고 실무의 처리를 설명해주세요' }
      ]
    },
    {
      title: '생명보험·보험업법',
      questions: [
        { id: 41, question: '생명보험의 특성과 손해보험과의 차이를 설명하시오.', answer: '생명보험은 정액보험으로 실손보상 원칙이 적용되지 않습니다. 피보험이익이 불요, 보험자대위 불인정 등의 차이가 있습니다.', prompt: '생명보험의 특성과 손해보험과의 주요 차이점을 설명해주세요' },
        { id: 42, question: '타인의 생명보험에서 피보험자 동의의 의미를 설명하시오.', answer: '타인의 사망을 보험사고로 하는 보험계약은 피보험자의 서면동의가 필요합니다. 동의 없는 계약은 무효입니다.', prompt: '타인의 생명보험에서 피보험자 동의의 취지, 방식, 동의 없는 계약의 효력을 설명해주세요' },
        { id: 43, question: '보험수익자의 지정과 변경을 설명하시오.', answer: '보험계약자가 보험수익자를 지정하며, 피보험자 동의를 얻어 변경할 수 있습니다. 지정이 없으면 피보험자 본인이 됩니다.', prompt: '보험수익자 지정·변경의 방법과 요건, 법정수익자 규정을 설명해주세요' },
        { id: 44, question: '생명보험에서 자살면책과 자살특약을 설명하시오.', answer: '피보험자가 자살한 경우 원칙적으로 면책이나, 계약일로부터 일정기간(보통 2년) 경과 후 자살은 보상하는 것이 일반적입니다.', prompt: '생명보험에서 자살면책 조항과 자살특약의 내용을 설명해주세요' },
        { id: 45, question: '보험업법상 보험업의 허가와 등록을 설명하시오.', answer: '보험업 영위를 위해서는 금융위원회의 허가가 필요합니다. 생명보험업, 손해보험업, 제3보험업으로 구분됩니다.', prompt: '보험업 허가의 요건, 절차, 그리고 보험업 구분을 설명해주세요' },
        { id: 46, question: '보험회사의 자산운용 규제를 설명하시오.', answer: '보험회사는 책임준비금에 상당하는 자산을 적정하게 운용해야 합니다. 동일인 대출한도, 부동산 취득한도 등 규제가 있습니다.', prompt: '보험회사 자산운용 규제의 종류와 취지를 설명해주세요' },
        { id: 47, question: '보험모집의 규제와 보험설계사의 의무를 설명하시오.', answer: '보험모집은 등록된 모집종사자만 할 수 있습니다. 설명의무, 적합성원칙, 부당권유 금지 등의 의무가 부과됩니다.', prompt: '보험모집 규제, 보험설계사의 등록요건과 의무를 설명해주세요' },
        { id: 48, question: '보험계약의 청약철회와 품질보증해지를 설명하시오.', answer: '청약철회는 청약일로부터 15일(30일) 내 가능합니다. 품질보증해지는 계약일로부터 3개월 내 불만족 시 해지 가능합니다.', prompt: '청약철회권과 품질보증해지권의 요건, 효과, 차이점을 설명해주세요' },
        { id: 49, question: '보험회사의 지급여력(RBC)제도를 설명하시오.', answer: 'RBC(Risk Based Capital)는 위험기준 자기자본비율로, 보험회사의 재무건전성을 측정합니다. 100% 이상 유지해야 합니다.', prompt: 'RBC제도의 의미, 계산방법, 그리고 규제비율을 설명해주세요' },
        { id: 50, question: '보험업법상 계약이전과 합병 규정을 설명하시오.', answer: '보험회사는 금융위 인가를 받아 보험계약을 다른 보험회사에 이전하거나 합병할 수 있습니다. 계약자 보호절차가 필요합니다.', prompt: '보험계약 이전과 합병의 요건, 절차, 계약자 보호제도를 설명해주세요' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = completedQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/actuary" className="text-gray-500 hover:text-gray-700">보험계리사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">보험계약법</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">보험계약법</h1>
          <p className="text-gray-600">Insurance Contract Law - 상법 보험편, 보험업법</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div className="bg-indigo-600 h-3 rounded-full transition-all" style={{ width: `${(completedCount / totalQuestions) * 100}%` }} />
            </div>
            <span className="text-sm text-gray-500">{completedCount}/{totalQuestions} 완료</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button onClick={() => setOpenTopic(openTopic === topicIdx ? null : topicIdx)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚖️</span>
                  <div className="text-left">
                    <h2 className="font-bold">{topic.title}</h2>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <span className={`transform transition-transform ${openTopic === topicIdx ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {openTopic === topicIdx && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-xl border ${completedQuestions.has(q.id) ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleComplete(q.id)} className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${completedQuestions.has(q.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-3">{q.answer}</p>
                          <button onClick={() => handleAIClick(q.prompt)} className="text-sm text-indigo-600 hover:text-indigo-700">🤖 AI에게 더 자세히 질문하기</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/category/insurance/actuary" className="text-indigo-600 hover:text-indigo-700 font-medium">← 보험계리사 메인으로</Link>
        </div>
      </main>

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700">{currentPrompt}</p>
            </div>
            <div className="grid gap-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Gemini에게 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
