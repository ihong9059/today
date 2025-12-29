'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star, Volume2, Play, Pause, Trash2, Youtube, ExternalLink, MessageCircle } from 'lucide-react';

const lessonData: { [key: number]: {
  title: string;
  desc: string;
  prompt: string;
  conversationPrompt: string;
  funFact: string;
  challenge: string;
  youtubeKeyword: string;
} } = {
  1: {
    title: '알파벳과 파닉스',
    desc: '대문자, 소문자, 모음/자음 발음',
    prompt: `초등학교 3-4학년인데 알파벳과 파닉스에 대해 알려주세요.

1. 왜 알파벳과 파닉스를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (알파벳 26자, 대문자/소문자, 모음 발음, 자음 발음 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "기초 인사말"입니다)`,
    conversationPrompt: `초등학교 3-4학년이 알파벳과 파닉스를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 선생님과 학생의 대화 형식
- 20문장 이상
- 알파벳 발음, 단어 스펠링을 묻고 답하는 내용
- 영어만 출력 (한글 번역 없이)
- 쉽고 자연스러운 표현 사용

예시 주제:
- 이름 스펠링 묻기
- 알파벳 발음 연습
- 간단한 단어 읽기

형식:
Teacher: ...
Student: ...`,
    funFact: '💡 재미있는 사실: 영어 알파벳 26자 중 가장 많이 쓰이는 글자는 "E"예요!',
    challenge: '🎯 도전 과제: 알파벳 A부터 Z까지 10초 안에 말해보세요!',
    youtubeKeyword: 'ABC alphabet phonics song for kids'
  },
  2: {
    title: '기초 인사말',
    desc: '인사하기, 자기소개, 감정 표현',
    prompt: `초등학교 3-4학년인데 기초 인사말에 대해 알려주세요.

1. 왜 영어 인사말을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (아침/점심/저녁 인사, 만남/헤어짐 인사, 자기소개, 감정표현 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "숫자와 색깔"입니다)`,
    conversationPrompt: `초등학교 3-4학년이 기초 인사말을 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 두 친구가 처음 만나서 인사하고 자기소개하는 상황
- 20문장 이상
- Good morning, Hello, How are you, Nice to meet you 등 포함
- 영어만 출력 (한글 번역 없이)
- 쉽고 자연스러운 표현 사용

예시 상황:
- 학교에서 새 친구 만나기
- 아침 인사 나누기
- 이름과 나이 소개하기

형식:
A: ...
B: ...`,
    funFact: '💡 재미있는 사실: "Hello"는 전화기가 발명된 후에 인사말로 쓰이기 시작했어요!',
    challenge: '🎯 도전 과제: 가족에게 영어로 인사해보세요!',
    youtubeKeyword: 'English greetings for kids hello how are you'
  },
  3: {
    title: '숫자와 색깔',
    desc: '숫자 1~20, 색깔 12가지',
    prompt: `초등학교 3-4학년인데 숫자와 색깔에 대해 알려주세요.

1. 왜 영어 숫자와 색깔을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (숫자 1-20, 기본 색깔 12가지, 발음과 스펠링 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "가족과 친구"입니다)`,
    conversationPrompt: `초등학교 3-4학년이 숫자와 색깔을 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 가게에서 물건 사는 상황
- 20문장 이상
- 숫자 1-20, 색깔 표현 포함
- 영어만 출력 (한글 번역 없이)
- 쉽고 자연스러운 표현 사용

예시 상황:
- 색깔 물어보기 "What color is this?"
- 개수 세기 "How many apples?"
- 가격 묻기 (간단한 숫자)

형식:
Shopkeeper: ...
Customer: ...`,
    funFact: '💡 재미있는 사실: 무지개는 7가지 색이지만, 영어로는 보통 6가지로 말해요!',
    challenge: '🎯 도전 과제: 집에 있는 물건 5개의 색깔을 영어로 말해보세요!',
    youtubeKeyword: 'numbers and colors song for kids English'
  },
  4: {
    title: '가족과 친구',
    desc: '가족 호칭, 소개하기',
    prompt: `초등학교 3-4학년인데 가족과 친구에 대해 알려주세요.

1. 왜 가족/친구 영어 표현을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (가족 호칭, 가족 소개하기, 친구 소개하기 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "학교와 물건"입니다)`,
    conversationPrompt: `초등학교 3-4학년이 가족과 친구를 소개하는 회화 대화문을 만들어주세요.

조건:
- 친구에게 가족을 소개하는 상황
- 20문장 이상
- mother, father, brother, sister, grandmother, grandfather 등 포함
- 영어만 출력 (한글 번역 없이)
- 쉽고 자연스러운 표현 사용

예시 상황:
- 가족 사진 보여주며 소개
- "This is my..." 패턴 사용
- 가족의 특징 간단히 설명

형식:
A: ...
B: ...`,
    funFact: '💡 재미있는 사실: 영어에서는 할아버지(grandpa)와 할머니(grandma)를 합쳐서 "grandparents"라고 해요!',
    challenge: '🎯 도전 과제: 가족 사진을 보며 영어로 소개해보세요!',
    youtubeKeyword: 'family members in English for kids'
  },
  5: {
    title: '학교와 물건',
    desc: '학용품, 교실 표현',
    prompt: `초등학교 3-4학년인데 학교와 물건에 대해 알려주세요.

1. 왜 학교/물건 영어 표현을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (학용품 이름, 교실 영어, 물건 묻고 답하기 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 5-6학년 영어 "기초 문법"입니다)`,
    conversationPrompt: `초등학교 3-4학년이 학교와 물건을 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 교실에서 학용품을 빌리거나 찾는 상황
- 20문장 이상
- pencil, eraser, book, desk, chair, bag 등 포함
- 영어만 출력 (한글 번역 없이)
- 쉽고 자연스러운 표현 사용

예시 상황:
- "What is this?" "It's a pencil."
- "Can I borrow your eraser?"
- "Where is my book?"

형식:
Student A: ...
Student B: ...`,
    funFact: '💡 재미있는 사실: "School"이라는 단어는 그리스어로 "여가"라는 뜻이었어요!',
    challenge: '🎯 도전 과제: 필통 속 물건 5개를 영어로 말해보세요!',
    youtubeKeyword: 'school supplies vocabulary English for kids'
  }
};

