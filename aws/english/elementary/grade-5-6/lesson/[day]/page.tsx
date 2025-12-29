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
    title: 'be동사 마스터',
    desc: 'am, is, are 완벽 이해',
    prompt: `초등학교 5-6학년인데 be동사에 대해 알려주세요.

1. 왜 be동사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (am/is/are 구분, 부정문, 의문문 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "일반동사"입니다)`,
    conversationPrompt: `초등학교 5-6학년이 be동사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 두 친구가 서로의 상태, 직업, 감정을 묻고 답하는 상황
- 20문장 이상
- am, is, are를 다양하게 활용
- 영어만 출력 (한글 번역 없이)
- 쉽고 자연스러운 표현 사용

예시 상황:
- "Are you happy?" "Yes, I am."
- "Is she a student?" "Yes, she is."
- "We are friends."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
    funFact: '💡 재미있는 사실: be동사는 영어에서 가장 많이 쓰이는 동사예요! 하루에 수백 번 사용해요.',
    challenge: '🎯 도전 과제: "I am happy. You are smart. He is tall." 3번 말해보세요!',
    youtubeKeyword: 'be verb am is are for kids English grammar'
  },
  2: {
    title: '일반동사',
    desc: 'like, have, play 등',
    prompt: `초등학교 5-6학년인데 일반동사에 대해 알려주세요.

1. 왜 일반동사를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (일반동사 종류, 3인칭 단수 -s, do/does 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "현재시제"입니다)`,
    conversationPrompt: `초등학교 5-6학년이 일반동사를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 취미와 일상 활동에 대해 대화하는 상황
- 20문장 이상
- like, have, play, eat, go, watch 등 다양한 동사 사용
- 3인칭 단수 -s 형태 포함
- 영어만 출력 (한글 번역 없이)

예시 상황:
- "Do you like pizza?" "Yes, I do."
- "She plays tennis every day."
- "What do you do after school?"

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
    funFact: '💡 재미있는 사실: 영어에서 가장 많이 쓰이는 일반동사는 "have"예요!',
    challenge: '🎯 도전 과제: 오늘 한 일을 3가지 영어로 말해보세요!',
    youtubeKeyword: 'action verbs for kids English do does'
  },
  3: {
    title: '현재시제',
    desc: '지금 하는 일 표현하기',
    prompt: `초등학교 5-6학년인데 현재시제에 대해 알려주세요.

1. 왜 현재시제를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (현재시제 용법, 현재진행형 -ing, 습관 표현 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "과거시제"입니다)`,
    conversationPrompt: `초등학교 5-6학년이 현재시제와 현재진행형을 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 지금 하고 있는 일과 일상 습관에 대해 대화
- 20문장 이상
- 현재시제와 현재진행형(-ing) 혼용
- 영어만 출력 (한글 번역 없이)

예시 상황:
- "What are you doing?" "I am reading a book."
- "I usually wake up at 7."
- "She is watching TV now."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
    funFact: '💡 재미있는 사실: "I am eating"처럼 -ing를 붙이면 "지금 ~하고 있다"는 뜻이에요!',
    challenge: '🎯 도전 과제: 지금 하고 있는 일을 영어로 말해보세요!',
    youtubeKeyword: 'present tense present continuous for kids'
  },
  4: {
    title: '과거시제',
    desc: '어제 한 일 표현하기',
    prompt: `초등학교 5-6학년인데 과거시제에 대해 알려주세요.

1. 왜 과거시제를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (규칙 동사 -ed, 불규칙 동사, was/were 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "문장 구조"입니다)`,
    conversationPrompt: `초등학교 5-6학년이 과거시제를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 어제/지난주에 한 일에 대해 대화
- 20문장 이상
- 규칙동사(-ed)와 불규칙동사(went, ate, saw 등) 포함
- was/were 포함
- 영어만 출력 (한글 번역 없이)

예시 상황:
- "What did you do yesterday?" "I went to the park."
- "Did you watch TV?" "Yes, I did."
- "She was at home last night."

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
    funFact: '💡 재미있는 사실: "go"의 과거형 "went"는 전혀 다른 단어에서 왔어요!',
    challenge: '🎯 도전 과제: 어제 한 일 3가지를 영어로 말해보세요!',
    youtubeKeyword: 'past tense for kids regular irregular verbs'
  },
  5: {
    title: '문장 구조',
    desc: '주어+동사+목적어',
    prompt: `초등학교 5-6학년인데 영어 문장 구조에 대해 알려주세요.

1. 왜 문장 구조를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (주어+동사, 주어+동사+목적어, 주어+동사+보어 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 중학교 영어 "8품사"입니다)`,
    conversationPrompt: `초등학교 5-6학년이 영어 문장 구조를 연습할 수 있는 회화 대화문을 만들어주세요.

조건:
- 다양한 문장 구조를 사용하는 일상 대화
- 20문장 이상
- SV, SVO, SVC 구조 골고루 포함
- 영어만 출력 (한글 번역 없이)

예시 상황:
- "I run." (SV)
- "I like apples." (SVO)
- "She is happy." (SVC)
- "He gave me a book." (SVOO)

형식:
- 화자 표시 없이 문장만 작성
- 한 문장씩 줄바꿈으로 구분`,
    funFact: '💡 재미있는 사실: 영어는 어순이 중요해서 단어 순서를 바꾸면 뜻이 달라져요!',
    challenge: '🎯 도전 과제: "나는 사과를 먹는다"를 영어로 말해보세요!',
    youtubeKeyword: 'English sentence structure SVO for kids'
  }
};

export default function Grade56EnglishLessonPage() {
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
    const saved = localStorage.getItem(`english-elem-56-day${day}-completed`);
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
    localStorage.setItem(`english-elem-56-day${day}-completed`, 'true');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '24px'
            }}>
              {['🎉', '⭐', '🏆', '✨', '📗'][Math.floor(Math.random() * 5)]}
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
            <Link href="/course/english/elementary/grade-5-6" className="hover:text-blue-600">초등 5-6학년</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-teal-100">{lesson.desc}</p>
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
              <p className="text-amber-700 text-sm">AI에게 "더 쉬운 예문으로 알려줘" 또는 "퀴즈를 내줘"라고 요청해보세요!</p>
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
              <Target className="w-5 h-5 text-teal-500" />
              📖 학습 프롬프트
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'}`}>
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
          <button onClick={markComplete} className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        )}

        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link href={`/course/english/elementary/grade-5-6/lesson/${day - 1}`} className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < 5 ? (
            <Link href={`/course/english/elementary/grade-5-6/lesson/${day + 1}`} className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/course/english/elementary/grade-5-6" className="flex items-center gap-2 text-teal-600 font-medium">
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
