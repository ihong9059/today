'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Volume2, Calendar } from 'lucide-react';

const days = [
  { day: 1, title: '분사', desc: '현재분사와 과거분사' },
  { day: 2, title: '관계대명사', desc: 'who, which, that' },
  { day: 3, title: '관계부사', desc: 'where, when, why, how' },
  { day: 4, title: '가정법', desc: 'If 조건문 완벽 정복' },
  { day: 5, title: '접속사와 복문', desc: '문장 연결의 기술' },
];

export default function Grade9Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
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
            <span className="text-gray-900 font-medium">중학교 3학년</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🎯</span>
            <div>
              <h1 className="text-3xl font-bold">중학교 3학년 영어</h1>
              <p className="text-purple-100 mt-1">분사, 관계사, 가정법</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full"><Calendar className="w-4 h-4" /><span className="text-sm">5일 과정</span></div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full"><Volume2 className="w-4 h-4" /><span className="text-sm">TTS 듣기 지원</span></div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📅 학습 일정</h2>
        <div className="space-y-4">
          {days.map((item) => (
            <Link key={item.day} href={`/course/english/middle/grade-9/lesson/${item.day}`} className="block bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><span className="text-purple-700 font-bold">Day {item.day}</span></div>
                  <div><h3 className="text-lg font-semibold text-gray-900">{item.title}</h3><p className="text-gray-500 text-sm">{item.desc}</p></div>
                </div>
                <div className="flex items-center gap-3"><span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">3개 프롬프트</span><ChevronRight className="w-5 h-5 text-gray-400" /></div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p></div></footer>
    </div>
  );
}
