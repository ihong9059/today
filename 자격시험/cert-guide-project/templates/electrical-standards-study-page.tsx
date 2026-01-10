'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'general',
    name: '총칙 및 용어',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 1,
        question: '저압, 고압, 특고압의 전압 구분 기준을 설명하시오.',
        answer: '저압: DC 1500V 이하/AC 1000V 이하, 고압: DC 1500~7000V/AC 1000~7000V, 특고압: 7000V 초과',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 저압, 고압, 특고압의 전압 구분 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 저압의 정의 (직류/교류)
2. 고압의 정의 (직류/교류)
3. 특고압의 정의
4. KEC 기준 변경사항
5. 실제 적용 예

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '전로란 무엇이며, 전로의 절연저항 기준을 설명하시오.',
        answer: '전로: 전기가 흐르는 통로. 절연저항: 저압 0.1MΩ 이상, 고압 1MΩ 이상',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 전로의 정의와 절연저항 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 전로의 정의
2. 저압전로 절연저항 기준
3. 고압전로 절연저항 기준
4. 측정 방법
5. 절연저항 저하시 조치

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '과전류차단기의 정의와 설치 목적을 설명하시오.',
        answer: '정격전류 초과시 자동 차단하는 장치. 목적: 과부하/단락 보호, 전선 소손 방지',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 과전류차단기의 정의와 설치 목적을 설명하시오.

다음 순서로 설명해주세요:
1. 과전류차단기 정의
2. 과부하 보호 원리
3. 단락 보호 원리
4. 설치 위치
5. 차단기 종류

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '접지의 정의와 접지의 목적 3가지를 설명하시오.',
        answer: '접지: 전기기기를 대지와 전기적으로 연결. 목적: 감전방지, 기기보호, 보호장치 동작확보',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 접지의 정의와 목적을 설명하시오.

다음 순서로 설명해주세요:
1. 접지의 정의
2. 감전 방지 원리
3. 기기 보호 원리
4. 보호장치 동작 확보
5. 접지 종류

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '누전차단기(ELB)의 동작원리와 정격감도전류를 설명하시오.',
        answer: '영상변류기로 누설전류 검출하여 차단. 정격감도전류: 15mA, 30mA 등',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 누전차단기의 동작원리와 정격감도전류를 설명하시오.

다음 순서로 설명해주세요:
1. 누전차단기 구조
2. 영상변류기 원리
3. 동작 원리
4. 정격감도전류 종류
5. 동작시간 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '정전작업의 절차를 순서대로 설명하시오.',
        answer: '정전→검전→접지→표지판→작업→접지해제→송전',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 정전작업의 절차를 설명하시오.

다음 순서로 설명해주세요:
1. 정전 확인
2. 검전 실시
3. 단락접지 실시
4. 표지판 설치
5. 작업 및 복구 절차

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '전기용품안전인증 대상과 마크에 대해 설명하시오.',
        answer: 'KC마크, 안전인증(S), 안전확인(K), 공급자적합성확인(E)',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 전기용품안전인증과 마크를 설명하시오.

다음 순서로 설명해주세요:
1. 안전인증(S마크) 대상
2. 안전확인(K마크) 대상
3. 공급자적합성확인(E마크)
4. KC마크의 의미
5. 인증 절차

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '충전부의 이격거리 기준을 전압별로 설명하시오.',
        answer: '저압: 45cm 이상, 고압: 60cm 이상, 특고압: 전압에 따라 증가',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 충전부의 이격거리 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 저압 이격거리
2. 고압 이격거리
3. 특고압 이격거리 계산
4. 이격거리 확보 목적
5. 예외 규정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '전기사업법상 자가용전기설비의 정의를 설명하시오.',
        answer: '전기사업에 사용하지 않는 10kW 초과 발전설비 또는 수전설비',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 자가용전기설비의 정의를 설명하시오.

다음 순서로 설명해주세요:
1. 자가용전기설비 정의
2. 일반용전기설비와의 차이
3. 전기안전관리자 선임 기준
4. 점검 의무
5. 사용전검사 대상

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '전기설비 절연내력시험 전압 기준을 설명하시오.',
        answer: '최대사용전압의 1.5배(저압), 최대사용전압의 1.25배×10분(고압 이상)',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 절연내력시험 전압 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 절연내력시험 목적
