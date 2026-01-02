** WARNING: connection is not using a post-quantum key exchange algorithm.
** This session may be vulnerable to "store now, decrypt later" attacks.
** The server may need to be upgraded. See https://openssh.com/pq.html
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star, Youtube, ExternalLink, BookOpen } from 'lucide-react';

// 과목 정보
const subjectInfo: { [key: string]: { name: string; color: string; colorLight: string } } = {
  'reading': { name: '독서 (비문학)', color: 'from-blue-500 to-indigo-600', colorLight: 'blue' },
  'literature': { name: '문학', color: 'from-purple-500 to-pink-600', colorLight: 'purple' },
  'speech-writing': { name: '화법과 작문', color: 'from-green-500 to-teal-600', colorLight: 'green' },
  'language-media': { name: '언어와 매체', color: 'from-orange-500 to-red-600', colorLight: 'orange' },
  'suneung-korean': { name: '수능 국어 실전', color: 'from-red-500 to-rose-600', colorLight: 'red' },
};

interface Keyword {
  term: string;
  definition: string;
  searchQuery: string;
}

interface LessonData {
  title: string;
  desc: string;
  prompt: string;
  funFact: string;
  challenge: string;
  youtubeKeyword: string;
  keywords: Keyword[] | string[];
}

// 독서(비문학) 레슨 데이터 - 45일
const readingLessons: { [day: number]: LessonData } = {
  1: {
    title: '독서론 - 읽기의 원리',
    desc: '독서의 본질과 읽기 과정의 이해',
    prompt: `수능 국어 독서 영역 "독서론"에 대해 알려주세요.

## 1. 읽기의 본질
- 읽기란 무엇인가?
- 읽기의 목적과 중요성
- 능동적 읽기 vs 수동적 읽기

## 2. 읽기의 과정
- 상향식 읽기 (bottom-up): 글자 → 단어 → 문장 → 의미
- 하향식 읽기 (top-down): 배경지식 → 예측 → 확인
- 상호작용 모형: 상향식 + 하향식 통합

## 3. 읽기의 요소
- 독자 요인: 배경지식, 읽기 목적, 읽기 능력
- 텍스트 요인: 글의 구조, 어휘 수준, 주제
- 상황 요인: 읽기 환경, 시간 제약

## 4. 수능 기출 유형 연습문제 5개
- 읽기 과정에 대한 이해
- 읽기 전략 적용
- 정답과 상세 해설 포함`,
    funFact: '수능에서 독서론은 1~3번에서 주로 출제되며, 읽기 이론 자체를 묻는 문제가 나옵니다.',
    challenge: '하향식 읽기와 상향식 읽기의 차이를 예시를 들어 설명해보세요!',
    youtubeKeyword: '수능 국어 독서론 읽기 원리',
    keywords: [
      { term: '상향식 읽기', definition: '글자 → 단어 → 문장 → 의미 순서로 이해하는 방식', searchQuery: '상향식 읽기 하향식 읽기 차이' },
      { term: '하향식 읽기', definition: '배경지식을 활용해 예측하고 확인하는 방식', searchQuery: '하향식 읽기 모형' },
      { term: '상호작용 모형', definition: '상향식과 하향식을 통합한 읽기 모형', searchQuery: '읽기 상호작용 모형' },
    ],
  },
  2: {
    title: '독서론 - 읽기 전략',
    desc: '효과적인 읽기를 위한 전략',
    prompt: `수능 국어 "읽기 전략"에 대해 알려주세요.

## 1. 읽기 전 전략
- 배경지식 활성화
- 글의 목적과 독자 파악
- 제목/소제목으로 내용 예측

## 2. 읽기 중 전략
- 중심 내용 파악
- 글의 구조 파악 (두괄식, 미괄식, 양괄식)
- 핵심어와 주제문 찾기
- 모르는 어휘 문맥으로 추론

## 3. 읽기 후 전략
- 요약하기
- 비판적 읽기
- 다른 글과 비교하기

## 4. 글의 구조 유형
- 나열 구조
- 비교/대조 구조
- 인과 구조
- 문제-해결 구조

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '글의 구조를 파악하면 중심 내용을 더 빠르게 찾을 수 있어요!',
    challenge: '오늘 읽은 기사나 글의 구조를 분석해보세요!',
    youtubeKeyword: '수능 국어 읽기 전략 글의 구조',
    keywords: [
      { term: '두괄식', definition: '핵심 내용이 문단/글의 처음에 제시되는 구조', searchQuery: '두괄식 미괄식 양괄식' },
      { term: '인과 구조', definition: '원인과 결과의 관계로 구성된 글의 구조', searchQuery: '글의 구조 유형' },
    ],
  },
  3: {
    title: '독서론 - 사실적 읽기',
    desc: '글에 드러난 정보의 파악',
    prompt: `수능 국어 "사실적 읽기"에 대해 알려주세요.

## 1. 사실적 읽기란?
- 글에 명시적으로 드러난 정보 파악
- 중심 내용과 세부 정보 구분
- 글의 구조와 전개 방식 이해

## 2. 사실적 읽기의 요소
- 중심 화제/주제 파악
- 핵심 정보와 부가 정보 구분
- 글쓴이의 의도 파악
- 글의 통일성과 응집성 확인

## 3. 정보 간 관계 파악
- 상위 개념-하위 개념
- 전체-부분
- 원인-결과
- 비교-대조

## 4. 수능 출제 유형
- "윗글의 내용과 일치하는 것은?"
- "윗글을 통해 알 수 있는 것은?"

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '사실적 읽기 문제는 지문에 답이 있습니다. 선지를 하나씩 지문과 대조해보세요!',
    challenge: '신문 기사를 읽고 중심 화제와 세부 정보를 구분해보세요!',
    youtubeKeyword: '수능 국어 사실적 읽기',
    keywords: [
      { term: '사실적 읽기', definition: '글에 명시적으로 드러난 정보를 파악하는 읽기', searchQuery: '사실적 읽기 추론적 읽기' },
      { term: '중심 화제', definition: '글 전체가 다루고 있는 핵심 주제', searchQuery: '중심 화제 파악 방법' },
    ],
  },
  4: {
    title: '독서론 - 추론적 읽기',
    desc: '숨겨진 의미의 추론',
    prompt: `수능 국어 "추론적 읽기"에 대해 알려주세요.

## 1. 추론적 읽기란?
- 글에 명시되지 않은 정보를 추론
- 배경지식과 문맥을 활용한 의미 파악
- 생략된 내용, 함축된 의미 이해

## 2. 추론의 유형
- 세부 정보 추론: 구체적 정보 도출
- 관계 추론: 정보 간 관계 파악
- 적용 추론: 새로운 상황에 적용
- 일반화 추론: 원리나 법칙 도출

## 3. 추론 문제 유형
- "윗글을 바탕으로 <보기>를 이해한 것으로 적절한 것은?"
- "윗글의 ㉠~㉤에 대한 설명으로 적절하지 않은 것은?"
- "A의 관점에서 B를 평가한 것으로 가장 적절한 것은?"

## 4. 추론 문제 풀이 전략
- 지문의 핵심 개념/원리 정확히 이해
- <보기>의 상황을 지문 개념에 대입
- 선지의 추론이 논리적으로 타당한지 검토

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '추론 문제는 수능 국어에서 가장 변별력 있는 문제입니다. 지문을 정확히 이해하는 것이 핵심!',
    challenge: '지문의 원리를 새로운 예시에 적용해보는 연습을 해보세요!',
    youtubeKeyword: '수능 국어 추론적 읽기 보기 문제',
    keywords: [
      { term: '추론적 읽기', definition: '명시되지 않은 정보를 논리적으로 이끌어내는 읽기', searchQuery: '추론적 읽기 방법' },
      { term: '적용 추론', definition: '글의 원리를 새로운 상황에 적용하는 추론', searchQuery: '수능 국어 적용 추론' },
    ],
  },
  5: {
    title: '독서론 - 비판적/창의적 읽기',
    desc: '글을 평가하고 재구성하기',
    prompt: `수능 국어 "비판적/창의적 읽기"에 대해 알려주세요.

## 1. 비판적 읽기
- 글의 신뢰성, 타당성 평가
- 논증의 적절성 검토
- 글쓴이의 관점과 전제 파악
- 숨겨진 가정 발견

## 2. 비판적 읽기의 기준
- 내용의 정확성
- 논거의 타당성
- 자료의 적절성
- 논리의 일관성

## 3. 창의적 읽기
- 글의 내용을 새롭게 해석
- 문제 해결에 활용
- 다른 분야와 연결
- 자신의 글쓰기에 적용

## 4. 수능 출제 유형
- "윗글에 대한 비판으로 가장 적절한 것은?"
- "윗글의 논증에 대한 평가로 적절한 것은?"

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '비판적 읽기 문제는 논증의 구조를 파악하는 것이 핵심입니다!',
    challenge: '주장하는 글을 읽고 논거의 타당성을 평가해보세요!',
    youtubeKeyword: '수능 국어 비판적 읽기 논증 평가',
    keywords: [
      { term: '비판적 읽기', definition: '글의 신뢰성과 타당성을 평가하는 읽기', searchQuery: '비판적 읽기 방법' },
      { term: '논증의 타당성', definition: '전제에서 결론이 논리적으로 도출되는지 여부', searchQuery: '논증 타당성 평가' },
    ],
  },
};

