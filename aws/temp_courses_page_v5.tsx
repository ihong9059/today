'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Brain, Briefcase, Users, GraduationCap, CheckCircle, Code, Cpu, Database, Server, Terminal, Menu, X } from 'lucide-react';

// 교육 트랙 데이터
const trackData = [
  {
    id: 'parent',
    name: '학부형 트랙',
    icon: '👨‍👩‍👧',
    color: 'from-purple-500 to-indigo-600',
    description: '자녀와 함께 진로 탐색',
    features: ['AI 기초 이해', '진로 탐색 중심', '자녀 적성 파악'],
    courses: [
      { id: 'ai-intro', name: 'AI 시대 이해하기', icon: '🤖' },
      { id: 'chatgpt', name: 'ChatGPT 활용법', icon: '💬' },
      { id: 'career-with-ai', name: 'AI와 함께하는 진로 탐색', icon: '🎯' },
      { id: 'mbti-job', name: 'MBTI로 알아보는 직업', icon: '🧠' },
      { id: 'future-jobs', name: '미래 유망 직종 안내', icon: '🚀' },
    ],
  },
  {
    id: 'beginner',
    name: '사회초년생 트랙',
    icon: '💼',
    color: 'from-blue-500 to-cyan-600',
    description: '실무 역량 강화 + 포트폴리오',
    features: ['AI 활용 실무', '포트폴리오 제작', '취업 준비'],
    courses: [
      { id: 'ai-tools', name: 'AI 도구 마스터', icon: '🛠️' },
      { id: 'prompt', name: '효과적인 프롬프트 작성법', icon: '✍️' },
      { id: 'ai-project', name: 'AI 협업 프로젝트', icon: '👥' },
      { id: 'portfolio', name: '포트폴리오 완성하기', icon: '📁' },
      { id: 'job-strategy', name: '취업 연계 전략', icon: '🎯' },
    ],
  },
  {
    id: 'coding',
    name: '코딩 전문가',
    icon: '💻',
    color: 'from-green-500 to-emerald-600',
    description: 'PC부터 임베디드까지 실무 프로그래밍',
    features: ['다양한 언어', '하드웨어 제어', '실무 프로젝트'],
    courses: [
      { id: 'c-pc', name: 'C 언어 (PC)', icon: '🖥️', link: '/course/coding/c-pc' },
      { id: 'python-pc', name: 'Python (PC)', icon: '🐍', link: '/course/coding/python-pc' },
      { id: 'c-esp32', name: 'C 언어 (ESP32)', icon: '🔌', link: '/course/coding/c-esp32', highlight: true, image: '/images/esp32-board.jpg' },
      { id: 'python-uttec', name: 'Python (UTTEC Shield)', icon: '🛡️', link: '/course/coding/python-uttec' },
      { id: 'nodejs', name: 'Node.js (PC)', icon: '🟢', link: '/course/coding/nodejs' },
      { id: 'database', name: 'Database (PC)', icon: '🗄️', link: '/course/coding/database' },
      { id: 'nodered', name: 'Node-RED (PC)', icon: '🔴', link: '/course/coding/nodered' },
    ],
  },
  {
    id: 'teacher',
    name: '교사/교육자',
    icon: '📚',
    color: 'from-amber-500 to-orange-600',
    description: 'AI 활용 교육 전문가',
    features: ['교수법 이해', 'AI 교육 자료 제작', '수업 설계'],
    courses: [
      { id: 'edu-basic', name: '교육학 기초', icon: '📖' },
      { id: 'teaching', name: '효과적인 교수법', icon: '🎓' },
      { id: 'ai-edu-material', name: 'AI 교육 자료 제작', icon: '📝' },
      { id: 'class-design', name: '수업 설계 및 모의 수업', icon: '🏫' },
      { id: 'edu-portfolio', name: '교육 콘텐츠 포트폴리오', icon: '📁' },
    ],
  },
  {
    id: 'career-change',
    name: '진로 전환자',
    icon: '🔄',
    color: 'from-rose-500 to-pink-600',
    description: '새로운 분야 도전',
    features: ['새 분야 기초', '가능성 확인', '단계별 학습'],
    courses: [
      { id: 'find-field', name: '나에게 맞는 분야 찾기', icon: '🔍' },
      { id: 'job-simulation', name: '직업 체험 시뮬레이션', icon: '🎮' },
      { id: 'new-skill', name: '새 분야 기초 역량', icon: '💪' },
      { id: 'roadmap', name: '전환 로드맵 수립', icon: '🗺️' },
    ],
  },
  {
    id: 'free',
    name: 'Free 체험',
    icon: '🎁',
    color: 'from-teal-500 to-cyan-600',
    description: '무료로 시작하기',
    features: ['무료 콘텐츠', '기초 체험', 'MBTI 검사'],
    courses: [
      { id: 'intro', name: 'AI 시대 진로교육 소개', icon: '👋' },
      { id: 'mbti-test', name: 'MBTI/MMTIC 검사', icon: '🧪' },
      { id: 'track-preview', name: '트랙 미리보기', icon: '👀' },
    ],
  },
];

// 트랙 카드 컴포넌트
function TrackCard({ track, isSelected, onClick }: { track: typeof trackData[0]; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-2xl text-left transition-all duration-300 ${
        isSelected
          ? `bg-gradient-to-br ${track.color} text-white shadow-lg scale-105`
          : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg'
      }`}
    >
      <div className="text-4xl mb-3">{track.icon}</div>
      <h3 className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
        {track.name}
      </h3>
      <p className={`text-sm mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
        {track.description}
      </p>
      <ChevronRight className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
    </button>
  );
}

