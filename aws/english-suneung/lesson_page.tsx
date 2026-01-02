'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Volume2, Play, Pause, Trash2, Youtube, ExternalLink, MessageCircle, Headphones, BookOpen, FileText, Languages } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; bgColor: string; textColor: string; icon: any } } = {
  'listening': { name: '듣기', color: 'from-blue-500 to-cyan-600', bgColor: 'from-slate-50 to-blue-50', textColor: 'blue', icon: Headphones },
  'reading-basic': { name: '독해 기초', color: 'from-green-500 to-emerald-600', bgColor: 'from-slate-50 to-green-50', textColor: 'green', icon: BookOpen },
  'reading-advanced': { name: '독해 심화', color: 'from-purple-500 to-violet-600', bgColor: 'from-slate-50 to-purple-50', textColor: 'purple', icon: FileText },
  'vocabulary': { name: '어휘/문법', color: 'from-orange-500 to-amber-600', bgColor: 'from-slate-50 to-orange-50', textColor: 'orange', icon: Languages },
  'ebs': { name: 'EBS 연계', color: 'from-pink-500 to-rose-600', bgColor: 'from-slate-50 to-pink-50', textColor: 'pink', icon: Sparkles },
  'mock-test': { name: '실전 모의고사', color: 'from-red-500 to-rose-600', bgColor: 'from-slate-50 to-red-50', textColor: 'red', icon: Target },
};

