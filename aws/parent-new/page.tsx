'use client';

import Link from 'next/link';
import { Brain, ChevronRight, Cpu, Users, BookOpen, Target, Compass, Youtube, GraduationCap } from 'lucide-react';

const courses = [
  {
    id: 'ai-basics',
    name: '1단계: AI 기초 마스터',
    icon: Cpu,
    color: 'from-blue-500 to-indigo-600',
    description: 'ChatGPT, Claude, Gemini 사용법 완벽 정복',
    topics: ['AI 도구 시작', '프롬프트 작성법', 'AI 윤리와 안전', '일상 활용'],
    difficulty: '입문',
    totalDays: 15,
    target: '학부형 단독',
    badge: '필수',
  },
  {
    id: 'mindset',
    name: '2단계: 마인드셋 변화',
    icon: Users,
    color: 'from-purple-500 to-pink-600',
    description: '가르치는 부모에서 함께 배우는 부모로',
    topics: ['역할 전환', '질문하는 법', 'AI 시대 역량', '성장 마인드셋'],
    difficulty: '기본',
    totalDays: 10,
    target: '학부형 단독',
    badge: '핵심',
  },
  {
    id: 'education',
    name: '3단계: 자녀 교육 실전',
    icon: BookOpen,
    color: 'from-green-500 to-emerald-600',
    description: 'AI 활용 교과별 학습 지원 실습',
    topics: ['학습 환경 구축', '교과별 AI 활용', '자기주도 학습 유도'],
    difficulty: '실전',
    totalDays: 20,
    target: '학부형 + 자녀',
    badge: '실습',
    linkedCourses: ['영어', '수학', '국어', '탐구'],
  },
  {
    id: 'career',
    name: '4단계: 진로 교육',
    icon: Compass,
    color: 'from-orange-500 to-red-600',
    description: 'AI 시대 진로 탐색과 설계',
    topics: ['미래 직업 이해', '적성 탐색', 'MBTI 진로', '진로 로드맵'],
    difficulty: '심화',
    totalDays: 15,
    target: '학부형 + 자녀',
    badge: '완성',
  },
];

// 연계 대학진학 코스
const linkedCourses = [
  { id: 'english', name: '영어', icon: '🇬🇧', link: '/course/english', desc: '초등~고등 영어' },
  { id: 'math', name: '수학', icon: '🔢', link: '/course/math', desc: '초등~고등 수학' },
  { id: 'korean', name: '국어', icon: '📝', link: '/course/korean', desc: '문학, 독서, 화법' },
  { id: 'english-suneung', name: '영어수능', icon: '🎯', link: '/course/english-suneung', desc: '수능 영어 집중' },
  { id: 'math-suneung', name: '수학수능', icon: '📐', link: '/course/math-suneung', desc: '수능 수학 집중' },
  { id: 'history-suneung', name: '한국사', icon: '🏛️', link: '/course/history-suneung', desc: '수능 한국사' },
  { id: 'exploration', name: '탐구영역', icon: '📊', link: '/course/exploration', desc: '사탐/과탐 9과목' },
];

