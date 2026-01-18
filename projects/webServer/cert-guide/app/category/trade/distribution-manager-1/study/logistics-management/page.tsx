'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function LogisticsManagementStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-1-logistics-management-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('distribution-manager-1-logistics-management-completed', JSON.stringify(updated));
  };

  const topics = [
    {
      title: 'SCM (공급사슬관리)',
      icon: '🔗',
      questions: [
        { id: 1, question: 'SCM(Supply Chain Management)의 정의와 구성요소를 설명하시오.', answer: '공급업체-제조-유통-소비자 전체 흐름 관리', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: SCM의 정의와 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SCM의 정의와 등장 배경\n2. SCM의 주요 구성요소\n3. SCM 프로세스(계획-조달-생산-배송-반품)\n4. SCM 도입 효과와 사례\n5. 연습문제 3개' },
        { id: 2, question: '채찍효과(Bullwhip Effect)의 원인과 해결방안을 설명하시오.', answer: '수요정보 왜곡으로 인한 재고 증폭 현상', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 채찍효과의 원인과 해결방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 채찍효과의 정의와 발생 원인\n2. 채찍효과의 4가지 주요 원인\n3. 채찍효과 완화 방안\n4. VMI, CPFR 등 협력 전략\n5. 연습문제 3개' },
        { id: 3, question: 'VMI(Vendor Managed Inventory)의 개념과 장단점을 설명하시오.', answer: '공급업체가 재고관리 책임을 지는 방식', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: VMI의 개념과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VMI의 정의와 도입 배경\n2. VMI 운영 프로세스\n3. VMI의 장점과 단점\n4. VMI 성공 사례(월마트-P&G)\n5. 연습문제 3개' },
        { id: 4, question: 'CPFR(협업적 계획, 예측, 보충)의 9단계 프로세스를 설명하시오.', answer: '공급망 파트너 간 협업 계획 수립', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: CPFR의 9단계 프로세스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CPFR의 정의와 목적\n2. CPFR 9단계 프로세스 상세\n3. CPFR과 VMI의 차이점\n4. CPFR 도입 효과와 사례\n5. 연습문제 3개' },
        { id: 5, question: '수요예측 기법(정성적, 정량적)의 종류와 특징을 설명하시오.', answer: '델파이법, 이동평균법, 지수평활법 등', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 수요예측 기법의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정성적 예측 기법(델파이, 시장조사 등)\n2. 정량적 예측 기법(시계열, 인과형)\n3. 이동평균법과 지수평활법 비교\n4. 유통업 수요예측 실무 적용\n5. 연습문제 3개' },
        { id: 6, question: '공급업체 평가기준과 전략적 소싱의 개념을 설명하시오.', answer: '품질, 가격, 납기, 서비스 등 다면 평가', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 공급업체 평가기준과 전략적 소싱의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공급업체 평가의 중요성\n2. 주요 평가기준(QCDS)\n3. 전략적 소싱의 정의\n4. 단일소싱 vs 복수소싱 전략\n5. 연습문제 3개' },
        { id: 7, question: 'SCM 성과측정 지표(SCOR 모델)를 설명하시오.', answer: 'Plan-Source-Make-Deliver-Return 프로세스', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: SCM 성과측정 지표(SCOR 모델)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SCOR 모델의 정의와 목적\n2. SCOR의 5가지 프로세스\n3. 주요 성과지표(KPI)\n4. SCOR 모델 활용 사례\n5. 연습문제 3개' },
        { id: 8, question: '리드타임(Lead Time) 단축 전략을 설명하시오.', answer: '주문부터 인도까지 소요시간 최소화', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 리드타임 단축 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리드타임의 정의와 구성요소\n2. 리드타임 단축의 중요성\n3. 리드타임 단축 방법 5가지\n4. 유통업 리드타임 단축 사례\n5. 연습문제 3개' },
        { id: 9, question: '그린SCM(친환경 공급사슬관리)의 개념과 추진전략을 설명하시오.', answer: '환경친화적 공급사슬 구축과 탄소발자국 감소', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 그린SCM의 개념과 추진전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 그린SCM의 정의와 필요성\n2. 그린SCM 주요 영역\n3. 탄소발자국 측정과 감소 전략\n4. 유통기업 그린SCM 사례\n5. 연습문제 3개' },
        { id: 10, question: '공급망 리스크 관리(SCRM)의 유형과 대응방안을 설명하시오.', answer: '공급 중단, 수요 급변, 물류 장애 등 리스크 대응', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 공급망 리스크 관리의 유형과 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공급망 리스크의 정의와 유형\n2. 리스크 식별 및 평가 방법\n3. 리스크 대응 전략\n4. 코로나19 등 실제 사례 분석\n5. 연습문제 3개' },
      ],
    },
    {
      title: '재고관리',
      icon: '📦',
      questions: [
        { id: 11, question: 'EOQ(경제적 주문량) 모델의 공식과 가정을 설명하시오.', answer: 'EOQ = √(2DS/H), 주문비용과 재고유지비용 균형', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: EOQ 모델의 공식과 가정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. EOQ의 정의와 목적\n2. EOQ 공식과 변수 설명\n3. EOQ 모델의 가정 조건\n4. EOQ 계산 실습 예제\n5. 연습문제 3개' },
        { id: 12, question: '안전재고(Safety Stock)의 개념과 산정방법을 설명하시오.', answer: '수요 불확실성 대비 완충 재고량', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 안전재고의 개념과 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 안전재고의 정의와 필요성\n2. 안전재고 산정 공식\n3. 서비스 수준과 안전재고의 관계\n4. 안전재고 최적화 방안\n5. 연습문제 3개' },
        { id: 13, question: 'ABC 분석의 원리와 재고관리 적용방법을 설명하시오.', answer: '파레토 법칙 기반 품목별 차별 관리', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: ABC 분석의 원리와 재고관리 적용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ABC 분석의 정의와 원리(파레토)\n2. A/B/C 품목 분류 기준\n3. 품목별 차별화된 관리 전략\n4. ABC 분석 실습 예제\n5. 연습문제 3개' },
        { id: 14, question: 'JIT(Just-In-Time) 시스템의 개념과 7가지 낭비를 설명하시오.', answer: '필요한 때 필요한 양만 생산/조달', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: JIT 시스템의 개념과 7가지 낭비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. JIT의 정의와 도요타 생산방식\n2. 7가지 낭비(TIMWOOD) 상세\n3. JIT 도입 조건과 효과\n4. 유통업 JIT 적용 사례\n5. 연습문제 3개' },
        { id: 15, question: '재고회전율의 의미와 개선방안을 설명하시오.', answer: '연간매출/평균재고, 높을수록 효율적', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 재고회전율의 의미와 개선방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재고회전율의 정의와 계산\n2. 재고회전일수(DSI)와의 관계\n3. 업종별 적정 재고회전율\n4. 재고회전율 개선 전략\n5. 연습문제 3개' },
        { id: 16, question: '재주문점(ROP)과 정량발주/정기발주 시스템을 비교하시오.', answer: '발주시점 vs 발주주기 기준 시스템', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 재주문점(ROP)과 정량발주/정기발주 시스템을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 재주문점(ROP)의 정의와 계산\n2. 정량발주 시스템(Q시스템)\n3. 정기발주 시스템(P시스템)\n4. 각 시스템의 장단점 비교\n5. 연습문제 3개' },
        { id: 17, question: '재고관련 비용(주문비용, 재고유지비용, 품절비용)을 설명하시오.', answer: '총재고비용 = 주문비용 + 유지비용 + 품절비용', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 재고관련 비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주문비용(발주비용)의 구성\n2. 재고유지비용(보관비용)의 구성\n3. 품절비용(기회비용)의 의미\n4. 총재고비용 최소화 전략\n5. 연습문제 3개' },
        { id: 18, question: '불용재고/사장재고 관리와 처리방안을 설명하시오.', answer: '장기 미판매 재고의 처분과 손실 최소화', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 불용재고/사장재고 관리와 처리방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불용재고의 정의와 발생 원인\n2. 사장재고의 판별 기준\n3. 불용재고 처리 방안\n4. 불용재고 예방 전략\n5. 연습문제 3개' },
        { id: 19, question: '크로스도킹(Cross-Docking)의 개념과 유형을 설명하시오.', answer: '물류센터에서 보관 없이 즉시 배송', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 크로스도킹의 개념과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 크로스도킹의 정의와 특징\n2. 크로스도킹 유형(통과형, 분류형)\n3. 크로스도킹 도입 효과\n4. 크로스도킹 적용 조건과 사례\n5. 연습문제 3개' },
        { id: 20, question: '재고실사와 재고정확도 관리방안을 설명하시오.', answer: '장부재고와 실물재고 일치 관리', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 재고실사와 재고정확도 관리방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재고실사의 정의와 종류\n2. 재고정확도(IRA)의 의미\n3. 재고 오차 발생 원인\n4. 재고정확도 향상 방안\n5. 연습문제 3개' },
      ],
    },
    {
      title: '운송관리',
      icon: '🚚',
      questions: [
        { id: 21, question: '운송수단(육상, 해상, 항공, 철도, 파이프라인)별 특성을 비교하시오.', answer: '속도, 비용, 물량, 적합 화물 기준 비교', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 운송수단별 특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 5가지 운송수단 개요\n2. 각 수단별 장단점 비교\n3. 화물 특성별 적합 운송수단\n4. 복합운송(Multimodal)의 장점\n5. 연습문제 3개' },
        { id: 22, question: '화물자동차 운송의 종류(영업용, 자가용)와 특징을 설명하시오.', answer: '영업용: 타인 화물, 자가용: 자사 화물', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 화물자동차 운송의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업용 화물운송의 정의와 유형\n2. 자가용 화물운송의 정의와 특징\n3. 영업용 vs 자가용 비교\n4. 화물운송 선택 시 고려사항\n5. 연습문제 3개' },
        { id: 23, question: '배차관리와 운송경로 최적화 방법을 설명하시오.', answer: 'VRP(차량경로문제), 적재효율 최대화', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 배차관리와 운송경로 최적화 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배차관리의 정의와 중요성\n2. VRP(차량경로문제)의 개념\n3. 경로 최적화 알고리즘\n4. TMS 활용 배차 자동화\n5. 연습문제 3개' },
        { id: 24, question: '운송비용 구조와 운임산정 방식을 설명하시오.', answer: '고정비(차량비) + 변동비(유류비, 인건비)', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 운송비용 구조와 운임산정 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운송비용의 구성요소\n2. 운임산정 방식(거리, 중량, CBM 등)\n3. 운송원가 절감 방안\n4. 운송계약 유형과 협상\n5. 연습문제 3개' },
        { id: 25, question: '공동배송(공동물류)의 개념과 효과를 설명하시오.', answer: '복수 기업 물류 공유로 비용 절감', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 공동배송의 개념과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공동배송의 정의와 유형\n2. 공동배송 도입 효과\n3. 공동배송 운영 모델\n4. 국내 공동배송 사례\n5. 연습문제 3개' },
        { id: 26, question: '라스트마일(Last Mile) 배송의 과제와 해결방안을 설명하시오.', answer: '최종 소비자 배송 구간의 효율화', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 라스트마일 배송의 과제와 해결방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라스트마일의 정의와 중요성\n2. 라스트마일 배송의 과제\n3. 해결방안(배송로봇, 드론 등)\n4. 라스트마일 혁신 사례\n5. 연습문제 3개' },
        { id: 27, question: '역물류(Reverse Logistics)의 개념과 관리방안을 설명하시오.', answer: '반품, 회수, 재활용 물류의 체계적 관리', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 역물류의 개념과 관리방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역물류의 정의와 중요성\n2. 역물류의 유형(반품, 회수, 폐기)\n3. 효율적인 역물류 관리 방안\n4. 역물류 비용 절감 전략\n5. 연습문제 3개' },
        { id: 28, question: '콜드체인(Cold Chain)물류의 특징과 관리방안을 설명하시오.', answer: '저온 유통체계를 통한 신선도 유지', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 콜드체인물류의 특징과 관리방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 콜드체인의 정의와 대상 품목\n2. 콜드체인 인프라 구성\n3. 콜드체인 품질관리 방안\n4. 콜드체인 기술 동향\n5. 연습문제 3개' },
        { id: 29, question: '택배물류 시스템과 허브앤스포크(Hub & Spoke) 방식을 설명하시오.', answer: '중앙 허브를 통한 집하-분류-배송 체계', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 택배물류 시스템과 허브앤스포크 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 택배물류의 정의와 특징\n2. 허브앤스포크 방식의 원리\n3. 택배 터미널 운영 구조\n4. 국내 택배시장 현황과 동향\n5. 연습문제 3개' },
        { id: 30, question: '퀵커머스(Quick Commerce)의 개념과 물류전략을 설명하시오.', answer: '주문 후 1시간 이내 초고속 배송', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 퀵커머스의 개념과 물류전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퀵커머스의 정의와 등장 배경\n2. 퀵커머스 물류 인프라(MFC 등)\n3. 퀵커머스 운영 전략\n4. 국내외 퀵커머스 사례\n5. 연습문제 3개' },
      ],
    },
    {
      title: '보관·하역',
      icon: '🏭',
      questions: [
        { id: 31, question: '물류센터 유형(DC, TC, FC)의 특징을 비교하시오.', answer: 'DC: 재고보관, TC: 통과, FC: 풀필먼트', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 물류센터 유형(DC, TC, FC)의 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. DC(Distribution Center)의 특징\n2. TC(Transfer Center)의 특징\n3. FC(Fulfillment Center)의 특징\n4. 물류센터 유형 선택 기준\n5. 연습문제 3개' },
        { id: 32, question: '창고 레이아웃 설계와 공간 활용 방안을 설명하시오.', answer: '입출고 동선, 저장효율, 작업효율 최적화', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 창고 레이아웃 설계와 공간 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 창고 레이아웃의 기본 원칙\n2. 흐름형 vs U자형 레이아웃\n3. 저장 공간 효율화 방안\n4. 레이아웃 설계 시 고려사항\n5. 연습문제 3개' },
        { id: 33, question: '로케이션 관리(고정/자유 로케이션)의 차이를 설명하시오.', answer: '고정: 지정위치, 자유: 빈공간 활용', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 로케이션 관리(고정/자유 로케이션)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 로케이션 관리의 정의\n2. 고정 로케이션의 장단점\n3. 자유 로케이션의 장단점\n4. 복합 로케이션 운영 방안\n5. 연습문제 3개' },
        { id: 34, question: '피킹(Picking) 방식의 종류와 효율화 방안을 설명하시오.', answer: '싱글피킹, 배치피킹, 존피킹, 웨이브피킹', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 피킹 방식의 종류와 효율화 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피킹의 정의와 중요성\n2. 피킹 방식별 특징 비교\n3. 피킹 효율화 방안\n4. 피킹 자동화 기술\n5. 연습문제 3개' },
        { id: 35, question: '하역장비(지게차, 컨베이어, 크레인 등)의 종류와 용도를 설명하시오.', answer: '화물 특성과 작업 환경에 맞는 장비 선택', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 하역장비의 종류와 용도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지게차의 종류와 용도\n2. 컨베이어 시스템의 종류\n3. 크레인 및 호이스트\n4. 하역장비 선택 기준\n5. 연습문제 3개' },
        { id: 36, question: '랙(Rack) 시스템의 종류와 특징을 설명하시오.', answer: '선반식, 파렛트랙, 드라이브인, 모빌랙 등', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 랙 시스템의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선반식 랙의 특징\n2. 파렛트 랙의 종류\n3. 자동화 랙(AS/RS) 시스템\n4. 랙 시스템 선택 기준\n5. 연습문제 3개' },
        { id: 37, question: '유닛로드 시스템과 파렛트화(Palletization)의 효과를 설명하시오.', answer: '표준화된 화물단위로 물류효율 향상', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 유닛로드 시스템과 파렛트화의 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유닛로드의 정의와 목적\n2. 파렛트 표준 규격\n3. 파렛트화의 효과\n4. 파렛트 풀 시스템\n5. 연습문제 3개' },
        { id: 38, question: '물류센터 자동화 기술(AS/RS, AGV, AMR)을 설명하시오.', answer: '자동창고, 무인운반차, 자율이동로봇', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 물류센터 자동화 기술을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AS/RS(자동창고시스템)의 구성\n2. AGV(무인운반차)의 특징\n3. AMR(자율이동로봇)의 특징\n4. 물류 자동화 도입 효과\n5. 연습문제 3개' },
        { id: 39, question: '포장(Packaging)의 기능과 물류포장 설계 원칙을 설명하시오.', answer: '보호, 편리, 정보전달, 환경친화 기능', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 포장의 기능과 물류포장 설계 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포장의 4가지 기능\n2. 포장 단계(개장, 내장, 외장)\n3. 물류포장 설계 원칙\n4. 친환경 포장 트렌드\n5. 연습문제 3개' },
        { id: 40, question: '보관비용과 창고관리 효율화 지표를 설명하시오.', answer: '보관효율, 작업효율, 재고정확도', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 보관비용과 창고관리 효율화 지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보관비용의 구성요소\n2. 창고 효율화 지표(KPI)\n3. 보관효율 향상 방안\n4. 창고관리 비용 절감 전략\n5. 연습문제 3개' },
      ],
    },
    {
      title: '물류정보·비용',
      icon: '💻',
      questions: [
        { id: 41, question: 'WMS(창고관리시스템)의 기능과 도입효과를 설명하시오.', answer: '입출고, 재고, 피킹 등 창고업무 통합관리', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: WMS의 기능과 도입효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. WMS의 정의와 주요 기능\n2. WMS 도입 효과\n3. WMS 구축 시 고려사항\n4. WMS 도입 사례\n5. 연습문제 3개' },
        { id: 42, question: 'TMS(운송관리시스템)의 기능과 활용방안을 설명하시오.', answer: '배차, 경로최적화, 운송추적, 정산', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: TMS의 기능과 활용방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TMS의 정의와 주요 기능\n2. TMS 도입 효과\n3. WMS와 TMS 연계\n4. TMS 활용 사례\n5. 연습문제 3개' },
        { id: 43, question: 'OMS(주문관리시스템)의 역할과 옴니채널 연계를 설명하시오.', answer: '다채널 주문의 통합관리와 배정', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: OMS의 역할과 옴니채널 연계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. OMS의 정의와 주요 기능\n2. OMS와 옴니채널 전략\n3. 주문 배정과 라우팅\n4. OMS-WMS-TMS 연계\n5. 연습문제 3개' },
        { id: 44, question: 'RFID 기술의 원리와 물류 적용사례를 설명하시오.', answer: '무선주파수 인식으로 실시간 추적', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: RFID 기술의 원리와 물류 적용사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RFID의 정의와 구성요소\n2. RFID와 바코드 비교\n3. 물류분야 RFID 적용 사례\n4. RFID 도입 시 고려사항\n5. 연습문제 3개' },
        { id: 45, question: '물류비 산정 방법(ABC 원가)과 관리방안을 설명하시오.', answer: '활동기준원가로 정확한 물류비 배분', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 물류비 산정 방법과 관리방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물류비의 정의와 구성\n2. 물류비 산정 방법\n3. ABC(활동기준원가) 적용\n4. 물류비 절감 전략\n5. 연습문제 3개' },
        { id: 46, question: '물류아웃소싱(3PL, 4PL)의 개념과 선정기준을 설명하시오.', answer: '제3자/4자 물류의 특징과 효과', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 물류아웃소싱(3PL, 4PL)의 개념과 선정기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1PL~4PL의 정의와 특징\n2. 3PL과 4PL의 차이점\n3. 물류아웃소싱 선정기준\n4. 아웃소싱 계약 시 고려사항\n5. 연습문제 3개' },
        { id: 47, question: 'KPI(핵심성과지표)를 활용한 물류성과 관리방안을 설명하시오.', answer: '비용, 시간, 품질, 유연성 지표', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: KPI를 활용한 물류성과 관리방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물류 KPI의 정의와 중요성\n2. 주요 물류 KPI 항목\n3. KPI 설정과 모니터링\n4. 물류성과 개선 사례\n5. 연습문제 3개' },
        { id: 48, question: '디지털 트윈(Digital Twin)의 물류 적용을 설명하시오.', answer: '가상공간에 물류시설 복제하여 시뮬레이션', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 디지털 트윈의 물류 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디지털 트윈의 정의\n2. 물류분야 적용 방안\n3. 디지털 트윈의 효과\n4. 도입 사례와 전망\n5. 연습문제 3개' },
        { id: 49, question: '물류 빅데이터 분석과 AI 활용방안을 설명하시오.', answer: '수요예측, 경로최적화, 재고관리 등 적용', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 물류 빅데이터 분석과 AI 활용방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물류 빅데이터의 정의와 유형\n2. 빅데이터 분석 활용 분야\n3. AI/머신러닝 적용 사례\n4. 데이터 기반 물류 혁신\n5. 연습문제 3개' },
        { id: 50, question: '물류 표준화(바코드, GLN, GTIN)의 종류와 효과를 설명하시오.', answer: 'GS1 표준 기반 글로벌 물류 호환성 확보', prompt: '유통관리사 1급 물류경영 문제입니다.\n\n문제: 물류 표준화의 종류와 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물류 표준화의 정의와 목적\n2. GS1 표준(GTIN, GLN, SSCC)\n3. 바코드 종류와 용도\n4. 물류 표준화의 효과\n5. 연습문제 3개' },
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
            <span className="text-emerald-600 font-medium">물류경영</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">📦</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">물류경영</h1>
              <p className="text-emerald-100">유통관리사 1급 · 제2과목</p>
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
