'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Volume2, Calendar } from 'lucide-react';

const days = [
  { day: 1, title: '알파벳과 파닉스', desc: '대문자, 소문자, 모음/자음 발음' },
  { day: 2, title: '기초 인사말', desc: '인사하기, 자기소개, 감정 표현' },
  { day: 3, title: '숫자와 색깔', desc: '숫자 1~20, 색깔 12가지' },
  { day: 4, title: '가족과 친구', desc: '가족 호칭, 소개하기' },
  { day: 5, title: '학교와 물건', desc: '학용품, 교실 표현' },
];

export default function Grade34Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
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
              <Link href="/course/english" className="text-gray-300 hover:text-white transition">
                영어 코스
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 브레드크럼 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/course/english" className="hover:text-blue-600">영어 코스</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/course/english" className="hover:text-blue-600">초등 영어</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">3~4학년</span>
          </div>
        </div>
      </div>

      {/* 히어로 */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">🎒</span>
            <div>
              <h1 className="text-3xl font-bold">초등 3~4학년 영어</h1>
              <p className="text-green-100 mt-1">알파벳, 파닉스, 기초 회화, 기본 단어</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">5일 과정</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm">TTS 듣기 지원</span>
            </div>
          </div>
        </div>
      </section>

      {/* 일별 학습 */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">📅 학습 일정</h2>

        <div className="space-y-4">
          {days.map((item) => (
            <Link
              key={item.day}
              href={`/course/english/elementary/grade-3-4/lesson/${item.day}`}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-green-500"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-700 font-bold">Day {item.day}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">3개 프롬프트</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
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
