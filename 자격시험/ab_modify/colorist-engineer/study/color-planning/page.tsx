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
  // 색채 마케팅 (1-15)
  {
    id: 1,
    question: "색채 마케팅(Color Marketing)의 정의로 옳은 것은?",
    options: ["색을 사용하지 않는 마케팅", "색채를 활용하여 소비자의 감성에 호소하고 구매를 유도하는 전략", "흑백 광고만 사용하는 마케팅", "가격 경쟁 위주의 마케팅"],
    answer: 1,
    explanation: "색채 마케팅은 색채의 심리적 효과를 활용하여 소비자의 감성에 호소하고 구매 결정에 영향을 주는 마케팅 전략입니다."
  },
  {
    id: 2,
    question: "브랜드 컬러(Brand Color)의 역할로 적절하지 않은 것은?",
    options: ["브랜드 인지도 향상", "브랜드 차별화", "생산 비용 절감", "브랜드 이미지 구축"],
    answer: 2,
    explanation: "브랜드 컬러는 인지도 향상, 차별화, 이미지 구축에 기여합니다. 생산 비용과는 직접적 관련이 없습니다."
  },
  {
    id: 3,
    question: "코카콜라의 브랜드 컬러인 빨간색이 전달하는 이미지는?",
    options: ["차분함, 신뢰", "열정, 에너지, 활력", "자연, 건강", "고급, 신비"],
    answer: 1,
    explanation: "코카콜라의 빨간색은 열정, 에너지, 활력, 젊음의 이미지를 전달합니다."
  },
  {
    id: 4,
    question: "색채 트렌드(Color Trend)의 특징으로 옳은 것은?",
    options: ["영원히 변하지 않음", "사회, 문화, 경제적 변화에 따라 주기적으로 변화", "개인의 취향만 반영", "물리적 특성만 고려"],
    answer: 1,
    explanation: "색채 트렌드는 사회, 문화, 경제, 기술 등의 변화에 따라 주기적으로 변하며, 시대 정신을 반영합니다."
  },
  {
    id: 5,
    question: "색채 트렌드를 예측하고 발표하는 기관이 아닌 것은?",
    options: ["Pantone", "WGSN", "Intercolor", "NASA"],
    answer: 3,
    explanation: "Pantone, WGSN, Intercolor는 색채 트렌드 예측 기관입니다. NASA는 항공우주 기관입니다."
  },
  {
    id: 6,
    question: "'올해의 컬러(Color of the Year)'를 매년 발표하는 기관은?",
    options: ["애플", "삼성", "Pantone", "구글"],
    answer: 2,
    explanation: "Pantone은 매년 '올해의 컬러'를 선정하여 발표하며, 이는 디자인 트렌드에 큰 영향을 줍니다."
  },
  {
    id: 7,
    question: "제품 색채 계획 시 고려해야 할 요소가 아닌 것은?",
    options: ["타겟 소비자", "브랜드 아이덴티티", "경쟁사와의 무조건적 동일화", "시장 트렌드"],
    answer: 2,
    explanation: "제품 색채 계획 시 타겟, 브랜드, 트렌드 등을 고려하지만, 경쟁사와 무조건 같아질 필요는 없습니다."
  },
  {
    id: 8,
    question: "패키지 디자인에서 색채의 역할이 아닌 것은?",
    options: ["제품 주목도 향상", "브랜드 인지", "내용물 보호 기능", "구매 유도"],
    answer: 2,
    explanation: "패키지 색채는 주목도, 브랜드 인지, 구매 유도에 기여합니다. 내용물 보호는 재질의 역할입니다."
  },
  {
    id: 9,
    question: "식품 패키지에서 녹색을 많이 사용하는 이유는?",
    options: ["위험을 강조하기 위해", "자연, 신선, 건강의 이미지 전달", "고급스러움을 표현하기 위해", "차가움을 전달하기 위해"],
    answer: 1,
    explanation: "식품 패키지의 녹색은 자연, 신선함, 건강, 유기농 등의 긍정적 이미지를 전달합니다."
  },
  {
    id: 10,
    question: "고급 화장품 브랜드에서 주로 사용하는 색채 전략은?",
    options: ["밝고 화려한 원색", "검정, 금색, 은색 등 고급스러운 색", "형광색 위주", "모든 색을 균등하게 사용"],
    answer: 1,
    explanation: "고급 화장품은 검정, 금색, 은색, 딥톤 등을 사용하여 고급스럽고 세련된 이미지를 표현합니다."
  },
  {
    id: 11,
    question: "색채 마케팅에서 '색채 포지셔닝'의 의미는?",
    options: ["색의 물리적 위치", "시장에서 색채를 통해 브랜드/제품의 위치를 정립하는 것", "색상환에서의 위치", "색의 명도 위치"],
    answer: 1,
    explanation: "색채 포지셔닝은 시장에서 색채를 통해 브랜드나 제품의 고유한 위치와 이미지를 정립하는 전략입니다."
  },
  {
    id: 12,
    question: "타겟 마케팅에서 연령대별 색채 선호도 고려가 중요한 이유는?",
    options: ["비용 절감", "연령대별로 색채 선호와 반응이 다르기 때문", "법적 규제 때문", "생산 편의"],
    answer: 1,
    explanation: "연령대별로 색채 선호도와 심리적 반응이 다르므로, 타겟에 맞는 색채 전략이 필요합니다."
  },
  {
    id: 13,
    question: "성별에 따른 색채 마케팅 전략으로 일반적인 것은?",
    options: ["남녀 모두 같은 색 사용", "여성용 제품에 파스텔톤, 분홍 계열 많이 사용", "남성용 제품에 분홍만 사용", "성별은 색채 선호와 무관"],
    answer: 1,
    explanation: "일반적으로 여성용 제품은 파스텔톤, 분홍 계열, 남성용은 진하고 강한 색을 많이 사용합니다(스테레오타입)."
  },
  {
    id: 14,
    question: "글로벌 마케팅에서 색채 전략 수립 시 고려할 점은?",
    options: ["한 국가의 선호만 고려", "문화권별 색채 의미와 선호도 차이 고려", "색채를 사용하지 않음", "모든 국가에 동일한 색 적용"],
    answer: 1,
    explanation: "문화권별로 색채의 의미와 선호가 다르므로, 글로벌 마케팅에서는 이를 고려한 현지화가 필요합니다."
  },
  {
    id: 15,
    question: "색채 마케팅의 효과 측정 방법이 아닌 것은?",
    options: ["소비자 인지도 조사", "구매 전환율 분석", "날씨 변화 측정", "브랜드 연상 조사"],
    answer: 2,
    explanation: "색채 마케팅 효과는 인지도, 구매율, 브랜드 연상 등으로 측정합니다. 날씨는 관련이 없습니다."
  },

  // 환경색채 (16-30)
  {
    id: 16,
    question: "환경색채(Environmental Color)의 정의로 옳은 것은?",
    options: ["자연환경만의 색", "인간이 생활하는 공간의 색채 계획", "개인 의복의 색", "식품의 색"],
    answer: 1,
    explanation: "환경색채는 도시, 건축, 인테리어 등 인간이 생활하는 공간의 색채를 계획하고 관리하는 것입니다."
  },
  {
    id: 17,
    question: "도시색채(Urban Color)의 구성 요소가 아닌 것은?",
    options: ["건축물 외관색", "간판색", "개인 의복색", "가로시설물 색"],
    answer: 2,
    explanation: "도시색채는 건축물, 간판, 가로시설물, 포장 등 도시 환경을 구성하는 색입니다. 개인 의복은 포함되지 않습니다."
  },
  {
    id: 18,
    question: "경관색채 계획의 목적으로 적절하지 않은 것은?",
    options: ["도시 미관 향상", "지역 정체성 확립", "시각적 혼란 유발", "쾌적한 환경 조성"],
    answer: 2,
    explanation: "경관색채 계획은 도시 미관, 지역 정체성, 쾌적한 환경 조성을 목적으로 합니다."
  },
  {
    id: 19,
    question: "건축 외장색 계획 시 고려사항이 아닌 것은?",
    options: ["주변 환경과의 조화", "건물의 용도와 성격", "개인의 일시적 기분", "지역 색채 가이드라인"],
    answer: 2,
    explanation: "건축 외장색은 주변 환경, 건물 용도, 지역 가이드라인 등을 고려해야 합니다. 개인 기분은 객관적 기준이 아닙니다."
  },
  {
    id: 20,
    question: "인테리어 색채 계획에서 천장, 벽, 바닥의 명도 배치로 일반적인 것은?",
    options: ["천장 < 벽 < 바닥 (명도)", "천장 > 벽 > 바닥 (명도)", "모두 같은 명도", "바닥 > 천장 > 벽 (명도)"],
    answer: 1,
    explanation: "일반적으로 천장이 가장 밝고, 벽, 바닥 순으로 명도를 낮추면 안정감 있는 공간이 됩니다."
  },
  {
    id: 21,
    question: "좁은 공간을 넓어 보이게 하는 색채 전략은?",
    options: ["어둡고 진한 색 사용", "밝고 한색 계열 사용", "강렬한 난색 사용", "검정 사용"],
    answer: 1,
    explanation: "밝은 색(고명도)과 한색 계열은 공간을 넓고 시원하게 보이게 합니다."
  },
  {
    id: 22,
    question: "병원, 의료시설의 인테리어 색채로 적절한 것은?",
    options: ["강렬한 빨강", "연녹색, 연파랑 등 안정감 있는 색", "검정과 빨강", "형광색"],
    answer: 1,
    explanation: "병원은 환자에게 안정감과 청결감을 주는 연녹색, 연파랑 등을 주로 사용합니다."
  },
  {
    id: 23,
    question: "유아 시설의 색채 계획 시 고려할 점은?",
    options: ["무채색만 사용", "밝고 다양한 색으로 자극 제공, 과자극 방지", "어둡고 차분한 색만 사용", "단일 색상만 사용"],
    answer: 1,
    explanation: "유아 시설은 밝고 다양한 색으로 시각적 자극을 제공하되, 과도한 자극은 피해야 합니다."
  },
  {
    id: 24,
    question: "사무 공간의 색채 계획 목표로 적절한 것은?",
    options: ["흥분과 자극", "집중력 향상과 피로 감소", "최대한 화려하게", "어둡고 무거운 분위기"],
    answer: 1,
    explanation: "사무 공간은 집중력 향상, 피로 감소, 쾌적함을 목표로 중성적이고 차분한 색을 사용합니다."
  },
  {
    id: 25,
    question: "상업 공간(매장) 색채 계획의 주요 목표는?",
    options: ["고객을 빨리 내보내기", "구매 욕구 자극과 브랜드 이미지 전달", "최대한 어둡게", "색을 사용하지 않음"],
    answer: 1,
    explanation: "상업 공간은 구매 욕구 자극, 브랜드 이미지 전달, 고객 체류 시간 조절 등을 목표로 합니다."
  },
  {
    id: 26,
    question: "파사드(Facade) 색채의 의미는?",
    options: ["인테리어 색", "건물 외관(정면) 색채", "지붕 색", "바닥 색"],
    answer: 1,
    explanation: "파사드는 건물의 외관, 특히 정면을 의미하며, 도시경관에 큰 영향을 줍니다."
  },
  {
    id: 27,
    question: "가로시설물 색채 계획 시 고려할 점은?",
    options: ["개별적으로 화려하게", "주변 환경과 조화, 통일성, 기능성", "무채색만 사용", "각각 다른 색 사용"],
    answer: 1,
    explanation: "가로시설물(벤치, 가로등 등)은 주변 환경과 조화, 통일성, 기능적 인지성을 고려해야 합니다."
  },
  {
    id: 28,
    question: "지역 색채(Local Color)의 의미는?",
    options: ["개인 선호색", "해당 지역의 자연환경, 역사, 문화를 반영한 고유 색채", "유행색", "국제 표준색"],
    answer: 1,
    explanation: "지역 색채는 해당 지역의 자연환경, 역사, 문화, 전통을 반영한 고유한 색채 특성입니다."
  },
  {
    id: 29,
    question: "색채 가이드라인(Color Guideline)의 목적은?",
    options: ["색채 사용 금지", "일관된 색채 적용을 위한 기준 제공", "모든 색을 자유롭게 사용", "특정 색만 강제"],
    answer: 1,
    explanation: "색채 가이드라인은 도시, 브랜드 등에서 일관되고 조화로운 색채 적용을 위한 기준을 제공합니다."
  },
  {
    id: 30,
    question: "조명과 색채의 관계로 옳은 것은?",
    options: ["조명은 색채에 영향을 주지 않음", "광원의 종류에 따라 색의 보임이 달라짐", "형광등과 백열등에서 색은 같게 보임", "어두운 곳에서 색이 더 선명해짐"],
    answer: 1,
    explanation: "광원(백열등, 형광등, LED 등)의 색온도와 연색성에 따라 물체색이 다르게 보입니다."
  },

  // 색채 디자인 실무 (31-50)
  {
    id: 31,
    question: "색채 기획서(Color Planning Document)에 포함되어야 할 내용이 아닌 것은?",
    options: ["콘셉트", "색채 팔레트", "날씨 예보", "적용 범위"],
    answer: 2,
    explanation: "색채 기획서에는 콘셉트, 색채 팔레트, 적용 범위, 배색 가이드 등이 포함됩니다. 날씨 예보는 무관합니다."
  },
  {
    id: 32,
    question: "색채 조사(Color Survey) 방법이 아닌 것은?",
    options: ["현장 색채 조사", "문헌 조사", "트렌드 분석", "음악 분석"],
    answer: 3,
    explanation: "색채 조사에는 현장 조사, 문헌 조사, 트렌드 분석, 경쟁사 분석 등이 포함됩니다."
  },
  {
    id: 33,
    question: "색채 분석(Color Analysis)에서 사용하는 도구가 아닌 것은?",
    options: ["색채 견본첩", "측색기", "체중계", "색상환"],
    answer: 2,
    explanation: "색채 분석에는 색채 견본첩, 측색기, 색상환, 이미지 스케일 등을 사용합니다."
  },
  {
    id: 34,
    question: "색채 콘셉트(Color Concept) 설정 시 고려사항이 아닌 것은?",
    options: ["타겟", "브랜드 아이덴티티", "경쟁사 무시", "시장 트렌드"],
    answer: 2,
    explanation: "색채 콘셉트 설정 시 타겟, 브랜드, 트렌드, 경쟁사 분석 등을 종합적으로 고려해야 합니다."
  },
  {
    id: 35,
    question: "색채 팔레트(Color Palette) 개발 과정의 순서로 옳은 것은?",
    options: ["적용 → 조사 → 콘셉트 → 개발", "조사 → 콘셉트 → 개발 → 적용", "개발 → 조사 → 적용 → 콘셉트", "콘셉트 → 적용 → 조사 → 개발"],
    answer: 1,
    explanation: "색채 팔레트 개발은 조사 → 콘셉트 설정 → 팔레트 개발 → 적용의 순서로 진행됩니다."
  },
  {
    id: 36,
    question: "CMF(Color, Material, Finish) 디자인의 의미는?",
    options: ["색채만 디자인", "색, 재료, 마감을 통합적으로 디자인", "마감만 디자인", "재료만 선택"],
    answer: 1,
    explanation: "CMF 디자인은 색채(Color), 재료(Material), 마감(Finish)을 통합적으로 계획하는 것입니다."
  },
  {
    id: 37,
    question: "제품 색채 개발에서 '시즌 컬러'의 의미는?",
    options: ["한 가지 색만 사용", "계절별 트렌드를 반영한 색채", "영구적으로 사용하는 색", "무채색만 해당"],
    answer: 1,
    explanation: "시즌 컬러는 봄, 여름, 가을, 겨울 등 계절별 트렌드와 감성을 반영한 색채입니다."
  },
  {
    id: 38,
    question: "색채 프레젠테이션에서 중요한 요소가 아닌 것은?",
    options: ["색채 시안 제시", "콘셉트 설명", "개인적 감정 호소만", "적용 예시 제시"],
    answer: 2,
    explanation: "색채 프레젠테이션은 시안, 콘셉트, 적용 예시 등을 논리적으로 제시해야 합니다."
  },
  {
    id: 39,
    question: "색채 품질 관리(Color Quality Control)의 목적은?",
    options: ["색을 자유롭게 변경", "기획된 색채를 정확하게 재현하고 유지", "색을 사용하지 않음", "비용 무시"],
    answer: 1,
    explanation: "색채 품질 관리는 기획된 색채가 생산, 인쇄 등에서 정확하게 재현되고 유지되도록 하는 것입니다."
  },
  {
    id: 40,
    question: "색차(ΔE) 관리에서 일반적으로 허용되는 색차 범위는?",
    options: ["ΔE 0만 허용", "ΔE 3 이하 (일반), ΔE 1 이하 (정밀)", "ΔE 10 이상", "색차 관리 불필요"],
    answer: 1,
    explanation: "일반적으로 ΔE 3 이하는 눈에 띄지 않는 수준, 정밀 관리가 필요한 경우 ΔE 1 이하를 목표로 합니다."
  },
  {
    id: 41,
    question: "디지털 색채와 인쇄 색채의 차이점은?",
    options: ["차이 없음", "디지털은 가산혼합(RGB), 인쇄는 감산혼합(CMYK)", "둘 다 RGB 사용", "둘 다 CMYK 사용"],
    answer: 1,
    explanation: "디지털 화면은 RGB 가산혼합, 인쇄는 CMYK 감산혼합을 사용하므로 색 재현이 다릅니다."
  },
  {
    id: 42,
    question: "색교정(Color Correction)의 목적은?",
    options: ["색을 없애는 것", "의도한 색을 정확하게 재현하기 위한 조정", "색을 무작위로 변경", "흑백으로 변환"],
    answer: 1,
    explanation: "색교정은 촬영, 인쇄 등에서 의도한 색이 정확하게 재현되도록 조정하는 작업입니다."
  },
  {
    id: 43,
    question: "컬러 프루프(Color Proof)의 역할은?",
    options: ["최종 출력물 전에 색채 확인용 샘플 제작", "색채 제거", "무채색 변환", "색차 증가"],
    answer: 0,
    explanation: "컬러 프루프는 최종 인쇄 전에 색채를 미리 확인하고 검토하기 위한 샘플입니다."
  },
  {
    id: 44,
    question: "지속가능한 색채 디자인(Sustainable Color Design)의 고려사항은?",
    options: ["환경 영향 무시", "친환경 염료, 재활용 고려", "비용만 고려", "트렌드만 따름"],
    answer: 1,
    explanation: "지속가능한 색채 디자인은 친환경 염료, 재활용 가능성, 환경 영향 등을 고려합니다."
  },
  {
    id: 45,
    question: "유니버설 색채 디자인(Universal Color Design)의 목적은?",
    options: ["특정인만을 위한 디자인", "색각 이상자 등 모든 사람이 사용하기 쉬운 색채 계획", "가장 화려한 색 사용", "무채색만 사용"],
    answer: 1,
    explanation: "유니버설 색채 디자인은 색각 이상자, 고령자 등 다양한 사용자가 인지하기 쉬운 색채를 계획합니다."
  },
  {
    id: 46,
    question: "색각 이상자를 위한 색채 디자인 원칙이 아닌 것은?",
    options: ["명도 대비 강화", "빨강-녹색 조합 회피 또는 보조 수단 추가", "색에만 정보 의존", "패턴, 텍스트 등 보조 요소 활용"],
    answer: 2,
    explanation: "색각 이상자를 위해서는 색에만 의존하지 않고 명도 대비, 패턴, 텍스트 등을 함께 사용해야 합니다."
  },
  {
    id: 47,
    question: "색채 디자인에서 '프로토타입(Prototype)'의 역할은?",
    options: ["최종 제품", "디자인 검토를 위한 시제품/샘플", "색채 제거", "생산 완료"],
    answer: 1,
    explanation: "프로토타입은 최종 생산 전 디자인, 색채 등을 검토하고 수정하기 위한 시제품입니다."
  },
  {
    id: 48,
    question: "색채 디자인 프로젝트의 일반적인 진행 단계 순서는?",
    options: ["생산 → 기획 → 조사 → 개발", "조사 → 기획 → 개발 → 적용 → 평가", "평가 → 개발 → 기획 → 조사", "적용 → 평가 → 조사 → 기획"],
    answer: 1,
    explanation: "색채 프로젝트는 일반적으로 조사 → 기획 → 개발 → 적용 → 평가의 순서로 진행됩니다."
  },
  {
    id: 49,
    question: "색채 디자인에서 '피드백(Feedback)'의 중요성은?",
    options: ["불필요함", "클라이언트/사용자 반응을 반영하여 개선", "디자이너 의견만 중요", "한 번에 완성해야 함"],
    answer: 1,
    explanation: "피드백을 통해 클라이언트와 사용자의 반응을 파악하고 디자인을 개선할 수 있습니다."
  },
  {
    id: 50,
    question: "성공적인 색채 디자인의 조건이 아닌 것은?",
    options: ["목적에 부합", "타겟에 적합", "개인 취향만 반영", "일관성 있는 적용"],
    answer: 2,
    explanation: "성공적인 색채 디자인은 목적, 타겟, 일관성, 트렌드 등을 종합적으로 고려해야 합니다."
  }
];

