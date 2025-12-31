'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, Menu, X, ChevronRight, Users, BookOpen, Clock, Star, Play, Calendar, Award } from 'lucide-react';

// 교사/교육자 코스 - 학교급별 분류 (30일 구조)
const teacherLevels = [
  {
    id: 'elementary',
    title: '초등교사 AI 활용 과정',
    icon: '🌱',
    description: '초등학생 눈높이에 맞는 AI 활용 수업 설계',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    duration: '30일 과정',
    stages: 6,
    students: 234,
    rating: 4.9,
    topics: ['놀이 기반 AI 학습', '발달 단계 맞춤', '학부모 소통'],
    features: [
      '초등학생 발달 단계에 맞는 AI 교육',
      '게임/놀이 기반 AI 수업 설계',
      '학부모 소통 및 협력 방법',
      '통합교과 AI 활용 전략',
    ],
    stageList: [
      { name: 'AI 기초 마스터', days: '1-5' },
      { name: '초등학생 발달 이해', days: '6-10' },
      { name: '놀이 체험 AI 수업', days: '11-15' },
      { name: '교과별 AI 활용', days: '16-22' },
      { name: '수업 설계와 평가', days: '23-27' },
      { name: '포트폴리오 완성', days: '28-30' },
    ],
  },
  {
    id: 'middle',
    title: '중등교사 AI 활용 과정',
    icon: '📚',
    description: '중학생 진로탐색과 AI 융합 수업 전략',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    duration: '30일 과정',
    stages: 6,
    students: 312,
    rating: 4.8,
    topics: ['자유학기제 AI', '고교학점제 연계', '세특 작성'],
    features: [
      '자유학기제 AI 프로그램 설계',
      '고교학점제 연계 진로 지도',
      '세부능력특기사항 AI 작성',
      '협력 학습/토론 AI 활용',
    ],
    stageList: [
      { name: 'AI 기초 마스터', days: '1-5' },
      { name: '청소년 발달 이해', days: '6-10' },
      { name: '자유학기제/진로 AI', days: '11-15' },
      { name: '교과 융합 AI 수업', days: '16-22' },
      { name: '수업 설계와 평가', days: '23-27' },
      { name: '포트폴리오 완성', days: '28-30' },
    ],
  },
  {
    id: 'high',
    title: '고등교사 AI 활용 과정',
    icon: '🎓',
    description: '고등학생 진로/진학 지도와 심화 AI 교육',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    duration: '30일 과정',
    stages: 6,
    students: 278,
    rating: 4.9,
    topics: ['세특/생기부 AI', '자소서/면접 AI', '진로진학 상담'],
    features: [
      '세부능력특기사항/생기부 AI 작성',
      '학생부종합전형 AI 분석',
      '자기소개서/면접 AI 지도',
      '추천서 AI 작성 지원',
    ],
    stageList: [
      { name: 'AI 기초 마스터', days: '1-5' },
      { name: '고등학생 특성 이해', days: '6-10' },
      { name: '세특/생기부 AI 활용', days: '11-15' },
      { name: '교과별 심화 AI 수업', days: '16-22' },
      { name: '진로진학 AI 상담', days: '23-27' },
      { name: '포트폴리오 완성', days: '28-30' },
    ],
  },
];

