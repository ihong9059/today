'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronLeft, ChevronRight, Copy, ExternalLink, CheckCircle, Volume2, PlayCircle } from 'lucide-react';

// AI 서비스 목록
const aiServices = [
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/', color: 'bg-blue-500 hover:bg-blue-600', icon: '✨' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com/', color: 'bg-green-500 hover:bg-green-600', icon: '🤖' },
];

// 코스 정보
const courseInfo: Record<string, { title: string; icon: string; color: string }> = {
  'ai-understanding': { title: 'AI 시대 이해하기', icon: '🤖', color: 'from-blue-500 to-indigo-500' },
  'career-exploration': { title: 'AI와 함께하는 진로 탐색', icon: '🎯', color: 'from-teal-500 to-cyan-500' },
  'mbti-career': { title: 'MBTI로 알아보는 직업', icon: '🧠', color: 'from-indigo-500 to-purple-500' },
  'future-jobs': { title: '미래 유망 직종 안내', icon: '🚀', color: 'from-orange-500 to-red-500' },
  'ai-tools': { title: 'AI 도구 활용법', icon: '💬', color: 'from-emerald-500 to-teal-500' },
};

// ============================================
// 레슨별 프롬프트 데이터
// ============================================
const lessonPrompts: Record<string, Record<number, { title: string; subtitle: string; prompts: { id: number; title: string; prompt: string }[] }>> = {
  // ============================================
  // AI 시대 이해하기
  // ============================================
  'ai-understanding': {
    1: {
      title: 'AI란 무엇인가?',
      subtitle: '인공지능의 정의와 우리 일상 속 AI를 이해합니다.',
      prompts: [
        {
          id: 1,
          title: 'AI의 기본 개념 이해하기',
          prompt: `인공지능(AI)에 대해 쉽게 설명해주세요.

다음 내용을 포함해서 설명해주세요:
1. AI(인공지능)란 무엇인가요?
2. AI는 어떻게 작동하나요? (간단히)
3. 머신러닝과 딥러닝의 차이는 무엇인가요?
4. AI가 사람과 다른 점은 무엇인가요?

초등학생도 이해할 수 있게 쉬운 비유와 예시를 들어서 설명해주세요.
답변을 읽어줄 때 자연스럽게 들리도록 대화체로 작성해주세요.`,
        },
        {
          id: 2,
          title: '일상 속 AI 찾아보기',
          prompt: `우리 일상생활에서 사용되는 AI 사례를 알려주세요.

다음 분야별로 3가지씩 예시를 들어주세요:
1. 스마트폰에서 사용하는 AI
2. 집에서 사용하는 AI (스마트홈)
3. 학교나 학습에서 사용하는 AI
4. 게임이나 엔터테인먼트의 AI

각 사례마다:
- 어떤 AI 기술이 사용되는지
- 우리에게 어떤 도움을 주는지
설명해주세요.

학부모가 자녀에게 설명해줄 수 있도록 쉽고 재미있게 작성해주세요.`,
        },
        {
          id: 3,
          title: 'AI의 장점과 주의할 점',
          prompt: `AI를 사용할 때 알아야 할 장점과 주의할 점을 알려주세요.

1. AI의 좋은 점 (5가지)
   - 각각 구체적인 예시와 함께

2. AI 사용 시 주의할 점 (5가지)
   - 왜 주의해야 하는지 이유와 함께

3. 자녀와 함께 AI를 올바르게 사용하는 방법
   - 부모가 할 수 있는 것
   - 자녀에게 알려줄 것

학부모 입장에서 자녀에게 AI 교육을 시킬 때 참고할 수 있도록 작성해주세요.`,
        },
      ],
    },
    2: {
      title: 'AI의 역사와 발전',
      subtitle: 'AI의 탄생부터 현재까지의 발전 과정을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: 'AI의 탄생과 초기 역사',
          prompt: `인공지능(AI)의 역사에 대해 알려주세요.

다음 내용을 시대순으로 설명해주세요:
1. AI라는 용어는 언제, 누가 처음 만들었나요?
2. 1950-1970년대 초기 AI 연구는 어땠나요?
3. "AI의 겨울"이란 무엇이고 왜 발생했나요?
4. AI가 다시 발전하게 된 계기는 무엇인가요?

각 시대별 주요 사건과 인물을 포함해서 설명해주세요.
자녀에게 이야기해줄 수 있도록 재미있는 스토리 형식으로 작성해주세요.`,
        },
        {
          id: 2,
          title: '현대 AI의 발전',
          prompt: `2010년대 이후 현대 AI의 발전에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 딥러닝의 등장과 발전
2. AlphaGo와 이세돌의 바둑 대결 (2016년)
3. ChatGPT의 등장과 영향 (2022년)
4. 현재 AI가 할 수 있는 놀라운 것들

각 사건이 왜 중요한지, 우리 생활에 어떤 변화를 가져왔는지 설명해주세요.
중학생이 이해할 수 있는 수준으로 작성해주세요.`,
        },
        {
          id: 3,
          title: 'AI의 미래 전망',
          prompt: `AI의 미래는 어떻게 될까요?

다음 주제에 대해 설명해주세요:
1. 앞으로 5-10년 후 AI는 어떻게 발전할까요?
2. AI가 바꿀 우리의 일상생활
3. AI와 인간이 함께 일하는 미래
4. AI 발전에서 주의해야 할 점

미래에 대한 희망적인 전망과 함께, 균형 잡힌 시각을 제시해주세요.
자녀와 미래에 대해 대화할 때 활용할 수 있도록 작성해주세요.`,
        },
      ],
    },
    3: {
      title: 'AI가 할 수 있는 것들',
      subtitle: '이미지 인식, 자연어 처리, 추천 시스템 등 AI의 능력을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: 'AI의 눈 - 이미지 인식',
          prompt: `AI의 이미지 인식 기술에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 이미지 인식이란 무엇인가요?
2. AI는 어떻게 사진 속 물체를 인식하나요?
3. 이미지 인식이 사용되는 실제 사례
   - 얼굴 인식 (스마트폰 잠금해제)
   - 자율주행 자동차
   - 의료 영상 분석
   - 보안 카메라
4. 이미지 인식의 한계와 주의점

쉬운 비유를 들어 설명해주세요. 예를 들어 "AI가 사진을 보는 것은 마치..."처럼요.`,
        },
        {
          id: 2,
          title: 'AI의 귀와 입 - 음성/언어 처리',
          prompt: `AI의 음성 인식과 자연어 처리 기술에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 음성 인식이란? (AI가 말을 알아듣는 방법)
2. 자연어 처리란? (AI가 글을 이해하는 방법)
3. 이 기술이 사용되는 곳
   - 시리, 빅스비, 구글 어시스턴트
   - 번역 앱
   - 챗봇과 ChatGPT
   - 음성으로 글쓰기
4. AI 번역의 발전 (과거 vs 현재)

일상에서 아이들이 직접 경험할 수 있는 예시를 많이 포함해주세요.`,
        },
        {
          id: 3,
          title: 'AI의 추천 - 나를 아는 AI',
          prompt: `AI의 추천 시스템에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 추천 시스템이란 무엇인가요?
2. AI는 어떻게 내 취향을 알아낼까요?
3. 추천 시스템이 사용되는 곳
   - 유튜브 영상 추천
   - 넷플릭스 영화 추천
   - 쇼핑몰 상품 추천
   - 음악 앱 노래 추천
4. 추천 시스템의 좋은 점과 주의할 점
   - 필터 버블이란?
   - 건강한 콘텐츠 소비 방법

자녀가 유튜브나 넷플릭스를 사용할 때 알아야 할 내용을 포함해주세요.`,
        },
      ],
    },
    4: {
      title: 'AI와 일상생활',
      subtitle: '스마트홈, 자율주행, 개인비서 등 일상 속 AI를 살펴봅니다.',
      prompts: [
        {
          id: 1,
          title: '스마트홈과 AI',
          prompt: `스마트홈에서 사용되는 AI 기술에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 스마트홈이란 무엇인가요?
2. 집에서 사용하는 AI 기기들
   - AI 스피커 (알렉사, 구글홈, 카카오미니)
   - 스마트 TV
   - 로봇 청소기
   - 스마트 냉장고
   - 스마트 조명/에어컨
3. 스마트홈이 주는 편리함
4. 스마트홈 사용 시 주의할 점 (개인정보, 보안)

가정에서 실제로 활용할 수 있는 팁도 포함해주세요.`,
        },
        {
          id: 2,
          title: '자율주행과 AI',
          prompt: `자율주행 자동차와 AI 기술에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 자율주행 자동차란 무엇인가요?
2. 자율주행에 사용되는 AI 기술
   - 카메라와 센서로 주변 인식
   - 장애물 감지와 회피
   - 경로 계획
3. 자율주행의 단계 (레벨 1~5)
4. 현재 자율주행 기술 수준
5. 자율주행의 장점과 앞으로의 과제

테슬라, 현대차 등 실제 자동차 회사의 예시를 들어주세요.
미래에 자녀가 운전할 때 어떤 세상이 될지 상상해볼 수 있게 해주세요.`,
        },
        {
          id: 3,
          title: 'AI 개인비서와 함께하는 하루',
          prompt: `AI 개인비서를 활용한 하루 일과를 시나리오로 만들어주세요.

다음 형식으로 작성해주세요:

[아침]
- 기상: AI가 어떻게 도와주나요?
- 날씨/일정 확인
- 출근/등교 준비

[낮]
- 업무/학습에서 AI 활용
- 점심 추천
- 일정 관리

[저녁]
- 귀가
- 저녁 활동 (요리, 운동, 취미)
- 취침 준비

각 상황에서 시리, 구글 어시스턴트, ChatGPT 등을 어떻게 활용하는지 구체적으로 알려주세요.
가족이 함께 해볼 수 있는 활동도 포함해주세요.`,
        },
      ],
    },
    5: {
      title: 'AI 시대 준비하기',
      subtitle: 'AI 리터러시와 미래 역량을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: 'AI 리터러시란?',
          prompt: `AI 리터러시(AI 문해력)에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. AI 리터러시란 무엇인가요?
2. 왜 AI 리터러시가 중요한가요?
3. AI 리터러시의 핵심 요소
   - AI가 무엇인지 이해하기
   - AI의 장단점 알기
   - AI를 올바르게 사용하기
   - AI의 결과를 비판적으로 보기
4. AI 리터러시를 키우는 방법

부모와 자녀가 함께 AI 리터러시를 높일 수 있는 활동을 제안해주세요.`,
        },
        {
          id: 2,
          title: 'AI 시대 필요한 역량',
          prompt: `AI 시대에 필요한 역량에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. AI가 대체하기 어려운 인간의 능력
   - 창의성
   - 공감 능력
   - 비판적 사고
   - 복잡한 문제 해결
   - 소통과 협력

2. AI와 함께 일하기 위해 필요한 능력
   - AI 도구 활용 능력
   - 데이터 이해 능력
   - 지속적 학습 능력

3. 자녀의 미래 역량을 키우는 방법
   - 가정에서 할 수 있는 것
   - 추천 활동과 경험

구체적인 예시와 함께 설명해주세요.`,
        },
        {
          id: 3,
          title: '자녀와 함께하는 AI 교육',
          prompt: `자녀에게 AI 교육을 시키는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 연령별 AI 교육 방법
   - 초등학교 저학년 (7-9세)
   - 초등학교 고학년 (10-12세)
   - 중학생 (13-15세)
   - 고등학생 (16-18세)

2. 집에서 할 수 있는 AI 체험 활동
   - 무료로 사용할 수 있는 AI 도구
   - 함께 해볼 수 있는 프로젝트

3. AI 관련 진로 탐색
   - AI 관련 직업 소개
   - 필요한 공부와 준비

4. 부모가 알아야 할 AI 교육 팁

실천 가능한 구체적인 활동과 리소스를 포함해주세요.`,
        },
      ],
    },
  },

  // ============================================
  // AI와 함께하는 진로 탐색
  // ============================================
  'career-exploration': {
    1: {
      title: '진로란 무엇인가?',
      subtitle: '진로의 정의와 직업과의 차이를 이해합니다.',
      prompts: [
        {
          id: 1,
          title: '진로와 직업의 차이',
          prompt: `진로와 직업의 차이에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 진로(Career)란 무엇인가요?
2. 직업(Job)이란 무엇인가요?
3. 진로와 직업의 차이점
4. 왜 진로가 직업보다 더 넓은 개념인가요?

예시를 들어 설명해주세요:
- 의사가 되고 싶은 아이의 진로 vs 직업
- 게임을 좋아하는 아이의 다양한 진로 가능성

학부모가 자녀와 진로 대화를 시작할 때 활용할 수 있도록 작성해주세요.`,
        },
        {
          id: 2,
          title: '진로 발달 단계',
          prompt: `자녀의 나이에 따른 진로 발달 단계를 설명해주세요.

다음 단계별로 설명해주세요:
1. 성장기 (초등학생)
   - 이 시기의 특징
   - 부모가 해줄 수 있는 것

2. 탐색기 (중학생)
   - 이 시기의 특징
   - 부모가 해줄 수 있는 것

3. 확립기 (고등학생)
   - 이 시기의 특징
   - 부모가 해줄 수 있는 것

각 단계에서 부모가 주의할 점과 효과적인 지원 방법을 포함해주세요.`,
        },
        {
          id: 3,
          title: '진로 탐색의 중요성',
          prompt: `진로 탐색이 왜 중요한지 설명해주세요.

다음 내용을 포함해주세요:
1. 진로 탐색을 해야 하는 이유
2. 진로 탐색을 하지 않으면 어떤 문제가 생길 수 있나요?
3. 성공적인 진로 탐색의 요소
   - 자기 이해
   - 직업 세계 이해
   - 다양한 경험
4. 부모의 역할

실제 사례나 연구 결과를 포함하면 좋겠습니다.
부모가 너무 개입하는 것과 적절히 지원하는 것의 차이도 설명해주세요.`,
        },
      ],
    },
    2: {
      title: 'AI로 직업 세계 탐험',
      subtitle: 'AI를 활용해 다양한 직업 정보를 탐색합니다.',
      prompts: [
        {
          id: 1,
          title: 'AI로 직업 정보 검색하기',
          prompt: `AI를 활용해 직업 정보를 검색하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. AI에게 직업 정보를 물어보는 좋은 질문 예시 10가지
   예: "수의사가 하는 일을 자세히 알려줘"

2. AI 답변을 활용하는 방법
   - 어떤 정보를 확인해야 하는지
   - 추가로 질문할 내용

3. 주의할 점
   - AI 정보의 한계
   - 확인이 필요한 부분

자녀와 함께 직업 탐색을 할 때 바로 사용할 수 있는 질문 템플릿을 제공해주세요.`,
        },
        {
          id: 2,
          title: '관심 직업 심층 탐구',
          prompt: `우리 아이가 관심 있는 직업을 AI로 심층 탐구하는 방법을 알려주세요.

아이가 관심 있는 직업 하나를 정했다고 가정하고, 다음 질문들에 대한 답을 AI에게 물어보는 방법을 알려주세요:

1. 이 직업의 하루 일과는 어떤가요?
2. 이 직업이 되려면 어떤 공부를 해야 하나요?
3. 이 직업의 좋은 점과 힘든 점은?
4. 이 직업의 미래 전망은?
5. 비슷한 직업에는 뭐가 있나요?
6. 이 직업을 가진 사람의 인터뷰를 AI로 시뮬레이션

각 질문에 대한 구체적인 프롬프트 예시를 제공해주세요.`,
        },
        {
          id: 3,
          title: '미래 직업 탐색하기',
          prompt: `AI와 함께 미래에 새로 생길 직업을 탐색해보세요.

다음 내용을 AI에게 물어보는 프롬프트를 만들어주세요:

1. 10년 후에 새로 생길 것 같은 직업 10가지
2. 현재 있지만 크게 성장할 직업 10가지
3. AI 때문에 사라지거나 변할 직업
4. 우리 아이 세대가 가장 많이 할 직업

각 직업에 대해:
- 어떤 일을 하는지
- 왜 그 직업이 중요해지는지
- 준비하려면 무엇을 해야 하는지

포함해서 답변하도록 프롬프트를 작성해주세요.`,
        },
      ],
    },
    3: {
      title: '자녀 성향 파악하기',
      subtitle: '흥미, 적성, 가치관을 발견합니다.',
      prompts: [
        {
          id: 1,
          title: '자녀의 흥미 발견하기',
          prompt: `자녀의 흥미를 파악하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 흥미란 무엇인가요?
2. 자녀의 흥미를 관찰하는 방법
   - 어떤 활동을 할 때 시간 가는 줄 모르나요?
   - 스스로 찾아서 하는 것은 무엇인가요?
   - 이야기할 때 눈이 반짝이는 주제는?

3. 흥미 유형 (홀랜드 이론)
   - 현실형, 탐구형, 예술형, 사회형, 기업형, 관습형

4. 흥미를 진로와 연결하는 방법

자녀의 흥미를 파악하기 위한 질문 리스트 20개를 제공해주세요.`,
        },
        {
          id: 2,
          title: '자녀의 적성 발견하기',
          prompt: `자녀의 적성을 파악하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 적성이란 무엇인가요? (흥미와의 차이)
2. 자녀의 적성을 관찰하는 방법
   - 어떤 것을 빨리 배우나요?
   - 어떤 활동에서 성취감을 느끼나요?
   - 다른 아이들보다 잘하는 것은?

3. 다중지능 이론으로 보는 적성
   - 언어지능, 논리수학지능, 공간지능 등

4. 적성과 진로의 연결

자녀의 적성을 파악할 수 있는 관찰 포인트와 활동을 제안해주세요.`,
        },
        {
          id: 3,
          title: '자녀의 가치관 이해하기',
          prompt: `자녀의 직업 가치관을 파악하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 직업 가치관이란 무엇인가요?
2. 주요 직업 가치관 유형
   - 경제적 보상
   - 안정성
   - 사회적 인정
   - 자아실현
   - 사회 공헌
   - 워라밸

3. 자녀와 가치관에 대해 대화하는 방법
4. 가치관과 직업 선택의 관계

자녀와 가치관에 대해 이야기할 수 있는 질문 10가지와
함께 해볼 수 있는 활동을 제안해주세요.`,
        },
      ],
    },
    4: {
      title: '진로 대화의 기술',
      subtitle: '경청, 질문, 공감의 기술을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: '경청하는 방법',
          prompt: `자녀의 진로 이야기를 경청하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 왜 경청이 중요한가요?
2. 경청을 방해하는 부모의 습관
   - 끼어들기
   - 판단하기
   - 조언하기 급급함

3. 효과적인 경청 기술
   - 눈 맞추기
   - 맞장구치기
   - 요약해서 되물어보기
   - 감정 반영하기

4. 경청 연습 방법

구체적인 대화 예시를 "나쁜 예"와 "좋은 예"로 비교해서 보여주세요.`,
        },
        {
          id: 2,
          title: '좋은 질문하기',
          prompt: `자녀에게 진로 관련 좋은 질문을 하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 닫힌 질문 vs 열린 질문
2. 피해야 할 질문 유형
   - 유도 질문
   - 비난이 담긴 질문
   - 비교하는 질문

3. 좋은 질문의 예시 20가지
   - 꿈과 목표에 대한 질문
   - 흥미와 관심에 대한 질문
   - 고민과 걱정에 대한 질문
   - 결정과 선택에 대한 질문

4. 질문 후 기다리는 자세

상황별로 사용할 수 있는 질문 스크립트를 제공해주세요.`,
        },
        {
          id: 3,
          title: '공감하며 대화하기',
          prompt: `자녀와 공감하며 진로 대화를 나누는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 공감이란 무엇인가요?
2. 공감과 동정의 차이
3. 공감 표현 방법
   - 감정 인정하기
   - "~구나" 표현 사용하기
   - 경험 나누기

4. 어려운 상황에서의 공감
   - 자녀가 진로를 못 정할 때
   - 부모 생각과 다를 때
   - 비현실적인 꿈을 말할 때

5. 공감 대화 연습

실제 상황별 대화 시나리오와 모범 답변을 제공해주세요.`,
        },
      ],
    },
    5: {
      title: 'AI와 함께 진로 시뮬레이션',
      subtitle: 'AI를 활용해 직업을 간접 체험합니다.',
      prompts: [
        {
          id: 1,
          title: 'AI로 직업 하루 체험하기',
          prompt: `AI와 함께 특정 직업의 하루를 체험하는 롤플레이를 해주세요.

다음 형식으로 진행해주세요:

"저는 [직업명]이 되어보고 싶어요. 이 직업의 하루를 체험해볼 수 있게 해주세요.

1. 아침 출근부터 시작해서
2. 오전에 하는 일
3. 점심시간
4. 오후에 하는 일
5. 퇴근까지

각 상황에서 제가 결정을 내려야 하는 순간을 만들어주시고,
제가 선택하면 그에 따른 결과를 알려주세요.

마치 게임처럼 진행해주세요!"

위와 같은 프롬프트를 의사, 교사, 프로그래머, 유튜버 등
다양한 직업 버전으로 만들어주세요.`,
        },
        {
          id: 2,
          title: 'AI 직업인 인터뷰',
          prompt: `AI가 특정 직업을 가진 사람 역할을 해서 인터뷰하는 방법을 알려주세요.

다음과 같은 프롬프트를 만들어주세요:

"당신은 10년 경력의 [직업명]입니다.
제가 이 직업에 관심이 있는 학생이라고 생각하고 인터뷰에 응해주세요.

제가 질문하면 실제 [직업명]처럼 현실적으로 답변해주세요.
좋은 점만 말하지 말고, 힘든 점도 솔직하게 알려주세요."

그리고 인터뷰에서 물어보면 좋은 질문 15가지를 알려주세요:
- 이 일을 시작하게 된 계기
- 하루 일과
- 보람있는 순간
- 힘든 점
- 필요한 능력
- 조언 등`,
        },
        {
          id: 3,
          title: 'AI로 진로 상담받기',
          prompt: `AI를 진로 상담사로 활용하는 방법을 알려주세요.

다음과 같은 프롬프트를 만들어주세요:

"당신은 전문 진로 상담사입니다.
저희 아이(또는 저)의 진로 상담을 해주세요.

아이 정보:
- 나이: [나이]
- 좋아하는 것: [취미/관심사]
- 잘하는 것: [장점/특기]
- 학교에서 좋아하는 과목: [과목]
- 꿈꾸는 것: [희망사항]

위 정보를 바탕으로:
1. 아이의 성향 분석
2. 어울릴 것 같은 직업 5가지와 이유
3. 더 탐색해보면 좋을 분야
4. 지금부터 해볼 수 있는 활동
을 상담해주세요."

이런 프롬프트를 상황별로 여러 버전 만들어주세요.`,
        },
      ],
    },
  },

  // ============================================
  // MBTI로 알아보는 직업
  // ============================================
  'mbti-career': {
    1: {
      title: 'MBTI란 무엇인가?',
      subtitle: '4가지 선호지표와 16가지 유형을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: 'MBTI 기본 이해',
          prompt: `MBTI 성격유형에 대해 쉽게 설명해주세요.

다음 내용을 포함해주세요:
1. MBTI란 무엇인가요?
2. MBTI는 어떻게 만들어졌나요?
3. 4가지 선호 지표 설명
   - E(외향) vs I(내향)
   - S(감각) vs N(직관)
   - T(사고) vs F(감정)
   - J(판단) vs P(인식)

각 지표를 일상생활 예시로 쉽게 설명해주세요.
예: "E는 친구들과 놀면 에너지가 충전되고, I는 혼자 있으면 충전돼요"`,
        },
        {
          id: 2,
          title: '16가지 MBTI 유형',
          prompt: `16가지 MBTI 유형을 간단히 설명해주세요.

각 유형에 대해:
- 유형 이름 (예: ENFP - 재기발랄한 활동가)
- 핵심 특징 2-3가지
- 대표적인 강점
- 어울리는 활동

16가지 유형:
ISTJ, ISFJ, INFJ, INTJ
ISTP, ISFP, INFP, INTP
ESTP, ESFP, ENFP, ENTP
ESTJ, ESFJ, ENFJ, ENTJ

표 형태로 정리해주세요.`,
        },
        {
          id: 3,
          title: 'MBTI 활용 시 주의점',
          prompt: `MBTI를 올바르게 이해하고 활용하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. MBTI의 장점
   - 자기 이해
   - 타인 이해
   - 소통에 도움

2. MBTI의 한계와 주의점
   - 사람을 16개로 나눌 수 없음
   - 변할 수 있음
   - 절대적 기준이 아님

3. MBTI를 진로 탐색에 활용하는 올바른 방법
4. 자녀에게 MBTI를 설명할 때 주의할 점

균형 잡힌 시각으로 설명해주세요.`,
        },
      ],
    },
    2: {
      title: '나의 MBTI 알아보기',
      subtitle: 'MBTI 검사와 결과 해석 방법을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: '간단한 MBTI 진단',
          prompt: `간단한 MBTI 자가진단을 할 수 있게 도와주세요.

각 지표별로 5개씩 질문을 만들어주세요:

1. E vs I (5문항)
2. S vs N (5문항)
3. T vs F (5문항)
4. J vs P (5문항)

각 질문에 A, B 선택지를 주고,
A를 많이 선택하면 어떤 유형인지 알려주세요.

질문은 일상생활에서 쉽게 답할 수 있는 것으로 해주세요.
부모와 자녀가 함께 해볼 수 있도록 만들어주세요.`,
        },
        {
          id: 2,
          title: 'MBTI 결과 해석하기',
          prompt: `MBTI 검사 결과를 해석하는 방법을 알려주세요.

제 MBTI 유형이 [유형]이라고 가정하고 설명해주세요:

1. 이 유형의 전체적인 특징
2. 강점 5가지
3. 약점 또는 성장 포인트 3가지
4. 이 유형이 행복할 때
5. 이 유형이 스트레스 받을 때
6. 다른 유형과의 관계

[유형] 자리에 16가지 유형 중 하나를 넣어서 물어볼 수 있게
프롬프트 템플릿을 만들어주세요.`,
        },
        {
          id: 3,
          title: '가족 MBTI 비교하기',
          prompt: `가족 구성원의 MBTI를 비교 분석해주세요.

다음 정보를 입력하면 분석해주세요:
- 아버지 MBTI: [   ]
- 어머니 MBTI: [   ]
- 자녀 MBTI: [   ]

분석 내용:
1. 각 가족 구성원의 특성
2. 서로 잘 맞는 부분
3. 갈등이 생길 수 있는 부분
4. 더 좋은 소통을 위한 팁
5. 각자의 역할에서 강점

가족 간 이해를 높일 수 있는 활동도 제안해주세요.`,
        },
      ],
    },
    3: {
      title: '자녀의 MBTI 파악하기',
      subtitle: '행동 관찰을 통해 자녀의 성향을 파악합니다.',
      prompts: [
        {
          id: 1,
          title: '행동으로 보는 E/I',
          prompt: `자녀의 외향(E)/내향(I) 성향을 파악하는 방법을 알려주세요.

다음 상황에서 자녀가 어떻게 행동하는지 관찰 포인트를 알려주세요:

1. 새로운 사람을 만날 때
2. 친구들과 놀고 난 후
3. 발표나 공연을 할 때
4. 혼자 있는 시간에
5. 모르는 것이 있을 때
6. 주말에 하고 싶은 것을 물었을 때

각 상황에서:
- E 성향 아이의 특징
- I 성향 아이의 특징
을 비교해서 설명해주세요.`,
        },
        {
          id: 2,
          title: '행동으로 보는 S/N, T/F',
          prompt: `자녀의 감각(S)/직관(N), 사고(T)/감정(F) 성향을 파악하는 방법을 알려주세요.

S vs N 관찰 포인트:
1. 책을 읽거나 이야기를 들을 때
2. 새로운 것을 배울 때
3. 미래에 대해 이야기할 때
4. 문제를 해결할 때
5. 그림을 그리거나 글을 쓸 때

T vs F 관찰 포인트:
1. 결정을 내릴 때
2. 친구와 갈등이 있을 때
3. 칭찬하거나 지적할 때 반응
4. 영화나 드라마를 볼 때
5. 규칙에 대해 이야기할 때

각 상황별 특징을 설명해주세요.`,
        },
        {
          id: 3,
          title: '행동으로 보는 J/P',
          prompt: `자녀의 판단(J)/인식(P) 성향을 파악하는 방법을 알려주세요.

J vs P 관찰 포인트:
1. 숙제를 할 때
2. 방 정리 상태
3. 약속 시간을 지키는지
4. 계획 세우는 것을 좋아하는지
5. 갑작스러운 변화에 반응
6. 여행 준비를 할 때
7. 하루 일과가 규칙적인지
8. 마감이 있을 때 행동

각 상황에서:
- J 성향 아이의 특징
- P 성향 아이의 특징
을 비교하고,

각 성향의 아이를 대할 때 부모가 주의할 점도 알려주세요.`,
        },
      ],
    },
    4: {
      title: 'MBTI 유형별 적합 직업',
      subtitle: '16가지 유형별 어울리는 직업군을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: '분석가형(NT) 직업',
          prompt: `분석가형 MBTI(INTJ, INTP, ENTJ, ENTP)에 어울리는 직업을 알려주세요.

각 유형별로:
1. 핵심 특성 요약
2. 직업 선택 시 중요하게 여기는 것
3. 잘 어울리는 직업 10가지
4. 피하면 좋은 직업 환경
5. 진로 준비 조언

실제 그 유형의 유명인 예시도 포함해주세요.
자녀가 이 유형이라면 부모가 어떻게 지원할지도 알려주세요.`,
        },
        {
          id: 2,
          title: '외교관형(NF) 직업',
          prompt: `외교관형 MBTI(INFJ, INFP, ENFJ, ENFP)에 어울리는 직업을 알려주세요.

각 유형별로:
1. 핵심 특성 요약
2. 직업 선택 시 중요하게 여기는 것
3. 잘 어울리는 직업 10가지
4. 피하면 좋은 직업 환경
5. 진로 준비 조언

실제 그 유형의 유명인 예시도 포함해주세요.
자녀가 이 유형이라면 부모가 어떻게 지원할지도 알려주세요.`,
        },
        {
          id: 3,
          title: '관리자형(SJ) & 탐험가형(SP) 직업',
          prompt: `관리자형(ISTJ, ISFJ, ESTJ, ESFJ)과 탐험가형(ISTP, ISFP, ESTP, ESFP)에 어울리는 직업을 알려주세요.

각 유형별로:
1. 핵심 특성 요약
2. 직업 선택 시 중요하게 여기는 것
3. 잘 어울리는 직업 10가지
4. 피하면 좋은 직업 환경
5. 진로 준비 조언

8가지 유형 모두 다뤄주세요.
표 형태로 정리하면 좋겠습니다.`,
        },
      ],
    },
    5: {
      title: 'AI로 MBTI 진로 상담',
      subtitle: 'AI를 활용해 맞춤형 진로 상담을 받습니다.',
      prompts: [
        {
          id: 1,
          title: 'MBTI 기반 진로 상담',
          prompt: `AI 진로 상담사로서 MBTI 기반 상담을 해주세요.

저(또는 제 자녀)의 정보:
- MBTI: [유형]
- 나이: [나이]
- 관심 분야: [분야]
- 고민: [고민 내용]

위 정보를 바탕으로:
1. MBTI 특성 분석
2. 이 유형의 강점을 살릴 수 있는 직업 5가지
3. 관심 분야와 MBTI의 적합성 분석
4. 구체적인 진로 로드맵 제안
5. 주의해야 할 점

전문 상담사처럼 따뜻하고 구체적으로 상담해주세요.`,
        },
        {
          id: 2,
          title: 'MBTI 학습 스타일 상담',
          prompt: `MBTI 유형별 효과적인 학습 방법을 알려주세요.

자녀의 MBTI: [유형]

다음 내용을 상담해주세요:
1. 이 유형의 학습 특성
2. 효과적인 공부 방법
3. 집중력을 높이는 환경
4. 시험 준비 전략
5. 부모의 지원 방법
6. 피해야 할 학습 방법

구체적인 실천 팁을 포함해주세요.
예: "INTP라면 왜?라는 질문에 답을 찾을 때 동기부여가 됩니다"`,
        },
        {
          id: 3,
          title: 'MBTI 진로 로드맵',
          prompt: `MBTI 유형에 맞는 진로 로드맵을 만들어주세요.

정보:
- 자녀 MBTI: [유형]
- 현재 학년: [학년]
- 희망 진로: [진로]
- 강점: [강점]

다음을 포함한 로드맵을 만들어주세요:

[초등학교]
- 해볼 활동
- 키워야 할 능력
- 부모 지원 방법

[중학교]
- 해볼 활동
- 탐색할 분야
- 부모 지원 방법

[고등학교]
- 구체적 준비
- 진학/진로 선택
- 부모 지원 방법

MBTI 특성을 고려한 맞춤형 조언을 해주세요.`,
        },
      ],
    },
  },

  // ============================================
  // 미래 유망 직종 안내
  // ============================================
  'future-jobs': {
    1: {
      title: '일자리의 미래',
      subtitle: '4차 산업혁명과 자동화가 가져올 변화를 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: '4차 산업혁명이란?',
          prompt: `4차 산업혁명에 대해 쉽게 설명해주세요.

다음 내용을 포함해주세요:
1. 1차~4차 산업혁명의 역사
   - 각 시대의 핵심 기술
   - 생활의 변화

2. 4차 산업혁명의 핵심 기술
   - AI, IoT, 빅데이터
   - 로봇, 3D 프린팅
   - 블록체인, 메타버스

3. 우리 생활에 미치는 영향

자녀에게 설명할 수 있도록 쉬운 예시를 들어주세요.`,
        },
        {
          id: 2,
          title: '자동화와 일자리 변화',
          prompt: `자동화로 인한 일자리 변화에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 자동화란 무엇인가요?
2. 자동화로 사라질 가능성이 높은 직업 10가지
   - 왜 사라지는지 이유
3. 자동화되기 어려운 직업의 특징
4. 새로 생기는 직업들
5. 변화에 적응하는 방법

불안하게 하지 말고, 희망적인 관점에서 설명해주세요.
부모가 자녀에게 전할 수 있는 메시지도 포함해주세요.`,
        },
        {
          id: 3,
          title: '미래 사회의 모습',
          prompt: `10-20년 후 미래 사회의 모습을 예측해주세요.

다음 영역별로 설명해주세요:
1. 교육의 변화
   - 학교는 어떻게 변할까?
   - 무엇을 배우게 될까?

2. 일하는 방식의 변화
   - 재택근무, 긱 이코노미
   - 평생 직장 vs 평생 직업

3. 일상생활의 변화
   - 쇼핑, 의료, 교통

4. 새로운 직업들

자녀 세대가 살아갈 미래를 긍정적으로 그려주세요.`,
        },
      ],
    },
    2: {
      title: 'AI 관련 직종',
      subtitle: 'AI 엔지니어, 데이터 사이언티스트 등을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: 'AI 분야 직업 소개',
          prompt: `AI 분야의 다양한 직업을 소개해주세요.

각 직업별로 다음 내용을 포함해주세요:
1. AI 엔지니어
2. 데이터 사이언티스트
3. 머신러닝 엔지니어
4. AI 프로덕트 매니저
5. AI 윤리 전문가
6. AI 트레이너
7. 프롬프트 엔지니어

각 직업에 대해:
- 하는 일
- 필요한 능력
- 되는 방법
- 연봉 수준
- 전망

쉽게 설명해주세요.`,
        },
        {
          id: 2,
          title: 'AI 직업 준비 방법',
          prompt: `AI 관련 직업을 준비하는 방법을 알려주세요.

학년별 로드맵:
1. 초등학생
   - 해볼 수 있는 활동
   - 기를 수 있는 능력
   - 추천 도구/앱

2. 중학생
   - 배울 것들
   - 해볼 프로젝트
   - 대회/활동

3. 고등학생
   - 심화 학습
   - 대학 전공 선택
   - 포트폴리오 준비

코딩을 못해도 AI 분야에서 일할 수 있는 직업도 소개해주세요.`,
        },
        {
          id: 3,
          title: 'AI 시대 필수 역량',
          prompt: `AI 시대에 어떤 직업을 갖든 필요한 역량을 알려주세요.

다음 역량별로 설명해주세요:
1. AI 리터러시
   - 무엇인지
   - 왜 필요한지
   - 기르는 방법

2. 데이터 이해 능력
3. 디지털 협업 능력
4. 창의적 문제해결
5. 비판적 사고
6. 지속적 학습 능력

각 역량을 키우기 위한 구체적인 활동을 제안해주세요.
가정에서 할 수 있는 것 위주로 알려주세요.`,
        },
      ],
    },
    3: {
      title: '그린 & 지속가능 직종',
      subtitle: '친환경 에너지, ESG 관련 직업을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: '그린 직업이란?',
          prompt: `그린 직업(녹색 직업)에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 그린 직업이란 무엇인가요?
2. 왜 그린 직업이 중요해지고 있나요?
   - 기후변화
   - 탄소중립
   - ESG 경영

3. 그린 직업의 종류
   - 에너지 분야
   - 환경 분야
   - 농업/식품 분야
   - 건설/건축 분야

4. 그린 직업의 전망

환경 문제에 관심 있는 자녀에게 동기부여가 될 수 있게 작성해주세요.`,
        },
        {
          id: 2,
          title: '유망 그린 직업 10선',
          prompt: `미래 유망 그린 직업 10가지를 자세히 소개해주세요.

각 직업별로:
1. 직업명
2. 하는 일
3. 필요한 능력/자격
4. 되는 방법 (학과, 자격증)
5. 예상 연봉
6. 성장 전망
7. 이 직업의 매력

다음 직업들을 포함해주세요:
- 신재생에너지 엔지니어
- 탄소배출권 거래 전문가
- ESG 컨설턴트
- 환경영향평가사
- 스마트팜 전문가
- 그린빌딩 설계사
- 순환경제 전문가
- 기후변화 분석가
- 전기차/배터리 엔지니어
- 친환경 패키지 디자이너`,
        },
        {
          id: 3,
          title: '그린 직업 준비하기',
          prompt: `그린 분야 직업을 준비하는 방법을 알려주세요.

1. 초등학생 시기
   - 환경 감수성 키우기
   - 해볼 수 있는 활동

2. 중학생 시기
   - 관련 동아리/대회
   - 봉사 활동
   - 기초 지식 쌓기

3. 고등학생 시기
   - 관련 학과 탐색
   - 전공 선택
   - 활동 경력 쌓기

4. 가정에서 함께 할 수 있는 활동
   - 환경 다큐 시청
   - 분리수거/재활용
   - 에너지 절약 프로젝트

실천 가능한 구체적인 활동을 제안해주세요.`,
        },
      ],
    },
    4: {
      title: '헬스케어 & 바이오',
      subtitle: '원격의료, 유전체 분석 등 의료 혁신 직업을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: '헬스케어의 미래',
          prompt: `미래 헬스케어 산업의 변화를 설명해주세요.

다음 내용을 포함해주세요:
1. 디지털 헬스케어란?
2. 원격의료의 발전
   - 비대면 진료
   - 원격 모니터링
3. AI 의료의 발전
   - AI 진단
   - 수술 로봇
4. 개인 맞춤 의료
   - 유전자 분석
   - 맞춤 치료
5. 웨어러블 건강관리

코로나 이후 더 빨라진 변화와 함께 설명해주세요.`,
        },
        {
          id: 2,
          title: '미래 의료/바이오 직업',
          prompt: `미래 유망 의료/바이오 직업 10가지를 소개해주세요.

각 직업별로:
1. 직업명
2. 하는 일
3. 필요한 전공/자격
4. 전망

다음 직업들을 포함해주세요:
- 디지털 헬스케어 전문가
- 유전 상담사
- 바이오인포매틱스 전문가
- 원격의료 코디네이터
- 의료 AI 개발자
- 줄기세포 연구원
- 의료 로봇 전문가
- 헬스케어 데이터 분석가
- 정밀의료 전문가
- 뇌과학 연구원

의사/간호사 외에도 다양한 진로가 있음을 보여주세요.`,
        },
        {
          id: 3,
          title: '의료/바이오 진로 준비',
          prompt: `의료/바이오 분야 진로를 준비하는 방법을 알려주세요.

1. 적합한 성향
   - 어떤 아이들에게 맞을까?
   - MBTI별 추천 직업

2. 학창시절 준비
   - 중요한 과목
   - 해볼 활동/대회
   - 읽으면 좋은 책

3. 대학 전공 안내
   - 의과대학 외 진로
   - 바이오 관련 학과
   - 융합 전공

4. 취업 후 성장 경로

의대만이 정답이 아님을 보여주시고,
다양한 경로를 제시해주세요.`,
        },
      ],
    },
    5: {
      title: '크리에이터 이코노미',
      subtitle: '콘텐츠 창작, 메타버스, NFT 관련 직업을 알아봅니다.',
      prompts: [
        {
          id: 1,
          title: '크리에이터 이코노미란?',
          prompt: `크리에이터 이코노미에 대해 설명해주세요.

다음 내용을 포함해주세요:
1. 크리에이터 이코노미란 무엇인가요?
2. 왜 이 분야가 성장하고 있나요?
3. 크리에이터의 수입 구조
   - 광고 수익
   - 후원/구독
   - 상품 판매
   - 브랜드 협업
4. 성공한 크리에이터 사례
5. 크리에이터의 현실 (장단점)

유튜버만 있는 게 아니라는 걸 보여주세요.
자녀가 크리에이터가 되고 싶다고 할 때 참고할 정보를 포함해주세요.`,
        },
        {
          id: 2,
          title: '다양한 크리에이터 직업',
          prompt: `다양한 크리에이터 직업을 소개해주세요.

각 직업별로:
1. 하는 일
2. 필요한 능력
3. 시작하는 방법
4. 수입 가능성
5. 성장 경로

다음 직업들을 포함해주세요:
- 유튜버/스트리머
- 인스타그램/틱톡 인플루언서
- 팟캐스터
- 웹툰/웹소설 작가
- 게임 개발자/모더
- 메타버스 크리에이터
- NFT 아티스트
- 온라인 강사/코치
- 뉴스레터 작가
- UGC 크리에이터`,
        },
        {
          id: 3,
          title: '미래 콘텐츠 산업',
          prompt: `메타버스, NFT 등 미래 콘텐츠 산업을 설명해주세요.

다음 내용을 포함해주세요:
1. 메타버스란?
   - 메타버스에서 할 수 있는 일
   - 메타버스 관련 직업

2. NFT와 디지털 자산
   - NFT란 무엇인가?
   - NFT 관련 직업

3. AI와 콘텐츠 창작
   - AI 활용 콘텐츠 제작
   - AI 시대 크리에이터의 역할

4. 자녀가 이 분야에 관심 있다면?
   - 시작하는 방법
   - 부모가 지원할 수 있는 것
   - 주의할 점

긍정적인 면과 함께 현실적인 조언도 해주세요.`,
        },
      ],
    },
  },

  // ============================================
  // AI 도구 활용법
  // ============================================
  'ai-tools': {
    1: {
      title: 'Gemini 시작하기',
      subtitle: 'Google Gemini의 기본 사용법을 익힙니다.',
      prompts: [
        {
          id: 1,
          title: 'Gemini 소개와 특징',
          prompt: `Google Gemini에 대해 자세히 설명해주세요.

다음 내용을 포함해주세요:
1. Gemini란 무엇인가요?
2. Gemini의 주요 특징과 장점
3. ChatGPT와 비교했을 때 차이점
4. Gemini를 무료로 사용하는 방법
5. Google 계정으로 시작하는 방법

학부모가 처음 AI를 사용할 때 참고할 수 있도록 쉽게 설명해주세요.
단계별로 따라할 수 있게 작성해주세요.`,
        },
        {
          id: 2,
          title: 'Gemini 기본 사용법',
          prompt: `Gemini를 처음 사용하는 분을 위한 기본 사용법을 알려주세요.

다음 내용을 포함해주세요:
1. Gemini 접속 방법 (gemini.google.com)
2. 대화 시작하기
3. 질문하는 방법
4. 답변 읽기와 음성 듣기
5. 새 대화 시작하기
6. 대화 기록 보기

각 단계를 스크린샷 없이도 따라할 수 있도록 자세히 설명해주세요.
모바일과 PC 모두에서 사용하는 방법을 알려주세요.`,
        },
        {
          id: 3,
          title: 'Gemini 활용 팁',
          prompt: `Gemini를 더 잘 활용하는 팁을 알려주세요.

다음 내용을 포함해주세요:
1. 좋은 질문 작성법 (프롬프트 작성 팁)
   - 구체적으로 질문하기
   - 맥락 제공하기
   - 원하는 형식 요청하기

2. Gemini의 유용한 기능
   - 이미지 분석 기능
   - 긴 글 요약하기
   - 번역 기능
   - 코드 설명 요청

3. 주의할 점
   - 정보 검증의 필요성
   - 개인정보 입력 주의

실제 예시와 함께 설명해주세요.`,
        },
      ],
    },
    2: {
      title: 'ChatGPT 시작하기',
      subtitle: 'OpenAI ChatGPT의 기본 사용법을 익힙니다.',
      prompts: [
        {
          id: 1,
          title: 'ChatGPT 소개와 특징',
          prompt: `ChatGPT에 대해 자세히 설명해주세요.

다음 내용을 포함해주세요:
1. ChatGPT란 무엇인가요?
2. ChatGPT의 주요 특징과 장점
3. 무료 버전과 유료 버전(Plus)의 차이
4. 계정 만들기와 시작하는 방법
5. Gemini와 비교했을 때 장단점

학부모가 AI 도구를 선택할 때 참고할 수 있도록 객관적으로 설명해주세요.`,
        },
        {
          id: 2,
          title: 'ChatGPT 기본 사용법',
          prompt: `ChatGPT를 처음 사용하는 분을 위한 기본 사용법을 알려주세요.

다음 내용을 포함해주세요:
1. ChatGPT 접속 방법 (chat.openai.com)
2. 회원가입 또는 로그인
3. 대화 시작하기
4. 질문하고 답변 받기
5. 대화 이어가기
6. 새 채팅 시작하기
7. 이전 대화 찾기

각 단계를 초보자도 따라할 수 있도록 상세히 설명해주세요.`,
        },
        {
          id: 3,
          title: 'ChatGPT 활용 팁',
          prompt: `ChatGPT를 더 잘 활용하는 팁을 알려주세요.

다음 내용을 포함해주세요:
1. 효과적인 질문 방법
   - Role 설정하기 (예: "당신은 전문 요리사입니다")
   - 단계별로 요청하기
   - 예시 제공하기

2. ChatGPT의 유용한 기능
   - 글쓰기 도움받기
   - 학습 자료 만들기
   - 아이디어 브레인스토밍
   - 일정 계획 세우기

3. 한계와 주의사항
   - 최신 정보의 한계
   - 팩트 체크 필요성
   - 개인정보 보호

실제 사용 예시를 들어 설명해주세요.`,
        },
      ],
    },
    3: {
      title: '자녀 학습에 AI 활용하기',
      subtitle: '자녀 교육에 AI를 효과적으로 활용하는 방법을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: 'AI로 숙제 도와주기',
          prompt: `AI를 활용해 자녀의 숙제를 도와주는 방법을 알려주세요.

다음 상황별로 활용법을 설명해주세요:
1. 수학 문제 풀이 도움받기
   - 직접 답을 주지 않고 풀이 과정 설명 요청하기
   - 비슷한 문제로 연습하기

2. 글쓰기 과제 도움받기
   - 아이디어 brainstorming
   - 글 구조 잡기
   - 첨삭 받기

3. 과학/사회 탐구 도움받기
   - 개념 쉽게 설명 요청
   - 추가 자료 찾기

4. 영어 학습 도움받기
   - 단어 설명
   - 문법 교정
   - 영작 연습

주의: AI가 대신 해주는 것이 아니라 학습을 돕는 도구로 사용하는 방법을 강조해주세요.`,
        },
        {
          id: 2,
          title: 'AI로 자녀와 대화하기',
          prompt: `AI를 활용해 자녀와 유익한 대화를 나누는 방법을 알려주세요.

다음 주제별 활용법을 설명해주세요:
1. 진로 탐색 대화
   - "우리 아이가 관심 있는 [분야]에 대해 설명해줘"
   - "이 직업의 하루 일과를 알려줘"

2. 사회 이슈 대화
   - 어려운 뉴스 쉽게 설명받기
   - 다양한 관점 이해하기

3. 과학적 호기심 해결
   - "왜 하늘은 파란색이야?"
   - 실험 아이디어 얻기

4. 역사 이야기
   - 역사적 사건 스토리로 듣기
   - 위인 인터뷰 형식으로 대화

자녀와 함께 AI를 사용하면서 대화를 이어가는 방법도 알려주세요.`,
        },
        {
          id: 3,
          title: 'AI 사용 규칙 정하기',
          prompt: `자녀의 건강한 AI 사용을 위한 가정 규칙을 만드는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 나이별 AI 사용 가이드라인
   - 초등학생: 부모와 함께 사용
   - 중학생: 학습 목적 위주
   - 고등학생: 자율적 사용 + 모니터링

2. 지켜야 할 규칙 예시
   - 개인정보 입력하지 않기
   - 과제에 그대로 복사하지 않기
   - 부적절한 내용 요청하지 않기
   - 사용 시간 정하기

3. 부모의 역할
   - 함께 사용하며 대화하기
   - 비판적 사고 가르치기
   - 정보 검증하는 습관

4. 실천 가능한 가족 규칙 템플릿

가정에서 바로 적용할 수 있는 구체적인 규칙 예시를 제공해주세요.`,
        },
      ],
    },
    4: {
      title: '일상생활에 AI 활용하기',
      subtitle: '요리, 건강, 여행 등 일상에서 AI를 활용합니다.',
      prompts: [
        {
          id: 1,
          title: 'AI로 요리와 식단 관리',
          prompt: `AI를 활용해 요리와 식단 관리를 하는 방법을 알려주세요.

다음 활용법을 설명해주세요:
1. 레시피 추천받기
   - "냉장고에 [재료들]이 있어. 뭘 만들 수 있을까?"
   - "아이들이 좋아하는 건강한 간식 레시피"
   - "30분 안에 만들 수 있는 저녁 메뉴"

2. 식단 계획 세우기
   - 일주일 식단표 만들기
   - 영양 균형 맞추기
   - 예산에 맞는 장보기 리스트

3. 요리 과정 도움받기
   - 요리 용어 설명
   - 대체 재료 추천
   - 조리 시간 조절

4. 특별한 상황
   - 알레르기 고려한 레시피
   - 다이어트 식단
   - 손님 초대 메뉴

실제 프롬프트 예시와 함께 설명해주세요.`,
        },
        {
          id: 2,
          title: 'AI로 여행 계획하기',
          prompt: `AI를 활용해 가족 여행을 계획하는 방법을 알려주세요.

다음 단계별로 설명해주세요:
1. 여행지 선택
   - "가족과 함께 갈 국내 여행지 추천해줘"
   - 계절별, 테마별 추천받기

2. 일정 계획
   - "2박 3일 제주도 여행 일정 짜줘"
   - 아이 나이에 맞는 코스
   - 동선 최적화

3. 실용 정보 수집
   - 맛집 추천
   - 숙소 체크리스트
   - 준비물 리스트
   - 예산 계획

4. 현지에서 활용
   - 관광지 정보 검색
   - 메뉴판 번역
   - 긴급 상황 대처

프롬프트 예시와 함께 설명해주세요.`,
        },
        {
          id: 3,
          title: 'AI로 생산성 높이기',
          prompt: `AI를 활용해 일상의 생산성을 높이는 방법을 알려주세요.

다음 상황별 활용법을 설명해주세요:
1. 글쓰기 도움
   - 이메일 작성
   - 경조사 문자
   - 학교 가정통신문 답장
   - 민원 작성

2. 정보 정리
   - 긴 문서 요약
   - 회의록 정리
   - 비교표 만들기

3. 일정 관리
   - 할 일 목록 정리
   - 우선순위 정하기
   - 시간 계획 세우기

4. 문제 해결
   - 가전제품 고장 진단
   - DIY 방법 안내
   - 분쟁 해결 조언

실제 생활에서 바로 사용할 수 있는 프롬프트 템플릿을 제공해주세요.`,
        },
      ],
    },
    5: {
      title: 'AI 활용 실전 프로젝트',
      subtitle: '배운 내용을 종합하여 실제 프로젝트를 수행합니다.',
      prompts: [
        {
          id: 1,
          title: '가족 프로젝트: AI와 함께하는 독서',
          prompt: `AI를 활용한 가족 독서 프로젝트 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 책 선정하기
   - "초등학생 아이와 함께 읽을 책 추천해줘"
   - 나이별, 관심사별 추천받기

2. 독서 전 활동
   - 책 내용 미리보기
   - 저자 알아보기
   - 배경 지식 쌓기

3. 독서 중 활동
   - 어려운 단어 설명받기
   - 등장인물 분석하기
   - 줄거리 정리하기

4. 독서 후 활동
   - 독후감 구조 잡기
   - 토론 주제 만들기
   - 관련 활동 아이디어

5. 한 달 독서 프로젝트 계획표

자녀와 함께 실천할 수 있는 구체적인 계획을 제시해주세요.`,
        },
        {
          id: 2,
          title: '자기계발: AI로 새로운 것 배우기',
          prompt: `AI를 활용해 새로운 기술이나 취미를 배우는 방법을 알려주세요.

다음 예시로 설명해주세요:
1. 언어 학습
   - AI와 영어/일본어 회화 연습
   - 문법 교정받기
   - 맞춤 학습 계획 세우기

2. 취미 배우기
   - 기타, 피아노 기초 배우기
   - 그림 그리기 가이드
   - 사진 촬영 팁

3. 자격증 준비
   - 학습 계획 세우기
   - 핵심 내용 정리
   - 모의 문제 만들기

4. 운동/건강
   - 홈트레이닝 루틴 만들기
   - 식단 관리
   - 목표 설정과 동기부여

30일 자기계발 프로젝트 템플릿을 제공해주세요.`,
        },
        {
          id: 3,
          title: '가족 AI 활용 계획 세우기',
          prompt: `우리 가족만의 AI 활용 계획을 세우는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 가족 AI 활용 현황 점검
   - 현재 사용하고 있는 AI 도구
   - 잘 활용하고 있는 점
   - 개선할 점

2. 가족별 활용 목표 설정
   - 부모: 업무/일상에서 활용
   - 자녀: 학습/탐구에 활용
   - 함께: 가족 프로젝트

3. 한 달 AI 활용 계획표
   - 주별 목표
   - 함께 하는 시간
   - 개인 학습 시간

4. 활용 규칙 점검표
   - 안전한 사용 수칙
   - 균형 잡힌 활용

5. 성과 기록 템플릿
   - 배운 것
   - 도움된 것
   - 개선할 것

가족이 함께 작성할 수 있는 워크시트 형태로 제공해주세요.`,
        },
      ],
    },
  },
};

