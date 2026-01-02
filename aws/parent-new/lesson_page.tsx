'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Youtube, ExternalLink, Cpu, Users, BookOpen, Compass } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; bgColor: string; textColor: string; icon: any; totalDays: number } } = {
  'ai-basics': { name: 'AI 기초', color: 'from-blue-500 to-indigo-600', bgColor: 'from-slate-50 to-blue-50', textColor: 'blue', icon: Cpu, totalDays: 15 },
  'mindset': { name: '마인드셋', color: 'from-purple-500 to-pink-600', bgColor: 'from-slate-50 to-purple-50', textColor: 'purple', icon: Users, totalDays: 10 },
  'education': { name: '자녀 교육', color: 'from-green-500 to-emerald-600', bgColor: 'from-slate-50 to-green-50', textColor: 'green', icon: BookOpen, totalDays: 20 },
  'career': { name: '진로 교육', color: 'from-orange-500 to-red-600', bgColor: 'from-slate-50 to-orange-50', textColor: 'orange', icon: Compass, totalDays: 15 },
};

// AI 기초 레슨 데이터
const aiBasicsLessons: { [day: number]: { title: string; desc: string; prompt: string; tip: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: 'ChatGPT 시작하기',
    desc: '계정 만들기부터 첫 대화까지',
    prompt: `저는 학부형입니다. ChatGPT를 처음 사용하려고 합니다.

1. ChatGPT 가입 방법
   - 단계별 가입 절차를 알려주세요
   - 무료/유료 버전의 차이점

2. 첫 대화 시작하기
   - 기본적인 질문 방법
   - ChatGPT가 잘하는 것과 못하는 것

3. 자녀 교육에 활용하기
   - 숙제 도움 요청 예시
   - 개념 설명 요청 예시

4. 주의사항
   - 개인정보 보호
   - 정보의 정확성 확인 필요성

5. 오늘의 실습
   - 직접 ChatGPT에 간단한 질문 해보기
   - 예: "초등학교 5학년 수학에서 분수의 덧셈을 쉽게 설명해줘"`,
    tip: '💡 ChatGPT는 대화형 AI입니다. 마치 지식이 풍부한 친구와 대화하듯이 자연스럽게 질문하면 됩니다!',
    challenge: '🎯 도전: ChatGPT에 자녀의 학년에 맞는 수학 개념을 설명해달라고 요청해보세요!',
    youtubeKeyword: 'ChatGPT 사용법 초보자 가이드'
  },
  2: {
    title: 'Claude 시작하기',
    desc: 'Anthropic의 Claude AI 활용법',
    prompt: `저는 학부형입니다. Claude AI를 사용하려고 합니다.

1. Claude 특징
   - ChatGPT와의 차이점
   - Claude의 장점 (긴 문서 처리, 안전성)

2. Claude 가입 및 사용법
   - claude.ai 접속 방법
   - 기본 인터페이스 설명

3. 자녀 교육에 Claude 활용하기
   - 긴 지문 분석 요청
   - 글쓰기 첨삭 요청
   - 독서 감상문 작성 도움

4. 실습 예시
   - "우리 아이가 쓴 일기를 첨삭해주세요"
   - "이 교과서 내용을 쉽게 설명해주세요"

5. 오늘의 과제
   - Claude에 자녀의 글쓰기 샘플을 넣고 피드백 받아보기`,
    tip: '💡 Claude는 특히 긴 글을 분석하고 피드백 주는 데 뛰어납니다. 자녀의 글쓰기 교육에 활용해보세요!',
    challenge: '🎯 도전: 자녀가 쓴 글 하나를 Claude에 첨삭 요청해보세요!',
    youtubeKeyword: 'Claude AI 사용법 튜토리얼'
  },
  3: {
    title: 'Gemini 시작하기',
    desc: 'Google의 Gemini AI 활용법',
    prompt: `저는 학부형입니다. Google Gemini를 사용하려고 합니다.

1. Gemini 특징
   - Google 서비스와의 연동
   - 이미지 분석 기능
   - 실시간 정보 검색

2. Gemini 접속 및 사용법
   - gemini.google.com 접속
   - Google 계정 연동

3. 자녀 교육에 Gemini 활용하기
   - 이미지로 수학 문제 풀이 요청
   - 최신 뉴스 기반 학습 자료 생성
   - 유튜브 영상 요약

4. 실습 예시
   - 수학 문제 사진 찍어서 풀이 요청
   - "초등학생 눈높이로 우주에 대해 설명해줘"

5. 오늘의 과제
   - Gemini에 이미지를 업로드하고 분석 요청해보기`,
    tip: '💡 Gemini는 이미지 인식이 뛰어나서 수학 문제 사진을 찍어 풀이를 요청할 수 있어요!',
    challenge: '🎯 도전: 자녀의 수학 문제집을 사진 찍어 Gemini에 풀이 요청해보세요!',
    youtubeKeyword: 'Google Gemini 사용법 강의'
  },
  4: {
    title: 'AI 도구 비교와 선택',
    desc: '상황에 맞는 AI 도구 선택하기',
    prompt: `저는 학부형입니다. ChatGPT, Claude, Gemini를 상황에 맞게 사용하고 싶습니다.

1. 각 AI의 강점 비교
   - ChatGPT: 범용성, 플러그인
   - Claude: 긴 문서 처리, 안전성
   - Gemini: 이미지 분석, Google 연동

2. 상황별 추천
   - 숙제 도움: ChatGPT
   - 글쓰기 첨삭: Claude
   - 이미지 문제 풀이: Gemini
   - 최신 정보 검색: Gemini

3. 무료 vs 유료 버전
   - 각 서비스의 무료 한도
   - 유료 구독 시 장점

4. 실전 활용 시나리오
   - 아이 숙제 도움 시
   - 시험 공부 지원 시
   - 독후감/일기 첨삭 시

5. 오늘의 과제
   - 3가지 AI에 같은 질문을 해보고 답변 비교하기`,
    tip: '💡 하나의 AI만 고집하지 말고, 상황에 맞게 여러 AI를 활용하면 더 좋은 결과를 얻을 수 있어요!',
    challenge: '🎯 도전: "우리 아이 수학 공부 방법" 질문을 3개 AI에 해보고 답변을 비교해보세요!',
    youtubeKeyword: 'ChatGPT Claude Gemini 비교'
  },
  5: {
    title: '효과적인 질문법 기초',
    desc: '프롬프트 엔지니어링 입문',
    prompt: `저는 학부형입니다. AI에게 더 좋은 답변을 얻는 질문법을 배우고 싶습니다.

1. 좋은 질문의 구조
   - 역할 부여: "당신은 초등학교 선생님입니다"
   - 구체적 요청: "5학년 수준으로 설명해주세요"
   - 형식 지정: "3가지로 정리해주세요"

2. 나쁜 질문 vs 좋은 질문
   - 나쁜 예: "수학 알려줘"
   - 좋은 예: "초등 5학년인 우리 아이가 분수의 나눗셈을 어려워해요. 실생활 예시를 들어 쉽게 설명해주세요."

3. 단계별 질문법
   - 1단계: 기본 개념 질문
   - 2단계: 예시 요청
   - 3단계: 연습 문제 요청

4. 자녀 학습용 질문 템플릿
   - "우리 아이는 __학년이고, __과목의 __부분을 어려워합니다..."

5. 오늘의 실습
   - 템플릿을 활용해 질문 만들어보기`,
    tip: '💡 AI에게 구체적인 배경 정보를 주면 더 맞춤화된 답변을 받을 수 있어요!',
    challenge: '🎯 도전: 자녀가 어려워하는 과목을 구체적으로 설명하고 도움을 요청해보세요!',
    youtubeKeyword: '프롬프트 엔지니어링 초보 가이드'
  },
  6: {
    title: '역할 부여하기',
    desc: 'AI에게 전문가 역할 주기',
    prompt: `저는 학부형입니다. AI에게 역할을 부여해서 더 전문적인 답변을 받고 싶습니다.

1. 역할 부여의 효과
   - 답변의 톤과 수준 조절
   - 특정 관점에서의 조언

2. 유용한 역할 예시
   - "당신은 20년 경력의 초등학교 교사입니다"
   - "당신은 아동 심리 전문가입니다"
   - "당신은 학습 코칭 전문가입니다"

3. 역할 부여 활용법
   - 학습 지도: 선생님 역할
   - 심리 상담: 상담사 역할
   - 진로 탐색: 진로 상담사 역할

4. 실습 예시
   - "당신은 경험 많은 초등교사입니다. 우리 아이가 수학을 싫어하는데 흥미를 높일 방법을 알려주세요."

5. 오늘의 과제
   - 3가지 다른 역할로 같은 질문을 해보고 답변 비교하기`,
    tip: '💡 역할을 구체적으로 설정할수록 AI의 답변이 더 전문적이고 실용적이 됩니다!',
    challenge: '🎯 도전: "아동 심리 전문가" 역할을 주고 자녀의 학습 태도 상담을 받아보세요!',
    youtubeKeyword: 'ChatGPT 역할 부여 프롬프트'
  },
  7: {
    title: '단계별 대화법',
    desc: '복잡한 문제를 단계별로 풀어가기',
    prompt: `저는 학부형입니다. AI와 단계별로 대화하며 복잡한 문제를 해결하고 싶습니다.

1. 단계별 대화의 장점
   - 복잡한 문제 체계적 해결
   - AI 답변의 방향 조절 가능
   - 원하는 결과물 도출

2. 단계별 대화 구조
   - 1단계: 상황 설명
   - 2단계: 기본 개념 확인
   - 3단계: 구체적 방법 요청
   - 4단계: 예시 및 연습 문제

3. 실전 예시: 자녀 수학 지도
   - "우리 아이가 분수를 어려워해요" → 원인 파악
   - "어떤 개념부터 다시 잡아야 할까요?" → 학습 순서
   - "재미있게 가르칠 방법은요?" → 교수법
   - "연습 문제를 만들어주세요" → 실습 자료

4. 이전 대화 참조하기
   - "위에서 말한 방법을 더 자세히 설명해주세요"
   - "두 번째 방법을 중심으로 계획을 세워주세요"

5. 오늘의 과제
   - 자녀의 학습 문제를 4단계로 나눠서 해결해보기`,
    tip: '💡 AI와의 대화는 한 번에 끝내지 않아도 됩니다. 여러 번 주고받으며 점점 깊이 들어가세요!',
    challenge: '🎯 도전: 자녀의 학습 고민을 4단계 대화로 해결책을 찾아보세요!',
    youtubeKeyword: 'ChatGPT 대화 기법 심화'
  },
  8: {
    title: '형식 지정하기',
    desc: '표, 목록, 단계별로 정리 요청',
    prompt: `저는 학부형입니다. AI의 답변을 원하는 형식으로 받고 싶습니다.

1. 활용 가능한 형식들
   - 목록 (bullet points)
   - 번호 목록 (1, 2, 3...)
   - 표 (table)
   - 단계별 설명
   - 비교 형식

2. 형식 지정 방법
   - "표로 정리해주세요"
   - "5가지로 요약해주세요"
   - "장단점을 비교해주세요"
   - "시간순으로 나열해주세요"

3. 자녀 교육에 유용한 형식
   - 주간 학습 계획표
   - 과목별 공부 방법 목록
   - 오답 원인 분석표

4. 실습 예시
   - "초등학생 여름방학 학습 계획을 주간 표로 만들어주세요"

5. 오늘의 과제
   - 자녀의 학습 계획을 표 형식으로 만들어보기`,
    tip: '💡 형식을 지정하면 AI 답변을 바로 활용하기 좋게 받을 수 있어요!',
    challenge: '🎯 도전: 자녀의 일주일 학습 계획표를 AI에게 만들어달라고 해보세요!',
    youtubeKeyword: '프롬프트 형식 지정 방법'
  },
  9: {
    title: '수준 조절하기',
    desc: '자녀 나이에 맞는 답변 받기',
    prompt: `저는 학부형입니다. AI 답변의 수준을 자녀 나이에 맞게 조절하고 싶습니다.

1. 수준 지정 방법
   - 학년 명시: "초등 3학년 수준으로"
   - 나이 명시: "8살 아이가 이해할 수 있게"
   - 비유 요청: "아이가 좋아하는 것에 비유해서"

2. 수준별 예시 비교
   - 초등 저학년: 그림, 이야기 형식
   - 초등 고학년: 예시 중심 설명
   - 중학생: 개념+예시+응용

3. 효과적인 수준 조절 프롬프트
   - "7살 아이에게 공룡에 비유해서 설명해줘"
   - "초등 5학년이 스스로 읽고 이해할 수 있게 써줘"

4. 실습 시나리오
   - 같은 개념을 3가지 수준으로 설명 요청해보기

5. 오늘의 과제
   - 자녀가 배우는 개념을 정확한 학년 수준으로 설명 요청하기`,
    tip: '💡 AI에게 구체적인 나이/학년을 알려주면 딱 맞는 수준의 답변을 받을 수 있어요!',
    challenge: '🎯 도전: 같은 과학 개념을 초등 1학년과 6학년 버전으로 각각 요청해보세요!',
    youtubeKeyword: '아이 눈높이 설명 ChatGPT'
  },
  10: {
    title: '예시 요청하기',
    desc: '구체적인 예시로 이해 돕기',
    prompt: `저는 학부형입니다. AI에게 좋은 예시를 요청하는 방법을 배우고 싶습니다.

1. 예시 요청의 중요성
   - 추상적 개념의 구체화
   - 자녀의 이해도 향상
   - 실생활 적용 가능

2. 예시 요청 방법
   - "실생활 예시를 3가지 들어줘"
   - "아이가 좋아하는 게임에 비유해줘"
   - "만화 캐릭터를 활용해서 설명해줘"

3. 효과적인 예시 유형
   - 일상생활 예시
   - 게임/만화 비유
   - 단계별 시각화

4. 자녀 관심사 활용하기
   - "우리 아이가 마인크래프트를 좋아해요. 분수를 마인크래프트에 비유해서 설명해주세요."

5. 오늘의 과제
   - 자녀 관심사를 활용한 학습 예시 만들어보기`,
    tip: '💡 아이의 관심사를 활용하면 어려운 개념도 쉽게 이해시킬 수 있어요!',
    challenge: '🎯 도전: 자녀가 좋아하는 것에 비유해서 수학 개념 설명을 요청해보세요!',
    youtubeKeyword: '아이 흥미 학습 방법'
  },
  11: {
    title: '학습 자료 생성하기',
    desc: '퀴즈, 문제, 정리 자료 만들기',
    prompt: `저는 학부형입니다. AI를 활용해 자녀 학습 자료를 만들고 싶습니다.

1. 만들 수 있는 학습 자료
   - 개념 정리 노트
   - 연습 문제
   - 퀴즈 (객관식/주관식)
   - 플래시카드
   - 타임라인

2. 학습 자료 요청 방법
   - "초등 5학년 분수 연습문제 10개를 만들어줘"
   - "중간 난이도로 해줘"
   - "정답과 풀이도 함께 줘"

3. 효과적인 자료 생성 팁
   - 난이도 조절 요청
   - 단계별 문제 구성
   - 오답 유형 포함

4. 실습 예시
   - "초등 4학년 곱셈 문제를 쉬움/보통/어려움 각 5문제씩 만들어줘"

5. 오늘의 과제
   - 자녀가 배우는 단원의 연습문제를 AI로 만들어보기`,
    tip: '💡 AI로 만든 문제는 무한대입니다! 자녀에게 딱 맞는 난이도로 맞춤 제작하세요!',
    challenge: '🎯 도전: 자녀가 다음 주에 시험 볼 과목의 예상 문제를 만들어보세요!',
    youtubeKeyword: 'AI 학습자료 만들기'
  },
  12: {
    title: '오류 수정하기',
    desc: 'AI 답변 검증 및 수정 요청',
    prompt: `저는 학부형입니다. AI 답변의 오류를 찾고 수정하는 방법을 배우고 싶습니다.

1. AI 오류의 유형
   - 사실 오류 (잘못된 정보)
   - 불완전한 설명
   - 수준에 맞지 않는 답변
   - 최신 정보 누락

2. 오류 확인 방법
   - 핵심 사실 교차 확인
   - 교과서와 비교
   - 추가 질문으로 검증

3. 수정 요청 방법
   - "이 부분이 틀린 것 같은데 확인해줘"
   - "더 정확한 정보로 수정해줘"
   - "최신 정보로 업데이트해줘"

4. 신뢰할 수 있는 정보 활용
   - 교과서 내용과 비교
   - 공신력 있는 사이트 확인

5. 오늘의 과제
   - AI 답변을 받고 교과서와 비교해보기`,
    tip: '💡 AI도 틀릴 수 있습니다. 중요한 내용은 반드시 교과서나 공식 자료와 확인하세요!',
    challenge: '🎯 도전: AI 답변을 받고 교과서와 비교하여 다른 점이 있는지 확인해보세요!',
    youtubeKeyword: 'AI 정보 검증 방법'
  },
  13: {
    title: '대화 이어가기',
    desc: '맥락을 유지하며 심화 질문하기',
    prompt: `저는 학부형입니다. AI와 긴 대화를 이어가며 깊이 있는 도움을 받고 싶습니다.

1. 대화 이어가기의 장점
   - 배경 설명 반복 불필요
   - 점점 구체화되는 답변
   - 맞춤형 해결책 도출

2. 효과적인 후속 질문
   - "방금 말한 첫 번째 방법을 자세히 알려줘"
   - "우리 아이 상황에 맞게 수정해줘"
   - "더 쉬운 예시를 들어줘"

3. 맥락 유지 팁
   - 이전 답변 참조하기
   - 새로운 정보 추가하기
   - 방향 수정 요청하기

4. 대화 정리 요청
   - "지금까지 대화 내용을 요약해줘"
   - "핵심 포인트만 정리해줘"

5. 오늘의 과제
   - 하나의 주제로 5번 이상 대화 이어가기`,
    tip: '💡 한 번의 질문으로 끝내지 마세요. 계속 질문하며 더 좋은 답변을 이끌어내세요!',
    challenge: '🎯 도전: 자녀 교육 고민 하나를 5번 이상 후속 질문으로 파고들어보세요!',
    youtubeKeyword: 'ChatGPT 대화 이어가기'
  },
  14: {
    title: '일상에서 AI 활용',
    desc: '학습 외 생활 속 AI 활용',
    prompt: `저는 학부형입니다. 일상생활에서 AI를 활용하는 방법을 배우고 싶습니다.

1. 일상 활용 사례
   - 요리 레시피 추천
   - 여행 계획 세우기
   - 편지/메시지 작성
   - 일정 관리 조언

2. 자녀와 함께하는 AI 활용
   - 주말 활동 계획 세우기
   - 가족 여행 코스 짜기
   - 생일 파티 아이디어

3. 가사 업무 도움
   - 장보기 목록 만들기
   - 식단 계획
   - 청소/정리 팁

4. 창작 활동 도움
   - 동화 만들기
   - 노래 가사 작성
   - 게임 아이디어

5. 오늘의 과제
   - 가족과 함께 주말 계획을 AI로 세워보기`,
    tip: '💡 AI는 학습뿐 아니라 일상의 모든 곳에서 도움을 줄 수 있어요!',
    challenge: '🎯 도전: AI와 함께 이번 주말 가족 활동 계획을 세워보세요!',
    youtubeKeyword: '일상생활 AI 활용법'
  },
  15: {
    title: 'AI 기초 마무리',
    desc: '배운 내용 정리 및 실전 활용',
    prompt: `저는 학부형입니다. 지난 2주간 배운 AI 활용법을 정리하고 싶습니다.

1. 핵심 내용 복습
   - ChatGPT, Claude, Gemini 특징
   - 효과적인 질문법
   - 역할 부여, 수준 조절

2. 나만의 활용 전략
   - 자녀 교육에 가장 유용했던 방법
   - 앞으로 자주 사용할 기능
   - 개선할 점

3. 실전 활용 계획
   - 주간 AI 활용 계획 세우기
   - 자녀와 함께 할 AI 프로젝트

4. 다음 단계 안내
   - 2단계: 마인드셋 변화
   - 가르치는 부모에서 함께 배우는 부모로

5. 오늘의 과제
   - 15일간 배운 내용 중 가장 유용한 3가지 정리하기`,
    tip: '💡 축하합니다! AI 기초를 마스터했어요. 이제 본격적으로 자녀 교육에 활용할 준비가 됐습니다!',
    challenge: '🎯 도전: 2단계로 넘어가기 전에 배운 내용을 가족과 공유해보세요!',
    youtubeKeyword: 'AI 교육 활용 종합 가이드'
  },
};

