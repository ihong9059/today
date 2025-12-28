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

// 진로 전환자 코스 상세 데이터
const courseData: Record<string, any> = {
  'find-field': {
    title: '나에게 맞는 분야 찾기',
    subtitle: 'AI와 함께 나의 강점과 적성에 맞는 새로운 분야 탐색',
    icon: '🔍',
    color: 'from-rose-500 to-pink-500',
    liveInfo: {
      schedule: '매주 월요일 8PM | 진로 탐색 워크샵',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: '나에게 맞는 새로운 분야를 찾아보세요! 🔍',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 자기 분석 (Day 1-2)',
        subtitle: '나의 강점, 흥미, 가치관 파악하기',
        icon: '🪞',
        lessons: [
          { day: 1, title: '나의 강점 발견하기', description: '숨은 강점 | 경험 분석 | 피드백 수집', hasQuiz: true },
          { day: 2, title: '흥미와 가치관 탐색', description: '흥미 유형 | 가치관 정리 | 동기 분석', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 분야 탐색 (Day 3-4)',
        subtitle: 'AI 시대 유망 분야와 적합도 평가',
        icon: '🌐',
        lessons: [
          { day: 3, title: 'AI 시대 유망 분야', description: '트렌드 분석 | 미래 직업 | 성장 분야', hasQuiz: true },
          { day: 4, title: '분야별 적합도 평가', description: '요구 역량 | 진입 장벽 | 나와의 적합도', hasQuiz: true },
        ],
      },
      {
        id: 3,
        title: 'Part 3: 방향 설정 (Day 5)',
        subtitle: '최종 방향 결정과 다음 단계',
        icon: '🎯',
        lessons: [
          { day: 5, title: '전환 방향 결정하기', description: '후보 정리 | 의사결정 | 액션 플랜', hasQuiz: true },
        ],
      },
    ],
  },
  'job-simulation': {
    title: '직업 체험 시뮬레이션',
    subtitle: 'AI로 가상 직업 체험하고 실제 업무 맛보기',
    icon: '🎮',
    color: 'from-violet-500 to-purple-500',
    liveInfo: {
      schedule: '매주 화요일 8PM | 직업 체험 세션',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: 'AI와 함께 다양한 직업을 체험해보세요! 🎮',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 체험 준비 (Day 1-2)',
        subtitle: '직업 체험의 의미와 방법 이해',
        icon: '📋',
        lessons: [
          { day: 1, title: '직업 체험의 가치', description: '체험 목적 | 기대 효과 | 준비 방법', hasQuiz: true },
          { day: 2, title: 'AI 시뮬레이션 활용법', description: 'AI 도구 | 체험 방법 | 기록 방법', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 직업 체험 (Day 3-4)',
        subtitle: '분야별 가상 직업 체험',
        icon: '👔',
        lessons: [
          { day: 3, title: '하루 일과 체험하기', description: '업무 시뮬레이션 | 일과 체험 | 역할극', hasQuiz: true },
          { day: 4, title: '도전과 성취 체험', description: '문제 상황 | 성취 경험 | 어려움 체험', hasQuiz: true },
        ],
      },
      {
        id: 3,
        title: 'Part 3: 현실 점검 (Day 5)',
        subtitle: '체험 결과 분석과 현실 적용',
        icon: '✅',
        lessons: [
          { day: 5, title: '체험 결과 분석', description: '적합도 평가 | 현실 점검 | 결정 지원', hasQuiz: true },
        ],
      },
    ],
  },
  'new-skill': {
    title: '새 분야 기초 역량',
    subtitle: 'AI 시대 전환에 필요한 핵심 역량 빠르게 쌓기',
    icon: '💪',
    color: 'from-amber-500 to-orange-500',
    liveInfo: {
      schedule: '매주 수요일 8PM | 역량 개발 워크샵',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: '새 분야 진입을 위한 역량을 키워보세요! 💪',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 핵심 역량 (Day 1-2)',
        subtitle: 'AI 시대 필수 역량 이해',
        icon: '🎯',
        lessons: [
          { day: 1, title: 'AI 시대 핵심 역량', description: '미래 역량 | AI 리터러시 | 소프트 스킬', hasQuiz: true },
          { day: 2, title: '디지털 역량 강화', description: '디지털 도구 | 온라인 협업 | 데이터 활용', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 학습 전략 (Day 3-4)',
        subtitle: '효율적인 역량 개발 방법',
        icon: '📚',
        lessons: [
          { day: 3, title: '빠른 학습 전략', description: '학습 방법 | AI 활용 학습 | 시간 관리', hasQuiz: true },
          { day: 4, title: '실전 역량 쌓기', description: '프로젝트 학습 | 포트폴리오 | 경험 축적', hasQuiz: true },
        ],
      },
      {
        id: 3,
        title: 'Part 3: 역량 증명 (Day 5)',
        subtitle: '역량 정리와 증명 방법',
        icon: '🏆',
        lessons: [
          { day: 5, title: '역량 증명하기', description: '자격증 | 포트폴리오 | 실적 정리', hasQuiz: true },
        ],
      },
    ],
  },
  'roadmap': {
    title: '전환 로드맵 수립',
    subtitle: '현실적인 커리어 전환 계획 세우고 실행하기',
    icon: '🗺️',
    color: 'from-teal-500 to-cyan-500',
    liveInfo: {
      schedule: '매주 목요일 8PM | 로드맵 컨설팅',
    },
    announcement: {
      title: 'Day 1-5 강의 업로드 완료!',
      description: '체계적인 전환 계획을 세워보세요! 🗺️',
    },
    progress: {
      completed: 0,
      total: 5,
      percentage: 0,
    },
    parts: [
      {
        id: 1,
        title: 'Part 1: 계획 수립 (Day 1-2)',
        subtitle: '단계별 전환 계획 세우기',
        icon: '📝',
        lessons: [
          { day: 1, title: '전환 목표 설정', description: '목표 정의 | 기간 설정 | 마일스톤', hasQuiz: true },
          { day: 2, title: '단계별 계획 수립', description: '세부 계획 | 우선순위 | 일정 관리', hasQuiz: true },
        ],
      },
      {
        id: 2,
        title: 'Part 2: 리스크 관리 (Day 3-4)',
        subtitle: '현실적 장애물 대비',
        icon: '🛡️',
        lessons: [
          { day: 3, title: '리스크 파악과 대비', description: '장애물 예측 | 대응 전략 | 플랜 B', hasQuiz: true },
          { day: 4, title: '자원 확보 전략', description: '시간 확보 | 비용 관리 | 네트워크', hasQuiz: true },
        ],
      },
      {
        id: 3,
        title: 'Part 3: 실행과 점검 (Day 5)',
        subtitle: '실행 시작과 지속 관리',
        icon: '🚀',
        lessons: [
          { day: 5, title: '실행과 점검', description: '첫 걸음 | 진행 점검 | 동기 유지', hasQuiz: true },
        ],
      },
    ],
  },
};

export default function CareerChangeCourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const course = params.course as string;

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentCourse = courseData[course];

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
    router.push(`/course/career-change/${course}/lesson/${day}`);
  };

  if (!currentCourse) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 강좌입니다</h1>
          <Link href="/course/career-change" className="text-blue-600 hover:underline">
            진로 전환자 코스로 돌아가기
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
          <Link href="/course/career-change" className="text-gray-500 hover:text-gray-700">진로 전환자 코스</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{currentCourse.title}</span>
        </div>

        {/* 코스 헤더 */}
        <div className={`bg-gradient-to-r ${currentCourse.color} rounded-2xl p-6 mb-6 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-4xl">{currentCourse.icon}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentCourse.title}</h1>
          <p className="text-white/80 mb-4">{currentCourse.subtitle}</p>

          {/* 진행률 */}
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>진행률</span>
              <span>{currentCourse.progress.completed}/{currentCourse.progress.total} 완료</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all"
                style={{ width: `${currentCourse.progress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* 공지사항 */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-rose-900 mb-1">{currentCourse.announcement.title}</h3>
          <p className="text-rose-700 text-sm">{currentCourse.announcement.description}</p>
        </div>

        {/* 라이브 일정 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Video className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-900">라이브 세션</h3>
            <p className="text-blue-700 text-sm">{currentCourse.liveInfo.schedule}</p>
          </div>
        </div>

        {/* 강좌 목록 */}
        <div className="space-y-6">
          {currentCourse.parts.map((part: any) => (
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
                        <div className={`w-10 h-10 bg-gradient-to-br ${currentCourse.color} rounded-full flex items-center justify-center text-white font-bold`}>
                          {lesson.day}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Day {lesson.day}: {lesson.title}</h4>
                          <p className="text-sm text-gray-500">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className={`px-4 py-2 bg-gradient-to-r ${currentCourse.color} text-white text-sm rounded-lg hover:opacity-90 transition flex items-center gap-1`}>
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
            href="/course/career-change"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>다른 강좌 선택하기</span>
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
