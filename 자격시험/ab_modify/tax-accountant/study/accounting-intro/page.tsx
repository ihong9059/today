'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AccountingIntroStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['financial-basics']);

  useEffect(() => {
    const saved = localStorage.getItem('tax-accountant-accounting-intro-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  const toggleQuestion = (id: number) => {
    const updated = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(updated);
    localStorage.setItem('tax-accountant-accounting-intro-progress', JSON.stringify(updated));
  };

  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]);
  };

  const questions = [
    // 재무회계기초 (1-13)
    { id: 1, topic: 'financial-basics', question: '재무회계의 목적과 재무제표의 종류를 설명하시오.', answer: '정보이용자의 경제적 의사결정에 유용한 정보를 제공하는 것이 목적이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 재무회계의 목적과 재무제표의 종류를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재무회계의 정의와 목적\n2. 재무제표의 5가지 종류\n3. 각 재무제표의 구성요소\n4. 재무제표 간의 관계\n5. 연습문제 3개' },
    { id: 2, topic: 'financial-basics', question: '회계의 기본가정(계속기업, 기간별보고, 화폐단위)을 설명하시오.', answer: '계속기업 가정, 기간별 보고 가정, 화폐단위 가정이 있다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 회계의 기본가정(계속기업, 기간별보고, 화폐단위)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계속기업 가정의 의미\n2. 기간별 보고 가정의 필요성\n3. 화폐단위 가정의 한계\n4. 가정이 위배되는 경우\n5. 연습문제 3개' },
    { id: 3, topic: 'financial-basics', question: '발생주의와 현금주의 회계의 차이를 설명하시오.', answer: '발생주의는 거래 발생시점에, 현금주의는 현금 수수시점에 인식한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 발생주의와 현금주의 회계의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 발생주의 회계의 개념\n2. 현금주의 회계의 개념\n3. 수익·비용 인식시점 차이\n4. 발생주의 채택 이유\n5. 연습문제 3개' },
    { id: 4, topic: 'financial-basics', question: '재무정보의 질적특성(목적적합성, 신뢰성)을 설명하시오.', answer: '목적적합성은 의사결정 유용성, 신뢰성은 정보의 정확성과 검증가능성이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 재무정보의 질적특성(목적적합성, 신뢰성)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 근본적 질적특성\n2. 목적적합성의 구성요소\n3. 표현의 충실성\n4. 보강적 질적특성\n5. 연습문제 3개' },
    { id: 5, topic: 'financial-basics', question: '재무상태표의 구성요소(자산, 부채, 자본)를 정의하시오.', answer: '자산은 미래경제적효익, 부채는 현재의무, 자본은 순자산이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 재무상태표의 구성요소(자산, 부채, 자본)를 정의하시오.\n\n다음 순서로 설명해주세요:\n1. 자산의 정의와 인식조건\n2. 부채의 정의와 인식조건\n3. 자본의 정의\n4. 재무상태표 등식\n5. 연습문제 3개' },
    { id: 6, topic: 'financial-basics', question: '포괄손익계산서의 구성요소(수익, 비용)와 표시방법을 설명하시오.', answer: '수익은 자산증가/부채감소, 비용은 자산감소/부채증가를 초래하는 요소이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 포괄손익계산서의 구성요소(수익, 비용)와 표시방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 수익의 정의와 인식\n2. 비용의 정의와 인식\n3. 당기순손익과 기타포괄손익\n4. 기능별·성격별 분류\n5. 연습문제 3개' },
    { id: 7, topic: 'financial-basics', question: '분개와 전기의 원리를 설명하시오.', answer: '분개는 거래를 차변과 대변으로 분석하고, 전기는 원장에 기록하는 과정이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 분개와 전기의 원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분개의 개념과 방법\n2. 차변과 대변의 원칙\n3. 전기의 개념\n4. 회계순환과정\n5. 연습문제 3개' },
    { id: 8, topic: 'financial-basics', question: '시산표의 종류와 작성방법을 설명하시오.', answer: '합계시산표, 잔액시산표, 합계잔액시산표가 있으며 대차균형을 확인한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 시산표의 종류와 작성방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 시산표의 목적\n2. 합계시산표\n3. 잔액시산표\n4. 시산표의 한계\n5. 연습문제 3개' },
    { id: 9, topic: 'financial-basics', question: '결산수정분개의 유형과 사례를 설명하시오.', answer: '미수수익, 미지급비용, 선수수익, 선급비용 등의 조정분개가 있다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 결산수정분개의 유형과 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결산수정분개의 필요성\n2. 미수수익·미지급비용\n3. 선수수익·선급비용\n4. 감가상각비 계상\n5. 연습문제 3개' },
    { id: 10, topic: 'financial-basics', question: '재고자산의 평가방법(선입선출, 가중평균 등)을 비교하시오.', answer: '선입선출법, 가중평균법, 이동평균법이 있으며 원가흐름에 따라 다르다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 재고자산의 평가방법(선입선출, 가중평균 등)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 선입선출법\n2. 가중평균법\n3. 이동평균법\n4. 물가변동 시 효과 비교\n5. 연습문제 3개' },
    { id: 11, topic: 'financial-basics', question: '재고자산의 순실현가능가치 평가를 설명하시오.', answer: '재고자산은 취득원가와 순실현가능가치 중 낮은 금액으로 평가한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 재고자산의 순실현가능가치 평가를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 저가법의 개념\n2. 순실현가능가치 산정\n3. 재고자산평가손실\n4. 평가손실 환입\n5. 연습문제 3개' },
    { id: 12, topic: 'financial-basics', question: '수익인식의 5단계 모형을 설명하시오.', answer: '계약식별, 수행의무식별, 거래가격결정, 배분, 수익인식의 5단계이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 수익인식의 5단계 모형을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 계약의 식별\n2. 수행의무의 식별\n3. 거래가격 결정\n4. 거래가격 배분과 수익인식\n5. 연습문제 3개' },
    { id: 13, topic: 'financial-basics', question: '현금흐름표의 작성방법(직접법, 간접법)을 비교하시오.', answer: '직접법은 총액표시, 간접법은 당기순이익에서 조정하여 작성한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 현금흐름표의 작성방법(직접법, 간접법)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 현금흐름표의 목적\n2. 직접법의 작성\n3. 간접법의 작성\n4. 영업·투자·재무활동 구분\n5. 연습문제 3개' },

    // 금융자산과 부채 (14-25)
    { id: 14, topic: 'financial-assets', question: '금융자산의 분류기준과 측정방법을 설명하시오.', answer: '사업모형과 계약상 현금흐름에 따라 AC, FVOCI, FVPL로 분류한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 금융자산의 분류기준과 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 금융자산의 정의\n2. 분류 기준(사업모형, 현금흐름특성)\n3. 상각후원가(AC) 측정\n4. FVOCI, FVPL 측정\n5. 연습문제 3개' },
    { id: 15, topic: 'financial-assets', question: '유효이자율법을 이용한 상각후원가 계산을 설명하시오.', answer: '유효이자율로 이자수익을 계산하고 장부금액을 조정한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 유효이자율법을 이용한 상각후원가 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유효이자율의 개념\n2. 할인·할증 상각\n3. 이자수익 계산\n4. 상각표 작성\n5. 연습문제 3개' },
    { id: 16, topic: 'financial-assets', question: '매출채권의 대손회계처리를 설명하시오.', answer: '대손충당금을 설정하고 실제 대손 발생 시 상계처리한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 매출채권의 대손회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 대손충당금의 설정\n2. 대손상각비 인식\n3. 대손 발생 시 처리\n4. 대손충당금 환입\n5. 연습문제 3개' },
    { id: 17, topic: 'financial-assets', question: '지분상품 투자의 회계처리를 설명하시오.', answer: 'FVPL 또는 FVOCI(지정)로 측정하며, FVOCI 선택 시 재분류 불가하다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 지분상품 투자의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 지분상품의 분류\n2. FVPL 측정\n3. FVOCI 선택(취소불가)\n4. 배당금 처리\n5. 연습문제 3개' },
    { id: 18, topic: 'financial-assets', question: '금융자산의 손상(기대신용손실모형)을 설명하시오.', answer: '기대신용손실에 기초하여 손실충당금을 인식한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 금융자산의 손상(기대신용손실모형)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기대신용손실의 개념\n2. 3단계 접근법\n3. 12개월 기대신용손실\n4. 전체기간 기대신용손실\n5. 연습문제 3개' },
    { id: 19, topic: 'financial-assets', question: '사채의 발행(할인발행, 할증발행)과 이자비용 계산을 설명하시오.', answer: '액면이자율과 시장이자율의 차이에 따라 할인·할증발행된다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 사채의 발행(할인발행, 할증발행)과 이자비용 계산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 사채 발행가액 계산\n2. 할인발행 회계처리\n3. 할증발행 회계처리\n4. 유효이자율법 적용\n5. 연습문제 3개' },
    { id: 20, topic: 'financial-assets', question: '충당부채의 인식요건과 측정방법을 설명하시오.', answer: '현재의무, 자원유출가능성, 신뢰성있는 추정이 요건이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 충당부채의 인식요건과 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 충당부채의 정의\n2. 인식 요건 3가지\n3. 최선의 추정치\n4. 현재가치 측정\n5. 연습문제 3개' },
    { id: 21, topic: 'financial-assets', question: '금융부채의 분류와 측정방법을 설명하시오.', answer: '상각후원가 또는 공정가치로 측정하며, 대부분 상각후원가로 측정한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 금융부채의 분류와 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 금융부채의 분류\n2. 상각후원가 측정\n3. FVPL 측정\n4. 자기신용위험 변동\n5. 연습문제 3개' },
    { id: 22, topic: 'financial-assets', question: '우발부채와 우발자산의 회계처리를 설명하시오.', answer: '우발부채는 주석공시, 우발자산은 거의 확실할 때 인식한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 우발부채와 우발자산의 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 우발부채의 정의\n2. 우발부채의 처리\n3. 우발자산의 정의\n4. 공시 요건\n5. 연습문제 3개' },
    { id: 23, topic: 'financial-assets', question: '리스이용자의 회계처리(사용권자산, 리스부채)를 설명하시오.', answer: '사용권자산과 리스부채를 인식하고 감가상각과 이자비용을 인식한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 리스이용자의 회계처리(사용권자산, 리스부채)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 리스의 정의\n2. 사용권자산 인식\n3. 리스부채 측정\n4. 후속측정\n5. 연습문제 3개' },
    { id: 24, topic: 'financial-assets', question: '금융자산의 제거 조건을 설명하시오.', answer: '현금흐름에 대한 권리가 소멸하거나 양도 시 제거한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 금융자산의 제거 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제거의 의의\n2. 권리소멸에 의한 제거\n3. 양도에 의한 제거\n4. 위험과 보상의 이전\n5. 연습문제 3개' },
    { id: 25, topic: 'financial-assets', question: '환율변동효과(외화거래, 기능통화)를 설명하시오.', answer: '거래일 환율로 인식하고 결제일 및 보고기간말에 환산한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 환율변동효과(외화거래, 기능통화)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 기능통화의 결정\n2. 외화거래의 인식\n3. 화폐성·비화폐성 항목\n4. 외화환산손익\n5. 연습문제 3개' },

    // 유무형자산 (26-38)
    { id: 26, topic: 'tangible-intangible', question: '유형자산의 인식요건과 취득원가 구성요소를 설명하시오.', answer: '미래경제적효익 유입과 원가의 신뢰성있는 측정이 인식요건이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 유형자산의 인식요건과 취득원가 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 유형자산의 정의\n2. 인식 요건\n3. 취득원가 구성\n4. 부대원가의 범위\n5. 연습문제 3개' },
    { id: 27, topic: 'tangible-intangible', question: '감가상각방법(정액법, 정률법, 생산량비례법)을 비교하시오.', answer: '정액법은 균등배분, 정률법은 체감배분, 생산량비례법은 사용량에 비례한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 감가상각방법(정액법, 정률법, 생산량비례법)을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 정액법 계산\n2. 정률법 계산\n3. 생산량비례법 계산\n4. 감가상각방법 변경\n5. 연습문제 3개' },
    { id: 28, topic: 'tangible-intangible', question: '유형자산의 재평가모형 적용방법을 설명하시오.', answer: '공정가치로 재평가하고 재평가잉여금 또는 손실을 인식한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 유형자산의 재평가모형 적용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 재평가모형 선택\n2. 재평가증가액 처리\n3. 재평가감소액 처리\n4. 재평가잉여금의 대체\n5. 연습문제 3개' },
    { id: 29, topic: 'tangible-intangible', question: '유형자산의 손상차손 인식과 환입을 설명하시오.', answer: '회수가능액이 장부금액보다 작으면 손상차손을 인식한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 유형자산의 손상차손 인식과 환입을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 손상의 징후\n2. 회수가능액 결정\n3. 손상차손 인식\n4. 손상차손 환입\n5. 연습문제 3개' },
    { id: 30, topic: 'tangible-intangible', question: '투자부동산의 인식과 측정방법을 설명하시오.', answer: '임대수익이나 시세차익 목적의 부동산으로 원가모형 또는 공정가치모형으로 측정한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 투자부동산의 인식과 측정방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 투자부동산의 정의\n2. 원가모형\n3. 공정가치모형\n4. 계정대체\n5. 연습문제 3개' },
    { id: 31, topic: 'tangible-intangible', question: '무형자산의 인식요건과 내부창출 무형자산을 설명하시오.', answer: '식별가능성, 통제, 미래경제적효익이 요건이며 개발비만 자산화 가능하다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 무형자산의 인식요건과 내부창출 무형자산을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 무형자산의 정의\n2. 인식 요건\n3. 연구비와 개발비\n4. 개발비 자산화 요건\n5. 연습문제 3개' },
    { id: 32, topic: 'tangible-intangible', question: '영업권의 인식과 손상검사를 설명하시오.', answer: '사업결합에서만 인식하며 매년 손상검사를 실시한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 영업권의 인식과 손상검사를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 영업권의 정의\n2. 영업권의 측정\n3. 현금창출단위 배분\n4. 손상검사\n5. 연습문제 3개' },
    { id: 33, topic: 'tangible-intangible', question: '유형자산의 교환거래 회계처리를 설명하시오.', answer: '상업적 실질이 있으면 공정가치, 없으면 장부금액으로 측정한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 유형자산의 교환거래 회계처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 교환의 유형\n2. 상업적 실질 판단\n3. 공정가치 측정\n4. 교환손익 인식\n5. 연습문제 3개' },
    { id: 34, topic: 'tangible-intangible', question: '차입원가의 자본화 요건과 계산방법을 설명하시오.', answer: '적격자산의 취득에 직접 관련된 차입원가를 자본화한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 차입원가의 자본화 요건과 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 적격자산의 정의\n2. 자본화 개시·중단·종료\n3. 특정차입금\n4. 일반차입금 자본화율\n5. 연습문제 3개' },
    { id: 35, topic: 'tangible-intangible', question: '매각예정비유동자산의 분류와 측정을 설명하시오.', answer: '장부금액과 순공정가치 중 낮은 금액으로 측정하며 감가상각하지 않는다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 매각예정비유동자산의 분류와 측정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 분류 요건\n2. 측정(저가법)\n3. 감가상각 중단\n4. 표시와 공시\n5. 연습문제 3개' },
    { id: 36, topic: 'tangible-intangible', question: '정부보조금의 회계처리방법을 설명하시오.', answer: '자산관련보조금은 차감표시 또는 이연수익, 수익관련보조금은 수익인식한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 정부보조금의 회계처리방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 정부보조금의 인식\n2. 자산관련 보조금\n3. 수익관련 보조금\n4. 상환 시 처리\n5. 연습문제 3개' },
    { id: 37, topic: 'tangible-intangible', question: '복구충당부채와 자산원가 관계를 설명하시오.', answer: '자산 철거·복구 의무의 현재가치를 자산원가에 포함하고 충당부채로 인식한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 복구충당부채와 자산원가 관계를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 복구의무의 인식\n2. 자산원가 포함\n3. 충당부채의 현재가치\n4. 후속 측정\n5. 연습문제 3개' },
    { id: 38, topic: 'tangible-intangible', question: '유형자산의 처분손익 계산방법을 설명하시오.', answer: '처분대가에서 장부금액을 차감하여 처분손익을 계산한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 유형자산의 처분손익 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제거의 시점\n2. 장부금액 계산\n3. 처분손익 인식\n4. 분류표시\n5. 연습문제 3개' },

    // 원가관리회계 (39-50)
    { id: 39, topic: 'cost-management', question: '원가의 분류방법(제조원가, 판매관리비)을 설명하시오.', answer: '직접재료비, 직접노무비, 제조간접비로 구성되며 판매관리비와 구분된다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 원가의 분류방법(제조원가, 판매관리비)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조원가의 구성\n2. 직접비와 간접비\n3. 판매비와 관리비\n4. 제품원가와 기간비용\n5. 연습문제 3개' },
    { id: 40, topic: 'cost-management', question: '개별원가계산과 종합원가계산을 비교하시오.', answer: '개별원가는 주문별, 종합원가는 공정별로 원가를 집계한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 개별원가계산과 종합원가계산을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 개별원가계산의 특징\n2. 종합원가계산의 특징\n3. 적용 업종\n4. 원가 집계 방법\n5. 연습문제 3개' },
    { id: 41, topic: 'cost-management', question: '완성품환산량의 계산방법(선입선출법, 평균법)을 설명하시오.', answer: '기초재공품과 당기투입분의 처리에 따라 선입선출법과 평균법이 다르다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 완성품환산량의 계산방법(선입선출법, 평균법)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 완성품환산량의 개념\n2. 평균법 계산\n3. 선입선출법 계산\n4. 원가배분\n5. 연습문제 3개' },
    { id: 42, topic: 'cost-management', question: '제조간접비 배부방법과 배부차이 처리를 설명하시오.', answer: '예정배부율로 배부하고 배부차이는 매출원가 또는 비례배분한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 제조간접비 배부방법과 배부차이 처리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 제조간접비 배부\n2. 예정배부율 계산\n3. 과대·과소 배부\n4. 배부차이 처리\n5. 연습문제 3개' },
    { id: 43, topic: 'cost-management', question: '변동원가계산과 전부원가계산을 비교하시오.', answer: '변동원가계산은 고정제조간접비를 기간비용으로, 전부원가계산은 제품원가로 처리한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 변동원가계산과 전부원가계산을 비교하시오.\n\n다음 순서로 설명해주세요:\n1. 변동원가계산의 특징\n2. 전부원가계산의 특징\n3. 이익 차이 발생\n4. 재고량 변동 효과\n5. 연습문제 3개' },
    { id: 44, topic: 'cost-management', question: 'CVP 분석(손익분기점, 목표이익)을 설명하시오.', answer: '공헌이익을 이용해 손익분기점 매출액과 목표이익 달성 판매량을 계산한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: CVP 분석(손익분기점, 목표이익)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. CVP 분석의 가정\n2. 공헌이익률\n3. 손익분기점 계산\n4. 목표이익 분석\n5. 연습문제 3개' },
    { id: 45, topic: 'cost-management', question: '표준원가계산과 차이분석을 설명하시오.', answer: '표준원가와 실제원가의 차이를 가격차이와 수량차이로 분석한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 표준원가계산과 차이분석을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 표준원가의 설정\n2. 직접재료비 차이\n3. 직접노무비 차이\n4. 제조간접비 차이\n5. 연습문제 3개' },
    { id: 46, topic: 'cost-management', question: '활동기준원가계산(ABC)의 원리와 장점을 설명하시오.', answer: '활동별로 원가를 집계하고 원가동인에 따라 배부하여 정확성을 높인다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 활동기준원가계산(ABC)의 원리와 장점을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. ABC의 개념\n2. 활동과 원가동인\n3. 전통적 원가계산과 비교\n4. ABC의 장단점\n5. 연습문제 3개' },
    { id: 47, topic: 'cost-management', question: '결합원가의 배분방법을 설명하시오.', answer: '물량기준법, 상대적판매가치법, 순실현가치법 등이 있다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 결합원가의 배분방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 결합원가의 개념\n2. 물량기준법\n3. 상대적 판매가치법\n4. 순실현가치법\n5. 연습문제 3개' },
    { id: 48, topic: 'cost-management', question: '관련원가 분석과 의사결정을 설명하시오.', answer: '의사결정과 관련 있는 미래 차별적 원가만 고려한다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 관련원가 분석과 의사결정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 관련원가의 정의\n2. 매몰원가\n3. 기회원가\n4. 특별주문 의사결정\n5. 연습문제 3개' },
    { id: 49, topic: 'cost-management', question: '자본예산(순현재가치법, 내부수익률법)을 설명하시오.', answer: 'NPV는 현금흐름의 현재가치, IRR은 NPV가 0이 되는 할인율이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 자본예산(순현재가치법, 내부수익률법)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 자본예산의 의의\n2. 순현재가치법(NPV)\n3. 내부수익률법(IRR)\n4. NPV와 IRR 비교\n5. 연습문제 3개' },
    { id: 50, topic: 'cost-management', question: '성과평가지표(ROI, RI, EVA)를 비교하시오.', answer: 'ROI는 투자수익률, RI는 잔여이익, EVA는 경제적부가가치이다.', prompt: '세무사 회계학개론 문제입니다.\n\n문제: 성과평가지표(ROI, RI, EVA)를 비교하시오.\n\n다음 순서로 설명해주세요:\n1. ROI의 계산과 한계\n2. RI의 계산\n3. EVA의 계산\n4. 각 지표의 장단점\n5. 연습문제 3개' },
  ];

  const topics = [
    { id: 'financial-basics', name: '재무회계기초', count: 13 },
    { id: 'financial-assets', name: '금융자산과 부채', count: 12 },
    { id: 'tangible-intangible', name: '유무형자산', count: 13 },
    { id: 'cost-management', name: '원가관리회계', count: 12 },
  ];

  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">홈</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting" className="text-gray-500 hover:text-gray-700">회계·세무</Link>
            <span className="text-gray-300">/</span>
            <Link href="/category/accounting/tax-accountant" className="text-gray-500 hover:text-gray-700">세무사</Link>
            <span className="text-gray-300">/</span>
            <span className="text-emerald-600 font-medium">회계학개론</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 회계학개론</h1>
          <p className="text-gray-600">세무사 1차 시험 | 40문항 | 60분</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">학습 진행률</span>
            <span className="text-emerald-600 font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{completedQuestions.length} / {questions.length} 문항 완료</p>
        </div>

        <div className="space-y-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button onClick={() => toggleTopic(topic.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{expandedTopics.includes(topic.id) ? '📂' : '📁'}</span>
                  <span className="font-medium text-gray-900">{topic.name}</span>
                  <span className="text-sm text-gray-500">({topic.count}문항)</span>
                </div>
                <span className="text-gray-400">{expandedTopics.includes(topic.id) ? '▼' : '▶'}</span>
              </button>
              {expandedTopics.includes(topic.id) && (
                <div className="border-t divide-y">
                  {questions.filter(q => q.topic === topic.id).map(q => (
                    <div key={q.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" checked={completedQuestions.includes(q.id)} onChange={() => toggleQuestion(q.id)} className="mt-1 w-5 h-5 text-emerald-600 rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-1">Q{q.id}. {q.question}</p>
                          <p className="text-sm text-gray-600 mb-2">💡 {q.answer}</p>
                          <button onClick={() => { setCurrentPrompt(q.prompt); setShowAIModal(true); }} className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-sm hover:bg-emerald-200 transition">🤖 AI</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <Link href="/category/accounting/tax-accountant/study/tax-law-intro" className="px-4 py-2 text-gray-600 hover:text-gray-800">← 세법학개론</Link>
          <Link href="/category/accounting/tax-accountant/study/commercial-law" className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">다음: 상법 →</Link>
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
                  <span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div>
                </a>
                <a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200">
                  <span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div>
                </a>
                <a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200">
                  <span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div>
                </a>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2026 자격증 가이드. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
