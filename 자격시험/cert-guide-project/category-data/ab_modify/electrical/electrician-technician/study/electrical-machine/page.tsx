'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ElectricalMachinePage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('electrician-machine-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('electrician-machine-completed', JSON.stringify(items));
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
      title: "직류기 원리",
      icon: "🔋",
      questions: [
        { id: 1, q: "직류 발전기의 유기기전력 공식은?", a: "E = (PZN)/(60a) × Φ [V]", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 직류 발전기의 유기기전력 공식은?\n\n다음 순서로 설명해주세요:\n1. 공식과 각 변수의 의미\n2. 극수(P), 도체수(Z), 병렬회로수(a)\n3. 회전수(N)와 자속(Φ)의 영향\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 2, q: "직류 발전기의 종류 4가지는?", a: "타여자, 자여자(직권, 분권, 복권)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 직류 발전기의 종류 4가지는?\n\n다음 순서로 설명해주세요:\n1. 타여자 발전기\n2. 직권 발전기\n3. 분권 발전기\n4. 복권 발전기\n5. 연습문제 3개" },
        { id: 3, q: "직류 전동기의 회전속도 공식은?", a: "N = (V-IaRa)/(PZΦ) × 60a [rpm]", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 직류 전동기의 회전속도 공식은?\n\n다음 순서로 설명해주세요:\n1. 회전속도 공식 유도\n2. 각 변수의 의미\n3. 속도 제어 방법\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 4, q: "직류 전동기의 토크 공식은?", a: "T = (PZ)/(2πa) × Φ × Ia [N·m]", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 직류 전동기의 토크 공식은?\n\n다음 순서로 설명해주세요:\n1. 토크 공식과 의미\n2. 자속과 전류의 영향\n3. 기동토크와 정격토크\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 5, q: "직류 전동기의 속도 제어 방법 3가지는?", a: "전압제어, 계자제어, 저항제어", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 직류 전동기의 속도 제어 방법 3가지는?\n\n다음 순서로 설명해주세요:\n1. 전압제어법\n2. 계자제어법\n3. 저항제어법\n4. 각 방법의 장단점\n5. 연습문제 3개" },
      ]
    },
    {
      title: "직류 전동기 특성",
      icon: "⚙️",
      questions: [
        { id: 6, q: "직권 전동기의 특성은?", a: "기동토크 큼, 속도 변동 큼, 무부하 위험", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 직권 전동기의 특성은?\n\n다음 순서로 설명해주세요:\n1. 직권 전동기 구조\n2. 토크-속도 특성\n3. 무부하 시 위험성\n4. 적용 분야 (크레인, 전동차)\n5. 연습문제 3개" },
        { id: 7, q: "분권 전동기의 특성은?", a: "정속도 특성, 속도 변동 작음, 일반 동력용", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 분권 전동기의 특성은?\n\n다음 순서로 설명해주세요:\n1. 분권 전동기 구조\n2. 정속도 특성\n3. 계자약화 시 동작\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 8, q: "복권 전동기의 종류와 특성은?", a: "가동복권(직권+분권 특성), 차동복권(특수용)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 복권 전동기의 종류와 특성은?\n\n다음 순서로 설명해주세요:\n1. 가동복권 전동기\n2. 차동복권 전동기\n3. 각각의 특성 곡선\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 9, q: "직류 전동기의 역회전 방법은?", a: "계자 극성 반전 또는 전기자 극성 반전(하나만)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 직류 전동기의 역회전 방법은?\n\n다음 순서로 설명해주세요:\n1. 회전 방향 결정 요소\n2. 역회전 방법\n3. 계자와 전기자 동시 반전 시\n4. 실제 적용 회로\n5. 연습문제 3개" },
        { id: 10, q: "직류기의 정류자 역할은?", a: "교류→직류 변환(발전기), 전류 방향 유지(전동기)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 직류기의 정류자 역할은?\n\n다음 순서로 설명해주세요:\n1. 정류자의 구조\n2. 발전기에서의 역할\n3. 전동기에서의 역할\n4. 브러시와의 관계\n5. 연습문제 3개" },
      ]
    },
    {
      title: "변압기 원리",
      icon: "🔌",
      questions: [
        { id: 11, q: "변압기의 동작 원리는?", a: "전자유도 - 1차코일 교류전류가 철심에 자속 발생, 2차에 유기기전력", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 변압기의 동작 원리는?\n\n다음 순서로 설명해주세요:\n1. 전자유도 현상\n2. 1차측과 2차측\n3. 상호인덕턴스\n4. 변압비\n5. 연습문제 3개" },
        { id: 12, q: "이상적인 변압기의 전압비, 전류비 관계는?", a: "V1/V2 = N1/N2 = I2/I1 (권선비)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 이상적인 변압기의 전압비, 전류비 관계는?\n\n다음 순서로 설명해주세요:\n1. 이상 변압기 가정\n2. 전압비 = 권선비\n3. 전류비 = 권선비의 역수\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 13, q: "변압기의 손실 종류는?", a: "철손(히스테리시스, 와전류), 동손(I²R손)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 변압기의 손실 종류는?\n\n다음 순서로 설명해주세요:\n1. 철손 (무부하손)\n2. 동손 (부하손)\n3. 손실 저감 방법\n4. 효율 계산\n5. 연습문제 3개" },
        { id: 14, q: "변압기 효율이 최대가 되는 조건은?", a: "철손 = 동손일 때 (무부하손 = 부하손)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 변압기 효율이 최대가 되는 조건은?\n\n다음 순서로 설명해주세요:\n1. 효율 공식\n2. 최대효율 조건 유도\n3. 최대효율 부하율\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 15, q: "변압기의 전압변동률이란?", a: "ε = (V20-V2)/V20 × 100% (무부하-부하전압)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 변압기의 전압변동률이란?\n\n다음 순서로 설명해주세요:\n1. 전압변동률 정의\n2. 공식과 의미\n3. 영향 요인\n4. 저감 방법\n5. 연습문제 3개" },
      ]
    },
    {
      title: "변압기 결선",
      icon: "🔗",
      questions: [
        { id: 16, q: "3상 변압기의 결선 종류는?", a: "Y-Y, Δ-Δ, Y-Δ, Δ-Y, V결선", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 3상 변압기의 결선 종류는?\n\n다음 순서로 설명해주세요:\n1. 각 결선법의 특징\n2. 전압비와 전류비\n3. 위상 관계\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 17, q: "Y-Δ 결선의 특징은?", a: "1차 Y, 2차 Δ - 강압용, 2차측 제3고조파 순환", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: Y-Δ 결선의 특징은?\n\n다음 순서로 설명해주세요:\n1. Y-Δ 결선 구조\n2. 전압변환 비율\n3. 제3고조파 처리\n4. 적용 분야 (수전설비)\n5. 연습문제 3개" },
        { id: 18, q: "Δ-Y 결선의 특징은?", a: "1차 Δ, 2차 Y - 승압용, 중성점 접지 가능", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: Δ-Y 결선의 특징은?\n\n다음 순서로 설명해주세요:\n1. Δ-Y 결선 구조\n2. 전압변환 비율\n3. 중성점 활용\n4. 적용 분야 (발전소)\n5. 연습문제 3개" },
        { id: 19, q: "V결선의 특징과 이용률은?", a: "2대로 3상 공급, 이용률 86.6%, 출력 57.7%", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: V결선의 특징과 이용률은?\n\n다음 순서로 설명해주세요:\n1. V결선의 원리\n2. 이용률과 출력 계산\n3. 사용 상황\n4. Δ결선과 비교\n5. 연습문제 3개" },
        { id: 20, q: "변압기 병렬운전 조건 4가지는?", a: "극성 동일, 전압비 동일, %Z 동일, 위상각 동일", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 변압기 병렬운전 조건 4가지는?\n\n다음 순서로 설명해주세요:\n1. 극성 일치\n2. 전압비 일치\n3. %임피던스 일치\n4. 위상각 일치\n5. 연습문제 3개" },
      ]
    },
    {
      title: "유도 전동기 원리",
      icon: "🔄",
      questions: [
        { id: 21, q: "유도 전동기의 동작 원리는?", a: "회전자계에 의해 회전자에 유도전류 발생, 토크 발생", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 유도 전동기의 동작 원리는?\n\n다음 순서로 설명해주세요:\n1. 회전자계 발생\n2. 유도전류와 토크\n3. 아라고 원판 원리\n4. 슬립의 의미\n5. 연습문제 3개" },
        { id: 22, q: "동기속도(Ns)의 공식은?", a: "Ns = 120f/P [rpm] (f: 주파수, P: 극수)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 동기속도(Ns)의 공식은?\n\n다음 순서로 설명해주세요:\n1. 동기속도 정의\n2. 공식 유도\n3. 60Hz, 4극 시 동기속도\n4. 극수별 속도표\n5. 연습문제 3개" },
        { id: 23, q: "슬립(s)의 정의와 공식은?", a: "s = (Ns-N)/Ns × 100% (동기속도와 실제속도 차)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 슬립(s)의 정의와 공식은?\n\n다음 순서로 설명해주세요:\n1. 슬립의 정의\n2. 공식과 의미\n3. 정격 슬립 범위\n4. 슬립과 토크 관계\n5. 연습문제 3개" },
        { id: 24, q: "3상 유도전동기의 회전자 종류는?", a: "농형(Squirrel Cage), 권선형(Wound Rotor)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 3상 유도전동기의 회전자 종류는?\n\n다음 순서로 설명해주세요:\n1. 농형 회전자 구조\n2. 권선형 회전자 구조\n3. 각각의 장단점\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 25, q: "유도전동기의 토크-슬립 특성곡선을 설명하시오", a: "기동토크 → 최대토크(정지토크) → 정격점 → 동기속도", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 유도전동기의 토크-슬립 특성곡선을 설명하시오\n\n다음 순서로 설명해주세요:\n1. 특성곡선 형태\n2. 기동토크\n3. 최대토크(풀아웃토크)\n4. 안정영역과 불안정영역\n5. 연습문제 3개" },
      ]
    },
    {
      title: "유도전동기 기동법",
      icon: "🚀",
      questions: [
        { id: 26, q: "3상 유도전동기의 기동법 종류는?", a: "직입기동, Y-Δ기동, 리액터기동, 기동보상기, 인버터", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 3상 유도전동기의 기동법 종류는?\n\n다음 순서로 설명해주세요:\n1. 직입기동\n2. Y-Δ기동\n3. 리액터기동\n4. 기동보상기 기동\n5. 연습문제 3개" },
        { id: 27, q: "Y-Δ 기동의 원리와 특징은?", a: "Y기동→Δ운전, 기동전류 1/3, 기동토크 1/3", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: Y-Δ 기동의 원리와 특징은?\n\n다음 순서로 설명해주세요:\n1. Y-Δ 기동 원리\n2. 전류와 토크 감소비\n3. 전환 시 충격\n4. 적용 조건\n5. 연습문제 3개" },
        { id: 28, q: "리액터 기동의 특징은?", a: "리액터로 전압 강하, 전환 충격 없음, 토크 = k²배", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 리액터 기동의 특징은?\n\n다음 순서로 설명해주세요:\n1. 리액터 기동 원리\n2. 전압 감소와 토크\n3. Y-Δ 기동과 비교\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 29, q: "인버터 기동(VVVF)의 장점은?", a: "저속~고속 무단계 속도제어, 소프트스타트, 에너지절감", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 인버터 기동(VVVF)의 장점은?\n\n다음 순서로 설명해주세요:\n1. VVVF 원리\n2. 주파수-전압 관계\n3. 소프트스타트\n4. 에너지 절감 효과\n5. 연습문제 3개" },
        { id: 30, q: "유도전동기의 역회전 방법은?", a: "3상 중 2상의 결선을 교체 (R-S-T → R-T-S)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 유도전동기의 역회전 방법은?\n\n다음 순서로 설명해주세요:\n1. 회전자계 방향 결정\n2. 상순 교체\n3. 정역운전 회로\n4. MC(전자접촉기) 회로\n5. 연습문제 3개" },
      ]
    },
    {
      title: "동기기",
      icon: "🎯",
      questions: [
        { id: 31, q: "동기 발전기의 원리는?", a: "계자에 DC 공급, 회전자계 발생, 고정자에 AC 유기", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 동기 발전기의 원리는?\n\n다음 순서로 설명해주세요:\n1. 동기 발전기 구조\n2. 계자 여자\n3. 유기기전력 발생\n4. 발전소 적용\n5. 연습문제 3개" },
        { id: 32, q: "동기 발전기의 병렬운전 조건은?", a: "기전력 크기, 주파수, 위상, 파형 일치", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 동기 발전기의 병렬운전 조건은?\n\n다음 순서로 설명해주세요:\n1. 기전력 크기 일치\n2. 주파수 일치\n3. 위상 일치\n4. 파형 일치\n5. 연습문제 3개" },
        { id: 33, q: "동기 전동기의 특징은?", a: "정속도 운전, 역률 조정 가능(동기조상기), 기동토크 없음", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 동기 전동기의 특징은?\n\n다음 순서로 설명해주세요:\n1. 정속도 특성\n2. 역률 조정 (과여자/부족여자)\n3. 기동 방법\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 34, q: "동기조상기란?", a: "무부하 동기전동기, 계자전류 조정으로 역률 개선", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 동기조상기란?\n\n다음 순서로 설명해주세요:\n1. 동기조상기 정의\n2. 과여자 시 동작\n3. 부족여자 시 동작\n4. 역률개선 효과\n5. 연습문제 3개" },
        { id: 35, q: "동기 전동기의 탈조현상이란?", a: "과부하 시 동기에서 벗어나 정지하는 현상", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 동기 전동기의 탈조현상이란?\n\n다음 순서로 설명해주세요:\n1. 탈조의 정의\n2. 발생 원인\n3. 동기화력과 부하각\n4. 방지 대책\n5. 연습문제 3개" },
      ]
    },
    {
      title: "단상 유도전동기",
      icon: "🔃",
      questions: [
        { id: 36, q: "단상 유도전동기가 스스로 기동 못하는 이유는?", a: "맥동자계 발생 (회전자계 아님), 기동토크 0", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 단상 유도전동기가 스스로 기동 못하는 이유는?\n\n다음 순서로 설명해주세요:\n1. 단상 전원의 자계\n2. 맥동자계와 회전자계\n3. 기동토크가 없는 이유\n4. 기동장치 필요성\n5. 연습문제 3개" },
        { id: 37, q: "분상 기동형 유도전동기의 원리는?", a: "기동권선(보조권선)으로 위상차 발생, 회전자계 형성", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 분상 기동형 유도전동기의 원리는?\n\n다음 순서로 설명해주세요:\n1. 주권선과 보조권선\n2. 위상차 발생\n3. 회전자계 형성\n4. 원심력 스위치\n5. 연습문제 3개" },
        { id: 38, q: "콘덴서 기동형의 특징은?", a: "콘덴서로 90° 위상차, 기동토크 큼, 가정용 에어컨 등", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 콘덴서 기동형의 특징은?\n\n다음 순서로 설명해주세요:\n1. 콘덴서의 역할\n2. 90° 위상차\n3. 분상형과 비교\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 39, q: "셰이딩코일 전동기의 특징은?", a: "단락환으로 자계 분리, 구조 간단, 소형 선풍기 등", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 셰이딩코일 전동기의 특징은?\n\n다음 순서로 설명해주세요:\n1. 셰이딩코일 구조\n2. 동작 원리\n3. 장단점\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 40, q: "반발 기동형 유도전동기란?", a: "브러시 위치 조정으로 기동, 기동토크 매우 큼", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 반발 기동형 유도전동기란?\n\n다음 순서로 설명해주세요:\n1. 반발형의 원리\n2. 브러시 각도 조정\n3. 기동토크 특성\n4. 적용 분야\n5. 연습문제 3개" },
      ]
    },
    {
      title: "정류기와 인버터",
      icon: "⚡",
      questions: [
        { id: 41, q: "정류회로의 종류와 특성은?", a: "반파(0.45Vm), 전파(0.9Vm), 브리지(0.9Vm)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 정류회로의 종류와 특성은?\n\n다음 순서로 설명해주세요:\n1. 반파정류\n2. 센터탭 전파정류\n3. 브리지정류\n4. 평균전압 계산\n5. 연습문제 3개" },
        { id: 42, q: "평활회로(필터)의 역할은?", a: "맥동분 제거, 직류 파형 평탄화 (콘덴서, 인덕터)", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 평활회로(필터)의 역할은?\n\n다음 순서로 설명해주세요:\n1. 맥동의 의미\n2. 콘덴서 필터\n3. LC 필터\n4. 리플율\n5. 연습문제 3개" },
        { id: 43, q: "인버터의 역할과 원리는?", a: "DC → AC 변환, PWM으로 주파수/전압 제어", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 인버터의 역할과 원리는?\n\n다음 순서로 설명해주세요:\n1. 인버터 정의\n2. PWM 제어\n3. VVVF 인버터\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 44, q: "컨버터와 인버터의 차이는?", a: "컨버터: AC→DC, 인버터: DC→AC", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 컨버터와 인버터의 차이는?\n\n다음 순서로 설명해주세요:\n1. 컨버터 정의와 역할\n2. 인버터 정의와 역할\n3. 전력변환 장치 구성\n4. 적용 예시\n5. 연습문제 3개" },
        { id: 45, q: "UPS(무정전전원장치)의 구성은?", a: "정류기 + 인버터 + 배터리, 정전 시 무중단 전원", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: UPS(무정전전원장치)의 구성은?\n\n다음 순서로 설명해주세요:\n1. UPS 구성요소\n2. 동작 원리\n3. 온라인/오프라인 방식\n4. 적용 분야\n5. 연습문제 3개" },
      ]
    },
    {
      title: "특수전동기",
      icon: "🎛️",
      questions: [
        { id: 46, q: "서보모터의 특징과 용도는?", a: "정밀 위치제어, 빠른 응답, 로봇/CNC/자동화", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 서보모터의 특징과 용도는?\n\n다음 순서로 설명해주세요:\n1. 서보모터 정의\n2. AC/DC 서보\n3. 위치제어 원리\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 47, q: "스테핑모터의 특징은?", a: "펄스 입력으로 일정 각도 회전, 오픈루프 제어 가능", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 스테핑모터의 특징은?\n\n다음 순서로 설명해주세요:\n1. 스테핑모터 원리\n2. 스텝각 계산\n3. 여자방식 (1상, 2상, 1-2상)\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 48, q: "BLDC 모터(브러시리스 DC)의 장점은?", a: "브러시 없음, 수명 김, 소음 적음, 고효율", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: BLDC 모터(브러시리스 DC)의 장점은?\n\n다음 순서로 설명해주세요:\n1. BLDC 구조\n2. 정류 방식\n3. 장점\n4. 적용 분야 (드론, 전기차)\n5. 연습문제 3개" },
        { id: 49, q: "리니어모터란?", a: "직선운동 전동기, 회전→직선 변환 불필요, 고속철도", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 리니어모터란?\n\n다음 순서로 설명해주세요:\n1. 리니어모터 원리\n2. 회전형과 비교\n3. LIM, LSM 종류\n4. 적용 분야\n5. 연습문제 3개" },
        { id: 50, q: "히스테리시스 모터의 특징은?", a: "히스테리시스 토크 이용, 저소음, 정속도, 녹음기/시계", prompt: "전기기능사 전기기기 문제입니다.\n\n문제: 히스테리시스 모터의 특징은?\n\n다음 순서로 설명해주세요:\n1. 히스테리시스 토크\n2. 동작 원리\n3. 특성 (정속도, 저소음)\n4. 적용 분야\n5. 연습문제 3개" },
      ]
    },
  ];

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const progress = Math.round((completedItems.length / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/category/electrical/electrician-technician" className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2">
            <span>←</span>
            <span>전기기능사로 돌아가기</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">🔌</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">전기기기</h1>
              <p className="text-gray-600">직류기, 변압기, 유도기, 동기기</p>
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
                              <p className="text-sm text-orange-700 mt-1 bg-orange-100 px-2 py-1 rounded inline-block">
                                A: {q.a}
                              </p>
                            </div>
                            <button
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition"
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

        <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-200">
          <h3 className="font-bold text-orange-800 mb-3">💡 전기기기 학습 TIP</h3>
          <ul className="space-y-2 text-orange-700 text-sm">
            <li>• 변압기와 유도전동기는 매회 빠짐없이 출제됩니다</li>
            <li>• 공식을 외우기 전에 동작 원리를 이해하세요</li>
            <li>• Y-Δ 기동법의 전류/토크 비율(1/3)은 반드시 암기</li>
            <li>• 동기속도 = 120f/P 공식은 기본 중의 기본입니다</li>
          </ul>
        </div>
      </div>

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
