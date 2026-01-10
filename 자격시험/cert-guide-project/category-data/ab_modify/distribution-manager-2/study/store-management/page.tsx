'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StoreManagementPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-2-store-management-completed');
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
    localStorage.setItem('distribution-manager-2-store-management-completed', JSON.stringify(newCompleted));
  };

  const handleAIHelp = (question: string) => {
    setCurrentPrompt(`유통관리사 2급 상권분석 과목에서 다음 문제에 대해 자세히 설명해주세요:\n\n${question}\n\n핵심 개념과 암기 포인트를 알려주세요.`);
    setShowAIModal(true);
  };

  const questions = [
    // 상권의 개념과 유형 (1-10)
    { id: 1, topic: '상권의 개념과 유형', q: '상권의 정의와 구성요소 3가지를 설명하시오.', a: '상권은 점포가 고객을 흡인할 수 있는 지리적 범위입니다. 구성요소: ①1차상권(핵심상권): 고객의 60-70% 거주 ②2차상권(부차상권): 20-25% ③3차상권(한계상권): 나머지. 상권분석은 출점 의사결정의 핵심.' },
    { id: 2, topic: '상권의 개념과 유형', q: '상권의 유형(근린상권, 지역상권, 광역상권)을 설명하시오.', a: '①근린상권: 반경 500m, 일용품 중심, 편의점·슈퍼 ②지역상권: 반경 2-3km, 선매품 포함, 중형마트 ③광역상권: 10km 이상, 전문품·고급품, 백화점·아울렛. 취급상품과 점포규모에 따라 상권범위 결정.' },
    { id: 3, topic: '상권의 개념과 유형', q: '도심상권과 부도심상권의 특징을 비교하시오.', a: '도심상권: 대중교통 접근성, 유동인구 많음, 임대료 높음, 백화점·전문점 집중. 부도심상권: 주거지역 인접, 정주인구 기반, 상대적 저렴한 임대료, 대형마트·생활밀착형 점포 입지.' },
    { id: 4, topic: '상권의 개념과 유형', q: '역세권 상권의 특성과 업종 적합성을 설명하시오.', a: '특성: 유동인구 많음, 출퇴근 시간대 집중, 접근성 우수, 높은 임대료. 적합업종: 패스트푸드, 커피전문점, 편의점, 의류, 화장품 등 충동구매·편의구매 업종. 체류시간 짧은 특성 고려 필요.' },
    { id: 5, topic: '상권의 개념과 유형', q: '대학가 상권의 특성과 마케팅 전략을 설명하시오.', a: '특성: 젊은 고객층, 트렌드 민감, 가격 민감도 높음, 학기 중 집중. 전략: ①학생 할인 ②SNS 마케팅 ③트렌디한 인테리어 ④저렴한 메뉴 ⑤방학기 대응 전략 필요.' },
    { id: 6, topic: '상권의 개념과 유형', q: '주거밀집지역 상권의 특성을 설명하시오.', a: '특성: 정주인구 기반, 생활밀착형 업종, 단골 형성 용이, 주부·노인 고객 많음, 주말·저녁 집중. 적합업종: 슈퍼마켓, 세탁소, 약국, 학원, 음식점 등. 안정적 매출 가능.' },
    { id: 7, topic: '상권의 개념과 유형', q: '오피스 상권의 특성과 주요 업종을 설명하시오.', a: '특성: 직장인 중심, 평일 점심·저녁 집중, 주말 매출 감소, 구매력 양호. 주요업종: 식당, 커피숍, 편의점, 은행, 인쇄소, 꽃집 등. 점심특선, 회식장소 등 기업수요 공략 필요.' },
    { id: 8, topic: '상권의 개념과 유형', q: '복합상권의 개념과 장단점을 설명하시오.', a: '복합상권은 주거+오피스+상업 등이 혼재된 상권입니다. 장점: 다양한 고객층, 시간대별 분산, 안정적 매출. 단점: 타겟 명확화 어려움, 복잡한 마케팅 필요. 시간대별 고객분석이 중요.' },
    { id: 9, topic: '상권의 개념과 유형', q: '신흥상권과 기존상권의 특성을 비교하시오.', a: '신흥상권: 임대료 저렴, 성장 가능성, 고정고객 부족, 리스크 존재. 기존상권: 검증된 수요, 높은 임대료, 경쟁 치열, 안정적 매출. 자본력과 리스크 감수 성향에 따라 선택.' },
    { id: 10, topic: '상권의 개념과 유형', q: '상권의 라이프사이클 단계를 설명하시오.', a: '①도입기: 신규 개발, 저임대료, 불확실성 ②성장기: 인구유입, 수요증가, 임대료 상승 ③성숙기: 안정적 수요, 경쟁심화, 고임대료 ④쇠퇴기: 인구유출, 공실증가, 재개발 필요. 단계별 진입전략 상이.' },

    // 상권조사 방법 (11-20)
    { id: 11, topic: '상권조사 방법', q: '상권조사의 목적과 필요성을 설명하시오.', a: '목적: ①출점 가능성 판단 ②매출 예측 ③경쟁현황 파악 ④마케팅 전략 수립. 필요성: 사전 조사로 실패 위험 감소, 투자 타당성 검증, 적정 임대료 산정, 업종 적합성 판단.' },
    { id: 12, topic: '상권조사 방법', q: '상권조사의 항목(인구, 경쟁, 교통, 집객시설)을 설명하시오.', a: '①인구특성: 인구수, 연령, 소득, 가구구성 ②경쟁현황: 동종업종 수, 경쟁강도 ③교통: 대중교통, 주차, 유동인구 ④집객시설: 학교, 병원, 관공서, 대형점포 등 트래픽 발생원.' },
    { id: 13, topic: '상권조사 방법', q: '유동인구 조사 방법과 분석 포인트를 설명하시오.', a: '방법: 특정 지점에서 시간대별 통행량 측정(평일/주말 구분). 분석포인트: ①통행량(총량) ②통행객 특성(성별, 연령) ③통행 목적 ④보행속도 ⑤시간대별 변화. 단순 통행량이 아닌 잠재고객 파악 중요.' },
    { id: 14, topic: '상권조사 방법', q: '점포 앞 유동인구와 실제 입점률의 관계를 설명하시오.', a: '입점률(Conversion Rate) = 입점고객 ÷ 유동인구 × 100. 업종별 평균: 편의점 3-5%, 음식점 1-3%, 의류 0.5-1%. 입점률 제고 전략: 매장 가시성, 외관 개선, 샘플링, 간판 효과 등.' },
    { id: 15, topic: '상권조사 방법', q: '배후인구 분석의 방법과 활용을 설명하시오.', a: '배후인구는 상권 내 거주·근무 인구입니다. 분석: ①통계청 인구자료 ②주민등록인구 ③아파트 세대수 ④오피스 근무자수. 활용: 잠재수요 추정, 상권규모 파악, 업종선택 판단.' },
    { id: 16, topic: '상권조사 방법', q: '경쟁점 조사 항목과 분석 방법을 설명하시오.', a: '조사항목: ①점포수 ②규모 ③가격대 ④상품구색 ⑤서비스수준 ⑥영업시간 ⑦고객층 ⑧매출추정. 분석: 경쟁강도 평가, 차별화 포인트 도출, 포지셔닝 전략 수립.' },
    { id: 17, topic: '상권조사 방법', q: '상권 내 주요 집객시설의 유형과 영향을 설명하시오.', a: '유형: ①교통시설(역, 버스터미널) ②교육시설(학교) ③의료시설(병원) ④관공서 ⑤대형점포 ⑥문화시설. 영향: 안정적 트래픽 발생, 특정 고객층 집중, 시너지 효과, 부정적 영향(병원-음식점 등) 검토.' },
    { id: 18, topic: '상권조사 방법', q: '상권 접근성 분석 요소를 설명하시오.', a: '①도보 접근성: 보행거리, 보행환경, 장애물 ②대중교통: 역·정류장 거리, 노선 수 ③차량 접근성: 도로폭, 주차장 ④가시성: 점포 노출도, 간판 가시성. 접근성은 상권범위와 매출에 직접 영향.' },
    { id: 19, topic: '상권조사 방법', q: '상권조사 시 활용하는 2차 자료의 종류를 설명하시오.', a: '①통계청 자료(인구, 사업체) ②지자체 통계연보 ③부동산 시세정보 ④상가정보시스템 ⑤업종별 협회 자료 ⑥신용카드 결제 데이터 ⑦모바일 빅데이터. 1차 조사와 병행하여 정확도 제고.' },
    { id: 20, topic: '상권조사 방법', q: '상권조사 보고서 작성 시 포함할 내용을 설명하시오.', a: '①상권개요(위치, 특성) ②인구분석 ③경쟁현황 ④유동인구 분석 ⑤교통·접근성 ⑥임대조건 ⑦SWOT분석 ⑧매출추정 ⑨종합의견. 객관적 데이터와 주관적 판단을 균형있게 제시.' },

    // 입지선정 기준 (21-30)
    { id: 21, topic: '입지선정 기준', q: '입지(Location)의 중요성과 결정요인을 설명하시오.', a: '중요성: 입지는 변경 불가능한 고정요소로, 매출의 70%가 입지에 의해 결정된다는 말도 있음. 결정요인: ①고객 접근성 ②가시성 ③경쟁상황 ④임대조건 ⑤주변환경 ⑥성장가능성.' },
    { id: 22, topic: '입지선정 기준', q: '코너점포(Corner Location)의 장단점을 설명하시오.', a: '장점: ①가시성 우수(두 방향 노출) ②접근성 좋음 ③간판 효과 극대화 ④유동인구 많음. 단점: ①임대료 높음 ②매장형태 불규칙 가능 ③양면관리 필요. 음식점, 편의점 등에 유리.' },
    { id: 23, topic: '입지선정 기준', q: '중간입지(In-between Location)의 특성을 설명하시오.', a: '블록 중간에 위치한 점포입니다. 특성: 코너보다 임대료 저렴, 가시성 낮음, 전문점에 적합. 성공조건: 차별화된 상품력, 단골 고객 확보, 간판·파사드 강화, SNS 마케팅 활용.' },
    { id: 24, topic: '입지선정 기준', q: '지하상가 입지의 장단점을 분석하시오.', a: '장점: ①역세권 접근성 ②날씨 영향 없음 ③임대료 상대적 저렴. 단점: ①가시성 부족 ②우회 필요 ③환기·조명 문제 ④홍수 위험. 지하철 이용객 타겟 업종(식품, 잡화)에 적합.' },
    { id: 25, topic: '입지선정 기준', q: '쇼핑몰 내 입지선정 시 고려사항을 설명하시오.', a: '①동선: 메인동선 vs 사각지대 ②층수: 1층 유리(화장품, 잡화), 푸드코트는 상층 ③앵커테넌트 근접성 ④에스컬레이터·엘리베이터 위치 ⑤임대조건(고정+매출비례) ⑥MD구성 일관성.' },
    { id: 26, topic: '입지선정 기준', q: '점포 가시성(Visibility) 향상 방안을 설명하시오.', a: '①간판 크기·위치 최적화 ②조명 강화 ③쇼윈도 디스플레이 ④외부 배너·현수막 ⑤색상 대비 활용 ⑥돌출간판 설치 ⑦테이블·상품 외부 배치. 3초 안에 업종 인식 가능해야 함.' },
    { id: 27, topic: '입지선정 기준', q: '양면도로 점포와 이면도로 점포의 특성을 비교하시오.', a: '양면도로: 유동인구 많음, 가시성 높음, 임대료 높음, 일반 소매업 적합. 이면도로: 임대료 저렴, 주차 용이, 단골 중심, 전문점·음식점 적합. 업종과 타겟에 따라 선택.' },
    { id: 28, topic: '입지선정 기준', q: '1층과 2층 이상 점포의 장단점을 비교하시오.', a: '1층: 접근성·가시성 최고, 임대료 최고, 충동구매 업종. 2층+: 임대료 저렴, 넓은 면적 확보, 목적구매 업종(음식점, 학원, 병원). 에스컬레이터·엘리베이터 유무가 2층 이상 성공 관건.' },
    { id: 29, topic: '입지선정 기준', q: '신규 개발지역 입지선정 시 주의점을 설명하시오.', a: '주의점: ①입주 시기 불확실 ②초기 집객 어려움 ③인프라 미비 ④경쟁현황 예측 어려움 ⑤과잉 공급 위험. 검토사항: 개발계획, 분양률, 입주예정 시기, 주요 앵커시설 등.' },
    { id: 30, topic: '입지선정 기준', q: '입지평가 체크리스트 주요 항목을 설명하시오.', a: '①상권특성(상권유형, 성장성) ②입지특성(가시성, 접근성) ③점포특성(면적, 형태, 층수) ④경쟁상황 ⑤임대조건(보증금, 월세, 관리비) ⑥법적사항(용도지역, 건축제한). 점수화하여 객관적 비교.' },

    // 상권분석 기법 (31-40)
    { id: 31, topic: '상권분석 기법', q: '라일리(Reilly)의 소매중력모델을 설명하시오.', a: '두 도시가 중간 지역 고객을 흡인하는 비율은 도시 인구에 비례하고 거리의 제곱에 반비례한다는 법칙입니다. 공식: (Ta/Tb) = (Pa/Pb) × (Db/Da)². 대형 상권의 영향력 분석에 활용.' },
    { id: 32, topic: '상권분석 기법', q: '허프(Huff)의 확률적 상권모델을 설명하시오.', a: '소비자가 특정 점포를 선택할 확률은 점포 매력도(면적)에 비례하고 거리에 반비례합니다. 라일리 모델을 확률로 발전시킨 것으로, 복수의 경쟁점포 상황을 분석할 수 있습니다.' },
    { id: 33, topic: '상권분석 기법', q: '소매포화지수(IRS)의 개념과 활용을 설명하시오.', a: 'IRS = (상권인구 × 1인당 지출액) ÷ 소매점 면적. 지수가 높으면 상권이 과소포화(출점 기회), 낮으면 과포화(경쟁 치열). 업종별로 산출하여 출점 적합성 판단에 활용.' },
    { id: 34, topic: '상권분석 기법', q: '상권분석에서 GIS(지리정보시스템) 활용방안을 설명하시오.', a: '활용: ①상권경계 시각화 ②인구분포 지도화 ③경쟁점 위치분석 ④동선분석 ⑤최적입지 선정 ⑥배달권역 설정. 디지털 지도에 상권정보를 레이어로 중첩하여 분석 정확도 향상.' },
    { id: 35, topic: '상권분석 기법', q: '체크리스트법에 의한 입지평가 방법을 설명하시오.', a: '평가항목별로 가중치와 점수를 부여하여 합산하는 방법입니다. 항목예시: 유동인구(20%), 접근성(15%), 가시성(15%), 경쟁(15%), 임대료(20%), 주변환경(15%). 객관적 비교 가능.' },
    { id: 36, topic: '상권분석 기법', q: '유사점포법(Analog Method)의 개념을 설명하시오.', a: '기존 유사점포의 매출 데이터를 활용하여 신규점포 매출을 예측하는 방법입니다. 유사성 기준: 상권특성, 점포면적, 경쟁환경 등. 자사 점포 데이터가 많을수록 정확도 향상.' },
    { id: 37, topic: '상권분석 기법', q: '회귀분석을 이용한 매출추정 방법을 설명하시오.', a: '매출에 영향을 미치는 변수(인구, 유동인구, 경쟁점수 등)와 매출의 관계를 회귀식으로 도출합니다. 신규입지 변수값을 대입하여 매출 예측. 과거 데이터가 충분해야 신뢰성 확보.' },
    { id: 38, topic: '상권분석 기법', q: '컨버스(Converse)의 신소매중력모델을 설명하시오.', a: '라일리 법칙을 발전시켜 두 도시 사이의 상권분기점을 계산하는 모델입니다. 분기점 = A도시로부터의 거리 / (1 + √(B인구/A인구)). 상권경계 설정에 활용됩니다.' },
    { id: 39, topic: '상권분석 기법', q: '빅데이터를 활용한 상권분석 방법을 설명하시오.', a: '활용데이터: ①카드결제 데이터(매출, 업종) ②통신데이터(유동인구, 체류시간) ③SNS데이터(관심도, 평판) ④포털검색량. 실시간 상권변화 파악, 세밀한 고객분석 가능. 데이터 접근이 관건.' },
    { id: 40, topic: '상권분석 기법', q: '상권분석 결과 해석 시 유의사항을 설명하시오.', a: '①데이터 시점 확인(코로나 등 특수상황) ②정량+정성 분석 병행 ③업종 특수성 반영 ④경쟁 변화 예측 ⑤임대조건 현실성 검토 ⑥리스크 요인 고려. 분석은 참고, 최종 판단은 종합적으로.' },

    // 매출액 추정과 상권 전략 (41-50)
    { id: 41, topic: '매출액 추정과 상권 전략', q: '매출추정의 방법과 각 방법의 특징을 설명하시오.', a: '①유사점포법: 유사점포 매출 참조, 데이터 필요 ②비율법: 상권인구×1인당지출×점유율 ③회귀분석: 통계적 예측, 다변수 고려 ④시장점유율법: 시장규모×예상점유율. 복수 방법 병행 권장.' },
    { id: 42, topic: '매출액 추정과 상권 전략', q: '손익분기점(BEP) 매출액 산출방법을 설명하시오.', a: 'BEP 매출 = 고정비 ÷ (1 - 변동비율). 고정비: 임대료, 인건비, 감가상각 등. 변동비: 원재료비, 판매수수료 등. 예상매출이 BEP 이상이어야 출점 타당성 확보. 안전마진 고려 필요.' },
    { id: 43, topic: '매출액 추정과 상권 전략', q: '객단가와 고객수를 활용한 매출추정을 설명하시오.', a: '일매출 = 객단가 × 일 고객수. 월매출 = 일매출 × 영업일수. 고객수 추정: 유동인구 × 입점률 × 구매전환율. 객단가는 업종평균 또는 유사점포 참조. 평일/주말, 시즌별 변동 고려.' },
    { id: 44, topic: '매출액 추정과 상권 전략', q: '상권확대 전략의 유형을 설명하시오.', a: '①마케팅 강화: 광고, 프로모션으로 인지도 확대 ②배달서비스: 물리적 상권 확대 ③온라인 연계: O2O로 상권 무한 확대 ④주차장 확보: 차량고객 흡인 ⑤영업시간 확대: 시간대별 고객 확보.' },
    { id: 45, topic: '매출액 추정과 상권 전략', q: '상권 방어 전략의 방법을 설명하시오.', a: '①고객로열티 강화: 멤버십, 포인트제 ②가격경쟁력 유지 ③서비스 차별화 ④지역밀착 마케팅 ⑤선제적 출점(경쟁자 진입 차단) ⑥이미지 관리. 기존 상권을 경쟁자로부터 보호.' },
    { id: 46, topic: '매출액 추정과 상권 전략', q: '복수점포 운영 시 상권 설정 원칙을 설명하시오.', a: '①상권 중복 최소화(카니발리제이션 방지) ②도미넌트 전략(특정 지역 집중) ③균형배치(시장 커버리지) ④중심점포+위성점포 구조. 점포간 시너지와 자기잠식 트레이드오프 관리.' },
    { id: 47, topic: '매출액 추정과 상권 전략', q: '상권변화 요인과 대응방안을 설명하시오.', a: '변화요인: ①인구변동 ②경쟁점 출현 ③교통변화(신규 역사) ④재개발 ⑤온라인 성장. 대응: 상권모니터링, 업종전환 검토, 마케팅 강화, 서비스 차별화, 필요시 철수 결정.' },
    { id: 48, topic: '매출액 추정과 상권 전략', q: '도미넌트 전략(Dominant Strategy)을 설명하시오.', a: '특정 지역에 다수의 점포를 집중 배치하여 해당 상권을 지배하는 전략입니다. 효과: ①인지도 향상 ②물류효율화 ③경쟁자 진입 억제 ④관리효율 ⑤지역 마케팅 효과. 편의점 체인이 대표적.' },
    { id: 49, topic: '매출액 추정과 상권 전략', q: '상권분석 실패사례와 원인을 분석하시오.', a: '실패원인: ①과대 매출추정(낙관적 가정) ②경쟁점 과소평가 ③임대료 상승 미예측 ④상권변화 무시 ⑤업종 미스매치 ⑥정성분석 소홀. 보수적 추정과 리스크 시나리오 검토 필요.' },
    { id: 50, topic: '매출액 추정과 상권 전략', q: '프랜차이즈 본사의 상권분석 지원 내용을 설명하시오.', a: '지원내용: ①입지선정 가이드라인 ②상권분석 시스템 제공 ③슈퍼바이저 현장조사 ④매출예측 모델 ⑤기존점 데이터 제공 ⑥보호상권 규정. 가맹점 실패 시 본사 이미지에도 영향.' },
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
          <h1 className="text-3xl font-black mb-4">📊 상권분석</h1>
          <p className="text-teal-100">상권의 개념, 입지분석, 상권조사 방법을 학습합니다.</p>
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
