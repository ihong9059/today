'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Brain,
  Menu,
  X,
  Play,
  CheckCircle,
  Clock,
  ChevronRight,
  Award,
  Rocket,
  BookOpen,
  Video
} from 'lucide-react';

// 강의 데이터
const courseData = {
  title: 'AI Agent Maker',
  subtitle: '10일 완성, 수익화하는 인공지능 에이전트 만들기',
  liveInfo: {
    schedule: '매주 화요일 8PM | AI 최신 트렌드 & 실습',
  },
  progress: {
    completed: 10,
    total: 10,
    percentage: 100,
  },
  parts: [
    {
      id: 1,
      title: 'Part 1 (Day 1-6)',
      subtitle: 'OpenAI 에이전트부터 Google OPAL 에이전트까지 - 수익화 컨텐츠 에이전트 기초 다지기',
      icon: '📚',
      lessons: [
        {
          day: 1,
          title: '내 첫 AI 친구: ChatGPT와 Agent의 차이',
          description: 'ChatGPT와 에이전트 빌더의 차이점 이해 | 워크플로우 자동화 개념 배우기',
          hasQuiz: true,
          completed: true,
        },
        {
          day: 2,
          title: 'Work Flow Design 기초 - 나의 일을 AI가 이해할 수 있게 쪼개기',
          description: '디자인사(선분해과 시퀀싱(순서화) 원리 | 4개 에이전트로 유튜브 콘텐츠 자동 생성',
          hasQuiz: true,
          completed: true,
        },
        {
          day: 3,
          title: 'Google Opal로 영상 자동 생성 에이전트 만들기',
          description: 'ChatGPT vs Google Opal 비교 | 트렌드 검색 + 영상 생성 자동화 (Veo + Gemini 2.5)',
          hasQuiz: true,
          completed: true,
        },
        {
          day: 4,
          title: '협찬/광고 수익을 만드는 \'콘텐츠 자동 생성 에이전트\' 제작법',
          description: '4개 에이전트로 인스타그램 포스팅 자동화 | OpenAI vs Google Opal 실전 비교',
          hasQuiz: false,
          completed: true,
        },
        {
          day: 5,
          title: '수익화 인공지능 에이전트 구축하기',
          description: 'Google OPAL 완전 자동화 워크플로우 | 트렌드→썸네일→메타데이터 최적화',
          hasQuiz: true,
          completed: true,
        },
        {
          day: 6,
          title: '시니어 타겟 유튜브 콘텐츠 자동 제작',
          description: '25개 멀티 에이전트 시스템 | 아이디어→이미지→영상→텍스트 완전 자동화',
          hasQuiz: false,
          completed: true,
        },
      ],
    },
    {
      id: 2,
      title: 'Part 2 (Day 7-10)',
      subtitle: '실전! 유튜브 채널 개설부터 퍼널 전략까지 - 완전 자동화 수익 시스템',
      icon: '🚀',
      lessons: [
        {
          day: 7,
          title: '유튜브 채널 자동 생성 & 최적화 에이전트',
          description: '11개 AI 에이전트로 채널 셋팅 완전 자동화 | 퍼널 전략으로 5-10개 채널 동시 운영',
          hasQuiz: false,
          completed: true,
        },
        {
          day: 8,
          title: 'Opal의 숨겨진 비밀: 대화로 워크플로우 자동 생성 + 구글 스프레드시트 연동',
          description: '대화형 워크플로우 자동 생성 | 구글 스프레드시트로 콘텐츠 계획 자동 저장',
          hasQuiz: true,
          completed: true,
        },
        {
          day: 9,
          title: '일관성 있는 이미지 시리즈 만들기 - Google Opal로 브랜드 스토리텔링',
          description: '같은 캐릭터/채형/스타일로 연결되는 이미지 시리즈 생성 | 제품 광고 콘텐츠 제작',
          hasQuiz: false,
          completed: true,
        },
        {
          day: 10,
          title: '영상 콘텐츠 자동화 - JSON 프롬프트와 Google Opal 에이전트로 쇼츠/롱폼 제작',
          description: '22개 에이전트로 일관성 있는 영상 시리즈 생성 | 코카콜라/팬타 광고 실습',
          hasQuiz: false,
          completed: true,
        },
      ],
    },
  ],
};

