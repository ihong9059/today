'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Brain, ChevronRight, Volume2, Play, Pause, Copy, Check, ChevronLeft, Trash2, ExternalLink, Star, Trophy, Zap, Target, Sparkles } from 'lucide-react';

const aiTools = [
  {
    id: 'claude',
    name: 'Claude',
    url: 'https://claude.ai',
    color: 'from-orange-500 to-amber-600',
    icon: '🧠',
    description: '자연스러운 설명',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    color: 'from-emerald-500 to-teal-600',
    icon: '💬',
    description: '다양한 예시',
  },
];

// 초등 3-4학년 영어 커리큘럼
const lessonData: Record<number, {
  title: string;
  desc: string;
  emoji: string;
  funFact: string;
  challenge: string;
  badge: string;
  prompts: Array<{
    id: number;
    title: string;
    emoji: string;
    learnPrompt: string;
    listenPrompt: string;
    tip: string;
  }>;
}> = {
  1: {
    title: '알파벳과 파닉스',
    desc: '대문자, 소문자, 모음/자음 발음',
    emoji: '🔤',
    funFact: '💡 알고 있나요? 영어 알파벳 26자 중 가장 많이 쓰이는 글자는 "E"예요!',
    challenge: '🎯 오늘의 도전: 알파벳 A부터 Z까지 10초 안에 말해보세요!',
    badge: '🏅 알파벳 마스터',
    prompts: [
      {
        id: 1,
        title: '알파벳 26자 배우기',
        emoji: '🔤',
        learnPrompt: `초등학교 3-4학년 영어 학습자를 위해 알파벳 26자를 가르쳐주세요.

다음 형식으로 만들어주세요:
1. 대문자와 소문자를 함께 보여주세요 (예: A a)
2. 각 알파벳의 발음을 한글로 표기해주세요
3. 해당 알파벳으로 시작하는 쉬운 단어 1개와 뜻을 알려주세요

예시:
A a - 에이 - Apple (사과)
B b - 비 - Ball (공)

26자 모두 알려주세요.`,
        listenPrompt: `알파벳 26자를 영어로만 읽을 수 있도록 출력해주세요.

다음 형식으로 만들어주세요:
- 각 알파벳 대문자, 소문자, 그리고 해당 알파벳으로 시작하는 단어
- 한글 설명 없이 영어만 출력
- 한 줄에 하나씩

예시 출력:
A, a, Apple
B, b, Ball
C, c, Cat

26자 모두 영어로만 출력해주세요.`,
        tip: '💡 팁: 알파벳 노래를 부르면서 외우면 더 쉬워요!',
      },
      {
        id: 2,
        title: '파닉스 - 모음 발음',
        emoji: '🗣️',
        learnPrompt: `초등학교 3-4학년을 위한 파닉스 모음 발음을 가르쳐주세요.

영어 모음 A, E, I, O, U의 발음을 다음 형식으로 설명해주세요:

1. 짧은 모음 소리 (Short Vowel)
   - 각 모음의 짧은 발음과 예시 단어 3개

2. 긴 모음 소리 (Long Vowel)
   - 각 모음의 긴 발음과 예시 단어 3개

예시:
A의 짧은 소리: "애" - cat, hat, bat
A의 긴 소리: "에이" - cake, name, game

모든 모음(A, E, I, O, U)에 대해 알려주세요.`,
        listenPrompt: `파닉스 모음 발음 연습을 위해 영어 단어만 출력해주세요.

A, E, I, O, U 각 모음에 대해:
- 짧은 모음 단어 3개
- 긴 모음 단어 3개

한글 설명 없이 영어 단어만 다음 형식으로 출력:

Short A: cat, hat, bat
Long A: cake, name, game
Short E: bed, red, pen
Long E: see, tree, feet

모든 모음(A, E, I, O, U)에 대해 영어만 출력해주세요.`,
        tip: '💡 팁: 짧은 소리는 빠르게, 긴 소리는 천천히 발음해보세요!',
      },
      {
        id: 3,
        title: '파닉스 - 자음 발음',
        emoji: '📢',
        learnPrompt: `초등학교 3-4학년을 위한 파닉스 자음 발음을 가르쳐주세요.

영어 자음 21개의 기본 발음을 다음 형식으로 설명해주세요:

각 자음에 대해:
1. 자음 글자
2. 발음 방법 (한글로 쉽게)
3. 예시 단어 2개

예시:
B - "ㅂ" 소리, 입술을 붙였다 떼며 - Ball(공), Book(책)
C - "ㅋ" 또는 "ㅅ" 소리 - Cat(고양이), City(도시)

모든 자음(B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z)에 대해 알려주세요.`,
        listenPrompt: `파닉스 자음 발음 연습을 위해 영어만 출력해주세요.

각 자음과 예시 단어 2개를 다음 형식으로:

B: ball, book
C: cat, cup
D: dog, door

한글 설명 없이, 모든 자음(B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z)에 대해 영어만 출력해주세요.`,
        tip: '💡 팁: 거울을 보면서 입 모양을 확인해보세요!',
      },
    ],
  },
  2: {
    title: '기초 인사말',
    desc: '인사하기, 자기소개, 감정 표현',
    emoji: '👋',
    funFact: '💡 알고 있나요? "Hello"는 전화기가 발명된 후에 인사말로 쓰이기 시작했어요!',
    challenge: '🎯 오늘의 도전: 가족에게 영어로 인사해보세요!',
    badge: '🏅 인사 마스터',
    prompts: [
      {
        id: 1,
        title: '기본 인사말',
        emoji: '👋',
        learnPrompt: `초등학교 3-4학년을 위한 기본 영어 인사말을 가르쳐주세요.

다음 상황별 인사말을 알려주세요:
1. 아침/점심/저녁 인사
2. 만났을 때 인사
3. 헤어질 때 인사
4. 안부 묻기와 대답하기

각 표현에 대해:
- 영어 표현
- 한글 발음
- 한글 뜻
- 사용 상황 설명

재미있는 예시와 함께 알려주세요!`,
        listenPrompt: `기본 영어 인사말을 연습할 수 있도록 영어만 출력해주세요.

다음 형식으로:
Good morning!
Good afternoon!
Good evening!
Hello!
Hi!
Goodbye!
Bye!
See you later!
How are you?
I'm fine, thank you.
Nice to meet you.

위의 인사말들을 영어로만 출력해주세요.`,
        tip: '💡 팁: 매일 아침 "Good morning!"으로 하루를 시작해보세요!',
      },
      {
        id: 2,
        title: '자기소개하기',
        emoji: '🙋',
        learnPrompt: `초등학교 3-4학년을 위한 영어 자기소개를 가르쳐주세요.

다음 내용을 포함해서 알려주세요:
1. 이름 말하기 (My name is... / I'm...)
2. 나이 말하기 (I'm ... years old)
3. 사는 곳 말하기 (I live in...)
4. 좋아하는 것 말하기 (I like...)

각 표현에 대해:
- 영어 문장
- 한글 발음
- 한글 뜻
- 빈칸 채우기 연습

예시 자기소개문도 만들어주세요!`,
        listenPrompt: `자기소개 연습을 위한 영어 문장을 출력해주세요.

Hello! My name is Min.
I am nine years old.
I live in Seoul.
I like soccer.
I like pizza.
Nice to meet you!

위와 같은 형식의 자기소개 예문 3개를 영어로만 출력해주세요.`,
        tip: '💡 팁: 자신만의 자기소개를 만들어 거울 앞에서 연습해보세요!',
      },
      {
        id: 3,
        title: '감정 표현하기',
        emoji: '😊',
        learnPrompt: `초등학교 3-4학년을 위한 영어 감정 표현을 가르쳐주세요.

다음 감정들을 영어로 표현하는 방법:
1. 기쁨 (happy, glad, excited)
2. 슬픔 (sad, upset)
3. 화남 (angry, mad)
4. 피곤함 (tired, sleepy)
5. 배고픔/목마름 (hungry, thirsty)
6. 놀람 (surprised, amazed)

각 감정에 대해:
- "I'm + 감정" 형태로 알려주세요
- 한글 발음과 뜻
- 언제 쓰는지 예시 상황`,
        listenPrompt: `감정 표현 연습을 위한 영어를 출력해주세요.

I'm happy!
I'm sad.
I'm angry.
I'm tired.
I'm hungry.
I'm thirsty.
I'm excited!
I'm surprised!
I'm sleepy.
I'm scared.

위의 감정 표현들을 영어로만 출력해주세요.`,
        tip: '💡 팁: 감정에 맞는 표정을 지으면서 말해보세요!',
      },
    ],
  },
  3: {
    title: '숫자와 색깔',
    desc: '숫자 1~20, 색깔 12가지',
    emoji: '🔢',
    funFact: '💡 알고 있나요? 무지개는 7가지 색이지만, 영어로는 보통 6가지로 말해요!',
    challenge: '🎯 오늘의 도전: 집에 있는 물건 5개의 색깔을 영어로 말해보세요!',
    badge: '🏅 숫자 & 색깔 마스터',
    prompts: [
      {
        id: 1,
        title: '숫자 1-10',
        emoji: '🔢',
        learnPrompt: `초등학교 3-4학년을 위한 영어 숫자 1-10을 가르쳐주세요.

각 숫자에 대해:
1. 숫자
2. 영어 스펠링
3. 한글 발음
4. 재미있는 연상 방법이나 팁

그리고 숫자를 활용한 재미있는 표현도 알려주세요:
- 전화번호 말하기
- 나이 말하기
- 개수 세기`,
        listenPrompt: `숫자 1-10 듣기 연습을 위해 영어만 출력해주세요.

One
Two
Three
Four
Five
Six
Seven
Eight
Nine
Ten

그리고 숫자 세기:
One, two, three, four, five, six, seven, eight, nine, ten!

영어로만 출력해주세요.`,
        tip: '💡 팁: 손가락을 접으면서 숫자를 세어보세요!',
      },
      {
        id: 2,
        title: '숫자 11-20',
        emoji: '🔟',
        learnPrompt: `초등학교 3-4학년을 위한 영어 숫자 11-20을 가르쳐주세요.

각 숫자에 대해:
1. 숫자
2. 영어 스펠링
3. 한글 발음
4. 발음 팁 (특히 13-19는 -teen으로 끝나요!)

숫자 규칙도 설명해주세요:
- thirteen, fourteen, fifteen... 의 패턴
- twenty와 12의 특별한 점`,
        listenPrompt: `숫자 11-20 듣기 연습을 위해 영어만 출력해주세요.

Eleven
Twelve
Thirteen
Fourteen
Fifteen
Sixteen
Seventeen
Eighteen
Nineteen
Twenty

영어로만 출력해주세요.`,
        tip: '💡 팁: 13부터는 "teen"이 붙어요. "나는 teen(청소년)이야!"라고 기억하세요!',
      },
      {
        id: 3,
        title: '색깔 12가지',
        emoji: '🎨',
        learnPrompt: `초등학교 3-4학년을 위한 영어 색깔 12가지를 가르쳐주세요.

다음 색깔들을 알려주세요:
빨강, 주황, 노랑, 초록, 파랑, 남색, 보라, 분홍, 하양, 검정, 갈색, 회색

각 색깔에 대해:
1. 영어 이름
2. 한글 발음
3. 그 색깔인 것들 예시 2개

"What color is it?" "It's red." 같은 대화 예시도 알려주세요!`,
        listenPrompt: `색깔 12가지 듣기 연습을 위해 영어만 출력해주세요.

Red
Orange
Yellow
Green
Blue
Navy
Purple
Pink
White
Black
Brown
Gray

그리고 색깔 문장:
The apple is red.
The sky is blue.
The sun is yellow.
The grass is green.

영어로만 출력해주세요.`,
        tip: '💡 팁: 좋아하는 색깔부터 외우면 더 재미있어요!',
      },
    ],
  },
  4: {
    title: '가족과 친구',
    desc: '가족 호칭, 소개하기',
    emoji: '👨‍👩‍👧‍👦',
    funFact: '💡 알고 있나요? 영어에서는 할아버지(grandpa)와 할머니(grandma)를 합쳐서 "grandparents"라고 해요!',
    challenge: '🎯 오늘의 도전: 가족 사진을 보며 영어로 소개해보세요!',
    badge: '🏅 가족 마스터',
    prompts: [
      {
        id: 1,
        title: '가족 호칭',
        emoji: '👨‍👩‍👧‍👦',
        learnPrompt: `초등학교 3-4학년을 위한 영어 가족 호칭을 가르쳐주세요.

다음 가족 구성원들의 영어 표현:
1. 부모님 (아빠, 엄마)
2. 형제자매 (오빠/형, 언니/누나, 남동생, 여동생)
3. 조부모님 (할아버지, 할머니)
4. 기타 (삼촌, 이모/고모, 사촌)

각 호칭에 대해:
- 영어 표현 (정식 + 친근한 표현)
- 한글 발음
- 예문`,
        listenPrompt: `가족 호칭 듣기 연습을 위해 영어만 출력해주세요.

Father, Dad, Daddy
Mother, Mom, Mommy
Brother
Sister
Grandfather, Grandpa
Grandmother, Grandma
Uncle
Aunt
Cousin

This is my family.
This is my dad.
This is my mom.
I love my family.

영어로만 출력해주세요.`,
        tip: '💡 팁: Dad는 아빠, Mom은 엄마! 쉽죠?',
      },
      {
        id: 2,
        title: '가족 소개하기',
        emoji: '🏠',
        learnPrompt: `초등학교 3-4학년을 위한 영어로 가족 소개하기를 가르쳐주세요.

다음 표현들을 알려주세요:
1. "This is my ~" (이 사람은 나의 ~이에요)
2. "I have ~" (나는 ~이 있어요)
3. 가족 수 말하기
4. 가족에 대해 설명하기 (키가 커요, 요리를 잘해요 등)

예시 가족 소개 스크립트도 만들어주세요!`,
        listenPrompt: `가족 소개 듣기 연습을 위해 영어만 출력해주세요.

This is my family.
This is my father. He is tall.
This is my mother. She is kind.
This is my brother. He is funny.
This is my sister. She is smart.
I have four people in my family.
I love my family very much!

영어로만 출력해주세요.`,
        tip: '💡 팁: 가족 사진을 보면서 "This is my..."라고 연습해보세요!',
      },
      {
        id: 3,
        title: '친구 소개하기',
        emoji: '🤝',
        learnPrompt: `초등학교 3-4학년을 위한 영어로 친구 소개하기를 가르쳐주세요.

다음 표현들을 알려주세요:
1. "This is my friend ~" (이 친구는 ~이에요)
2. "My friend is ~" (내 친구는 ~해요)
3. "We like to ~" (우리는 ~하는 것을 좋아해요)
4. 친구를 칭찬하는 표현

친구 소개 대화 예시도 만들어주세요!`,
        listenPrompt: `친구 소개 듣기 연습을 위해 영어만 출력해주세요.

This is my friend.
Her name is Mina.
She is nice.
We are best friends.
We like to play together.
My friend is funny.
My friend is kind.
I like my friend!

영어로만 출력해주세요.`,
        tip: '💡 팁: 실제 친구 이름을 넣어서 연습해보세요!',
      },
    ],
  },
  5: {
    title: '학교와 물건',
    desc: '학용품, 교실 표현',
    emoji: '🎒',
    funFact: '💡 알고 있나요? "School"이라는 단어는 그리스어로 "여가"라는 뜻이었어요!',
    challenge: '🎯 오늘의 도전: 필통 속 물건 5개를 영어로 말해보세요!',
    badge: '🏅 학교 영어 마스터',
    prompts: [
      {
        id: 1,
        title: '학용품 이름',
        emoji: '✏️',
        learnPrompt: `초등학교 3-4학년을 위한 학용품 영어 이름을 가르쳐주세요.

다음 학용품들의 영어 표현:
연필, 지우개, 자, 가위, 풀, 색연필, 크레파스, 필통, 공책, 책, 가방

각 학용품에 대해:
- 영어 이름
- 한글 발음
- "I have a ~" 예문
- 관련 표현 (빌려주기, 빌리기 등)`,
        listenPrompt: `학용품 듣기 연습을 위해 영어만 출력해주세요.

Pencil
Eraser
Ruler
Scissors
Glue
Colored pencils
Crayons
Pencil case
Notebook
Book
Bag

I have a pencil.
I have an eraser.
May I borrow your ruler?
Here you go!

영어로만 출력해주세요.`,
        tip: '💡 팁: 필통을 열고 하나씩 영어로 말해보세요!',
      },
      {
        id: 2,
        title: '교실 영어',
        emoji: '🏫',
        learnPrompt: `초등학교 3-4학년을 위한 교실에서 쓰는 영어를 가르쳐주세요.

다음 내용을 알려주세요:
1. 교실 물건 (책상, 의자, 칠판, 창문, 문 등)
2. 수업 시간 표현 (손 들어, 앉아, 일어나 등)
3. 선생님께 말하기 (질문 있어요, 화장실 가도 돼요? 등)

각 표현에 대해:
- 영어 표현
- 한글 발음
- 사용 상황`,
        listenPrompt: `교실 영어 듣기 연습을 위해 영어만 출력해주세요.

Desk
Chair
Blackboard
Window
Door
Teacher
Student

Raise your hand!
Sit down, please.
Stand up, please.
Open your book.
Close your book.
Be quiet, please.
May I go to the bathroom?
I have a question.

영어로만 출력해주세요.`,
        tip: '💡 팁: 수업 시간에 선생님이 하시는 영어를 잘 들어보세요!',
      },
      {
        id: 3,
        title: '물건 묻고 답하기',
        emoji: '❓',
        learnPrompt: `초등학교 3-4학년을 위한 물건 묻고 답하기를 가르쳐주세요.

다음 표현들을 알려주세요:
1. "What is this?" - "It is a ~"
2. "What is that?" - "That is a ~"
3. "Is this a ~?" - "Yes, it is. / No, it isn't."
4. "Do you have a ~?" - "Yes, I do. / No, I don't."

재미있는 대화 예시도 만들어주세요!`,
        listenPrompt: `물건 묻고 답하기 듣기 연습을 위해 영어만 출력해주세요.

What is this?
It is a pencil.
What is that?
That is a book.
Is this a pen?
Yes, it is.
No, it isn't. It's a pencil.
Do you have an eraser?
Yes, I do.
No, I don't.

영어로만 출력해주세요.`,
        tip: '💡 팁: 물건을 가리키면서 "What is this?"라고 물어보는 게임을 해보세요!',
      },
    ],
  },
};

