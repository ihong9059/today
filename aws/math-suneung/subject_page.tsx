'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, ChevronRight, CheckCircle, Calculator, Function, TrendingUp, BarChart3, Compass, Target } from 'lucide-react';

const subjectInfo: { [key: string]: { name: string; color: string; colorLight: string; icon: any; description: string; totalDays: number } } = {
  'math1': { name: '수학 I', color: 'from-blue-500 to-indigo-600', colorLight: 'blue', icon: Calculator, description: '지수로그, 삼각함수, 수열', totalDays: 45 },
  'math2': { name: '수학 II', color: 'from-indigo-500 to-purple-600', colorLight: 'indigo', icon: Function, description: '함수의 극한, 미분, 적분', totalDays: 45 },
  'prob-stat': { name: '확률과 통계', color: 'from-green-500 to-emerald-600', colorLight: 'green', icon: BarChart3, description: '경우의 수, 확률, 통계', totalDays: 30 },
  'calculus': { name: '미적분', color: 'from-purple-500 to-pink-600', colorLight: 'purple', icon: TrendingUp, description: '급수, 미분법, 적분법', totalDays: 40 },
  'geometry': { name: '기하', color: 'from-orange-500 to-amber-600', colorLight: 'orange', icon: Compass, description: '이차곡선, 벡터, 공간도형', totalDays: 20 },
  'mock-test': { name: '실전 모의고사', color: 'from-red-500 to-rose-600', colorLight: 'red', icon: Target, description: '시간 배분 전략, 실전 훈련', totalDays: 30 },
};

const unitInfo: { [key: string]: { units: { name: string; days: number[] }[] } } = {
  'math1': {
    units: [
      { name: '1단원: 지수', days: [1, 2, 3, 4, 5, 6, 7] },
      { name: '2단원: 로그', days: [8, 9, 10, 11, 12, 13, 14] },
      { name: '3단원: 지수함수와 로그함수', days: [15, 16, 17, 18, 19, 20, 21, 22] },
      { name: '4단원: 삼각함수', days: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32] },
      { name: '5단원: 수열', days: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'math2': {
    units: [
      { name: '1단원: 함수의 극한', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: '2단원: 함수의 연속', days: [11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '3단원: 미분계수와 도함수', days: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32] },
      { name: '4단원: 정적분', days: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45] },
    ],
  },
  'prob-stat': {
    units: [
      { name: '1단원: 경우의 수', days: [1, 2, 3, 4, 5, 6, 7, 8] },
      { name: '2단원: 확률', days: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] },
      { name: '3단원: 통계', days: [19, 20, 21, 22, 23, 24, 25, 26] },
      { name: '4단원: 실전 문제', days: [27, 28, 29, 30] },
    ],
  },
  'calculus': {
    units: [
      { name: '1단원: 수열의 극한', days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { name: '2단원: 급수', days: [11, 12, 13, 14, 15, 16] },
      { name: '3단원: 미분법', days: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30] },
      { name: '4단원: 적분법', days: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40] },
    ],
  },
  'geometry': {
    units: [
      { name: '1단원: 이차곡선', days: [1, 2, 3, 4, 5, 6] },
      { name: '2단원: 평면벡터', days: [7, 8, 9, 10, 11, 12] },
      { name: '3단원: 공간도형과 공간좌표', days: [13, 14, 15, 16, 17, 18, 19, 20] },
    ],
  },
  'mock-test': {
    units: [
      { name: '1단원: 시간 배분 전략', days: [1, 2, 3] },
      { name: '2단원: 공통과목 실전', days: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
      { name: '3단원: 선택과목 실전', days: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
      { name: '4단원: 통합 모의고사', days: [24, 25, 26, 27, 28, 29, 30] },
    ],
  },
};

export default function MathSuneungSubjectPage() {
  const params = useParams();
  const subject = params.subject as string;
  const info = subjectInfo[subject];
  const units = unitInfo[subject]?.units || [];

  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`math-suneung-${subject}-completed`);
    if (saved) {
      setCompletedDays(JSON.parse(saved));
    }
  }, [subject]);

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">과목을 찾을 수 없습니다</h1>
          <Link href="/course/math-suneung" className="text-indigo-600 hover:underline">
            수학수능 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = info.icon;
  const progress = Math.round((completedDays.length / info.totalDays) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
            <div className="flex items-center space-x-6">
              <Link href="/course/math-suneung" className="text-gray-300 hover:text-white transition">
                수학수능 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 과목 헤더 */}
      <section className={`bg-gradient-to-r ${info.color} text-white py-12`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/course/math-suneung" className="hover:underline">수학수능 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{info.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{info.name}</h1>
              <p className="text-white/80 mt-1">{info.description}</p>
            </div>
          </div>

          {/* 진행률 */}
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">학습 진행률</span>
              <span className="text-sm font-medium">{completedDays.length} / {info.totalDays}일 완료</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 단원별 레슨 목록 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {units.map((unit, unitIdx) => (
            <div key={unitIdx} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="font-bold text-gray-900">{unit.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {unit.days.filter(d => completedDays.includes(d)).length} / {unit.days.length}일 완료
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 gap-2">
                  {unit.days.map((day) => {
                    const isCompleted = completedDays.includes(day);
                    return (
                      <Link
                        key={day}
                        href={`/course/math-suneung/${subject}/lesson/${day}`}
                        className={`
                          aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition
                          ${isCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          day
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 안내 */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">학습 방법</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">1</span>
              </div>
              <p className="text-sm text-gray-600">AI 프롬프트를 복사하여 ChatGPT/Claude에 붙여넣기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">2</span>
              </div>
              <p className="text-sm text-gray-600">AI의 설명을 읽고 핵심 개념 이해하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">3</span>
              </div>
              <p className="text-sm text-gray-600">연습 문제를 풀고 오답 분석하기</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">4</span>
              </div>
              <p className="text-sm text-gray-600">유튜브 참고 영상으로 심화 학습</p>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
