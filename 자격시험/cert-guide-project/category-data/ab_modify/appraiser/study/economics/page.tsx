'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EconomicsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);

  const questions = [
    {
      id: 1,
      question: "수요의 법칙에 대한 설명으로 옳은 것은?",
      options: [
        "가격이 상승하면 수요량이 증가한다",
        "가격이 하락하면 수요량이 증가한다",
        "소득이 증가하면 수요량이 감소한다",
        "가격과 수요량은 무관하다"
      ],
      answer: 1,
      explanation: "수요의 법칙은 다른 조건이 일정할 때, 재화의 가격이 하락하면 수요량이 증가하고, 가격이 상승하면 수요량이 감소하는 관계를 말합니다."
    },
    {
      id: 2,
      question: "수요의 가격탄력성이 1보다 클 때 가격을 인상하면 총수입은?",
      options: [
        "증가한다",
        "감소한다",
        "변화없다",
        "알 수 없다"
      ],
      answer: 1,
      explanation: "수요의 가격탄력성이 1보다 크면(탄력적) 가격 인상 시 수요량 감소폭이 더 커서 총수입은 감소합니다."
    },
    {
      id: 3,
      question: "완전경쟁시장의 특성이 아닌 것은?",
      options: [
        "다수의 구매자와 판매자",
        "동질의 상품",
        "진입장벽 존재",
        "완전한 정보"
      ],
      answer: 2,
      explanation: "완전경쟁시장은 다수의 구매자와 판매자, 동질의 상품, 자유로운 진입과 퇴출, 완전한 정보의 특성을 가집니다."
    },
    {
      id: 4,
      question: "한계비용(MC)과 평균비용(AC)의 관계에서 옳은 것은?",
      options: [
        "MC가 AC보다 작으면 AC는 증가한다",
        "MC가 AC보다 크면 AC는 감소한다",
        "MC = AC일 때 AC는 최소이다",
        "MC와 AC는 항상 같다"
      ],
      answer: 2,
      explanation: "MC가 AC보다 작으면 AC는 감소하고, MC가 AC보다 크면 AC는 증가합니다. MC = AC인 점에서 AC는 최소가 됩니다."
    },
    {
      id: 5,
      question: "독점시장에서 이윤극대화 조건은?",
      options: [
        "P = MC",
        "MR = MC",
        "P = AC",
        "MR = AC"
      ],
      answer: 1,
      explanation: "독점기업의 이윤극대화 조건은 MR(한계수입) = MC(한계비용)입니다."
    },
    {
      id: 6,
      question: "기회비용에 대한 설명으로 옳은 것은?",
      options: [
        "명시적 비용만을 의미한다",
        "포기한 대안 중 가장 가치 있는 것의 가치",
        "과거에 지출한 비용",
        "생산에 투입된 총비용"
      ],
      answer: 1,
      explanation: "기회비용은 어떤 선택을 했을 때 포기해야 하는 대안들 중 가장 가치 있는 것의 가치를 의미합니다."
    },
    {
      id: 7,
      question: "GDP에 포함되지 않는 것은?",
      options: [
        "정부의 국방 지출",
        "기업의 투자 지출",
        "주식 거래액",
        "수출품 가치"
      ],
      answer: 2,
      explanation: "주식 거래는 금융자산의 이전일 뿐 실물 생산활동이 아니므로 GDP에 포함되지 않습니다."
    },
    {
      id: 8,
      question: "인플레이션의 효과로 옳지 않은 것은?",
      options: [
        "채무자에게 유리",
        "고정소득자에게 불리",
        "화폐가치 상승",
        "메뉴비용 발생"
      ],
      answer: 2,
      explanation: "인플레이션은 화폐가치를 하락시킵니다. 채무자에게 유리하고, 고정소득자에게 불리하며, 메뉴비용이 발생합니다."
    },
    {
      id: 9,
      question: "소비함수에서 한계소비성향(MPC)이 0.8일 때, 승수는?",
      options: [
        "2",
        "4",
        "5",
        "8"
      ],
      answer: 2,
      explanation: "승수 = 1/(1-MPC) = 1/(1-0.8) = 1/0.2 = 5"
    },
    {
      id: 10,
      question: "화폐수량설에서 통화량이 증가하면?",
      options: [
        "물가가 하락한다",
        "물가가 상승한다",
        "이자율이 상승한다",
        "실질GDP가 증가한다"
      ],
      answer: 1,
      explanation: "화폐수량설(MV=PY)에 따르면 화폐유통속도(V)와 실질GDP(Y)가 일정할 때 통화량(M) 증가는 물가(P) 상승으로 이어집니다."
    },
    {
      id: 11,
      question: "대체재 관계에 있는 재화 A의 가격이 상승하면 재화 B의 수요곡선은?",
      options: [
        "좌측으로 이동한다",
        "우측으로 이동한다",
        "이동하지 않는다",
        "형태가 변한다"
      ],
      answer: 1,
      explanation: "대체재 A의 가격이 상승하면 A의 수요가 감소하고 B의 수요가 증가하여 B의 수요곡선이 우측으로 이동합니다."
    },
    {
      id: 12,
      question: "소비자잉여에 대한 설명으로 옳은 것은?",
      options: [
        "소비자가 실제로 지불한 금액",
        "소비자의 최대 지불용의액과 실제 지불액의 차이",
        "생산자의 이윤",
        "시장가격과 생산비용의 차이"
      ],
      answer: 1,
      explanation: "소비자잉여는 소비자가 지불할 용의가 있는 최대 금액에서 실제로 지불한 가격을 뺀 차액입니다."
    },
    {
      id: 13,
      question: "규모의 경제가 발생하는 원인이 아닌 것은?",
      options: [
        "전문화",
        "대량구매에 의한 할인",
        "고정비용 분산",
        "수확체감의 법칙"
      ],
      answer: 3,
      explanation: "규모의 경제는 전문화, 대량구매 할인, 고정비용 분산 등으로 발생합니다. 수확체감의 법칙은 규모의 경제와 반대 개념입니다."
    },
    {
      id: 14,
      question: "IS곡선을 우측으로 이동시키는 요인은?",
      options: [
        "정부지출 감소",
        "조세 증가",
        "투자 증가",
        "통화량 증가"
      ],
      answer: 2,
      explanation: "투자 증가, 정부지출 증가, 조세 감소 등은 IS곡선을 우측으로 이동시킵니다."
    },
    {
      id: 15,
      question: "LM곡선을 우측으로 이동시키는 요인은?",
      options: [
        "통화량 감소",
        "통화량 증가",
        "정부지출 증가",
        "조세 감소"
      ],
      answer: 1,
      explanation: "통화량 증가는 LM곡선을 우측으로 이동시킵니다. 통화량 감소는 LM곡선을 좌측으로 이동시킵니다."
    },
    {
      id: 16,
      question: "필립스곡선이 나타내는 관계는?",
      options: [
        "물가와 실업률의 양의 관계",
        "인플레이션율과 실업률의 음의 관계",
        "이자율과 투자의 양의 관계",
        "소득과 소비의 음의 관계"
      ],
      answer: 1,
      explanation: "필립스곡선은 인플레이션율과 실업률 사이에 역(음)의 상관관계가 있음을 보여줍니다."
    },
    {
      id: 17,
      question: "외부불경제가 존재할 때 시장균형의 특성은?",
      options: [
        "사회적 최적보다 과소생산",
        "사회적 최적보다 과다생산",
        "사회적 최적과 일치",
        "생산이 이루어지지 않음"
      ],
      answer: 1,
      explanation: "외부불경제(부정적 외부효과)가 있을 때 사회적 비용이 사적 비용보다 크므로 시장은 사회적 최적보다 과다생산하게 됩니다."
    },
    {
      id: 18,
      question: "공공재의 특성으로 옳은 것은?",
      options: [
        "배제성과 경합성",
        "비배제성과 비경합성",
        "배제성과 비경합성",
        "비배제성과 경합성"
      ],
      answer: 1,
      explanation: "공공재는 비배제성(대가를 치르지 않아도 소비 가능)과 비경합성(한 사람의 소비가 다른 사람 소비를 줄이지 않음)의 특성을 가집니다."
    },
    {
      id: 19,
      question: "비교우위에 대한 설명으로 옳은 것은?",
      options: [
        "절대 생산비가 낮은 재화에 특화",
        "기회비용이 낮은 재화에 특화",
        "모든 재화를 직접 생산",
        "가장 비싼 재화에 특화"
      ],
      answer: 1,
      explanation: "비교우위론에 따르면 각국은 기회비용이 상대적으로 낮은 재화 생산에 특화하여 교역하면 양국 모두 이익을 얻습니다."
    },
    {
      id: 20,
      question: "실질이자율과 명목이자율의 관계를 나타낸 것은?",
      options: [
        "실질이자율 = 명목이자율 + 인플레이션율",
        "실질이자율 = 명목이자율 - 인플레이션율",
        "실질이자율 = 명목이자율 × 인플레이션율",
        "실질이자율 = 명목이자율 ÷ 인플레이션율"
      ],
      answer: 1,
      explanation: "피셔방정식에 의하면 실질이자율 = 명목이자율 - 인플레이션율(예상 인플레이션율)입니다."
    },
    {
      id: 21,
      question: "수요의 소득탄력성이 음수인 재화는?",
      options: [
        "정상재",
        "열등재",
        "사치재",
        "필수재"
      ],
      answer: 1,
      explanation: "소득탄력성이 음수이면 소득이 증가할 때 수요가 감소하므로 열등재입니다."
    },
    {
      id: 22,
      question: "자연실업률에 대한 설명으로 옳은 것은?",
      options: [
        "실업이 전혀 없는 상태",
        "경기적 실업이 없는 상태의 실업률",
        "마찰적 실업만 존재하는 상태",
        "최저 가능한 실업률 0%"
      ],
      answer: 1,
      explanation: "자연실업률은 경기순환적 실업이 없을 때의 실업률로, 마찰적 실업과 구조적 실업이 포함됩니다."
    },
    {
      id: 23,
      question: "무차별곡선의 특성이 아닌 것은?",
      options: [
        "원점에서 멀수록 높은 효용",
        "우하향한다",
        "서로 교차할 수 있다",
        "원점에 대해 볼록하다"
      ],
      answer: 2,
      explanation: "무차별곡선은 서로 교차하지 않습니다. 교차하면 이행성 가정에 위배됩니다."
    },
    {
      id: 24,
      question: "가격차별의 조건이 아닌 것은?",
      options: [
        "시장지배력 보유",
        "시장 분리 가능",
        "재판매 불가능",
        "완전경쟁시장"
      ],
      answer: 3,
      explanation: "가격차별은 독점력이 있어야 가능하며, 완전경쟁시장에서는 불가능합니다."
    },
    {
      id: 25,
      question: "경기순환의 국면이 아닌 것은?",
      options: [
        "확장",
        "정점",
        "균형",
        "수축"
      ],
      answer: 2,
      explanation: "경기순환은 확장(회복), 정점, 수축(후퇴), 저점의 4국면으로 구성됩니다."
    },
    {
      id: 26,
      question: "총수요곡선을 좌측으로 이동시키는 요인은?",
      options: [
        "정부지출 증가",
        "조세 감소",
        "통화량 감소",
        "수출 증가"
      ],
      answer: 2,
      explanation: "통화량 감소, 정부지출 감소, 조세 증가, 수출 감소 등은 총수요곡선을 좌측으로 이동시킵니다."
    },
    {
      id: 27,
      question: "한계효용체감의 법칙에 대한 설명으로 옳은 것은?",
      options: [
        "총효용이 계속 증가한다",
        "소비량이 증가할수록 추가 단위당 효용이 감소한다",
        "가격이 상승할수록 효용이 증가한다",
        "소비량과 효용은 무관하다"
      ],
      answer: 1,
      explanation: "한계효용체감의 법칙은 다른 조건이 일정할 때, 재화의 소비량이 증가할수록 추가적인 한 단위 소비로 얻는 효용이 감소함을 의미합니다."
    },
    {
      id: 28,
      question: "생산가능곡선이 원점에 대해 오목한 이유는?",
      options: [
        "규모의 경제",
        "기회비용 체증",
        "기회비용 체감",
        "규모의 비경제"
      ],
      answer: 1,
      explanation: "생산가능곡선이 원점에 대해 오목한 것은 한 재화 생산 증가 시 기회비용이 체증하기 때문입니다."
    },
    {
      id: 29,
      question: "과점시장의 특성으로 옳은 것은?",
      options: [
        "다수의 판매자",
        "동질의 상품만 존재",
        "기업 간 상호의존성",
        "자유로운 진입"
      ],
      answer: 2,
      explanation: "과점시장은 소수의 기업이 시장을 지배하며, 기업 간 상호의존성이 높아 한 기업의 행동이 다른 기업에 영향을 미칩니다."
    },
    {
      id: 30,
      question: "총공급곡선이 수직선인 경우는?",
      options: [
        "단기",
        "장기",
        "불황기",
        "호황기"
      ],
      answer: 1,
      explanation: "장기적으로 가격과 임금이 신축적으로 조정되어 경제가 완전고용 수준에 있으므로 총공급곡선은 수직선이 됩니다."
    },
    {
      id: 31,
      question: "통화승수에 영향을 미치는 요인이 아닌 것은?",
      options: [
        "법정지급준비율",
        "현금보유비율",
        "초과지급준비율",
        "정부지출"
      ],
      answer: 3,
      explanation: "통화승수는 법정지급준비율, 현금보유비율, 초과지급준비율에 영향을 받습니다. 정부지출은 직접적인 영향 요인이 아닙니다."
    },
    {
      id: 32,
      question: "게임이론에서 내쉬균형의 의미는?",
      options: [
        "모든 참가자가 최대 이익을 얻는 상태",
        "각 참가자가 상대방의 전략이 주어졌을 때 자신의 전략을 바꿀 유인이 없는 상태",
        "모든 참가자가 협력하는 상태",
        "한 참가자만 이익을 얻는 상태"
      ],
      answer: 1,
      explanation: "내쉬균형은 다른 참가자들의 전략이 주어졌을 때, 어느 누구도 자신의 전략을 바꿀 유인이 없는 상태입니다."
    },
    {
      id: 33,
      question: "케인즈의 유동성선호이론에서 화폐수요의 동기가 아닌 것은?",
      options: [
        "거래적 동기",
        "예비적 동기",
        "투기적 동기",
        "생산적 동기"
      ],
      answer: 3,
      explanation: "케인즈는 화폐수요의 동기로 거래적 동기, 예비적 동기, 투기적 동기를 제시했습니다."
    },
    {
      id: 34,
      question: "완전경쟁시장에서 장기균형 시 기업의 특징은?",
      options: [
        "초과이윤 존재",
        "정상이윤만 획득",
        "손실 발생",
        "시장 퇴출"
      ],
      answer: 1,
      explanation: "완전경쟁시장의 장기균형에서 기업은 정상이윤(경제적 이윤 0)만 획득합니다."
    },
    {
      id: 35,
      question: "국제수지에서 경상수지에 포함되지 않는 것은?",
      options: [
        "상품수지",
        "서비스수지",
        "본원소득수지",
        "금융계정"
      ],
      answer: 3,
      explanation: "경상수지는 상품수지, 서비스수지, 본원소득수지, 이전소득수지로 구성됩니다. 금융계정은 별도입니다."
    },
    {
      id: 36,
      question: "조세의 전가에 대한 설명으로 옳은 것은?",
      options: [
        "수요가 완전 비탄력적이면 공급자에게 전가",
        "공급이 완전 탄력적이면 소비자에게 전가",
        "수요와 공급 탄력성이 같으면 양측에 균등 부담",
        "조세는 항상 소비자만 부담"
      ],
      answer: 2,
      explanation: "조세 부담은 수요와 공급의 상대적 탄력성에 따라 결정됩니다. 탄력성이 낮은 쪽이 더 많은 부담을 지게 됩니다."
    },
    {
      id: 37,
      question: "역선택의 예로 옳은 것은?",
      options: [
        "보험 가입 후 부주의해지는 행동",
        "건강하지 않은 사람이 보험에 더 많이 가입",
        "근로자가 더 열심히 일하는 것",
        "소비자가 저가품을 선호하는 것"
      ],
      answer: 1,
      explanation: "역선택은 거래 전 정보비대칭으로 인해 바람직하지 않은 상대방과 거래가 이루어지는 현상입니다. 건강하지 않은 사람이 보험에 더 가입하려는 것이 예입니다."
    },
    {
      id: 38,
      question: "소득효과와 대체효과에 대한 설명으로 옳은 것은?",
      options: [
        "정상재의 경우 두 효과가 같은 방향",
        "열등재의 경우 두 효과가 같은 방향",
        "기펜재의 경우 대체효과가 소득효과보다 큼",
        "소득효과는 항상 양수"
      ],
      answer: 0,
      explanation: "정상재의 경우 가격 하락 시 소득효과와 대체효과가 모두 수요량 증가 방향으로 작용합니다."
    },
    {
      id: 39,
      question: "이자율이 상승할 때 채권가격은?",
      options: [
        "상승한다",
        "하락한다",
        "변화 없다",
        "알 수 없다"
      ],
      answer: 1,
      explanation: "이자율과 채권가격은 역의 관계입니다. 이자율이 상승하면 채권가격은 하락합니다."
    },
    {
      id: 40,
      question: "파레토 효율적 상태에 대한 설명으로 옳은 것은?",
      options: [
        "모든 사람이 만족하는 상태",
        "누군가를 더 좋게 하려면 다른 누군가를 나쁘게 해야 하는 상태",
        "사회 전체의 후생이 최대인 상태",
        "평등한 분배가 이루어진 상태"
      ],
      answer: 1,
      explanation: "파레토 효율은 어떤 사람도 더 나쁘게 하지 않으면서 누군가를 더 좋게 할 수 없는 상태입니다."
    },
    {
      id: 41,
      question: "환율 상승(원화 약세)의 효과로 옳은 것은?",
      options: [
        "수출 감소",
        "수입 증가",
        "순수출 증가",
        "외채 부담 감소"
      ],
      answer: 2,
      explanation: "환율 상승(원화 약세)은 수출품의 외화 표시 가격을 낮추어 수출을 증가시키고, 수입품 가격을 높여 수입을 감소시켜 순수출이 증가합니다."
    },
    {
      id: 42,
      question: "잠재GDP에 대한 설명으로 옳은 것은?",
      options: [
        "역사상 최대 GDP",
        "완전고용 수준에서 달성할 수 있는 GDP",
        "수출만으로 달성하는 GDP",
        "정부지출이 없을 때의 GDP"
      ],
      answer: 1,
      explanation: "잠재GDP는 경제가 완전고용 상태에서 정상적인 가동률로 달성할 수 있는 GDP 수준입니다."
    },
    {
      id: 43,
      question: "코즈 정리에 대한 설명으로 옳은 것은?",
      options: [
        "정부 개입이 항상 필요하다",
        "거래비용이 0이면 재산권 배분과 무관하게 효율적 결과 달성",
        "외부효과는 시장에서 해결 불가능",
        "조세가 유일한 해결책"
      ],
      answer: 1,
      explanation: "코즈 정리는 거래비용이 없고 재산권이 명확히 설정되면, 외부효과 문제가 당사자 간 협상으로 효율적으로 해결될 수 있다고 주장합니다."
    },
    {
      id: 44,
      question: "총수요-총공급 모형에서 스태그플레이션의 원인은?",
      options: [
        "총수요 증가",
        "총공급 감소",
        "총수요 감소",
        "총공급 증가"
      ],
      answer: 1,
      explanation: "스태그플레이션(경기침체+물가상승)은 주로 총공급 감소(비용 상승 충격)에 의해 발생합니다."
    },
    {
      id: 45,
      question: "수요독점시장에서의 착취에 해당하는 것은?",
      options: [
        "P > MR",
        "W < VMP(한계생산물가치)",
        "MC > AC",
        "P = MC"
      ],
      answer: 1,
      explanation: "수요독점(노동시장에서 고용주가 1인인 경우)에서 임금(W)이 한계생산물가치(VMP)보다 낮게 지불되는 것을 착취라고 합니다."
    },
    {
      id: 46,
      question: "리카도 대등정리에 대한 설명으로 옳은 것은?",
      options: [
        "재정정책이 항상 효과적이다",
        "조세와 국채 발행이 동등한 효과를 가진다",
        "통화정책이 재정정책보다 효과적이다",
        "정부지출이 민간투자를 증가시킨다"
      ],
      answer: 1,
      explanation: "리카도 대등정리는 합리적 소비자가 미래 조세 증가를 예상하여 현재 소비를 줄이므로, 정부가 조세로 재원을 조달하든 국채로 조달하든 경제적 효과가 동일하다는 이론입니다."
    },
    {
      id: 47,
      question: "자연독점의 특징으로 옳은 것은?",
      options: [
        "규모의 불경제",
        "평균비용이 지속적으로 감소",
        "다수의 기업이 효율적",
        "진입장벽이 없음"
      ],
      answer: 1,
      explanation: "자연독점은 평균비용이 지속적으로 감소하여 한 기업이 생산하는 것이 가장 효율적인 산업입니다."
    },
    {
      id: 48,
      question: "지니계수에 대한 설명으로 옳은 것은?",
      options: [
        "0에 가까울수록 불평등",
        "1에 가까울수록 평등",
        "0이면 완전 평등",
        "항상 1보다 크다"
      ],
      answer: 2,
      explanation: "지니계수는 0에서 1 사이의 값을 가지며, 0에 가까울수록 평등하고 1에 가까울수록 불평등합니다."
    },
    {
      id: 49,
      question: "헥셔-올린 정리의 내용으로 옳은 것은?",
      options: [
        "기술 격차가 무역 패턴을 결정",
        "각국은 풍부한 생산요소를 집약적으로 사용하는 재화를 수출",
        "규모의 경제가 무역의 원인",
        "소비자 선호가 무역 패턴을 결정"
      ],
      answer: 1,
      explanation: "헥셔-올린 정리는 각국은 상대적으로 풍부한 생산요소를 집약적으로 사용하는 재화에 비교우위가 있어 이를 수출한다고 설명합니다."
    },
    {
      id: 50,
      question: "유동성함정에서 통화정책의 효과는?",
      options: [
        "매우 효과적",
        "무력화됨",
        "재정정책보다 효과적",
        "물가만 상승"
      ],
      answer: 1,
      explanation: "유동성함정은 이자율이 매우 낮아 화폐수요가 완전 탄력적이 되어 통화량 증가가 이자율 하락으로 이어지지 않아 통화정책이 무력화됩니다."
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('appraiser-economics-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appraiser-economics-progress', JSON.stringify({ answeredQuestions, score }));
  }, [answeredQuestions, score]);

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(optionIndex);
    setShowResult(true);
    if (optionIndex === questions[currentQuestion].answer) setScore(prev => prev + 1);
    if (!answeredQuestions.includes(currentQuestion)) setAnsweredQuestions(prev => [...prev, currentQuestion]);
  };

  const nextQuestion = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(prev => prev + 1); setSelectedAnswer(null); setShowResult(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(prev => prev - 1); setSelectedAnswer(null); setShowResult(false); } };
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions([]); localStorage.removeItem('appraiser-economics-progress'); };
  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-emerald-100">
            <Link href="/" className="hover:text-white">홈</Link><span className="mx-2">/</span>
            <Link href="/category/real-estate" className="hover:text-white">부동산·건설</Link><span className="mx-2">/</span>
            <Link href="/category/real-estate/appraiser" className="hover:text-white">감정평가사</Link><span className="mx-2">/</span><span>경제학원론</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">경제학원론 학습</h1>
          <p className="text-emerald-100">미시경제학 및 거시경제학 기초 - 50문제</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">학습 진행률</span>
                <span className="text-emerald-600 font-bold">{answeredQuestions.length} / {questions.length} 문제</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">정답률: {answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span>
                <button onClick={resetProgress} className="text-sm text-red-500 hover:text-red-700">진행률 초기화</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">문제 {currentQuestion + 1}</span>
                <span className="text-gray-500 text-sm">{questions[currentQuestion].id} / {questions.length}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition-all ${showResult ? index === questions[currentQuestion].answer ? 'border-green-500 bg-green-50 text-green-800' : index === selectedAnswer ? 'border-red-500 bg-red-50 text-red-800' : 'border-gray-200 text-gray-600' : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50'}`}>
                    <span className="font-medium mr-2">{index + 1}.</span>{option}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === questions[currentQuestion].answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center mb-2">
                    {selectedAnswer === questions[currentQuestion].answer ? (<><svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="font-semibold text-green-800">정답입니다!</span></>) : (<><svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg><span className="font-semibold text-red-800">오답입니다</span></>)}
                  </div>
                  <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">← 이전</button>
                <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed">다음 →</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">문제 네비게이터</h3>
              <div className="grid grid-cols-10 gap-2">
                {questions.map((_, index) => (<button key={index} onClick={() => { setCurrentQuestion(index); setSelectedAnswer(null); setShowResult(false); }} className={`w-full aspect-square rounded-lg text-sm font-medium transition-all ${currentQuestion === index ? 'bg-emerald-600 text-white' : answeredQuestions.includes(index) ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-semibold text-gray-800 mb-4">현재 점수</h3><div className="text-center"><div className="text-4xl font-bold text-emerald-600">{score}</div><div className="text-gray-500">/ {answeredQuestions.length} 문제</div></div></div>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl shadow-lg p-6 text-white"><h3 className="font-semibold mb-2">AI 학습 도우미</h3><p className="text-sm text-emerald-100 mb-4">이해가 안 되는 부분을 AI에게 질문하세요</p><button onClick={() => setShowAIModal(true)} className="w-full bg-white text-emerald-600 font-semibold py-2 rounded-lg hover:bg-emerald-50">AI에게 질문하기</button></div>
            <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-semibold text-gray-800 mb-4">다른 과목</h3><div className="space-y-2"><Link href="/category/real-estate/appraiser/study/appraisal-theory" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가이론</Link><Link href="/category/real-estate/appraiser/study/appraisal-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가법규</Link><Link href="/category/real-estate/appraiser/study/civil-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">민법</Link><Link href="/category/real-estate/appraiser/study/accounting" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">회계학</Link><Link href="/category/real-estate/appraiser/study/practical" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가실무</Link></div></div>
          </div>
        </div>
      </div>

      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-gray-800">AI 학습 도우미</h3><button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`경제학원론 문제 ${currentQuestion + 1}번에 대해 자세히 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all"><div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟠</span></div><div><div className="font-semibold text-gray-800">Claude</div><div className="text-sm text-gray-600">Anthropic의 AI 어시스턴트</div></div></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`경제학원론 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all"><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟢</span></div><div><div className="font-semibold text-gray-800">ChatGPT</div><div className="text-sm text-gray-600">OpenAI의 AI 어시스턴트</div></div></a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(`경제학원론 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🔵</span></div><div><div className="font-semibold text-gray-800">Gemini</div><div className="text-sm text-gray-600">Google의 AI 어시스턴트</div></div></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