export default function ColorPlanningPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('colorist-engineer-color-planning-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
      setCurrentQuestion(data.current || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorist-engineer-color-planning-progress', JSON.stringify({
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
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); setScore(0); setAnsweredQuestions(new Set()); setIsComplete(false); localStorage.removeItem('colorist-engineer-color-planning-progress'); };
  const goToQuestion = (index: number) => { setCurrentQuestion(index); setSelectedAnswer(null); setShowExplanation(false); };

  const question = questions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-pink-100 mb-2">
            <Link href="/category/design/colorist-engineer" className="hover:text-white transition-colors">컬러리스트기사</Link>
            <span>/</span><span>색채계획</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">색채계획</h1>
          <p className="text-pink-100">색채 마케팅, 환경색채, 색채 디자인 실무</p>
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
            {currentQuestion < 15 && <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">색채 마케팅</span>}
            {currentQuestion >= 15 && currentQuestion < 30 && <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">환경색채</span>}
            {currentQuestion >= 30 && <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">색채 디자인 실무</span>}
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

        {isComplete && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-8 max-w-md w-full text-center"><div className="text-6xl mb-4">🎨</div><h3 className="text-2xl font-bold text-gray-800 mb-2">학습 완료!</h3><p className="text-gray-600 mb-4">색채계획 과목을 모두 풀었습니다.</p><div className="text-4xl font-bold text-pink-600 mb-6">{score} / {questions.length}</div><div className="flex gap-3 justify-center"><button onClick={resetQuiz} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium">다시 풀기</button><Link href="/category/design/colorist-engineer" className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl transition-colors font-medium">메인으로</Link></div></div></div>)}
      </div>
    </div>
  );
}
