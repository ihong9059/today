'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Play, Clock, CheckCircle, Lock, BookOpen, Gift } from 'lucide-react';

// 코스 데이터 정의
const courseData: { [key: string]: {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  longDescription: string;
  parts: {
    id: string;
    title: string;
    lessons: {
      day: number;
      title: string;
      duration: string;
      description: string;
    }[];
  }[];
}} = {
  'film-director': {
    id: 'film-director',
    title: '영화 감독',
    icon: '🎬',
    color: 'from-red-500 to-rose-500',
    description: 'AI와 함께 영화 제작의 세계를 체험하고 감독의 시선으로 작품 구상하기',
    longDescription: '영화 감독이 되어 시나리오 구상부터 촬영, 연출까지 영화 제작의 전 과정을 AI와 함께 체험합니다. 실제 현장에서 사용하는 기법과 용어를 배우고, 나만의 단편 영화 기획서를 완성해봅니다.',
    parts: [
      {
        id: 'experience',
        title: '간접 경험',
        lessons: [
          { day: 1, title: '영화 감독의 하루', duration: '30분', description: '프리 프로덕션부터 포스트 프로덕션까지 감독의 일과 체험' },
        ],
      },
      {
        id: 'knowledge',
        title: '기초 지식',
        lessons: [
          { day: 2, title: '영화 제작 기초', duration: '35분', description: '시나리오, 촬영, 편집의 핵심 개념과 용어 학습' },
        ],
      },
      {
        id: 'practice',
        title: '실무 체험',
        lessons: [
          { day: 3, title: '시나리오 작성 체험', duration: '40분', description: 'AI와 함께 단편 영화 시나리오 구상하고 작성하기' },
        ],
      },
      {
        id: 'entry',
        title: '진입 방법',
        lessons: [
          { day: 4, title: '영화 감독이 되는 길', duration: '30분', description: '영화학과, 독립영화제, 조감독 경력 등 다양한 진입 경로' },
        ],
      },
      {
        id: 'roadmap',
        title: '커리어 로드맵',
        lessons: [
          { day: 5, title: '감독으로 성장하기', duration: '35분', description: '단편→장편→상업영화 감독으로의 커리어 설계' },
        ],
      },
    ],
  },
  'renewable-energy': {
    id: 'renewable-energy',
    title: '신재생에너지발전설비기사',
    icon: '⚡',
    color: 'from-green-500 to-emerald-500',
    description: '신재생에너지 분야 자격증 준비와 실무 기초 지식 습득하기',
    longDescription: '신재생에너지발전설비기사 자격증 준비를 위한 핵심 개념과 시험 전략을 학습합니다. 태양광, 풍력, 연료전지 등 다양한 신재생에너지 분야의 기초를 다지고 실무에 필요한 지식을 쌓습니다.',
    parts: [
      {
        id: 'experience',
        title: '간접 경험',
        lessons: [
          { day: 1, title: '신재생에너지 기술자의 하루', duration: '30분', description: '발전소 점검, 설비 관리, 모니터링 등 실무 체험' },
        ],
      },
      {
        id: 'knowledge',
        title: '기초 지식',
        lessons: [
          { day: 2, title: '신재생에너지 핵심 이론', duration: '40분', description: '태양광, 풍력, 수력, 연료전지의 원리와 특성' },
        ],
      },
      {
        id: 'practice',
        title: '실무 체험',
        lessons: [
          { day: 3, title: '발전 시스템 설계 체험', duration: '35분', description: 'AI와 함께 가정용 태양광 발전 시스템 설계하기' },
        ],
      },
      {
        id: 'entry',
        title: '자격증 준비',
        lessons: [
          { day: 4, title: '기사 시험 준비 전략', duration: '35분', description: '필기/실기 시험 구성, 출제 경향, 합격 전략' },
        ],
      },
      {
        id: 'roadmap',
        title: '커리어 로드맵',
        lessons: [
          { day: 5, title: '신재생에너지 전문가로 성장', duration: '30분', description: '기사→기술사, 발전소 운영, 컨설팅 등 커리어 경로' },
        ],
      },
    ],
  },
  'elementary-teacher': {
    id: 'elementary-teacher',
    title: '초등학교 선생님',
    icon: '👩‍🏫',
    color: 'from-blue-500 to-cyan-500',
    description: 'AI로 초등교육 현장을 체험하고 수업 설계부터 학급 운영까지 경험하기',
    longDescription: '초등학교 선생님이 되어 수업 준비부터 학급 운영, 학부모 상담까지 교직 생활 전반을 체험합니다. 교육과정 이해와 수업 지도안 작성, 학생 생활지도 방법을 배웁니다.',
    parts: [
      {
        id: 'experience',
        title: '간접 경험',
        lessons: [
          { day: 1, title: '초등학교 선생님의 하루', duration: '30분', description: '등교 지도부터 하교까지 교사의 일과 체험' },
        ],
      },
      {
        id: 'knowledge',
        title: '기초 지식',
        lessons: [
          { day: 2, title: '초등교육과정 이해', duration: '35분', description: '교육과정 구성, 교과별 특성, 평가 방법 학습' },
        ],
      },
      {
        id: 'practice',
        title: '실무 체험',
        lessons: [
          { day: 3, title: '수업 지도안 작성 체험', duration: '40분', description: 'AI와 함께 국어/수학 수업 지도안 작성하기' },
        ],
      },
      {
        id: 'entry',
        title: '진입 방법',
        lessons: [
          { day: 4, title: '초등교사가 되는 길', duration: '35분', description: '교대 진학, 임용시험 준비, 기간제 교사 경험' },
        ],
      },
      {
        id: 'roadmap',
        title: '커리어 로드맵',
        lessons: [
          { day: 5, title: '교육 전문가로 성장하기', duration: '30분', description: '담임→부장→교감→교장, 장학사, 교육전문직 경로' },
        ],
      },
    ],
  },
  'welding-technician': {
    id: 'welding-technician',
    title: '용접 기사',
    icon: '🔧',
    color: 'from-orange-500 to-amber-500',
    description: '용접 기술의 기초와 자격증 준비, 산업 현장 이해하기',
    longDescription: '용접기사 자격증 준비와 함께 다양한 용접 기법(아크, 가스, TIG, MIG)의 원리와 특성을 학습합니다. 조선, 건설, 플랜트 등 산업 현장에서의 용접 실무를 이해합니다.',
    parts: [
      {
        id: 'experience',
        title: '간접 경험',
        lessons: [
          { day: 1, title: '용접 기사의 하루', duration: '30분', description: '조선소, 건설현장, 플랜트에서의 용접 작업 체험' },
        ],
      },
      {
        id: 'knowledge',
        title: '기초 지식',
        lessons: [
          { day: 2, title: '용접 핵심 이론', duration: '40분', description: '아크용접, 가스용접, TIG, MIG 용접의 원리와 특성' },
        ],
      },
      {
        id: 'practice',
        title: '실무 체험',
        lessons: [
          { day: 3, title: '용접 작업 계획 체험', duration: '35분', description: 'AI와 함께 용접 작업 절차서 작성하고 안전 계획 수립' },
        ],
      },
      {
        id: 'entry',
        title: '자격증 준비',
        lessons: [
          { day: 4, title: '용접기사 시험 준비', duration: '35분', description: '필기/실기 시험 구성, 실기 종목별 준비 방법' },
        ],
      },
      {
        id: 'roadmap',
        title: '커리어 로드맵',
        lessons: [
          { day: 5, title: '용접 전문가로 성장하기', duration: '30분', description: '기능사→기사→기술사, 용접 감독, 품질관리 전문가 경로' },
        ],
      },
    ],
  },
  'orchard-owner': {
    id: 'orchard-owner',
    title: '과수원 운영자',
    icon: '🍎',
    color: 'from-lime-500 to-green-500',
    description: 'AI와 함께 과수원 창업부터 운영, 유통까지 농업 경영 체험하기',
    longDescription: '과수원 창업부터 품종 선택, 재배 관리, 수확, 유통까지 과수 농업의 전 과정을 체험합니다. 스마트팜 기술과 6차 산업(가공, 체험, 판매)에 대해서도 배웁니다.',
    parts: [
      {
        id: 'experience',
        title: '간접 경험',
        lessons: [
          { day: 1, title: '과수원 운영자의 하루', duration: '30분', description: '계절별 농작업, 병해충 관리, 수확과 출하 체험' },
        ],
      },
      {
        id: 'knowledge',
        title: '기초 지식',
        lessons: [
          { day: 2, title: '과수 재배 기초', duration: '40분', description: '사과, 배, 복숭아 등 주요 과수의 재배 특성과 관리' },
        ],
      },
      {
        id: 'practice',
        title: '실무 체험',
        lessons: [
          { day: 3, title: '과수원 경영 계획 수립', duration: '35분', description: 'AI와 함께 과수원 창업 사업계획서 작성하기' },
        ],
      },
      {
        id: 'entry',
        title: '진입 방법',
        lessons: [
          { day: 4, title: '과수원 창업 준비', duration: '35분', description: '농지 구입, 정부 지원금, 귀농 교육, 멘토링 프로그램' },
        ],
      },
      {
        id: 'roadmap',
        title: '커리어 로드맵',
        lessons: [
          { day: 5, title: '성공 농업인으로 성장하기', duration: '30분', description: '직거래, 가공식품, 농촌체험, 스마트팜 도입 전략' },
        ],
      },
    ],
  },
};

