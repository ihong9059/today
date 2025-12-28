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

// 학교급별 정보
const levelInfo: Record<string, { title: string; icon: string; color: string }> = {
  'elementary': { title: '초등교사 코스', icon: '🌱', color: 'from-green-500 to-emerald-500' },
  'middle': { title: '중등교사 코스', icon: '📚', color: 'from-blue-500 to-indigo-500' },
  'high': { title: '고등교사 코스', icon: '🎓', color: 'from-purple-500 to-pink-500' },
};

// ============================================
// 레슨별 프롬프트 데이터
// ============================================
const lessonPrompts: Record<string, Record<number, { title: string; subtitle: string; prompts: { id: number; title: string; prompt: string }[] }>> = {
  // ============================================
  // 초등교사 코스
  // ============================================
  'elementary': {
    1: {
      title: '초등 교육학 기초',
      subtitle: '초등학생 발달 특성과 학습 동기를 이해합니다.',
      prompts: [
        {
          id: 1,
          title: '초등학생 발달 단계 이해하기',
          prompt: `초등학생(6-12세)의 발달 단계와 특성에 대해 알려주세요.

다음 내용을 포함해주세요:
1. 인지 발달 (피아제 이론 기반)
   - 구체적 조작기의 특징
   - 학년별 인지 능력 차이

2. 사회정서 발달
   - 또래 관계의 중요성
   - 자아 개념 형성

3. 학습 특성
   - 호기심과 탐구심
   - 구체적 경험의 중요성
   - 짧은 집중 시간

4. AI 교육 시 고려할 점
   - 발달 단계에 맞는 AI 도구
   - 적절한 활동 시간

초등교사가 수업 설계 시 참고할 수 있도록 실용적으로 작성해주세요.`,
        },
        {
          id: 2,
          title: '초등학생 학습 동기 부여',
          prompt: `초등학생의 학습 동기를 높이는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 내재적 동기 vs 외재적 동기
   - 초등학생에게 효과적인 동기 유형
   - 균형 잡힌 접근법

2. 학습 동기 촉진 전략
   - 호기심 자극하기
   - 성공 경험 제공
   - 즉각적 피드백
   - 선택권 부여

3. AI를 활용한 동기 부여
   - AI와의 대화형 학습
   - 게임화 요소 도입
   - 맞춤형 칭찬과 격려

4. 동기 저하 시 대처 방법

구체적인 수업 사례와 대화 예시를 포함해주세요.`,
        },
        {
          id: 3,
          title: '초등 학급 경영의 기초',
          prompt: `AI 시대 초등학교 학급 경영의 기초를 알려주세요.

다음 내용을 포함해주세요:
1. 학급 경영의 기본 원리
   - 긍정적 학급 분위기 조성
   - 규칙과 루틴 설정
   - 공동체 의식 형성

2. AI 도구 활용 학급 경영
   - 학생 관찰 및 기록
   - 학부모 소통
   - 학습 관리

3. 초등 특화 경영 전략
   - 저학년 vs 고학년 차이
   - 다양한 학생 지원
   - 갈등 해결

4. 실천 가이드
   - 첫 주 학급 경영
   - 월별 체크리스트

신임 초등교사도 바로 적용할 수 있게 구체적으로 작성해주세요.`,
        },
      ],
    },
    2: {
      title: '효과적인 초등 교수법',
      subtitle: '놀이 학습, 체험 활동, 협동 학습을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: '놀이 기반 AI 학습',
          prompt: `초등학생을 위한 놀이 기반 AI 학습 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 놀이 기반 학습의 원리
   - 왜 놀이가 효과적인가
   - 놀이와 학습의 연결

2. AI 활용 놀이 학습 아이디어
   - AI와 스무고개 놀이
   - AI 퀴즈 게임
   - AI 이야기 만들기 놀이
   - AI 그림 맞추기

3. 교과별 놀이 학습 예시
   - 국어: AI와 끝말잇기, 이야기 완성
   - 수학: AI 수학 퍼즐
   - 과학: AI 실험 예측 놀이
   - 사회: AI 역사 인물 인터뷰

4. 놀이 학습 수업 설계 팁
   - 시간 배분
   - 규칙 설정
   - 마무리 활동

각 활동에 대한 구체적인 진행 방법을 포함해주세요.`,
        },
        {
          id: 2,
          title: '체험 중심 AI 수업',
          prompt: `초등학생을 위한 체험 중심 AI 수업 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 체험 학습의 중요성
   - 구체적 경험의 가치
   - 오감을 활용한 학습

2. AI를 활용한 체험 활동
   - AI로 가상 견학하기
   - AI와 역할극 하기
   - AI 활용 만들기 활동
   - AI 인터뷰 체험

3. 단계별 체험 수업 모델
   - 도입: 호기심 유발
   - 전개: 체험 활동
   - 정리: 배움 나누기

4. 학년별 체험 수업 예시
   - 저학년(1-2학년)
   - 중학년(3-4학년)
   - 고학년(5-6학년)

실제 수업 지도안 형식으로 1개 예시를 포함해주세요.`,
        },
        {
          id: 3,
          title: '협동 학습과 AI',
          prompt: `초등학생을 위한 협동 학습과 AI 활용 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 협동 학습의 원리
   - 긍정적 상호의존
   - 개인 책무성
   - 대면적 상호작용
   - 사회적 기술

2. AI 활용 협동 학습 모델
   - 모둠별 AI 프로젝트
   - AI 조력자 활용
   - 협동 AI 글쓰기
   - 공동 AI 탐구

3. 협동 학습 구조
   - 짝 활동
   - 4인 모둠 활동
   - 직소 모형
   - 프로젝트 학습

4. 문제 상황 대처
   - 무임승차 문제
   - 갈등 해결
   - 참여 격려

구체적인 활동 예시와 교사 역할을 포함해주세요.`,
        },
      ],
    },
    3: {
      title: 'AI 교육 자료 제작',
      subtitle: '그림책 만들기, 학습지 제작, 동영상 활용을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: 'AI로 그림책 만들기',
          prompt: `AI를 활용해 초등학생용 그림책을 만드는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 그림책 기획
   - 주제 선정 (교과 연계)
   - 대상 학년 고려
   - 스토리라인 구성

2. AI 활용 스토리 작성
   - AI에게 이야기 요청하기
   - 학생 수준에 맞게 수정
   - 교육적 메시지 담기

3. AI 이미지 생성 활용
   - 캐릭터 디자인 요청
   - 배경 이미지 생성
   - 일관된 스타일 유지

4. 그림책 완성
   - 레이아웃 구성
   - 텍스트 배치
   - 출력/공유 방법

실제 그림책 제작을 위한 AI 프롬프트 예시를 5개 포함해주세요.`,
        },
        {
          id: 2,
          title: 'AI로 학습지 제작',
          prompt: `AI를 활용해 초등학생용 학습지를 제작하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 학습지 유형
   - 개념 학습지
   - 연습 문제지
   - 활동지
   - 평가지

2. AI 활용 학습지 제작
   - 문제 생성 요청
   - 난이도 조절
   - 다양한 유형 제작

3. 교과별 학습지 예시
   - 국어: 읽기, 쓰기 활동지
   - 수학: 연산, 문장제 문제
   - 과학: 탐구 활동지
   - 사회: 조사 활동지

4. 학습지 디자인 팁
   - 시각적 요소 활용
   - 여백과 글씨 크기
   - 흥미 유발 요소

학년별 학습지 제작 프롬프트 템플릿을 제공해주세요.`,
        },
        {
          id: 3,
          title: 'AI 활용 동영상 자료',
          prompt: `AI를 활용해 초등 수업용 동영상 자료를 만드는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 동영상 자료 유형
   - 개념 설명 영상
   - 애니메이션 스토리
   - 퀴즈 영상
   - 실험/활동 안내

2. AI 활용 동영상 제작
   - AI 대본 작성
   - AI 음성 생성
   - AI 자막 생성
   - AI 영상 편집

3. 초등학생 맞춤 영상
   - 적절한 길이 (3-5분)
   - 시각적 요소 활용
   - 쉬운 언어 사용

4. 무료 AI 도구 활용
   - 사용 가능한 도구들
   - 기본 사용법

동영상 대본 작성을 위한 프롬프트 예시를 제공해주세요.`,
        },
      ],
    },
    4: {
      title: '수업 설계 및 모의 수업',
      subtitle: '수업 지도안 작성, 활동 설계, 평가 방법을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: 'AI 활용 수업 지도안 작성',
          prompt: `AI를 활용한 초등 수업 지도안 작성 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 수업 지도안 기본 구조
   - 단원명 및 차시
   - 학습 목표
   - 준비물
   - 지도 과정

2. AI 활용 수업 설계
   - 도입: AI 활용 동기 유발
   - 전개: AI 활동 설계
   - 정리: AI 활용 평가

3. 학년별 AI 수업 예시
   - 저학년: AI와 대화하기
   - 중학년: AI로 탐구하기
   - 고학년: AI로 프로젝트하기

4. 수업 지도안 작성 팁
   - 시간 배분
   - 발문 계획
   - 예상 반응

실제 수업 지도안 1개를 완성된 형태로 제공해주세요.`,
        },
        {
          id: 2,
          title: 'AI 활동 설계',
          prompt: `초등학생을 위한 AI 활용 활동을 설계하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. AI 활동 설계 원칙
   - 학습 목표 연계
   - 발달 단계 고려
   - 안전한 AI 사용

2. 활동 유형별 설계
   - AI 대화 활동
   - AI 창작 활동
   - AI 탐구 활동
   - AI 협력 활동

3. 교과 연계 AI 활동
   - 국어: AI와 글쓰기
   - 수학: AI 문제 풀이
   - 과학: AI 탐구 질문
   - 사회: AI 조사 활동
   - 미술: AI 그림 그리기

4. 활동 진행 시 유의점
   - 디지털 기기 관리
   - 학생 안전
   - 시간 관리

각 활동에 대한 구체적인 진행 절차를 포함해주세요.`,
        },
        {
          id: 3,
          title: '평가 방법 설계',
          prompt: `AI 활용 수업의 평가 방법을 설계하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 평가의 종류
   - 진단 평가
   - 형성 평가
   - 총괄 평가

2. AI 수업 평가 방법
   - 관찰 평가
   - 포트폴리오 평가
   - 자기 평가
   - 동료 평가

3. AI 활용 평가 도구
   - AI 퀴즈 생성
   - AI 피드백 활용
   - 학습 기록 분석

4. 평가 기준 설정
   - 루브릭 작성
   - 수준별 기준
   - 피드백 방법

AI 수업용 평가 루브릭 예시를 제공해주세요.`,
        },
      ],
    },
    5: {
      title: '교육 콘텐츠 포트폴리오',
      subtitle: '수업 기록, 학부모 안내, 성장 포트폴리오를 만듭니다.',
      prompts: [
        {
          id: 1,
          title: '수업 기록 정리하기',
          prompt: `AI 활용 수업 기록을 체계적으로 정리하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 수업 기록의 중요성
   - 성찰과 발전
   - 자료 축적
   - 공유와 협력

2. 기록할 내용
   - 수업 지도안
   - 학생 활동 결과물
   - 수업 사진/영상
   - 반성 및 개선점

3. AI 활용 기록 방법
   - AI로 수업 일지 작성
   - AI로 학생 관찰 기록
   - AI로 자료 정리

4. 포트폴리오 구성
   - 폴더 구조
   - 명명 규칙
   - 백업 방법

수업 기록 템플릿과 AI 프롬프트를 제공해주세요.`,
        },
        {
          id: 2,
          title: '학부모 안내문 작성',
          prompt: `AI 활용 수업에 대한 학부모 안내문 작성 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 학부모 안내의 필요성
   - AI 교육 이해 돕기
   - 가정 연계 협력
   - 우려 해소

2. 안내문 구성
   - AI 교육 소개
   - 수업 활동 안내
   - 가정에서 도움 방법
   - 주의사항 안내

3. AI 활용 안내문 작성
   - 쉬운 언어로 설명
   - 시각 자료 활용
   - Q&A 포함

4. 소통 채널 활용
   - 가정통신문
   - 학급 앱/SNS
   - 학부모 상담

학부모 안내문 예시와 작성 프롬프트를 제공해주세요.`,
        },
        {
          id: 3,
          title: '학생 성장 포트폴리오',
          prompt: `AI 활용 학습에서 학생 성장 포트폴리오 제작 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 성장 포트폴리오란
   - 목적과 의미
   - 기존 평가와의 차이

2. 포함할 내용
   - AI 활용 학습 결과물
   - 성장 과정 기록
   - 자기 성찰
   - 목표와 계획

3. AI 활용 포트폴리오 제작
   - AI로 성찰 일지 작성
   - AI로 성장 분석
   - 디지털 포트폴리오

4. 활용 방법
   - 학생 자기 평가
   - 학부모 공유
   - 다음 학년 연계

학생 성장 포트폴리오 양식과 AI 프롬프트를 제공해주세요.`,
        },
      ],
    },
  },

  // ============================================
  // 중등교사 코스
  // ============================================
  'middle': {
    1: {
      title: '중등 교육학 기초',
      subtitle: '청소년 발달 특성과 자기주도 학습을 이해합니다.',
      prompts: [
        {
          id: 1,
          title: '청소년 발달 단계 이해하기',
          prompt: `중학생(12-15세) 청소년의 발달 단계와 특성에 대해 알려주세요.

다음 내용을 포함해주세요:
1. 인지 발달
   - 형식적 조작기로의 전환
   - 추상적 사고 능력
   - 비판적 사고의 시작

2. 사회정서 발달
   - 정체성 탐색
   - 또래 집단의 영향
   - 자아 존중감 변화

3. 학습 특성
   - 자기주도 학습의 시작
   - 흥미와 적성 탐색
   - 학습 동기의 변화

4. AI 교육 시 고려할 점
   - 자율성 존중
   - 진로 탐색 연계
   - 디지털 리터러시

중등교사가 수업 설계 시 참고할 수 있도록 실용적으로 작성해주세요.`,
        },
        {
          id: 2,
          title: '중학생 학습 동기와 자기주도 학습',
          prompt: `중학생의 학습 동기와 자기주도 학습 능력을 키우는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 중학생 학습 동기의 특성
   - 내재적 동기의 중요성
   - 학습 목표 설정
   - 성취 경험의 가치

2. 자기주도 학습 지도
   - 학습 계획 세우기
   - 시간 관리
   - 자기 점검

3. AI를 활용한 자기주도 학습
   - AI 학습 도우미 활용
   - 개인 맞춤 학습
   - 즉각적 피드백

4. 학습 동기 저하 대처
   - 원인 파악
   - 상담 기법
   - 환경 조성

구체적인 수업 전략과 상담 사례를 포함해주세요.`,
        },
        {
          id: 3,
          title: '자유학기제와 AI 교육',
          prompt: `자유학기제에서 AI 교육을 활용하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 자유학기제 이해
   - 목적과 취지
   - 운영 방식
   - 평가 방법

2. 자유학기제 AI 프로그램
   - 진로 탐색 프로그램
   - 주제 선택 프로그램
   - 동아리 활동
   - 예술체육 활동

3. AI 활용 프로그램 예시
   - AI와 함께하는 진로 탐색
   - AI 창작 프로젝트
   - AI 코딩/메이커 활동

4. 프로그램 운영 팁
   - 학생 선택권 보장
   - 과정 중심 평가
   - 기록 및 피드백

자유학기제 AI 프로그램 계획서 예시를 제공해주세요.`,
        },
      ],
    },
    2: {
      title: '효과적인 중등 교수법',
      subtitle: '프로젝트 학습, 토론 수업, 협력 학습을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: '프로젝트 기반 AI 학습',
          prompt: `중학생을 위한 프로젝트 기반 AI 학습 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 프로젝트 학습의 원리
   - 실제적 문제 해결
   - 학생 주도성
   - 협력과 탐구

2. AI 활용 프로젝트 설계
   - 주제 선정 (AI 도움)
   - 자료 조사 (AI 활용)
   - 결과물 제작 (AI 협력)
   - 발표 및 공유

3. 교과 연계 프로젝트 예시
   - 국어: AI와 함께하는 창작
   - 사회: AI 사회 문제 탐구
   - 과학: AI 과학 실험 프로젝트
   - 기술가정: AI 메이커 프로젝트

4. 프로젝트 관리
   - 일정 관리
   - 역할 분담
   - 중간 점검

프로젝트 학습 계획서 템플릿을 제공해주세요.`,
        },
        {
          id: 2,
          title: 'AI 활용 토론 수업',
          prompt: `중학생을 위한 AI 활용 토론 수업 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 토론 수업의 가치
   - 비판적 사고력
   - 의사소통 능력
   - 다양한 관점 이해

2. AI 활용 토론 방법
   - AI로 토론 주제 탐색
   - AI로 자료 조사
   - AI를 토론 상대로 연습
   - AI로 논증 분석

3. 토론 수업 모델
   - 찬반 토론
   - 월드카페
   - 하브루타
   - 소크라테스 세미나

4. 진행 및 평가
   - 규칙 설정
   - 교사 역할
   - 평가 기준

토론 수업 지도안과 AI 프롬프트를 제공해주세요.`,
        },
        {
          id: 3,
          title: '협력 학습과 AI',
          prompt: `중학생을 위한 협력 학습과 AI 활용 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 협력 학습의 효과
   - 사회적 기술 발달
   - 다양한 역할 경험
   - 집단 지성 활용

2. AI 활용 협력 학습
   - 모둠별 AI 탐구
   - 협력 AI 프로젝트
   - AI 활용 역할 분담

3. 협력 학습 구조
   - 전문가 직소
   - 스테이션 러닝
   - 갤러리 워크
   - 그룹 탐구

4. 효과적인 모둠 구성
   - 이질 집단 vs 동질 집단
   - 역할 부여
   - 갈등 관리

협력 학습 활동지와 평가 루브릭을 제공해주세요.`,
        },
      ],
    },
    3: {
      title: 'AI 교육 자료 제작',
      subtitle: '교과 연계 자료, 진로 탐색 도구, 평가 도구를 제작합니다.',
      prompts: [
        {
          id: 1,
          title: '교과 연계 AI 자료 제작',
          prompt: `중학교 교과와 연계한 AI 활용 자료를 제작하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 교과 연계 원칙
   - 교육과정 분석
   - 성취기준 연계
   - AI 활용 적합성

2. 교과별 AI 자료 예시
   - 국어: 문학 작품 분석 자료
   - 수학: 개념 설명 자료
   - 영어: 회화 연습 자료
   - 사회/역사: 탐구 자료
   - 과학: 실험 가이드

3. AI 자료 제작 방법
   - 개념 설명 자료
   - 탐구 활동지
   - 심화 학습 자료
   - 수행평가 안내

4. 자료 관리 및 공유
   - 파일 정리
   - 동료 교사 공유
   - 학생 배포

교과별 AI 자료 제작 프롬프트를 제공해주세요.`,
        },
        {
          id: 2,
          title: 'AI 진로 탐색 도구 활용',
          prompt: `중학생 진로 탐색을 위한 AI 도구 활용 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 중학생 진로 발달 과업
   - 자기 이해
   - 직업 세계 탐색
   - 진로 계획 수립

2. AI 활용 진로 탐색
   - AI로 적성/흥미 탐색
   - AI로 직업 정보 조사
   - AI와 진로 상담
   - AI로 미래 직업 탐구

3. 진로 수업 활동
   - 자기 이해 활동
   - 직업 인터뷰 (AI 활용)
   - 진로 포트폴리오

4. 진로 상담 지원
   - AI 상담 도우미
   - 학부모 상담 자료

진로 탐색 활동지와 AI 프롬프트를 제공해주세요.`,
        },
        {
          id: 3,
          title: 'AI 활용 평가 도구 제작',
          prompt: `AI를 활용한 중학교 평가 도구를 제작하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 중학교 평가의 특성
   - 과정 중심 평가
   - 성장 중심 평가
   - 다양한 평가 방법

2. AI 활용 평가 도구
   - AI 문항 제작
   - AI 루브릭 생성
   - AI 피드백 자동화
   - 서술형 평가 지원

3. 평가 유형별 AI 활용
   - 지필 평가
   - 수행 평가
   - 포트폴리오 평가
   - 자기/동료 평가

4. 평가 결과 활용
   - 피드백 제공
   - 개별화 지도
   - 기록 작성

평가 도구 제작 프롬프트와 예시를 제공해주세요.`,
        },
      ],
    },
    4: {
      title: '수업 설계 및 모의 수업',
      subtitle: '자유학기제, 융합 수업, 진로 수업을 설계합니다.',
      prompts: [
        {
          id: 1,
          title: '융합 수업 설계',
          prompt: `AI를 활용한 중학교 융합 수업을 설계하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 융합 수업의 이해
   - STEAM 교육
   - 교과 융합의 가치
   - 융합 역량

2. AI 융합 수업 설계
   - 융합 주제 선정
   - 교과 간 연계
   - AI 활용 포인트
   - 평가 계획

3. 융합 수업 예시
   - 과학+미술+AI: AI 그림 분석
   - 국어+사회+AI: AI 뉴스 분석
   - 수학+기술+AI: AI 데이터 분석

4. 융합 수업 운영
   - 교사 협력
   - 시간 운영
   - 공간 활용

융합 수업 지도안 예시를 제공해주세요.`,
        },
        {
          id: 2,
          title: '진로 연계 수업 설계',
          prompt: `교과와 진로를 연계한 AI 활용 수업을 설계하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 교과-진로 연계의 중요성
   - 학습 동기 부여
   - 실생활 연결
   - 진로 역량 강화

2. 진로 연계 수업 방법
   - 교과 내용과 직업 연결
   - AI로 직업인 인터뷰
   - 실제 문제 해결

3. 교과별 진로 연계 예시
   - 국어: 작가, 기자, 콘텐츠 크리에이터
   - 수학: 데이터 과학자, AI 엔지니어
   - 사회: 사회문제 해결사
   - 과학: 연구원, 발명가

4. AI 활용 진로 체험
   - 가상 직업 체험
   - AI 멘토 활용
   - 진로 시뮬레이션

진로 연계 수업 지도안을 제공해주세요.`,
        },
        {
          id: 3,
          title: '학생 참여형 수업 설계',
          prompt: `중학생 참여를 높이는 AI 활용 수업을 설계하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 학생 참여의 중요성
   - 능동적 학습
   - 학습 효과
   - 수업 분위기

2. 참여형 수업 전략
   - 질문과 토론
   - 활동 중심
   - 선택과 자율
   - 협력 학습

3. AI 활용 참여 활동
   - AI 퀴즈 대결
   - AI 탐구 경쟁
   - AI 창작 챌린지
   - AI 토론 배틀

4. 참여 유도 팁
   - 흥미로운 도입
   - 적절한 난이도
   - 즉각적 피드백

참여형 수업 활동 아이디어 10가지를 제공해주세요.`,
        },
      ],
    },
    5: {
      title: '교육 콘텐츠 포트폴리오',
      subtitle: '수업 기록, 진로 상담, 학생 성장 기록을 정리합니다.',
      prompts: [
        {
          id: 1,
          title: '수업 및 평가 기록 정리',
          prompt: `중학교 수업 및 평가 기록을 체계적으로 정리하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 기록의 중요성
   - 생활기록부 작성
   - 수업 개선
   - 학생 성장 파악

2. 기록할 내용
   - 수업 활동 기록
   - 학생 참여 관찰
   - 평가 결과
   - 특이 사항

3. AI 활용 기록 방법
   - AI로 관찰 기록 작성
   - AI로 평가 결과 분석
   - AI로 누가 기록

4. 생활기록부 작성 지원
   - 교과 세특 작성
   - 행동 특성 기록
   - 진로 활동 기록

교과 세특 작성을 위한 AI 프롬프트를 제공해주세요.`,
        },
        {
          id: 2,
          title: '진로 상담 기록 관리',
          prompt: `중학생 진로 상담 기록을 관리하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 진로 상담의 중요성
   - 개별 지도
   - 정보 제공
   - 의사결정 지원

2. 상담 기록 내용
   - 학생 기본 정보
   - 흥미/적성 검사 결과
   - 진로 희망
   - 상담 내용
   - 후속 조치

3. AI 활용 상담 지원
   - AI 상담 준비
   - 진로 정보 제공
   - 상담 기록 정리

4. 기록 활용
   - 담임 교사 공유
   - 학부모 상담
   - 고등학교 연계

진로 상담 기록지 양식과 AI 프롬프트를 제공해주세요.`,
        },
        {
          id: 3,
          title: '교사 성장 포트폴리오',
          prompt: `AI 활용 교육에 대한 교사 성장 포트폴리오를 만드는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 교사 포트폴리오의 가치
   - 전문성 증명
   - 성찰과 성장
   - 경력 관리

2. 포함할 내용
   - AI 연수 이력
   - AI 수업 사례
   - 학생 변화 기록
   - 자기 성찰

3. 포트폴리오 구성
   - 자기 소개
   - 교육 철학
   - 대표 수업
   - 성과와 도전
   - 향후 계획

4. AI 활용 작성
   - AI로 성찰 글쓰기
   - AI로 수업 분석
   - 디지털 포트폴리오

교사 성장 포트폴리오 작성 가이드를 제공해주세요.`,
        },
      ],
    },
  },

  // ============================================
  // 고등교사 코스
  // ============================================
  'high': {
    1: {
      title: '고등 교육학 기초',
      subtitle: '고등학생 발달 특성과 진로 성숙도를 이해합니다.',
      prompts: [
        {
          id: 1,
          title: '고등학생 발달 특성 이해',
          prompt: `고등학생(15-18세)의 발달 특성에 대해 알려주세요.

다음 내용을 포함해주세요:
1. 인지 발달
   - 형식적 조작 사고 완성
   - 비판적/분석적 사고
   - 메타인지 능력

2. 사회정서 발달
   - 정체성 확립
   - 진로 정체성
   - 자아 개념 성숙

3. 학습 특성
   - 자기주도 학습
   - 목표 지향 학습
   - 심층 학습

4. AI 교육 시 고려할 점
   - 자율성과 책임
   - 진로 연계
   - 비판적 AI 활용

고등교사가 수업 및 진로 지도에 활용할 수 있게 작성해주세요.`,
        },
        {
          id: 2,
          title: '진로 성숙도와 진로 지도',
          prompt: `고등학생의 진로 성숙도와 진로 지도 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 진로 성숙도 이해
   - 진로 결정 수준
   - 진로 준비 행동
   - 진로 확신도

2. 진로 지도 전략
   - 자기 이해 심화
   - 전공/직업 탐색
   - 진로 의사결정
   - 진로 계획 수립

3. AI 활용 진로 지도
   - AI 진로 상담
   - AI 직업/전공 정보
   - AI 입시 정보
   - AI 자기소개서 지원

4. 진로 유형별 지도
   - 진로 미결정
   - 다중 관심
   - 조기 결정
   - 갈등 상황

진로 상담 사례와 AI 활용 팁을 제공해주세요.`,
        },
        {
          id: 3,
          title: '고등학교 학급 경영',
          prompt: `고등학교 학급 경영과 학생 지도 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 고등학교 학급 경영 특성
   - 학업 중심 분위기
   - 진로/입시 지원
   - 자율과 책임

2. 학급 경영 전략
   - 학습 환경 조성
   - 개별 상담 강화
   - 자치 활동 지원
   - 학부모 소통

3. AI 활용 학급 경영
   - 학생 관찰 기록
   - 상담 관리
   - 학부모 안내

4. 어려운 상황 대처
   - 학업 스트레스
   - 대인 관계 갈등
   - 진로 고민
   - 정서적 어려움

구체적인 상황별 대처 방법을 포함해주세요.`,
        },
      ],
    },
    2: {
      title: '효과적인 고등 교수법',
      subtitle: '심화 학습, 논술 지도, 자기주도 학습을 배웁니다.',
      prompts: [
        {
          id: 1,
          title: '심화 학습 지도',
          prompt: `고등학생을 위한 AI 활용 심화 학습 지도 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 심화 학습의 필요성
   - 깊이 있는 이해
   - 융합적 사고
   - 대입 연계

2. AI 활용 심화 학습
   - AI로 개념 심화
   - AI와 토론/질문
   - AI 연구 보조
   - AI 문제 해결

3. 교과별 심화 학습 예시
   - 국어: 문학 심층 분석
   - 수학: 심화 문제 탐구
   - 사회/역사: 연구 보고서
   - 과학: 탐구 프로젝트

4. 개별화 심화 지도
   - 수준별 접근
   - 관심 분야 연계
   - 멘토링

심화 학습 프로그램 계획서를 제공해주세요.`,
        },
        {
          id: 2,
          title: 'AI 활용 논술/글쓰기 지도',
          prompt: `AI를 활용한 고등학생 논술/글쓰기 지도 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 논술/글쓰기의 중요성
   - 사고력 표현
   - 대입 연계
   - 학업 역량

2. AI 활용 논술 지도
   - AI로 논제 분석
   - AI와 아이디어 브레인스토밍
   - AI 피드백 활용
   - AI 첨삭 보조

3. 논술 지도 단계
   - 읽기와 분석
   - 개요 작성
   - 초고 작성
   - 수정과 완성

4. 유형별 글쓰기 지도
   - 논술형 글쓰기
   - 자기소개서
   - 학업계획서
   - 보고서

AI를 활용한 논술 첨삭 프롬프트를 제공해주세요.`,
        },
        {
          id: 3,
          title: '자기주도 학습 코칭',
          prompt: `고등학생의 자기주도 학습 능력을 키우는 코칭 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 자기주도 학습의 구성요소
   - 학습 동기
   - 학습 전략
   - 시간 관리
   - 자기 점검

2. AI 활용 자기주도 학습
   - AI 학습 플래너
   - AI 질문/해설
   - AI 학습 분석
   - AI 멘토링

3. 코칭 전략
   - 목표 설정 지원
   - 학습 전략 지도
   - 메타인지 촉진
   - 피드백 제공

4. 자기주도 학습 환경
   - 학습 공간
   - 자원 활용
   - 동기 유지

자기주도 학습 코칭 체크리스트를 제공해주세요.`,
        },
      ],
    },
    3: {
      title: 'AI 교육 자료 제작',
      subtitle: '교과 심화 자료, 진학 자료, 생기부 지도 자료를 제작합니다.',
      prompts: [
        {
          id: 1,
          title: '교과 심화 자료 제작',
          prompt: `고등학교 교과 심화 자료를 AI로 제작하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 심화 자료의 유형
   - 개념 심화 자료
   - 연계 학습 자료
   - 탐구 활동 자료
   - 수능/내신 대비

2. AI 활용 자료 제작
   - 심화 개념 설명
   - 문제 출제
   - 해설 작성
   - 자료 정리

3. 교과별 심화 자료 예시
   - 국어: 문학 작품 심층 분석
   - 수학: 심화 문제 및 풀이
   - 영어: 원문 독해 자료
   - 사회/과학: 탐구 보고서

4. 자료 품질 관리
   - 정확성 검토
   - 난이도 조절
   - 학생 피드백

교과별 심화 자료 제작 프롬프트를 제공해주세요.`,
        },
        {
          id: 2,
          title: '진학 자료 제작',
          prompt: `대입 진학 지도를 위한 AI 활용 자료를 제작하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 진학 자료의 유형
   - 대학/전공 정보
   - 입시 전형 안내
   - 자기소개서 가이드
   - 면접 준비 자료

2. AI 활용 진학 자료 제작
   - 대학/전공 정보 정리
   - 입시 요강 분석
   - 자소서 예시 분석
   - 면접 예상 질문

3. 진학 상담 지원 자료
   - 성적대별 지원 전략
   - 전형별 준비 가이드
   - 학과 탐색 자료

4. 자료 업데이트
   - 최신 정보 반영
   - 변경 사항 추적

대입 진학 상담용 AI 프롬프트를 제공해주세요.`,
        },
        {
          id: 3,
          title: '생기부 작성 지도 자료',
          prompt: `학교생활기록부 작성을 지도하기 위한 자료를 만드는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 생기부의 중요성
   - 대입에서의 역할
   - 기록의 가치
   - 학생 성장 증빙

2. 생기부 영역별 안내
   - 교과 세부능력특기사항
   - 창의적체험활동
   - 행동특성 및 종합의견
   - 자율/동아리/봉사/진로

3. AI 활용 생기부 지도
   - 학생 활동 기록 지원
   - 기록 예시 분석
   - 표현 다듬기

4. 생기부 관리 지도
   - 활동 계획
   - 기록 습관
   - 포트폴리오 연계

생기부 기록 예시와 AI 프롬프트를 제공해주세요.`,
        },
      ],
    },
    4: {
      title: '수업 설계 및 모의 수업',
      subtitle: '진로 수업, 프로젝트 수업, 세특 지도 수업을 설계합니다.',
      prompts: [
        {
          id: 1,
          title: '진로 연계 교과 수업 설계',
          prompt: `교과와 진로를 연계한 고등학교 수업을 설계하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 교과-진로 연계의 가치
   - 학습 동기
   - 진로 역량
   - 세특 기록

2. 진로 연계 수업 설계
   - 교과 내용과 진로 연결
   - AI 활용 직업 탐구
   - 전공 연계 활동
   - 실생활 문제 해결

3. 교과별 진로 연계 예시
   - 국어: 글쓰기 관련 직업
   - 수학: 데이터/AI 관련 전공
   - 사회: 사회문제 해결 직업
   - 과학: 연구/개발 분야

4. 세특 연계
   - 활동 기록 방법
   - 학생 참여 유도
   - 개별 특성 반영

진로 연계 수업 지도안 예시를 제공해주세요.`,
        },
        {
          id: 2,
          title: '심화 프로젝트 수업 설계',
          prompt: `고등학생을 위한 AI 활용 심화 프로젝트 수업을 설계하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 심화 프로젝트의 가치
   - 깊이 있는 탐구
   - 자기주도 학습
   - 대입 연계

2. 프로젝트 설계 단계
   - 주제 선정 (AI 지원)
   - 연구 계획 수립
   - 자료 조사 (AI 활용)
   - 분석 및 정리
   - 결과 발표

3. AI 활용 프로젝트 예시
   - 인문: 사회 문제 분석
   - 자연: 과학 탐구 프로젝트
   - 예체능: 창작 프로젝트

4. 평가 및 기록
   - 과정 평가
   - 포트폴리오
   - 세특 기록

심화 프로젝트 계획서 양식을 제공해주세요.`,
        },
        {
          id: 3,
          title: '세특 기록을 위한 수업 설계',
          prompt: `세부능력특기사항 기록을 고려한 수업을 설계하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 세특 기록의 원칙
   - 구체적인 활동
   - 학생 개별 특성
   - 성장 과정

2. 세특 연계 수업 설계
   - 다양한 활동 기회
   - 개별 발표/토론
   - 심화 탐구 활동
   - 협력 프로젝트

3. AI 활용 세특 수업
   - AI 탐구 활동
   - AI 토론/발표
   - AI 창작 활동

4. 기록 전략
   - 관찰 기록 방법
   - 학생 참여 유도
   - 차별화된 기록

세특 기록 예시와 수업 활동 아이디어를 제공해주세요.`,
        },
      ],
    },
    5: {
      title: '교육 콘텐츠 포트폴리오',
      subtitle: '수업 기록, 진학 상담, 추천서 작성을 정리합니다.',
      prompts: [
        {
          id: 1,
          title: '수업 및 평가 기록 정리',
          prompt: `고등학교 수업 및 평가 기록을 체계적으로 정리하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 기록의 중요성
   - 세특 작성 기반
   - 진학 상담 자료
   - 수업 개선

2. 기록할 내용
   - 수업 활동 기록
   - 학생별 참여 기록
   - 평가 결과
   - 특별 활동

3. AI 활용 기록 방법
   - 관찰 기록 정리
   - 누가 기록 작성
   - 데이터 분석

4. 세특/생기부 연계
   - 기록 → 세특 변환
   - 표현 다듬기
   - 개별화

수업 기록 템플릿과 AI 프롬프트를 제공해주세요.`,
        },
        {
          id: 2,
          title: '진학 상담 기록 관리',
          prompt: `고등학생 진학 상담 기록을 관리하는 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 진학 상담의 중요성
   - 개별 맞춤 지도
   - 의사결정 지원
   - 정보 제공

2. 상담 기록 내용
   - 학생 프로필
   - 성적 분석
   - 진로 희망
   - 지원 전략
   - 후속 조치

3. AI 활용 상담 지원
   - 성적 분석
   - 지원 가능 대학 탐색
   - 전형 분석
   - 상담 기록 정리

4. 학년별 상담 포인트
   - 1학년: 진로 탐색
   - 2학년: 진로 구체화
   - 3학년: 지원 전략

진학 상담 기록지와 AI 프롬프트를 제공해주세요.`,
        },
        {
          id: 3,
          title: '추천서 작성 지원',
          prompt: `학생 추천서 작성을 위한 자료 정리와 작성 방법을 알려주세요.

다음 내용을 포함해주세요:
1. 추천서의 중요성
   - 대입에서의 역할
   - 교사의 책임
   - 학생 이해

2. 추천서 작성 준비
   - 학생 정보 수집
   - 특성 파악
   - 강점 정리
   - 사례 수집

3. AI 활용 추천서 작성
   - 학생 특성 정리
   - 표현 다듬기
   - 예시 참고

4. 추천서 작성 팁
   - 구체적 사례
   - 진정성
   - 차별화 포인트

추천서 작성 가이드와 AI 프롬프트를 제공해주세요.`,
        },
      ],
    },
  },
};

