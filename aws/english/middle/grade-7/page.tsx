'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Volume2, Calendar } from 'lucide-react';

const days = [
  { day: 1, title: '문장의 5형식', desc: '영어 문장 구조의 기초' },
  { day: 2, title: '현재/과거/미래 시제', desc: '3가지 기본 시제 마스터' },
  { day: 3, title: '조동사', desc: 'can, will, may, must 등' },
  { day: 4, title: '형용사와 부사', desc: '수식어의 역할과 위치' },
  { day: 5, title: '전치사', desc: 'in, on, at, with 등' },
];

export default function Grade7Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
            <span className="text-gray-900 font-medium">중학교 1학년</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">📚</span>
            <div>
              <h1 className="text-3xl font-bold">중학교 1학년 영어</h1>
              <p className="text-indigo-100 mt-1">문장 형식, 시제, 조동사</p>
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
            <Link key={item.day} href={`/course/english/middle/grade-7/lesson/${item.day}`} className="block bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center"><span className="text-indigo-700 font-bold">Day {item.day}</span></div>
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
