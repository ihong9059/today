'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ElectricalTheoryPage() {
  const [openTopics, setOpenTopics] = useState<number[]>([0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('electrician-theory-completed');
    if (saved) setCompletedItems(JSON.parse(saved));
  }, []);

  const saveProgress = (items: string[]) => {
    localStorage.setItem('electrician-theory-completed', JSON.stringify(items));
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
      title: "직류회로 기초",
      icon: "🔋",
      questions: [
        { id: 1, q: "옴의 법칙에서 전압, 전류, 저항의 관계는?", a: "V = I × R (전압 = 전류 × 저항)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 옴의 법칙에서 전압, 전류, 저항의 관계는?\n\n다음 순서로 설명해주세요:\n1. 옴의 법칙 공식과 의미\n2. 각 물리량(V, I, R)의 단위\n3. 계산 예제\n4. 실제 회로에서의 적용\n5. 연습문제 3개" },
        { id: 2, q: "저항의 직렬연결 시 합성저항 계산법은?", a: "R총 = R1 + R2 + R3 + ... (저항값의 합)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 저항의 직렬연결 시 합성저항 계산법은?\n\n다음 순서로 설명해주세요:\n1. 직렬연결의 개념\n2. 합성저항 공식 유도\n3. 전류와 전압의 분배\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 3, q: "저항의 병렬연결 시 합성저항 계산법은?", a: "1/R총 = 1/R1 + 1/R2 + ... (역수의 합)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 저항의 병렬연결 시 합성저항 계산법은?\n\n다음 순서로 설명해주세요:\n1. 병렬연결의 개념\n2. 합성저항 공식 유도\n3. 전류와 전압의 특성\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 4, q: "키르히호프 제1법칙(전류법칙)의 내용은?", a: "노드에 유입되는 전류의 합 = 유출되는 전류의 합", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 키르히호프 제1법칙(전류법칙)의 내용은?\n\n다음 순서로 설명해주세요:\n1. 제1법칙의 정의\n2. 물리적 의미 (전하 보존)\n3. 회로 해석에서의 활용\n4. 예제 회로 분석\n5. 연습문제 3개" },
        { id: 5, q: "키르히호프 제2법칙(전압법칙)의 내용은?", a: "폐회로 내 전압 상승과 전압 강하의 합은 0", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 키르히호프 제2법칙(전압법칙)의 내용은?\n\n다음 순서로 설명해주세요:\n1. 제2법칙의 정의\n2. 물리적 의미 (에너지 보존)\n3. 폐회로 해석 방법\n4. 예제 회로 분석\n5. 연습문제 3개" },
      ]
    },
    {
      title: "전력과 전력량",
      icon: "⚡",
      questions: [
        { id: 6, q: "전력(P)의 공식과 단위는?", a: "P = V × I = I²R = V²/R, 단위: W(와트)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 전력(P)의 공식과 단위는?\n\n다음 순서로 설명해주세요:\n1. 전력의 정의와 의미\n2. 다양한 전력 공식\n3. 단위 환산 (W, kW, MW)\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 7, q: "전력량(W)의 공식과 단위는?", a: "W = P × t = V × I × t, 단위: Wh, kWh", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 전력량(W)의 공식과 단위는?\n\n다음 순서로 설명해주세요:\n1. 전력량의 정의\n2. 전력과 전력량의 관계\n3. 단위 환산 (J, Wh, kWh)\n4. 전기요금 계산 예제\n5. 연습문제 3개" },
        { id: 8, q: "줄의 법칙(Joule's law)이란?", a: "H = I²Rt [J] - 열량은 전류 제곱에 비례", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 줄의 법칙(Joule's law)이란?\n\n다음 순서로 설명해주세요:\n1. 줄의 법칙 정의\n2. 공식과 각 변수의 의미\n3. 열량 단위 (J, cal)\n4. 전열기 관련 응용\n5. 연습문제 3개" },
        { id: 9, q: "1kWh는 몇 J(줄)인가?", a: "1kWh = 3,600,000J = 3.6MJ", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 1kWh는 몇 J(줄)인가?\n\n다음 순서로 설명해주세요:\n1. 단위 변환 과정\n2. kWh와 J의 관계\n3. 실생활 예시\n4. 에너지 비용 계산\n5. 연습문제 3개" },
        { id: 10, q: "전열기 효율의 의미와 계산법은?", a: "효율 = (출력에너지/입력에너지) × 100%", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 전열기 효율의 의미와 계산법은?\n\n다음 순서로 설명해주세요:\n1. 효율의 정의\n2. 효율 계산 공식\n3. 에너지 손실 요인\n4. 효율 향상 방법\n5. 연습문제 3개" },
      ]
    },
    {
      title: "교류회로 기초",
      icon: "〰️",
      questions: [
        { id: 11, q: "교류(AC)와 직류(DC)의 차이점은?", a: "AC: 크기와 방향이 주기적으로 변함, DC: 일정", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 교류(AC)와 직류(DC)의 차이점은?\n\n다음 순서로 설명해주세요:\n1. AC와 DC의 정의\n2. 파형의 차이\n3. 각각의 장단점\n4. 사용 분야\n5. 연습문제 3개" },
        { id: 12, q: "정현파 교류의 순시값 표현식은?", a: "v = Vm sin(ωt) = Vm sin(2πft)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 정현파 교류의 순시값 표현식은?\n\n다음 순서로 설명해주세요:\n1. 순시값의 정의\n2. 각 변수의 의미 (Vm, ω, f, t)\n3. 주기와 주파수의 관계\n4. 그래프 해석\n5. 연습문제 3개" },
        { id: 13, q: "실효값과 최대값의 관계는?", a: "실효값 = 최대값/√2 ≈ 0.707 × 최대값", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 실효값과 최대값의 관계는?\n\n다음 순서로 설명해주세요:\n1. 실효값의 정의와 의미\n2. 공식 유도 과정\n3. 실효값 사용 이유\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 14, q: "주파수(f)와 주기(T)의 관계는?", a: "f = 1/T, T = 1/f (한국 상용주파수: 60Hz)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 주파수(f)와 주기(T)의 관계는?\n\n다음 순서로 설명해주세요:\n1. 주파수와 주기의 정의\n2. 상호 관계 공식\n3. 한국과 다른 나라의 상용주파수\n4. 주파수의 중요성\n5. 연습문제 3개" },
        { id: 15, q: "각주파수(ω)와 주파수(f)의 관계는?", a: "ω = 2πf [rad/s]", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 각주파수(ω)와 주파수(f)의 관계는?\n\n다음 순서로 설명해주세요:\n1. 각주파수의 정의\n2. 라디안과 주파수의 관계\n3. 60Hz의 각주파수 계산\n4. 회로 해석에서의 활용\n5. 연습문제 3개" },
      ]
    },
    {
      title: "RLC 회로",
      icon: "🔄",
      questions: [
        { id: 16, q: "유도성 리액턴스(XL)의 공식은?", a: "XL = ωL = 2πfL [Ω]", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 유도성 리액턴스(XL)의 공식은?\n\n다음 순서로 설명해주세요:\n1. 유도성 리액턴스의 정의\n2. 공식과 각 변수의 의미\n3. 주파수와의 관계\n4. 인덕터의 특성\n5. 연습문제 3개" },
        { id: 17, q: "용량성 리액턴스(XC)의 공식은?", a: "XC = 1/(ωC) = 1/(2πfC) [Ω]", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 용량성 리액턴스(XC)의 공식은?\n\n다음 순서로 설명해주세요:\n1. 용량성 리액턴스의 정의\n2. 공식과 각 변수의 의미\n3. 주파수와의 관계\n4. 커패시터의 특성\n5. 연습문제 3개" },
        { id: 18, q: "RLC 직렬회로의 임피던스(Z)는?", a: "Z = √(R² + (XL-XC)²) [Ω]", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: RLC 직렬회로의 임피던스(Z)는?\n\n다음 순서로 설명해주세요:\n1. 임피던스의 정의\n2. 공식 유도 과정\n3. 페이저 다이어그램\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 19, q: "직렬공진 조건과 특성은?", a: "XL = XC일 때 공진, Z = R(최소), 전류 최대", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 직렬공진 조건과 특성은?\n\n다음 순서로 설명해주세요:\n1. 공진의 정의\n2. 공진 조건과 공진주파수\n3. 공진 시 회로 특성\n4. 공진의 응용\n5. 연습문제 3개" },
        { id: 20, q: "역률(power factor)이란?", a: "역률 = cosθ = P/S = 유효전력/피상전력", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 역률(power factor)이란?\n\n다음 순서로 설명해주세요:\n1. 역률의 정의\n2. 역률과 위상각의 관계\n3. 역률이 낮을 때 문제점\n4. 역률 개선 방법\n5. 연습문제 3개" },
      ]
    },
    {
      title: "3상 교류",
      icon: "🔺",
      questions: [
        { id: 21, q: "3상 교류의 장점은?", a: "일정한 전력 공급, 송전 효율 우수, 회전자계 발생", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 3상 교류의 장점은?\n\n다음 순서로 설명해주세요:\n1. 3상 교류의 정의\n2. 단상 대비 장점\n3. 3상 전력 계산\n4. 산업용 활용 이유\n5. 연습문제 3개" },
        { id: 22, q: "Y(스타) 결선에서 선간전압과 상전압의 관계는?", a: "VL = √3 × Vp (선간전압 = √3 × 상전압)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: Y(스타) 결선에서 선간전압과 상전압의 관계는?\n\n다음 순서로 설명해주세요:\n1. Y결선의 구조\n2. 전압 관계 유도\n3. 전류 관계\n4. 벡터도 해석\n5. 연습문제 3개" },
        { id: 23, q: "Δ(델타) 결선에서 선전류와 상전류의 관계는?", a: "IL = √3 × Ip (선전류 = √3 × 상전류)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: Δ(델타) 결선에서 선전류와 상전류의 관계는?\n\n다음 순서로 설명해주세요:\n1. Δ결선의 구조\n2. 전류 관계 유도\n3. 전압 관계\n4. Y결선과의 비교\n5. 연습문제 3개" },
        { id: 24, q: "3상 전력의 공식은?", a: "P = √3 × VL × IL × cosθ [W]", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 3상 전력의 공식은?\n\n다음 순서로 설명해주세요:\n1. 3상 전력 공식 유도\n2. 유효전력, 무효전력, 피상전력\n3. Y결선과 Δ결선에서의 전력\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 25, q: "V결선의 출력은 Δ결선 대비 몇 %인가?", a: "약 57.7% (= 1/√3 = 0.577)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: V결선의 출력은 Δ결선 대비 몇 %인가?\n\n다음 순서로 설명해주세요:\n1. V결선의 정의와 용도\n2. 출력비 계산\n3. 이용률 개념\n4. V결선 사용 상황\n5. 연습문제 3개" },
      ]
    },
    {
      title: "정전기와 콘덴서",
      icon: "📦",
      questions: [
        { id: 26, q: "정전용량(C)의 공식과 단위는?", a: "C = Q/V, 단위: F(패럿)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 정전용량(C)의 공식과 단위는?\n\n다음 순서로 설명해주세요:\n1. 정전용량의 정의\n2. 공식과 단위\n3. 평행판 콘덴서의 정전용량\n4. 유전체의 역할\n5. 연습문제 3개" },
        { id: 27, q: "콘덴서 직렬연결 시 합성정전용량은?", a: "1/C총 = 1/C1 + 1/C2 + ... (저항 병렬과 동일)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 콘덴서 직렬연결 시 합성정전용량은?\n\n다음 순서로 설명해주세요:\n1. 직렬연결의 원리\n2. 합성정전용량 공식\n3. 전압 분배\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 28, q: "콘덴서 병렬연결 시 합성정전용량은?", a: "C총 = C1 + C2 + C3 + ... (저항 직렬과 동일)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 콘덴서 병렬연결 시 합성정전용량은?\n\n다음 순서로 설명해주세요:\n1. 병렬연결의 원리\n2. 합성정전용량 공식\n3. 전하 분배\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 29, q: "콘덴서에 저장되는 에너지는?", a: "W = (1/2)CV² = (1/2)QV [J]", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 콘덴서에 저장되는 에너지는?\n\n다음 순서로 설명해주세요:\n1. 저장 에너지 공식\n2. 공식 유도 과정\n3. 에너지 밀도\n4. 계산 예제\n5. 연습문제 3개" },
        { id: 30, q: "유전체를 삽입하면 정전용량은 어떻게 변하는가?", a: "εr배 증가 (C = εr × C0)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 유전체를 삽입하면 정전용량은 어떻게 변하는가?\n\n다음 순서로 설명해주세요:\n1. 유전체의 정의\n2. 비유전율(εr)의 의미\n3. 정전용량 변화\n4. 유전체 종류와 특성\n5. 연습문제 3개" },
      ]
    },
    {
      title: "자기와 전자유도",
      icon: "🧲",
      questions: [
        { id: 31, q: "자기장의 세기(H)와 자속밀도(B)의 관계는?", a: "B = μH = μ0μrH [T]", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 자기장의 세기(H)와 자속밀도(B)의 관계는?\n\n다음 순서로 설명해주세요:\n1. H와 B의 정의\n2. 투자율(μ)의 의미\n3. 비투자율(μr)\n4. 자성체의 종류\n5. 연습문제 3개" },
        { id: 32, q: "자기회로의 옴의 법칙은?", a: "Φ = F/Rm (자속 = 기자력/자기저항)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 자기회로의 옴의 법칙은?\n\n다음 순서로 설명해주세요:\n1. 자기회로와 전기회로 비교\n2. 기자력, 자속, 자기저항\n3. 자기회로 계산\n4. 응용 예제\n5. 연습문제 3개" },
        { id: 33, q: "패러데이 전자유도 법칙은?", a: "e = -N(dΦ/dt) - 유도기전력은 자속 변화율에 비례", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 패러데이 전자유도 법칙은?\n\n다음 순서로 설명해주세요:\n1. 전자유도 현상\n2. 패러데이 법칙 공식\n3. 음의 부호(렌츠 법칙)\n4. 발전기 원리와의 연관\n5. 연습문제 3개" },
        { id: 34, q: "자기인덕턴스(L)의 단위는?", a: "H(헨리), L = NΦ/I", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 자기인덕턴스(L)의 단위는?\n\n다음 순서로 설명해주세요:\n1. 자기인덕턴스의 정의\n2. 공식과 단위\n3. 코일의 인덕턴스 계산\n4. 인덕터의 특성\n5. 연습문제 3개" },
        { id: 35, q: "상호인덕턴스(M)란?", a: "한 코일의 전류 변화가 다른 코일에 유도기전력 발생", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 상호인덕턴스(M)란?\n\n다음 순서로 설명해주세요:\n1. 상호인덕턴스의 정의\n2. 공식과 결합계수\n3. 변압기 원리와의 관계\n4. 계산 예제\n5. 연습문제 3개" },
      ]
    },
    {
      title: "전기계측",
      icon: "📊",
      questions: [
        { id: 36, q: "전압계의 연결 방법은?", a: "측정 대상에 병렬 연결 (내부저항 높음)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 전압계의 연결 방법은?\n\n다음 순서로 설명해주세요:\n1. 전압계 연결 원리\n2. 병렬 연결 이유\n3. 내부저항의 영향\n4. 배율기 사용법\n5. 연습문제 3개" },
        { id: 37, q: "전류계의 연결 방법은?", a: "측정 대상에 직렬 연결 (내부저항 낮음)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 전류계의 연결 방법은?\n\n다음 순서로 설명해주세요:\n1. 전류계 연결 원리\n2. 직렬 연결 이유\n3. 내부저항의 영향\n4. 분류기 사용법\n5. 연습문제 3개" },
        { id: 38, q: "휘트스톤 브리지의 평형조건은?", a: "R1/R2 = R3/R4 (대각 저항비 동일)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 휘트스톤 브리지의 평형조건은?\n\n다음 순서로 설명해주세요:\n1. 휘트스톤 브리지 구조\n2. 평형조건 유도\n3. 미지 저항 측정법\n4. 응용 분야\n5. 연습문제 3개" },
        { id: 39, q: "접지저항 측정에 사용하는 계기는?", a: "접지저항계(어스테스터), 전위강하법 사용", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 접지저항 측정에 사용하는 계기는?\n\n다음 순서로 설명해주세요:\n1. 접지저항 측정 원리\n2. 전위강하법\n3. 측정 방법\n4. 접지저항 기준값\n5. 연습문제 3개" },
        { id: 40, q: "절연저항 측정에 사용하는 계기는?", a: "메거(절연저항계), 고전압 인가 후 저항 측정", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 절연저항 측정에 사용하는 계기는?\n\n다음 순서로 설명해주세요:\n1. 절연저항의 의미\n2. 메거 사용법\n3. 측정 전압 선택\n4. 합격 기준\n5. 연습문제 3개" },
      ]
    },
    {
      title: "반도체 기초",
      icon: "💎",
      questions: [
        { id: 41, q: "반도체의 종류(N형, P형)를 설명하시오", a: "N형: 전자 과잉(5가 불순물), P형: 정공 과잉(3가 불순물)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 반도체의 종류(N형, P형)를 설명하시오\n\n다음 순서로 설명해주세요:\n1. 진성 반도체\n2. N형 반도체 (도핑)\n3. P형 반도체 (도핑)\n4. 다수/소수 캐리어\n5. 연습문제 3개" },
        { id: 42, q: "다이오드의 순방향 바이어스란?", a: "P에 +, N에 - 인가 시 전류 흐름 (도통)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 다이오드의 순방향 바이어스란?\n\n다음 순서로 설명해주세요:\n1. 다이오드 구조\n2. 순방향 바이어스 정의\n3. 전류 흐름 원리\n4. 문턱전압(약 0.7V)\n5. 연습문제 3개" },
        { id: 43, q: "정류회로의 종류를 설명하시오", a: "반파정류, 전파정류, 브리지정류", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 정류회로의 종류를 설명하시오\n\n다음 순서로 설명해주세요:\n1. 정류의 목적\n2. 반파정류 회로\n3. 전파정류 회로\n4. 브리지정류 회로\n5. 연습문제 3개" },
        { id: 44, q: "트랜지스터의 3단자 명칭은?", a: "E(이미터), B(베이스), C(콜렉터)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 트랜지스터의 3단자 명칭은?\n\n다음 순서로 설명해주세요:\n1. 트랜지스터 구조\n2. NPN형과 PNP형\n3. 각 단자의 역할\n4. 증폭 원리\n5. 연습문제 3개" },
        { id: 45, q: "LED의 특성과 용도는?", a: "발광다이오드, 순방향 전압 인가 시 발광, 조명/표시등", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: LED의 특성과 용도는?\n\n다음 순서로 설명해주세요:\n1. LED 동작 원리\n2. 특성 (전압, 전류, 수명)\n3. 색상별 재료\n4. 응용 분야\n5. 연습문제 3개" },
      ]
    },
    {
      title: "전기재료",
      icon: "🧱",
      questions: [
        { id: 46, q: "도체, 반도체, 절연체의 구분 기준은?", a: "비저항(저항률) 기준 - 도체<반도체<절연체", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 도체, 반도체, 절연체의 구분 기준은?\n\n다음 순서로 설명해주세요:\n1. 비저항의 정의\n2. 도체의 특성과 예시\n3. 반도체의 특성과 예시\n4. 절연체의 특성과 예시\n5. 연습문제 3개" },
        { id: 47, q: "도체 재료로 구리를 많이 사용하는 이유는?", a: "도전율 높음, 가공 용이, 가격 적당, 부식에 강함", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 도체 재료로 구리를 많이 사용하는 이유는?\n\n다음 순서로 설명해주세요:\n1. 구리의 전기적 특성\n2. 기계적 특성\n3. 알루미늄과 비교\n4. 전선 규격\n5. 연습문제 3개" },
        { id: 48, q: "절연재료의 종류와 내열등급을 설명하시오", a: "Y(90℃), A(105℃), E(120℃), B(130℃), F(155℃), H(180℃)", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 절연재료의 종류와 내열등급을 설명하시오\n\n다음 순서로 설명해주세요:\n1. 절연등급의 의미\n2. 각 등급별 온도\n3. 대표적인 절연재료\n4. 선정 기준\n5. 연습문제 3개" },
        { id: 49, q: "자성재료의 종류와 특성은?", a: "강자성체(철, 니켈), 상자성체, 반자성체", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 자성재료의 종류와 특성은?\n\n다음 순서로 설명해주세요:\n1. 자성체 분류\n2. 강자성체 특성\n3. 히스테리시스 루프\n4. 전기기기에서의 활용\n5. 연습문제 3개" },
        { id: 50, q: "초전도체의 특성과 응용은?", a: "특정 온도 이하에서 저항 0, MRI, 자기부상열차 등", prompt: "전기기능사 전기이론 문제입니다.\n\n문제: 초전도체의 특성과 응용은?\n\n다음 순서로 설명해주세요:\n1. 초전도 현상\n2. 임계온도\n3. 마이스너 효과\n4. 응용 분야\n5. 연습문제 3개" },
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
            <span className="text-4xl">⚡</span>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">전기이론</h1>
              <p className="text-gray-600">직류/교류회로, 정전기, 자기, 계측</p>
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
                              <p className="text-sm text-yellow-700 mt-1 bg-yellow-100 px-2 py-1 rounded inline-block">
                                A: {q.a}
                              </p>
                            </div>
                            <button
                              onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }}
                              className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-lg text-sm hover:bg-yellow-200 transition"
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

        <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 mb-3">💡 전기이론 학습 TIP</h3>
          <ul className="space-y-2 text-yellow-700 text-sm">
            <li>• 공식 암기보다 개념 이해가 중요합니다</li>
            <li>• 직류회로와 교류회로의 차이를 명확히 구분하세요</li>
            <li>• 3상 교류의 Y결선과 Δ결선 관계를 꼭 외우세요</li>
            <li>• 계산 문제는 단위 변환에 주의하세요</li>
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
