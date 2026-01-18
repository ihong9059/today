'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function AccountingPage() {
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
      question: "재무상태표에 표시되지 않는 항목은?",
      options: [
        "자산",
        "부채",
        "자본",
        "비용"
      ],
      answer: 3,
      explanation: "재무상태표는 특정 시점의 자산, 부채, 자본을 표시합니다. 비용과 수익은 포괄손익계산서에 표시됩니다."
    },
    {
      id: 2,
      question: "회계등식으로 옳은 것은?",
      options: [
        "자산 = 부채 - 자본",
        "자산 = 부채 + 자본",
        "자산 + 부채 = 자본",
        "부채 = 자산 + 자본"
      ],
      answer: 1,
      explanation: "회계등식은 자산 = 부채 + 자본입니다. 이는 모든 거래의 기본 원리입니다."
    },
    {
      id: 3,
      question: "발생주의 회계에 대한 설명으로 옳은 것은?",
      options: [
        "현금 수수 시점에 수익과 비용을 인식",
        "경제적 사건 발생 시점에 수익과 비용을 인식",
        "결산 시점에만 수익과 비용을 인식",
        "관리자의 판단에 따라 인식"
      ],
      answer: 1,
      explanation: "발생주의 회계는 현금의 수수와 관계없이 경제적 사건이 발생한 시점에 수익과 비용을 인식합니다."
    },
    {
      id: 4,
      question: "유동자산에 해당하지 않는 것은?",
      options: [
        "현금",
        "매출채권",
        "건물",
        "재고자산"
      ],
      answer: 2,
      explanation: "건물은 비유동자산(유형자산)입니다. 유동자산은 1년 이내에 현금화되거나 사용될 것으로 예상되는 자산입니다."
    },
    {
      id: 5,
      question: "감가상각의 목적으로 옳은 것은?",
      options: [
        "자산의 시가평가",
        "자산 원가의 비용 배분",
        "현금흐름 관리",
        "부채 상환"
      ],
      answer: 1,
      explanation: "감가상각은 유형자산의 취득원가를 그 자산의 내용연수에 걸쳐 체계적으로 비용으로 배분하는 것입니다."
    },
    {
      id: 6,
      question: "다음 중 무형자산에 해당하는 것은?",
      options: [
        "토지",
        "건물",
        "영업권",
        "기계장치"
      ],
      answer: 2,
      explanation: "영업권(Goodwill)은 물리적 실체가 없지만 기업에 미래 경제적 효익을 제공하는 무형자산입니다."
    },
    {
      id: 7,
      question: "선급비용의 성격으로 옳은 것은?",
      options: [
        "비용",
        "자산",
        "부채",
        "자본"
      ],
      answer: 1,
      explanation: "선급비용은 미래에 비용화될 지출로, 당기에는 자산으로 인식됩니다."
    },
    {
      id: 8,
      question: "미지급비용의 성격으로 옳은 것은?",
      options: [
        "수익",
        "자산",
        "부채",
        "자본"
      ],
      answer: 2,
      explanation: "미지급비용은 이미 발생한 비용 중 아직 지급하지 않은 금액으로, 부채로 인식됩니다."
    },
    {
      id: 9,
      question: "재고자산 평가방법 중 물가 상승기에 당기순이익이 가장 높게 나타나는 방법은?",
      options: [
        "선입선출법",
        "후입선출법",
        "이동평균법",
        "총평균법"
      ],
      answer: 0,
      explanation: "물가 상승기에 선입선출법은 먼저 구입한 낮은 원가를 매출원가로 인식하여 당기순이익이 높게 나타납니다."
    },
    {
      id: 10,
      question: "매출총이익의 계산식으로 옳은 것은?",
      options: [
        "매출액 - 판매비와관리비",
        "매출액 - 매출원가",
        "매출액 - 영업외비용",
        "영업이익 - 이자비용"
      ],
      answer: 1,
      explanation: "매출총이익 = 매출액 - 매출원가입니다."
    },
    {
      id: 11,
      question: "유형자산의 취득원가에 포함되는 것은?",
      options: [
        "취득 후 발생한 수선비",
        "일상적인 유지보수비",
        "매입가격과 매입부대비용",
        "영업비용"
      ],
      answer: 2,
      explanation: "유형자산의 취득원가에는 매입가격, 직접 관련된 부대비용(운반비, 설치비 등)이 포함됩니다."
    },
    {
      id: 12,
      question: "손익계산서에서 영업이익의 계산식으로 옳은 것은?",
      options: [
        "매출총이익 - 판매비와관리비",
        "매출액 - 매출원가",
        "당기순이익 + 법인세비용",
        "매출총이익 + 영업외수익"
      ],
      answer: 0,
      explanation: "영업이익 = 매출총이익 - 판매비와관리비입니다."
    },
    {
      id: 13,
      question: "유동비율의 계산식으로 옳은 것은?",
      options: [
        "유동자산 ÷ 총자산 × 100",
        "유동부채 ÷ 유동자산 × 100",
        "유동자산 ÷ 유동부채 × 100",
        "당좌자산 ÷ 유동부채 × 100"
      ],
      answer: 2,
      explanation: "유동비율 = 유동자산 ÷ 유동부채 × 100%로, 단기지급능력을 측정하는 지표입니다."
    },
    {
      id: 14,
      question: "자기자본이익률(ROE)의 계산식으로 옳은 것은?",
      options: [
        "당기순이익 ÷ 총자산 × 100",
        "당기순이익 ÷ 자기자본 × 100",
        "영업이익 ÷ 매출액 × 100",
        "매출총이익 ÷ 자기자본 × 100"
      ],
      answer: 1,
      explanation: "자기자본이익률(ROE) = 당기순이익 ÷ 자기자본 × 100%로, 자기자본의 수익성을 측정합니다."
    },
    {
      id: 15,
      question: "대손충당금 설정의 회계처리로 옳은 것은?",
      options: [
        "차변: 대손충당금, 대변: 대손상각비",
        "차변: 대손상각비, 대변: 대손충당금",
        "차변: 매출채권, 대변: 대손충당금",
        "차변: 대손충당금, 대변: 매출채권"
      ],
      answer: 1,
      explanation: "대손충당금 설정: (차) 대손상각비 XXX (대) 대손충당금 XXX"
    },
    {
      id: 16,
      question: "부채비율의 계산식으로 옳은 것은?",
      options: [
        "총부채 ÷ 총자산 × 100",
        "총부채 ÷ 자기자본 × 100",
        "유동부채 ÷ 자기자본 × 100",
        "비유동부채 ÷ 총자산 × 100"
      ],
      answer: 1,
      explanation: "부채비율 = 총부채 ÷ 자기자본 × 100%로, 재무구조의 안정성을 측정합니다."
    },
    {
      id: 17,
      question: "사채를 할인발행한 경우 회계처리로 옳은 것은?",
      options: [
        "사채발행비는 자산으로 인식",
        "사채할인발행차금은 사채의 차감계정",
        "사채할인발행차금은 비용으로 즉시 인식",
        "발행가액 전액을 사채로 인식"
      ],
      answer: 1,
      explanation: "사채를 할인발행하면 사채할인발행차금을 사채의 차감계정으로 하여 사채의 장부금액을 표시합니다."
    },
    {
      id: 18,
      question: "현금흐름표에서 영업활동으로 분류되는 것은?",
      options: [
        "유형자산 매각",
        "사채 발행",
        "재고자산 매입",
        "배당금 지급"
      ],
      answer: 2,
      explanation: "재고자산 매입은 기업의 주된 영업활동과 관련되어 영업활동 현금흐름으로 분류됩니다."
    },
    {
      id: 19,
      question: "자본금의 정의로 옳은 것은?",
      options: [
        "발행주식 수 × 시장가격",
        "발행주식 수 × 액면가액",
        "총자산 - 총부채",
        "당기순이익의 누적액"
      ],
      answer: 1,
      explanation: "자본금 = 발행주식 수 × 액면가액입니다."
    },
    {
      id: 20,
      question: "주식발행초과금의 성격으로 옳은 것은?",
      options: [
        "이익잉여금",
        "자본잉여금",
        "법정준비금",
        "미처분이익잉여금"
      ],
      answer: 1,
      explanation: "주식발행초과금은 주식을 액면가 초과 발행 시 그 초과액으로, 자본잉여금에 해당합니다."
    },
    {
      id: 21,
      question: "이익잉여금처분계산서에서 처분되는 항목이 아닌 것은?",
      options: [
        "현금배당",
        "이익준비금 적립",
        "자기주식 취득",
        "임의적립금 적립"
      ],
      answer: 2,
      explanation: "자기주식 취득은 이익잉여금 처분이 아니라 자본조정 항목입니다."
    },
    {
      id: 22,
      question: "충당부채의 인식조건이 아닌 것은?",
      options: [
        "과거 사건에서 발생한 현재의무",
        "자원 유출 가능성이 높음",
        "금액을 신뢰성 있게 추정 가능",
        "확정된 지급액과 지급일"
      ],
      answer: 3,
      explanation: "충당부채는 지급 시기나 금액이 불확실한 부채입니다. 확정된 것은 일반부채입니다."
    },
    {
      id: 23,
      question: "매입채무의 성격으로 옳은 것은?",
      options: [
        "유동자산",
        "유동부채",
        "비유동자산",
        "비유동부채"
      ],
      answer: 1,
      explanation: "매입채무는 상품이나 원재료 매입 대금 중 미지급액으로, 유동부채입니다."
    },
    {
      id: 24,
      question: "재무제표의 질적 특성에 해당하지 않는 것은?",
      options: [
        "목적적합성",
        "신뢰성",
        "비교가능성",
        "수익성"
      ],
      answer: 3,
      explanation: "재무제표의 질적 특성에는 목적적합성, 신뢰성, 비교가능성, 이해가능성이 있습니다. 수익성은 질적 특성이 아닙니다."
    },
    {
      id: 25,
      question: "복식부기의 특징으로 옳은 것은?",
      options: [
        "하나의 계정에만 기록",
        "모든 거래를 차변과 대변에 동시 기록",
        "현금거래만 기록",
        "결산 시에만 기록"
      ],
      answer: 1,
      explanation: "복식부기는 모든 거래를 차변과 대변의 두 측면에서 동시에 기록하는 방법입니다."
    },
    {
      id: 26,
      question: "재고자산감모손실의 성격으로 옳은 것은?",
      options: [
        "수익",
        "자산",
        "비용",
        "부채"
      ],
      answer: 2,
      explanation: "재고자산감모손실은 재고의 분실, 파손 등으로 인한 손실로 비용으로 인식합니다."
    },
    {
      id: 27,
      question: "총자산회전율의 의미로 옳은 것은?",
      options: [
        "자산의 시장가치",
        "자산을 이용한 매출 창출 효율성",
        "자산의 감가상각률",
        "자산의 유동성"
      ],
      answer: 1,
      explanation: "총자산회전율(매출액÷총자산)은 자산을 얼마나 효율적으로 활용하여 매출을 창출하는지를 나타냅니다."
    },
    {
      id: 28,
      question: "감가상각방법 중 내용연수 초기에 상각비가 가장 많이 인식되는 방법은?",
      options: [
        "정액법",
        "정률법",
        "생산량비례법",
        "이자율법"
      ],
      answer: 1,
      explanation: "정률법은 장부금액에 일정률을 곱하여 상각하므로 초기에 상각비가 많이 인식됩니다(가속상각법)."
    },
    {
      id: 29,
      question: "당좌비율의 계산에 포함되지 않는 것은?",
      options: [
        "현금및현금성자산",
        "단기금융상품",
        "매출채권",
        "재고자산"
      ],
      answer: 3,
      explanation: "당좌비율 = 당좌자산 ÷ 유동부채. 당좌자산에는 재고자산이 포함되지 않습니다."
    },
    {
      id: 30,
      question: "이연법인세자산이 인식되는 경우는?",
      options: [
        "영구적 차이 발생 시",
        "차감할 일시적 차이 발생 시",
        "가산할 일시적 차이 발생 시",
        "회계이익이 과세소득보다 클 때"
      ],
      answer: 1,
      explanation: "이연법인세자산은 미래 과세소득에서 차감할 수 있는 일시적 차이가 있을 때 인식합니다."
    },
    {
      id: 31,
      question: "유효이자율법에 대한 설명으로 옳은 것은?",
      options: [
        "액면이자율로 이자비용을 인식",
        "발행 시 유효이자율로 이자비용을 인식",
        "매기 동일한 이자비용 인식",
        "시장이자율로 이자비용을 인식"
      ],
      answer: 1,
      explanation: "유효이자율법은 사채의 장부금액에 발행 당시 유효이자율을 곱하여 이자비용을 계산합니다."
    },
    {
      id: 32,
      question: "자기주식의 재무상태표 표시방법으로 옳은 것은?",
      options: [
        "자산으로 표시",
        "부채로 표시",
        "자본의 차감 항목으로 표시",
        "비용으로 표시"
      ],
      answer: 2,
      explanation: "자기주식은 자본의 차감 항목(자본조정)으로 표시합니다."
    },
    {
      id: 33,
      question: "손익분기점 분석에서 공헌이익의 의미는?",
      options: [
        "매출액 - 총원가",
        "매출액 - 변동원가",
        "매출액 - 고정원가",
        "영업이익"
      ],
      answer: 1,
      explanation: "공헌이익 = 매출액 - 변동원가입니다. 고정원가를 충당하고 이익을 내는 데 공헌하는 금액입니다."
    },
    {
      id: 34,
      question: "원가계산에서 제조간접비에 해당하지 않는 것은?",
      options: [
        "공장 건물 감가상각비",
        "공장 전력비",
        "직접노무비",
        "공장 감독자 급여"
      ],
      answer: 2,
      explanation: "직접노무비는 제조직접비입니다. 제조간접비는 특정 제품에 직접 추적이 어려운 제조원가입니다."
    },
    {
      id: 35,
      question: "다음 중 판매비와관리비에 해당하는 것은?",
      options: [
        "제조간접비",
        "직접재료비",
        "광고선전비",
        "제품제조원가"
      ],
      answer: 2,
      explanation: "광고선전비는 판매 촉진을 위한 비용으로 판매비와관리비에 해당합니다."
    },
    {
      id: 36,
      question: "우발부채의 회계처리로 옳은 것은?",
      options: [
        "항상 부채로 인식",
        "주석으로만 공시",
        "가능성이 높으면 부채 인식, 그렇지 않으면 주석 공시",
        "인식하지 않음"
      ],
      answer: 2,
      explanation: "우발부채는 자원 유출 가능성이 높으면 충당부채로 인식하고, 가능성이 낮으면 주석으로 공시합니다."
    },
    {
      id: 37,
      question: "기업회계기준에서 재무제표 작성의 기본가정은?",
      options: [
        "청산기업 가정",
        "계속기업 가정",
        "자산재평가 가정",
        "인플레이션 가정"
      ],
      answer: 1,
      explanation: "재무제표는 기업이 예측 가능한 미래에도 계속하여 영업활동을 수행한다는 계속기업 가정 하에 작성됩니다."
    },
    {
      id: 38,
      question: "주당순이익(EPS)의 계산식으로 옳은 것은?",
      options: [
        "당기순이익 ÷ 발행주식 총수",
        "당기순이익 ÷ 가중평균유통보통주식수",
        "영업이익 ÷ 발행주식 총수",
        "매출액 ÷ 발행주식 총수"
      ],
      answer: 1,
      explanation: "주당순이익 = 보통주 귀속 당기순이익 ÷ 가중평균유통보통주식수입니다."
    },
    {
      id: 39,
      question: "리스이용자의 사용권자산 인식에 대한 설명으로 옳은 것은?",
      options: [
        "모든 리스에서 인식하지 않음",
        "운용리스에서만 인식",
        "금융리스에서만 인식",
        "단기리스와 소액자산 리스 제외하고 인식"
      ],
      answer: 3,
      explanation: "K-IFRS 1116에서 리스이용자는 단기리스와 소액기초자산 리스를 제외한 모든 리스에서 사용권자산을 인식합니다."
    },
    {
      id: 40,
      question: "수익인식 5단계 모형에서 첫 번째 단계는?",
      options: [
        "거래가격 산정",
        "수행의무 식별",
        "고객과의 계약 식별",
        "수익 인식"
      ],
      answer: 2,
      explanation: "수익인식 5단계: ①계약 식별 → ②수행의무 식별 → ③거래가격 산정 → ④거래가격 배분 → ⑤수익 인식"
    },
    {
      id: 41,
      question: "관계기업투자주식의 평가방법으로 옳은 것은?",
      options: [
        "원가법",
        "공정가치법",
        "지분법",
        "연결법"
      ],
      answer: 2,
      explanation: "관계기업투자주식(유의적 영향력 보유, 통상 20~50% 지분)은 지분법으로 평가합니다."
    },
    {
      id: 42,
      question: "연결재무제표에서 비지배지분의 표시 위치는?",
      options: [
        "부채",
        "자본",
        "자산",
        "손익계산서"
      ],
      answer: 1,
      explanation: "비지배지분은 연결재무상태표의 자본 중 지배기업 소유주지분과 구분하여 자본에 표시합니다."
    },
    {
      id: 43,
      question: "재평가모형 적용 시 재평가차익의 회계처리는?",
      options: [
        "당기손익으로 인식",
        "기타포괄손익으로 인식",
        "부채로 인식",
        "자산에서 차감"
      ],
      answer: 1,
      explanation: "유형자산의 재평가차익은 기타포괄손익으로 인식하고 자본의 재평가잉여금으로 누적합니다."
    },
    {
      id: 44,
      question: "손상차손 인식의 조건으로 옳은 것은?",
      options: [
        "장부금액 < 회수가능액",
        "장부금액 > 회수가능액",
        "장부금액 = 회수가능액",
        "취득원가 > 공정가치"
      ],
      answer: 1,
      explanation: "자산의 장부금액이 회수가능액을 초과할 때 그 차액을 손상차손으로 인식합니다."
    },
    {
      id: 45,
      question: "투자부동산의 정의로 옳은 것은?",
      options: [
        "자가 사용 부동산",
        "정상적 영업과정에서 판매 목적 부동산",
        "임대수익이나 시세차익을 위해 보유하는 부동산",
        "건설 중인 부동산"
      ],
      answer: 2,
      explanation: "투자부동산은 임대수익이나 시세차익 또는 두 가지 모두를 얻기 위해 보유하는 부동산입니다."
    },
    {
      id: 46,
      question: "기능통화와 다른 표시통화를 사용할 때 자산과 부채의 환산 환율은?",
      options: [
        "역사적 환율",
        "평균 환율",
        "마감일 환율",
        "거래일 환율"
      ],
      answer: 2,
      explanation: "자산과 부채는 보고기간 말의 마감일 환율로 환산합니다."
    },
    {
      id: 47,
      question: "법인세비용의 구성요소가 아닌 것은?",
      options: [
        "당기법인세",
        "이연법인세 변동액",
        "영업이익",
        "세무조정 효과"
      ],
      answer: 2,
      explanation: "법인세비용은 당기법인세와 이연법인세로 구성됩니다. 영업이익은 법인세비용의 구성요소가 아닙니다."
    },
    {
      id: 48,
      question: "영업활동 현금흐름 표시방법 중 직접법의 특징은?",
      options: [
        "당기순이익에서 시작",
        "현금 유입과 유출 항목별로 직접 표시",
        "조정항목을 상세히 표시",
        "비현금거래를 별도 공시하지 않음"
      ],
      answer: 1,
      explanation: "직접법은 현금 유입(고객으로부터의 현금수취 등)과 유출(공급자에 대한 현금지급 등)을 주요 항목별로 직접 표시합니다."
    },
    {
      id: 49,
      question: "자본변동표에 표시되지 않는 것은?",
      options: [
        "유상증자",
        "당기순손익",
        "배당금 지급",
        "매출액"
      ],
      answer: 3,
      explanation: "매출액은 손익계산서 항목입니다. 자본변동표는 자본의 변동내역을 표시합니다."
    },
    {
      id: 50,
      question: "생물자산의 측정방법으로 옳은 것은?",
      options: [
        "취득원가",
        "공정가치에서 추정 판매비용을 차감한 금액",
        "재평가모형",
        "역사적 원가"
      ],
      answer: 1,
      explanation: "생물자산은 공정가치에서 추정 판매비용을 차감한 금액으로 측정합니다. 공정가치 변동은 당기손익으로 인식합니다."
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('appraiser-accounting-progress');
    if (saved) { const data = JSON.parse(saved); setAnsweredQuestions(data.answeredQuestions || []); setScore(data.score || 0); }
  }, []);

  useEffect(() => {
    localStorage.setItem('appraiser-accounting-progress', JSON.stringify({ answeredQuestions, score }));
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
  const resetProgress = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); setScore(0); setAnsweredQuestions([]); localStorage.removeItem('appraiser-accounting-progress'); };
  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-emerald-100">
            <Link href="/" className="hover:text-white">홈</Link><span className="mx-2">/</span>
            <Link href="/category/real-estate" className="hover:text-white">부동산·건설</Link><span className="mx-2">/</span>
            <Link href="/category/legal/appraiser" className="hover:text-white">감정평가사</Link><span className="mx-2">/</span><span>회계학</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">회계학 학습</h1>
          <p className="text-emerald-100">재무회계 및 원가회계 - 50문제</p>
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
            <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-semibold text-gray-800 mb-4">다른 과목</h3><div className="space-y-2"><Link href="/category/legal/appraiser/study/appraisal-theory" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가이론</Link><Link href="/category/legal/appraiser/study/appraisal-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가법규</Link><Link href="/category/legal/appraiser/study/civil-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">민법</Link><Link href="/category/legal/appraiser/study/economics" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">경제학원론</Link><Link href="/category/legal/appraiser/study/practical" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가실무</Link></div></div>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-gray-800">AI 학습 도우미</h3><button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`회계학 문제 ${currentQuestion + 1}번에 대해 자세히 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all"><div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟠</span></div><div><div className="font-semibold text-gray-800">Claude</div><div className="text-sm text-gray-600">Anthropic의 AI 어시스턴트</div></div></a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`회계학 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all"><div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟢</span></div><div><div className="font-semibold text-gray-800">ChatGPT</div><div className="text-sm text-gray-600">OpenAI의 AI 어시스턴트</div></div></a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(`회계학 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"><div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🔵</span></div><div><div className="font-semibold text-gray-800">Gemini</div><div className="text-sm text-gray-600">Google의 AI 어시스턴트</div></div></a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