// 듣기 레슨 데이터
const listeningLessons: { [day: number]: { title: string; desc: string; prompt: string; conversationPrompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '목적 파악',
    desc: '담화의 목적 찾기 (1번 문항)',
    prompt: `수능 영어 듣기에서 "목적 파악" 유형에 대해 알려주세요.

1. 목적 파악 문제란?
   - 수능 듣기 1번 문항으로 출제
   - 담화를 듣고 말하는 사람의 목적을 파악하는 유형

2. 출제 패턴 분석
   - 안내 방송, 공지사항, 광고 등의 형태
   - 주요 키워드: I'd like to inform you, The purpose is, We're pleased to announce

3. 풀이 전략
   - 첫 부분에서 목적 힌트 포착
   - 강조하는 핵심 내용 파악
   - should, must, please 등 요청/권유 표현 주목

4. 빈출 상황 유형
   - 학교 행사 안내
   - 도서관/시설 이용 안내
   - 대회/공모전 참가 안내
   - 안전 수칙/규정 안내

5. 연습 문제를 만들어 주세요 (5개)
   - 실제 수능 형식으로 스크립트와 선택지 포함

6. 다음 레슨 예고
   (다음은 "의견/요지 파악"입니다)`,
    conversationPrompt: `수능 영어 듣기 목적 파악 유형을 연습할 수 있는 담화문을 만들어주세요.

1. 3개의 담화문을 만들어주세요 (각 100-120단어)
2. 학교, 도서관, 지역사회 관련 안내 상황으로 설정
3. 목적을 파악할 수 있는 키워드가 포함되어야 함
4. 영어로만 작성해주세요

담화 유형:
- 학교 행사 안내 방송
- 도서관 프로그램 공지
- 지역 봉사활동 안내

각 담화 후에 5개의 선택지를 제시해주세요.`,
    funFact: '💡 듣기 팁: 첫 1-2문장에서 목적의 힌트가 나와요! "I\'d like to inform you about..."를 놓치지 마세요.',
    challenge: '🎯 도전 과제: EBS 듣기 파일에서 목적 파악 문제 10개를 풀어보세요!',
    youtubeKeyword: '수능 영어 듣기 목적 파악 1번 문항 풀이'
  },
  2: {
    title: '의견 파악',
    desc: '화자의 의견 찾기 (2번 문항)',
    prompt: `수능 영어 듣기에서 "의견 파악" 유형에 대해 알려주세요.

1. 의견 파악 문제란?
   - 수능 듣기 2번 문항으로 출제
   - 대화에서 화자의 의견이나 주장을 파악

2. 출제 패턴 분석
   - 두 사람의 대화 형식
   - 한 사람이 의견을 말하고, 다른 사람이 반응
   - 주요 표현: I think, I believe, In my opinion, It seems to me

3. 풀이 전략
   - 의견을 묻는 질문 형태 파악 ("What does the man think about...")
   - 의견 표현 동사 주목 (think, believe, feel, suggest)
   - 결론 부분의 핵심 의견 청취

4. 빈출 주제
   - 교육/학습 방법
   - 환경/건강 문제
   - 기술/미디어 활용
   - 사회 현상에 대한 견해

5. 연습 문제를 만들어 주세요 (5개)

6. 다음 레슨 예고
   (다음은 "요지 파악"입니다)`,
    conversationPrompt: `수능 영어 듣기 의견 파악 유형을 연습할 수 있는 대화문을 만들어주세요.

1. 3개의 대화문을 만들어주세요 (각 120-150단어)
2. 학교생활, 기술, 환경 관련 주제로 설정
3. 화자의 의견이 명확히 드러나야 함
4. 영어로만 작성해주세요

대화 주제:
- 온라인 학습 vs 오프라인 학습
- 스마트폰 사용 시간
- 환경 보호 실천 방법

각 대화 후에 의견 파악 문제와 5개의 선택지를 제시해주세요.`,
    funFact: '💡 듣기 팁: "I think..."나 "In my opinion..." 다음에 나오는 내용이 핵심 의견이에요!',
    challenge: '🎯 도전 과제: 의견 표현 10가지를 외우고 활용해보세요!',
    youtubeKeyword: '수능 영어 듣기 의견 파악 2번 문항'
  },
  3: {
    title: '요지 파악',
    desc: '담화의 요지 찾기 (3번 문항)',
    prompt: `수능 영어 듣기에서 "요지 파악" 유형에 대해 알려주세요.

1. 요지 파악 문제란?
   - 2024학년도부터 새로 추가된 유형 (기존 관계 추론 대체)
   - 한 사람의 담화에서 핵심 주장/요지 파악

2. 출제 패턴 분석
   - 독백 형식의 담화
   - 하나의 핵심 메시지 전달
   - 주요 표현: The point is, What I want to say is, The key is

3. 풀이 전략
   - 담화의 주제문 찾기
   - 반복되는 키워드 파악
   - 결론 부분의 핵심 요지 청취

4. 빈출 주제
   - 삶의 조언/교훈
   - 학습/자기계발
   - 인간관계/소통
   - 성공/실패에 대한 태도

5. 연습 문제를 만들어 주세요 (5개)

6. 다음 레슨 예고
   (다음은 "관계 추론"입니다)`,
    conversationPrompt: `수능 영어 듣기 요지 파악 유형을 연습할 수 있는 담화문을 만들어주세요.

1. 3개의 담화문을 만들어주세요 (각 100-130단어)
2. 삶의 교훈, 자기계발, 인간관계 주제로 설정
3. 명확한 요지가 담겨있어야 함
4. 영어로만 작성해주세요

담화 주제:
- 실패에서 배우기
- 효과적인 시간 관리
- 긍정적 마인드셋

각 담화 후에 5개의 선택지를 제시해주세요.`,
    funFact: '💡 듣기 팁: 요지는 보통 마지막 1-2문장에 정리되어 나와요!',
    challenge: '🎯 도전 과제: TED Talk 짧은 영상에서 요지를 찾아보세요!',
    youtubeKeyword: '수능 영어 듣기 요지 파악 3번 문항 신유형'
  },
  4: {
    title: '관계 추론',
    desc: '두 사람의 관계 파악 (4번 문항)',
    prompt: `수능 영어 듣기에서 "관계 추론" 유형에 대해 알려주세요.

1. 관계 추론 문제란?
   - 수능 듣기 4번 문항으로 출제
   - 대화하는 두 사람의 관계를 추론

2. 출제 패턴 분석
   - 특정 상황에서의 대화
   - 직업/역할을 암시하는 표현 사용
   - 선택지: doctor-patient, teacher-student, etc.

3. 풀이 전략
   - 호칭과 존칭 주목 (Sir, Ma'am, Mr., Dr.)
   - 상황/장소 힌트 파악
   - 역할 관련 어휘 청취

4. 빈출 관계 유형
   - 의사-환자
   - 선생님-학생
   - 점원-손님
   - 상사-직원
   - 인터뷰어-피인터뷰자

5. 연습 문제를 만들어 주세요 (5개)

6. 다음 레슨 예고
   (다음은 "장소 추론"입니다)`,
    conversationPrompt: `수능 영어 듣기 관계 추론 유형을 연습할 수 있는 대화문을 만들어주세요.

1. 4개의 대화문을 만들어주세요 (각 100-120단어)
2. 다양한 관계 설정 (직업적/사회적 관계)
3. 관계를 추론할 수 있는 힌트가 포함되어야 함
4. 영어로만 작성해주세요

관계 설정:
- 의사-환자
- 여행사 직원-고객
- 호텔 직원-투숙객
- 면접관-지원자

각 대화 후에 5개의 선택지를 제시해주세요.`,
    funFact: '💡 듣기 팁: 호칭(Mr., Dr., Sir)과 장소 관련 어휘가 관계를 알려줘요!',
    challenge: '🎯 도전 과제: 영화/드라마에서 등장인물 관계를 영어로 설명해보세요!',
    youtubeKeyword: '수능 영어 듣기 관계 추론 4번 문항'
  },
  5: {
    title: '장소 추론',
    desc: '대화 장소 파악 (5번 문항)',
    prompt: `수능 영어 듣기에서 "장소 추론" 유형에 대해 알려주세요.

1. 장소 추론 문제란?
   - 수능 듣기 5번 문항으로 출제
   - 대화가 이루어지는 장소를 추론

2. 출제 패턴 분석
   - 특정 장소에서의 대화
   - 장소 관련 어휘와 표현 사용
   - 선택지: hospital, restaurant, library, etc.

3. 풀이 전략
   - 장소 특유의 어휘 파악
   - 행동/활동 관련 표현 주목
   - 배경 소리 힌트 활용

4. 빈출 장소
   - 병원/약국
   - 식당/카페
   - 도서관/서점
   - 공항/역
   - 호텔/숙소

5. 연습 문제를 만들어 주세요 (5개)

6. 다음 레슨 예고
   (다음은 "그림 찾기"입니다)`,
    conversationPrompt: `수능 영어 듣기 장소 추론 유형을 연습할 수 있는 대화문을 만들어주세요.

1. 4개의 대화문을 만들어주세요 (각 100-120단어)
2. 다양한 장소 설정
3. 장소를 추론할 수 있는 힌트가 포함되어야 함
4. 영어로만 작성해주세요

장소 설정:
- 공항 체크인 카운터
- 박물관 안내 데스크
- 헬스장 리셉션
- 미용실

각 대화 후에 5개의 선택지를 제시해주세요.`,
    funFact: '💡 듣기 팁: check-in(호텔/공항), prescription(약국), menu(식당) 같은 장소 특유 어휘를 외우세요!',
    challenge: '🎯 도전 과제: 10개 장소의 핵심 어휘 목록을 만들어보세요!',
    youtubeKeyword: '수능 영어 듣기 장소 추론 5번 문항'
  },
};

