'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function FacilityIntroStudyPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('housing-facility-intro-completed');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('housing-facility-intro-completed', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleQuestion = (id: number) => {
    setCompletedQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const topics = [
    {
      name: '건축구조 일반',
      questions: [
        { id: 1, question: '철근콘크리트 구조의 특징과 장단점을 설명하시오.', answer: '철근의 인장력과 콘크리트의 압축력을 조합, 내화성·내구성 우수하나 자중이 크고 공기가 김', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 철근콘크리트 구조의 특징과 장단점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 철근콘크리트의 원리\n2. 장점(내화성, 내구성)\n3. 단점(자중, 공기)\n4. 아파트 적용사례\n5. 연습문제 3개' },
        { id: 2, question: '라멘구조와 벽식구조의 차이점을 설명하시오.', answer: '라멘구조는 기둥+보, 벽식구조는 벽체가 하중지지, 아파트는 주로 벽식', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 라멘구조와 벽식구조의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 라멘구조의 특징\n2. 벽식구조의 특징\n3. 아파트에서의 적용\n4. 리모델링 시 고려사항\n5. 연습문제 3개' },
        { id: 3, question: '콘크리트의 균열 원인과 보수방법을 설명하시오.', answer: '건조수축, 온도변화, 하중 등이 원인, 에폭시 주입, 표면처리 등으로 보수', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 콘크리트의 균열 원인과 보수방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 균열의 원인\n2. 균열의 종류\n3. 보수방법\n4. 예방대책\n5. 연습문제 3개' },
        { id: 4, question: '방수공사의 종류와 특징을 설명하시오.', answer: '아스팔트방수, 시트방수, 도막방수, 시멘트계 방수 등', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 방수공사의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 방수공법의 분류\n2. 아스팔트 방수\n3. 시트 방수\n4. 옥상방수 유지관리\n5. 연습문제 3개' },
        { id: 5, question: '단열공사의 목적과 방법을 설명하시오.', answer: '열손실 방지, 결로 예방, 내단열/외단열/중단열 공법', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 단열공사의 목적과 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 단열의 목적\n2. 단열재의 종류\n3. 단열공법(내·외·중)\n4. 결로 예방\n5. 연습문제 3개' },
        { id: 6, question: '외벽 마감재의 종류와 유지관리를 설명하시오.', answer: '타일, 석재, 금속패널, 드라이비트 등, 정기점검과 보수 필요', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 외벽 마감재의 종류와 유지관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 외벽 마감재 종류\n2. 각 재료의 특성\n3. 하자유형\n4. 유지관리 방법\n5. 연습문제 3개' },
        { id: 7, question: '창호의 종류와 단열성능을 설명하시오.', answer: '알루미늄, PVC, 시스템창호 등, 복층유리로 단열성능 확보', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 창호의 종류와 단열성능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 창호 재질별 특성\n2. 유리의 종류\n3. 단열성능 지표\n4. 결로 예방\n5. 연습문제 3개' },
        { id: 8, question: '지하주차장 구조와 환기설비를 설명하시오.', answer: '피트구조/기계식, 환기설비(급배기 팬)로 CO 농도 관리', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 지하주차장 구조와 환기설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 주차장 구조형식\n2. 환기설비 기준\n3. CO 농도 관리\n4. 조명설비\n5. 연습문제 3개' },
        { id: 9, question: '옥상 구조물의 종류와 관리를 설명하시오.', answer: '물탱크, 기계실, 안테나 등, 정기점검과 방수관리 필요', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 옥상 구조물의 종류와 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 옥상 구조물 종류\n2. 구조 안전점검\n3. 방수관리\n4. 안전시설\n5. 연습문제 3개' },
        { id: 10, question: '건물 하자의 종류와 점검방법을 설명하시오.', answer: '구조적 하자, 마감 하자, 설비 하자 등, 육안점검과 계측기 활용', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 건물 하자의 종류와 점검방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 하자의 분류\n2. 구조적 하자 점검\n3. 마감 하자 점검\n4. 하자담보책임기간\n5. 연습문제 3개' }
      ]
    },
    {
      name: '급배수 위생설비',
      questions: [
        { id: 11, question: '급수방식의 종류와 특징을 설명하시오.', answer: '수도직결방식, 고가수조방식, 압력탱크방식, 부스터펌프방식', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 급수방식의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수도직결방식\n2. 고가수조방식\n3. 부스터펌프방식\n4. 아파트 급수방식 선택\n5. 연습문제 3개' },
        { id: 12, question: '급수관의 종류와 특성을 설명하시오.', answer: '강관, 동관, 스테인리스관, PE관, PB관 등', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 급수관의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배관재질별 특성\n2. 장단점 비교\n3. 부식과 스케일\n4. 관 교체시기\n5. 연습문제 3개' },
        { id: 13, question: '수질검사 항목과 기준을 설명하시오.', answer: '일반세균, 대장균군, 잔류염소, 탁도, pH 등 먹는물수질기준', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 수질검사 항목과 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수질검사 항목\n2. 적합기준\n3. 검사주기\n4. 저수조 청소\n5. 연습문제 3개' },
        { id: 14, question: '배수트랩의 종류와 기능을 설명하시오.', answer: 'P트랩, S트랩, U트랩 등으로 하수가스 역류 방지', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 배수트랩의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 트랩의 원리\n2. 트랩의 종류\n3. 봉수 파괴 원인\n4. 유지관리\n5. 연습문제 3개' },
        { id: 15, question: '통기설비의 목적과 종류를 설명하시오.', answer: '배수원활, 트랩 봉수 보호, 개별통기·루프통기·신정통기', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 통기설비의 목적과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통기의 목적\n2. 통기방식의 종류\n3. 설치기준\n4. 유지관리\n5. 연습문제 3개' },
        { id: 16, question: '급탕설비의 구성과 관리를 설명하시오.', answer: '보일러, 저탕조, 순환펌프, 배관으로 구성, 레지오넬라균 관리', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 급탕설비의 구성과 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 급탕방식\n2. 급탕설비 구성\n3. 온도관리\n4. 레지오넬라균 예방\n5. 연습문제 3개' },
        { id: 17, question: '펌프의 종류와 특성을 설명하시오.', answer: '원심펌프, 터빈펌프, 수중펌프 등, 양정·양수량으로 선정', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 펌프의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 펌프의 분류\n2. 원심펌프 원리\n3. 양정과 양수량\n4. 고장진단과 정비\n5. 연습문제 3개' },
        { id: 18, question: '오수정화조의 종류와 관리를 설명하시오.', answer: '부패탱크형, 폭기형, 접촉산화형, 정기 청소와 방류수질 관리', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 오수정화조의 종류와 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정화조 원리\n2. 처리방식 종류\n3. 방류수질 기준\n4. 유지관리\n5. 연습문제 3개' },
        { id: 19, question: '위생기구의 종류와 설치기준을 설명하시오.', answer: '양변기, 세면기, 욕조, 싱크대 등, 관련법규에 따른 설치', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 위생기구의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 위생기구 종류\n2. 급배수 연결\n3. 설치기준\n4. 절수형 기구\n5. 연습문제 3개' },
        { id: 20, question: '수도계량기의 검침과 관리를 설명하시오.', answer: '적산식 계량기로 사용량 측정, 정기검정과 교체 필요', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 수도계량기의 검침과 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수도계량기 종류\n2. 검침 방법\n3. 검정유효기간\n4. 교체기준\n5. 연습문제 3개' }
      ]
    },
    {
      name: '냉난방 공조설비',
      questions: [
        { id: 21, question: '중앙난방과 개별난방의 차이를 설명하시오.', answer: '중앙난방은 기계실 집중공급, 개별난방은 세대별 보일러', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 중앙난방과 개별난방의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 중앙난방의 특징\n2. 개별난방의 특징\n3. 장단점 비교\n4. 운영관리 차이\n5. 연습문제 3개' },
        { id: 22, question: '지역난방시스템의 구성과 관리를 설명하시오.', answer: '열공급사→기계실→세대, 열교환기와 유량계 관리 중요', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 지역난방시스템의 구성과 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지역난방 개요\n2. 공급설비 구성\n3. 열량계량\n4. 관리포인트\n5. 연습문제 3개' },
        { id: 23, question: '보일러의 종류와 특성을 설명하시오.', answer: '가스보일러, 기름보일러, 콘덴싱보일러 등', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 보일러의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보일러 분류\n2. 연료별 특성\n3. 콘덴싱 보일러\n4. 안전관리\n5. 연습문제 3개' },
        { id: 24, question: '바닥난방(온돌)의 구조와 관리를 설명하시오.', answer: '온수배관+모르타르 구조, 배관누수와 온도편차 관리', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 바닥난방(온돌)의 구조와 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 온돌구조\n2. 배관재질\n3. 누수탐지\n4. 하자보수\n5. 연습문제 3개' },
        { id: 25, question: '에어컨의 종류와 원리를 설명하시오.', answer: '냉매 압축→응축→팽창→증발 사이클, 벽걸이/스탠드/시스템에어컨', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 에어컨의 종류와 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 냉동사이클 원리\n2. 에어컨 종류\n3. 냉매의 종류\n4. 유지관리\n5. 연습문제 3개' },
        { id: 26, question: '환기설비의 종류와 설계기준을 설명하시오.', answer: '자연환기, 기계환기(1·2·3종), 환기횟수 기준', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 환기설비의 종류와 설계기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 환기의 목적\n2. 환기방식 종류\n3. 환기횟수 기준\n4. 열회수 환기장치\n5. 연습문제 3개' },
        { id: 27, question: '덕트의 종류와 관리를 설명하시오.', answer: '아연도강판, 글라스울 덕트 등, 청소와 누기 점검 필요', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 덕트의 종류와 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 덕트 재질\n2. 덕트 형상\n3. 누기 점검\n4. 청소방법\n5. 연습문제 3개' },
        { id: 28, question: '실내공기질 관리기준을 설명하시오.', answer: 'PM10, CO2, 폼알데히드 등 관리기준, 신축건물 측정의무', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 실내공기질 관리기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관리대상물질\n2. 유지기준\n3. 측정방법\n4. 개선대책\n5. 연습문제 3개' },
        { id: 29, question: '냉온수배관의 보온과 관리를 설명하시오.', answer: '열손실 방지, 결로 예방 위해 보온재 시공, 정기점검', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 냉온수배관의 보온과 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 보온의 목적\n2. 보온재 종류\n3. 시공방법\n4. 점검과 보수\n5. 연습문제 3개' },
        { id: 30, question: '자동제어설비의 종류와 기능을 설명하시오.', answer: '온도조절기, BAS(빌딩자동화시스템), 에너지 절감 효과', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 자동제어설비의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자동제어 개요\n2. 제어요소\n3. BAS 시스템\n4. 에너지관리\n5. 연습문제 3개' }
      ]
    },
    {
      name: '전기·소방설비',
      questions: [
        { id: 31, question: '수변전설비의 구성과 관리를 설명하시오.', answer: '수전→변압기→배전반 구성, 정기점검과 절연저항 측정', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 수변전설비의 구성과 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수변전설비 구성\n2. 변압기 종류\n3. 정기점검 항목\n4. 안전관리\n5. 연습문제 3개' },
        { id: 32, question: '배선방식의 종류와 특징을 설명하시오.', answer: '단상2선, 단상3선, 3상4선식 등, 부하특성에 따라 선정', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 배선방식의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 배선방식 종류\n2. 전압과 전류\n3. 중성선의 역할\n4. 세대 배전방식\n5. 연습문제 3개' },
        { id: 33, question: '접지설비의 목적과 종류를 설명하시오.', answer: '감전방지, 기기보호 목적, 제1종~특별3종 접지', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 접지설비의 목적과 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 접지의 목적\n2. 접지종류별 기준\n3. 접지저항 측정\n4. 유지관리\n5. 연습문제 3개' },
        { id: 34, question: '비상발전기의 구조와 관리를 설명하시오.', answer: '디젤발전기로 비상시 전력공급, 정기 시운전과 연료관리', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 비상발전기의 구조와 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 비상발전기 구성\n2. 자동절환장치\n3. 정기점검 항목\n4. 연료저장관리\n5. 연습문제 3개' },
        { id: 35, question: '소방시설의 종류를 설명하시오.', answer: '소화설비, 경보설비, 피난설비, 소화활동설비로 분류', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 소방시설의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 소화설비\n2. 경보설비\n3. 피난설비\n4. 소화활동설비\n5. 연습문제 3개' },
        { id: 36, question: '스프링클러설비의 원리와 관리를 설명하시오.', answer: '화재 시 열로 헤드 개방, 자동 살수, 정기점검과 동파방지', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 스프링클러설비의 원리와 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 작동원리\n2. 헤드 종류\n3. 습식/건식 방식\n4. 점검과 시험\n5. 연습문제 3개' },
        { id: 37, question: '자동화재탐지설비의 구성을 설명하시오.', answer: '감지기→수신기→발신기→경종으로 구성, 감지기 종류별 설치', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 자동화재탐지설비의 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설비 구성요소\n2. 감지기 종류\n3. 수신기 기능\n4. 작동시험\n5. 연습문제 3개' },
        { id: 38, question: '피난설비의 종류와 설치기준을 설명하시오.', answer: '피난기구, 유도등, 비상조명등, 비상구 등', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 피난설비의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 피난기구 종류\n2. 유도등 설치기준\n3. 비상조명등\n4. 피난안내도\n5. 연습문제 3개' },
        { id: 39, question: '소방시설 자체점검의 종류와 주기를 설명하시오.', answer: '작동기능점검(반기 1회), 종합정밀점검(연 1회)', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 소방시설 자체점검의 종류와 주기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 점검 종류\n2. 점검주기\n3. 점검자 자격\n4. 점검결과 보고\n5. 연습문제 3개' },
        { id: 40, question: '조명설비의 종류와 효율관리를 설명하시오.', answer: 'LED, 형광등 등 광원종류, 조도기준과 에너지절감', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 조명설비의 종류와 효율관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 광원의 종류\n2. 조도기준\n3. LED 조명\n4. 에너지절감방안\n5. 연습문제 3개' }
      ]
    },
    {
      name: '승강기·가스·통신설비',
      questions: [
        { id: 41, question: '승강기의 종류와 구조를 설명하시오.', answer: '로프식(트랙션), 유압식 등, 권상기·로프·카·카운터웨이트 구성', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 승강기의 종류와 구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 승강기 분류\n2. 로프식 구조\n3. 유압식 구조\n4. 안전장치\n5. 연습문제 3개' },
        { id: 42, question: '승강기 안전장치의 종류와 기능을 설명하시오.', answer: '조속기, 비상정지장치, 완충기, 도어인터록 등', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 승강기 안전장치의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 조속기의 기능\n2. 비상정지장치\n3. 완충기\n4. 도어장치\n5. 연습문제 3개' },
        { id: 43, question: '승강기 안전검사의 종류와 주기를 설명하시오.', answer: '완성검사, 정기검사(1년), 수시검사', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 승강기 안전검사의 종류와 주기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완성검사\n2. 정기검사\n3. 수시검사\n4. 자체점검\n5. 연습문제 3개' },
        { id: 44, question: '가스설비의 종류와 구성을 설명하시오.', answer: '도시가스(LNG), LPG, 공급관·차단장치·계량기·연소기기', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 가스설비의 종류와 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 도시가스와 LPG\n2. 공급설비 구성\n3. 안전장치\n4. 계량기 관리\n5. 연습문제 3개' },
        { id: 45, question: '가스누출경보기의 설치기준을 설명하시오.', answer: '연소기로부터 수평 4m 이내, 바닥 30cm 이내(LPG는 천장)', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 가스누출경보기의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 설치위치 기준\n2. 가스종류별 차이\n3. 작동원리\n4. 점검방법\n5. 연습문제 3개' },
        { id: 46, question: '가스안전점검의 종류와 주기를 설명하시오.', answer: '정기검사(2년), 수시검사, 안전점검', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 가스안전점검의 종류와 주기를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정기검사\n2. 수시검사\n3. 자체점검\n4. 점검항목\n5. 연습문제 3개' },
        { id: 47, question: '통신설비의 종류와 관리를 설명하시오.', answer: '전화, 인터넷, TV, 인터폰 등, MDF·IDF 관리', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 통신설비의 종류와 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 통신설비 종류\n2. 배선체계(MDF/IDF)\n3. 인터넷 설비\n4. 유지관리\n5. 연습문제 3개' },
        { id: 48, question: 'CCTV 설비의 구성과 관리를 설명하시오.', answer: '카메라·DVR·모니터 구성, 화질관리와 저장기간 준수', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: CCTV 설비의 구성과 관리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CCTV 구성요소\n2. 설치기준\n3. 영상저장 기간\n4. 개인정보보호\n5. 연습문제 3개' },
        { id: 49, question: '주차관제설비의 종류와 기능을 설명하시오.', answer: '차량인식시스템, 주차유도시스템, 무인정산시스템', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 주차관제설비의 종류와 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 차량인식 방식\n2. 주차유도시스템\n3. 무인정산\n4. 유지관리\n5. 연습문제 3개' },
        { id: 50, question: '홈네트워크설비의 구성과 기능을 설명하시오.', answer: '월패드, 서버, 네트워크 구성, 원격검침·보안연동', prompt: '주택관리사 공동주택시설개론 문제입니다.\n\n문제: 홈네트워크설비의 구성과 기능을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 홈네트워크 개념\n2. 구성요소\n3. 주요기능\n4. 유지관리\n5. 연습문제 3개' }
      ]
    }
  ];

  const totalQuestions = topics.reduce((acc, topic) => acc + topic.questions.length, 0);
  const progress = Math.round((completedQuestions.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance" className="text-gray-500 hover:text-gray-700">보험·부동산</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/insurance/housing-manager" className="text-gray-500 hover:text-gray-700">주택관리사(보)</Link>
            <span className="text-gray-300">/</span>
            <span className="text-teal-600 font-medium">공동주택시설개론</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🏗️ 공동주택시설개론</h1>
          <p className="text-gray-600">주택관리사(보) 2차 시험 - 공동주택시설개론 학습</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">학습 진행률</span>
            <span className="text-teal-600 font-bold">{completedQuestions.length}/{totalQuestions} ({progress}%)</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {topics.map((topic, topicIdx) => (
            <div key={topicIdx} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <button
                onClick={() => setOpenTopics(prev => prev.includes(topicIdx) ? prev.filter(t => t !== topicIdx) : [...prev, topicIdx])}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{topicIdx + 1}</span>
                  <span className="font-bold">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.questions.filter(q => completedQuestions.includes(q.id)).length}/{topic.questions.length})</span>
                </div>
                <span className={`transform transition ${openTopics.includes(topicIdx) ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openTopics.includes(topicIdx) && (
                <div className="border-t divide-y">
                  {topic.questions.map((q) => (
                    <div key={q.id} className="p-4">
                      <div className="flex gap-4">
                        <input
                          type="checkbox"
                          checked={completedQuestions.includes(q.id)}
                          onChange={() => toggleQuestion(q.id)}
                          className="mt-1 w-5 h-5 rounded text-teal-600 shrink-0"
                        />
                        <div className="flex-1">
                          <p className="font-medium mb-2">{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-2">{q.answer}</p>
                          <button
                            onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                            className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition"
                          >
                            🤖 AI에게 자세히 묻기
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

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/category/insurance/housing-manager" className="text-teal-600 hover:text-teal-700 font-medium">
            ← 주택관리사(보) 메인으로
          </Link>
        </div>
      </main>

      {/* AI Modal */}
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
                <a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200">
                  <span className="text-2xl">🧡</span>
                  <div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span>
                  <div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span>
                  <div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 자격증 가이드. 주택관리사(보) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
