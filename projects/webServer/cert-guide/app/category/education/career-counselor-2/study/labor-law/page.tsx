'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState } from 'react';

export default function LaborLawStudyPage() {
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
      title: '근로기준법 총칙',
      questions: [
        { id: 1, question: '근로기준법의 목적과 적용범위를 설명하시오.', answer: '근로조건의 기준 정립, 상시 5인 이상 사업장 적용', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로기준법의 목적과 적용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 적용 대상\n3. 적용 제외\n4. 상시 근로자 수 산정\n5. 연습문제 3개' },
        { id: 2, question: '근로자와 사용자의 법적 정의를 설명하시오.', answer: '근로자: 임금 목적 근로 제공자 / 사용자: 사업주, 경영담당자', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로자와 사용자의 법적 정의를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근로자의 정의\n2. 사용자의 정의\n3. 근로자성 판단기준\n4. 특수고용형태근로자\n5. 연습문제 3개' },
        { id: 3, question: '균등처우 원칙과 차별금지를 설명하시오.', answer: '성별, 국적, 사회적 신분에 의한 차별 금지', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 균등처우 원칙과 차별금지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 균등처우의 원칙\n2. 차별금지 사유\n3. 위반 시 제재\n4. 관련 판례\n5. 연습문제 3개' },
        { id: 4, question: '강제근로의 금지와 폭행의 금지를 설명하시오.', answer: '정신상·신체상 자유를 부당하게 구속 금지', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 강제근로의 금지와 폭행의 금지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 강제근로 금지 내용\n2. 폭행 금지 내용\n3. 위반 시 벌칙\n4. 관련 사례\n5. 연습문제 3개' },
        { id: 5, question: '중간착취의 배제를 설명하시오.', answer: '누구든지 타인의 취업에 개입하여 이익을 취득 금지', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 중간착취의 배제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중간착취의 정의\n2. 금지 내용\n3. 예외 사항\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 6, question: '공민권 행사의 보장을 설명하시오.', answer: '근로시간 중 공민권 행사에 필요한 시간 청구권', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 공민권 행사의 보장을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공민권의 범위\n2. 보장 내용\n3. 사용자의 의무\n4. 관련 사례\n5. 연습문제 3개' },
        { id: 7, question: '근로기준법상 연소자와 여성 보호 규정을 설명하시오.', answer: '최저연령, 야간근로 제한, 유해위험 업무 제한', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 연소자와 여성 보호 규정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연소자 근로 제한\n2. 여성 근로 보호\n3. 임산부 보호\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 8, question: '근로기준법의 벌칙 체계를 설명하시오.', answer: '3년 이하 징역 또는 3천만원 이하 벌금 등', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로기준법의 벌칙 체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 벌칙의 종류\n2. 조항별 벌칙\n3. 양벌규정\n4. 과태료\n5. 연습문제 3개' },
      ]
    },
    {
      title: '근로계약과 취업규칙',
      questions: [
        { id: 9, question: '근로계약의 정의와 체결방법을 설명하시오.', answer: '근로자가 근로를 제공하고 사용자가 임금을 지급하는 계약', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로계약의 정의와 체결방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근로계약의 정의\n2. 계약 체결 방식\n3. 필수 기재사항\n4. 서면 명시 의무\n5. 연습문제 3개' },
        { id: 10, question: '근로계약서의 필수 기재사항을 설명하시오.', answer: '임금, 근로시간, 휴일, 연차휴가, 취업장소, 업무내용', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로계약서의 필수 기재사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법정 명시사항\n2. 기재 방법\n3. 위반 시 제재\n4. 계약서 교부\n5. 연습문제 3개' },
        { id: 11, question: '근로기준법에 미달하는 근로조건의 효력을 설명하시오.', answer: '무효, 근로기준법 기준으로 대체', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로기준법에 미달하는 근로조건의 효력을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법률의 강행규정성\n2. 무효의 효과\n3. 대체 효력\n4. 관련 판례\n5. 연습문제 3개' },
        { id: 12, question: '취업규칙의 정의와 작성절차를 설명하시오.', answer: '사업장 근로조건을 정한 규칙, 10인 이상 사업장 의무', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 취업규칙의 정의와 작성절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 취업규칙의 정의\n2. 작성 의무\n3. 필수 기재사항\n4. 신고 절차\n5. 연습문제 3개' },
        { id: 13, question: '취업규칙의 불이익 변경 절차를 설명하시오.', answer: '근로자 과반수 동의 필요', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 취업규칙의 불이익 변경 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 불이익 변경의 의미\n2. 동의 요건\n3. 위반의 효과\n4. 관련 판례\n5. 연습문제 3개' },
        { id: 14, question: '경영상 이유에 의한 해고(정리해고)의 요건을 설명하시오.', answer: '긴박한 경영상 필요, 해고회피 노력, 합리적 기준, 협의', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 정리해고의 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 긴박한 경영상 필요성\n2. 해고회피 노력\n3. 합리적이고 공정한 기준\n4. 노동조합과의 협의\n5. 연습문제 3개' },
        { id: 15, question: '수습기간과 시용기간의 법적 의미를 설명하시오.', answer: '수습: 훈련기간 / 시용: 본채용 전 평가기간', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 수습기간과 시용기간의 법적 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수습기간의 의미\n2. 시용기간의 의미\n3. 차이점\n4. 해고 제한\n5. 연습문제 3개' },
        { id: 16, question: '기간제 근로계약의 사용 제한을 설명하시오.', answer: '2년 초과 사용 시 무기계약 간주', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 기간제 근로계약의 사용 제한을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기간제법의 목적\n2. 사용 기간 제한\n3. 예외 사유\n4. 무기계약 전환\n5. 연습문제 3개' },
      ]
    },
    {
      title: '임금',
      questions: [
        { id: 17, question: '임금의 법적 정의와 종류를 설명하시오.', answer: '근로의 대가로 지급하는 금품, 통상임금·평균임금', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 임금의 법적 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 임금의 정의\n2. 임금성 판단기준\n3. 통상임금\n4. 평균임금\n5. 연습문제 3개' },
        { id: 18, question: '통상임금의 개념과 산정방법을 설명하시오.', answer: '정기적·일률적·고정적으로 지급되는 임금', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 통상임금의 개념과 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통상임금의 정의\n2. 3가지 요건\n3. 산정 방법\n4. 통상임금 항목 예시\n5. 연습문제 3개' },
        { id: 19, question: '평균임금의 개념과 산정방법을 설명하시오.', answer: '산정사유 발생일 이전 3개월간 임금총액/총일수', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 평균임금의 개념과 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평균임금의 정의\n2. 산정 방법\n3. 활용 분야\n4. 산정 제외 기간\n5. 연습문제 3개' },
        { id: 20, question: '임금지급의 4대 원칙을 설명하시오.', answer: '통화불, 직접불, 전액불, 정기불', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 임금지급의 4대 원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통화불 원칙\n2. 직접불 원칙\n3. 전액불 원칙\n4. 정기불 원칙\n5. 연습문제 3개' },
        { id: 21, question: '최저임금제도의 내용을 설명하시오.', answer: '국가가 정한 최저임금 이상 지급 의무', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 최저임금제도의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 최저임금법의 목적\n2. 적용 대상\n3. 최저임금 결정\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 22, question: '휴업수당의 지급 요건을 설명하시오.', answer: '사용자 귀책사유로 휴업 시 평균임금의 70% 이상', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 휴업수당의 지급 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 휴업의 정의\n2. 지급 요건\n3. 지급 수준\n4. 예외 사항\n5. 연습문제 3개' },
        { id: 23, question: '체불임금 구제 절차를 설명하시오.', answer: '고용노동부 진정, 체당금제도, 민사소송', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 체불임금 구제 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 진정 절차\n2. 체당금제도\n3. 임금채권보장법\n4. 법적 구제\n5. 연습문제 3개' },
        { id: 24, question: '퇴직급여제도의 종류를 설명하시오.', answer: '퇴직금제도, 확정급여형(DB), 확정기여형(DC)', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 퇴직급여제도의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 퇴직금제도\n2. 확정급여형(DB)\n3. 확정기여형(DC)\n4. 개인형 퇴직연금(IRP)\n5. 연습문제 3개' },
      ]
    },
    {
      title: '근로시간과 휴식',
      questions: [
        { id: 25, question: '법정 근로시간의 내용을 설명하시오.', answer: '1주 40시간, 1일 8시간', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 법정 근로시간의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법정 근로시간\n2. 산정 방법\n3. 소정 근로시간\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 26, question: '연장근로의 제한과 가산임금을 설명하시오.', answer: '주 12시간 한도, 통상임금의 50% 가산', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 연장근로의 제한과 가산임금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연장근로 한도\n2. 합의 요건\n3. 가산임금\n4. 특별연장근로\n5. 연습문제 3개' },
        { id: 27, question: '야간근로와 휴일근로의 가산임금을 설명하시오.', answer: '야간(22시~06시), 휴일 각 50% 가산, 중복 시 100%', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 야간근로와 휴일근로의 가산임금을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 야간근로 정의\n2. 휴일근로 정의\n3. 가산율\n4. 중복 가산\n5. 연습문제 3개' },
        { id: 28, question: '유연근로시간제의 종류를 설명하시오.', answer: '탄력적, 선택적, 사업장밖, 재량 근로시간제', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 유연근로시간제의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 탄력적 근로시간제\n2. 선택적 근로시간제\n3. 사업장 밖 근로\n4. 재량근로시간제\n5. 연습문제 3개' },
        { id: 29, question: '휴게시간의 부여 기준을 설명하시오.', answer: '4시간 30분, 8시간 1시간 이상', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 휴게시간의 부여 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 휴게시간 정의\n2. 부여 기준\n3. 자유 이용\n4. 위반 시 제재\n5. 연습문제 3개' },
        { id: 30, question: '주휴일의 부여 요건을 설명하시오.', answer: '1주간 소정근로일 개근 시 유급휴일', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 주휴일의 부여 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주휴일 정의\n2. 부여 요건\n3. 주휴수당\n4. 단시간근로자\n5. 연습문제 3개' },
        { id: 31, question: '연차유급휴가의 발생요건과 사용을 설명하시오.', answer: '1년간 80% 이상 출근 시 15일, 2년마다 1일 가산', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 연차유급휴가의 발생요건과 사용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발생 요건\n2. 휴가 일수\n3. 사용 방법\n4. 미사용 수당\n5. 연습문제 3개' },
        { id: 32, question: '연차휴가 사용촉진제도를 설명하시오.', answer: '사용 촉진 시 미사용 연차수당 지급 면제', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 연차휴가 사용촉진제도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제도의 목적\n2. 촉진 절차\n3. 시기 지정\n4. 면제 효과\n5. 연습문제 3개' },
      ]
    },
    {
      title: '해고와 부당해고 구제',
      questions: [
        { id: 33, question: '해고의 정의와 유형을 설명하시오.', answer: '사용자의 일방적 근로관계 종료, 통상해고·징계해고·정리해고', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 해고의 정의와 유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해고의 정의\n2. 해고의 유형\n3. 각 유형별 특징\n4. 해고 제한\n5. 연습문제 3개' },
        { id: 34, question: '해고의 정당한 이유를 설명하시오.', answer: '사회통념상 고용관계를 계속할 수 없는 사유', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 해고의 정당한 이유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정당한 이유의 판단\n2. 근로자 귀책사유\n3. 경영상 이유\n4. 판례 기준\n5. 연습문제 3개' },
        { id: 35, question: '해고의 절차적 요건을 설명하시오.', answer: '서면통지, 30일 전 예고 또는 해고예고수당', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 해고의 절차적 요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 서면통지 의무\n2. 해고예고\n3. 해고예고수당\n4. 예고 예외\n5. 연습문제 3개' },
        { id: 36, question: '해고가 제한되는 기간을 설명하시오.', answer: '업무상 부상·질병 요양기간과 그 후 30일, 산전후휴가 기간', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 해고가 제한되는 기간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 해고제한 기간\n2. 업무상 재해\n3. 산전후휴가\n4. 예외 사유\n5. 연습문제 3개' },
        { id: 37, question: '부당해고 구제 신청 절차를 설명하시오.', answer: '해고일로부터 3개월 내 노동위원회 신청', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 부당해고 구제 신청 절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 신청 자격\n2. 신청 기한\n3. 심판 절차\n4. 구제명령\n5. 연습문제 3개' },
        { id: 38, question: '부당해고 구제명령의 내용을 설명하시오.', answer: '원직복직, 해고기간 임금 상당액 지급, 금전보상', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 부당해고 구제명령의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 원직복직 명령\n2. 임금 상당액\n3. 금전보상제도\n4. 이행강제금\n5. 연습문제 3개' },
        { id: 39, question: '금전보상제도의 내용을 설명하시오.', answer: '복직 대신 금전으로 해결, 6개월분 이상 임금', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 금전보상제도의 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제도의 도입 배경\n2. 신청 요건\n3. 보상 수준\n4. 효과\n5. 연습문제 3개' },
        { id: 40, question: '권고사직과 해고의 구별을 설명하시오.', answer: '권고사직: 합의해지 / 해고: 사용자 일방적 종료', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 권고사직과 해고의 구별을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 권고사직의 정의\n2. 해고와의 차이\n3. 실질적 판단\n4. 관련 판례\n5. 연습문제 3개' },
      ]
    },
    {
      title: '고용보험법과 직업안정법',
      questions: [
        { id: 41, question: '고용보험법의 목적과 적용 대상을 설명하시오.', answer: '실업급여, 고용안정, 직업능력개발 지원', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 고용보험법의 목적과 적용 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 적용 대상\n3. 적용 제외\n4. 피보험자격\n5. 연습문제 3개' },
        { id: 42, question: '구직급여의 수급요건을 설명하시오.', answer: '이직일 이전 18개월간 피보험기간 180일 이상, 비자발적 이직', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 구직급여의 수급요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피보험기간 요건\n2. 이직사유 요건\n3. 수급자격 인정\n4. 급여 수준\n5. 연습문제 3개' },
        { id: 43, question: '실업급여의 종류를 설명하시오.', answer: '구직급여, 취업촉진수당(조기재취업수당, 직업능력개발수당 등)', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 실업급여의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구직급여\n2. 취업촉진수당\n3. 연장급여\n4. 급여 수준\n5. 연습문제 3개' },
        { id: 44, question: '구직급여의 지급 기간을 설명하시오.', answer: '연령, 피보험기간에 따라 120일~270일', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 구직급여의 지급 기간을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소정급여일수\n2. 연령별 기준\n3. 피보험기간별 기준\n4. 수급기간\n5. 연습문제 3개' },
        { id: 45, question: '직업안정법의 목적과 내용을 설명하시오.', answer: '고용서비스 제공, 직업소개사업 규제', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 직업안정법의 목적과 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 주요 내용\n3. 직업소개사업\n4. 금지 행위\n5. 연습문제 3개' },
        { id: 46, question: '유료직업소개사업의 등록요건을 설명하시오.', answer: '자본금, 시설, 인력 요건 충족 시 등록', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 유료직업소개사업의 등록요건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등록 요건\n2. 등록 절차\n3. 결격사유\n4. 수수료 규정\n5. 연습문제 3개' },
        { id: 47, question: '근로자파견법의 주요 내용을 설명하시오.', answer: '파견대상 업무, 파견기간, 직접고용의무', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 근로자파견법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 파견근로의 정의\n2. 파견대상 업무\n3. 파견기간 제한\n4. 직접고용의무\n5. 연습문제 3개' },
        { id: 48, question: '고용정책기본법의 주요 내용을 설명하시오.', answer: '국가 고용정책의 기본방향, 고용정보 제공', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 고용정책기본법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 고용정책 기본방향\n3. 국가의 책무\n4. 고용정보 제공\n5. 연습문제 3개' },
        { id: 49, question: '산업재해보상보험법의 주요 내용을 설명하시오.', answer: '업무상 재해 보상, 요양급여, 휴업급여, 장해급여', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 산업재해보상보험법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 업무상 재해\n3. 보험급여 종류\n4. 급여 수준\n5. 연습문제 3개' },
        { id: 50, question: '남녀고용평등법의 주요 내용을 설명하시오.', answer: '고용차별 금지, 성희롱 금지, 모성보호, 일가정 양립', prompt: '직업상담사 2급 노동관계법규 문제입니다.\n\n문제: 남녀고용평등법의 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 법의 목적\n2. 차별 금지\n3. 성희롱 금지\n4. 육아휴직\n5. 연습문제 3개' },
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
            <span className="text-teal-600 font-medium">노동관계법규</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">⚖️</span>
            <div>
              <h1 className="text-2xl font-bold">노동관계법규</h1>
              <p className="text-teal-100">총 {totalQuestions}문항 | 근로기준법과 고용관계법</p>
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