// 문학 레슨 데이터 - 처음 10일만 (나머지는 패턴 동일)
const literatureLessons: { [day: number]: LessonData } = {
  1: {
    title: '현대시 - 시의 이해',
    desc: '시의 본질과 기본 개념',
    prompt: `수능 국어 문학 "현대시의 이해"에 대해 알려주세요.

## 1. 시의 본질
- 시란 무엇인가?
- 시의 언어적 특성 (함축성, 운율, 이미지)
- 시와 산문의 차이

## 2. 시의 3요소
- 운율: 음악성을 만드는 요소
- 심상(이미지): 감각적 형상화
- 주제: 시인이 전달하려는 중심 의미

## 3. 화자와 어조
- 시적 화자: 시 속에서 말하는 이
- 화자의 태도와 정서
- 어조: 화자의 말투와 분위기

## 4. 시의 구성 요소
- 시어: 시에서 사용되는 언어
- 시구/시행: 시의 단위
- 연: 시의 문단

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '시적 화자와 시인을 혼동하면 안 돼요! 화자는 시 속에서 말하는 가상의 인물입니다.',
    challenge: '좋아하는 시 하나를 골라 화자가 누구인지, 어떤 정서를 드러내는지 분석해보세요!',
    youtubeKeyword: '수능 국어 현대시 화자 어조',
    keywords: [
      { term: '시적 화자', definition: '시 속에서 말하는 가상의 목소리', searchQuery: '시적 화자 개념' },
      { term: '심상(이미지)', definition: '감각을 통해 형상화된 표현', searchQuery: '시 이미지 심상' },
    ],
  },
  2: {
    title: '현대시 - 표현 기법 (1)',
    desc: '비유법과 상징',
    prompt: `수능 국어 현대시 "비유법과 상징"에 대해 알려주세요.

## 1. 비유의 개념
- 원관념과 보조관념
- 비유의 효과: 구체화, 신선함, 공감

## 2. 비유의 종류
- 직유: ~처럼, ~같이 (A는 B와 같다)
- 은유: A는 B다 (직접 동일시)
- 의인법: 사물을 사람처럼
- 활유법: 무생물을 생물처럼
- 대유법: 부분으로 전체를 (한 톨의 밥)

## 3. 상징
- 상징의 개념: 추상적 의미를 구체적 사물로
- 관습적 상징: 비둘기-평화, 백합-순결
- 문맥적(창조적) 상징: 시인이 만든 상징

## 4. 수능 출제 유형
- "㉠~㉤에 사용된 표현 방법으로 적절하지 않은 것은?"
- "시어의 함축적 의미로 가장 적절한 것은?"

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '수능에서 상징 문제가 자주 나와요. 문맥적 상징은 시 전체를 읽어야 파악됩니다!',
    challenge: '김소월의 <진달래꽃>에서 "진달래꽃"이 상징하는 의미를 분석해보세요!',
    youtubeKeyword: '수능 국어 현대시 비유 상징',
    keywords: [
      { term: '원관념/보조관념', definition: '비유에서 표현하려는 대상/빗대는 대상', searchQuery: '원관념 보조관념 예시' },
      { term: '문맥적 상징', definition: '시 속에서 시인이 새롭게 부여한 상징적 의미', searchQuery: '문맥적 상징 관습적 상징' },
    ],
  },
  3: {
    title: '현대시 - 표현 기법 (2)',
    desc: '강조법, 변화법, 기타 기법',
    prompt: `수능 국어 현대시 "강조법, 변화법, 기타 기법"에 대해 알려주세요.

## 1. 강조법
- 과장법: 실제보다 크게/작게
- 반복법: 같은 말/구조 반복
- 열거법: 비슷한 요소 나열
- 점층법: 점점 강해지거나 약해지게
- 대조법: 반대되는 것 나란히

## 2. 변화법
- 도치법: 어순을 바꿈
- 생략법: 일부 생략
- 역설법: 모순되어 보이지만 진리
- 반어법: 반대로 표현

## 3. 기타 표현 기법
- 설의법: 답을 알면서 질문
- 영탄법: 감탄의 표현
- 청유법: 함께 하자고 권유
- 명령법: 강한 지시

## 4. 수능에서 자주 출제되는 기법
- 역설과 반어 구분
- 반복과 대조의 효과

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '역설과 반어는 헷갈리기 쉬워요! 역설은 "진리를 담은 모순", 반어는 "뜻을 강조하기 위한 반대 표현"입니다.',
    challenge: '한용운의 <님의 침묵>에서 역설적 표현을 찾아보세요!',
    youtubeKeyword: '수능 국어 현대시 역설 반어 강조법',
    keywords: [
      { term: '역설', definition: '겉으로는 모순이나 깊은 진리를 담은 표현', searchQuery: '역설 반어 차이' },
      { term: '반어', definition: '의도와 반대로 표현하여 뜻을 강조', searchQuery: '반어법 예시' },
    ],
  },
};

// 화법과 작문 레슨 데이터 - 처음 5일만
const speechWritingLessons: { [day: number]: LessonData } = {
  1: {
    title: '화법 - 의사소통의 원리',
    desc: '화법의 본질과 대화의 원리',
    prompt: `수능 국어 화법 "의사소통의 원리"에 대해 알려주세요.

## 1. 화법의 본질
- 화법이란?
- 음성 언어와 문자 언어의 차이
- 의사소통의 구성 요소

## 2. 협력의 원리 (Grice의 격률)
- 양의 격률: 필요한 만큼만
- 질의 격률: 진실만
- 관계의 격률: 관련성 있게
- 태도의 격률: 명확하게

## 3. 공손성의 원리
- 상대방 체면 유지
- 격식과 비격식
- 높임 표현

## 4. 대화의 원리
- 순서 교대
- 인접쌍 (질문-대답)
- 맞장구와 피드백

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '협력의 원리를 위반하면 함축 의미가 생깁니다. 예: "날씨 좋네요" (화제 바꾸고 싶다는 뜻)',
    challenge: '친구와의 대화에서 협력의 원리가 지켜지지 않은 순간을 찾아보세요!',
    youtubeKeyword: '수능 국어 화법 협력의 원리 공손성',
    keywords: [
      { term: '협력의 원리', definition: '원활한 대화를 위한 4가지 격률', searchQuery: '그라이스 협력의 원리' },
      { term: '공손성의 원리', definition: '상대방의 체면을 유지하는 대화 원리', searchQuery: '공손성의 원리 화법' },
    ],
  },
};

