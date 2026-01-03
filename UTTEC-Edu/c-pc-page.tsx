'use client';

import CodingTabNav from '@/components/CodingTabNav';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain, Menu, X, Clock, BookOpen } from 'lucide-react';

const levels = [
  {
    id: '초급',
    title: '초급',
    subtitle: '문법 마스터',
    icon: '🔷',
    color: 'from-blue-600 to-indigo-700',
    days: '15일',
    dayRange: 'Day 1-15',
    topics: ['변수/자료형', '조건문/반복문', '함수', '배열', '포인터 기초'],
  },
  {
    id: '중급',
    title: '중급',
    subtitle: '자료구조 & 파일',
    icon: '🔶',
    color: 'from-orange-500 to-red-600',
    days: '30일',
    dayRange: 'Day 16-45',
    topics: ['구조체', '동적 메모리', '파일 I/O', '연결 리스트', '스택/큐'],
  },
  {
    id: '고급',
    title: '고급',
    subtitle: '시스템 & 네트워크',
    icon: '🔴',
    color: 'from-red-600 to-purple-700',
    days: '45일',
    dayRange: 'Day 46-90',
    topics: ['시스템 콜', '프로세스', '쓰레드', '소켓 프로그래밍', '최종 프로젝트'],
  },
];

export default function CPCCoursePage() {
  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">UTTEC Edu</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-white transition">코스</Link>
              <span className="text-white font-medium">{userName}님</span>
            </nav>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-300 hover:text-white">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      <CodingTabNav currentCourse="c-pc" />

      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 border-b border-slate-700 px-4 py-4">
          <Link href="/" className="block py-2 text-slate-300">코스</Link>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm mb-4">
            <Clock className="w-4 h-4 mr-2" />
            총 90일 과정 • 3개 레벨
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            💻 C언어 (PC)
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            순수 C언어 프로그래밍! 문법부터 시스템 프로그래밍까지
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {levels.map((level) => (
            <Link
              key={level.id}
              href={`/course/coding/c-pc/${level.id}`}
              className="group relative bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-500 transition-all duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${level.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{level.icon}</span>
                  <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">{level.days}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{level.title}</h3>
                <p className="text-slate-400 mb-4">{level.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {level.topics.map((topic, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">{topic}</span>
                  ))}
                </div>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>학습 시작하기</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