// 레슨 카드 컴포넌트
function LessonCard({ lesson, isLast = false }: { lesson: typeof courseData.parts[0]['lessons'][0]; isLast?: boolean }) {
  return (
    <Link
      href={`/course/1/lesson/${lesson.day}`}
      className={`block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-blue-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer ${!isLast ? 'mb-4' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              {lesson.completed ? (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 text-gray-500" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-500">Day {lesson.day}</span>
            </div>
            {lesson.hasQuiz && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                📝 퀴즈 포함
              </span>
            )}
            {lesson.completed && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                ✓ 완료
              </span>
            )}
          </div>

          <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
          <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>

          <span className="flex items-center gap-2 text-blue-600 font-medium text-sm">
            다시 학습하기
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// 파트 섹션 컴포넌트
function PartSection({ part }: { part: typeof courseData.parts[0] }) {
  return (
    <section className="mb-8">
      {/* 파트 헤더 */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-5 mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          {part.icon} {part.title}
        </h3>
        <p className="text-yellow-100 text-sm mt-1">{part.subtitle}</p>
      </div>

      {/* 레슨 목록 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {part.lessons.map((lesson, idx) => (
          <LessonCard
            key={lesson.day}
            lesson={lesson}
            isLast={idx === part.lessons.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

export default function CourseDetailPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('홍광선');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) {
          setUserName(user.name);
        }
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const allCompleted = courseData.progress.percentage === 100;

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

            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-white transition px-3 py-2">
                소개
              </Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition px-3 py-2">
                MBTI
              </Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">
                강좌 목록
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition px-3 py-2">
                FAQ
              </Link>
              <Link
                href="/dashboard"
                className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                내 강의
              </Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700">
                <span className="text-gray-300">안녕하세요, {userName}님!</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white transition px-3 py-2"
                >
                  로그아웃
                </button>
              </div>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2">소개</Link>
              <Link href="/mbti" className="block text-gray-300 hover:text-white px-3 py-2">MBTI</Link>
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white px-3 py-2">FAQ</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <span className="block text-gray-300 px-3 py-2">안녕하세요, {userName}님!</span>
                <button onClick={handleLogout} className="block text-gray-400 hover:text-white px-3 py-2">로그아웃</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 강의 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
              🤖
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{courseData.title}</h1>
              <p className="text-gray-500">{courseData.subtitle}</p>
            </div>
          </div>
        </div>

        {/* 라이브 강의 배너 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">주간 라이브 강의 입장</h3>
              <p className="text-blue-200 text-sm">{courseData.liveInfo.schedule}</p>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
            입장하기 →
          </button>
        </div>

        {/* 전체 강의 업로드 완료 알림 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎉</span>
            <div>
              <p className="font-semibold text-yellow-800">Day 1-10 전체 강의 업로드 완료!</p>
              <p className="text-sm text-yellow-700">지금 바로 학습을 시작하세요! 🚀</p>
            </div>
          </div>
        </div>

        {/* 진행률 바 */}
        <div className="bg-white rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-900">전체 학습 진행률</span>
            <span className="font-bold text-green-600">
              {courseData.progress.completed}/{courseData.progress.total} 완료 ({courseData.progress.percentage}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${courseData.progress.percentage}%` }}
            />
          </div>
        </div>

        {/* 파트별 강의 목록 */}
        {courseData.parts.map((part) => (
          <PartSection key={part.id} part={part} />
        ))}

        {/* 완료 축하 배너 */}
        {allCompleted && (
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center mt-8">
            <div className="text-6xl mb-4">🎊</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              축하합니다! 모든 강의를 완료하셨습니다!
            </h2>
            <p className="text-purple-200 mb-2">
              이제 여러분은 수익화 AI 에이전트 메이커입니다! 🚀
            </p>
            <p className="text-purple-200 text-sm">
              배운 내용을 활용하여 실전 수익화 에이전트를 만들어보세요!
            </p>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">UTTEC Edu</span>
              </div>
              <p className="text-sm">
                AI와 함께하는 진로교육 플랫폼
              </p>
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
