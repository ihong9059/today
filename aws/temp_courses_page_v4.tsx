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
    subcategories: [
      {
        id: 'ai-basic',
        name: 'AI 기초',
        courses: [
          { id: 1, title: 'AI 시대 이해하기' },
          { id: 2, title: 'ChatGPT 활용법' },
          { id: 3, title: 'AI와 함께하는 진로 탐색' },
        ],
      },
      {
        id: 'career-explore',
        name: '진로 탐색',
        courses: [
          { id: 4, title: 'MBTI로 알아보는 직업' },
          { id: 5, title: '미래 유망 직종 안내' },
          { id: 6, title: '자녀 적성 발견하기' },
        ],
      },
    ],
  },
  {
    id: 'beginner',
    name: '사회초년생 트랙',
    icon: '💼',
    color: 'from-blue-500 to-cyan-600',
    description: '실무 역량 강화 + 포트폴리오',
    features: ['AI 활용 실무', '포트폴리오 제작', '취업 준비'],
    subcategories: [
      {
        id: 'ai-practical',
        name: 'AI 실무 활용',
        courses: [
          { id: 7, title: 'AI 도구 마스터' },
          { id: 8, title: '효과적인 프롬프트 작성법' },
          { id: 9, title: 'AI 협업 프로젝트' },
        ],
      },
      {
        id: 'portfolio',
        name: '포트폴리오 제작',
        courses: [
          { id: 10, title: '실무 프로젝트 시작' },
          { id: 11, title: '포트폴리오 완성하기' },
          { id: 12, title: '취업 연계 전략' },
        ],
      },
    ],
  },
  {
    id: 'coding',
    name: '코딩 전문가',
    icon: '💻',
    color: 'from-green-500 to-emerald-600',
    description: 'PC부터 임베디드까지 실무 프로그래밍',
    features: ['다양한 언어', '하드웨어 제어', '실무 프로젝트'],
    courseLink: '/course/2',
    subcategories: [
      {
        id: 'pc-programming',
        name: 'PC 프로그래밍',
        courses: [
          { id: '1.1', title: 'C 언어 (PC)', link: '/course/2/lesson/1.1' },
          { id: '1.2', title: 'Python (PC)', link: '/course/2/lesson/1.2' },
          { id: '1.5', title: 'Node.js (PC)', link: '/course/2/lesson/1.5' },
          { id: '1.6', title: 'Database (PC)', link: '/course/2/lesson/1.6' },
          { id: '1.7', title: 'Node-RED (PC)', link: '/course/2/lesson/1.7' },
        ],
      },
      {
        id: 'embedded',
        name: '임베디드/IoT',
        courses: [
          { id: '1.3', title: 'C 언어 (ESP32)', link: '/course/2/lesson/1.3', highlight: true },
          { id: '1.4', title: 'Python (UTTEC Shield)', link: '/course/2/lesson/1.4' },
        ],
      },
    ],
  },
  {
    id: 'teacher',
    name: '교사/교육자',
    icon: '📚',
    color: 'from-amber-500 to-orange-600',
    description: 'AI 활용 교육 전문가',
    features: ['교수법 이해', 'AI 교육 자료 제작', '수업 설계'],
    subcategories: [
      {
        id: 'edu-basic',
        name: '교육학 기초',
        courses: [
          { id: 19, title: '교육학 기초' },
          { id: 20, title: '효과적인 교수법' },
        ],
      },
      {
        id: 'ai-edu',
        name: 'AI 교육 활용',
        courses: [
          { id: 21, title: 'AI 교육 자료 제작' },
          { id: 22, title: '수업 설계 및 모의 수업' },
          { id: 23, title: '교육 콘텐츠 포트폴리오' },
        ],
      },
    ],
  },
  {
    id: 'career-change',
    name: '진로 전환자',
    icon: '🔄',
    color: 'from-rose-500 to-pink-600',
    description: '새로운 분야 도전',
    features: ['새 분야 기초', '가능성 확인', '단계별 학습'],
    subcategories: [
      {
        id: 'explore',
        name: '분야 탐색',
        courses: [
          { id: 24, title: '나에게 맞는 분야 찾기' },
          { id: 25, title: '직업 체험 시뮬레이션' },
        ],
      },
      {
        id: 'transition',
        name: '전환 준비',
        courses: [
          { id: 26, title: '새 분야 기초 역량' },
          { id: 27, title: '전환 로드맵 수립' },
        ],
      },
    ],
  },
  {
    id: 'free',
    name: 'Free 체험',
    icon: '🎁',
    color: 'from-teal-500 to-cyan-600',
    description: '무료로 시작하기',
    features: ['무료 콘텐츠', '기초 체험', 'MBTI 검사'],
    subcategories: [
      {
        id: 'free-intro',
        name: '무료 입문',
        courses: [
          { id: 28, title: 'AI 시대 진로교육 소개' },
          { id: 29, title: 'MBTI/MMTIC 검사' },
          { id: 30, title: '트랙 미리보기' },
        ],
      },
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

// 서브카테고리 패널
function SubcategoryPanel({ track, selectedSub, onSelectSub }: {
  track: typeof trackData[0];
  selectedSub: string | null;
  onSelectSub: (id: string) => void;
}) {
  const selectedSubData = track.subcategories.find(s => s.id === selectedSub);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
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

        {/* 전체 강좌 보기 링크 */}
        {(track as any).courseLink && (
          <Link
            href={(track as any).courseLink}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition flex items-center gap-2"
          >
            전체 강좌 보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* 중분류 버튼들 */}
      <div className="flex flex-wrap gap-3 mb-6">
        {track.subcategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSelectSub(sub.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedSub === sub.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* 강좌 목록 */}
      {selectedSubData && (
        <div className="border-t pt-4">
          <h5 className="text-sm font-medium text-gray-600 mb-3">{selectedSubData.name} 강좌</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedSubData.courses.map((course: any) => (
              <Link
                key={course.id}
                href={course.link || `/courses/${course.id}`}
                className={`p-4 rounded-xl transition group flex items-center gap-3 ${
                  course.highlight
                    ? 'bg-blue-50 border-2 border-blue-300 hover:bg-blue-100'
                    : 'bg-gray-50 hover:bg-blue-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  course.highlight ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {course.id.toString().includes('1.3') || course.id.toString().includes('1.4') ? (
                    <Cpu className="w-5 h-5" />
                  ) : course.id.toString().includes('1.6') ? (
                    <Database className="w-5 h-5" />
                  ) : course.id.toString().includes('1.5') ? (
                    <Server className="w-5 h-5" />
                  ) : (
                    <Code className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-xs text-gray-500">{course.id}</span>
                  <p className={`font-medium group-hover:text-blue-600 ${
                    course.highlight ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {course.title}
                  </p>
                </div>
                {course.highlight && (
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    추천
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CoursesPage() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTrackClick = (trackId: string) => {
    if (selectedTrack === trackId) {
      setSelectedTrack(null);
      setSelectedSub(null);
    } else {
      setSelectedTrack(trackId);
      setSelectedSub(null);
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

        {/* 선택된 트랙의 서브카테고리 패널 */}
        {selectedTrackData && (
          <SubcategoryPanel
            track={selectedTrackData}
            selectedSub={selectedSub}
            onSelectSub={setSelectedSub}
          />
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
                <p className="text-gray-500 text-xs">15일 과정 진행</p>
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
                <p className="text-gray-500 text-xs">중급/고급 진행</p>
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