2. 저압 시험전압
3. 고압 시험전압
4. 특고압 시험전압
5. 시험 시간 및 방법

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'wiring',
    name: '전선 및 전로',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '전선의 허용전류에 영향을 주는 요소를 설명하시오.',
        answer: '전선 굵기, 절연물 종류, 주위온도, 시설방법(관로/케이블)',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 전선의 허용전류에 영향을 주는 요소를 설명하시오.

다음 순서로 설명해주세요:
1. 전선 굵기와 허용전류
2. 절연물 종류의 영향
3. 주위온도 보정
4. 시설방법별 허용전류
5. 전류감소계수

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '케이블 트레이 시설 기준을 설명하시오.',
        answer: '불연성 재료, 적재율 50% 이하(제어케이블), 접지, 방화구획 관통부 밀봉',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 케이블 트레이 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 재료 요건
2. 케이블 적재율
3. 접지 요건
4. 방화구획 관통
5. 지지점 간격

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '가공전선로의 지지물 간격(경간) 기준을 설명하시오.',
        answer: '저압: 50m 이하, 고압: 150m 이하, 특고압: 400m 이하',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 가공전선로의 경간 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 경간의 정의
2. 저압 경간 기준
3. 고압 경간 기준
4. 특고압 경간 기준
5. 경간 결정 요소

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '금속관 공사의 시설 기준을 설명하시오.',
        answer: '관 내경의 1.2배 이상 굴곡반경, 박스 연결, 접지, D종접지공사',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 금속관 공사의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 금속관 규격
2. 굴곡반경 기준
3. 박스 연결 요건
4. 접지 요건
5. 전선 점유율

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '합성수지관(PVC관) 공사의 시설 기준을 설명하시오.',
        answer: '관 내경의 6배 이상 굴곡반경, 지지점 간격 1.5m 이하, 온도 특성',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 합성수지관 공사의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 합성수지관 종류
2. 굴곡반경 기준
3. 지지점 간격
4. 온도에 따른 주의사항
5. 접속부 처리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '전선관 내 전선 점유율 규정을 설명하시오.',
        answer: '전선 총 단면적이 관 내단면적의 32%(3본 이상), 48%(2본 이하)이하',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 전선관 내 전선 점유율 규정을 설명하시오.

다음 순서로 설명해주세요:
1. 점유율의 정의
2. 전선 본수별 기준
3. 점유율 계산 방법
4. 점유율 제한 이유
5. 예외 규정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '옥내배선의 분기회로 기준을 설명하시오.',
        answer: '15A/20A/30A/40A/50A 분기회로, 콘센트 개수 및 전선 굵기 기준',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 옥내배선의 분기회로 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 분기회로 종류
2. 각 분기회로별 전선 굵기
3. 콘센트 개수 제한
4. 과전류차단기 정격
5. 부하 용량 계산

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '지중전선로 매설 깊이 기준을 설명하시오.',
        answer: '중량물 압력 장소: 1.2m, 기타 장소: 0.6m (관로식/직매식)',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 지중전선로 매설 깊이 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 매설 깊이 기준
2. 직매식 시설 방법
3. 관로식 시설 방법
4. 표지시트 설치
5. 굴곡 반경

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '가공전선의 지표상 높이 기준을 설명하시오.',
        answer: '도로 횡단: 고압 6m, 철도 횡단: 6.5m, 기타 장소: 5m(저압)/6m(고압)',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 가공전선의 지표상 높이 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 저압선로 높이 기준
2. 고압선로 높이 기준
3. 특고압선로 높이 기준
4. 도로횡단 기준
5. 철도횡단 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '전선의 접속 방법과 기준을 설명하시오.',
        answer: '전선 인장강도 20% 이상 감소 금지, 접속부 절연처리, 슬리브 사용',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 전선의 접속 방법과 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 접속 기본 원칙
