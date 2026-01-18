'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function Derivatives1StudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['futures-basics']);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('derivatives-advisor-1-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('derivatives-advisor-1-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const questions = [
    // 선물의 기초 (1-5)
    { id: 1, topic: 'futures-basics', question: '선물(Futures)의 정의와 기본 특성을 설명하시오.', answer: '표준화된 계약, 거래소 상장, 일일정산, 청산소 보증', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 선물(Futures)의 정의와 기본 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 2, topic: 'futures-basics', question: '선물과 선도계약(Forward)의 차이점을 설명하시오.', answer: '거래소 vs 장외, 표준화 vs 맞춤형, 일일정산 유무', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 선물과 선도계약(Forward)의 차이점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 3, topic: 'futures-basics', question: '선물거래의 증거금 제도(개시증거금, 유지증거금)를 설명하시오.', answer: '레버리지 거래, 마진콜, 일일정산(Mark-to-Market)', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 선물거래의 증거금 제도(개시증거금, 유지증거금)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 4, topic: 'futures-basics', question: '선물의 롱포지션과 숏포지션의 손익구조를 설명하시오.', answer: '롱: 가격상승 이익, 숏: 가격하락 이익, 선형손익', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 선물의 롱포지션과 숏포지션의 손익구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 5, topic: 'futures-basics', question: '선물의 만기결제 방법(실물인도, 현금결제)을 비교하시오.', answer: '실물인도: 기초자산 교환, 현금결제: 차액정산', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 선물의 만기결제 방법(실물인도, 현금결제)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },

    // 선물 가격결정 (6-10)
    { id: 6, topic: 'futures-pricing', question: '선물의 이론가격(보유비용모형)을 설명하시오.', answer: 'F = S × e^(r-d)T, 무차익거래 조건', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 선물의 이론가격(보유비용모형)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 7, topic: 'futures-pricing', question: '무위험이자율과 선물가격의 관계를 설명하시오.', answer: '이자율 상승 시 선물가격 상승, 보유비용 증가', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 무위험이자율과 선물가격의 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 8, topic: 'futures-pricing', question: '배당수익률이 선물가격에 미치는 영향을 설명하시오.', answer: '배당수익률 상승 시 선물가격 하락, 보유수익 증가', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 배당수익률이 선물가격에 미치는 영향을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 9, topic: 'futures-pricing', question: '베이시스(Basis)의 개념과 특성을 설명하시오.', answer: 'Basis = 현물가격 - 선물가격, 만기 수렴', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 베이시스(Basis)의 개념과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 10, topic: 'futures-pricing', question: '콘탱고(Contango)와 백워데이션(Backwardation)을 비교하시오.', answer: '콘탱고: F>S, 정상시장, 백워데이션: F<S, 역조시장', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 콘탱고(Contango)와 백워데이션(Backwardation)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },

    // 옵션의 기초 (11-15)
    { id: 11, topic: 'options-basics', question: '콜옵션(Call Option)의 정의와 손익구조를 설명하시오.', answer: '매수 권리, Max(S-K, 0), 무한이익 가능', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 콜옵션(Call Option)의 정의와 손익구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 12, topic: 'options-basics', question: '풋옵션(Put Option)의 정의와 손익구조를 설명하시오.', answer: '매도 권리, Max(K-S, 0), 하락 보호', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 풋옵션(Put Option)의 정의와 손익구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 13, topic: 'options-basics', question: '옵션의 내재가치(Intrinsic Value)와 시간가치(Time Value)를 설명하시오.', answer: '내재가치: 즉시행사 가치, 시간가치: 프리미엄 - 내재가치', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 옵션의 내재가치(Intrinsic Value)와 시간가치(Time Value)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 14, topic: 'options-basics', question: 'ITM, ATM, OTM 옵션의 특성을 비교하시오.', answer: 'ITM: 내재가치>0, ATM: S=K, OTM: 내재가치=0', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: ITM, ATM, OTM 옵션의 특성을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 15, topic: 'options-basics', question: '풋-콜 패리티(Put-Call Parity)를 설명하시오.', answer: 'C - P = S - K×e^(-rT), 무차익 조건', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 풋-콜 패리티(Put-Call Parity)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },

    // 옵션 가격결정 (16-20)
    { id: 16, topic: 'options-pricing', question: '옵션 가격결정 요인 6가지를 설명하시오.', answer: 'S, K, T, r, 변동성, 배당(콜/풋 방향 상이)', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 옵션 가격결정 요인 6가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 17, topic: 'options-pricing', question: '블랙-숄즈(Black-Scholes) 모형의 가정과 공식을 설명하시오.', answer: 'C = S×N(d1) - K×e^(-rT)×N(d2), 연속복리, 로그정규분포', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 블랙-숄즈(Black-Scholes) 모형의 가정과 공식을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 18, topic: 'options-pricing', question: '이항모형(Binomial Model)의 원리와 계산을 설명하시오.', answer: '상승/하락 트리, 위험중립확률, 역방향 계산', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 이항모형(Binomial Model)의 원리와 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 19, topic: 'options-pricing', question: '미국형 옵션과 유럽형 옵션의 차이를 설명하시오.', answer: '조기행사 가능 여부, 미국형 프리미엄 >= 유럽형', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 미국형 옵션과 유럽형 옵션의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 20, topic: 'options-pricing', question: '위험중립가격결정(Risk-Neutral Pricing)을 설명하시오.', answer: '무위험이자율로 할인, 기대수익률 무관', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 위험중립가격결정(Risk-Neutral Pricing)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },

    // 그릭스 (21-25)
    { id: 21, topic: 'greeks', question: '델타(Delta)의 정의와 활용을 설명하시오.', answer: 'Delta = dV/dS, 헤지비율, 콜: 0~1, 풋: -1~0', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 델타(Delta)의 정의와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 22, topic: 'greeks', question: '감마(Gamma)의 의미와 특성을 설명하시오.', answer: 'Gamma = dDelta/dS, ATM 최대, 헤지조정 빈도', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 감마(Gamma)의 의미와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 23, topic: 'greeks', question: '세타(Theta)와 시간가치 감소를 설명하시오.', answer: 'Theta = dV/dT, 음수, 시간경과에 따른 가치감소', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 세타(Theta)와 시간가치 감소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 24, topic: 'greeks', question: '베가(Vega)와 변동성 민감도를 설명하시오.', answer: 'Vega = dV/dσ, 양수, ATM/장기물 최대', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 베가(Vega)와 변동성 민감도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 25, topic: 'greeks', question: '로(Rho)와 이자율 민감도를 설명하시오.', answer: 'Rho = dV/dr, 콜: 양수, 풋: 음수', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 로(Rho)와 이자율 민감도를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },

    // 선물 거래전략 (26-30)
    { id: 26, topic: 'futures-strategy', question: '헤지(Hedge) 거래의 원리와 종류를 설명하시오.', answer: '매도헤지, 매수헤지, 크로스헤지, 베이시스 리스크', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 헤지(Hedge) 거래의 원리와 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 27, topic: 'futures-strategy', question: '최적헤지비율(Optimal Hedge Ratio)을 계산하시오.', answer: 'h* = ρ × (σs/σf), 분산최소화 헤지', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 최적헤지비율(Optimal Hedge Ratio)을 계산하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 28, topic: 'futures-strategy', question: '투기거래(Speculation)의 특성과 전략을 설명하시오.', answer: '방향성 베팅, 레버리지 활용, 고위험 고수익', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 투기거래(Speculation)의 특성과 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 29, topic: 'futures-strategy', question: '차익거래(Arbitrage)와 무위험이익을 설명하시오.', answer: '가격괴리 이용, 현물-선물 차익, 캐시앤캐리', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 차익거래(Arbitrage)와 무위험이익을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 30, topic: 'futures-strategy', question: '스프레드 거래(캘린더, 인터마켓)를 설명하시오.', answer: '월물간 스프레드, 상품간 스프레드, 시장간 스프레드', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 스프레드 거래(캘린더, 인터마켓)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },

    // 옵션 거래전략 (31-35)
    { id: 31, topic: 'options-strategy', question: '스트래들(Straddle) 전략의 손익구조를 설명하시오.', answer: '동일행사가 콜+풋 매수/매도, 변동성 방향 베팅', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 스트래들(Straddle) 전략의 손익구조를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 32, topic: 'options-strategy', question: '스트랭글(Strangle) 전략과 스트래들 비교를 설명하시오.', answer: 'OTM 콜+풋, 손익분기점 확대, 프리미엄 절감', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 스트랭글(Strangle) 전략과 스트래들 비교를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 33, topic: 'options-strategy', question: '불스프레드(Bull Spread)와 베어스프레드(Bear Spread)를 설명하시오.', answer: '방향성 제한 전략, 수직스프레드, 비용절감', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 불스프레드(Bull Spread)와 베어스프레드(Bear Spread)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 34, topic: 'options-strategy', question: '버터플라이(Butterfly) 스프레드 전략을 설명하시오.', answer: '3개 행사가, 중심 매도 + 양쪽 매수, 제한된 손익', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 버터플라이(Butterfly) 스프레드 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 35, topic: 'options-strategy', question: '콘도르(Condor)와 아이언콘도르(Iron Condor) 전략을 설명하시오.', answer: '4개 행사가, 버터플라이 확장, 횡보장 전략', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 콘도르(Condor)와 아이언콘도르(Iron Condor) 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },

    // 변동성 거래 (36-40)
    { id: 36, topic: 'volatility-trading', question: '역사적 변동성(Historical Volatility)의 계산과 특성을 설명하시오.', answer: '수익률 표준편차, 과거 데이터 기반, 연환산', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 역사적 변동성(Historical Volatility)의 계산과 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 37, topic: 'volatility-trading', question: '내재변동성(Implied Volatility)의 개념과 산출을 설명하시오.', answer: '시장가격 역산, 옵션가격결정모형 활용', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 내재변동성(Implied Volatility)의 개념과 산출을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 38, topic: 'volatility-trading', question: '변동성 스마일(Volatility Smile)과 스큐(Skew)를 설명하시오.', answer: 'OTM 옵션 내재변동성 상승, 좌우 비대칭', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 변동성 스마일(Volatility Smile)과 스큐(Skew)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 39, topic: 'volatility-trading', question: 'VIX 지수의 의미와 활용을 설명하시오.', answer: '공포지수, S&P500 옵션 내재변동성, 시장심리', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: VIX 지수의 의미와 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
    { id: 40, topic: 'volatility-trading', question: '변동성 매매 전략(롱볼, 숏볼)을 설명하시오.', answer: '델타중립 + 감마/베가 포지션, 변동성 방향 베팅', prompt: '파생상품투자권유자문인력 파생상품 I 문제입니다.\n\n문제: 변동성 매매 전략(롱볼, 숏볼)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 계산 방법/공식\n4. 실무 적용\n5. 기출 포인트' },
  ];

  const topics = [
    { id: 'futures-basics', name: '선물의 기초', icon: '📊', count: 5 },
    { id: 'futures-pricing', name: '선물 가격결정', icon: '💹', count: 5 },
    { id: 'options-basics', name: '옵션의 기초', icon: '📈', count: 5 },
    { id: 'options-pricing', name: '옵션 가격결정', icon: '🧮', count: 5 },
    { id: 'greeks', name: '그릭스', icon: '🔢', count: 5 },
    { id: 'futures-strategy', name: '선물 거래전략', icon: '🎯', count: 5 },
    { id: 'options-strategy', name: '옵션 거래전략', icon: '♟️', count: 5 },
    { id: 'volatility-trading', name: '변동성 거래', icon: '📉', count: 5 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance" className="text-gray-500 hover:text-gray-700">금융</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/finance/derivatives-advisor" className="text-gray-500 hover:text-gray-700">파생상품투자권유자문인력</Link>
            <span className="text-gray-300">/</span>
            <span className="text-purple-600 font-medium">파생상품 I</span>
          </nav>
        </div>
      </div>

      <section className="bg-gradient-to-r from-purple-600 to-violet-500 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl">📊</div>
            <div>
              <h1 className="text-2xl font-bold">파생상품 I</h1>
              <p className="text-purple-100">선물, 옵션 기초부터 가격결정, 그릭스, 거래전략, 변동성까지</p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {topics.map(topic => {
            const topicQuestions = questions.filter(q => q.topic === topic.id);
            const completed = topicQuestions.filter(q => completedQuestions.includes(q.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`p-3 rounded-xl text-left transition ${
                  expandedTopics.includes(topic.id)
                    ? 'bg-purple-100 border-2 border-purple-300'
                    : 'bg-white border border-gray-200 hover:border-purple-200'
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
                              ? 'bg-purple-500 border-purple-500 text-white'
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
                              className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm hover:bg-purple-200 transition flex-shrink-0"
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
          <Link href="/category/finance/derivatives-advisor" className="px-4 py-2 text-gray-600 hover:text-gray-800">
            ← 파생상품투자권유자문인력
          </Link>
        </div>
      </div>

      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">×</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">프롬프트 복사하기</button></div></div></div>)}

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. 파생상품투자권유자문인력 학습을 응원합니다!</p>
        </div>
      </footer>
    </div>
  );
}
