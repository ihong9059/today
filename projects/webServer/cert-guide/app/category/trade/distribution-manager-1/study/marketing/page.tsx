'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function MarketingStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-1-marketing-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('distribution-manager-1-marketing-completed', JSON.stringify(updated));
  };

  const topics = [
    {
      title: '마케팅전략',
      icon: '🎯',
      questions: [
        { id: 1, question: 'STP 전략(시장세분화, 표적시장, 포지셔닝)을 설명하시오.', answer: '시장을 세분화하고 표적을 선정, 차별적 위치 확보', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: STP 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시장세분화(Segmentation)의 기준과 방법\n2. 표적시장(Targeting) 선정 전략\n3. 포지셔닝(Positioning) 전략\n4. 유통업 STP 적용 사례\n5. 연습문제 3개' },
        { id: 2, question: '마케팅믹스 4P와 7P의 차이점을 설명하시오.', answer: '4P+People, Process, Physical Evidence', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 마케팅믹스 4P와 7P의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 4P(Product, Price, Place, Promotion)의 정의\n2. 서비스 마케팅 7P의 추가 요소\n3. 유통업 7P 적용 방법\n4. 마케팅믹스 전략 수립\n5. 연습문제 3개' },
        { id: 3, question: '통합마케팅커뮤니케이션(IMC)의 개념과 구성요소를 설명하시오.', answer: '일관된 메시지로 모든 채널 통합', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: IMC의 개념과 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IMC의 정의와 필요성\n2. IMC 구성요소(광고, PR, SP 등)\n3. 채널별 역할과 시너지\n4. 유통기업 IMC 사례\n5. 연습문제 3개' },
        { id: 4, question: '차별화 전략과 포지셔닝 맵 작성방법을 설명하시오.', answer: '경쟁사 대비 차별적 위치 시각화', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 차별화 전략과 포지셔닝 맵 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차별화의 정의와 유형\n2. 포지셔닝 맵의 개념\n3. 포지셔닝 맵 작성 절차\n4. 리포지셔닝 전략\n5. 연습문제 3개' },
        { id: 5, question: '마케팅 환경분석(3C, 5Forces)을 설명하시오.', answer: '고객, 경쟁사, 자사 / 5가지 경쟁요인', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 마케팅 환경분석(3C, 5Forces)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 3C 분석(Customer, Competitor, Company)\n2. 포터의 5Forces 모델\n3. 환경분석 활용 방법\n4. 유통업 환경분석 사례\n5. 연습문제 3개' },
        { id: 6, question: '제품수명주기(PLC)와 마케팅 전략을 설명하시오.', answer: '도입-성장-성숙-쇠퇴 단계별 전략', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 제품수명주기와 마케팅 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PLC의 4단계 특징\n2. 단계별 마케팅 전략\n3. PLC 연장 전략\n4. 유통업 PLC 적용 사례\n5. 연습문제 3개' },
        { id: 7, question: 'BCG 매트릭스를 활용한 포트폴리오 분석을 설명하시오.', answer: 'Star, Cash Cow, Question Mark, Dog', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: BCG 매트릭스를 활용한 포트폴리오 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BCG 매트릭스의 정의\n2. 4가지 사분면 특징\n3. 각 유형별 전략\n4. 유통기업 적용 사례\n5. 연습문제 3개' },
        { id: 8, question: '리테일 브랜딩 전략과 스토어 아이덴티티를 설명하시오.', answer: '매장 고유의 브랜드 정체성 구축', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 리테일 브랜딩 전략과 스토어 아이덴티티를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리테일 브랜딩의 정의\n2. 스토어 아이덴티티 구성요소\n3. 브랜드 일관성 유지 방법\n4. 유통기업 브랜딩 사례\n5. 연습문제 3개' },
        { id: 9, question: '고객가치 제안(CVP)의 개념과 작성방법을 설명하시오.', answer: '고객에게 제공하는 핵심 가치 명확화', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 고객가치 제안(CVP)의 개념과 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CVP의 정의와 중요성\n2. CVP 구성요소\n3. CVP 작성 방법\n4. 유통기업 CVP 사례\n5. 연습문제 3개' },
        { id: 10, question: '지속가능 마케팅과 그린 마케팅을 설명하시오.', answer: '환경·사회적 가치 추구 마케팅', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 지속가능 마케팅과 그린 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지속가능 마케팅의 정의\n2. 그린 마케팅의 개념\n3. ESG와 마케팅의 연계\n4. 유통기업 지속가능 마케팅 사례\n5. 연습문제 3개' },
      ],
    },
    {
      title: '소비자행동',
      icon: '🧠',
      questions: [
        { id: 11, question: '소비자 구매의사결정 5단계 프로세스를 설명하시오.', answer: '문제인식-정보탐색-대안평가-구매-구매후행동', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 소비자 구매의사결정 5단계 프로세스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제인식 단계\n2. 정보탐색과 대안평가\n3. 구매결정 요인\n4. 구매 후 행동(만족/불만족)\n5. 연습문제 3개' },
        { id: 12, question: '관여도(Involvement)에 따른 구매행동 유형을 설명하시오.', answer: '고관여/저관여, 복잡한/습관적 구매행동', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 관여도에 따른 구매행동 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관여도의 정의\n2. 고관여 구매행동 특징\n3. 저관여 구매행동 특징\n4. 관여도별 마케팅 전략\n5. 연습문제 3개' },
        { id: 13, question: '준거집단이 소비자행동에 미치는 영향을 설명하시오.', answer: '규범적·정보적·가치표현적 영향', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 준거집단이 소비자행동에 미치는 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 준거집단의 정의와 유형\n2. 준거집단 영향의 3가지 유형\n3. 오피니언 리더의 역할\n4. 인플루언서 마케팅 활용\n5. 연습문제 3개' },
        { id: 14, question: '라이프스타일 분석(VALS, AIO)을 설명하시오.', answer: '가치관, 활동, 관심사, 의견 기반 분석', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 라이프스타일 분석(VALS, AIO)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라이프스타일의 정의\n2. AIO 분석(활동, 관심, 의견)\n3. VALS 프레임워크\n4. 라이프스타일 기반 세분화\n5. 연습문제 3개' },
        { id: 15, question: '소비자 지각과정(노출-주의-해석)을 설명하시오.', answer: '자극에 대한 선택적 지각 메커니즘', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 소비자 지각과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지각의 정의\n2. 노출과 선택적 노출\n3. 주의와 선택적 주의\n4. 해석과 지각적 왜곡\n5. 연습문제 3개' },
        { id: 16, question: '소비자 학습이론(고전적 조건화, 조작적 조건화)을 설명하시오.', answer: '자극-반응 연합, 강화와 처벌', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 소비자 학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고전적 조건화(파블로프)\n2. 조작적 조건화(스키너)\n3. 인지적 학습이론\n4. 마케팅에서의 학습이론 적용\n5. 연습문제 3개' },
        { id: 17, question: '태도의 구성요소(인지-감정-행동)와 변화전략을 설명하시오.', answer: '태도의 ABC 모델, 태도변화 경로', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 태도의 구성요소와 변화전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 태도의 ABC 모델\n2. 태도 형성 과정\n3. 태도 변화 전략\n4. 마케팅에서의 태도 활용\n5. 연습문제 3개' },
        { id: 18, question: '소비자 동기이론(매슬로우 욕구단계)을 설명하시오.', answer: '생리-안전-소속-존경-자아실현 욕구', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 소비자 동기이론(매슬로우 욕구단계)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매슬로우 욕구단계 이론\n2. 5가지 욕구 단계 설명\n3. 욕구와 마케팅 전략 연결\n4. 유통업 적용 사례\n5. 연습문제 3개' },
        { id: 19, question: '충동구매의 원인과 유발 요인을 분석하시오.', answer: '계획되지 않은 즉흥적 구매 행동', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 충동구매의 원인과 유발 요인을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 충동구매의 정의와 유형\n2. 충동구매 유발 요인\n3. 매장 내 충동구매 유도 전략\n4. 충동구매의 윤리적 고려\n5. 연습문제 3개' },
        { id: 20, question: '고객만족과 고객불평행동의 관계를 설명하시오.', answer: '기대불일치 이론, 불평행동 유형', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 고객만족과 고객불평행동의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기대불일치 이론\n2. 고객불만족의 결과\n3. 불평행동 유형(직접/간접)\n4. 불만고객 관리 전략\n5. 연습문제 3개' },
      ],
    },
    {
      title: '판촉관리',
      icon: '📣',
      questions: [
        { id: 21, question: '판촉믹스(광고, PR, SP, 인적판매)의 특성을 비교하시오.', answer: '각 촉진도구의 장단점과 적합 상황', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 판촉믹스의 특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 광고의 특성과 장단점\n2. PR의 특성과 장단점\n3. SP(판매촉진)의 특성\n4. 인적판매의 특성\n5. 연습문제 3개' },
        { id: 22, question: '소비자 판촉(Consumer Promotion)의 유형과 효과를 설명하시오.', answer: '쿠폰, 샘플, 리베이트, 경품 등', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 소비자 판촉의 유형과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소비자 판촉의 목적\n2. 주요 판촉 유형(쿠폰, 샘플 등)\n3. 각 유형별 효과와 비용\n4. 판촉 효과 측정 방법\n5. 연습문제 3개' },
        { id: 23, question: '유통업체 판촉(Trade Promotion)의 유형을 설명하시오.', answer: '할인, 진열비, 광고보조금, 컨테스트', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 유통업체 판촉의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유통업체 판촉의 목적\n2. 거래 할인의 종류\n3. 진열 지원과 광고보조금\n4. 판촉 예산 배분 전략\n5. 연습문제 3개' },
        { id: 24, question: 'POP(Point of Purchase) 광고의 유형과 효과를 설명하시오.', answer: '구매시점 광고물로 충동구매 유도', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: POP 광고의 유형과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. POP 광고의 정의와 목적\n2. POP 광고 유형(현수막, 진열대 등)\n3. POP 광고의 효과\n4. 디지털 사이니지 활용\n5. 연습문제 3개' },
        { id: 25, question: '가격할인 판촉전략의 유형과 효과를 분석하시오.', answer: '일시할인, 묶음할인, 수량할인 등', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 가격할인 판촉전략의 유형과 효과를 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 가격할인의 유형\n2. 할인율 결정 방법\n3. 가격할인의 효과와 부작용\n4. 효과적인 할인 전략\n5. 연습문제 3개' },
        { id: 26, question: '로열티 프로그램(Loyalty Program)의 설계방법을 설명하시오.', answer: '포인트, 등급제, 제휴혜택 설계', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 로열티 프로그램의 설계방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 로열티 프로그램의 목적\n2. 포인트 적립 방식 설계\n3. 등급제 운영 방법\n4. 제휴 마케팅 활용\n5. 연습문제 3개' },
        { id: 27, question: '전단지(Flyer) 마케팅의 효과와 디자인 원칙을 설명하시오.', answer: '주간 특가 홍보, 상권 내 배포', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 전단지 마케팅의 효과와 디자인 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전단지 마케팅의 목적\n2. 전단지 디자인 원칙\n3. 배포 전략과 타이밍\n4. 효과 측정 방법\n5. 연습문제 3개' },
        { id: 28, question: '이벤트 마케팅의 기획과 실행방법을 설명하시오.', answer: '체험형 이벤트로 브랜드 경험 제공', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 이벤트 마케팅의 기획과 실행방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이벤트 마케팅의 정의와 목적\n2. 이벤트 기획 프로세스\n3. 이벤트 유형과 사례\n4. 이벤트 효과 측정\n5. 연습문제 3개' },
        { id: 29, question: '시즌 마케팅과 기념일 마케팅 전략을 설명하시오.', answer: '계절, 공휴일, 기념일 활용 판촉', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 시즌 마케팅과 기념일 마케팅 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시즌 마케팅의 정의\n2. 주요 시즌별 마케팅 전략\n3. 기념일 마케팅(발렌타인, 추석 등)\n4. 시즌 상품 기획\n5. 연습문제 3개' },
        { id: 30, question: '판촉예산 수립과 ROI 측정방법을 설명하시오.', answer: '판촉비 대비 매출 증가 효과 분석', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 판촉예산 수립과 ROI 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 판촉예산 수립 방법\n2. 판촉 ROI 계산 공식\n3. 판촉 효과 측정 지표\n4. 판촉 최적화 방안\n5. 연습문제 3개' },
      ],
    },
    {
      title: 'CRM·브랜드',
      icon: '💎',
      questions: [
        { id: 31, question: 'CRM(고객관계관리)의 개념과 구성요소를 설명하시오.', answer: '고객 데이터 기반 관계 강화 전략', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: CRM의 개념과 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CRM의 정의와 목적\n2. CRM 구성요소(운영/분석/협업)\n3. CRM 시스템 구축 방법\n4. 유통업 CRM 사례\n5. 연습문제 3개' },
        { id: 32, question: '고객생애가치(CLV)의 개념과 산정방법을 설명하시오.', answer: '고객이 평생 가져다주는 총 이익', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 고객생애가치(CLV)의 개념과 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CLV의 정의와 중요성\n2. CLV 산정 공식\n3. CLV 기반 고객 세분화\n4. CLV 향상 전략\n5. 연습문제 3개' },
        { id: 33, question: 'RFM 분석을 활용한 고객 세분화 방법을 설명하시오.', answer: 'Recency, Frequency, Monetary 기준 분류', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: RFM 분석을 활용한 고객 세분화 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RFM 분석의 정의\n2. R, F, M 각 지표의 의미\n3. RFM 점수 산출 방법\n4. 고객 그룹별 마케팅 전략\n5. 연습문제 3개' },
        { id: 34, question: '고객 이탈(Churn) 관리와 유지(Retention) 전략을 설명하시오.', answer: '이탈 예측 모델, 이탈 방지 프로그램', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 고객 이탈 관리와 유지 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고객 이탈의 정의와 유형\n2. 이탈 예측 모델\n3. 이탈 방지 전략\n4. 고객 유지 프로그램\n5. 연습문제 3개' },
        { id: 35, question: 'PB(Private Brand)와 NB(National Brand)를 비교하시오.', answer: '유통업체 자체브랜드 vs 제조업체 브랜드', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: PB와 NB를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. PB의 정의와 특징\n2. NB의 정의와 특징\n3. PB vs NB 비교(마진, 충성도 등)\n4. PB 개발 전략\n5. 연습문제 3개' },
        { id: 36, question: '브랜드 자산(Brand Equity)의 구성요소를 설명하시오.', answer: '인지도, 충성도, 지각품질, 연상', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 브랜드 자산의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 브랜드 자산의 정의(아커 모델)\n2. 브랜드 인지도와 충성도\n3. 지각품질과 브랜드 연상\n4. 브랜드 자산 측정 방법\n5. 연습문제 3개' },
        { id: 37, question: '브랜드 확장(Brand Extension) 전략과 위험요소를 설명하시오.', answer: '기존 브랜드로 신제품 출시', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 브랜드 확장 전략과 위험요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 브랜드 확장의 정의\n2. 확장 유형(라인확장, 카테고리확장)\n3. 브랜드 확장의 장단점\n4. 브랜드 희석 위험\n5. 연습문제 3개' },
        { id: 38, question: '멀티브랜드 전략과 브랜드 포트폴리오 관리를 설명하시오.', answer: '복수 브랜드 운영으로 시장 커버리지 확대', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 멀티브랜드 전략과 브랜드 포트폴리오 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 멀티브랜드 전략의 정의\n2. 브랜드 포트폴리오 구성\n3. 브랜드 간 자기잠식 방지\n4. 유통기업 멀티브랜드 사례\n5. 연습문제 3개' },
        { id: 39, question: '온라인 평판관리와 리뷰 마케팅을 설명하시오.', answer: '고객 리뷰가 구매결정에 미치는 영향', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 온라인 평판관리와 리뷰 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온라인 평판의 중요성\n2. 리뷰가 구매에 미치는 영향\n3. 긍정적 리뷰 유도 전략\n4. 부정적 리뷰 대응 방법\n5. 연습문제 3개' },
        { id: 40, question: '고객경험관리(CEM)와 고객여정맵을 설명하시오.', answer: '전 접점에서 일관된 긍정적 경험 설계', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 고객경험관리(CEM)와 고객여정맵을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CEM의 정의와 CRM과의 차이\n2. 고객여정맵 작성 방법\n3. 터치포인트 분석\n4. 고객경험 개선 사례\n5. 연습문제 3개' },
      ],
    },
    {
      title: 'VMD·디지털마케팅',
      icon: '🖥️',
      questions: [
        { id: 41, question: 'VMD(Visual Merchandising)의 개념과 목적을 설명하시오.', answer: '시각적 연출로 구매 욕구 자극', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: VMD의 개념과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VMD의 정의\n2. VMD의 3요소(VP, PP, IP)\n3. VMD의 목적과 효과\n4. 업종별 VMD 특성\n5. 연습문제 3개' },
        { id: 42, question: '진열의 원칙(AIDMA)과 골든라인을 설명하시오.', answer: '주목-관심-욕구-기억-행동 유도 진열', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 진열의 원칙(AIDMA)과 골든라인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AIDMA 모델의 정의\n2. 골든라인(눈높이)의 중요성\n3. 진열 위치별 효과\n4. 효과적인 진열 기법\n5. 연습문제 3개' },
        { id: 43, question: '매장 레이아웃 유형(그리드, 자유, 부티크)을 비교하시오.', answer: '고객 동선과 쇼핑 경험 설계', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 매장 레이아웃 유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 그리드형 레이아웃 특징\n2. 자유형 레이아웃 특징\n3. 부티크형 레이아웃 특징\n4. 업종별 적합 레이아웃\n5. 연습문제 3개' },
        { id: 44, question: '색채 마케팅과 조명 연출의 효과를 설명하시오.', answer: '색상과 조명이 구매심리에 미치는 영향', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 색채 마케팅과 조명 연출의 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 색채 심리와 마케팅 활용\n2. 색상별 연상과 효과\n3. 조명 유형과 연출 효과\n4. 매장 분위기 설계\n5. 연습문제 3개' },
        { id: 45, question: '소셜미디어 마케팅 전략과 채널별 특성을 설명하시오.', answer: '인스타, 유튜브, 틱톡 등 채널별 활용', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 소셜미디어 마케팅 전략과 채널별 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소셜미디어 마케팅의 정의\n2. 주요 채널별 특성(인스타, 유튜브 등)\n3. 콘텐츠 전략 수립\n4. 소셜미디어 성과 측정\n5. 연습문제 3개' },
        { id: 46, question: '인플루언서 마케팅의 유형과 효과 측정방법을 설명하시오.', answer: '메가/매크로/마이크로 인플루언서 활용', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 인플루언서 마케팅의 유형과 효과 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인플루언서 마케팅의 정의\n2. 인플루언서 유형(팔로워 수 기준)\n3. 인플루언서 선정 기준\n4. 효과 측정 지표(도달, 참여 등)\n5. 연습문제 3개' },
        { id: 47, question: '퍼포먼스 마케팅(CPA, CPC, CPM)을 설명하시오.', answer: '성과 기반 디지털 광고 과금 방식', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 퍼포먼스 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퍼포먼스 마케팅의 정의\n2. 과금 방식(CPA, CPC, CPM)\n3. 전환율과 ROAS 측정\n4. 퍼포먼스 마케팅 최적화\n5. 연습문제 3개' },
        { id: 48, question: '검색엔진 마케팅(SEM)과 SEO의 차이를 설명하시오.', answer: '유료검색광고 vs 자연검색 최적화', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: SEM과 SEO의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SEM의 정의와 특징\n2. SEO의 정의와 방법\n3. SEM vs SEO 비교\n4. 통합 검색마케팅 전략\n5. 연습문제 3개' },
        { id: 49, question: '라이브커머스 마케팅의 특징과 성공요인을 설명하시오.', answer: '실시간 방송을 통한 양방향 쇼핑', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 라이브커머스 마케팅의 특징과 성공요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라이브커머스의 정의\n2. 라이브커머스의 장점\n3. 성공적인 라이브방송 요소\n4. 국내 라이브커머스 사례\n5. 연습문제 3개' },
        { id: 50, question: '개인화 마케팅과 추천 알고리즘을 설명하시오.', answer: '개인 맞춤형 상품/콘텐츠 추천', prompt: '유통관리사 1급 유통마케팅 문제입니다.\n\n문제: 개인화 마케팅과 추천 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인화 마케팅의 정의\n2. 추천 알고리즘 유형(협업필터링 등)\n3. 개인화 마케팅의 효과\n4. 개인정보 보호와 균형\n5. 연습문제 3개' },
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
            <span className="text-emerald-600 font-medium">유통마케팅</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">📣</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">유통마케팅</h1>
              <p className="text-emerald-100">유통관리사 1급 · 제4과목</p>
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