// 언어와 매체 레슨 데이터 - 처음 5일만
const languageMediaLessons: { [day: number]: LessonData } = {
  1: {
    title: '음운론 - 음운의 개념',
    desc: '음운 체계의 이해',
    prompt: `수능 국어 언어 "음운의 개념"에 대해 알려주세요.

## 1. 음운이란?
- 음성과 음운의 차이
- 음운: 뜻을 구별해주는 최소 단위
- 예: "발"과 "말"에서 'ㅂ'과 'ㅁ'

## 2. 국어의 자음 체계
- 조음 위치: 입술소리, 잇몸소리, 경구개음, 연구개음, 후두음
- 조음 방법: 파열음, 마찰음, 파찰음, 비음, 유음
- 예사소리, 된소리, 거센소리

## 3. 국어의 모음 체계
- 단모음: 혀의 높이(고/중/저), 혀의 위치(전설/후설), 입술 모양(원순/평순)
- 이중모음: 반모음 + 단모음

## 4. 음절의 구조
- 초성, 중성, 종성
- 음절의 끝소리 규칙

## 5. 수능 기출 유형 연습문제 5개`,
    funFact: '국어의 자음은 19개, 단모음은 10개(또는 7개)입니다.',
    challenge: '자신의 이름에 들어간 자음을 조음 위치와 조음 방법으로 분류해보세요!',
    youtubeKeyword: '수능 국어 언어와 매체 음운 체계',
    keywords: [
      { term: '음운', definition: '뜻을 구별해주는 소리의 최소 단위', searchQuery: '음운 음성 차이' },
      { term: '조음 위치', definition: '자음이 만들어지는 입 안의 위치', searchQuery: '국어 자음 체계' },
    ],
  },
};

