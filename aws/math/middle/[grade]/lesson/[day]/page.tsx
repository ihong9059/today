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
      prompt: `중학교 1학년 학생을 위한 정수와 유리수 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 정수의 덧셈/뺄셈 문제 3개
2. 정수의 곱셈/나눗셈 문제 2개
3. 유리수 계산 문제 2개
4. 수직선을 활용한 설명 포함
5. 실생활 예시(온도, 해발고도, 수입/지출) 사용
6. 부호 규칙을 외우기 쉽게 정리해주세요

예시 형식:
[문제 1] 🌡️
어제 기온은 -5°C였고, 오늘은 어제보다 8°C 높습니다.
오늘 기온은 몇 °C일까요?
힌트: -5 + 8 = ?`,
      funFact: '💡 재미있는 사실: 음수는 7세기 인도에서 처음 사용되었어요. 빚을 표현하기 위해서였답니다!',
      challenge: '🎯 도전 과제: 일주일간 기온 변화를 기록하고 정수로 나타내보세요!'
    },
    2: {
      title: '문자와 식',
      desc: '변수, 항, 계수',
      prompt: `중학교 1학년 학생을 위한 문자와 식 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 문자를 사용한 식 세우기 3문제
2. 다항식의 항, 계수 찾기 2문제
3. 동류항 정리 2문제
4. 실생활 상황을 식으로 표현하기
5. 대입하여 값 구하기 포함
6. 문자식의 의미를 이해할 수 있도록 설명

예시 형식:
[문제 1] 📱
휴대폰 요금이 기본료 a원에 데이터 1GB당 b원입니다.
3GB를 사용했을 때 총 요금을 문자식으로 나타내세요.`,
      funFact: '💡 재미있는 사실: x를 미지수로 사용한 것은 17세기 데카르트가 처음이에요!',
      challenge: '🎯 도전 과제: 주변에서 문자식으로 표현할 수 있는 상황을 찾아보세요!'
    },
    3: {
      title: '일차방정식',
      desc: '등식의 성질과 풀이',
      prompt: `중학교 1학년 학생을 위한 일차방정식 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 기본 일차방정식 풀이 3문제
2. 괄호가 있는 방정식 2문제
3. 응용 문제(나이, 거리, 가격) 2문제
4. 등식의 성질을 단계별로 적용하는 과정 보여주기
5. 검산 방법도 알려주세요
6. 방정식 세우는 팁도 포함

예시 형식:
[문제 1] 🧮
2x + 5 = 13을 풀어보세요.
풀이 과정:
① 양변에서 5를 뺀다: 2x = 8
② 양변을 2로 나눈다: x = 4`,
      funFact: '💡 재미있는 사실: "방정식"이란 말은 중국에서 왔어요. "방"은 사각형, "정"은 맞추다는 뜻이에요!',
      challenge: '🎯 도전 과제: "내 나이의 2배에 3을 더하면 27이다"를 방정식으로 풀어보세요!'
    },
    4: {
      title: '좌표와 그래프',
      desc: '순서쌍, 좌표평면',
      prompt: `중학교 1학년 학생을 위한 좌표와 그래프 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 순서쌍으로 점의 위치 표현 2문제
2. 좌표평면에서 점 찾기 2문제
3. 사분면 판별 2문제
4. 정비례, 반비례 그래프 기초 1문제
5. 좌표평면을 그림으로 설명해주세요
6. 실생활에서의 좌표 활용 예시 포함

예시 형식:
[문제 1] 🗺️
점 A(3, -2)는 제 몇 사분면에 있나요?
힌트: x좌표가 +, y좌표가 -인 사분면을 찾으세요!`,
      funFact: '💡 재미있는 사실: 좌표계는 데카르트가 천장에 있는 파리를 보며 발명했다고 해요!',
      challenge: '🎯 도전 과제: 집에서 학교까지의 경로를 좌표로 표현해보세요!'
    },
    5: {
      title: '기본 도형',
      desc: '점, 선, 면, 각',
      prompt: `중학교 1학년 학생을 위한 기본 도형 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 점, 선, 면의 관계 2문제
2. 각의 종류(예각, 직각, 둔각) 구별 2문제
3. 맞꼭지각, 동위각, 엇각 2문제
4. 수직과 평행의 성질 1문제
5. 도형의 기호 표기법 설명
6. 그림을 글로 표현해주세요

예시 형식:
[문제 1] 📐
두 직선이 만날 때 생기는 맞꼭지각의 크기가 같은 이유를 설명하세요.
[그림] 두 직선이 만나는 점에서 ∠a와 ∠c가 맞꼭지각`,
      funFact: '💡 재미있는 사실: "기하학"이라는 말은 "땅을 측량하다"라는 뜻의 그리스어에서 왔어요!',
      challenge: '🎯 도전 과제: 주변에서 평행선과 수직선을 찾아 사진을 찍어보세요!'
    }
  },
  'grade-8': {
    1: {
      title: '연립방정식',
      desc: '이원일차연립방정식',
      prompt: `중학교 2학년 학생을 위한 연립방정식 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 대입법으로 푸는 문제 2개
2. 가감법으로 푸는 문제 2개
3. 응용 문제(가격, 개수 등) 2개
4. 두 가지 방법으로 같은 문제 풀기 1문제
5. 어떤 방법이 더 효율적인지 설명
6. 검산 방법도 알려주세요

예시 형식:
[문제 1] 🛒
사과 2개와 배 3개의 가격은 2,500원이고,
사과 3개와 배 2개의 가격은 2,600원입니다.
사과와 배 각각의 가격은?`,
      funFact: '💡 재미있는 사실: 연립방정식은 2000년 전 중국의 구장산술에도 나와요!',
      challenge: '🎯 도전 과제: 가족과 함께 장을 보고, 물건 가격으로 연립방정식을 만들어보세요!'
    },
    2: {
      title: '부등식',
      desc: '일차부등식과 연립부등식',
      prompt: `중학교 2학년 학생을 위한 부등식 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 일차부등식 풀이 3문제
2. 연립부등식 풀이 2문제
3. 응용 문제(최대/최소 구하기) 2문제
4. 부등식의 해를 수직선에 표현
5. 부등호 방향이 바뀌는 경우 강조
6. 방정식과의 차이점 설명

예시 형식:
[문제 1] 💰
한 달 용돈이 30,000원인데 이미 12,000원을 썼습니다.
앞으로 5,000원짜리 물건을 최대 몇 개 살 수 있을까요?`,
      funFact: '💡 재미있는 사실: 부등호 < 와 >는 1631년 영국 수학자가 처음 사용했어요!',
      challenge: '🎯 도전 과제: "용돈으로 살 수 있는 것" 문제를 직접 만들어보세요!'
    },
    3: {
      title: '일차함수',
      desc: 'y=ax+b 그래프',
      prompt: `중학교 2학년 학생을 위한 일차함수 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 함수식 세우기 2문제
2. 기울기와 y절편 구하기 2문제
3. 그래프 그리기 문제 2문제
4. 두 일차함수의 교점 구하기 1문제
5. 기울기의 의미(변화율) 설명
6. 그래프의 특징을 글로 설명

예시 형식:
[문제 1] 🚗
자동차가 출발한 지 x시간 후 이동한 거리가 y km일 때,
시속 60km로 달린다면 y를 x에 대한 식으로 나타내세요.`,
      funFact: '💡 재미있는 사실: "함수"라는 말은 라이프니츠가 1673년에 처음 사용했어요!',
      challenge: '🎯 도전 과제: 요금제(기본료 + 사용량×단가)를 일차함수로 표현해보세요!'
    },
    4: {
      title: '삼각형의 성질',
      desc: '이등변삼각형, 합동',
      prompt: `중학교 2학년 학생을 위한 삼각형의 성질 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 이등변삼각형의 성질 2문제
2. 삼각형의 합동 조건(SSS, SAS, ASA) 3문제
3. 삼각형의 외심, 내심 기초 2문제
4. 합동 조건을 그림으로 설명
5. 증명 과정을 단계별로 보여주기
6. 왜 3가지 합동 조건만 있는지 설명

예시 형식:
[문제 1] 📐
이등변삼각형 ABC에서 AB=AC이고 ∠B=65°일 때,
∠A의 크기를 구하세요.`,
      funFact: '💡 재미있는 사실: 유클리드는 2300년 전에 삼각형의 합동 조건을 증명했어요!',
      challenge: '🎯 도전 과제: 종이를 접어서 이등변삼각형과 정삼각형을 만들어보세요!'
    },
    5: {
      title: '사각형의 성질',
      desc: '평행사변형, 여러 가지 사각형',
      prompt: `중학교 2학년 학생을 위한 사각형의 성질 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 평행사변형의 성질 2문제
2. 직사각형, 마름모, 정사각형 비교 2문제
3. 사각형 판별 문제 2문제
4. 대각선의 성질로 구별하기
5. 사각형의 포함 관계 설명
6. 그림과 함께 성질을 정리해주세요

예시 형식:
[문제 1] 🔷
평행사변형 ABCD에서 ∠A=70°일 때,
나머지 세 각의 크기를 구하세요.`,
      funFact: '💡 재미있는 사실: 마름모는 "회전하는 팽이"라는 뜻의 그리스어에서 왔어요!',
      challenge: '🎯 도전 과제: 주변에서 다양한 사각형을 찾아 분류해보세요!'
    }
  },
  'grade-9': {
    1: {
      title: '제곱근과 실수',
      desc: '무리수, 제곱근의 성질',
      prompt: `중학교 3학년 학생을 위한 제곱근과 실수 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 제곱근 구하기 2문제
2. 제곱근의 성질 활용 2문제
3. 무리수의 개념 2문제
4. 제곱근의 덧셈, 뺄셈, 곱셈 1문제
5. √를 간단히 하는 방법 설명
6. 수직선에서 무리수의 위치 표현

예시 형식:
[문제 1] 📏
√50을 가장 간단한 형태로 나타내세요.
풀이: √50 = √(25×2) = √25 × √2 = 5√2`,
      funFact: '💡 재미있는 사실: √2가 무리수라는 것을 발견한 피타고라스 학파는 이것을 비밀로 했대요!',
      challenge: '🎯 도전 과제: 한 변이 1인 정사각형의 대각선 길이가 √2인 것을 확인해보세요!'
    },
    2: {
      title: '다항식의 곱셈',
      desc: '곱셈공식, 인수분해',
      prompt: `중학교 3학년 학생을 위한 다항식의 곱셈과 인수분해 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 곱셈공식 적용 문제 3개
   - (a+b)², (a-b)², (a+b)(a-b), (x+a)(x+b)
2. 인수분해 문제 3개
3. 복잡한 식의 계산 1문제
4. 공식을 외우는 팁도 알려주세요
5. 인수분해를 그림으로 설명
6. 곱셈공식과 인수분해의 관계 설명

예시 형식:
[문제 1] 🔢
(x+3)²을 전개하세요.
공식: (a+b)² = a² + 2ab + b²`,
      funFact: '💡 재미있는 사실: (a+b)²을 그림으로 그리면 정사각형의 넓이가 돼요!',
      challenge: '🎯 도전 과제: 99² = (100-1)²을 곱셈공식으로 암산해보세요!'
    },
    3: {
      title: '이차방정식',
      desc: '근의 공식, 판별식',
      prompt: `중학교 3학년 학생을 위한 이차방정식 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 인수분해로 푸는 문제 2개
2. 완전제곱식으로 푸는 문제 1개
3. 근의 공식으로 푸는 문제 2개
4. 판별식 활용 문제 2개
5. 각 방법의 장단점 설명
6. 근의 공식 유도 과정도 간단히 설명

예시 형식:
[문제 1] 🧮
x² - 5x + 6 = 0을 풀어보세요.
방법 1: 인수분해 → (x-2)(x-3) = 0
방법 2: 근의 공식 사용`,
      funFact: '💡 재미있는 사실: 이차방정식의 근의 공식은 4000년 전 바빌로니아에서도 알려져 있었어요!',
      challenge: '🎯 도전 과제: "연속하는 두 자연수의 곱이 90"을 이차방정식으로 풀어보세요!'
    },
    4: {
      title: '이차함수',
      desc: 'y=ax² 그래프',
      prompt: `중학교 3학년 학생을 위한 이차함수 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. y=ax² 그래프의 특징 2문제
2. 꼭짓점과 축의 방정식 2문제
3. 이차함수의 최댓값/최솟값 2문제
4. a값에 따른 그래프 변화 설명
5. 이차함수와 일차함수 그래프 비교
6. 포물선의 실생활 예시 포함

예시 형식:
[문제 1] 📉
y = 2x²과 y = x²의 그래프를 비교하세요.
- 공통점: 원점이 꼭짓점, y축이 대칭축
- 차이점: a가 클수록 좁은 그래프`,
      funFact: '💡 재미있는 사실: 포물선은 분수대 물줄기, 농구공 궤적 등 우리 주변에 많아요!',
      challenge: '🎯 도전 과제: 공을 던졌을 때 궤적이 포물선인지 관찰해보세요!'
    },
    5: {
      title: '피타고라스 정리',
      desc: '직각삼각형과 응용',
      prompt: `중학교 3학년 학생을 위한 피타고라스 정리 문제를 만들어 주세요.

다음 조건을 따라주세요:
1. 빗변의 길이 구하기 2문제
2. 다른 변의 길이 구하기 2문제
3. 응용 문제(거리, 높이) 2문제
4. 피타고라스 수(3,4,5 등) 소개
5. 정리가 왜 성립하는지 그림으로 설명
6. 역(직각삼각형 판별)도 다루기

예시 형식:
[문제 1] 🏠
사다리가 벽에 기대어 있습니다. 사다리 길이가 5m이고
바닥에서 벽까지 거리가 3m일 때, 사다리가 닿는 벽의 높이는?
힌트: a² + b² = c²`,
      funFact: '💡 재미있는 사실: 이 정리는 피타고라스보다 1000년 전 바빌로니아에서 이미 알려져 있었어요!',
      challenge: '🎯 도전 과제: 방의 대각선 길이를 피타고라스 정리로 계산하고 직접 재보세요!'
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

  const openAI = () => {
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
