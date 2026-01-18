'use client';

import { useState, useEffect } from 'react';

const topics = [
  {
    id: 'short-answer',
    name: '단답형 용어',
    color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: '전격전압(Shocking Voltage)의 정의와 인체에 위험한 전압 수준을 설명하시오.', answer: '인체에 가해지는 전위차. 30V(교류)/60V(직류) 이상 위험', prompt: '전기기사 실기 문제입니다.\n\n문제: 전격전압의 정의와 위험 전압 수준을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 전격전압의 정의\n2. 인체의 감전 경로\n3. 교류/직류별 위험 전압\n4. 인체 저항과의 관계\n5. 감전 방지대책\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 2, question: '전력퓨즈(Power Fuse)의 역할과 한류형(Current Limiting) 퓨즈의 특징을 설명하시오.', answer: '과전류/단락시 회로차단. 한류형: 차단시 전류를 제한하여 기기보호', prompt: '전기기사 실기 문제입니다.\n\n문제: 전력퓨즈와 한류형 퓨즈의 특징을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 전력퓨즈 역할\n2. 한류형 퓨즈 원리\n3. 차단용량\n4. 퓨즈 선정 기준\n5. 차단기와의 협조\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 3, question: '수용률, 부하율, 부등률의 정의와 상호관계를 설명하시오.', answer: '수용률=최대수용전력/설비용량, 부하율=평균전력/최대전력, 부등률=개별최대합/합성최대', prompt: '전기기사 실기 문제입니다.\n\n문제: 수용률, 부하율, 부등률의 정의와 관계를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 각 용어의 정의\n2. 계산 공식\n3. 상호관계\n4. 실무 적용\n5. 변압기 용량 선정시 활용\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 4, question: '역률(Power Factor)의 정의, 역률이 낮을 때 문제점, 개선방법을 설명하시오.', answer: '역률=유효전력/피상전력=cosθ. 문제: 전력손실↑, 전압강하↑. 개선: 콘덴서 병렬연결', prompt: '전기기사 실기 문제입니다.\n\n문제: 역률의 정의, 문제점, 개선방법을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 역률 정의\n2. 역률 저하 원인\n3. 낮은 역률의 문제점\n4. 역률 개선 방법\n5. 콘덴서 용량 계산\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 5, question: '단락용량(Short Circuit Capacity)과 차단용량(Breaking Capacity)의 차이를 설명하시오.', answer: '단락용량: 계통의 단락전류 공급능력, 차단용량: 차단기가 차단할 수 있는 최대 전류', prompt: '전기기사 실기 문제입니다.\n\n문제: 단락용량과 차단용량의 차이를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 단락용량 정의\n2. 차단용량 정의\n3. 두 값의 관계\n4. 차단기 선정시 고려사항\n5. %임피던스법으로 단락전류 계산\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 6, question: '절연내력시험의 목적, 시험전압 기준, 시험방법을 설명하시오.', answer: '목적: 절연상태 확인. 시험전압: 최대사용전압×1.5배(10분간), 방법: 메가 또는 내전압시험기', prompt: '전기기사 실기 문제입니다.\n\n문제: 절연내력시험의 목적, 시험전압, 방법을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 시험 목적\n2. 전압별 시험전압 기준\n3. 시험 시간\n4. 시험 방법\n5. 합격 기준\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 7, question: '보호계전기의 정한시(Definite Time)와 반한시(Inverse Time) 특성을 설명하시오.', answer: '정한시: 전류크기 무관하게 일정시간 후 동작, 반한시: 전류가 클수록 빨리 동작', prompt: '전기기사 실기 문제입니다.\n\n문제: 보호계전기의 정한시와 반한시 특성을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 정한시 특성\n2. 반한시 특성\n3. 보호협조에서의 역할\n4. 적용 사례\n5. 계전기 정정\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 8, question: '접지저항 저감방법 5가지를 설명하시오.', answer: '접지봉 병렬/심타, 매설면적 확대, 접지저항저감제, 메쉬접지, 심접지', prompt: '전기기사 실기 문제입니다.\n\n문제: 접지저항 저감방법 5가지를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 접지봉 병렬/심타\n2. 매설면적 확대\n3. 접지저항저감제\n4. 메쉬접지\n5. 각 방법의 장단점\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 9, question: 'CT(변류기)와 PT(변압기)의 극성(Polarity)과 결선시 주의사항을 설명하시오.', answer: '극성: 감극성/가극성, 주의: 2차측 개방금지(CT), 2차측 단락금지(PT)', prompt: '전기기사 실기 문제입니다.\n\n문제: CT와 PT의 극성과 결선시 주의사항을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 극성의 정의\n2. 감극성/가극성\n3. CT 2차측 개방시 위험\n4. PT 2차측 단락시 위험\n5. 결선 방법\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 10, question: '인터록(Interlock)의 정의와 전기설비에서의 적용 예를 설명하시오.', answer: '한 장치 동작시 다른 장치 동작을 제한. 예: 단로기-차단기 연동, 문-전원 연동', prompt: '전기기사 실기 문제입니다.\n\n문제: 인터록의 정의와 적용 예를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 인터록 정의\n2. 안전장치로서의 역할\n3. 단로기-차단기 인터록\n4. 기타 적용 예\n5. 인터록 해제시 주의사항\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' }
    ]
  },
  {
    id: 'substation',
    name: '수변전 설비',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: '수변전설비 단선도의 기본 구성요소를 순서대로 나열하시오.', answer: '인입선→DS→LA→PF→MOF→VCB→변압기→ACB→분전반', prompt: '전기기사 실기 문제입니다.\n\n문제: 수변전설비 단선도의 구성요소를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 각 구성요소의 역할\n2. 배치 순서의 이유\n3. 단선도 기호\n4. 결선 방법\n5. 보호협조\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 2, question: '변압기 용량 계산 공식과 선정시 고려사항을 설명하시오.', answer: 'P = 설비용량×수용률/효율×역률, 고려: 부하증가, 과부하내량, 손실', prompt: '전기기사 실기 문제입니다.\n\n문제: 변압기 용량 계산과 선정 시 고려사항을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 용량 계산 공식\n2. 수용률, 부등률 적용\n3. 과부하 여유\n4. 역률 고려\n5. 효율 고려\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 3, question: '차단기의 정격차단용량이 250MVA, 정격전압 22.9kV일 때 정격차단전류를 계산하시오.', answer: 'I = 250,000/(√3×22.9) = 6,302A ≒ 6.3kA', prompt: '전기기사 실기 문제입니다.\n\n문제: 차단기 정격차단전류를 계산하시오.\n\n다음을 포함하여 설명해주세요:\n1. 정격차단용량과 전류 관계\n2. 계산 공식\n3. 단위 환산\n4. 차단기 선정\n5. 여유율 고려\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 4, question: '피뢰기(LA) 정격전압 선정 기준과 설치 위치를 설명하시오.', answer: '정격전압: 계통전압의 1.4배, 설치: 변압기 1차측, 인입구, 모선', prompt: '전기기사 실기 문제입니다.\n\n문제: 피뢰기 정격전압 선정과 설치 위치를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 피뢰기 역할\n2. 정격전압 선정 기준\n3. 방전개시전압\n4. 제한전압\n5. 설치 위치 및 접지\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 5, question: '콘덴서 설비의 직렬리액터 용량을 6%로 하는 이유를 설명하시오.', answer: '제5고조파(300Hz)에서 공진하여 고조파 유입 차단, 돌입전류 억제', prompt: '전기기사 실기 문제입니다.\n\n문제: 콘덴서 직렬리액터 6%의 의미를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 직렬리액터 역할\n2. 6%의 의미 (제5고조파)\n3. 공진주파수 계산\n4. 다른 용량의 사용 경우\n5. 콘덴서 보호 효과\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 6, question: '수전설비 보호계전기의 종류와 역할을 설명하시오.', answer: 'OCR(과전류), OCGR(지락과전류), OVGR(지락과전압), UVR(부족전압), DGR(방향성지락)', prompt: '전기기사 실기 문제입니다.\n\n문제: 수전설비 보호계전기의 종류와 역할을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 과전류계전기(OCR)\n2. 지락계전기(OCGR, OVGR)\n3. 방향성계전기\n4. 각 계전기 정정값\n5. 보호협조\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 7, question: '무정전 전원장치(UPS)의 구성과 동작원리를 설명하시오.', answer: '구성: 정류기+인버터+배터리+바이패스. 상시인버터 급전, 정전시 배터리 급전', prompt: '전기기사 실기 문제입니다.\n\n문제: UPS의 구성과 동작원리를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. UPS 구성요소\n2. 상시인버터 방식\n3. 정전시 동작\n4. 바이패스 기능\n5. 용량 선정\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 8, question: '변압기 결선방식 Y-Δ와 Δ-Y의 차이와 적용을 설명하시오.', answer: 'Y-Δ: 강압용(중성점접지가능), Δ-Y: 승압용(3고조파 순환)', prompt: '전기기사 실기 문제입니다.\n\n문제: 변압기 결선방식의 차이와 적용을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. Y-Δ 결선 특징\n2. Δ-Y 결선 특징\n3. 전압비/전류비\n4. 위상각\n5. 적용 분야\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 9, question: 'GIS(가스절연개폐장치)의 장단점을 설명하시오.', answer: '장점: 소형화, 고신뢰성, 내환경성. 단점: 고가, SF6가스 관리필요', prompt: '전기기사 실기 문제입니다.\n\n문제: GIS의 장단점을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. GIS 구조\n2. SF6 가스 특성\n3. 장점 상세\n4. 단점 상세\n5. AIS와의 비교\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 10, question: '변압기 무부하손(철손)과 부하손(동손)의 특성을 비교하시오.', answer: '철손: 전압에 비례, 부하무관. 동손: 전류제곱에 비례, 부하에 따라 변화', prompt: '전기기사 실기 문제입니다.\n\n문제: 변압기 무부하손과 부하손의 특성을 비교하시오.\n\n다음을 포함하여 설명해주세요:\n1. 무부하손(철손) 특성\n2. 부하손(동손) 특성\n3. 효율 계산\n4. 최대효율 조건\n5. 손실 저감 방법\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' }
    ]
  },
  {
    id: 'sequence-plc',
    name: '시퀀스/PLC',
    color: 'from-green-500 to-teal-500',
    questions: [
      { id: 1, question: '자기유지회로(Self-Holding Circuit)의 동작원리와 회로를 설명하시오.', answer: 'PBS 누름→MC 여자→MC 접점으로 유지→PBS OFF시 유지→PBS(정지)로 해제', prompt: '전기기사 실기 문제입니다.\n\n문제: 자기유지회로의 동작원리를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 자기유지 개념\n2. 회로 구성\n3. 동작 순서\n4. 타임차트\n5. 응용 회로\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 2, question: '인터록(Interlock) 회로의 원리와 전동기 정역운전 회로에서의 적용을 설명하시오.', answer: '정회전 MC 동작시 역회전 MC 동작방지, MC1 b접점이 MC2 회로에 직렬연결', prompt: '전기기사 실기 문제입니다.\n\n문제: 인터록 회로와 정역운전 회로를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 인터록 필요성\n2. 전기적 인터록\n3. 기계적 인터록\n4. 정역운전 회로\n5. 타임차트\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 3, question: 'Y-Δ 기동회로의 동작원리와 타이머를 이용한 자동절환 회로를 설명하시오.', answer: 'Y결선 기동(전압1/√3)→타이머→Δ결선 운전. MC-Y/MC-Δ 인터록 필수', prompt: '전기기사 실기 문제입니다.\n\n문제: Y-Δ 기동회로와 자동절환 회로를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. Y-Δ 기동 원리\n2. 전류/토크 특성\n3. 자동절환 회로\n4. 타이머 시간 결정\n5. 인터록 필요성\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 4, question: 'PLC의 기본 구성요소와 각 부분의 역할을 설명하시오.', answer: 'CPU(연산), 입력모듈(신호입력), 출력모듈(신호출력), 전원부, 프로그램메모리', prompt: '전기기사 실기 문제입니다.\n\n문제: PLC의 기본 구성요소와 역할을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. CPU 역할\n2. 입력모듈\n3. 출력모듈\n4. 메모리 구성\n5. 스캔타임\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 5, question: '래더 다이어그램의 기본 명령어 (LD, AND, OR, OUT)를 설명하시오.', answer: 'LD: 시작접점, AND: 직렬접점, OR: 병렬접점, OUT: 출력코일', prompt: '전기기사 실기 문제입니다.\n\n문제: 래더 다이어그램 기본 명령어를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. LD(LDI) 명령\n2. AND(ANI) 명령\n3. OR(ORI) 명령\n4. OUT 명령\n5. 프로그램 예제\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 6, question: '타이머 접점의 종류(한시동작, 순시동작)와 타임차트를 설명하시오.', answer: '한시동작: 입력 후 지연동작, 순시복귀: 입력해제 즉시 복귀', prompt: '전기기사 실기 문제입니다.\n\n문제: 타이머 접점의 종류와 타임차트를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 한시동작 순시복귀\n2. 순시동작 한시복귀\n3. 타임차트 작성\n4. 응용 회로\n5. PLC 타이머\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 7, question: '우선순위 회로(Priority Circuit)의 원리와 적용을 설명하시오.', answer: '먼저 동작한 것이 우선권, 다른 출력은 동작불가. a접점/b접점 조합', prompt: '전기기사 실기 문제입니다.\n\n문제: 우선순위 회로의 원리와 적용을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 선입력 우선\n2. 후입력 우선\n3. 회로 구성\n4. 타임차트\n5. 응용 사례\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 8, question: '카운터 회로의 동작원리와 PLC에서의 사용을 설명하시오.', answer: '입력펄스 카운트, 설정값 도달시 출력. 업카운터/다운카운터', prompt: '전기기사 실기 문제입니다.\n\n문제: 카운터 회로의 동작원리를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 카운터 동작원리\n2. 업카운터/다운카운터\n3. PLC 카운터 명령\n4. 응용 회로\n5. 리셋 조건\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 9, question: '순차제어(Sequential Control)의 원리와 컨베이어 제어 예를 설명하시오.', answer: '미리 정해진 순서대로 동작. 센서입력→동작→다음단계. 인터록 필수', prompt: '전기기사 실기 문제입니다.\n\n문제: 순차제어의 원리와 적용 예를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 순차제어 정의\n2. 동작 순서 설계\n3. 센서와 액추에이터\n4. 컨베이어 제어 예\n5. 비상정지 처리\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 10, question: '3상 유도전동기의 과부하 보호회로(열동계전기 적용)를 설명하시오.', answer: '열동계전기(THR) 3상 각 상에 설치, 과열시 b접점으로 MC 차단', prompt: '전기기사 실기 문제입니다.\n\n문제: 열동계전기를 이용한 과부하 보호회로를 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 열동계전기 원리\n2. 설치 위치\n3. 정정값 설정\n4. 보호회로 구성\n5. 트립 후 복귀\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' }
    ]
  },
  {
    id: 'calculation',
    name: '계산 문제',
    color: 'from-orange-500 to-red-500',
    questions: [
      { id: 1, question: '3상 22.9kV 계통에서 %Z=5%인 변압기 2차측(380V) 단락전류를 구하시오. (변압기 500kVA)', answer: 'Is = 100/%Z × In = 100/5 × (500000/(√3×380)) = 15,193A ≒ 15.2kA', prompt: '전기기사 실기 문제입니다.\n\n문제: 변압기 2차측 단락전류를 계산하시오.\n\n다음을 포함하여 설명해주세요:\n1. %임피던스법 원리\n2. 정격전류 계산\n3. 단락전류 계산\n4. 차단기 선정\n5. 안전율 고려\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 2, question: '역률 0.75 지상인 500kW 부하를 0.95로 개선하기 위한 콘덴서 용량을 구하시오.', answer: 'Qc = P(tanθ1-tanθ2) = 500(0.882-0.329) = 276.5kvar', prompt: '전기기사 실기 문제입니다.\n\n문제: 역률 개선용 콘덴서 용량을 계산하시오.\n\n다음을 포함하여 설명해주세요:\n1. 역률에서 역률각 계산\n2. tanθ 계산\n3. 콘덴서 용량 공식\n4. 계산 과정\n5. 콘덴서 선정\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 3, question: '3상 380V, 15kW, 역률 0.85, 효율 90%인 전동기의 전류를 구하시오.', answer: 'I = P/(√3×V×cosθ×η) = 15000/(√3×380×0.85×0.9) = 29.8A', prompt: '전기기사 실기 문제입니다.\n\n문제: 전동기 전류를 계산하시오.\n\n다음을 포함하여 설명해주세요:\n1. 입력/출력 관계\n2. 3상 전력 공식\n3. 효율 적용\n4. 전류 계산\n5. 케이블 선정\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 4, question: '단상 220V, 50m 거리에 10A 부하, 전압강하율 3% 이하로 할 때 전선 굵기를 선정하시오.', answer: 'e = 2ρLI/A → A = 2×0.0172×50×10/(220×0.03) = 2.6mm², 4mm² 선정', prompt: '전기기사 실기 문제입니다.\n\n문제: 전압강하를 고려한 전선 굵기를 선정하시오.\n\n다음을 포함하여 설명해주세요:\n1. 전압강하 공식\n2. 허용 전압강하\n3. 전선 단면적 계산\n4. 표준 규격 선정\n5. 허용전류 확인\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 5, question: '수전용량 1000kVA, 변압기 %Z=5%, 계통 %Z=2%일 때 합성 단락전류를 구하시오.', answer: '합성%Z = 5+2 = 7%, Is = 100/7 × (1000000/(√3×22900)) = 361A', prompt: '전기기사 실기 문제입니다.\n\n문제: 합성 단락전류를 계산하시오.\n\n다음을 포함하여 설명해주세요:\n1. %임피던스 합성\n2. 기준용량 설정\n3. 정격전류 계산\n4. 단락전류 계산\n5. 차단기 선정\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 6, question: '고압 수전설비의 OCR 한시탭을 결정하시오. (CT비 100/5, 부하전류 80A)', answer: '탭 = 부하전류×1.5/CT비 = 80×1.5/(100/5) = 6A → 7A탭 선정', prompt: '전기기사 실기 문제입니다.\n\n문제: OCR 한시탭을 결정하시오.\n\n다음을 포함하여 설명해주세요:\n1. 한시탭 결정 원칙\n2. 여유율 적용\n3. CT비 고려\n4. 표준 탭 선정\n5. 순시탭 결정\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 7, question: '접지저항 측정값이 A극=15Ω, B극=12Ω, C극=10Ω일 때 E극의 접지저항을 구하시오.', answer: 'RE = (RA+RC-RB)/2 = (15+10-12)/2 = 6.5Ω', prompt: '전기기사 실기 문제입니다.\n\n문제: 3전극법으로 접지저항을 계산하시오.\n\n다음을 포함하여 설명해주세요:\n1. 3전극법 원리\n2. 측정값의 의미\n3. 접지저항 계산 공식\n4. 계산 과정\n5. 측정시 주의사항\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 8, question: '조명설계에서 광속법을 이용한 램프 수량 계산 공식과 과정을 설명하시오.', answer: 'N = E×A/(F×U×M), E:조도, A:면적, F:광속, U:이용률, M:보수율', prompt: '전기기사 실기 문제입니다.\n\n문제: 광속법을 이용한 램프 수량 계산을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 광속법 공식\n2. 각 요소의 의미\n3. 이용률/보수율\n4. 계산 예제\n5. 조명 배치\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 9, question: '비상발전기 용량 계산 시 PG법과 PF법의 차이를 설명하시오.', answer: 'PG법: 허용전압강하 기준(기동전류 중시), PF법: 정격출력 기준(부하합산)', prompt: '전기기사 실기 문제입니다.\n\n문제: 비상발전기 용량 계산 PG법과 PF법을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. PG법 원리\n2. PF법 원리\n3. 각 방법의 적용\n4. 전동기 기동 고려\n5. 최종 용량 결정\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' },
      { id: 10, question: '케이블 굵기 선정 시 고려해야 할 4가지 조건을 설명하시오.', answer: '허용전류, 전압강하, 단락전류 내량, 기계적 강도', prompt: '전기기사 실기 문제입니다.\n\n문제: 케이블 굵기 선정 시 고려사항을 설명하시오.\n\n다음을 포함하여 설명해주세요:\n1. 허용전류 기준\n2. 전압강하 기준\n3. 단락전류 내량\n4. 기계적 강도\n5. 최종 굵기 결정\n\n비슷한 유형의 연습문제 3개도 만들어주세요.' }
    ]
  }
];