// 독해 기초 레슨 데이터
const readingBasicLessons: { [day: number]: { title: string; desc: string; prompt: string; conversationPrompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '주제 파악',
    desc: '글의 주제 찾기',
    prompt: `수능 영어 독해에서 "주제 파악" 유형에 대해 알려주세요.

1. 주제 파악 문제란?
   - 지문을 읽고 글의 중심 주제를 파악
   - "What is the main topic of the passage?"

2. 출제 패턴 분석
   - 첫 문장이나 마지막 문장에 주제문
   - 반복되는 키워드가 주제 힌트
   - 선택지는 일반적 vs 구체적 내용

3. 풀이 전략
   - 첫 문장과 마지막 문장 먼저 읽기
   - 반복 키워드 체크
   - 너무 넓거나 좁은 선택지 제외

4. 빈출 주제 영역
   - 과학/기술
   - 심리/행동
   - 사회/문화
   - 역사/예술

5. 연습 문제를 만들어 주세요 (5개)
   - 실제 수능 형식 지문과 선택지 포함

6. 다음 레슨 예고
   (다음은 "요지 파악"입니다)`,
    conversationPrompt: `수능 영어 독해 주제 파악 유형을 연습할 수 있는 지문을 만들어주세요.

1. 3개의 지문을 만들어주세요 (각 150-180단어)
2. 과학, 심리, 사회 관련 주제로 설정
3. 주제문이 명확히 드러나야 함
4. 영어로만 작성해주세요

각 지문 후에 주제 파악 문제와 5개의 선택지를 제시해주세요.`,
    funFact: '💡 독해 팁: 주제문은 보통 첫 문장 또는 마지막 문장에 있어요!',
    challenge: '🎯 도전 과제: 영자 신문 기사 5개의 주제를 찾아보세요!',
    youtubeKeyword: '수능 영어 독해 주제 파악 전략'
  },
  2: {
    title: '요지 파악',
    desc: '글의 요지 찾기',
    prompt: `수능 영어 독해에서 "요지 파악" 유형에 대해 알려주세요.

1. 요지 파악 문제란?
   - 글의 핵심 메시지나 주장을 파악
   - "What is the main point of the passage?"

2. 주제 vs 요지 차이
   - 주제: 글이 다루는 대상/영역
   - 요지: 글쓴이가 전달하려는 핵심 메시지

3. 풀이 전략
   - 글쓴이의 의도/주장 파악
   - should, must, need to 등 주장 표현 주목
   - 결론 부분의 핵심 문장 찾기

4. 빈출 요지 패턴
   - ~해야 한다 (당위)
   - ~가 중요하다 (가치)
   - ~를 인식해야 한다 (인식)
   - ~에 주의해야 한다 (경고)

5. 연습 문제를 만들어 주세요 (5개)

6. 다음 레슨 예고
   (다음은 "제목 추론"입니다)`,
    conversationPrompt: `수능 영어 독해 요지 파악 유형을 연습할 수 있는 지문을 만들어주세요.

1. 3개의 지문을 만들어주세요 (각 150-180단어)
2. 교육, 환경, 기술 관련 주제로 설정
3. 글쓴이의 주장/요지가 명확히 드러나야 함
4. 영어로만 작성해주세요

각 지문 후에 요지 파악 문제와 5개의 선택지를 제시해주세요.`,
    funFact: '💡 독해 팁: should, must, important 같은 표현 뒤에 요지가 나와요!',
    challenge: '🎯 도전 과제: 사설 5개에서 필자의 요지를 정리해보세요!',
    youtubeKeyword: '수능 영어 독해 요지 파악 전략'
  },
};