// 수능 국어 실전 레슨 데이터 - 처음 3일만
const suneungKoreanLessons: { [day: number]: LessonData } = {
  1: {
    title: '시간 배분 전략 (1)',
    desc: '80분을 효율적으로 활용하는 방법',
    prompt: `수능 국어 "시간 배분 전략"에 대해 알려주세요.

## 1. 수능 국어 시험 구성
- 시험 시간: 80분
- 문항 수: 45문항 (공통 34문항 + 선택 11문항)
- 선택과목: 화법과작문 또는 언어와매체

## 2. 영역별 문항 구성
- 1~11번: 선택과목 (화작 또는 언매)
- 12~17번: 독서 (독서론 포함)
- 18~34번: 문학
- 35~45번: 독서 (긴 지문)

## 3. 권장 시간 배분
- 선택과목 (1~11번): 15분
- 독서 1 (12~17번): 10분
- 문학 (18~34번): 25분
- 독서 2 (35~45번): 25분
- 검토: 5분

## 4. 시간 단축 전략
- 쉬운 문제 먼저 해결
- 모르는 문제는 표시하고 넘어가기
- 지문 읽기 속도 향상

## 5. 연습 방법
- 실전처럼 시간 재고 풀기
- 영역별 소요 시간 기록`,
    funFact: '수능에서 가장 시간이 많이 걸리는 영역은 독서 융합형 지문(35~45번)입니다!',
    challenge: '모의고사를 풀면서 영역별 소요 시간을 측정해보세요!',
    youtubeKeyword: '수능 국어 시간 배분 전략',
    keywords: [
      { term: '80분 배분', definition: '선택 15분 + 독서1 10분 + 문학 25분 + 독서2 25분 + 검토 5분', searchQuery: '수능 국어 시간 배분' },
    ],
  },
};