export default function FreeCourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.course as string;
  const course = courseData[courseId];

  const [userName, setUserName] = useState('사용자');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) setUserName(user.name);
      } catch (e) {}
    }

    // 완료된 레슨 로드
    const saved = localStorage.getItem(`free-${courseId}-completed`);
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, [courseId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleStartLesson = (day: number) => {
    router.push(`/course/free/${courseId}/lesson/${day}`);
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">코스를 찾을 수 없습니다</h1>
          <Link href="/course/free" className="text-teal-600 hover:underline">
            Free 체험 코스로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const allLessons = course.parts.flatMap(p => p.lessons);
  const progress = allLessons.length > 0 ? Math.round((completedLessons.length / allLessons.length) * 100) : 0;

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

          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white px-3 py-2">소개</Link>
              <Link href="/mbti" className="block text-gray-300 hover:text-white px-3 py-2">MBTI</Link>
              <Link href="/courses" className="block text-gray-300 hover:text-white px-3 py-2">강좌 목록</Link>
              <Link href="/faq" className="block text-gray-300 hover:text-white px-3 py-2">FAQ</Link>
              <Link href="/dashboard" className="block bg-yellow-400 text-slate-900 px-3 py-2 rounded-lg font-semibold">내 강의</Link>
            </div>
          )}
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/courses" className="hover:text-gray-700">강좌 목록</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/course/free" className="hover:text-gray-700">Free 체험</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{course.title}</span>
        </div>

        {/* 코스 헤더 */}
        <div className={`bg-gradient-to-r ${course.color} rounded-2xl p-8 mb-8 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5" />
            <span className="text-sm font-medium">무료 체험 코스</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-white/80 mt-1">{course.description}</p>
            </div>
          </div>
          <p className="text-white/90 mb-6">{course.longDescription}</p>

          {/* 진행률 */}
          <div className="bg-white/20 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>학습 진행률</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 레슨 목록 */}
        <div className="space-y-6">
          {course.parts.map((part, partIndex) => (
            <div key={part.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className={`bg-gradient-to-r ${course.color} px-6 py-3`}>
                <h2 className="font-bold text-white">
                  {partIndex + 1}단계: {part.title}
                </h2>
              </div>
              <div className="divide-y">
                {part.lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.day);

                  return (
                    <div
                      key={lesson.day}
                      className="p-4 hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => handleStartLesson(lesson.day)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-green-100 text-green-600'
                            : `bg-gradient-to-br ${course.color} text-white`
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="font-bold">{lesson.day}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            Day {lesson.day}: {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-500">{lesson.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            {lesson.duration}
                          </span>
                          <button className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                            isCompleted
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : `bg-gradient-to-r ${course.color} text-white hover:opacity-90`
                          }`}>
                            <Play className="w-4 h-4" />
                            {isCompleted ? '복습하기' : '시작하기'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 학습 팁 */}
        <div className="mt-8 bg-teal-50 border border-teal-200 rounded-xl p-6">
          <h3 className="font-bold text-teal-900 mb-3">💡 학습 팁</h3>
          <ul className="space-y-2 text-teal-800 text-sm">
            <li>• AI와 대화하며 실제 업무 상황을 체험해보세요</li>
            <li>• 궁금한 점은 프롬프트로 자유롭게 질문하세요</li>
            <li>• 각 단계를 순서대로 학습하면 더 효과적입니다</li>
            <li>• 체험 후 관심이 생기면 관련 유료 코스를 확인해보세요</li>
          </ul>
        </div>
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
              <p className="text-sm">AI와 함께하는 진로교육 플랫폼</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">빠른 링크</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">홈</Link></li>
                <li><Link href="/courses" className="hover:text-white transition">강좌 목록</Link></li>
                <li><Link href="/about" className="hover:text-white transition">소개</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">문의</h4>
              <ul className="space-y-2 text-sm">
                <li>이메일: uttec@uttec.co.kr</li>
                <li>전화: 010-3922-1809</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 UTTEC Edu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