// 수업 카드 컴포넌트 (레벨 선택 포함)
function CourseCard({ course, trackColor }: { course: any; trackColor: string }) {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const levels = ['초급', '중급', '고급'];

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition ${
      course.highlight ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-100'
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{course.icon}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{course.name}</h4>
          {course.highlight && (
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
              실습 보드 필요
            </span>
          )}
        </div>
      </div>

      {/* 보드 이미지 (있는 경우) */}
      {course.image && (
        <div className="mb-3 rounded-lg overflow-hidden">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-32 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* 레벨 선택 버튼 */}
      <div className="flex gap-2 mb-3">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
              selectedLevel === level
                ? level === '초급' ? 'bg-green-500 text-white' :
                  level === '중급' ? 'bg-yellow-500 text-white' :
                  'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* 선택된 레벨로 이동 버튼 */}
      {selectedLevel && (
        <Link
          href={course.link ? `${course.link}/${selectedLevel}` : `#`}
          className={`block w-full py-2 text-center rounded-lg font-medium text-white transition bg-gradient-to-r ${trackColor}`}
        >
          {selectedLevel} 강의 시작하기 →
        </Link>
      )}
    </div>
  );
}

// 서브카테고리 패널
function CoursePanel({ track }: { track: typeof trackData[0] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{track.icon}</span>
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{track.name}</h4>
          <div className="flex gap-2 mt-1">
            {track.features.map((feature, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 수업 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {track.courses.map((course) => (
          <CourseCard key={course.id} course={course} trackColor={track.color} />
        ))}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTrackClick = (trackId: string) => {
    if (selectedTrack === trackId) {
      setSelectedTrack(null);
    } else {
      setSelectedTrack(trackId);
    }
  };

  const selectedTrackData = trackData.find(t => t.id === selectedTrack);

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

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="text-gray-300 hover:text-white transition">
                소개
              </Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition">
                MBTI
              </Link>
              <Link href="/courses" className="text-white font-semibold">
                강좌 목록
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition">
                FAQ
              </Link>
              <Link href="/login" className="text-gray-300 hover:text-white transition">
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
              >
                회원가입
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2">소개</Link>
              <Link href="/mbti" className="block text-gray-300 hover:text-white px-3 py-2">MBTI</Link>
              <Link href="/courses" className="block text-white font-semibold px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white px-3 py-2">FAQ</Link>
              <Link href="/login" className="block text-gray-300 hover:text-white px-3 py-2">Log In</Link>
              <Link href="/register" className="block bg-orange-500 text-white px-3 py-2 rounded-lg font-semibold">회원가입</Link>
            </div>
          )}
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI 기반 진로교육 플랫폼
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto mb-8">
            AI와 함께 다양한 직업을 <span className="text-yellow-400 font-semibold">간접 경험</span>하고,<br />
            나에게 맞는 진로를 찾아 <span className="text-green-400 font-semibold">실무 역량</span>까지 갖추세요!
          </p>

          {/* 대상별 안내 */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-purple-400" />
              <span>학부형</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
              <Briefcase className="w-5 h-5 text-blue-400" />
              <span>사회초년생</span>
            </div>
            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
              <GraduationCap className="w-5 h-5 text-green-400" />
              <span>진로전환자</span>
            </div>
          </div>
        </div>
      </section>

      {/* 교육 특징 */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">AI 활용 능력 습득</h3>
                <p className="text-gray-600 text-xs mt-1">어떤 분야에서든 AI를 도구로 활용</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">진로 간접 경험</h3>
                <p className="text-gray-600 text-xs mt-1">AI와 함께 다양한 직업 미리 체험</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">실무 기초 역량</h3>
                <p className="text-gray-600 text-xs mt-1">포트폴리오 완성으로 취업 준비</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 - 트랙 탐색 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">교육 트랙 선택</h2>
          <p className="text-gray-600">나에게 맞는 트랙을 선택하고 학습을 시작하세요</p>
        </div>

        {/* 트랙 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trackData.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isSelected={selectedTrack === track.id}
              onClick={() => handleTrackClick(track.id)}
            />
          ))}
        </div>

        {/* 선택된 트랙의 수업 목록 */}
        {selectedTrackData && (
          <CoursePanel track={selectedTrackData} />
        )}

        {/* 학습 단계 안내 */}
        {!selectedTrack && (
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">📚 학습 단계</h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-purple-600">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">성향 파악</h4>
                <p className="text-gray-500 text-xs">MBTI/MMTIC 검사</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-blue-600">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">탐색</h4>
                <p className="text-gray-500 text-xs">직업군 3~5개 체험</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-green-600">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">집중 학습</h4>
                <p className="text-gray-500 text-xs">초급 → 중급 → 고급</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-yellow-600">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">결과물 제작</h4>
                <p className="text-gray-500 text-xs">포트폴리오 완성</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="font-bold text-rose-600">5</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">진로 결정</h4>
                <p className="text-gray-500 text-xs">실무 적용</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">UTTEC Edu</span>
              </div>
              <p className="text-sm">AI와 함께하는 진로교육 플랫폼</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 underline">빠른 링크</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">홈</Link></li>
                <li><Link href="/courses" className="hover:text-white transition">강좌 목록</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 underline">고객 지원</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms" className="hover:text-white transition">이용약관</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">개인정보처리방침</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">고객센터</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 커넥트에이아이. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
