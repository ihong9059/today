'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, ChevronLeft, Copy, Check, Sparkles, Trophy, Target, Lightbulb, Star, Youtube, ExternalLink, Calculator, Function, TrendingUp, BarChart3, Compass } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; bgColor: string; textColor: string; icon: any; totalDays: number } } = {
  'math1': { name: '수학 I', color: 'from-blue-500 to-indigo-600', bgColor: 'from-slate-50 to-blue-50', textColor: 'blue', icon: Calculator, totalDays: 45 },
  'math2': { name: '수학 II', color: 'from-indigo-500 to-purple-600', bgColor: 'from-slate-50 to-indigo-50', textColor: 'indigo', icon: Function, totalDays: 45 },
  'prob-stat': { name: '확률과 통계', color: 'from-green-500 to-emerald-600', bgColor: 'from-slate-50 to-green-50', textColor: 'green', icon: BarChart3, totalDays: 30 },
  'calculus': { name: '미적분', color: 'from-purple-500 to-pink-600', bgColor: 'from-slate-50 to-purple-50', textColor: 'purple', icon: TrendingUp, totalDays: 40 },
  'geometry': { name: '기하', color: 'from-orange-500 to-amber-600', bgColor: 'from-slate-50 to-orange-50', textColor: 'orange', icon: Compass, totalDays: 20 },
  'mock-test': { name: '실전 모의고사', color: 'from-red-500 to-rose-600', bgColor: 'from-slate-50 to-red-50', textColor: 'red', icon: Target, totalDays: 30 },
};

// 수학 I 레슨 데이터
const math1Lessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '거듭제곱근',
    desc: 'n제곱근의 정의와 성질',
    prompt: `수능 수학I에서 "거듭제곱근"에 대해 알려주세요.

1. 왜 거듭제곱근을 배워야 할까요?
   - 지수함수와 로그함수의 기초
   - 수능 출제 빈도와 중요성

2. 핵심 개념
   - n제곱근의 정의: n√a
   - 거듭제곱근의 성질
   - 거듭제곱근의 대소 비교
   - 실수 조건과 복소수 조건

3. 수능 출제 유형
   - 거듭제곱근의 계산
   - 성질을 이용한 식의 간단화
   - 무리수의 정수 부분과 소수 부분

4. 연습 문제 (10개)
   - 기본 계산 5문제
   - 수능형 응용 5문제

5. 다음 단계 예고
   (다음은 "지수의 확장"입니다)`,
    funFact: '💡 재미있는 사실: 음수의 제곱근은 실수 범위에서 정의되지 않지만, 복소수를 사용하면 정의할 수 있어요!',
    challenge: '🎯 도전 과제: ³√8 × ⁴√16을 계산하고 가장 간단한 형태로 나타내보세요!',
    youtubeKeyword: '수능 수학 거듭제곱근 개념 강의'
  },
  2: {
    title: '지수의 확장',
    desc: '유리수 지수와 지수법칙',
    prompt: `수능 수학I에서 "지수의 확장"에 대해 알려주세요.

1. 왜 지수의 확장을 배워야 할까요?
   - 정수 지수에서 유리수 지수로
   - 지수함수 정의의 기초

2. 핵심 개념
   - 유리수 지수의 정의: a^(m/n) = ⁿ√(a^m)
   - 지수법칙 5가지
   - 밑이 같은 지수의 연산
   - 지수가 같은 수의 연산

3. 수능 출제 유형
   - 지수법칙을 이용한 계산
   - 조건이 주어진 식의 값 구하기
   - 지수 방정식과 부등식

4. 연습 문제 (10개)

5. 다음 단계 예고
   (다음은 "로그의 정의"입니다)`,
    funFact: '💡 재미있는 사실: 2^(1/2) = √2 ≈ 1.414...는 무리수인데, 이것이 유리수 지수의 핵심이에요!',
    challenge: '🎯 도전 과제: 8^(2/3) × 4^(-1/2)를 계산해보세요!',
    youtubeKeyword: '수능 수학 지수법칙 유리수지수 강의'
  },
  3: {
    title: '로그의 정의',
    desc: '로그의 뜻과 기본 성질',
    prompt: `수능 수학I에서 "로그의 정의"에 대해 알려주세요.

1. 왜 로그를 배워야 할까요?
   - 지수의 역연산
   - 큰 수의 크기 비교
   - 과학/공학에서의 활용

2. 핵심 개념
   - 로그의 정의: a^x = N ⟺ x = log_a N
   - 로그의 기본 성질
   - 로그의 밑 조건: a > 0, a ≠ 1
   - 진수 조건: N > 0

3. 수능 출제 유형
   - 로그 정의를 이용한 계산
   - 밑과 진수 조건 판별
   - 로그 방정식의 기초

4. 연습 문제 (10개)

5. 다음 단계 예고
   (다음은 "로그의 성질"입니다)`,
    funFact: '💡 재미있는 사실: 로그(log)는 라틴어 "logos"(비율)와 "arithmos"(수)에서 온 말이에요!',
    challenge: '🎯 도전 과제: log_2 8, log_3 81, log_5 125를 암산으로 구해보세요!',
    youtubeKeyword: '수능 수학 로그 정의 개념 강의'
  },
};