// 마인드셋 레슨 데이터
const mindsetLessons: { [day: number]: { title: string; desc: string; prompt: string; tip: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: 'AI 시대의 부모 역할',
    desc: '변화하는 교육 환경과 부모의 위치',
    prompt: `저는 학부형입니다. AI 시대에 부모로서 어떤 역할을 해야 하는지 알려주세요.

1. 달라진 교육 환경
   - 정보 접근성의 변화
   - AI가 할 수 있는 것과 없는 것
   - 미래에 필요한 역량

2. 부모 역할의 변화
   - 지식 전달자 → 학습 촉진자
   - 정답 제공자 → 질문 유도자
   - 감시자 → 동반자

3. AI 시대 부모의 핵심 역할
   - 호기심 자극하기
   - 비판적 사고 기르기
   - 정서적 지지

4. 구체적인 변화 방법
   - "왜?"라고 물어보는 습관
   - 함께 찾아보는 자세
   - 실패를 격려하기

5. 오늘의 성찰
   - 나는 어떤 부모인가? 어떤 부모가 되고 싶은가?`,
    tip: '💡 AI 시대에 부모의 역할은 "가르치는 사람"에서 "함께 배우는 동반자"로 바뀌고 있어요!',
    challenge: '🎯 도전: 오늘 자녀에게 "왜 그렇게 생각해?"라고 3번 이상 물어보세요!',
    youtubeKeyword: 'AI 시대 부모 역할 변화'
  },
  2: {
    title: '가르치기 vs 함께 배우기',
    desc: '동반 학습의 힘',
    prompt: `저는 학부형입니다. 자녀와 "함께 배우는" 방법을 배우고 싶습니다.

1. 가르치기의 한계
   - 부모도 모르는 새로운 지식
   - 권위적 관계의 문제
   - 자녀의 수동적 태도

2. 함께 배우기의 장점
   - 수평적 관계 형성
   - 자녀의 주도성 향상
   - 부모-자녀 유대 강화

3. 실천 방법
   - "엄마/아빠도 잘 모르는데, 같이 알아볼까?"
   - 자녀에게 배운 것 설명해달라고 하기
   - 서로 역할 바꿔보기

4. AI와 함께 배우기
   - 새로운 주제를 AI에게 같이 물어보기
   - AI 답변을 함께 토론하기
   - AI가 틀렸는지 같이 확인하기

5. 오늘의 과제
   - 자녀와 함께 새로운 것 하나를 AI로 배워보기`,
    tip: '💡 "엄마/아빠도 몰라"라고 솔직히 말하는 것이 오히려 자녀의 호기심을 자극합니다!',
    challenge: '🎯 도전: 자녀가 관심 있어하는 주제를 AI로 함께 탐구해보세요!',
    youtubeKeyword: '부모 자녀 동반 학습'
  },
  3: {
    title: '정답 중심에서 과정 중심으로',
    desc: '결과보다 과정을 중시하는 태도',
    prompt: `저는 학부형입니다. 자녀의 학습에서 "과정"을 중시하는 방법을 배우고 싶습니다.

1. 정답 중심 교육의 문제
   - 창의성 저하
   - 실패 공포
   - 동기 부족

2. 과정 중심 교육의 가치
   - 시행착오에서 배우기
   - 사고력 발달
   - 내적 동기 형성

3. 과정 중심 대화법
   - "정답이 뭐야?" → "어떻게 풀었어?"
   - "왜 틀렸어?" → "어떤 생각으로 이렇게 했어?"
   - "빨리 해" → "천천히 생각해봐"

4. AI 활용 시 과정 강조
   - AI 답변을 바로 쓰지 않기
   - AI와 함께 사고 과정 따라가기
   - "왜 AI가 이렇게 답했을까?" 토론

5. 오늘의 실습
   - 자녀 숙제를 "과정 중심"으로 도와주기`,
    tip: '💡 "어떻게 그 답을 찾았어?"라는 질문이 "정답이 뭐야?"보다 훨씬 가치 있습니다!',
    challenge: '🎯 도전: 오늘 자녀의 숙제를 도울 때 과정에 대해서만 이야기해보세요!',
    youtubeKeyword: '과정 중심 교육 방법'
  },
  4: {
    title: '실패를 격려하는 부모',
    desc: '성장형 마인드셋 기르기',
    prompt: `저는 학부형입니다. 자녀가 실패를 두려워하지 않도록 돕고 싶습니다.

1. 실패 공포의 원인
   - 결과 중심 평가
   - 비교 문화
   - 완벽주의 압박

2. 성장형 마인드셋이란
   - 능력은 노력으로 성장
   - 실패는 배움의 기회
   - 도전을 즐기는 태도

3. 성장형 마인드셋 기르기
   - "틀려도 괜찮아" 자주 말하기
   - 부모의 실패 경험 공유
   - 노력을 칭찬하기

4. 칭찬 방법 바꾸기
   - "똑똒하네" → "열심히 했구나"
   - "잘했어" → "포기 안 하고 끝까지 했구나"

5. 오늘의 과제
   - 자녀의 실패 경험을 긍정적으로 재해석해주기`,
    tip: '💡 "실수해도 괜찮아. 실수에서 배우는 게 진짜 공부야"라고 말해주세요!',
    challenge: '🎯 도전: 자녀에게 부모의 실패 경험을 이야기해주세요!',
    youtubeKeyword: '성장형 마인드셋 자녀교육'
  },
  5: {
    title: '질문하는 아이로 키우기',
    desc: '호기심과 탐구력 육성',
    prompt: `저는 학부형입니다. 자녀가 스스로 질문하는 아이가 되도록 돕고 싶습니다.

1. 질문의 중요성
   - AI 시대의 핵심 역량
   - 자기주도 학습의 시작
   - 창의성과 비판적 사고

2. 아이들이 질문을 멈추는 이유
   - 무시당한 경험
   - "모른다"는 답에 대한 두려움
   - 정답만 중시하는 환경

3. 질문을 유도하는 방법
   - 모든 질문에 진지하게 반응
   - "좋은 질문이야!" 자주 사용
   - 정답 대신 함께 찾아보기

4. AI로 질문력 키우기
   - 자녀가 직접 AI에게 질문하게 하기
   - "AI에게 뭘 물어볼까?" 함께 고민
   - AI 답변에 추가 질문 만들기

5. 오늘의 실습
   - 저녁 식사 시간에 "오늘 궁금한 거 있어?" 물어보기`,
    tip: '💡 어린아이들의 "왜?"라는 질문을 귀찮아하지 마세요. 그게 가장 소중한 배움의 시작입니다!',
    challenge: '🎯 도전: 자녀와 함께 "오늘의 궁금증"을 AI로 해결해보세요!',
    youtubeKeyword: '아이 질문력 키우기'
  },
  6: {
    title: '비교하지 않기',
    desc: '자녀의 고유한 가치 인정',
    prompt: `저는 학부형입니다. 자녀를 다른 아이들과 비교하지 않는 방법을 배우고 싶습니다.

1. 비교의 해로움
   - 자존감 저하
   - 형제간 갈등
   - 내적 동기 감소

2. 비교 대신 할 것
   - 어제의 자녀와 오늘의 자녀 비교
   - 개인의 강점 찾기
   - 노력과 성장 인정

3. 비교 습관 고치기
   - 비교 충동 인식하기
   - 다름을 인정하기
   - 각자의 속도 존중

4. 개별화된 칭찬법
   - 자녀만의 장점 언급
   - 구체적 노력 칭찬
   - 성장 기록 남기기

5. 오늘의 성찰
   - 최근에 자녀를 비교한 적이 있다면 반성해보기`,
    tip: '💡 모든 아이는 각자의 속도로 성장합니다. 비교는 독이 됩니다!',
    challenge: '🎯 도전: 오늘 자녀에게 "너만의 특별한 점"을 이야기해주세요!',
    youtubeKeyword: '자녀 비교 안하기 육아'
  },
  7: {
    title: '경청하는 부모',
    desc: '자녀의 이야기에 귀 기울이기',
    prompt: `저는 학부형입니다. 자녀의 이야기를 잘 듣는 방법을 배우고 싶습니다.

1. 경청의 중요성
   - 신뢰 관계 형성
   - 자녀 마음 이해
   - 문제 조기 발견

2. 경청을 방해하는 것
   - 핸드폰 보면서 듣기
   - 조언/훈계 먼저
   - 말 끊기

3. 효과적인 경청 방법
   - 눈 맞춤
   - 고개 끄덕임
   - "그랬구나" 공감
   - 요약해서 확인

4. 자녀와의 대화 시간 만들기
   - 잠자리 대화
   - 하교 후 10분
   - 주말 특별 시간

5. 오늘의 실습
   - 자녀 이야기를 5분 동안 끊지 않고 듣기`,
    tip: '💡 자녀가 말할 때 핸드폰을 내려놓으세요. 그것만으로도 큰 변화가 시작됩니다!',
    challenge: '🎯 도전: 오늘 자녀 이야기를 5분 동안 조언 없이 들어보세요!',
    youtubeKeyword: '부모 경청 방법 자녀소통'
  },
  8: {
    title: '함께 성장하는 자세',
    desc: '부모도 배우고 변화한다',
    prompt: `저는 학부형입니다. 자녀와 함께 성장하는 부모가 되고 싶습니다.

1. 부모도 성장해야 하는 이유
   - 빠르게 변하는 세상
   - 자녀에게 보여주는 본보기
   - 세대 간 소통

2. 부모가 배울 것들
   - 새로운 기술 (AI 등)
   - 변화하는 교육
   - 자녀 세대 문화

3. 성장하는 부모의 자세
   - "나도 잘 모르지만 배워볼게"
   - 자녀에게 배우기
   - 실수 인정하기

4. 자녀와 함께 배우기
   - 새로운 취미 함께 시작
   - 책/영상 함께 보기
   - 서로 가르쳐주기

5. 오늘의 다짐
   - 앞으로 배우고 싶은 것 목록 만들기`,
    tip: '💡 자녀에게 "엄마/아빠도 배우는 중이야"라고 말하는 것은 부끄러운 게 아니에요!',
    challenge: '🎯 도전: 자녀에게 최근에 새로 배운 것을 이야기해주세요!',
    youtubeKeyword: '부모 성장 자기계발'
  },
  9: {
    title: '디지털 세대 이해하기',
    desc: '자녀 세대의 특성과 문화',
    prompt: `저는 학부형입니다. 디지털 네이티브인 자녀 세대를 이해하고 싶습니다.

1. 디지털 네이티브의 특징
   - 태어날 때부터 스마트폰
   - 멀티태스킹
   - 영상 선호

2. 세대 차이 이해하기
   - 정보 습득 방식 차이
   - 소통 방식 차이
   - 놀이 문화 차이

3. 세대 갈등 해소법
   - 자녀 세대 문화 관심 갖기
   - 판단 전에 이해하기
   - 공통 관심사 찾기

4. 자녀 세대에서 배우기
   - 새로운 앱/게임 알아보기
   - 인터넷 용어 배우기
   - 유튜버/인플루언서 이해하기

5. 오늘의 과제
   - 자녀가 좋아하는 것 하나를 함께 해보기`,
    tip: '💡 자녀가 보는 유튜브 채널 하나를 함께 시청해보세요. 대화가 달라집니다!',
    challenge: '🎯 도전: 자녀가 즐겨하는 게임이나 활동을 함께 해보세요!',
    youtubeKeyword: 'MZ세대 알파세대 자녀 이해'
  },
  10: {
    title: '마인드셋 마무리',
    desc: '변화를 다짐하고 다음 단계로',
    prompt: `저는 학부형입니다. 지난 10일간 배운 마인드셋 변화를 정리하고 싶습니다.

1. 핵심 변화 복습
   - 가르치기 → 함께 배우기
   - 정답 중심 → 과정 중심
   - 비교 → 개별 존중

2. 나의 변화 점검
   - 가장 크게 바뀐 점
   - 아직 어려운 점
   - 계속 노력할 점

3. 자녀와의 관계 변화
   - 대화가 늘었는지
   - 신뢰가 깊어졌는지
   - 갈등이 줄었는지

4. 다음 단계 준비
   - 3단계: 자녀 교육 실전
   - AI 활용 학습 지원
   - 함께하는 프로젝트

5. 오늘의 다짐
   - 변화를 위한 구체적 계획 세우기`,
    tip: '💡 마인드셋 변화는 하루아침에 되지 않아요. 매일 조금씩 실천하는 것이 중요합니다!',
    challenge: '🎯 도전: 앞으로 1달간 실천할 구체적인 계획을 세워보세요!',
    youtubeKeyword: '부모 마인드셋 변화'
  },
};

