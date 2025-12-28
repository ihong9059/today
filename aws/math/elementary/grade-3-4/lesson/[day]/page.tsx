'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star } from 'lucide-react';

const lessonData: { [key: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string } } = {
  1: {
    title: '덧셈과 뺄셈',
    desc: '세 자리 수 연산',
    prompt: `초등학교 3-4학년 학생을 위한 세 자리 수 덧셈과 뺄셈 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 문제 5개를 만들어 주세요 (덧셈 3개, 뺄셈 2개)
2. 받아올림과 받아내림이 포함된 문제를 섞어주세요
3. 각 문제는 실생활 상황(예: 쇼핑, 저금통)으로 만들어 주세요
4. 난이도는 쉬움 → 어려움 순서로 배치
5. 문제 아래에 정답과 풀이 과정을 단계별로 설명해주세요
6. 마지막에 비슷한 유형 연습문제 2개를 추가해주세요

예시 형식:
[문제 1] 🛒
민수는 문구점에서 연필을 245원에, 지우개를 178원에 샀습니다. 민수가 지불해야 할 총 금액은 얼마인가요?`,
    funFact: '💡 재미있는 사실: 고대 이집트인들도 3,000년 전에 덧셈과 뺄셈을 했어요! 그들은 상형문자로 숫자를 썼답니다.',
    challenge: '🎯 도전 과제: 오늘 본 숫자들(버스 번호, 가격표 등)로 나만의 덧셈 문제를 만들어 보세요!'
  },
  2: {
    title: '곱셈',
    desc: '두 자리 수 곱셈',
    prompt: `초등학교 3-4학년 학생을 위한 두 자리 수 곱셈 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 문제 5개를 만들어 주세요
2. (한 자리) × (두 자리) 2문제, (두 자리) × (두 자리) 3문제
3. 배열(array)이나 그림으로 설명할 수 있는 실생활 문제로 만들어 주세요
4. 각 문제에 시각적 힌트를 제공해주세요
5. 풀이는 세로셈 방식으로 단계별로 보여주세요
6. 구구단 활용법도 알려주세요

예시 형식:
[문제 1] 🍎
사과가 한 줄에 12개씩 5줄로 진열되어 있습니다. 사과는 모두 몇 개일까요?
힌트: 12를 10과 2로 나눠서 생각해보세요!`,
    funFact: '💡 재미있는 사실: 곱셈 기호 ×는 1631년에 윌리엄 오트레드가 처음 사용했어요!',
    challenge: '🎯 도전 과제: 집에 있는 물건을 배열로 놓고 곱셈 문제를 만들어 보세요!'
  },
  3: {
    title: '나눗셈',
    desc: '나머지 있는 나눗셈',
    prompt: `초등학교 3-4학년 학생을 위한 나눗셈 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 문제 6개를 만들어 주세요
2. 나누어떨어지는 문제 2개, 나머지가 있는 문제 4개
3. 균등 분배 상황(사탕 나누기, 팀 나누기 등)으로 만들어 주세요
4. 나머지의 의미를 실생활에서 해석하는 문제를 포함해주세요
5. 곱셈과 나눗셈의 관계를 보여주세요
6. 검산 방법도 알려주세요 (몫 × 나누는 수 + 나머지 = 나눠지는 수)

예시 형식:
[문제 1] 🍬
사탕 47개를 5명의 친구에게 똑같이 나눠주려고 합니다.
한 명에게 몇 개씩 줄 수 있고, 몇 개가 남을까요?`,
    funFact: '💡 재미있는 사실: 나눗셈은 공정하게 나누는 것에서 시작됐어요. 옛날 사람들도 음식을 나눌 때 이 방법을 썼답니다!',
    challenge: '🎯 도전 과제: 과자를 가족에게 나눠주며 나눗셈을 연습해보세요!'
  },
  4: {
    title: '분수의 기초',
    desc: '분수의 개념과 비교',
    prompt: `초등학교 3-4학년 학생을 위한 분수 기초 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 분수의 개념 이해 문제 2개
2. 분수 크기 비교 문제 2개
3. 분수 계산(같은 분모) 문제 2개
4. 피자, 케이크, 색종이 등 시각적인 예시를 사용해주세요
5. 분모와 분자의 의미를 명확히 설명해주세요
6. 그림을 글로 표현해주세요 (예: ■■□□ = 2/4)

예시 형식:
[문제 1] 🍕
피자 한 판을 8조각으로 똑같이 나눴습니다. 민지가 3조각을 먹었다면, 민지가 먹은 양을 분수로 나타내세요.
[그림] ●●●○○○○○ (●=먹은 조각)`,
    funFact: '💡 재미있는 사실: 분수(fraction)라는 말은 "부서지다"라는 뜻의 라틴어에서 왔어요. 전체를 부분으로 나누는 거죠!',
    challenge: '🎯 도전 과제: 종이를 접어서 1/2, 1/4, 1/8을 만들어 보세요!'
  },
  5: {
    title: '도형과 측정',
    desc: '삼각형, 사각형, 길이',
    prompt: `초등학교 3-4학년 학생을 위한 도형과 측정 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 도형 분류 문제 2개 (삼각형, 사각형 종류)
2. 둘레 구하기 문제 2개
3. 길이 단위 변환 문제 2개 (cm ↔ m ↔ km)
4. 실생활 상황으로 문제를 만들어 주세요
5. 도형의 특징을 글로 설명해주세요
6. 공식을 쉽게 기억하는 방법도 알려주세요

예시 형식:
[문제 1] 📐
정사각형 모양의 타일 한 변의 길이가 15cm입니다.
이 타일의 둘레는 몇 cm일까요?
힌트: 정사각형은 네 변의 길이가 모두 같아요!`,
    funFact: '💡 재미있는 사실: 이집트 피라미드는 완벽한 정사각형 밑면을 가지고 있어요. 고대인들도 도형을 정확히 알았답니다!',
    challenge: '🎯 도전 과제: 집에서 삼각형, 사각형 모양을 찾아서 그 둘레를 재어보세요!'
  }
};

export default function Grade34MathLessonPage() {
  const params = useParams();
  const day = Number(params.day);
  const lesson = lessonData[day];

  const [copied, setCopied] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`math-elem-34-day${day}-completed`);
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
    localStorage.setItem(`math-elem-34-day${day}-completed`, 'true');
    setTimeout(() => setShowConfetti(false), 3000);
  };

  if (!lesson) {
    return <div className="min-h-screen flex items-center justify-center">레슨을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute animate-bounce" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: '24px'
            }}>
              {['🎉', '⭐', '🏆', '✨', '🔢'][Math.floor(Math.random() * 5)]}
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
            <Link href="/course/math/elementary/grade-3-4" className="hover:text-blue-600">초등 3-4학년</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{lesson.title}</h1>
                <p className="text-yellow-100">{lesson.desc}</p>
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
              <p className="text-amber-700 text-sm">AI가 만든 문제를 풀 때, 틀려도 괜찮아요! AI에게 "왜 틀렸는지 설명해줘"라고 하면 친절하게 알려줍니다.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-500" />
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
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}>
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
            <Link href={`/course/math/elementary/grade-3-4/lesson/${day - 1}`} className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < 5 ? (
            <Link href={`/course/math/elementary/grade-3-4/lesson/${day + 1}`} className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/course/math/elementary/grade-3-4" className="flex items-center gap-2 text-yellow-600 font-medium">
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