// 수학 II 레슨 데이터
const math2Lessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '함수의 극한 (1)',
    desc: '극한의 정의와 기본 계산',
    prompt: `수능 수학II에서 "함수의 극한"에 대해 알려주세요.

1. 왜 함수의 극한을 배워야 할까요?
   - 미분의 기초 개념
   - 연속성 판단의 도구
   - 수능 필수 개념

2. 핵심 개념
   - 극한의 직관적 이해
   - 좌극한과 우극한
   - 극한의 존재 조건
   - 극한값 계산법

3. 수능 출제 유형
   - 그래프에서 극한값 찾기
   - 대수적 계산
   - 0/0 부정형 해결

4. 연습 문제 (10개)

5. 다음 단계 예고
   (다음은 "극한의 성질"입니다)`,
    funFact: '💡 재미있는 사실: 극한 개념은 고대 그리스 제논의 역설을 해결하기 위해 발전했어요!',
    challenge: '🎯 도전 과제: lim(x→2) (x²-4)/(x-2)를 계산해보세요!',
    youtubeKeyword: '수능 수학 함수의 극한 개념 강의'
  },
  2: {
    title: '함수의 극한 (2)',
    desc: '극한의 성질과 응용',
    prompt: `수능 수학II에서 "극한의 성질"에 대해 알려주세요.

1. 극한의 사칙연산 성질
   - 합/차의 극한
   - 곱/몫의 극한
   - 상수배의 극한

2. 핵심 공식
   - lim(x→a) [f(x) ± g(x)] = lim f(x) ± lim g(x)
   - lim(x→a) [f(x) × g(x)] = lim f(x) × lim g(x)
   - 샌드위치 정리

3. 수능 출제 유형
   - 극한의 성질을 이용한 계산
   - 미정계수 결정
   - 수렴/발산 판정

4. 연습 문제 (10개)

5. 다음 단계 예고
   (다음은 "부정형의 극한"입니다)`,
    funFact: '💡 재미있는 사실: 샌드위치 정리는 두 함수 사이에 끼인 함수의 극한을 구하는 강력한 도구예요!',
    challenge: '🎯 도전 과제: lim(x→0) x²sin(1/x)를 샌드위치 정리로 구해보세요!',
    youtubeKeyword: '수능 수학 극한의 성질 사칙연산 강의'
  },
};

// 미적분 레슨 데이터
const calculusLessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '수열의 극한 (1)',
    desc: '수열의 수렴과 발산',
    prompt: `수능 미적분에서 "수열의 극한"에 대해 알려주세요.

1. 왜 수열의 극한을 배워야 할까요?
   - 급수 개념의 기초
   - 함수의 극한으로 확장
   - 수능 선택과목 핵심

2. 핵심 개념
   - 수열의 수렴/발산 정의
   - 수렴하는 수열의 극한값
   - 발산의 종류: +∞, -∞, 진동

3. 주요 극한
   - lim(n→∞) 1/n = 0
   - lim(n→∞) rⁿ (|r|<1, |r|>1, r=1)
   - 등비수열의 극한

4. 연습 문제 (10개)

5. 다음 단계 예고
   (다음은 "수열 극한의 성질"입니다)`,
    funFact: '💡 재미있는 사실: 무한히 많은 수를 더해도 유한한 값이 될 수 있다는 것이 수열 극한의 핵심이에요!',
    challenge: '🎯 도전 과제: lim(n→∞) (3n²+2n)/(n²+1)를 계산해보세요!',
    youtubeKeyword: '수능 미적분 수열의 극한 개념 강의'
  },
};

