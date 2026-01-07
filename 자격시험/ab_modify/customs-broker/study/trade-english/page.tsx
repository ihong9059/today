'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TradeEnglishStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['trade-contract']);

  useEffect(() => {
    const saved = localStorage.getItem('customs-broker-trade-english-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('customs-broker-trade-english-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 무역계약 (1-12)
    { id: 1, topic: 'trade-contract', question: 'Sales Contract의 기본 구성요소를 영어로 설명하시오.', answer: 'Parties, Goods, Price, Quantity, Delivery, Payment terms, Inspection, Force majeure 등이 포함된다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Sales Contract의 기본 구성요소를 영어로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Parties to the contract\n2. Description of goods\n3. Price and payment terms\n4. Delivery terms\n5. 연습문제 3개' },
    { id: 2, topic: 'trade-contract', question: 'Offer와 Counter-offer의 차이를 영어로 설명하시오.', answer: 'Offer is a proposal to contract, while counter-offer rejects the original offer and proposes new terms.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Offer와 Counter-offer의 차이를 영어로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Definition of offer\n2. Requirements of valid offer\n3. Counter-offer effects\n4. Acceptance\n5. 연습문제 3개' },
    { id: 3, topic: 'trade-contract', question: 'Firm Offer와 Free Offer의 차이를 설명하시오.', answer: 'Firm offer는 일정 기간 철회 불가, Free offer는 언제든 철회 가능하다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Firm Offer와 Free Offer의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Firm offer definition\n2. Free offer definition\n3. Binding effects\n4. Practical examples\n5. 연습문제 3개' },
    { id: 4, topic: 'trade-contract', question: 'Terms and Conditions 조항의 주요 내용을 설명하시오.', answer: 'Warranty, Limitation of liability, Governing law, Dispute resolution 등이 포함된다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Terms and Conditions 조항의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Warranty clauses\n2. Liability limitations\n3. Governing law\n4. Arbitration clause\n5. 연습문제 3개' },
    { id: 5, topic: 'trade-contract', question: 'Force Majeure 조항의 의미와 효과를 설명하시오.', answer: 'Unforeseeable circumstances beyond control that excuse non-performance of contract.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Force Majeure 조항의 의미와 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Definition of force majeure\n2. Common events covered\n3. Legal effects\n4. Notice requirements\n5. 연습문제 3개' },
    { id: 6, topic: 'trade-contract', question: 'Proforma Invoice의 용도와 기재사항을 설명하시오.', answer: '견적서 역할로, 물품명세, 가격, 수량, 선적조건 등이 기재된다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Proforma Invoice의 용도와 기재사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Purpose of proforma invoice\n2. Key information\n3. Difference from commercial invoice\n4. Sample format\n5. 연습문제 3개' },
    { id: 7, topic: 'trade-contract', question: 'Purchase Order(발주서)와 Sales Confirmation의 관계를 설명하시오.', answer: 'Purchase order is buyer\'s order, sales confirmation is seller\'s acceptance.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Purchase Order와 Sales Confirmation의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Purchase order definition\n2. Sales confirmation role\n3. Legal binding effect\n4. Sample terms\n5. 연습문제 3개' },
    { id: 8, topic: 'trade-contract', question: 'Amendment와 Cancellation of Contract를 설명하시오.', answer: 'Amendment modifies contract terms, cancellation terminates the contract.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Amendment와 Cancellation of Contract를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Amendment procedures\n2. Cancellation grounds\n3. Notice requirements\n4. Compensation issues\n5. 연습문제 3개' },
    { id: 9, topic: 'trade-contract', question: 'Warranty와 Guarantee의 차이를 영어로 설명하시오.', answer: 'Warranty is seller\'s assurance about product quality, guarantee is third party\'s promise.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Warranty와 Guarantee의 차이를 영어로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Warranty definition\n2. Types of warranty\n3. Guarantee nature\n4. Legal implications\n5. 연습문제 3개' },
    { id: 10, topic: 'trade-contract', question: 'Packing List와 Commercial Invoice의 차이를 설명하시오.', answer: 'Packing list shows package details, commercial invoice shows transaction details.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Packing List와 Commercial Invoice의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Packing list contents\n2. Commercial invoice contents\n3. Customs clearance use\n4. Sample formats\n5. 연습문제 3개' },
    { id: 11, topic: 'trade-contract', question: 'Shipping Instruction의 주요 내용을 설명하시오.', answer: 'Details of shipment including vessel, port, marks, and documentation requirements.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Shipping Instruction의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Shipper information\n2. Cargo details\n3. Port information\n4. Documentation needs\n5. 연습문제 3개' },
    { id: 12, topic: 'trade-contract', question: 'Trade Terms와 Sales Terms의 의미를 설명하시오.', answer: 'Trade terms define delivery responsibilities, sales terms include price and payment conditions.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Trade Terms와 Sales Terms의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Trade terms definition\n2. Sales terms components\n3. Risk allocation\n4. Cost division\n5. 연습문제 3개' },

    // Incoterms (13-25)
    { id: 13, topic: 'incoterms', question: 'Incoterms 2020의 구조와 특징을 설명하시오.', answer: '11개 조건으로 구성되며, 모든 운송방식용과 해상운송용으로 구분된다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Incoterms 2020의 구조와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Incoterms 2020 overview\n2. Rules for any mode of transport\n3. Rules for sea transport\n4. Changes from 2010\n5. 연습문제 3개' },
    { id: 14, topic: 'incoterms', question: 'EXW (Ex Works) 조건을 영어로 설명하시오.', answer: 'Seller delivers when goods are placed at buyer\'s disposal at seller\'s premises.', prompt: '관세사 무역영어 문제입니다.\n\n문제: EXW (Ex Works) 조건을 영어로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Definition of EXW\n2. Seller\'s obligations\n3. Buyer\'s obligations\n4. Risk transfer point\n5. 연습문제 3개' },
    { id: 15, topic: 'incoterms', question: 'FCA (Free Carrier) 조건을 영어로 설명하시오.', answer: 'Seller delivers goods to carrier nominated by buyer at named place.', prompt: '관세사 무역영어 문제입니다.\n\n문제: FCA (Free Carrier) 조건을 영어로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Definition of FCA\n2. Two delivery points\n3. Export clearance\n4. B/L notation in 2020\n5. 연습문제 3개' },
    { id: 16, topic: 'incoterms', question: 'CPT와 CIP 조건을 비교 설명하시오.', answer: 'CPT includes carriage, CIP adds insurance. Risk transfers at first carrier.', prompt: '관세사 무역영어 문제입니다.\n\n문제: CPT와 CIP 조건을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CPT (Carriage Paid To)\n2. CIP (Carriage and Insurance Paid To)\n3. Insurance requirements in CIP\n4. Risk transfer point\n5. 연습문제 3개' },
    { id: 17, topic: 'incoterms', question: 'DAP, DPU, DDP 조건을 비교 설명하시오.', answer: 'DAP delivers at place, DPU adds unloading, DDP includes all duties paid.', prompt: '관세사 무역영어 문제입니다.\n\n문제: DAP, DPU, DDP 조건을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DAP (Delivered at Place)\n2. DPU (Delivered at Place Unloaded)\n3. DDP (Delivered Duty Paid)\n4. Import duties allocation\n5. 연습문제 3개' },
    { id: 18, topic: 'incoterms', question: 'FOB (Free On Board) 조건을 영어로 상세히 설명하시오.', answer: 'Seller delivers when goods are on board the vessel nominated by buyer at named port.', prompt: '관세사 무역영어 문제입니다.\n\n문제: FOB (Free On Board) 조건을 영어로 상세히 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Definition of FOB\n2. Seller\'s obligations\n3. Buyer\'s obligations\n4. Risk and cost division\n5. 연습문제 3개' },
    { id: 19, topic: 'incoterms', question: 'CFR과 CIF 조건을 비교 설명하시오.', answer: 'CFR includes cost and freight, CIF adds insurance. Both risk transfers at shipment.', prompt: '관세사 무역영어 문제입니다.\n\n문제: CFR과 CIF 조건을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CFR (Cost and Freight)\n2. CIF (Cost, Insurance and Freight)\n3. Insurance coverage in CIF\n4. Risk transfer point\n5. 연습문제 3개' },
    { id: 20, topic: 'incoterms', question: 'FAS (Free Alongside Ship) 조건을 설명하시오.', answer: 'Seller delivers goods alongside the vessel at the named port of shipment.', prompt: '관세사 무역영어 문제입니다.\n\n문제: FAS (Free Alongside Ship) 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Definition of FAS\n2. Delivery point\n3. Export clearance\n4. Suitable cargoes\n5. 연습문제 3개' },
    { id: 21, topic: 'incoterms', question: 'Risk와 Cost의 분기점 차이를 Incoterms별로 설명하시오.', answer: 'C조건에서 risk와 cost 분기점이 다르며, D조건에서는 일치한다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Risk와 Cost의 분기점 차이를 Incoterms별로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. E, F terms (risk=cost)\n2. C terms (risk≠cost)\n3. D terms (risk=cost)\n4. Practical implications\n5. 연습문제 3개' },
    { id: 22, topic: 'incoterms', question: 'Incoterms에서 보험부보의무가 있는 조건을 설명하시오.', answer: 'CIF와 CIP만 seller에게 보험부보의무가 있으며, 부보 범위가 다르다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Incoterms에서 보험부보의무가 있는 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CIF insurance requirement\n2. CIP insurance requirement (ICC A)\n3. Minimum coverage\n4. Additional coverage\n5. 연습문제 3개' },
    { id: 23, topic: 'incoterms', question: 'Export/Import Clearance 의무를 조건별로 설명하시오.', answer: 'EXW 외 모든 조건에서 seller가 수출통관, DDP에서만 seller가 수입통관한다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Export/Import Clearance 의무를 조건별로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Export clearance obligations\n2. Import clearance obligations\n3. EXW exception\n4. DDP full obligation\n5. 연습문제 3개' },
    { id: 24, topic: 'incoterms', question: 'Container 운송에 적합한 Incoterms 조건을 설명하시오.', answer: 'FCA, CPT, CIP가 컨테이너 운송에 적합하며, FOB, CFR, CIF는 부적합하다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Container 운송에 적합한 Incoterms 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Suitable terms (FCA, CPT, CIP)\n2. Why FOB is unsuitable\n3. Terminal handling issues\n4. Practical recommendations\n5. 연습문제 3개' },
    { id: 25, topic: 'incoterms', question: 'Incoterms 2020에서 DPU의 신설 배경을 설명하시오.', answer: 'DAT가 DPU로 변경되어 터미널 외 장소에서도 양하 가능해졌다.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Incoterms 2020에서 DPU의 신설 배경을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DAT in 2010\n2. Change to DPU\n3. Any place delivery\n4. Unloading obligation\n5. 연습문제 3개' },

    // 신용장 (26-38)
    { id: 26, topic: 'lc', question: 'Letter of Credit (L/C)의 의의와 당사자를 설명하시오.', answer: 'L/C is bank\'s conditional payment promise. Parties: applicant, beneficiary, issuing bank, advising bank.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Letter of Credit (L/C)의 의의와 당사자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Definition of L/C\n2. Applicant (Buyer)\n3. Beneficiary (Seller)\n4. Banks involved\n5. 연습문제 3개' },
    { id: 27, topic: 'lc', question: 'UCP 600의 주요 원칙을 설명하시오.', answer: 'UCP 600 governs L/C transactions with principles of independence and strict compliance.', prompt: '관세사 무역영어 문제입니다.\n\n문제: UCP 600의 주요 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. UCP 600 overview\n2. Independence principle\n3. Strict compliance\n4. Document examination\n5. 연습문제 3개' },
    { id: 28, topic: 'lc', question: 'Irrevocable L/C와 Confirmed L/C의 차이를 설명하시오.', answer: 'Irrevocable cannot be amended without consent, confirmed adds another bank\'s guarantee.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Irrevocable L/C와 Confirmed L/C의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Irrevocable L/C\n2. Confirmed L/C\n3. Confirming bank role\n4. Risk reduction\n5. 연습문제 3개' },
    { id: 29, topic: 'lc', question: 'Sight L/C와 Usance L/C의 차이를 설명하시오.', answer: 'Sight L/C pays immediately upon presentation, usance L/C pays after specified period.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Sight L/C와 Usance L/C의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Sight L/C definition\n2. Usance L/C definition\n3. Tenor calculation\n4. Interest allocation\n5. 연습문제 3개' },
    { id: 30, topic: 'lc', question: 'Transferable L/C와 Back-to-Back L/C를 비교하시오.', answer: 'Transferable L/C can be transferred to third party, back-to-back uses original L/C as collateral.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Transferable L/C와 Back-to-Back L/C를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. Transferable L/C mechanism\n2. Back-to-back L/C mechanism\n3. Middleman role\n4. Risk comparison\n5. 연습문제 3개' },
    { id: 31, topic: 'lc', question: 'Revolving L/C의 종류와 특징을 설명하시오.', answer: 'L/C that reinstates after each drawing. Cumulative and non-cumulative types exist.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Revolving L/C의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Revolving L/C definition\n2. Cumulative type\n3. Non-cumulative type\n4. Suitable transactions\n5. 연습문제 3개' },
    { id: 32, topic: 'lc', question: 'L/C에서 요구하는 주요 서류를 설명하시오.', answer: 'B/L, commercial invoice, packing list, certificate of origin, insurance policy.', prompt: '관세사 무역영어 문제입니다.\n\n문제: L/C에서 요구하는 주요 서류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Bill of Lading\n2. Commercial Invoice\n3. Packing List\n4. Certificate of Origin\n5. 연습문제 3개' },
    { id: 33, topic: 'lc', question: 'Discrepancy(하자)의 종류와 처리방법을 설명하시오.', answer: 'Documents not complying with L/C terms. Options: amendment, waiver, or rejection.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Discrepancy(하자)의 종류와 처리방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Common discrepancies\n2. Examination standard\n3. Handling options\n4. Waiver procedure\n5. 연습문제 3개' },
    { id: 34, topic: 'lc', question: 'Amendment of L/C 절차를 설명하시오.', answer: 'Changes require consent of all parties. Issuing bank issues amendment for beneficiary\'s acceptance.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Amendment of L/C 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Amendment request\n2. Issuing bank procedure\n3. Beneficiary acceptance\n4. Partial amendment\n5. 연습문제 3개' },
    { id: 35, topic: 'lc', question: 'Negotiation과 Payment의 차이를 설명하시오.', answer: 'Negotiation is purchase of drafts/documents, payment is direct settlement.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Negotiation과 Payment의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Negotiation definition\n2. Payment definition\n3. Nominated bank role\n4. With/without recourse\n5. 연습문제 3개' },
    { id: 36, topic: 'lc', question: 'Red Clause L/C와 Green Clause L/C를 설명하시오.', answer: 'Red clause allows advance payment, green clause adds storage cost advance.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Red Clause L/C와 Green Clause L/C를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Red clause L/C\n2. Advance payment amount\n3. Green clause addition\n4. Risk to applicant\n5. 연습문제 3개' },
    { id: 37, topic: 'lc', question: 'Standby L/C의 의의와 용도를 설명하시오.', answer: 'Guarantee instrument payable upon default. Used for performance guarantee.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Standby L/C의 의의와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Standby L/C definition\n2. Difference from commercial L/C\n3. Claim documents\n4. Common uses\n5. 연습문제 3개' },
    { id: 38, topic: 'lc', question: 'L/C의 유효기일과 선적기일의 관계를 설명하시오.', answer: 'Shipment must be within shipping period, documents presented within validity.', prompt: '관세사 무역영어 문제입니다.\n\n문제: L/C의 유효기일과 선적기일의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Expiry date\n2. Latest shipment date\n3. Presentation period\n4. Extension procedures\n5. 연습문제 3개' },

    // 운송보험 (39-50)
    { id: 39, topic: 'transport-insurance', question: 'Bill of Lading (B/L)의 기능과 종류를 설명하시오.', answer: 'B/L is document of title, receipt of goods, and evidence of contract. Types: Clean, Foul, On Board.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Bill of Lading (B/L)의 기능과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Functions of B/L\n2. Clean B/L vs Foul B/L\n3. On Board B/L\n4. Shipped B/L\n5. 연습문제 3개' },
    { id: 40, topic: 'transport-insurance', question: 'Air Waybill (AWB)과 B/L의 차이를 설명하시오.', answer: 'AWB is non-negotiable, B/L is negotiable document of title.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Air Waybill (AWB)과 B/L의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AWB characteristics\n2. Non-negotiable nature\n3. Consignment delivery\n4. L/C requirements\n5. 연습문제 3개' },
    { id: 41, topic: 'transport-insurance', question: 'Multimodal Transport Document를 설명하시오.', answer: 'Document covering transport by two or more different modes.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Multimodal Transport Document를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Definition\n2. Carrier\'s responsibility\n3. Negotiability\n4. Container transport use\n5. 연습문제 3개' },
    { id: 42, topic: 'transport-insurance', question: 'Freight와 관련된 용어(Prepaid, Collect)를 설명하시오.', answer: 'Prepaid means freight paid by shipper, collect means consignee pays.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Freight와 관련된 용어(Prepaid, Collect)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Freight prepaid\n2. Freight collect\n3. Incoterms relationship\n4. B/L notation\n5. 연습문제 3개' },
    { id: 43, topic: 'transport-insurance', question: 'Charter Party와 Liner Service를 비교하시오.', answer: 'Charter party is vessel hire, liner service operates regular routes.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Charter Party와 Liner Service를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. Charter party types\n2. Liner service features\n3. B/L types\n4. Suitable cargoes\n5. 연습문제 3개' },
    { id: 44, topic: 'transport-insurance', question: 'Marine Insurance의 기본원칙을 설명하시오.', answer: 'Principles: insurable interest, utmost good faith, indemnity, subrogation, contribution.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Marine Insurance의 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Insurable interest\n2. Utmost good faith\n3. Indemnity principle\n4. Subrogation\n5. 연습문제 3개' },
    { id: 45, topic: 'transport-insurance', question: 'ICC (Institute Cargo Clauses) A, B, C의 차이를 설명하시오.', answer: 'ICC A covers all risks, B and C cover named perils only.', prompt: '관세사 무역영어 문제입니다.\n\n문제: ICC (Institute Cargo Clauses) A, B, C의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ICC A coverage (All Risks)\n2. ICC B coverage\n3. ICC C coverage\n4. Common exclusions\n5. 연습문제 3개' },
    { id: 46, topic: 'transport-insurance', question: 'General Average와 Particular Average를 비교하시오.', answer: 'General average is shared loss, particular average is individual loss.', prompt: '관세사 무역영어 문제입니다.\n\n문제: General Average와 Particular Average를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. General average definition\n2. York-Antwerp Rules\n3. Particular average\n4. Insurance coverage\n5. 연습문제 3개' },
    { id: 47, topic: 'transport-insurance', question: 'Insurance Policy와 Insurance Certificate의 차이를 설명하시오.', answer: 'Policy is full contract, certificate is evidence of open cover.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Insurance Policy와 Insurance Certificate의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Insurance policy features\n2. Certificate characteristics\n3. Open cover policy\n4. L/C requirements\n5. 연습문제 3개' },
    { id: 48, topic: 'transport-insurance', question: 'Claim Procedure for cargo damage를 설명하시오.', answer: 'Notice of loss, survey, documentation, claim filing with insurer.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Claim Procedure for cargo damage를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Notice of loss\n2. Survey arrangement\n3. Required documents\n4. Time limits\n5. 연습문제 3개' },
    { id: 49, topic: 'transport-insurance', question: 'FPA와 WA 조건을 비교 설명하시오.', answer: 'FPA excludes partial losses, WA covers partial losses from perils of sea.', prompt: '관세사 무역영어 문제입니다.\n\n문제: FPA와 WA 조건을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FPA (Free from Particular Average)\n2. WA (With Average)\n3. Coverage comparison\n4. Current ICC terms\n5. 연습문제 3개' },
    { id: 50, topic: 'transport-insurance', question: 'Trade Claim의 종류와 해결방법을 설명하시오.', answer: 'Claims for quality, quantity, delay, damage. Resolution by negotiation, arbitration, litigation.', prompt: '관세사 무역영어 문제입니다.\n\n문제: Trade Claim의 종류와 해결방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Types of claims\n2. Claim documentation\n3. Negotiation\n4. Arbitration vs Litigation\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'trade-contract', name: '무역계약', count: 12 },
    { id: 'incoterms', name: 'Incoterms', count: 13 },
    { id: 'lc', name: '신용장', count: 13 },
    { id: 'transport-insurance', name: '운송보험', count: 12 },
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
            <span className="text-sky-600 font-medium">무역영어</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🌐 무역영어</h1>
          <p className="text-gray-600">관세사 1차 시험 | 40문항 | 60분</p>
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
                          <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-sky-100 text-sky-600 rounded-lg text-sm hover:bg-sky-200 transition">🤖 AI</button>
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
          <Link href="/category/accounting/customs-broker/study/customs-law" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 관세법개론</Link>
          <Link href="/category/accounting/customs-broker/study/consumption-tax" className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">다음: 내국소비세법 →</Link>
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
