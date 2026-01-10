'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BusinessAdminStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['strategy']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cpa-business-admin-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('cpa-business-admin-completed', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 경영전략 (1-12)
    { id: 1, topic: 'strategy', question: 'SWOT 분석의 4가지 요소와 전략 수립 방법을 설명하시오.', answer: 'S(강점), W(약점), O(기회), T(위협)을 분석하여 SO, ST, WO, WT 전략 도출', prompt: '공인회계사 경영학 문제입니다.\n\n문제: SWOT 분석의 4가지 요소와 전략 수립 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SWOT 각 요소의 정의\n2. 내부환경과 외부환경 분석\n3. SWOT 매트릭스 전략 도출\n4. 실제 기업 적용 사례\n5. 연습문제 3개' },
    { id: 2, topic: 'strategy', question: '포터(Porter)의 5 Forces 모형을 설명하시오.', answer: '산업의 경쟁강도를 결정하는 5가지 요인: 기존경쟁, 신규진입, 대체재, 공급자교섭력, 구매자교섭력', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 포터(Porter)의 5 Forces 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5 Forces 모형의 개념\n2. 각 요인별 상세 설명\n3. 산업매력도 평가 방법\n4. 전략적 시사점\n5. 연습문제 3개' },
    { id: 3, topic: 'strategy', question: '본원적 경쟁전략(Generic Strategy) 3가지를 설명하시오.', answer: '원가우위전략, 차별화전략, 집중화전략', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 본원적 경쟁전략(Generic Strategy) 3가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 전략의 정의와 특징\n2. 전략별 성공 조건\n3. Stuck in the Middle 문제\n4. 기업 사례\n5. 연습문제 3개' },
    { id: 4, topic: 'strategy', question: 'BCG 매트릭스의 4가지 유형과 전략적 의미를 설명하시오.', answer: 'Star(높은성장-높은점유), Cash Cow, Question Mark, Dog', prompt: '공인회계사 경영학 문제입니다.\n\n문제: BCG 매트릭스의 4가지 유형과 전략적 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BCG 매트릭스의 구조\n2. 각 유형별 특징\n3. 자원배분 전략\n4. 한계점\n5. 연습문제 3개' },
    { id: 5, topic: 'strategy', question: '핵심역량(Core Competence)의 개념과 특성을 설명하시오.', answer: '고객가치 제공, 경쟁자 모방 어려움, 다양한 시장 적용 가능', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 핵심역량(Core Competence)의 개념과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Prahalad & Hamel의 정의\n2. 핵심역량의 3가지 조건\n3. 역량 기반 경쟁전략\n4. 기업 사례\n5. 연습문제 3개' },
    { id: 6, topic: 'strategy', question: '다각화 전략의 유형과 각각의 특징을 설명하시오.', answer: '관련다각화(시너지 추구), 비관련다각화(위험분산)', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 다각화 전략의 유형과 각각의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련다각화 vs 비관련다각화\n2. 수직적 vs 수평적 다각화\n3. 시너지 효과 분석\n4. 성공 조건\n5. 연습문제 3개' },
    { id: 7, topic: 'strategy', question: 'M&A의 유형과 시너지 효과를 설명하시오.', answer: '수평적, 수직적, 혼합 M&A / 영업시너지, 재무시너지, 경영시너지', prompt: '공인회계사 경영학 문제입니다.\n\n문제: M&A의 유형과 시너지 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. M&A 유형 분류\n2. 시너지 효과 종류\n3. M&A 가치평가 방법\n4. 실패 원인 분석\n5. 연습문제 3개' },
    { id: 8, topic: 'strategy', question: '가치사슬(Value Chain) 분석을 설명하시오.', answer: '본원적 활동(물류, 생산, 마케팅, 서비스)과 지원활동(인프라, 인사, 기술개발, 조달)', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 가치사슬(Value Chain) 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가치사슬의 구조\n2. 본원적 활동 5가지\n3. 지원활동 4가지\n4. 경쟁우위 도출 방법\n5. 연습문제 3개' },
    { id: 9, topic: 'strategy', question: '블루오션 전략과 가치혁신을 설명하시오.', answer: '경쟁 없는 새로운 시장 창출, 차별화와 저원가 동시 추구', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 블루오션 전략과 가치혁신을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 레드오션 vs 블루오션\n2. 가치혁신의 개념\n3. ERRC 프레임워크\n4. 전략캔버스 활용\n5. 연습문제 3개' },
    { id: 10, topic: 'strategy', question: '글로벌 전략의 4가지 유형을 설명하시오.', answer: '국제전략, 다국적전략, 글로벌전략, 초국적전략', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 글로벌 전략의 4가지 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IR 프레임워크 (통합-현지적응)\n2. 각 전략 유형의 특징\n3. 진입방식 선택\n4. 사례 분석\n5. 연습문제 3개' },
    { id: 11, topic: 'strategy', question: '전략적 제휴(Strategic Alliance)의 유형과 동기를 설명하시오.', answer: '합작투자, 라이선싱, 공동개발 등 / 위험분산, 자원보완, 시장접근', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 전략적 제휴의 유형과 동기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전략적 제휴의 정의\n2. 제휴 유형 분류\n3. 제휴 동기와 목적\n4. 성공요인과 위험\n5. 연습문제 3개' },
    { id: 12, topic: 'strategy', question: '산업생명주기와 각 단계별 전략을 설명하시오.', answer: '도입기, 성장기, 성숙기, 쇠퇴기별 차별화된 전략 필요', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 산업생명주기와 각 단계별 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 생명주기 4단계\n2. 각 단계별 특성\n3. 단계별 적합 전략\n4. 주의사항\n5. 연습문제 3개' },

    // 조직행동론 (13-25)
    { id: 13, topic: 'organization', question: '매슬로우(Maslow)의 욕구단계설을 설명하시오.', answer: '생리적→안전→사회적→존경→자아실현 욕구의 5단계', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 매슬로우의 욕구단계설을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5단계 욕구의 내용\n2. 욕구계층의 원리\n3. 경영관리에의 적용\n4. 이론의 한계\n5. 연습문제 3개' },
    { id: 14, topic: 'organization', question: '허즈버그(Herzberg)의 2요인 이론을 설명하시오.', answer: '위생요인(불만족 해소)과 동기요인(만족 유발)의 구분', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 허즈버그의 2요인 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위생요인의 종류와 특성\n2. 동기요인의 종류와 특성\n3. 직무충실화 이론\n4. 매슬로우 이론과의 비교\n5. 연습문제 3개' },
    { id: 15, topic: 'organization', question: '기대이론(Expectancy Theory)을 설명하시오.', answer: '동기 = 기대 × 수단성 × 유의성', prompt: '공인회계사 경영학 문제입니다.\n\n문제: Vroom의 기대이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기대이론의 3가지 요소\n2. 동기부여 공식\n3. 경영관리에의 시사점\n4. 다른 동기이론과의 비교\n5. 연습문제 3개' },
    { id: 16, topic: 'organization', question: '공정성이론(Equity Theory)을 설명하시오.', answer: '투입 대비 산출의 비율을 타인과 비교하여 공정성 인식', prompt: '공인회계사 경영학 문제입니다.\n\n문제: Adams의 공정성이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공정성 인식 과정\n2. 불공정 해소 방법\n3. 분배적/절차적 공정성\n4. 조직 적용 방안\n5. 연습문제 3개' },
    { id: 17, topic: 'organization', question: '리더십의 특성이론, 행동이론, 상황이론을 비교 설명하시오.', answer: '리더 자질 → 리더 행동 → 상황적합성으로 발전', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 리더십 이론의 발전과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특성이론의 내용과 한계\n2. 행동이론(Ohio, Michigan)\n3. 상황이론(Fiedler, 경로-목표)\n4. 현대 리더십이론\n5. 연습문제 3개' },
    { id: 18, topic: 'organization', question: '변혁적 리더십과 거래적 리더십을 비교 설명하시오.', answer: '변혁적: 비전제시, 영감부여 / 거래적: 보상교환', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 변혁적 리더십과 거래적 리더십을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 거래적 리더십의 특징\n2. 변혁적 리더십의 4가지 요소\n3. 각 리더십의 적합 상황\n4. Bass의 통합모형\n5. 연습문제 3개' },
    { id: 19, topic: 'organization', question: '조직문화의 유형과 기능을 설명하시오.', answer: '혁신문화, 관계문화, 위계문화, 시장문화 / 통합, 조정, 정체성 부여', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 조직문화의 유형과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조직문화의 정의와 구성요소\n2. Quinn의 경쟁가치모형\n3. 조직문화의 기능\n4. 문화 변화 관리\n5. 연습문제 3개' },
    { id: 20, topic: 'organization', question: '조직구조의 유형(기능별, 사업부제 등)을 비교 설명하시오.', answer: '기능별(전문성), 사업부제(자율성), 매트릭스(유연성)', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 조직구조 유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 기능별 조직의 장단점\n2. 사업부제 조직의 장단점\n3. 매트릭스 조직\n4. 네트워크 조직\n5. 연습문제 3개' },
    { id: 21, topic: 'organization', question: '조직변화의 저항 원인과 극복 방안을 설명하시오.', answer: '불확실성, 기득권 상실 우려 / 참여, 교육, 지원, 협상', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 조직변화 저항 극복 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변화 저항의 원인\n2. Lewin의 3단계 모형\n3. Kotter의 8단계\n4. 저항 극복 전략\n5. 연습문제 3개' },
    { id: 22, topic: 'organization', question: '갈등관리의 유형과 기법을 설명하시오.', answer: '회피, 수용, 경쟁, 타협, 협력 스타일', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 갈등관리 스타일을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 갈등의 원인과 유형\n2. Thomas-Kilmann 모형\n3. 각 스타일의 적합 상황\n4. 갈등의 순기능\n5. 연습문제 3개' },
    { id: 23, topic: 'organization', question: '집단의사결정의 장단점과 기법을 설명하시오.', answer: '다양한 정보, 수용성 / 시간, 동조압력 / 브레인스토밍, 델파이', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 집단의사결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 집단의사결정의 장점\n2. 집단의사결정의 단점\n3. 집단사고(Groupthink)\n4. 의사결정 개선 기법\n5. 연습문제 3개' },
    { id: 24, topic: 'organization', question: '팀의 유형과 효과적인 팀 구축 방법을 설명하시오.', answer: '기능팀, 다기능팀, 자율관리팀, 가상팀', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 팀 유형과 팀 구축을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 팀의 유형 분류\n2. 고성과 팀의 특성\n3. 팀 발달 단계\n4. 팀 성과 관리\n5. 연습문제 3개' },
    { id: 25, topic: 'organization', question: '조직시민행동(OCB)의 개념과 유형을 설명하시오.', answer: '공식 역할 외 자발적 행동 / 이타주의, 시민정신, 스포츠맨십 등', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 조직시민행동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. OCB의 정의와 특성\n2. Organ의 5가지 유형\n3. OCB의 선행요인\n4. 조직성과에의 영향\n5. 연습문제 3개' },

    // 마케팅 (26-37)
    { id: 26, topic: 'marketing', question: 'STP 전략을 설명하시오.', answer: '시장세분화→표적시장선정→포지셔닝', prompt: '공인회계사 경영학 문제입니다.\n\n문제: STP 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시장세분화 기준\n2. 표적시장 선정 전략\n3. 포지셔닝 방법\n4. 포지셔닝 맵 활용\n5. 연습문제 3개' },
    { id: 27, topic: 'marketing', question: '마케팅믹스 4P를 설명하시오.', answer: 'Product(제품), Price(가격), Place(유통), Promotion(촉진)', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 마케팅믹스 4P를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 P의 구성요소\n2. 4P 간 통합과 조정\n3. 서비스 마케팅 7P\n4. 4C 개념과의 비교\n5. 연습문제 3개' },
    { id: 28, topic: 'marketing', question: '제품수명주기(PLC)와 각 단계별 마케팅 전략을 설명하시오.', answer: '도입기(인지도), 성장기(점유율), 성숙기(이익), 쇠퇴기(정리)', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 제품수명주기 마케팅 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PLC 4단계 특성\n2. 각 단계별 마케팅 목표\n3. 4P 전략 차별화\n4. PLC의 한계\n5. 연습문제 3개' },
    { id: 29, topic: 'marketing', question: '가격결정 방법을 설명하시오.', answer: '원가가산, 목표수익률, 경쟁기준, 가치기준 가격결정', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 가격결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원가기준 가격결정\n2. 수요기준 가격결정\n3. 경쟁기준 가격결정\n4. 가격전략(스키밍, 침투)\n5. 연습문제 3개' },
    { id: 30, topic: 'marketing', question: '소비자 구매의사결정 과정을 설명하시오.', answer: '문제인식→정보탐색→대안평가→구매결정→구매후행동', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 소비자 구매의사결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5단계 과정\n2. 각 단계별 마케팅 시사점\n3. 관여도와 구매유형\n4. 구매후 부조화 관리\n5. 연습문제 3개' },
    { id: 31, topic: 'marketing', question: '브랜드 자산(Brand Equity)의 개념과 구성요소를 설명하시오.', answer: '브랜드 인지도, 지각된 품질, 브랜드 연상, 브랜드 충성도', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 브랜드 자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 브랜드 자산의 정의\n2. Aaker의 4가지 구성요소\n3. 브랜드 자산 측정\n4. 브랜드 확장 전략\n5. 연습문제 3개' },
    { id: 32, topic: 'marketing', question: '촉진믹스의 구성요소를 설명하시오.', answer: '광고, 판매촉진, PR, 인적판매, 직접마케팅', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 촉진믹스를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5가지 촉진수단\n2. 각 수단의 장단점\n3. 푸시 vs 풀 전략\n4. 통합마케팅커뮤니케이션\n5. 연습문제 3개' },
    { id: 33, topic: 'marketing', question: '유통경로의 유형과 관리를 설명하시오.', answer: '직접유통, 간접유통 / 집중적, 선택적, 전속적 유통', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 유통경로를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유통경로의 기능\n2. 유통경로 유형\n3. 유통커버리지 전략\n4. 유통갈등 관리\n5. 연습문제 3개' },
    { id: 34, topic: 'marketing', question: 'CRM(고객관계관리)의 개념과 전략을 설명하시오.', answer: '고객 데이터 기반 맞춤 마케팅으로 고객생애가치 극대화', prompt: '공인회계사 경영학 문제입니다.\n\n문제: CRM을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CRM의 정의와 목적\n2. 고객생애가치(CLV)\n3. RFM 분석\n4. CRM 시스템 구성\n5. 연습문제 3개' },
    { id: 35, topic: 'marketing', question: '디지털 마케팅의 유형과 특징을 설명하시오.', answer: '검색광고, 소셜미디어, 콘텐츠마케팅, 이메일마케팅', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 디지털 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 디지털 마케팅 유형\n2. 온라인 광고 형태\n3. 소셜미디어 마케팅\n4. 성과 측정 지표\n5. 연습문제 3개' },
    { id: 36, topic: 'marketing', question: '서비스 마케팅의 특성과 7P를 설명하시오.', answer: '무형성, 비분리성, 이질성, 소멸성 / +People, Process, Physical Evidence', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 서비스 마케팅을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서비스의 4가지 특성\n2. 확장된 7P\n3. 서비스 품질 관리\n4. 서비스 회복 전략\n5. 연습문제 3개' },
    { id: 37, topic: 'marketing', question: '마케팅 조사 과정을 설명하시오.', answer: '문제정의→조사설계→자료수집→분석→보고', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 마케팅 조사 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조사 과정 5단계\n2. 1차 자료 vs 2차 자료\n3. 조사 방법 유형\n4. 표본설계\n5. 연습문제 3개' },

    // 재무관리 (38-50)
    { id: 38, topic: 'finance', question: '자본예산의 평가기법(NPV, IRR, PI, PP)을 비교 설명하시오.', answer: 'NPV(순현가), IRR(내부수익률), PI(수익성지수), PP(회수기간)', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 자본예산 평가기법을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 각 기법의 계산 방법\n2. 의사결정 기준\n3. 장단점 비교\n4. 상충 시 우선순위\n5. 연습문제 3개' },
    { id: 39, topic: 'finance', question: 'WACC(가중평균자본비용)의 개념과 계산을 설명하시오.', answer: 'WACC = (E/V)×Re + (D/V)×Rd×(1-T)', prompt: '공인회계사 경영학 문제입니다.\n\n문제: WACC를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. WACC의 정의\n2. 계산 공식과 요소\n3. 자기자본비용 추정(CAPM)\n4. 타인자본비용\n5. 연습문제 3개' },
    { id: 40, topic: 'finance', question: 'CAPM(자본자산가격결정모형)을 설명하시오.', answer: 'E(Ri) = Rf + βi[E(Rm) - Rf]', prompt: '공인회계사 경영학 문제입니다.\n\n문제: CAPM을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CAPM 공식\n2. 베타(β)의 의미\n3. 증권시장선(SML)\n4. CAPM의 한계\n5. 연습문제 3개' },
    { id: 41, topic: 'finance', question: '자본구조이론(MM, 절충이론)을 설명하시오.', answer: 'MM: 자본구조 무관련 / 절충이론: 세금절감과 파산비용 균형', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 자본구조이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MM 제1명제, 제2명제\n2. 법인세 효과\n3. 파산비용\n4. 절충이론과 최적자본구조\n5. 연습문제 3개' },
    { id: 42, topic: 'finance', question: '배당정책 이론을 설명하시오.', answer: '배당무관련이론, 배당선호이론, 잔여배당이론', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 배당정책 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MM의 배당무관련이론\n2. 배당선호이론(새 손 이론)\n3. 잔여배당정책\n4. 배당의 신호효과\n5. 연습문제 3개' },
    { id: 43, topic: 'finance', question: '포트폴리오 이론을 설명하시오.', answer: '분산투자를 통한 위험감소, 효율적 포트폴리오', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 포트폴리오 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분산투자 효과\n2. 상관계수와 위험\n3. 효율적 프론티어\n4. 최적 포트폴리오\n5. 연습문제 3개' },
    { id: 44, topic: 'finance', question: '옵션의 유형과 가치평가를 설명하시오.', answer: 'Call(매수권), Put(매도권) / 내재가치, 시간가치', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 옵션을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 콜옵션, 풋옵션\n2. 옵션가치 결정요인\n3. Put-Call Parity\n4. 실물옵션\n5. 연습문제 3개' },
    { id: 45, topic: 'finance', question: '레버리지 분석(DOL, DFL, DCL)을 설명하시오.', answer: '영업레버리지, 재무레버리지, 결합레버리지', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 레버리지 분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DOL의 정의와 계산\n2. DFL의 정의와 계산\n3. DCL = DOL × DFL\n4. 레버리지와 위험\n5. 연습문제 3개' },
    { id: 46, topic: 'finance', question: '기업가치평가 방법을 설명하시오.', answer: 'DCF, 상대가치평가(PER, PBR, EV/EBITDA)', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 기업가치평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DCF 모형\n2. 배당할인모형\n3. 상대가치평가\n4. M&A 가치평가\n5. 연습문제 3개' },
    { id: 47, topic: 'finance', question: '운전자본관리를 설명하시오.', answer: '현금, 매출채권, 재고자산, 매입채무 관리', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 운전자본관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 현금전환주기\n2. 매출채권관리\n3. 재고자산관리\n4. 단기자금조달\n5. 연습문제 3개' },
    { id: 48, topic: 'finance', question: '파생상품(선물, 옵션, 스왑)을 설명하시오.', answer: '기초자산 가격에서 가치가 파생되는 금융상품', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 파생상품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선물과 선도\n2. 옵션 유형\n3. 스왑 구조\n4. 헤지 전략\n5. 연습문제 3개' },
    { id: 49, topic: 'finance', question: '자본조달 방법과 특징을 설명하시오.', answer: '주식발행, 회사채, 은행차입, 자산유동화', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 자본조달 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주식발행(IPO, 유상증자)\n2. 회사채 발행\n3. 간접금융(차입)\n4. 자본조달순서이론\n5. 연습문제 3개' },
    { id: 50, topic: 'finance', question: '위험관리(Risk Management)를 설명하시오.', answer: '환위험, 금리위험, 신용위험의 인식, 측정, 관리', prompt: '공인회계사 경영학 문제입니다.\n\n문제: 기업의 위험관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위험의 종류\n2. 위험 측정(VaR)\n3. 헤지 전략\n4. 리스크관리 체계\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'strategy', name: '경영전략', icon: '🎯', count: 12 },
    { id: 'organization', name: '조직행동론', icon: '👥', count: 13 },
    { id: 'marketing', name: '마케팅', icon: '📢', count: 12 },
    { id: 'finance', name: '재무관리', icon: '💰', count: 13 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/accounting/cpa" className="text-gray-500 hover:text-gray-700">공인회계사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-blue-600 font-medium">경영학</span>
          </nav>
        </div>
      </div>

      {/* Title Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">💼</div>
            <div>
              <h1 className="text-2xl font-bold">경영학</h1>
              <p className="text-blue-100">1차 시험 40문항 | 경영전략, 조직행동, 마케팅, 재무관리</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>학습 진행률</span>
              <span>{completedQuestions.length} / {questions.length} ({progress}%)</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Topic Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-blue-100 border-2 border-blue-300'
                    : 'bg-white border border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{topic.icon}</span>
                  <span className="font-medium text-sm">{topic.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{completed}/{topic.count} 완료</div>
              </button>
            );
          })}
        </div>

        {/* Questions by Topic */}
        <div className="space-y-4">
          {topics.map(topic => (
            expandedTopics.includes(topic.id) && (
              <div key={topic.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                  <h2 className="font-bold flex items-center gap-2">
                    <span>{topic.icon}</span> {topic.name}
                  </h2>
                  <span className="text-sm text-gray-500">{topic.count}문항</span>
                </div>
                <div className="divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-blue-500 border-blue-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : ''}`}>
                              {q.id}. {q.question}
                            </p>
                            <button
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm hover:bg-blue-200 transition flex-shrink-0"
                            >
                              🤖 AI
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link href="/category/accounting/cpa" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 메인으로
          </Link>
          <Link href="/category/accounting/cpa/study/economics" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            경제원론 →
          </Link>
        </div>
      </div>

      {/* AI Modal */}
      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 경영학 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
