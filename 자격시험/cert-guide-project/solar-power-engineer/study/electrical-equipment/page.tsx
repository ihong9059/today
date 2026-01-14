'use client';

import { useState, useEffect } from 'react';

export default function ElectricalEquipmentStudyPage() {
  const [expandedTopics, setExpandedTopics] = useState<number[]>([0]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const subject = { name: '태양광발전설비 설계', icon: '📐', description: '용량설계, 전기설계, 구조설계, 접지시스템 등 발전설비 설계 전반' };

  const topics = [
    {
      id: 1, name: '용량 및 어레이 설계',
      questions: [
        { id: 1, question: '태양광 발전설비 용량 산정 방법을 설명하시오.', answer: '설치면적, 일사량, 부하, 예상발전량 고려하여 kWp 단위로 산정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 태양광 발전설비 용량 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용량 산정 요소\n2. 계산 공식\n3. 예제\n4. 고려사항\n5. 예상 문제 3개' },
        { id: 2, question: '모듈 배치 설계 시 고려사항을 설명하시오.', answer: '방위각, 경사각, 음영, 이격거리, 유지보수 통로', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 모듈 배치 설계 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배치 설계 요소\n2. 최적 조건\n3. 음영 분석\n4. 설계 절차\n5. 예상 문제 3개' },
        { id: 3, question: '스트링 전압 설계 시 온도보정 방법을 설명하시오.', answer: '최저온도 시 Voc 증가, 최고온도 시 Vmpp 감소 고려하여 인버터 범위 내 설계', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 스트링 전압 설계 시 온도보정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온도보정 필요성\n2. 보정 공식\n3. 최대/최소 모듈수 계산\n4. 예제\n5. 예상 문제 3개' },
        { id: 4, question: '어레이 이격거리 계산 공식을 설명하시오.', answer: 'D = H/tan(고도각), 동지 기준 그림자 길이 이상 확보', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 어레이 이격거리 계산 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 이격거리 정의\n2. 계산 공식\n3. 동지 기준 이유\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 5, question: '경사각과 방위각이 발전량에 미치는 영향을 설명하시오.', answer: '한국 최적: 경사각 30-35°, 방위각 정남향(180°), 벗어날수록 발전량 감소', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 경사각과 방위각이 발전량에 미치는 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 경사각 영향\n2. 방위각 영향\n3. 최적 조건\n4. 손실률 계산\n5. 예상 문제 3개' },
        { id: 6, question: 'DC/AC 비율(Oversize Ratio) 설계 기준을 설명하시오.', answer: '보통 1.1-1.3, 높으면 클리핑 발생하나 저일사 시간대 효율 향상', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: DC/AC 비율 설계 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DC/AC 비율 정의\n2. 적정 범위\n3. 클리핑 현상\n4. 경제성 분석\n5. 예상 문제 3개' },
        { id: 7, question: '발전량 예측 시뮬레이션 도구를 설명하시오.', answer: 'PVsyst, HelioScope, SAM, PVSOL 등 3D 음영분석 및 발전량 예측', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 발전량 예측 시뮬레이션 도구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주요 도구\n2. 기능 비교\n3. 입력 데이터\n4. 결과 활용\n5. 예상 문제 3개' },
        { id: 8, question: '설비용량과 발전용량의 차이를 설명하시오.', answer: '설비용량(kWp): STC 기준 최대출력, 발전용량(kW): 실제 출력', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 설비용량과 발전용량의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설비용량 정의\n2. 발전용량 정의\n3. 차이점\n4. 표기 방법\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 2, name: '전기설계',
      questions: [
        { id: 9, question: '케이블 굵기 선정 시 고려해야 할 세 가지 조건을 설명하시오.', answer: '허용전류, 전압강하, 단락전류 조건 모두 만족', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 케이블 굵기 선정 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허용전류 조건\n2. 전압강하 조건\n3. 단락전류 조건\n4. 선정 예제\n5. 예상 문제 3개' },
        { id: 10, question: '전압강하 계산 공식과 허용 기준을 설명하시오.', answer: 'Vd=2×I×L×ρ/A, DC측 2%, AC측 3% 이내 권장', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전압강하 계산 공식과 허용 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계산 공식\n2. 허용 기준\n3. 손실 영향\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 11, question: '단선결선도 작성 시 포함해야 할 요소를 나열하시오.', answer: 'PV어레이, 접속함, 인버터, 수배전반, 차단기, 계량기, 보호장치', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 단선결선도 작성 시 포함 요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필수 요소\n2. 기호 표기법\n3. 작성 순서\n4. 예시\n5. 예상 문제 3개' },
        { id: 12, question: 'DC 케이블과 AC 케이블 선정 시 차이점을 설명하시오.', answer: 'DC: 내UV, 난연, 고전압용 / AC: 일반 전력케이블, 굵기 계산 차이', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: DC/AC 케이블 선정 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. DC 케이블 특성\n2. AC 케이블 특성\n3. 선정 기준 차이\n4. 주의사항\n5. 예상 문제 3개' },
        { id: 13, question: '태양광 전용 케이블(PV1-F)의 특성을 설명하시오.', answer: '내UV, 내열, 난연, 고절연, 유연성, 옥외 노출 배선 가능', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: PV1-F 케이블의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 규격 특성\n2. 구조\n3. 내구성\n4. 적용 범위\n5. 예상 문제 3개' },
        { id: 14, question: '인버터 입력전압 범위와 스트링 설계의 관계를 설명하시오.', answer: 'MPPT 범위 내 Vmpp 유지, 최대DC전압 이하 Voc 유지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 인버터 입력전압과 스트링 설계 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. MPPT 전압범위\n2. 최대DC전압\n3. 스트링 모듈수 계산\n4. 온도 보정\n5. 예상 문제 3개' },
        { id: 15, question: '퓨즈/차단기 정격 선정 기준을 설명하시오.', answer: '정격전류: 1.25-1.56×Isc, 정격전압: 시스템 최대전압 이상', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 퓨즈/차단기 정격 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전류 정격 기준\n2. 전압 정격 기준\n3. 차단용량\n4. 선정 예제\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 3, name: '접지 및 피뢰 설계',
      questions: [
        { id: 16, question: '태양광 설비의 접지 방식(TN, TT, IT)을 비교하시오.', answer: 'TN: 공용접지, TT: 개별접지, IT: 비접지/고저항접지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접지 방식(TN, TT, IT)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 각 방식 정의\n2. 장단점\n3. 적용 조건\n4. 선정 기준\n5. 예상 문제 3개' },
        { id: 17, question: '접지저항 허용 기준과 측정 방법을 설명하시오.', answer: '일반: 10Ω 이하, 피뢰: 10Ω 이하, 3전극법 측정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접지저항 허용 기준과 측정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 허용 기준\n2. 측정 방법\n3. 저감 방안\n4. 측정 주기\n5. 예상 문제 3개' },
        { id: 18, question: '등전위본딩의 목적과 방법을 설명하시오.', answer: '낙뢰 시 전위차 최소화, 금속구조물 상호 연결', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 등전위본딩의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 등전위본딩 정의\n2. 목적\n3. 연결 방법\n4. 적용 기준\n5. 예상 문제 3개' },
        { id: 19, question: 'SPD(서지보호장치) Type별 특성과 설치 위치를 설명하시오.', answer: 'Type1: 직격뢰, Type2: 유도뢰, Type3: 기기보호, 단계별 설치', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: SPD Type별 특성과 설치 위치를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. Type별 특성\n2. 설치 위치\n3. 선정 기준\n4. 조합 방법\n5. 예상 문제 3개' },
        { id: 20, question: '피뢰침 보호범위 산정 방법을 설명하시오.', answer: '회전구체법(Rolling Sphere), 보호각법, 메쉬법', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 피뢰침 보호범위 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 회전구체법\n2. 보호각법\n3. 메쉬법\n4. 적용 예\n5. 예상 문제 3개' },
        { id: 21, question: 'PV 모듈 프레임 접지의 필요성을 설명하시오.', answer: '감전 방지, 낙뢰 시 전위상승 억제, 유도전압 제거', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: PV 모듈 프레임 접지의 필요성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지 필요성\n2. 접지 방법\n3. 접지선 규격\n4. 점검 항목\n5. 예상 문제 3개' },
        { id: 22, question: '접지극 종류와 선정 기준을 설명하시오.', answer: '봉접지, 판접지, 메쉬접지, 토양 저항률에 따라 선정', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 접지극 종류와 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지극 종류\n2. 특성 비교\n3. 선정 기준\n4. 시공 방법\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 4, name: '구조물 설계',
      questions: [
        { id: 23, question: '태양광 구조물 설계 시 고려해야 할 하중을 설명하시오.', answer: '고정하중(자중), 적설하중, 풍하중, 지진하중', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 구조물 설계 시 고려 하중을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하중 종류\n2. 계산 방법\n3. 조합 하중\n4. 안전율\n5. 예상 문제 3개' },
        { id: 24, question: '풍하중 계산 방법을 설명하시오.', answer: 'W = q × Cf × A, 기본풍속, 높이계수, 형상계수 고려', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 풍하중 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계산 공식\n2. 각 계수 의미\n3. 지역별 기본풍속\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 25, question: '적설하중 계산 방법을 설명하시오.', answer: 'S = Cs × S0, 지붕 형상계수 × 지상적설하중', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 적설하중 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계산 공식\n2. 지역별 적설하중\n3. 경사 보정\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 26, question: '앵커볼트 설계 시 고려사항을 설명하시오.', answer: '인발력, 전단력, 콘크리트 강도, 매립깊이, 이격거리', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 앵커볼트 설계 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설계 하중\n2. 선정 기준\n3. 시공 방법\n4. 검사 항목\n5. 예상 문제 3개' },
        { id: 27, question: '지상형 구조물의 기초 종류를 설명하시오.', answer: '콘크리트 기초, 말뚝기초, 스크류파일, 콘크리트 블록', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 지상형 구조물의 기초 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기초 종류\n2. 특성 비교\n3. 적용 조건\n4. 시공 방법\n5. 예상 문제 3개' },
        { id: 28, question: '지붕형 설치 시 방수 처리 방법을 설명하시오.', answer: '후레싱, 실런트, 방수시트, 관통부 최소화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 지붕형 설치 시 방수 처리 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수 방법\n2. 관통부 처리\n3. 재료 선정\n4. 점검 항목\n5. 예상 문제 3개' },
        { id: 29, question: '부식 방지를 위한 재료 선정 기준을 설명하시오.', answer: '용융아연도금, 알루미늄, 스테인리스, 도금 두께 기준', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 부식 방지 재료 선정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재료 종류\n2. 도금 기준\n3. 환경별 선정\n4. 유지보수\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 5, name: '설계도서 작성',
      questions: [
        { id: 30, question: '태양광 발전소 설계도서의 구성을 설명하시오.', answer: '설계설명서, 구조계산서, 전기계산서, 도면, 시방서', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 설계도서의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구성 서류\n2. 각 서류 내용\n3. 작성 기준\n4. 검토 항목\n5. 예상 문제 3개' },
        { id: 31, question: '전기설계도면 종류와 내용을 설명하시오.', answer: '단선결선도, 배선도, 평면도, 계통도, 상세도', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 전기설계도면 종류와 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도면 종류\n2. 각 도면 내용\n3. 작성 기호\n4. 검토 요령\n5. 예상 문제 3개' },
        { id: 32, question: '구조계산서에 포함되어야 할 항목을 설명하시오.', answer: '설계조건, 하중산정, 부재검토, 기초설계, 안전율', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 구조계산서 포함 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 필수 항목\n2. 계산 절차\n3. 검증 방법\n4. 작성 예시\n5. 예상 문제 3개' },
        { id: 33, question: '발전량 예측 보고서 작성 항목을 설명하시오.', answer: '기상데이터, 시스템 구성, 손실 분석, 연간 발전량, 경제성', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 발전량 예측 보고서 작성 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 입력 데이터\n2. 분석 항목\n3. 결과 표현\n4. 보고서 구성\n5. 예상 문제 3개' },
        { id: 34, question: '시방서의 역할과 주요 내용을 설명하시오.', answer: '시공 기준 제시, 재료규격, 시공방법, 검사기준, 안전관리', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 시방서의 역할과 주요 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시방서 역할\n2. 주요 내용\n3. 적용 범위\n4. 작성 기준\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 6, name: '경제성 분석',
      questions: [
        { id: 35, question: 'LCOE(균등화발전비용) 계산 방법을 설명하시오.', answer: 'LCOE = (총투자비+운영비)/총발전량, 원/kWh 단위', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: LCOE 계산 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. LCOE 정의\n2. 계산 공식\n3. 입력 변수\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 36, question: '투자비 회수기간(Payback Period) 산정 방법을 설명하시오.', answer: '총투자비/(연간수익-연간비용), 보통 8-12년', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 투자비 회수기간 산정 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 산정 공식\n2. 수익 항목\n3. 비용 항목\n4. 계산 예제\n5. 예상 문제 3개' },
        { id: 37, question: 'IRR(내부수익률)과 NPV(순현재가치)를 설명하시오.', answer: 'IRR: NPV=0이 되는 할인율, NPV: 미래현금흐름의 현재가치 합', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: IRR과 NPV를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. IRR 정의\n2. NPV 정의\n3. 계산 방법\n4. 의사결정 기준\n5. 예상 문제 3개' },
        { id: 38, question: 'SMP(계통한계가격)와 REC(신재생에너지공급인증서)를 설명하시오.', answer: 'SMP: 전력판매가격, REC: 신재생 공급의무 인증서, 수익=SMP+REC', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: SMP와 REC를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. SMP 정의\n2. REC 정의\n3. 가격 결정\n4. 수익 계산\n5. 예상 문제 3개' },
        { id: 39, question: 'REC 가중치와 적용 기준을 설명하시오.', answer: '설치유형, 용량별 차등 가중치 적용, 건물형 1.5, 일반 1.0 등', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: REC 가중치와 적용 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 가중치 개념\n2. 유형별 가중치\n3. 적용 기준\n4. 수익 영향\n5. 예상 문제 3개' },
        { id: 40, question: '태양광 발전사업 수익성 분석 항목을 설명하시오.', answer: '초기투자비, 연간운영비, 전력판매수익, 세제혜택, 금융비용', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 수익성 분석 항목을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투자비 항목\n2. 수익 항목\n3. 비용 항목\n4. 분석 절차\n5. 예상 문제 3개' },
      ],
    },
    {
      id: 7, name: '특수 설계',
      questions: [
        { id: 41, question: '수상태양광 설계 시 고려사항을 설명하시오.', answer: '부력체 설계, 계류시스템, 수심/수위변화, 방수, 반사광', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 수상태양광 설계 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조 설계\n2. 전기 설계\n3. 환경 영향\n4. 유지보수\n5. 예상 문제 3개' },
        { id: 42, question: '영농형 태양광 설계 기준을 설명하시오.', answer: '높이 2.5m 이상, 차광률 30% 이하, 작물 재배 병행', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 영농형 태양광 설계 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 기준\n2. 차광률 관리\n3. 작물 선정\n4. 인허가 절차\n5. 예상 문제 3개' },
        { id: 43, question: 'BIPV(건물일체형) 설계 특성을 설명하시오.', answer: '건축 외장재 기능, 미관, 구조안전, 전기설계 통합', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: BIPV 설계 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. BIPV 유형\n2. 설계 고려사항\n3. 건축법 요건\n4. 적용 사례\n5. 예상 문제 3개' },
        { id: 44, question: '추적식 시스템 설계 시 고려사항을 설명하시오.', answer: '추적 정밀도, 구동장치, 제어시스템, 음영, 풍속 제한', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 추적식 시스템 설계 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 추적 방식\n2. 설계 요소\n3. 발전량 증가\n4. 경제성\n5. 예상 문제 3개' },
        { id: 45, question: '염해/부식 환경에서의 설계 대책을 설명하시오.', answer: '스테인리스, 고내식성 도금, 이격거리 확보, 정기점검 강화', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 염해/부식 환경 설계 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 염해 영향\n2. 재료 선정\n3. 설계 대책\n4. 유지보수\n5. 예상 문제 3개' },
        { id: 46, question: '고온/저온 지역 설계 시 고려사항을 설명하시오.', answer: '온도계수 영향, 케이블 정격, 인버터 냉각, 동결 대책', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 극한온도 환경 설계 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 고온 영향\n2. 저온 영향\n3. 설계 대책\n4. 기기 선정\n5. 예상 문제 3개' },
        { id: 47, question: 'ESS 연계 시스템 설계 시 고려사항을 설명하시오.', answer: '용량 매칭, PCS 사양, 배터리 SOC 관리, 안전설비', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: ESS 연계 시스템 설계 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 용량 설계\n2. 전력변환\n3. 제어 전략\n4. 안전 설계\n5. 예상 문제 3개' },
        { id: 48, question: '자가소비용 시스템 설계 시 고려사항을 설명하시오.', answer: '부하패턴 분석, 역전송 방지, 계량방식, ESS 연계 검토', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 자가소비용 시스템 설계 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 부하 분석\n2. 용량 결정\n3. 계통연계 방식\n4. 경제성\n5. 예상 문제 3개' },
        { id: 49, question: '대규모 발전소(100MW급) 설계 특성을 설명하시오.', answer: '계통영향 분석, 송전설비, 보호협조, 전력품질 관리', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 대규모 발전소 설계 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계통 영향\n2. 송전 설비\n3. 보호 설계\n4. 인허가\n5. 예상 문제 3개' },
        { id: 50, question: '설계 VE(Value Engineering) 적용 방안을 설명하시오.', answer: '기능 분석, 대안 검토, 비용 최적화, 성능 유지', prompt: '태양광발전설비기사 시험 준비 중입니다.\n\n문제: 설계 VE 적용 방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VE 개념\n2. 적용 절차\n3. 검토 항목\n4. 효과 분석\n5. 예상 문제 3개' },
      ],
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('solar-electrical-equipment-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleComplete = (id: number) => {
    const updated = completedQuestions.includes(id) ? completedQuestions.filter((q) => q !== id) : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('solar-electrical-equipment-completed', JSON.stringify(updated));
  };

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-red-600">홈</a><span className="text-gray-300">›</span>
            <a href="/category/mechanical/solar-power-engineer" className="text-gray-600 hover:text-red-600">태양광발전설비기사</a><span className="text-gray-300">›</span>
            <span className="text-red-600 font-medium">{subject.name}</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{subject.icon}</span>
            <div><h1 className="text-2xl font-bold">{subject.name}</h1><p className="text-red-100">{subject.description}</p></div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2"><span>진행률</span><span>{completedQuestions.length}/{totalQuestions} ({progress}%)</span></div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }}></div></div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic, tIdx) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button onClick={() => setExpandedTopics(expandedTopics.includes(tIdx) ? expandedTopics.filter((t) => t !== tIdx) : [...expandedTopics, tIdx])} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="bg-red-100 text-red-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">{tIdx + 1}</span>
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
                        <button onClick={() => toggleComplete(q.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${completedQuestions.includes(q.id) ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{completedQuestions.includes(q.id) && '✓'}</button>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-red-700 mt-2 bg-red-50 p-2 rounded">💡 {q.answer}</p>
                          <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200 transition">🤖 AI에게 질문</button>
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

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
