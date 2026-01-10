'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

const questions: Question[] = [
  // 배색 원리 (1-15)
  {
    id: 1,
    question: "배색의 기본 원리가 아닌 것은?",
    options: ["통일(Unity)", "변화(Variety)", "균형(Balance)", "중복(Duplication)"],
    answer: 3,
    explanation: "배색의 기본 원리는 통일, 변화, 균형, 강조, 리듬, 비례 등입니다. 중복은 배색 원리가 아닙니다."
  },
  {
    id: 2,
    question: "배색에서 '도미넌트(Dominant)'의 의미는?",
    options: ["대비를 강조하는 것", "하나의 요소를 지배적으로 사용하는 것", "여러 색을 균등하게 사용하는 것", "무채색만 사용하는 것"],
    answer: 1,
    explanation: "도미넌트는 색상, 톤, 명도 등 특정 요소를 지배적으로 사용하여 통일감을 주는 배색 기법입니다."
  },
  {
    id: 3,
    question: "배색에서 '악센트(Accent)'의 역할은?",
    options: ["전체를 통일시킴", "단조로움을 깨고 포인트를 줌", "색을 어둡게 만듦", "색을 밝게 만듦"],
    answer: 1,
    explanation: "악센트는 배색에서 소량의 강조색을 사용하여 단조로움을 깨고 시각적 포인트를 주는 역할을 합니다."
  },
  {
    id: 4,
    question: "배색에서 색의 면적비에 대한 설명으로 옳은 것은?",
    options: ["모든 색은 같은 면적으로 사용해야 한다", "강한 색은 작은 면적, 약한 색은 큰 면적이 적절하다", "채도가 높은 색은 큰 면적이 좋다", "면적비는 중요하지 않다"],
    answer: 1,
    explanation: "고채도, 강렬한 색은 작은 면적에, 저채도, 부드러운 색은 큰 면적에 사용하는 것이 균형 있는 배색입니다."
  },
  {
    id: 5,
    question: "배색에서 '세퍼레이션(Separation)'의 역할은?",
    options: ["색을 혼합하는 것", "두 색 사이에 분리색을 넣어 조화시키는 것", "색을 제거하는 것", "색을 강조하는 것"],
    answer: 1,
    explanation: "세퍼레이션은 인접한 색 사이에 무채색 등의 분리색을 넣어 명확히 구분하고 조화롭게 만드는 기법입니다."
  },
  {
    id: 6,
    question: "배색의 통일감을 높이는 방법이 아닌 것은?",
    options: ["동일 색상 사용", "동일 톤 사용", "보색 대비 강화", "유사색 사용"],
    answer: 2,
    explanation: "보색 대비는 변화와 강조를 주는 방법입니다. 통일감은 동일 색상, 동일 톤, 유사색 등으로 높일 수 있습니다."
  },
  {
    id: 7,
    question: "그라데이션(Gradation) 배색의 특징은?",
    options: ["급격한 색 변화", "색이 점진적으로 변화하는 배색", "무작위 색 배열", "단일 색만 사용"],
    answer: 1,
    explanation: "그라데이션은 색상, 명도, 채도 등이 점진적으로 변화하는 배색으로 리듬감과 통일감을 줍니다."
  },
  {
    id: 8,
    question: "레피티션(Repetition) 배색의 특징은?",
    options: ["색의 반복 사용으로 리듬감 형성", "색의 대비 강조", "무채색만 사용", "단일 색만 사용"],
    answer: 0,
    explanation: "레피티션은 동일한 색이나 패턴을 반복 사용하여 리듬감과 통일감을 형성하는 배색 기법입니다."
  },
  {
    id: 9,
    question: "배색에서 '베이스 컬러(Base Color)'의 역할은?",
    options: ["가장 작은 면적을 차지하는 강조색", "가장 큰 면적을 차지하는 기본색", "중간 면적의 보조색", "무채색만 해당"],
    answer: 1,
    explanation: "베이스 컬러는 배색에서 가장 큰 면적을 차지하는 기본색으로, 전체 분위기를 결정합니다."
  },
  {
    id: 10,
    question: "배색에서 '어소트 컬러(Assort Color)'의 역할은?",
    options: ["가장 큰 면적의 기본색", "베이스 컬러를 보조하는 중간 면적의 색", "가장 작은 면적의 강조색", "분리색"],
    answer: 1,
    explanation: "어소트 컬러는 베이스 컬러와 악센트 컬러 사이에서 조화를 이루는 보조색입니다."
  },
  {
    id: 11,
    question: "배색 비율 70:25:5의 의미로 옳은 것은?",
    options: ["베이스:어소트:악센트 = 70:25:5", "빨강:파랑:노랑 = 70:25:5", "명도:채도:색상 = 70:25:5", "원색:중간색:파스텔 = 70:25:5"],
    answer: 0,
    explanation: "70:25:5는 배색의 면적 비율로, 베이스 컬러 70%, 어소트 컬러 25%, 악센트 컬러 5%를 의미합니다."
  },
  {
    id: 12,
    question: "색의 균형(Balance)에 대한 설명으로 옳은 것은?",
    options: ["모든 색을 같은 양으로 사용", "시각적 무게감이 균형을 이루는 것", "밝은 색만 사용", "어두운 색만 사용"],
    answer: 1,
    explanation: "색의 균형은 색의 시각적 무게감(명도, 채도, 면적 등)이 조화롭게 분배되어 안정감을 주는 것입니다."
  },
  {
    id: 13,
    question: "동시대비 효과를 고려한 배색 시 주의할 점은?",
    options: ["대비 효과를 무시한다", "인접한 색끼리 영향을 주므로 의도한 효과를 확인해야 한다", "항상 보색을 사용한다", "무채색은 사용하지 않는다"],
    answer: 1,
    explanation: "동시대비로 인해 인접한 색은 서로 영향을 주므로, 배색 시 실제 보이는 효과를 확인해야 합니다."
  },
  {
    id: 14,
    question: "명시성(Visibility)이 높은 배색의 특징은?",
    options: ["명도 대비가 낮은 배색", "명도 대비가 높은 배색", "유사색 배색", "동일 톤 배색"],
    answer: 1,
    explanation: "명시성은 색이 또렷하게 보이는 정도로, 명도 대비가 클수록 명시성이 높아집니다(예: 검정-노랑)."
  },
  {
    id: 15,
    question: "가독성(Legibility)을 높이는 배색 원칙은?",
    options: ["글자와 배경의 명도차를 줄인다", "글자와 배경의 명도차를 크게 한다", "같은 색상을 사용한다", "보색 배색을 피한다"],
    answer: 1,
    explanation: "가독성을 높이려면 글자색과 배경색의 명도차를 크게 하여 글자가 또렷이 보이도록 해야 합니다."
  },

  // 배색 기법 (16-32)
  {
    id: 16,
    question: "톤온톤(Tone on Tone) 배색의 특징은?",
    options: ["다른 색상, 같은 톤", "같은 색상, 다른 톤(명도 차이)", "보색 배색", "무채색 배색"],
    answer: 1,
    explanation: "톤온톤은 같은 색상 내에서 명도나 톤의 차이를 주는 배색으로, 통일감 있고 세련된 느낌입니다."
  },
  {
    id: 17,
    question: "톤인톤(Tone in Tone) 배색의 특징은?",
    options: ["같은 색상, 같은 톤", "같은 톤, 다른 색상", "보색 배색", "명도 대비 배색"],
    answer: 1,
    explanation: "톤인톤은 같은 톤(명도+채도) 내에서 색상을 달리하는 배색으로, 통일감과 변화를 동시에 줍니다."
  },
  {
    id: 18,
    question: "카마이유(Camaieu) 배색의 특징은?",
    options: ["대비가 강한 배색", "같은 색상의 미묘한 톤 변화로 구성", "보색을 사용한 배색", "무채색만 사용"],
    answer: 1,
    explanation: "카마이유는 같은 색상 계열에서 아주 미묘한 톤 차이만 있는 배색으로, 섬세하고 고급스러운 느낌입니다."
  },
  {
    id: 19,
    question: "포카마이유(Faux Camaieu) 배색의 특징은?",
    options: ["같은 색상만 사용", "유사색 계열에서 미묘한 변화", "보색 배색", "강한 대비 배색"],
    answer: 1,
    explanation: "포카마이유는 유사색 계열에서 미묘한 톤 변화를 주는 배색으로, 카마이유보다 약간 더 변화가 있습니다."
  },
  {
    id: 20,
    question: "비콜로르(Bicolore) 배색의 특징은?",
    options: ["단색 배색", "2색 배색", "3색 배색", "다색 배색"],
    answer: 1,
    explanation: "비콜로르는 두 가지 색만으로 구성된 배색입니다."
  },
  {
    id: 21,
    question: "트리콜로르(Tricolore) 배색의 특징은?",
    options: ["단색 배색", "2색 배색", "3색 배색", "다색 배색"],
    answer: 2,
    explanation: "트리콜로르는 세 가지 색으로 구성된 배색으로, 프랑스 국기 등이 대표적 예입니다."
  },
  {
    id: 22,
    question: "멀티컬러(Multi-color) 배색의 특징은?",
    options: ["단색만 사용", "2색만 사용", "3색만 사용", "4색 이상의 다양한 색 사용"],
    answer: 3,
    explanation: "멀티컬러는 4색 이상의 다양한 색을 사용하는 배색으로, 화려하고 역동적인 느낌을 줍니다."
  },
  {
    id: 23,
    question: "콤플리멘터리(Complementary) 배색의 특징은?",
    options: ["유사색 배색", "보색 배색", "무채색 배색", "단색 배색"],
    answer: 1,
    explanation: "콤플리멘터리(보색) 배색은 색상환에서 마주보는 두 색을 사용하여 강한 대비와 역동성을 줍니다."
  },
  {
    id: 24,
    question: "스플릿 콤플리멘터리(Split Complementary) 배색의 특징은?",
    options: ["한 색과 그 보색의 양 옆 색 사용", "두 보색만 사용", "세 보색 사용", "유사색 사용"],
    answer: 0,
    explanation: "스플릿 콤플리멘터리는 한 색과 그 보색의 양 옆에 있는 두 색을 사용하는 배색입니다."
  },
  {
    id: 25,
    question: "트라이어드(Triad) 배색의 특징은?",
    options: ["색상환에서 2등분 위치의 2색", "색상환에서 3등분 위치의 3색", "유사한 3색", "무채색 3색"],
    answer: 1,
    explanation: "트라이어드는 색상환을 3등분한 위치에 있는 세 색을 사용하는 배색(예: 빨강, 노랑, 파랑)입니다."
  },
  {
    id: 26,
    question: "테트라드(Tetrad) 배색의 특징은?",
    options: ["색상환에서 4등분 위치의 4색", "유사한 4색", "무채색 4단계", "톤이 같은 4색"],
    answer: 0,
    explanation: "테트라드는 색상환을 4등분한 위치에 있는 네 색을 사용하는 배색입니다."
  },
  {
    id: 27,
    question: "아날로거스(Analogous) 배색의 특징은?",
    options: ["보색 배색", "색상환에서 인접한 유사색 배색", "무채색 배색", "대비가 강한 배색"],
    answer: 1,
    explanation: "아날로거스(유사색) 배색은 색상환에서 인접한 2~4색을 사용하여 조화롭고 자연스러운 느낌을 줍니다."
  },
  {
    id: 28,
    question: "모노크로매틱(Monochromatic) 배색의 특징은?",
    options: ["여러 색상 사용", "하나의 색상에서 명도·채도만 변화", "보색 사용", "무채색만 사용"],
    answer: 1,
    explanation: "모노크로매틱은 하나의 색상 내에서 명도와 채도의 변화만으로 구성된 배색입니다."
  },
  {
    id: 29,
    question: "아크로매틱(Achromatic) 배색의 특징은?",
    options: ["유채색만 사용", "무채색(흰색, 회색, 검정)만 사용", "보색 사용", "난색만 사용"],
    answer: 1,
    explanation: "아크로매틱은 흰색, 회색, 검정 등 무채색만으로 구성된 배색입니다."
  },
  {
    id: 30,
    question: "도미넌트 컬러(Dominant Color) 배색의 특징은?",
    options: ["여러 색을 균등하게 사용", "하나의 색상을 지배적으로 사용", "무채색만 사용", "보색만 사용"],
    answer: 1,
    explanation: "도미넌트 컬러는 하나의 색상을 주조색으로 지배적으로 사용하여 강한 통일감을 주는 배색입니다."
  },
  {
    id: 31,
    question: "도미넌트 톤(Dominant Tone) 배색의 특징은?",
    options: ["하나의 색상만 사용", "하나의 톤을 지배적으로 사용", "무채색만 사용", "보색만 사용"],
    answer: 1,
    explanation: "도미넌트 톤은 특정 톤을 주조로 사용하여 통일된 분위기를 연출하는 배색입니다."
  },
  {
    id: 32,
    question: "콘트라스트(Contrast) 배색의 특징은?",
    options: ["유사한 색의 조합", "대비가 강한 색의 조합", "동일 톤의 조합", "무채색만 사용"],
    answer: 1,
    explanation: "콘트라스트 배색은 색상, 명도, 채도 등에서 대비가 강한 색을 조합하여 역동적인 느낌을 줍니다."
  },

  // 색채 조화론 (33-50)
  {
    id: 33,
    question: "요하네스 이텐(Johannes Itten)의 색채 조화론에서 제시한 7가지 대비가 아닌 것은?",
    options: ["색상 대비", "명암 대비", "온도 대비", "무게 대비"],
    answer: 3,
    explanation: "이텐의 7가지 대비는 색상, 명암, 한난, 보색, 동시, 채도, 면적 대비입니다. 무게 대비는 포함되지 않습니다."
  },
  {
    id: 34,
    question: "색상 대비(Hue Contrast)의 특징은?",
    options: ["밝기 차이에 의한 대비", "순수한 색상 차이에 의한 대비", "온도 차이에 의한 대비", "채도 차이에 의한 대비"],
    answer: 1,
    explanation: "색상 대비는 빨강-파랑, 노랑-보라 등 순수한 색상 차이로 인한 대비입니다."
  },
  {
    id: 35,
    question: "명암 대비(Light-Dark Contrast)의 예시로 적절한 것은?",
    options: ["빨강과 파랑", "흰색과 검정", "빨강과 녹색", "주황과 파랑"],
    answer: 1,
    explanation: "명암 대비는 밝은 색과 어두운 색의 대비로, 흰색-검정이 가장 극단적인 예입니다."
  },
  {
    id: 36,
    question: "한난 대비(Cold-Warm Contrast)의 특징은?",
    options: ["명도 차이에 의한 대비", "따뜻한 색과 차가운 색의 대비", "채도 차이에 의한 대비", "면적 차이에 의한 대비"],
    answer: 1,
    explanation: "한난 대비는 난색(따뜻한 색)과 한색(차가운 색)의 대비로, 공간감과 온도감을 표현합니다."
  },
  {
    id: 37,
    question: "보색 대비(Complementary Contrast)의 효과는?",
    options: ["차분하고 안정적", "서로의 색을 더 선명하게 돋보이게 함", "톤이 비슷해 보임", "색상이 사라져 보임"],
    answer: 1,
    explanation: "보색 대비는 색상환에서 마주보는 색의 대비로, 서로의 채도를 높여 더 선명하게 보이게 합니다."
  },
  {
    id: 38,
    question: "동시 대비(Simultaneous Contrast)의 특징은?",
    options: ["시간이 지나야 나타나는 대비", "인접한 색이 서로 영향을 주어 다르게 보이는 현상", "보색끼리의 대비", "명도 차이의 대비"],
    answer: 1,
    explanation: "동시 대비는 인접한 색이 서로 영향을 주어 실제와 다르게 보이는 현상입니다."
  },
  {
    id: 39,
    question: "채도 대비(Saturation Contrast)의 특징은?",
    options: ["밝기 차이에 의한 대비", "선명한 색과 탁한 색의 대비", "온도 차이에 의한 대비", "면적 차이에 의한 대비"],
    answer: 1,
    explanation: "채도 대비는 선명한 색(고채도)과 탁한 색(저채도) 간의 대비입니다."
  },
  {
    id: 40,
    question: "면적 대비(Extension Contrast)의 특징은?",
    options: ["색의 면적 비율에 따라 느낌이 달라지는 것", "명도 차이에 의한 대비", "채도 차이에 의한 대비", "온도 차이에 의한 대비"],
    answer: 0,
    explanation: "면적 대비는 같은 색이라도 면적의 크기에 따라 다르게 느껴지는 현상입니다."
  },
  {
    id: 41,
    question: "셰브뢸(Chevreul)의 색채 조화론의 핵심 개념은?",
    options: ["색의 물리적 특성", "동시 대비 현상", "색의 온도", "색의 무게"],
    answer: 1,
    explanation: "미셸 외젠 셰브뢸은 동시 대비 현상을 연구하여 색채 조화론의 기초를 마련했습니다."
  },
  {
    id: 42,
    question: "문-스펜서(Moon-Spencer)의 색채 조화론에서 조화의 종류가 아닌 것은?",
    options: ["동일 조화", "유사 조화", "대비 조화", "무작위 조화"],
    answer: 3,
    explanation: "문-스펜서의 조화론은 동일, 유사, 대비 조화의 세 가지 영역으로 구분합니다."
  },
  {
    id: 43,
    question: "오스트발트의 색채 조화론에서 조화로운 배색의 조건은?",
    options: ["무작위 배색", "공통 요소(등순색, 등백색, 등흑색)가 있는 배색", "보색만 사용", "난색만 사용"],
    answer: 1,
    explanation: "오스트발트는 등순색, 등백색, 등흑색 등 공통 요소가 있는 색들이 조화를 이룬다고 했습니다."
  },
  {
    id: 44,
    question: "먼셀의 색채 조화론에서 제안한 조화 방법은?",
    options: ["무채색만 사용", "보색끼리만 배색", "색입체에서 일정한 관계에 있는 색의 조합", "난색만 사용"],
    answer: 2,
    explanation: "먼셀은 색입체 내에서 수직, 수평, 대각선 등 일정한 기하학적 관계에 있는 색이 조화를 이룬다고 했습니다."
  },
  {
    id: 45,
    question: "저드(Judd)의 색채 조화 원리가 아닌 것은?",
    options: ["질서의 원리", "명료성의 원리", "유사의 원리", "복잡성의 원리"],
    answer: 3,
    explanation: "저드의 4가지 색채 조화 원리는 질서, 명료성(애매함 회피), 유사, 친근성(비친근성 회피)입니다."
  },
  {
    id: 46,
    question: "잔상(After-image)을 이용한 배색 효과로 옳은 것은?",
    options: ["빨강을 보면 녹색 잔상이 나타남", "빨강을 보면 파란 잔상이 나타남", "흰색을 보면 검정 잔상이 나타남", "잔상은 나타나지 않음"],
    answer: 0,
    explanation: "보색 잔상 현상에 의해 빨강을 오래 보면 녹색 잔상이, 파랑을 보면 주황 잔상이 나타납니다."
  },
  {
    id: 47,
    question: "색채 조화에서 '자연의 질서'를 따르는 배색의 예시는?",
    options: ["인공적인 형광색 배색", "노을의 색(빨강-주황-노랑 그라데이션)", "무작위 색 배열", "흑백 대비만 사용"],
    answer: 1,
    explanation: "자연에서 볼 수 있는 색의 배열(노을, 무지개, 단풍 등)은 자연스럽고 조화로운 배색의 좋은 예입니다."
  },
  {
    id: 48,
    question: "배색에서 '부조화'를 의도적으로 사용하는 이유는?",
    options: ["항상 피해야 하므로 사용하지 않음", "시선 집중, 긴장감, 독창성 표현을 위해", "비용 절감을 위해", "색이 부족할 때"],
    answer: 1,
    explanation: "의도적 부조화는 시선을 집중시키거나 긴장감, 독창성을 표현하기 위해 사용되기도 합니다."
  },
  {
    id: 49,
    question: "색채 조화에서 '황금비율'과 관련된 배색 비율은?",
    options: ["50:50", "약 62:38 또는 70:30", "90:10", "25:75"],
    answer: 1,
    explanation: "황금비율(약 1:1.618)을 적용한 배색 비율은 약 62:38 또는 이에 가까운 70:30이 조화롭습니다."
  },
  {
    id: 50,
    question: "색채 조화를 높이기 위한 일반적인 원칙이 아닌 것은?",
    options: ["공통 요소 부여", "적절한 대비와 통일의 균형", "색의 면적비 고려", "항상 최대한 많은 색 사용"],
    answer: 3,
    explanation: "색채 조화는 공통 요소, 대비와 통일의 균형, 적절한 면적비 등이 중요합니다. 너무 많은 색은 오히려 부조화를 유발합니다."
  }
];

