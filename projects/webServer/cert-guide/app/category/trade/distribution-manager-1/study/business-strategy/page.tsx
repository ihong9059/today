'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function BusinessStrategyStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-1-business-strategy-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('distribution-manager-1-business-strategy-completed', JSON.stringify(updated));
  };

  const topics = [
    {
      title: '상권이론',
      icon: '📍',
      questions: [
        { id: 1, question: '상권의 정의와 구성요소(1차, 2차, 3차 상권)를 설명하시오.', answer: '고객 흡인력 범위에 따른 상권 구분', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상권의 정의와 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상권의 정의\n2. 1차/2차/3차 상권의 특징\n3. 상권 범위 결정 요인\n4. 상권 구분 실무 적용\n5. 연습문제 3개' },
        { id: 2, question: '크리스탈러의 중심지이론을 설명하시오.', answer: '중심지 계층과 육각형 배후지 이론', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 크리스탈러의 중심지이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중심지이론의 기본 가정\n2. 중심지 계층 구조\n3. 육각형 배후지의 원리\n4. 이론의 한계와 현대적 적용\n5. 연습문제 3개' },
        { id: 3, question: '라일리의 소매인력법칙(소매중력모델)을 설명하시오.', answer: '두 도시 간 상권 경계선 결정 공식', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 라일리의 소매인력법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소매인력법칙의 정의\n2. 공식과 변수 설명\n3. 분기점(Breaking Point) 계산\n4. 실무 적용 예시\n5. 연습문제 3개' },
        { id: 4, question: '허프모델(Huff Model)의 개념과 계산방법을 설명하시오.', answer: '소비자의 점포 선택 확률 예측 모델', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 허프모델의 개념과 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허프모델의 정의와 가정\n2. 확률공식과 변수 설명\n3. 허프모델 계산 예제\n4. 모델의 장점과 한계\n5. 연습문제 3개' },
        { id: 5, question: '컨버스의 신소매인력법칙(수정라일리법칙)을 설명하시오.', answer: '라일리법칙 수정, 분기점 직접 계산', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 컨버스의 신소매인력법칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 컨버스 법칙의 배경\n2. 공식과 계산 방법\n3. 라일리법칙과의 차이점\n4. 실무 적용 사례\n5. 연습문제 3개' },
        { id: 6, question: '상권의 유형(지역중심, 근린, 전문상권 등)을 분류하시오.', answer: '규모와 기능에 따른 상권 분류', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상권의 유형을 분류하시오.\n\n다음 순서로 설명해주세요:\n1. 지역중심 상권의 특징\n2. 근린/동네 상권의 특징\n3. 전문상권과 테마상권\n4. 온라인 시대 상권 변화\n5. 연습문제 3개' },
        { id: 7, question: '상권의 생애주기(도입기-성장기-성숙기-쇠퇴기)를 설명하시오.', answer: '상권 발전단계별 특성과 대응전략', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상권의 생애주기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상권 도입기의 특징\n2. 성장기와 성숙기의 특징\n3. 쇠퇴기의 특징과 대응\n4. 상권 재생 전략\n5. 연습문제 3개' },
        { id: 8, question: 'MCI 모델(Multiplicative Competitive Interaction)을 설명하시오.', answer: '허프모델 확장, 다양한 속성 반영', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: MCI 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MCI 모델의 정의\n2. 허프모델과의 차이점\n3. 모델 공식과 변수\n4. MCI 모델의 장단점\n5. 연습문제 3개' },
        { id: 9, question: '상권 확장 요인과 축소 요인을 분석하시오.', answer: '인구, 교통, 경쟁, 업태 등 영향 요인', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상권 확장 요인과 축소 요인을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 상권 확장 요인 분석\n2. 상권 축소 요인 분석\n3. 상권 변화 예측 방법\n4. 상권 관리 전략\n5. 연습문제 3개' },
        { id: 10, question: '온라인 쇼핑 확대가 오프라인 상권에 미치는 영향을 분석하시오.', answer: '상권 약화 vs 체험 중심 상권 진화', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 온라인 쇼핑 확대가 오프라인 상권에 미치는 영향을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 온라인 쇼핑 성장 현황\n2. 오프라인 상권에 미치는 부정적 영향\n3. 오프라인 상권의 대응 전략\n4. 온-오프라인 융합 사례\n5. 연습문제 3개' },
      ],
    },
    {
      title: '상권조사',
      icon: '🔍',
      questions: [
        { id: 11, question: '상권조사의 목적과 조사항목을 설명하시오.', answer: '출점 의사결정을 위한 체계적 조사', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상권조사의 목적과 조사항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상권조사의 정의와 목적\n2. 상권조사 항목(인구, 경쟁 등)\n3. 조사 방법과 절차\n4. 조사 보고서 작성\n5. 연습문제 3개' },
        { id: 12, question: '유동인구 조사 방법과 분석기법을 설명하시오.', answer: '동선분석, 시간대별 통행량 측정', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 유동인구 조사 방법과 분석기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동인구의 정의와 중요성\n2. 조사 방법(수동/자동 계측)\n3. 시간대별·요일별 분석\n4. 유효 유동인구 분석\n5. 연습문제 3개' },
        { id: 13, question: '배후인구 조사와 세대특성 분석방법을 설명하시오.', answer: '거주인구, 주거유형, 소득수준 분석', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 배후인구 조사와 세대특성 분석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배후인구의 정의\n2. 인구통계 데이터 활용\n3. 세대특성 분석 항목\n4. 타겟 고객 분석\n5. 연습문제 3개' },
        { id: 14, question: '경쟁점 분석(경쟁강도, 점유율)방법을 설명하시오.', answer: '직접경쟁/간접경쟁 파악, 시장점유율 추정', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 경쟁점 분석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접경쟁과 간접경쟁 구분\n2. 경쟁점 조사 항목\n3. 경쟁강도 분석 방법\n4. 차별화 전략 수립\n5. 연습문제 3개' },
        { id: 15, question: '접근성 분석(도보권, 차량권, 대중교통)을 설명하시오.', answer: '시간거리 기준 접근성 평가', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 접근성 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접근성의 정의와 중요성\n2. 도보권 분석(5분, 10분 거리)\n3. 차량 접근성 분석\n4. 대중교통 접근성 분석\n5. 연습문제 3개' },
        { id: 16, question: '가시성(Visibility)과 인지도의 중요성을 설명하시오.', answer: '점포 노출도가 고객 유입에 미치는 영향', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 가시성과 인지도의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가시성의 정의\n2. 가시성 평가 요소\n3. 가시성 향상 방안\n4. 간판과 사인물 효과\n5. 연습문제 3개' },
        { id: 17, question: '집객시설(Anchor)의 역할과 효과를 분석하시오.', answer: '대형 집객시설이 상권에 미치는 영향', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 집객시설의 역할과 효과를 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 집객시설(앵커)의 정의\n2. 앵커 유형(병원, 마트, 학교 등)\n3. 앵커 효과 분석\n4. 앵커 테넌트 유치 전략\n5. 연습문제 3개' },
        { id: 18, question: '상권 데이터 수집 방법(현장조사, 빅데이터)을 비교하시오.', answer: '전통적 조사와 데이터 기반 분석 결합', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상권 데이터 수집 방법을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 현장조사 방법과 장단점\n2. 공공데이터 활용\n3. 상권분석 빅데이터 서비스\n4. 데이터 기반 의사결정\n5. 연습문제 3개' },
        { id: 19, question: '상권 SWOT 분석 방법을 설명하시오.', answer: '상권의 강점/약점/기회/위협 분석', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상권 SWOT 분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SWOT 분석의 정의\n2. 상권 강점/약점 분석\n3. 상권 기회/위협 분석\n4. SWOT 기반 전략 수립\n5. 연습문제 3개' },
        { id: 20, question: '상권분석 보고서 작성방법을 설명하시오.', answer: '조사결과의 체계적 정리와 권고', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상권분석 보고서 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보고서의 구성과 목차\n2. 데이터 시각화 방법\n3. 분석결과 요약\n4. 출점 권고와 근거 제시\n5. 연습문제 3개' },
      ],
    },
    {
      title: '입지분석',
      icon: '🏬',
      questions: [
        { id: 21, question: '입지선정의 중요성과 고려요인을 설명하시오.', answer: '성공의 70%는 입지, 입지선정 체크리스트', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 입지선정의 중요성과 고려요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 입지의 정의와 중요성\n2. 입지선정 주요 고려요인\n3. 입지선정 프로세스\n4. 입지 실패 사례 분석\n5. 연습문제 3개' },
        { id: 22, question: '상가 입지유형(노면점, 지하, 2층 이상)을 비교하시오.', answer: '층별 특성에 따른 적합 업종', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상가 입지유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 노면점(1층)의 특징과 장단점\n2. 지하층 입지의 특징\n3. 2층 이상 입지의 특징\n4. 업종별 적합 입지\n5. 연습문제 3개' },
        { id: 23, question: '코너 입지와 중간 입지의 장단점을 비교하시오.', answer: '가시성과 접근성 vs 임대료', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 코너 입지와 중간 입지의 장단점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 코너 입지의 특징과 장점\n2. 중간 입지의 특징과 장점\n3. 각 입지의 단점\n4. 업종별 적합 위치 선정\n5. 연습문제 3개' },
        { id: 24, question: '상가 건물 선정 시 체크리스트를 작성하시오.', answer: '건물 상태, 주차, 간판, 용도 확인', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상가 건물 선정 시 체크리스트를 작성하시오.\n\n다음 순서로 설명해주세요:\n1. 건물 물리적 조건 체크\n2. 법적 규제 및 용도 확인\n3. 주차 및 편의시설 체크\n4. 임대조건 협상 포인트\n5. 연습문제 3개' },
        { id: 25, question: '동선(고객 이동 경로) 분석방법을 설명하시오.', answer: '주동선/부동선 파악, 최적 위치 선정', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 동선 분석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동선의 정의와 종류\n2. 주동선과 부동선 분석\n3. 동선 변화 예측\n4. 동선 기반 입지 선정\n5. 연습문제 3개' },
        { id: 26, question: '점포 입지 평가표(Checklist) 작성방법을 설명하시오.', answer: '항목별 가중치 부여, 종합점수 산출', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 점포 입지 평가표 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 입지 평가 항목 선정\n2. 항목별 가중치 설정\n3. 점수 산출 방법\n4. 복수 후보지 비교 분석\n5. 연습문제 3개' },
        { id: 27, question: '신도시/재개발지역 입지분석 시 고려사항을 설명하시오.', answer: '개발 일정, 입주시기, 상권 형성 예측', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 신도시/재개발지역 입지분석 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신도시 상권의 특징\n2. 개발 일정과 리스크\n3. 상권 형성 예측 방법\n4. 선점 전략과 주의점\n5. 연습문제 3개' },
        { id: 28, question: '쇼핑몰/백화점 내 입지(테넌트 위치)선정 방법을 설명하시오.', answer: 'MD구성, 동선, 앵커 인접성 고려', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 쇼핑몰/백화점 내 입지선정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 테넌트 위치의 중요성\n2. 층별·구역별 특성\n3. 앵커 시설과의 관계\n4. 테넌트 믹스 전략\n5. 연습문제 3개' },
        { id: 29, question: '업종별 최적 입지 특성을 분석하시오.', answer: '업종에 따른 입지 요건 차별화', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 업종별 최적 입지 특성을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 편의점/슈퍼의 입지 특성\n2. 외식업의 입지 특성\n3. 패션/뷰티의 입지 특성\n4. 서비스업의 입지 특성\n5. 연습문제 3개' },
        { id: 30, question: '입지 관련 법적 규제(용도지역, 건축규제)를 설명하시오.', answer: '용도지역별 업종 제한, 건축물 용도', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 입지 관련 법적 규제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용도지역제의 개념\n2. 용도지역별 업종 제한\n3. 건축물 용도와 규제\n4. 관련 법규 확인 방법\n5. 연습문제 3개' },
      ],
    },
    {
      title: '매출예측',
      icon: '📈',
      questions: [
        { id: 31, question: '매출예측의 중요성과 예측방법을 설명하시오.', answer: '출점 의사결정의 핵심, 다양한 예측기법', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 매출예측의 중요성과 예측방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출예측의 정의와 목적\n2. 정성적 예측 방법\n3. 정량적 예측 방법\n4. 예측 정확도 향상 방안\n5. 연습문제 3개' },
        { id: 32, question: '유추법(Analog Method)에 의한 매출예측을 설명하시오.', answer: '유사점포 실적 기반 매출 추정', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 유추법에 의한 매출예측을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유추법의 정의\n2. 유사점포 선정 기준\n3. 매출 조정 방법\n4. 유추법의 장단점\n5. 연습문제 3개' },
        { id: 33, question: '회귀분석에 의한 매출예측 방법을 설명하시오.', answer: '독립변수와 매출의 관계 분석', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 회귀분석에 의한 매출예측 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회귀분석의 기본 개념\n2. 매출예측 회귀모델 구축\n3. 변수 선정과 분석\n4. 회귀분석의 한계\n5. 연습문제 3개' },
        { id: 34, question: '체크리스트법에 의한 매출예측을 설명하시오.', answer: '입지요인별 점수 합산으로 매출 추정', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 체크리스트법에 의한 매출예측을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 체크리스트법의 정의\n2. 평가항목과 배점 설정\n3. 점수-매출 변환표 작성\n4. 방법의 장단점\n5. 연습문제 3개' },
        { id: 35, question: '시장점유율법에 의한 매출예측을 설명하시오.', answer: '상권 내 총수요 대비 점유율 추정', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 시장점유율법에 의한 매출예측을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시장점유율법의 개념\n2. 상권 내 총수요 추정\n3. 점유율 예측 방법\n4. 매출 계산 예시\n5. 연습문제 3개' },
        { id: 36, question: '구매력지수(BPI)를 활용한 매출예측을 설명하시오.', answer: '지역별 구매력 비교 지수', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 구매력지수를 활용한 매출예측을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구매력지수의 정의\n2. BPI 산출 방법\n3. BPI 활용 매출예측\n4. 지역별 BPI 비교 분석\n5. 연습문제 3개' },
        { id: 37, question: '업종별 평당 매출 기준과 활용방법을 설명하시오.', answer: '업종별 평당 매출 벤치마크', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 업종별 평당 매출 기준과 활용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평당 매출의 개념\n2. 업종별 평당 매출 기준\n3. 평당 매출 활용 예측\n4. 매장 규모 결정\n5. 연습문제 3개' },
        { id: 38, question: '신규 출점 시 초기 매출과 성숙 매출을 구분하여 예측하시오.', answer: '개점 효과 후 안정화 매출 예측', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 초기 매출과 성숙 매출을 구분하여 예측하시오.\n\n다음 순서로 설명해주세요:\n1. 초기 매출의 특징(오픈 버블)\n2. 성숙 매출 도달 기간\n3. 매출 안정화 패턴\n4. 현실적 매출 계획 수립\n5. 연습문제 3개' },
        { id: 39, question: '매출예측 오차 원인과 보정방법을 설명하시오.', answer: '예측과 실적 차이 분석, 모델 개선', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 매출예측 오차 원인과 보정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매출예측 오차의 원인\n2. 예측 정확도 측정(MAPE 등)\n3. 예측 모델 보정 방법\n4. 지속적 모델 개선\n5. 연습문제 3개' },
        { id: 40, question: '손익분기점 매출과 목표 매출 설정방법을 설명하시오.', answer: 'BEP 기반 최소 매출, 목표 이익 매출', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 손익분기점 매출과 목표 매출 설정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손익분기점 매출 계산\n2. 고정비와 변동비 분석\n3. 목표 이익 매출 설정\n4. 출점 의사결정 기준\n5. 연습문제 3개' },
      ],
    },
    {
      title: '점포개발·임대차',
      icon: '🏗️',
      questions: [
        { id: 41, question: '점포개발 프로세스를 단계별로 설명하시오.', answer: '상권조사-입지선정-계약-인테리어-개점', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 점포개발 프로세스를 단계별로 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점포개발의 정의\n2. 개발 프로세스 단계\n3. 각 단계별 주요 업무\n4. 개발 일정 관리\n5. 연습문제 3개' },
        { id: 42, question: '출점 전략(집중출점, 도미넌트 전략)을 설명하시오.', answer: '특정 지역 집중 출점으로 시너지 창출', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 출점 전략(집중출점, 도미넌트 전략)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도미넌트 전략의 정의\n2. 집중출점의 장점\n3. 도미넌트 전략 사례\n4. 분산출점과의 비교\n5. 연습문제 3개' },
        { id: 43, question: '상가임대차보호법의 주요 내용을 설명하시오.', answer: '계약갱신요구권, 권리금 보호, 임대료 인상률', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 상가임대차보호법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 상가임대차보호법의 목적\n2. 계약갱신요구권(10년)\n3. 권리금 보호 규정\n4. 임대료 인상 제한(5%)\n5. 연습문제 3개' },
        { id: 44, question: '권리금의 개념과 산정방법을 설명하시오.', answer: '바닥권리금, 시설권리금, 영업권리금', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 권리금의 개념과 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 권리금의 정의와 유형\n2. 바닥권리금(위치 프리미엄)\n3. 시설권리금과 영업권리금\n4. 권리금 협상 전략\n5. 연습문제 3개' },
        { id: 45, question: '임대료 산정방법과 협상전략을 설명하시오.', answer: '임대료 구성(보증금, 월세, 관리비)', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 임대료 산정방법과 협상전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임대료 구성요소\n2. 적정 임대료 산정\n3. 임대료 협상 전략\n4. 임대차 계약 시 주의점\n5. 연습문제 3개' },
        { id: 46, question: '점포 리모델링과 리뉴얼 전략을 설명하시오.', answer: '노후점포 개선, 컨셉 변경, 고객 재유치', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 점포 리모델링과 리뉴얼 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리모델링의 정의와 목적\n2. 리뉴얼 시점 판단 기준\n3. 리모델링 유형과 범위\n4. 리뉴얼 효과와 ROI\n5. 연습문제 3개' },
        { id: 47, question: '폐점 관리와 철수 전략을 설명하시오.', answer: '손실 최소화, 원상복구, 권리금 회수', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 폐점 관리와 철수 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 폐점 결정 기준\n2. 철수 프로세스\n3. 손실 최소화 전략\n4. 원상복구와 권리금 회수\n5. 연습문제 3개' },
        { id: 48, question: '점포 표준화(프로토타입)의 개념과 효과를 설명하시오.', answer: '표준 점포 모델로 출점 효율화', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 점포 표준화(프로토타입)의 개념과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 프로토타입의 정의\n2. 점포 표준화의 장점\n3. 표준 점포 개발 방법\n4. 프랜차이즈 표준화 사례\n5. 연습문제 3개' },
        { id: 49, question: '젠트리피케이션의 개념과 대응방안을 설명하시오.', answer: '상권 활성화로 인한 임대료 상승, 상인 이탈', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: 젠트리피케이션의 개념과 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 젠트리피케이션의 정의\n2. 발생 원인과 과정\n3. 소상인에 미치는 영향\n4. 정책적 대응 방안\n5. 연습문제 3개' },
        { id: 50, question: 'GIS(지리정보시스템)를 활용한 상권분석 방법을 설명하시오.', answer: '지도 기반 공간 데이터 분석', prompt: '유통관리사 1급 상권분석 문제입니다.\n\n문제: GIS를 활용한 상권분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. GIS의 정의와 구성\n2. 상권분석 GIS 활용 분야\n3. 공간 데이터 분석 방법\n4. GIS 상권분석 소프트웨어\n5. 연습문제 3개' },
      ],
    },
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/category/trade/distribution-manager-1" className="text-gray-600 hover:text-emerald-600">유통관리사 1급</a>
            <span className="text-gray-300">›</span>
            <span className="text-emerald-600 font-medium">상권분석</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">📍</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">상권분석</h1>
              <p className="text-emerald-100">유통관리사 1급 · 제3과목</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>학습 진행률</span>
              <span className="font-bold">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenTopics(openTopics.includes(topicIdx) ? openTopics.filter((t) => t !== topicIdx) : [...openTopics, topicIdx])}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{topic.icon}</span>
                  <span className="font-bold text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter((q) => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {openTopics.includes(topicIdx) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 ${completedQuestions.includes(q.id) ? 'bg-emerald-50' : ''}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => saveProgress(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${completedQuestions.includes(q.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium mb-2">{q.id}. {q.question}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded">💡 {q.answer}</span>
                            <button
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition"
                            >
                              🤖 AI
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

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
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© 2026 자격시험 가이드</p>
        </div>
      </footer>
    </div>
  );
}
