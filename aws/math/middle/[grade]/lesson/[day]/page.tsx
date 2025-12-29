'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star } from 'lucide-react';

const gradeInfo: { [key: string]: { name: string; color: string; colorLight: string } } = {
  'grade-7': { name: '중학교 1학년', color: 'from-green-500 to-teal-500', colorLight: 'green' },
  'grade-8': { name: '중학교 2학년', color: 'from-teal-500 to-cyan-500', colorLight: 'teal' },
  'grade-9': { name: '중학교 3학년', color: 'from-cyan-500 to-blue-500', colorLight: 'cyan' },
};

const allLessons: { [grade: string]: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string } } } = {
  'grade-7': {
    1: {
      title: '정수와 유리수',
      desc: '음수의 개념과 연산',
      prompt: `중학교 1학년인데 정수와 유리수에 대해 알려주세요.

1. 왜 정수와 유리수를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (음수, 부호 규칙, 수직선 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "문자와 식"입니다)`,
      funFact: '💡 재미있는 사실: 음수는 7세기 인도에서 빚을 표현하기 위해 처음 사용되었어요!',
      challenge: '🎯 도전 과제: 일주일간 기온 변화를 정수로 기록해보세요!'
    },
    2: {
      title: '문자와 식',
      desc: '변수, 항, 계수',
      prompt: `중학교 1학년인데 문자와 식에 대해 알려주세요.

1. 왜 문자와 식을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (변수, 항, 계수, 동류항 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "일차방정식"입니다)`,
      funFact: '💡 재미있는 사실: x를 미지수로 사용한 것은 17세기 데카르트가 처음이에요!',
      challenge: '🎯 도전 과제: 주변 상황을 문자식으로 표현해보세요!'
    },
    3: {
      title: '일차방정식',
      desc: '등식의 성질과 풀이',
      prompt: `중학교 1학년인데 일차방정식에 대해 알려주세요.

1. 왜 일차방정식을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (등식의 성질, 이항, 검산 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "좌표와 그래프"입니다)`,
      funFact: '💡 재미있는 사실: "방정식"이란 말은 중국에서 왔어요!',
      challenge: '🎯 도전 과제: "내 나이의 2배에 3을 더하면 27"을 방정식으로 풀어보세요!'
    },
    4: {
      title: '좌표와 그래프',
      desc: '순서쌍, 좌표평면',
      prompt: `중학교 1학년인데 좌표와 그래프에 대해 알려주세요.

1. 왜 좌표와 그래프를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (순서쌍, 사분면, 정비례/반비례 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "기본 도형"입니다)`,
      funFact: '💡 재미있는 사실: 데카르트가 천장의 파리를 보며 좌표계를 발명했대요!',
      challenge: '🎯 도전 과제: 집에서 학교까지 경로를 좌표로 표현해보세요!'
    },
    5: {
      title: '기본 도형',
      desc: '점, 선, 면, 각',
      prompt: `중학교 1학년인데 기본 도형에 대해 알려주세요.

1. 왜 기본 도형을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (점/선/면, 맞꼭지각, 동위각, 엇각 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 중2 "연립방정식"입니다)`,
      funFact: '💡 재미있는 사실: "기하학"은 "땅을 측량하다"라는 그리스어에서 왔어요!',
      challenge: '🎯 도전 과제: 주변에서 평행선과 수직선을 찾아보세요!'
    }
  },
  'grade-8': {
    1: {
      title: '연립방정식',
      desc: '이원일차연립방정식',
      prompt: `중학교 2학년인데 연립방정식에 대해 알려주세요.

1. 왜 연립방정식을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (대입법, 가감법, 검산 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "부등식"입니다)`,
      funFact: '💡 재미있는 사실: 연립방정식은 2000년 전 중국 구장산술에도 나와요!',
      challenge: '🎯 도전 과제: 물건 가격으로 연립방정식을 만들어보세요!'
    },
    2: {
      title: '부등식',
      desc: '일차부등식과 연립부등식',
      prompt: `중학교 2학년인데 부등식에 대해 알려주세요.

1. 왜 부등식을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (부등호 방향 변화, 해의 범위, 수직선 표현 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "일차함수"입니다)`,
      funFact: '💡 재미있는 사실: 부등호 <, >는 1631년 영국 수학자가 처음 사용했어요!',
      challenge: '🎯 도전 과제: 용돈으로 살 수 있는 것 문제를 만들어보세요!'
    },
    3: {
      title: '일차함수',
      desc: 'y=ax+b 그래프',
      prompt: `중학교 2학년인데 일차함수에 대해 알려주세요.

1. 왜 일차함수를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (기울기, y절편, 그래프 특징 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "삼각형의 성질"입니다)`,
      funFact: '💡 재미있는 사실: "함수"라는 말은 라이프니츠가 1673년에 처음 사용했어요!',
      challenge: '🎯 도전 과제: 요금제를 일차함수로 표현해보세요!'
    },
    4: {
      title: '삼각형의 성질',
      desc: '이등변삼각형, 합동',
      prompt: `중학교 2학년인데 삼각형의 성질에 대해 알려주세요.

1. 왜 삼각형의 성질을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (이등변삼각형, 합동조건 SSS/SAS/ASA 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "사각형의 성질"입니다)`,
      funFact: '💡 재미있는 사실: 유클리드는 2300년 전에 삼각형 합동 조건을 증명했어요!',
      challenge: '🎯 도전 과제: 종이로 이등변삼각형을 만들어보세요!'
    },
    5: {
      title: '사각형의 성질',
      desc: '평행사변형, 여러 가지 사각형',
      prompt: `중학교 2학년인데 사각형의 성질에 대해 알려주세요.

1. 왜 사각형의 성질을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (평행사변형, 직사각형, 마름모, 정사각형 포함관계 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 중3 "제곱근과 실수"입니다)`,
      funFact: '💡 재미있는 사실: 마름모는 "회전하는 팽이"라는 그리스어에서 왔어요!',
      challenge: '🎯 도전 과제: 주변에서 다양한 사각형을 찾아 분류해보세요!'
    }
  },
  'grade-9': {
    1: {
      title: '제곱근과 실수',
      desc: '무리수, 제곱근의 성질',
      prompt: `중학교 3학년인데 제곱근과 실수에 대해 알려주세요.

1. 왜 제곱근과 실수를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (제곱근, 무리수, 근호 간단히 하기 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "다항식의 곱셈"입니다)`,
      funFact: '💡 재미있는 사실: √2가 무리수라는 것을 피타고라스 학파는 비밀로 했대요!',
      challenge: '🎯 도전 과제: 정사각형 대각선 길이가 √2인지 확인해보세요!'
    },
    2: {
      title: '다항식의 곱셈',
      desc: '곱셈공식, 인수분해',
      prompt: `중학교 3학년인데 다항식의 곱셈과 인수분해에 대해 알려주세요.

1. 왜 곱셈공식과 인수분해를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   ((a+b)², (a-b)², (a+b)(a-b), 인수분해 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "이차방정식"입니다)`,
      funFact: '💡 재미있는 사실: (a+b)²을 그림으로 그리면 정사각형의 넓이가 돼요!',
      challenge: '🎯 도전 과제: 99² = (100-1)²을 곱셈공식으로 암산해보세요!'
    },
    3: {
      title: '이차방정식',
      desc: '근의 공식, 판별식',
      prompt: `중학교 3학년인데 이차방정식에 대해 알려주세요.

1. 왜 이차방정식을 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (인수분해, 완전제곱식, 근의 공식, 판별식 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "이차함수"입니다)`,
      funFact: '💡 재미있는 사실: 근의 공식은 4000년 전 바빌로니아에서도 알려져 있었어요!',
      challenge: '🎯 도전 과제: "연속하는 두 자연수의 곱이 90"을 방정식으로 풀어보세요!'
    },
    4: {
      title: '이차함수',
      desc: 'y=ax² 그래프',
      prompt: `중학교 3학년인데 이차함수에 대해 알려주세요.

1. 왜 이차함수를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (포물선, 꼭짓점, 대칭축, 최댓값/최솟값 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 "피타고라스 정리"입니다)`,
      funFact: '💡 재미있는 사실: 포물선은 분수대 물줄기, 농구공 궤적에서 볼 수 있어요!',
      challenge: '🎯 도전 과제: 공을 던졌을 때 궤적이 포물선인지 관찰해보세요!'
    },
    5: {
      title: '피타고라스 정리',
      desc: '직각삼각형과 응용',
      prompt: `중학교 3학년인데 피타고라스 정리에 대해 알려주세요.

1. 왜 피타고라스 정리를 배워야 할까요?
   (실생활 예를 들어 쉽게 이해할 수 있도록 해주세요)

2. 안 배우면 생기는 문제
   (다음 단계 학습에서 문제가 되는 사항을 구체적으로 알려주세요)

3. 핵심 개념을 설명해 주세요
   (a² + b² = c², 피타고라스 수, 역 포함)

4. 연습 문제를 만들어 주세요 (10개)

5. 다음 단계 예고
   (다음은 고등학교 "다항식"입니다)`,
      funFact: '💡 재미있는 사실: 피타고라스보다 1000년 전 바빌로니아에서 이미 알려져 있었어요!',
      challenge: '🎯 도전 과제: 방의 대각선 길이를 계산하고 직접 재보세요!'
    }
  }
};

