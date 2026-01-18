'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MarketingBasicsPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-2-marketing-basics-completed');
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
    localStorage.setItem('distribution-manager-2-marketing-basics-completed', JSON.stringify(newCompleted));
  };

  const handleAIHelp = (question: string) => {
    setCurrentPrompt(`유통관리사 2급 유통마케팅 과목에서 다음 문제에 대해 자세히 설명해주세요:\n\n${question}\n\n핵심 개념과 암기 포인트를 알려주세요.`);
    setShowAIModal(true);
  };

  const questions = [
    // 마케팅의 기초개념 (1-10)
    { id: 1, topic: '마케팅의 기초개념', q: '마케팅의 정의와 핵심 개념을 설명하시오.', a: '마케팅은 고객의 필요와 욕구를 파악하여 만족시키는 교환과정을 관리하는 활동입니다. 핵심개념: ①필요(Needs) ②욕구(Wants) ③수요(Demands) ④제품(Products) ⑤교환(Exchange) ⑥시장(Market).' },
    { id: 2, topic: '마케팅의 기초개념', q: '마케팅 관리 철학의 발전과정을 설명하시오.', a: '①생산지향: 생산 효율성 중시 ②제품지향: 품질·성능 중시 ③판매지향: 판촉·광고 강조 ④마케팅지향: 고객 필요 중심 ⑤사회적 마케팅: 사회적 책임 포함. 시장 환경 변화에 따라 발전.' },
    { id: 3, topic: '마케팅의 기초개념', q: '마케팅 환경 분석(PEST)의 각 요소를 설명하시오.', a: 'PEST분석: ①Political(정치·법률): 규제, 정책 ②Economic(경제): 경기, 물가, 환율 ③Social(사회·문화): 인구, 라이프스타일 ④Technological(기술): 기술혁신, 디지털화. 거시환경 분석 프레임워크.' },
    { id: 4, topic: '마케팅의 기초개념', q: 'SWOT 분석의 개념과 활용방법을 설명하시오.', a: 'SWOT: 강점(Strength), 약점(Weakness), 기회(Opportunity), 위협(Threat). 내부(S,W)와 외부(O,T) 분석을 결합. 활용: SO전략(강점으로 기회 활용), WO전략(약점 보완), ST전략(위협 대응), WT전략(최소화).' },
    { id: 5, topic: '마케팅의 기초개념', q: '마케팅 전략 수립 과정(STP)을 설명하시오.', a: 'STP: ①Segmentation(시장세분화): 시장을 동질적 집단으로 구분 ②Targeting(표적시장선정): 진입할 세그먼트 선택 ③Positioning(포지셔닝): 경쟁제품 대비 차별적 위치 설정. 마케팅 전략의 핵심 프레임워크.' },
    { id: 6, topic: '마케팅의 기초개념', q: '마케팅 믹스(4P)의 각 요소를 설명하시오.', a: '①Product(제품): 품질, 디자인, 브랜드, 포장 ②Price(가격): 가격전략, 할인, 결제조건 ③Place(유통): 채널, 물류, 점포 ④Promotion(촉진): 광고, 판촉, PR, 인적판매. 통합적 운영이 중요.' },
    { id: 7, topic: '마케팅의 기초개념', q: '서비스 마케팅 7P의 추가 요소를 설명하시오.', a: '기존 4P에 추가: ⑤People(사람): 서비스 제공 직원 ⑥Process(과정): 서비스 전달 절차 ⑦Physical Evidence(물리적 증거): 서비스 환경, 시설. 서비스의 무형성, 이질성 극복에 중요.' },
    { id: 8, topic: '마케팅의 기초개념', q: 'BCG 매트릭스의 4가지 유형을 설명하시오.', a: '시장성장률×상대적 점유율 기준. ①Star(고성장·고점유): 집중투자 ②Cash Cow(저성장·고점유): 현금창출원 ③Question Mark(고성장·저점유): 선별투자 ④Dog(저성장·저점유): 철수검토. 사업 포트폴리오 분석.' },
    { id: 9, topic: '마케팅의 기초개념', q: '마이클 포터의 5 Forces 모델을 설명하시오.', a: '산업 경쟁강도 분석: ①기존 경쟁자간 경쟁 ②신규 진입자 위협 ③대체재 위협 ④구매자 교섭력 ⑤공급자 교섭력. 5가지 힘이 약할수록 산업 매력도 높음. 경쟁전략 수립의 기초.' },
    { id: 10, topic: '마케팅의 기초개념', q: '마케팅 조사의 과정과 방법을 설명하시오.', a: '과정: ①문제정의 ②조사설계 ③자료수집 ④분석 ⑤보고서작성. 방법: 1차자료(설문, 관찰, 실험), 2차자료(기존통계, 문헌). 정량조사와 정성조사 구분. 목적에 맞는 방법 선택 중요.' },

    // 소비자행동 분석 (11-20)
    { id: 11, topic: '소비자행동 분석', q: '소비자 구매의사결정 과정 5단계를 설명하시오.', a: '①문제인식: 필요 발생 ②정보탐색: 내적·외적 정보 수집 ③대안평가: 속성별 비교 ④구매결정: 브랜드·점포 선택 ⑤구매후행동: 만족/불만족 평가. 단계별 마케팅 접점 파악 필요.' },
    { id: 12, topic: '소비자행동 분석', q: '관여도(Involvement)의 개념과 마케팅 시사점을 설명하시오.', a: '관여도는 제품에 대한 소비자의 관심·중요도입니다. 고관여: 신중한 정보처리, 이성적 소구 효과. 저관여: 반복광고, 습관적 구매, 감성적 소구 효과. 제품별 관여도에 맞는 마케팅 전략 필요.' },
    { id: 13, topic: '소비자행동 분석', q: '소비자 구매행동에 영향을 미치는 요인을 설명하시오.', a: '①문화적 요인: 문화, 하위문화, 사회계층 ②사회적 요인: 준거집단, 가족, 역할 ③개인적 요인: 연령, 직업, 라이프스타일 ④심리적 요인: 동기, 지각, 학습, 태도. 복합적 영향.' },
    { id: 14, topic: '소비자행동 분석', q: '매슬로우의 욕구단계이론과 마케팅 적용을 설명하시오.', a: '5단계: ①생리적 욕구 ②안전 욕구 ③사회적 욕구 ④존경 욕구 ⑤자아실현 욕구. 하위욕구 충족 후 상위욕구 추구. 마케팅: 제품이 충족하는 욕구수준 파악, 소구 포인트 설정.' },
    { id: 15, topic: '소비자행동 분석', q: '지각(Perception) 과정과 선택적 지각을 설명하시오.', a: '지각과정: 자극→노출→주의→해석. 선택적 지각: ①선택적 노출(관심 정보만 노출) ②선택적 주의(관심 정보에 주목) ③선택적 왜곡(기존 신념에 맞게 해석) ④선택적 기억. 광고효과에 영향.' },
    { id: 16, topic: '소비자행동 분석', q: '소비자 태도의 구성요소와 태도변화 방법을 설명하시오.', a: '구성요소: ①인지적(지식, 신념) ②감정적(호/불호) ③행동적(구매의도). 태도변화: 정보제공, 반복노출, 유명인 활용, 비교광고, 체험마케팅. 일단 형성된 태도는 변화시키기 어려움.' },
    { id: 17, topic: '소비자행동 분석', q: '준거집단(Reference Group)의 유형과 영향을 설명하시오.', a: '유형: ①소속집단(가족, 동료) ②열망집단(되고 싶은 집단) ③회피집단. 영향: 정보제공, 규범설정, 가치표현. 패션, 자동차 등 눈에 보이는 제품에 영향 큼. 인플루언서 마케팅 활용.' },
    { id: 18, topic: '소비자행동 분석', q: '소비자 라이프스타일 분석(AIO)을 설명하시오.', a: 'AIO분석: ①Activities(활동): 취미, 쇼핑, 스포츠 ②Interests(관심): 가족, 패션, 음식 ③Opinions(의견): 사회, 정치, 경제. 라이프스타일에 따른 소비자 세분화와 타겟팅에 활용.' },
    { id: 19, topic: '소비자행동 분석', q: '충동구매의 유형과 유발요인을 설명하시오.', a: '유형: ①순수충동(완전 비계획) ②상기충동(광고 상기) ③암시충동(처음 본 제품) ④계획충동(특가 대기). 유발요인: 매장 분위기, 판촉, 점원 권유, 기분, 시간압박. POP광고, 진열 중요.' },
    { id: 20, topic: '소비자행동 분석', q: '구매후 부조화(인지부조화)와 대응방안을 설명하시오.', a: '구매 후 의심·후회하는 심리상태입니다. 고관여 제품에서 발생. 대응: ①구매 정당화 정보 제공 ②A/S 보증 ③감사 메시지 ④교환·환불 정책 ⑤고객 커뮤니티. 재구매·추천에 영향.' },

    // 시장세분화와 표적시장 (21-30)
    { id: 21, topic: '시장세분화와 표적시장', q: '시장세분화의 목적과 효과를 설명하시오.', a: '목적: 이질적 시장을 동질적 집단으로 구분하여 효과적 마케팅 실행. 효과: ①고객 니즈 정확 파악 ②마케팅 자원 효율적 배분 ③경쟁우위 확보 ④시장기회 발견 ⑤고객만족 향상.' },
    { id: 22, topic: '시장세분화와 표적시장', q: '시장세분화 기준(인구통계, 심리, 행동)을 설명하시오.', a: '①인구통계: 연령, 성별, 소득, 학력, 가족 ②지리적: 지역, 도시규모, 기후 ③심리적: 라이프스타일, 성격, 가치관 ④행동적: 사용량, 추구편익, 충성도, 구매시기. 복수 기준 조합 활용.' },
    { id: 23, topic: '시장세분화와 표적시장', q: '효과적 세분화의 요건 5가지를 설명하시오.', a: '①측정가능성(Measurable): 규모, 특성 측정 가능 ②접근가능성(Accessible): 마케팅 도달 가능 ③실질성(Substantial): 충분한 규모와 수익성 ④차별화가능성(Differentiable): 세그먼트간 차별 반응 ⑤실행가능성(Actionable): 마케팅 프로그램 실행 가능.' },
    { id: 24, topic: '시장세분화와 표적시장', q: '표적시장 선정 전략 3가지를 비교하시오.', a: '①비차별화(대중) 마케팅: 전체시장 단일 마케팅, 규모의 경제 ②차별화 마케팅: 복수 세그먼트별 맞춤, 매출극대화 ③집중화 마케팅: 특정 세그먼트 전문화, 자원 제한시 유리. 기업역량과 시장특성 고려.' },
    { id: 25, topic: '시장세분화와 표적시장', q: '니치 마케팅(Niche Marketing)의 개념과 전략을 설명하시오.', a: '틈새시장을 공략하는 전략입니다. 특징: 소규모 세그먼트, 특수 니즈, 경쟁 적음, 높은 마진. 전략: ①전문성 구축 ②차별화 서비스 ③고객관계 강화 ④입소문 마케팅. 소기업에 적합.' },
    { id: 26, topic: '시장세분화와 표적시장', q: '포지셔닝(Positioning)의 개념과 방법을 설명하시오.', a: '포지셔닝은 소비자 마음속에 경쟁제품 대비 차별적 위치를 확보하는 것입니다. 방법: ①속성 포지셔닝 ②편익 포지셔닝 ③사용자 포지셔닝 ④경쟁자 대비 포지셔닝 ⑤품질·가격 포지셔닝.' },
    { id: 27, topic: '시장세분화와 표적시장', q: '포지셔닝 맵(Positioning Map)의 작성과 활용을 설명하시오.', a: '2개 축(속성)으로 경쟁브랜드 위치를 표시하는 도구입니다. 작성: 중요속성 선정→소비자 인식조사→맵에 표시. 활용: 경쟁현황 파악, 빈 공간(기회) 발견, 리포지셔닝 방향 설정.' },
    { id: 28, topic: '시장세분화와 표적시장', q: '리포지셔닝(Repositioning)의 필요성과 방법을 설명하시오.', a: '기존 포지션을 변경하는 전략입니다. 필요성: 시장변화, 경쟁심화, 이미지 노후화, 신규시장 진출. 방법: ①제품 개선 ②가격 조정 ③광고메시지 변경 ④유통채널 변경 ⑤브랜드 리뉴얼. 신중한 실행 필요.' },
    { id: 29, topic: '시장세분화와 표적시장', q: '페르소나(Persona) 마케팅의 개념을 설명하시오.', a: '페르소나는 가상의 대표고객 프로필입니다. 구성: 이름, 연령, 직업, 라이프스타일, 구매동기, 미디어 이용. 효과: 고객 구체화, 마케팅 일관성, 팀 공감대 형성. 데이터 기반 페르소나 설정 중요.' },
    { id: 30, topic: '시장세분화와 표적시장', q: '세대별 마케팅(MZ세대 등) 특성을 설명하시오.', a: 'MZ세대(밀레니얼+Z세대): 디지털 네이티브, 경험중시, 가치소비, SNS활용, 개인화 선호. X세대: 실용성, 가성비, 브랜드 충성. 베이비붐: 품질중시, 전통채널 선호. 세대특성에 맞는 접근 필요.' },

    // 마케팅 믹스 4P (31-40)
    { id: 31, topic: '마케팅 믹스 4P', q: '제품수명주기(PLC)의 각 단계와 마케팅 전략을 설명하시오.', a: '①도입기: 인지도 구축, 시험구매 유도 ②성장기: 시장확대, 차별화, 유통확장 ③성숙기: 시장방어, 판촉강화, 원가절감 ④쇠퇴기: 수확, 철수 또는 리뉴얼. 단계별 적합한 마케팅 믹스 조정.' },
    { id: 32, topic: '마케팅 믹스 4P', q: '브랜드 자산(Brand Equity)의 구성요소를 설명하시오.', a: '①브랜드 인지도: 상기도, 재인도 ②브랜드 연상: 이미지, 속성 연결 ③지각된 품질: 전반적 품질 인식 ④브랜드 충성도: 재구매, 추천 의향 ⑤독점적 자산: 특허, 상표권. 장기적 경쟁우위의 원천.' },
    { id: 33, topic: '마케팅 믹스 4P', q: '가격결정 방법 3가지(원가, 경쟁, 수요)를 설명하시오.', a: '①원가기준: 원가+마진, 손익분기점 고려 ②경쟁기준: 경쟁사 가격 참조, 업계 관행 ③수요기준: 소비자 지불의향, 가격탄력성 고려. 실제로는 3가지 모두 고려하여 결정.' },
    { id: 34, topic: '마케팅 믹스 4P', q: '심리적 가격전략의 유형을 설명하시오.', a: '①단수가격: 9,900원(10,000원보다 저렴 인식) ②명성가격: 고가=고품질 인식 ③관습가격: 익숙한 가격대 유지 ④미끼가격: 저가상품으로 유인 후 상향판매 ⑤묶음가격: 패키지 할인 인식. 소비자 심리 활용.' },
    { id: 35, topic: '마케팅 믹스 4P', q: '가격탄력성의 개념과 마케팅 시사점을 설명하시오.', a: '가격탄력성 = 수요변화율 / 가격변화율. 탄력적(>1): 가격민감, 할인효과 큼, 생필품 대체재 많은 경우. 비탄력적(<1): 가격둔감, 가격인상 가능, 필수품·독점품. 가격전략 수립의 기초.' },
    { id: 36, topic: '마케팅 믹스 4P', q: '유통경로 선택시 고려요인을 설명하시오.', a: '①시장요인: 고객분포, 구매습관 ②제품요인: 부패성, 가치, 기술성 ③기업요인: 규모, 자금력, 통제욕구 ④중간상요인: 가용성, 서비스수준 ⑤경쟁요인: 경쟁사 채널. 다요인 종합 평가.' },
    { id: 37, topic: '마케팅 믹스 4P', q: '촉진믹스(Promotion Mix)의 구성요소를 설명하시오.', a: '①광고: 유료 비인적 커뮤니케이션 ②판매촉진: 단기 구매유인(쿠폰, 샘플) ③PR: 언론홍보, 이벤트 ④인적판매: 대면 설득 ⑤직접마케팅: DM, 이메일, 텔레마케팅. 통합적 운영(IMC) 중요.' },
    { id: 38, topic: '마케팅 믹스 4P', q: 'ATL과 BTL 광고의 차이를 설명하시오.', a: 'ATL(Above The Line): TV, 라디오, 신문, 잡지 등 매스미디어 광고. 인지도, 이미지 구축. BTL(Below The Line): 판촉, 이벤트, DM, 옥외광고 등. 직접반응 유도. 최근 디지털로 경계 모호. TTL(Through The Line) 통합 추세.' },
    { id: 39, topic: '마케팅 믹스 4P', q: 'AIDA 모델의 각 단계와 마케팅 적용을 설명하시오.', a: '①Attention(주의): 광고로 관심 유발 ②Interest(흥미): 제품 정보 제공 ③Desire(욕구): 편익 강조, 시험 기회 ④Action(행동): 구매 유도, CTA 설정. 커뮤니케이션 목표와 메시지 설계의 기본 모델.' },
    { id: 40, topic: '마케팅 믹스 4P', q: 'IMC(통합마케팅커뮤니케이션)의 개념과 중요성을 설명하시오.', a: 'IMC는 모든 커뮤니케이션 수단을 통합하여 일관된 메시지를 전달하는 것입니다. 중요성: ①메시지 일관성 ②시너지 효과 ③비용효율 ④고객경험 통합 ⑤브랜드 강화. 온·오프라인 통합이 핵심.' },

    // 디지털 마케팅과 촉진 (41-50)
    { id: 41, topic: '디지털 마케팅과 촉진', q: '디지털 마케팅의 특성과 장점을 설명하시오.', a: '특성: 쌍방향성, 개인화, 즉시성, 측정가능성. 장점: ①정밀 타겟팅 ②비용효율성 ③실시간 성과측정 ④즉각적 피드백 ⑤글로벌 도달. 전통매체 대비 ROI 측정 용이.' },
    { id: 42, topic: '디지털 마케팅과 촉진', q: 'SNS 마케팅의 유형과 전략을 설명하시오.', a: '채널: 인스타그램(비주얼), 유튜브(영상), 페이스북(커뮤니티), 틱톡(숏폼). 전략: ①콘텐츠 마케팅 ②인플루언서 협업 ③해시태그 활용 ④사용자생성콘텐츠(UGC) ⑤커뮤니티 구축. 채널별 특성 맞춤.' },
    { id: 43, topic: '디지털 마케팅과 촉진', q: '검색엔진마케팅(SEM, SEO)의 개념을 설명하시오.', a: 'SEM: 검색결과에서 노출을 높이는 마케팅. SEO(검색최적화): 자연검색 순위 상승, 무료, 장기적. SEA(검색광고): 유료 키워드광고, 즉각적. 둘을 병행하여 검색 점유율 극대화.' },
    { id: 44, topic: '디지털 마케팅과 촉진', q: '리타겟팅(Retargeting) 광고의 원리와 효과를 설명하시오.', a: '웹사이트 방문자에게 다른 사이트에서 광고를 노출하는 기법입니다. 원리: 쿠키 활용하여 방문자 추적. 효과: ①브랜드 상기 ②전환율 향상 ③이탈고객 재유입 ④비용효율적. 과도한 노출 주의.' },
    { id: 45, topic: '디지털 마케팅과 촉진', q: '콘텐츠 마케팅의 유형과 효과를 설명하시오.', a: '유형: 블로그, 동영상, 인포그래픽, e-book, 팟캐스트, 웨비나. 효과: ①브랜드 신뢰 구축 ②검색노출 향상 ③고객 교육 ④리드 생성 ⑤공유 확산. 가치 있는 콘텐츠로 자발적 관심 유도.' },
    { id: 46, topic: '디지털 마케팅과 촉진', q: '판매촉진(SP)의 유형(소비자, 유통업체 대상)을 설명하시오.', a: '소비자 대상: 쿠폰, 샘플, 경품, 리베이트, 포인트. 유통업체 대상: 장려금, 판매경진대회, 공동광고, 진열지원. 단기 효과적이나 브랜드 가치 희석 주의. 광고와 연계 중요.' },
    { id: 47, topic: '디지털 마케팅과 촉진', q: '바이럴 마케팅의 개념과 성공요인을 설명하시오.', a: '입소문처럼 자발적으로 확산되는 마케팅입니다. 성공요인: ①재미·감동·공감 콘텐츠 ②공유 용이성 ③타이밍 ④인플루언서 활용 ⑤참여 유도. 통제 어려움, 부정적 바이럴 리스크 존재.' },
    { id: 48, topic: '디지털 마케팅과 촉진', q: '고객관계관리(CRM) 마케팅의 개념과 활동을 설명하시오.', a: 'CRM은 고객 데이터를 기반으로 관계를 관리하고 가치를 극대화하는 것입니다. 활동: ①고객분류(RFM) ②맞춤 커뮤니케이션 ③로열티프로그램 ④교차·상향판매 ⑤이탈방지. LTV(고객생애가치) 극대화 목표.' },
    { id: 49, topic: '디지털 마케팅과 촉진', q: 'O2O(Online to Offline) 마케팅 전략을 설명하시오.', a: '온라인에서 오프라인으로 고객을 유도하는 전략입니다. 방법: ①온라인 쿠폰→매장 사용 ②온라인 예약→매장 방문 ③위치기반 푸시알림 ④온라인 구매-매장 픽업. 옴니채널 구현의 핵심.' },
    { id: 50, topic: '디지털 마케팅과 촉진', q: '마케팅 성과지표(KPI)의 유형을 설명하시오.', a: '인지지표: 노출수, 도달률, 인지도. 관심지표: 클릭률(CTR), 체류시간. 구매지표: 전환율, 매출, ROAS. 충성지표: 재구매율, NPS, CLV. 목표에 맞는 KPI 설정과 지속적 모니터링 필요.' },
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
          <h1 className="text-3xl font-black mb-4">🎯 유통마케팅</h1>
          <p className="text-teal-100">마케팅 기초, 소비자행동, 촉진전략을 학습합니다.</p>
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
