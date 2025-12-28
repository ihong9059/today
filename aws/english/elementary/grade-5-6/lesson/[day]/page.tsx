'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Brain, ChevronRight, Volume2, Play, Pause, Copy, Check, ChevronLeft, Trash2, ExternalLink, Trophy, Target, Sparkles } from 'lucide-react';

const aiTools = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai', color: 'from-orange-500 to-amber-600', icon: '🧠', description: '자연스러운 설명' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chat.openai.com', color: 'from-emerald-500 to-teal-600', icon: '💬', description: '다양한 예시' },
];

const lessonData: Record<number, {
  title: string; desc: string; emoji: string; funFact: string; challenge: string; badge: string;
  prompts: Array<{ id: number; title: string; emoji: string; learnPrompt: string; listenPrompt: string; tip: string; }>;
}> = {
  1: {
    title: 'be동사 마스터',
    desc: 'am, is, are 완벽 이해',
    emoji: '📗',
    funFact: '💡 알고 있나요? be동사는 영어에서 가장 많이 쓰이는 동사예요! 하루에 수백 번 사용해요.',
    challenge: '🎯 오늘의 도전: "I am happy. You are smart. He is tall." 3번 말해보세요!',
    badge: '🏅 be동사 마스터',
    prompts: [
      {
        id: 1, title: 'am, is, are 구분하기', emoji: '📌',
        learnPrompt: `초등 5-6학년을 위한 be동사 am, is, are 사용법을 가르쳐주세요.

1. 주어에 따른 be동사 선택:
   - I → am
   - You, We, They → are
   - He, She, It → is

2. 각각 10개씩 예문을 만들어주세요
3. 한글 해석도 함께 적어주세요
4. 쉬운 단어로 설명해주세요`,
        listenPrompt: `be동사 연습을 위한 영어 문장을 출력해주세요.

I am a student.
You are my friend.
He is tall.
She is pretty.
It is a cat.
We are happy.
They are students.
I am hungry.
You are smart.
She is kind.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: I는 항상 am! You/We/They는 are! He/She/It은 is!',
      },
      {
        id: 2, title: 'be동사 부정문', emoji: '🚫',
        learnPrompt: `초등 5-6학년을 위한 be동사 부정문을 가르쳐주세요.

be동사 뒤에 not을 붙이면 부정문이 됩니다:
- am not / is not (isn't) / are not (aren't)

다양한 예문과 함께 설명해주세요.
줄임말(isn't, aren't)도 알려주세요.`,
        listenPrompt: `be동사 부정문 연습을 위한 영어 문장을 출력해주세요.

I am not tired.
You are not late.
He is not here.
She is not sad.
It is not big.
We are not ready.
They are not students.
I'm not hungry.
He isn't tall.
They aren't happy.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: am not은 줄여서 "ain\'t"라고도 하지만, 정식 표현은 아니에요!',
      },
      {
        id: 3, title: 'be동사 의문문', emoji: '❓',
        learnPrompt: `초등 5-6학년을 위한 be동사 의문문을 가르쳐주세요.

be동사를 문장 앞으로 보내면 의문문이 됩니다:
- Am I...? / Is he...? / Are you...?

대답하는 방법도 알려주세요:
- Yes, I am. / No, I'm not.
- Yes, he is. / No, he isn't.`,
        listenPrompt: `be동사 의문문 연습을 위한 영어 문장을 출력해주세요.

Are you happy?
Yes, I am.
Is he a student?
No, he isn't.
Are they ready?
Yes, they are.
Is she your sister?
No, she isn't.
Am I late?
No, you aren't.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: 의문문은 be동사가 맨 앞으로 나와요! "Are you...?"',
      },
    ],
  },
  2: {
    title: '일반동사',
    desc: '동작을 나타내는 동사들',
    emoji: '🏃',
    funFact: '💡 알고 있나요? 영어에서 가장 많이 쓰이는 일반동사는 "have", "do", "say"예요!',
    challenge: '🎯 오늘의 도전: 오늘 한 일 5가지를 영어로 말해보세요!',
    badge: '🏅 일반동사 마스터',
    prompts: [
      {
        id: 1, title: '자주 쓰는 동사 20개', emoji: '📝',
        learnPrompt: `초등 5-6학년을 위해 자주 쓰는 일반동사 20개를 가르쳐주세요.

각 동사에 대해:
1. 영어 동사
2. 한글 뜻
3. 예문 1개

go, come, eat, drink, sleep, wake, run, walk, play, study,
read, write, watch, listen, like, love, want, have, make, do

위 동사들을 재미있게 설명해주세요!`,
        listenPrompt: `일반동사 연습을 위한 영어 문장을 출력해주세요.

I go to school.
I come home.
I eat breakfast.
I drink water.
I sleep at night.
I run fast.
I walk slowly.
I play soccer.
I study English.
I read books.
I write letters.
I watch TV.
I listen to music.
I like pizza.
I love my family.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: 동사는 "~하다"라는 동작을 나타내요!',
      },
      {
        id: 2, title: '3인칭 단수 -s', emoji: '👤',
        learnPrompt: `초등 5-6학년을 위한 3인칭 단수 동사 변화를 가르쳐주세요.

He, She, It이 주어일 때 동사에 -s를 붙여요!
- I play → He plays
- I go → She goes
- I watch → It watches (-es)

규칙과 예외를 쉽게 설명해주세요.`,
        listenPrompt: `3인칭 단수 연습을 위한 영어 문장을 출력해주세요.

I play soccer. He plays soccer.
I go to school. She goes to school.
I watch TV. He watches TV.
I study hard. She studies hard.
I like pizza. He likes pizza.
I run fast. She runs fast.
I eat breakfast. He eats breakfast.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: He/She/It + 동사s! "He plays, She goes, It runs"',
      },
      {
        id: 3, title: '일반동사 부정문/의문문', emoji: '🔄',
        learnPrompt: `초등 5-6학년을 위한 일반동사 부정문과 의문문을 가르쳐주세요.

부정문: do/does + not + 동사원형
- I don't like... / He doesn't like...

의문문: Do/Does + 주어 + 동사원형?
- Do you like...? / Does he like...?

다양한 예문으로 설명해주세요.`,
        listenPrompt: `일반동사 부정문/의문문 연습을 위한 영어 문장을 출력해주세요.

I don't like coffee.
She doesn't eat meat.
Do you play soccer?
Yes, I do.
Does he like music?
No, he doesn't.
Do they study English?
Yes, they do.
Does she have a pet?
No, she doesn't.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: do/does 다음에는 항상 동사원형! plays가 아니라 play!',
      },
    ],
  },
  3: {
    title: '현재시제',
    desc: '지금 일어나는 일 표현하기',
    emoji: '⏰',
    funFact: '💡 알고 있나요? 현재시제는 지금 하는 일뿐 아니라, 매일 하는 습관도 표현해요!',
    challenge: '🎯 오늘의 도전: 매일 하는 일과 5가지를 영어로 말해보세요!',
    badge: '🏅 현재시제 마스터',
    prompts: [
      {
        id: 1, title: '매일 하는 일 표현하기', emoji: '🔁',
        learnPrompt: `초등 5-6학년을 위한 현재시제로 습관 표현하기를 가르쳐주세요.

현재시제로 매일/항상 하는 일을 표현해요:
- I wake up at 7. (나는 7시에 일어나)
- I brush my teeth. (나는 이를 닦아)

하루 일과를 영어로 표현하는 방법을 알려주세요.
아침, 낮, 저녁으로 나누어 설명해주세요.`,
        listenPrompt: `현재시제 습관 표현 연습을 위한 영어 문장을 출력해주세요.

I wake up at seven.
I brush my teeth.
I eat breakfast.
I go to school.
I study at school.
I eat lunch.
I come home.
I do my homework.
I watch TV.
I go to bed at ten.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: every day, always, usually와 함께 자주 써요!',
      },
      {
        id: 2, title: '빈도부사', emoji: '📊',
        learnPrompt: `초등 5-6학년을 위한 빈도부사를 가르쳐주세요.

얼마나 자주 하는지 표현하는 단어:
- always (항상, 100%)
- usually (보통, 80%)
- often (자주, 60%)
- sometimes (가끔, 40%)
- never (절대 안, 0%)

빈도부사의 위치와 예문을 알려주세요.`,
        listenPrompt: `빈도부사 연습을 위한 영어 문장을 출력해주세요.

I always brush my teeth.
I usually eat breakfast.
I often play soccer.
I sometimes watch TV.
I never drink coffee.
She always studies hard.
He usually comes early.
They often play together.
We sometimes go swimming.
He never eats vegetables.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: 빈도부사는 동사 앞에! "I always eat" (O) "I eat always" (X)',
      },
      {
        id: 3, title: '시간 표현하기', emoji: '🕐',
        learnPrompt: `초등 5-6학년을 위한 시간 표현을 가르쳐주세요.

1. 시간 읽기: It's + 시간
2. ~에: at + 시간
3. 오전/오후: a.m. / p.m.

정각, 30분, 15분 등 다양한 시간을 읽는 법을 알려주세요.`,
        listenPrompt: `시간 표현 연습을 위한 영어 문장을 출력해주세요.

What time is it?
It's seven o'clock.
It's seven thirty.
It's eight fifteen.
I wake up at seven.
School starts at nine.
I eat lunch at twelve.
I go home at three.
I study at four p.m.
I sleep at ten p.m.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: o\'clock은 정각에만! 7:30은 seven thirty!',
      },
    ],
  },
  4: {
    title: '과거시제 입문',
    desc: '과거에 일어난 일 표현하기',
    emoji: '⏮️',
    funFact: '💡 알고 있나요? go의 과거형 went는 원래 다른 동사에서 왔어요!',
    challenge: '🎯 오늘의 도전: 어제 한 일 5가지를 영어로 말해보세요!',
    badge: '🏅 과거시제 마스터',
    prompts: [
      {
        id: 1, title: '규칙 동사 과거형', emoji: '📏',
        learnPrompt: `초등 5-6학년을 위한 규칙 동사 과거형을 가르쳐주세요.

대부분의 동사는 -ed를 붙여요:
- play → played
- watch → watched
- study → studied (y→ied)

규칙과 발음 팁을 알려주세요.
예문도 많이 만들어주세요.`,
        listenPrompt: `규칙 동사 과거형 연습을 위한 영어 문장을 출력해주세요.

I played soccer yesterday.
I watched TV last night.
I studied English.
I walked to school.
I talked to my friend.
I listened to music.
I cleaned my room.
I cooked dinner.
I finished my homework.
I visited my grandma.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: -ed는 3가지 발음! /t/, /d/, /id/ 중 하나예요.',
      },
      {
        id: 2, title: '불규칙 동사 20개', emoji: '🎲',
        learnPrompt: `초등 5-6학년을 위한 자주 쓰는 불규칙 동사 20개를 가르쳐주세요.

go-went, come-came, eat-ate, drink-drank, see-saw,
have-had, do-did, make-made, take-took, give-gave,
get-got, run-ran, read-read, write-wrote, buy-bought,
think-thought, sleep-slept, wake-woke, say-said, tell-told

각 동사의 현재형과 과거형을 예문과 함께 알려주세요.`,
        listenPrompt: `불규칙 동사 과거형 연습을 위한 영어 문장을 출력해주세요.

I went to school.
I came home early.
I ate pizza.
I drank milk.
I saw a movie.
I had breakfast.
I did my homework.
I made cookies.
I took a picture.
I read a book.
I wrote a letter.
I bought a toy.
I slept well.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: 불규칙 동사는 외워야 해요! "go-went" 여러 번 말해보세요!',
      },
      {
        id: 3, title: '과거시제 부정문/의문문', emoji: '🔄',
        learnPrompt: `초등 5-6학년을 위한 과거시제 부정문과 의문문을 가르쳐주세요.

부정문: didn't + 동사원형
- I didn't go. (went가 아니라 go!)

의문문: Did + 주어 + 동사원형?
- Did you go? → Yes, I did. / No, I didn't.

다양한 예문으로 설명해주세요.`,
        listenPrompt: `과거시제 부정문/의문문 연습을 위한 영어 문장을 출력해주세요.

I didn't go to school.
She didn't eat breakfast.
Did you watch TV?
Yes, I did.
Did he play soccer?
No, he didn't.
Did they come yesterday?
Yes, they did.
I didn't see the movie.
Did you finish your homework?

영어 문장만 출력해주세요.`,
        tip: '💡 팁: did/didn\'t 다음에는 항상 동사원형! went가 아니라 go!',
      },
    ],
  },
  5: {
    title: '의문문과 부정문',
    desc: '질문하고 아니라고 말하기',
    emoji: '❓',
    funFact: '💡 알고 있나요? 영어에서 "What"으로 시작하는 질문이 가장 많아요!',
    challenge: '🎯 오늘의 도전: 친구에게 5가지 질문을 영어로 해보세요!',
    badge: '🏅 의문문 마스터',
    prompts: [
      {
        id: 1, title: 'What 의문문', emoji: '🤔',
        learnPrompt: `초등 5-6학년을 위한 What 의문문을 가르쳐주세요.

What으로 시작하는 다양한 질문:
- What is this? (이것은 뭐야?)
- What do you like? (뭘 좋아해?)
- What time is it? (몇 시야?)
- What color is it? (무슨 색이야?)

질문과 대답 예시를 많이 알려주세요.`,
        listenPrompt: `What 의문문 연습을 위한 영어 문장을 출력해주세요.

What is this?
It's a book.
What do you like?
I like pizza.
What time is it?
It's three o'clock.
What color is it?
It's blue.
What is your name?
My name is Minho.
What do you want?
I want some water.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: What = 무엇, What + 명사 = 무슨/어떤',
      },
      {
        id: 2, title: 'Where, When, Who', emoji: '📍',
        learnPrompt: `초등 5-6학년을 위한 Where, When, Who 의문문을 가르쳐주세요.

Where: 어디
- Where is the book? (책이 어디 있어?)
- Where do you live? (어디 살아?)

When: 언제
- When is your birthday? (생일이 언제야?)

Who: 누구
- Who is she? (그녀는 누구야?)

각각의 예문과 대답을 알려주세요.`,
        listenPrompt: `Where, When, Who 의문문 연습을 위한 영어 문장을 출력해주세요.

Where is the book?
It's on the desk.
Where do you live?
I live in Seoul.
When is your birthday?
It's May fifth.
When do you wake up?
I wake up at seven.
Who is she?
She is my sister.
Who are they?
They are my friends.

영어 문장만 출력해주세요.`,
        tip: '💡 팁: Where=어디, When=언제, Who=누구! WWW로 외워요!',
      },
      {
        id: 3, title: 'How 의문문', emoji: '🔧',
        learnPrompt: `초등 5-6학년을 위한 How 의문문을 가르쳐주세요.

How: 어떻게, 얼마나
- How are you? (어떻게 지내?)
- How old are you? (몇 살이야?)
- How many books? (책이 몇 권?)
- How much is it? (얼마예요?)

다양한 How 표현과 대답을 알려주세요.`,
        listenPrompt: `How 의문문 연습을 위한 영어 문장을 출력해주세요.

How are you?
I'm fine, thank you.
How old are you?
I'm eleven years old.
How many books do you have?
I have five books.
How much is it?
It's ten dollars.
How do you go to school?
I go by bus.
How was your day?
It was great!

영어 문장만 출력해주세요.`,
        tip: '💡 팁: How + 형용사로 다양한 질문을 만들어요!',
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

  useEffect(() => {
    const saved = localStorage.getItem(`english-56-day${day}-completed`);
    if (saved) setCompletedPrompts(JSON.parse(saved));
  }, [day]);

  const toggleComplete = (promptId: number) => {
    const newCompleted = completedPrompts.includes(promptId)
      ? completedPrompts.filter(id => id !== promptId)
      : [...completedPrompts, promptId];
    setCompletedPrompts(newCompleted);
    localStorage.setItem(`english-56-day${day}-completed`, JSON.stringify(newCompleted));
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

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">해당 레슨을 찾을 수 없습니다.</p>
          <Link href="/course/english/elementary/grade-5-6" className="text-blue-600 hover:underline mt-4 inline-block">목록으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const progress = (completedPrompts.length / lesson.prompts.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            <Link href="/course/english/elementary/grade-5-6" className="hover:text-blue-600">5~6학년</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/course/english/elementary/grade-5-6" className="flex items-center gap-1 text-blue-100 hover:text-white">
              <ChevronLeft className="w-4 h-4" /><span className="text-sm">목록으로</span>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"><span className="text-3xl">{lesson.emoji}</span></div>
              <div>
                <div className="text-blue-100 text-sm mb-1">Day {day}</div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-blue-100 mt-1">{lesson.desc}</p>
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
                  <button key={s} onClick={() => setSpeed(s)} className={`px-3 py-1 rounded-full text-sm transition ${speed === s ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {s === 'slow' ? '느리게' : s === 'normal' ? '보통' : '빠르게'}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearTTS} disabled={!ttsText.trim()} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition ${ttsText.trim() ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}><Trash2 className="w-5 h-5" />지우기</button>
              <button onClick={playTTS} disabled={!ttsText.trim()} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${ttsText.trim() ? isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                {isPlaying ? <><Pause className="w-5 h-5" />정지</> : <><Play className="w-5 h-5" />듣기</>}
              </button>
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
                    <button onClick={() => copyPrompt(item.learnPrompt, `learn-${item.id}`)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${copiedId === `learn-${item.id}` ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                      {copiedId === `learn-${item.id}` ? <><Check className="w-4 h-4" />복사됨!</> : <><Copy className="w-4 h-4" />학습용</>}
                    </button>
                    <button onClick={() => copyPrompt(item.listenPrompt, `listen-${item.id}`)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${copiedId === `listen-${item.id}` ? 'bg-green-500 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                      {copiedId === `listen-${item.id}` ? <><Check className="w-4 h-4" />복사됨!</> : <><Volume2 className="w-4 h-4" />듣기용</>}
                    </button>
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
            <Link href={`/course/english/elementary/grade-5-6/lesson/${day - 1}`} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"><ChevronLeft className="w-5 h-5" />Day {day - 1}</Link>
          ) : (
            <Link href="/course/english/elementary/grade-5-6" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"><ChevronLeft className="w-5 h-5" />목록으로</Link>
          )}
          {day < 5 ? (
            <Link href={`/course/english/elementary/grade-5-6/lesson/${day + 1}`} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Day {day + 1}로 이동<ChevronRight className="w-5 h-5" /></Link>
          ) : (
            <Link href="/course/english/elementary/grade-5-6" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">코스 완료! 🎉<ChevronRight className="w-5 h-5" /></Link>
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8 mt-12"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p></div></footer>
    </div>
  );
}
