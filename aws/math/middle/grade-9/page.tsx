'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Calculator, Calendar } from 'lucide-react';

const days = [
  { day: 1, title: '제곱근과 실수', desc: '무리수, 제곱근의 성질' },
  { day: 2, title: '다항식의 곱셈', desc: '곱셈공식, 인수분해' },
  { day: 3, title: '이차방정식', desc: '근의 공식, 판별식' },
  { day: 4, title: '이차함수', desc: 'y=ax² 그래프' },
  { day: 5, title: '피타고라스 정리', desc: '직각삼각형과 응용' },
];

export default function Grade9MathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
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
            <span className="text-gray-900 font-medium">중학교 3학년</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🎯</span>
            <div>
              <h1 className="text-3xl font-bold">중학교 3학년 수학</h1>
              <p className="text-cyan-100 mt-1">이차방정식, 피타고라스</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full"><Calendar className="w-4 h-4" /><span className="text-sm">5일 과정</span></div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full"><Calculator className="w-4 h-4" /><span className="text-sm">AI 문제 풀이</span></div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📅 학습 일정</h2>
        <div className="space-y-4">
          {days.map((item) => (
            <Link key={item.day} href={`/course/math/middle/grade-9/lesson/${item.day}`} className="block bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-cyan-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center"><span className="text-cyan-700 font-bold">Day {item.day}</span></div>
                  <div><h3 className="text-lg font-semibold text-gray-900">{item.title}</h3><p className="text-gray-500 text-sm">{item.desc}</p></div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p></div></footer>
    </div>
  );
}