// 과목별 레슨 데이터 통합
const allLessons: { [subject: string]: { [day: number]: LessonData } } = {
  'reading': readingLessons,
  'literature': literatureLessons,
  'speech-writing': speechWritingLessons,
  'language-media': languageMediaLessons,
  'suneung-korean': suneungKoreanLessons,
};

// 총 일수 정보
const totalDays: { [subject: string]: number } = {
  'reading': 45,
  'literature': 45,
  'speech-writing': 30,
  'language-media': 30,
  'suneung-korean': 45,
};

export default function KoreanLessonPage() {
  const params = useParams();
  const subject = params.subject as string;
  const day = parseInt(params.day as string);

  const info = subjectInfo[subject];
  const lessons = allLessons[subject] || {};
  const lesson = lessons[day];
  const maxDay = totalDays[subject] || 45;

  const [copied, setCopied] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`korean-${subject}-completed`);
    if (saved) {
      const completed = JSON.parse(saved);
      setIsCompleted(completed.includes(day));
    }
  }, [subject, day]);

  const handleCopyPrompt = async () => {
    const currentLesson = lesson || defaultLesson;
    if (currentLesson?.prompt) {
      await navigator.clipboard.writeText(currentLesson.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openAI = async () => {
    // 프롬프트 자동 복사
    const currentLesson = lesson || defaultLesson;
    if (currentLesson?.prompt) {
      await navigator.clipboard.writeText(currentLesson.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    // AI 사이트 열기
    const urls = {
      claude: 'https://claude.ai/new',
      chatgpt: 'https://chat.openai.com/',
      gemini: 'https://gemini.google.com/',
    };
    window.open(urls[selectedAI], '_blank');
  };

  const toggleComplete = () => {
    const saved = localStorage.getItem(`korean-${subject}-completed`);
    let completed = saved ? JSON.parse(saved) : [];

    if (isCompleted) {
      completed = completed.filter((d: number) => d !== day);
    } else {
      completed.push(day);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    localStorage.setItem(`korean-${subject}-completed`, JSON.stringify(completed));
    setIsCompleted(!isCompleted);
  };

  // 레슨 데이터가 없는 경우 기본 템플릿 생성
  const defaultLesson: LessonData = {
    title: `Day ${day} 학습`,
    desc: '수능 국어 학습 콘텐츠',
    prompt: `수능 국어 ${info?.name || subject} Day ${day} 학습을 도와주세요.

## 학습 목표
오늘 학습할 핵심 개념을 설명해주세요.

## 핵심 개념
1. 주요 개념 설명
2. 예시와 함께 이해하기
3. 수능 출제 포인트

## 연습 문제
수능 기출 유형의 연습문제 5개를 만들어주세요.
각 문제에 정답과 상세 해설을 포함해주세요.

## 정리
오늘 학습한 내용의 핵심을 정리해주세요.`,
    funFact: '꾸준한 학습이 수능 고득점의 비결입니다!',
    challenge: '오늘 배운 내용을 자신의 말로 정리해보세요!',
    youtubeKeyword: `수능 국어 ${info?.name || ''} 강의`,
    keywords: [],
  };

  const currentLesson = lesson || defaultLesson;

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">과목을 찾을 수 없습니다</h1>
          <Link href="/course/korean" className="text-rose-600 hover:underline">
            국어 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
      {/* 학습 완료 축하 효과 */}
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
          </div>
        </div>
      </nav>

      {/* 브레드크럼 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/course/korean" className="hover:text-rose-600">국어 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/korean/${subject}`} className="hover:text-rose-600">{info.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 레슨 헤더 */}
        <div className={`bg-gradient-to-r ${info.color} rounded-2xl p-6 text-white mb-8`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Day {day} / {maxDay}</span>
            <button
              onClick={toggleComplete}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                isCompleted
                  ? 'bg-white text-green-600'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isCompleted ? '✓ 완료됨' : '완료로 표시'}
            </button>
          </div>
          <h1 className="text-2xl font-bold mb-2">{currentLesson.title}</h1>
          <p className="text-white/80">{currentLesson.desc}</p>
        </div>

        {/* 학습 팁 */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-amber-800 mb-1">학습 팁</p>
              <p className="text-amber-700 text-sm">어려운 내용이 있으면 AI에게 "더 쉽게 설명해줘" 또는 "예시를 더 들어줘"라고 요청하세요!</p>
            </div>
          </div>
        </div>

        {/* AI 프롬프트 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-500" />
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
            {currentLesson.prompt}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCopyPrompt}
              className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                copied ? 'bg-green-500 text-white' : 'bg-rose-500 hover:bg-rose-600 text-white'
              }`}
            >
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button
              onClick={openAI}
              className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {selectedAI === 'claude' ? 'Claude' : selectedAI === 'chatgpt' ? 'ChatGPT' : 'Gemini'} 열기
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">
            AI 열기 버튼을 클릭하면 프롬프트가 자동으로 복사됩니다.
          </p>
        </div>

        {/* 재미있는 사실 & 도전 과제 */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              오늘의 재미있는 사실
            </h3>
            <p className="text-purple-700 text-sm">{currentLesson.funFact}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-500" />
              도전 과제
            </h3>
            <p className="text-green-700 text-sm">{currentLesson.challenge}</p>
          </div>
        </div>

        {/* 유튜브 검색 */}
        <div className="bg-red-50 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Youtube className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-gray-900">참고 영상 검색</h3>
          </div>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentLesson.youtubeKeyword)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Youtube className="w-4 h-4" />
            유튜브에서 검색하기
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-sm text-gray-600 mt-2">
            검색어: {currentLesson.youtubeKeyword}
          </p>
        </div>

        {/* 핵심 키워드 */}
        {currentLesson.keywords && currentLesson.keywords.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-900">핵심 키워드</h3>
            </div>
            <div className="space-y-3">
              {(currentLesson.keywords as Keyword[]).map((kw, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{kw.term}</span>
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(kw.searchQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Youtube className="w-3 h-3" />
                      검색
                    </a>
                  </div>
                  <p className="text-sm text-gray-600">{kw.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 이전/다음 버튼 */}
        <div className="flex items-center justify-between">
          {day > 1 ? (
            <Link
              href={`/course/korean/${subject}/lesson/${day - 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Day {day - 1}
            </Link>
          ) : (
            <div />
          )}

          {day < maxDay ? (
            <Link
              href={`/course/korean/${subject}/lesson/${day + 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
            >
              Day {day + 1}
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/course/korean/${subject}`}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Trophy className="w-4 h-4" />
              코스 완료!
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
