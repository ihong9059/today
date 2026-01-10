'use client';

import { useState, useEffect } from 'react';

export default function DistributionManagementStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-1-distribution-management-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const saveProgress = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('distribution-manager-1-distribution-management-completed', JSON.stringify(updated));
  };

  const topics = [
    {
      title: '유통전략',
      icon: '🎯',
      questions: [
        { id: 1, question: 'SWOT 분석에서 SO 전략의 의미와 유통기업 적용 사례를 설명하시오.', answer: '강점으로 기회를 활용하는 공격적 전략', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: SWOT 분석에서 SO 전략의 의미와 유통기업 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SWOT 분석의 4가지 전략 유형\n2. SO 전략의 정의와 특징\n3. 유통기업 SO 전략 실제 사례\n4. 타 전략(WO, ST, WT)과의 비교\n5. 연습문제 3개' },
        { id: 2, question: '포터의 본원적 경쟁전략 3가지를 유통업에 적용하여 설명하시오.', answer: '원가우위, 차별화, 집중화 전략', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 포터의 본원적 경쟁전략 3가지를 유통업에 적용하여 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포터의 본원적 경쟁전략 개요\n2. 원가우위 전략과 유통업 사례(예: 이마트 에브리데이)\n3. 차별화 전략과 유통업 사례(예: 백화점)\n4. 집중화 전략과 유통업 사례(예: 전문점)\n5. 연습문제 3개' },
        { id: 3, question: '수직적 통합전략의 전방통합과 후방통합을 구분하여 설명하시오.', answer: '전방: 유통채널 확보, 후방: 공급업체 통합', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 수직적 통합전략의 전방통합과 후방통합을 구분하여 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수직적 통합전략의 정의\n2. 전방통합의 개념과 사례\n3. 후방통합의 개념과 사례\n4. 수평적 통합과의 차이\n5. 연습문제 3개' },
        { id: 4, question: '유통채널 갈등(Channel Conflict)의 유형과 해결방안을 제시하시오.', answer: '수직적·수평적·복수채널 갈등, 조정기구 설치', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통채널 갈등(Channel Conflict)의 유형과 해결방안을 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 유통채널 갈등의 정의\n2. 수직적 갈등의 원인과 사례\n3. 수평적 갈등의 원인과 사례\n4. 갈등 해결 방안 5가지\n5. 연습문제 3개' },
        { id: 5, question: '유통업의 성장전략 중 앤소프 매트릭스 4가지를 설명하시오.', answer: '시장침투, 시장개발, 제품개발, 다각화', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통업의 성장전략 중 앤소프 매트릭스 4가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 앤소프 매트릭스 개요\n2. 시장침투 전략과 유통업 사례\n3. 시장개발·제품개발 전략 사례\n4. 다각화 전략의 유형과 사례\n5. 연습문제 3개' },
        { id: 6, question: '옴니채널 전략의 개념과 멀티채널과의 차이점을 설명하시오.', answer: '채널 간 끊김 없는 통합 쇼핑 경험 제공', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 옴니채널 전략의 개념과 멀티채널과의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 옴니채널의 정의와 등장 배경\n2. 멀티채널과의 핵심 차이점\n3. 옴니채널 구현 사례(SSG, 롯데온 등)\n4. 옴니채널 성공 요건\n5. 연습문제 3개' },
        { id: 7, question: 'SPA(제조직매형 의류전문점)의 특징과 성공요인을 설명하시오.', answer: '기획-생산-유통 수직통합, 빠른 트렌드 대응', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: SPA(제조직매형 의류전문점)의 특징과 성공요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SPA의 정의와 유래\n2. SPA 비즈니스 모델 특징\n3. 대표 SPA 브랜드(유니클로, 자라) 분석\n4. SPA 성공의 핵심 요인\n5. 연습문제 3개' },
        { id: 8, question: '글로벌 소싱(Global Sourcing)전략의 장단점을 설명하시오.', answer: '원가절감 vs 품질관리·리드타임 리스크', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 글로벌 소싱(Global Sourcing)전략의 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 글로벌 소싱의 정의\n2. 글로벌 소싱의 장점 4가지\n3. 글로벌 소싱의 단점과 리스크\n4. 성공적인 글로벌 소싱 전략\n5. 연습문제 3개' },
        { id: 9, question: '유통업의 M&A 전략 목적과 시너지 효과를 설명하시오.', answer: '규모의 경제, 시장지배력 강화, 역량 보완', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통업의 M&A 전략 목적과 시너지 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유통업 M&A의 주요 목적\n2. M&A 시너지 효과 유형\n3. 국내 유통업 M&A 사례(롯데-하이마트 등)\n4. M&A 실패 요인과 주의점\n5. 연습문제 3개' },
        { id: 10, question: '전략적 제휴의 유형과 유통업 적용 사례를 제시하시오.', answer: '공동마케팅, 공동물류, 기술제휴 등', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 전략적 제휴의 유형과 유통업 적용 사례를 제시하시오.\n\n다음 순서로 설명해주세요:\n1. 전략적 제휴의 정의와 목적\n2. 제휴 유형별 특징\n3. 유통업 전략적 제휴 사례\n4. 성공적인 제휴 조건\n5. 연습문제 3개' },
      ],
    },
    {
      title: '유통조직',
      icon: '🏢',
      questions: [
        { id: 11, question: '유통기업의 조직구조 유형(기능별, 사업부제, 매트릭스)을 비교 설명하시오.', answer: '기능별: 효율성, 사업부제: 자율성, 매트릭스: 유연성', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통기업의 조직구조 유형을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기능별 조직의 특징과 장단점\n2. 사업부제 조직의 특징과 장단점\n3. 매트릭스 조직의 특징과 장단점\n4. 유통기업별 적합한 조직구조\n5. 연습문제 3개' },
        { id: 12, question: '수평적 조직과 수직적 조직의 특징을 비교하시오.', answer: '수평: 의사소통 원활, 수직: 명확한 지휘체계', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 수평적 조직과 수직적 조직의 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 수직적 조직의 정의와 특징\n2. 수평적 조직의 정의와 특징\n3. 각 조직형태의 장단점\n4. 유통기업에서의 적용 사례\n5. 연습문제 3개' },
        { id: 13, question: '조직문화의 유형(클랜, 애드호크라시, 시장, 위계)을 설명하시오.', answer: '경쟁가치모형 기반 4가지 조직문화 유형', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 조직문화의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경쟁가치모형 개요\n2. 클랜문화와 애드호크라시 문화\n3. 시장문화와 위계문화\n4. 유통기업 조직문화 사례\n5. 연습문제 3개' },
        { id: 14, question: '변혁적 리더십과 거래적 리더십의 차이를 설명하시오.', answer: '변혁적: 비전·영감, 거래적: 보상·처벌', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 변혁적 리더십과 거래적 리더십의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 거래적 리더십의 정의와 특징\n2. 변혁적 리더십의 정의와 특징\n3. 두 리더십의 비교\n4. 유통업 CEO 리더십 사례\n5. 연습문제 3개' },
        { id: 15, question: '유통기업의 의사결정 과정과 합리적 의사결정 모델을 설명하시오.', answer: '문제인식-대안탐색-평가-선택-실행-평가', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통기업의 의사결정 과정과 합리적 의사결정 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 의사결정의 정의와 중요성\n2. 합리적 의사결정 모델 단계\n3. 제한된 합리성과 만족화\n4. 유통기업 의사결정 사례\n5. 연습문제 3개' },
        { id: 16, question: '권한위양(Empowerment)의 개념과 유통업 적용 사례를 설명하시오.', answer: '직원에게 의사결정 권한과 책임 부여', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 권한위양(Empowerment)의 개념과 유통업 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 권한위양의 정의와 목적\n2. 권한위양의 장단점\n3. 유통업 권한위양 사례(점장 자율권 등)\n4. 성공적인 권한위양 조건\n5. 연습문제 3개' },
        { id: 17, question: '팀제 조직의 장단점과 유통기업 적용 시 고려사항을 설명하시오.', answer: '유연성·창의성 vs 책임소재 모호', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 팀제 조직의 장단점과 유통기업 적용 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 팀제 조직의 정의\n2. 팀제 도입의 장점\n3. 팀제 도입의 단점과 한계\n4. 유통기업 팀제 운영 시 고려사항\n5. 연습문제 3개' },
        { id: 18, question: '조직변화 관리(Change Management)의 8단계 모델을 설명하시오.', answer: '코터의 8단계 변화관리 모델', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 조직변화 관리의 8단계 모델을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직변화의 필요성\n2. 코터의 8단계 변화관리 모델 상세\n3. 변화 저항 요인과 극복 방안\n4. 유통기업 변화관리 사례\n5. 연습문제 3개' },
        { id: 19, question: '학습조직(Learning Organization)의 5가지 핵심역량을 설명하시오.', answer: '시스템사고, 개인숙련, 정신모델, 비전공유, 팀학습', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 학습조직의 5가지 핵심역량을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 학습조직의 정의(피터 센게)\n2. 5가지 핵심역량 상세 설명\n3. 학습조직 구축 방법\n4. 유통기업 학습조직 사례\n5. 연습문제 3개' },
        { id: 20, question: '본사-점포 간 커뮤니케이션 채널과 효과적 운영방안을 설명하시오.', answer: '수직적·수평적 커뮤니케이션 채널 구축', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 본사-점포 간 커뮤니케이션 채널과 효과적 운영방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 본사-점포 커뮤니케이션의 중요성\n2. 공식적·비공식적 커뮤니케이션 채널\n3. 효과적인 커뮤니케이션 방안\n4. 디지털 커뮤니케이션 도구 활용\n5. 연습문제 3개' },
      ],
    },
    {
      title: '인사관리',
      icon: '👥',
      questions: [
        { id: 21, question: '유통업 인적자원관리(HRM)의 특수성과 주요 과제를 설명하시오.', answer: '높은 이직률, 비정규직 비율, 감정노동', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통업 인적자원관리(HRM)의 특수성과 주요 과제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유통업 인적자원관리의 특수성\n2. 주요 HRM 과제\n3. 유통업 HRM 개선 방향\n4. 선진 유통기업 HRM 사례\n5. 연습문제 3개' },
        { id: 22, question: '역량기반 채용(Competency-based Hiring)의 개념과 절차를 설명하시오.', answer: '직무 수행에 필요한 역량 중심 선발', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 역량기반 채용의 개념과 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역량기반 채용의 정의\n2. 핵심역량 도출 방법\n3. 역량기반 채용 절차\n4. 유통업 적용 사례\n5. 연습문제 3개' },
        { id: 23, question: 'OJT와 Off-JT의 차이점과 유통업 적용 사례를 설명하시오.', answer: 'OJT: 현장교육, Off-JT: 집합교육', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: OJT와 Off-JT의 차이점과 유통업 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. OJT의 정의와 특징\n2. Off-JT의 정의와 특징\n3. 각 교육방법의 장단점\n4. 유통업 교육훈련 사례\n5. 연습문제 3개' },
        { id: 24, question: 'BSC(균형성과표)를 활용한 성과관리 체계를 설명하시오.', answer: '재무, 고객, 내부프로세스, 학습성장 관점', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: BSC를 활용한 성과관리 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BSC의 정의와 4가지 관점\n2. 각 관점별 핵심성과지표(KPI)\n3. 유통기업 BSC 적용 방법\n4. BSC 도입 시 고려사항\n5. 연습문제 3개' },
        { id: 25, question: 'MBO(목표관리제)의 개념과 운영방안을 설명하시오.', answer: '상하 합의로 목표 설정, 자율적 달성', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: MBO(목표관리제)의 개념과 운영방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MBO의 정의와 목적\n2. MBO 운영 프로세스\n3. SMART 목표 설정 원칙\n4. MBO 성공 및 실패 사례\n5. 연습문제 3개' },
        { id: 26, question: '360도 다면평가의 개념과 장단점을 설명하시오.', answer: '상사, 동료, 부하, 고객 등 다각도 평가', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 360도 다면평가의 개념과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 360도 다면평가의 정의\n2. 평가 주체와 평가 요소\n3. 장점과 단점\n4. 유통업 적용 시 고려사항\n5. 연습문제 3개' },
        { id: 27, question: '인센티브 보상제도의 유형과 효과적 운영방안을 설명하시오.', answer: '개인인센티브, 팀인센티브, 성과급', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 인센티브 보상제도의 유형과 효과적 운영방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인센티브 보상의 목적\n2. 인센티브 유형별 특징\n3. 효과적인 인센티브 설계 원칙\n4. 유통업 인센티브 사례\n5. 연습문제 3개' },
        { id: 28, question: '감정노동(Emotional Labor)관리와 종업원 보호 방안을 설명하시오.', answer: '감정규칙 완화, 휴식권 보장, 상담지원', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 감정노동관리와 종업원 보호 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감정노동의 정의와 문제점\n2. 유통업 감정노동 현황\n3. 감정노동 보호법 내용\n4. 기업의 감정노동 관리 방안\n5. 연습문제 3개' },
        { id: 29, question: '근로기준법상 유통업 근로시간 특례와 관리방안을 설명하시오.', answer: '주 52시간제, 탄력근무제, 선택근무제', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통업 근로시간 특례와 관리방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주 52시간제의 주요 내용\n2. 유통업 근로시간 특례\n3. 탄력근무제·선택근무제 활용\n4. 효율적인 근로시간 관리 방안\n5. 연습문제 3개' },
        { id: 30, question: '노사관계 관리와 노동조합 대응전략을 설명하시오.', answer: '협력적 노사관계, 단체협약, 고충처리', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 노사관계 관리와 노동조합 대응전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노사관계의 정의와 유형\n2. 노동조합의 기능과 역할\n3. 단체교섭과 단체협약\n4. 협력적 노사관계 구축 방안\n5. 연습문제 3개' },
      ],
    },
    {
      title: '재무관리',
      icon: '💰',
      questions: [
        { id: 31, question: '유통기업의 주요 재무제표와 분석지표를 설명하시오.', answer: '재무상태표, 손익계산서, 현금흐름표', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통기업의 주요 재무제표와 분석지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무상태표의 구성과 주요 항목\n2. 손익계산서의 구성과 주요 항목\n3. 현금흐름표의 구성과 중요성\n4. 유통기업 핵심 재무지표\n5. 연습문제 3개' },
        { id: 32, question: '유동비율, 당좌비율, 부채비율의 의미와 분석방법을 설명하시오.', answer: '단기지급능력, 자본구조 건전성 지표', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유동비율, 당좌비율, 부채비율의 의미와 분석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동비율의 정의와 계산\n2. 당좌비율의 정의와 유동비율과의 차이\n3. 부채비율의 정의와 해석\n4. 유통기업 안정성 분석 사례\n5. 연습문제 3개' },
        { id: 33, question: 'ROE, ROA, 매출액영업이익률의 차이를 설명하시오.', answer: '자기자본수익률, 총자산수익률, 영업수익성', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: ROE, ROA, 매출액영업이익률의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ROE의 정의와 계산 방법\n2. ROA의 정의와 ROE와의 관계\n3. 매출액영업이익률의 의미\n4. 유통기업 수익성 분석 사례\n5. 연습문제 3개' },
        { id: 34, question: '재고자산회전율과 재고일수의 의미와 개선방안을 설명하시오.', answer: '재고 효율성 지표, 회전율 높을수록 효율적', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 재고자산회전율과 재고일수의 의미와 개선방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재고자산회전율의 정의와 계산\n2. 재고일수의 정의와 해석\n3. 유통업종별 적정 재고일수\n4. 재고회전율 개선 방안\n5. 연습문제 3개' },
        { id: 35, question: '손익분기점(BEP) 분석과 유통기업 적용방법을 설명하시오.', answer: '고정비÷(1-변동비율), 수익성 분석 도구', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 손익분기점(BEP) 분석과 유통기업 적용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손익분기점의 정의\n2. BEP 계산 공식과 방법\n3. 고정비와 변동비 구분\n4. 유통점포 BEP 분석 사례\n5. 연습문제 3개' },
        { id: 36, question: '투자안 평가방법(NPV, IRR, 회수기간법)을 비교 설명하시오.', answer: '현재가치, 내부수익률, 투자비 회수기간', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 투자안 평가방법(NPV, IRR, 회수기간법)을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. NPV(순현재가치)법 설명\n2. IRR(내부수익률)법 설명\n3. 회수기간법의 장단점\n4. 유통업 신규점포 투자 평가 사례\n5. 연습문제 3개' },
        { id: 37, question: '운전자본관리의 개념과 유통기업 특수성을 설명하시오.', answer: '유동자산-유동부채, 현금순환주기 관리', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 운전자본관리의 개념과 유통기업 특수성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운전자본의 정의와 구성\n2. 현금순환주기(CCC) 개념\n3. 유통업 운전자본의 특수성\n4. 효율적인 운전자본 관리 방안\n5. 연습문제 3개' },
        { id: 38, question: '매입채무관리와 공급업체 결제조건 협상을 설명하시오.', answer: '매입채무 회전일수, 결제조건(현금/외상)', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 매입채무관리와 공급업체 결제조건 협상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 매입채무의 정의와 관리 중요성\n2. 결제조건 유형(현금, 외상 등)\n3. 대금결제 협상 전략\n4. 상생협력과 공정거래\n5. 연습문제 3개' },
        { id: 39, question: '원가관리와 ABC(활동기준원가)의 적용방법을 설명하시오.', answer: '활동별 원가동인으로 정확한 원가배분', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 원가관리와 ABC(활동기준원가)의 적용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전통적 원가계산의 한계\n2. ABC(활동기준원가)의 개념\n3. 원가동인과 활동분석\n4. 유통업 ABC 적용 사례\n5. 연습문제 3개' },
        { id: 40, question: '유통기업의 자금조달 방법과 자본구조 최적화를 설명하시오.', answer: '자기자본/타인자본, 레버리지 효과', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통기업의 자금조달 방법과 자본구조 최적화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기자본과 타인자본 조달\n2. 자금조달 원천별 특징\n3. 재무레버리지와 위험\n4. 최적 자본구조 결정 요인\n5. 연습문제 3개' },
      ],
    },
    {
      title: '서비스경영',
      icon: '🤝',
      questions: [
        { id: 41, question: '서비스품질 5가지 차원(SERVQUAL)을 설명하시오.', answer: '유형성, 신뢰성, 응답성, 확신성, 공감성', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 서비스품질 5가지 차원(SERVQUAL)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SERVQUAL 모델 개요\n2. 5가지 차원별 상세 설명\n3. 유통업 서비스품질 측정 방법\n4. 서비스품질 개선 전략\n5. 연습문제 3개' },
        { id: 42, question: '고객만족(CS)과 고객충성도의 관계를 설명하시오.', answer: '만족→충성도→재구매→구전효과', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 고객만족(CS)과 고객충성도의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고객만족의 정의와 측정\n2. 고객충성도의 정의와 유형\n3. 만족-충성도 관계 모델\n4. 충성도 강화 전략\n5. 연습문제 3개' },
        { id: 43, question: '서비스 청사진(Service Blueprint)의 개념과 활용방법을 설명하시오.', answer: '서비스 프로세스의 시각적 매핑 도구', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 서비스 청사진의 개념과 활용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서비스 청사진의 정의\n2. 청사진의 구성 요소(가시선, 상호작용선 등)\n3. 청사진 작성 방법\n4. 유통업 서비스 청사진 사례\n5. 연습문제 3개' },
        { id: 44, question: '서비스 실패와 서비스 회복 전략을 설명하시오.', answer: '불만족 고객의 서비스 회복 역설', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 서비스 실패와 서비스 회복 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서비스 실패의 유형과 원인\n2. 서비스 회복의 정의\n3. 효과적인 서비스 회복 전략\n4. 서비스 회복 역설(Recovery Paradox)\n5. 연습문제 3개' },
        { id: 45, question: '고객경험관리(CXM)의 개념과 구현방법을 설명하시오.', answer: '전 접점에서 일관된 긍정적 경험 제공', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 고객경험관리(CXM)의 개념과 구현방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CXM의 정의와 CRM과의 차이\n2. 고객여정맵(Customer Journey Map)\n3. 터치포인트 관리 전략\n4. 유통업 CXM 구현 사례\n5. 연습문제 3개' },
        { id: 46, question: 'MOT(진실의 순간)와 고객접점관리를 설명하시오.', answer: '고객이 서비스와 접촉하는 결정적 순간', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: MOT(진실의 순간)와 고객접점관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MOT의 정의와 유래\n2. 유통업 주요 MOT 상황\n3. 접점직원 역량 강화 방안\n4. MOT 관리 성공 사례\n5. 연습문제 3개' },
        { id: 47, question: '미스터리 쇼핑(Mystery Shopping)의 목적과 운영방안을 설명하시오.', answer: '비밀고객을 통한 서비스품질 평가', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 미스터리 쇼핑의 목적과 운영방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미스터리 쇼핑의 정의와 목적\n2. 미스터리 쇼핑 운영 절차\n3. 평가 항목과 점검표 작성\n4. 결과 활용과 개선 방안\n5. 연습문제 3개' },
        { id: 48, question: '고객불만 처리 프로세스와 VOC(고객의 소리) 관리를 설명하시오.', answer: '불만접수-분석-처리-피드백-개선', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 고객불만 처리 프로세스와 VOC 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VOC의 정의와 수집 채널\n2. 고객불만 처리 프로세스\n3. VOC 분석 및 활용 방안\n4. 불만고객의 로열 고객화 전략\n5. 연습문제 3개' },
        { id: 49, question: 'CSR(기업의 사회적 책임)과 유통기업의 ESG 경영을 설명하시오.', answer: 'Environment, Social, Governance 경영', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: CSR과 유통기업의 ESG 경영을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CSR과 ESG의 정의와 차이\n2. ESG 경영의 3가지 영역\n3. 유통기업 ESG 사례(친환경 포장 등)\n4. ESG 평가와 투자 트렌드\n5. 연습문제 3개' },
        { id: 50, question: '유통윤리와 공정거래법의 주요 내용을 설명하시오.', answer: '불공정행위 금지, 대규모유통업법', prompt: '유통관리사 1급 유통경영 문제입니다.\n\n문제: 유통윤리와 공정거래법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유통윤리의 정의와 중요성\n2. 공정거래법의 주요 규정\n3. 대규모유통업법의 핵심 내용\n4. 유통기업 윤리경영 사례\n5. 연습문제 3개' },
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
            <span className="text-emerald-600 font-medium">유통경영</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-3xl">🏪</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">유통경영</h1>
              <p className="text-emerald-100">유통관리사 1급 · 제1과목</p>
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
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
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
