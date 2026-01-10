'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BuildingPlanningStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('architect-engineer-building-planning-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('architect-engineer-building-planning-completed', JSON.stringify([...newCompleted]));
  };

  const topics = [
    {
      title: '건축계획 총론',
      questions: [
        { id: 1, question: '건축계획의 정의와 과정을 설명하시오.', answer: '건축물의 기능, 구조, 미를 종합적으로 계획하는 과정', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 건축계획의 정의와 과정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 건축계획의 정의\n2. 기획단계부터 설계완료까지의 과정\n3. 각 단계별 주요 검토사항\n4. 관련 법규 및 기준' },
        { id: 2, question: '건축물의 기능과 형태의 관계를 설명하시오.', answer: '기능이 형태를 결정(Form follows function)', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 건축물의 기능과 형태의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기능주의 건축의 개념\n2. Form follows function의 의미\n3. 현대건축에서의 적용 사례\n4. 기능과 미의 조화' },
        { id: 3, question: '건축의 3요소(구조, 기능, 미)를 설명하시오.', answer: '비트루비우스의 건축 3원칙', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 건축의 3요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 구조(Firmitas)의 개념\n2. 기능(Utilitas)의 개념\n3. 미(Venustas)의 개념\n4. 세 요소의 상호관계' },
        { id: 4, question: '건축설계 프로세스의 단계별 내용을 설명하시오.', answer: '기획→기본설계→실시설계→시공→유지관리', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 건축설계 프로세스의 단계별 내용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기획단계의 주요 내용\n2. 기본설계의 산출물\n3. 실시설계의 상세 내용\n4. 각 단계별 필요 도서' },
        { id: 5, question: '건축물의 배치계획 시 고려사항을 설명하시오.', answer: '향, 일조, 통풍, 조망, 프라이버시', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 건축물의 배치계획 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자연환경적 요소(향, 일조, 통풍)\n2. 법규적 요소(건폐율, 용적률)\n3. 주변환경과의 관계\n4. 동선 및 접근성' },
        { id: 6, question: '건축물의 향(방위)에 따른 특성을 설명하시오.', answer: '남향이 가장 유리, 동·서향은 일사 조절 필요', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 건축물의 향에 따른 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 남향의 장단점\n2. 동향·서향의 특성\n3. 북향의 특성과 활용\n4. 향 선정 시 고려사항' },
        { id: 7, question: '일조와 일영의 개념 및 계획 시 고려사항을 설명하시오.', answer: '일조권 확보를 위한 건물 이격거리 산정', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 일조와 일영의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 일조의 정의와 중요성\n2. 일영(그림자)의 계산 방법\n3. 일조권 관련 법규\n4. 인동간격 산정 방법' },
        { id: 8, question: '건폐율과 용적률의 정의와 산정방법을 설명하시오.', answer: '건폐율=건축면적/대지면적, 용적률=연면적/대지면적', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 건폐율과 용적률의 정의와 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 건폐율의 정의와 산정식\n2. 용적률의 정의와 산정식\n3. 지역별 제한 기준\n4. 완화 규정' },
        { id: 9, question: '모듈(Module)과 그리드(Grid)의 개념을 설명하시오.', answer: '모듈=기본 치수단위, 그리드=설계 기준선', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 모듈과 그리드의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 모듈의 정의와 종류\n2. 그리드 시스템의 개념\n3. 모듈러 코디네이션\n4. 실무 적용 사례' },
        { id: 10, question: '유니버설 디자인의 7원칙을 설명하시오.', answer: '공평한 사용, 유연한 사용, 간단한 사용 등', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 유니버설 디자인의 7원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유니버설 디자인의 정의\n2. 7가지 원칙 상세 설명\n3. 건축물 적용 사례\n4. 배리어프리와의 차이점' },
      ],
    },
    {
      title: '주거건축 계획',
      questions: [
        { id: 11, question: '주거건축의 분류와 특성을 설명하시오.', answer: '단독주택, 공동주택(아파트, 연립, 다세대)', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 주거건축의 분류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단독주택의 종류와 특성\n2. 공동주택의 종류와 특성\n3. 각 유형별 법적 기준\n4. 장단점 비교' },
        { id: 12, question: '단위세대 평면계획의 기본원칙을 설명하시오.', answer: '공사 분리, 동선 효율화, 채광·환기 확보', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 단위세대 평면계획의 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공간의 조닝(Zoning)\n2. 동선계획의 원칙\n3. 채광·환기 계획\n4. 실별 배치 기준' },
        { id: 13, question: '주택의 공간구성(공적공간, 사적공간, 반공적공간)을 설명하시오.', answer: '거실·식당(공적), 침실(사적), 현관(반공적)', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 주택의 공간구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공적공간의 특성과 구성\n2. 사적공간의 특성과 구성\n3. 반공적공간의 역할\n4. 공간의 연계와 분리' },
        { id: 14, question: '아파트 단지계획 시 고려사항을 설명하시오.', answer: '인동간격, 조경, 주차, 커뮤니티시설', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 아파트 단지계획 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배치계획(인동간격, 향)\n2. 외부공간 계획\n3. 주차장 계획\n4. 부대복리시설 계획' },
        { id: 15, question: '아파트의 주호 배치유형(판상형, 탑상형)을 비교하시오.', answer: '판상형=남향 유리, 탑상형=조망 유리', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 아파트의 주호 배치유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 판상형의 특성과 장단점\n2. 탑상형의 특성과 장단점\n3. 혼합형의 특성\n4. 적용 시 고려사항' },
        { id: 16, question: '주택의 코어(Core) 계획을 설명하시오.', answer: '계단, 엘리베이터, 배관 샤프트의 집중 배치', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 주택의 코어 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 코어의 정의와 구성요소\n2. 코어 배치 유형\n3. 효율적인 코어 계획\n4. 고층 아파트의 코어' },
        { id: 17, question: '주거밀도(호수밀도, 인구밀도)의 개념을 설명하시오.', answer: '호수밀도=호/ha, 인구밀도=인/ha', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 주거밀도의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 호수밀도의 정의와 산정\n2. 인구밀도의 정의와 산정\n3. 적정 밀도 기준\n4. 밀도와 환경의 관계' },
        { id: 18, question: '주차장 계획(지상, 지하, 필로티)의 장단점을 비교하시오.', answer: '지하주차=토지효율, 필로티=1층 활용', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 주차장 계획의 장단점을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 지상주차장의 특성\n2. 지하주차장의 특성\n3. 필로티 주차의 특성\n4. 주차대수 산정 기준' },
        { id: 19, question: '노인주거시설의 계획 시 고려사항을 설명하시오.', answer: '배리어프리, 안전손잡이, 비상호출', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 노인주거시설의 계획 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배리어프리 설계 요소\n2. 안전시설 계획\n3. 편의시설 계획\n4. 법적 기준' },
        { id: 20, question: '친환경 주거단지 계획요소를 설명하시오.', answer: '에너지절약, 우수활용, 녹지확보', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 친환경 주거단지 계획요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 에너지 절약 요소\n2. 수자원 관리 요소\n3. 녹지 및 생태 요소\n4. 인증제도(녹색건축인증)' },
      ],
    },
    {
      title: '상업·업무건축 계획',
      questions: [
        { id: 21, question: '오피스빌딩의 코어 유형(중앙, 편심, 양단)을 비교하시오.', answer: '중앙코어=대형, 편심코어=임대효율', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 오피스빌딩의 코어 유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 중앙코어형의 특성\n2. 편심코어형의 특성\n3. 양단코어형의 특성\n4. 적용 규모와 선정 기준' },
        { id: 22, question: '오피스 공간의 임대효율(렌터블비)을 설명하시오.', answer: '전용면적/연면적 비율, 70~80% 목표', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 오피스 공간의 임대효율을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 렌터블비의 정의\n2. 산정 방법\n3. 적정 비율 기준\n4. 효율 향상 방안' },
        { id: 23, question: '오픈플랜 오피스의 장단점을 설명하시오.', answer: '유연한 공간활용 vs 소음·프라이버시', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 오픈플랜 오피스의 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오픈플랜의 정의\n2. 장점(유연성, 소통)\n3. 단점(소음, 집중도)\n4. 개선 방안' },
        { id: 24, question: '백화점의 매장계획(평면형식, 동선)을 설명하시오.', answer: '중앙홀형, 직선형, 루프형 동선', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 백화점의 매장계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 평면형식의 종류\n2. 동선계획의 원칙\n3. 층별 매장 배치\n4. 에스컬레이터·엘리베이터 배치' },
        { id: 25, question: '쇼핑몰의 몰(Mall) 계획을 설명하시오.', answer: '보행 중심의 내부가로 형성', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 쇼핑몰의 몰 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 몰의 정의와 역할\n2. 몰의 형태(I자형, L자형, T자형)\n3. 앵커테넌트 배치\n4. 아트리움과 연계' },
        { id: 26, question: '호텔의 객실부·공공부·관리부 구성을 설명하시오.', answer: '객실부 60~70%, 공공부 20~25%, 관리부 10~15%', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 호텔의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 객실부의 구성과 비율\n2. 공공부(로비, 연회장)의 구성\n3. 관리부(주방, 기계실)의 구성\n4. 동선 분리 계획' },
        { id: 27, question: '호텔 객실의 표준치수와 배치유형을 설명하시오.', answer: '싱글룸 15㎡, 트윈룸 25㎡ 이상', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 호텔 객실의 치수와 배치유형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 객실 유형별 표준치수\n2. 복도형 배치\n3. 중앙홀형 배치\n4. 아트리움형 배치' },
        { id: 28, question: '레스토랑의 좌석배치와 동선계획을 설명하시오.', answer: '1인당 점유면적 1.0~1.5㎡', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 레스토랑의 좌석배치와 동선계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 좌석배치의 원칙\n2. 1인당 점유면적 기준\n3. 고객동선과 서비스동선\n4. 주방과의 연계' },
        { id: 29, question: '전시시설의 전시공간 계획을 설명하시오.', answer: '연속관람, 자유관람, 혼합형', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 전시시설의 전시공간 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전시동선의 유형\n2. 전시실 배치 원칙\n3. 조명 계획\n4. 편의시설 계획' },
        { id: 30, question: '컨벤션센터의 공간구성을 설명하시오.', answer: '전시장, 회의장, 편의시설, 지원시설', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 컨벤션센터의 공간구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전시공간 계획\n2. 회의공간 계획\n3. 편의·지원시설\n4. 대규모 이벤트 동선' },
      ],
    },
    {
      title: '교육·의료건축 계획',
      questions: [
        { id: 31, question: '학교건축의 교사 배치유형(편복도형, 중복도형)을 비교하시오.', answer: '편복도=채광유리, 중복도=면적효율', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 학교 교사 배치유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 편복도형의 특성\n2. 중복도형의 특성\n3. 클러스터형의 특성\n4. 선택 기준' },
        { id: 32, question: '교실의 표준치수와 창문계획을 설명하시오.', answer: '교실 7.5m×9m, 좌측채광 원칙', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 교실의 표준치수와 창문계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교실의 표준 규격\n2. 채광 계획(좌측채광)\n3. 환기 계획\n4. 학생 1인당 면적 기준' },
        { id: 33, question: '운동장 배치 시 고려사항을 설명하시오.', answer: '교사 남측, 장축 남북방향', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 운동장 배치 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방위 계획(장축 방향)\n2. 교사와의 관계\n3. 규모 산정 기준\n4. 안전 계획' },
        { id: 34, question: '도서관의 열람실 계획을 설명하시오.', answer: '북측 균일조명, 1인당 2.0~2.5㎡', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 도서관의 열람실 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열람실 배치 원칙\n2. 1인당 점유면적\n3. 조명 계획\n4. 서가와의 관계' },
        { id: 35, question: '도서관의 서고 계획을 설명하시오.', answer: '개가식, 폐가식, 반개가식', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 도서관의 서고 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 개가식의 특성\n2. 폐가식의 특성\n3. 반개가식의 특성\n4. 서고 면적 산정' },
        { id: 36, question: '병원의 부문별 구성(외래부, 병동부, 진료부)을 설명하시오.', answer: '외래부=1층, 병동부=상층, 진료부=중간층', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 병원의 부문별 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외래부의 구성과 배치\n2. 병동부의 구성과 배치\n3. 진료부의 구성과 배치\n4. 관리·공급부의 배치' },
        { id: 37, question: '병동 유형(개방형, 폐쇄형, 혼합형)을 비교하시오.', answer: '개방병동=나이팅게일식, 폐쇄병동=개인실', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 병동 유형을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 개방병동의 특성\n2. 폐쇄병동의 특성\n3. 혼합형 병동\n4. 최근 트렌드' },
        { id: 38, question: '병원의 동선계획(환자동선, 물품동선, 직원동선)을 설명하시오.', answer: '청결동선과 오염동선의 분리', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 병원의 동선계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환자동선 계획\n2. 물품동선(청결·오염) 계획\n3. 직원동선 계획\n4. 동선 분리의 중요성' },
        { id: 39, question: '수술부의 계획 시 고려사항을 설명하시오.', answer: '청정도 유지, 감염방지 동선', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 수술부의 계획 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수술실의 청정도 기준\n2. 수술부 동선 계획\n3. 환기 및 공조 계획\n4. 부속실 구성' },
        { id: 40, question: '응급실의 계획 시 고려사항을 설명하시오.', answer: '외부 접근성, 처치공간, 대기공간', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 응급실의 계획 시 고려사항을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외부 접근성 확보\n2. 응급처치 공간 구성\n3. 진료지원시설 연계\n4. 보호자 대기공간' },
      ],
    },
    {
      title: '동선·피난계획',
      questions: [
        { id: 41, question: '동선계획의 원칙과 종류를 설명하시오.', answer: '단순성, 명료성, 효율성 / 수평·수직동선', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 동선계획의 원칙과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 동선계획의 기본원칙\n2. 수평동선의 종류\n3. 수직동선의 종류\n4. 동선 분리의 중요성' },
        { id: 42, question: '복도의 종류와 폭 기준을 설명하시오.', answer: '편복도, 중복도 / 건축물 용도별 최소폭', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 복도의 종류와 폭 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 편복도와 중복도의 특성\n2. 용도별 최소 폭 기준\n3. 피난 규정과의 관계\n4. 효율적인 복도 계획' },
        { id: 43, question: '계단의 종류와 치수기준을 설명하시오.', answer: '직통계단, 피난계단, 특별피난계단', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 계단의 종류와 치수기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계단의 종류\n2. 용도별 치수 기준(단높이, 단너비)\n3. 피난계단의 구조기준\n4. 특별피난계단의 구조기준' },
        { id: 44, question: '엘리베이터의 계획(대수산정, 배치)을 설명하시오.', answer: '5분간 수송능력 기준, 그룹배치', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 엘리베이터의 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대수 산정 방법\n2. 5분간 수송능력\n3. 배치 방법(대면, 직각)\n4. 비상용 엘리베이터' },
        { id: 45, question: '에스컬레이터의 계획을 설명하시오.', answer: '경사도 30°, 폭 600~1000mm', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 에스컬레이터의 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 에스컬레이터의 제원\n2. 경사도와 속도 기준\n3. 배치 방법(병렬, 교차)\n4. 수송능력 산정' },
        { id: 46, question: '피난계획의 기본원칙을 설명하시오.', answer: '2방향 피난, 직통계단 거리제한, 방화구획', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 피난계획의 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 2방향 피난의 원칙\n2. 피난거리 제한\n3. 방화구획의 개념\n4. 피난안전구역' },
        { id: 47, question: '방화구획의 설치기준을 설명하시오.', answer: '면적별, 층별, 용도별 구획', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 방화구획의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 면적별 방화구획\n2. 층별 방화구획\n3. 용도별 방화구획\n4. 방화구획 완화 규정' },
        { id: 48, question: '피난안전구역의 설치기준을 설명하시오.', answer: '초고층건축물 30개층 이내마다 설치', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 피난안전구역의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피난안전구역의 정의\n2. 설치 대상 및 위치\n3. 면적 산정 기준\n4. 구조 및 설비 기준' },
        { id: 49, question: '비상용승강기의 설치기준을 설명하시오.', answer: '높이 31m 초과 건축물 설치 의무', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 비상용승강기의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상\n2. 대수 산정 기준\n3. 승강장 구조 기준\n4. 피난층과의 연계' },
        { id: 50, question: '내화구조와 방화구조의 차이를 설명하시오.', answer: '내화=화재 시 붕괴방지, 방화=화재 확산방지', prompt: '건축기사 건축계획 문제입니다.\n\n문제: 내화구조와 방화구조의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 내화구조의 정의와 기준\n2. 방화구조의 정의와 기준\n3. 적용 대상의 차이\n4. 내화성능 시험 방법' },
      ],
    },
  ];

  const progress = Math.round((completedQuestions.size / 50) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/category/construction/architect-engineer" className="flex items-center gap-2 text-orange-600">
            <span>←</span><span className="font-medium">건축기사</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">{completedQuestions.size}/50 완료</div>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-orange-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-orange-500">📐</span> 건축계획
          </h1>
          <p className="text-gray-500 mt-1">건축기사 필기 1과목 (50문항)</p>
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
                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-orange-500 to-red-500 text-white"
              >
                <span className="font-bold">{topic.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-orange-100">
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
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${
                            completedQuestions.has(q.id)
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.has(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-500 mt-1">💡 {q.answer}</p>
                        </div>
                        <button
                          onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                          className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition"
                        >
                          🤖 AI
                        </button>
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
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