// 확률과 통계 레슨 데이터
const probStatLessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '순열',
    desc: '순서가 있는 배열',
    prompt: `수능 확률과 통계에서 "순열"에 대해 알려주세요.

1. 왜 순열을 배워야 할까요?
   - 경우의 수 계산의 기본
   - 확률 계산의 기초
   - 수능 필수 개념

2. 핵심 개념
   - 순열의 정의: 순서를 고려한 배열
   - nPr = n!/(n-r)!
   - 같은 것이 있는 순열
   - 원순열

3. 수능 출제 유형
   - 기본 순열 계산
   - 조건이 있는 순열
   - 자리 배치 문제

4. 연습 문제 (10개)

5. 다음 단계 예고
   (다음은 "조합"입니다)`,
    funFact: '💡 재미있는 사실: 52장의 카드를 섞는 경우의 수는 52! ≈ 8×10⁶⁷으로, 우주의 원자 수보다 많아요!',
    challenge: '🎯 도전 과제: 5명이 원형 테이블에 앉는 경우의 수를 구해보세요!',
    youtubeKeyword: '수능 확률과통계 순열 개념 강의'
  },
};

// 기하 레슨 데이터
const geometryLessons: { [day: number]: { title: string; desc: string; prompt: string; funFact: string; challenge: string; youtubeKeyword: string } } = {
  1: {
    title: '포물선',
    desc: '포물선의 정의와 방정식',
    prompt: `수능 기하에서 "포물선"에 대해 알려주세요.

1. 왜 포물선을 배워야 할까요?
   - 이차곡선의 시작
   - 물리학/공학에서의 활용
   - 수능 기하 핵심 단원

2. 핵심 개념
   - 포물선의 정의: 초점과 준선에서 등거리인 점들의 자취
   - 표준형: y² = 4px, x² = 4py
   - 초점, 준선, 꼭짓점
   - 포물선의 접선

3. 수능 출제 유형
   - 초점과 준선 찾기
   - 포물선 위의 점과 거리
   - 포물선과 직선의 관계

4. 연습 문제 (10개)

5. 다음 단계 예고
   (다음은 "타원"입니다)`,
    funFact: '💡 재미있는 사실: 포물선 모양의 안테나는 모든 신호를 초점에 모으기 때문에 위성 안테나로 사용돼요!',
    challenge: '🎯 도전 과제: 포물선 y² = 8x의 초점과 준선을 구해보세요!',
    youtubeKeyword: '수능 기하 포물선 개념 강의'
  },
};

// 기본 레슨 데이터
const getDefaultLesson = (subject: string, day: number) => ({
  title: `Day ${day} 학습`,
  desc: `${subjectInfo[subject]?.name || subject} ${day}일차`,
  prompt: `${subjectInfo[subject]?.name || subject} ${day}일차 학습 내용을 자세히 알려주세요.

1. 오늘의 학습 목표
2. 핵심 개념 설명
   - 정의와 공식
   - 예제 풀이
3. 수능 출제 유형
4. 연습 문제 (10개)
5. 다음 단계 예고`,
  funFact: '💡 학습 팁: 수학은 개념 이해가 먼저! 공식만 외우지 말고 원리를 이해하세요.',
  challenge: '🎯 도전 과제: 오늘 배운 내용으로 문제 5개를 직접 풀어보세요!',
  youtubeKeyword: `수능 ${subjectInfo[subject]?.name || subject} 강의`
});

const getLessonData = (subject: string, day: number) => {
  switch (subject) {
    case 'math1':
      return math1Lessons[day] || getDefaultLesson(subject, day);
    case 'math2':
      return math2Lessons[day] || getDefaultLesson(subject, day);
    case 'calculus':
      return calculusLessons[day] || getDefaultLesson(subject, day);
    case 'prob-stat':
      return probStatLessons[day] || getDefaultLesson(subject, day);
    case 'geometry':
      return geometryLessons[day] || getDefaultLesson(subject, day);
    default:
      return getDefaultLesson(subject, day);
  }
};

