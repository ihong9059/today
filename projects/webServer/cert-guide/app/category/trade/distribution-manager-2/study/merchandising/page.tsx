'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

export default function MerchandisingPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-2-merchandising-completed');
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
    localStorage.setItem('distribution-manager-2-merchandising-completed', JSON.stringify(newCompleted));
  };

  const handleAIHelp = (question: string) => {
    setCurrentPrompt(`유통관리사 2급 판매 및 고객관리 과목에서 다음 문제에 대해 자세히 설명해주세요:\n\n${question}\n\n핵심 개념과 암기 포인트를 알려주세요.`);
    setShowAIModal(true);
  };

  const questions = [
    // 판매의 기본원리 (1-10)
    { id: 1, topic: '판매의 기본원리', q: '판매의 정의와 판매원의 역할을 설명하시오.', a: '판매는 고객의 필요를 파악하여 적합한 상품을 제안하고 구매를 돕는 활동입니다. 판매원 역할: ①고객응대 ②상품설명 ③구매결정 지원 ④A/S 안내 ⑤매장관리 ⑥정보수집. 단순 판매자가 아닌 컨설턴트.' },
    { id: 2, topic: '판매의 기본원리', q: '판매 프로세스 7단계를 설명하시오.', a: '①잠재고객 발굴 ②사전준비(고객정보, 상품지식) ③접근(첫인상) ④니즈파악(질문, 경청) ⑤상품제시(특징, 편익) ⑥이의처리(반론극복) ⑦클로징(구매유도). 각 단계별 스킬 필요.' },
    { id: 3, topic: '판매의 기본원리', q: '고객유형별 응대방법을 설명하시오.', a: '①결단형: 신속 응대, 요점 전달 ②분석형: 상세정보, 논리적 설명 ③온화형: 친근감, 신뢰구축 ④표현형: 경청, 인정, 감성 어필. DISC 모델 등 활용. 유형 파악 후 맞춤 접근.' },
    { id: 4, topic: '판매의 기본원리', q: 'FAB(Feature-Advantage-Benefit) 화법을 설명하시오.', a: 'FAB: ①Feature(특징): 상품의 객관적 사실 ②Advantage(장점): 특징에서 오는 기능적 이점 ③Benefit(편익): 고객이 얻는 가치/혜택. 특징→장점→편익 순으로 설명. 고객 관점의 편익 강조가 핵심.' },
    { id: 5, topic: '판매의 기본원리', q: '상향판매(Up-selling)와 교차판매(Cross-selling)를 설명하시오.', a: '상향판매: 더 높은 등급/가격의 상품 추천 (예: 일반→프리미엄). 교차판매: 관련 보완상품 추가 추천 (예: 셔츠→넥타이). 객단가 향상 전략. 고객 니즈에 맞는 자연스러운 제안 중요.' },
    { id: 6, topic: '판매의 기본원리', q: '판매촉진(Sales Promotion)의 유형을 설명하시오.', a: '①가격할인: 정가 인하 ②쿠폰: 차후 할인권 ③리베이트: 구매 후 환급 ④사은품: 덤 증정 ⑤경품: 추첨 ⑥샘플: 시험사용 ⑦포인트적립 ⑧묶음판매. 단기 효과와 장기 브랜드 가치 균형.' },
    { id: 7, topic: '판매의 기본원리', q: 'POP(Point of Purchase) 광고의 기능을 설명하시오.', a: 'POP는 구매시점 광고로 매장 내 설치됩니다. 기능: ①상품정보 제공 ②충동구매 유발 ③브랜드 인지 ④판촉 안내 ⑤매장 분위기 연출. 유형: 포스터, 선반태그, 배너, 디지털사이니지.' },
    { id: 8, topic: '판매의 기본원리', q: '세일즈 스크립트의 작성과 활용을 설명하시오.', a: '스크립트: 판매대화의 표준화된 대본입니다. 구성: 인사→니즈파악→제품소개→이의처리→클로징. 활용: 신입교육, 일관된 품질, 효과적 응대. 암기가 아닌 자연스러운 적용이 관건.' },
    { id: 9, topic: '판매의 기본원리', q: '설득의 심리학(사회적 증거, 희소성 등)을 설명하시오.', a: '치알디니 6원칙: ①상호성(호의→보답) ②일관성(약속→행동) ③사회적 증거(다른 사람도 구매) ④호감(호감가는 사람) ⑤권위(전문가 추천) ⑥희소성(한정판매). 윤리적 범위 내 활용.' },
    { id: 10, topic: '판매의 기본원리', q: '판매실적 관리 지표(KPI)를 설명하시오.', a: '①매출액 ②객단가(ATV) ③객수(Traffic) ④구매전환율(CR) ⑤재구매율 ⑥반품율 ⑦상품회전율 ⑧인당 생산성. 지표별 목표 설정과 모니터링. PDCA 사이클로 개선.' },

    // 판매기법과 화법 (11-20)
    { id: 11, topic: '판매기법과 화법', q: '효과적인 접근화법(Approach)을 설명하시오.', a: '접근법: ①인사형: 친절한 인사로 시작 ②질문형: 필요사항 질문으로 시작 ③상품형: 특정 상품 관심 유도 ④칭찬형: 고객 외모/선택 칭찬 ⑤정보형: 세일 등 정보 제공. 상황에 맞는 선택.' },
    { id: 12, topic: '판매기법과 화법', q: '질문기법(개방형, 폐쇄형)의 활용을 설명하시오.', a: '개방형(5W1H): 자유롭게 답변 유도, 정보수집에 유용. 예) "어떤 용도로 찾으시나요?" 폐쇄형(예/아니오): 확인, 결정유도. 예) "이 색상이 마음에 드시나요?" 단계별 적절히 조합 활용.' },
    { id: 13, topic: '판매기법과 화법', q: '경청(Active Listening)의 기술을 설명하시오.', a: '기술: ①눈 맞춤 ②고개 끄덕임 ③맞장구(예, 그렇군요) ④요약·재확인 ⑤질문하기 ⑥공감표현 ⑦메모하기. 경청은 신뢰 구축과 니즈 파악의 핵심. 말하기보다 듣기가 중요.' },
    { id: 14, topic: '판매기법과 화법', q: '이의처리(Objection Handling)의 기법을 설명하시오.', a: '이의: 가격, 품질, 필요성 등 반론. 처리기법: ①Yes-But(수용 후 반전) ②Yes-And(동의 후 보완) ③질문전환(진짜 이유 파악) ④제3자 증거 ⑤비교설명 ⑥부메랑(반론을 장점으로). 감정적 대응 금지.' },
    { id: 15, topic: '판매기법과 화법', q: '클로징(Closing) 기법의 유형을 설명하시오.', a: '①직접요청형: 직접 구매 제안 ②양자택일형: A와 B 중 선택 ③추정형: 구매 전제 질문 ④요약형: 혜택 요약 후 결정유도 ⑤한정형: 기회 한정 강조 ⑥침묵형: 기다리기. 고객신호 파악 후 적시 클로징.' },
    { id: 16, topic: '판매기법과 화법', q: '비언어적 커뮤니케이션(Body Language)의 중요성을 설명하시오.', a: '비언어: 표정, 눈 맞춤, 자세, 제스처, 거리, 목소리 톤. 메시지의 55%가 비언어로 전달(메라비언 법칙). 주의: 팔짱 금지, 자연스러운 미소, 적절한 거리유지, 고객 향해 몸 방향.' },
    { id: 17, topic: '판매기법과 화법', q: '상품 시연(Demonstration)의 효과와 방법을 설명하시오.', a: '효과: ①이해도 향상 ②신뢰감 ③구매욕구 자극 ④기억 강화. 방법: ①사전준비(작동확인) ②고객 참여유도 ③핵심기능 집중 ④편익 강조 ⑤질문 유도. 체험이 최고의 설득.' },
    { id: 18, topic: '판매기법과 화법', q: '가격협상 시 판매원의 대응방법을 설명하시오.', a: '대응: ①가치 재강조(가격 대비 가치) ②번들 제안(할인 대신 추가혜택) ③대안 제시(저가 대안상품) ④권한 활용(상사 승인) ⑤침묵 유지. 성급한 할인은 마진과 신뢰 손상. Win-Win 협상.' },
    { id: 19, topic: '판매기법과 화법', q: '전화판매(텔레마케팅)의 기법을 설명하시오.', a: '기법: ①도입(소속, 목적 명확) ②관심 유발(혜택 언급) ③짧고 명확한 설명 ④질문으로 참여 유도 ⑤반론처리 ⑥클로징 ⑦후속 안내. 스크립트 준비, 목소리 톤 중요. 법적 규제(수신동의) 준수.' },
    { id: 20, topic: '판매기법과 화법', q: '디지털 채널(채팅, SNS)에서의 판매 화법을 설명하시오.', a: '특성: 비대면, 텍스트 중심, 빠른 응답 기대. 화법: ①신속한 답변 ②이모티콘 적절 사용 ③짧고 명확한 문장 ④이미지/영상 활용 ⑤링크 제공 ⑥후속 안내. 정형화된 답변+개인화 조합.' },

    // 고객서비스 관리 (21-30)
    { id: 21, topic: '고객서비스 관리', q: '고객서비스의 정의와 구성요소를 설명하시오.', a: '고객서비스는 구매 전·중·후 고객경험을 관리하는 활동입니다. 구성요소: ①접점서비스(인적 응대) ②제품서비스(A/S, 보증) ③부가서비스(배송, 포장) ④정보서비스(상담, 문의응대). 차별화 요소.' },
    { id: 22, topic: '고객서비스 관리', q: '고객접점(MOT: Moment of Truth)의 관리방법을 설명하시오.', a: 'MOT: 고객이 기업과 접촉하는 순간으로 인상이 결정됩니다. 관리: ①접점 파악(고객여정맵) ②표준 설정 ③교육 ④모니터링 ⑤개선. 모든 접점에서 일관된 긍정경험 제공이 목표.' },
    { id: 23, topic: '고객서비스 관리', q: 'SERVQUAL 모델의 5가지 차원을 설명하시오.', a: '서비스 품질 측정모델. ①유형성(시설, 외관) ②신뢰성(약속 이행) ③대응성(신속한 응대) ④확신성(전문성, 신뢰감) ⑤공감성(개별적 관심). 고객 기대 대비 인식 격차 측정. 품질개선 지표.' },
    { id: 24, topic: '고객서비스 관리', q: '고객만족(CS)과 고객감동의 차이를 설명하시오.', a: '고객만족: 기대 충족. 고객감동: 기대 초과. 만족은 재구매 조건, 감동은 충성고객·추천 유발. 감동 방법: ①예상치 못한 혜택 ②개인화 서비스 ③문제해결 탁월 ④감성적 연결. 진정성이 핵심.' },
    { id: 25, topic: '고객서비스 관리', q: 'NPS(Net Promoter Score)의 개념과 활용을 설명하시오.', a: 'NPS: "추천 의향" 질문으로 고객충성도 측정. 0-10점 응답. 9-10점: 추천자, 7-8점: 중립, 0-6점: 비추천자. NPS = 추천자% - 비추천자%. 간편하고 예측력 높음. 후속질문으로 원인 파악.' },
    { id: 26, topic: '고객서비스 관리', q: '서비스 회복(Service Recovery)의 중요성과 방법을 설명하시오.', a: '서비스 실패 후 고객 재만족시키는 활동입니다. 중요성: 성공적 회복 시 최초 만족보다 충성도 높아짐(서비스 회복 패러독스). 방법: ①신속대응 ②진심 사과 ③원인설명 ④보상 ⑤재발방지 약속.' },
    { id: 27, topic: '고객서비스 관리', q: '직원만족(ES)과 고객만족(CS)의 관계를 설명하시오.', a: '서비스 프로핏 체인: 직원만족→서비스품질→고객만족→고객충성→수익. 만족한 직원이 좋은 서비스 제공. ES 향상: ①공정한 보상 ②성장기회 ③근무환경 ④권한위임 ⑤인정문화. CS의 전제조건.' },
    { id: 28, topic: '고객서비스 관리', q: '미스터리쇼핑(Mystery Shopping)의 목적과 방법을 설명하시오.', a: '위장고객이 실제 구매상황에서 서비스를 평가하는 방법입니다. 목적: 서비스 현장 점검, 교육효과 확인. 방법: ①평가항목 설계 ②쇼퍼 교육 ③현장 방문 ④보고서 작성 ⑤피드백. 개선점 도출, 우수사례 공유.' },
    { id: 29, topic: '고객서비스 관리', q: '고객경험관리(CEM)의 개념과 실행방안을 설명하시오.', a: 'CEM: 고객여정 전 과정의 경험을 설계·관리하는 것입니다. CRM이 데이터 중심이라면 CEM은 경험 중심. 실행: ①고객여정맵 작성 ②터치포인트 최적화 ③감성 설계 ④피드백 수집 ⑤지속 개선.' },
    { id: 30, topic: '고객서비스 관리', q: '서비스 표준화와 개인화의 균형을 설명하시오.', a: '표준화: 일관된 품질, 효율성, 교육 용이. 개인화: 고객별 맞춤, 차별화, 감동. 균형: 기본 프로세스는 표준화, 고객응대는 개인화. 권한위임으로 현장 재량 부여. 데이터 활용 개인화.' },

    // 클레임 처리와 CRM (31-40)
    { id: 31, topic: '클레임 처리와 CRM', q: '고객불만(클레임)의 유형과 원인을 설명하시오.', a: '유형: ①상품(품질, 불량) ②서비스(응대, 속도) ③가격(오류, 부당) ④정책(교환, 환불). 원인: ①기업과실 ②고객오해 ③외부요인. 불만 표현 고객은 5%만, 나머지는 이탈. 불만은 개선 기회.' },
    { id: 32, topic: '클레임 처리와 CRM', q: '클레임 처리의 기본원칙과 절차를 설명하시오.', a: '원칙: ①신속성 ②경청 ③사과(과실 무관) ④해결 약속 ⑤후속관리. 절차: ①접수 ②상황파악 ③사과 ④해결방안 제시 ⑤처리 ⑥확인 ⑦기록. 감정 먼저, 문제 나중. 에스컬레이션 기준 명확화.' },
    { id: 33, topic: '클레임 처리와 CRM', q: '악성클레임(블랙컨슈머) 대응방법을 설명하시오.', a: '유형: 과도한 보상 요구, 반복민원, 협박. 대응: ①침착 유지 ②사실관계 확인 ③정책 설명 ④기록(녹취) ⑤상급자 연계 ⑥법적 대응 고려. 직원보호와 고객응대 균형. 매뉴얼화 필요.' },
    { id: 34, topic: '클레임 처리와 CRM', q: 'VOC(Voice of Customer) 시스템의 구축과 활용을 설명하시오.', a: 'VOC: 고객의 소리를 수집·분석·활용하는 시스템. 채널: 콜센터, 설문, SNS, 리뷰. 활용: ①불만감소 ②상품개선 ③서비스개선 ④트렌드파악. 수집→분류→분석→전달→개선→피드백 사이클.' },
    { id: 35, topic: '클레임 처리와 CRM', q: 'CRM(고객관계관리)의 목적과 기대효과를 설명하시오.', a: '목적: 고객 데이터 기반으로 관계 강화, 수익 극대화. 효과: ①고객이해 심화 ②맞춤 마케팅 ③고객유지율 향상 ④교차판매 증가 ⑤마케팅 효율화 ⑥고객생애가치 증대. 장기적 관점의 투자.' },
    { id: 36, topic: '클레임 처리와 CRM', q: '고객세분화 전략(VIP관리 등)을 설명하시오.', a: 'RFM 등으로 세분화 후 차별 전략. VIP: 최상위 고객, 전담매니저, 특별혜택, 우선서비스. 일반: 표준 서비스, 업그레이드 유도. 이탈위험: 리텐션 캠페인. 휴면: 재활성화 프로모션. 자원 효율적 배분.' },
    { id: 37, topic: '클레임 처리와 CRM', q: '로열티 프로그램의 유형과 효과를 설명하시오.', a: '유형: ①포인트적립 ②멤버십등급 ③캐시백 ④무료상품 ⑤특별경험(VIP라운지). 효과: 재구매 촉진, 이탈방지, 데이터수집, 객단가 향상. 주의: 비용부담, 고착화된 고객만 혜택. 감성적 로열티 병행.' },
    { id: 38, topic: '클레임 처리와 CRM', q: '고객이탈 방지(Retention) 전략을 설명하시오.', a: '이탈징후 파악: 구매빈도 감소, 불만 접수, 경쟁사 관심. 방지: ①조기경보시스템 ②Win-back 캠페인 ③특별혜택 ④원인파악 면담 ⑤서비스회복. 신규고객 획득보다 5배 저렴. 예방이 최선.' },
    { id: 39, topic: '클레임 처리와 CRM', q: '옴니채널 CRM의 특징과 구현방안을 설명하시오.', a: '모든 채널에서 일관된 고객경험과 데이터 통합. 특징: ①통합고객DB ②채널간 연속성 ③360도 고객뷰 ④실시간 연동. 구현: 데이터통합, 시스템연계, 조직협업, 옴니채널 KPI. 기술과 문화 모두 변화 필요.' },
    { id: 40, topic: '클레임 처리와 CRM', q: 'AI/챗봇을 활용한 고객서비스를 설명하시오.', a: '활용: ①FAQ 자동응답 ②24시간 서비스 ③예약/조회 ④초기상담 후 연결. 장점: 비용절감, 신속, 일관성. 한계: 복잡문의 한계, 감정대응. 성공조건: AI+인간 하이브리드, 지속학습, 적절한 에스컬레이션.' },

    // 판매환경관리 (41-50)
    { id: 41, topic: '판매환경관리', q: 'VMD(Visual Merchandising)의 구성요소를 설명하시오.', a: 'VMD: 시각적 상품연출로 구매를 유도하는 기법. 구성: ①VP(Visual Presentation): 매장 전면 연출 ②PP(Point Presentation): 코너 연출 ③IP(Item Presentation): 개별상품 진열. 통일된 컨셉과 스토리.' },
    { id: 42, topic: '판매환경관리', q: '매장 레이아웃의 유형과 특징을 설명하시오.', a: '①격자형(Grid): 직선 통로, 효율적, 슈퍼마켓 ②자유유동형(Free-flow): 곡선, 탐색유도, 의류매장 ③경주로형(Racetrack): 순환동선, 백화점 ④부티크형: 개별공간, 고급품. 상품특성과 고객행동에 맞게 선택.' },
    { id: 43, topic: '판매환경관리', q: '상품진열의 원칙과 기법을 설명하시오.', a: '원칙: ①골든존(눈높이) 활용 ②관련상품 인접 ③선입선출 ④가격표시 명확 ⑤재고보충 수시. 기법: 수직진열, 수평진열, 엔드진열, 아일랜드, 벌크진열. 진열=무언의 판매원.' },
    { id: 44, topic: '판매환경관리', q: '매장 분위기(Atmosphere) 요소와 효과를 설명하시오.', a: '요소: ①조명(밝기, 색온도) ②음악(템포, 장르) ③향기(아로마) ④색채 ⑤온도 ⑥청결. 효과: 체류시간, 구매금액, 브랜드이미지 영향. 감각마케팅. 타겟고객과 브랜드 정체성 일치 필요.' },
    { id: 45, topic: '판매환경관리', q: '재고관리의 기본원칙과 방법을 설명하시오.', a: '원칙: ①적정재고 유지 ②선입선출 ③정기점검 ④ABC관리. 방법: ①실사(Physical Count) ②순환재고조사(Cycle Count) ③시스템 연동. 과잉재고(비용), 품절(기회손실) 방지. 판매데이터 분석 활용.' },
    { id: 46, topic: '판매환경관리', q: '손실방지(Loss Prevention)의 유형과 대책을 설명하시오.', a: '손실유형: ①외부절도(고객) ②내부절도(직원) ③관리오류 ④공급망손실. 대책: ①CCTV ②EAS태그 ③재고관리시스템 ④직원교육 ⑤출입통제 ⑥감사. 예방→적발→대응 체계.' },
    { id: 47, topic: '판매환경관리', q: '매장 안전관리의 주요 항목을 설명하시오.', a: '항목: ①소방안전(소화기, 비상구) ②전기안전 ③시설안전(바닥, 선반) ④위생관리 ⑤고객안전(미끄럼방지) ⑥비상대응매뉴얼. 법규준수 필수. 사고예방이 최우선, 보험가입, 정기점검.' },
    { id: 48, topic: '판매환경관리', q: 'SCM 관점에서 소매점 역할을 설명하시오.', a: '소매점은 SCM 최종단계로 고객접점입니다. 역할: ①판매(수요실현) ②POS정보 제공 ③재고보유 ④고객피드백 전달. 정보공유로 채찍효과 완화, 협력적 재고관리(VMI, CPFR)에 참여. 공급망 동반자.' },
    { id: 49, topic: '판매환경관리', q: '친환경 매장운영(Green Store)의 실천방안을 설명하시오.', a: '실천: ①에너지절약(LED, 절전설비) ②재활용(포장재 감축) ③친환경상품 취급 ④폐기물 분리수거 ⑤친환경인증 ⑥소비자 캠페인. ESG 경영 확산. 비용절감과 이미지 제고 동시 효과.' },
    { id: 50, topic: '판매환경관리', q: '스마트스토어(무인매장, 디지털기술)의 발전방향을 설명하시오.', a: '기술: ①무인결제 ②AI상품추천 ③디지털사이니지 ④스마트미러 ⑤비콘/앱연계 ⑥로봇. 발전: 편의성 극대화, 데이터 기반 운영, 인력효율화. 과제: 도입비용, 기술안정성, 감성적 서비스 보완. 인간+기술 융합.' },
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
          <h1 className="text-3xl font-black mb-4">🤝 판매 및 고객관리</h1>
          <p className="text-teal-100">판매기법, 고객서비스, CRM을 학습합니다.</p>
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
