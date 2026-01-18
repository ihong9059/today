'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function AppraisalLawPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();

  const questions = [
    {
      id: 1,
      question: "감정평가 및 감정평가사에 관한 법률에서 규정하는 감정평가의 정의로 옳은 것은?",
      options: [
        "부동산만의 경제적 가치를 판정하는 것",
        "토지 등의 경제적 가치를 판정하여 그 결과를 가액으로 표시하는 것",
        "동산의 시장가격을 산정하는 것",
        "부동산 거래가격을 신고하는 것"
      ],
      answer: 1,
      explanation: "감정평가란 토지 등의 경제적 가치를 판정하여 그 결과를 가액(價額)으로 표시하는 것을 말합니다."
    },
    {
      id: 2,
      question: "감정평가사 자격 취득을 위한 요건이 아닌 것은?",
      options: [
        "감정평가사 시험 합격",
        "실무수습 이수",
        "대학원 석사학위 취득",
        "한국감정평가사협회 등록"
      ],
      answer: 2,
      explanation: "감정평가사가 되려면 시험 합격, 실무수습 이수, 협회 등록이 필요합니다. 대학원 학위는 필수요건이 아닙니다."
    },
    {
      id: 3,
      question: "부동산 가격공시에 관한 법률상 표준지공시지가의 공시 주체는?",
      options: [
        "한국감정원",
        "국토교통부장관",
        "시·도지사",
        "시장·군수·구청장"
      ],
      answer: 1,
      explanation: "표준지공시지가는 국토교통부장관이 매년 공시합니다."
    },
    {
      id: 4,
      question: "감정평가서의 보존 기간은?",
      options: [
        "3년",
        "5년",
        "7년",
        "10년"
      ],
      answer: 3,
      explanation: "감정평가법인등은 감정평가서 원본과 관련 서류를 10년간 보존해야 합니다."
    },
    {
      id: 5,
      question: "감정평가법인의 최저 자본금 요건은?",
      options: [
        "1억원",
        "3억원",
        "5억원",
        "10억원"
      ],
      answer: 2,
      explanation: "감정평가법인의 설립 시 자본금은 5억원 이상이어야 합니다."
    },
    {
      id: 6,
      question: "공익사업을 위한 토지 등의 취득 및 보상에 관한 법률상 보상금 산정의 기준시점은?",
      options: [
        "사업인정 고시일",
        "협의 성립일 또는 재결일",
        "공익사업 시행일",
        "토지 인도일"
      ],
      answer: 1,
      explanation: "보상금은 협의 성립 당시의 가격 또는 수용재결 당시의 가격으로 산정합니다."
    },
    {
      id: 7,
      question: "감정평가사의 결격사유에 해당하지 않는 것은?",
      options: [
        "피성년후견인",
        "금고 이상의 형을 선고받고 집행이 끝난 후 3년이 지나지 않은 자",
        "파산선고를 받고 복권되지 않은 자",
        "군 복무 중인 자"
      ],
      answer: 3,
      explanation: "군 복무는 감정평가사 결격사유가 아닙니다. 피성년후견인, 금고 이상의 형 집행 후 3년 미경과자, 파산자 등이 결격사유입니다."
    },
    {
      id: 8,
      question: "개별공시지가에 대한 이의신청 기간은?",
      options: [
        "결정·공시일로부터 30일 이내",
        "결정·공시일로부터 60일 이내",
        "결정·공시일로부터 90일 이내",
        "결정·공시일로부터 1년 이내"
      ],
      answer: 0,
      explanation: "개별공시지가에 대한 이의신청은 결정·공시일로부터 30일 이내에 해야 합니다."
    },
    {
      id: 9,
      question: "감정평가법인에 소속될 수 있는 감정평가사의 최소 인원은?",
      options: [
        "3명",
        "5명",
        "7명",
        "10명"
      ],
      answer: 1,
      explanation: "감정평가법인에는 5명 이상의 감정평가사가 소속되어야 합니다."
    },
    {
      id: 10,
      question: "표준지공시지가 조사·평가업무를 수행할 수 있는 기관은?",
      options: [
        "한국감정원만",
        "감정평가법인만",
        "한국감정원 또는 감정평가법인",
        "모든 감정평가사"
      ],
      answer: 2,
      explanation: "표준지공시지가 조사·평가는 한국감정원 또는 감정평가법인이 수행할 수 있습니다."
    },
    {
      id: 11,
      question: "국유재산법상 국유재산의 처분 시 감정평가 의뢰 기관 수는?",
      options: [
        "1개 기관 이상",
        "2개 기관 이상",
        "3개 기관 이상",
        "규정 없음"
      ],
      answer: 1,
      explanation: "국유재산을 처분할 때는 2개 이상의 감정평가법인에 의뢰해야 합니다."
    },
    {
      id: 12,
      question: "감정평가사 등록의 취소 사유가 아닌 것은?",
      options: [
        "거짓이나 부정한 방법으로 등록한 경우",
        "결격사유에 해당하게 된 경우",
        "2년 이상 휴업한 경우",
        "업무정지 기간 중 업무를 한 경우"
      ],
      answer: 2,
      explanation: "2년 이상 휴업은 등록취소 사유가 아니라 등록말소 신청 사유입니다."
    },
    {
      id: 13,
      question: "감정평가 타당성 조사를 실시할 수 있는 기관은?",
      options: [
        "한국감정원",
        "국토교통부",
        "감정평가관리·징계위원회",
        "한국감정평가사협회"
      ],
      answer: 0,
      explanation: "한국감정원은 감정평가의 적정성에 대한 타당성 조사를 실시할 수 있습니다."
    },
    {
      id: 14,
      question: "공익사업법상 이의재결에 대한 행정소송 제기 기간은?",
      options: [
        "재결서 정본 송달일로부터 30일",
        "재결서 정본 송달일로부터 60일",
        "재결서 정본 송달일로부터 90일",
        "재결서 정본 송달일로부터 1년"
      ],
      answer: 2,
      explanation: "이의재결에 대한 행정소송은 재결서 정본 송달일로부터 90일 이내에 제기해야 합니다."
    },
    {
      id: 15,
      question: "감정평가업자의 손해배상 책임에 대한 설명으로 옳은 것은?",
      options: [
        "고의가 있는 경우에만 책임을 진다",
        "고의 또는 과실로 손해를 발생시킨 경우 책임을 진다",
        "손해배상책임보험 가입 시 책임이 면제된다",
        "법인인 경우에만 책임을 진다"
      ],
      answer: 1,
      explanation: "감정평가업자는 고의 또는 과실로 의뢰인이나 제3자에게 손해를 발생시킨 경우 배상책임을 집니다."
    },
    {
      id: 16,
      question: "도시 및 주거환경정비법상 감정평가 의뢰기관 수는?",
      options: [
        "1개 기관",
        "2개 기관",
        "3개 기관",
        "규정에 따라 다름"
      ],
      answer: 1,
      explanation: "정비사업의 감정평가는 시장·군수 등이 선정한 1인과 토지등소유자가 선정한 1인, 총 2개 기관에 의뢰합니다."
    },
    {
      id: 17,
      question: "감정평가 수수료에 대한 설명으로 옳은 것은?",
      options: [
        "법률로 정해진 고정 금액이다",
        "국토교통부장관이 기준을 정할 수 있다",
        "감정평가사가 임의로 정한다",
        "의뢰인이 일방적으로 정한다"
      ],
      answer: 1,
      explanation: "국토교통부장관은 감정평가 수수료의 요율 및 실비에 관한 기준을 정할 수 있습니다."
    },
    {
      id: 18,
      question: "표준주택가격의 공시 주기는?",
      options: [
        "매월",
        "매 분기",
        "매년",
        "2년마다"
      ],
      answer: 2,
      explanation: "표준주택가격은 매년 공시합니다."
    },
    {
      id: 19,
      question: "감정평가관리·징계위원회의 위원 수는?",
      options: [
        "5명 이상 7명 이내",
        "7명 이상 11명 이내",
        "9명 이상 15명 이내",
        "15명 이상 20명 이내"
      ],
      answer: 1,
      explanation: "감정평가관리·징계위원회는 위원장 1명을 포함하여 7명 이상 11명 이내의 위원으로 구성됩니다."
    },
    {
      id: 20,
      question: "감정평가사 징계의 종류가 아닌 것은?",
      options: [
        "자격취소",
        "자격정지",
        "견책",
        "과태료"
      ],
      answer: 3,
      explanation: "감정평가사 징계에는 자격취소, 자격정지, 견책이 있습니다. 과태료는 행정처분이지 징계가 아닙니다."
    },
    {
      id: 21,
      question: "공익사업법상 영업손실 보상 대상이 아닌 것은?",
      options: [
        "휴업 기간 중 영업이익 감소분",
        "영업장소 이전비용",
        "이전 광고비",
        "사업 확장으로 인한 예상 수익 감소"
      ],
      answer: 3,
      explanation: "영업손실 보상은 실제 발생하는 손실에 대한 보상으로, 예상 수익 감소는 보상 대상이 아닙니다."
    },
    {
      id: 22,
      question: "자산재평가법상 재평가의 대상이 되는 자산은?",
      options: [
        "동산만",
        "부동산만",
        "유형고정자산",
        "모든 자산"
      ],
      answer: 2,
      explanation: "자산재평가는 토지, 건물, 기계장치 등 유형고정자산을 대상으로 합니다."
    },
    {
      id: 23,
      question: "표준지공시지가 이의신청에 대한 결정 기간은?",
      options: [
        "이의신청일로부터 15일 이내",
        "이의신청일로부터 30일 이내",
        "이의신청일로부터 60일 이내",
        "이의신청일로부터 90일 이내"
      ],
      answer: 1,
      explanation: "국토교통부장관은 표준지공시지가에 대한 이의신청을 받은 날부터 30일 이내에 이를 심사하여 결정해야 합니다."
    },
    {
      id: 24,
      question: "감정평가법인의 해산 사유가 아닌 것은?",
      options: [
        "정관에서 정한 해산 사유 발생",
        "합병",
        "설립인가 취소",
        "대표이사 사임"
      ],
      answer: 3,
      explanation: "대표이사 사임은 해산 사유가 아니며 새로운 대표이사를 선임하면 됩니다."
    },
    {
      id: 25,
      question: "공익사업법상 토지소유자가 감정평가업자를 추천할 수 있는 요건은?",
      options: [
        "토지소유자 과반수의 동의",
        "토지소유자 2/3 이상의 동의",
        "토지소유자 전원의 동의",
        "추천권 없음"
      ],
      answer: 0,
      explanation: "토지소유자 및 관계인은 과반수의 동의를 얻어 감정평가업자를 추천할 수 있습니다."
    },
    {
      id: 26,
      question: "감정평가 표준의 법적 성격은?",
      options: [
        "법률",
        "대통령령",
        "국토교통부령",
        "국토교통부장관 고시"
      ],
      answer: 3,
      explanation: "감정평가에 관한 규칙(감정평가 표준)은 국토교통부장관이 고시로 정합니다."
    },
    {
      id: 27,
      question: "표준지 선정 기준으로 옳지 않은 것은?",
      options: [
        "용도지역, 지목, 이용상황이 같은 토지 중 선정",
        "토지 특성이 동일한 것 중 대표성이 있는 토지",
        "가장 비싼 토지를 우선 선정",
        "인근토지 가격 산정 시 기준이 될 수 있는 토지"
      ],
      answer: 2,
      explanation: "표준지는 대표성, 중용성, 안정성, 확정성을 기준으로 선정하며 가격 수준은 선정기준이 아닙니다."
    },
    {
      id: 28,
      question: "감정평가업자가 수행할 수 없는 업무는?",
      options: [
        "부동산 감정평가",
        "동산 감정평가",
        "기업가치 평가",
        "부동산 중개"
      ],
      answer: 3,
      explanation: "감정평가업자는 감정평가 업무를 수행하며, 부동산 중개는 공인중개사의 업무입니다."
    },
    {
      id: 29,
      question: "국유재산법상 국유재산의 대부료 산정 기준은?",
      options: [
        "시가의 1% 이하",
        "시가의 5% 이내",
        "대통령령으로 정하는 요율",
        "당사자 합의"
      ],
      answer: 2,
      explanation: "국유재산의 대부료는 대통령령으로 정하는 요율에 의해 산정합니다."
    },
    {
      id: 30,
      question: "감정평가 목적외 사용 금지 규정의 취지는?",
      options: [
        "감정평가 수수료 보호",
        "감정평가의 신뢰성 및 공정성 확보",
        "감정평가사의 업무량 조절",
        "감정평가법인의 독점 보호"
      ],
      answer: 1,
      explanation: "감정평가 결과를 의뢰 목적 외에 사용하면 부적절한 용도로 악용될 수 있어 이를 방지하고자 합니다."
    },
    {
      id: 31,
      question: "공익사업법상 사업인정의 효력 발생 시기는?",
      options: [
        "사업인정 신청일",
        "사업인정일",
        "사업인정 고시일",
        "보상계획 공고일"
      ],
      answer: 2,
      explanation: "사업인정은 고시한 날부터 그 효력이 발생합니다."
    },
    {
      id: 32,
      question: "감정평가사 시험의 일부 면제 대상이 아닌 것은?",
      options: [
        "공인회계사",
        "변호사",
        "세무사",
        "공인중개사"
      ],
      answer: 3,
      explanation: "공인회계사, 변호사, 세무사 등은 일부 과목이 면제되지만, 공인중개사는 면제 대상이 아닙니다."
    },
    {
      id: 33,
      question: "개별공시지가의 결정 주체는?",
      options: [
        "국토교통부장관",
        "시·도지사",
        "시장·군수·구청장",
        "한국감정원"
      ],
      answer: 2,
      explanation: "개별공시지가는 시장·군수·구청장이 결정·공시합니다."
    },
    {
      id: 34,
      question: "감정평가업자의 명의대여 금지 규정 위반 시 처벌은?",
      options: [
        "과태료 500만원",
        "과태료 1,000만원",
        "3년 이하의 징역 또는 3천만원 이하의 벌금",
        "등록취소만"
      ],
      answer: 2,
      explanation: "명의대여 금지 규정 위반 시 3년 이하의 징역 또는 3천만원 이하의 벌금에 처합니다."
    },
    {
      id: 35,
      question: "공익사업법상 잔여지 수용청구권의 행사 기간은?",
      options: [
        "사업인정 고시일로부터 1년",
        "협의 성립일 또는 수용재결일로부터 6개월",
        "공사 완료일로부터 1년",
        "제한 없음"
      ],
      answer: 1,
      explanation: "잔여지 수용청구는 협의 성립일 또는 수용재결일로부터 6개월 이내에 해야 합니다."
    },
    {
      id: 36,
      question: "감정평가사 실무수습 기간은?",
      options: [
        "6개월",
        "1년",
        "2년",
        "3년"
      ],
      answer: 1,
      explanation: "감정평가사 시험 합격자는 1년간 실무수습을 이수해야 합니다."
    },
    {
      id: 37,
      question: "부동산 가격공시법상 공동주택가격 공시의 기준일은?",
      options: [
        "1월 1일",
        "4월 1일",
        "7월 1일",
        "10월 1일"
      ],
      answer: 0,
      explanation: "공동주택가격은 매년 1월 1일을 기준일로 하여 공시합니다."
    },
    {
      id: 38,
      question: "감정평가 의뢰인이 정당한 사유 없이 수수료 지급을 거부할 경우 구제 방법은?",
      options: [
        "감정평가관리·징계위원회에 제소",
        "한국감정평가사협회에 조정 신청",
        "민사소송 제기",
        "행정심판 청구"
      ],
      answer: 2,
      explanation: "수수료 분쟁은 사인 간의 민사문제로 민사소송을 통해 해결합니다."
    },
    {
      id: 39,
      question: "공익사업법상 토지 등의 수용 시 보상방법의 원칙은?",
      options: [
        "물건보상 원칙",
        "현금보상 원칙",
        "채권보상 원칙",
        "대토보상 원칙"
      ],
      answer: 1,
      explanation: "보상금은 현금으로 지급함이 원칙입니다. 다만, 당사자 합의 시 다른 방법도 가능합니다."
    },
    {
      id: 40,
      question: "감정평가법인등의 성실의무에 해당하지 않는 것은?",
      options: [
        "품위 유지",
        "공정한 감정평가",
        "비밀 유지",
        "정치활동 금지"
      ],
      answer: 3,
      explanation: "감정평가업자는 품위 유지, 공정한 감정평가, 비밀 유지 의무가 있습니다. 정치활동 금지는 의무사항이 아닙니다."
    },
    {
      id: 41,
      question: "부동산 가격공시법상 비주거용 일반 부동산 가격공시 대상은?",
      options: [
        "상업용 건물만",
        "공장만",
        "상업용 건물, 업무용 건물, 복합용 부동산",
        "모든 건축물"
      ],
      answer: 2,
      explanation: "비주거용 일반 부동산 가격공시는 상업용 건물, 업무용 건물, 복합용 부동산을 대상으로 합니다."
    },
    {
      id: 42,
      question: "감정평가사 시험 불합격 결정에 대한 불복 방법은?",
      options: [
        "국토교통부장관에게 이의신청",
        "감정평가관리·징계위원회에 재심청구",
        "행정심판 또는 행정소송",
        "헌법소원"
      ],
      answer: 2,
      explanation: "시험 불합격 결정에 대해서는 행정심판이나 행정소송을 제기할 수 있습니다."
    },
    {
      id: 43,
      question: "공익사업법상 이주대책 수립 의무가 있는 사업시행자는?",
      options: [
        "모든 사업시행자",
        "공공사업 시행자만",
        "주거용 건물을 수용하는 경우만",
        "20호 이상의 주거용 건물 소유자를 이주시키는 경우"
      ],
      answer: 3,
      explanation: "20호 이상의 주거용 건물 소유자를 이주시키는 경우 이주대책을 수립해야 합니다."
    },
    {
      id: 44,
      question: "한국감정평가사협회의 법적 성격은?",
      options: [
        "주식회사",
        "사단법인",
        "공공기관",
        "비영리법인"
      ],
      answer: 1,
      explanation: "한국감정평가사협회는 감정평가사의 품위 유지와 자질 향상을 위한 사단법인입니다."
    },
    {
      id: 45,
      question: "감정평가서에 반드시 기재해야 할 사항이 아닌 것은?",
      options: [
        "의뢰인의 성명",
        "대상물건의 소재지",
        "감정평가액",
        "의뢰인의 연소득"
      ],
      answer: 3,
      explanation: "감정평가서에는 의뢰인 성명, 물건 소재지, 감정평가액, 평가 조건 등을 기재해야 하지만, 의뢰인의 연소득은 필요하지 않습니다."
    },
    {
      id: 46,
      question: "공익사업법상 환매권의 행사 기간은?",
      options: [
        "취득일로부터 5년 이내",
        "취득일로부터 10년 이내",
        "해당 공익사업 폐지 후 5년 이내",
        "제한 없음"
      ],
      answer: 1,
      explanation: "환매권은 협의 취득일 또는 수용개시일로부터 10년 이내에 행사할 수 있습니다."
    },
    {
      id: 47,
      question: "감정평가법인의 사원이 될 수 없는 자는?",
      options: [
        "감정평가사 자격이 없는 자",
        "외국인 감정평가사",
        "다른 감정평가법인의 소속 감정평가사",
        "금고형 집행 종료 후 5년 경과자"
      ],
      answer: 2,
      explanation: "다른 감정평가법인에 소속된 감정평가사는 이중 소속이 금지되어 있어 사원이 될 수 없습니다."
    },
    {
      id: 48,
      question: "국유재산법상 국유재산 관리의 기본원칙이 아닌 것은?",
      options: [
        "효율적 관리",
        "재산 증식",
        "공공목적 우선",
        "최저가 매각"
      ],
      answer: 3,
      explanation: "국유재산은 효율적 관리, 재산 증식, 공공목적 우선을 원칙으로 하며, 최저가 매각은 원칙이 아닙니다."
    },
    {
      id: 49,
      question: "감정평가 타당성 조사 결과 부적정 판정 시 조치는?",
      options: [
        "즉시 형사처벌",
        "국토교통부장관에게 통보",
        "의뢰인에게만 통보",
        "조치 없음"
      ],
      answer: 1,
      explanation: "타당성 조사 결과 부적정한 경우 국토교통부장관에게 통보하고, 장관은 징계 등의 조치를 취합니다."
    },
    {
      id: 50,
      question: "공익사업법상 사업인정 기간의 연장 한도는?",
      options: [
        "1회에 한해 1년",
        "1회에 한해 2년",
        "2회까지 각 1년",
        "3회까지 각 1년"
      ],
      answer: 0,
      explanation: "사업인정 기간은 1회에 한해 1년의 범위에서 연장할 수 있습니다."
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('appraiser-appraisal-law-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appraiser-appraisal-law-progress', JSON.stringify({
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
    localStorage.removeItem('appraiser-appraisal-law-progress');
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
            <span>감정평가법규</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">감정평가법규 학습</h1>
          <p className="text-emerald-100">감정평가관계법규 완벽 마스터 - 50문제</p>
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
                <button onClick={resetProgress} className="text-sm text-red-500 hover:text-red-700">진행률 초기화</button>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  문제 {currentQuestion + 1}
                </span>
                <span className="text-gray-500 text-sm">{questions[currentQuestion].id} / {questions.length}</span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-6">{questions[currentQuestion].question}</h2>

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

              <div className="flex justify-between mt-6">
                <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  ← 이전
                </button>
                <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed">
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">현재 점수</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600">{score}</div>
                <div className="text-gray-500">/ {answeredQuestions.length} 문제</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-semibold mb-2">AI 학습 도우미</h3>
              <p className="text-sm text-emerald-100 mb-4">이해가 안 되는 부분을 AI에게 질문하세요</p>
              <button onClick={() => setShowAIModal(true)} className="w-full bg-white text-emerald-600 font-semibold py-2 rounded-lg hover:bg-emerald-50">
                AI에게 질문하기
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">다른 과목</h3>
              <div className="space-y-2">
                <Link href="/category/real-estate/appraiser/study/appraisal-theory" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가이론</Link>
                <Link href="/category/real-estate/appraiser/study/civil-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">민법</Link>
                <Link href="/category/real-estate/appraiser/study/economics" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">경제학원론</Link>
                <Link href="/category/real-estate/appraiser/study/accounting" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">회계학</Link>
                <Link href="/category/real-estate/appraiser/study/practical" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가실무</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`감정평가법규 문제 ${currentQuestion + 1}번에 대해 자세히 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟠</span></div>
                <div><div className="font-semibold text-gray-800">Claude</div><div className="text-sm text-gray-600">Anthropic의 AI 어시스턴트</div></div>
              </a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`감정평가법규 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟢</span></div>
                <div><div className="font-semibold text-gray-800">ChatGPT</div><div className="text-sm text-gray-600">OpenAI의 AI 어시스턴트</div></div>
              </a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(`감정평가법규 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🔵</span></div>
                <div><div className="font-semibold text-gray-800">Gemini</div><div className="text-sm text-gray-600">Google의 AI 어시스턴트</div></div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