export default function Grade34EnglishLessonPage() {
  const params = useParams();
  const day = Number(params.day);
  const lesson = lessonData[day];

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
    const saved = localStorage.getItem(`english-elem-34-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [day]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyConversationPrompt = async () => {
    await navigator.clipboard.writeText(lesson.conversationPrompt);
    setCopiedConv(true);
    setTimeout(() => setCopiedConv(false), 2000);
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
    localStorage.setItem(`english-elem-34-day${day}-completed`, 'true');
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
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.youtubeKeyword)}`;
    window.open(url, '_blank');
  };

  if (!lesson) {
    return <div className="min-h-screen flex items-center justify-center">레슨을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
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
            <Link href="/course/english/elementary/grade-3-4" className="hover:text-blue-600">초등 3-4학년</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-green-100">{lesson.desc}</p>
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
              <p className="text-amber-700 text-sm">AI에게 "발음도 알려줘" 또는 "예문을 더 만들어줘"라고 요청해보세요!</p>
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
              <Target className="w-5 h-5 text-green-500" />
              📖 학습 프롬프트
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}>
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
            <p className="text-sm text-gray-700 mb-2"><span className="font-medium">검색어:</span> {lesson.youtubeKeyword}</p>
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
          <button onClick={markComplete} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        )}

        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link href={`/course/english/elementary/grade-3-4/lesson/${day - 1}`} className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < 5 ? (
            <Link href={`/course/english/elementary/grade-3-4/lesson/${day + 1}`} className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/course/english/elementary/grade-3-4" className="flex items-center gap-2 text-green-600 font-medium">
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
