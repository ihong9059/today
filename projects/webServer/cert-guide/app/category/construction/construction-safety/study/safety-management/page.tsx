'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function SafetyManagementStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('construction-safety-safety-management-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('construction-safety-safety-management-completed', JSON.stringify([...newCompleted]));
  };

  const topics = [
    {
      title: '안전관리 개요와 조직',
      questions: [
        { id: 1, question: '안전관리의 정의와 목적을 설명하시오.', answer: '재해예방과 안전한 작업환경 조성', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전관리의 정의와 목적을 설명하시오.\n\n1. 안전관리의 정의\n2. 안전관리의 목적\n3. 안전관리의 기본원칙\n4. 건설현장 적용 사례' },
        { id: 2, question: '안전관리 조직의 3가지 유형(직계형, 참모형, 직계참모형)을 비교하시오.', answer: '권한과 책임 배분 방식의 차이', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전관리 조직의 3가지 유형을 비교하시오.\n\n1. 직계형(Line) 조직\n2. 참모형(Staff) 조직\n3. 직계참모형(Line and Staff) 조직\n4. 각 조직의 장단점 비교' },
        { id: 3, question: '안전관리자의 직무와 선임기준을 설명하시오.', answer: '상시근로자 50인 이상 사업장 선임 의무', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전관리자의 직무와 선임기준을 설명하시오.\n\n1. 안전관리자의 법적 직무\n2. 선임기준(사업장 규모별)\n3. 자격요건\n4. 전담/겸직 구분' },
        { id: 4, question: '산업안전보건위원회의 구성과 심의사항을 설명하시오.', answer: '노사 동수 구성, 분기 1회 이상 개최', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 산업안전보건위원회의 구성과 심의사항을 설명하시오.\n\n1. 구성(위원장, 노사 위원)\n2. 설치 대상 사업장\n3. 심의·의결 사항\n4. 운영 방법' },
        { id: 5, question: '안전보건관리규정의 작성 의무와 포함사항을 설명하시오.', answer: '상시근로자 100인 이상 사업장', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전보건관리규정의 작성 의무와 포함사항을 설명하시오.\n\n1. 작성 의무 대상\n2. 필수 포함사항\n3. 작성 절차\n4. 변경 시 조치사항' },
        { id: 6, question: '안전보건총괄책임자의 직무를 5가지 이상 나열하시오.', answer: '위험성평가, 도급사업 안전보건조치 총괄', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전보건총괄책임자의 직무를 5가지 이상 나열하시오.\n\n1. 법적 직무 내용\n2. 선임 대상\n3. 자격요건\n4. 건설현장 적용' },
        { id: 7, question: 'PDCA 사이클과 안전관리의 관계를 설명하시오.', answer: 'Plan-Do-Check-Action 순환', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: PDCA 사이클과 안전관리의 관계를 설명하시오.\n\n1. PDCA 각 단계 설명\n2. 안전관리 적용\n3. 지속적 개선 방법\n4. 실제 적용 사례' },
        { id: 8, question: '사업주의 안전보건 의무를 5가지 이상 설명하시오.', answer: '안전보건조치, 위험성평가 실시 등', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 사업주의 안전보건 의무를 5가지 이상 설명하시오.\n\n1. 법적 의무사항\n2. 위반 시 제재\n3. 도급사업 시 추가 의무\n4. 이행 확인 방법' },
        { id: 9, question: '관리감독자의 업무를 설명하시오.', answer: '작업장 순회점검, 근로자 지휘·감독', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 관리감독자의 업무를 설명하시오.\n\n1. 관리감독자 정의\n2. 법적 업무 내용\n3. 지정 대상\n4. 교육 요건' },
        { id: 10, question: '안전관리 체계에서 3E와 4M을 설명하시오.', answer: '3E: 교육·기술·관리, 4M: 인간·기계·매체·관리', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전관리 체계에서 3E와 4M을 설명하시오.\n\n1. 3E(Education, Engineering, Enforcement)\n2. 4M(Man, Machine, Media, Management)\n3. 상호 연관성\n4. 실무 적용 방법' },
      ],
    },
    {
      title: '재해예방 이론',
      questions: [
        { id: 11, question: '하인리히의 도미노 이론 5단계를 설명하시오.', answer: '사회적환경→개인적결함→불안전행동·상태→사고→재해', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 하인리히의 도미노 이론 5단계를 설명하시오.\n\n1. 5단계 내용\n2. 각 단계의 의미\n3. 재해예방 적용점\n4. 이론의 한계와 발전' },
        { id: 12, question: '하인리히의 1:29:300 법칙을 설명하시오.', answer: '중상해 1건에 경상해 29건, 무상해 사고 300건', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 하인리히의 1:29:300 법칙을 설명하시오.\n\n1. 법칙의 의미\n2. 통계적 근거\n3. 예방관리 시사점\n4. 현대적 해석' },
        { id: 13, question: '버드(Bird)의 수정 도미노 이론을 설명하시오.', answer: '관리통제부족→기본원인→직접원인→사고→상해', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 버드의 수정 도미노 이론을 설명하시오.\n\n1. 5단계 구성\n2. 하인리히 이론과의 차이\n3. 관리통제의 중요성\n4. 실무 적용' },
        { id: 14, question: '재해손실비용 계산에서 직접비와 간접비의 비율은?', answer: '직접비:간접비 = 1:4 (하인리히)', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 재해손실비용에서 직접비와 간접비의 비율을 설명하시오.\n\n1. 직접비 항목\n2. 간접비 항목\n3. 1:4 법칙\n4. 현대적 계산법' },
        { id: 15, question: '불안전행동과 불안전상태의 정의와 예시를 각각 3가지 이상 드시오.', answer: '행동: 보호구 미착용 / 상태: 방호장치 결함', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 불안전행동과 불안전상태의 정의와 예시를 드시오.\n\n1. 불안전행동의 정의와 예시\n2. 불안전상태의 정의와 예시\n3. 구분의 중요성\n4. 개선 방법' },
        { id: 16, question: '재해빈도율(도수율)의 계산공식과 의미를 설명하시오.', answer: '(재해건수÷연근로시간수)×1,000,000', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 재해빈도율의 계산공식과 의미를 설명하시오.\n\n1. 계산공식\n2. 연근로시간수 산정\n3. 해석 방법\n4. 관리 기준' },
        { id: 17, question: '재해강도율의 계산공식과 의미를 설명하시오.', answer: '(근로손실일수÷연근로시간수)×1,000', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 재해강도율의 계산공식과 의미를 설명하시오.\n\n1. 계산공식\n2. 근로손실일수 산정\n3. 해석 방법\n4. 도수율과의 관계' },
        { id: 18, question: '연천인율의 계산공식과 의미를 설명하시오.', answer: '(재해자수÷상시근로자수)×1,000', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 연천인율의 계산공식과 의미를 설명하시오.\n\n1. 계산공식\n2. 상시근로자수 산정\n3. 활용 방법\n4. 업종별 비교' },
        { id: 19, question: '중대재해의 정의와 종류를 설명하시오.', answer: '사망 1인 이상, 3개월 이상 부상자 2인 이상 등', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 중대재해의 정의와 종류를 설명하시오.\n\n1. 법적 정의\n2. 중대재해 유형\n3. 발생 시 조치사항\n4. 보고 의무' },
        { id: 20, question: '재해조사의 목적과 절차를 설명하시오.', answer: '재발방지 대책 수립을 위한 원인 규명', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 재해조사의 목적과 절차를 설명하시오.\n\n1. 재해조사의 목적\n2. 조사 절차\n3. 조사 방법\n4. 조사 보고서 작성' },
      ],
    },
    {
      title: '위험성평가',
      questions: [
        { id: 21, question: '위험성평가의 정의와 법적 근거를 설명하시오.', answer: '유해위험요인을 파악하고 위험성을 결정하여 감소대책 수립', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 위험성평가의 정의와 법적 근거를 설명하시오.\n\n1. 법적 정의\n2. 관련 법규\n3. 실시 의무\n4. 미실시 시 제재' },
        { id: 22, question: '위험성평가의 4단계 절차를 설명하시오.', answer: '유해위험요인 파악→위험성 결정→감소대책 수립→기록', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 위험성평가의 4단계 절차를 설명하시오.\n\n1. 1단계: 유해위험요인 파악\n2. 2단계: 위험성 결정\n3. 3단계: 감소대책 수립\n4. 4단계: 기록 및 보존' },
        { id: 23, question: '위험성 결정 방법 중 빈도-강도법을 설명하시오.', answer: '발생가능성×부상중대성 = 위험성', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 빈도-강도법을 설명하시오.\n\n1. 계산 방법\n2. 빈도 등급 기준\n3. 강도 등급 기준\n4. 위험성 판정' },
        { id: 24, question: '위험성 감소대책 수립 시 우선순위(위험성 감소 조치)를 설명하시오.', answer: '제거→대체→공학적→관리적→보호구', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 위험성 감소대책 수립 시 우선순위를 설명하시오.\n\n1. 제거(Elimination)\n2. 대체(Substitution)\n3. 공학적 대책(Engineering)\n4. 관리적 대책(Administrative)\n5. 개인보호구(PPE)' },
        { id: 25, question: '위험성평가 실시 시기를 설명하시오.', answer: '최초평가, 수시평가, 정기평가', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 위험성평가 실시 시기를 설명하시오.\n\n1. 최초평가 시기\n2. 수시평가 대상\n3. 정기평가 주기\n4. 건설현장 적용' },
        { id: 26, question: 'HAZOP 기법을 설명하시오.', answer: '공정변수의 이탈을 가이드워드로 분석', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: HAZOP 기법을 설명하시오.\n\n1. HAZOP의 정의\n2. 가이드워드(Guide Words)\n3. 분석 절차\n4. 적용 분야' },
        { id: 27, question: 'FMEA 기법을 설명하시오.', answer: '고장모드와 영향분석', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: FMEA 기법을 설명하시오.\n\n1. FMEA의 정의\n2. 분석 절차\n3. RPN(위험우선순위) 산출\n4. 적용 사례' },
        { id: 28, question: 'FTA(결함수목분석) 기법을 설명하시오.', answer: '정상사상에서 하향식으로 원인 분석', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: FTA 기법을 설명하시오.\n\n1. FTA의 정의\n2. 사용되는 기호\n3. 분석 절차\n4. 적용 사례' },
        { id: 29, question: 'ETA(사건수목분석) 기법을 설명하시오.', answer: '초기사상에서 상향식으로 결과 분석', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: ETA 기법을 설명하시오.\n\n1. ETA의 정의\n2. FTA와의 차이\n3. 분석 절차\n4. 적용 사례' },
        { id: 30, question: '체크리스트법과 What-if 분석의 차이를 설명하시오.', answer: '체크리스트는 정형화, What-if는 비정형화 분석', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 체크리스트법과 What-if 분석의 차이를 설명하시오.\n\n1. 체크리스트법\n2. What-if 분석\n3. 장단점 비교\n4. 적용 상황' },
      ],
    },
    {
      title: '안전점검과 진단',
      questions: [
        { id: 31, question: '안전점검의 종류(정기·수시·특별점검)를 설명하시오.', answer: '주기와 대상에 따른 구분', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전점검의 종류를 설명하시오.\n\n1. 정기점검\n2. 수시점검\n3. 특별점검\n4. 점검 항목과 방법' },
        { id: 32, question: '작업 전 점검과 작업 중 점검의 차이를 설명하시오.', answer: '사전예방 vs 실시간 모니터링', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 작업 전 점검과 작업 중 점검의 차이를 설명하시오.\n\n1. 작업 전 점검 항목\n2. 작업 중 점검 항목\n3. 점검자 역할\n4. 이상 발견 시 조치' },
        { id: 33, question: '안전진단의 정의와 실시 대상을 설명하시오.', answer: '전문기관에 의한 심층 안전성 평가', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전진단의 정의와 실시 대상을 설명하시오.\n\n1. 안전진단의 정의\n2. 실시 대상\n3. 진단 기관\n4. 진단 결과 조치' },
        { id: 34, question: '안전순찰의 목적과 방법을 설명하시오.', answer: '현장 위험요인 발견과 즉시 시정', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전순찰의 목적과 방법을 설명하시오.\n\n1. 안전순찰의 목적\n2. 순찰 방법\n3. 순찰 주기\n4. 발견사항 처리' },
        { id: 35, question: '안전관찰(BBS: Behavior Based Safety)을 설명하시오.', answer: '행동기반 안전관리', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: BBS(행동기반안전)를 설명하시오.\n\n1. BBS의 정의\n2. 실시 방법\n3. 효과\n4. 건설현장 적용' },
        { id: 36, question: '안전회의(TBM)의 목적과 진행방법을 설명하시오.', answer: 'Tool Box Meeting, 작업 전 안전교육', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: TBM의 목적과 진행방법을 설명하시오.\n\n1. TBM의 정의\n2. 진행 시기\n3. 진행 방법\n4. 효과적인 TBM 운영' },
        { id: 37, question: '위험예지훈련(KYT)의 4단계를 설명하시오.', answer: '현상파악→본질추구→대책수립→목표설정', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 위험예지훈련의 4단계를 설명하시오.\n\n1. 1단계: 현상파악\n2. 2단계: 본질추구\n3. 3단계: 대책수립\n4. 4단계: 목표설정' },
        { id: 38, question: '지적확인의 정의와 효과를 설명하시오.', answer: '손가락 지적과 음성 확인 병행', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 지적확인의 정의와 효과를 설명하시오.\n\n1. 지적확인의 정의\n2. 실시 방법\n3. 효과\n4. 적용 사례' },
        { id: 39, question: '작업허가제(PTW)의 적용 대상과 절차를 설명하시오.', answer: 'Permit To Work, 고위험작업 사전승인', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 작업허가제의 적용 대상과 절차를 설명하시오.\n\n1. 적용 대상 작업\n2. 허가 절차\n3. 허가서 내용\n4. 관리 방법' },
        { id: 40, question: 'LOTO(잠금/표시) 절차를 설명하시오.', answer: 'Lockout/Tagout, 에너지원 차단 확인', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: LOTO 절차를 설명하시오.\n\n1. LOTO의 정의\n2. 적용 대상\n3. 실시 절차\n4. 해제 절차' },
      ],
    },
    {
      title: '안전관리 시스템과 교육',
      questions: [
        { id: 41, question: 'KOSHA-MS의 정의와 구성요소를 설명하시오.', answer: '안전보건경영시스템, PDCA 기반', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: KOSHA-MS의 정의와 구성요소를 설명하시오.\n\n1. KOSHA-MS 정의\n2. 구성요소\n3. 인증 절차\n4. 효과' },
        { id: 42, question: 'ISO 45001과 KOSHA-MS의 차이를 설명하시오.', answer: '국제표준 vs 국내표준', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: ISO 45001과 KOSHA-MS의 차이를 설명하시오.\n\n1. ISO 45001 개요\n2. KOSHA-MS 개요\n3. 주요 차이점\n4. 선택 기준' },
        { id: 43, question: '무재해운동의 3원칙을 설명하시오.', answer: '무결점·선취·참여', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 무재해운동의 3원칙을 설명하시오.\n\n1. 무결점의 원칙\n2. 선취의 원칙\n3. 참여의 원칙\n4. 운동 추진 방법' },
        { id: 44, question: '안전보건교육의 종류와 시간을 설명하시오.', answer: '정기·채용 시·작업내용변경 시·특별교육', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전보건교육의 종류와 시간을 설명하시오.\n\n1. 정기교육\n2. 채용 시 교육\n3. 작업내용변경 시 교육\n4. 특별교육' },
        { id: 45, question: '특별안전보건교육 대상 작업을 5가지 이상 나열하시오.', answer: '밀폐공간, 고소작업, 유해물질취급 등', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 특별안전보건교육 대상 작업을 5가지 이상 나열하시오.\n\n1. 특별교육 대상 작업\n2. 교육 시간\n3. 교육 내용\n4. 미실시 시 제재' },
        { id: 46, question: '휴먼에러의 유형과 예방대책을 설명하시오.', answer: '실수·착오·위반, 기술적·관리적 대책', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 휴먼에러의 유형과 예방대책을 설명하시오.\n\n1. 휴먼에러의 정의\n2. 유형 분류\n3. 발생 원인\n4. 예방대책' },
        { id: 47, question: '5S 활동의 내용과 안전관리 효과를 설명하시오.', answer: '정리·정돈·청소·청결·습관화', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 5S 활동의 내용과 안전관리 효과를 설명하시오.\n\n1. 5S의 정의\n2. 각 항목 내용\n3. 추진 방법\n4. 안전관리 효과' },
        { id: 48, question: '안전문화의 정의와 수준 향상 방안을 설명하시오.', answer: '조직구성원의 안전에 대한 공유된 가치관', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전문화의 정의와 수준 향상 방안을 설명하시오.\n\n1. 안전문화의 정의\n2. 안전문화 수준\n3. 향상 방안\n4. 평가 방법' },
        { id: 49, question: '보호구의 종류와 지급기준을 설명하시오.', answer: '안전모, 안전화, 안전대 등', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 보호구의 종류와 지급기준을 설명하시오.\n\n1. 보호구의 종류\n2. 지급 대상\n3. 지급 기준\n4. 관리 방법' },
        { id: 50, question: '안전표지의 종류와 설치기준을 설명하시오.', answer: '금지·경고·지시·안내 표지', prompt: '건설안전기사 안전관리론 문제입니다.\n\n문제: 안전표지의 종류와 설치기준을 설명하시오.\n\n1. 안전표지의 종류\n2. 색상별 의미\n3. 설치 기준\n4. 관리 방법' },
      ],
    },
  ];

  const progress = Math.round((completedQuestions.size / 50) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/category/construction/construction-safety" className="flex items-center gap-2 text-amber-600">
            <span>←</span><span className="font-medium">건설안전기사</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">{completedQuestions.size}/50 완료</div>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-amber-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-amber-500">🛡️</span> 안전관리론
          </h1>
          <p className="text-gray-500 mt-1">건설안전기사 필기 1과목 (50문항)</p>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => {
                  const newOpen = new Set(openTopics);
                  if (newOpen.has(topicIdx)) newOpen.delete(topicIdx);
                  else newOpen.add(topicIdx);
                  setOpenTopics(newOpen);
                }}
                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 text-white"
              >
                <span className="font-bold">{topic.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-amber-100">
                    {topic.questions.filter(q => completedQuestions.has(q.id)).length}/{topic.questions.length}
                  </span>
                  <span>{openTopics.has(topicIdx) ? '▼' : '▶'}</span>
                </div>
              </button>
              {openTopics.has(topicIdx) && (
                <div className="divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            completedQuestions.has(q.id)
                              ? 'bg-amber-500 border-amber-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-amber-600 mt-1">💡 {q.answer}</p>
                          <button
                            onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="mt-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm hover:bg-amber-200 transition"
                          >
                            🤖 AI에게 질문
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

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
