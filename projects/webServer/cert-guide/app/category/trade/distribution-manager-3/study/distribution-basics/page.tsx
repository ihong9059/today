'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function DistributionBasicsPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-3-distribution-basics-completed');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  const toggleQuestion = (id: number) => {
    setOpenQuestions(prev =>
      prev.includes(id) ? prev.filter(q => q !== id) : [...prev, id]
    );
  };

  const toggleComplete = (id: number) => {
    const newCompleted = completedQuestions.includes(id)
      ? completedQuestions.filter(q => q !== id)
      : [...completedQuestions, id];
    setCompletedQuestions(newCompleted);
    localStorage.setItem('distribution-manager-3-distribution-basics-completed', JSON.stringify(newCompleted));
  };

  const handleAIHelp = (question: string) => {
    setCurrentPrompt(`유통관리사 3급 유통상식 과목에서 다음 문제에 대해 쉽게 설명해주세요:\n\n${question}\n\n초보자도 이해할 수 있게 핵심 개념을 알려주세요.`);
    setShowAIModal(true);
  };

  const questions = [
    // 유통의 정의와 기능 (1-10)
    { id: 1, topic: '유통의 정의와 기능', q: '유통이란 무엇인지 쉽게 설명하시오.', a: '유통이란 생산자가 만든 상품이 소비자에게 전달되는 과정입니다. 예를 들어, 농부가 재배한 사과가 마트를 거쳐 우리 집 식탁에 오르는 모든 과정이 유통입니다.' },
    { id: 2, topic: '유통의 정의와 기능', q: '유통의 3가지 기본 기능을 설명하시오.', a: '①소유권 이전: 상품의 주인이 바뀌는 것(사고파는 것) ②장소 이동: 상품을 다른 곳으로 옮기는 것(운송) ③시간 조절: 필요한 때까지 보관하는 것(창고 보관). 이 세 가지가 유통의 핵심 기능입니다.' },
    { id: 3, topic: '유통의 정의와 기능', q: '왜 중간상(도매상, 소매상)이 필요한가요?', a: '중간상이 없다면 생산자는 모든 소비자를 직접 만나야 합니다. 중간상이 있으면 거래 횟수가 줄어들고, 소비자는 여러 상품을 한 곳에서 살 수 있어 편리합니다. 효율성이 높아지는 것이죠.' },
    { id: 4, topic: '유통의 정의와 기능', q: '유통업의 종류를 크게 2가지로 나누어 설명하시오.', a: '①도매업: 대량으로 사서 소매점에 파는 업종 ②소매업: 일반 소비자에게 직접 파는 업종. 마트, 편의점 등이 소매업에 해당합니다.' },
    { id: 5, topic: '유통의 정의와 기능', q: '유통이 만들어내는 효용 4가지를 설명하시오.', a: '①시간 효용: 필요한 때에 상품 제공 ②장소 효용: 필요한 곳에 상품 제공 ③소유 효용: 구매를 통해 소유 가능 ④정보 효용: 상품에 대한 정보 제공. 이런 효용 덕분에 우리는 편리하게 쇼핑할 수 있습니다.' },
    { id: 6, topic: '유통의 정의와 기능', q: '생산자가 소비자에게 직접 파는 방식의 장점과 단점은?', a: '장점: 중간 마진이 없어 가격이 저렴하고, 신선도 유지 가능. 단점: 생산자가 판매까지 해야 해서 부담이 크고, 멀리 있는 소비자에게 팔기 어려움.' },
    { id: 7, topic: '유통의 정의와 기능', q: '유통산업이 왜 중요한가요?', a: '①많은 일자리 창출 ②생산자와 소비자 연결 ③경제 활성화 ④편리한 소비생활 제공. 우리나라 GDP의 약 10%를 차지할 정도로 중요한 산업입니다.' },
    { id: 8, topic: '유통의 정의와 기능', q: '유통경로란 무엇인가요?', a: '상품이 생산자에서 소비자에게 이동하는 길(루트)입니다. 예: 농부 → 농협 → 도매시장 → 마트 → 소비자. 이 경로가 짧을수록 보통 가격이 저렴해집니다.' },
    { id: 9, topic: '유통의 정의와 기능', q: '온라인 유통과 오프라인 유통의 차이점은?', a: '온라인: 인터넷으로 주문, 집에서 편하게 구매, 배송 필요. 오프라인: 직접 매장 방문, 상품을 눈으로 보고 구매, 바로 가져갈 수 있음. 요즘은 두 가지를 함께 이용하는 경우가 많습니다.' },
    { id: 10, topic: '유통의 정의와 기능', q: '유통 혁명이란 무엇인가요?', a: '유통 방식이 크게 바뀌는 것을 말합니다. 예를 들어, 인터넷 쇼핑몰의 등장, 새벽배송, 무인매장 등이 유통 혁명의 예입니다. 기술 발전으로 계속 변화하고 있습니다.' },

    // 유통경로의 이해 (11-20)
    { id: 11, topic: '유통경로의 이해', q: '직접유통과 간접유통의 차이를 설명하시오.', a: '직접유통: 생산자 → 소비자 (중간상 없음). 간접유통: 생산자 → 도매상 → 소매상 → 소비자 (중간상 있음). 직접유통은 신선식품, 간접유통은 공산품에 많이 사용됩니다.' },
    { id: 12, topic: '유통경로의 이해', q: '유통경로가 짧으면 좋은 점은 무엇인가요?', a: '①가격이 저렴해질 수 있음 ②신선도 유지 ③빠른 배송 가능 ④생산자 이익 증가. 하지만 경로가 짧다고 무조건 좋은 것은 아니고, 상품 특성에 맞는 경로가 중요합니다.' },
    { id: 13, topic: '유통경로의 이해', q: '프랜차이즈란 무엇인가요?', a: '본사(가맹본부)가 개발한 상품과 운영방식을 가맹점이 사용하는 시스템입니다. 편의점(CU, GS25), 패스트푸드(맥도날드), 커피전문점(스타벅스) 등이 예입니다. 브랜드 신뢰도가 높고 창업이 쉽습니다.' },
    { id: 14, topic: '유통경로의 이해', q: '편의점과 대형마트의 유통경로 차이를 설명하시오.', a: '편의점: 본사물류센터에서 각 매장으로 배송 (매일 여러 번). 대형마트: 대량구매로 직접 입고하거나 자체 물류센터 운영. 상품 특성과 규모에 따라 다른 방식을 사용합니다.' },
    { id: 15, topic: '유통경로의 이해', q: '온라인 쇼핑몰의 유통경로를 설명하시오.', a: '①생산자 → 온라인몰 물류센터 → 택배 → 소비자. 또는 ②생산자 → 직접배송 → 소비자. 물류센터와 택배가 핵심 역할을 합니다. 빠른 배송이 경쟁력입니다.' },
    { id: 16, topic: '유통경로의 이해', q: '위탁판매란 무엇인가요?', a: '생산자가 상품을 소매점에 맡기고, 팔린 만큼만 대금을 받는 방식입니다. 소매점은 재고 부담이 없고, 생산자는 진열 기회를 얻습니다. 의류, 도서 등에 많이 사용됩니다.' },
    { id: 17, topic: '유통경로의 이해', q: '도매상의 역할은 무엇인가요?', a: '①대량으로 사서 소량으로 나눠 팔기 ②창고에 보관 ③소매점에 배달 ④외상 거래 지원 ⑤상품 정보 전달. 생산자와 소매상 사이에서 중요한 역할을 합니다.' },
    { id: 18, topic: '유통경로의 이해', q: '소비자가 직접 생산자에게 살 수 있는 방법은?', a: '①직거래 장터 ②농산물 직판장 ③크라우드펀딩 ④생산자 온라인몰 ⑤라이브커머스. 최근 인터넷 발달로 직접 구매가 쉬워졌습니다.' },
    { id: 19, topic: '유통경로의 이해', q: 'B2B와 B2C의 차이를 설명하시오.', a: 'B2B: 기업 간 거래 (도매상→소매상). B2C: 기업과 소비자 간 거래 (마트→일반 고객). B는 Business(기업), C는 Consumer(소비자)의 약자입니다.' },
    { id: 20, topic: '유통경로의 이해', q: '물류센터의 역할은 무엇인가요?', a: '①상품 입고 및 검수 ②분류 및 보관 ③주문에 따라 포장 ④배송 준비 ⑤재고 관리. 물류센터가 효율적으로 운영되어야 빠른 배송이 가능합니다.' },

    // 도매업과 소매업 (21-30)
    { id: 21, topic: '도매업과 소매업', q: '소매업의 종류 5가지를 나열하시오.', a: '①백화점: 고급 상품, 다양한 브랜드 ②대형마트: 저렴한 가격, 대량 판매 ③편의점: 24시간, 소량 판매 ④슈퍼마켓: 식료품 중심 ⑤전문점: 특정 상품 전문(서점, 약국 등).' },
    { id: 22, topic: '도매업과 소매업', q: '편의점의 특징 5가지를 설명하시오.', a: '①24시간 영업 ②주거지역 근처 입지 ③소량 포장 상품 ④빠른 결제 ⑤다양한 서비스(택배, 공과금, ATM). 바쁜 현대인에게 편리한 쇼핑 공간입니다.' },
    { id: 23, topic: '도매업과 소매업', q: '대형마트의 특징을 설명하시오.', a: '①넓은 매장 면적 ②다양한 상품(식품~생활용품) ③저렴한 가격(대량 구매) ④셀프서비스 ⑤주차장 완비 ⑥원스톱 쇼핑 가능.' },
    { id: 24, topic: '도매업과 소매업', q: '백화점과 대형마트의 차이점은?', a: '백화점: 고급스러운 분위기, 브랜드 매장, 직원 서비스, 높은 가격. 대형마트: 창고형 매장, 셀프서비스, 저렴한 가격, 대량 구매. 타겟 고객과 콘셉트가 다릅니다.' },
    { id: 25, topic: '도매업과 소매업', q: '전통시장의 장점은 무엇인가요?', a: '①저렴한 가격 ②흥정 가능 ③신선한 식재료 ④정(情) 있는 분위기 ⑤지역경제 활성화. 대형마트와 다른 매력이 있습니다.' },
    { id: 26, topic: '도매업과 소매업', q: '무점포 소매업이란 무엇인가요?', a: '매장 없이 판매하는 방식입니다. ①온라인 쇼핑몰 ②TV홈쇼핑 ③전화 주문 ④배달앱 ⑤자동판매기. 최근 온라인 쇼핑의 비중이 크게 늘었습니다.' },
    { id: 27, topic: '도매업과 소매업', q: '아울렛이란 무엇인가요?', a: '이월상품이나 재고품을 할인하여 판매하는 매장입니다. 브랜드 상품을 저렴하게 살 수 있어 인기가 높습니다. 보통 도심 외곽에 위치합니다.' },
    { id: 28, topic: '도매업과 소매업', q: '창고형 매장(코스트코 등)의 특징은?', a: '①회원제 운영 ②대용량 상품 ③저렴한 가격 ④최소 포장 ⑤넓은 매장. 많이 살수록 저렴해서 대가족이나 자영업자에게 인기입니다.' },
    { id: 29, topic: '도매업과 소매업', q: '소매업의 역할은 무엇인가요?', a: '①소비자가 원하는 상품 제공 ②소량 판매 ③상품 정보 제공 ④결제 처리 ⑤교환·환불 서비스 ⑥쇼핑 편의 제공. 소비자와 가장 가까운 유통단계입니다.' },
    { id: 30, topic: '도매업과 소매업', q: '드럭스토어(올리브영 등)란 무엇인가요?', a: '화장품, 건강식품, 생활용품 등을 한 곳에서 파는 매장입니다. 미용과 건강 트렌드에 맞춰 성장하고 있으며, 젊은 층에게 인기가 높습니다.' },

    // 물류의 기초 (31-40)
    { id: 31, topic: '물류의 기초', q: '물류란 무엇인가요?', a: '물류는 상품을 운반하고 보관하는 활동입니다. 운송, 보관, 하역, 포장, 정보 처리가 포함됩니다. "물류"는 "물품의 흐름"을 줄인 말입니다.' },
    { id: 32, topic: '물류의 기초', q: '물류의 5가지 기능을 설명하시오.', a: '①운송: 상품 이동 ②보관: 창고에 저장 ③하역: 상하차 작업 ④포장: 상품 보호 ⑤정보: 추적, 관리. 이 다섯 가지가 원활해야 빠른 배송이 가능합니다.' },
    { id: 33, topic: '물류의 기초', q: '택배 시스템은 어떻게 작동하나요?', a: '①주문접수 ②집화(수거) ③물류센터 분류 ④간선운송(허브 간 이동) ⑤지선운송(배송지역) ⑥최종배송. 바코드와 시스템으로 추적 가능합니다.' },
    { id: 34, topic: '물류의 기초', q: '콜드체인이란 무엇인가요?', a: '냉장·냉동 상품을 신선하게 유지하며 운송하는 시스템입니다. 냉장차, 냉동창고, 온도관리가 핵심입니다. 식품, 의약품 배송에 중요합니다.' },
    { id: 35, topic: '물류의 기초', q: '새벽배송이 가능한 이유는 무엇인가요?', a: '①밤에 주문접수 ②자동화 물류센터에서 빠른 분류 ③새벽 시간대 배송(교통혼잡 없음) ④도심 근처 물류거점 확보. 물류 시스템 혁신의 결과입니다.' },
    { id: 36, topic: '물류의 기초', q: '라스트마일 배송이란 무엇인가요?', a: '물류센터에서 고객 집까지의 마지막 배송 구간입니다. 가장 비용이 많이 드는 구간으로, 로봇배송, 드론배송 등 다양한 혁신이 시도되고 있습니다.' },
    { id: 37, topic: '물류의 기초', q: '파렛트란 무엇인가요?', a: '상품을 실어 나르는 깔판입니다. 지게차로 들어 올려 운반하기 쉽게 만들어졌습니다. 표준 크기(1100×1100mm)가 있어 물류 효율을 높입니다.' },
    { id: 38, topic: '물류의 기초', q: '물류센터에서 하는 일은 무엇인가요?', a: '①상품 입고 검수 ②창고에 보관 ③주문에 따라 피킹(집어내기) ④포장 ⑤배송트럭에 싣기 ⑥재고 확인. 자동화 설비가 많이 도입되고 있습니다.' },
    { id: 39, topic: '물류의 기초', q: '친환경 물류란 무엇인가요?', a: '환경을 생각하는 물류 활동입니다. ①전기차 배송 ②종이 포장 ③포장재 줄이기 ④공차 줄이기 ⑤재활용. 환경 문제가 중요해지면서 주목받고 있습니다.' },
    { id: 40, topic: '물류의 기초', q: '반품물류란 무엇인가요?', a: '고객이 반품한 상품을 다시 처리하는 물류입니다. 상품 검수 → 재판매 또는 폐기 결정 → 재입고 또는 처분. 온라인 쇼핑 증가로 반품물류의 중요성이 커졌습니다.' },

    // 유통환경 변화와 법규 (41-50)
    { id: 41, topic: '유통환경 변화와 법규', q: '유통산업의 최근 변화 트렌드 5가지는?', a: '①온라인 쇼핑 증가 ②새벽·당일배송 ③무인매장 등장 ④라이브커머스 ⑤구독서비스. 기술 발전과 소비자 요구 변화가 유통을 바꾸고 있습니다.' },
    { id: 42, topic: '유통환경 변화와 법규', q: 'MZ세대의 쇼핑 특성은 무엇인가요?', a: '①온라인·모바일 선호 ②가성비와 가심비 중시 ③경험과 재미 추구 ④SNS 영향 큼 ⑤친환경·윤리적 소비 관심. 유통업계가 이들을 주목하고 있습니다.' },
    { id: 43, topic: '유통환경 변화와 법규', q: '소비자기본법에서 보장하는 소비자 권리는?', a: '①안전할 권리 ②알 권리(정보 제공) ③선택할 권리 ④의견 반영될 권리 ⑤피해 보상받을 권리 ⑥교육받을 권리 ⑦단체 활동 권리.' },
    { id: 44, topic: '유통환경 변화와 법규', q: '교환·환불 규정의 기본 원칙은?', a: '①정당한 사유 있으면 교환·환불 가능 ②온라인은 7일 이내 청약철회 가능 ③식품, 속옷 등 일부 상품 제외 ④영수증 보관 중요. 매장마다 세부 규정은 다를 수 있습니다.' },
    { id: 45, topic: '유통환경 변화와 법규', q: '가격표시제란 무엇인가요?', a: '상품에 가격을 명확히 표시해야 하는 제도입니다. 소비자가 가격을 쉽게 알 수 있도록 합니다. 가격표, 선반태그, POP 등으로 표시합니다.' },
    { id: 46, topic: '유통환경 변화와 법규', q: '원산지표시제란 무엇인가요?', a: '상품이 어디서 만들어졌는지(농산물은 어디서 재배되었는지) 표시하는 제도입니다. 소비자가 알고 선택할 수 있도록 합니다. 거짓 표시는 처벌받습니다.' },
    { id: 47, topic: '유통환경 변화와 법규', q: '유통기한과 소비기한의 차이는?', a: '유통기한: 판매 가능한 기한. 소비기한: 먹어도 괜찮은 기한(유통기한보다 길다). 2023년부터 소비기한 표시로 전환 중입니다. 식품 안전과 낭비 감소를 위함입니다.' },
    { id: 48, topic: '유통환경 변화와 법규', q: '개인정보보호의 기본 원칙은?', a: '①동의 없이 수집 금지 ②목적 외 사용 금지 ③안전하게 보관 ④본인 요청시 삭제 ⑤제3자 제공시 동의 필요. 고객 정보는 소중하게 다뤄야 합니다.' },
    { id: 49, topic: '유통환경 변화와 법규', q: '공정거래란 무엇인가요?', a: '정당하고 공정하게 거래하는 것입니다. ①허위광고 금지 ②담합 금지 ③불공정거래 금지 ④소비자 기만 금지. 공정거래위원회가 감시합니다.' },
    { id: 50, topic: '유통환경 변화와 법규', q: '친환경 소비란 무엇인가요?', a: '환경을 생각하며 소비하는 것입니다. ①에코백 사용 ②재활용 제품 선택 ③로컬푸드 구매 ④과대포장 거부 ⑤제로웨이스트 실천. 유통업계도 친환경으로 변화 중입니다.' },
  ];

  const topics = [...new Set(questions.map(q => q.topic))];
  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Link
            href="/category/trade/distribution-manager-3"
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 transition-colors"
          >
            ← 유통관리사 3급 메인으로
          </Link>
          <h1 className="text-3xl font-black mb-4">📦 유통상식</h1>
          <p className="text-green-100">유통의 기본 개념과 원리를 학습합니다.</p>
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">학습 진행률</span>
              <span className="font-bold">{completedQuestions.length} / {questions.length} 완료</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {topics.map((topic, topicIdx) => (
          <div key={topicIdx} className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">
                {topicIdx + 1}
              </span>
              {topic}
            </h2>
            <div className="space-y-3">
              {questions
                .filter(q => q.topic === topic)
                .map(question => (
                  <div
                    key={question.id}
                    className={`bg-white rounded-xl shadow-sm border transition-all ${
                      completedQuestions.includes(question.id)
                        ? 'border-green-300 bg-green-50/50'
                        : 'border-gray-100 hover:border-green-200'
                    }`}
                  >
                    <div
                      className="p-4 cursor-pointer flex items-start gap-3"
                      onClick={() => toggleQuestion(question.id)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComplete(question.id);
                        }}
                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          completedQuestions.includes(question.id)
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {completedQuestions.includes(question.id) && '✓'}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${completedQuestions.includes(question.id) ? 'text-green-700' : 'text-gray-800'}`}>
                          {question.id}. {question.q}
                        </p>
                      </div>
                      <span className={`text-xl transition-transform ${openQuestions.includes(question.id) ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                    {openQuestions.includes(question.id) && (
                      <div className="px-4 pb-4">
                        <div className="ml-9 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{question.a}</p>
                        </div>
                        <div className="ml-9 mt-3">
                          <button
                            onClick={() => handleAIHelp(question.q)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                          >
                            🤖 AI에게 더 자세히 질문하기
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-500 text-sm mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all border border-orange-200"
                >
                  <span className="text-3xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200"
                >
                  <span className="text-3xl">💚</span>
                  <div>
                    <p className="font-bold text-emerald-700">ChatGPT</p>
                    <p className="text-xs text-emerald-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200"
                >
                  <span className="text-3xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
