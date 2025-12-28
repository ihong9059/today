'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, Play, CheckCircle, ChevronRight, ChevronLeft, Video } from 'lucide-react';

const courseDataByLevel: Record<string, any> = {
  '초급': {
    title: 'MBTI로 알아보는 직업',
    level: '초급',
    subtitle: 'MBTI 성격유형으로 진로 방향 찾기',
    icon: '🧠',
    liveInfo: { schedule: '매주 목요일 8PM | MBTI 성격 분석' },
    announcement: { title: 'Day 1-5 강의 업로드 완료!', description: 'MBTI로 나만의 진로를 찾아보세요! 🚀' },
    progress: { completed: 0, total: 5, percentage: 0 },
    parts: [
      {
        id: 1, title: 'Part 1: MBTI 기초 (Day 1-3)', subtitle: 'MBTI 이해하기', icon: '📖',
        lessons: [
          { day: 1, title: 'MBTI란 무엇인가?', description: '4가지 선호지표 | 16가지 유형 | 성격 이해', hasQuiz: true, completed: false },
          { day: 2, title: '나의 MBTI 알아보기', description: 'MBTI 검사 | 결과 해석 | 유형 특성', hasQuiz: true, completed: false },
          { day: 3, title: '자녀의 MBTI 파악하기', description: '행동 관찰 | 대화 패턴 | 학습 스타일', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2, title: 'Part 2: MBTI와 직업 (Day 4-5)', subtitle: '성격유형과 적합 직업', icon: '💼',
        lessons: [
          { day: 4, title: 'MBTI 유형별 적합 직업', description: '16유형별 직업군 | 강점 활용 | 적합도', hasQuiz: true, completed: false },
          { day: 5, title: 'AI로 MBTI 진로 상담', description: 'AI 진로 상담 | 맞춤 추천 | 심층 분석', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: '중급',
  },
  '중급': {
    title: 'MBTI로 알아보는 직업',
    level: '중급',
    subtitle: 'MBTI 심화와 직업 매칭',
    icon: '🧠',
    liveInfo: { schedule: '매주 토요일 10AM | MBTI 심화 분석' },
    announcement: { title: '중급 과정 준비 중!', description: '곧 업로드됩니다 📚' },
    progress: { completed: 0, total: 5, percentage: 0 },
    parts: [
      {
        id: 1, title: 'Part 1: MBTI 심화 (Day 1-3)', subtitle: '인지기능과 발달', icon: '🔬',
        lessons: [
          { day: 1, title: 'MBTI 인지기능', description: '8가지 인지기능 | 주기능 | 부기능', hasQuiz: true, completed: false },
          { day: 2, title: 'MBTI 발달 단계', description: '연령별 발달 | 성장 과정 | 균형 잡기', hasQuiz: true, completed: false },
          { day: 3, title: 'MBTI 스트레스 반응', description: '열등기능 | 스트레스 패턴 | 대처법', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2, title: 'Part 2: 직업 환경 분석 (Day 4-5)', subtitle: 'MBTI와 직장 생활', icon: '🏢',
        lessons: [
          { day: 4, title: '유형별 업무 스타일', description: '의사소통 | 리더십 | 팀워크', hasQuiz: true, completed: false },
          { day: 5, title: '직장 적응과 성장', description: '환경 적합성 | 역량 개발 | 커리어 패스', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: '고급',
  },
  '고급': {
    title: 'MBTI로 알아보는 직업',
    level: '고급',
    subtitle: 'MBTI 전문 진로 코칭',
    icon: '🧠',
    liveInfo: { schedule: '매주 일요일 2PM | MBTI 진로 코칭' },
    announcement: { title: '고급 과정 준비 중!', description: '곧 업로드됩니다 🎯' },
    progress: { completed: 0, total: 5, percentage: 0 },
    parts: [
      {
        id: 1, title: 'Part 1: 진로 코칭 (Day 1-3)', subtitle: 'MBTI 기반 진로 지도', icon: '🎯',
        lessons: [
          { day: 1, title: 'MBTI 진로 상담 기법', description: '상담 프레임워크 | 질문법 | 해석', hasQuiz: true, completed: false },
          { day: 2, title: '유형 간 이해와 소통', description: '부모-자녀 유형 | 갈등 해소 | 시너지', hasQuiz: true, completed: false },
          { day: 3, title: 'MBTI 기반 학습 지도', description: '학습 스타일 | 동기부여 | 환경 설정', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2, title: 'Part 2: 실전 적용 (Day 4-5)', subtitle: '종합 진로 설계', icon: '🚀',
        lessons: [
          { day: 4, title: 'MBTI 진로 포트폴리오', description: '강점 문서화 | 경험 정리 | 어필 전략', hasQuiz: true, completed: false },
          { day: 5, title: '종합 진로 설계', description: '통합 분석 | 맞춤 로드맵 | 실행 계획', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: null,
  },
};

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  '초급': { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-400' },
  '중급': { bg: 'bg-yellow-500', text: 'text-yellow-600', border: 'border-yellow-400' },
  '고급': { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-400' },
};

function LessonCard({ lesson, level, coursePath }: { lesson: any; level: string; coursePath: string }) {
  return (
    <Link href={`/course/parent/${coursePath}/${level}/lesson/${lesson.day}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-indigo-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              {lesson.completed ? <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><CheckCircle className="w-4 h-4 text-white" /></div> : <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"><Play className="w-3 h-3 text-gray-500" /></div>}
              <span className="text-sm font-medium text-gray-500">Day {lesson.day}</span>
            </div>
            {lesson.hasQuiz && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">퀴즈 포함</span>}
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
          <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>
          <span className="flex items-center gap-2 text-indigo-600 font-medium text-sm">{lesson.completed ? '다시 학습하기' : '학습 시작하기'}<ChevronRight className="w-4 h-4" /></span>
        </div>
      </div>
    </Link>
  );
}

function PartSection({ part, level, coursePath }: { part: any; level: string; coursePath: string }) {
  return (
    <section className="mb-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-5 mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">{part.icon} {part.title}</h3>
        <p className="text-indigo-100 text-sm mt-1">{part.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {part.lessons.map((lesson: any) => <LessonCard key={lesson.day} lesson={lesson} level={level} coursePath={coursePath} />)}
      </div>
    </section>
  );
}

export default function ParentMbtiCareerPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const coursePath = 'mbti-career';

  const [userName, setUserName] = useState('학부모');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const courseData = courseDataByLevel[level];

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) { try { const user = JSON.parse(userStr); if (user.name) setUserName(user.name); } catch (e) {} }
  }, []);

  const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); router.push('/'); };

  if (!courseData) return <div className="min-h-screen bg-gray-100 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">존재하지 않는 레벨입니다</h1><Link href="/courses" className="text-blue-600 hover:underline">강좌 목록으로 돌아가기</Link></div></div>;

  const allCompleted = courseData.progress.percentage === 100;
  const colors = levelColors[level] || levelColors['초급'];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center"><Link href="/" className="flex items-center"><div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2"><Brain className="w-5 h-5 text-white" /></div><span className="text-xl font-bold">UTTEC Edu</span></Link></div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-white transition px-3 py-2">소개</Link>
              <Link href="/mbti" className="text-gray-300 hover:text-white transition px-3 py-2">MBTI</Link>
              <Link href="/courses" className="text-gray-300 hover:text-white transition px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition px-3 py-2">FAQ</Link>
              <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">내 강의</Link>
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-700"><span className="text-gray-300">안녕하세요, {userName}님!</span><button onClick={handleLogout} className="text-gray-400 hover:text-white transition px-3 py-2">로그아웃</button></div>
            </div>
            <div className="md:hidden flex items-center"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button></div>
          </div>
          {isMenuOpen && <div className="md:hidden pb-4 space-y-2"><Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2">소개</Link><Link href="/mbti" className="block text-gray-300 hover:text-white px-3 py-2">MBTI</Link><Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link><Link href="/faq" className="block text-gray-300 hover:text-white px-3 py-2">FAQ</Link><Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link></div>}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"><ChevronLeft className="w-4 h-4" />강좌 목록</Link>
            <span className="text-gray-300">/</span><span className="text-gray-500 text-sm">학부형 코스</span>
            <span className="text-gray-300">/</span><span className="text-gray-500 text-sm">MBTI 직업</span>
            <span className="text-gray-300">/</span><span className={`px-2 py-0.5 ${colors.bg} text-white text-sm rounded-full font-medium`}>{level}</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl">{courseData.icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1"><h1 className="text-2xl font-bold text-gray-900">{courseData.title}</h1><span className={`px-3 py-1 ${colors.bg} text-white text-sm rounded-full font-medium`}>{courseData.level}</span></div>
              <p className="text-gray-500">{courseData.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Video className="w-5 h-5 text-white" /></div><div><h3 className="text-white font-semibold">주간 라이브 강의 입장</h3><p className="text-indigo-200 text-sm">{courseData.liveInfo.schedule}</p></div></div>
          <button className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition">입장하기</button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6"><div className="flex items-center gap-2"><span className="text-xl">{allCompleted ? '🎉' : '📢'}</span><div><p className="font-semibold text-yellow-800">{courseData.announcement.title}</p><p className="text-sm text-yellow-700">{courseData.announcement.description}</p></div></div></div>

        <div className="bg-white rounded-xl p-5 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3"><span className="font-semibold text-gray-900">전체 학습 진행률</span><span className={`font-bold ${colors.text}`}>{courseData.progress.completed}/{courseData.progress.total} 완료 ({courseData.progress.percentage}%)</span></div>
          <div className="w-full bg-gray-200 rounded-full h-3"><div className={`${colors.bg} h-3 rounded-full transition-all duration-500`} style={{ width: `${courseData.progress.percentage}%` }} /></div>
        </div>

        {courseData.parts.map((part: any) => <PartSection key={part.id} part={part} level={level} coursePath={coursePath} />)}

        {allCompleted && courseData.nextLevel && <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center mt-8"><div className="text-6xl mb-4">🎊</div><h2 className="text-2xl md:text-3xl font-bold text-white mb-3">축하합니다!</h2><p className="text-purple-200 mb-6">이제 다음 단계로 나아갈 준비가 되었습니다!</p><Link href={`/course/parent/${coursePath}/${courseData.nextLevel}`} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition">{courseData.nextLevel} 과정 시작하기</Link></div>}

        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">다른 레벨 강좌</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {['초급', '중급', '고급'].map((lvl) => {
              const isCurrentLevel = lvl === level;
              const lvlColors = levelColors[lvl];
              return isCurrentLevel ? (
                <div key={lvl} className={`p-4 rounded-lg border-2 ${lvlColors.border}`} style={{ backgroundColor: lvl === '초급' ? '#f0fdf4' : lvl === '중급' ? '#fefce8' : '#fef2f2' }}><span className={`text-sm ${lvlColors.text} font-medium`}>현재 학습 중</span><h4 className="font-bold text-gray-900 mt-1">{lvl}</h4><p className="text-sm text-gray-500">{lvl === '초급' && 'MBTI 기초와 직업 탐색'}{lvl === '중급' && 'MBTI 심화와 직업 환경'}{lvl === '고급' && 'MBTI 진로 코칭'}</p></div>
              ) : (
                <Link key={lvl} href={`/course/parent/${coursePath}/${lvl}`} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"><span className="text-sm text-gray-500">{lvl === '초급' ? '기초 과정' : lvl === '중급' ? '다음 단계' : '심화 과정'}</span><h4 className="font-bold text-gray-900 mt-1">{lvl}</h4><p className="text-sm text-gray-500">{lvl === '초급' && 'MBTI 기초와 직업 탐색'}{lvl === '중급' && 'MBTI 심화와 직업 환경'}{lvl === '고급' && 'MBTI 진로 코칭'}</p></Link>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div><div className="flex items-center mb-4"><div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-2"><Brain className="w-5 h-5 text-white" /></div><span className="text-white font-semibold">UTTEC Edu</span></div><p className="text-sm">AI와 함께하는 진로교육 플랫폼</p></div>
            <div><h4 className="text-white font-semibold mb-4">빠른 링크</h4><ul className="space-y-2 text-sm"><li><Link href="/" className="hover:text-white transition">홈</Link></li><li><Link href="/courses" className="hover:text-white transition">강좌 목록</Link></li></ul></div>
            <div><h4 className="text-white font-semibold mb-4">문의</h4><ul className="space-y-2 text-sm"><li>이메일: uttec@uttec.co.kr</li><li>전화: 010-3922-1809</li></ul></div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm"><p>© 2025 UTTEC Edu. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
}