// 독해 심화 레슨 데이터
const readingAdvancedLessons: { [day: number]: { title: string; desc: string; prompt: string; conversationPrompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '빈칸 추론 (어구)',
    desc: '빈칸에 들어갈 어구 추론',
    prompt: `수능 영어 독해에서 "빈칸 추론 (어구)" 유형에 대해 알려주세요.

1. 빈칸 추론 문제란?
   - 수능에서 가장 어려운 유형 (오답률 70-85%)
   - 빈칸에 들어갈 적절한 어구/표현 선택
   - 31-34번 문항으로 출제

2. 출제 패턴 분석
   - 빈칸이 주제문/핵심문에 위치
   - 빈칸 앞뒤 문맥이 힌트
   - 선택지가 추상적 표현

3. 풀이 전략
   - 글의 주제 먼저 파악
   - 빈칸 앞뒤 1-2문장 정밀 분석
   - 연결어(however, therefore)로 논리 파악
   - 선택지 대입 후 검증

4. 빈출 패턴
   - 대조: A가 아니라 B
   - 인과: A이므로 B
   - 예시: A의 예로 B
   - 강조: 특히 A가 중요

5. 연습 문제를 만들어 주세요 (5개)

6. 다음 레슨 예고
   (다음은 "빈칸 추론 (문장)"입니다)`,
    conversationPrompt: `수능 영어 빈칸 추론 (어구) 유형을 연습할 수 있는 지문을 만들어주세요.

1. 3개의 지문을 만들어주세요 (각 180-220단어)
2. 심리, 과학, 사회 관련 주제로 설정
3. 빈칸이 핵심 위치에 있어야 함
4. 영어로만 작성해주세요

각 지문 후에 5개의 선택지를 제시해주세요.
선택지는 추상적 어구로 구성해주세요.`,
    funFact: '💡 빈칸 팁: however, therefore, in contrast 같은 연결어가 빈칸의 방향을 알려줘요!',
    challenge: '🎯 도전 과제: 빈칸 추론 문제 20개를 풀고 오답 분석해보세요!',
    youtubeKeyword: '수능 영어 빈칸 추론 고난도 풀이 전략'
  },
};

