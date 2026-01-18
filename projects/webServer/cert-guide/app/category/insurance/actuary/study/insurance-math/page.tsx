'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function InsuranceMathStudyPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(0);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('actuary-insurance-math-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleComplete = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('actuary-insurance-math-completed', JSON.stringify([...newCompleted]));
  };

  const handleAIClick = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  const topics = [
    {
      title: '확률론 기초',
      questions: [
        { id: 1, question: '확률변수 X의 기댓값 E(X)의 정의와 성질을 설명하시오.', answer: '기댓값은 확률변수의 가능한 값들을 확률로 가중평균한 값입니다. 이산확률변수의 경우 E(X) = Σx·P(X=x), 연속확률변수의 경우 E(X) = ∫x·f(x)dx로 정의됩니다.', prompt: '보험수학에서 기댓값의 정의와 주요 성질, 그리고 보험에서의 활용 예시를 설명해주세요' },
        { id: 2, question: '분산 Var(X)와 표준편차의 관계를 설명하시오.', answer: '분산은 확률변수가 기댓값으로부터 얼마나 퍼져있는지 측정하는 지표로, Var(X) = E[(X-μ)²] = E(X²) - [E(X)]²입니다. 표준편차는 분산의 양의 제곱근입니다.', prompt: '분산과 표준편차의 정의, 계산방법, 그리고 보험에서 리스크 측정에 어떻게 활용되는지 설명해주세요' },
        { id: 3, question: '확률분포의 적률(moment)과 적률생성함수를 설명하시오.', answer: 'n차 적률은 E(X^n)으로 정의되며, 1차 적률이 기댓값입니다. 적률생성함수는 M(t) = E(e^tX)로 정의되고, 미분을 통해 모든 적률을 구할 수 있습니다.', prompt: '적률과 적률생성함수의 정의, 성질, 그리고 확률분포를 특정하는 데 어떻게 사용되는지 설명해주세요' },
        { id: 4, question: '이항분포와 포아송분포의 관계를 설명하시오.', answer: '이항분포 B(n,p)에서 n이 크고 p가 작을 때, np = λ로 일정하면 포아송분포 P(λ)로 근사됩니다. 이는 보험에서 희귀사건의 발생 모형에 활용됩니다.', prompt: '이항분포와 포아송분포의 관계, 포아송 근사 조건, 그리고 보험사고 모형에서의 활용을 설명해주세요' },
        { id: 5, question: '정규분포의 특성과 중심극한정리를 설명하시오.', answer: '정규분포는 평균 μ, 분산 σ²로 특정되며 좌우대칭입니다. 중심극한정리에 의해 독립인 확률변수들의 합은 표본 크기가 커지면 정규분포에 근사합니다.', prompt: '정규분포의 특성과 중심극한정리, 그리고 대수의 법칙과의 관계를 보험수학 관점에서 설명해주세요' },
        { id: 6, question: '조건부 기댓값 E(Y|X)의 의미와 성질을 설명하시오.', answer: '조건부 기댓값은 X의 값이 주어졌을 때 Y의 기댓값입니다. 중요한 성질로 E(Y) = E[E(Y|X)]가 있으며, 이는 전확률 법칙의 기댓값 버전입니다.', prompt: '조건부 기댓값의 정의와 주요 성질, 특히 E(Y) = E[E(Y|X)]의 증명과 보험에서의 활용을 설명해주세요' },
        { id: 7, question: '공분산과 상관계수의 정의와 해석을 설명하시오.', answer: '공분산 Cov(X,Y) = E(XY) - E(X)E(Y)는 두 변수의 선형관계를 측정합니다. 상관계수는 -1과 1 사이의 값으로 표준화된 공분산입니다.', prompt: '공분산과 상관계수의 정의, 성질, 그리고 보험포트폴리오 분산화에서의 의미를 설명해주세요' },
        { id: 8, question: '대수의 법칙이 보험에서 갖는 의미를 설명하시오.', answer: '대수의 법칙에 의해 동질적인 다수의 위험을 인수하면 평균손실이 기댓값에 수렴합니다. 이는 보험 풀링의 수리적 기초가 됩니다.', prompt: '대수의 법칙(약한 법칙, 강한 법칙)의 정의와 보험에서 리스크 풀링의 원리를 설명해주세요' },
        { id: 9, question: '감마분포와 지수분포의 관계를 설명하시오.', answer: '지수분포는 감마분포의 특수한 경우(α=1)입니다. 감마분포 Γ(α,β)의 형상모수 α가 자연수이면 α개의 독립인 지수분포 합의 분포가 됩니다.', prompt: '감마분포와 지수분포의 정의, 관계, 그리고 보험에서 대기시간이나 손실액 모형으로의 활용을 설명해주세요' },
        { id: 10, question: '혼합분포(mixture distribution)의 개념과 활용을 설명하시오.', answer: '혼합분포는 여러 확률분포를 가중평균한 분포입니다. 이질적인 위험그룹의 총손실 모형이나 복합포아송분포 등에 활용됩니다.', prompt: '혼합분포의 정의, 평균과 분산 계산, 그리고 보험에서 이질적 위험군 모형에의 활용을 설명해주세요' }
      ]
    },
    {
      title: '생명표와 사망률',
      questions: [
        { id: 11, question: '생명표(life table)의 구성요소를 설명하시오.', answer: '생명표는 lx(x세 생존자 수), dx(x세 사망자 수), qx(x세 사망확률), px(x세 생존확률), ex(평균여명) 등으로 구성됩니다.', prompt: '생명표의 주요 구성요소(lx, dx, qx, px, ex)의 정의와 상호관계를 설명해주세요' },
        { id: 12, question: '사망확률 qx와 생존확률 px의 관계를 설명하시오.', answer: 'qx는 x세인 사람이 1년 내 사망할 확률, px는 생존할 확률로, px + qx = 1입니다. 여러 해 생존확률은 npx = px·px+1·...·px+n-1입니다.', prompt: '사망확률과 생존확률의 정의, 상호관계, 그리고 n년 생존확률의 계산방법을 설명해주세요' },
        { id: 13, question: '사력(force of mortality) μx의 정의와 의미를 설명하시오.', answer: '사력 μx = -d(ln lx)/dx는 순간사망률로, 연속적 사망모형에서 사용됩니다. qx ≈ μx (x가 정수일 때 근사)의 관계가 있습니다.', prompt: '사력의 정의, 사망확률과의 관계, 그리고 연속형 생존모형에서의 활용을 설명해주세요' },
        { id: 14, question: '곰페르츠(Gompertz) 법칙과 메이컴(Makeham) 법칙을 비교하시오.', answer: 'Gompertz: μx = Bc^x (지수적 증가), Makeham: μx = A + Bc^x (상수항 추가). Makeham은 사고사 등 연령 무관 사망을 반영합니다.', prompt: 'Gompertz 법칙과 Makeham 법칙의 수식, 가정, 차이점, 그리고 실제 생명표에의 적용을 설명해주세요' },
        { id: 15, question: '선택효과(select effect)와 선택생명표를 설명하시오.', answer: '언더라이팅을 통과한 직후에는 사망률이 낮고 시간이 지나면서 일반사망률에 수렴합니다. 선택생명표는 이 효과를 반영한 표입니다.', prompt: '선택효과의 개념, 선택기간, 그리고 선택생명표와 종국생명표의 차이를 설명해주세요' },
        { id: 16, question: '평균여명 ex와 완전기대여명의 차이를 설명하시오.', answer: '평균여명 ex는 생명표 기반의 이산형 기대여명이고, 완전기대여명 ěx는 연속형 모형에서의 기대여명입니다. ěx = ex + 0.5 (UDD 가정 시).', prompt: '평균여명과 완전기대여명의 정의, 차이점, 그리고 UDD 가정에서의 관계를 설명해주세요' },
        { id: 17, question: 'UDD(Uniform Distribution of Deaths) 가정을 설명하시오.', answer: 'UDD는 1년 내 사망이 균등하게 분포한다는 가정입니다. 이 가정 하에서 tqx = t·qx (0≤t≤1)가 성립합니다.', prompt: 'UDD 가정의 정의, 수학적 표현, 그리고 부분연령 생존확률 계산에의 활용을 설명해주세요' },
        { id: 18, question: '연생보험에서 결합생존확률을 계산하는 방법을 설명하시오.', answer: '두 사람 (x)와 (y)의 결합생존확률 tpxy = tpx·tpy (독립 가정). 최후생존상태는 1 - tpx̄y = (1-tpx)·(1-tpy)입니다.', prompt: '연생보험에서 결합생존상태와 최후생존상태의 정의, 확률계산, 그리고 독립가정의 의미를 설명해주세요' },
        { id: 19, question: '다중탈퇴모형(multiple decrement model)의 개념을 설명하시오.', answer: '사망 외에 해약, 실효 등 여러 탈퇴원인을 동시에 고려하는 모형입니다. 각 원인별 탈퇴율의 합이 총탈퇴율이 됩니다.', prompt: '다중탈퇴모형의 정의, 절대탈퇴율과 순수탈퇴율의 차이, 그리고 보험계리에서의 활용을 설명해주세요' },
        { id: 20, question: '경험생명표와 표준생명표의 차이를 설명하시오.', answer: '경험생명표는 특정 집단의 실제 사망경험을 바탕으로 작성되고, 표준생명표는 감독기관이 정한 보험료 산출용 표준표입니다.', prompt: '경험생명표와 표준생명표의 정의, 작성방법, 그리고 보험료 산출에서의 역할 차이를 설명해주세요' }
      ]
    },
    {
      title: '순보험료 계산',
      questions: [
        { id: 21, question: '순보험료의 정의와 수지상등의 원칙을 설명하시오.', answer: '순보험료는 보험금 지급에 필요한 원가 부분입니다. 수지상등의 원칙: 순보험료의 현가 = 보험금의 현가, 즉 수입과 지출이 균형을 이룹니다.', prompt: '순보험료의 정의, 수지상등의 원칙, 그리고 대수의 법칙과의 관계를 설명해주세요' },
        { id: 22, question: '생명보험의 일시납순보험료 Ax의 계산방법을 설명하시오.', answer: 'Ax = Σ(v^(k+1)·kpx·qx+k) (k=0부터 ω-x-1까지). 이는 사망보험금 1원의 현재가치 기댓값입니다.', prompt: '종신보험 일시납순보험료 Ax의 정의와 계산공식, 그리고 생명표를 이용한 실제 계산방법을 설명해주세요' },
        { id: 23, question: '정기보험과 종신보험의 순보험료 차이를 설명하시오.', answer: '정기보험 A¹x:n̄|은 n년 이내 사망 시에만 보험금 지급, 종신보험 Ax는 언제 사망하든 지급. 따라서 A¹x:n̄| < Ax입니다.', prompt: 'n년 정기보험과 종신보험의 순보험료 계산공식, 그리고 두 보험료의 관계를 설명해주세요' },
        { id: 24, question: '양로보험(endowment insurance)의 순보험료를 설명하시오.', answer: '양로보험 Ax:n̄| = A¹x:n̄| + nEx. n년 내 사망 또는 n년 생존 시 보험금이 지급되는 저축성 보험입니다.', prompt: '양로보험의 구조와 순보험료 계산공식, 정기보험료와 생존보험료의 분해를 설명해주세요' },
        { id: 25, question: '생존보험(순수생존보험)의 순보험료 nEx를 설명하시오.', answer: 'nEx = v^n·npx. n년 생존 시에만 보험금 1원을 지급하는 보험의 일시납순보험료입니다. 연금의 기본 구성요소입니다.', prompt: '생존보험 순보험료 nEx의 정의, 계산공식, 그리고 연금계리에서의 역할을 설명해주세요' },
        { id: 26, question: '즉시개시 종신연금의 현가 äx를 계산하는 방법을 설명하시오.', answer: 'äx = Σ(v^k·kpx) (k=0부터 ω-x까지). 생존하는 동안 매기 초 1원을 지급받는 연금의 현재가치입니다.', prompt: '즉시개시 기시연금 äx의 정의와 계산공식, 그리고 기말연금 ax와의 관계를 설명해주세요' },
        { id: 27, question: '거치연금(deferred annuity)의 현가를 계산하시오.', answer: 'n년 거치 종신연금: n|äx = nEx·äx+n = v^n·npx·äx+n. n년 후 생존 시 연금 개시됩니다.', prompt: '거치연금의 정의, 현가 계산공식, 그리고 즉시연금과의 관계를 설명해주세요' },
        { id: 28, question: '연납순보험료 Px의 계산원리를 설명하시오.', answer: 'Px = Ax/äx. 연납순보험료의 현가 총액이 일시납순보험료와 같다는 수지상등의 원칙에서 도출됩니다.', prompt: '연납순보험료의 계산원리, 일시납순보험료와의 관계, 그리고 납입기간이 다른 경우의 계산을 설명해주세요' },
        { id: 29, question: '증가보험과 감소보험의 순보험료를 설명하시오.', answer: '증가보험 (IA)x는 매년 보험금이 1씩 증가, 감소보험 (DA)x는 감소하는 보험입니다. (IA)x + (DA)x = (n+1)·Ax 관계가 있습니다.', prompt: '증가보험과 감소보험의 정의, 순보험료 계산공식, 그리고 실무 적용사례를 설명해주세요' },
        { id: 30, question: '환급금 있는 정기보험의 순보험료를 계산하시오.', answer: '만기환급금 S가 있는 정기보험: A¹x:n̄| + S·nEx. 사망 시 사망보험금, 생존 시 환급금을 지급합니다.', prompt: '환급금 있는 정기보험의 순보험료 계산, 순수보장형과의 비교를 설명해주세요' }
      ]
    },
    {
      title: '책임준비금',
      questions: [
        { id: 31, question: '책임준비금의 정의와 계산원리를 설명하시오.', answer: '책임준비금은 장래 보험금 지급을 위해 적립해야 하는 금액입니다. 미래법: V = APV(미래급부) - APV(미래보험료)로 계산합니다.', prompt: '책임준비금의 정의, 미래법에 의한 계산원리, 그리고 보험회사 재무에서의 중요성을 설명해주세요' },
        { id: 32, question: '순보험료식 준비금과 영업보험료식 준비금을 비교하시오.', answer: '순보험료식은 순보험료만 고려하여 계산, 영업보험료식은 사업비도 포함합니다. 순보험료식이 더 보수적(높음)입니다.', prompt: '순보험료식 준비금과 영업보험료식 준비금의 차이, 각각의 계산방법을 설명해주세요' },
        { id: 33, question: '미래법과 과거법의 관계를 설명하시오.', answer: '미래법: tV = Ax+t - Px·äx+t, 과거법: tV = Px·sx̄t̄| - Āx:t̄|. 수지상등 원칙 하에서 두 방법의 결과는 같습니다.', prompt: '책임준비금 계산의 미래법과 과거법, 동치성 증명, 그리고 각 방법의 장단점을 설명해주세요' },
        { id: 34, question: 'Fackler 공식을 설명하시오.', answer: 'tV = (t-1V + P)(1+i)/px+t-1 - qx+t-1·S/px+t-1. 전년도 준비금에서 출발하여 점화적으로 계산합니다.', prompt: 'Fackler 공식의 유도과정과 의미, 그리고 재귀적 준비금 계산에의 활용을 설명해주세요' },
        { id: 35, question: '질메르식 준비금(Zillmer reserve)을 설명하시오.', answer: '신계약비를 초기 준비금에서 차감하여 계산합니다. 초기 준비금이 순보험료식보다 낮고, 점차 수렴합니다.', prompt: '질메르식 준비금의 정의, 계산방법, 순보험료식과의 차이를 설명해주세요' },
        { id: 36, question: '연생보험의 책임준비금 계산을 설명하시오.', answer: '연생보험 준비금은 결합생존확률과 연생연금현가를 이용합니다. tVxy = Ax+t:y+t - Pxy·äx+t:y+t 형태입니다.', prompt: '연생보험의 책임준비금 계산방법, 단생보험과의 차이점을 설명해주세요' },
        { id: 37, question: '해약환급금과 책임준비금의 관계를 설명하시오.', answer: '해약환급금은 일반적으로 책임준비금보다 작습니다. 미상각신계약비, 해약공제 등을 차감하기 때문입니다.', prompt: '해약환급금의 정의, 책임준비금과의 차이, 그리고 해약공제의 의미를 설명해주세요' },
        { id: 38, question: 'GAAP 준비금과 법정준비금의 차이를 설명하시오.', answer: 'GAAP 준비금은 회계목적 최선추정, 법정준비금은 감독목적 보수적 기준입니다. IFRS17 도입으로 회계기준이 변경되었습니다.', prompt: 'GAAP 준비금과 법정준비금의 차이, 각각의 목적과 계산기준을 설명해주세요' },
        { id: 39, question: '보증준비금의 개념과 필요성을 설명하시오.', answer: '변액보험의 보증급부(최저사망보험금, 최저연금 등)에 대한 준비금입니다. 시장리스크를 반영하여 별도 적립합니다.', prompt: '변액보험의 보증준비금 정의, 종류(GMDB, GMAB 등), 그리고 산출방법을 설명해주세요' },
        { id: 40, question: '손해율차, 이자율차, 사업비차의 개념을 설명하시오.', answer: '손해율차(위험차)는 예정사망률과 실제사망률 차이, 이자율차는 예정이율과 운용수익률 차이, 사업비차는 예정사업비와 실제사업비 차이에서 발생합니다.', prompt: '3이원의 정의, 각 이원의 계산방법, 그리고 배당금 재원으로서의 역할을 설명해주세요' }
      ]
    },
    {
      title: '손해보험수학',
      questions: [
        { id: 41, question: '손해분포의 특성과 주요 분포를 설명하시오.', answer: '손해분포는 보통 양의 값만 갖고 우측 꼬리가 긴 형태입니다. 로그정규분포, 파레토분포, 감마분포 등이 많이 사용됩니다.', prompt: '손해보험에서 사용되는 주요 손해분포의 특성, 그리고 실무에서의 선택기준을 설명해주세요' },
        { id: 42, question: '집합적 위험모형(collective risk model)을 설명하시오.', answer: 'S = X1 + X2 + ... + XN. N은 사고건수(도수분포), Xi는 개별손해액(심도분포). 총손해액은 이 둘의 합성분포입니다.', prompt: '집합적 위험모형의 정의, 도수분포와 심도분포의 분리, 총손해액의 평균과 분산 계산을 설명해주세요' },
        { id: 43, question: '복합포아송분포(compound Poisson)를 설명하시오.', answer: '사고건수 N이 포아송분포, 개별손해액 Xi가 독립동일분포일 때의 총손해액 분포입니다. E(S) = λE(X), Var(S) = λE(X²).', prompt: '복합포아송분포의 정의, 평균과 분산, 그리고 적률생성함수를 설명해주세요' },
        { id: 44, question: '재보험의 종류와 수리적 분석을 설명하시오.', answer: '비례재보험(quota share, surplus)과 비비례재보험(excess of loss, stop loss)이 있습니다. 비비례재보험은 원보험자의 위험을 제한합니다.', prompt: '재보험의 종류별 특성, 그리고 각 유형의 순보험료 계산방법을 설명해주세요' },
        { id: 45, question: '공제(deductible)가 보험료에 미치는 영향을 분석하시오.', answer: '공제 d 적용 시 보험금 = max(X-d, 0). E[max(X-d,0)] = E(X) - E(X∧d). 공제로 인해 보험료가 낮아집니다.', prompt: '공제의 종류와 보험료 감소 효과, 그리고 절사분포를 이용한 순보험료 계산을 설명해주세요' },
        { id: 46, question: '신뢰성이론(credibility theory)의 기본개념을 설명하시오.', answer: '개별경험과 전체경험을 가중평균하여 보험료를 산출합니다. 순보험료 = Z·개별경험 + (1-Z)·전체평균, Z는 신뢰도입니다.', prompt: '신뢰성이론의 기본개념, 부흘만 신뢰도, 그리고 경험률 보험료 산출에의 적용을 설명해주세요' },
        { id: 47, question: '보너스-말러스 시스템(BMS)의 원리를 설명하시오.', answer: '무사고 시 할인(보너스), 사고 시 할증(말러스)하는 요율체계입니다. 마르코프 체인으로 모형화하고 정상상태 분포를 분석합니다.', prompt: '보너스-말러스 시스템의 원리, 전이행렬, 그리고 정상상태 보험료 분석을 설명해주세요' },
        { id: 48, question: 'IBNR(미보고발생손해액) 추정방법을 설명하시오.', answer: '사고는 발생했으나 아직 보고되지 않은 손해의 추정액입니다. Chain-Ladder법, Bornhuetter-Ferguson법 등을 사용합니다.', prompt: 'IBNR의 정의, 주요 추정방법(Chain-Ladder, BF법), 그리고 삼각형표의 활용을 설명해주세요' },
        { id: 49, question: '위험분류와 역선택의 관계를 설명하시오.', answer: '위험분류를 하지 않으면 저위험자는 떠나고 고위험자만 남는 역선택이 발생합니다. 적정한 위험분류가 보험시장 안정의 핵심입니다.', prompt: '위험분류의 필요성, 역선택 문제, 그리고 공정한 위험분류 기준을 설명해주세요' },
        { id: 50, question: '파산이론(ruin theory)의 기본모형을 설명하시오.', answer: '초기자본 u에서 시작하여 보험료 수입과 손해 지출에 따른 잉여금 과정을 분석합니다. 파산확률 ψ(u)와 조정계수를 계산합니다.', prompt: '파산이론의 기본모형, 파산확률의 정의, 그리고 조정계수(Lundberg)의 의미를 설명해주세요' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = completedQuestions.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/actuary" className="text-gray-500 hover:text-gray-700">보험계리사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-indigo-600 font-medium">보험수학</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">보험수학</h1>
          <p className="text-gray-600">Insurance Mathematics - 확률론, 생명보험수학, 손해보험수학</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all"
                style={{ width: `${(completedCount / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-500">{completedCount}/{totalQuestions} 완료</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button
                onClick={() => setOpenTopic(openTopic === topicIdx ? null : topicIdx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📐</span>
                  <div className="text-left">
                    <h2 className="font-bold">{topic.title}</h2>
                    <p className="text-sm text-gray-500">{topic.questions.length}문항</p>
                  </div>
                </div>
                <span className={`transform transition-transform ${openTopic === topicIdx ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {openTopic === topicIdx && (
                <div className="px-6 pb-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`p-4 rounded-xl border ${completedQuestions.has(q.id) ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50'}`}>
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleComplete(q.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${completedQuestions.has(q.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'}`}
                        >
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium mb-2">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-3">{q.answer}</p>
                          <button
                            onClick={() => handleAIClick(q.prompt)}
                            className="text-sm text-indigo-600 hover:text-indigo-700"
                          >
                            🤖 AI에게 더 자세히 질문하기
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

        <div className="mt-8 text-center">
          <Link href="/category/insurance/actuary" className="text-indigo-600 hover:text-indigo-700 font-medium">
            ← 보험계리사 메인으로
          </Link>
        </div>
      </main>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">AI에게 질문하기</h3>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700">{currentPrompt}</p>
            </div>
            <div className="grid gap-3">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Gemini에게 질문하기</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
