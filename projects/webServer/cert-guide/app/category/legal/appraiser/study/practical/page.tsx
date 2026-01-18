'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function PracticalPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, isPaid } = useAuth();

  const questions = [
    {
      id: 1,
      question: "거래사례비교법에서 시점수정의 의미로 옳은 것은?",
      options: [
        "거래 당시의 특수한 사정을 보정하는 것",
        "거래사례와 대상물건의 지역요인을 비교하는 것",
        "거래시점과 가격시점 사이의 시간경과로 인한 가격변동을 반영하는 것",
        "거래사례와 대상물건의 개별요인을 비교하는 것"
      ],
      answer: 2,
      explanation: "시점수정은 거래시점과 기준시점(가격시점) 사이의 시간경과에 따른 가격변동을 반영하여 거래사례가격을 조정하는 것입니다."
    },
    {
      id: 2,
      question: "원가법 적용 시 재조달원가의 종류가 아닌 것은?",
      options: [
        "복성원가",
        "대체원가",
        "거래원가",
        "재생산원가"
      ],
      answer: 2,
      explanation: "재조달원가에는 복성원가(Reproduction Cost)와 대체원가(Replacement Cost)가 있습니다. 거래원가는 재조달원가가 아닙니다."
    },
    {
      id: 3,
      question: "수익환원법에서 순수익(NOI) 산정 시 공제하지 않는 항목은?",
      options: [
        "공실손실",
        "운영경비",
        "자본적 지출에 충당될 준비금",
        "감가상각비"
      ],
      answer: 3,
      explanation: "감가상각비는 비현금 비용으로 순수익(NOI) 산정 시 공제하지 않습니다. NOI는 현금주의 기준입니다."
    },
    {
      id: 4,
      question: "토지잔여법의 공식으로 옳은 것은?",
      options: [
        "토지가치 = (순수익 - 건물귀속수익) ÷ 토지환원이율",
        "토지가치 = 순수익 ÷ 토지환원이율",
        "토지가치 = (순수익 + 건물귀속수익) ÷ 토지환원이율",
        "토지가치 = 건물귀속수익 ÷ 토지환원이율"
      ],
      answer: 0,
      explanation: "토지잔여법: 토지가치 = (순수익 - 건물귀속수익) ÷ 토지환원이율. 건물귀속수익 = 건물가치 × 건물환원이율"
    },
    {
      id: 5,
      question: "감정평가에서 물건별 평가의 원칙에 대한 예외가 인정되는 경우는?",
      options: [
        "의뢰인의 요청이 있는 경우",
        "둘 이상의 물건이 일체로 거래되는 것이 합리적인 경우",
        "평가사의 판단에 따르는 경우",
        "비용 절감이 필요한 경우"
      ],
      answer: 1,
      explanation: "둘 이상의 물건이 일체로 거래되거나 일체로 사용되는 것이 합리적인 경우에는 일괄평가가 인정됩니다."
    },
    {
      id: 6,
      question: "적산임료의 산정 공식으로 옳은 것은?",
      options: [
        "적산임료 = 기초가격 × 기대이율",
        "적산임료 = 기초가격 × 기대이율 + 필요경비",
        "적산임료 = 순수익 ÷ 환원이율",
        "적산임료 = 거래사례임료 × 시점수정률"
      ],
      answer: 1,
      explanation: "적산임료 = 기초가격 × 기대이율 + 필요경비(감가상각비, 유지관리비, 보험료, 조세공과금 등)"
    },
    {
      id: 7,
      question: "감가수정의 방법이 아닌 것은?",
      options: [
        "내용연수법",
        "관찰감가법",
        "분해법",
        "환원법"
      ],
      answer: 3,
      explanation: "감가수정 방법에는 내용연수법(정액법, 정률법), 관찰감가법, 분해법(물리적·기능적·경제적 감가 분석)이 있습니다."
    },
    {
      id: 8,
      question: "DCF(할인현금흐름) 분석에서 복귀가치(Reversion)의 산정 시 사용되는 이율은?",
      options: [
        "할인율",
        "기말환원이율",
        "투자수익률",
        "자본회수율"
      ],
      answer: 1,
      explanation: "복귀가치는 보유기간 종료 시점의 순수익을 기말환원이율(Terminal Cap Rate)로 환원하여 산정합니다."
    },
    {
      id: 9,
      question: "비교방식 적용 시 사정보정의 대상이 아닌 것은?",
      options: [
        "친족 간의 거래",
        "급매물 거래",
        "시간경과에 따른 가격변동",
        "담보권이 설정된 상태의 거래"
      ],
      answer: 2,
      explanation: "시간경과에 따른 가격변동은 '시점수정'의 대상입니다. 사정보정은 특수한 거래상황을 보정하는 것입니다."
    },
    {
      id: 10,
      question: "표준지공시지가 기준법에서 적용되는 비교요인이 아닌 것은?",
      options: [
        "시점수정",
        "지역요인",
        "개별요인",
        "사정보정"
      ],
      answer: 3,
      explanation: "표준지공시지가 기준법에서는 시점수정, 지역요인, 개별요인을 비교하지만, 사정보정은 적용되지 않습니다(공시지가는 정상거래를 전제)."
    },
    {
      id: 11,
      question: "토지의 최유효이용 판정 시 고려사항이 아닌 것은?",
      options: [
        "물리적 가능성",
        "법적 허용성",
        "재정적 실행가능성",
        "과거 이용이력"
      ],
      answer: 3,
      explanation: "최유효이용 판정기준은 물리적 가능성, 법적 허용성, 재정적 실행가능성, 최대 생산성입니다."
    },
    {
      id: 12,
      question: "수익환원법에서 직접환원법의 특징은?",
      options: [
        "복수 기간의 수익을 분석",
        "단일 연도의 순수익을 환원이율로 자본환원",
        "미래 매각가치를 별도로 산정",
        "할인율을 사용하여 현재가치로 환산"
      ],
      answer: 1,
      explanation: "직접환원법은 단일 연도의 안정적 순수익을 환원이율(Cap Rate)로 나누어 부동산 가치를 산정합니다."
    },
    {
      id: 13,
      question: "건물 감정평가 시 적산가격 산정의 공식은?",
      options: [
        "적산가격 = 재조달원가",
        "적산가격 = 재조달원가 - 감가누계액",
        "적산가격 = 재조달원가 + 감가누계액",
        "적산가격 = 취득원가 - 감가누계액"
      ],
      answer: 1,
      explanation: "건물의 적산가격 = 재조달원가 - 감가누계액입니다."
    },
    {
      id: 14,
      question: "임대사례비교법에서 표준화 보정의 의미는?",
      options: [
        "임대료를 월세 기준으로 환산",
        "임대조건(임대보증금, 월세 비율 등)을 통일하는 것",
        "임대기간을 동일하게 조정",
        "임대면적을 표준면적으로 환산"
      ],
      answer: 1,
      explanation: "표준화 보정은 임대사례의 임대조건(보증금과 월세 비율 등)을 대상물건과 동일하게 조정하는 것입니다."
    },
    {
      id: 15,
      question: "기계장치 감정평가 시 경제적 감가의 요인이 아닌 것은?",
      options: [
        "산업구조의 변화",
        "환경규제 강화",
        "기술진보에 따른 진부화",
        "물리적 마모"
      ],
      answer: 3,
      explanation: "물리적 마모는 물리적 감가요인입니다. 경제적 감가는 외부 환경변화(산업구조, 규제, 수요감소 등)로 인한 감가입니다."
    },
    {
      id: 16,
      question: "보상평가에서 개발이익의 배제 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "모든 개발이익을 보상에 포함",
        "공익사업으로 인한 개발이익을 보상액 산정 시 배제",
        "과거의 개발이익만 배제",
        "개발이익은 항상 피보상자에게 귀속"
      ],
      answer: 1,
      explanation: "개발이익 배제의 원칙은 해당 공익사업 시행으로 발생하는 개발이익을 보상액에서 제외하는 것입니다."
    },
    {
      id: 17,
      question: "감정평가 3방식의 상호관계에서 대체의 원칙을 가장 직접적으로 반영하는 방식은?",
      options: [
        "원가방식",
        "비교방식",
        "수익방식",
        "모두 동일"
      ],
      answer: 1,
      explanation: "비교방식(거래사례비교법)은 시장에서 실제 거래된 유사 부동산의 가격을 기준으로 하여 대체의 원칙을 가장 직접적으로 반영합니다."
    },
    {
      id: 18,
      question: "환원이율 결정방법 중 시장추출법의 설명으로 옳은 것은?",
      options: [
        "무위험수익률에 위험할증률을 가산",
        "투자자의 요구수익률을 조사",
        "유사 부동산의 순수익과 가격으로부터 환원이율을 추출",
        "자본과 부채의 가중평균 수익률 산정"
      ],
      answer: 2,
      explanation: "시장추출법은 유사 부동산의 순수익을 가격으로 나누어 시장에서 관찰되는 환원이율을 직접 추출합니다."
    },
    {
      id: 19,
      question: "구분소유 건물의 대지권 평가 시 적용되는 방법은?",
      options: [
        "개별평가",
        "일괄평가 후 안분",
        "면적비례 배분",
        "호수 비례 배분"
      ],
      answer: 2,
      explanation: "구분소유 건물의 대지권은 통상 전유부분 면적 비율에 따라 배분하여 평가합니다."
    },
    {
      id: 20,
      question: "입체이용저해율이 적용되는 경우는?",
      options: [
        "지상권이 설정된 토지",
        "저당권이 설정된 토지",
        "임차권이 설정된 토지",
        "도로에 인접한 토지"
      ],
      answer: 0,
      explanation: "입체이용저해율은 토지의 지상 또는 지하 공간에 대한 구분지상권 등이 설정된 경우 토지가치의 감가율을 의미합니다."
    },
    {
      id: 21,
      question: "가상의 조건을 설정하여 평가하는 것을 무엇이라 하는가?",
      options: [
        "일반평가",
        "조건부평가",
        "시장가치 평가",
        "청산가치 평가"
      ],
      answer: 1,
      explanation: "조건부평가는 미완성 건물의 완공, 인허가 등 특정 조건을 전제로 평가하는 것입니다."
    },
    {
      id: 22,
      question: "노선가식 평가에서 '심도율'의 의미는?",
      options: [
        "도로와의 접면 비율",
        "토지의 세로 방향 깊이에 따른 가격 체감률",
        "토지의 면적 비율",
        "건축물의 높이 비율"
      ],
      answer: 1,
      explanation: "심도율은 노선가에서 토지의 깊이(depth)가 깊어질수록 단위면적당 가격이 체감하는 비율입니다."
    },
    {
      id: 23,
      question: "보상평가에서 현황평가의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "미래 예상 용도로 평가",
        "과거 이용 상태로 평가",
        "기준시점의 현실 이용 상태로 평가",
        "법적 허용 용도로 평가"
      ],
      answer: 2,
      explanation: "현황평가의 원칙은 기준시점 현재의 현실적인 이용 상태를 기준으로 평가하는 것입니다."
    },
    {
      id: 24,
      question: "잔여법을 적용할 수 있는 경우는?",
      options: [
        "토지만 있는 경우",
        "건물만 있는 경우",
        "토지와 건물 중 어느 하나의 가격을 알고 있는 경우",
        "토지와 건물 모두 가격을 모르는 경우"
      ],
      answer: 2,
      explanation: "잔여법은 복합부동산의 일체 가격에서 토지 또는 건물 가격을 알고 있을 때 나머지 하나의 가격을 구하는 방법입니다."
    },
    {
      id: 25,
      question: "영업권 평가에서 초과수익환원법의 적용 순서로 옳은 것은?",
      options: [
        "총수익 산정 → 정상수익 차감 → 초과수익 환원",
        "초과수익 산정 → 총자산 곱하기 → 가치 산정",
        "순이익 산정 → 정상이익 차감 → 초과이익 환원",
        "총자산 가치 산정 → 부채 차감 → 영업권 산정"
      ],
      answer: 2,
      explanation: "초과수익환원법: 실제 순이익에서 정상이익(유형자산 × 정상수익률)을 차감한 초과이익을 환원하여 영업권 가치를 산정합니다."
    },
    {
      id: 26,
      question: "산림평가에서 입목의 평가방법이 아닌 것은?",
      options: [
        "원가법",
        "비용가법",
        "수익가법",
        "환원법"
      ],
      answer: 3,
      explanation: "입목의 평가방법에는 원가법(비용가법), 수익가법, 시장비교법 등이 있습니다."
    },
    {
      id: 27,
      question: "기업가치 평가에서 사용되는 EBITDA의 의미는?",
      options: [
        "세후 순이익",
        "이자, 세금, 감가상각비 차감 전 영업이익",
        "영업활동 현금흐름",
        "주당순이익"
      ],
      answer: 1,
      explanation: "EBITDA = Earnings Before Interest, Taxes, Depreciation, and Amortization (이자, 세금, 감가상각비 차감 전 이익)"
    },
    {
      id: 28,
      question: "광업재단 평가 시 적용되는 주된 평가방식은?",
      options: [
        "원가방식",
        "비교방식",
        "수익방식",
        "시가환원방식"
      ],
      answer: 2,
      explanation: "광업재단은 광물의 채굴로 인한 미래 수익을 현재가치로 환원하는 수익방식이 주로 적용됩니다."
    },
    {
      id: 29,
      question: "도로용지의 보상평가 방법으로 옳은 것은?",
      options: [
        "실제 도로로서의 이용가치로 평가",
        "인근 토지 가격의 50%로 평가",
        "인근 유사토지를 기준으로 평가하되 용도지역을 고려",
        "공시지가 그대로 적용"
      ],
      answer: 2,
      explanation: "도로용지 보상은 인근 유사토지를 기준으로 평가하되, 도로로의 편입으로 인한 가격 변동은 배제합니다."
    },
    {
      id: 30,
      question: "일괄평가와 개별평가에서 가격합의 차이가 나는 이유는?",
      options: [
        "평가방법의 차이",
        "시너지효과 또는 마이너스효과의 발생",
        "평가시점의 차이",
        "평가사의 주관적 판단"
      ],
      answer: 1,
      explanation: "일괄평가가격과 개별평가가격 합계의 차이는 물건들의 결합으로 인한 시너지효과(또는 마이너스효과) 때문입니다."
    },
    {
      id: 31,
      question: "임대료 수정사례법의 적용 순서로 옳은 것은?",
      options: [
        "임대사례 선택 → 시점수정 → 요인비교",
        "임대사례 선택 → 표준화 보정 → 시점수정 → 요인비교",
        "시점수정 → 임대사례 선택 → 요인비교",
        "요인비교 → 시점수정 → 임대사례 선택"
      ],
      answer: 1,
      explanation: "임대사례비교법: 임대사례 선택 → 표준화 보정 → 사정보정 → 시점수정 → 지역요인 비교 → 개별요인 비교"
    },
    {
      id: 32,
      question: "부분평가에 대한 설명으로 옳은 것은?",
      options: [
        "물건의 일부분만을 평가하는 것",
        "복합부동산의 토지 또는 건물만을 구분하여 평가하는 것",
        "나대지만 평가하는 것",
        "건물만 평가하는 것"
      ],
      answer: 1,
      explanation: "부분평가는 토지와 건물의 복합부동산에서 토지 또는 건물 중 어느 하나만을 구분하여 평가하는 것입니다."
    },
    {
      id: 33,
      question: "총투자수익률(Total Rate of Return)의 구성요소가 아닌 것은?",
      options: [
        "소득수익률",
        "자본이득률",
        "부채상환률",
        "감가상각률"
      ],
      answer: 3,
      explanation: "총투자수익률 = 소득수익률(Income Yield) + 자본이득률(Capital Gain Rate). 감가상각률은 구성요소가 아닙니다."
    },
    {
      id: 34,
      question: "저당권이 설정된 부동산의 평가 시 고려사항으로 옳은 것은?",
      options: [
        "저당권 설정액을 공제하여 평가",
        "완전소유권 기준으로 평가",
        "저당권자의 권리만 평가",
        "저당권 설정비율만큼 할인"
      ],
      answer: 1,
      explanation: "감정평가는 원칙적으로 완전소유권을 기준으로 하며, 저당권 등 권리관계는 별도로 고려하거나 평가조건에 기재합니다."
    },
    {
      id: 35,
      question: "건물의 경제적 내용연수 결정 시 고려요인이 아닌 것은?",
      options: [
        "건축자재의 품질",
        "유지관리 상태",
        "건물 소유자의 재무상태",
        "외부환경의 변화"
      ],
      answer: 2,
      explanation: "경제적 내용연수는 건물 자체의 물리적 상태, 기능적 적합성, 경제적 환경 등을 고려하여 결정합니다. 소유자의 재무상태는 무관합니다."
    },
    {
      id: 36,
      question: "무형자산 평가에서 로열티공제법의 원리는?",
      options: [
        "원가에서 감가상각을 공제",
        "만약 해당 무형자산을 보유하지 않았다면 지급해야 할 로열티를 현재가치화",
        "실제 수익에서 비용을 공제",
        "시장에서 거래된 가격을 기준"
      ],
      answer: 1,
      explanation: "로열티공제법은 무형자산을 보유하지 않았을 경우 지급해야 했을 가상의 로열티를 현재가치로 환산하여 가치를 산정합니다."
    },
    {
      id: 37,
      question: "주식평가에서 PER(주가수익비율)의 의미는?",
      options: [
        "주가 ÷ 주당순자산",
        "주가 ÷ 주당순이익",
        "주가 ÷ 주당매출액",
        "주가 ÷ 주당현금흐름"
      ],
      answer: 1,
      explanation: "PER(Price Earnings Ratio) = 주가 ÷ 주당순이익(EPS). 주가가 순이익의 몇 배인지를 나타냅니다."
    },
    {
      id: 38,
      question: "건물신축단가표를 이용한 재조달원가 산정 시 적용하는 조정사항이 아닌 것은?",
      options: [
        "시점수정",
        "지역수정",
        "규모수정",
        "환원이율 조정"
      ],
      answer: 3,
      explanation: "건물신축단가표 적용 시 시점수정, 지역수정, 규모수정 등을 적용합니다. 환원이율은 수익방식에 사용됩니다."
    },
    {
      id: 39,
      question: "토지와 건물의 배분법 적용 시 고려사항으로 옳지 않은 것은?",
      options: [
        "토지와 건물의 수익 배분 비율",
        "토지와 건물의 시장가치 비율",
        "건물의 잔존 내용연수",
        "토지 소유자의 의도"
      ],
      answer: 3,
      explanation: "배분법은 복합부동산의 일체 가격을 토지와 건물에 배분하는 것으로, 소유자의 의도는 고려사항이 아닙니다."
    },
    {
      id: 40,
      question: "호텔 평가 시 주로 적용되는 평가방법은?",
      options: [
        "원가법",
        "거래사례비교법",
        "수익환원법",
        "공시지가기준법"
      ],
      answer: 2,
      explanation: "호텔은 수익 창출 목적의 부동산으로 수익환원법이 주된 평가방법으로 적용됩니다."
    },
    {
      id: 41,
      question: "재개발사업의 종후자산 평가 시 적용되는 평가기준은?",
      options: [
        "현황가격",
        "완공 후 예정가격",
        "청산가격",
        "보험가격"
      ],
      answer: 1,
      explanation: "재개발사업의 종후자산은 사업 완료 후의 예정가격을 기준으로 평가합니다."
    },
    {
      id: 42,
      question: "분양가심사에서 적용하는 적정 분양가 산정 방법으로 옳은 것은?",
      options: [
        "원가연동제 기준 분양가",
        "시장거래가격 기준 분양가",
        "택지비 + 건축비 + 적정 이윤",
        "공시지가 기준 분양가"
      ],
      answer: 2,
      explanation: "분양가상한제에서 적정 분양가 = 택지비 + 건축비 + 기타 비용 + 적정 이윤"
    },
    {
      id: 43,
      question: "보상평가에서 지장물 평가의 원칙으로 옳은 것은?",
      options: [
        "시장가치로 평가",
        "취득가격으로 평가",
        "이전비 또는 재설치비 기준",
        "원가법으로만 평가"
      ],
      answer: 2,
      explanation: "지장물(건물, 공작물 등)은 이전이 가능한 경우 이전비를, 이전이 불가능하거나 비경제적인 경우 재설치비를 기준으로 평가합니다."
    },
    {
      id: 44,
      question: "시산가액 조정 시 고려사항이 아닌 것은?",
      options: [
        "각 평가방식의 적용 적정성",
        "사용된 자료의 신뢰성",
        "대상물건의 유형과 용도",
        "의뢰인의 희망가격"
      ],
      answer: 3,
      explanation: "시산가액 조정은 각 방식의 적정성, 자료의 신뢰성, 물건 특성 등 객관적 요인을 고려합니다. 의뢰인의 희망가격은 고려대상이 아닙니다."
    },
    {
      id: 45,
      question: "공장재단 평가 시 포함되는 자산이 아닌 것은?",
      options: [
        "토지",
        "건물",
        "기계장치",
        "개인 소유 차량"
      ],
      answer: 3,
      explanation: "공장재단에는 공장용 토지, 건물, 기계장치 등 공장에 속하는 자산이 포함되며, 개인 소유 차량은 제외됩니다."
    },
    {
      id: 46,
      question: "해외 부동산 평가 시 고려해야 할 추가 요인은?",
      options: [
        "국내 금리",
        "환율 변동 위험",
        "국내 부동산 시장",
        "국내 조세"
      ],
      answer: 1,
      explanation: "해외 부동산 평가 시에는 환율 변동 위험, 국가위험(Country Risk), 현지 법규 등을 추가로 고려해야 합니다."
    },
    {
      id: 47,
      question: "농지의 보상평가 시 '인근 농지'의 선정 기준으로 옳은 것은?",
      options: [
        "동일 시·군·구 내의 모든 농지",
        "용도지역, 지목, 이용상황이 유사한 농지",
        "면적이 동일한 농지",
        "소유자가 같은 농지"
      ],
      answer: 1,
      explanation: "인근 농지는 용도지역, 지목, 이용상황, 지역특성 등이 유사한 농지를 선정합니다."
    },
    {
      id: 48,
      question: "건물의 기능적 감가의 원인이 아닌 것은?",
      options: [
        "설계 불량",
        "설비의 구식화",
        "인근지역의 환경 악화",
        "평면 배치의 비효율성"
      ],
      answer: 2,
      explanation: "인근지역의 환경 악화는 경제적(외부적) 감가 원인입니다. 기능적 감가는 건물 자체의 기능적 결함에 의합니다."
    },
    {
      id: 49,
      question: "감정평가서 작성 시 필수 기재사항이 아닌 것은?",
      options: [
        "감정평가 목적",
        "기준시점",
        "감정평가액",
        "의뢰인의 연락처"
      ],
      answer: 3,
      explanation: "감정평가서에는 목적, 기준시점, 대상물건 표시, 감정평가액, 평가조건, 평가방법 등을 기재해야 하지만, 의뢰인 연락처는 필수사항이 아닙니다."
    },
    {
      id: 50,
      question: "감정평가 윤리기준에서 금지되는 행위가 아닌 것은?",
      options: [
        "허위감정평가",
        "명의대여",
        "수수료 견적 제출",
        "이해관계인에 대한 평가"
      ],
      answer: 2,
      explanation: "수수료 견적 제출은 정상적인 영업활동입니다. 허위평가, 명의대여, 이해관계인 평가 등은 금지됩니다."
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('appraiser-practical-progress');
    if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(data.answeredQuestions || []); setScore(data.score || 0); }
  }, []);

  useEffect(() => {
    localStorage.setItem('appraiser-practical-progress', JSON.stringify({ answeredQuestions, score }));
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
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions([]); localStorage.removeItem('appraiser-practical-progress'); };
  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-emerald-100">
            <Link href="/" className="hover:text-white">홈</Link><span className="mx-2">/</span>
            <Link href="/category/real-estate" className="hover:text-white">부동산·건설</Link><span className="mx-2">/</span>
            <Link href="/category/legal/appraiser" className="hover:text-white">감정평가사</Link><span className="mx-2">/</span><span>감정평가실무</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">감정평가실무 학습</h1>
          <p className="text-emerald-100">감정평가 3방식과 물건별 평가 - 50문제</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2"><span className="text-gray-700 font-medium">학습 진행률</span><span className="text-emerald-600 font-bold">{answeredQuestions.length} / {questions.length} 문제</span></div>
              <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div></div>
              <div className="flex justify-between items-center mt-2"><span className="text-sm text-gray-500">정답률: {answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span><button onClick={resetProgress} className="text-sm text-red-500 hover:text-red-700">진행률 초기화</button></div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4"><span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">문제 {currentQuestion + 1}</span><span className="text-gray-500 text-sm">{questions[currentQuestion].id} / {questions.length}</span></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={`w-full text-left p-4 rounded-lg border-2 transition-all ${showResult ? index === questions[currentQuestion].answer ? 'border-green-500 bg-green-50 text-green-800' : index === selectedAnswer ? 'border-red-500 bg-red-50 text-red-800' : 'border-gray-200 text-gray-600' : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50'}`}><span className="font-medium mr-2">{index + 1}.</span>{option}</button>
                ))}
              </div>
              {showResult && (
                <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === questions[currentQuestion].answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center mb-2">{selectedAnswer === questions[currentQuestion].answer ? (<><svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="font-semibold text-green-800">정답입니다!</span></>) : (<><svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg><span className="font-semibold text-red-800">오답입니다</span></>)}</div>
                  <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
                </div>
              )}
              <div className="flex justify-between mt-6"><button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">← 이전</button><button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed">다음 →</button></div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-semibold text-gray-800 mb-4">문제 네비게이터</h3><div className="grid grid-cols-10 gap-2">{questions.map((_, index) => (<button key={index} onClick={() => { setCurrentQuestion(index); setSelectedAnswer(null); setShowResult(false); }} className={`w-full aspect-square rounded-lg text-sm font-medium transition-all ${currentQuestion === index ? 'bg-emerald-600 text-white' : answeredQuestions.includes(index) ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>))}</div></div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-semibold text-gray-800 mb-4">현재 점수</h3><div className="text-center"><div className="text-4xl font-bold text-emerald-600">{score}</div><div className="text-gray-500">/ {answeredQuestions.length} 문제</div></div></div>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl shadow-lg p-6 text-white"><h3 className="font-semibold mb-2">AI 학습 도우미</h3><p className="text-sm text-emerald-100 mb-4">이해가 안 되는 부분을 AI에게 질문하세요</p><button onClick={() => setShowAIModal(true)} className="w-full bg-white text-emerald-600 font-semibold py-2 rounded-lg hover:bg-emerald-50">AI에게 질문하기</button></div>
            <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-semibold text-gray-800 mb-4">다른 과목</h3><div className="space-y-2"><Link href="/category/legal/appraiser/study/appraisal-theory" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가이론</Link><Link href="/category/legal/appraiser/study/appraisal-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가법규</Link><Link href="/category/legal/appraiser/study/civil-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">민법</Link><Link href="/category/legal/appraiser/study/economics" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">경제학원론</Link><Link href="/category/legal/appraiser/study/accounting" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">회계학</Link></div></div>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-gray-800">AI 학습 도우미</h3><button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`감정평가실무 문제 ${currentQuestion + 1}번에 대해 자세히 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all"><div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟠</span></div><div><div className="font-semibold text-gray-800">Claude</div><div className="text-sm text-gray-600">Anthropic의 AI 어시스턴트</div></div></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`감정평가실무 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all"><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟢</span></div><div><div className="font-semibold text-gray-800">ChatGPT</div><div className="text-sm text-gray-600">OpenAI의 AI 어시스턴트</div></div></a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(`감정평가실무 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🔵</span></div><div><div className="font-semibold text-gray-800">Gemini</div><div className="text-sm text-gray-600">Google의 AI 어시스턴트</div></div></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