export default function PracticalExamStudyPage() {
  const [activeTopic, setActiveTopic] = useState(topics[0].id);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('practical-exam-completed');
    if (saved) setCompletedQuestions(new Set(JSON.parse(saved)));
  }, []);

  const handleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = new Set(completedQuestions);
    newCompleted.has(key) ? newCompleted.delete(key) : newCompleted.add(key);
    setCompletedQuestions(newCompleted);
    localStorage.setItem('practical-exam-completed', JSON.stringify([...newCompleted]));
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
            <a href="/" className="text-gray-600 hover:text-yellow-600">홈</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical" className="text-gray-600 hover:text-yellow-600">기계·제어</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer" className="text-gray-600 hover:text-indigo-600">전기기사</a>
            <span className="text-gray-300">›</span>
            <a href="/category/mechanical/electric-engineer/exam" className="text-gray-600 hover:text-indigo-600">실기시험</a>
            <span className="text-gray-300">›</span>
            <span className="text-indigo-600 font-medium">실기 학습</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl"><span className="text-4xl">✍️</span></div>
              <div><h1 className="text-2xl font-bold">전기기사 실기 학습</h1><p className="text-indigo-100">Practical Exam - 기출문제 학습</p></div>
            </div>
            <div className="text-right">
              <p className="text-indigo-100 text-sm">전체 진도율</p>
              <p className="text-2xl font-bold">{totalCompleted} / 40</p>
              <div className="w-32 h-2 bg-white/20 rounded-full mt-1"><div className="h-full bg-white rounded-full transition-all" style={{ width: `${(totalCompleted / 40) * 100}%` }} /></div>
            </div>
          </div>
        </div>
      </section>


      <div className="bg-white border-b overflow-x-auto sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {topics.map(topic => {
              const completed = topic.questions.filter(q => completedQuestions.has(`${topic.id}-${q.id}`)).length;
              return (<button key={topic.id} onClick={() => setActiveTopic(topic.id)} className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTopic === topic.id ? 'border-indigo-500 text-indigo-600 bg-indigo-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{topic.name}<span className={`ml-2 text-xs ${completed === 10 ? 'text-green-500' : 'text-gray-400'}`}>{completed}/10</span></button>);
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
                      <div className="flex gap-2 flex-1">
                        <a href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 rounded-lg text-white font-medium text-center text-sm bg-orange-500 hover:bg-orange-600 transition">🧡 Claude</a>
                        <a href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 rounded-lg text-white font-medium text-center text-sm bg-green-600 hover:bg-green-700 transition">💚 ChatGPT</a>
                        <a href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 rounded-lg text-white font-medium text-center text-sm bg-blue-500 hover:bg-blue-600 transition">💙 Gemini</a>
                      </div>
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
