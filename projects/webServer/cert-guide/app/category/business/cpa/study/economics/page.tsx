'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function EconomicsStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['micro-basic']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cpa-economics-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('cpa-economics-completed', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 미시경제-수요공급 (1-12)
    { id: 1, topic: 'micro-basic', question: '수요의 가격탄력성 개념과 결정요인을 설명하시오.', answer: '가격변화율 대비 수요량변화율, 대체재 존재 여부, 필수재 여부 등', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 수요의 가격탄력성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탄력성의 정의와 공식\n2. 탄력성 결정요인\n3. 탄력성과 총수입 관계\n4. 계산 예제\n5. 연습문제 3개' },
    { id: 2, topic: 'micro-basic', question: '소비자잉여와 생산자잉여를 설명하시오.', answer: '소비자: 지불용의-실제지불, 생산자: 실제수취-최소요구', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 소비자잉여와 생산자잉여를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 잉여의 정의\n2. 그래프상 표현\n3. 총잉여와 효율성\n4. 정책 영향 분석\n5. 연습문제 3개' },
    { id: 3, topic: 'micro-basic', question: '가격상한제와 가격하한제의 효과를 분석하시오.', answer: '상한제: 초과수요, 암시장 / 하한제: 초과공급, 잉여', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 가격규제의 효과를 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 가격상한제 효과\n2. 가격하한제 효과\n3. 자중손실 발생\n4. 실제 사례\n5. 연습문제 3개' },
    { id: 4, topic: 'micro-basic', question: '조세의 귀착과 자중손실을 분석하시오.', answer: '탄력성에 따라 조세부담 배분, 거래량 감소로 효율손실', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 조세의 귀착과 자중손실을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 조세귀착의 원리\n2. 탄력성과 조세부담\n3. 자중손실 계산\n4. 효율적 조세\n5. 연습문제 3개' },
    { id: 5, topic: 'micro-basic', question: '국제무역의 이익을 설명하시오.', answer: '비교우위에 따른 특화로 양국 모두 이익', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 국제무역의 이익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 절대우위와 비교우위\n2. 교역조건 결정\n3. 무역이익 분석\n4. 관세 효과\n5. 연습문제 3개' },
    { id: 6, topic: 'micro-basic', question: '무차별곡선과 예산선을 이용한 소비자선택을 설명하시오.', answer: '예산선과 무차별곡선 접점에서 효용극대화', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 소비자선택이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무차별곡선 특성\n2. 예산제약\n3. 최적선택 조건\n4. 가격효과 분해\n5. 연습문제 3개' },
    { id: 7, topic: 'micro-basic', question: '소득효과와 대체효과를 설명하시오.', answer: '가격하락시 대체효과(+), 소득효과(정상재+, 열등재-)', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 소득효과와 대체효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대체효과의 정의\n2. 소득효과의 정의\n3. 힉스분해와 슬러츠키분해\n4. 기펜재\n5. 연습문제 3개' },
    { id: 8, topic: 'micro-basic', question: '생산함수와 비용함수의 관계를 설명하시오.', answer: 'MP↓→MC↑, AP↓→AVC↑', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 생산함수와 비용함수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단기생산함수\n2. 한계생산체감법칙\n3. 단기비용곡선\n4. 장기비용곡선\n5. 연습문제 3개' },
    { id: 9, topic: 'micro-basic', question: '규모의 경제와 범위의 경제를 설명하시오.', answer: '규모: 생산량증가시 AC감소, 범위: 복수제품 공동생산 이익', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 규모의 경제와 범위의 경제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 규모의 경제 원인\n2. 규모의 불경제\n3. 범위의 경제\n4. 최적규모 결정\n5. 연습문제 3개' },
    { id: 10, topic: 'micro-basic', question: '등량곡선과 등비용선을 이용한 생산자선택을 설명하시오.', answer: '등비용선과 등량곡선 접점에서 비용최소화', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 비용최소화 선택을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등량곡선 특성\n2. 등비용선\n3. 최적요소투입 조건\n4. 확장경로\n5. 연습문제 3개' },
    { id: 11, topic: 'micro-basic', question: '이윤극대화 조건을 설명하시오.', answer: 'MR=MC에서 이윤극대화', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 이윤극대화 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 총수입과 총비용\n2. MR=MC 조건 도출\n3. 완전경쟁 vs 독점\n4. 조업중단점\n5. 연습문제 3개' },
    { id: 12, topic: 'micro-basic', question: '요소시장의 균형을 설명하시오.', answer: '노동수요(MRPL), 노동공급, 균형임금 결정', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 요소시장 균형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 노동수요 도출\n2. 노동공급곡선\n3. 균형임금 결정\n4. 최저임금제 효과\n5. 연습문제 3개' },

    // 미시경제-시장구조 (13-25)
    { id: 13, topic: 'micro-market', question: '완전경쟁시장의 특성과 균형을 설명하시오.', answer: '다수기업, 동질제품, 자유진입, P=MC에서 균형', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 완전경쟁시장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완전경쟁 조건\n2. 단기균형\n3. 장기균형\n4. 효율성\n5. 연습문제 3개' },
    { id: 14, topic: 'micro-market', question: '독점시장의 특성과 비효율성을 설명하시오.', answer: '단일공급자, P>MC, 자중손실 발생', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 독점시장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 독점 형성 원인\n2. 독점가격 결정\n3. 독점의 비효율성\n4. 가격차별\n5. 연습문제 3개' },
    { id: 15, topic: 'micro-market', question: '자연독점과 규제 방안을 설명하시오.', answer: '규모의 경제로 인한 독점, 가격규제, 공기업', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 자연독점 규제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자연독점 정의\n2. 한계비용 가격설정\n3. 평균비용 가격설정\n4. 규제의 문제점\n5. 연습문제 3개' },
    { id: 16, topic: 'micro-market', question: '독점적 경쟁시장을 설명하시오.', answer: '다수기업, 차별화제품, 자유진입, 장기 정상이윤', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 독점적 경쟁시장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시장 특성\n2. 단기균형\n3. 장기균형\n4. 초과설비\n5. 연습문제 3개' },
    { id: 17, topic: 'micro-market', question: '과점시장과 담합을 설명하시오.', answer: '소수기업의 상호의존, 카르텔 형성 유인', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 과점시장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과점의 특성\n2. 꺾인수요곡선\n3. 카르텔과 담합\n4. 담합의 불안정성\n5. 연습문제 3개' },
    { id: 18, topic: 'micro-market', question: '게임이론의 기본개념을 설명하시오.', answer: '죄수의 딜레마, 내쉬균형, 우월전략', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 게임이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 게임의 구성요소\n2. 우월전략균형\n3. 내쉬균형\n4. 죄수의 딜레마\n5. 연습문제 3개' },
    { id: 19, topic: 'micro-market', question: '외부성의 개념과 교정 방안을 설명하시오.', answer: '시장실패 원인, 피구세, 코즈정리', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 외부성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외부성의 정의\n2. 부정적/긍정적 외부성\n3. 피구세와 보조금\n4. 코즈정리\n5. 연습문제 3개' },
    { id: 20, topic: 'micro-market', question: '공공재의 특성과 무임승차 문제를 설명하시오.', answer: '비배제성, 비경합성, 시장공급 불가능', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 공공재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공공재의 특성\n2. 무임승차 문제\n3. 효율적 공급조건\n4. 공공재 공급방식\n5. 연습문제 3개' },
    { id: 21, topic: 'micro-market', question: '정보비대칭과 시장실패를 설명하시오.', answer: '역선택(사전), 도덕적해이(사후)', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 정보비대칭을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역선택의 정의\n2. 도덕적 해이\n3. 신호와 선별\n4. 해결방안\n5. 연습문제 3개' },
    { id: 22, topic: 'micro-market', question: '주인-대리인 문제를 설명하시오.', answer: '정보비대칭 하에서 대리인의 기회주의적 행동', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 주인-대리인 문제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 문제의 정의\n2. 도덕적 해이\n3. 유인설계\n4. 기업지배구조\n5. 연습문제 3개' },
    { id: 23, topic: 'micro-market', question: '쿠르노 모형과 베르뜨랑 모형을 비교 설명하시오.', answer: '쿠르노: 생산량경쟁, 베르뜨랑: 가격경쟁', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 과점모형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 쿠르노 모형\n2. 베르뜨랑 모형\n3. 슈타켈버그 모형\n4. 균형 비교\n5. 연습문제 3개' },
    { id: 24, topic: 'micro-market', question: '후생경제학의 제1정리와 제2정리를 설명하시오.', answer: '제1: 완전경쟁→파레토효율, 제2: 파레토효율→경쟁균형', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 후생경제학 정리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파레토효율성\n2. 제1정리 내용\n3. 제2정리 내용\n4. 정책적 시사점\n5. 연습문제 3개' },
    { id: 25, topic: 'micro-market', question: '공유자원의 비극을 설명하시오.', answer: '공유자원의 과다사용 문제, 사적재산권 설정', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 공유자원의 비극을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공유자원의 특성\n2. 비극의 원리\n3. 해결방안\n4. 실제 사례\n5. 연습문제 3개' },

    // 거시경제-국민소득 (26-38)
    { id: 26, topic: 'macro-income', question: 'GDP의 개념과 측정방법을 설명하시오.', answer: '일정기간 국내에서 생산된 최종재의 시장가치 합', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: GDP를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. GDP 정의\n2. 3면등가 법칙\n3. 명목 vs 실질 GDP\n4. GDP 한계\n5. 연습문제 3개' },
    { id: 27, topic: 'macro-income', question: '총수요의 구성과 결정요인을 설명하시오.', answer: 'AD = C + I + G + NX', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 총수요를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 총수요 구성요소\n2. 소비함수\n3. 투자결정\n4. 순수출\n5. 연습문제 3개' },
    { id: 28, topic: 'macro-income', question: '승수효과를 설명하시오.', answer: '지출 1단위 증가 → 소득 1/(1-MPC) 배 증가', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 승수효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 승수의 정의\n2. 승수 도출 과정\n3. 정부지출승수\n4. 균형예산승수\n5. 연습문제 3개' },
    { id: 29, topic: 'macro-income', question: '인플레이션의 원인과 비용을 설명하시오.', answer: '수요견인, 비용인상, 구두창비용, 메뉴비용', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 인플레이션을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인플레이션 정의\n2. 원인 유형\n3. 인플레이션 비용\n4. 기대와 적응\n5. 연습문제 3개' },
    { id: 30, topic: 'macro-income', question: '실업의 유형과 자연실업률을 설명하시오.', answer: '마찰적, 구조적, 경기적 실업 / 완전고용 실업률', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 실업을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 실업의 측정\n2. 실업 유형\n3. 자연실업률\n4. 오쿤의 법칙\n5. 연습문제 3개' },
    { id: 31, topic: 'macro-income', question: '필립스곡선을 설명하시오.', answer: '인플레이션과 실업의 역관계, 기대부가 필립스곡선', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 필립스곡선을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단기 필립스곡선\n2. 장기 필립스곡선\n3. 기대의 역할\n4. 스태그플레이션\n5. 연습문제 3개' },
    { id: 32, topic: 'macro-income', question: 'AD-AS 모형을 설명하시오.', answer: '총수요-총공급 균형으로 물가와 GDP 결정', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: AD-AS 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. AD곡선 도출\n2. AS곡선(단기/장기)\n3. 균형 결정\n4. 충격 분석\n5. 연습문제 3개' },
    { id: 33, topic: 'macro-income', question: '경기변동의 원인과 특성을 설명하시오.', answer: '실물적충격, 화폐적충격 / 호황, 후퇴, 불황, 회복', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 경기변동을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경기변동 정의\n2. 변동의 4국면\n3. 경기변동 원인\n4. 경기지표\n5. 연습문제 3개' },
    { id: 34, topic: 'macro-income', question: '경제성장이론을 설명하시오.', answer: '솔로우모형: 자본축적, 기술진보', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 경제성장이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 성장의 원천\n2. 솔로우모형\n3. 황금률 자본량\n4. 내생적성장이론\n5. 연습문제 3개' },
    { id: 35, topic: 'macro-income', question: '재정정책의 효과를 분석하시오.', answer: '정부지출, 조세를 통한 총수요 관리', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 재정정책을 분석하시오.\n\n다음 순서로 설명해주세요:\n1. 확장적/긴축적 재정정책\n2. 승수효과\n3. 구축효과\n4. 재정정책 한계\n5. 연습문제 3개' },
    { id: 36, topic: 'macro-income', question: '국가채무와 재정건전성을 설명하시오.', answer: '누적 재정적자, GDP대비 부채비율', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 국가채무를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재정적자 정의\n2. 국가채무 측정\n3. 리카도 등가정리\n4. 재정건전성\n5. 연습문제 3개' },
    { id: 37, topic: 'macro-income', question: '세이의 법칙과 케인즈 혁명을 설명하시오.', answer: '세이: 공급이 수요창출, 케인즈: 유효수요 중시', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 세이의 법칙과 케인즈를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 세이의 법칙\n2. 고전학파 입장\n3. 케인즈 비판\n4. 유효수요이론\n5. 연습문제 3개' },
    { id: 38, topic: 'macro-income', question: '소비이론(항상소득, 생애주기)을 설명하시오.', answer: '항상소득가설, 생애주기가설', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 소비이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 케인즈 소비함수\n2. 항상소득가설\n3. 생애주기가설\n4. 정책적 시사점\n5. 연습문제 3개' },

    // 거시경제-통화금융 (39-50)
    { id: 39, topic: 'macro-money', question: '화폐의 기능과 통화량 지표를 설명하시오.', answer: '교환매개, 가치저장, 계산단위 / M1, M2', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 화폐를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화폐의 3가지 기능\n2. 통화량 지표\n3. 통화승수\n4. 신용창조\n5. 연습문제 3개' },
    { id: 40, topic: 'macro-money', question: '중앙은행의 역할과 통화정책 수단을 설명하시오.', answer: '발권은행, 은행의 은행, 정부의 은행 / 공개시장조작, 지준율, 재할인율', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 중앙은행을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중앙은행 역할\n2. 통화정책 수단\n3. 기준금리 정책\n4. 비전통적 통화정책\n5. 연습문제 3개' },
    { id: 41, topic: 'macro-money', question: '화폐수요이론을 설명하시오.', answer: '거래적, 예비적, 투기적 동기', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 화폐수요이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화폐수요 동기\n2. 고전학파 화폐수량설\n3. 케인즈 유동성선호설\n4. 프리드먼 신화폐수량설\n5. 연습문제 3개' },
    { id: 42, topic: 'macro-money', question: 'IS-LM 모형을 설명하시오.', answer: 'IS: 재화시장균형, LM: 화폐시장균형', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: IS-LM 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IS곡선 도출\n2. LM곡선 도출\n3. 균형 결정\n4. 정책효과 분석\n5. 연습문제 3개' },
    { id: 43, topic: 'macro-money', question: '통화정책의 파급경로를 설명하시오.', answer: '금리경로, 자산가격경로, 환율경로, 신용경로', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 통화정책 파급경로를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 금리경로\n2. 자산가격경로\n3. 환율경로\n4. 신용경로\n5. 연습문제 3개' },
    { id: 44, topic: 'macro-money', question: '환율결정이론을 설명하시오.', answer: '구매력평가설, 금리평가설', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 환율결정이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 명목환율과 실질환율\n2. 구매력평가설\n3. 금리평가설\n4. 환율변동 요인\n5. 연습문제 3개' },
    { id: 45, topic: 'macro-money', question: '고정환율제도와 변동환율제도를 비교하시오.', answer: '고정: 환율안정, 통화정책독립성↓ / 변동: 자동조정, 환율불안정', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 환율제도를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 고정환율제 특징\n2. 변동환율제 특징\n3. 불가능한 삼위일체\n4. 현행 환율제도\n5. 연습문제 3개' },
    { id: 46, topic: 'macro-money', question: '국제수지의 구성과 균형을 설명하시오.', answer: '경상수지 + 자본수지 + 금융계정 = 0', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 국제수지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국제수지 구성\n2. 경상수지 결정요인\n3. 자본이동\n4. 국제수지 균형\n5. 연습문제 3개' },
    { id: 47, topic: 'macro-money', question: '먼델-플레밍 모형을 설명하시오.', answer: '개방경제 IS-LM, 자본이동성과 환율제도별 정책효과', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 먼델-플레밍 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개방경제 IS-LM\n2. 고정환율+완전자본이동\n3. 변동환율+완전자본이동\n4. 정책효과 비교\n5. 연습문제 3개' },
    { id: 48, topic: 'macro-money', question: '테일러 준칙을 설명하시오.', answer: '인플레이션갭, 산출갭에 따른 금리조정 규칙', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 테일러 준칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 테일러 준칙 공식\n2. 인플레이션 목표\n3. 산출갭\n4. 통화정책 평가\n5. 연습문제 3개' },
    { id: 49, topic: 'macro-money', question: '유동성함정을 설명하시오.', answer: '명목금리 0%에서 통화정책 무력화', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 유동성함정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유동성함정 정의\n2. LM곡선 수평\n3. 통화정책 무력화\n4. 양적완화\n5. 연습문제 3개' },
    { id: 50, topic: 'macro-money', question: '합리적 기대와 정책무력성 명제를 설명하시오.', answer: '합리적 기대 하에서 예상된 정책은 실물효과 없음', prompt: '공인회계사 경제원론 문제입니다.\n\n문제: 합리적 기대이론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합리적 기대 정의\n2. 정책무력성 명제\n3. 루카스 비판\n4. 정책적 시사점\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'micro-basic', name: '미시(수요공급)', icon: '📈', count: 12 },
    { id: 'micro-market', name: '미시(시장구조)', icon: '🏪', count: 13 },
    { id: 'macro-income', name: '거시(국민소득)', icon: '💹', count: 13 },
    { id: 'macro-money', name: '거시(통화금융)', icon: '🏦', count: 12 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/category/business/cpa" className="text-gray-500 hover:text-gray-700">공인회계사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">경제원론</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📈</div>
            <div>
              <h1 className="text-2xl font-bold">경제원론</h1>
              <p className="text-indigo-100">1차 시험 40문항 | 미시경제, 거시경제</p>
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

      <div className="max-w-4xl mx-auto px-4 py-8">
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
                    ? 'bg-indigo-100 border-2 border-indigo-300'
                    : 'bg-white border border-gray-200 hover:border-indigo-200'
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
                              ? 'bg-indigo-500 border-indigo-500 text-white'
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
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-sm hover:bg-indigo-200 transition flex-shrink-0"
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

        <div className="mt-8 flex justify-between">
          <Link href="/category/business/cpa/study/business-admin" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 경영학
          </Link>
          <Link href="/category/business/cpa/study/commercial-law" className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            상법 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 공인회계사 경제원론 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
