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
  // 색채 감정 (1-12)
  {
    id: 1,
    question: "빨강색이 주는 일반적인 심리 효과로 적절하지 않은 것은?",
    options: ["열정, 에너지", "흥분, 자극", "차분함, 안정", "위험, 경고"],
    answer: 2,
    explanation: "빨강은 열정, 흥분, 에너지, 위험 등의 감정을 유발합니다. 차분함과 안정은 파랑 계열의 효과입니다."
  },
  {
    id: 2,
    question: "파랑색이 주는 심리 효과로 옳은 것은?",
    options: ["흥분, 자극", "안정, 신뢰, 차분함", "경고, 주의", "식욕 증진"],
    answer: 1,
    explanation: "파랑은 안정감, 신뢰, 차분함, 시원함 등의 감정을 유발합니다. 기업 로고에 많이 사용됩니다."
  },
  {
    id: 3,
    question: "노랑색이 주는 심리 효과로 적절한 것은?",
    options: ["우울, 침체", "명랑, 밝음, 주의", "차가움, 냉정", "무거움, 안정"],
    answer: 1,
    explanation: "노랑은 명랑, 밝음, 희망, 주의를 환기시키는 효과가 있습니다. 주의 표지판에 사용됩니다."
  },
  {
    id: 4,
    question: "녹색이 주는 심리 효과로 옳은 것은?",
    options: ["긴장, 흥분", "자연, 평화, 안정", "위험, 경고", "화려함, 고급"],
    answer: 1,
    explanation: "녹색은 자연, 평화, 안정, 조화, 휴식 등의 감정을 유발합니다. 친환경 이미지에 많이 사용됩니다."
  },
  {
    id: 5,
    question: "보라색이 주는 심리 효과로 적절한 것은?",
    options: ["활기, 에너지", "고귀함, 신비, 창의성", "자연, 건강", "단순함, 실용"],
    answer: 1,
    explanation: "보라는 고귀함, 신비, 창의성, 영성, 왕족 등의 이미지를 가집니다."
  },
  {
    id: 6,
    question: "주황색이 주는 심리 효과로 옳은 것은?",
    options: ["차분함, 안정", "활력, 친근함, 따뜻함", "우아함, 세련됨", "슬픔, 우울"],
    answer: 1,
    explanation: "주황은 활력, 친근함, 따뜻함, 긍정의 감정을 유발합니다. 빨강보다 부드러운 느낌입니다."
  },
  {
    id: 7,
    question: "흰색이 주는 심리 효과로 적절한 것은?",
    options: ["무거움, 안정", "순수, 깨끗함, 신선함", "우울, 슬픔", "열정, 흥분"],
    answer: 1,
    explanation: "흰색은 순수, 깨끗함, 신선함, 순결, 시작 등의 이미지를 가집니다."
  },
  {
    id: 8,
    question: "검정색이 주는 심리 효과로 옳지 않은 것은?",
    options: ["고급, 세련됨", "권위, 힘", "순수, 밝음", "신비, 엄숙"],
    answer: 2,
    explanation: "검정은 고급, 세련됨, 권위, 신비, 엄숙함 등의 이미지를 가집니다. 순수와 밝음은 흰색의 이미지입니다."
  },
  {
    id: 9,
    question: "색의 온도감에 대한 설명으로 옳은 것은?",
    options: ["파랑은 따뜻한 느낌을 준다", "빨강은 차가운 느낌을 준다", "난색은 따뜻한 느낌, 한색은 차가운 느낌을 준다", "모든 색은 같은 온도감을 가진다"],
    answer: 2,
    explanation: "난색(빨강, 주황, 노랑)은 따뜻한 느낌, 한색(파랑, 청록)은 차가운 느낌을 줍니다."
  },
  {
    id: 10,
    question: "색의 중량감에 대한 설명으로 옳은 것은?",
    options: ["밝은 색이 무겁게 느껴진다", "어두운 색이 가볍게 느껴진다", "명도가 낮을수록 무겁게 느껴진다", "채도가 높을수록 무겁게 느껴진다"],
    answer: 2,
    explanation: "색의 중량감은 주로 명도에 영향을 받으며, 명도가 낮을수록(어두울수록) 무겁게 느껴집니다."
  },
  {
    id: 11,
    question: "색의 진출·후퇴감에 대한 설명으로 옳은 것은?",
    options: ["한색이 진출해 보인다", "난색이 후퇴해 보인다", "난색, 고명도, 고채도는 진출해 보인다", "한색, 고명도는 진출해 보인다"],
    answer: 2,
    explanation: "난색, 고명도, 고채도의 색은 진출해 보이고, 한색, 저명도, 저채도의 색은 후퇴해 보입니다."
  },
  {
    id: 12,
    question: "색의 팽창·수축감에 대한 설명으로 옳은 것은?",
    options: ["검정은 팽창해 보인다", "흰색은 수축해 보인다", "밝은 색은 팽창, 어두운 색은 수축해 보인다", "채도가 낮을수록 팽창해 보인다"],
    answer: 2,
    explanation: "밝은 색(고명도)은 팽창해 보이고, 어두운 색(저명도)은 수축해 보입니다."
  },

  // 색채 연상 (13-25)
  {
    id: 13,
    question: "색채의 구체적 연상에 해당하는 것은?",
    options: ["빨강 - 정열", "파랑 - 바다, 하늘", "노랑 - 희망", "검정 - 권위"],
    answer: 1,
    explanation: "구체적 연상은 실제 사물과의 연결(파랑-바다, 빨강-불, 피)이고, 추상적 연상은 감정·개념과의 연결(빨강-정열)입니다."
  },
  {
    id: 14,
    question: "색채의 추상적 연상에 해당하는 것은?",
    options: ["녹색 - 나뭇잎", "빨강 - 사과", "파랑 - 신뢰, 평화", "노랑 - 바나나"],
    answer: 2,
    explanation: "추상적 연상은 색과 감정·개념의 연결입니다. 파랑-신뢰는 추상적 연상의 예입니다."
  },
  {
    id: 15,
    question: "빨강의 구체적 연상으로 적절한 것은?",
    options: ["정열, 위험", "피, 불, 태양", "사랑, 분노", "열정, 혁명"],
    answer: 1,
    explanation: "빨강의 구체적 연상은 피, 불, 태양, 딸기 등 실제 사물입니다."
  },
  {
    id: 16,
    question: "녹색의 추상적 연상으로 적절한 것은?",
    options: ["나무, 풀", "평화, 안전, 성장", "개구리, 잔디", "사과, 수박"],
    answer: 1,
    explanation: "녹색의 추상적 연상은 평화, 안전, 성장, 자연, 환경 등의 개념입니다."
  },
  {
    id: 17,
    question: "색채 연상의 문화적 차이로 옳은 것은?",
    options: ["모든 문화에서 색의 의미는 동일하다", "서양에서 흰색은 죽음을 상징한다", "동양에서 흰색은 순결을, 서양에서는 결혼을 상징한다", "빨강은 모든 문화에서 정지를 의미한다"],
    answer: 2,
    explanation: "색채 의미는 문화마다 다릅니다. 서양에서 흰색은 순수/결혼이지만, 동양 일부 문화에서 상복 색입니다."
  },
  {
    id: 18,
    question: "색채 연상에 영향을 주는 요인이 아닌 것은?",
    options: ["개인 경험", "문화적 배경", "기온과 습도", "나이와 성별"],
    answer: 2,
    explanation: "색채 연상은 개인 경험, 문화적 배경, 나이, 성별 등에 영향을 받습니다. 기온과 습도는 직접적 영향 요인이 아닙니다."
  },
  {
    id: 19,
    question: "검정의 추상적 연상으로 적절하지 않은 것은?",
    options: ["권위, 힘", "고급, 세련", "희망, 순수", "신비, 죽음"],
    answer: 2,
    explanation: "희망과 순수는 흰색이나 노랑의 추상적 연상입니다. 검정은 권위, 고급, 신비, 죽음 등의 연상을 가집니다."
  },
  {
    id: 20,
    question: "금색이 주는 연상으로 옳은 것은?",
    options: ["빈곤, 수수함", "부, 명예, 고급", "자연, 친환경", "차가움, 냉정"],
    answer: 1,
    explanation: "금색은 부, 명예, 고급, 성공, 화려함 등의 연상을 가집니다."
  },
  {
    id: 21,
    question: "은색이 주는 연상으로 적절한 것은?",
    options: ["따뜻함, 정열", "모던, 하이테크, 미래적", "자연, 전통", "위험, 경고"],
    answer: 1,
    explanation: "은색은 모던, 하이테크, 미래적, 세련됨, 차가움 등의 연상을 가집니다."
  },
  {
    id: 22,
    question: "갈색이 주는 연상으로 옳은 것은?",
    options: ["화려함, 현대적", "자연, 흙, 안정, 따뜻함", "차가움, 미래적", "위험, 경고"],
    answer: 1,
    explanation: "갈색은 자연, 흙, 안정, 따뜻함, 전통, 커피 등의 연상을 가집니다."
  },
  {
    id: 23,
    question: "분홍색이 주는 연상으로 적절한 것은?",
    options: ["강인함, 권위", "부드러움, 로맨스, 여성성", "신비, 고귀", "자연, 환경"],
    answer: 1,
    explanation: "분홍색은 부드러움, 로맨스, 여성성, 사랑, 귀여움 등의 연상을 가집니다."
  },
  {
    id: 24,
    question: "회색이 주는 연상으로 옳은 것은?",
    options: ["활기, 열정", "중립, 균형, 모호함", "순수, 깨끗함", "위험, 경고"],
    answer: 1,
    explanation: "회색은 중립, 균형, 모호함, 우울, 도시적, 세련됨 등의 연상을 가집니다."
  },
  {
    id: 25,
    question: "색채 연상을 활용한 마케팅 예시로 적절하지 않은 것은?",
    options: ["친환경 제품에 녹색 사용", "고급 브랜드에 금색이나 검정 사용", "에너지 드링크에 파란색 사용", "따뜻한 음식점에 빨강이나 주황 사용"],
    answer: 2,
    explanation: "에너지 드링크는 활력과 에너지를 강조하기 위해 주로 빨강, 주황 등의 난색을 사용합니다. 파란색은 차분한 느낌입니다."
  },

  // 이미지 스케일 (26-38)
  {
    id: 26,
    question: "IRI 색채이미지스케일의 축으로 옳은 것은?",
    options: ["명도-채도", "Soft-Hard, Warm-Cool", "색상-명도", "R-G, B-Y"],
    answer: 1,
    explanation: "IRI 색채이미지스케일은 Soft(부드러운)-Hard(딱딱한), Warm(따뜻한)-Cool(차가운) 두 축으로 구성됩니다."
  },
  {
    id: 27,
    question: "'내추럴(Natural)' 이미지의 위치는 이미지 스케일에서 어디인가?",
    options: ["Hard-Cool", "Soft-Warm", "Hard-Warm", "Soft-Cool"],
    answer: 1,
    explanation: "내추럴 이미지는 부드럽고 따뜻한(Soft-Warm) 영역에 위치합니다."
  },
  {
    id: 28,
    question: "'모던(Modern)' 이미지의 위치는 이미지 스케일에서 어디인가?",
    options: ["Soft-Warm", "Hard-Cool", "Soft-Cool", "Hard-Warm"],
    answer: 1,
    explanation: "모던 이미지는 딱딱하고 차가운(Hard-Cool) 영역에 위치합니다."
  },
  {
    id: 29,
    question: "'캐주얼(Casual)' 이미지의 특징으로 옳은 것은?",
    options: ["어둡고 무거운 색", "밝고 경쾌한 색", "무채색 중심", "저채도 중심"],
    answer: 1,
    explanation: "캐주얼 이미지는 밝고 선명한 색, 경쾌하고 활발한 느낌의 배색입니다."
  },
  {
    id: 30,
    question: "'엘레강스(Elegance)' 이미지의 특징으로 옳은 것은?",
    options: ["강렬하고 화려한 색", "중명도, 중채도의 차분한 색", "원색 중심의 배색", "저명도의 어두운 색"],
    answer: 1,
    explanation: "엘레강스 이미지는 중명도, 중채도의 그레이시한 색으로 차분하고 우아한 느낌입니다."
  },
  {
    id: 31,
    question: "'다이나믹(Dynamic)' 이미지의 특징으로 옳은 것은?",
    options: ["파스텔톤의 부드러운 색", "고채도의 강렬한 색, 대비가 강함", "무채색 중심", "저채도의 차분한 색"],
    answer: 1,
    explanation: "다이나믹 이미지는 고채도의 강렬한 색과 강한 대비로 역동적이고 활기찬 느낌입니다."
  },
  {
    id: 32,
    question: "'클래식(Classic)' 이미지의 특징으로 옳은 것은?",
    options: ["밝고 화려한 색", "저명도, 저채도의 중후한 색", "고명도의 파스텔톤", "비비드한 원색"],
    answer: 1,
    explanation: "클래식 이미지는 저명도, 저채도의 깊고 중후한 색으로 전통적이고 격조 있는 느낌입니다."
  },
  {
    id: 33,
    question: "'로맨틱(Romantic)' 이미지의 특징으로 옳은 것은?",
    options: ["어둡고 무거운 색", "밝고 연한 파스텔톤, 분홍 계열", "검정과 흰색의 대비", "원색의 강렬한 배색"],
    answer: 1,
    explanation: "로맨틱 이미지는 밝고 연한 파스텔톤, 특히 분홍 계열로 사랑스럽고 여성적인 느낌입니다."
  },
  {
    id: 34,
    question: "형용사 이미지 스케일에서 '다이나믹' 영역의 형용사가 아닌 것은?",
    options: ["강렬한", "화려한", "차분한", "역동적인"],
    answer: 2,
    explanation: "'차분한'은 엘레강스나 클래식 영역의 형용사입니다. 다이나믹 영역은 강렬한, 화려한, 역동적인 등입니다."
  },
  {
    id: 35,
    question: "배색 이미지 스케일의 활용 분야가 아닌 것은?",
    options: ["제품 디자인", "브랜드 이미지 개발", "건축 구조 계산", "패션 기획"],
    answer: 2,
    explanation: "배색 이미지 스케일은 제품, 브랜드, 패션, 인테리어 등 디자인 분야에서 활용됩니다. 건축 구조 계산과는 무관합니다."
  },
  {
    id: 36,
    question: "'클리어(Clear)' 이미지의 특징으로 옳은 것은?",
    options: ["탁하고 어두운 색", "맑고 투명한 느낌의 깨끗한 색", "무채색 위주", "저명도 중심"],
    answer: 1,
    explanation: "클리어 이미지는 맑고 투명한 느낌의 깨끗하고 시원한 색 배색입니다."
  },
  {
    id: 37,
    question: "이미지 스케일에서 '고급스러운' 느낌을 주는 배색 특징은?",
    options: ["밝은 파스텔톤", "저명도, 저채도 또는 무채색 중심", "고채도 원색", "형광색 사용"],
    answer: 1,
    explanation: "고급스러운 이미지는 저명도, 저채도의 깊은 색이나 무채색(검정, 회색)을 주로 사용합니다."
  },
  {
    id: 38,
    question: "이미지 스케일의 주된 목적은?",
    options: ["색의 물리적 특성 측정", "색의 감성적 이미지를 체계적으로 분류", "인쇄 품질 관리", "조명 설계"],
    answer: 1,
    explanation: "이미지 스케일은 색이 주는 감성적 이미지를 체계적으로 분류하고 배색에 활용하기 위한 도구입니다."
  },

  // 색채 심리 효과 (39-50)
  {
    id: 39,
    question: "색채가 식욕에 미치는 영향으로 옳은 것은?",
    options: ["파란색이 식욕을 증진시킨다", "빨강, 주황이 식욕을 증진시킨다", "녹색이 식욕을 감퇴시킨다", "노란색이 식욕을 감퇴시킨다"],
    answer: 1,
    explanation: "난색(빨강, 주황)은 식욕을 증진시키고, 한색(파랑)은 식욕을 감퇴시키는 효과가 있습니다."
  },
  {
    id: 40,
    question: "색채 치료(Color Therapy)에서 파란색의 효과로 알려진 것은?",
    options: ["흥분, 자극", "진정, 이완", "식욕 증진", "활력 증가"],
    answer: 1,
    explanation: "색채 치료에서 파란색은 진정, 이완, 혈압 저하 등의 효과가 있다고 알려져 있습니다."
  },
  {
    id: 41,
    question: "병원, 의료시설에서 주로 사용하는 색과 그 이유로 옳은 것은?",
    options: ["빨강 - 활력을 주기 위해", "연녹색, 연파랑 - 안정감과 청결감을 주기 위해", "검정 - 권위를 표현하기 위해", "주황 - 식욕 증진을 위해"],
    answer: 1,
    explanation: "병원에서는 환자에게 안정감과 청결감을 주기 위해 연녹색, 연파랑 등의 색을 주로 사용합니다."
  },
  {
    id: 42,
    question: "패스트푸드점에서 빨강과 노랑을 주로 사용하는 이유는?",
    options: ["차분하게 오래 머물게 하기 위해", "식욕 자극과 빠른 회전율을 위해", "고급스러운 이미지를 위해", "환경 친화적 이미지를 위해"],
    answer: 1,
    explanation: "빨강과 노랑은 식욕을 자극하고, 흥분을 유발해 빠른 식사와 높은 회전율에 기여합니다."
  },
  {
    id: 43,
    question: "고급 레스토랑에서 주로 사용하는 색과 그 이유로 옳은 것은?",
    options: ["밝은 노랑 - 활기를 위해", "어두운 색, 무채색 - 고급스럽고 차분한 분위기를 위해", "밝은 빨강 - 식욕 증진을 위해", "형광색 - 현대적 느낌을 위해"],
    answer: 1,
    explanation: "고급 레스토랑은 어두운 색이나 무채색을 사용하여 고급스럽고 차분한 분위기를 연출합니다."
  },
  {
    id: 44,
    question: "어린이 공간에 적합한 색채 계획은?",
    options: ["무채색과 저채도 색 위주", "밝고 다양한 색, 적절한 자극", "어둡고 차분한 색", "단일 색상만 사용"],
    answer: 1,
    explanation: "어린이 공간은 밝고 다양한 색을 사용하여 창의성과 활동성을 자극하면서 과도하지 않게 계획합니다."
  },
  {
    id: 45,
    question: "사무 공간에서 집중력 향상에 도움이 되는 색은?",
    options: ["강렬한 빨강", "중성적인 연녹색, 연파랑", "밝은 노랑", "어두운 검정"],
    answer: 1,
    explanation: "사무 공간에서는 차분하고 집중력을 높이는 연녹색, 연파랑 등의 중성적 색상이 적합합니다."
  },
  {
    id: 46,
    question: "색채와 공간감의 관계로 옳은 것은?",
    options: ["난색은 공간을 넓어 보이게 한다", "한색은 공간을 좁아 보이게 한다", "밝은 색은 공간을 넓어 보이게 한다", "어두운 색은 공간을 넓어 보이게 한다"],
    answer: 2,
    explanation: "밝은 색(고명도)과 한색은 공간을 넓어 보이게 하고, 어두운 색과 난색은 좁아 보이게 합니다."
  },
  {
    id: 47,
    question: "색채와 시간 지각의 관계로 옳은 것은?",
    options: ["난색 환경에서 시간이 빨리 가는 것처럼 느껴진다", "한색 환경에서 시간이 빨리 가는 것처럼 느껴진다", "색채는 시간 지각에 영향을 주지 않는다", "무채색 환경에서 시간이 가장 빨리 간다"],
    answer: 0,
    explanation: "난색 환경에서는 시간이 빨리 가는 것처럼, 한색 환경에서는 천천히 가는 것처럼 느껴진다는 연구가 있습니다."
  },
  {
    id: 48,
    question: "색채의 주목성에 대한 설명으로 옳은 것은?",
    options: ["저채도 색이 주목성이 높다", "배경과 대비가 클수록 주목성이 높다", "무채색이 주목성이 가장 높다", "명도가 낮을수록 주목성이 높다"],
    answer: 1,
    explanation: "주목성은 색이 눈에 띄는 정도로, 배경과의 대비가 클수록, 채도가 높을수록 주목성이 높아집니다."
  },
  {
    id: 49,
    question: "안전색채에서 '위험, 정지'를 나타내는 색은?",
    options: ["녹색", "노랑", "빨강", "파랑"],
    answer: 2,
    explanation: "안전색채에서 빨강은 위험, 정지, 소방을 나타냅니다. 녹색은 안전, 노랑은 주의, 파랑은 지시를 나타냅니다."
  },
  {
    id: 50,
    question: "색채 심리의 개인차에 대한 설명으로 옳은 것은?",
    options: ["색채 심리 반응은 모든 사람에게 동일하다", "개인의 경험, 문화, 성별에 따라 차이가 있다", "나이에 따른 차이는 없다", "색채 선호도는 변하지 않는다"],
    answer: 1,
    explanation: "색채 심리 반응은 개인의 경험, 문화적 배경, 성별, 나이 등에 따라 차이가 있습니다."
  }
];

