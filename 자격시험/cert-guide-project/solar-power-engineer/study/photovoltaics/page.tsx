'use client';

import { useState, useEffect } from 'react';

export default function PhotovoltaicsStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const subject = {
    name: '태양광발전시스템 이론',
    icon: '☀️',
    color: 'yellow',
    description: '태양전지의 원리와 특성, 모듈 구성, 일사량 분석 등 태양광 발전의 기초 이론',
  };

  const topics = [
    {
      id: 1,
      name: '태양전지의 원리와 종류',
      questions: [
        { id: 1, question: '태양전지에서 광기전력 효과(Photovoltaic Effect)의 원리를 설명하시오.', answer: '반도체 pn접합부에 빛이 조사되면 전자-정공 쌍이 생성되어 기전력이 발생하는 현상', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양전지에서 광기전력 효과(Photovoltaic Effect)의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 상세 설명 (pn접합, 전자-정공, 공핍층 등)\n3. 그림으로 설명\n4. 관련 개념 연결\n5. 예상 문제 3개' },
        { id: 2, question: '결정질 실리콘 태양전지의 종류와 각각의 특징을 비교하시오.', answer: '단결정(효율 20% 이상, 고가), 다결정(효율 15-17%, 저가), 박막(효율 낮음, 유연성)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 결정질 실리콘 태양전지의 종류와 각각의 특징을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념 정리\n2. 종류별 상세 비교 (단결정, 다결정, 박막)\n3. 효율, 가격, 적용분야 비교표\n4. 최신 기술 트렌드\n5. 예상 문제 3개' },
        { id: 3, question: '박막(Thin Film) 태양전지의 종류와 장단점을 설명하시오.', answer: 'a-Si, CdTe, CIGS 등이 있으며 유연성, 저가 장점 / 효율 낮음, 열화 단점', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 박막(Thin Film) 태양전지의 종류와 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 박막 태양전지 정의\n2. 종류별 특성 (a-Si, CdTe, CIGS)\n3. 장단점 비교\n4. 적용 분야\n5. 예상 문제 3개' },
        { id: 4, question: '페로브스카이트(Perovskite) 태양전지의 특징과 발전 가능성을 설명하시오.', answer: '저비용 제조, 높은 효율 잠재력, 유연성 가능하나 안정성 문제가 과제', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 페로브스카이트(Perovskite) 태양전지의 특징과 발전 가능성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 페로브스카이트 구조\n2. 특징 및 장점\n3. 현재 기술 수준\n4. 해결해야 할 과제\n5. 예상 문제 3개' },
        { id: 5, question: '이종접합(HJT, Heterojunction) 태양전지의 구조와 장점을 설명하시오.', answer: '결정질 실리콘 위에 비정질 실리콘층 적층, 고효율(25% 이상), 낮은 온도계수', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 이종접합(HJT) 태양전지의 구조와 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. HJT 구조 설명\n2. 제조 공정\n3. 장점 (효율, 온도계수)\n4. 기존 기술과 비교\n5. 예상 문제 3개' },
        { id: 6, question: 'N형과 P형 태양전지의 차이점을 설명하시오.', answer: 'N형: 전자가 다수캐리어, LID/LeTID 적음, 고효율 / P형: 정공이 다수캐리어, 저가', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: N형과 P형 태양전지의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도핑 원리\n2. N형 특징\n3. P형 특징\n4. 효율 및 열화 비교\n5. 예상 문제 3개' },
        { id: 7, question: 'TOPCon 태양전지의 구조와 특성을 설명하시오.', answer: 'Tunnel Oxide Passivated Contact, 산화막+폴리실리콘으로 재결합 손실 최소화, 25% 이상 효율', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: TOPCon 태양전지의 구조와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. TOPCon 정의\n2. 구조 상세\n3. 동작 원리\n4. 장단점\n5. 예상 문제 3개' },
        { id: 8, question: '양면형(Bifacial) 태양전지 모듈의 원리와 장점을 설명하시오.', answer: '전후면 모두 발전, 지면 반사광(알베도) 활용, 발전량 10-30% 증가', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 양면형(Bifacial) 태양전지 모듈의 원리와 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 양면형 모듈 구조\n2. 동작 원리\n3. 알베도 효과\n4. 발전량 증가율 계산\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 2,
      name: 'I-V 특성과 최대출력점',
      questions: [
        { id: 9, question: '태양전지의 I-V 특성곡선에서 주요 파라미터(Voc, Isc, Pmax, FF)를 설명하시오.', answer: 'Voc: 개방전압, Isc: 단락전류, Pmax: 최대출력, FF: 충진율(Pmax/Voc×Isc)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양전지의 I-V 특성곡선에서 주요 파라미터를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. I-V 곡선 그래프 설명\n2. Voc, Isc 정의\n3. Pmax, MPP 설명\n4. Fill Factor 계산\n5. 예상 문제 3개' },
        { id: 10, question: 'MPP(Maximum Power Point)와 MPPT의 원리를 설명하시오.', answer: 'MPP는 I-V 곡선에서 전력이 최대인 점, MPPT는 이 점을 추적하여 최대 효율 유지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: MPP와 MPPT의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MPP 정의와 위치\n2. MPPT 필요성\n3. MPPT 알고리즘 종류\n4. P&O, IC 방식 비교\n5. 예상 문제 3개' },
        { id: 11, question: '충진율(Fill Factor, FF)의 정의와 의미를 설명하시오.', answer: 'FF = Pmax/(Voc × Isc), 태양전지 품질 지표, 일반적으로 0.7-0.85', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 충진율(Fill Factor)의 정의와 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. FF 정의와 공식\n2. FF가 높으면 좋은 이유\n3. FF에 영향을 주는 요인\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 12, question: '태양전지의 직렬저항(Rs)과 병렬저항(Rsh)이 특성에 미치는 영향을 설명하시오.', answer: 'Rs 증가→FF 감소, Isc 영향 / Rsh 감소→FF 감소, Voc 감소', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 직렬저항과 병렬저항이 태양전지 특성에 미치는 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Rs, Rsh 정의\n2. 등가회로 설명\n3. I-V 곡선 변화\n4. 실제 영향 사례\n5. 예상 문제 3개' },
        { id: 13, question: 'STC(Standard Test Conditions) 조건과 NOCT 조건을 비교하시오.', answer: 'STC: 1000W/m², 25℃, AM1.5 / NOCT: 800W/m², 20℃ 환경, 45-48℃ 셀온도', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: STC와 NOCT 조건을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. STC 조건 상세\n2. NOCT 조건 상세\n3. 실제 발전량 차이\n4. 모듈 선정 시 고려사항\n5. 예상 문제 3개' },
        { id: 14, question: 'Air Mass(AM)의 정의와 AM0, AM1, AM1.5의 차이를 설명하시오.', answer: 'AM=1/cosθ, AM0: 대기권 밖, AM1: 수직입사, AM1.5: 지상 표준(48.2°)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: Air Mass의 정의와 AM0, AM1, AM1.5의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Air Mass 정의\n2. 계산 공식\n3. AM별 스펙트럼 차이\n4. 표준 시험조건과의 관계\n5. 예상 문제 3개' },
        { id: 15, question: 'P-V 곡선과 I-V 곡선의 관계를 설명하시오.', answer: 'P=V×I, I-V 곡선의 각 점에서 전력 계산하여 P-V 곡선 도출', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: P-V 곡선과 I-V 곡선의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 두 곡선의 정의\n2. 관계식 유도\n3. MPP 위치 확인\n4. 그래프 해석 방법\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 3,
      name: '일사량과 발전량 분석',
      questions: [
        { id: 16, question: '전일사량(GHI), 직달일사량(DNI), 산란일사량(DHI)의 관계를 설명하시오.', answer: 'GHI = DNI × cos(입사각) + DHI, 전일사=직달+산란', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: GHI, DNI, DHI의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 용어 정의\n2. 관계식\n3. 측정 방법\n4. 발전량 예측 활용\n5. 예상 문제 3개' },
        { id: 17, question: '경사면 일사량(POA) 계산 방법을 설명하시오.', answer: 'POA = 직달성분 + 산란성분 + 반사성분, 경사각과 방위각 고려 필요', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 경사면 일사량(POA) 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. POA 정의\n2. 계산 공식\n3. 경사각, 방위각 영향\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 18, question: '연간 발전량 예측 시 고려해야 할 손실 요인들을 나열하시오.', answer: '온도손실, 오염손실, 음영손실, 배선손실, 인버터손실, 미스매치손실 등', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 연간 발전량 예측 시 손실 요인들을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손실 요인 분류\n2. 각 손실률 범위\n3. 손실 저감 방안\n4. 발전량 계산 예제\n5. 예상 문제 3개' },
        { id: 19, question: '이용률(Capacity Factor)과 설비이용률의 차이를 설명하시오.', answer: '이용률 = 실제발전량/(설비용량×8760h), 국내 태양광 평균 약 14-16%', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 이용률과 설비이용률을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이용률 정의\n2. 계산 공식\n3. 국내외 평균값\n4. 영향 요인\n5. 예상 문제 3개' },
        { id: 20, question: '성능비(Performance Ratio, PR)의 정의와 계산법을 설명하시오.', answer: 'PR = 실제발전량/이론발전량, 시스템 효율 지표, 보통 75-85%', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 성능비(PR)의 정의와 계산법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PR 정의\n2. 계산 공식\n3. 영향 요인\n4. 개선 방안\n5. 예상 문제 3개' },
        { id: 21, question: '피크 일조시간(Peak Sun Hours, PSH)의 개념과 활용을 설명하시오.', answer: '1kW/m² 일사가 지속되는 등가 시간, 발전량 = 용량 × PSH × PR', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 피크 일조시간(PSH)의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PSH 정의\n2. 계산 방법\n3. 지역별 PSH\n4. 발전량 계산 활용\n5. 예상 문제 3개' },
        { id: 22, question: '연간 일사량 데이터 분석에 사용되는 주요 자료원을 설명하시오.', answer: '기상청 자료, NASA SSE, PVGIS, Meteonorm, 한국에너지공단 KIER 자료', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 연간 일사량 데이터 분석 자료원을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 국내 자료원\n2. 해외 자료원\n3. 각 자료의 특성\n4. 활용 시 주의사항\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 4,
      name: '온도특성과 효율',
      questions: [
        { id: 23, question: '태양전지의 온도계수(Temperature Coefficient)를 설명하시오.', answer: 'Pmax 온도계수: -0.3~-0.5%/℃, Voc는 음수, Isc는 양수', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양전지의 온도계수를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온도계수 정의\n2. Pmax, Voc, Isc 각각의 온도계수\n3. 셀 종류별 차이\n4. 실제 출력 계산 예\n5. 예상 문제 3개' },
        { id: 24, question: '셀 온도가 상승할 때 Voc, Isc, Pmax의 변화를 설명하시오.', answer: 'Voc 감소(-0.3%/℃), Isc 약간 증가(+0.05%/℃), Pmax 감소(-0.4%/℃)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 셀 온도 상승 시 전기적 특성 변화를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온도와 전압 관계\n2. 온도와 전류 관계\n3. 출력 변화\n4. I-V 곡선 변화\n5. 예상 문제 3개' },
        { id: 25, question: '모듈 효율과 셀 효율의 차이를 설명하시오.', answer: '셀 효율 > 모듈 효율 (셀 간격, 프레임, 배선 등으로 인한 면적 손실)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈 효율과 셀 효율의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효율 정의\n2. 면적 차이\n3. 효율 차이 원인\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 26, question: 'LID(Light Induced Degradation)와 LeTID 현상을 설명하시오.', answer: 'LID: 초기 광에 의한 출력저하(1-3%), LeTID: 고온에서 장기간 발생하는 열화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: LID와 LeTID 현상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LID 메커니즘\n2. LeTID 메커니즘\n3. 셀 타입별 차이\n4. 방지 대책\n5. 예상 문제 3개' },
        { id: 27, question: 'PID(Potential Induced Degradation) 현상과 방지책을 설명하시오.', answer: '고전압에 의한 성능저하, 접지방식(음극접지), PID-free 모듈 사용으로 방지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: PID 현상과 방지책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. PID 발생 메커니즘\n2. 영향 요인\n3. 방지 대책\n4. 복구 방법\n5. 예상 문제 3개' },
        { id: 28, question: '모듈의 연간 출력 감소율(Degradation Rate)을 설명하시오.', answer: '일반적으로 연 0.5-0.8% 감소, 25년 후 80% 출력 보증', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈의 연간 출력 감소율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열화율 정의\n2. 열화 원인\n3. 제조사 보증 조건\n4. 경제성 분석 반영\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 5,
      name: '모듈 구조와 연결',
      questions: [
        { id: 29, question: '태양광 모듈의 구조(층별 구성)를 설명하시오.', answer: '강화유리-EVA-셀-EVA-백시트 또는 유리-유리 구조', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광 모듈의 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 각 층의 역할\n2. 재료별 특성\n3. 유리-유리 모듈\n4. 품질 기준\n5. 예상 문제 3개' },
        { id: 30, question: '모듈 직렬연결 시 전압과 전류의 관계를 설명하시오.', answer: '직렬: 전압 합산, 전류 동일 (V_total = V1+V2+..., I_total = I)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈 직렬연결 시 전기적 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직렬연결 원리\n2. 전압, 전류 관계\n3. 스트링 구성\n4. 주의사항\n5. 예상 문제 3개' },
        { id: 31, question: '모듈 병렬연결 시 전압과 전류의 관계를 설명하시오.', answer: '병렬: 전류 합산, 전압 동일 (I_total = I1+I2+..., V_total = V)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈 병렬연결 시 전기적 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 병렬연결 원리\n2. 전압, 전류 관계\n3. 퓨즈 선정\n4. 역전류 방지\n5. 예상 문제 3개' },
        { id: 32, question: '미스매치(Mismatch) 손실의 원인과 저감 방안을 설명하시오.', answer: '모듈 특성 차이에 의한 손실, 동일 Lot 모듈 사용, 최적 스트링 구성으로 저감', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 미스매치 손실과 저감 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 미스매치 발생 원인\n2. 손실 메커니즘\n3. 저감 방안\n4. 설계 시 고려사항\n5. 예상 문제 3개' },
        { id: 33, question: '바이패스 다이오드(Bypass Diode)의 역할과 동작원리를 설명하시오.', answer: '부분음영 시 핫스팟 방지, 음영 셀 우회 경로 제공, 보통 20-24셀당 1개', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 바이패스 다이오드의 역할과 동작원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 바이패스 다이오드 위치\n2. 동작 원리\n3. 핫스팟 방지\n4. 다이오드 선정 기준\n5. 예상 문제 3개' },
        { id: 34, question: '블로킹 다이오드(Blocking Diode)의 필요성을 설명하시오.', answer: '병렬 스트링 간 역전류 방지, 야간 역류 방지 목적', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 블로킹 다이오드의 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 역전류 발생 상황\n2. 블로킹 다이오드 역할\n3. 설치 위치\n4. 현재 적용 동향\n5. 예상 문제 3개' },
        { id: 35, question: '핫스팟(Hot Spot) 현상의 원인과 피해를 설명하시오.', answer: '부분 음영 셀이 저항으로 작용해 발열, 셀 손상, 화재 위험', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 핫스팟 현상의 원인과 피해를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발생 메커니즘\n2. 온도 상승 원인\n3. 피해 사례\n4. 예방 대책\n5. 예상 문제 3개' },
        { id: 36, question: 'Half-cut 셀 모듈의 장점을 설명하시오.', answer: '셀 분할로 저항손실 감소, 부분음영 대응력 향상, 발전량 2-3% 증가', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: Half-cut 셀 모듈의 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조적 특징\n2. 전기적 이점\n3. 음영 대응\n4. 일반 모듈과 비교\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 6,
      name: '어레이 설계',
      questions: [
        { id: 37, question: '최적 경사각과 방위각 결정 방법을 설명하시오.', answer: '한국: 경사각 30-35°, 방위각 정남향(180°), 위도와 일사량 분석으로 결정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 최적 경사각과 방위각 결정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경사각 결정 요인\n2. 방위각 영향\n3. 계절별 최적 각도\n4. 연간 발전량 최적화\n5. 예상 문제 3개' },
        { id: 38, question: '어레이 이격거리 산정 방법을 설명하시오.', answer: 'D = H × tan(고도각), 동지 기준 무음영 거리 확보', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 어레이 이격거리 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이격거리 필요성\n2. 산정 공식\n3. 계산 예제\n4. 설계 시 고려사항\n5. 예상 문제 3개' },
        { id: 39, question: '인버터 용량 선정 시 DC/AC 비율(Oversize Ratio)을 설명하시오.', answer: 'DC/AC Ratio = PV용량/인버터용량, 보통 1.1-1.3, 과대하면 클리핑 발생', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: DC/AC 비율(Oversize Ratio)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정의와 필요성\n2. 적정 비율\n3. 클리핑 현상\n4. 경제성 분석\n5. 예상 문제 3개' },
        { id: 40, question: '스트링 구성 시 최대 직렬 모듈 수 산정 방법을 설명하시오.', answer: '최저온도 시 Voc × 모듈수 ≤ 인버터 최대DC전압', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 최대 직렬 모듈 수 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압 제한 조건\n2. 온도 보정\n3. 계산 공식\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 41, question: '스트링 구성 시 최소 직렬 모듈 수 산정 방법을 설명하시오.', answer: '최고온도 시 Vmpp × 모듈수 ≥ 인버터 MPPT 최소전압', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 최소 직렬 모듈 수 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MPPT 동작 조건\n2. 온도 보정\n3. 계산 공식\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 42, question: '음영분석의 중요성과 분석 도구를 설명하시오.', answer: 'PVsyst, HelioScope, Skelion 등으로 3D 음영분석, 발전량 손실 예측', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 음영분석의 중요성과 분석 도구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 음영 영향\n2. 분석 도구 종류\n3. 분석 방법\n4. 결과 활용\n5. 예상 문제 3개' },
        { id: 43, question: '지붕형, 지상형, 수상형 태양광 시스템의 특징을 비교하시오.', answer: '지붕형: 토지비용 절감, 지상형: 대용량 가능, 수상형: 냉각효과로 효율 증가', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 지붕형, 지상형, 수상형 시스템을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 각 유형별 특징\n2. 장단점 비교\n3. 적용 조건\n4. 설계 시 고려사항\n5. 예상 문제 3개' },
        { id: 44, question: 'BIPV(Building Integrated PV)의 개념과 적용 사례를 설명하시오.', answer: '건물 외장재와 일체화된 태양광, 외벽, 창호, 지붕재 등에 적용', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: BIPV의 개념과 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BIPV 정의\n2. 유형별 특성\n3. 적용 사례\n4. 장단점\n5. 예상 문제 3개' },
        { id: 45, question: '추적식(Tracking) 시스템의 종류와 발전량 증가 효과를 설명하시오.', answer: '단축추적: 15-25% 증가, 양축추적: 30-40% 증가, 유지보수비 고려 필요', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 추적식 시스템의 종류와 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 추적 방식 종류\n2. 발전량 증가율\n3. 경제성 분석\n4. 적용 조건\n5. 예상 문제 3개' },
        { id: 46, question: '영농형 태양광의 특징과 설계 시 고려사항을 설명하시오.', answer: '농작물 재배와 발전 병행, 차광률 30% 이하, 이격거리·높이 확보', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 영농형 태양광의 특징과 설계 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영농형 정의\n2. 관련 규정\n3. 설계 조건\n4. 작물별 고려사항\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 7,
      name: '시스템 효율과 성능',
      questions: [
        { id: 47, question: '태양광 발전시스템의 전체 효율 계산 방법을 설명하시오.', answer: '시스템효율 = 모듈효율 × 인버터효율 × (1-각종손실률)', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광 발전시스템의 전체 효율 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 효율 구성 요소\n2. 각 손실 항목\n3. 계산 공식\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 48, question: 'DC-AC 변환 효율에 영향을 미치는 요인을 설명하시오.', answer: '인버터 부하율, 입력전압, 온도, 고조파 등이 영향', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: DC-AC 변환 효율 영향 요인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인버터 효율 특성\n2. 부하율과 효율\n3. 온도 영향\n4. 효율 최적화 방안\n5. 예상 문제 3개' },
        { id: 49, question: '케이블 손실(전압강하) 계산 방법을 설명하시오.', answer: 'Vd = 2×I×L×ρ/A, 일반적으로 2% 이내 유지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 케이블 손실(전압강하) 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전압강하 공식\n2. 허용 전압강하\n3. 케이블 굵기 선정\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 50, question: 'kWh/kWp (Specific Yield)의 의미와 활용을 설명하시오.', answer: '설비용량 1kWp당 연간 발전량, 한국 평균 약 1,100-1,300 kWh/kWp', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: kWh/kWp (Specific Yield)의 의미와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Specific Yield 정의\n2. 지역별 평균값\n3. 발전량 예측 활용\n4. 성능 평가 기준\n5. 예상 문제 3개' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('solar-photovoltaics-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter((q) => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('solar-photovoltaics-completed', JSON.stringify(updated));
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
            <a href="/" className="text-gray-600 hover:text-yellow-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/solar-power-engineer" className="text-gray-600 hover:text-yellow-600">태양광발전설비기사</a>
            <span className="text-gray-300">›</span>
            <span className="text-yellow-600 font-medium">{subject.name}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{subject.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{subject.name}</h1>
              <p className="text-yellow-100">{subject.description}</p>
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
                  <span className="bg-yellow-100 text-yellow-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">{tIdx + 1}</span>
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
                          <p className="text-sm text-yellow-700 mt-2 bg-yellow-50 p-2 rounded">💡 {q.answer}</p>
                          <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm hover:bg-yellow-200 transition">🤖 AI에게 질문</button>
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