export default function LessonPage() {
  const params = useParams();
  const day = parseInt(params.day as string) || 1;
  const lesson = lessonData[day];

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ttsText, setTtsText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [selectedAI, setSelectedAI] = useState(aiTools[0]);
  const [completedPrompts, setCompletedPrompts] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // 로컬 스토리지에서 완료 상태 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(`english-34-day${day}-completed`);
    if (saved) {
      setCompletedPrompts(JSON.parse(saved));
    }
  }, [day]);

  const toggleComplete = (promptId: number) => {
    const newCompleted = completedPrompts.includes(promptId)
      ? completedPrompts.filter(id => id !== promptId)
      : [...completedPrompts, promptId];

    setCompletedPrompts(newCompleted);
    localStorage.setItem(`english-34-day${day}-completed`, JSON.stringify(newCompleted));

    // 모든 프롬프트 완료시 축하 효과
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

  const stopTTS = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const clearTTS = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setTtsText('');
  };

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">해당 레슨을 찾을 수 없습니다.</p>
          <Link href="/course/english/elementary/grade-3-4" className="text-blue-600 hover:underline mt-4 inline-block">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const progress = (completedPrompts.length / lesson.prompts.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* 축하 효과 */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="absolute text-4xl animate-ping">⭐</div>
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
            <Link href="/course/english" className="hover:text-blue-600">영어 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/course/english/elementary/grade-3-4" className="hover:text-blue-600">3~4학년</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      {/* 히어로 */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/course/english/elementary/grade-3-4" className="flex items-center gap-1 text-green-100 hover:text-white">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">목록으로</span>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">{lesson.emoji}</span>
              </div>
              <div>
                <div className="text-green-100 text-sm mb-1">Day {day}</div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-green-100 mt-1">{lesson.desc}</p>
              </div>
            </div>
            {/* 진행 상황 */}
            <div className="hidden md:block bg-white/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">진행률</span>
              </div>
              <div className="w-32 h-3 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm mt-1">{completedPrompts.length} / {lesson.prompts.length} 완료</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 재미있는 정보 & 도전 과제 */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">오늘의 재미있는 사실!</h3>
                <p className="text-yellow-700 text-sm">{lesson.funFact}</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-purple-800 mb-1">도전 과제</h3>
                <p className="text-purple-700 text-sm">{lesson.challenge}</p>
              </div>
            </div>
          </div>
        </div>

        {/* TTS 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">🎧 영어 듣기 연습</h2>
              <p className="text-sm text-gray-500">듣기용 프롬프트로 생성한 영어를 붙여넣고 원어민 발음으로 들어보세요</p>
            </div>
          </div>

          <textarea
            value={ttsText}
            onChange={(e) => setTtsText(e.target.value)}
            placeholder="AI가 생성한 영어를 여기에 붙여넣으세요..."
            className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none text-gray-700"
          />

          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">속도:</span>
              <div className="flex gap-1">
                {(['slow', 'normal', 'fast'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      speed === s
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
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
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition ${
                  ttsText.trim()
                    ? 'bg-gray-500 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Trash2 className="w-5 h-5" />
                지우기
              </button>
              <button
                onClick={isPlaying ? stopTTS : playTTS}
                disabled={!ttsText.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                  ttsText.trim()
                    ? isPlaying
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    정지
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    듣기
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* AI 선택 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">🤖 AI 선택</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {aiTools.map((ai) => (
              <button
                key={ai.id}
                onClick={() => setSelectedAI(ai)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedAI.id === ai.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ai.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{ai.name}</div>
                    <div className="text-sm text-gray-500">{ai.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <a
            href={selectedAI.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r ${selectedAI.color} hover:opacity-90 transition`}
          >
            <ExternalLink className="w-5 h-5" />
            {selectedAI.name} 열기
          </a>
        </div>

        {/* 프롬프트 목록 */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">📝 학습 프롬프트</h2>
        <p className="text-gray-600 mb-6">
          <strong>학습용</strong>: 한글 설명과 함께 배우기 &nbsp;|&nbsp;
          <strong>듣기용</strong>: 영어만 출력 (TTS용)
        </p>

        <div className="space-y-4">
          {lesson.prompts.map((item) => (
            <div key={item.id} className={`bg-white rounded-xl shadow-md overflow-hidden transition-all ${
              completedPrompts.includes(item.id) ? 'ring-2 ring-green-500' : ''
            }`}>
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleComplete(item.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                        completedPrompts.includes(item.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                      }`}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <span className="text-2xl">{item.emoji}</span>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {completedPrompts.includes(item.id) && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">완료!</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyPrompt(item.learnPrompt, `learn-${item.id}`)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                        copiedId === `learn-${item.id}`
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {copiedId === `learn-${item.id}` ? (
                        <>
                          <Check className="w-4 h-4" />
                          복사됨!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          학습용
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => copyPrompt(item.listenPrompt, `listen-${item.id}`)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                        copiedId === `listen-${item.id}`
                          ? 'bg-green-500 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {copiedId === `listen-${item.id}` ? (
                        <>
                          <Check className="w-4 h-4" />
                          복사됨!
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" />
                          듣기용
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* 팁 */}
              <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
                <p className="text-sm text-blue-700">{item.tip}</p>
              </div>

              <div className="p-4 grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">📘 학습용 프롬프트</div>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-blue-50 p-4 rounded-lg font-mono h-48 overflow-y-auto">
                    {item.learnPrompt}
                  </pre>
                </div>
                <div>
                  <div className="text-sm font-semibold text-purple-600 mb-2">🎧 듣기용 프롬프트</div>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-purple-50 p-4 rounded-lg font-mono h-48 overflow-y-auto">
                    {item.listenPrompt}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 배지 획득 */}
        {completedPrompts.length === lesson.prompts.length && (
          <div className="mt-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-6 text-center border-2 border-yellow-300">
            <div className="text-4xl mb-2">{lesson.badge}</div>
            <h3 className="text-xl font-bold text-yellow-800">축하합니다!</h3>
            <p className="text-yellow-700">Day {day}의 모든 학습을 완료했어요!</p>
          </div>
        )}

        {/* 학습 방법 안내 */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">💡 학습 방법</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-3">📘 학습하기</h4>
              <ol className="text-sm text-gray-700 space-y-2">
                <li>1. <strong>학습용</strong> 버튼 클릭</li>
                <li>2. AI에 붙여넣기</li>
                <li>3. 한글 설명을 읽으며 학습</li>
                <li>4. 완료하면 ✓ 체크!</li>
              </ol>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-3">🎧 듣기 연습</h4>
              <ol className="text-sm text-gray-700 space-y-2">
                <li>1. <strong>듣기용</strong> 버튼 클릭</li>
                <li>2. AI에 붙여넣기</li>
                <li>3. AI 응답을 듣기 박스에 붙여넣기</li>
                <li>4. <strong>듣기</strong> 버튼으로 발음 듣기</li>
              </ol>
            </div>
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="mt-8 flex justify-between">
          {day > 1 ? (
            <Link
              href={`/course/english/elementary/grade-3-4/lesson/${day - 1}`}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              Day {day - 1}
            </Link>
          ) : (
            <Link
              href="/course/english/elementary/grade-3-4"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5" />
              목록으로
            </Link>
          )}
          {day < 5 ? (
            <Link
              href={`/course/english/elementary/grade-3-4/lesson/${day + 1}`}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Day {day + 1}로 이동
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href="/course/english/elementary/grade-3-4"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              코스 완료! 🎉
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
