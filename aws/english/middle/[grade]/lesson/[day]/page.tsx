'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star, Volume2, Play, Pause, Trash2, Youtube, ExternalLink, MessageCircle } from 'lucide-react';

const gradeInfo: { [key: string]: { name: string; color: string; colorLight: string } } = {
  'grade-7': { name: '중1', color: 'from-indigo-500 to-purple-500', colorLight: 'indigo' },
  'grade-8': { name: '중2', color: 'from-blue-500 to-indigo-500', colorLight: 'blue' },
  'grade-9': { name: '중3', color: 'from-purple-500 to-pink-500', colorLight: 'purple' },
};

const allLessons: { [grade: string]: { [day: number]: { title: string; desc: string; prompt: string; conversationPrompt: string; funFact: string; challenge: string; youtubeKeyword: string } } } = {
  'grade-7': {
    1: {
      title: '문장의 5형식',
      desc: '영어 문장 구조의 기초',
      prompt: `중학교 1학년인데 문장의 5형식에 대해 알려주세요.

1. 왜 문장의 5형식을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (1형식~5형식 각각의 구조와 예문 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "시제"입니다)`,
      conversationPrompt: `중학교 1학년이 문장의 5형식을 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 일상 대화에서 다양한 문장 형식이 자연스럽게 나오는 상황
- 20문장 이상
- 1~5형식 문장을 골고루 포함
- 영어만 출력 (한글 번역 없이)

예시:
- 1형식: "The sun rises."
- 2형식: "She looks happy."
- 3형식: "I love music."
- 4형식: "He gave me a book."
- 5형식: "We call him Tom."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 영어 문장은 딱 5가지 패턴으로 분류할 수 있어요!',
      challenge: '🎯 도전 과제: 오늘 본 문장 5개를 5형식으로 분류해보세요!',
      youtubeKeyword: 'English 5 sentence patterns grammar'
    },
    2: {
      title: '시제',
      desc: '현재/과거/미래 시제',
      prompt: `중학교 1학년인데 시제에 대해 알려주세요.

1. 왜 시제를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (현재시제, 과거시제, 미래시제, 불규칙동사 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "조동사"입니다)`,
      conversationPrompt: `중학교 1학년이 시제를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 주말 계획, 어제 한 일, 평소 습관에 대해 대화하는 상황
- 20문장 이상
- 현재/과거/미래 시제를 골고루 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "What did you do yesterday?"
- "I play soccer every Sunday."
- "I will visit my grandma tomorrow."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 영어에서 미래시제는 will 외에도 be going to로 표현해요!',
      challenge: '🎯 도전 과제: 어제, 오늘, 내일 할 일을 각각 영어로 말해보세요!',
      youtubeKeyword: 'English tenses present past future for beginners'
    },
    3: {
      title: '조동사',
      desc: 'can, will, may, must 등',
      prompt: `중학교 1학년인데 조동사에 대해 알려주세요.

1. 왜 조동사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (can, will, may, must, should 용법과 차이점 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "형용사와 부사"입니다)`,
      conversationPrompt: `중학교 1학년이 조동사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 능력, 허락, 의무, 추측에 대해 대화하는 상황
- 20문장 이상
- can, will, may, must, should를 골고루 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "Can you swim?"
- "You must do your homework."
- "May I use your phone?"

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 조동사 뒤에는 항상 동사원형이 와요!',
      challenge: '🎯 도전 과제: 할 수 있는 것 3가지, 해야 하는 것 3가지를 영어로 말해보세요!',
      youtubeKeyword: 'modal verbs can will may must should English'
    },
    4: {
      title: '형용사와 부사',
      desc: '수식어의 역할과 위치',
      prompt: `중학교 1학년인데 형용사와 부사에 대해 알려주세요.

1. 왜 형용사와 부사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (형용사 위치, 부사 종류, 빈도부사 위치 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "전치사"입니다)`,
      conversationPrompt: `중학교 1학년이 형용사와 부사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 사람, 사물, 행동을 묘사하는 대화
- 20문장 이상
- 다양한 형용사와 부사 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "She is very tall."
- "He runs fast."
- "The movie was really interesting."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 형용사는 명사를, 부사는 동사/형용사/다른 부사를 꾸며요!',
      challenge: '🎯 도전 과제: 친구를 형용사 5개로 묘사해보세요!',
      youtubeKeyword: 'adjectives adverbs English grammar'
    },
    5: {
      title: '전치사',
      desc: 'in, on, at, with 등',
      prompt: `중학교 1학년인데 전치사에 대해 알려주세요.

1. 왜 전치사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (장소 전치사, 시간 전치사, 기타 전치사 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 중2 영어 "to부정사"입니다)`,
      conversationPrompt: `중학교 1학년이 전치사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 장소와 시간을 묻고 답하는 대화
- 20문장 이상
- in, on, at, with, for, from, to 등 다양한 전치사 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "Where is the book?" "It's on the desk."
- "I go to school at 8 o'clock."
- "I live in Seoul."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: in은 공간 안, on은 표면, at은 한 점을 나타내요!',
      challenge: '🎯 도전 과제: 방 안의 물건 위치를 전치사로 설명해보세요!',
      youtubeKeyword: 'prepositions in on at English grammar'
    }
  },
  'grade-8': {
    1: {
      title: 'to부정사',
      desc: '명사/형용사/부사적 용법',
      prompt: `중학교 2학년인데 to부정사에 대해 알려주세요.

1. 왜 to부정사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (명사적/형용사적/부사적 용법, 의미상 주어 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "동명사"입니다)`,
      conversationPrompt: `중학교 2학년이 to부정사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 꿈, 계획, 희망에 대해 대화하는 상황
- 20문장 이상
- to부정사의 3가지 용법을 자연스럽게 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "I want to be a doctor." (명사적)
- "I have many things to do." (형용사적)
- "I study hard to pass the test." (부사적)

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: to부정사는 "to + 동사원형"으로 세 가지 역할을 해요!',
      challenge: '🎯 도전 과제: "I want to ~" 문장 5개를 만들어보세요!',
      youtubeKeyword: 'to infinitive English grammar uses'
    },
    2: {
      title: '동명사',
      desc: '동사 + ing의 명사적 역할',
      prompt: `중학교 2학년인데 동명사에 대해 알려주세요.

1. 왜 동명사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (동명사 역할, to부정사와 비교, 동명사만 쓰는 동사 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "현재완료"입니다)`,
      conversationPrompt: `중학교 2학년이 동명사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 취미, 좋아하는 것/싫어하는 것에 대해 대화
- 20문장 이상
- enjoy, finish, mind, keep 등 동명사만 쓰는 동사 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "I enjoy playing games."
- "She finished reading the book."
- "Do you mind opening the window?"

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: enjoy, finish, mind 뒤에는 동명사만 와요!',
      challenge: '🎯 도전 과제: "I enjoy ~ing" 문장 5개를 만들어보세요!',
      youtubeKeyword: 'gerund ing form English grammar'
    },
    3: {
      title: '현재완료',
      desc: 'have + 과거분사',
      prompt: `중학교 2학년인데 현재완료에 대해 알려주세요.

1. 왜 현재완료를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (경험, 계속, 완료, 결과 용법과 과거시제 차이 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "수동태"입니다)`,
      conversationPrompt: `중학교 2학년이 현재완료를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 경험, 완료, 계속에 대해 대화하는 상황
- 20문장 이상
- have/has + 과거분사 형태 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "Have you ever been to Japan?"
- "I have just finished my homework."
- "She has lived here for 10 years."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: "I have been to ~"는 "~에 가본 적 있다"는 경험 표현이에요!',
      challenge: '🎯 도전 과제: 가본 적 있는 곳 3곳을 영어로 말해보세요!',
      youtubeKeyword: 'present perfect tense have has English'
    },
    4: {
      title: '수동태',
      desc: 'be + 과거분사',
      prompt: `중학교 2학년인데 수동태에 대해 알려주세요.

1. 왜 수동태를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (수동태 만드는 법, 시제별 수동태, by + 행위자 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "비교급과 최상급"입니다)`,
      conversationPrompt: `중학교 2학년이 수동태를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 역사, 발명품, 뉴스에 대해 대화하는 상황
- 20문장 이상
- be + 과거분사 형태 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "This book was written by Shakespeare."
- "The window was broken by the ball."
- "English is spoken in many countries."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 수동태는 "~되다, ~당하다"로 해석해요!',
      challenge: '🎯 도전 과제: 능동문 3개를 수동문으로 바꿔보세요!',
      youtubeKeyword: 'passive voice English grammar be past participle'
    },
    5: {
      title: '비교급과 최상급',
      desc: '-er/-est, more/most',
      prompt: `중학교 2학년인데 비교급과 최상급에 대해 알려주세요.

1. 왜 비교급과 최상급을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (-er/-est, more/most 규칙, 불규칙 변화 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 중3 영어 "관계대명사"입니다)`,
      conversationPrompt: `중학교 2학년이 비교급과 최상급을 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 물건, 사람, 장소를 비교하는 대화
- 20문장 이상
- 비교급과 최상급을 다양하게 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "Who is taller, Tom or Jerry?"
- "This is the biggest house in the town."
- "Math is more difficult than English."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: good-better-best는 완전히 다른 형태로 변해요!',
      challenge: '🎯 도전 과제: 친구와 자신을 3가지로 비교해보세요!',
      youtubeKeyword: 'comparative superlative adjectives English'
    }
  },
  'grade-9': {
    1: {
      title: '관계대명사',
      desc: 'who, which, that',
      prompt: `중학교 3학년인데 관계대명사에 대해 알려주세요.

1. 왜 관계대명사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (who, which, that 구분, 주격/목적격 관계대명사 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "분사"입니다)`,
      conversationPrompt: `중학교 3학년이 관계대명사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 사람, 사물을 설명하는 대화
- 20문장 이상
- who, which, that을 다양하게 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "I know the man who lives next door."
- "This is the book which I bought yesterday."
- "The car that he drives is very fast."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 관계대명사는 두 문장을 하나로 연결해요!',
      challenge: '🎯 도전 과제: "The man who ~" 문장 3개를 만들어보세요!',
      youtubeKeyword: 'relative pronouns who which that English'
    },
    2: {
      title: '분사',
      desc: '현재분사와 과거분사',
      prompt: `중학교 3학년인데 분사에 대해 알려주세요.

1. 왜 분사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (현재분사 -ing, 과거분사 -ed, 감정형용사 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "가정법"입니다)`,
      conversationPrompt: `중학교 3학년이 분사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 감정, 상황 묘사에 대해 대화하는 상황
- 20문장 이상
- 현재분사(-ing)와 과거분사(-ed) 형용사 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "The movie was boring."
- "I was bored."
- "She looks excited about the trip."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: interesting은 "흥미로운", interested는 "흥미를 느끼는"이에요!',
      challenge: '🎯 도전 과제: boring과 bored를 각각 사용한 문장을 만들어보세요!',
      youtubeKeyword: 'participles present past ing ed adjectives English'
    },
    3: {
      title: '가정법',
      desc: '가정법 과거와 과거완료',
      prompt: `중학교 3학년인데 가정법에 대해 알려주세요.

1. 왜 가정법을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (가정법 과거, 가정법 과거완료, I wish 구문 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "접속사"입니다)`,
      conversationPrompt: `중학교 3학년이 가정법을 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 소원, 상상, 후회에 대해 대화하는 상황
- 20문장 이상
- If I were..., I wish... 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "If I were you, I would study harder."
- "I wish I could fly."
- "If I had money, I would buy it."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: "If I were you"에서 I 뒤에 were가 와요!',
      challenge: '🎯 도전 과제: "If I were ~" 문장 3개를 만들어보세요!',
      youtubeKeyword: 'subjunctive mood if I were conditional English'
    },
    4: {
      title: '접속사',
      desc: '등위/종속 접속사',
      prompt: `중학교 3학년인데 접속사에 대해 알려주세요.

1. 왜 접속사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (and/but/or, when/if/because/although 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "간접화법"입니다)`,
      conversationPrompt: `중학교 3학년이 접속사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 이유, 조건, 양보 등을 설명하는 대화
- 20문장 이상
- because, when, if, although 등 종속접속사 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "I stayed home because it rained."
- "When I was young, I lived in Busan."
- "Although it was cold, we went outside."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: although는 "~에도 불구하고"라는 뜻이에요!',
      challenge: '🎯 도전 과제: because와 although를 사용한 문장을 각각 만들어보세요!',
      youtubeKeyword: 'conjunctions because when if although English'
    },
    5: {
      title: '간접화법',
      desc: '직접화법을 간접화법으로',
      prompt: `중학교 3학년인데 간접화법에 대해 알려주세요.

1. 왜 간접화법을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (평서문/의문문/명령문의 간접화법 전환 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 고등 영어 "문장 구조 심화"입니다)`,
      conversationPrompt: `중학교 3학년이 간접화법을 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 다른 사람이 한 말을 전달하는 대화
- 20문장 이상
- said that, told me to, asked if 등 포함
- 영어만 출력 (한글 번역 없이)

예시 표현:
- "He said that he was tired."
- "She told me to wait here."
- "He asked if I was okay."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 간접화법에서는 시제가 한 단계씩 과거로 바뀌어요!',
      challenge: '🎯 도전 과제: 친구가 한 말을 간접화법으로 전달해보세요!',
      youtubeKeyword: 'reported speech indirect speech English grammar'
    }
  }
};

export default function MiddleEnglishLessonPage() {
  const params = useParams();
  const grade = params.grade as string;
  const day = Number(params.day);

  const gradeData = gradeInfo[grade];
  const lessons = allLessons[grade];
  const lesson = lessons?.[day];

  const [copied, setCopied] = useState(false);
  const [copiedConv, setCopiedConv] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // TTS states
  const [ttsText, setTtsText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`english-middle-${grade}-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [grade, day]);

  const copyPrompt = async () => {
    if (!lesson) return;
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyConversationPrompt = async () => {
    if (!lesson) return;
    await navigator.clipboard.writeText(lesson.conversationPrompt);
    setCopiedConv(true);
    setTimeout(() => setCopiedConv(false), 2000);
  };

  const openAI = async () => {
    if (!lesson) return;
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    const url = selectedAI === 'claude'
      ? 'https://claude.ai/new'
      : 'https://chat.openai.com/';
    window.open(url, '_blank');
  };

  const openAIConversation = async () => {
    if (!lesson) return;
    await navigator.clipboard.writeText(lesson.conversationPrompt);
    setCopiedConv(true);
    setTimeout(() => setCopiedConv(false), 2000);
    const url = selectedAI === 'claude'
      ? 'https://claude.ai/new'
      : 'https://chat.openai.com/';
    window.open(url, '_blank');
  };

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`english-middle-${grade}-day${day}-completed`, 'true');
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
    if (!lesson) return;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.youtubeKeyword)}`;
    window.open(url, '_blank');
  };

  if (!gradeData || !lesson) {
    return <div className="min-h-screen flex items-center justify-center">레슨을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-${gradeData.colorLight}-50`}>
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '24px'
            }}>
              {['🎉', '⭐', '🏆', '✨', '📘'][Math.floor(Math.random() * 5)]}
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
            <Link href="/course/english" className="hover:text-blue-600">영어 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/english/middle/${grade}`} className="hover:text-blue-600">{gradeData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${gradeData.color} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
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
              <p className="text-amber-700 text-sm">AI에게 "더 많은 예문을 보여줘" 또는 "이 문법으로 대화문을 만들어줘"라고 요청해보세요!</p>
            </div>
          </div>
        </div>

        {/* AI 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🤖 AI 선택</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedAI('claude')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${selectedAI === 'claude' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="text-2xl mb-1">🧠</div>
              <div className="font-semibold">Claude</div>
            </button>
            <button
              onClick={() => setSelectedAI('chatgpt')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${selectedAI === 'chatgpt' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="text-2xl mb-1">💬</div>
              <div className="font-semibold">ChatGPT</div>
            </button>
          </div>
        </div>

        {/* 학습 프롬프트 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-500" />
              📖 학습 프롬프트
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}>
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button onClick={openAI} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {selectedAI === 'claude' ? 'Claude' : 'ChatGPT'} 열기
            </button>
          </div>
        </div>

        {/* 회화 연습 프롬프트 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-500" />
              🎤 회화 연습 프롬프트
            </h2>
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">20문장 이상</span>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
            {lesson.conversationPrompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyConversationPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copiedConv ? 'bg-green-500 text-white' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}>
              {copiedConv ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 회화 프롬프트 복사</>}
            </button>
            <button onClick={openAIConversation} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {selectedAI === 'claude' ? 'Claude' : 'ChatGPT'} 열기
            </button>
          </div>
        </div>

        {/* TTS 리스닝 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">🎧 영어 듣기 연습</h2>
              <p className="text-sm text-gray-500">AI가 생성한 회화 대화를 붙여넣고 원어민 발음으로 들어보세요</p>
            </div>
          </div>

          <textarea
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder="AI가 생성한 영어 대화를 여기에 붙여넣으세요..."
            className="w-full h-40 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none text-gray-700"
          />

          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">속도:</span>
              <div className="flex gap-1">
                {(['slow', 'normal', 'fast'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-3 py-1 rounded-full text-sm transition ${speed === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {s === 'slow' ? '느리게' : s === 'normal' ? '보통' : '빠르게'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearTTS}
                disabled={!ttsText.trim()}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition ${ttsText.trim() ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                <Trash2 className="w-5 h-5" />지우기
              </button>
              <button
                onClick={playTTS}
                disabled={!ttsText.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${ttsText.trim() ? isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {isPlaying ? <><Pause className="w-5 h-5" />정지</> : <><Play className="w-5 h-5" />듣기</>}
              </button>
            </div>
          </div>
        </div>

        {/* YouTube 참고 영상 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Youtube className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">📺 YouTube 참고 영상</h2>
              <p className="text-sm text-gray-500">관련 영어 학습 영상을 YouTube에서 찾아보세요</p>
            </div>
          </div>

          <div className="bg-red-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-700"><span className="font-medium">검색어:</span> {lesson.youtubeKeyword}</p>
          </div>

          <button
            onClick={openYouTube}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
          >
            <Youtube className="w-5 h-5" />
            YouTube에서 검색하기
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <h3 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              오늘의 재미있는 사실
            </h3>
            <p className="text-purple-700 text-sm">{lesson.funFact}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
            <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-500" />
              도전 과제
            </h3>
            <p className="text-green-700 text-sm">{lesson.challenge}</p>
          </div>
        </div>

        {!completed && (
          <button onClick={markComplete} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        )}

        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link href={`/course/english/middle/${grade}/lesson/${day - 1}`} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < 5 ? (
            <Link href={`/course/english/middle/${grade}/lesson/${day + 1}`} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/english/middle/${grade}`} className="flex items-center gap-2 text-indigo-600 font-medium">
              <span>코스 완료!</span>
              <Trophy className="w-5 h-5" />
            </Link>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p></div></footer>
    </div>
  );
}
