'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  Play,
  ChevronRight,
  ChevronLeft,
  Video,
} from 'lucide-react';

// 학교급별 코스 데이터
const levelData: Record<string, any> = {
  // ============================================
  // 초등교사 코스
  // ============================================
  'elementary': {
    title: '초등교사 코스',
    subtitle: '초등학생 눈높이에 맞는 AI 활용 수업 설계',
    icon: '🌱',
    color: 'from-green-500 to-emerald-500',
    liveInfo: {
      schedule: '매주 화요일 7PM | 초등 AI 수업 사례 공유',
    },
    announcement: {
      title: '5개 강좌 모두 오픈!',
      description: '초등학생 맞춤형 AI 수업을 설계해보세요! 🌱',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 초등 교육의 이해 (강좌 1-2)',
        subtitle: '초등학생 발달 특성과 AI 교육의 기초',
        icon: '📚',
        lessons: [
          { day: 1, title: '초등 교육학 기초', description: '발달 단계 | 학습 특성 | 동기 부여', hasQuiz: true },
          { day: 2, title: '효과적인 초등 교수법', description: '놀이 학습 | 체험 활동 | 협동 학습', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: AI 활용 수업 (강좌 3-4)',
        subtitle: 'AI를 활용한 초등 수업 자료 제작과 설계',
        icon: '🎨',
        lessons: [
          { day: 3, title: 'AI 교육 자료 제작', description: '그림책 만들기 | 학습지 제작 | 동영상 활용', hasQuiz: true },
          { day: 4, title: '수업 설계 및 모의 수업', description: '수업 지도안 | 활동 설계 | 평가 방법', hasQuiz: true },
        ],
      },
      {
        id: 3,
        title: 'Part 3: 실전 적용 (강좌 5)',
        subtitle: '교육 콘텐츠 정리와 학부모 소통',
        icon: '📁',
        lessons: [
          { day: 5, title: '교육 콘텐츠 포트폴리오', description: '수업 기록 | 학부모 안내 | 성장 포트폴리오', hasQuiz: true },
        ],
      },
    ],
  },

  // ============================================
  // 중등교사 코스
  // ============================================
  'middle': {
    title: '중등교사 코스',
    subtitle: '중학생 진로탐색과 AI 융합 수업 전략',
    icon: '📚',
    color: 'from-blue-500 to-indigo-500',
    liveInfo: {
      schedule: '매주 수요일 7PM | 중등 AI 교육 세미나',
    },
    announcement: {
      title: '5개 강좌 모두 오픈!',
      description: '자유학기제 AI 프로그램을 설계해보세요! 📚',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 중등 교육의 이해 (강좌 1-2)',
        subtitle: '청소년 발달 특성과 AI 교육의 기초',
        icon: '📖',
        lessons: [
          { day: 1, title: '중등 교육학 기초', description: '청소년 발달 | 학습 동기 | 자기주도 학습', hasQuiz: true },
          { day: 2, title: '효과적인 중등 교수법', description: '프로젝트 학습 | 토론 수업 | 협력 학습', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: AI 활용 수업 (강좌 3-4)',
        subtitle: 'AI를 활용한 중등 수업 자료 제작과 설계',
        icon: '💻',
        lessons: [
          { day: 3, title: 'AI 교육 자료 제작', description: '교과 연계 자료 | 진로 탐색 도구 | 평가 도구', hasQuiz: true },
          { day: 4, title: '수업 설계 및 모의 수업', description: '자유학기제 | 융합 수업 | 진로 수업', hasQuiz: true },
        ],
      },
      {
        id: 3,
        title: 'Part 3: 실전 적용 (강좌 5)',
        subtitle: '교육 콘텐츠 정리와 진로 지도',
        icon: '🎯',
        lessons: [
          { day: 5, title: '교육 콘텐츠 포트폴리오', description: '수업 기록 | 진로 상담 | 학생 성장 기록', hasQuiz: true },
        ],
      },
    ],
  },

  // ============================================
  // 고등교사 코스
  // ============================================
  'high': {
    title: '고등교사 코스',
    subtitle: '고등학생 진로/진학 지도와 심화 AI 교육',
    icon: '🎓',
    color: 'from-purple-500 to-pink-500',
    liveInfo: {
      schedule: '매주 목요일 7PM | 고등 AI 진로진학 세미나',
    },
    announcement: {
      title: '5개 강좌 모두 오픈!',
      description: '대입 연계 진로 지도 전략을 배워보세요! 🎓',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 고등 교육의 이해 (강좌 1-2)',
        subtitle: '고등학생 특성과 진로진학 교육의 기초',
        icon: '📖',
        lessons: [
          { day: 1, title: '고등 교육학 기초', description: '고등학생 발달 | 진로 성숙 | 학습 전략', hasQuiz: true },
          { day: 2, title: '효과적인 고등 교수법', description: '심화 학습 | 논술 지도 | 자기주도 학습', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: AI 활용 수업 (강좌 3-4)',
        subtitle: 'AI를 활용한 고등 수업 자료 제작과 설계',
        icon: '💼',
        lessons: [
          { day: 3, title: 'AI 교육 자료 제작', description: '교과 심화 자료 | 진학 자료 | 생기부 지도', hasQuiz: true },
          { day: 4, title: '수업 설계 및 모의 수업', description: '진로 수업 | 프로젝트 수업 | 세특 지도', hasQuiz: true },
        ],
      },
      {
        id: 3,
        title: 'Part 3: 실전 적용 (강좌 5)',
        subtitle: '교육 콘텐츠 정리와 진학 지도',
        icon: '🏆',
        lessons: [
          { day: 5, title: '교육 콘텐츠 포트폴리오', description: '수업 기록 | 진학 상담 | 추천서 작성', hasQuiz: true },
        ],
      },
    ],
  },
};

export default function TeacherLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = params.level as string;

  const [userName, setUserName] = useState('선생님');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentLevel = levelData[level];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleStartLesson = (day: number) => {
    router.push(`/course/teacher/${level}/lesson/${day}`);
  };

  if (!currentLevel) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 코스입니다</h1>
          <Link href="/course/teacher" className="text-blue-600 hover:underline">
            교사/교육자 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
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

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-white transition px-3 py-2">소개</Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition px-3 py-2">MBTI</Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition px-3 py-2">FAQ</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/courses" className="text-gray-500 hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/course/teacher" className="text-gray-500 hover:text-gray-700">교사/교육자 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{currentLevel.title}</span>
        </div>

        {/* 코스 헤더 */}
        <div className={`bg-gradient-to-r ${currentLevel.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-4xl">{currentLevel.icon}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentLevel.title}</h1>
          <p className="text-white/80 mb-4">{currentLevel.subtitle}</p>

          {/* 진행률 */}
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>진행률</span>
              <span>{currentLevel.progress.completed}/{currentLevel.progress.total} 완료</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${currentLevel.progress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 공지사항 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-amber-900 mb-1">{currentLevel.announcement.title}</h3>
          <p className="text-amber-700 text-sm">{currentLevel.announcement.description}</p>
        </div>

        {/* 라이브 일정 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Video className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-900">라이브 수업</h3>
            <p className="text-blue-700 text-sm">{currentLevel.liveInfo.schedule}</p>
          </div>
        </div>

        {/* 강좌 목록 */}
        <div className="space-y-6">
          {currentLevel.parts.map((part: any) => (
            <div key={part.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{part.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{part.title}</h3>
                    <p className="text-sm text-gray-600">{part.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {part.lessons.map((lesson: any) => (
                  <div
                    key={lesson.day}
                    className="p-4 hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => handleStartLesson(lesson.day)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 bg-gradient-to-br ${currentLevel.color} rounded-full flex items-center justify-center text-white font-bold`}>
                          {lesson.day}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">강좌 {lesson.day}: {lesson.title}</h4>
                          <p className="text-sm text-gray-500">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className={`px-4 py-2 bg-gradient-to-r ${currentLevel.color} text-white text-sm rounded-lg hover:opacity-90 transition flex items-center gap-1`}>
                          <Play className="w-4 h-4" />
                          시작
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 뒤로 가기 */}
        <div className="mt-8">
          <Link
            href="/course/teacher"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>다른 학교급 선택하기</span>
          </Link>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 UTTEC Edu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
