'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star, Volume2, Play, Pause, Trash2, Youtube, ExternalLink, MessageCircle } from 'lucide-react';

const courseInfo: Record<string, { name: string; color: string; bgColor: string; textColor: string }> = {
  'common': { name: '고1 공통', color: 'from-purple-500 to-violet-500', bgColor: 'from-slate-50 to-purple-50', textColor: 'purple' },
  'reading': { name: '독해', color: 'from-blue-500 to-cyan-500', bgColor: 'from-slate-50 to-blue-50', textColor: 'blue' },
  'writing': { name: '작문', color: 'from-emerald-500 to-teal-500', bgColor: 'from-slate-50 to-emerald-50', textColor: 'emerald' },
  'suneung': { name: '수능', color: 'from-rose-500 to-pink-500', bgColor: 'from-slate-50 to-rose-50', textColor: 'rose' },
};

const allLessons: { [course: string]: { [day: number]: { title: string; desc: string; prompt: string; conversationPrompt: string; funFact: string; challenge: string; youtubeKeyword: string } } } = {
  'common': {
    1: {
      title: '고급 문법 심화',
      desc: '시제 일치, 화법 전환',
      prompt: `고등학교 1학년인데 시제 일치와 화법 전환에 대해 알려주세요.

1. 왜 시제 일치와 화법 전환을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (시제 일치 규칙, 직접화법→간접화법, 인칭/시제/지시어 변환 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "복잡한 문장 구조"입니다)`,
      conversationPrompt: `고등학교 1학년이 시제 일치와 화법 전환을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 직접화법과 간접화법 전환 예시가 포함되어야 합니다
3. 시제 일치 규칙이 자연스럽게 나타나야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- She said that she had finished...
- He told me he would come...
- They mentioned that...

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 시제 일치에서 불변의 진리는 현재시제를 유지해요! "He said the earth is round."',
      challenge: '🎯 도전 과제: 친구가 한 말 5개를 간접화법으로 바꿔보세요!',
      youtubeKeyword: 'English reported speech indirect speech high school'
    },
    2: {
      title: '복잡한 문장 구조',
      desc: '도치, 강조, 생략',
      prompt: `고등학교 1학년인데 도치, 강조, 생략 구문에 대해 알려주세요.

1. 왜 도치/강조/생략 구문을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (부정어 도치, It is~that 강조, so/neither 도치, 생략 규칙 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "준동사 심화"입니다)`,
      conversationPrompt: `고등학교 1학년이 도치, 강조, 생략 구문을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 부정어 도치, It is~that 강조 구문이 포함되어야 합니다
3. So do I, Neither can I 등의 동의 표현이 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Never have I seen such a thing!
- It was John who helped me.
- So do I! / Neither can she.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: "Never have I seen..."처럼 부정어가 앞에 오면 의문문 어순이 돼요!',
      challenge: '🎯 도전 과제: 부정어 도치 문장 5개를 만들어보세요!',
      youtubeKeyword: 'English inversion emphasis sentence structure grammar'
    },
    3: {
      title: '준동사 심화',
      desc: '부정사/동명사/분사 완벽 정복',
      prompt: `고등학교 1학년인데 준동사 심화에 대해 알려주세요.

1. 왜 준동사 심화를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (완료부정사, 완료동명사, 분사구문, 독립분사구문, 의미상 주어 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "특수 구문"입니다)`,
      conversationPrompt: `고등학교 1학년이 준동사(부정사, 동명사, 분사)를 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. to부정사, 동명사, 분사구문이 자연스럽게 포함되어야 합니다
3. 완료부정사와 분사구문이 활용되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- He seems to have left already.
- Having finished my work, I went home.
- I regret not studying harder.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: "Having finished"는 먼저 끝낸 후라는 뜻으로, 완료의 의미를 가져요!',
      challenge: '🎯 도전 과제: 분사구문으로 문장 5개를 줄여보세요!',
      youtubeKeyword: 'English infinitive gerund participle advanced grammar'
    },
    4: {
      title: '특수 구문',
      desc: '가정법, 조건문 심화',
      prompt: `고등학교 1학년인데 가정법과 조건문 심화에 대해 알려주세요.

1. 왜 가정법과 조건문을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (혼합 가정법, I wish, as if, if 생략과 도치, Without/But for 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "구문 분석 실전"입니다)`,
      conversationPrompt: `고등학교 1학년이 가정법과 조건문을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 가정법 과거, 과거완료, 혼합 가정법이 포함되어야 합니다
3. I wish, as if 구문이 자연스럽게 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- If I were you, I would study harder.
- I wish I had studied more.
- He talks as if he knew everything.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: "Were I you"는 "If I were you"의 도치형이에요!',
      challenge: '🎯 도전 과제: 혼합 가정법 문장 5개를 만들어보세요!',
      youtubeKeyword: 'English subjunctive mood conditional sentences I wish'
    },
    5: {
      title: '구문 분석 실전',
      desc: '긴 문장 분석 기술',
      prompt: `고등학교 1학년인데 구문 분석 실전에 대해 알려주세요.

1. 왜 구문 분석을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (삽입구 처리, 긴 주어/목적어 찾기, 중첩 구문 분석, 관계절 처리 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "독해 - 주제 찾기"입니다)`,
      conversationPrompt: `고등학교 1학년이 복잡한 문장 구문 분석을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 관계절, 삽입구가 포함된 복잡한 문장이 있어야 합니다
3. 긴 주어와 목적어를 찾는 연습이 되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- The book, which I borrowed from the library, was fascinating.
- What surprised me the most was his reaction.
- The fact that he passed the exam made everyone happy.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 콤마 사이에 있는 내용은 부가 정보라서 먼저 빼고 읽으면 문장이 쉬워져요!',
      challenge: '🎯 도전 과제: 영자 신문에서 긴 문장 5개를 분석해보세요!',
      youtubeKeyword: 'English complex sentence analysis parsing structure'
    }
  },
  'reading': {
    1: {
      title: '주제 찾기',
      desc: '글의 중심 내용 파악',
      prompt: `고등학생인데 영어 독해에서 주제 찾기에 대해 알려주세요.

1. 왜 주제 찾기를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (주제문 위치, 주제문 vs 뒷받침 문장, 반복 키워드 찾기 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "요지/주장 파악"입니다)`,
      conversationPrompt: `고등학생이 영어 독해에서 주제 찾기를 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 글의 주제를 파악하는 전략에 대해 대화해야 합니다
3. 주제문, 키워드, 중심 내용에 대한 표현이 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- The main idea of this passage is...
- What do you think the author is trying to say?
- The key point seems to be...

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 주제문은 보통 첫 문장이나 마지막 문장에 있어요!',
      challenge: '🎯 도전 과제: 영어 기사 5개의 주제를 찾아보세요!',
      youtubeKeyword: 'English reading main idea topic sentence'
    },
    2: {
      title: '요지/주장 파악',
      desc: '필자의 의도 읽기',
      prompt: `고등학생인데 영어 독해에서 요지와 주장 파악에 대해 알려주세요.

1. 왜 요지/주장 파악을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (요지 vs 주제, should/must 등 주장 표현, 함축 의미 추론 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "빈칸 추론"입니다)`,
      conversationPrompt: `고등학생이 영어 독해에서 요지/주장 파악을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 필자의 의도와 주장을 파악하는 방법에 대해 대화해야 합니다
3. should, must, need to 등 주장 표현이 포함되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- The author argues that we should...
- I think the writer is implying that...
- The main point the author wants to make is...

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: should, must, need to 같은 표현이 나오면 필자의 주장이에요!',
      challenge: '🎯 도전 과제: 사설 5개에서 필자의 주장을 찾아보세요!',
      youtubeKeyword: 'English reading comprehension author purpose claim'
    },
    3: {
      title: '빈칸 추론',
      desc: '문맥에서 답 찾기',
      prompt: `고등학생인데 영어 독해에서 빈칸 추론에 대해 알려주세요.

1. 왜 빈칸 추론을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (빈칸 앞뒤 문맥, 연결어 활용, 선택지 대입 검증 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "순서/삽입"입니다)`,
      conversationPrompt: `고등학생이 영어 독해에서 빈칸 추론을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 문맥에서 답을 찾는 전략에 대해 대화해야 합니다
3. 연결어(however, therefore, in contrast 등)의 역할이 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Based on the context, I think the answer is...
- The word 'however' tells us that the next idea is...
- Let me look at the sentences before and after the blank.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: however, therefore 같은 연결어가 빈칸의 힌트예요!',
      challenge: '🎯 도전 과제: 빈칸 문제 10개를 풀어보세요!',
      youtubeKeyword: 'English reading blanks inference context clues'
    },
    4: {
      title: '순서/삽입',
      desc: '글의 논리적 흐름',
      prompt: `고등학생인데 영어 독해에서 순서 배열과 문장 삽입에 대해 알려주세요.

1. 왜 순서/삽입 문제를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (a/the 변화, 대명사, 지시어, 연결어로 순서 찾기 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "장문 독해"입니다)`,
      conversationPrompt: `고등학생이 영어 독해에서 순서/삽입 문제를 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 글의 논리적 흐름을 파악하는 방법에 대해 대화해야 합니다
3. a/the, 대명사, 지시어의 역할이 설명되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- This sentence should come first because it introduces 'a dog'.
- The word 'this' refers to something mentioned before.
- Notice how 'the' tells us this was already mentioned.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: This, Such, These로 시작하면 앞에 무언가가 있어야 해요!',
      challenge: '🎯 도전 과제: 문장 순서 배열 문제 10개를 풀어보세요!',
      youtubeKeyword: 'English reading paragraph order sentence insertion'
    },
    5: {
      title: '장문 독해',
      desc: '긴 지문 공략법',
      prompt: `고등학생인데 영어 장문 독해에 대해 알려주세요.

1. 왜 장문 독해를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (문제 먼저 보기, 단락별 주제문, 세부 정보 찾기, 어휘/지칭 문제 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "작문 - 기본 문장 작성"입니다)`,
      conversationPrompt: `고등학생이 영어 장문 독해 전략을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 장문 독해 전략과 시간 관리에 대해 대화해야 합니다
3. 단락별 읽기, 스키밍, 스캐닝 등의 기술이 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- First, I skim through the questions to know what to look for.
- Each paragraph usually has one main idea.
- Let me scan for specific details mentioned in the question.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 장문도 단락별로 나누면 쉬워져요!',
      challenge: '🎯 도전 과제: 장문 독해 문제 5세트를 풀어보세요!',
      youtubeKeyword: 'English long passage reading strategies skimming scanning'
    }
  },
  'writing': {
    1: {
      title: '기본 문장 작성',
      desc: '정확한 문장 만들기',
      prompt: `고등학생인데 영작문에서 기본 문장 작성에 대해 알려주세요.

1. 왜 기본 문장 작성을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (주어-동사 일치, 시제 일관성, 관사 사용, 전치사 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "문장 연결"입니다)`,
      conversationPrompt: `고등학생이 영작문 기본 문장 작성을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 정확한 문장 구조, 주어-동사 일치에 대해 대화해야 합니다
3. 관사(a, an, the)와 전치사 사용법이 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Make sure the subject and verb agree.
- Should I use 'a' or 'the' here?
- The preposition 'in' is used for months and years.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 좋은 영작의 시작은 정확한 문장이에요!',
      challenge: '🎯 도전 과제: 오늘 있었던 일을 10문장으로 써보세요!',
      youtubeKeyword: 'English writing basic sentences subject verb agreement'
    },
    2: {
      title: '문장 연결',
      desc: '논리적 흐름 만들기',
      prompt: `고등학생인데 영작문에서 문장 연결에 대해 알려주세요.

1. 왜 문장 연결을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (등위접속사, 종속접속사, 연결 부사, 콤마/세미콜론 사용법 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "문단 작성"입니다)`,
      conversationPrompt: `고등학생이 영작문에서 문장 연결을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 접속사, 연결어 사용법에 대해 대화해야 합니다
3. and, but, however, therefore, moreover 등이 활용되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Use 'however' to show contrast between two ideas.
- 'Therefore' shows a cause and effect relationship.
- You can combine these sentences using 'although'.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 연결어를 잘 쓰면 글이 자연스러워져요!',
      challenge: '🎯 도전 과제: 연결어를 사용해 5개 문장을 연결해보세요!',
      youtubeKeyword: 'English writing transitions connectors linking words'
    },
    3: {
      title: '문단 작성',
      desc: '주제문, 뒷받침 문장',
      prompt: `고등학생인데 영작문에서 문단 작성에 대해 알려주세요.

1. 왜 문단 작성을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (주제문 작성, 뒷받침 문장 유형, 결론 문장 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "에세이 구조"입니다)`,
      conversationPrompt: `고등학생이 영작문에서 문단 작성을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 주제문, 뒷받침 문장, 결론 문장에 대해 대화해야 합니다
3. 문단의 구조와 통일성에 대해 설명되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Start your paragraph with a clear topic sentence.
- Each supporting sentence should relate to the main idea.
- End with a concluding sentence that wraps up the paragraph.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 좋은 문단은 주제문 + 뒷받침 + 마무리로 구성돼요!',
      challenge: '🎯 도전 과제: 하나의 주제로 완성된 문단을 써보세요!',
      youtubeKeyword: 'English paragraph writing topic sentence supporting details'
    },
    4: {
      title: '에세이 구조',
      desc: '서론, 본론, 결론',
      prompt: `고등학생인데 영작문에서 에세이 구조에 대해 알려주세요.

1. 왜 에세이 구조를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (서론 작성법 Hook/Background/Thesis, 본론 전개, 결론 마무리 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "실전 영작문"입니다)`,
      conversationPrompt: `고등학생이 영작문에서 에세이 구조를 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 5단락 에세이 구조(서론, 본론 3개, 결론)에 대해 대화해야 합니다
3. Hook, thesis statement, body paragraphs, conclusion이 설명되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- The introduction should grab the reader's attention with a hook.
- Your thesis statement tells readers what your essay is about.
- Each body paragraph should focus on one main argument.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 5단락 에세이가 기본 구조예요!',
      challenge: '🎯 도전 과제: 5단락 에세이를 완성해보세요!',
      youtubeKeyword: 'English five paragraph essay structure introduction body conclusion'
    },
    5: {
      title: '실전 영작문',
      desc: '다양한 주제 글쓰기',
      prompt: `고등학생인데 실전 영작문에 대해 알려주세요.

1. 왜 실전 영작문을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (의견 에세이, 비교/대조 에세이, 문제/해결 에세이 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "수능 - 듣기 평가"입니다)`,
      conversationPrompt: `고등학생이 다양한 에세이 유형을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 의견 에세이, 비교/대조, 문제/해결 에세이에 대해 대화해야 합니다
3. 각 유형의 특징과 구조가 설명되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- In an opinion essay, clearly state your position.
- A compare/contrast essay examines similarities and differences.
- Problem-solution essays identify an issue and propose solutions.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 많이 쓸수록 영작 실력이 늘어요!',
      challenge: '🎯 도전 과제: 관심 있는 주제로 에세이를 써보세요!',
      youtubeKeyword: 'English essay types opinion compare contrast problem solution'
    }
  },
  'suneung': {
    1: {
      title: '듣기 평가',
      desc: '듣기 유형별 전략',
      prompt: `수능을 준비하는 고등학생인데 영어 듣기 평가에 대해 알려주세요.

1. 왜 듣기 평가를 잘 해야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (시험에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (유형별 전략: 목적/주제, 관계/장소, 숫자/시간, 담화 완성 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "어법/어휘"입니다)`,
      conversationPrompt: `수능 영어 듣기 평가 전략을 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 수능 듣기 유형(목적, 관계, 장소, 숫자)에 대해 대화해야 합니다
3. 듣기 전략과 키워드 찾기에 대해 설명되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Listen for key words that reveal the speaker's purpose.
- Pay attention to numbers and time expressions.
- The relationship between speakers is often shown by how they address each other.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 듣기는 예측이 핵심이에요! 문제를 먼저 읽고 예측하세요.',
      challenge: '🎯 도전 과제: 수능 듣기 모의고사를 풀어보세요!',
      youtubeKeyword: 'Korean CSAT English listening test strategies 수능 영어 듣기'
    },
    2: {
      title: '어법/어휘',
      desc: '문법, 어휘 문제 공략',
      prompt: `수능을 준비하는 고등학생인데 어법과 어휘 문제에 대해 알려주세요.

1. 왜 어법/어휘 문제를 잘 풀어야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (시험에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (빈출 어법: 수일치, 준동사, 관계사, 병렬, 어휘 추론법 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "빈칸 추론"입니다)`,
      conversationPrompt: `수능 영어 어법/어휘 문제를 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 수능 빈출 어법(수일치, 준동사, 관계사)에 대해 대화해야 합니다
3. 어휘 추론 방법도 설명되어야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Check if the subject is singular or plural.
- Decide whether to use to-infinitive or gerund.
- Look at the context to guess the meaning of unknown words.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 어법은 출제 포인트가 정해져 있어요! 5가지 빈출 포인트를 외우세요.',
      challenge: '🎯 도전 과제: 어법 문제 30개를 풀어보세요!',
      youtubeKeyword: 'Korean CSAT English grammar vocabulary 수능 영어 어법 어휘'
    },
    3: {
      title: '빈칸 추론',
      desc: '논리적 추론 능력',
      prompt: `수능을 준비하는 고등학생인데 빈칸 추론 문제에 대해 알려주세요.

1. 왜 빈칸 추론 문제를 잘 풀어야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (시험에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (빈칸 문장 분석, 주제문 연결, 함축 의미, 고난도 문제 전략 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "글의 순서/삽입"입니다)`,
      conversationPrompt: `수능 영어 빈칸 추론 문제를 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 수능 빈칸 추론 전략에 대해 대화해야 합니다
3. 주제문과 빈칸의 관계, 연결어 활용법이 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- The blank is usually related to the main idea.
- Pay attention to discourse markers like 'however' and 'therefore'.
- Eliminate obviously wrong choices first.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 빈칸 문제가 수능에서 가장 어려워요! 빈칸 앞뒤가 핵심!',
      challenge: '🎯 도전 과제: 빈칸 추론 문제 20개를 풀어보세요!',
      youtubeKeyword: 'Korean CSAT English blank inference 수능 영어 빈칸 추론'
    },
    4: {
      title: '글의 순서/삽입',
      desc: '응집성 문제 해결',
      prompt: `수능을 준비하는 고등학생인데 글의 순서와 문장 삽입 문제에 대해 알려주세요.

1. 왜 순서/삽입 문제를 잘 풀어야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (시험에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (관사 변화, 대명사/지시어, 연결어, 응집성 분석 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "장문 독해/요약"입니다)`,
      conversationPrompt: `수능 영어 순서/삽입 문제를 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 수능 순서/삽입 문제 전략에 대해 대화해야 합니다
3. 관사(a→the), 대명사, 지시어 분석법이 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Look for the change from 'a' to 'the' to find the order.
- Pronouns like 'it', 'this', 'they' need antecedents.
- The given sentence often starts with a reference word.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: This, Such, These가 문장 앞에 있으면 앞에 선행사가 필요해요!',
      challenge: '🎯 도전 과제: 순서/삽입 문제 20개를 풀어보세요!',
      youtubeKeyword: 'Korean CSAT English order insertion 수능 영어 순서 삽입'
    },
    5: {
      title: '장문 독해/요약',
      desc: '고난도 문제 정복',
      prompt: `수능을 준비하는 고등학생인데 장문 독해와 요약 문제에 대해 알려주세요.

1. 왜 장문 독해/요약 문제를 잘 풀어야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (시험에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (장문 읽기 전략, 요약문 완성, 복합 지문/도표 분석 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (수능 영어 완성! 실전 모의고사로 연습하세요)`,
      conversationPrompt: `수능 영어 장문 독해/요약 문제를 연습할 수 있는 회화 대화문을 만들어주세요.

1. 20문장 이상의 대화문을 만들어주세요
2. 수능 장문/요약 문제 전략에 대해 대화해야 합니다
3. 시간 관리, 핵심 정보 찾기, 요약 완성법이 나와야 합니다
4. 영어로만 작성해주세요 (한국어 번역 없이)

예시 표현:
- Read the questions first to know what to look for.
- Focus on the first and last sentences of each paragraph.
- The summary captures the main idea and key supporting points.

대화 형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
      funFact: '💡 재미있는 사실: 장문도 단락별로 나누면 쉬워져요! 각 단락 첫 문장이 핵심!',
      challenge: '🎯 도전 과제: 장문 독해 문제 10세트를 풀어보세요!',
      youtubeKeyword: 'Korean CSAT English long passage summary 수능 영어 장문 요약'
    }
  }
};

export default function HighEnglishLessonPage() {
  const params = useParams();
  const course = params.course as string;
  const day = Number(params.day);
  const courseData = courseInfo[course];
  const lessonsByCourse = allLessons[course];
  const lesson = lessonsByCourse?.[day];

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
    const saved = localStorage.getItem(`english-high-${course}-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [course, day]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    const url = selectedAI === 'claude'
      ? 'https://claude.ai/new'
      : 'https://chat.openai.com/';
    window.open(url, '_blank');
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
    const url = selectedAI === 'claude'
      ? 'https://claude.ai/new'
      : 'https://chat.openai.com/';
    window.open(url, '_blank');
  };

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`english-high-${course}-day${day}-completed`, 'true');
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

  if (!lesson || !courseData) {
    return <div className="min-h-screen flex items-center justify-center">레슨을 찾을 수 없습니다.</div>;
  }

  const maxDay = 5;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${courseData.bgColor}`}>
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
            <Link href="/course/english" className="hover:text-blue-600">영어 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/english/high/${course}`} className="hover:text-blue-600">{courseData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${courseData.color} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <div className="text-white/70 text-sm mb-1">{courseData.name}</div>
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
              <p className="text-amber-700 text-sm">AI에게 &quot;예문을 더 주세요&quot; 또는 &quot;연습문제를 더 쉽게 만들어주세요&quot;라고 요청해보세요!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className={`w-5 h-5 text-${courseData.textColor}-500`} />
              AI 프롬프트
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedAI}
                onChange={(e) => setSelectedAI(e.target.value as 'claude' | 'chatgpt')}
                className="text-sm border rounded-lg px-3 py-1.5"
              >
                <option value="claude">Claude</option>
                <option value="chatgpt">ChatGPT</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : `bg-gradient-to-r ${courseData.color} text-white`}`}>
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button onClick={openAI} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {selectedAI === 'claude' ? 'Claude' : 'ChatGPT'} 열기
            </button>
          </div>
        </div>

        {/* Conversation Practice Prompt */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageCircle className={`w-5 h-5 text-${courseData.textColor}-500`} />
              회화 연습 프롬프트
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
            {lesson.conversationPrompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyConversationPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copiedConv ? 'bg-green-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}>
              {copiedConv ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 회화 프롬프트 복사</>}
            </button>
            <button onClick={openAIConversation} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {selectedAI === 'claude' ? 'Claude' : 'ChatGPT'} 열기
            </button>
          </div>
        </div>

        {/* TTS Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Volume2 className={`w-5 h-5 text-${courseData.textColor}-500`} />
              TTS 리스닝 연습
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">속도:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(e.target.value as 'slow' | 'normal' | 'fast')}
                className="text-sm border rounded-lg px-3 py-1.5"
              >
                <option value="slow">느리게 (0.7x)</option>
                <option value="normal">보통 (1.0x)</option>
                <option value="fast">빠르게 (1.3x)</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            AI가 생성한 회화 대화문을 아래에 붙여넣고 원어민 발음으로 들어보세요!
          </p>

          <textarea
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder="AI가 생성한 영어 대화문을 여기에 붙여넣으세요..."
            className="w-full h-40 p-4 border rounded-xl text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={playTTS}
              disabled={!ttsText.trim()}
              className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
                !ttsText.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isPlaying
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : `bg-gradient-to-r ${courseData.color} text-white`
              }`}
            >
              {isPlaying ? <><Pause className="w-5 h-5" /> 일시정지</> : <><Play className="w-5 h-5" /> 재생</>}
            </button>
            <button
              onClick={clearTTS}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" /> 지우기
            </button>
          </div>
        </div>

        {/* YouTube Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Youtube className="w-5 h-5 text-red-500" />
              YouTube 참고 영상
            </h2>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            오늘 배운 내용과 관련된 YouTube 영상을 찾아보세요!
          </p>

          <button
            onClick={openYouTube}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <Youtube className="w-5 h-5" />
            &quot;{lesson.youtubeKeyword}&quot; 검색
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
          <button onClick={markComplete} className={`w-full bg-gradient-to-r ${courseData.color} hover:opacity-90 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2`}>
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        )}

        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link href={`/course/english/high/${course}/lesson/${day - 1}`} className={`flex items-center gap-2 text-gray-600 hover:text-${courseData.textColor}-600 transition`}>
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < maxDay ? (
            <Link href={`/course/english/high/${course}/lesson/${day + 1}`} className={`flex items-center gap-2 text-gray-600 hover:text-${courseData.textColor}-600 transition`}>
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/english/high/${course}`} className={`flex items-center gap-2 text-${courseData.textColor}-600 font-medium`}>
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
