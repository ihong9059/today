'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function ElectricalInstallationPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('electrician-installation-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('electrician-installation-completed', JSON.stringify(items));
    setCompletedItems(items);
  };

  const toggleItem = (id: string) => {
    const newItems = completedItems.includes(id)
      ? completedItems.filter(i => i !== id)
      : [...completedItems, id];
    saveProgress(newItems);
  };

  const toggleTopic = (index: number) => {
    setOpenTopics(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const topics = [
    {
      title: "전선의 종류와 규격",
      icon: "🔌",
      questions: [
        { id: 1, q: "전선의 종류별 약호를 설명하시오 (IV, CV 등)", a: "IV: 600V 비닐절연전선, CV: 가교폴리에틸렌절연 비닐시스 케이블", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전선의 종류별 약호를 설명하시오 (IV, CV 등)\n\n다음 순서로 설명해주세요:\n1. IV 전선의 특징\n2. HIV 전선의 특징\n3. CV 케이블의 특징\n4. 전선 선정 기준\n5. 연습문제 3개" },
        { id: 2, q: "전선의 허용전류란?", a: "전선에 흘려보낼 수 있는 안전한 최대 전류값", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전선의 허용전류란?\n\n다음 순서로 설명해주세요:\n1. 허용전류의 정의\n2. 허용전류 결정 요소\n3. 온도보정계수\n4. 전선 굵기 선정\n5. 연습문제 3개" },
        { id: 3, q: "전압강하 계산 공식은?", a: "단상: e=2IR, 3상: e=√3IR (e=전압강하, I=전류, R=저항)", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전압강하 계산 공식은?\n\n다음 순서로 설명해주세요:\n1. 전압강하의 의미\n2. 단상 2선식 공식\n3. 3상 3선식 공식\n4. 허용 전압강하율\n5. 연습문제 3개" },
        { id: 4, q: "전선의 굵기 선정 시 고려사항은?", a: "허용전류, 전압강하, 기계적 강도, 단락전류", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전선의 굵기 선정 시 고려사항은?\n\n다음 순서로 설명해주세요:\n1. 허용전류 검토\n2. 전압강하 검토\n3. 기계적 강도\n4. 단락전류 내량\n5. 연습문제 3개" },
        { id: 5, q: "전선관의 굵기 선정 방법은?", a: "전선 총 단면적이 관 내단면적의 32%(48%) 이하", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전선관의 굵기 선정 방법은?\n\n다음 순서로 설명해주세요:\n1. 점유율 계산\n2. 32% 규정 (3본 초과)\n3. 48% 규정 (3본 이하)\n4. 계산 예제\n5. 연습문제 3개" },
      ]
    },
    {
      title: "배선공사 종류",
      icon: "🔧",
      questions: [
        { id: 6, q: "금속관 배선의 특징과 시공 요점은?", a: "기계적 보호 우수, 접지 필요, 커넥터/커플링 사용", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 금속관 배선의 특징과 시공 요점은?\n\n다음 순서로 설명해주세요:\n1. 금속관 배선의 장점\n2. 관 가공 방법 (벤딩)\n3. 커넥터, 커플링 시공\n4. 접지 연결\n5. 연습문제 3개" },
        { id: 7, q: "합성수지관(PVC) 배선의 특징은?", a: "경량, 내식성 우수, 열에 약함, 접지 불필요", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 합성수지관(PVC) 배선의 특징은?\n\n다음 순서로 설명해주세요:\n1. PVC관의 장단점\n2. 시공 시 주의사항\n3. 접착제 사용법\n4. 금속관과 비교\n5. 연습문제 3개" },
        { id: 8, q: "케이블 배선의 종류와 특징은?", a: "케이블트레이, 덕트, 직매, 관로식 등", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 케이블 배선의 종류와 특징은?\n\n다음 순서로 설명해주세요:\n1. 케이블트레이 배선\n2. 덕트 배선\n3. 직매식 배선\n4. 관로식 배선\n5. 연습문제 3개" },
        { id: 9, q: "가요전선관 배선의 용도는?", a: "기기 연결부, 진동 부위, 굴곡 필요 장소", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 가요전선관 배선의 용도는?\n\n다음 순서로 설명해주세요:\n1. 가요전선관의 종류\n2. 사용 장소\n3. 시공 방법\n4. 금속가요관 vs 비금속가요관\n5. 연습문제 3개" },
        { id: 10, q: "애자사용 배선의 특징은?", a: "옥외/옥내 노출배선, 충분한 이격거리 확보 필요", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 애자사용 배선의 특징은?\n\n다음 순서로 설명해주세요:\n1. 애자의 종류\n2. 지지점간 거리\n3. 이격거리 규정\n4. 사용 제한 장소\n5. 연습문제 3개" },
      ]
    },
    {
      title: "배선기구",
      icon: "🔲",
      questions: [
        { id: 11, q: "스위치의 종류와 용도를 설명하시오", a: "단로기, 절환스위치, 3로스위치, 4로스위치 등", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 스위치의 종류와 용도를 설명하시오\n\n다음 순서로 설명해주세요:\n1. 단로스위치\n2. 3로스위치 (2개소 점멸)\n3. 4로스위치\n4. 각 스위치 결선도\n5. 연습문제 3개" },
        { id: 12, q: "콘센트의 정격과 설치 기준은?", a: "일반용 15A, 250V / 바닥면 30cm 이상 이격", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 콘센트의 정격과 설치 기준은?\n\n다음 순서로 설명해주세요:\n1. 콘센트 정격 종류\n2. 설치 높이 기준\n3. 접지형 콘센트\n4. 방수형 콘센트\n5. 연습문제 3개" },
        { id: 13, q: "배선용 차단기(MCCB)의 역할은?", a: "과전류 및 단락전류 차단, 개폐기 기능", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 배선용 차단기(MCCB)의 역할은?\n\n다음 순서로 설명해주세요:\n1. MCCB의 구조\n2. 동작 원리\n3. 정격전류 선정\n4. 차단용량(AF, AT)\n5. 연습문제 3개" },
        { id: 14, q: "누전차단기(ELB)의 동작원리는?", a: "영상변류기(ZCT)로 누설전류 검출, 30mA 이하 시 차단", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 누전차단기(ELB)의 동작원리는?\n\n다음 순서로 설명해주세요:\n1. ZCT 동작원리\n2. 감도전류 (30mA)\n3. 동작시간\n4. 설치 의무 장소\n5. 연습문제 3개" },
        { id: 15, q: "전자접촉기(MC)의 역할과 구성은?", a: "전동기 개폐용, 코일+주접점+보조접점 구성", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전자접촉기(MC)의 역할과 구성은?\n\n다음 순서로 설명해주세요:\n1. MC의 구조\n2. 주접점과 보조접점\n3. a접점과 b접점\n4. 시퀀스 회로 적용\n5. 연습문제 3개" },
      ]
    },
    {
      title: "조명설비",
      icon: "💡",
      questions: [
        { id: 16, q: "조도의 단위와 계산법은?", a: "단위: lx(럭스), E = F/A (광속/면적)", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 조도의 단위와 계산법은?\n\n다음 순서로 설명해주세요:\n1. 조도의 정의\n2. 광속, 광도, 휘도와의 관계\n3. 조도 계산 공식\n4. KS 조도기준\n5. 연습문제 3개" },
        { id: 17, q: "조명기구 설계 시 광원의 종류별 특성은?", a: "백열등, 형광등, LED - 효율, 수명, 연색성 차이", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 조명기구 설계 시 광원의 종류별 특성은?\n\n다음 순서로 설명해주세요:\n1. 백열등 특성\n2. 형광등 특성\n3. LED 특성\n4. 광원 선정 기준\n5. 연습문제 3개" },
        { id: 18, q: "조명 방식의 종류는?", a: "직접조명, 간접조명, 반직접/반간접, 전반조명", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 조명 방식의 종류는?\n\n다음 순서로 설명해주세요:\n1. 직접조명\n2. 간접조명\n3. 반직접/반간접조명\n4. 각 방식의 장단점\n5. 연습문제 3개" },
        { id: 19, q: "형광등의 점등 회로 구성은?", a: "안정기, 스타터, 램프로 구성, 고압방전", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 형광등의 점등 회로 구성은?\n\n다음 순서로 설명해주세요:\n1. 형광등 구조\n2. 안정기 역할\n3. 스타터 역할\n4. 점등 순서\n5. 연습문제 3개" },
        { id: 20, q: "비상조명 설비 기준은?", a: "예비전원 20분 이상, 바닥면 1lx 이상", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 비상조명 설비 기준은?\n\n다음 순서로 설명해주세요:\n1. 비상조명 설치 대상\n2. 예비전원 용량\n3. 조도 기준\n4. 유도등과의 관계\n5. 연습문제 3개" },
      ]
    },
    {
      title: "동력설비",
      icon: "⚙️",
      questions: [
        { id: 21, q: "전동기 용량 계산 공식은?", a: "P = (출력kW)/(효율×역률), 여유율 적용", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전동기 용량 계산 공식은?\n\n다음 순서로 설명해주세요:\n1. 부하별 소요동력\n2. 전동기 용량 산정\n3. 여유율 적용\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 22, q: "전동기 보호장치의 종류는?", a: "과부하 계전기(THR), 과전류 계전기(OCR), 결상 보호", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전동기 보호장치의 종류는?\n\n다음 순서로 설명해주세요:\n1. 열동형 과부하계전기(THR)\n2. 과전류 계전기(OCR)\n3. 결상 보호\n4. 지락 보호\n5. 연습문제 3개" },
        { id: 23, q: "동력용 배선의 굵기 선정 기준은?", a: "전동기 정격전류의 1.25배 이상 허용전류", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 동력용 배선의 굵기 선정 기준은?\n\n다음 순서로 설명해주세요:\n1. 정격전류 산정\n2. 전선 굵기 선정\n3. 간선의 허용전류\n4. 분기회로 굵기\n5. 연습문제 3개" },
        { id: 24, q: "전동기 제어반의 구성 요소는?", a: "MCCB, MC, THR, 조작스위치, 표시등", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전동기 제어반의 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. 주회로 구성\n2. 제어회로 구성\n3. 보호장치\n4. 조작부 구성\n5. 연습문제 3개" },
        { id: 25, q: "펌프/팬의 용량 계산법은?", a: "P = (ρ×Q×H)/(6120×η) [kW]", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 펌프/팬의 용량 계산법은?\n\n다음 순서로 설명해주세요:\n1. 펌프 용량 공식\n2. 팬 용량 공식\n3. 효율과 여유율\n4. 계산 예제\n5. 연습문제 3개" },
      ]
    },
    {
      title: "접지공사",
      icon: "⏚",
      questions: [
        { id: 26, q: "접지공사의 목적은?", a: "감전방지, 기기보호, 이상전압 억제, 뇌격보호", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 접지공사의 목적은?\n\n다음 순서로 설명해주세요:\n1. 감전 방지\n2. 기기 보호\n3. 뇌격 보호\n4. 계통 안정화\n5. 연습문제 3개" },
        { id: 27, q: "접지의 종류와 접지저항값은?", a: "제1종(10Ω), 제2종(계산값), 제3종(100Ω), 특별(10Ω)", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 접지의 종류와 접지저항값은?\n\n다음 순서로 설명해주세요:\n1. 제1종 접지공사\n2. 제2종 접지공사\n3. 제3종 접지공사\n4. 특별 제3종 접지공사\n5. 연습문제 3개" },
        { id: 28, q: "제2종 접지저항값 계산은?", a: "Rg = 150/Ig [Ω] (Ig: 1선 지락전류)", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 제2종 접지저항값 계산은?\n\n다음 순서로 설명해주세요:\n1. 제2종 접지 목적\n2. 접지저항 공식\n3. 1선 지락전류 계산\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 29, q: "접지공사 시공 방법은?", a: "접지봉, 접지판, 매설지선 방식 등", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 접지공사 시공 방법은?\n\n다음 순서로 설명해주세요:\n1. 접지봉 시공\n2. 접지판 시공\n3. 접지선 규격\n4. 저감재 사용\n5. 연습문제 3개" },
        { id: 30, q: "접지저항 측정 방법은?", a: "전위강하법(3극법), 접지저항계 사용", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 접지저항 측정 방법은?\n\n다음 순서로 설명해주세요:\n1. 3극법 원리\n2. 보조접지극 배치\n3. 접지저항계 사용법\n4. 측정 시 주의사항\n5. 연습문제 3개" },
      ]
    },
    {
      title: "수변전설비",
      icon: "🏭",
      questions: [
        { id: 31, q: "수전설비의 구성 요소는?", a: "인입구배선, 주차단기, 변압기, 배전반 등", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 수전설비의 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. 인입구 설비\n2. 주차단장치\n3. 변압기\n4. 배전반\n5. 연습문제 3개" },
        { id: 32, q: "변압기 용량 산정 방법은?", a: "수용률, 부등률, 부하율 적용하여 계산", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 변압기 용량 산정 방법은?\n\n다음 순서로 설명해주세요:\n1. 부하 합계 산정\n2. 수용률 적용\n3. 부등률 적용\n4. 변압기 용량 결정\n5. 연습문제 3개" },
        { id: 33, q: "차단기(CB)의 종류와 특성은?", a: "OCB, VCB, GCB, ACB - 소호방식별 분류", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 차단기(CB)의 종류와 특성은?\n\n다음 순서로 설명해주세요:\n1. 유입차단기(OCB)\n2. 진공차단기(VCB)\n3. 가스차단기(GCB)\n4. 기중차단기(ACB)\n5. 연습문제 3개" },
        { id: 34, q: "역률 개선용 콘덴서의 용량 계산은?", a: "Qc = P(tanθ1 - tanθ2) [kVar]", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 역률 개선용 콘덴서의 용량 계산은?\n\n다음 순서로 설명해주세요:\n1. 역률 개선 원리\n2. 용량 계산 공식\n3. 개선 전후 역률\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 35, q: "과전류 계전기(OCR)의 동작 특성은?", a: "한시/순시 특성, 정한시/반한시 특성", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 과전류 계전기(OCR)의 동작 특성은?\n\n다음 순서로 설명해주세요:\n1. 한시 특성\n2. 순시 특성\n3. 반한시 특성\n4. 정정값 설정\n5. 연습문제 3개" },
      ]
    },
    {
      title: "피뢰설비",
      icon: "⚡",
      questions: [
        { id: 36, q: "피뢰설비의 구성 요소는?", a: "수뢰부, 인하도선, 접지극", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 피뢰설비의 구성 요소는?\n\n다음 순서로 설명해주세요:\n1. 수뢰부 종류\n2. 인하도선 규격\n3. 접지극 시공\n4. 보호범위 산정\n5. 연습문제 3개" },
        { id: 37, q: "피뢰침의 보호각과 보호범위는?", a: "보호각 60° 이내, 보호반경 = H×tan(60°)", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 피뢰침의 보호각과 보호범위는?\n\n다음 순서로 설명해주세요:\n1. 보호각의 정의\n2. 보호반경 계산\n3. 건물 높이별 설치\n4. 회전구체법\n5. 연습문제 3개" },
        { id: 38, q: "SPD(서지보호장치)의 역할은?", a: "낙뢰 서지전압 흡수, 기기 보호", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: SPD(서지보호장치)의 역할은?\n\n다음 순서로 설명해주세요:\n1. SPD의 원리\n2. 종류 (Class I, II, III)\n3. 설치 위치\n4. 접지와의 연결\n5. 연습문제 3개" },
        { id: 39, q: "내부 피뢰설비란?", a: "등전위 본딩, SPD 설치로 실내 기기 보호", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 내부 피뢰설비란?\n\n다음 순서로 설명해주세요:\n1. 등전위 본딩\n2. SPD 적용\n3. 외부 피뢰와의 차이\n4. 설치 기준\n5. 연습문제 3개" },
        { id: 40, q: "피뢰설비의 접지저항 기준은?", a: "독립접지 시 10Ω 이하, 통합접지 적용 가능", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 피뢰설비의 접지저항 기준은?\n\n다음 순서로 설명해주세요:\n1. 독립접지 기준\n2. 통합접지 개념\n3. 접지극 시공\n4. 접지저항 저감\n5. 연습문제 3개" },
      ]
    },
    {
      title: "전기안전",
      icon: "⚠️",
      questions: [
        { id: 41, q: "감전의 위험 요소와 대책은?", a: "전류경로, 통전시간, 전류크기 / 접지, 누전차단기, 절연", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 감전의 위험 요소와 대책은?\n\n다음 순서로 설명해주세요:\n1. 감전의 위험 요소\n2. 인체 허용전류\n3. 감전 방지 대책\n4. 응급 처치\n5. 연습문제 3개" },
        { id: 42, q: "활선작업 시 안전수칙은?", a: "절연용 보호구 착용, 활선 접근한계거리 준수", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 활선작업 시 안전수칙은?\n\n다음 순서로 설명해주세요:\n1. 활선작업의 정의\n2. 보호구 종류\n3. 접근한계거리\n4. 작업 절차\n5. 연습문제 3개" },
        { id: 43, q: "정전작업 시 안전수칙은?", a: "개폐기 개방, 검전, 접지, 표지부착, 잠금장치", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 정전작업 시 안전수칙은?\n\n다음 순서로 설명해주세요:\n1. 정전작업 5단계\n2. 검전 방법\n3. 단락접지\n4. 잠금표지(LOTO)\n5. 연습문제 3개" },
        { id: 44, q: "절연저항 측정 방법과 기준은?", a: "메거 사용, 대지전압 150V 이하: 0.1MΩ 이상", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 절연저항 측정 방법과 기준은?\n\n다음 순서로 설명해주세요:\n1. 절연저항의 의미\n2. 측정 전압 선택\n3. 합격 기준값\n4. 측정 순서\n5. 연습문제 3개" },
        { id: 45, q: "전기화재의 원인과 예방책은?", a: "과부하, 단락, 누전, 접촉불량 / 정기점검, 적정용량", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전기화재의 원인과 예방책은?\n\n다음 순서로 설명해주세요:\n1. 전기화재 원인\n2. 과부하 예방\n3. 단락 예방\n4. 접촉불량 점검\n5. 연습문제 3개" },
      ]
    },
    {
      title: "전기설비기준(KEC)",
      icon: "📋",
      questions: [
        { id: 46, q: "KEC에서 정의하는 저압과 고압의 기준은?", a: "저압: 교류 1000V 이하, 고압: 1000V 초과 7000V 이하", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: KEC에서 정의하는 저압과 고압의 기준은?\n\n다음 순서로 설명해주세요:\n1. 저압의 정의\n2. 고압의 정의\n3. 특별고압의 정의\n4. 전압별 설비 기준\n5. 연습문제 3개" },
        { id: 47, q: "전로의 절연 성능 기준은?", a: "사용전압별 절연저항값 및 절연내력 시험", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전로의 절연 성능 기준은?\n\n다음 순서로 설명해주세요:\n1. 절연저항 기준\n2. 절연내력 시험\n3. 전압별 기준값\n4. 측정 주기\n5. 연습문제 3개" },
        { id: 48, q: "과전류차단기의 설치 기준은?", a: "배선 분기점, 허용전류 변경점에 설치", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 과전류차단기의 설치 기준은?\n\n다음 순서로 설명해주세요:\n1. 설치 위치\n2. 정격전류 선정\n3. 차단용량 확인\n4. 협조 보호\n5. 연습문제 3개" },
        { id: 49, q: "옥내배선의 시설 기준은?", a: "전선 종류, 배선 방법, 이격거리 등 규정", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 옥내배선의 시설 기준은?\n\n다음 순서로 설명해주세요:\n1. 전선 선정 기준\n2. 배선 공사 방법\n3. 이격거리 규정\n4. 특수장소 배선\n5. 연습문제 3개" },
        { id: 50, q: "전기설비 정기점검 주기는?", a: "연1회 이상 (고압 이상), 특고압 월1회", prompt: "전기기능사 전기설비 문제입니다.\n\n문제: 전기설비 정기점검 주기는?\n\n다음 순서로 설명해주세요:\n1. 정기점검 의무\n2. 전압별 점검 주기\n3. 점검 항목\n4. 점검 결과 보관\n5. 연습문제 3개" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedItems.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/mechanical/electrician-technician" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
            <span>←</span>
            <span>전기기능사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🏗️</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">전기설비</h1>
              <p className="text-gray-600">배선공사, 조명, 동력, 접지, 안전</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-yellow-500 to-orange-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">{completedItems.length}/{totalQuestions}</span>
          </div>
        </div>

        <div className="space-y-4">
          {topics.map((topic, topicIndex) => {
            const topicQuestions = topic.questions.map(q => `${topicIndex}-${q.id}`);
            const completedInTopic = topicQuestions.filter(id => completedItems.includes(id)).length;

            return (
              <div key={topicIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topicIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-yellow-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{completedInTopic}/{topic.questions.length} 완료</p>
                    </div>
                  </div>
                  <span className={`transform transition-transform ${openTopics.includes(topicIndex) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>

                {openTopics.includes(topicIndex) && (
                  <div className="px-6 pb-4 space-y-3">
                    {topic.questions.map((q) => {
                      const itemId = `${topicIndex}-${q.id}`;
                      const isCompleted = completedItems.includes(itemId);

                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border transition-colors ${
                            isCompleted ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={() => toggleItem(itemId)}
                              className="mt-1 w-5 h-5 text-yellow-600 rounded cursor-pointer"
                            />
                            <div className="flex-1">
                              <p className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                Q{q.id}. {q.q}
                              </p>
                              <p className="text-sm text-green-700 mt-1 bg-green-100 px-2 py-1 rounded inline-block">
                                A: {q.a}
                              </p>
                            </div>
                            <button
                              onClick={() => { if (!isLoggedIn) { alert('AI 학습 기능은 로그인 후 이용할 수 있습니다.'); window.location.href = '/login'; return; } setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm hover:bg-green-200 transition"
                            >
                              🤖 AI
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
          <h3 className="font-bold text-green-800 mb-3">💡 전기설비 학습 TIP</h3>
          <ul className="space-y-2 text-green-700 text-sm">
            <li>• 접지공사 종류별 접지저항값은 반드시 암기하세요</li>
            <li>• 전선 허용전류와 전압강하 계산은 실기에서도 출제됩니다</li>
            <li>• 배선공사 종류와 시공 방법을 구분하세요</li>
            <li>• KEC(전기설비기준) 관련 문제가 증가 추세입니다</li>
          </ul>
        </div>
      </div>

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
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
