'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CivilLawPage() {
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
      question: "민법상 권리능력에 대한 설명으로 옳은 것은?",
      options: [
        "권리능력은 출생 시점부터 인정된다",
        "권리능력은 성년이 된 후 인정된다",
        "권리능력은 행위능력과 동일하다",
        "권리능력은 계약에 의해 발생한다"
      ],
      answer: 0,
      explanation: "권리능력은 권리와 의무의 주체가 될 수 있는 능력으로, 자연인은 출생한 때부터 권리능력이 인정됩니다."
    },
    {
      id: 2,
      question: "물권의 특성이 아닌 것은?",
      options: [
        "배타성",
        "절대성",
        "상대성",
        "물권법정주의"
      ],
      answer: 2,
      explanation: "물권은 배타성, 절대성, 물권법정주의의 특성을 가집니다. 상대성은 채권의 특성입니다."
    },
    {
      id: 3,
      question: "무효와 취소의 차이점에 대한 설명으로 옳은 것은?",
      options: [
        "무효는 취소와 달리 소급효가 없다",
        "취소는 처음부터 효력이 없다",
        "무효는 누구나 주장할 수 있고, 취소는 취소권자만 주장할 수 있다",
        "무효와 취소는 동일한 효력을 가진다"
      ],
      answer: 2,
      explanation: "무효는 처음부터 효력이 없어 누구나 주장할 수 있지만, 취소는 취소권자가 취소하기 전까지 유효하며 취소권자만 주장할 수 있습니다."
    },
    {
      id: 4,
      question: "점유권에 대한 설명으로 옳지 않은 것은?",
      options: [
        "점유권은 물건을 사실상 지배하는 것만으로 인정된다",
        "점유권은 본권과 관계없이 보호된다",
        "점유자는 소유의 의사로 점유하는 것으로 추정된다",
        "점유권은 등기해야 효력이 발생한다"
      ],
      answer: 3,
      explanation: "점유권은 물건의 사실상 지배라는 사실 상태만으로 인정되며, 등기를 요하지 않습니다."
    },
    {
      id: 5,
      question: "소유권에 대한 설명으로 옳은 것은?",
      options: [
        "소유권은 일정 기간이 지나면 소멸한다",
        "소유권은 법률의 범위 내에서 사용·수익·처분할 수 있는 완전한 물권이다",
        "소유권은 점유권보다 약한 권리이다",
        "소유권은 반드시 등기해야 성립한다"
      ],
      answer: 1,
      explanation: "소유권은 법률의 범위 내에서 그 목적물을 사용·수익·처분할 수 있는 완전한 물권입니다."
    },
    {
      id: 6,
      question: "민법상 법인의 종류가 아닌 것은?",
      options: [
        "사단법인",
        "재단법인",
        "영리법인",
        "합자법인"
      ],
      answer: 3,
      explanation: "민법상 법인에는 사단법인, 재단법인, 영리법인, 비영리법인 등이 있습니다. 합자법인은 상법상 개념입니다."
    },
    {
      id: 7,
      question: "대리에 대한 설명으로 옳지 않은 것은?",
      options: [
        "대리인의 행위 효과는 본인에게 귀속된다",
        "대리권은 본인의 사망으로 소멸하지 않는다",
        "무권대리는 본인의 추인으로 유효가 될 수 있다",
        "대리인은 본인을 위한 것임을 표시해야 한다"
      ],
      answer: 1,
      explanation: "대리권은 본인의 사망, 파산, 대리인의 사망 등으로 소멸합니다."
    },
    {
      id: 8,
      question: "물권 변동에 대한 설명으로 옳은 것은?",
      options: [
        "부동산 물권변동은 계약만으로 효력이 발생한다",
        "동산 물권변동은 등기가 필요하다",
        "부동산 물권변동은 등기해야 효력이 발생한다",
        "상속에 의한 물권변동도 등기가 필요하다"
      ],
      answer: 2,
      explanation: "부동산 물권변동은 등기해야 효력이 발생합니다(성립요건주의). 다만 상속 등 법률행위에 의하지 않은 물권변동은 등기 없이도 효력이 발생합니다."
    },
    {
      id: 9,
      question: "지상권에 대한 설명으로 옳지 않은 것은?",
      options: [
        "지상권은 타인의 토지에서 건물 등을 소유하기 위한 권리이다",
        "지상권은 용익물권이다",
        "지상권은 존속기간의 정함이 없으면 최단기간이 적용된다",
        "지상권은 등기 없이도 성립한다"
      ],
      answer: 3,
      explanation: "지상권은 부동산 물권으로서 등기해야 성립합니다."
    },
    {
      id: 10,
      question: "저당권에 대한 설명으로 옳은 것은?",
      options: [
        "저당권자는 목적물을 점유해야 한다",
        "저당권은 피담보채권과 분리하여 양도할 수 있다",
        "저당권은 부종성, 수반성, 불가분성의 특성을 가진다",
        "저당권은 동산에만 설정할 수 있다"
      ],
      answer: 2,
      explanation: "저당권은 담보물권으로서 부종성(피담보채권이 있어야 존재), 수반성(채권과 함께 이전), 불가분성(전액 변제 시까지 목적물 전부에 행사)의 특성을 가집니다."
    },
    {
      id: 11,
      question: "소멸시효에 대한 설명으로 옳지 않은 것은?",
      options: [
        "소멸시효는 권리를 행사할 수 있는 때부터 진행한다",
        "소멸시효는 중단될 수 있다",
        "소유권은 소멸시효에 걸린다",
        "채권의 소멸시효는 원칙적으로 10년이다"
      ],
      answer: 2,
      explanation: "소유권은 시효에 걸리지 않습니다(소멸시효의 적용을 받지 않음). 소유권의 불소멸성이라고 합니다."
    },
    {
      id: 12,
      question: "취득시효에 대한 설명으로 옳은 것은?",
      options: [
        "부동산의 취득시효는 5년이다",
        "점유가 선의·평온·공연해야 시효취득이 가능하다",
        "점유의 승계는 인정되지 않는다",
        "시효완성으로 당연히 소유권을 취득한다"
      ],
      answer: 1,
      explanation: "취득시효를 위해서는 20년간(등기 시 10년) 선의·평온·공연하게 점유해야 합니다."
    },
    {
      id: 13,
      question: "유치권에 대한 설명으로 옳지 않은 것은?",
      options: [
        "유치권은 법정담보물권이다",
        "유치권은 물건과 채권 사이에 견련관계가 있어야 한다",
        "유치권자는 목적물을 사용·수익할 수 있다",
        "유치권은 등기해야 성립한다"
      ],
      answer: 3,
      explanation: "유치권은 법정담보물권으로 등기 없이 성립합니다. 점유만 있으면 됩니다."
    },
    {
      id: 14,
      question: "질권에 대한 설명으로 옳은 것은?",
      options: [
        "질권은 목적물의 인도 없이 설정된다",
        "질권자는 목적물을 점유해야 한다",
        "질권은 부동산에만 설정할 수 있다",
        "질권은 피담보채권 없이도 존속한다"
      ],
      answer: 1,
      explanation: "질권은 질권자가 목적물을 점유함으로써 성립하는 담보물권입니다."
    },
    {
      id: 15,
      question: "공동소유에 대한 설명으로 옳지 않은 것은?",
      options: [
        "공유는 지분에 따라 소유권을 가지는 것이다",
        "합유는 조합관계에서 인정된다",
        "총유는 법인 아닌 사단에서 인정된다",
        "공유자는 언제든지 분할을 청구할 수 없다"
      ],
      answer: 3,
      explanation: "공유자는 언제든지 공유물의 분할을 청구할 수 있습니다(분할자유의 원칙). 다만 5년을 넘지 않는 기간으로 분할하지 않기로 약정할 수 있습니다."
    },
    {
      id: 16,
      question: "의사표시에 대한 설명으로 옳은 것은?",
      options: [
        "비진의표시는 항상 무효이다",
        "통정허위표시는 당사자 간에도 무효이다",
        "착오에 의한 의사표시는 당연히 무효이다",
        "사기에 의한 의사표시는 취소할 수 없다"
      ],
      answer: 1,
      explanation: "통정허위표시(가장행위)는 당사자 간에도 무효입니다. 다만 선의의 제3자에게는 대항하지 못합니다."
    },
    {
      id: 17,
      question: "미성년자의 법률행위에 대한 설명으로 옳은 것은?",
      options: [
        "미성년자의 법률행위는 모두 무효이다",
        "미성년자는 법정대리인의 동의 없이 유효한 계약을 체결할 수 없다",
        "법정대리인의 동의 없는 계약은 취소할 수 없다",
        "미성년자도 단독으로 증여를 받을 수 있다"
      ],
      answer: 3,
      explanation: "미성년자도 권리만을 얻거나 의무만을 면하는 행위는 단독으로 할 수 있습니다. 증여를 받는 것은 권리만을 얻는 행위입니다."
    },
    {
      id: 18,
      question: "등기의 추정력에 대한 설명으로 옳은 것은?",
      options: [
        "등기가 있으면 그 권리관계가 존재하는 것으로 추정된다",
        "등기의 추정력은 반증으로 번복될 수 없다",
        "등기의 추정력은 선의의 제3자에게만 적용된다",
        "모든 등기에는 공신력이 인정된다"
      ],
      answer: 0,
      explanation: "등기가 있으면 그 등기와 일치하는 권리관계가 존재하는 것으로 추정됩니다(등기의 추정력). 다만 반증이 있으면 번복될 수 있습니다."
    },
    {
      id: 19,
      question: "부동산 이중매매에서 소유권을 취득하는 자는?",
      options: [
        "먼저 계약한 자",
        "먼저 대금을 지급한 자",
        "먼저 등기를 마친 자",
        "먼저 인도받은 자"
      ],
      answer: 2,
      explanation: "부동산 물권변동은 등기를 해야 효력이 발생하므로, 먼저 등기를 마친 자가 소유권을 취득합니다."
    },
    {
      id: 20,
      question: "지역권에 대한 설명으로 옳지 않은 것은?",
      options: [
        "지역권은 요역지 소유자가 승역지를 이용하는 권리이다",
        "지역권은 요역지와 분리하여 양도할 수 있다",
        "통행지역권은 가장 대표적인 지역권이다",
        "지역권은 용익물권이다"
      ],
      answer: 1,
      explanation: "지역권은 요역지 소유권에 부종하므로 요역지와 분리하여 양도하거나 다른 권리의 목적으로 할 수 없습니다."
    },
    {
      id: 21,
      question: "조건과 기한에 대한 설명으로 옳은 것은?",
      options: [
        "정지조건은 조건 성취 전에 효력이 발생한다",
        "해제조건은 조건 성취 시 효력이 발생한다",
        "불법조건이 붙은 법률행위는 무효이다",
        "기한은 도래가 불확실한 사실이다"
      ],
      answer: 2,
      explanation: "불법조건(조건의 내용이 불법인 경우)이 붙은 법률행위는 무효입니다."
    },
    {
      id: 22,
      question: "민법상 물건에 대한 설명으로 옳지 않은 것은?",
      options: [
        "물건은 유체물과 관리 가능한 자연력을 말한다",
        "토지와 그 정착물은 부동산이다",
        "부동산 이외의 물건은 동산이다",
        "물건은 반드시 소유자가 있어야 한다"
      ],
      answer: 3,
      explanation: "무주물(소유자 없는 물건)도 물건입니다. 무주의 동산은 선점으로, 무주의 부동산은 국유로 됩니다."
    },
    {
      id: 23,
      question: "전세권에 대한 설명으로 옳은 것은?",
      options: [
        "전세권은 동산에도 설정할 수 있다",
        "전세권은 담보물권이다",
        "전세권은 용익물권적 성질과 담보물권적 성질을 겸유한다",
        "전세권 존속기간은 제한이 없다"
      ],
      answer: 2,
      explanation: "전세권은 부동산을 사용·수익할 수 있는 용익물권적 성질과 전세금 반환을 담보하는 담보물권적 성질을 함께 가집니다."
    },
    {
      id: 24,
      question: "법률행위의 목적에 대한 설명으로 옳지 않은 것은?",
      options: [
        "법률행위의 목적은 확정될 수 있어야 한다",
        "법률행위의 목적은 적법해야 한다",
        "법률행위의 목적은 실현 가능해야 한다",
        "법률행위의 목적은 반드시 금전으로 환산되어야 한다"
      ],
      answer: 3,
      explanation: "법률행위의 목적은 확정성, 적법성, 실현가능성, 사회적 타당성을 갖추어야 합니다. 금전환산 가능성은 요건이 아닙니다."
    },
    {
      id: 25,
      question: "표현대리에 대한 설명으로 옳은 것은?",
      options: [
        "표현대리는 본인에게 귀책사유가 없어도 성립한다",
        "표현대리는 상대방이 악의인 경우에도 성립한다",
        "표현대리는 대리권의 외관을 신뢰한 제3자를 보호하기 위한 제도이다",
        "표현대리가 성립하면 본인에게 효과가 귀속되지 않는다"
      ],
      answer: 2,
      explanation: "표현대리는 대리권 없는 자의 행위에 대해 대리권의 외관을 신뢰한 선의의 제3자를 보호하기 위한 제도입니다."
    },
    {
      id: 26,
      question: "점유자와 회복자의 관계에서 선의의 점유자의 권리는?",
      options: [
        "과실을 반환해야 한다",
        "과실을 취득한다",
        "손해배상청구권만 있다",
        "권리가 없다"
      ],
      answer: 1,
      explanation: "선의의 점유자는 점유물의 과실을 취득합니다. 악의의 점유자는 과실을 반환해야 합니다."
    },
    {
      id: 27,
      question: "민법상 능력에 대한 설명으로 옳지 않은 것은?",
      options: [
        "권리능력은 권리의무의 주체가 될 수 있는 능력이다",
        "의사능력은 의사표시의 의미를 이해하는 능력이다",
        "행위능력은 단독으로 유효한 법률행위를 할 수 있는 능력이다",
        "책임능력은 모든 자연인에게 인정된다"
      ],
      answer: 3,
      explanation: "책임능력(불법행위 책임을 질 수 있는 능력)은 미성년자 등 사리를 변별할 능력이 없는 자에게는 인정되지 않을 수 있습니다."
    },
    {
      id: 28,
      question: "물권적 청구권에 해당하지 않는 것은?",
      options: [
        "반환청구권",
        "방해배제청구권",
        "방해예방청구권",
        "손해배상청구권"
      ],
      answer: 3,
      explanation: "물권적 청구권에는 반환청구권, 방해배제청구권, 방해예방청구권이 있습니다. 손해배상청구권은 채권입니다."
    },
    {
      id: 29,
      question: "첨부에 대한 설명으로 옳지 않은 것은?",
      options: [
        "첨부는 부합, 혼화, 가공을 포함한다",
        "부동산에 부합된 물건은 부동산 소유자의 소유가 된다",
        "동산이 부합하면 주된 동산의 소유자가 소유권을 취득한다",
        "첨부로 손해를 입은 자는 구제받을 수 없다"
      ],
      answer: 3,
      explanation: "첨부로 손해를 입은 자는 부당이득 반환청구권을 행사할 수 있습니다."
    },
    {
      id: 30,
      question: "근저당권에 대한 설명으로 옳은 것은?",
      options: [
        "근저당권은 확정된 채권만 담보한다",
        "근저당권은 채권최고액의 범위 내에서 담보한다",
        "근저당권은 보통저당권과 달리 부종성이 인정되지 않는다",
        "근저당권은 동산에만 설정된다"
      ],
      answer: 1,
      explanation: "근저당권은 채권최고액의 범위 내에서 일정한 범위에 속하는 불특정 다수의 채권을 담보합니다."
    },
    {
      id: 31,
      question: "상린관계에 대한 설명으로 옳지 않은 것은?",
      options: [
        "상린관계는 인접 부동산 소유자 간의 법률관계이다",
        "자연배수는 이웃 토지 소유자가 방해하지 못한다",
        "통행권은 주위토지통행권으로 인정될 수 있다",
        "상린관계에서 경계는 당사자가 임의로 정할 수 있다"
      ],
      answer: 3,
      explanation: "상린관계에서 경계가 불명확한 경우 비용을 공동 부담하여 경계를 확정하거나 법원에 경계확정의 소를 제기할 수 있습니다."
    },
    {
      id: 32,
      question: "법인의 능력에 대한 설명으로 옳은 것은?",
      options: [
        "법인은 자연인과 동일한 권리능력을 가진다",
        "법인은 정관에 정한 목적 범위 내에서 권리능력을 가진다",
        "법인은 불법행위 능력이 없다",
        "법인은 형사책임을 질 수 없다"
      ],
      answer: 1,
      explanation: "법인은 성질에 의한 제한, 법률에 의한 제한, 정관에 의한 제한 내에서 권리능력을 가집니다."
    },
    {
      id: 33,
      question: "민법상 기간의 계산에 대한 설명으로 옳은 것은?",
      options: [
        "기간의 초일은 항상 산입한다",
        "기간의 말일이 공휴일이면 그 다음날에 만료한다",
        "기간은 시간으로만 계산한다",
        "연령 계산에도 초일불산입 원칙이 적용된다"
      ],
      answer: 1,
      explanation: "기간의 말일이 토요일 또는 공휴일에 해당한 때에는 기간은 그 익일에 만료합니다."
    },
    {
      id: 34,
      question: "가등기에 대한 설명으로 옳지 않은 것은?",
      options: [
        "가등기는 순위보전 효력이 있다",
        "가등기에 기한 본등기를 하면 가등기 후 본등기 전에 된 등기에 우선한다",
        "가등기는 물권변동의 효력이 있다",
        "가등기는 청구권 보전을 위해 하는 예비등기이다"
      ],
      answer: 2,
      explanation: "가등기는 순위보전 효력만 있고, 물권변동의 효력은 없습니다. 물권변동은 본등기를 해야 발생합니다."
    },
    {
      id: 35,
      question: "명의신탁에 대한 설명으로 옳은 것은?",
      options: [
        "부동산 명의신탁은 항상 유효하다",
        "명의신탁 약정은 무효이지만 물권변동은 유효하다",
        "부동산실권리자명의등기에 관한 법률에 의해 명의신탁은 무효이다",
        "종중 명의신탁은 금지된다"
      ],
      answer: 2,
      explanation: "부동산실권리자명의등기에 관한 법률에 의해 명의신탁약정과 그에 따른 등기는 무효입니다."
    },
    {
      id: 36,
      question: "민법상 주소에 대한 설명으로 옳지 않은 것은?",
      options: [
        "주소는 생활의 근거가 되는 곳이다",
        "주소가 둘 이상이면 그 하나가 주소가 된다",
        "주소를 알 수 없는 경우 거소가 주소로 된다",
        "법인의 주소는 주된 사무소의 소재지이다"
      ],
      answer: 1,
      explanation: "생활의 근거가 되는 곳이 둘 이상이면 그 하나가 주소가 되는 것이 아니라, 모두 주소가 됩니다(복수주소)."
    },
    {
      id: 37,
      question: "용익물권에 해당하지 않는 것은?",
      options: [
        "지상권",
        "지역권",
        "전세권",
        "저당권"
      ],
      answer: 3,
      explanation: "용익물권에는 지상권, 지역권, 전세권이 있습니다. 저당권은 담보물권입니다."
    },
    {
      id: 38,
      question: "물권의 우선적 효력에 대한 설명으로 옳은 것은?",
      options: [
        "물권은 항상 채권에 우선한다",
        "동일 물건에 대해 물권이 경합하면 후에 성립한 물권이 우선한다",
        "부동산 물권 간의 순위는 등기 순서에 의한다",
        "담보물권은 용익물권에 항상 우선한다"
      ],
      answer: 2,
      explanation: "부동산 물권 간의 순위는 등기 순서에 의합니다(성립시기가 아닌 등기 순서)."
    },
    {
      id: 39,
      question: "민법상 불능에 대한 설명으로 옳은 것은?",
      options: [
        "원시적 불능은 계약을 유효하게 한다",
        "후발적 불능은 계약을 당연히 무효로 한다",
        "원시적 불능의 급부를 목적으로 한 계약은 무효이다",
        "객관적 불능과 주관적 불능의 효과는 동일하다"
      ],
      answer: 2,
      explanation: "원시적·객관적으로 불능인 급부를 목적으로 한 계약은 무효입니다."
    },
    {
      id: 40,
      question: "등기청구권에 대한 설명으로 옳지 않은 것은?",
      options: [
        "등기청구권은 채권이다",
        "매매계약의 매수인은 등기청구권을 가진다",
        "등기청구권은 10년의 소멸시효에 걸린다",
        "등기청구권은 물권적 청구권이다"
      ],
      answer: 3,
      explanation: "등기청구권은 채권적 청구권입니다. 물권적 청구권과는 다릅니다."
    },
    {
      id: 41,
      question: "법정지상권에 대한 설명으로 옳은 것은?",
      options: [
        "당사자의 약정으로만 발생한다",
        "토지와 건물의 소유자가 다르게 된 경우에 법률 규정에 의해 발생한다",
        "존속기간의 약정이 반드시 필요하다",
        "지료의 약정이 없으면 무효이다"
      ],
      answer: 1,
      explanation: "법정지상권은 저당권 실행 등으로 토지와 건물의 소유자가 다르게 된 경우 법률 규정에 의해 발생합니다."
    },
    {
      id: 42,
      question: "선의취득에 대한 설명으로 옳지 않은 것은?",
      options: [
        "선의취득은 동산에만 인정된다",
        "선의취득을 위해서는 평온·공연하게 점유해야 한다",
        "선의취득을 위해서는 선의·무과실이어야 한다",
        "도품이나 유실물도 선의취득의 대상이 된다"
      ],
      answer: 3,
      explanation: "도품이나 유실물은 2년간 선의취득의 대상이 되지 않습니다. 피해자나 유실자가 반환청구할 수 있습니다."
    },
    {
      id: 43,
      question: "강행규정 위반의 효과는?",
      options: [
        "취소할 수 있다",
        "무효이다",
        "효력이 정지된다",
        "당사자 합의로 유효하게 할 수 있다"
      ],
      answer: 1,
      explanation: "강행규정에 위반한 법률행위는 무효입니다."
    },
    {
      id: 44,
      question: "구분소유에 대한 설명으로 옳지 않은 것은?",
      options: [
        "1동의 건물 일부도 소유권의 객체가 될 수 있다",
        "구분소유자는 전유부분과 대지사용권을 가진다",
        "공용부분은 구분소유자 전원의 공유이다",
        "전유부분과 대지사용권은 분리하여 처분할 수 있다"
      ],
      answer: 3,
      explanation: "전유부분과 대지사용권은 분리하여 처분할 수 없습니다(분리처분 금지)."
    },
    {
      id: 45,
      question: "민법상 착오에 대한 설명으로 옳은 것은?",
      options: [
        "모든 착오는 의사표시를 취소할 수 있게 한다",
        "동기의 착오는 법률행위 내용의 중요부분에 관한 것이어야 취소할 수 있다",
        "착오에 의한 의사표시는 무효이다",
        "표의자에게 중대한 과실이 있어도 취소할 수 있다"
      ],
      answer: 1,
      explanation: "착오가 법률행위의 내용의 중요부분에 관한 것이어야 취소할 수 있고, 표의자에게 중대한 과실이 없어야 합니다."
    },
    {
      id: 46,
      question: "담보물권의 부종성에 대한 설명으로 옳은 것은?",
      options: [
        "피담보채권이 소멸해도 담보물권은 존속한다",
        "담보물권은 피담보채권과 함께 소멸한다",
        "담보물권은 피담보채권과 무관하게 성립한다",
        "부종성은 용익물권에도 인정된다"
      ],
      answer: 1,
      explanation: "부종성이란 담보물권이 피담보채권의 존재를 전제로 하여 그와 운명을 같이 하는 것을 말합니다."
    },
    {
      id: 47,
      question: "사단법인의 해산 사유가 아닌 것은?",
      options: [
        "존립기간 만료",
        "정관에 정한 해산사유 발생",
        "사원총회의 결의",
        "이사의 사임"
      ],
      answer: 3,
      explanation: "이사의 사임은 해산사유가 아니며 새로운 이사를 선임하면 됩니다."
    },
    {
      id: 48,
      question: "공유물의 관리에 대한 설명으로 옳은 것은?",
      options: [
        "공유물의 보존행위는 공유자 전원의 동의가 필요하다",
        "공유물의 관리행위는 각 공유자가 단독으로 할 수 있다",
        "공유물의 처분은 지분의 과반수로 결정한다",
        "공유물의 변경은 공유자 전원의 동의가 필요하다"
      ],
      answer: 3,
      explanation: "공유물의 변경은 공유자 전원의 동의가 필요합니다. 보존행위는 단독으로, 관리행위는 과반수로 결정합니다."
    },
    {
      id: 49,
      question: "피성년후견인의 법률행위에 대한 설명으로 옳은 것은?",
      options: [
        "피성년후견인의 모든 법률행위는 무효이다",
        "피성년후견인은 일용품 구입 등 일상생활에 필요한 행위는 단독으로 할 수 있다",
        "피성년후견인의 법률행위는 항상 성년후견인의 동의가 필요하다",
        "피성년후견인은 법률행위 능력이 전혀 없다"
      ],
      answer: 1,
      explanation: "피성년후견인도 일상생활에 필요하고 그 대가가 과도하지 않은 행위는 단독으로 할 수 있습니다."
    },
    {
      id: 50,
      question: "민법상 법률행위의 해석에 대한 설명으로 옳은 것은?",
      options: [
        "문언만을 기준으로 해석해야 한다",
        "당사자의 진정한 의사를 탐구해야 한다",
        "법관의 재량에 따라 자유롭게 해석할 수 있다",
        "관습과 조리는 고려되지 않는다"
      ],
      answer: 1,
      explanation: "법률행위의 해석은 당사자가 그 표시행위에 부여한 객관적 의미를 합리적으로 해석해야 하며, 당사자의 진정한 의사를 탐구해야 합니다."
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('appraiser-civil-law-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appraiser-civil-law-progress', JSON.stringify({
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
    localStorage.removeItem('appraiser-civil-law-progress');
  };

  const progressPercentage = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-emerald-100">
            <Link href="/" className="hover:text-white">홈</Link>
            <span className="mx-2">/</span>
            <Link href="/category/real-estate" className="hover:text-white">부동산·건설</Link>
            <span className="mx-2">/</span>
            <Link href="/category/real-estate/appraiser" className="hover:text-white">감정평가사</Link>
            <span className="mx-2">/</span>
            <span>민법</span>
          </nav>
          <h1 className="text-3xl font-bold mb-2">민법 학습</h1>
          <p className="text-emerald-100">민법 총칙 및 물권법 - 50문제</p>
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
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${showResult ? index === questions[currentQuestion].answer ? 'border-green-500 bg-green-50 text-green-800' : index === selectedAnswer ? 'border-red-500 bg-red-50 text-red-800' : 'border-gray-200 text-gray-600' : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50'}`}
                  >
                    <span className="font-medium mr-2">{index + 1}.</span>{option}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === questions[currentQuestion].answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="flex items-center mb-2">
                    {selectedAnswer === questions[currentQuestion].answer ? (
                      <><svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg><span className="font-semibold text-green-800">정답입니다!</span></>
                    ) : (
                      <><svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg><span className="font-semibold text-red-800">오답입니다</span></>
                    )}
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
                {questions.map((_, index) => (
                  <button key={index} onClick={() => { setCurrentQuestion(index); setSelectedAnswer(null); setShowResult(false); }} className={`w-full aspect-square rounded-lg text-sm font-medium transition-all ${currentQuestion === index ? 'bg-emerald-600 text-white' : answeredQuestions.includes(index) ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>
                ))}
              </div>
            </div>
          </div>

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
              <button onClick={() => setShowAIModal(true)} className="w-full bg-white text-emerald-600 font-semibold py-2 rounded-lg hover:bg-emerald-50">AI에게 질문하기</button>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">다른 과목</h3>
              <div className="space-y-2">
                <Link href="/category/real-estate/appraiser/study/appraisal-theory" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가이론</Link>
                <Link href="/category/real-estate/appraiser/study/appraisal-law" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가법규</Link>
                <Link href="/category/real-estate/appraiser/study/economics" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">경제학원론</Link>
                <Link href="/category/real-estate/appraiser/study/accounting" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">회계학</Link>
                <Link href="/category/real-estate/appraiser/study/practical" className="block p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 text-gray-700 text-sm">감정평가실무</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">AI 학습 도우미</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`민법 문제 ${currentQuestion + 1}번에 대해 자세히 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟠</span></div>
                <div><div className="font-semibold text-gray-800">Claude</div><div className="text-sm text-gray-600">Anthropic의 AI 어시스턴트</div></div>
              </a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`민법 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🟢</span></div>
                <div><div className="font-semibold text-gray-800">ChatGPT</div><div className="text-sm text-gray-600">OpenAI의 AI 어시스턴트</div></div>
              </a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(`민법 문제에 대해 설명해주세요: "${questions[currentQuestion].question}"`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all">
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
