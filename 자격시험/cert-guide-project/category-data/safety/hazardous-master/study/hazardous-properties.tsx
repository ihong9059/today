'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'class-1',
    name: '제1류 위험물 (산화성 고체)',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      { id: 1, question: '염소산염류의 성질과 소화방법을 설명하시오.', answer: '지정수량 50kg, 무색결정, 가열·충격에 분해하여 산소 발생, 가연물과 혼합 시 폭발위험. 소화: 주수 냉각', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 염소산염류의 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 염소산염류의 종류\n2. 물리화학적 성질\n3. 위험성\n4. 저장 방법\n5. 화재 시 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '과염소산염류의 특성을 설명하시오.', answer: '지정수량 50kg, 강력한 산화제, 유기물과 접촉 시 발화·폭발, 습기 흡수, 물에 녹음', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 과염소산염류의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 과염소산염류의 종류\n2. 산화력 특성\n3. 혼합 위험 물질\n4. 저장·취급 주의사항\n5. 소화 방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '무기과산화물의 성질을 설명하시오.', answer: '지정수량 50kg, 산소 다량 함유, 물과 반응하여 산소 발생, 가열 시 폭발, 강산화제', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 무기과산화물의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무기과산화물의 종류\n2. 화학적 성질\n3. 물과의 반응\n4. 위험성\n5. 취급 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '질산염류의 특성을 설명하시오.', answer: '지정수량 300kg, 무색결정, 가열·충격에 분해, 산소 발생, 가연물과 혼합 시 위험', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 질산염류의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 질산염류의 종류\n2. 분해 특성\n3. 혼합 위험성\n4. 비료로서의 용도\n5. 저장·소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제1류 위험물의 공통 성질과 소화방법을 설명하시오.', answer: '공통성질: 산화성 고체, 산소 함유, 불연성, 가열·충격에 분해. 소화: 주수 냉각, 가연물 제거', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 제1류 위험물의 공통 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공통 화학적 성질\n2. 위험성\n3. 저장 시 주의사항\n4. 금지 물질(혼합 금지)\n5. 화재 시 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class-2',
    name: '제2류 위험물 (가연성 고체)',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '유황의 성질과 소화방법을 설명하시오.', answer: '지정수량 100kg, 담황색 고체, 발화점 232℃, 정전기 발생, CS2에 녹음. 소화: 주수, 질식소화', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 유황의 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 화학적 성질\n3. 발화 특성\n4. 정전기 위험\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '적린과 황린의 차이를 설명하시오.', answer: '적린: 제2류, 지정수량 100kg, 안정, 발화점 260℃. 황린: 제3류, 지정수량 20kg, 자연발화(34℃), 물속 보관', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 적린과 황린의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적린의 성질\n2. 황린의 성질\n3. 위험물 분류 차이\n4. 발화점 비교\n5. 저장방법 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '금속분의 성질과 위험성을 설명하시오.', answer: '지정수량 500kg, 알루미늄·마그네슘 등, 표면적 넓어 산화 쉬움, 분진폭발 위험, 물과 반응', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 금속분의 성질과 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 금속분의 종류\n2. 발화 특성\n3. 분진폭발 위험\n4. 물과의 반응\n5. 소화방법(주수 금지)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '인화성 고체의 특성을 설명하시오.', answer: '지정수량 1000kg, 고형알코올 등, 낮은 인화점, 증기 발생하여 인화', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 인화성 고체의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화성 고체의 종류\n2. 인화점 특성\n3. 증기 발생\n4. 위험성\n5. 저장 및 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제2류 위험물의 공통 성질과 소화방법을 설명하시오.', answer: '공통성질: 가연성 고체, 낮은 발화점, 산화제와 혼합 위험. 소화: 주수, 질식소화(금속분 제외)', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 제2류 위험물의 공통 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공통 성질\n2. 발화 특성\n3. 혼합 금지 물질\n4. 저장 시 주의사항\n5. 소화방법(금속분 주의)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class-3',
    name: '제3류 위험물 (자연발화성·금수성)',
    color: 'from-red-500 to-pink-500',
    questions: [
      { id: 1, question: '나트륨(Na)의 성질과 취급방법을 설명하시오.', answer: '지정수량 10kg, 은백색 금속, 물과 격렬 반응(H2 발생), 공기 중 산화, 석유 중 보관', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 나트륨의 성질과 취급방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리적 성질\n2. 물과의 반응\n3. 공기 중 반응\n4. 저장방법(석유 중)\n5. 소화방법(주수 금지)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '황린(백린)의 위험성과 저장방법을 설명하시오.', answer: '지정수량 20kg, 담황색 고체, 발화점 34℃(공기 중 자연발화), 맹독성, 물속 저장', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 황린의 위험성과 저장방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자연발화 특성\n2. 독성\n3. 물속 저장 이유\n4. 취급 시 주의사항\n5. 화재 시 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '알킬알루미늄의 성질을 설명하시오.', answer: '지정수량 10kg, 트리에틸알루미늄 등, 공기 중 자연발화, 물과 격렬 반응, 불활성가스 중 저장', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 알킬알루미늄의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화학적 성질\n2. 자연발화성\n3. 물과의 반응\n4. 저장방법(질소 치환)\n5. 누출 시 대응\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '칼슘(Ca)과 탄화칼슘(CaC2)을 비교하시오.', answer: 'Ca: 지정수량 50kg, 금수성, 물과 반응(H2 발생). CaC2: 지정수량 300kg, 물과 반응(C2H2 발생)', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 칼슘과 탄화칼슘을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 칼슘의 성질\n2. 탄화칼슘의 성질\n3. 물과의 반응 비교\n4. 발생 가스 차이\n5. 각각의 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제3류 위험물의 공통 성질과 소화방법을 설명하시오.', answer: '공통성질: 자연발화성 또는 금수성, 공기·물과 반응, 가연성 가스 발생. 소화: 주수 금지, 건조사, 팽창질석', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 제3류 위험물의 공통 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자연발화성 물질\n2. 금수성 물질\n3. 공통 위험성\n4. 저장 방법\n5. 소화방법(주수 금지 이유)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class-4',
    name: '제4류 위험물 (인화성 액체)',
    color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: '특수인화물의 정의와 종류를 설명하시오.', answer: '발화점≤100℃ 또는 인화점<-20℃. 디에틸에테르, 이황화탄소 등. 지정수량 50L', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 특수인화물의 정의와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 특수인화물 정의\n2. 대표 물질\n3. 위험성\n4. 저장·취급 기준\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '제1석유류와 제2석유류를 비교하시오.', answer: '제1석유류: 인화점 21℃ 미만, 휘발유·아세톤 등, 200L. 제2석유류: 인화점 21~70℃, 등유·경유 등, 1000L', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 제1석유류와 제2석유류를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 범위\n2. 대표 물질\n3. 지정수량\n4. 위험성 비교\n5. 저장 기준 차이\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '알코올류의 성질과 소화방법을 설명하시오.', answer: '지정수량 400L, 메탄올·에탄올 등, 수용성, 증기 인화 위험. 소화: 내알코올포, CO2', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 알코올류의 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 알코올류의 종류\n2. 수용성 특성\n3. 인화점 및 발화점\n4. 독성(메탄올)\n5. 소화방법(내알코올포)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '휘발유의 위험성을 설명하시오.', answer: '제1석유류, 인화점 -40℃ 이하, 증기 폭발 위험, 정전기 발생, 비수용성', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 휘발유의 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 인화점 및 발화점\n2. 증기압 특성\n3. 정전기 발생\n4. 취급 시 주의사항\n5. 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제4류 위험물의 공통 성질과 소화방법을 설명하시오.', answer: '공통성질: 인화성 액체, 증기 발생, 비중<1(물에 뜸), 정전기. 소화: 포, CO2, 분말(주수 금지)', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 제4류 위험물의 공통 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공통 물리적 성질\n2. 증기 특성\n3. 정전기 위험\n4. 저장 시 주의사항\n5. 소화방법(주수 금지 이유)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class-5',
    name: '제5류 위험물 (자기반응성)',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      { id: 1, question: '니트로글리세린의 성질과 위험성을 설명하시오.', answer: '지정수량 10kg, 질산에스테르류, 충격·마찰에 폭발, 다이너마이트 원료, 독성', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 니트로글리세린의 성질과 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화학적 성질\n2. 폭발 특성\n3. 충격 감도\n4. 안정화 방법\n5. 취급 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: 'TNT(트리니트로톨루엔)의 특성을 설명하시오.', answer: '지정수량 200kg, 니트로화합물, 담황색 결정, 폭발력 강함, 비교적 안정', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: TNT의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리화학적 성질\n2. 폭발 특성\n3. 안정성\n4. 용도\n5. 저장 및 취급\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '니트로셀룰로오스의 성질을 설명하시오.', answer: '지정수량 10kg, 질산에스테르류, 자기연소 가능, 알코올 습윤 저장, 건조 시 폭발 위험', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 니트로셀룰로오스의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조 방법\n2. 자기연소 특성\n3. 저장방법(습윤)\n4. 건조 시 위험성\n5. 용도\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '과산화벤조일의 성질을 설명하시오.', answer: '지정수량 10kg, 유기과산화물, 가열·충격에 분해, 폴리머 개시제, 가연물과 혼합 위험', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 과산화벤조일의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 화학적 성질\n2. 분해 특성\n3. 용도(중합 개시제)\n4. 위험성\n5. 저장 및 취급\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제5류 위험물의 공통 성질과 소화방법을 설명하시오.', answer: '공통성질: 자기반응성, 가열·충격에 폭발, 산소 함유(자기연소). 소화: 주수 냉각, 폭발 위험 시 대피', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 제5류 위험물의 공통 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자기반응성\n2. 폭발 특성\n3. 자기연소 가능\n4. 저장 시 주의사항\n5. 소화방법(주수 냉각)\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  },
  {
    id: 'class-6',
    name: '제6류 위험물 (산화성 액체)',
    color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: '과염소산의 성질과 위험성을 설명하시오.', answer: '지정수량 300kg, 무색 액체, 강산화제, 유기물과 접촉 시 발화·폭발, 흡습성', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 과염소산의 성질과 위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리화학적 성질\n2. 산화력\n3. 유기물과 반응\n4. 위험성\n5. 저장 및 취급\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 2, question: '질산의 종류와 성질을 설명하시오.', answer: '발연질산(농도 98% 이상), 농질산(60% 이상). 강산화제, 금속 용해, 유기물과 반응', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 질산의 종류와 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발연질산\n2. 농질산\n3. 산화 특성\n4. 금속과의 반응\n5. 저장 용기\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 3, question: '과산화수소의 성질과 분해를 설명하시오.', answer: '지정수량 300kg, 무색 액체, 산화·환원제, 광·열·촉매에 분해(O2 발생), 폭발 위험', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 과산화수소의 성질과 분해를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 물리화학적 성질\n2. 산화·환원 특성\n3. 분해 반응\n4. 안정제 사용\n5. 저장 및 취급\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 4, question: '할로겐 간 화합물의 성질을 설명하시오.', answer: '지정수량 300kg, 삼불화브롬 등, 강산화제, 물과 격렬 반응, 부식성', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 할로겐 간 화합물의 성질을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 할로겐 간 화합물의 종류\n2. 산화력\n3. 물과의 반응\n4. 부식성\n5. 취급 시 주의사항\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' },
      { id: 5, question: '제6류 위험물의 공통 성질과 소화방법을 설명하시오.', answer: '공통성질: 산화성 액체, 강산, 부식성, 불연성, 유기물과 반응. 소화: 주수, 건조사, 소다회', prompt: '위험물기능장 위험물의 성질 문제입니다.\n\n문제: 제6류 위험물의 공통 성질과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 공통 화학적 성질\n2. 산화력\n3. 부식성\n4. 저장 용기\n5. 화재 시 소화방법\n\n비슷한 유형의 연습문제 2개도 만들어주세요.' }
    ]
  }
];

export default function HazardousPropertiesStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('hazardous-master-hazardous-properties-completed');
    if (saved) {
      const arr = JSON.parse(saved);
      const obj: Record<string, boolean> = {};
      arr.forEach((key: string) => { obj[key] = true; });
      setCompletedQuestions(obj);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    const arr = Object.keys(newCompleted).filter(k => newCompleted[k]);
    localStorage.setItem('hazardous-master-hazardous-properties-completed', JSON.stringify(arr));
  };

  const getCompletedCount = (topicId: string) => {
    return Object.keys(completedQuestions).filter(key => key.startsWith(topicId) && completedQuestions[key]).length;
  };

  const totalCompleted = Object.values(completedQuestions).filter(Boolean).length;
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-yellow-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety" className="text-gray-600 hover:text-yellow-600">안전·소방</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/safety/hazardous-master" className="text-gray-600 hover:text-yellow-600">위험물기능장</Link>
            <span className="text-gray-300">›</span>
            <span className="text-yellow-600 font-medium">위험물의 성질</span>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚗️</span>
            <h1 className="text-2xl font-bold text-gray-800">위험물의 성질 학습하기</h1>
          </div>
          <p className="text-gray-600 mb-4">위험물기능장 필기시험 핵심 과목</p>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">전체 진도율</span>
              <span className="text-sm font-medium text-yellow-600">{totalCompleted}/{totalQuestions} 완료</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full transition-all" style={{ width: `${(totalCompleted / totalQuestions) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full p-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm opacity-80">({getCompletedCount(topic.id)}/{topic.questions.length})</span>
                </div>
                <span className="text-xl">{expandedTopics[topic.id] ? '▲' : '▼'}</span>
              </button>

              {expandedTopics[topic.id] && (
                <div className="p-4 space-y-4">
                  {topic.questions.map((q) => {
                    const key = `${topic.id}-${q.id}`;
                    const isCompleted = completedQuestions[key];
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${isCompleted ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {isCompleted ? '✓' : q.id}
                          </span>
                          <p className="flex-1 text-gray-800 font-medium">{q.question}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-3"><strong>정답:</strong> {q.answer}</p>
                        <div className="flex gap-2 flex-wrap">
                          <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition">
                            🧡 Claude
                          </a>
                          <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
                            💚 ChatGPT
                          </a>
                          <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                            💙 Gemini
                          </a>
                          <button onClick={() => toggleComplete(topic.id, q.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>
                            {isCompleted ? '완료 취소' : '✓ 완료'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
