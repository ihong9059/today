'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState } from 'react';

export default function PsychologyStudyPage() {
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
      title: '직업심리학의 기초',
      questions: [
        { id: 1, question: '직업심리학의 정의와 연구영역을 설명하시오.', answer: '직업과 관련된 인간의 심리적 특성을 연구하는 학문', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업심리학의 정의와 연구영역을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업심리학의 정의\n2. 주요 연구영역\n3. 관련 학문과의 관계\n4. 직업상담에서의 활용\n5. 연습문제 3개' },
        { id: 2, question: '개인차(Individual Differences)의 개념과 측정을 설명하시오.', answer: '능력, 성격, 흥미, 가치관 등에서 나타나는 개인 간 차이', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 개인차의 개념과 측정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개인차의 정의\n2. 개인차의 유형\n3. 측정 방법\n4. 직업선택에서의 의미\n5. 연습문제 3개' },
        { id: 3, question: '직업심리검사의 유형과 특징을 설명하시오.', answer: '적성검사, 흥미검사, 성격검사, 가치관검사', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업심리검사의 유형과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 유형별 특징\n2. 각 검사의 목적\n3. 검사 선택 기준\n4. 결과 해석 방법\n5. 연습문제 3개' },
        { id: 4, question: '심리검사의 신뢰도와 타당도를 설명하시오.', answer: '신뢰도: 일관성 / 타당도: 측정 목적 부합성', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 심리검사의 신뢰도와 타당도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신뢰도의 정의와 유형\n2. 타당도의 정의와 유형\n3. 신뢰도와 타당도의 관계\n4. 검사 평가 기준\n5. 연습문제 3개' },
        { id: 5, question: '규준(Norm)의 개념과 종류를 설명하시오.', answer: '검사 점수 해석 기준, 백분위, T점수, 스테나인', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 규준의 개념과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 규준의 정의\n2. 규준의 종류\n3. 점수 변환 방법\n4. 규준 해석 시 주의점\n5. 연습문제 3개' },
        { id: 6, question: '표준화 검사의 조건을 설명하시오.', answer: '표준화된 실시절차, 채점방법, 해석기준', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 표준화 검사의 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준화의 정의\n2. 표준화 조건\n3. 표준화 과정\n4. 비표준화 검사와의 차이\n5. 연습문제 3개' },
        { id: 7, question: '심리검사 실시 시 윤리적 고려사항을 설명하시오.', answer: '사전동의, 비밀보장, 적절한 자격, 결과 피드백', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 심리검사 실시 시 윤리적 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 윤리의 중요성\n2. 주요 윤리 원칙\n3. 검사자의 자격 요건\n4. 결과 활용 시 주의점\n5. 연습문제 3개' },
        { id: 8, question: '컴퓨터 기반 심리검사(CAT)의 특징을 설명하시오.', answer: '적응형 검사, 즉시 채점, 표준화된 실시', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 컴퓨터 기반 심리검사(CAT)의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CAT의 정의\n2. 장단점\n3. 전통 검사와의 비교\n4. 활용 사례\n5. 연습문제 3개' },
      ]
    },
    {
      title: '직업발달이론',
      questions: [
        { id: 9, question: 'Super의 진로발달이론의 5단계를 설명하시오.', answer: '성장기 → 탐색기 → 확립기 → 유지기 → 쇠퇴기', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Super의 진로발달이론의 5단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 단계의 연령대\n2. 단계별 발달과업\n3. 자아개념의 역할\n4. 상담에서의 적용\n5. 연습문제 3개' },
        { id: 10, question: 'Super의 진로성숙도(Career Maturity) 개념을 설명하시오.', answer: '연령에 적합한 진로발달 과업 수행 정도', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Super의 진로성숙도 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진로성숙도의 정의\n2. 구성요소\n3. 측정 방법\n4. 진로상담에서의 활용\n5. 연습문제 3개' },
        { id: 11, question: 'Ginzberg의 진로발달이론의 3단계를 설명하시오.', answer: '환상기(~11세) → 잠정기(11~17세) → 현실기(17세~)', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Ginzberg의 진로발달이론의 3단계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 단계의 특징\n2. 발달 과업\n3. Super 이론과의 비교\n4. 이론의 한계점\n5. 연습문제 3개' },
        { id: 12, question: 'Gottfredson의 제한-타협 이론을 설명하시오.', answer: '성유형화, 사회적 가치, 흥미 순으로 제한, 역순으로 타협', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Gottfredson의 제한-타협 이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 핵심 개념\n2. 제한의 단계\n3. 타협의 원리\n4. 상담에서의 적용\n5. 연습문제 3개' },
        { id: 13, question: 'Savickas의 진로구성이론(Career Construction Theory)을 설명하시오.', answer: '직업적 성격, 진로적응성, 생애주제', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Savickas의 진로구성이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 기본 가정\n2. 3가지 핵심 요소\n3. 진로적응성의 4C\n4. 진로상담에서의 활용\n5. 연습문제 3개' },
        { id: 14, question: 'Krumboltz의 사회학습이론을 설명하시오.', answer: '유전적 요인, 환경, 학습경험, 과제접근기술', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Krumboltz의 사회학습이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진로선택 영향 요인\n2. 학습경험의 유형\n3. 계획된 우연이론\n4. 상담에서의 적용\n5. 연습문제 3개' },
        { id: 15, question: 'Lent의 사회인지진로이론(SCCT)을 설명하시오.', answer: '자기효능감, 결과기대, 목표가 진로선택에 영향', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Lent의 사회인지진로이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 기본 개념\n2. 핵심 변인\n3. 흥미발달 모형\n4. 진로상담에서의 적용\n5. 연습문제 3개' },
        { id: 16, question: '진로발달이론들의 공통점과 차이점을 비교하시오.', answer: '발달적 관점 vs 학습적 관점 vs 사회인지적 관점', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 진로발달이론들의 공통점과 차이점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 이론 비교\n2. 공통점\n3. 차이점\n4. 통합적 접근\n5. 연습문제 3개' },
      ]
    },
    {
      title: 'Holland 직업흥미이론',
      questions: [
        { id: 17, question: 'Holland의 6가지 직업흥미유형(RIASEC)을 설명하시오.', answer: '현실형(R), 탐구형(I), 예술형(A), 사회형(S), 진취형(E), 관습형(C)', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Holland의 6가지 직업흥미유형(RIASEC)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 유형의 특성\n2. 유형별 선호 활동\n3. 유형별 적합 직업\n4. 검사 도구\n5. 연습문제 3개' },
        { id: 18, question: 'Holland 이론의 6각형 모형과 일관성을 설명하시오.', answer: '인접 유형 간 일관성 높음, 대각선 유형은 상반', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Holland 이론의 6각형 모형과 일관성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 6각형 모형의 구조\n2. 일관성의 개념\n3. 일관성 수준 평가\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 19, question: 'Holland 이론의 분화도와 정체성을 설명하시오.', answer: '분화도: 유형 간 점수 차이 / 정체성: 자기이해 명확성', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Holland 이론의 분화도와 정체성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분화도의 정의와 해석\n2. 정체성의 정의와 해석\n3. 두 개념의 관계\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 20, question: 'Holland 이론의 적합성(Congruence)을 설명하시오.', answer: '개인 흥미유형과 직업환경 유형의 일치 정도', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Holland 이론의 적합성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적합성의 정의\n2. 적합성 평가 방법\n3. 적합성과 직업만족의 관계\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 21, question: 'Holland 유형별 3글자 코드 해석법을 설명하시오.', answer: 'SIA: 사회형+탐구형+예술형, 우선순위 반영', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Holland 유형별 3글자 코드 해석법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 3글자 코드의 의미\n2. 코드 해석 방법\n3. 직업 매칭 방법\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 22, question: 'Holland 검사(흥미검사)의 활용법을 설명하시오.', answer: '흥미유형 파악 → 직업탐색 → 진로결정 지원', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Holland 검사의 활용법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사 실시 방법\n2. 결과 해석 절차\n3. 직업정보와의 연계\n4. 상담에서의 활용 예시\n5. 연습문제 3개' },
        { id: 23, question: 'Strong 직업흥미검사의 특징을 설명하시오.', answer: '일반직업주제, 기본흥미척도, 개인스타일척도', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Strong 직업흥미검사의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사의 구성\n2. 각 척도의 의미\n3. 해석 방법\n4. Holland 검사와의 비교\n5. 연습문제 3개' },
        { id: 24, question: 'Holland 이론의 장단점과 한계를 설명하시오.', answer: '장점: 명확한 유형화 / 단점: 문화적 한계, 변화 반영 어려움', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Holland 이론의 장단점과 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 장점\n2. 이론의 단점\n3. 문화적 한계\n4. 보완 방법\n5. 연습문제 3개' },
      ]
    },
    {
      title: '성격검사와 적성검사',
      questions: [
        { id: 25, question: 'MBTI 성격유형검사의 4가지 선호지표를 설명하시오.', answer: 'E-I(외향-내향), S-N(감각-직관), T-F(사고-감정), J-P(판단-인식)', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: MBTI 성격유형검사의 4가지 선호지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 선호지표의 의미\n2. 선호지표별 특성\n3. 16가지 성격유형\n4. 직업상담에서의 활용\n5. 연습문제 3개' },
        { id: 26, question: 'MBTI 16가지 유형과 직업 적합성을 설명하시오.', answer: 'ISTJ: 관리직, ENFP: 창의적 직종 등', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: MBTI 16가지 유형과 직업 적합성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 유형별 특성\n2. 유형별 적합 직업\n3. 직업환경 선호도\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 27, question: 'Big Five(5요인) 성격이론을 설명하시오.', answer: '개방성, 성실성, 외향성, 친화성, 신경증(OCEAN)', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Big Five 성격이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5가지 성격요인\n2. 각 요인의 특성\n3. 직무수행과의 관계\n4. MBTI와의 비교\n5. 연습문제 3개' },
        { id: 28, question: '직업적성검사(GATB)의 구성과 활용을 설명하시오.', answer: '9가지 적성요인: 일반학습능력, 언어, 수리 등', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업적성검사(GATB)의 구성과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. GATB의 9가지 적성요인\n2. 각 요인의 의미\n3. 직업군별 적성패턴\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 29, question: '다중지능이론(Gardner)과 직업선택의 관계를 설명하시오.', answer: '8가지 지능: 언어, 논리수학, 공간, 음악 등', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 다중지능이론과 직업선택의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 8가지 지능 유형\n2. 지능별 특성\n3. 지능과 직업의 연결\n4. 상담에서의 적용\n5. 연습문제 3개' },
        { id: 30, question: '직업가치관검사의 구성과 해석을 설명하시오.', answer: '내재적 가치(성취감), 외재적 가치(보수), 부수적 가치', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업가치관검사의 구성과 해석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가치관의 유형\n2. 검사 구성\n3. 해석 방법\n4. 직업선택에서의 활용\n5. 연습문제 3개' },
        { id: 31, question: '진로사고검사(CTI)의 목적과 구성을 설명하시오.', answer: '의사결정혼란, 수행불안, 외적갈등 측정', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 진로사고검사(CTI)의 목적과 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CTI의 목적\n2. 하위척도\n3. 해석 방법\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 32, question: '진로결정수준검사의 개념과 활용을 설명하시오.', answer: '진로결정과 미결정의 정도 측정', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 진로결정수준검사의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 검사의 목적\n2. 구성요소\n3. 해석 방법\n4. 미결정 유형별 상담전략\n5. 연습문제 3개' },
      ]
    },
    {
      title: '진로의사결정이론',
      questions: [
        { id: 33, question: '진로의사결정의 유형(합리적, 직관적, 의존적)을 설명하시오.', answer: '합리적: 논리적 분석 / 직관적: 감정 기반 / 의존적: 타인 의존', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 진로의사결정의 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 유형의 특성\n2. 장단점\n3. 유형별 상담전략\n4. 효과적인 의사결정 지원\n5. 연습문제 3개' },
        { id: 34, question: 'Gelatt의 의사결정 모형을 설명하시오.', answer: '목표 → 정보수집 → 대안탐색 → 결과예측 → 결정', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Gelatt의 의사결정 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모형의 단계\n2. 각 단계의 활동\n3. 순환적 특성\n4. 상담에서의 적용\n5. 연습문제 3개' },
        { id: 35, question: 'Tiedeman과 O\'Hara의 진로의사결정 과정을 설명하시오.', answer: '예상단계(탐색, 구체화, 선택, 명료화) + 실천단계', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: Tiedeman과 O\'Hara의 진로의사결정 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 예상단계의 하위과정\n2. 실천단계의 하위과정\n3. 자아정체감의 역할\n4. 상담에서의 적용\n5. 연습문제 3개' },
        { id: 36, question: '진로미결정의 유형과 상담전략을 설명하시오.', answer: '발달적 미결정, 우유부단, 정보부족 등', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 진로미결정의 유형과 상담전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미결정의 유형\n2. 각 유형의 원인\n3. 유형별 상담전략\n4. 미결정 해소 방법\n5. 연습문제 3개' },
        { id: 37, question: '진로장벽의 개념과 극복방안을 설명하시오.', answer: '내적 장벽(자신감 부족), 외적 장벽(차별, 경제적 문제)', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 진로장벽의 개념과 극복방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진로장벽의 정의\n2. 장벽의 유형\n3. 극복 전략\n4. 상담에서의 개입\n5. 연습문제 3개' },
        { id: 38, question: '진로자기효능감의 개념과 향상방법을 설명하시오.', answer: '진로관련 과업 수행에 대한 자신감', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 진로자기효능감의 개념과 향상방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진로자기효능감의 정의\n2. 형성 요인 4가지\n3. 향상 방법\n4. 상담에서의 활용\n5. 연습문제 3개' },
        { id: 39, question: 'CIP 모형(인지정보처리접근)의 CASVE 순환을 설명하시오.', answer: '의사소통 → 분석 → 종합 → 가치화 → 실행', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: CIP 모형의 CASVE 순환을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CIP 모형의 구조\n2. CASVE 각 단계\n3. 피라미드 구조\n4. 상담에서의 적용\n5. 연습문제 3개' },
        { id: 40, question: '진로결정 자기효능감 척도의 구성요소를 설명하시오.', answer: '자기평가, 정보수집, 목표선정, 계획수립, 문제해결', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 진로결정 자기효능감 척도의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 5가지 구성요소\n2. 각 요소의 의미\n3. 측정 방법\n4. 상담에서의 활용\n5. 연습문제 3개' },
      ]
    },
    {
      title: '직업적응과 직무스트레스',
      questions: [
        { id: 41, question: 'Dawis와 Lofquist의 직업적응이론(TWA)을 설명하시오.', answer: '개인-환경 적합성, 만족과 충족', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업적응이론(TWA)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이론의 기본 개념\n2. 적합성의 유형\n3. 만족과 충족의 관계\n4. 상담에서의 적용\n5. 연습문제 3개' },
        { id: 42, question: '직업만족(Job Satisfaction)의 개념과 영향요인을 설명하시오.', answer: '직무 자체, 보상, 승진기회, 대인관계, 작업조건', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업만족의 개념과 영향요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직업만족의 정의\n2. 주요 영향요인\n3. 측정 방법\n4. 만족도 향상 전략\n5. 연습문제 3개' },
        { id: 43, question: '직무스트레스의 원인과 결과를 설명하시오.', answer: '역할갈등, 과부하 → 소진, 이직, 건강문제', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직무스트레스의 원인과 결과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스트레스의 정의\n2. 원인 유형\n3. 개인/조직 차원 결과\n4. 관리 방안\n5. 연습문제 3개' },
        { id: 44, question: '직업 소진(Burnout)의 3요소를 설명하시오.', answer: '정서적 고갈, 비인간화, 개인적 성취감 저하', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업 소진의 3요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소진의 정의\n2. 3가지 구성요소\n3. 발생 과정\n4. 예방과 회복 방안\n5. 연습문제 3개' },
        { id: 45, question: '일-생활 균형(Work-Life Balance)의 개념과 중요성을 설명하시오.', answer: '직업역할과 개인/가정역할 간의 균형', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 일-생활 균형의 개념과 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개념 정의\n2. 불균형의 결과\n3. 균형 달성 전략\n4. 조직 차원 지원\n5. 연습문제 3개' },
        { id: 46, question: '직장 내 대인관계와 직업적응의 관계를 설명하시오.', answer: '동료, 상사와의 관계가 직업만족과 적응에 영향', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직장 내 대인관계와 직업적응의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대인관계의 중요성\n2. 관계 유형별 영향\n3. 갈등 관리\n4. 상담에서의 접근\n5. 연습문제 3개' },
        { id: 47, question: '이직의 원인과 예방을 설명하시오.', answer: '불만족, 경력개발 한계, 조직몰입 저하', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 이직의 원인과 예방을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이직의 유형\n2. 이직 원인\n3. 이직 결정 과정\n4. 예방 전략\n5. 연습문제 3개' },
        { id: 48, question: '경력정체(Career Plateau)의 개념과 극복방안을 설명하시오.', answer: '승진, 직무확대 기회 감소 상태', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 경력정체의 개념과 극복방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경력정체의 정의\n2. 유형과 원인\n3. 부정적 영향\n4. 극복 전략\n5. 연습문제 3개' },
        { id: 49, question: '직업전환(Career Transition)의 유형과 지원방안을 설명하시오.', answer: '자발적/비자발적 전환, 심리적 지원 필요', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 직업전환의 유형과 지원방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전환의 유형\n2. 전환 과정\n3. 심리적 영향\n4. 상담 지원 방안\n5. 연습문제 3개' },
        { id: 50, question: '퇴직 적응과 생애설계를 설명하시오.', answer: '퇴직 전 준비, 심리적 적응, 새로운 역할 개발', prompt: '직업상담사 2급 직업심리학 문제입니다.\n\n문제: 퇴직 적응과 생애설계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직의 심리적 영향\n2. 퇴직 적응 단계\n3. 생애설계의 필요성\n4. 상담에서의 지원\n5. 연습문제 3개' },
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
            <span className="text-teal-600 font-medium">직업심리학</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🧠</span>
            <div>
              <h1 className="text-2xl font-bold">직업심리학</h1>
              <p className="text-teal-100">총 {totalQuestions}문항 | 심리검사와 진로발달이론</p>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTopic(topicIdx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-bold text-sm">
                    {topicIdx + 1}
                  </div>
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
