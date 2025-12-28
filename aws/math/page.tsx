'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Calculator, BookOpen, Trophy, Target, Star, Lightbulb } from 'lucide-react';

const mathCourses = [
  {
    level: '초등',
    courses: [
      { id: 'grade-3-4', title: '초등 3-4학년', desc: '기초 연산, 도형 기초', icon: '🔢', color: 'from-yellow-500 to-orange-500', days: 5 },
      { id: 'grade-5-6', title: '초등 5-6학년', desc: '분수, 소수, 비와 비율', icon: '📐', color: 'from-orange-500 to-red-500', days: 5 },
    ]
  },
  {
    level: '중등',
    courses: [
      { id: 'grade-7', title: '중학교 1학년', desc: '정수, 문자식, 방정식', icon: '📊', color: 'from-green-500 to-teal-500', days: 5 },
      { id: 'grade-8', title: '중학교 2학년', desc: '연립방정식, 함수, 도형', icon: '📈', color: 'from-teal-500 to-cyan-500', days: 5 },
      { id: 'grade-9', title: '중학교 3학년', desc: '이차방정식, 피타고라스', icon: '🎯', color: 'from-cyan-500 to-blue-500', days: 5 },
    ]
  },
  {
    level: '고등',
    courses: [
      { id: 'math1', title: '수학 I', desc: '지수, 로그, 삼각함수', icon: '📉', color: 'from-blue-500 to-indigo-500', days: 5 },
      { id: 'math2', title: '수학 II', desc: '함수의 극한, 미분, 적분', icon: '📈', color: 'from-indigo-500 to-purple-500', days: 5 },
      { id: 'calculus', title: '미적분', desc: '고급 미분, 적분 심화', icon: '🔬', color: 'from-purple-500 to-pink-500', days: 5 },
      { id: 'suneung', title: '수능 수학', desc: '수능 유형별 문제 풀이', icon: '🎯', color: 'from-rose-500 to-red-500', days: 5 },
    ]
  }
];

export default function MathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">홈</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">수학 코스</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Calculator className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">수학 코스</h1>
              <p className="text-blue-100 mt-2 text-lg">AI와 함께하는 체계적인 수학 학습</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">14개 코스</p>
              <p className="text-sm text-blue-100">체계적 커리큘럼</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">AI 문제 풀이</p>
              <p className="text-sm text-blue-100">맞춤형 학습</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">실력 향상</p>
              <p className="text-sm text-blue-100">단계별 성취</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4 text-center">
              <Lightbulb className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">개념 이해</p>
              <p className="text-sm text-blue-100">원리 중심 학습</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">AI 수학 학습 방법</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>1. 각 레슨의 <strong>AI 프롬프트</strong>를 복사하여 ChatGPT 또는 Claude에 붙여넣기</p>
                <p>2. AI가 생성한 <strong>맞춤형 문제</strong>를 풀고 해설을 확인</p>
                <p>3. 이해가 안 되는 부분은 <strong>AI에게 추가 질문</strong></p>
                <p>4. <strong>비슷한 유형</strong> 문제를 더 요청하여 반복 학습</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {mathCourses.map((levelGroup) => (
          <div key={levelGroup.level} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              {levelGroup.level === '초등' && '🌟'}
              {levelGroup.level === '중등' && '📚'}
              {levelGroup.level === '고등' && '🎓'}
              {levelGroup.level} 수학
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levelGroup.courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/course/math/${levelGroup.level === '초등' ? 'elementary' : levelGroup.level === '중등' ? 'middle' : 'high'}/${course.id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{course.icon}</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{course.days}일 과정</span>
                    </div>
                    <h3 className="text-xl font-bold mt-4">{course.title}</h3>
                    <p className="text-white/80 mt-1">{course.desc}</p>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">AI 문제 풀이 지원</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
