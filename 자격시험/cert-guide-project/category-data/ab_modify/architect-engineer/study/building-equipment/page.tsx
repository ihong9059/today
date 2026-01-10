'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BuildingEquipmentStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('architect-engineer-building-equipment-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('architect-engineer-building-equipment-completed', JSON.stringify([...newCompleted]));
  };

  const topics = [
    {
      title: '급수·급탕 설비',
      questions: [
        { id: 1, question: '급수방식의 종류와 특징을 설명하시오.', answer: '수도직결, 고가수조, 압력탱크, 부스터방식', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 급수방식의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수도직결방식\n2. 고가수조방식\n3. 압력탱크방식\n4. 부스터방식과 장단점 비교' },
        { id: 2, question: '급수량 산정방법을 설명하시오.', answer: '1인 1일 급수량 × 인원수', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 급수량 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 1인 1일 급수량 기준\n2. 용도별 급수량\n3. 시간최대급수량\n4. 순간최대급수량' },
        { id: 3, question: '급수관의 관경 결정방법을 설명하시오.', answer: '유량, 유속, 마찰손실 고려', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 급수관의 관경 결정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유량 산정\n2. 허용유속 기준\n3. 마찰손실 계산\n4. 관경 결정 절차' },
        { id: 4, question: '급탕방식의 종류를 설명하시오.', answer: '중앙식, 개별식, 지역난방식', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 급탕방식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중앙급탕방식\n2. 개별급탕방식\n3. 지역난방 연계\n4. 각 방식의 장단점' },
        { id: 5, question: '급탕온도와 급탕량 산정을 설명하시오.', answer: '급탕온도 55~60℃, 1인 1일 40~80L', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 급탕온도와 급탕량 산정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적정 급탕온도\n2. 용도별 급탕량\n3. 레지오넬라균 예방\n4. 급탕부하 계산' },
        { id: 6, question: '크로스커넥션의 정의와 방지대책을 설명하시오.', answer: '음료수와 오염수의 교차연결 방지', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 크로스커넥션의 정의와 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 크로스커넥션의 정의\n2. 발생 원인\n3. 방지 방법\n4. 역류방지장치' },
        { id: 7, question: '워터햄머의 원인과 방지대책을 설명하시오.', answer: '급격한 유속 변화로 인한 압력파', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 워터햄머의 원인과 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 워터햄머의 발생 원리\n2. 피해 유형\n3. 방지 방법\n4. 완충장치 설치' },
        { id: 8, question: '저수조의 설계기준을 설명하시오.', answer: '1일 사용량의 1/2~1일분 저장', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 저수조의 설계기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저수조 용량 산정\n2. 설치 위치 기준\n3. 위생 관리 기준\n4. 6면 점검 확보' },
        { id: 9, question: '펌프의 종류와 선정방법을 설명하시오.', answer: '원심펌프, 용적펌프, 특수펌프', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 펌프의 종류와 선정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 펌프의 종류\n2. 양정과 유량 계산\n3. 펌프 동력 산정\n4. 펌프 선정 시 고려사항' },
        { id: 10, question: '급수설비의 오염방지 대책을 설명하시오.', answer: '에어갭, 역류방지밸브, 진공브레이커', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 급수설비의 오염방지 대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 오염 원인\n2. 에어갭(토수구 공간)\n3. 역류방지장치\n4. 정기 점검 사항' },
      ],
    },
    {
      title: '배수·통기 설비',
      questions: [
        { id: 11, question: '배수방식의 종류를 설명하시오.', answer: '합류식, 분류식', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 배수방식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 합류식의 특성\n2. 분류식의 특성\n3. 장단점 비교\n4. 적용 기준' },
        { id: 12, question: '배수트랩의 종류와 기능을 설명하시오.', answer: 'S트랩, P트랩, 드럼트랩 등', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 배수트랩의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 트랩의 역할\n2. 트랩의 종류\n3. 봉수 깊이 기준\n4. 트랩의 설치 기준' },
        { id: 13, question: '통기관의 종류와 역할을 설명하시오.', answer: '개별통기, 루프통기, 신정통기', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 통기관의 종류와 역할을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통기관의 역할\n2. 개별통기관\n3. 루프통기관\n4. 신정통기관' },
        { id: 14, question: '봉수파괴의 원인과 방지대책을 설명하시오.', answer: '자기사이펀, 유도사이펀, 모세관현상', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 봉수파괴의 원인과 방지대책을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기사이펀 작용\n2. 유도사이펀 작용\n3. 모세관현상\n4. 방지대책' },
        { id: 15, question: '배수관의 관경 결정방법을 설명하시오.', answer: '기구배수부하단위, 허용유량', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 배수관의 관경 결정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기구배수부하단위\n2. 배수관 허용유량\n3. 관경 결정 절차\n4. 최소 관경 기준' },
        { id: 16, question: '우수배수 계획을 설명하시오.', answer: '강우강도, 유출계수, 배수면적', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 우수배수 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 우수량 산정\n2. 강우강도\n3. 유출계수\n4. 우수관 관경 결정' },
        { id: 17, question: '정화조의 종류와 처리방식을 설명하시오.', answer: '단독정화조, 합병정화조', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 정화조의 종류와 처리방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단독정화조\n2. 합병정화조\n3. 처리 방식(혐기성, 호기성)\n4. 방류수 수질 기준' },
        { id: 18, question: '배수관의 기울기 기준을 설명하시오.', answer: '관경별 최소 기울기, 1/50~1/200', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 배수관의 기울기 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기울기의 필요성\n2. 관경별 최소 기울기\n3. 자정작용 유속\n4. 설치 시 주의사항' },
        { id: 19, question: '간접배수의 적용 대상을 설명하시오.', answer: '음료수기기, 의료기기, 주방기기', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 간접배수의 적용 대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 간접배수의 정의\n2. 적용 대상 기기\n3. 에어갭 확보\n4. 설치 방법' },
        { id: 20, question: '배수설비의 청소구와 점검구를 설명하시오.', answer: '배관 청소 및 점검을 위한 개구부', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 청소구와 점검구를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 청소구의 설치 위치\n2. 점검구의 설치 위치\n3. 설치 간격 기준\n4. 구조 및 재질' },
      ],
    },
    {
      title: '냉난방 설비',
      questions: [
        { id: 21, question: '냉방부하의 종류와 계산방법을 설명하시오.', answer: '외피부하, 내부부하, 환기부하', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 냉방부하의 종류와 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외피부하(벽체, 유리창)\n2. 내부부하(인체, 조명, 기기)\n3. 환기부하\n4. 부하 계산 절차' },
        { id: 22, question: '난방부하의 종류와 계산방법을 설명하시오.', answer: '열손실=열관류+환기', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 난방부하의 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열관류에 의한 손실\n2. 환기에 의한 손실\n3. 열관류율(U값)\n4. 난방부하 계산' },
        { id: 23, question: '중앙식 냉난방방식의 종류를 설명하시오.', answer: '단일덕트, 이중덕트, 팬코일유닛', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 중앙식 냉난방방식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 전공기방식(단일덕트, 이중덕트)\n2. 전수방식(FCU)\n3. 공기-물 방식\n4. 각 방식의 장단점' },
        { id: 24, question: '개별식 냉난방방식의 종류를 설명하시오.', answer: '패키지에어컨, 멀티에어컨, 히트펌프', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 개별식 냉난방방식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 패키지에어컨\n2. 시스템에어컨(멀티)\n3. 히트펌프 시스템\n4. 적용 건물 유형' },
        { id: 25, question: '복사냉난방의 원리와 특징을 설명하시오.', answer: '복사열 전달, 바닥난방·천장냉방', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 복사냉난방의 원리와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복사열 전달 원리\n2. 바닥복사난방\n3. 천장복사냉방\n4. 장단점' },
        { id: 26, question: '지역냉난방의 특징을 설명하시오.', answer: '열병합발전, 에너지절약', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 지역냉난방의 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지역냉난방의 개념\n2. 열병합발전\n3. 장단점\n4. 건물 연결 방식' },
        { id: 27, question: '히트펌프의 원리와 종류를 설명하시오.', answer: '냉매 사이클, 공기열원·지열원', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 히트펌프의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 히트펌프의 원리\n2. 공기열원 히트펌프\n3. 지열원 히트펌프\n4. COP(성능계수)' },
        { id: 28, question: '보일러의 종류와 특징을 설명하시오.', answer: '주철제, 강철제, 관류보일러', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 보일러의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주철제 보일러\n2. 강철제 보일러\n3. 관류보일러\n4. 콘덴싱보일러' },
        { id: 29, question: '냉동기의 종류와 특징을 설명하시오.', answer: '왕복동, 원심식, 흡수식 냉동기', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 냉동기의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 압축식 냉동기\n2. 흡수식 냉동기\n3. 각 냉동기의 장단점\n4. 적용 분야' },
        { id: 30, question: '축열시스템의 종류와 특징을 설명하시오.', answer: '빙축열, 수축열, 잠열축열', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 축열시스템의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 축열의 원리\n2. 빙축열 시스템\n3. 수축열 시스템\n4. 경제성 분석' },
      ],
    },
    {
      title: '환기·공조 설비',
      questions: [
        { id: 31, question: '환기의 목적과 종류를 설명하시오.', answer: '자연환기, 기계환기(1~3종)', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 환기의 목적과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환기의 목적\n2. 자연환기 방식\n3. 기계환기 방식(1종~3종)\n4. 적용 분야' },
        { id: 32, question: '필요환기량 산정방법을 설명하시오.', answer: '환기횟수법, CO2 기준법', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 필요환기량 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환기횟수법\n2. 1인당 필요 환기량\n3. CO2 농도 기준\n4. 용도별 환기 기준' },
        { id: 33, question: '공기조화의 4요소를 설명하시오.', answer: '온도, 습도, 기류, 청정도', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 공기조화의 4요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온도 조절\n2. 습도 조절\n3. 기류 조절\n4. 청정도(공기질) 관리' },
        { id: 34, question: '덕트의 종류와 설계방법을 설명하시오.', answer: '아연도금강판, 스파이럴, 플렉시블', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 덕트의 종류와 설계방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 덕트 재질별 종류\n2. 등속법 설계\n3. 정압재취득법\n4. 등마찰손실법' },
        { id: 35, question: '공조기(AHU)의 구성요소를 설명하시오.', answer: '필터, 코일, 가습기, 송풍기', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 공조기의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 에어필터\n2. 냉난방코일\n3. 가습기\n4. 송풍기' },
        { id: 36, question: '전열교환기의 원리와 종류를 설명하시오.', answer: '배기열회수, 현열·전열교환', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 전열교환기의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 열회수의 원리\n2. 현열교환기\n3. 전열교환기\n4. 효율과 적용' },
        { id: 37, question: 'VAV 시스템의 원리와 특징을 설명하시오.', answer: '가변풍량방식, 부하변동대응', prompt: '건축기사 건축설비 문제입니다.\n\n문제: VAV 시스템의 원리와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. VAV의 원리\n2. CAV와의 비교\n3. 에너지 절감 효과\n4. 제어 방식' },
        { id: 38, question: '실내공기질 관리기준을 설명하시오.', answer: 'CO2, PM10, TVOC, 포름알데히드', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 실내공기질 관리기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리 대상 오염물질\n2. 기준치\n3. 관리 방법\n4. 측정 및 모니터링' },
        { id: 39, question: '주방환기 계획을 설명하시오.', answer: '후드, 배기, 급기, 그리스필터', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 주방환기 계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 후드의 종류\n2. 배기량 산정\n3. 보충급기\n4. 그리스필터와 화재예방' },
        { id: 40, question: '지하주차장 환기계획을 설명하시오.', answer: 'CO 농도 기준, 환기횟수', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 지하주차장 환기계획을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CO 농도 기준\n2. 환기방식\n3. 급배기구 배치\n4. 제연설비와의 연계' },
      ],
    },
    {
      title: '전기·소방 설비',
      questions: [
        { id: 41, question: '건물의 전력공급방식을 설명하시오.', answer: '수전전압, 변압기, 배전반', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 건물의 전력공급방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수전전압 결정\n2. 변압기 용량 산정\n3. 배전반 구성\n4. 비상전원 설비' },
        { id: 42, question: '조명설비 계획의 기본원칙을 설명하시오.', answer: '조도, 균제도, 연색성, 글레어', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 조명설비 계획의 기본원칙을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조도 기준\n2. 균제도\n3. 연색성\n4. 눈부심(글레어) 방지' },
        { id: 43, question: '조명방식의 종류를 설명하시오.', answer: '직접조명, 간접조명, 반간접조명', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 조명방식의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 직접조명\n2. 간접조명\n3. 반간접/반직접조명\n4. 적용 공간' },
        { id: 44, question: '비상조명설비의 설치기준을 설명하시오.', answer: '정전 시 30분 이상 점등, 1lx 이상', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 비상조명설비의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상\n2. 조도 기준\n3. 점등 시간\n4. 전원 공급방식' },
        { id: 45, question: '스프링클러설비의 종류를 설명하시오.', answer: '습식, 건식, 준비작동식, 일제살수식', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 스프링클러설비의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 습식 스프링클러\n2. 건식 스프링클러\n3. 준비작동식\n4. 일제살수식' },
        { id: 46, question: '옥내소화전설비의 설치기준을 설명하시오.', answer: '호스릴이 25m 이내, 방수압력 0.17MPa', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 옥내소화전설비의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치 대상\n2. 수원 용량\n3. 배치 기준\n4. 방수 성능' },
        { id: 47, question: '제연설비의 종류와 원리를 설명하시오.', answer: '거실제연, 특별피난계단 제연', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 제연설비의 종류와 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제연의 목적\n2. 거실제연설비\n3. 특별피난계단 제연\n4. 차압 기준' },
        { id: 48, question: '자동화재탐지설비의 구성을 설명하시오.', answer: '감지기, 발신기, 수신기, 경보장치', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 자동화재탐지설비의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 감지기의 종류\n2. 발신기\n3. 수신기\n4. 경보장치' },
        { id: 49, question: '승강기의 종류와 설치기준을 설명하시오.', answer: '승객용, 화물용, 비상용 승강기', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 승강기의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 승강기의 종류\n2. 설치 대상 건물\n3. 대수 산정\n4. 비상용 승강기' },
        { id: 50, question: '피뢰설비의 원리와 설치기준을 설명하시오.', answer: '수뢰부, 인하도선, 접지극', prompt: '건축기사 건축설비 문제입니다.\n\n문제: 피뢰설비의 원리와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피뢰의 원리\n2. 수뢰부\n3. 인하도선\n4. 접지 시스템' },
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
            <span className="text-orange-500">🔧</span> 건축설비
          </h1>
          <p className="text-gray-500 mt-1">건축기사 필기 3과목 (50문항)</p>
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