export default function MiddleMathLessonPage() {
  const params = useParams();
  const grade = params.grade as string;
  const day = Number(params.day);

  const gradeData = gradeInfo[grade];
  const lessons = allLessons[grade];
  const lesson = lessons?.[day];

  const [copied, setCopied] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`math-${grade}-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [grade, day]);

  const copyPrompt = async () => {
    if (!lesson) return;
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`math-${grade}-day${day}-completed`, 'true');
    setTimeout(() => setShowConfetti(false), 3000);
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
              {['🎉', '⭐', '🏆', '✨', '📊'][Math.floor(Math.random() * 5)]}
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
            <Link href={`/course/math/middle/${grade}`} className="hover:text-blue-600">{gradeData.name}</Link>
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
              <p className="text-amber-700 text-sm">문제를 풀다가 모르면 AI에게 "힌트를 줘" 또는 "비슷한 쉬운 문제로 바꿔줘"라고 요청하세요!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-500" />
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
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
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
            <Link href={`/course/math/middle/${grade}/lesson/${day - 1}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
              <ChevronLeft className="w-5 h-5" />
              <span>Day {day - 1}</span>
            </Link>
          ) : <div />}
          {day < 5 ? (
            <Link href={`/course/math/middle/${grade}/lesson/${day + 1}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
              <span>Day {day + 1}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link href={`/course/math/middle/${grade}`} className="flex items-center gap-2 text-blue-600 font-medium">
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