export default function ColorHarmonyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('colorist-engineer-color-harmony-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
      setCurrentQuestion(data.current || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorist-engineer-color-harmony-progress', JSON.stringify({
      score, answered: Array.from(answeredQuestions), current: currentQuestion
    }));
  }, [score, answeredQuestions, currentQuestion]);

  const handleAnswer = (index: number) => {
    if (answeredQuestions.has(currentQuestion)) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    const newAnswered = new Set(answeredQuestions);
    newAnswered.add(currentQuestion);
    setAnsweredQuestions(newAnswered);
    if (index === questions[currentQuestion].answer) setScore(score + 1);
    if (newAnswered.size === questions.length) setIsComplete(true);
  };

  const nextQuestion = () => { if (currentQuestion < questions.length - 1) { setCurrentQuestion(currentQuestion + 1); setSelectedAnswer(null); setShowExplanation(false); } };
  const prevQuestion = () => { if (currentQuestion > 0) { setCurrentQuestion(currentQuestion - 1); setSelectedAnswer(null); setShowExplanation(false); } };
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); setScore(0); setAnsweredQuestions(new Set()); setIsComplete(false); localStorage.removeItem('colorist-engineer-color-harmony-progress'); };
  const goToQuestion = (index: number) => { setCurrentQuestion(index); setSelectedAnswer(null); setShowExplanation(false); };

  const question = questions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-pink-100 mb-2">
            <Link href="/category/design/colorist-engineer" className="hover:text-white transition-colors">컬러리스트기사</Link>
            <span>/</span><span>색채조화</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">색채조화</h1>
          <p className="text-pink-100">배색 원리, 배색 기법, 색채 조화론</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div><span className="text-gray-600">진행률</span><span className="ml-2 font-bold text-pink-600">{answeredQuestions.size}/{questions.length}</span></div>
            <div><span className="text-gray-600">점수</span><span className="ml-2 font-bold text-purple-600">{score}점</span></div>
            <button onClick={resetQuiz} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">초기화</button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => (<button key={index} onClick={() => goToQuestion(index)} className={`w-10 h-10 rounded-lg font-medium transition-all ${currentQuestion === index ? 'bg-pink-600 text-white' : answeredQuestions.has(index) ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{index + 1}</button>))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-medium">문제 {currentQuestion + 1}</span>
            {currentQuestion < 15 && <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">배색 원리</span>}
            {currentQuestion >= 15 && currentQuestion < 32 && <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">배색 기법</span>}
            {currentQuestion >= 32 && <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">색채 조화론</span>}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h2>
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (<button key={index} onClick={() => handleAnswer(index)} disabled={answeredQuestions.has(currentQuestion)} className={`w-full p-4 text-left rounded-xl border-2 transition-all ${answeredQuestions.has(currentQuestion) ? index === question.answer ? 'border-green-500 bg-green-50 text-green-700' : selectedAnswer === index ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 bg-gray-50 text-gray-500' : 'border-gray-200 hover:border-pink-400 hover:bg-pink-50'}`}><span className="font-medium mr-3">{index + 1}.</span>{option}</button>))}
          </div>
          {showExplanation && (<div className={`p-6 rounded-xl ${selectedAnswer === question.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}><div className="flex items-center gap-2 mb-2">{selectedAnswer === question.answer ? <span className="text-green-600 font-bold">✓ 정답입니다!</span> : <span className="text-red-600 font-bold">✗ 오답입니다. 정답은 {question.answer + 1}번입니다.</span>}</div><p className="text-gray-700">{question.explanation}</p></div>)}
        </div>

        <div className="flex justify-between">
          <button onClick={prevQuestion} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors font-medium">← 이전 문제</button>
          <button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium">다음 문제 →</button>
        </div>

        {isComplete && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-8 max-w-md w-full text-center"><div className="text-6xl mb-4">🎨</div><h3 className="text-2xl font-bold text-gray-800 mb-2">학습 완료!</h3><p className="text-gray-600 mb-4">색채조화 과목을 모두 풀었습니다.</p><div className="text-4xl font-bold text-pink-600 mb-6">{score} / {questions.length}</div><div className="flex gap-3 justify-center"><button onClick={resetQuiz} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium">다시 풀기</button><Link href="/category/design/colorist-engineer" className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl transition-colors font-medium">메인으로</Link></div></div></div>)}
      </div>
    </div>
  );
}
