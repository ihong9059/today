'use client';

import Link from 'next/link';
import { Brain, BookOpen, GraduationCap, School, ChevronRight, Volume2 } from 'lucide-react';

const courses = [
  {
    id: 'elementary',
    name: '초등 영어',
    icon: '🎒',
    color: 'from-green-500 to-emerald-600',
    description: '알파벳, 파닉스, 기초 회화',
    levels: [
      { id: 'grade-3-4', name: '3~4학년', desc: '알파벳, 파닉스, 인사말' },
      { id: 'grade-5-6', name: '5~6학년', desc: 'be동사, 일반동사, 시제 입문' },
    ]
  },
  {
    id: 'middle',
    name: '중등 영어',
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    description: '문법 완성, 독해 기초',
    levels: [
      { id: 'grade-7', name: '중학교 1학년', desc: '문장 형식, 시제, 조동사' },
      { id: 'grade-8', name: '중학교 2학년', desc: '완료시제, to부정사, 수동태' },
      { id: 'grade-9', name: '중학교 3학년', desc: '분사, 관계사, 가정법' },
    ]
  },
  {
    id: 'high',
    name: '고등 영어',
    icon: '🎓',
    color: 'from-purple-500 to-violet-600',
    description: '독해 심화, 수능 대비',
    levels: [
      { id: 'common', name: '고1 공통영어', desc: '문법 심화, 구문 분석' },
      { id: 'reading', name: '영어 독해', desc: '독해 전략, 유형별 접근' },
      { id: 'writing', name: '영어 작문', desc: '영작문, 에세이' },
      { id: 'suneung', name: '수능 영어', desc: '수능 유형, 실전 전략' },
    ]
  },
];

export default function EnglishCoursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
              <Link href="/course/young-su" className="text-gray-300 hover:text-white transition">
                영수 코스
              </Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition">
                전체 강좌
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm font-medium">TTS 듣기 기능 지원</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🇬🇧 영어 코스
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            AI와 함께하는 체계적인 영어 학습<br />
            초등학교부터 수능까지, 9개 코스 · 135개 프롬프트
          </p>
        </div>
      </section>

      {/* TTS 기능 안내 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">1️⃣</span>
              </div>
              <span>프롬프트로 예문 생성</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl">2️⃣</span>
              </div>
              <span>예문 붙여넣기</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-purple-600" />
              </div>
              <span>원어민 발음으로 듣기</span>
            </div>
          </div>
        </div>
      </section>

      {/* 코스 목록 */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{course.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{course.name}</h2>
                    <p className="text-white/80">{course.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.levels.map((level) => (
                    <Link
                      key={level.id}
                      href={`/course/english/${course.id}/${level.id}`}
                      className="block p-4 border-2 border-gray-100 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                            {level.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{level.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                        <span className="px-2 py-1 bg-gray-100 rounded">5일 과정</span>
                        <span className="px-2 py-1 bg-gray-100 rounded">15개 프롬프트</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 학습 방법 안내 */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">📖 영어 학습 방법</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📝</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">1. 프롬프트 복사</h4>
              <p className="text-gray-500 text-sm">AI에게 보낼 프롬프트를 복사합니다</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤖</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">2. AI 학습</h4>
              <p className="text-gray-500 text-sm">ChatGPT/Gemini에서 학습합니다</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">3. 예문 붙여넣기</h4>
              <p className="text-gray-500 text-sm">AI가 만든 예문을 가져옵니다</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Volume2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">4. 듣기 연습</h4>
              <p className="text-gray-500 text-sm">TTS로 발음을 들으며 연습합니다</p>
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
