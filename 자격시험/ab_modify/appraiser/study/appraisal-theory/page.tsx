'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AppraisalTheoryPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);

  const questions = [
    {
      id: 1,
      question: "감정평가의 목적 중 '시장가치'에 대한 설명으로 옳은 것은?",
      options: [
        "특정 매수인에게 특별한 가치가 있는 주관적 가치",
        "합리적인 판단력과 거래 지식이 있는 당사자 간의 거래에서 성립될 가능성이 가장 높은 가격",
        "강제매각 시 예상되는 가격",
        "원가에 적정 이윤을 더한 가격"
      ],
      answer: 1,
      explanation: "시장가치는 통상적인 시장에서 합리적인 판단력을 가진 매도인과 매수인 간에 성립될 가능성이 가장 높은 최적의 가격을 말합니다."
    },
    {
      id: 2,
      question: "가격제원칙 중 '최유효이용의 원칙'에 대한 설명으로 옳은 것은?",
      options: [
        "부동산의 현재 이용 상태가 가장 적합하다는 원칙",
        "물리적, 법적, 재정적으로 가능한 이용 중 가장 수익성이 높은 이용",
        "가장 비용이 적게 드는 이용 방법",
        "사회적으로 가장 바람직한 이용"
      ],
      answer: 1,
      explanation: "최유효이용은 합리적이고 합법적인 사용 중 물리적으로 가능하고, 적정하게 뒷받침되며, 재정적으로 실행 가능하고, 최고의 가치를 창출하는 사용을 말합니다."
    },
    {
      id: 3,
      question: "감정평가 3방식에 해당하지 않는 것은?",
      options: [
        "원가방식",
        "비교방식",
        "수익방식",
        "거래방식"
      ],
      answer: 3,
      explanation: "감정평가 3방식은 원가방식(Cost Approach), 비교방식(Sales Comparison Approach), 수익방식(Income Approach)입니다."
    },
    {
      id: 4,
      question: "수익환원법에서 사용되는 환원이율의 결정방법이 아닌 것은?",
      options: [
        "시장추출법",
        "조성법",
        "투자결합법",
        "상각환원법"
      ],
      answer: 3,
      explanation: "환원이율 결정방법에는 시장추출법, 조성법(적산법), 투자결합법(밴드오브인베스트먼트법), 엘우드법 등이 있습니다. 상각환원법은 존재하지 않습니다."
    },
    {
      id: 5,
      question: "원가법에서 감가수정의 방법이 아닌 것은?",
      options: [
        "내용연수법",
        "관찰감가법",
        "분해법",
        "환원법"
      ],
      answer: 3,
      explanation: "감가수정 방법에는 내용연수법(정액법, 정률법), 관찰감가법, 분해법(물리적, 기능적, 경제적 감가) 등이 있습니다."
    },
    {
      id: 6,
      question: "지대이론 중 리카도의 차액지대론의 핵심 내용은?",
      options: [
        "지대는 토지의 위치에 따라 결정된다",
        "지대는 토지의 비옥도 차이에서 발생한다",
        "지대는 도심으로부터의 거리에 비례한다",
        "지대는 토지 개량비용에 의해 결정된다"
      ],
      answer: 1,
      explanation: "리카도의 차액지대론은 토지의 비옥도(생산성) 차이에서 지대가 발생한다고 설명합니다. 가장 척박한 한계지는 지대가 0이고, 비옥할수록 높은 지대가 형성됩니다."
    },
    {
      id: 7,
      question: "부동산 가격의 특성 중 '개별성'에 대한 설명으로 옳은 것은?",
      options: [
        "부동산 가격이 지역 경제에 영향을 미치는 특성",
        "동일한 부동산은 존재하지 않아 각각 고유한 가격이 형성되는 특성",
        "부동산 가격이 시간에 따라 변동하는 특성",
        "부동산 가격이 주변 부동산에 영향을 미치는 특성"
      ],
      answer: 1,
      explanation: "부동산의 개별성(비동질성)은 위치, 면적, 형상, 환경 등이 모두 다르므로 동일한 부동산이 존재하지 않아 각각 고유한 가격이 형성된다는 특성입니다."
    },
    {
      id: 8,
      question: "거래사례비교법에서 사정보정의 대상이 아닌 것은?",
      options: [
        "급매물",
        "친족 간 거래",
        "시점 수정",
        "담보권 설정 상태의 매매"
      ],
      answer: 2,
      explanation: "사정보정은 정상거래가 아닌 특수한 사정이 있는 거래를 보정하는 것으로, 급매, 친족거래, 담보거래 등이 대상입니다. 시점수정은 별도의 절차입니다."
    },
    {
      id: 9,
      question: "토지잔여법에 대한 설명으로 옳은 것은?",
      options: [
        "순수익에서 건물 귀속 수익을 공제하여 토지가치를 산정",
        "토지와 건물 가치를 합산하여 총수익을 산정",
        "토지 가격에서 건물 가격을 차감",
        "건물 수익에서 토지 수익을 차감"
      ],
      answer: 0,
      explanation: "토지잔여법은 부동산 전체 순수익에서 건물에 귀속되는 수익을 공제한 잔여수익을 토지 환원이율로 환원하여 토지가치를 구하는 방법입니다."
    },
    {
      id: 10,
      question: "감정평가에서 '기준시점'의 의미로 옳은 것은?",
      options: [
        "감정평가서 작성일",
        "대상물건의 가격을 판정하는 기준이 되는 날짜",
        "현장조사 완료일",
        "감정평가 의뢰일"
      ],
      answer: 1,
      explanation: "기준시점은 감정평가액을 결정하는 기준이 되는 날짜로, 가격시점이라고도 합니다. 통상 현장조사일 또는 의뢰인이 지정한 날짜가 됩니다."
    },
    {
      id: 11,
      question: "균형의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "부동산의 가격은 수요와 공급의 균형점에서 결정된다",
        "부동산의 구성요소들이 적절한 비율로 조합될 때 최대의 효용이 발생한다",
        "부동산 가격은 항상 평균 가격으로 수렴한다",
        "지역 내 부동산 가격은 균형을 이룬다"
      ],
      answer: 1,
      explanation: "균형의 원칙은 부동산을 구성하는 각 요소(토지, 건물, 노동, 자본)가 적정한 비율로 조합될 때 최대의 효용이 발생하고 최고의 가치가 형성된다는 원칙입니다."
    },
    {
      id: 12,
      question: "적합의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "부동산이 법규에 적합해야 한다",
        "부동산이 주변 환경과 조화를 이룰 때 최고의 가치가 형성된다",
        "평가 방법이 대상 물건에 적합해야 한다",
        "거래사례가 대상 물건에 적합해야 한다"
      ],
      answer: 1,
      explanation: "적합의 원칙은 부동산이 그 주변 환경과 적절히 조화를 이룰 때 최고의 가치가 실현된다는 원칙입니다. 과대개발이나 과소개발은 가치 손실을 초래합니다."
    },
    {
      id: 13,
      question: "수익환원법에서 직접환원법과 할인현금흐름법의 차이점은?",
      options: [
        "직접환원법은 단일 기간, DCF는 복수 기간의 수익을 고려",
        "직접환원법은 건물만, DCF는 토지도 고려",
        "직접환원법은 상업용, DCF는 주거용에 적용",
        "직접환원법은 과거 수익, DCF는 현재 수익을 고려"
      ],
      answer: 0,
      explanation: "직접환원법은 단일 연도의 순수익을 환원이율로 환원하고, 할인현금흐름법(DCF)은 보유기간 전체의 미래 현금흐름과 복귀가치를 할인율로 할인합니다."
    },
    {
      id: 14,
      question: "기여의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "각 구성요소의 가치는 전체 가치에 대한 기여도로 측정된다",
        "개량비용과 가치증가분은 항상 일치한다",
        "토지와 건물의 기여도는 항상 동일하다",
        "위치가 가치에 기여하는 비율은 고정되어 있다"
      ],
      answer: 0,
      explanation: "기여의 원칙은 부동산의 특정 구성요소가 전체 가치에 기여하는 정도로 그 요소의 가치가 결정된다는 원칙입니다. 개량비용과 가치증가분은 다를 수 있습니다."
    },
    {
      id: 15,
      question: "감정평가서에 반드시 기재해야 할 사항이 아닌 것은?",
      options: [
        "감정평가 목적",
        "기준시점",
        "대상물건의 미래 예상가격",
        "평가조건"
      ],
      answer: 2,
      explanation: "감정평가서에는 감정평가 목적, 기준시점, 대상물건의 표시, 감정평가액, 평가조건 등을 기재해야 합니다. 미래 예상가격은 필수 기재사항이 아닙니다."
    },
    {
      id: 16,
      question: "폰튀넨의 고립국 이론에서 지대를 결정하는 핵심 요소는?",
      options: [
        "토지의 비옥도",
        "도심으로부터의 거리(수송비)",
        "토지의 면적",
        "인구 밀도"
      ],
      answer: 1,
      explanation: "폰튀넨의 고립국 이론은 도심(시장)으로부터의 거리와 수송비에 따라 지대가 결정되며, 거리가 멀어질수록 수송비가 증가하여 지대가 감소한다고 설명합니다."
    },
    {
      id: 17,
      question: "예상의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "부동산 가격은 과거 가격을 기준으로 결정된다",
        "부동산 가격은 미래에 기대되는 편익의 현재가치로 결정된다",
        "부동산 가격은 현재의 수익만을 반영한다",
        "부동산 가격 예측은 불가능하다"
      ],
      answer: 1,
      explanation: "예상(기대)의 원칙은 부동산 가격이 미래에 얻을 것으로 기대되는 효용이나 편익의 현재가치로 형성된다는 원칙입니다."
    },
    {
      id: 18,
      question: "감정평가에서 '시장성 감가'의 원인이 아닌 것은?",
      options: [
        "과잉 공급으로 인한 수요 부족",
        "건물의 물리적 노후화",
        "용도지역 변경으로 인한 규제",
        "경기 침체로 인한 거래 부진"
      ],
      answer: 1,
      explanation: "시장성 감가(외부적 감가)는 시장상황, 규제 변경, 환경 악화 등 외부요인에 의한 감가입니다. 물리적 노후화는 물리적 감가에 해당합니다."
    },
    {
      id: 19,
      question: "임대료 산정 시 적산법의 기초가 되는 것은?",
      options: [
        "순수익",
        "기초가격",
        "거래사례",
        "원가"
      ],
      answer: 1,
      explanation: "적산법은 기초가격(대상 부동산의 가격)에 기대이율을 곱하고 필요경비를 더하여 임료를 산정합니다. 적산임료 = 기초가격 × 기대이율 + 필요경비"
    },
    {
      id: 20,
      question: "변동의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "부동산 가격은 일정하게 유지된다",
        "부동산 가격은 사회적, 경제적, 행정적 요인에 의해 끊임없이 변화한다",
        "부동산 가격 변동은 예측 가능하다",
        "부동산 가격은 계절에 따라 주기적으로 변동한다"
      ],
      answer: 1,
      explanation: "변동의 원칙은 부동산 가격이 사회적, 경제적, 행정적 요인의 변화에 따라 끊임없이 변동한다는 원칙입니다. 따라서 감정평가 시 기준시점 설정이 중요합니다."
    },
    {
      id: 21,
      question: "대체의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "오래된 건물은 새 건물로 대체되어야 한다",
        "동일한 효용을 가진 대체재가 있으면 합리적 수요자는 낮은 가격을 선택한다",
        "토지는 건물로 대체될 수 있다",
        "평가 방법은 상호 대체될 수 있다"
      ],
      answer: 1,
      explanation: "대체의 원칙은 합리적 수요자는 동일한 효용을 제공하는 대체재 중 가장 낮은 가격의 것을 선택한다는 원칙으로, 감정평가 3방식의 이론적 기초가 됩니다."
    },
    {
      id: 22,
      question: "감정평가에서 '한정가격'에 대한 설명으로 옳은 것은?",
      options: [
        "시장에서 통상적으로 형성되는 가격",
        "특정 조건하에서 성립하는 시장가치 이외의 가격",
        "법원에서 결정하는 가격",
        "원가에 기초한 가격"
      ],
      answer: 1,
      explanation: "한정가격은 시장성을 전제로 하되 특수한 조건(인접토지 합병, 분할 등)에서 성립하는 시장가치와 다른 가격을 말합니다."
    },
    {
      id: 23,
      question: "원가법 적용 시 재조달원가를 산정하는 방법이 아닌 것은?",
      options: [
        "직접법",
        "간접법",
        "복합법",
        "환원법"
      ],
      answer: 3,
      explanation: "재조달원가 산정방법에는 직접법(수량조사법), 간접법(지수조정법, 유사건물 기준법), 복합법 등이 있습니다."
    },
    {
      id: 24,
      question: "DCF법에서 복귀가치(Reversion Value)의 의미는?",
      options: [
        "초기 투자금액",
        "보유기간 종료 시점의 매각예상가격",
        "연간 순수익",
        "투자수익률"
      ],
      answer: 1,
      explanation: "복귀가치는 투자 보유기간 종료 시점에 부동산을 매각할 때 예상되는 가격(잔존가치)으로, DCF 분석에서 할인하여 현재가치를 구합니다."
    },
    {
      id: 25,
      question: "감정평가 절차의 올바른 순서는?",
      options: [
        "기본사항 확정 → 처리계획 수립 → 자료수집 → 가치형성요인 분석 → 평가방법 선정 → 시산가액 조정",
        "자료수집 → 기본사항 확정 → 처리계획 수립 → 평가방법 선정 → 가치형성요인 분석",
        "처리계획 수립 → 기본사항 확정 → 자료수집 → 시산가액 조정 → 평가방법 선정",
        "평가방법 선정 → 기본사항 확정 → 자료수집 → 처리계획 수립 → 시산가액 조정"
      ],
      answer: 0,
      explanation: "감정평가 절차: 기본사항 확정 → 처리계획 수립 → 대상물건 확인 → 자료수집 및 정리 → 자료검토 및 가치형성요인 분석 → 평가방법 선정·적용 → 시산가액 조정 → 감정평가액 결정"
    },
    {
      id: 26,
      question: "경쟁의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "부동산 시장은 완전경쟁 시장이다",
        "초과이윤이 발생하면 경쟁이 유발되어 이윤이 정상수준으로 회귀한다",
        "부동산 가격은 경쟁을 통해 항상 하락한다",
        "경쟁이 없으면 부동산 가격이 형성되지 않는다"
      ],
      answer: 1,
      explanation: "경쟁의 원칙은 초과이윤이 발생하면 시장 참여자들의 경쟁이 유발되어 결국 이윤이 정상수준으로 회귀한다는 원칙입니다."
    },
    {
      id: 27,
      question: "수익방식에서 총수익승수(GIM)의 의미는?",
      options: [
        "순수익을 환원이율로 나눈 값",
        "매매가격을 연간 총소득으로 나눈 값",
        "연간 순수익을 매매가격으로 나눈 값",
        "연간 총소득을 운영경비로 나눈 값"
      ],
      answer: 1,
      explanation: "총수익승수(GIM: Gross Income Multiplier) = 매매가격 ÷ 연간 총소득. 부동산 가치를 총소득의 배수로 나타내는 간편한 평가지표입니다."
    },
    {
      id: 28,
      question: "기능적 감가의 원인이 아닌 것은?",
      options: [
        "구조나 설계의 불량",
        "설비의 노후화",
        "인근지역의 쇠퇴",
        "평면 배치의 비효율성"
      ],
      answer: 2,
      explanation: "기능적 감가는 건물 자체의 기능적 결함(설계 불량, 설비 노후화, 평면 비효율)에 의한 감가입니다. 인근지역 쇠퇴는 경제적(외부적) 감가 원인입니다."
    },
    {
      id: 29,
      question: "부동산 가격의 지역요인이 아닌 것은?",
      options: [
        "지역의 상업 활동 수준",
        "교통 접근성",
        "건물의 구조와 재료",
        "환경 오염 정도"
      ],
      answer: 2,
      explanation: "지역요인은 인근지역의 특성으로 교통, 상업활동, 환경 등이 해당됩니다. 건물의 구조와 재료는 개별요인에 해당합니다."
    },
    {
      id: 30,
      question: "외부성의 원칙에 대한 설명으로 옳은 것은?",
      options: [
        "부동산 가격은 내부 요인에 의해서만 결정된다",
        "부동산 가격은 외부 환경요인에 의해 영향을 받는다",
        "외부 투자자만 부동산 가격에 영향을 준다",
        "외국 자본만이 부동산 가격에 영향을 미친다"
      ],
      answer: 1,
      explanation: "외부성의 원칙은 부동산 가격이 그 부동산 자체뿐만 아니라 주변 환경, 인근지역 특성, 거시경제 상황 등 외부요인에 의해 영향을 받는다는 원칙입니다."
    },
    {
      id: 31,
      question: "거래사례비교법에서 시점수정에 사용되는 지수가 아닌 것은?",
      options: [
        "지가변동률",
        "부동산 가격지수",
        "소비자물가지수",
        "실업률"
      ],
      answer: 3,
      explanation: "시점수정에는 지가변동률, 부동산 가격지수, 물가지수, 건축비지수 등이 사용됩니다. 실업률은 경제지표이지만 시점수정에 직접 사용되지는 않습니다."
    },
    {
      id: 32,
      question: "감정평가에서 '특정가격'에 대한 설명으로 옳은 것은?",
      options: [
        "일반적인 시장거래에서 형성되는 가격",
        "법령에 의해 특별히 규정된 조건을 충족하는 가격",
        "특정 지역에서만 적용되는 가격",
        "특정 시점에만 유효한 가격"
      ],
      answer: 1,
      explanation: "특정가격은 법령 등에 의한 사회적·공익적 요청에 따라 시장가치와 다르게 평가해야 하는 경우에 적용되는 가격입니다."
    },
    {
      id: 33,
      question: "수익환원법에서 순수익(NOI) 산정 시 공제하지 않는 항목은?",
      options: [
        "운영경비",
        "공실손실",
        "원리금상환액",
        "관리비"
      ],
      answer: 2,
      explanation: "순영업소득(NOI) = 유효총소득 - 운영경비. 원리금상환액은 금융비용으로 NOI 산정 시 공제하지 않습니다. 세전현금흐름에서 공제합니다."
    },
    {
      id: 34,
      question: "마샬(Marshall)의 지대론에서 제시한 개념은?",
      options: [
        "차액지대",
        "위치지대",
        "준지대",
        "절대지대"
      ],
      answer: 2,
      explanation: "마샬은 단기적으로 공급이 고정된 생산요소(건물, 기계 등)에서 발생하는 잉여를 '준지대(Quasi-rent)'라고 명명했습니다."
    },
    {
      id: 35,
      question: "감정평가에서 '일반적 요인'에 해당하지 않는 것은?",
      options: [
        "금리 변동",
        "인구 변화",
        "조세 정책",
        "토지의 형상"
      ],
      answer: 3,
      explanation: "일반적 요인은 전반적인 가격수준에 영향을 미치는 사회적·경제적·행정적 요인입니다. 토지의 형상은 개별요인에 해당합니다."
    },
    {
      id: 36,
      question: "시산가액 조정의 목적으로 옳은 것은?",
      options: [
        "평가 수수료를 결정하기 위해",
        "각 평가방법으로 산출된 시산가액을 비교·조정하여 최종 평가액을 결정하기 위해",
        "과세표준을 산정하기 위해",
        "담보 설정액을 정하기 위해"
      ],
      answer: 1,
      explanation: "시산가액 조정은 원가방식, 비교방식, 수익방식 등으로 산출된 시산가액을 비교·검토하여 가중평균 등의 방법으로 최종 감정평가액을 결정하는 과정입니다."
    },
    {
      id: 37,
      question: "수요와 공급의 원칙에서 부동산 가격 결정요인이 아닌 것은?",
      options: [
        "인구 증가",
        "건설비용",
        "금융조건",
        "평가사의 주관적 판단"
      ],
      answer: 3,
      explanation: "부동산 가격은 수요요인(인구, 소득, 금융조건 등)과 공급요인(건설비용, 토지가용성 등)에 의해 객관적으로 결정됩니다. 평가사의 주관적 판단은 가격 결정요인이 아닙니다."
    },
    {
      id: 38,
      question: "적산법과 수익분석법의 공통점은?",
      options: [
        "거래사례를 기초로 한다",
        "임대료를 산정하는 방법이다",
        "재조달원가를 기초로 한다",
        "복수 기간의 수익을 분석한다"
      ],
      answer: 1,
      explanation: "적산법과 수익분석법 모두 임대료를 산정하는 방법입니다. 적산법은 기초가격 기준, 수익분석법은 순수익 기준으로 임료를 산정합니다."
    },
    {
      id: 39,
      question: "감정평가에서 물건별 평가원칙의 예외가 인정되는 경우는?",
      options: [
        "평가의뢰인의 요청이 있는 경우",
        "물건이 일체로 거래되거나 일체로 사용되는 것이 합리적인 경우",
        "평가기간이 촉박한 경우",
        "물건의 수가 많은 경우"
      ],
      answer: 1,
      explanation: "감정평가는 원칙적으로 물건별로 하되, 둘 이상의 물건이 일체로 거래되거나 일체로 사용되는 것이 합리적인 경우에는 일괄평가가 인정됩니다."
    },
    {
      id: 40,
      question: "환원이율과 수익률의 관계에 대한 설명으로 옳은 것은?",
      options: [
        "환원이율이 높을수록 부동산 가치가 높다",
        "환원이율이 낮을수록 부동산 가치가 높다",
        "환원이율과 부동산 가치는 관계가 없다",
        "환원이율은 항상 수익률보다 높다"
      ],
      answer: 1,
      explanation: "부동산 가치 = 순수익 ÷ 환원이율. 따라서 동일한 순수익일 때 환원이율이 낮을수록 부동산 가치는 높아집니다. (역 관계)"
    },
    {
      id: 41,
      question: "공시지가 기준법에 대한 설명으로 옳은 것은?",
      options: [
        "개별 거래사례를 기준으로 평가하는 방법",
        "표준지공시지가를 기준으로 대상토지를 비교 평가하는 방법",
        "건물가격을 기준으로 토지가격을 산정하는 방법",
        "수익을 기준으로 토지가격을 산정하는 방법"
      ],
      answer: 1,
      explanation: "공시지가 기준법은 표준지공시지가를 기준으로 시점수정, 지역요인, 개별요인을 비교하여 대상토지의 가격을 산정하는 방법입니다."
    },
    {
      id: 42,
      question: "감정평가에서 '조건부 평가'가 가능한 경우가 아닌 것은?",
      options: [
        "미완성 건물의 완공을 전제로 한 평가",
        "인허가를 전제로 한 평가",
        "평가사의 희망가격을 전제로 한 평가",
        "합병을 전제로 한 토지 평가"
      ],
      answer: 2,
      explanation: "조건부 평가는 미완성 건물의 완공, 인허가, 합병 등 합리적인 조건하에서 가능합니다. 평가사의 희망가격은 조건이 될 수 없습니다."
    },
    {
      id: 43,
      question: "기대이율 결정 시 고려사항이 아닌 것은?",
      options: [
        "무위험수익률",
        "위험할증률",
        "예상 인플레이션율",
        "감정평가사의 경력"
      ],
      answer: 3,
      explanation: "기대이율은 무위험수익률, 위험할증률, 예상 인플레이션율, 유동성 프리미엄 등을 고려하여 결정합니다. 평가사의 경력은 관련이 없습니다."
    },
    {
      id: 44,
      question: "감정평가 3방식이 추구하는 가치가 동일해야 하는 이론적 근거는?",
      options: [
        "균형의 원칙",
        "대체의 원칙",
        "기여의 원칙",
        "적합의 원칙"
      ],
      answer: 1,
      explanation: "대체의 원칙에 의해 동일한 효용을 가진 부동산은 동일한 가격으로 수렴합니다. 이것이 3방식이 추구하는 가치가 이론적으로 일치해야 하는 근거입니다."
    },
    {
      id: 45,
      question: "부동산 가격형성의 일반원칙에서 '수익체증·체감의 원칙'의 의미는?",
      options: [
        "투자액이 증가할수록 수익도 항상 증가한다",
        "일정 수준까지는 투자에 따라 수익이 체증하다가 이후 체감한다",
        "수익은 항상 체감한다",
        "수익은 시간에 따라 증가한다"
      ],
      answer: 1,
      explanation: "수익체증·체감의 원칙은 최적점까지는 추가 투자에 따라 수익이 체증하지만, 최적점을 넘으면 수익이 체감한다는 원칙으로, 최유효이용의 기초가 됩니다."
    },
    {
      id: 46,
      question: "거래사례비교법에서 '비준가격' 산정의 올바른 순서는?",
      options: [
        "사정보정 → 시점수정 → 지역요인 비교 → 개별요인 비교",
        "시점수정 → 사정보정 → 개별요인 비교 → 지역요인 비교",
        "지역요인 비교 → 개별요인 비교 → 사정보정 → 시점수정",
        "개별요인 비교 → 지역요인 비교 → 시점수정 → 사정보정"
      ],
      answer: 0,
      explanation: "비준가격 = 거래사례가격 × 사정보정 × 시점수정 × 지역요인 비교 × 개별요인 비교"
    },
    {
      id: 47,
      question: "토지의 최유효이용 판정기준이 아닌 것은?",
      options: [
        "물리적 가능성",
        "법적 허용성",
        "재정적 실행가능성",
        "평가사의 선호도"
      ],
      answer: 3,
      explanation: "최유효이용 판정기준은 물리적 가능성, 법적 허용성, 재정적 실행가능성, 최대 수익성(생산성)입니다."
    },
    {
      id: 48,
      question: "유효총소득(EGI) 산정 시 고려하지 않는 항목은?",
      options: [
        "가능총소득",
        "공실손실",
        "기타수입",
        "감가상각비"
      ],
      answer: 3,
      explanation: "유효총소득(EGI) = 가능총소득(PGI) - 공실손실 + 기타수입. 감가상각비는 운영경비 또는 세금계산에서 고려됩니다."
    },
    {
      id: 49,
      question: "감정평가에서 '정상적인 시장'의 전제조건이 아닌 것은?",
      options: [
        "충분한 노출기간",
        "강박 없는 자발적 거래",
        "정보에 근거한 합리적 행동",
        "정부의 가격 통제"
      ],
      answer: 3,
      explanation: "정상적인 시장의 전제조건은 충분한 노출기간, 자발적 거래, 합리적 행동, 현금 등가 지불조건 등입니다. 정부의 가격 통제는 정상시장 조건이 아닙니다."
    },
    {
      id: 50,
      question: "감정평가 보고서 작성 시 준수해야 할 사항이 아닌 것은?",
      options: [
        "객관성과 공정성 유지",
        "평가과정의 합리적 설명",
        "의뢰인의 희망가격 반영",
        "관련 법규 준수"
      ],
      answer: 2,
      explanation: "감정평가 보고서는 객관성, 공정성, 합리적 설명, 법규 준수가 필요합니다. 의뢰인의 희망가격을 반영하는 것은 윤리적으로 허용되지 않습니다."
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('appraiser-appraisal-theory-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appraiser-appraisal-theory-progress', JSON.stringify({
      answeredQuestions,
      score
    }));
  }, [answeredQuestions, score]);

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(optionIndex);
    setShowResult(true);

    if (optionIndex === questions[currentQuestion].answer) {
      setScore(prev => prev + 1);
    }

    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions(prev => [...prev, currentQuestion]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetProgress = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    localStorage.removeItem('appraiser-appraisal-theory-progress');
  };

  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-emerald-100">
            <Link href="/" className="hover:text-white">홈</Link>
            <span className="mx-2">/</span>
            <Link href="/category/real-estate" className="hover:text-white">부동산·건설</Link>
            <span className="mx-2">/</span>
            <Link href="/category/real-estate/appraiser" className="hover:text-white">감정평가사</Link>
            <span className="mx-2">/</span>
            <span>감정평가이론</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">감정평가이론 학습</h1>
          <p className="text-emerald-100">감정평가의 이론적 기초와 가치론 - 50문제</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">학습 진행률</span>
                <span className="text-emerald-600 font-bold">{answeredQuestions.length} / {questions.length} 문제</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">정답률: {answeredQuestions.length > 0 ? Math.round((score / answeredQuestions.length) * 100) : 0}%</span>
                <button
                  onClick={resetProgress}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  진행률 초기화
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  문제 {currentQuestion + 1}
                </span>
                <span className="text-gray-500 text-sm">
                  {questions[currentQuestion].id} / {questions.length}
                </span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showResult
                        ? index === questions[currentQuestion].answer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : index === selectedAnswer
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-gray-200 text-gray-600'
                        : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50'
                    }`}
                  >
                    <span className="font-medium mr-2">{index + 1}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className={`mt-6 p-4 rounded-lg ${
                  selectedAnswer === questions[currentQuestion].answer
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center mb-2">
                    {selectedAnswer === questions[currentQuestion].answer ? (
                      <>
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-green-800">정답입니다!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold text-red-800">오답입니다</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← 이전
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion === questions.length - 1}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음 →
                </button>
              </div>
            </div>

            {/* Question Navigator */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">문제 네비게이터</h3>
              <div className="grid grid-cols-10 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestion(index);
                      setSelectedAnswer(null);
                      setShowResult(false);
                    }}
                    className={`w-full aspect-square rounded-lg text-sm font-medium transition-all ${
                      currentQuestion === index
                        ? 'bg-emerald-600 text-white'
                        : answeredQuestions.includes(index)
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">현재 점수</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600">{score}</div>
                <div className="text-gray-500">/ {answeredQuestions.length} 문제</div>
              </div>
            </div>

            {/* AI Helper */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-semibold mb-2">AI 학습 도우미</h3>
              <p className="text-sm text-emerald-100 mb-4">
                이해가 안 되는 부분을 AI에게 질문하세요
              </p>
              <button
                onClick={() => setShowAIModal(true)}
                className="w-full bg-white text-emerald-600 font-semibold py-2 rounded-lg hover:bg-emerald-50"
              >
                AI에게 질문하기
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">다른 과목</h3>
              <div className="space-y-2">
                <Link href="/category/real-estate/appraiser/study/appraisal-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">
                  감정평가법규
                </Link>
                <Link href="/category/real-estate/appraiser/study/civil-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">
                  민법
                </Link>
                <Link href="/category/real-estate/appraiser/study/economics" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">
                  경제학원론
                </Link>
                <Link href="/category/real-estate/appraiser/study/accounting" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">
                  회계학
                </Link>
                <Link href="/category/real-estate/appraiser/study/practical" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">
                  감정평가실무
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">AI 학습 도우미</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3">
              <a
                href={`https://claude.ai/new?q=${encodeURIComponent(`감정평가이론 문제 ${currentQuestion + 1}번에 대해 자세히 설명해주세요: "${questions[currentQuestion].question}"`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🟠</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Claude</div>
                  <div className="text-sm text-gray-600">Anthropic의 AI 어시스턴트</div>
                </div>
              </a>
              <a
                href={`https://chat.openai.com/?q=${encodeURIComponent(`감정평가이론 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🟢</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">ChatGPT</div>
                  <div className="text-sm text-gray-600">OpenAI의 AI 어시스턴트</div>
                </div>
              </a>
              <a
                href={`https://gemini.google.com/app?q=${encodeURIComponent(`감정평가이론 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🔵</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Gemini</div>
                  <div className="text-sm text-gray-600">Google의 AI 어시스턴트</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
