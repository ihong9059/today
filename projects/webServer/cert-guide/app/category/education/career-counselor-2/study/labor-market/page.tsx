'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState } from 'react';

export default function LaborMarketStudyPage() {
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: '노동시장의 구조와 특성',
      questions: [
        { id: 1, question: '노동시장의 정의와 기능을 설명하시오.', answer: '노동력의 수요와 공급이 이루어지는 시장, 자원배분 기능', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장의 정의와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노동시장의 정의\n2. 주요 기능\n3. 상품시장과의 차이\n4. 노동시장의 특성\n5. 연습문제 3개' },
        { id: 2, question: '노동시장의 특수성을 설명하시오.', answer: '노동력의 비저장성, 이질성, 불완전경쟁, 제도적 규제', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장의 특수성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노동력의 특성\n2. 시장 특수성\n3. 다른 시장과의 차이\n4. 정책적 시사점\n5. 연습문제 3개' },
        { id: 3, question: '내부노동시장과 외부노동시장을 비교하시오.', answer: '내부: 기업 내 승진, 배치 / 외부: 기업 간 이동', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 내부노동시장과 외부노동시장을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 내부노동시장의 특징\n2. 외부노동시장의 특징\n3. 장단점 비교\n4. 한국 노동시장 특성\n5. 연습문제 3개' },
        { id: 4, question: '1차 노동시장과 2차 노동시장을 설명하시오.', answer: '1차: 고임금, 안정 / 2차: 저임금, 불안정', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 1차 노동시장과 2차 노동시장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이중노동시장 이론\n2. 1차 시장 특징\n3. 2차 시장 특징\n4. 분절의 원인과 문제\n5. 연습문제 3개' },
        { id: 5, question: '노동시장 분절화의 원인과 결과를 설명하시오.', answer: '대기업-중소기업, 정규직-비정규직 격차', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장 분절화의 원인과 결과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분절화의 정의\n2. 발생 원인\n3. 부정적 결과\n4. 해소 방안\n5. 연습문제 3개' },
        { id: 6, question: '노동시장 유연성의 개념과 유형을 설명하시오.', answer: '수량적 유연성, 기능적 유연성, 임금 유연성', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장 유연성의 개념과 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유연성의 정의\n2. 유형별 특징\n3. 유연화의 배경\n4. 장단점\n5. 연습문제 3개' },
        { id: 7, question: '유연안정성(Flexicurity)의 개념을 설명하시오.', answer: '노동시장 유연성 + 고용안정성 + 사회보장의 조화', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 유연안정성의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유연안정성의 정의\n2. 덴마크 모델\n3. 핵심 요소\n4. 한국 적용 가능성\n5. 연습문제 3개' },
        { id: 8, question: '노동시장의 정보 비대칭성을 설명하시오.', answer: '구인자와 구직자 간 정보 불균형, 탐색비용 발생', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장의 정보 비대칭성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정보 비대칭의 정의\n2. 발생 원인\n3. 문제점\n4. 해결 방안\n5. 연습문제 3개' },
      ]
    },
    {
      title: '노동수요와 공급',
      questions: [
        { id: 9, question: '노동수요의 결정요인을 설명하시오.', answer: '제품 수요, 생산기술, 자본가격, 임금수준', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동수요의 결정요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노동수요의 파생수요 특성\n2. 결정요인\n3. 수요곡선의 이동\n4. 탄력성\n5. 연습문제 3개' },
        { id: 10, question: '노동수요의 탄력성에 영향을 미치는 요인을 설명하시오.', answer: '대체가능성, 제품수요 탄력성, 노동비용 비중, 공급탄력성', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동수요의 탄력성 영향요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탄력성의 정의\n2. 4가지 영향요인\n3. 마샬의 파생수요법칙\n4. 정책적 시사점\n5. 연습문제 3개' },
        { id: 11, question: '노동공급의 결정요인을 설명하시오.', answer: '임금, 비노동소득, 여가선호, 인구구조', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동공급의 결정요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인의 노동공급 결정\n2. 결정요인\n3. 공급곡선\n4. 탄력성\n5. 연습문제 3개' },
        { id: 12, question: '노동공급 곡선의 후방굴절 현상을 설명하시오.', answer: '임금 상승 시 소득효과가 대체효과를 초과하면 노동공급 감소', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동공급 곡선의 후방굴절 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소득효과와 대체효과\n2. 후방굴절의 원리\n3. 그래프 설명\n4. 현실 적용\n5. 연습문제 3개' },
        { id: 13, question: '인적자본이론(Human Capital Theory)을 설명하시오.', answer: '교육훈련 투자 → 생산성 향상 → 임금 상승', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 인적자본이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 핵심 내용\n2. 교육투자 결정\n3. 훈련의 유형\n4. 비판과 한계\n5. 연습문제 3개' },
        { id: 14, question: '일반훈련과 특수훈련을 비교하시오.', answer: '일반훈련: 이전 가능, 근로자 부담 / 특수훈련: 기업 특화, 공동 부담', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 일반훈련과 특수훈련을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 일반훈련의 특징\n2. 특수훈련의 특징\n3. 훈련비용 부담\n4. 정책적 시사점\n5. 연습문제 3개' },
        { id: 15, question: '신호이론(Signaling Theory)을 설명하시오.', answer: '교육은 생산성보다 능력을 신호로 전달하는 기능', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 신호이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 핵심 내용\n2. Spence의 모형\n3. 인적자본론과의 차이\n4. 정책적 시사점\n5. 연습문제 3개' },
        { id: 16, question: '선별이론(Screening Theory)을 설명하시오.', answer: '기업이 교육수준을 통해 노동자 능력을 선별', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 선별이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 핵심 내용\n2. 선별 과정\n3. 신호이론과의 관계\n4. 현실 적용\n5. 연습문제 3개' },
      ]
    },
    {
      title: '임금결정이론',
      questions: [
        { id: 17, question: '임금의 개념과 종류를 설명하시오.', answer: '명목임금, 실질임금, 통상임금, 평균임금', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 임금의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임금의 정의\n2. 임금의 종류\n3. 법적 임금 개념\n4. 임금 구성요소\n5. 연습문제 3개' },
        { id: 18, question: '한계생산력설에 의한 임금결정을 설명하시오.', answer: '노동의 한계생산가치 = 임금', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 한계생산력설에 의한 임금결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 기본 가정\n2. 임금 결정 원리\n3. 그래프 설명\n4. 비판과 한계\n5. 연습문제 3개' },
        { id: 19, question: '효율임금이론(Efficiency Wage Theory)을 설명하시오.', answer: '균형임금보다 높은 임금 지급 → 생산성 향상', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 효율임금이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 핵심 내용\n2. 효율임금의 효과\n3. 비자발적 실업 설명\n4. 현실 적용\n5. 연습문제 3개' },
        { id: 20, question: '보상적 임금격차(Compensating Wage Differentials)를 설명하시오.', answer: '직무의 비금전적 특성 차이에 따른 임금 차이', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 보상적 임금격차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개념 정의\n2. 발생 원인\n3. 예시\n4. 정책적 시사점\n5. 연습문제 3개' },
        { id: 21, question: '최저임금제도의 경제적 효과를 설명하시오.', answer: '소득 보장 vs 고용 감소 논쟁', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 최저임금제도의 경제적 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최저임금제의 목적\n2. 긍정적 효과\n3. 부정적 효과\n4. 한국 현황\n5. 연습문제 3개' },
        { id: 22, question: '임금격차의 발생원인을 설명하시오.', answer: '학력, 경력, 성별, 기업규모, 산업, 직종', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 임금격차의 발생원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 격차의 유형\n2. 인적 요인\n3. 구조적 요인\n4. 차별적 요인\n5. 연습문제 3개' },
        { id: 23, question: '남녀 임금격차의 원인과 해소방안을 설명하시오.', answer: '직종분리, 경력단절, 차별 / 동일가치노동 동일임금', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 남녀 임금격차의 원인과 해소방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 격차 현황\n2. 발생 원인\n3. 해소 정책\n4. 외국 사례\n5. 연습문제 3개' },
        { id: 24, question: '임금체계의 유형을 설명하시오.', answer: '연공급, 직무급, 직능급, 성과급', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 임금체계의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연공급의 특징\n2. 직무급의 특징\n3. 성과급의 특징\n4. 한국의 임금체계 변화\n5. 연습문제 3개' },
      ]
    },
    {
      title: '실업의 유형과 원인',
      questions: [
        { id: 25, question: '실업의 정의와 측정방법을 설명하시오.', answer: '일할 능력과 의사가 있으나 일자리가 없는 상태', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 실업의 정의와 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실업의 정의\n2. ILO 기준\n3. 실업률 산출\n4. 측정의 한계\n5. 연습문제 3개' },
        { id: 26, question: '마찰적 실업의 원인과 대책을 설명하시오.', answer: '정보 부족, 직장탐색 시간 / 고용정보 제공', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 마찰적 실업의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 마찰적 실업의 정의\n2. 발생 원인\n3. 특징\n4. 대책\n5. 연습문제 3개' },
        { id: 27, question: '구조적 실업의 원인과 대책을 설명하시오.', answer: '산업구조 변화, 기술변화 / 직업훈련, 이동지원', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 구조적 실업의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조적 실업의 정의\n2. 발생 원인\n3. 특징\n4. 대책\n5. 연습문제 3개' },
        { id: 28, question: '경기적 실업의 원인과 대책을 설명하시오.', answer: '총수요 부족 / 경기부양 정책, 고용유지지원', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 경기적 실업의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경기적 실업의 정의\n2. 발생 원인\n3. 특징\n4. 대책\n5. 연습문제 3개' },
        { id: 29, question: '계절적 실업의 원인과 대책을 설명하시오.', answer: '계절에 따른 노동수요 변동 / 공공근로, 계절산업 다각화', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 계절적 실업의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계절적 실업의 정의\n2. 해당 산업\n3. 특징\n4. 대책\n5. 연습문제 3개' },
        { id: 30, question: '자연실업률(NAIRU)의 개념을 설명하시오.', answer: '인플레이션을 유발하지 않는 실업률 수준', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 자연실업률의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자연실업률의 정의\n2. 결정 요인\n3. 필립스 곡선과의 관계\n4. 정책적 시사점\n5. 연습문제 3개' },
        { id: 31, question: '청년실업의 원인과 대책을 설명하시오.', answer: '노동시장 미스매치, 일자리 부족 / 청년고용정책', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 청년실업의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청년실업 현황\n2. 발생 원인\n3. 문제점\n4. 대책\n5. 연습문제 3개' },
        { id: 32, question: '장기실업의 원인과 대책을 설명하시오.', answer: '인적자본 감소, 취업의욕 저하 / 집중 취업지원', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 장기실업의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 장기실업의 정의\n2. 발생 원인\n3. 사회경제적 영향\n4. 대책\n5. 연습문제 3개' },
      ]
    },
    {
      title: '고용정책과 제도',
      questions: [
        { id: 33, question: '고용정책의 목표와 수단을 설명하시오.', answer: '완전고용, 고용안정, 인력개발 / 적극적·소극적 정책', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 고용정책의 목표와 수단을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고용정책의 목표\n2. 정책 수단\n3. 적극적 노동시장정책\n4. 소극적 노동시장정책\n5. 연습문제 3개' },
        { id: 34, question: '적극적 노동시장정책(ALMP)의 유형을 설명하시오.', answer: '직업훈련, 고용서비스, 고용보조금, 직접일자리 창출', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 적극적 노동시장정책의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ALMP의 정의\n2. 정책 유형\n3. 효과성\n4. 한국의 ALMP\n5. 연습문제 3개' },
        { id: 35, question: '고용보험제도의 구성을 설명하시오.', answer: '실업급여, 고용안정사업, 직업능력개발사업', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 고용보험제도의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고용보험의 목적\n2. 3대 사업\n3. 가입 대상\n4. 급여 내용\n5. 연습문제 3개' },
        { id: 36, question: '실업급여의 수급요건과 급여내용을 설명하시오.', answer: '피보험기간 180일 이상, 구직활동 / 구직급여, 취업촉진수당', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 실업급여의 수급요건과 급여내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수급 요건\n2. 급여 종류\n3. 급여 수준\n4. 수급 기간\n5. 연습문제 3개' },
        { id: 37, question: '고용안정사업의 종류를 설명하시오.', answer: '고용유지지원금, 고용촉진장려금, 건설근로자 지원', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 고용안정사업의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업의 목적\n2. 주요 지원 내용\n3. 지원 대상\n4. 신청 방법\n5. 연습문제 3개' },
        { id: 38, question: '직업능력개발사업의 종류를 설명하시오.', answer: '사업주훈련, 실업자훈련, 재직자훈련, 국가인적자원개발', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 직업능력개발사업의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사업의 목적\n2. 훈련 유형\n3. 지원 내용\n4. 내일배움카드제\n5. 연습문제 3개' },
        { id: 39, question: '공공고용서비스의 역할을 설명하시오.', answer: '직업상담, 취업알선, 직업훈련연계, 고용정보 제공', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 공공고용서비스의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공공고용서비스의 정의\n2. 주요 역할\n3. 고용센터 기능\n4. 발전 방향\n5. 연습문제 3개' },
        { id: 40, question: '민간고용서비스의 역할과 규제를 설명하시오.', answer: '직업소개, 헤드헌팅, 파견 / 직업안정법 규제', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 민간고용서비스의 역할과 규제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 민간고용서비스의 유형\n2. 역할\n3. 법적 규제\n4. 공공서비스와의 협력\n5. 연습문제 3개' },
      ]
    },
    {
      title: '인적자원개발과 노동시장 동향',
      questions: [
        { id: 41, question: '인적자원개발(HRD)의 개념과 영역을 설명하시오.', answer: '교육훈련, 경력개발, 조직개발', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 인적자원개발의 개념과 영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. HRD의 정의\n2. 주요 영역\n3. 개인-조직-국가 수준\n4. 발전 방향\n5. 연습문제 3개' },
        { id: 42, question: '평생학습의 개념과 중요성을 설명하시오.', answer: '전 생애에 걸친 학습, 급변하는 직업세계 대응', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 평생학습의 개념과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평생학습의 정의\n2. 필요성\n3. 지원 제도\n4. 진로상담에서의 활용\n5. 연습문제 3개' },
        { id: 43, question: '비정규직 고용의 현황과 문제점을 설명하시오.', answer: '임금격차, 사회보험 사각지대, 고용불안', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 비정규직 고용의 현황과 문제점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비정규직의 정의와 유형\n2. 현황\n3. 문제점\n4. 정책 대안\n5. 연습문제 3개' },
        { id: 44, question: '고령화와 노동시장 변화를 설명하시오.', answer: '노동력 감소, 고령자 고용 증가, 연금제도 압박', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 고령화와 노동시장 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고령화 현황\n2. 노동시장 영향\n3. 고령자 고용정책\n4. 대응 과제\n5. 연습문제 3개' },
        { id: 45, question: '여성 경제활동 참가의 특성을 설명하시오.', answer: 'M자형 곡선, 경력단절, 유리천장', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 여성 경제활동 참가의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 참가율 현황\n2. M자형 곡선\n3. 경력단절 원인\n4. 정책 대안\n5. 연습문제 3개' },
        { id: 46, question: '외국인력 정책의 현황을 설명하시오.', answer: '고용허가제, 방문취업제, 전문인력 유치', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 외국인력 정책의 현황을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정책 도입 배경\n2. 주요 제도\n3. 현황과 문제점\n4. 발전 방향\n5. 연습문제 3개' },
        { id: 47, question: '플랫폼 노동의 특성과 쟁점을 설명하시오.', answer: '디지털 플랫폼 매개 노동, 근로자성 논쟁', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 플랫폼 노동의 특성과 쟁점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 플랫폼 노동의 정의\n2. 유형\n3. 쟁점\n4. 정책 대응\n5. 연습문제 3개' },
        { id: 48, question: '노동시장 양극화의 원인과 대책을 설명하시오.', answer: '대기업-중소기업, 정규직-비정규직 격차', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장 양극화의 원인과 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양극화 현상\n2. 원인 분석\n3. 사회경제적 영향\n4. 대책\n5. 연습문제 3개' },
        { id: 49, question: '일자리 창출 정책의 유형을 설명하시오.', answer: '직접일자리, 창업지원, 사회적경제, 신산업 육성', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 일자리 창출 정책의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정책 유형\n2. 각 정책의 특징\n3. 효과성 평가\n4. 발전 방향\n5. 연습문제 3개' },
        { id: 50, question: '노동시장 전망과 직업상담의 역할을 설명하시오.', answer: '미래 변화 대응, 평생경력개발 지원', prompt: '직업상담사 2급 노동시장론 문제입니다.\n\n문제: 노동시장 전망과 직업상담의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노동시장 변화 전망\n2. 직업상담의 중요성\n3. 상담사의 역할 변화\n4. 발전 과제\n5. 연습문제 3개' },
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, topic) => sum + topic.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education" className="text-gray-600 hover:text-teal-600">교육</a>
            <span className="text-gray-300">›</span>
            <a href="/category/education/career-counselor-2" className="text-gray-600 hover:text-teal-600">직업상담사 2급</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">노동시장론</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">📈</span>
            <div>
              <h1 className="text-2xl font-bold">노동시장론</h1>
              <p className="text-teal-100">총 {totalQuestions}문항 | 노동경제학과 고용정책</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => toggleTopic(topicIdx)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">{topicIdx + 1}</div>
                  <span className="font-medium text-gray-800">{topic.title}</span>
                  <span className="text-sm text-gray-400">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(topicIdx) && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-teal-600">A. {q.answer}</p>
                        </div>
                        <button onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition flex-shrink-0">🤖 AI</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

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
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2026 자격시험 가이드. 시험 정보는 Q-Net 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
