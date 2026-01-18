'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function CustomsLawPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);

  const questions = [
    // 관세법 총칙 (10문제)
    { id: 1, topic: "관세법 총칙", question: "관세법에서 '수입'의 정의로 옳은 것은?", options: ["외국 물품을 국내로 반입", "내국 물품을 외국으로 반출", "보세구역 내 물품 이동", "환적 물품 반입"], answer: 0, explanation: "관세법상 '수입'은 외국 물품을 국내(보세구역 포함)에 반입하는 것을 의미합니다." },
    { id: 2, topic: "관세법 총칙", question: "관세법상 '내국물품'에 해당하지 않는 것은?", options: ["국내 생산품", "수입 신고 수리된 물품", "보세구역 반입 전 물품", "수출 신고 수리 전 물품"], answer: 2, explanation: "보세구역에 반입된 외국물품은 수입신고 수리 전까지 외국물품으로 간주됩니다." },
    { id: 3, topic: "관세법 총칙", question: "관세의 납세의무자는 원칙적으로 누구인가?", options: ["운송인", "수입화주", "관세사", "보세창고 운영인"], answer: 1, explanation: "관세의 납세의무자는 원칙적으로 수입물품의 화주(수입자)입니다." },
    { id: 4, topic: "관세법 총칙", question: "관세법상 '관세영역'에 포함되지 않는 곳은?", options: ["육지", "영해", "영공", "보세구역"], answer: 3, explanation: "보세구역은 관세영역 내에 있지만 관세법 적용이 유보된 지역입니다." },
    { id: 5, topic: "관세법 총칙", question: "관세법상 과세물건 확정의 원칙은?", options: ["신고주의", "확정주의", "현황주의", "추정주의"], answer: 2, explanation: "관세법은 수입신고 당시의 물품 상태와 수량을 기준으로 과세하는 현황주의를 채택합니다." },
    { id: 6, topic: "관세법 총칙", question: "관세법상 신고납부제도에 대한 설명으로 틀린 것은?", options: ["납세의무자가 관세액 계산", "자진신고 후 납부", "세관장의 부과 결정 필요", "납세신고 시 세율 적용"], answer: 2, explanation: "신고납부제도에서는 납세의무자가 스스로 세액을 계산하여 신고·납부하며, 세관장의 부과 결정이 필요 없습니다." },
    { id: 7, topic: "관세법 총칙", question: "관세의 부과제척기간은 원칙적으로 몇 년인가?", options: ["3년", "5년", "7년", "10년"], answer: 1, explanation: "관세의 부과제척기간은 원칙적으로 수입신고일로부터 5년입니다." },
    { id: 8, topic: "관세법 총칙", question: "관세환급의 사유가 아닌 것은?", options: ["과다 납부", "계약 상이", "품질 불량 반품", "시장 가격 하락"], answer: 3, explanation: "시장 가격 하락은 관세환급 사유가 아닙니다. 과다 납부, 계약 상이, 품질 불량 등이 환급 사유입니다." },
    { id: 9, topic: "관세법 총칙", question: "관세법상 '통관'의 의미는?", options: ["물품 운송", "수출입 신고 및 신고 수리", "관세 납부만", "보세구역 반입"], answer: 1, explanation: "통관이란 관세법에 따른 수출입 신고 및 신고 수리 절차를 의미합니다." },
    { id: 10, topic: "관세법 총칙", question: "관세법상 가산세가 부과되지 않는 경우는?", options: ["신고 지연", "납부 지연", "과소 신고", "천재지변으로 인한 지연"], answer: 3, explanation: "천재지변 등 정당한 사유가 있는 경우에는 가산세가 부과되지 않습니다." },

    // 수출입 통관 (10문제)
    { id: 11, topic: "수출입 통관", question: "수입신고 시 제출해야 하는 서류가 아닌 것은?", options: ["송품장(Invoice)", "포장명세서", "선하증권", "수출신고필증"], answer: 3, explanation: "수출신고필증은 수출 시 발급되는 서류로, 수입신고 시에는 제출하지 않습니다." },
    { id: 12, topic: "수출입 통관", question: "수입신고를 할 수 있는 자가 아닌 것은?", options: ["화주", "관세사", "화주의 대리인", "운송회사 직원(위임 없이)"], answer: 3, explanation: "수입신고는 화주, 관세사, 또는 화주로부터 위임받은 대리인만 할 수 있습니다." },
    { id: 13, topic: "수출입 통관", question: "보세구역의 종류가 아닌 것은?", options: ["지정보세구역", "특허보세구역", "종합보세구역", "임시보세구역"], answer: 3, explanation: "보세구역은 지정보세구역, 특허보세구역, 종합보세구역으로 구분됩니다." },
    { id: 14, topic: "수출입 통관", question: "출항 전 수입신고가 가능한 경우는?", options: ["모든 물품", "긴급 통관 물품만", "법령에서 정한 물품", "관세청장 허가 물품만"], answer: 2, explanation: "출항 전 수입신고는 법령에서 정한 일정 요건을 갖춘 물품에 대해 가능합니다." },
    { id: 15, topic: "수출입 통관", question: "수입 통관 시 물품 검사 방법이 아닌 것은?", options: ["서류 심사", "물품 확인", "개장 검사", "품질 성능 테스트"], answer: 3, explanation: "품질 성능 테스트는 별도의 검사기관에서 하는 것이며, 통관 시 검사 방법이 아닙니다." },
    { id: 16, topic: "수출입 통관", question: "수출신고 수리 후 물품을 적재하지 않은 경우의 조치는?", options: ["자동 신고 취소", "수출신고 정정", "수출이행기간 연장 또는 신고 취하", "벌금 부과"], answer: 2, explanation: "수출신고 수리 후 물품을 적재하지 않으면 수출이행기간 연장 또는 신고 취하 절차를 밟아야 합니다." },
    { id: 17, topic: "수출입 통관", question: "특허보세구역에 해당하지 않는 것은?", options: ["보세창고", "보세공장", "보세전시장", "지정장치장"], answer: 3, explanation: "지정장치장은 지정보세구역에 해당하며, 특허보세구역에는 보세창고, 보세공장, 보세전시장 등이 있습니다." },
    { id: 18, topic: "수출입 통관", question: "일시수입물품에 대한 설명으로 틀린 것은?", options: ["일정 기간 후 재수출", "관세 면제 가능", "영구 수입과 동일 절차", "ATA Carnet 활용"], answer: 2, explanation: "일시수입물품은 일반 수입과 다른 간소화된 절차를 적용받으며, ATA Carnet 등을 활용합니다." },
    { id: 19, topic: "수출입 통관", question: "관세법상 '원산지'의 결정 기준이 아닌 것은?", options: ["완전 생산 기준", "실질적 변형 기준", "세번 변경 기준", "수출국 기준"], answer: 3, explanation: "원산지 결정 기준에는 완전생산기준, 실질적변형기준, 세번변경기준 등이 있으며, 단순 수출국 기준은 아닙니다." },
    { id: 20, topic: "수출입 통관", question: "수입신고 전 즉시 반출이 허용되는 경우가 아닌 것은?", options: ["긴급한 물품", "부패성 물품", "생동물", "일반 공산품"], answer: 3, explanation: "즉시 반출은 긴급하거나 부패 우려가 있는 물품, 생동물 등에 허용되며, 일반 공산품은 해당되지 않습니다." },

    // 관세평가 (10문제)
    { id: 21, topic: "관세평가", question: "관세평가의 원칙적인 방법은?", options: ["거래가격 방법", "동종물품 거래가격 방법", "유사물품 거래가격 방법", "공제가격 방법"], answer: 0, explanation: "관세평가의 원칙적인 방법은 실제 거래가격을 기준으로 하는 거래가격 방법입니다." },
    { id: 22, topic: "관세평가", question: "거래가격에 가산되는 요소가 아닌 것은?", options: ["운송비", "보험료", "수입 후 운송비", "포장비"], answer: 2, explanation: "수입 후 운송비는 가산되지 않으며, 수입항까지의 운송비, 보험료, 포장비 등이 가산됩니다." },
    { id: 23, topic: "관세평가", question: "WTO 관세평가협정에서 정한 과세가격 결정 방법의 순서는?", options: ["자유롭게 선택 가능", "법정 순서에 따라 적용", "수입자가 선택", "관세청장이 지정"], answer: 1, explanation: "관세평가협정에서 정한 6가지 방법은 법정 순서에 따라 순차적으로 적용해야 합니다." },
    { id: 24, topic: "관세평가", question: "거래가격이 인정되지 않는 경우는?", options: ["특수관계 없는 거래", "조건 없는 거래", "처분 제한이 있는 거래", "현금 거래"], answer: 2, explanation: "물품의 처분에 제한이 있는 경우 거래가격이 인정되지 않을 수 있습니다." },
    { id: 25, topic: "관세평가", question: "로열티(권리사용료)의 과세가격 포함 요건이 아닌 것은?", options: ["수입물품과 관련", "거래조건", "매수인 부담", "매도인과 무관한 지급"], answer: 3, explanation: "로열티가 과세가격에 포함되려면 수입물품과 관련되고 거래조건으로 매수인이 부담해야 합니다." },
    { id: 26, topic: "관세평가", question: "공제가격 방법에서 공제되는 항목은?", options: ["수입 전 운송비", "관세", "수입 후 이윤 및 경비", "보험료"], answer: 2, explanation: "공제가격 방법은 국내 판매가격에서 수입 후 이윤, 경비, 운송비, 관세 등을 공제합니다." },
    { id: 27, topic: "관세평가", question: "산정가격 방법에서 포함되는 요소가 아닌 것은?", options: ["생산원가", "통상 이윤", "일반 경비", "수입국 내 운송비"], answer: 3, explanation: "산정가격 방법은 생산원가, 통상 이윤, 일반 경비를 합산하며, 수입국 내 운송비는 포함되지 않습니다." },
    { id: 28, topic: "관세평가", question: "관세평가에서 '특수관계'에 해당하지 않는 경우는?", options: ["지분 5% 이상 보유", "고용관계", "가족관계", "단순 거래 관계"], answer: 3, explanation: "단순한 거래 관계는 특수관계에 해당하지 않습니다. 지분, 고용, 가족 관계 등이 특수관계입니다." },
    { id: 29, topic: "관세평가", question: "합리적 기준에 의한 방법에서 사용 불가한 기준은?", options: ["협정 원칙에 맞는 방법", "탄력적 적용", "수출국 국내 판매가격", "이용 가능한 자료 활용"], answer: 2, explanation: "합리적 기준 방법에서 수출국 국내 판매가격을 기준으로 사용할 수 없습니다." },
    { id: 30, topic: "관세평가", question: "관세평가에서 '간접지급액'에 해당하는 것은?", options: ["송품장 기재 금액", "매도인 채무 상환", "수입 후 보관료", "수입 후 광고비"], answer: 1, explanation: "간접지급액은 매수인이 매도인을 위해 지급하는 금액으로, 매도인의 채무 상환 등이 해당됩니다." },

    // HS Code 분류 (10문제)
    { id: 31, topic: "HS Code 분류", question: "HS(Harmonized System)의 주관 기관은?", options: ["WTO", "WCO", "UN", "ICC"], answer: 1, explanation: "HS는 세계관세기구(WCO: World Customs Organization)에서 관리합니다." },
    { id: 32, topic: "HS Code 분류", question: "HS Code의 기본 구조는?", options: ["4단위", "6단위", "8단위", "10단위"], answer: 1, explanation: "국제적으로 통일된 HS Code는 6단위이며, 각국은 이를 확장하여 사용합니다." },
    { id: 33, topic: "HS Code 분류", question: "HS Code 분류의 일반원칙(통칙)이 아닌 것은?", options: ["통칙 1: 호의 용어에 따른 분류", "통칙 3: 복합물품 분류", "통칙 6: 소호 분류", "통칙 7: 가격에 따른 분류"], answer: 3, explanation: "HS 통칙은 1~6까지 있으며, 가격에 따른 분류 원칙은 없습니다." },
    { id: 34, topic: "HS Code 분류", question: "품목분류에서 '본질적인 특성'을 부여하는 재료로 분류하는 통칙은?", options: ["통칙 1", "통칙 2", "통칙 3", "통칙 4"], answer: 2, explanation: "통칙 3(나)에서 혼합물이나 복합물품은 본질적인 특성을 부여하는 재료로 분류합니다." },
    { id: 35, topic: "HS Code 분류", question: "관세율표상 '류(Chapter)'의 개수는?", options: ["21개", "77개", "97개", "99개"], answer: 2, explanation: "관세율표는 97개의 류(Chapter)로 구성되어 있습니다(77류는 유보)." },
    { id: 36, topic: "HS Code 분류", question: "HS Code에서 '부(Section)'의 개수는?", options: ["11개", "16개", "21개", "25개"], answer: 2, explanation: "관세율표는 21개의 부(Section)로 구성되어 있습니다." },
    { id: 37, topic: "HS Code 분류", question: "세트물품의 품목분류 원칙으로 옳은 것은?", options: ["가장 비싼 물품으로 분류", "본질적 특성 부여 물품으로 분류", "가장 마지막 호로 분류", "별도 분류"], answer: 1, explanation: "세트물품은 본질적 특성을 부여하는 물품에 해당하는 호로 분류합니다." },
    { id: 38, topic: "HS Code 분류", question: "품목분류 사전심사제도의 효력 기간은?", options: ["1년", "3년", "5년", "무기한"], answer: 1, explanation: "품목분류 사전심사 결과는 통지를 받은 날부터 3년간 유효합니다." },
    { id: 39, topic: "HS Code 분류", question: "HS Code에서 '제0류'에 해당하는 품목은?", options: ["살아있는 동물", "식물성 생산품", "광물성 생산품", "해당 없음"], answer: 3, explanation: "HS Code는 제1류부터 시작하며, 제0류는 존재하지 않습니다." },
    { id: 40, topic: "HS Code 분류", question: "미조립 또는 분해된 상태로 수입되는 물품의 분류 원칙은?", options: ["부분품으로 분류", "완제품으로 분류", "별도 신고", "수입자 선택"], answer: 1, explanation: "통칙 2(가)에 따라 미조립·분해 상태로 수입되는 물품도 완성품으로 분류합니다." },

    // FTA 특혜관세 (10문제)
    { id: 41, topic: "FTA 특혜관세", question: "FTA 특혜관세 적용을 위한 필수 요건은?", options: ["당사국 원산지 충족", "수출국 생산만 인정", "직접 운송 불필요", "원산지 증명 불필요"], answer: 0, explanation: "FTA 특혜관세를 적용받으려면 당사국 원산지를 충족해야 합니다." },
    { id: 42, topic: "FTA 특혜관세", question: "FTA 원산지 결정기준 중 '완전생산기준'에 해당하는 것은?", options: ["역내 부품 사용", "세번 변경", "부가가치 기준 충족", "해당국 영토 내 채취 광물"], answer: 3, explanation: "완전생산기준은 해당국 영토 내에서 완전히 생산된 물품(광물 채취, 농산물 수확 등)에 적용됩니다." },
    { id: 43, topic: "FTA 특혜관세", question: "한-미 FTA에서 원산지 증명 방식은?", options: ["기관 발급만 인정", "자율 발급만 인정", "기관 및 자율 발급 병행", "서면 증명 불필요"], answer: 1, explanation: "한-미 FTA는 자율발급(수출자, 생산자, 수입자) 방식만 인정합니다." },
    { id: 44, topic: "FTA 특혜관세", question: "FTA 원산지 증명서의 유효기간은 일반적으로?", options: ["6개월", "1년", "2년", "무기한"], answer: 1, explanation: "대부분의 FTA에서 원산지 증명서의 유효기간은 발급일로부터 1년입니다." },
    { id: 45, topic: "FTA 특혜관세", question: "'누적기준'의 의미는?", options: ["관세 누적 부과", "역내국 재료를 원산지 재료로 인정", "관세 감면 누적", "수입 횟수 누적"], answer: 1, explanation: "누적기준은 FTA 체결국의 재료나 공정을 자국 원산지로 인정하는 규정입니다." },
    { id: 46, topic: "FTA 특혜관세", question: "FTA 직접운송원칙의 예외에 해당하는 경우는?", options: ["제3국에서 가공", "제3국 경유 시 환적만 수행", "제3국에서 포장 변경", "제3국에서 상표 부착"], answer: 1, explanation: "제3국에서 환적만 수행하고 물품의 성질이 변경되지 않으면 직접운송으로 인정됩니다." },
    { id: 47, topic: "FTA 특혜관세", question: "원산지 검증의 종류가 아닌 것은?", options: ["서면 검증", "방문 검증", "간접 검증", "자동 검증"], answer: 3, explanation: "원산지 검증에는 서면 검증, 방문 검증, 간접 검증이 있으며, 자동 검증은 없습니다." },
    { id: 48, topic: "FTA 특혜관세", question: "한-EU FTA에서 원산지 증명 방식은?", options: ["기관 발급만 인정", "인증수출자 제도", "자율 발급만 인정", "구두 증명 인정"], answer: 1, explanation: "한-EU FTA는 인증수출자 제도를 적용하여 인증받은 수출자가 원산지를 자율 증명합니다." },
    { id: 49, topic: "FTA 특혜관세", question: "FTA 특혜관세 사후 적용 신청 기한은?", options: ["수입신고 후 1개월", "수입신고 후 6개월", "수입신고 후 1년", "협정별로 다름"], answer: 3, explanation: "사후 적용 신청 기한은 FTA 협정별로 상이하며, 보통 1~2년입니다." },
    { id: 50, topic: "FTA 특혜관세", question: "FTA 원산지 증명서류의 보관 의무 기간은?", options: ["1년", "3년", "5년", "협정별로 다름"], answer: 3, explanation: "원산지 증명서류 보관 의무 기간은 협정별로 상이하며, 보통 3~5년입니다." },
  ];

  const topics = ["전체", "관세법 총칙", "수출입 통관", "관세평가", "HS Code 분류", "FTA 특혜관세"];

  const filteredQuestions = currentTopic && currentTopic !== "전체"
    ? questions.filter(q => q.topic === currentTopic)
    : questions;

  useEffect(() => {
    const saved = localStorage.getItem('customs-law-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setAnsweredQuestions(data.answeredQuestions || []);
      setScore(data.score || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customs-law-progress', JSON.stringify({
      answeredQuestions,
      score
    }));
  }, [answeredQuestions, score]);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    const currentQ = filteredQuestions[currentQuestion];
    if (selectedAnswer === currentQ.answer) {
      if (!answeredQuestions.includes(currentQ.id)) {
        setScore(score + 1);
        setAnsweredQuestions([...answeredQuestions, currentQ.id]);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
    localStorage.removeItem('customs-law-progress');
  };

  const currentQ = filteredQuestions[currentQuestion];
  const progressPercent = (answeredQuestions.length / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-100">
      <header className="bg-white/80 backdrop-blur-sm border-b border-indigo-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-indigo-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade" className="text-gray-600 hover:text-indigo-600">무역·물류</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/trade/international-trader" className="text-gray-600 hover:text-indigo-600">국제무역사</Link>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">관세법규</span>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">⚖️ 관세법규</h1>
            <span className="text-sm text-gray-500">{answeredQuestions.length} / {questions.length} 완료</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => { setCurrentTopic(topic === "전체" ? null : topic); setCurrentQuestion(0); setSelectedAnswer(null); setShowResult(false); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                (topic === "전체" && !currentTopic) || currentTopic === topic
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {filteredQuestions.length > 0 && currentQ && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">{currentQ.topic}</span>
              <span className="text-gray-500">문제 {currentQuestion + 1} / {filteredQuestions.length}</span>
            </div>

            <h2 className="text-lg font-medium text-gray-800 mb-6">{currentQ.question}</h2>

            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition ${
                    showResult
                      ? index === currentQ.answer
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200'
                      : selectedAnswer === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  disabled={showResult}
                >
                  <span className="font-medium">{index + 1}. </span>{option}
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-xl mb-6 ${selectedAnswer === currentQ.answer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`font-bold ${selectedAnswer === currentQ.answer ? 'text-green-700' : 'text-red-700'}`}>
                  {selectedAnswer === currentQ.answer ? '✅ 정답입니다!' : '❌ 오답입니다'}
                </p>
                <p className="text-gray-700 mt-2">{currentQ.explanation}</p>
                <button
                  onClick={() => setShowAIModal(true)}
                  className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  🤖 AI에게 더 자세히 물어보기
                </button>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 disabled:opacity-50"
              >
                ← 이전
              </button>
              {!showResult ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
                >
                  정답 확인
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={currentQuestion === filteredQuestions.length - 1}
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
                >
                  다음 →
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={handleReset} className="flex-1 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600">
            진행 초기화
          </button>
          <Link href="/category/trade/international-trader" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-center">
            목록으로
          </Link>
        </div>
      </main>

      {showAIModal && currentQ && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold mb-4">🤖 AI에게 질문하기</h3>
            <p className="text-gray-600 mb-4">이 문제에 대해 AI에게 더 자세한 설명을 들어보세요.</p>
            <div className="space-y-2">
              <a href={`https://claude.ai/new?q=${encodeURIComponent(`국제무역사 관세법규 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 text-center font-medium">Claude에게 질문하기</a>
              <a href={`https://chat.openai.com/?q=${encodeURIComponent(`국제무역사 관세법규 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-center font-medium">ChatGPT에게 질문하기</a>
              <a href={`https://gemini.google.com/?q=${encodeURIComponent(`국제무역사 관세법규 문제입니다: "${currentQ.question}" 정답은 "${currentQ.options[currentQ.answer]}"입니다. 왜 이것이 정답인지 자세히 설명해주세요.`)}`} target="_blank" className="block w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-center font-medium">Gemini에게 질문하기</a>
            </div>
            <button onClick={() => setShowAIModal(false)} className="mt-4 w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200">닫기</button>
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
