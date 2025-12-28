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
  'find-field': { title: '나에게 맞는 분야 찾기', icon: '🔍', color: 'from-rose-500 to-pink-500' },
  'job-simulation': { title: '직업 체험 시뮬레이션', icon: '🎮', color: 'from-violet-500 to-purple-500' },
  'new-skill': { title: '새 분야 기초 역량', icon: '💪', color: 'from-amber-500 to-orange-500' },
  'roadmap': { title: '전환 로드맵 수립', icon: '🗺️', color: 'from-teal-500 to-cyan-500' },
};

// ============================================
// 레슨별 프롬프트 데이터
// ============================================
const lessonPrompts: Record<string, Record<number, { title: string; subtitle: string; prompts: { id: number; title: string; prompt: string }[] }>> = {
  // ============================================
  // 나에게 맞는 분야 찾기
  // ============================================
  'find-field': {
    1: {
      title: '나의 강점 발견하기',
      subtitle: '숨은 강점을 찾고 경험을 분석합니다.',
      prompts: [
        {
          id: 1,
          title: '숨은 강점 발견하기',
          prompt: `나의 숨은 강점을 발견하도록 도와주세요.

다음 질문들을 통해 나의 강점을 분석해주세요:

1. 과거 경험 분석
   - 어떤 일을 할 때 시간 가는 줄 모르셨나요?
   - 남들보다 쉽게 해내는 일이 있었나요?
   - 칭찬을 많이 받았던 일은 무엇인가요?

2. 강점 유형 파악
   - 분석적 강점 (논리, 데이터, 문제해결)
   - 창의적 강점 (아이디어, 디자인, 표현)
   - 대인관계 강점 (소통, 리더십, 공감)
   - 실행적 강점 (꼼꼼함, 추진력, 끈기)

3. 강점 검증 질문
   - 이 강점이 실제 성과로 이어진 적이 있나요?
   - 다른 사람들도 이것이 나의 강점이라고 인정하나요?

위 질문들에 대해 생각해볼 수 있도록 구체적인 예시와 함께 안내해주세요.
그리고 내가 답변할 수 있도록 질문을 하나씩 해주세요.`,
        },
        {
          id: 2,
          title: '경험에서 배운 것 정리하기',
          prompt: `지금까지의 경험에서 배운 것을 정리하도록 도와주세요.

다음 관점에서 내 경험을 분석해주세요:

1. 직장/업무 경험
   - 어떤 업무를 했고 무엇을 배웠나요?
   - 성공 경험과 실패 경험은?
   - 좋았던 점과 싫었던 점은?

2. 학습/자기개발 경험
   - 어떤 분야를 공부했나요?
   - 쉽게 배운 것과 어려웠던 것은?
   - 계속하고 싶은 학습은?

3. 삶의 경험
   - 취미, 봉사, 여행 등에서 배운 것은?
   - 인생에서 가장 뿌듯했던 순간은?
   - 어떤 상황에서 에너지를 얻나요?

각 질문에 대해 구체적으로 생각해볼 수 있도록 안내해주세요.
내가 하나씩 답변하면 정리해주세요.`,
        },
        {
          id: 3,
          title: '다른 사람의 피드백 수집하기',
          prompt: `다른 사람들로부터 피드백을 수집하는 방법을 알려주세요.

다음 내용을 포함해주세요:

1. 피드백을 구할 대상
   - 가족, 친구
   - 동료, 상사
   - 멘토, 선배

2. 피드백 수집 질문
   - "내가 잘한다고 생각하는 것은?"
   - "내가 할 때 빛나 보이는 일은?"
   - "나에게 어울리는 일은?"
   - "내가 보완하면 좋을 점은?"

3. 피드백 정리 방법
   - 공통적으로 나오는 강점
   - 예상치 못한 강점
   - 개선 필요 영역

4. 피드백 요청 메시지 예시
   - 부담 없이 요청하는 방법
   - 솔직한 답변을 얻는 방법

피드백 요청 메시지 템플릿 3개를 제공해주세요.`,
        },
      ],
    },
    2: {
      title: '흥미와 가치관 탐색',
      subtitle: '나의 흥미 유형과 가치관을 정리합니다.',
      prompts: [
        {
          id: 1,
          title: '흥미 유형 파악하기',
          prompt: `나의 흥미 유형을 파악하도록 도와주세요.

홀랜드 직업 흥미 유형(RIASEC)을 기준으로 분석해주세요:

1. 6가지 흥미 유형 설명
   - R (현실형): 손으로 만들기, 기계, 야외 활동
   - I (탐구형): 연구, 분석, 문제 해결
   - A (예술형): 창작, 표현, 예술적 활동
   - S (사회형): 사람 돕기, 가르치기, 상담
   - E (기업형): 리더십, 설득, 조직 운영
   - C (관습형): 정리, 관리, 체계적 업무

2. 각 유형별 질문
   - 어떤 활동을 할 때 즐거운가요?
   - 어떤 주제에 관심이 많나요?
   - 여가 시간에 무엇을 하나요?

3. 흥미 조합 분석
   - 상위 2-3개 유형 조합
   - 이 조합에 맞는 분야/직업

나의 흥미 유형을 찾을 수 있도록 질문을 해주세요.`,
        },
        {
          id: 2,
          title: '직업 가치관 정리하기',
          prompt: `나의 직업 가치관을 정리하도록 도와주세요.

다음 가치관 항목들의 우선순위를 정해보세요:

1. 보상 관련 가치
   - 높은 연봉
   - 안정적인 수입
   - 성과에 따른 보상

2. 업무 관련 가치
   - 전문성 개발
   - 창의적 업무
   - 자율성과 재량권
   - 도전과 성장

3. 환경 관련 가치
   - 워라밸
   - 유연한 근무
   - 좋은 동료
   - 회사 분위기

4. 의미 관련 가치
   - 사회적 기여
   - 의미 있는 일
   - 인정과 명성

각 가치에 대해 1-5점으로 중요도를 매겨보고,
가장 중요한 3가지를 선택해주세요.
선택을 도울 수 있도록 질문해주세요.`,
        },
        {
          id: 3,
          title: '동기 분석하기',
          prompt: `나를 움직이게 하는 동기를 분석해주세요.

다음 관점에서 동기를 탐색해주세요:

1. 내재적 동기
   - 순수하게 재미있어서 하는 일
   - 성취감을 느끼는 순간
   - 몰입하게 되는 활동

2. 외재적 동기
   - 보상(돈, 인정)이 중요한 정도
   - 경쟁에서 이기고 싶은 마음
   - 남들에게 인정받고 싶은 욕구

3. 동기 패턴 발견
   - 언제 가장 열정적이었나요?
   - 어떤 상황에서 포기하게 되나요?
   - 무엇이 나를 지속하게 하나요?

4. 커리어 전환과 동기
   - 지금 전환을 원하는 진짜 이유
   - 새 분야에서 기대하는 것

나의 동기 패턴을 찾을 수 있도록 질문해주세요.`,
        },
      ],
    },
    3: {
      title: 'AI 시대 유망 분야',
      subtitle: 'AI 시대의 트렌드와 유망 분야를 탐색합니다.',
      prompts: [
        {
          id: 1,
          title: 'AI 시대 트렌드 분석',
          prompt: `AI 시대의 직업/산업 트렌드를 분석해주세요.

다음 내용을 포함해주세요:

1. 성장하는 분야
   - AI/데이터 관련
   - 디지털 전환 관련
   - 헬스케어/바이오
   - 친환경/ESG
   - 콘텐츠/크리에이터

2. 변화하는 직업
   - AI로 대체되는 업무
   - AI와 협업하는 직업
   - 새롭게 생기는 직업

3. 미래 유망 직종 TOP 10
   - 각 직종 설명
   - 필요 역량
   - 진입 방법

4. 트렌드 적용 방법
   - 나의 경험과 연결점
   - 전환 가능성

AI 시대에 유망한 분야를 나의 관심사와 연결해서 분석해주세요.`,
        },
        {
          id: 2,
          title: '미래 직업 탐색하기',
          prompt: `미래에 유망한 직업들을 구체적으로 탐색해주세요.

다음 분야별로 유망 직업을 알려주세요:

1. 기술 분야
   - AI 관련: 프롬프트 엔지니어, AI 트레이너
   - 데이터 관련: 데이터 분석가, 데이터 엔지니어
   - 개발 관련: 클라우드 엔지니어, DevOps

2. 크리에이티브 분야
   - 콘텐츠 크리에이터
   - UX/UI 디자이너
   - 브랜드 마케터

3. 비즈니스 분야
   - 디지털 마케터
   - 프로덕트 매니저
   - 비즈니스 애널리스트

4. 전문서비스 분야
   - 코치/컨설턴트
   - 에듀테크 전문가
   - 헬스케어 관련

각 직업별로:
- 하는 일
- 필요 역량
- 예상 연봉
- 진입 난이도
를 알려주세요.`,
        },
        {
          id: 3,
          title: '성장 분야 심층 분석',
          prompt: `내가 관심 있는 성장 분야를 심층 분석해주세요.

분석할 분야: [내가 관심 있는 분야를 입력하세요]

다음 관점에서 분석해주세요:

1. 시장 현황
   - 시장 규모와 성장률
   - 주요 기업들
   - 국내외 동향

2. 직무 분석
   - 이 분야의 주요 직무
   - 각 직무별 역할
   - 커리어 패스

3. 진입 요건
   - 필수 역량/스킬
   - 선호 경력
   - 자격증/학력

4. 전환자 관점
   - 비전공자 진입 가능성
   - 전환 성공 사례
   - 예상 소요 기간

5. 현실적 조언
   - 장점과 단점
   - 주의할 점
   - 준비 전략

관심 분야에 대해 현실적으로 분석해주세요.`,
        },
      ],
    },
    4: {
      title: '분야별 적합도 평가',
      subtitle: '요구 역량과 나와의 적합도를 평가합니다.',
      prompts: [
        {
          id: 1,
          title: '분야별 요구 역량 파악',
          prompt: `관심 분야별 요구 역량을 파악해주세요.

분석할 분야들: [관심 분야 2-3개를 입력하세요]

각 분야별로 다음을 분석해주세요:

1. 하드 스킬 (기술적 역량)
   - 필수 스킬
   - 우대 스킬
   - 학습 난이도

2. 소프트 스킬
   - 의사소통 능력
   - 문제해결 능력
   - 협업 능력
   - 기타 필요 역량

3. 경험/경력
   - 필요 경력
   - 인정받는 경험
   - 포트폴리오 유형

4. 자격/학력
   - 필수 자격
   - 우대 자격
   - 학력 요건

각 분야의 요구 사항을 비교할 수 있게 정리해주세요.`,
        },
        {
          id: 2,
          title: '나와의 적합도 분석',
          prompt: `나의 역량과 관심 분야의 적합도를 분석해주세요.

다음 정보를 바탕으로 분석해주세요:

나의 현재 상황:
- 현재/과거 직업: [입력]
- 보유 스킬: [입력]
- 강점: [입력]
- 관심 분야: [입력]

다음 관점에서 적합도를 평가해주세요:

1. 역량 갭 분석
   - 이미 갖춘 역량
   - 부족한 역량
   - 갭 해소 난이도

2. 경험 활용도
   - 기존 경험의 연관성
   - 전이 가능한 스킬
   - 차별화 포인트

3. 적합도 점수 (100점 기준)
   - 역량 적합도: X점
   - 흥미 적합도: X점
   - 가치 적합도: X점
   - 현실 적합도: X점

4. 종합 평가
   - 전환 추천도
   - 예상 준비 기간
   - 핵심 조언`,
        },
        {
          id: 3,
          title: '진입 장벽 분석',
          prompt: `관심 분야의 진입 장벽을 분석해주세요.

분석할 분야: [관심 분야를 입력하세요]

다음 관점에서 진입 장벽을 분석해주세요:

1. 학력/자격 장벽
   - 필수 학력
   - 필수 자격증
   - 비전공자 가능 여부

2. 경력 장벽
   - 요구 경력
   - 경력 대체 가능 요소
   - 신입 vs 경력 비율

3. 스킬 장벽
   - 필수 스킬 학습 기간
   - 학습 비용
   - 독학 가능 여부

4. 네트워크 장벽
   - 업계 폐쇄성
   - 인맥의 중요도
   - 네트워크 구축 방법

5. 장벽 극복 전략
   - 현실적인 진입 경로
   - 단계별 접근법
   - 대안적 경로

각 장벽을 극복하기 위한 구체적인 방법을 제시해주세요.`,
        },
      ],
    },
    5: {
      title: '전환 방향 결정하기',
      subtitle: '최종 방향을 결정하고 액션 플랜을 세웁니다.',
      prompts: [
        {
          id: 1,
          title: '후보 분야 정리하기',
          prompt: `지금까지 탐색한 내용을 바탕으로 후보 분야를 정리해주세요.

다음 정보를 종합해서 분석해주세요:

1. 탐색 결과 요약
   - 나의 강점: [입력]
   - 나의 흥미: [입력]
   - 나의 가치관: [입력]
   - 관심 분야: [입력]

2. 후보 분야 비교 (2-3개)
   각 분야별로:
   - 매력도: 왜 끌리는지
   - 적합도: 얼마나 맞는지
   - 현실성: 실현 가능한지
   - 성장성: 미래 전망은

3. 비교 분석표
   - 점수 비교 (흥미, 적합, 현실, 성장)
   - 장단점 비교
   - 리스크 비교

4. 우선순위 정리
   - 1순위 분야와 이유
   - 2순위 분야와 이유
   - 백업 플랜

후보 분야를 객관적으로 비교 분석해주세요.`,
        },
        {
          id: 2,
          title: '의사결정 지원',
          prompt: `전환 방향에 대한 의사결정을 도와주세요.

다음 의사결정 프레임워크로 분석해주세요:

1. 의사결정 매트릭스
   - 중요도와 만족도 기준 평가
   - 가중치 적용 점수 계산

2. SWOT 분석
   - 강점 (Strengths)
   - 약점 (Weaknesses)
   - 기회 (Opportunities)
   - 위협 (Threats)

3. 시나리오 분석
   - 최선의 시나리오
   - 최악의 시나리오
   - 가장 현실적인 시나리오

4. 기회비용 분석
   - 전환하면 얻는 것
   - 전환하면 잃는 것
   - 전환 안 하면 어떻게 되는지

5. 직감 체크
   - 마음이 가는 방향
   - 망설여지는 이유
   - 결정 후 예상되는 감정

이성과 감정 모두 고려해서 의사결정을 도와주세요.`,
        },
        {
          id: 3,
          title: '액션 플랜 수립',
          prompt: `결정된 방향에 대한 초기 액션 플랜을 세워주세요.

결정된 분야: [결정한 분야를 입력하세요]

다음 내용으로 액션 플랜을 만들어주세요:

1. 다음 단계 정리
   - 당장 할 일 (1주 내)
   - 단기 목표 (1개월)
   - 중기 목표 (3-6개월)

2. 학습 계획
   - 배워야 할 것
   - 학습 자원 (강의, 책, 커뮤니티)
   - 학습 일정

3. 경험 쌓기 계획
   - 사이드 프로젝트
   - 포트폴리오 준비
   - 네트워킹

4. 현실 준비
   - 현 직장과의 병행 방법
   - 재정 계획
   - 가족/주변 설득

5. 첫 걸음
   - 오늘/이번 주 할 구체적인 액션 3가지

구체적이고 실행 가능한 액션 플랜을 제시해주세요.`,
        },
      ],
    },
  },

  // ============================================
  // 직업 체험 시뮬레이션
  // ============================================
  'job-simulation': {
    1: {
      title: '직업 체험의 가치',
      subtitle: '직업 체험의 목적과 효과를 이해합니다.',
      prompts: [
        {
          id: 1,
          title: '직업 체험의 필요성',
          prompt: `커리어 전환에서 직업 체험이 왜 중요한지 알려주세요.

다음 내용을 포함해주세요:

1. 직업 체험의 가치
   - 상상과 현실의 차이 확인
   - 적합도 사전 검증
   - 리스크 최소화

2. 체험 없이 전환할 때 문제점
   - 실패 사례
   - 흔한 후회
   - 시간/비용 낭비

3. 성공적인 전환 사례
   - 체험을 통해 확신을 얻은 케이스
   - 체험을 통해 방향을 바꾼 케이스

4. 체험의 한계와 보완
   - 체험만으로 알 수 없는 것
   - 추가로 확인할 것

직업 체험의 가치를 구체적인 사례와 함께 설명해주세요.`,
        },
        {
          id: 2,
          title: '체험 목표 설정하기',
          prompt: `직업 체험을 통해 확인하고 싶은 목표를 설정해주세요.

관심 직업: [관심 직업을 입력하세요]

다음 관점에서 목표를 설정해주세요:

1. 확인하고 싶은 것
   - 실제 업무 내용
   - 하루 일과
   - 필요 역량
   - 어려운 점

2. 검증하고 싶은 가설
   - "나는 이 일을 좋아할 것이다"
   - "나는 이 일을 잘할 수 있다"
   - "이 일의 미래는 밝다"

3. 판단 기준 설정
   - 어떤 상황이면 GO?
   - 어떤 상황이면 STOP?
   - 추가 탐색이 필요한 경우?

4. 체험 계획
   - 체험 방법 (AI 시뮬, 인터뷰 등)
   - 체험 기간
   - 기록 방법

체험 목표와 판단 기준을 명확히 세워주세요.`,
        },
        {
          id: 3,
          title: '체험 준비하기',
          prompt: `직업 체험을 효과적으로 하기 위한 준비를 도와주세요.

관심 직업: [관심 직업을 입력하세요]

다음 준비를 도와주세요:

1. 사전 조사
   - 직업 기본 정보
   - 주요 업무
   - 필요 역량
   - 업계 용어

2. 체험 방법 선택
   - AI 시뮬레이션
   - 직무 체험 프로그램
   - 현직자 인터뷰
   - 온라인 강의/콘텐츠

3. 질문 리스트 준비
   - 업무에 대한 질문
   - 커리어에 대한 질문
   - 전환에 대한 질문

4. 기록 템플릿
   - 체험 일지 양식
   - 평가 기준표

체험 전 필요한 준비사항을 체크리스트로 만들어주세요.`,
        },
      ],
    },
    2: {
      title: 'AI 시뮬레이션 활용법',
      subtitle: 'AI를 활용한 직업 체험 방법을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: 'AI로 직업인 되어보기',
          prompt: `AI를 활용해 특정 직업인의 역할을 체험해보세요.

체험할 직업: [직업을 입력하세요]

다음과 같이 AI 역할극을 진행하겠습니다:

1. 상황 설정
   "당신은 [직업]으로 일하고 있습니다.
   오늘은 일반적인 근무일입니다.
   지금부터 실제 업무 상황을 시뮬레이션합니다."

2. 체험 시나리오
   - 아침: 출근 후 해야 할 일
   - 오전: 주요 업무 처리
   - 점심: 동료와의 대화
   - 오후: 회의/프로젝트
   - 퇴근: 마무리

3. 상황별 미션
   - 실제 업무 상황 제시
   - 의사결정 상황
   - 문제 해결 상황

AI와 함께 [직업]의 하루를 체험할 수 있도록 시뮬레이션을 시작해주세요.
저에게 상황을 주고, 제가 대응하면 피드백을 주세요.`,
        },
        {
          id: 2,
          title: 'AI 현직자 인터뷰',
          prompt: `AI를 활용해 현직자 인터뷰를 체험해보세요.

인터뷰할 직업: [직업을 입력하세요]

다음과 같이 가상 인터뷰를 진행해주세요:

"당신은 [직업]으로 5년째 일하고 있는 현직자입니다.
커리어 전환을 고민하는 사람이 인터뷰를 요청했습니다.
솔직하고 현실적으로 답변해주세요."

제가 질문하면 현직자 입장에서 답변해주세요.

질문할 내용:
1. 이 일의 가장 좋은 점과 힘든 점
2. 하루 일과가 어떻게 되나요?
3. 어떤 역량이 가장 중요한가요?
4. 비전공자/전환자도 할 수 있나요?
5. 연봉과 성장 가능성은?
6. 이 일을 추천하시나요?

현실적이고 솔직한 관점에서 답변해주세요.`,
        },
        {
          id: 3,
          title: '업무 상황 시뮬레이션',
          prompt: `실제 업무 상황을 시뮬레이션해주세요.

체험할 직업: [직업을 입력하세요]

다음 상황들을 시뮬레이션해주세요:

1. 일상적인 업무 상황
   - 이메일 작성
   - 보고서 작성
   - 회의 참여

2. 도전적인 상황
   - 급한 마감
   - 까다로운 클라이언트
   - 팀 갈등

3. 성취감 있는 상황
   - 프로젝트 성공
   - 성과 인정
   - 문제 해결

각 상황을 제시하고, 제가 대응하면 피드백을 주세요.
이 직업에서 실제로 겪을 수 있는 상황을 현실적으로 시뮬레이션해주세요.`,
        },
      ],
    },
    3: {
      title: '하루 일과 체험하기',
      subtitle: '실제 업무 일과를 체험합니다.',
      prompts: [
        {
          id: 1,
          title: '아침 루틴 체험',
          prompt: `[직업]의 아침 출근부터 오전 일과를 체험해보세요.

체험할 직업: [직업을 입력하세요]

시뮬레이션을 시작합니다:

"오전 9시, 당신은 [직업]으로 출근했습니다."

1. 출근 후 루틴
   - 이메일/메시지 확인
   - 오늘 할 일 정리
   - 팀 미팅 준비

2. 오전 주요 업무
   - 첫 번째 업무 (구체적 상황 제시)
   - 예상치 못한 요청 처리
   - 동료와의 협업

각 상황에서 제가 어떻게 대응해야 하는지 안내해주시고,
제가 선택/대응하면 피드백과 다음 상황을 주세요.`,
        },
        {
          id: 2,
          title: '오후 업무 체험',
          prompt: `[직업]의 오후 업무와 마무리를 체험해보세요.

체험할 직업: [직업을 입력하세요]

시뮬레이션을 이어갑니다:

"오후 2시, 점심을 먹고 오후 업무가 시작됩니다."

1. 오후 주요 업무
   - 핵심 프로젝트 진행
   - 회의 참여
   - 문제 상황 대응

2. 업무 마무리
   - 진행 상황 정리
   - 내일 준비
   - 퇴근

3. 오늘 하루 회고
   - 잘한 것
   - 어려웠던 것
   - 배운 것

오후 일과를 현실적으로 시뮬레이션해주세요.`,
        },
        {
          id: 3,
          title: '일주일 미리보기',
          prompt: `[직업]의 일주일 일과를 미리 체험해보세요.

체험할 직업: [직업을 입력하세요]

일주일 일정을 시뮬레이션해주세요:

1. 월요일
   - 주간 계획 수립
   - 주간 회의

2. 화요일
   - 핵심 업무 집중

3. 수요일
   - 외부 미팅/협업

4. 목요일
   - 프로젝트 마감

5. 금요일
   - 주간 마무리
   - 회고 및 정리

각 요일별로 주요 일정과 업무를 알려주시고,
이 직업의 일주일 리듬이 어떤지 느낄 수 있게 해주세요.`,
        },
      ],
    },
    4: {
      title: '도전과 성취 체험',
      subtitle: '어려운 상황과 성취 경험을 시뮬레이션합니다.',
      prompts: [
        {
          id: 1,
          title: '어려운 상황 체험',
          prompt: `[직업]에서 겪을 수 있는 어려운 상황을 체험해보세요.

체험할 직업: [직업을 입력하세요]

다음 어려운 상황을 시뮬레이션해주세요:

1. 업무 스트레스 상황
   - 급한 마감에 쫓기는 상황
   - 동시에 여러 요청이 들어온 상황

2. 대인관계 갈등 상황
   - 까다로운 클라이언트/고객
   - 팀 내 의견 충돌

3. 실패/위기 상황
   - 업무 실수 발생
   - 예상치 못한 문제

각 상황에서:
- 상황 설명
- 나의 대응 선택지
- 선택 결과와 피드백

을 진행해주세요. 이 직업의 어두운 면도 현실적으로 체험하고 싶습니다.`,
        },
        {
          id: 2,
          title: '성취 경험 체험',
          prompt: `[직업]에서 느낄 수 있는 성취감을 체험해보세요.

체험할 직업: [직업을 입력하세요]

다음 성취 상황을 시뮬레이션해주세요:

1. 작은 성취
   - 일일 업무 완료
   - 동료에게 도움 제공
   - 작은 문제 해결

2. 중간 성취
   - 프로젝트 성공
   - 클라이언트 만족
   - 상사에게 인정

3. 큰 성취
   - 승진/성장
   - 큰 프로젝트 완수
   - 업계 인정

각 성취 상황에서 느낄 수 있는 감정과 의미를 체험할 수 있게 해주세요.
이 직업에서 어떤 보람을 느낄 수 있는지 알고 싶습니다.`,
        },
        {
          id: 3,
          title: '종합 평가하기',
          prompt: `지금까지의 직업 체험을 종합 평가해주세요.

체험한 직업: [직업을 입력하세요]

다음 관점에서 체험 결과를 정리해주세요:

1. 업무 적합성
   - 업무 내용이 나와 맞는가?
   - 필요 역량을 갖추고 있는가?
   - 성장 가능성이 있는가?

2. 감정 체크
   - 체험하면서 느낀 감정
   - 흥미로웠던 순간
   - 힘들었던 순간

3. 현실 점검
   - 상상과 달랐던 점
   - 새롭게 알게 된 점
   - 우려되는 점

4. 최종 평가
   - 이 직업 추천도 (1-10)
   - 추가 확인 필요 사항
   - 다음 단계 제안

체험 결과를 바탕으로 솔직한 평가와 조언을 해주세요.`,
        },
      ],
    },
    5: {
      title: '체험 결과 분석',
      subtitle: '체험 결과를 분석하고 결정을 내립니다.',
      prompts: [
        {
          id: 1,
          title: '적합도 재평가',
          prompt: `직업 체험 후 적합도를 재평가해주세요.

체험한 직업: [직업을 입력하세요]

체험 전후를 비교 분석해주세요:

1. 체험 전 기대
   - 예상했던 업무
   - 예상했던 어려움
   - 예상했던 보람

2. 체험 후 현실
   - 실제 업무 내용
   - 실제 어려움
   - 실제 보람

3. 적합도 변화
   - 체험 전 적합도: ?/10
   - 체험 후 적합도: ?/10
   - 변화 이유

4. 새로운 발견
   - 긍정적 발견
   - 부정적 발견
   - 판단 보류 사항

체험을 통해 적합도가 어떻게 변했는지 분석해주세요.`,
        },
        {
          id: 2,
          title: '현실 점검 질문',
          prompt: `직업 체험 후 현실적인 점검을 해주세요.

체험한 직업: [직업을 입력하세요]

다음 현실 점검 질문에 답해주세요:

1. 5년 후 상상
   - 이 일을 5년 했을 때 나의 모습은?
   - 만족할 것 같은가?

2. 최악의 날
   - 이 직업의 가장 힘든 날은?
   - 그 날을 견딜 수 있는가?

3. 기회비용
   - 이 길을 선택하면 포기해야 하는 것은?
   - 그것을 포기할 수 있는가?

4. 후회 가능성
   - 선택했다가 후회할 가능성은?
   - 선택 안 했다가 후회할 가능성은?

5. 주변 반응
   - 가족/친구들은 어떻게 생각할까?
   - 그것이 나의 결정에 영향을 주는가?

솔직하게 현실을 점검할 수 있도록 도와주세요.`,
        },
        {
          id: 3,
          title: '최종 결정 지원',
          prompt: `직업 체험 결과를 바탕으로 최종 결정을 도와주세요.

체험한 직업: [직업을 입력하세요]

다음 프로세스로 결정을 도와주세요:

1. 체험 결과 요약
   - 핵심 발견 3가지
   - 확인된 적합도
   - 남은 의문점

2. 의사결정 옵션
   - 옵션 1: 이 분야로 전환 진행
   - 옵션 2: 추가 탐색/체험 필요
   - 옵션 3: 다른 분야 탐색
   - 옵션 4: 현재 상태 유지

3. 각 옵션의 결과
   - 예상되는 상황
   - 리스크와 기회
   - 필요한 액션

4. 결정 지원
   - 마음이 가는 방향
   - 이성적 판단
   - 최종 추천

체험 결과를 바탕으로 현명한 결정을 내릴 수 있도록 도와주세요.`,
        },
      ],
    },
  },

  // ============================================
  // 새 분야 기초 역량
  // ============================================
  'new-skill': {
    1: {
      title: 'AI 시대 핵심 역량',
      subtitle: '미래 역량과 AI 리터러시를 이해합니다.',
      prompts: [
        {
          id: 1,
          title: 'AI 시대 필수 역량',
          prompt: `AI 시대에 반드시 갖춰야 할 핵심 역량을 알려주세요.

다음 내용을 포함해주세요:

1. 기술 역량
   - AI 리터러시
   - 데이터 이해력
   - 디지털 도구 활용

2. 인간 고유 역량
   - 창의적 사고
   - 비판적 사고
   - 감성 지능
   - 복잡한 문제 해결

3. 협업 역량
   - AI와 협업하는 능력
   - 다양한 사람과 협업
   - 원격 협업

4. 학습 역량
   - 자기주도 학습
   - 빠른 적응력
   - 지속적 성장

각 역량이 왜 중요한지, 어떻게 키울 수 있는지 설명해주세요.`,
        },
        {
          id: 2,
          title: 'AI 리터러시 키우기',
          prompt: `AI 리터러시를 키우는 방법을 알려주세요.

다음 내용을 포함해주세요:

1. AI 리터러시란?
   - 정의
   - 왜 중요한가
   - 어느 수준이 필요한가

2. 기본 역량
   - AI가 무엇인지 이해
   - AI가 할 수 있는 것/없는 것
   - AI 도구 사용법

3. 활용 역량
   - 업무에 AI 적용하기
   - 효과적인 프롬프트 작성
   - AI 결과 검증하기

4. 심화 역량
   - AI 트렌드 따라가기
   - AI 윤리 이해
   - AI 전략적 활용

AI 리터러시를 단계별로 키울 수 있는 구체적인 방법을 알려주세요.`,
        },
        {
          id: 3,
          title: '나의 역량 진단',
          prompt: `나의 현재 역량 수준을 진단해주세요.

다음 역량별로 자가 진단을 도와주세요:

1. 디지털/AI 역량
   - 기본 디지털 도구 활용
   - AI 도구 사용 경험
   - 데이터 이해력

2. 소프트 스킬
   - 문제 해결 능력
   - 의사소통 능력
   - 창의성
   - 적응력

3. 학습 역량
   - 새로운 것 배우는 속도
   - 자기주도 학습 경험
   - 학습 지속력

4. 전문 역량
   - 현재 분야 전문성
   - 전이 가능한 스킬
   - 차별화 역량

각 영역별로 진단 질문을 하고, 결과를 분석해주세요.`,
        },
      ],
    },
    2: {
      title: '디지털 역량 강화',
      subtitle: '디지털 도구와 온라인 협업 능력을 키웁니다.',
      prompts: [
        {
          id: 1,
          title: '필수 디지털 도구',
          prompt: `커리어 전환에 필요한 필수 디지털 도구를 알려주세요.

다음 영역별로 도구를 소개해주세요:

1. 생산성 도구
   - 문서 작성 (노션, 구글 독스)
   - 스프레드시트 (엑셀, 구글 시트)
   - 프레젠테이션

2. 협업 도구
   - 커뮤니케이션 (슬랙, 팀즈)
   - 프로젝트 관리 (트렐로, 아사나)
   - 화상 회의

3. AI 도구
   - ChatGPT, Gemini
   - 이미지 생성 AI
   - 업무 자동화 AI

4. 전문 도구
   - 디자인 (Canva, Figma)
   - 데이터 분석
   - 코딩/노코드

각 도구의 기본 사용법과 학습 방법을 알려주세요.`,
        },
        {
          id: 2,
          title: '온라인 협업 스킬',
          prompt: `효과적인 온라인 협업 스킬을 알려주세요.

다음 내용을 포함해주세요:

1. 비동기 커뮤니케이션
   - 명확한 글쓰기
   - 이메일/메시지 예절
   - 문서화 습관

2. 동기 커뮤니케이션
   - 화상 회의 스킬
   - 온라인 프레젠테이션
   - 실시간 협업

3. 원격 근무 스킬
   - 시간 관리
   - 자기 관리
   - 성과 가시화

4. 협업 에티켓
   - 온라인 매너
   - 피드백 주고받기
   - 갈등 해결

각 스킬을 향상시키는 구체적인 방법을 알려주세요.`,
        },
        {
          id: 3,
          title: '데이터 활용 기초',
          prompt: `기본적인 데이터 활용 능력을 키우는 방법을 알려주세요.

다음 내용을 포함해주세요:

1. 데이터 리터러시
   - 데이터 읽기
   - 데이터 해석
   - 데이터 기반 의사결정

2. 엑셀/스프레드시트
   - 기본 함수
   - 피벗 테이블
   - 차트 만들기

3. 데이터 시각화
   - 그래프 선택
   - 인사이트 도출
   - 스토리텔링

4. AI 활용 분석
   - AI로 데이터 분석
   - AI로 인사이트 얻기

비전공자도 쉽게 배울 수 있는 방법을 알려주세요.`,
        },
      ],
    },
    3: {
      title: '빠른 학습 전략',
      subtitle: '효율적으로 새로운 것을 배우는 방법을 익힙니다.',
      prompts: [
        {
          id: 1,
          title: '효과적인 학습법',
          prompt: `새로운 분야를 빠르게 배우는 학습 전략을 알려주세요.

다음 내용을 포함해주세요:

1. 학습 원리
   - 능동적 학습 vs 수동적 학습
   - 간격 반복
   - 인출 연습

2. 빠른 학습 전략
   - 파레토 법칙 (20%로 80% 결과)
   - 역공학 학습
   - 프로젝트 기반 학습

3. 학습 계획
   - 목표 설정
   - 커리큘럼 구성
   - 마일스톤 설정

4. 학습 리소스
   - 온라인 강의 활용
   - 책과 문서
   - 커뮤니티 활용

새로운 분야를 3-6개월 내 기초 수준으로 익히는 방법을 알려주세요.`,
        },
        {
          id: 2,
          title: 'AI 활용 학습',
          prompt: `AI를 활용해 효율적으로 학습하는 방법을 알려주세요.

다음 내용을 포함해주세요:

1. AI 튜터 활용
   - 개념 설명 요청
   - 질문 답변
   - 맞춤형 설명

2. AI 학습 도우미
   - 학습 계획 수립
   - 요약과 정리
   - 퀴즈 생성

3. AI 실습 파트너
   - 코딩 학습
   - 글쓰기 연습
   - 대화 연습

4. AI 활용 주의점
   - 의존 방지
   - 정보 검증
   - 능동적 학습

AI를 학습 도구로 효과적으로 활용하는 구체적인 방법을 알려주세요.`,
        },
        {
          id: 3,
          title: '시간 관리와 습관',
          prompt: `학습을 위한 시간 관리와 습관 형성 방법을 알려주세요.

다음 내용을 포함해주세요:

1. 시간 확보
   - 현재 시간 사용 분석
   - 학습 시간 확보 방법
   - 자투리 시간 활용

2. 학습 습관 만들기
   - 습관 형성 원리
   - 매일 학습 루틴
   - 트리거와 보상

3. 지속 가능한 학습
   - 번아웃 방지
   - 동기 유지
   - 작은 성취 축적

4. 직장과 병행
   - 출퇴근 시간 활용
   - 점심시간 활용
   - 주말 학습

바쁜 직장인이 학습을 지속하는 구체적인 방법을 알려주세요.`,
        },
      ],
    },
    4: {
      title: '실전 역량 쌓기',
      subtitle: '프로젝트와 포트폴리오로 실전 역량을 쌓습니다.',
      prompts: [
        {
          id: 1,
          title: '사이드 프로젝트 시작',
          prompt: `실전 역량을 쌓기 위한 사이드 프로젝트를 시작하는 방법을 알려주세요.

관심 분야: [관심 분야를 입력하세요]

다음 내용을 포함해주세요:

1. 프로젝트 아이디어
   - 분야별 프로젝트 예시
   - 나에게 맞는 프로젝트
   - 시작하기 쉬운 프로젝트

2. 프로젝트 계획
   - 목표 설정
   - 범위 정하기
   - 일정 계획

3. 실행 방법
   - 혼자 vs 팀
   - 필요 리소스
   - 진행 방법

4. 결과물 활용
   - 포트폴리오화
   - 공개와 피드백
   - 이력서 활용

실제로 시작할 수 있는 프로젝트 아이디어 3개를 제안해주세요.`,
        },
        {
          id: 2,
          title: '포트폴리오 만들기',
          prompt: `커리어 전환을 위한 포트폴리오를 만드는 방법을 알려주세요.

전환 목표 분야: [분야를 입력하세요]

다음 내용을 포함해주세요:

1. 포트폴리오 전략
   - 전환자 포트폴리오의 특징
   - 경험 없이 보여줄 수 있는 것
   - 차별화 포인트

2. 포함할 내용
   - 프로젝트 결과물
   - 학습 증명
   - 전이 가능한 경험
   - 성장 스토리

3. 포트폴리오 형식
   - 웹사이트
   - PDF 문서
   - 깃허브/노션

4. 만드는 과정
   - 기획
   - 콘텐츠 제작
   - 디자인

전환자에게 적합한 포트폴리오 구성 방법을 알려주세요.`,
        },
        {
          id: 3,
          title: '경험 축적하기',
          prompt: `실제 경험을 축적하는 다양한 방법을 알려주세요.

전환 목표 분야: [분야를 입력하세요]

다음 내용을 포함해주세요:

1. 무급/저비용 경험
   - 봉사 프로젝트
   - 오픈소스 기여
   - 프리랜서 시작

2. 네트워킹
   - 커뮤니티 참여
   - 멘토 찾기
   - 업계 행사

3. 온라인 활동
   - 블로그 운영
   - SNS 브랜딩
   - 콘텐츠 제작

4. 자격증/수료증
   - 분야별 인정 자격
   - 온라인 수료증
   - 부트캠프

실제 이력으로 인정받을 수 있는 경험을 쌓는 방법을 알려주세요.`,
        },
      ],
    },
    5: {
      title: '역량 증명하기',
      subtitle: '쌓은 역량을 효과적으로 증명합니다.',
      prompts: [
        {
          id: 1,
          title: '자격증과 수료증',
          prompt: `역량을 증명할 수 있는 자격증과 수료증을 알려주세요.

전환 목표 분야: [분야를 입력하세요]

다음 내용을 포함해주세요:

1. 분야별 유효한 자격증
   - 공인 자격증
   - 민간 자격증
   - 취득 우선순위

2. 온라인 수료증
   - 인정받는 플랫폼
   - 추천 과정
   - 활용 방법

3. 부트캠프/교육 과정
   - 분야별 추천 과정
   - 비용 대비 효과
   - 선택 기준

4. 자격 취득 전략
   - 학습 계획
   - 시험 준비
   - 활용 방법

가장 효과적인 자격증 취득 순서를 추천해주세요.`,
        },
        {
          id: 2,
          title: '포트폴리오 완성',
          prompt: `최종 포트폴리오를 완성하는 방법을 알려주세요.

전환 목표 분야: [분야를 입력하세요]

다음 내용을 포함해주세요:

1. 포트폴리오 점검
   - 필수 항목 체크
   - 품질 검토
   - 피드백 반영

2. 스토리텔링
   - 전환 동기
   - 성장 과정
   - 비전 제시

3. 차별화
   - 나만의 강점 부각
   - 기존 경험 연결
   - 열정 증명

4. 공개와 활용
   - 공개 방법
   - 지원 시 활용
   - 지속 업데이트

면접관이 보고 싶어하는 포트폴리오를 만드는 방법을 알려주세요.`,
        },
        {
          id: 3,
          title: '실적 정리하기',
          prompt: `지금까지 쌓은 역량과 실적을 정리해주세요.

다음 내용을 정리하도록 도와주세요:

1. 학습 실적
   - 수료한 과정
   - 취득한 자격
   - 학습 시간

2. 프로젝트 실적
   - 완료한 프로젝트
   - 결과물 목록
   - 성과 지표

3. 활동 실적
   - 커뮤니티 활동
   - 블로그/콘텐츠
   - 네트워킹

4. 종합 역량 정리
   - 보유 역량 목록
   - 수준별 정리
   - 증명 자료

이력서와 면접에 활용할 수 있게 역량을 정리해주세요.`,
        },
      ],
    },
  },

  // ============================================
  // 전환 로드맵 수립
  // ============================================
  'roadmap': {
    1: {
      title: '전환 목표 설정',
      subtitle: '구체적인 전환 목표와 마일스톤을 설정합니다.',
      prompts: [
        {
          id: 1,
          title: 'SMART 목표 설정',
          prompt: `커리어 전환을 위한 SMART 목표를 설정해주세요.

전환 목표 분야: [분야를 입력하세요]

SMART 기준으로 목표를 구체화해주세요:

1. Specific (구체적)
   - 정확히 어떤 직무/역할?
   - 어떤 회사/환경?

2. Measurable (측정 가능)
   - 어떻게 달성을 확인?
   - 중간 지표는?

3. Achievable (달성 가능)
   - 현실적인가?
   - 필요 조건은?

4. Relevant (관련성)
   - 왜 이 목표인가?
   - 삶의 목표와 연결?

5. Time-bound (기한)
   - 언제까지?
   - 중간 마감은?

목표 문장:
"나는 [기한]까지 [구체적 목표]를 달성한다"

이 형식으로 목표를 함께 만들어주세요.`,
        },
        {
          id: 2,
          title: '마일스톤 설정',
          prompt: `전환 목표를 위한 마일스톤을 설정해주세요.

최종 목표: [목표를 입력하세요]
목표 기한: [기한을 입력하세요]

다음 형식으로 마일스톤을 만들어주세요:

1. 1개월 마일스톤
   - 달성할 것
   - 완료 기준
   - 필요 액션

2. 3개월 마일스톤
   - 달성할 것
   - 완료 기준
   - 필요 액션

3. 6개월 마일스톤
   - 달성할 것
   - 완료 기준
   - 필요 액션

4. 최종 마일스톤
   - 달성할 것
   - 완료 기준
   - 축하 방법

각 마일스톤이 연결되어 최종 목표로 이어지도록 설계해주세요.`,
        },
        {
          id: 3,
          title: '성공 지표 정의',
          prompt: `전환 성공을 측정할 지표를 정의해주세요.

다음 관점에서 성공 지표를 만들어주세요:

1. 학습 지표
   - 학습 시간
   - 수료/자격
   - 역량 수준

2. 활동 지표
   - 프로젝트 수
   - 포트폴리오 항목
   - 네트워킹 활동

3. 성과 지표
   - 지원 횟수
   - 면접 횟수
   - 합격 여부

4. 만족도 지표
   - 확신도
   - 자신감
   - 방향성 명확도

주간/월간으로 점검할 수 있는 지표를 만들어주세요.`,
        },
      ],
    },
    2: {
      title: '단계별 계획 수립',
      subtitle: '세부 계획과 우선순위를 정합니다.',
      prompts: [
        {
          id: 1,
          title: '월별 상세 계획',
          prompt: `전환을 위한 월별 상세 계획을 세워주세요.

목표: [목표를 입력하세요]
기간: [기간을 입력하세요]

월별로 다음을 계획해주세요:

1개월차:
- 목표:
- 학습 계획:
- 활동 계획:
- 체크포인트:

2개월차:
- 목표:
- 학습 계획:
- 활동 계획:
- 체크포인트:

3개월차:
- 목표:
- 학습 계획:
- 활동 계획:
- 체크포인트:

(이후 월 계속...)

각 월의 계획이 자연스럽게 연결되도록 설계해주세요.`,
        },
        {
          id: 2,
          title: '주간 실행 계획',
          prompt: `바로 시작할 주간 실행 계획을 세워주세요.

이번 달 목표: [목표를 입력하세요]

주간 계획 템플릿:

1주차:
- 월: [계획]
- 화: [계획]
- 수: [계획]
- 목: [계획]
- 금: [계획]
- 주말: [계획]
- 주간 목표:

2주차:
(동일 형식)

3주차:
(동일 형식)

4주차:
(동일 형식)

주간 점검:
- 잘한 점:
- 개선할 점:
- 다음 주 조정:

현실적으로 실행 가능한 주간 계획을 만들어주세요.`,
        },
        {
          id: 3,
          title: '우선순위 설정',
          prompt: `할 일의 우선순위를 설정해주세요.

목표: [목표를 입력하세요]

해야 할 일을 다음 기준으로 분류해주세요:

1. 긴급하고 중요한 것 (지금 바로)
   - [항목들]

2. 중요하지만 긴급하지 않은 것 (계획 수립)
   - [항목들]

3. 긴급하지만 중요하지 않은 것 (위임/최소화)
   - [항목들]

4. 긴급하지도 중요하지도 않은 것 (제거)
   - [항목들]

각 항목의 우선순위와 실행 순서를 정해주세요.`,
        },
      ],
    },
    3: {
      title: '리스크 파악과 대비',
      subtitle: '예상되는 장애물과 대응 전략을 세웁니다.',
      prompts: [
        {
          id: 1,
          title: '리스크 식별',
          prompt: `커리어 전환에서 예상되는 리스크를 식별해주세요.

전환 계획: [계획을 입력하세요]

다음 영역의 리스크를 분석해주세요:

1. 재정 리스크
   - 수입 감소 가능성
   - 학습/전환 비용
   - 비상 자금 필요

2. 시간 리스크
   - 예상보다 오래 걸림
   - 현 직장과의 균형
   - 기회비용

3. 역량 리스크
   - 학습 실패 가능성
   - 경쟁력 부족
   - 적응 어려움

4. 외부 리스크
   - 시장 변화
   - 채용 시장 상황
   - 예상치 못한 상황

각 리스크의 발생 가능성과 영향도를 평가해주세요.`,
        },
        {
          id: 2,
          title: '대응 전략 수립',
          prompt: `식별된 리스크에 대한 대응 전략을 세워주세요.

주요 리스크: [리스크들을 입력하세요]

각 리스크별로 다음을 계획해주세요:

1. 예방 전략
   - 리스크 발생 전 할 일
   - 위험 신호 감지 방법

2. 완화 전략
   - 리스크 영향 줄이는 방법
   - 버퍼 확보 방법

3. 대응 전략
   - 리스크 발생 시 할 일
   - 비상 계획

4. 수용 전략
   - 감수할 수 있는 리스크
   - 최악의 경우 대비

구체적인 행동 계획을 포함해주세요.`,
        },
        {
          id: 3,
          title: '플랜 B 수립',
          prompt: `전환이 계획대로 되지 않을 경우의 플랜 B를 세워주세요.

원래 계획: [계획을 입력하세요]

다음 상황별 플랜 B를 만들어주세요:

1. 전환 실패 시
   - 현 직장으로 복귀 가능?
   - 다른 대안은?
   - 배운 것 활용 방법

2. 기간 초과 시
   - 기간 연장 가능?
   - 중간 목표 조정
   - 부분 전환 옵션

3. 재정 문제 시
   - 비용 절감 방법
   - 추가 수입 방법
   - 전환 일시 중단

4. 방향 수정 시
   - 유사 분야로 전환
   - 목표 축소/변경
   - 피벗 전략

최악의 상황에서도 괜찮다는 안정감을 줄 플랜 B를 만들어주세요.`,
        },
      ],
    },
    4: {
      title: '자원 확보 전략',
      subtitle: '시간, 비용, 네트워크 등 필요 자원을 확보합니다.',
      prompts: [
        {
          id: 1,
          title: '시간 확보 전략',
          prompt: `커리어 전환을 위한 시간을 확보하는 전략을 세워주세요.

현재 상황: [현재 상황을 입력하세요]

다음 관점에서 시간 확보 방법을 알려주세요:

1. 현재 시간 사용 분석
   - 하루 시간 사용 현황
   - 낭비되는 시간
   - 효율화 가능한 시간

2. 학습 시간 확보
   - 출퇴근 시간 활용
   - 점심시간 활용
   - 저녁/주말 시간

3. 직장과 병행
   - 업무 효율화
   - 에너지 관리
   - 번아웃 방지

4. 시간 확보 실천안
   - 구체적인 시간표
   - 습관 형성
   - 유연한 조정

현실적으로 주 10시간 이상 확보하는 방법을 알려주세요.`,
        },
        {
          id: 2,
          title: '비용 관리 전략',
          prompt: `커리어 전환에 필요한 비용을 관리하는 전략을 세워주세요.

다음 내용을 포함해주세요:

1. 필요 비용 산정
   - 교육/학습 비용
   - 자격증 비용
   - 도구/장비 비용
   - 생활비 (전환 기간)

2. 비용 절감 방법
   - 무료 학습 자원
   - 할인/지원 활용
   - 필수 vs 선택 구분

3. 재정 확보 방법
   - 저축 계획
   - 추가 수입 방법
   - 지원 프로그램

4. 예산 관리
   - 월별 예산
   - 비상 자금
   - 투자 대비 효과

6개월~1년 전환 기간의 재정 계획을 세워주세요.`,
        },
        {
          id: 3,
          title: '네트워크 구축',
          prompt: `커리어 전환을 위한 네트워크를 구축하는 방법을 알려주세요.

목표 분야: [분야를 입력하세요]

다음 관점에서 네트워킹 전략을 세워주세요:

1. 온라인 네트워킹
   - LinkedIn 활용
   - 온라인 커뮤니티
   - SNS 브랜딩

2. 오프라인 네트워킹
   - 업계 행사/밋업
   - 스터디 그룹
   - 세미나/컨퍼런스

3. 멘토 찾기
   - 멘토의 필요성
   - 멘토 찾는 방법
   - 멘토 관계 유지

4. 실천 계획
   - 이번 달 네트워킹 액션
   - 연락처 관리
   - 관계 유지 방법

첫 달에 할 수 있는 구체적인 네트워킹 액션 5개를 제안해주세요.`,
        },
      ],
    },
    5: {
      title: '실행과 점검',
      subtitle: '계획을 실행하고 지속적으로 점검합니다.',
      prompts: [
        {
          id: 1,
          title: '첫 걸음 내딛기',
          prompt: `커리어 전환의 첫 걸음을 내딛도록 도와주세요.

목표: [목표를 입력하세요]

바로 시작할 수 있는 첫 걸음을 안내해주세요:

1. 오늘 할 일 (1개)
   - 가장 쉽고 작은 액션
   - 5분 안에 할 수 있는 것
   - 시작의 의미

2. 이번 주 할 일 (3개)
   - 첫 주에 완료할 액션
   - 동기 부여가 될 성취
   - 구체적인 일정

3. 시작 의식
   - 결심을 공고히 하는 방법
   - 다른 사람에게 선언
   - 첫 성취 축하

4. 장애물 예상
   - 첫 주에 예상되는 어려움
   - 극복 방법
   - 도움 요청 대상

지금 바로 시작할 수 있도록 동기를 부여해주세요.`,
        },
        {
          id: 2,
          title: '진행 점검 방법',
          prompt: `전환 과정을 정기적으로 점검하는 방법을 알려주세요.

다음 점검 체계를 만들어주세요:

1. 일일 점검 (5분)
   - 오늘 한 것
   - 내일 할 것
   - 기분 체크

2. 주간 점검 (30분)
   - 주간 목표 달성도
   - 잘한 것 / 개선할 것
   - 다음 주 계획

3. 월간 점검 (1시간)
   - 마일스톤 점검
   - 방향 조정 필요성
   - 다음 달 계획

4. 점검 도구
   - 체크리스트
   - 진행 트래커
   - 회고 템플릿

지속 가능한 점검 습관을 만드는 방법을 알려주세요.`,
        },
        {
          id: 3,
          title: '동기 유지 전략',
          prompt: `전환 과정에서 동기를 유지하는 방법을 알려주세요.

다음 내용을 포함해주세요:

1. 동기 저하 원인
   - 흔한 슬럼프 시기
   - 동기가 떨어지는 이유
   - 위험 신호

2. 동기 유지 전략
   - 작은 성취 축적
   - 목표 시각화
   - 동기 부여 루틴

3. 위기 극복
   - 슬럼프 탈출법
   - 도움 요청
   - 재충전 방법

4. 지속 가능성
   - 완벽보다 꾸준함
   - 유연한 조정
   - 자기 자비

6개월 이상 꾸준히 진행할 수 있는 동기 유지 전략을 알려주세요.`,
        },
      ],
    },
  },
};

