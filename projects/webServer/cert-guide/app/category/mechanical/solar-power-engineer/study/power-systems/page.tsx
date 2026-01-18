'use client';

import { useState, useEffect } from 'react';

export default function PowerSystemsStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const subject = {
    name: '전력계통 및 전기설비',
    icon: '⚡',
    color: 'orange',
    description: '계통연계, 인버터, 전력변환, 보호장치 등 태양광 발전의 전력 시스템',
  };

  const topics = [
    {
      id: 1,
      name: '계통연계 시스템',
      questions: [
        { id: 1, question: '계통연계형 태양광 시스템의 구성 요소를 설명하시오.', answer: 'PV 어레이, 접속함, 인버터, 수배전반, 전력량계, 보호장치', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 계통연계형 태양광 시스템의 구성 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 구성요소\n2. 각 요소의 기능\n3. 연결 순서\n4. 단선결선도\n5. 예상 문제 3개' },
        { id: 2, question: '독립형과 계통연계형 시스템의 차이점을 비교하시오.', answer: '독립형: 배터리 필수, 소규모 / 계통연계형: 전력망 연결, 대규모, 역전송 가능', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 독립형과 계통연계형 시스템의 차이점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템 구성 차이\n2. 장단점 비교\n3. 적용 분야\n4. 경제성 비교\n5. 예상 문제 3개' },
        { id: 3, question: '계통연계 기술기준에서 정한 전압 및 주파수 허용범위를 설명하시오.', answer: '전압: 정격의 85-110%, 주파수: 59.8-60.2Hz (보통 조건)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 계통연계 기술기준의 전압 및 주파수 허용범위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압 허용범위\n2. 주파수 허용범위\n3. 이상 시 동작\n4. 관련 기준\n5. 예상 문제 3개' },
        { id: 4, question: '단독운전(Islanding) 방지의 필요성과 검출 방법을 설명하시오.', answer: '안전사고 방지 필수, 능동적 방법(주파수 시프트), 수동적 방법(전압/주파수 검출)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 단독운전 방지의 필요성과 검출 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단독운전 정의\n2. 위험성\n3. 검출 방법\n4. 방지 대책\n5. 예상 문제 3개' },
        { id: 5, question: '계통연계 시 역률 기준과 무효전력 제어를 설명하시오.', answer: '역률 0.9 이상 유지, 무효전력 제어로 전압 안정화 기여', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 계통연계 시 역률 기준과 무효전력 제어를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역률 기준\n2. 무효전력 개념\n3. 제어 방법\n4. 전력품질 영향\n5. 예상 문제 3개' },
        { id: 6, question: '저압/고압 계통연계의 차이점과 연계 조건을 설명하시오.', answer: '저압: 380V 이하, 100kW 미만 / 고압: 22.9kV, 대용량, 보호협조 필요', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 저압/고압 계통연계의 차이점과 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 연계 전압 기준\n2. 용량 기준\n3. 설비 구성 차이\n4. 인허가 절차\n5. 예상 문제 3개' },
        { id: 7, question: '계통연계 시 고조파 허용 기준을 설명하시오.', answer: 'THD 5% 이하, 각 차수별 개별 기준 준수 (3차: 4%, 5차: 4%...)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 계통연계 시 고조파 허용 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고조파 정의\n2. THD 기준\n3. 차수별 기준\n4. 저감 대책\n5. 예상 문제 3개' },
        { id: 8, question: 'FRT(Fault Ride Through) 기능의 필요성을 설명하시오.', answer: '계통 이상 시 즉시 분리 대신 일정시간 운전 유지, 대규모 발전소에 필수', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: FRT 기능의 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FRT 정의\n2. 필요성\n3. 동작 조건\n4. LVRT/HVRT\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 2,
      name: '인버터 기술',
      questions: [
        { id: 9, question: '태양광용 인버터의 종류(중앙집중형, 스트링형, 마이크로)를 비교하시오.', answer: '중앙집중형: 대용량/저가, 스트링형: 유연성, 마이크로: 모듈별 MPPT', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광용 인버터의 종류를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 중앙집중형 특징\n2. 스트링형 특징\n3. 마이크로인버터 특징\n4. 적용 분야\n5. 예상 문제 3개' },
        { id: 10, question: 'MPPT(Maximum Power Point Tracking)의 동작 원리를 설명하시오.', answer: 'I-V 곡선에서 최대출력점 추적, P&O/IC 알고리즘 사용', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: MPPT의 동작 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MPPT 필요성\n2. 동작 원리\n3. 알고리즘 종류\n4. 효율 비교\n5. 예상 문제 3개' },
        { id: 11, question: 'P&O(Perturb and Observe) 알고리즘을 설명하시오.', answer: '전압 변화 후 출력 비교, 증가면 같은 방향, 감소면 반대 방향 조정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: P&O 알고리즘을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동작 순서\n2. 장단점\n3. 플로우차트\n4. IC 방식과 비교\n5. 예상 문제 3개' },
        { id: 12, question: '인버터의 유럽/CEC 효율의 의미를 설명하시오.', answer: '가중평균 효율, 유럽효율: 저일사 가중, CEC효율: 미국 조건 가중', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터의 유럽/CEC 효율의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효율 정의\n2. 계산 방법\n3. 가중치 차이\n4. 실무 적용\n5. 예상 문제 3개' },
        { id: 13, question: '인버터의 DC/AC 변환 과정을 설명하시오.', answer: 'DC → 승압(옵션) → DC-AC 변환(PWM) → 필터 → AC 출력', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터의 DC/AC 변환 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 변환 단계\n2. PWM 제어\n3. 필터 역할\n4. 효율 영향 요소\n5. 예상 문제 3개' },
        { id: 14, question: '트랜스리스(Transformerless) 인버터의 특징과 주의사항을 설명하시오.', answer: '고효율, 경량, 저가 / 누설전류 발생, 접지 방식 제한', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 트랜스리스 인버터의 특징과 주의사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조적 특징\n2. 장점\n3. 누설전류 문제\n4. 적용 시 고려사항\n5. 예상 문제 3개' },
        { id: 15, question: '멀티스트링 인버터의 장점을 설명하시오.', answer: '여러 MPPT 입력, 방위/경사 다른 어레이 연결 가능, 부분 음영 대응', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 멀티스트링 인버터의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조적 특징\n2. MPPT 독립 운영\n3. 적용 사례\n4. 일반 인버터와 비교\n5. 예상 문제 3개' },
        { id: 16, question: '인버터 선정 시 고려해야 할 주요 사양을 나열하시오.', answer: '최대DC전압, MPPT 범위, AC출력용량, 효율, 보호기능, 통신기능', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터 선정 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압/전류 사양\n2. 효율 관련\n3. 보호 기능\n4. 선정 절차\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 3,
      name: '전력변환 및 전력품질',
      questions: [
        { id: 17, question: 'DC-DC 컨버터(승압/강압)의 역할과 종류를 설명하시오.', answer: 'MPPT 전압 조정, Buck(강압), Boost(승압), Buck-Boost 방식', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: DC-DC 컨버터의 역할과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 컨버터 필요성\n2. 종류별 원리\n3. 효율 특성\n4. 적용 사례\n5. 예상 문제 3개' },
        { id: 18, question: '고조파가 전력계통에 미치는 영향을 설명하시오.', answer: '변압기 과열, 전력손실 증가, 역률 저하, 계전기 오동작', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 고조파가 전력계통에 미치는 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고조파 발생원\n2. 영향 종류\n3. 피해 사례\n4. 저감 대책\n5. 예상 문제 3개' },
        { id: 19, question: 'THD(Total Harmonic Distortion)의 정의와 계산법을 설명하시오.', answer: 'THD = √(V2²+V3²+...)/V1 × 100%, 전고조파왜율', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: THD의 정의와 계산법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. THD 정의\n2. 계산 공식\n3. 허용 기준\n4. 측정 방법\n5. 예상 문제 3개' },
        { id: 20, question: '역률 개선의 필요성과 방법을 설명하시오.', answer: '전력손실 감소, 설비용량 확보, 진상콘덴서/인버터 무효전력 제어', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 역률 개선의 필요성과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역률 개념\n2. 개선 필요성\n3. 개선 방법\n4. 경제성\n5. 예상 문제 3개' },
        { id: 21, question: '플리커(Flicker) 현상과 저감 대책을 설명하시오.', answer: '전압 변동에 의한 조명 깜박임, 급격한 출력변동 제한, ESS 활용', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 플리커 현상과 저감 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 플리커 정의\n2. 발생 원인\n3. 영향\n4. 저감 대책\n5. 예상 문제 3개' },
        { id: 22, question: 'DC 성분 주입 제한의 필요성을 설명하시오.', answer: '변압기 직류 편자 방지, 0.5% 이하로 제한', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: DC 성분 주입 제한의 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DC 성분 발생 원인\n2. 문제점\n3. 허용 기준\n4. 방지 대책\n5. 예상 문제 3개' },
        { id: 23, question: '출력변동률(Ramp Rate) 제한의 의미를 설명하시오.', answer: '급격한 출력 변화 제한, 분당 10% 이하 권장, 계통 안정성 확보', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 출력변동률 제한의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Ramp Rate 정의\n2. 제한 필요성\n3. 기준값\n4. 제어 방법\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 4,
      name: '보호장치 및 안전설비',
      questions: [
        { id: 24, question: '태양광 시스템의 주요 보호장치를 나열하시오.', answer: 'OCPD(과전류보호), 역전류방지퓨즈, SPD, 접지장치, 누전차단기, UVR/OVR', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광 시스템의 주요 보호장치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DC측 보호장치\n2. AC측 보호장치\n3. 각 장치 역할\n4. 선정 기준\n5. 예상 문제 3개' },
        { id: 25, question: 'SPD(Surge Protective Device)의 종류와 선정 방법을 설명하시오.', answer: 'Type 1/2/3, DC/AC별 설치, 정격전압과 방전전류 고려', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: SPD의 종류와 선정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SPD 타입별 특성\n2. 설치 위치\n3. 선정 기준\n4. 조합 방법\n5. 예상 문제 3개' },
        { id: 26, question: 'DC 스위치 및 차단기의 특성과 선정 기준을 설명하시오.', answer: 'DC 전용 제품 필수, 아크 소호 능력, 정격전압/전류 여유율', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: DC 스위치 및 차단기의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DC 차단의 어려움\n2. 선정 기준\n3. AC와의 차이\n4. 안전 사용\n5. 예상 문제 3개' },
        { id: 27, question: '역전류 방지용 퓨즈의 선정 기준을 설명하시오.', answer: '정격전류: 1.5×Isc 이상, 정격전압: 시스템 최대전압 이상', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 역전류 방지용 퓨즈의 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역전류 발생 조건\n2. 퓨즈 선정 공식\n3. 설치 위치\n4. 주의사항\n5. 예상 문제 3개' },
        { id: 28, question: '접지 시스템(TN, TT, IT)의 차이를 설명하시오.', answer: 'TN: 계통접지+설비접지 공용, TT: 별도접지, IT: 비접지/고저항접지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접지 시스템(TN, TT, IT)의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 방식 정의\n2. 장단점 비교\n3. 적용 조건\n4. 태양광 적용\n5. 예상 문제 3개' },
        { id: 29, question: 'GFDI(Ground Fault Detection and Interruption)의 역할을 설명하시오.', answer: 'DC측 지락 검출 및 차단, 화재 방지 목적, 비접지 시스템에 적용', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: GFDI의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. GFDI 정의\n2. 동작 원리\n3. 설치 조건\n4. 중요성\n5. 예상 문제 3개' },
        { id: 30, question: '인버터의 보호 기능들을 나열하시오.', answer: 'OVR/UVR, OFR/UFR, 단독운전방지, 과온보호, 과전류보호, 지락보호', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터의 보호 기능들을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압 관련 보호\n2. 주파수 관련 보호\n3. 기타 보호 기능\n4. 설정값\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 5,
      name: 'ESS 및 하이브리드 시스템',
      questions: [
        { id: 31, question: 'ESS(에너지저장장치)의 구성 요소를 설명하시오.', answer: '배터리, PCS(전력변환장치), BMS, EMS, 냉각시스템', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: ESS의 구성 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 구성요소\n2. 각 요소 역할\n3. 시스템 구성도\n4. 용량 산정\n5. 예상 문제 3개' },
        { id: 32, question: 'PCS(Power Conditioning System)의 역할을 설명하시오.', answer: '양방향 전력변환(충전/방전), DC-AC/AC-DC 변환, 계통연계 제어', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: PCS의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PCS 정의\n2. 동작 모드\n3. 인버터와 차이\n4. 효율 특성\n5. 예상 문제 3개' },
        { id: 33, question: 'BMS(Battery Management System)의 기능을 설명하시오.', answer: '셀 밸런싱, SOC/SOH 관리, 과충전/과방전 보호, 온도관리', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: BMS의 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BMS 역할\n2. 주요 기능\n3. 안전 기능\n4. 통신 인터페이스\n5. 예상 문제 3개' },
        { id: 34, question: '리튬이온 배터리의 종류와 특성을 비교하시오.', answer: 'LFP(안전성), NCM/NCA(고에너지밀도), LTO(수명)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 리튬이온 배터리의 종류와 특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 종류별 특성\n2. 장단점 비교\n3. 적용 분야\n4. 안전성 비교\n5. 예상 문제 3개' },
        { id: 35, question: 'SOC(State of Charge)와 SOH(State of Health)의 의미를 설명하시오.', answer: 'SOC: 현재 충전상태(%), SOH: 배터리 노화 상태(%)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: SOC와 SOH의 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SOC 정의\n2. SOH 정의\n3. 측정 방법\n4. 관리 중요성\n5. 예상 문제 3개' },
        { id: 36, question: '태양광+ESS 연계 시스템의 운영 모드를 설명하시오.', answer: '자가소비 최대화, 피크저감, 시간대별 전력거래, 비상전원', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광+ESS 연계 시스템의 운영 모드를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 운영 모드 종류\n2. 각 모드 특징\n3. 경제성 분석\n4. 제어 전략\n5. 예상 문제 3개' },
        { id: 37, question: 'ESS 화재 원인과 안전대책을 설명하시오.', answer: '열폭주, 과충전, 내부단락 / 온도관리, 이격거리, 소화설비, 모니터링', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: ESS 화재 원인과 안전대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화재 원인\n2. 열폭주 메커니즘\n3. 안전 대책\n4. 관련 기준\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 6,
      name: '수배전 설비',
      questions: [
        { id: 38, question: '태양광 발전소의 수배전반 구성을 설명하시오.', answer: '인입반, 배전반, ACB/VCB, 계량기, 보호계전기', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광 발전소의 수배전반 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성요소\n2. 각 요소 역할\n3. 단선결선도\n4. 선정 기준\n5. 예상 문제 3개' },
        { id: 39, question: '접속함(Junction Box)의 역할과 구성을 설명하시오.', answer: '스트링 병렬연결, 역전류방지퓨즈, 서지보호기, 모니터링 센서', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접속함의 역할과 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접속함 역할\n2. 내부 구성\n3. 설치 위치\n4. 선정 기준\n5. 예상 문제 3개' },
        { id: 40, question: '변압기 용량 선정 방법을 설명하시오.', answer: '인버터 총용량 × 1.1~1.2, 역률, 효율, 여유율 고려', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 변압기 용량 선정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용량 계산 공식\n2. 고려 요소\n3. 손실 특성\n4. 선정 예제\n5. 예상 문제 3개' },
        { id: 41, question: '전력량계의 종류와 계량 방식을 설명하시오.', answer: '양방향계량, 단방향계량, 스마트미터, 정역전력량계', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전력량계의 종류와 계량 방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계량기 종류\n2. 계량 방식\n3. 정확도 등급\n4. 설치 위치\n5. 예상 문제 3개' },
        { id: 42, question: '케이블 굵기(단면적) 선정 방법을 설명하시오.', answer: '허용전류, 전압강하, 단락전류 세 조건 만족하는 최소 굵기', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 케이블 굵기 선정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 선정 조건\n2. 계산 공식\n3. 보정계수\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 43, question: '전압강하 계산 공식과 허용 기준을 설명하시오.', answer: 'Vd = 2×I×L×ρ/A, DC측 2% 이내, AC측 3% 이내 권장', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전압강하 계산 공식과 허용 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압강하 공식\n2. 허용 기준\n3. 손실 계산\n4. 저감 방안\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 7,
      name: '모니터링 및 통신',
      questions: [
        { id: 44, question: '태양광 모니터링 시스템의 구성과 기능을 설명하시오.', answer: '데이터로거, 센서류, 통신장치, 서버, 웹/앱 인터페이스', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광 모니터링 시스템의 구성과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시스템 구성\n2. 수집 데이터\n3. 분석 기능\n4. 알람 기능\n5. 예상 문제 3개' },
        { id: 45, question: '인버터 통신 프로토콜(Modbus, RS485, Ethernet)을 설명하시오.', answer: 'RS485: 장거리 직렬통신, Modbus: 산업표준 프로토콜, Ethernet: 고속통신', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터 통신 프로토콜을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. RS485 특성\n2. Modbus 프로토콜\n3. Ethernet 적용\n4. 선정 기준\n5. 예상 문제 3개' },
        { id: 46, question: '원격 모니터링의 필요성과 활용 방안을 설명하시오.', answer: '실시간 발전량 확인, 고장 조기 감지, 성능 분석, O&M 효율화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 원격 모니터링의 필요성과 활용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필요성\n2. 수집 항목\n3. 분석 활용\n4. O&M 연계\n5. 예상 문제 3개' },
        { id: 47, question: '스트링 모니터링의 장점을 설명하시오.', answer: '개별 스트링 성능 확인, 음영/고장 조기 발견, 발전손실 최소화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 스트링 모니터링의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 스트링 모니터링 정의\n2. 장점\n3. 시스템 구성\n4. 데이터 활용\n5. 예상 문제 3개' },
        { id: 48, question: '발전소 성능분석에 사용되는 주요 지표를 설명하시오.', answer: 'PR(성능비), Specific Yield, 이용률, 가동률', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 발전소 성능분석에 사용되는 주요 지표를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 지표 정의\n2. 계산 방법\n3. 기준값\n4. 개선 방안\n5. 예상 문제 3개' },
        { id: 49, question: 'SCADA 시스템의 역할을 설명하시오.', answer: '대규모 발전소 통합 감시제어, 데이터 수집/저장/분석, 원격 제어', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: SCADA 시스템의 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SCADA 정의\n2. 주요 기능\n3. 구성 요소\n4. 적용 규모\n5. 예상 문제 3개' },
        { id: 50, question: 'O&M(운영유지보수) 데이터 관리의 중요성을 설명하시오.', answer: '고장이력 분석, 예방정비 계획, 성능저하 추적, 보증 클레임', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: O&M 데이터 관리의 중요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수집 데이터 종류\n2. 분석 활용\n3. 예방정비 연계\n4. 보고서 작성\n5. 예상 문제 3개' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('solar-power-systems-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('solar-power-systems-completed', JSON.stringify(updated));
  };

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/solar-power-engineer" className="text-gray-600 hover:text-orange-600">태양광발전설비기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">{subject.name}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{subject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{subject.name}</h1>
              <p className="text-orange-100">{subject.description}</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>진행률</span>
              <span>{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, tIdx) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setExpandedTopics(expandedTopics.includes(tIdx) ? expandedTopics.filter((t) => t !== tIdx) : [...expandedTopics, tIdx])}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-orange-100 text-orange-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">{tIdx + 1}</span>
                  <span className="font-bold text-gray-800">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.questions.length}문항)</span>
                </div>
                <span className={`transform transition ${expandedTopics.includes(tIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedTopics.includes(tIdx) && (
                <div className="px-6 pb-6 space-y-3">
                  {topic.questions.map((q) => (
                    <div key={q.id} className={`border rounded-lg p-4 ${completedQuestions.includes(q.id) ? 'bg-green-50 border-green-300' : 'border-gray-200'}`}>
                      <div className="flex items-start gap-3">
                        <button onClick={() => toggleComplete(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${completedQuestions.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-orange-700 mt-2 bg-orange-50 p-2 rounded">💡 {q.answer}</p>
                          <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition">🤖 AI에게 질문</button>
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

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