// 어휘/문법 레슨 데이터
const vocabularyLessons: { [day: number]: { title: string; desc: string; prompt: string; conversationPrompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '필수 어휘 Day 1',
    desc: '수능 빈출 어휘 120개 (1/5)',
    prompt: `수능 영어 필수 어휘를 학습합니다.

1. 오늘의 어휘 목표
   - 수능 빈출 어휘 120개 암기
   - 동의어/반의어 함께 학습
   - 예문으로 문맥 이해

2. 어휘 목록 (주제별 분류)
   다음 주제의 핵심 어휘를 알려주세요:

   A. 인지/사고 관련 (20개)
   B. 감정/심리 관련 (20개)
   C. 사회/제도 관련 (20개)
   D. 과학/기술 관련 (20개)
   E. 환경/자연 관련 (20개)
   F. 경제/비즈니스 관련 (20개)

3. 각 어휘에 대해 제공해주세요:
   - 발음 기호
   - 한글 뜻
   - 동의어 1개
   - 예문 1개

4. 어휘 암기 전략
   - 어근/접두사/접미사 분석
   - 연상 기억법
   - 반복 테스트

5. 연습 문제를 만들어 주세요 (20개)
   - 문맥 속 어휘 선택 문제

6. 다음 레슨 예고
   (다음은 "필수 어휘 Day 2"입니다)`,
    conversationPrompt: `수능 영어 어휘를 문맥 속에서 연습할 수 있는 지문을 만들어주세요.

1. 5개의 짧은 지문을 만들어주세요 (각 80-100단어)
2. 오늘 학습한 어휘가 자연스럽게 포함되어야 함
3. 어휘의 문맥적 의미를 이해할 수 있어야 함
4. 영어로만 작성해주세요

각 지문 후에 어휘 문제 2개를 제시해주세요.`,
    funFact: '💡 어휘 팁: 어근 "dict"는 "말하다"를 의미해요. predict(예언), dictate(받아쓰게 하다), contradict(반박하다)!',
    challenge: '🎯 도전 과제: 오늘 배운 어휘로 짧은 에세이를 써보세요!',
    youtubeKeyword: '수능 영어 필수 어휘 빈출 단어 암기'
  },
};

// 기본 레슨 데이터 (모든 과목 공통)
const getDefaultLesson = (subject: string, day: number) => ({
  title: `Day ${day} 학습`,
  desc: `${subjectInfo[subject]?.name || subject} ${day}일차`,
  prompt: `${subjectInfo[subject]?.name || subject} ${day}일차 학습 내용을 자세히 알려주세요.

1. 오늘의 학습 목표
2. 핵심 개념 설명
3. 실전 적용 방법
4. 연습 문제 10개
5. 다음 단계 예고`,
  conversationPrompt: `${subjectInfo[subject]?.name || subject} ${day}일차 내용을 연습할 수 있는 대화문을 만들어주세요.`,
  funFact: '💡 학습 팁: 꾸준한 반복이 실력 향상의 핵심입니다!',
  challenge: '🎯 도전 과제: 오늘 배운 내용을 복습하고 요약해보세요!',
  youtubeKeyword: `수능 영어 ${subjectInfo[subject]?.name || subject}`
});

const getLessonData = (subject: string, day: number) => {
  switch (subject) {
    case 'listening':
      return listeningLessons[day] || getDefaultLesson(subject, day);
    case 'reading-basic':
      return readingBasicLessons[day] || getDefaultLesson(subject, day);
    case 'reading-advanced':
      return readingAdvancedLessons[day] || getDefaultLesson(subject, day);
    case 'vocabulary':
      return vocabularyLessons[day] || getDefaultLesson(subject, day);
    default:
      return getDefaultLesson(subject, day);
  }
};

