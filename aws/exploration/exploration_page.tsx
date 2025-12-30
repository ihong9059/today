'use client';

import Link from 'next/link';
import { Brain, ChevronRight, TrendingUp, BookOpen, Users, Globe, Scale, Clock, Coins, Map, Atom, FlaskConical, Leaf, Globe2 } from 'lucide-react';

const socialSubjects = [
  {
    id: 'social-culture',
    name: '사회문화',
    rank: 1,
    ratio: '36.7%',
    icon: Users,
    color: 'from-blue-500 to-indigo-600',
    description: '사회 현상과 문화를 탐구하는 과목',
    topics: ['사회화', '문화', '사회 불평등', '사회 변동'],
    difficulty: '중',
  },
  {
    id: 'life-ethics',
    name: '생활과 윤리',
    rank: 2,
    ratio: '36.3%',
    icon: Scale,
    color: 'from-purple-500 to-pink-600',
    description: '실생활의 윤리적 쟁점을 다루는 과목',
    topics: ['생명윤리', '환경윤리', '사회윤리', '과학기술윤리'],
    difficulty: '중',
  },
  {
    id: 'ethics-thought',
    name: '윤리와 사상',
    rank: 3,
    ratio: '8.4%',
    icon: BookOpen,
    color: 'from-indigo-500 to-purple-600',
    description: '동서양 윤리 사상의 흐름을 학습',
    topics: ['한국 윤리', '동양 윤리', '서양 윤리', '사회사상'],
    difficulty: '상',
  },
  {
    id: 'korean-geography',
    name: '한국지리',
    rank: 4,
    ratio: '7.3%',
    icon: Map,
    color: 'from-green-500 to-teal-600',
    description: '우리나라의 자연환경과 인문환경 탐구',
    topics: ['지형', '기후', '인구', '도시', '산업'],
    difficulty: '중',
  },
  {
    id: 'world-geography',
    name: '세계지리',
    rank: 5,
    ratio: '6.0%',
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
    description: '세계 각 지역의 특성과 쟁점 탐구',
    topics: ['기후환경', '지형', '인구', '도시화', '자원'],
    difficulty: '중',
  },
  {
    id: 'politics-law',
    name: '정치와 법',
    rank: 6,
    ratio: '5.7%',
    icon: Scale,
    color: 'from-red-500 to-rose-600',
    description: '민주정치와 법의 원리를 학습',
    topics: ['민주주의', '헌법', '정치과정', '국제정치'],
    difficulty: '중상',
  },
  {
    id: 'east-asian-history',
    name: '동아시아사',
    rank: 7,
    ratio: '4.1%',
    icon: Clock,
    color: 'from-amber-500 to-orange-600',
    description: '한중일 중심의 동아시아 역사 탐구',
    topics: ['선사시대', '국가형성', '국제관계', '근현대'],
    difficulty: '중상',
  },
  {
    id: 'world-history',
    name: '세계사',
    rank: 8,
    ratio: '3.5%',
    icon: Globe,
    color: 'from-teal-500 to-emerald-600',
    description: '인류 문명의 발전과 교류 탐구',
    topics: ['고대문명', '중세', '근대', '현대세계'],
    difficulty: '상',
  },
  {
    id: 'economics',
    name: '경제',
    rank: 9,
    ratio: '1.3%',
    icon: Coins,
    color: 'from-yellow-500 to-amber-600',
    description: '경제 원리와 경제 문제 해결 탐구',
    topics: ['시장경제', '국민경제', '국제경제', '경제정책'],
    difficulty: '상',
  },
];