// 메인 컴포넌트
export default function CareerChangeLessonPage() {
  const router = useRouter();
  const params = useParams();
  const course = params.course as string;
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
  const [selectedAI, setSelectedAI] = useState<string>('gemini');
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(null);

  const selectedAIService = aiServices.find(s => s.id === selectedAI);

  const currentCourse = courseInfo[course];
  const currentLesson = lessonPrompts[course]?.[day];

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
      console.error('Failed to copy:', err);
    }
  };

  const handleOpenAI = async () => {
    const currentPrompt = currentLesson?.prompts.find(p => p.id === expandedPrompt);

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
      const firstPrompt = currentLesson?.prompts[0];
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

  if (!currentCourse || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 강좌입니다</h1>
          <Link href="/course/career-change" className="text-blue-600 hover:underline">
            진로 전환자 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const totalDays = Object.keys(lessonPrompts[course] || {}).length;

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
              <Link href="/mbti" className="text-gray-300 hover:text-white transition px-3 py-2">MBTI</Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition px-3 py-2">FAQ</Link>
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
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
          <Link href="/courses" className="text-gray-500 hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/course/career-change" className="text-gray-500 hover:text-gray-700">진로 전환자 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/course/career-change/${course}`} className="text-gray-500 hover:text-gray-700">{currentCourse.title}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Day {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className={`bg-gradient-to-r ${currentCourse.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{currentCourse.icon}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Day {day}: {currentLesson.title}</h1>
          <p className="text-white/80">{currentLesson.subtitle}</p>
        </div>

        {/* 사용법 동영상 (첫 레슨에서만) */}
        {course === 'find-field' && day === 1 && (
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
                title="진로 전환자 코스 사용법 안내"
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
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-rose-900 mb-2 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            학습 방법
          </h3>
          <ol className="text-rose-800 text-sm space-y-1 list-decimal list-inside">
            <li>아래 프롬프트에서 "복사하기" 버튼을 클릭하세요</li>
            <li>위의 "{selectedAIService?.name} 열기" 버튼을 눌러 AI 사이트로 이동하세요</li>
            <li>복사한 내용을 AI 입력창에 붙여넣고 전송하세요</li>
            <li>AI와 대화하며 나의 진로 전환을 탐색하세요</li>
          </ol>
        </div>

        {/* 프롬프트 카드들 */}
        <div className="space-y-4">
          {currentLesson.prompts.map((item, idx) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedPrompt(expandedPrompt === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-gray-900">{item.title}</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedPrompt === item.id ? 'rotate-90' : ''}`} />
              </button>

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
          {day > 1 ? (
            <Link href={`/course/career-change/${course}/lesson/${day - 1}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}

          {day < totalDays ? (
            <Link href={`/course/career-change/${course}/lesson/${day + 1}`} className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/career-change/${course}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
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
