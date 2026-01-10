'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DistributionInfoPage() {
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('distribution-manager-2-distribution-info-completed');
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
    localStorage.setItem('distribution-manager-2-distribution-info-completed', JSON.stringify(newCompleted));
  };

  const handleAIHelp = (question: string) => {
    setCurrentPrompt(`유통관리사 2급 유통정보 과목에서 다음 문제에 대해 자세히 설명해주세요:\n\n${question}\n\n핵심 개념과 암기 포인트를 알려주세요.`);
    setShowAIModal(true);
  };

  const questions = [
    // POS 시스템 (1-10)
    { id: 1, topic: 'POS 시스템', q: 'POS(Point of Sale) 시스템의 정의와 기능을 설명하시오.', a: 'POS는 판매시점관리 시스템으로 판매 데이터를 실시간 수집·처리합니다. 기능: ①판매등록 ②재고관리 ③고객관리 ④매출분석 ⑤본사 연계. 소매업 운영의 핵심 인프라입니다.' },
    { id: 2, topic: 'POS 시스템', q: 'POS 시스템의 구성요소(하드웨어, 소프트웨어)를 설명하시오.', a: '하드웨어: ①POS터미널 ②바코드스캐너 ③영수증프린터 ④카드리더기 ⑤금전등록기 ⑥터치스크린. 소프트웨어: POS 프로그램, 재고관리, 회계연동, 본사연계 시스템.' },
    { id: 3, topic: 'POS 시스템', q: 'POS 데이터 활용방안을 설명하시오.', a: '①매출분석: 시간대별, 상품별, 점포별 ②재고관리: 자동발주, 재고회전율 ③고객분석: 구매패턴, RFM분석 ④카테고리관리: 상품 구색, 진열최적화 ⑤수요예측: 발주량, 판촉계획.' },
    { id: 4, topic: 'POS 시스템', q: 'POS 시스템 도입효과를 설명하시오.', a: '①업무효율: 정산시간 단축, 오류감소 ②재고관리: 적정재고, 품절방지 ③고객서비스: 빠른 결제, 포인트관리 ④경영정보: 실시간 데이터, 의사결정 지원 ⑤비용절감: 인건비, 재고비용.' },
    { id: 5, topic: 'POS 시스템', q: 'PLU(Price Look Up) 코드의 개념과 활용을 설명하시오.', a: 'PLU는 바코드가 없는 상품(농산물 등)에 부여하는 코드입니다. 4-5자리 숫자로 구성. 저울과 POS 연계하여 무게별 가격 계산. 신선식품 판매관리에 필수. 국제표준화 추진 중.' },
    { id: 6, topic: 'POS 시스템', q: 'SKU(Stock Keeping Unit)의 개념을 설명하시오.', a: 'SKU는 재고관리 최소단위로, 상품을 식별하는 코드입니다. 동일상품도 색상·사이즈 다르면 별도 SKU. 재고관리, 발주, 분석의 기본단위. SKU 수가 많을수록 관리 복잡성 증가.' },
    { id: 7, topic: 'POS 시스템', q: 'POS 시스템과 ERP 연계의 효과를 설명하시오.', a: '연계효과: ①실시간 매출→회계반영 ②자동발주→구매처리 ③재고통합관리 ④통합 경영분석 ⑤업무효율화. 데이터 이중입력 방지, 정보 일관성 확보. 시스템 통합이 기업경쟁력.' },
    { id: 8, topic: 'POS 시스템', q: '모바일POS의 특징과 활용사례를 설명하시오.', a: '특징: ①이동성(테이블, 야외 결제) ②저렴한 도입비용 ③빠른 설치 ④직관적 인터페이스. 사례: 카페, 푸드트럭, 팝업스토어, 배달. 스마트폰·태블릿 활용, 클라우드 기반.' },
    { id: 9, topic: 'POS 시스템', q: '무인결제시스템(셀프체크아웃)의 장단점을 설명하시오.', a: '장점: ①인건비 절감 ②대기시간 단축 ③24시간 운영 ④비대면 선호 충족. 단점: ①도난 위험 ②기기 고장 ③고객 적응 필요 ④복잡한 결제 불가. 편의점, 대형마트 확대 추세.' },
    { id: 10, topic: 'POS 시스템', q: 'POS 보안관리의 중요성과 방안을 설명하시오.', a: '중요성: 카드정보, 고객정보 유출 시 법적책임, 신뢰 손상. 방안: ①암호화(P2PE) ②접근권한 관리 ③정기 보안점검 ④PCI-DSS 준수 ⑤직원교육 ⑥백업관리. 개인정보보호법 준수 필수.' },

    // EDI와 VAN (11-20)
    { id: 11, topic: 'EDI와 VAN', q: 'EDI(Electronic Data Interchange)의 정의와 특징을 설명하시오.', a: 'EDI는 기업간 표준화된 전자문서를 컴퓨터간 교환하는 시스템입니다. 특징: ①표준화된 문서형식 ②자동처리 ③실시간 교환 ④오류감소 ⑤비용절감. 주문서, 송장, 대금청구서 등 교환.' },
    { id: 12, topic: 'EDI와 VAN', q: 'EDI 도입효과를 설명하시오.', a: '①업무효율: 서류작업 90% 감소 ②시간단축: 주문-납품 리드타임 단축 ③비용절감: 인건비, 서류비용 ④정확성: 입력오류 제거 ⑤재고감소: 신속한 정보공유로 JIT 가능 ⑥파트너십 강화.' },
    { id: 13, topic: 'EDI와 VAN', q: 'VAN(Value Added Network)의 개념과 서비스를 설명하시오.', a: 'VAN은 부가가치통신망으로 EDI 메시지 중계, 변환 서비스를 제공합니다. 서비스: ①메시지 중계 ②형식 변환 ③보관·감사 ④보안 ⑤24시간 운영. 기업들이 직접 연결하지 않고 VAN 통해 교환.' },
    { id: 14, topic: 'EDI와 VAN', q: 'Web-EDI의 특징과 장점을 설명하시오.', a: '웹 브라우저를 통해 EDI 기능을 수행하는 방식입니다. 장점: ①별도 소프트웨어 불필요 ②저렴한 도입비용 ③쉬운 사용법 ④중소기업 접근성. 대기업-중소 협력업체간 활용 증가.' },
    { id: 15, topic: 'EDI와 VAN', q: '유통 EDI에서 사용되는 주요 메시지 유형을 설명하시오.', a: '①주문서(Order) ②주문확인서(Order Response) ③납품서(Dispatch Advice) ④수령확인서(Receiving Advice) ⑤세금계산서(Invoice) ⑥대금청구서. 거래 전 과정 전자화.' },
    { id: 16, topic: 'EDI와 VAN', q: 'EDI 표준의 종류와 특징을 설명하시오.', a: '국제표준: ①UN/EDIFACT(유럽중심, 국제무역) ②ANSI X.12(미국). 국내: ③KEDI(한국). XML기반: ④ebXML ⑤RosettaNet. 산업별 표준도 존재. 표준 통일이 EDI 확산의 관건.' },
    { id: 17, topic: 'EDI와 VAN', q: 'EDI와 e-마켓플레이스의 관계를 설명하시오.', a: 'e-마켓플레이스는 온라인 거래시장으로 EDI 기반 거래를 수행합니다. 기능: ①공급자-구매자 매칭 ②전자입찰 ③카탈로그 관리 ④대금결제. 다수 기업간 EDI를 효율적으로 연결.' },
    { id: 18, topic: 'EDI와 VAN', q: 'API와 EDI의 차이점을 설명하시오.', a: 'EDI: 표준문서 형식, 배치처리, VAN 경유, 대용량 정형데이터. API: 실시간 연결, 직접통신, 유연한 형식, 다양한 데이터. 최근 EDI와 API 하이브리드 방식 증가. 용도에 따라 선택.' },
    { id: 19, topic: 'EDI와 VAN', q: '블록체인 기술의 유통정보 적용 가능성을 설명하시오.', a: '적용분야: ①이력추적(원산지, 유통경로) ②위변조 방지 ③스마트계약(자동결제) ④공급망 투명성. 장점: 신뢰성, 보안성, 분산관리. 과제: 처리속도, 표준화, 도입비용.' },
    { id: 20, topic: 'EDI와 VAN', q: 'EDI 도입시 고려사항을 설명하시오.', a: '①거래처 현황: 주요 거래처 EDI 사용 여부 ②표준선택: 업종·거래처 맞춤 ③VAN사 선정: 서비스, 비용, 안정성 ④시스템연계: ERP, POS 연동 ⑤교육: 담당자 역량 ⑥비용분석: 도입·운영비용.' },

    // 바코드와 RFID (21-30)
    { id: 21, topic: '바코드와 RFID', q: '바코드의 종류(1차원, 2차원)와 특징을 비교하시오.', a: '1차원(선형): 가로줄 패턴, 소량정보(13-20자), EAN, UPC, Code128. 2차원: 면적 활용, 대용량(수천자), QR코드, DataMatrix. 2차원은 URL, 이미지 등 다양한 정보 저장 가능.' },
    { id: 22, topic: '바코드와 RFID', q: 'EAN-13 바코드의 구조를 설명하시오.', a: 'EAN-13은 13자리로 구성: ①국가코드(3자리, 한국880) ②제조업체코드(4-6자리) ③상품코드(3-5자리) ④검증숫자(1자리). 전 세계 표준으로 상품 식별에 사용. GS1에서 관리.' },
    { id: 23, topic: '바코드와 RFID', q: 'QR코드의 특징과 활용사례를 설명하시오.', a: '특징: ①대용량(7,089자) ②전방향 스캔 ③오류복원 기능 ④모바일 친화적. 활용: 결제(카카오페이), 제품정보, 마케팅(URL), 출입관리, 메뉴판, 본인인증. 코로나로 비대면 활용 급증.' },
    { id: 24, topic: '바코드와 RFID', q: 'RFID(Radio Frequency Identification)의 원리와 구성을 설명하시오.', a: '무선주파수로 태그 정보를 인식하는 기술입니다. 구성: ①태그(칩+안테나) ②리더기 ③안테나 ④미들웨어 ⑤호스트시스템. 비접촉, 다수 동시인식, 원거리 인식 가능.' },
    { id: 25, topic: '바코드와 RFID', q: 'RFID와 바코드의 장단점을 비교하시오.', a: 'RFID 장점: 비접촉, 다중인식, 정보수정, 내구성, 자동화. 단점: 비용, 금속·액체 간섭, 프라이버시. 바코드: 저비용, 보편화, 시선 필요, 단일인식. 용도에 따라 선택적 사용.' },
    { id: 26, topic: '바코드와 RFID', q: 'RFID 태그의 종류(수동형, 능동형)를 설명하시오.', a: '수동형(Passive): 배터리 없음, 리더기 전파로 동작, 저렴, 짧은 인식거리(수m). 능동형(Active): 자체 배터리, 긴 인식거리(수십m), 고가, 컨테이너·자산관리. 반수동형도 존재.' },
    { id: 27, topic: '바코드와 RFID', q: 'RFID의 유통물류 적용사례를 설명하시오.', a: '①입출고관리: 자동인식, 검수 ②재고실사: 실시간 파악 ③도난방지: EAS태그 ④이력추적: 식품, 의약품 ⑤반품관리: 리버스 물류 ⑥컨테이너관리. 효율화와 정확성 향상.' },
    { id: 28, topic: '바코드와 RFID', q: 'EPC(Electronic Product Code)의 개념을 설명하시오.', a: 'EPC는 RFID용 전자상품코드로, 개별상품을 고유하게 식별합니다. 바코드가 상품종류를 식별한다면, EPC는 개별상품(시리얼번호)까지 식별. 위조방지, 이력추적에 효과적. EPCglobal에서 표준화.' },
    { id: 29, topic: '바코드와 RFID', q: 'NFC(Near Field Communication)의 특징과 활용을 설명하시오.', a: 'NFC는 10cm 이내 근거리 무선통신 기술입니다. 특징: 양방향 통신, 보안성, 스마트폰 내장. 활용: ①모바일결제(삼성페이) ②교통카드 ③출입관리 ④스마트태그 ⑤기기간 데이터 전송.' },
    { id: 30, topic: '바코드와 RFID', q: 'IoT와 RFID의 연계 활용을 설명하시오.', a: 'IoT(사물인터넷)에서 RFID는 사물 식별의 핵심입니다. 연계: ①스마트 선반(자동재고) ②스마트 물류(실시간 추적) ③스마트 매장(무인결제) ④콜드체인(온도+위치). 데이터 수집→분석→자동화 구현.' },

    // CRM과 빅데이터 (31-40)
    { id: 31, topic: 'CRM과 빅데이터', q: 'CRM(Customer Relationship Management)의 정의와 목적을 설명하시오.', a: 'CRM은 고객정보를 통합관리하여 관계를 강화하는 경영전략입니다. 목적: ①고객이해 ②맞춤서비스 ③고객유지 ④교차판매 ⑤고객생애가치(CLV) 극대화. 신규고객 유치보다 기존고객 유지가 비용효율적.' },
    { id: 32, topic: 'CRM과 빅데이터', q: 'CRM 시스템의 구성요소를 설명하시오.', a: '①운영CRM: 영업·마케팅·서비스 자동화 ②분석CRM: 고객데이터 분석, 세분화 ③협업CRM: 콜센터, 웹, 이메일 채널 통합. 데이터웨어하우스, 데이터마이닝 기술 활용. 고객접점 통합관리.' },
    { id: 33, topic: 'CRM과 빅데이터', q: 'RFM 분석의 개념과 활용을 설명하시오.', a: 'RFM: ①Recency(최근성): 최근 구매일 ②Frequency(빈도): 구매횟수 ③Monetary(금액): 구매금액. 각 지표를 점수화하여 고객 세분화. 우수고객(VIP), 이탈위험 고객 식별. 마케팅 자원 효율적 배분.' },
    { id: 34, topic: 'CRM과 빅데이터', q: '고객생애가치(CLV)의 개념과 계산을 설명하시오.', a: 'CLV는 고객이 평생 가져다줄 순이익의 현재가치입니다. 계산: CLV = (평균구매금액 × 마진율 × 구매빈도 × 고객수명) - 획득비용. CLV가 높은 고객에 집중투자. 장기적 관점의 고객관리 근거.' },
    { id: 35, topic: 'CRM과 빅데이터', q: '로열티 프로그램의 유형과 효과를 설명하시오.', a: '유형: ①포인트적립 ②멤버십등급 ③할인혜택 ④무료상품 ⑤특별서비스. 효과: ①재구매 촉진 ②이탈방지 ③고객정보 수집 ④차별화. 과도한 할인은 수익성 저해, 감성적 로열티 병행 필요.' },
    { id: 36, topic: 'CRM과 빅데이터', q: '빅데이터의 3V 특성을 설명하시오.', a: '빅데이터 3V: ①Volume(규모): 대용량 데이터 ②Velocity(속도): 실시간 생성·처리 ③Variety(다양성): 정형+비정형 데이터. 추가로 Veracity(정확성), Value(가치)도 중요. 기존 도구로 처리 어려운 데이터.' },
    { id: 37, topic: 'CRM과 빅데이터', q: '유통업에서 빅데이터 활용사례를 설명하시오.', a: '①수요예측: 날씨, 이벤트, 과거데이터 ②개인화추천: 구매이력 기반 ③가격최적화: 실시간 가격조정 ④매장분석: 동선, 체류시간 ⑤재고최적화 ⑥이상탐지: 사기방지. 데이터 기반 의사결정.' },
    { id: 38, topic: 'CRM과 빅데이터', q: '데이터마이닝의 기법을 설명하시오.', a: '①연관규칙: 장바구니분석(함께 구매 상품) ②군집분석: 고객세분화 ③분류: 고객등급 예측 ④예측: 수요, 이탈 예측 ⑤순차패턴: 구매순서 분석. 대용량 데이터에서 패턴과 규칙 발견.' },
    { id: 39, topic: 'CRM과 빅데이터', q: '개인정보보호와 데이터 활용의 균형을 설명하시오.', a: '개인정보보호법 준수 필수: ①수집동의 ②목적 내 이용 ③안전조치 ④파기의무. 균형방안: 가명처리, 비식별화, 옵트인/옵트아웃, 투명한 정책. 고객신뢰가 데이터 활용의 전제.' },
    { id: 40, topic: 'CRM과 빅데이터', q: 'AI(인공지능)의 유통업 적용사례를 설명하시오.', a: '①챗봇: 고객상담 자동화 ②추천시스템: 개인화 상품추천 ③수요예측: 머신러닝 기반 ④비전AI: 무인매장 결제 ⑤물류최적화: 배송경로, 재고배치 ⑥가격결정: 동적 프라이싱.' },

    // 옴니채널과 디지털 트랜스포메이션 (41-50)
    { id: 41, topic: '옴니채널과 디지털 전환', q: '옴니채널(Omni-Channel)의 개념과 특징을 설명하시오.', a: '옴니채널은 온·오프라인 모든 채널을 통합하여 일관된 고객경험을 제공하는 것입니다. 특징: ①채널간 정보통합 ②끊김없는 경험 ③재고통합 ④교차서비스(웹주문-매장픽업). 멀티채널의 진화.' },
    { id: 42, topic: '옴니채널과 디지털 전환', q: 'O2O(Online to Offline) 서비스의 유형을 설명하시오.', a: '①온라인쿠폰→오프라인사용 ②온라인예약→매장방문 ③BOPIS(Buy Online Pick-up In Store) ④위치기반 마케팅 ⑤QR코드 체크인. 온·오프라인 장점 결합, 고객편의 극대화.' },
    { id: 43, topic: '옴니채널과 디지털 전환', q: '라이브커머스의 특징과 성공요인을 설명하시오.', a: '특징: 실시간 영상+즉시구매, 쌍방향 소통, 인플루언서 활용. 성공요인: ①매력적 진행자 ②실시간 반응 ③한정혜택 ④간편결제 ⑤제품시연. 콘텐츠와 커머스 결합 트렌드.' },
    { id: 44, topic: '옴니채널과 디지털 전환', q: '무인매장(Amazon Go 등)의 기술과 운영방식을 설명하시오.', a: '기술: ①컴퓨터비전 ②딥러닝 ③센서퓨전 ④RFID. 운영: 앱체크인→상품선택→자동결제. 효과: 무인운영, 계산대기 제거, 데이터수집. 과제: 도입비용, 기술정확성, 복잡상품.' },
    { id: 45, topic: '옴니채널과 디지털 전환', q: '디지털 트랜스포메이션(DX)의 개념과 유통업 적용을 설명하시오.', a: 'DX는 디지털 기술로 비즈니스 모델·프로세스를 혁신하는 것입니다. 유통적용: ①고객경험 디지털화 ②운영효율화(자동화) ③데이터기반 의사결정 ④새로운 비즈니스모델(구독, 플랫폼). 생존을 위한 필수 전략.' },
    { id: 46, topic: '옴니채널과 디지털 전환', q: '클라우드 컴퓨팅의 유통업 활용을 설명하시오.', a: '활용: ①POS시스템 클라우드화 ②데이터 통합저장 ③ERP/CRM SaaS ④탄력적 자원활용(시즌대응). 장점: 초기투자 절감, 유연성, 접근성, 보안. 중소유통업 IT도입 장벽 완화.' },
    { id: 47, topic: '옴니채널과 디지털 전환', q: '스마트스토어/스마트매장의 기술요소를 설명하시오.', a: '기술요소: ①디지털사이니지 ②스마트선반(재고감지) ③비콘(위치기반서비스) ④AR/VR(가상체험) ⑤모바일결제 ⑥안면인식. 오프라인매장에 디지털 기술 접목하여 고객경험 혁신.' },
    { id: 48, topic: '옴니채널과 디지털 전환', q: '플랫폼 비즈니스의 특성과 유통업 영향을 설명하시오.', a: '특성: ①양면시장(판매자-구매자) ②네트워크효과 ③데이터 축적. 유통영향: 쿠팡·네이버 등 플랫폼 부상, 전통유통 위협, 입점수수료 이슈. 대응: 자체플랫폼, 차별화, D2C 강화.' },
    { id: 49, topic: '옴니채널과 디지털 전환', q: 'D2C(Direct to Consumer)전략의 특징을 설명하시오.', a: '제조사가 유통채널 없이 소비자에게 직접 판매하는 방식입니다. 특징: ①자사몰·SNS 활용 ②고객데이터 직접확보 ③마진개선 ④브랜드통제. 사례: 나이키, 애플. 옴니채널과 병행 전략.' },
    { id: 50, topic: '옴니채널과 디지털 전환', q: '유통정보시스템의 발전방향을 설명하시오.', a: '발전방향: ①AI기반 자동화·예측 ②실시간 데이터처리 ③옴니채널 통합 ④클라우드·모바일 ⑤보안강화 ⑥친환경(그린IT). 기술혁신에 따라 지속적 업그레이드 필요. 기술과 사람의 균형.' },
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
          <h1 className="text-3xl font-black mb-4">💻 유통정보</h1>
          <p className="text-teal-100">POS시스템, 유통정보화, EDI를 학습합니다.</p>
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
