'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import LoginRequiredModal from '@/app/components/LoginRequiredModal';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'auto-fire-detection',
    name: '자동화재탐지설비 개요',
    color: 'from-orange-600 to-red-500',
    questions: [
      { id: 1, question: '자동화재탐지설비의 구성요소 5가지를 쓰시오.', answer: '감지기, 수신기, 발신기, 중계기, 음향장치(경종)', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 자동화재탐지설비의 구성요소 5가지를 쓰시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '자동화재탐지설비의 작동 순서를 설명하시오.', answer: '화재발생 -> 감지기 작동 -> 수신기 수신 -> 경보발령 -> 피난유도', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 자동화재탐지설비의 작동 순서를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '경계구역의 설정 기준을 설명하시오.', answer: '1경계구역 600m2 이하, 한 변의 길이 50m 이하, 2개 이상 층 경계금지', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 경계구역의 설정 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '자동화재탐지설비의 전원 구성을 설명하시오.', answer: '상용전원(AC 220V) + 비상전원(축전지), 예비전원 60분 이상', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 자동화재탐지설비의 전원 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '자동화재탐지설비 배선의 내화/내열 기준을 설명하시오.', answer: '감지기 회로-내열배선, 비상전원-내화배선, 600V 비닐절연전선 이상', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 자동화재탐지설비 배선의 내화/내열 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'detectors',
    name: '감지기 종류',
    color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: '열감지기의 종류 4가지와 작동원리를 설명하시오.', answer: '차동식(스포트/분포형), 정온식(스포트/감지선형), 보상식, 열아날로그식', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 열감지기의 종류 4가지와 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '연기감지기의 종류와 작동원리를 설명하시오.', answer: '이온화식(알파선), 광전식(스포트/분리형/아날로그), 공기흡입형', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 연기감지기의 종류와 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '불꽃감지기의 종류와 감지원리를 설명하시오.', answer: '적외선식(IR), 자외선식(UV), 복합형(IR+UV), 화염의 파장 감지', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 불꽃감지기의 종류와 감지원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '감지기 설치 높이에 따른 적응성을 설명하시오.', answer: '4m 미만-전종류, 8m 미만-1/2종, 15m 미만-스포트형1종, 20m 미만-불꽃/광전분리형', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 감지기 설치 높이에 따른 적응성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '아날로그 감지기와 일반 감지기의 차이를 설명하시오.', answer: '아날로그-연속값 출력/사전경보, 일반-ON/OFF 작동, 아날로그식 화재조기발견 가능', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 아날로그 감지기와 일반 감지기의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'receiver-transmitter',
    name: '수신기와 발신기',
    color: 'from-orange-500 to-yellow-500',
    questions: [
      { id: 1, question: 'P형 수신기와 R형 수신기의 차이를 설명하시오.', answer: 'P형-공통선식/개별식별불가, R형-고유신호식/개별주소식별, R형이 대규모 건물 적합', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: P형 수신기와 R형 수신기의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '수신기의 주요 기능 5가지를 설명하시오.', answer: '화재표시, 지구표시, 음향경보, 비화재보 처리, 축적기능, 자동복구', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 수신기의 주요 기능 5가지를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '발신기의 설치기준을 설명하시오.', answer: '각층마다 설치, 수평거리 25m 이내, 바닥 0.8~1.5m 높이, 표시등 적색 점멸', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 발신기의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '중계기의 역할과 설치 기준을 설명하시오.', answer: '감지기-수신기 간 신호중계, 회로수 7개 초과/배선거리 초과시 설치', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 중계기의 역할과 설치 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '축적기능과 비축적형의 차이를 설명하시오.', answer: '축적형-5~60초 지연후 경보(비화재보 방지), 비축적형-즉시경보, 특정소방대상물은 축적형', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 축적기능과 비축적형의 차이를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'emergency-alarm',
    name: '비상경보설비',
    color: 'from-red-600 to-red-400',
    questions: [
      { id: 1, question: '비상경보설비의 종류와 설치대상을 설명하시오.', answer: '비상벨설비, 자동식사이렌설비, 단독경보형감지기, 연면적/수용인원에 따라 설치', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상경보설비의 종류와 설치대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '비상벨설비의 음향장치 설치기준을 설명하시오.', answer: '수평거리 25m 이내, 음압 90dB 이상(1m 거리), 층마다 설치', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상벨설비의 음향장치 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '자동식사이렌설비의 작동원리를 설명하시오.', answer: '감지기 작동 -> 수신기 수신 -> 사이렌 자동작동, 수동기동 병행 가능', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 자동식사이렌설비의 작동원리를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '단독경보형감지기의 설치대상과 기준을 설명하시오.', answer: '연면적 1000m2 미만, 각 실마다 설치, 감지+경보 일체형, 건전지 또는 AC', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 단독경보형감지기의 설치대상과 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '비상경보설비의 비상전원 용량 기준을 설명하시오.', answer: '10분 이상 유효작동, 축전지 또는 전기저장장치, 상시 충전상태 유지', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상경보설비의 비상전원 용량 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'emergency-broadcast',
    name: '비상방송설비',
    color: 'from-orange-500 to-orange-400',
    questions: [
      { id: 1, question: '비상방송설비의 구성요소를 설명하시오.', answer: '앰프(증폭기), 스피커, 조작부, 음향장치, 비상전원, 배선', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상방송설비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '비상방송설비 스피커의 설치기준을 설명하시오.', answer: '수평거리 25m 이내, 바닥 높이 1W 이상, 음압 92dB 이상(1m 거리)', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상방송설비 스피커의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '앰프(증폭기)의 출력 계산방법을 설명하시오.', answer: '앰프출력 = 스피커총와트수 x 1.25 이상, 여유율 25% 확보', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 앰프(증폭기)의 출력 계산방법을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '비상방송설비의 작동 우선순위를 설명하시오.', answer: '화재경보 > 비상방송 > 일반방송, 자동/수동 겸용 가능', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상방송설비의 작동 우선순위를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '비상방송설비의 비상전원 용량 기준을 설명하시오.', answer: '20분 이상 유효작동, 축전지 또는 전기저장장치, 자동충전장치 부착', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상방송설비의 비상전원 용량 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'exit-light',
    name: '유도등 및 유도표지',
    color: 'from-green-600 to-green-500',
    questions: [
      { id: 1, question: '유도등의 종류 3가지와 설치장소를 설명하시오.', answer: '피난구유도등(출구), 통로유도등(복도/계단), 객석유도등(공연장/집회장)', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 유도등의 종류 3가지와 설치장소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '피난구유도등의 크기별 설치기준을 설명하시오.', answer: '대형(50m), 중형(30m), 소형(15m) - 피난구까지 보행거리 기준', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 피난구유도등의 크기별 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '통로유도등의 설치기준을 설명하시오.', answer: '복도통로유도등-보행거리 20m 이내, 계단통로유도등-각층 계참마다', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 통로유도등의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '유도등의 비상전원 용량 기준을 설명하시오.', answer: '20분 이상(일반), 60분 이상(특정소방대상물), 내장형/외장형 축전지', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 유도등의 비상전원 용량 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '유도표지의 종류와 설치기준을 설명하시오.', answer: '축광식/조명식, 피난구/통로 표지, 바닥 1m 이하 설치, 조도 1lx 이상', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 유도표지의 종류와 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'emergency-light',
    name: '비상조명등',
    color: 'from-yellow-500 to-yellow-400',
    questions: [
      { id: 1, question: '비상조명등의 설치대상을 설명하시오.', answer: '지하층/무창층 바닥면적 450m2 이상, 지상 11층 이상, 숙박/의료시설 등', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상조명등의 설치대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '비상조명등의 조도 기준을 설명하시오.', answer: '바닥면 1lx 이상, 피난통로는 바닥 중심선 조도 측정', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상조명등의 조도 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '비상조명등의 비상전원 용량 기준을 설명하시오.', answer: '20분 이상(일반), 60분 이상(지하층/무창층/11층 이상), 축전지 내장형', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상조명등의 비상전원 용량 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '휴대용비상조명등의 설치기준을 설명하시오.', answer: '숙박/의료시설 필수, 객실/병실마다 1개 이상, 바닥 0.8~1.5m 설치', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 휴대용비상조명등의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '비상조명등과 유도등의 겸용 조건을 설명하시오.', answer: '조도/비상전원/설치높이 모두 충족시 겸용 가능, 각각 기준 만족 필수', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상조명등과 유도등의 겸용 조건을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'emergency-outlet',
    name: '비상콘센트설비',
    color: 'from-blue-600 to-blue-500',
    questions: [
      { id: 1, question: '비상콘센트설비의 설치대상을 설명하시오.', answer: '지상 11층 이상, 지하 3층 이하, 터널(길이 500m 이상)', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상콘센트설비의 설치대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '비상콘센트의 전원회로 구성을 설명하시오.', answer: '단상교류 220V, 전용회로, 15A 이상, 접지형 2극 콘센트', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상콘센트의 전원회로 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '비상콘센트설비의 설치기준을 설명하시오.', answer: '계단실/부속실 각층 설치, 수평거리 50m 이내, 바닥 0.8~1.5m 높이', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상콘센트설비의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '비상콘센트설비의 보호함 설치기준을 설명하시오.', answer: '두께 1.5mm 이상 강판, 적색 도장, 표시등(적색점등)', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상콘센트설비의 보호함 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '비상콘센트설비의 비상전원 기준을 설명하시오.', answer: '자가발전설비/축전지설비/전기저장장치, 20분 이상 공급, 내화배선', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 비상콘센트설비의 비상전원 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'wireless-communication',
    name: '무선통신보조설비',
    color: 'from-purple-600 to-purple-500',
    questions: [
      { id: 1, question: '무선통신보조설비의 설치대상을 설명하시오.', answer: '지하가/터널/지하층(바닥면적 3000m2 이상), 고층건축물', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 무선통신보조설비의 설치대상을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '누설동축케이블의 구조와 특성을 설명하시오.', answer: '외부도체에 슬롯(홈) 가공, 전파 누설/방사, 소방주파수대 지원', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 누설동축케이블의 구조와 특성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '무선통신보조설비의 구성요소를 설명하시오.', answer: '누설동축케이블, 분배기, 혼합기, 증폭기, 무선기접속단자, 안테나', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 무선통신보조설비의 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '무선기접속단자의 설치기준을 설명하시오.', answer: '소방대 전용 단자, 계단실/부속실 설치, 바닥 0.8~1.5m 높이', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 무선기접속단자의 설치기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '무선통신보조설비의 비상전원 기준을 설명하시오.', answer: '30분 이상 유효작동, 축전지/자가발전설비, 증폭기 전원 공급', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 무선통신보조설비의 비상전원 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
  {
    id: 'firefighting-electrical',
    name: '소화활동설비 전기',
    color: 'from-red-600 to-orange-500',
    questions: [
      { id: 1, question: '제연설비의 전기적 구성요소를 설명하시오.', answer: '배출기(팬), 급기팬, 댐퍼, 제어반, 기동스위치, 감지기', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 제연설비의 전기적 구성요소를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 2, question: '제연설비 배출기의 전원 및 제어 기준을 설명하시오.', answer: '전용회로, 비상전원 30분 이상, 자동/수동 겸용, 내화배선', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 제연설비 배출기의 전원 및 제어 기준을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 3, question: '연결살수설비의 전기적 부분을 설명하시오.', answer: '가압송수장치(펌프모터), 기동스위치, 제어반, 표시등, 경보장치', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 연결살수설비의 전기적 부분을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 4, question: '연결송수관설비의 전기적 구성을 설명하시오.', answer: '가압송수장치, 기동용수압개폐장치, 제어반, 비상전원', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 연결송수관설비의 전기적 구성을 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
      { id: 5, question: '소화설비 펌프의 기동방식과 제어를 설명하시오.', answer: '압력챔버식/기동용수압개폐장치식, 자동/수동 기동, 인터록 회로', prompt: '소방설비기사(전기) 소방전기시설 문제입니다.\n\n문제: 소화설비 펌프의 기동방식과 제어를 설명하시오.\n\n다음 순서로 설명해주세요:\n1. 핵심 개념\n2. 설치기준(NFSC)\n3. 구조 및 원리\n4. 결선도/도면\n5. 기출 포인트' },
    ],
  },
];

export default function ElectricalEquipmentPage() {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['auto-fire-detection']);
  const [completedQuestions, setCompletedQuestions] = useState<{[key: string]: number[]}>({});
  const [showAIModal, setShowAIModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [currentPrompt, setCurrentPrompt] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fire-elec-equipment-progress');
    if (saved) setCompletedQuestions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('fire-elec-equipment-progress', JSON.stringify(completedQuestions));
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
            <a href="/" className="text-gray-600 hover:text-orange-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety" className="text-gray-600 hover:text-orange-600">안전·소방</a>
            <span className="text-gray-300">›</span>
            <a href="/category/safety/fire-equipment-electrical" className="text-gray-600 hover:text-orange-600">소방설비기사(전기)</a>
            <span className="text-gray-300">›</span>
            <span className="text-orange-600 font-medium">소방전기시설</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <span className="text-4xl">🚨</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">소방전기시설의 구조 및 원리</h1>
              <p className="text-orange-100">소방설비기사(전기) - 경보설비, 피난설비, 소화활동설비</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">전체 진행률</span>
            <span className="text-orange-600 font-bold">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
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
                            <span className="text-orange-500 mr-2">Q{q.id}.</span>
                            {q.question}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                            <span className="font-medium text-green-600">A.</span> {q.answer}
                          </p>
                        </div>
                        <button
                          onClick={() => openAIModal(q.prompt)}
                          className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200 transition"
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

      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">🤖 AI 선택</h3>
                <button
                  onClick={() => setShowAIModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">원하는 AI를 선택하세요:</p>
              <div className="space-y-3">
                <a
                  href={`https://claude.ai/new?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition border border-orange-200"
                >
                  <span className="text-2xl">🧡</span>
                  <div>
                    <p className="font-bold text-orange-700">Claude</p>
                    <p className="text-xs text-orange-600">Anthropic AI</p>
                  </div>
                </a>
                <a
                  href={`https://chat.openai.com/?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200"
                >
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-green-700">ChatGPT</p>
                    <p className="text-xs text-green-600">OpenAI</p>
                  </div>
                </a>
                <a
                  href={`https://gemini.google.com/app?q=${encodeURIComponent(currentPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200"
                >
                  <span className="text-2xl">💙</span>
                  <div>
                    <p className="font-bold text-blue-700">Gemini</p>
                    <p className="text-xs text-blue-600">Google AI</p>
                  </div>
                </a>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentPrompt);
                  alert('프롬프트가 복사되었습니다!');
                }}
                className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-gray-700 transition"
              >
                📋 프롬프트 복사하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