2. 인장강도 유지 기준
3. 저항 증가 방지
4. 절연처리 방법
5. 접속 재료 종류

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'installation',
    name: '전기사용장소 시설',
    color: 'from-yellow-500 to-orange-500',
    questions: [
      {
        id: 1,
        question: '욕실 등 물기 있는 장소의 전기설비 시설 기준을 설명하시오.',
        answer: '접지(D종), 누전차단기(30mA 이하), 방수형 기기, 콘센트 이격거리',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 물기 있는 장소의 전기설비 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 습기장소의 정의
2. 접지 요건
3. 누전차단기 기준
4. 콘센트 설치 위치
5. 조명기구 시설

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '위험물 저장소의 전기설비 시설 기준을 설명하시오.',
        answer: '방폭형 기기 사용, 내압방폭/압력방폭/안전증방폭 등',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 위험물 저장소의 전기설비 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 위험장소 분류 (0,1,2종)
2. 방폭구조 종류
3. 방폭기기 선정
4. 배선 방법
5. 접지 요건

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '분전반 시설 기준을 설명하시오.',
        answer: '불연성함, 조작면 1m 이상 공간, 접지, 누전차단기 및 차단기 설치',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 분전반 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 분전반 구조 요건
2. 설치 장소
3. 조작공간 확보
4. 차단기 배치
5. 접지 및 표시

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '비상조명 설비의 시설 기준을 설명하시오.',
        answer: '30분 이상 점등, 바닥면 1lx 이상, 비상전원 확보, 예비전원내장형',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 비상조명 설비의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 비상조명 설치 대상
2. 점등 시간 기준
3. 조도 기준
4. 전원 공급 방식
5. 점검 및 유지관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '전동기 회로의 과부하 보호 기준을 설명하시오.',
        answer: '열동계전기(정격전류의 125%), 과전류차단기, 기동전류 고려',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 전동기 회로의 과부하 보호 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 과부하 보호 장치 종류
2. 열동계전기 설정
3. 기동전류 특성
4. 차단기 정격 선정
5. 결상 보호

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '피뢰설비의 설치 기준을 설명하시오.',
        answer: '20m 초과 건축물, 수뢰부+인하도선+접지극, 접지저항 10Ω 이하',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 피뢰설비의 설치 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 피뢰설비 설치 대상
2. 수뢰부 시설
3. 인하도선 시설
4. 접지극 시설
5. 접지저항 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '의료장소의 전기설비 시설 기준을 설명하시오.',
        answer: 'IT계통 또는 의료용 절연변압기, 절연감시장치, 등전위본딩',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 의료장소의 전기설비 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 의료장소 분류 (그룹0,1,2)
2. 접지계통 선택
3. 의료용 절연변압기
4. 절연감시장치
5. 등전위본딩

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '수영장 시설의 전기설비 기준을 설명하시오.',
        answer: '구역 분류(0~2), 저압 30V 이하, SELV/PELV, 등전위본딩',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 수영장 시설의 전기설비 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 구역 분류 (0,1,2구역)
2. 각 구역별 허용 설비
3. 저전압 기준
4. 등전위본딩
5. 조명 시설

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '전기자동차 충전설비의 시설 기준을 설명하시오.',
        answer: '전용회로, 접지(D종), 누전차단기(30mA), 충전 모드(1~4)',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 전기자동차 충전설비의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 충전 모드 분류
2. 전원 공급 방식
3. 접지 요건
4. 보호장치
5. 설치 장소 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '에어컨 전용회로 설치 기준을 설명하시오.',
        answer: '전용 분기회로, 접지형 콘센트, 차단기 용량, 전선 굵기 계산',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 에어컨 전용회로 설치 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 전용회로 필요성
2. 차단기 용량 선정
3. 전선 굵기 계산
4. 콘센트 규격
5. 실외기 접지

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'grounding-protection',
    name: '접지 및 보호',
    color: 'from-red-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: 'KEC에 따른 접지시스템의 종류(TT, TN, IT)를 설명하시오.',
        answer: 'TT: 전원/기기 별도접지, TN: 공통접지, IT: 전원비접지',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: KEC에 따른 접지시스템의 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 접지시스템 명칭 의미
2. TT계통의 특성
3. TN계통의 특성 (TN-S, TN-C, TN-C-S)
4. IT계통의 특성
5. 각 계통의 적용

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '접지저항 측정방법을 설명하시오.',
        answer: '전압강하법(3점법), 보조극 간격 10m 이상, 접지저항계 사용',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 접지저항 측정방법을 설명하시오.

다음 순서로 설명해주세요:
1. 전압강하법 원리
2. 보조극 배치
3. 측정 절차
4. 접지저항계 사용법
5. 측정시 주의사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '접지극의 종류와 시설 기준을 설명하시오.',
        answer: '접지봉(동, 접지동), 접지판, 접지망, 매설깊이 75cm 이상',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 접지극의 종류와 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 접지봉 규격
2. 접지판 규격
3. 접지망 시설
4. 매설깊이 기준
5. 접지극 재료

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '등전위본딩의 목적과 시설 기준을 설명하시오.',
        answer: '전위차 제거로 감전방지. 주등전위본딩, 보조등전위본딩',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 등전위본딩의 목적과 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 등전위본딩 목적
2. 주등전위본딩
3. 보조등전위본딩
4. 본딩도체 규격
5. 본딩 대상

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '접지선 굵기 결정 기준을 설명하시오.',
        answer: '전로 도체 굵기의 1/2 이상(최소 2.5mm² 이상)',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 접지선 굵기 결정 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 접지선 굵기 기준
2. 최소 굵기 규정
3. 고장전류 고려
4. 접지선 재료
5. 접지선 색상 식별

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '보호도체(PE)와 중성선(N)의 역할과 차이를 설명하시오.',
        answer: 'PE: 보호접지용, N: 전류귀로, TN-C-S에서 분리점 이후 별도',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 보호도체와 중성선의 역할과 차이를 설명하시오.

다음 순서로 설명해주세요:
1. 보호도체(PE) 역할
2. 중성선(N) 역할
3. PEN 도체
4. 분리점 규정
5. 색상 식별

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '과전류 보호협조(Coordination)의 원리를 설명하시오.',
        answer: '상위차단기가 하위차단기보다 큰 정격, 선택차단',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 과전류 보호협조의 원리를 설명하시오.

다음 순서로 설명해주세요:
1. 보호협조의 목적
2. 차단기 정격 선정
3. 한시협조
4. 선택차단
5. 협조곡선

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '감전보호의 기본보호와 고장보호를 설명하시오.',
        answer: '기본보호: 충전부 직접접촉 방지, 고장보호: 노출도전부 접촉 방지',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 기본보호와 고장보호를 설명하시오.

다음 순서로 설명해주세요:
1. 기본보호(직접접촉보호)
2. 기본보호 방법
3. 고장보호(간접접촉보호)
4. 고장보호 방법
5. 추가보호

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '특별저전압(SELV, PELV)의 정의와 적용을 설명하시오.',
        answer: 'SELV: 50V AC/120V DC 이하, 접지불가. PELV: 접지가능',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 특별저전압(SELV, PELV)을 설명하시오.

다음 순서로 설명해주세요:
1. 특별저전압의 정의
2. SELV 특성
3. PELV 특성
4. 전원 공급 방식
5. 적용 장소

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '서지보호장치(SPD) 설치 기준을 설명하시오.',
        answer: 'Type 1, 2, 3 분류, 접지 필요, 과전류보호 협조',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 서지보호장치(SPD) 설치 기준을 설명하시오.

다음 순서로 설명해주세요:
1. SPD의 종류
2. Type별 특성
3. 설치 위치
4. 접지 연결
5. 과전류보호 협조

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'high-voltage',
    name: '고압/특고압 설비',
    color: 'from-purple-500 to-violet-500',
    questions: [
      {
        id: 1,
        question: '수전설비의 구성요소와 역할을 설명하시오.',
        answer: '인입구배선→DS→PF→MOF→VCB→변압기',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 수전설비의 구성요소와 역할을 설명하시오.

다음 순서로 설명해주세요:
1. 인입구배선
2. 단로기(DS)
3. 전력퓨즈(PF)
4. 계기용변성기(MOF)
5. 차단기(VCB)

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '변압기 보호장치의 종류와 역할을 설명하시오.',
        answer: '비율차동계전기, 부흐홀츠계전기, 온도계전기, 압력방출장치',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 변압기 보호장치의 종류와 역할을 설명하시오.

다음 순서로 설명해주세요:
1. 비율차동계전기
2. 부흐홀츠계전기
3. 온도계전기
4. 압력방출장치
5. 과전류계전기

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '고압 수전설비의 접지 기준을 설명하시오.',
        answer: '계통접지(변압기중성점), 기기접지, 피뢰기접지, 접지저항 기준',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 고압 수전설비의 접지 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 계통접지 목적
2. 기기접지 요건
3. 피뢰기 접지
4. 공용접지 허용조건
5. 접지저항 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: '특고압 수전설비의 보호협조를 설명하시오.',
        answer: 'PF-VCB 협조, 순시요소/한시요소, 보호협조도 작성',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 특고압 수전설비의 보호협조를 설명하시오.

다음 순서로 설명해주세요:
1. 보호협조 목적
2. PF 선정
3. VCB 계전기 정정
4. 한전측과의 협조
5. 보호협조도

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '큐비클식 고압수전설비의 시설 기준을 설명하시오.',
        answer: '불연성함, 환기구, 조작공간 1m, 인터록, 방충망',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 큐비클식 고압수전설비의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 큐비클 구조 요건
2. 환기 설비
3. 조작공간
4. 인터록 시설
5. 방충 대책

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '역률개선용 콘덴서의 설치 기준을 설명하시오.',
        answer: '방전장치 5초이내 50V, 직렬리액터 6%(제5고조파대책)',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 역률개선용 콘덴서의 설치 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 콘덴서 용량 계산
2. 방전장치
3. 직렬리액터
4. 보호장치
5. 설치 위치

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '고압 케이블의 시험 항목을 설명하시오.',
        answer: '절연저항시험, 내전압시험, 시스접지저항, 절연유가스분석',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 고압 케이블의 시험 항목을 설명하시오.

다음 순서로 설명해주세요:
1. 절연저항시험
2. 내전압시험
3. 차폐층 접지 확인
4. 절연유 분석 (OF케이블)
5. 부분방전시험

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: 'GIS(Gas Insulated Switchgear)의 특징과 시설 기준을 설명하시오.',
        answer: 'SF6 가스 절연, 소형화, 안전성, 가스압력 감시, 접지',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: GIS의 특징과 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. GIS 구조와 원리
2. SF6 가스 특성
3. 장점과 단점
4. 가스압력 관리
5. 접지 요건

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '변전소의 울타리와 출입구 시설 기준을 설명하시오.',
        answer: '높이 2m 이상, 시건장치, 위험표시, 출입금지',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 변전소의 울타리와 출입구 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 울타리 높이
2. 재료 규격
3. 시건장치
4. 위험표시
5. 출입관리

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '고압/특고압 충전부와의 이격거리 기준을 설명하시오.',
        answer: '고압: 1.2m, 특고압: 전압에 따라 증가, 울타리 설치시 0.8m',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 고압/특고압 충전부와의 이격거리 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 고압 이격거리
2. 특고압 이격거리 계산
3. 울타리 설치시
4. 작업시 이격거리
5. 예외 규정

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  },
  {
    id: 'distributed',
    name: '분산형 전원',
    color: 'from-teal-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: '분산형 전원의 정의와 종류를 설명하시오.',
        answer: '소규모 발전설비, 태양광, 풍력, 연료전지, ESS 등',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 분산형 전원의 정의와 종류를 설명하시오.

다음 순서로 설명해주세요:
1. 분산형 전원의 정의
2. 신재생에너지 종류
3. ESS의 역할
4. 소규모 발전설비
5. 계통연계 방식

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 2,
        question: '태양광발전설비의 시설 기준을 설명하시오.',
        answer: '직류부 접지, 인버터, 계통연계보호장치, 역전력보호',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 태양광발전설비의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 태양광 시스템 구성
2. 직류부 시설
3. 인버터 요건
4. 접지 시스템
5. 계통연계 보호

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 3,
        question: '계통연계 보호장치의 기능을 설명하시오.',
        answer: '과/저전압, 과/저주파수, 단독운전 검출, 역전력 보호',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 계통연계 보호장치의 기능을 설명하시오.

다음 순서로 설명해주세요:
1. 과전압/저전압 보호
2. 과주파수/저주파수 보호
3. 단독운전 검출
4. 역전력 보호
5. 보호 정정값

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 4,
        question: 'ESS(에너지저장시스템)의 시설 기준을 설명하시오.',
        answer: '배터리실 환기, 화재감지/소화설비, BMS, 접지, 이격거리',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: ESS의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. ESS 구성요소
2. 배터리실 환기
3. 화재 대책
4. BMS 기능
5. 접지 요건

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 5,
        question: '단독운전(Islanding)의 정의와 방지대책을 설명하시오.',
        answer: '계통분리시 발전기가 부하에 단독공급. 대책: 능동/수동적 검출',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 단독운전의 정의와 방지대책을 설명하시오.

다음 순서로 설명해주세요:
1. 단독운전의 정의
2. 단독운전의 위험성
3. 수동적 검출방식
4. 능동적 검출방식
5. 보호협조

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 6,
        question: '풍력발전설비의 시설 기준을 설명하시오.',
        answer: '접지시스템, 낙뢰보호, 비상정지장치, 계통연계',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 풍력발전설비의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 풍력발전 구성
2. 접지 시스템
3. 낙뢰 보호
4. 비상정지장치
5. 계통연계 방식

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 7,
        question: '연료전지 발전설비의 시설 기준을 설명하시오.',
        answer: '가스누설감지, 환기, 역류방지, 접지, 보호장치',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 연료전지 발전설비의 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 연료전지 구성
2. 가스 안전대책
3. 환기 설비
4. 접지 요건
5. 보호장치

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 8,
        question: '자가발전설비와 계통의 병렬운전 조건을 설명하시오.',
        answer: '전압, 주파수, 위상, 상순서 일치, 동기검정기 사용',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 자가발전설비와 계통의 병렬운전 조건을 설명하시오.

다음 순서로 설명해주세요:
1. 병렬운전 조건
2. 전압 일치
3. 주파수 일치
4. 위상 일치
5. 동기검정기

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 9,
        question: '역송전과 관련된 규정을 설명하시오.',
        answer: '역송전 가능 조건, 계량기 설치, 보호협조',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 역송전과 관련된 규정을 설명하시오.

다음 순서로 설명해주세요:
1. 역송전의 정의
2. 역송전 허용 조건
3. 계량 방식
4. 보호협조
5. 한전 협의사항

비슷한 유형의 연습문제 3개도 만들어주세요.`
      },
      {
        id: 10,
        question: '마이크로그리드의 정의와 시설 기준을 설명하시오.',
        answer: '소규모 독립 전력망, 계통연계/독립운전 전환, EMS',
        prompt: `전기기사 전기설비기술기준 문제입니다.

문제: 마이크로그리드의 정의와 시설 기준을 설명하시오.

다음 순서로 설명해주세요:
1. 마이크로그리드 정의
2. 구성요소
3. 운전 모드
4. EMS 역할
5. 시설 기준

비슷한 유형의 연습문제 3개도 만들어주세요.`
      }
    ]
  }
];

export default function ElectricalStandardsStudyPage() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('electrical-standards-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const handleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = new Set(completedQuestions);
    newCompleted.has(key) ? newCompleted.delete(key) : newCompleted.add(key);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('electrical-standards-completed', JSON.stringify([...newCompleted]));
  };

  const getAIUrl = (prompt: string) => {
    const encodedPrompt = encodeURIComponent(prompt);
    return selectedAI === 'claude' ? `https://claude.ai/new?q=${encodedPrompt}` :
           selectedAI === 'chatgpt' ? `https://chat.openai.com/?q=${encodedPrompt}` :
           `https://gemini.google.com/app?q=${encodedPrompt}`;
  };

  const currentTopic = topics.find(t => t.id === activeTopic)!;
  const completedInTopic = currentTopic.questions.filter(q => completedQuestions.has(`${currentTopic.id}-${q.id}`)).length;
  const totalCompleted = topics.reduce((acc, topic) => acc + topic.questions.filter(q => completedQuestions.has(`${topic.id}-${q.id}`)).length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2"><span className="text-2xl">📜</span><span className="font-bold text-gray-800">자격시험 가이드</span></a>
          <nav className="flex items-center gap-2 text-sm">
            <a href="/category/mechanical/electric-engineer" className="text-gray-600 hover:text-green-600">전기기사</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer/exam" className="text-gray-600 hover:text-green-600">필기시험</a>
            <span className="text-gray-300">›</span>
            <span className="text-green-600 font-medium">전기설비기술기준</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">📋</span></div>
              <div><h1 className="text-2xl font-bold">전기설비기술기준 학습</h1><p className="text-green-100">KEC & Electrical Installation Standards</p></div>
            </div>
            <div className="text-right">
              <p className="text-green-100 text-sm">전체 진도율</p>
              <p className="text-2xl font-bold">{totalCompleted} / 60</p>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-1"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${(totalCompleted / 60) * 100}%` }} /></div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">AI 선택:</span>
            <div className="flex gap-2">
              {[{ id: 'claude', name: 'Claude', color: '#f97316' }, { id: 'chatgpt', name: 'ChatGPT', color: '#10b981' }, { id: 'gemini', name: 'Gemini', color: '#3b82f6' }].map(ai => (
                <button key={ai.id} onClick={() => setSelectedAI(ai.id as typeof selectedAI)} className={`px-3 py-1 rounded-full text-sm font-medium transition ${selectedAI === ai.id ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} style={selectedAI === ai.id ? { backgroundColor: ai.color } : {}}>{ai.name}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b overflow-x-auto sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {topics.map(topic => {
              const completed = topic.questions.filter(q => completedQuestions.has(`${topic.id}-${q.id}`)).length;
              return (<button key={topic.id} onClick={() => setActiveTopic(topic.id)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTopic === topic.id ? 'border-green-500 text-green-600 bg-green-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{topic.name}<span className={`ml-2 text-xs ${completed === 10 ? 'text-green-500' : 'text-gray-400'}`}>{completed}/10</span></button>);
            })}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6"><div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${currentTopic.color} text-white`}><h2 className="font-bold">{currentTopic.name}</h2><p className="text-sm opacity-80">완료: {completedInTopic}/10</p></div></div>
        <div className="space-y-4">
          {currentTopic.questions.map((q, index) => {
            const isCompleted = completedQuestions.has(`${currentTopic.id}-${q.id}`);
            const isExpanded = expandedQuestion === q.id;
            return (
              <div key={q.id} className={`bg-white rounded-xl shadow-md overflow-hidden transition ${isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => setExpandedQuestion(isExpanded ? null : q.id)}>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{isCompleted ? '✓' : index + 1}</div>
                    <div className="flex-1"><p className="font-medium text-gray-800">{q.question}</p></div>
                    <span className={`transform transition ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="border-t bg-gray-50 p-4">
                    <div className="mb-4"><p className="text-sm text-gray-500 mb-1">정답:</p><p className="font-medium text-green-700 bg-green-50 p-3 rounded-lg">{q.answer}</p></div>
                    <div className="flex gap-3">
                      <a href={getAIUrl(q.prompt)} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 rounded-lg text-white font-medium text-center transition hover:opacity-90" style={{ backgroundColor: selectedAI === 'claude' ? '#f97316' : selectedAI === 'chatgpt' ? '#10b981' : '#3b82f6' }}>🤖 {selectedAI === 'claude' ? 'Claude' : selectedAI === 'chatgpt' ? 'ChatGPT' : 'Gemini'}에게 질문하기</a>
                      <button onClick={(e) => { e.stopPropagation(); handleComplete(currentTopic.id, q.id); }} className={`px-6 py-3 rounded-lg font-medium transition ${isCompleted ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}>{isCompleted ? '완료 취소' : '완료 표시'}</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-12"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p></div></footer>
    </div>
  );
}
