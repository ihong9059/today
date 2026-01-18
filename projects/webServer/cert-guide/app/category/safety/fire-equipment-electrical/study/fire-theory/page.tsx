'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function FireTheoryStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['combustion']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fire-elec-theory-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('fire-elec-theory-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 연소의 정의와 조건 (1-5)
    { id: 1, topic: 'combustion', question: '연소의 3요소(가연물, 산소공급원, 점화원)에 대해 설명하시오.', answer: '가연물+산소+점화원이 동시에 존재해야 연소 발생', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 연소의 3요소(가연물, 산소공급원, 점화원)에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 2, topic: 'combustion', question: '연소의 4요소(연쇄반응 포함)와 그 의미를 설명하시오.', answer: '3요소+연쇄반응, 자유라디칼의 연쇄적 화학반응', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 연소의 4요소(연쇄반응 포함)와 그 의미를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 3, topic: 'combustion', question: '연소의 형태(표면연소, 증발연소, 분해연소, 자기연소)를 비교 설명하시오.', answer: '물질 상태와 특성에 따른 연소 형태 분류', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 연소의 형태(표면연소, 증발연소, 분해연소, 자기연소)를 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 4, topic: 'combustion', question: '인화점, 발화점, 연소점의 차이를 설명하시오.', answer: '인화점<연소점<발화점 순서, 각각의 정의와 특성', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 인화점, 발화점, 연소점의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 5, topic: 'combustion', question: '연소범위(폭발한계)와 위험도 계산방법을 설명하시오.', answer: 'LEL~UEL 사이 농도에서 연소, 위험도=(UEL-LEL)/LEL', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 연소범위(폭발한계)와 위험도 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 화재의 분류 (6-10)
    { id: 6, topic: 'fire-class', question: 'A급 화재(일반화재)의 특성과 적응 소화약제를 설명하시오.', answer: '일반 가연물(목재, 종이 등), 물·강화액 사용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: A급 화재(일반화재)의 특성과 적응 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 7, topic: 'fire-class', question: 'B급 화재(유류화재)의 특성과 적응 소화약제를 설명하시오.', answer: '인화성 액체, 포·CO2·분말 소화약제 사용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: B급 화재(유류화재)의 특성과 적응 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 8, topic: 'fire-class', question: 'C급 화재(전기화재)의 특성과 적응 소화약제를 설명하시오.', answer: '전기설비 화재, 비전도성 약제(CO2, 분말, 할론) 사용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: C급 화재(전기화재)의 특성과 적응 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 9, topic: 'fire-class', question: 'D급 화재(금속화재)의 특성과 소화방법을 설명하시오.', answer: '가연성 금속(Mg, Na 등), 건조사·팽창질석 사용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: D급 화재(금속화재)의 특성과 소화방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 10, topic: 'fire-class', question: 'K급 화재(주방화재)의 특성과 적응 소화약제를 설명하시오.', answer: '식용유 화재, K급 소화기(습식화학소화약제) 사용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: K급 화재(주방화재)의 특성과 적응 소화약제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 소화의 원리 (11-15)
    { id: 11, topic: 'extinguish', question: '질식소화의 원리와 적용 사례를 설명하시오.', answer: '산소농도 15% 이하로 저하, CO2·불활성가스 사용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 질식소화의 원리와 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 12, topic: 'extinguish', question: '냉각소화의 원리와 적용 사례를 설명하시오.', answer: '발화점 이하로 온도 저하, 물 소화가 대표적', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 냉각소화의 원리와 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 13, topic: 'extinguish', question: '제거소화의 원리와 적용 사례를 설명하시오.', answer: '가연물 제거, 산림화재 방화선 구축 등', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 제거소화의 원리와 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 14, topic: 'extinguish', question: '억제소화(부촉매소화)의 원리와 적용 사례를 설명하시오.', answer: '연쇄반응 차단, 할론·분말 소화약제 사용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 억제소화(부촉매소화)의 원리와 적용 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 15, topic: 'extinguish', question: '소화효과의 복합작용에 대해 설명하시오.', answer: '대부분 소화약제는 2가지 이상 소화효과 복합 작용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 소화효과의 복합작용에 대해 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 소화약제 (16-20)
    { id: 16, topic: 'extinguishant', question: '물 소화약제의 특성과 소화효과를 설명하시오.', answer: '비열·기화열 이용 냉각소화, 저렴하고 풍부', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 물 소화약제의 특성과 소화효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 17, topic: 'extinguishant', question: '포 소화약제의 종류와 특성을 설명하시오.', answer: '단백포, 합성계면활성제포, 수성막포 등 질식·냉각효과', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 포 소화약제의 종류와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 18, topic: 'extinguishant', question: '분말 소화약제의 종류와 적응 화재를 설명하시오.', answer: '제1종~제4종, ABC급 적응 분말이 범용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 분말 소화약제의 종류와 적응 화재를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 19, topic: 'extinguishant', question: 'CO2 소화약제의 특성과 소화효과를 설명하시오.', answer: '질식·냉각효과, 전기화재에 적합, 밀폐공간 주의', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: CO2 소화약제의 특성과 소화효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 20, topic: 'extinguishant', question: '할론 및 청정소화약제의 특성과 환경규제를 설명하시오.', answer: '부촉매효과, 오존층 파괴로 사용제한, 대체물질 개발', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 할론 및 청정소화약제의 특성과 환경규제를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 위험물의 분류 (21-25)
    { id: 21, topic: 'hazmat', question: '제1류 위험물(산화성 고체)의 특성과 저장취급 방법을 설명하시오.', answer: '자체 불연, 산소공급원, 가연물 접촉금지', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 제1류 위험물(산화성 고체)의 특성과 저장취급 방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 22, topic: 'hazmat', question: '제2류 위험물(가연성 고체)의 특성과 화재위험성을 설명하시오.', answer: '착화 용이, 연소속도 빠름, 분진폭발 위험', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 제2류 위험물(가연성 고체)의 특성과 화재위험성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 23, topic: 'hazmat', question: '제3류 위험물(자연발화성·금수성 물질)의 특성을 설명하시오.', answer: '공기·물 접촉 시 발화, 건조장소 보관', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 제3류 위험물(자연발화성·금수성 물질)의 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 24, topic: 'hazmat', question: '제4류 위험물(인화성 액체)의 특성과 위험등급을 설명하시오.', answer: '인화점 기준 분류, 특수인화물~제4석유류', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 제4류 위험물(인화성 액체)의 특성과 위험등급을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 25, topic: 'hazmat', question: '제5류·제6류 위험물의 특성과 위험성을 비교 설명하시오.', answer: '제5류: 자기반응성, 제6류: 산화성 액체', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 제5류·제6류 위험물의 특성과 위험성을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 건축방화 (26-30)
    { id: 26, topic: 'building-fire', question: '방화구획의 목적과 구획 기준을 설명하시오.', answer: '화재 확산 방지, 면적별·층별·용도별 구획', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 방화구획의 목적과 구획 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 27, topic: 'building-fire', question: '내화구조의 정의와 내화시간 기준을 설명하시오.', answer: '화재에 견디는 구조, 주요구조부별 내화시간 규정', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 내화구조의 정의와 내화시간 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 28, topic: 'building-fire', question: '방염과 난연의 차이 및 방염대상물품을 설명하시오.', answer: '방염: 섬유류, 난연: 건축재료, 커튼·카펫 등 대상', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 방염과 난연의 차이 및 방염대상물품을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 29, topic: 'building-fire', question: '방화문·방화셔터의 종류와 설치기준을 설명하시오.', answer: '갑종·을종 방화문, 내화성능 및 차연성능 기준', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 방화문·방화셔터의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 30, topic: 'building-fire', question: '건축물 마감재료의 불연·준불연·난연 기준을 설명하시오.', answer: '가열시험 결과에 따른 등급 분류, 용도별 적용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 건축물 마감재료의 불연·준불연·난연 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 피난계획 (31-35)
    { id: 31, topic: 'evacuation', question: '피난경로 계획의 원칙과 2방향 피난을 설명하시오.', answer: '최단거리, 단순명료, 2방향 피난로 확보 필수', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 피난경로 계획의 원칙과 2방향 피난을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 32, topic: 'evacuation', question: '피난시설(복도, 계단, 출입구)의 설치기준을 설명하시오.', answer: '폭·구조·위치 기준, 피난용량 확보', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 피난시설(복도, 계단, 출입구)의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 33, topic: 'evacuation', question: '특별피난계단과 피난안전구역의 설치기준을 설명하시오.', answer: '고층건물 피난, 부속실·배연설비 필요', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 특별피난계단과 피난안전구역의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 34, topic: 'evacuation', question: '피난기구(완강기, 구조대 등)의 종류와 설치기준을 설명하시오.', answer: '층수·용도별 적응 피난기구, 설치 개수 기준', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 피난기구(완강기, 구조대 등)의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 35, topic: 'evacuation', question: '피난시간 계산과 피난용량 산정방법을 설명하시오.', answer: 'RSET<ASET 원칙, 보행속도·유동계수 적용', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 피난시간 계산과 피난용량 산정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 소방시설 기초 (36-40)
    { id: 36, topic: 'fire-system', question: '소화설비의 종류와 분류체계를 설명하시오.', answer: '소화기구, 자동소화장치, 옥내외소화전 등', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 소화설비의 종류와 분류체계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 37, topic: 'fire-system', question: '경보설비의 종류와 작동원리를 설명하시오.', answer: '자동화재탐지설비, 비상경보설비, 시각경보기 등', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 경보설비의 종류와 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 38, topic: 'fire-system', question: '피난구조설비의 종류와 설치대상을 설명하시오.', answer: '피난기구, 유도등, 비상조명등, 피난유도선', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 피난구조설비의 종류와 설치대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 39, topic: 'fire-system', question: '소화용수설비와 소화활동설비를 설명하시오.', answer: '상수도소화용수, 소화수조, 연결송수관 등', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 소화용수설비와 소화활동설비를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 40, topic: 'fire-system', question: '특정소방대상물의 분류와 소방시설 적용기준을 설명하시오.', answer: '용도별 분류, 면적·층수별 설치기준', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 특정소방대상물의 분류와 소방시설 적용기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 연기와 유독가스 (41-45)
    { id: 41, topic: 'smoke', question: '연기의 발생 메커니즘과 특성을 설명하시오.', answer: '불완전연소 산물, 부력·기류 영향, 시야 장애', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 연기의 발생 메커니즘과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 42, topic: 'smoke', question: '연기의 유동특성과 제연방식을 설명하시오.', answer: '굴뚝효과, 압력차 이용 제연, 급배기 방식', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 연기의 유동특성과 제연방식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 43, topic: 'smoke', question: '화재 시 발생하는 유독가스의 종류와 인체 영향을 설명하시오.', answer: 'CO, HCN, HCl 등 질식·중독 위험', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 화재 시 발생하는 유독가스의 종류와 인체 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 44, topic: 'smoke', question: '일산화탄소(CO) 중독의 위험성과 허용농도를 설명하시오.', answer: 'Hb 결합력 산소의 200배, LC50 약 1.5%', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 일산화탄소(CO) 중독의 위험성과 허용농도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 45, topic: 'smoke', question: '감광계수와 연기농도 측정방법을 설명하시오.', answer: 'Cs=1/L×ln(I0/I), 광전식·이온화식 측정', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 감광계수와 연기농도 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },

    // 화재조사 (46-50)
    { id: 46, topic: 'investigation', question: '화재조사의 목적과 법적 근거를 설명하시오.', answer: '화재예방·진압 자료, 소방기본법 근거', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 화재조사의 목적과 법적 근거를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 47, topic: 'investigation', question: '발화원인의 분류와 판정방법을 설명하시오.', answer: '전기적·기계적·화학적·자연적 원인, 증거수집·분석', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 발화원인의 분류와 판정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 48, topic: 'investigation', question: '발화점 판정을 위한 연소흔적 분석방법을 설명하시오.', answer: 'V패턴, 탄화심도, 용융흔적 분석', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 발화점 판정을 위한 연소흔적 분석방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 49, topic: 'investigation', question: '전기화재 원인조사 방법과 감식기법을 설명하시오.', answer: '단락흔, 용융흔, 통전흔 구별, 1차·2차 단락 판정', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 전기화재 원인조사 방법과 감식기법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
    { id: 50, topic: 'investigation', question: '화재피해조사 및 화재증명원 발급절차를 설명하시오.', answer: '인명·재산피해 조사, 화재증명원 신청·발급', prompt: '소방설비기사(전기) 소방원론 문제입니다.\n\n문제: 화재피해조사 및 화재증명원 발급절차를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 기준\n4. 실무 적용\n5. 기출 포인트' },
  ];

  const topics = [
    { id: 'combustion', name: '연소의 정의와 조건', icon: '🔥', count: 5 },
    { id: 'fire-class', name: '화재의 분류', icon: '🏷️', count: 5 },
    { id: 'extinguish', name: '소화의 원리', icon: '🧯', count: 5 },
    { id: 'extinguishant', name: '소화약제', icon: '💧', count: 5 },
    { id: 'hazmat', name: '위험물의 분류', icon: '⚠️', count: 5 },
    { id: 'building-fire', name: '건축방화', icon: '🏢', count: 5 },
    { id: 'evacuation', name: '피난계획', icon: '🚪', count: 5 },
    { id: 'fire-system', name: '소방시설 기초', icon: '🚒', count: 5 },
    { id: 'smoke', name: '연기와 유독가스', icon: '💨', count: 5 },
    { id: 'investigation', name: '화재조사', icon: '🔍', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/safety" className="text-gray-500 hover:text-gray-700">안전·소방</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/safety/fire-equipment-electrical" className="text-gray-500 hover:text-gray-700">소방설비기사(전기)</Link>
            <span className="text-gray-300">/</span>
            <span className="text-orange-600 font-medium">소방원론</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">🔥</div>
            <div>
              <h1 className="text-2xl font-bold">소방원론</h1>
              <p className="text-orange-100">연소·화재·소화 이론 | 소방설비기사(전기) 필수과목</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>학습 진행률</span>
              <span>{completedQuestions.length} / {questions.length} ({progress}%)</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-orange-100 border-2 border-orange-300'
                    : 'bg-white border border-gray-200 hover:border-orange-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{topic.icon}</span>
                  <span className="font-medium text-sm">{topic.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{completed}/{topic.count} 완료</div>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            expandedTopics.includes(topic.id) && (
              <div key={topic.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
                  <h2 className="font-bold flex items-center gap-2">
                    <span>{topic.icon}</span> {topic.name}
                  </h2>
                  <span className="text-sm text-gray-500">{topic.count}문항</span>
                </div>
                <div className="divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${
                            completedQuestions.includes(q.id)
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`font-medium ${completedQuestions.includes(q.id) ? 'text-gray-400 line-through' : ''}`}>
                              {q.id}. {q.question}
                            </p>
                            <button
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition flex-shrink-0"
                            >
                              AI
                            </button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{q.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Link href="/category/safety/fire-equipment-electrical" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 소방설비기사(전기)
          </Link>
          <Link href="/category/safety/fire-equipment-electrical" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            메인으로 →
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격증 가이드. 소방설비기사(전기) 합격을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
