'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Brain, ChevronRight, Volume2, Play, Pause, Copy, Check, ChevronLeft, Trash2, ExternalLink, Trophy, Target, Sparkles } from 'lucide-react';

const aiTools = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai', color: 'from-orange-500 to-amber-600', icon: '🧠', description: '자연스러운 설명' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com', color: 'from-emerald-500 to-teal-600', icon: '💬', description: '다양한 예시' },
];

const courseInfo: Record<string, { name: string; color: string; bgColor: string }> = {
  'common': { name: '고1 공통', color: 'from-purple-600 to-violet-600', bgColor: 'from-slate-50 to-purple-50' },
  'reading': { name: '독해', color: 'from-blue-600 to-cyan-600', bgColor: 'from-slate-50 to-blue-50' },
  'writing': { name: '작문', color: 'from-emerald-600 to-teal-600', bgColor: 'from-slate-50 to-emerald-50' },
  'suneung': { name: '수능', color: 'from-rose-600 to-pink-600', bgColor: 'from-slate-50 to-rose-50' },
};

const allLessons: Record<string, Record<number, {
  title: string; desc: string; emoji: string; funFact: string; challenge: string; badge: string;
  prompts: Array<{ id: number; title: string; emoji: string; learnPrompt: string; listenPrompt: string; tip: string; }>;
}>> = {
  'common': {
    1: { title: '고급 문법 심화', desc: '시제 일치, 화법 전환', emoji: '📚', funFact: '💡 시제 일치는 주절과 종속절의 시제를 맞추는 규칙이에요!', challenge: '🎯 간접화법으로 5문장을 바꿔보세요!', badge: '🏅 문법 마스터',
      prompts: [
        { id: 1, title: '시제 일치', emoji: '⏰', learnPrompt: `고등학교 1학년을 위한 시제 일치를 가르쳐주세요.\n\n주절이 과거시제일 때 종속절도 과거로:\nI think he is kind. → I thought he was kind.\n\n예외 상황:\n1. 불변의 진리\n2. 역사적 사실\n3. 가정법\n\n다양한 예문과 함께 설명해주세요.`, listenPrompt: `시제 일치 듣기 연습을 위해 영어만 출력해주세요.\n\nI knew that she was a teacher.\nHe said that he had been there.\nI thought the earth was round.\nShe believed he would come.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 불변의 진리는 현재시제 유지!' },
        { id: 2, title: '직접화법 → 간접화법', emoji: '💬', learnPrompt: `고등학교 1학년을 위한 직접화법에서 간접화법 전환을 가르쳐주세요.\n\n직접화법: He said, "I am tired."\n간접화법: He said that he was tired.\n\n바꿔야 할 것:\n1. 인칭 대명사\n2. 시제\n3. 지시대명사/부사 (this→that, here→there, today→that day)\n\n평서문, 의문문, 명령문별로 설명해주세요.`, listenPrompt: `화법 전환 듣기 연습을 위해 영어만 출력해주세요.\n\nHe said that he was tired.\nShe told me that she had been there.\nHe asked me where I lived.\nShe asked if I was happy.\nHe told me to study hard.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 시제, 인칭, 시간/장소 부사 3가지를 바꿔요!' },
        { id: 3, title: '복잡한 시제', emoji: '🔄', learnPrompt: `고등학교 1학년을 위한 복잡한 시제를 가르쳐주세요.\n\n1. 과거완료 진행형: had been ~ing\n2. 미래완료: will have p.p.\n3. 미래완료 진행형: will have been ~ing\n\n각 시제의 의미와 예문을 자세히 설명해주세요.`, listenPrompt: `복잡한 시제 듣기 연습을 위해 영어만 출력해주세요.\n\nI had been waiting for an hour.\nBy next year, I will have graduated.\nShe will have been teaching for 10 years.\nThey had been living there since 2010.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: had been = 과거의 과거부터, will have = 미래의 완료!' },
      ],
    },
    2: { title: '복잡한 문장 구조', desc: '도치, 강조, 생략', emoji: '🔀', funFact: '💡 도치는 강조를 위해 어순을 바꾸는 거예요!', challenge: '🎯 부정어 도치 문장 5개를 만들어보세요!', badge: '🏅 구조 마스터',
      prompts: [
        { id: 1, title: '도치 구문', emoji: '↩️', learnPrompt: `고등학교 1학년을 위한 도치 구문을 가르쳐주세요.\n\n부정어 도치:\nNever have I seen such a thing.\n\n장소부사 도치:\nHere comes the bus.\n\nso/neither 도치:\nI am tired. - So am I.\n\n각 도치 유형별 예문과 규칙을 설명해주세요.`, listenPrompt: `도치 구문 듣기 연습을 위해 영어만 출력해주세요.\n\nNever have I seen such a thing.\nSeldom does he go out.\nHardly had I arrived when it rained.\nHere comes the bus.\nSo am I. Neither do I.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 부정어 + 조동사 + 주어 + 동사!' },
        { id: 2, title: '강조 구문', emoji: '💥', learnPrompt: `고등학교 1학년을 위한 강조 구문을 가르쳐주세요.\n\n1. It is ~ that 강조구문\nIt was Tom that broke the window.\n\n2. do/does/did 강조\nI do love you.\n\n3. the very, what 강조\nThis is the very book I wanted.\n\n각 강조 구문의 예문을 설명해주세요.`, listenPrompt: `강조 구문 듣기 연습을 위해 영어만 출력해주세요.\n\nIt was Tom that broke the window.\nIt is in Seoul that I met her.\nI do love you.\nShe did come yesterday.\nThis is the very book I wanted.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: It is ~ that을 빼도 문장이 성립해야 해요!' },
        { id: 3, title: '생략 구문', emoji: '✂️', learnPrompt: `고등학교 1학년을 위한 생략 구문을 가르쳐주세요.\n\n반복 어구 생략:\nI can swim, but she can't (swim).\n\n접속사 뒤 주어+be동사 생략:\nWhile (I was) walking, I found it.\n\n관계대명사 생략:\nThe book (which) I read was good.\n\n각 생략 유형별 예문을 설명해주세요.`, listenPrompt: `생략 구문 듣기 연습을 위해 영어만 출력해주세요.\n\nI can swim, but she can't.\nWhile walking, I found it.\nThe book I read was good.\nIf possible, come early.\nThough tired, he kept working.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 반복되거나 명확한 것은 생략 가능!' },
      ],
    },
    3: { title: '준동사 심화', desc: '부정사/동명사/분사 완벽 정복', emoji: '📐', funFact: '💡 준동사는 동사의 성질을 가지면서 다른 품사 역할을 해요!', challenge: '🎯 준동사가 포함된 복잡한 문장 5개를 분석해보세요!', badge: '🏅 준동사 마스터',
      prompts: [
        { id: 1, title: 'to부정사 심화', emoji: '🎯', learnPrompt: `고등학교 1학년을 위한 to부정사 심화 학습을 가르쳐주세요.\n\n1. 독립부정사: to be honest, to tell the truth\n2. 원형부정사: 사역/지각동사 + 목적어 + 원형\n3. 완료부정사: to have p.p.\n4. 의미상 주어: for/of + 목적격\n\n각 유형별 자세한 설명과 예문을 알려주세요.`, listenPrompt: `to부정사 심화 듣기 연습을 위해 영어만 출력해주세요.\n\nTo be honest, I don't like it.\nI made him go. I saw him leave.\nHe seems to have been rich.\nIt is easy for me to solve it.\nIt was kind of you to help me.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: seem/appear + to have p.p. = 과거 추측!' },
        { id: 2, title: '동명사 심화', emoji: '🔄', learnPrompt: `고등학교 1학년을 위한 동명사 심화 학습을 가르쳐주세요.\n\n1. 동명사의 의미상 주어: 소유격/목적격 + ~ing\n2. 완료 동명사: having p.p.\n3. 수동 동명사: being p.p.\n4. 동명사 관용 표현: be worth ~ing, feel like ~ing\n\n각 유형별 자세한 설명과 예문을 알려주세요.`, listenPrompt: `동명사 심화 듣기 연습을 위해 영어만 출력해주세요.\n\nI'm proud of his winning.\nI regret having said that.\nThe movie is worth watching.\nI feel like eating pizza.\nHe is busy doing homework.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: having p.p. = 주절보다 먼저 일어난 일!' },
        { id: 3, title: '분사구문 심화', emoji: '📝', learnPrompt: `고등학교 1학년을 위한 분사구문 심화 학습을 가르쳐주세요.\n\n1. 완료 분사구문: Having p.p.\n2. 수동 분사구문: (Being) p.p.\n3. 독립 분사구문: 주어가 다를 때\n4. with + 목적어 + 분사\n\n각 유형별 자세한 설명과 예문을 알려주세요.`, listenPrompt: `분사구문 심화 듣기 연습을 위해 영어만 출력해주세요.\n\nHaving finished the work, I went home.\nWritten in English, the book was hard.\nThe weather being fine, we went out.\nWith the door open, he slept.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: Having p.p. = ~한 후에 (완료)!' },
      ],
    },
    4: { title: '특수 구문', desc: '가정법, 조건문 심화', emoji: '🔮', funFact: '💡 혼합 가정법은 조건절과 귀결절의 시제가 달라요!', challenge: '🎯 혼합 가정법 문장 5개를 만들어보세요!', badge: '🏅 가정법 마스터',
      prompts: [
        { id: 1, title: '혼합 가정법', emoji: '🔀', learnPrompt: `고등학교 1학년을 위한 혼합 가정법을 가르쳐주세요.\n\n조건절은 과거완료, 귀결절은 현재:\nIf I had studied harder, I would be rich now.\n(과거에 열심히 했다면 지금 부자일텐데)\n\n조건절은 과거, 귀결절은 과거완료:\nIf I were rich, I would have bought it.\n(지금 부자라면 그때 샀을텐데)\n\n다양한 혼합 가정법 예문을 알려주세요.`, listenPrompt: `혼합 가정법 듣기 연습을 위해 영어만 출력해주세요.\n\nIf I had studied harder, I would be rich now.\nIf I were taller, I would have been a model.\nIf she had saved money, she wouldn't be poor now.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 조건은 과거, 결과는 현재! 또는 그 반대!' },
        { id: 2, title: 'I wish / as if 심화', emoji: '⭐', learnPrompt: `고등학교 1학년을 위한 I wish, as if 심화를 가르쳐주세요.\n\n1. I wish I could ~: 현재 할 수 없는 능력\n2. I wish I would ~: 미래 바람\n3. as if/though 가정법\n4. It's time + 가정법 과거\n\n각 표현의 예문을 자세히 설명해주세요.`, listenPrompt: `I wish / as if 심화 듣기 연습을 위해 영어만 출력해주세요.\n\nI wish I could fly.\nI wish he would come.\nHe acts as if he were the boss.\nIt's time you went to bed.\nIt's high time we started.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: It\'s time + 과거형 = ~할 시간이다!' },
        { id: 3, title: '조건문 심화', emoji: '❓', learnPrompt: `고등학교 1학년을 위한 조건문 심화를 가르쳐주세요.\n\n1. If절 대용 표현:\n   - Without/But for = If it were not for\n   - Suppose/Supposing = If\n   - What if...?\n\n2. if 생략과 도치:\n   Were I you = If I were you\n   Had I known = If I had known\n\n각 표현의 예문을 설명해주세요.`, listenPrompt: `조건문 심화 듣기 연습을 위해 영어만 출력해주세요.\n\nWithout water, we couldn't live.\nBut for your help, I would have failed.\nSuppose he comes, what will you do?\nWere I you, I would accept it.\nHad I known, I would have helped.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: Were/Had/Should가 문장 앞으로 가면 if 생략!' },
      ],
    },
    5: { title: '구문 분석 실전', desc: '긴 문장 분석 기술', emoji: '🔍', funFact: '💡 긴 문장도 주어, 동사, 목적어를 찾으면 이해돼요!', challenge: '🎯 신문 기사에서 긴 문장 5개를 분석해보세요!', badge: '🏅 구문 분석 마스터',
      prompts: [
        { id: 1, title: '삽입 구문 처리', emoji: '📌', learnPrompt: `고등학교 1학년을 위한 삽입 구문 처리법을 가르쳐주세요.\n\n삽입구는 괄호로 묶고 뒤로 빼서 이해:\nThe man, who is my teacher, is kind.\n→ The man is kind. (+ He is my teacher.)\n\n다양한 삽입 구문(관계절, 동격, 분사구문 등)을 분석하는 방법을 알려주세요.`, listenPrompt: `삽입 구문 듣기 연습을 위해 영어만 출력해주세요.\n\nThe man, who is my teacher, is kind.\nMy brother, a doctor, lives in Seoul.\nThe idea that money is everything is wrong.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 콤마 사이, 괄호 안은 부가 정보!' },
        { id: 2, title: '긴 주어/목적어', emoji: '📏', learnPrompt: `고등학교 1학년을 위한 긴 주어/목적어 분석법을 가르쳐주세요.\n\n긴 주어:\n[What he said at the meeting yesterday] was true.\n→ 주어: What ~ yesterday\n→ 동사: was\n\n긴 목적어:\nI believe [that honesty is the best policy].\n\n긴 주어/목적어를 찾는 연습을 알려주세요.`, listenPrompt: `긴 주어/목적어 듣기 연습을 위해 영어만 출력해주세요.\n\nWhat he said at the meeting was true.\nTo master English requires constant effort.\nI believe that honesty is the best policy.\nWe found it difficult to solve the problem.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 접속사/관계사부터 동사 앞까지가 주어!' },
        { id: 3, title: '중첩 구문', emoji: '🎭', learnPrompt: `고등학교 1학년을 위한 중첩 구문 분석법을 가르쳐주세요.\n\n여러 절이 중첩된 복잡한 문장:\nI think [that the book [which he wrote] is interesting].\n→ 주절: I think\n→ that절: the book is interesting\n→ 관계절: which he wrote\n\n중첩 구문을 층층이 분석하는 방법을 알려주세요.`, listenPrompt: `중첩 구문 듣기 연습을 위해 영어만 출력해주세요.\n\nI think that the book which he wrote is interesting.\nShe said that she knew what I wanted.\nThe man who I thought was honest turned out to be a liar.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 접속사/관계사를 찾아 층층이 분석!' },
      ],
    },
  },
  'reading': {
    1: { title: '주제 찾기', desc: '글의 중심 내용 파악', emoji: '🎯', funFact: '💡 주제는 보통 첫 문장이나 마지막 문장에 있어요!', challenge: '🎯 영어 기사 5개의 주제를 찾아보세요!', badge: '🏅 주제 파악 마스터',
      prompts: [
        { id: 1, title: '주제문 찾기', emoji: '🔍', learnPrompt: `고등학생을 위한 영어 지문 주제문 찾기를 가르쳐주세요.\n\n주제문 위치:\n1. 첫 문장 (연역적 전개)\n2. 마지막 문장 (귀납적 전개)\n3. 가운데 (대조 후 주장)\n\n주제문 찾는 전략과 연습 지문을 제공해주세요.`, listenPrompt: `주제문 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe main idea of this passage is...\nThe author's main point is...\nThis article is mainly about...\nThe purpose of this text is...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 반복되는 단어가 주제와 관련!' },
        { id: 2, title: '주제문과 뒷받침 문장', emoji: '📝', learnPrompt: `고등학생을 위한 주제문과 뒷받침 문장 구별을 가르쳐주세요.\n\n주제문: 글의 핵심 아이디어\n뒷받침 문장: 예시, 근거, 설명\n\n어떻게 구별하는지 전략을 알려주세요.`, listenPrompt: `뒷받침 문장 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nFor example, many people believe...\nThis is because...\nAccording to research...\nIn other words...\nAs a result...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: For example, In fact 뒤는 보통 뒷받침!' },
        { id: 3, title: '주제 선택 요령', emoji: '✅', learnPrompt: `고등학생을 위한 주제 선택지 고르는 요령을 가르쳐주세요.\n\n올바른 선택지:\n- 너무 넓지도 좁지도 않은 것\n- 글 전체를 아우르는 것\n\n오답 유형:\n- 세부 정보만 다룬 것\n- 본문에 없는 내용\n- 너무 일반적인 것\n\n연습 문제와 풀이를 제공해주세요.`, listenPrompt: `주제 관련 어휘 듣기 연습을 위해 영어만 출력해주세요.\n\nthe importance of...\nthe benefits of...\nthe effects of...\nways to...\nreasons why...\n\n영어 표현만 출력해주세요.`, tip: '💡 팁: 너무 넓거나 좁은 것은 오답!' },
      ],
    },
    2: { title: '요지/주장 파악', desc: '필자의 의도 읽기', emoji: '💭', funFact: '💡 필자의 주장은 should, must, need to 같은 표현에서 드러나요!', challenge: '🎯 사설 5개에서 필자의 주장을 찾아보세요!', badge: '🏅 요지 파악 마스터',
      prompts: [
        { id: 1, title: '요지 vs 주제', emoji: '🆚', learnPrompt: `고등학생을 위한 요지와 주제의 차이를 가르쳐주세요.\n\n주제: 글이 다루는 대상 (What)\n예) 환경 오염\n\n요지: 글의 핵심 메시지 (What about it)\n예) 환경 오염을 줄여야 한다\n\n요지 파악 전략과 연습을 제공해주세요.`, listenPrompt: `요지 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe point is that...\nWhat the author suggests is...\nThe author argues that...\nThe lesson is that...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 주제=무엇에 대해, 요지=무엇을 말하고 싶은지!' },
        { id: 2, title: '필자 주장 파악', emoji: '📣', learnPrompt: `고등학생을 위한 필자 주장 파악법을 가르쳐주세요.\n\n주장을 나타내는 표현:\n- should, must, need to\n- It is important/essential to\n- We have to / We should\n\n주장 vs 사실 구별법과 연습을 제공해주세요.`, listenPrompt: `주장 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nWe should protect the environment.\nIt is essential to learn English.\nPeople need to exercise more.\nWe must take action now.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: should, must, need to = 주장의 신호!' },
        { id: 3, title: '함축 의미 파악', emoji: '🔮', learnPrompt: `고등학생을 위한 함축 의미 파악법을 가르쳐주세요.\n\n직접 말하지 않았지만 암시하는 것 찾기:\n1. 문맥에서 추론\n2. 어조/태도 파악\n3. 예시에서 일반화\n\nimply, suggest 문제 풀이 전략을 알려주세요.`, listenPrompt: `함축 의미 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe author implies that...\nIt can be inferred that...\nThe passage suggests that...\nWhat is implied is...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 직접 말한 것은 정답이 아닐 수 있어요!' },
      ],
    },
    3: { title: '빈칸 추론', desc: '문맥에서 답 찾기', emoji: '🧩', funFact: '💡 빈칸 앞뒤 문장에 힌트가 있어요!', challenge: '🎯 빈칸 문제 10개를 풀어보세요!', badge: '🏅 빈칸 추론 마스터',
      prompts: [
        { id: 1, title: '빈칸 추론 기본', emoji: '📌', learnPrompt: `고등학생을 위한 빈칸 추론 기본 전략을 가르쳐주세요.\n\n1. 빈칸 포함 문장 분석\n2. 앞뒤 문맥 확인\n3. 연결어 주목 (however, therefore, for example)\n4. 선택지 대입 검증\n\n기본 빈칸 문제 유형과 풀이를 알려주세요.`, listenPrompt: `빈칸 관련 연결어 듣기 연습을 위해 영어만 출력해주세요.\n\nHowever, on the other hand...\nTherefore, as a result...\nFor example, for instance...\nIn other words, that is...\n\n영어 표현만 출력해주세요.`, tip: '💡 팁: 연결어가 논리 관계를 알려줘요!' },
        { id: 2, title: '긴 빈칸 문제', emoji: '📏', learnPrompt: `고등학생을 위한 긴 빈칸(구/절) 문제 풀이를 가르쳐주세요.\n\n전략:\n1. 빈칸의 문법적 역할 파악\n2. 주제문과의 관계 확인\n3. 예시/상세 설명과 연결\n4. 선택지 구조 분석\n\n긴 빈칸 문제 풀이 연습을 제공해주세요.`, listenPrompt: `긴 빈칸 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nthe ability to adapt to new situations\nwhat makes the difference\nthe way people communicate with each other\nthe reason why many people fail\n\n영어 표현만 출력해주세요.`, tip: '💡 팁: 빈칸이 길면 전체 흐름을 먼저 파악!' },
        { id: 3, title: '어휘 빈칸 문제', emoji: '📚', learnPrompt: `고등학생을 위한 어휘 빈칸 문제 풀이를 가르쳐주세요.\n\n전략:\n1. 문맥에서 긍정/부정 판단\n2. 콜로케이션(어울리는 조합) 확인\n3. 반의어/유의어 관계\n4. 문장 내 힌트 찾기\n\n어휘 빈칸 문제 풀이 연습을 제공해주세요.`, listenPrompt: `어휘 빈칸 관련 동사 듣기 연습을 위해 영어만 출력해주세요.\n\nenhance, improve, boost\nreduce, decrease, diminish\nprevent, avoid, hinder\npromote, encourage, foster\n\n영어 단어만 출력해주세요.`, tip: '💡 팁: 긍정/부정 맥락을 먼저 파악!' },
      ],
    },
    4: { title: '순서/삽입', desc: '글의 논리적 흐름', emoji: '🔢', funFact: '💡 연결어와 대명사가 순서의 힌트예요!', challenge: '🎯 문장 순서 배열 문제 10개를 풀어보세요!', badge: '🏅 순서 마스터',
      prompts: [
        { id: 1, title: '순서 배열', emoji: '📋', learnPrompt: `고등학생을 위한 문장 순서 배열 전략을 가르쳐주세요.\n\n힌트 찾기:\n1. 지시어: this, that, such, these\n2. 연결어: however, therefore, for example\n3. 관사: a/an → the\n4. 대명사: 명사 → he, she, it, they\n\n순서 배열 문제 풀이 연습을 제공해주세요.`, listenPrompt: `순서 관련 연결어 듣기 연습을 위해 영어만 출력해주세요.\n\nFirst, to begin with...\nSecond, in addition...\nFinally, in conclusion...\nAs a result, therefore...\n\n영어 표현만 출력해주세요.`, tip: '💡 팁: a가 먼저, the가 나중! 명사가 먼저, 대명사가 나중!' },
        { id: 2, title: '문장 삽입', emoji: '➕', learnPrompt: `고등학생을 위한 문장 삽입 위치 찾기를 가르쳐주세요.\n\n전략:\n1. 삽입 문장의 지시어 확인\n2. 삽입 문장의 연결어 확인\n3. 앞 문장과의 논리 연결\n4. 뒷 문장과의 논리 연결\n\n문장 삽입 문제 풀이 연습을 제공해주세요.`, listenPrompt: `삽입 관련 연결어 듣기 연습을 위해 영어만 출력해주세요.\n\nHowever, this is not always the case.\nFor example, consider the following.\nIn contrast, the opposite is true.\nIn fact, research shows that...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 삽입 문장의 첫 단어가 힌트!' },
        { id: 3, title: '주어진 글 다음 순서', emoji: '📝', learnPrompt: `고등학생을 위한 '주어진 글 다음에 이어질 순서' 문제를 가르쳐주세요.\n\n전략:\n1. 주어진 글에서 키워드 파악\n2. 각 선택지의 시작 부분 분석\n3. 연결고리 찾기\n4. 전체 흐름 확인\n\n연습 문제를 제공해주세요.`, listenPrompt: `글 순서 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThis led to a significant change.\nSuch behavior can be explained.\nThese findings suggest that...\nThe result was unexpected.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: This, Such, These로 시작하면 앞에 선행사 필요!' },
      ],
    },
    5: { title: '장문 독해', desc: '긴 지문 공략법', emoji: '📖', funFact: '💡 장문도 단락별로 나누면 쉬워져요!', challenge: '🎯 장문 독해 문제 5세트를 풀어보세요!', badge: '🏅 장문 마스터',
      prompts: [
        { id: 1, title: '장문 읽기 전략', emoji: '📑', learnPrompt: `고등학생을 위한 장문 읽기 전략을 가르쳐주세요.\n\n전략:\n1. 문제 먼저 훑어보기\n2. 각 단락 주제문 파악\n3. 키워드 표시하며 읽기\n4. 단락별 요약\n\n장문을 효율적으로 읽는 방법을 알려주세요.`, listenPrompt: `장문 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe first paragraph introduces...\nThe author then discusses...\nIn the following paragraph...\nThe passage concludes with...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 문제를 먼저 보고 찾을 것을 정해요!' },
        { id: 2, title: '세부 정보 찾기', emoji: '🔍', learnPrompt: `고등학생을 위한 장문에서 세부 정보 찾기를 가르쳐주세요.\n\n전략:\n1. 질문 키워드로 위치 찾기\n2. 해당 부분 정밀 읽기\n3. 패러프레이징 확인\n4. 오답 유형 점검\n\n세부 정보 문제 풀이 연습을 제공해주세요.`, listenPrompt: `세부 정보 관련 질문 듣기 연습을 위해 영어만 출력해주세요.\n\nAccording to the passage, what is...\nWhich of the following is true?\nWhat does the author say about...\nThe passage mentions that...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 키워드로 위치를 빠르게 찾아요!' },
        { id: 3, title: '장문 어휘/지칭', emoji: '📚', learnPrompt: `고등학생을 위한 장문 어휘/지칭 문제를 가르쳐주세요.\n\n어휘 문제:\n1. 문맥에서 의미 추론\n2. 긍정/부정 맥락 확인\n\n지칭 문제:\n1. 선행사 찾기\n2. 문맥 확인\n\n어휘/지칭 문제 풀이 연습을 제공해주세요.`, listenPrompt: `지칭 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe word "it" in line 5 refers to...\nWhat does "they" refer to?\nThe phrase "such people" means...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 대명사는 앞에서 가장 가까운 명사를 찾아요!' },
      ],
    },
  },
  'writing': {
    1: { title: '기본 문장 작성', desc: '정확한 문장 만들기', emoji: '✏️', funFact: '💡 좋은 영작의 시작은 정확한 문장이에요!', challenge: '🎯 오늘 있었던 일을 10문장으로 써보세요!', badge: '🏅 문장 작성 마스터',
      prompts: [
        { id: 1, title: '주어-동사 일치', emoji: '🎯', learnPrompt: `고등학생을 위한 영작문에서 주어-동사 일치를 가르쳐주세요.\n\n자주 틀리는 경우:\n1. 주어와 동사 사이에 수식어\n2. There is/are 구문\n3. 집합명사\n4. every, each 주어\n\n올바른 문장 작성 연습을 제공해주세요.`, listenPrompt: `주어-동사 일치 듣기 연습을 위해 영어만 출력해주세요.\n\nThe students in this class are smart.\nThere are many books on the shelf.\nThe team is playing well.\nEvery student has a book.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 수식어를 빼고 주어-동사만 확인!' },
        { id: 2, title: '시제 일관성', emoji: '⏰', learnPrompt: `고등학생을 위한 영작문에서 시제 일관성을 가르쳐주세요.\n\n원칙:\n1. 같은 시간대는 같은 시제\n2. 시간 순서에 따른 시제 변화\n3. 인용문의 시제\n\n시제 일관성 연습을 제공해주세요.`, listenPrompt: `시제 일관성 듣기 연습을 위해 영어만 출력해주세요.\n\nI went to the store and bought some milk.\nShe said that she was tired.\nBy the time I arrived, he had left.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 한 단락 안에서 시제를 통일!' },
        { id: 3, title: '관사 사용', emoji: '📌', learnPrompt: `고등학생을 위한 영작문에서 관사 사용을 가르쳐주세요.\n\n관사 규칙:\n1. a/an: 처음 언급, 불특정\n2. the: 앞서 언급, 특정, 유일\n3. 무관사: 일반적인 개념, 복수\n\n관사 사용 연습을 제공해주세요.`, listenPrompt: `관사 사용 듣기 연습을 위해 영어만 출력해주세요.\n\nI saw a dog. The dog was cute.\nThe sun rises in the east.\nWater is essential for life.\nI love music.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 첫 언급은 a/an, 다시 언급은 the!' },
      ],
    },
    2: { title: '문장 연결', desc: '논리적 흐름 만들기', emoji: '🔗', funFact: '💡 연결어를 잘 쓰면 글이 자연스러워져요!', challenge: '🎯 연결어를 사용해 5개 문장을 연결해보세요!', badge: '🏅 문장 연결 마스터',
      prompts: [
        { id: 1, title: '등위접속사', emoji: '➕', learnPrompt: `고등학생을 위한 영작문에서 등위접속사 사용을 가르쳐주세요.\n\nand, but, or, so, yet, for\n\n1. 병렬 구조 유지\n2. 콤마 사용법\n3. 의미에 맞는 접속사 선택\n\n등위접속사 사용 연습을 제공해주세요.`, listenPrompt: `등위접속사 듣기 연습을 위해 영어만 출력해주세요.\n\nI like coffee, and she likes tea.\nHe studied hard, but he failed.\nStudy hard, or you will fail.\nI was tired, so I went to bed.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 등위접속사 앞에 콤마!' },
        { id: 2, title: '종속접속사', emoji: '🔀', learnPrompt: `고등학생을 위한 영작문에서 종속접속사 사용을 가르쳐주세요.\n\n시간: when, while, before, after, since, until\n이유: because, since, as\n조건: if, unless\n양보: although, though, even though\n\n종속접속사 사용 연습을 제공해주세요.`, listenPrompt: `종속접속사 듣기 연습을 위해 영어만 출력해주세요.\n\nWhen I arrived, she had left.\nBecause it rained, we stayed home.\nIf you study hard, you will pass.\nAlthough he is rich, he is not happy.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 종속절이 앞에 오면 콤마!' },
        { id: 3, title: '연결 부사', emoji: '🔗', learnPrompt: `고등학생을 위한 영작문에서 연결 부사 사용을 가르쳐주세요.\n\n추가: moreover, furthermore, in addition\n대조: however, nevertheless, on the other hand\n결과: therefore, consequently, as a result\n예시: for example, for instance\n\n연결 부사 사용 연습을 제공해주세요.`, listenPrompt: `연결 부사 듣기 연습을 위해 영어만 출력해주세요.\n\nMoreover, this approach has benefits.\nHowever, there are some problems.\nTherefore, we need to act now.\nFor example, consider this case.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 연결 부사 앞에 세미콜론이나 마침표!' },
      ],
    },
    3: { title: '문단 작성', desc: '주제문, 뒷받침 문장', emoji: '📝', funFact: '💡 좋은 문단은 주제문 + 뒷받침 + 마무리로 구성돼요!', challenge: '🎯 하나의 주제로 완성된 문단을 써보세요!', badge: '🏅 문단 작성 마스터',
      prompts: [
        { id: 1, title: '주제문 쓰기', emoji: '🎯', learnPrompt: `고등학생을 위한 영작문에서 주제문 작성을 가르쳐주세요.\n\n좋은 주제문:\n1. 하나의 명확한 아이디어\n2. 뒷받침 가능한 주장\n3. 너무 넓지도 좁지도 않은 범위\n\n주제문 작성 연습을 제공해주세요.`, listenPrompt: `주제문 듣기 연습을 위해 영어만 출력해주세요.\n\nSocial media has changed how we communicate.\nRegular exercise improves both physical and mental health.\nLearning a second language has many benefits.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 주제문은 뒷받침할 수 있는 것으로!' },
        { id: 2, title: '뒷받침 문장', emoji: '📊', learnPrompt: `고등학생을 위한 영작문에서 뒷받침 문장 작성을 가르쳐주세요.\n\n뒷받침 유형:\n1. 예시 (For example...)\n2. 근거/통계 (Research shows...)\n3. 설명 (This means...)\n4. 비교/대조 (On the other hand...)\n\n뒷받침 문장 작성 연습을 제공해주세요.`, listenPrompt: `뒷받침 문장 듣기 연습을 위해 영어만 출력해주세요.\n\nFor example, many students use social media.\nResearch shows that exercise reduces stress.\nThis means that learning is easier.\nOn the other hand, some people disagree.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 다양한 유형의 뒷받침으로 풍부하게!' },
        { id: 3, title: '결론 문장', emoji: '🏁', learnPrompt: `고등학생을 위한 영작문에서 결론 문장 작성을 가르쳐주세요.\n\n결론 문장:\n1. 주제문 재진술 (다른 표현으로)\n2. 요약\n3. 시사점/제안\n\n결론 문장 작성 연습을 제공해주세요.`, listenPrompt: `결론 문장 듣기 연습을 위해 영어만 출력해주세요.\n\nIn conclusion, social media has transformed communication.\nTo sum up, exercise is essential for health.\nTherefore, learning languages is worth the effort.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 결론은 주제문을 다른 말로!' },
      ],
    },
    4: { title: '에세이 구조', desc: '서론, 본론, 결론', emoji: '📖', funFact: '💡 5단락 에세이가 기본 구조예요!', challenge: '🎯 5단락 에세이를 완성해보세요!', badge: '🏅 에세이 마스터',
      prompts: [
        { id: 1, title: '서론 쓰기', emoji: '🚪', learnPrompt: `고등학생을 위한 영작문에서 서론 쓰기를 가르쳐주세요.\n\n서론 구조:\n1. Hook (관심 끌기)\n2. Background (배경 설명)\n3. Thesis (논제문)\n\n서론 작성 연습을 제공해주세요.`, listenPrompt: `서론 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nHave you ever wondered why...\nIn recent years, there has been...\nThis essay will argue that...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: Hook으로 독자의 관심을 끌어요!' },
        { id: 2, title: '본론 쓰기', emoji: '📚', learnPrompt: `고등학생을 위한 영작문에서 본론 쓰기를 가르쳐주세요.\n\n본론 구조 (각 단락):\n1. Topic sentence (소주제문)\n2. Supporting details (뒷받침)\n3. Transition (다음 단락 연결)\n\n본론 단락 작성 연습을 제공해주세요.`, listenPrompt: `본론 전환 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nFirst of all, it is important to...\nSecondly, we should consider...\nFinally, another key point is...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 각 본론 단락에 하나의 핵심 논점!' },
        { id: 3, title: '결론 쓰기', emoji: '🏁', learnPrompt: `고등학생을 위한 영작문에서 결론 쓰기를 가르쳐주세요.\n\n결론 구조:\n1. Restate thesis (논제 재진술)\n2. Summarize main points (요약)\n3. Final thought (마무리 생각)\n\n결론 작성 연습을 제공해주세요.`, listenPrompt: `결론 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nIn conclusion, it is clear that...\nTo summarize, we have seen that...\nLooking ahead, we should...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 새로운 정보는 결론에 넣지 마세요!' },
      ],
    },
    5: { title: '실전 영작문', desc: '다양한 주제 글쓰기', emoji: '🚀', funFact: '💡 많이 쓸수록 영작 실력이 늘어요!', challenge: '🎯 관심 있는 주제로 에세이를 써보세요!', badge: '🏅 영작 마스터',
      prompts: [
        { id: 1, title: '의견 에세이', emoji: '💭', learnPrompt: `고등학생을 위한 의견 에세이 작성을 가르쳐주세요.\n\n주제 예시:\n- 학교 급식에 대한 의견\n- 스마트폰 사용 규제\n- 온라인 수업의 장단점\n\n의견 에세이 작성 연습을 제공해주세요.`, listenPrompt: `의견 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nIn my opinion, schools should...\nI believe that smartphones...\nFrom my perspective, online classes...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 자신의 입장을 명확히!' },
        { id: 2, title: '비교/대조 에세이', emoji: '⚖️', learnPrompt: `고등학생을 위한 비교/대조 에세이 작성을 가르쳐주세요.\n\n주제 예시:\n- 도시 vs 시골 생활\n- 책 vs 영화\n- 과거 vs 현재\n\n비교/대조 에세이 작성 연습을 제공해주세요.`, listenPrompt: `비교/대조 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nWhile city life offers convenience, rural life provides peace.\nSimilarly, both options have advantages.\nIn contrast, the differences are significant.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 비교점과 대조점을 명확히!' },
        { id: 3, title: '문제/해결 에세이', emoji: '🔧', learnPrompt: `고등학생을 위한 문제/해결 에세이 작성을 가르쳐주세요.\n\n주제 예시:\n- 환경 오염 해결책\n- 학교 폭력 예방\n- 청소년 스트레스 관리\n\n문제/해결 에세이 작성 연습을 제공해주세요.`, listenPrompt: `문제/해결 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nOne major problem is...\nTo solve this issue, we should...\nAnother effective solution would be...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 문제를 명확히 정의한 후 해결책 제시!' },
      ],
    },
  },
  'suneung': {
    1: { title: '듣기 평가', desc: '듣기 유형별 전략', emoji: '🎧', funFact: '💡 듣기는 예측이 핵심이에요!', challenge: '🎯 수능 듣기 모의고사를 풀어보세요!', badge: '🏅 듣기 마스터',
      prompts: [
        { id: 1, title: '듣기 유형 분석', emoji: '📊', learnPrompt: `수능을 위한 영어 듣기 유형별 전략을 가르쳐주세요.\n\n주요 유형:\n1. 목적/주제 파악 (1~2번)\n2. 관계/장소 추론 (6~7번)\n3. 할 일/부탁 내용 (8~9번)\n4. 언급/불일치 (12~15번)\n5. 담화 완성 (16~17번)\n\n각 유형별 전략을 알려주세요.`, listenPrompt: `듣기 지시문 듣기 연습을 위해 영어만 출력해주세요.\n\nWhat is the purpose of the talk?\nWho are the speakers?\nWhat will the woman probably do next?\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 문제 미리 읽고 키워드 예측!' },
        { id: 2, title: '숫자/시간 청취', emoji: '🔢', learnPrompt: `수능을 위한 숫자/시간 청취 전략을 가르쳐주세요.\n\n주의할 점:\n1. 가격 계산 (할인, 추가요금)\n2. 시간 변경\n3. 전화번호, 방 번호\n\n숫자 청취 연습을 제공해주세요.`, listenPrompt: `숫자 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe total is twenty-five dollars.\nThe meeting starts at two thirty.\nYour room number is four fifteen.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 마지막에 나오는 숫자가 정답인 경우 많아요!' },
        { id: 3, title: '담화 완성', emoji: '💬', learnPrompt: `수능을 위한 담화 완성 문제 전략을 가르쳐주세요.\n\n전략:\n1. 상황 파악\n2. 화자 관계 확인\n3. 앞 대화 내용 정리\n4. 논리적 응답 예측\n\n담화 완성 연습을 제공해주세요.`, listenPrompt: `담화 완성 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nI'd be happy to help.\nThat sounds like a good idea.\nI'm afraid I can't make it.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 상황에 맞는 자연스러운 응답!' },
      ],
    },
    2: { title: '어법/어휘', desc: '문법, 어휘 문제 공략', emoji: '📚', funFact: '💡 어법은 출제 포인트가 정해져 있어요!', challenge: '🎯 어법 문제 30개를 풀어보세요!', badge: '🏅 어법 마스터',
      prompts: [
        { id: 1, title: '빈출 어법 포인트', emoji: '🎯', learnPrompt: `수능을 위한 빈출 어법 포인트를 가르쳐주세요.\n\n빈출 포인트:\n1. 수일치 (주어-동사)\n2. 준동사 (to부정사/동명사/분사)\n3. 관계사 (who/which/that/what)\n4. 병렬 구조\n5. 시제\n\n각 포인트별 설명과 연습을 제공해주세요.`, listenPrompt: `어법 포인트 듣기 연습을 위해 영어만 출력해주세요.\n\nThe number of students is increasing.\nI enjoy reading books.\nThe book which I read was interesting.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 5가지 빈출 포인트 집중!' },
        { id: 2, title: '어휘 추론', emoji: '📝', learnPrompt: `수능을 위한 어휘 추론 전략을 가르쳐주세요.\n\n전략:\n1. 문맥에서 긍정/부정 판단\n2. 논리적 흐름 파악\n3. 어근/접두사/접미사 활용\n\n어휘 추론 연습을 제공해주세요.`, listenPrompt: `어휘 추론 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe context suggests that...\nBased on the meaning of the prefix...\nConsidering the tone of the passage...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 문맥이 힌트! 긍정인지 부정인지 파악!' },
        { id: 3, title: '어법성 판단', emoji: '✓', learnPrompt: `수능을 위한 어법성 판단(밑줄 어법) 문제 전략을 가르쳐주세요.\n\n접근법:\n1. 각 밑줄 어법 포인트 파악\n2. 앞뒤 문맥에서 근거 찾기\n3. 한 개만 틀린 것 찾기\n\n어법성 판단 연습을 제공해주세요.`, listenPrompt: `어법 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe subject is singular, so the verb should be singular.\nThis is a relative pronoun referring to a person.\nThe parallel structure requires the same form.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 주어-동사, 병렬, 관계사를 먼저 확인!' },
      ],
    },
    3: { title: '빈칸 추론', desc: '논리적 추론 능력', emoji: '🧩', funFact: '💡 빈칸 문제가 수능에서 가장 어려워요!', challenge: '🎯 빈칸 추론 문제 20개를 풀어보세요!', badge: '🏅 빈칸 마스터',
      prompts: [
        { id: 1, title: '빈칸 추론 전략', emoji: '🎯', learnPrompt: `수능을 위한 빈칸 추론 전략을 가르쳐주세요.\n\n전략:\n1. 빈칸 문장 분석\n2. 주제문 파악\n3. 논리적 연결 확인\n4. 선택지 대입 검증\n\n빈칸 추론 연습을 제공해주세요.`, listenPrompt: `빈칸 관련 연결어 듣기 연습을 위해 영어만 출력해주세요.\n\nIn other words, this means...\nHowever, the opposite is true...\nTherefore, we can conclude...\n\n영어 표현만 출력해주세요.`, tip: '💡 팁: 빈칸 앞뒤 문장이 핵심!' },
        { id: 2, title: '함축 의미 빈칸', emoji: '💭', learnPrompt: `수능을 위한 함축 의미 빈칸 문제 전략을 가르쳐주세요.\n\n전략:\n1. 글의 전체 맥락 파악\n2. 필자의 의도 추론\n3. 예시에서 일반화\n4. 비유적 표현 해석\n\n함축 의미 빈칸 연습을 제공해주세요.`, listenPrompt: `함축 의미 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThis implies that...\nWhat the author means is...\nThe underlying message is...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 직접 말한 것보다 암시된 것 찾기!' },
        { id: 3, title: '고난도 빈칸', emoji: '🔥', learnPrompt: `수능을 위한 고난도 빈칸 문제 전략을 가르쳐주세요.\n\n고난도 특징:\n1. 추상적인 주제\n2. 긴 선택지\n3. 함축적 표현\n\n고난도 빈칸 접근법과 연습을 제공해주세요.`, listenPrompt: `고난도 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe paradox lies in the fact that...\nThis challenges the conventional view that...\nContrary to popular belief...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 추상적 주제는 예시로 이해!' },
      ],
    },
    4: { title: '글의 순서/삽입', desc: '응집성 문제 해결', emoji: '🔢', funFact: '💡 지시어와 연결어가 순서의 힌트예요!', challenge: '🎯 순서/삽입 문제 20개를 풀어보세요!', badge: '🏅 순서 마스터',
      prompts: [
        { id: 1, title: '순서 배열 전략', emoji: '📋', learnPrompt: `수능을 위한 글의 순서 배열 전략을 가르쳐주세요.\n\n힌트 찾기:\n1. 관사 변화 (a→the)\n2. 대명사 (명사→대명사)\n3. 지시어 (this, that, such)\n4. 연결어 (however, therefore)\n\n순서 배열 연습을 제공해주세요.`, listenPrompt: `순서 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThis phenomenon can be explained by...\nSuch behavior is common when...\nThese findings suggest that...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: This/Such/These는 앞에 선행사 필요!' },
        { id: 2, title: '문장 삽입 전략', emoji: '➕', learnPrompt: `수능을 위한 문장 삽입 전략을 가르쳐주세요.\n\n전략:\n1. 삽입 문장 분석\n2. 지시어/연결어 확인\n3. 앞뒤 문맥 연결 확인\n4. 논리적 흐름 검증\n\n문장 삽입 연습을 제공해주세요.`, listenPrompt: `삽입 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nFor example, consider the case of...\nIn fact, research has shown that...\nHowever, this is not always true.\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 삽입 문장 첫 단어가 위치의 힌트!' },
        { id: 3, title: '응집성 분석', emoji: '🔗', learnPrompt: `수능을 위한 글의 응집성 분석을 가르쳐주세요.\n\n응집성 장치:\n1. 어휘 연쇄 (반복, 유의어)\n2. 대용 (대명사, 지시어)\n3. 생략과 대치\n4. 접속 표현\n\n응집성 분석 연습을 제공해주세요.`, listenPrompt: `응집성 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe former...the latter...\nThe same applies to...\nAs mentioned earlier...\n\n영어 표현만 출력해주세요.`, tip: '💡 팁: 같은 대상을 다른 표현으로 확인!' },
      ],
    },
    5: { title: '장문 독해/요약', desc: '고난도 문제 정복', emoji: '📚', funFact: '💡 장문도 단락별로 나누면 쉬워져요!', challenge: '🎯 장문 독해 문제 10세트를 풀어보세요!', badge: '🏅 장문 마스터',
      prompts: [
        { id: 1, title: '장문 독해 전략', emoji: '📖', learnPrompt: `수능을 위한 장문 독해 전략을 가르쳐주세요.\n\n전략:\n1. 문제 유형 파악 (제목/주제/요약)\n2. 단락별 핵심 정리\n3. 선택지와 매칭\n4. 세부 정보 위치 기억\n\n장문 독해 연습을 제공해주세요.`, listenPrompt: `장문 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nThe passage is mainly about...\nAccording to the third paragraph...\nThe author's main argument is...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 각 단락 첫 문장이 핵심!' },
        { id: 2, title: '요약문 완성', emoji: '📝', learnPrompt: `수능을 위한 요약문 완성 전략을 가르쳐주세요.\n\n전략:\n1. 글의 핵심 논지 파악\n2. 요약문 구조 분석\n3. 빈칸 문법적 역할 확인\n4. 선택지 대입 검증\n\n요약문 완성 연습을 제공해주세요.`, listenPrompt: `요약 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nIn summary, the passage discusses...\nThe main point is that...\nTo sum up, the author argues...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 요약문은 글 전체를 아우르는 것!' },
        { id: 3, title: '복합 지문', emoji: '📊', learnPrompt: `수능을 위한 복합 지문(도표/그래프) 문제 전략을 가르쳐주세요.\n\n전략:\n1. 도표/그래프 정보 파악\n2. 지문과 비교\n3. 불일치 항목 찾기\n4. 수치 정확히 확인\n\n복합 지문 연습을 제공해주세요.`, listenPrompt: `도표 관련 표현 듣기 연습을 위해 영어만 출력해주세요.\n\nAccording to the graph, the percentage of...\nThe chart shows that...\nCompared to last year, the number has...\n\n영어 문장만 출력해주세요.`, tip: '💡 팁: 수치를 정확히 확인!' },
      ],
    },
  },
};

export default function HighLessonPage() {
  const params = useParams();
  const course = params.course as string;
  const day = parseInt(params.day as string) || 1;
  const courseData = courseInfo[course];
  const lessonsByCourse = allLessons[course];
  const lesson = lessonsByCourse?.[day];

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ttsText, setTtsText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [selectedAI, setSelectedAI] = useState(aiTools[0]);
  const [completedPrompts, setCompletedPrompts] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`english-high-${course}-day${day}-completed`);
    if (saved) setCompletedPrompts(JSON.parse(saved));
  }, [course, day]);

  const toggleComplete = (promptId: number) => {
    const newCompleted = completedPrompts.includes(promptId)
      ? completedPrompts.filter(id => id !== promptId)
      : [...completedPrompts, promptId];
    setCompletedPrompts(newCompleted);
    localStorage.setItem(`english-high-${course}-day${day}-completed`, JSON.stringify(newCompleted));
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

  if (!lesson || !courseData) {
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
    <div className={`min-h-screen bg-gradient-to-br ${courseData.bgColor}`}>
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
            <Link href={`/course/english/high/${course}`} className="hover:text-blue-600">{courseData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${courseData.color} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Link href={`/course/english/high/${course}`} className="flex items-center gap-1 text-white/70 hover:text-white">
              <ChevronLeft className="w-4 h-4" /><span className="text-sm">목록으로</span>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"><span className="text-3xl">{lesson.emoji}</span></div>
              <div>
                <div className="text-white/70 text-sm mb-1">{courseData.name} · Day {day}</div>
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
            <Link href={`/course/english/high/${course}/lesson/${day - 1}`} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"><ChevronLeft className="w-5 h-5" />Day {day - 1}</Link>
          ) : (
            <Link href={`/course/english/high/${course}`} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"><ChevronLeft className="w-5 h-5" />목록으로</Link>
          )}
          {day < 5 ? (
            <Link href={`/course/english/high/${course}/lesson/${day + 1}`} className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${courseData.color} text-white rounded-xl hover:opacity-90 transition`}>Day {day + 1}로 이동<ChevronRight className="w-5 h-5" /></Link>
          ) : (
            <Link href={`/course/english/high/${course}`} className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${courseData.color} text-white rounded-xl hover:opacity-90 transition`}>코스 완료! 🎉<ChevronRight className="w-5 h-5" /></Link>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8 mt-12"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p></div></footer>
    </div>
  );
}