export default function EnglishSuneungLessonPage() {
  const params = useParams();
  const subject = params.subject as string;
  const day = Number(params.day);
  const subjectData = subjectInfo[subject];
  const lesson = getLessonData(subject, day);

  const [copied, setCopied] = useState(false);
  const [copiedConv, setCopiedConv] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // TTS states
  const [ttsText, setTtsText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`english-suneung-${subject}-day${day}-completed`);
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

  const copyConversationPrompt = async () => {
    await navigator.clipboard.writeText(lesson.conversationPrompt);
    setCopiedConv(true);
    setTimeout(() => setCopiedConv(false), 2000);
  };

  const openAIConversation = async () => {
    await navigator.clipboard.writeText(lesson.conversationPrompt);
    setCopiedConv(true);
    setTimeout(() => setCopiedConv(false), 2000);
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
    localStorage.setItem(`english-suneung-${subject}-day${day}-completed`, 'true');

    // 전체 완료 목록 업데이트
    const savedList = localStorage.getItem(`english-suneung-${subject}-completed`);
    const completedList = savedList ? JSON.parse(savedList) : [];
    if (!completedList.includes(day)) {
      completedList.push(day);
      localStorage.setItem(`english-suneung-${subject}-completed`, JSON.stringify(completedList));
    }

    setTimeout(() => setShowConfetti(false), 3000);
  };

  // TTS functions
  const getSpeedRate = () => {
    switch (speed) {
      case 'slow': return 0.7;
      case 'normal': return 1.0;
      case 'fast': return 1.3;
    }
  };

  const playTTS = () => {
    if (!ttsText.trim()) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.lang = 'en-US';
    utterance.rate = getSpeedRate();
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance;
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const clearTTS = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setTtsText('');
  };

  const openYouTube = () => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.youtubeKeyword)}`;
    window.open(searchUrl, '_blank');
  };

  if (!subjectData) {
    return <div className="min-h-screen flex items-center justify-center">과목을 찾을 수 없습니다.</div>;
  }

  const maxDay = subjectInfo[subject]?.name ?
    (subject === 'reading-advanced' ? 35 : subject === 'vocabulary' ? 25 : 30) : 30;
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
              {['🎉', '⭐', '🏆', '✨', '📚'][Math.floor(Math.random() * 5)]}
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
            <Link href="/course/english-suneung" className="hover:text-blue-600">영어수능 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/english-suneung/${subject}`} className="hover:text-blue-600">{subjectData.name}</Link>
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
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-amber-800 mb-1">학습 팁</p>
              <p className="text-amber-700 text-sm">{lesson.funFact}</p>
            </div>
          </div>
        </div>

        {/* AI 프롬프트 섹션 */}
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

        {/* 회화 연습 프롬프트 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className={`w-5 h-5 text-${subjectData.textColor}-500`} />
              연습 프롬프트
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
            {lesson.conversationPrompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyConversationPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copiedConv ? 'bg-green-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}>
              {copiedConv ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 연습 프롬프트 복사</>}
            </button>
            <button onClick={openAIConversation} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI 열기
            </button>
          </div>
        </div>

        {/* TTS 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Volume2 className={`w-5 h-5 text-${subjectData.textColor}-500`} />
            영어 듣기 연습 (TTS)
          </h2>

          <textarea
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder="AI 응답에서 영어 문장을 복사해서 붙여넣으세요..."
            className="w-full h-32 p-4 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="flex items-center gap-3 mt-4">
            <div className="flex gap-2">
              {(['slow', 'normal', 'fast'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    speed === s ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s === 'slow' ? '느리게' : s === 'normal' ? '보통' : '빠르게'}
                </button>
              ))}
            </div>
            <button
              onClick={playTTS}
              disabled={!ttsText.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isPlaying ? 'bg-red-500 text-white' : 'bg-green-500 text-white hover:bg-green-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isPlaying ? <><Pause className="w-4 h-4" /> 중지</> : <><Play className="w-4 h-4" /> 재생</>}
            </button>
            <button
              onClick={clearTTS}
              className="p-2 text-gray-400 hover:text-red-500 transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 유튜브 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Youtube className="w-5 h-5 text-red-500" />
            유튜브 참고 영상
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            관련 강의 영상을 검색하여 심화 학습을 해보세요.
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

        {/* 도전 과제 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
          <p className="text-purple-800 font-medium">{lesson.challenge}</p>
        </div>

        {/* 완료 버튼 */}
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

        {/* 네비게이션 */}
        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link
              href={`/course/english-suneung/${subject}/lesson/${day - 1}`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              이전 레슨
            </Link>
          ) : <div />}
          {day < maxDay ? (
            <Link
              href={`/course/english-suneung/${subject}/lesson/${day + 1}`}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition"
            >
              다음 레슨
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href={`/course/english-suneung/${subject}`}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium"
            >
              코스 완료!
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