export default function MathSuneungLessonPage() {
  const params = useParams();
  const subject = params.subject as string;
  const day = Number(params.day);
  const subjectData = subjectInfo[subject];
  const lesson = getLessonData(subject, day);

  const [copied, setCopied] = useState(false);
  const [selectedAI, setSelectedAI] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`math-suneung-${subject}-day${day}-completed`);
    if (saved === 'true') setCompleted(true);
  }, [subject, day]);

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = async () => {
    await navigator.clipboard.writeText(lesson.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    const urls = {
      claude: 'https://claude.ai/new',
      chatgpt: 'https://chat.openai.com/',
      gemini: 'https://gemini.google.com/',
    };
    window.open(urls[selectedAI], '_blank');
  };

  const markComplete = () => {
    setCompleted(true);
    setShowConfetti(true);
    localStorage.setItem(`math-suneung-${subject}-day${day}-completed`, 'true');

    // 전체 완료 목록 업데이트
    const savedList = localStorage.getItem(`math-suneung-${subject}-completed`);
    const completedList = savedList ? JSON.parse(savedList) : [];
    if (!completedList.includes(day)) {
      completedList.push(day);
      localStorage.setItem(`math-suneung-${subject}-completed`, JSON.stringify(completedList));
    }

    setTimeout(() => setShowConfetti(false), 3000);
  };

  const openYouTube = () => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(lesson.youtubeKeyword)}`;
    window.open(searchUrl, '_blank');
  };

  if (!subjectData) {
    return <div className="min-h-screen flex items-center justify-center">과목을 찾을 수 없습니다.</div>;
  }

  const maxDay = subjectData.totalDays;
  const IconComponent = subjectData.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${subjectData.bgColor}`}>
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
            <Link href="/course/math-suneung" className="hover:text-indigo-600">수학수능 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/course/math-suneung/${subject}`} className="hover:text-indigo-600">{subjectData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Day {day}</span>
          </div>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${subjectData.color} text-white py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">D{day}</span>
              </div>
              <div>
                <div className="text-white/70 text-sm mb-1">{subjectData.name}</div>
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
              <p className="text-amber-700 text-sm">{lesson.funFact}</p>
            </div>
          </div>
        </div>

        {/* AI 프롬프트 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Target className={`w-5 h-5 text-${subjectData.textColor}-500`} />
              AI 프롬프트
            </h2>
            <div className="flex items-center gap-2">
              <select
                value={selectedAI}
                onChange={(e) => setSelectedAI(e.target.value as 'claude' | 'chatgpt' | 'gemini')}
                className="text-sm border rounded-lg px-3 py-1.5"
              >
                <option value="claude">Claude</option>
                <option value="chatgpt">ChatGPT</option>
                <option value="gemini">Gemini</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
            {lesson.prompt}
          </div>

          <div className="flex gap-3">
            <button onClick={copyPrompt} className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : `bg-gradient-to-r ${subjectData.color} text-white`}`}>
              {copied ? <><Check className="w-5 h-5" /> 복사됨!</> : <><Copy className="w-5 h-5" /> 프롬프트 복사</>}
            </button>
            <button onClick={openAI} className="flex-1 bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI 열기
            </button>
          </div>
        </div>

        {/* 유튜브 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Youtube className="w-5 h-5 text-red-500" />
            유튜브 참고 영상
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            관련 강의 영상을 검색하여 심화 학습을 해보세요.
          </p>
          <button
            onClick={openYouTube}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
          >
            <Youtube className="w-5 h-5" />
            유튜브에서 검색하기
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* 도전 과제 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
          <p className="text-purple-800 font-medium">{lesson.challenge}</p>
        </div>

        {/* 완료 버튼 */}
        {!completed ? (
          <button
            onClick={markComplete}
            className={`w-full bg-gradient-to-r ${subjectData.color} text-white py-4 rounded-xl font-bold text-lg transition hover:opacity-90 flex items-center justify-center gap-2`}
          >
            <Trophy className="w-6 h-6" />
            학습 완료!
          </button>
        ) : (
          <div className="bg-green-100 text-green-800 py-4 rounded-xl font-bold text-lg text-center flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6" />
            학습 완료! 수고하셨습니다!
          </div>
        )}

        {/* 네비게이션 */}
        <div className="flex justify-between mt-8">
          {day > 1 ? (
            <Link
              href={`/course/math-suneung/${subject}/lesson/${day - 1}`}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              이전 레슨
            </Link>
          ) : <div />}
          {day < maxDay ? (
            <Link
              href={`/course/math-suneung/${subject}/lesson/${day + 1}`}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
            >
              다음 레슨
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href={`/course/math-suneung/${subject}`}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition font-medium"
            >
              코스 완료!
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
