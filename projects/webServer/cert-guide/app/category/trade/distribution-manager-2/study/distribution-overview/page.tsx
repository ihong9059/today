'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function DistributionOverviewPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-2-distribution-overview-completed');
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
    localStorage.setItem('distribution-manager-2-distribution-overview-completed', JSON.stringify(newCompleted));
  };

  const handleAIHelp = (question: string) => {
    setCurrentPrompt(`유통관리사 2급 유통물류일반 과목에서 다음 문제에 대해 자세히 설명해주세요:\n\n${question}\n\n핵심 개념과 암기 포인트를 알려주세요.`);
    setShowAIModal(true);
  };

  const questions = [
    // 유통의 개념과 기능 (1-10)
    { id: 1, topic: '유통의 개념과 기능', q: '유통의 정의와 기본 기능 3가지를 설명하시오.', a: '유통은 생산자로부터 소비자에게 상품이 이동하는 과정입니다. 기본 기능: ①소유권 이전(상거래) ②장소 이동(운송) ③시간 조절(보관). 이를 통해 생산과 소비의 시간적, 공간적 갭을 해소합니다.' },
    { id: 2, topic: '유통의 개념과 기능', q: '유통경로에서 중간상의 역할과 필요성을 설명하시오.', a: '중간상(도매상, 소매상)은 ①거래수 최소화 원리로 유통비용 절감 ②정보 수집 및 전달 ③위험 분산 ④품질 보증 ⑤소비자 접근성 향상의 역할을 수행합니다.' },
    { id: 3, topic: '유통의 개념과 기능', q: '생산자 → 소비자 직거래의 장단점을 비교하시오.', a: '장점: ①유통비용 절감 ②신선도 유지 ③생산자 수익 증가. 단점: ①판매 기회 제한 ②마케팅 부담 ③배송 및 물류 처리 어려움 ④고객 서비스 한계.' },
    { id: 4, topic: '유통의 개념과 기능', q: '유통의 효용(시간, 장소, 소유, 정보) 개념을 설명하시오.', a: '①시간효용: 보관을 통해 필요한 시점에 제공 ②장소효용: 운송으로 필요한 장소에 제공 ③소유효용: 소유권 이전으로 구매 가능하게 함 ④정보효용: 상품 정보 제공으로 구매 결정 지원.' },
    { id: 5, topic: '유통의 개념과 기능', q: '유통산업의 환경 변화 요인 5가지를 설명하시오.', a: '①소비자 라이프스타일 변화 ②정보통신기술 발달(e-커머스) ③대형 유통업체 성장 ④글로벌화 ⑤친환경·ESG 트렌드. 이러한 변화에 적응하는 것이 유통기업의 핵심 과제입니다.' },
    { id: 6, topic: '유통의 개념과 기능', q: '유통 표준화의 개념과 필요성을 설명하시오.', a: '유통 표준화는 물류, 거래, 정보의 규격을 통일하는 것입니다. 필요성: ①물류 효율화 ②거래 비용 절감 ③정보 호환성 확보 ④국제 거래 용이 ⑤품질 관리 용이.' },
    { id: 7, topic: '유통의 개념과 기능', q: '유통기관의 분류(소매상, 도매상, 물류기관)를 설명하시오.', a: '①소매상: 최종 소비자에게 직접 판매 (백화점, 슈퍼마켓 등) ②도매상: 소매상이나 산업체에 대량 판매 ③물류기관: 보관, 운송, 하역, 포장 등 물류 서비스 전문 제공.' },
    { id: 8, topic: '유통의 개념과 기능', q: '유통정보의 종류와 활용 방안을 설명하시오.', a: '종류: ①판매정보(POS데이터) ②재고정보 ③고객정보 ④시장정보. 활용: 수요예측, 발주량 결정, 마케팅 전략 수립, 고객 맞춤 서비스 제공, 재고 최적화.' },
    { id: 9, topic: '유통의 개념과 기능', q: '유통채널 갈등의 유형과 해결방안을 설명하시오.', a: '유형: ①수직적 갈등(제조업체-유통업체) ②수평적 갈등(동일 수준 유통업체간). 해결: ①명확한 역할 분담 ②공정거래 준수 ③정보 공유 ④공동 목표 설정 ⑤협력적 파트너십.' },
    { id: 10, topic: '유통의 개념과 기능', q: '옴니채널과 멀티채널의 차이점을 설명하시오.', a: '멀티채널: 여러 판매채널을 독립적으로 운영. 옴니채널: 모든 채널을 통합하여 일관된 고객 경험 제공. 옴니채널에서는 온·오프라인 재고통합, 교차 서비스(온라인 구매-매장 픽업) 가능.' },

    // 유통경로의 유형 (11-20)
    { id: 11, topic: '유통경로의 유형', q: '직접유통경로와 간접유통경로의 특징을 비교하시오.', a: '직접경로: 생산자가 소비자에게 직접 판매(방문판매, 인터넷판매). 간접경로: 중간상을 통해 판매. 직접경로는 통제력 높고 마진 확보 유리, 간접경로는 시장 커버리지 확대에 유리.' },
    { id: 12, topic: '유통경로의 유형', q: '수직적 마케팅 시스템(VMS)의 3가지 유형을 설명하시오.', a: '①기업형 VMS: 한 기업이 생산과 유통을 모두 소유 ②관리형 VMS: 규모나 힘이 큰 구성원이 조정 ③계약형 VMS: 독립 기업들이 계약으로 협력(프랜차이즈, 볼런터리 체인 등).' },
    { id: 13, topic: '유통경로의 유형', q: '프랜차이즈 시스템의 장단점을 분석하시오.', a: '가맹본부 장점: 빠른 확장, 낮은 투자비. 단점: 통제 어려움, 갈등 가능. 가맹점 장점: 검증된 사업모델, 본부 지원. 단점: 로열티 부담, 자율성 제한, 본부 의존.' },
    { id: 14, topic: '유통경로의 유형', q: '선택적 유통, 전속적 유통, 개방적 유통을 비교하시오.', a: '①개방적: 가능한 많은 점포에 배치(일용품) ②선택적: 일정 자격 갖춘 점포만 선정(가전) ③전속적: 특정 지역 1개 점포만 허용(명품, 자동차). 브랜드 이미지와 시장 커버리지의 균형이 중요.' },
    { id: 15, topic: '유통경로의 유형', q: '역물류(Reverse Logistics)의 개념과 중요성을 설명하시오.', a: '역물류는 소비자에서 생산자 방향으로의 물류흐름입니다. 반품처리, 재활용, 폐기물 관리 포함. 중요성: ①환경규제 대응 ②자원 재활용 ③고객만족 ④비용절감 ⑤지속가능경영.' },
    { id: 16, topic: '유통경로의 유형', q: '3PL(제3자 물류)의 개념과 활용 효과를 설명하시오.', a: '3PL은 물류 활동을 전문업체에 아웃소싱하는 것입니다. 효과: ①핵심역량 집중 ②물류비용 절감 ③전문성 활용 ④유연성 확보 ⑤최신 시설·장비 활용.' },
    { id: 17, topic: '유통경로의 유형', q: '크로스도킹(Cross-Docking)의 개념과 효과를 설명하시오.', a: '크로스도킹은 물류센터에서 입고상품을 저장 없이 바로 출하하는 방식입니다. 효과: ①재고비용 절감 ②리드타임 단축 ③물류센터 공간 효율화 ④신선도 유지 ⑤빠른 시장 대응.' },
    { id: 18, topic: '유통경로의 유형', q: '풀(Pull) 전략과 푸시(Push) 전략의 차이를 설명하시오.', a: 'Push전략: 제조업체가 유통업체에 판촉하여 소비자에게 밀어내기. Pull전략: 소비자 대상 광고로 수요 창출하여 유통업체가 주문하게 만들기. 일반적으로 두 전략을 병행합니다.' },
    { id: 19, topic: '유통경로의 유형', q: 'B2B, B2C, C2C 전자상거래의 특징을 비교하시오.', a: 'B2B: 기업간 거래(대량, 계약기반). B2C: 기업-소비자 거래(온라인쇼핑몰). C2C: 소비자간 거래(중고거래플랫폼). 각 유형별로 거래규모, 빈도, 결제방식, 물류처리 방식이 다릅니다.' },
    { id: 20, topic: '유통경로의 유형', q: '유통경로 설계시 고려해야 할 요소 5가지를 설명하시오.', a: '①시장요인(시장규모, 고객분포) ②제품요인(부패성, 가격, 기술성) ③기업요인(자금력, 관리능력) ④중간상요인(가용성, 서비스수준) ⑤경쟁요인(경쟁사 채널전략).' },

    // 도매상과 소매상 (21-30)
    { id: 21, topic: '도매상과 소매상', q: '도매상의 기능과 유형을 설명하시오.', a: '기능: ①대량구매·분산판매 ②보관·배송 ③신용공여 ④시장정보 제공 ⑤위험부담. 유형: 완전서비스도매상(종합상사), 제한서비스도매상(캐시앤캐리), 제조업자대리점, 브로커.' },
    { id: 22, topic: '도매상과 소매상', q: '백화점과 할인점의 운영 특성을 비교하시오.', a: '백화점: 고급 이미지, 다양한 상품, 수수료 기반, 서비스 중시. 할인점: 저가격, 셀프서비스, 대량판매, 낮은 마진-높은 회전율, 넓은 매장면적. 타겟 고객과 포지셔닝이 상이합니다.' },
    { id: 23, topic: '도매상과 소매상', q: '편의점의 운영 특성과 성공요인을 설명하시오.', a: '특성: 24시간 영업, 소규모 매장, 주거지역 입지, 고회전 상품 중심. 성공요인: ①접근성(입지) ②편의성(영업시간) ③신선식품 관리 ④서비스 다양화(택배, 공과금) ⑤효율적 재고관리.' },
    { id: 24, topic: '도매상과 소매상', q: 'SPA(제조형 소매업)의 개념과 특징을 설명하시오.', a: 'SPA는 기획-생산-유통을 일관 수행하는 의류 소매업입니다. 특징: ①빠른 상품회전(패스트패션) ②트렌드 신속 반영 ③원가절감 ④재고 최소화 ⑤수직통합 효율성. 대표기업: 자라, 유니클로.' },
    { id: 25, topic: '도매상과 소매상', q: '카테고리 킬러(Category Killer)의 개념과 전략을 설명하시오.', a: '특정 상품군에 특화하여 압도적 품목 수와 저가격으로 경쟁하는 전문점입니다. 전략: ①전문성 강조 ②대량구매로 원가우위 ③넓은 선택폭 ④전문 상담 서비스. 예: 토이저러스, 베스트바이.' },
    { id: 26, topic: '도매상과 소매상', q: '소매수레바퀴 이론(Wheel of Retailing)을 설명하시오.', a: '신규 소매업태가 저가격·저서비스로 진입 후, 점차 서비스 향상과 가격 상승으로 고급화되어, 다시 새로운 저가 업태에게 자리를 내주는 순환 이론입니다. 할인점→마트→백화점화 과정이 예시.' },
    { id: 27, topic: '도매상과 소매상', q: '소매믹스(Retail Mix) 구성요소 6가지를 설명하시오.', a: '①상품(Product): 품목 구색 ②가격(Price): 가격 전략 ③장소(Place): 입지 선정 ④촉진(Promotion): 판촉 활동 ⑤점포환경(Presentation): 매장 분위기 ⑥인적서비스(Personnel): 직원 서비스.' },
    { id: 28, topic: '도매상과 소매상', q: '무점포 소매업의 유형과 특징을 설명하시오.', a: '유형: ①인터넷쇼핑 ②TV홈쇼핑 ③카탈로그판매 ④방문판매 ⑤자판기 ⑥모바일커머스. 특징: 시간·장소 제약 없음, 고정비 절감, 고객 데이터 활용 용이, 반품·배송 관리가 관건.' },
    { id: 29, topic: '도매상과 소매상', q: '아울렛 매장의 운영 특성과 소비자 가치를 설명하시오.', a: '운영: 이월상품·시즌오프 상품 할인 판매, 도심 외곽 입지, 대형 복합시설화. 소비자 가치: ①브랜드 상품 저렴 구매 ②쇼핑 엔터테인먼트 ③다양한 브랜드 비교 ④목적구매 만족.' },
    { id: 30, topic: '도매상과 소매상', q: '드럭스토어의 개념과 한국 시장 현황을 설명하시오.', a: '약품과 화장품, 건강식품, 생활용품을 원스톱 판매하는 매장입니다. 한국: 올리브영, 롭스 등이 대표적. 뷰티·헬스케어 트렌드와 함께 성장, 도심 입지, 젊은 여성 타겟이 특징.' },

    // 물류관리의 기초 (31-40)
    { id: 31, topic: '물류관리의 기초', q: '물류의 5대 기능(운송, 보관, 하역, 포장, 정보)을 설명하시오.', a: '①운송: 장소 이동 ②보관: 수급조절, 품질유지 ③하역: 상·하차, 분류작업 ④포장: 상품보호, 판매촉진 ⑤물류정보: 추적, 재고관리, 수요예측. 각 기능의 효율화가 물류비 절감의 핵심.' },
    { id: 32, topic: '물류관리의 기초', q: '물류비의 구성항목과 절감 방안을 설명하시오.', a: '구성: ①운송비 ②보관비 ③하역비 ④포장비 ⑤물류정보비 ⑥물류관리비. 절감방안: 공동물류, 물류거점 최적화, 정보시스템 활용, 아웃소싱, 재고 최적화, 표준화.' },
    { id: 33, topic: '물류관리의 기초', q: '적시생산방식(JIT: Just In Time)의 개념과 효과를 설명하시오.', a: 'JIT는 필요한 물품을 필요한 시점에 필요한 양만큼 공급하는 방식입니다. 효과: ①재고비용 최소화 ②생산효율 향상 ③품질개선 ④낭비 제거 ⑤리드타임 단축. 정확한 수요예측이 전제조건.' },
    { id: 34, topic: '물류관리의 기초', q: '공급사슬관리(SCM)의 개념과 구성요소를 설명하시오.', a: 'SCM은 원자재 조달부터 최종 소비자까지 전 과정을 통합 관리하는 것입니다. 구성: ①계획(수요예측) ②조달(구매) ③생산 ④물류(배송) ⑤반품처리. 정보공유와 협업이 핵심.' },
    { id: 35, topic: '물류관리의 기초', q: 'ABC 재고분류법의 개념과 활용방안을 설명하시오.', a: 'ABC분석은 재고를 가치(금액)기준으로 분류하는 것입니다. A급: 상위 20% 품목(전체 금액 80%) - 집중관리. B급: 중간 30% - 일반관리. C급: 하위 50% - 간소관리. 효율적 재고투자가 가능.' },
    { id: 36, topic: '물류관리의 기초', q: '경제적 주문량(EOQ) 모델의 개념을 설명하시오.', a: 'EOQ는 재고유지비와 주문비의 합을 최소화하는 최적 주문량입니다. 주문비(주문횟수 비례)와 재고유지비(재고량 비례)의 트레이드오프를 고려. 안정적 수요 상황에 적합한 모델입니다.' },
    { id: 37, topic: '물류관리의 기초', q: '안전재고(Safety Stock)의 개념과 결정요인을 설명하시오.', a: '안전재고는 수요변동이나 리드타임 불확실성에 대비한 여유 재고입니다. 결정요인: ①수요변동성 ②리드타임 변동성 ③서비스수준(품절 허용 확률) ④재고비용. 높은 서비스수준은 높은 안전재고 필요.' },
    { id: 38, topic: '물류관리의 기초', q: '물류표준화(파렛트, 컨테이너)의 필요성을 설명하시오.', a: '표준화 대상: 파렛트(1100×1100mm), 컨테이너, 바코드, 물류용어. 필요성: ①하역 기계화 ②보관 효율화 ③운송 효율화 ④정보 호환 ⑤국제물류 원활화 ⑥비용절감.' },
    { id: 39, topic: '물류관리의 기초', q: '그린물류(Green Logistics)의 개념과 실천방안을 설명하시오.', a: '그린물류는 환경친화적 물류활동입니다. 실천: ①공차율 감소 ②모달시프트(철도·해운 활용) ③친환경 차량 ④포장재 절감·재활용 ⑤물류거점 집약화 ⑥역물류 효율화.' },
    { id: 40, topic: '물류관리의 기초', q: '풀필먼트(Fulfillment) 서비스의 개념과 구성을 설명하시오.', a: '풀필먼트는 주문처리부터 배송까지 전 과정을 대행하는 서비스입니다. 구성: ①입고검수 ②보관 ③피킹·포장 ④배송 ⑤반품처리 ⑥재고관리. 이커머스 성장으로 수요 급증.' },

    // 물류시스템과 재고관리 (41-50)
    { id: 41, topic: '물류시스템과 재고관리', q: 'WMS(창고관리시스템)의 기능과 효과를 설명하시오.', a: '기능: ①입출고관리 ②재고위치관리(로케이션) ③피킹지시 ④재고실사 ⑤보고서생성. 효과: 재고정확도 향상, 작업효율 증가, 공간활용 최적화, 실시간 재고파악, 인건비 절감.' },
    { id: 42, topic: '물류시스템과 재고관리', q: 'TMS(운송관리시스템)의 기능과 활용을 설명하시오.', a: '기능: ①배차계획 ②경로최적화 ③화물추적 ④운임정산 ⑤차량관리. 활용: 운송비 절감, 배송시간 단축, 차량가동률 향상, 고객 서비스 개선, 운송사 성과관리.' },
    { id: 43, topic: '물류시스템과 재고관리', q: '유닛로드시스템(Unit Load System)의 개념과 효과를 설명하시오.', a: '여러 개의 화물을 하나의 단위로 묶어 취급하는 시스템입니다(파렛트, 컨테이너 활용). 효과: ①하역시간 단축 ②화물손상 감소 ③보관효율 향상 ④운송효율 향상 ⑤기계화 용이.' },
    { id: 44, topic: '물류시스템과 재고관리', q: '정량발주방식과 정기발주방식의 차이를 설명하시오.', a: '정량발주: 재고가 재주문점 도달시 일정량 발주. 재고관리 용이, A품목 적합. 정기발주: 일정 주기로 부족량 발주. 발주업무 간소화, B·C품목 적합. 수요특성에 따라 선택.' },
    { id: 45, topic: '물류시스템과 재고관리', q: '재고자산회전율의 의미와 계산방법을 설명하시오.', a: '재고회전율 = 매출원가 ÷ 평균재고자산. 1년간 재고가 몇 번 회전했는지를 나타냅니다. 회전율이 높을수록 재고관리 효율적, 자금운용 양호. 업종별 적정 수준이 다릅니다.' },
    { id: 46, topic: '물류시스템과 재고관리', q: '허브앤스포크(Hub & Spoke) 물류시스템을 설명하시오.', a: '중앙 허브에서 물량을 집하·분류하여 각 스포크(거점)로 배송하는 시스템입니다. 장점: ①노선 단순화 ②규모의 경제 ③배송효율화. 단점: 허브 의존도 높음, 거리 증가 가능.' },
    { id: 47, topic: '물류시스템과 재고관리', q: '밀크런(Milk-Run) 방식의 개념과 효과를 설명하시오.', a: '하나의 차량이 여러 거래처를 순회하며 집화·배송하는 방식입니다. 효과: ①차량 적재율 향상 ②운송비 절감 ③운송횟수 감소 ④정시 납품 ⑤환경부하 감소. JIT와 연계 활용.' },
    { id: 48, topic: '물류시스템과 재고관리', q: '라스트마일 배송의 개념과 과제를 설명하시오.', a: '물류센터에서 최종 소비자까지의 마지막 배송구간입니다. 과제: ①배송비용 높음(전체의 50%) ②도심 교통혼잡 ③부재시 재배송 ④새벽·당일배송 요구 ⑤친환경 배송. 드론, 로봇배송 등 혁신 시도중.' },
    { id: 49, topic: '물류시스템과 재고관리', q: '재고관리의 목적과 적정재고 유지의 중요성을 설명하시오.', a: '목적: ①품절 방지(고객 서비스) ②수급 조절 ③가격 안정. 중요성: 과잉재고는 비용증가·진부화 위험, 과소재고는 품절·기회손실. 수요예측과 리드타임 관리가 핵심.' },
    { id: 50, topic: '물류시스템과 재고관리', q: 'VMI(공급자 재고관리)의 개념과 효과를 설명하시오.', a: 'VMI는 공급자가 고객의 재고를 직접 관리하는 방식입니다. 효과: ①고객 재고관리 부담 감소 ②품절 방지 ③채찍효과 완화 ④공급자 생산계획 안정화. 정보공유와 신뢰가 전제조건.' },
  ];

  const topics = [...new Set(questions.map(q => q.topic))];
  const progress = Math.round((completedQuestions.length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Link
            href="/category/trade/distribution-manager-2"
            className="inline-flex items-center gap-2 text-teal-200 hover:text-white mb-6 transition-colors"
          >
            ← 유통관리사 2급 메인으로
          </Link>
          <h1 className="text-3xl font-black mb-4">📦 유통물류일반</h1>
          <p className="text-teal-100">유통의 기초개념과 물류관리의 원리를 학습합니다.</p>
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
              <span className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-sm">
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
                        ? 'border-teal-300 bg-teal-50/50'
                        : 'border-gray-100 hover:border-teal-200'
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
                            ? 'bg-teal-500 border-teal-500 text-white'
                            : 'border-gray-300 hover:border-teal-400'
                        }`}
                      >
                        {completedQuestions.includes(question.id) && '✓'}
                      </button>
                      <div className="flex-1">
                        <p className={`font-medium ${completedQuestions.includes(question.id) ? 'text-teal-700' : 'text-gray-800'}`}>
                          {question.id}. {question.q}
                        </p>
                      </div>
                      <span className={`text-xl transition-transform ${openQuestions.includes(question.id) ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                    {openQuestions.includes(question.id) && (
                      <div className="px-4 pb-4">
                        <div className="ml-9 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
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
