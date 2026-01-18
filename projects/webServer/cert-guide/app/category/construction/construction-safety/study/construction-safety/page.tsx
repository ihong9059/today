'use client';

import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';
import { useState, useEffect } from 'react';

export default function ConstructionSafetyTechStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [openTopics, setOpenTopics] = useState<Set<number>>(new Set([0]));
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('construction-safety-construction-safety-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const toggleQuestion = (id: number) => {
    const newCompleted = new Set(completedQuestions);
    if (newCompleted.has(id)) newCompleted.delete(id);
    else newCompleted.add(id);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('construction-safety-construction-safety-completed', JSON.stringify([...newCompleted]));
  };

  const topics = [
    {
      title: '가설공사 안전',
      questions: [
        { id: 1, question: '강관비계의 구조기준(기둥간격, 띠장간격 등)을 설명하시오.', answer: '기둥간격 1.85m 이하, 띠장간격 1.5m 이하', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 강관비계의 구조기준을 설명하시오.\n\n1. 기둥간격 기준\n2. 띠장간격 기준\n3. 벽이음 설치기준\n4. 안전난간 설치' },
        { id: 2, question: '시스템비계의 장점과 설치기준을 설명하시오.', answer: '조립 간편, 안전성 우수, 수직·수평재 연결', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 시스템비계의 장점과 설치기준을 설명하시오.\n\n1. 시스템비계의 특징\n2. 구성요소\n3. 설치기준\n4. 점검사항' },
        { id: 3, question: '작업발판의 설치기준을 설명하시오.', answer: '폭 40cm 이상, 틈새 3cm 이하, 추락방호망 설치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 작업발판의 설치기준을 설명하시오.\n\n1. 폭 기준\n2. 틈새 기준\n3. 발판 고정\n4. 안전난간 설치' },
        { id: 4, question: '안전난간의 구조기준을 설명하시오.', answer: '상부난간대 90~120cm, 중간대, 발끝막이판 10cm', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 안전난간의 구조기준을 설명하시오.\n\n1. 상부난간대 높이\n2. 중간대 설치\n3. 발끝막이판\n4. 강도 기준' },
        { id: 5, question: '동바리(서포트)의 설치기준과 점검사항을 설명하시오.', answer: '수직·수평 연결재, 밑받침 설치, 침하 방지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 동바리의 설치기준과 점검사항을 설명하시오.\n\n1. 설치 기준\n2. 연결재 설치\n3. 밑받침\n4. 점검사항' },
        { id: 6, question: '거푸집의 측압 계산과 안전대책을 설명하시오.', answer: '콘크리트 타설 속도, 온도, 배합에 따른 측압', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 거푸집의 측압 계산과 안전대책을 설명하시오.\n\n1. 측압 발생 원인\n2. 영향 요소\n3. 계산 방법\n4. 안전대책' },
        { id: 7, question: '가설통로의 설치기준을 설명하시오.', answer: '경사 30도 이하, 폭 60cm 이상, 미끄럼방지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 가설통로의 설치기준을 설명하시오.\n\n1. 경사도 기준\n2. 폭 기준\n3. 계단 설치\n4. 미끄럼방지' },
        { id: 8, question: '낙하물방지망의 설치기준을 설명하시오.', answer: '10m 이내 간격, 수평면 30도 이상', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 낙하물방지망의 설치기준을 설명하시오.\n\n1. 설치 위치\n2. 설치 간격\n3. 설치 각도\n4. 강도 기준' },
        { id: 9, question: '달비계(곤돌라)의 안전기준을 설명하시오.', answer: '와이어로프 안전율, 과부하방지장치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 달비계(곤돌라)의 안전기준을 설명하시오.\n\n1. 와이어로프 기준\n2. 안전장치\n3. 작업자 보호구\n4. 점검사항' },
        { id: 10, question: '이동식비계의 사용 시 안전수칙을 설명하시오.', answer: '바퀴 고정, 아웃트리거 설치, 승하강 금지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 이동식비계의 안전수칙을 설명하시오.\n\n1. 이동 시 주의사항\n2. 바퀴 고정\n3. 작업 시 금지사항\n4. 점검사항' },
      ],
    },
    {
      title: '굴착 및 흙막이 공사',
      questions: [
        { id: 11, question: '굴착면의 기울기 기준을 토질별로 설명하시오.', answer: '보통흙 1:1~1:1.5, 암반 1:0.5 등', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 굴착면의 기울기 기준을 토질별로 설명하시오.\n\n1. 보통흙\n2. 암반\n3. 모래\n4. 점토' },
        { id: 12, question: '흙막이 가시설의 종류와 특징을 설명하시오.', answer: 'H-pile+토류판, 시트파일, 지하연속벽 등', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 흙막이 가시설의 종류와 특징을 설명하시오.\n\n1. H-pile+토류판\n2. 시트파일\n3. 지하연속벽\n4. 선택 기준' },
        { id: 13, question: '굴착공사 시 지반붕괴 방지대책을 설명하시오.', answer: '흙막이 설치, 배수, 계측관리', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 굴착공사 시 지반붕괴 방지대책을 설명하시오.\n\n1. 흙막이 설치\n2. 배수 대책\n3. 계측관리\n4. 인접건물 보호' },
        { id: 14, question: '스트러트(Strut)의 역할과 설치기준을 설명하시오.', answer: '흙막이 수평지지, 버팀보', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 스트러트의 역할과 설치기준을 설명하시오.\n\n1. 스트러트의 역할\n2. 설치 위치\n3. 프리로드\n4. 점검사항' },
        { id: 15, question: '어스앵커(Earth Anchor)의 원리와 시공방법을 설명하시오.', answer: '지반에 정착, 인장력으로 흙막이 지지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 어스앵커의 원리와 시공방법을 설명하시오.\n\n1. 어스앵커 원리\n2. 시공 순서\n3. 인장시험\n4. 안전관리' },
        { id: 16, question: '굴착작업 시 근로자 추락방지 대책을 설명하시오.', answer: '추락방호망, 안전대, 승강설비 설치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 굴착작업 시 추락방지 대책을 설명하시오.\n\n1. 추락방호망\n2. 안전대 사용\n3. 승강설비\n4. 개구부 덮개' },
        { id: 17, question: '지반침하 계측항목과 관리기준을 설명하시오.', answer: '침하량, 경사계, 수위계 등', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 지반침하 계측항목과 관리기준을 설명하시오.\n\n1. 계측 항목\n2. 계측 방법\n3. 관리기준치\n4. 이상 시 조치' },
        { id: 18, question: '터널 굴착공사 시 안전대책을 설명하시오.', answer: '발파안전, 환기, 낙반방지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 터널 굴착공사 시 안전대책을 설명하시오.\n\n1. 발파 안전\n2. 환기 대책\n3. 낙반 방지\n4. 조명 설치' },
        { id: 19, question: '매설물(가스관, 전력선 등) 인접 굴착 시 안전대책을 설명하시오.', answer: '사전 탐사, 이격거리, 보호조치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 매설물 인접 굴착 시 안전대책을 설명하시오.\n\n1. 사전 탐사\n2. 이격거리\n3. 보호조치\n4. 긴급대응' },
        { id: 20, question: '흙막이 가시설의 안전점검 항목을 설명하시오.', answer: '변형, 균열, 누수, 지지력', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 흙막이 가시설의 안전점검 항목을 설명하시오.\n\n1. 일상 점검 항목\n2. 정기 점검 항목\n3. 이상 징후\n4. 보강 방법' },
      ],
    },
    {
      title: '철골 및 콘크리트 공사',
      questions: [
        { id: 21, question: '철골세우기 작업 시 안전대책을 설명하시오.', answer: '안전대 부착설비, 안전블록, 신호수 배치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 철골세우기 작업 시 안전대책을 설명하시오.\n\n1. 사전 준비\n2. 양중 시 안전\n3. 볼트체결 작업\n4. 추락방지' },
        { id: 22, question: '철골 볼트접합 시 안전수칙을 설명하시오.', answer: '토크렌치 사용, 작업발판 설치, 낙하물 방지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 철골 볼트접합 시 안전수칙을 설명하시오.\n\n1. 볼트 체결 순서\n2. 토크 관리\n3. 작업발판\n4. 낙하물 방지' },
        { id: 23, question: '용접작업 시 안전대책을 설명하시오.', answer: '화재예방, 환기, 보호구 착용', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 용접작업 시 안전대책을 설명하시오.\n\n1. 화재 예방\n2. 환기 대책\n3. 보호구\n4. 전격 방지' },
        { id: 24, question: '콘크리트 타설작업 시 안전대책을 설명하시오.', answer: '거푸집 점검, 편타설 금지, 펌프카 안전', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 콘크리트 타설작업 시 안전대책을 설명하시오.\n\n1. 사전 점검\n2. 타설 순서\n3. 펌프카 안전\n4. 양생 관리' },
        { id: 25, question: '콘크리트 펌프카 작업 시 안전수칙을 설명하시오.', answer: '아웃트리거 설치, 배관 고정, 신호수 배치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 콘크리트 펌프카 안전수칙을 설명하시오.\n\n1. 설치 전 확인\n2. 아웃트리거\n3. 배관 안전\n4. 청소 작업' },
        { id: 26, question: '거푸집 해체작업 시 안전수칙을 설명하시오.', answer: '존치기간 확인, 해체순서, 낙하방지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 거푸집 해체작업 시 안전수칙을 설명하시오.\n\n1. 존치기간\n2. 해체 순서\n3. 낙하 방지\n4. 재사용 점검' },
        { id: 27, question: '데크플레이트 설치 시 안전대책을 설명하시오.', answer: '추락방지, 연결부 고정, 적재하중 관리', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 데크플레이트 설치 시 안전대책을 설명하시오.\n\n1. 추락 방지\n2. 고정 방법\n3. 적재 관리\n4. 점검사항' },
        { id: 28, question: '슬라브 개구부의 안전조치를 설명하시오.', answer: '덮개 설치, 안전난간, 표지 설치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 슬라브 개구부의 안전조치를 설명하시오.\n\n1. 덮개 설치\n2. 안전난간\n3. 표지 설치\n4. 관리 방법' },
        { id: 29, question: 'PC(프리캐스트 콘크리트) 부재 설치 시 안전대책을 설명하시오.', answer: '양중계획, 가접합, 본접합 순서', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: PC 부재 설치 시 안전대책을 설명하시오.\n\n1. 양중 계획\n2. 가접합\n3. 본접합\n4. 추락 방지' },
        { id: 30, question: '고소작업대(스카이리프트) 사용 시 안전수칙을 설명하시오.', answer: '지반 확인, 작업반경, 안전대 착용', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 고소작업대 사용 시 안전수칙을 설명하시오.\n\n1. 지반 확인\n2. 작업 반경\n3. 안전대 착용\n4. 점검사항' },
      ],
    },
    {
      title: '건설기계 안전',
      questions: [
        { id: 31, question: '타워크레인 설치 전 안전검토 사항을 설명하시오.', answer: '지반 지지력, 작업반경, 간섭 검토', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 타워크레인 설치 전 안전검토 사항을 설명하시오.\n\n1. 지반 조건\n2. 작업 반경\n3. 인접 건물\n4. 전력선 이격' },
        { id: 32, question: '타워크레인의 안전장치 종류를 설명하시오.', answer: '과부하방지, 권과방지, 선회제한 등', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 타워크레인의 안전장치 종류를 설명하시오.\n\n1. 과부하방지장치\n2. 권과방지장치\n3. 선회제한장치\n4. 풍속계' },
        { id: 33, question: '이동식 크레인 작업 시 안전수칙을 설명하시오.', answer: '아웃트리거, 정격하중, 신호수 배치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 이동식 크레인 작업 시 안전수칙을 설명하시오.\n\n1. 설치 조건\n2. 정격하중\n3. 신호수 배치\n4. 작업반경' },
        { id: 34, question: '양중작업 시 신호방법을 설명하시오.', answer: '수신호, 무선통신, 신호수 자격', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 양중작업 시 신호방법을 설명하시오.\n\n1. 수신호 종류\n2. 무선통신\n3. 신호수 배치\n4. 비상 신호' },
        { id: 35, question: '와이어로프의 폐기기준을 설명하시오.', answer: '소선 단선 10% 이상, 직경 7% 이상 감소 등', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 와이어로프의 폐기기준을 설명하시오.\n\n1. 소선 단선\n2. 직경 감소\n3. 킹크 발생\n4. 부식 상태' },
        { id: 36, question: '굴삭기 작업 시 안전수칙을 설명하시오.', answer: '작업반경 출입금지, 전도방지, 접촉사고 예방', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 굴삭기 작업 시 안전수칙을 설명하시오.\n\n1. 작업반경\n2. 전도 방지\n3. 접촉 예방\n4. 붐대 관리' },
        { id: 37, question: '항타기·항발기 작업 시 안전대책을 설명하시오.', answer: '도괴방지, 진동소음, 이동경로 확보', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 항타기·항발기 작업 시 안전대책을 설명하시오.\n\n1. 도괴 방지\n2. 진동 소음\n3. 이동 경로\n4. 점검사항' },
        { id: 38, question: '지게차 작업 시 안전수칙을 설명하시오.', answer: '적재하중, 전방시야, 주행속도', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 지게차 작업 시 안전수칙을 설명하시오.\n\n1. 적재 기준\n2. 주행 안전\n3. 경사로 주행\n4. 점검사항' },
        { id: 39, question: '건설기계 정비 시 안전수칙을 설명하시오.', answer: 'LOTO 적용, 안전블록, 환기', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 건설기계 정비 시 안전수칙을 설명하시오.\n\n1. LOTO 적용\n2. 안전블록\n3. 환기 대책\n4. 보호구 착용' },
        { id: 40, question: '리프트(승강기) 설치 시 안전기준을 설명하시오.', answer: '방호울, 과부하방지, 출입문 인터록', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 리프트 설치 시 안전기준을 설명하시오.\n\n1. 방호울 설치\n2. 안전장치\n3. 출입문\n4. 점검사항' },
      ],
    },
    {
      title: '해체공사 및 기타 안전',
      questions: [
        { id: 41, question: '건물 해체공사의 순서와 안전대책을 설명하시오.', answer: '상부→하부, 비내력→내력 순서', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 건물 해체공사의 순서와 안전대책을 설명하시오.\n\n1. 해체 순서\n2. 방호조치\n3. 분진 관리\n4. 폐기물 처리' },
        { id: 42, question: '해체공사 시 분진·소음 관리대책을 설명하시오.', answer: '살수, 방진막, 방음벽 설치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 해체공사 시 분진·소음 관리대책을 설명하시오.\n\n1. 분진 저감\n2. 소음 저감\n3. 주민 민원\n4. 환경관리' },
        { id: 43, question: '밀폐공간 작업 시 안전수칙을 설명하시오.', answer: '산소농도 측정, 환기, 감시인 배치', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 밀폐공간 작업 시 안전수칙을 설명하시오.\n\n1. 산소농도 측정\n2. 환기 대책\n3. 감시인 배치\n4. 보호구 착용' },
        { id: 44, question: '전기작업 시 안전대책을 설명하시오.', answer: '정전작업, 충전부 방호, 접지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 전기작업 시 안전대책을 설명하시오.\n\n1. 정전 작업\n2. 충전부 방호\n3. 접지 설치\n4. 절연보호구' },
        { id: 45, question: '건설현장 화재예방 대책을 설명하시오.', answer: '용접·용단 작업, 인화물질 관리, 소화설비', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 건설현장 화재예방 대책을 설명하시오.\n\n1. 화기작업 관리\n2. 인화물질 관리\n3. 소화설비\n4. 비상대피' },
        { id: 46, question: '건설현장 폭발사고 예방대책을 설명하시오.', answer: '가스누출 감지, 환기, 불꽃작업 금지', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 건설현장 폭발사고 예방대책을 설명하시오.\n\n1. 가스 관리\n2. 환기 대책\n3. 화기 통제\n4. 비상조치' },
        { id: 47, question: '악천후(폭우·폭설·강풍) 시 안전조치를 설명하시오.', answer: '작업중지, 가시설 점검, 배수', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 악천후 시 안전조치를 설명하시오.\n\n1. 작업 중지 기준\n2. 가시설 점검\n3. 배수 대책\n4. 복구 작업' },
        { id: 48, question: '고온작업 시 열사병 예방대책을 설명하시오.', answer: '휴식시간, 음료 제공, 서늘한 휴게소', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 고온작업 시 열사병 예방대책을 설명하시오.\n\n1. 작업 조절\n2. 휴식 제공\n3. 음료 제공\n4. 응급처치' },
        { id: 49, question: '건설폐기물 처리 시 안전수칙을 설명하시오.', answer: '분리배출, 적재하중, 운반경로', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 건설폐기물 처리 시 안전수칙을 설명하시오.\n\n1. 분리 배출\n2. 적재 관리\n3. 운반 안전\n4. 법적 의무' },
        { id: 50, question: '건설현장 응급처치 체계를 설명하시오.', answer: '응급처치원, 구급약품, 비상연락망', prompt: '건설안전기사 건설안전기술 문제입니다.\n\n문제: 건설현장 응급처치 체계를 설명하시오.\n\n1. 응급처치원\n2. 구급약품\n3. 비상연락망\n4. 이송 체계' },
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
            <span className="text-amber-500">🏗️</span> 건설안전기술
          </h1>
          <p className="text-gray-500 mt-1">건설안전기사 필기 2과목 (50문항)</p>
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
