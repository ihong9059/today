'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const topics = [
  {
    id: 'basic',
    name: '의사소통의 기본 개념',
    color: 'from-blue-500 to-indigo-500',
    questions: [
      {
        id: 1,
        question: '의사소통의 정의와 구성요소를 설명하시오.',
        answer: '송신자-메시지-채널-수신자-피드백의 상호작용 과정',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 의사소통의 정의와 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 의사소통의 정의
2. 의사소통 모델 (Shannon-Weaver)
3. 구성요소 (송신자, 메시지, 채널, 수신자, 피드백)
4. 노이즈(잡음)의 개념
5. 연습문제 3개`
      },
      {
        id: 2,
        question: '언어적 의사소통과 비언어적 의사소통을 비교 설명하시오.',
        answer: '언어적: 말/글, 비언어적: 표정/제스처/눈맞춤/자세/목소리톤',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 언어적 의사소통과 비언어적 의사소통을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 언어적 의사소통의 정의와 유형
2. 비언어적 의사소통의 정의와 유형
3. 비언어적 의사소통의 기능
4. 메라비언의 법칙 (7-38-55)
5. 연습문제 3개`
      },
      {
        id: 3,
        question: '효과적인 의사소통을 방해하는 장벽(barrier)을 설명하시오.',
        answer: '물리적, 심리적, 언어적, 문화적, 조직적 장벽',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 효과적인 의사소통을 방해하는 장벽(barrier)을 설명하시오.

다음 순서로 설명해주세요:
1. 물리적 장벽 (환경, 거리)
2. 심리적 장벽 (편견, 선입견, 방어기제)
3. 언어적 장벽 (전문용어, 언어차이)
4. 문화적 장벽
5. 장벽 극복 방안
6. 연습문제 3개`
      },
      {
        id: 4,
        question: '일방향 의사소통과 양방향 의사소통의 차이점을 설명하시오.',
        answer: '일방향: 피드백 없음, 양방향: 피드백 있음, 상호작용적',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 일방향 의사소통과 양방향 의사소통의 차이점을 설명하시오.

다음 순서로 설명해주세요:
1. 일방향 의사소통의 정의와 예시
2. 양방향 의사소통의 정의와 예시
3. 각각의 장단점
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
      {
        id: 5,
        question: '의사소통 능력(Communication Competence)의 구성요소를 설명하시오.',
        answer: '인지적 능력, 정서적 능력, 행동적 능력',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 의사소통 능력(Communication Competence)의 구성요소를 설명하시오.

다음 순서로 설명해주세요:
1. 인지적 능력 (지식, 이해)
2. 정서적 능력 (공감, 민감성)
3. 행동적 능력 (기술, 실천)
4. 의사소통 능력 향상 방법
5. 연습문제 3개`
      },
      {
        id: 6,
        question: '적극적 경청(Active Listening)의 기법을 설명하시오.',
        answer: '주의집중, 반영, 명료화, 요약, 공감적 반응',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 적극적 경청(Active Listening)의 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 적극적 경청의 정의
2. 주의집중과 눈맞춤
3. 반영과 바꿔말하기
4. 명료화와 요약
5. 공감적 반응
6. 연습문제 3개`
      },
      {
        id: 7,
        question: '피드백(Feedback)의 효과적인 제공 방법을 설명하시오.',
        answer: '구체적, 적시적, 행동중심, 긍정적 표현, 수용가능성 고려',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 피드백(Feedback)의 효과적인 제공 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 피드백의 정의와 중요성
2. 효과적인 피드백의 특성
3. 건설적 피드백 vs 파괴적 피드백
4. 피드백 제공 시 주의사항
5. 연습문제 3개`
      },
      {
        id: 8,
        question: '대인의사소통과 집단의사소통의 특성을 비교 설명하시오.',
        answer: '대인: 1:1, 친밀감/집단: 다수, 역할/규범/응집력',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 대인의사소통과 집단의사소통의 특성을 비교 설명하시오.

다음 순서로 설명해주세요:
1. 대인의사소통의 정의와 특성
2. 집단의사소통의 정의와 특성
3. 집단 역학과 의사소통 패턴
4. 보건교육에서의 적용
5. 연습문제 3개`
      },
      {
        id: 9,
        question: '문화 간 의사소통(Intercultural Communication)의 특성을 설명하시오.',
        answer: '문화적 차이 인식, 문화 감수성, 고맥락/저맥락 문화',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 문화 간 의사소통(Intercultural Communication)의 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 문화 간 의사소통의 정의
2. 고맥락 문화 vs 저맥락 문화
3. 문화적 민감성의 발달 단계
4. 다문화 보건교육에서의 고려사항
5. 연습문제 3개`
      },
      {
        id: 10,
        question: '조하리 창(Johari Window)의 개념과 활용을 설명하시오.',
        answer: '열린영역, 숨겨진영역, 눈먼영역, 미지영역의 4분면',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 조하리 창(Johari Window)의 개념과 활용을 설명하시오.

다음 순서로 설명해주세요:
1. 조하리 창의 개념
2. 4가지 영역 (열린/숨겨진/눈먼/미지)
3. 자기노출과 피드백의 관계
4. 열린 영역 확장 방법
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'counseling',
    name: '건강상담 기법',
    color: 'from-green-500 to-emerald-500',
    questions: [
      {
        id: 11,
        question: '건강상담의 정의와 목적을 설명하시오.',
        answer: '건강문제 해결과 건강행동 변화를 위한 전문적 대화 과정',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 건강상담의 정의와 목적을 설명하시오.

다음 순서로 설명해주세요:
1. 건강상담의 정의
2. 건강상담의 목적
3. 상담과 교육의 차이
4. 건강상담사의 역할
5. 연습문제 3개`
      },
      {
        id: 12,
        question: '로저스(Rogers)의 인간중심 상담의 핵심 원리를 설명하시오.',
        answer: '무조건적 긍정적 존중, 공감적 이해, 진솔성(일치성)',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 로저스(Rogers)의 인간중심 상담의 핵심 원리를 설명하시오.

다음 순서로 설명해주세요:
1. 인간중심 상담의 기본 철학
2. 무조건적 긍정적 존중
3. 공감적 이해
4. 진솔성(일치성)
5. 건강상담에의 적용
6. 연습문제 3개`
      },
      {
        id: 13,
        question: '동기강화상담(MI)의 원리와 기법을 설명하시오.',
        answer: 'OARS(열린질문, 인정, 반영, 요약), 양가감정 탐색, 변화대화 유발',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 동기강화상담(MI)의 원리와 기법을 설명하시오.

다음 순서로 설명해주세요:
1. 동기강화상담의 정의와 목적
2. MI의 4가지 원리 (공감표현, 불일치 발전, 저항과 함께하기, 자기효능감 지지)
3. OARS 기법
4. 변화대화 유발 방법
5. 연습문제 3개`
      },
      {
        id: 14,
        question: '상담 과정의 단계를 설명하시오.',
        answer: '관계형성 → 문제탐색 → 목표설정 → 개입 → 종결/평가',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 상담 과정의 단계를 설명하시오.

다음 순서로 설명해주세요:
1. 관계형성(라포) 단계
2. 문제탐색 및 사정 단계
3. 목표설정 단계
4. 개입/실행 단계
5. 종결 및 평가 단계
6. 연습문제 3개`
      },
      {
        id: 15,
        question: '공감(Empathy)의 수준과 표현 방법을 설명하시오.',
        answer: '1차 공감(표면적)-2차 공감(심층적), 반영적 경청과 공감 표현',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 공감(Empathy)의 수준과 표현 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 공감의 정의 (동정과의 차이)
2. 1차 공감 (기본 공감)
3. 2차 공감 (심층 공감)
4. 공감 표현 방법
5. 연습문제 3개`
      },
      {
        id: 16,
        question: '개방형 질문과 폐쇄형 질문의 활용 방법을 설명하시오.',
        answer: '개방형: 탐색/확장, 폐쇄형: 확인/구체화',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 개방형 질문과 폐쇄형 질문의 활용 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 개방형 질문의 정의와 예시
2. 폐쇄형 질문의 정의와 예시
3. 각 질문 유형의 장단점
4. 상담 상황에 따른 적절한 활용
5. 연습문제 3개`
      },
      {
        id: 17,
        question: '직면(Confrontation) 기법의 적절한 사용 방법을 설명하시오.',
        answer: '내담자의 모순/불일치 지적, 라포 형성 후 사용, 온화하게 표현',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 직면(Confrontation) 기법의 적절한 사용 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 직면의 정의와 목적
2. 직면이 필요한 상황
3. 효과적인 직면 방법
4. 직면 사용 시 주의사항
5. 연습문제 3개`
      },
      {
        id: 18,
        question: '저항(Resistance)의 유형과 대처 방법을 설명하시오.',
        answer: '침묵, 논쟁, 부정, 합리화 등에 대한 공감적 대응',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 저항(Resistance)의 유형과 대처 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 저항의 정의와 원인
2. 저항의 유형 (침묵, 논쟁, 부정 등)
3. 저항에 대한 효과적 대처
4. MI에서의 저항 다루기
5. 연습문제 3개`
      },
      {
        id: 19,
        question: '그룹 상담(Group Counseling)의 장점과 운영 방법을 설명하시오.',
        answer: '지지체계, 보편성, 대리학습, 희망 제공, 8-12명 적정',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 그룹 상담(Group Counseling)의 장점과 운영 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 그룹 상담의 치료적 요인 (얄롬)
2. 그룹 상담의 장점
3. 적정 그룹 크기와 구성
4. 그룹 발달 단계
5. 연습문제 3개`
      },
      {
        id: 20,
        question: '위기상담(Crisis Counseling)의 원칙과 절차를 설명하시오.',
        answer: '즉각적 개입, 안전확보, 정서적 지지, 자원연결',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 위기상담(Crisis Counseling)의 원칙과 절차를 설명하시오.

다음 순서로 설명해주세요:
1. 위기의 정의와 특성
2. 위기상담의 목표
3. 위기개입 단계 (ABC 모델)
4. 자살 위험 평가와 대응
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'health-comm',
    name: '건강커뮤니케이션',
    color: 'from-purple-500 to-pink-500',
    questions: [
      {
        id: 21,
        question: '건강커뮤니케이션(Health Communication)의 정의와 영역을 설명하시오.',
        answer: '건강정보 전달/교환, 개인/조직/대중 수준의 의사소통',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 건강커뮤니케이션(Health Communication)의 정의와 영역을 설명하시오.

다음 순서로 설명해주세요:
1. 건강커뮤니케이션의 정의
2. 개인 수준 건강커뮤니케이션
3. 조직 수준 건강커뮤니케이션
4. 대중 수준 건강커뮤니케이션
5. 연습문제 3개`
      },
      {
        id: 22,
        question: '건강 메시지 개발 시 고려해야 할 요소를 설명하시오.',
        answer: '대상자 특성, 메시지 프레이밍, 정서적 호소, 행동 촉구',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 건강 메시지 개발 시 고려해야 할 요소를 설명하시오.

다음 순서로 설명해주세요:
1. 대상자 분석
2. 메시지 프레이밍 (이득/손실 프레임)
3. 정서적 호소 (공포, 유머)
4. 명확한 행동 촉구(CTA)
5. 연습문제 3개`
      },
      {
        id: 23,
        question: '공포 호소(Fear Appeal)의 효과와 적절한 사용 방법을 설명하시오.',
        answer: '적정 수준의 공포+자기효능감+행동 가능성 제시 필요',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 공포 호소(Fear Appeal)의 효과와 적절한 사용 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 공포 호소의 정의
2. 확장된 병행과정모형(EPPM)
3. 효과적인 공포 호소 조건
4. 과도한 공포의 역효과
5. 연습문제 3개`
      },
      {
        id: 24,
        question: '메시지 프레이밍(Message Framing)의 유형과 효과를 설명하시오.',
        answer: '이득 프레임(예방행동)과 손실 프레임(검진행동)의 차별적 효과',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 메시지 프레이밍(Message Framing)의 유형과 효과를 설명하시오.

다음 순서로 설명해주세요:
1. 메시지 프레이밍의 정의
2. 이득 프레임 (gain-framed)
3. 손실 프레임 (loss-framed)
4. 행동 유형에 따른 효과적 프레이밍
5. 연습문제 3개`
      },
      {
        id: 25,
        question: '건강정보이해능력(Health Literacy)의 개념과 중요성을 설명하시오.',
        answer: '건강정보를 얻고 이해하고 활용하는 능력, 건강결과에 영향',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 건강정보이해능력(Health Literacy)의 개념과 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 건강정보이해능력의 정의
2. 건강정보이해능력의 3가지 수준
3. 낮은 건강정보이해능력의 영향
4. 건강정보이해능력 향상 전략
5. 연습문제 3개`
      },
      {
        id: 26,
        question: '플레인 랭귀지(Plain Language) 원칙을 설명하시오.',
        answer: '쉬운 용어, 짧은 문장, 능동태, 시각적 구성, 독자 테스트',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 플레인 랭귀지(Plain Language) 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 플레인 랭귀지의 정의
2. 쉬운 단어 사용
3. 짧은 문장과 단락
4. 시각적 구성과 레이아웃
5. 독자 테스트 방법
6. 연습문제 3개`
      },
      {
        id: 27,
        question: '의료인-환자 의사소통(Provider-Patient Communication)의 중요성을 설명하시오.',
        answer: '환자 만족도, 치료 순응도, 건강결과 향상',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 의료인-환자 의사소통(Provider-Patient Communication)의 중요성을 설명하시오.

다음 순서로 설명해주세요:
1. 의료인-환자 의사소통의 정의
2. 효과적 의사소통의 건강 결과
3. 환자 중심 의사소통
4. 공유 의사결정(SDM)
5. 연습문제 3개`
      },
      {
        id: 28,
        question: '환자 교육(Patient Education) 시 효과적인 의사소통 방법을 설명하시오.',
        answer: 'Teach-back, 핵심메시지 강조, 시각자료 활용, 행동계획 수립',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 환자 교육(Patient Education) 시 효과적인 의사소통 방법을 설명하시오.

다음 순서로 설명해주세요:
1. Teach-back 기법
2. 핵심 메시지 강조 (3가지 이내)
3. 시각자료 및 인쇄물 활용
4. 구체적 행동계획 수립
5. 연습문제 3개`
      },
      {
        id: 29,
        question: '설득 커뮤니케이션의 이론적 모델을 설명하시오.',
        answer: '정교화가능성모형(ELM): 중심경로와 주변경로',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 설득 커뮤니케이션의 이론적 모델을 설명하시오.

다음 순서로 설명해주세요:
1. 설득의 정의
2. 정교화가능성모형(ELM)
3. 중심경로 처리
4. 주변경로 처리
5. 건강 메시지에의 적용
6. 연습문제 3개`
      },
      {
        id: 30,
        question: '위험 커뮤니케이션(Risk Communication)의 원칙을 설명하시오.',
        answer: '투명성, 적시성, 일관성, 공감, 불확실성 인정',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 위험 커뮤니케이션(Risk Communication)의 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 위험 커뮤니케이션의 정의
2. 7가지 핵심 원칙 (CDC)
3. 효과적인 위험 메시지 구성
4. 위기상황에서의 커뮤니케이션
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'media',
    name: '미디어와 디지털 건강정보',
    color: 'from-orange-500 to-red-500',
    questions: [
      {
        id: 31,
        question: '매스미디어를 활용한 건강캠페인의 특징을 설명하시오.',
        answer: '대규모 도달, 인식 제고, 의제설정, 사회규범 형성',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 매스미디어를 활용한 건강캠페인의 특징을 설명하시오.

다음 순서로 설명해주세요:
1. 매스미디어 건강캠페인의 정의
2. 캠페인의 효과 (인식, 지식, 태도, 행동)
3. 성공적 캠페인의 요소
4. 한계점과 보완 전략
5. 연습문제 3개`
      },
      {
        id: 32,
        question: '소셜미디어를 활용한 건강커뮤니케이션의 장단점을 설명하시오.',
        answer: '장점: 상호작용, 확산, 접근성 / 단점: 정확성, 개인정보, 디지털 격차',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 소셜미디어를 활용한 건강커뮤니케이션의 장단점을 설명하시오.

다음 순서로 설명해주세요:
1. 소셜미디어의 종류와 특성
2. 건강 커뮤니케이션에서의 장점
3. 소셜미디어 활용의 단점/위험
4. 효과적인 소셜미디어 전략
5. 연습문제 3개`
      },
      {
        id: 33,
        question: '인포데믹(Infodemic)의 개념과 대응 전략을 설명하시오.',
        answer: '건강 관련 허위/과잉 정보 범람, 팩트체크와 정보이해능력 향상 필요',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 인포데믹(Infodemic)의 개념과 대응 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 인포데믹의 정의 (WHO)
2. 인포데믹의 영향
3. 허위정보의 유형
4. 대응 전략 (팩트체크, 리터러시)
5. 연습문제 3개`
      },
      {
        id: 34,
        question: 'e-Health와 m-Health의 개념과 활용 사례를 설명하시오.',
        answer: 'e-Health: 인터넷 기반, m-Health: 모바일 기반 건강서비스',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: e-Health와 m-Health의 개념과 활용 사례를 설명하시오.

다음 순서로 설명해주세요:
1. e-Health의 정의와 범위
2. m-Health의 정의와 특성
3. 건강 앱의 유형과 활용
4. 디지털 헬스의 장점과 한계
5. 연습문제 3개`
      },
      {
        id: 35,
        question: '원격건강상담(Telehealth)의 장단점과 윤리적 고려사항을 설명하시오.',
        answer: '접근성 향상, 비용절감 vs 개인정보, 관계형성, 법적 문제',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 원격건강상담(Telehealth)의 장단점과 윤리적 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 원격건강상담의 정의
2. 장점 (접근성, 편의성, 비용)
3. 단점 (기술 장벽, 관계 형성)
4. 윤리적/법적 고려사항
5. 연습문제 3개`
      },
      {
        id: 36,
        question: '건강정보 웹사이트 평가 기준(HONcode 등)을 설명하시오.',
        answer: '권위성, 상보성, 개인정보보호, 출처명시, 정당성, 투명성, 재정공개, 광고정책',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 건강정보 웹사이트 평가 기준(HONcode 등)을 설명하시오.

다음 순서로 설명해주세요:
1. HONcode의 정의
2. 8가지 평가 기준
3. 일반인을 위한 평가 체크리스트
4. 신뢰할 수 있는 건강정보 사이트 예시
5. 연습문제 3개`
      },
      {
        id: 37,
        question: '엔터테인먼트-에듀케이션(Entertainment-Education)의 개념과 효과를 설명하시오.',
        answer: '오락 콘텐츠에 교육적 메시지 삽입, 정서적 몰입과 행동변화 촉진',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 엔터테인먼트-에듀케이션(Entertainment-Education)의 개념과 효과를 설명하시오.

다음 순서로 설명해주세요:
1. E-E의 정의
2. 이론적 기반 (사회학습이론)
3. E-E의 효과
4. 성공적 E-E 사례
5. 연습문제 3개`
      },
      {
        id: 38,
        question: '디지털 건강 격차(Digital Health Divide)의 원인과 해결방안을 설명하시오.',
        answer: '연령, 소득, 교육, 지역에 따른 디지털 접근성/활용 격차',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 디지털 건강 격차(Digital Health Divide)의 원인과 해결방안을 설명하시오.

다음 순서로 설명해주세요:
1. 디지털 건강 격차의 정의
2. 격차 발생 원인 (접근성, 활용능력)
3. 취약계층별 특성
4. 격차 해소 전략
5. 연습문제 3개`
      },
      {
        id: 39,
        question: '건강정보 시각화(Health Data Visualization)의 원칙을 설명하시오.',
        answer: '명확성, 단순성, 정확성, 접근성, 맥락 제공',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 건강정보 시각화(Health Data Visualization)의 원칙을 설명하시오.

다음 순서로 설명해주세요:
1. 건강정보 시각화의 정의와 중요성
2. 효과적인 시각화 원칙
3. 시각화 유형 (그래프, 인포그래픽)
4. 잘못된 시각화의 예
5. 연습문제 3개`
      },
      {
        id: 40,
        question: '건강 앱 개발 시 사용자 경험(UX) 고려사항을 설명하시오.',
        answer: '사용 편의성, 개인화, 동기부여, 피드백, 개인정보보호',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 건강 앱 개발 시 사용자 경험(UX) 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 건강 앱 UX의 중요성
2. 사용 편의성 (UI 설계)
3. 개인화와 맞춤형 기능
4. 동기부여 요소 (게이미피케이션)
5. 연습문제 3개`
      },
    ],
  },
  {
    id: 'special',
    name: '특수 대상별 의사소통',
    color: 'from-cyan-500 to-teal-500',
    questions: [
      {
        id: 41,
        question: '아동/청소년과의 효과적인 건강 의사소통 방법을 설명하시오.',
        answer: '발달단계 고려, 눈높이 언어, 참여 유도, 부모 참여',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 아동/청소년과의 효과적인 건강 의사소통 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 발달단계별 인지 특성
2. 아동에게 적합한 의사소통 기법
3. 청소년의 특성과 접근법
4. 부모/보호자 참여 전략
5. 연습문제 3개`
      },
      {
        id: 42,
        question: '노인과의 효과적인 건강 의사소통 방법을 설명하시오.',
        answer: '감각저하 고려, 천천히 명확하게, 존중, 가족 참여',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 노인과의 효과적인 건강 의사소통 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 노인의 신체적/인지적 특성
2. 감각 저하를 고려한 의사소통
3. 존엄성을 존중하는 대화
4. 가족/보호자와의 협력
5. 연습문제 3개`
      },
      {
        id: 43,
        question: '만성질환자와의 건강상담 시 고려사항을 설명하시오.',
        answer: '자기관리 지지, 임파워먼트, 심리적 지지, 생활습관 변화',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 만성질환자와의 건강상담 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 만성질환 관리의 특성
2. 환자 임파워먼트
3. 자기관리 지원 전략
4. 심리적 지지와 동기강화
5. 연습문제 3개`
      },
      {
        id: 44,
        question: '다문화 대상자와의 건강커뮤니케이션 시 고려사항을 설명하시오.',
        answer: '문화적 민감성, 통역, 문화적 건강관념 이해, 비차별적 태도',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 다문화 대상자와의 건강커뮤니케이션 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 문화적 역량의 정의
2. 언어 장벽 해소 (통역, 번역자료)
3. 문화적 건강신념 이해
4. 문화적으로 적합한 서비스 제공
5. 연습문제 3개`
      },
      {
        id: 45,
        question: '저소득층/취약계층과의 건강커뮤니케이션 시 고려사항을 설명하시오.',
        answer: '건강정보이해능력, 자원접근성, 신뢰관계, 낙인 방지',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 저소득층/취약계층과의 건강커뮤니케이션 시 고려사항을 설명하시오.

다음 순서로 설명해주세요:
1. 사회경제적 취약성과 건강
2. 건강정보이해능력 고려
3. 신뢰관계 형성
4. 자원 연결 및 옹호
5. 연습문제 3개`
      },
      {
        id: 46,
        question: '정신건강 문제를 가진 대상자와의 의사소통 방법을 설명하시오.',
        answer: '비심판적 태도, 경청, 안전 확인, 희망 제공, 전문의뢰',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 정신건강 문제를 가진 대상자와의 의사소통 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 정신건강 관련 낙인 해소
2. 비심판적, 공감적 태도
3. 안전 평가와 위기 대응
4. 전문 서비스 연계
5. 연습문제 3개`
      },
      {
        id: 47,
        question: '장애인과의 효과적인 건강 의사소통 방법을 설명하시오.',
        answer: '장애 유형별 맞춤 의사소통, 당사자 직접 대화, 접근성 보장',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 장애인과의 효과적인 건강 의사소통 방법을 설명하시오.

다음 순서로 설명해주세요:
1. 장애 유형별 의사소통 전략
2. 시각/청각 장애인 대상 의사소통
3. 지적장애인 대상 의사소통
4. 물리적/정보 접근성 보장
5. 연습문제 3개`
      },
      {
        id: 48,
        question: '직장인 대상 건강커뮤니케이션의 특성과 전략을 설명하시오.',
        answer: '시간 제약, 직무 관련성, 조직문화 반영, 리더십 참여',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 직장인 대상 건강커뮤니케이션의 특성과 전략을 설명하시오.

다음 순서로 설명해주세요:
1. 직장 건강증진의 특성
2. 직장인의 건강 요구
3. 효과적인 직장 건강 메시지
4. 조직 수준 전략
5. 연습문제 3개`
      },
      {
        id: 49,
        question: '임산부/산모 대상 건강커뮤니케이션의 특성을 설명하시오.',
        answer: '불안 감소, 정확한 정보, 의사결정 지원, 가족 참여',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 임산부/산모 대상 건강커뮤니케이션의 특성을 설명하시오.

다음 순서로 설명해주세요:
1. 임신 중 건강정보 요구
2. 불안과 정보 과부하 관리
3. 출산 및 육아 교육
4. 배우자/가족 참여 전략
5. 연습문제 3개`
      },
      {
        id: 50,
        question: '의사소통 시 윤리적 원칙(비밀보장, 사전동의 등)을 설명하시오.',
        answer: '비밀보장, 정보에 입각한 동의, 자율성 존중, 진실성',
        prompt: `보건교육사 2급 보건의사소통 문제입니다.

문제: 의사소통 시 윤리적 원칙(비밀보장, 사전동의 등)을 설명하시오.

다음 순서로 설명해주세요:
1. 비밀보장의 원칙과 한계
2. 정보에 입각한 동의
3. 자율성 존중
4. 진실성과 정직
5. 연습문제 3개`
      },
    ],
  },
];

export default function HealthCommunicationStudyPage() {
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('health-educator-2-communication-progress');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
    const allExpanded: Record<string, boolean> = {};
    topics.forEach((t) => {
      allExpanded[t.id] = true;
    });
    setExpandedTopics(allExpanded);
  }, []);

  const toggleComplete = (topicId: string, questionId: number) => {
    const key = `${topicId}-${questionId}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('health-educator-2-communication-progress', JSON.stringify(newCompleted));
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const completedCount = Object.values(completedQuestions).filter(Boolean).length;
  const progress = Math.round((completedCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📜</span>
            <span className="font-bold text-gray-800">자격시험 가이드</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">홈</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical" className="text-gray-600 hover:text-blue-600">의료·보건</Link>
            <span className="text-gray-300">›</span>
            <Link href="/category/medical/health-educator-2" className="text-gray-600 hover:text-blue-600">보건교육사 2급</Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">보건의사소통</span>
          </nav>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <span className="text-4xl">💬</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">보건의사소통 학습</h1>
                <p className="text-blue-100">보건교육사 2급 필기 2과목</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{progress}%</p>
              <p className="text-blue-100 text-sm">{completedCount}/{totalQuestions} 완료</p>
            </div>
          </div>
          <div className="mt-4 bg-white/20 rounded-full h-3">
            <div
              className="bg-white rounded-full h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {topics.map((topic) => {
            const topicCompleted = topic.questions.filter(
              (q) => completedQuestions[`${topic.id}-${q.id}`]
            ).length;

            return (
              <div key={topic.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={`w-full p-4 bg-gradient-to-r ${topic.color} text-white flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📖</span>
                    <div className="text-left">
                      <h2 className="font-bold text-lg">{topic.name}</h2>
                      <p className="text-sm opacity-80">
                        {topicCompleted}/{topic.questions.length} 완료
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">{expandedTopics[topic.id] ? '−' : '+'}</span>
                </button>

                {expandedTopics[topic.id] && (
                  <div className="p-4 space-y-4">
                    {topic.questions.map((q) => {
                      const isCompleted = completedQuestions[`${topic.id}-${q.id}`];
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-lg border-2 transition ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleComplete(topic.id, q.id)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-gray-300 hover:border-green-500'
                              }`}
                            >
                              {isCompleted && '✓'}
                            </button>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">
                                Q{q.id}. {q.question}
                              </p>
                              <p className="text-sm text-gray-600 mb-3">
                                <strong>정답:</strong> {q.answer}
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                <a
                                  href={`https://claude.ai/new?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200 transition"
                                >
                                  🧡 Claude
                                </a>
                                <a
                                  href={`https://chat.openai.com/?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition"
                                >
                                  💚 ChatGPT
                                </a>
                                <a
                                  href={`https://gemini.google.com/app?q=${encodeURIComponent(q.prompt)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition"
                                >
                                  💙 Gemini
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 자격시험 가이드. UTTEC</p>
        </div>
      </footer>
    </div>
  );
}
