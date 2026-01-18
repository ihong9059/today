'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function FiscalPolicyStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['tax-basics']);

  useEffect(() => {
    const saved = localStorage.getItem('tax-accountant-fiscal-policy-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tax-accountant-fiscal-policy-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 조세의 기초이론 (1-10)
    { id: 1, topic: 'tax-basics', question: '조세의 정의와 특징(강제성, 무상성, 공법상 금전채무)을 설명하시오.', answer: '조세는 국가가 재정수입을 위해 강제적으로 징수하는 무상의 금전급부이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 조세의 정의와 특징(강제성, 무상성, 공법상 금전채무)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조세의 법적 정의\n2. 조세의 3가지 특징 상세 설명\n3. 조세와 유사개념(부담금, 수수료) 비교\n4. 조세법률주의와의 관계\n5. 연습문제 3개' },
    { id: 2, topic: 'tax-basics', question: '조세법률주의의 내용과 한계를 설명하시오.', answer: '과세요건법정주의, 과세요건명확주의, 소급과세금지, 세법해석기준을 포함한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 조세법률주의의 내용과 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조세법률주의의 헌법적 근거\n2. 4가지 파생원칙 상세 설명\n3. 조세법률주의의 현실적 한계\n4. 위임입법의 한계\n5. 연습문제 3개' },
    { id: 3, topic: 'tax-basics', question: '응능과세원칙과 응익과세원칙을 비교 설명하시오.', answer: '응능과세는 담세력 기준, 응익과세는 편익 기준의 조세 배분 원칙이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 응능과세원칙과 응익과세원칙을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 원칙의 이론적 배경\n2. 수평적·수직적 공평의 의미\n3. 실제 조세제도에의 적용 사례\n4. 두 원칙의 장단점 비교\n5. 연습문제 3개' },
    { id: 4, topic: 'tax-basics', question: '누진세율 구조의 유형과 특징을 설명하시오.', answer: '단순누진세율과 초과누진세율이 있으며, 우리나라는 초과누진세율을 채택한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 누진세율 구조의 유형과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단순누진세율의 개념과 문제점\n2. 초과누진세율의 개념과 장점\n3. 한계세율과 평균세율의 관계\n4. 우리나라 소득세율 구조\n5. 연습문제 3개' },
    { id: 5, topic: 'tax-basics', question: '조세의 중립성과 형평성의 관계를 설명하시오.', answer: '중립성(효율성)과 형평성은 상충관계에 있으며 적정 균형점을 찾아야 한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 조세의 중립성과 형평성의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조세 중립성의 의미\n2. 조세 형평성의 의미\n3. 두 원칙의 상충관계\n4. 정책적 조화 방안\n5. 연습문제 3개' },
    { id: 6, topic: 'tax-basics', question: '직접세와 간접세의 구분 기준과 특징을 비교하시오.', answer: '납세의무자와 담세자의 일치 여부에 따라 구분하며, 각각 장단점이 있다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 직접세와 간접세의 구분 기준과 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 구분 기준(납세의무자와 담세자)\n2. 직접세의 종류와 특징\n3. 간접세의 종류와 특징\n4. 세수 구성 비율의 국제비교\n5. 연습문제 3개' },
    { id: 7, topic: 'tax-basics', question: '보통세와 목적세의 차이점을 설명하시오.', answer: '보통세는 일반재정에, 목적세는 특정 목적에 사용되는 조세이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 보통세와 목적세의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보통세의 정의와 종류\n2. 목적세의 정의와 종류\n3. 목적세의 장단점\n4. 우리나라의 목적세 현황\n5. 연습문제 3개' },
    { id: 8, topic: 'tax-basics', question: '국세와 지방세의 구분과 세원 배분 원칙을 설명하시오.', answer: '과세권자에 따라 구분하며, 세원의 이동성, 안정성 등을 고려해 배분한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 국세와 지방세의 구분과 세원 배분 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국세와 지방세의 구분 기준\n2. 세원 배분의 이론적 원칙\n3. 우리나라 국세·지방세 구조\n4. 지방재정 확충 방안\n5. 연습문제 3개' },
    { id: 9, topic: 'tax-basics', question: '조세지출예산제도의 의의와 기능을 설명하시오.', answer: '비과세·감면 등의 조세지출을 예산으로 관리하여 투명성을 제고하는 제도이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 조세지출예산제도의 의의와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조세지출의 개념\n2. 조세지출예산제도의 도입 배경\n3. 조세지출의 종류와 규모\n4. 제도의 효과와 한계\n5. 연습문제 3개' },
    { id: 10, topic: 'tax-basics', question: '래퍼곡선(Laffer Curve)의 의미와 정책적 시사점을 설명하시오.', answer: '세율과 세수의 관계를 나타내며, 최적세율의 존재를 시사한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 래퍼곡선(Laffer Curve)의 의미와 정책적 시사점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 래퍼곡선의 개념과 형태\n2. 이론적 근거\n3. 정책적 시사점\n4. 비판과 한계\n5. 연습문제 3개' },

    // 조세의 전가와 귀착 (11-20)
    { id: 11, topic: 'tax-incidence', question: '조세의 전가와 귀착의 개념을 구분하여 설명하시오.', answer: '전가는 조세부담의 이전 과정, 귀착은 최종 부담자 결정을 의미한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 조세의 전가와 귀착의 개념을 구분하여 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조세전가의 정의와 유형\n2. 조세귀착의 정의\n3. 법률적 귀착과 경제적 귀착의 차이\n4. 전가와 귀착의 분석방법\n5. 연습문제 3개' },
    { id: 12, topic: 'tax-incidence', question: '부분균형분석에서 종량세와 종가세의 귀착을 비교 분석하시오.', answer: '종량세는 단위당 일정액, 종가세는 가격에 비례하며 귀착 분석 방법이 다르다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 부분균형분석에서 종량세와 종가세의 귀착을 비교 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 종량세의 귀착 분석(그래프 포함)\n2. 종가세의 귀착 분석(그래프 포함)\n3. 두 세금의 귀착 비교\n4. 계산문제 풀이 방법\n5. 연습문제 3개' },
    { id: 13, topic: 'tax-incidence', question: '수요·공급의 탄력성이 조세귀착에 미치는 영향을 분석하시오.', answer: '탄력성이 작은 쪽이 더 많은 조세부담을 지게 된다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 수요·공급의 탄력성이 조세귀착에 미치는 영향을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 탄력성과 조세귀착의 관계 원리\n2. 수요탄력성에 따른 귀착 분석\n3. 공급탄력성에 따른 귀착 분석\n4. 계산공식 유도\n5. 연습문제 3개' },
    { id: 14, topic: 'tax-incidence', question: '완전경쟁시장에서 물품세의 귀착을 그래프를 이용하여 분석하시오.', answer: '세금은 수요곡선과 공급곡선의 탄력성에 따라 소비자와 생산자에게 분배된다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 완전경쟁시장에서 물품세의 귀착을 그래프를 이용하여 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 과세 전후 균형 비교\n2. 소비자 부담과 생산자 부담 도출\n3. 그래프 작성 방법\n4. 귀착률 계산 공식\n5. 연습문제 3개' },
    { id: 15, topic: 'tax-incidence', question: '독점시장에서의 조세귀착을 완전경쟁시장과 비교 분석하시오.', answer: '독점시장에서는 한계수입곡선을 이용하며, 귀착 패턴이 완전경쟁과 다르다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 독점시장에서의 조세귀착을 완전경쟁시장과 비교 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 독점시장의 균형 조건\n2. 독점시장에서의 조세귀착 분석\n3. 완전경쟁시장과의 비교\n4. 100% 이상 전가 가능성\n5. 연습문제 3개' },
    { id: 16, topic: 'tax-incidence', question: '일반균형분석에서의 조세귀착 분석 방법을 설명하시오.', answer: '하버거 모형을 이용해 요소시장과 상품시장의 상호작용을 분석한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 일반균형분석에서의 조세귀착 분석 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부분균형분석의 한계\n2. 하버거 모형의 기본 가정\n3. 산출효과와 요소대체효과\n4. 법인세 귀착 분석 사례\n5. 연습문제 3개' },
    { id: 17, topic: 'tax-incidence', question: '법인세의 귀착에 관한 전통적 견해와 새로운 견해를 비교하시오.', answer: '전통적 견해는 자본소유자 부담, 새로운 견해는 노동자·소비자도 부담한다고 본다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 법인세의 귀착에 관한 전통적 견해와 새로운 견해를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 전통적 견해(하버거 모형)\n2. 새로운 견해(개방경제 분석)\n3. 실증연구 결과\n4. 정책적 시사점\n5. 연습문제 3개' },
    { id: 18, topic: 'tax-incidence', question: '급여세(payroll tax)의 귀착을 분석하시오.', answer: '노동의 수요·공급 탄력성에 따라 고용주와 근로자에게 분배된다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 급여세(payroll tax)의 귀착을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 급여세의 개념과 종류\n2. 노동시장에서의 귀착 분석\n3. 사회보험료의 귀착\n4. 고용에 미치는 영향\n5. 연습문제 3개' },
    { id: 19, topic: 'tax-incidence', question: '재산세의 귀착에 관한 전통적 견해와 새로운 견해를 설명하시오.', answer: '전통적 견해는 토지소유자 부담, 새로운 견해는 자본세로서 분석한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 재산세의 귀착에 관한 전통적 견해와 새로운 견해를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전통적 견해(소비세적 견해)\n2. 새로운 견해(자본세적 견해)\n3. 토지세와 건물세의 귀착 차이\n4. 조지의 토지단일세론\n5. 연습문제 3개' },
    { id: 20, topic: 'tax-incidence', question: '조세의 자본환원(tax capitalization)을 설명하시오.', answer: '미래 조세부담이 자산가격에 반영되어 현재가치로 할인되는 현상이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 조세의 자본환원(tax capitalization)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본환원의 개념\n2. 발생 조건과 메커니즘\n3. 토지세의 자본환원\n4. 정책적 시사점\n5. 연습문제 3개' },

    // 조세의 초과부담 (21-30)
    { id: 21, topic: 'excess-burden', question: '조세의 초과부담(excess burden)의 개념과 발생 원인을 설명하시오.', answer: '세수 이상의 후생손실로, 조세로 인한 상대가격 변화가 원인이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 조세의 초과부담(excess burden)의 개념과 발생 원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 초과부담의 정의\n2. 발생 원인(상대가격 왜곡)\n3. 그래프를 이용한 설명\n4. 초과부담의 측정\n5. 연습문제 3개' },
    { id: 22, topic: 'excess-burden', question: '물품세의 초과부담을 그래프와 수식으로 분석하시오.', answer: '초과부담 = 1/2 × 세율² × 수요탄력성 × 과세 전 거래량 × 가격', prompt: '세무사 재정학 문제입니다.\n\n문제: 물품세의 초과부담을 그래프와 수식으로 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 초과부담의 그래프적 도출\n2. 하버거 삼각형의 면적 계산\n3. 초과부담 공식 유도\n4. 탄력성과 초과부담의 관계\n5. 연습문제 3개' },
    { id: 23, topic: 'excess-burden', question: '소득세의 초과부담을 노동공급 모형으로 분석하시오.', answer: '소득세는 여가와 소득 간 선택을 왜곡하여 초과부담을 발생시킨다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 소득세의 초과부담을 노동공급 모형으로 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 노동-여가 선택 모형 설정\n2. 소득세 부과 후 균형 변화\n3. 대체효과와 소득효과\n4. 초과부담의 발생\n5. 연습문제 3개' },
    { id: 24, topic: 'excess-burden', question: '정액세(lump-sum tax)가 초과부담을 발생시키지 않는 이유를 설명하시오.', answer: '정액세는 상대가격을 변화시키지 않아 대체효과가 없기 때문이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 정액세(lump-sum tax)가 초과부담을 발생시키지 않는 이유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정액세의 개념\n2. 예산제약선에 미치는 영향\n3. 대체효과의 부재\n4. 현실적 적용의 한계\n5. 연습문제 3개' },
    { id: 25, topic: 'excess-burden', question: '동등변화(EV)와 보상변화(CV)를 이용한 초과부담 측정을 비교하시오.', answer: 'EV는 새로운 가격을 기준, CV는 기존 가격을 기준으로 후생변화를 측정한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 동등변화(EV)와 보상변화(CV)를 이용한 초과부담 측정을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. EV의 개념과 측정 방법\n2. CV의 개념과 측정 방법\n3. 소비자잉여와의 관계\n4. 초과부담 측정에의 적용\n5. 연습문제 3개' },
    { id: 26, topic: 'excess-burden', question: '초과부담의 크기에 영향을 미치는 요인들을 분석하시오.', answer: '세율의 크기, 수요(공급)탄력성, 기존 세금의 존재 여부가 영향을 미친다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 초과부담의 크기에 영향을 미치는 요인들을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 세율과 초과부담의 관계(제곱 관계)\n2. 탄력성과 초과부담의 관계\n3. 기존 세금이 있는 경우의 초과부담\n4. 정책적 시사점\n5. 연습문제 3개' },
    { id: 27, topic: 'excess-burden', question: '한계초과부담(MEB)의 개념과 정책적 의의를 설명하시오.', answer: '세수 1원 증가 시 추가적인 초과부담으로, 세율이 높을수록 증가한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 한계초과부담(MEB)의 개념과 정책적 의의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 한계초과부담의 정의\n2. 수식적 표현\n3. 공공지출의 한계비용\n4. 정책적 시사점\n5. 연습문제 3개' },
    { id: 28, topic: 'excess-burden', question: '차선의 이론(theory of second best)이 조세정책에 주는 시사점을 설명하시오.', answer: '하나의 왜곡이 있는 경우, 다른 왜곡을 제거하는 것이 반드시 효율적이지 않다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 차선의 이론(theory of second best)이 조세정책에 주는 시사점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차선의 이론 개요\n2. 조세정책에의 적용\n3. 이중배당가설과의 관계\n4. 환경세의 사례\n5. 연습문제 3개' },
    { id: 29, topic: 'excess-burden', question: '자본소득세의 초과부담을 분석하시오.', answer: '자본소득세는 현재소비와 미래소비 간 선택을 왜곡하여 초과부담을 발생시킨다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 자본소득세의 초과부담을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 2기간 모형 설정\n2. 자본소득세의 영향\n3. 저축에 대한 왜곡\n4. 소비세와의 비교\n5. 연습문제 3개' },
    { id: 30, topic: 'excess-burden', question: '환경세의 이중배당가설(double dividend hypothesis)을 설명하시오.', answer: '환경세는 환경개선과 기존 조세의 초과부담 감소라는 두 가지 효과를 가진다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 환경세의 이중배당가설(double dividend hypothesis)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이중배당가설의 내용\n2. 첫 번째 배당(환경 개선)\n3. 두 번째 배당(효율성 개선)\n4. 실증적 검증 결과\n5. 연습문제 3개' },

    // 최적조세론 (31-40)
    { id: 31, topic: 'optimal-tax', question: '램지 규칙(Ramsey rule)의 내용과 의의를 설명하시오.', answer: '초과부담 최소화를 위해 수요탄력성에 역비례하여 세율을 설정해야 한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 램지 규칙(Ramsey rule)의 내용과 의의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 램지 규칙의 도출 과정\n2. 역탄력성 규칙\n3. 형평성과의 상충\n4. 정책적 시사점\n5. 연습문제 3개' },
    { id: 32, topic: 'optimal-tax', question: '코렛-헤이그 규칙(Corlett-Hague rule)을 설명하시오.', answer: '여가와 보완적인 재화에 높은 세율을 부과해야 초과부담이 최소화된다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 코렛-헤이그 규칙(Corlett-Hague rule)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 코렛-헤이그 규칙의 배경\n2. 여가에 대한 과세 불가능성\n3. 보완재·대체재와 세율\n4. 정책적 적용\n5. 연습문제 3개' },
    { id: 33, topic: 'optimal-tax', question: '최적소득세 이론의 기본 모형을 설명하시오.', answer: '효율성과 형평성의 상충 속에서 사회후생을 극대화하는 세율구조를 도출한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 최적소득세 이론의 기본 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회후생함수의 설정\n2. 정부의 예산제약\n3. 유인양립조건\n4. 최적 한계세율의 결정\n5. 연습문제 3개' },
    { id: 34, topic: 'optimal-tax', question: '밀리스(Mirrlees)의 최적소득세 모형의 결론을 설명하시오.', answer: '최상위 소득구간의 한계세율은 0이어야 하며, 전체적으로 역U자 형태가 나타난다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 밀리스(Mirrlees)의 최적소득세 모형의 결론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 밀리스 모형의 가정\n2. 최상위 소득의 한계세율 0 정리\n3. 최하위 소득의 한계세율\n4. 현실 세율구조와의 비교\n5. 연습문제 3개' },
    { id: 35, topic: 'optimal-tax', question: '음의 소득세(negative income tax)의 개념과 효과를 설명하시오.', answer: '일정 소득 이하에게 보조금을 지급하는 제도로, 근로유인 문제가 있다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 음의 소득세(negative income tax)의 개념과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 음의 소득세의 개념\n2. 기본소득보장과 급여감소율\n3. 근로유인에 미치는 영향\n4. EITC와의 비교\n5. 연습문제 3개' },
    { id: 36, topic: 'optimal-tax', question: '선형소득세와 비선형소득세를 비교하시오.', answer: '선형소득세는 단일 한계세율, 비선형소득세는 누진세율구조를 가진다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 선형소득세와 비선형소득세를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 선형소득세의 구조\n2. 비선형소득세의 구조\n3. 각각의 장단점\n4. 최적세율 결정의 차이\n5. 연습문제 3개' },
    { id: 37, topic: 'optimal-tax', question: '소비세 vs 소득세 논쟁의 핵심 쟁점을 정리하시오.', answer: '저축에 대한 이중과세 여부와 수평적 형평성이 핵심 쟁점이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 소비세 vs 소득세 논쟁의 핵심 쟁점을 정리하시오.\n\n다음 순서로 설명해주세요:\n1. 소비세와 소득세의 차이\n2. 저축에 대한 과세 문제\n3. 형평성 관점의 비교\n4. 실현 가능성 비교\n5. 연습문제 3개' },
    { id: 38, topic: 'optimal-tax', question: '이원적 소득세(dual income tax)의 개념과 특징을 설명하시오.', answer: '근로소득은 누진과세, 자본소득은 비례과세하는 제도이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 이원적 소득세(dual income tax)의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이원적 소득세의 개념\n2. 도입 배경(북유럽 국가)\n3. 장점과 단점\n4. 우리나라 적용 가능성\n5. 연습문제 3개' },
    { id: 39, topic: 'optimal-tax', question: '포괄적 소득세(comprehensive income tax)의 개념을 설명하시오.', answer: '모든 원천의 소득을 합산하여 단일세율로 과세하는 방식이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 포괄적 소득세(comprehensive income tax)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 포괄적 소득의 정의(H-S 소득)\n2. 이상적 과세베이스\n3. 실현의 어려움\n4. 현행 세제와의 비교\n5. 연습문제 3개' },
    { id: 40, topic: 'optimal-tax', question: '애트킨슨-스티글리츠 정리(Atkinson-Stiglitz theorem)를 설명하시오.', answer: '최적 비선형소득세가 존재하면 물품세는 불필요하다는 정리이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 애트킨슨-스티글리츠 정리(Atkinson-Stiglitz theorem)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정리의 내용\n2. 성립 조건\n3. 정책적 함의\n4. 비판과 한계\n5. 연습문제 3개' },

    // 공공지출론 (41-50)
    { id: 41, topic: 'public-expenditure', question: '공공재의 특성(비경합성, 비배제성)을 설명하시오.', answer: '소비의 비경합성과 비배제성으로 인해 시장실패가 발생한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 공공재의 특성(비경합성, 비배제성)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비경합성의 의미와 예시\n2. 비배제성의 의미와 예시\n3. 순수공공재와 준공공재\n4. 무임승차 문제\n5. 연습문제 3개' },
    { id: 42, topic: 'public-expenditure', question: '새뮤얼슨 조건(Samuelson condition)을 유도하고 설명하시오.', answer: '공공재의 최적 공급량은 MRS의 합 = MRT일 때 달성된다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 새뮤얼슨 조건(Samuelson condition)을 유도하고 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공공재 최적 공급의 조건\n2. 수식적 유도\n3. 그래프적 설명\n4. 사적재 최적조건과의 비교\n5. 연습문제 3개' },
    { id: 43, topic: 'public-expenditure', question: '린달 균형(Lindahl equilibrium)의 개념과 한계를 설명하시오.', answer: '개인별 차등가격으로 효율적 공공재 공급이 가능하나, 선호 표출 문제가 있다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 린달 균형(Lindahl equilibrium)의 개념과 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 린달 균형의 메커니즘\n2. 효율성 달성 증명\n3. 선호 표출의 유인\n4. 현실적 한계\n5. 연습문제 3개' },
    { id: 44, topic: 'public-expenditure', question: '클라크 세금(Clarke tax)의 원리를 설명하시오.', answer: '타인에게 미치는 외부비용만큼 세금을 부과하여 진실한 선호 표출을 유도한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 클라크 세금(Clarke tax)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 클라크 세금의 메커니즘\n2. 진실 표출 유인\n3. 계산 예시\n4. 한계와 문제점\n5. 연습문제 3개' },
    { id: 45, topic: 'public-expenditure', question: '비용-편익 분석(cost-benefit analysis)의 절차와 방법을 설명하시오.', answer: '공공사업의 순현재가치(NPV)를 계산하여 사업 타당성을 평가한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 비용-편익 분석(cost-benefit analysis)의 절차와 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비용-편익 분석의 목적\n2. 분석 절차\n3. 할인율 선택 문제\n4. 한계와 주의점\n5. 연습문제 3개' },
    { id: 46, topic: 'public-expenditure', question: '사회적 할인율의 결정 방법을 설명하시오.', answer: '사회적 시간선호율, 사회적 기회비용, 가중평균 방법 등이 있다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 사회적 할인율의 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사회적 할인율의 의의\n2. 결정 방법들\n3. 각 방법의 장단점\n4. 우리나라의 적용\n5. 연습문제 3개' },
    { id: 47, topic: 'public-expenditure', question: '바그너 법칙(Wagner\'s law)과 피콕-와이즈만 효과를 설명하시오.', answer: '경제성장에 따른 정부지출 증가 경향과 비상시 지출 증가 후 하방경직성을 설명한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 바그너 법칙(Wagner\'s law)과 피콕-와이즈만 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 바그너 법칙의 내용\n2. 피콕-와이즈만의 전위효과\n3. 실증적 검증\n4. 정책적 시사점\n5. 연습문제 3개' },
    { id: 48, topic: 'public-expenditure', question: '지대추구행위(rent-seeking)의 개념과 사회적 비용을 설명하시오.', answer: '정부 규제를 통한 독점이윤 획득 활동으로, 자원낭비를 초래한다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 지대추구행위(rent-seeking)의 개념과 사회적 비용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지대추구의 개념\n2. 발생 조건\n3. 사회적 비용\n4. 억제 방안\n5. 연습문제 3개' },
    { id: 49, topic: 'public-expenditure', question: '보몰 효과(Baumol effect)를 설명하시오.', answer: '공공부문의 생산성 정체로 인해 정부지출 비중이 증가하는 현상이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 보몰 효과(Baumol effect)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보몰 효과의 개념\n2. 발생 메커니즘\n3. 공공부문 생산성의 특성\n4. 정책적 대응\n5. 연습문제 3개' },
    { id: 50, topic: 'public-expenditure', question: '티부 모형(Tiebout model)의 내용과 한계를 설명하시오.', answer: '지역 간 이동을 통해 지방공공재의 효율적 공급이 가능하다는 이론이다.', prompt: '세무사 재정학 문제입니다.\n\n문제: 티부 모형(Tiebout model)의 내용과 한계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 티부 가설의 내용\n2. 주민의 발에 의한 투표\n3. 모형의 가정\n4. 현실적 한계\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'tax-basics', name: '조세의 기초이론', count: 10 },
    { id: 'tax-incidence', name: '조세의 전가와 귀착', count: 10 },
    { id: 'excess-burden', name: '조세의 초과부담', count: 10 },
    { id: 'optimal-tax', name: '최적조세론', count: 10 },
    { id: 'public-expenditure', name: '공공지출론', count: 10 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tax-accountant" className="text-gray-500 hover:text-gray-700">세무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">재정학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 재정학</h1>
          <p className="text-gray-600">세무사 1차 시험 | 40문항 | 60분</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">학습 진행률</span>
            <span className="text-emerald-600 font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.length} / {questions.length} 문항 완료</p>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{expandedTopics.includes(topic.id) ? '📂' : '📁'}</span>
                  <span className="font-medium text-gray-900">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.count}문항)</span>
                </div>
                <span className="text-gray-400">{expandedTopics.includes(topic.id) ? '▼' : '▶'}</span>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={completedQuestions.includes(q.id)}
                          onChange={() => toggleQuestion(q.id)}
                          className="mt-1 w-5 h-5 text-emerald-600 rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-2">💡 {q.answer}</p>
                          <button
                            onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition"
                          >
                            🤖 AI
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

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link href="/category/accounting/tax-accountant" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 세무사 메인
          </Link>
          <Link href="/category/accounting/tax-accountant/study/tax-law-intro" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
            다음: 세법학개론 →
          </Link>
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                      className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격증 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
