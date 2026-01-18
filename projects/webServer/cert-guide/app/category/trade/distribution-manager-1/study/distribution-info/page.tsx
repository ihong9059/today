'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

export default function DistributionInfoStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-1-distribution-info-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('distribution-manager-1-distribution-info-completed', JSON.stringify(updated));
  };

  const topics = [
    {
      title: 'POS 시스템',
      icon: '🖥️',
      questions: [
        { id: 1, question: 'POS(Point of Sale) 시스템의 정의와 구성요소를 설명하시오.', answer: '판매시점 정보관리 시스템, HW/SW 구성', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: POS 시스템의 정의와 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. POS 시스템의 정의\n2. 하드웨어 구성요소\n3. 소프트웨어 구성요소\n4. POS 시스템 도입 효과\n5. 연습문제 3개' },
        { id: 2, question: 'POS 데이터 분석을 통한 경영정보 활용방안을 설명하시오.', answer: '판매분석, 재고관리, 고객분석 활용', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: POS 데이터 분석을 통한 경영정보 활용방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. POS 데이터의 유형\n2. 판매 분석 방법\n3. 재고관리 연동\n4. 고객 구매패턴 분석\n5. 연습문제 3개' },
        { id: 3, question: 'ABC 분석과 교차분석(장바구니 분석)을 설명하시오.', answer: '상품 중요도 분류, 연관구매 분석', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: ABC 분석과 교차분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ABC 분석의 원리\n2. 교차분석(장바구니 분석)의 개념\n3. 연관규칙 마이닝\n4. 분석 결과 활용 방안\n5. 연습문제 3개' },
        { id: 4, question: '클라우드 POS와 기존 POS의 차이를 비교하시오.', answer: '클라우드 기반 vs 로컬 서버 기반', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 클라우드 POS와 기존 POS의 차이를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 기존(온프레미스) POS 특징\n2. 클라우드 POS 특징\n3. 두 방식의 장단점 비교\n4. 클라우드 POS 도입 시 고려사항\n5. 연습문제 3개' },
        { id: 5, question: 'mPOS(모바일 POS)의 개념과 활용 사례를 설명하시오.', answer: '스마트폰/태블릿 기반 이동형 POS', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: mPOS의 개념과 활용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. mPOS의 정의\n2. mPOS의 장점\n3. mPOS 활용 사례\n4. mPOS 도입 시 고려사항\n5. 연습문제 3개' },
        { id: 6, question: '재고관리와 POS 연동의 중요성을 설명하시오.', answer: '실시간 재고 파악, 자동 발주 연계', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 재고관리와 POS 연동의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. POS-재고관리 연동의 원리\n2. 실시간 재고 파악의 효과\n3. 자동 발주 시스템 연계\n4. 재고 오차 방지 방안\n5. 연습문제 3개' },
        { id: 7, question: 'POS 시스템의 보안 위협과 대응방안을 설명하시오.', answer: '카드정보 유출, 해킹 방지 대책', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: POS 시스템의 보안 위협과 대응방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. POS 보안 위협 유형\n2. 카드정보 보호(PCI-DSS)\n3. 보안 대응 방안\n4. 정기 보안 점검 방법\n5. 연습문제 3개' },
        { id: 8, question: 'Self POS/무인계산대의 개념과 장단점을 설명하시오.', answer: '고객 셀프 결제 시스템', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: Self POS/무인계산대의 개념과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Self POS의 정의\n2. Self POS의 장점\n3. Self POS의 단점과 과제\n4. 도난 방지 대책\n5. 연습문제 3개' },
        { id: 9, question: 'POS 데이터와 CRM 연계 활용방안을 설명하시오.', answer: '구매이력 기반 개인화 마케팅', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: POS 데이터와 CRM 연계 활용방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. POS-CRM 연계의 의미\n2. 고객 구매이력 활용\n3. 개인화 프로모션 실행\n4. 고객 세그먼트 분석\n5. 연습문제 3개' },
        { id: 10, question: 'POS 시스템 도입 시 ROI 분석방법을 설명하시오.', answer: '투자비용 대비 효과 산출', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: POS 시스템 도입 시 ROI 분석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. POS 도입 비용 항목\n2. POS 도입 효과 항목\n3. ROI 계산 방법\n4. 투자 회수기간 산출\n5. 연습문제 3개' },
      ],
    },
    {
      title: 'EDI·표준코드',
      icon: '📊',
      questions: [
        { id: 11, question: 'EDI(Electronic Data Interchange)의 정의와 효과를 설명하시오.', answer: '전자문서교환, 업무효율화', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: EDI의 정의와 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. EDI의 정의\n2. EDI 도입 효과\n3. EDI 표준(UN/EDIFACT, ANSI X12)\n4. EDI 운영 구조\n5. 연습문제 3개' },
        { id: 12, question: 'VAN(Value Added Network)의 역할과 서비스를 설명하시오.', answer: '부가가치통신망, EDI 중계 서비스', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: VAN의 역할과 서비스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VAN의 정의\n2. VAN 서비스 유형\n3. VAN과 EDI의 관계\n4. 국내 VAN 사업자 현황\n5. 연습문제 3개' },
        { id: 13, question: '바코드의 종류와 유통분야 활용을 설명하시오.', answer: 'EAN-13, UPC, Code128 등', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 바코드의 종류와 유통분야 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 바코드의 원리\n2. 1차원 바코드 종류\n3. 2차원 바코드(QR코드)\n4. 유통분야 바코드 활용\n5. 연습문제 3개' },
        { id: 14, question: 'GS1 표준(GTIN, GLN, SSCC)을 설명하시오.', answer: '글로벌 상품/위치/물류 식별코드', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: GS1 표준(GTIN, GLN, SSCC)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. GS1의 역할\n2. GTIN(상품식별코드)\n3. GLN(위치식별코드)\n4. SSCC(물류단위코드)\n5. 연습문제 3개' },
        { id: 15, question: 'RFID의 원리와 유통물류 적용을 설명하시오.', answer: '무선주파수 인식, 비접촉 자동인식', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: RFID의 원리와 유통물류 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RFID의 구성요소\n2. RFID 작동 원리\n3. 바코드와 RFID 비교\n4. 유통물류 RFID 적용 사례\n5. 연습문제 3개' },
        { id: 16, question: 'EPC(Electronic Product Code)와 EPCglobal 네트워크를 설명하시오.', answer: '전자상품코드, 글로벌 추적 네트워크', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: EPC와 EPCglobal 네트워크를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. EPC의 정의와 구조\n2. EPCglobal 네트워크\n3. EPCIS(정보서비스)\n4. EPC 기반 추적 시스템\n5. 연습문제 3개' },
        { id: 17, question: '물류 표준화의 필요성과 효과를 설명하시오.', answer: '파렛트, 컨테이너, 물류정보 표준화', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 물류 표준화의 필요성과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물류 표준화의 정의\n2. 표준화 대상(파렛트, 컨테이너 등)\n3. 물류정보 표준화\n4. 표준화의 효과\n5. 연습문제 3개' },
        { id: 18, question: 'XML/EDI와 Web EDI의 특징을 비교하시오.', answer: '인터넷 기반 전자문서교환', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: XML/EDI와 Web EDI의 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 전통적 EDI의 한계\n2. XML/EDI의 특징\n3. Web EDI의 특징\n4. 각 방식의 장단점 비교\n5. 연습문제 3개' },
        { id: 19, question: 'API 기반 데이터 연동의 개념과 활용을 설명하시오.', answer: '응용프로그램 인터페이스를 통한 실시간 연동', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: API 기반 데이터 연동의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. API의 정의\n2. REST API의 특징\n3. 유통분야 API 활용 사례\n4. Open API와 비즈니스 연계\n5. 연습문제 3개' },
        { id: 20, question: '상품마스터 데이터 관리(MDM)를 설명하시오.', answer: '상품 기준정보의 통합 관리', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 상품마스터 데이터 관리(MDM)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MDM의 정의와 목적\n2. 상품마스터 데이터 항목\n3. 데이터 품질 관리\n4. MDM 시스템 구축 방안\n5. 연습문제 3개' },
      ],
    },
    {
      title: 'ERP·SCM시스템',
      icon: '🔧',
      questions: [
        { id: 21, question: 'ERP(전사적자원관리)의 개념과 핵심 모듈을 설명하시오.', answer: '기업 자원의 통합 관리 시스템', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: ERP의 개념과 핵심 모듈을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ERP의 정의와 발전과정\n2. ERP 핵심 모듈(재무, 물류, 인사 등)\n3. 유통기업 ERP 특성\n4. ERP 도입 효과\n5. 연습문제 3개' },
        { id: 22, question: 'SCM 시스템의 구성과 기능을 설명하시오.', answer: '공급망 계획-실행-모니터링 시스템', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: SCM 시스템의 구성과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SCM 시스템의 정의\n2. 계획(Planning) 시스템\n3. 실행(Execution) 시스템\n4. 모니터링/분석 시스템\n5. 연습문제 3개' },
        { id: 23, question: 'WMS(창고관리시스템)의 기능과 도입효과를 설명하시오.', answer: '입출고, 재고, 피킹 등 창고업무 관리', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: WMS의 기능과 도입효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. WMS의 정의\n2. WMS 주요 기능\n3. WMS 도입 효과\n4. WMS 선정 시 고려사항\n5. 연습문제 3개' },
        { id: 24, question: 'TMS(운송관리시스템)의 기능과 활용을 설명하시오.', answer: '배차, 경로최적화, 운송추적, 정산', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: TMS의 기능과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TMS의 정의\n2. TMS 주요 기능\n3. TMS 도입 효과\n4. WMS-TMS 연계\n5. 연습문제 3개' },
        { id: 25, question: 'OMS(주문관리시스템)의 역할과 옴니채널 연계를 설명하시오.', answer: '다채널 주문의 통합관리', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: OMS의 역할과 옴니채널 연계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. OMS의 정의\n2. OMS 주요 기능\n3. 옴니채널과 OMS 연계\n4. OMS 도입 효과\n5. 연습문제 3개' },
        { id: 26, question: 'SRM(공급업체관계관리)의 개념과 기능을 설명하시오.', answer: '공급업체 선정-평가-협업 관리', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: SRM의 개념과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SRM의 정의\n2. SRM 주요 기능\n3. 공급업체 평가 관리\n4. SRM 도입 효과\n5. 연습문제 3개' },
        { id: 27, question: 'BI(Business Intelligence)와 데이터 분석 활용을 설명하시오.', answer: '비즈니스 의사결정 지원 분석 도구', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: BI와 데이터 분석 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BI의 정의와 목적\n2. BI 시스템 구성요소\n3. 대시보드와 리포팅\n4. 유통업 BI 활용 사례\n5. 연습문제 3개' },
        { id: 28, question: 'SaaS 기반 유통정보시스템의 특징을 설명하시오.', answer: '클라우드 기반 구독형 서비스', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: SaaS 기반 유통정보시스템의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SaaS의 정의\n2. SaaS vs On-premise 비교\n3. SaaS 유통시스템 장단점\n4. SaaS 도입 시 고려사항\n5. 연습문제 3개' },
        { id: 29, question: '시스템 통합(SI)과 데이터 통합의 중요성을 설명하시오.', answer: '이기종 시스템 간 연계와 데이터 일원화', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 시스템 통합과 데이터 통합의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템 통합의 필요성\n2. EAI/ESB 개념\n3. 데이터 통합 방법\n4. 통합 시 고려사항\n5. 연습문제 3개' },
        { id: 30, question: '레거시 시스템 현대화 전략을 설명하시오.', answer: '구형 시스템의 클라우드 전환, 재구축', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 레거시 시스템 현대화 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 레거시 시스템의 정의와 문제점\n2. 현대화 전략 유형\n3. 클라우드 마이그레이션\n4. 현대화 추진 시 고려사항\n5. 연습문제 3개' },
      ],
    },
    {
      title: 'e-커머스',
      icon: '🛒',
      questions: [
        { id: 31, question: 'e-커머스의 유형(B2B, B2C, C2C)을 비교하시오.', answer: '거래 주체별 전자상거래 분류', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: e-커머스의 유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. B2B 전자상거래 특징\n2. B2C 전자상거래 특징\n3. C2C 전자상거래 특징\n4. 각 유형별 플랫폼 사례\n5. 연습문제 3개' },
        { id: 32, question: '온라인 쇼핑몰의 유형(오픈마켓, 종합몰, 버티컬)을 설명하시오.', answer: '플랫폼 특성별 온라인 쇼핑몰 분류', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 온라인 쇼핑몰의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오픈마켓의 특징\n2. 종합몰의 특징\n3. 버티컬 커머스의 특징\n4. 각 유형별 성공 사례\n5. 연습문제 3개' },
        { id: 33, question: 'O2O(Online to Offline) 서비스의 개념과 사례를 설명하시오.', answer: '온라인-오프라인 연계 서비스', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: O2O 서비스의 개념과 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. O2O의 정의\n2. O2O 비즈니스 모델\n3. O2O 서비스 사례(배달, 숙박 등)\n4. O2O 성공 요인\n5. 연습문제 3개' },
        { id: 34, question: '옴니채널 전략과 구현방안을 설명하시오.', answer: '온-오프라인 채널의 끊김 없는 통합', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 옴니채널 전략과 구현방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 옴니채널의 정의\n2. 멀티채널과 옴니채널 차이\n3. 옴니채널 구현 요소\n4. 옴니채널 성공 사례\n5. 연습문제 3개' },
        { id: 35, question: 'm-커머스(모바일 커머스)의 특성과 트렌드를 설명하시오.', answer: '모바일 기기 기반 전자상거래', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: m-커머스의 특성과 트렌드를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. m-커머스의 정의\n2. m-커머스 성장 배경\n3. 모바일 쇼핑 특성\n4. m-커머스 트렌드\n5. 연습문제 3개' },
        { id: 36, question: '소셜커머스와 라이브커머스를 비교하시오.', answer: 'SNS 연계 vs 실시간 방송 판매', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 소셜커머스와 라이브커머스를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 소셜커머스의 정의와 특징\n2. 라이브커머스의 정의와 특징\n3. 두 방식의 비교\n4. 각 플랫폼 사례\n5. 연습문제 3개' },
        { id: 37, question: '전자상거래 결제시스템의 종류와 보안을 설명하시오.', answer: '신용카드, 간편결제, 가상계좌 등', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 전자상거래 결제시스템의 종류와 보안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자결제 수단 종류\n2. 간편결제 서비스\n3. 결제 보안 기술(SSL, 3D Secure)\n4. PG(결제대행) 사업자 역할\n5. 연습문제 3개' },
        { id: 38, question: '전자상거래 물류(풀필먼트)의 특성을 설명하시오.', answer: '주문처리-포장-배송 일괄 대행', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 전자상거래 물류(풀필먼트)의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 풀필먼트의 정의\n2. 풀필먼트 서비스 범위\n3. e-커머스 물류의 특수성\n4. 풀필먼트 서비스 사례\n5. 연습문제 3개' },
        { id: 39, question: '역직구와 해외직구의 개념과 현황을 설명하시오.', answer: '국내→해외 vs 해외→국내 온라인 구매', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 역직구와 해외직구의 개념과 현황을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해외직구의 정의와 현황\n2. 역직구의 정의와 현황\n3. 관세 및 통관 절차\n4. 크로스보더 e-커머스 전략\n5. 연습문제 3개' },
        { id: 40, question: '전자상거래 관련 법규(전자상거래법, 전자서명법)를 설명하시오.', answer: '소비자 보호, 청약철회, 전자문서 효력', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 전자상거래 관련 법규를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전자상거래법 주요 내용\n2. 청약철회 규정\n3. 전자서명법의 내용\n4. 개인정보보호법 관련 규정\n5. 연습문제 3개' },
      ],
    },
    {
      title: '빅데이터·AI·보안',
      icon: '🤖',
      questions: [
        { id: 41, question: '빅데이터의 정의와 3V(Volume, Velocity, Variety)를 설명하시오.', answer: '대용량, 고속처리, 다양한 형태의 데이터', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 빅데이터의 정의와 3V를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 빅데이터의 정의\n2. 3V(Volume, Velocity, Variety)\n3. 빅데이터 분석 기술\n4. 유통업 빅데이터 활용\n5. 연습문제 3개' },
        { id: 42, question: '유통업 빅데이터 활용 사례를 설명하시오.', answer: '수요예측, 개인화추천, 재고최적화', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 유통업 빅데이터 활용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수요예측 분석\n2. 개인화 추천 시스템\n3. 재고 최적화\n4. 고객 세분화 분석\n5. 연습문제 3개' },
        { id: 43, question: 'AI(인공지능)의 유통업 적용분야를 설명하시오.', answer: '챗봇, 추천, 수요예측, 무인매장', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: AI의 유통업 적용분야를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AI 챗봇 서비스\n2. AI 기반 상품 추천\n3. AI 수요예측\n4. 무인매장(Amazon Go 등)\n5. 연습문제 3개' },
        { id: 44, question: '머신러닝과 딥러닝의 차이를 설명하시오.', answer: '특징 추출 방식의 차이', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 머신러닝과 딥러닝의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 머신러닝의 정의와 유형\n2. 딥러닝의 정의와 특징\n3. 두 방식의 차이점\n4. 유통업 적용 사례\n5. 연습문제 3개' },
        { id: 45, question: '개인정보보호법의 주요 내용과 준수사항을 설명하시오.', answer: '수집-이용-제공 동의, 안전조치', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 개인정보보호법의 주요 내용과 준수사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인정보보호법의 목적\n2. 개인정보 수집-이용 동의\n3. 안전조치 의무\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 46, question: '정보보안의 3요소(기밀성, 무결성, 가용성)를 설명하시오.', answer: 'CIA: 정보보안의 핵심 원칙', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 정보보안의 3요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기밀성(Confidentiality)의 개념\n2. 무결성(Integrity)의 개념\n3. 가용성(Availability)의 개념\n4. 보안 구현 방법\n5. 연습문제 3개' },
        { id: 47, question: '암호화 기술(대칭키, 비대칭키)을 설명하시오.', answer: '데이터 보호를 위한 암호화 방식', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 암호화 기술을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대칭키 암호화\n2. 비대칭키(공개키) 암호화\n3. 해시 함수\n4. 암호화 기술 적용 사례\n5. 연습문제 3개' },
        { id: 48, question: '블록체인 기술의 유통물류 적용을 설명하시오.', answer: '분산원장으로 투명한 이력관리', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 블록체인 기술의 유통물류 적용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 블록체인의 정의와 원리\n2. 블록체인의 특징\n3. 유통물류 적용 사례\n4. 식품 이력추적 활용\n5. 연습문제 3개' },
        { id: 49, question: 'IoT(사물인터넷)의 유통물류 활용을 설명하시오.', answer: '센서 기반 실시간 모니터링', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: IoT의 유통물류 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IoT의 정의\n2. 유통물류 IoT 적용 분야\n3. 스마트 선반, 콜드체인 센서\n4. IoT 데이터 활용 방안\n5. 연습문제 3개' },
        { id: 50, question: '디지털 전환(DX)과 유통업의 미래를 설명하시오.', answer: '디지털 기술 기반 비즈니스 혁신', prompt: '유통관리사 1급 유통정보 문제입니다.\n\n문제: 디지털 전환과 유통업의 미래를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디지털 전환(DX)의 정의\n2. 유통업 DX 추진 영역\n3. 무인화, 자동화 트렌드\n4. 유통업의 미래 전망\n5. 연습문제 3개' },
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
            <span className="text-emerald-600 font-medium">유통정보</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">💻</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">유통정보</h1>
              <p className="text-emerald-100">유통관리사 1급 · 제5과목</p>
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
