'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ColorTheoryStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('visual-design-technician-color-theory-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('visual-design-technician-color-theory-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const topics = [
    {
      id: 1,
      name: '색의 기초',
      icon: '🌈',
      questions: [
        { id: 1, question: '빛의 삼원색(RGB)은?', answer: '빨강(Red), 초록(Green), 파랑(Blue) - 가산혼합', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 빛의 삼원색(RGB)은?\n\n다음 순서로 설명해주세요:\n1. 가산혼합의 원리\n2. RGB 각 색상의 특성\n3. 색광과 디스플레이\n4. RGB와 디지털 디자인\n5. 연습문제 3개' },
        { id: 2, question: '색료의 삼원색(CMY)은?', answer: '시안(Cyan), 마젠타(Magenta), 노랑(Yellow) - 감산혼합', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 색료의 삼원색(CMY)은?\n\n다음 순서로 설명해주세요:\n1. 감산혼합의 원리\n2. CMY 각 색상의 특성\n3. 인쇄에서 CMYK 사용 이유\n4. K(검정)가 필요한 이유\n5. 연습문제 3개' },
        { id: 3, question: '색의 3속성은?', answer: '색상(Hue), 명도(Value), 채도(Chroma)', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 색의 3속성은?\n\n다음 순서로 설명해주세요:\n1. 색상(Hue)의 정의와 특징\n2. 명도(Value)의 정의와 단계\n3. 채도(Chroma)의 정의와 범위\n4. 3속성의 상호관계\n5. 연습문제 3개' },
        { id: 4, question: '무채색과 유채색의 차이는?', answer: '무채색은 색상 없음(흰-회-검), 유채색은 색상 있음', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 무채색과 유채색의 차이는?\n\n다음 순서로 설명해주세요:\n1. 무채색의 정의와 특징\n2. 유채색의 정의와 특징\n3. 무채색의 명도 단계\n4. 디자인에서의 활용\n5. 연습문제 3개' },
        { id: 5, question: '보색(Complementary Color)이란?', answer: '색상환에서 정반대에 위치한 색, 섞으면 무채색', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 보색(Complementary Color)이란?\n\n다음 순서로 설명해주세요:\n1. 보색의 정의와 원리\n2. 색상환에서의 보색 관계\n3. 보색 대비 효과\n4. 디자인에서 보색 활용\n5. 연습문제 3개' },
        { id: 6, question: '난색과 한색의 특징은?', answer: '난색(빨강계열)은 따뜻한 느낌, 한색(파랑계열)은 차가운 느낌', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 난색과 한색의 특징은?\n\n다음 순서로 설명해주세요:\n1. 난색의 정의와 심리적 효과\n2. 한색의 정의와 심리적 효과\n3. 중성색의 특징\n4. 공간감과 온도감\n5. 연습문제 3개' },
        { id: 7, question: '명시도(Visibility)란?', answer: '색이 눈에 잘 띄는 정도, 배경과의 대비에 영향', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 명시도(Visibility)란?\n\n다음 순서로 설명해주세요:\n1. 명시도의 정의\n2. 명시도에 영향을 미치는 요소\n3. 명시도 순위\n4. 안전색채와 명시도\n5. 연습문제 3개' },
        { id: 8, question: '색의 진출과 후퇴란?', answer: '난색/고명도/고채도는 진출, 한색/저명도/저채도는 후퇴', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 색의 진출과 후퇴란?\n\n다음 순서로 설명해주세요:\n1. 진출색의 특징과 예시\n2. 후퇴색의 특징과 예시\n3. 공간 디자인에서의 활용\n4. 그래픽 디자인에서의 활용\n5. 연습문제 3개' },
        { id: 9, question: '색의 팽창과 수축이란?', answer: '밝은 색은 팽창, 어두운 색은 수축해 보임', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 색의 팽창과 수축이란?\n\n다음 순서로 설명해주세요:\n1. 팽창색의 특징\n2. 수축색의 특징\n3. 면적 효과와의 관계\n4. 의상 디자인에서의 활용\n5. 연습문제 3개' },
        { id: 10, question: '색의 경연감(Hard/Soft)이란?', answer: '고채도/고명도는 딱딱하게, 저채도/중명도는 부드럽게 느껴짐', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 색의 경연감(Hard/Soft)이란?\n\n다음 순서로 설명해주세요:\n1. 경색(Hard Color)의 특징\n2. 연색(Soft Color)의 특징\n3. 채도와 명도의 영향\n4. 브랜드 이미지와 경연감\n5. 연습문제 3개' },
      ]
    },
    {
      id: 2,
      name: '표색계',
      icon: '🎯',
      questions: [
        { id: 11, question: '먼셀 표색계(Munsell System)의 표기법은?', answer: 'HV/C (색상 명도/채도) 예: 5R 4/14', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 먼셀 표색계(Munsell System)의 표기법은?\n\n다음 순서로 설명해주세요:\n1. 먼셀 표색계의 역사와 구조\n2. HV/C 표기법 상세 설명\n3. 색상환(Hue Circle) 구성\n4. 명도(Value)와 채도(Chroma) 단계\n5. 연습문제 3개' },
        { id: 12, question: '먼셀 색상환의 10색상은?', answer: 'R, YR, Y, GY, G, BG, B, PB, P, RP', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 먼셀 색상환의 10색상은?\n\n다음 순서로 설명해주세요:\n1. 10색상의 명칭과 약자\n2. 색상 분할 (5, 10 단계)\n3. 보색 관계 찾는 방법\n4. 먼셀 색상환과 색채 조화\n5. 연습문제 3개' },
        { id: 13, question: 'PCCS(일본색채연구소) 표색계의 특징은?', answer: '톤(Tone) 개념 도입, 실용적 색채 분류', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: PCCS(일본색채연구소) 표색계의 특징은?\n\n다음 순서로 설명해주세요:\n1. PCCS의 개발 배경\n2. 톤(Tone)의 개념과 분류\n3. 12가지 톤의 특징\n4. 디자인에서의 톤 활용\n5. 연습문제 3개' },
        { id: 14, question: 'NCS(Natural Color System)의 특징은?', answer: '스웨덴 개발, 색의 시지각에 기반한 표색계', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: NCS(Natural Color System)의 특징은?\n\n다음 순서로 설명해주세요:\n1. NCS의 개발 배경\n2. NCS 표기법 (예: S 2050-Y90R)\n3. 색상삼각형의 구조\n4. 건축/인테리어에서의 활용\n5. 연습문제 3개' },
        { id: 15, question: 'Pantone 컬러 시스템이란?', answer: '인쇄용 색상 표준, 고유 번호로 색상 지정', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: Pantone 컬러 시스템이란?\n\n다음 순서로 설명해주세요:\n1. Pantone의 역사와 목적\n2. 코팅(C)과 무코팅(U)의 차이\n3. 스팟 컬러와 프로세스 컬러\n4. Pantone 컬러 선택 방법\n5. 연습문제 3개' },
        { id: 16, question: 'CIE 표색계란?', answer: '국제조명위원회의 색채 측정 표준, XYZ 좌표계', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: CIE 표색계란?\n\n다음 순서로 설명해주세요:\n1. CIE의 정의와 목적\n2. XYZ 좌표계의 원리\n3. CIE L*a*b* 색공간\n4. 색차(ΔE) 계산\n5. 연습문제 3개' },
        { id: 17, question: 'HSB/HSV 색상 모델이란?', answer: 'Hue(색상), Saturation(채도), Brightness/Value(명도)', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: HSB/HSV 색상 모델이란?\n\n다음 순서로 설명해주세요:\n1. HSB/HSV의 정의\n2. RGB와의 차이점\n3. 디지털 도구에서의 활용\n4. 색상 선택의 직관성\n5. 연습문제 3개' },
        { id: 18, question: '오스트발트 표색계의 특징은?', answer: '순색량, 백색량, 흑색량으로 색 표현', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 오스트발트 표색계의 특징은?\n\n다음 순서로 설명해주세요:\n1. 오스트발트 표색계의 구조\n2. 등색상 삼각형\n3. 순색, 백색, 흑색의 관계\n4. 색채 조화론과의 연관\n5. 연습문제 3개' },
        { id: 19, question: '색온도(Color Temperature)란?', answer: 'K(켈빈) 단위, 낮으면 따뜻한 색, 높으면 차가운 색', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 색온도(Color Temperature)란?\n\n다음 순서로 설명해주세요:\n1. 색온도의 정의와 단위\n2. 광원별 색온도\n3. 화이트밸런스와의 관계\n4. 조명 디자인에서의 활용\n5. 연습문제 3개' },
        { id: 20, question: '연색성(Color Rendering)이란?', answer: '광원이 물체의 색을 얼마나 자연스럽게 보여주는지 지표', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 연색성(Color Rendering)이란?\n\n다음 순서로 설명해주세요:\n1. 연색성의 정의\n2. 연색지수(CRI)의 의미\n3. 광원 종류별 연색성\n4. 연색성이 중요한 분야\n5. 연습문제 3개' },
      ]
    },
    {
      id: 3,
      name: '색채 심리',
      icon: '🧠',
      questions: [
        { id: 21, question: '빨강의 심리적 연상은?', answer: '열정, 사랑, 위험, 긴급, 에너지, 식욕 자극', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 빨강의 심리적 연상은?\n\n다음 순서로 설명해주세요:\n1. 빨강의 긍정적/부정적 연상\n2. 문화적 차이\n3. 브랜드에서의 활용\n4. 빨강의 주의 환기 효과\n5. 연습문제 3개' },
        { id: 22, question: '파랑의 심리적 연상은?', answer: '신뢰, 안정, 차분함, 전문성, 우울, 차가움', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 파랑의 심리적 연상은?\n\n다음 순서로 설명해주세요:\n1. 파랑의 긍정적/부정적 연상\n2. 기업 로고에서의 파랑\n3. 파랑의 식욕 억제 효과\n4. 파랑의 진정 효과\n5. 연습문제 3개' },
        { id: 23, question: '노랑의 심리적 연상은?', answer: '밝음, 희망, 주의, 경고, 유아적, 창의성', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 노랑의 심리적 연상은?\n\n다음 순서로 설명해주세요:\n1. 노랑의 긍정적/부정적 연상\n2. 가시성과 주목성\n3. 경고 표지에서의 활용\n4. 노랑의 문화적 의미\n5. 연습문제 3개' },
        { id: 24, question: '초록의 심리적 연상은?', answer: '자연, 건강, 성장, 안전, 환경, 휴식', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 초록의 심리적 연상은?\n\n다음 순서로 설명해주세요:\n1. 초록의 긍정적 연상\n2. 친환경 이미지와 초록\n3. 초록의 눈 피로 완화\n4. 의료/건강 분야 활용\n5. 연습문제 3개' },
        { id: 25, question: '검정의 심리적 연상은?', answer: '고급, 권위, 미스터리, 슬픔, 죽음, 모던', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 검정의 심리적 연상은?\n\n다음 순서로 설명해주세요:\n1. 검정의 긍정적/부정적 연상\n2. 럭셔리 브랜드와 검정\n3. 문화별 검정의 의미\n4. 타이포그래피와 검정\n5. 연습문제 3개' },
        { id: 26, question: '흰색의 심리적 연상은?', answer: '순수, 청결, 시작, 공허, 단순, 평화', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 흰색의 심리적 연상은?\n\n다음 순서로 설명해주세요:\n1. 흰색의 긍정적 연상\n2. 미니멀 디자인과 흰색\n3. 여백(White Space)의 중요성\n4. 문화별 흰색의 의미\n5. 연습문제 3개' },
        { id: 27, question: '주황의 심리적 연상은?', answer: '활력, 친근, 재미, 저렴함, 식욕 자극', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 주황의 심리적 연상은?\n\n다음 순서로 설명해주세요:\n1. 주황의 심리적 효과\n2. 주황과 빨강의 차이\n3. 식품 패키지에서의 주황\n4. CTA 버튼과 주황\n5. 연습문제 3개' },
        { id: 28, question: '보라의 심리적 연상은?', answer: '고귀, 창의, 신비, 영성, 로맨스, 사치', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 보라의 심리적 연상은?\n\n다음 순서로 설명해주세요:\n1. 보라의 역사적 의미\n2. 보라의 희소성과 고급 이미지\n3. 창의적 브랜드와 보라\n4. 보라의 성별 연관성\n5. 연습문제 3개' },
        { id: 29, question: '색채와 맛의 연관성은?', answer: '빨강/주황은 달콤, 노랑은 신맛, 초록은 신선, 파랑은 무미', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 색채와 맛의 연관성은?\n\n다음 순서로 설명해주세요:\n1. 공감각과 색채\n2. 색상별 맛 연상\n3. 식품 패키지 색채 전략\n4. 음식 사진과 색 보정\n5. 연습문제 3개' },
        { id: 30, question: '색채의 문화적 차이 예시는?', answer: '흰색: 서양은 순결/결혼, 동양은 죽음/애도', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 색채의 문화적 차이 예시는?\n\n다음 순서로 설명해주세요:\n1. 주요 색상별 문화적 차이\n2. 글로벌 브랜딩 시 고려사항\n3. 색채와 종교적 의미\n4. 국가별 선호 색상\n5. 연습문제 3개' },
      ]
    },
    {
      id: 4,
      name: '배색 원리',
      icon: '🎨',
      questions: [
        { id: 31, question: '동일색상 배색(Monochromatic)이란?', answer: '같은 색상에서 명도와 채도만 변화시킨 배색', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 동일색상 배색(Monochromatic)이란?\n\n다음 순서로 설명해주세요:\n1. 동일색상 배색의 정의\n2. 장점과 효과\n3. 명도/채도 변화 방법\n4. 디자인 적용 예시\n5. 연습문제 3개' },
        { id: 32, question: '유사색상 배색(Analogous)이란?', answer: '색상환에서 인접한 색상들의 조합', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 유사색상 배색(Analogous)이란?\n\n다음 순서로 설명해주세요:\n1. 유사색상 배색의 정의\n2. 색상환에서의 범위\n3. 조화롭고 안정적인 느낌\n4. 자연에서의 유사색 예시\n5. 연습문제 3개' },
        { id: 33, question: '보색배색(Complementary)의 특징은?', answer: '강한 대비, 역동적, 시선 집중 효과', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 보색배색(Complementary)의 특징은?\n\n다음 순서로 설명해주세요:\n1. 보색배색의 정의\n2. 대비 효과와 활용\n3. 주의사항 (진동 현상)\n4. 면적 비율 조절 방법\n5. 연습문제 3개' },
        { id: 34, question: '분리보색 배색(Split-Complementary)이란?', answer: '기준색의 보색 양옆 색상을 사용한 배색', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 분리보색 배색(Split-Complementary)이란?\n\n다음 순서로 설명해주세요:\n1. 분리보색의 정의와 구조\n2. 보색배색과의 차이\n3. 시각적 효과\n4. 적용 예시\n5. 연습문제 3개' },
        { id: 35, question: '삼색배색(Triadic)이란?', answer: '색상환을 3등분한 위치의 색상 조합', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 삼색배색(Triadic)이란?\n\n다음 순서로 설명해주세요:\n1. 삼색배색의 정의\n2. 색상환에서의 선택 방법\n3. 균형 잡힌 배색 효과\n4. 주색과 보조색 비율\n5. 연습문제 3개' },
        { id: 36, question: '톤 온 톤(Tone on Tone) 배색이란?', answer: '같은 색상에서 톤의 차이를 이용한 배색', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 톤 온 톤(Tone on Tone) 배색이란?\n\n다음 순서로 설명해주세요:\n1. 톤 온 톤의 정의\n2. 동일색상 배색과의 차이\n3. 부드럽고 우아한 효과\n4. 패션에서의 활용\n5. 연습문제 3개' },
        { id: 37, question: '톤 인 톤(Tone in Tone) 배색이란?', answer: '같은 톤에서 색상을 변화시킨 배색', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 톤 인 톤(Tone in Tone) 배색이란?\n\n다음 순서로 설명해주세요:\n1. 톤 인 톤의 정의\n2. 통일감과 조화\n3. 인테리어에서의 활용\n4. 톤 선택 방법\n5. 연습문제 3개' },
        { id: 38, question: '악센트 컬러(Accent Color)란?', answer: '주조색에 대비되는 강조색, 포인트 색상', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 악센트 컬러(Accent Color)란?\n\n다음 순서로 설명해주세요:\n1. 악센트 컬러의 정의와 역할\n2. 면적 비율 (5~10%)\n3. 효과적인 악센트 색상 선택\n4. 웹디자인에서의 악센트\n5. 연습문제 3개' },
        { id: 39, question: '도미넌트 컬러(Dominant Color)란?', answer: '배색에서 가장 많은 면적을 차지하는 주조색', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 도미넌트 컬러(Dominant Color)란?\n\n다음 순서로 설명해주세요:\n1. 도미넌트 컬러의 정의\n2. 배색의 기본 비율 (60-30-10)\n3. 도미넌트 색상 선택 기준\n4. 브랜드 색상과 도미넌트\n5. 연습문제 3개' },
        { id: 40, question: '그라데이션(Gradation) 배색이란?', answer: '색상, 명도, 채도가 점진적으로 변화하는 배색', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 그라데이션(Gradation) 배색이란?\n\n다음 순서로 설명해주세요:\n1. 그라데이션의 정의와 종류\n2. 자연스러운 전환 효과\n3. 디지털 디자인에서의 활용\n4. 그라데이션 제작 팁\n5. 연습문제 3개' },
      ]
    },
    {
      id: 5,
      name: '도해 기법',
      icon: '✏️',
      questions: [
        { id: 41, question: '투시도법(Perspective)의 종류는?', answer: '1점, 2점, 3점 투시도법', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 투시도법(Perspective)의 종류는?\n\n다음 순서로 설명해주세요:\n1. 투시도법의 원리\n2. 1점 투시 (정면)\n3. 2점 투시 (코너)\n4. 3점 투시 (조감, 앙감)\n5. 연습문제 3개' },
        { id: 42, question: '아이소메트릭(Isometric) 도법이란?', answer: '30도 각도로 기울어진 등각 투상도법', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 아이소메트릭(Isometric) 도법이란?\n\n다음 순서로 설명해주세요:\n1. 아이소메트릭의 정의\n2. 30도 각도의 원리\n3. 투시도와의 차이\n4. 인포그래픽에서의 활용\n5. 연습문제 3개' },
        { id: 43, question: '렌더링(Rendering)이란?', answer: '디자인 아이디어를 실물처럼 표현하는 기법', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 렌더링(Rendering)이란?\n\n다음 순서로 설명해주세요:\n1. 렌더링의 정의와 목적\n2. 수작업 렌더링 기법\n3. 디지털 렌더링 도구\n4. 재질감 표현 방법\n5. 연습문제 3개' },
        { id: 44, question: '스케치(Sketch)의 종류는?', answer: '아이디어 스케치, 러프 스케치, 컨셉 스케치', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 스케치(Sketch)의 종류는?\n\n다음 순서로 설명해주세요:\n1. 각 스케치의 정의와 목적\n2. 스케치의 디테일 수준\n3. 효과적인 스케치 방법\n4. 디지털 스케치 도구\n5. 연습문제 3개' },
        { id: 45, question: '마커 렌더링의 특징은?', answer: '빠른 표현, 선명한 색상, 레이어드 기법', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 마커 렌더링의 특징은?\n\n다음 순서로 설명해주세요:\n1. 마커의 종류 (알코올, 수성)\n2. 마커 렌더링 기법\n3. 그라데이션 표현 방법\n4. 마커와 다른 재료 혼용\n5. 연습문제 3개' },
        { id: 46, question: '음영법(Shading)의 원리는?', answer: '빛의 방향에 따른 밝음과 어둠의 표현', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 음영법(Shading)의 원리는?\n\n다음 순서로 설명해주세요:\n1. 음영의 기본 원리\n2. 광원의 위치와 그림자\n3. 단계별 음영 표현\n4. 입체감 표현 방법\n5. 연습문제 3개' },
        { id: 47, question: '제도(Drafting)의 기본 요소는?', answer: '선의 종류, 축척, 치수, 문자, 도면 규격', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 제도(Drafting)의 기본 요소는?\n\n다음 순서로 설명해주세요:\n1. 제도의 정의와 목적\n2. 선의 종류와 용도\n3. 축척과 치수 기입법\n4. 도면 규격 (A0~A4)\n5. 연습문제 3개' },
        { id: 48, question: '목업(Mock-up)이란?', answer: '실물 크기의 모형, 디자인 검증용', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 목업(Mock-up)이란?\n\n다음 순서로 설명해주세요:\n1. 목업의 정의와 목적\n2. 목업과 프로토타입의 차이\n3. 목업 제작 방법\n4. 디지털 목업 활용\n5. 연습문제 3개' },
        { id: 49, question: '벡터 그래픽 도구의 기본 기능은?', answer: '펜 툴, 베지어 곡선, 앵커 포인트, 패스', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 벡터 그래픽 도구의 기본 기능은?\n\n다음 순서로 설명해주세요:\n1. 벡터 그래픽의 원리\n2. 베지어 곡선의 구조\n3. 펜 툴 사용법\n4. 일러스트레이터 기본 기능\n5. 연습문제 3개' },
        { id: 50, question: '프레젠테이션 도해의 원칙은?', answer: '명료성, 일관성, 시각적 매력, 정보 계층화', prompt: '시각디자인산업기사 색채 및 도해 문제입니다.\n\n문제: 프레젠테이션 도해의 원칙은?\n\n다음 순서로 설명해주세요:\n1. 프레젠테이션 도해의 목적\n2. 효과적인 시각화 원칙\n3. 슬라이드 디자인 팁\n4. 데이터 시각화 방법\n5. 연습문제 3개' },
      ]
    },
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  const toggleTopic = (topicId: number) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (questionId: number) => {
    setCompletedQuestions(prev =>
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-gray-700">자격증</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design" className="text-gray-500 hover:text-gray-700">디자인</Link>
          <span className="text-gray-400">/</span>
          <Link href="/category/design/visual-design-technician" className="text-gray-500 hover:text-gray-700">시각디자인산업기사</Link>
          <span className="text-gray-400">/</span>
          <span className="text-rose-600 font-medium">색채 및 도해</span>
        </nav>

        {/* Title Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-rose-600 to-rose-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-3xl">
                🌈
              </div>
              <div>
                <h1 className="text-2xl font-bold">색채 및 도해</h1>
                <p className="text-rose-100">색채이론, 표색계, 배색원리, 도해기법</p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">학습 진행률</span>
              <span className="font-bold text-rose-600">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">{topic.name}</h3>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            completedQuestions.includes(q.id)
                              ? 'bg-rose-500 border-rose-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                            Q{q.id}. {q.question}
                          </p>
                          <p className="text-rose-600 text-sm mt-1">A. {q.answer}</p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="mt-2 px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-sm hover:bg-rose-200 transition"
                          >
                            🤖 AI에게 자세히 물어보기
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/category/design/visual-design-technician"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-rose-600 rounded-xl shadow hover:shadow-md transition"
          >
            ← 시각디자인산업기사 메인으로
          </Link>
        </div>
      </div>

      {/* AI Modal */}
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
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 mt-8">
        <div className="text-center text-gray-500 text-sm">
          <p>© 2026 자격증 가이드. 색채 및 도해 학습 화이팅! 🌈</p>
        </div>
      </footer>
    </div>
  );
}