export default function ColorPsychologyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('colorist-engineer-color-psychology-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setScore(data.score || 0);
      setAnsweredQuestions(new Set(data.answered || []));
      setCurrentQuestion(data.current || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorist-engineer-color-psychology-progress', JSON.stringify({
      score,
      answered: Array.from(answeredQuestions),
      current: currentQuestion
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
  const resetQuiz = () => { setCurrentQuestion(0); setSelectedAnswer(null); setShowExplanation(false); setScore(0); setAnsweredQuestions(new Set()); setIsComplete(false); localStorage.removeItem('colorist-engineer-color-psychology-progress'); };
  const goToQuestion = (index: number) => { setCurrentQuestion(index); setSelectedAnswer(null); setShowExplanation(false); };

  const question = questions[currentQuestion];
  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-pink-100 mb-2">
            <Link href="/category/design/colorist-engineer" className="hover:text-white transition-colors">컬러리스트기사</Link>
            <span>/</span><span>색채심리</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">색채심리</h1>
          <p className="text-pink-100">색채 감정, 연상, 이미지 스케일, 심리효과</p>
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
            {currentQuestion < 12 && <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm">색채 감정</span>}
            {currentQuestion >= 12 && currentQuestion < 25 && <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">색채 연상</span>}
            {currentQuestion >= 25 && currentQuestion < 38 && <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">이미지 스케일</span>}
            {currentQuestion >= 38 && <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">심리 효과</span>}
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

        {isComplete && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl p-8 max-w-md w-full text-center"><div className="text-6xl mb-4">🎨</div><h3 className="text-2xl font-bold text-gray-800 mb-2">학습 완료!</h3><p className="text-gray-600 mb-4">색채심리 과목을 모두 풀었습니다.</p><div className="text-4xl font-bold text-pink-600 mb-6">{score} / {questions.length}</div><div className="flex gap-3 justify-center"><button onClick={resetQuiz} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl transition-colors font-medium">다시 풀기</button><Link href="/category/design/colorist-engineer" className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl transition-colors font-medium">메인으로</Link></div></div></div>)}
      </div>
    </div>
  );
}
