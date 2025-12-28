'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Brain, ChevronRight, Volume2, Play, Pause, Copy, Check, ChevronLeft, Trash2, ExternalLink, Trophy, Target, Sparkles } from 'lucide-react';

const aiTools = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai', color: 'from-orange-500 to-amber-600', icon: '🧠', description: '자연스러운 설명' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com', color: 'from-emerald-500 to-teal-600', icon: '💬', description: '다양한 예시' },
];

const gradeInfo: Record<string, { name: string; color: string; bgColor: string }> = {
  'grade-7': { name: '중1', color: 'from-indigo-500 to-purple-600', bgColor: 'from-slate-50 to-indigo-50' },
  'grade-8': { name: '중2', color: 'from-blue-600 to-indigo-600', bgColor: 'from-slate-50 to-blue-50' },
  'grade-9': { name: '중3', color: 'from-purple-600 to-pink-600', bgColor: 'from-slate-50 to-purple-50' },
};

const allLessons: Record<string, Record<number, {
  title: string; desc: string; emoji: string; funFact: string; challenge: string; badge: string;
  prompts: Array<{ id: number; title: string; emoji: string; learnPrompt: string; listenPrompt: string; tip: string; }>;
}>> = {
  'grade-7': {
    1: {
      title: '문장의 5형식', desc: '영어 문장 구조의 기초', emoji: '📐',
      funFact: '💡 영어 문장은 딱 5가지 패턴으로 분류할 수 있어요! 이것만 알면 어떤 문장도 분석 가능!',
      challenge: '🎯 오늘 본 문장 5개를 5형식으로 분류해보세요!',
      badge: '🏅 5형식 마스터',
      prompts: [
        { id: 1, title: '1형식, 2형식', emoji: '1️⃣',
          learnPrompt: `중학교 1학년을 위한 문장의 1형식과 2형식을 가르쳐주세요.

1형식: 주어(S) + 동사(V)
- Birds fly. (새가 난다)
- She smiled. (그녀가 웃었다)

2형식: 주어(S) + 동사(V) + 보어(C)
- She is beautiful. (그녀는 아름답다)
- He became a doctor. (그는 의사가 되었다)

각각 10개의 예문과 함께 자세히 설명해주세요.`,
          listenPrompt: `1형식, 2형식 문장 듣기 연습을 위해 영어만 출력해주세요.

Birds fly.
She smiled.
The sun rises.
He runs fast.
She is beautiful.
He became a doctor.
I am happy.
The food smells good.
He looks tired.
She seems nice.

영어 문장만 출력해주세요.`,
          tip: '💡 팁: 1형식은 "누가 ~한다", 2형식은 "누가 ~이다/~해지다"!' },
        { id: 2, title: '3형식, 4형식', emoji: '3️⃣',
          learnPrompt: `중학교 1학년을 위한 문장의 3형식과 4형식을 가르쳐주세요.

3형식: 주어(S) + 동사(V) + 목적어(O)
- I love music. (나는 음악을 사랑해)
- She reads books. (그녀는 책을 읽어)

4형식: 주어(S) + 동사(V) + 간접목적어(IO) + 직접목적어(DO)
- He gave me a gift. (그가 나에게 선물을 줬어)
- She teaches us English. (그녀가 우리에게 영어를 가르쳐)

각각 10개의 예문과 함께 자세히 설명해주세요.`,
          listenPrompt: `3형식, 4형식 문장 듣기 연습을 위해 영어만 출력해주세요.

I love music.
She reads books.
He plays soccer.
We study English.
He gave me a gift.
She teaches us English.
Mom made me breakfast.
He bought her flowers.
I sent him a letter.
She told me a story.

영어 문장만 출력해주세요.`,
          tip: '💡 팁: 3형식은 "누가 무엇을 ~한다", 4형식은 "누가 누구에게 무엇을 ~한다"!' },
        { id: 3, title: '5형식', emoji: '5️⃣',
          learnPrompt: `중학교 1학년을 위한 문장의 5형식을 가르쳐주세요.

5형식: 주어(S) + 동사(V) + 목적어(O) + 목적보어(OC)
- We call him Tom. (우리는 그를 탐이라고 불러)
- She made me happy. (그녀가 나를 행복하게 만들었어)
- I found the book interesting. (나는 그 책이 흥미롭다고 느꼈어)

목적보어 자리에 올 수 있는 것들(명사, 형용사, to부정사 등)을 예문과 함께 설명해주세요.`,
          listenPrompt: `5형식 문장 듣기 연습을 위해 영어만 출력해주세요.

We call him Tom.
She made me happy.
I found the book interesting.
They elected him president.
He keeps his room clean.
The news made her sad.
We consider him smart.
She named her dog Max.
I want you to stay.
He asked me to help.

영어 문장만 출력해주세요.`,
          tip: '💡 팁: 5형식은 "누가 무엇을 ~하게 만든다/생각한다"!' },
      ],
    },
    2: {
      title: '현재/과거/미래 시제', desc: '3가지 기본 시제 마스터', emoji: '⏰',
      funFact: '💡 영어에서 미래시제는 will 말고도 be going to, 현재진행형으로도 표현해요!',
      challenge: '🎯 어제, 오늘, 내일 할 일을 각각 영어로 3문장씩 말해보세요!',
      badge: '🏅 시제 마스터',
      prompts: [
        { id: 1, title: '현재시제 심화', emoji: '📍', learnPrompt: `중학교 1학년을 위한 현재시제 심화 학습을 가르쳐주세요.\n\n현재시제의 다양한 쓰임:\n1. 현재의 상태/습관\n2. 일반적인 사실/진리\n3. 시간표/계획 (미래 의미)\n\n각 용법에 대해 예문 5개씩 알려주세요.`, listenPrompt: `현재시제 심화 듣기 연습을 위해 영어만 출력해주세요.\n\nI go to school every day.\nShe always drinks coffee.\nThe sun rises in the east.\nWater boils at 100 degrees.\nThe train leaves at 9 a.m.\nThe movie starts at 7 tonight.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 시간표나 확정된 계획도 현재시제로!' },
        { id: 2, title: '과거시제 심화', emoji: '⏮️', learnPrompt: `중학교 1학년을 위한 과거시제 심화 학습을 가르쳐주세요.\n\n1. 규칙 동사 과거형 (-ed)\n2. 불규칙 동사 과거형 (50개)\n3. 과거시제 부정문/의문문\n\n자주 쓰이는 불규칙 동사 50개와 예문을 알려주세요.`, listenPrompt: `과거시제 심화 듣기 연습을 위해 영어만 출력해주세요.\n\nI went to school yesterday.\nShe bought a new bag.\nHe ate breakfast at 7.\nWe saw a movie last night.\nThey came home late.\nI did my homework.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 불규칙 동사는 입으로 많이 말해서 외우세요!' },
        { id: 3, title: '미래시제', emoji: '⏭️', learnPrompt: `중학교 1학년을 위한 미래시제를 가르쳐주세요.\n\n미래를 표현하는 3가지 방법:\n1. will + 동사원형\n2. be going to + 동사원형\n3. 현재진행형 (가까운 미래)\n\n각 표현의 차이점과 예문을 알려주세요.`, listenPrompt: `미래시제 듣기 연습을 위해 영어만 출력해주세요.\n\nI will study hard.\nShe will come tomorrow.\nWe are going to travel.\nHe is going to buy a car.\nI'm meeting him tonight.\nThe train is leaving soon.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: will은 그 순간 결정, be going to는 이미 계획된 것!' },
      ],
    },
    3: {
      title: '조동사', desc: 'can, will, may, must 등', emoji: '🎛️',
      funFact: '💡 조동사 뒤에는 항상 동사원형! plays가 아니라 play!',
      challenge: '🎯 오늘 할 수 있는 것 3가지, 해야 하는 것 3가지를 영어로 말해보세요!',
      badge: '🏅 조동사 마스터',
      prompts: [
        { id: 1, title: 'can, could, be able to', emoji: '💪', learnPrompt: `중학교 1학년을 위한 can, could, be able to를 가르쳐주세요.\n\n1. can: 능력, 허가, 가능성\n2. could: can의 과거, 공손한 요청\n3. be able to: ~할 수 있다\n\n각각의 용법과 차이점을 예문과 함께 설명해주세요.`, listenPrompt: `can, could 듣기 연습을 위해 영어만 출력해주세요.\n\nI can swim.\nShe can speak English.\nCan I help you?\nCould you open the door?\nI could run fast when I was young.\nHe will be able to come tomorrow.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: Can I ~?는 허가, Could you ~?는 공손한 요청!' },
        { id: 2, title: 'will, would, shall', emoji: '🔮', learnPrompt: `중학교 1학년을 위한 will, would, shall을 가르쳐주세요.\n\n1. will: 미래, 의지, 습관\n2. would: will의 과거, 공손한 요청, 가정\n3. shall: 제안, 의무 (주로 영국식)\n\n각각의 용법과 예문을 알려주세요.`, listenPrompt: `will, would 듣기 연습을 위해 영어만 출력해주세요.\n\nI will help you.\nShe will be here soon.\nWould you like some coffee?\nI would like to order.\nShall we dance?\nShall I open the window?\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: Would you like ~?는 음식점에서 많이 들어요!' },
        { id: 3, title: 'may, might, must', emoji: '⚖️', learnPrompt: `중학교 1학년을 위한 may, might, must를 가르쳐주세요.\n\n1. may: 허가, 추측 (~일지도)\n2. might: may보다 약한 추측\n3. must: 의무, 강한 추측 (~임에 틀림없다)\n\n각각의 용법과 예문을 알려주세요.\nmust not과 don't have to의 차이도 설명해주세요.`, listenPrompt: `may, must 듣기 연습을 위해 영어만 출력해주세요.\n\nMay I come in?\nShe may be sick.\nIt might rain tomorrow.\nYou must study hard.\nHe must be tired.\nYou must not lie.\nYou don't have to come.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: must not은 "하면 안 된다", don\'t have to는 "안 해도 된다"!' },
      ],
    },
    4: {
      title: '형용사와 부사', desc: '수식어의 역할과 위치', emoji: '✨',
      funFact: '💡 형용사는 명사를, 부사는 동사/형용사/다른 부사를 꾸며요!',
      challenge: '🎯 친구를 형용사 5개로 묘사해보세요!',
      badge: '🏅 수식어 마스터',
      prompts: [
        { id: 1, title: '형용사의 위치와 역할', emoji: '🎨', learnPrompt: `중학교 1학년을 위한 형용사의 위치와 역할을 가르쳐주세요.\n\n1. 명사 앞 (한정적 용법): a beautiful flower\n2. 동사 뒤 (서술적 용법): The flower is beautiful.\n\n감정형용사, 크기형용사, 색깔형용사 등 다양한 형용사를 예문과 함께 알려주세요.`, listenPrompt: `형용사 듣기 연습을 위해 영어만 출력해주세요.\n\nShe is beautiful.\nA tall man is standing.\nThe happy children are playing.\nThis book is interesting.\nI feel tired.\nThe weather is nice.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 형용사 순서: 의견-크기-나이-모양-색깔-출신-재료!' },
        { id: 2, title: '부사의 종류와 위치', emoji: '⚡', learnPrompt: `중학교 1학년을 위한 부사의 종류와 위치를 가르쳐주세요.\n\n1. 방법부사 (how): slowly, carefully, well\n2. 빈도부사 (how often): always, usually, sometimes\n3. 장소부사 (where): here, there, everywhere\n4. 시간부사 (when): now, today, yesterday\n\n각 부사의 위치 규칙과 예문을 알려주세요.`, listenPrompt: `부사 듣기 연습을 위해 영어만 출력해주세요.\n\nShe sings beautifully.\nHe runs fast.\nI always eat breakfast.\nShe usually comes early.\nCome here please.\nI will see you tomorrow.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 빈도부사는 be동사 뒤, 일반동사 앞!' },
        { id: 3, title: '형용사 vs 부사', emoji: '🆚', learnPrompt: `중학교 1학년을 위한 형용사와 부사의 구별을 가르쳐주세요.\n\n헷갈리기 쉬운 경우:\n1. good (형) vs well (부)\n2. fast (형, 부 동일)\n3. hard (형, 부 동일) vs hardly (거의 ~않다)\n\n자주 틀리는 예시와 올바른 표현을 알려주세요.`, listenPrompt: `형용사 vs 부사 듣기 연습을 위해 영어만 출력해주세요.\n\nShe is a good singer.\nShe sings well.\nHe is a fast runner.\nHe runs fast.\nThis is hard work.\nI work hard.\nI hardly know him.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: good은 명사를, well은 동사를 꾸며요!' },
      ],
    },
    5: {
      title: '전치사', desc: 'in, on, at, with 등', emoji: '📍',
      funFact: '💡 영어 전치사는 한국어와 다르게 명사 앞에 와요!',
      challenge: '🎯 방 안의 물건 위치를 전치사로 설명해보세요!',
      badge: '🏅 전치사 마스터',
      prompts: [
        { id: 1, title: '장소 전치사', emoji: '🗺️', learnPrompt: `중학교 1학년을 위한 장소 전치사를 가르쳐주세요.\n\n1. in: 안에 (in the room, in Korea)\n2. on: 위에, 접촉 (on the table, on the wall)\n3. at: 지점 (at the station, at home)\n\n각 전치사의 차이점과 예문을 자세히 알려주세요.`, listenPrompt: `장소 전치사 듣기 연습을 위해 영어만 출력해주세요.\n\nThe cat is in the box.\nThe book is on the table.\nI am at school.\nShe lives in Seoul.\nThe picture is on the wall.\nMeet me at the station.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: in은 공간 안, on은 표면에 붙어있는 것, at은 한 점!' },
        { id: 2, title: '시간 전치사', emoji: '⏰', learnPrompt: `중학교 1학년을 위한 시간 전치사를 가르쳐주세요.\n\n1. at: 시각 (at 7 o'clock, at noon)\n2. on: 요일, 날짜 (on Monday, on May 5th)\n3. in: 월, 계절, 연도 (in May, in summer, in 2024)\n\n각 전치사의 용법과 예문을 알려주세요.`, listenPrompt: `시간 전치사 듣기 연습을 위해 영어만 출력해주세요.\n\nI wake up at seven.\nThe meeting is at noon.\nI have class on Monday.\nMy birthday is on May fifth.\nIt's hot in summer.\nI was born in two thousand ten.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: at(시각) < on(날짜) < in(월/계절/연도) 작은 것부터!' },
        { id: 3, title: '기타 중요 전치사', emoji: '🔗', learnPrompt: `중학교 1학년을 위한 기타 중요 전치사를 가르쳐주세요.\n\n1. with: ~와 함께, ~로\n2. for: ~을 위해, ~동안\n3. by: ~에 의해, ~까지, ~옆에\n4. from: ~로부터\n5. to: ~에게, ~으로\n\n각 전치사의 다양한 의미와 예문을 알려주세요.`, listenPrompt: `기타 전치사 듣기 연습을 위해 영어만 출력해주세요.\n\nI live with my family.\nI write with a pen.\nThis is for you.\nI studied for two hours.\nThe book was written by her.\nI'll be there by five.\nI'm from Korea.\nI gave a gift to her.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 전치사는 문맥에 따라 의미가 달라져요!' },
      ],
    },
  },
  'grade-8': {
    1: { title: '현재완료 시제', desc: 'have/has + 과거분사', emoji: '⏳', funFact: '💡 현재완료는 과거의 일이 현재와 연결될 때 사용해요!', challenge: '🎯 지금까지 가본 곳 5곳을 현재완료로 말해보세요!', badge: '🏅 현재완료 마스터',
      prompts: [
        { id: 1, title: '현재완료의 형태', emoji: '📝', learnPrompt: `중학교 2학년을 위한 현재완료의 형태를 가르쳐주세요.\n\nhave/has + 과거분사(p.p.)\n- I have eaten. (나는 먹었다)\n- She has gone. (그녀는 갔다)\n\n부정문: have/has + not + p.p.\n의문문: Have/Has + 주어 + p.p.?\n\n과거분사 만드는 법과 불규칙 변화를 알려주세요.`, listenPrompt: `현재완료 형태 듣기 연습을 위해 영어만 출력해주세요.\n\nI have finished my homework.\nShe has eaten lunch.\nHave you seen this movie?\nYes, I have.\nNo, I haven't.\nHe has not arrived yet.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: have/has + p.p. 형태를 기억하세요!' },
        { id: 2, title: '현재완료 4가지 용법', emoji: '4️⃣', learnPrompt: `중학교 2학년을 위한 현재완료의 4가지 용법을 가르쳐주세요.\n\n1. 완료: 막 ~했다 (just, already, yet)\n2. 경험: ~해본 적 있다 (ever, never, before)\n3. 계속: ~해왔다 (for, since)\n4. 결과: ~해서 지금 ~하다\n\n각 용법별 예문 5개씩 알려주세요.`, listenPrompt: `현재완료 4용법 듣기 연습을 위해 영어만 출력해주세요.\n\nI have just finished.\nShe has already left.\nHave you ever been to Japan?\nI have never seen snow.\nI have lived here for 5 years.\nI have known him since 2020.\nI have lost my key.\nShe has gone to school.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: just/already=완료, ever/never=경험, for/since=계속!' },
        { id: 3, title: '현재완료 vs 과거시제', emoji: '🆚', learnPrompt: `중학교 2학년을 위한 현재완료와 과거시제의 차이를 가르쳐주세요.\n\n과거시제: 과거의 특정 시점 (yesterday, last week)\n현재완료: 과거~현재 연결 (already, just, ever)\n\n같이 쓸 수 없는 부사:\n- 과거시제: yesterday, ago, last\n- 현재완료: just, already, ever, since\n\n비교 예문을 많이 알려주세요.`, listenPrompt: `현재완료 vs 과거 듣기 연습을 위해 영어만 출력해주세요.\n\nI went there yesterday.\nI have been there before.\nShe ate lunch an hour ago.\nShe has already eaten lunch.\nDid you see him?\nHave you ever seen him?\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: yesterday, ago와 현재완료는 함께 쓸 수 없어요!' },
      ],
    },
    2: { title: 'to부정사', desc: 'to + 동사원형의 활용', emoji: '🎯', funFact: '💡 to부정사는 명사, 형용사, 부사 역할을 모두 할 수 있어요!', challenge: '🎯 오늘 하고 싶은 것 5가지를 to부정사로 말해보세요!', badge: '🏅 to부정사 마스터',
      prompts: [
        { id: 1, title: 'to부정사의 명사적 용법', emoji: '📦', learnPrompt: `중학교 2학년을 위한 to부정사의 명사적 용법을 가르쳐주세요.\n\nto + 동사원형이 명사처럼 쓰이는 경우:\n1. 주어: To read is fun.\n2. 목적어: I want to go.\n3. 보어: My dream is to travel.\n\n각 용법별 예문 5개씩 알려주세요.`, listenPrompt: `to부정사 명사적 용법 듣기 연습을 위해 영어만 출력해주세요.\n\nTo read is fun.\nTo learn English is important.\nI want to go home.\nShe decided to study.\nMy dream is to be a doctor.\nMy goal is to travel the world.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: "~하는 것"으로 해석되면 명사적 용법!' },
        { id: 2, title: 'to부정사의 형용사/부사적 용법', emoji: '✨', learnPrompt: `중학교 2학년을 위한 to부정사의 형용사적, 부사적 용법을 가르쳐주세요.\n\n형용사적 용법 (명사 수식):\n- I have something to eat. (~할)\n- I need a book to read. (~할)\n\n부사적 용법 (목적/감정의 원인):\n- I came to see you. (~하기 위해)\n- I'm glad to meet you. (~해서)\n\n각 용법별 예문 5개씩 알려주세요.`, listenPrompt: `to부정사 형/부사적 용법 듣기 연습을 위해 영어만 출력해주세요.\n\nI have something to eat.\nI need a book to read.\nGive me something to drink.\nI came here to see you.\nI study hard to pass the exam.\nI'm happy to meet you.\nI was sad to hear the news.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: "~할"=형용사적, "~하기 위해/~해서"=부사적!' },
        { id: 3, title: 'to부정사 주요 표현', emoji: '💎', learnPrompt: `중학교 2학년을 위한 to부정사 주요 표현을 가르쳐주세요.\n\n1. It is + 형용사 + to부정사\n   - It is easy to learn.\n2. too ~ to: 너무 ~해서 ...할 수 없다\n   - too tired to study\n3. enough to: ~할 만큼 충분히\n   - old enough to drive\n\n각 표현별 예문 5개씩 알려주세요.`, listenPrompt: `to부정사 주요 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nIt is easy to learn English.\nIt is important to study.\nI'm too tired to study.\nShe is too young to drive.\nHe is old enough to vote.\nShe is smart enough to solve it.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: too~to는 부정의미, enough to는 긍정의미!' },
      ],
    },
    3: { title: '동명사', desc: '동사ing의 명사적 용법', emoji: '🔄', funFact: '💡 동명사와 to부정사! 동사에 따라 의미가 달라지기도 해요!', challenge: '🎯 좋아하는 취미 5가지를 동명사로 말해보세요!', badge: '🏅 동명사 마스터',
      prompts: [
        { id: 1, title: '동명사의 기본', emoji: '📖', learnPrompt: `중학교 2학년을 위한 동명사의 기본을 가르쳐주세요.\n\n동사 + ing = 동명사 (명사 역할)\n1. 주어: Swimming is fun.\n2. 목적어: I enjoy reading.\n3. 보어: My hobby is cooking.\n4. 전치사의 목적어: I'm good at singing.\n\n각 용법별 예문 5개씩 알려주세요.`, listenPrompt: `동명사 기본 듣기 연습을 위해 영어만 출력해주세요.\n\nSwimming is fun.\nReading is my hobby.\nI enjoy reading books.\nI finished doing my homework.\nMy hobby is cooking.\nI'm good at singing.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 동명사는 "~하는 것, ~하기"로 해석!' },
        { id: 2, title: '동명사 vs to부정사', emoji: '🆚', learnPrompt: `중학교 2학년을 위한 동명사와 to부정사의 구별을 가르쳐주세요.\n\n동명사만 목적어로 취하는 동사:\nenjoy, finish, mind, give up, avoid...\n\nto부정사만 목적어로 취하는 동사:\nwant, hope, decide, plan, expect...\n\n둘 다 가능한 동사:\nlike, love, start, begin, hate...\n\n각 경우의 예문을 알려주세요.`, listenPrompt: `동명사 vs to부정사 듣기 연습을 위해 영어만 출력해주세요.\n\nI enjoy swimming.\nI finished reading.\nI want to go.\nI hope to see you.\nI like swimming.\nI like to swim.\nI started learning.\nI started to learn.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: enjoy, finish, mind 뒤에는 동명사!' },
        { id: 3, title: '의미가 달라지는 경우', emoji: '⚠️', learnPrompt: `중학교 2학년을 위한 동명사/to부정사로 의미가 달라지는 경우를 가르쳐주세요.\n\nremember + ing: ~한 것을 기억하다 (과거)\nremember + to: ~할 것을 기억하다 (미래)\n\nforget, stop, try도 마찬가지입니다.\n각 동사의 의미 차이와 예문을 알려주세요.`, listenPrompt: `의미 차이 듣기 연습을 위해 영어만 출력해주세요.\n\nI remember meeting him.\nRemember to call me.\nI forgot locking the door.\nDon't forget to lock the door.\nI stopped smoking.\nI stopped to smoke.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: ing=이미 한 것, to=앞으로 할 것!' },
      ],
    },
    4: { title: '수동태', desc: 'be동사 + 과거분사', emoji: '🔁', funFact: '💡 수동태는 "당하다"! 주어가 행동을 받는 거예요!', challenge: '🎯 교실에 있는 물건 5개를 수동태로 설명해보세요!', badge: '🏅 수동태 마스터',
      prompts: [
        { id: 1, title: '수동태의 형태', emoji: '📐', learnPrompt: `중학교 2학년을 위한 수동태의 형태를 가르쳐주세요.\n\n능동태 → 수동태 전환:\nTom wrote this book.\n→ This book was written by Tom.\n\nbe동사 + 과거분사 (+ by 행위자)\n\n현재, 과거, 미래 수동태를 예문과 함께 알려주세요.`, listenPrompt: `수동태 형태 듣기 연습을 위해 영어만 출력해주세요.\n\nThis book was written by Tom.\nEnglish is spoken worldwide.\nThe window was broken.\nThe letter will be sent tomorrow.\nI was invited to the party.\nThe movie was directed by her.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: be + p.p.를 기억하세요!' },
        { id: 2, title: '시제별 수동태', emoji: '⏰', learnPrompt: `중학교 2학년을 위한 시제별 수동태를 가르쳐주세요.\n\n현재: am/is/are + p.p.\n과거: was/were + p.p.\n미래: will be + p.p.\n현재완료: have/has been + p.p.\n진행형: am/is/are being + p.p.\n\n각 시제별 예문 3개씩 알려주세요.`, listenPrompt: `시제별 수동태 듣기 연습을 위해 영어만 출력해주세요.\n\nEnglish is spoken here.\nThe house was built in 1990.\nThe work will be finished soon.\nThe book has been read by many.\nThe road is being repaired.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: be동사의 시제를 바꾸면 돼요!' },
        { id: 3, title: '4형식, 5형식 수동태', emoji: '🔢', learnPrompt: `중학교 2학년을 위한 4형식, 5형식 수동태를 가르쳐주세요.\n\n4형식 수동태 (2가지 가능):\nHe gave me a book.\n→ I was given a book.\n→ A book was given to me.\n\n5형식 수동태:\nThey call him Tom.\n→ He is called Tom.\n\n예문과 함께 자세히 설명해주세요.`, listenPrompt: `4,5형식 수동태 듣기 연습을 위해 영어만 출력해주세요.\n\nI was given a book.\nA book was given to me.\nShe was told a story.\nHe is called Tom.\nShe was made happy.\nThe door was kept open.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 4형식은 두 가지 수동태가 가능해요!' },
      ],
    },
    5: { title: '비교급과 최상급', desc: '형용사/부사의 비교 표현', emoji: '📊', funFact: '💡 more/most는 긴 단어에, -er/-est는 짧은 단어에!', challenge: '🎯 친구들을 비교급, 최상급으로 비교해보세요!', badge: '🏅 비교 마스터',
      prompts: [
        { id: 1, title: '비교급/최상급 만들기', emoji: '📏', learnPrompt: `중학교 2학년을 위한 비교급/최상급 만들기를 가르쳐주세요.\n\n짧은 단어: -er, -est\ntall → taller → tallest\n\n긴 단어: more, most\nbeautiful → more beautiful → most beautiful\n\n불규칙: good-better-best, bad-worse-worst...\n\n규칙과 불규칙 변화를 예문과 함께 알려주세요.`, listenPrompt: `비교급/최상급 듣기 연습을 위해 영어만 출력해주세요.\n\nTom is taller than me.\nShe is the tallest in class.\nThis is more beautiful.\nThis is the most beautiful.\nHe is better than me.\nShe is the best student.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 1음절은 -er/-est, 3음절 이상은 more/most!' },
        { id: 2, title: '비교급 표현', emoji: '⚖️', learnPrompt: `중학교 2학년을 위한 비교급 표현을 가르쳐주세요.\n\n1. 비교급 + than: ~보다 더\n2. as + 원급 + as: ~만큼\n3. not as + 원급 + as: ~만큼 ~하지 않다\n4. 비교급 and 비교급: 점점 더\n5. the 비교급, the 비교급: ~할수록 더\n\n각 표현별 예문 5개씩 알려주세요.`, listenPrompt: `비교급 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nHe is taller than me.\nShe is as tall as me.\nI'm not as tall as her.\nIt's getting hotter and hotter.\nThe more you study, the smarter you become.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: as~as는 동등비교! "~만큼"' },
        { id: 3, title: '최상급 표현', emoji: '🏆', learnPrompt: `중학교 2학년을 위한 최상급 표현을 가르쳐주세요.\n\n1. the + 최상급 + in/of: 가장 ~한\n   - the tallest in the class\n   - the best of all\n\n2. one of the + 최상급 + 복수명사\n   - one of the biggest cities\n\n3. 비교급으로 최상급 의미\n   - No one is taller than him.\n\n각 표현별 예문 5개씩 알려주세요.`, listenPrompt: `최상급 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nShe is the tallest in the class.\nHe is the smartest of all.\nSeoul is one of the biggest cities.\nNo one is taller than him.\nNothing is more important than health.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 최상급 앞에는 the! in(장소), of(그룹)!' },
      ],
    },
  },
  'grade-9': {
    1: { title: '분사', desc: '현재분사와 과거분사', emoji: '🔀', funFact: '💡 현재분사(-ing)는 "~하는", 과거분사(-ed)는 "~된"!', challenge: '🎯 주변 사물을 분사로 수식해보세요!', badge: '🏅 분사 마스터',
      prompts: [
        { id: 1, title: '현재분사와 과거분사', emoji: '📖', learnPrompt: `중학교 3학년을 위한 현재분사와 과거분사를 가르쳐주세요.\n\n현재분사 (V-ing): ~하는 (능동/진행)\n- a sleeping baby (자고 있는 아기)\n- running water (흐르는 물)\n\n과거분사 (V-ed/p.p.): ~된 (수동/완료)\n- a broken window (깨진 창문)\n- written in English (영어로 쓰인)\n\n각각 10개의 예문을 알려주세요.`, listenPrompt: `현재분사/과거분사 듣기 연습을 위해 영어만 출력해주세요.\n\na sleeping baby\na barking dog\nrunning water\na broken window\nwritten in English\na stolen car\nfallen leaves\nboiled water\n\n영어만 출력해주세요.`, tip: '💡 팁: -ing는 "~하는", -ed는 "~된"!' },
        { id: 2, title: '감정 분사', emoji: '😊', learnPrompt: `중학교 3학년을 위한 감정 분사를 가르쳐주세요.\n\n-ing: 감정을 유발하는 (사물/상황)\n- interesting (흥미로운)\n- exciting (신나게 하는)\n\n-ed: 감정을 느끼는 (사람)\n- interested (흥미를 느끼는)\n- excited (신난)\n\ninteresting/interested, boring/bored, exciting/excited 등의 예문을 알려주세요.`, listenPrompt: `감정 분사 듣기 연습을 위해 영어만 출력해주세요.\n\nThe movie is interesting.\nI am interested in the movie.\nThe game is exciting.\nI am excited about the game.\nThe lecture is boring.\nI am bored.\nThe news is surprising.\nI am surprised.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 사물은 -ing, 사람은 -ed!' },
        { id: 3, title: '분사구문', emoji: '📝', learnPrompt: `중학교 3학년을 위한 분사구문을 가르쳐주세요.\n\n분사구문: 부사절을 분사로 줄인 것\n\n만드는 방법:\n1. 접속사 생략\n2. 주어 생략 (같으면)\n3. 동사를 분사로\n\nWhen I arrived, → Arriving,\nBecause I was tired, → Being tired,\n\n다양한 분사구문 예문을 알려주세요.`, listenPrompt: `분사구문 듣기 연습을 위해 영어만 출력해주세요.\n\nArriving at the station, I called her.\nWalking down the street, I met him.\nNot knowing what to do, I asked for help.\nBeing tired, I went to bed early.\nFinished with work, I went home.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 분사구문 = "~하면서, ~해서, ~할 때"' },
      ],
    },
    2: { title: '관계대명사', desc: 'who, which, that', emoji: '🔗', funFact: '💡 관계대명사는 두 문장을 하나로 연결해요!', challenge: '🎯 친구를 관계대명사로 설명해보세요!', badge: '🏅 관계대명사 마스터',
      prompts: [
        { id: 1, title: '주격 관계대명사', emoji: '👤', learnPrompt: `중학교 3학년을 위한 주격 관계대명사를 가르쳐주세요.\n\n사람: who\n- The man who is standing is my father.\n\n사물/동물: which\n- The book which is on the table is mine.\n\n사람/사물 모두: that\n- The girl that came is my friend.\n\n각 관계대명사별 예문 5개씩 알려주세요.`, listenPrompt: `주격 관계대명사 듣기 연습을 위해 영어만 출력해주세요.\n\nThe man who is standing is my father.\nI have a friend who lives in Seoul.\nThe book which is on the table is mine.\nI saw a dog which was running.\nThe girl that came is my friend.\nThis is the car that I bought.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 사람은 who, 사물은 which, 둘 다 that!' },
        { id: 2, title: '목적격 관계대명사', emoji: '📦', learnPrompt: `중학교 3학년을 위한 목적격 관계대명사를 가르쳐주세요.\n\n사람: who(m)\n- The man whom I met is a doctor.\n\n사물/동물: which\n- The book which I read was interesting.\n\n목적격 관계대명사는 생략 가능!\n- The man I met is a doctor.\n\n각 경우의 예문과 생략 형태를 알려주세요.`, listenPrompt: `목적격 관계대명사 듣기 연습을 위해 영어만 출력해주세요.\n\nThe man whom I met is a doctor.\nThe man I met is a doctor.\nThe book which I read was interesting.\nThe book I read was interesting.\nThis is the movie that I like.\nThis is the movie I like.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 목적격 관계대명사는 생략 가능!' },
        { id: 3, title: '소유격 관계대명사 whose', emoji: '🏠', learnPrompt: `중학교 3학년을 위한 소유격 관계대명사 whose를 가르쳐주세요.\n\nwhose: ~의 (사람, 사물 모두)\n- The girl whose bag is red is my sister.\n- The house whose roof is blue is mine.\n\n= The girl and her bag is red.\n\nwhose의 다양한 예문을 알려주세요.`, listenPrompt: `whose 듣기 연습을 위해 영어만 출력해주세요.\n\nThe girl whose bag is red is my sister.\nI know a man whose son is a doctor.\nThis is the house whose roof is blue.\nI have a friend whose father is a teacher.\nThe boy whose bicycle was stolen is crying.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: whose = ~의! 소유 관계를 나타내요!' },
      ],
    },
    3: { title: '관계부사', desc: 'where, when, why, how', emoji: '📍', funFact: '💡 관계부사 = 전치사 + 관계대명사!', challenge: '🎯 좋아하는 장소, 기억나는 날을 관계부사로 설명해보세요!', badge: '🏅 관계부사 마스터',
      prompts: [
        { id: 1, title: 'where, when', emoji: '🗓️', learnPrompt: `중학교 3학년을 위한 관계부사 where, when을 가르쳐주세요.\n\nwhere: 장소 (= in/at which)\n- This is the place where I was born.\n\nwhen: 시간 (= at/on/in which)\n- I remember the day when we first met.\n\n각각 5개의 예문과 전치사+which 형태도 알려주세요.`, listenPrompt: `where, when 듣기 연습을 위해 영어만 출력해주세요.\n\nThis is the place where I was born.\nI know the restaurant where she works.\nI remember the day when we first met.\nThis is the time when I am happiest.\nDo you know the reason why he left?\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: where=장소, when=시간을 수식!' },
        { id: 2, title: 'why, how', emoji: '❓', learnPrompt: `중학교 3학년을 위한 관계부사 why, how를 가르쳐주세요.\n\nwhy: 이유 (= for which)\n- Tell me the reason why you were late.\n- 선행사 the reason 생략 가능\n\nhow: 방법 (= the way와 함께 쓰지 않음!)\n- This is how I did it. (O)\n- This is the way I did it. (O)\n- This is the way how I did it. (X)\n\n예문과 주의사항을 알려주세요.`, listenPrompt: `why, how 듣기 연습을 위해 영어만 출력해주세요.\n\nTell me the reason why you were late.\nThat's why I love you.\nThis is how I did it.\nThis is the way I solved the problem.\nI don't know why she is angry.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: the way how (X)! 둘 중 하나만!' },
        { id: 3, title: '관계부사 vs 관계대명사', emoji: '🆚', learnPrompt: `중학교 3학년을 위한 관계부사와 관계대명사의 구별을 가르쳐주세요.\n\n같은 의미:\n- the place where I live\n- the place in which I live\n- the place which I live in\n\n하지만 선행사의 역할이 다르면:\n- the place where I visited (X)\n- the place which I visited (O)\n→ visit은 목적어가 필요!\n\n구별 방법과 예문을 알려주세요.`, listenPrompt: `관계부사 vs 관계대명사 듣기 연습을 위해 영어만 출력해주세요.\n\nThis is the city where I was born.\nThis is the city which I visited.\nI remember the day when we met.\nI remember the day which you mentioned.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 뒤 문장이 완전하면 관계부사, 불완전하면 관계대명사!' },
      ],
    },
    4: { title: '가정법', desc: 'If 조건문 완벽 정복', emoji: '🤔', funFact: '💡 가정법 과거는 현재 사실의 반대, 가정법 과거완료는 과거 사실의 반대!', challenge: '🎯 만약 ~라면을 영어로 5문장 말해보세요!', badge: '🏅 가정법 마스터',
      prompts: [
        { id: 1, title: '가정법 과거', emoji: '🔮', learnPrompt: `중학교 3학년을 위한 가정법 과거를 가르쳐주세요.\n\n현재 사실의 반대 가정:\nIf + 주어 + 과거동사, 주어 + would/could + 동사원형\n\nIf I were you, I would study harder.\n(사실: 나는 너가 아니다)\n\nIf I had money, I would buy it.\n(사실: 나는 돈이 없다)\n\n※ be동사는 were 사용\n\n다양한 예문을 알려주세요.`, listenPrompt: `가정법 과거 듣기 연습을 위해 영어만 출력해주세요.\n\nIf I were you, I would study harder.\nIf I had money, I would buy it.\nIf she were here, she would help us.\nIf I knew his number, I would call him.\nIf it weren't raining, we could go out.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 현재 사실의 반대! If + 과거, would + 원형!' },
        { id: 2, title: '가정법 과거완료', emoji: '⏮️', learnPrompt: `중학교 3학년을 위한 가정법 과거완료를 가르쳐주세요.\n\n과거 사실의 반대 가정:\nIf + 주어 + had p.p., 주어 + would have p.p.\n\nIf I had studied harder, I would have passed.\n(사실: 열심히 공부하지 않아서 떨어졌다)\n\nIf she had come, we would have been happy.\n(사실: 그녀가 오지 않았다)\n\n다양한 예문을 알려주세요.`, listenPrompt: `가정법 과거완료 듣기 연습을 위해 영어만 출력해주세요.\n\nIf I had studied harder, I would have passed.\nIf she had come, we would have been happy.\nIf I had known, I would have helped you.\nIf he had left earlier, he wouldn't have missed the train.\nIf it hadn't rained, we would have gone picnic.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 과거 사실의 반대! If + had p.p., would have p.p.!' },
        { id: 3, title: 'I wish / as if 가정법', emoji: '⭐', learnPrompt: `중학교 3학년을 위한 I wish / as if 가정법을 가르쳐주세요.\n\nI wish + 가정법 과거: 현재 소망 (현재 반대)\nI wish I were taller.\n(사실: 키가 작다)\n\nI wish + 가정법 과거완료: 과거 후회\nI wish I had studied harder.\n(사실: 열심히 공부하지 않았다)\n\nas if + 가정법: ~인 것처럼\nHe talks as if he knew everything.\n\n다양한 예문을 알려주세요.`, listenPrompt: `I wish / as if 듣기 연습을 위해 영어만 출력해주세요.\n\nI wish I were taller.\nI wish I had more time.\nI wish I had studied harder.\nI wish I hadn't said that.\nHe talks as if he knew everything.\nShe acts as if she were rich.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: I wish = ~라면 좋을텐데! as if = ~인 것처럼!' },
      ],
    },
    5: { title: '접속사와 복문', desc: '문장 연결의 기술', emoji: '🔗', funFact: '💡 접속사로 문장을 연결하면 글이 더 자연스러워져요!', challenge: '🎯 because, although, if를 사용해 문장 5개를 만들어보세요!', badge: '🏅 복문 마스터',
      prompts: [
        { id: 1, title: '등위접속사', emoji: '➕', learnPrompt: `중학교 3학년을 위한 등위접속사를 가르쳐주세요.\n\nFANBOYS:\nFor (왜냐하면)\nAnd (그리고)\nNor (그리고 ~도 아닌)\nBut (그러나)\nOr (또는)\nYet (그러나)\nSo (그래서)\n\n각 접속사의 용법과 예문 3개씩 알려주세요.`, listenPrompt: `등위접속사 듣기 연습을 위해 영어만 출력해주세요.\n\nI like coffee, and she likes tea.\nI was tired, but I finished the work.\nStudy hard, or you will fail.\nI was hungry, so I ate a sandwich.\nShe is smart, yet she is humble.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: FANBOYS! For-And-Nor-But-Or-Yet-So!' },
        { id: 2, title: '종속접속사 (시간/이유)', emoji: '⏰', learnPrompt: `중학교 3학년을 위한 시간/이유 종속접속사를 가르쳐주세요.\n\n시간:\nwhen (~할 때), while (~하는 동안)\nbefore (~전에), after (~후에)\nuntil (~까지), since (~이후로)\n\n이유:\nbecause (~때문에)\nsince (~이므로)\nas (~이므로)\n\n각 접속사의 예문 3개씩 알려주세요.`, listenPrompt: `시간/이유 종속접속사 듣기 연습을 위해 영어만 출력해주세요.\n\nWhen I arrived, she had left.\nWhile I was sleeping, it rained.\nI'll wait until you come.\nBecause I was tired, I went to bed.\nSince it was late, I took a taxi.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 종속절은 주절 앞, 뒤 모두 가능!' },
        { id: 3, title: '종속접속사 (조건/양보)', emoji: '🔀', learnPrompt: `중학교 3학년을 위한 조건/양보 종속접속사를 가르쳐주세요.\n\n조건:\nif (만약 ~라면)\nunless (만약 ~가 아니라면) = if not\nas long as (~하는 한)\n\n양보:\nalthough/though (~에도 불구하고)\neven though (~에도 불구하고)\nwhile (~인 반면)\n\n각 접속사의 예문 3개씩 알려주세요.`, listenPrompt: `조건/양보 종속접속사 듣기 연습을 위해 영어만 출력해주세요.\n\nIf it rains, we will stay home.\nUnless you hurry, you will be late.\nAlthough it was cold, he went out.\nEven though she is young, she is wise.\nWhile he is rich, he is not happy.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: although = ~에도 불구하고! but과 함께 쓰지 마세요!' },
      ],
    },
  },
};

export default function MiddleLessonPage() {
  const params = useParams();
  const grade = params.grade as string;
  const day = parseInt(params.day as string) || 1;
  const gradeData = gradeInfo[grade];
  const lessonsByGrade = allLessons[grade];
  const lesson = lessonsByGrade?.[day];

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ttsText, setTtsText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [selectedAI, setSelectedAI] = useState(aiTools[0]);
  const [completedPrompts, setCompletedPrompts] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`english-${grade}-day${day}-completed`);
    if (saved) setCompletedPrompts(JSON.parse(saved));
  }, [grade, day]);

  const toggleComplete = (promptId: number) => {
    const newCompleted = completedPrompts.includes(promptId)
      ? completedPrompts.filter(id => id !== promptId)
      : [...completedPrompts, promptId];
    setCompletedPrompts(newCompleted);
    localStorage.setItem(`english-${grade}-day${day}-completed`, JSON.stringify(newCompleted));
    if (newCompleted.length === lesson?.prompts.length && !completedPrompts.includes(promptId)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const copyPrompt = async (prompt: string, id: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSpeedRate = () => { switch (speed) { case 'slow': return 0.7; case 'normal': return 1.0; case 'fast': return 1.3; } };

  const playTTS = () => {
    if (!ttsText.trim()) return;
    if (isPlaying) { window.speechSynthesis.cancel(); setIsPlaying(false); return; }
    const utterance = new SpeechSynthesisUtterance(ttsText);
    utterance.lang = 'en-US'; utterance.rate = getSpeedRate();
    utterance.onend = () => setIsPlaying(false); utterance.onerror = () => setIsPlaying(false);
    utteranceRef.current = utterance; setIsPlaying(true); window.speechSynthesis.speak(utterance);
  };

  const clearTTS = () => { window.speechSynthesis.cancel(); setIsPlaying(false); setTtsText(''); };

  if (!lesson || !gradeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">해당 레슨을 찾을 수 없습니다.</p>
          <Link href="/course/english" className="text-blue-600 hover:underline mt-4 inline-block">영어 코스로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const progress = (completedPrompts.length / lesson.prompts.length) * 100;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradeData.bgColor}`}>
      {showConfetti && <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"><div className="text-6xl animate-bounce">🎉</div></div>}

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
          <div className="flex items-center gap-2 mb-2">
            <Link href={`/course/english/middle/${grade}`} className="flex items-center gap-1 text-white/70 hover:text-white">
              <ChevronLeft className="w-4 h-4" /><span className="text-sm">목록으로</span>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"><span className="text-3xl">{lesson.emoji}</span></div>
              <div>
                <div className="text-white/70 text-sm mb-1">{gradeData.name} · Day {day}</div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-white/70 mt-1">{lesson.desc}</p>
              </div>
            </div>
            <div className="hidden md:block bg-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2"><Trophy className="w-5 h-5" /><span className="font-semibold">진행률</span></div>
              <div className="w-32 h-3 bg-white/30 rounded-full overflow-hidden"><div className="h-full bg-yellow-400 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
              <div className="text-sm mt-1">{completedPrompts.length} / {lesson.prompts.length} 완료</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-start gap-3"><Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" /><div><h3 className="font-semibold text-yellow-800 mb-1">오늘의 재미있는 사실!</h3><p className="text-yellow-700 text-sm">{lesson.funFact}</p></div></div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-start gap-3"><Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" /><div><h3 className="font-semibold text-purple-800 mb-1">도전 과제</h3><p className="text-purple-700 text-sm">{lesson.challenge}</p></div></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"><Volume2 className="w-5 h-5 text-purple-600" /></div>
            <div><h2 className="text-lg font-bold text-gray-900">🎧 영어 듣기 연습</h2><p className="text-sm text-gray-500">듣기용 프롬프트로 생성한 영어를 붙여넣고 원어민 발음으로 들어보세요</p></div>
          </div>
          <textarea value={ttsText} onChange={(e) => setTtsText(e.target.value)} placeholder="AI가 생성한 영어를 여기에 붙여넣으세요..." className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none text-gray-700" />
          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">속도:</span>
              <div className="flex gap-1">
                {(['slow', 'normal', 'fast'] as const).map((s) => (
                  <button key={s} onClick={() => setSpeed(s)} className={`px-3 py-1 rounded-full text-sm transition ${speed === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s === 'slow' ? '느리게' : s === 'normal' ? '보통' : '빠르게'}</button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearTTS} disabled={!ttsText.trim()} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition ${ttsText.trim() ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}><Trash2 className="w-5 h-5" />지우기</button>
              <button onClick={playTTS} disabled={!ttsText.trim()} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${ttsText.trim() ? isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>{isPlaying ? <><Pause className="w-5 h-5" />정지</> : <><Play className="w-5 h-5" />듣기</>}</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🤖 AI 선택</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {aiTools.map((ai) => (
              <button key={ai.id} onClick={() => setSelectedAI(ai)} className={`p-4 rounded-xl border-2 transition-all ${selectedAI.id === ai.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-center gap-3"><span className="text-2xl">{ai.icon}</span><div className="text-left"><div className="font-semibold text-gray-900">{ai.name}</div><div className="text-sm text-gray-500">{ai.description}</div></div></div>
              </button>
            ))}
          </div>
          <a href={selectedAI.url} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${selectedAI.color} hover:opacity-90 transition`}><ExternalLink className="w-5 h-5" />{selectedAI.name} 열기</a>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">📝 학습 프롬프트</h2>
        <div className="space-y-4">
          {lesson.prompts.map((item) => (
            <div key={item.id} className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${completedPrompts.includes(item.id) ? 'ring-2 ring-green-500' : ''}`}>
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleComplete(item.id)} className={`w-8 h-8 rounded-full flex items-center justify-center transition ${completedPrompts.includes(item.id) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 hover:bg-gray-300'}`}><Check className="w-5 h-5" /></button>
                    <span className="text-2xl">{item.emoji}</span>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {completedPrompts.includes(item.id) && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">완료!</span>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => copyPrompt(item.learnPrompt, `learn-${item.id}`)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${copiedId === `learn-${item.id}` ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>{copiedId === `learn-${item.id}` ? <><Check className="w-4 h-4" />복사됨!</> : <><Copy className="w-4 h-4" />학습용</>}</button>
                    <button onClick={() => copyPrompt(item.listenPrompt, `listen-${item.id}`)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${copiedId === `listen-${item.id}` ? 'bg-green-500 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>{copiedId === `listen-${item.id}` ? <><Check className="w-4 h-4" />복사됨!</> : <><Volume2 className="w-4 h-4" />듣기용</>}</button>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 bg-blue-50 border-b border-blue-100"><p className="text-sm text-blue-700">{item.tip}</p></div>
              <div className="p-4 grid md:grid-cols-2 gap-4">
                <div><div className="text-sm font-semibold text-blue-600 mb-2">📘 학습용 프롬프트</div><pre className="whitespace-pre-wrap text-sm text-gray-700 bg-blue-50 p-4 rounded-lg font-mono h-48 overflow-y-auto">{item.learnPrompt}</pre></div>
                <div><div className="text-sm font-semibold text-purple-600 mb-2">🎧 듣기용 프롬프트</div><pre className="whitespace-pre-wrap text-sm text-gray-700 bg-purple-50 p-4 rounded-lg font-mono h-48 overflow-y-auto">{item.listenPrompt}</pre></div>
              </div>
            </div>
          ))}
        </div>

        {completedPrompts.length === lesson.prompts.length && (
          <div className="mt-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-6 text-center border-2 border-yellow-300">
            <div className="text-4xl mb-2">{lesson.badge}</div>
            <h3 className="text-xl font-bold text-yellow-800">축하합니다!</h3>
            <p className="text-yellow-700">Day {day}의 모든 학습을 완료했어요!</p>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {day > 1 ? (
            <Link href={`/course/english/middle/${grade}/lesson/${day - 1}`} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"><ChevronLeft className="w-5 h-5" />Day {day - 1}</Link>
          ) : (
            <Link href={`/course/english/middle/${grade}`} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"><ChevronLeft className="w-5 h-5" />목록으로</Link>
          )}
          {day < 5 ? (
            <Link href={`/course/english/middle/${grade}/lesson/${day + 1}`} className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradeData.color} text-white rounded-xl hover:opacity-90 transition`}>Day {day + 1}로 이동<ChevronRight className="w-5 h-5" /></Link>
          ) : (
            <Link href={`/course/english/middle/${grade}`} className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradeData.color} text-white rounded-xl hover:opacity-90 transition`}>코스 완료! 🎉<ChevronRight className="w-5 h-5" /></Link>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8 mt-12"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p></div></footer>
    </div>
  );
}
