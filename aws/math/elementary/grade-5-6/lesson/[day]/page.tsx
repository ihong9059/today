'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star } from 'lucide-react';

const lessonData: { [key: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string } } = {
  1: {
    title: '분수의 계산',
    desc: '분수 덧셈, 뺄셈',
    prompt: `초등학교 5-6학년 학생을 위한 분수 덧셈과 뺄셈 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 문제 6개를 만들어 주세요
2. 같은 분모 계산 2개, 다른 분모 계산 4개
3. 통분 과정을 단계별로 보여주세요
4. 대분수와 가분수 변환도 포함해주세요
5. 피자, 케이크, 리본 등 실생활 예시 사용
6. 약분하는 방법도 알려주세요

예시 형식:
[문제 1] 🎂
생일 케이크의 1/3을 먹고, 나중에 1/4을 더 먹었습니다.
총 얼마나 먹었나요?
힌트: 분모를 같게 만들어야 해요! (통분)`,
    funFact: '💡 재미있는 사실: 분수는 고대 이집트에서 빵을 나눌 때 처음 사용되었어요! 그들은 항상 분자가 1인 분수만 썼답니다.',
    challenge: '🎯 도전 과제: 요리할 때 쓰는 계량컵으로 분수 덧셈을 연습해보세요! (1/2컵 + 1/4컵 = ?)'
  },
  2: {
    title: '소수의 계산',
    desc: '소수점 연산',
    prompt: `초등학교 5-6학년 학생을 위한 소수 계산 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 소수 덧셈/뺄셈 3문제, 곱셈 2문제, 나눗셈 1문제
2. 소수점 자리 맞추기의 중요성 강조
3. 돈 계산, 거리, 무게 등 실생활 상황 사용
4. 소수를 분수로, 분수를 소수로 바꾸는 문제도 포함
5. 반올림, 올림, 버림 개념도 다루어주세요
6. 계산기 없이 푸는 방법 알려주기

예시 형식:
[문제 1] 🛒
마트에서 사과 1.5kg과 배 2.75kg을 샀습니다.
총 무게는 얼마인가요?
힌트: 소수점을 맞춰서 계산해요!`,
    funFact: '💡 재미있는 사실: 소수점은 1593년 네덜란드 수학자가 발명했어요. 그 전에는 분수로만 표현했답니다!',
    challenge: '🎯 도전 과제: 가게에서 물건 가격을 보고 총합을 소수로 계산해보세요!'
  },
  3: {
    title: '비와 비율',
    desc: '비율, 백분율',
    prompt: `초등학교 5-6학년 학생을 위한 비와 비율 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 비의 개념 문제 2개
2. 비율 계산 문제 2개
3. 백분율(%) 문제 2개
4. 할인, 시험 점수, 레시피 배율 등 실생활 예시
5. 비 → 비율 → 백분율 변환 방법 설명
6. 비례식 풀이도 포함해주세요

예시 형식:
[문제 1] 🧃
주스와 물을 2:3의 비율로 섞습니다.
물 300mL를 사용하면 주스는 얼마나 필요할까요?`,
    funFact: '💡 재미있는 사실: 백분율(%)은 "100당"이라는 뜻의 라틴어에서 왔어요. 100개 중 몇 개인지를 나타내는 거죠!',
    challenge: '🎯 도전 과제: 시험에서 맞은 개수를 백분율로 계산해보세요!'
  },
  4: {
    title: '도형의 넓이',
    desc: '삼각형, 사각형 넓이',
    prompt: `초등학교 5-6학년 학생을 위한 도형 넓이 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 삼각형 넓이 2문제
2. 평행사변형 넓이 2문제
3. 사다리꼴 넓이 2문제
4. 실제 물건(창문, 지붕, 표지판 등) 예시 사용
5. 공식이 왜 그렇게 되는지 설명해주세요
6. 복합 도형 넓이 구하기도 포함

예시 형식:
[문제 1] 🏠
삼각형 모양 지붕의 밑변이 8m, 높이가 3m입니다.
지붕의 넓이는 몇 m²일까요?
공식: 삼각형 넓이 = 밑변 × 높이 ÷ 2`,
    funFact: '💡 재미있는 사실: 삼각형 넓이 공식은 직사각형을 대각선으로 자르면 알 수 있어요. 직사각형의 절반이 되거든요!',
    challenge: '🎯 도전 과제: 방 바닥이나 책상 위의 넓이를 계산해보세요!'
  },
  5: {
    title: '입체도형',
    desc: '부피와 겉넓이',
    prompt: `초등학교 5-6학년 학생을 위한 입체도형 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 직육면체/정육면체 부피 2문제
2. 원기둥 부피 2문제
3. 겉넓이 구하기 2문제
4. 상자, 물통, 통조림 등 실생활 예시 사용
5. 부피와 들이(L, mL) 관계 설명
6. 전개도와 연결해서 설명해주세요

예시 형식:
[문제 1] 📦
가로 5cm, 세로 4cm, 높이 3cm인 상자가 있습니다.
이 상자의 부피는 몇 cm³일까요?
공식: 직육면체 부피 = 가로 × 세로 × 높이`,
    funFact: '💡 재미있는 사실: 1L = 1000mL = 1000cm³예요. 우유팩 1L는 정확히 1000cm³ 크기랍니다!',
    challenge: '🎯 도전 과제: 집에 있는 상자의 부피를 직접 측정해서 계산해보세요!'
  }
};

export default function Grade56MathLessonPage() {
  const params = useParams();
  const day = Number(params.day);
  const lesson = lessonData[day];

  const [copied, setCopied] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`math-elem-56-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [day]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = () => {
    const url = selectedAI === 'claude'
      ? 'https://claude.ai/new'
      : 'https://chat.openai.com/';
    window.open(url, '_blank');
  };

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`math-elem-56-day${day}-completed`, 'true');
    setTimeout(() => setShowConfetti(false), 3000);
  };

  if (!lesson) {
    return <div className="min-h-screen flex items-center justify-center">레슨을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '24px'
            }}>
              {['🎉', '⭐', '🏆', '✨', '📐'][Math.floor(Math.random() * 5)]}
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
            <Link href="/course/math" className="hover:text-blue-600">수학 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/course/math/elementary/grade-5-6" className="hover:text-blue-600">초등 5-6학년</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-orange-100">{lesson.desc}</p>
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
              <p className="text-amber-700 text-sm">어려운 문제가 있으면 AI에게 "더 쉬운 문제로 바꿔줘" 또는 "힌트를 더 줘"라고 요청하세요!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
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
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}>
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button onClick={openAI} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              {selectedAI === 'claude' ? 'Claude' : 'ChatGPT'} 열기
            </button>
          </div>
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
            <Link href={`/course/math/elementary/grade-5-6/lesson/${day - 1}`} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < 5 ? (
            <Link href={`/course/math/elementary/grade-5-6/lesson/${day + 1}`} className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/course/math/elementary/grade-5-6" className="flex items-center gap-2 text-orange-600 font-medium">
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
