'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, Play, CheckCircle, ChevronRight, ChevronLeft, Video } from 'lucide-react';

const courseDataByLevel: Record<string, any> = {
  '초급': {
    title: 'AI와 함께하는 진로 탐색',
    level: '초급',
    subtitle: '내 아이에게 맞는 진로 찾기 - AI 활용 진로 탐색 입문',
    icon: '🎯',
    liveInfo: { schedule: '매주 수요일 8PM | 진로 탐색 워크샵' },
    announcement: { title: 'Day 1-5 강의 업로드 완료!', description: 'AI와 함께 진로를 탐색해보세요! 🚀' },
    progress: { completed: 0, total: 5, percentage: 0 },
    parts: [
      {
        id: 1, title: 'Part 1: 진로 탐색 기초 (Day 1-3)', subtitle: '진로의 의미와 탐색 방법', icon: '🔍',
        lessons: [
          { day: 1, title: '진로란 무엇인가?', description: '진로의 정의 | 진로 vs 직업 | 진로 발달 단계', hasQuiz: true, completed: false },
          { day: 2, title: 'AI로 직업 세계 탐험', description: 'AI 활용 직업 정보 검색 | 미래 직업 | 새로운 직종', hasQuiz: true, completed: false },
          { day: 3, title: '자녀 성향 파악하기', description: '흥미 탐색 | 적성 발견 | 가치관 이해', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2, title: 'Part 2: 진로 대화법 (Day 4-5)', subtitle: '자녀와 효과적인 진로 대화', icon: '💬',
        lessons: [
          { day: 4, title: '진로 대화의 기술', description: '경청하기 | 질문하기 | 공감하기', hasQuiz: true, completed: false },
          { day: 5, title: 'AI와 함께 진로 시뮬레이션', description: '직업 체험 시뮬레이션 | 하루 일과 체험 | 역할극', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: '중급',
  },
  '중급': {
    title: 'AI와 함께하는 진로 탐색',
    level: '중급',
    subtitle: '심층 진로 분석과 계획 수립',
    icon: '🎯',
    liveInfo: { schedule: '매주 금요일 8PM | 진로 분석 세미나' },
    announcement: { title: '중급 과정 준비 중!', description: '곧 업로드됩니다 📚' },
    progress: { completed: 0, total: 5, percentage: 0 },
    parts: [
      {
        id: 1, title: 'Part 1: 심층 분석 (Day 1-3)', subtitle: '자녀 특성 심층 분석', icon: '📊',
        lessons: [
          { day: 1, title: '다중지능 이해하기', description: '8가지 지능 | 강점 발견 | 학습 스타일', hasQuiz: true, completed: false },
          { day: 2, title: '진로 성숙도 평가', description: '진로 인식 | 진로 탐색 | 진로 준비', hasQuiz: true, completed: false },
          { day: 3, title: 'AI 기반 진로 매칭', description: '성향 분석 | 직업 추천 | 적합도 평가', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2, title: 'Part 2: 진로 로드맵 (Day 4-5)', subtitle: '단계별 진로 계획 수립', icon: '🗺️',
        lessons: [
          { day: 4, title: '단기 목표 설정', description: '학년별 목표 | 경험 계획 | 역량 개발', hasQuiz: true, completed: false },
          { day: 5, title: '장기 진로 로드맵', description: '진학 계획 | 진로 포트폴리오 | 실천 전략', hasQuiz: true, completed: false },
        ],
      },
    ],
    nextLevel: '고급',
  },
  '고급': {
    title: 'AI와 함께하는 진로 탐색',
    level: '고급',
    subtitle: '전문 진로 코칭과 멘토링',
    icon: '🎯',
    liveInfo: { schedule: '매주 토요일 10AM | 진로 코칭 마스터클래스' },
    announcement: { title: '고급 과정 준비 중!', description: '곧 업로드됩니다 🎯' },
    progress: { completed: 0, total: 5, percentage: 0 },
    parts: [
      {
        id: 1, title: 'Part 1: 진로 코칭 (Day 1-3)', subtitle: '부모 진로 코치 되기', icon: '🏆',
        lessons: [
          { day: 1, title: '진로 코칭 기초', description: '코칭 마인드셋 | 질문 기법 | 피드백 방법', hasQuiz: true, completed: false },
          { day: 2, title: '동기부여 전략', description: '내재적 동기 | 성취감 경험 | 실패 극복', hasQuiz: true, completed: false },
          { day: 3, title: '진로 장벽 극복', description: '불안 해소 | 갈등 해결 | 지지 시스템', hasQuiz: true, completed: false },
        ],
      },
      {
        id: 2, title: 'Part 2: 전문가 연계 (Day 4-5)', subtitle: '외부 자원 활용', icon: '🤝',
        lessons: [
          { day: 4, title: '전문 상담 활용', description: '진로상담사 | 학교 상담 | 외부 기관', hasQuiz: true, completed: false },
          { day: 5, title: '멘토링 네트워크', description: '멘토 찾기 | 현직자 연결 | 네트워킹', hasQuiz: true, completed: false },
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
    <Link href={`/course/parent/${coursePath}/${level}/lesson/${lesson.day}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:border-teal-300 hover:scale-[1.02] transition-all duration-200 cursor-pointer">
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
          <span className="flex items-center gap-2 text-teal-600 font-medium text-sm">{lesson.completed ? '다시 학습하기' : '학습 시작하기'}<ChevronRight className="w-4 h-4" /></span>
        </div>
      </div>
    </Link>
  );
}

function PartSection({ part, level, coursePath }: { part: any; level: string; coursePath: string }) {
  return (
    <section className="mb-8">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-5 mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">{part.icon} {part.title}</h3>
        <p className="text-teal-100 text-sm mt-1">{part.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {part.lessons.map((lesson: any) => <LessonCard key={lesson.day} lesson={lesson} level={level} coursePath={coursePath} />)}
      </div>
    </section>
  );
}

export default function ParentCareerExplorationPage() {
  const router = useRouter();
  const params = useParams();
  const level = decodeURIComponent(params.level as string);
  const coursePath = 'career-exploration';

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
            <span className="text-gray-300">/</span><span className="text-gray-500 text-sm">진로 탐색</span>
            <span className="text-gray-300">/</span><span className={`px-2 py-0.5 ${colors.bg} text-white text-sm rounded-full font-medium`}>{level}</span>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">{courseData.icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1"><h1 className="text-2xl font-bold text-gray-900">{courseData.title}</h1><span className={`px-3 py-1 ${colors.bg} text-white text-sm rounded-full font-medium`}>{courseData.level}</span></div>
              <p className="text-gray-500">{courseData.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Video className="w-5 h-5 text-white" /></div><div><h3 className="text-white font-semibold">주간 라이브 강의 입장</h3><p className="text-teal-200 text-sm">{courseData.liveInfo.schedule}</p></div></div>
          <button className="bg-white text-teal-600 px-5 py-2 rounded-lg font-semibold hover:bg-teal-50 transition">입장하기</button>
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
                <div key={lvl} className={`p-4 rounded-lg border-2 ${lvlColors.border}`} style={{ backgroundColor: lvl === '초급' ? '#f0fdf4' : lvl === '중급' ? '#fefce8' : '#fef2f2' }}><span className={`text-sm ${lvlColors.text} font-medium`}>현재 학습 중</span><h4 className="font-bold text-gray-900 mt-1">{lvl}</h4><p className="text-sm text-gray-500">{lvl === '초급' && '진로 탐색 기초'}{lvl === '중급' && '심층 분석과 로드맵'}{lvl === '고급' && '진로 코칭 마스터'}</p></div>
              ) : (
                <Link key={lvl} href={`/course/parent/${coursePath}/${lvl}`} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"><span className="text-sm text-gray-500">{lvl === '초급' ? '기초 과정' : lvl === '중급' ? '다음 단계' : '심화 과정'}</span><h4 className="font-bold text-gray-900 mt-1">{lvl}</h4><p className="text-sm text-gray-500">{lvl === '초급' && '진로 탐색 기초'}{lvl === '중급' && '심층 분석과 로드맵'}{lvl === '고급' && '진로 코칭 마스터'}</p></Link>
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