export default function ParentTrackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
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
              <Link href="/courses" className="text-gray-300 hover:text-white transition">
                전체 코스
              </Link>
              <Link href="/course/english" className="text-gray-300 hover:text-white transition">
                영어
              </Link>
              <Link href="/course/math" className="text-gray-300 hover:text-white transition">
                수학
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">학부형 전용 트랙</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            👨‍👩‍👧 학부형 AI 교육 트랙
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            AI 시대, 부모가 먼저 변해야 자녀가 변합니다<br />
            <strong>AI 도구 마스터 → 마인드셋 변화 → 자녀 교육 → 진로 설계</strong>
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">4단계 과정</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">60일 커리큘럼</span>
            <span className="px-4 py-2 bg-white/20 rounded-full text-sm">대학진학 코스 연계</span>
          </div>
        </div>
      </section>

      {/* 핵심 메시지 */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-bold text-gray-900">학부형이 먼저</h3>
              <p className="text-sm text-gray-600">AI 도구 사용법을 먼저 익힙니다</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-bold text-gray-900">역할 전환</h3>
              <p className="text-sm text-gray-600">가르치는 → 함께 배우는 부모</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-bold text-gray-900">실전 교육</h3>
              <p className="text-sm text-gray-600">AI로 자녀 학습 지원</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-bold text-gray-900">진로 설계</h3>
              <p className="text-sm text-gray-600">AI 시대 진로 탐색</p>
            </div>
          </div>
        </div>
      </section>

      {/* 코스 목록 */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">4단계 커리큘럼</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {courses.map((course, idx) => {
            const IconComponent = course.icon;
            return (
              <Link
                key={course.id}
                href={`/course/parent/${course.id}`}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-white/30 px-2 py-0.5 rounded">{course.badge}</span>
                          <span className="text-xs bg-white/30 px-2 py-0.5 rounded">{course.target}</span>
                        </div>
                        <h2 className="text-xl font-bold">{course.name}</h2>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{idx + 1}</div>
                      <div className="text-xs text-white/70">단계</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.topics.map((topic, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>

                  {course.linkedCourses && (
                    <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                      <p className="text-xs text-indigo-600 font-medium mb-1">🔗 연계 코스</p>
                      <p className="text-sm text-indigo-700">{course.linkedCourses.join(' · ')}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{course.totalDays}일 과정</span>
                    <span className="text-purple-600 font-medium group-hover:translate-x-1 transition flex items-center gap-1">
                      시작하기 <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 연계 대학진학 코스 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-900">연계 대학진학 코스</h3>
          </div>
          <p className="text-gray-600 mb-6">
            3단계 "자녀 교육 실전"에서 아래 코스들과 함께 AI 활용 학습을 진행합니다.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {linkedCourses.map((course) => (
              <Link
                key={course.id}
                href={course.link}
                className="p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition text-center group"
              >
                <div className="text-3xl mb-2">{course.icon}</div>
                <h4 className="font-semibold text-gray-900 text-sm">{course.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{course.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* 학습 효과 */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">60일 후 변화</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-bold text-purple-600 mb-4">👨‍👩‍👧 학부형</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  AI 도구를 능숙하게 활용할 수 있습니다
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  자녀 학습을 효과적으로 지원할 수 있습니다
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  진로 상담 대화를 자연스럽게 할 수 있습니다
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  함께 배우는 부모로 역할이 전환됩니다
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h4 className="font-bold text-indigo-600 mb-4">👧 자녀</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  AI를 올바르게 활용하는 습관이 형성됩니다
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  스스로 질문하고 탐구하는 능력이 향상됩니다
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  자기주도 학습 습관이 형성됩니다
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  미래 진로에 대한 비전을 갖게 됩니다
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 학습 순서 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">권장 학습 순서</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="bg-blue-100 px-6 py-4 rounded-xl text-center">
              <div className="text-2xl mb-1">1️⃣</div>
              <p className="font-semibold text-blue-800">AI 기초</p>
              <p className="text-xs text-blue-600">15일 · 학부형</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-purple-100 px-6 py-4 rounded-xl text-center">
              <div className="text-2xl mb-1">2️⃣</div>
              <p className="font-semibold text-purple-800">마인드셋</p>
              <p className="text-xs text-purple-600">10일 · 학부형</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-green-100 px-6 py-4 rounded-xl text-center">
              <div className="text-2xl mb-1">3️⃣</div>
              <p className="font-semibold text-green-800">자녀 교육</p>
              <p className="text-xs text-green-600">20일 · 함께</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="bg-orange-100 px-6 py-4 rounded-xl text-center">
              <div className="text-2xl mb-1">4️⃣</div>
              <p className="font-semibold text-orange-800">진로 교육</p>
              <p className="text-xs text-orange-600">15일 · 함께</p>
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