export default function ParentLessonPage() {
  const router = useRouter();
  const params = useParams();
  const course = params.course as string;
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAI, setSelectedAI] = useState<string>('gemini');
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(1);

  const lessonInfo = lessonPrompts[course]?.[day];
  const courseDetails = courseInfo[course];
  const selectedAIService = aiServices.find(ai => ai.id === selectedAI);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleCopyPrompt = async (prompt: string, promptId: number) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPromptId(promptId);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const handleOpenAI = async () => {
    // 현재 열린 프롬프트 찾기
    const currentPrompt = lessonInfo?.prompts.find(p => p.id === expandedPrompt);

    if (selectedAIService && currentPrompt) {
      try {
        await navigator.clipboard.writeText(currentPrompt.prompt);
        setCopiedPromptId(currentPrompt.id);
        setTimeout(() => setCopiedPromptId(null), 2000);
      } catch (err) {
        console.error('복사 실패:', err);
      }
      window.open(selectedAIService.url, '_blank');
    } else if (selectedAIService) {
      // 열린 프롬프트가 없으면 첫 번째 프롬프트 복사
      const firstPrompt = lessonInfo?.prompts[0];
      if (firstPrompt) {
        try {
          await navigator.clipboard.writeText(firstPrompt.prompt);
          setCopiedPromptId(firstPrompt.id);
          setTimeout(() => setCopiedPromptId(null), 2000);
        } catch (err) {
          console.error('복사 실패:', err);
        }
      }
      window.open(selectedAIService.url, '_blank');
    }
  };

  if (!lessonInfo || !courseDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 레슨입니다</h1>
          <Link href="/course/parent" className="text-blue-600 hover:underline">학부형 코스로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const maxDay = Object.keys(lessonPrompts[course] || {}).length;
  const prevDay = day > 1 ? day - 1 : null;
  const nextDay = day < maxDay ? day + 1 : null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-white transition px-3 py-2">소개</Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2">소개</Link>
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
            </div>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
          <Link href="/courses" className="text-gray-500 hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/course/parent" className="text-gray-500 hover:text-gray-700">학부형 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/course/parent/${course}`} className="text-gray-500 hover:text-gray-700">{courseDetails.title}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Day {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className={`bg-gradient-to-r ${courseDetails.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{courseDetails.icon}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Day {day}: {lessonInfo.title}</h1>
          <p className="text-white/80">{lessonInfo.subtitle}</p>
        </div>

        {/* 사용법 동영상 (Day 1에서만 표시) */}
        {course === 'ai-understanding' && day === 1 && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-red-500" />
              사용법 안내 동영상
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              처음이시라면 아래 동영상을 먼저 시청해주세요. 3분 만에 학습 방법을 익힐 수 있습니다.
            </p>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/iUvG5qej9ys"
                title="학부형 코스 사용법 안내"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* AI 선택 버튼 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">AI 선택</h2>
          <p className="text-gray-600 text-sm mb-4">
            사용할 AI를 선택하세요. 프롬프트를 복사한 후 AI에게 질문하면 답변을 받을 수 있습니다.
          </p>
          <div className="flex gap-3 mb-4">
            {aiServices.map((ai) => (
              <button
                key={ai.id}
                onClick={() => setSelectedAI(ai.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  selectedAI === ai.id
                    ? `${ai.color} text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{ai.icon}</span>
                {ai.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleOpenAI}
            className={`w-full py-3 ${selectedAIService?.color} text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition`}
          >
            <ExternalLink className="w-5 h-5" />
            {selectedAIService?.name} 열기
          </button>
        </div>

        {/* 학습 안내 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            학습 방법
          </h3>
          <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
            <li>아래 프롬프트에서 "복사하기" 버튼을 클릭하세요</li>
            <li>위의 "{selectedAIService?.name} 열기" 버튼을 눌러 AI 사이트로 이동하세요</li>
            <li>복사한 내용을 AI 입력창에 붙여넣고 전송하세요</li>
            <li>AI의 답변을 읽거나, 음성 읽기 기능을 사용하세요</li>
          </ol>
        </div>

        {/* 프롬프트 카드들 */}
        <div className="space-y-4">
          {lessonInfo.prompts.map((item, idx) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* 프롬프트 헤더 */}
              <button
                onClick={() => setExpandedPrompt(expandedPrompt === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-gray-900">{item.title}</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedPrompt === item.id ? 'rotate-90' : ''}`} />
              </button>

              {/* 프롬프트 내용 */}
              {expandedPrompt === item.id && (
                <div className="px-6 pb-6">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{item.prompt}</pre>
                  </div>
                  <button
                    onClick={() => handleCopyPrompt(item.prompt, item.id)}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                      copiedPromptId === item.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {copiedPromptId === item.id ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        복사 완료!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        프롬프트 복사하기
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 이전/다음 네비게이션 */}
        <div className="flex justify-between items-center mt-8">
          {prevDay ? (
            <Link href={`/course/parent/${course}/lesson/${prevDay}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {prevDay}</span>
            </Link>
          ) : <div />}

          {nextDay ? (
            <Link href={`/course/parent/${course}/lesson/${nextDay}`} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <span>Day {nextDay}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/parent/${course}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <span>코스로 돌아가기</span>
              <CheckCircle className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