const scienceSubjects = [
  {
    id: 'physics-1',
    name: '물리학Ⅰ',
    rank: 1,
    ratio: '18.2%',
    icon: Atom,
    color: 'from-sky-500 to-blue-600',
    description: '역학, 열역학, 전자기, 현대물리의 기초',
    topics: ['역학', '열역학', '전자기', '현대물리'],
    difficulty: '상',
  },
  {
    id: 'physics-2',
    name: '물리학Ⅱ',
    rank: 5,
    ratio: '3.1%',
    icon: Atom,
    color: 'from-blue-600 to-indigo-700',
    description: '물리학Ⅰ 심화 및 양자역학 기초',
    topics: ['강체역학', '파동광학', '전자기유도', '양자역학'],
    difficulty: '최상',
  },
  {
    id: 'chemistry-1',
    name: '화학Ⅰ',
    rank: 2,
    ratio: '15.8%',
    icon: FlaskConical,
    color: 'from-orange-500 to-red-600',
    description: '물질의 구조와 화학 반응의 원리',
    topics: ['원자구조', '화학결합', '산화환원', '산염기'],
    difficulty: '중상',
  },
  {
    id: 'chemistry-2',
    name: '화학Ⅱ',
    rank: 6,
    ratio: '2.8%',
    icon: FlaskConical,
    color: 'from-red-500 to-pink-600',
    description: '화학Ⅰ 심화 및 유기화학 기초',
    topics: ['기체/용액', '반응속도', '화학평형', '유기화학'],
    difficulty: '최상',
  },
  {
    id: 'biology-1',
    name: '생명과학Ⅰ',
    rank: 3,
    ratio: '14.5%',
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    description: '생명 현상의 기본 원리와 유전',
    topics: ['세포', '유전', '항상성', '생태계'],
    difficulty: '중',
  },
  {
    id: 'biology-2',
    name: '생명과학Ⅱ',
    rank: 7,
    ratio: '2.5%',
    icon: Leaf,
    color: 'from-emerald-500 to-teal-600',
    description: '세포호흡, 광합성, 유전자 발현, 진화',
    topics: ['세포호흡', '광합성', '유전자발현', '진화'],
    difficulty: '상',
  },
  {
    id: 'earth-science-1',
    name: '지구과학Ⅰ',
    rank: 4,
    ratio: '12.3%',
    icon: Globe2,
    color: 'from-violet-500 to-purple-600',
    description: '지구와 우주에 대한 기본 이해',
    topics: ['판구조론', '대기해양', '천문'],
    difficulty: '중',
  },
  {
    id: 'earth-science-2',
    name: '지구과학Ⅱ',
    rank: 8,
    ratio: '2.1%',
    icon: Globe2,
    color: 'from-purple-600 to-fuchsia-700',
    description: '지구과학Ⅰ 심화 및 우주론',
    topics: ['지구내부', '대기순환', '별진화', '우주론'],
    difficulty: '상',
  },
];

export default function ExplorationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
          </div>
        </div>
      </nav>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/courses" className="hover:text-blue-600">코스</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">탐구영역</span>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">탐구영역 마스터</h1>
              <p className="text-indigo-200">2025 수능 사회탐구 9과목 + 과학탐구 8과목 완벽 정복</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">17개</div>
              <div className="text-indigo-200 text-sm">탐구 과목</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">45일</div>
              <div className="text-indigo-200 text-sm">과목당 학습일</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">765일</div>
              <div className="text-indigo-200 text-sm">총 콘텐츠</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">AI</div>
              <div className="text-indigo-200 text-sm">맞춤 학습</div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 과학탐구 섹션 */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Atom className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">과학탐구</h2>
              <p className="text-gray-600">물리학, 화학, 생명과학, 지구과학 8과목</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scienceSubjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <Link
                  key={subject.id}
                  href={`/course/exploration/${subject.id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className={`bg-gradient-to-r ${subject.color} p-5 text-white`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{subject.name}</h3>
                        <span className="text-white/80 text-xs">선택률 {subject.ratio}</span>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm">{subject.description}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {subject.topics.map((topic, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        난이도: <span className="font-medium text-gray-700">{subject.difficulty}</span>
                      </span>
                      <span className="text-xs text-indigo-600 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        시작하기 <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 사회탐구 섹션 */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">사회탐구</h2>
              <p className="text-gray-600">2025 수능 응시자 비율 순으로 정렬</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialSubjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <Link
                  key={subject.id}
                  href={`/course/exploration/${subject.id}`}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-white/30 px-2 py-0.5 rounded text-xs font-bold">
                              {subject.rank}위
                            </span>
                            <span className="text-white/80 text-sm">{subject.ratio}</span>
                          </div>
                          <h3 className="text-xl font-bold">{subject.name}</h3>
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm">{subject.description}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {subject.topics.map((topic, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        난이도: <span className="font-medium text-gray-700">{subject.difficulty}</span>
                      </span>
                      <span className="text-sm text-indigo-600 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        시작하기 <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
          <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            2025 수능 탐구영역 트렌드
          </h3>
          <ul className="space-y-2 text-amber-700 text-sm">
            <li>• <strong>사탐런 현상:</strong> 이과생들의 사회탐구 선택 급증 (전년 대비 3배)</li>
            <li>• <strong>인기 조합:</strong> 사회문화 + 생활과윤리가 가장 많은 선택</li>
            <li>• <strong>과탐 선택:</strong> 물리학Ⅰ + 화학Ⅰ 또는 생명과학Ⅰ + 지구과학Ⅰ 조합 인기</li>
            <li>• <strong>전략적 선택:</strong> 본인 적성과 목표 대학에 맞는 과목 선택이 중요</li>
          </ul>
        </div>
      </main>

      <footer className="bg-slate-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2025 UTTEC Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