// 기본 레슨 데이터 생성
const getDefaultLesson = (subject: string, day: number) => ({
  title: `Day ${day} 학습`,
  desc: `${subjectInfo[subject]?.name || subject} ${day}일차`,
  prompt: `${subjectInfo[subject]?.name || subject} ${day}일차 학습 내용을 자세히 알려주세요.

1. 오늘의 학습 목표
2. 핵심 개념
3. 실천 방법
4. 자녀와 함께하기
5. 성찰 및 과제`,
  tip: '💡 학습 팁: 꾸준한 실천이 가장 중요합니다!',
  challenge: '🎯 도전: 오늘 배운 내용을 하나라도 실천해보세요!',
  youtubeKeyword: `${subjectInfo[subject]?.name || subject} 학습`
});

const getLessonData = (subject: string, day: number) => {
  switch (subject) {
    case 'ai-basics':
      return aiBasicsLessons[day] || getDefaultLesson(subject, day);
    case 'mindset':
      return mindsetLessons[day] || getDefaultLesson(subject, day);
    default:
      return getDefaultLesson(subject, day);
  }
};

export default function ParentLessonPage() {
  const params = useParams();
  const subject = params.course as string;
  const day = Number(params.day);
  const subjectData = subjectInfo[subject];
  const lesson = getLessonData(subject, day);

  const [copied, setCopied] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`parent-${subject}-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [subject, day]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    const urls = {
      claude: 'https://claude.ai/new',
      chatgpt: 'https://chat.openai.com/',
      gemini: 'https://gemini.google.com/',
    };
    window.open(urls[selectedAI], '_blank');
  };

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`parent-${subject}-day${day}-completed`, 'true');

    const savedList = localStorage.getItem(`parent-${subject}-completed`);
    const completedList = savedList ? JSON.parse(savedList) : [];
    if (!completedList.includes(day)) {
      completedList.push(day);
      localStorage.setItem(`parent-${subject}-completed`, JSON.stringify(completedList));
    }

    setTimeout(() => setShowConfetti(false), 3000);
  };

  const openYouTube = () => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.youtubeKeyword)}`;
    window.open(searchUrl, '_blank');
  };

  if (!subjectData) {
    return <div className="min-h-screen flex items-center justify-center">과목을 찾을 수 없습니다.</div>;
  }

  const maxDay = subjectData.totalDays;
  const IconComponent = subjectData.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${subjectData.bgColor}`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '24px'
            }}>
              {['🎉', '⭐', '🏆', '✨', '👨‍👩‍👧‍👦'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2"><Brain className="w-5 h-5 text-white" /></div>
                <span className="text-xl font-bold">UTTEC Edu</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/course/parent" className="hover:text-purple-600">학부형 트랙</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/parent/${subject}`} className="hover:text-purple-600">{subjectData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${subjectData.color} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <div className="text-white/70 text-sm mb-1">{subjectData.name}</div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-white/80">{lesson.desc}</p>
              </div>
            </div>
            {completed && (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">완료!</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-purple-800 mb-1">학습 팁</p>
              <p className="text-purple-700 text-sm">{lesson.tip}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className={`w-5 h-5 text-${subjectData.textColor}-500`} />
              AI 프롬프트
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedAI}
                onChange={(e) => setSelectedAI(e.target.value as 'claude' | 'chatgpt' | 'gemini')}
                className="text-sm border rounded-lg px-3 py-1.5"
              >
                <option value="claude">Claude</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : `bg-gradient-to-r ${subjectData.color} text-white`}`}>
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button onClick={openAI} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI 열기
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Youtube className="w-5 h-5 text-red-500" />
            유튜브 참고 영상
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            관련 영상을 검색하여 심화 학습을 해보세요.
          </p>
          <button
            onClick={openYouTube}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <Youtube className="w-5 h-5" />
            유튜브에서 검색하기
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-4 mb-6">
          <p className="text-orange-800 font-medium">{lesson.challenge}</p>
        </div>

        {!completed ? (
          <button
            onClick={markComplete}
            className={`w-full bg-gradient-to-r ${subjectData.color} text-white py-4 rounded-xl font-bold text-lg transition hover:opacity-90 flex items-center justify-center gap-2`}
          >
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        ) : (
          <div className="bg-green-100 text-green-800 py-4 rounded-xl font-bold text-lg text-center flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6" />
            학습 완료! 수고하셨습니다!
          </div>
        )}

        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link
              href={`/course/parent/${subject}/lesson/${day - 1}`}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              이전 레슨
            </Link>
          ) : <div />}
          {day < maxDay ? (
            <Link
              href={`/course/parent/${subject}/lesson/${day + 1}`}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition"
            >
              다음 레슨
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href={`/course/parent/${subject}`}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium"
            >
              코스 완료!
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
