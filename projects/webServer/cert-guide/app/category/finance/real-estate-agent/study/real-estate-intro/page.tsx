'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'concept',
    name: '부동산의 개념과 특성',
    color: 'from-teal-500 to-teal-400',
    questions: [
      { id: 1, question: '부동산의 법률적 정의와 경제적 정의의 차이를 설명하시오.', answer: '법률적: 토지와 그 정착물, 경제적: 토지와 건물 및 그에 부수하는 권리', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산의 법률적 정의와 경제적 정의의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '토지의 자연적 특성 4가지를 쓰시오.', answer: '부동성, 영속성, 부증성, 개별성', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 토지의 자연적 특성 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: '토지의 인문적 특성 4가지를 쓰시오.', answer: '용도의 다양성, 병합·분할 가능성, 사회적·경제적·행정적 위치 가변성', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 토지의 인문적 특성 4가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: '부동산의 부동성(위치의 고정성)이 가져오는 경제적 효과를 설명하시오.', answer: '지역시장 형성, 임장활동 필요, 입지 중요성, 지역분석 필요', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산의 부동성(위치의 고정성)이 가져오는 경제적 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: '건물의 특성과 토지 특성의 차이점을 비교하여 설명하시오.', answer: '건물: 비영속성, 증가성, 가동성(해체 이동 가능) / 토지: 영속성, 부증성, 부동성', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 건물의 특성과 토지 특성의 차이점을 비교하여 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'economics',
    name: '부동산 경제론',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: '부동산 수요의 결정요인 5가지를 쓰시오.', answer: '가격, 소득, 인구, 대체재 가격, 금리, 기대심리', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 수요의 결정요인 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '부동산 수요의 가격탄력성을 설명하고 탄력적/비탄력적 경우를 구분하시오.', answer: '수요량 변화율/가격 변화율, 탄력성>1 탄력적, <1 비탄력적', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 수요의 가격탄력성을 설명하고 탄력적/비탄력적 경우를 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: '부동산 공급의 특성과 공급 탄력성이 낮은 이유를 설명하시오.', answer: '건설기간 소요, 토지의 부증성, 법적 규제로 단기 공급 비탄력적', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 공급의 특성과 공급 탄력성이 낮은 이유를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: '부동산 시장의 특성 5가지를 쓰시오.', answer: '불완전경쟁시장, 지역시장, 비조직적 시장, 비공개시장, 수급조절 곤란', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 시장의 특성 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: '부동산 경기변동의 순환과정(4단계)을 설명하시오.', answer: '회복기 → 호황기 → 후퇴기 → 불황기', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 경기변동의 순환과정(4단계)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'market-analysis',
    name: '부동산 시장분석',
    color: 'from-teal-600 to-teal-500',
    questions: [
      { id: 1, question: '부동산 시장세분화의 기준과 목적을 설명하시오.', answer: '용도별, 지역별, 가격대별 세분화로 효율적 시장분석 가능', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 시장세분화의 기준과 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '부동산 시장분석의 절차(5단계)를 순서대로 쓰시오.', answer: '목적설정 → 자료수집 → 수요분석 → 공급분석 → 시장예측', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 시장분석의 절차(5단계)를 순서대로 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: '흡수율(Absorption Rate) 분석의 개념과 활용을 설명하시오.', answer: '일정 기간 시장에서 흡수되는 부동산 수량, 분양시기 결정에 활용', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 흡수율(Absorption Rate) 분석의 개념과 활용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: '공실률과 자연공실률의 개념과 차이를 설명하시오.', answer: '공실률: 실제 비어있는 비율, 자연공실률: 시장균형 상태의 정상 공실률', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 공실률과 자연공실률의 개념과 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: '여과과정(Filtering)과 젠트리피케이션(Gentrification)을 설명하시오.', answer: '여과: 노후화로 저소득층 이동, 젠트리피케이션: 재개발로 고소득층 유입', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 여과과정(Filtering)과 젠트리피케이션(Gentrification)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'investment',
    name: '부동산 투자론',
    color: 'from-cyan-600 to-cyan-500',
    questions: [
      { id: 1, question: '부동산 투자의 장점과 단점을 각각 3가지씩 쓰시오.', answer: '장점: 인플레이션 헤지, 레버리지 효과, 절세효과 / 단점: 유동성 낮음, 관리비용, 거래비용 높음', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 투자의 장점과 단점을 각각 3가지씩 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '레버리지 효과(Leverage Effect)를 설명하고 정(+)·부(-) 레버리지를 구분하시오.', answer: '차입자본 이용 수익률 증대, 투자수익률>차입이자율: 정의 레버리지', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 레버리지 효과(Leverage Effect)를 설명하고 정(+)·부(-) 레버리지를 구분하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: 'NOI(순영업소득)와 NCF(순현금흐름)의 계산방법을 쓰시오.', answer: 'NOI = 유효총소득 - 운영경비, NCF = NOI - 부채서비스액', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: NOI(순영업소득)와 NCF(순현금흐름)의 계산방법을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: 'NPV(순현재가치)법과 IRR(내부수익률)법을 비교 설명하시오.', answer: 'NPV: 현금흐름 현재가치 - 투자액, IRR: NPV=0이 되는 할인율', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: NPV(순현재가치)법과 IRR(내부수익률)법을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: '부동산 투자위험의 종류(체계적·비체계적 위험)를 설명하시오.', answer: '체계적: 시장 전체 위험(분산 불가), 비체계적: 개별 부동산 위험(분산 가능)', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 투자위험의 종류(체계적·비체계적 위험)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'finance',
    name: '부동산 금융론',
    color: 'from-teal-500 to-cyan-400',
    questions: [
      { id: 1, question: 'LTV(담보인정비율)와 DTI(총부채상환비율)의 개념과 계산식을 쓰시오.', answer: 'LTV = 대출금/담보가치, DTI = 연간 원리금상환액/연소득', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: LTV(담보인정비율)와 DTI(총부채상환비율)의 개념과 계산식을 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '저당대출의 상환방식(원리금균등, 원금균등, 체증식)을 비교 설명하시오.', answer: '원리금균등: 매기 동일, 원금균등: 원금 동일 이자 감소, 체증식: 상환액 증가', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 저당대출의 상환방식(원리금균등, 원금균등, 체증식)을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: 'DSR(총부채원리금상환비율)의 개념과 DTI와의 차이를 설명하시오.', answer: 'DSR = 모든 대출 원리금/연소득, DTI보다 포괄적 규제', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: DSR(총부채원리금상환비율)의 개념과 DTI와의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: 'MBS(주택저당증권)와 부동산 증권화의 개념을 설명하시오.', answer: '주택담보대출채권을 유동화하여 증권으로 발행, 자금조달 수단', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: MBS(주택저당증권)와 부동산 증권화의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: 'REITs(부동산투자회사)의 종류와 특징을 설명하시오.', answer: '자기관리형, 위탁관리형, 기업구조조정형 / 소액투자, 배당수익', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: REITs(부동산투자회사)의 종류와 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'policy',
    name: '부동산 정책론',
    color: 'from-cyan-500 to-teal-400',
    questions: [
      { id: 1, question: '부동산 정책의 필요성(시장실패 원인)을 설명하시오.', answer: '외부효과, 공공재적 성격, 정보비대칭, 불완전경쟁', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 정책의 필요성(시장실패 원인)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '토지정책의 유형(토지이용규제, 토지세제, 토지거래규제)을 설명하시오.', answer: '이용규제: 용도지역제, 세제: 보유세·양도세, 거래규제: 허가제·신고제', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 토지정책의 유형(토지이용규제, 토지세제, 토지거래규제)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: '주택정책의 유형(공급정책, 수요정책, 가격정책)을 설명하시오.', answer: '공급: 공공주택 건설, 수요: 금융지원, 가격: 분양가상한제·전월세상한제', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 주택정책의 유형(공급정책, 수요정책, 가격정책)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: '임대료 규제(상한제)의 효과와 부작용을 설명하시오.', answer: '단기: 임차인 보호, 장기: 공급감소, 암시장 형성, 주거수준 저하', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 임대료 규제(상한제)의 효과와 부작용을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: '개발이익환수제도의 종류와 목적을 설명하시오.', answer: '개발부담금, 기반시설부담금, 재건축부담금 / 불로소득 환수, 형평성 제고', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 개발이익환수제도의 종류와 목적을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'price',
    name: '부동산 가격론',
    color: 'from-teal-600 to-cyan-500',
    questions: [
      { id: 1, question: '부동산 가격의 3면성(효용, 상대적 희소성, 유효수요)을 설명하시오.', answer: '가격 성립 3요소: 효용(유용성), 희소성(공급한정), 유효수요(구매력)', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 가격의 3면성(효용, 상대적 희소성, 유효수요)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '지대이론 중 차액지대론과 위치지대론을 설명하시오.', answer: '차액지대: 비옥도 차이(리카도), 위치지대: 시장 접근성(튀넨)', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 지대이론 중 차액지대론과 위치지대론을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: '부동산 가격형성요인(일반요인, 지역요인, 개별요인)을 설명하시오.', answer: '일반: 경제·사회적, 지역: 해당지역 특성, 개별: 개별부동산 특성', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 가격형성요인(일반요인, 지역요인, 개별요인)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: '지가의 특성과 지가변동의 원인을 설명하시오.', answer: '토지 고유가격, 시장참여자 기대, 용도변경, 개발행위가 지가 변동 유발', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 지가의 특성과 지가변동의 원인을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: '부동산 가격의 제원칙(수요공급, 변동, 대체, 최유효이용)을 설명하시오.', answer: '수요공급: 가격결정, 변동: 가격변화, 대체: 유사부동산 비교, 최유효이용: 최적 용도', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 가격의 제원칙(수요공급, 변동, 대체, 최유효이용)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'appraisal',
    name: '감정평가 기초',
    color: 'from-cyan-600 to-teal-500',
    questions: [
      { id: 1, question: '감정평가 3방식(비교방식, 원가방식, 수익방식)의 개념을 설명하시오.', answer: '비교: 유사거래 비교, 원가: 재조달원가 기준, 수익: 미래수익 현재가치', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 감정평가 3방식(비교방식, 원가방식, 수익방식)의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '거래사례비교법의 적용절차와 사정보정을 설명하시오.', answer: '사례수집 → 사정보정 → 시점수정 → 지역·개별요인 비교 → 가격결정', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 거래사례비교법의 적용절차와 사정보정을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: '원가법의 재조달원가와 감가수정의 개념을 설명하시오.', answer: '재조달원가: 신축비용, 감가수정: 물리적·기능적·경제적 감가 반영', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 원가법의 재조달원가와 감가수정의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: '수익환원법의 순수익과 환원이율의 개념을 설명하시오.', answer: '순수익: 총수익-총비용, 환원이율: 순수익을 가격으로 환원하는 율', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 수익환원법의 순수익과 환원이율의 개념을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: 'DCF(현금흐름할인법)의 개념과 적용방법을 설명하시오.', answer: '미래 현금흐름을 할인율로 현재가치화, NPV = ΣCF/(1+r)^n', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: DCF(현금흐름할인법)의 개념과 적용방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'development',
    name: '부동산 개발론',
    color: 'from-teal-500 to-teal-400',
    questions: [
      { id: 1, question: '부동산 개발사업의 유형과 참여자를 설명하시오.', answer: '분양형/임대형, 단독/공동개발 / 시행사, 시공사, 금융기관, 분양대행사', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 개발사업의 유형과 참여자를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '타당성분석의 종류(시장성, 경제성, 재무성)를 설명하시오.', answer: '시장성: 수요분석, 경제성: 사회적 비용편익, 재무성: 투자수익성', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 타당성분석의 종류(시장성, 경제성, 재무성)를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: '민간투자사업(BOT, BTO, BTL)의 개념을 비교 설명하시오.', answer: 'BOT: 건설-운영-양도, BTO: 건설-양도-운영, BTL: 건설-양도-임대', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 민간투자사업(BOT, BTO, BTL)의 개념을 비교 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: '프로젝트 파이낸싱(PF)의 개념과 특징을 설명하시오.', answer: '사업 현금흐름을 담보로 자금조달, 비소구금융, SPV 설립', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 프로젝트 파이낸싱(PF)의 개념과 특징을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: '부동산 개발사업의 위험요인과 관리방안을 설명하시오.', answer: '시장위험, 금융위험, 공사위험, 법적위험 / 분산투자, 보험, 사전조사', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 개발사업의 위험요인과 관리방안을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
  {
    id: 'marketing',
    name: '부동산 마케팅',
    color: 'from-cyan-500 to-cyan-400',
    questions: [
      { id: 1, question: '부동산 마케팅의 4P 전략을 설명하시오.', answer: 'Product(상품), Price(가격), Place(유통), Promotion(촉진)', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 마케팅의 4P 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 2, question: '부동산 분양마케팅의 절차와 전략을 설명하시오.', answer: '시장조사 → 상품기획 → 가격결정 → 광고·홍보 → 분양 → 사후관리', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 분양마케팅의 절차와 전략을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 3, question: 'STP 전략(세분화, 표적화, 포지셔닝)을 설명하시오.', answer: 'Segmentation: 시장세분화, Targeting: 목표시장 선정, Positioning: 차별화 위치', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: STP 전략(세분화, 표적화, 포지셔닝)을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 4, question: '모델하우스와 분양홍보의 역할과 효과를 설명하시오.', answer: '실물 체험 기회, 구매 결정 촉진, 브랜드 이미지 구축', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 모델하우스와 분양홍보의 역할과 효과를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
      { id: 5, question: '부동산 브랜드 마케팅의 중요성과 사례를 설명하시오.', answer: '차별화, 신뢰성 구축, 프리미엄 형성 / 자이, 래미안, 힐스테이트 등', prompt: `공인중개사 부동산학개론 문제입니다.\n\n문제: 부동산 브랜드 마케팅의 중요성과 사례를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 상세 설명\n3. 관련 이론\n4. 계산 예시(해당시)\n5. 기출 유형` },
    ],
  },
];

export default function RealEstateIntroPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['concept']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('realtor-intro-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('realtor-intro-progress', JSON.stringify(completedQuestions));
  }, [completedQuestions]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId) ? prev.filter(id => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleQuestion = (topicId: string, questionId: number) => {
    setCompletedQuestions(prev => {
      const topicCompleted = prev[topicId] || [];
      const newCompleted = topicCompleted.includes(questionId)
        ? topicCompleted.filter(id => id !== questionId)
        : [...topicCompleted, questionId];
      return { ...prev, [topicId]: newCompleted };
    });
  };

  const getTopicProgress = (topicId: string, total: number) => {
    const completed = completedQuestions[topicId]?.length || 0;
    return Math.round((completed / total) * 100);
  };

  const getTotalProgress = () => {
    const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
    const totalCompleted = Object.values(completedQuestions).reduce((acc, arr) => acc + arr.length, 0);
    return Math.round((totalCompleted / totalQuestions) * 100);
  };

  const openAIModal = (prompt: string) => {
    setCurrentPrompt(prompt);
    setShowAIModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-teal-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/finance" className="text-gray-600 hover:text-teal-600">금융</a>
            <span className="text-gray-300">›</span>
            <a href="/category/finance/real-estate-agent" className="text-gray-600 hover:text-teal-600">공인중개사</a>
            <span className="text-gray-300">›</span>
            <span className="text-teal-600 font-medium">부동산학개론</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🏘️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">부동산학개론</h1>
              <p className="text-teal-100">공인중개사 1차 - 부동산 기초이론, 경제, 투자, 금융</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-teal-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Topics */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className={`w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r ${topic.color} text-white`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{topic.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    {topic.questions.length}문항
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: `${getTopicProgress(topic.id, topic.questions.length)}%` }}
                    />
                  </div>
                  <span className="text-sm">{getTopicProgress(topic.id, topic.questions.length)}%</span>
                  <span className={`transform transition ${expandedTopics.includes(topic.id) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expandedTopics.includes(topic.id) && (
                <div className="p-4 space-y-3">
                  {topic.questions.map((q) => (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg border ${
                        completedQuestions[topic.id]?.includes(q.id)
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleQuestion(topic.id, q.id)}
                          className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                            completedQuestions[topic.id]?.includes(q.id)
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {completedQuestions[topic.id]?.includes(q.id) && '✓'}
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            <span className="text-teal-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-teal-100 text-teal-600 rounded-lg text-sm hover:bg-teal-200 transition"
                        >
                          🤖 AI
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* AI Modal */}
      {showLoginModal && <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}

      {showAIModal && (<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl max-w-md w-full"><div className="p-6"><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🤖 AI 선택</h3><button onClick={() => setShowAIModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">✕</button></div><p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p><div className="space-y-3"><a href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"><span className="text-2xl">🧡</span><div><p className="font-bold text-orange-700">Claude</p><p className="text-xs text-orange-600">Anthropic AI</p></div></a><a href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"><span className="text-2xl">💚</span><div><p className="font-bold text-green-700">ChatGPT</p><p className="text-xs text-green-600">OpenAI</p></div></a><a href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"><span className="text-2xl">💙</span><div><p className="font-bold text-blue-700">Gemini</p><p className="text-xs text-blue-600">Google AI</p></div></a></div><button onClick={() => { navigator.clipboard.writeText(currentPrompt); alert('프롬프트가 복사되었습니다!'); }} className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition">📋 프롬프트 복사하기</button></div></div></div>)}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