export default function TeacherCoursePage() {
  const router = useRouter();
  const [userName, setUserName] = useState('선생님');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleStartLevel = (levelId: string) => {
    router.push(`/course/teacher/${levelId}`);
  };

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
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 섹션 */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/courses" className="text-amber-200 hover:text-white text-sm">강좌 목록</Link>
            <ChevronRight className="w-4 h-4 text-amber-200" />
            <span className="text-sm">교사/교육자 코스</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            📚 교사/교육자 AI 활용 교육 과정
          </h1>
          <p className="text-lg text-amber-100 mb-6">
            학교급별 맞춤형 AI 활용 교육 전문가 양성<br />
            <strong>30일 집중 과정</strong>으로 AI 수업 전문가가 되세요!
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <BookOpen className="w-5 h-5" />
              <span>3개 학교급</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Calendar className="w-5 h-5" />
              <span>각 30일 과정</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Award className="w-5 h-5" />
              <span>6단계 체계</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
              <Users className="w-5 h-5" />
              <span>800+ 교육자</span>
            </div>
          </div>
        </div>

        {/* 학교급 선택 안내 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-amber-900 mb-2">🎯 나에게 맞는 코스를 선택하세요</h3>
          <p className="text-amber-800 text-sm">
            각 학교급의 특성에 맞는 30일 AI 활용 교육 커리큘럼을 제공합니다.
            담당 학교급을 선택하여 체계적인 AI 수업 설계 역량을 키워보세요!
          </p>
        </div>

        {/* 학교급별 코스 목록 */}
        <div className="grid gap-8">
          {teacherLevels.map((level) => (
            <div key={level.id} className={`bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition border ${level.borderColor}`}>
              <div className="md:flex">
                {/* 왼쪽: 아이콘 */}
                <div className={`md:w-56 p-8 bg-gradient-to-br ${level.color} flex flex-col items-center justify-center text-white`}>
                  <span className="text-7xl mb-4">{level.icon}</span>
                  <span className="text-lg font-bold">{level.duration}</span>
                  <span className="text-sm opacity-80">{level.stages}단계 과정</span>
                </div>

                {/* 중앙: 정보 */}
                <div className="flex-1 p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.title}</h3>
                  <p className="text-gray-600 mb-4">{level.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {level.topics.map((topic) => (
                      <span key={topic} className={`px-3 py-1 ${level.bgColor} ${level.textColor} text-sm rounded-full font-medium`}>
                        {topic}
                      </span>
                    ))}
                  </div>

                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    {level.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* 단계 미리보기 */}
                  <div className={`${level.bgColor} rounded-lg p-4 mt-4`}>
                    <h4 className={`font-semibold ${level.textColor} mb-2`}>📋 6단계 커리큘럼</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                      {level.stageList.map((stage, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${level.color} text-white flex items-center justify-center text-xs font-bold`}>
                            {idx + 1}
                          </span>
                          <span className="text-gray-600">{stage.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500 mt-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Day 1-30
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {level.students}명 수강
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {level.rating}
                    </span>
                  </div>
                </div>

                {/* 오른쪽: 시작 버튼 */}
                <div className="p-6 bg-gray-50 md:w-56 flex flex-col justify-center items-center">
                  <button
                    onClick={() => handleStartLevel(level.id)}
                    className={`w-full py-4 bg-gradient-to-r ${level.color} text-white font-semibold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 text-lg shadow-lg`}
                  >
                    <Play className="w-6 h-6" />
                    시작하기
                  </button>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    30일 완성 과정<br />매일 15-30분 학습
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 커리큘럼 구조 안내 */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">📖 30일 과정 구조</h2>
          <div className="grid md:grid-cols-6 gap-3">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">1단계</h3>
              <p className="text-xs text-gray-500 mt-1">AI 기초 마스터</p>
              <p className="text-xs text-green-600 font-medium">Day 1-5</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">2단계</h3>
              <p className="text-xs text-gray-500 mt-1">학교급별 특성</p>
              <p className="text-xs text-blue-600 font-medium">Day 6-10</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">3단계</h3>
              <p className="text-xs text-gray-500 mt-1">특화 AI 활용</p>
              <p className="text-xs text-purple-600 font-medium">Day 11-15</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">4단계</h3>
              <p className="text-xs text-gray-500 mt-1">교과별 AI 수업</p>
              <p className="text-xs text-orange-600 font-medium">Day 16-22</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                5
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">5단계</h3>
              <p className="text-xs text-gray-500 mt-1">수업 설계/평가</p>
              <p className="text-xs text-teal-600 font-medium">Day 23-27</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                6
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">6단계</h3>
              <p className="text-xs text-gray-500 mt-1">포트폴리오</p>
              <p className="text-xs text-amber-600 font-medium">Day 28-30</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            * 각 Day는 3개의 프롬프트 실습으로 구성되어 있습니다. 총 90개 프롬프트!
          </p>
        </div>

        {/* 학습 특징 */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">실전 중심 학습</h3>
            <p className="text-sm text-gray-600">
              이론보다 실습! 바로 수업에 적용할 수 있는 프롬프트와 활동을 제공합니다.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">진도율 추적</h3>
            <p className="text-sm text-gray-600">
              학습 진도를 자동으로 저장하고 추적합니다. 언제든 이어서 학습하세요.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">포트폴리오 완성</h3>
            <p className="text-sm text-gray-600">
              30일 과정을 마치면 AI 활용 교육 포트폴리오가 완성됩니다.
            </p>
          </div>
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