// 메인 컴포넌트
export default function TeacherLessonPage() {
  const router = useRouter();
  const params = useParams();
  const level = params.level as string;
  const day = parseInt(params.day as string);

  const [userName, setUserName] = useState('선생님');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);
  const [selectedAI, setSelectedAI] = useState<string>('gemini');
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(null);

  const selectedAIService = aiServices.find(s => s.id === selectedAI);

  const currentLevel = levelInfo[level];
  const currentLesson = lessonPrompts[level]?.[day];

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
    // 현재 열린 프롬프트 찾기
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
      // 열린 프롬프트가 없으면 첫 번째 프롬프트 복사
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

  if (!currentLevel || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 강좌입니다</h1>
          <Link href="/course/teacher" className="text-blue-600 hover:underline">
            교사/교육자 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const totalDays = Object.keys(lessonPrompts[level] || {}).length;

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
          <Link href="/course/teacher" className="text-gray-500 hover:text-gray-700">교사/교육자 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/course/teacher/${level}`} className="text-gray-500 hover:text-gray-700">{currentLevel.title}</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">강좌 {day}</span>
        </div>

        {/* 레슨 헤더 */}
        <div className={`bg-gradient-to-r ${currentLevel.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">{currentLevel.icon}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">강좌 {day}: {currentLesson.title}</h1>
          <p className="text-white/80">{currentLesson.subtitle}</p>
        </div>

        {/* 사용법 동영상 (첫 레슨에서만 표시) */}
        {level === 'elementary' && day === 1 && (
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
                title="교사 코스 사용법 안내"
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
            <li>AI의 답변을 읽고 교육 현장에 적용해보세요</li>
          </ol>
        </div>

        {/* 프롬프트 카드들 */}
        <div className="space-y-4">
          {currentLesson.prompts.map((item, idx) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* 프롬프트 헤더 */}
              <button
                onClick={() => setExpandedPrompt(expandedPrompt === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold">
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
          {day > 1 ? (
            <Link href={`/course/teacher/${level}/lesson/${day - 1}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow transition">
              <ChevronLeft className="w-5 h-5" />
              <span>강좌 {day - 1}</span>
            </Link>
          ) : <div />}

          {day < totalDays ? (
            <Link href={`/course/teacher/${level}/lesson/${day + 1}`} className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition">
              <span>강좌 {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/teacher/${level}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
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
